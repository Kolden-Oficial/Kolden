---
name: npv-irr-e-analise-de-investimento
description: >
  Use quando precisar AVALIAR um investimento, projeto ou aquisição por métodos de valor presente:
  NPV (Valor Presente Líquido), IRR (Taxa Interna de Retorno), MIRR (IRR modificada), Payback
  descontado, e RISK ASSESSMENT via cenários probabilísticos (Monte Carlo simplificado) e árvore
  de decisão para opções reais. Cobre a fórmula, o hurdle rate, a leitura da recomendação e o
  handoff da DECISÃO ao Plutos. Regra dura: NPV positivo é NECESSÁRIO, não SUFICIENTE — cenários
  e sensibilidade têm de vir junto, e a decisão de alocar capital sobe. Gatilhos: "NPV", "IRR",
  "TIR", "VPL", "payback", "vale a pena o investimento", "hurdle rate", "análise de investimento",
  "ROI de projeto", "risk assessment", "monte carlo", "árvore de decisão", "capital budgeting".
  Dono: modelador-financeiro. Decisão de aprovar/rejeitar → handoff ao Plutos (Olimpo/CFO).
tipo: skill
area: Pactolo
up: "[[Pactolo/_MOC-pactolo]]"
---

# NPV, IRR e Análise de Investimento

Camada executável de **capital budgeting** — o método que separa "o projeto se paga" de "o projeto
paga o custo do capital dele". Regra-mãe: **um número sozinho (só NPV, só IRR, só payback) mente**;
a recomendação nasce da tríade `NPV + IRR + Payback` mais **sensibilidade** e **risco** — e a
decisão final é do Plutos.

## 0. Insumos (porta de entrada)

- **Investimento inicial (I0):** capex mais capital de giro incremental do primeiro período.
- **Fluxos livres projetados (FCF_t):** entradas − saídas, LÍQUIDOS de impostos, por período. Vêm
  do modelo de 3 demonstrações (`modelagem-financeira`) ou do plano do projeto.
- **Horizonte (N):** vida útil econômica do ativo/projeto. Além disso, terminal value se aplicável.
- **Hurdle rate (r):** custo de oportunidade do capital. Default = **WACC da empresa** (mesma
  taxa usada em `valuation-por-dcf`). Nunca a inflação sozinha, nunca a taxa livre de risco
  sozinha — hurdle rate é WACC porque é a taxa que os provedores de capital exigem.
- **Fonte de cada input declarada** (razão, orçamento aprovado, benchmark rotulado, premissa).

Sem fluxos, sem horizonte e sem hurdle rate, a análise é palpite — declare isso.

## 1. NPV — Valor Presente Líquido

**Fórmula:**

```
NPV = −I0 + Σ (FCF_t) / (1 + r)^t   , t = 1..N
```

**Leitura:**
- **NPV > 0** → o projeto adiciona valor ao acionista **a essa taxa r**. Aceitar como candidato.
- **NPV = 0** → indiferente (o projeto rende exatamente o hurdle rate).
- **NPV < 0** → o projeto destrói valor a essa taxa. Rejeitar (ou repensar hipóteses).

**Regra dura:** NPV depende do hurdle rate — **mudar r muda a recomendação**. Sempre reporte o r
usado e a **sensibilidade de NPV a r ±1pp** (por exemplo, WACC + 1 ponto percentual).

**Anti-padrões:**
- Comparar NPV de projetos com **horizontes diferentes** sem ajustar (use anuidade equivalente).
- Usar hurdle rate genérico "10%" sem justificar — WACC calculado, ou hurdle rate corporativo
  aprovado pelo Plutos, sempre.
- Ignorar capital de giro incremental no I0 e nos fluxos.

## 2. IRR — Taxa Interna de Retorno

**Definição:** taxa r* que faz **NPV = 0**. Resolvida por iteração (Newton-Raphson) — sem
fórmula fechada. Pseudocódigo prático:

```
r ← 0.10                              # chute inicial
para k em 1..50:                      # até 50 iterações
  npv  = −I0 + Σ FCF_t / (1+r)^t
  d_npv = Σ −t·FCF_t / (1+r)^(t+1)   # derivada de NPV em r
  se |npv| < 1e-6: parar
  r ← r − npv / d_npv                 # passo de Newton
retornar r
```

**Leitura:**
- **IRR > hurdle rate** → aceitar (mesmo veredito de NPV > 0 no fluxo convencional).
- **IRR < hurdle rate** → rejeitar.

**Gotchas fundamentais (leia antes de usar IRR sozinha):**

