# Ferramentas — Argos (Inteligência de Mercado & Scraping)

Catálogo único de toda ferramenta que o squad Argos pode usar. **Constituição, Artigo IV:**
nenhum agente do Argos pode citar, invocar ou prometer uma capacidade que não esteja nesta
tabela — este arquivo é a **fonte de verdade** das ferramentas. **Artigo VII:** nenhuma
credencial vive em texto puro em nenhum arquivo do squad; só a referência ao caminho no Infisical.

## Regra (não-negociável)

1. **Infisical é SEMPRE o primeiro item e a única fonte de segredos.** Toda chave, token ou conta
   vem do Infisical em runtime. Nada de `.env` versionado com valor, nada de chave em prompt/skill/doc.
2. **Sem invenção de capacidade (Art. IV).** Se não está nesta tabela, o Argos não tem. Em dúvida,
   o agente diz que não tem a ferramenta — não improvisa.
3. **Sem credencial em texto puro (Art. VII).** A coluna "Credencial" carrega só o **caminho** Infisical.
4. **REUSE primeiro.** Tente as tools nativas do Hermes e os MCPs antes de cair no motor vendorizado
   (`motor/`). A zona cinza (`modulo-cinza/`) é o último recurso e só pelo `compliance-sentinela`.

## Tabela de ferramentas

