# Catálogo de Habilidades — Pactolo

Habilidades-âncora do squad Pactolo (Finanças Operacionais / FP&A), seu gatilho de invocação, propósito e
agente dono. **Semente-do-lote-2026-06-26** — refino e habilidades adicionais virão pelo Ritual do Caos.

## Habilidades-âncora (SKILL.md próprios)

| Habilidade | Gatilho | Propósito | Agente dono |
|---|---|---|---|
| `analise-fpa-e-variancia` | "montar orçamento", "forecast", "budget vs actual", "realizado vs orçado", "análise de variância", "reforecast" | Orçamento (bottom-up/top-down), forecast rolling, bridge orçado→forecast e variância decomposta por driver | analista-fpa |
| `modelagem-financeira` | "modelo financeiro", "projeção", "três demonstrações", "cenário", "sensibilidade", "what-if", "break-even" | Modelo de 3 demonstrações integradas (DRE/BP/DFC), projeção por driver, cenários e sensibilidade, higiene de modelo | modelador-financeiro |
| `fechamento-contabil` | "fechar o mês", "fechamento", "lançamento", "journal entry", "reconciliação", "conciliar banco", "accrual", "DRE/balanço/DFC" | Lançamentos, accruals/deferrals, reconciliação (diferença=0), demonstrações amarradas e checklist do close | controller |
| `gestao-de-fluxo-de-caixa` | "fluxo de caixa", "runway", "burn", "quando acaba o dinheiro", "capital de giro", "DSO/DPO", "liquidez" | Projeção de caixa (direto/indireto, 13 sem/12 meses), runway, burn, capital de giro (CCC) e alertas de liquidez | analista-de-fluxo-de-caixa |
| `unit-economics-operacional` | "unit economics", "CAC", "LTV", "payback", "margem de contribuição", "cohort", "MRR/ARR", "churn", "NRR" | CAC/LTV/payback/margem de contribuição + receita recorrente e cohort, com fonte e janela por métrica | analista-fpa |

## Fronteira do squad (handoffs)
- **Decisão estratégica** (budget de mídia, precificação, margem-alvo, alocação de capital) → **Plutos (Olimpo/CFO)**. O Pactolo prepara; o CFO decide.
- **Métrica de produto / atribuição** → consome do **Metis**.
- **Benchmark de mercado / custo de insumo** → consome do **Argos**.

## Habilidades compartilhadas (fonte única no workspace)
| Habilidade | Gatilho | Propósito |
|---|---|---|
| `ritual-de-encerramento` | Fim de toda sessão com trabalho (reflexo `Stop`) | Reflete e grava lições no `MEMORY.md` do squad. Fonte: `C:\Kolden\.claude\skills\ritual-de-encerramento\SKILL.md` |
| `infisical-padrao` | Sempre que precisar de credencial/segredo | Buscar segredos via Infisical (nunca texto puro). Fonte: `Caos/.claude/skills/infisical-padrao/` |
| `verificacao-de-alinhamento` | SessionStart >24h (reflexo `verificacao-diaria`) | Checa pontas soltas nos documentos do squad |

## Atribuição das fontes
Habilidades-âncora reescritas (sem cópia literal) a partir do cluster **finance** dos dossiês:
- `alirezarezvani/claude-skills@4a3c05b` — G18: financial-analyst, saas-metrics-coach, business-investment-advisor (MIT).
- `anthropics/knowledge-work-plugins@78d74d5` — G5 (plugin finance): journal-entry, reconciliation, financial-statements, variance-analysis, close-management (Apache-2.0).
