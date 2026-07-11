---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com registro em log
- Interação mínima com o usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pre-Flight - Planejamento Abrangente Antecipado
- Fase de análise da task (identificar todas as ambiguidades)
- Execução sem ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: validateWorkflow()
responsavel: Orion (Commander)
responsavel_type: Agente
atomic_layer: Config

**Entrada:**
- campo: workflow_path
  tipo: string
  origem: User Input
  obrigatório: false
  validação: Path to specific workflow YAML file

- campo: workflow_name
  tipo: string
  origem: User Input
  obrigatório: false
  validação: Resolves to workflow file by name

- campo: target_context
  tipo: string
  origem: User Input
  obrigatório: false
  validação: Must be "core", "squad", or "hybrid". Default: "core"

- campo: squad_name
  tipo: string
  origem: User Input
  obrigatório: false (required when target_context="squad" or "hybrid")
  validação: Must be kebab-case, squad must exist in squads/

- campo: strict
  tipo: boolean
  origem: User Input
  obrigatório: false
  validação: Default: false. When true, warnings become errors

- campo: all
  tipo: boolean
  origem: User Input
  obrigatório: false
  validação: Default: false. When true, validate all workflows in context

**Saída:**
- campo: validation_result
  tipo: object
  destino: Memory
  persistido: false

- campo: report
  tipo: string
  destino: Output
  persistido: false

- campo: exit_code
  tipo: number
  destino: Return value
  persistido: false
  validação: 0=valid, 1=invalid
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] At least one of workflow_path, workflow_name, or all flag must be provided
    tipo: pre-condition
    blocker: true
    validação: |
      Check that workflow_path OR workflow_name OR all=true is provided
    error_message: "Pre-condition failed: Must specify workflow_path, workflow_name, or --all flag"
  - [ ] When target_context="squad", squad directory must exist
    tipo: pre-condition
    blocker: true
    validação: |
      If target_context is "squad", verify squads/{squad_name}/ exists
    error_message: "Pre-condition failed: Squad '{squad_name}' not found in squads/"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução DEPOIS que a task é concluída

**Checklist:**

```yaml
post-conditions:
  - [ ] Validation report generated and displayed
    tipo: post-condition
    blocker: true
    validação: |
      Verify validation report was generated with errors/warnings/result
    error_message: "Post-condition failed: Validation report not generated"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de aprovação/reprovação para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] All specified workflow files validated; report displayed; exit code returned
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Assert each workflow file was validated and results consolidated
    error_message: "Acceptance criterion not met: Validation incomplete"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** workflow-validator
  - **Propósito:** Validar os arquivos YAML de workflow
  - **Origem:** .aiox-core/development/scripts/workflow-validator.js

- **Ferramenta:** file-system
  - **Propósito:** Descoberta e leitura de arquivos
  - **Origem:** Node.js fs module

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** workflow-validator.js
  - **Propósito:** Classe WorkflowValidator com sub-validadores
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/development/scripts/workflow-validator.js

---

## Tratamento de Erros

**Estratégia:** continue (validar todos os arquivos mesmo que alguns falhem)

**Erros Comuns:**

1. **Erro:** Arquivo de Workflow Não Encontrado
   - **Causa:** O caminho ou nome de workflow especificado não resolve para um arquivo
   - **Resolução:** Verificar o caminho/nome e o contexto de destino
   - **Recuperação:** Listar os workflows disponíveis e sugerir o nome correto

2. **Erro:** Erro de Parse de YAML
   - **Causa:** Sintaxe YAML inválida no arquivo de workflow
   - **Resolução:** Corrigir os problemas de sintaxe YAML
   - **Recuperação:** Mostrar a linha/coluna do erro de sintaxe

3. **Erro:** Campos Obrigatórios Ausentes
   - **Causa:** O workflow está sem workflow.id, workflow.name ou o array de execução
   - **Resolução:** Adicionar `workflow.sequence` (oficial). `workflow.phases` é aceito apenas para compatibilidade.
   - **Recuperação:** Mostrar quais campos estão ausentes com exemplos

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 1-5 min (estimated)
cost_estimated: $0.001-0.005
token_usage: ~500-1,500 tokens
```

