---
name: paineis-de-equidade-de-marca
description: Use quando o pedido for medir equidade/saúde de marca no tempo, montar painel de tracking ou avaliar onde a marca está fraca nas dimensões CBBE — "equidade de marca", "brand equity", "tracking de marca", "CBBE", "saúde da marca", "como medir minha marca", "painel de marca". Aplica o modelo CBBE de Kevin Keller (4 dimensões — Salience → Performance+Imagery → Judgments+Feelings → Resonance), com cadência trimestral, survey próprio (n≥200/wave) e handoffs para Argos (social listening) e Metis (sales lift). NÃO use para medir NPS isolado (cobre 1 de 4 dimensões) nem para auditoria visual de marca.
domain: design
subdomain: brand-measurement
agente_primario: [aglaia-chief]
tags: [brand-equity, CBBE, keller, tracking, instrumentacao]
fonte_upstream: msitarzewski/agency-agents@a597cb6 (design/, MIT)
status: semente
tipo: skill
area: Aglaia
up: "[[Aglaia/_MOC-aglaia]]"
---

> **Atribuição:** semente adaptada de `msitarzewski/agency-agents@a597cb6` (MIT, divisão `design/`). Reescrita em PT-BR, sem cópia literal. Modelo CBBE de Kevin Lane Keller.

# Painéis de Equidade de Marca

Marca tem ativo, e ativo é mensurável. Esta habilidade implementa o **CBBE (Customer-Based Brand Equity) de Kevin Keller** como painel operacional — 4 dimensões, cadência trimestral, instrumentação clara.

## As 4 dimensões CBBE

### 1. Brand Salience (consciência)
**Pergunta-âncora:** quando o cliente pensa na categoria, ele lembra de nós? Em que ordem?
- **Brand recall:** "Cite marcas de [categoria]" — somos primeira? terceira? não citados?
- **Brand recognition:** "Você conhece [marca]?" — reconhecimento assistido.
- **Top of mind:** primeira marca citada espontaneamente.

**Indicador:** % de top of mind, posição média no ranking de recall.

### 2. Brand Performance + Brand Imagery (associações)
Duas faces:
- **Performance (funcional):** atributos do produto/serviço — qualidade, preço, durabilidade, atendimento. "Em que essa marca é objetivamente boa?"
- **Imagery (simbólico):** o que a marca representa além do produto — personalidade, valores, tipo de pessoa que usa. "Quem usa essa marca?"

**Indicador:** matriz de atributos × concorrentes (perfil de associações).

### 3. Brand Judgments + Brand Feelings (qualidade + emoção)
Duas faces:
- **Judgments (julgamento racional):** qualidade percebida, credibilidade, consideração, superioridade.
- **Feelings (emoção evocada):** calor, diversão, excitação, segurança, aprovação social, autorrespeito.

**Indicador:** scores por subdimensão (Likert 1-7), comparação com benchmark.

### 4. Brand Resonance (lealdade — topo da pirâmide)
A relação mais profunda:
- **Comportamental:** compra recorrente, frequência, share of wallet.
- **Atitudinal:** apego, identificação, defesa da marca em conversas.
- **Comunitário:** sente que pertence a um grupo de quem usa a marca.
- **Engajamento ativo:** investe tempo/dinheiro além da compra (eventos, conteúdo, advocacia).

**Indicador:** NPS é parte disso (advocacy) — mas só parte.

---

## Cadência trimestral

| Trimestre | Foco | Tamanho amostral |
|---|---|---|
| Q1 | Wave 1 — baseline + Salience | n ≥ 200 |
| Q2 | Wave 2 — Performance + Imagery | n ≥ 200 |
| Q3 | Wave 3 — Judgments + Feelings | n ≥ 200 |
| Q4 | Wave 4 — Resonance + consolidação anual | n ≥ 200 |

**Por que n ≥ 200:** abaixo disso, ruído estatístico engole a variação real entre waves.

**Análise:**
- **Tendência por dimensão:** subimos ou descemos em Salience nos últimos 4 trimestres?
- **Comparação com benchmark:** benchmark da categoria (Kantar/Nielsen quando disponível) ou benchmark próprio dos 3 maiores concorrentes diretos.
- **Cross-dimensão:** ganho de Salience sem ganho de Resonance = awareness vazia.

---

## Instrumentação

### Survey próprio (núcleo)
- **Ferramentas:** SurveyMonkey, Typeform, Qualtrics — montar questionário CBBE custom.
- **Painel:** painel próprio (lista de clientes/leads) + painel comprado (Brand24 audience, painéis qualificados) para representatividade.
- **Estrutura:** 15-25 perguntas (mais que isso, fadiga).

### Social listening (complemento, handoff Argos)
- Volume de menções por dimensão (Performance vs Imagery — sentimentos diferentes).
- Share of voice contra concorrentes.
- Tópicos espontâneos associados à marca.
- **Handoff obrigatório:** Argos roda a coleta e devolve os dados; Aglaia interpreta no contexto CBBE.

### Sales lift (complemento, handoff Metis)
- Quanto da intenção declarada (Resonance) vira compra real?
- Conversion lift de campanhas de branding vs performance.
- **Handoff obrigatório:** Metis fornece os dados de venda + atribuição.

---

## Anti-padrões
- **Medir só NPS.** NPS cobre Resonance (atitudinal) — 1 dimensão de 4. Marca "saudável" no NPS pode ter Salience moribunda.
- **CBBE sem survey próprio.** Depender só de tracker comprado anual = ver a marca pelo retrovisor.
- **Comparar contra benchmark errado.** Benchmark de categoria média não diz nada para uma marca premium.
- **Cadência irregular.** Sem rigor trimestral, tendência vira anedota.
- **Confundir ganho de awareness com ganho de equidade.** Awareness sem associação positiva = ruído.

## Cross-links
- **Argos** — social listening da Frente 2.
- **Metis** — sales lift e atribuição.
- **Aaker** (pensador histórico Aglaia) — alternativa/complemento ao CBBE: Aaker's Brand Equity Model (Awareness, Loyalty, Perceived Quality, Associations, Other Proprietary Assets). Útil quando o cliente já trabalha com framework Aaker.

## Saída padrão
Painel CBBE com:
- 4 abas (uma por dimensão) + tendência 4-wave.
- Comparação com 3 concorrentes diretos.
- Flag automática: dimensão em queda > 10% wave-a-wave dispara alerta.
- Sumário executivo trimestral em 1 página.
