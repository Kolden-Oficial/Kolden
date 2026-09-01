---
tipo: ferramenta
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/Kommo/ferramentas]]"
---

# Kommo — Referência prática da API

Guia operacional para a API v4 da Kommo. Cobre autenticação, entidades canônicas,
Chats API, Salesbot, webhooks e a APIv2 pública de IA. Foco em **integração privada
com Long-Lived Token** (nosso perfil).

Fonte de verdade sempre: `developers.kommo.com/reference/*` (mapa em
[`docs-oficiais.md`](docs-oficiais.md)). Este arquivo é resumo prático, não substitui
a doc.

---

## 1. Base

```
Base URL: https://<subdomain>.kommo.com/api/v4
Auth:     Authorization: Bearer <KOMMO_ACCESS_TOKEN>
Content:  application/json
```

Long-Lived Token = criado em **Settings → Integrations → Create private integration →
gerar token** (não expira, escopo = toda a conta). É o modo recomendado para nosso caso.

OAuth 2.0 só se publicarmos app público — fluxo `authorization_code` → troca por
`access_token` (30 min) + `refresh_token` (3 meses). Endpoint:
`POST /oauth2/access_token` (ver `docs/oauth-20`).

---

## 2. Entidades canônicas — CRUD

Padrão: `GET /{entidade}`, `POST /{entidade}` (aceita array), `PATCH /{entidade}/{id}`.

| Entidade | Endpoint raiz | Notas |
|----------|---------------|-------|
| Leads | `/leads` | `_embedded[contacts,companies,tags,catalog_elements]` |
| Contacts | `/contacts` | Dedup por telefone/email via `duplicate_control` |
| Companies | `/companies` | |
| Tasks | `/tasks` | `task_type_id`, `complete_till` (unix) |
| Notes | `/{entity_type}/{id}/notes` | `entity_type` = leads/contacts/companies |
| Tags | `/{entity_type}/tags` | Cores tabeladas em `reference/tag-colors` |
| Users | `/users` | + `/users/{id}/activate` e `.../deactivate` (mai/2026) |
| Pipelines | `/leads/pipelines` | |
| Stages | `/leads/pipelines/{id}/statuses` | |
| Custom fields | `/{entity_type}/custom_fields` | Tipos: text, numeric, checkbox, select, multiselect, date, url, textarea, radiobutton, streetaddress, smart_address, birthday, legal_entity, price, category, items, tracking_data, linked_entity, chained_list, monetary, files |
| Events | `/events` | Read-only; use webhook para push |
| Calls | `/calls` | Bulk insert; anexa em contact/lead automaticamente por telefone |
| Files | `/files` | Multi-part upload; base host separado (drive) |
| Sources | `/sources` | Fontes de incoming leads |
| Widgets | `/widgets` | Instalar/desinstalar widget do Marketplace |
| Salesbots | `/salesbots` (list, get by id) | Launch/stop em endpoints separados |
| Webhooks | `/webhooks` | Gerenciar subscrições |
| Templates | `/templates` | Chat + WhatsApp template moderation |

### Filtros comuns (querystring)

```
?with=contacts,companies,catalog_elements     # embeds
?limit=250                                    # max 250
?page=1
?query=texto                                  # busca full-text
?filter[status_id][0]=142                     # por estágio
?filter[created_at][from]=1700000000          # unix range
?order[created_at]=desc
```

### Rate limits
- 7 req/s por conta (docs `limitations`).
- Endpoints de bulk (arrays de até 250 objetos) são a forma correta de escala.
- HTTPS obrigatório; TLS 1.2+.

---

## 3. Webhooks — reações a eventos

### Registrar (uma vez, via API ou UI)

```http
POST /api/v4/webhooks
{
  "destination": "https://hermes.kolden.com.br/webhooks/kommo",
  "settings": ["add_lead", "status_lead", "add_message", "add_task", "delete_lead"]
}
```

Lista completa de eventos: `reference/webhook-events`.

Requer plano Advanced/Pro/Enterprise (docs `webhooks-general`).

### Payloads (o corpo que chega no nosso endpoint)

Chega como `application/x-www-form-urlencoded` no formato `contacts[update][0][id]=…`
(padrão histórico amoCRM). Alguns eventos novos (Chats API v2) já chegam como JSON puro.
Exemplo mensagem entrante:

