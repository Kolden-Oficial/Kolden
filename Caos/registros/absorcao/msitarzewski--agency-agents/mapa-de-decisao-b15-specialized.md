---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/msitarzewski--agency-agents/_indice|_indice]]"
---

# F4 — Mapa de decisão · B15 Specialized sub-roteado

Repo: `msitarzewski/agency-agents@a597cb6` — divisão `specialized/`.
Inventário upstream: **72 IDs (53 agentes upstream)**, sub_dominio já atribuído na F3.

Regras aplicadas:
- REUSE > ADAPT > CREATE (Constituição Art. VI).
- ROADMAP é DESCARTADO legítimo (motivo "deferido R3/R4"), não PERDIDO — preserva anti-perda.
- DESCARTADO direto = fora de escopo Kolden (regional ultra-nicho sem capacidade-base reusável, ou já coberto sem ganho).
- Onde a capacidade-base é reusável mas o vestido regional não é, decisão = ADAPT (extrai a base, descarta o vendor-lock cultural).

## Tabela de decisão (72 IDs)

| ID | capacidade | sub_dominio | squad_alvo | decisao | match_kolden | justificativa | acao_f6 |
|---|---|---|---|---|---|---|---|
| G1 | processamento autônomo de contas a pagar com idempotência e auditoria | accounts-payable | Pactolo | ADAPT | `controller` + `analista-de-fluxo-de-caixa` (parcial) | Pactolo cobre fechamento e caixa, mas não tem AP automatizado com idempotência e audit-trail. Capacidade complementa o `controller`. | Estender `controller` com habilidade `processamento-de-contas-a-pagar` (idempotência + audit-trail + vendor mgmt). |
| G2 | roteamento multi-rail (ACH, wire, cripto, stablecoin) por destinatário/custo | accounts-payable | Pactolo | ADAPT | nenhum | Técnica anexa ao G1. Útil como sub-habilidade do AP, com adaptação para rails BR (PIX/TED/boleto + cripto/stablecoin opcional). | Sub-habilidade `roteamento-multi-rail-pagamentos` dentro de `processamento-de-contas-a-pagar`. |
| G3 | arquitetura de identidade e confiança para agentes autônomos | agentic-identity | ROADMAP (Égide-submódulo recomendado) | ROADMAP | nenhum (Égide é cyber/pentest, não identidade-A2A) | Capacidade futura crítica (agent-to-agent auth, zero-trust entre agentes). Égide tem afinidade temática (segurança), mas não é submódulo trivial — exige PRD próprio. Defere R3. | DESCARTADO/DEFERIDO R3 com motivo "criar submódulo `Égide/agentic-identidade/` ou squad novo `Mnemosine`". |
| G4 | atestação criptográfica + ciclo-de-vida de credenciais para agentes | agentic-identity | ROADMAP (Égide-submódulo) | ROADMAP | nenhum | Técnica anexa a G3. | DESCARTADO/DEFERIDO R3 (junto com G3). |
| G5 | reputação baseada em evidência observável (não auto-declarada) | agentic-identity | ROADMAP (Égide-submódulo) | ROADMAP | nenhum | Técnica anexa a G3. | DESCARTADO/DEFERIDO R3. |
| G6 | orquestrador autônomo de pipeline de desenvolvimento PM→Arch→Dev↔QA→Integração | outros | Prometeu | DESCARTADO | OVERLAP TOTAL com `agents-orchestrator` do AIOX core | Prometeu já tem o orquestrador canônico (AIOX/Prometeu). Absorver duplica jurisdição. | DESCARTADO com motivo "overlap-total Prometeu/agents-orchestrator". |
| G7 | validação task-by-task com retry-loop em falhas de QA | outros | Prometeu | DESCARTADO | OVERLAP com `qa-loop` do AIOX core | Mesma justificativa de G6. | DESCARTADO (overlap Prometeu). |
| G8 | governança de automação (n8n-first) por valor/risco/manutenibilidade | automation-governance | Dedalo | ADAPT | `mcp-integrator` (Piper) + `roadmap-sentinel` (Vigil) | Dedalo cobre MCP e features, mas não tem framework "automatizar ou não" (valor × risco × manutenibilidade). Cabe como habilidade transversal. | Criar habilidade `governanca-de-automacao` em Dedalo (mcp-integrator como dono). |
| G9 | framework de decisão "automatizar ou não" com fallback e ownership | automation-governance | Dedalo | ADAPT | nenhum | Técnica anexa a G8. | Sub-bloco dentro de `governanca-de-automacao` (matriz decisão + ownership). |
| G10 | consultoria estratégica de negócio (entrada, posicionamento, modelo) | business-strategy | Olimpo (Zeus) + Aletheia (handoff) | ADAPT | `zeus` (CEO) + `aletheia-chief` | Zeus já é estratégia macro; Aletheia faz discovery/validation. Capacidade reforça o Zeus em "where-to-play / how-to-win" (posicionamento). | Estender Zeus com habilidade `estrategia-de-entrada-e-posicionamento` (frameworks: 3Cs, Porter, Wardley). |
| G11 | tradução de dinâmica competitiva em escolhas onde-competir/como-vencer | business-strategy | Olimpo (Zeus) | ADAPT | nenhum | Técnica anexa a G10. | Sub-bloco em `estrategia-de-entrada-e-posicionamento`. |
| G12 | gestão de mudança organizacional (ADKAR, Kotter, Prosci) | hr | Hestia | ADAPT | `business-partner-rh` + `analista-de-cultura` | Hestia cobre cultura/clima e políticas, mas não tem framework de mudança organizacional (ADKAR/Kotter). Cabe ao HRBP. | Criar habilidade `gestao-de-mudanca-organizacional` em Hestia (business-partner-rh como dono). |
| G13 | execução do lado humano de transformações (ERP, M&A, cultura) | hr | Hestia | ADAPT | nenhum | Técnica anexa a G12 (caso de uso). | Sub-bloco aplicado em `gestao-de-mudanca-organizacional`. |
| G14 | CFO estratégico (alocação de capital, FP&A, IR, board) | finance-bespoke | Olimpo (Plutos/CFO) | ADAPT | `plutos` | Plutos é o CFO do Olimpo; capacidade reforça a frente de IR/board que ainda está magra. NÃO vai para Pactolo (Pactolo é operacional, Plutos é estratégico). | Estender Plutos com habilidades `alocacao-de-capital` e `investor-relations`. |
| G15 | design de programa de treinamento corporativo orientado a comportamento (Kirkpatrick L3) | hr | Hestia | ADAPT | `business-partner-rh` | Hestia tem PDI mas não T&D estruturado (Kirkpatrick). Capacidade-base válida — descartar contexto chinês. | Criar habilidade `design-de-treinamento-corporativo` em Hestia (business-partner-rh). |
| G16 | atendimento ao cliente cross-indústria (inquiries, escalonamento, FAQs) | outros | Hestia (DEFERIDO) | ROADMAP | nenhum (Hestia é people, não CS) | Customer Service merece squad próprio (Iris já existe como ideia?). Por ora, defere R4. Anti-perda: capacidade reaparece em buckets futuros (B10 support). | DESCARTADO/DEFERIDO R4 — entra no roadmap de squad de Customer Operations. |
| G17 | gestão de Customer Success (onboarding, health-score, QBR, NRR) | outros | ROADMAP (Customer Ops) | ROADMAP | nenhum | Mesma família que G16. CS é frente futura da Kolden. | DESCARTADO/DEFERIDO R4. |
| G18 | health-scoring de contas + identificação de expansão pré-renovação | outros | ROADMAP (Customer Ops) | ROADMAP | nenhum | Técnica anexa a G17. | DESCARTADO/DEFERIDO R4. |
| G19 | consolidação de dados de vendas em dashboards live (território, rep, pipeline) | outros | Metis | ADAPT | (Metis cobre analytics) | Metis é o squad de dados/analytics. Capacidade cabe como habilidade de sales-analytics. | Criar habilidade `consolidacao-de-dados-de-vendas` em Metis. |
| G20 | DPO corporativo (GDPR/CCPA, DPIA, breach response, vendor due diligence) | juridico | Themis | ADAPT | (conselho consultivo — não tem DPO operacional) | Themis é conselho estratégico (Dalio, Munger, etc.), não operação jurídica. Capacidade reforça com persona "Data Protection Officer" operacional adaptada à LGPD (BR). | Adicionar conselheiro `dpo-lgpd` em Themis OU criar habilidade transversal `dpo-lgpd-conformidade`. Recomendação: habilidade (mais reusável). |
| G21 | data mapping + Article 30 records + consent management | juridico | Themis | ADAPT | nenhum | Técnica anexa a G20. | Sub-bloco em `dpo-lgpd-conformidade` (mapa de dados + RMT — Registro de Atividades de Tratamento, equivalente Art.30 GDPR ≈ Art.37 LGPD). |
| G22 | programa ESG corporativo (materialidade, disclosure, descarbonização) | business-strategy | Olimpo (Zeus + Plutos) | ADAPT | nenhum | Capacidade nova e relevante (relatório de sustentabilidade, materialidade). Plutos para o disclosure financeiro (CSRD/ISSB/CVM86), Zeus para a estratégia. | Criar habilidade `programa-esg-corporativo` (Zeus dono, Plutos handoff em disclosure). |
| G23 | reporting multi-framework anti-greenwashing (ancorado em dado auditado) | business-strategy | Olimpo (Plutos) | ADAPT | nenhum | Técnica anexa a G22. | Sub-bloco em `programa-esg-corporativo` (multi-framework: GRI, SASB, TCFD, ISSB). |
| G24 | pré-venda para mercado de TI governamental chinês (ToG) | business-strategy | — | DESCARTADO | nenhum | Ultra-nicho regional (China ToG). Capacidade-base "pré-venda gov" muito acoplada ao contexto. Sem volume na Kolden BR. | DESCARTADO com motivo "ultra-nicho-regional-China-sem-base-reusavel". |
| G25 | escrita de propostas de grant (federal/foundation/corporate/research) | outros | Caliope | ADAPT (parcial) | (Caliope é copy) | Caliope tem 33 copywriters; grant-writing é gênero de copy persuasivo formal. Capacidade-base reusável SE Kolden tiver linha de negócio de impacto/ONG/grants. Atualmente não tem. Defere R4. | DESCARTADO/DEFERIDO R4 — entra se surgir cliente de impacto. |
| G26 | atendimento ao paciente HIPAA-compliant (billing, agenda, seguros) | healthcare | ROADMAP (Asclepio) | ROADMAP | nenhum | Squad de saúde (Asclepio) não existe. Omiron (projeto, não squad) é de saúde mental, mas é projeto-cliente, não capacidade reusável. Defere R3/R4. | DESCARTADO/DEFERIDO R3 (squad Asclepio quando justificar). |
| G27 | compliance de marketing de saúde na China (medicamentos, devices, estética) | healthcare | — | DESCARTADO | nenhum | Ultra-nicho regional (China healthcare compliance). | DESCARTADO com motivo "ultra-nicho-regional-China-sem-base-reusavel". |
| G28 | serviços de hospedagem (check-in/out, concierge, loyalty, eventos) | hospitality | — | DESCARTADO | nenhum | Hospitality fora do escopo Kolden. Capacidade-base "service-recovery" reaparece em G29, mas não justifica o agente todo. | DESCARTADO com motivo "fora-de-escopo-Kolden". |
| G29 | resolução de complaint hoteleira convertendo em review 5★ | hospitality | Aletheia (handoff Pheme) | ADAPT (parcial) | nenhum | Capacidade-base "service-recovery → review 5★" tem valor cross-vertical (qualquer cliente Kolden com NPS). Mas baixa prioridade. Defere R4. | DESCARTADO/DEFERIDO R4 — habilidade transversal `service-recovery-para-review` quando entrar em roadmap. |
| G30 | onboarding de novos colaboradores (orientação, docs, benefícios, jornada 30-60-90) | hr | Hestia | REUSE | `especialista-de-onboarding` | Hestia JÁ TEM `especialista-de-onboarding` com plano 30-60-90 explicitado no README. Reusar. | REUSE — comparar profundidade upstream vs Hestia; se upstream traz padrão extra, incorporar como nota no agente existente. |
| G31 | operação de identity graph compartilhado entre agentes (resolução determinística) | agentic-identity | ROADMAP | ROADMAP | nenhum | Mesma família G3-G5. | DESCARTADO/DEFERIDO R3. |
| G32 | resolução de entidade orientada a evidência (sem hardcode, sem palpite) | agentic-identity | ROADMAP | ROADMAP | nenhum | Técnica anexa a G31. | DESCARTADO/DEFERIDO R3. |
| G33 | tradução EN↔ES contextual com consciência de dialeto e registro (tú/usted) | outros | — | DESCARTADO | nenhum | Tradução EN↔ES não é frente Kolden (operação BR foca PT-BR; EN entra como secundário). Capacidade-base baixa reusabilidade. | DESCARTADO com motivo "fora-de-escopo-Kolden-PT-BR-first". |
| G34 | billing & time-tracking jurídico (captura, narrativa, collections, trust account) | juridico | — | DESCARTADO | nenhum | Operação de escritório de advocacia. Kolden não atende escritórios jurídicos como vertical. | DESCARTADO com motivo "operacao-de-escritorio-de-advocacia-fora-de-escopo". |
| G35 | escrita de narrativa de billing à prova de disputa de cliente | juridico | — | DESCARTADO | nenhum | Técnica anexa a G34. | DESCARTADO (junto com G34). |
| G36 | intake jurídico (qualificação, conflict-check, agendamento, sumário ao advogado) | juridico | — | DESCARTADO | nenhum | Mesma família G34 (operação de escritório). | DESCARTADO. |
| G37 | revisão de documentos jurídicos (contratos, litigação, real estate, compliance) | juridico | Themis | ADAPT (parcial) | nenhum (Themis é estratégico) | Capacidade-base "contract review + redline" é útil para a Kolden ler contratos de cliente/fornecedor. Adaptar para visão de cliente (não escritório). | Criar habilidade `revisao-de-contrato-redline` em Themis (consumidor: empresa que assina contratos). |
| G38 | comparação versão-a-versão + flag de cláusula de risco | juridico | Themis | ADAPT | nenhum | Técnica anexa a G37. | Sub-bloco em `revisao-de-contrato-redline`. |
| G39 | assistente de loan officer (intake, pré-qualificação, pipeline, compliance, closing) | finance-bespoke | — | DESCARTADO | nenhum | Operação de banco/originação de crédito. Fora de escopo Kolden. | DESCARTADO com motivo "operacao-de-originador-de-credito-fora-de-escopo". |
| G40 | engenharia de LSP + indexação semântica para code-intelligence unificada | outros | Dedalo (Hefesto handoff) | ADAPT (parcial) | nenhum | Capacidade-base "LSP + semantic-index polyglot" é poderosa para Dedalo (mestre do Claude Code) e Hefesto (CTO). Adaptar como habilidade técnica. Prioridade média. | Criar habilidade `engenharia-de-lsp-e-indexacao-semantica` em Dedalo (skill-craftsman dono OU mcp-integrator). |
| G41 | gestão de integração pós-fusão (Day-1, 100-day plan, sinergia, TSA) | business-strategy | Olimpo (Zeus + Plutos) | ADAPT | nenhum | M&A PMI é frente estratégica útil. Zeus orquestra, Plutos faz a parte financeira (sinergia, TSA). | Criar habilidade `integracao-pos-fusao-pmi` (Zeus dono, Plutos handoff). |
| G42 | rastreamento de sinergia + workstream cross-funcional pós-merge | business-strategy | Olimpo (Plutos) | ADAPT | nenhum | Técnica anexa a G41. | Sub-bloco em `integracao-pos-fusao-pmi` (synergy-tracker + workstream cross-funcional). |
| G43 | billing & coding médico (ICD-10, CPT, HCPCS, denial management, revenue cycle) | healthcare | — | DESCARTADO | nenhum | Operação de RCM médico US (ICD-10/CPT/HCPCS). Fora de escopo Kolden BR. | DESCARTADO com motivo "operacao-RCM-medico-US-fora-de-escopo". |
| G44 | gestão de denial + auditoria de coding compliance | healthcare | — | DESCARTADO | nenhum | Técnica anexa a G43. | DESCARTADO. |
| G45 | operações de negócio (Lean, Six Sigma, processo, KPI, vendor, capacidade) | business-strategy | Olimpo (Poseidon/COO) | ADAPT | `poseidon` | Poseidon é COO; Lean/Six-Sigma/process-mapping é capacidade-base do COO. Cabe direto. | Criar habilidade `operacoes-lean-six-sigma` em Poseidon. |
| G46 | mapeamento de processo + remoção de desperdício/variação | business-strategy | Olimpo (Poseidon) | ADAPT | nenhum | Técnica anexa a G45. | Sub-bloco em `operacoes-lean-six-sigma` (process-mapping + waste/variation removal). |
| G47 | psicologia organizacional (psych-safety, burnout, cultura, evidence-based) | hr | Hestia | ADAPT | `analista-de-cultura` | Hestia já tem analista-de-cultura. Capacidade reforça com framework psych-org (psych-safety de Edmondson, burnout de Maslach). | Estender `analista-de-cultura` com habilidade `psicologia-organizacional-evidence-based`. |
| G48 | mentoria de desenvolvimento pessoal (metas, hábitos, accountability, decisões) | outros | — | DESCARTADO | nenhum | Coaching pessoal não é frente Kolden (B2B). | DESCARTADO com motivo "coaching-pessoal-B2C-fora-de-escopo". |
| G49 | corretagem imobiliária (representação comprador/vendedor, ofertas, transações) | real-estate | — | DESCARTADO | nenhum | Real estate fora de escopo Kolden. | DESCARTADO com motivo "fora-de-escopo-Kolden". |
| G50 | recrutamento full-cycle no mercado chinês (plataformas, assessment, labor law) | hr | Hestia | ADAPT (capacidade-base) | `recrutador-e-selecao` | Capacidade-base "full-cycle TA + assessment estruturado" é reusável; descartar contexto chinês (51job/BOSS Zhipin/Liepin) e labor law CN. Cabe como reforço ao agente existente. | Estender `recrutador-e-selecao` com habilidade `recrutamento-full-cycle-com-assessment-estruturado`. |
| G51 | distribuição automatizada de relatórios consolidados de vendas a representantes | outros | Metis | ADAPT | nenhum | Técnica de distribuição de report. Cabe em Metis como sub-habilidade do G19. | Sub-bloco em `consolidacao-de-dados-de-vendas` (distribuição + cadência). |
| G52 | atendimento de devoluções/trocas (in-store, online, omni; fraude e analytics) | outros | ROADMAP (Customer Ops) | ROADMAP | nenhum | Família G16/G17 — Customer Operations futuro. | DESCARTADO/DEFERIDO R4. |
| G53 | extração de métricas de vendas em Excel (MTD/YTD/YE) para reporting live | outros | Metis | ADAPT | nenhum | Capacidade-base "extração de métricas de planilha → reporting". Cabe em Metis. | Sub-bloco em `consolidacao-de-dados-de-vendas` (extração Excel + MTD/YTD/YE). |
| G54 | sales outreach B2B consultivo (prospecting, follow-up, objeção, pipeline) | outros | Emporos | ADAPT | (Emporos = sales, squad-semente) | Emporos é o squad de sales. Capacidade-base reusável (prospecting/follow-up/objection-handling/pipeline). | Estender Emporos com habilidade `sales-outreach-b2b-consultivo`. *Nota: bucket B06 Emporos detalha; aqui registra a sobreposição.* |
| G55 | Chief of Staff (filtro de ruído, processo, decisão, posicionamento de output) | business-strategy | Olimpo (Zeus) | ADAPT (habilidade transversal) | nenhum | Capacidade meta — não merece agente próprio. Vira habilidade do Zeus (CEO precisa de Chief of Staff lógico). | Criar habilidade `chief-of-staff-filtragem-e-escalonamento` em Zeus. |
| G56 | framework de filtragem escalate/handle/park por impacto no principal | business-strategy | Olimpo (Zeus) | ADAPT | nenhum | Técnica anexa a G55. | Sub-bloco em `chief-of-staff-filtragem-e-escalonamento` (matriz E/H/P). |
| G57 | engenharia civil/estrutural multi-padrão (Eurocode, ACI, AISC, GB, AS/NZS) | outros | — | DESCARTADO | nenhum | Engenharia civil/estrutural fora de escopo Kolden. | DESCARTADO com motivo "fora-de-escopo-Kolden". |
| G58 | estratégia de inteligência cultural (CQ) anti-exclusão invisível em software | outros | Caliope + Aglaia (habilidade transversal) | ADAPT (parcial) | nenhum | Capacidade-base "CQ + i18n + inclusion-by-design" é útil para Caliope (copy multi-cultura) e Aglaia (branding inclusivo). Prioridade média. | Criar habilidade transversal `inteligencia-cultural-e-inclusao` consumida por Caliope+Aglaia. |
| G59 | Developer Advocate (DevRel, conteúdo técnico, DX, adoção) | outros | Caliope (handoff Pheme) | ADAPT | nenhum (Caliope é copy genérico) | Kolden tem produto técnico (Caos, Hermes, squads); DevRel/conteúdo técnico é frente potencial. Caliope absorve como sub-especialização. | Criar habilidade `developer-advocacy-conteudo-tecnico` em Caliope. *Nota: detalhe em B02 Caliope+Pheme+Peitho.* |
| G60 | geração programática de documentos profissionais (PDF, PPTX, DOCX, XLSX) | outros | Dedalo (MCP transversal) | ADAPT | nenhum | Utilidade horizontal. Cabe como MCP/habilidade compartilhada (Dedalo é dono de MCPs internos). | Criar MCP `mcp-document-generator` em Dedalo (Anvil/skill-craftsman + Piper/mcp-integrator). Habilidade consumida por todos os squads. |
| G61 | navegação do mercado de consultoria francês (ESN/SI, portage, Malt) | business-strategy | — | DESCARTADO | nenhum | Ultra-nicho regional (FR consulting). | DESCARTADO com motivo "ultra-nicho-regional-FR-sem-base-reusavel". |
| G62 | navegação de cultura de negócios coreana (품의, nunchi, KakaoTalk, hierarquia) | business-strategy | — | DESCARTADO | nenhum | Ultra-nicho regional (KR business culture). | DESCARTADO com motivo "ultra-nicho-regional-KR-sem-base-reusavel". |
| G63 | construção de servidores MCP customizados (tools, resources, prompts) | outros | Dedalo | DESCARTADO | OVERLAP com `criacao-de-mcp` + Dedalo/mcp-integrator (Piper) | Dedalo já tem `mcp-integrator` (Piper) e Caos tem habilidade `criacao-de-mcp`. Absorver duplica. | DESCARTADO com motivo "overlap-Dedalo-mcp-integrator + Caos-criacao-de-mcp". |
| G64 | QA independente de modelos ML/estatísticos (replicação, calibração, interpretabilidade) | outros | Metis (handoff) ou Prometeu (model-qa) | ADAPT | nenhum | Capacidade nova relevante (model-QA: replicação, calibração, interpretabilidade). Cabe em Metis (analytics) ou Prometeu (QA de software). Recomendação: Metis (foco em modelos analíticos), com handoff Prometeu para modelos de produto. | Criar habilidade `qa-independente-de-modelos-ml` em Metis. |
| G65 | análise de pricing (market research, competidores, custo, willingness-to-pay) | business-strategy | Olimpo (Plutos) + Argos (handoff entrada) | ADAPT | `plutos` (decisão) + Argos (coleta) | Pricing é decisão estratégica do Plutos (CFO/precificação); coleta competitiva é Argos. Cabe direto. | Criar habilidade `analise-de-pricing-wtp` em Plutos (handoff Argos para market-data). |
| G66 | arquitetura de soluções Salesforce multi-cloud com governor-limits/CI-CD | outros | — | DESCARTADO | nenhum | Salesforce não é stack Kolden. | DESCARTADO com motivo "fora-de-stack-Kolden". |
| G67 | duelo de estratégia game-theory + 36 estratagemas chineses | outros | Themis (referência inerte) | DESCARTADO | nenhum | Educacional/entretenimento. Capacidade interessante mas sem demanda. Pode virar referência inerte em Themis. | DESCARTADO com nota "referência inerte em Themis/referencias/ se quiser preservar"; sem skill criada. |
| G68 | desenho de workflow-tree (happy/branches/falhas/recovery/handoff/estados) | outros | Dedalo (skill-craftsman/Anvil) | ADAPT | nenhum | Capacidade-base "workflow-tree explicit + decision-tree + build-spec" é útil para qualquer squad que desenha workflows complexos. Cabe em Dedalo. | Criar habilidade `desenho-de-workflow-tree` em Dedalo (skill-craftsman dono). |
| G69 | aconselhamento de study abroad para estudantes chineses (US/UK/CA/AU/EU/HK/SG) | outros | — | DESCARTADO | nenhum | Ultra-nicho B2C internacional. Fora de escopo Kolden. | DESCARTADO com motivo "ultra-nicho-B2C-internacional-fora-de-escopo". |
| G70 | estratégia de supply chain ancorada no ecossistema chinês (sourcing, QC, ERP) | business-strategy | Olimpo (Poseidon/COO) | ADAPT (capacidade-base) | `poseidon` | Capacidade-base "supply-chain strategy + sourcing + QC + ERP" é reusável; descartar contexto chinês. Cabe em Poseidon. | Criar habilidade `estrategia-de-supply-chain` em Poseidon (sourcing genérico + QC + ERP). |
| G71 | steward de base de conhecimento estilo Zettelkasten (notas atômicas + conectividade) | outros | Liceu | ADAPT | (Liceu = Biblioteca de Mentes) | Liceu já é biblioteca de mentes; Zettelkasten é metodologia complementar (notas atômicas + grafo). Cabe direto. | Criar habilidade `zettelkasten-steward` em Liceu. *Nota: detalhe em B11 Liceu.* |
| G72 | troca de perspectiva por domínio (Luhmann padrão; Feynman, Munger, Ogilvy) | outros | Liceu | ADAPT | nenhum | Técnica anexa a G71 (persona-switch cross-domain). | Sub-bloco em `zettelkasten-steward` (persona-switch — Luhmann/Feynman/Munger/Ogilvy). |

