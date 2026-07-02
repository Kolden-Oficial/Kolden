# 10 — Produtos (visão de negócio)

Fonte: https://docs.solomon.com.br/store/products

## Visão geral

Todos os produtos do catálogo da loja podem ser enviados para a Solomon sempre que **criados ou atualizados**. O processamento é **assíncrono**: cada envio é enfileirado, consolidado e persistido antes de ficar disponível.

### Processamento assíncrono

- Cada produto enviado é enfileirado.
- A fila é esvaziada em **até 10 minutos**.
- Só depois do processamento o produto fica disponível.
- Quando múltiplas versões do mesmo produto chegam, **prevalece a mais recente** por `updatedAt`.

## Requisição

Criação e atualização usam o **mesmo endpoint** — `POST /admin/v1/product`. O comportamento é determinado por `productId` + `variantId`.

Exemplo Python:

```python
import requests

res = requests.post("https://admin-api.solomon.com.br/admin/v1/product", json={
  "productId": "prod_123456789",
  "productName": "Tênis Esportivo Verde",
  "createdAt": "2006-01-02 15:04:05",
  "variants": [{
    "variantId": "var_123",
    "createdAt": "2006-01-02 15:04:05"
    # ...
  }]
  # ...
}, headers={"Authorization": "Bearer <SEU_TOKEN>"})

print(f"Status: {res.status_code}")
print(f"Response: {res.json()}")
```

## Modelo produto × variante

Na Solomon:

- **Produto** = entidade lógica do catálogo.
- **Variantes** = unidades comercializáveis.

Portanto, a **variante é quem carrega preço e custo**. Todo produto precisa **pelo menos uma variante** (que pode ser a padrão).

Produtos com variação por cor, tamanho, modelo, material, voltagem, etc. modelam cada combinação como uma variante distinta, com preço, custo e SKU próprios.

## Idempotência e atualização

Cada produto é único no catálogo; cada variante é única para um produto. Os IDs (produto e variante) junto aos respectivos `updatedAt` garantem que a versão mais recente esteja disponível.

Para atualizar, enviar por inteiro com os novos campos — vale tanto para o produto quanto para uma variante dentro dele.

`updatedAt` do produto e da variante **deve estar sempre em UTC**.

## Ponte com pedidos (`productId` / `variantId`)

`productId` e `variantId` são a **ponte entre produtos e pedidos**. **Devem ser idênticos** aos valores enviados no [endpoint de pedidos](09-store-orders.md). Ex.: se cadastrou com `variantId: "142"`, o pedido também deve usar `variantId: "142"` — nada de `"142_xgg"`. Inconsistência = estatísticas de produto sumidas.