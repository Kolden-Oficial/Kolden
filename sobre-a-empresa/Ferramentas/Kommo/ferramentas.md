---
tipo: ferramenta
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/_MOC-ferramentas]]"
relacionado:
  - "[[sobre-a-empresa/Ferramentas/Kommo/docs-oficiais|docs-oficiais]]"
  - "[[sobre-a-empresa/Ferramentas/Kommo/api|api]]"
  - "[[sobre-a-empresa/Ferramentas/Kommo/mcp-ai|mcp-ai]]"
---

# Kommo CRM — Referência de Uso

CRM conversacional messenger-first (WhatsApp, Instagram, Telegram, Live Chat) com
**IA nativa embutida** (AI Agent, AI Suggested Reply, Copilot, AI Rewriter) e camada
programável rica: **CRM API + Chats API + VoIP API + Webhooks + WEB SDK + Salesbot +
Digital Pipeline**. O ex-amoCRM rebatizado — mesma empresa, mesmo produto, doc unificada
em `developers.kommo.com`. Concorrente direto de GoHighLevel e RD Station no mercado
BR/LATAM; tem portal oficial em PT-BR (`pt-developers.kommo.com`) e suporte local.

---

## Contas provisionadas

### Rosie (cliente ativa desde 2026-06-30)

| Atributo | Valor |
|----------|-------|
| Subdomínio | `rosie.kommo.com` |
| Account ID | `36679659` |
| amojo_id (Chats API) | `141890a7-286c-4bf2-af0f-49f317014fba` |
| Data center | `api-c.kommo.com` (drive: `drive-c.kommo.com`) |
| Idioma / moeda | `pt` / BRL |
| Integration ID (privada Kolden) | `a0364bed-7ea7-4c56-8cf2-e147b3a90d59` |
| Long-Lived Token — validade | 2026-06-30 → 2031-08-19 (~5 anos) |
| Scopes concedidos | `crm`, `files`, `files_delete`, `list_external_messages`, `send_external_messages`, `notifications`, `push_notifications` |
| Kommo AI | **desativado** (ativar exige contratação de créditos AI) |

Admins na conta (via `GET /users`):
- `#10991863` Ronan Sérgio Silva — `adm@kolden.com.br`
- `#14984439` Bruno Felice Vilas-Boas — `bruno.vilasboas@grupoett.com.br`
- `#15509887` Rosie — `marketing@rosieiadoreyou.com`

## Credenciais (Infisical)

Padrão cliente-scoped, análogo ao Solomon (`SOLOMON_COMPANY_ID_ROSIE`). Path raiz do env
`prod` (não `/kolden/prod/` — segue estrutura atual do projeto).

| Credencial | Chave Infisical | Uso |
|------------|-----------------|-----|
| Subdomínio | `KOMMO_ROSIE_SUBDOMAIN` = `rosie` | monta `https://rosie.kommo.com` |
| Long-Lived Token | `KOMMO_ROSIE_ACCESS_TOKEN` | Bearer em toda chamada da API |
| Account ID | `KOMMO_ROSIE_ACCOUNT_ID` = `36679659` | usado em Chats API / verificação |
| Integration ID | `KOMMO_ROSIE_INTEGRATION_ID` = `a0364bed-7ea7-4c56-8cf2-e147b3a90d59` | rastrear origem da integração |
| Client Secret | `KOMMO_ROSIE_CLIENT_SECRET` | HMAC de Chats API e refresh OAuth (se um dia usar) |
| amojo_id | `KOMMO_ROSIE_AMOJO_ID` = `141890a7-286c-4bf2-af0f-49f317014fba` | Chats API (registro/enviar canal) |

**⚠️ Rotação recomendada:** o token atual foi transmitido em texto puro durante o
provisionamento (2026-07-23). Após cadastro no Infisical, revogar em
`rosie.kommo.com/settings/integrations/<a0364bed…>` e gerar novo. Atualizar
`KOMMO_ROSIE_ACCESS_TOKEN`.

