import { z } from "zod";

// Pattern ISO 8601 UTC exatamente como a Solomon exige (§07/§08 dos docs):
// ^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$
export const timestampSolomonSchema = z
  .string()
  .regex(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/,
    "Timestamp deve ser ISO 8601 UTC no formato AAAA-MM-DDTHH:MM:SSZ (sem milissegundos, sem offset).",
  )
  .describe(
    "Timestamp ISO 8601 UTC (formato AAAA-MM-DDTHH:MM:SSZ, sem milissegundos). Ex: '2026-01-10T14:32:10Z'.",
  );

export const orderIdSchema = z
  .string()
  .min(1)
  .describe("Identificador único do pedido na loja de origem (Nuvemshop, etc.). Ex: 'ord_123456789'.");

export const productIdSchema = z
  .string()
  .min(1)
  .describe("Identificador único do produto na loja de origem. Ex: 'prod_123'.");

export const verbosidadeSchema = z
  .enum(["concise", "detailed"])
  .default("concise")
  .describe(
    "Nível de detalhe da resposta. 'concise' = resumo + próximo passo (default). 'detailed' = payload completo com response bruta da Solomon e latência.",
  );

export const drySeeSchema = z
  .boolean()
  .default(false)
  .describe(
    "Se true, valida o payload via Zod e retorna simulação sem chamar a API Solomon. Útil para revisão de payload em pipeline. Default: false.",
  );

export const moedaSchema = z
  .string()
  .regex(/^[A-Z]{3}$/, "Moeda deve ser ISO 4217 em 3 letras maiúsculas (ex: BRL, USD).")
  .describe("Código de moeda ISO 4217 em maiúsculas. Ex: 'BRL'.");

export const provinciaSchema = z
  .string()
  .regex(/^[A-Z]{2}$/, "Código de UF deve ter 2 letras maiúsculas (ex: SP, RJ).")
  .describe("Código de UF em 2 letras maiúsculas. Ex: 'SP'.");

export const paisSchema = z
  .string()
  .regex(/^[A-Z]{2}$/, "Código de país deve ser ISO 3166-1 alpha-2 em 2 letras maiúsculas.")
  .describe("Código de país ISO 3166-1 alpha-2. Ex: 'BR'.");
