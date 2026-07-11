---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Task: Create Squad Agent (Criar Agente de Squad)

**Task ID:** create-agent
**Versão:** 3.0
**Propósito:** Criar um único agente específico de domínio por meio de pesquisa, elicitação, validação e infraestrutura operacional
**Orquestrador:** @squad-architect
**Especialista de DNA:** @oalanicolas
**Especialista de Processo:** @pedro-valerio
**Modo:** Research-first (nunca criar sem pesquisa)
**Padrão de Qualidade:** Nível AIOX (300+ linhas, voice_dna, output_examples, command_loader, arquivos de task)

**Especialistas:**

- **@oalanicolas** → Invoque para extração de DNA (Voice DNA, Thinking DNA, curadoria de fontes)
  - Use `*extract-dna {specialist}` para a extração completa de DNA Mental™
  - Use `*assess-sources` para classificar as fontes como ouro vs bronze
  - Consulte quando a voz do agente parecer genérica ou inautêntica

**Frameworks Usados:**

- `data/tier-system-framework.md` → Classificação de tier do agente (Fase 2)
- `data/quality-dimensions-framework.md` → Validação do agente (Fase 4)
- `data/decision-heuristics-framework.md` → Lógica do quality gate (Fase 4)

---

## Passo 0: Verificação no Registro IDS (Consultivo)

Antes de prosseguir, verifique o Entity Registry em busca de artefatos existentes:

1. Extraia as palavras-chave de intenção do pedido do usuário
2. Execute `FrameworkGovernor.preCheck(intent, 'agent')`
3. Se houver correspondência REUSE (>=90% de relevância):
   - Exiba a correspondência e pergunte ao usuário: "Agente existente encontrado. REUSE em vez de criar um novo?"
4. Se houver correspondência ADAPT (60-89%):
   - Exiba o candidato a adaptação: "Existe um agente similar. ADAPT em vez de criar um novo?"
5. Se for CREATE (sem correspondência ou o usuário escolher):
   - Registre a decisão com justificativa e prossiga para o Passo 1
6. Se o IDS estiver indisponível (timeout/erro): Avise e prossiga normalmente

**NOTA:** Este passo é consultivo e NÃO bloqueia a criação. O usuário sempre tem a decisão final.

---

## Visão Geral

Esta task cria um único agente de alta qualidade com base em metodologias pesquisadas de uma mente de elite. O insight-chave: **agentes criados sem pesquisa são fracos e genéricos**.

**Mudanças da v3.0:**

- NOVO: Fase 5 — Infraestrutura Operacional (command_loader, tasks, templates, checklists)
- NOVO: Fase 6 — Validação Operacional (SC_AGT_004, pontuação de maturidade)
- NOVO: Níveis de maturidade (Nível 1/2/3) com fórmula de pontuação
- NOVO: @pedro-valerio como referência de Especialista de Processo
- Os agentes agora devem ser entregues com arquivos operacionais, não apenas a persona
- Referência: `aprendizado/32-ANATOMIA-AGENTE-100-PORCENTO-REPLICAVEL.md`

**Mudanças da v2.0:**

- Verificação obrigatória de pesquisa antes da criação
- Estrutura baseada em FASES com checkpoints
- O quality gate SC_AGT_001 deve passar
- Todos os agentes devem ter voice_dna, output_examples, objection_algorithms

```text
INPUT (agent_purpose + domain + [specialist])
    ↓
[PHASE 0: CONTEXT]
    → Identificar o pack alvo
    → Verificar se é baseado em especialista ou genérico
    ↓
[PHASE 1: RESEARCH]
    → Verificar o conhecimento local (se especialista)
    → Gerar o prompt de pesquisa
    → Executar pesquisa profunda
    ↓
[PHASE 2: EXTRACTION]
    → Extrair o framework da pesquisa
    → Classificar o tier
    → Definir a persona
    ↓
[PHASE 3: CREATION]
    → Gerar o agente usando o template
    → Incluir todos os 6 níveis
    → Aplicar voice_dna
    ↓
[PHASE 4: VALIDATION]
    → Executar o quality gate SC_AGT_001
    → Corrigir problemas bloqueantes
    → Salvar o arquivo do agente
    ↓
[PHASE 5: OPERATIONAL INFRASTRUCTURE]  ← NOVO
    → Gerar o command_loader
    → Criar stubs de task por comando
    → Criar stubs de template por tipo de saída
    → Criar checklist com condições de veto
    → Atualizar o agente com a infraestrutura de Nível 0
    ↓
[PHASE 6: OPERATIONAL VALIDATION]  ← NOVO
    → Validar que todos os arquivos existem
    → Validar a qualidade da task (passos + veto)
    → Calcular a pontuação de maturidade (meta >= 7.0)
    ↓
[PHASE 7: HANDOFF]
    → Apresentar o resumo com o status operacional
    → Documentar os próximos passos
    ↓
OUTPUT: Arquivo do agente + Arquivos operacionais + Quality Gate PASS + Pontuação de Maturidade
```

