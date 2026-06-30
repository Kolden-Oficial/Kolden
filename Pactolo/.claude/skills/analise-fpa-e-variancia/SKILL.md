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

## Fronteira
Decisão de corte/realocação/meta é do **Plutos (Olimpo/CFO)** — esta skill prepara o número e o porquê,
não decide. Métrica de produto vem do **Metis**; benchmark de mercado, do **Argos**.

---
*Semente-do-lote-2026-06-26 (refino pelo Ritual do Caos pendente). Princípios reescritos das fontes
`alirezarezvani/claude-skills@4a3c05b` (MIT) e `anthropics/knowledge-work-plugins@78d74d5` (Apache-2.0) —
sem cópia literal.*
