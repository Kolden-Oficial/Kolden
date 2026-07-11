---
name: forecast-probabilistico-3-faixas
description: >
  Use para MONTAR o forecast comercial em 3 faixas — Commit (o que fecha mesmo se der ruim),
  Best-case (cenário provável), Stretch (upside com deals de topo) — por estágio-ponderado, com
  calibração de probabilidade por vendedor (histórico de acurácia). Cobre a metodologia de
  ponderação, a regra IF Commit < quota_75% ENTÃO acionar `saude-de-conta` + emporos-chief, e a
  fronteira com o plano estratégico (Afrodite/CRO decide política, este skill projeta execução).
  Gatilhos: "forecast", "projeção", "commit", "best case", "stretch", "quanto vou fechar",
  "vou bater a meta", "forecast do mês/trimestre". Dono: analista-de-pipeline.
tipo: skill
area: Emporos
up: "[[Emporos/_MOC-emporos]]"
---

# Forecast Probabilístico — 3 faixas

Substitui o "achismo do vendedor" e o "estágio × probabilidade fixa" por 3 números defensáveis
por operação. Forecast em faixa única sempre erra em direção ao otimismo; forecast em 3 faixas
torna o viés visível e negociável.

## 1. As 3 faixas

| Faixa | Definição operacional | Uso |
|---|---|---|
| **Commit** | O que fecha mesmo se o trimestre der ruim; deals com evento gatilho contratado, sinal do decisor, contrato em jurídico | Base para promessa a stakeholders (board, CEO, investidor) |
| **Best-case** | Cenário provável — Commit + deals com champion forte, discovery/negociação avançados, sem showstopper | Base para planejamento operacional (headcount, capacidade) |
| **Stretch** | Upside — Best-case + deals de topo de pipeline que exigem "tudo dar certo" (pricing aprovado no limite, jurídico rápido, decisor liberando) | Aspiracional; nunca prometido |

**Regra dura:** Commit ≤ Best-case ≤ Stretch, sempre. Se numerador do Commit sobe acima do
Best-case, algo está mal classificado — revisar.

## 2. Estágio-ponderado como base numérica

Cada deal do pipeline entra na conta com peso = probabilidade de fechamento associada ao seu estágio
atual **e** calibrada pelo histórico do vendedor.

**Probabilidade base por estágio (referência-inicial, calibrar com dados reais):**

| Estágio | Prob base | Onde vive no GHL |
|---|---|---|
| SQL aceito | 5% | Oportunidade recém-criada |
| Discovery completo | 15% | Após `spin-selling`/`sandler-pain-funnel` completos |
| Demo aceita / prova técnica | 30% | Demo-invertida validada; POC gate aberto |
| Proposta enviada | 50% | Peça formal entregue |
| Negociação | 70% | Objeção resolvida; termos em ida-e-volta |
| Verbal-yes / contrato | 90% | Aguardando assinatura |
| Fechado-ganho | 100% | — |

**Cálculo:**
- **Estágio-ponderado por deal** = valor × probabilidade base × ajuste de calibração do vendedor.
- **Estágio-ponderado total** = soma de todos os deals do período.
- **Commit** = subset dos deals com probabilidade ≥ 70% **e** validação qualitativa (champion +
  paper process visível).
- **Best-case** = Commit + deals com probabilidade 40-69% E MEDDPICC/BANT ≥ 75% completo.
- **Stretch** = Best-case + deals novos do topo (SQL/discovery) com sinal forte de intent.

## 3. Calibração de probabilidade por vendedor

Vendedor otimista superestima; vendedor conservador subestima. Sem calibração, forecast agregado
mente pelos dois lados.

**Método:**
- A cada trimestre, calcular **razão de acurácia** por vendedor = (forecast_commit / fechado_real).
- Razão > 1.1 = otimista sistemático → aplicar fator de correção 0.9 no próximo trimestre.
- Razão < 0.9 = conservador sistemático → aplicar fator de correção 1.1.
- Razão entre 0.9 e 1.1 = calibrado; sem ajuste.