---

## Entradas

| Parâmetro         | Tipo   | Obrigatório | Descrição                              | Exemplo                |
| ----------------- | ------ | ----------- | -------------------------------------- | ---------------------- |
| `agent_purpose`   | string | Sim         | O que o agente deve fazer              | `"Create sales pages"` |
| `domain`          | string | Sim         | Domínio/área de expertise              | `"copywriting"`        |
| `specialist_slug` | string | Não         | Se baseado em especialista humano (snake_case) | `"gary_halbert"`       |
| `specialist_name` | string | Não         | Nome legível                           | `"Gary Halbert"`       |
| `pack_name`       | string | Sim         | Squad alvo                             | `"copy"`               |

---

## Pré-condições

- [ ] O pack alvo existe em `squads/{pack_name}/`
- [ ] O agente squad-architect está ativo
- [ ] Ferramenta WebSearch disponível (para pesquisa)
- [ ] Permissões de escrita para `squads/{pack_name}/agents/`

---

## FASE 0: CONTEXT (Contexto)

**Duração:** < 1 minuto
**Checkpoint:** Nenhum (validação rápida)
**Modo:** Automático

### Passo 0.1: Identificar o Pack Alvo

**Ações:**

```yaml
identify_pack:
  validation:
    - check_path: 'squads/{pack_name}/'
    - check_exists: true
    - load_config: 'config.yaml'

  on_not_exists:
    option_1: 'Create squad first with *create-squad'
    option_2: 'Create agent standalone (not recommended)'
```

**Ponto de Decisão:**

```text
IF pack_name provided AND pack exists:
    → PROCEED
ELSE IF pack_name provided AND NOT exists:
    → ASK: "Pack doesn't exist. Create it first?"
ELSE:
    → ASK: "Which pack should this agent belong to?"
```

### Passo 0.2: Classificar o Tipo de Agente

**Ações:**

```yaml
classify_agent_type:
  if_specialist_provided:
    agent_type: 'specialist_based'
    research_path: 'outputs/minds/{specialist_slug}/'
    next_step: 'Check local knowledge'

  if_no_specialist:
    agent_type: 'generic'
    warning: 'Generic agents are weaker. Consider researching a specialist.'
    next_step: 'Generate research prompt for domain experts'
```

**Saída (FASE 0):**

```yaml
phase_0_output:
  pack_name: 'copy'
  pack_path: 'squads/copy/'
  agent_type: 'specialist_based'
  specialist:
    slug: 'gary_halbert'
    name: 'Gary Halbert'
  agent_id: 'gary-halbert' # derived
```

---

## FASE 1: RESEARCH (Pesquisa)

**Duração:** 5-15 minutos
**Checkpoint:** SC_RES_002 (Qualidade da Pesquisa do Agente)
**Modo:** Autônomo

### Passo 1.1: Verificar o Conhecimento Local (Se Especialista)

**Condição:** Apenas se `agent_type == "specialist_based"`

**Ações:**

```yaml
check_local_knowledge:
  search_paths:
    primary_sources:
      path: 'outputs/minds/{specialist_slug}/sources/'
      description: 'Raw materials, transcripts, books, articles'
      priority: 1

    analysis:
      path: 'outputs/minds/{specialist_slug}/analysis/'
      description: 'Identity core, cognitive spec, frameworks'
      priority: 2

    existing_research:
      path: 'docs/research/{specialist_slug}-*.md'
      description: 'Previous deep research documents'
      priority: 3

  evaluation:
    coverage_score: '0-100% based on files found'
    gap_identification: "What's missing for agent_purpose?"
```

**Ponto de Decisão:**

```text
IF coverage >= 70%:
    → "Sufficient local material. Supplement gaps only."
    → research_mode = "supplement"
ELSE IF coverage >= 30%:
    → "Partial material. Need moderate research."
    → research_mode = "moderate"
ELSE:
    → "Limited local material. Full research needed."
    → research_mode = "full"
```

