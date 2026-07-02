---
name: arquitetura-de-site-hub-spoke
description: >
  Use para DESENHAR a arquitetura de conteúdo de um site em clusters hub-and-spoke
  baseados em SOBREPOSIÇÃO REAL DE SERP (não similaridade textual). Cobre expansão
  de seed keyword (30-50 variantes), medição de overlap por URLs compartilhadas no
  top-10 do Google (thresholds: 7-10 = mesma página / 4-6 = mesmo cluster / 2-3 =
  interlink / 0-1 = separar), classificação de intenção (informacional/comercial/
  transacional; navegacional excluído), seleção de template por intenção
  (guide/how-to/listicle/comparison/review/landing), matriz bidirecional de links
  internos (pillar↔spoke obrigatório, spoke↔spoke 2-3, cross-cluster 0-1) e o
  scorecard pós-execução (coverage, link density, orphan pages, cannibalization).
  É a camada operacional do `arquiteto-de-site`. Gatilhos: "topic cluster", "content
  cluster", "hub and spoke", "pillar page", "cluster de tópicos", "arquitetura de
  conteúdo", "pillar-and-spoke", "canibalização de keyword", "estrutura de blog",
  "site architecture". Cópia final → Caliope; briefing por post → brief-de-conteudo-data-driven.
---

# Arquitetura de Site Hub-and-Spoke por SERP-overlap

Aprofunda o `arquiteto-de-site` com o método que troca **similaridade textual por
sobreposição real do que o Google já ranqueia**. Duas keywords só entram no mesmo
cluster se o Google concorda — não se você acha que "são parecidas".

## 1. Por que SERP-overlap vence text-similarity

Text-similarity (TF-IDF, embeddings) agrupa por parecença de vocabulário. Mas o
Google já decidiu, na SERP, o que é o mesmo tópico: se `melhores CRMs 2026` e
`software de CRM` compartilham 7 URLs no top-10, o Google trata como o mesmo tema.
Dividir em duas páginas só canibaliza. Text-similarity não pega isso — SERP-overlap sim.

## 2. Workflow em 6 etapas

### Etapa 1 — Expansão da seed keyword (30-50 variantes)

A partir da seed, gerar 30-50 variantes usando busca real (WebSearch/Firecrawl com
autorização, ou DataForSEO se provisionado):

- **Related searches** — extrair "related" e "people also search for" da SERP.
- **People Also Ask** — todas as PAA da SERP.
- **Long-tail modifiers** — anexar: "melhor", "como", "vs", "para iniciantes",
  "ferramentas", "exemplos", "guia", "template", "erros", "checklist".
- **Question mining** — variantes quem/o que/quando/onde/por que/como.
- **Intent modifiers** — "preço", "review", "alternativa", "comparação", "grátis",
  "top".

**Deduplicação:** normalizar (lowercase, remover artigos), remover duplicata
exata. Alvo: 30-50 únicas. Se <30, segunda passada com as PAA como novas seeds.

### Etapa 2 — Clustering por SERP-overlap (o coração)

Comparação pairwise das variantes:

1. Agrupar por intenção-inicial (reduz o custo do pairwise).
2. Para cada par candidato dentro do grupo, buscar as duas keywords.
3. Contar URLs compartilhadas no **top-10 orgânico** (ignorar ads, featured
   snippet, PAA, sitelinks).
4. Aplicar thresholds:

| URLs compartilhadas | Relação | Ação |
|---|---|---|
| 7-10 | Mesma página | Merge — atacar as duas keywords numa página só |
| 4-6 | Mesmo cluster | Agrupar sob mesmo spoke cluster |
| 2-3 | Interlink | Colocar em clusters adjacentes + cross-link |
| 0-1 | Separar | Clusters diferentes ou excluir |

**Otimização de custo pairwise:** com 40 keywords, o pairwise completo dá 780
comparações. Reduzir para ~180:

- Pré-agrupar por intenção (4 grupos de ~10 → 4 × 45 = 180 comparações).
- Cross-check só nas bordas entre grupos.
- Pular pares onde ambas são long-tail da mesma head term (assumir mesmo cluster).

**DataForSEO** (se provisionado): usar `serp_organic_live_advanced` em vez de
WebSearch. Antes de cada batch, checar custo; se `blocked`, cair para busca
autorizada pelo Ronan.

### Etapa 3 — Classificação de intenção

