import { z } from "zod";
import { ProdutoSolomonSchema } from "../schemas/produto.js";
import { drySeeSchema, verbosidadeSchema } from "../schemas/comum.js";
import { enviarProduto } from "../lib/solomon-client.js";
import { log } from "../lib/log.js";
import { KoldenError } from "../lib/erros.js";

export const inputSchemaSincronizarCatalogo = z
  .object({
    produtos: z
      .array(ProdutoSolomonSchema)
      .min(1)
      .max(500)
      .describe(
        "Lista de produtos a sincronizar. Mínimo 1, máximo 500 por chamada. Para batches maiores, quebre em várias chamadas.",
      ),
    max_paralelo: z
      .number()
      .int()
      .min(1)
      .max(10)
      .default(4)
      .describe(
        "Máximo de chamadas HTTP paralelas à Solomon. Default 4. Aumentar acima de 6 pode disparar rate limit (429).",
      ),
    dry_run: drySeeSchema,
    parar_no_primeiro_erro: z
      .boolean()
      .default(false)
      .describe(
        "Se true, interrompe o batch no primeiro item que der erro. Default false (continua, registra erro no item e segue).",
      ),
    verbosidade: verbosidadeSchema,
  })
  .strict();

export type InputSincronizarCatalogo = z.infer<typeof inputSchemaSincronizarCatalogo>;

interface ResultadoItem {
  productId: string;
  status: "enfileirado" | "dedup_ignorado" | "erro" | "dry_run_ok";
  latencia_ms?: number;
  erro_codigo?: string;
  erro_mensagem?: string;
}

async function processarItem(
  produto: z.infer<typeof ProdutoSolomonSchema>,
  dry_run: boolean,
): Promise<ResultadoItem> {
  if (dry_run) {
    return { productId: produto.productId, status: "dry_run_ok" };
  }
  try {
    const resultado = await enviarProduto(produto, {
      id: produto.productId,
      updatedAt: produto.updatedAt,
      entidade: "produto",
    });
    return {
      productId: produto.productId,
      status: resultado.status,
      latencia_ms: resultado.latencia_ms,
    };
  } catch (err) {
    if (err instanceof KoldenError) {
      return {
        productId: produto.productId,
        status: "erro",
        erro_codigo: err.codigo,
        erro_mensagem: err.message,
      };
    }
    return {
      productId: produto.productId,
      status: "erro",
      erro_codigo: "ERRO_INTERNO",
      erro_mensagem: err instanceof Error ? err.message : String(err),
    };
  }
}

/**
 * Processa lista em chunks de max_paralelo. Se parar_no_primeiro_erro=true,
 * checa a cada chunk se houve erro e aborta.
 */
async function processarEmChunks(
  produtos: Array<z.infer<typeof ProdutoSolomonSchema>>,
  max_paralelo: number,
  dry_run: boolean,
  parar_no_primeiro_erro: boolean,
): Promise<{ resultados: ResultadoItem[]; abortado: boolean }> {
  const resultados: ResultadoItem[] = [];
  let abortado = false;

  for (let i = 0; i < produtos.length; i += max_paralelo) {
    const chunk = produtos.slice(i, i + max_paralelo);
    const parciais = await Promise.all(chunk.map((p) => processarItem(p, dry_run)));
    resultados.push(...parciais);

    if (parar_no_primeiro_erro && parciais.some((r) => r.status === "erro")) {
      abortado = true;
      break;
    }
  }

  return { resultados, abortado };
}

export async function sincronizarCatalogo(
  input: InputSincronizarCatalogo,
): Promise<{ content: Array<{ type: "text"; text: string }> }> {
  const { produtos, max_paralelo, dry_run, parar_no_primeiro_erro, verbosidade } =
    input;

  log.info("Tool solomon_sincronizar_catalogo invocada", {
    total: produtos.length,
    max_paralelo,
    dry_run,
    parar_no_primeiro_erro,
  });

  const inicio = Date.now();
  const { resultados, abortado } = await processarEmChunks(
    produtos,
    max_paralelo,
    dry_run,
    parar_no_primeiro_erro,
  );
  const tempo_ms = Date.now() - inicio;

  const sucesso = resultados.filter(
    (r) => r.status === "enfileirado" || r.status === "dry_run_ok",
  ).length;
  const dedup = resultados.filter((r) => r.status === "dedup_ignorado").length;
  const falhas = resultados.filter((r) => r.status === "erro").length;

  const proximo_passo = abortado
    ? `Batch abortado no ${resultados.length}º item por parar_no_primeiro_erro=true. Corrija o item com status='erro' e rerode a partir dele.`
    : falhas > 0
      ? `Batch concluído com ${falhas} falha(s). Verifique 'resultados' (modo detailed) para os codigos de erro por item.`
      : dry_run
        ? "Todos os produtos validaram (dry_run). Rerode com dry_run=false para efetivar."
        : "Todos os produtos foram enfileirados na Solomon. Processamento em até 10 minutos.";

  const payload_concise = {
    total: produtos.length,
    processados: resultados.length,
    sucesso,
    dedup_ignorados: dedup,
    falhas,
    tempo_ms,
    abortado,
    proximo_passo,
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
            max_paralelo,
            resultados: resultados.slice(0, 100),
            resultados_truncados: resultados.length > 100,
          },
          null,
          2,
        ),
      },
    ],
  };
}
