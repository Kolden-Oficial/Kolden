---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/AgriciDaniel--claude-seo/mapa-de-decisao|mapa-de-decisao]]"
  - "[[Caos/registros/absorcao/AgriciDaniel--claude-seo/seguranca|seguranca]]"
---

# F3 — Inventário de capacidades — AgriciDaniel--claude-seo

- **slug:** AgriciDaniel--claude-seo · **sha:** d830cdb2ad339bb7f062339fe82228b072e98061 · **rota:** A
- Plugin Claude Code de SEO: **25 sub-skills + 18 sub-agentes + ~50 scripts Python + bibliotecas de referência + 8 extensões (vendor)**.

| ID | capacidade | tipo | keywords | dominio | fonte(arquivo:linha) |
|---|---|---|---|---|---|
| G1 | Orquestrador SEO (tabela de roteamento, regras centrais, disclosure progressivo) | skill | orquestrador, roteamento, seo | seo | skills/seo/SKILL.md |
| G2 | Auditoria de site completa com até 15 subagentes em paralelo | skill | site-audit, parallel, auditoria | seo-tecnico | skills/seo-audit/SKILL.md |
| G3 | Análise profunda de página única | skill | page-analysis, on-page | seo-tecnico | skills/seo-page/SKILL.md |
| G4 | SEO técnico em 9 categorias (crawl, index, security) | skill | technical-seo, crawl, index | seo-tecnico | skills/seo-technical/SKILL.md |
| G5 | Qualidade de conteúdo + E-E-A-T | skill | e-e-a-t, content-quality, thin | conteudo-seo | skills/seo-content/SKILL.md |
| G6 | Brief de conteúdo SEO (keywords, outline, links internos) | skill | content-brief, outline, keyword-density | conteudo-seo | skills/seo-content-brief/SKILL.md |
| G7 | Detecção/validação/geração de schema JSON-LD | skill | schema, json-ld, rich-results | schema | skills/seo-schema/SKILL.md |
| G8 | Análise/geração de sitemap XML | skill | sitemap, xml | seo-tecnico | skills/seo-sitemap/SKILL.md |
| G9 | Otimização de imagens (on-page + SERP + arquivo) | skill | image-seo, alt, serp-images | imagens-seo | skills/seo-images/SKILL.md |
| G10 | GEO / AI Search Optimization (ser citado por LLM/AI Overviews) | skill | geo, aeo, llmo, ai-overviews | ai-seo | skills/seo-geo/SKILL.md |
| G11 | SEO local (GBP, citações, reviews, map pack) | skill | local-seo, gbp, nap, map-pack | seo-local | skills/seo-local/SKILL.md |
| G12 | Inteligência de mapas (geo-grid, GBP audit, reviews, concorrentes por raio) | skill | maps, geo-grid, gbp-audit | seo-local | skills/seo-maps/SKILL.md |
| G13 | Planejamento estratégico de SEO por indústria (6 perfis) | skill | seo-plan, strategy, saas, ecommerce, publisher | estrategia-seo | skills/seo-plan/SKILL.md + assets/*.md |
| G14 | SEO programático em escala (templates + guarda anti-thin) | skill | programmatic-seo, scale, templates | conteudo-seo | skills/seo-programmatic/SKILL.md |
| G15 | Páginas de comparação de concorrentes | skill | competitor-pages, comparison | conteudo-seo | skills/seo-competitor-pages/SKILL.md |
| G16 | SEO internacional / hreflang + perfis culturais + paridade de conteúdo | skill | hreflang, i18n, cultural-profiles, content-parity | seo-internacional | skills/seo-hreflang/SKILL.md |
| G17 | APIs Google (GSC, PageSpeed, CrUX, Indexing, GA4) | skill | gsc, pagespeed, crux, indexing, ga4 | seo-google | skills/seo-google/SKILL.md |
| G18 | Perfil de backlinks (Moz, Bing, Common Crawl; verificação) | skill | backlinks, moz, common-crawl, link-profile | backlinks | skills/seo-backlinks/SKILL.md |
| G19 | Clusterização semântica baseada em SERP (overlap, hub-and-spoke) | skill | clustering, topic-cluster, serp-overlap | arquitetura-seo | skills/seo-cluster/SKILL.md + references/ |
| G20 | SXO — Search Experience Optimization (page-type, personas, user stories, wireframes) | skill | sxo, search-experience, persona, wireframe | sxo | skills/seo-sxo/SKILL.md + references/ |
| G21 | Monitoramento de drift de SEO (baseline vs estado; 17 regras, 3 severidades) | skill | drift, monitoring, baseline, regression | monitoramento-seo | skills/seo-drift/SKILL.md + references/ |
| G22 | E-commerce SEO (product schema, marketplace, Google Shopping/UCP) | skill | ecommerce-seo, product-schema, marketplace | ecommerce-seo | skills/seo-ecommerce/SKILL.md + references/ |
| G23 | Framework FLOW (find/leverage/optimize/win — prompts de busca+conversão) | skill | flow, framework, prompts, search-and-conversion | seo+cro | skills/seo-flow/SKILL.md |
| G24 | Dados ao vivo via DataForSEO MCP (extension mirror) | skill | dataforseo, live-data, mcp | tooling | skills/seo-dataforseo/SKILL.md |
| G25 | Geração de imagens IA p/ ativos SEO (Banana MCP, extension mirror) | skill | image-gen, ai-image, banana | imagens | skills/seo-image-gen/SKILL.md + references/ |
| G26 | Frota de 18 subagentes especialistas (espelham as skills; padrão de execução paralela via Agent tool) | subagent | subagent, parallel, fleet | seo | agents/seo-*.md (18 arquivos) |
| G27 | Módulo canônico SSRF + DNS-rebinding + DNS-pinning (`validate_url`, `validate_url_strict`, `safe_requests_get/head/session`) | codigo-mcp | ssrf, dns-pinning, fetch-seguro, hardening | seguranca | scripts/url_safety.py:1-40 |
| G28 | Gestão de credenciais Google (detecção 4-tier: OAuth/SA/API key/ADC) + validação de URL | codigo-mcp | oauth, service-account, credenciais, google | seo-google | scripts/google_auth.py |
| G29 | Engine de backlinks (Moz Link Explorer, Bing Webmaster, Common Crawl PageRank, verificação de existência) | codigo-mcp | moz, bing, common-crawl, backlink-verify | backlinks | scripts/moz_api.py, bing_webmaster.py, commoncrawl_graph.py, verify_backlinks.py, backlinks_auth.py |
| G30 | Core Web Vitals via PSI v5 + CrUX (histórico 25 semanas, LCP subparts, preload/bfcache) | codigo-mcp | cwv, lcp, inp, cls, crux, pagespeed | performance | scripts/pagespeed_check.py, crux_history.py, lcp_subparts.py, preload_check.py |
| G31 | Search Console + Indexing (queries, URL inspection, Indexing API, IndexNow) | codigo-mcp | gsc, url-inspection, indexing, indexnow | seo-google | scripts/gsc_query.py, gsc_inspect.py, indexing_notify.py, indexnow_submit.py |
| G32 | APIs de dados Google (GA4 orgânico, NLP/entidades, Keyword Planner, YouTube) | codigo-mcp | ga4, nlp, keyword-planner, youtube | seo-google | scripts/ga4_report.py, nlp_analyze.py, keyword_planner.py, youtube_search.py |
| G33 | Gerador de relatório PDF/HTML (WeasyPrint + matplotlib, revisão automática `_review_pdf`) | codigo-mcp | relatorio, pdf, weasyprint, charts | relatorio | scripts/google_report.py |
| G34 | Engine de drift (baseline SQLite, comparação por 17 regras, relatório HTML, histórico) | codigo-mcp | drift, sqlite, baseline, diff | monitoramento-seo | scripts/drift_baseline.py, drift_compare.py, drift_report.py, drift_history.py |
| G35 | Pipeline de fetch/render SPA-aware (UA rotation, Playwright, parse HTML, screenshot, análise visual) | codigo-mcp | fetch, render, playwright, spa, screenshot | seo-tecnico | scripts/fetch_page.py, render_page.py, parse_html.py, capture_screenshot.py, analyze_visual.py |
| G36 | Qualidade de conteúdo executável (detector QRG, humanizador anti-IA, extrator de claims + gap de citação) | codigo-mcp | content-quality, humanize, citation-gap, qrg | conteudo-seo | scripts/content_quality.py, content_humanize.py, content_verify.py |
| G37 | Geração/validação de schema executável (JSON-LD v2, validador product/merchant-listing) | codigo-mcp | schema-gen, product-schema, validacao | schema | scripts/schema_generate.py, schema_ecommerce_validate.py |
| G38 | Scanners de risco/lint (parasite-SEO, deprecação GBP, histórico de domínio, IPTC AI label, UCP) | codigo-mcp | parasite-risk, gbp-lint, domain-history, iptc, ucp | seo-tecnico | scripts/parasite_risk.py, gbp_deprecation_lint.py, domain_history.py, iptc_ai_label.py, ucp_check.py |
| G39 | Wrappers de tooling externo (Unlighthouse site-wide, DataForSEO costs/merchant/normalize, sync FLOW, agent-UX, seo_updates) | codigo-mcp | unlighthouse, dataforseo, flow-sync, agent-ux | tooling | scripts/unlighthouse_run.py, dataforseo_*.py, sync_flow.py, agent_ux_check.py, seo_updates.py |
| G40 | Reflexo de gate de qualidade — PostToolUse valida schema em Edit/Write (runner Python cross-platform) | reflexo | hook, posttooluse, schema-validation, gate | tooling | hooks/hooks.json, run-python-hook.js, validate-schema.py |
| G41 | Biblioteca de referência SEO core (E-E-A-T, CWV thresholds, schema-types, thinking-framework, quality-gates, backlink-quality, local signals, maps) | referencia | eeat, cwv, schema-types, quality-gates | seo | skills/seo/references/ (13 arquivos) |
| G42 | Referências de APIs Google (10 arquivos: GA4, indexing, keyword-planner, NLP, PSI/CrUX, search-console, youtube, rate-limits, DMA consent) | referencia | google-api, rate-limits, ga4, gsc | seo-google | skills/seo-google/references/ (10 arquivos) |
| G43 | Biblioteca de prompts FLOW (~40 prompts find/leverage/optimize/local/win) — **CC BY 4.0** | metodo-prompt | flow, prompts, gbp, blog, audit | seo+cro | skills/seo-flow/references/prompts/ |
| G44 | Referência de tipos de schema depreciados 2024-2026 | referencia | schema-deprecated, 2024-2026 | schema | skills/seo-schema/references/deprecated-types-2024-2026.md |
| G45 | Referências de hreflang (perfis culturais, formatos de locale, paridade, QA de tradução de máquina) | referencia | cultural-profiles, locale, content-parity | seo-internacional | skills/seo-hreflang/references/ (4 arquivos) |
| G46 | Referências de SXO (taxonomia page-type, scoring de persona, user-story framework, templates de wireframe) | referencia | sxo, persona, user-story, wireframe | sxo | skills/seo-sxo/references/ (4 arquivos) |
| G47 | Referências de GEO/ecommerce/cluster (google-ai-optimization, llms.txt evidence, marketplace endpoints, UCP, serp-overlap, hub-spoke) | referencia | geo, llms-txt, marketplace, ucp, cluster | ai-seo/ecommerce | skills/seo-geo|ecommerce|cluster/references/ |
| G48 | Base de dados de updates Google + referência consolidada de SEO Google (PDF→md) | referencia | google-updates, algorithm, reference | seo-google | data/google-updates.json, pdf/google-seo-reference.md |
| G49 | Extensões vendor (MCP/CLI): Ahrefs, Bing Webmaster, DataForSEO, Firecrawl, Profound, SE Ranking, Unlighthouse, Banana | ferramenta | ahrefs, bing, dataforseo, firecrawl, profound, seranking, unlighthouse, banana | vendor | extensions/*/ (8 add-ons, install scripts + SKILL.md) |

> **Granularidade:** os 18 subagentes (`agents/seo-*.md`) espelham 1:1 as skills G2-G25 (mesma capacidade em casca de subagente) — consolidados em G26 para evitar dupla contagem; a fase de aplicação deve materializá-los como especialistas. Scripts de dev/release (`portability_check.py`, `release_sign.py`, `verify_release.py`) são tooling interno do repo, não capacidade absorvível — não inventariados.
