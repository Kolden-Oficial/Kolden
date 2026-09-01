---
tipo: ferramenta
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/Kommo/ferramentas]]"
---

# Kommo — IA nativa + MCP

Panorama da camada de IA da Kommo (nativa + APIv2 pública) e do estado do MCP
(Model Context Protocol) para o produto, com análise sob a ótica de soberania de dados
da Kolden.

---

## 1. Kommo AI — features nativas do produto

O produto embute 4 features de IA. Todas cobradas em **créditos AI** (pacotes vendidos
à parte; refresh mensal; limite por plano).

### 1.1 AI Agent
Assistente 24/7 que responde clientes por canal (WhatsApp/Instagram/Live Chat/etc.).
Arquitetura:

| Peça | O que faz |
|------|-----------|
| **Sources** | Base de conhecimento — URL, arquivo (PDF/DOC/DOCX, ≤45MB) ou texto (≤5000 chars). Trial: até 10; pago: até 100 sources. |
| **Actions** | Regras WHEN / DO / MORE. WHEN detecta intenção/sentimento/silêncio; DO responde, pergunta, atualiza lead, dispara bot, transfere para humano. |
| **Persona** | Papel, tom (casual/friendly/professional), tamanho da resposta, idioma (detecta ou fixa), delay antes de responder, guidelines. |
| **Integrações** | Shopify, WooCommerce, Nuvemshop/Tiendanube, Lazada — o AI Agent lê estoque/preço/políticas em tempo real. Read-only. |
| **Voice messages** | Transcreve voice notes de entrada e responde em texto (feature só no Pro). |
| **Multiple agents** | Vários agentes por conta, atribuídos a estágios diferentes do pipeline. |
| **Test mode** | Ambiente de teste com Ice Breakers, mostra Intent identified / Sources used / Knowledge gaps. |
| **Dashboard** | Métricas 90d: Unique leads, Answered/Unanswered, Handover rate, Avg response time, créditos usados. |
| **Conversation limits** | Cap de mensagens/créditos por conversa (evita queima). |

Casos de uso oficiais: recomendar produto, enriquecer lead card, entender intenção,
qualificar lead, handoff para humano, small talk.

**Restrição arquitetural importante:** o AI Agent **só responde**; não inicia
conversas. E só usa sources — não acessa dado externo fora dos conectores nativos
(Shopify etc.). O LLM subjacente **não é escolhido pelo usuário** — sistema fechado.

### 1.2 AI Suggested Reply
Sugere respostas ao operador humano, usando as mesmas sources do AI Agent. Manteve
humano no loop.

### 1.3 Kommo Copilot
Assistente do operador dentro do CRM (resumo de conversa, gestão de lead).

### 1.4 AI Rewriter
Reescreve mensagens do operador (tom, extensão).

---

## 2. APIv2 pública para IA