**Script de cadastro (o Ronan roda uma vez):**
```bash
# Rodar no shell autenticado no Infisical (após 'infisical login')
infisical secrets set \
  --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod \
  KOMMO_ROSIE_SUBDOMAIN=rosie \
  KOMMO_ROSIE_ACCOUNT_ID=36679659 \
  KOMMO_ROSIE_INTEGRATION_ID=a0364bed-7ea7-4c56-8cf2-e147b3a90d59 \
  KOMMO_ROSIE_AMOJO_ID=141890a7-286c-4bf2-af0f-49f317014fba \
  KOMMO_ROSIE_CLIENT_SECRET=@/caminho/para/secret.txt \
  KOMMO_ROSIE_ACCESS_TOKEN=@/caminho/para/token.txt
```
(Usar `@/path/para/arquivo.txt` para valores sensíveis — evita expor no histórico
do shell. Padrão canônico documentado na memória.)

Autenticação padrão nas APIs:

```
Authorization: Bearer <KOMMO_ACCESS_TOKEN>
```

Long-Lived Token é o caminho de menor atrito: **integração privada** dentro da própria
conta, token sem expiração, cobre 100% da API. OAuth 2.0 só faz sentido se distribuirmos
um app pela Kommo Marketplace.

---

## Base URLs

```
API principal (CRM/Chats/AI): https://<subdomain>.kommo.com/api/v4/...
Chats API (amojo):            https://amojo.kommo.com/v2/...
Doc dev (EN):                 https://developers.kommo.com/
Doc dev (PT-BR):              https://pt-developers.kommo.com/
Índice p/ LLM (llms.txt):     https://developers.kommo.com/llms.txt
Base de suporte:              https://support.kommo.com/  (também expõe /llms.txt)
```

---

## Superfícies de integração — 6 pilares

| Camada | O que é | Quando usar |
|--------|---------|-------------|
| **CRM API** (REST) | Leads, contacts, companies, pipelines, tasks, notes, tags, custom fields, users, calls, files, sources, templates | CRUD, importação, sync bidirecional com sistemas externos |
| **Chats API** | Registrar canal próprio (ex.: WhatsApp custom, SMS, e-mail transacional), enviar/receber mensagens, reações, typing, delivery status | Plugar um canal de mensagem que a Kommo ainda não integra nativamente |
| **Webhooks** | Notificação push de eventos (lead criado/atualizado, mensagem recebida, tarefa, note, digital pipeline) | Reagir em tempo real fora da Kommo (n8n, worker próprio, Hermes) |
| **Salesbot** (SDK JS) | Bot programável com handlers, NLP, exits, integração via widget | Automação de chat com lógica customizada, alternativa/complemento ao AI Agent |
| **Digital Pipeline** | Automação de eventos por estágio (mudança de status, e-mail chegando, visita a site) | Regras condicionais baseadas em estágio, sem código |
| **WEB SDK** (widgets) | JS injetado na UI da Kommo (lead card, list, dashboard) | Integrações visuais, cards customizados, botões |

---

## Camada de IA nativa (Kommo AI)

Kommo tem 4 features de IA no produto (não é wrapper OpenAI cru — é sistema fechado
com créditos):

1. **AI Agent** — assistente 24/7 por canal; usa *Sources* (docs, URLs, arquivos) +
   *Actions* (regras WHEN/DO/MORE) + *Persona* (tom/idioma/estilo). Integra com Shopify,
   WooCommerce, Nuvemshop, Lazada. Transcreve voice messages e responde em texto.
   Múltiplos agentes por conta, atribuídos a estágios de pipeline.
2. **AI Suggested Reply** — sugere respostas para o operador humano com base nas sources.
3. **Copilot** — assistente do próprio operador (gestão de lead, resumos).
4. **AI Rewriter** — reescrita de mensagens.

Camada de **API pública para IA** (`APIv2` — endpoint `developers.kommo.com/reference/ai-*`):

- Adicionar source (URL / arquivo / texto) para AI Suggested Reply
- Adicionar source **com policies** (shipping, returns) para AI Agent
- Disparar import de produtos CRM→AI

Header obrigatório: `X-Language: en|es|pt|ru`.
Erros específicos: `402 Limit reached`, `402 Disabled for account`, `403 Service unavailable`.

