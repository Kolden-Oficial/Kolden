# remove-worktree

**Task ID:** remove-worktree
**Version:** 1.0
**Created:** 2026-01-28 (Story 1.3)
**Agent:** @devops (Gage)

---

## Modos de ExecuÃ§Ã£o

**Escolha seu modo de execuÃ§Ã£o:**

### 1. Modo YOLO - RÃ¡pido, AutÃ´nomo (0-1 prompts)

- Remove o worktree sem confirmaÃ§Ã£o
- SÃ³ pergunta se houver mudanÃ§as nÃ£o commitadas
- **Melhor para:** Limpeza apÃ³s o merge

### 2. Modo Interativo - Seguro, com ConfirmaÃ§Ã£o (2-3 prompts) **[PADRÃƒO]**

- Sempre confirma antes da remoÃ§Ã£o
- Mostra os detalhes do worktree antes da exclusÃ£o
- **Melhor para:** SeguranÃ§a em produÃ§Ã£o

**ParÃ¢metro:** `mode` (opcional, padrÃ£o: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: removeWorktree()
responsÃ¡vel: Gage (DevOps)
responsavel_type: Agente
atomic_layer: Atom

inputs:
  - campo: story_id
    tipo: string
    origem: User Input
    obrigatÃ³rio: true
    validaÃ§Ã£o: Valid story identifier

  - campo: force
    tipo: boolean
    origem: User Input
    obrigatÃ³rio: false
    default: false
    validaÃ§Ã£o: Force removal even with uncommitted changes

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

## PrÃ©-CondiÃ§Ãµes

```yaml
pre-conditions:
  - [ ] Current directory is a git repository
    tipo: pre-condition
    blocker: true
    validaÃ§Ã£o: git rev-parse --is-inside-work-tree
    error_message: "NÃ£o Ã© um repositÃ³rio git."

  - [ ] Worktree exists for story
    tipo: pre-condition
    blocker: true
    validaÃ§Ã£o: manager.exists(storyId) === true
    error_message: "Worktree nÃ£o encontrado para esta story."

  - [ ] Not currently in the worktree being removed
    tipo: pre-condition
    blocker: true
    validaÃ§Ã£o: cwd !== worktreePath
    error_message: "NÃ£o Ã© possÃ­vel remover o worktree enquanto estiver dentro dele."
```

---

## PÃ³s-CondiÃ§Ãµes

```yaml
post-conditions:
  - [ ] Worktree directory removed
    tipo: post-condition
    blocker: true
    validaÃ§Ã£o: Directory .aiox/worktrees/{storyId} does not exist
    error_message: "O diretÃ³rio do worktree ainda existe."

  - [ ] Branch deleted (unless --keep-branch)
    tipo: post-condition
    blocker: false
    validaÃ§Ã£o: Branch auto-claude/{storyId} does not exist
    error_message: "O branch nÃ£o foi deletado (pode estar mergeado)."
```

---

## DescriÃ§Ã£o

Remove um worktree gerenciado pelo AIOX e seu branch associado. Inclui verificaÃ§Ãµes de seguranÃ§a para mudanÃ§as nÃ£o commitadas e oferece opÃ§Ãµes de remoÃ§Ã£o forÃ§ada.

**Recursos de SeguranÃ§a:**

- Avisa sobre mudanÃ§as nÃ£o commitadas
- Confirma antes da exclusÃ£o (modo interativo)
- NÃ£o pode remover enquanto estiver dentro do worktree
- Registra a remoÃ§Ã£o para a trilha de auditoria

---

## Entradas

| ParÃ¢metro  | Tipo    | ObrigatÃ³rio | PadrÃ£o  | DescriÃ§Ã£o                              |
| ---------- | ------- | ----------- | ------- | -------------------------------------- |
| `story_id` | string  | Sim         | -       | Identificador da story a ser removida  |
| `force`    | boolean | NÃ£o         | `false` | ForÃ§ar remoÃ§Ã£o com mudanÃ§as nÃ£o commitadas |

---

## Elicitation

```yaml
elicit: true # Confirms before destructive operation
```

Pergunta por confirmaÃ§Ã£o no modo interativo.

---

## Passos

### Passo 1: Validar RepositÃ³rio Git

**AÃ§Ã£o:** Verificar se o diretÃ³rio atual Ã© um repositÃ³rio git

```bash
git rev-parse --is-inside-work-tree 2>/dev/null
```

---

### Passo 2: Parsear o Story ID

**AÃ§Ã£o:** Extrair e validar o story ID a partir da entrada

**Se ausente, perguntar:**

```
ðŸ“ Digite o story ID do worktree a remover:
   Execute *list-worktrees para ver os worktrees disponÃ­veis.
```

---

### Passo 3: Verificar se o Worktree Existe

**AÃ§Ã£o:** Verificar se o worktree existe

```javascript
const WorktreeManager = require('./.aiox-core/infrastructure/scripts/worktree-manager.js');
const manager = new WorktreeManager();
const exists = await manager.exists(storyId);
```

**Se nÃ£o existir:**

```
âŒ Worktree nÃ£o encontrado para a story '{storyId}'.

Worktrees disponÃ­veis:
{list from manager.list()}

VocÃª quis dizer um destes?
```

---

### Passo 4: Obter InformaÃ§Ãµes do Worktree

**AÃ§Ã£o:** Recuperar os detalhes do worktree

```javascript
const worktree = await manager.get(storyId);
```

**Exibir:**

```
ðŸ“ Detalhes do Worktree

Story:              {storyId}
Path:               .aiox/worktrees/{storyId}
Branch:             auto-claude/{storyId}
Created:            {createdAt}
Uncommitted:        {uncommittedChanges} files
Status:             {status}
```

---

### Passo 5: Verificar MudanÃ§as NÃ£o Commitadas

**AÃ§Ã£o:** Avisar se houver mudanÃ§as nÃ£o commitadas

```javascript
if (worktree.uncommittedChanges > 0 && !force) {
  // Prompt for confirmation
}
```

**Aviso:**

```
âš ï¸  ATENÃ‡ÃƒO: MudanÃ§as NÃ£o Commitadas Detectadas!

Este worktree possui {uncommittedChanges} mudanÃ§as nÃ£o commitadas.
RemovÃª-lo irÃ¡ APAGAR PERMANENTEMENTE essas mudanÃ§as.

Arquivos com mudanÃ§as:
  - src/component.tsx
  - src/utils.ts
  - ...

OpÃ§Ãµes:
  1. Commitar as mudanÃ§as primeiro : cd .aiox/worktrees/{storyId} && git commit
  2. Mergear no branch base         : *merge-worktree {storyId}
  3. Remover forÃ§ado (perde dados)  : *remove-worktree {storyId} --force

Prosseguir com a remoÃ§Ã£o? [y/N]:
```

---

### Passo 6: Confirmar RemoÃ§Ã£o (Interativo)

**AÃ§Ã£o:** Confirmar antes da remoÃ§Ã£o no modo interativo

```
ðŸ—‘ï¸  Confirmar RemoÃ§Ã£o

VocÃª estÃ¡ prestes a remover:
  â€¢ Worktree: .aiox/worktrees/{storyId}
  â€¢ Branch:   auto-claude/{storyId}

Esta aÃ§Ã£o nÃ£o pode ser desfeita.

Digite 'yes' para confirmar:
```

---

### Passo 7: Remover o Worktree

**AÃ§Ã£o:** Executar a remoÃ§Ã£o

```javascript
await manager.remove(storyId, { force: options.force });
```

**Isto executa:**

1. `git worktree remove .aiox/worktrees/{storyId}`
2. `git branch -d auto-claude/{storyId}` (ou -D se force)

---

### Passo 8: Exibir Sucesso

**AÃ§Ã£o:** Confirmar que a remoÃ§Ã£o foi concluÃ­da

```
â•”â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•—
â•‘  âœ… Worktree Removido com Sucesso                           â•‘
â•šâ•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

Removido:
  â€¢ Worktree: .aiox/worktrees/{storyId}
  â€¢ Branch:   auto-claude/{storyId}

Worktrees restantes: {count.total}

Execute *list-worktrees para ver os worktrees restantes.
```

---

## SaÃ­das

### Valor de Retorno

```typescript
{
  removed: boolean; // true if successfully removed
  storyId: string; // The story ID that was removed
}
```

---

## ValidaÃ§Ã£o

- [ ] O diretÃ³rio do worktree nÃ£o existe mais
- [ ] O branch nÃ£o existe mais (a menos que mergeado em outro branch)
- [ ] O worktree nÃ£o aparece mais na lista

---

## Tratamento de Erros

### Worktree NÃ£o Encontrado

**Erro:**

```
âŒ Worktree nÃ£o encontrado para a story '{storyId}'.
```

**ResoluÃ§Ã£o:** Verifique o story ID com `*list-worktrees`.

### Atualmente Dentro do Worktree

**Erro:**

```
âŒ NÃ£o Ã© possÃ­vel remover o worktree enquanto estiver dentro dele.

   DiretÃ³rio atual: .aiox/worktrees/{storyId}

   Navegue para fora primeiro:
     cd {projectRoot}
```

**ResoluÃ§Ã£o:** Saia do worktree com `cd` primeiro.

### MudanÃ§as NÃ£o Commitadas (sem --force)

**Erro:**

```
âš ï¸  O worktree possui mudanÃ§as nÃ£o commitadas.

    Use --force para remover mesmo assim:
      *remove-worktree {storyId} --force

    Ou commite/mergeie as mudanÃ§as primeiro.
```

**ResoluÃ§Ã£o:** Use `--force` ou trate as mudanÃ§as.

### Comando Git Falhou

**Erro:**

```
âŒ Falha ao remover o worktree: {error.message}
```

**ResoluÃ§Ã£o:** Verifique o git status, pode ser necessÃ¡ria limpeza manual.

---

## Limpeza Manual

Se a remoÃ§Ã£o automÃ¡tica falhar:

```bash
# Remover o worktree
git worktree remove .aiox/worktrees/{storyId} --force

# Deletar o branch
git branch -D auto-claude/{storyId}

# Limpar referÃªncias de worktree
git worktree prune
```

---

## Notas de Performance

- **Tempo de remoÃ§Ã£o:** ~200-500ms
- **EspaÃ§o em disco:** Liberado imediatamente (hardlinks removidos)
- **Branch:** Deletado se nÃ£o estiver mergeado em outro lugar

---

## DependÃªncias

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

Esta task Ã© exposta como o comando de CLI `*remove-worktree` no agente @devops:

```yaml
commands:
  - 'remove-worktree {storyId}': Remove worktree (confirms first)
  - 'remove-worktree {storyId} --force': Force remove with uncommitted changes
```

---

**Status:** âœ… Production Ready
**Tested On:** Windows, Linux, macOS
**Git Requirement:** git >= 2.5 (worktree support)
