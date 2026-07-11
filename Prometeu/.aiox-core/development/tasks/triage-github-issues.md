---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# triage-github-issues.md

**Task**: Triagem e Priorização de GitHub Issues

**Propósito**: Analisar issues abertas do GitHub, classificar por tipo/severidade/esforço, priorizar com base no impacto e recomendar ao usuário a ordem de resolução.

**Quando Usar**: Periodicamente ou quando o usuário pedir para revisar o backlog de issues, via `@devops *triage-issues` ou por uma solicitação do usuário como "quais issues devemos resolver a seguir?".

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Buscar, classificar e apresentar a lista priorizada
- Interação mínima com o usuário
- **Melhor para:** Visão geral rápida do backlog de issues

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Apresentar a classificação e pedir ao usuário ajustes de prioridade
- Discutir trade-offs entre quick wins vs alto impacto
- **Melhor para:** Planejamento de sprint, decidir o próximo trabalho

### 3. Planejamento Pre-Flight - Planejamento Abrangente Antecipado
- Análise profunda de cada issue com referências cruzadas
- Mapeamento de dependências entre issues
- **Melhor para:** Sessões grandes de grooming de backlog

**Parâmetro:** `mode` (opcional, default: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: triageGithubIssues()
responsavel: Gage (Operator)
responsavel_type: Agente
atomic_layer: Organism

**Entrada:**
- campo: filters
  tipo: object
  origem: User Input
  obrigatorio: false
  validacao: |
    Filtros opcionais: { state: 'open', labels: [], assignee: '', limit: 30 }
  default: { state: 'open', limit: 30 }

- campo: mode
  tipo: string
  origem: User Input
  obrigatorio: false
  validacao: yolo|interactive|pre-flight

**Saida:**
- campo: triage_report
  tipo: object
  destino: User Display
  persistido: false
  formato: |
    Tabela priorizada com: issue#, titulo, tipo, severidade, esforco, recomendacao

- campo: recommended_next
  tipo: array
  destino: User Display
  persistido: false
  formato: |
    Top 3-5 issues recomendados para resolver em ordem
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] GitHub CLI autenticada (gh auth status)
    tipo: pre-condition
    blocker: true
    validacao: |
      Rode: gh auth status
      Deve mostrar o usuário autenticado
    error_message: "GitHub CLI not authenticated. Run: gh auth login"

  - [ ] Repositório com remote do GitHub configurado
    tipo: pre-condition
    blocker: true
    validacao: |
      Rode: git remote -v
      Deve mostrar um remote github.com
    error_message: "No GitHub remote found. Add with: git remote add origin <url>"
```

---

## Passos do Workflow

### Fase 1: Buscar Issues

```bash
# Busca todas as issues abertas com labels e metadados
gh issue list --state open --limit 50 --json number,title,labels,createdAt,updatedAt,comments,assignees,milestone

# Verifica também issues obsoletas (>90 dias sem atividade)
gh issue list --state open --limit 50 --json number,title,updatedAt --jq '.[] | select(.updatedAt < (now - 7776000 | todate))'
```

### Fase 2: Classificar Cada Issue

Para cada issue, determine:

| Dimensão | Valores | Como Determinar |
|-----------|--------|-----------------|
| **Type** | BUG, FEATURE, ENHANCEMENT, DOCS, CHORE, SECURITY | A partir de labels + palavras-chave do título + corpo da issue |
| **Severity** | P0-Critical, P1-High, P2-Medium, P3-Low, P4-Cosmetic | Impacto nos usuários, disponibilidade de workaround |
| **Effort** | XS (<1h), S (1-4h), M (4-8h), L (1-2d), XL (>2d) | Arquivos afetados, complexidade, pesquisa necessária |
| **Impact** | HIGH, MEDIUM, LOW | Usuários afetados x frequência x severidade |
| **Quick Win** | YES/NO | Effort <= S E Severity >= P2 |

**Heurísticas de Classificação:**

```yaml
type_detection:
  BUG: título contém "bug", "broken", "error", "fix", "crash", "fail"
  SECURITY: título contém "security", "vulnerability", "CVE", labels incluem "security"
  DOCS: título contém "docs", "documentation", "readme", labels incluem "documentation"
  CHORE: título contém "chore", "cleanup", "refactor", "rename", "update"
  FEATURE: título contém "feat", "add", "implement", "new"
  ENHANCEMENT: título contém "improve", "enhance", "optimize", "better"

severity_detection:
  P0: labels incluem "critical", corpo menciona "production down" ou "data loss"
  P1: labels incluem "high", "important", tipo é SECURITY
  P2: labels incluem "medium", tipo é BUG sem workaround
  P3: labels incluem "low", tipo é ENHANCEMENT
  P4: tipo é DOCS ou CHORE sem impacto no usuário

effort_estimation:
  - Ler o corpo da issue em busca de indicadores de escopo
  - Verificar se a issue referencia arquivos/módulos específicos
  - Verificar se issues similares foram resolvidas (tempo levado)
  - Considerar: precisa de pesquisa? múltiplos arquivos? testes necessários? mudanças no installer?
```

### Fase 3: Priorizar

**Fórmula de Pontuação de Prioridade:**

```
priority_score = (severity_weight * 3) + (impact_weight * 2) + (quick_win_bonus) - (effort_penalty)