| Intenção | Sinais | Entra no cluster? |
|---|---|---|
| Informacional | "como", "o que", "por que", "guia", "tutorial", "aprender" | Sim |
| Comercial | "melhor", "top", "review", "comparação", "vs", "alternativa" | Sim |
| Transacional | "comprar", "preço", "desconto", "cupom", "assinar" | Sim |
| Navegacional | nome de marca, produto específico, "login" | **Não — excluir** |

Remover navegacionais do cluster. Bordas ficam marcadas para revisão manual.
Casos mistos ("melhor software de CRM") — classificar pela intenção dominante.

### Etapa 4 — Arquitetura hub-and-spoke

1. **Selecionar o pillar** — maior volume, intenção mais ampla, maior overlap
   com as demais.
2. **Agrupar spokes em clusters** — 2-5 clusters por pillar, cada um em subtópico
   claro.
3. **Alocar posts** — 2-4 spokes por cluster.
4. **Template por intenção**:

| Intenção | Template |
|---|---|
| Informacional ampla | ultimate-guide (pillar) |
| Informacional "como" | how-to |
| Informacional "lista" | listicle |
| Informacional "conceito" | explainer |
| Comercial "comparar" | comparison ("X vs Y") — ver `analise-de-gap-de-conteudo` |
| Comercial "avaliar" | review |
| Comercial "rankear" | best-of (roundup) |
| Transacional | landing-page |

5. **Alvo de word count**:
   - Pillar: **2.500-4.000** palavras.
   - Spoke: **1.200-1.800** palavras.

6. **Checagem de canibalização** — nenhuma dupla de posts compartilha keyword
   primária. Se overlap ≥7, merge.

### Etapa 5 — Matriz bidirecional de links internos

| Tipo | Direção | Regra |
|---|---|---|
| Spoke → Pillar | obrigatória | todo spoke linka |
| Pillar → Spoke | obrigatória | pillar linka todos os spokes |
| Spoke ↔ Spoke (dentro do cluster) | bidirecional | 2-3 por post |
| Spoke → Spoke (cross-cluster) | unidirecional | 0-1 por post |

Regras:
- Cada post recebe **≥3 links entrantes**.
- **Zero órfão** — todo post alcançável a partir do pillar em ≤2 cliques.
- Âncora usa a keyword-alvo ou variação próxima (nunca "clique aqui").
- Link no corpo, não só em nav/sidebar.

Adjacência JSON:
```json
{
  "links": [
    { "from": "pillar", "to": "cluster-0-post-0", "type": "mandatory", "anchor": "melhor crm para startups" },
    { "from": "cluster-0-post-0", "to": "pillar", "type": "mandatory", "anchor": "software de crm" },
    { "from": "cluster-0-post-0", "to": "cluster-0-post-1", "type": "sibling", "anchor": "crm free tier" },
    { "from": "cluster-0-post-1", "to": "cluster-0-post-0", "type": "sibling", "anchor": "crm para startups" },
    { "from": "cluster-0-post-0", "to": "cluster-1-post-0", "type": "cross", "anchor": "integração com pipeline de vendas" }
  ]
}
```

### Etapa 6 — Sitemap e visualização

- Sitemap dedicado do cluster (`/cluster-crm-sitemap.xml`) com `<lastmod>` real.
- Visualização em SVG interativa (opcional; o repo-fonte tem template
  `cluster-map.html` — na Ariadne, executar como tooling é diferido).
- Exportar `cluster-plan.json` (dados) + `cluster-plan.md` (humano).

## 3. Scorecard pós-execução

| Métrica | Alvo | Como medir |
|---|---|---|
| Coverage | 100% | posts escritos / posts planejados |
| Link density | 3+ | links internos por post |
| Orphan pages | 0 | posts com <1 link entrante |
| Cannibalization | 0 conflitos | dupla de keyword primária |
| Image count | 1+ | posts com pelo menos uma imagem |
| Pillar links | 100% | todo spoke ↔ pillar |
| Cross-links | ≥80% | recomendados spoke↔spoke implementados |
| Content gaps | 0 | planejados pulados ou incompletos |

## 4. Importação de plano estratégico

Quando o cluster nasce de um plano já feito (`planejamento-por-industria-seo`):

1. Ler o `SEO-STRATEGY.md` mais recente do projeto — parsear tabelas de
   keywords, page types, pillars, URL structure.
