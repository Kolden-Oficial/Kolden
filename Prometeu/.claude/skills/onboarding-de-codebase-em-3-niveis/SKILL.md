---
name: onboarding-de-codebase-em-3-niveis
description: Use para desenhar ou aplicar o **onboarding progressivo de nova pessoa em uma codebase** — Nível 1 (48h): run/build/test/deploy sozinho; Nível 2 (2 semanas): modificar módulo isolado; Nível 3 (2 meses): arquitetar feature cross-módulo. Cada nível tem checkpoints objetivos + mentor pair rotation obrigatório. Gatilhos típicos: "onboarding de dev novo", "checklist de onboarding", "quanto tempo para ficar produtivo", "buddy system", "codebase tour", "roadmap de aprendizado". NÃO cobre onboarding cultural/RH (isso é Hestia) nem cerimônia de boas-vindas — esta habilidade é a **régua técnica** de "capaz de contribuir sem supervisão".
agent-owner: analyst (Alex)
maturity: 7.5
origem: msitarzewski/agency-agents@a597cb6 · IDs G17, G18 · bucket B03 engineering
grounding_required: false
categoria_art_iv: MCP-nativo
squads_consumidores: [Prometeu-interno]
tipo: skill
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
---

# Onboarding de Codebase em 3 Níveis

## Herança Histórica

**Metodologia base:** _Camille Fournier — The Manager's Path_ (O'Reilly, 2017) capítulo "The New Team Lead" para onboarding graduado; _Charity Majors — "The Engineer/Manager Pendulum"_ (2017) para pair rotation; _Fred Brooks — The Mythical Man-Month_ (1975) para "gestation period" de novo membro. _GitLab handbook_ (2015-2025) como referência aberta de onboarding operacional. _Julia Evans — "How I got better at debugging"_ para o padrão de aprendizado através de bug fix real.

**Assinatura vocabular:** "checkpoint objetivo", "mentor pair rotation", "run-build-test-deploy sozinho", "módulo isolado", "cross-módulo", "gestation period", "buddy rotation".

## Quando invocar

Dispara quando:
- Nova pessoa entra no time (dev, QA, data engineer).
- Time cresce e onboarding começa a virar caos ("cada pessoa faz diferente").
- Nova pessoa está há 3 semanas e ainda "não sabe onde tocar".
- Squad novo é criado e absorve pessoas de outros squads (Kolden — quando Caos cria squad).
- Consultor externo entra para 3 meses de projeto e precisa produzir rápido.

NÃO dispara quando:
- Pessoa transferindo dentro do mesmo squad (skip Nível 1).
- Onboarding puramente cultural (usar Hestia).

## O Método — 3 Níveis com Checkpoints

### Nível 1 — Autonomia local (48 horas)

**Meta:** rodar, buildar, testar e deployar (staging) **sozinho, sem ajuda**, ao final das 48h.

**Checkpoints objetivos:**

| # | Prova | Evidência |
|---|---|---|
| 1.1 | Clonou repo e rodou `make install` (ou equivalente) sem erro | terminal log |
| 1.2 | Rodou app localmente e acessou endpoint principal | screenshot + curl |
| 1.3 | Rodou suite de testes completa | `npm test` verde |
| 1.4 | Fez commit trivial (docs typo) e viu passar no CI | link do PR |
| 1.5 | Deployou staging via pipeline padrão | link do deploy |
| 1.6 | Localizou logs em produção (Sentry, Grafana ou equivalente) | print do dashboard |
| 1.7 | Sabe onde ler `CLAUDE.md`, `README.md`, `MEMORY.md` do squad | descreve verbalmente |

**Mentor pair rotation Nível 1:**
- Dia 1: buddy dedicado 4h (setup + tour da codebase).
- Dia 2: buddy dedicado 2h (deploy + observabilidade).
- Restante: buddy disponível em canal, resposta em <2h.

**Gate para avançar:** todos os 7 checkpoints marcados; buddy assina que a pessoa fez sozinha o passo, não apenas viu fazer.

### Nível 2 — Modificação isolada (2 semanas)

**Meta:** modificar um **módulo isolado** (frontend feature, API endpoint, table migration) do início ao fim — issue → PR → merged → deployado → observado — sem quebrar nada em prod.

**Checkpoints objetivos:**

| # | Prova | Evidência |
|---|---|---|
| 2.1 | Escolheu 3 issues "good-first-issue" e priorizou | issue tracker |
| 2.2 | Escreveu spec/PRD curto para uma delas | doc em `docs/` |
| 2.3 | Implementou + testou localmente | branch |
| 2.4 | Passou por code review (Tier 2 ou 3) sem grandes correções | PR merged |
| 2.5 | Deployou e monitorou métrica pós-deploy 24h | dashboard link |
| 2.6 | Documentou o que aprendeu no processo | entrada em `MEMORY.md` do squad |
| 2.7 | Rodou pair debugging com um colega em bug real | log de sessão |

