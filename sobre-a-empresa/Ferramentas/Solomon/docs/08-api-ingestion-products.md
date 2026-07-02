# 08 — API: enviar produto

Fonte: https://docs.solomon.com.br/api-reference/ingestion/create-product

## Endpoint

```
POST /admin/v1/product
```

- Sandbox: `https://admin-api.sandbox.solomon.com.br/admin/v1/product`
- Live: `https://admin-api.solomon.com.br/admin/v1/product`

Header obrigatório: `Authorization: Bearer <SEU_TOKEN>` — escopo `products.write`.

## Exemplo — cURL

```bash
curl --request POST \
  --url https://admin-api.sandbox.solomon.com.br/admin/v1/product \
  --header 'Authorization: Bearer <SEU_TOKEN>' \
  --header 'Content-Type: application/json' \
  --data '{
  "productId": "prod_123",
  "productName": "Tênis Esportivo",
  "createdAt": "2026-01-10T14:32:10Z",
  "updatedAt": "2026-01-10T14:32:10Z",
  "status": 1,
  "imageUrl": "https://example.com/image.jpg",
  "url": "https://example.com/product",
  "variants": [
    {
      "variantId": "var_verde_42",
      "createdAt": "2026-01-10T14:32:10Z",
      "updatedAt": "2026-01-10T14:32:10Z",
      "title": "Tênis Esportivo Verde",
      "price": 199.9,
      "cost": 60,
      "currency": "BRL",
      "sku": "var_verde_42"
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

O produto foi **recebido e enfileirado**. Processamento em até 10 minutos. Códigos de erro: `400`, `500` além dos genéricos.

## Body — campos obrigatórios

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `productId` | string | ID do produto |
| `productName` | string | Nome do produto |
| `createdAt` | ISO 8601 UTC | Pattern `^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$` |
| `updatedAt` | ISO 8601 UTC | Mesmo pattern |

## Body — campos opcionais

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `status` | enum int | `0` Inativo, `1` Ativo |
| `imageUrl` | string | URL da imagem do produto |
| `url` | string | URL do produto na loja |
| `variants[]` | object array | Variantes do produto |

Detalhes de idempotência e modelo produto-variante em [10 — Produtos (visão de negócio)](10-store-products.md).