Detalhes profundos em [`mcp-ai.md`](mcp-ai.md).

---

## MCP (Model Context Protocol)

- **MCP oficial da Kommo?** ❌ **NÃO existe** (2026-07-23). Nenhuma referência em
  `developers.kommo.com` ou `support.kommo.com`.
- **MCPs de comunidade (3rd party)** — analisados em [`mcp-ai.md`](mcp-ai.md):
  - `miguelgbastos/Kommo-MCP` (LobeHub) — TS/Docker, MIT, 25 tools, ativo (jul/2026)
  - `mcpmarket.com/server/kommo` — variante hospedada com foco em analytics
  - Composio Kommo — agregador SaaS (viola soberania Kolden)
- **Recomendação Kolden:** se precisarmos de MCP, **forkar `miguelgbastos/Kommo-MCP`
  e rodar via Docker local** (soberania). Cobre CRUD + eventos + pipelines + relatórios,
  não cobre a APIv2 de AI (fácil de estender).

Status atual no `mcp-status.md`: **não conectado**.

---

## Fontes confiáveis

| Tipo | Link | Verificado |
|------|------|------------|
| Portal do desenvolvedor (EN) | https://developers.kommo.com/docs/kommo-for-developers | 2026-07-23 |
| Portal do desenvolvedor (PT-BR) | https://pt-developers.kommo.com/docs/kommo-para-desenvolvedores | 2026-07-23 |
| API Reference (raiz) | https://developers.kommo.com/reference/kommo-api-reference | 2026-07-23 |
| Kommo AI API methods | https://developers.kommo.com/reference/ai-api-methods | 2026-07-23 |
| Kommo AI key features | https://developers.kommo.com/reference/ai-features | 2026-07-23 |
| Salesbot SDK | https://developers.kommo.com/docs/salesbot-sdk | 2026-07-23 |
| Chats API webhooks | https://developers.kommo.com/reference/receiving-chat-webhooks | 2026-07-23 |
| Changelog dev | https://developers.kommo.com/changelog | 2026-07-23 (última entrada 2026-07-17) |
| Índice p/ LLM | https://developers.kommo.com/llms.txt | 2026-07-23 |
| Central de suporte | https://support.kommo.com/ | 2026-07-23 |
| AI Agent (suporte) | https://support.kommo.com/docs/kommo-ai-agent | 2026-07-23 (última att. 2026-07-08) |
| Blog institucional | https://www.kommo.com/blog/kommo-api/ | 2026-07-23 |
| Postman workspace (comunidade) | https://www.postman.com/amnezyyy-admin/kommo/overview | 2026-07-23 |

Mapa detalhado em [`docs-oficiais.md`](docs-oficiais.md).
Referência prática da API em [`api.md`](api.md).

---

## Estado da conta Rosie (levantado 2026-07-23 via API)

**Rosie já opera Kommo em produção** — não é "provisionar", é documentar o que existe.

### 3 funis (pipelines)

| # | Nome | Estágios (ordem `sort`) |
|---|------|-------------------------|
| 14033351 [main] | **Funil de Vendas** | Etapa de leads de entrada · Novo lead · Qualificado · Carrinho Enviado · [Pedido entregue – ganho] · [Pedido cancelado – perdido] |
| 14171615 | **Funil de Pós-Venda** | Etapa de leads de entrada · Novo Chamado · Com a Gente · Aguardando Cliente · [Resolvido] · [Perdido] |
| 14034623 | **Funil de Recuperação** | Etapa de leads de entrada · Pendente · Pago · Enviado · Fechado · Cancelado · [Closed-won] · [Closed-lost] |

### 23 custom fields em leads (auto-gerados + negócio)

- 12 auto-gerados (tracking): `UTM_*`, `GCLID`, `FBCLID`, `TIKTOK_AD_ID_TD`, `TIKTOK_AD_NAME_TD`, `REFERRER`, `GCLIENTID`
- 11 de negócio: Número de rastreamento, Endereço de entrega, Método de pagamento, Desconto, Motivo de perda, Número do contrato, Data do contrato, Pagamento, etc.

