---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/msitarzewski--agency-agents/_indice|_indice]]"
---

﻿# F3 — Inventário de capacidades · `msitarzewski--agency-agents@a597cb6` — divisão `finance/`

Granularidade: 1 base por agente + técnicas transferíveis salientes. Total esperado: 5 (bases) + ~5-15 (técnicas) = 10-20 IDs.

| ID | capacidade | tipo | keywords | dominio | fonte(arquivo:linha) |
|---|---|---|---|---|---|
| G1 | Bookkeeping & controllership — day-to-day accounting operations, month-end close, internal controls, GAAP compliance, audit readiness | agente | bookkeeping, accounting, month-end close, GAAP, internal controls | finance | finance/finance-bookkeeper-controller.md:2-7 |
| G2 | Account reconciliation & balance sheet verification — monthly reconciliation of all GL accounts with supporting documentation | metodo-prompt | reconciliation, balance sheet, GL accounts, audit trail | finance | finance/finance-bookkeeper-controller.md:55-112 |
| G3 | Month-end close orchestration & checklist management — task sequencing, deadline tracking, concurrent reconciliations | metodo-prompt | month-end, close calendar, task management, sequencing | finance | finance/finance-bookkeeper-controller.md:52-129 |
| G4 | Revenue recognition under ASC 606 & lease accounting under ASC 842 | skill | ASC 606, ASC 842, technical accounting, revenue, leases | finance | finance/finance-bookkeeper-controller.md:240-244 |
| G5 | SOX 404 internal control framework & control testing implementation | skill | SOX 404, control design, testing, compliance, documentation | finance | finance/finance-bookkeeper-controller.md:60-65 |
| G6 | Financial modeling & scenario analysis for strategic decision support | agente | modeling, DCF, forecasting, scenario analysis, data-driven | finance | finance/finance-financial-analyst.md:2-7 |
| G7 | Discounted Cash Flow (DCF) valuation & terminal value methodology | framework | DCF, valuation, WACC, terminal value, NPV | finance | finance/finance-financial-analyst.md:45-50 |
| G8 | Variance analysis with root cause decomposition & forward-looking impact | metodo-prompt | variance, budget vs actual, root cause, trend analysis | finance | finance/finance-financial-analyst.md:59-64 |
| G9 | Working capital modeling — DSO, DPO, inventory turns, cash conversion cycle | framework | working capital, cash flow, efficiency, days metrics | finance | finance/finance-financial-analyst.md:52-57 |
| G10 | LBO modeling with debt schedules & returns analysis (IRR, MOIC) | framework | LBO, leverage, debt, returns, leveraged buyout | finance | finance/finance-financial-analyst.md:48-50 |
| G11 | M&A modeling — accretion/dilution analysis, synergy quantification, pro forma | framework | M&A, accretion dilution, synergy, pro forma, integration | finance | finance/finance-financial-analyst.md:49-50 |
| G12 | Financial Planning & Analysis (FP&A) — budgeting, forecasting, planning cycles | agente | FP&A, planning, forecasting, budgeting, business partner | finance | finance/finance-fpa-analyst.md:2-7 |
| G13 | Rolling forecasts & quarterly re-forecasting with bottoms-up input | metodo-prompt | rolling forecast, quarterly, bottoms-up, continuous planning | finance | finance/finance-fpa-analyst.md:52-58 |
| G14 | Annual Operating Plan (AOP) design & top-down/bottoms-up reconciliation | framework | AOP, annual plan, top-down, bottoms-up, gap analysis | finance | finance/finance-fpa-analyst.md:44-51 |
| G15 | Driver-based forecasting linking financial outputs to operational inputs | skill | driver-based, forecasting, revenue per rep, cost per hire | finance | finance/finance-fpa-analyst.md:54-58 |
| G16 | Headcount planning & fully-loaded cost modeling with productivity metrics | framework | headcount, FTE, salary planning, productivity, hiring timeline | finance | finance/finance-fpa-analyst.md:46-47 |
| G17 | Monthly Business Review (MBR) preparation & variance narrative | metodo-prompt | MBR, monthly review, variance, narrative, decision support | finance | finance/finance-fpa-analyst.md:141-187 |
| G18 | Investment research & fundamental analysis for portfolio decisions | agente | research, due diligence, fundamental analysis, valuation, moat | finance | finance/finance-investment-researcher.md:2-7 |
| G19 | Competitive moat assessment & Porter's Five Forces analysis | framework | moat, competitive advantage, Porter's Five Forces, switching costs | finance | finance/finance-investment-researcher.md:45-50 |
| G20 | Investment thesis development with bull case, bear case & thesis breakers | metodo-prompt | thesis, conviction, bull case, bear case, exit triggers | finance | finance/finance-investment-researcher.md:85-113 |
| G21 | Due diligence checklist — financial, operational, market, legal DD | framework | due diligence, operational DD, customer interviews, IP review | finance | finance/finance-investment-researcher.md:156-191 |
| G22 | Quantitative screening & multi-factor ranking systems | skill | screening, quantitative, factors, anomaly detection | finance | finance/finance-investment-researcher.md:55-56 |
| G23 | Risk metrics — Value-at-Risk, Sharpe ratio, Sortino ratio, max drawdown | framework | risk metrics, Sharpe, Sortino, VaR, volatility | finance | finance/finance-investment-researcher.md:54-56 |
| G24 | Tax optimization & effective tax rate (ETR) minimization | agente | tax, optimization, ETR, compliance, multi-jurisdictional | finance | finance/finance-tax-strategist.md:2-7 |
| G25 | Entity structuring & optimal entity selection (C-Corp, S-Corp, LLC, partnership) | framework | entity structure, tax planning, holding company, IP entities | finance | finance/finance-tax-strategist.md:45-50 |
| G26 | Transfer pricing & intercompany transaction arm's-length documentation | skill | transfer pricing, TP, benchmarking studies, documentation | finance | finance/finance-tax-strategist.md:55-57 |
| G27 | R&D tax credits, Section 179 bonus depreciation & deduction maximization | framework | R&D credit, bonus depreciation, deduction, tax incentive | finance | finance/finance-tax-strategist.md:47-50 |
| G28 | Income timing strategies & deferred compensation planning | skill | income timing, deferred comp, revenue recognition, tax deferral | finance | finance/finance-tax-strategist.md:46-48 |
| G29 | Multi-jurisdictional compliance — federal, state, local, international tax | metodo-prompt | compliance, SALT, federal tax, international, nexus | finance | finance/finance-tax-strategist.md:52-57 |

