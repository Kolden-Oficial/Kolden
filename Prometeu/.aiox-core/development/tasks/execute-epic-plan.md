---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Autônomo (0-2 prompts)
- As waves prosseguem automaticamente após a aprovação do gate
- Os checkpoints assumem GO por padrão
- **Melhor para:** Epics bem testados com baixo risco de conflito

### 2. Modo Interativo - Equilibrado (5-10 prompts) **[PADRÃO]**
- Checkpoint humano entre as waves
- Revisão de gate antes do merge
- **Melhor para:** Primeira execução de epic, complexidade média-alta

### 3. Planejamento Pre-Flight - Análise Abrangente
- Análise completa de dependências antes da execução
- Validação da estrutura de waves em modo dry-run
- **Melhor para:** Epics de complexidade muito alta, risco de conflito desconhecido

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Tarefa (AIOX Task Format V1.0)

```yaml
task: executeEpicPlan()
responsavel: Morgan (PM)
responsavel_type: Agente
atomic_layer: Orchestration

**Entrada:**
- campo: execution_plan_path
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Deve ser um caminho válido para um arquivo EXECUTION.yaml (tipicamente em docs/stories/epics/{epic}/)

- campo: action
  tipo: string
  origem: User Input
  obrigatório: false
  validação: Deve ser "start", "continue", "status", "skip-story" ou "abort". Padrão: "start"

- campo: mode
  tipo: string
  origem: User Input
  obrigatório: false
  validação: Deve ser "yolo", "interactive" ou "preflight". Padrão: "interactive"

- campo: wave
  tipo: number
  origem: User Input
  obrigatório: false
  validação: Número da wave a partir da qual retomar (apenas com action=continue). Padrão: auto-detectar a partir do estado.

**Saída:**
- campo: epic_state
  tipo: object
  destino: File system (.aiox/epic-{epicId}-state.yaml)
  persistido: true

- campo: wave_report
  tipo: object
  destino: Output
  persistido: false

- campo: next_steps
  tipo: string
  destino: Output
  persistido: false
```

---

## Pré-Condições

```yaml
pre-conditions:
  - [ ] execution_plan_path deve resolver para um arquivo YAML existente
    tipo: pre-condition
    blocker: true
    validação: |
      O arquivo deve existir e conter execution.epicId, execution.stories, execution.waves
    error_message: "Pré-condição falhou: Plano de execução não encontrado em '{execution_plan_path}'"

  - [ ] Todos os arquivos de story referenciados no plano devem existir
    tipo: pre-condition
    blocker: true
    validação: |
      Para cada story em execution.stories, verificar se {storyBasePath}/{story.file} existe
    error_message: "Pré-condição falhou: Arquivo de story '{story.file}' não encontrado"

  - [ ] O workflow de template deve existir
    tipo: pre-condition
    blocker: true
    validação: |
      execution.template deve resolver para .aiox-core/development/workflows/{template}.yaml
    error_message: "Pré-condição falhou: Template '{template}' não encontrado"

  - [ ] Para action=continue, o arquivo de estado deve existir
    tipo: pre-condition
    blocker: true
    validação: |
      .aiox/epic-{epicId}-state.yaml deve existir com status=active
    error_message: "Pré-condição falhou: Nenhum estado ativo encontrado. Use action=start primeiro."

  - [ ] A working tree do Git deve estar limpa (sem mudanças não commitadas)
    tipo: pre-condition
    blocker: true
    validação: |
      git status --porcelain retorna vazio ou apenas arquivos não rastreados
    error_message: "Pré-condição falhou: Mudanças não commitadas detectadas. Faça commit ou stash primeiro."
```

---

## Pós-Condições

