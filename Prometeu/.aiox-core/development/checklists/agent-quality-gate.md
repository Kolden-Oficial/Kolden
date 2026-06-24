# Checklist de Quality Gate de Agente

```yaml
checklist:
  id: agent-quality-gate
  version: 4.0.0
  created: 2026-01-30
  updated: 2026-02-04
  purpose: "Validar que as definições de agente atendem ao padrão de qualidade do Hybrid Loader + completude operacional"
  mode: blocking  # Impede a publicação se itens críticos falharem
  architecture: "hybrid-loader"
  new_in_v4: "SC_AGT_004 — Completude Operacional (arquivos de task, templates, checklists, pontuação de maturidade)"
  reference: "aprendizado/32-ANATOMIA-AGENTE-100-PORCENTO-REPLICAVEL.md"
```

---

## Pré-Validação: Básico do Arquivo

```yaml
file_basics:
  - id: min-lines
    check: "O arquivo do agente tem 800+ linhas"
    type: blocking
    validation: "wc -l {file} >= 800"

  - id: yaml-valid
    check: "A sintaxe YAML é válida"
    type: blocking
    validation: "yamllint passes"

  - id: no-placeholders
    check: "Nenhum {{placeholder}} não preenchido restante"
    type: blocking
    validation: "grep '{{' returns empty"
```

---

## Nível 0: Configuração do Loader (Todos Obrigatórios - NOVO)

```yaml
loader_checks:
  - id: activation-notice
    check: "ACTIVATION-NOTICE está presente"
    type: blocking
    section: "top of file"

  - id: ide-file-resolution
    check: "IDE-FILE-RESOLUTION tem um base_path válido"
    type: blocking
    section: "Level 0"
    required_fields:
      - base_path
      - resolution_pattern

  - id: request-resolution
    check: "REQUEST-RESOLUTION tem exemplos de mapeamento"
    type: blocking
    section: "Level 0"

  - id: command-loader-exists
    check: "A seção command_loader existe"
    type: blocking
    section: "Level 0"

  - id: command-loader-complete
    check: "Todo comando com loader != null tem entrada em command_loader"
    type: blocking
    validation: |
      For each command in commands:
        if command.loader != null:
          assert command.name in command_loader

  - id: command-loader-requires
    check: "Cada entrada de command_loader tem um array 'requires'"
    type: blocking
    validation: "command_loader[*].requires is array"

  - id: critical-loader-rule
    check: "CRITICAL_LOADER_RULE está presente"
    type: blocking
    must_contain:
      - "LOOKUP"
      - "STOP"
      - "LOAD"
      - "VERIFY"
      - "EXECUTE"
      - "FAILURE TO LOAD = FAILURE TO EXECUTE"

  - id: dependencies-complete
    check: "dependencies lista todos os arquivos em command_loader.requires"
    type: blocking
    validation: |
      all_required_files = flatten(command_loader[*].requires)
      all_dependency_files = flatten(dependencies[*])
      assert all_required_files is subset of all_dependency_files

  - id: files-exist
    check: "Todos os arquivos em dependencies realmente existem"
    type: recommended
    validation: "ls {base_path}/{file} succeeds for each"
```

---

## Nível 1: Identidade (Todos Obrigatórios)

```yaml
identity_checks:
  - id: agent-name
    check: "agent.name está definido"
    type: blocking
    section: "agent"

  - id: agent-id
    check: "agent.id está em kebab-case"
    type: blocking
    section: "agent"
    pattern: "^[a-z]+(-[a-z]+)*$"

  - id: agent-tier
    check: "agent.tier é 1, 2 ou 3"
    type: blocking
    section: "agent"

  - id: when-to-use
    check: "agent.whenToUse é descritivo (20+ caracteres)"
    type: blocking
    section: "agent"

  - id: persona-complete
    check: "persona tem role, style, identity, focus"
    type: blocking
    section: "persona"

  - id: persona-background
    check: "persona.background tem 3+ parágrafos"
    type: recommended
    section: "persona"
```

---

## Nível 2: Operacional (Todos Obrigatórios)

