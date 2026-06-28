---
name: otimizacao-on-page-por-intencao
description: >
  Use para AUDITAR uma página única e produzir um scorecard on-page por dimensão, sempre
  ancorado na intenção de busca que a SERP premia. Cobre elementos on-page (title/meta/H1/
  hierarquia/URL/links), meta técnicas (canonical/robots/Open Graph/Twitter/hreflang),
  detecção de schema, checagem de imagens e flags de Core Web Vitals a partir do HTML.
  É a camada de auditoria executável (scorecard 0-100 por dimensão) sob os frameworks
  `intencao-de-busca` e `otimizacao-on-page` do estrategista-de-conteudo-seo. Gatilhos:
  "analisar esta página", "checar SEO da página", "auditoria on-page", "page analysis",
  "essa URL está otimizada?", "por que esta página não ranqueia?". Copy → Caliope.
---

# Otimização On-Page por Intenção (auditoria de página única)

Audita UMA página e devolve um **scorecard por dimensão** — a camada executável dos frameworks
`intencao-de-busca` e `otimizacao-on-page` do `estrategista-de-conteudo-seo`. Regra-mãe: **intenção
primeiro** — confirme na SERP o TIPO de página que o Google premia antes de julgar qualquer title.
Página de produto não ranqueia query informacional; o melhor on-page do mundo não salva mismatch de intenção.

## 0. Intenção (porta de entrada)
Classifique: informacional / navegacional / comercial / transacional. Leia a SERP da keyword-alvo
(que formato domina: guia, comparativo, listagem, landing, FAQ) e o ângulo dominante; identifique a
lacuna entre o que ranqueia e o que falta. Só então audite o on-page contra esse formato. Se a página
é de tipo errado para a intenção, esse é o issue Crítico — nenhuma micro-otimização vem antes.

## 1. On-page
- **Title:** 50-60 caracteres, primária no início, único.
- **Meta description:** 150-160 caracteres, atraente, com a primária.
- **H1:** exatamente um, casa a intenção, com a primária.
- **H2-H6:** hierarquia lógica (sem pular nível), descritivos (heading descreve conteúdo, não estiliza).
- **URL:** curta, descritiva, hifenizada, sem parâmetro.
- **Links internos:** suficientes, âncora relevante, sem página órfã.
- **Links externos:** a fontes com autoridade, contagem razoável.

## 2. Qualidade de conteúdo (resumo — detalhe na skill irmã)
Cobertura vs. piso do tipo de página; keyword natural (0,5-2%) + variações semânticas; sinais de
E-E-A-T (bio/credencial/experiência de primeira mão); frescor (data de publicação/atualização).
Auditoria profunda de E-E-A-T e gap de citação → `qualidade-de-conteudo-eeat`.

## 3. Elementos técnicos
- **Canonical:** presente, self-referencing ou correto.
- **Meta robots:** index/follow salvo bloqueio intencional.
- **Open Graph:** og:title, og:description, og:image, og:url.
- **Twitter Card:** twitter:card, twitter:title, twitter:description.
- **Hreflang:** se multi-idioma, implementação correta (detalhe → `seo-internacional-hreflang`).

## 4. Schema
Detectar todos os tipos (JSON-LD preferencial); validar propriedades obrigatórias; apontar
oportunidades ausentes. **NUNCA** recomendar HowTo (depreciado) nem FAQ para rich results (aposentado
em mai/2026) — manter FAQPage existente como sinal de citação em IA; usar QAPage para Q&A genuíno.
**Limite:** `web_fetch`/curl não enxergam JSON-LD injetado por JS — validar só por browser/Rich
Results Test (reforço do `engenheiro-de-schema`).

## 5. Imagens
Alt presente e descritivo (primária onde natural); tamanho — flag >200KB (warning), >500KB (crítico);
formato WebP/AVIF sobre JPEG/PNG; width/height setados (previne CLS); lazy-loading — reportar o método
(native / perfmatters / ewww / js-generic / none) e **não** sinalizar "sem lazy" quando um lazy-loader
JS (Perfmatters/EWWW/lazysizes) é detectado (eles removem o `loading="lazy"` nativo de propósito e usam
`data-src`). Detalhe de imagem → `seo-de-imagens`.

## 6. Core Web Vitals (referência — não medível só do HTML)
Sinalize potencial: **LCP** (hero gigante, recurso render-blocking); **INP** (JS pesado, sem
async/defer); **CLS** (dimensão de imagem faltando, conteúdo injetado). Medição real (PSI/CrUX) é do
`auditor-tecnico-seo`/Metis, não desta skill.

## Saída
```
ALVO: [URL] | keyword [k] | intenção [tipo] | SERP premia [formato] | analisado [data BRT]
Score geral: XX/100
On-Page:        XX/100  ████████░░
Conteúdo:       XX/100  ██████████
Técnico:        XX/100  ███████░░░
Schema:         XX/100  █████░░░░░
Imagens:        XX/100  ████████░░
[!] Mismatch de intenção: [sim/não — se sim, é o issue Crítico]
Issues: Crítico → Alto → Médio → Baixo
Recomendações: específicas + impacto esperado
Schema sugerido: JSON-LD pronto para as oportunidades detectadas
```

## Handoffs e regras Kolden
- **Argos** (entrada): SERP/intenção/volume da keyword-alvo.
- **Caliope** (saída): a copy a partir do briefing on-page (aqui só estrutura/intenção).
- **qualidade-de-conteudo-eeat** (irmã): auditoria profunda de E-E-A-T e gap de citação.
- **engenheiro-de-schema** / **auditor-tecnico-seo** (internos): validação de schema por browser; CWV real.
- **Metis** (saída): medição de posição/tráfego pós-otimização — não é desta skill.
- **VETO:** sem black-hat; recomendação sem dado é rotulada hipótese.

---
## Atribuição
Princípios extraídos de `AgriciDaniel/claude-seo@d830cdb` (skills `seo-page`/`seo-content`, autor
AgriciDaniel; licença MIT). Reescrito em PT-BR para a Kolden, sem cópia literal.
