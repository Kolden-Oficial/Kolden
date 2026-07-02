---
name: pipeline-velocity
description: >
  Use para CALCULAR e MONITORAR pipeline velocity — a métrica única que amarra saúde comercial:
  Pipeline Velocity = (Nº deals qualificados × ticket médio × win rate) / ciclo de vendas em dias.
  Cobre as 4 alavancas monitoradas separadamente, decomposição por estágio para achar o gargalo,
  benchmarks SaaS (David Skok / Bessemer / OpenView), e regra IF velocity cai N% ENTÃO investigar
  qual alavanca quebrou (não mudar todas ao mesmo tempo). Gatilhos: "pipeline velocity",
  "velocidade do pipeline", "quanto pipeline por dia", "ciclo de vendas caiu/subiu", "onde está o
  gargalo", "conversão por estágio", "funil de vendas". Dono: analista-de-pipeline.
---

# Pipeline Velocity

Métrica-âncora do analista-de-pipeline. Uma linha diz mais que 40 dashboards: quanto revenue por dia
o pipeline gera hoje. Se cai, sabemos exatamente qual das 4 alavancas quebrou — porque ela
**decompõe-se em fatores independentes**.

## 1. A fórmula

```
Pipeline Velocity =  (Nº deals qualificados × ticket médio × win rate)
                    ─────────────────────────────────────────────────
                                  ciclo de vendas (dias)
```

**Unidade:** revenue por dia (R$/dia ou US$/dia).

**Leitura:** "com o pipeline de hoje, gero R$ X por dia de revenue projetado". Duas semanas depois,
comparar. Se caiu, ir nas alavancas.

## 2. As 4 alavancas — monitorar separadamente

| Alavanca | O que mede | Onde puxar | Alavancável por |
|---|---|---|---|
| **Nº de deals qualificados** | Volume que entra no pipeline com SQL aceito | GHL: contagem de oportunidades por período | `qualificador-de-leads`, `executivo-de-cadencia` (topo) |
| **Ticket médio (ACV)** | Valor médio por oportunidade qualificada | GHL: soma_valor / count(oportunidades) | `redator-de-propostas`, política de preço (Afrodite) |
| **Win rate** | Fechados-ganhos / (fechados-ganhos + fechados-perdidos) | GHL: contagem por status final | `coach-de-discovery`, `engenheiro-de-pre-vendas`, `redator-de-propostas` |
| **Ciclo de vendas** | Dias médios entre criação e fechamento (ganho ou perdido) | GHL: média(data_close - data_criação) | Todo o squad (fluidez em cada estágio) |

**Regra dura:** olhar as 4 juntas engana. Ex.: velocity subiu 20%, mas foi só porque ticket médio
inflou com 1 outlier — na verdade, volume e win rate caíram. Sem decomposição, decisão é errada.

## 3. Benchmarks (referência de calibração — não meta absoluta)

Fonte: David Skok (matrixpartners.com "SaaS Sales Metrics", 2010+), Bessemer BVP State of the Cloud,
OpenView Benchmark Report — SaaS B2B típico:

| Segmento | Ciclo médio | Win rate esperado | ACV típico |
|---|---|---|---|
| **SMB transacional** | 15-45 dias | 20-30% | US$ 5k-25k |
| **Mid-market** | 60-120 dias | 15-25% | US$ 25k-100k |
| **Enterprise** | 180-360 dias | 10-20% | US$ 100k+ |

**Uso:** se sua operação SMB está com ciclo de 90 dias, o benchmark aponta que o gargalo é ciclo,
não win rate. Não fritar o vendedor por win rate 22% se ciclo está fora do padrão.

## 4. Decomposição por estágio — onde o funil quebra

Velocity global esconde onde o problema mora. Sempre decompor por estágio:

- **Taxa de conversão estágio → estágio** (SQL → Discovery → Demo → Proposta → Negociação → Fechado).
- **Tempo médio em cada estágio** (dias que o deal fica parado).
- **Motivo de saída** (perdido para concorrente / status quo / sem verba / sem decisão).

**Gargalo identificado (exemplo real):** SQL → Discovery converte 80%; Discovery → Demo despenca
para 40% em Q3 (vs 65% em Q2). Diagnóstico: mudança de qualificação recente subiu volume mas
qualidade do SQL caiu — ou o `coach-de-discovery` precisa reforçar `spin-selling` na abertura da
call. Ação vai onde o problema mora, não em treinar todo mundo em fechamento.

## 5. Regra de investigação — velocity cai N%, o que fazer

Se velocity cai ≥ 15% semana-sobre-semana ou ≥ 25% mês-sobre-mês:

1. **Decompor** — qual das 4 alavancas caiu?
2. **Isolar estágio** — se ciclo subiu, qual estágio ficou parado?
3. **Hipótese** — o que mudou (produto, preço, mercado, mix de canal, contratação de rep, sazonal)?
4. **Não mudar tudo** — corrigir uma variável de cada vez, senão não sabe o que funcionou.
5. **Reportar** — se a raiz é política (preço, ICP, metas), escalar ao Afrodite; se é execução
   (discovery, demo, proposta), acionar o especialista dono.

**Anti-padrão canônico:** velocity caiu → CEO manda "vender mais" → time compensa com desconto →
win rate volta um pouco mas ticket médio cai → velocity segue igual → pior: margem morreu. Correto:
decompor primeiro.

## 6. Frequência e ritual

- **Leitura semanal** (segunda de manhã): dashboard das 4 alavancas + velocity global.
- **Deep-dive quinzenal** (com `analista-de-pipeline`): decomposição por estágio + hipóteses.
- **QBR trimestral** (`emporos-chief` + Afrodite): tendência trimestre-sobre-trimestre + política.

## 7. Handoffs

- Ciclo de vendas subiu > 20% e concentrado em estágio X → acionar dono do estágio
  (`coach-de-discovery` / `engenheiro-de-pre-vendas` / `redator-de-propostas` / `emporos-chief`).
- Win rate caiu > 15% com concorrente X citado ≥ 3× no motivo → acionar `battlecard-fia` para
  refresh.
- Volume de SQL caiu > 25% → escalar ao `executivo-de-cadencia` (topo do funil) + Ariadne.
- Ticket médio caiu > 15% sem mudança de mix → escalar ao Afrodite (política de preço/desconto).

## Saída

Formato do `analista-de-pipeline`: PERÍODO / VELOCITY / ALAVANCAS (deals × ACV × win_rate × ciclo)
/ DECOMPOSIÇÃO POR ESTÁGIO / GARGALO IDENTIFICADO / HIPÓTESE / AÇÃO PROPOSTA / DONO / PRAZO.
Fonte: GHL via Infisical.

## Herança histórica

- **David Skok** — sócio Matrix Partners; ensaio seminal "SaaS Metrics 2.0" (2013, matrixpartners.com)
  formalizou pipeline velocity como métrica-âncora e sua decomposição.
- **Aaron Ross** ("Predictable Revenue", 2011) — introduziu a mentalidade de "revenue machine" com
  variáveis independentes, precursor da decomposição em 4 alavancas.
- **Bessemer Venture Partners** — publica State of the Cloud com benchmarks setoriais.
- **OpenView Partners** — Benchmark Report anual (SaaS por segmento e stage).
- **Jason Lemkin** (SaaStr) — disseminou o vocabulário e a leitura pública dos benchmarks.

---
*Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B06/sales, ID G31.
Reescrito sem cópia literal.*
