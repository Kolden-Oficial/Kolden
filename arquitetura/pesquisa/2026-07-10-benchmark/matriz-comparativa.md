# Matriz Comparativa — Benchmarking de Arquitetura de Agents

> Fase 1 da missão de arquitetura KoldenOS · 2026-07-10
> Cada célula é rastreável à ficha da fonte em `fichas/` (coluna "Ficha"), onde vive o link + trecho literal.
> Todas as 9 fichas passaram por crivo mecânico (URLs/árvores/snippets/datas) e spot-check adversarial contra fonte primária (27 afirmações re-verificadas; 2 correções aplicadas e registradas nas fichas).

## Fontes e status

| # | Fonte | Ficha | Versão verificada | Status 2026 |
|---|-------|-------|-------------------|-------------|
| 1 | OpenAI Agents SDK (+ Swarm) | `fichas/openai-agents-sdk.md` | v0.18.1 (2026-07-09) | Ativo · Swarm **deprecated** |
| 2 | LangGraph | `fichas/langgraph.md` | 1.2.9 (2026-07-10) | Ativo · lib supervisor em transição |
| 3 | CrewAI | `fichas/crewai.md` | 1.15.2 (2026-07-08) | Ativo |
| 4 | AutoGen (Microsoft) / AG2 | `fichas/autogen-ag2.md` | 0.7.5 (2025-09-30) / v1.0.0b0 (2026-07-03) | **Manutenção** / Ativo em ruptura 0.x→1.0 |
| 5 | Google ADK | `fichas/google-adk.md` | v2.4.0 + v1.36.1 (2026-07-07) | Ativo (2 trilhas) |
| 6 | Anthropic Claude Code + engenharia | `fichas/anthropic-claude-code.md` | docs v2.1.205 · `anthropics/skills` @ `9d2f1ae` | Ativo |
| 7 | smolagents (Hugging Face) | `fichas/smolagents.md` | v1.26.0 (2026-05-29) | Ativo |
| 8 | Spec AGENTS.md | `fichas/spec-agents-md.md` | site live + repo @ `d1ac7f0` | Ativo · Linux Foundation · 60k+ repos |
| 9 | wshobson/agents (37,8k★) | `fichas/repos-de-producao.md` §A | push 2026-07-08 | Ativo |
| 10 | VoltAgent/awesome-claude-code-subagents (23,2k★) | `fichas/repos-de-producao.md` §B | push 2026-07-10 | Ativo |
| 11 | BMAD-METHOD v6 (50,3k★ — linhagem do nosso AIOX) | `fichas/repos-de-producao.md` §C | push 2026-07-10 | Ativo · **virada agent→skill** |
| 12 | MetaGPT (69,3k★) | `fichas/repos-de-producao.md` §D | push 2026-01-21 | Ativo-lento (org pivotou p/ produto) |

## Dimensão 1 — Estrutura de projeto/frota

