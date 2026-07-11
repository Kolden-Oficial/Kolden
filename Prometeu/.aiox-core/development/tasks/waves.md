---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Task: `*waves` - Análise de Waves

<!-- Story: WIS-4 - Wave Analysis Engine -->
<!-- Version: 1.0.0 -->
<!-- Created: 2025-12-25 -->

## Visão Geral

Analisa as dependências entre as tasks de um workflow para identificar waves de tasks que podem executar em paralelo. Mostra oportunidades de otimização e o caminho crítico.

## Uso

```
*waves [workflow-name] [options]
```

## Argumentos

| Argumento | Tipo | Obrigatório | Descrição |
|----------|------|----------|-------------|
| `workflow` | string | Não | Nome do workflow a analisar (padrão: detecção automática a partir do contexto) |

## Opções

| Opção | Tipo | Descrição |
|--------|------|-------------|
| `--visual` | flag | Mostra a visualização ASCII da estrutura de waves |
| `--json` | flag | Saída em formato JSON |
| `--help` | flag | Mostra esta mensagem de ajuda |

## Exemplos

```bash
# Analisar o workflow atual (detectado automaticamente)
*waves

# Analisar um workflow específico
*waves story_development

# Representação visual em ASCII
*waves story_development --visual

# Saída JSON para uso programático
*waves story_development --json
```

## Saída

### Saída Padrão

```
Wave Analysis: story_development
════════════════════════════════════════

Wave 1 (parallel):
  └─ read-story
  └─ setup-branch

Wave 2:
  └─ implement

Wave 3 (parallel):
  └─ write-tests
  └─ update-docs

Wave 4:
  └─ run-tests

Total Sequential: 57min
Total Parallel:   42min
Optimization:     26% faster

Critical Path: read-story → implement → write-tests → run-tests
```

### Saída Visual (--visual)

```
Wave Analysis: story_development
════════════════════════════════════════

Wave 1 ──┬── read-story (5min)
         └── setup-branch (2min)
              │
Wave 2 ──────── implement (30min)
              │
Wave 3 ──┬── write-tests (10min)
         └── update-docs (5min)
              │
Wave 4 ──────── run-tests (5min)

Total Sequential: 57min
Total Parallel:   42min
Optimization:     26% faster

Critical Path: read-story → implement → write-tests → run-tests
```

### Saída JSON (--json)

```json
{
  "workflowId": "story_development",
  "totalTasks": 6,
  "waves": [
    {
      "waveNumber": 1,
      "tasks": ["read-story", "setup-branch"],
      "parallel": true,
      "dependsOn": [],
      "estimatedDuration": "5min"
    }
  ],
  "optimizationGain": "26%",
  "criticalPath": ["read-story", "implement", "write-tests", "run-tests"]
}
```

## Tratamento de Dependências Circulares

Se forem detectadas dependências circulares, o comando exibirá um erro:

```
❌ Circular Dependency Detected!

Cycle: task-a → task-b → task-c → task-a

Suggestion: Remove dependency from task-c to task-a
```

## Integração

### Com o Comando `*next`

A análise `*waves` integra-se ao comando `*next` para mostrar o contexto das waves:

```
🧭 Workflow: story_development
📍 State: in_development (Wave 2 of 4)

Current Wave (parallel):
  ├─ `*write-tests` - Write unit tests ⏳
  └─ `*update-docs` - Update documentation ⏳

Next Wave (after current completes):
  └─ `*run-tests` - Execute test suite

💡 Tip: Run both current wave tasks in parallel to save ~15min
```

## Implementação

```javascript
// Task implementation
const { analyzeWaves, createWaveAnalyzer } = require('.aiox-core/workflow-intelligence');

async function executeWaves(args, options) {
  const workflowId = args[0] || await detectCurrentWorkflow();
  const analyzer = createWaveAnalyzer();

  try {
    const result = analyzer.analyzeWaves(workflowId);
    const output = analyzer.formatOutput(result, {
      visual: options.visual,
      json: options.json
    });
    console.log(output);
  } catch (error) {
    if (error.name === 'CircularDependencyError') {
      console.error('❌ Circular Dependency Detected!\n');
      console.error(`Cycle: ${error.cycle.join(' → ')}`);
      console.error(`\nSuggestion: ${error.getSuggestion()}`);
      process.exit(1);
    }
    throw error;
  }
}
```

## Performance

| Tamanho do Workflow | Tempo de Análise |
|--------------|---------------|
| Pequeno (5 tasks) | <10ms |
| Médio (20 tasks) | <30ms |
| Grande (50 tasks) | <50ms |

## Comandos Relacionados

- `*next` - Obter sugestões do próximo comando (integra o contexto das waves)
- `*workflow` - Mostrar o status do workflow
- `*help` - Mostrar todos os comandos disponíveis

## Integração com Agentes

Esta task está disponível para:
- `@dev` - Agente Desenvolvedor

---

## Change Log

| Versão | Data | Mudanças |
|---------|------|---------|
| 1.0.0 | 2025-12-25 | Implementação inicial (WIS-4) |
