---
name: coderabbit-review
description: |
  Execução unificada do CodeRabbit CLI via WSL com loop de autocorreção.
  Use esta skill ao rodar revisão de código automatizada antes de commits, PRs ou gates de QA.
  Lida com o wrapper de WSL, filtragem por severidade e iterações de auto-fix.
user-invocable: true
argument-hint: "[scope: uncommitted|committed|base]"
grounding_required: false
categoria_art_iv: MCP-nativo
squads_consumidores: [Prometeu-interno]
tipo: skill
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
---

# CodeRabbit Review

Execução centralizada do CodeRabbit CLI para revisão de código automatizada via WSL.

## Pré-requisitos

- CodeRabbit CLI instalado no WSL em `~/.local/bin/coderabbit`
- Distribuição WSL: Ubuntu
- Autenticado: `wsl bash -c '~/.local/bin/coderabbit auth status'`

## Execução

### 1. Determinar o Escopo

Faça o parse de `$ARGUMENTS` para determinar o escopo da revisão:

| Argumento | Comando | Caso de Uso |
|-----------|---------|-------------|
| `uncommitted` (padrão) | `--prompt-only -t uncommitted` | Revisão pré-commit |
| `committed` | `--prompt-only -t committed --base main` | Revisão de story no QA |
| `base {branch}` | `--prompt-only --base {branch}` | Revisão pré-PR contra um base específico |

### 2. Montar o Comando WSL

```bash
wsl bash -c 'cd /mnt/c/Users/AllFluence-User/Workspaces/AIOX/SynkraAI/aiox-core && ~/.local/bin/coderabbit {flags}'
```

**Timeout:** 15 minutos (900000ms) — as revisões do CodeRabbit levam de 7 a 30 min.

### 3. Executar a Revisão

Rode o comando via ferramenta Bash com o timeout apropriado.

### 4. Fazer o Parse dos Resultados

Classifique os achados por severidade:

| Severidade | Ação |
|------------|------|
| **CRITICAL** | Deve ser corrigido imediatamente — bloqueia a conclusão |
| **HIGH** | Recomenda-se corrigir antes do merge |
| **MEDIUM** | Documentar como dívida técnica |
| **LOW** | Melhoria opcional, apenas anotar |

### 5. Loop de Autocorreção (se CRITICAL for encontrado)

```
iteration = 0
max_iterations = específico do agente (dev: 2, qa: 3, devops: 2)

WHILE iteration < max_iterations AND critical_issues_remain:
  1. Tente auto-fix para cada issue CRITICAL
  2. Rode a revisão do CodeRabbit novamente
  3. iteration++

IF critical_issues_remain após max_iterations:
  HALT e reporte ao usuário
```

### 6. Relatório

Gere uma tabela-resumo:

```markdown
## Resultados da Revisão CodeRabbit

| Severidade | Contagem | Status |
|------------|----------|--------|
| CRITICAL | N | Corrigido/Restante |
| HIGH | N | Documentado |
| MEDIUM | N | Dívida técnica |
| LOW | N | Anotado |

**Decisão:** PASS / FAIL
```

## Tratamento de Erros

| Erro | Causa | Resolução |
|------|-------|-----------|
| `coderabbit: command not found` | Não instalado no WSL | `wsl bash -c 'pip install coderabbit-cli'` |
| Timeout (>15 min) | Revisão grande | Aumente o timeout, a revisão ainda está em processamento |
| `not authenticated` | Autenticação expirada | `wsl bash -c '~/.local/bin/coderabbit auth status'` |

## Configuração Específica por Agente

| Agente | Máx. de Iterações | Filtro de Severidade | Gatilho |
|--------|-------------------|----------------------|---------|
| @dev | 2 | Apenas CRITICAL | Pré-commit (conclusão da story) |
| @qa | 3 | CRITICAL + HIGH | Início da revisão da story |
| @devops | 2 | CRITICAL + HIGH | Pré-push / Pré-PR |

## Local do Relatório

Salve os relatórios em: `docs/qa/coderabbit-reports/`