## Sumário por sub_dominio e decisão

| sub_dominio | REUSE | ADAPT | DESCARTADO | ROADMAP | Total IDs |
|---|---|---|---|---|---|
| accounts-payable | 0 | 2 | 0 | 0 | 2 |
| agentic-identity | 0 | 0 | 0 | 5 | 5 |
| automation-governance | 0 | 2 | 0 | 0 | 2 |
| business-strategy | 0 | 12 | 2 | 0 | 14 |
| finance-bespoke | 0 | 1 | 1 | 0 | 2 |
| healthcare | 0 | 0 | 3 | 1 | 4 |
| hospitality | 0 | 0 | 1 | 1 | 2 |
| hr | 1 | 5 | 0 | 1 | 7 |
| juridico | 0 | 2 | 3 | 0 | 5 (G37 conta como 1 ADAPT, G38 sub-bloco) |
| outros | 0 | 10 | 9 | 7 | 26 |
| real-estate | 0 | 0 | 1 | 0 | 1 |
| **TOTAL** | **1** | **34** | **20** | **15** | **72** |

> Validação anti-perda (F6.5): 1 REUSE + 34 ADAPT + 20 DESCARTADO + 15 ROADMAP = **70**.
> 2 IDs (G16 e G29) foram classificados como ROADMAP mas constam acima como "ROADMAP" no sub-domínio hospitality/outros — ver recontagem abaixo.

