---
tipo: nota
area: Argos
up: "[[Argos/_MOC-argos]]"
relacionado:
  - "[[Argos/README|README]]"
---

# Origem do Squad Argos

**Tipo:** squad criado pelo Ritual do Caos (não importado de um repositório de squad).
**Criado em:** 2026-06-20 | **Por:** Ronan + Caos | **PRD:** `prd-de-ia.md` (aprovado).

O Argos é uma criação original da Kolden. O que é vendorizado de terceiros é o **motor de scraping**
(`motor/`) e o **módulo cinza** (`modulo-cinza/`) — repositórios open-source garimpados no GitHub sob
o scorecard da skill `busca-de-referencias` (≥7/10) e verificados quanto a segurança/atividade/licença.

## Repositórios vendorizados no motor (`motor/`)

> Preenchido na Fase 5e (Construção) ao clonar cada repo. Cada entrada registra repo + commit SHA + data.

Clonados com `git clone --depth 1` em 2026-06-21; o `.git` de cada um foi removido (vendorização
achatada, sem repositório aninhado no monorepo).

| Camada | Repositório | Licença | Commit (SHA) | Data do clone | Papel no Argos |
|---|---|---|---|---|---|
| Engine base / anti-bot | `D4Vinci/Scrapling` | BSD-3-Clause | `c0f012d6625528a756e3852bad9ae7500c223579` | 2026-06-21 | Stealth, fetchers adaptativos, seletores resilientes |
| Crawl em escala | `scrapy/scrapy` | BSD-3-Clause | `c9f952c2584f490cd2e5c843980212abc67c2971` | 2026-06-21 | Spiders, dedup de URL, extração exaustiva de links |
| Pesquisa LLM | `assafelovic/gpt-researcher` | Apache-2.0 | `b364917f55ea579c47e5ef3f038f7e56f51213df` | 2026-06-21 | Pesquisa multi-retriever + citação + relatório |
| JS pesado (Node) | `apify/crawlee` | Apache-2.0 | `15e77ef78849f42ffcf13f44a014d5df43eebc26` | 2026-06-21 | Crawling assíncrono multi-browser |
| Visão / DOM hostil | `Skyvern-AI/skyvern` | AGPL-3.0 | `9ba9f28dd3176ec9bc0204c675184ea4a362a7f3` | 2026-06-21 | Automação por visão LLM |

## Repositórios do módulo cinza (`modulo-cinza/`) — ToS-risco, isolados

> **NÃO clonados ainda.** A vendorização destes repos foi deliberadamente retida: por serem
> scrapers que violam ToS de plataforma, exigem autorização nominal explícita do Ronan (o
> classificador de segurança bloqueou o clone automático em 2026-06-21 — comportamento correto e
> coerente com o design opt-in da zona cinza). Quando autorizados, serão clonados em
> `modulo-cinza/social-scrapers/<nome>` pelo mesmo processo (depth 1 + remoção do .git + SHA aqui).

| Plataforma | Repositório candidato | Risco | Status | Observação |
|---|---|---|---|---|
| X/Twitter | `vladkens/twscrape` (MIT) | MÉDIO (ToS plataforma) | aguardando autorização | Só via compliance-sentinela + conta descartável |
| Instagram | `instaloader/instaloader` (MIT) | MÉDIO (ToS plataforma) | aguardando autorização | Idem |
| TikTok | `davidteather/TikTok-Api` **ou** `Evil0ctal/Douyin_TikTok_Download_API` (a escolher) | MÉDIO (ToS plataforma) | aguardando autorização | Idem |

## Garantias

- Nenhuma "invenção de capacidade" (Art. IV): cada ferramenta citada nos agentes está em `ferramentas.md`.
- Nenhuma credencial em texto puro (Art. VII): tudo via Infisical; contas cinza em path segregado.
- AGPL (Skyvern): uso interno; revisar implicações antes de qualquer distribuição externa.
- O motor é vendorizado (cópia local controlada), não dependência viva — atualizações são deliberadas.