```json
{
  "add": [{
    "id": "9402b05b-91c0-4daa-a8a6-34b411881f4c",
    "chat_id": "dfa7f0e5-79bb-4b3d-9647-2f492075e419",
    "talk_id": "172",
    "contact_id": "46855094",
    "text": "Hi!",
    "created_at": "1782389132",
    "message_type": "text",
    "entity_type": "lead",
    "entity_id": "50296276",
    "type": "incoming",
    "author": {"id": "9729f051-1ca6-4fe2-9b3e-3effe4e83f5d", "type": "external"},
    "origin": "telegram"
  }]
}
```

Ver mais exemplos em `docs/webhooks-general` (contacts, companies, notes, talks,
outgoing_message — este último novo em jul/2026).

### Digital Pipeline (webhooks contextuais por estágio)

```json
{
  "leads": {
    "status": [{
      "id": 12345,
      "old_pipeline_id": 111,
      "pipeline_id": 222,
      "old_status_id": 333,
      "status_id": 444
    }]
  }
}
```

Retry logic (revista em abr/2026): tentativas exponenciais até 24h; endpoint deve
responder 200 em ≤10s.

---

## 4. Chats API — canal próprio

Camada separada. Base: `https://amojo.kommo.com/v2/origin/custom/{scope_id}/...`

Fluxo canônico (docs `send-message-guide`):