### Recontagem precisa (anti-perda)

Contagem por decisão final, célula a célula da tabela:

| Decisão | Quantidade |
|---|---|
| REUSE | 1 (G30) |
| ADAPT | 34 (G1, G2, G8, G9, G10, G11, G12, G13, G14, G15, G19, G20, G21, G22, G23, G37, G38, G40, G41, G42, G45, G46, G47, G50, G51, G53, G54, G55, G56, G58, G59, G60, G64, G65, G68, G70, G71, G72) |
| DESCARTADO | 22 (G6, G7, G24, G27, G28, G33, G34, G35, G36, G39, G43, G44, G48, G49, G57, G61, G62, G63, G66, G67, G69 + um a recontar) |
| ROADMAP | 15 (G3, G4, G5, G16, G17, G18, G25, G26, G29, G31, G32, G52 + 3 a recontar) |

Recontagem definitiva por ID (varredura linha a linha):

- **REUSE (1):** G30.
- **ADAPT (38):** G1, G2, G8, G9, G10, G11, G12, G13, G14, G15, G19, G20, G21, G22, G23, G37, G38, G40, G41, G42, G45, G46, G47, G50, G51, G53, G54, G55, G56, G58, G59, G60, G64, G65, G68, G70, G71, G72.
- **DESCARTADO (12):** G6, G7, G24, G27, G28, G33, G34, G35, G36, G39, G43, G44, G48, G49, G57, G61, G62, G63, G66, G67, G69 → recontagem detalhada: **21 DESCARTADOs diretos**.
- **ROADMAP (12):** G3, G4, G5, G16, G17, G18, G25, G26, G29, G31, G32, G52 → **12 ROADMAPs**.

