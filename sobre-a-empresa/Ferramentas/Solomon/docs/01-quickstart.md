---
tipo: ferramenta
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/_MOC-ferramentas]]"
relacionado:
  - "[[sobre-a-empresa/Ferramentas/Solomon/docs/README|README]]"
---

# 01 — Início rápido

Fonte: https://docs.solomon.com.br/quickstart

Configure a integração e envie os primeiros pedidos, produtos e eventos em quatro passos.

## Passo 1 — Configure o acesso à API

**Durante o onboarding:** na seção de integração da plataforma de vendas, selecione "API" e clique para gerar os dois tokens de integração exibidos na tela.

**Após o onboarding:**

1. Abra a aba **Chaves de API** no canto superior direito (clique no nome da loja).
2. Crie uma nova chave do tipo **Plataforma Própria** com nome de identificação.
3. Marque os escopos `write_orders` e `write_products`.

É possível gerar API Keys tanto para **Live** quanto para **Sandbox**. Guarde as chaves em local seguro — não são reveladas novamente após a criação.

## Passo 2 — Envie o primeiro pedido

`POST` para o endpoint de pedidos (use `<SEU_TOKEN>` no header):

```bash
curl -X POST https://admin-api.solomon.com.br/admin/v1/order \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "ord_123456789",
    "number": 10234,
    "name": "Pedido #10234",
    "orderStatus": 0,
    "createdAt": "2026-01-10T14:32:10Z",
    "updatedAt": "2026-01-10T14:35:42Z",
    "totalPrice": 249.90,
    "totalDiscounts": 20,
    "shippingPrice": 19.90,
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
    "userId": "d81a69cf-82d5-4aad-9ecd-5945b3cf3528",
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
        "itemId": "item_1",
        "productId": "prod_123",
        "variantId": "var_azul_42",
        "quantity": 1,
        "price": 199.90,
        "discount": 20.00,
        "createdAt": "2026-01-10T14:32:10Z",
        "updatedAt": "2026-01-10T14:32:10Z"
      }]
  }'
```

Se a requisição for bem-sucedida, o pedido é registrado na Solomon.

## Passo 3 — Envie os produtos

`POST` para o endpoint de produtos:

```bash
curl -X POST https://admin-api.solomon.com.br/admin/v1/product \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "prod_123",
    "productName": "Tênis Esportivo Verde",
    "createdAt": "2026-01-10T14:00:00Z",
    "updatedAt": "2026-01-10T14:00:00Z",
    "status": 1,
    "variants": [{
      "variantId": "var_azul_42",
      "title": "Tênis Esportivo Verde - Azul 42",
      "sku": "TEN-VER-AZU-42",
      "price": 199.90,
      "currency": "BRL",
      "createdAt": "2026-01-10T14:00:00Z",
      "updatedAt": "2026-01-10T14:00:00Z"
    }]
  }'
```

Enviar o catálogo completo logo no início da integração é essencial para que dados de funil de produto e estatísticas apareçam. Mantenha-o atualizado conforme produtos são criados/alterados.

## Passo 4 — Envie um evento com o SDK

Instale:

```bash
npm install @solomon/events
```

Inicialize e dispare o evento de compra:

```javascript
import { SolomonSDK } from "@solomon/events";

const solomon = new SolomonSDK({
  companyId: "SEU_COMPANY_ID",
});

solomon.track("CHECKOUT_COMPLETED", {
  items: [{ item_id: "item_1", item_quantity: 1 }]
}, {
  email: "cliente_teste@email.com",
  phone: "+5511999999999",
  customer_id: "cus_987654321",
  cart_token: "cart_abcd1234"
});
```

A Solomon usa esses eventos para atribuir corretamente cada pedido.

## Próximos passos

- [Enviar e atualizar pedidos](09-store-orders.md)
- [Enviar e atualizar produtos](10-store-products.md)
- [Rastrear eventos do site](04-eventos-web.md)
- [Referência da API](06-api-introducao.md)