### 2 webhooks ativos (integrações externas rodando)

| Destino | Eventos | Origem |
|---------|---------|--------|
| `https://nuvemshop.kommo.com/v1/crm/webhook/unsorted` | `add_unsorted` | **Nuvemshop conectada** — pedidos do e-commerce viram leads |
| `https://rdstation.amocrm.com/amocrm/webhook/…` | `status_lead` | **RD Station conectado** — sincroniza mudança de estágio |

### Entidades povoadas

- Leads: paginação com `next` (múltiplas páginas — não vazio)
- Contacts: idem
- Companies: idem
- Tasks: vazio (nenhuma tarefa criada ainda)
- Sources: vazio pelo endpoint (o Nuvemshop+RD Station usam widget, não source-API)
- Salesbots: `404 Cannot GET /salesbots` — endpoint só listado no changelog dev de abr/2026; provavelmente não disponível neste plano/versão. Reavaliar
- APIv2 AI: `404` — coerente, AI não ativo

### Implicações estratégicas

- **A Rosie tem instrumentação de aquisição madura**: UTMs, gclid, fbclid, tiktok, gclientid = pixel/rastreamento completo. Provavelmente conectado ao GA4 dela.
- **Funil de recuperação separado** = ciclo pós-abandono já modelado (Pendente → Pago → Enviado…). Combina com o Solomon Rosie (analytics de e-commerce Nuvemshop).
- **Ponte natural com nosso stack**: se rodarmos ads Kolden para Rosie, os leads podem cair direto em `Funil de Vendas > Etapa de leads de entrada` via Chats API (WhatsApp) ou via `POST /api/v4/leads` (formulário LP).
- **AI Agent (quando ativarem)**: sources podem ser o cardápio Rosie + políticas → responde no Instagram/WhatsApp com voz da marca. Alternativa Kolden: Salesbot + `widget_request` → nosso Hermes → OpenRouter (evita crédito AI Kommo, mantém controle).

## Notas Kolden

- **Rebranding amoCRM → Kommo:** boa parte dos tutoriais na web ainda falam de amoCRM.
  Base URL antiga era `<subdomain>.amocrm.com`; a nova (`.kommo.com`) é o canônico.
  Semanticamente é o mesmo produto.
- **Doc é atualíssima:** o changelog registrou release em 2026-07-17 e a doc PT-BR é
  hospedada no ReadMe.io com atualização paralela ao EN (última modificação 2026-06-11).
- **AI Agent é sistema fechado com créditos** — não escolhemos o LLM subjacente, não
  batemos direto em Anthropic/OpenAI. Para squads Kolden que precisam controlar o
  modelo, usar **Salesbot + webhook → nosso worker (LobeHub/OpenRouter)** em vez do
  AI Agent nativo.
- **Chats API é o único caminho para plugar WhatsApp custom** (fora dos parceiros
  oficiais). Salva contexto se um dia precisarmos rodar WhatsApp por Evolution API ou
  Meta Cloud API própria e alimentar a Kommo.
- **X-Language `pt`** é aceito na APIv2 de AI — bom sinal p/ operação BR.

---

## Instalação (quando provisionar)

1. Criar conta Kommo (trial 14d, sem cartão). Subdomínio será
   `<escolhido>.kommo.com` — sugestão: `kolden` ou `koldenoficial`.
2. Settings → Integrations → **Create integration** (privada) → copiar Long-Lived Token.
3. Cadastrar `KOMMO_SUBDOMAIN` + `KOMMO_ACCESS_TOKEN` no Infisical em `/kolden/prod/`.
4. Smoke test: `GET https://<sub>.kommo.com/api/v4/account` com Bearer → deve retornar
   `id`, `name`, `subdomain`.
5. Se AI: Settings → Kommo AI → habilitar → adicionar sources via UI OU via
   `POST /api/v4/ai/sources/url` (ver `api.md`).
6. Se webhooks: `POST /api/v4/webhooks` com URL do nosso worker + eventos escolhidos.

Referência de instalação de integração privada:
https://developers.kommo.com/docs/private-integration