Fonte-mãe: [`developers.kommo.com/reference/ai-api-methods`](https://developers.kommo.com/reference/ai-api-methods).

Escopo público reduzido a **duas capacidades**:

| Feature | O que a API permite |
|---------|---------------------|
| AI Suggested Reply | Adicionar sources (URL, file, text) programaticamente |
| AI Agent | Adicionar sources com propriedades especiais (policies — shipping, returns, refund); disparar sync de produtos do CRM para o AI |

Ausente da API pública (só via UI):
- Criar/configurar AI Agent (persona, actions)
- Ler dashboard/métricas
- Consumir o LLM diretamente (não há endpoint `POST /ai/chat`)
- Ler transcrição de voice message

Autenticação: Bearer token (mesmo do resto da API).
Header obrigatório: `X-Language: en|es|pt|ru`.

Erros específicos da camada AI:
- `402 Disabled for account` — a conta não tem AI ativado
- `402 Limit reached` — cota mensal de créditos esgotou
- `403 Service unavailable` — falha global
- `403 Bearer token verification failed`

---

## 3. MCP oficial da Kommo?

**❌ NÃO existe** (verificação 2026-07-23):

- Nenhuma menção a "MCP" ou "Model Context Protocol" em:
  - `developers.kommo.com` (busca site: retornou 0 resultados)
  - `support.kommo.com`
  - Blog institucional `kommo.com/blog`
  - Changelog dev (última entrada 2026-07-17)
- Nenhuma feature de "AI Interoperability" no roadmap público.
- Kommo posiciona a integração com IA **para dentro** (usar o AI Agent deles), não
  **para fora** (expor a conta como MCP server para agentes externos).

Isso é coerente com o modelo de negócio — créditos AI são fonte de receita; abrir
MCP oficial permitiria substituir o AI Agent nativo por Claude/GPT/nosso stack.

---

## 4. MCPs de comunidade (3rd party)

Três opções identificadas, todas não-oficiais:

### 4.1 `Miguelgbastos/Kommo-MCP` ⭐ mais promissor
- Repo: https://github.com/Miguelgbastos/Kommo-MCP
- LobeHub: https://lobehub.com/mcp/miguelgbastos-kommo-mcp
- Linguagem: TypeScript
- Empacotamento: Docker (`kommo-mcp-server`)
- Licença: **MIT**
- Última att.: **2026-07-22** (esta semana — ativo)
- Autor: Miguel Gomes Bastos (comunidade BR)

**Tools expostas (25):**
- Leads (3): `get_leads`, `get_lead`, `create_lead`
- Contacts (3): `get_contacts`, `get_contact`, `create_contact`
- Companies (3): `get_companies`, `get_company`, `create_company`
- Tasks (2): `get_tasks`, `create_task`
- Pipelines (1): `get_pipelines`
- Users (1): `get_users`
- Account (1): `get_account_info`
- Events/Activities (4): `get_lead_events`, `create_lead_event`, `get_contact_activities`, `create_contact_activity`
- Status/Pipelines mgmt (4): `get_lead_statuses`, `create_lead_status`, `move_lead_to_status`, `move_lead_to_pipeline`
- Analytics/Reports (7): `get_sales_report`, `get_lead_conversion_report`, `get_pipeline_performance_report`, `get_dashboard_data`, `get_user_performance_stats`, `get_lead_analytics`, `get_pipeline_analytics`

Config env: `KOMMO_BASE_URL` (subdomínio) + `KOMMO_ACCESS_TOKEN`.

**Gaps que teríamos que fechar** se adotarmos:
- ❌ Nenhuma tool para APIv2 de AI (add source URL/file/text)
- ❌ Nenhuma tool para Chats API (envio de mensagem, webhooks)
- ❌ Nenhuma tool para Salesbot (launch/stop, list)
- ❌ Nenhuma tool para webhooks (add/list/delete)
- ⚠️ Poucos updates (só create/get; falta `update_lead`, `update_contact` etc.)

### 4.2 `mcpmarket.com/server/kommo`
- URL: https://mcpmarket.com/server/kommo
- Foco: analytics + estratégia (relatórios de vendas/conversão/performance)
- 2 stars no GitHub (linkado); menor atividade
- Positioning: "para Cursor + n8n"
- Não é claro se é o mesmo autor do Miguelgbastos ou outro fork

### 4.3 Composio Kommo
- URL: https://composio.dev/toolkits/kommo/
- Formato: **agregador SaaS** — Kommo é um dos ~250 conectores. Não é um MCP server
  standalone; é acesso mediado pela Composio.
- **Viola soberania de dados** (dados passam pelo Composio antes de chegar no LLM
  do agente).
- Só faz sentido se estivéssemos usando Composio como toolkit universal em outra
  frente — não é o caso.

---

## 5. Recomendação Kolden

**Se/quando ativarmos Kommo**, o caminho recomendado é:

1. **Não usar MCP terceiro genérico direto** (soberania).
2. **Forkar `Miguelgbastos/Kommo-MCP`** para `Kolden-Oficial/kolden-kommo-mcp`
   (fork privado, MIT permite):
   - Rodar via Docker local (`docker compose` na stack Kolden ou como container no WSL).
   - Env via Infisical (`KOMMO_BASE_URL`, `KOMMO_ACCESS_TOKEN` do path `/kolden/prod/`).
   - Estender com as tools ausentes:
     - `add_ai_source_url/file/text` (APIv2 AI)
     - `send_chat_message` (Chats API)
     - `list_salesbots`, `launch_salesbot`, `stop_salesbot`
     - `add_webhook`, `list_webhooks`, `delete_webhook`
     - `update_lead`, `update_contact`, `update_company`
   - Aderir ao padrão do MCP **Íris** (nosso primeiro MCP custom — Ritual do Caos
     2026-07-01 — maturity 10.0/10 — em `sobre-a-empresa/projetos/rosie/mcp-solomon/`).
3. **Alternativa mais leve — pular MCP**: se só precisarmos operar Kommo por script,
   um wrapper `axios` em TS direto no Hermes basta. MCP faz sentido quando um agente
   do Claude Code precisar operar a Kommo de forma exploratória.

**Cenário híbrido preferido:**
- **AI de conversa com cliente:** Salesbot + `widget_request` → nosso worker →
  OpenRouter (modelo à escolha). Não usamos créditos AI Kommo, controlamos o modelo.
- **AI Suggested Reply nativo:** ativar SE o time humano da Kommo (Pheme? Pisto?) for
  operar respostas manuais no CRM e quiser sugestões contextualizadas nas nossas docs.
- **AI Agent nativo:** só se contratante final (cliente Kolden) quiser experiência
  turn-key sem custo de dev — nesse caso ele paga os créditos.

---

## 6. Registro (a atualizar em `mcp-status.md`)

- **Kommo MCP oficial:** ❌ inexistente
- **Kommo MCP comunidade:** 🟡 `Miguelgbastos/Kommo-MCP` (não instalado)
- **Kommo AI (APIv2):** 🔵 disponível, ativação depende de conta Kommo + créditos
- **Provisionamento Kolden:** ⏳ conta Kommo ainda não criada (2026-07-23)

Quando cadastrar, atualizar:
- `sobre-a-empresa/Ferramentas/ferramentas.md` — coluna MCP passa de "🟡 (via fork)" p/ "🟢 conectado"
- `sobre-a-empresa/Ferramentas/mcp-status.md` — adicionar linha na seção 1
- `sobre-a-empresa/Ferramentas/registro-de-ferramentas.yaml` — cadastrar entrada
- Infisical — `/kolden/prod/KOMMO_SUBDOMAIN` + `/kolden/prod/KOMMO_ACCESS_TOKEN`

---

## 7. Fontes verificadas (2026-07-23, Firecrawl `max`)

| URL | O que confirma |
|-----|----------------|
| https://developers.kommo.com/reference/ai-api-methods | APIv2 pública para AI, auth Bearer, X-Language, erros específicos |
| https://developers.kommo.com/reference/ai-features | 4 features (Suggested Reply, AI Agent, Copilot, Rewriter); limites (45MB, 5000 chars, 10-100 sources) |
| https://support.kommo.com/docs/kommo-ai-agent | Arquitetura completa AI Agent (Sources/Actions/Persona/Integrations/Voice/Dashboard) |
| https://developers.kommo.com/docs/salesbot-sdk | SDK JS para estender bot com widgets; callbacks `onSalesbotDesignerSave`, `salesbotDesignerSettings` |
| https://developers.kommo.com/docs/salesbot-dp | Linguagem JSON, handlers (`show`, `goto`, `stop`, `conditions`, `preset`, `widget_request`, `exits`) |
| https://developers.kommo.com/changelog | Releases jul/2026, cadência 2-3 semanas |
| https://developers.kommo.com/llms.txt | Índice completo em markdown (200+ páginas, ~500KB) |
| https://mcpmarket.com/server/kommo | MCP comunidade #1 |
| https://lobehub.com/mcp/miguelgbastos-kommo-mcp | MCP comunidade #2 (mais completo, 25 tools, MIT) |
| Firecrawl search `site:developers.kommo.com "model context protocol"` | 0 resultados → confirma ausência de MCP oficial |
