---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/msitarzewski--agency-agents/_indice|_indice]]"
---

# F3 — Inventário de capacidades · `msitarzewski--agency-agents@a597cb6` — divisão `specialized/` (catch-all)

Sub-roteamento na F3 (decisão Q3 do Ronan): cada agente recebe um `sub_dominio` para ser roteado a squad existente ou ROADMAP na F4.

Granularidade: 1 base por agente + 0-2 técnicas salientes (média 1). Total esperado: ~53 bases + ~30-80 técnicas = ~80-130 IDs.

| ID | capacidade | tipo | sub_dominio | keywords | dominio | fonte(arquivo:linha) |
|---|---|---|---|---|---|---|
| G1 | processamento autônomo de contas a pagar com idempotência e auditoria | agente | accounts-payable | pagamentos, vendor, idempotência, audit-trail | specialized | specialized/accounts-payable-agent.md:2 |
| G2 | roteamento multi-rail (ACH, wire, cripto, stablecoin) por destinatário/custo | tecnica | accounts-payable | rail, ACH, wire, crypto | specialized | specialized/accounts-payable-agent.md:23 |
| G3 | arquitetura de identidade e confiança para agentes autônomos | agente | agentic-identity | identidade, A2A, credenciais, zero-trust | specialized | specialized/agentic-identity-trust.md:2 |
| G4 | atestação criptográfica + ciclo-de-vida de credenciais para agentes | tecnica | agentic-identity | keypair, rotação, revogação, atestação | specialized | specialized/agentic-identity-trust.md:22 |
| G5 | reputação baseada em evidência observável (não auto-declarada) | tecnica | agentic-identity | reputação, peer-verification, trust-score | specialized | specialized/agentic-identity-trust.md:30 |
| G6 | orquestrador autônomo de pipeline de desenvolvimento PM→Arch→Dev↔QA→Integração | agente | outros | pipeline, orquestrador, dev-qa-loop | specialized | specialized/agents-orchestrator.md:2 |
| G7 | validação task-by-task com retry-loop em falhas de QA | tecnica | outros | gate-de-qualidade, retry, qa-loop | specialized | specialized/agents-orchestrator.md:27 |
| G8 | governança de automação (n8n-first) por valor/risco/manutenibilidade | agente | automation-governance | n8n, governança, automação, fallback | specialized | specialized/automation-governance-architect.md:2 |
| G9 | framework de decisão "automatizar ou não" com fallback e ownership | tecnica | automation-governance | decision-framework, ownership | specialized | specialized/automation-governance-architect.md:29 |
| G10 | consultoria estratégica de negócio (entrada, posicionamento, modelo) | agente | business-strategy | competitive-analysis, market-entry, model | specialized | specialized/business-strategist.md:2 |
| G11 | tradução de dinâmica competitiva em escolhas onde-competir/como-vencer | tecnica | business-strategy | strategy, positioning, frameworks | specialized | specialized/business-strategist.md:27 |
| G12 | gestão de mudança organizacional (ADKAR, Kotter, Prosci) | agente | hr | change-management, ADKAR, Kotter, Prosci | specialized | specialized/change-management-consultant.md:2 |
| G13 | execução do lado humano de transformações (ERP, M&A, cultura) | tecnica | hr | adoção, resistência, transformação | specialized | specialized/change-management-consultant.md:15 |
| G14 | CFO estratégico (alocação de capital, FP&A, IR, board) | agente | finance-bespoke | CFO, capital-allocation, treasury, IR | specialized | specialized/chief-financial-officer.md:2 |
| G15 | design de programa de treinamento corporativo orientado a comportamento (Kirkpatrick L3) | agente | hr | T&D, currículo, Kirkpatrick, blended-learning | specialized | specialized/corporate-training-designer.md:2 |
| G16 | atendimento ao cliente cross-indústria (inquiries, escalonamento, FAQs) | agente | outros | customer-service, escalation, CSAT | specialized | specialized/customer-service.md:2 |
| G17 | gestão de Customer Success (onboarding, health-score, QBR, NRR) | agente | outros | CS, health-score, churn, expansion, renewal | specialized | specialized/customer-success-manager.md:2 |
| G18 | health-scoring de contas + identificação de expansão pré-renovação | tecnica | outros | health-scoring, expansion, renewal | specialized | specialized/customer-success-manager.md:4 |
| G19 | consolidação de dados de vendas em dashboards live (território, rep, pipeline) | agente | outros | dashboard, sales-data, consolidação | specialized | specialized/data-consolidation-agent.md:2 |
| G20 | DPO corporativo (GDPR/CCPA, DPIA, breach response, vendor due diligence) | agente | juridico | DPO, GDPR, CCPA, DPIA, privacy | specialized | specialized/data-privacy-officer.md:2 |
| G21 | data mapping + Article 30 records + consent management | tecnica | juridico | data-map, art-30, consent | specialized | specialized/data-privacy-officer.md:14 |
| G22 | programa ESG corporativo (materialidade, disclosure, descarbonização) | agente | business-strategy | ESG, sustainability, disclosure, dec arb | specialized | specialized/esg-sustainability-officer.md:2 |
| G23 | reporting multi-framework anti-greenwashing (ancorado em dado auditado) | tecnica | business-strategy | reporting, frameworks, integridade | specialized | specialized/esg-sustainability-officer.md:14 |
| G24 | pré-venda para mercado de TI governamental chinês (ToG) | agente | business-strategy | ToG, China, governo, bid, POC | specialized | specialized/government-digital-presales-consultant.md:2 |
| G25 | escrita de propostas de grant (federal/foundation/corporate/research) | agente | outros | grant, proposal, LOI, federal-grants | specialized | specialized/grant-writer.md:2 |
| G26 | atendimento ao paciente HIPAA-compliant (billing, agenda, seguros) | agente | healthcare | HIPAA, patient-support, billing, insurance | specialized | specialized/healthcare-customer-service.md:2 |
| G27 | compliance de marketing de saúde na China (medicamentos, devices, estética) | agente | healthcare | compliance, advertising-law, China, medical-ads | specialized | specialized/healthcare-marketing-compliance.md:2 |
| G28 | serviços de hospedagem (check-in/out, concierge, loyalty, eventos) | agente | hospitality | hotel, concierge, loyalty, eventos | specialized | specialized/hospitality-guest-services.md:2 |
| G29 | resolução de complaint hoteleira convertendo em review 5★ | tecnica | hospitality | service-recovery, NPS | specialized | specialized/hospitality-guest-services.md:15 |
| G30 | onboarding de novos colaboradores (orientação, docs, benefícios, jornada 30-60-90) | agente | hr | onboarding, orientação, benefícios, 30-60-90 | specialized | specialized/hr-onboarding.md:2 |
| G31 | operação de identity graph compartilhado entre agentes (resolução determinística) | agente | agentic-identity | identity-graph, ER, multi-agente, canonical-id | specialized | specialized/identity-graph-operator.md:2 |
| G32 | resolução de entidade orientada a evidência (sem hardcode, sem palpite) | tecnica | agentic-identity | entity-resolution, evidence-driven | specialized | specialized/identity-graph-operator.md:10 |
| G33 | tradução EN↔ES contextual com consciência de dialeto e registro (tú/usted) | agente | outros | translation, ES, EN, dialect, register | specialized | specialized/language-translator.md:2 |
| G34 | billing & time-tracking jurídico (captura, narrativa, collections, trust account) | agente | juridico | legal-billing, time-tracking, trust-account | specialized | specialized/legal-billing-time-tracking.md:2 |
| G35 | escrita de narrativa de billing à prova de disputa de cliente | tecnica | juridico | narrative, billing-writing, ethics | specialized | specialized/legal-billing-time-tracking.md:6 |
| G36 | intake jurídico (qualificação, conflict-check, agendamento, sumário ao advogado) | agente | juridico | legal-intake, conflict-check, qualification | specialized | specialized/legal-client-intake.md:2 |
| G37 | revisão de documentos jurídicos (contratos, litigação, real estate, compliance) | agente | juridico | contract-review, redline, indemnification, version-diff | specialized | specialized/legal-document-review.md:2 |
| G38 | comparação versão-a-versão + flag de cláusula de risco | tecnica | juridico | version-compare, risk-flag | specialized | specialized/legal-document-review.md:4 |
| G39 | assistente de loan officer (intake, pré-qualificação, pipeline, compliance, closing) | agente | finance-bespoke | mortgage, lending, pipeline, RESPA-TILA | specialized | specialized/loan-officer-assistant.md:2 |
| G40 | engenharia de LSP + indexação semântica para code-intelligence unificada | agente | outros | LSP, semantic-index, code-graph, polyglot | specialized | specialized/lsp-index-engineer.md:2 |
| G41 | gestão de integração pós-fusão (Day-1, 100-day plan, sinergia, TSA) | agente | business-strategy | M&A, PMI, day-1, synergy, TSA | specialized | specialized/ma-integration-manager.md:2 |
| G42 | rastreamento de sinergia + workstream cross-funcional pós-merge | tecnica | business-strategy | synergy-tracking, workstream | specialized | specialized/ma-integration-manager.md:4 |
| G43 | billing & coding médico (ICD-10, CPT, HCPCS, denial management, revenue cycle) | agente | healthcare | medical-billing, ICD-10, CPT, denial, RCM | specialized | specialized/medical-billing-coding-specialist.md:2 |
| G44 | gestão de denial + auditoria de coding compliance | tecnica | healthcare | denial-mgmt, coding-audit | specialized | specialized/medical-billing-coding-specialist.md:11 |
| G45 | operações de negócio (Lean, Six Sigma, processo, KPI, vendor, capacidade) | agente | business-strategy | ops, Lean, Six-Sigma, KPI, SOP | specialized | specialized/operations-manager.md:2 |
| G46 | mapeamento de processo + remoção de desperdício/variação | tecnica | business-strategy | process-mapping, waste-removal | specialized | specialized/operations-manager.md:11 |
| G47 | psicologia organizacional (psych-safety, burnout, cultura, evidence-based) | agente | hr | org-psych, psych-safety, burnout, culture | specialized | specialized/organizational-psychologist.md:2 |
| G48 | mentoria de desenvolvimento pessoal (metas, hábitos, accountability, decisões) | agente | outros | personal-growth, habits, accountability | specialized | specialized/personal-growth-mentor.md:2 |
| G49 | corretagem imobiliária (representação comprador/vendedor, ofertas, transações) | agente | real-estate | real-estate, listing, offer, closing | specialized | specialized/real-estate-buyer-seller.md:2 |
| G50 | recrutamento full-cycle no mercado chinês (plataformas, assessment, labor law) | agente | hr | recrutamento, China, talent-acquisition | specialized | specialized/recruitment-specialist.md:2 |
| G51 | distribuição automatizada de relatórios consolidados de vendas a representantes | agente | outros | report-distribution, sales-reports | specialized | specialized/report-distribution-agent.md:2 |
| G52 | atendimento de devoluções/trocas (in-store, online, omni; fraude e analytics) | agente | outros | returns, exchange, fraud, omnichannel | specialized | specialized/retail-customer-returns.md:2 |
| G53 | extração de métricas de vendas em Excel (MTD/YTD/YE) para reporting live | agente | outros | excel, MTD, YTD, data-extraction | specialized | specialized/sales-data-extraction-agent.md:2 |
| G54 | sales outreach B2B consultivo (prospecting, follow-up, objeção, pipeline) | agente | outros | sales, outreach, B2B, prospecting | specialized | specialized/sales-outreach.md:2 |
| G55 | Chief of Staff (filtro de ruído, processo, decisão, posicionamento de output) | agente | business-strategy | CoS, filtering, process, escalation | specialized | specialized/specialized-chief-of-staff.md:2 |
| G56 | framework de filtragem escalate/handle/park por impacto no principal | tecnica | business-strategy | escalation-framework, filter | specialized | specialized/specialized-chief-of-staff.md:39 |
| G57 | engenharia civil/estrutural multi-padrão (Eurocode, ACI, AISC, GB, AS/NZS) | agente | outros | civil-engineering, structural, codes | specialized | specialized/specialized-civil-engineer.md:2 |
| G58 | estratégia de inteligência cultural (CQ) anti-exclusão invisível em software | agente | outros | CQ, i18n, inclusion, UX | specialized | specialized/specialized-cultural-intelligence-strategist.md:2 |
| G59 | Developer Advocate (DevRel, conteúdo técnico, DX, adoção) | agente | outros | devrel, devx, community, adoption | specialized | specialized/specialized-developer-advocate.md:2 |
| G60 | geração programática de documentos profissionais (PDF, PPTX, DOCX, XLSX) | agente | outros | document-gen, PDF, PPTX, DOCX, XLSX | specialized | specialized/specialized-document-generator.md:2 |
| G61 | navegação do mercado de consultoria francês (ESN/SI, portage, Malt) | agente | business-strategy | ESN, SI, France, portage, freelance | specialized | specialized/specialized-french-consulting-market.md:2 |
| G62 | navegação de cultura de negócios coreana (품의, nunchi, KakaoTalk, hierarquia) | agente | business-strategy | Korea, nunchi, hierarchy, soju, relationship | specialized | specialized/specialized-korean-business-navigator.md:2 |
| G63 | construção de servidores MCP customizados (tools, resources, prompts) | agente | outros | MCP, model-context-protocol, server-build | specialized | specialized/specialized-mcp-builder.md:2 |
| G64 | QA independente de modelos ML/estatísticos (replicação, calibração, interpretabilidade) | agente | outros | model-QA, ML-audit, replication, calibration | specialized | specialized/specialized-model-qa.md:2 |
| G65 | análise de pricing (market research, competidores, custo, willingness-to-pay) | agente | business-strategy | pricing, WTP, margin, competitor-analysis | specialized | specialized/specialized-pricing-analyst.md:2 |
| G66 | arquitetura de soluções Salesforce multi-cloud com governor-limits/CI-CD | agente | outros | Salesforce, multi-cloud, Apex, LWC, governance | specialized | specialized/specialized-salesforce-architect.md:2 |
| G67 | duelo de estratégia game-theory + 36 estratagemas chineses | agente | outros | game-theory, 36-stratagems, adversarial | specialized | specialized/specialized-strategy-duel-agent.md:2 |
| G68 | desenho de workflow-tree (happy/branches/falhas/recovery/handoff/estados) | agente | outros | workflow-design, decision-tree, build-spec | specialized | specialized/specialized-workflow-architect.md:2 |
| G69 | aconselhamento de study abroad para estudantes chineses (US/UK/CA/AU/EU/HK/SG) | agente | outros | study-abroad, application, visa, essay-coaching | specialized | specialized/study-abroad-advisor.md:2 |
| G70 | estratégia de supply chain ancorada no ecossistema chinês (sourcing, QC, ERP) | agente | business-strategy | supply-chain, sourcing, China, supplier, ERP | specialized | specialized/supply-chain-strategist.md:2 |
| G71 | steward de base de conhecimento estilo Zettelkasten (notas atômicas + conectividade) | agente | outros | zettelkasten, knowledge-base, atomic-notes | specialized | specialized/zk-steward.md:2 |
| G72 | troca de perspectiva por domínio (Luhmann padrão; Feynman, Munger, Ogilvy) | tecnica | outros | persona-switch, cross-domain | specialized | specialized/zk-steward.md:3 |

