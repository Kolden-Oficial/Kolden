---
tipo: nota
area: arquitetura
up: "[[arquitetura/_MOC-arquitetura]]"
relacionado:
  - "[[arquitetura/pesquisa/2026-07-10-benchmark/fichas/_indice|_indice]]"
---

# Ficha — CrewAI

> Coletada em 2026-07-10 · Versão/commit da fonte: release **1.15.2** (2026-07-08) · commit `a8b3ecb723de24bc665b5391b756fb7cf0878763` (branch `main`) · Status: ativo

## 1. Estrutura de pastas real

### 1.1 Raiz do repositório `crewAIInc/crewAI` (commit `a8b3ecb`)

O repo virou **monorepo** com workspace `lib/` (o layout antigo `src/crewai/` na raiz foi aposentado — ver §6):

```
crewAI/
├── .github/
├── AGENTS.md
├── README.md
├── conftest.py
├── pyproject.toml
├── uv.lock
├── docs/
├── scripts/
└── lib/
    ├── cli/            # pacote crewai_cli (CLI + scaffolds)
    ├── crewai/         # pacote principal crewai
    ├── crewai-core/
    ├── crewai-files/
    ├── crewai-tools/
    └── devtools/
```

Fonte: https://github.com/crewAIInc/crewAI/tree/a8b3ecb723de24bc665b5391b756fb7cf0878763 e https://github.com/crewAIInc/crewAI/tree/a8b3ecb723de24bc665b5391b756fb7cf0878763/lib

### 1.2 Pacote principal `lib/crewai/src/crewai/` — um diretório por conceito

```
lib/crewai/src/crewai/
├── __init__.py
├── a2a/            # agent-to-agent
├── agent/          # classe Agent
├── agents/         # executores/builders de agente
├── auth/
├── cli/            # shim (o CLI real vive em lib/cli)
├── core/
├── crew.py         # classe Crew (orquestração) — 90 KB
├── crews/
├── events/
├── experimental/
├── flow/           # Flows (orquestração acima de crews)
├── hooks/
├── knowledge/      # camada de knowledge (RAG de fontes do usuário)
├── lite_agent.py
├── llm.py / llms/
├── mcp/
├── memory/         # memória (unified_memory.py, storage/, memory_scope.py)
├── process.py      # enum Process (sequential | hierarchical)
├── project/        # decorators @CrewBase, @agent, @task, @crew
├── rag/
├── security/
├── skills/         # skills (novidade da era 1.x)
├── state/
├── task.py / tasks/
├── telemetry/
├── tools/          # BaseTool etc.
├── translations/
├── types/
└── utilities/
```

Fonte: https://github.com/crewAIInc/crewAI/tree/a8b3ecb723de24bc665b5391b756fb7cf0878763/lib/crewai/src/crewai

### 1.3 O scaffold oficial `crewai create crew <nome>` (ponto central)

Template-fonte em `lib/cli/src/crewai_cli/templates/crew/`:

```
templates/crew/
├── .gitignore
├── README.md
├── __init__.py
├── config/
│   ├── agents.yaml     # agents DECLARATIVOS
│   └── tasks.yaml      # tasks DECLARATIVAS
├── crew.py             # wiring @CrewBase
├── knowledge/
│   └── user_preference.txt
├── main.py             # entrypoints run/train/replay/test
├── pyproject.toml
├── skills/             # (.gitkeep — novo na era 1.x)
└── tools/
    ├── __init__.py
    └── custom_tool.py
```

Fonte: https://github.com/crewAIInc/crewAI/tree/a8b3ecb723de24bc665b5391b756fb7cf0878763/lib/cli/src/crewai_cli/templates/crew

O gerador `create_crew.py` monta o projeto do usuário assim (código real de `create_folder_structure` + `copy_template_files`):

```python
folder_path.mkdir(parents=True)
(folder_path / "tests").mkdir(exist_ok=True)
(folder_path / "knowledge").mkdir(exist_ok=True)
if not parent_folder:
    (folder_path / "src" / folder_name).mkdir(parents=True)
    (folder_path / "src" / folder_name / "tools").mkdir(parents=True)
    (folder_path / "src" / folder_name / "config").mkdir(parents=True)
    ...
    shutil.copy2(agents_md_src, folder_path / "AGENTS.md")
```

