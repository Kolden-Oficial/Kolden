# 03 — Eventos: conceitos

Fonte: https://docs.solomon.com.br/events/concepts

## Visão geral

Toda interação do usuário com o site pode virar um evento — insumo tanto para webanalytics quanto para reconstruir a jornada de compra.

Exemplo de jornada:

1. Usuário acessa a página de um produto vindo de anúncio Meta Ads.
2. Adiciona o produto ao carrinho.
3. Continua olhando outros produtos e **não** finaliza.
4. Dias depois recebe campanha de carrinho abandonado por e-mail.
5. Volta e finaliza a compra.

Cada visualização, add-to-cart e checkout desse usuário é um **evento do site**. Os canais por onde ele entrou em cada interação são **pontos de contato**.

## Estrutura dos eventos

Um evento carrega:

- **Navegação:** URL da página, parâmetros UTM, referrer.
- **Cliente:** identificação do navegador, endereço IP.
- **Produto** (quando aplicável): identificador do produto/variante, quantidade.

## Aliases (`custom_aliases`)

Para relacionar eventos a um mesmo usuário e às compras dele, usa-se aliases — identificadores únicos enviados tanto no evento quanto no pedido (API REST).

A Solomon usa nativamente **session_id** e **user_id** como aliases. Outros podem ser enviados:

| Alias | Uso |
|-------|-----|
| **User ID** | Identificador principal para relacionar pedido à sessão do site |
| _Cart Token_ | Relaciona pedido a partir da sessão no site |
| _Email_ | Relaciona pedido a partir da conta do usuário |
| _Customer ID_ | Relaciona pedido a partir da conta do usuário |
| _Phone_ | Relaciona sessão no checkout à conta do usuário |

**Recomendação:** usar **redundância** — enviar o máximo de aliases possíveis, quanto antes possível. `userId` deve receber o alias de maior confiança/precedência.

## Cookies do servidor (first-party de longo prazo)

O alias perfeito para `userId` cumpre três requisitos: maior antecedência na criação, persistência longa, envio tanto do browser quanto do servidor.

Navegadores modernos removem cookies de terceiros e cookies setados via JS em pouco tempo — o usuário que volta depois é tratado como novo, quebrando a atribuição. A solução é **cookie first-party server-side**, que pode durar até 365 dias e sobrevive às políticas agressivas dos browsers.

### Configuração — exemplo Python/Flask

```python
# server.py
from flask import Flask, request, make_response
import uuid

app = Flask(__name__)
ONE_YEAR_SECONDS = 365 * 24 * 60 * 60

@app.before_request
def set_visitor_cookie():
    visitor_id = request.cookies.get("visitor_id")
    if not visitor_id:
        visitor_id = str(uuid.uuid4())
    request.visitor_id = visitor_id

@app.after_request
def apply_cookie(response):
    if request.cookies.get("visitor_id"):
        return response
    response.set_cookie(
        key="visitor_id",
        value=request.visitor_id,
        max_age=ONE_YEAR_SECONDS,
        httponly=True,
        secure=True,
        samesite="Lax"
    )
    return response
```

### Envie o cookie como alias — exemplo React

```jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";

export function PageTracking() {
    const location = useLocation();

    useEffect(() => {
        const visitorId = Cookies.get("visitor_id");
        if (!visitorId) return;

        solomon.track("VIEW_PAGE", null, {
            user_id: visitorId
        });
    }, [location.pathname]);

    return null;
}
```

> Também é válido usar outro alias (ex.: `cart_token`) como `userId` — desde que seja o de maior confiança para aquele contexto.