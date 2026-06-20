# Spec Pipeline: Critique Specification

> **Fase:** 5 - Critique
> **Agente Responsável:** @qa
> **Pipeline:** spec-pipeline

---

## Propósito

Validar e criticar a especificação antes da implementação. Avalia accuracy, completeness, consistency, feasibility e alignment. Produz verdict (APPROVED/NEEDS_REVISION/BLOCKED) e pode sugerir correções.

---

## autoClaude

```yaml
autoClaude:
  version: '3.0'
  pipelinePhase: spec-critique

  elicit: false
  deterministic: true
  composable: true

  selfCritique:
    required: true
    checklistRef: spec-quality-checklist.md

  inputs:
    - name: storyId
      type: string
      required: true

    - name: spec
      type: file
      path: docs/stories/{storyId}/spec/spec.md
      required: true

    - name: requirements
      type: file
      path: docs/stories/{storyId}/spec/requirements.json
      required: true

    - name: complexity
      type: file
      path: docs/stories/{storyId}/spec/complexity.json
      required: false

    - name: research
      type: file
      path: docs/stories/{storyId}/spec/research.json
      required: false

  outputs:
    - name: critique.json
      type: file
      path: docs/stories/{storyId}/spec/critique.json
      schema: critique-schema

  verification:
    type: gate
    blocking: true
    verdict_field: verdict

  contextRequirements:
    projectContext: true
    filesContext: true
    implementationPlan: false
    spec: true
```

---

## Dimensões da Crítica

### Dimensão 1: Accuracy (Precisão)

```yaml
accuracy:
  description: 'A spec reflete os requisitos com precisão'
  weight: 25%

  checks:
    - id: acc-1
      name: 'Requirement Coverage'
      question: 'Todo FR-* do requirements.json é tratado na spec?'
      severity: HIGH

    - id: acc-2
      name: 'No Phantom Requirements'
      question: "A spec não inclui funcionalidades que não estão nos requisitos?"
      severity: HIGH

    - id: acc-3
      name: 'Correct Priority Mapping'
      question: 'Requisitos P0 estão em destaque, P2 são opcionais?'
      severity: MEDIUM

    - id: acc-4
      name: 'NFR Addressed'
      question: 'Todos os NFR-* têm seções correspondentes na spec?'
      severity: MEDIUM

  scoring:
    5: 'Todos os requisitos representados com precisão'
    4: 'Omissões menores, nenhuma representação incorreta'
    3: 'Alguns requisitos pouco claros ou incompletos'
    2: 'Lacunas ou representações incorretas significativas'
    1: 'Problemas graves de precisão'
```

### Dimensão 2: Completeness (Completude)

```yaml
completeness:
  description: 'A spec tem todas as seções necessárias preenchidas'
  weight: 25%

  checks:
    - id: comp-1
      name: 'All Sections Present'
      question: 'Overview, Requirements, Approach, Dependencies, Files, Testing, Risks todos presentes?'
      severity: HIGH

    - id: comp-2
      name: 'Testing Coverage'
      question: 'Todo FR tem pelo menos um cenário de teste?'
      severity: HIGH

    - id: comp-3
      name: 'Dependencies Listed'
      question: 'Todas as dependências externas identificadas com versões?'
      severity: MEDIUM

    - id: comp-4
      name: 'Files Identified'
      question: 'Arquivos novos e modificados listados com seus propósitos?'
      severity: MEDIUM

    - id: comp-5
      name: 'Risks Documented'
      question: 'Pelo menos os riscos potenciais foram considerados?'
      severity: LOW

  scoring:
    5: 'Abrangente, nada faltando'
    4: 'Lacunas menores em seções não críticas'
    3: 'Algumas seções incompletas'
    2: 'Múltiplas seções ausentes ou vazias'
    1: 'Gravemente incompleta'
```

### Dimensão 3: Consistency (Consistência)

```yaml
consistency:
  description: 'A spec é internamente consistente'
  weight: 20%

  checks:
    - id: con-1
      name: 'ID References Valid'
      question: 'Todas as referências FR-*/NFR-* existem nos requisitos?'
      severity: HIGH

    - id: con-2
      name: 'Dependency Consistency'
      question: 'As dependências na abordagem coincidem com a seção de dependências?'
      severity: MEDIUM

    - id: con-3
      name: 'Complexity Alignment'
      question: 'A profundidade da spec corresponde ao nível de complexidade?'
      severity: LOW

    - id: con-4
      name: 'No Contradictions'
      question: 'Nenhuma afirmação conflitante entre as seções?'
      severity: HIGH

  scoring:
    5: 'Totalmente consistente do início ao fim'
    4: 'Inconsistências menores'
    3: 'Algumas contradições ou divergências'
    2: 'Múltiplas inconsistências'
    1: 'Fundamentalmente inconsistente'
```

### Dimensão 4: Feasibility (Viabilidade)

