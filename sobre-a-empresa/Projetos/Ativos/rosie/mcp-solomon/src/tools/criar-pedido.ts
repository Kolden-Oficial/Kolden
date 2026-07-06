import { z } from "zod";
import { PedidoSolomonSchema } from "../schemas/pedido.js";
import { drySeeSchema, verbosidadeSchema } from "../schemas/comum.js";
import { enviarPedido } from "../lib/solomon-client.js";
import { log } from "../lib/log.js";
import { payloadInvalido } from "../lib/erros.js";

export const inputSchemaCriarPedido = z
  .object({
    pedido: PedidoSolomonSchema,
    dry_run: drySeeSchema,
    verbosidade: verbosidadeSchema,
  })
  .strict();

export type InputCriarPedido = z.infer<typeof inputSchemaCriarPedido>;

export async function criarPedido(
  input: InputCriarPedido,
): Promise<{ content: Array<{ type: "text"; text: string }> }> {
  const { pedido, dry_run, verbosidade } = input;

  // Zod já validou. Ainda assim, camada de guarda para IDs.
  if (!pedido.orderId || !pedido.updatedAt) {
    throw payloadInvalido(
      "orderId/updatedAt",
      "orderId e updatedAt são obrigatórios para dedup idempotente",
    );
  }

  log.info("Tool solomon_criar_pedido invocada", {
    orderId: pedido.orderId,
    updatedAt: pedido.updatedAt,
    items_count: pedido.items.length,
    dry_run,
  });

  if (dry_run) {
    const payload_concise = {
      orderId: pedido.orderId,
      status: "dry_run_ok",
      proximo_passo:
        "Rerode com dry_run=false para efetivar o envio à Solomon. Payload passou na validação Zod.",
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
              pedido_validado: pedido,
              nota:
                "dry_run=true — nenhuma chamada HTTP foi feita. A resposta abaixo é o payload que seria enviado à Solomon.",
            },
            null,
            2,
          ),
        },
      ],
    };
  }

  const resultado = await enviarPedido(pedido, {
    id: pedido.orderId,
    updatedAt: pedido.updatedAt,
    entidade: "pedido",
  });

  const payload_concise = {
    orderId: pedido.orderId,
    status: resultado.status,
    proximo_passo:
      resultado.status === "enfileirado"
        ? "Pedido enfileirado na Solomon. Processamento em até 10 minutos. Se precisar verificar aparição no painel, aguarde o intervalo e consulte manualmente (a v1 da API é write-only)."
        : "Pedido ignorado por dedup — updatedAt não é mais recente que o já processado. Nenhuma ação necessária.",
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
            http_status: resultado.http_status,
            latencia_ms: resultado.latencia_ms,
            request_id: resultado.request_id ?? null,
            timestamp: resultado.timestamp ?? null,
            dedup_reason: resultado.dedup_reason ?? null,
            response_solomon: resultado.response_bruta ?? null,
          },
          null,
          2,
        ),
      },
    ],
  };
}
