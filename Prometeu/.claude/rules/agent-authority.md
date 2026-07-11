---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.claude/rules/_indice|_indice]]"
---

# Autoridade de Agentes — Regras Detalhadas

## Matriz de Delegação

### @devops (Gage) — Autoridade EXCLUSIVA

| Operação | Exclusiva? | Outros Agentes |
|-----------|-----------|--------------|
| `git push` / `git push --force` | SIM | BLOQUEADO |
| `gh pr create` / `gh pr merge` | SIM | BLOQUEADO |
| Adicionar/remover/configurar MCP | SIM | BLOQUEADO |
| Gestão de pipeline CI/CD | SIM | BLOQUEADO |
| Gestão de releases | SIM | BLOQUEADO |

### @pm (Morgan) — Orquestração de Epics

| Operação | Exclusiva? | Delegada De |
|-----------|-----------|---------------|
| `*execute-epic` | SIM | — |
| `*create-epic` | SIM | — |
| Gestão do EPIC-{ID}-EXECUTION.yaml | SIM | — |
| Levantamento de requisitos | SIM | — |
| Escrita de spec (spec pipeline) | SIM | — |

### @po (Pax) — Validação de Stories

| Operação | Exclusiva? | Detalhes |
|-----------|-----------|---------|
| `*validate-story-draft` | SIM | checklist de 10 pontos |
| Rastreamento de contexto de story em epics | SIM | — |
| Gestão de contexto de epic | SIM | — |
| Priorização de backlog | SIM | — |

### @sm (River) — Criação de Stories

| Operação | Exclusiva? | Detalhes |
|-----------|-----------|---------|
| `*draft` / `*create-story` | SIM | A partir de epic/PRD |
| Seleção de template de story | SIM | — |

### @dev (Dex) — Implementação

| Permitido | Bloqueado |
|---------|---------|
| `git add`, `git commit`, `git status` | `git push` (delegar para @devops) |
| `git branch`, `git checkout`, `git merge` (local) | `gh pr create/merge` (delegar para @devops) |
| `git stash`, `git diff`, `git log` | Gestão de MCP |
| Atualizações de arquivo de story (File List, checkboxes) | Atualizações de arquivo de story (AC, escopo, título) |

### @architect (Aria) — Autoridade de Design

| Detém | Delega Para |
|------|-------------|
| Decisões de arquitetura de sistema | — |
| Seleção de tecnologia | — |
| Arquitetura de dados de alto nível | @data-engineer (DDL detalhado) |
| Padrões de integração | @data-engineer (otimização de queries) |
| Avaliação de complexidade | — |

### @data-engineer (Dara) — Banco de Dados

| Detém (delegado de @architect) | NÃO Detém |
|----------------------------------|-------------|
| Design de schema (DDL detalhado) | Arquitetura de sistema |
| Otimização de queries | Código de aplicação |
| Implementação de políticas RLS | Operações git |
| Execução da estratégia de índices | Frontend/UI |
| Planejamento e execução de migrations | — |

### @aiox-master — Governança do Framework

Antes da execução, o @aiox-master DEVE verificar se algum agente exclusivo detém a solicitação. A delegação é o padrão para trabalho especializado; a execução direta é limitada à governança do framework, orquestração, modo workflow-engine e debugging explícito do framework com `--force-execute`.

| Execução Direta | Delegar por Padrão | Bloqueado |
|------------------|---------------------|---------|
| Governança do framework e enforcement constitucional | Criação de story → @sm (`create-next-story.md`, `*draft`, `*create-story`) | `git push` / `gh pr create` / `gh pr merge` → apenas @devops |
| Modificações no framework de agentes/tasks/workflows | Trabalho de epic/PRD/spec → @pm | Adicionar/remover/configurar MCP → apenas @devops |
| Orquestração cross-agent e meta-operações | Validação de story/backlog → @po | Execução direta de tasks especializadas exclusivas sem `--force-execute` |
| Execução de workflow-engine ou debugging explícito do framework com `--force-execute` | Implementação → @dev; QA/revisão → @qa; arquitetura → @architect; banco de dados → @data-engineer; pesquisa → @analyst | — |

## Padrões de Delegação Cross-Agent

### Fluxo de Git Push
```
QUALQUER agente → @devops *push
```

### Fluxo de Design de Schema
```
@architect (decide a tecnologia) → @data-engineer (implementa o DDL)
```

### Fluxo de Story
```
@sm *draft → @po *validate → @dev *develop → @qa *qa-gate → @devops *push
```

### Fluxo de Epic
```
@pm *create-epic → @pm *execute-epic → @sm *draft (por story)
```

## Regras de Escalonamento

1. Agente não consegue concluir a task → Escalar para @aiox-master
2. Quality gate falha → Retornar para @dev com feedback específico
3. Violação constitucional detectada → BLOQUEAR, exigir correção antes de prosseguir
4. Conflito de fronteira entre agentes → @aiox-master media
