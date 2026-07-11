---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/alirezarezvani--claude-skills/inventario-de-capacidades|inventario-de-capacidades]]"
  - "[[Caos/registros/absorcao/alirezarezvani--claude-skills/seguranca|seguranca]]"
---

# Mapa de decisão (F4) — alirezarezvani--claude-skills

- **slug:** alirezarezvani--claude-skills · **sha:** 4a3c05b69e64f4925f7fc65c88890f614f79caf0 · **rota:** A
- **Viés (missão autônoma):** sem match limpo → **ADAPT/CREATE**, nunca REUSE sem prova item-a-item.
- **Sinal de duplicata:** este é um repo "guarda-chuva" de 346 skills; vários clusters provavelmente
  colidem com outros repos deste lote 2026-06-26 (marcados ⚠️DUP abaixo). A deduplicação fina é da
  fase de aplicação — aqui só sinalizo.

| ID | decisao | squad-alvo | justificativa(1 linha) |
|---|---|---|---|
| G1 | ADAPT | caliope (+orfeu) | Copy/conteúdo é o core do Caliope; content-humanizer/marketing-psychology entram como skills novas. ⚠️DUP com blader--humanizer e coreyhaines (já absorvido na Ariadne). |
| G2 | ADAPT | ariadne | SEO/AEO é exatamente o eixo SEO da Ariadne; aeo/schema-markup/programmatic-seo agregam. ⚠️DUP provável com coreyhaines/marketingskills. |
| G3 | ADAPT | ariadne | CRO é o segundo eixo da Ariadne; page/form/onboarding-cro + ab-test reforçam o playbook de conversão. |
| G4 | ADAPT | peitho | Tráfego pago/ad-creative/campaign-analytics são o domínio do Peitho. |
| G5 | ADAPT | pheme | Social/X-Twitter/YouTube é o domínio do Pheme (meta marca Kolden +100k). |
| G6 | ADAPT | pluto (+peitho) | Growth/launch/referral/churn ligam a ofertas (Pluto) e aquisição (Peitho). |
| G7 | ADAPT | pluto | Pricing/PMM/posicionamento é eixo de ofertas do Pluto. |
| G8 | ADAPT | dedalo (+caos-fabrica) | Autoria de agentes/skills/MCP/workflow Claude Code = Dedalo; skill-tester/skill-security-auditor/write-a-skill interessam direto ao Caos como meta-fábrica. Alto valor. |
| G9 | ADAPT | prometeu (+dedalo) | DevOps/IaC/cloud/SLO/observability é engenharia spec-driven do Prometeu. |
| G10 | ADAPT | prometeu | Code-review/testes/TDD/playwright/a11y reforçam o qa-loop do Prometeu. ⚠️DUP parcial com affaan-m--everything-claude-code. |
| G11 | ADAPT | metis (+prometeu) | DB/SQL/RAG/estatística/data-quality → analytics (Metis); ML/LLM-cost → Prometeu. |
| G12 | ADAPT | egide | AppSec/pentest/red-team/segredos/threat-detection é o núcleo do Egide (segurança). Alto valor. |
| G13 | ADAPT | prometeu (+dedalo) | Personas sênior (backend/frontend/devops/qa…) viram especialistas de engenharia. ⚠️DUP com squads de eng já importados. |
| G14 | ADAPT | olimpo | Conselheiros C-level mapeiam 1:1 nos 8 deuses do Olimpo (CEO/COO/CMO/CTO/CIO/CAIO/CFO/CRO); c-level-agents(boardroom/decide/cross-eval) reforçam a orquestração do Zeus. Alto valor estratégico. |
| G15 | ADAPT | aletheia (+harmonia) | Discovery/PM/experiment-designer/competitive-teardown → Aletheia; ux-researcher/ui-design-system/apple-hig → Harmonia (UX/UI). |
| G16 | CREATE | (novo squad PMO) / referencias | Kolden não tem squad de gestão de projetos; jira/confluence/scrum viram squad novo ou referência inerte. Sem match. |
| G17 | CREATE | (novo squad Compliance) / egide-parcial | 27 skills de GDPR/ISO/SOC2/FDA/EU-AI-Act — Kolden não tem squad de compliance regulatório; valioso, candidato a squad próprio (parte AppSec → Egide). Sem match limpo. |
| G18 | ADAPT | pluto (CFO) / olimpo | Finanças/SaaS-metrics/FP&A ligam a Plutos (CFO no Olimpo) e a ofertas (Pluto). |
| G19 | ADAPT | pluto (+olimpo/Afrodite-CRO) | Comercial/deal-desk/RFP/RevOps/CS → ofertas+receita (Pluto) e CRO executivo (Afrodite/Olimpo). |
| G20 | CREATE | (novo squad BizOps) / olimpo-Poseidon | Ops/processos/procurement/vendor — sem squad; mapeia ao COO (Poseidon) ou squad novo. Sem match. |
| G21 | ADAPT | argos | Dossier/litreview/market-research/patent/notebooklm reforçam o Argos (pesquisa). |
| G22 | REFERENCIA | referencias | Produtividade pessoal (GTD/inbox/handoff/andreessen) — genérico, sem dono de squad; arquivo inerte. |
| G23 | ADAPT | aglaia (+harmonia) | Markdown→HTML/design-system/slides/deck → branding/apresentação (Aglaia) e UI (Harmonia). ⚠️DUP com nextlevelbuilder--ui-ux-pro-max (slides/design-system já em staging). |
| G24 | REFERENCIA | referencias (+caos-fabrica) | Padrão de autoria de skill/pipeline/convenções — meta-conhecimento; vira referência consultável pelo Caos, não skill de domínio. |

## Resumo de decisões
- **ADAPT:** G1–G15, G18, G19, G21, G23 (18 clusters) — distribuídos por 12 squads existentes.
- **CREATE:** G16 (PMO), G17 (Compliance regulatório), G20 (BizOps) — 3 lacunas reais sem squad Kolden.
- **REFERENCIA:** G22 (produtividade), G24 (meta-autoria) — inerte.
- **REUSE:** nenhum (nenhum match item-a-item provado; coletânea sempre agrega).
- **Decisão dominante:** **ADAPT** (com 3 CREATE de lacuna e forte sinal de duplicata cruzada no lote).