### Passo 1.2: Gerar o Prompt de Pesquisa

**Ações:**

```yaml
generate_research_prompt:
  template: 'templates/research-prompt-tmpl.md'

  variables:
    specialist_name: '{specialist_name}'
    domain: '{domain}'
    agent_purpose: '{agent_purpose}'
    existing_coverage: '{coverage_summary}'
    gaps_to_fill: '{identified_gaps}'

  output_format:
    primary_queries: '3-5 specific search queries'
    focus_areas: 'What to extract'
    validation_criteria: 'How to know research is sufficient'
```

**Exemplo de Prompt de Pesquisa:**

```yaml
research_prompt:
  subject: "Gary Halbert's Sales Page Methodology"
  context: |
    Creating an agent for writing sales pages based on Gary Halbert's methodology.
    Have 70% coverage from local sources (newsletters, books).
    Missing: specific sales page structure, digital adaptation techniques.

  queries:
    - 'Gary Halbert sales page structure template'
    - 'Gary Halbert long-form copy formula'
    - 'Gary Halbert AIDA application direct mail'

  extract:
    - Step-by-step sales page process
    - Specific headline formulas
    - Body copy structure
    - Call-to-action patterns
    - Quality criteria from his own writings
```

### Passo 1.3: Executar Pesquisa Profunda

**Ações:**

```yaml
execute_research:
  method: 'WebSearch + Local Synthesis'

  process:
    for_each_query:
      - execute_search
      - filter_primary_sources
      - extract_relevant_content
      - cite_source

  quality_criteria:
    min_unique_sources: 5
    min_lines_extracted: 500
    requires_primary_sources: true
    max_inference_ratio: 0.20 # 80%+ must be cited

  output:
    file: 'docs/research/{specialist_slug}-{purpose}-research.md'
    sections:
      - sources_used
      - extracted_methodology
      - key_frameworks
      - gaps_remaining
```

**Checkpoint SC_RES_002:**


```yaml
heuristic_id: SC_RES_002
name: 'Agent Research Quality'
blocking: true
criteria:
  - sources_count >= 5
  - lines_extracted >= 500
  - has_primary_sources: true
  - methodology_extracted: true

veto_conditions:
  - sources_count < 3 → "Insufficient sources"
  - no_methodology_found → "Cannot create agent without methodology"
```

**Saída (FASE 1):**

```yaml
phase_1_output:
  research_file: 'docs/research/gary_halbert-sales-page-research.md'
  sources_used: 8
  lines_extracted: 720
  coverage_after: 92%
  checkpoint_status: 'PASS'
```

---

## FASE 2: EXTRACTION (Extração)

**Duração:** 5-10 minutos
**Checkpoint:** Nenhum (validação interna)
**Modo:** Autônomo

### Passo 2.1: Extrair o Framework da Pesquisa

**Ações:**

```yaml
extract_framework:
  sections_to_extract:
    core_principles:
      description: 'Fundamental beliefs and values'
      min_items: 5
      max_items: 10

    operational_framework:
      description: 'Step-by-step methodology'
      includes:
        - process_steps
        - decision_criteria
        - quality_checks
        - common_patterns

    voice_dna:
      description: 'How this expert communicates'
      includes:
        - sentence_starters (categorized)
        - metaphors (5+)
        - vocabulary_always_use (8+)
        - vocabulary_never_use (5+)
        - emotional_states (3+)

    anti_patterns:
      description: 'What this expert warns against'
      includes:
        - never_do (5+)
        - always_do (5+)

    output_examples:
      description: "Real examples from the expert's work"
      min_count: 3
      format: 'input → output'
```

### Passo 2.2: Classificar o Tier

**Aplicar: tier-system-framework.md**

**Ações:**

```yaml
classify_tier:
  decision_tree:
    - IF agent performs diagnosis/analysis FIRST:
        tier: 0
        rationale: 'Foundation agent - must run before execution'

    - ELSE IF agent is primary expert with documented results:
        tier: 1
        rationale: 'Master with proven track record'

    - ELSE IF agent created frameworks others use:
        tier: 2
        rationale: 'Systematizer - thought leader'

    - ELSE IF agent specializes in specific format/channel:
        tier: 3
        rationale: 'Format specialist'

    - ELSE IF agent is validation/checklist tool:
        tier: 'tools'
        rationale: 'Utility agent'

  output:
    tier: 1
    rationale: 'Gary Halbert has documented $1B+ results, original methodology'
```

