---
tipo: ferramenta
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/RDStation/ferramentas]]"
---

# RD Station Marketing — API REST (v2.0)

Guia técnico operacional da API pública de RD Station Marketing.

**Base URL única**: `https://api.rd.services`
**Portal oficial**: https://developers.rdstation.com/
**Índice AI (llms.txt)**: https://developers.rdstation.com/llms.txt (117 KB, 475 linhas — SSoT machine-readable indexa TODOS os endpoints em OpenAPI)

Verificado em **2026-08-18**.

---

## 1. O que existe (e o que não existe)

| Superfície | Existe via API? | Formato |
|-----------|----------------|---------|
| CRUD de contatos | ✅ Sim | REST completo |
| Custom fields (schema + valores) | ✅ Sim | REST completo |
| Eventos (conversão, e-commerce, oportunidade, mídia) | ✅ Sim | POST `/platform/events` (OAuth2) ou `/platform/conversions` (API Key só conversão) |
| Tags (aplicar/remover em lead) | ✅ Sim | POST `/platform/contacts/{id}/{val}/tag` |
| Segmentações | ⚠️ Só leitura | GET `/platform/segmentations/{id}/contacts`. **Sem POST/PUT** — criação/edição é UI-only |
| Funis (default) | ✅ Sim | GET / PUT `/platform/contacts/{id}/{val}/funnels/default` |
| **Fluxos de automação — CRUD** | ❌ **Não** | **UI-only.** API não cria/edita/publica/pausa/duplica fluxo |
| Fluxos — inserir leads em fluxo existente | ✅ Sim | POST `/platform/workflows/{id}/leads` (rate limit crítico: 1/10/100 req/h por plano) |
| Fluxos — leitura de status | ✅ Sim | GET `/platform/workflows/{id}/leads/{started|left|action/N}` |
| **E-mails — enviar transacional avulso** | ❌ **Não** | UI/fluxo apenas. Para transacional fora da RD: outro provedor (SES/SendGrid) |
| **E-mails — criar template** | ❌ **Não** | UI-only |
| E-mails — listar campanhas | ✅ Só leitura | GET `/platform/emails` |
| Analytics (e-mails, workflow-emails, funnel, conversions) | ✅ Só leitura | GET `/platform/analytics/*` |
| Landing Pages, Pop-ups, Formulários | ⚠️ Só listar | GET `/platform/landing-pages`, `/popups`, `/embeddables` |
| Catálogo de produtos (para e-mails dinâmicos) | ✅ CRUD | `/platform/catalogs/*` |
| Webhooks (RD → cliente) | ✅ CRUD | `/integrations/webhooks` |

**Conclusão operacional**: RD Station Marketing é uma plataforma **UI-first**. A API é ótima para **feed de dados** (eventos, contatos, tags, catálogo) e **query** (analytics, leads no fluxo), mas o **modelo do fluxo** e os **templates de e-mail** precisam ser construídos manualmente por humano na UI. Não há IaC nativo — replicação entre contas de clientes é manual.

---

## 2. Autenticação — 2 formas oficiais

### 2.1 OAuth2 Authorization Code + Refresh Token (padrão para tudo)

Header em cada request:
```
Authorization: Bearer <access_token>
Content-Type: application/json
Accept: application/json
```

Fluxo completo (4 passos):

**Passo 1 — Criar App OAuth2**
- UI: https://appstore.rdstation.com/pt-BR/publisher
- Login → "Quero criar um app" → nome (ex.: "Kolden — Integração Rosie") → tipo **"Aplicativo privado"** → "Criar app"
- Preencher idioma (PT) + Callback URL(s) — uma por linha, deve começar com `http`/`https`
- Salvar → gera `client_id` + `client_secret` automaticamente
- Guardar as duas credenciais (reencontráveis em My Apps → três pontos → "Get credentials")
- Propagação de mudanças no App: até 1h
- Sem sandbox — testar na conta própria ou em conta Tech Partner separada