```yaml
operational_checks:
  - id: core-principles
    check: "core_principles tem de 5 a 9 itens"
    type: blocking
    min: 5
    max: 9

  - id: framework-exists
    check: "operational_frameworks tem pelo menos 1 framework"
    type: blocking
    min: 1

  - id: framework-complete
    check: "Cada framework tem: name, philosophy, steps, examples"
    type: blocking
    required_fields:
      - name
      - philosophy
      - steps
      - examples

  - id: framework-steps
    check: "Cada framework tem 3+ steps com descrições"
    type: blocking
    min_steps: 3

  - id: commands-defined
    check: "commands tem 5+ itens incluindo *help e *exit"
    type: blocking
    min: 5
    required:
      - "*help"
      - "*exit"
```

---

## Nível 3: Voice DNA (Todos Obrigatórios)

```yaml
voice_checks:
  - id: sentence-starters
    check: "voice_dna.sentence_starters tem 5+ padrões"
    type: recommended
    min: 5

  - id: metaphors
    check: "voice_dna.metaphors tem 3+ metáforas"
    type: recommended
    min: 3

  - id: vocabulary-always
    check: "voice_dna.vocabulary.always_use tem 5+ termos"
    type: blocking
    min: 5

  - id: vocabulary-never
    check: "voice_dna.vocabulary.never_use tem 3+ termos"
    type: blocking
    min: 3

  - id: behavioral-states
    check: "voice_dna.behavioral_states tem 2+ estados"
    type: recommended
    min: 2

  - id: signature-phrases
    check: "signature_phrases tem 5+ frases"
    type: recommended
    min: 5
```

---

## Nível 4: Garantia de Qualidade (Todos Obrigatórios)

```yaml
quality_checks:
  - id: output-examples
    check: "output_examples tem 3+ exemplos completos"
    type: blocking
    min: 3
    required_fields:
      - task
      - input
      - output

  - id: anti-patterns-never
    check: "anti_patterns.never_do tem 5+ itens"
    type: blocking
    min: 5

  - id: anti-patterns-flags
    check: "anti_patterns.red_flags_in_input tem 2+ itens"
    type: recommended
    min: 2

  - id: completion-criteria
    check: "completion_criteria.task_done_when está definido"
    type: blocking

  - id: handoff-defined
    check: "completion_criteria.handoff_to tem 1+ handoffs"
    type: blocking
    min: 1

  - id: validation-checklist
    check: "completion_criteria.validation_checklist tem 3+ itens"
    type: recommended
    min: 3

  - id: objection-algorithms
    check: "objection_algorithms tem 3+ objeções com respostas"
    type: recommended
    min: 3
```

---

## Nível 5: Credibilidade (Específico de Domínio)

```yaml
credibility_checks:
  applies_to:
    - copy
    - legal
    - storytelling
    - data

  checks:
    - id: achievements
      check: "authority_proof_arsenal.career_achievements tem 3+ itens"
      type: recommended
      min: 3

    - id: publications
      check: "authority_proof_arsenal.publications está definido"
      type: recommended

    - id: testimonials
      check: "authority_proof_arsenal.testimonials tem 1+ itens"
      type: recommended
      min: 1
```

---

## Completude Operacional (SC_AGT_004 - NOVO)

> **Referência:** `aprendizado/32-ANATOMIA-AGENTE-100-PORCENTO-REPLICAVEL.md`
> **Princípio:** Um agente sem infraestrutura operacional é uma persona sem processo.