### Passo 2.3: Definir a Persona

**Ações:**

```yaml
define_persona:
  agent_identity:
    name: '{specialist_name}'
    id: '{specialist_slug converted to kebab-case}'
    title: 'Expert in {agent_purpose}'
    icon: '{appropriate emoji}'
    whenToUse: 'Use when {use_case_description}'

  persona_characteristics:
    role: 'Extracted from research'
    style: 'Derived from voice_dna'
    identity: 'Core essence'
    focus: 'Primary objective'

  customization:
    - 'Domain-specific behaviors'
    - 'Special rules from methodology'
    - 'Integration points'
```

**Saída (FASE 2):**

```yaml
phase_2_output:
  core_principles: 7
  operational_steps: 9
  voice_dna_complete: true
  anti_patterns: 12
  output_examples: 4
  tier: 1
  persona_defined: true
```

---

## FASE 3: CREATION (Criação)

**Duração:** 5-10 minutos
**Checkpoint:** Nenhum (validação na Fase 4)
**Modo:** Autônomo

### Passo 3.1: Gerar o Agente Usando o Template

**Template:** `templates/squad/agent-template.md`

**Ações:**

```yaml
generate_agent:
  template: 'templates/squad/agent-template.md'

  required_sections:
    # Level 1: Identity
    activation_notice: 'Standard AIOX header'
    ide_file_resolution: 'Dependency mapping'
    activation_instructions: 'Step-by-step activation'
    agent_metadata: 'name, id, title, icon, whenToUse'
    persona: 'role, style, identity, focus'

    # Level 2: Operational
    core_principles: '5-10 principles from research'
    commands: 'Available commands'
    quality_standards: 'From extracted methodology'
    security: 'Code generation, validation, memory'
    dependencies: 'tasks, templates, checklists, data'
    knowledge_areas: 'Expertise domains'
    capabilities: 'What agent can do'

    # Level 3: Voice DNA
    voice_dna:
      sentence_starters: 'Categorized by mode'
      metaphors: '5+ domain metaphors'
      vocabulary:
        always_use: '8+ terms'
        never_use: '5+ terms'
      emotional_states: '3+ states with markers'

    # Level 4: Quality
    output_examples: '3+ real examples'
    objection_algorithms: '4+ common objections'
    anti_patterns: 'never_do (5+), always_do (5+)'
    completion_criteria: 'By task type'

    # Level 5: Credibility (if specialist)
    credibility:
      achievements: 'Documented results'
      notable_work: 'Key contributions'
      influence: 'Who learned from them'

    # Level 6: Integration
    handoff_to: '3+ handoff scenarios'
    synergies: 'Related agents/workflows'
```

### Passo 3.2: Aplicar o Voice DNA

**Ações:**

```yaml
apply_voice_dna:
  ensure_consistency:
    - All output_examples use vocabulary.always_use
    - No output_examples use vocabulary.never_use
    - Sentence starters match emotional_states
    - Metaphors appear in examples

  validation:
    vocabulary_consistency: 'Check all sections'
    tone_consistency: 'Match persona style'
```

### Passo 3.3: Adicionar os Critérios de Conclusão

**Ações:**

```yaml
add_completion_criteria:
  per_task_type:
    primary_task:
      - 'List specific criteria for main task'
      - 'Include quality checks'
      - 'Define deliverables'

    secondary_tasks:
      - 'Criteria for each additional task'

  format:
    task_name:
      - 'Criterion 1'
      - 'Criterion 2'
      - '...'
```

**Saída (FASE 3):**

```yaml
phase_3_output:
  agent_file_content: '...'
  lines: 750
  sections_complete: 6/6
  voice_dna_applied: true
```

---

## FASE 4: VALIDATION (Validação)

**Duração:** 2-5 minutos
**Checkpoint:** SC_AGT_001 (Quality Gate do Agente)
**Modo:** Autônomo com retry

### Passo 4.1: Executar o Quality Gate SC_AGT_001

**Checklist:** `checklists/agent-quality-gate.md`

**Ações:**

