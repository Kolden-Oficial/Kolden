---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Task: Atualizar o Framework AIOX

> **Version:** 4.0.0
> **Created:** 2026-01-29
> **Updated:** 2026-01-31
> **Type:** SYNC (sincronização git-native do framework)
> **Agent:** @devops (Gage) ou @aiox (Orion)
> **Execution:** Script bash simples (~15 linhas)

## Propósito

Sincronização git-native do framework AIOX a partir do repositório upstream. Usa sparse clone + comparação de arquivos para revisão segura antes de aplicar as mudanças. Todas as customizações locais são preservadas automaticamente por backup/restore.

---

## Uso Rápido

```bash
# Run the update script
bash .aiox-core/scripts/update-aiox.sh

# Review changes shown by the script, then:
git add .aiox-core && git commit -m "chore: sync AIOX framework"   # Apply changes
# OR
git checkout -- .aiox-core/                                         # Cancel changes
```

---

## Como Funciona

O script usa sparse clone + comparação de arquivos:

1. **Clonar o upstream** - Sparse shallow clone de SynkraAI/aiox-core (apenas `.aiox-core/`)
2. **Comparar arquivos** - Usa `comm` para comparação O(n) da lista de arquivos
3. **Backup dos arquivos local-only** - Arquivos que existem apenas localmente são salvos em backup
4. **Sincronizar** - Copia os arquivos do upstream, restaura os arquivos local-only
5. **Reportar** - Mostra as contagens de criados/atualizados/excluídos/preservados
6. **Usuário decide** - Commit para aplicar ou checkout para cancelar

**Por que esta abordagem:**
- Sparse clone é rápido (~5 segundos)
- Comparação O(n) vs loops aninhados O(n²)
- Arquivos local-only sempre preservados
- Relatório claro antes de commitar

---

## Arquivos Protegidos (NUNCA sobrescritos)

Estes caminhos são preservados automaticamente (arquivos local-only são salvos em backup e restaurados):

| Path | Reason |
|------|--------|
| `.aiox-core/squads/` | Copywriters customizados, data, ralph |
| `.aiox-core/marketing/` | Agentes/tasks específicos de marketing |
| `source/` | YAML de contexto de negócio |
| `Knowledge/` | Bases de conhecimento |
| `.aiox-core/context/` | Contextos compilados |
| `CLAUDE.md` | Regras do projeto |
| `.claude/commands/` | Comandos customizados |
| `.claude/rules/` | Regras customizadas |
| `.antigravity/` | Configuração do Antigravity |
| `.gemini/` | Configuração do Gemini |
| `MCPs/` | Integrações MCP |
| `Contexto/` | Contexto de negócio |
| `Output/` | Entregáveis |
| `docs/` | Documentação do projeto |
| `scripts/` | Scripts Python |
| `.env` | Segredos |

---

## Definição da Task

```yaml
task: updateAIOXFramework
agent: devops
mode: simple
timeout: 60  # 1 minute max

execution:
  script: .aiox-core/scripts/update-aiox.sh

workflow:
  1. If dirty working tree: git add -A && git commit -m "chore: pre-update commit"
  2. bash .aiox-core/scripts/update-aiox.sh
  3. Review changes displayed
  4. git add .aiox-core && git commit -m "chore: sync AIOX framework"  # to apply
  5. git checkout -- .aiox-core/                                        # to cancel

pre-conditions:
  - git status clean (if dirty, auto-commit with "chore: pre-update commit")

post-conditions:
  - local-only files preserved (backup/restore)
  - changes ready for review (unstaged)

acceptance:
  - script completes without error
  - user can review changes before committing
  - local customizations preserved
```

---

## Verificação

Após rodar o script:

```bash
# Check that local-only files are preserved
ls -la .aiox-core/squads/  # if exists
ls -la source/                       # if exists

# See what changed (unstaged)
git diff --stat
```

---

## Tratamento de Erros

| Error | Cause | Resolution |
|-------|-------|------------|
| "Commit changes first" | Mudanças não commitadas | O agente faz auto-commit antes de rodar o script |
| "Failed to fetch upstream" | Problema de rede | Verifique a conexão com a internet |
| Conflitos de merge | Arquivo alterado tanto localmente quanto no upstream | O script resolve automaticamente preservando o local |

---

## Rollback

```bash
# If you already committed and want to undo:
git reset --hard HEAD~1

# If you haven't committed yet:
git checkout -- .aiox-core/
```

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 4.0.0 | 2026-01-31 | **SIMPLIFIED:** Abordagem git-native, script bash de 15 linhas substitui JS de 847 linhas |
| 3.1.0 | 2026-01-30 | Proteção dinâmica para comandos de squad |
| 3.0.0 | 2026-01-29 | Modo YOLO com rsync |
| 1.0.0 | 2026-01-29 | Versão inicial (verbosa, interativa) |
