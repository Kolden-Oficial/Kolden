---
id: paradigma-mcp
nome: "Model Context Protocol (MCP) — Open Standard for LLM ↔ Data & Tools"
titulo: "Protocolo aberto proposto pela Anthropic (novembro 2024) que padronizou 'USB-C para LLMs': conexão bidirecional entre AI apps e fontes de dados/tools — adotado por OpenAI, Google DeepMind e Microsoft em 2025"
tipo: paradigma
dominio: [foundation-models, interoperability-standard, protocol, tools, anthropic-standards, industry-consensus]
status: vigente
atualizado-em: 2026-07-04
real_person: false
ano_de_publicacao: 2024
autores_seminais: ["Anthropic team", "David Soria Parra", "Theo Chu", "Alex Albert"]
obra_seminal:
  titulo: "Introducing the Model Context Protocol"
  ano: 2024
  data_release: "25 de novembro de 2024"
  repo_referencia: "github.com/modelcontextprotocol"
  specification: "modelcontextprotocol.io/specification"
  empresa: "Anthropic (open protocol; contribuições Anthropic + OpenAI + Google + Microsoft + community)"
# --- linhagem (preenchido pelo genealogista) ---
herdou_de: [paradigma-langchain, paradigma-react, paradigma-autogpt, dario-amodei, john-mccarthy]
influenciou: [openai-mcp-adoption-2025, google-deepmind-mcp-adoption-2025, microsoft-mcp-adoption-2025, mcp-servers-ecosystem]
paradigmas_relacionados: [paradigma-langchain, paradigma-react, paradigma-autogen]
linhagens: [arquiteturas-de-agents-por-paradigma]
# --- operacionalização (preenchido pelo sintetizador) ---
frameworks_kolden: [arquitetura-de-agents-kolden]
squads_que_usam: [caos, prometeu, dedalo, hermes, egide, olimpo]
# --- federação (preenchido pelo bibliotecario) ---
confianca_da_fonte: alta
area: Liceu
up: "[[Liceu/_MOC-liceu]]"
---

# Model Context Protocol (MCP) — Paradigma "Open Standard for AI Interop" — Dossiê

## 1. Tese central (uma frase)
A fragmentação de integrações LLM ↔ tools/dados (cada framework com seu próprio schema; N modelos × M tools = N×M implementações redundantes) é problema de *padronização* que se resolve com um protocolo aberto — Anthropic propôs MCP (novembro 2024) como "USB-C para AI": servidor MCP expõe capabilities (resources, tools, prompts) via JSON-RPC 2.0 sobre stdio/HTTP; cliente MCP (LLM host) consome; separação clara + protocolo aberto permite ecossistema de milhares de servers reutilizáveis por qualquer cliente compatível, sem lock-in em provider ou framework — e a rápida adoção por OpenAI (março 2025), Google DeepMind (abril 2025) e Microsoft (2025) validou a tese em <6 meses.

## 2. Linhagem intelectual
*(genealogista)*
- **Herdou de:**
  - **LangChain (Chase out/2022) + tool integrations comunitárias** — direta: LangChain forneceu a evidência empírica de que a padronização era necessária (500+ integrações fragmentadas).
  - **ReAct (Yao 2022) + Function Calling (OpenAI junho 2023)** — direta: função calling foi primeiro passo em padronizar tool interface; MCP generaliza cross-model.
  - **John McCarthy (Onda 1) — Elephant 2000 / speech acts programming (1998)** — direta (linhagem conceitual): McCarthy propôs em Elephant 2000 protocolo declarativo entre agents baseado em atos de fala; MCP é realização parcial ~26 anos depois.
  - **Dario Amodei (Onda 4)** — direta: Anthropic é a empresa; Amodei aprovou como CEO. Consistente com posição pública de defender padrões abertos.
  - **AGENTS.md (OpenAI, 2024)** — paralelo competitivo: OpenAI propôs padrão semelhante para instruções persistentes de sub-agents; MCP e AGENTS.md coexistem em focos distintos (dados vs instruções), documentados no hub NotebookLM 2026-06-30 §Da Orquestração de Chats.
  - **Language Server Protocol (Microsoft 2016)** — inspiração explícita: MCP é modelado em LSP (padrão que unificou IDE ↔ language servers) — arquitetos Anthropic reconhecem em blog + entrevistas.