```yaml
post-conditions:
  - [ ] Arquivo de estado atualizado com o progresso da wave atual
    tipo: post-condition
    blocker: true
    validação: |
      .aiox/epic-{epicId}-state.yaml existe e reflete as waves/stories concluídas
    error_message: "Pós-condição falhou: Arquivo de estado não persistido"

  - [ ] Todas as stories concluídas têm branches enviadas (pushed)
    tipo: post-condition
    blocker: false
    validação: |
      Para cada story concluída, o branch git {story.branch} existe
    error_message: "Aviso: Alguns branches de story podem não ter sido enviados (pushed)"
```

---

## Critérios de Aceite

```yaml
acceptance-criteria:
  - [ ] Cada story em cada wave foi executada via development-cycle
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Cada story gerou um subagente que seguiu o development-cycle completo
      (PO validate -> Executor develop -> Self-healing -> Quality gate -> DevOps push)
    error_message: "Critério de aceite não atendido: As stories não seguiram o development-cycle"

  - [ ] Os gates de wave foram executados entre as waves
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Após cada wave, o agente de gate revisou a integração cross-story
    error_message: "Critério de aceite não atendido: Gates de wave pulados"

  - [ ] O estado suporta retomada (resume) entre sessões
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Abortar e executar action=continue retoma a partir da última wave concluída
    error_message: "Critério de aceite não atendido: Resume não funciona"
```

---

## Ferramentas

- **Ferramenta:** Task tool (built-in do Claude Code)
  - **Propósito:** Gerar subagentes para o development-cycle de story e os gates de wave
  - **Fonte:** Runtime do Claude Code

- **Ferramenta:** Read tool (built-in do Claude Code)
  - **Propósito:** Ler o plano de execução, arquivos de story, templates de workflow
  - **Fonte:** Runtime do Claude Code

- **Ferramenta:** Write tool (built-in do Claude Code)
  - **Propósito:** Persistir o arquivo de estado do epic
  - **Fonte:** Runtime do Claude Code

- **Ferramenta:** AskUserQuestion (built-in do Claude Code)
  - **Propósito:** Checkpoints de wave (GO/PAUSE/REVIEW/ABORT)
  - **Fonte:** Runtime do Claude Code

- **Ferramenta:** Bash (built-in do Claude Code)
  - **Propósito:** Operações Git (verificação de branch, criação de worktree)
  - **Fonte:** Runtime do Claude Code

---

## Tratamento de Erros

**Estratégia:** retry-at-story-level

**Erros Comuns:**

1. **Erro:** O development-cycle da story falha
   - **Causa:** O agente de dev encontrou um erro, testes falham, etc.
   - **Resolução:** O development-cycle trata as retentativas internamente (máx 3)
   - **Recuperação:** Se ainda falhar, marcar a story como bloqueada, continuar as outras stories da wave

2. **Erro:** O gate de wave falha
   - **Causa:** Problemas de integração entre as stories da wave
   - **Resolução:** O agente de gate identifica problemas específicos
   - **Recuperação:** Criar tarefas de correção, reexecutar as stories afetadas, reenviar o gate

3. **Erro:** Conflito de merge entre branches de wave
   - **Causa:** Stories modificaram arquivos sobrepostos
   - **Resolução:** Seguir a ordem de merge do plano de execução
   - **Recuperação:** Resolver os conflitos manualmente, reexecutar os testes

4. **Erro:** Arquivo de estado corrompido
   - **Causa:** Escrita interrompida, acesso concorrente
   - **Resolução:** Fazer backup do estado antes de cada escrita
   - **Recuperação:** Restaurar a partir de .aiox/epic-{epicId}-state.yaml.bak

---

## Performance

```yaml
duration_per_wave: 30-120 min (depende da quantidade de stories e da complexidade)
duration_total: 2-8 horas (depende do tamanho do epic)
cost_per_story: $0.05-0.50 (geração de subagentes)
token_usage: ~5.000-20.000 tokens por ciclo de story
```

---

## Metadata

