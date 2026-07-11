---
name: analise-fpa-e-variancia
description: >
  Use para EXECUTAR FP&A: montar orçamento, manter forecast rolling e confrontar realizado vs
  orçado vs forecast com análise de variância decomposta por driver. Cobre o calendário
  orçamentário (bottom-up + top-down), o bridge orçado→forecast, a classificação de variância
  (favorável/desfavorável + materialidade) e o pacote de operating review. Toda linha carrega a
  fonte do realizado e a premissa da projeção. Gatilhos: "montar orçamento", "forecast", "budget vs
  actual", "realizado vs orçado", "por que estouramos o orçamento", "análise de variância",
  "reforecast". Dono: analista-fpa. Decisão (corte/realocação) → handoff ao Plutos (Olimpo/CFO).
tipo: skill
area: Pactolo
up: "[[Pactolo/_MOC-pactolo]]"
---

# Análise FP&A e Variância

Camada executável do planejamento financeiro. Regra-mãe: **fato conciliado primeiro, projeção depois** —
o realizado vem conciliado do `controller`; a projeção carrega premissas explícitas. Variância sem driver
é ruído; variância com driver é decisão.

## 0. Insumos (porta de entrada)
- Realizado **conciliado** do período (do `controller`) — nunca um número solto.
- Orçado e forecast anterior da linha em questão.
- Drivers de negócio (volume, preço, mix, eficiência) e métricas de produto (via **Metis** quando externas).
Sem realizado conciliado, a análise é estimativa rotulada — declare isso.

## 1. Orçamento (budget)
- **Bottom-up:** por centro de custo/linha, somando para o total.
- **Top-down:** da meta para baixo, alocando por peso histórico.
- Reconcilie os dois; o gap entre eles é a conversa de meta a subir ao Plutos.

## 2. Forecast rolling
- Horizonte 12-18 meses, atualizado a cada fechamento (reforecast).
- **Bridge orçado→forecast:** decompõe a mudança por driver, não em bloco.
- Premissa explícita por linha: driver, taxa, período, fonte.

## 3. Análise de variância
- Δ = realizado − orçado (e realizado − forecast). Reporte valor **e** percentual.
- Decomponha por: **volume / preço / mix / eficiência** quando aplicável.
- Classifique **favorável/desfavorável** e por **materialidade** (foque no que move o resultado).
- Cada variância material recebe um **driver** (a causa), não só o número.

## 4. Unit economics (resumo — detalhe na skill irmã)
CAC, LTV, payback, margem de contribuição entram no operating review quando a pergunta é de eficiência de
crescimento. Profundidade → `unit-economics-operacional`.

## 5. Saída
Tabela: linha | orçado | realizado | Δ valor | Δ % | fav/desf | driver | materialidade. Mais o **bridge** e
a lista de premissas do forecast. Separe fato conciliado de projeção; marque o que sobe ao Plutos para decisão.

## Annual Operating Plan (AOP) — calendário e pacote

> _Seção absorvida de github.com/msitarzewski/agency-agents@a597cb6 (G14, MIT)._

O AOP é o **baseline anual** que vira régua de toda variância durante o ano. Não é o orçamento jogado num
arquivo em dezembro — é um processo com calendário, pacote definido e bridges entre versões. Sem AOP
formal, a análise de variância flutua contra um número que ninguém lembra como saiu.

### Calendário canônico (relativo ao início da vigência, T0)

- **T-3M — pré-trabalho.** Revisão das premissas estratégicas com o Olimpo (Apolo no eixo de mercado/CMO,
  Plutos no eixo financeiro/CFO). Atualização dos drivers macro: taxa básica, FX, salário-base, inflação
  setorial. Kickoff com cada squad sobre o roadmap do ano que vem (o que vai mudar de capacidade ou produto).
- **T-2M — bottom-up.** Cada squad/centro de custo submete forecast operacional próprio (revenue se
  aplicável, headcount projetado, opex por categoria) em **3 cenários** (base / otimista / conservador).
  Entrega é em template padrão, não em planilha livre.