1. **Fluxos não-convencionais** (sinal de FCF muda mais de uma vez): pode existir **IRR múltipla**
   (mais de uma solução) ou nenhuma real. Nesse caso, IRR é **inválida** — use NPV e MIRR.
2. **Suposição de reinvestimento à própria IRR:** a IRR assume que os fluxos intermediários são
   reinvestidos à taxa IRR. Se IRR = 40% e a empresa reinveste a 12%, a IRR **superestima o
   retorno real**. Use **MIRR** para tirar essa distorção.
3. **Escala:** IRR é uma taxa, não um valor. Um projeto de R$ 100 com IRR 80% cria menos valor
   absoluto que um projeto de R$ 10M com IRR 15%. Quando comparar projetos mutuamente
   exclusivos, **NPV vence IRR** (Damodaran e Ross convergem nisso).

## 3. MIRR — IRR Modificada (a correção honesta da IRR)

Corrige o problema do reinvestimento. Dois pilares: **taxa de finance** (custo dos aportes
negativos) e **taxa de reinvestimento** (retorno realista dos aportes positivos, tipicamente =
WACC).

**Fórmula:**

```
MIRR = ( FV_positivos / PV_negativos )^(1/N) − 1

onde:
  FV_positivos = Σ FCF_t (positivos) × (1 + r_reinvest)^(N−t)
  PV_negativos = Σ |FCF_t (negativos)| / (1 + r_finance)^t
```

**Quando usar MIRR em vez de IRR:**
- Fluxos não-convencionais (IRR múltipla).
- Fluxos com IRR muito alta (60%+) que não se sustenta em reinvestimento realista.
- Comparação entre projetos com perfis de reinvestimento diferentes.

## 4. Payback descontado

**Payback simples** (não descontado) ignora valor do dinheiro no tempo — só sobrevive como
proxy grosseira de liquidez. **Payback descontado** é o método correto: quantos períodos até
o **NPV acumulado** virar positivo.

**Cálculo:**

```
Para cada t:
  NPV_acumulado_t = NPV_acumulado_(t−1) + FCF_t / (1+r)^t

Payback descontado = primeiro t em que NPV_acumulado_t ≥ 0.
```

