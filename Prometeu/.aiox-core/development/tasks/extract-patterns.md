# Extrair Padrões

## Propósito

Extrair e documentar padrões de código da base de código. Analisa o código via AST e regex para detectar padrões comuns usados no projeto, gerando um arquivo `patterns.md` que serve como referência para os agentes (especialmente o Spec Writer) ao criar novas funcionalidades.

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: extract-patterns()
agent: "@dev"
responsável: Dex (Developer)
responsavel_type: Agente
atomic_layer: Workflow

elicit: false

inputs:
  - name: subcommand
    type: enum
    required: false
    default: extract
    options: [extract, json, save, merge]
    description: Action to perform

  - name: root
    type: string
    required: false
    default: "."
    description: Project root path

  - name: output
    type: string
    required: false
    description: Custom output file path

  - name: category
    type: string
    required: false
    description: Extract only specific category (e.g., "State Management")

  - name: quiet
    type: flag
    required: false
    default: false
    description: Suppress console output

  - name: help
    type: flag
    required: false
    default: false
    description: Show usage documentation

outputs:
  - name: patterns_markdown
    type: string
    destino: File (.aiox/patterns.md)
    persistido: true

  - name: patterns_json
    type: object
    destino: Console or File
    persistido: false

  - name: summary
    type: object
    destino: Console
    persistido: false
```

---

## Pré-Condições

```yaml
pre-conditions:
  - [ ] Project root is a valid codebase
    tipo: pre-condition
    blocker: true
    validação: Check package.json or .aiox-core exists
    error_message: "Could not find project root. Run from within a project directory."

  - [ ] Code files exist
    tipo: pre-condition
    blocker: true
    validação: At least one .ts/.tsx/.js/.jsx file exists
    error_message: "No code files found to analyze."
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

### Passo 2: Inicializar o Extrator de Padrões
```javascript
const PatternExtractor = require('.aiox-core/infrastructure/scripts/pattern-extractor');
const extractor = new PatternExtractor(args.root);
```

### Passo 3: Detectar Padrões
```javascript
const patterns = await extractor.detectPatterns();
```

### Passo 4: Executar o Subcomando

#### Extract (Padrão)
```javascript
if (args.subcommand === 'extract' || !args.subcommand) {
  const markdown = extractor.generateMarkdown();

  if (args.output) {
    await fs.writeFile(args.output, markdown);
    console.log(`Patterns saved to: ${args.output}`);
  } else {
    console.log(markdown);
  }
}
```

#### Saída JSON
```javascript
if (args.subcommand === 'json') {
  const json = extractor.toJSON();

  if (args.output) {
    await fs.writeFile(args.output, JSON.stringify(json, null, 2));
    console.log(`JSON saved to: ${args.output}`);
  } else {
    console.log(JSON.stringify(json, null, 2));
  }
}
```

#### Salvar na Localização Padrão
```javascript
if (args.subcommand === 'save') {
  const savedPath = await extractor.savePatterns(args.output);
  console.log(`Patterns saved to: ${savedPath}`);
}
```

#### Mesclar com Existente
```javascript
if (args.subcommand === 'merge') {
  const mergedPath = await extractor.mergeWithExisting(args.output);
  console.log(`Patterns merged and saved to: ${mergedPath}`);
}
```

---

## Texto de Ajuda

```text
Usage: *extract-patterns [subcommand] [options]

Extract and document code patterns from the codebase.

Subcommands:
  extract     Extract patterns and output as markdown (default)
  json        Output patterns as JSON
  save        Save to .aiox/patterns.md
  merge       Merge with existing patterns file

Options:
  --root <path>       Project root (default: current directory)
  --output <path>     Custom output file path
  --category <name>   Extract specific category only
  --quiet             Suppress console output
  --help              Show this help message

Pattern Categories:
  - State Management  (Zustand, Redux, Context)
  - API Calls         (SWR, fetch, React Query)
  - Error Handling    (try-catch, ErrorBoundary, toast)
  - Components        (memo, compound, conditional classes)
  - Hooks             (custom hooks, useEffect cleanup)
  - Data Access       (Prisma, fs.promises)
  - Testing           (Jest structure, mocks)
  - Utilities         (class-based, functional)

Examples:
  *extract-patterns                           # Output to console
  *extract-patterns save                      # Save to .aiox/patterns.md
  *extract-patterns json --output p.json      # Save as JSON
  *extract-patterns --category "State"        # Only state patterns
  *extract-patterns merge                     # Update existing file

Output File:
  Default location: .aiox/patterns.md
  This file is referenced by the Spec Writer for consistent patterns.
```