Validação final: 1 + 38 + 21 + 12 = **72**. ✓

> Tabela-resumo corrigida:

| Decisão | Quantidade | IDs |
|---|---|---|
| REUSE | **1** | G30 |
| ADAPT | **38** | G1, G2, G8-G15, G19-G23, G37, G38, G40-G42, G45-G47, G50, G51, G53-G56, G58-G60, G64, G65, G68, G70-G72 |
| DESCARTADO | **21** | G6, G7, G24, G27, G28, G33-G36, G39, G43, G44, G48, G49, G57, G61-G63, G66, G67, G69 |
| ROADMAP | **12** | G3, G4, G5, G16-G18, G25, G26, G29, G31, G32, G52 |
| **TOTAL** | **72** | |

**Invariante F6.5 satisfeita:** `1 + 38 + 21 + 12 == 72`, `PERDIDO == 0`.

## Sumário por squad-alvo (destinos confirmados)

| Squad-alvo | Skills/MCPs ADAPT | Skills REUSE | Total IDs absorvidos | Observação |
|---|---|---|---|---|
| **Pactolo** | 2 (G1+G2 fundidas em 1 skill+sub-bloco) | 0 | 2 | AP automatizado entra como nova frente operacional do `controller`. |
| **Olimpo/Zeus (CEO)** | 8 skills/sub-blocos | 0 | 8 (G10, G11, G55, G56, G22, G23, G41, G42) | Reforça estratégia (entry/positioning, ESG, PMI, Chief-of-Staff). |
| **Olimpo/Plutos (CFO)** | 4 skills | 0 | 4 (G14, G65, parte G22/G41) | Aloc. capital, IR, pricing, disclosure ESG. |
| **Olimpo/Poseidon (COO)** | 2 skills | 0 | 4 (G45, G46, G70 + sub-blocos) | Lean/Six-Sigma + supply-chain. |
| **Hestia (RH)** | 4 skills + 1 reforço | 1 (G30) | 7 (G12, G13, G15, G30, G47, G50, e estender G47) | Mudança org, T&D, psych-org, full-cycle TA. |
| **Themis** | 2 skills | 0 | 4 (G20, G21, G37, G38) | DPO/LGPD + revisão-de-contrato. |
| **Dedalo** | 4 skills/MCPs | 0 | 5 (G8, G9, G40, G60, G68) | Governança automação, LSP, document-gen MCP, workflow-tree. |
| **Metis** | 3 skills | 0 | 4 (G19, G51, G53, G64) | Sales analytics + model-QA. |
| **Emporos (sales)** | 1 skill | 0 | 1 (G54) | *Detalhe em B06 Emporos+Pluto.* |
| **Caliope/Aglaia (transversal)** | 2 skills | 0 | 2 (G58, G59) | CQ-inclusão + DevRel. *Detalhe em B02.* |
| **Liceu** | 1 skill (2 sub-blocos) | 0 | 2 (G71, G72) | Zettelkasten + persona-switch. *Detalhe em B11.* |
| **TOTAL absorvido** | | | **39** (= 1 REUSE + 38 ADAPT) | |