```yaml
run_quality_gate:
  heuristic_id: SC_AGT_001
  name: "Agent Quality Gate"
  blocking: true

  blocking_requirements:
    lines: ">= 300"
    voice_dna:
      vocabulary_always_use: ">= 5 items"
      vocabulary_never_use: ">= 3 items"
    output_examples: ">= 3"
    anti_patterns_never_do: ">= 5"
    completion_criteria: "defined"
    handoff_to: "defined"

  scoring:
    | Dimension | Weight | Check |
    |-----------|--------|-------|
    | Structure | 0.20 | All 6 levels present |
    | Voice DNA | 0.20 | Complete with vocabulary |
    | Examples | 0.20 | Real, not generic |
    | Anti-patterns | 0.15 | Specific to domain |
    | Integration | 0.15 | Handoffs defined |
    | Research | 0.10 | Traceable to sources |

  threshold: 7.0
  veto_conditions:
    - lines < 300 → "Agent too short"
    - no_voice_dna → "Missing voice consistency"
    - examples < 3 → "Insufficient examples"
```

**Ponto de Decisão:**

```text
IF all blocking requirements pass AND score >= 7.0:
    → PROCEED to Step 4.3
ELSE:
    → Log specific failures
    → GOTO Step 4.2 (Fix Issues)
```

### Passo 4.2: Corrigir os Problemas Bloqueantes

**Ações:**

```yaml
fix_blocking_issues:
  for_each_failure:
    - identify: "What's missing"
    - source: 'Where to get it'
    - fix: 'Add the content'

  common_fixes:
    lines_short:
      - 'Expand core_principles with detail'
      - 'Add more output_examples'
      - 'Expand objection_algorithms'

    missing_voice_dna:
      - 'Extract from research'
      - 'Add vocabulary lists'
      - 'Define emotional states'

    few_examples:
      - 'Extract from source material'
      - 'Create based on methodology'
      - 'Ensure they show input → output'

  max_iterations: 2
  on_max_iterations: 'Flag for human review'
```

### Passo 4.3: Salvar o Arquivo do Agente

**Ações:**

```yaml
save_agent:
  path: 'squads/{pack_name}/agents/{agent_id}.md'

  post_save:
    - verify_yaml_valid
    - update_pack_readme
    - update_config_yaml
    - log_creation
```

**Saída (FASE 4):**

```yaml
phase_4_output:
  quality_score: 8.3/10
  blocking_requirements: 'ALL PASS'
  agent_file: 'squads/copy/agents/gary-halbert.md'
  lines: 750
  status: 'PASS'
```

---

## FASE 5: OPERATIONAL INFRASTRUCTURE (Infraestrutura Operacional)

**Duração:** 5-10 minutos
**Checkpoint:** SC_AGT_004 (Completude Operacional)
**Modo:** Autônomo
**Referência:** `aprendizado/32-ANATOMIA-AGENTE-100-PORCENTO-REPLICAVEL.md`

> **Princípio:** Um agente sem infraestrutura operacional é uma persona sem processo.
> Ele SABE quem é, mas não sabe COMO fazer nada de forma determinística.
> "Se o executor CONSEGUE improvisar, vai improvisar. E cada execução será diferente."

### Passo 5.1: Gerar o Command Loader

**Ações:**

```yaml
generate_command_loader:
  description: 'Map each operational command to required files'

  process:
    for_each_command:
      - identify: 'Is this command operational (produces output) or utility (*help, *exit)?'
      - if_operational:
          - define: 'requires[] — task file that contains step-by-step workflow'
          - define: 'optional[] — data files, checklists for reference'
          - define: 'output_format — description of expected output'
      - if_utility:
          - set: 'requires: [] (uses inline content)'

  output_format:
    command_loader:
      '*{command}':
        description: '{what this command does}'
        requires:
          - 'tasks/{command}-workflow.md'
        optional:
          - 'data/{relevant-data}.md'
          - 'checklists/{relevant-checklist}.md'
        output_format: '{expected output description}'

  validation:
    - 'Every command with visibility [full, quick] MUST have command_loader entry'
    - 'Every command_loader entry MUST have at least 1 requires file'
    - 'Utility commands (*help, *exit, *chat-mode) may have empty requires'

  veto_condition:
    - condition: 'Operational command has no command_loader entry'
      action: 'VETO - Cannot proceed. Every operational command needs file mapping'
      reason: 'Without mapping, LLM will improvise the workflow'
```

### Passo 5.2: Criar os Stubs de Task

**Ações:**