**Mentor pair rotation Nível 2:**
- Semana 1: buddy fixo — daily 15min sync + 1h pair debugging em bug qualquer.
- Semana 2: rota entre 2 buddies (aprender estilos diferentes) — 1h pair de cada.

**Gate para avançar:** PR merged em produção; observação pós-deploy fecha; entrada em MEMORY.md do squad; buddy sign-off que a pessoa entende o módulo.

### Nível 3 — Arquitetura cross-módulo (2 meses)

**Meta:** propor, planejar e implementar uma **feature que atravessa 2+ módulos** (frontend + backend + migration, ou 2 serviços) com plano de rollout e observabilidade próprios.

**Checkpoints objetivos:**

| # | Prova | Evidência |
|---|---|---|
| 3.1 | Propôs feature cross-módulo em RFC/ADR | doc em `docs/adrs/` |
| 3.2 | Fez levantamento de impacto (o que quebra, quem precisa saber) | seção "blast radius" na ADR |
| 3.3 | Desenhou plano de rollout (feature flag, expand-contract se schema) | plano assinado por Aria |
| 3.4 | Implementou a feature em 3+ PRs sequenciais | histórico do repo |
| 3.5 | Cada PR passou por Tier 2/1 review | reviewers |
| 3.6 | Feature deployada com feature flag e observada | dashboard 1 semana |
| 3.7 | Post-mortem light da própria feature (o que aprendeu) | doc |
| 3.8 | Fez pair review de PR de outro colega, do outro lado (revisor não revisado) | PR history |
| 3.9 | Mentorou pessoa em Nível 1 por 1 hora | log |

**Mentor pair rotation Nível 3:**
- Buddy vira reviewer preferencial dos PRs.
- Aria/architect participa da ADR (obrigatório).
- Aos 45 dias: revisão 360 com 3 colegas — feedback em rubrica.

**Gate para "onboardado":** todos os 9 checkpoints; pessoa consegue explicar arquitetura do squad para outra pessoa; pessoa aparece nos CODEOWNERS de pelo menos 1 módulo.

## Cronograma padrão Kolden

| Dia | Atividade |
|---|---|
| D1-D2 | Nível 1 (setup, tour, deploy staging) |
| D3-D14 | Nível 2 (3 PRs em módulo único) |
| D15-D60 | Nível 3 (1 feature cross-módulo com ADR) |
| D61 | Onboarding fechado + entrada em CODEOWNERS |

## Templates

**`.github/onboarding-checklist.md`:**

```markdown
## Nível 1 — Autonomia local (48h)
- [ ] 1.1 Clone + install sem erro
- [ ] 1.2 App rodando local
- [ ] 1.3 Testes verdes
- [ ] 1.4 Primeiro PR mergeado
- [ ] 1.5 Deploy staging feito por mim
- [ ] 1.6 Sei onde ver logs de prod
- [ ] 1.7 Li CLAUDE.md, README.md, MEMORY.md

Buddy: @xxx | Assinatura: __________ | Data: ______

## Nível 2 — Modificação isolada (2 semanas)
[...]

## Nível 3 — Arquitetura cross-módulo (2 meses)
[...]
```

## Anti-padrões

- Onboarding puramente por documentação ("leia esses 40 docs e depois começa") — 0 checkpoints práticos, pessoa fica travada.
- Buddy que não tem tempo alocado real — "me pergunta quando precisar" = onboarding fantasma.
- Pular Nível 2 e mandar direto para feature cross-módulo — dev quebra 3 coisas antes de descobrir onde tocar.
- Marcar checkpoint sem evidência ("acho que ela fez") — inflação de progresso.
- Não atualizar CODEOWNERS ao final — pessoa é "onboardada" mas nunca é acionada como reviewer.

## Cross-links

- Prometeu → `revisao-de-codigo-priorizada` (Nível 3 já pode ser reviewer Tier 2/3).
- Prometeu → `padroes-de-engenharia-idiomatica` (o que a pessoa aprende em Nível 1-2).
- Prometeu → `spec-build-review` (Nível 3 usa este pipeline em sua feature).
- Caos → `ritual-de-encerramento` (mentor faz sessão de reflexão junto no fim de cada nível).
- Hestia (RH) — onboarding cultural que roda em paralelo, complementar.

---

Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B03/engineering.