```python
root_template_files = [".gitignore", "pyproject.toml", "README.md", "knowledge/user_preference.txt"]
tools_template_files = ["tools/custom_tool.py", "tools/__init__.py"]
config_template_files = ["config/agents.yaml", "config/tasks.yaml"]
src_template_files = ["__init__.py", "main.py", "crew.py"]
```

Ou seja, o projeto gerado é:

```
<projeto>/
├── .gitignore
├── AGENTS.md
├── README.md
├── pyproject.toml            # com [tool.crewai] type = "crew"
├── knowledge/
│   └── user_preference.txt
├── tests/
└── src/<projeto>/
    ├── __init__.py
    ├── main.py
    ├── crew.py
    ├── config/
    │   ├── agents.yaml
    │   └── tasks.yaml
    └── tools/
        ├── __init__.py
        └── custom_tool.py
```

Fonte: https://github.com/crewAIInc/crewAI/blob/a8b3ecb723de24bc665b5391b756fb7cf0878763/lib/cli/src/crewai_cli/create_crew.py

Detalhe (corrigido em verificação adversarial 2026-07-10): crews aninhados dentro de um projeto maior (`parent_folder`, usado por flows) recebem **apenas `crew.py`** (+ dirs vazios `tests/` e `knowledge/`) — em `create_crew.py`, `src_template_files = ["crew.py"]` quando há `parent_folder`, e a cópia de `config/` + `tools/` só roda `if not parent_folder`. Nos templates de flow, os crews aninhados já vêm prontos com `config/` — mas não é o `create_crew` que os gera assim.

## 2. Formato de definição de agent

**Dupla camada: YAML declarativo (identidade) + decorator Python (wiring).**

### 2.1 `config/agents.yaml` — real, do template oficial

```yaml
researcher:
  role: >
    {topic} Senior Data Researcher
  goal: >
    Uncover cutting-edge developments in {topic}
  backstory: >
    You're a seasoned researcher with a knack for uncovering the latest
    developments in {topic}. Known for your ability to find the most relevant
    information and present it in a clear and concise manner.

reporting_analyst:
  role: >
    {topic} Reporting Analyst
  goal: >
    Create detailed reports based on {topic} data analysis and research findings
  backstory: >
    You're a meticulous analyst with a keen eye for detail. ...
```

Tripé canônico do agent: **`role` / `goal` / `backstory`**, com interpolação `{topic}` resolvida no `kickoff(inputs=...)`.
Fonte: https://github.com/crewAIInc/crewAI/blob/a8b3ecb723de24bc665b5391b756fb7cf0878763/lib/cli/src/crewai_cli/templates/crew/config/agents.yaml

### 2.2 `config/tasks.yaml` — real, do template oficial

```yaml
research_task:
  description: >
    Conduct a thorough research about {topic} ...
  expected_output: >
    A list with 10 bullet points of the most relevant information about {topic}
  agent: researcher

reporting_task:
  description: >
    Review the context you got and expand each topic into a full section...
  expected_output: >
    A fully fledged report with the main topics...
  agent: reporting_analyst
```

Task referencia agent **por nome (chave YAML)** — `agent: researcher`.
Fonte: https://github.com/crewAIInc/crewAI/blob/a8b3ecb723de24bc665b5391b756fb7cf0878763/lib/cli/src/crewai_cli/templates/crew/config/tasks.yaml

### 2.3 `crew.py` — decorators `@CrewBase`/`@agent`/`@task`/`@crew` (template real)

```python
from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from crewai.agents.agent_builder.base_agent import BaseAgent


@CrewBase
class {{crew_name}}():
    """{{crew_name}} crew"""

    agents: list[BaseAgent]
    tasks: list[Task]

    @agent
    def researcher(self) -> Agent:
        return Agent(
            config=self.agents_config['researcher'],
            verbose=True
        )

    @task
    def research_task(self) -> Task:
        return Task(
            config=self.tasks_config['research_task'],
        )

    @crew
    def crew(self) -> Crew:
        return Crew(
            agents=self.agents,
            tasks=self.tasks,
            process=Process.sequential,
            verbose=True,
        )
```

O nome do método `@agent` deve casar com a chave do YAML (`self.agents_config['researcher']`).
Fonte: https://github.com/crewAIInc/crewAI/blob/a8b3ecb723de24bc665b5391b756fb7cf0878763/lib/cli/src/crewai_cli/templates/crew/crew.py

Também existe definição 100% programática (docs oficiais, v1.15.2):

