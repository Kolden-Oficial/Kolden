---

## Modos de Execução

**Esta task sempre roda em Modo Engine** — spawn de subagentes reais via Task tool.

Para automação guiada (persona-switching), use `run-workflow.md` diretamente.

tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: runWorkflowEngine()
responsavel: Orion (Commander)
responsavel_type: Agente
atomic_layer: Config

**Entrada:**
- campo: workflow_name
  tipo: string
  origem: Delegado de run-workflow.md
  obrigatório: true
  validação: Deve corresponder a um arquivo YAML de workflow existente

- campo: target_context
  tipo: string
  origem: Delegado de run-workflow.md
  obrigatório: false
  validação: Deve ser "core", "squad" ou "hybrid". Padrão: "core"

- campo: squad_name
  tipo: string
  origem: Delegado de run-workflow.md
  obrigatório: false (obrigatório quando target_context="squad" ou "hybrid")
  validação: Deve ser kebab-case, o squad deve existir em squads/

- campo: action
  tipo: string
  origem: Delegado de run-workflow.md
  obrigatório: false
  validação: Deve ser "start", "continue", "status", "skip" ou "abort". Padrão: "continue"

**Saída:**
- campo: workflow_state
  tipo: object
  destino: Sistema de arquivos (.aiox/{instance-id}-engine-state.yaml)
  persistido: true

- campo: execution_report
  tipo: object
  destino: Output
  persistido: false

- campo: step_outputs
  tipo: map
  destino: Estado em memória (passado entre steps)
  persistido: true (no arquivo de estado)
```

---

## Pré-condições

```yaml
pre-conditions:
  - [ ] workflow_name deve resolver para um arquivo YAML existente
    tipo: pre-condition
    blocker: true
    validação: |
      Verificar que o arquivo de workflow existe no caminho resolvido
    error_message: "Pré-condição falhou: Workflow '{workflow_name}' não encontrado"
  - [ ] Quando target_context="squad" ou "hybrid", o diretório do squad deve existir
    tipo: pre-condition
    blocker: true
    validação: |
      Se target_context for "squad" ou "hybrid", verificar que squads/{squad_name}/ existe
    error_message: "Pré-condição falhou: Squad '{squad_name}' não encontrado"
  - [ ] Para action=continue/status/skip/abort, deve existir um arquivo de estado de engine ativo
    tipo: pre-condition
    blocker: true
    validação: |
      Verificar que .aiox/{instance-id}-engine-state.yaml existe com status=active
    error_message: "Pré-condição falhou: Nenhuma instância de workflow engine ativa encontrada. Use action=start primeiro."
  - [ ] A Task tool deve estar disponível para o spawn de subagentes
    tipo: pre-condition
    blocker: true
    validação: |
      Verificar que a Task tool está acessível na sessão atual do Claude Code
    error_message: "Pré-condição falhou: Task tool indisponível"
```

---

## Pós-condições

```yaml
post-conditions:
  - [ ] Todos os steps não-opcionais concluídos ou workflow abortado com relatório
    tipo: post-condition
    blocker: true
    validação: |
      Verificar que todos os steps obrigatórios têm status: completed no estado
    error_message: "Pós-condição falhou: Nem todos os steps foram concluídos"
  - [ ] Arquivo de estado criado com todas as saídas dos steps
    tipo: post-condition
    blocker: true
    validação: |
      Verificar que .aiox/{instance-id}-engine-state.yaml existe e contém as saídas
    error_message: "Pós-condição falhou: Arquivo de estado não foi escrito"
```

---

## Critérios de Aceite

```yaml
acceptance-criteria:
  - [ ] Cada action step fez spawn de um subagente real via Task tool
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Cada step com um agente foi executado como uma chamada separada da Task tool
    error_message: "Critério de aceite não atendido: Steps não foram spawnados como subagentes reais"
  - [ ] As saídas de steps anteriores foram corretamente passadas aos steps subsequentes
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Verificar a cadeia de requires: cada step recebeu as saídas das quais depende
    error_message: "Critério de aceite não atendido: Cadeia de saídas quebrada"
  - [ ] O roteamento de decisão avaliou corretamente com base nos limiares
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Verificar que as decisões de roteamento correspondem às condições definidas no workflow
    error_message: "Critério de aceite não atendido: Decisões de roteamento incorretas"
