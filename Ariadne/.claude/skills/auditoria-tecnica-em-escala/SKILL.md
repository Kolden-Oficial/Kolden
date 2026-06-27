---
name: auditoria-tecnica-em-escala
description: >
  Use quando a demanda for auditar um SITE INTEIRO (não uma página só) de SEO
  técnico em escala: crawlear o domínio, detectar o tipo de negócio e disparar
  vários especialistas EM PARALELO, consolidando tudo num health score e plano
  de ação priorizado. Também cobre a análise profunda de UMA página específica.
  Gatilhos: "auditar meu site", "auditoria completa de SEO", "site audit",
  "checagem geral", "saúde do site", "analisa essa página a fundo",
  "por que meu site não ranqueia" (quando for diagnóstico amplo).
  É o motor de orquestração do auditor-tecnico-seo. NÃO é coleta de SERP/keyword
  (isso é handoff Argos).
---

# Auditoria técnica em escala (crawl + fan-out paralelo)

Frente que aprofunda o `auditor-tecnico-seo`. Resolve a auditoria de um **site inteiro** com
**execução paralela de subagentes** — não uma varredura linear lenta — e também a **análise
profunda de uma página única**.

## Dois modos

### Modo SITE — auditoria completa com fan-out
Pipeline canônico:
1. **Renderizar a home** (render SPA-aware — ver `render-js-e-spa`) para capturar HTML cru, HTML
   renderizado, texto extraído e status de SPA.
2. **Detectar o tipo de negócio** (SaaS, e-commerce, local, publisher, agência) pelos sinais da home.
   O tipo decide quais frentes condicionais entram.
3. **Crawlear o site** seguindo links internos, respeitando `robots.txt`, seguindo redirects (máx. 3
   hops), com concorrência limitada e atraso entre requisições (defesa de educação + anti-429).
4. **Fan-out de especialistas em PARALELO** (via Agent tool, nunca em loop sequencial quando dá para
   paralelizar). Frentes **sempre presentes** + **condicionais** disparadas por sinal:

   | Frente | Quando dispara | Onde vive na Ariadne |
   |---|---|---|
   | SEO técnico (9 categorias) | sempre | `seo-tecnico-profundo` |
   | Conteúdo / E-E-A-T / thin | sempre | `estrategista-de-conteudo-seo` |
   | Schema / dados estruturados | sempre | `engenheiro-de-schema` |
   | Sitemap | sempre | `seo-tecnico-profundo` |
   | Performance / Core Web Vitals | sempre | `core-web-vitals-e-performance` |
   | Visual / mobile / above-fold | sempre | `render-js-e-spa` |
   | AI search / GEO / llms.txt | sempre | `otimizador-ai-seo` |
   | SXO (mismatch de tipo de página) | sempre | `sxo-search-experience` |
   | SEO local (GBP/NAP/reviews) | tipo = local/SAB/híbrido | `seo-local-e-mapas` |
   | Mapas (geo-grid) | local + dados de mapa disponíveis | `seo-local-e-mapas` |
   | Dados de campo Google (CrUX/GSC/GA4) | credenciais Google presentes | `apis-google-e-indexacao` |
   | Drift | existe baseline para a URL | `monitoramento-de-drift-seo` |
   | E-commerce (product/marketplace) | tipo = e-commerce | `seo-ecommerce` |
   | Backlinks (DA/PA, domínios) | **handoff Argos** (coleta) | — |

5. **Score** — agregar num **SEO Health Score (0-100)** com pesos por categoria (técnico ~22%,
   conteúdo ~23%, on-page ~20%, schema ~10%, performance ~10%, AI search ~10%, imagens ~5% — ajuste
   por tipo de negócio).
6. **Persistir artefatos** sob `{dominio}-audit/`: relatório completo, achados por categoria em
   `findings/*.md`, screenshots, e um **envelope JSON estruturado** (`audit-data.json`) que alimenta
   o relatório (ver `relatorios-de-seo`).
7. **Plano de ação priorizado** + oferta de relatório PDF/HTML.

### Modo PÁGINA — análise profunda de uma URL
Cobre, em uma página: on-page (title 50-60c, meta 150-160c, 1 H1, hierarquia H2-H6, URL, links
internos/externos), qualidade de conteúdo (contagem vs mínimo do tipo, legibilidade, densidade
natural 1-3%, sinais E-E-A-T, frescor), elementos técnicos (canonical, meta robots, Open Graph,
Twitter Card, hreflang), schema (detectar + validar + oportunidades), imagens (alt, peso >200KB
aviso / >500KB crítico, WebP/AVIF, dimensões p/ CLS, método de lazy-load) e flags de risco de CWV
(LCP/INP/CLS observáveis pelo HTML). Saída: scorecard por dimensão + issues por prioridade + JSON-LD
pronto para as oportunidades.

## Prioridade dos achados (vocabulário único do squad)
- **Crítico** — bloqueia indexação ou causa penalidade → corrigir já.
- **Alto** — impacta ranqueamento de forma relevante → 1 semana.
- **Médio** — oportunidade de otimização → 1 mês.
- **Baixo** — nice-to-have → backlog.

## Síntese antes de recomendar (anti-achismo)
Todo achado bruto passa pela disciplina **PERCEBER → ANALISAR → VALIDAR → AGIR** antes de virar
recomendação: colete sinais sem pontuar; audite suas próprias suposições (a home não representa o
site; "baixo tráfego" ≠ "baixo valor"; limitação de CMS costuma ser contornável; achado da v1 pode
não valer após update do Google); só então conecte e priorize. **Recomendação que não passou pelas
quatro fases é um achado, não uma recomendação.**

## Tratamento de erro
URL inacessível → reporte o erro, não invente conteúdo. `robots.txt` bloqueia → audite só o acessível
e registre a limitação. 429 → reduza concorrência e reporte parcial. Site grande estoura timeout →
limite o crawl, reporte o que foi coberto e estime o escopo total.

## Regras Kolden
- **Égide:** todo fetch/crawl passa pela validação de URL/SSRF (sem `curl` solto). Respeite sempre
  `robots.txt`.
- **Infisical:** chaves de PSI/CrUX/GSC via `infisical-padrao`, nunca em texto puro.
- **Handoff Argos:** backlinks, posições de SERP, volume de keyword e perfil de concorrência são
  **coleta** → entram na auditoria como insumo do Argos, a Ariadne não os coleta.
- **Hipótese vs fato (veto da Ariadne):** todo achado vem com a evidência (crawl/GSC/PSI/doc oficial);
  sem dado, é rotulado **hipótese**.

---
## Atribuição
Princípio extraído de `AgriciDaniel/claude-seo@d830cdb` (skills `seo-audit`, `seo-page` e o
`thinking-framework` de 10 princípios; licença MIT). Reescrito em PT-BR para a Kolden, sem cópia
literal. O envelope JSON detalhado, os pesos finos por tipo de negócio e o framework completo das 10
fases ficam como referência a provisionar.