```yaml
operational_completeness_checks:
  # ═══════════════════════════════════════════════════════════════
  # ARQUIVOS DE TASK — Todo comando operacional deve ter um arquivo de task
  # ═══════════════════════════════════════════════════════════════

  - id: task-files-exist
    check: "Cada comando operacional tem um arquivo de task correspondente"
    type: blocking
    validation: |
      For each command in commands where loader != null:
        assert file_exists(command_loader[command].requires[0])
    veto_if_fail: "Comando sem arquivo de task = a LLM vai improvisar em cada execução"

  - id: task-files-have-steps
    check: "Cada arquivo de task tem 3+ steps com ações"
    type: blocking
    validation: "count(steps) >= 3 for each task file"
    veto_if_fail: "Task sem steps é decoração, não processo"

  - id: task-files-have-veto
    check: "Cada arquivo de task tem pelo menos 1 condição de veto"
    type: blocking
    validation: "count(veto_conditions) >= 1 for each task file"
    veto_if_fail: "Task sem veto permite que trabalho incompleto passe (PV004)"

  # ═══════════════════════════════════════════════════════════════
  # TEMPLATES — Saídas estruturadas precisam de templates
  # ═══════════════════════════════════════════════════════════════

  - id: templates-exist
    check: "Comandos que produzem saída estruturada têm template"
    type: recommended
    validation: |
      For commands that generate reports/analysis/documents:
        assert template file exists or inline format defined

  - id: templates-have-sections
    check: "Templates definem as seções obrigatórias"
    type: recommended
    validation: "Each template lists mandatory sections"

  # ═══════════════════════════════════════════════════════════════
  # CHECKLISTS — Pelo menos 1 com condições de veto
  # ═══════════════════════════════════════════════════════════════

  - id: checklist-exists
    check: "O agente tem pelo menos 1 checklist operacional"
    type: blocking
    validation: "count(checklists in dependencies) >= 1"
    veto_if_fail: "Sem checklist, não há validação sistemática das saídas"

  - id: checklist-has-blocking
    check: "O checklist tem itens bloqueantes com condições de veto"
    type: recommended
    validation: "Checklist has items with type: blocking"

  # ═══════════════════════════════════════════════════════════════
  # INTEGRIDADE DAS DEPENDÊNCIAS — Tudo que é referenciado existe
  # ═══════════════════════════════════════════════════════════════

  - id: dependencies-files-exist
    check: "TODOS os arquivos listados em dependencies realmente existem em disco"
    type: blocking
    validation: |
      For each file in dependencies.tasks + dependencies.templates + dependencies.checklists:
        assert file_exists("{base_path}/{file}")
    veto_if_fail: "Referenciar arquivos inexistentes = execução de comando quebrada"

  - id: dependencies-match-loader
    check: "Todos os arquivos de command_loader.requires estão em dependencies"
    type: blocking
    validation: |
      required_files = flatten(command_loader[*].requires)
      dependency_files = flatten(dependencies[*])
      assert required_files is subset of dependency_files

  # ═══════════════════════════════════════════════════════════════
  # PONTUAÇÃO DE MATURIDADE
  # ═══════════════════════════════════════════════════════════════

  - id: maturity-score
    check: "Pontuação de maturidade do agente >= 7.0 (Nivel 3)"
    type: blocking
    formula: |
      Score = (identity × 1.0) + (thinking_dna × 1.5) + (voice_dna × 1.5)
            + (output_examples >= 3 × 1.0) + (command_loader × 1.5)
            + (tasks_coverage × 1.5) + (templates × 1.0)
            + (checklists × 0.5) + (data_files × 0.5)
      Max = 10.0
    threshold: 7.0
    levels:
      '0.0-3.9': 'Nivel 1 — Persona only (FAIL)'
      '4.0-6.9': 'Nivel 2 — Frameworks only (CONDITIONAL)'
      '7.0-8.9': 'Nivel 3 — Complete (PASS)'
      '9.0-10.0': 'Nivel 3+ — Integrated (EXCELLENT)'
```

---

## Nível 6: Integração (Todos Obrigatórios)

```yaml
integration_checks:
  - id: tier-position
    check: "integration.tier_position está definido"
    type: blocking

  - id: workflow-position
    check: "integration.workflow_integration.position_in_flow está definido"
    type: blocking

  - id: handoff-from
    check: "integration.workflow_integration.handoff_from tem 1+ itens"
    type: recommended
    min: 1

  - id: handoff-to
    check: "integration.workflow_integration.handoff_to tem 1+ itens"
    type: blocking
    min: 1

  - id: activation-greeting
    check: "activation.greeting está definido e tem 50+ caracteres"
    type: blocking
    min_chars: 50
```

---

## Execução da Validação

### Validação Rápida (CLI)

```bash
# Rodar o quality gate no arquivo do agente
*validate-agent squads/{pack}/agents/{agent}.md
```

### Checklist de Validação Manual

Copie este checklist e preencha:

