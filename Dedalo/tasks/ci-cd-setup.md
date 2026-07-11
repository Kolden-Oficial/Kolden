---
tipo: nota
area: Dedalo
up: "[[Dedalo/_MOC-dedalo]]"
relacionado:
  - "[[Dedalo/tasks/_indice|_indice]]"
---

# Tarefa: Configuração de Pipeline CI/CD do Claude Code

**ID da Tarefa:** ci-cd-setup
**Versão:** 1.0
**Propósito:** Configurar o Claude Code para execução headless em pipelines CI/CD (revisão de PR, geração de código, testes)
**Orquestrador:** @project-integrator (Conduit)
**Modo:** Interativo (elicit: true)
**Padrão de Qualidade:** Pipeline executa com sucesso em modo headless, limites de segurança configurados, custos controlados

---

## Visão Geral

Esta tarefa configura o Claude Code para rodar em pipelines CI/CD usando o modo headless (`claude -p`). Ela abrange integração com GitHub Actions, gerenciamento de API key, configuração do formato de saída e limites de segurança para evitar custos descontrolados.

```
ENTRADA (ci_platform + integration_pattern + budget)
    |
[FASE 1: SELEÇÃO DO PADRÃO DE INTEGRAÇÃO]
    -> Escolher o que o Claude faz no CI (revisar, gerar, testar)
    -> Definir eventos de gatilho (PR aberto, push, comentário)
    -> Definir escopo e limitações
    |
[FASE 2: CONFIGURAÇÃO DO MODO HEADLESS]
    -> Configurar claude -p para uso não-interativo
    -> Definir --output-format para saída legível por máquina
    -> Configurar --max-turns para controle de custos
    |
[FASE 3: WORKFLOW DO GITHUB ACTIONS]
    -> Criar .github/workflows/claude-*.yml
    -> Configurar eventos de gatilho
    -> Configurar os steps do job
    |
[FASE 4: API KEY E AMBIENTE]
    -> Configurar ANTHROPIC_API_KEY como secret
    -> Configurar variáveis de ambiente
    -> Configurar cache para o Claude Code CLI
    |
[FASE 5: FORMATO DE SAÍDA E PARSING]
    -> Configurar --output-format stream-json
    -> Fazer parsing da saída para comentários de PR
    -> Tratar saída de erro
    |
[FASE 6: LIMITES DE SEGURANÇA]
    -> Definir --max-turns para limitar a execução
    -> Configurar orçamento de custo por execução
    -> Configurar alertas para anomalias
    |
SAÍDA: arquivos de workflow CI/CD + docs de secrets + config de segurança
```

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| ci_platform | enum | Usuário | sim | github-actions / gitlab-ci / other |
| integration_pattern | enum | Usuário | sim | pr-review / code-gen / testing / custom |
| max_cost_per_run | string | Usuário | não | Teto de orçamento (padrão: $1.00) |
| trigger_events | array | Usuário | não | Quando executar (padrão: pull_request) |
| claude_version | string | Usuário | não | Fixar em versão específica ou "latest" |

---

## Pré-condições

1. Repositório GitHub com Actions habilitado (ou plataforma CI equivalente)
2. API key da Anthropic disponível
3. Repositório com CI/CD existente (recomendado, não obrigatório)
4. Entendimento de quais tarefas o Claude deve automatizar

---

## Fase 1: Seleção do Padrão de Integração

**Objetivo:** Escolher o padrão de integração de CI correto.

### Padrões Disponíveis

| Padrão | Gatilho | O Que o Claude Faz | Custo Típico |
|---------|---------|-----------------|--------------|
| **Revisão de PR** | `pull_request` | Revisa mudanças de código, posta comentários | $0.10-0.50/PR |
| **Geração de Código** | `workflow_dispatch` ou comentário | Gera código a partir de spec/issue | $0.50-2.00/execução |
| **Geração de Testes** | `pull_request` | Gera testes para código novo | $0.20-1.00/PR |
| **Documentação** | `push` para main | Atualiza docs do código alterado | $0.10-0.30/push |
| **Triagem de Issues** | `issues.opened` | Categoriza e rotula issues | $0.05-0.10/issue |

### Passos

1.1. Selecione um ou mais padrões com base nas necessidades da equipe.
1.2. Defina o prompt específico para cada padrão.
1.3. Defina o formato de saída esperado (comentário, arquivo, label).

---

## Fase 2: Configuração do Modo Headless

**Objetivo:** Configurar o Claude Code para execução não-interativa.

### Fundamentos do Modo Headless

```bash
# Execução headless básica
claude -p "Review the changes in this PR for bugs and security issues"

# Com formato de saída
claude -p "..." --output-format stream-json

# Com limite de turnos
claude -p "..." --max-turns 10

# Com modelo específico
claude -p "..." --model sonnet

# Com system prompt a partir de arquivo
claude -p "..." --system-prompt "$(cat .claude/ci-system-prompt.md)"
```

### Flags Principais

| Flag | Propósito | Recomendado |
|------|---------|-------------|
| `-p` | Modo não-interativo (lê do argumento) | Sempre use em CI |
| `--output-format stream-json` | Saída JSON parseável por máquina | Para processamento automatizado |
| `--output-format text` | Saída em texto puro | Para logging simples |
| `--max-turns` | Limita chamadas de ferramenta | Sempre defina (padrão: 10) |
| `--model` | Seleciona o modelo | sonnet para custo, opus para qualidade |
| `--no-telemetry` | Desabilita a telemetria | Recomendado para CI |

### Passos

2.1. Componha o comando headless para cada padrão de integração.
2.2. Crie um arquivo de system prompt para o contexto de CI (`.claude/ci-system-prompt.md`).
2.3. Teste o comando localmente antes de adicioná-lo ao CI.

