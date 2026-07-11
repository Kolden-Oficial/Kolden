---
name: abm-account-tiering
description: >
  Use para DESENHAR o programa de ABM (Account-Based Marketing) da operação com tiering explícito
  — Tier 1 (1:1 personalizado, 10-20 contas), Tier 2 (1:poucos com playbook, 100-300 contas), Tier 3
  (1:muitos automatizado, 1000+). Cobre critérios de scoring por tier (fit ICP × sinal de intent ×
  economics × propensity), regra de promoção/rebaixamento entre tiers, cadência mínima por tier e
  handoffs para outbound signal-based. Gatilhos: "ABM", "account-based", "tier de conta",
  "target accounts", "1:1 vs 1:few vs 1:many", "priorização de contas", "conta-alvo". Dono:
  executivo-de-cadencia. Enriquecimento (Apollo/Common Room/6sense) via Infisical.
tipo: skill
area: Emporos
up: "[[Emporos/_MOC-emporos]]"
---

# ABM — Account Tiering

Faz o programa de contas-alvo sair do "lista Excel do trimestre" para operação viva com tiering,
scoring e cadência distintos por tier. Sem tiering, "ABM" vira "cold outbound com PowerPoint" —
mesmo esforço em conta com fit zero e em conta ideal, resultado nivelado por baixo.

## 1. Os três tiers e o que muda entre eles

| Tier | # contas | Modelo | Investimento por conta | Owner primário |
|---|---|---|---|---|
| **Tier 1 (1:1)** | 10-20 | Programa único por conta; discovery de mesa; conteúdo custom | Alto (dezenas de horas/trimestre) | AE sênior + `gestor-de-contas-estrategicas` |
| **Tier 2 (1:poucos)** | 100-300 | Playbook por cluster (5-10 contas com padrão comum); conteúdo levemente customizado | Médio | `executivo-de-cadencia` + AE |
| **Tier 3 (1:muitos)** | 1000+ | Automação signal-based com poucos toques humanos; conteúdo padrão | Baixo por conta, alto em escala | `executivo-de-cadencia` + marketing (Peitho/Ariadne) |

**Regra dura:** os 3 tiers **não são substitutos** — coexistem. A pirâmide alimenta a próxima:
Tier 3 vira campo de detecção de sinal → melhores viram Tier 2 → sinal forte + fit alto viram Tier 1.

## 2. Scoring de fit ICP × intent × economics × propensity

Cada conta candidata recebe **4 notas 0-100** (compostas):

| Eixo | O que mede | Fontes |
|---|---|---|
| **Fit ICP** | Aderência a segmento, porte, geografia, stack, dor | Apollo, ZoomInfo, enriquecimento próprio |
| **Intent** | Sinal ativo de intenção de compra na categoria | 6sense, Bombora, G2 buyer intent, Common Room |
| **Economics** | Capacidade real de pagar o TCV; ACV projetado | Funding pública, headcount, receita, Growjo/Owler |
| **Propensity** | Quão provável esta conta comprar de NÓS (histórico + relação existente) | CRM: relações passadas, cases similares fechados |

**Score composto (0-100)** = média ponderada. Pesos-padrão: Fit 30%, Intent 25%, Economics 25%,
Propensity 20% — ajustáveis por segmento.

**Cortes-âncora:**
- Score ≥ 80 + Intent ≥ 70 → candidato a **Tier 1**.
- Score 60-79 → **Tier 2**.
- Score 40-59 → **Tier 3**.
- Score < 40 → descarte ou parking (revisão semestral).

## 3. Cadência mínima por tier (o que garante que o programa vive)

**Tier 1 (por conta, por trimestre):**
- 1 workshop/executive session (AE + engenheiro-de-pré-vendas + patrocinador).
- 1 peça de conteúdo específica (paper, ROI custom, benchmark).
- Contato pessoal com 3-5 stakeholders no mapa (via `mapa-de-stakeholders`).
- QBR se já é conta ativa; discovery profundo se não é.
- Signal watch dedicado (alertas de trigger events).