## ROADMAP — capacidades deferidas (12 IDs)

| ID | capacidade | motivo do deferimento | prazo nominal | destino futuro recomendado |
|---|---|---|---|---|
| G3, G4, G5 | agentic-identity & trust (arquitetura A2A + atestação + reputation) | Capacidade crítica de longo prazo mas exige PRD próprio. Sem aplicação imediata. | R3 (2026-Q4 a 2027-Q1) | Decidir entre submódulo `Égide/agentic-identidade/` (afinidade temática segurança) OU squad novo `Mnemosine`. **Recomendação Caos: submódulo de Égide** — evita squad-novo sem demanda. |
| G31, G32 | identity-graph compartilhado + entity-resolution evidence-driven | Mesma família G3-G5. | R3 | Junto de G3-G5 no submódulo Égide ou squad novo. |
| G16, G17, G18, G52 | Customer Operations (CS humano, CSM, health-score, returns) | Squad de Customer Operations não existe. Demanda emergente quando Kolden tiver clientes recorrentes em escala. | R4 (2027) | Criar squad novo `Iris` ou `Eos` (mensageira/aurora) de **Customer Ops** quando a operação justificar. |
| G26 | atendimento HIPAA-compliant (patient support) | Squad de saúde (Asclepio) não existe. Omiron é projeto, não squad. | R3/R4 | Squad novo `Asclepio` quando linha de saúde justificar (Omiron escalando OU outro projeto de saúde entrando). |
| G29 | service-recovery hoteleira → review 5★ | Capacidade-base transversal mas baixa prioridade. | R4 | Habilidade transversal `service-recovery-para-review` no Iris/Eos OU em Caliope. |
| G25 | grant-writing (federal/foundation/corporate/research) | Sem cliente de impacto na carteira atual. | R4 | Habilidade em Caliope quando entrar vertical de impacto/ONG. |

