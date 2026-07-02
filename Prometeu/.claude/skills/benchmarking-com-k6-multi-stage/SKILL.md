---
name: benchmarking-com-k6-multi-stage
description: >
  Use quando a demanda for benchmark de performance de API/backend com k6 em
  4 estágios canônicos — smoke (1 VU × 1min, sanity), load (target VUs steady
  state × 15min, comportamento normal), stress (ramp até quebrar, ponto de saturação)
  e soak (target VUs × 4h, memory leak detection). Define thresholds automáticos
  (P95 < X ms, error rate <1%), gate no CI (smoke bloqueante), nightly (load),
  sob demanda (stress/soak). Cobre setup de scenarios, extração de métricas para
  Prometheus/Grafana, e leitura correta de "onde quebra" (não é sempre CPU;
  frequentemente é DB pool exhausted OU conexão hanging OU GC pause). Gatilhos:
  "k6", "benchmark", "load test", "stress test", "soak test", "quanto RPS aguenta",
  "onde quebra", "memory leak em produção", "performance sustentada". Dono: @qa
  (Quinn). Skill filha de `testes-de-api-funcional-seguranca-performance` (frente 3).
---

# Benchmarking com k6 multi-stage

k6 é a régua canônica Kolden para performance de backend. Esta habilidade estrutura os 4 estágios
de teste que respondem perguntas diferentes.

## Os 4 estágios

| Estágio | Duração | VUs | Pergunta que responde |
|---|---|---|---|
| **Smoke** | 1min | 1 | Rodou? Sem erro básico? |
| **Load** | 15min | target (~usuários simultâneos esperados) | Aguenta uso normal com folga? |
| **Stress** | ramp | 0 → ∞ | Em qual ponto quebra? |
| **Soak** | 4h | target | Aguenta 4h sem memory leak? |

**Ordem no CI:**
- **Cada PR:** smoke (bloqueia merge se falhar)
- **Nightly (main):** smoke + load
- **Semanal (main):** smoke + load + stress + soak

## Setup canônico

```js
// smoke.js
import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
  vus: 1,
  duration: '1m',
  thresholds: {
    http_req_failed: ['rate<0.01'],       // erro <1%
    http_req_duration: ['p(95)<500'],     // P95 <500ms
  },
}

export default function () {
  const res = http.get('https://api.kolden.com.br/v1/health', {
    tags: { name: 'health' },
  })
  check(res, {
    'status 200': (r) => r.status === 200,
    'body has ok': (r) => r.json('status') === 'ok',
  })
  sleep(1)
}
```

## Load test (comportamento normal)

Objetivo: **provar que a API roda estável em carga esperada** por 15min contínuos.

```js
export const options = {
  scenarios: {
    steady: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '1m', target: 100 },   // ramp-up
        { duration: '15m', target: 100 },  // steady
        { duration: '1m', target: 0 },     // ramp-down
      ],
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<500', 'p(99)<1000'],
    checks: ['rate>0.99'],
  },
}
```

**Gate:** todo threshold cumprido. P99 e P95 dentro do PRD.

## Stress test (ponto de quebra)

Objetivo: descobrir o RPS máximo antes de erro rate subir. Não é para provar que aguenta —
é para **descobrir onde quebra**.

```js
export const options = {
  scenarios: {
    stress: {
      executor: 'ramping-arrival-rate',
      startRate: 10,
      timeUnit: '1s',
      preAllocatedVUs: 200,
      maxVUs: 2000,
      stages: [
        { duration: '2m', target: 100 },
        { duration: '2m', target: 500 },
        { duration: '2m', target: 1000 },
        { duration: '2m', target: 2000 },
        { duration: '2m', target: 4000 },  // provavelmente quebra aqui
      ],
    },
  },
}
```

**Análise pós-run:** onde P95 saiu de <500ms? Onde error rate passou 1%? Esse ponto é seu
**breaking point**. Documentar no PRD.

Gotcha: **k6 quebrar** ≠ **API quebrar**. Se máquina do k6 está a 100% CPU antes da API,
você mediu k6, não API. Rodar k6 distribuído (k6-operator no k8s) ou de máquina mais forte.