**Tier 2 (por cluster de 5-10 contas, por mês):**
- Playbook sequencial com 8-12 toques (via `cadencia-de-outbound` — sequência 8-12).
- Conteúdo padrão do cluster + 1 elemento personalizado (linha de abertura por conta).
- Signal-based prioriza a fila dentro do cluster (o que "esquenta" primeiro).

**Tier 3 (por segmento, contínuo):**
- Automação de outbound signal-based (trigger events do Tier 1 do `cadencia-de-outbound`).
- Nurturing por ads/email padrão do marketing (handoff Peitho/Ariadne).
- Detecção contínua de contas que sobem para Tier 2.

## 4. Promoção e rebaixamento entre tiers

Programa vivo, não estático. Regras:

- **Promoção Tier 3 → Tier 2**: score composto sobe para ≥ 60 OU intent salta ≥ 70 sustentado 2
  semanas.
- **Promoção Tier 2 → Tier 1**: conta abre oportunidade real (SQL aceito) E economics ≥ 80.
- **Rebaixamento Tier 1 → Tier 2**: 2 trimestres sem sinal de avanço de deal E sem intent.
- **Rebaixamento Tier 2 → Tier 3**: playbook aplicado 90d sem resposta; volta para nurturing.
- **Saída do programa**: score < 40 sustentado + zero relação em 12m → arquivar.

Toda promoção/rebaixamento fica registrada no GHL com data + motivo.

## 5. Fronteira com signal-based selling

`cadencia-de-outbound` (bloco Signal-based, G26) é o motor de execução do Tier 3 e da promoção para
Tier 2. Este skill (ABM) é a **camada estratégica** — decide QUAIS contas entram em cada tier.
Signal-based é a **camada tática** — reage a sinais dentro do tier.

**Handoff explícito:** ABM tiering entrega a lista curada e pesos → `cadencia-de-outbound` executa
com a velocidade de resposta a sinal (< 30min Tier 1, < 4h Tier 2, semanal Tier 3).

## 6. Governança e revisão

- **Revisão do programa**: mensal para Tier 1 (10-20 contas comportam olhar 1-a-1); trimestral para
  Tiers 2 e 3.
- **KPIs por tier**: engagement rate, meeting rate, pipeline aberto, TCV fechado; benchmark
  intra-tier (não misturar Tier 1 com Tier 3).
- **Dono do programa**: `executivo-de-cadencia` (execução) + `emporos-chief` (governança).
- **Fronteira com Afrodite**: mudança na definição de ICP ou nos pesos do scoring escala ao Afrodite
  (política de RevOps macro), não é decisão local.

## 7. Handoffs

- Tier 1 conta que abre SQL → handoff para AE sênior + `gestor-de-contas-estrategicas` (relação
  1:1 muda de vendas para conta).
- Sinal de trigger event em Tier 2/3 → handoff para `cadencia-de-outbound` (execução signal-based).
- Mudança de pesos ou definição de ICP → escalar ao Afrodite.
- Conta Tier 1 sem champion mapeado → acionar `mapa-de-stakeholders`.

## Saída

Formato do `executivo-de-cadencia`: PROGRAMA / TIER (1/2/3) / LISTA CURADA (com score composto por
conta) / CADÊNCIA APLICADA / SINAIS OBSERVADOS / PROMOÇÕES-REBAIXAMENTOS DO CICLO / PRÓXIMA REVISÃO
+ DONO + DATA. Enriquecimento e signal via Infisical.

## Herança histórica

- **ITSMA** (agora Momentum ITSMA) — cunhou o termo "Account-Based Marketing" formalmente em 2004,
  na disciplina de marketing consultivo B2B enterprise (IBM, Accenture case).
- **Sangram Vajre** (co-fundador Terminus, 2015+; autor "Account-Based Marketing for Dummies" e
  "MOVE") — modernizou o playbook 1:1 / 1:few / 1:many para SaaS.
- **6sense / Demandbase / Bombora** — camada de intent data que tornou tiering operacional em
  escala.
- **Jon Miller** (Marketo/Engagio) — modelo de scoring composto (fit × intent × relação).

---
*Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B06/sales, ID G27.
Reescrito sem cópia literal.*
