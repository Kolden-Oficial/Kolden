---
name: saude-de-conta
description: |
  Use para calcular e MONITORAR account health de conta B2B/SaaS nomeada por BANDA
  (verde/amarelo/vermelho) combinando 4 dimensões: engajamento, adoption, sentiment, sinais
  financeiros. Cada banda dispara ação prescrita. Também rastreia NRR (Net Revenue Retention) e
  GRR (Gross Revenue Retention). Gatilhos: "health score", "saúde da conta", "conta em risco",
  "churn iminente", "NRR", "GRR", "adoption caiu", "conta ativa?", "está usando o produto?",
  "esse cliente vai renovar?", "sinal de churn", "save protocol", "expansão ready?". NÃO substitui
  NPS survey (isso é sinal de sentiment que Metis coleta) nem financial health (isso é Pactolo);
  esta habilidade COMBINA os sinais dessas fontes num score acionável.
domain: sales-enterprise
subdomain: customer-success-strategic
tier: 1
agente_dono: gestor-de-contas-estrategicas
heranca_historica: [lincoln-murphy-success-milestone, gainsight]
fonte_upstream: msitarzewski--agency-agents@a597cb6 (G4)
status: semente
---

# Saúde de Conta

> Habilidade do `gestor-de-contas-estrategicas`. Calcula, publica e reage ao **account health**
> por banda (verde/amarelo/vermelho) de conta nomeada B2B/SaaS. Cada banda dispara ação prescrita.
> Rastreia NRR/GRR. Fonte de verdade para conversas de renovação, expansão e save protocol.

## Quando invocar

- Setup inicial de conta pós-onboarding (definir baseline).
- Antes de QBR (`qbr-forward-looking`) — se vermelho, QBR vira save protocol.
- Antes de conversa de expansão — só expandir conta VERDE (regra dura).
- Toda vez que um sinal cair (feature parada, ticket crítico, NPS baixo, uso derrapando).
- Semanal, como job automático de reporte para o `emporos-chief`.
- Antes de janela de renovação (30d/60d/90d antes).

## Fronteiras (leia antes de operar)

| NÃO é isto | É isto |
|---|---|
| NPS/CSAT survey | COMBINA NPS+CSAT (coletados pela Metis) com adoption, engajamento e sinais financeiros |
| Financial health de fluxo de caixa da conta | Menciona sinais financeiros (usage vs contrato) como INPUT — não é análise financeira |
| Métricas de produto D2C (LTV, cohort) | B2B/SaaS conta nomeada — 1 conta por vez |
| Predição estatística de churn (ML model) | Score determinístico por rubrica; ML fica em roadmap futuro |
| Chegou vermelho = perdemos | Vermelho = save protocol acionado; ainda dá pra recuperar |

## Herança histórica

- **Lincoln Murphy** ("Customer Success" 2016, Gainsight) — **Success Milestone Method**: o
  cliente compra um outcome, não um produto; health mede distância até o próximo milestone de
  sucesso, não uso bruto do produto.
- **Nick Mehta / Gainsight** — modelo de health score em 4 dimensões (Product Usage + Customer
  Sentiment + Company Health + Engagement) — padrão da indústria desde 2013.
- **Jason Lemkin / SaaStr** — regras práticas de NRR:
  - NRR **> 120%** = best-in-class (expansion > churn+downgrade).
  - NRR **100-120%** = saudável.
  - NRR **< 100%** = negative retention, alarme.
  - GRR (só churn, sem expansion) **> 90%** = saudável B2B.

## Rubrica — 4 dimensões, score por dimensão 0-100

Cada dimensão vira score 0-100 por rubrica declarada. Health final = média ponderada.

### D1. Engajamento (peso 25%)
Frequência × qualidade de contato executivo + user.

| Score | Regra |
|---|---|
| 90-100 | Cadência de contato **executivo** > 1×/mês + champion respondendo em 24h |
| 70-89  | Champion ativo, executivo tocado no último QBR |
| 50-69  | Champion mornó (48-72h resposta), executivo há > 60d sem tocar |
| 30-49  | Single-thread (só 1 canal ativo) + executivo há > 90d sem tocar |
| 0-29   | Champion silente > 30d, ou nenhum contato ativo há > 60d |

### D2. Adoption (peso 30%)
Uso real do produto contra o que foi comprado.

| Score | Regra |
|---|---|
| 90-100 | WAU/MAU ≥ 60% + features-âncora do plano em uso ativo + adoção > 80% dos seats |
| 70-89  | WAU/MAU 40-59% + features-âncora usadas + 60-80% dos seats ativos |
| 50-69  | WAU/MAU 25-39% ou features-âncora não adotadas ou 40-60% dos seats |
| 30-49  | WAU/MAU 10-24% ou seats ativos < 40% |
| 0-29   | WAU/MAU < 10% ou zero login em 30d |

### D3. Sentiment (peso 20%)
NPS + CSAT + sentiment qualitativo do stakeholder map.

| Score | Regra |
|---|---|
| 90-100 | NPS ≥ 50 (promoter) + CSAT ≥ 90 + zero detractor no stakeholder map |
| 70-89  | NPS 30-49 + CSAT 75-89 + no máx 1 detractor de baixa influência |
| 50-69  | NPS 0-29 (passive) + CSAT 60-74 |
| 30-49  | NPS -30 a -1 + CSAT < 60 + detractor de alta influência |
| 0-29   | NPS ≤ -30 (detractor) + reclamação pública / escalonamento |

