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

## Metas absolutas de aceite (release gate)

CWV não é métrica de "queremos melhorar" — é **gate binário de release** para páginas críticas
(landing, checkout, PDP). O que passa E não passa:

| Métrica | Meta de aceite | Como medir | Regra dura |
|---|---|---|---|
| **LCP** | **≤ 2,5s** | p75 CrUX (campo, 28 dias) — NUNCA só lab | Se p75 CrUX >2,5s → não sobe |
| **INP** | **≤ 200ms** | p75 CrUX (campo) | Se p75 CrUX >200ms → não sobe |
| **CLS** | **≤ 0,1** | p75 CrUX (campo) | Se p75 CrUX >0,1 → não sobe |
| **TTFB** | ≤ 800ms | CrUX + lab | Sinal de backend, não bloqueia release sozinho |
| **FCP** | ≤ 1,8s | CrUX + lab | Sinal auxiliar |

Regras adicionais Kolden:
- **p75 CrUX é a régua** — não média, não lab. Se média é ok mas p75 falha, o release falha.
- **Sem dado de campo (CrUX 404)?** Cair para lab (Lighthouse mobile) com **budget 20% mais
  apertado** — se lab passa por pouco, campo pode falhar. Regate: LCP lab ≤2,0s se sem CrUX.
- **Regressão pós-deploy:** se p75 CrUX degrada >10% na janela seguinte, dispara alerta →
  investigar com histórico de 25 semanas + LCP subparts + comparar com deploy anterior.
- **Página crítica sem CrUX suficiente (tráfego <1000/sem):** rodar RUM próprio (web-vitals lib)
  em produção para gerar p75 próprio; não confiar só em lab.
- **Exceção para AAA:** produto em nicho saúde/gov pode exigir LCP ≤1,5s + INP ≤100ms — subir
  o padrão, nunca baixá-lo por conveniência.

Gate operacional: antes do deploy que muda página crítica, Ariadne emite parecer
**PASS / CONCERNS / FAIL** com base nas metas acima + histórico CrUX de 25 semanas + lab do PR.

## Capacity planning com auto-scaling (perf sob carga)

Meta LCP <2,5s exige backend que aguenta pico. Kolden testa capacidade **antes** do deploy
crítico, não depois do alerta:

### Regra 10x — teste de degradação
Rodar `k6` (cross-link `benchmarking-com-k6-multi-stage` do Prometeu) em **10x a carga esperada
de pico** e medir:
- **P95 de latência do endpoint que serve o LCP** (HTML + API do above-the-fold + imagem hero)
- **TTFB do servidor** sob carga
- **Error rate** (deve continuar <1%)
- **Curva throughput × latência** — onde P95 sai de <500ms?

Se em 10x a P95 do endpoint LCP-crítico passa de 1s, o **LCP campo vai degradar em pico real**
mesmo com CDN. Isso é gate para deploy.

### Gatilhos de scale-up ANTES de degradar CWV
Configurar auto-scaling para acionar **antes** do LCP passar de 2s (não 2,5s — margem):
- **CPU >70%** por 2min consecutivos → +1 instância
- **P95 de endpoint LCP-crítico >600ms** por 1min → +1 instância
- **Requests em fila >100** → +2 instâncias imediato
- **TTFB p95 >500ms** → alerta + scale
- **CDN cache hit ratio <90%** → investigar (pode ser revalidação em massa)

Nunca esperar CPU 100%: quando chega lá, LCP já degradou 30s antes.

### Baseline versionado
Salvar em `docs/perf/capacity-<data>.md` para cada release crítico:
- Carga base (RPS típico)
- Carga pico observada (RPS peak)
- Multiplier testado (10x default)
- P95 sob 10x
- Auto-scaling triggers vigentes
- Custo mensal por instância (input do Plutos)

Regressão vs baseline anterior >20% em P95 → warning; >50% → bloqueio de release.

### Handoffs de capacity
- **Sizing errado (custo estoura)** → Aria (@architect Prometeu) revisa; Plutos calcula OPEX.
- **Auto-scaling lento demais** → @devops (Gage Prometeu) ajusta thresholds da plataforma.
- **CDN cache invalidando demais** → revisar `Cache-Control` no Ariadne + `Vary` headers.
- **DB é gargalo em pico** → Dara (@data-engineer Prometeu) revisa índice/pool/read replica.

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

**Extensão 2026-07-02** (bucket B03/engineering, IDs TEST G14 + TEST G16): adicionadas as seções
"Metas absolutas de aceite" (gate de release binário P75 CrUX) e "Capacity planning com
auto-scaling" (regra 10x, gatilhos de scale antes de degradar CWV, baseline versionado). Herança
histórica adicional: **Steve Souders** — *High Performance Web Sites* (2007), padrões de LCP e
render-blocking; **Ilya Grigorik** — *High Performance Browser Networking* (2013), TTFB e HTTP/2;
**Neil Gunther** — *Guerrilla Capacity Planning* (2007), curva throughput × latência (regra 10x);
**Nick Craver** (Stack Overflow) — capacity planning canonical case (2016). Cross-link
`benchmarking-com-k6-multi-stage` (Prometeu). Adaptado de `github.com/msitarzewski/agency-agents@a597cb6`
(MIT), bucket B03/engineering.
