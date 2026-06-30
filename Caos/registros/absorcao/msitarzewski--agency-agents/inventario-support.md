# F3 — Inventário de capacidades · `msitarzewski--agency-agents@a597cb6` — divisão `support/`

Granularidade: 1 base por agente + técnicas transferíveis salientes. Total: 6 (bases) + 17 (técnicas) = 23 IDs.

| ID | capacidade | tipo | keywords | dominio | fonte(arquivo:linha) |
|---|---|---|---|---|---|
| G1 | Transformar dados brutos em insights acionáveis com RFM, correlação e tendência | agente | RFM, customer-lifetime-value, churn-prediction, analytics | support | support/support-analytics-reporter.md:106-144 |
| G2 | RFM (Recency-Frequency-Monetary) com scoring segmentado | framework | RFM-score, customer-segmentation, loyalty-metrics | support | support/support-analytics-reporter.md:106-142 |
| G3 | Multi-touch attribution com weighted revenue allocation | skill | attribution-model, touchpoint-weighting, revenue-allocation | support | support/support-analytics-reporter.md:167-201 |
| G4 | Predictive modeling para churn e lifetime value | skill | regression, forecast, confidence-intervals | support | support/support-analytics-reporter.md:340-350 |
| G5 | Estruturar complexidade em clareza executiva (SCQA framework) | agente | SCQA, pyramid-principle, impact-quantification | support | support/support-executive-summary-generator.md:23-32 |
| G6 | Pyramid Principle para hierarquização de insights | framework | top-down-communication, logical-flow, impact-ordered | support | support/support-executive-summary-generator.md:94-99 |
| G7 | Quantificação de impacto financeiro com projeção ROI | skill | financial-metrics, scenario-modeling, probability-assessment | support | support/support-executive-summary-generator.md:139-147 |
| G8 | Manter saúde financeira via budgeting, cash flow e performance analysis | agente | budget-variance, cash-flow-optimization, financial-controls | support | support/support-finance-tracker.md:21-39 |
| G9 | NPV/IRR investment analysis com risk assessment | skill | NPV, IRR, payback-period, risk-scoring | support | support/support-finance-tracker.md:204-275 |
| G10 | Cash flow forecast com sazonalidade e anomaly detection | skill | seasonal-adjustment, liquidity-warnings, cash-forecasting | support | support/support-finance-tracker.md:111-149 |
| G11 | Variance analysis com drill-down por departamento | skill | budget-vs-actual, variance-percentage, corrective-actions | support | support/support-finance-tracker.md:59-96 |
| G12 | Assegurar 99.9%+ uptime e otimização de custos via monitoramento, IaC e backup | agente | system-reliability, performance-optimization, security-hardening | support | support/support-infrastructure-maintainer.md:21-38 |
| G13 | Prometheus monitoring com alertas automáticos por severidade | skill | metrics-collection, alert-rules, incident-detection | support | support/support-infrastructure-maintainer.md:57-134 |
| G14 | Terraform Infrastructure as Code com state management | skill | declarative-infra, version-control, multi-environment | support | support/support-infrastructure-maintainer.md:137-279 |
| G15 | Backup criptografado, comprimido e replicado com integrity check | skill | AES256, S3-replication, verification | support | support/support-infrastructure-maintainer.md:282-447 |
| G16 | Assegurar conformidade multi-jurisdicional (GDPR, CCPA, SOX, PCI-DSS) | agente | regulatory-alignment, risk-mitigation, policy-development | support | support/support-legal-compliance-checker.md:21-38 |
| G17 | GDPR compliance framework com data categories e subject rights | framework | legal-basis, data-retention, breach-response-72h | support | support/support-legal-compliance-checker.md:57-135 |
| G18 | Privacy policy generator automático com jurisdições | skill | policy-generation, user-rights, jurisdiction-specific | support | support/support-legal-compliance-checker.md:137-272 |
| G19 | Contract review automation com risk keyword scoring | skill | liability-analysis, compliance-detection, approval-routing | support | support/support-legal-compliance-checker.md:274-402 |
| G20 | Converter interações em experiências positivas de marca (multi-channel) | agente | customer-service, omnichannel, satisfaction-measurement | support | support/support-support-responder.md:11-38 |
| G21 | Omnichannel routing com SLAs por canal (email 2h, chat 30s, phone 3 rings) | skill | channel-prioritization, tier-escalation, auto-routing | support | support/support-support-responder.md:57-135 |
| G22 | Support analytics com FCR, CSAT e trend detection | skill | FCR, CSAT, satisfaction-trends | support | support/support-support-responder.md:137-273 |
| G23 | Knowledge base com template automation e optimization by usage | skill | article-templates, search-analytics, content-optimization | support | support/support-support-responder.md:275-413 |

**Total: 23 capacidades (G1–G23).**

## Resumo por agente upstream

| Agente | Base | Técnicas | Total |
|---|---|---|---|
| support-analytics-reporter | G1 | G2, G3, G4 | 4 |
| support-executive-summary-generator | G5 | G6, G7 | 3 |
| support-finance-tracker | G8 | G9, G10, G11 | 4 |
| support-infrastructure-maintainer | G12 | G13, G14, G15 | 4 |
| support-legal-compliance-checker | G16 | G17, G18, G19 | 4 |
| support-support-responder | G20 | G21, G22, G23 | 4 |