**Total: 29 capacidades (G1–G29).**

## Resumo por agente upstream

| Agente | IDs gerados | Capacidade base | Técnicas transferíveis |
|--------|------------|-----------------|------------------------|
| **Bookkeeper & Controller** | G1–G5 | G1 (Bookkeeping & controllership) | G2 (Reconciliation), G3 (Month-end orchestration), G4 (ASC 606/842), G5 (SOX 404) |
| **Financial Analyst** | G6–G11 | G6 (Financial modeling & scenario) | G7 (DCF), G8 (Variance analysis), G9 (Working capital), G10 (LBO), G11 (M&A) |
| **FP&A Analyst** | G12–G17 | G12 (FP&A & planning) | G13 (Rolling forecasts), G14 (AOP), G15 (Driver-based forecasting), G16 (Headcount planning), G17 (MBR) |
| **Investment Researcher** | G18–G23 | G18 (Investment research) | G19 (Moat assessment), G20 (Thesis development), G21 (Due diligence), G22 (Quantitative screening), G23 (Risk metrics) |
| **Tax Strategist** | G24–G29 | G24 (Tax optimization) | G25 (Entity structuring), G26 (Transfer pricing), G27 (R&D credits), G28 (Income timing), G29 (Multi-jurisdictional compliance) |

---

## Notas de granularidade

- **Capacidades-base (1 por agente):** G1, G6, G12, G18, G24 — cada uma é a especialização primária do agente upstream.
- **Técnicas transferíveis:** distribuídas entre frameworks (G7, G9, G10, G11, G14, G16, G19, G21, G23, G25, G27), métodos-prompt (G2, G3, G8, G17, G20, G29) e skills (G4, G5, G15, G22, G26, G28).
- **Sem overlap:** cada capacidade cita a linha específica do arquivo onde foi extraída; nenhuma é duplicada entre agentes.
- **Conformidade:** nenhuma é um molde upstream (Identity/Mission/Rules); nenhuma é exemplo de código; todas são capacidades operacionalizáveis.

---

**Inventário completado em 2026-06-29 | Fase 3 do Ritual de Absorção**