```markdown
## Quality Gate de Agente: {agent_name}

### Requisitos Bloqueantes (Devem Passar)

**Nível 1: Identidade**
- [ ] agent.name definido
- [ ] agent.id está em kebab-case
- [ ] agent.tier é 1-3
- [ ] agent.whenToUse é descritivo
- [ ] persona completa (role, style, identity, focus)

**Nível 2: Operacional**
- [ ] core_principles tem de 5 a 9 itens
- [ ] operational_frameworks tem 1+ framework
- [ ] Cada framework tem name, philosophy, steps, examples
- [ ] commands tem 5+ itens incluindo *help, *exit

**Nível 3: Voice DNA**
- [ ] vocabulary.always_use tem 5+ termos
- [ ] vocabulary.never_use tem 3+ termos

**Nível 4: Qualidade**
- [ ] output_examples tem 3+ exemplos completos
- [ ] anti_patterns.never_do tem 5+ itens
- [ ] completion_criteria.task_done_when definido
- [ ] completion_criteria.handoff_to tem 1+ itens

**Nível 6: Integração**
- [ ] integration.tier_position definido
- [ ] workflow_integration.position_in_flow definido
- [ ] handoff_to tem 1+ itens
- [ ] activation.greeting definido (50+ caracteres)

**Completude Operacional (SC_AGT_004)**
- [ ] Existe arquivo de task para cada comando operacional
- [ ] Cada arquivo de task tem 3+ steps
- [ ] Cada arquivo de task tem 1+ condições de veto
- [ ] Pelo menos 1 checklist com itens bloqueantes
- [ ] TODOS os arquivos de dependência existem em disco
- [ ] command_loader.requires corresponde a dependencies
- [ ] Pontuação de maturidade >= 7.0

### Requisitos Recomendados (Deveriam Passar)

- [ ] persona.background tem 3+ parágrafos
- [ ] sentence_starters tem 5+ padrões
- [ ] metaphors tem 3+ metáforas
- [ ] behavioral_states tem 2+ estados
- [ ] signature_phrases tem 5+ frases
- [ ] red_flags_in_input tem 2+ itens
- [ ] validation_checklist tem 3+ itens
- [ ] objection_algorithms tem 3+ objeções
- [ ] O arquivo do agente tem 800+ linhas
- [ ] Existem templates para os tipos de saída estruturada
- [ ] Checklists têm itens bloqueantes com condições de veto

### Específico de Domínio (Se Aplicável)

Para Copy/Legal/Storytelling/Data:
- [ ] authority_proof_arsenal.achievements tem 3+ itens
- [ ] publications definido
- [ ] testimonials tem 1+ itens

### Resultado

**Bloqueante:** ___/24 passaram
**Recomendado:** ___/11 passaram
**Pontuação de Maturidade:** ___/10
**Nível de Maturidade:** Nivel ___
**Pontuação Total:** ___%

**Decisão:** [ ] PASS - Pronto para publicação (Nivel 3+)
              [ ] CONDITIONAL - Passar com lacunas documentadas (Nivel 2)
              [ ] FAIL - Deve corrigir itens bloqueantes (Nivel 1)
```

---

## Pontuação

| Pontuação | Resultado | Ação |
|-------|--------|--------|
| 100% Bloqueante + 80%+ Recomendado | EXCELLENT | Publicar |
| 100% Bloqueante + 50-79% Recomendado | GOOD | Publicar com observação |
| 100% Bloqueante + <50% Recomendado | CONDITIONAL | Documentar lacunas, publicar |
| <100% Bloqueante | FAIL | Corrigir antes de publicar |

---

## Integração com o Workflow

Este checklist é invocado automaticamente em:

```
research-then-create-agent workflow
    ↓
[Fase 6: Extração de Frameworks]
    ↓
[Fase 7: Definição do Agente]
    ↓
[Fase 8: QUALITY GATE] ← ESTE CHECKLIST
    ↓
    ├── PASS → Continuar para a criação de tasks
    └── FAIL → Voltar para corrigir os problemas
```

---

**Versão:** 4.0.0
**Criado:** 2026-01-30
**Atualizado:** 2026-02-04
**Padrão:** AIOX Agent Quality Level + Completude Operacional
**Changelog:**
- v4.0: Adicionado SC_AGT_004 (Completude Operacional), pontuação de maturidade, validação de task/template/checklist
- v3.0: Adicionadas as verificações de loader do Nível 0
- v2.0: Arquitetura inicial do hybrid loader