**Passo 2 — Obter `code` (redirect do usuário)**
```
GET https://api.rd.services/auth/dialog?client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&state=RANDOM_TOKEN
```
- `redirect_uri` deve bater EXATAMENTE (comparação string) com a callback do App
- `state` (opcional mas recomendado) — token anti-CSRF; a RD ecoa de volta
- Usuário autoriza no browser → RD redireciona para `{callback}?code={CODE}&state={STATE}`
- **`code` expira**: no primeiro uso OU 60 minutos, o que vier antes

**Passo 3 — Trocar `code` por tokens**
```http
POST https://api.rd.services/auth/token?token_by=code
Content-Type: application/json

{
  "client_id": "CLIENT_ID",
  "client_secret": "CLIENT_SECRET",
  "code": "CODE"
}
```

Resposta 200:
```json
{
  "access_token": "eyJ0eXAiOi...",
  "expires_in": 86400,
  "refresh_token": "9YORmXHgOI32k-Y22tZWm-rsf--oFPr8JDCQIQhBEUY"
}
```

- **`access_token`** — JWT, válido por **24h** (`expires_in: 86400`)
- **`refresh_token`** — **não expira** (declaração oficial). **Sensibilidade máxima** — chave-mestra da conta

**Passo 4 — Refresh quando expirar (recomendado: só em 401, não a cada request)**
```http
POST https://api.rd.services/auth/token
Content-Type: application/json

{
  "client_id": "CLIENT_ID",
  "client_secret": "CLIENT_SECRET",
  "refresh_token": "REFRESH_TOKEN"
}
```
- Response = mesma estrutura do Passo 3 (novo `access_token` + `refresh_token` possivelmente rotacionado)
- **Sempre reatribuir `refresh_token`** ao valor de resposta (código Python oficial confirma)

**Não existe endpoint público de revoke.** Revogação = admin da conta desconecta o app na UI da RD, OU dono do App deleta/regenera credenciais no App Publisher. Ambas invalidam access_token e refresh_token existentes.

**Não existe sistema de scopes granulares.** O JWT gerado tem `"scope":""` (vazio). 1 app autorizado = acesso total à conta autorizada.

### 2.2 API Key (só para eventos de conversão)

```http
POST https://api.rd.services/platform/conversions?api_key=<KEY>
Content-Type: application/json

{
  "event_type": "CONVERSION",
  "event_family": "CDP",
  "payload": { "conversion_identifier": "form-newsletter", "email": "..." }
}
```

- **Escopo restrito**: só envio de eventos de conversão padrão (`CONVERSION`). Não serve para OPPORTUNITY, SALE, ECOMMERCE_*.
- **Não expira** (estática, revogável só via UI).
- **Blast radius menor** — usar para integrações internas simples (formulários, LPs custom) onde vazamento de refresh_token seria catastrófico.

### 2.3 Não existe (esclarecimentos)

- ❌ Client Credentials grant (server-to-server sem consentimento humano)
- ❌ PKCE (RD é backend-only OAuth2)
- ❌ APIs 1.2/1.3 com `token_rdstation` (legadas, migrar para 2.0)

---

## 3. Endpoints — matriz completa

