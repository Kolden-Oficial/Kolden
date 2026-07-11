---
name: mapa-competitivo-swot-gap
description: |
  Use quando precisar mapear o espaço competitivo com método (não opinião): identificar tipo de mercado
  (Steve Blank), mapear concorrentes em 3 anéis (direto/indireto/substituto), SWOT rigoroso com evidência,
  gap analysis em 3 dimensões (feature/segmento/modelo), positioning map em eixos relevantes. Bidirecional
  com Argos (esta skill = estratégico; Argos = monitoring ao vivo).
domain: discovery-and-validation
subdomain: competitive-analysis
agente_primario: [steve-blank]
heranca_historica: [albert-humphrey-swot, michael-porter-5-forces, blue-ocean, wardley-maps]
tags: [competitive-analysis, swot, gap-analysis, positioning, market-type, blue-ocean]
cross_links:
  - aletheia/pesquisa-de-tendencia-e-sinais-fracos
  - aletheia/mapa-de-assuncoes
  - aletheia/sizing-tam-sam-som-com-ressalva
  - argos (intel ao vivo bidirecional)
  - pluto (oferta para gap)
  - aglaia (posicionamento de marca)
fonte_upstream: msitarzewski--agency-agents@a597cb6 (G23)
tipo: skill
area: Aletheia
up: "[[Aletheia/_MOC-aletheia]]"
---

# Mapa Competitivo, SWOT e Gap Analysis

Especialista primário: `steve-blank` (Market Type). Herança histórica: **Albert Humphrey** (SWOT,
Stanford SRI, anos 1960) + **Michael Porter** (5 Forces, 1979) + **Kim/Mauborgne** (Blue Ocean) +
**Simon Wardley** (Wardley Maps).

## O que é mapa competitivo

Visão sistemática do espaço onde o produto opera, identificando concorrentes diretos/indiretos,
suas forças/fraquezas, e **gaps** (lacunas exploráveis). Não é planilha de "preço vs. features" —
é diagnóstico estratégico ancorado em evidência verificável.

## Tipos de mercado (Steve Blank) — fazer ANTES

Antes de qualquer análise competitiva, **identificar o tipo de mercado**. Cada tipo exige análise
diferente — não copie framework do tipo errado.

| Tipo | Concorrentes | Risco | Pergunta-chave |
|---|---|---|---|
| **Existing market** | claros | execução vs. incumbentes | "Por que melhor/mais barato/mais rápido?" |
| **Resegmented (niche)** | claros mas mal-servidos | atendimento de sub-segmento | "Por que esse nicho está mal-servido?" |
| **Resegmented (low-cost)** | claros mas caros | margem | "Como entregar 80% por 20% do custo?" |
| **New market** | nenhum direto | adoção e categoria | "Como ensinar o mercado a comprar isso?" |
| **Clone market** | concorrentes em outro país | localização | "Por que aqui ainda não tem?" |

## Método em 5 passos

### 1. Definir o mercado e o escopo
- Outcome do cliente (JTBD) — concorrentes são quem mais entrega esse outcome, incluindo soluções
  não-tecnológicas (planilha, papel, "não fazer nada").
- Defina dimensões: geografia, segmento, faixa de preço, modelo de negócio.

### 2. Mapear concorrentes em 3 anéis
- **Anel 1 — Diretos:** mesmo outcome + mesmo modelo (ex.: Notion vs. Coda).
- **Anel 2 — Indiretos:** mesmo outcome + modelo diferente (ex.: Notion vs. Word+Excel).
- **Anel 3 — Substitutos:** outcome diferente que pode roubar uso (ex.: Notion vs. ChatGPT como segundo cérebro).

Ignorar anel 3 = perder onde o cliente realmente decide.

### 3. SWOT por concorrente (rigoroso)
Para cada concorrente do anel 1+2:

