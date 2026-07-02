import { z } from "zod";
import {
  moedaSchema,
  productIdSchema,
  timestampSolomonSchema,
} from "./comum.js";

// Schema de produto — espelha docs/08-api-ingestion-products.md.

const statusProdutoSchema = z
  .union([z.literal(0), z.literal(1)])
  .describe("Status do produto: 0 = Inativo, 1 = Ativo.");

const variantSchema = z
  .object({
    variantId: z.string().min(1).describe("Identificador único da variante dentro do produto."),
    createdAt: timestampSolomonSchema,
    updatedAt: timestampSolomonSchema,
    title: z.string().min(1).describe("Título da variante — geralmente 'Nome do produto + atributo'. Ex: 'Tênis Esportivo Verde'."),
    price: z.number().nonnegative().describe("Preço de venda da variante."),
    cost: z.number().nonnegative().optional().describe("Custo da variante. Opcional mas útil para métricas de margem."),
    currency: moedaSchema.optional().describe("Moeda da variante em ISO 4217. Se omitido, herda do produto ou default da conta."),
    sku: z.string().min(1).optional().describe("SKU da variante — código interno de estoque. Opcional mas recomendado."),
  })
  .strict()
  .describe("Variante de um produto — cada combinação de atributos (cor/tamanho/etc.) é uma variante distinta.");

export const ProdutoSolomonSchema = z
  .object({
    // Obrigatórios
    productId: productIdSchema,
    productName: z.string().min(1).describe("Nome do produto exibido na loja."),
    createdAt: timestampSolomonSchema,
    updatedAt: timestampSolomonSchema,

    // Opcionais
    status: statusProdutoSchema.optional(),
    imageUrl: z
      .string()
      .url()
      .optional()
      .describe("URL absoluta da imagem principal do produto. Opcional."),
    url: z
      .string()
      .url()
      .optional()
      .describe("URL absoluta da página do produto na loja. Opcional."),
    variants: z
      .array(variantSchema)
      .min(0)
      .optional()
      .describe(
        "Variantes do produto (cor, tamanho, etc.). Pode ser vazio ou omitido para produto único sem variação.",
      ),
  })
  .strict()
  .describe(
    "Payload de criação de produto na Solomon (POST /admin/v1/product). Todos os campos seguem o schema oficial de docs/08-api-ingestion-products.md.",
  );

export type ProdutoSolomon = z.infer<typeof ProdutoSolomonSchema>;