| Recurso | Método | Path | Auth |
|---------|--------|------|------|
| Contato consultar | GET | `/platform/contacts/{identifier}/{value}` | OAuth2 |
| Contato criar | POST | `/platform/contacts` | OAuth2 |
| Contato upsert (email/uuid/phone) | PATCH | `/platform/contacts/{identifier}/{value}` | OAuth2 |
| Contato excluir | DELETE | `/platform/contacts/{identifier}/{value}` | OAuth2 |
| Contato eventos históricos | GET | `/platform/contacts/{uuid}/events` | OAuth2 |
| Contato adicionar tag (acumula) | POST | `/platform/contacts/{identifier}/{value}/tag` | OAuth2 |
| Contato funil default | GET / PUT | `/platform/contacts/{identifier}/{value}/funnels/default` | OAuth2 |
| Custom fields | GET/POST/PATCH/DELETE | `/platform/contacts/fields` | OAuth2 |
| Segmentação — contatos | GET | `/platform/segmentations/{id}/contacts` | OAuth2 |
| Fluxo — inserir leads | POST | `/platform/workflows/{id}/leads` | OAuth2 |
| Fluxo — listar | GET | `/platform/workflows` | OAuth2 |
| Fluxo — obter por id | GET | `/platform/workflows/{id}` | OAuth2 |
| Fluxo — leads iniciados | GET | `/platform/workflows/{id}/leads/started` | OAuth2 |
| Fluxo — leads saíram | GET | `/platform/workflows/{id}/leads/left` | OAuth2 |
| Fluxo — leads em ação | GET | `/platform/workflows/{id}/leads/action/{action_id}` | OAuth2 |
| Evento disparar (unificado) | POST | `/platform/events?event_type={type}` | OAuth2 |
| Evento batch (≤0,2 MB) | POST | `/platform/events/batch` | OAuth2 |
| Conversão via API Key | POST | `/platform/conversions` | API Key |
| Analytics e-mails | GET | `/platform/analytics/emails` | OAuth2 |
| Analytics e-mails de fluxo | GET | `/platform/analytics/workflow-emails` | OAuth2 |
| Analytics funil vendas | GET | `/platform/analytics/funnel` | OAuth2 |
| Analytics ativos de conversão | GET | `/platform/analytics/conversions` | OAuth2 |
| E-mails listar | GET | `/platform/emails` | OAuth2 |
| Landing pages listar | GET | `/platform/landing-pages` | OAuth2 |
| Pop-ups listar | GET | `/platform/popups` | OAuth2 |
| Formulários listar | GET | `/platform/embeddables` | OAuth2 |
| Catálogo produtos CRUD | GET/POST/PATCH/DELETE | `/platform/catalogs/*` | OAuth2 |
| Webhooks | GET/POST/PUT/DELETE | `/integrations/webhooks[/{uuid}]` | OAuth2 |

---

## 4. Contacts — payloads reais

**Identificador canônico**: `email`, `uuid` ou `phone` (E.164). Path usa `/{identifier}/{value}` — ex.: `/platform/contacts/email/contato@exemplo.com`.

**POST `/platform/contacts`** — cria (falha `EMAIL_ALREADY_IN_USE` se já existir):
```json
{
  "name": "Cliente Rosie",
  "email": "contato@exemplo.com",
  "phone": "+5511999999999",
  "job_title": "Diretora",
  "city": "São Paulo",
  "state": "SP",
  "country": "Brasil",
  "tags": ["origem-newsletter","persona-fashion"],
  "cf_tamanho_camisa": "P",
  "legal_bases": [{"category":"communications","type":"consent","status":"granted"}]
}
```

**PATCH `/platform/contacts/{identifier}/{value}`** — upsert. Ao usar `email` no path, NÃO enviar `email` no body. **Substitui** array de tags pelo novo.

**POST `/platform/contacts/{id}/{val}/tag`** — ACUMULA tags (não substitui). Falha `RESOURCE_NOT_FOUND` se contato não existir.

**Custom fields — palavras reservadas** (retornam `"invalid options"`): `account_id, address, birthdate, cargo, celular, cf_order_*, cf_cart_*, client_id, company, email, firstname, id, name, phone, tags, uuid, ...`. Diferenciar via `custom_field: true|false` na resposta.

---

## 5. Events (crítico para Rosie / e-commerce)

**Endpoint canônico único**:
- `POST /platform/events?event_type={TYPE}` (OAuth2, todos os eventos)
- `POST /platform/events/batch` (bulk, body ≤ 0,2 MB, response mantém ordem)
- `POST /platform/conversions?api_key=` (API Key, só `CONVERSION`)

Payload base universal:
```json
{
  "event_type": "<TIPO>",
  "event_family": "CDP",
  "payload": { ... }
}
```
`event_family` só aceita `"CDP"`. Response: `{"event_uuid":"..."}`.

**Tipos aceitos:**

| Categoria | event_type |
|-----------|-----------|
| Conversão padrão | `CONVERSION` |
| Oportunidade | `OPPORTUNITY`, `OPPORTUNITY_LOST` |
| Venda ganha | `SALE` |
| Chat | `CHAT_STARTED`, `CHAT_FINISHED` |
| Ligação | `CALL_FINISHED` |
| Mídia | `MEDIA_PLAYBACK_STARTED`, `MEDIA_PLAYBACK_STOPPED` |
| **E-commerce (atuais)** | `ECOMMERCE_CHECKOUT_STARTED`, `ECOMMERCE_CART_ABANDONED`, `ECOMMERCE_ORDER_PLACED`, `ECOMMERCE_ORDER_PAID`, `ECOMMERCE_ORDER_FULFILLED`, `ECOMMERCE_SHIPMENT_DELIVERED`, `ECOMMERCE_ORDER_CANCELLED`, `ECOMMERCE_ORDER_REFUNDED` |
| E-commerce legados (**mortos em 31/12/2025**) | `ORDER_PLACED`, `ORDER_PLACED_ITEM`, `CART_ABANDONED`, `CART_ABANDONED_ITEM` |

