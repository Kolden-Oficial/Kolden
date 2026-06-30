---
name: sizing-tam-sam-som-com-ressalva
description: |
  Use quando precisar dimensionar TAM/SAM/SOM para HANDOFF — pitch deck para investidor/board,
  oferta para Pluto, persona para Aglaia. NUNCA use para decidir se ideia vale validar
  (XYZ Hypothesis de Savoia prevalece em validação primária). Exige top-down + bottom-up reconciliados,
  3 cenários com premissas, e cláusula de ressalva explícita "este sizing assume PMF".
domain: discovery-and-validation
subdomain: market-sizing
agente_primario: [alberto-savoia]
heranca_historica: [bill-aulet, tien-tzuo, vc-pitch-deck-canonico]
tags: [tam, sam, som, market-sizing, ressalva-savoia, handoff-only]
cross_links:
  - aletheia/mapa-competitivo-swot-gap
  - aletheia/pesquisa-de-tendencia-e-sinais-fracos
  - pluto (handoff oferta)
  - aglaia (handoff persona)
veto:
  - "NÃO substitui XYZ Hypothesis em validação primária"
  - "NÃO usar para decidir validar ideia"
fonte_upstream: msitarzewski--agency-agents@a597cb6 (G22)
---

# Sizing TAM/SAM/SOM (com ressalva Savoia)

> _Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (G22, MIT). **Ressalva crítica:** esta skill **complementa** Savoia para handoff externo — NUNCA substitui XYZ Hypothesis em validação primária._

## Ressalva inicial (não-negociável)

> **TAM/SAM/SOM não substitui validação.** É um exercício de DIMENSIONAMENTO para handoff a stakeholders externos (Pluto/oferta, Aglaia/marca, investidor) DEPOIS que a evidência de demanda já existe. Em VALIDAÇÃO PRIMÁRIA, use XYZ Hypothesis de Savoia ("X% de Y vão fazer Z, evidenciado por Z'").

O especialista primário (`alberto-savoia`) só aceita TAM/SAM/SOM como **output de handoff**, NUNCA como **input de decisão**. Se a missão for "vale investir nesta ideia?", devolva ao roteiro de descoberta (`roteiro-de-entrevista`, `mapa-de-assuncoes`, `desenho-de-experimento`) antes de qualquer sizing.

## O que é

- **TAM (Total Addressable Market):** mercado total se 100% comprassem a categoria. Exemplo: "todos os profissionais que poderiam usar X".
- **SAM (Serviceable Available Market):** subset do TAM que você pode atender (geografia, segmento, canal).
- **SOM (Serviceable Obtainable Market):** subset do SAM que você pode realisticamente capturar em N anos.

## Quando usar (e quando NÃO usar)

**USAR para:**
- Pitch deck para investidor/board.
- Handoff para Pluto (decisão de oferta/preço/canal).
- Handoff para Aglaia (decisão de posicionamento/persona ICP).
- Dimensionamento estratégico (entrar ou não em vertical X).

**NÃO USAR para:**
- Decidir se uma ideia vale validar (use XYZ Hypothesis de Savoia).
- Convencer-se de que "o mercado é grande, então vou achar cliente" (Savoia: _"even a 1% of huge market is huge — and usually wrong"_).
- Substituir entrevistas (TAM grande não significa que ALGUÉM quer pagar pelo seu produto).
- Comprovar product-market fit (TAM é potencial, PMF é evidência).

## Método em 4 passos

### 1. Top-down vs. bottom-up — sempre fazer AMBOS

- **Top-down:** "indústria X movimenta US$ N bilhões; nosso slice é Y%" — vem de relatórios (Gartner, IBGE, Statista). Cuidado: indústrias categorizam diferente do que você vende.
- **Bottom-up:** "número de prospects × ticket médio × frequência" — vem de dado próprio + estimativa razoável.