```yaml
story: EPIC-ACT (epic infrastructure)
version: 1.0.0
dependencies:
  - epic-orchestration.yaml (template)
  - development-cycle.yaml (inner loop per story)
  - po-epic-context.md (epic context tracking)
  - validate-next-story.md (PO story validation)
tags:
  - epic
  - orchestration
  - wave-execution
  - parallel-development
  - quality-gates
updated_at: 2026-02-06
```

---

# Tarefa Execute Epic Plan

## Propósito

Orquestrar a execução de um epic lendo um plano EXECUTION.yaml específico do projeto,
processando as stories em execução paralela baseada em waves, rodando cada story pelo
`development-cycle` completo (PO validate -> Dev implement -> Self-heal -> QA review -> DevOps push),
gerenciando os quality gates de wave e persistindo o estado para retomada (resume) entre sessões.

## Pré-requisitos

- O plano de execução YAML existe (ex: `docs/stories/epics/{epic}/EPIC-{ID}-EXECUTION.yaml`)
- O template `epic-orchestration.yaml` existe em `.aiox-core/development/workflows/`
- O inner loop `development-cycle.yaml` existe em `.aiox-core/development/workflows/`
- Todos os arquivos de story referenciados no plano existem
- A working tree do Git está limpa

---

## Comando

```
@pm *execute-epic {path-to-EXECUTION.yaml} [action] [--mode=interactive]
```

### Exemplos

```bash
# Iniciar uma nova execução de epic
@pm *execute-epic docs/stories/epics/epic-activation-pipeline/EPIC-ACT-EXECUTION.yaml

# Retomar de onde você parou
@pm *execute-epic docs/stories/epics/epic-activation-pipeline/EPIC-ACT-EXECUTION.yaml continue

# Verificar o progresso atual
@pm *execute-epic docs/stories/epics/epic-activation-pipeline/EPIC-ACT-EXECUTION.yaml status

# Iniciar em modo YOLO (autônomo)
@pm *execute-epic docs/stories/epics/epic-activation-pipeline/EPIC-ACT-EXECUTION.yaml start --mode=yolo

# Abortar a execução
@pm *execute-epic docs/stories/epics/epic-activation-pipeline/EPIC-ACT-EXECUTION.yaml abort
```

---

## Execução da Tarefa

### Ação: `start`

Inicializar a execução do epic e começar a Wave 1.

**1. Ler e fazer o parse do plano de execução:**

```
Read {execution_plan_path}
Extract:
  - epicId
  - storyBasePath
  - template (reference to epic-orchestration.yaml)
  - stories (map of story definitions)
  - waves (ordered list of wave definitions)
  - final_gate (epic-level sign-off criteria)
  - bug_verification (optional checklist)
```

**2. Validar todas as referências:**

```
FOR each story in execution.stories:
  VERIFY file exists at {storyBasePath}/{story.file}
  VERIFY story.executor is a valid agent ID
  VERIFY story.quality_gate is a valid agent ID
  VERIFY story.quality_gate != story.executor (enforcement from development-cycle)

FOR each wave in execution.waves:
  VERIFY all story IDs in wave.stories exist in execution.stories
  VERIFY wave.dependencies reference valid previous waves

VERIFY epic-orchestration.yaml exists
VERIFY development-cycle.yaml exists
```

**3. Análise pré-voo (se mode=preflight):**

```
FOR each wave:
  List all key_files across stories in the wave
  Identify overlapping files → flag conflict risk
  Estimate total complexity
  Show dependency chain

Display full analysis and ASK user to confirm before proceeding.
```

**4. Inicializar o estado:**

```yaml
# .aiox/epic-{epicId}-state.yaml
epic_state:
  epicId: {epicId}
  execution_plan: {execution_plan_path}
  mode: {mode}
  started_at: {ISO timestamp}
  updated_at: {ISO timestamp}
  status: active

  current_wave: 1
  total_waves: {count}

  waves:
    1:
      name: {wave.name}
      status: pending  # pending | in_progress | gate_review | completed | failed
      stories:
        {story_id}:
          status: pending  # pending | in_progress | completed | failed | blocked
          branch: {story.branch}
          started_at: null
          completed_at: null
          executor: {story.executor}
          quality_gate: {story.quality_gate}
    2:
      # ...

  gate_verdicts: {}
  bug_verification: {}
```

