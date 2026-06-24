---
name: mapa-de-assuncoes
description: Extrai as assunções escondidas em uma ideia de negócio e prioriza a mais arriscada (leap of faith) num 2x2 de importância × evidência, seguindo o Assumptions Mapping de David Bland / Strategyzer e o Lean Canvas de Ash Maurya. Use quando for decidir O QUE testar primeiro antes de construir qualquer coisa.
---

# Mapa de Assunções

Especialista responsável: `david-bland` (secundário: `ash-maurya`).

## Processo
1. Modele o negócio no **Lean Canvas** (Problem, Customer Segments, UVP, Solution, Channels,
   Revenue, Cost, Key Metrics, Unfair Advantage).
2. Extraia as assunções de cada caixa, classificadas em três categorias:
   - **Desirability (desejabilidade)** — o cliente quer? (a mais comum de falhar)
   - **Viability (viabilidade)** — o negócio fecha a conta?
   - **Feasibility (exequibilidade)** — dá para construir/entregar?
3. Plote cada assunção num **2x2: importância (alta/baixa) × evidência (muita/pouca)**.
4. O quadrante **importante + sem evidência** = **leap of faith** = testar PRIMEIRO.

## Saída
Lean Canvas preenchido + lista de assunções categorizadas + a **riskiest assumption** isolada,
pronta para virar um experimento (ver habilidade `desenho-de-experimento`).

## Regra
A assunção mais arriscada DEVE ser a escolhida para testar primeiro — nunca a mais confortável.