severity_weight: P0=10, P1=8, P2=5, P3=3, P4=1
impact_weight: HIGH=10, MEDIUM=5, LOW=2
quick_win_bonus: YES=5, NO=0
effort_penalty: XS=0, S=1, M=3, L=5, XL=8
```

**Níveis de Prioridade:**

| Nível | Faixa de Pontuação | Ação |
|------|------------|--------|
| **NOW** | >= 30 | Resolver imediatamente (P0/P1, segurança) |
| **NEXT** | 20-29 | Resolver no sprint atual |
| **SOON** | 10-19 | Agendar para o próximo sprint |
| **BACKLOG** | < 10 | Manter no backlog, revisar mensalmente |

### Fase 4: Apresentar ao Usuário

**Formato de Saída:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Relatório de Triagem de GitHub Issues
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Repositório: {owner}/{repo}
Issues Abertas: {count}
Data: {date}

NOW (resolver imediatamente):
  #123 [BUG/P1] Agent files not recognized by Copilot    S  ← Quick Win
  #456 [SECURITY/P0] Exposed credentials in config       M

NEXT (sprint atual):
  #789 [BUG/P2] Submodule blocks push after merge        M
  #101 [ENHANCEMENT/P2] Add batch rename support          S  ← Quick Win

SOON (próximo sprint):
  #202 [FEATURE/P3] English README                        L
  #303 [DOCS/P3] Update API documentation                 S

BACKLOG:
  #404 [CHORE/P4] Remove deprecated methods               XS
  ...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Recomendação: Comece pela #{top_issue} ({reason}).
Escolha um número de issue para investigar, ou diga "resolve #N".

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Fase 5: Decisão do Usuário

**elicit: true**

Apresente o relatório de triagem e aguarde o usuário para:
1. Selecionar uma issue para investigar → fazer handoff para `*resolve-issue {number}`
2. Ajustar prioridades → reordenar e apresentar novamente
3. Fechar issues obsoletas → `gh issue close {number} --comment "Closing as stale"`
4. Solicitar mais detalhes sobre uma issue específica → `gh issue view {number}`

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução DEPOIS que a task é concluída

**Checklist:**

```yaml
post-conditions:
  - [ ] Todas as issues abertas classificadas com tipo, severidade e esforço
    tipo: post-condition
    blocker: false
    validacao: |
      Toda issue no relatório tem as colunas Type, Severity e Effort preenchidas

  - [ ] Ranking de prioridade apresentado ao usuário
    tipo: post-condition
    blocker: true
    validacao: |
      O usuário viu o relatório de triagem priorizado

  - [ ] Usuário selecionou a próxima ação (resolver, fechar ou adiar)
    tipo: post-condition
    blocker: false
    validacao: |
      O usuário tomou uma decisão sobre pelo menos uma issue
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de pass/fail para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] O relatório de triagem cobre todas as issues abertas (ou até o limit)
    tipo: acceptance-criterion
    blocker: true

  - [ ] Cada issue tem tipo, severidade, esforço e nível de prioridade
    tipo: acceptance-criterion
    blocker: true

  - [ ] Os quick wins estão claramente identificados
    tipo: acceptance-criterion
    blocker: true

  - [ ] A saída voltada ao usuário é uma tabela limpa e fácil de escanear
    tipo: acceptance-criterion
    blocker: true
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** gh (GitHub CLI)
  - **Propósito:** Buscar issues, labels, comentários, fechar issues obsoletas
  - **Fonte:** CLI do sistema
  - **Obrigatório:** true

- **Ferramenta:** git
  - **Propósito:** Detectar a URL do remote do repositório
  - **Fonte:** CLI do sistema
  - **Obrigatório:** true

---

## Tratamento de Erros

**Estratégia:** graceful-fallback

**Erros Comuns:**

1. **Erro:** GitHub CLI não autenticada
   - **Causa:** `gh` sem login
   - **Resolução:** Rode `gh auth login`
   - **Recuperação:** Solicitar ao usuário que se autentique

2. **Erro:** Limite de taxa (rate limit) excedido
   - **Causa:** Chamadas de API em excesso
   - **Resolução:** Aguardar e tentar novamente, ou usar `--limit` para reduzir o escopo
   - **Recuperação:** Apresentar resultados parciais

3. **Erro:** Nenhuma issue aberta
   - **Causa:** O repositório não tem issues abertas
   - **Resolução:** Reportar backlog limpo
   - **Recuperação:** Sugerir verificar issues fechadas ou criar novas

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 1-3 min
cost_estimated: $0.001-0.005
token_usage: ~2,000-5,000 tokens
```

---

## Metadados

```yaml
story: N/A (task operacional)
version: 1.0.0
dependencies:
  tasks: []
  checklists: []
  templates: []
  tools:
    - gh (GitHub CLI)
    - git
tags:
  - devops
  - issue-management
  - triage
  - backlog
created_at: 2026-02-21
updated_at: 2026-02-21
related_tasks:
  - resolve-github-issue.md
```

---

## Integração com o Agente @devops

Chamada via comando `@devops *triage-issues` ou por solicitação do usuário para analisar o backlog de issues.

**Handoff:** Quando o usuário seleciona uma issue para resolver, faça o handoff para `*resolve-issue {number}`.
