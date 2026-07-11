---
name: modelagem-financeira
description: >
  Use para CONSTRUIR ou AUDITAR um modelo financeiro: modelo de 3 demonstrações integradas (DRE→BP→DFC),
  projeção orientada a driver, cenários (base/otimista/conservador) e análise de sensibilidade. Cobre a
  higiene de modelo (inputs separados de cálculos e outputs, sem hardcode), as checagens de integridade
  (o BP fecha, o caixa do DFC bate o BP) e o ponto de equilíbrio. Todo modelo expõe suas premissas. Gatilhos:
  "modelo financeiro", "projeção", "três demonstrações", "cenário", "sensibilidade", "what-if", "break-even",
  "ponto de equilíbrio". Dono: modelador-financeiro. Decisão de capital/preço → handoff ao Plutos (Olimpo/CFO).
tipo: skill
area: Pactolo
up: "[[Pactolo/_MOC-pactolo]]"
---

# Modelagem Financeira

Camada executável da projeção. Regra-mãe: **o modelo é tão bom quanto suas premissas visíveis** — premissa
escondida em fórmula é defeito, não detalhe. E **as três demonstrações têm que fechar entre si**.

## 0. Insumos (porta de entrada)
- Histórico **conciliado** (do `controller`) como ponto de partida.
- Drivers de negócio e premissas externas (mercado/custo de insumo via **Argos**).
- Objetivo do modelo: planejar, avaliar, estressar liquidez, decidir investimento.

## 1. Higiene de modelo
- **Três zonas separadas:** PREMISSAS (inputs) → CÁLCULOS → OUTPUTS. Nunca um número cravado dentro de fórmula.
- Uma fonte por premissa; unidade e período declarados.
- Convenção de sinais consistente; cores/abas para input vs cálculo (quando em planilha).

## 2. Modelo de 3 demonstrações
- **DRE:** receita por driver (volume × preço, ou MRR × churn × expansão) → custos fixos/variáveis → resultado.
- **BP:** ativos/passivos/PL; o lucro flui ao patrimônio.
- **DFC:** do lucro ao caixa (indireto) ou recebimentos − pagamentos (direto).
- **Integração:** o caixa final do DFC = caixa no BP; o BP **fecha** (ativo = passivo + PL). Se não fecha, o modelo está errado — pare.

## 3. Cenários
- **Base / otimista / conservador**, cada um com a premissa que muda declarada e comparável lado a lado.
- Não mude dez variáveis de uma vez: isole o que distingue cada cenário.

## 4. Sensibilidade
- What-if e tabelas de 1-2 variáveis sobre os **drivers de maior alavancagem**.
- Saída: variável → faixa → impacto no resultado/caixa. Destaque os 2-3 drivers que mais movem.

## 5. Ponto de equilíbrio e valuation operacional
Break-even (volume/receita que zera o resultado), runway implícito, múltiplo operacional simples — nunca
um parecer de avaliação formal.

## 6. Saída
Bloco de PREMISSAS → DRE/BP/DFC integrados → checagens de integridade → tabela de cenários → sensibilidade.
Tudo rotulado como **projeção** (não fato); decisão de capital/preço marcada para handoff ao Plutos.

## Fronteira
Decisão de estrutura de capital, preço ou margem-alvo é do **Plutos (Olimpo/CFO)**. Caixa operacional de
curto prazo (runway de 13 semanas) → `gestao-de-fluxo-de-caixa`. Fechamento → `controller`.

---
*Semente-do-lote-2026-06-26 (refino pelo Ritual do Caos pendente). Princípios reescritos das fontes
`alirezarezvani/claude-skills@4a3c05b` (MIT) e `anthropics/knowledge-work-plugins@78d74d5` (Apache-2.0) —
sem cópia literal.*
