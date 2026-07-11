---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Spec Pipeline: Research Dependencies

---
execution_mode: programmatic  # TOK-3: PTC-eligible (Bash batch) — multi-search + filter in single block
---

> **Fase:** 3 - Pesquisa
> **Agente Responsável:** @analyst
> **Pipeline:** spec-pipeline

---

## Propósito

Pesquisar e validar dependências externas necessárias para implementação. Usa Context7 para documentação de bibliotecas e EXA para pesquisa web. Produz lista de dependências verificadas com links e exemplos.

---

## autoClaude

```yaml
autoClaude:
  version: '3.0'
  pipelinePhase: spec-research

  elicit: false
  deterministic: false # Resultados da pesquisa podem variar
  composable: true

  inputs:
    - name: storyId
      type: string
      required: true

    - name: requirements
      type: file
      path: docs/stories/{storyId}/spec/requirements.json
      required: true

    - name: complexity
      type: file
      path: docs/stories/{storyId}/spec/complexity.json
      required: true

  outputs:
    - name: research.json
      type: file
      path: docs/stories/{storyId}/spec/research.json
      schema: research-schema

  tools:
    - context7 # Primário: documentação de bibliotecas
    - exa # Fallback: busca na web
    - codebase # Verificar implementações existentes

  verification:
    type: manual
    note: 'Os achados da pesquisa devem ser revisados'

  contextRequirements:
    projectContext: true
    filesContext: true
    implementationPlan: false
    spec: false
```

---

## Condições de Pulo

```yaml
skip_conditions:
  - condition: "complexity.result === 'SIMPLE'"
    reason: 'Tasks simples usam padrões existentes, nenhuma pesquisa necessária'
    action: 'Gerar research.json mínimo apenas com as dependências existentes'

  - condition: 'nenhuma dependência externa identificada nos requisitos'
    reason: 'Implementação puramente interna'
    action: "Gerar research.json anotando 'sem dependências externas'"
```

---

## Fluxo de Execução

### Passo 1: Extrair Alvos de Pesquisa

```yaml
extract_targets:
  action: parse_requirements_for_dependencies

  patterns:
    - Libraries: "zustand", "tanstack-query", "zod"
    - APIs: "OAuth", "Stripe API", "SendGrid"
    - Concepts: "real-time sync", "optimistic updates"
    - Infrastructure: "Redis", "PostgreSQL", "Vercel"

  output:
    - name: research_targets[]
      properties:
        - target: string
        - type: library|api|concept|infrastructure
        - mentioned_in: requirement_id[]
```

### Passo 2: Verificar o Codebase Existente

```yaml
codebase_check:
  action: search_existing_implementations

  for_each: research_target

  search:
    - package.json: 'Verificar se já está instalado'
    - imports: 'Verificar se já está em uso'
    - patterns: 'Encontrar implementações similares'

  output:
    - existing: boolean
    - version: string (se existente)
    - usage_examples: string[] (referências file:line)
```

### Passo 3: Pesquisar via Context7

```yaml
context7_research:
  action: lookup_library_documentation
  tool: context7

  for_each: research_target where type === 'library'

  process:
    1. resolve-library-id:
      - Query: '{target} library documentation'
      - Select: Correspondência mais relevante

    2. query-docs:
      - Query: 'How to {use case from requirements}'
      - Extract: Instruções de setup, exemplos de código

  output:
    - verified: boolean
    - source: 'context7'
    - docs_url: string
    - relevant_patterns: string[]
    - code_examples: string[]
```

### Passo 4: Fallback para EXA (se necessário)

```yaml
exa_fallback:
  action: web_search
  tool: exa

  condition: 'context7 não retornou resultados OU o alvo é uma API/conceito'

  for_each: unverified_target

  queries:
    - '{target} documentation 2024'
    - '{target} {framework} integration example'
    - '{target} best practices'

  output:
    - verified: boolean (marcar como false se incerto)
    - source: 'exa'
    - urls: string[]
    - summary: string
```

### Passo 5: Verificar Preferências Técnicas

```yaml
preferences_check:
  action: validate_against_tech_preferences
  file: .aiox-core/development/data/technical-preferences.md

  validation:
    - A dependência está na lista de preferidas?
    - Existem alternativas preferidas?
    - Há conflitos conhecidos?

  output:
    - preferred: boolean
    - alternatives: string[] (se não for preferida)
    - conflicts: string[] (se houver)
```

### Passo 6: Gerar a Saída de Pesquisa

