---
name: jira-git-traceability
description: |
  Use quando precisar de rastreabilidade auditável entre tickets (Jira/Linear) e commits/branches/PRs.
  Padrão de commit (gitmoji + ID-do-ticket), atomicidade (1 commit = 1 mudança lógica), gate de
  ticket-ID (branch sem mapeamento bloqueia workflow), branch strategy auditável. Para projetos AIOX
  que adotam Jira/Linear. Sem ticket = sem código (exceto hotfix com retroativo explícito).
domain: aiox-development
subdomain: git-discipline
agente_dono: [dev-dex, sm-river]
aiox_layer: L3 (.claude project config — mutable)
tags: [jira, linear, git, gitmoji, atomicidade, rastreabilidade, branch-strategy]
fonte_upstream: msitarzewski--agency-agents@a597cb6 (G2, G10, G11)
grounding_required: false
categoria_art_iv: MCP-nativo
squads_consumidores: [Prometeu-interno]
tipo: skill
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
---

> **Atribuição:** Esta skill absorve padrões originados em `msitarzewski/agency-agents` (commit `a597cb6`, licença MIT). Os padrões G2 (atomicidade), G10 (commit format gitmoji+ID) e G11 (gate de ticket-ID) foram adaptados ao contexto AIOX/Kolden, com cross-link aos artigos da Constitution e às demais skills do Prometeu. Crédito original ao autor upstream; manutenção e adaptação Kolden.

## Por que rastreabilidade Jira↔Git importa

- **Story Development Cycle (Article III)** exige rastreio até a story — sem isso, "qual ticket originou esse código?" vira arqueologia.
- **Auditoria:** "qual ticket gerou esse código?" deve ter resposta em ≤30s (grep no log, link direto).
- **Reverter:** "qual commit reverter para desfazer ticket X?" precisa ser determinístico, não detetive.
- **Compliance:** auditores externos (SOC2, ISO 27001) pedem rastreio de mudança até a aprovação — sem ticket no commit, não há prova de aprovação.

## Padrão de commit (G10)

```
<gitmoji> <TICKET-ID>: descrição em uma linha (imperativa, ≤72 chars)
```

### Exemplos

- `✨ AIOX-42: implementa parser de spec multi-linha`
- `🐛 KOL-103: corrige race condition em sm-river handoff`
- `♻️ PROJ-12: extrai validação de email para módulo dedicado`
- `✅ AIOX-89: cobre validate-story-draft com testes de borda`
- `📝 KOL-201: documenta protocolo de handoff entre agentes`

### Tipos gitmoji canônicos (consultar gitmoji.dev)

| Gitmoji | Tipo | Quando usar |
|---------|------|-------------|
| ✨ | feat | nova funcionalidade |
| 🐛 | fix | correção de bug |
| ♻️ | refactor | refatoração sem mudança de comportamento |
| ✅ | test | testes |
| 📝 | docs | documentação |
| 🔧 | chore | config, build, deps |
| ⚡ | perf | performance |
| 🚨 | lint | correção de lint |
| 🔐 | security | vulnerabilidade |

**Mapeamento ↔ Conventional Commits:** este padrão é compatível com `feat:`/`fix:`/etc. já usado em `Prometeu/.claude/CLAUDE.md` § Convenções Git. Gitmoji é a camada visual; o tipo + ticket-ID é o que aparece em changelog/audit.

## Atomicidade (G2) — 1 commit = 1 mudança lógica

- **Banido:** mensagens "wip", "small fixes", "more stuff", "ajustes".
- **Catch-all commits** (várias mudanças não relacionadas) → split via `git add -p` antes do commit.
- **Quando em dúvida:** faz tudo num branch e split na hora de abrir o PR (rebase interativo, squash seletivo).
- **Regra prática:** se a descrição do commit precisa de "e" para conectar mudanças (`fixa X e adiciona Y`), são 2 commits.

### Exceções

- **Squash de PR pequeno** (≤3 commits relacionados à mesma mudança lógica) é OK e até desejável — o histórico em `main` fica limpo.
- **Refactor + uso do refactor** no mesmo commit é OK se a separação tornar o entendimento pior (raro).

## Branch strategy auditável