**Total: 72 capacidades (G1–G72).**

## Distribuição por sub_dominio

| sub_dominio | Nº agentes | Nº IDs | Squad-alvo Kolden candidato |
|---|---|---|---|
| juridico | 5 | 7 | Themis (conselho jurídico) — ADAPT existente |
| healthcare | 4 | 4 | ROADMAP (novo squad: Asclepio) |
| hr | 6 | 7 | Hestia (people/cultura) — ADAPT existente |
| finance-bespoke | 2 | 2 | Pactolo (finanças avançadas) — ADAPT existente |
| hospitality | 1 | 2 | ROADMAP (squad nicho ou Hestia, decisão F4) |
| real-estate | 1 | 1 | ROADMAP (squad nicho — baixa prioridade) |
| agentic-identity | 3 | 5 | ROADMAP (novo squad: Argos-identidade ou submódulo Egide) |
| automation-governance | 1 | 2 | Dedalo (engenharia/MCP) — ADAPT |
| accounts-payable | 1 | 2 | Pactolo (operação financeira) — ADAPT |
| business-strategy | 9 | 14 | Olimpo/Aletheia/Argos — ADAPT distribuído (camada-4 e descoberta) |
| outros | 20 | 26 | DISTRIBUIR caso-a-caso na F4 (catch-all; ver "Resumo por agente upstream") |
| **TOTAL** | **53** | **72** | |