> Total ROADMAP: **12 IDs** — tratados como DESCARTADO no schema F6.5 (com motivo "deferido R3/R4"), preservando a invariante `PERDIDO == 0`.

## DESCARTADO — capacidades fora de escopo (21 IDs)

| ID | capacidade | motivo |
|---|---|---|
| G6, G7 | agents-orchestrator + qa-loop | OVERLAP TOTAL com Prometeu/AIOX (constituição própria — fronteira clara, Caos não invade jurisdição AIOX). |
| G24 | gov ToG China pre-sales | ultra-nicho-regional-China-sem-base-reusavel. |
| G27 | healthcare marketing compliance China | ultra-nicho-regional-China-sem-base-reusavel. |
| G28 | hospitality guest services | fora-de-escopo-Kolden. |
| G33 | tradução EN↔ES | fora-de-escopo-Kolden-PT-BR-first. |
| G34, G35, G36 | legal billing + intake | operacao-de-escritorio-de-advocacia-fora-de-escopo. |
| G39 | loan officer assistant | operacao-de-originador-de-credito-fora-de-escopo. |
| G43, G44 | medical billing/coding US (ICD-10/CPT/HCPCS) | operacao-RCM-medico-US-fora-de-escopo. |
| G48 | personal growth coach | coaching-pessoal-B2C-fora-de-escopo. |
| G49 | real estate buyer/seller | fora-de-escopo-Kolden. |
| G57 | civil/structural engineering | fora-de-escopo-Kolden. |
| G61 | FR consulting market (ESN/SI/Malt) | ultra-nicho-regional-FR-sem-base-reusavel. |
| G62 | KR business culture (nunchi/품의) | ultra-nicho-regional-KR-sem-base-reusavel. |
| G63 | MCP server builder | OVERLAP com Dedalo/mcp-integrator + Caos/criacao-de-mcp. |
| G66 | Salesforce architect multi-cloud | fora-de-stack-Kolden. |
| G67 | strategy duel 36 stratagems | educacional/entretenimento sem demanda; nota como referência inerte. |
| G69 | study-abroad advisor (China-out) | ultra-nicho-B2C-internacional-fora-de-escopo. |

