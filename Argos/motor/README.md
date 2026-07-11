---
tipo: nota
area: Argos
up: "[[Argos/_MOC-argos]]"
---

# Motor de Scraping do Argos

O **motor unificado** do squad Argos — "o melhor de cada" repositório, fundido por trás de uma
fachada única (`argos-engine.py`). Todas as camadas aqui operam em **zona verde** (fontes legítimas).
A zona ToS-cinza vive isolada em `../modulo-cinza/` e só é acionada pelo `compliance-sentinela`.

## Fachada única

```bash
python motor/argos-engine.py harvest  --url URL --dificuldade {estatico,antibot,crawl,js,visao}
python motor/argos-engine.py links    --url URL [--profundidade N]
python motor/argos-engine.py research --query "..." [--fontes exa,tavily,firecrawl]
python motor/argos-engine.py apify    --actor apify/website-content-crawler --input '{"startUrls":[{"url":"..."}]}'
python motor/argos-engine.py viral    --path scrape/tiktok/profile --params '{"handle":"..."}'
python motor/argos-engine.py transcrever --url "<URL>" --engine speechmatics
```

Toda saída vem em JSON com **fonte + timestamp** (exigência do gate de confiabilidade ARGOS-CL-001).

## Camadas (escada de dificuldade — use a mínima suficiente)

| Camada | Repo vendorizado | Quando usar |
|---|---|---|
| `estatico` | `scrapling/` | HTML estático fácil (Scrapling Fetcher) |
| `antibot` | `scrapling/` | Sites com anti-bot / seletor que muda (StealthyFetcher) |
| `crawl` | `scrapy/` | Crawl em escala, dedup, extração exaustiva de links |
| `js` | `crawlee/` → `crawlee-node/` | JS pesado, pool de browsers (Node) |
| `visao` | `skyvern/` | DOM hostil que exige "ver" a página (+ vision_analyze nativo) |
| `research` | `gpt-researcher/` | Pesquisa multi-fonte com citação |
| `apify` | — (serviço gerenciado) | Roda actors do Apify Store (scrapers prontos; infra/proxies do lado da Apify). `APIFY_TOKEN` via Infisical |
| `viral` | — (SociaVault, API) | Descoberta de vídeos/posts virais multi-plataforma. `SOCIAVAULT_API_KEY` via Infisical |
| `transcrever` | — (yt-dlp + Speechmatics/Deepgram) | Baixa o áudio e transcreve (pt-BR). `SPEECHMATICS_API_KEY`/`DEEPGRAM_API_KEY` via Infisical |

> **REUSE primeiro:** nas tasks, tente as tools nativas do Hermes (`web_extract`, `browser_*`) e os
> MCPs (Firecrawl/Tavily/Exa) ANTES do motor. O motor é para o que elas não cobrem.

## Procedência

Cada subpasta é um repositório vendorizado (`git clone --depth 1`, `.git` removido). Os repositórios
de origem, licenças e commit SHAs estão em `../_origem.md`. O código vendorizado é a referência; a
fachada usa as libs instaladas via `requirements.txt`.

## Instalação

Ver `../instalacao.md` (passo a passo de produção). Resumo:
```bash
pip install -r motor/requirements.txt
playwright install chromium          # Scrapling/Skyvern
cd motor/crawlee-node && npm install # camada js
```

## Licenças

BSD-3 (Scrapling, Scrapy), Apache-2.0 (GPT-Researcher, Crawlee), **AGPL-3.0 (Skyvern — uso interno;
revisar antes de qualquer distribuição externa)**.