```yaml
feasibility:
  description: 'A spec é tecnicamente viável'
  weight: 15%

  checks:
    - id: feas-1
      name: 'Dependencies Available'
      question: 'Todas as dependências listadas existem e são compatíveis?'
      severity: HIGH

    - id: feas-2
      name: 'Technical Approach Sound'
      question: 'A arquitetura proposta é alcançável?'
      severity: HIGH

    - id: feas-3
      name: 'Reasonable Scope'
      question: 'O trabalho cabe no escopo típico de uma story?'
      severity: MEDIUM

    - id: feas-4
      name: 'No Impossible Requirements'
      question: 'Todos os requisitos são tecnicamente possíveis?'
      severity: HIGH

  scoring:
    5: 'Claramente viável'
    4: 'Viável com preocupações menores'
    3: 'Viabilidade questionável'
    2: 'Problemas significativos de viabilidade'
    1: 'Não viável como especificada'
```

### Dimensão 5: Alignment (Alinhamento)

```yaml
alignment:
  description: 'A spec se alinha aos padrões do projeto'
  weight: 15%

  checks:
    - id: align-1
      name: 'Tech Stack Alignment'
      question: 'As tecnologias correspondem às preferências do projeto?'
      severity: MEDIUM

    - id: align-2
      name: 'Pattern Alignment'
      question: 'Os padrões propostos correspondem ao codebase existente?'
      severity: MEDIUM

    - id: align-3
      name: 'Naming Conventions'
      question: 'Os nomes de arquivos/componentes seguem as convenções?'
      severity: LOW

    - id: align-4
      name: 'Architecture Fit'
      question: 'Encaixa-se na arquitetura existente?'
      severity: HIGH

  scoring:
    5: 'Alinhamento perfeito'
    4: 'Desvios menores com justificativa'
    3: 'Alguns desalinhamentos'
    2: 'Desvios significativos'
    1: 'Fundamentalmente desalinhada'
```

---

## Lógica do Veredito

```yaml
verdict_rules:
  APPROVED:
    condition: |
      - Nenhum problema de severidade HIGH
      - Pontuação média >= 4.0
      - Todas as dimensões >= 3
    meaning: 'Spec pronta para implementação'
    next_action: 'Prosseguir para a fase de planejamento'

  NEEDS_REVISION:
    condition: |
      - Tem problemas de severidade MEDIUM OU
      - Pontuação média entre 3.0-3.9 OU
      - Qualquer dimensão < 3 mas sem problemas HIGH
    meaning: 'Spec precisa de melhorias antes da implementação'
    next_action: 'Retornar para o spec-write com feedback'

  BLOCKED:
    condition: |
      - Tem problemas de severidade HIGH OU
      - Pontuação média < 3.0 OU
      - Qualquer dimensão <= 1
    meaning: 'Spec tem problemas críticos'
    next_action: 'Escalar para o @architect ou retornar para o gather'
```

---

## Fluxo de Execução

### Passo 1: Carregar os Artefatos

```yaml
load:
  action: gather_all_spec_artifacts

  files:
    - spec.md (required)
    - requirements.json (required)
    - complexity.json (optional)
    - research.json (optional)
```

### Passo 2: Rodar as Verificações de Dimensão

```yaml
run_checks:
  for_each: dimension in [accuracy, completeness, consistency, feasibility, alignment]

  process: 1. Executar cada verificação na dimensão
    2. Registrar os achados (pass/fail)
    3. Atribuir severidade às falhas
    4. Calcular a pontuação da dimensão
```

### Passo 3: Gerar os Issues

```yaml
generate_issues:
  for_each: failed_check

  template: |
    {
      "id": "CRIT-{n}",
      "severity": "{HIGH|MEDIUM|LOW}",
      "category": "{dimension}",
      "check": "{check_id}",
      "description": "{what's wrong}",
      "location": "spec.md#{section}",
      "suggestion": "{how to fix}",
      "autoFixable": true|false
    }
```

### Passo 4: Calcular o Veredito

```yaml
calculate_verdict:
  action: determine_verdict

  process: 1. Contar issues por severidade
    2. Calcular a pontuação média
    3. Verificar as pontuações mínimas de dimensão
    4. Aplicar as regras de veredito
```

### Passo 5: Gerar a Saída

```yaml
generate_output:
  action: create_critique_json

  template: |
    {
      "storyId": "{storyId}",
      "critiquedAt": "{timestamp}",
      "critiquedBy": "@qa",
      "specVersion": 1,

      "verdict": "APPROVED|NEEDS_REVISION|BLOCKED",
      "verdictReason": "{summary}",

      "scores": {
        "accuracy": {score},
        "completeness": {score},
        "consistency": {score},
        "feasibility": {score},
        "alignment": {score},
        "average": {weighted_average}
      },

      "issues": [
        {
          "id": "CRIT-1",
          "severity": "HIGH|MEDIUM|LOW",
          "category": "{dimension}",
          "description": "{issue}",
          "location": "{spec.md#section}",
          "suggestion": "{fix}",
          "autoFixable": true|false
        }
      ],

      "summary": {
        "highIssues": {count},
        "mediumIssues": {count},
        "lowIssues": {count},
        "autoFixable": {count}
      },

      "nextAction": "{what to do}",

      "autoFixes": [
        {
          "issueId": "CRIT-{n}",
          "location": "{file:line}",
          "original": "{text}",
          "suggested": "{text}"
        }
      ]
    }
```