```yaml
create_task_stubs:
  description: 'Create task file for each operational command'

  for_each_operational_command:
    file_path: 'squads/{pack_name}/tasks/{command}-workflow.md'

    required_sections:
      - task_header:
          fields: ['Task ID', 'Version', 'Purpose', 'Orchestrator', 'Mode']
      - inputs:
          fields: ['name', 'type', 'required', 'description']
      - steps:
          min_count: 3
          required_per_step: ['step number', 'name', 'action', 'output']
      - veto_conditions:
          min_count: 1
          format: 'condition → action → reason'
      - output_format:
          reference: 'templates/{command}-output-tmpl.md'
      - completion_criteria:
          min_count: 2

    content_source:
      primary: 'operational_frameworks from agent definition'
      secondary: 'research material from Phase 1'
      fallback: "Generate from agent's thinking_dna + output_examples"

    quality_criteria:
      min_lines: 50
      must_have_veto: true
      must_reference_template: true

  veto_condition:
    - condition: 'Task file has no steps'
      action: 'VETO - Task without steps is decoration'
      reason: 'Steps are what make execution deterministic'

    - condition: 'Task file has no veto conditions'
      action: 'VETO - Task without veto allows incomplete work to pass'
      reason: 'PV004: If executor CAN do it wrong, process is wrong'
```

### Passo 5.3: Criar os Stubs de Template

**Ações:**

```yaml
create_template_stubs:
  description: 'Create output template for each command that produces structured output'

  identify_output_types:
    - 'List all commands that produce a document/report/analysis'
    - 'Group by output similarity (commands that produce same format share template)'

  for_each_output_type:
    file_path: 'squads/{pack_name}/templates/{output-type}-tmpl.md'

    required_sections:
      - title_with_date
      - executive_summary: '1-3 sentences'
      - structured_body: 'Main content in consistent format'
      - recommendations: 'Actionable next steps'

    quality_criteria:
      must_have_placeholders: true
      must_define_required_sections: true

  skip_if:
    - 'Command output is conversational (chat-mode)'
    - 'Command output is a simple list (*help)'
```

### Passo 5.4: Criar o Checklist Operacional

**Ações:**

```yaml
create_operational_checklist:
  description: "Create at least 1 checklist with veto conditions for the agent's primary task"
  file_path: 'squads/{pack_name}/checklists/{agent_id}-quality-gate.md'

  required_structure:
    blocking_section:
      description: 'Items that MUST pass — VETO if any fails'
      min_items: 3
      format:
        - check: 'Description of what to validate'
        - veto_if_fail: 'What happens if this fails'
        - action: 'How to fix'

    recommended_section:
      description: 'Items that SHOULD pass — WARNING if fails'
      min_items: 2

    approval_criteria:
      rule: '100% blocking + 80% recommended = PASS'

  content_source: "Derive from agent's completion_criteria and anti_patterns"
```

### Passo 5.5: Atualizar o Agente com o Command Loader

**Ações:**

```yaml
update_agent_file:
  description: 'Add command_loader, CRITICAL_LOADER_RULE, and dependencies to agent'

  modifications:
    - section: 'Level 0'
      add:
        - command_loader: '{generated in Step 5.1}'
        - CRITICAL_LOADER_RULE: |
            BEFORE executing ANY command (*):
            1. LOOKUP: Check command_loader[command].requires
            2. STOP: Do not proceed without loading required files
            3. LOAD: Read EACH file in 'requires' list completely
            4. VERIFY: Confirm all required files were loaded
            5. EXECUTE: Follow the workflow in the loaded task file EXACTLY

            If a required file is missing:
            - Report the missing file to user
            - Do NOT attempt to execute without it
            - Do NOT improvise the workflow

    - section: 'dependencies'
      add:
        tasks: '[all task files created in Step 5.2]'
        templates: '[all template files created in Step 5.3]'
        checklists: '[checklist created in Step 5.4]'

    - section: 'commands'
      update: 'Add visibility metadata [full, quick, key] to each command'

  validation:
    - 'command_loader maps ALL operational commands'
    - 'dependencies list ALL files in command_loader.requires'
    - 'CRITICAL_LOADER_RULE is present verbatim'
```

**Saída (FASE 5):**

```yaml
phase_5_output:
  command_loader_entries: N
  task_files_created: N
  template_files_created: N
  checklists_created: 1
  agent_file_updated: true
  dependencies_complete: true
```

---

## FASE 6: OPERATIONAL VALIDATION (Validação Operacional)

**Duração:** 2-5 minutos
**Checkpoint:** SC_AGT_004 (Completude Operacional)
**Modo:** Autônomo

### Passo 6.1: Validar a Existência dos Arquivos

**Ações:**