**Requisito:** mínimo 8 deals fechados no trimestre para calibrar (senão amostra não é
significativa; usa fator 1.0).

## 4. Regra IF Commit < quota_75% — sinal de alerta antecipado

**Trigger:** no meio do trimestre (semana 6 de 12), se o Commit projetado < 75% da quota:

1. Notificar `emporos-chief` — decisão executiva sobre plano de resposta.
2. Acionar `saude-de-conta` — revisar contas Tier 1 do ABM e contas do funil de expansão; upside
   de contas atuais frequentemente resolve gap sem depender de new logo (mais rápido, mais barato).
3. Rodar `pipeline-velocity` decomposto — descobrir qual das 4 alavancas está fraca.
4. Se raiz é política (preço, ICP, mix) → escalar ao Afrodite. Se raiz é execução → plano de squad.

**Anti-padrão:** ver Commit baixo, mandar "todo mundo trabalhar mais". Trabalho a mais no estágio
errado não muda velocity — muda burnout.

## 5. Fronteira dura com Afrodite (CRO)

**Este skill NÃO substitui plano estratégico.**

- Forecast em 3 faixas = **projeção operacional** de fechamento por deal em curso.
- Afrodite = plano estratégico anual/trimestral (quota, ICP, política de pricing/desconto,
  território, comp plan, mix new-vs-expansion).

**Handoff obrigatório:**
- Commit persistentemente < 75% da quota por 2 trimestres consecutivos → escalar ao Afrodite para
  revisão de política (não é problema local de squad).
- Discrepância grande entre estágio-ponderado e Commit qualitativo → sinal que o mapa de estágios
  do GHL precisa ser recalibrado; ação com Afrodite/RevOps.
- Forecast alimenta plano estratégico; plano estratégico define moldura em que forecast opera.

## 6. Cadência e ritual

- **Update semanal**: analista-de-pipeline recalcula as 3 faixas e publica delta vs semana anterior.
- **Deep-dive quinzenal**: revisar Commit deal-por-deal com AE dono; sanity check qualitativo.
- **Fechamento mensal**: reconciliar forecast vs realizado; alimentar calibração do vendedor.
- **QBR trimestral**: emporos-chief + Afrodite revisam calibração agregada e ajustam método.

## 7. Anti-padrões

- **"Todo deal está em negociação"** — inflação de estágio; forecast vira ficção. Auditar com
  `qualificacao-bant-meddic`/MEDDPICC.
- **Sandbagging** — vendedor esconde deal no forecast baixo para "estourar meta" e ganhar comp;
  reflete na razão de acurácia < 0.85, corrigido pela calibração.
- **Otimismo do fim do trimestre** — deals "quase fechando" que sempre escorregam para o próximo
  trimestre; aplicar teste "paper process visível" (MEDDPICC) para entrar no Commit.
- **Substituir plano por forecast** — Commit alto não vira desculpa para não construir política
  (mistura papéis).

## Saída

Formato do `analista-de-pipeline`: PERÍODO / QUOTA / COMMIT / BEST-CASE / STRETCH / GAP-VS-QUOTA
/ CALIBRAÇÃO POR VENDEDOR / DEALS-CHAVE (top 10 por peso) / ALERTAS ACIONADOS / PRÓXIMA REVISÃO.
GHL via Infisical.

## Herança histórica

- **Aaron Ross** ("Predictable Revenue", 2011) — introduziu forecast em faixas (Commit / Best-case /
  Upside) como padrão SaaS moderno.
- **Sam Blond** (ex-Brex/Zenefits; SaaStr Fund) — disseminou o método em conteúdo público SaaS
  moderno (podcast SaaStr, livro "The Sales Leader's Guide").
- **Mark Roberge** ("The Sales Acceleration Formula", 2015) — ensinou a instrumentar forecast por
  estágio-ponderado com histórico do vendedor no HubSpot.
- **Clari, Gong, InsightSquared** — plataformas que operacionalizaram probabilidade calibrada por
  vendedor + sinais IA no forecast enterprise.

---
*Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B06/sales, ID G32.
Reescrito sem cópia literal.*