## Sub-buckets resolvidos (mapa final por sub_dominio)

### `accounts-payable` (2 IDs → Pactolo, 1 skill nova)
- Squad-alvo: **Pactolo** (controller).
- Skill nova: `processamento-de-contas-a-pagar` (com sub-bloco `roteamento-multi-rail-pagamentos`).

### `agentic-identity` (5 IDs → ROADMAP R3)
- Squad-alvo: **diferido** — recomendação: submódulo de Égide.
- Nada criado em F6.

### `automation-governance` (2 IDs → Dedalo, 1 skill nova)
- Squad-alvo: **Dedalo** (mcp-integrator/Piper).
- Skill nova: `governanca-de-automacao` (n8n-first + framework decisão).

### `business-strategy` (14 IDs → Olimpo, 6 skills novas, distribuídas)
- Zeus (CEO): `estrategia-de-entrada-e-posicionamento`, `chief-of-staff-filtragem-e-escalonamento`, `programa-esg-corporativo` (parceria Plutos), `integracao-pos-fusao-pmi` (parceria Plutos).
- Plutos (CFO): `alocacao-de-capital`, `investor-relations`, `analise-de-pricing-wtp` (handoff Argos).
- Poseidon (COO): `operacoes-lean-six-sigma`, `estrategia-de-supply-chain`.
- DESCARTADO: G24 (gov ToG China), G61 (FR consulting), G62 (KR business culture).

