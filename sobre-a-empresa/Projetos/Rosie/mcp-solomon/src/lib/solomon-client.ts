import { log, redigirToken } from "./log.js";
import {
  rateLimit,
  recursoIndisponivel,
  redeIndisponivel,
  tokenInvalido,
} from "./erros.js";
import { buscar, chaves, guardar } from "./cache.js";
import { carregarSegredos, invalidarCacheSegredos } from "./infisical.js";

const BASE_LIVE = "https://admin-api.solomon.com.br";
const BASE_SANDBOX = "https://admin-api.sandbox.solomon.com.br";

const MAX_RETRIES = 3;
const BACKOFF_INICIAL_MS = 250;

export interface RespostaHttp {
  status: number;
  ok: boolean;
  latencia_ms: number;
  json: unknown;
  headers_redigidos: Record<string, string>;
}

export interface ResultadoIngestao {
  status: "enfileirado" | "dedup_ignorado";
  request_id?: string;
  timestamp?: string;
  http_status: number;
  latencia_ms: number;
  dedup_reason?: string;
  response_bruta?: unknown;
}

function baseParaAmbiente(ambiente: "live" | "sandbox"): string {
  return ambiente === "sandbox" ? BASE_SANDBOX : BASE_LIVE;
}

function esperar(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * Redige headers de resposta para exposição segura em modo detailed.
 * Nunca inclui cookies ou tokens; mantém headers públicos (rate-limit,
 * request-id, content-type, date).
 */
function redigirHeadersResposta(headers: Headers): Record<string, string> {
  const permitidos = [
    "content-type",
    "date",
    "x-request-id",
    "x-ratelimit-limit",
    "x-ratelimit-remaining",
    "x-ratelimit-reset",
    "retry-after",
  ];
  const out: Record<string, string> = {};
  for (const nome of permitidos) {
    const v = headers.get(nome);
    if (v !== null) out[nome] = v;
  }
  return out;
}

/**
 * POST bruto na API Solomon com retry/backoff. NÃO lida com dedup —
 * quem chama decide (ver postarComDedup).
 */
async function postar(
  rota: "/admin/v1/order" | "/admin/v1/product",
  body: unknown,
): Promise<RespostaHttp> {
  const segredos = await carregarSegredos();
  const url = baseParaAmbiente(segredos.solomon_env) + rota;

  let tentativa = 0;
  let ultimo_status = 0;
  let ultima_resp_json: unknown = null;
  let ultima_resp_headers: Record<string, string> = {};

  while (tentativa <= MAX_RETRIES) {
    const inicio = Date.now();
    let resp: Response;
    try {
      resp = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${segredos.solomon_token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      });
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : String(err);
      log.warn("Falha de rede na chamada Solomon", {
        rota,
        tentativa,
        erro: mensagem,
      });
      // Falha pré-HTTP: não faz retry — deixa infra falar por si.
      throw redeIndisponivel(mensagem);
    }

    const latencia_ms = Date.now() - inicio;
    ultimo_status = resp.status;
    ultima_resp_headers = redigirHeadersResposta(resp.headers);

    let json_body: unknown = null;
    const content_type = resp.headers.get("content-type") ?? "";
    if (content_type.includes("application/json")) {
      try {
        json_body = await resp.json();
      } catch {
        json_body = null;
      }
    } else {
      // Solomon pode retornar text/plain em erro; capturamos o texto para log.
      try {
        json_body = { texto_bruto: await resp.text() };
      } catch {
        json_body = null;
      }
    }
    ultima_resp_json = json_body;

    log.info("Solomon HTTP", {
      rota,
      status: resp.status,
      latencia_ms,
      tentativa,
      token_redigido: redigirToken(segredos.solomon_token),
    });

    if (resp.ok) {
      return {
        status: resp.status,
        ok: true,
        latencia_ms,
        json: json_body,
        headers_redigidos: ultima_resp_headers,
      };
    }

    // 401: tenta uma re-validação do token (o shim pode ter atualizado).
    if (resp.status === 401) {
      if (tentativa === 0) {
        log.warn("401 recebido — invalidando cache de segredos e re-tentando 1x", {
          rota,
        });
        invalidarCacheSegredos();
        tentativa += 1;
        continue;
      }
      throw tokenInvalido({ rota, ultimo_status: resp.status, response: json_body });
    }

    // 429 e 5xx: backoff exponencial.
    if (resp.status === 429 || (resp.status >= 500 && resp.status < 600)) {
      if (tentativa >= MAX_RETRIES) break;
      const delay = BACKOFF_INICIAL_MS * Math.pow(2, tentativa);
      const jitter = Math.floor(Math.random() * 100);
      log.warn("Aplicando backoff exponencial", {
        rota,
        status: resp.status,
        tentativa,
        delay_ms: delay + jitter,
      });
      await esperar(delay + jitter);
      tentativa += 1;
      continue;
    }

    // 4xx≠429: erro do cliente — não faz retry, propaga como recurso indisponível.
    // (Zod deveria pegar payload malformado antes de chegar aqui.)
    throw recursoIndisponivel(
      `HTTP ${resp.status} da Solomon em ${rota}`,
      { rota, status: resp.status, response: json_body },
    );
  }

  // Esgotou retries em 429/5xx.
  if (ultimo_status === 429) {
    throw rateLimit(MAX_RETRIES, ultimo_status);
  }
  throw recursoIndisponivel(
    `API Solomon indisponível após ${MAX_RETRIES} tentativas (último status HTTP: ${ultimo_status})`,
    { rota, ultimo_status, response: ultima_resp_json, headers: ultima_resp_headers },
  );
}

