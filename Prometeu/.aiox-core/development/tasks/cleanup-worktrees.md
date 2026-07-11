---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# cleanup-worktrees

Remove todos os git worktrees obsoletos mais antigos que o limiar especificado.

## Propósito

Limpar worktrees abandonados para manter a higiene do repositório.

## Uso

```bash
*cleanup-worktrees [--days=30]
```

## Parâmetros

- `--days` - Limiar de idade em dias (padrão: 30)

## Passos

1. Listar todos os worktrees: `git worktree list`
2. Identificar worktrees obsoletos (sem commits > limiar)
3. Apresentar a lista para confirmação do usuário
4. Para cada worktree aprovado:
   - Remover o worktree: `git worktree remove {path}`
   - Apagar a branch se já mesclada: `git branch -d {branch}`
5. Reportar o resumo da limpeza

## Verificações de Segurança

- Nunca remover worktree com mudanças não commitadas
- Sempre confirmar com o usuário antes da exclusão
- Manter worktrees com atividade recente

## Relacionados

- `*list-worktrees` - Listar todos os worktrees
- `*remove-worktree` - Remover um único worktree
- `*create-worktree` - Criar novo worktree