```

---

## Ferramentas

- **Tool:** Task tool (nativa do Claude Code)
  - **Purpose:** Fazer spawn de subagentes reais com contexto isolado
  - **Source:** Runtime do Claude Code

- **Tool:** AskUserQuestion (nativa do Claude Code)
  - **Purpose:** Coletar entradas de elicitação antes de fazer spawn dos subagentes
  - **Source:** Runtime do Claude Code

- **Tool:** Read tool (nativa do Claude Code)
  - **Purpose:** Ler arquivos de agente, arquivos de task, arquivos de dados, YAML de workflow
  - **Source:** Runtime do Claude Code

- **Tool:** workflow-state-manager
  - **Purpose:** Criar e gerenciar o estado do workflow
  - **Source:** .aiox-core/development/scripts/workflow-state-manager.js
  - **Lifecycle:** Depreciado para os novos fluxos de ciclo de vida de story/epic; use `.aiox-core/core/orchestration/session-state.js` fora da execução de workflow guiado legado

- **Tool:** workflow-validator
  - **Purpose:** Validar o workflow antes de iniciar
  - **Source:** .aiox-core/development/scripts/workflow-validator.js

---

## Tratamento de Erros

**Strategy:** retry-then-fallback

**Erros Comuns:**

1. **Error:** Subagente não retorna bloco YAML
   - **Cause:** O subagente não seguiu as instruções de formato de saída
   - **Resolution:** Tentar extração via regex de step_output a partir da resposta
   - **Recovery:** Se a extração falhar, fazer re-spawn com um lembrete explícito de formato; após max_retries, solicitar intervenção manual

2. **Error:** Subagente retorna status: failed
   - **Cause:** A execução da task falhou dentro do subagente
   - **Resolution:** Verificar global_error_handling.max_retries_per_phase
   - **Recovery:** Fazer re-spawn com o erro anterior como contexto adicional; após max_retries, seguir a estratégia de fallback

3. **Error:** A condição de roteamento não pode ser avaliada
   - **Cause:** Valor necessário ausente no estado ou nenhuma rota corresponde
   - **Resolution:** Exibir os valores atuais ao usuário
   - **Recovery:** Pedir ao usuário para escolher a rota manualmente

4. **Error:** Arquivo de agente não encontrado
   - **Cause:** O agente referenciado no step não existe no caminho resolvido
   - **Resolution:** Verificar os caminhos de fallback de hybrid
   - **Recovery:** Listar os agentes disponíveis e pedir ao usuário para escolher

5. **Error:** Arquivo de task não encontrado (campo uses)
   - **Cause:** A task referenciada no campo 'uses' do step não existe
   - **Resolution:** Verificar caminhos alternativos
   - **Recovery:** Pular o conteúdo da task no prompt (a persona do agente sozinha pode ser suficiente)

---

## Performance

```yaml
duration_per_invocation: 1-5 min (spawn + execução de um único step)
cost_per_step: $0.01-0.10 (uma chamada de API por action step)
token_usage: ~2.000-10.000 tokens por chamada de subagente
total_cost: Depende do workflow (N steps × cost_per_step)
```

---

## Metadados

```yaml
story: N/A
version: 2.0.0
dependencies:
  - run-workflow.md (delega para esta task)
  - subagent-step-prompt.md (template para construção de prompt)
  - workflow-state-manager.js
  - workflow-validator.js
tags:
  - workflow
  - engine
  - subagent
  - spawn
  - orchestration
  - runtime
