# Task: Build (Autônomo)

> **Comando:** `*build {story-id}`
> **Agente:** @dev
> **Story:** 8.5 - Build Orchestrator
> **AC:** AC2

---

## Propósito

Executar um build autônomo completo para uma story com um único comando.

Este é o **principal ponto de entrada** para o desenvolvimento autônomo. Ele orquestra todos os componentes:

- Isolamento por worktree
- Geração/carregamento do plano
- Execução de subtasks via Claude CLI
- Verificação de QA (lint, testes)
- Merge para a main
- Limpeza e relatório

---

## Uso

```bash
*build {story-id}
*build {story-id} --dry-run
*build {story-id} --verbose
*build {story-id} --no-merge --keep-worktree
```

### Argumentos

| Argumento | Obrigatório | Descrição                            |
| --------- | ----------- | ------------------------------------ |
| story-id  | Sim         | Identificador da story (ex.: "story-8.5") |

### Flags (AC4)

| Flag            | Descrição                                          |
| --------------- | -------------------------------------------------- |
| --dry-run       | Mostra o que aconteceria sem executar              |
| --no-merge      | Pula a fase de merge (mantém as mudanças na branch do worktree) |
| --keep-worktree | Não limpa o worktree após o build                  |
| --no-worktree   | Executa no diretório principal (sem isolamento)    |
| --no-qa         | Pula a fase de QA                                  |
| --verbose, -v   | Habilita saída detalhada                           |
| --timeout <ms>  | Timeout global (padrão: 2700000 = 45min)           |

---

## Pipeline (AC3)

```
┌─────────────┐    ┌─────────┐    ┌─────────────┐    ┌──────┐    ┌─────────┐    ┌─────────────┐
│  WORKTREE   │ ─► │  PLANO  │ ─► │   EXECUTAR  │ ─► │  QA  │ ─► │  MERGE  │ ─► │   LIMPEZA   │
│   Criar     │    │ Carregar│    │   Claude    │    │ Lint │    │ Para a  │    │  Worktree   │
│  isolado    │    │ /Gerar  │    │    CLI      │    │ Test │    │  main   │    │   Remover   │
└─────────────┘    └─────────┘    └─────────────┘    └──────┘    └─────────┘    └─────────────┘
```

### Detalhes das Fases

1. **WORKTREE** - Cria um git worktree isolado em `.aiox/worktrees/{story-id}`
2. **PLANO** - Carrega `plan/implementation.yaml` ou gera a partir dos ACs da story
3. **EXECUTAR** - Roda cada subtask usando o Claude CLI com loop de retry
4. **QA** - Roda lint, testes, typecheck (AC8)
5. **MERGE** - Mescla a branch do worktree para a main
6. **LIMPEZA** - Remove o worktree e gera o relatório

---

## Saída (AC6)

Relatório final gerado em `plan/build-report-{story-id}.md`:

```markdown
# Relatório de Build: story-8.5

> **Status:** ✅ SUCESSO
> **Duração:** 15m 32s

## Fases

| Fase     | Status       | Duração  |
| -------- | ------------ | -------- |
| worktree | ✅ concluída | 1200ms   |
| plano    | ✅ concluída | 500ms    |
| executar | ✅ concluída | 845000ms |
| qa       | ✅ concluída | 32000ms  |
| merge    | ✅ concluída | 2100ms   |
| limpeza  | ✅ concluída | 800ms    |
```

---

## Exemplos

```bash
# Build padrão (recomendado)
*build story-8.5

# Pré-visualizar o que aconteceria
*build story-8.5 --dry-run

# Modo debug com saída detalhada
*build story-8.5 --verbose

# Build sem merge (revisar as mudanças primeiro)
*build story-8.5 --no-merge --keep-worktree

# Build rápido sem QA (não recomendado)
*build story-8.5 --no-qa --no-merge
```

---

## Integração

- **Usa:**
  - `BuildOrchestrator` de `core/execution/build-orchestrator.js`
  - `AutonomousBuildLoop` de `core/execution/autonomous-build-loop.js`
  - `WorktreeManager` de `infrastructure/scripts/worktree-manager.js`
  - `GotchasMemory` de `core/memory/gotchas-memory.js`
- **Invoca:** Claude CLI para execução de subtasks
- **Produz:** `plan/build-report-{story-id}.md`

---

## Comandos Relacionados

- `*build-autonomous {story-id}` - Loop de build de nível mais baixo (sem worktree/merge)
- `*build-resume {story-id}` - Retomar build com falha a partir do checkpoint
- `*build-status {story-id}` - Verificar o progresso do build
- `*worktree-list` - Listar worktrees ativos

---

_Arquivo de task para a Story 8.5 - Build Orchestrator_