**Notas de Otimização:**
- Validar arquivos em paralelo quando --all é usado
- Cachear as verificações de existência dos arquivos de agente entre as validações

---

## Metadata

```yaml
story: N/A
version: 1.0.0
dependencies:
  - workflow-validator.js
tags:
  - validation
  - workflow
  - quality
updated_at: 2026-01-31
```

---

# Task Validar Workflow

## Propósito

Validar os arquivos YAML de workflow contra as convenções do AIOX, verificando estrutura, referências de agentes, fluxo de artefatos e consistência lógica. Suporta a validação de um único workflow ou de todos os workflows de um dado contexto (core ou squad).

## Pré-requisitos

- Classe WorkflowValidator disponível em `.aiox-core/development/scripts/workflow-validator.js`
- O(s) arquivo(s) de workflow de destino devem existir

## Pontos de Elicitação

As seguintes entradas são coletadas antes da execução:

1. **workflow_path** ou **workflow_name** — Qual(is) workflow(s) validar (um obrigatório, a menos que `--all`)
2. **target_context** — Onde procurar o workflow: `core`, `squad` ou `hybrid` (padrão: `core`)
3. **squad_name** — Obrigatório quando target_context é `squad` ou `hybrid`
4. **strict** — Tratar warnings como erros (padrão: `false`)
5. **all** — Validar todos os workflows no contexto resolvido (padrão: `false`)

## Execução da Task

### 1. Resolver o(s) Caminho(s) de Destino

Com base nas entradas, resolver quais arquivos de workflow validar:

**Único arquivo por caminho:**
- Usar `workflow_path` diretamente

**Único arquivo por nome:**
- Resolver com base no target_context:
  - `core` → `.aiox-core/development/workflows/{workflow_name}.yaml`
  - `squad` → `squads/{squad_name}/workflows/{workflow_name}.yaml`
  - `hybrid` → `squads/{squad_name}/workflows/{workflow_name}.yaml`

**Todos os workflows (flag --all):**
- Varrer o diretório com base no target_context:
  - `core` → todos os arquivos `.yaml` em `.aiox-core/development/workflows/`
  - `squad` → todos os arquivos `.yaml` em `squads/{squad_name}/workflows/`
  - `hybrid` → todos os arquivos `.yaml` em `squads/{squad_name}/workflows/`

### 2. Rodar a Validação

Para cada arquivo de workflow resolvido:
1. Instanciar `WorkflowValidator` com as opções `{ strict, verbose }`
   - Para o contexto `hybrid`: também passar `squadAgentsPath: squads/{squad_name}/agents/`
2. Chamar `validator.validate(workflowPath)`
3. Coletar os resultados

### 3. Consolidar os Resultados

Ao validar múltiplos arquivos:
- Mesclar todos os erros, warnings e sugestões
- Rastrear os resultados por arquivo para relatórios detalhados
- Válido no geral = todos os arquivos válidos

### 4. Exibir o Relatório

Formatar e exibir os resultados usando `validator.formatResult()`:

```text
=== Workflow Validation Report ===

Workflow: greenfield-service.yaml
  Errors: 0
  Warnings: 1
    - [WF_MISSING_HANDOFF]: Workflow has 5 agent transitions but no handoff_prompts
  Result: VALID (with warnings)

Workflow: brownfield-ui.yaml
  Errors: 0
  Warnings: 0
  Result: VALID

--- Summary ---
Files validated: 2
Valid: 2 (1 with warnings)
Invalid: 0
```

### 5. Retornar o Exit Code

- `0` — todos os workflows válidos (warnings permitidos, a menos que --strict)
- `1` — um ou mais workflows inválidos

## Integração

- Chamada pelo comando `*validate-workflow` no aiox-master
- Chamada por `SquadValidator.validateWorkflows()` durante a validação de squad
- Pode ser chamada por `FrameworkAnalyzer.validateWorkflow()` para análise