**Payload — Conversão padrão** (o Rosie usa este via formulário e API Key):
```json
{
  "event_type": "CONVERSION",
  "event_family": "CDP",
  "payload": {
    "conversion_identifier": "form-newsletter-rosie",
    "name": "Cliente Rosie",
    "email": "cliente@exemplo.com",
    "job_title": "Diretora",
    "state": "SP",
    "cf_persona": "Fashion",
    "tags": ["origem-newsletter"]
  }
}
```

**Payload — Carrinho abandonado (novo, oficial):**
```json
{
  "event_type": "ECOMMERCE_CART_ABANDONED",
  "event_family": "CDP",
  "payload": {
    "email": "cliente@exemplo.com",
    "currency": "BRL",
    "total_items": 2,
    "cart_id": "cart-abc-123",
    "cart_total": 349.90,
    "cart_url": "https://rosie.com.br/carrinho/cart-abc-123",
    "products": [
      {"product_id":"sku-canelada-P","name":"Canelada","sku":"CAN-P","price":179.90,"quantity":1},
      {"product_id":"sku-jeans-M","name":"Jeans reto","sku":"JN-M","price":170.00,"quantity":1}
    ]
  }
}
```

**Payload — Pedido pago:**
```json
{
  "event_type": "ECOMMERCE_ORDER_PAID",
  "event_family": "CDP",
  "payload": {
    "email": "cliente@exemplo.com",
    "currency": "BRL",
    "order_id": "10234",
    "total": 349.90,
    "products": [...]
  }
}
```

**Regras de identificação em eventos**: `email` OU `phone` (E.164) — obrigatório pelo menos um. `mobile_phone`/`personal_phone` **não identificam**. Payload sem identificador é recusado.

**Custom fields em payload**: prefixar `cf_` (consultar via `GET /platform/contacts/fields`). Fora do schema padrão/custom são descartados silenciosamente.

**Idempotência**: RD **não expõe** campo `event_id` para deduplicação. Duplicatas do mesmo `email` + mesmo `conversion_identifier` acumulam na timeline. Se precisar dedup do lado do cliente: gerar hash `sku|email|timestamp-truncado-minuto` antes de enviar.

**Latência**: não SLA-ada. Empiricamente 1-3s até timeline; automações disparam em minutos.

---

## 6. Workflows / Automação — o que a API cobre

**Cobertura confirmada por exaustão do índice llms.txt:**

| Ação | API cobre? |
|------|-----------|
| Criar novo fluxo | ❌ NÃO |
| Editar bloco/ação de fluxo | ❌ NÃO |
| Publicar/despublicar fluxo | ❌ NÃO |
| Duplicar fluxo | ❌ NÃO |
| Ativar/desativar fluxo | ❌ NÃO |
| Listar fluxos existentes | ✅ SIM (`GET /platform/workflows`) |
| Obter um fluxo por id | ✅ SIM (`GET /platform/workflows/{id}`) |
| Inserir leads num fluxo | ✅ SIM (`POST /platform/workflows/{id}/leads`) |
| Ver leads iniciados | ✅ SIM (`GET .../leads/started`) |
| Ver leads que saíram | ✅ SIM (`GET .../leads/left`) |
| Ver leads em ação específica | ✅ SIM (`GET .../leads/action/{action_id}`) |

**Payload — inserir leads em fluxo:**
```http
POST https://api.rd.services/platform/workflows/{workflow_id}/leads
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "leads": [
    {"email":"cliente-1@exemplo.com"},
    {"email":"cliente-2@exemplo.com"}
  ]
}
```

