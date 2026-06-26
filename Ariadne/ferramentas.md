# Ferramentas — Ariadne (Execução de SEO & CRO de Página)

Catálogo único de toda ferramenta que o squad Ariadne pode usar. **Constituição, Artigo IV:** nenhum
agente da Ariadne pode citar, invocar ou prometer uma capacidade que não esteja nesta tabela — este
arquivo é a **fonte de verdade**. **Artigo VII:** nenhuma credencial em texto puro; só a referência ao
caminho no Infisical.

## Regra (não-negociável)
1. **Infisical é SEMPRE o primeiro item e a única fonte de segredos.** Resolver em runtime; nada de `.env` com valor.
2. **Sem invenção de capacidade (Art. IV).** Se não está aqui, a Ariadne não tem — diz que não tem.
3. **Sem credencial em texto puro (Art. VII).** A coluna "Credencial" carrega só o caminho Infisical.
4. **REUSE primeiro.** Tente as tools nativas do Hermes e os MCPs/serviços já no catálogo antes de pedir provisão nova.
5. **Consome inteligência, não a coleta.** Keywords/SERP/volume/concorrência vêm do **Argos** (handoff de entrada) — não duplicar.

## Tabela de ferramentas

| Ferramenta | Função na Ariadne | Acesso | Credencial (Infisical) |
|---|---|---|---|
| **Infisical** | **Fonte única de segredos (obrigatória).** Toda credencial abaixo é resolvida aqui em runtime. | MCP `infisical` ou CLI `infisical run` | `INFISICAL_TOKEN` (única em env var do sistema) |
| **web_search** (Hermes) | Ler SERP, verificar rankings/intenção de busca, checar presença em AI Overviews | tool nativa Hermes | via Infisical (backends) |
| **web_extract** (Hermes) | Ler robots.txt/sitemap.xml/headers/meta, conteúdo de páginas | tool nativa Hermes | — |
| **browser_*** (Hermes, CDP) | RENDERIZAR páginas (JS): validar JSON-LD injetado, conteúdo client-side, layout shift, percorrer formulário, estados de erro/mobile | tool nativa Hermes | — |
| **PageSpeed Insights API** | Core Web Vitals (LCP/INP/CLS, campo+lab) e oportunidades de velocidade | API oficial (HTTP) via `web_extract`/`terminal` | `/kolden/dev/GOOGLE_DRIVE_API_KEY` (chave Google dev, já no catálogo) |
| **Search Console** | Cobertura/indexação, performance de busca, CWV report, links internos | ADC (`gcloud`, `webmasters.readonly`, já no catálogo) | ADC — conta adm@kolden.com.br |
| **Google Analytics 4 (GA4)** | Taxa de conversão atual, fonte de tráfego, comportamento (LEITURA p/ diagnóstico; instrumentação nova = handoff Metis) | MCP oficial Google (já no catálogo) | ADC |
| **MCP Firecrawl** | firecrawl_map (descobrir URLs/footprint), firecrawl_scrape (ler conteúdo/meta em escala) — zona verde, respeitando robots | MCP (já no catálogo) | `/kolden/prod/FIRECRAWL_API_KEY` |
| **MCP Browserbase** | Render real (Stagehand) quando precisa executar JS para auditar/validar | MCP (já no catálogo) | `/kolden/prod/BROWSERBASE_API_KEY`, `BROWSERBASE_PROJECT_ID` |
| **MCP Exa** | Busca neural — descobrir propriedades, clusters, fontes que LLMs citam | MCP (já no catálogo) | `/kolden/prod/EXA_API_KEY` |
| **Rich Results Test / Schema.org Validator** | Validar JSON-LD renderizado (único método confiável — web_fetch não enxerga schema por JS) | ferramenta web (via browser_*) | — (público) |
| **schema.org** | Vocabulário de tipos de dados estruturados | referência (doc) | — |
| **Semrush** *(a provisionar)* | Auditoria de site, keywords, links internos, dificuldade | API/CLI | `/kolden/ariadne/SEMRUSH_API_KEY` *(a cadastrar)* |
| **Ahrefs** *(a provisionar)* | Backlinks, auditoria de site, content gap | API | `/kolden/ariadne/AHREFS_API_KEY` *(a cadastrar)* |
| **DataForSEO** *(a provisionar)* | SERP/keywords/on-page programático via API | API | `/kolden/ariadne/DATAFORSEO_API_KEY` *(a cadastrar)* |
| **RankParse** *(a provisionar)* | Backlinks/domain data baratos, agent-friendly (MCP) | API/MCP | `/kolden/ariadne/RANKPARSE_API_KEY` *(a cadastrar)* |
| **Hotjar** *(a provisionar)* | Heatmaps, gravações de sessão, funil de formulário (dado comportamental p/ CRO) | API | `/kolden/ariadne/HOTJAR_API_KEY` *(a cadastrar)* |
| **Optimizely** *(a provisionar)* | Rodar A/B tests e feature flags (execução; leitura estatística = handoff Metis) | API | `/kolden/ariadne/OPTIMIZELY_API_KEY` *(a cadastrar)* |

*Sem invenção de capacidade (Art. IV): nada além desta tabela. Sem credencial em texto puro (Art. VII).*
*As ferramentas marcadas **(a provisionar)** ainda NÃO têm conta/credencial Kolden — o agente as cita como "a provisionar" e não promete o número até estarem ativas (ver `sobre-a-empresa/Ferramentas/matriz-de-marketing-absorvida.md`).*

## Mapeamento por especialista

| Agente (tier) | Ferramentas que usa |
|---|---|
| **ariadne-chief** (0) | Nenhuma de execução — orquestra, roteia, consolida e cobra o gate. Lê resultados dos especialistas. |
| **auditor-tecnico-seo** (1) | web_extract, browser_* (Hermes); PageSpeed Insights; Search Console; MCP Firecrawl/Browserbase; Semrush/Ahrefs/DataForSEO/RankParse *(a provisionar)*; Infisical |
| **arquiteto-de-site** (1) | web_extract, browser_* (Hermes); MCP Firecrawl (map/crawl), Exa; Search Console (links internos); Semrush/Ahrefs *(a provisionar)*; Infisical |
| **engenheiro-de-schema** (1) | browser_* (render JSON-LD), web_extract (Hermes); Rich Results Test / Schema.org Validator; schema.org; Search Console; Infisical |
| **estrategista-de-conteudo-seo** (1) | web_search, web_extract (Hermes); MCP Firecrawl/Exa; Search Console; Semrush/Ahrefs/DataForSEO *(a provisionar)*; keywords via handoff Argos; Infisical |
| **otimizador-ai-seo** (1) | web_search, browser_*, web_extract (Hermes); MCP Exa; Infisical |
| **analista-de-cro** (2) | web_extract, browser_* (Hermes); GA4 (leitura); Hotjar/Optimizely *(a provisionar)*; data/biblioteca-de-experimentos-cro.md; Infisical |
| **otimizador-de-formulario** (2) | web_extract, browser_* (Hermes); GA4 (leitura); Hotjar/Optimizely *(a provisionar)*; Infisical |
