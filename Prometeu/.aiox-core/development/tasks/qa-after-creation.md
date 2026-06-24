# Task: QA Após Criação

**Task ID:** qa-after-creation
**Version:** 2.0.0
**Propósito:** Verificação automática de garantia de qualidade após a criação de squad/componente (inclui completude operacional)
**Orchestrator:** @squad-architect
**Modo:** Automático (disparado por tasks de criação)

**Especialista de Processo:** @pedro-valerio
**Orientação do Especialista:**

- Use os princípios de Process Absolutism para validação
- Defina condições de VETO que BLOQUEIAM, não apenas avisam
- Para validação de workflow/processo, invoque: `@pedro-valerio *audit`
- Para projetar quality gates, invoque: `@pedro-valerio *design-heuristic`

**Filosofia Central:**

```text
Every created component must pass QA before being considered complete.
QA is not optional - it's the final gate before delivery.
Find problems NOW, not when the user tries to use it.
```

---

## Quando Esta Task Roda

Esta task é disparada automaticamente após:

| Task Disparadora   | O Que Foi Criado | Escopo do QA             |
| ------------------ | ---------------- | ------------------------ |
| `*create-squad`    | Novo squad       | Validação completa do squad |
| `*create-agent`    | Novo agente      | Validação apenas do agente |
| `*create-task`     | Nova task        | Validação apenas da task |
| `*create-workflow` | Novo workflow    | Validação apenas do workflow |
| `*create-template` | Novo template    | Validação apenas do template |

---

## Entradas

```yaml
inputs:
  created_component:
    type: string
    required: true
    description: 'Path to created component'
    example: 'squads/my-squad/'

  component_type:
    type: enum
    required: true
    values: ['squad', 'agent', 'task', 'workflow', 'template']
    description: 'Type of component created'

  creation_task:
    type: string
    required: false
    description: 'Task that triggered this QA'
    example: 'create-squad'

  auto_fix:
    type: boolean
    default: false
    description: 'Attempt to auto-fix minor issues'
```

---

## Fluxo de QA

```text
TRIGGER (component created)
    ↓
[PHASE 1: QUICK CHECKS]
    → File exists
    → Valid YAML/MD syntax
    → Required fields present
    → 5 seconds max
    ↓
[PHASE 2: SECURITY SCAN]
    → Run SEC-001 to SEC-018
    → Any BLOCKING = STOP
    → Report vulnerabilities
    → 10 seconds max
    ↓
[PHASE 3: STRUCTURE VALIDATION]
    → Cross-references valid
    → Dependencies exist
    → Template conformance
    → 15 seconds max
    ↓
[PHASE 4: QUALITY SCORING]
    → Run validate-squad (if squad)
    → Calculate score
    → Generate report
    → 30 seconds max
    ↓
[PHASE 5: REPORT & ACTION]
    → Pass: Confirm completion
    → Warn: List issues, allow proceed
    → Fail: Block, require fixes
    ↓
OUTPUT: QA Report + Pass/Fail
```

---

## FASE 1: Verificações Rápidas

**Duração:** < 5 segundos
**Bloqueante:** Sim

```yaml
quick_checks:
  - id: 'QC-001'
    check: 'Component file/directory exists'
    action: 'ls {created_component}'
    on_fail: 'ABORT - Component not found at path'

  - id: 'QC-002'
    check: 'Valid YAML syntax (if .yaml/.yml)'
    action: 'python -c ''import yaml; yaml.safe_load(open("{file}"))'''
    on_fail: 'ABORT - Invalid YAML syntax'

  - id: 'QC-003'
    check: 'Valid Markdown syntax (if .md)'
    action: 'Check for unclosed code blocks, broken headers'
    on_fail: 'WARN - Markdown formatting issues'

  - id: 'QC-004'
    check: 'Required metadata present'
    fields:
      squad: ['name', 'version', 'description', 'entry_agent']
      agent: ['agent.name', 'agent.id', 'persona', 'commands']
      task: ['Task ID', 'Version', 'Purpose', 'Inputs', 'Outputs']
      workflow: ['Workflow ID', 'Version', 'Phases']
    on_fail: 'ABORT - Missing required field: {field}'
```

---

## FASE 2: Varredura de Segurança

**Duração:** < 10 segundos
**Bloqueante:** Sim (para severidade HIGH)

```yaml
security_scan:
  description: 'Run comprehensive security checks'
  reference: 'qa-security-checklist.md'

  checks:
    # HIGH severity - BLOCKING
    high_severity:
      - 'SEC-001 to SEC-004: API keys & tokens'
      - 'SEC-005 to SEC-008: Cloud credentials'
      - 'SEC-009 to SEC-010: Private keys'
      - 'SEC-011 to SEC-012: Database URLs'
      - 'SEC-013 to SEC-015: Sensitive files'

    # MEDIUM severity - WARNING
    medium_severity:
      - 'SEC-016 to SEC-018: Code vulnerabilities'

  actions:
    on_high_found: 'ABORT - Security vulnerability found'
    on_medium_found: 'WARN - Review recommended'

  scan_command: |
    # Run all security patterns
    grep -rE "(api[_-]?key|secret|password|bearer|jwt)\\s*[:=]\\s*['\"][^'\"${}]{8,}" {created_component} || true
    grep -rE "AKIA[A-Z0-9]{16}" {created_component} || true
    grep -rE "(postgres|mysql|mongodb)://[^:]+:[^@]+@" {created_component} || true
    grep -rE "-----BEGIN.*PRIVATE KEY-----" {created_component} || true
    find {created_component} -name ".env*" -o -name "*.pem" -o -name "credentials*.json" 2>/dev/null || true
```

