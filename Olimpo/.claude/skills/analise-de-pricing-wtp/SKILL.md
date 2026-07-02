---
name: analise-de-pricing-wtp
description: Use quando o Plutos precisar recomendar o PREÇO de uma oferta nova, revisar preço de oferta existente, definir política de desconto/versionamento (bom/melhor/ótimo), ou responder a questionamento comercial ("por que R$X e não R$Y?"). Método em três camadas — market research (o que a concorrência cobra e como estrutura), custo (piso de margem defensável) e willingness-to-pay (van Westendorp + entrevista qualitativa) — para ancorar o preço no valor capturado pelo cliente, não no custo. Handoff obrigatório a Argos para market-data quando o dado externo pesa. NÃO use para preço de mídia paga (isso é `alocacao_de_budget`) nem para negociação de venda pontual (isso é Afrodite/Emporos).
invocavel_por: plutos
tags: [pricing, wtp, van-westendorp, versionamento, olimpo]
---

# Análise de Pricing e Willingness-to-Pay (WTP)

Plutos recomenda o preço; a decisão final é do humano. Existe porque **precificar por custo é a forma mais rápida de deixar dinheiro na mesa**, e precificar por vibe destrói a margem. O método triangula três lentes até convergir numa faixa defensável.

## Herança histórica

- **Peter van Westendorp** ("The Price Sensitivity Meter", 1976) — instrumento clássico de pesquisa de preço em 4 perguntas (a que preço é caro-mas-vale, muito-caro, barato, suspeito-de-baixa-qualidade). O cruzamento das curvas revela ponto de preço ótimo e faixa aceitável. Insight: o cliente não sabe dizer "quanto pagaria", mas sabe reconhecer preço injusto para cima e para baixo.
- **Hermann Simon** ("Confessions of the Pricing Man", 2015) — fundador da Simon-Kucher; codificou pricing como disciplina executiva. Insight: mudar preço em 1% em média move lucro em 8-11% em empresas típicas — pricing é a alavanca mais subutilizada.
- **Thomas Nagle & John Hogan** ("The Strategy and Tactics of Pricing", 5ª ed. 2010) — introduziram a **cascata de preço** (list → net) e mapa de valor econômico. Insight: preço de tabela é ficção; o que importa é o preço realizado por segmento após todos os descontos.
- **Ron Baker** ("Implementing Value Pricing", 2010) — codificou value-based pricing em serviços profissionais (contexto direto da Kolden). Insight: escopo por hora é armadilha; escopo por resultado captura valor.
- **Madhavan Ramanujam** (Simon-Kucher, "Monetizing Innovation", 2016) — WTP deve ser testado ANTES do build, não depois. Insight: 72% dos produtos falham no preço, não na engenharia.

## Método em três camadas

### Camada 1 — Market research (o campo)

Antes de qualquer WTP com cliente, mapeie o campo:

- **Top 5 concorrentes diretos** — preço público de tabela, se disponível. Modelo (por assento, por transação, por resultado, por escopo). Grade de versionamento.
- **2-3 substitutos indiretos** — o que o cliente compraria em vez? Preço deles.
- **Cascata típica do setor** — list price → desconto médio observado → preço realizado. Se todo mundo dá 40% de desconto, o preço de tabela é ficção operacional.
- **Ancoragem de mercado** — qual é o "número redondo" que o cliente já espera pagar? (R$97/mês, R$497 setup, R$5k/mês serviço, etc.)

Handoff a Argos quando o dado externo é crítico e não está publicamente disponível.

Saída da Camada 1: **faixa de referência de mercado** por segmento (baixa/média/alta) + modelo dominante do setor.

### Camada 2 — Custo (o piso)

Piso de margem defensável (não é o preço; é o piso abaixo do qual você perde dinheiro por venda):

- **Custo variável direto** — infra por conta, licenças por seat, comissão de venda, custo de servir mensal.
- **Custo de aquisição alocado** — CAC amortizado pelo LTV esperado.
- **Custo fixo alocado** por cliente equivalente (regra prática, não contabilidade fina).
- **Margem-alvo mínima** — 60-70% em SaaS/serviços digitais; 30-40% em serviço high-touch. Depende do modelo.

Saída da Camada 2: **preço-piso** por SKU. Abaixo disso, cada venda destrói margem — só se justifica em fase de leitura de mercado com prazo lacrado.

### Camada 3 — Willingness-to-Pay (o teto real)

O que o cliente aceita pagar. Duas técnicas complementares:

**3.1 van Westendorp Price Sensitivity Meter**

Aplicado com N ≥ 30 clientes/prospects do segmento-alvo. Quatro perguntas:

1. A que preço este produto começa a ficar **caro, mas ainda vale a pena**?
2. A que preço fica **caro demais para considerar**?
3. A que preço fica **barato o suficiente para ser uma boa oferta**?
4. A que preço fica **tão barato que faz duvidar da qualidade**?

