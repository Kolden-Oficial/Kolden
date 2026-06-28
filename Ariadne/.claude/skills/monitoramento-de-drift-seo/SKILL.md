---
name: monitoramento-de-drift-seo
description: >
  Use quando a demanda for monitorar mudanças/regressões de SEO no tempo:
  capturar um baseline ("estado bom conhecido") de elementos SEO-críticos de uma
  página, comparar o estado atual contra o baseline e rastrear o histórico —
  "Git para SEO". Gatilhos: "drift de SEO", "baseline", "rastrear mudanças",
  "quebrou alguma coisa", "regressão de SEO", "antes e depois", "checagem
  pós-deploy", "o tráfego caiu, o que mudou". É uma frente NOVA da Ariadne.
---

# Monitoramento de Drift de SEO

Frente nova da Ariadne. **Git para o seu SEO:** captura baselines, detecta regressões e rastreia mudanças no tempo. Resolve a pergunta "o tráfego caiu — o que mudou na página?".

## O que o baseline captura
Snapshot dos elementos SEO-críticos de uma página: `title`, meta description, `canonical`, `meta robots`, H1/H2/H3 (arrays), schema JSON-LD (array), Open Graph, Core Web Vitals, status HTTP, e dois hashes SHA-256 (HTML body e schema) para detecção barata de qualquer alteração.

## Três operações
1. **baseline `<url>`** — valida a URL (proteção SSRF), faz fetch, parseia o HTML, opcionalmente puxa CWV, gera os hashes e grava o snapshot.
2. **compare `<url>`** — carrega o baseline mais recente, refaz o fetch do estado atual, roda o conjunto de regras de comparação, classifica os achados por severidade e grava o resultado.
3. **history `<url>`** — lista baselines e comparações (mais novo primeiro) com timestamps.

## Motor de comparação
Aplica um conjunto de regras de diff em **3 níveis de severidade**:
- **CRÍTICO** — mudança que quebra SEO, perda de tráfego provável (ex.: `noindex` adicionado, canonical removido, status virou erro, schema removido). Resposta imediata.
- **AVISO** — impacto potencial, investigar (ex.: title/meta alterados, regressão de CWV, mudança de estrutura de heading). Dentro de 1 semana.
- **INFO** — só ciência, pode ser intencional. Revisar quando der.

A persistência é local (baselines + comparações), com **normalização de URL** consistente (scheme/host minúsculo, remover porta padrão e UTMs, ordenar query, remover barra final) para casar a mesma página entre execuções.

## Fluxos típicos
- **Pré/pós-deploy:** `baseline` antes do deploy → `compare` depois. Pega regressão antes de virar perda de tráfego.
- **Monitoramento contínuo:** `baseline` inicial → `compare` periódico → `history` para ver a linha do tempo.
- **Investigar queda de tráfego:** `compare` (o que mudou) + `history` (quando mudou).

## Roteamento por achado
Cada drift recomenda o especialista certo: schema removido → `engenheiro-de-schema`; regressão de CWV/canonical/noindex → `auditor-tecnico-seo`; title/meta/OG → `estrategista-de-conteudo-seo`; mudança de heading → revisão de E-E-A-T.

## Saída
Diff estruturado: regras disparadas com valor antigo/novo, severidade e ação recomendada; opção de relatório consolidado; histórico quando pedido.

## Regras Kolden
- **Égide:** todo fetch passa por validação de URL/SSRF (segurança cross-cutting) — sem `curl` solto, sempre o pipeline validado. TLS sempre verificado; queries parametrizadas.
- Captura mesmo páginas com 4xx/5xx (o status É um campo rastreado).
- **Infisical:** chave de PSI/CrUX (para CWV no baseline) via Infisical (`infisical-padrao`).

---
## Atribuição
Princípio extraído de `AgriciDaniel/claude-seo@d830cdb` (skill `seo-drift`, original_author Dan Colta — Pro Hub Challenge; + reference das 17 regras, licença MIT). Reescrito em PT-BR para a Kolden, sem cópia literal. O conjunto detalhado de 17 regras com thresholds fica como referência a provisionar.
