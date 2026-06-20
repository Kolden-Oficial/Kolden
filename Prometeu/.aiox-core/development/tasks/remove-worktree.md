# remove-worktree

**Task ID:** remove-worktree
**Version:** 1.0
**Created:** 2026-01-28 (Story 1.3)
**Agent:** @devops (Gage)

---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)

- Remove o worktree sem confirmação
- Só pergunta se houver mudanças não commitadas
- **Melhor para:** Limpeza após o merge

### 2. Modo Interativo - Seguro, com Confirmação (2-3 prompts) **[PADRÃO]**

- Sempre confirma antes da remoção
- Mostra os detalhes do worktree antes da exclusão
- **Melhor para:** Segurança em produção

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Task Definition (AIOX Task Format V1.0)

```yaml
task: removeWorktree()
responsável: Gage (DevOps)
responsavel_type: Agente
atomic_layer: Atom

inputs:
  - campo: story_id
    tipo: string
    origem: User Input
    obrigatório: true
    validação: Valid story identifier

  - campo: force
    tipo: boolean
    origem: User Input
    obrigatório: false
    default: false
    validação: Force removal even with uncommitted changes

outputs:
  - campo: removed
    tipo: boolean
    destino: Return value
    persistido: false

  - campo: story_id
    tipo: string
    destino: Return value
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
    error_message: "Não é um repositório git."

  - [ ] Worktree exists for story
    tipo: pre-condition
    blocker: true
    validação: manager.exists(storyId) === true
    error_message: "Worktree não encontrado para esta story."

  - [ ] Not currently in the worktree being removed
    tipo: pre-condition
    blocker: true
    validação: cwd !== worktreePath
    error_message: "Não é possível remover o worktree enquanto estiver dentro dele."
```

---

## Pós-Condições

```yaml
post-conditions:
  - [ ] Worktree directory removed
    tipo: post-condition
    blocker: true
    validação: Directory .aiox/worktrees/{storyId} does not exist
    error_message: "O diretório do worktree ainda existe."

  - [ ] Branch deleted (unless --keep-branch)
    tipo: post-condition
    blocker: false
    validação: Branch auto-claude/{storyId} does not exist
    error_message: "O branch não foi deletado (pode estar mergeado)."
```

---

## Descrição

Remove um worktree gerenciado pelo AIOX e seu branch associado. Inclui verificações de segurança para mudanças não commitadas e oferece opções de remoção forçada.

**Recursos de Segurança:**

- Avisa sobre mudanças não commitadas
- Confirma antes da exclusão (modo interativo)
- Não pode remover enquanto estiver dentro do worktree
- Registra a remoção para a trilha de auditoria

---

## Entradas

| Parâmetro  | Tipo    | Obrigatório | Padrão  | Descrição                              |
| ---------- | ------- | ----------- | ------- | -------------------------------------- |
| `story_id` | string  | Sim         | -       | Identificador da story a ser removida  |
| `force`    | boolean | Não         | `false` | Forçar remoção com mudanças não commitadas |

---

## Elicitation

```yaml
elicit: true # Confirms before destructive operation
```

Pergunta por confirmação no modo interativo.

---

## Passos

### Passo 1: Validar Repositório Git

**Ação:** Verificar se o diretório atual é um repositório git

```bash
git rev-parse --is-inside-work-tree 2>/dev/null
```

---

### Passo 2: Parsear o Story ID

**Ação:** Extrair e validar o story ID a partir da entrada

**Se ausente, perguntar:**

```
📝 Digite o story ID do worktree a remover:
   Execute *list-worktrees para ver os worktrees disponíveis.
```

---

### Passo 3: Verificar se o Worktree Existe

**Ação:** Verificar se o worktree existe

```javascript
const WorktreeManager = require('./.aiox-core/infrastructure/scripts/worktree-manager.js');
const manager = new WorktreeManager();
const exists = await manager.exists(storyId);
```

**Se não existir:**

```
❌ Worktree não encontrado para a story '{storyId}'.

Worktrees disponíveis:
{list from manager.list()}

Você quis dizer um destes?
```

---

### Passo 4: Obter Informações do Worktree

**Ação:** Recuperar os detalhes do worktree

```javascript
const worktree = await manager.get(storyId);
```

**Exibir:**

```
📁 Detalhes do Worktree

Story:              {storyId}
Path:               .aiox/worktrees/{storyId}
Branch:             auto-claude/{storyId}
Created:            {createdAt}
Uncommitted:        {uncommittedChanges} files
Status:             {status}
```

---

### Passo 5: Verificar Mudanças Não Commitadas

**Ação:** Avisar se houver mudanças não commitadas