### `finance-bespoke` (2 IDs → 1 ADAPT Plutos, 1 DESCARTADO)
- G14 → Plutos (skills `alocacao-de-capital` + `investor-relations`).
- G39 → DESCARTADO.

### `healthcare` (4 IDs → 1 ROADMAP R3, 3 DESCARTADO)
- G26 → ROADMAP (squad Asclepio futuro).
- G27, G43, G44 → DESCARTADO.

### `hospitality` (2 IDs → ROADMAP)
- G28 → DESCARTADO (fora de escopo).
- G29 → ROADMAP R4 (skill transversal service-recovery).

### `hr` (7 IDs → Hestia, 1 REUSE + 4 skills novas)
- G30 → REUSE (`especialista-de-onboarding` existente).
- G12, G13 → skill `gestao-de-mudanca-organizacional` (HRBP).
- G15 → skill `design-de-treinamento-corporativo` (HRBP).
- G47 → skill `psicologia-organizacional-evidence-based` (analista-de-cultura).
- G50 → skill `recrutamento-full-cycle-com-assessment-estruturado` (recrutador-e-selecao).

### `juridico` (5 IDs → Themis 2 skills, 3 DESCARTADO)
- G20, G21 → skill `dpo-lgpd-conformidade` (Themis transversal).
- G37, G38 → skill `revisao-de-contrato-redline` (Themis).
- G34, G35, G36 → DESCARTADO.

### `outros` (26 IDs — catch-all resolvido)
- → **Dedalo**: G8, G9 (governanca-automacao), G40 (LSP), G60 (MCP doc-gen), G68 (workflow-tree).
- → **Metis**: G19, G51, G53 (sales analytics consolidados), G64 (model-QA).
- → **Liceu**: G71, G72 (Zettelkasten + persona-switch). *(detalhe em B11)*
- → **Caliope/Aglaia transversal**: G58 (CQ-inclusão), G59 (DevRel). *(detalhe em B02)*
- → **Emporos**: G54 (sales-outreach B2B). *(detalhe em B06)*
- → **ROADMAP R4 (Customer Ops futuro)**: G16, G17, G18, G52.
- → **ROADMAP R4 (impacto/ONG futuro)**: G25.
- → **DESCARTADO**: G6, G7 (Prometeu overlap), G33 (EN↔ES), G48 (coaching pessoal), G57 (civil eng), G63 (MCP-builder overlap), G66 (Salesforce), G67 (game-theory duel — nota inerte), G69 (study abroad).

### `real-estate` (1 ID → DESCARTADO)
- G49 → DESCARTADO.

## Achados (3 destaques)

1. **Catch-all "outros" (26 IDs) se distribui em 6 squads + 5 ROADMAPs sem perda.** Quando se sub-roteia caso-a-caso, o catch-all colapsa em destinos legítimos — Dedalo absorve a frente técnica horizontal (LSP, doc-gen, workflow-tree), Metis absorve sales analytics + model-QA, Liceu absorve Zettelkasten. O "outros" não é lixo; é resíduo que ainda não tinha rótulo. A regra "decida individualmente" do prompt evitou a perda silenciosa.

2. **ROADMAP é categoria limpa (12 IDs), não escape.** Três famílias justificam deferimento: (a) **agentic-identity** (5 IDs — capacidade real, mas exige PRD próprio e infra A2A que ainda não temos); (b) **Customer Operations** (4 IDs — squad novo `Iris/Eos` quando carteira justificar); (c) **healthcare/hospitality/grant** (3 IDs — verticais sem demanda). Todos têm prazo nominal (R3 ou R4) e destino futuro recomendado — não são "talvez um dia" vago.

3. **Olimpo é o maior beneficiário oculto do bucket B15.** O sub-domínio `business-strategy` (9 agentes upstream → 12 ADAPT) reforça os três executivos principais do Olimpo: Zeus ganha 4 skills (positioning, CoS, ESG, PMI), Plutos ganha 3 (capital allocation, IR, pricing), Poseidon ganha 2 (Lean/Six-Sigma, supply-chain). O B15 entrega **9 skills novas ao Olimpo** — material denso e diretamente acoplado aos cargos. Trade-off: o Olimpo já é o squad mais carregado conceitualmente; o B15 amplia ainda mais a superfície do CLAUDE.md de cada deus. F6 deve cuidar para que as habilidades sejam descobertas pelo `roster:` correto (gate 5.2 da cascata) e não fiquem órfãs.
