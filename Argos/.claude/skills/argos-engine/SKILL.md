---
name: argos-engine
description: Como usar o motor de scraping unificado do Argos (a fachada motor/argos-engine.py) que roteia entre as camadas vendorizadas — Scrapling (anti-bot/stealth), Scrapy (crawl em escala), Crawlee (Node, JS pesado), Skyvern (visão), GPT-Researcher (pesquisa LLM). Use quando uma coleta exigir mais do que as tools nativas do Hermes (web_extract/browser_*) — ou seja, anti-bot, crawl exaustivo, render pesado de JS ou DOM hostil. Sempre tente REUSE das tools nativas primeiro.
tipo: skill
area: Argos
up: "[[Argos/_MOC-argos]]"
---

# Habilidade: argos-engine (motor de scraping unificado)

O Argos tem um motor de scraping vendorizado em `motor/`, exposto por uma **fachada única**
`motor/argos-engine.py`, chamada via a tool nativa `terminal`. A regra de ouro é **REUSE primeiro**:
só caia no motor quando as tools nativas do Hermes (`web_extract`, `web_search`, `browser_*`) ou os
MCPs (Firecrawl/Tavily/Exa) não derem conta.

## Quando usar cada camada (escada de dificuldade)

| Dificuldade do alvo | Ferramenta (em ordem de preferência) |
|---|---|
| Estático, fácil | `web_extract` / MCP `firecrawl_scrape` (REUSE — sem motor) |
| Descoberta de links / sitemap | MCP `firecrawl_map` / `tavily_map`; ou Scrapy para crawl em escala |
| Anti-bot / stealth / seletor que muda | **Scrapling** (via fachada) |
| Crawl exaustivo + dedup de URL | **Scrapy** (via fachada) |
| JS pesado / pool de browsers | **Crawlee** (Node, via fachada) |
| DOM hostil / precisa "ver" a página | **Skyvern** + `vision_analyze` (via fachada) |
| Pesquisa multi-fonte + relatório citado | **GPT-Researcher** (via fachada) |
| Coleta gerenciada por actor pronto | **Apify** (via fachada — subcomando `apify`) |
| Descoberta de vídeos virais (multi-plataforma) | **SociaVault** (subcomando `viral`) — ver skill `descoberta-de-virais` |
| Transcrever vídeo/áudio → texto (copy) | **yt-dlp + Speechmatics/Deepgram** (subcomando `transcrever`) — ver skill `transcricao-de-conteudo` |
| Zona ToS-cinza (login) | **NÃO use o motor** — escale ao `compliance-sentinela` (modulo-cinza/) |

## Contrato da fachada

```bash
# Forma geral (a implementação vive em motor/argos-engine.py)
python motor/argos-engine.py harvest --url "<URL>" --dificuldade <estatico|antibot|crawl|js|visao> --modo verde
# Pesquisa LLM:
python motor/argos-engine.py research --query "<pergunta>" --fontes exa,firecrawl,tavily
# Coleta gerenciada via actor do Apify Store (APIFY_TOKEN via Infisical):
python motor/argos-engine.py apify --actor apify/website-content-crawler --input '{"startUrls":[{"url":"<URL>"}]}'
```

**Camada `apify` (gerenciada):** roda um actor pronto do Apify Store — a Apify cuida de
infra/proxies/anti-bot e devolve um dataset. Use quando houver um actor que já cobre o alvo (ex.:
scrapers de redes sociais, Maps, e-commerce, SERP) e você não quer manter o scraper próprio.
`APIFY_TOKEN` é resolvido via Infisical (`/kolden/dev/APIFY_TOKEN`, env **dev**: `infisical run --env=dev`), nunca literal. **Atenção ToS:**
a Apify terceiriza a infra, não o ToS da plataforma-alvo — um actor que coleta rede social sob login
ainda passa pelo juízo do `compliance-sentinela`.

- `--modo verde` é o padrão (fontes legítimas). `--modo cinza` SÓ é aceito se houver marcador de
  autorização da sessão criado pelo `compliance-sentinela` (o reflexo PreToolUse bloqueia o contrário).
- Toda saída do motor deve vir com **fonte (URL/API) + timestamp** para satisfazer o gate de confiabilidade.
- Credenciais (proxies, chaves) são resolvidas em runtime via Infisical (`/kolden/argos`), nunca em texto puro.

## Regras

1. Tente REUSE (tool nativa Hermes/MCP) antes de invocar o motor.
2. Escolha a camada MÍNIMA suficiente (não use Crawlee para um HTML estático).
3. Respeite robots/rate-limit na zona verde; em 403/429, backoff + stealth + rotação de proxy via sentinela.
4. Nunca toque o `modulo-cinza/` por aqui — isso é exclusivo do `compliance-sentinela`.
