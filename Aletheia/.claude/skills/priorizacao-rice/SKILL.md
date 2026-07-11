---
name: priorizacao-rice
description: |
  Use quando precisar priorizar iniciativas/features/experimentos por score numérico ponderado
  (Reach × Impact × Confidence / Effort). Acione em planejamento trimestral, montagem de roadmap,
  decisão entre N hipóteses validadas com volume diferente. Para escopo de release use MoSCoW (handoff
  Prometeu/po); para tipo de satisfação use Kano. RICE é insumo de debate, não decisão automática.
domain: discovery-and-validation
subdomain: priorizacao
agente_primario: [aletheia-chief]
heranca_historica: [sean-mcbride-intercom, don-reinertsen-cost-of-delay]
tags: [rice, priorizacao, roadmap, scoring, validacao, reach-impact-confidence-effort]
cross_links:
  - aletheia/mapa-de-assuncoes
  - aletheia/desenho-de-experimento
  - prometeu/moscow-kano-mcda (cross-link bidirecional)
fonte_upstream: msitarzewski--agency-agents@a597cb6 (G8)
tipo: skill
area: Aletheia
up: "[[Aletheia/_MOC-aletheia]]"
---

# Priorização RICE (Reach × Impact × Confidence / Effort)

> _Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (G8, MIT © 2025 AgentLand Contributors). Origem histórica: Sean McBride/Intercom._

Especialista responsável: `aletheia-chief` (secundário: `david-bland` para casamento com test cards;
handoff para Prometeu/`po` quando a decisão sair de validação e entrar em escopo de release).

## O que é RICE

Framework de **priorização de iniciativas, features ou experimentos** por **score numérico**:

```
RICE = (Reach × Impact × Confidence) / Effort
```

Score maior = prioridade maior. Use para **ORDENAR** uma lista, **não** como veredicto automático
de o que construir — o modelo serve ao debate, não substitui a decisão.

**Origem histórica:** Sean McBride na **Intercom (~2018)**, como resposta ao sintoma crônico de
"tudo é P0" no roadmap. RICE é a simplificação operacional do **WSJF (SAFe)** e do **Cost of Delay**
de **Don Reinertsen** para times de produto que precisavam de algo executável em planilha.

## Os 4 fatores

### 1. Reach (alcance)
- **Quantos usuários/clientes/eventos** serão impactados **por unidade de tempo** (geralmente por trimestre).
- Use **número absoluto baseado em dado real**, nunca percentual ("70% da base" esconde o tamanho).
- Exemplo: "8.000 usuários ativos vão usar este recurso/trimestre" — extraído do analytics, não chutado.

### 2. Impact (impacto por usuário)
- **Escala fixa:** `3` (massivo) / `2` (alto) / `1` (médio) / `0.5` (baixo) / `0.25` (mínimo).
- Pergunta: *"Quanto isso move a métrica-norte para cada usuário individual atingido?"*
- **Calibração:** olhe iniciativas passadas já mensuradas e atribua impact em retrospecto antes de
  pontuar as futuras. Sem calibração, a escala vira otimismo do PM.

### 3. Confidence (confiança)
- **Percentual de certeza** nos números acima.
- `100%` = dado direto + experimento prévio já confirmou.
- `80%` = dado parcial + analogia forte com caso anterior conhecido.
- `50%` = chute educado, sem evidência direta.
- **`<50%`** = você **não deveria estar priorizando ainda** — falta validação. Volte para
  `mapa-de-assuncoes` ou `desenho-de-experimento` e teste a assunção mais arriscada primeiro.

### 4. Effort (esforço em pessoa-mês)
- **Tempo de pessoa × meses** para entregar — **não** calendário.
- Inclui dev + design + research + QA + lançamento (tudo até o usuário tocar).
- Granularidade: `0.25` (1 semana de 1 pessoa) a `12+` (mega-iniciativa).
- **Pessoa-mês:** 1 pessoa × 3 meses = 3 PM, **igual a** 3 pessoas × 1 mês = 3 PM. Não confunda
  com "3 meses de calendário".

## Fórmula

```
RICE = (Reach × Impact × Confidence) / Effort
```

## Exemplo prático

| Iniciativa | Reach (Q) | Impact | Confidence | Effort (PM) | RICE |
|---|---:|---:|---:|---:|---:|
| Onboarding redesenhado | 12.000 | 2.0 | 80% | 3 | **6.400** |
| Notificações inteligentes | 8.000 | 1.0 | 100% | 2 | **4.000** |
| Dashboard CSV export | 500 | 1.0 | 100% | 0.5 | **1.000** |
| AI assistant in-app | 3.000 | 3.0 | 50% | 6 | **750** |

