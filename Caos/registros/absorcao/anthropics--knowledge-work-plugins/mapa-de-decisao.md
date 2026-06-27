# Mapa de decisão (F4) — anthropics--knowledge-work-plugins

Viés autônomo: sem match item-a-item provado, prefere-se ADAPT/CREATE a REUSE.
Nenhuma capacidade Kolden equivalente foi encontrada no nível necessário para REUSE limpo, logo **0 REUSE**.

| ID | decisao | squad-alvo | justificativa(1 linha) |
|----|---------|------------|------------------------|
| G1 | CREATE | referencias | Gestão de tarefas/calendário/memória pessoal — nenhum squad Kolden cobre assistente de produtividade pessoal; guardar como referência de padrão "memory + daily workflow". |
| G2 | ADAPT | argos | Argos é pesquisa; absorver técnicas de busca cross-tool, search-strategy e knowledge-synthesis como skills novas de recuperação interna. |
| G3 | ADAPT | caos-fabrica | "Criar/customizar plugins" é exatamente o métier do Caos; absorver o método de plugin-customizer/MCP-config como referência de fábrica. |
| G4 | CREATE | (novo squad vendas) | Prospecção/call-prep/forecast/battlecard — Kolden não tem squad de vendas; candidato a squad próprio (overlap parcial com Pluto/ofertas). |
| G5 | CREATE | (novo squad finanças) | Contabilidade/close/SOX/auditoria — Pluto cobre ofertas/pricing, não escrituração; domínio ausente, criar squad. |
| G6 | ADAPT | metis | Metis é analytics; absorver write-query/explore-data/statistical-analysis/validate-data/build-dashboard como skills de dados. |
| G7 | CREATE | (novo squad jurídico) | Revisão de contrato/NDA/compliance — Egide é segurança, não jurídico; domínio ausente, criar squad. |
| G8 | ADAPT | caliope/aglaia/ariadne/peitho | Bundle de marketing mapeado skill-a-skill em G23–G30 (núcleo do negócio Kolden). |
| G9 | CREATE | (novo squad suporte) | Triagem de ticket/KB/escalonamento — sem squad de CS; domínio ausente. |
| G10 | ADAPT | aletheia | Aletheia é discovery/validação; absorver synthesize-research e product-brainstorming; specs/roadmap/sprint como skills novas (resto = CREATE parcial). |
| G11 | CREATE | referencias | Bioinformática (scrna/nextflow/genômica) — fora do escopo Kolden; arquivar como referência inerte, scripts py NÃO absorvíveis. |
| G12 | ADAPT | prometeu/dedalo | Code-review/architecture/system-design/incident/testing — absorver para a eng de agentes (Prometeu spec-driven + Dedalo) como skills de engenharia. |
| G13 | CREATE | (novo squad RH) | Recrutamento/onboarding/comp-analysis/performance — domínio ausente; criar squad. |
| G14 | ADAPT | harmonia | Harmonia é UX/UI; absorver design-critique/design-system/ux-copy/accessibility/dev-handoff como skills; ux-copy também alimenta Caliope. |
| G15 | CREATE | (novo squad operações) | Vendor/process-doc/change-mgmt/runbook/capacity — domínio operacional ausente; criar squad. |
| G16 | CREATE | referencias | Bundle de ~30 workflows SMB — útil como biblioteca de workflows/orquestração; arquivar e cherry-pick por workflow depois. |
| G17 | ADAPT | vendor | Utilitário de PDF (view/annotate/fill/sign) — capacidade de ferramenta; registrar como vendor/ferramenta inerte. |
| G18 | ADAPT | vendor | Conector Slack (MCP HTTP) — ferramenta inerte; re-apontar `.mcp.json` à stack interna antes de uso. |
| G19 | ADAPT | vendor | Conector Apollo.io (MCP) — ferramenta de prospecção; vendor inerte. |
| G20 | ADAPT | vendor | Conector Common Room (MCP) — ferramenta GTM; vendor inerte. |
| G21 | ADAPT | aglaia | Brand-voice (descobrir/forçar/validar voz de marca) + 5 agents = forte aderência ao squad de branding Aglaia; absorver método e padrão de agentes. |
| G22 | ADAPT | vendor | Conector/dev-kit Zoom (MCP+SDK) — ferramenta inerte; vendor. |
| G23 | ADAPT | caliope | Content-creation multicanal (templates blog/social/email/LP/PR) = skill de copy direto p/ Caliope. |
| G24 | ADAPT | caliope | Draft-content — execução rápida de peças; skill de copy p/ Caliope. |
| G25 | ADAPT | caliope | Email-sequence — nurture/lançamento; skill de e-mail p/ Caliope (overlap Pluto em ofertas). |
| G26 | ADAPT | aglaia | Brand-review — checagem de aderência à marca; skill p/ Aglaia (complementa G21). |
| G27 | ADAPT | ariadne | SEO-audit — auditoria on-page/keywords; skill direta p/ Ariadne (SEO/CRO). |
| G28 | ADAPT | peitho | Campaign-plan — planejamento multicanal; skill p/ Peitho (tráfego/campanhas). |
| G29 | ADAPT | argos | Competitive-brief — inteligência competitiva; skill p/ Argos (pesquisa). |
| G30 | ADAPT | metis | Performance-report — métricas/atribuição por canal; skill p/ Metis (analytics). |

## Síntese
- **REUSE:** 0 · **ADAPT:** 19 · **CREATE:** 11 (sendo 3 = referencias/arquivo inerte: G1, G11, G16).
- **Decisão dominante: MISTA** (ADAPT majoritário). Os ganhos mais limpos para a Kolden estão no bloco de marketing (G23–G30 → caliope/aglaia/ariadne/peitho/argos/metis), em brand-voice (G21 → aglaia), data (G6 → metis), design (G14 → harmonia) e engenharia (G12 → prometeu/dedalo).
- **Domínios sem squad (candidatos a CREATE de squad novo):** vendas (G4), finanças/contabilidade (G5), jurídico (G7), suporte ao cliente (G9), RH (G13), operações (G15).
- **Conectores partner-built** (G18–G20, G22) e pdf-viewer (G17): tratar como vendor inerte; `.mcp.json` deve ser re-apontado à stack Kolden (soberania de dados) antes de qualquer uso.
