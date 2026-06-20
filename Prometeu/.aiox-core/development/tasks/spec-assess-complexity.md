# Spec Pipeline: Assess Complexity

> **Fase:** 2 - Assess
> **Agente Responsável:** @architect
> **Pipeline:** spec-pipeline

---

## Propósito

Avaliar a complexidade de uma story/requisito para determinar quais fases do pipeline são necessárias. Classifica em SIMPLE, STANDARD ou COMPLEX, cada um ativando diferentes conjuntos de fases.

---

## autoClaude

```yaml
autoClaude:
  version: '3.0'
  pipelinePhase: spec-assess

  elicit: false
  deterministic: true # Same inputs should yield same complexity
  composable: true

  inputs:
    - name: storyId
      type: string
      required: true

    - name: requirements
      type: file
      path: docs/stories/{storyId}/spec/requirements.json
      required: true

    - name: overrideComplexity
      type: enum
      values: [SIMPLE, STANDARD, COMPLEX]
      required: false
      description: Override manual da complexidade

  outputs:
    - name: complexity.json
      type: file
      path: docs/stories/{storyId}/spec/complexity.json
      schema: complexity-schema

  verification:
    type: none # A avaliação é consultiva

  contextRequirements:
    projectContext: true
    filesContext: true # Necessário analisar o codebase
    implementationPlan: false
    spec: false
```

---

## Dimensões de Complexidade

### Dimensão 1: Escopo

```yaml
scope:
  description: 'Quantos arquivos/componentes serão afetados?'

  scoring:
    1: '1-2 arquivos, mudança localizada'
    2: '3-5 arquivos, um módulo'
    3: '6-10 arquivos, múltiplos módulos'
    4: '11-20 arquivos, cross-cutting'
    5: '20+ arquivos, arquitetura inteira'

  analysis:
    - Contar arquivos mencionados nos requisitos
    - Estimar com base no tipo de feature
    - Verificar padrões existentes para features similares
```

### Dimensão 2: Integração

```yaml
integration:
  description: 'Quantas integrações externas são necessárias?'

  scoring:
    1: 'Nenhuma integração externa'
    2: '1 API interna existente'
    3: '1-2 APIs externas ou nova API interna'
    4: '3+ APIs ou integração complexa (webhooks, eventos)'
    5: 'Orquestração de múltiplos sistemas'

  analysis:
    - Identificar serviços externos mencionados
    - Verificar requisitos de autenticação
    - Avaliar a complexidade do fluxo de dados
```

### Dimensão 3: Infraestrutura

```yaml
infrastructure:
  description: 'Mudanças de infraestrutura necessárias?'

  scoring:
    1: 'Nenhuma mudança de infra'
    2: 'Configuração simples (env vars)'
    3: 'Nova dependência ou serviço'
    4: 'Mudança de banco de dados / schema'
    5: 'Nova infraestrutura (servidor, container, etc)'

  analysis:
    - Verificar mudanças de banco de dados
    - Identificar novos serviços necessários
    - Avaliar o impacto de deployment
```

### Dimensão 4: Conhecimento

```yaml
knowledge:
  description: 'Conhecimento necessário para implementar'

  scoring:
    1: 'Padrões existentes no codebase'
    2: 'Tecnologia conhecida, novo padrão'
    3: 'Nova biblioteca, documentação clara'
    4: 'Tecnologia nova para o time'
    5: 'Área de domínio desconhecida, pesquisa necessária'

  analysis:
    - Verificar padrões existentes no codebase
    - Identificar novas tecnologias mencionadas
    - Avaliar a curva de aprendizado
```

### Dimensão 5: Risco

```yaml
risk:
  description: 'Risco de impacto negativo'

  scoring:
    1: 'Baixo risco, feature isolada'
    2: 'Risco moderado, afeta poucos usuários'
    3: 'Risco médio, feature importante'
    4: 'Risco alto, afeta muitos usuários'
    5: 'Risco crítico, core do sistema'

  analysis:
    - Avaliar o impacto no usuário
    - Verificar implicações de segurança
    - Avaliar a reversibilidade
```

---

## Limiares de Classificação

```yaml
thresholds:
  SIMPLE:
    max_total: 8
    description: 'Tarefa direta, padrões existentes'
    pipeline_phases: [gather, spec, critique]
    typical_time: '< 1 dia'

  STANDARD:
    min_total: 9
    max_total: 15
    description: 'Complexidade moderada, alguma pesquisa'
    pipeline_phases: [gather, assess, research, spec, critique, plan]
    typical_time: '1-3 dias'

  COMPLEX:
    min_total: 16
    description: 'Alta complexidade, múltiplas iterações'
    pipeline_phases: [gather, assess, research, spec, critique_1, revise, critique_2, plan]
    typical_time: '3+ dias'

    flags:
      - Requires architectural review
      - Consider breaking into smaller stories
      - Spike may be needed
```

---

## Fluxo de Execução

### Passo 1: Carregar Requisitos

```yaml
load:
  action: read_requirements_json
  path: docs/stories/{storyId}/spec/requirements.json
  validate: true
```

### Passo 2: Analisar o Codebase (se necessário)

```yaml
codebase_analysis:
  enabled: true

  actions:
    - id: count_affected_files
      description: 'Estimar os arquivos que serão modificados'
      method: |
        1. Analisar os requisitos funcionais
        2. Identificar componentes/módulos mencionados
        3. Buscar no codebase por arquivos relacionados
        4. Contar arquivos únicos

    - id: check_patterns
      description: 'Verificar se existem padrões similares'
      method: |
        1. Extrair conceitos-chave dos requisitos
        2. Buscar por implementações similares
        3. Avaliar a reusabilidade

    - id: identify_integrations
      description: 'Encontrar as integrações externas necessárias'
      method: |
        1. Analisar os requisitos por serviços externos
        2. Verificar integrações existentes
        3. Identificar novas conexões necessárias
```

