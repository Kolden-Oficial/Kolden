# Sugestões do Comando Next

## Propósito

Sugerir os próximos comandos com base no contexto atual do workflow usando o Workflow Intelligence System (WIS). Ajuda os usuários a navegar pelos workflows de forma eficiente sem memorizar sequências de comandos.

O modo runtime-first do AIOX 4.0.4 adiciona recomendação determinística do próximo passo a partir de
sinais de execução (story/qa/ci/diff) via `workflow-state-manager`. Esse módulo
é um helper de compatibilidade legada para `*next`; o novo estado persistente de story/epic
pertence a `.aiox-core/core/orchestration/session-state.js`.

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: next()
agent: "@dev"
responsável: Dex (Developer)
responsavel_type: Agente
atomic_layer: Workflow

elicit: false

inputs:
  - name: story
    type: path
    required: false
    description: Explicit story path for context

  - name: all
    type: flag
    required: false
    default: false
    description: Show all suggestions instead of top 3

  - name: help
    type: flag
    required: false
    default: false
    description: Show usage documentation

outputs:
  - name: suggestions
    type: array
    destino: Console
    persistido: false

  - name: workflow_context
    type: object
    destino: Console
    persistido: false
```

---

## Pré-Condições

```yaml
pre-conditions:
  - [ ] WIS modules are available
    tipo: pre-condition
    blocker: false
    validação: Check workflow-intelligence module loads
    error_message: "WIS not available. Suggestions may be limited."

  - [ ] Session state exists (optional)
    tipo: pre-condition
    blocker: false
    validação: Check .aiox/session-state.json exists
    error_message: "No session history. Using project context only."
```

---

## Passos de Implementação

### Passo 1: Verificar a Flag de Ajuda
```javascript
if (args.help) {
  displayHelp();
  return;
}
```

### Passo 2: Construir o Contexto
```javascript
const SuggestionEngine = require('.aiox-core/workflow-intelligence/engine/suggestion-engine');
const engine = new SuggestionEngine();

// Build context from multiple sources
const context = await engine.buildContext({
  storyOverride: args.story,    // Explicit story path (optional)
  autoDetect: true              // Auto-detect from session/git
});
```

### Passo 3: Recomendação Determinística Runtime-First (Preferida)
```javascript
const { WorkflowStateManager } = require('.aiox-core/development/scripts/workflow-state-manager');
const manager = new WorkflowStateManager();

const runtimeNext = manager.getNextActionRecommendation(
  {
    story_status: context.projectState?.storyStatus || 'unknown',
    qa_status: context.projectState?.qaStatus || 'unknown',
    ci_status: context.projectState?.ciStatus || 'unknown',
    has_uncommitted_changes: context.projectState?.hasUncommittedChanges || false,
  },
  { story: args.story || context.storyPath || '' },
);
```

### Passo 4: Obter Sugestões do WIS (Fallback / enriquecimento)
```javascript
const result = await engine.suggestNext(context);

// result = {
//   workflow: 'story_development',
//   currentState: 'in_development',
//   confidence: 0.92,
//   suggestions: [
//     { command: '*review-qa', args: '${story_path}', description: '...', confidence: 0.95, priority: 1 },
//     ...
//   ]
// }
```

### Passo 5: Formatar a Saída
```javascript
const formatter = require('.aiox-core/workflow-intelligence/engine/output-formatter');

const runtimeSuggestion = {
  command: runtimeNext.command,
  args: '',
  description: runtimeNext.rationale,
  confidence: runtimeNext.confidence,
  priority: 1,
};
const mergedSuggestions = [runtimeSuggestion, ...(result.suggestions || [])];
const displaySuggestions = args.all ? mergedSuggestions : mergedSuggestions.slice(0, 3);

// Display formatted output
formatter.displaySuggestions({
  workflow: result.workflow || 'runtime_first',
  currentState: runtimeNext.state,
  confidence: runtimeNext.confidence,
  suggestions: displaySuggestions,
});
```

---

## Texto de Ajuda

```
Usage: *next [options]