| Fonte | Estrutura | Rastro |
|---|---|---|
| OpenAI SDK | Pacote `src/agents/` por conceito (agent.py, tool.py, run.py, memory/, handoffs/); agents da aplicação vivem onde o dev quiser (código) | ficha §1, §3 |
| LangGraph | Monorepo `libs/` (1 pacote/pasta); **projeto de aplicação**: `langgraph.json` (manifesto) + `src/<agent>/` com anatomia fixa `graph.py, state.py, tools.py, prompts.py, context.py` | ficha §1b-c |
| CrewAI | Scaffold gerado: `src/<proj>/config/{agents.yaml,tasks.yaml}` + `crew.py` + `tools/` + `knowledge/` + `skills/` + `AGENTS.md` na raiz de TODO projeto gerado | ficha §1.3 |
| AutoGen MS | 3 camadas por pacote: `autogen-core` → `autogen-agentchat` → `autogen-ext`; módulos privados `_*.py`; 1 padrão de orquestração = 1 módulo | ficha §1a |
| Google ADK | **Layout obrigatório de projeto**: `parent_folder/agent_folder/{__init__.py, agent.py, .env}` com `root_agent`; sub-agents em `sub_agents/<nome>/agent.py` (árvore de pastas espelha árvore de agents) | ficha §1.4-1.5 |
| Claude Code | `.claude/{agents,skills,commands}/` por projeto + `~/.claude/` global + plugins (`plugin.json` + agents/ + skills/ + hooks/ + .mcp.json); descoberta recursiva com precedência documentada | ficha §1.1-1.4 |
| smolagents | Pacote único; agents = objetos; projeção em disco só no export (`agent.json`, `prompts.yaml`, `tools/`, `managed_agents/` recursivo) | ficha §1, §3 |
| AGENTS.md | 1 arquivo Markdown na raiz (+ aninhados em monorepo, o mais próximo vence) | ficha §1, §5 |
| wshobson | `plugins/<domínio>/{agents,skills,commands}/` — **fonte única**; artefatos por harness **gerados** por `tools/adapters/*.py`; `CLAUDE.md` = symlink → `AGENTS.md` | ficha §A.1, §A.3 |
| VoltAgent | `categories/01-…10-<categoria>/` numeradas + agents flat kebab-case dentro | ficha §B.1 |
| BMAD v6 | `src/{core-skills,bmm-skills}/` com **fases numeradas do SOP como diretórios** (`1-analysis`…`4-implementation`); módulos com `module.yaml` + registro central `bmad-modules.yaml` | ficha §C.1, §C.3 |
| MetaGPT | Pacote por conceito: `roles/`, `actions/`, `environment/`, `memory/`, `tools/`, `prompts/` | ficha §D.1 |

## Dimensão 2 — Formato de definição de agent

| Fonte | Formato | Rastro |
|---|---|---|
| OpenAI SDK | Código: `Agent(name, instructions, tools, handoffs, handoff_description)` — zero declarativo | ficha §2 |
| LangGraph | Código: módulo exportando `graph` compilado; referenciado no manifesto por `"nome": "./path.py:graph"` | ficha §2 |
| CrewAI | **Declarativo YAML**: tripé `role/goal/backstory` em `agents.yaml` + wiring por decorators (`@CrewBase/@agent/@task/@crew`); nome do método = chave YAML | ficha §2.1-2.3 |
| AutoGen/AG2 | Código: `AssistantAgent(...)` / `ConversableAgent(...)`; MS tem component-config YAML/JSON serializável (`load_component()`) | ficha §2 |
| Google ADK | Código: `Agent(model, name, description, instruction, tools, sub_agents)`; YAML `root_agent.yaml` existe mas está **experimental E deprecated** na 2.x | ficha §2.1-2.2 |
| Claude Code | **Declarativo Markdown + frontmatter YAML**: `name`, `description` obrigatórios; `tools`, `model`, `memory`, `skills`, `mcpServers`, `hooks`, `effort`… corpo = system prompt | ficha §2.1 |
| smolagents | Código: `CodeAgent/ToolCallingAgent(tools, model, name, description)`; export = `agent.json` + `prompts.yaml` | ficha §2 |
| AGENTS.md | Não define agents — Markdown livre de instruções, sem campos obrigatórios | ficha §2 |
| wshobson | Markdown + frontmatter (`name` prefixado pelo plugin, `description` com gatilho, `model` por tier, `tools` opcional) | ficha §A.2 |
| VoltAgent | Markdown + frontmatter (`name`, `description`-gatilho, `tools` allowlist por perfil de papel, `model: inherit`) | ficha §B.2 |
| BMAD v6 | `SKILL.md` frontmatter mínimo + corpo com DSL de workflow pseudo-XML; **persona embutida na skill** (sem dir agents/) | ficha §C.2 |
| MetaGPT | Classe Pydantic: `name, profile, goal, constraints, instruction, tools` + `_watch([eventos])` | ficha §D.2 |