---

## Output Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["storyId", "critiquedAt", "verdict", "scores", "issues"],
  "properties": {
    "storyId": { "type": "string" },
    "critiquedAt": { "type": "string", "format": "date-time" },
    "critiquedBy": { "type": "string", "default": "@qa" },
    "specVersion": { "type": "integer", "minimum": 1 },
    "verdict": { "enum": ["APPROVED", "NEEDS_REVISION", "BLOCKED"] },
    "verdictReason": { "type": "string" },
    "scores": {
      "type": "object",
      "required": [
        "accuracy",
        "completeness",
        "consistency",
        "feasibility",
        "alignment",
        "average"
      ],
      "properties": {
        "accuracy": { "type": "number", "minimum": 1, "maximum": 5 },
        "completeness": { "type": "number", "minimum": 1, "maximum": 5 },
        "consistency": { "type": "number", "minimum": 1, "maximum": 5 },
        "feasibility": { "type": "number", "minimum": 1, "maximum": 5 },
        "alignment": { "type": "number", "minimum": 1, "maximum": 5 },
        "average": { "type": "number", "minimum": 1, "maximum": 5 }
      }
    },
    "issues": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["id", "severity", "category", "description"],
        "properties": {
          "id": { "type": "string", "pattern": "^CRIT-\\d+$" },
          "severity": { "enum": ["HIGH", "MEDIUM", "LOW"] },
          "category": {
            "enum": ["accuracy", "completeness", "consistency", "feasibility", "alignment"]
          },
          "description": { "type": "string" },
          "location": { "type": "string" },
          "suggestion": { "type": "string" },
          "autoFixable": { "type": "boolean" }
        }
      }
    },
    "summary": { "type": "object" },
    "nextAction": { "type": "string" },
    "autoFixes": { "type": "array" }
  }
}
```

---

## Integração

### Integração de Comando (@qa)

```yaml
command:
  name: '*critique-spec'
  syntax: '*critique-spec {story-id} [--auto-fix]'
  agent: qa

  flags:
    --auto-fix: 'Aplicar as sugestões auto-corrigíveis'

  examples:
    - '*critique-spec STORY-42'
    - '*critique-spec STORY-42 --auto-fix'
```

### Integração de Pipeline

```yaml
pipeline:
  phase: critique
  previous_phase: spec
  next_phase: plan (if APPROVED)

  requires:
    - spec.md
    - requirements.json

  optional:
    - complexity.json
    - research.json

  gate: true  # Blocking gate

  on_verdict:
    APPROVED:
      action: continue_to_plan
    NEEDS_REVISION:
      action: return_to_spec_write
      pass: [critique.json, autoFixes]
    BLOCKED:
      action: halt
      escalate_to: @architect
```

---

## Tratamento de Erros

```yaml
errors:
  - id: missing-spec
    condition: 'spec.md não encontrado'
    action: 'Parar - não é possível criticar sem a spec'
    blocking: true

  - id: missing-requirements
    condition: 'requirements.json não encontrado'
    action: 'Parar - não é possível validar a precisão'
    blocking: true

  - id: parse-error
    condition: 'spec.md malformado'
    action: 'Registrar problemas de parse, tentar crítica parcial'
    blocking: false
```

---

## Exemplos

### Exemplo: Crítica com Issues

**Entrada:** spec.md sem a seção de testes

**Saída:**

```json
{
  "storyId": "STORY-42",
  "verdict": "NEEDS_REVISION",
  "verdictReason": "Cobertura de testes ausente para 2 requisitos funcionais",
  "scores": {
    "accuracy": 5,
    "completeness": 3,
    "consistency": 4,
    "feasibility": 4,
    "alignment": 4,
    "average": 4.0
  },
  "issues": [
    {
      "id": "CRIT-1",
      "severity": "HIGH",
      "category": "completeness",
      "description": "FR-1 (Google OAuth) não tem cenários de teste",
      "location": "spec.md#section-6",
      "suggestion": "Adicionar teste Given-When-Then para o fluxo OAuth",
      "autoFixable": true
    }
  ],
  "nextAction": "Retornar para o spec-write com o critique.json"
}
```

---

## Metadados

```yaml
metadata:
  story: '3.5'
  epic: 'Epic 3 - Spec Pipeline'
  created: '2026-01-28'
  author: '@architect (Aria)'
  version: '1.0.0'
  tags:
    - spec-pipeline
    - critique
    - quality-gate
    - qa
```

## Handoff
next_agent: @architect
next_command: *plan
condition: O veredito da crítica é APPROVED
alternatives:
  - agent: @pm, command: *write-spec, condition: O veredito da crítica é NEEDS_REVISION
  - agent: @architect, command: *analyze-impact, condition: O veredito da crítica é BLOCKED
