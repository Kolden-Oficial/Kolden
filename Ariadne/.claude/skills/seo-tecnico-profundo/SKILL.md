---
name: seo-tecnico-profundo
description: >
  Use quando a demanda for SEO TÉCNICO de profundidade numa página ou site:
  crawlabilidade, indexabilidade, segurança, estrutura de URL, mobile, dados
  estruturados, renderização JS, IndexNow, orçamento de crawl, análise de
  sitemap XML, gestão de crawlers de IA e varredura de riscos técnicos.
  Gatilhos: "SEO técnico", "problema de crawl", "robots.txt", "noindex/canonical",
  "orçamento de crawl", "crawl budget", "sitemap", "log file", "análise de logs",
  "minha página não indexa", "GPTBot/ClaudeBot", "headers de segurança",
  "parasite SEO". Aprofunda o auditor-tecnico-seo. NÃO mede CWV de campo (isso é
  core-web-vitals-e-performance) nem renderiza SPA (isso é render-js-e-spa).
tipo: skill
area: Ariadne
up: "[[Ariadne/_MOC-ariadne]]"
---

# SEO técnico profundo (9 categorias + crawl budget + sitemap + riscos)

O núcleo técnico do `auditor-tecnico-seo`. Audita em **9 categorias** e cobre as frentes laterais que
o esqueleto da Ariadne não tinha: orçamento de crawl, análise de sitemap, crawlers de IA e scanners
de risco.

## As 9 categorias

1. **Crawlabilidade** — `robots.txt` existe/válido/não bloqueia recursos críticos; sitemap XML existe e
   referenciado no robots; `noindex` intencional vs acidental; profundidade de crawl (páginas
   importantes a ≤3 cliques da home); conteúdo que exige JS; **orçamento de crawl** em sites grandes.
2. **Indexabilidade** — canonical auto-referente sem conflito com `noindex`; duplicação (near-dup,
   URLs com parâmetro, www vs não-www); thin content vs mínimo por tipo; paginação; hreflang; index
   bloat (páginas inúteis consumindo budget).
3. **Segurança** — HTTPS forçado, SSL válido, sem mixed content; headers (CSP, HSTS, X-Frame-Options,
   X-Content-Type-Options, Referrer-Policy); preload HSTS para sites de alta segurança.
   *(O módulo canônico de SSRF/DNS-pinning é cross-cutting do **Égide**.)*
4. **Estrutura de URL** — URLs limpas/hifenizadas/sem parâmetro de conteúdo; hierarquia lógica; sem
   cadeias de redirect (máx. 1 hop, 301 para mudança permanente); flag >100 caracteres; barra final
   consistente.
5. **Mobile** — viewport, CSS responsivo, touch targets ≥48x48px com 8px de espaço, fonte base ≥16px,
   sem scroll horizontal. **Mobile-first indexing está 100% completo desde 5-jul-2024** — o Google
   indexa exclusivamente com o Googlebot mobile.
6. **Core Web Vitals** — thresholds e medição de campo ficam em `core-web-vitals-e-performance`; aqui
   só o flag de presença.
7. **Dados estruturados** — detecção JSON-LD (preferido) / Microdata / RDFa, validação contra tipos
   suportados; análise completa no `engenheiro-de-schema`.
8. **Renderização JavaScript** — flag de CSR vs SSR e frameworks SPA; o pipeline de render fica em
   `render-js-e-spa`. **Guia JS SEO (dez/2025):** sirva canonical, meta robots, dados estruturados,
   title e meta description no **HTML inicial server-rendered** — não confie em injeção via JS:
   canonical divergente entre HTML cru e JS pode ser ignorado; `noindex` no HTML cru pode ser honrado
   mesmo se o JS o remove; o Google **não** renderiza JS em páginas com status ≠ 200; schema injetado
   por JS tem processamento atrasado (crítico em e-commerce).
9. **IndexNow** — protocolo de indexação para Bing/Yandex/Naver (não Google); recomende implementação
   para indexação mais rápida fora do Google. Submissão fica em `apis-google-e-indexacao`.

## Orçamento de crawl (sites grandes, >10k páginas)
A eficiência do crawl vira gargalo: corte index bloat (parâmetros, facetas, paginação infinita,
duplicatas), encurte cadeias de redirect, mantenha as páginas de valor rasas, e use o sitemap +
`lastmod` honesto para sinalizar o que mudou. **Análise de log de servidor** é a fonte de verdade do
que o Googlebot realmente rastreia: cruze os hits do Googlebot (frequência por diretório, status
servidos, desperdício em URLs de baixo valor) contra as páginas de receita para realocar budget. *(O
repo-fonte não traz parser de log executável — é técnica reescrita como princípio; a Ariadne pode
provisionar um parser depois.)*

## Análise de sitemap XML
**Validação:** XML válido; <50.000 URLs por arquivo; todas retornam 200; `<lastmod>` reais (não todos
iguais); `<priority>`/`<changefreq>` são ignorados pelo Google (pode remover); referenciado no
robots; cruzar páginas crawleadas vs sitemap e marcar faltantes. **Qualidade:** índice de sitemaps se
>50k; split por tipo (pages/posts/images/videos); só URLs canônicas, indexáveis, não-redirecionadas e
HTTPS. **Geração:** aplicar os mesmos guards anti-thin do programático (⚠️ aviso em 30+ páginas de
localização, 🛑 hard stop em 50+) e gerar índice ao passar de 50k.

## Scanners de risco / lint técnico
Varreduras pontuais que pegam riscos fora das 9 categorias: **parasite-SEO** (subdomínio/subpasta
alugada explorando autoridade alheia), **deprecação de features do GBP**, **histórico do domínio**
(domínio expirado com herança tóxica), **rótulo IPTC de IA** em imagens, e **UCP** (Universal Commerce
Protocol). Surfaceie como **oportunidade/risco**, não como falha cega.

## Gestão de crawlers de IA (2025-2026)
Decida a estratégia de visibilidade em IA antes de bloquear. Tokens em `robots.txt`: `GPTBot`
(treino OpenAI), `ChatGPT-User` (browsing em tempo real), `ClaudeBot` (treino Anthropic),
`PerplexityBot`, `Bytespider` (ByteDance), `Google-Extended` (treino Gemini — **não** afeta indexação
de busca nem AI Overviews, que usam `Googlebot`), `CCBot` (Common Crawl). Bloquear `GPTBot` não
impede o ChatGPT de citar via browsing. Cruze com `otimizador-ai-seo` para a estratégia GEO completa.

## Regras Kolden
- **Égide:** SSRF/DNS-pinning e validação de URL são do Égide; todo fetch passa por lá.
- **Infisical:** qualquer credencial (PSI/GSC para enriquecer) via `infisical-padrao`.
- **Hipótese vs fato:** cada flag técnico vem com evidência (header observado, status, doc oficial).

---
## Atribuição
Princípio extraído de `AgriciDaniel/claude-seo@d830cdb` (skills `seo-technical`, `seo-sitemap` e os
scripts de risco `parasite_risk`/`gbp_deprecation_lint`/`domain_history`/`iptc_ai_label`/`ucp_check`;
licença MIT). Reescrito em PT-BR para a Kolden, sem cópia literal. Os parsers executáveis (sitemap,
log de servidor, scanners) ficam como referência/tooling a provisionar.
