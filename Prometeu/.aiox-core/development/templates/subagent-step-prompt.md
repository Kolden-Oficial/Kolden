# Template de Prompt de Passo de Subagente

> **Propósito:** Template reutilizável para construir prompts de subagente no Workflow Runtime Engine.
> Cada variável é substituída em tempo de execução pelo orquestrador (aiox-master) antes de spawnar o subagente via a ferramenta Task.

---

## Template

```
You are {{AGENT_NAME}}, {{AGENT_TITLE}}.

## Your Persona

{{AGENT_YAML}}

## Your Task

{{TASK_CONTENT}}

## Context

Workflow: {{WORKFLOW_NAME}} | Step: {{STEP_ID}} | Phase: {{PHASE_NAME}}
Action: {{ACTION}}

## Input Data

{{INPUT_DATA}}

## Reference Data

{{REFERENCE_DATA}}

## User Input (Elicitation)

{{USER_INPUT}}

## Step Instructions

{{STEP_NOTES}}

## CRITICAL OUTPUT FORMAT

You MUST return your complete output as a YAML block at the END of your response.
This block will be parsed by the orchestrator to extract outputs for subsequent steps.

```yaml
step_output:
  status: completed|failed
  outputs:
    # Include all output fields defined in the workflow step's 'outputs' list
    # Example:
    #   task_completa: "..."
    #   score_9p: 85
    #   gaps: [...]
  score: null
  notes: "Summary of what was done and key decisions made"
  artifacts:
    - name: "artifact-name.md"
      path: "relative/path/to/artifact"
      status: created|updated
```

Execute the task now. Do NOT greet. Do NOT show commands. Do NOT ask questions (all inputs are provided above). Focus entirely on task execution and produce the output YAML block at the end.
```

---

## Referência de Variáveis

| Variável | Origem | Descrição |
|----------|--------|-------------|
| `{{AGENT_NAME}}` | Arquivo do agente → `agent.name` | Nome de exibição do agente (ex.: "Orion", "Pedro") |
| `{{AGENT_TITLE}}` | Arquivo do agente → `agent.title` | Título do papel do agente |
| `{{AGENT_YAML}}` | Arquivo do agente → bloco YAML completo | Definição completa da persona do agente |
| `{{TASK_CONTENT}}` | Arquivo da task via campo `uses` | Conteúdo completo do arquivo da task |
| `{{WORKFLOW_NAME}}` | Workflow YAML → `workflow.name` | Nome do workflow em execução |
| `{{STEP_ID}}` | Item da sequência → `id` | Identificador único do passo |
| `{{PHASE_NAME}}` | Marcador da fase atual → `name` | Nome da fase atual |
| `{{ACTION}}` | Item da sequência → `action` | Descrição da ação para este passo |
| `{{INPUT_DATA}}` | Estado → saídas do passo anterior | YAML das saídas dos passos listados em `requires` |
| `{{REFERENCE_DATA}}` | Deps do agente + recursos do workflow | Conteúdo de arquivos de dados (ex.: mandamentos.yaml) |
| `{{USER_INPUT}}` | Respostas da elicitação | Bloco YAML de respostas do usuário (se `elicit: true`) |
| `{{STEP_NOTES}}` | Item da sequência → `notes` | Instruções detalhadas do passo do workflow |

---

## Regras de Resolução

### Resolução de Caminho por Contexto

| Contexto | Caminho do Agente | Caminho da Task | Caminho dos Dados |
|---------|-----------|-----------|-----------|
| `core` | `.aiox-core/development/agents/{agent}.md` | `.aiox-core/development/tasks/{uses}.md` | `.aiox-core/data/{file}` |
| `squad` | `squads/{squad}/agents/{agent}.md` | `squads/{squad}/tasks/{uses}.md` | `squads/{squad}/data/{file}` |
| `hybrid` | squad primeiro, core como fallback | squad primeiro, core como fallback | squad primeiro, core como fallback |

### Ordem de Resolução Híbrida

1. Verifique `squads/{squad}/agents/{agent}.md` primeiro
2. Se não encontrado, verifique `.aiox-core/development/agents/{agent}.md`
3. Se o agente tiver prefixo explícito (`core:architect` ou `squad:validator`), use-o diretamente

### Extração do YAML do Agente

A variável `{{AGENT_YAML}}` deve conter o bloco YAML completo do arquivo do agente, começando no marcador de abertura ` ```yaml ` e terminando no marcador de fechamento ` ``` `. Isso inclui todas as seções: identidade do agente, persona, comandos, dependências.

### Extração do Conteúdo da Task

A variável `{{TASK_CONTENT}}` deve conter o conteúdo completo do arquivo da task, da Definição da Task até as seções de Execução da Task. Remova o frontmatter YAML se presente, mas mantenha todas as instruções executáveis.

---

## Notas

- Este template é referenciado pela task `run-workflow-engine.md`
- O orquestrador (aiox-master) constrói o prompt lendo arquivos e substituindo variáveis
- Os subagentes recebem o prompt completo e executam autonomamente
- O orquestrador faz o parsing do bloco YAML `step_output` da resposta do subagente
- Se o subagente falhar em produzir um bloco YAML válido, o orquestrador tenta novamente ou solicita intervenção manual
