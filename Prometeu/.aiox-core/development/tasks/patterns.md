# Gestão de Padrões Aprendidos

## Propósito

Visualizar, gerenciar e revisar padrões de workflow aprendidos, capturados pelo Workflow Intelligence System (WIS). Os padrões são aprendidos a partir de execuções de workflow bem-sucedidas e aumentam a confiança das sugestões.

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: patterns()
agent: "@dev"
responsável: Dex (Developer)
responsavel_type: Agente
atomic_layer: Workflow

elicit: false

inputs:
  - name: subcommand
    type: enum
    required: false
    default: list
    options: [list, stats, prune, review]
    description: Ação a executar

  - name: status
    type: enum
    required: false
    options: [pending, active, promoted, deprecated]
    description: Filtra padrões por status

  - name: limit
    type: number
    required: false
    default: 10
    description: Número máximo de padrões a exibir

  - name: help
    type: flag
    required: false
    default: false
    description: Mostra a documentação de uso

outputs:
  - name: patterns
    type: array
    destino: Console
    persistido: false

  - name: stats
    type: object
    destino: Console
    persistido: false
```

---

## Pré-Condições

```yaml
pre-conditions:
  - [ ] Módulo de aprendizado disponível
    tipo: pre-condition
    blocker: true
    validação: Verificar se o módulo workflow-intelligence/learning carrega
    error_message: "Módulo de aprendizado de padrões não disponível."

  - [ ] Armazenamento de padrões existe
    tipo: pre-condition
    blocker: false
    validação: Verificar se .aiox-core/data/learned-patterns.yaml existe
    error_message: "Nenhum padrão armazenado ainda."
```

---

## Passos de Implementação

### Passo 1: Verificar a Flag de Help
```javascript
if (args.help) {
  displayHelp();
  return;
}
```

### Passo 2: Carregar o Módulo de Aprendizado
```javascript
const learning = require('.aiox-core/workflow-intelligence/learning');
const store = learning.getDefaultStore();
```

### Passo 3: Executar o Subcomando

#### Listar Padrões
```javascript
if (args.subcommand === 'list' || !args.subcommand) {
  const data = store.load();
  let patterns = data.patterns;

  // Filter by status if provided
  if (args.status) {
    patterns = patterns.filter(p => p.status === args.status);
  }

  // Sort by occurrences (descending)
  patterns.sort((a, b) => (b.occurrences || 1) - (a.occurrences || 1));

  // Limit results
  patterns = patterns.slice(0, args.limit || 10);

  displayPatternList(patterns);
}
```

#### Mostrar Estatísticas
```javascript
if (args.subcommand === 'stats') {
  const stats = store.getStats();
  displayStats(stats);
}
```

#### Podar Padrões
```javascript
if (args.subcommand === 'prune') {
  const result = store.prune();
  console.log(`✓ Pruned ${result.pruned} patterns. ${result.remaining} remaining.`);
}
```

#### Revisar Padrões
```javascript
if (args.subcommand === 'review') {
  const pendingPatterns = store.getByStatus('pending');

  if (pendingPatterns.length === 0) {
    console.log('No patterns pending review.');
    return;
  }

  // Interactive review (uses elicitation)
  for (const pattern of pendingPatterns) {
    const action = await promptReviewAction(pattern);
    if (action === 'quit') break;

    store.updateStatus(pattern.id, action === 'promote' ? 'active' : action);
    console.log(`✓ Pattern ${action}d.`);
  }
}
```

---

## Texto de Ajuda

```text
Usage: *patterns [subcommand] [options]

Manage learned workflow patterns.

Subcommands:
  list     List all learned patterns (default)
  stats    Show pattern statistics
  prune    Remove stale/low-value patterns
  review   Interactive review of pending patterns

Options:
  --status <status>  Filter by status (pending, active, promoted, deprecated)
  --limit <n>        Limit results (default: 10)
  --help             Show this help message

