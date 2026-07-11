---
name: search-query-analise
description: |
  Análise de Search Query Report (SQR) — n-gram mining, taxonomia de negativas em escala,
  classificação de intent (informational / navigational / transactional / commercial),
  gatilho para expansão de keyword, framework SQOS (Search Query Optimization Score). Use
  quando o pedido for "SQR", "search query report", "análise de busca", "termos que
  dispararam", "n-gram", "negativas em escala", "keyword intent", "query mining", "SQOS",
  "quais queries estão desperdiçando budget". NÃO é keyword research pré-lançamento (aí
  handoff Ariadne para SEO); NÃO é expansão de asset (aí `criativo-como-hipotese-rsa-pmax`).
license: MIT
allowed-tools:
  - Read
  - Write
  - Edit
  - Grep
  - Glob
  - AskUserQuestion
tipo: skill
area: Peitho
up: "[[Peitho/_MOC-peitho]]"
---

# Análise de Search Query Report — n-gram + intent + SQOS (PT-BR)

O SQR (Search Query Report do Google Ads / Bing / Amazon) é o registro do que os
consumidores **realmente escrevem** antes de clicar. Ler o SQR bem revela: keywords que
canibalizam, intent misaligned, produtos que o cliente pede e você não vende, oportunidades
de expansão. Ignorar o SQR é ignorar o próprio consumidor.

## Herança histórica

- **Perry Marshall — "80/20 Sales & Marketing" (2013)** — provou que 80% do gasto em
  broad match vai para 20% das queries; a régua de negativas em escala é dele.
- **Frederick Vallaeys (Optmyzr)** — automatizou n-gram analysis como produto e definiu
  SQOS (Search Query Optimization Score) como métrica de saúde do SQR.
- **Brad Geddes ("Advanced Google AdWords")** — codificou a taxonomia intent-based de
  negativas.
- **Wil Reynolds (Seer Interactive)** — publicou o padrão "query intent tagging" que
  virou best practice de agência.

## Anatomia do SQR

Cada linha do SQR carrega:
- Query real digitada
- Keyword que fez o match
- Match type acionado
- Impressões / Clicks / Custo / Conversões / Conv value
- CTR / CPC / Conv rate

Um SQR de conta $100K+/mês vem com 5.000-50.000 linhas por mês. Ler linha por linha é
impossível. Você precisa de **n-gram**.

## N-gram analysis

N-gram = grupo de N palavras adjacentes. Um SQR virou dataset de n-grams revela padrões
que a query bruta esconde.

### Como fazer

1. **Unigram** (1 palavra): ranqueia por gasto / conv rate / CTR.
2. **Bigram** (2 palavras adjacentes): ex.: "free trial" vs. "sign up".
3. **Trigram** (3 palavras): ex.: "how to build".

Métricas por n-gram:
- Custo total onde o n-gram aparece.
- Conv rate médio quando o n-gram aparece vs. não aparece.
- CPA médio quando o n-gram aparece.
- Delta (n-gram_present_conv_rate - baseline_conv_rate).

### Uso prático

- N-gram com **delta positivo** e volume: candidato a nova keyword / ad group / campanha.
- N-gram com **delta negativo forte** e gasto alto: candidato a negativa em escala.
- N-gram com **CPA >2× conta**: negativa se não estratégico.
- N-gram genérico ("cheap", "free", "how to") em BOFU: quase sempre negativa.

## Taxonomia de intent (4 níveis)

Padrão de mercado:

| Intent | Modificadores típicos | Fase do funil |
|---|---|---|
| **Informational** | "how to", "what is", "guide", "tutorial" | TOFU |
| **Navigational** | "{brand}", "login", "site:{brand}" | brand |
| **Commercial** | "best", "review", "vs", "comparison", "top 10" | MOFU |
| **Transactional** | "buy", "price", "pricing", "quote", "near me", "deal", "coupon" | BOFU |

Aplicar tag a cada query permite reportar por intent. Descoberta comum: 40-60% do gasto
em conta B2B vai para queries informational que nunca convertem em prazo curto.

