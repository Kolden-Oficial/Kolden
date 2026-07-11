---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/msitarzewski--agency-agents/_indice|_indice]]"
---

# F3 — Inventário de capacidades · `msitarzewski--agency-agents@a597cb6` — divisão `testing/`

Granularidade: 1 base por agente + técnicas transferíveis salientes. Total: 8 (bases) + 24 (técnicas) = 32 IDs.

| ID | capacidade | tipo | keywords | dominio | fonte(arquivo:linha) |
|---|---|---|---|---|---|
| G1 | Auditoria de acessibilidade WCAG 2.2 AA com teste de tecnologia assistiva real (screen reader + teclado + zoom + reduced motion) | agente | acessibilidade, wcag, screen-reader, teclado, aria, pour | testing | testing/testing-accessibility-auditor.md:11 |
| G2 | Princípio "30% automatizado, 70% manual" — automação cobre só 30% das falhas; foco em ordem de leitura, gerenciamento de foco, ARIA mal-usado, barreiras cognitivas | metodo-prompt | acessibilidade, manual-vs-automatico, gestao-de-foco, aria | testing | testing/testing-accessibility-auditor.md:36 |
| G3 | Protocolo de teste por screen reader com matriz Component × Behavior × Expected × Status cobrindo landmarks, formulários, modais, live regions | framework | screen-reader, voiceover, nvda, jaws, live-regions, landmarks | testing | testing/testing-accessibility-auditor.md:141 |
| G4 | Padrões de teclado por componente (Tabs/Menus/Carousels/Tables) com checklist binário de operabilidade (Tab/Arrow/Home/End/Enter/Escape) | framework | teclado, wai-aria-apg, tabs, menus, carousel | testing | testing/testing-accessibility-auditor.md:188 |
| G5 | Testes de API com cobertura cruzada Funcional × Segurança × Performance num só suite (auth, SQL injection, rate limit, p95<200ms, concorrência) | agente | api, playwright, owasp-api-top-10, performance, rate-limit | testing | testing/testing-api-tester.md:10 |
| G6 | SLAs absolutos como gates de aceite — p95<200ms, erro<0.1%, cobertura ≥95% endpoints, suite <15min, carga 10x normal validada | metodo-prompt | sla, percentil-95, taxa-de-erro, cobertura | testing | testing/testing-api-tester.md:51 |
| G7 | Suite OWASP API Top 10 com casos prontos (rejeitar sem auth, prevenir SQLi via parâmetro, enforcement de rate-limit por burst de 100 requisições) | skill | owasp-api, sql-injection, rate-limit, jwt | testing | testing/testing-api-tester.md:130 |
| G8 | Teste de concorrência com baseline de latência média sob 50 requisições paralelas (avgResponseTime < 500ms) | skill | concorrencia, carga, latencia, promise-all, k6 | testing | testing/testing-api-tester.md:175 |
| G9 | QA cético baseado em evidência visual — screenshot é a única verdade, "zero issues" é red flag, primeira implementação SEMPRE tem ≥3-5 defeitos | agente | qa, evidencia-visual, playwright, ceticismo | testing | testing/testing-evidence-collector.md:10 |
| G10 | Princípio "Default to Finding Issues" — sempre buscar 3-5+ defeitos mínimo no primeiro ciclo; A+/98 são fantasia; rating realista B-/B/B+ | metodo-prompt | default-failure, rating-realista, anti-otimismo | testing | testing/testing-evidence-collector.md:27 |
| G11 | Gatilhos de "AUTOMATIC FAIL" para sinalizar fantasia ("zero issues", "luxury sem prova", "production ready sem evidência") | framework | automatic-fail, fantasia, spec-vs-realidade | testing | testing/testing-evidence-collector.md:100 |
| G12 | Protocolo de captura responsiva fixa (desktop 1920×1080 / tablet 768×1024 / mobile 375×667) + dark mode como evidência padrão | skill | playwright, responsivo, breakpoints, dark-mode | testing | testing/testing-evidence-collector.md:93 |
| G13 | Benchmarking de performance com k6 — load → stress → spike → endurance num único pipeline com thresholds declarativos | agente | k6, load-test, stress-test, endurance, thresholds | testing | testing/testing-performance-benchmarker.md:11 |
| G14 | Core Web Vitals com metas explícitas — LCP<2.5s, FID<100ms, CLS<0.1, com 90% dos usuários em "Good"; otimização de RUM + sintético | framework | core-web-vitals, lcp, fid, cls, rum, sintetico | testing | testing/testing-performance-benchmarker.md:28 |
| G15 | Pipeline de carga em estágios (warm-up → normal → peak → sustained → stress → cool-down) com thresholds inline e métricas custom | skill | k6, load-stages, thresholds, custom-metrics, ramp-up | testing | testing/testing-performance-benchmarker.md:71 |
| G16 | Capacity planning com auto-scaling validado e previsão de crescimento — sistema deve aguentar 10x carga atual com ≤15% degradação | metodo-prompt | capacity-planning, auto-scaling, forecasting, degradacao | testing | testing/testing-performance-benchmarker.md:35 |
| G17 | Revisão de integração que DEFAULT NEEDS WORK — última linha de defesa contra "production ready" prematuro; exige evidência avassaladora | agente | integration-review, default-fail, cross-validation | testing | testing/testing-reality-checker.md:10 |
| G18 | Cruzamento QA × Integração — confirmar ou desafiar achados do QA com evidência automatizada adicional; jornadas end-to-end por screenshots before/after | metodo-prompt | qa-cross-validation, jornada-end-to-end, evidencia-cruzada | testing | testing/testing-reality-checker.md:58 |
| G19 | Spec-vs-Implementation com citação literal do requisito + evidência de screenshot + gap analysis explícito por critério | framework | spec-compliance, gap-analysis, citacao-literal | testing | testing/testing-reality-checker.md:113 |
| G20 | "First implementations need 2-3 revision cycles" — ciclos esperados como contrato com stakeholders; C+/B- é normal, "ready" exige excelência | metodo-prompt | ciclos-de-revisao, expectativa-realista, contrato-stakeholder | testing | testing/testing-reality-checker.md:36 |
| G21 | Análise estatística de resultados de teste com intervalos de confiança, ML para predição de áreas defeito-propensas e go/no-go quantitativo | agente | analise-estatistica, ml, defect-prediction, release-readiness | testing | testing/testing-test-results-analyzer.md:10 |
| G22 | Predição de defeitos por Random Forest sobre métricas de código + histórico — feature importance e score de confiança guiam priorização | skill | random-forest, defect-prediction, sklearn, feature-importance | testing | testing/testing-test-results-analyzer.md:123 |
| G23 | Assessment de release readiness composto (pass-rate + cobertura + SLA + segurança + densidade de defeitos + risk score) | framework | release-readiness, go-no-go, confianca-estatistica | testing | testing/testing-test-results-analyzer.md:143 |
| G24 | Categorização automática de falhas (funcional/performance/segurança/integração) + análise de tendência + root cause estatística | skill | failure-categorization, root-cause, tendencia | testing | testing/testing-test-results-analyzer.md:101 |
| G25 | Avaliação de ferramentas com scoring multi-critério ponderado (funcionalidade 25% + UX 20% + perf 15% + segurança 15% + integração 10% + suporte 8% + custo 7%) | agente | tool-evaluation, mcda, scoring-ponderado, tco | testing | testing/testing-tool-evaluator.md:10 |
| G26 | Cálculo de TCO em horizonte de 3 anos com 7 categorias (licença, implementação, treinamento, manutenção, integração, migração, suporte) | framework | tco, custo-total, 3-anos, cost-per-user | testing | testing/testing-tool-evaluator.md:225 |
| G27 | Teste de performance de ferramenta por chamada de API repetida (10x) com avg e p95 mapeados em score 0-10 — limiares <0.1s/<0.5s/<1.0s/<2.0s | skill | tool-performance, p95, latencia-api, scoring-faixa | testing | testing/testing-tool-evaluator.md:190 |
| G28 | Comparison matrix de ferramentas com category leader por critério + ranking por weighted score + recomendação estratégica | skill | matriz-comparativa, category-leader, ranking | testing | testing/testing-tool-evaluator.md:250 |
| G29 | Otimização de workflow com mapeamento Current State → Future State, identificação sistemática de gargalos e estratégia Lean/Six Sigma | agente | workflow-optimization, lean, six-sigma, current-state, rpa | testing | testing/testing-workflow-optimizer.md:10 |
| G30 | Modelagem de ProcessStep com 7 dimensões (duração, custo, taxa de erro, potencial de automação, severidade de gargalo, satisfação) | framework | process-modeling, dataclass, multi-dimensao | testing | testing/testing-workflow-optimizer.md:71 |
| G31 | Identificação de oportunidades por 4 padrões disparadores (erro>5%, gargalo≥4, automação>0.7, satisfação<5) com mapeamento impact/effort | skill | opportunity-identification, lean-waste, thresholds | testing | testing/testing-workflow-optimizer.md:133 |
| G32 | Priorização Impact/Effort em 3 fases (quick wins 4sem / médio prazo 12sem / estratégico 26sem) com priority_score = impacto/esforço | framework | priorizacao, impact-effort, quick-wins, roadmap-fases | testing | testing/testing-workflow-optimizer.md:270 |

**Total: 32 capacidades (G1–G32).**

## Resumo por agente upstream

| Agente upstream | Base | Técnicas | IDs |
|---|---|---|---|
| testing-accessibility-auditor | G1 | G2, G3, G4 | G1-G4 |
| testing-api-tester | G5 | G6, G7, G8 | G5-G8 |
| testing-evidence-collector | G9 | G10, G11, G12 | G9-G12 |
| testing-performance-benchmarker | G13 | G14, G15, G16 | G13-G16 |
| testing-reality-checker | G17 | G18, G19, G20 | G17-G20 |
| testing-test-results-analyzer | G21 | G22, G23, G24 | G21-G24 |
| testing-tool-evaluator | G25 | G26, G27, G28 | G25-G28 |
| testing-workflow-optimizer | G29 | G30, G31, G32 | G29-G32 |