Plote 4 curvas cumulativas; os cruzamentos revelam:
- **PMC (Point of Marginal Cheapness)**: cruzamento (3) × (4) — barato demais aceito.
- **PME (Point of Marginal Expensiveness)**: cruzamento (1) × (2) — caro aceito.
- **IPP (Indifference Price Point)**: cruzamento (1) × (3) — preço percebido justo.
- **OPP (Optimal Price Point)**: cruzamento (2) × (4) — resistência mínima combinada.

Faixa aceitável do mercado: entre PMC e PME. Preço ótimo defensível: perto de OPP, com viés à direita se marca forte, à esquerda se entrada.

**3.2 Entrevista qualitativa de valor**

Complementa van Westendorp (que é preço isolado) com perguntas de VALOR CAPTURADO:

- Qual problema isto resolve? Quanto custa hoje sem nossa solução (em tempo, dinheiro, dor)?
- Qual é o valor de resolver? Quanto vale para você?
- Se estivesse gratuita, quanto valeria? Se custasse R$X, ainda usaria?
- Qual seria o motivo para NÃO pagar?

Saída da Camada 3: **faixa aceitável** + **preço-alvo** ancorado em valor.

## Convergência: recomendação final

Convergir as três camadas:

| Camada | Saída |
|---|---|
| 1. Market | Faixa de mercado por segmento |
| 2. Custo | Preço-piso |
| 3. WTP | Faixa aceitável + preço-alvo por valor |

Regra:
- Se WTP > Mercado > Custo (o normal desejável): precifique acima da média do mercado (captura de valor). Justificativa clara na venda.
- Se Mercado > WTP > Custo: preço abaixo do mercado (mercado precifica errado ou o cliente não vê o valor ainda — pode ser posicionamento fraco). Investigar.
- Se WTP ≤ Custo: cliente errado ou produto errado. Parar e voltar à Aletheia (discovery).

## Versionamento (bom / melhor / ótimo)

Regra do 3-4-3 (Nagle): estruturar 3 SKUs com preços em razão 1x / 2-3x / 4-5x captura ~85% do WTP disperso da base.

- **Bom** — entrada, remove atrito de decisão. Feature-limitado.
- **Melhor** — versão-âncora. 60-70% dos clientes acabam aqui. Melhor margem.
- **Ótimo** — versão enterprise/high-touch. Poucos compram, mas ancora "melhor" como razoável (efeito decoy — Ariely, 2008).

## Anti-padrões

- **Cost-plus puro** — precificar por custo + margem esperada, ignorando WTP. Deixa dinheiro na mesa.
- **Ancoragem no menor concorrente** — precificar contra quem cobra menos, não contra quem entrega comparável. Corrida ao fundo.
- **Preço redondo por hábito** — "R$97/mês porque todo mundo cobra" sem WTP validado. Chute mascarado.
- **Desconto blanket** — 20% off para todos vira o novo preço de tabela em 6 meses.
- **Value-based sem prova de valor** — cobrar por resultado sem métrica clara de resultado. Discussão eterna.
- **van Westendorp com N ≤ 15** — estatisticamente irrelevante.

## Cross-squads

- **Argos** — market intelligence do setor, preço de concorrente, benchmark de modelo.
- **Aletheia** — se WTP indicar preço abaixo do piso, é discovery de produto, não de preço.
- **Afrodite/Emporos** — política de desconto, cascata list→net, aprovação de exceção.
- **Zeus** — mudança material de preço é decisão executiva (auto-ESCALATE via `chief-of-staff-filtragem-e-escalonamento`).

## Entregável

```yaml
plutos_pricing:
  produto: "<SKU>"
  segmento_alvo: "<>"
  market_research:
    concorrentes: [{nome, preco_tabela, modelo, versionamento}]
    substitutos: [...]
    ancoragem_setor: "<preço-referência>"
    faixa_mercado: {baixa, media, alta}
  custo:
    variavel_direto: <>
    cac_amortizado: <>
    fixo_alocado: <>
    preco_piso: <>
    margem_alvo: <%>
  wtp:
    van_westendorp:
      n_amostra: <N>
      pmc: <>
      pme: <>
      ipp: <>
      opp: <>
    entrevista_valor:
      valor_percebido_medio: <>
      resistencias_top3: [...]
  recomendacao:
    versionamento:
      bom: {preco, features}
      melhor: {preco, features}
      otimo: {preco, features}
    politica_desconto: "<regra>"
    justificativa: "<1 parágrafo>"
  handoffs:
    argos: "<consulta de market-data>"
    afrodite_emporos: "<política comercial>"
```

## Guardrails

- N ≥ 30 para van Westendorp válido; abaixo, é qualitativo, não quantitativo.
- Nunca recomendar preço < preço-piso sem prazo de leitura lacrado e teto de perda declarado.
- Toda mudança de preço material vira decisão do Zeus (auto-ESCALATE — Chief-of-Staff).
- Handoff a Argos obrigatório quando dado externo pesa (não inventar preço de concorrente).
- Value-based pricing exige métrica de valor auditável — sem métrica, cai para market/cost.
- Cascata list → net registrada; desconto sem regra vira preço de tabela em 6 meses.

---

*Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT) — ID G65 do bucket B15.*