```yaml
validate_files_exist:
  for_each_entry_in_command_loader:
    - check: 'File at requires[] path exists'
    - check: 'File is not empty (min 20 lines)'
    - check: 'File has expected sections'

  on_missing_file:
    action: 'VETO - Cannot pass. File {path} is in command_loader but does not exist'
    fix: 'Create the file or remove from command_loader'
```

### Passo 6.2: Validar a Qualidade da Task

**Ações:**

```yaml
validate_task_quality:
  for_each_task_file:
    checks:
      - has_steps: 'min 3 steps'
      - has_veto_conditions: 'min 1'
      - has_inputs: 'defined'
      - has_output_format: 'references template or defines inline'
      - has_completion_criteria: 'min 2 criteria'

  scoring:
    complete_task: 1.0 # All checks pass
    partial_task: 0.5 # Missing veto or template ref
    stub_only: 0.25 # Has header but no real content
    missing: 0.0 # File doesn't exist

  threshold: 'Average >= 0.75 across all tasks'
```

### Passo 6.3: Calcular a Pontuação de Maturidade

**Ações:**

```yaml
calculate_maturity:
  formula:
    identity: { present: 1.0, absent: 0.0, weight: 1.0 }
    thinking_dna: { present: 1.0, absent: 0.0, weight: 1.5 }
    voice_dna: { present: 1.0, absent: 0.0, weight: 1.5 }
    output_examples: { count_gte_3: 1.0, else: 0.0, weight: 1.0 }
    command_loader: { present: 1.0, absent: 0.0, weight: 1.5 }
    tasks_coverage: { ratio: 'tasks/commands', weight: 1.5 }
    templates: { present: 1.0, absent: 0.0, weight: 1.0 }
    checklists: { present: 1.0, absent: 0.0, weight: 0.5 }
    data_files: { present: 1.0, absent: 0.0, weight: 0.5 }

  max_score: 10.0

  levels:
    - range: '0-4'
      level: 'Nível 1 — Apenas persona (decorativo)'
      verdict: 'FAIL - Agente incompleto'

    - range: '4-7'
      level: 'Nível 2 — Frameworks (funcional mas inconsistente)'
      verdict: 'CONDITIONAL - Pode publicar com plano de melhoria'

    - range: '7-9'
      level: 'Nível 3 — Completo (determinístico)'
      verdict: 'PASS - Agente operacional'

    - range: '9-10'
      level: 'Nível 3+ — Completo + integrado'
      verdict: 'EXCELLENT - Agente produção'

  target: '>= 7.0 (Nível 3)'

  veto_condition:
    - condition: 'Score < 4.0'
      action: 'VETO - Agent is persona-only, not operational'
      reason: 'Nivel 1 agents are decorative, not functional'
```

### Passo 6.4: Decisão Final

**Ações:**

```yaml
final_decision:
  if_pass:
    - 'Log: Agent {id} passed operational validation (Score: {score})'
    - 'Proceed to Phase 7 (Handoff)'

  if_conditional:
    - 'Log: Agent {id} conditional pass (Score: {score})'
    - 'List missing operational files'
    - "Ask: 'Proceed with documented gaps or fix now?'"
    - options:
        1: 'Fix now (recommended)'
        2: 'Proceed with gaps documented'
        3: 'Abort creation'

  if_fail:
    - 'Log: Agent {id} FAILED operational validation (Score: {score})'
    - 'List all missing components'
    - 'Return to Phase 5 to create missing infrastructure'
    - max_retries: 2
```

**Saída (FASE 6):**

```yaml
phase_6_output:
  files_validated: N
  tasks_quality_avg: 0.X
  maturity_score: X.X/10
  maturity_level: 'Nível N'
  decision: 'PASS | CONDITIONAL | FAIL'
```

---

## FASE 7: HANDOFF

**Duração:** < 1 minuto
**Modo:** Interativo

### Passo 7.1: Apresentar o Resumo do Agente

**Ações:**

```yaml
present_summary:
  agent_created:
    name: 'Gary Halbert'
    id: 'gary-halbert'
    tier: 1
    file: 'squads/copy/agents/gary-halbert.md'
    lines: 750

  quality:
    score: 8.3/10
    research_sources: 8
    voice_dna: 'Complete'

  activation:
    command: '@copy:gary-halbert'
    example: 'Write a sales page for a fitness program'

  commands:
    - '*help - Show available commands'
    - '*write-sales-page - Main task'
    - '*review-copy - Review existing copy'
```

### Passo 7.2: Documentar os Próximos Passos

**Ações:**

