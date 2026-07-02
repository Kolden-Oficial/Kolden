# 09 — Pedidos (visão de negócio)

Fonte: https://docs.solomon.com.br/store/orders

## Visão geral

Todos os pedidos da loja podem e devem ser enviados para a Solomon sempre que **criados ou atualizados**. O processamento é **assíncrono**: cada envio é enfileirado, consolidado e persistido antes de ficar disponível na plataforma.

### Processamento assíncrono

- Cada pedido é enfileirado ao chegar.
- A fila é esvaziada em **até 10 minutos**.
- Só depois do processamento o pedido fica disponível.
- Quando múltiplas versões do mesmo pedido chegam, **prevalece a mais recente** por `updatedAt`.

Essa estratégia garante consistência eventual e tolerância a reenvios/retries.

## Status do pedido (`orderStatus`)

| Valor | Status | Descrição |
|-------|--------|-----------|
| `0` | Aprovado | Confirmado e pago |
| `1` | Pendente | Aguardando confirmação de pagamento |
| `2` | Cancelado | Cancelado |

> Enviar status incorreto **impacta relatórios de receita**. Pedidos `1` (Pendente) **não** são contabilizados como receita aprovada.

## Método de pagamento (`paymentMethod`)

| Valor | Método |
|-------|--------|
| `1` | Cartão de Crédito |
| `2` | Depósito / Transferência Bancária |
| `3` | Boleto |
| `4` | PIX |
| `15` | Outro |

> Evite usar `15` (Outro) como fallback genérico — prejudica análise de métodos.

## Requisição

Criação e atualização usam o **mesmo endpoint** — `POST /admin/v1/order`. O comportamento (create vs update) é determinado pelo `orderId`.

Exemplo Python:

```python
import requests

res = requests.post("https://admin-api.solomon.com.br/admin/v1/order", json={
  "orderid": "ord_123456789",
  "number": 10234,
  "name": "Pedido #10234"
  # ...
}, headers={"Authorization": "Bearer <SEU_TOKEN>"})

print(f"Status: {res.status_code}")
print(f"Response: {res.json()}")
```

## Idempotência e atualização

Um pedido representa uma **transação única**, identificada por `orderId` estável ao longo do tempo. A idempotência é dada pela combinação `orderId` + `updatedAt`:

- Reenvios com o mesmo `orderId` avaliam o `updatedAt` para decidir consolidação.
- `updatedAt` **deve estar sempre em UTC**.
- Atualizações com `updatedAt` **mais antigo** são **ignoradas** (regra vale para pedido, cliente e itens).

Para atualizar, enviar o pedido por inteiro com os novos campos. Para atualizar apenas um item, enviar na lista `items` só o objeto do item a ser atualizado.

## Identificação de itens do pedido

Cada item tem três identificadores com papéis diferentes:

- `itemId` — identificador único do item **dentro do pedido**; permite múltiplas entradas da mesma variante com preços/condições diferentes.
- `variantId` — identifica a variante do produto.
- `productId` — identifica o produto.

`productId` e `variantId` são a **ponte entre pedidos e produtos**. **Devem ser idênticos** aos valores enviados no [endpoint de produtos](10-store-products.md). Ex.: se o produto foi cadastrado com `variantId: "142"`, o pedido também deve usar `variantId: "142"` — nunca variações como `"142_xgg"`. Inconsistência = estatísticas de produto ausentes.

## Cruzamento de dados e jornada do cliente

O campo principal para reconstruir a jornada é o `userId` — enviado no pedido **e** nos eventos do site.

Outros aliases comuns:

- `cartToken` — identificador do carrinho, exclusivo do usuário.
- `customerId` — identificação do cliente na loja.
- `email` — usado pelo cliente na compra.
- `phone` — usado pelo cliente na compra.

Quanto mais consistente o envio, mais precisa a jornada.

## Erros comuns a evitar

- `totalPrice` **≠** soma dos itens + frete − descontos.
- Mesmo `orderId` reutilizado para pedidos diferentes.
- `updatedAt` enviado não é o mais recente disponível.
- Valores monetários em moeda diferente da informada em `currency`.