**Rate limit `POST leads em fluxo`**:
- Light/Basic: 1 request/hora
- Pro: 10 requests/hora
- Advanced: 100 requests/hora

Leads por request (batch): 10 (Light/Basic), 25 (Pro), 50 (Advanced).

**Consequência para IaC/replicação**: fluxos vivem na UI e SÃO replicados manualmente entre contas de clientes usando o doc de configuração cliente-específico como referência. Não há JSON exportável.

---

## 7. Webhooks (RD → seu endpoint)

**Endpoint de gestão**: `POST /integrations/webhooks` (OAuth2). Rate: 1M req/24h por conta.

**Eventos disponíveis:**

| event_type | Origem |
|-----------|--------|
| `WEBHOOK.CONVERTED` | Marketing — lead converteu. Opcional filtrar por `event_identifiers[]` |
| `WEBHOOK.MARKED_OPPORTUNITY` | Marketing — lead marcado como oportunidade |
| `crm_deal_created`, `crm_deal_updated`, `crm_deal_deleted` | CRM |
| `crm_campaign_created`, `crm_organization_created/updated` | CRM |

**⚠️ Não emitem webhook**: eventos e-commerce (ECOMMERCE_*), eventos de e-mail (open/click/bounce), fim de fluxo.
**Workaround**: criar conversão sombra (`CONVERSION` com identifier "pedido-pago") e assinar `WEBHOOK.CONVERTED` filtrando por esse identifier.

**Payload de criação:**
```json
{
  "event_type": "WEBHOOK.CONVERTED",
  "entity_type": "CONTACT",
  "event_identifiers": ["form-newsletter-rosie"],
  "url": "https://hermes.kolden.com.br/webhooks/rdstation",
  "http_method": "POST",
  "include_relations": ["CONTACT_FUNNEL","COMPANY"]
}
```
- `entity_type` só aceita `CONTACT`
- `http_method` só aceita `POST`
- URL duplicada para mesmo event_type é bloqueada
- RD faz preflight call — endpoint precisa responder 2xx

**Payload que a RD envia:**
```json
{
  "event_type":"WEBHOOK.MARKED_OPPORTUNITY",
  "entity_type":"CONTACT",
  "event_identifier":"form-newsletter-rosie",
  "timestamp":"2026-08-18T14:09:02.724-03:00",
  "event_timestamp":"2026-08-18T14:07:04.254-03:00",
  "contact":{
    "uuid":"...","email":"...","name":"...","job_title":"...",
    "city":"...","tags":["tag 1"],"cf_persona":["Fashion"],
    "funnel":{"name":"default","lifecycle_stage":"Lead","opportunity":true,
              "interest":80,"fit":60,"origin":"Newsletter Rosie"}
  }
}
```

**Autenticação do webhook (sem HMAC nativo):**
- Suporta header custom via parâmetros `auth_header` + `auth_key` (documentado só p/ CRM mas aceito na API 2.0).
- Assinatura HMAC-SHA256 estilo Meta/Stripe **não existe**.
- Solução Kolden: header custom com token opaco no criar-webhook + validação no endpoint.

**Retentativas**: não documentadas publicamente. Empiricamente reenvia em 5xx algumas vezes; falha persistente pode desativar.

**IPs de origem**: **não publicados** — não whitelistar por IP.

**Gatilhos que NÃO acionam webhook**: importações e updates manuais de contato.

---

## 8. Integração nativa Nuvemshop (Rosie)

**App oficial**: "RD Station Marketing" na App Store da Nuvemshop.
- Doc RD: https://ajuda.rdstation.com/s/article/Integrar-o-RD-Station-Marketing-para-Ecommerce-com-o-app-Nuvem-Shop
- Doc Nuvemshop: https://atendimento.nuvemshop.com.br/pt_BR/marketing-e-comunicacao/como-instalar-o-aplicativo-rd-station-marketing

**Plano necessário**: **Pro ou Advanced** do RD Station Marketing para Ecommerce.

**Instalação**: UI da RD Station → Dashboard → "Conectar minha loja" → "Conectar com minha Nuvemshop" → OAuth Nuvemshop → aceitar. Fluxo de dados: **entrada** (Nuvemshop → RD apenas).

**Eventos disparados automaticamente:**