- **Strengths (forças):** o que ele faz bem, com evidência observável (review G2, market share, growth rate, retenção).
- **Weaknesses (fraquezas):** dor verbalizada pelo cliente (review negativo, ticket de suporte, churn reason).
- **Opportunities (oportunidades):** vácuo que **você** pode ocupar (não significa que ELE pode).
- **Threats (ameaças):** movimento dele que pode te tirar do mercado.

**ANTI-PADRÃO:** SWOT genérico sem evidência ("força: marca forte"). Cada bullet exige evidência verificável.

### 4. Gap analysis (3 tipos)
- **Gap de feature:** capacidade que cliente quer e ninguém entrega.
- **Gap de segmento:** cliente desatendido (pequeno demais para incumbentes, ou cultural/geográfico).
- **Gap de modelo:** preço, contrato, distribuição, suporte.

Cada gap precisa: **evidência de demanda** (entrevista, dado) + **dificuldade de explorar**
(barreira de entrada) + **tamanho da oportunidade** (handoff `sizing-tam-sam-som-com-ressalva`).

### 5. Positioning map (2D)
Plote concorrentes em 2 eixos **relevantes para o cliente**:
- Ex.: simplicidade × poder (no-code/low-code).
- Ex.: preço × profundidade (consultoria vs. SaaS).
- Ex.: customização × time-to-value.

Identifique o **white space** — quadrante vazio com demanda real (handoff para `mapa-de-assuncoes`).

## Frameworks complementares (use seletivamente)

- **Porter 5 Forces** — dinâmica setorial (poder de compradores, fornecedores, novos entrantes, substitutos, rivalidade).
- **BCG Matrix** — portfólio (Star/Cash Cow/Question Mark/Dog). Útil para incumbente, não startup.
- **Blue Ocean (Kim/Mauborgne)** — eliminação/redução/aumento/criação de fatores.
- **Wardley Mapping** — evolução de componentes ao longo da cadeia de valor.

## Saída padrão

1. **Mapa competitivo visual** (positioning map + 3 anéis).
2. **Quadro SWOT** por concorrente do anel 1+2 (3-7 concorrentes max).
3. **Lista de gaps** priorizada por demanda × dificuldade.
4. **Handoff cards:** Argos (intel ao vivo), Pluto (oferta para gap), Aglaia (posicionamento de marca).

## Anti-padrões

- "Não temos concorrente" — sempre tem (substituto, status quo, "não fazer nada").
- SWOT sem evidência (vira retórica).
- Ignorar anel 3 (substitutos roubam decisão).
- Positioning map em eixos genéricos (preço × qualidade) — use eixos relevantes ao cliente.
- Mapa estático (concorrência muda; atualize trimestral).
- Análise sem decisão (vira relatório, não input para roadmap).
- Copiar concorrente líder (você vira "ele com menos") — gaps são onde construir diferenciação.

## Cross-links e handoffs

- **Argos** (competitive intel executável): bidirecional — esta skill cuida do método estratégico,
  Argos cuida de monitoring ao vivo.
- **Aletheia `pesquisa-de-tendencia-e-sinais-fracos`:** input macro.
- **Aletheia `mapa-de-assuncoes`:** cada gap vira hipótese.
- **Aletheia `sizing-tam-sam-som-com-ressalva`:** size do gap.
- **Pluto:** oferta para o gap.
- **Aglaia:** posicionamento de marca no positioning map.

## Herança histórica

- **Albert Humphrey** (Stanford SRI, 1960s) — SWOT.
- **Michael Porter** (Harvard, 1979) — Five Forces.
- **Steve Blank** — Market Types (*The Four Steps to the Epiphany*).
- **W. Chan Kim & Renée Mauborgne** — Blue Ocean Strategy.
- **Simon Wardley** — Wardley Maps.

## Handoff para o squad

`aletheia-chief` → `steve-blank` lidera (Market Type primeiro) → SWOT por concorrente → gap
analysis → handoff Argos/Pluto/Aglaia conforme natureza do gap.

---

> _Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (G23, MIT)._