updated_at: 2026-02-01
```

---

# Task Motor de Runtime de Workflow

## Propósito

Executar workflows fazendo spawn de **subagentes reais** via Task tool, **um step por vez**. Cada invocação processa um único action step, faz spawn de um subagente isolado, mostra a saída e para para validação do usuário antes de prosseguir. Diferente do modo guiado (persona-switching), cada agente roda em seu próprio contexto com fidelidade total de persona e zero contaminação de outros steps.

## Pré-requisitos

- YAML de workflow validado e acessível
- Template: `subagent-step-prompt.md` disponível em `.aiox-core/development/templates/`
- Arquivos de agente acessíveis nos caminhos resolvidos
- Arquivos de task acessíveis nos caminhos resolvidos (via campo `uses`)

---

## Loop do Motor (Passo a Passo)

O motor processa **UM action step por invocação**. Marcadores de fase e decisões de roteamento são processados automaticamente (não exigem spawn). O motor para após cada action step para que o usuário possa validar a saída antes de continuar.

```
Invocação 1: start    → inicializa estado → spawn step 1 → salva → STOP (usuário valida)
Invocação 2: continue → carrega estado → spawn step 2 → salva → STOP (usuário valida)
Invocação 3: continue → carrega estado → [roteamento: score OK] → spawn step 3 → salva → STOP
...
Invocação N: continue → carrega estado → [marcador de fim] → relatório final → DONE
```

---

### Ação: `start`

Inicializar um novo workflow e executar o primeiro action step.

**1. Resolver o caminho do workflow** com base em `target_context`:
- `core` → `.aiox-core/development/workflows/{workflow_name}.yaml`
- `squad` → `squads/{squad_name}/workflows/{workflow_name}.yaml`
- `hybrid` → `squads/{squad_name}/workflows/{workflow_name}.yaml`

Ler o arquivo YAML do workflow.

**2. Validar o workflow** usando WorkflowValidator:
- Deve passar na validação antes de prosseguir
- Exibir quaisquer avisos ao usuário
- Se a validação falhar → abortar com os detalhes do erro

**3. Inicializar o estado:**

```yaml
engine_state:
  workflow_id: {workflow.id}
  workflow_name: {workflow.name}
  instance_id: "{workflow_id}-engine-{timestamp}"
  target_context: {target_context}
  squad_name: {squad_name}
  mode: engine
  started_at: {ISO timestamp}
  status: active
  current_step_index: 0
  current_phase: null
  step_outputs: {}
  decisions: []
  retries: {}
```

**4. Exibir cabeçalho:**
```
=== Workflow Engine Iniciado: {workflow_name} ===
Modo: ENGINE (spawn de subagentes reais, passo a passo)
Instância: {instance_id}
Total de itens da sequência: {N} ({action_count} action steps)
```

**5. Avançar para o primeiro action step** — chamar o **Avançador de Sequência** (ver abaixo).

**6. Salvar o estado e PARAR.**

---

### Ação: `continue`

Retomar a partir da posição atual e executar o próximo action step.

**1. Encontrar e carregar** o arquivo de estado de engine ativo para este workflow.

**2. Verificar** que state.status é `active`. Caso contrário, exibir erro.

**3. Avançar para o próximo action step** — chamar o **Avançador de Sequência** (ver abaixo).

**4. Salvar o estado e PARAR.**

---

### Ação: `status`

Mostrar o progresso sem executar nada.

**1. Carregar o estado.**

**2. Gerar o relatório de status:**

```
=== Status do Engine: {workflow_name} ===
Instância: {instance_id}
Modo: ENGINE (passo a passo)
Status: {active|completed|aborted}
Fase: {current_phase}
Progresso: [{progress_bar}] {percentage}% ({completed}/{total_action_steps})

--- Steps ---
  [x] {step_id}: {agent} — {action} (score: {score})
  [x] {step_id}: {agent} — {action}
  [>] {step_id}: {agent} — {action}    <-- atual
  [ ] {step_id}: {agent} — {action}
  ...

--- Decisões de Roteamento ---
  {step}: {condition} = {value} → {route_chosen}
  ...

--- Saída do Último Step ---
  {resumo das saídas do step mais recente}

Próximo: *run-workflow {name} continue --mode=engine
```

---

### Ação: `skip`

Pular o step atual (somente se marcado como `optional: true`).

**1. Carregar o estado.**

**2. Identificar o step atual** em `current_step_index`.

**3. Verificar** que o step tem `optional: true`. Caso contrário → erro: "Step {id} não é opcional."

**4. Registrar o skip** no estado:
```yaml
step_results:
  {step_id}:
    status: skipped
    skipped_at: {timestamp}
```

**5. Avançar `current_step_index`** para além do step pulado.

**6. Salvar o estado.**

**7. Mostrar** o que foi pulado e o que vem a seguir.

---

### Ação: `abort`

Abortar o workflow.

**1. Carregar o estado.**

**2. Definir status como `aborted`.**

**3. Gerar o relatório de abortamento:**
```
=== Workflow Abortado: {workflow_name} ===
Instância: {instance_id}
Progresso: {completed}/{total} action steps concluídos

