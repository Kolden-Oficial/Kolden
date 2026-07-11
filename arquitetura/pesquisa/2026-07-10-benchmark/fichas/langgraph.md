---
tipo: nota
area: arquitetura
up: "[[arquitetura/_MOC-arquitetura]]"
relacionado:
  - "[[arquitetura/pesquisa/2026-07-10-benchmark/fichas/_indice|_indice]]"
---

# Ficha — LangGraph

> Coletada em 2026-07-10 · Versão/commit da fonte: langgraph==1.2.9 (release de 2026-07-10) · monorepo `langchain-ai/langgraph` @ commit `95af6a00` · templates: `new-langgraph-project` @ `921235cc`, `react-agent` @ `7d1f9832` · Status: ativo

## 1. Estrutura de pastas real

### 1a. Monorepo do framework (`langchain-ai/langgraph` @ `95af6a00`)

Raiz + `libs/` (listagem real via API de contents do GitHub):

```
langgraph/                      # https://github.com/langchain-ai/langgraph
├── .github/
├── AGENTS.md                   # instruções para agentes de código (1.9 KB)
├── CLAUDE.md
├── LICENSE
├── Makefile
├── README.md
├── docs/
├── examples/
└── libs/                       # monorepo: 1 pacote publicável por subpasta
    ├── checkpoint/             # langgraph-checkpoint — base de persistência (memória)
    ├── checkpoint-conformance/ # suite de conformidade p/ implementações de checkpointer
    ├── checkpoint-postgres/    # backend Postgres
    ├── checkpoint-sqlite/      # backend SQLite
    ├── cli/                    # langgraph-cli (dev server, build, deploy)
    ├── langgraph/              # núcleo do framework (runtime Pregel + StateGraph)
    ├── prebuilt/               # langgraph-prebuilt — create_react_agent, ToolNode
    ├── sdk-js/                 # SDK cliente JS p/ LangGraph Server
    └── sdk-py/                 # SDK cliente Python p/ LangGraph Server
```

Fonte: https://github.com/langchain-ai/langgraph/tree/95af6a00718588e7b7ce17310e8006d267896a77 e https://github.com/langchain-ai/langgraph/tree/95af6a00718588e7b7ce17310e8006d267896a77/libs

Pacote núcleo `libs/langgraph/langgraph/` (listagem real):

```
libs/langgraph/langgraph/
├── _internal/
├── callbacks.py
├── channels/        # canais de estado (base do modelo Pregel)
├── config.py
├── constants.py
├── errors.py
├── func/            # Functional API (@entrypoint, @task)
├── graph/           # StateGraph (Graph API)
├── managed/
├── pregel/          # runtime de execução (superstep/BSP)
├── py.typed
├── runtime.py       # Runtime[Context] — contexto injetado em nós
├── stream/
├── types.py         # Command, Send, interrupt...
├── typing.py
├── utils/
├── version.py
└── warnings.py
```

Fonte: https://github.com/langchain-ai/langgraph/tree/95af6a00718588e7b7ce17310e8006d267896a77/libs/langgraph/langgraph

Observação estrutural: **memória não mora no núcleo** — vive em pacotes irmãos (`libs/checkpoint*`), e o agente pronto (`create_react_agent`) também é pacote separado (`libs/prebuilt`).

### 1b. Scaffold de PROJETO de aplicação (template oficial `new-langgraph-project` @ `921235cc`)

```
new-langgraph-project/
├── .env.example            # segredos fora do código
├── .github/
├── .gitignore
├── LICENSE
├── Makefile
├── README.md
├── langgraph.json          # MANIFESTO: aponta os grafos por path
├── pyproject.toml
├── src/
│   └── agent/              # pacote Python do agente
│       ├── __init__.py
│       └── graph.py        # define e compila o grafo; exporta `graph`
├── static/
├── tests/
└── uv.lock
```

Fonte: https://github.com/langchain-ai/new-langgraph-project/tree/921235cc33b57a314516f2d103657cda2143b69d

`langgraph.json` (conteúdo integral real):

```json
{
  "$schema": "https://langgra.ph/schema.json",
  "dependencies": ["."],
  "graphs": {
    "agent": "./src/agent/graph.py:graph"
  },
  "env": ".env",
  "image_distro": "wolfi"
}
```

Fonte: https://github.com/langchain-ai/new-langgraph-project/blob/921235cc33b57a314516f2d103657cda2143b69d/langgraph.json

### 1c. Template `react-agent` (mais rico; @ `7d1f9832`) — anatomia interna do pacote do agente

