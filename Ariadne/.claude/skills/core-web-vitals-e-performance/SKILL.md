---
name: core-web-vitals-e-performance
description: >
  Use quando a demanda for medir ou OTIMIZAR a performance / Core Web Vitals de
  uma página com dados REAIS de campo (CrUX) e de laboratório (PageSpeed/Lighthouse):
  LCP, INP, CLS, TTFB, FCP, decomposição do LCP em subpartes, tendência de 25
  semanas e detecção de preload/bfcache/speculation rules. Gatilhos: "Core Web
  Vitals", "CWV", "LCP/INP/CLS", "PageSpeed", "site lento", "otimizar velocidade",
  "CrUX", "field data", "dados de campo", "minha nota do PageSpeed", "TTFB",
  "Lighthouse". Aprofunda o auditor-tecnico-seo na dimensão de performance.
---

# Core Web Vitals & performance

Frente que dá à Ariadne **dado de campo real** (Chrome User Experience Report) em vez de só estimativa
de laboratório. CWV é um sinal **de desempate**: pesa mais quando a qualidade do conteúdo entre
concorrentes é parecida.

## Thresholds atuais (p75 de usuários reais, fev/2026)

| Métrica | Bom | A melhorar | Ruim |
|---|---|---|---|
| **LCP** (Largest Contentful Paint) | ≤2,5s | 2,5–4,0s | >4,0s |
| **INP** (Interaction to Next Paint) | ≤200ms | 200–500ms | >500ms |
| **CLS** (Cumulative Layout Shift) | ≤0,1 | 0,1–0,25 | >0,25 |

Fatos que evitam erro: **INP substituiu o FID** em 12-mar-2024 e o FID foi removido de todas as tools
do Chrome em 9-set-2024 — **nunca** referencie FID. Avaliação no **percentil 75** de campo (CrUX).
Google avalia em nível de **página** e de **origem**. Thresholds **não mudaram** desde a definição
original — ignore blogs falando em "thresholds apertados". O core update de dez/2025 pareceu pesar
**CWV mobile** mais forte.

## Campo (CrUX) vs laboratório (Lighthouse)
- **Campo / field data** (usuários reais, é o que o Google usa para ranquear): CrUX, PageSpeed
  Insights (consome CrUX), relatório de CWV do Search Console. Janela de ~28 dias.
- **Laboratório / lab data** (simulado, ótimo para debugar): Lighthouse, WebPageTest, DevTools.
- Regra: **rankeie pelo campo, debugue pelo laboratório.** CrUX 404 = tráfego insuficiente (não é erro
  de auth) — caia para dado de laboratório como proxy e avise.

## Operações
- **PageSpeed combinado** — Lighthouse (lab, pontual) + CrUX (campo, 28 dias), mobile + desktop. CrUX
  tenta nível de URL primeiro, cai para nível de origem.
- **CrUX puro** — só dado de campo p75 (mais rápido, sem rodar Lighthouse).
- **Histórico CrUX de 25 semanas** — direção da tendência (melhorando/estável/piorando), variação % e
  p75 semanal por métrica. É como você prova que uma otimização funcionou.

## Diagnóstico do LCP por subpartes
LCP decompõe em quatro fases (somam o LCP total) — use para achar **onde** está o gargalo:

| Subparte | O que mede | Alvo |
|---|---|---|
| **TTFB** | resposta do servidor | <800ms |
| **Resource Load Delay** | do TTFB até começar a requisitar o recurso | minimizar |
| **Resource Load Time** | download do recurso do LCP | depende do tamanho |
| **Element Render Delay** | do recurso carregado até renderizar | minimizar |

TTFB alto → backend/CDN/cache. Load Delay alto → recurso descoberto tarde (preload). Load Time alto →
imagem pesada (WebP/AVIF, dimensionar). Render Delay alto → JS/CSS bloqueando.

## Aceleração: preload / bfcache / speculation rules
Detecte e recomende: `<link rel=preload>` para o recurso do LCP; elegibilidade de **bfcache**
(back/forward cache) e o que a bloqueia (`unload`, `Cache-Control: no-store`); **Speculation Rules
API** (prerender/prefetch) para navegação quase instantânea. Para imagens, mire CWV junto do SEO de
imagem (ver `seo-de-imagens`): dimensões explícitas previnem CLS; lazy-load correto não atrapalha o
LCP do herói.

## Gotcha de SPA
Medição de CWV em SPA é ponto cego (ver `render-js-e-spa`): a Soft Navigations API (Chrome 139+) ainda
é experimental e sem peso de ranqueamento. Ao detectar React/Vue/Angular/Svelte, avise a limitação.

## Saída
Cada métrica com semáforo (Bom / A melhorar / Ruim), sempre com **nota de frescor do dado** e a fonte
(campo vs lab). Otimizações entram como **hipótese mensurável** (o que muda, qual subparte ataca, como
medir o antes/depois pelo histórico CrUX).

## Regras Kolden
- **Infisical:** a API key de PSI/CrUX vem via `infisical-padrao`, nunca em texto puro.
- **Égide:** validação de URL/SSRF antes de qualquer chamada com URL do usuário.
- **Hipótese vs fato (veto da Ariadne):** estimativa de laboratório é rotulada como tal; ranqueamento
  só se argumenta com dado de campo.

---
## Atribuição
Princípio extraído de `AgriciDaniel/claude-seo@d830cdb` (skill `seo-google`, reference `cwv-thresholds`
e scripts `pagespeed_check`/`crux_history`/`lcp_subparts`/`preload_check`; licença MIT). Reescrito em
PT-BR para a Kolden, sem cópia literal. Os scripts executáveis de PSI/CrUX ficam como tooling a
provisionar (chave via Infisical).