- **Autores seminais (Anthropic, 2024):**
  - **David Soria Parra** — Anthropic principal engineer; público em episódio YouTube "The Model Context Protocol" (2024).
  - **Theo Chu** — Anthropic; co-apresentador do vídeo oficial.
  - **Alex Albert** — Anthropic Head of Developer Relations; anunciou publicamente.
  - **Anthropic team** — Anthropic bill como org autora; especifica que é open protocol governado por comunidade posteriormente.
- **Transmitiu a:**
  - **Adopção OpenAI (março 2025)** — direta: OpenAI adiciona suporte a MCP em Agents SDK.
  - **Adopção Google DeepMind (abril 2025)** — direta: Gemini API + Google AI Studio suportam MCP.
  - **Adopção Microsoft (2025)** — direta: Copilot + AutoGen v0.4 suportam MCP.
  - **Ecossistema de servers MCP** — direta: milhares de MCP servers open-source em 2026 (GitHub, filesystem, database, Slack, Notion, browser, custom).
  - **Claude Desktop + Claude Code MCP integration** — direta: primeira grande implementação client.
- **Posição na linhagem `arquiteturas-de-agents-por-paradigma`:** elo 9 (última linha — padrão de interoperabilidade); consolidação industrial dos 8 elos anteriores.

## 3. Engenharia documentada