**Regra dura:** payback descontado é um **filtro de liquidez** (quanto tempo o capital fica
preso), **não** um método de decisão de investimento. Use como cerca (ex.: "projeto reprovado
se payback descontado > 5 anos") em cima de NPV e IRR/MIRR, nunca como único critério.

## 5. Sensibilidade e risk assessment

Um NPV pontual é fraco. Robustez vem de três camadas:

### 5.1 Sensibilidade univariada (tornado chart)

Para cada driver-chave (preço, volume, custo variável, WACC, horizonte, terminal value),
recompute NPV com o driver em ±10% e ±25%. Ordene por magnitude do impacto no NPV — os drivers
do topo da lista são os que **realmente** decidem o projeto. Sem essa lista, o modelo está
"escondendo" onde está o risco.

### 5.2 Cenários discretos (base / otimista / conservador)

Três NPVs coerentes, cada um com as premissas rotuladas. Não é média aritmética — é a
apresentação de **três mundos possíveis** para a decisão.

### 5.3 Monte Carlo simplificado (probabilístico)

Quando os drivers-chave têm distribuição conhecida (ex.: volume ~ triangular, preço ~ normal),
rode 10.000 simulações:

```
Para i em 1..N_sim (ex.: 10.000):
  para cada driver-chave d:
    d_i ← amostra da distribuição de d
  reprojete FCF_t com {d_i}
  NPV_i ← −I0 + Σ FCF_t / (1+r)^t
histograma(NPV) → média, mediana, P5, P50, P95, P(NPV<0)
```

Saída-alvo: **probabilidade de NPV < 0** (perda de valor). Se P(NPV<0) > 30% mesmo com NPV médio
positivo, o projeto é **arriscado demais para o retorno esperado** — sobe ao Plutos com essa
leitura, não com um "vai dar certo".

### 5.4 Árvore de decisão (opções reais)

Quando o projeto tem **estágios com decisão futura** (ex.: piloto agora, expansão só se
piloto passar), NPV pontual subestima o valor porque ignora a **opção de abandonar** ou
**escalar**. Modele como árvore:

```
Nó 0: investir no piloto (I0_piloto)
  ├── ramo A (prob. p): piloto sucede → NPV_expansão
  └── ramo B (prob. 1−p): piloto falha  → NPV_abandono (0 ou negativo residual)

Valor esperado = p × NPV_expansão + (1−p) × NPV_abandono − I0_piloto
```

Isso é **valor de opção real** (Black-Scholes aplicado a projetos, tradição Damodaran). Não é
mágica — depende das probabilidades subjetivas, que precisam ser **declaradas e defendidas**.

## 6. Recomendação (formato de saída para o Plutos)

Nunca entregue só um número. O pacote de decisão tem:

| Item | Conteúdo |
|---|---|
| **NPV** | Valor + hurdle rate usado + sensibilidade a r ±1pp |
| **IRR** | Taxa + comparação com hurdle rate + aviso se fluxos não-convencionais |
| **MIRR** | Taxa (se IRR foi problemática ou se comparação exclusiva pede) |
| **Payback descontado** | Períodos (filtro de liquidez, não de decisão) |
| **Cenários** | NPV em base / otimista / conservador com premissas rotuladas |
| **Tornado** | Ranking dos 5 drivers de maior impacto no NPV |
| **Risco** | P(NPV<0) se Monte Carlo aplicável; senão, cenário-choque descrito |
| **Recomendação** | ACEITAR / CONDICIONAL / REJEITAR + gatilhos que mudariam a leitura |
| **Handoff** | Marcar explicitamente: "**Decisão do Plutos**, não desta skill." |

**Recomendação canônica (regra de bolso, não lei):**

- **ACEITAR:** NPV > 0 **e** IRR > hurdle rate **e** payback descontado dentro do limiar
  corporativo **e** P(NPV<0) < 20% (ou cenário-choque suportável).
- **CONDICIONAL:** NPV > 0 mas depende crítico de 1-2 premissas frágeis (topo do tornado);
  Plutos decide se aceita a dependência.
- **REJEITAR:** NPV ≤ 0 no cenário base, ou IRR < hurdle rate, ou P(NPV<0) > 40%.

## 7. Fronteira e handoffs

- **Decisão de aprovar o investimento** → **Plutos (Olimpo/CFO)**. Esta skill entrega evidência,
  não veredito.
- **Fluxos livres projetados** vêm de `modelagem-financeira` (integridade das 3 demonstrações).
- **WACC** vem de `valuation-por-dcf` (mesmo hurdle rate — não usar taxas diferentes na mesma
  empresa sem justificar).
- **Realizado conciliado** (custo base do capex já incorrido) vem do `controller`.
- **Benchmark de mercado** (múltiplos de retorno setoriais para sanity-check) → **Argos**.

## Herança histórica (o que fundamenta esta skill)

- **Aswath Damodaran — NYU Stern, *Investment Valuation* (2012, 3ª ed.).** Damodaran é a
  autoridade viva em valuation e capital budgeting; publica planilhas abertas em
  damodaran.com com WACC setorial, betas, prêmios de risco. A ideia de que **NPV domina IRR
  em decisões mutuamente exclusivas** e o tratamento de **opções reais** como extensão do
  NPV vêm dessa linhagem.
- **Stephen A. Ross, Randolph W. Westerfield, Jeffrey Jaffe — *Corporate Finance* (12ª ed.,
  McGraw-Hill).** Manual canônico de finanças corporativas — trata NPV, IRR, MIRR, payback e
  seus gotchas (IRR múltipla, escala, reinvestimento) no mesmo capítulo. Ross foi um dos
  criadores da APT (Arbitrage Pricing Theory), então a rigidez sobre "**retorno tem que
  cobrir o custo do capital**" é dele.
- **Steven M. Bragg — *Business Ratios and Formulas: A Comprehensive Guide* (Wiley) e
  *Financial Analysis: A Business Decision Guide*.** Bragg é o operador — o que traduz
  Damodaran/Ross em fórmulas prontas para controllership. Payback descontado como filtro
  de liquidez (não de decisão) e a disciplina de sensibilidade univariada antes de Monte
  Carlo vêm da tradição operacional dele.
- **Frank J. Fabozzi — *Capital Budgeting: Theory and Practice*.** Fonte da consolidação de
  MIRR como resposta canônica aos problemas da IRR e do tratamento de fluxos
  não-convencionais.

Nenhuma cópia literal — os cálculos são padrão consagrado da disciplina; a linha editorial
(peso do NPV sobre IRR, MIRR como correção da distorção de reinvestimento, opção real como
extensão de NPV) segue esta linhagem.

---
*Semente-do-lote-2026-06-26 (refino pelo Ritual do Caos pendente).
Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B10/support —
support-finance-tracker.md (Investment Analysis Framework, G9).*