## Taxonomia de negativas em escala

Nem toda negativa é igual. Categorias:

### 1. Absolutas (sempre negar)
- Concorrentes proibidos por política.
- Termos vulgares ou irrelevantes.
- Palavras que sinalizam wrong audience ("kids", "for children" em produto adulto; "job",
  "career" quando você não contrata; "free" em produto pago não-freemium).

### 2. Condicionais (por campanha)
- "diy", "how to" — negar em BOFU, permitir em TOFU.
- "template", "example" — negar se não vende template.
- Marcas concorrentes — depende do tier (permitir só em campanha Conquest).

### 3. Escalonáveis (learned)
- N-grams descobertos como wasted spend no próprio SQR.
- Consolidados semanal ou quinzenalmente.
- Manter lista mãe versionada.

### 4. Cross-campaign
- Aplicadas a nível de conta ou lista compartilhada.
- Evita reaplicação em cada nova campanha.

## Framework SQOS (Search Query Optimization Score)

SQOS é a saúde geral do SQR. Score composto (0-100):

| Dimensão | Peso | Como medir |
|---|---|---|
| % queries que geram conv | 25 | conv_queries / total_queries × 100 |
| % gasto em queries com CPA <= target | 25 | wisely_spent / total_spent × 100 |
| % queries intent-aligned com campanha | 20 | tagged_correctly / total × 100 |
| % gasto em n-grams positivos | 15 | positive_ngram_spend / total_spent × 100 |
| Taxa de negativas descobertas last-week | 15 | new_negatives / opportunity × 100 |

Score total:
- 80-100: SQR saudável.
- 60-79: espaço claro para melhoria; sprint de otimização.
- <60: sangramento; auditoria completa via `auditoria-forense-200-checkpoints`.

## Ciclo de otimização quinzenal

- **Sexta**: puxa SQR das últimas 2 semanas.
- **Segunda**: n-gram analysis + intent tagging.
- **Terça**: propõe adds (novas keywords/ad groups) e negativas.
- **Quarta**: revisão com stakeholder (impacto estimado).
- **Quinta**: implementação em bulk (Editor).
- **Sexta seguinte**: leitura de impacto (delta CPA por campanha).

## Anti-padrões

- **Ler SQR sem n-gram** — 30.000 linhas, você vê 100, perde 99.7% do padrão.
- **Negar sem tagging** — cria bagunça, negativa dupla, campanha morre em silêncio.
- **Adicionar keyword nova sem A/B na campanha existente** — perde histórico e sinal.
- **Negativa "phrase" quando deveria ser "exact"** — corta mais do que deveria.
- **SQR só uma vez por trimestre** — n-grams migram semanalmente; oportunidade morre.
- **Ignorar intent na hora de negar** — negar "how to" em TOFU seria um erro.

## Fronteiras inter-squad

- **Análise de SQR + n-gram + negativas + expansão** — Peitho faz (esta habilidade).
- **Keyword research pré-lançamento (SEO/discovery)** — handoff a **Ariadne**.
- **Copy da nova keyword expandida** — handoff a **Caliope**.
- **Análise semântica avançada / clustering ML de queries** — handoff a **Metis**.

## Formato de saída

1. SQOS da conta com decomposição por dimensão.
2. Top 20 unigrams / bigrams / trigrams por gasto e por conv rate.
3. Lista de negativas propostas categorizada (absoluta / condicional / escalonável /
   cross-campaign).
4. Lista de expansão proposta (novas keywords / ad groups).
5. Intent tagging da amostra top-100 queries por gasto.
6. Impacto estimado por proposta ($/mês economizado ou ganho).

## Referências

- `references/ngram-analysis-guide.md` — passo-a-passo com fórmulas.
- `references/taxonomia-de-negativas.md` — biblioteca de negativas por vertical.

---

Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B02/paid-media
(IDs PM-G20, G21, G22). Herança histórica: Perry Marshall, Frederick Vallaeys (Optmyzr),
Brad Geddes, Wil Reynolds (Seer). Sem cópia literal do upstream.