Suggests next commands based on current workflow context.

Options:
  --story <path>  Explicit story path for context
  --all           Show all suggestions (not just top 3)
  --help          Show this help message

Examples:
  *next                                    # Auto-detect context
  *next --story docs/stories/v4.0.4/sprint-10/story-wis-3.md
  *next --all                              # Show all suggestions

How it works:
  1. Analyzes your recent commands and current agent
  2. Matches to known workflow patterns (story development, epic creation, etc.)
  3. Determines your current state in the workflow
  4. Suggests most likely next commands with confidence scores

Workflow detection uses:
  - Recent command history (last 10 commands)
  - Current active agent
  - Git branch and status
  - Active story (if any)
```

---

## Formato de Saída

### Saída Padrão
```
🧭 Workflow: story_development
📍 State: in_development (confidence: 92%)

Next steps:
1. `*review-qa docs/stories/v4.0.4/sprint-10/story-wis-3.md` - Run QA review
2. `*run-tests` - Execute test suite manually
3. `*pre-push-quality-gate` - Final quality checks

Type a number to execute, or press Enter to continue manually.
```

### Saída de Baixa Confiança
```
🧭 Workflow: unknown
📍 State: uncertain (confidence: 35%)

Possible next steps (uncertain):
1. `*help` - Show available commands
2. `*status` - Check project status

⚠️ Low confidence - context is unclear. Try providing --story flag.
```

### Nenhuma Correspondência de Workflow
```
🧭 Workflow: none detected
📍 State: N/A

Unable to determine workflow from current context.

Try:
  *next --story <path-to-story>
  *help

Recent commands: *develop, *run-tests
Current agent: @dev
```

---

## Pós-Condições

```yaml
post-conditions:
  - [ ] Suggestions displayed within 100ms
    tipo: post-condition
    blocker: false
    validação: Measure execution time

  - [ ] Output is properly formatted
    tipo: post-condition
    blocker: true
    validação: Verify console output matches expected format
```

---

## Tratamento de Erros

| Erro | Causa | Resolução |
|-------|-------|------------|
| Módulo WIS não encontrado | Dependência ausente | Fallback para sugestões genéricas |
| Estado de sessão corrompido | JSON inválido | Limpar a sessão, mostrar aviso |
| Caminho de story inválido | Arquivo não existe | Aviso, usar auto-detecção |
| Nenhuma correspondência de workflow | Padrão de comando desconhecido | Mostrar mensagem "unable to determine" |

**Estratégia de Recuperação de Erros:**
```javascript
try {
  const result = await engine.suggestNext(context);
  formatter.displaySuggestions(result);
} catch (error) {
  console.warn(`⚠️ Suggestion engine error: ${error.message}`);
  // Fallback: show generic suggestions
  formatter.displayFallback();
}
```

---

## Performance

```yaml
duration_expected: <100ms (target)
cost_estimated: $0.00 (no API calls)
token_usage: 0 (local processing only)

optimizations:
  - Workflow patterns cached (5-min TTL)
  - Lazy loading of WIS modules
  - Session state read once per call
```

---

## Saída de Sucesso

```
============================================
 SUGGESTION ENGINE RESULTS
============================================

 Context:
   Agent: @dev
   Last Command: *develop
   Story: docs/stories/v4.0.4/sprint-11/story-wis-3.md
   Branch: feature/wis-3

 Workflow: story_development
 State: in_development
 Confidence: 92%

 Suggestions:
   1. *review-qa (confidence: 95%)
   2. *run-tests (confidence: 80%)
   3. *pre-push-quality-gate (confidence: 75%)

============================================
```

---

## Metadados

```yaml
story: WIS-3
version: 1.0.0
created: 2025-12-25
author: "@dev (Dex)"
dependencies:
  modules:
    - workflow-intelligence (from WIS-2)
    - core/session/context-loader
  tasks: []
tags:
  - workflow-intelligence
  - suggestions
  - navigation
  - context-aware
```
