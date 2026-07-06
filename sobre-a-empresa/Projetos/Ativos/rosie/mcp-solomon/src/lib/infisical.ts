import { log } from "./log.js";
import { segredoAusente } from "./erros.js";

// Resolução de segredos — 2 modos suportados (nessa ordem):
//
//   (A) Fallback via ambiente injetado
//       Se a variável já está em process.env (porque o shim Node do Kolden ou
//       'infisical run --' fez a injeção antes do boot), usa direto. É o modo
//       preferido em produção Kolden — ver reference_mcp_infisical_sac_shim.
//
//   (B) REST direto ao Infisical
//       Se INFISICAL_TOKEN estiver definido, busca o segredo via API REST em
//       /api/v3/secrets/raw/<nome>. Usado quando o processo MCP não é iniciado
//       via shim/CLI (ex: eval isolado, debug local).
//
// Zero credencial em código; zero fallback silencioso: se nenhum modo entregar
// o segredo, lança SEGREDO_AUSENTE com o path Infisical esperado.

export interface Segredos {
  solomon_token: string;
  solomon_company_id_rosie: string;
  solomon_env: "live" | "sandbox";
}

const PATH_TOKEN_PROD = "/kolden/prod/SOLOMON_TOKEN_API";
const PATH_TOKEN_DEV = "/kolden/dev/SOLOMON_TOKEN_API";
const PATH_COMPANY_ID = "/kolden/prod/SOLOMON_COMPANY_ID_ROSIE";

async function buscarViaRestInfisical(
  nome: string,
  ambiente: string,
): Promise<string | null> {
  const token = process.env["INFISICAL_TOKEN"];
  const projectId = process.env["INFISICAL_PROJECT_ID"];
  if (typeof token !== "string" || token.length === 0) return null;
  if (typeof projectId !== "string" || projectId.length === 0) return null;

  try {
    const url = `https://app.infisical.com/api/v3/secrets/raw/${encodeURIComponent(nome)}?workspaceId=${encodeURIComponent(projectId)}&environment=${encodeURIComponent(ambiente)}`;
    const resp = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!resp.ok) {
      log.warn("Infisical REST retornou status não-ok", {
        nome,
        ambiente,
        status: resp.status,
      });
      return null;
    }
    const json = (await resp.json()) as unknown;
    if (
      json !== null &&
      typeof json === "object" &&
      "secret" in json &&
      typeof (json as { secret: unknown }).secret === "object"
    ) {
      const secret = (json as { secret: { secretValue?: string } }).secret;
      if (typeof secret.secretValue === "string" && secret.secretValue.length > 0) {
        return secret.secretValue;
      }
    }
    return null;
  } catch (err) {
    log.warn("Falha em fetch Infisical REST", {
      nome,
      erro: err instanceof Error ? err.message : String(err),
    });
    return null;
  }
}

async function resolver(
  nome: string,
  path_infisical: string,
  ambiente: string,
): Promise<string> {
  // (A) ambiente injetado
  const injetado = process.env[nome];
  if (typeof injetado === "string" && injetado.length > 0) return injetado;

  // (B) REST direto
  const via_rest = await buscarViaRestInfisical(nome, ambiente);
  if (typeof via_rest === "string" && via_rest.length > 0) return via_rest;

  throw segredoAusente(nome, path_infisical);
}

/**
 * Busca todos os segredos necessários para o MCP Íris operar.
 * Cacheia o resultado por processo (nunca re-busca até restart).
 */
let cacheSegredos: Segredos | null = null;

export async function carregarSegredos(): Promise<Segredos> {
  if (cacheSegredos) return cacheSegredos;

  const env = (process.env["SOLOMON_ENV"] ?? "live").toLowerCase();
  const ambiente_solomon: "live" | "sandbox" =
    env === "sandbox" ? "sandbox" : "live";

  // Ambiente do Infisical (por convenção Kolden: prod para live, dev para sandbox).
  const env_infisical =
    process.env["INFISICAL_ENV"] ??
    (ambiente_solomon === "sandbox" ? "dev" : "prod");

  const path_token =
    ambiente_solomon === "sandbox" ? PATH_TOKEN_DEV : PATH_TOKEN_PROD;

  const token = await resolver("SOLOMON_TOKEN_API", path_token, env_infisical);
  const company = await resolver(
    "SOLOMON_COMPANY_ID_ROSIE",
    PATH_COMPANY_ID,
    env_infisical,
  );

  cacheSegredos = {
    solomon_token: token,
    solomon_company_id_rosie: company,
    solomon_env: ambiente_solomon,
  };

  log.info("Segredos carregados", {
    ambiente_solomon,
    env_infisical,
    company_id: company,
    // token nunca é logado
  });

  return cacheSegredos;
}

/**
 * Zera o cache de segredos — usado após 401 persistente para forçar re-busca
 * (o shim/CLI pode ter atualizado a variável no meio da sessão).
 */
export function invalidarCacheSegredos(): void {
  cacheSegredos = null;
  log.info("Cache de segredos invalidado — próxima chamada re-busca");
}
