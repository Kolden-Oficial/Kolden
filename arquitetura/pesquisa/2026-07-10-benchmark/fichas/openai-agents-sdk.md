---
tipo: nota
area: arquitetura
up: "[[arquitetura/_MOC-arquitetura]]"
relacionado:
  - "[[arquitetura/pesquisa/2026-07-10-benchmark/fichas/_indice|_indice]]"
---

# Ficha — OpenAI Agents SDK (+ Swarm, legado)
> Coletada em 2026-07-10 · Versão/commit da fonte: `openai/openai-agents-python` @ commit `e354126180ec6a1653c8e6f16194f3bcb743a6ce` (release mais recente: **v0.18.1**, publicada em 2026-07-09) · Status: ativo (Swarm: **deprecated**)

Repositório principal: https://github.com/openai/openai-agents-python (Python, pacote PyPI `openai-agents`).
Port oficial JS/TS **confirmado**: https://github.com/openai/openai-agents-js — monorepo pnpm com `packages/`, `examples/`, `docs/`, `pnpm-workspace.yaml` (commit consultado: `48cdb52d846277b0a1e6dd8946cd4cba2bf85939`).
Docs oficiais: https://openai.github.io/openai-agents-python/

---

## 1. Estrutura de pastas real

Árvore da raiz de `openai/openai-agents-python` (listada via API do GitHub em 2026-07-10, commit `e354126`):

```
openai-agents-python/
├── .agents/
├── .codex/
├── .github/
├── .vscode/
├── docs/                  # fonte do site MkDocs
├── examples/              # exemplos executáveis (ver abaixo)
├── src/
│   └── agents/            # pacote único: todo o SDK vive aqui
├── tests/
├── AGENTS.md              # instruções para agentes de codificação no próprio repo
├── CLAUDE.md
├── LICENSE
├── Makefile
├── PLANS.md
├── README.md
├── SECURITY.md
├── mkdocs.yml
├── pyproject.toml
├── pyrightconfig.json
└── uv.lock                # gerenciado com uv
```

Árvore de `src/agents/` (o coração do SDK — layout `src/`, pacote importável como `agents`):