## Dimensão 3 — Separação agent / tool-skill / orquestração / memória / config

| Fonte | Como separa | Rastro |
|---|---|---|
| OpenAI SDK | Por módulo: agent.py / tool.py / run.py (Runner) / memory/ (Session plugável — histórico NÃO vive no Agent) / run_config.py | ficha §3 |
| LangGraph | Por arquivo no pacote do agente (graph/state/tools/prompts/context) + memória em pacotes irmãos (checkpoint = curto prazo, store = longo prazo) + manifesto de deploy | ficha §3 |
| CrewAI | Identidade = YAML declarativo; comportamento = código; conhecimento = `knowledge/` (dados); memória = infra do framework (`memory=True`); segredos = `.env` | ficha §3 |
| AutoGen MS | Por pacote (core/agentchat/ext) e por módulo; memória como extensão (Redis, Mem0) | ficha §3 |
| Google ADK | Por pacote no framework (agents/tools/skills/sessions/memory/artifacts/runners); no projeto: `agent.py` + `prompt.py` separado + `.env` + `eval/` + `deployment/` | ficha §3 |
| Claude Code | Agent = identidade+política (.md); Tool = MCP (`.mcp.json`, escopável por agent); Skill = conhecimento sob demanda (progressive disclosure 3 níveis); Memória = CLAUDE.md hierárquico + `agent-memory/<nome>/` por agent; Config = settings.json em cascata | ficha §3 |
| smolagents | Por módulo; orquestração NÃO é módulo — é o parâmetro `managed_agents`; prompts de sistema em YAML versionado | ficha §3 |
| wshobson | Agents/skills/commands por plugin; adaptação por harness 100% fora do conteúdo (`tools/adapters/`); contexto = 1 arquivo com cap de ~150 linhas | ficha §A.3 |
| BMAD v6 | Skill = unidade de trabalho; módulo = unidade de distribuição; config em **cascata de 3 camadas** (skill default → team → user, com merge definido); estado compartilhado em YAML do projeto | ficha §C.3 |
| MetaGPT | Rígida por pacote: role ≠ action ≠ tool ≠ prompt ≠ memory ≠ environment; acoplamento por TIPO DE MENSAGEM (pub/sub), não chamada direta | ficha §D.3 |

## Dimensão 4 — Convenções de nomenclatura

| Fonte | Convenção | Rastro |
|---|---|---|
| OpenAI SDK | snake_case universal; `_` = privado; variáveis `<papel>_agent` | ficha §4 |
| LangGraph | snake_case (código) + kebab-case (pacotes distribuíveis); grafos nomeados `"chave": "path.py:simbolo"`; arquivos de scaffold com nomes fixos | ficha §4 |
| CrewAI | snake_case **forçado por código** (regex de sanitização + validação de identifier + rejeição de keywords); tasks com sufixo `_task`; nomes de arquivo de config fixos | ficha §4 |
| Google ADK | `name` = identificador Python válido **validado por código** (`isidentifier()`), único na árvore, `user` reservado; `description` funcional (critério de roteamento) | ficha §4 |
| Claude Code / spec skills | skill `name`: 1-64 chars, `a-z0-9-`, sem hífen nas pontas, sem `--`, **igual ao nome do diretório**; `description` 1-1024 chars; agent `name`: lowercase+hífen; namespaces compostos (`plugin:skill`, `mcp__server__tool`) | ficha §4 |
| smolagents | Classes com sufixo semântico (`*Agent`, `*Tool`, `*Step`); nomes de export fixos | ficha §4 |
| wshobson | kebab-case total; plugin = domínio, agent = papel; `name` prefixado pelo plugin (namespace global plano); máx. 2 níveis | ficha §A.4 |
| VoltAgent | Categorias com prefixo numérico ordenador (`01-`–`10-`); agents kebab-case por papel | ficha §B.4 |
| BMAD v6 | Prefixo universal `bmad-`; fases numeradas codificam o SOP na árvore; códigos curtos de módulo | ficha §C.4 |
| MetaGPT | snake_case por papel em `roles/`; prompts espelham o nome do role | ficha §D.4 |

