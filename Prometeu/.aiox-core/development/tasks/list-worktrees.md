---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# list-worktrees

**Task ID:** list-worktrees
**Version:** 1.0
**Created:** 2026-01-28 (Story 1.3)
**Agent:** @devops (Gage)

---

## Modos de Execução

**Modo Único:** YOLO (sempre autônomo, operação somente leitura)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: listWorktrees()
responsável: Gage (DevOps)
responsavel_type: Agente
atomic_layer: Atom

inputs:
  - campo: format
    tipo: enum
    origem: User Input
    obrigatório: false
    validação: 'table | json | minimal'
    default: table

  - campo: filter
    tipo: enum
    origem: User Input
    obrigatório: false
    validação: 'all | active | stale'
    default: all

outputs:
  - campo: worktrees
    tipo: WorktreeInfo[]
    destino: Return value
    persistido: false

  - campo: formatted_output
    tipo: string
    destino: Console
    persistido: false
```

---

## Pré-Condições

```yaml
pre-conditions:
  - [ ] Current directory is a git repository
    tipo: pre-condition
    blocker: true
    validação: git rev-parse --is-inside-work-tree
    error_message: "Not a git repository."

  - [ ] WorktreeManager is available
    tipo: pre-condition
    blocker: true
    validação: Script exists at .aiox-core/infrastructure/scripts/worktree-manager.js
    error_message: "WorktreeManager not found."
```

---

## Descrição

Lista todos os worktrees gerenciados pelo AIOX com seu status atual, mudanças não commitadas e idade. Fornece visibilidade sobre as atividades de desenvolvimento paralelo.

**Funcionalidades:**

- Mostra todos os worktrees ativos gerenciados pelo AIOX
- Exibe a contagem de mudanças não commitadas
- Destaca worktrees obsoletos (> 30 dias)
- Múltiplos formatos de saída (table, json, minimal)

---

## Entradas

| Parâmetro | Tipo | Obrigatório | Padrão  | Descrição                           |
| --------- | ---- | ----------- | ------- | ----------------------------------- |
| `format`  | enum | Não         | `table` | Formato de saída: table, json, minimal |
| `filter`  | enum | Não         | `all`   | Filtro: all, active, stale          |

---

## Elicitação

```yaml
elicit: false
```

Operação somente leitura, executa autonomamente.

---

## Passos

### Passo 1: Validar o Repositório Git

**Ação:** Verificar se o diretório atual é um repositório git

```bash
git rev-parse --is-inside-work-tree 2>/dev/null
```

**Condição de Saída:** Se não for um repositório git:

```
❌ Not a git repository.
```

---

### Passo 2: Carregar os Worktrees

**Ação:** Obter todos os worktrees gerenciados pelo AIOX

```javascript
const WorktreeManager = require('./.aiox-core/infrastructure/scripts/worktree-manager.js');
const manager = new WorktreeManager();
const worktrees = await manager.list();
```

---

### Passo 3: Aplicar o Filtro

**Ação:** Filtrar os worktrees com base no status

```javascript
let filtered = worktrees;
if (filter === 'active') {
  filtered = worktrees.filter((w) => w.status === 'active');
} else if (filter === 'stale') {
  filtered = worktrees.filter((w) => w.status === 'stale');
}
```

---

### Passo 4: Formatar a Saída

**Ação:** Formatar com base no formato solicitado

#### Formato Table (padrão)

```javascript
const output = manager.formatList(filtered);
console.log(output);
```

**Exemplo de Saída:**

```
📁 Active Worktrees (3/10)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🟢 STORY-42     │ auto-claude/STORY-42      │ 3 uncommitted   │ 2h ago
🟡 STORY-43     │ auto-claude/STORY-43      │ clean           │ 1d ago
⚫ STORY-40     │ auto-claude/STORY-40      │ clean           │ 35d ago (stale)
```

**Legenda:**

- 🟢 Ativo com mudanças não commitadas
- 🟡 Ativo e limpo
- ⚫ Obsoleto (> 30 dias de idade)

#### Formato JSON

```javascript
console.log(JSON.stringify(filtered, null, 2));
```

**Exemplo de Saída:**

```json
[
  {
    "storyId": "STORY-42",
    "path": "/abs/path/.aiox/worktrees/STORY-42",
    "branch": "auto-claude/STORY-42",
    "createdAt": "2026-01-28T10:00:00.000Z",
    "uncommittedChanges": 3,
    "status": "active"
  }
]
```

#### Formato Minimal

```javascript
filtered.forEach((w) => console.log(w.storyId));
```

**Exemplo de Saída:**

```
STORY-42
STORY-43
STORY-40
```

---

### Passo 5: Exibir o Resumo

**Ação:** Mostrar contagens de resumo (apenas formato table)

```
───────────────────────────────────────────────────
Total: 3  │  Active: 2  │  Stale: 1  │  Limit: 10

💡 Run *cleanup-worktrees to remove stale worktrees
```

---

### Passo 6: Tratar Caso Vazio

**Ação:** Se nenhum worktree for encontrado

```
📁 No Active Worktrees

No AIOX-managed worktrees found.

Create one with:
  *create-worktree {storyId}

Example:
  *create-worktree STORY-42
```

---

## Saídas

### Valor de Retorno

```typescript
interface WorktreeInfo[] {
  storyId: string;
  path: string;
  branch: string;
  createdAt: Date;
  uncommittedChanges: number;
  status: 'active' | 'stale';
}
```

### Saída no Console

Lista formatada com base no parâmetro `format`.

---

## Validação

- [ ] Retorna um array (vazio se não houver worktrees)
- [ ] Cada worktree tem storyId, path e branch válidos
- [ ] O status identifica corretamente os worktrees obsoletos (> 30 dias)
- [ ] A contagem de mudanças não commitadas é precisa

---

## Tratamento de Erros

### Não É um Repositório Git

**Erro:**

```
❌ Not a git repository.
```

**Resolução:** Navegar até um repositório git.

### WorktreeManager Não Encontrado

**Erro:**

```
❌ WorktreeManager not found.
   Ensure AIOX is properly installed.
```

**Resolução:** Verificar a instalação do AIOX.

---

## Notas de Performance

- **Tempo de listagem:** ~200-500ms (git worktree list + verificações de status)
- **Sem gravações em disco:** Operação somente leitura
- **Cache:** Nenhum (sempre dados atualizados)

---

## Dependências

### Scripts

- `.aiox-core/infrastructure/scripts/worktree-manager.js`

### Comandos Git Utilizados

- `git worktree list --porcelain` - Listar todos os worktrees
- `git status --porcelain` - Verificar mudanças não commitadas por worktree

---

## Relacionados

- **Story:** 1.3 - CLI Commands for Worktree Management
- **Tasks:** `create-worktree.md`, `remove-worktree.md`, `cleanup-worktrees.md`

---

## Registro de Comando

Esta task é exposta como comando CLI `*list-worktrees` no agente @devops:

```yaml
commands:
  - 'list-worktrees': List all active worktrees with status
  - 'list-worktrees --json': Output as JSON
  - 'list-worktrees --stale': Show only stale worktrees
```

---

**Status:** ✅ Production Ready
**Tested On:** Windows, Linux, macOS
**Git Requirement:** git >= 2.5 (worktree support)