| Evento RD (nome UI) | Trigger Nuvemshop | Campos populados |
|---------------------|-------------------|------------------|
| Pedido realizado | Pedido criado | nome, email, telefone, data, ID pedido, valor pedido, valor frete, URL pedido, qtd itens, cidade/estado, produtos + qtd + categoria |
| Pedido pago | Pagamento confirmado | igual + valor confirmado |
| Pedido cancelado | Cancelamento | nome, email, telefone, ID pedido, data |
| Pedido enviado | Envio | + ID evento, status entrega, transportadora, código rastreio, URL rastreio |
| **Carrinho abandonado** | 4h sem update de carrinho **com email já preenchido no checkout** | nome, email, data, ID carrinho, qtd itens, valor, URL carrinho, produtos + preço + qtd + categoria |

**Limitações confirmadas:**
- Origem do lead sempre "Desconhecido" (não repassa UTM da loja).
- Campos personalizados da Nuvemshop NÃO são enviados — só padrão.
- Janela de carrinho abandonado é fixa em 4h — não configurável.
- Sem envio se o cliente não preencheu email no checkout.

---

## 9. Conversions API vs Webhook nativo — matriz de decisão

| Cenário Rosie | Recomendação |
|---------------|--------------|
| Rosie usa checkout padrão Nuvemshop, sem CRM próprio | **App nativo RD-Nuvemshop.** Cobre carrinho abandonado + pedido pago sem código |
| Rosie tem checkout custom fora Nuvemshop | Conversions API direto: `ECOMMERCE_CART_ABANDONED` + `ECOMMERCE_ORDER_PAID` |
| Rosie precisa preservar UTMs/atribuição | Conversions API — app nativo perde origem |
| Disparar sistema externo (Kommo, Meta CAPI) quando lead converte | Webhook `WEBHOOK.CONVERTED` filtrado por identifier |
| Precisa CAPI Meta a partir de pedido pago | Combinar: nativo → RD → `CONVERSION` sombra "Pedido pago" → webhook → endpoint Kolden → Meta CAPI |

**Recomendação padrão Rosie (2026-08-18):** instalar app nativo Nuvemshop no plano Pro+, configurar fluxos "Carrinho abandonado" e "Pós-compra" com gatilho eCommerce; **criar webhook `WEBHOOK.CONVERTED`** com identifiers das conversões-sombra ("pedido-pago-rosie") para replicar em Kommo/Meta CAPI via Hermes.

---

## 10. Rate limits — matriz completa

| Recurso | Light/Basic | Pro | Advanced | Janela |
|---------|-------------|-----|----------|--------|
| Contatos (conta) | 120/min | 120/min | 500/min | 1 min |
| Contatos PATCH (por lead) | 24 | 24 | 24 | 24h |
| Tag POST (por lead) | 24 | 24 | 24 | 24h |
| Tag POST (conta) | 15.000/dia | idem | idem | 24h |
| Segmentações GET | 120/min | 120/min | 240/min | 1 min |
| Custom fields (conta) | 1.000.000 | idem | idem | 24h |
| Webhooks (conta) | 1.000.000 | idem | idem | 24h |
| Eventos POST (conta) | 120/min | 120/min | 500/min | 1 min |
| Eventos POST (por lead) | 120 | 120 | 120 | 24h |
| Fluxos — insert leads | 1/h | 10/h | 100/h | 1h |
| Fluxos — listar | 40/h | 40/h | 40/h | 1h |
| Fluxos — get by id | 1/h | 5/h | 15/h | 1h |
| Analytics | — | 60/h (só emails) | 60/h (todos) | 1h |
| Leituras (emails/LPs/popups/forms) | 60/h | 60/h | 60/h | 1h |

**Body request**: ≤ 0,2 MB para eventos batch.
**URL**: máximo 8 KB (senão 414 URI Too Long).

**Erro 429**:
```json
{
  "error": "'lead_limiter' rate limit exceeded for 86400 second(s) period",
  "max": 24,
  "usage": 25,
  "remaining_time": 43067
}
```

**Não há header `X-RateLimit-Remaining`.** Info vem no body do 429.
Implementar backoff exponencial + inspeção de body.

---

## 11. SDKs oficiais