```yaml
next_steps:
  recommended:
    - 'Test agent with sample task'
    - 'Verify operational infrastructure (run *command, check if task loads)'
    - 'Add to squad orchestrator routing'

  optional:
    - 'Create more agents for the squad'
    - 'Build workflows that use this agent'
    - 'Enrich task stubs with more detail from domain research'

  handoff_to:
    - agent: 'squad-architect'
      when: 'Continue building squad'
    - agent: 'created-agent'
      when: 'Ready to use agent'
    - agent: '@pedro-valerio'
      when: 'Validate operational processes (*audit)'
```

---

## Saídas

| Saída          | Localização                                                | Descrição                                       |
| -------------- | ---------------------------------------------------------- | ----------------------------------------------- |
| Arquivo do Agente | `squads/{pack_name}/agents/{agent_id}.md`               | Definição completa do agente com command_loader |
| Arquivos de Task | `squads/{pack_name}/tasks/{command}-workflow.md`         | Passo a passo por comando                       |
| Arquivos de Template | `squads/{pack_name}/templates/{output}-tmpl.md`      | Formato de saída por tipo                       |
| Checklist      | `squads/{pack_name}/checklists/{agent_id}-quality-gate.md` | Validação com condições de veto                 |
| Arquivo de Pesquisa | `docs/research/{specialist_slug}-{purpose}-research.md` | Documentação da pesquisa                        |
| README Atualizado | `squads/{pack_name}/README.md`                          | Agente adicionado à lista                       |
| Config Atualizada | `squads/{pack_name}/config.yaml`                        | Agente registrado                               |

---

## Critérios de Validação (Todos Devem Passar)

### Estrutura

- [ ] Arquivo do agente criado na localização correta
- [ ] O bloco YAML é válido
- [ ] Todos os 6 níveis presentes (incluindo o Nível 0: command_loader)

### Conteúdo

- [ ] Linhas >= 300
- [ ] voice_dna completo com vocabulário
- [ ] output_examples >= 3
- [ ] anti_patterns.never_do >= 5
- [ ] completion_criteria definido
- [ ] handoff_to definido

### Infraestrutura Operacional

- [ ] command_loader mapeia TODOS os comandos operacionais
- [ ] CRITICAL_LOADER_RULE presente no agente
- [ ] Arquivo de task existe para cada comando operacional
- [ ] Cada arquivo de task tem passos (mín. 3) + condições de veto (mín. 1)
- [ ] Template existe para cada tipo de saída estruturada
- [ ] Pelo menos 1 checklist com condições de veto bloqueantes
- [ ] A lista de dependencies corresponde a command_loader.requires

### Qualidade

- [ ] Pontuação SC_AGT_001 >= 7.0
- [ ] Pontuação SC_AGT_004 >= 7.0 (maturidade)
- [ ] Pesquisa rastreável
- [ ] Tier atribuído

### Integração

- [ ] README.md atualizado
- [ ] config.yaml atualizado
- [ ] Todos os arquivos de dependência existem

---

## Referência de Heurísticas

| ID da Heurística | Nome                     | Onde Aplicada | Bloqueante |
| ---------------- | ------------------------ | ------------- | ---------- |
| SC_RES_002       | Qualidade da Pesquisa do Agente | Fase 1 | Sim        |
| SC_AGT_001       | Quality Gate do Agente   | Fase 4        | Sim        |
| SC_AGT_004       | Completude Operacional   | Fase 6        | Sim        |

---

## Tratamento de Erros

```yaml
error_handling:
  research_insufficient:
    - retry_with_different_queries
    - expand_search_scope
    - if_still_fails: 'Create generic agent with TODO notes'

  validation_fails:
    - identify_specific_failures
    - attempt_automated_fix
    - if_cannot_fix: 'Save as draft, flag for review'

  pack_not_exists:
    - suggest_create_pack_first
    - offer_standalone_option
```

---

## Integração com o AIOX

Esta task cria agentes que:

- Seguem os padrões de definição de agente do AIOX (6 níveis)
- Podem ser ativados com a sintaxe @pack:agent-id
- Integram-se à camada de memória
- Suportam os padrões de comando padrão (`*help`, `*exit`, etc.)
- Funcionam dentro da estrutura de squad
- Passam no quality gate SC_AGT_001

---

_Versão da Task: 3.0_
_Última Atualização: 2026-02-04_
_Linhas: 1100+_
_Filosofia: "Se o processo de criação PERMITE criar agente incompleto, agente incompleto vai ser criado."_