```javascript
if (worktree.uncommittedChanges > 0 && !force) {
  // Prompt for confirmation
}
```

**Aviso:**

```
⚠️  ATENÇÃO: Mudanças Não Commitadas Detectadas!

Este worktree possui {uncommittedChanges} mudanças não commitadas.
Removê-lo irá APAGAR PERMANENTEMENTE essas mudanças.

Arquivos com mudanças:
  - src/component.tsx
  - src/utils.ts
  - ...

Opções:
  1. Commitar as mudanças primeiro : cd .aiox/worktrees/{storyId} && git commit
  2. Mergear no branch base         : *merge-worktree {storyId}
  3. Remover forçado (perde dados)  : *remove-worktree {storyId} --force

Prosseguir com a remoção? [y/N]:
```

---

### Passo 6: Confirmar Remoção (Interativo)

**Ação:** Confirmar antes da remoção no modo interativo

```
🗑️  Confirmar Remoção

Você está prestes a remover:
  • Worktree: .aiox/worktrees/{storyId}
  • Branch:   auto-claude/{storyId}

Esta ação não pode ser desfeita.

Digite 'yes' para confirmar:
```

---

### Passo 7: Remover o Worktree

**Ação:** Executar a remoção

```javascript
await manager.remove(storyId, { force: options.force });
```

**Isto executa:**

1. `git worktree remove .aiox/worktrees/{storyId}`
2. `git branch -d auto-claude/{storyId}` (ou -D se force)

---

### Passo 8: Exibir Sucesso

**Ação:** Confirmar que a remoção foi concluída

```
╔══════════════════════════════════════════════════════════════╗
║  ✅ Worktree Removido com Sucesso                           ║
╚══════════════════════════════════════════════════════════════╝

Removido:
  • Worktree: .aiox/worktrees/{storyId}
  • Branch:   auto-claude/{storyId}

Worktrees restantes: {count.total}

Execute *list-worktrees para ver os worktrees restantes.
```

---

## Saídas

### Valor de Retorno

```typescript
{
  removed: boolean; // true if successfully removed
  storyId: string; // The story ID that was removed
}
```

---

## Validação

- [ ] O diretório do worktree não existe mais
- [ ] O branch não existe mais (a menos que mergeado em outro branch)
- [ ] O worktree não aparece mais na lista

---

## Tratamento de Erros

### Worktree Não Encontrado

**Erro:**

```
❌ Worktree não encontrado para a story '{storyId}'.
```

**Resolução:** Verifique o story ID com `*list-worktrees`.

### Atualmente Dentro do Worktree

**Erro:**

```
❌ Não é possível remover o worktree enquanto estiver dentro dele.

   Diretório atual: .aiox/worktrees/{storyId}

   Navegue para fora primeiro:
     cd {projectRoot}
```

**Resolução:** Saia do worktree com `cd` primeiro.

### Mudanças Não Commitadas (sem --force)

**Erro:**

```
⚠️  O worktree possui mudanças não commitadas.

    Use --force para remover mesmo assim:
      *remove-worktree {storyId} --force

    Ou commite/mergeie as mudanças primeiro.
```

**Resolução:** Use `--force` ou trate as mudanças.

### Comando Git Falhou

**Erro:**

```
❌ Falha ao remover o worktree: {error.message}
```

**Resolução:** Verifique o git status, pode ser necessária limpeza manual.

---

## Limpeza Manual

Se a remoção automática falhar:

```bash
# Remover o worktree
git worktree remove .aiox/worktrees/{storyId} --force

# Deletar o branch
git branch -D auto-claude/{storyId}

# Limpar referências de worktree
git worktree prune
```

---

## Notas de Performance

- **Tempo de remoção:** ~200-500ms
- **Espaço em disco:** Liberado imediatamente (hardlinks removidos)
- **Branch:** Deletado se não estiver mergeado em outro lugar

---

## Dependências

### Scripts

- `.aiox-core/infrastructure/scripts/worktree-manager.js`

### Comandos Git Usados

- `git worktree remove` - Remover o worktree
- `git branch -d/-D` - Deletar o branch

---

## Relacionados

- **Story:** 1.3 - CLI Commands for Worktree Management
- **Tasks:** `create-worktree.md`, `list-worktrees.md`, `cleanup-worktrees.md`

---

## Registro de Comando

Esta task é exposta como o comando de CLI `*remove-worktree` no agente @devops:

```yaml
commands:
  - 'remove-worktree {storyId}': Remove worktree (confirms first)
  - 'remove-worktree {storyId} --force': Force remove with uncommitted changes
```

---

**Status:** ✅ Production Ready
**Tested On:** Windows, Linux, macOS
**Git Requirement:** git >= 2.5 (worktree support)