Examples:
  *patterns                          # List top 10 patterns
  *patterns list --status active     # List active patterns only
  *patterns stats                    # Show statistics
  *patterns prune                    # Remove stale patterns
  *patterns review                   # Review pending patterns

Pattern Lifecycle:
  1. pending  - Newly captured, awaiting review
  2. active   - Validated, used in suggestions
  3. promoted - High-value, prioritized in suggestions
  4. deprecated - Marked for removal
```

---

## Formatos de Saída

### Saída de List
```text
Learned Patterns (15 total)
═══════════════════════════

Top Patterns by Occurrence:
1. validate-story-draft → develop → review-qa
   Occurrences: 12 | Success: 95% | Status: promoted
   Workflow: story_development | Last seen: 2h ago

2. develop → review-qa → apply-qa-fixes
   Occurrences: 8 | Success: 88% | Status: active
   Workflow: story_development | Last seen: 1d ago

3. create-story → validate-story-draft → develop
   Occurrences: 6 | Success: 100% | Status: active
   Workflow: story_creation | Last seen: 3d ago

Showing 3 of 15 patterns. Use --limit to see more.
```

### Saída de Stats
```text
Pattern Learning Statistics
═══════════════════════════

Storage:
  Total patterns: 15
  Max patterns: 100
  Utilization: 15%

By Status:
  Pending: 3
  Active: 9
  Promoted: 2
  Deprecated: 1

Quality:
  Avg success rate: 92%
  Total occurrences: 45

Storage file: .aiox-core/data/learned-patterns.yaml
Last updated: 2025-12-26T10:30:00Z
```

### Saída de Review
```text
*patterns review

Patterns Pending Review (3)
═══════════════════════════

Pattern #1: develop → run-tests → review-qa
Occurrences: 4 | Success Rate: 100% | First Seen: 2 days ago
[P]romote  [S]kip  [D]eprecate  [Q]uit

> p

✓ Pattern promoted to active status

Pattern #2: create-story → develop
Occurrences: 2 | Success Rate: 50% | First Seen: 5 days ago
[P]romote  [S]kip  [D]eprecate  [Q]uit

> d

✓ Pattern deprecated

Review complete. 1 promoted, 0 skipped, 1 deprecated.
```

---

## Pós-Condições

```yaml
post-conditions:
  - [ ] Saída exibida corretamente
    tipo: post-condition
    blocker: false
    validação: Verificar se a saída do console corresponde ao formato esperado

  - [ ] Armazenamento atualizado para prune/review
    tipo: post-condition
    blocker: true
    validação: Verificar se learned-patterns.yaml foi modificado
```

---

## Tratamento de Erros

| Erro | Causa | Resolução |
|-------|-------|------------|
| Módulo de aprendizado não encontrado | Dependência ausente | Mostrar mensagem de erro |
| Arquivo de armazenamento corrompido | YAML inválido | Resetar para vazio, mostrar aviso |
| Nenhum padrão encontrado | Armazenamento vazio | Mostrar mensagem "no patterns" |
| Revisão cancelada | Usuário saiu | Salvar quaisquer mudanças feitas |

**Estratégia de Recuperação de Erros:**
```javascript
try {
  const stats = store.getStats();
  displayStats(stats);
} catch (error) {
  console.error(`⚠️ Error reading patterns: ${error.message}`);
  console.log('Try running: rm .aiox-core/data/learned-patterns.yaml');
}
```

---

## Performance

```yaml
duration_expected: <50ms
cost_estimated: $0.00 (apenas arquivo local)
token_usage: 0

optimizations:
  - Carregamento de padrões em cache (TTL de 5s)
  - Parsing lazy do YAML
  - Exibição em streaming para listas grandes
```

---

## Metadados

```yaml
story: WIS-5
version: 1.0.0
created: 2025-12-26
author: "@dev (Dex)"
dependencies:
  modules:
    - workflow-intelligence/learning
  tasks: []
tags:
  - workflow-intelligence
  - patterns
  - learning
  - management
```
