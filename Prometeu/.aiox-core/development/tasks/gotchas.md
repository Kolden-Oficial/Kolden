# Task: Listar Gotchas

> **Command:** `*gotchas [options]`
> **Agent:** @dev
> **Story:** 9.4 - Gotchas Memory
> **AC:** AC6

---

## Propósito

Listar e buscar gotchas conhecidos (problemas e workarounds) a partir da memória de gotchas do projeto.

---

## Uso

```bash
*gotchas
*gotchas --category {category}
*gotchas --severity {severity}
*gotchas --unresolved
*gotchas search {query}
```

### Opções

| Opção          | Padrão  | Descrição                                    |
| -------------- | ------- | -------------------------------------------- |
| --category     | all     | Filtrar por categoria                        |
| --severity     | all     | Filtrar por severidade (info, warning, critical) |
| --unresolved   | false   | Mostrar apenas gotchas não resolvidos        |
| --stats        | false   | Mostrar apenas estatísticas                  |
| search {query} | -       | Buscar gotchas por palavra-chave             |

---

## Workflow

```yaml
steps:
  - name: Load Gotchas
    action: |
      Load gotchas from .aiox/gotchas.json via GotchasMemory

  - name: Apply Filters
    action: |
      If --category: filter by category
      If --severity: filter by severity
      If --unresolved: filter out resolved gotchas
      If search: filter by keyword match

  - name: Display Results
    action: |
      For each gotcha, show:
      - [SEVERITY] Title
      - Category
      - Description (truncated)
      - Workaround (if exists)
      - Related files (if any)
      - Status (resolved/unresolved)

      If --stats:
        Show statistics instead of full list
```

---

## Exemplo de Saída

### Lista Padrão

```
=== Gotchas (12 total, 10 unresolved) ===

[CRITICAL] Protected files require full read
  Category: build
  Hook de read-protection bloqueia partial reads. Sempre usar Read sem limit/offset.
  Workaround: Ler arquivo completo, depois filtrar no código
  Files: **/CLAUDE.md, **/agents/*.md

[WARNING] Zustand persist needs type annotation
  Category: runtime
  Without explicit type parameter and extra parentheses, TypeScript cannot infer...
  Files: src/stores/*.ts

[INFO] React useEffect cleanup for async operations
  Category: runtime
  Without cleanup, race conditions can occur when component unmounts...

---
Total: 12 | Critical: 1 | Warning: 8 | Info: 3
```

### Com --stats

```
=== Gotchas Statistics ===

Total: 12
  - Unresolved: 10
  - Resolved: 2

By Category:
  - build: 3
  - test: 2
  - lint: 1
  - runtime: 4
  - integration: 1
  - security: 1

By Severity:
  - critical: 1
  - warning: 8
  - info: 3

By Source:
  - manual: 5
  - auto_detected: 7
```

---

## Categorias

| Categoria   | Descrição            | Palavras-chave                |
| ----------- | -------------------- | ----------------------------- |
| build       | Problemas de build/compilação | webpack, vite, tsc, bundle    |
| test        | Problemas de testes  | jest, vitest, mock, coverage  |
| lint        | Linting/formatação   | eslint, prettier, stylelint   |
| runtime     | Erros de runtime     | TypeError, null, undefined    |
| integration | Problemas de API/DB  | fetch, cors, postgres, prisma |
| security    | Problemas de segurança | xss, csrf, auth, injection    |

---

## Integração

- **Uses:** `GotchasMemory.listGotchas()`, `GotchasMemory.search()`
- **Script:** `.aiox-core/core/memory/gotchas-memory.js`
- **Source:** `.aiox/gotchas.json`

---

## Comandos Relacionados

- `*gotcha {title}` - Adicionar um novo gotcha
- `*gotcha-context` - Obter gotchas relevantes para a task atual
- `*list-gotchas` - Alias legado para este comando

---

_Arquivo de task para a Story 9.4 - Gotchas Memory_
