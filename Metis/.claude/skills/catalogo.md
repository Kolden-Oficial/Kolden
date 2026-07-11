---
tipo: nota
area: Metis
up: "[[Metis/_MOC-metis]]"
---

# Catálogo de Habilidades — Métis

Índice das **6 habilidades** do squad Métis (eficiência, telemetria, experimentação, analytics de cliente).

| Habilidade | Gatilho de invocação | Propósito |
|---|---|---|
| `telemetria-de-tokens-e-custo` | medir gasto de tokens/custo de LLM, ROI de otimização de prompt, "quanto economizamos com X" | Mede consumo REAL (lido de log) + custo em USD + eficiência de saída; régua anti-vaidade — exige número de log, nunca estimativa "de cabeça" |
| `desenho-de-experimento-estatistico` | "A/B test", "experimento", "hypothesis test", "tamanho de amostra", "poder estatístico", "parada precoce" | H0/H1 + tamanho de amostra por poder + alpha-spending/Bayesian para parada precoce. **Handoff downstream de Aletheia** (`desenho-de-experimento`) — Aletheia define teste card; Metis cuida do MÉTODO ESTATÍSTICO; Aletheia retoma para decidir |
| `metricas-operacionais-continuas` | "métrica operacional", "loop de melhoria contínua", "trend de eficiência", "process analysis" | Baseline + banda de controle (±2σ ou ±3σ Six Sigma) + gatilho de alerta + ciclo de revisão. **Fronteira:** Cairos sop-e-processo-operacional define O PASSO; esta skill define A MÉTRICA do passo |
| `rfm-e-segmentacao` | "RFM", "quem são meus melhores clientes", "segmentar por valor", "campanha de reativação", "quem está prestes a dar churn", "quintis de cliente", "whale curve simples" | Segmentação DESCRITIVA (Recency/Frequency/Monetary) com tiers acionáveis (Champions/Loyal/At Risk/Cannot Lose/Hibernating) + whale curve. Dono nominal: **peter-fader** (baseline antes de CLV probabilístico) |
| `atribuicao-multi-touch` | "atribuição", "multi-touch", "last-click", "position-based", "time decay", "U-shape", "receita ponderada por canal", "por que o Facebook está levando todo o crédito?" | Distribui crédito de conversão por 6 modelos (last-touch/first-touch/linear/time-decay/U-shape/W-shape) + data-driven; janela de atribuição + See-Think-Do-Care aplicado. Dono nominal: **avinash-kaushik**. Sinal correlacional, não causal — para prova, escalar para `desenho-de-experimento-estatistico` |
| `clv-e-segmentacao` | "CLV", "LTV futuro", "BG/NBD", "Gamma-Gamma", "probability of being alive", "predictive churn", "CBCV", "quanto vale minha base" | Modelagem PREDITIVA de valor futuro (BG/NBD + Gamma-Gamma para não-contratual; BG/BB para contratual) + churn preditivo com regressão/ML e intervalos de confiança + CBCV. Dono nominal: **peter-fader**. Nível preditivo acima do `rfm-e-segmentacao` descritivo |

## Orquestração no `data-chief` (REUSE)

O orquestrador `data-chief` já mapeia `web_analytics_measurement` em `domain_routing` — cobre o roteamento upstream de **insights acionáveis (RFM + churn + attribution)**. As três habilidades acima operam como as ferramentas executáveis quando `data-chief` roteia para os especialistas `peter-fader` (`rfm-e-segmentacao`, `clv-e-segmentacao`) e `avinash-kaushik` (`atribuicao-multi-touch`).

## Procedência

### B09 — msitarzewski/agency-agents@a597cb6, MIT, 2026-06-29
- `desenho-de-experimento-estatistico` absorve G1+G8+G9
- `metricas-operacionais-continuas` absorve G16

Detalhe em `Caos/registros/absorcao/msitarzewski--agency-agents/decisao-f5-b09-pm.md` e `relatorio-de-perda-b09-pm.md`.

### B10 — msitarzewski/agency-agents@a597cb6, MIT, 2026-07-01
- `rfm-e-segmentacao` absorve **G2** (RFM scoring — dono: peter-fader)
- `atribuicao-multi-touch` absorve **G3** (multi-touch attribution + weighted revenue — dono: avinash-kaushik)
- `clv-e-segmentacao` absorve **G4** (predictive churn + LTV — dono: peter-fader)
- **G1** (insights acionáveis: RFM + churn + attribution) — REUSE na orquestração do `data-chief` (já mapeia `web_analytics_measurement` em `domain_routing`); nenhuma skill nova; as três skills acima cobrem a execução.

Detalhe em `Caos/registros/absorcao/msitarzewski--agency-agents/decisao-f5-b10-support.md` (linhas 43–48).