```
src/agents/
├── extensions/            # integrações opcionais
├── handoffs/              # mecanismo de delegação entre agents
├── mcp/                   # suporte a servidores MCP
├── memory/                # sessions (histórico de conversa) — ver §3
├── models/                # abstração de provedores de modelo
├── realtime/              # agents de voz em tempo real
├── run_internal/
├── sandbox/
├── tracing/               # telemetria/observabilidade nativa
├── util/
├── voice/                 # pipeline de voz (STT/TTS)
├── __init__.py            # exporta a API pública (Agent, Runner, etc.)
├── _config.py             # config interna (prefixo _ = privado)
├── _debug.py
├── agent.py               # classe Agent (43 KB)
├── agent_output.py
├── exceptions.py
├── function_schema.py     # converte funções Python em JSON Schema de tools
├── guardrail.py           # input/output guardrails
├── items.py
├── lifecycle.py           # hooks de ciclo de vida
├── model_settings.py      # temperatura, tool_choice etc.
├── prompts.py
├── repl.py
├── result.py              # RunResult
├── run.py                 # Runner — o loop de orquestração (93 KB)
├── run_config.py          # RunConfig
├── run_context.py         # RunContextWrapper (injeção de dependências)
├── run_state.py           # serialização de estado de execução (131 KB)
├── stream_events.py
├── strict_schema.py
├── tool.py                # function_tool e tools hospedadas (77 KB)
├── tool_context.py
├── tool_guardrails.py
├── usage.py
└── version.py
```
(Arquivos menores omitidos por brevidade: `_mcp_tool_metadata.py`, `_public_agent.py`, `_tool_identity.py`, `agent_tool_input.py`, `agent_tool_state.py`, `apply_diff.py`, `computer.py`, `editor.py`, `logger.py`, `py.typed`, `responses_websocket_session.py`, `retry.py`, `run_error_handlers.py` — todos visíveis em https://github.com/openai/openai-agents-python/tree/main/src/agents)

Árvore de `examples/` — cada padrão de uso é um diretório:

```
examples/
├── agent_patterns/        # padrões de orquestração (ver §5)
├── basic/
├── customer_service/
├── financial_research_agent/
├── handoffs/
├── hosted_mcp/
├── mcp/
├── memory/
├── model_providers/
├── realtime/
├── reasoning_content/
├── research_bot/
├── sandbox/
├── tools/
├── voice/
├── auto_mode.py
└── run_examples.py
```

Árvore de `examples/agent_patterns/`:

```
examples/agent_patterns/
├── README.md
├── agents_as_tools.py
├── agents_as_tools_conditional.py
├── agents_as_tools_streaming.py
├── agents_as_tools_structured.py
├── deterministic.py
├── forcing_tool_use.py
├── hosted_multi_agent_beta.py
├── human_in_the_loop.py
├── human_in_the_loop_custom_rejection.py
├── human_in_the_loop_stream.py
├── input_guardrails.py
├── llm_as_a_judge.py
├── output_guardrails.py
├── parallelization.py
├── routing.py
└── streaming_guardrails.py
```

Fonte: https://github.com/openai/openai-agents-python/tree/main/examples/agent_patterns

---

## 2. Formato de definição de agent

**Agents são objetos Python instanciados em código — não há formato declarativo de arquivo (YAML/Markdown).** Snippet real de `examples/agent_patterns/agents_as_tools.py` (commit `e354126`):

```python
from agents import Agent, ItemHelpers, MessageOutputItem, Runner, trace

spanish_agent = Agent(
    name="spanish_agent",
    instructions="You translate the user's message to Spanish",
    handoff_description="An english to spanish translator",
)

orchestrator_agent = Agent(
    name="orchestrator_agent",
    instructions=(
        "You are a translation agent. You use the tools given to you to translate."
        "If asked for multiple translations, you call the relevant tools in order."
        "You never translate on your own, you always use the provided tools."
    ),
    tools=[
        spanish_agent.as_tool(
            tool_name="translate_to_spanish",
            tool_description="Translate the user's message to Spanish",
        ),
        # ... french, italian idem
    ],
)
```

Campos centrais observados nos exemplos oficiais: `name`, `instructions` (system prompt), `tools`, `handoffs`, `handoff_description`. A execução é sempre externa ao agent: `await Runner.run(orchestrator_agent, msg)`.

Fonte: https://github.com/openai/openai-agents-python/blob/main/examples/agent_patterns/agents_as_tools.py

---

## 3. Separação agent / tool-skill / orquestração / memória / config

A separação é **por módulo dentro do mesmo pacote** `src/agents/` — evidência na árvore do §1:

| Preocupação | Onde vive | Evidência |
|---|---|---|
| **Agent** (identidade + instruções + capacidades) | `src/agents/agent.py` (classe `Agent`) | arquivo de 43.379 bytes no tree do commit `e354126` |
| **Tools** | `src/agents/tool.py` (77 KB) + `function_schema.py` (gera JSON Schema a partir de funções Python) + `tool_guardrails.py` | https://github.com/openai/openai-agents-python/blob/main/src/agents/tool.py |
| **Orquestração** | `src/agents/run.py` — classe `Runner` (93 KB), o agent loop; `run_state.py` serializa estado (131 KB) | https://github.com/openai/openai-agents-python/blob/main/src/agents/run.py |
| **Memória** | `src/agents/memory/` — protocolo `session.py` + implementações: `sqlite_session.py`, `openai_conversations_session.py`, `openai_responses_compaction_session.py`, `session_settings.py` | https://github.com/openai/openai-agents-python/tree/main/src/agents/memory |
| **Config** | `src/agents/run_config.py` (`RunConfig`, por execução) + `model_settings.py` (parâmetros de modelo) + `_config.py` (global, ex.: API key) | árvore do §1 |
| **Delegação** | `src/agents/handoffs/` (subpacote próprio) | árvore do §1 |
| **Observabilidade** | `src/agents/tracing/` (subpacote próprio) | árvore do §1 |

Leitura para o KoldenOS: o SDK **não separa agents em arquivos individuais** — separa *conceitos* em módulos, e cada aplicação define seus agents onde quiser (nos exemplos oficiais, vários agents convivem no mesmo `.py`). A memória é plugável via interface (`Session`), não acoplada ao agent — o histórico é passado ao `Runner`, não guardado no `Agent`. Docs: https://openai.github.io/openai-agents-python/sessions/

---

## 4. Convenções de nomenclatura

Observável na árvore do §1 e nos exemplos do §2 (todas as fontes já citadas):

- **Arquivos e diretórios: `snake_case`** sem exceção (`function_schema.py`, `agents_as_tools_conditional.py`, `human_in_the_loop_stream.py`, `financial_research_agent/`).
- **Módulos privados com prefixo `_`**: `_config.py`, `_debug.py`, `_public_agent.py`, `_tool_identity.py`.
- **Agents são código, não arquivos declarativos**: nenhum YAML/JSON/Markdown de definição de agent existe no repo; a identidade do agent é o argumento `name="spanish_agent"` (string em snake_case nos exemplos) dentro de um `.py`.
- **Variáveis que guardam agents nomeadas `<papel>_agent`**: `spanish_agent`, `triage_agent`, `orchestrator_agent`, `synthesizer_agent` (snippets do §2 e §5).
- **1 padrão de orquestração = 1 arquivo** em `examples/agent_patterns/`; **1 caso de uso = 1 diretório** em `examples/`.
- Layout `src/` (pacote em `src/agents/`), lock file `uv.lock`, docs em MkDocs (`mkdocs.yml`).
- No port JS/TS: monorepo pnpm com `packages/` (workspaces), `.changeset/`, configs TS na raiz — https://github.com/openai/openai-agents-js

---

## 5. Hierarquia e delegação

O SDK oferece **dois mecanismos primitivos**, ambos com exemplos canônicos em `examples/agent_patterns/`:

**(a) Handoffs** — transferência de controle: o agent ativo passa a conversa inteira a outro agent, que assume dali em diante. Snippet real de `examples/agent_patterns/routing.py` (commit `e354126`):

```python
french_agent = Agent(
    name="french_agent",
    instructions="You only speak French",
)

spanish_agent = Agent(
    name="spanish_agent",
    instructions="You only speak Spanish",
)

english_agent = Agent(
    name="english_agent",
    instructions="You only speak English",
)

triage_agent = Agent(
    name="triage_agent",
    instructions="Handoff to the appropriate agent based on the language of the request.",
    handoffs=[french_agent, spanish_agent, english_agent],
)
```

Docstring do próprio arquivo: *"This example shows the handoffs/routing pattern. The triage agent receives the first message, and then hands off to the appropriate agent based on the language of the request."*
Fonte: https://github.com/openai/openai-agents-python/blob/main/examples/agent_patterns/routing.py
O mecanismo tem subpacote dedicado no SDK (`src/agents/handoffs/`) e diretório de exemplos próprio (`examples/handoffs/`).

**(b) Agents as tools** — hierarquia mantida: o agent orquestrador **não cede o controle**; invoca sub-agents como ferramentas via `sub_agent.as_tool(tool_name=..., tool_description=...)` e sintetiza o resultado (snippet completo no §2). Docstring do arquivo: *"The frontline agent receives a user message and then picks which agents to call, as tools."*
Fonte: https://github.com/openai/openai-agents-python/blob/main/examples/agent_patterns/agents_as_tools.py

Variações oficiais do padrão no mesmo diretório: `agents_as_tools_conditional.py`, `agents_as_tools_streaming.py`, `agents_as_tools_structured.py`.

Leitura para o KoldenOS: handoff = roteamento par-a-par (o chamador desaparece); agents-as-tools = hierarquia explícita (o orquestrador permanece no topo, útil para árvores multi-camada como a nossa).

---

## 6. Observações datadas

- **2026-07-09**: release **v0.18.1** publicada (fix/feat: defaults GPT-5.6, cache-write usage, realtime session cleanup) — https://github.com/openai/openai-agents-python/releases/tag/v0.18.1
- **2026-07-07**: **v0.18.0** — modelo default de RealtimeAgent vira `gpt-realtime-2.1` — https://github.com/openai/openai-agents-python/releases/tag/v0.18.0
- **2026-06-24 a 2026-07-06**: v0.17.7 e v0.17.8 (cadência ~semanal de releases; mantenedor principal ativo: @seratch).
- **Swarm (`openai/swarm`) é LEGADO/DEPRECATED.** Trecho literal do README oficial (commit `6af0b4c`, título do repo: "Swarm (experimental, educational)"):

  > **[!IMPORTANT]**
  > *"Swarm is now replaced by the [OpenAI Agents SDK](https://github.com/openai/openai-agents-python), which is a production-ready evolution of Swarm. The Agents SDK features key improvements and will be actively maintained by the OpenAI team. We recommend migrating to the Agents SDK for all production use cases."*

  Fonte: https://github.com/openai/swarm/blob/main/README.md
  Herança visível: o Agents SDK preserva os dois primitivos do Swarm (`Agent` + handoffs), trocando `functions=[transfer_to_agent_b]` (função que retorna outro Agent) pelo parâmetro de primeira classe `handoffs=[...]`.
- O repo Python contém `AGENTS.md` e `CLAUDE.md` na raiz (instruções para agentes de codificação trabalharem no próprio repo) — mesma convenção que o KoldenOS usa.
- Conclusão de datação: fonte **viva em 2026** — release de ontem (2026-07-09) relativa à data de coleta.

---

## 7. Fontes

1. Árvore raiz e `src/agents/` — https://github.com/openai/openai-agents-python/tree/main (commit consultado: `e354126180ec6a1653c8e6f16194f3bcb743a6ce`)
2. Árvore `examples/` e `examples/agent_patterns/` — https://github.com/openai/openai-agents-python/tree/main/examples/agent_patterns
3. Snippet agents-as-tools — https://github.com/openai/openai-agents-python/blob/main/examples/agent_patterns/agents_as_tools.py
4. Snippet handoffs/routing — https://github.com/openai/openai-agents-python/blob/main/examples/agent_patterns/routing.py
5. Módulo de memória/sessions — https://github.com/openai/openai-agents-python/tree/main/src/agents/memory
6. Releases (v0.18.1 ← v0.17.6, jun–jul/2026) — https://github.com/openai/openai-agents-python/releases
7. Aviso de deprecation do Swarm — https://github.com/openai/swarm/blob/main/README.md (commit `6af0b4caf37dca4526dfd98e9fbd8ce36e7eeb22`)
8. Port JS/TS oficial — https://github.com/openai/openai-agents-js (commit `48cdb52d846277b0a1e6dd8946cd4cba2bf85939`)
9. Documentação oficial — https://openai.github.io/openai-agents-python/ (agents, running_agents, sessions, handoffs, tools)
