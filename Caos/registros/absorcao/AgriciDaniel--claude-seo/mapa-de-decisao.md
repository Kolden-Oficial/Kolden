# F4 — Mapa de decisão — AgriciDaniel--claude-seo

- **slug:** AgriciDaniel--claude-seo · **sha:** d830cdb2ad339bb7f062339fe82228b072e98061 · **rota:** A

## Comparação item-a-item com o squad Ariadne (SEO+CRO)

Ariadne já cobre, por especialista: SEO técnico (`auditor-tecnico-seo`), arquitetura/siloing/clusters (`arquiteto-de-site`), schema JSON-LD (`engenheiro-de-schema`), conteúdo on-page+programático+E-E-A-T (`estrategista-de-conteudo-seo`), AEO/GEO/LLMO (`otimizador-ai-seo`), CRO de página em 7 dimensões (`analista-de-cro`), CRO de formulário (`otimizador-de-formulario`); backlinks/keywords/SERP são **handoff de entrada do Argos** (Ariadne não coleta).

**Veredito da comparação:** Ariadne tem o **esqueleto** das frentes nucleares, mas em **prosa pt-BR sem os métodos profundos, o tooling executável nem as frentes laterais** do claude-seo. Em nenhum item há equivalência ≥0.90 (nem o orquestrador: o routing do claude-seo cobre frentes que a Ariadne não tem). Logo, **0 REUSE** — conforme o viés da missão, tudo que não é match limpo vira ADAPT/CREATE. O claude-seo é, na prática, o **benchmark-ouro** que a Ariadne deveria absorver (a fase F5/`auditoria-de-squad` deve usá-lo como benchmark).