**5. Exibir o cabeçalho do epic:**

```
=== Epic Execution Started: {epicId} ===
Plan: {execution_plan_path}
Mode: {mode}
Stories: {total_stories} across {total_waves} waves
Template: epic-orchestration + development-cycle (per story)

Wave Structure:
  Wave 1: {wave.name} ({story_count} stories, parallel={wave.parallel})
  Wave 2: {wave.name} ({story_count} stories, parallel={wave.parallel})
  ...

Starting Wave 1...
```

**6. Executar a Wave 1** — chamar o **Wave Executor** (veja abaixo).

**7. Salvar o estado e PARAR** (aguardar a conclusão da wave ou um checkpoint do usuário).

---

### Ação: `continue`

Retomar a execução do epic a partir do estado atual.

**1. Carregar o estado** de `.aiox/epic-{epicId}-state.yaml`
**2. Verificar** se o status é `active`
**3. Determinar o ponto de retomada:**

```
IF current wave has status=in_progress:
  → Resume wave (some stories may already be done)
IF current wave has status=gate_review:
  → Resume gate review
IF current wave has status=completed:
  → Advance to next wave
IF all waves completed:
  → Run final gate
```

**4. Executar a partir do ponto de retomada** — chamar o Wave Executor ou o Final Gate.
**5. Salvar o estado.**

---

### Ação: `status`

Mostrar o progresso do epic sem executar.

```
=== Epic Status: {epicId} ===
Plan: {execution_plan_path}
Mode: {mode}
Status: {active|completed|aborted}
Progress: Wave {current}/{total}

--- Wave Progress ---
  [x] Wave 1: {name} — {completed_stories}/{total_stories} stories
      [x] ACT-1: {title} (branch: {branch})
      [x] ACT-2: {title} (branch: {branch})
      ...
      Gate: APPROVED by @{agent}

  [>] Wave 2: {name} — {completed_stories}/{total_stories} stories  <-- current
      [>] ACT-6: {title} (branch: {branch}) — IN PROGRESS
      Gate: PENDING

  [ ] Wave 3: {name} — 0/{total_stories} stories
      ...

--- Bug Verification ---
  [x] Bug 1: {description} — Fixed by {story}
  [ ] Bug 2: {description} — Pending ({story})
  ...

Next: @pm *execute-epic {path} continue
```

---

### Ação: `skip-story`

Pular uma story específica dentro da wave atual (apenas se não for crítica).

**1. Carregar o estado.**
**2. Verificar** se a story está na wave atual e tem priority != critical.
**3. Marcar a story como pulada (skipped)** com a razão.
**4. Se todas as outras stories da wave estiverem concluídas**, prosseguir para o gate de wave.
**5. Salvar o estado.**

---

### Ação: `abort`

Abortar a execução do epic.

**1. Carregar o estado.**
**2. Definir o status como `aborted`.**
**3. Gerar relatório de abort:**

```
=== Epic Aborted: {epicId} ===
Progress: Wave {current}/{total}

Completed:
  - Wave 1: {N} stories done
  - ...

In Progress:
  - {story}: branch {branch} (uncommitted work may exist)

Branches created:
  - feat/act-1-greeting-config
  - feat/act-2-user-profile-audit
  - ...

State preserved at: .aiox/epic-{epicId}-state.yaml
To resume later: @pm *execute-epic {path} continue
```

**4. Salvar o estado.**

---

## Wave Executor (Algoritmo Central)

Este procedimento executa uma única wave do plano do epic.