1. **Obter account_id do serviço de chats:** `GET /api/v4/account?with=amojo_id`
2. **Registrar canal** (uma vez, no Kommo Team's Chat Service):
   `POST https://amojo.kommo.com/v2/origin/custom/{scope_id}/connect`
3. **Criar chat** (opcional, antes da 1a msg): `POST .../chats`
4. **Enviar mensagem:** `POST .../chats/{chat_id}` (ou usar `send-message-to-conversation` — jul/2026 aceita `attachment`)
5. **Receber webhooks** de outgoing (mensagens que a Kommo enviou) e reações/typing

Autenticação: HMAC-SHA1 do body + secret do canal, header `X-Signature`. Receita
completa em `recipes/calculate-headers-for-chats-api-requests`.

Use quando: plugarmos WhatsApp custom (Evolution API, Meta Cloud direto), SMS provider
próprio, canal proprietário.

---

## 5. Salesbot — bot programável nativo

Linguagem: JSON com handlers. Exemplo (docs `salesbot-dp`):

```json
[
  {
    "question": [
      {"handler": "show", "params": {"type": "text", "value": "Please provide your phone and email"}},
      {"handler": "action", "params": {"name": "set_tag", "params": {"type": 2, "value": "salesbot"}}}
    ],
    "answer": [
      {
        "handler": "preset",
        "params": {
          "name": "contacts.validate_base_info",
          "params": {
            "empty_email": "Please provide your e-mail",
            "empty_phone": "Please provide your phone number",
            "invalid_phone": "Phone looks incorrect",
            "success": "Thank you",
            "empty_all": "Please provide phone and email"
          }
        }
      }
    ]
  }
]
```

Handlers principais:
- `show` — envia mensagem (text, image, file, buttons, list_message)
- `action` — dispara ação (set_tag, set_field, notify, run_script, etc.)
- `goto` — salta para outra `question` step
- `conditions` — branch com operadores `=`, `!=`, `>`, `<`, `contains`
- `preset` — presets internos (`contacts.validate_base_info`, `products.*`)
- `widget_request` — chama widget externo (usa nosso worker)
- `stop` — encerra (`talk-close` ou `salesbot-start` p/ handoff)
- `exits` — usado por widgets para expor branches

Endpoints:
- `GET /api/v4/salesbots` — list
- `GET /api/v4/salesbots/{id}` — details
- `POST /api/v4/salesbots/launch` (v4) — dispara bot(s)
- `POST /api/v4/salesbots/{bot_id}/stop` — para

**Ponte para nossos LLMs:** o handler `widget_request` faz HTTP call para URL nossa
passando contexto do lead. Podemos usá-lo para plugar **Hermes → OpenRouter/Anthropic**
sem depender do AI Agent nativo (que consome créditos Kommo e não expõe modelo).

Padrão de widget request (docs `salesbot-sdk`):

```json
{
  "handler": "widget_request",
  "params": {
    "url": "https://hermes.kolden.com.br/kommo/handoff",
    "data": {
      "lead_id": "{{lead.id}}",
      "message": "{{message.last_text}}",
      "contact_phone": "{{contact.phone}}"
    }
  }
}
```

Nossa resposta populariza `{{json.status}}`, `{{json.reply}}` etc. no próximo step.

---

## 6. Kommo AI API pública (APIv2)

Endpoint dedicado, header `X-Language: en|es|pt|ru` obrigatório. Escopo restrito:

| Método | Feature | Endpoint (ver doc) |
|--------|---------|--------------------|
| POST | AI Suggested Reply — add source URL | `ai-add-source-url` |
| POST | AI Suggested Reply — add source file | `ai-add-source-file` |
| POST | AI Suggested Reply — add source text | `ai-add-source-text` |
| POST | AI Agent — import products CRM→AI | `launch-import-of-products-from-crm-to-ai` |

Restrições:
- **URL sources:** só páginas públicas (sem auth), imagens ignoradas.
- **File sources:** PDF/DOC/DOCX, até 45 MB, imagens ignoradas. Template baixável na UI.
- **Text sources:** ≤5000 caracteres.

Erros específicos:
```
403 Service unavailable       — falha global
402 Disabled for account      — bloqueio manual
402 Limit reached             — cota mensal esgotada
401 No token provided
403 Bearer token verification failed
403 Error while getting account data via provided token
```

**Não expõe API para operar o AI Agent** — configuração (persona, actions, sources
avançadas) é só via UI ou via APIv2 para sources. Para criar bots totalmente
programáveis, prefira **Salesbot + `widget_request`** (§5).

---

## 7. Smoke test rápido

Depois de gerar `KOMMO_ACCESS_TOKEN` e cadastrar `KOMMO_SUBDOMAIN`:

```bash
# Wrap com Infisical
infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- \
  curl -sS "https://$KOMMO_SUBDOMAIN.kommo.com/api/v4/account" \
       -H "Authorization: Bearer $KOMMO_ACCESS_TOKEN" | jq .

# Esperado: { "id": 1234567, "name": "...", "subdomain": "...", "currency": "BRL", ... }
```

Se retornou objeto com `id/subdomain` → autenticação ok, prossiga.

Próximo teste — listar pipelines:

```bash
curl -sS "https://$KOMMO_SUBDOMAIN.kommo.com/api/v4/leads/pipelines" \
     -H "Authorization: Bearer $KOMMO_ACCESS_TOKEN" | jq '._embedded.pipelines[] | {id, name, is_main}'
```

---

## 8. Bibliotecas / SDKs de comunidade

Kommo **não mantém SDK oficial**. Comunidade produziu:

| Linguagem | Repo | Uso |
|-----------|------|-----|
| PHP | github.com/dotzero/amocrm-php (histórico amoCRM) | Mantido; adaptar base URL |
| Node.js | github.com/frankie567/amocrm-api-js (histórico) | Envelhecido; hoje o mais simples é `axios` direto |
| Python | github.com/AlexClaw/amocrm-async | asyncio |

Recomendação Kolden: **usar `fetch/axios` direto** — a API é REST bem-comportada e as
libs comunitárias estão desatualizadas (ainda escrevem `amocrm`). Um wrapper interno
pequeno em `sobre-a-empresa/Ferramentas/Kommo/src/` (quando existir) resolve.

---

## 9. Fluxos Kolden recomendados (padrões)

### Fluxo A — CRM sync passivo
Webhook `add_lead`/`status_lead`/`add_task` → Hermes → sync no ledger interno + Notion.

### Fluxo B — Handoff bot custom Kolden
Salesbot em estágio "IA-Kolden" → `widget_request` para `hermes.kolden/kommo/handoff` →
Hermes chama OpenRouter (modelo à escolha) → resposta populada em `{{json.reply}}` →
Salesbot faz `show`. Modelo, prompt e custo ficam sob nosso controle (não usamos
créditos AI Kommo).

### Fluxo C — Import de sources em massa (AI Suggested Reply)
Script Kolden lê `sobre-a-empresa/` → filtra fontes públicas → para cada URL faz
`POST ai/sources/url` com `X-Language: pt`. Uma vez rodado, AI Suggested Reply passa a
consumir do nosso Second Brain. **Cuidado:** só faz sentido se comprarmos os créditos.

### Fluxo D — WhatsApp custom via Chats API
Evolution API (self-hosted) → recebe msg do cliente → HMAC + `POST amojo.kommo.com/v2/...`
→ Kommo mostra na interface. E vice-versa: Kommo → webhook outgoing → Evolution → cliente.
