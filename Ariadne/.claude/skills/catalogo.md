---
tipo: nota
area: Ariadne
up: "[[Ariadne/_MOC-ariadne]]"
---

# Catálogo de Habilidades — Ariadne

Habilidades disponíveis ao squad Ariadne, seu gatilho de invocação e propósito.

## Habilidades de domínio (embutidas nos especialistas)
O conhecimento operacional de cada frente vive nos `core_frameworks` do agente especialista + nas
`tasks/` + nos arquivos de `data/`. Não há SKILL.md duplicado — a fonte é o agente. Mapa:

| Frente | Onde vive | Agente dono |
|---|---|---|
| Auditoria de SEO técnico | `agents/auditor-tecnico-seo.md` + `tasks/auditar-seo-tecnico.md` | auditor-tecnico-seo |
| Arquitetura de informação | `agents/arquiteto-de-site.md` + `tasks/desenhar-arquitetura.md` | arquiteto-de-site |
| Dados estruturados (schema) | `agents/engenheiro-de-schema.md` + `tasks/implementar-schema.md` | engenheiro-de-schema |
| Conteúdo on-page / programático | `agents/estrategista-de-conteudo-seo.md` + `tasks/seo-programatico.md` | estrategista-de-conteudo-seo |
| AI-SEO (AEO/GEO/LLMO) | `agents/otimizador-ai-seo.md` + `tasks/otimizar-para-ai-search.md` | otimizador-ai-seo |
| CRO de página | `agents/analista-de-cro.md` + `tasks/analise-de-cro.md` + `data/biblioteca-de-experimentos-cro.md` | analista-de-cro |
| CRO de formulário | `agents/otimizador-de-formulario.md` + `tasks/otimizar-formulario.md` | otimizador-de-formulario |

## Habilidades de frentes novas (SKILL.md próprios — absorção claude-seo)
Frentes que a Ariadne não cobria no esqueleto original e ganharam SKILL.md em `.claude/skills/`.
Absorvidas de `AgriciDaniel/claude-seo@d830cdb` (MIT; FLOW = CC BY 4.0). Ainda sem especialista
dedicado: por ora são operadas pelo `ariadne-chief` + especialista adjacente (futuro: materializar
especialistas locais/i18n/e-commerce).

| Habilidade | Gatilho | Propósito | Adjacência |
|---|---|---|---|
| `seo-local-e-mapas` | "SEO local", "GBP", "map pack", "NAP", "geo-grid", "concorrentes por raio" | SEO local no site (NAP/schema/páginas de localização) + inteligência de mapas (geo-grid/SoLV/GBP) | auditor-tecnico-seo + engenheiro-de-schema |
| `seo-internacional-hreflang` | "hreflang", "SEO internacional", "i18n", "multi-idioma/região" | Validar/gerar hreflang + paridade de conteúdo + adaptação cultural | auditor-tecnico-seo |
| `seo-ecommerce` | "SEO de e-commerce", "Google Shopping", "product schema", "marketplace" | Página de produto + schema Product/UCP + inteligência de marketplace | engenheiro-de-schema + estrategista-de-conteudo-seo |
| `monitoramento-de-drift-seo` | "drift de SEO", "baseline", "quebrou algo", "checagem pós-deploy" | Git para SEO: baseline/compare/history de elementos SEO-críticos | auditor-tecnico-seo |
| `sxo-search-experience` | "SXO", "tipo de página errado", "por que não ranqueio", "score por persona" | Ponte SEO↔CRO: SERP de trás pra frente, mismatch de tipo, score por persona | analista-de-cro + arquiteto-de-site |
| `seo-de-imagens` | "SEO de imagem", "alt text", "otimizar imagens", "converter para webp", "image SERP" | Otimização de imagem para ranqueamento + CWV + metadados IPTC (rótulo IA) | auditor-tecnico-seo |
| `framework-flow` | "FLOW", "SEO guiado por evidência", "find leverage optimize win" | Camada de método (Find→Leverage→Optimize→Win) para o chief orquestrar as frentes | ariadne-chief |

## Habilidades de SEO técnico/conteúdo profundo (SKILL.md próprios — absorção exaustiva)
Camadas operacionais executáveis (scorecards, limiares, pipelines) que aprofundam os especialistas
de SEO técnico e de conteúdo. Copy final é sempre handoff ao **Caliope**; medição pós-publicação ao **Metis**.

