# Catálogo de Habilidades — Métis

Índice das **3 habilidades** do squad Métis (eficiência, telemetria, experimentação).

| Habilidade | Gatilho de invocação | Propósito |
|---|---|---|
| `telemetria-de-tokens-e-custo` | medir gasto de tokens/custo de LLM, ROI de otimização de prompt, "quanto economizamos com X" | Mede consumo REAL (lido de log) + custo em USD + eficiência de saída; régua anti-vaidade — exige número de log, nunca estimativa "de cabeça" |
| `desenho-de-experimento-estatistico` | "A/B test", "experimento", "hypothesis test", "tamanho de amostra", "poder estatístico", "parada precoce" | H0/H1 + tamanho de amostra por poder + alpha-spending/Bayesian para parada precoce. **Handoff downstream de Aletheia** (`desenho-de-experimento`) — Aletheia define teste card; Metis cuida do MÉTODO ESTATÍSTICO; Aletheia retoma para decidir |
| `metricas-operacionais-continuas` | "métrica operacional", "loop de melhoria contínua", "trend de eficiência", "process analysis" | Baseline + banda de controle (±2σ ou ±3σ Six Sigma) + gatilho de alerta + ciclo de revisão. **Fronteira:** Cairos sop-e-processo-operacional define O PASSO; esta skill define A MÉTRICA do passo |

## Procedência (B09 — msitarzewski/agency-agents@a597cb6, MIT, 2026-06-29)

- `desenho-de-experimento-estatistico` absorve G1+G8+G9
- `metricas-operacionais-continuas` absorve G16

Detalhe em `Caos/registros/absorcao/msitarzewski--agency-agents/decisao-f5-b09-pm.md` e `relatorio-de-perda-b09-pm.md`.
