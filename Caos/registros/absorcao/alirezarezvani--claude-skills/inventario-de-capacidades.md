---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/alirezarezvani--claude-skills/mapa-de-decisao|mapa-de-decisao]]"
  - "[[Caos/registros/absorcao/alirezarezvani--claude-skills/seguranca|seguranca]]"
---

# Inventário de capacidades (F3) — alirezarezvani--claude-skills

- **slug:** alirezarezvani--claude-skills · **sha:** 4a3c05b69e64f4925f7fc65c88890f614f79caf0 · **rota:** A
- **Total:** ~346 skills canônicas em 17 domínios + ~579 tools Python + ~700 docs de referência.
- **Método:** por ser coletânea heterogênea, o inventário é **por CLUSTER de domínio** (não 1 ID/skill).
  Cada cluster lista skills representativas + contagem aproximada. Espelhos `.gemini/.codex/.hermes/.vibe`
  NÃO entram (são redistribuições das mesmas skills canônicas).

| ID | capacidade (cluster) | tipo | keywords | dominio | fonte(arquivo:linha) |
|---|---|---|---|---|---|
| G1 | Marketing — Conteúdo & Copy (~10): content-creator, content-humanizer, content-production, content-strategy, copywriting, copy-editing, marketing-psychology, marketing-ideas, brand-guidelines | skill | copy, conteúdo, humanizar, persuasão | marketing/copy | marketing-skill/skills/copywriting/SKILL.md (+9) |
| G2 | Marketing — SEO & AEO (~6): aeo, seo-audit, programmatic-seo, schema-markup, site-architecture, app-store-optimization | skill+codigo | seo, aeo, schema, sitemap, aso | seo | marketing-skill/skills/aeo/SKILL.md (+5) |
| G3 | Marketing — CRO (~7): form-cro, page-cro, onboarding-cro, paywall-upgrade-cro, popup-cro, signup-flow-cro, ab-test-setup | skill+codigo | cro, conversão, teste a/b, funil | cro | marketing-skill/skills/page-cro/SKILL.md (+6) |
| G4 | Marketing — Tráfego pago & Email (~6): paid-ads, ad-creative, campaign-analytics, analytics-tracking, cold-email, email-sequence | skill | ads, mídia paga, campanha, cold-email | trafego | marketing-skill/skills/paid-ads/SKILL.md (+5) |
| G5 | Marketing — Social & X/Twitter (~5): social-content, social-media-manager, social-media-analyzer, x-twitter-growth, video-content-strategist, youtube-full | skill | social, twitter, youtube, vídeo | social | marketing-skill/skills/social-media-manager/SKILL.md (+5) |
| G6 | Marketing — Growth/Lifecycle (~6): churn-prevention, referral-program, free-tool-strategy, launch-strategy, webinar-marketing, marketing-demand-acquisition | skill | churn, referral, launch, aquisição | growth | marketing-skill/skills/launch-strategy/SKILL.md (+5) |
| G7 | Marketing — Pricing & Estratégia (~5): pricing-strategy, marketing-strategy-pmm, competitor-alternatives, marketing-ops, marketing-context | skill | pricing, pmm, posicionamento | estrategia-mkt | marketing-skill/skills/pricing-strategy/SKILL.md (+4) |
| G8 | Eng — Claude Code / autoria de agentes & skills (~14): agent-designer, agent-workflow-designer, write-a-skill, workflow-builder, skill-tester, skill-security-auditor, mcp-server-builder, spec-driven-workflow, prompt-governance, claude-coach, agenthub(8), self-improving-agent(6), autoresearch-agent(6) | skill+codigo+metodo-prompt | claude-code, skill, mcp, agente, workflow | eng-agentes | engineering/agent-designer/SKILL.md; engineering/skills/mcp-server-builder/SKILL.md (+12) |
| G9 | Eng — DevOps/Cloud/IaC (~12): kubernetes-operator, helm-chart-builder, terraform-patterns, docker-development, ci-cd-pipeline-builder, aws/azure/gcp-cloud-architect, slo-architect, observability-designer, feature-flags-architect, chaos-engineering, runbook-generator | skill+codigo | k8s, terraform, docker, ci/cd, cloud, slo | devops | engineering/kubernetes-operator/SKILL.md; engineering-team/skills/aws-solution-architect/SKILL.md (+10) |
| G10 | Eng — Qualidade/Review/Testes (~11): pr-review-expert, api-design-reviewer, api-test-suite-builder, code-reviewer, tdd-guide, adversarial-reviewer, ship-gate, playwright-pro(10), a11y-audit, performance-profiler, tech-debt-tracker, focused-fix | skill+codigo | code-review, testes, tdd, playwright, a11y | qa-eng | engineering/skills/pr-review-expert/SKILL.md; engineering-team/playwright-pro/SKILL.md (+9) |
| G11 | Eng — Dados/DB/ML/LLM (~10): database-designer, database-schema-designer, sql-database-assistant, rag-architect, statistical-analyst, data-quality-auditor, snowflake-development, senior-data-engineer/scientist, senior-ml-engineer, llm-cost-optimizer, llm-wiki | skill+codigo | banco, sql, rag, ml, estatística, llm-custo | dados-ml | engineering/skills/rag-architect/SKILL.md (+9) |
| G12 | Eng — Segurança/AppSec (~10): ai-security, cloud-security, red-team, security-pen-testing, threat-detection, security-guidance, secrets-vault-manager, env-secrets-manager, dependency-auditor, senior-secops/security | skill+codigo+reflexo | appsec, pentest, red-team, segredos, ameaças | seguranca | engineering-team/skills/red-team/SKILL.md; engineering/skills/secrets-vault-manager/SKILL.md (+8) |
| G13 | Eng — Personas sênior (~14): senior-architect/backend/frontend/fullstack/devops/qa/prompt-engineer/secops/security/ml-engineer/data-*/computer-vision | agente | engenheiro sênior, persona técnica | eng-personas | engineering-team/skills/senior-architect/SKILL.md (+13) |
| G14 | C-level — Conselheiros executivos (~66): ceo/cfo/cmo/coo/cto/ciso/cpo/cro/chro/caio/cco/cdo/gc/vpe-advisor, board-deck-builder, board-meeting, c-level-agents(22), executive-mentor(6), founder-coach, scenario-war-room, strategic-alignment, ma-playbook, org-health-diagnostic, intl-expansion | agente+skill | ceo, cfo, board, executivo, estratégia | c-level | c-level-advisor/skills/ceo-advisor/SKILL.md; c-level-advisor/c-level-agents/* (+64) |
| G15 | Produto — Discovery/PM/UX (~17): product-manager-toolkit, product-strategist, product-discovery, product-analytics, roadmap-communicator, experiment-designer, ux-researcher-designer, ui-design-system, apple-hig-expert, landing-page-generator, saas-scaffolder, spec-to-repo, code-to-prd, competitive-teardown, agile-product-owner, research-summarizer | skill+agente | produto, pm, discovery, ux, prd, roadmap | produto | product-team/skills/product-discovery/SKILL.md (+16) |
| G16 | Gestão de projetos (~9): jira-expert, confluence-expert, atlassian-admin, atlassian-templates, scrum-master, senior-pm, pm-skills, meeting-analyzer, team-communications | skill | jira, confluence, scrum, pmo, reunião | pmo | project-management/skills/jira-expert/SKILL.md (+8) |
| G17 | Regulatório/QMS & Compliance (~27): ra-qm-team(18: gdpr-dsgvo, iso13485/qms, iso27001/isms, iso42001, soc2, eu-ai-act, fda, mdr-745, capa, risk-management, regulatory-affairs-head) + compliance-os(9: ai-act-readiness, aims-audit, gdpr/iso13485/iso27001/soc2/fda-audit-prep) | skill+codigo | gdpr, iso, soc2, fda, eu-ai-act, auditoria-regulatória | compliance | ra-qm-team/skills/gdpr-dsgvo-expert/SKILL.md; compliance-os/skills/* (+25) |
| G18 | Finanças (~4): financial-analyst, saas-metrics-coach, business-investment-advisor, finance-skills | skill+codigo | finanças, saas-metrics, investimento, fp&a | financas | finance/skills/financial-analyst/SKILL.md (+3) |
| G19 | Comercial/Vendas/RevOps (~13): deal-desk, pricing-strategist, partnerships-architect, rfp-responder, channel-economics, commercial-forecaster, commercial-policy, contract-and-proposal-writer, sales-engineer, customer-success-manager, revenue-operations, business-growth-skills | skill | vendas, deal-desk, rfp, parcerias, revops, cs | comercial | commercial/skills/deal-desk/SKILL.md; business-growth/skills/* (+11) |
| G20 | Operações de negócio (~7): capacity-planner, process-mapper, procurement-optimizer, vendor-management, knowledge-ops, internal-comms, business-operations-skills | skill | ops, processos, procurement, vendor, kb | bizops | business-operations/skills/process-mapper/SKILL.md (+6) |
| G21 | Pesquisa (~12): dossier, grants, litreview, notebooklm, patent, pulse, research, syllabus + research-ops(clinical/market/product/research-finance) | skill+codigo | pesquisa, dossiê, literatura, patente, mercado | pesquisa | research/research/SKILL.md; research-ops/skills/market-research/SKILL.md (+10) |
| G22 | Produtividade pessoal (~6): andreessen, capture, reflect, handoff, email(inbox-setup/triage) | skill+metodo-prompt | gtd, captura, handoff, inbox, reflexão | produtividade | productivity/capture/SKILL.md (+5) |
| G23 | Markdown → HTML interativo (~5): markdown-html-orchestrator, design-system, md-document, md-review, md-slides | skill+codigo | markdown, html, slides, design-system, deck | doc-render | markdown-html/skills/markdown-html-orchestrator/SKILL.md (+4) |
| G24 | Padrões meta de autoria de skills (docs, não-skills): SKILL-AUTHORING-STANDARD.md, SKILL_PIPELINE.md, CONVENTIONS.md, standards/ | referencia+metodo-prompt | padrão de skill, frontmatter, pipeline, convenções | meta-autoria | SKILL-AUTHORING-STANDARD.md; SKILL_PIPELINE.md; standards/ |

> Nota de granularidade: cada cluster G1–G23 contém de 4 a 66 skills individuais (cada uma com
> `SKILL.md` + tools Python + `references/`). Na fase de aplicação, expandir o cluster aprovado em
> skills individuais. G24 é meta-conhecimento (como escrever skills), não capacidade de domínio.
