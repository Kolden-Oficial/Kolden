---
name: render-js-e-spa
description: >
  Use quando o conteúdo da página depender de JavaScript / for um SPA (React, Vue,
  Angular, Svelte) e a auditoria precisar do estado RENDERIZADO, não só do HTML
  cru: renderizar com browser headless, comparar HTML cru vs renderizado, parsear
  os elementos SEO, capturar screenshot desktop+mobile, analisar above-the-fold e
  ler a árvore de acessibilidade. Gatilhos: "o conteúdo não aparece no HTML",
  "site em React/Vue/Angular", "SPA", "client-side rendering", "renderiza a
  página", "screenshot mobile", "above the fold", "página em branco no fetch",
  "schema injetado por JS". É o pipeline de captura por trás das auditorias.
tipo: skill
area: Ariadne
up: "[[Ariadne/_MOC-ariadne]]"
---

# Renderização JS-aware e SPA

Frente que dá olhos à Ariadne em sites onde `web_fetch`/`curl` enxergam só um esqueleto vazio. É o
**pipeline de captura** que alimenta a auditoria, o schema e o CRO quando o HTML cru não basta.

## Por que importa
Em SPA e páginas client-side, o HTML inicial pode vir quase vazio e o conteúdo (texto, links,
**JSON-LD**, canonical, meta robots) só existe após o JS rodar. Auditar o HTML cru nesse caso produz
falso negativo ("não tem schema", "não tem H1"). O Google **renderiza** — então a Ariadne também
precisa renderizar para auditar a verdade.

## O que o pipeline captura
Renderização com browser headless (modo `auto`: tenta cru, renderiza se detectar SPA) produzindo:
- **HTML cru** (resposta inicial do servidor) **e HTML renderizado** (pós-JS) lado a lado.
- **Texto extraído** e o **status de SPA** (framework detectado, CSR vs SSR).
- **Elementos SEO parseados** do estado renderizado: title, meta description, canonical, meta robots,
  H1-H6, JSON-LD, Open Graph, contagem/anchor de links.
- **Screenshots** desktop + mobile e análise **above-the-fold**.
- **Árvore de acessibilidade** (snapshot completo, não só `interesting_only`) — o sinal mais limpo de
  como agentes de IA leem a página.

## O diff que pega bugs de SEO em JS
Compare **cru vs renderizado** e levante:
- **Canonical divergente** — se o canonical do HTML cru difere do injetado por JS, o Google pode usar
  qualquer um. Garanta canonical idêntico nos dois.
- **`noindex` fantasma** — `noindex` no HTML cru removido por JS pode ainda ser honrado. Sirva a
  diretiva certa já no HTML inicial.
- **Status ≠ 200** — o Google **não** renderiza JS em páginas de erro; qualquer conteúdo/meta injetado
  por JS numa página non-200 é invisível ao Googlebot.
- **Schema atrasado** — Product/Article injetados por JS sofrem processamento atrasado; em e-commerce,
  sirva o schema no HTML server-rendered.
- **Conteúdo crítico só pós-JS** — texto, links internos ou H1 que só aparecem renderizados são risco
  de indexação parcial.

## Páginas amigáveis a agentes (forward-looking)
Agentes de IA leem o site por três canais: visão (screenshot), HTML/DOM e a **árvore de
acessibilidade** (o mais limpo). Critérios de auditoria — `<button>`/`<a>` reais (não `<div onclick>`),
`<label for>` associado, alvos interativos dimensionados, `cursor: pointer` correto, landmarks
semânticos, estabilidade de layout entre templates. Gere um **Agent-UX score** mas trate como
**oportunidade**, não como falha que reprova a auditoria — os padrões (WebMCP, agent UX) ainda são
embrionários.

## Limitação conhecida (gotcha de SPA)
Medição de **Core Web Vitals em SPA** ainda é ponto cego: a Soft Navigations API (Chrome 139+, origin
trial, jul/2025) é o primeiro passo mas **sem impacto de ranqueamento ainda**. Ao detectar SPA, avise
a limitação de medição de CWV de campo.

## Regras Kolden
- **Égide:** toda URL renderizada passa pela validação SSRF/DNS-pinning antes do browser abrir.
- **Reuso primeiro:** tente as tools nativas (web_extract/browser_*); só escale ao motor pesado do
  **Argos** (`argus-engine` / Crawlee / Scrapling) quando o render exigir anti-bot, JS pesado ou DOM
  hostil.
- **Infisical:** qualquer credencial de serviço de render via `infisical-padrao`.
- **Limitação de schema (veto da Ariadne):** nunca afirme "não tem schema" a partir de `web_fetch` —
  só por estado renderizado / Rich Results Test.

---
## Atribuição
Princípio extraído de `AgriciDaniel/claude-seo@d830cdb` (scripts `render_page`, `parse_html`,
`capture_screenshot`, `analyze_visual`, `agent_ux_check` + a guia JS SEO da skill `seo-technical`;
licença MIT). Reescrito em PT-BR para a Kolden, sem cópia literal. O renderizador Playwright
executável fica como tooling a provisionar (reuso do motor do Argos).