- **T-1M (primeira metade) — top-down + reconciliação.** Plutos define top-line e capital allocation pela
  visão estratégica. O analista-fpa **reconcilia** o bottom-up agregado contra o top-down. Gap > **15%**
  entre as duas visões volta para **iteração** com os donos das linhas; não se resolve por imposição.
- **T-1M (segunda metade) — aprovação.** Plutos aprova o AOP final. O número aprovado vira **baseline
  travada** do ano — toda variância a partir de T0 é contra essa baseline, não contra forecast intermediário.
- **T0 — vigência.** Janeiro (ou início do FY adotado). Baseline ativa, reforecast a cada trimestre com
  bridge documentado.

### Pacote AOP (artefatos obrigatórios da entrega)

- **Premissas-mestre (1 página):** todos os drivers macro + assunções de negócio numa única folha. Quem ler
  só essa página entende em que mundo o AOP foi feito.
- **DRE projetada por trimestre** (mensal nos dois primeiros trimestres para acompanhamento mais fino;
  trimestral nos dois últimos).
- **Cash flow projetado** alinhado com a DRE (não pode ser inventado em paralelo) — handoff com
  `gestao-de-fluxo-de-caixa`.
- **Headcount por trimestre**, por squad/centro — handoff explícito com a skill `planejamento-de-headcount`
  (planos de contratação saem dessa linha, não inventados depois).
- **Capex plan:** investimentos previstos, momento (trimestre), payback esperado.
- **Cenários:** os mesmos 3 do bottom-up (base / otimista / conservador) reconciliados.
- **Sensibilidade aos 5 maiores drivers:** o que acontece com EBITDA e caixa se cada um se mover ±10% e
  ±25%.

### Bridges entre versões

A cada **reforecast trimestral**, documenta-se o delta linha a linha do AOP travado para o forecast atual,
**decomposto por driver**: o que mudou de volume, o que mudou de preço, o que mudou de mix, o que mudou de
custo unitário, o que veio de evento não-recorrente. Bridge em bloco ("piorou 8%") é proibido — não vira
decisão.

### Anti-padrões

- AOP que mora numa planilha sem versionamento (ninguém sabe qual é a versão oficial).
- AOP sem cenários (só "base"), o que esconde o risco do plano.
- AOP sem premissas-mestre escritas (cada um lembra de uma coisa diferente quando o ano vira).
- Bridge ausente entre AOP travado → reforecast: o número muda e ninguém sabe por quê.

## Drill-down por centro de custo (waterfall) + ações corretivas automáticas

> _Seção absorvida de github.com/msitarzewski/agency-agents@a597cb6 (G11, MIT)._

Variância agregada ("gastamos R$ 200k a mais que o orçado") não é decisão — é notícia. A
decisão nasce quando a variância se **decompõe** até o **centro de custo, categoria e driver**,
e cada faixa material dispara **ação corretiva nomeada**.

### Waterfall departamental (decomposição em cascata)

A leitura vai do total para o granular em passos disciplinados:

```
Variância TOTAL (R$ / %)
  │
  ├── por SQUAD / CENTRO DE CUSTO (Pactolo, Metis, Ariadne, Caliope, …)
  │     │
  │     ├── por CATEGORIA DE CONTA (pessoal, mídia paga, ferramentas, serviços PJ, …)
  │     │     │
  │     │     ├── por DRIVER (volume, preço unitário, mix, eficiência, não-recorrente)
  │     │     │
  │     │     └── por PERÍODO (mês do estouro — pode ser um único evento)
```

**Regra dura:** parar de decompor quando a **variância residual do nó < 5%** do total agregado
ou < R$ X materialidade absoluta (definida pelo controller). Ir além disso é ruído — a decisão
está nos nós grandes, não na cauda.

**Formato de saída (linha por nó material):**