Steps concluídos:
  - {step_id}: {agent} — {action}
  ...

Artefatos criados:
  - {lista de step_results}

Estado preservado em: .aiox/{instance_id}-engine-state.yaml
```

**4. Salvar o estado.**

---

### Avançador de Sequência (Algoritmo Central)

Este é o procedimento interno chamado tanto por `start` quanto por `continue`. Ele percorre a sequência a partir de `current_step_index`, processando automaticamente os itens não-action, e para quando encontra um action step (para fazer spawn dele) ou o fim do workflow.

```
PROCEDURE advance_and_execute(state, workflow):

  index = state.current_step_index
  sequence = workflow.sequence

  LOOP:
    IF index >= length(sequence):
      → Workflow completo. Gerar Relatório Final. Definir status=completed. RETURN.

    item = sequence[index]

    # --- Marcador de Fase ---
    IF item has 'phase' field:
      state.current_phase = item.name
      Log: "--- Fase {item.phase}: {item.name} ---"
      index = index + 1
      CONTINUE LOOP

    # --- Marcador de Fim ---
    IF item has 'meta: end':
      Log: "=== Workflow Completo ==="
      Gerar Relatório Final.
      Definir state.status = completed.
      RETURN.

    # --- Step de Roteamento ---
    IF item has 'meta: routing':
      Executar Roteador de Decisão (ver seção abaixo).
      O roteador retorna um novo index (loop_back, continue ou complete).
      IF complete → Gerar Relatório Final. Definir status=completed. RETURN.
      index = {novo index do roteador}
      CONTINUE LOOP

    # --- Action Step (spawn de subagente) ---
    IF item has 'agent' field:
      state.current_step_index = index
      Executar o step:
        1. IF elicit=true → rodar Manipulador de Elicitação
        2. Resolver o caminho do arquivo de agente
        3. Ler o arquivo de agente
        4. Resolver o caminho do arquivo de task (a partir de 'uses')
        5. Ler o arquivo de task (se 'uses' definido)
        6. Ler os arquivos de dados (deps do agente + recursos do workflow)
        7. Coletar os requires de state.step_outputs
        8. Construir o prompt (Construtor de Prompt do Subagente)
        9. Fazer spawn do subagente via Task tool
        10. Parsear a saída (Parser de Saída)
        11. Armazenar em state.step_results[{step_id}] e state.step_outputs
      Exibir o resultado do step ao usuário.
      Avançar o index para a próxima invocação:
        state.current_step_index = index + 1
      Mostrar o que vem a seguir (preview):
        Escanear adiante para encontrar o próximo action step, mostrar seu agent/action.
        "Próximo: @{next_agent} — {next_action}"
        "Rodar: *run-workflow {name} continue --mode=engine"
      RETURN (STOP — aguardar a validação do usuário).

  END LOOP
```

**Formato de exibição após cada action step:**
```
[Step {N}/{total_actions}] @{agent}: {action}
  Status: {completed|failed}
  Score: {score se aplicável}
  Saídas: {lista de chaves de saída com valores resumidos}

--- Preview da Saída ---
{Primeiros 500 caracteres da saída principal, ou resumo do artefato}

--- O Que Vem a Seguir ---
  Fase: {next_phase se mudar}
  Próximo step: @{next_agent} — {next_action}
  Comando: *run-workflow {name} continue --mode=engine
  (ou: *run-workflow {name} skip --mode=engine  se o próximo step for opcional)
```

---

### Relatório Final

Gerado quando o workflow alcança o marcador de fim ou uma rota `complete`.

```
=== Relatório de Execução do Engine ===
Workflow: {workflow_name}
Instância: {instance_id}
Iniciado: {started_at}
Concluído: {now}
Modo: ENGINE (passo a passo)

--- Resumo dos Steps ---
  [x] {step_id}: @{agent} — {action} (score: {score})
  [x] {step_id}: @{agent} — {action}
  ...

--- Decisões de Roteamento ---
  {step}: {condition} = {value} → {route_chosen}
  ...

--- Saídas Finais ---
  {key}: {summary_value}
  ...

--- Artefatos ---
  {lista de todos os artefatos criados em todos os steps}

