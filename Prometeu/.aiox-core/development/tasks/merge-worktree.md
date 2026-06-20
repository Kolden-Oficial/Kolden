# merge-worktree

Faz o merge do branch de um worktree de volta ao seu branch base.

## Propósito

Concluir o workflow de worktree fazendo o merge das mudanças de volta ao branch base.

## Uso

```bash
*merge-worktree {worktree-name}
```

## Parâmetros

- `worktree-name` - Nome do worktree a ser mesclado

## Passos

1. Verificar se o worktree existe: `git worktree list`
2. Rodar os quality gates no branch do worktree:
   - `npm run lint`
   - `npm test`
   - `npm run typecheck`
3. Fazer checkout do branch base: `git checkout {base-branch}`
4. Fazer merge do branch do worktree: `git merge {worktree-branch}`
5. Tratar conflitos, se houver (com auxílio do usuário)
6. Fazer push das mudanças mescladas: delegar para `*push`
7. Opcionalmente remover o worktree: `*remove-worktree`

## Segurança

- Os quality gates devem passar antes do merge
- O usuário confirma a direção do merge
- A resolução de conflitos requer input do usuário

## Relacionados

- `*create-worktree` - Criar worktree
- `*remove-worktree` - Remover worktree
- `*push` - Fazer push das mudanças mescladas