| Squad | Categoria | Driver | Orçado | Realizado | Δ R$ | Δ % | Fav/Desf | Materialidade | Ação sugerida |
|---|---|---|---|---|---|---|---|---|---|
| Metis | ferramentas SaaS | preço | 8k | 14k | +6k | +75% | Desf | ALTA | renegociar contrato anual |
| Caliope | serviços PJ | volume | 40k | 32k | −8k | −20% | Fav | MÉDIA | manter, verificar backlog |

### Regras de ação corretiva automática (por faixa de variância)

Cada variância material recebe uma **ação nomeada + dono + prazo** — a skill entrega o rascunho,
o especialista dono da linha refina. Regras de bolso (calibrar por Plutos):

| Faixa de variância | Ação padrão | Dono do rascunho | Escalação |
|---|---|---|---|
| \|Δ%\| < ±5% | Monitorar (dentro da banda de ruído) | analista-fpa | — |
| ±5% ≤ \|Δ%\| < ±10% | Rotular causa e reprojetar linha no próximo forecast | dono da linha | analista-fpa |
| ±10% ≤ \|Δ%\| < ±25% | **Ação corretiva nomeada com prazo de 30 dias** | dono da linha + chefe do squad | analista-fpa → Pactolo-chief |
| \|Δ%\| ≥ ±25% ou materialidade alta absoluta | **Reunião de exceção** + plano B em 15 dias + revisão do AOP | chefe do squad + Plutos | Plutos (decisão) |
| Variância cruza covenant / runway | **Alerta VERMELHO imediato** | Plutos + Zeus | Board |

**Catálogo de ações corretivas por tipo de variância (ponto de partida):**

- **Estouro de pessoal (headcount realizado > orçado):** revisar ramp-up, congelar contratação
  aberta, escalar a Hestia (handoff RH).
- **Estouro de mídia paga (CAC subiu):** puxar `unit-economics-operacional`, avaliar CAC por
  canal (via Metis), rever alocação; se persistir, escalar decisão de mix ao Plutos.
- **Estouro de ferramentas/SaaS:** auditar assinaturas ociosas, renegociar contrato anual,
  consolidar vendors.
- **Estouro de serviços PJ:** revisar escopo do contrato, cap de faturamento mensal, avaliar
  substituição por CLT (via `planejamento-de-headcount`) se recorrente.
- **Queda de receita:** decompor por driver (volume/preço/mix) antes de agir; se preço,
  handoff imediato ao Plutos; se volume, verificar funil e handoff Argos/Metis.
- **Não-recorrente legítimo:** rotular como tal no bridge para não contaminar tendência do
  reforecast.

**Anti-padrões:**

- **Ação corretiva "genérica"** ("cortar 10% da linha"). Corte sem driver reduz variância no
  papel e piora a operação. A ação segue o driver.
- **Variância sem dono nomeado:** vira relatório de museu. Toda linha material carrega dono.
- **Reprojetar sem bridge:** o forecast novo aparece "melhor" e ninguém sabe o que mudou.
- **Escalar tudo ao Plutos:** vira ruído executivo. A escalação segue a faixa de materialidade,
  não a ansiedade.

### Diferença para o pacote de operating review

O **pacote de operating review** (§5) é a apresentação para o time. O **waterfall + ações
corretivas** é a **camada de decisão** por baixo — o que o Pactolo-chief usa para orquestrar
os handoffs e o que o Plutos consome para decidir corte/realocação/meta.

## Fronteira
Decisão de corte/realocação/meta é do **Plutos (Olimpo/CFO)** — esta skill prepara o número e o porquê,
não decide. Métrica de produto vem do **Metis**; benchmark de mercado, do **Argos**. Headcount
operacional (recrutamento/cultura) é da **Hestia**; o planejamento financeiro do headcount é
`planejamento-de-headcount` (skill-irmã).

---
*Semente-do-lote-2026-06-26 (refino pelo Ritual do Caos pendente). Princípios reescritos das fontes
`alirezarezvani/claude-skills@4a3c05b` (MIT) e `anthropics/knowledge-work-plugins@78d74d5` (Apache-2.0) —
sem cópia literal. Bloco de drill-down + ações corretivas adaptado de
github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B10/support — G11.*