```python
agent = Agent(
    role="Researcher",
    goal="Find authoritative sources on {topic}",
    backstory="You are a careful, source-driven researcher.",
    llm="gpt-4o-mini",
    verbose=True,
    max_iter=15,
    allow_delegation=False,
)
```

Fonte: https://docs.crewai.com/v1.15.2/en/guides/migration/upgrading-crewai

## 3. Separação agent / tool-skill / orquestração / memória / config

| Conceito | Onde vive (projeto do usuário) | Onde vive (framework) | Evidência |
|---|---|---|---|
| **Agent** (identidade) | `src/<proj>/config/agents.yaml` | `lib/crewai/src/crewai/agent/` + `agents/` | §1.2, §2.1 |
| **Task** (trabalho) | `src/<proj>/config/tasks.yaml` | `task.py` + `tasks/` | §2.2 |
| **Tool** | `src/<proj>/tools/custom_tool.py` | `tools/` (classe `BaseTool`) | snippet abaixo |
| **Skill** | `skills/` (dir do template crew/flow) | `skills/` no pacote | §1.2, §1.3; release 1.15.2: "Support inline skill definitions" |
| **Orquestração** | `src/<proj>/crew.py` (Crew + `Process`); `main.py` (kickoff); Flows p/ nível acima | `crew.py`, `process.py`, `flow/` | §2.3, §5 |
| **Memória** | ativada por parâmetro `memory=True` do Crew (não é pasta do usuário) | `memory/` (`unified_memory.py`, `storage/`, `memory_scope.py`) | §1.2; docs upgrading-crewai |
| **Knowledge** | `knowledge/` na **raiz do projeto** (ex.: `user_preference.txt`) | `knowledge/` no pacote | §1.3 |
| **Config de execução** | `pyproject.toml` (`[tool.crewai] type = "crew"`) + `.env` gerado pelo wizard de provider | `settings.py` | pyproject do template; `create_crew.py` (`write_env_file`) |

Tool real do template (`tools/custom_tool.py`):

```python
from crewai.tools import BaseTool
from pydantic import BaseModel, Field

class MyCustomToolInput(BaseModel):
    argument: str = Field(..., description="Description of the argument.")

class MyCustomTool(BaseTool):
    name: str = "Name of my tool"
    description: str = ("Clear description for what this tool is useful for, ...")
    args_schema: Type[BaseModel] = MyCustomToolInput

    def _run(self, argument: str) -> str:
        ...
```

Fonte: https://github.com/crewAIInc/crewAI/blob/a8b3ecb723de24bc665b5391b756fb7cf0878763/lib/cli/src/crewai_cli/templates/crew/tools/custom_tool.py

Resumo do padrão: **identidade e trabalho são declarativos (YAML em `config/`), comportamento é código (crew.py/tools/), conhecimento é dados (`knowledge/`), memória é infraestrutura do framework** — não arquivo do usuário.

## 4. Convenções de nomenclatura

Todas com evidência em `create_crew.py` e nos templates:

- **Pacote/pasta do projeto: `snake_case`** forçado por código: `folder_name = name.replace(" ", "_").replace("-", "_").lower()` + `re.sub(r"[^a-zA-Z0-9_]", "", ...)`, com validação de identifier Python e rejeição de keywords.
- **Classe do crew: `PascalCase`** derivada: `class_name = name.replace("_"," ").replace("-"," ").title().replace(" ","")`.
- **Agents em YAML: chaves `snake_case`** (`researcher`, `reporting_analyst`); método `@agent` tem o mesmo nome da chave.
- **Tasks em YAML: chaves `snake_case` com sufixo `_task`** (`research_task`, `reporting_task`).
- **Arquivos de config com nomes fixos**: `config/agents.yaml` e `config/tasks.yaml` (plural, YAML).
- **Scripts padronizados** no `pyproject.toml` gerado: `run_crew`, `train`, `replay`, `test`, `run_with_trigger` → mapeiam para funções homônimas em `main.py`.
- **Marcador de tipo de projeto**: `[tool.crewai] type = "crew"` (ou `"flow"`), lido pelo CLI para decidir como rodar.

Fontes: https://github.com/crewAIInc/crewAI/blob/a8b3ecb723de24bc665b5391b756fb7cf0878763/lib/cli/src/crewai_cli/create_crew.py e https://github.com/crewAIInc/crewAI/blob/a8b3ecb723de24bc665b5391b756fb7cf0878763/lib/cli/src/crewai_cli/templates/crew/pyproject.toml