---

## FASE 3: Validação de Estrutura

**Duração:** < 15 segundos
**Bloqueante:** Sim (para dependências ausentes)

```yaml
structure_validation:
  for_squad:
    - check: 'config.yaml exists'
    - check: 'Entry agent exists'
    - check: 'All handoff_to targets exist'
    - check: 'All task references valid'
    - check: 'All template references valid'
    - check: 'All checklist references valid'
    - check: 'No orphan files (optional)'

  for_agent:
    - check: 'activation-instructions present'
    - check: 'commands section present'
    - check: 'All dependencies exist'
    - check: 'handoff_to targets exist (if any)'

  for_task:
    - check: 'All 8 Task Anatomy fields present'
    - check: 'Referenced templates exist'
    - check: 'Referenced checklists exist'
    - check: 'Inputs have types defined'
    - check: 'Outputs have paths defined'

  for_workflow:
    - check: 'All phases have tasks'
    - check: 'Task references valid'
    - check: 'No sequence collisions'
    - check: 'Output→Input chain valid'
```

---

## FASE 4: Pontuação de Qualidade

**Duração:** < 30 segundos
**Bloqueante:** Não (pontuação reportada)

```yaml
quality_scoring:
  for_squad:
    action: 'Run validate-squad {squad_name}'
    extract:
      - tier_1_result
      - tier_2_result
      - tier_3_score
      - tier_4_score
      - final_score
      - veto_triggered

  for_agent:
    criteria:
      - name: 'Persona completeness'
        weight: 0.15
        checks: ['role', 'style', 'identity', 'focus']

      - name: 'Commands functionality'
        weight: 0.15
        checks: ['*help exists', 'commands map to capabilities']

      - name: 'Voice consistency'
        weight: 0.10
        checks: ['voice_dna present (if Expert)', 'vocabulary used']

      - name: 'Examples quality'
        weight: 0.10
        checks: ['output_examples present', 'realistic']

      - name: 'Dependencies valid'
        weight: 0.10
        checks: ['all references exist']

      - name: 'Documentation'
        weight: 0.10
        checks: ['whenToUse clear', 'description helpful']

      - name: 'Operational completeness (SC_AGT_004)'
        weight: 0.30
        checks:
          - 'command_loader exists and maps all operational commands'
          - 'Task file exists for each command in command_loader.requires'
          - 'Each task file has 3+ steps and 1+ veto conditions'
          - 'At least 1 checklist with blocking items exists'
          - 'All files in dependencies exist on disk'
          - 'CRITICAL_LOADER_RULE present in agent'
        reference: 'aprendizado/32-ANATOMIA-AGENTE-100-PORCENTO-REPLICAVEL.md'
        maturity_levels:
          nivel_1: 'Score 0-4 — Persona only (decorative)'
          nivel_2: 'Score 4-7 — Frameworks (functional but inconsistent)'
          nivel_3: 'Score 7-9 — Complete (deterministic)'
          nivel_3_plus: 'Score 9-10 — Complete + integrated'

  for_task:
    criteria:
      - name: 'Task Anatomy complete'
        weight: 0.25
        checks: ['8 required fields']

      - name: 'Prompt quality'
        weight: 0.25
        checks: ['specific', 'examples', 'anti-patterns']

      - name: 'Validation defined'
        weight: 0.20
        checks: ['success criteria', 'failure handling']

      - name: 'Integration'
        weight: 0.15
        checks: ['references valid', 'outputs defined']

      - name: 'Documentation'
        weight: 0.15
        checks: ['purpose clear', 'usage examples']

  thresholds:
    pass: '>=7.0'
    conditional: '>=5.0 and <7.0'
    fail: '<5.0'
```

---

## FASE 5: Relatório e Ação

**Duração:** < 5 segundos

### Formato do Relatório

```yaml
qa_report:
  header:
    component: "{path}"
    type: "{type}"
    created_by: "{creation_task}"
    qa_date: "{timestamp}"
    qa_version: "1.0.0"

  summary:
    result: "PASS | CONDITIONAL | FAIL"
    score: "X.X/10"
    maturity_level: "Nivel N (description)"
    maturity_score: "X.X/10"
    issues_found: N
    security_issues: N

  quick_checks:
    passed: N
    failed: N
    details: [...]

  security_scan:
    high_severity: N
    medium_severity: N
    findings: [...]

  structure_validation:
    valid: true/false
    missing_references: [...]
    orphan_files: [...]

  quality_score:
    final: X.X
    breakdown:
      criteria_1: X.X
      criteria_2: X.X
      ...

  operational_completeness:
    maturity_score: X.X
    maturity_level: "Nivel N"
    command_loader: "present | missing"
    task_files: "N/N commands covered"
    templates: "N types covered"
    checklists: "N with veto conditions"
    critical_loader_rule: "present | missing"
    dependencies_integrity: "all exist | N missing"

  issues:
    blocking:
      - issue: "..."
        location: "..."
        fix: "..."
    warnings:
      - issue: "..."
        fix: "..."

  recommendation:
    action: "PROCEED | FIX_REQUIRED | REVIEW"
    message: "..."
```