### D4. Sinais financeiros (peso 25%)
Uso vs contratado + histórico de pagamento + expansions passados.

| Score | Regra |
|---|---|
| 90-100 | Uso ≥ 80% do contratado + zero atraso + expansion nos últimos 12m |
| 70-89  | Uso 60-79% + zero atraso + renovação anterior no prazo |
| 50-69  | Uso 40-59% + 1 atraso < 15d + sem expansion |
| 30-49  | Uso 20-39% ou 2+ atrasos ou downgrade recente |
| 0-29   | Uso < 20% ou inadimplência ou pedido de churn verbalizado |

### Cálculo final

```
health_score = 0.25*D1 + 0.30*D2 + 0.20*D3 + 0.25*D4
```

**Bandas:**
- **VERDE**: 75-100
- **AMARELO**: 50-74
- **VERMELHO**: 0-49

**Override manual** — qualquer sinal crítico força banda pior:
- Champion saiu (LinkedIn) → **AMARELO** mínimo.
- Detractor promovido a decisor → **AMARELO** mínimo.
- Inadimplência > 30d → **VERMELHO**.
- Pedido de churn verbalizado → **VERMELHO**.
- Ticket P0 aberto há > 72h sem resolução → **AMARELO** mínimo.

## Ação prescrita por banda

### VERDE — mira expansão
- Handoff sinalizado ao `redator-de-propostas` se sinal de upsell/cross-sell mapeado (via
  `mapa-de-stakeholders` + adoption).
- QBR forward-looking normal.
- Cadência mensal de check-in.
- Renovação: começar conversa 90d antes, sem urgência.

### AMARELO — plano de recuperação
- Diagnosticar dimensão mais fraca (D1/D2/D3/D4).
- Plano de 60-90d com 2-3 ações concretas e outcome medido.
- Cadência bissemanal.
- Handoff ao `emporos-chief` se ficar amarelo > 90d.
- **Não expandir** conta amarela — resolver antes.

### VERMELHO — save protocol
- Acionar **imediatamente** o `emporos-chief` + `redator-de-propostas` (se for objeção comercial).
- Reunião executiva em 7d com economic buyer.
- Plano de 30d com owner + marcos + escalonamento a diretor da Kolden se necessário.
- Cadência semanal.
- Renovação: conversa fora do QBR, protocolo específico.
- Se save falhar: churn digno (recuperar dado, referência, feedback estruturado).

## NRR e GRR — como calcular

Para uma coorte de contas (não para 1 conta isolada):

```
NRR = (ARR_inicio + expansion - contraction - churn) / ARR_inicio
GRR = (ARR_inicio - contraction - churn) / ARR_inicio  (sem expansion)
```

- **NRR** mede saúde total (expansion contrabalança churn).
- **GRR** mede retenção pura (não deixa expansion mascarar churn).
- Rastrear os dois — NRR alto com GRR baixo = fábrica de expansion escondendo vazamento.
- Metas SaaS enterprise: NRR ≥ 110%, GRR ≥ 90%.

## Formato de saída

```
CONTA: <nome> · ARR: <valor> · TENURE: <meses>
DATA: <yyyy-mm-dd>

HEALTH SCORE: <número> — BANDA: <VERDE|AMARELO|VERMELHO>

BREAKDOWN:
  D1 Engajamento (25%):     <score>  → <justificativa em 1 linha>
  D2 Adoption (30%):        <score>  → <WAU/MAU + features + seats>
  D3 Sentiment (20%):       <score>  → <NPS + CSAT + detractors>
  D4 Sinais financeiros (25%): <score> → <uso vs contrato + atrasos + histórico>

OVERRIDES ATIVOS: <se houver — champion saiu / P0 aberto / etc>

TENDÊNCIA (últimos 90d): melhorando | estável | piorando

AÇÃO PRESCRITA (por banda):
  <ação 1> · DONO · DATA
  <ação 2> · DONO · DATA

NRR / GRR (se coorte disponível):
  NRR: <%>  GRR: <%>  contra meta

PRÓXIMO CHECK: <data>
```

## Vetos

- **Não** invente score sem os 4 inputs — se faltar dado (ex: NPS não coletado), marcar como
  LACUNA e pedir coleta antes de fechar score. Score cego é pior que ausência de score.
- **Não** expanda conta AMARELA ou VERMELHA — resolver saúde antes. Regra dura.
- **Não** trate VERMELHO como churn certo — save protocol existe pra isso.
- **Não** rode health score sem stakeholder map atualizado — D1 e D3 dependem dele.
- **Não** esconda GRR atrás de NRR — expansion pode mascarar vazamento estrutural.
- **Não** substitua NPS survey (isso é Metis) — esta habilidade CONSOME o NPS, não coleta.
- **Não** substitua financial review de conta (isso é Pactolo) — esta habilidade LÊ sinal de uso
  vs contrato como proxy, não é análise financeira.

## Ferramentas

- **GHL** (via Infisical) — cada conta tem custom field para health_score, banda, últimos 4 D-scores.
- **Infisical** — única fonte de credenciais.
- **Handoffs**: `qbr-forward-looking` (para QBR), `redator-de-propostas` (expansão/renovação),
  `emporos-chief` (escalonamento vermelho), Metis (NPS), Pactolo (análise financeira profunda).

## Atribuição

Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B06/sales.