Org GitHub: **`ResultadosDigitais`** (badge "TOTVS RD Station", 64 repos).

| SDK | Linguagem | Status |
|-----|-----------|--------|
| [`rdstation-ruby-client`](https://github.com/ResultadosDigitais/rdstation-ruby-client) | Ruby | Oficial, MIT, mantido |
| [`n8n-nodes-rdsm`](https://github.com/ResultadosDigitais/n8n-nodes-rdsm) | TS (n8n) | Oficial, atualizado 07/2026 |
| [`n8n-nodes-rdsc`](https://github.com/ResultadosDigitais/n8n-nodes-rdsc) | TS (n8n CRM) | Oficial |
| [`n8n-nodes-rd`](https://github.com/ResultadosDigitais/n8n-nodes-rd) | TS (n8n família) | Oficial |
| [`ecommerce-woocommerce-plugin-releases`](https://github.com/ResultadosDigitais/ecommerce-woocommerce-plugin-releases) | PHP (WP plugin) | Oficial |
| [`ecommerce-devportal`](https://github.com/ResultadosDigitais/ecommerce-devportal) | Snippets | Oficial |

**Não há SDK oficial em Node.js, Python, PHP, Go ou Java.**

Alternativas comunidade (a validar):
- `GearPlug/rdstation-python` (Python, OAuth2)
- `verbeux-ai/rd-station-go` (Go)

**Recomendação Kolden**: para Node/Python, gerar cliente a partir do `llms.txt` (OpenAPI) ou usar **n8n como orquestração no-code** (nodes oficiais existentes cobrem 80% dos casos).

---

## 12. Machine-readable (OpenAPI / Postman / llms.txt)

| Formato | Status | URL |
|---------|--------|-----|
| **llms.txt** | ✅ Oficial, 117 KB, 475 linhas — SSoT AI | https://developers.rdstation.com/llms.txt |
| OpenAPI (YAML/JSON download) | ⚠️ Interno no ReadMe.com, sem URL pública direta | *(a investigar `dash.readme.com/api/v1/api-specification/rd-station-dev-portal`)* |
| Postman collection oficial | ❌ Não encontrada | — |

**Estratégia Kolden**: usar `llms.txt` como fonte primária para descoberta de endpoints e importar via ferramentas de scraping → OpenAPI local para Postman/Insomnia.

---

## 13. MCP oficial (referência cruzada)

MCP RD Station oficial (2026-06) — três endpoints separados:
- `https://mcp.rdstationmentor.com/marketing` — **exige plano Pro+**
- `https://mcp.rdstationmentor.com/crm` — todos os planos
- `https://mcp.rdstationmentor.com/conversas` — todos os planos

Detalhes completos em `mcp-status.md`.

---

## 14. Limitações e riscos operacionais

| Item | Estado | Mitigação |
|------|--------|-----------|
| Fluxos = UI-only | ❌ Sem IaC | Doc de configuração cliente-específico como fonte de verdade; replicar manualmente |
| Sem envio de e-mail transacional avulso | ❌ | Usar provedor separado (SES/SendGrid) para transacional |
| Sem criar template via API | ❌ | Templates HTML importados via UI ("Importar com HTML") |
| Sem criar segmentação via API | ❌ | Criar via UI, depois consultar leads via API |
| Sem scopes granulares no OAuth2 | ⚠️ | Blast radius alto — usar API Key para casos que só precisam de conversão |
| Sem endpoint revoke | ⚠️ | Revogar via UI (desconectar app) ou deletar App no Publisher |
| Sem HMAC nativo em webhook | ⚠️ | Header custom + URL secreta com token opaco |
| Sem IPs publicados de origem de webhook | ⚠️ | Não whitelistar por IP |
| E-commerce events não emitem webhook | ⚠️ | Conversão sombra + `WEBHOOK.CONVERTED` |
| Cart abandonment fixo em 4h (Nuvemshop) | ⚠️ | Aceitar limitação da integração nativa |
| Idempotência sem `event_id` | ⚠️ | Dedup no lado do cliente antes de enviar |
| Sem SDK Node/Python | ⚠️ | Cliente próprio a partir do llms.txt ou n8n |

---

## 15. ⭐ Vinculação MCP + API REST — Edição Máxima (padrão Hoop §16-B)

**Objetivo**: Claude Code Kolden operando em modo "edição máxima" com dupla via — MCP para tarefas interativas de leitura/consulta, API REST direta para operações de escrita em batch e integração com Hermes.

**Divisão de responsabilidades:**

| Via | Uso |
|-----|-----|
| **MCP oficial** (`https://mcp.rdstationmentor.com/marketing`) | Ler perfis de leads, estatísticas de LP/e-mail, análise de funil, consultas em linguagem natural. **Writes limitados** com confirmação in-chat |
| **API REST direta** (`https://api.rd.services`) | Batch de eventos, upsert massivo de contatos, criação de webhooks, inserção de leads em fluxo, escrita transacional/programática |

**Chaves usadas:**

- MCP: OAuth 2.0 do Claude Desktop/Code (login RD do operador Kolden — não precisa expor refresh_token)
- API REST: `client_id` + `client_secret` + `refresh_token` no Infisical

**Ganho**:
- MCP para operação diária/exploratória (Ronan consulta "quantos leads a Rosie converteu essa semana?" direto no chat)
- API REST para automação silenciosa via Hermes (webhooks respondendo a eventos e propagando)

**Riscos:**
- MCP e API não compartilham "identidade" — evento disparado por MCP e por API aparecem com contextos diferentes na timeline do lead
- Rate limits contam separados (API tem rate por endpoint; MCP tem rate implícito do LLM+API por trás)

---

## 16. Estratégia Kolden — padrões recomendados

1. **Uso MCP** para tudo que é leitura/análise diária conversacional.
2. **API Key** para formulários públicos e integrações internas simples que só disparam `CONVERSION` (LP custom, form no site, chat).
3. **OAuth2 + wrapper próprio (Node/Python)** para: batch upsert de contatos, gestão de tags via Hermes, sincronização de custom fields.
4. **n8n com nodes oficiais RDSM/RDSC/RD** para orquestração no-code entre sistemas (Nuvemshop → RD → Kommo).
5. **Webhooks + Hermes** para eventos que precisam sair da RD e chegar em Kommo/Meta CAPI/ERP em ordem determinística.
6. **Documento de configuração de fluxos por cliente** (não IaC) — replicação manual guiada por passo-a-passo clique-a-clique.

---

## 17. Fontes verificadas (2026-08-18)

| URL | Confirma |
|-----|----------|
| https://developers.rdstation.com/llms.txt | Índice completo (117 KB) |
| https://developers.rdstation.com/reference/introducao-rdsm | Base URL + 2 formas auth |
| https://developers.rdstation.com/reference/autentica%C3%A7%C3%A3o | OAuth2 4 passos |
| https://developers.rdstation.com/reference/limite-de-requisicoes-da-api | Rate limits por recurso |
| https://developers.rdstation.com/reference/contatos | Endpoints contatos |
| https://developers.rdstation.com/reference/post_platform-contacts-1 | Payload create contact |
| https://developers.rdstation.com/reference/campos-personalizados | Fields padrão + reservadas |
| https://developers.rdstation.com/reference/eventos-de-ecommerce | 8 eventos + regras identificação |
| https://developers.rdstation.com/reference/evento-de-convers%C3%A3o-padr%C3%A3o | OAuth2, event_type CONVERSION |
| https://developers.rdstation.com/reference/conversao | API Key, `/platform/conversions` |
| https://developers.rdstation.com/reference/batch-eventos | Batch, ≤ 0,2 MB |
| https://developers.rdstation.com/reference/webhooks | Marketing + CRM webhooks |
| https://developers.rdstation.com/reference/post_platform-workflows-id-leads-1 | Inserir leads em fluxo |
| https://developers.rdstation.com/reference/rdsm-como-migrar-api-v1-para-api-v2 | Migração legado |
| https://github.com/ResultadosDigitais | Org oficial SDKs |
| https://appstore.rdstation.com/pt-BR/publisher | Criar App OAuth2 |
| https://ajuda.rdstation.com/s/article/Integrar-o-RD-Station-Marketing-para-Ecommerce-com-o-app-Nuvem-Shop | Instalação Nuvemshop |