```
PROCEDURE execute_wave(wave, stories, state):

  state.waves[wave.number].status = "in_progress"
  save_state()

  Display:
    "--- Wave {wave.number}: {wave.name} ---"
    "Stories: {story_count} | Parallel: {wave.parallel}"
    "Dependencies: {wave.dependencies}"

  # ─────────────────────────────────────────
  # STEP 1: Execute stories via development-cycle
  # ─────────────────────────────────────────

  IF wave.parallel == true:
    # Spawn ALL stories in this wave simultaneously using Task tool
    # Each story runs the full development-cycle as a subagent

    FOR EACH story_id IN wave.stories (IN PARALLEL):
      story = execution.stories[story_id]

      IF state.waves[wave.number].stories[story_id].status == "completed":
        SKIP (already done from previous resume)

      state.waves[wave.number].stories[story_id].status = "in_progress"
      state.waves[wave.number].stories[story_id].started_at = NOW

      # Spawn subagent for this story
      Task tool call:
        description: "EPIC:{epicId} Wave:{wave.number} Story:{story_id}"
        subagent_type: "aiox-dev"
        prompt: |
          You are executing story {story_id} as part of epic {epicId}, Wave {wave.number}.

          ## Story File
          Read and implement: {storyBasePath}/{story.file}

          ## Development Cycle
          Follow the development-cycle workflow:
          1. @po validates the story draft (read the story, verify acceptance criteria)
          2. @{story.executor} implements the code changes
          3. Self-healing: fix any lint/test/typecheck errors
          4. @{story.quality_gate} reviews the implementation
          5. @devops creates branch {story.branch} and pushes

          ## Epic Context
          - Epic: {epicId} — {epic title from INDEX}
          - Wave: {wave.number} of {total_waves} — "{wave.name}"
          - This story: {story.title}
          - Complexity: {story.complexity}
          - Key files: {story.key_files}

          ## Branch
          Create and work on branch: {story.branch}

          ## Output
          When done, report:
          - Status: completed or failed
          - Files changed
          - Tests added/passing
          - Branch pushed: yes/no

    # Wait for ALL parallel stories to complete
    # Collect results

  ELSE (sequential):
    # Execute stories one at a time
    FOR EACH story_id IN wave.stories (SEQUENTIAL):
      # Same spawning logic as above, but wait for each before starting next

  # ─────────────────────────────────────────
  # STEP 2: Update state with results
  # ─────────────────────────────────────────

  FOR EACH story_id IN wave.stories:
    IF story completed successfully:
      state.waves[wave.number].stories[story_id].status = "completed"
      state.waves[wave.number].stories[story_id].completed_at = NOW
    ELSE:
      state.waves[wave.number].stories[story_id].status = "failed"
      Log failure reason

  save_state()

  # Check if wave can proceed
  failed_stories = stories with status == "failed"
  IF failed_stories is not empty:
    Display:
      "WARNING: {count} stories failed in Wave {wave.number}:"
      FOR EACH failed: "  - {story_id}: {reason}"
      "Options: retry failed stories or proceed to gate with partial results"
    ASK user: [Retry] [Proceed] [Abort]

  # ─────────────────────────────────────────
  # STEP 3: Wave Gate (integration review)
  # ─────────────────────────────────────────

  state.waves[wave.number].status = "gate_review"
  save_state()

  Display:
    "--- Wave {wave.number} Gate: Integration Review ---"
    "Agent: @{wave.gate.agent}"
    "Focus: {wave.gate.focus}"

  # Spawn gate agent for integration review
  Task tool call:
    description: "EPIC:{epicId} Wave:{wave.number} GATE"
    subagent_type: "aiox-architect"  # or whatever the gate agent is
    prompt: |
      You are reviewing Wave {wave.number} ("{wave.name}") of epic {epicId}.

      ## Stories Completed in This Wave
      {FOR EACH story in wave: story_id, title, branch, key_files}

      ## Gate Review Focus
      {wave.gate.focus}

      ## Review Checklist
      - [ ] Cross-story integration compatibility
      - [ ] No shared file conflicts between story branches
      - [ ] Combined test suite passes
      - [ ] No regressions from parallel changes
      - [ ] Architecture consistency across stories

      ## Merge Plan
      Order: {wave.merge.order}
      Conflict risk: {wave.merge.conflict_risk}
      Notes: {wave.merge.notes}

      ## Output
      Verdict: APPROVED or REJECTED
      If REJECTED: list specific issues to fix

  # Process gate result
  IF gate verdict == APPROVED:
    state.gate_verdicts[wave.number] = { status: "approved", agent: gate_agent, at: NOW }

    # Merge wave branches (delegate to @devops)
    Display:
      "Gate APPROVED. Merging branches..."
      "Merge order: {wave.merge.order}"

    Task tool call:
      description: "EPIC:{epicId} Wave:{wave.number} MERGE"
      subagent_type: "aiox-devops"
      prompt: |
        Merge Wave {wave.number} branches to main in this order:
        {wave.merge.order}

        For each branch:
        1. git merge {branch} --no-ff
        2. Resolve conflicts if any (conflict risk: {wave.merge.conflict_risk})
        3. Run tests after merge
        4. Tag: {wave.tag}

  ELSE (REJECTED):
    state.gate_verdicts[wave.number] = { status: "rejected", issues: gate_issues }
    Display rejection issues
    ASK user: [Fix and retry] [Override] [Abort]

  # ─────────────────────────────────────────
  # STEP 4: Wave Checkpoint
  # ─────────────────────────────────────────

  state.waves[wave.number].status = "completed"
  save_state()

  IF mode == "interactive":
    Display:
      "=== Wave {wave.number} Complete ==="
      "Stories: {completed}/{total}"
      "Gate: {verdict}"
      "Tag: {wave.tag}"
      ""
      "Next: Wave {wave.number + 1} — {next_wave.name}"
      "Stories: {next_wave.stories}"

    ASK user: [GO - Continue to next wave]
             [PAUSE - Save state, stop execution]
             [REVIEW - Show detailed wave summary]
             [ABORT - Stop the epic]

    ON GO: advance current_wave, execute next wave
    ON PAUSE: save state, STOP
    ON REVIEW: show detailed summary, then re-ask
    ON ABORT: set status=aborted, STOP

  ELSE IF mode == "yolo":
    # Auto-proceed to next wave
    advance current_wave
    execute next wave

END PROCEDURE
```

