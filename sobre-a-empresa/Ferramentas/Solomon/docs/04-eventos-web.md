# 04 — Eventos web (SDK JavaScript)

Fonte: https://docs.solomon.com.br/events/web e https://docs.solomon.com.br/events/events

## Inicialização

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `companyId` | string | ID de 20 caracteres da loja na Solomon. Em **Configurações > Detalhes da Conta > ID da Loja**. **Não é** a API Key. |
| `debug` | boolean | Opcional — ativa logs de debug no console |
| `useTouchpoint` | boolean | Opcional — habilita envio ao pixel (necessário para atribuição funcionar) |

## Método `track`

```
solomon.track(eventName: string, payload?: object, customAliases?: object)
```

| Argumento | Descrição |
|-----------|-----------|
| `eventName` | Nome do evento (ver tabela abaixo) — **required** |
| `payload` | Dados específicos do evento (ID do produto, itens do carrinho…) |
| `customAliases` | Identificadores para atribuição de sessão a pedido |

`track` é **assíncrono** — para monitorar erro, ative `debug` e observe o console.

## Conectando via biblioteca JS (script no HTML)

```html
<!-- 1. Carregue a biblioteca -->
<script src="https://storage.googleapis.com/solomon-app-scripts/events.min.js"></script>

<!-- 2. Inicialize -->
<script>
  window.solomon = new SolomonSDK({
    companyId: "SEU_COMPANY_ID",
    debug: true,
    useTouchpoint: true
  });
</script>

<!-- 3. Dispare -->
<script>
  document.addEventListener("DOMContentLoaded", (event) => {
    window.solomon.track("VIEW_PAGE");
  });
</script>
```

## Conectando via pacote npm (React)

```bash
npm install @solomon-tech/events
```

**Context provider:**

```tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { SolomonSDK } from '@solomon-tech/events';

export const SolomonContext = createContext<SolomonSDK | null>(null);

export function SolomonProvider({ children }: { children: React.ReactNode }) {
    const [sdk, setSdk] = useState<SolomonSDK | null>(null);

    useEffect(() => {
        const instance = new SolomonSDK({
          companyId: 'SEU_COMPANY_ID',
          debug: true,
          useTouchpoint: true,
        });
        setSdk(instance);
    }, []);

    if (!sdk) return null;
    return (
        <SolomonContext.Provider value={sdk}>
          {children}
        </SolomonContext.Provider>
    );
}
```

**Hook + tracker:**

```tsx
export const useSolomon = (): SolomonSDK => {
    const context = useContext(SolomonContext);
    if (!context) throw new Error('useSolomon must be used within a SolomonProvider');
    return context;
};

export function PageViewTracker() {
  const solomon = useSolomon();
  useEffect(() => { solomon.track("VIEW_PAGE"); }, [solomon]);
  return null;
}
```

## Eventos disponíveis

Todos herdam **propriedades nativas** (enviadas automaticamente): `user_id`, `session_id`, `fbp`, `fpc`, `page_referrer`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `url`, `path`.

| Evento | Quando dispara | Payload próprio |
|--------|----------------|-----------------|
| `VIEW_PAGE` | Usuário acessa qualquer página | — |
| `CONTENT_VIEW` | Página de produto acessada | `id` (req), `variant`, `price`, `title` |
| `ADD_TO_CART` | Produto adicionado ao carrinho | `item_id` (req), `item_quantity` (req) |
| `INITIATE_CHECKOUT` | Página de checkout acessada | `items[]` (req: `item_id`, `item_quantity`) |
| `ADD_SHIPPING_INFO` | Informações de entrega preenchidas | `items[]` (req) |
| `ADD_CUSTOMER_INFO` | Informações de contato preenchidas | `items[]` (req) |
| `ADD_PAYMENT_INFO` | Informações de pagamento preenchidas | `items[]` (req) |
| `CHECKOUT_COMPLETED` | Compra finalizada | `items[]` (req) |

**Aliases aceitos como 3º argumento** (recomendação: enviar o máximo): `user_id`, `cart_token`, `email`, `customer_id`, `phone`, `order_id`.

O envio de `order_id` no `CHECKOUT_COMPLETED` **atrela o evento diretamente** ao pedido enviado via API.

## Exemplos

```javascript
// Visualização de produto
solomon.track("CONTENT_VIEW", {
  id: "prod_12345",
  variant: "var_azul_23",
  title: "Tênis Esportivo Azul",
  price: 199.90
}, {
  user_id: "visitor_abc123"
});

// Adição ao carrinho
solomon.track("ADD_TO_CART", {
  item_id: "prod_12345",
  item_quantity: 1
}, {
  user_id: "visitor_abc123",
  cart_token: "cart_xyz789"
});

// Checkout completo (atrelado ao pedido)
solomon.track("CHECKOUT_COMPLETED", {
  items: [{ item_id: "prod_12345", item_quantity: 1 }]
}, {
  order_id: "ord_1234567890"
});
```