## Dimensão 5 — Hierarquia e delegação

| Fonte | Mecanismo | Rastro |
|---|---|---|
| OpenAI SDK | (a) handoffs = transfere controle (chamador sai); (b) **agents-as-tools** = orquestrador permanece no topo (`sub.as_tool(...)`) — recomendado p/ hierarquia | ficha §5 |
| LangGraph | Supervisor/times hierárquicos multinível; **direção oficial atual: handoff = tool call** (lib supervisor em modo compatibilidade) | ficha §5 |
| CrewAI | `Process.hierarchical` + `manager_agent/manager_llm`; `allow_delegation` por agent; **Flows acima de Crews** (2 níveis de orquestração distintos) | ficha §5 |
| AutoGen/AG2 | 4 mecanismos MS (SelectorGroupChat, Swarm/handoffs, Agent/Team-as-tool, GraphFlow); AG2: handoffs declarativos por agent com condições determinísticas + LLM + fallback | ficha §5 |
| Google ADK | **Árvore de agents de 1ª classe**: `sub_agents`/`parent_agent` com pai único FORÇADO por código; delegação LLM via `description` (`transfer_to_agent` interceptado pelo AutoFlow); navegação nativa (`find_agent`) | ficha §5.1-5.2 |
| Claude Code | Delegação automática pela `description`; subagents aninham até profundidade 5 (v2.1.172+); foreground/background; `SendMessage` p/ retomar; orchestrator-worker validado em produção (+90,2% vs single-agent, custo 15× tokens) | ficha §5 |
| smolagents | `managed_agents` = sub-agents registrados como tools (name+description obrigatórios por assert); recursivo e serializável | ficha §5 |
| AGENTS.md | Só precedência de instruções (mais próximo vence); multi-agente fora do escopo | ficha §5 |
| wshobson | Delegação delegada ao harness; hierarquia expressa por agents orquestradores declarativos + **model tiers como camadas** | ficha §A.5 |
| VoltAgent | Hierarquia é uma categoria de 1ª classe (09-meta-orchestration) com papéis separados; grafo de delegação declarado NO CORPO do .md ("Integration with other agents") | ficha §B.5 |
| BMAD v6 | Pipeline SOP entre skills com estado em arquivo (`sprint-status.yaml`); handoff = instrução no output da skill | ficha §C.5 |
| MetaGPT | Pub/sub de mensagens tipadas no Environment; `Team.hire()`; **budget guard** (`invest()` + `NoMoneyException`) | ficha §D.5 |

## Dimensão 6 — O que está deprecated/em transição (mapa de risco)

| Item | Status | Rastro |
|---|---|---|
| OpenAI Swarm | Morto — substituído pelo Agents SDK (aviso literal no README) | openai-agents-sdk §6 |
| microsoft/autogen (0.4) | Maintenance mode — sucessor é Microsoft Agent Framework | autogen-ag2 §0 |
| AG2 clássico (ConversableAgent/GroupChat) | Movido para `ag2ai/ag2-classic`, maintenance mode | autogen-ag2 §0 (corrigido) |
| langgraph-supervisor (lib) | Modo compatibilidade — README recomenda padrão handoff-via-tools | langgraph §5-6 |
| ADK Agent Config YAML | Experimental E `@deprecated` na 2.x — instável para spec | google-adk §2.2 |
| `.claude/commands/` | **Formato legado compatível — commands foram fundidos em skills** | anthropic-claude-code §1.3 |
| BMAD `agents/` como unidade | Abandonado na v6 — skill virou a unidade central | repos-de-producao §C |
| Docs 0.x LangGraph (`configuration.py`/RunnableConfig) | Geração anterior — templates atuais usam `context.py`/`Runtime[Context]` | langgraph §6 |
