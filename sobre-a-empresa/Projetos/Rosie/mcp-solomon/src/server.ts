import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { criarPedido, inputSchemaCriarPedido } from "./tools/criar-pedido.js";
import { criarProduto, inputSchemaCriarProduto } from "./tools/criar-produto.js";
import {
  sincronizarCatalogo,
  inputSchemaSincronizarCatalogo,
} from "./tools/sincronizar-catalogo.js";
import {
  solomonValidarConta,
  inputSchemaValidarConta,
} from "./tools/validar-conta.js";
import { KoldenError } from "./lib/erros.js";
import { log } from "./lib/log.js";

export function criarServidor(): McpServer {
  const servidor = new McpServer({
    name: "mcp-iris",
    version: "0.1.0",
  });

  servidor.registerTool(
    "solomon_criar_pedido",
    {
      title: "Criar/atualizar pedido na Solomon",
      description:
        "Cria ou atualiza um pedido no painel Solomon (endpoint POST /admin/v1/order). Use quando um novo pedido for confirmado (webhook Nuvemshop 'order/paid', cron reconciliador ou importação manual). Idempotente por 'orderId + updatedAt': chamadas repetidas com updatedAt mais antigo retornam 'dedup_ignorado' sem tocar a API. Payload segue docs/07-api-ingestion-orders.md.",
      inputSchema: inputSchemaCriarPedido.shape,
      annotations: {
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: true,
      },
    },
    async (input) => envolverErros(() => criarPedido(input)),
  );

  servidor.registerTool(
    "solomon_criar_produto",
    {
      title: "Criar/atualizar produto na Solomon",
      description:
        "Cria ou atualiza um produto no painel Solomon (endpoint POST /admin/v1/product), com suas variantes. Use ao sincronizar catálogo Nuvemshop → Solomon (produto novo, edição de preço, ativação/desativação de variante). Idempotente por 'productId + updatedAt'. Payload segue docs/08-api-ingestion-products.md.",
      inputSchema: inputSchemaCriarProduto.shape,
      annotations: {
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: true,
      },
    },
    async (input) => envolverErros(() => criarProduto(input)),
  );

  servidor.registerTool(
    "solomon_sincronizar_catalogo",
    {
      title: "Sincronizar lote de produtos com a Solomon",
      description:
        "Sincroniza uma lista de produtos em batch com controle de concorrência (max_paralelo) e retry por item. Use ao importar catálogo Nuvemshop inteiro ou ao reconciliar após incidente. Chama internamente 'solomon_criar_produto' para cada item, respeitando o teto de paralelismo e emitindo progresso. Erros por item não interrompem o batch (a menos que 'parar_no_primeiro_erro=true'). Limite: 500 produtos por chamada.",
      inputSchema: inputSchemaSincronizarCatalogo.shape,
      annotations: {
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: true,
      },
    },
    async (input) => envolverErros(() => sincronizarCatalogo(input)),
  );

  servidor.registerTool(
    "solomon_validar_conta",
    {
      title: "Validar token e conta Solomon",
      description:
        "Valida o token Solomon e retorna metadata da conta (companyId, environment detectado, timestamp). Use ao debugar 'por que meus eventos não aparecem no painel?' ou ao verificar se o Infisical está injetando o segredo correto. Cache in-memory de 5min. IMPORTANTE: a Solomon v1 não expõe endpoint de health público — esta tool valida presença dos segredos + companyId. Para confirmar aceitação pelo servidor Solomon, use solomon_criar_pedido com dry_run=true.",
      inputSchema: inputSchemaValidarConta.shape,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: true,
      },
    },
    async (input) => envolverErros(() => solomonValidarConta(input)),
  );

  log.info("Servidor mcp-iris instanciado", { tools_registradas: 4 });
  return servidor;
}

async function envolverErros<T extends { content: Array<{ type: "text"; text: string }> }>(
  fn: () => Promise<T>,
): Promise<T | { isError: true; content: Array<{ type: "text"; text: string }> }> {
  try {
    return await fn();
  } catch (err) {
    if (err instanceof KoldenError) {
      log.warn(`Tool retornou KoldenError ${err.codigo}`, { mensagem: err.message });
      return err.toToolResult();
    }
    log.error("Erro inesperado em tool", { erro: String(err) });
    const payload = {
      erro: {
        codigo: "ERRO_INTERNO",
        mensagem: "Falha inesperada — veja log em ~/.kolden/mcp-iris/server.log.",
        acao_sugerida:
          "Abra o log e busque por entradas com nivel='error' próximas ao timestamp da chamada. Se persistir, registre issue no Kolden.",
        detalhes: { erro_bruto: err instanceof Error ? err.message : String(err) },
      },
    };
    return {
      isError: true as const,
      content: [{ type: "text" as const, text: JSON.stringify(payload, null, 2) }],
    };
  }
}