```yaml
mental_models:
  arquitetura_cliente_servidor_JSON_RPC:
    descricao: "MCP usa JSON-RPC 2.0 como protocolo de mensagem. Duas partes: (1) *MCP Server* — processo que expõe capabilities (resources, tools, prompts) — pode ser stdio (subprocess) ou HTTP+SSE; (2) *MCP Client* — LLM host (Claude Desktop, IDE, agent framework) que descobre + invoca. Handshake inicial troca capabilities; depois cliente invoca sobre demanda. Design inspirado em Language Server Protocol (Microsoft 2016)."
    estrutura: [JSON-RPC-2.0, MCP-server-expoe, MCP-client-consome, stdio-ou-HTTP-SSE, LSP-inspirado, capability-negotiation]
    fonte: "MCP Specification (modelcontextprotocol.io/specification)"
    ano: 2024
  tres_categorias_de_capabilities:
    descricao: "Server expõe 3 tipos de capabilities: (1) *Resources* — dados que LLM pode ler (files, database rows, API responses); (2) *Tools* — funções que LLM pode invocar (side effects, mutations); (3) *Prompts* — templates reutilizáveis para conversas específicas. Separação de leitura vs escrita vs template é intencional: informa LLM sobre efeitos + permite safety policies (ex.: tools requerem confirmação humana; resources são side-effect-free)."
    estrutura: [Resources-leitura, Tools-mutation, Prompts-templates, safety-por-categoria]
    fonte: "MCP Specification § Server Features"
    ano: 2024
  transports_stdio_e_http_sse:
    descricao: "Dois transports suportados: (a) *stdio* — server é subprocess local do cliente; comunicação por stdin/stdout; adequado para tools locais (filesystem, git, sqlite); (b) *HTTP + SSE (Server-Sent Events)* — server é serviço remoto; cliente conecta via HTTP; adequado para tools cloud (Slack, GitHub, databases remotos). Escolha por deploy pattern."
    estrutura: [stdio-para-tools-locais, HTTP-SSE-para-tools-remotos, SSE-para-server-push]
    fonte: "MCP Specification § Transports"
    ano: 2024
  ecossistema_de_servers_pre_existentes:
    descricao: "Em 2026, ecossistema de MCP servers cresce: repositório modelcontextprotocol/servers (oficial Anthropic) mais milhares em GitHub. Categorias comuns: filesystem, sqlite, postgres, github, gitlab, slack, notion, google drive, jira, linear, sentry, browser automation, vector stores. Padrão de composição: cliente instancia N servers simultaneamente; cada tool call roteia ao server apropriado."
    estrutura: [modelcontextprotocol-slash-servers-oficial, ecossistema-comunidade, categorias-canonicas, composicao-N-servers-simultaneos]
    fonte: "github.com/modelcontextprotocol/servers + community list"
    ano: 2024
  adopcao_industrial_rapida:
    descricao: "Timeline de adoção: (a) 25 nov 2024 — Anthropic anuncia MCP + Claude Desktop suporte; (b) dez 2024 - fev 2025 — comunidade Anthropic + Cursor + Cline + Zed adoptam; (c) mar 2025 — OpenAI Agents SDK adiciona suporte MCP; (d) abr 2025 — Google DeepMind (Gemini + Google AI Studio) suporta; (e) mid 2025 — Microsoft Copilot Studio + AutoGen suportam; (f) 2026 — MCP é lingua franca de tools LLM. Adoção mais rápida que qualquer padrão anterior de AI industry."
    estrutura: [Anthropic-nov-2024, OpenAI-mar-2025, Google-abr-2025, Microsoft-2025, industria-consensus-em-6-meses]
    fonte: "Anthropic blog announcements + OpenAI Agents SDK docs 2025 + Google Gemini API docs 2025"
    ano: 2024
  governance_como_open_standard:
    descricao: "MCP é open protocol — especificação em modelcontextprotocol.io + referência implementations em GitHub. Anthropic explicitou intenção de handoff a governance neutra (semelhante a LSP → foundation). Working groups + RFC process em desenvolvimento 2025-2026. Marca diferença de padrões proprietários (ex.: ChatGPT Plugins fechados 2023)."
    estrutura: [open-spec, referencia-implementations, RFC-process, working-groups, governance-neutra-planejada]
    fonte: "modelcontextprotocol.io governance page; Anthropic blog"
    ano: 2024
  safety_via_permissoes_explicitas:
    descricao: "MCP recomenda: cliente pede confirmação humana antes de invocar tool com side effects. Cada server declara permissions requeridas; cliente exibe ao usuário. Claude Desktop implementa via UI dialogs; outros clients variam. Padrão adotado pelo hub NotebookLM 2026-06-30 §Adoção da Engenharia como DevOps — 'sandboxes seguros'."
    estrutura: [confirmacao-humana-antes-de-side-effect, permissions-declared-per-server, UI-dialogs-em-Claude-Desktop, sandbox-recomendado]
    fonte: "MCP Specification § Security Considerations + hub NotebookLM 2026-06-30 §MCP"
    ano: 2024
```

## 4. Mito e folclore

| Afirmação popular | Rótulo | Por quê |
|---|---|---|
| "MCP é 'ChatGPT Plugins renomeado'." | REFUTADO | ChatGPT Plugins (2023) foi padrão fechado OpenAI-only; nunca teve especificação aberta ou adoção multi-vendor. MCP é aberto desde dia 1. |
| "MCP substitui LangChain/AutoGen/CrewAI." | REFUTADO | MCP é *protocolo de tools*; frameworks agentic continuam necessários para orquestração, memory, chains. Complementares. |
| "MCP é apenas para Claude." | REFUTADO | Adotado por OpenAI, Google, Microsoft em <6 meses. Model-agnostic desde specification. |
| "MCP resolve todo problema de safety em agent." | REFUTADO | Endereça superfície de tools; não substitui alignment, red-teaming, sandbox robusto. Complementar. |
| "MCP tem overhead grande." | DISPUTADO | JSON-RPC + stdio tem latência ~milissegundos; HTTP+SSE tem custo de conexão. Comparado a benefício de padronização, aceito pela indústria. Empíricas em produção mostram overhead desprezível vs custo do LLM call. |
| "Anthropic vai deprecar MCP quando adotar padrão próprio." | ESPECULATIVO | Sem evidência. Anthropic explicitou compromisso com governance neutra. |
| "MCP servers rodam código não confiável." | PARCIALMENTE_CORRETO | Verdadeiro para servers arbitrários; usuário deve instalar apenas servers auditados (semelhante a extensões VS Code). Community + safety review em curso. |
| "MCP é AGI." | REFUTADO | É protocolo. AGI é meta distante. Confusão popular. |