| Ferramenta | Função no Argos | Acesso | Credencial (Infisical) |
|---|---|---|---|
| **Infisical** | **Fonte única de segredos (obrigatória).** Toda credencial abaixo é resolvida aqui em runtime. | MCP `infisical` ou CLI `infisical run` | `INFISICAL_TOKEN` (única credencial em env var do sistema, injetada uma vez pelo humano) |
| **web_search** (Hermes) | Busca web ampla — sizing, fontes, descoberta de concorrentes (backends Exa/Firecrawl/Tavily/Parallel) | tool nativa Hermes | via Infisical (chaves dos backends) |
| **web_extract** (Hermes) | Extração de conteúdo de páginas encontradas na busca | tool nativa Hermes | via Infisical (backends) |
| **browser_*** (Hermes, CDP) | Navegação/coleta em páginas dinâmicas e ad libraries (render JS, cliques, scroll) | tool nativa Hermes | — |
| **x_search** (Hermes, xAI) | Busca **legítima** de posts no X/Twitter | tool nativa Hermes | `/kolden/argos` (chave xAI) |
| **vision_analyze** (Hermes) | Leitura de criativos/imagens de anúncios e screenshots de perfis | tool nativa Hermes | — |
| **terminal** (Hermes) | Execução do motor vendorizado via `motor/argos-engine.py` e CLIs | tool nativa Hermes | — |
| **MCP Firecrawl** | crawl / map / scrape / research em escala (web pública) | MCP | `/kolden/argos` (quando exigir chave) |
| **MCP Tavily** | busca / crawl / extract de fontes citáveis | MCP | `/kolden/argos` |
| **MCP Exa** | busca / fetch semântico de fontes | MCP | `/kolden/argos` |
| **MCP Apollo** | enriquecimento de empresa (bottom-up de sizing e mapa de concorrência) | MCP | `/kolden/argos` |
| **Perplexity Sonar** *(retriever externo, opt-in)* | busca/pesquisa web com **citação nativa** (search/ask/research/reason) — retriever ADICIONAL ao lado de Exa/Tavily/Firecrawl, via skill `retriever-sonar`. **Vendor NÃO soberano** (`api.perplexity.ai`): a query trafega fora da Kolden; uso deliberado, default continua soberano; nunca enviar dados sensíveis | MCP `perplexity` (quando provisionado) **ou** camada `research --fontes ...,sonar` do `motor/argos-engine.py` | `/kolden/argos/PERPLEXITY_API_KEY` *(a cadastrar)* |
| **Defuddle** *(extrator local)* | web→markdown limpo (readability) economizando tokens — alternativa LEVE/LOCAL ao Firecrawl para artigos/docs estáticos, via skill `extracao-defuddle` | CLI (`defuddle parse <url> --md`, OSS MIT) via `terminal` | — |
| **YouTube Data API v3** | estatísticas públicas de canal/vídeo (channels/videos/search.list) — via legítima do `social-youtube` | API oficial (HTTP) via `web_extract`/`terminal` | `/kolden/argos` (chave Data API) |
| **Reddit API (pública)** | subreddits/threads/sentimento via endpoints JSON públicos — via legítima do `social-reddit` | API pública (HTTP/JSON) via `web_extract` | `/kolden/argos` (quando exigir app token) |
| **MCP Browserbase** | sessões de browser efêmeras/isoladas (zona cinza, sob sentinela) | MCP | `/kolden/argos` (e contas em `/kolden/argos/cinza/*`) |
| **Scrapling** (vendorizado) | engine base: anti-bot / stealth / seletores adaptativos | motor vendorizado — `motor/argos-engine.py` via terminal | — |
| **Scrapy** (vendorizado) | crawl em escala, dedup, extração exaustiva de links | motor vendorizado — `motor/argos-engine.py` via terminal | — |
| **GPT-Researcher** (vendorizado) | pesquisa LLM multi-retriever + citação + relatório | motor vendorizado — `motor/argos-engine.py` via terminal | `/kolden/argos` (LLM via OpenRouter) |
| **Crawlee** (vendorizado, Node) | crawling assíncrono multi-browser p/ JS pesado | motor vendorizado — `motor/crawlee-node/` via terminal | — |
| **Skyvern** (vendorizado) | automação por visão LLM em DOM hostil | motor vendorizado — `motor/argos-engine.py` via terminal | `/kolden/argos` (LLM) |
| **Apify** (actors gerenciados) | coleta gerenciada via actors prontos do Apify Store (scrapers de redes sociais, Maps, e-commerce, SERP — infra/proxies/anti-bot do lado da Apify) | camada `apify` do `motor/argos-engine.py` via terminal **ou** MCP `@apify/actors-mcp-server` | `/kolden/dev/APIFY_TOKEN`, `/kolden/dev/APIFY_USER_ID` (chave compartilhada, env **dev**; rodar com `infisical run --env=dev`) |
| **SociaVault** (descoberta de virais) | dados sociais multi-plataforma (TikTok/IG/YT/X/LinkedIn/Reddit): vídeos/posts virais por engajamento, trending de hashtag/som/criador | camada `viral` do `motor/argos-engine.py` via terminal (REST, header `X-API-Key`) | `/kolden/dev/SOCIAVAULT_API_KEY` (env **dev**) |
| **Speechmatics** (transcrição) | STT de alta qualidade em **pt-BR** (diarização, timestamps) para transcrever conteúdo viral → copy | camada `transcrever` do `motor/argos-engine.py` via terminal (SDK `speechmatics-python`) | `/kolden/dev/SPEECHMATICS_API_KEY` (env **dev**) |
| **Deepgram** (transcrição — reuso) | STT (fallback/realtime) da camada `transcrever` | camada `transcrever` (`--engine deepgram`) via terminal | `/kolden/prod/DEEPGRAM_API_KEY` (já no catálogo) |
| **yt-dlp** (download) | baixa o áudio/vídeo de TikTok/IG/YouTube antes da transcrição | camada `transcrever` do `motor/` (CLI, OSS Unlicense) | — |
| **Windsor.ai** (conector de dados) | ETL de dados de marketing (Ads/GA4/CRM de 325+ fontes) — consolida métricas para sizing/concorrência. NÃO é descoberta de virais | API REST (`connectors.windsor.ai`, query `api_key`) **ou** MCP `mcp.windsor.ai` | `/kolden/dev/WINDSOR_API_KEY` (env **dev**) |
| **twscrape / instaloader / TikTokApi / Douyin** | coleta social autenticada (ToS-risco) — só sob aprovação humana | **módulo cinza** — `modulo-cinza/` via `compliance-sentinela` | `/kolden/argos/cinza/*` (contas/proxies descartáveis) |
| **GitHub API (pública)** | prospecção por stargazers/forks/watchers de repos âncora (`*prospeccao-por-stargazers`, G18) — zona verde | API pública (HTTP) via `web_extract`/`terminal` | `/kolden/argos` (token GitHub p/ rate limit) |
| **Hunter** *(a provisionar)* | achar e-mail profissional por domínio/empresa (complementa Apollo na prospecção) | API (HTTP)/CLI | `/kolden/argos/HUNTER_API_KEY` *(a cadastrar)* |
| **Truelist** *(a provisionar)* | validação de deliverability pré-outreach — `email_state`/`email_sub_state` (G19) | API (HTTP) / MCP | `/kolden/argos/TRUELIST_API_KEY` *(a cadastrar)* |