| ID | decisao | squad-alvo | justificativa(1 linha) |
|---|---|---|---|
| G1 | ADAPT | ariadne | enriquece a tabela de roteamento/regras do `ariadne-chief` com as frentes que faltam |
| G2 | ADAPT | ariadne | padrão de auditoria com até 15 subagentes em paralelo — novo no `auditor-tecnico-seo` |
| G3 | ADAPT | ariadne | análise profunda de página única reforça o `auditor-tecnico-seo` |
| G4 | ADAPT | ariadne | aprofunda o `auditor-tecnico-seo` para 9 categorias técnicas |
| G5 | ADAPT | ariadne | E-E-A-T/thin-content para o `estrategista-de-conteudo-seo` |
| G6 | ADAPT | ariadne | brief de conteúdo (outline+links) para o `estrategista-de-conteudo-seo` |
| G7 | ADAPT | ariadne | geração/validação Rich Results para o `engenheiro-de-schema` |
| G8 | ADAPT | ariadne | análise/geração de sitemap XML para o `auditor-tecnico-seo` |
| G9 | ADAPT | ariadne | **nova frente**: SEO de imagens (não há especialista de imagem na Ariadne) |
| G10 | ADAPT | ariadne | GEO/AI Overviews para o `otimizador-ai-seo` |
| G11 | ADAPT | ariadne | **nova frente**: SEO local (GBP/citações/reviews) — `pontosDeExtensao` já previa especialista local |
| G12 | ADAPT | ariadne | **nova frente**: inteligência de mapas (geo-grid) — par do SEO local |
| G13 | ADAPT | ariadne | planejamento estratégico por indústria (6 perfis) para o `ariadne-chief`/estrategista |
| G14 | ADAPT | ariadne | templates + guarda anti-thin reforçam o programático do `estrategista-de-conteudo-seo` |
| G15 | ADAPT | ariadne | páginas de comparação de concorrentes (insumo de concorrência via Argos) |
| G16 | ADAPT | ariadne | **nova frente**: hreflang/internacional + perfis culturais — `pontosDeExtensao` previa |
| G17 | ADAPT | ariadne | skill de APIs Google (GSC/PSI/CrUX/Indexing/GA4) — `pontosDeExtensao` "GSC avançado" |
| G18 | ADAPT | argos | backlinks (Moz/Bing/CC) é **coleta** → pertence ao Argos, não à Ariadne (handoff) |
| G19 | ADAPT | ariadne | metodologia de cluster por SERP-overlap reforça o `arquiteto-de-site` |
| G20 | ADAPT | ariadne | SXO (ponte SEO+CRO) — entre `analista-de-cro` e `arquiteto-de-site` |
| G21 | ADAPT | ariadne | **nova frente**: monitoramento de drift de SEO (17 regras) |
| G22 | ADAPT | ariadne | **nova frente**: e-commerce SEO (product schema/marketplace/UCP) |
| G23 | ADAPT | ariadne | framework FLOW (busca+conversão) — metodologia para o `ariadne-chief` (CC BY 4.0, atribuir) |
| G24 | ADAPT | ariadne | provisionar DataForSEO como fonte de dados ao vivo — `pontosDeExtensao` |
| G25 | ADAPT | aglaia | geração de imagem IA é criação visual (squad de branding), via vendor Banana |
| G26 | ADAPT | ariadne | materializar a frota de 18 subagentes como especialistas + padrão de execução paralela |
| G27 | ADAPT | egide | módulo SSRF/DNS-pinning é padrão de **segurança** cross-cutting — alto valor para o Egide |
| G28 | ADAPT | ariadne | gestão de credenciais Google — reescrever sobre **Infisical** (camada Kolden obrigatória) |
| G29 | ADAPT | argos | engine de backlinks (verificação de existência, CC PageRank) é coleta → Argos |
| G30 | ADAPT | ariadne | tooling de Core Web Vitals (PSI/CrUX/LCP subparts) para o `auditor-tecnico-seo` |
| G31 | ADAPT | ariadne | tooling GSC + Indexing/IndexNow para o `auditor-tecnico-seo` |
| G32 | ADAPT | ariadne | APIs de dados Google — **split**: GA4→metis, keyword-planner→argos, NLP→conteúdo/ariadne |
| G33 | ADAPT | ariadne | gerador de relatório PDF/HTML (entrega) — reusar como saída padrão da Ariadne |
| G34 | ADAPT | ariadne | engine de drift (baseline SQLite + diff por regras) — par do G21 |
| G35 | ADAPT | ariadne | pipeline de fetch/render SPA-aware para o `auditor-tecnico-seo` |
| G36 | ADAPT | ariadne | qualidade/humanização/citation-gap pré-copy (copy final é handoff Caliope) |
| G37 | ADAPT | ariadne | geração/validação de schema executável para o `engenheiro-de-schema` |
| G38 | ADAPT | ariadne | scanners de risco/lint (parasite, GBP, IPTC, UCP) para o `auditor-tecnico-seo` |
| G39 | ADAPT | ariadne | wrappers de tooling externo (Unlighthouse/DataForSEO/FLOW-sync) — tooling do squad |
| G40 | ADAPT | ariadne | reflexo PostToolUse de validação de schema — guardrail útil do squad |
| G41 | ADAPT | ariadne | biblioteca de referência SEO core (E-E-A-T/CWV/quality-gates) para `data/` da Ariadne |
| G42 | ADAPT | ariadne | referências de APIs Google (rate-limits/quotas) para `data/` da Ariadne |
| G43 | ADAPT | ariadne | biblioteca de prompts FLOW (~40) — reescrever pt-BR com atribuição CC BY 4.0 |
| G44 | ADAPT | ariadne | tipos de schema depreciados 2024-2026 para o `engenheiro-de-schema` |
| G45 | ADAPT | ariadne | referências de hreflang/perfis culturais (par do G16) |
| G46 | ADAPT | ariadne | referências de SXO (personas/wireframes) — par do G20 |
| G47 | ADAPT | ariadne | referências GEO/ecommerce/cluster (llms.txt, marketplace, serp-overlap) |
| G48 | ADAPT | ariadne | base de updates Google — `data/` da Ariadne (e insumo do vigia do Caos) |
| G49 | CREATE | vendor | 8 extensões MCP/CLI (Ahrefs/DataForSEO/Firecrawl/Profound/SE Ranking/Unlighthouse/Banana/Bing) — vendor inerte, credenciais no Infisical |

**Resumo:** ADAPT domina (45 IDs → ariadne na esmagadora maioria; argos para backlinks G18/G29; egide para o hardening SSRF G27; aglaia para image-gen G25; splits pontuais metis/argos no G32). 1 CREATE (vendor, G49). **0 REUSE** — confirmando que a Ariadne é coberta no esqueleto mas superada em profundidade/extensão por este repo. Recomendação para F5: rodar `auditoria-de-squad` com **benchmark = este repo** sobre a Ariadne.