### Ações Baseadas no Resultado

```yaml
actions:
  on_pass:
    score: '>= 7.0'
    security: '0 HIGH'
    maturity: '>= Nivel 3'
    action:
      - 'Log success'
      - 'Mark component as validated'
      - "Report: '✅ QA PASSED: {component} (Score: {score}, Maturity: Nivel {N})'"

  on_conditional:
    score: '>= 5.0 and < 7.0'
    security: '0 HIGH'
    maturity: 'Nivel 2'
    action:
      - 'Log warnings'
      - "Report: '⚠️ QA CONDITIONAL: {component} (Score: {score}, Maturity: Nivel {N})'"
      - 'List issues to fix'
      - 'List missing operational files (tasks, templates, checklists)'
      - "Ask: 'Proceed anyway? Issues found: {count}. Missing operational files: {list}'"

  on_fail:
    score: '< 5.0'
    or_security: '>= 1 HIGH'
    or_maturity: 'Nivel 1'
    action:
      - 'Log failure'
      - "Report: '❌ QA FAILED: {component} (Maturity: Nivel {N} — persona only)'"
      - 'List blocking issues'
      - 'List missing operational infrastructure'
      - "Block: 'Cannot proceed. Agent is Nivel {N} (target: Nivel 3). Fix {count} blocking issues.'"
      - "Offer: 'Return to create-agent Phase 5 to generate operational infrastructure'"
```

---

## Integração com Tasks de Criação

### Como Disparar o QA

Adicione ao final das tasks de criação:

```yaml
# In create-squad.md, create-agent.md, etc.
post_creation:
  - action: 'Run QA'
    task: 'qa-after-creation'
    params:
      created_component: '{output_path}'
      component_type: 'squad' # or agent, task, etc.
      creation_task: '{current_task}'
```

### Exemplo de Fluxo

```text
User: *create-squad my-new-squad
    ↓
[create-squad executes]
    → Creates squads/my-new-squad/
    → Creates config.yaml, README.md
    → Creates agents/orchestrator.md
    ↓
[qa-after-creation auto-triggers]
    → Quick checks: PASS
    → Security scan: PASS
    → Structure: PASS
    → Quality: 7.8/10
    ↓
Output: "✅ Squad 'my-new-squad' created and validated (Score: 7.8/10)"
```

---

## Uso via CLI

```bash
# Auto-triggered (normal flow)
# QA runs automatically after creation

# Manual trigger
@squad-architect
*qa-after-creation squads/my-squad/ --type=squad

# Check specific component
*qa-after-creation squads/my-squad/agents/my-agent.md --type=agent

# With auto-fix attempt
*qa-after-creation squads/my-squad/ --type=squad --auto-fix
```

---

## Saídas

| Saída            | Localização                            | Descrição          |
| ---------------- | -------------------------------------- | ------------------ |
| Relatório de QA  | Console                                | Feedback imediato  |
| Arquivo de Relatório | `{component}/docs/qa-report-{date}.md` | Relatório detalhado |
| Selo de Validação | `{component}/docs/VALIDATED.md`        | Se aprovado        |

---

## Tasks Relacionadas

| Task             | Propósito                                   |
| ---------------- | ------------------------------------------- |
| `validate-squad` | Validação completa do squad (chamada por esta task) |
| `create-squad`   | Dispara esta task ao concluir               |
| `create-agent`   | Dispara esta task ao concluir               |
| `fix-issues`     | Tentar corrigir problemas de QA             |

---

## Changelog

```yaml
v2.0.0 (2026-02-04):
  - NEW: Operational Completeness check (SC_AGT_004) in quality scoring
  - NEW: Maturity level reporting (Nivel 1/2/3) for agents
  - NEW: Operational infrastructure validation (command_loader, tasks, templates, checklists)
  - CHANGED: Agent scoring weights redistributed (operational = 0.30)
  - CHANGED: Report format includes maturity_level and operational_completeness
  - CHANGED: Fail condition includes Nivel 1 maturity as blocking
  - Reference: aprendizado/32-ANATOMIA-AGENTE-100-PORCENTO-REPLICAVEL.md

v1.0.0 (2026-02-01):
  - Initial task
  - 5-phase QA flow
  - Security scan integration (SEC-001 to SEC-018)
  - Auto-trigger from creation tasks
  - Score thresholds (7.0 pass, 5.0 conditional)
```

---

_Versão da Task: 2.0.0_
_Filosofia: Nenhum componente é entregue sem QA. Nenhum agente é entregue sem infraestrutura operacional._
_Disparada por: create-squad, create-agent, create-task, create-workflow_