---

## Final Gate

Após a conclusão de todas as waves:

```
PROCEDURE final_gate(execution, state):

  Display:
    "=== FINAL GATE: Epic {epicId} ==="
    "Agent: @{execution.final_gate.agent}"

  # Spawn final gate agent
  Task tool call:
    description: "EPIC:{epicId} FINAL GATE"
    subagent_type: "aiox-architect"
    prompt: |
      Epic-level sign-off for {epicId}.

      ## Focus
      {execution.final_gate.focus}

      ## Bug Verification Checklist
      {FOR EACH bug in execution.bug_verification:
        Bug {bug.bug}: {bug.description}
        Fixed by: {bug.fixed_by}
        Verify: {bug.verify}
      }

      ## All Waves
      {FOR EACH wave: number, name, stories, gate verdict}

      ## Output
      Verdict: APPROVED or REJECTED
      Bug verification: {checklist with pass/fail per bug}

  IF approved:
    state.status = "completed"
    Tag: {execution.final_gate.tag}

    # Optional: Retrospective
    IF execution.retrospective:
      Display: "Running retrospective..."
      Spawn @{execution.retrospective.agent} for retrospective

  save_state()
  Display final report.

END PROCEDURE
```

---

## Persistência de Estado

O estado é salvo após CADA ação significativa (início de wave, conclusão de story, veredito de gate, checkpoint).