### Passo 3: Pontuar as Dimensões

```yaml
scoring:
  action: evaluate_each_dimension

  process: |
    Para cada dimensão (scope, integration, infrastructure, knowledge, risk):
    1. Aplicar os critérios de pontuação
    2. Documentar a justificativa
    3. Atribuir pontuação de 1 a 5
```

### Passo 4: Calcular o Resultado

```yaml
calculation:
  action: determine_complexity

  formula: |
    total_score = scope + integration + infrastructure + knowledge + risk

    if overrideComplexity:
      result = overrideComplexity
    else if total_score <= 8:
      result = SIMPLE
    else if total_score <= 15:
      result = STANDARD
    else:
      result = COMPLEX
```

### Passo 5: Gerar a Saída

```yaml
output:
  action: create_complexity_json

  template: |
    {
      "storyId": "{storyId}",
      "assessedAt": "{timestamp}",
      "assessedBy": "@architect",

      "result": "{SIMPLE|STANDARD|COMPLEX}",
      "overridden": false,

      "dimensions": {
        "scope": {
          "score": {1-5},
          "notes": "{rationale}"
        },
        "integration": {
          "score": {1-5},
          "notes": "{rationale}"
        },
        "infrastructure": {
          "score": {1-5},
          "notes": "{rationale}"
        },
        "knowledge": {
          "score": {1-5},
          "notes": "{rationale}"
        },
        "risk": {
          "score": {1-5},
          "notes": "{rationale}"
        }
      },

      "totalScore": {5-25},

      "pipelinePhases": ["{phases based on result}"],

      "flags": ["{warnings or recommendations}"],

      "estimatedEffort": "{typical_time}"
    }
```

---

## Schema de Saída

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["storyId", "assessedAt", "result", "dimensions", "totalScore", "pipelinePhases"],
  "properties": {
    "storyId": { "type": "string" },
    "assessedAt": { "type": "string", "format": "date-time" },
    "assessedBy": { "type": "string", "default": "@architect" },
    "result": { "enum": ["SIMPLE", "STANDARD", "COMPLEX"] },
    "overridden": { "type": "boolean", "default": false },
    "dimensions": {
      "type": "object",
      "required": ["scope", "integration", "infrastructure", "knowledge", "risk"],
      "properties": {
        "scope": { "$ref": "#/definitions/dimension" },
        "integration": { "$ref": "#/definitions/dimension" },
        "infrastructure": { "$ref": "#/definitions/dimension" },
        "knowledge": { "$ref": "#/definitions/dimension" },
        "risk": { "$ref": "#/definitions/dimension" }
      }
    },
    "totalScore": { "type": "integer", "minimum": 5, "maximum": 25 },
    "pipelinePhases": { "type": "array", "items": { "type": "string" } },
    "flags": { "type": "array", "items": { "type": "string" } },
    "estimatedEffort": { "type": "string" }
  },
  "definitions": {
    "dimension": {
      "type": "object",
      "required": ["score", "notes"],
      "properties": {
        "score": { "type": "integer", "minimum": 1, "maximum": 5 },
        "notes": { "type": "string" }
      }
    }
  }
}
```

---

## Integração

### Integração de Comando (@architect)

```yaml
command:
  name: '*assess-complexity'
  syntax: '*assess-complexity {story-id} [--complexity=SIMPLE|STANDARD|COMPLEX]'
  agent: architect

  examples:
    - '*assess-complexity STORY-42'
    - '*assess-complexity STORY-42 --complexity=COMPLEX'
```

### Integração com o Pipeline

```yaml
pipeline:
  phase: assess
  previous_phase: gather
  next_phase: research

  requires:
    - requirements.json

  pass_to_next:
    - complexity.json
    - requirements.json

  skip_conditions:
    - 'overrideComplexity is provided' # Still runs but uses override
```

---

## Tratamento de Erros

```yaml
errors:
  - id: missing-requirements
    condition: 'requirements.json not found'
    action: 'Halt and instruct to run gather phase first'
    blocking: true

  - id: empty-requirements
    condition: 'functional requirements array is empty'
    action: 'Cannot assess - no requirements to analyze'
    blocking: true

  - id: override-mismatch
    condition: 'override significantly differs from calculated'
    action: 'Log warning but proceed with override'
    blocking: false
```

---

## Exemplos

### Exemplo: Avaliação da Feature de Login

**Entrada:** requirements.json com login Google OAuth

**Análise:**

```
Scope:       3 (auth module, login page, user service)
Integration: 3 (Google OAuth API)
Infra:       2 (env vars for OAuth credentials)
Knowledge:   2 (OAuth pattern exists in codebase)
Risk:        3 (affects all users)
─────────────
Total:       13 → STANDARD
```

**Saída:**

```json
{
  "storyId": "STORY-42",
  "assessedAt": "2026-01-28T10:30:00Z",
  "result": "STANDARD",
  "totalScore": 13,
  "pipelinePhases": ["gather", "assess", "research", "spec", "critique", "plan"]
}
```

---

## Metadados

```yaml
metadata:
  story: '3.2'
  epic: 'Epic 3 - Spec Pipeline'
  created: '2026-01-28'
  author: '@architect (Aria)'
  version: '1.0.0'
  tags:
    - spec-pipeline
    - complexity
    - assessment
    - prompt-engineering
```