```yaml
generate_output:
  action: create_research_json

  template: |
    {
      "storyId": "{storyId}",
      "researchedAt": "{timestamp}",
      "researchedBy": "@analyst",
      "complexity": "{complexity.result}",

      "dependencies": [
        {
          "name": "{dependency_name}",
          "type": "library|api|service",
          "version": "{recommended_version}",
          "verified": true|false,
          "source": "context7|exa|codebase",

          "existing": {
            "installed": true|false,
            "currentVersion": "{version}",
            "usageLocations": ["{file:line}"]
          },

          "documentation": {
            "url": "{docs_url}",
            "relevantSections": ["{section_names}"]
          },

          "patterns": [
            {
              "name": "{pattern_name}",
              "description": "{when_to_use}",
              "codeExample": "{code}"
            }
          ],

          "compatibility": {
            "preferred": true|false,
            "alternatives": ["{alt_libraries}"],
            "conflicts": ["{known_conflicts}"]
          }
        }
      ],

      "unverifiedClaims": [
        {
          "claim": "{statement_from_requirements}",
          "reason": "{why_not_verified}",
          "action": "needs_validation|acceptable_risk|blocked"
        }
      ],

      "recommendations": [
        {
          "type": "prefer|avoid|consider",
          "subject": "{dependency}",
          "rationale": "{why}"
        }
      ],

      "researchNotes": "{additional_context}"
    }
```

---

## Schema de Saída

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["storyId", "researchedAt", "dependencies"],
  "properties": {
    "storyId": { "type": "string" },
    "researchedAt": { "type": "string", "format": "date-time" },
    "researchedBy": { "type": "string", "default": "@analyst" },
    "complexity": { "enum": ["SIMPLE", "STANDARD", "COMPLEX"] },
    "dependencies": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["name", "type", "verified", "source"],
        "properties": {
          "name": { "type": "string" },
          "type": { "enum": ["library", "api", "service", "infrastructure"] },
          "version": { "type": "string" },
          "verified": { "type": "boolean" },
          "source": { "enum": ["context7", "exa", "codebase", "manual"] },
          "existing": { "type": "object" },
          "documentation": { "type": "object" },
          "patterns": { "type": "array" },
          "compatibility": { "type": "object" }
        }
      }
    },
    "unverifiedClaims": { "type": "array" },
    "recommendations": { "type": "array" },
    "researchNotes": { "type": "string" }
  }
}
```

---

## Integração

### Integração de Comando (@analyst)

```yaml
command:
  name: '*research-deps'
  syntax: '*research-deps {story-id} [--force]'
  agent: analyst

  flags:
    --force: 'Pesquisar mesmo que a complexidade seja SIMPLE'

  examples:
    - '*research-deps STORY-42'
    - '*research-deps STORY-42 --force'
```

### Integração de Pipeline

```yaml
pipeline:
  phase: research
  previous_phase: assess
  next_phase: spec

  requires:
    - requirements.json
    - complexity.json

  pass_to_next:
    - research.json
    - requirements.json
    - complexity.json

  skip_conditions:
    - "complexity.result === 'SIMPLE' AND not --force"
```

### Configuração de Ferramentas

```yaml
tools:
  context7:
    priority: 1
    timeout: 30s
    fallback_to: exa

  exa:
    priority: 2
    max_results: 5
    type: auto
```

---

## Tratamento de Erros

```yaml
errors:
  - id: context7-unavailable
    condition: 'Context7 MCP não respondendo'
    action: 'Usar EXA como primário, registrar aviso'
    blocking: false

  - id: no-docs-found
    condition: 'Nenhuma documentação encontrada para a dependência'
    action: 'Marcar como não verificada, adicionar a unverifiedClaims'
    blocking: false

  - id: conflicting-dependency
    condition: 'A dependência conflita com uma existente'
    action: "Adicionar a recommendations com o tipo 'avoid'"
    blocking: false

  - id: all-tools-failed
    condition: 'Tanto o Context7 quanto o EXA falharam'
    action: 'Gerar saída mínima com flag de pesquisa manual'
    blocking: false
```

---

## Exemplos

### Exemplo: Pesquisa do Zustand

**Alvo:** zustand (gerenciamento de estado)

**Query do Context7:**

```
resolve-library-id: "zustand state management"
→ /pmndrs/zustand

query-docs: "How to create a store with zustand"
→ Retorna exemplos de setup, padrões de middleware
```

**Entrada de Saída:**

```json
{
  "name": "zustand",
  "type": "library",
  "version": "^4.5.0",
  "verified": true,
  "source": "context7",
  "existing": {
    "installed": false,
    "currentVersion": null
  },
  "documentation": {
    "url": "https://docs.pmnd.rs/zustand/",
    "relevantSections": ["Getting Started", "Middleware"]
  },
  "patterns": [
    {
      "name": "createStore",
      "description": "Basic store creation",
      "codeExample": "const useStore = create((set) => ({ count: 0 }))"
    }
  ],
  "compatibility": {
    "preferred": true,
    "alternatives": ["jotai", "recoil"],
    "conflicts": []
  }
}
```

---

## Metadados

```yaml
metadata:
  story: '3.3'
  epic: 'Epic 3 - Spec Pipeline'
  created: '2026-01-28'
  author: '@architect (Aria)'
  version: '1.0.0'
  tags:
    - spec-pipeline
    - research
    - dependencies
    - context7
    - exa
```
