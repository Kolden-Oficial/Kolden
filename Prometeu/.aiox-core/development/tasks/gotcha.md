---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Task: Adicionar Gotcha

> **Command:** `*gotcha {title} - {description}`
> **Agent:** @dev
> **Story:** 9.4 - Gotchas Memory
> **AC:** AC5

---

## Propósito

Adicionar um gotcha (problema conhecido/workaround) manualmente à memória de gotchas do projeto.

---

## Uso

```bash
*gotcha {title}
*gotcha {title} - {description}
*gotcha {title} --category {category} --severity {severity}
```

### Argumentos

| Argumento   | Obrigatório | Descrição                          |
| ----------- | -------- | ---------------------------------- |
| title       | Sim      | Título curto para o gotcha         |
| description | Não      | Descrição detalhada (após " - ")   |

### Opções

| Opção        | Padrão  | Descrição                                                   |
| ------------ | ------- | ----------------------------------------------------------- |
| --category   | auto    | Categoria: build, test, lint, runtime, integration, security |
| --severity   | warning | Severidade: info, warning, critical                         |
| --workaround | -       | Texto da solução ou workaround                              |
| --files      | -       | Lista separada por vírgulas de arquivos relacionados        |

---

## Workflow

```yaml
steps:
  - name: Parse Input
    action: |
      1. Extract title from input
      2. Extract description if provided (after " - ")
      3. Parse any flags (--category, --severity, etc.)
    validates:
      - Title is not empty

  - name: Auto-detect Category
    action: |
      If category not provided, analyze title and description
      to detect category based on keywords:
      - build: build, compile, webpack, vite, etc.
      - test: test, jest, vitest, mock, etc.
      - lint: lint, eslint, prettier, etc.
      - runtime: TypeError, null, undefined, crash, etc.
      - integration: api, http, database, etc.
      - security: xss, csrf, auth, etc.

  - name: Create Gotcha
    action: |
      Use GotchasMemory.addGotcha() to create:
      {
        title: parsed title,
        description: parsed description,
        category: detected or provided,
        severity: provided or "warning",
        workaround: provided or null,
        relatedFiles: provided or []
      }

  - name: Confirm Creation
    action: |
      Display:
      - Gotcha ID
      - Title
      - Category (detected or provided)
      - Severity
```

---

## Exemplo de Saída

```
Added gotcha: gotcha-lxyz123-abc456

  Title: Always check fetch response.ok
  Category: integration (auto-detected)
  Severity: warning

  This gotcha will be shown when working on related tasks.
```

---

## Exemplos

```bash
# Simples
*gotcha Always check fetch response.ok

# Com descrição
*gotcha Zustand persist needs type annotation - Without explicit type, TypeScript cannot infer store type

# Com todas as opções
*gotcha Protected files need full read --category build --severity critical --workaround "Read without limit/offset"

# Com arquivos relacionados
*gotcha API endpoint CORS issue --files "src/api/client.ts,src/lib/fetch.ts"
```

---

## Integração

- **Uses:** `GotchasMemory.addGotcha()`
- **Script:** `.aiox-core/core/memory/gotchas-memory.js`
- **Outputs:** `.aiox/gotchas.json`, `.aiox/gotchas.md`

---

## Comandos Relacionados

- `*gotchas` - Listar todos os gotchas
- `*gotcha-context` - Obter gotchas relevantes para a task atual
- `*list-gotchas` - Comando legado (igual a \*gotchas)

---

_Arquivo de task para a Story 9.4 - Gotchas Memory_