```yaml
# .aiox/epic-{epicId}-state.yaml
epic_state:
  epicId: EPIC-ACT
  execution_plan: docs/stories/epics/epic-activation-pipeline/EPIC-ACT-EXECUTION.yaml
  mode: interactive
  started_at: "2026-02-06T10:00:00Z"
  updated_at: "2026-02-06T14:30:00Z"
  status: active  # active | completed | aborted

  current_wave: 2
  total_waves: 3

  waves:
    1:
      name: "Foundation Fixes"
      status: completed
      tag: wave-1-complete
      stories:
        ACT-1: { status: completed, branch: feat/act-1-greeting-config }
        ACT-2: { status: completed, branch: feat/act-2-user-profile-audit }
        ACT-3: { status: completed, branch: feat/act-3-status-loader-reliability }
        ACT-4: { status: completed, branch: feat/act-4-permission-mode }
    2:
      name: "Unification"
      status: in_progress
      stories:
        ACT-6: { status: in_progress, branch: feat/act-6-unified-pipeline }
    3:
      name: "Intelligence & Governance"
      status: pending
      stories:
        ACT-5: { status: pending }
        ACT-7: { status: pending }
        ACT-8: { status: pending }

  gate_verdicts:
    1: { status: approved, agent: architect, at: "2026-02-06T12:00:00Z" }

  bug_verification:
    1: { verified: true, by: ACT-1 }
    2: { verified: false, pending: ACT-4 }
```

### Retomada Entre Sessões

O arquivo de estado persiste em disco. Para retomar em uma nova sessão do Claude Code:

```
@pm *execute-epic docs/stories/epics/epic-activation-pipeline/EPIC-ACT-EXECUTION.yaml continue
```

O executor carrega o estado, lê `current_wave` e os status das stories, e retoma exatamente de onde parou.

---

## Integração com a Infraestrutura Existente

### development-cycle.yaml (inner loop)
Cada story gera o development-cycle completo:
1. `@po` valida o draft da story
2. `${story.executor}` desenvolve (gerado no terminal)
3. `@dev` self-healing (CodeRabbit, condicional)
4. `${story.quality_gate}` revisa (agente != executor)
5. `@devops` envia (push) o branch + PR
6. `@po` checkpoint (auto-GO em modo wave)

### epic-orchestration.yaml (template)
Fornece o padrão genérico de wave que esta tarefa instancia com os dados específicos do projeto a partir do EXECUTION.yaml.

### po-epic-context.md
Usado pelo @po durante a validação da story para entender as mudanças acumuladas ao longo do epic.

### Wave Executor (wave-executor.js)
O motor em JS pode ser usado para execução programática de waves, se disponível. Esta tarefa fornece a alternativa orientada por IA que funciona sem mudanças de código.

---

## Formato de Saída

Todas as ações produzem saída estruturada:
- Cabeçalho do epic com o progresso
- Status da wave atual
- Detalhe a nível de story
- Próximo comando a executar
- Tempo restante estimado (com base nas avaliações de complexidade)

---

## Comandos Relacionados

- `*create-epic` - Criar um novo epic (PM)
- `*epic-context` - Mostrar o contexto acumulado do epic (PO)
- `*run-workflow development-cycle` - Rodar um único ciclo de story
- `*waves` - Analisar a estrutura de waves de um workflow
- `*status` - Status geral do workflow

---

## Integração de Agentes

Esta tarefa pertence a:
- `@pm` (Morgan/Bob) - Orquestrador principal

Esta tarefa gera:
- `@po` (Pax) - Validação de story, checkpoints
- `@dev` (Dex) - Implementação de story (via development-cycle)
- `@architect` (Aria) - Gates de wave, gate final
- `@devops` (Gage) - Merge de branch, push
- `@qa` (Quinn) - Quality gates (via development-cycle)

---

## Change Log

| Versão | Data | Mudanças |
|---------|------|---------|
| 1.0.0 | 2026-02-06 | Implementação inicial — conecta epic-orchestration + development-cycle |
