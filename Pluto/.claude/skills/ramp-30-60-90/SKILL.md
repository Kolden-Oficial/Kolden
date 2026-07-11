---
name: ramp-30-60-90
description: |
  Use para planejar ramp de rep novo OU avaliar progresso de rep em ramp. Ramp por GATES DE
  COMPETÊNCIA (não tempo decorrido). Marcos: 30d (produto + ICP + processo), 60d (call discovery
  sob supervisão), 90d (primeira venda solo + 80% pipeline próprio). Gate binário por marco — rep
  que não passou no gate 60 em 60d não está ramped, está atrasado. Tom Hormozi: sistema vence,
  competência > tempo.
domain: sales-coaching
subdomain: onboarding-ramp
agente_dono: [hormozi-sales-coach]
tags: [ramp, onboarding, competency-gate, 30-60-90]
fonte_upstream: msitarzewski--agency-agents@a597cb6 (G8)
status: semente
tipo: skill
area: Pluto
up: "[[Pluto/_MOC-pluto]]"
---

> _Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (G8, MIT © 2025 AgentLand Contributors)._

# Ramp 30/60/90 com Gates de Competência

## Princípio

Ramp = sequência de gates, NÃO contagem de calendário. Rep que faz tudo em 45 dias passou. Rep que está em 120 dias e não passou no gate de 60 não está ramped — está atrasado, e atrasado sem coaching vira problema permanente.

## Marcos canônicos

### Gate 30 dias
- [ ] Conhece o produto: principais features + diferenciais + roadmap visível
- [ ] Conhece o ICP: 3 personas + critério de fit binário
- [ ] Conhece top 5 objeções + resposta estruturada para cada
- [ ] Conhece processo de venda interno (CRM + stages + handoff)
- [ ] Quiz aprovado (≥80% acerto) + role-play básico OK

### Gate 60 dias
- [ ] Faz calls de discovery sob supervisão (ao vivo ou gravadas)
- [ ] Talk-listen ratio aceitável (rep ≤ 40% do tempo)
- [ ] Faz follow-up correto pós-call (resumo + próximos passos + prazo)
- [ ] Primeiro deal aberto no pipeline (qualificado pelo manager)
- [ ] 3+ calls revisadas com OASP loop, com melhora demonstrada

### Gate 90 dias
- [ ] Primeira venda solo fechada (não herdada, não passada pelo manager)
- [ ] 80% do pipeline atual gerado por iniciativas próprias (não passado por outro rep)
- [ ] Forecast próprio com calibração (commit/best/upside) OK em revisão
- [ ] Maneja objeção AECR sem prompt do manager

## Critérios de pivô

| Cenário | Ação |
|---|---|
| 30d sem passar gate | Re-coach intensivo 1h/dia x 1 semana; revisar fit |
| 60d sem passar gate | Conversa séria sobre fit; PIP (Performance Improvement Plan) |
| 90d sem passar gate | Offboard ou role change |

## Coaching durante ramp

- **Dias 1-30:** 1h/dia coaching dedicado (overhead alto, paga depois)
- **Dias 31-60:** 1h/3d
- **Dias 61-90:** 1h/semana
- Pós-ramp: cadência normal (1h/quinzena)

## Anti-padrões

- **Ramp por tempo decorrido (não competência):** rep que cumpriu 90 dias mas não passou gate ainda não está ramped — não promova para portfolio completo
- **Ramp sem quiz/role-play:** avaliação subjetiva esconde lacunas
- **Aceitar "quase" no gate:** gate é binário; "quase passou" = não passou
- **Ramp sem coaching diário primeiros 30d:** rep aprende mal sozinho, gera hábitos errados que custam meses para desaprender
- **Ramp herdando pipeline:** rep não aprende prospecção se recebe pipeline pronto — primeira venda tem que vir de iniciativa própria (ou pelo menos 60% do funil)

## Cross-links

- `coaching-oasp` — loop OASP usado em todas as sessões de coaching durante ramp
- `call-coaching-temporal` — revisão de call específica com timestamp + alternativa
- Manager faz quiz e aplica gates; `hormozi-sales-coach` apoia operacionalmente
