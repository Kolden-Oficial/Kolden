// Contrato de erro do MCP Íris — sempre acionável, sempre em pt-BR.
// Todo handler de tool deve lançar KoldenError (ou deixar o wrapper envolverErros
// converter erros inesperados). O consumidor MCP recebe JSON estruturado.

export type CodigoErro =
  | "TOKEN_INVALIDO"
  | "PAYLOAD_INVALIDO"
  | "RATE_LIMIT"
  | "RECURSO_INDISPONIVEL"
  | "CONTA_INCORRETA"
  | "REDE_INDISPONIVEL"
  | "DEDUP_IGNORADO"
  | "SEGREDO_AUSENTE"
  | "ERRO_INTERNO";

export class KoldenError extends Error {
  readonly codigo: CodigoErro;
  readonly acao_sugerida: string;
  readonly detalhes?: Record<string, unknown>;

  constructor(
    codigo: CodigoErro,
    mensagem: string,
    acao_sugerida: string,
    detalhes?: Record<string, unknown>,
  ) {
    super(mensagem);
    this.name = "KoldenError";
    this.codigo = codigo;
    this.acao_sugerida = acao_sugerida;
    if (detalhes) this.detalhes = detalhes;
  }

  toToolResult(): { isError: true; content: Array<{ type: "text"; text: string }> } {
    const payload = {
      erro: {
        codigo: this.codigo,
        mensagem: this.message,
        acao_sugerida: this.acao_sugerida,
        ...(this.detalhes ? { detalhes: this.detalhes } : {}),
      },
    };
    return {
      isError: true,
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
    };
  }
}

// --------------------- Factories nomeadas ---------------------

export function tokenInvalido(detalhes?: Record<string, unknown>): KoldenError {
  return new KoldenError(
    "TOKEN_INVALIDO",
    "Token Solomon inválido ou expirado (HTTP 401).",
    "Renove o token no Infisical em /kolden/prod/SOLOMON_TOKEN_API (ou /kolden/dev/ para sandbox) e rode novamente. Se acabou de rotacionar, verifique se o shim Infisical do Kolden está injetando a variável atualizada.",
    detalhes,
  );
}

export function payloadInvalido(
  campo: string,
  problema: string,
  detalhes?: Record<string, unknown>,
): KoldenError {
  return new KoldenError(
    "PAYLOAD_INVALIDO",
    `Payload rejeitado pela validação Zod no campo '${campo}': ${problema}.`,
    "Verifique o schema em src/schemas/ e compare com o payload enviado. Todos os campos obrigatórios devem estar presentes, com tipos e patterns corretos (datas em ISO 8601 UTC, moeda ISO 4217, província 2 letras).",
    { campo, problema, ...(detalhes ?? {}) },
  );
}

export function rateLimit(retries_gastos: number, ultimo_status: number): KoldenError {
  return new KoldenError(
    "RATE_LIMIT",
    `Rate limit da Solomon persistiu após ${retries_gastos} tentativas com backoff exponencial (último status HTTP: ${ultimo_status}).`,
    "Espere alguns minutos antes de repetir. Se estiver rodando sincronização em lote, reduza 'max_paralelo' para 2 e reprocesse. Se o problema persistir, escale para o dono técnico Solomon.",
    { retries_gastos, ultimo_status },
  );
}

export function recursoIndisponivel(
  motivo: string,
  detalhes?: Record<string, unknown>,
): KoldenError {
  return new KoldenError(
    "RECURSO_INDISPONIVEL",
    `Recurso Solomon indisponível: ${motivo}.`,
    "Verifique o status da API Solomon (admin-api.solomon.com.br). Se estiver tentando ler dados (listar pedidos, buscar por ID), lembre-se: a v1 da API é write-only — leitura ficará em backlog v2 quando Solomon expor endpoints públicos.",
    detalhes,
  );
}

export function contaIncorreta(
  companyId_recebido: string,
  companyId_esperado: string,
): KoldenError {
  return new KoldenError(
    "CONTA_INCORRETA",
    `Token Solomon retornou companyId '${companyId_recebido}', diferente do esperado '${companyId_esperado}'. RISCO de escrita cross-cliente — chamada abortada.`,
    "Escale IMEDIATAMENTE para o dono técnico. Não repita a chamada. O token do Infisical pode estar apontando para outra conta Solomon. Confira /kolden/prod/SOLOMON_TOKEN_API e /kolden/prod/SOLOMON_COMPANY_ID_ROSIE.",
    { companyId_recebido, companyId_esperado },
  );
}

export function redeIndisponivel(erro_original: string): KoldenError {
  return new KoldenError(
    "REDE_INDISPONIVEL",
    "Falha de rede ao alcançar a API Solomon (sem conectividade, DNS, TLS ou timeout).",
    "Verifique a conectividade da máquina (ping admin-api.solomon.com.br). Se estiver via VPN/proxy corporativo, cheque as regras. A tool não faz retry em falhas de rede pré-HTTP para não mascarar problemas de infra.",
    { erro_original },
  );
}

export function dedupIgnorado(
  entidade: "pedido" | "produto",
  id: string,
  updatedAt_recebido: string,
  updatedAt_cache: string,
): KoldenError {
  // Nota: dedup não é erro conceitual — é status intencional. Mesmo assim usa
  // KoldenError para trafegar via wrapper padronizado quando a tool decidir tratar
  // como erro (não é o caso na v1: as tools retornam status inline). Fica disponível
  // para o eval 03 caso o consumidor prefira o formato de erro.
  return new KoldenError(
    "DEDUP_IGNORADO",
    `${entidade === "pedido" ? "Pedido" : "Produto"} '${id}' ignorado por dedup: updatedAt recebido (${updatedAt_recebido}) é anterior ou igual ao já visto (${updatedAt_cache}).`,
    "Nenhuma ação necessária — comportamento intencional para proteger a Solomon de escritas repetidas. Se realmente quer forçar reenvio, ajuste updatedAt para timestamp mais recente.",
    { entidade, id, updatedAt_recebido, updatedAt_cache },
  );
}

export function segredoAusente(nome: string, path_infisical: string): KoldenError {
  return new KoldenError(
    "SEGREDO_AUSENTE",
    `Segredo '${nome}' não foi encontrado em variáveis de ambiente nem via Infisical.`,
    `Configure o segredo em Infisical no path '${path_infisical}' e rode o servidor via 'infisical run -- node dist/index.js', OU deixe o shim Infisical do Kolden injetar a variável. Ver skill infisical-padrao.`,
    { nome, path_infisical },
  );
}

export function erroInterno(erro_bruto: string): KoldenError {
  return new KoldenError(
    "ERRO_INTERNO",
    "Falha inesperada no MCP Íris — veja o log em ~/.kolden/mcp-iris/server.log.",
    "Abra o log e busque entradas com nivel='error' próximas ao timestamp da chamada. Se persistir, registre issue no Kolden com o request_id (se houver) e o carimbo de tempo.",
    { erro_bruto },
  );
}
