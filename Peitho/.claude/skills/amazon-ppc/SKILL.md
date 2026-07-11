---
name: amazon-ppc
description: |
  Amazon PPC fásico em 3 estágios (Launch / Growth / Mature) com ACOS/TACOS targets por fase,
  isolamento de match type, negative keyword pipeline, dayparting por conversion rate horária,
  cross-campaign structure (Sponsored Products + Sponsored Brands + Sponsored Display). Use
  quando o pedido for "Amazon PPC", "Amazon Ads", "Sponsored Products", "Sponsored Brands",
  "Sponsored Display", "ACOS", "TACOS", "listing profitability", "launch phase Amazon",
  "dayparting Amazon", "Amazon organic rank via PPC", "vender na Amazon". NÃO é Google Search
  (aí `arquitetura-enterprise-ppc`); NÃO é Amazon DSP (aí `programatica-e-display`); NÃO é
  otimização de listing (aí handoff Caliope para copy do listing).
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

# Amazon PPC — fásico Launch / Growth / Mature (PT-BR)

Amazon PPC opera em economia diferente do Google/Meta: (a) o objetivo primário no início não
é vender, é subir organic rank; (b) ACOS "ruim" na fase Launch é normal — é investimento em
rank; (c) TACOS é a régua honesta, não ACOS isolado. Esta habilidade define o playbook
fásico e as métricas por fase.

## Herança histórica

- **Elizabeth Greene / Junglr** — codificou o modelo fásico Launch / Growth / Mature em
  posts públicos 2020-2023.
- **Brent Zahradnik (AMZ Pathfinder)** — introduziu ACOS breakeven vs. ACOS target por
  fase; e a ideia de "ACOS agressivo no Launch como custo de aquisição de rank".
- **Perpetua / Skai (adtech)** — automação dos ciclos Auto → Broad → Phrase → Exact.
- **Helium 10 / Jungle Scout** — dados de mercado (search volume, keyword rank) que virou
  padrão de research.

## As 3 fases do Amazon PPC

Cada fase tem meta primária, ACOS aceito e estrutura tática diferente.

| Fase | Meta primária | ACOS target | TACOS target | Duração |
|---|---|---|---|---|
| **Launch** | organic rank | 60-100% (ok perder no PPC) | 15-30% | 30-90 dias |
| **Growth** | escala com margem controlada | 30-50% | 15-25% | 3-9 meses |
| **Mature** | profitability | <25% | 8-15% | ongoing |

### ACOS vs. TACOS

- **ACOS** = Ad Spend / Ad Revenue. Métrica do canal.
- **TACOS** = Ad Spend / Total Revenue (org + paid). Métrica do negócio.

TACOS <15% em Mature significa que o PPC está catalisando organic, não canibalizando.

## Estrutura fásica

### Launch (0-90 dias)

Objetivo: coletar keywords + subir organic rank.

Estrutura:
- **Sponsored Products (SP) Auto — Discovery**: budget baixo-médio, deixar Amazon
  encontrar keywords.
- **SP Manual Broad — Research**: broad match nas keywords descobertas.
- **SP Manual Phrase — Research**: phrase das mesmas.
- **SP Manual Exact — Winners**: exact das top 10-20 keywords que converteram.

Cadência:
- Semana 1-4: Auto + Broad; coletar 4-8 semanas de SQR.
- Semana 5-8: mover keywords para Phrase; começar Exact.
- Semana 9-12: consolidar Exact; começar SB (Sponsored Brands) e SD (Sponsored Display).

ACOS aceito: 60-100%. Se ACOS chega em 60% já no dia 30, você está escalando cedo demais.

### Growth (90-270 dias)

Objetivo: escalar com margem controlada. Rank orgânico começa a compensar PPC.

Estrutura completa:
- **SP** completo (Auto + Broad + Phrase + Exact).
- **SB (Sponsored Brands)**: video + banner headline; drive brand + rank.
- **SD (Sponsored Display)**: retargeting + audience targeting + product targeting.

Cadência:
- Consolidar keywords vencedoras em campanhas exclusivas Exact.
- Aumentar budget em SP Exact das top 20 keywords.
- Introduzir SB video (converte 30-50% melhor que SB static).
- Adicionar SD retargeting de product page visitors.

ACOS aceito: 30-50%. Se subir acima de 60%, algo quebrou (competitor sale, listing suit).

### Mature (270+ dias)

Objetivo: profitability. PPC vira % pequena do revenue total.

