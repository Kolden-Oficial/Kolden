---
name: slo-error-budget-burn-rate
description: Use quando precisar definir SLO (Service Level Objective), calcular error budget e monitorar burn rate para governar decisões de release/rollback/rollback automático. Cobre SLI observáveis (availability, latência P95/P99, error rate, freshness), error budget mensal, burn rate multi-window (fast burn 1h e slow burn 6h), alertas por multi-burn-rate (Google SRE workbook), e o link operacional com `estrategias-de-deploy-zero-downtime` (abortar canary por burn rate). Dono&#58; @devops (Gage) + @qa (Quinn). NÃO cobre APM/tracing setup em si (isso é `devops-e-entrega-continua`). NÃO é métrica de PRODUTO (retenção, NPS — isso é Metis/AARRR).
grounding_required: false
categoria_art_iv: MCP-nativo
squads_consumidores: [Prometeu-interno]
---

# SLO, Error Budget e Burn Rate

## Quando invocar

- Novo serviço em produção — antes do primeiro release público, definir SLO
- Depois de incidente SEV1/SEV2 — rever se os alertas dispararam a tempo (spoiler: geralmente não)
- Ajustar canary automático — burn rate é o gate correto
- Discussão "quando podemos fazer feature X sabendo que o serviço está instável" — error budget dá resposta objetiva
- Auditoria contratual — SLA para cliente precisa de SLO interno mais rigoroso (≥1 nine acima)

## Vocabulário (não confundir)

| Termo | Definição | Exemplo |
|---|---|---|
| **SLI** (Service Level Indicator) | Métrica observável | "% de requests com status < 500" |
| **SLO** (Service Level Objective) | Meta interna | "99.9% de availability por mês" |
| **SLA** (Service Level Agreement) | Compromisso com cliente + penalidade | "99.5% ou crédito de 10%" |
| **Error budget** | 1 − SLO | 0.1% do mês = 43.2min |
| **Burn rate** | erro-real / erro-budget (por janela) | 14.4× = queimando budget do mês em 2h |

**Regra dura:** SLO ≥ SLA + 1 nine. Se o cliente quer 99.5%, seu SLO interno é 99.9%. Sem margem, cliente reclama antes de você notar.

## Escolher SLIs

SLI **DEVE** ser:
1. **Observável no cliente** (do ponto de vista de quem usa) — não CPU do container
2. **Ratio simples**: (good events) / (all valid events)
3. **Sem cardinalidade explosiva** (agregável)

### Os 4 SLIs canônicos (Google SRE)

| SLI | Definição | Uso |
|---|---|---|
| **Availability** | % de requests com status HTTP < 500 (excluindo 4xx do cliente) | Web/API |
| **Latency (P95, P99)** | % de requests concluídos em < threshold ms | Web/API interativa |
| **Error rate** | % de requests com erro de negócio | Serviços com falha ≠ 500 |
| **Freshness** | % de dados servidos com idade < X | Pipeline batch/streaming |

**Anti-padrão:** SLI de "média de latência". Média esconde caudas — P95/P99 é o que importa.

## Definir SLO

Regra prática:

| Serviço | SLO típico |
|---|---|
| Web principal (usuário paga) | 99.9% availability, P95 < 300ms |
| API pública SaaS | 99.95% availability, P95 < 500ms |
| Job batch diário | 99% de "runs a tempo (finish before Xh)" |
| Serviço interno não-crítico | 99% availability |
| Sistema safety-critical (financeiro) | 99.99% availability, P99 < 1s |

**Não puxe para 99.999%** — cada 9 a mais custa 10× mais em engenharia. Custo do 5º nine geralmente > receita marginal.

## Error Budget

**Fórmula:** budget = (1 − SLO) × janela_temporal

| SLO | Budget mensal (30d = 43200 min) |
|---|---|
| 99% | 432 min = 7.2h |
| 99.5% | 216 min = 3.6h |
| 99.9% | 43.2 min |
| 99.95% | 21.6 min |
| 99.99% | 4.32 min |

**Uso operacional do budget:**
- Budget disponível → ok fazer releases arriscados, experimentos, migrations
- Budget < 25% → freeze de features não-críticas, foco em confiabilidade
- Budget zerado → freeze total, on-call/pós-mortem obrigatório

Isso não é opinião — é **contrato** entre @dev/@qa/@devops. Sem budget = sem release.

## Burn rate — o alerta correto

**Definição:** burn rate = (erro observado na janela) / (budget na janela).

Se em 1h você consumiu 14.4% do budget de 30 dias, burn rate = 14.4×. Nessa taxa, budget acaba em 2h5min.

### Multi-burn-rate alerts (Google SRE Workbook, cap. 5)

**Um único threshold falha:** slow-burn (queima lenta que dura dias) não dispara; fast-burn (spike de 5min) dispara alertas ruidosos.

**Solução:** dois alertas complementares.

| Alerta | Janela | Burn rate ≥ | Consome do budget mensal |
|---|---|---|---|
| **Fast burn** (page) | 1h | 14.4× | 2% em 1h |
| **Slow burn** (ticket) | 6h | 6× | 5% em 6h |