| Habilidade | Gatilho | Propósito |
|---|---|---|
| `auditoria-tecnica-em-escala` | "auditar meu site", "auditoria completa de SEO", "saúde do site", "por que meu site não ranqueia" | Audita SITE inteiro: crawl + detecção de negócio + fan-out de especialistas em paralelo → health score + plano priorizado |
| `seo-tecnico-profundo` | "SEO técnico", "crawl budget", "robots.txt", "minha página não indexa", "GPTBot/ClaudeBot", "log file" | Profundidade técnica: crawlabilidade/indexabilidade, sitemap XML, IndexNow, crawlers de IA, headers, parasite SEO |
| `core-web-vitals-e-performance` | "Core Web Vitals", "PageSpeed", "site lento", "LCP/INP/CLS", "CrUX", "TTFB" | Mede/otimiza CWV com dados de campo (CrUX) + lab (PageSpeed/Lighthouse); decompõe LCP, tendência de 25 semanas |
| `render-js-e-spa` | "site em React/Vue/Angular", "SPA", "conteúdo não aparece no HTML", "screenshot mobile", "above the fold" | Renderiza com browser headless: HTML cru vs renderizado, elementos SEO, a11y tree, schema injetado por JS |
| `apis-google-e-indexacao` | "Search Console", "GSC", "URL indexada?", "inspeção de URL", "Indexing API", "IndexNow" | Dados próprios do Google: GSC (cliques/CTR/posição/inspeção), Indexing API, IndexNow, tráfego orgânico GA4 |
| `otimizacao-on-page-por-intencao` | "analisar esta página", "auditoria on-page", "essa URL está otimizada?" | Scorecard on-page 0-100 por dimensão ancorado na intenção da SERP (title/meta/H1/canonical/schema/imagens/CWV) |
| `analise-de-gap-de-conteudo` | "gap de conteúdo", "content gap", "página de comparação", "X vs Y", "alternativas a", "melhores [categoria]" | Mapeia gap (tópico/profundidade/qualidade) vs quem ranqueia + páginas competitivas com scoring de prioridade |
| `brief-de-conteudo-data-driven` | "brief de conteúdo", "content brief", "outline", "plano de conteúdo", "melhorar página existente" | Brief fundamentado em SERP (nova vs melhorar), scoring de concorrente, ganho de informação obrigatório |
| `qualidade-de-conteudo-eeat` | "qualidade de conteúdo", "auditar E-E-A-T", "thin content", "isso parece IA?", "claim sem fonte" | Scorecard E-E-A-T operacional: teste Quem/Como/Por quê, sinais de IA de baixo valor, gap de citação |
| `seo-programatico-profundo` | "SEO programático", "páginas em escala", "páginas por template", "SEO orientado a dado" | Planeja/audita páginas em escala com quality gates (WARNING/HARD STOP) contra thin content e index bloat |
| `relatorios-de-seo` | "gera um relatório", "PDF da auditoria", "dashboard", "plano de ação", "prioriza as issues", "roadmap de SEO" | Camada de SAÍDA: relatório SEO consolidado (PDF/HTML) + priorização de issues e roadmap |

## Habilidades adicionadas no 2º passe de absorção (jul/2026)
Aprofundamento cirúrgico das frentes onde a herança do `claude-seo` ainda não estava totalmente
absorvida. Alimentam especialistas dedicados quando forem materializados (candidato de leva futura, ver
`references/tooling-executavel-diferido.md` §1 G26).

| Habilidade | Gatilho | Propósito | Adjacência |
|---|---|---|---|
| `engenharia-de-schema-executavel` | "gera o schema", "JSON-LD dessa página", "esse tipo ainda vale?", "HowTo/FAQPage/ClaimReview" | Geração + validação executável de JSON-LD com tabela canônica de tipos depreciados 2024-2026 e árvore "asked for X → recomendar Y" | engenheiro-de-schema |
| `geo-ai-overviews-aprofundado` | "AI Overviews", "AI Mode", "ChatGPT search", "Perplexity", "SGE", "GEO/AEO/LLMO", "aparecer em IA", "llms.txt" | Scorecard GEO em 5 dimensões, divergência AI Mode × AI Overviews (13,7% overlap), quick wins + alta alavancagem, mitos rejeitados pelo Google | otimizador-ai-seo |
| `arquitetura-de-site-hub-spoke` | "topic cluster", "content cluster", "pillar page", "hub and spoke", "canibalização de keyword" | Cluster por SERP-overlap (7-10 = merge / 4-6 = mesmo cluster / 2-3 = interlink / 0-1 = separar), matriz bidirecional de links internos, scorecard pós-execução | arquiteto-de-site |
| `planejamento-por-industria-seo` | "plano de SEO", "SEO strategy", "roadmap SEO por indústria", "content calendar", "SaaS/local/e-commerce/publisher/agência" | Plano em 4 fases (Fundação → Expansão → Escala → Autoridade) calibrado por 6 perfis; tabela de roteamento enriquecida do chief; guard anti-thin para comparação em escala | ariadne-chief |

## Bibliotecas de referência densa (em `data/` e `references/`)
Fontes primárias + secundárias que as skills consultam para thresholds, endpoints, licenças e updates.
Não são SKILL.md; são material de consulta. Colocadas em `data/` porque são estruturais.

| Arquivo | Propósito |
|---|---|
| `data/refs-seo-core.md` | E-E-A-T + CWV + quality gates (thresholds consolidados) — G41 |
| `data/refs-apis-google.md` | GSC / GA4 / PSI / CrUX / Indexing / NLP / YouTube / Ads (endpoints, quotas, gotchas) — G42 |
| `data/refs-flow-prompts.md` | Framework FLOW + licença CC BY 4.0 do Daniel Agrici (meta-referência, sem cópia literal) — G43 |
| `data/refs-geo-ecommerce-cluster.md` | `llms.txt` (por que não é lever) + Merchant Listings + SERP-overlap methodology — G47 |
| `data/refs-updates-google.md` | Base curada de updates Google 2024-2026 (core/spam/policy/QRG/CWV/schema/produto) — G48 |
| `references/tooling-executavel-diferido.md` | Nota de escopo — 11 IDs de tooling executável DIFERIDO para sessão Prometeu + Infisical (G17, G24, G28, G30, G31, G33, G34, G38, G39, G40, G26) |

## Habilidades compartilhadas (fonte única no workspace)
| Habilidade | Gatilho | Propósito |
|---|---|---|
| `ritual-de-encerramento` | Fim de toda sessão com trabalho (reflexo `Stop`) | Reflete e grava lições no `MEMORY.md` do squad. Fonte: `C:\Kolden\.claude\skills\ritual-de-encerramento\SKILL.md` |
| `infisical-padrao` | Sempre que precisar de credencial/segredo | Buscar segredos via Infisical (nunca texto puro). Fonte: `Caos/.claude/skills/infisical-padrao/` |
| `verificacao-de-alinhamento` | SessionStart >24h (reflexo `verificacao-diaria`) | Checa pontas soltas nos documentos do squad |
