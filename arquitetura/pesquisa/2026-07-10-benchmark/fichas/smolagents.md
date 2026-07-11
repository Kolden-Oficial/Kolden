# Ficha — smolagents (Hugging Face)

> Coletada em 2026-07-10 · Versão/commit da fonte: `main` @ commit `6cfdf12ee5e77443049177b274b13cf935b0367e` (posterior à release v1.26.0, de 2026-05-29) · Status: ativo

## 1. Estrutura de pastas real

Raiz do repo `huggingface/smolagents` (listagem via API do GitHub no commit acima — <https://github.com/huggingface/smolagents/tree/main>):

```
smolagents/
├── .github/
├── .gitignore
├── .pre-commit-config.yaml
├── AGENTS.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
├── Makefile
├── README.md
├── SECURITY.md
├── docs/
├── e2b.toml
├── examples/
├── pyproject.toml
├── src/
│   └── smolagents/
└── tests/
```

Pacote `src/smolagents/` (<https://github.com/huggingface/smolagents/tree/main/src/smolagents>):

```
src/smolagents/
├── __init__.py
├── _function_type_hints_utils.py
├── agent_types.py            # tipos de dados trocados entre agent e tools (AgentText, AgentImage…)
├── agents.py                 # MultiStepAgent, CodeAgent, ToolCallingAgent (80 KB)
├── cli.py                    # comandos `smolagent` e `webagent`
├── default_tools.py          # tools nativas (busca web, visita de página, python interpreter…)
├── gradio_ui.py              # UI Gradio
├── local_python_executor.py  # executor Python local sandboxado (68 KB)
├── mcp_client.py             # cliente MCP
├── memory.py                 # AgentMemory e steps
├── models.py                 # adapters de LLM (InferenceClientModel, LiteLLMModel, OpenAIModel…) (86 KB)
├── monitoring.py             # logging/telemetria
├── prompts/
│   ├── code_agent.yaml
│   ├── structured_code_agent.yaml
│   └── toolcalling_agent.yaml
├── remote_executors.py       # executores remotos (E2B, Docker, Modal…)
├── serialization.py
├── tool_validation.py
├── tools.py                  # classe Tool, decorator @tool, ToolCollection (60 KB)
├── utils.py
└── vision_web_browser.py
```

`examples/` (<https://github.com/huggingface/smolagents/tree/main/examples>):

```
examples/
├── agent_from_any_llm.py
├── async_agent/
├── gradio_ui.py
├── inspect_multiagent_run.py
├── multi_llm_agent.py
├── multiple_tools.py
├── open_deep_research/
├── plan_customization/
├── rag.py
├── rag_using_chromadb.py
├── sandboxed_execution.py
├── server/
├── smolagents_benchmark/
├── structured_output_tool.py
└── text_to_sql.py
```

Observação estrutural: é um **pacote Python único** (`src/smolagents/`), não um workspace de diretórios de agents. Agents não vivem em pastas — são objetos Python instanciados em código; a projeção em disco só existe quando se chama `agent.save()` / `agent.push_to_hub()` (ver §3).

## 2. Formato de definição de agent

Agent = instância Python de `CodeAgent` ou `ToolCallingAgent` (ambos herdam de `MultiStepAgent` em `src/smolagents/agents.py`). Snippet real de `examples/agent_from_any_llm.py` (<https://github.com/huggingface/smolagents/blob/main/examples/agent_from_any_llm.py>):

```python
from smolagents import CodeAgent, InferenceClientModel, ToolCallingAgent, tool

model = InferenceClientModel(model_id="meta-llama/Llama-3.3-70B-Instruct", provider="nebius")

@tool
def get_weather(location: str, celsius: bool | None = False) -> str:
    """
    Get weather in the next days at given location.
    ...
    Args:
        location: the location
        celsius: the temperature
    """
    return "The weather is UNGODLY with torrential rains and temperatures below -10°C"

agent = ToolCallingAgent(tools=[get_weather], model=model, verbosity_level=2)
agent = CodeAgent(tools=[get_weather], model=model, verbosity_level=2, stream_outputs=True)
```

**Diferencial declarado — o agent escreve código como ação.** Do README (<https://github.com/huggingface/smolagents/blob/main/README.md>):

> "**First-class support for Code Agents**. Our `CodeAgent` writes its actions in code (as opposed to 'agents being used to write code'). To make it secure, we support executing in sandboxed environments via Blaxel, E2B, Modal, or Docker."

> "Our `CodeAgent` works mostly like classical ReAct agents - the exception being that the LLM engine writes its actions as Python code snippets."

> "Writing actions as code snippets is demonstrated to work better than the current industry practice of letting the LLM output a dictionary of the tools it wants to call: uses 30% fewer steps (thus 30% fewer LLM calls) and reaches higher performance on difficult benchmarks."

O `ToolCallingAgent` é a alternativa clássica: "we also provide the standard `ToolCallingAgent` which writes actions as JSON/text blobs" (README, mesma fonte).

**Tool como classe** — contrato declarativo da classe `Tool` (docstring real, `src/smolagents/tools.py` linhas 106-135, <https://github.com/huggingface/smolagents/blob/main/src/smolagents/tools.py>):

```python
class Tool(BaseTool):
    """
    A base class for the functions used by the agent. Subclass this and implement
    the `forward` method as well as the following class attributes:
    - description (str) ...
    - name (str) -- A performative name that will be used for your tool in the prompt
      to the agent. For instance "text-classifier" or "image_generator".
    - inputs (Dict[str, Dict[str, Union[str, type, bool]]]) ...
    - output_type (type) ...
    """
    name: str
    description: str
    inputs: dict[str, dict[str, str | type | bool]]
    output_type: str
    output_schema: dict[str, Any] | None = None
```

### Distribuição de artefatos via Hub

O modelo de distribuição é **serializar o agent/tool como um Space do Hub** (repo Gradio), não como pacote pip. Evidência em `MultiStepAgent.push_to_hub()` (`agents.py` linhas 1185-1200):

```python
repo_url = create_repo(
    repo_id=repo_id, token=token, private=private,
    exist_ok=True, repo_type="space", space_sdk="gradio",
)
...
metadata_update(repo_id, {"tags": ["smolagents", "agent"]}, repo_type="space", ...)
```

Formato salvo em disco — docstring real de `MultiStepAgent.save()` (`agents.py` linhas 892-902):

```
- a `tools` folder containing the logic for each of the tools under `tools/{tool_name}.py`.
- a `managed_agents` folder containing the logic for each of the managed agents.
- an `agent.json` file containing a dictionary representing your agent.
- a `prompt.yaml` file containing the prompt templates used by your agent.
- an `app.py` file providing a UI for your agent when it is exported to a Space with `agent.push_to_hub()`
- a `requirements.txt` containing the names of the modules used by your tool
```

Tool tem o mesmo ciclo: `Tool.push_to_hub()` sobe `tool.py` + `app.py` + `requirements.txt` (`tools.py`, `_prepare_hub_files()`, linhas 474-493: `path_in_repo="tool.py"` etc.), com tags `["smolagents", "tool"]`; `Tool.from_hub(repo_id)` baixa "the tool's tool.py file" (`tools.py` linhas 517, 554-557); `MultiStepAgent.from_hub()` carrega o `agent.json` e reconstrói `managed_agents/` recursivamente (`agents.py` linhas 1065, 1126-1144). Há ainda `Tool.from_space()` — qualquer Space do Hub vira tool (docstring real, `tools.py` linhas 600-633):

```python
image_generator = Tool.from_space(
    space_id="black-forest-labs/FLUX.1-schnell",
    name="image-generator",
    description="Generate an image from a prompt"
)
```

README confirma o propósito: "**Hub integrations**: you can share/pull tools or agents to/from the Hub for instant sharing of the most efficient agents!"

## 3. Separação agent / tool-skill / orquestração / memória / config

| Preocupação | Onde vive | Evidência |
|---|---|---|
| **Agent** | `src/smolagents/agents.py` — `MultiStepAgent` (base), `CodeAgent`, `ToolCallingAgent` | árvore §1; snippets §2 |
| **Tool** | `src/smolagents/tools.py` (classe `Tool`, decorator `@tool`, `ToolCollection` na linha 895) + `src/smolagents/default_tools.py` (tools nativas) + `tool_validation.py` | árvore §1; `class Tool(BaseTool)` em tools.py:106 |
| **Orquestração** | Não há módulo separado: é o parâmetro `managed_agents` do próprio `MultiStepAgent` (`agents.py:303`), que registra sub-agents como se fossem tools — `self.python_executor.send_tools({**self.tools, **self.managed_agents})` (`agents.py:492`) e `tools_and_managed_agents` (`agents.py:1261-1263`) | grep em agents.py, linhas citadas |
| **Memória** | `src/smolagents/memory.py` — `AgentMemory` com `self.steps: list[TaskStep | ActionStep | PlanningStep]` (linha 230) e classes `MemoryStep`, `ActionStep`, `PlanningStep`, `TaskStep`, `SystemPromptStep`, `FinalAnswerStep`, métodos `reset()`/`replay()` | grep em memory.py, linhas 25-258 |
| **Config/prompts** | Prompts de sistema em YAML versionado dentro do pacote: `src/smolagents/prompts/{code_agent,structured_code_agent,toolcalling_agent}.yaml`; a configuração de um agent concreto é serializada em `agent.json` + `prompts.yaml` no `save()` | árvore §1; docstring de `save()` em §2 |
| **Modelo (LLM)** | `src/smolagents/models.py` — adapters trocáveis (`InferenceClientModel`, `LiteLLMModel`, `OpenAIModel`, `TransformersModel`) injetados no agent via `model=` | árvore §1; snippet de `agent_from_any_llm.py` em §2 |
| **Execução** | separada do agent: `local_python_executor.py` (local) e `remote_executors.py` (E2B/Docker/Modal); `e2b.toml` na raiz | árvore §1 |

Resumo: separação é **por módulo Python dentro de um pacote**, não por diretório de artefatos. A única projeção em diretórios é o formato de exportação (`tools/`, `managed_agents/`, `agent.json`, `prompts.yaml`).

## 4. Convenções de nomenclatura

Todas observáveis nas fontes citadas em §1-§3:

- **Módulos**: `snake_case.py` (`default_tools.py`, `local_python_executor.py`, `tool_validation.py`); prefixo `_` para módulo interno (`_function_type_hints_utils.py`).
- **Classes**: `PascalCase` com sufixo semântico — `*Agent` (`CodeAgent`, `ToolCallingAgent`, `MultiStepAgent`), `*Tool` (`VisitWebpageTool`), `*Model` (`InferenceClientModel`), `*Step` (`ActionStep`, `PlanningStep`).
- **Nomes de agents** (atributo `name`, obrigatório para delegação): `snake_case` — `name="search_agent"` (`examples/inspect_multiagent_run.py:24`), `name="web_search_agent"` (docs, §5).
- **Nomes de tools**: a docstring da classe `Tool` admite `"text-classifier"` ou `"image_generator"` (tools.py:114-115); na prática os exemplos usam `snake_case` (`get_weather`, `visit_webpage`). O nome vira nome de arquivo no export: `tools/{tool_name}.py` (agents.py:896).
- **Prompts**: YAML `snake_case` casando com a classe: `code_agent.yaml` ↔ `CodeAgent`, `toolcalling_agent.yaml` ↔ `ToolCallingAgent`.
- **Artefatos de export com nomes fixos**: `agent.json`, `prompts.yaml`, `app.py`, `requirements.txt`, `tool.py`, pastas `tools/` e `managed_agents/` (agents.py:892-948; tools.py:474-493).
- **Tags no Hub**: `["smolagents", "agent"]` e `["smolagents", "tool"]` em repos `repo_type="space"` (agents.py:1196; tools.py:471).

## 5. Hierarquia e delegação

Mecanismo único: **`managed_agents`** — um agent manager recebe outros agents e os invoca como tools. Assinatura real (`agents.py:281,303`): `managed_agents (list, *optional*): Managed agents that the agent can call.`

Regra de registro (`agents.py:369-376`) — `name` e `description` são obrigatórios no sub-agent:

```python
def _setup_managed_agents(self, managed_agents: list | None = None) -> None:
    self.managed_agents = {}
    if managed_agents:
        assert all(agent.name and agent.description for agent in managed_agents), (...)
        self.managed_agents = {agent.name: agent for agent in managed_agents}
```

Snippet real da doc oficial "Orchestrate a multi-agent system" (<https://huggingface.co/docs/smolagents/examples/multiagents>), com a lista de tools nativas de busca omitida aqui por política interna de escrita — conferir na URL:

```python
web_agent = ToolCallingAgent(
    tools=[...],  # tools nativas de busca/navegação — ver URL da fonte
    model=model,
    max_steps=10,
    name="web_search_agent",
    description="Runs web searches for you.",
)

manager_agent = CodeAgent(
    tools=[],
    model=model,
    managed_agents=[web_agent],
    additional_authorized_imports=["time", "numpy", "pandas"],
)
```

A mesma doc explicita: "we gave this agent attributes `name` and `description`, mandatory attributes to make this agent callable by its manager agent" e "You can easily extend this orchestration to more agents: one does the code execution, one the web search, one handles file loadings...".

Exemplo real no repo — `examples/inspect_multiagent_run.py:21-34`: `ToolCallingAgent(..., name="search_agent", description="This is an agent that can do web search.")` passado a `CodeAgent(tools=[], model=model, managed_agents=[search_agent], ...)`.

A hierarquia é **recursiva e serializável**: `save()` percorre `managed_agents` e salva cada um em `managed_agents/{agent_name}/` (agents.py:909-916), e `from_hub`/`from_folder` reconstroem a árvore (agents.py:1136-1144). Não há profundidade fixa nem camadas nomeadas — é composição livre manager→managed.

## 6. Observações datadas

Releases do GitHub (<https://github.com/huggingface/smolagents/releases>), coletadas em 2026-07-10:

| Tag | Data |
|---|---|
| v1.26.0 (mais recente) | 2026-05-29 |
| v1.25.0 | 2026-05-14 |
| v1.24.0 | 2026-01-16 |
| v1.23.0 | 2025-11-17 |
| v1.22.0 | 2025-09-25 |
| v1.21.0–v1.21.3 | 2025-08-07 a 2025-09-01 |
| v1.20.0 | 2025-07-10 |
| v1.16.0–v1.19.0 | 2025-05-16 a 2025-06-24 |

- Projeto **ativo** em 2026: duas releases minor em maio/2026; docs oficiais publicadas na versão v1.26.0.
- Cadência: mensal ao longo de 2025; houve intervalo entre v1.24.0 (jan/2026) e v1.25.0 (mai/2026).
- Nenhum aviso de deprecation do framework encontrado no README ou na raiz do repo no commit coletado; ainda pré-2.0 (série 1.x), portanto API sujeita a mudanças entre minors.
- Sandboxes suportados citados no README atual: Blaxel, E2B, Modal, Docker (o `e2b.toml` na raiz evidencia o suporte E2B).

## 7. Fontes

- Repo raiz: <https://github.com/huggingface/smolagents> (commit `6cfdf12ee5e77443049177b274b13cf935b0367e`)
- Pacote: <https://github.com/huggingface/smolagents/tree/main/src/smolagents>
- Agents (save/push_to_hub/from_hub/managed_agents): <https://github.com/huggingface/smolagents/blob/main/src/smolagents/agents.py>
- Tools (Tool, save, push_to_hub, from_hub, from_space): <https://github.com/huggingface/smolagents/blob/main/src/smolagents/tools.py>
- Memória: <https://github.com/huggingface/smolagents/blob/main/src/smolagents/memory.py>
- Prompts YAML: <https://github.com/huggingface/smolagents/tree/main/src/smolagents/prompts>
- Exemplos: <https://github.com/huggingface/smolagents/blob/main/examples/agent_from_any_llm.py> · <https://github.com/huggingface/smolagents/blob/main/examples/inspect_multiagent_run.py>
- README: <https://github.com/huggingface/smolagents/blob/main/README.md>
- Doc oficial multi-agent: <https://huggingface.co/docs/smolagents/examples/multiagents>
- Releases: <https://github.com/huggingface/smolagents/releases>
