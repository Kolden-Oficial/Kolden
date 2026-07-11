---
tipo: nota
area: Cairos
up: "[[Cairos/_MOC-cairos]]"
---

# Cairós — Squad de PMO & Gestão de Projetos

> `status: semente-do-lote-2026-06-26 (refino pelo Ritual do Caos pendente)`

Cairós é o squad de **PMO e gestão de projetos de negócio** da Kolden — 5 agentes (1 orquestrador
+ 4 especialistas). Onde os squads de execução **entregam** o trabalho, Cairós **planeja, sequencia,
acompanha e protege a entrega**: cronograma, escopo, recursos, riscos, comunicação com stakeholders
e roadmap de produto. O nome é grego: **καιρός**, o *momento certo* — a oportunidade que se aproveita
ou se perde. Gestão de projetos é, no fundo, a arte de fazer a coisa certa no momento certo.

## O que faz

- **Planejamento de projeto:** escopo (WBS), cronograma (caminho crítico, marcos), recursos, baseline.
- **Gestão de riscos:** registro de riscos, probabilidade × impacto, planos de mitigação e contingência.
- **Stakeholders:** matriz poder × interesse, plano de comunicação, status reporting.
- **Produto & roadmap:** roadmap priorizado, sprint planning, métricas de produto, síntese de discovery.
- **Metodologia:** escolha e aplicação de ágil / waterfall / híbrido (Scrum, Kanban, fases).

## Agentes

| Agente | Tier | Especialidade |
|--------|------|---------------|
| `cairos-chief` | 0 | Orquestrador — tria (cronograma/escopo/recursos · riscos · stakeholders · produto/roadmap · metodologia), roteia, QA e handoffs |
| `gerente-de-projeto` | 1 | Cronograma, escopo (WBS), recursos, caminho crítico, marcos, baseline, status report, escolha de metodologia |
| `gestor-de-riscos` | 1 | Registro de riscos, probabilidade × impacto, planos de mitigação/contingência, gatilhos e donos |
| `gestor-de-stakeholders` | 1 | Matriz poder × interesse, plano de comunicação, status updates, gestão de expectativa e escalonamento |
| `product-manager` | 1 | Roadmap priorizado, specs, sprint planning, métricas de produto, síntese de discovery/pesquisa |

## Como ativar

```
@cairos-chief         # Ativa o orquestrador
*diagnose             # Tria a demanda (qual frente de PMO) e roteia
*plan                 # Monta o esqueleto do plano de projeto (escopo → cronograma → riscos → comunicação)
```

Você também pode ativar um especialista direto: `@cairos:gestor-de-riscos`. O chief é o ponto de
entrada recomendado.

## Matriz de roteamento (resumo)

| Demanda | Primário | Secundário |
|---|---|---|
| Cronograma / escopo / recursos / atraso | `gerente-de-projeto` | `gestor-de-riscos` |
| "Qual metodologia usar" (ágil/waterfall/híbrido) | `gerente-de-projeto` | `product-manager` |
| Riscos / "o que pode dar errado" / plano B | `gestor-de-riscos` | `gerente-de-projeto` |
| Comunicação / stakeholders / status report | `gestor-de-stakeholders` | `gerente-de-projeto` |
| Roadmap / produto / sprint / priorização | `product-manager` | `gestor-de-stakeholders` |

## Fronteiras e handoffs (o que Cairós NÃO faz)

- **Não constrói software.** Projeto cujo objeto é **build de engenharia de software** é do **Prometeu**
  (pm/po/sm do AIOX, spec-driven). Cairós gere **projetos de negócio**; ao detectar que o projeto é
  desenvolvimento de software, faz **handoff ao Prometeu** (entrega escopo/cronograma/stakeholders como
  insumo; o Prometeu assume o ciclo de spec → build → review).
- **Não decide estratégia de portfólio/priorização executiva** — isso é do **Olimpo** (Zeus/CEO e os 8 deuses).
  Cairós executa a gestão do projeto já priorizado; escalona decisão de portfólio ao Olimpo.
- **Não faz descoberta/validação de oportunidade** — isso é da **Aletheia** (entrada do funil). Cairós
  recebe a oportunidade já validada e a converte em projeto.
- **Não instrumenta/lê estatística** de métricas — handoff ao **Metis** (analytics).

## Distinção-chave: Cairós × Prometeu

| | **Cairós** | **Prometeu** |
|---|---|---|
| Objeto | Projeto de **negócio** (campanha, lançamento, processo, evento, migração operacional) | Build de **software** (feature, sistema, app) |
| Papéis | gerente-de-projeto, gestor-de-riscos, gestor-de-stakeholders, product-manager (de negócio) | pm/po/sm do AIOX + engenharia |
| Saída | Plano, cronograma, registro de riscos, plano de comunicação, roadmap | Spec → código → review |
| Regra | Se o entregável é **código**, Cairós faz handoff ao Prometeu | — |

## Vetos invioláveis

1. **Sem plano sem premissas explícitas.** Todo cronograma/estimativa carrega as premissas e o nível de
   confiança. Estimativa sem premissa é chute rotulado, não plano.
2. **Risco sem dono e sem gatilho não é gestão de risco.** Todo risco no registro tem dono, gatilho e
   resposta (mitigar/transferir/aceitar/evitar) — caso contrário é só uma lista de medos.
3. **Mudança de escopo é decisão registrada, não silenciosa.** Todo desvio de baseline vira solicitação
   de mudança explícita (o que muda, impacto em prazo/custo/risco, quem aprova).
4. **Build de software é handoff ao Prometeu** — Cairós não assume o ciclo de desenvolvimento.
5. **Sem invenção de capacidade** (Art. IV): só as ferramentas de `ferramentas.md`.
6. **Segredos só no Infisical** (Art. VII): nunca credencial em texto puro.

## Origem

Squad-semente criado no lote de absorção `2026-06-26` a partir do cluster **PMO/produto** do dossiê
`alirezarezvani/claude-skills` (cluster G16 — jira/confluence/scrum/senior-pm/meeting-analyzer — e a
parte de produto/roadmap do cluster G15) e dos plugins oficiais `anthropics/knowledge-work-plugins`
(plugin `product-management`: sprint-planning, roadmap-update, stakeholder-update, metrics-review; e
`operations`: risk-assessment, status-report). Sem cópia literal — princípio reescrito. Atribuição no
rodapé de cada skill. **Refino pelo Ritual completo do Caos (9 fases) ainda pendente.**

## Ritual de Encerramento (auto-aprendizado obrigatório)

Todo agente deste squad, ao final de uma sessão com trabalho, aciona a habilidade `ritual-de-encerramento`
— reflete, extrai lições verificadas e grava na memória do squad (`MEMORY.md`). Fonte única:
`C:\Kolden\.claude\skills\ritual-de-encerramento\SKILL.md`.