---

## Formatos de Saída

### Saída Markdown (Padrão)
```markdown
# Project Patterns

> Auto-generated from codebase analysis
> Last updated: 2026-01-28T14:00:00Z

## Table of Contents

- [State Management](#state-management)
- [API Calls](#api-calls)
- [Error Handling](#error-handling)
...

## State Management

### Zustand Store with Persist

\`\`\`typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ExampleState {
  data: Data | null;
  loading: boolean;
  ...
}

export const useExampleStore = create<ExampleState>()(
  persist(
    (set, get) => ({
      ...
    }),
    { name: 'example-storage' }
  )
);
\`\`\`

**When to use:** Any domain state that needs persistence across sessions.

**Files using this pattern:** authStore.ts, userStore.ts, settingsStore.ts

---
```

### Saída JSON
```json
{
  "generated": "2026-01-28T14:00:00Z",
  "rootPath": "/path/to/project",
  "totalPatterns": 12,
  "categories": {
    "State Management": [
      {
        "name": "Zustand Store with Persist",
        "description": "...",
        "whenToUse": "...",
        "example": "...",
        "filesUsing": ["store.ts"],
        "confidence": 0.95
      }
    ]
  }
}
```

### Saída do Resumo
```text
Scanning patterns in: /path/to/project
Patterns saved to: .aiox/patterns.md

Total patterns detected: 12
  State Management: 3
  API Calls: 2
  Error Handling: 2
  Components: 2
  Hooks: 1
  Data Access: 1
  Testing: 1
```

---

## Pós-Condições

```yaml
post-conditions:
  - [ ] Patterns file created/updated
    tipo: post-condition
    blocker: false
    validação: Check .aiox/patterns.md exists and is valid markdown

  - [ ] Summary displayed
    tipo: post-condition
    blocker: false
    validação: Console shows pattern count summary
```

---

## Integração com o Spec Writer

O arquivo `patterns.md` gerado é automaticamente referenciado pelo Spec Writer (Epic 3) quando:

1. **Criando novas stories** - Os padrões informam a abordagem de implementação
2. **Revisando código** - Garante consistência com os padrões existentes
3. **Sugerindo arquitetura** - Usa os padrões detectados como baseline

### Referência no Spec Writer

```yaml
# In spec-write.md task
references:
  - path: .aiox/patterns.md
    purpose: Ensure new code follows existing patterns
    usage: Include relevant patterns in implementation notes
```

---

## Tratamento de Erros

| Erro | Causa | Resolução |
|-------|-------|------------|
| Project root not found | Caminho inválido | Use --root para especificar o caminho correto |
| No code files found | Projeto vazio | Garanta que o projeto tenha arquivos .ts/.tsx/.js |
| Permission denied | Acesso a arquivo | Verifique as permissões do diretório |
| Invalid category | Erro de digitação no nome da categoria | Use o nome exato da categoria conforme a ajuda |

**Estratégia de Recuperação de Erros:**
```javascript
try {
  const patterns = await extractor.detectPatterns();
  displaySummary(patterns);
} catch (error) {
  console.error(`⚠️ Error extracting patterns: ${error.message}`);
  console.log('Ensure you are in a valid project directory.');
}
```

---

## Performance

```yaml
duration_expected: 5-30s (depends on codebase size)
cost_estimated: $0.00 (local file operations only)
token_usage: 0

optimizations:
  - File caching during scan
  - Early termination for pattern detection
  - Incremental updates with merge command
  - Excluded directories: node_modules, .git, dist, build
```

---

## Script de CLI

```bash
# Direct script execution
node .aiox-core/infrastructure/scripts/pattern-extractor.js [command] [options]

# Via AIOX command
*extract-patterns [command] [options]
```

---

## Metadados

```yaml
story: "7.3"
epic: "Epic 7 - Memory Layer"
version: 1.0.0
created: 2026-01-29
author: "@dev (Dex)"
dependencies:
  modules:
    - .aiox-core/infrastructure/scripts/pattern-extractor.js
  tasks: []
  referenced_by:
    - spec-write.md
tags:
  - memory-layer
  - patterns
  - code-analysis
  - spec-writer
  - documentation
```