## Soak test (memory leak detection)

Objetivo: rodar carga steady por 4h e ver se **memória cresce sem retorno**.

```js
export const options = {
  scenarios: {
    soak: {
      executor: 'constant-vus',
      vus: 100,
      duration: '4h',
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<500'],
  },
}
```

**Analisar em paralelo:** métricas do servidor (`process_resident_memory_bytes` no Prometheus).
Gráfico deveria ser plano após warmup. Se sobe linear ao longo de 4h → leak.

Suspeitos comuns:
- Cache sem TTL
- Connection pool sem release
- Listener sem cleanup
- Closure capturando array em endpoint

## Onde a API quebra (não é CPU 99% das vezes)

Padrões de quebra que k6 revela:

| Sintoma | Causa provável |
|---|---|
| P99 sobe de 200ms para 5s durante ramp | **DB pool exhausted** — connection queue |
| Erro rate 100% aos 1000 VUs | **Rate limit interno** OU **file descriptors esgotados** |
| P95 estável, P99 dispara | **GC pause** — heap grande |
| Erro 502/504 | Load balancer timeout antes do backend responder |
| Erro conectionreset | keep-alive esgotado, socket exhaustion |
| Erro Timeout | DNS lento OU DB stall |

**Nunca conclua "CPU saturada" sem ver htop/`top` do servidor.**

## Métricas custom (a API tem métrica própria?)

Se a API expõe `/metrics` (Prometheus), correlacione durante o teste:
- `db_pool_wait_ms` — tempo esperando conexão
- `queue_size` — fila interna
- `cache_hit_ratio` — quedas indicam invalidação em massa

Sem essas métricas, você está adivinhando.

## Integração no CI (GitHub Actions exemplo)

```yaml
# .github/workflows/perf-smoke.yml
name: perf-smoke
on: [pull_request]
jobs:
  smoke:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: grafana/setup-k6-action@v1
      - run: k6 run --quiet --summary-export=summary.json tests/perf/smoke.js
      - if: failure()
        run: cat summary.json
```

Nightly separado com `schedule: cron: '0 3 * * *'`.

## Gotchas Kolden

- **Teste em staging igual a prod.** Diferença de instância/DB → resultado inválido.
- **Warmup obrigatório antes de medir.** k6 tem `stage` inicial só para JIT/cache. Não considerar
  P95 dos primeiros 30s.
- **k6 nunca contra prod cliente sem autorização escrita.**
- **Métricas do servidor durante o teste** — sem isso, você mede latência mas não sabe o porquê.

## Handoffs

- **Descoberta de gargalo em app** → Dex (@dev). Fix de código.
- **Gargalo em DB** → Dara (@data-engineer). Query plan / índice.
- **Latência afeta CWV** → Ariadne (`core-web-vitals-e-performance`).
- **Capacidade insuficiente para escala projetada** → Aria (@architect) revisa. Sizing errado é
  decisão arquitetural.

## Regras Kolden

- **k6 open-source rodando no Kolden** (nunca k6 Cloud SaaS — soberania).
- **Métricas exportadas para Grafana Kolden** (não para Grafana Cloud).
- **Nightly run é sob supervisão do @devops** (Gage). Ele mata em caso de custo.
- **Baseline versionado.** Salvar summary.json de cada run em `docs/perf/baseline/`. Regressão =
  P95 20% pior que baseline.

---
## Atribuição
Herança histórica: **Ragnar Lönn** — co-fundador k6 (2016, Load Impact/Grafana); **Simon Aronsson**
— k6 core engineer; **Grafana Labs** — k6-operator + integração Prometheus/Loki; **Ian Molyneaux**
— *The Art of Application Performance Testing* (2009, princípios de load/stress/soak); **Neil
Gunther** — *Guerrilla Capacity Planning* (2007, curva de latência × utilização, "hockey stick").
Adaptado de `github.com/msitarzewski/agency-agents@a597cb6` (MIT), bucket B03/engineering,
IDs TEST G13, G15.