```
react-agent/
├── .env.example
├── langgraph.json              # "agent": "./src/react_agent/graph.py:graph"
├── pyproject.toml
├── src/
│   └── react_agent/
│       ├── __init__.py
│       ├── context.py          # parâmetros configuráveis (dataclass Context)
│       ├── graph.py            # orquestração: nós, arestas, compile
│       ├── prompts.py          # SYSTEM_PROMPT separado
│       ├── state.py            # InputState / State (schema do estado)
│       ├── tools.py            # TOOLS: lista de callables
│       └── utils.py
├── static/
└── tests/
```

Fontes: https://github.com/langchain-ai/react-agent/tree/7d1f9832f56d6d29ad9ae248caf0b263c5460145 e https://github.com/langchain-ai/react-agent/tree/7d1f9832f56d6d29ad9ae248caf0b263c5460145/src/react_agent

## 2. Formato de definição de agent

Um "agent" LangGraph = **um módulo Python que constrói um `StateGraph` e exporta a instância compilada** com nome estável (`graph`), referenciada pelo manifesto. Snippet real e integral do template mínimo (`src/agent/graph.py`):

```python
from langgraph.graph import StateGraph
from langgraph.runtime import Runtime
from typing_extensions import TypedDict


class Context(TypedDict):
    my_configurable_param: str


@dataclass
class State:
    changeme: str = "example"


async def call_model(state: State, runtime: Runtime[Context]) -> Dict[str, Any]:
    return {
        "changeme": "output from call_model. "
        f"Configured with {(runtime.context or {}).get('my_configurable_param')}"
    }


graph = (
    StateGraph(State, context_schema=Context)
    .add_node(call_model)
    .add_edge("__start__", "call_model")
    .compile(name="New Graph")
)
```

Fonte: https://github.com/langchain-ai/new-langgraph-project/blob/921235cc33b57a314516f2d103657cda2143b69d/src/agent/graph.py

Versão com ciclo modelo↔ferramentas (trecho real de `react_agent/graph.py`):

```python
builder = StateGraph(State, input_schema=InputState, context_schema=Context)
builder.add_node(call_model)
builder.add_node("tools", ToolNode(TOOLS))
builder.add_edge("__start__", "call_model")
builder.add_conditional_edges("call_model", route_model_output)
builder.add_edge("tools", "call_model")
graph = builder.compile(name="ReAct Agent")
```

Fonte: https://github.com/langchain-ai/react-agent/blob/7d1f9832f56d6d29ad9ae248caf0b263c5460145/src/react_agent/graph.py

Alternativa de alto nível — `create_react_agent` (pacote `langgraph-prebuilt`, arquivo real `libs/prebuilt/langgraph/prebuilt/chat_agent_executor.py`); uso real (trecho do README do supervisor):

```python
from langgraph.prebuilt import create_react_agent

math_agent = create_react_agent(
    model=model,
    tools=[add, multiply],
    name="math_expert",
    prompt="You are a math expert. Always use one tool at a time."
)
```

Fontes: https://github.com/langchain-ai/langgraph/blob/95af6a00718588e7b7ce17310e8006d267896a77/libs/prebuilt/langgraph/prebuilt/chat_agent_executor.py · https://github.com/langchain-ai/langgraph-supervisor-py/blob/74c8752739ae2fe0fdc3bc39408ebfb161e2a428/README.md

## 3. Separação agent / tool-skill / orquestração / memória / config

Evidência direta na árvore do template `react-agent` (§1c) — separação **por arquivo dentro do pacote do agente**:

| Preocupação | Onde vive | Evidência |
|---|---|---|
| Agent (identidade/execução) | `src/react_agent/graph.py` exportando `graph` | árvore §1c |
| Tools | `src/react_agent/tools.py` — `TOOLS: List[Callable[..., Any]] = [search]`; tool acessa config via `get_runtime(Context)` | https://github.com/langchain-ai/react-agent/blob/7d1f9832f56d6d29ad9ae248caf0b263c5460145/src/react_agent/tools.py |
| Prompt | `src/react_agent/prompts.py` (arquivo próprio, 124 bytes) | árvore §1c |
| Estado | `src/react_agent/state.py` (`InputState`, `State`) | árvore §1c |
| Orquestração | arestas/`add_conditional_edges` no próprio `graph.py`; entre agentes, grafo-pai (§5) | snippet §2 |
| Memória curta (thread) | `checkpointer` — pacotes `libs/checkpoint`, `checkpoint-postgres`, `checkpoint-sqlite`; passado em `.compile(checkpointer=...)` | árvore §1a; snippet §5 (`InMemorySaver`) |
| Memória longa (cross-thread) | `store` — subpacote real `libs/checkpoint/langgraph/store/`; passado em `.compile(store=...)` | https://github.com/langchain-ai/langgraph/tree/95af6a00718588e7b7ce17310e8006d267896a77/libs/checkpoint/langgraph/store |
| Config de deploy | `langgraph.json` (manifesto: grafos, deps, env) | snippet §1b |
| Config de runtime do agente | `context.py` — dataclass `Context` com defaults + metadata de descrição + fallback a env vars | snippet abaixo |
| Segredos | `.env` (apontado por `"env": ".env"` no manifesto) + `.env.example` versionado | §1b/§1c |

