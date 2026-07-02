import { z } from "zod";
import {
  moedaSchema,
  orderIdSchema,
  paisSchema,
  provinciaSchema,
  timestampSolomonSchema,
} from "./comum.js";

// Schema de pedido — espelha docs/07-api-ingestion-orders.md.
// Todos os schemas usam .strict() para rejeitar campos desconhecidos e
// .describe() em cada campo público para orientar agentes cliente.

const orderStatusSchema = z
  .union([z.literal(0), z.literal(1), z.literal(2)])
  .describe(
    "Status do pedido segundo enum Solomon: 0 = Aprovado, 1 = Pendente, 2 = Cancelado.",
  );

const paymentMethodSchema = z
  .union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
    z.literal(15),
  ])
  .describe(
    "Método de pagamento segundo enum Solomon: 1 = Cartão de crédito, 2 = Depósito, 3 = Boleto, 4 = PIX, 15 = Outro.",
  );

const origemSchema = z
  .union([z.literal(0), z.literal(1), z.literal(2)])
  .describe(
    "Origem do pedido: 0 = Web, 1 = Marketplace, 2 = App. Opcional.",
  );

const customerSchema = z
  .object({
    customerId: z.string().min(1).describe("Identificador único do cliente na loja de origem."),
    name: z.string().min(1).describe("Nome completo do cliente."),
    email: z.string().email().optional().describe("Email do cliente. Opcional mas recomendado."),
    phone: z.string().optional().describe("Telefone no formato E.164 quando possível. Ex: '+5511999999999'."),
    provinceCode: provinciaSchema.optional(),
    countryCode: paisSchema.optional(),
    zip: z.string().optional().describe("CEP com ou sem hífen. Ex: '12230-000'."),
    city: z.string().optional().describe("Cidade do endereço principal."),
    createdAt: timestampSolomonSchema.optional(),
    updatedAt: timestampSolomonSchema.optional(),
  })
  .strict()
  .describe("Dados do cliente que fez o pedido.");

const itemSchema = z
  .object({
    item_id: z.string().min(1).describe("Identificador único do item dentro do pedido."),
    productId: z.string().min(1).describe("Identificador do produto (deve corresponder ao productId enviado em /product)."),
    variantId: z.string().min(1).describe("Identificador da variante (deve corresponder ao variantId enviado em /product)."),
    quantity: z.number().int().positive().describe("Quantidade comprada — inteiro positivo."),
    price: z.number().nonnegative().describe("Preço unitário do item."),
    discount: z.number().nonnegative().optional().describe("Desconto aplicado ao item. Opcional."),
    createdAt: timestampSolomonSchema.optional(),
    updatedAt: timestampSolomonSchema.optional(),
  })
  .strict()
  .describe("Item do pedido — corresponde a uma variante × quantidade.");

export const PedidoSolomonSchema = z
  .object({
    // Obrigatórios
    orderId: orderIdSchema,
    name: z.string().min(1).describe("Nome/label do pedido. Ex: 'Pedido #10234'."),
    orderStatus: orderStatusSchema,
    createdAt: timestampSolomonSchema,
    updatedAt: timestampSolomonSchema,
    totalPrice: z.number().nonnegative().describe("Preço total do pedido — soma dos itens após descontos e frete."),
    paymentMethod: paymentMethodSchema,
    currency: moedaSchema,
    provinceCode: provinciaSchema,
    countryCode: paisSchema,
    customer: customerSchema,
    items: z.array(itemSchema).min(1).describe("Itens do pedido — mínimo 1."),

    // Opcionais
    number: z.number().int().positive().optional().describe("Número interno/humano do pedido. Opcional."),
    totalDiscounts: z.number().nonnegative().optional().describe("Desconto total do pedido. Opcional."),
    shippingPrice: z.number().nonnegative().optional().describe("Preço do frete. Opcional."),
    installments: z.number().int().positive().optional().describe("Número de parcelas. Opcional."),
    discountCode: z.string().optional().describe("Cupom aplicado ao pedido. Opcional."),

    // UTMs
    utmSource: z.string().optional().describe("UTM source da URL do pedido. Opcional."),
    utmMedium: z.string().optional().describe("UTM medium. Opcional."),
    utmCampaign: z.string().optional().describe("UTM campaign. Opcional."),
    utmContent: z.string().optional().describe("UTM content. Opcional."),
    utmTerm: z.string().optional().describe("UTM term. Opcional."),

    // Attribution/contexto
    userId: z.string().optional().describe("ID do usuário no cookie server-side. Opcional."),
    userAgent: z.string().optional().describe("User agent do navegador. Opcional."),
    browserIp: z.string().optional().describe("IPv4/IPv6 do navegador. Opcional."),
    cartToken: z.string().optional().describe("Token do carrinho. Opcional."),
    origin: origemSchema.optional(),
  })
  .strict()
  .describe(
    "Payload de criação de pedido na Solomon (POST /admin/v1/order). Todos os campos seguem o schema oficial de docs/07-api-ingestion-orders.md.",
  );

export type PedidoSolomon = z.infer<typeof PedidoSolomonSchema>;