→ **Onboarding redesenhado vence** — Reach >3× as alternativas e Confidence boa compensam o Effort
maior. O **AI assistant** parece sexy mas Confidence 50% mata o score: precisa validar antes de
priorizar para build.

## Anti-padrões (não faça)

- **Reach em percentual** ("70% da base") — use **número absoluto**; percentual esconde escala.
- **Impact por ambição, não por dado** — sem retrospectiva, todo PM atribui 3.0 ao próprio projeto.
- **Confidence sempre 100%** — você está mentindo para si mesmo. **<80% é honesto** na maioria dos casos.
- **Effort em calendário** ("3 meses") — sempre **pessoa-mês**, senão times com tamanhos diferentes
  ficam incomparáveis.
- **RICE como decisão final** — é **insumo de debate**. Estratégia, regulação, dívida técnica e
  equidade do roadmap também pesam.
- **Comparar RICE entre tipos heterogêneos** (bug fix vs. nova feature vs. tech debt) sem
  normalização — score absoluto perde sentido entre categorias muito distintas.

## Quando NÃO usar RICE

- **Decisão estratégica de pivô** — RICE é otimização local; pivô é mudança da função objetivo.
- **Iniciativa única sem alternativa** — priorizar 1 item sozinho é teatro.
- **Confidence uniformemente baixo (<50%) em toda a lista** — você precisa **validar antes**, não
  priorizar. Handoff para `desenho-de-experimento`.

## Cross-links com outras técnicas

- **MoSCoW (Must / Should / Could / Won't):** classificatório, não numérico. Use para **escopo de
  release** dentro de uma versão. RICE define ordem **dentro** de uma classe MoSCoW.
- **Kano (Basic / Performance / Delighter):** tipo de satisfação que o usuário sente. RICE é
  custo-benefício de entrega. Iniciativas Delighter podem ter RICE baixo e ainda valer a pena
  entregar por razão estratégica.
- **Eisenhower (urgente × importante):** matriz binária para saturação temporal de curto prazo;
  RICE é a ferramenta de planejamento trimestral.

## Cross-link com Prometeu (bidirecional)

O Prometeu tem a skill `moscow-kano-mcda` no agente `po` (decisão F5 do B04). Convenção:

- **RICE (Aletheia)** — priorização quantitativa para iniciativas **em validação/discovery**.
- **MoSCoW + Kano (Prometeu/po)** — escopo de **release de produto em desenvolvimento**.

Quando a hipótese sai do gate da Aletheia (perseverar com evidência) e entra em build,
faça handoff para Prometeu/`po` com o score RICE como contexto, e ele aplica MoSCoW+Kano para
fatiar o escopo do release.

## Processo de aplicação

1. **Liste as iniciativas candidatas** (mínimo 3, ideal 8-15). Menos que 3, não compense usar RICE.
2. **Estime Reach** com dado real (analytics, base atual). Documente a fonte.
3. **Estime Impact** na escala fixa, calibrando contra iniciativas passadas já medidas.
4. **Estime Confidence** com honestidade. Marque tudo abaixo de 50% como "validar antes".
5. **Estime Effort** em pessoa-mês com input do time técnico (não do PM sozinho).
6. **Calcule e ordene.** Apresente como insumo de debate, não como veredito.
7. **Marque as iniciativas com Confidence baixa** para o trilho de validação (`mapa-de-assuncoes`
   → `desenho-de-experimento`) antes de retornarem ao roadmap.

## Saída esperada

- **Tabela RICE** completa com fonte de cada estimativa.
- **Top-N priorizado** (geralmente 3-5).
- **Lista paralela** das iniciativas com Confidence < 50% que vão para validação primeiro.
- **Handoff explícito** para Prometeu/`po` quando uma iniciativa do top-N for aprovada para build.

## Herança histórica

- **Sean McBride — Intercom (~2018):** criou e publicou RICE como simplificação operacional.
- **Don Reinertsen — Cost of Delay / WSJF:** base teórica anterior (Weighted Shortest Job First do SAFe).
- RICE preserva o espírito do Cost of Delay (custo do atraso vs. tamanho do trabalho) num formato
  que cabe numa planilha de time de produto.