Trecho real de `context.py` (config de runtime tipada, com fallback a variáveis de ambiente):

```python
@dataclass(kw_only=True)
class Context:
    system_prompt: str = field(default=prompts.SYSTEM_PROMPT, metadata={...})
    model: Annotated[str, {"__template_metadata__": {"kind": "llm"}}] = field(
        default="anthropic/claude-sonnet-4-5-20250929", ...)
    max_search_results: int = field(default=10, ...)

    def __post_init__(self) -> None:
        for f in fields(self):
            if getattr(self, f.name) == f.default:
                setattr(self, f.name, os.environ.get(f.name.upper(), f.default))
```

Fonte: https://github.com/langchain-ai/react-agent/blob/7d1f9832f56d6d29ad9ae248caf0b263c5460145/src/react_agent/context.py

Nota: os templates atuais usam `context.py`/`Runtime[Context]`; o nome `configuration.py` (classe `Configuration` + `config: RunnableConfig`) é o padrão da geração anterior desses mesmos templates — hoje só aparece em material legado (ver §6).

## 4. Convenções de nomenclatura

Todas verificáveis nas árvores/arquivos citados acima:

- **snake_case** em módulos e pacotes Python: `react_agent/`, `chat_agent_executor.py`, `tool_node.py`, `call_model`, `route_model_output` (§1, §2).
- **Pacotes do monorepo em kebab-case** no diretório e no nome PyPI: `checkpoint-postgres`, `sdk-py`, `langgraph-cli`, `langgraph-prebuilt` (§1a; releases com tags `cli==0.4.30`, `langgraph==1.2.9`).
- **Grafos nomeados no manifesto**: chave lógica → path físico com âncora de símbolo, formato `"nome": "./caminho/arquivo.py:variavel"` — ex.: `"agent": "./src/react_agent/graph.py:graph"` (§1b/§1c). A chave (`agent`) é o ID público do grafo no servidor; a variável exportada chama-se `graph` por convenção.
- **Nome de exibição no compile**: `.compile(name="ReAct Agent")` / `name="New Graph"` (§2).
- **Agentes-workers nomeados em snake_case** ao serem criados: `name="math_expert"`, `name="research_expert"` — esse nome vira alvo de roteamento/handoff (§5).
- **Convenções internas**: prefixo `_` para privado (`_internal/`, `_tool_call_stream.py`); constantes de nó especiais em dunder-string (`"__start__"`, `"__end__"`) (§1a, §2).
- Arquivos padrão de scaffold: `graph.py`, `state.py`, `tools.py`, `prompts.py`, `context.py`, `utils.py` (§1c).

## 5. Hierarquia e delegação

Dois mecanismos documentados, ambos com evidência em https://github.com/langchain-ai/langgraph-supervisor-py (README @ `74c8752`):

**(a) Supervisor com workers** — um agente central roteia; handoff é implementado como **tool call** (`create_handoff_tool`) que devolve `Command(goto=agent_name, graph=Command.PARENT)`. Snippet real:

```python
from langgraph_supervisor import create_supervisor
from langgraph.prebuilt import create_react_agent

math_agent = create_react_agent(model=model, tools=[add, multiply],
                                name="math_expert", ...)
research_agent = create_react_agent(model=model, tools=[web_search],
                                    name="research_expert", ...)

workflow = create_supervisor(
    [research_agent, math_agent],
    model=model,
    prompt=("You are a team supervisor managing a research expert and a math expert. "
            "For current events, use research_agent. "
            "For math problems, use math_agent."))
app = workflow.compile()
```

**(b) Hierarquia multinível (times hierárquicos)** — supervisor de supervisores; cada time é um grafo compilado com `name`, plugado como nó do nível acima. Snippet real do mesmo README:

```python
research_team = create_supervisor([research_agent, math_agent], model=model,
    supervisor_name="research_supervisor").compile(name="research_team")

writing_team = create_supervisor([writing_agent, publishing_agent], model=model,
    supervisor_name="writing_supervisor").compile(name="writing_team")

top_level_supervisor = create_supervisor([research_team, writing_team], model=model,
    supervisor_name="top_level_supervisor").compile(name="top_level_supervisor")
```

Mecânica do handoff custom (trecho real do README — a delegação atualiza o grafo PAI):

```python
return Command(
    goto=agent_name,
    graph=Command.PARENT,
    update={"messages": messages + [tool_message], "active_agent": agent_name, ...},
)
```

