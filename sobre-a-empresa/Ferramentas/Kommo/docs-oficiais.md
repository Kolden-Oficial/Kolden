---
tipo: ferramenta
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/Kommo/ferramentas]]"
---

# Kommo — Mapa das Docs Oficiais

Índice curado das URLs oficiais que importam para desenvolvimento e integração com IA.
Levantado por Firecrawl em 2026-07-23 (autorização de sessão `firecrawl max`).
Fonte-mãe: [`developers.kommo.com/llms.txt`](https://developers.kommo.com/llms.txt) — a
Kommo publica um `llms.txt` completo com todas as páginas em Markdown, ideal para
alimentar RAG/skills.

---

## Hubs por idioma

| Idioma | Portal dev | Portal suporte |
|--------|-----------|----------------|
| EN (canônico) | https://developers.kommo.com/ | https://support.kommo.com/ |
| PT-BR | https://pt-developers.kommo.com/ | https://support.kommo.com/ (mesmo hub, artigos em PT) |
| ES | https://es-developers.kommo.com/ (existe subdomínio ES) | https://support.kommo.com/ |
| RU | https://ru-developers.kommo.com/ | idem |

---

## Guias (docs/) — desenvolvimento

### Fundamentos
- [Kommo for developers](https://developers.kommo.com/docs/kommo-for-developers) — **entrada**
- [Kommo para desenvolvedores (PT-BR)](https://pt-developers.kommo.com/docs/kommo-para-desenvolvedores)
- [Subject area](https://developers.kommo.com/docs/subject-area)
- [Limitations](https://developers.kommo.com/docs/limitations) — HTTPS, rate limits
- [HTTP status codes](https://developers.kommo.com/docs/http-codes)

### Autenticação
- [OAuth 2.0](https://developers.kommo.com/docs/oauth-20)
- [Long-lived Token](https://developers.kommo.com/docs/long-lived-token) — ⭐ nosso caminho
- [One-time tokens](https://developers.kommo.com/docs/one-time-tokens)
- [Permissions (scopes)](https://developers.kommo.com/docs/permissions)
- [Authorization for Public Integrations](https://developers.kommo.com/docs/authorization-public)

### Tipos de integração
- [Private integration](https://developers.kommo.com/docs/private-integration) — ⭐ nosso perfil
- [Create a Public integration](https://developers.kommo.com/docs/get-started-public)
- [Public integration checklist](https://developers.kommo.com/docs/getting-listed)
- [Technical account](https://developers.kommo.com/docs/technical-account)
- [Get approved (moderation)](https://developers.kommo.com/docs/moderation-process)
- [Technology & Integration Partnership Program](https://developers.kommo.com/docs/technology-partnership)

### Webhooks
- [Webhooks — visão geral](https://developers.kommo.com/docs/webhooks-general) — payloads de contact/company/note/message/talk
- [Webhooks in Digital Pipeline](https://developers.kommo.com/docs/webhooks-dp)

### Salesbot (bot programável nativo)
- [Salesbot in Digital Pipeline](https://developers.kommo.com/docs/salesbot-dp) — linguagem JSON, handlers (`show`, `goto`, `stop`, `conditions`, `preset`, `widget_request`)
- [Salesbot SDK](https://developers.kommo.com/docs/salesbot-sdk) — extensão via widget JS

### VoIP (telefonia)
- [VoIP overview](https://developers.kommo.com/docs/voip)
- [Call logging](https://developers.kommo.com/docs/call-logging)
- [Call data from VoIP](https://developers.kommo.com/docs/call-from-webhook)
- [Making calls inside Kommo](https://developers.kommo.com/docs/making-calls-inside-kommo)
- [Click-to-call](https://developers.kommo.com/docs/click-to-call)

### Widgets & WEB SDK
- [Widget (visão geral)](https://developers.kommo.com/docs/widget)
- [Structure of widget](https://developers.kommo.com/docs/structure-widget)
- [manifest.json](https://developers.kommo.com/docs/manifest-json)
- [script.js](https://developers.kommo.com/docs/script-js)
- [Widget locations](https://developers.kommo.com/docs/widget-locations)
- [JS SDK](https://developers.kommo.com/docs/js-sdk)
- [Card SDK](https://developers.kommo.com/docs/card-sdk)
- [Lists SDK](https://developers.kommo.com/docs/lists-sdk)
- [Left menu bar](https://developers.kommo.com/docs/left-menu)
- [Skeleton CLI (scaffolding)](https://developers.kommo.com/docs/skeleton)
- [Dark theme](https://developers.kommo.com/docs/dark-theme)
- [i18n](https://developers.kommo.com/docs/i18n) — PT-BR suportado
- [Field types](https://developers.kommo.com/docs/field-types)

### Forms / Web
- [Button on Site](https://developers.kommo.com/docs/button-on-site)
- [Webforms API](https://developers.kommo.com/docs/webforms-api)
- [Website Chat Button API](https://developers.kommo.com/docs/api-crm-plugin)
- [Lead Capture](https://developers.kommo.com/docs/lead-capture)

### Notificações
- [Notification center](https://developers.kommo.com/docs/notification-center)
- [Adding notifications](https://developers.kommo.com/docs/add-notifications)
- [Notifications subscription](https://developers.kommo.com/docs/notifications-subscription)

### Tutoriais
- [Simple Widget Development](https://developers.kommo.com/docs/widgets-tutorial)
- [Guidelines for recipes in Python](https://developers.kommo.com/docs/guidelines-recipes)
- [Private Chatbot integration](https://developers.kommo.com/docs/private-chatbot-integration)
- [React hooks](https://developers.kommo.com/docs/react-hooks)

---

## API Reference — endpoints

Grupos (cada link é a raiz do grupo; a doc lista os endpoints):

- [About Kommo API](https://developers.kommo.com/reference/kommo-api-reference)
- [Account](https://developers.kommo.com/reference/account)
- [OAuth 2.0 (get/refresh token)](https://developers.kommo.com/reference/oauth20)
- [Leads](https://developers.kommo.com/reference/leads)
- [Incoming Leads](https://developers.kommo.com/reference/incoming-leads)
- [Pipelines & stages](https://developers.kommo.com/reference/leads-pipelines-and-stages)
- [Contacts list](https://developers.kommo.com/reference/contacts-list)
- [Companies](https://developers.kommo.com/reference/companies)
- [Lists (catálogos)](https://developers.kommo.com/reference/lists)
- [Custom fields & groups](https://developers.kommo.com/reference/custom-fields)
- [Users & roles](https://developers.kommo.com/reference/users-and-roles)
- [Tasks](https://developers.kommo.com/reference/tasks)
- [Events](https://developers.kommo.com/reference/events)
- [Notes](https://developers.kommo.com/reference/notes)
- [Tags](https://developers.kommo.com/reference/tags)
- [Links between entities](https://developers.kommo.com/reference/link-entities)
- [Salesbot (API)](https://developers.kommo.com/reference/salesbot)
- [Sources](https://developers.kommo.com/reference/sources)
- [Templates (chat/WhatsApp)](https://developers.kommo.com/reference/templates)
- [Webhooks (API de gestão)](https://developers.kommo.com/reference/webhooks)
- [Widgets](https://developers.kommo.com/reference/widgets)
- [Conversations](https://developers.kommo.com/reference/conversations)
- [Calls](https://developers.kommo.com/reference/calls)
- [Files API](https://developers.kommo.com/reference/files-api)

### Chats API (envio/recebimento de mensagens)
- [Five steps to send a message](https://developers.kommo.com/reference/send-message-guide) — ⭐ tutorial
- [Register a chat channel](https://developers.kommo.com/reference/register-channel)
- [Connect chat channel](https://developers.kommo.com/reference/connect-channel)
- [Chats API authorization](https://developers.kommo.com/reference/chats-api-authorization-and-headers)
- [Chats API webhooks](https://developers.kommo.com/reference/receiving-chat-webhooks)
- [Chats API account ID](https://developers.kommo.com/reference/chat-api-accountid)
- [Chats API add-on](https://developers.kommo.com/reference/chats-api-add-on)
- [Get conversation messages](https://developers.kommo.com/reference/get-conversation-messages) — jul/2026
- [Send message to conversation](https://developers.kommo.com/reference/send-message-to-conversation) — jul/2026
- [Create new chat](https://developers.kommo.com/reference/create-chat)
- [Get chat history](https://developers.kommo.com/reference/chat-history)
- [Send / withdraw reactions](https://developers.kommo.com/reference/send-reactions)
- [Update delivery status](https://developers.kommo.com/reference/update-delivery-status)

### Kommo AI — endpoints públicos (APIv2)
- [Kommo AI key features](https://developers.kommo.com/reference/ai-features)
- [Kommo AI API methods](https://developers.kommo.com/reference/ai-api-methods)
- [Add source (URL)](https://developers.kommo.com/reference/ai-add-source-url)
- [Add source (file)](https://developers.kommo.com/reference/ai-add-source-file)
- [Add source (text)](https://developers.kommo.com/reference/ai-add-source-text)
- [Import products CRM → AI](https://developers.kommo.com/reference/launch-import-of-products-from-crm-to-ai)

---

## Recipes (exemplos práticos)

- [Getting leads with pagination](https://developers.kommo.com/recipes/getting-leads-with-pagination)
- [Get/renew access token](https://developers.kommo.com/recipes/getrenew-access-token)
- [Create Lead with Contact + duplicate control](https://developers.kommo.com/recipes/create-a-lead-with-a-contact-with-duplicate-control-1)
- [Find contact by phone](https://developers.kommo.com/recipes/find-a-contact-by-a-phone-number)
- [Move lead to another stage](https://developers.kommo.com/recipes/move-a-lead-to-another-stage)
- [Upload file by chunks](https://developers.kommo.com/recipes/upload-a-part-of-the-file)
- [Add lead with UTMs](https://developers.kommo.com/recipes/add-a-lead-with-utms)
- [Create product and add to lead](https://developers.kommo.com/recipes/creating-a-product-and-adding-it-to-a-lead)
- [Working with a Lead](https://developers.kommo.com/recipes/working-with-a-lead)
- [Calculate headers for Chats API](https://developers.kommo.com/recipes/calculate-headers-for-chats-api-requests) — assinatura HMAC

---

## Support (produto — para operadores, não devs)

- [Kommo AI overview](https://support.kommo.com/docs/kommo-ai-overview)
- [Kommo AI setting up, limits & pricing](https://www.kommo.com/support/crm/kommo-ai-setting-up/)
- [AI agent overview](https://support.kommo.com/docs/kommo-ai-agent) — última att. 2026-07-08
- [AI agent manual setup](https://support.kommo.com/docs/ai-agent-manual-setup)
- [AI agent automatic setup](https://support.kommo.com/docs/create-an-ai-agent-using-automatic-setup)
- [AI limits overview](https://support.kommo.com/docs/ai-agent-packages)
- [Purchase AI credits](https://support.kommo.com/docs/ai-agent-packages-purchase)
- [Kommo Copilot overview](https://support.kommo.com/docs/set-up-and-use-kommo-copilot)
- [Work with AI reply suggestions](https://support.kommo.com/docs/work-with-ai-suggestions)
- [Work with AI rewriter](https://support.kommo.com/docs/ai-rewriter)
- [Qualify leads with AI agent](https://support.kommo.com/docs/ai-agent-lead-qualification)
- [Test AI agents](https://support.kommo.com/docs/ai-agent-testing)
- [Integrate Google Calendar com AI agent](https://support.kommo.com/docs/google-calendar-ai-agent)
- [Manage after-hours conversations com AI agent](https://support.kommo.com/docs/after-hours-conversations-ai)
- [Automate bookings com AI agent](https://support.kommo.com/docs/appointment-scheduling-ai-agent)

---

## Changelog (últimas releases relevantes)

Fonte: https://developers.kommo.com/changelog — verificada 2026-07-23.

| Data | O que mudou |
|------|-------------|
| 2026-07-17 | `send-message-to-conversation` agora aceita `attachment` (drive_uuid) |
| 2026-07-08 | Chats API add-on + endpoints `get-conversation-messages`/`send-message-to-conversation` + scopes `Sending to external chats` |
| 2026-07-01 | `get-talks` (list conversations) + webhook `add_outgoing_message` + `message_type` no `add_message` |
| 2026-05-27 | `get-salesbot-by-id` + activate/deactivate users |
| 2026-04-13 | `salesbots-list` |
| 2026-04-02 | Digital Pipeline webhooks — retry logic revista |
| 2026-03-11 | `launch-a-salesbot` (single) |
| 2026-03-02 | `launch-salesbots` v4 + `stop-salesbot` |
| 2026-02-25 | Loss reasons endpoints |

**Padrão:** Kommo publica release a cada 2-3 semanas na doc dev. Vale monitorar
`changelog` como RSS (existe feed em ReadMe.io) se um dia formos vendor da plataforma.

---

## Índices machine-readable

Kommo expõe `llms.txt` em **três subdomínios** (formato do padrão llmstxt.org):

- Portal dev EN: https://developers.kommo.com/llms.txt
- Portal dev PT-BR: https://pt-developers.kommo.com/llms.txt
- Central de suporte: https://support.kommo.com/llms.txt

Estes arquivos listam **todas** as páginas em Markdown com URL `.md` direto — ideal
para alimentar RAG, skill de conhecimento Kolden, ou o Argos indexar.

Postman workspace comunitário (não-oficial mas útil para inspecionar):
https://www.postman.com/amnezyyy-admin/kommo/overview