---

## Fase 3: Workflow do GitHub Actions

**Objetivo:** Criar o arquivo de workflow de CI.

### Template do GitHub Actions

```yaml
name: Claude Code Review
on:
  pull_request:
    types: [opened, synchronize]

permissions:
  contents: read
  pull-requests: write

jobs:
  claude-review:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code@latest

      - name: Run Claude Review
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          DIFF=$(git diff origin/main...HEAD)
          claude -p "Review these changes for bugs, security issues, and code quality. Be concise. Changes: $DIFF" \
            --output-format text \
            --max-turns 10 \
            --model sonnet \
            > review-output.txt

      - name: Post Review Comment
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const review = fs.readFileSync('review-output.txt', 'utf8');
            await github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              body: `## Claude Code Review\n\n${review}`
            });
```

### Passos

3.1. Crie `.github/workflows/claude-review.yml` (ou equivalente).
3.2. Configure os eventos de gatilho.
3.3. Defina o `timeout-minutes` apropriado (10 para revisões, 30 para geração).
3.4. Adicione o bloco `permissions` para os escopos de token do GitHub necessários.

---

## Fase 4: API Key e Ambiente

**Objetivo:** Configurar o acesso à API de forma segura.

### Passos

4.1. Adicione `ANTHROPIC_API_KEY` como um secret do repositório:
   - Vá em Settings > Secrets and variables > Actions
   - Adicione `ANTHROPIC_API_KEY` com o valor da API key

4.2. Configure variáveis de ambiente adicionais, se necessário:

```yaml
env:
  ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
  CLAUDE_MODEL: "sonnet"
  CLAUDE_MAX_TURNS: "10"
```

4.3. Considerações de segurança:
   - NUNCA registre a API key em log
   - NUNCA passe a key como argumento de comando (use variável de ambiente)
   - Use secrets do repositório, não variáveis de ambiente nos arquivos de workflow
   - Considere usar OIDC para autenticação sem chave, se disponível

---

## Fase 5: Formato de Saída e Parsing

**Objetivo:** Configurar a saída para consumo por máquina.

### Formato Stream JSON

Ao usar `--output-format stream-json`, a saída é JSON delimitado por quebras de linha:

```json
{"type": "assistant", "content": "Here is my analysis..."}
{"type": "tool_use", "tool": "Read", "input": {"file_path": "..."}}
{"type": "tool_result", "content": "..."}
{"type": "assistant", "content": "Based on reading the file..."}
```

### Passos

5.1. Escolha o formato de saída com base no padrão de integração:
   - Revisão de PR -> `text` (para postar como comentário)
   - Geração de código -> `stream-json` (para fazer parsing das mudanças de arquivo)
   - Testes -> `text` (para resumo do resultado dos testes)

5.2. Crie um script de parsing se usar `stream-json`:

```bash
# Extrai a mensagem final do assistant
claude -p "..." --output-format stream-json | \
  jq -s '[.[] | select(.type == "assistant")] | last | .content'
```

5.3. Trate os casos de erro:
   - Saída vazia -> o Claude não conseguiu processar
   - Timeout -> aumente o timeout ou reduza o escopo
   - Rate limit -> adicione lógica de retry com backoff

---

## Fase 6: Limites de Segurança

**Objetivo:** Evitar custos descontrolados e comportamento não intencional.

### Configuração de Segurança

| Limite | Valor | Propósito |
|-------|-------|---------|
| `--max-turns` | 10 (revisão), 25 (geração) | Limita iterações de chamadas de ferramenta |
| `timeout-minutes` | 10 (revisão), 30 (geração) | Timeout do job do GitHub Actions |
| Tamanho máximo do diff | 5000 linhas | Pular PRs muito grandes |
| Custo por execução | $1.00 padrão | Alertar se exceder |
| Execuções por dia | 50 | Prevenir abuso em repos de alta atividade |

### Passos

6.1. Defina `--max-turns` para toda invocação de `claude -p`.
6.2. Adicione uma verificação de tamanho do diff antes de rodar o Claude:

```bash
DIFF_LINES=$(git diff origin/main...HEAD | wc -l)
if [ "$DIFF_LINES" -gt 5000 ]; then
  echo "PR too large for automated review ($DIFF_LINES lines)"
  exit 0
fi
```

6.3. Configure a concorrência do job para evitar execuções paralelas:

```yaml
concurrency:
  group: claude-review-${{ github.event.pull_request.number }}
  cancel-in-progress: true
```

6.4. Configure o monitoramento de custos (verifique o dashboard de uso da Anthropic).

---

## Formato de Saída

```yaml
ci_cd_setup_result:
  platform: "github-actions"
  integration_pattern: "pr-review"
  files_created:
    - ".github/workflows/claude-review.yml"
    - ".claude/ci-system-prompt.md"
  secrets_required:
    - "ANTHROPIC_API_KEY"
  safety_limits:
    max_turns: 10
    timeout_minutes: 10
    max_diff_lines: 5000
  estimated_cost_per_run: "$0.10-0.50"
  tested: true
  overall_status: "PASS"
```

---

## Condições de Veto

| Condição | Ação |
|-----------|--------|
| Sem acesso à plataforma de CI (não é possível criar workflows) | PARAR -- necessário acesso de admin |
| API key não disponível | PARAR -- não é possível configurar sem a key |
| Repositório é público e a key seria exposta | PARAR -- garantir que os secrets estão devidamente configurados |
| Orçamento de custo é zero | PARAR -- o modo headless gera custos de API |
| Plataforma de CI não suportada (sem GitHub Actions, sem GitLab CI) | PARAR -- configuração manual necessária |
