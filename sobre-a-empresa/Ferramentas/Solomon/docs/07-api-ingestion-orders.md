---
tipo: ferramenta
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/_MOC-ferramentas]]"
relacionado:
  - "[[sobre-a-empresa/Ferramentas/Solomon/docs/README|README]]"
---

# 07 — API: enviar pedido

Fonte: https://docs.solomon.com.br/api-reference/ingestion/create-order

## Endpoint

```
POST /admin/v1/order
```

- Sandbox: `https://admin-api.sandbox.solomon.com.br/admin/v1/order`
- Live: `https://admin-api.solomon.com.br/admin/v1/order`

Header obrigatório: `Authorization: Bearer <SEU_TOKEN>` — escopo `orders.write`.

## Exemplo — cURL

```bash
curl --request POST \
  --url https://admin-api.sandbox.solomon.com.br/admin/v1/order \
  --header 'Authorization: Bearer <SEU_TOKEN>' \
  --header 'Content-Type: application/json' \
  --data '{
  "orderId": "ord_123456789",
  "number": 10234,
  "name": "Pedido #10234",
  "orderStatus": 0,
  "createdAt": "2026-01-10T14:32:10Z",
  "updatedAt": "2026-01-10T14:35:42Z",
  "totalPrice": 249.9,
  "totalDiscounts": 20,
  "shippingPrice": 19.9,
  "paymentMethod": 2,
  "installments": 3,
  "currency": "BRL",
  "discountCode": "WELCOME10",
  "provinceCode": "SP",
  "countryCode": "BR",
  "utmSource": "facebook",
  "utmMedium": "cpc",
  "utmCampaign": "promo_janeiro",
  "utmContent": "video_1",
  "utmTerm": "tenis masculino",
  "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
  "browserIp": "189.45.123.10",
  "cartToken": "cart_abcd1234",
  "customer": {
    "customerId": "cus_987654321",
    "name": "Cliente Teste",
    "email": "cliente_teste@email.com",
    "phone": "+5511999999999",
    "provinceCode": "SP",
    "countryCode": "BR",
    "zip": "12230-000",
    "city": "São José dos Campos",
    "createdAt": "2025-11-02T10:15:00Z",
    "updatedAt": "2026-01-10T14:30:00Z"
  },
  "items": [
    {
      "item_id": "item_1",
      "productId": "prod_123",
      "variantId": "var_azul_42",
      "quantity": 1,
      "price": 199.9,
      "discount": 20,
      "createdAt": "2026-01-10T14:32:10Z",
      "updatedAt": "2026-01-10T14:32:10Z"
    }
  ]
}'
```

## Resposta (202)

```json
{
  "success": true,
  "request_id": "<string>",
  "timestamp": "<string>"
}
```

O pedido foi **recebido e enfileirado**. Processamento em até 10 minutos (§[09](09-store-orders.md)). Códigos de erro possíveis: `400`, `500` além dos genéricos (ver §[06](06-api-introducao.md)).

## Body — campos obrigatórios

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `orderId` | string | ID do pedido |
| `name` | string | Nome do pedido |
| `orderStatus` | enum int | `0` Aprovado, `1` Pendente, `2` Cancelado |
| `createdAt` | ISO 8601 UTC | Data de criação (pattern `^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$`) |
| `updatedAt` | ISO 8601 UTC | Data de atualização (mesmo pattern) |
| `totalPrice` | number | Preço total do pedido |
| `paymentMethod` | enum int | `1` Cartão de crédito, `2` Depósito, `3` Boleto, `4` PIX, `15` Outro |
| `currency` | string | Moeda ISO 4217 (`^[A-Z]{3}$`) — ex.: `"BRL"` |
| `provinceCode` | string | Código de UF (`^[A-Z]{2}$`) — ex.: `"SP"` |
| `countryCode` | string | ISO 3166-1 alpha-2 — ex.: `"BR"` |
| `customer` | object | Cliente que fez o pedido |
| `items[]` | object array | Itens do pedido |

## Body — campos opcionais

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `number` | integer | Número do pedido |
| `totalDiscounts` | number | Desconto total |
| `shippingPrice` | number | Preço do frete |
| `installments` | integer | Número de parcelas |
| `discountCode` | string | Código de cupom aplicado |
| `utmSource` / `utmMedium` / `utmCampaign` / `utmContent` / `utmTerm` | string | UTMs da URL do pedido |
| `userId` | string | ID do usuário (do cookie server-side) |
| `userAgent` | string | User agent do navegador |
| `browserIp` | string | IPv4/IPv6 do navegador |
| `cartToken` | string | Token do carrinho |
| `origin` | enum int | `0` Web, `1` Marketplace, `2` App |

Detalhes de idempotência, cruzamento de jornada e erros comuns em [09 — Pedidos (visão de negócio)](09-store-orders.md).