Estrutura otimizada:
- SP: 80% em Exact das top keywords; Auto ainda gira para pescar novas.
- SB: video em brand + variações;
- SD: audience targeting + product targeting refinado.
- Dayparting ativo (bid modifier por hora do dia).
- Negative keyword pipeline maduro.

ACOS target: <25%. TACOS target: 8-15%.

## Cross-campaign structure — SP + SB + SD

Cada tipo joga papel:

| Tipo | Papel | Placement |
|---|---|---|
| **SP (Sponsored Products)** | motor de conversion | search results + product pages |
| **SB (Sponsored Brands)** | brand awareness + destaque | top of search |
| **SB Video** | attention high + conv | top of search |
| **SD Product Targeting** | roubar cliente de concorrente | product pages |
| **SD Audience** | retargeting + LAL | off-Amazon + Amazon |

Split de budget típico em Growth:
- 60-70% SP
- 15-25% SB
- 10-15% SD

## Isolamento de match type

- Auto campaigns: sem restrição, pesca keywords.
- Broad campaigns: broad das keywords descobertas.
- Phrase campaigns: phrase das mesmas.
- Exact campaigns: exact das top winners.

Regras invioláveis:
- **Cada match type em sua campanha própria** (não mesmo ad group).
- **Negative keywords**: exact keyword negativa em Broad/Phrase; phrase keyword negativa em
  Broad. Evita canibalismo.
- **Bid mais alto no Exact** que no Phrase que no Broad (natural, exact = mais qualified).

## Negative keyword pipeline

Semanal:
1. Puxar SQR das últimas 2 semanas.
2. Identificar queries com gasto >2× CPA sem conversão.
3. Adicionar como negative em nível de ad group (não conta — permite reactivate se
   condição mudar).
4. Escalonar padrões em negative list compartilhada.

## Dayparting (bid modifier por hora)

Amazon Advertising suporta bid modifier por hora do dia via bulk sheet ou API. Como
implementar:

1. Puxar dados de 60 dias: `revenue` e `conversions` por hora do dia.
2. Calcular conversion rate por hora.
3. Definir bid modifier:
   - Hora com conv rate > baseline + 20%: modifier +25%.
   - Hora com conv rate baseline ±20%: modifier 0.
   - Hora com conv rate < baseline - 30%: modifier -50%.
4. Aplicar via bulk sheet mensalmente.

Contas em maturidade ganham 8-20% de eficiência com dayparting bem calibrado.

## Anti-padrões

- **Julgar ACOS de Launch com régua de Mature** — pausa cedo, produto não indexa.
- **Ir direto para Exact sem passar por Auto/Broad** — perde keywords que você não pensou.
- **Ignorar TACOS** — ACOS pode subir enquanto TACOS cai (PPC canibaliza organic) — situação
  ruim mascarada por métrica de canal.
- **SB Video ignorado em Growth** — perde 30-50% de conversion.
- **Negative keywords em conta inteira** — mata Auto discovery em outros produtos.
- **Não usar SB Video em brand campaign** — deixa competitor dominar top of search.
- **Dayparting antes de ter 60 dias de dados por hora** — bid modifier no ruído.

## Fronteiras inter-squad

- **Estrutura fásica + ACOS/TACOS target + campanhas + negatives + dayparting** — Peitho
  faz (esta habilidade).
- **Copy do listing (title, bullets, description, A+ content, brand story)** — handoff a
  **Caliope** (`estrutura-de-pagina-de-vendas` adaptada para Amazon listing).
- **Imagens do listing + vídeos + A+ content design** — handoff a **Aglaia**.
- **Amazon DSP off-Amazon** — passa a `programatica-e-display` (mesmo squad, Amazon DSP
  section).
- **Amazon SEO orgânico (rank sem paid)** — handoff a **Ariadne** (`seo-ecommerce`).

## Formato de saída

1. Diagnóstico de fase (Launch / Growth / Mature) baseado em: idade do listing, organic
   rank atual, ACOS/TACOS histórico, review count.
2. ACOS target + TACOS target da fase.
3. Estrutura de campanhas (SP + SB + SD) com match type isolation.
4. Split de budget entre SP/SB/SD.
5. Cadência de otimização (research → move → consolidate).
6. Negative keyword pipeline.
7. Dayparting (se dados suficientes).

## Referências

- `references/matriz-fasica.md` — matriz completa por fase.

---

Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B02/marketing
(ID MKT-G30). Herança histórica: Elizabeth Greene (Junglr), Brent Zahradnik (AMZ
Pathfinder), Perpetua/Skai, Helium 10/Jungle Scout. Sem cópia literal do upstream.