## 5. Hierarquia e delegação

### 5.1 Processo hierárquico — enum real do framework

```python
class Process(str, Enum):
    sequential = "sequential"
    hierarchical = "hierarchical"
    # TODO: consensual = 'consensual'
```

Fonte: https://github.com/crewAIInc/crewAI/blob/a8b3ecb723de24bc665b5391b756fb7cf0878763/lib/crewai/src/crewai/process.py

### 5.2 `manager_llm` / `manager_agent` — docs oficiais v1.15.2

> "For `Crew` parameters, `Process.hierarchical` requires either `manager_llm` or `manager_agent`."

```python
from crewai import Crew, Process

crew = Crew(
    agents=[...],
    tasks=[...],
    process=Process.sequential,   # or Process.hierarchical
    memory=True,
    cache=True,
    embedder={"provider": "openai", "config": {"model": "text-embedding-3-large"}},
)
```

Fonte: https://docs.crewai.com/v1.15.2/en/guides/migration/upgrading-crewai

Guia first-crew: hierarquia habilitável de forma declarativa — `"process": "hierarchical"` com `manager_llm` ou `manager_agent`.
Fonte: https://docs.crewai.com/v1.15.2/en/guides/crews/first-crew

### 5.3 `allow_delegation` — flag por agent

`allow_delegation=False` aparece como parâmetro do `Agent` no snippet oficial (§2.3 acima). Delegação inter-agentes existe desde a v0.1.0: "Agents can also perform inter-agent delegation for dynamic workload distribution" (changelog oficial).
Fontes: https://docs.crewai.com/v1.15.2/en/guides/migration/upgrading-crewai e https://docs.crewai.com/v1.15.2/en/changelog

### 5.4 Flows — orquestração ACIMA de crews (confirmado)

Docs de introdução: "a Flow initiates a process, manages state, and delegates complex tasks to a Crew. The Crew's agents collaborate to complete the task and return the result to the Flow."
Fonte: https://docs.crewai.com/v1.15.2/en/introduction

Template real `crewai create flow` (`templates/flow/main.py`) — Flow com estado Pydantic e decorators `@start`/`@listen`, chamando um crew inteiro como passo:

```python
from crewai.flow import Flow, listen, start
from {{folder_name}}.crews.content_crew.content_crew import ContentCrew

class ContentState(BaseModel):
    topic: str = ""
    ...

class ContentFlow(Flow[ContentState]):
    @start()
    def plan_content(self, crewai_trigger_payload: dict = None): ...

    @listen(plan_content)
    def generate_content(self):
        result = ContentCrew().crew().kickoff(inputs={"topic": self.state.topic})
        self.state.final_post = result.raw
```

Estrutura do template flow: `crews/` (crews aninhados, cada um com seu `config/`), `tools/`, `skills/`, `main.py`, `pyproject.toml`.
Fonte: https://github.com/crewAIInc/crewAI/blob/a8b3ecb723de24bc665b5391b756fb7cf0878763/lib/cli/src/crewai_cli/templates/flow/main.py e https://github.com/crewAIInc/crewAI/tree/a8b3ecb723de24bc665b5391b756fb7cf0878763/lib/cli/src/crewai_cli/templates/flow

Hierarquia composta do CrewAI, portanto: **Flow (estado + eventos) → Crew (processo sequential/hierarchical, manager) → Agent (role/goal/backstory, allow_delegation) → Task/Tool**.

## 6. Observações datadas