Estado salvo em: .aiox/{instance_id}-engine-state.yaml
```

Após o relatório, perguntar ao usuário se ele deseja criar um documento de handoff.

---

## Manipulador de Elicitação

Para cada step com `elicit: true`, o orquestrador coleta a entrada ANTES de fazer spawn do subagente.

### Processo

1. Ler o campo `notes` do step atual no YAML do workflow
2. Se o step tiver um campo `uses`, ler o arquivo de task e localizar sua seção `Entrada`
3. Para cada campo em `Entrada` com `origem: User Input` e `obrigatório: true`:
   - Usar a ferramenta `AskUserQuestion` para perguntar ao usuário
   - Validar a resposta contra a regra `validação` do campo
4. Se não existir uma `Entrada` formal, extrair as perguntas do campo `notes` do step
5. Agregar todas as respostas em um bloco YAML:

```yaml
user_input:
  {field_name}: "{user_response}"
  {field_name}: "{user_response}"
```

6. Passar esse bloco como `{{USER_INPUT}}` no prompt do subagente

### Regras

- A elicitação é coletada pelo orquestrador, NÃO pelo subagente
- O subagente recebe entradas pré-coletadas e NÃO faz perguntas
- Se o usuário se recusar a fornecer uma entrada opcional, passar `null` para esse campo
- Para o primeiro step com `elicit: true`, coletar também os `inputs` a nível de workflow, se definidos

---

## Construtor de Prompt do Subagente

Constrói o prompt completo para um subagente usando o template.

### Processo

1. **Carregar o template** de `.aiox-core/development/templates/subagent-step-prompt.md`
2. **Extrair informações do agente:**
   - Ler o arquivo de agente → extrair `agent.name` → `{{AGENT_NAME}}`
   - Ler o arquivo de agente → extrair `agent.title` → `{{AGENT_TITLE}}`
   - Ler o arquivo de agente → extrair o bloco YAML completo → `{{AGENT_YAML}}`
3. **Extrair o conteúdo da task:**
   - Ler o arquivo de task (a partir de `uses`) → conteúdo completo → `{{TASK_CONTENT}}`
   - Se não houver campo `uses` → definir como "Execute the action described in Step Instructions"
4. **Definir as variáveis de contexto:**
   - `{{WORKFLOW_NAME}}` a partir de `workflow.name`
   - `{{STEP_ID}}` a partir do campo `id` do step
   - `{{PHASE_NAME}}` a partir da fase atual
   - `{{ACTION}}` a partir do campo `action` do step
5. **Construir os dados de entrada:**
   - Para cada item no `requires` do step:
     - Buscar em `state.step_outputs`
     - Formatar como bloco YAML → `{{INPUT_DATA}}`
   - Se não houver requires → definir como "No previous step outputs required"
6. **Construir os dados de referência:**
   - Ler cada arquivo da lista `dependencies.data` do agente
   - Ler cada arquivo da lista `resources.data` do workflow
   - Concatenar os conteúdos → `{{REFERENCE_DATA}}`
   - Se não houver arquivos de dados → definir como "No reference data"
7. **Definir a entrada do usuário:**
   - A partir dos resultados de elicitação → `{{USER_INPUT}}`
   - Se `elicit: false` → definir como "No user input required for this step"
8. **Definir as notas do step:**
   - A partir do campo `notes` do step → `{{STEP_NOTES}}`
   - Se não houver notes → definir como "Execute the action as described above"
9. **Substituir todas as variáveis** na string do template
10. **Retornar o prompt completo**

### Resolução de Caminho para Arquivos de Agente

```
resolve_agent_path(agent_ref, target_context, squad_name):
  # Tratar prefixo explícito
  IF agent_ref starts with "core:":
    RETURN ".aiox-core/development/agents/{agent_ref without prefix}.md"
  IF agent_ref starts with "squad:":
    RETURN "squads/{squad_name}/agents/{agent_ref without prefix}.md"

  # Resolução baseada em contexto
  IF target_context == "core":
    RETURN ".aiox-core/development/agents/{agent_ref}.md"
  IF target_context == "squad":
    RETURN "squads/{squad_name}/agents/{agent_ref}.md"
  IF target_context == "hybrid":
    squad_path = "squads/{squad_name}/agents/{agent_ref}.md"
    core_path = ".aiox-core/development/agents/{agent_ref}.md"
    IF squad_path exists → RETURN squad_path
    IF core_path exists → RETURN core_path
    ERROR: Agente não encontrado em nenhum dos contextos