**Direção oficial atual (importante para o KoldenOS):** o próprio README abre com a nota — *"We now recommend using the supervisor pattern directly via tools rather than this library for most use cases"* — apontando para o guia multi-agente e o tutorial de supervisor em https://docs.langchain.com/oss/python/langchain/multi-agent e https://docs.langchain.com/oss/python/langchain/supervisor. Ou seja: delegação = tool calling; a lib `langgraph-supervisor` está em modo compatibilidade com LangChain 1.0. Existe ainda o padrão swarm (handoff par-a-par, sem chefe central) em https://github.com/langchain-ai/langgraph-swarm-py.

## 6. Observações datadas

- **2026-07-10** — release `langgraph==1.2.9` publicado hoje (fix de `updateState` p/ delta channel): https://github.com/langchain-ai/langgraph/releases/tag/1.2.9 — projeto ativíssimo (1.2.8 em 2026-07-06, 1.2.7 em 2026-06-30, 1.2.6 em 2026-06-18).
- **2026-06-16** — `langgraph-cli==0.4.30`: https://github.com/langchain-ai/langgraph/releases/tag/cli%3D%3D0.4.30 (é o CLI que consome o `langgraph.json`).
- **Linha 1.x é o presente**: releases 1.2.x desde jun/2026; API atual usa `Runtime[Context]`/`context_schema` (visível nos templates §2). **Material legado a marcar**: tutoriais e exemplos da era 0.x que usam `config: RunnableConfig` + `config["configurable"]` e `configuration.py` — padrão anterior dos mesmos templates oficiais, ainda abundante em blogs/tutoriais antigos; o código-fonte atual dos templates já migrou (§3).
- **2025-11-19** — último release da lib de supervisor (`langgraph-supervisor==0.0.31`, compat LangChain 1.0): https://github.com/langchain-ai/langgraph-supervisor-py/releases/tag/langgraph-supervisor%3D%3D0.0.31 — mantida, mas o README (§5) redireciona para o padrão manual via tools; tratar exemplos baseados só nessa lib como padrão em transição.
- **Docs migraram**: o README do supervisor aponta guias novos em `docs.langchain.com/oss/python/langchain/...`; URLs `langchain-ai.github.io/langgraph/...` seguem no ar para conceitos (multi_agent, memory, human_in_the_loop) mas são a geração anterior da documentação — checar sempre a data.
- O monorepo traz `AGENTS.md` e `CLAUDE.md` na raiz (instruções para agentes de código trabalharem no repo) — sinal de manutenção 2025+.

## 7. Fontes

1. Monorepo LangGraph (raiz, commit fixado): https://github.com/langchain-ai/langgraph/tree/95af6a00718588e7b7ce17310e8006d267896a77
2. `libs/` do monorepo: https://github.com/langchain-ai/langgraph/tree/95af6a00718588e7b7ce17310e8006d267896a77/libs
3. Núcleo `libs/langgraph/langgraph/`: https://github.com/langchain-ai/langgraph/tree/95af6a00718588e7b7ce17310e8006d267896a77/libs/langgraph/langgraph
4. Prebuilt (`create_react_agent`, `ToolNode`): https://github.com/langchain-ai/langgraph/tree/95af6a00718588e7b7ce17310e8006d267896a77/libs/prebuilt/langgraph/prebuilt
5. Base de memória (`checkpoint` + `store`): https://github.com/langchain-ai/langgraph/tree/95af6a00718588e7b7ce17310e8006d267896a77/libs/checkpoint/langgraph
6. Template mínimo: https://github.com/langchain-ai/new-langgraph-project/tree/921235cc33b57a314516f2d103657cda2143b69d — manifesto: https://github.com/langchain-ai/new-langgraph-project/blob/921235cc33b57a314516f2d103657cda2143b69d/langgraph.json — grafo: .../src/agent/graph.py
7. Template ReAct: https://github.com/langchain-ai/react-agent/tree/7d1f9832f56d6d29ad9ae248caf0b263c5460145 — `graph.py`, `context.py`, `tools.py` em `src/react_agent/`
8. Supervisor (README + snippets de hierarquia): https://github.com/langchain-ai/langgraph-supervisor-py/blob/74c8752739ae2fe0fdc3bc39408ebfb161e2a428/README.md
9. Releases: https://github.com/langchain-ai/langgraph/releases (1.2.9 em 2026-07-10) · https://github.com/langchain-ai/langgraph-supervisor-py/releases (0.0.31 em 2025-11-19)
10. Guias oficiais atuais de multi-agente/supervisor: https://docs.langchain.com/oss/python/langchain/multi-agent · https://docs.langchain.com/oss/python/langchain/supervisor · Swarm: https://github.com/langchain-ai/langgraph-swarm-py
