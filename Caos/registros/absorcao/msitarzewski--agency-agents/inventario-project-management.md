# F3 — Inventário de capacidades · `msitarzewski--agency-agents@a597cb6` — divisão `project-management/`

Granularidade: 1 base por agente + técnicas transferíveis salientes. Total esperado: 7 (bases) + ~7-21 (técnicas) = 14-28 IDs.

| ID | capacidade | tipo | keywords | dominio | fonte(arquivo:linha) |
|---|---|---|---|---|---|
| G1 | Design e gestão de experimentos científicos com validação estatística | base | A/B testing, hypothesis, sample size, statistical significance, 95% confidence | project-management | project-management-experiment-tracker.md:21-26 |
| G2 | Enforcar rastreabilidade Jira-Git com commits estruturados e atomicidade | base | Jira-linked, traceability, atomic commits, branch strategy, audit-ready | project-management | project-management-jira-workflow-steward.md:11-25 |
| G3 | Extrair decisões e action items de transcrições desestruturadas | base | meeting extraction, structured output, 4-section template, no invention | project-management | project-management-meeting-notes-specialist.md:14-25 |
| G4 | Orquestrar projetos cross-funcional com alinhamento de stakeholders | base | cross-functional coordination, timeline management, stakeholder alignment, risk mitigation | project-management | project-management-project-shepherd.md:11-25 |
| G5 | Otimizar eficiência operacional diária e processos de workflow | base | operations, SOP design, process bottlenecks, resource coordination, 95% efficiency | project-management | project-management-studio-operations.md:11-26 |
| G6 | Gerir portfolio estratégico com ROI e posicionamento competitivo | base | portfolio management, strategic vision, resource allocation, 25% ROI, competitive positioning | project-management | project-management-studio-producer.md:11-26 |
| G7 | Converter especificações em tarefas com escopo realista e sem gold-plating | base | spec parsing, task granularity, realistic scope, developer-first breakdown, 30-60min tasks | project-management | project-manager-senior.md:11-46 |
| G8 | Calcular tamanho de amostra e poder estatístico antes de lançamento | tecnica | statistical power, sample size, 80% power, experimental validity, pre-launch | project-management | project-management-experiment-tracker.md:24-25 |
| G9 | Implementar regras de parada precoce e testes sequenciais | tecnica | early stopping, sequential testing, Bayesian analysis, continuous learning | project-management | project-management-experiment-tracker.md:49-50 |
| G10 | Padrão de commit com Gitmoji + Jira-ID em uma linha | tecnica | Gitmoji, commit atomicity, single-line format, change type advertising, gitmoji.dev | project-management | project-management-jira-workflow-steward.md:52-54 |
| G11 | Gate de Jira-ID: bloqueia workflow se task ausente | tecnica | Jira gate, validation hook, branch-commit linking, no anonymous code | project-management | project-management-jira-workflow-steward.md:41-45 |
| G12 | Modelo 4-seções: Data/Presentes, Decisões, Action Items, Perguntas Abertas | tecnica | 4-section extraction, structured markdown, no editorial commentary, placeholder for missing | project-management | project-management-meeting-notes-specialist.md:17-25 |
| G13 | Escalar problemas com soluções propostas (não só diagnóstico) | tecnica | proactive escalation, recommended solutions, stakeholder transparency, issue + remedy | project-management | project-management-project-shepherd.md:47-48 |
| G14 | Matriz de controle de mudanças para prevenção de scope creep | tecnica | change control, scope discipline, 10% creep limit, decision documentation | project-management | project-management-project-shepherd.md:50-54 |
| G15 | Template SOP com checkpoints de qualidade passo-a-passo | tecnica | SOP standardization, quality gates, step-by-step rigor, version control for docs | project-management | project-management-studio-operations.md:58-89 |
| G16 | Rastrear métricas operacionais para loops de melhoria contínua | tecnica | operational metrics, process analysis, efficiency trending, continuous improvement cycles | project-management | project-management-studio-operations.md:111-116 |
| G17 | Priorização de portfolio com ajuste de risco e ROI balanceado | tecnica | risk-adjusted prioritization, portfolio balancing, competing project allocation, ROI weighting | project-management | project-management-studio-producer.md:28-33 |
| G18 | Comunicação executiva calibrada por audiência de stakeholder | tecnica | executive messaging, audience segmentation, business impact framing, board readiness | project-management | project-management-studio-producer.md:156-160 |
| G19 | Critério de aceitação para tarefas: testável e específico | tecnica | acceptance criteria, task clarity, testable outcomes, developer accountability | project-management | project-manager-senior.md:67-76 |
| G20 | Granularidade de tarefa: 30-60 minutos por task (implementável sem confusão) | tecnica | task atomicity, developer ergonomics, review-ready scope, 1 clear change per task | project-management | project-manager-senior.md:28-30 |
| G21 | Citar especificação exatamente (sem invenção de luxo) | tecnica | spec fidelity, anti-gold-plating, literal quoting, realistic vs aspirational, reference discipline | project-management | project-manager-senior.md:20-25 |

**Total: 21 capacidades (G1–G21).**

## Resumo por agente upstream

### 1. Experiment Tracker (`project-management-experiment-tracker.md`)
- **G1** (base): Design e gestão de experimentos científicos
- **G8** (tecnica): Cálculo de tamanho de amostra
- **G9** (tecnica): Regras de parada precoce

### 2. Jira Workflow Steward (`project-management-jira-workflow-steward.md`)
- **G2** (base): Enforçar rastreabilidade Jira-Git
- **G10** (tecnica): Padrão Gitmoji + Jira-ID
- **G11** (tecnica): Gate de Jira-ID para bloquear workflows inválidos

### 3. Meeting Notes Specialist (`project-management-meeting-notes-specialist.md`)
- **G3** (base): Extrair decisões de transcrições
- **G12** (tecnica): Template 4-seções estruturado

### 4. Project Shepherd (`project-management-project-shepherd.md`)
- **G4** (base): Orquestração cross-funcional
- **G13** (tecnica): Escalação com soluções propostas
- **G14** (tecnica): Matriz de controle de mudanças

### 5. Studio Operations (`project-management-studio-operations.md`)
- **G5** (base): Otimização de eficiência operacional
- **G15** (tecnica): Template SOP com checkpoints
- **G16** (tecnica): Rastreamento de métricas operacionais

### 6. Studio Producer (`project-management-studio-producer.md`)
- **G6** (base): Gestão de portfolio estratégico
- **G17** (tecnica): Priorização ajustada por risco
- **G18** (tecnica): Comunicação executiva calibrada

### 7. Senior Project Manager (`project-manager-senior.md`)
- **G7** (base): Conversão spec-to-tasks
- **G19** (tecnica): Critério de aceitação
- **G20** (tecnica): Granularidade 30-60 min
- **G21** (tecnica): Citação de especificação

---

**Estrutura:**
- 7 capacidades-base (G1–G7), 1 por agente
- 14 técnicas transferíveis (G8–G21), distribuídas com salience: 2–4 por agente
- 0 moldes upstream, 0 exemplos de código catalogados (excluídos por regra de granularidade)
- **Zero overlap:** cada ID é atômico e mapeado a arquivo:linha real