- **2026-07-08** — release **1.15.2** (última estável na coleta). Ativíssimo: features de Flows declarativos, skills inline, wizard de LLM. Fonte: https://github.com/crewAIInc/crewAI/releases/tag/1.15.2
- **Era 1.x** — o repo foi **reestruturado em monorepo `lib/`**: o CLI saiu de `src/crewai/cli/` para o pacote separado `lib/cli/src/crewai_cli/`. O path clássico **`src/crewai/cli/templates/crew/` é LEGADO**: confirmado existindo na tag `0.201.1` com `agents.yaml` byte-idêntico ao atual (mesmo SHA de blob `72ed6939`). Ou seja: o path mudou, **o formato do scaffold não** — estável entre 0.x e 1.15.x. Fonte (legado): https://github.com/crewAIInc/crewAI/blob/0.201.1/src/crewai/cli/templates/crew/config/agents.yaml
- **Novidades 1.x nos templates**: dir `skills/` no scaffold de crew e flow; `AGENTS.md` (31 KB de instruções para agentes de código) copiado para a raiz de todo projeto gerado; template `declarative_flow` e `json_crew` (crews definidos em JSONC — o guia first-crew v1.15.2 já descreve `agents/<name>.jsonc` + `crew.jsonc`). Fontes: §1.3 e https://docs.crewai.com/v1.15.2/en/guides/crews/first-crew
- **Deprecações/lastro**: `Process.consensual` segue como TODO desde sempre (`process.py`); docs de migração v1.15.2 alertam mudanças de default em `max_iter` e exigência de `embedder` para memória custom. Fonte: https://docs.crewai.com/v1.15.2/en/guides/migration/upgrading-crewai
- Python suportado no scaffold: `>=3.10,<3.14`; build `hatchling`; deps geridas com `uv` (uv.lock na raiz do repo).

## 7. Fontes

1. Repo raiz (commit fixado): https://github.com/crewAIInc/crewAI/tree/a8b3ecb723de24bc665b5391b756fb7cf0878763
2. Workspace `lib/`: https://github.com/crewAIInc/crewAI/tree/a8b3ecb723de24bc665b5391b756fb7cf0878763/lib
3. Pacote core: https://github.com/crewAIInc/crewAI/tree/a8b3ecb723de24bc665b5391b756fb7cf0878763/lib/crewai/src/crewai
4. Templates do CLI: https://github.com/crewAIInc/crewAI/tree/a8b3ecb723de24bc665b5391b756fb7cf0878763/lib/cli/src/crewai_cli/templates
5. Scaffold crew — agents.yaml: https://github.com/crewAIInc/crewAI/blob/a8b3ecb723de24bc665b5391b756fb7cf0878763/lib/cli/src/crewai_cli/templates/crew/config/agents.yaml
6. Scaffold crew — tasks.yaml: https://github.com/crewAIInc/crewAI/blob/a8b3ecb723de24bc665b5391b756fb7cf0878763/lib/cli/src/crewai_cli/templates/crew/config/tasks.yaml
7. Scaffold crew — crew.py: https://github.com/crewAIInc/crewAI/blob/a8b3ecb723de24bc665b5391b756fb7cf0878763/lib/cli/src/crewai_cli/templates/crew/crew.py
8. Scaffold crew — main.py: https://github.com/crewAIInc/crewAI/blob/a8b3ecb723de24bc665b5391b756fb7cf0878763/lib/cli/src/crewai_cli/templates/crew/main.py
9. Scaffold crew — pyproject.toml: https://github.com/crewAIInc/crewAI/blob/a8b3ecb723de24bc665b5391b756fb7cf0878763/lib/cli/src/crewai_cli/templates/crew/pyproject.toml
10. Scaffold crew — custom_tool.py: https://github.com/crewAIInc/crewAI/blob/a8b3ecb723de24bc665b5391b756fb7cf0878763/lib/cli/src/crewai_cli/templates/crew/tools/custom_tool.py
11. Gerador do scaffold: https://github.com/crewAIInc/crewAI/blob/a8b3ecb723de24bc665b5391b756fb7cf0878763/lib/cli/src/crewai_cli/create_crew.py
12. Enum Process: https://github.com/crewAIInc/crewAI/blob/a8b3ecb723de24bc665b5391b756fb7cf0878763/lib/crewai/src/crewai/process.py
13. Template flow: https://github.com/crewAIInc/crewAI/blob/a8b3ecb723de24bc665b5391b756fb7cf0878763/lib/cli/src/crewai_cli/templates/flow/main.py
14. Release 1.15.2: https://github.com/crewAIInc/crewAI/releases/tag/1.15.2
15. Docs — migração/params (manager_llm, manager_agent, allow_delegation): https://docs.crewai.com/v1.15.2/en/guides/migration/upgrading-crewai
16. Docs — introdução (Flow → Crew): https://docs.crewai.com/v1.15.2/en/introduction
17. Docs — first-crew (hierarchical declarativo, JSONC): https://docs.crewai.com/v1.15.2/en/guides/crews/first-crew
18. Path legado confirmado (tag 0.201.1): https://github.com/crewAIInc/crewAI/blob/0.201.1/src/crewai/cli/templates/crew/config/agents.yaml
