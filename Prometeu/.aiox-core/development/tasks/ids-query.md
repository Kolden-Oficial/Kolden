---

## Task Definition (AIOX Task Format V1.0)

```yaml
task: idsQuery()
responsável: Any Agent
responsavel_type: Agente
atomic_layer: Molecule

**Entrada:**
- campo: intent
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Non-empty string describing what is needed

- campo: context
  tipo: object
  origem: User Input
  obrigatório: false
  validação: Optional filters (type, category)

- campo: format
  tipo: string
  origem: User Input
  obrigatório: false
  validação: "json" or "text" (default: text)

**Saída:**
- campo: analysis_result
  tipo: object
  destino: Return value
  persistido: false

- campo: decision
  tipo: string
  destino: Return value
  persistido: false
```

---

## Pré-Condições

```yaml
pre-conditions:
  - [ ] Entity Registry exists at .aiox-core/data/entity-registry.yaml
    tipo: pre-condition
    blocker: false
    validação: |
      If missing, engine returns CREATE with empty registry rationale
    error_message: "Registry not found — CREATE decisions will be recommended"
```

---

## Propósito

Consultar o Entity Registry do IDS (Incremental Development System) para encontrar artefatos existentes que correspondam a um determinado intent. Retorna recomendações REUSE, ADAPT ou CREATE com base em correspondência semântica.

**Constitution Reference:** Article IV-A — REUSE > ADAPT > CREATE

---

## Uso

### Uso via CLI

```bash
# Basic query
node bin/aiox-ids.js ids:query "validate story drafts"

# With JSON output
node bin/aiox-ids.js ids:query "template rendering engine" --json

# Filter by type
node bin/aiox-ids.js ids:query "database migration" --type script

# Filter by category
node bin/aiox-ids.js ids:query "agent persona" --category agents
```

### Uso Programático (Contexto de Agente)

```javascript
const path = require('path');
const { RegistryLoader } = require(path.resolve('.aiox-core/core/ids/registry-loader'));
const { IncrementalDecisionEngine } = require(path.resolve('.aiox-core/core/ids/incremental-decision-engine'));

const loader = new RegistryLoader();
loader.load();

const engine = new IncrementalDecisionEngine(loader);
const result = engine.analyze('validate story drafts before implementation');

// result.summary.decision → 'REUSE' | 'ADAPT' | 'CREATE'
// result.recommendations → ranked list with rationale
// result.justification → CREATE justification (if applicable)
```

---

## Interpretação da Decisão

| Decisão | Significado | Ação |
|----------|---------|--------|
| **REUSE** | Correspondência de relevância >=90% | Usar o artefato existente diretamente |
| **ADAPT** | Correspondência 60-89% + adaptável | Modificar o artefato existente (mudanças <30%) |
| **CREATE** | Sem correspondência adequada | Criar novo artefato com justificativa |

---

## Estrutura de Saída

```yaml
intent: "validate story drafts"
recommendations:
  - entityId: "validate-story"
    decision: "REUSE"
    confidence: "high"
    relevanceScore: 0.95
    rationale: "Strong match..."
summary:
  totalEntities: 474
  matchesFound: 3
  decision: "REUSE"
  confidence: "high"
rationale: "Found 3 matches above threshold..."
```

---

## Comandos Relacionados

- `aiox ids:create-review` — Revisar as decisões CREATE para a avaliação de 30 dias
- `*develop` — Workflow de desenvolvimento (usa as recomendações do IDS no gate G4)

---

## Metadata

```yaml
story: IDS-2
version: 1.0.0
dependencies:
  - registry-loader.js (IDS-1)
  - incremental-decision-engine.js (IDS-2)
tags:
  - ids
  - registry
  - decision-engine
updated_at: 2026-02-08
```