## 5. O que este paradigma REJEITARIA
- **Integração ad-hoc tool-por-tool sem protocolo.** Argumento fundacional.
- **Padrão fechado controlado por 1 vendor.** MCP é explicitamente open.
- **Tools sem declaração de permissions.** Security first.
- **Cliente-server em transport único.** Suportar stdio + HTTP+SSE por casos.
- **Ausência de handshake de capabilities.** Descoberta dinâmica é veto.
- **Governance permanente por 1 empresa.** Anthropic sinaliza handoff.

## 6. Vocabulário-assinatura
| Termo | Contexto / Obra |
|---|---|
| "MCP" (Model Context Protocol) | official name. |
| "MCP Server / MCP Client" | protocol roles. |
| "Resources / Tools / Prompts" | capability categories. |
| "stdio / HTTP+SSE" | transports. |
| "capability negotiation" | handshake. |
| "USB-C for AI" | Anthropic metáfora. |
| "MCP registry" | catálogo servers. |
| "MCP inspector" | debug tool oficial. |
| "reference server" (filesystem, sqlite, etc.) | pacotes iniciais Anthropic. |
| "Claude Desktop" | first client de referência. |

## 7. Gancho de operacionalização Kolden
- **Alimenta o framework:** `arquitetura-de-agents-kolden` (passo "tools via MCP por default" — cada agent Kolden consome tools por MCP em vez de wrappers custom; passo "3 categorias declaradas" — Resources vs Tools vs Prompts; passo "permission dialogs para side-effect" — Ronan aprova tool call que muda estado; passo "server local vs remoto por deploy pattern" — stdio para tools locais, HTTP para cloud; passo "audit de servers instalados" — apenas servers vetted).
- **Squads que consomem:** Caos (Ritual pode expor Kolden-specific tools via MCP server próprio), Prometeu (arquitetura de inferência: MCP como camada padrão), Dedalo (multi-agent com MCP tools compartilhados), Hermes (multi-plataforma como MCP servers — Telegram/WhatsApp/Slack cada um um server), Égide (safety: permission dialogs + audit), Olimpo (governança: escolha de servers Kolden-approved).
- **Pergunta operacional:** "Este agent Kolden acessa tools via MCP standard ou wrapper proprietário? Se proprietário, Kolden ganha lock-in em framework — anti-Kolden neutrality principle."

## 8. Como o paradigma MCP opera
1. **Cliente MCP inicia** (Claude Desktop, agent framework).
2. **Descobre MCP servers configurados** (via config file ou env).
3. **Handshake com cada server**: capabilities negotiation.
4. **Server declara resources/tools/prompts disponíveis** com schemas.
5. **Cliente expõe ao LLM** como tool definitions em system prompt.
6. **LLM decide invocar tool** durante conversation.
7. **Cliente envia tool call ao server** via JSON-RPC.
8. **Server executa e retorna resultado** (com error handling).
9. **Se side-effect, cliente pede confirmação humana** primeiro.
10. **Resultado injetado no contexto** para LLM continuar.

---
*Dossiê de PARADIGMA. Indexado com `tipo: paradigma`. Este é o elo final da linhagem — padrão de
interoperabilidade que consolida os 8 paradigmas anteriores.*