Se TOP-DOWN e BOTTOM-UP **divergem em mais de 3x**, alguma das premissas está errada. Reconcilie antes de apresentar.

### 2. Definir o "addressable" com restrições explícitas

- **Geografia:** país, região, língua.
- **Segmento:** B2B (porte) ou B2C (faixa etária/renda/lifestyle).
- **Canal:** quem pode comprar com a infraestrutura atual (self-serve vs. sales-led muda 10x).
- **Regulação:** mercados onde você pode operar (licenças, certificações).
- **Modelo de receita:** assinatura vs. transação vs. anúncio.

### 3. Calcular SOM com janela temporal

SOM 1 ano ≠ SOM 5 anos. **Sempre indique a janela.**

Fórmula bottom-up canônica:

```
SOM = N prospects no SAM × CR (conversion rate) × ARPU (avg revenue per user) × Retenção
```

- **N prospects:** conta o SAM aplicando restrição realista.
- **CR:** dado próprio se existir; benchmark do setor se não.
- **ARPU:** ticket médio observado.
- **Retenção:** % que continua pagando após 12 meses.

### 4. Apresentar com 3 cenários

- **Conservador (P30):** premissas pessimistas.
- **Esperado (P50):** premissas medianas.
- **Otimista (P70):** premissas otimistas (NÃO o pior caso ao contrário do conservador).

Cada cenário com premissas explícitas e **alteráveis na planilha** (sensitivity analysis).

## Critérios de qualidade

- **TAM cita fonte primária** (relatório com data, não Wikipedia).
- **SAM aplica 3+ restrições explícitas** (geo + segmento + canal).
- **SOM tem janela temporal** (ano 1, 3, 5).
- **3 cenários** com premissas alteráveis.
- **Top-down e bottom-up reconciliados** (divergência <3x).
- **Cláusula de invalidação:** "se [premissa X] cair em mais de Y%, este número está errado".

## Anti-padrões

- TAM de uma indústria inteira ("US$ 100B mercado de software global") — _meaningless_.
- SAM = TAM × 1% (preguiça).
- "Captamos 10% do SAM" — _fantasy unless you prove_.
- Sem janela temporal (TAM = SOM).
- Sem premissas explícitas (impossível auditar).
- TAM antes de XYZ Hypothesis (_cart before horse_).
- Comparar com competitor's "ARR" como se fosse market size.

## Saída padrão

1. **Planilha** com top-down + bottom-up + 3 cenários, todos os números editáveis.
2. **One-pager** com TAM/SAM/SOM + 3 cenários + 3 premissas-chave de invalidação.
3. **Cláusula de ressalva visível:** _"este sizing assume PMF; validação primária é via Aletheia (XYZ Hypothesis)"_.

## Handoffs

- **Pluto:** oferta/preço/canal informados pelo SOM.
- **Aglaia:** ICP refinada pelo SAM.
- **Olimpo** (board/investidor): TAM/SAM/SOM como contexto estratégico.

## Anti-handoff (explícito)

- **NÃO handoff para validação primária** — Aletheia continua via XYZ Hypothesis.
- **NÃO entrega para early go-to-market** sem PMF evidenciado.

## Cross-links

- **Aletheia `mapa-competitivo-swot-gap`:** sizing dos gaps identificados.
- **Aletheia `pesquisa-de-tendencia-e-sinais-fracos`:** contexto macro.
- **Pluto:** handoff oferta.
- **Aglaia:** handoff persona/posicionamento.

## Herança histórica

- TAM/SAM/SOM consolidado em pitch decks de VC (~2000s).
- **Albert Bourla / SRI:** dimensionamento de mercado clássico.
- **Alberto Savoia (contra-corrente):** XYZ Hypothesis prevalece em validação.
- **Bill Aulet** (_Disciplined Entrepreneurship_) — bottom-up rigoroso.
- **Tien Tzuo** (_Subscribed_) — SaaS sizing por ACV × N customers.