*Sem invenção de capacidade (Art. IV): nada além desta tabela. Sem credencial em texto puro (Art. VII).*

## Mapeamento por especialista

Cada agente só usa o que está abaixo (subconjunto da tabela). Fiel ao `squad.yaml` (focus) e ao PRD §5.

| Agente (tier) | Ferramentas que usa |
|---|---|
| **argos-chief** (0) | Nenhuma de coleta — orquestra, roteia e sintetiza. Lê resultados dos especialistas; aciona o `compliance-sentinela` para autorizar zona cinza. Infisical só por delegação. |
| **web-harvester** (1) | `browser_*`, `web_extract` (Hermes); Scrapling, Scrapy, Crawlee, **Apify** (motor — actors gerenciados p/ coleta difícil/em escala); MCP Firecrawl; Infisical |
| **serp-seo-cartografo** (1) | `web_search`, `web_extract` (Hermes); MCP Firecrawl / Tavily / Exa; Scrapy (sitemaps/links); Infisical |
| **ads-intel** (1) | `browser_*`, `vision_analyze` (Hermes — ler criativos); MCP Firecrawl (ad libraries); **Windsor** (dados de plataformas de ads); Infisical |
| **market-sizer** (1) | `web_search` (Hermes); MCP Apollo (bottom-up); MCP Tavily / Exa (fontes oficiais); GPT-Researcher (motor); **Windsor** (dados de ads/analytics consolidados); Infisical |
| **competitor-mapper** (1) | Consolida saídas dos demais; `web_extract` (Hermes); MCP Firecrawl / Exa para preencher lacunas; **SociaVault** (virais do concorrente, skill `descoberta-de-virais`); Infisical |
| **research-synthesizer** (1) | GPT-Researcher (motor — cross-check + citação); `web_search` / `web_extract` (Hermes); MCP Tavily / Exa; Infisical |
| **social-instagram** (2) | `web_search`, `web_extract`, `browser_*`, `vision_analyze` (Hermes — via legítima embed/web/SERP); MCP Firecrawl; escala ao sentinela para instaloader em `modulo-cinza/` |
| **social-tiktok** (2) | `web_search`, `browser_*`, `vision_analyze` (Hermes — Creative Center / perfis públicos); MCP Firecrawl; escala ao sentinela para TikTokApi em `modulo-cinza/` |
| **social-youtube** (2) | `web_search`, `web_extract`, `browser_*` (Hermes — Data API / web); MCP Firecrawl / Tavily; Infisical (chave Data API quando usada) |
| **social-linkedin** (2) | `web_search`, `browser_*`, `vision_analyze` (Hermes); MCP Apollo (empresa/headcount/contratações); MCP Firecrawl; escala ao sentinela para coleta autenticada |
| **social-x** (2) | `x_search` (Hermes/xAI — via legítima); `web_extract`; escala ao sentinela para twscrape em `modulo-cinza/` |
| **social-facebook** (2) | `browser_*`, `web_extract`, `vision_analyze` (Hermes — páginas/grupos públicos, Ad Library/transparência); MCP Firecrawl; escala ao sentinela |
| **social-reddit** (2) | `web_search`, `web_extract` (Hermes — API pública/threads); MCP Tavily / Exa; Infisical (chave da API Reddit quando usada) |
| **compliance-sentinela** (3) | **Único portão** do `modulo-cinza/` (twscrape / instaloader / TikTokApi); MCP Browserbase (sessões isoladas); Infisical `/kolden/argos/cinza/*` (contas/proxies descartáveis). Não produz inteligência — autoriza, isola e queima contas. |

