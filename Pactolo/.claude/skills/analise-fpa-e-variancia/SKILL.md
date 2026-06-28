---
name: analise-fpa-e-variancia
description: >
  Use para EXECUTAR FP&A: montar orçamento, manter forecast rolling e confrontar realizado vs
  orçado vs forecast com análise de variância decomposta por driver. Cobre o calendário
  orçamentário (bottom-up + top-down), o bridge orçado→forecast, a classificação de variância
  (favorável/desfavorável + materialidade) e o pacote de operating review. Toda linha carrega a
  fonte do realizado e a premissa da projeção. Gatilhos: "montar orçamento", "forecast", "budget vs
  actual", "realizado vs orçado", "por que estouramos o orçamento", "análise de variância",
  "reforecast". Dono: analista-fpa. Decisão (corte/realocação) → handoff ao Plutos (Olimpo/CFO).
---

# Análise FP&A e Variância

Camada executável do planejamento financeiro. Regra-mãe: **fato conciliado primeiro, projeção depois** —
o realizado vem conciliado do `controller`; a projeção carrega premissas explícitas. Variância sem driver
é ruído; variância com driver é decisão.

## 0. Insumos (porta de entrada)
- Realizado **conciliado** do período (do `controller`) — nunca um número solto.
- Orçado e forecast anterior da linha em questão.
- Drivers de negócio (volume, preço, mix, eficiência) e métricas de produto (via **Metis** quando externas).
Sem realizado conciliado, a análise é estimativa rotulada — declare isso.

## 1. Orçamento (budget)
- **Bottom-up:** por centro de custo/linha, somando para o total.
- **Top-down:** da meta para baixo, alocando por peso histórico.
- Reconcilie os dois; o gap entre eles é a conversa de meta a subir ao Plutos.

## 2. Forecast rolling
- Horizonte 12-18 meses, atualizado a cada fechamento (reforecast).
- **Bridge orçado→forecast:** decompõe a mudança por driver, não em bloco.
- Premissa explícita por linha: driver, taxa, período, fonte.

## 3. Análise de variância
- Δ = realizado − orçado (e realizado − forecast). Reporte valor **e** percentual.
- Decomponha por: **volume / preço / mix / eficiência** quando aplicável.
- Classifique **favorável/desfavorável** e por **materialidade** (foque no que move o resultado).
- Cada variância material recebe um **driver** (a causa), não só o número.

## 4. Unit economics (resumo — detalhe na skill irmã)
CAC, LTV, payback, margem de contribuição entram no operating review quando a pergunta é de eficiência de
crescimento. Profundidade → `unit-economics-operacional`.

## 5. Saída
Tabela: linha | orçado | realizado | Δ valor | Δ % | fav/desf | driver | materialidade. Mais o **bridge** e
a lista de premissas do forecast. Separe fato conciliado de projeção; marque o que sobe ao Plutos para decisão.

## Fronteira
Decisão de corte/realocação/meta é do **Plutos (Olimpo/CFO)** — esta skill prepara o número e o porquê,
não decide. Métrica de produto vem do **Metis**; benchmark de mercado, do **Argos**.

---
*Semente-do-lote-2026-06-26 (refino pelo Ritual do Caos pendente). Princípios reescritos das fontes
`alirezarezvani/claude-skills@4a3c05b` (MIT) e `anthropics/knowledge-work-plugins@78d74d5` (Apache-2.0) —
sem cópia literal.*
