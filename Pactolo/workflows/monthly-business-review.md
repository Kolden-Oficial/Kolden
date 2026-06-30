# Workflow — Monthly Business Review (MBR)

> _Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (G17, MIT)._
> Status: semente-do-lote-2026-06-26 (refino pelo Ritual do Caos pendente)

## Cadência

Mensal, D+5 (último dia do close). Duração: 60-90min. Owner: pactolo-chief.

## Pré-MBR (T-1d)

1. **controller** entrega balancete fechado + matriz de reconciliação
2. **analista-fpa** entrega análise de variância (orçado × real × forecast) + drivers
3. **analista-de-fluxo-de-caixa** entrega posição de caixa + projeção 13 semanas
4. **modelador-financeiro** entrega forecast atualizado (este mês fechado + próximos 6m)
5. **pactolo-chief** consolida em deck `template-mbr.md`

## MBR — Agenda (60-90min)

### Bloco 1 — Resultado do mês (20min)
- DRE realizada × orçado × forecast: variâncias materiais (>5% ou >R$10K)
- Drivers explicados (não números — causas)
- Top 3 surpresas (positivas + negativas)

### Bloco 2 — Caixa e capital de giro (15min)
- Posição de caixa atual + runway
- CCC (DSO/DPO/DIO) — mudanças do mês
- Próximos 13 semanas: receita esperada × despesa esperada × buffer

### Bloco 3 — Forecast (15min)
- Forecast atualizado vs. AOP
- Pontes (bridges) entre versões
- Riscos de desvio + planos de contingência

### Bloco 4 — Decisões (15-20min)
- Aprovações pendentes (compras > limite, contratações, capex)
- Trade-offs estratégicos (handoff Plutos)
- Quarterly forecast: aprovar reforecast se necessário

### Bloco 5 — Ações + handoff (10min)
- Ações com owner + prazo
- Handoff Plutos para decisões executivas
- Ações para próximo close

## Pós-MBR

- **pactolo-chief** registra decisões em `docs/mbr-decisoes/AAAA-MM.md`
- **analista-fpa** atualiza forecast com decisões aprovadas
- **controller** arquiva pacote MBR

## Anti-padrões

- MBR "leitura de DRE" sem decisão (vira reunião descartável)
- MBR sem dono de cada item (variância órfã = não corrige)
- Forecast não atualizado pós-MBR (perde o ciclo)
- Decisões sem prazo (vira lista de desejos)
