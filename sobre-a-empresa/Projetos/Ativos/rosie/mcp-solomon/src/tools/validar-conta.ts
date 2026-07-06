import { z } from "zod";
import { verbosidadeSchema } from "../schemas/comum.js";
import { validarConta } from "../lib/solomon-client.js";
import { log } from "../lib/log.js";

export const inputSchemaValidarConta = z
  .object({
    verbosidade: verbosidadeSchema,
  })
  .strict();

export type InputValidarConta = z.infer<typeof inputSchemaValidarConta>;

export async function solomonValidarConta(
  input: InputValidarConta,
): Promise<{ content: Array<{ type: "text"; text: string }> }> {
  const { verbosidade } = input;

  log.info("Tool solomon_validar_conta invocada");

  const metadata = await validarConta();

  const payload_concise = {
    token_ok: metadata.token_ok,
    companyId: metadata.companyId,
    environment: metadata.environment,
    validado_em: metadata.validado_em,
    proximo_passo: metadata.token_ok
      ? `Token OK para conta '${metadata.companyId}' no ambiente '${metadata.environment}'. Pode prosseguir com solomon_criar_pedido, solomon_criar_produto ou solomon_sincronizar_catalogo.`
      : "Token ausente ou vazio. Verifique o Infisical (/kolden/prod/SOLOMON_TOKEN_API ou /kolden/dev/) e restarte o processo.",
  };

  if (verbosidade === "concise") {
    return { content: [{ type: "text", text: JSON.stringify(payload_concise, null, 2) }] };
  }

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(
          {
            ...payload_concise,
            latencia_ms: metadata.latencia_ms,
            origem_validacao: metadata.origem_validacao,
            nota:
              "A Solomon v1 não expõe endpoint de health público. Esta tool valida a presença dos segredos + companyId configurado. Se você precisa confirmar aceitação pelo servidor Solomon, invoque solomon_criar_pedido com dry_run=true.",
          },
          null,
          2,
        ),
      },
    ],
  };
}
