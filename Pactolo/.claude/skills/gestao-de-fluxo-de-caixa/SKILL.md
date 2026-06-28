---
name: gestao-de-fluxo-de-caixa
description: >
  Use para PROJETAR e MONITORAR o caixa: projeção de fluxo de caixa (direto e indireto, 13 semanas e
  12 meses), posição de liquidez, runway (quanto o caixa dura), burn rate (gross e net), capital de giro
  e ciclo de conversão de caixa (DSO/DPO/DIO/CCC), calendário de recebimentos/pagamentos e gatilhos de
  alerta de liquidez. Regra dura: caixa é fato, não confundir com lucro; separar realizado de projetado.
  Gatilhos: "fluxo de caixa", "cash flow", "runway", "burn", "quando acaba o dinheiro", "capital de giro",
  "DSO/DPO", "liquidez", "ciclo de caixa". Dono: analista-de-fluxo-de-caixa.
---

# Gestão de Fluxo de Caixa

Camada executável da liquidez. Regra-mãe: **lucro não é caixa** — uma empresa lucrativa quebra por
descasamento de caixa. Separe sempre o **realizado conciliado** do **projetado** (com premissas).

## 0. Insumos (porta de entrada)
- Saldos de caixa conciliados e subledgers de AR/AP (do `controller`).
- Calendário de recebimentos e pagamentos; premissas de prazo (DSO/DPO).

## 1. Projeção de caixa
- **Direto:** recebimentos − pagamentos, datados, por semana (horizonte 13 semanas) e por mês (12 meses).
- **Indireto:** do lucro ao caixa (ajusta não-caixa e variação de capital de giro).
- Saída: período | saldo inicial | entradas | saídas | saldo final | runway acumulado.

## 2. Liquidez e runway
- Posição de caixa atual; **runway** = caixa ÷ net burn (meses); data implícita de exaustão.
- Cenário de estresse: atraso de recebimento, queda de receita, antecipação de pagamento.

## 3. Burn rate
- **Gross burn** (saídas operacionais totais) e **net burn** (saídas − entradas).
- Tendência mês a mês; sensibilidade a corte de custo ou atraso de funding.

## 4. Capital de giro
- **DSO** (dias de recebimento), **DPO** (dias de pagamento), **DIO** (dias de estoque).
- **CCC** = DSO + DIO − DPO. Quanto menor, menos caixa preso. Aponte a alavanca de melhora.

## 5. Calendário e alertas
- Entradas/saídas datadas; concentração de pagamentos; descasamentos que exigem funding de curto prazo.
- Gatilhos de **liquidez mínima** e covenants (se houver) — sinalizados para subir ao Plutos.

## 6. Saída e handoff
Projeção + runway + capital de giro + alertas. O caixa do modelo de longo prazo (do
`modelador-financeiro`) deve **bater** esta projeção — alinhe. Decisão de captação/corte/alocação é do
**Plutos (Olimpo/CFO)**: esta skill entrega o cenário e o gatilho, não a decisão.

---
*Semente-do-lote-2026-06-26 (refino pelo Ritual do Caos pendente). Princípios reescritos das fontes
`alirezarezvani/claude-skills@4a3c05b` (MIT) e `anthropics/knowledge-work-plugins@78d74d5` (Apache-2.0) —
sem cópia literal.*
