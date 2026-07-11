---
tipo: doc
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/docs/en/aiox-workflows/README|README]]"
---

# Workflow de Worktree Automático

> **EN** | [PT](../../aiox-workflows/auto-worktree-workflow.md) | [ES](../../es/aiox-workflows/auto-worktree-workflow.md)

---

**Documentação completa disponível em:** [Versão em Português](../../aiox-workflows/auto-worktree-workflow.md)

---

## Resumo

O **Workflow de Worktree Automático** gerencia worktrees do Git para desenvolvimento paralelo. Ele automatiza:

- Criação de worktree para feature branches
- Configuração de ambiente em novos worktrees
- Limpeza de worktree após o merge
- Gerenciamento e sincronização de branches

### Quando Usar

- Trabalhar em múltiplas funcionalidades simultaneamente
- Isolar mudanças experimentais
- Desenvolvimento paralelo sem stashing
- Revisão de pull requests localmente

### Agentes Principais

- `@devops` - Operações de Git (autoridade exclusiva de push)
- `@dev` - Desenvolvimento em worktrees

### Fases Principais

1. **Criação** - Novo worktree a partir de uma branch
2. **Setup** - Dependências e configuração de ambiente
3. **Desenvolvimento** - Trabalho em worktree isolado
4. **Sincronização** - Mantendo os worktrees atualizados
5. **Limpeza** - Remoção de worktrees já mesclados

### Benefícios

- Sem troca de contexto com git stash
- Múltiplas funcionalidades em paralelo
- Separação limpa de responsabilidades
- Configuração fácil para revisão de PR

### Comandos

```bash
# Create worktree for feature branch
git worktree add ../feature-name feature-branch

# List worktrees
git worktree list

# Remove worktree
git worktree remove ../feature-name
```

---

*Para detalhes completos, diagramas e instruções passo a passo, veja a [documentação em Português](../../aiox-workflows/auto-worktree-workflow.md).*