interface DedupInput {
  id: string;
  updatedAt: string;
  entidade: "pedido" | "produto";
}

/**
 * Envia payload para a Solomon com dedup local por (id, updatedAt).
 * Se o cache já viu esse id com updatedAt igual ou mais novo, retorna
 * status 'dedup_ignorado' sem tocar a API.
 */
async function postarComDedup(
  rota: "/admin/v1/order" | "/admin/v1/product",
  body: unknown,
  dedup: DedupInput,
): Promise<ResultadoIngestao> {
  const chave =
    dedup.entidade === "pedido"
      ? chaves.dedupPedido(dedup.id)
      : chaves.dedupProduto(dedup.id);

  const visto = buscar<{ updatedAt: string }>(chave);
  if (visto && Date.parse(visto.updatedAt) >= Date.parse(dedup.updatedAt)) {
    log.warn("Dedup ignorou payload — updatedAt não é mais recente", {
      entidade: dedup.entidade,
      id: dedup.id,
      recebido: dedup.updatedAt,
      cache: visto.updatedAt,
    });
    return {
      status: "dedup_ignorado",
      http_status: 0,
      latencia_ms: 0,
      dedup_reason: `updatedAt recebido (${dedup.updatedAt}) é anterior ou igual ao já processado (${visto.updatedAt}).`,
    };
  }

  const resp = await postar(rota, body);

  // Marca no cache para próxima chamada.
  guardar(chave, { updatedAt: dedup.updatedAt });

  // Parse best-effort do envelope Solomon.
  let request_id: string | undefined;
  let timestamp: string | undefined;
  if (resp.json !== null && typeof resp.json === "object") {
    const obj = resp.json as Record<string, unknown>;
    if (typeof obj["request_id"] === "string") request_id = obj["request_id"];
    if (typeof obj["timestamp"] === "string") timestamp = obj["timestamp"];
  }

  return {
    status: "enfileirado",
    request_id,
    timestamp,
    http_status: resp.status,
    latencia_ms: resp.latencia_ms,
    response_bruta: resp.json,
  };
}

// --------------------- API pública ---------------------

export async function enviarPedido(payload: unknown, dedup: DedupInput): Promise<ResultadoIngestao> {
  return postarComDedup("/admin/v1/order", payload, dedup);
}

export async function enviarProduto(payload: unknown, dedup: DedupInput): Promise<ResultadoIngestao> {
  return postarComDedup("/admin/v1/product", payload, dedup);
}

/**
 * Probe leve para validar o token. Como a Solomon v1 não expõe endpoint de
 * health, a estratégia é:
 *   1. Verificar presença do token via carregarSegredos() — se ausente, KoldenError.
 *   2. Consultar cache local de validação (TTL 5min). Se existir, retorna sem HTTP.
 *   3. Caso contrário, retorna metadata baseada em ambiente/companyId + timestamp
 *      atual, sem chamar HTTP (a Solomon não aceita OPTIONS/HEAD publicamente
 *      e qualquer POST forjado geraria dados sujos no painel).
 *
 * Se, no futuro, a Solomon expuser um endpoint de health, trocamos a etapa 3
 * por uma chamada real e removemos o cache oportunista.
 */
export interface MetadataConta {
  token_ok: boolean;
  companyId: string;
  environment: "live" | "sandbox";
  validado_em: string;
  latencia_ms: number;
  origem_validacao: "cache" | "presenca_segredos";
}

export async function validarConta(): Promise<MetadataConta> {
  const inicio = Date.now();
  const cacheado = buscar<MetadataConta>(chaves.validacaoConta());
  if (cacheado) {
    return { ...cacheado, latencia_ms: Date.now() - inicio, origem_validacao: "cache" };
  }

  const segredos = await carregarSegredos();
  const metadata: MetadataConta = {
    token_ok: segredos.solomon_token.length > 0,
    companyId: segredos.solomon_company_id_rosie,
    environment: segredos.solomon_env,
    validado_em: new Date().toISOString(),
    latencia_ms: Date.now() - inicio,
    origem_validacao: "presenca_segredos",
  };
  guardar(chaves.validacaoConta(), metadata);
  return metadata;
}