**Capacidades transversais (skills):**
- **Descoberta de virais** (`descoberta-de-virais`): os `social-*` e o `competitor-mapper` acham vídeos/posts virais via **SociaVault** (`viral`) + Apify + TikTok Creative Center + YouTube Data API.
- **Transcrição** (`transcricao-de-conteudo`): qualquer especialista pode pedir a camada `transcrever` (yt-dlp → **Speechmatics**/Deepgram) para virar um vídeo viral em texto e fazer **handoff ao Caliope** (copy).
- **Retriever Sonar** (`retriever-sonar`): `serp-seo-cartografo`, `market-sizer` e `research-synthesizer` podem acionar o **Perplexity Sonar** como retriever opt-in (citação nativa) — vendor externo não soberano, uso deliberado.
- **Extração local** (`extracao-defuddle`): `web-harvester`, `serp-seo-cartografo` e os `social-*` podem usar o **Defuddle** (local) para extrair markdown limpo de páginas estáticas economizando tokens.
- **Busca no acervo** (`busca-semantica-no-acervo`): o `research-synthesizer` (e o `competitor-mapper`) deduplica/re-ranqueia o fan-out de retrievers e recupera inteligência já produzida (busca híbrida fuzzy + semântica).

## Infisical — paths

Convenção do Kolden: `/<projeto>/<ambiente|área>/<NOME_DA_CHAVE>`. O Argos usa dois espaços:

| Path | Conteúdo | Quem acessa |
|---|---|---|
| `/kolden/argos` | **Zona verde (geral):** chaves legítimas — xAI (x_search), backends de busca (Exa/Firecrawl/Tavily), Apollo, OpenRouter (LLM do motor), Data APIs públicas (YouTube/Reddit) | qualquer especialista, conforme o mapeamento acima |
| `/kolden/argos/cinza/*` | **Zona cinza (segregada):** contas e proxies **descartáveis** para scraping autenticado (`/kolden/argos/cinza/instagram`, `/.../tiktok`, `/.../x`, `/.../proxies`, etc.) | **somente** `compliance-sentinela`, após confirmação humana na sessão |

Resolução em runtime: `infisical run --path=/kolden/argos -- <comando>` (CLI) ou MCP `infisical`
(`infisical_get_secret(path=...)`). Nunca a chave literal. Se o Infisical falhar: **não continuar** —
logar e escalar ao humano; jamais usar fallback em texto puro.

## Zona verde vs cinza

A divisão é a espinha dorsal do apetite de risco do squad (PRD §3–§4, §8; veto do `squad.yaml`).

- **Zona verde (default — autonomia alta):** fontes legítimas e de baixo risco — web pública, APIs
  oficiais, ad libraries públicas (Meta Ad Library, Google Ads Transparency, TikTok Creative Center,
  LinkedIn Ads), SERP, `x_search` (xAI), Apollo, Reddit/YouTube Data APIs. Respeita rate-limits e
  robots. Credenciais em `/kolden/argos`. **Roda sem autorização especial.**
  - **Apify (gerenciada):** actors do Store rodam coleta na infra da Apify (proxies/anti-bot inclusos).
    Tratada como verde-terceirizada por padrão; mas um actor que coleta plataforma sob login/ToS-risco
    **passa pelo `compliance-sentinela`** — a Apify terceiriza a infra, não o ToS da plataforma-alvo.
- **Zona cinza (isolada — autonomia baixa, opt-in):** scraping **autenticado** / área ToS-risco —
  `twscrape`, `instaloader`, `TikTokApi` em `modulo-cinza/`, e sessões Browserbase efêmeras. **HALT**
  por padrão: só roda com **confirmação humana explícita na sessão** + **conta/proxy descartável**
  via `/kolden/argos/cinza/*`, e **somente** pelo `compliance-sentinela`. Nunca usa credencial
  corporativa real. O reflexo `PreToolUse` detecta acesso a `modulo-cinza/`/auth e bloqueia até a
  liberação. `modulo_cinza: false` é o estado padrão no `squad.yaml`.
