---
tipo: checklist
area: Pactolo
up: "[[Pactolo/_MOC-pactolo]]"
relacionado:
  - "[[Pactolo/checklists/template-mbr|template-mbr]]"
---

# Checklist de Close Mensal — Pactolo

> _Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (G3, MIT)._
> Status: semente-do-lote-2026-06-26 (refino pelo Ritual do Caos pendente)

Sequência canônica de 7 dias (D-1 ao D+5). Cada etapa tem owner + critério de "fechado".

## D-1 (último dia útil do mês)

- [ ] **controller** — Confirma cut-off de receita e despesas
- [ ] **controller** — Trava lançamentos do mês corrente
- [ ] **analista-de-fluxo-de-caixa** — Reconcilia caixa (banco × extrato × livro)
- [ ] **chief** — Aprova travas

**Fechado quando:** zero transação após hora-corte; reconciliação de caixa com diferença ≤ R$1K.

## D+1 (1º dia útil do mês seguinte)

- [ ] **controller** — Lança accruals (provisões trabalhistas, contas a vencer)
- [ ] **controller** — Lança depreciação
- [ ] **controller** — Lança intercompany (se aplicável)

**Fechado quando:** matriz de reconciliação por conta (cf. skill `fechamento-contabil`) completa.

## D+2

- [ ] **controller** — Revisa balancete preliminar
- [ ] **controller** — Investiga variações > 1% do saldo OU > R$10K
- [ ] **analista-fpa** — Carrega dados no modelo FP&A

## D+3

- [ ] **analista-fpa** — Análise de variância (orçado × real × forecast)
- [ ] **modelador-financeiro** — Atualiza forecast com realizados
- [ ] **chief** — Revisa drivers e flags

## D+4

- [ ] **analista-fpa** — Prepara material do MBR (cf. `template-mbr.md`)
- [ ] **chief** — Aprovação preliminar
- [ ] **controller** — Trava balancete oficial

**Fechado quando:** balancete oficial assinado; pacote MBR pronto.

## D+5 (MBR)

- [ ] **chief** — Conduz MBR (cf. `workflows/monthly-business-review.md`)
- [ ] **chief** — Handoff para Plutos
- [ ] **controller** — Arquiva papel de trabalho

**Fechado quando:** MBR conduzido; decisões registradas; insights acionáveis para próximo mês.

## Anti-padrões

- Close arrastando além de D+5 (vira "fechamento eterno")
- Variação investigada sem documentação (perde histórico)
- MBR sem decisão acionável (vira "leitura de DRE")
- Pular reconciliação de caixa (raiz de muitos erros)
- Hard-close sem soft-close — o soft-close (D+1 a D+3) é onde se cata o erro
