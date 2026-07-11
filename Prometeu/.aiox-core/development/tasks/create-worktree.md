---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# create-worktree

**Task ID:** create-worktree
**Versão:** 1.0
**Criado:** 2026-01-28 (Story 1.3)
**Agente:** @devops (Gage)

---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts) **[PADRÃO]**

- Criação autônoma de worktree
- Interação mínima do usuário
- **Melhor para:** Setup rápido de story

### 2. Modo Interativo - Equilibrado, Educativo (2-3 prompts)

- Confirma o ID da story e as opções
- Mostra o caminho do worktree antes da criação
- **Melhor para:** Usuários de primeira viagem

**Parâmetro:** `mode` (opcional, padrão: `yolo`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: createWorktree()
responsável: Gage (DevOps)
responsavel_type: Agente
atomic_layer: Atom

inputs:
  - campo: story_id
    tipo: string
    origem: User Input
    obrigatório: true
    validação: Identificador de story válido (ex.: 'STORY-42', '1.3', 'fix-auth')

  - campo: options
    tipo: object
    origem: User Input
    obrigatório: false
    validação: Sobrescritas de configuração opcionais

outputs:
  - campo: worktree_info
    tipo: WorktreeInfo
    destino: Return value
    persistido: false

  - campo: worktree_path
    tipo: string
    destino: File system
    persistido: true
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

```yaml
pre-conditions:
  - [ ] O diretório atual é um repositório git
    tipo: pre-condition
    blocker: true
    validação: git rev-parse --is-inside-work-tree
    error_message: "Not a git repository. Initialize git first."

  - [ ] WorktreeManager está disponível
    tipo: pre-condition
    blocker: true
    validação: Script exists at .aiox-core/infrastructure/scripts/worktree-manager.js
    error_message: "WorktreeManager not found. Ensure AIOX is properly installed."

  - [ ] Limite máximo de worktrees não atingido
    tipo: pre-condition
    blocker: true
    validação: Current worktrees < maxWorktrees (default: 10)
    error_message: "Maximum worktrees limit reached. Remove stale worktrees first."
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a conclusão da task

```yaml
post-conditions:
  - [ ] O diretório do worktree existe
    tipo: post-condition
    blocker: true
    validação: Directory exists at .aiox/worktrees/{storyId}
    error_message: "Worktree directory was not created."

  - [ ] O branch existe
    tipo: post-condition
    blocker: true
    validação: Branch auto-claude/{storyId} exists
    error_message: "Worktree branch was not created."
```

---

## Critérios de Aceite

```yaml
acceptance-criteria:
  - [ ] Worktree criado com estado git isolado
    tipo: acceptance-criterion
    blocker: true

  - [ ] O branch segue a convenção de nomenclatura auto-claude/{storyId}
    tipo: acceptance-criterion
    blocker: true

  - [ ] O worktree aparece na lista
    tipo: acceptance-criterion
    blocker: true
```

---

## Ferramentas

**Recursos externos usados por esta task:**

- **Ferramenta:** WorktreeManager
  - **Propósito:** Operações de git worktree
  - **Origem:** .aiox-core/infrastructure/scripts/worktree-manager.js

- **Ferramenta:** git
  - **Propósito:** Operações de controle de versão
  - **Origem:** Instalação git do sistema

---

## Descrição

Cria um worktree Git isolado para desenvolver uma story em paralelo. Cada worktree tem seu próprio diretório de trabalho e branch, permitindo que várias stories sejam trabalhadas simultaneamente sem conflitos.

**Casos de uso:**

- Começar a trabalhar em uma nova story de forma isolada
- Habilitar o Auto-Claude a desenvolver stories de forma autônoma
- Rodar trilhas de desenvolvimento paralelas

---

## Entradas

| Parâmetro  | Tipo   | Obrigatório | Padrão | Descrição                                |
| ---------- | ------ | -------- | ------- | ------------------------------------------ |
| `story_id` | string | Sim      | -       | Identificador de story (ex.: 'STORY-42', '1.3') |

---

## Elicitação

```yaml
elicit: false
```

Esta task roda de forma autônoma. Se story_id não for fornecido, solicitar uma vez.

---

## Passos

### Passo 1: Validar o Repositório Git

**Ação:** Verificar se o diretório atual é um repositório git

```bash
git rev-parse --is-inside-work-tree 2>/dev/null
```

**Condição de Saída:** Se não for um repo git:

```
❌ Not a git repository.
   Initialize git first: git init
```

---

### Passo 2: Analisar o ID da Story

**Ação:** Extrair e validar o ID da story a partir da entrada

**Validação:**

- Deve ser uma string não vazia
- Pode conter alfanuméricos, hífens, pontos, underscores
- Exemplos: `STORY-42`, `1.3`, `fix-auth-bug`

**Se ausente, solicitar:**

```
📝 Enter story ID for the worktree:
   Example: STORY-42, 1.3, fix-auth-bug
```

---

### Passo 3: Verificar Worktree Existente

**Ação:** Verificar se o worktree ainda não existe

```javascript
const WorktreeManager = require('./.aiox-core/infrastructure/scripts/worktree-manager.js');
const manager = new WorktreeManager();
const exists = await manager.exists(storyId);
```

**Se existir:**

```
⚠️  Worktree for '{storyId}' already exists.
    Path: .aiox/worktrees/{storyId}
    Branch: auto-claude/{storyId}

    Use *list-worktrees to see all worktrees.
```

---

### Passo 4: Verificar o Limite de Worktrees

**Ação:** Garantir que não atingimos o máximo de worktrees

```javascript
const count = await manager.getCount();
if (count.total >= manager.maxWorktrees) {
  // Show error with stale worktrees to clean up
}
```

**Se o limite for atingido:**

```
❌ Maximum worktrees limit (10) reached.

   Current worktrees: 10
   Stale worktrees: {count.stale}

   Run *cleanup-worktrees to remove stale worktrees, or
   Run *remove-worktree {storyId} to remove a specific one.
```

---

### Passo 5: Criar o Worktree

**Ação:** Criar o worktree usando o WorktreeManager

```javascript
const worktreeInfo = await manager.create(storyId);
```

**Cria:**

- Diretório: `.aiox/worktrees/{storyId}/`
- Branch: `auto-claude/{storyId}`

---

### Passo 6: Exibir Sucesso

**Ação:** Mostrar a confirmação de criação

```
╔══════════════════════════════════════════════════════════════╗
║  ✅ Worktree Created Successfully                            ║
╚══════════════════════════════════════════════════════════════╝

Story:    {storyId}
Path:     .aiox/worktrees/{storyId}
Branch:   auto-claude/{storyId}
Status:   active

Next Steps:
  • cd .aiox/worktrees/{storyId}  - Navigate to worktree
  • git status                    - Check worktree state
  • *list-worktrees               - See all worktrees
  • *merge-worktree {storyId}     - Merge back when done
```

---

## Saídas

### Valor de Retorno

```typescript
interface WorktreeInfo {
  storyId: string; // 'STORY-42'
  path: string; // '/abs/path/.aiox/worktrees/STORY-42'
  branch: string; // 'auto-claude/STORY-42'
  createdAt: Date; // Creation timestamp
  uncommittedChanges: number; // 0 (new worktree)
  status: 'active' | 'stale'; // 'active'
}
```

### Sistema de Arquivos

- `.aiox/worktrees/{storyId}/` - Diretório isolado do worktree

---

## Validação

- [ ] O diretório do worktree existe e está acessível
- [ ] O branch git `auto-claude/{storyId}` existe
- [ ] O worktree aparece em `git worktree list`
- [ ] O worktree está limpo (sem mudanças não commitadas)

---

## Tratamento de Erros

### Não é um Repositório Git

**Erro:**

```
❌ Not a git repository.
```

**Resolução:** Rodar `git init` primeiro.

### Worktree Já Existe

**Erro:**

```
⚠️  Worktree for '{storyId}' already exists.
```

**Resolução:** Usar o worktree existente ou removê-lo primeiro.

### Máximo de Worktrees Atingido

**Erro:**

```
❌ Maximum worktrees limit (10) reached.
```

**Resolução:** Rodar `*cleanup-worktrees` ou `*remove-worktree`.

### Comando Git Worktree Falhou

**Erro:**

```
❌ Failed to create worktree: {error.message}
```

**Resolução:** Verificar o status do git e garantir que não há conflitos.

---

## Rollback

Para remover um worktree criado:

```bash
*remove-worktree {storyId}
```

Ou manualmente:

```bash
git worktree remove .aiox/worktrees/{storyId}
git branch -d auto-claude/{storyId}
```

---

## Notas de Performance

- **Tempo de criação:** ~500ms-2s (depende do tamanho do repo)
- **Uso de disco:** Igual a um shallow clone (hardlinks para objetos)
- **Overhead de branch:** Mínimo (apenas o ponteiro de ref)

---

## Dependências

### Scripts

- `.aiox-core/infrastructure/scripts/worktree-manager.js` - Gerenciador principal

### Pacotes NPM

- `execa` - Execução de comandos git
- `chalk` - Cores no terminal

### Comandos Git Usados

- `git worktree add` - Criar worktree
- `git branch` - Criar/gerenciar branches

---

## Relacionados

- **Story:** 1.3 - CLI Commands for Worktree Management
- **Script:** `.aiox-core/infrastructure/scripts/worktree-manager.js`
- **Tasks:** `list-worktrees.md`, `remove-worktree.md`, `merge-worktree.md`

---

## Registro de Comando

Esta task é exposta como o comando CLI `*create-worktree` no agente @devops:

```yaml
commands:
  - 'create-worktree {storyId}': Create isolated worktree for story development
```

---

**Status:** ✅ Pronto para Produção
**Testado Em:** Windows, Linux, macOS
**Requisito Git:** git >= 2.5 (suporte a worktree)