2. Validar dado extraído — duplicatas, keywords faltantes, entradas incompletas.
3. Enriquecer com SERP overlap sobre as keywords extraídas.
4. Construir o cluster usando essas keywords como set inicial (pula a Etapa 1).

Se nenhum plano existe → rodar `planejamento-por-industria-seo` primeiro (ou dar
seed keyword direta).

## 5. Padrões de canibalização típicos e o fix

- **Post generalista + post específico** com mesma primary → merge do específico
  no generalista (ou vice-versa, se o específico for mais valioso).
- **Dois posts comerciais para keywords quase-idênticas** ("melhor CRM" vs "top
  CRM") — merge, canonical do menor pro maior.
- **Post + página de produto** para keyword transacional → produto ganha; blog
  vira informacional adjacente.
- **Categoria + subcategoria** com mesma primary → hierarquia de silo; sub
  linka pra pai; canonical NÃO cruzado (cada uma tem a sua).

## 6. Gotchas de execução

- **Não confie em text-similarity só** — a canibalização de SEO real é decidida
  na SERP, não no espaço vetorial.
- **Excluir domínios não-concorrentes** ao contar overlap (Wikipedia, Reddit,
  YouTube, .gov, diretórios) — ver `brief-de-conteudo-data-driven/references/dominios-excluidos.md`.
- **SERP muda** — recalcular overlap a cada 6 meses ou após atualização core
  do Google que afeta o vertical.
- **AI Overviews inflam sem tráfego** — se a keyword tem AIO agressivo, tráfego
  cai mesmo top-1. Reflexo: acoplar cluster com `geo-ai-overviews-aprofundado`
  para presença citável.

## 7. Saída padrão

```
CLUSTER PLAN: [pillar keyword]
Volume estimado do pillar: [XXX/mês, fonte / hipótese]
Modelo: 1 pillar (2.500-4.000 palavras) + [N] clusters × [M] spokes (1.200-1.800)
Total: [N × M + 1] posts, ~[palavras totais]

ETAPA 1 — Expansão: [N] variantes únicas
ETAPA 2 — Overlap:  [tabela pairwise com URLs compartilhadas + threshold aplicado]
ETAPA 3 — Intenção: [distribuição por tipo; navegacionais excluídas]
ETAPA 4 — Estrutura:
  Pillar: [keyword] → template ultimate-guide → URL /[slug]
  Cluster 1 [nome]:
    - post-1 [keyword] → template [X] → URL /[slug]
    - post-2 [keyword] → template [X] → URL /[slug]
  [...]
ETAPA 5 — Matriz de links: N obrigatórios, M cross-links, 0 órfãos
ETAPA 6 — Sitemap: /[slug]-sitemap.xml

CANIBALIZAÇÃO: [detectada / não detectada; merges recomendados]
GAP com atual: [posts existentes que atendem / gaps a preencher]
```

## Handoffs e regras Kolden

- **arquiteto-de-site** (dono): esta skill é o método operacional dele.
- **estrategista-de-conteudo-seo** (interno): cada spoke vira brief no
  `brief-de-conteudo-data-driven`.
- **Argos** (entrada): SERP e volume. Sem provisão de tool → hipótese rotulada.
- **Caliope** (saída): copy dos posts.
- **engenheiro-de-schema-executavel** (interno): `Article` no spoke,
  `BreadcrumbList` na hierarquia, `ItemList` no pillar se roundup.
- **Metis** (saída): monitorar coverage/orphan/canibalização em produção.
- **VETO — não canibalizar**: overlap ≥7 obriga merge; nunca dois posts brigando
  pela mesma primária.
- **VETO — hipótese sem dado**: volume/dificuldade sem tool provisionado é
  hipótese rotulada, nunca fato.

---
## Atribuição
Princípios extraídos de `AgriciDaniel/claude-seo@d830cdb` (skill `seo-cluster`,
autor original Lutfiya Miller — Pro Hub Challenge; `references/serp-overlap-methodology.md`
e `references/hub-spoke-architecture.md`; licença MIT). Reescrito em PT-BR para a
Kolden, sem cópia literal. Trade-off text-similarity vs SERP-overlap alinha com
posição pública de HubSpot (Cluster Model, Sam Oh) e Ahrefs (Topical Authority
via SERP overlap, Patrick Stox).
