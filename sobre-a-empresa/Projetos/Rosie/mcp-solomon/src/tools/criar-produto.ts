import { z } from "zod";
import { ProdutoSolomonSchema } from "../schemas/produto.js";
import { drySeeSchema, verbosidadeSchema } from "../schemas/comum.js";
import { enviarProduto } from "../lib/solomon-client.js";
import { log } from "../lib/log.js";
import { payloadInvalido } from "../lib/erros.js";

export const inputSchemaCriarProduto = z
  .object({
    produto: ProdutoSolomonSchema,
    dry_run: drySeeSchema,
    verbosidade: verbosidadeSchema,
  })
  .strict();

export type InputCriarProduto = z.infer<typeof inputSchemaCriarProduto>;

export async function criarProduto(
  input: InputCriarProduto,
): Promise<{ content: Array<{ type: "text"; text: string }> }> {
  const { produto, dry_run, verbosidade } = input;

  if (!produto.productId || !produto.updatedAt) {
    throw payloadInvalido(
      "productId/updatedAt",
      "productId e updatedAt são obrigatórios para dedup idempotente",
    );
  }

  const variants_count = produto.variants?.length ?? 0;

  log.info("Tool solomon_criar_produto invocada", {
    productId: produto.productId,
    updatedAt: produto.updatedAt,
    variants_count,
    dry_run,
  });

  if (dry_run) {
    const payload_concise = {
      productId: produto.productId,
      variants_count,
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
            { ...payload_concise, produto_validado: produto },
            null,
            2,
          ),
        },
      ],
    };
  }

  const resultado = await enviarProduto(produto, {
    id: produto.productId,
    updatedAt: produto.updatedAt,
    entidade: "produto",
  });

  const variantes_processadas = (produto.variants ?? []).map((v) => ({
    variantId: v.variantId,
    status: resultado.status === "enfileirado" ? "enfileirado" : "dedup_ignorado",
  }));

  const payload_concise = {
    productId: produto.productId,
    variants_count,
    status: resultado.status,
    proximo_passo:
      resultado.status === "enfileirado"
        ? "Produto enfileirado na Solomon. Processamento em até 10 minutos. Após esse intervalo, o produto e suas variantes aparecem no painel."
        : "Produto ignorado por dedup — updatedAt não é mais recente que o já processado. Nenhuma ação necessária.",
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
            variantes_processadas,
            response_solomon: resultado.response_bruta ?? null,
          },
          null,
          2,
        ),
      },
    ],
  };
}