- **Nome do branch:** `<tipo>/<TICKET-ID>-<slug-curto>` — ex.: `feat/AIOX-42-spec-parser`, `fix/KOL-103-race-handoff`.
- **1 branch = 1 ticket** (máximo). Se um ticket cresce além de um branch, faz split em sub-tickets.
- **`main` (ou `master`) sempre deployável** — nada de "main quebrada por uma horinha".
- **Feature branches morrem em ≤5 dias** (PR aberto, mergeado ou abandonado). Branch de 3 semanas vira rebase hell.

## Gate de ticket-ID (G11)

Branch sem ticket-ID mapeado **bloqueia** o workflow. Reflexo PreToolUse no projeto que adota a skill:

```bash
# Pseudo-código do reflexo (a ser implementado no settings.json do projeto que adotar):
branch=$(git branch --show-current)
if [[ ! "$branch" =~ ^(feat|fix|refactor|test|docs|chore)/(AIOX|KOL|[A-Z]+)-[0-9]+- ]]; then
  echo "BLOQUEADO: branch sem ticket-ID mapeado. Vincule a um ticket ou justifique como hotfix retroativo."
  exit 1
fi
```

### Exceção hotfix

Branch `hotfix/<TICKET-ID-retroativo>-<slug>` com aprovação documentada do tech lead.

**Retroativo significa:** criar ticket DEPOIS do código, com label `hotfix` e justificativa no campo "Why retroactive?". O ticket nasce com link para o commit/PR já existente, fechando o loop de auditoria.

**Quando hotfix retroativo é legítimo:**

- Produção quebrada às 3h da manhã — código primeiro, ticket depois.
- Vulnerabilidade crítica disclosed publicamente — patch primeiro, CVE no ticket depois.

**Quando NÃO é legítimo:**

- "Era só um ajustinho rápido" — não, abre ticket de 30 segundos e segue o fluxo.
- "Não queria poluir o backlog" — backlog poluído é tratável; rastreio quebrado, não.

## PR template (consequência da disciplina)

```markdown
## Ticket
Closes AIOX-42 (link para o ticket)

## O que muda
- bullet por mudança lógica
- bullet por mudança lógica

## Como testar
- passo 1
- passo 2 (resultado esperado)
- passo 3 (regressão a checar)

## Riscos
- bullet por risco conhecido (e mitigação)
```

## Anti-padrões

| Anti-padrão | Por que dói | Correção |
|-------------|-------------|----------|
| Branch `dev-melhorias` (sem ticket) | Sem rastreio = código órfão em auditoria | Vincula a ticket existente OU cria ticket guarda-chuva antes do código |
| Commits "WIP" em `main` | Vira rua escura para revert (qual WIP introduziu o bug?) | WIP só em feature branch; squash antes do merge |
| PR sem ticket-ID | Audit fail; quem aprovou o quê? | Bloqueia merge até vincular |
| 1 PR com 50 commits "small fixes" | Review impossível; revert impossível | Rebase squash antes de mergear, OU split em PRs menores |
| Branch de 3 semanas | Rebase hell, merge conflicts em cascata | Mergeia ou abandona em ≤5 dias |

## Cross-links

- `Prometeu/.claude/skills/coderabbit-review` — review automatizado pré-commit (pega o que o gate de ticket-ID não pega: qualidade do diff).
- `Prometeu/.claude/skills/micro-sprints-e-decomposicao-de-task` (B04) — 1 task = 1 ticket (granularidade que faz atomicidade ser viável).
- `Prometeu/.claude/skills/checklist-de-requisitos` — gate similar (binário, bloqueia avanço) para spec, não para commit.
- `Prometeu/.claude/CLAUDE.md` § Convenções Git — base de Conventional Commits que este padrão estende.
- `Prometeu/.claude/rules/agent-authority.md` — `@devops` (Gage) é o único agente com autoridade de push; este gate roda ANTES de chegar ao @devops.

## Aplicação no AIOX

- **Story Development Cycle:** cada story tem ID → commits referenciam → PR referencia → auditável fim a fim.
- **SDC Fase 3 (`dev-develop-story`)** usa este padrão obrigatoriamente: `git commit -m "✨ {STORY-ID}: ..."`.
- **SDC Fase 4 (`qa-gate`)** valida que o PR fecha o ticket-ID correto antes de PASS.
- **Push (`@devops`)** valida o gate de ticket-ID como pré-condição (delegado de `Prometeu/.claude/rules/agent-authority.md`).