```

### Resolução de Caminho para Arquivos de Task (campo uses)

```
resolve_task_path(uses_ref, target_context, squad_name):
  IF target_context == "core":
    RETURN ".aiox-core/development/tasks/{uses_ref}.md"
  IF target_context == "squad":
    RETURN "squads/{squad_name}/tasks/{uses_ref}.md"
  IF target_context == "hybrid":
    squad_path = "squads/{squad_name}/tasks/{uses_ref}.md"
    core_path = ".aiox-core/development/tasks/{uses_ref}.md"
    IF squad_path exists → RETURN squad_path
    IF core_path exists → RETURN core_path
    ERROR: Task não encontrada em nenhum dos contextos
```

### Resolução de Caminho para Arquivos de Dados

```
resolve_data_path(data_ref, target_context, squad_name):
  IF target_context == "core":
    RETURN ".aiox-core/data/{data_ref}"
  IF target_context == "squad":
    RETURN "squads/{squad_name}/data/{data_ref}"
  IF target_context == "hybrid":
    squad_path = "squads/{squad_name}/data/{data_ref}"
    core_path = ".aiox-core/data/{data_ref}"
    IF squad_path exists → RETURN squad_path
    IF core_path exists → RETURN core_path
    WARN: Arquivo de dados não encontrado, pular
```

---

## Parser de Saída

Extrai a saída estruturada da resposta do subagente.

### Processo

1. **Buscar o bloco YAML** na resposta do subagente:
   - Procurar conteúdo entre os marcadores ` ```yaml ` e ` ``` `
   - Especificamente procurar um bloco que comece com `step_output:`
2. **Parsear o bloco YAML** em um objeto estruturado
3. **Validar os campos obrigatórios:**
   - `status` deve ser `completed` ou `failed`
   - `outputs` deve ser um objeto (pode estar vazio)
4. **Extrair as saídas:**
   - Mapear cada chave em `outputs` para `state.step_outputs[{step_id}].{key}`
   - Armazenar `score` se presente
   - Armazenar a lista `artifacts` se presente
5. **Tratar falhas de parsing:**
   - Tentativa 1: Regex para o bloco `step_output:` sem marcadores YAML
   - Tentativa 2: Procurar os campos de saída individuais mencionados na lista `outputs` do step
   - Tentativa 3: Marcar o step como necessitando de revisão manual

### Padrão de Fallback de Regex

```
/step_output:\s*\n([\s\S]*?)(?=\n[^\s]|\Z)/
```

Se o bloco YAML não puder ser parseado:
- Extrair `status` de qualquer linha contendo "status: completed" ou "status: failed"
- Extrair os valores de saída individuais buscando cada chave de saída esperada
- Registrar um aviso de que o parsing estruturado falhou

---

## Roteador de Decisão

Avalia as condições de roteamento e determina o próximo step.

### Processo

Para cada step com `meta: routing`:

1. **Ler o campo de condição** (ex.: `based_on_score_9p`, `based_on_compliance_score`)
2. **Mapear a condição para o valor no estado:**
   - `based_on_score_9p` → procurar `score_9p` nas saídas de steps recentes
   - `based_on_compliance_score` → procurar `compliance_score` nas saídas de steps recentes
   - `based_on_validation_status` → procurar `resultado_validado` ou `status` nas saídas de steps recentes
   - `based_on_pedro_approval` → procurar `aprovacao_final` nas saídas de steps recentes
3. **Avaliar cada rota:**
   - Ler o nome da rota para determinar o limiar (ex.: `score_below_70`, `score_90_plus`)
   - Comparar o valor extraído contra o limiar
   - Selecionar a rota correspondente
4. **Executar a ação da rota:**
   - `loop_back` → Encontrar o ID do step de destino na sequência, definir o index do step para essa posição
   - `continue` → Avançar normalmente para o próximo step
   - `continue_with_adjustments` → Registrar os ajustes necessários, avançar para o step de destino
   - `apply_corrections` → Registrar as correções, avançar para o step de destino
   - `complete` → Definir o status do workflow como `completed`, saltar para o Relatório Final
5. **Registrar a decisão no estado:**

```yaml
decisions:
  - step: {routing_step_id}
    condition: {condition}
    evaluated_value: {o valor verificado}
    route_chosen: {route_name}
    action: {loop_back|continue|complete}
    target: {target_step_id se aplicável}
    timestamp: {ISO timestamp}