## Resumo por agente upstream

| # | agente upstream | sub_dominio | base | técnicas | total IDs |
|---|---|---|---|---|---|
| 1 | accounts-payable-agent | accounts-payable | G1 | G2 | 2 |
| 2 | agentic-identity-trust | agentic-identity | G3 | G4, G5 | 3 |
| 3 | agents-orchestrator | outros | G6 | G7 | 2 |
| 4 | automation-governance-architect | automation-governance | G8 | G9 | 2 |
| 5 | business-strategist | business-strategy | G10 | G11 | 2 |
| 6 | change-management-consultant | hr | G12 | G13 | 2 |
| 7 | chief-financial-officer | finance-bespoke | G14 | — | 1 |
| 8 | corporate-training-designer | hr | G15 | — | 1 |
| 9 | customer-service | outros | G16 | — | 1 |
| 10 | customer-success-manager | outros | G17 | G18 | 2 |
| 11 | data-consolidation-agent | outros | G19 | — | 1 |
| 12 | data-privacy-officer | juridico | G20 | G21 | 2 |
| 13 | esg-sustainability-officer | business-strategy | G22 | G23 | 2 |
| 14 | government-digital-presales-consultant | business-strategy | G24 | — | 1 |
| 15 | grant-writer | outros | G25 | — | 1 |
| 16 | healthcare-customer-service | healthcare | G26 | — | 1 |
| 17 | healthcare-marketing-compliance | healthcare | G27 | — | 1 |
| 18 | hospitality-guest-services | hospitality | G28 | G29 | 2 |
| 19 | hr-onboarding | hr | G30 | — | 1 |
| 20 | identity-graph-operator | agentic-identity | G31 | G32 | 2 |
| 21 | language-translator | outros | G33 | — | 1 |
| 22 | legal-billing-time-tracking | juridico | G34 | G35 | 2 |
| 23 | legal-client-intake | juridico | G36 | — | 1 |
| 24 | legal-document-review | juridico | G37 | G38 | 2 |
| 25 | loan-officer-assistant | finance-bespoke | G39 | — | 1 |
| 26 | lsp-index-engineer | outros | G40 | — | 1 |
| 27 | ma-integration-manager | business-strategy | G41 | G42 | 2 |
| 28 | medical-billing-coding-specialist | healthcare | G43 | G44 | 2 |
| 29 | operations-manager | business-strategy | G45 | G46 | 2 |
| 30 | organizational-psychologist | hr | G47 | — | 1 |
| 31 | personal-growth-mentor | outros | G48 | — | 1 |
| 32 | real-estate-buyer-seller | real-estate | G49 | — | 1 |
| 33 | recruitment-specialist | hr | G50 | — | 1 |
| 34 | report-distribution-agent | outros | G51 | — | 1 |
| 35 | retail-customer-returns | outros | G52 | — | 1 |
| 36 | sales-data-extraction-agent | outros | G53 | — | 1 |
| 37 | sales-outreach | outros | G54 | — | 1 |
| 38 | specialized-chief-of-staff | business-strategy | G55 | G56 | 2 |
| 39 | specialized-civil-engineer | outros | G57 | — | 1 |
| 40 | specialized-cultural-intelligence-strategist | outros | G58 | — | 1 |
| 41 | specialized-developer-advocate | outros | G59 | — | 1 |
| 42 | specialized-document-generator | outros | G60 | — | 1 |
| 43 | specialized-french-consulting-market | business-strategy | G61 | — | 1 |
| 44 | specialized-korean-business-navigator | business-strategy | G62 | — | 1 |
| 45 | specialized-mcp-builder | outros | G63 | — | 1 |
| 46 | specialized-model-qa | outros | G64 | — | 1 |
| 47 | specialized-pricing-analyst | business-strategy | G65 | — | 1 |
| 48 | specialized-salesforce-architect | outros | G66 | — | 1 |
| 49 | specialized-strategy-duel-agent | outros | G67 | — | 1 |
| 50 | specialized-workflow-architect | outros | G68 | — | 1 |
| 51 | study-abroad-advisor | outros | G69 | — | 1 |
| 52 | supply-chain-strategist | business-strategy | G70 | — | 1 |
| 53 | zk-steward | outros | G71 | G72 | 2 |
| **TOTAL** | | | **53 bases** | **19 técnicas** | **72** |

