---
name: apis-google-e-indexacao
description: >
  Use quando a demanda exigir DADOS PRÓPRIOS do Google ou ações de indexação:
  Search Console (cliques/impressões/CTR/posição, inspeção de URL, status de
  sitemap), Indexing API, IndexNow, e tráfego orgânico do GA4. Gatilhos: "Search
  Console", "GSC", "minha URL está indexada?", "inspeção de URL", "indexação
  avançada", "forçar indexação", "Indexing API", "IndexNow", "impressões/CTR/
  posição", "quick wins de busca", "tráfego orgânico GA4", "status do sitemap no
  Google". Só roda com credenciais Google presentes. NÃO é keyword research de
  volume (Keyword Planner → handoff Argos) nem GA4 de produto (→ Metis).
---

# APIs Google & indexação avançada

Frente que conecta a Ariadne aos **dados reais do Google** — a ponte entre a análise por crawl e a
verdade de campo: métricas de Chrome, status de indexação real, performance de busca e tráfego
orgânico. Todas as APIs são gratuitas; exigem projeto no Google Cloud (API key e/ou service account).

## Tiers de credencial (comunique o tier detectado antes de agir)

| Tier | Tem | Habilita |
|---|---|---|
| 0 (API Key) | api_key | PageSpeed, CrUX, CrUX-history *(ver `core-web-vitals-e-performance`)* |
| 1 (OAuth/SA) | + token OAuth ou service account | GSC, inspeção de URL, sitemaps, Indexing API |
| 2 (Full) | + ga4_property_id | + GA4 orgânico, GA4 top-pages |
| 3 (Ads) | + developer token + customer id | Keyword Planner → **handoff Argos** |

## Search Console (GSC)
- **Search Analytics** — cliques, impressões, CTR e posição (padrão 28 dias, dimensões query+page).
  Inclui **detecção de quick-win**: queries em posição **4-10 com alta impressão** (perto da página 1,
  alavancáveis com pouco esforço). Lembrete: dado de Search Analytics tem **2-3 dias de atraso**.
- **Inspeção de URL** — status de indexação **real** por URL: veredito (PASS/FAIL), coverage state,
  status do robots, estado de indexação, fetch, seleção de canonical, usabilidade mobile, rich
  results. Modo batch (um URL por linha) limitado a **2.000/dia por site**.
- **Status de sitemap** — sitemaps submetidos com erros/avisos. O sitemap reporta **contagem
  submetida**; a **inspeção de URL é a verdade** sobre o que de fato está indexado.

## Indexação proativa
- **Indexing API** — notifica o Google de update/delete de URL. **Oficialmente** restrita a
  `JobPosting` e `BroadcastEvent`/`VideoObject` — **sempre informe essa restrição** ao usuário. Cota:
  **200 publicações/dia**. Batch até 200 URLs, com rastreio de cota.
- **IndexNow** — protocolo para **Bing/Yandex/Naver** (não Google). Submissão de URLs para indexação
  mais rápida fora do Google; par natural da categoria IndexNow do `seo-tecnico-profundo`.

## GA4 orgânico (escopo SEO)
Relatório de tráfego **orgânico** (filtrado ao canal Organic Search): sessões/usuários/pageviews/
engajamento diários e top landing pages orgânicas por sessão. **Escopo:** aqui a Ariadne lê GA4
**apenas pela lente de SEO**; análise de produto/funil completa é **handoff ao Metis**.

## Limites de taxa (planeje o batch)

| API | Por minuto | Por dia | Auth |
|---|---|---|---|
| PSI v5 | 240 | 25.000 | API Key |
| CrUX + History | 150 (compart.) | ilimitado | API Key |
| GSC Search Analytics | 1.200/site | 30M | Service Account |
| GSC URL Inspection | 600 | 2.000/site | Service Account |
| Indexing API | 380 | 200 publicações | Service Account |
| GA4 Data API | 10 concorrentes | ~25K tokens | Service Account |

## Gotchas
CLS do CrUX vem string-encoded ("0.05"). CrUX 404 = tráfego insuficiente, não erro de auth.
Service account sem acesso → adicionar o `client_email` em GSC > Settings > Users. 429 → backoff
exponencial e reporte qual API estourou. Nunca referencie FID.

## Regras Kolden
- **Infisical (obrigatório):** a gestão de credenciais Google (OAuth / service account / API key /
  ADC) é reescrita **sobre o Infisical** — nenhuma chave ou `client_secret` em texto puro nem em
  arquivo do repo. Busque via `infisical-padrao`.
- **Égide:** validação de URL/SSRF antes de qualquer chamada que receba URL do usuário.
- **Handoffs:** Keyword Planner (volume/ideias) → **Argos** (coleta); GA4 além do orgânico → **Metis**.
- **Hipótese vs fato:** dado de GSC/GA4 é fato medido (com nota de frescor); o resto é hipótese.

---
## Atribuição
Princípio extraído de `AgriciDaniel/claude-seo@d830cdb` (skill `seo-google` + references de APIs/
rate-limits e scripts `gsc_query`/`gsc_inspect`/`indexing_notify`/`indexnow_submit`/`ga4_report`/
`google_auth`; licença MIT). Reescrito em PT-BR para a Kolden, sem cópia literal, com a camada
Infisical obrigatória substituindo a gestão de credenciais original. Os scripts executáveis ficam como
tooling a provisionar.