```

### Regras de Extração de Limiar

Parsear o nome da chave da rota para extrair a comparação:
- `*_below_{N}` → value < N
- `*_{N}_to_{M}` → N <= value <= M
- `*_{N}_plus` → value >= N
- `reprovado` → status igual a "REPROVADO" ou "failed" ou false
- `aprovado` / `approved` → status igual a "APROVADO" ou "completed" ou true
- `not_approved` → negação de approved
- `compliance_below_{N}` → compliance_score < N
- `compliance_{N}_plus` → compliance_score >= N

### Fallback de Roteamento Manual

Se nenhuma rota corresponder ao valor avaliado:
1. Exibir os valores atuais ao usuário
2. Listar as rotas disponíveis com suas descrições
3. Usar AskUserQuestion para deixar o usuário escolher
4. Registrar como decisão manual no estado

---

## Spawn de um Subagente

A invocação real da Task tool para cada action step.

### Padrão de Invocação

```
Chamada da Task tool:
  description: "WF:{workflow_id} Step:{step_id} Agent:{agent_name}"
  subagent_type: "general-purpose"
  prompt: {prompt construído pelo Construtor de Prompt do Subagente}
```

### Regras Importantes

- Cada subagente roda em um contexto isolado (processo separado)
- O subagente NÃO tem acesso ao histórico de conversa do orquestrador
- O subagente NÃO tem acesso às saídas de outros subagentes (apenas ao que é passado via prompt)
- O subagente NÃO deve usar AskUserQuestion (todas as entradas são pré-coletadas)
- O orquestrador aguarda a conclusão do subagente antes de prosseguir

---

## Persistência de Estado

O estado é salvo após **cada invocação** (start, continue, skip, abort). Isso permite retomar entre sessões.

```yaml
# .aiox/{instance-id}-engine-state.yaml
engine_state:
  workflow_id: {id}
  workflow_name: {name}
  instance_id: {instance_id}
  target_context: {context}
  squad_name: {squad}
  mode: engine
  started_at: {timestamp}
  updated_at: {current timestamp}
  status: active|completed|aborted
  current_step_index: {index do PRÓXIMO step a processar}
  current_phase: {nome da fase}
  last_completed_step: {id do último action step concluído, ou null}
  action_steps_completed: {contagem}
  action_steps_total: {contagem}

  step_outputs:
    {step_id}:
      {output_key}: {output_value}
      ...

  step_results:
    {step_id}:
      status: completed|failed|skipped
      outputs: {saídas parseadas}
      score: {se aplicável}
      artifacts: [{lista}]
      spawned_at: {timestamp}
      completed_at: {timestamp}
      retries: {contagem}

  decisions:
    - {registros de decisão do roteamento}

  elicitation_responses:
    {step_id}:
      {field}: {value}
```

### Retomar Entre Sessões

O arquivo de estado persiste em disco. Para retomar em uma nova sessão do Claude Code:

```
@aiox-master
*run-workflow {name} continue --mode=engine
```

O motor carrega o estado, lê `current_step_index` e retoma exatamente de onde parou. Todas as saídas de steps anteriores ficam disponíveis em `step_outputs` para a cadeia de `requires`.

---

## Lógica de Retry

Quando um step falha:

1. Verificar `workflow.global_error_handling.max_retries_per_phase` (padrão: 2)
2. Verificar a contagem de `state.retries[{step_id}]`
3. Se retries < max:
   - Incrementar o contador de retry
   - Adicionar o erro anterior ao prompt como contexto adicional:
     ```
     ## Tentativa Anterior Falhou
     Erro: {descrição do erro}
     Saída anterior: {saída bruta, se disponível}
     Por favor, corrija os problemas e tente novamente.
     ```
   - Fazer re-spawn do subagente
4. Se retries >= max:
   - Exibir o erro ao usuário
   - Oferecer opções:
     1. Tentar novamente manualmente (o usuário fornece a entrada)
     2. Pular o step (se opcional)
     3. Abortar o workflow

---

## Formato de Saída

O motor produz uma saída estruturada ao final da execução. Veja o Passo 6 (Relatório Final) na seção do Loop do Motor acima.