Se qualquer um dispara, ação:
- Fast burn → page on-call (sev alto — impacto imediato)
- Slow burn → ticket de investigação (impacto agregando — bug latente)

**Adicionar terceiro alerta** para spike curtíssimo (5min, burn rate ≥ 100×) apenas em serviços de altíssima criticidade — geralmente ruído.

### Alerta em Prometheus (exemplo)

```yaml
- alert: FastBurn_1h_14x
  expr: |
    (
      sum(rate(http_requests_total{status=~"5.."}[1h]))
      /
      sum(rate(http_requests_total[1h]))
    ) > (14.4 * 0.001)  # 14.4x do budget para SLO 99.9%
  for: 5m
  labels: { severity: page }
```

## Integração com deploy zero-downtime

Cross-link `estrategias-de-deploy-zero-downtime`. Gate para promover canary:

| Estágio | Burn rate máximo tolerado (janela do estágio) | Ação |
|---|---|---|
| 5% canary | ≤ 2× | promove |
| 25% | ≤ 6× (slow-burn threshold) | promove |
| 50% | ≤ 6× | promove |
| 100% | > 6× | rollback automático |

**Cronograma:** gate mede pelo menos 15min por estágio antes de promover — dá tempo para o burn rate estabilizar.

## Report mensal

Todo mês, publicar:
1. SLO atingido vs meta (99.9% → real 99.87% ✅ / real 99.82% ❌)
2. Budget consumido (%) e distribuição (por incidente, por deploy, por causa)
3. Ações: se budget queimou > 100%, feature freeze até pos-mortem publicado

Cross-link `.claude/rules/workflow-execution.md` — QA Gate depende de report atual.

## Anti-padrões operacionais

### "Metrics driven by cost"

SLI de latência com P95 < 100ms tem custo enorme em compute. Se cliente aceita 300ms, não persiga 100ms. **SLO é sobre expectativa do cliente, não vaidade.**

### "SLO decorativo"

Definir SLO em wiki e ninguém olhar nunca. Regra: SLO **DEVE** ter alerta que dispara na queima, dashboard visível no team channel, e uma decisão obrigatória (freeze de release) quando queima. Sem essas 3 amarras, é decoração.

### "Burn rate sem janela múltipla"

Alerta único (ex: burn rate > 10× em 5min) → fadiga de alerta. Adota multi-burn-rate.

### "SLI que não mede o cliente"

CPU load, memory, "healthy pods count" NÃO são SLIs. Eles são causas potenciais. SLI é EFEITO do ponto de vista do usuário.

### "Excluir tudo que é 'não é minha culpa'"

Tentação: "esse 5xx foi CDN, não conta". Não. SLI é do ponto de vista do cliente — quem cai no seu domínio caiu, ponto. Cause tree analysis é separada.

## Reset de budget

**Rolling window (default recomendado):** 30 dias rolantes. Budget sempre reflete últimos 30d, sem "cliff" no dia 1 do mês.

**Calendar window (alternativa):** budget zera no dia 1. Simples de comunicar, mas cria "sprint final" ruim (queima all budget em 28-30 sabendo que reseta em 1).

## Cross-links

- `estrategias-de-deploy-zero-downtime` — burn rate gate para canary
- `qa-e-quality-gates` — SLO no QA Gate como critério objetivo
- `depuracao-sistematica` — resposta a incidente que causou queima do budget
- `matriz-de-risco-e-contingencia` — SLO virou risco quando budget < 25%

## Herança histórica

**Betsy Beyer, Chris Jones, Jennifer Petoff, Niall Richard Murphy** — editoras do "Site Reliability Engineering" (Google, 2016) e "The Site Reliability Workbook" (2018). Capítulos 4-5 são o texto canônico de SLO/error budget/burn rate. Multi-burn-rate como técnica prática vem do workbook, não do primeiro livro.

**Ben Sigelman** (Lightstep, ex-Google Dapper): "SLO é a interface. SLI é a implementação. SLA é o contrato". Ordem correta de definir: primeiro SLI observável, depois SLO alcançável, depois SLA comercial ≤ SLO.

**Charity Majors** (Honeycomb): SLO observability-first — sem sample de traces distribuídos, SLO é ficção. Aggregation por status HTTP mente para caudas.

**Liz Fong-Jones** (Honeycomb, ex-Google SRE): argumenta que SLO deve ser negociado com produto (não imposto por SRE). Freeze de release é decisão de negócio, não técnica.

**Rob Ewaschuk** (Google SRE) — autor do capítulo 6 do primeiro SRE book ("Monitoring Distributed Systems"): "4 golden signals" — latency, traffic, errors, saturation. Fundação dos SLIs de web/API.

## Anti-padrões (recap)

- ❌ Média de latência como SLI
- ❌ CPU/memória como SLI
- ❌ SLO sem alerta
- ❌ SLO sem consequência (nunca vira freeze)
- ❌ Burn rate single-window
- ❌ SLA ≥ SLO (contrato mais rigoroso que interno)
- ❌ Perseguir 5-9s sem análise de custo/receita
- ❌ Excluir "erros externos" da conta — cliente sentiu, então conta

---
*Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B03/engineering.*