## Agentes ambíguos (notas para a F4)

- **`agents-orchestrator`** (G6/G7) — pertence funcionalmente ao **Prometeu/AIOX** (pipeline dev-QA), não é "specialized" no sentido temático. Sub-domínio `outros` aqui é apenas placeholder; a F4 deve roteá-lo para Prometeu (overlap com `agents-orchestrator` do AIOX core).
- **`agentic-identity-trust`** + **`identity-graph-operator`** (G3-G5, G31-G32) — fronteira entre **Egide** (segurança/identidade) e um novo squad de **infraestrutura agentic**. F4 decide se é submódulo de Egide ou squad próprio (`Argos-identidade`/`Mnemosine`).
- **`automation-governance-architect`** (G8/G9) — caberia em **Dedalo** (engenharia/MCP) ou num squad de **governança operacional** (Themis tem viés jurídico/compliance, mas pode acomodar). Reavaliar na F4.
- **`accounts-payable-agent`** (G1/G2) — operação tática de tesouraria. **Pactolo** parece o destino natural, mas existe overlap com fluxo de produto contábil ainda não modelado.
- **`specialized-chief-of-staff`** (G55/G56) — papel meta (filtro, escalonamento). Pode virar uma **habilidade compartilhada** do Olimpo, não um agente próprio. Decidir na F4.
- **`specialized-cultural-intelligence-strategist`** (G58) — sub-domínio `outros`, mas funcionalmente relevante para **Caliope** (copy) e **Aglaia** (branding) — pode virar habilidade transversal.
- **`specialized-document-generator`** (G60) — utilidade horizontal (PDF/PPTX/DOCX/XLSX); candidato a **habilidade/MCP compartilhado** entre múltiplos squads, não agente isolado.
- **`zk-steward`** (G71/G72) — gestão de conhecimento estilo Zettelkasten. Pode reforçar **Liceu** (Biblioteca de Mentes) ou virar um sistema de notas transversal do Caos.
- **`personal-growth-mentor`** (G48), **`language-translator`** (G33), **`study-abroad-advisor`** (G69), **`grant-writer`** (G25) — não são da Kolden no momento; F4 provavelmente classifica como DESCARTADO ou ROADMAP de baixíssima prioridade.
- **`specialized-strategy-duel-agent`** (G67) — entretenimento/educacional, distante do negócio core; F4 candidato a DESCARTADO.
- **`specialized-civil-engineer`** (G57) — fora de qualquer squad atual; F4 candidato a DESCARTADO ou ROADMAP nicho.
- **`specialized-french-consulting-market`** (G61) e **`specialized-korean-business-navigator`** (G62) — conhecimento regional ultra-nicho; F4 candidato a referência inerte (não habilidade ativa).
- **`specialized-salesforce-architect`** (G66) e **`specialized-mcp-builder`** (G63) — Dedalo já tem MCP-Builder (overlap). Salesforce não é stack Kolden — referência inerte.
- **Bloco China-centric** (`recruitment-specialist`, `supply-chain-strategist`, `government-digital-presales-consultant`, `corporate-training-designer`, `healthcare-marketing-compliance`, `study-abroad-advisor`) — todos contextualizados ao mercado chinês; valor para Kolden é da capacidade-base, não do contexto regional. F4 deve extrair o ADAPT removendo o vendor-lock cultural.
