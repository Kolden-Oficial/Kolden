---
name: testes-de-api-funcional-seguranca-performance
description: >
  Use quando a demanda for testar uma API (REST, GraphQL, gRPC, webhook) em 4
  frentes coordenadas — funcional (contrato + happy path + edge cases), segurança
  (OWASP API Top 10), performance (k6 baseline/stress/soak), e contract testing
  (Pact provider/consumer). Cobre a pirâmide de foco (mais funcional que
  segurança, mais segurança que perf, mais perf que contract), ferramentas
  canônicas (Bruno, Postman, schemathesis, k6, Pact) e como amarrar os 4 no CI.
  Gatilhos: "testar API", "teste de contrato", "OWASP API", "k6", "Pact",
  "contract testing", "schemathesis", "load test", "stress test", "smoke API".
  Dono: @qa (Quinn). Cross-link Égide (`seguranca-de-api`) para OWASP API Top 10
  operacional. Cross-link Ariadne (`core-web-vitals-e-performance`) para thresholds
  de latência em endpoints que servem UI.
---

# Testes de API — 4 frentes coordenadas

API sem teste é caixa preta. Esta habilidade estrutura os 4 tipos de teste que uma API
Kolden precisa antes de ir a produção: **funcional, segurança, performance, contrato** —
com pirâmide de foco (não é 25% cada; é 40/25/20/15).

## Pirâmide de foco

```
             ┌──────────┐
             │ Contract │  15% — provider ↔ consumer
             ├──────────┤
             │   Perf   │  20% — k6 baseline/stress/soak
             ├──────────┤
             │Segurança │  25% — OWASP API Top 10
             ├──────────┤
             │ Funcional│  40% — contrato + happy + edge
             └──────────┘
```

Justificativa: teste funcional é o que impede regressão diária. Segurança é obrigação legal.
Performance é gate pré-release. Contract é gate anti-quebra em ecossistema microservices.

## Frente 1 — Funcional (40%)

**Ferramentas Kolden:** Bruno (CLI + Git-friendly, .bru files versionados) OU Postman + Newman.
Schemathesis para testes contratuais a partir de OpenAPI.

### Cobertura mínima por endpoint
1. **Contrato:** resposta bate com o schema OpenAPI/JSON Schema? Campos obrigatórios presentes? Tipos corretos?
2. **Happy path:** input válido → resposta 2xx com corpo esperado.
3. **Autenticação:** sem token → 401. Token expirado → 401. Token válido → 200.
4. **Autorização:** usuário sem permissão → 403. Usuário com permissão → 200.
5. **Validação de input:** input inválido (tipo errado, campo obrigatório ausente, string além do max) → 400 com corpo explicando.
6. **Idempotência:** POST criando recurso duplicado (mesmo idempotency-key) → mesmo resultado.
7. **Rate limit:** 100 requests em 10s → algumas retornam 429.
8. **Erro do servidor:** DB fora → 503 (não 500 genérico expondo stack).

### Schemathesis (contract testing a partir do OpenAPI)
```bash
schemathesis run https://api.kolden.com.br/openapi.json \
  --checks all --hypothesis-max-examples 100
```
Gera inputs aleatórios que respeitam o schema e checa que a resposta também respeita. Pega
"funciona no meu Postman" que só funciona com o input que você digitou.

## Frente 2 — Segurança (25%)

**Cross-link Égide `seguranca-de-api`** — Égide é dona da metodologia OWASP API Top 10.
Aqui aplicamos como teste automatizado.

### OWASP API Top 10 (2023) — checklist executável
1. **BOLA (Broken Object Level Authorization):** trocar ID do recurso na URL — usuário A consegue GET/PUT/DELETE do recurso do usuário B?
2. **Broken Authentication:** token JWT sem assinatura passa? Refresh token infinito?
3. **BOPLA (Broken Object Property Level):** enviar campo que só admin deveria alterar (`role: admin`) num PUT — endpoint aceita?
4. **Unrestricted Resource Consumption:** GET sem paginação retorna 1M linhas? Upload sem limite de tamanho?
5. **BFLA (Broken Function Level Authorization):** usuário comum consegue chamar endpoint `/admin/*`?
6. **Unrestricted Access to Sensitive Business Flows:** cadastro sem CAPTCHA permite 10k bots/hora?
7. **SSRF (Server-Side Request Forgery):** endpoint que baixa URL do usuário aceita `http://169.254.169.254` (metadata AWS)?
8. **Security Misconfiguration:** CORS `*`, headers de segurança ausentes, erros expondo stack trace?
9. **Improper Inventory Management:** endpoint `/v1/*` deprecated ainda no ar sem WAF?
10. **Unsafe Consumption of APIs:** API interna confia cegamente em resposta de API externa?

Ferramentas: **OWASP ZAP** (fuzz + scan), **Burp Suite** (interceptação), **kiterunner** (endpoint discovery).

## Frente 3 — Performance (20%)

**Ferramenta padrão:** k6 (JavaScript, open-source Grafana). Cross-link skill
`benchmarking-com-k6-multi-stage` para os 4 estágios (smoke, load, stress, soak).

### Baseline mínimo
- **P50, P95, P99** de latência
- **RPS sustentado** antes de degradar (erro rate >1%)
- **Memory + CPU** do servidor durante teste (Prometheus/Grafana)

### Gates de release
- P95 < objetivo do PRD (default: 500ms para API pública, 200ms para BFF)
- Error rate <1% em load test steady state
- Memory sem leak em soak 4h

## Frente 4 — Contract testing (15%)

**Ferramenta:** Pact (consumer-driven contract).

Cenário: microservice A consome API de microservice B. Como impedir que B mude e quebre A **sem**
subir A inteiro em CI de B?

1. A (consumer) escreve teste declarando o que espera de B: "quando eu chamar `GET /users/1`, espero
   `{id: 1, name: string}`".
2. Teste gera **pact file** (JSON de contrato).
3. Pact file é publicado num Pact Broker.
4. CI de B (provider) baixa o pact e verifica: "minha resposta atual satisfaz o que A espera?".
5. Se B muda de forma incompatível → CI de B quebra ANTES de A quebrar em produção.

Regra: use Pact **só entre serviços internos com contrato instável**. Se API é pública e versionada
por OpenAPI, prefira schemathesis + contract compat check no CI (openapi-diff).

## Integração no CI

Ordem recomendada por PR:
1. **Smoke funcional** (2min) — bloqueia PR se falha básica
2. **Contract test** (5min) — bloqueia PR se pact quebra
3. **Security lint** (10min) — OWASP scan estático

Ordem nightly:
1. **Full functional** (schemathesis + edge cases) — 30min
2. **k6 load** (steady 15min)
3. **Security dinâmica** (ZAP full scan)

Ordem semanal:
1. **k6 soak** (4h)
2. **k6 stress** (até quebrar)

## Handoffs

- **OWASP API Top 10 profundo** → Égide (`seguranca-de-api`). Ela é dona da metodologia; Quinn opera o teste automatizado.
- **k6 avançado (thresholds custom, distributed load)** → skill irmã `benchmarking-com-k6-multi-stage`.
- **Contract quebrando por design de payload** → Aria (@architect) revisa contrato.
- **Latência degradada afeta CWV** → Ariadne (`core-web-vitals-e-performance`).

## Regras Kolden

- **Bruno > Postman** para novo projeto: arquivos `.bru` versionam em Git, colaboração assíncrona.
  Postman colecionamento por usuário → não versiona bem.
- **Nenhum teste de segurança em produção sem autorização escrita.** Fuzzing contra prod é evento
  que precisa nota (Égide + @devops).
- **k6 nunca contra terceiro sem contrato.** Não faça load test contra API pública de fornecedor
  sem SLA que permita.
- **Contract broker self-hosted:** Pact Broker roda no Kolden (soberania). Nunca SaaS de fornecedor.

---
## Atribuição
Herança histórica: **Alberto Lerner** — Bruno CLI (2023, alternativa Git-native ao Postman);
**Kent C. Dodds** — testing trophy (2018, mais integração que unit em API); **OWASP API Security
Project** — API Top 10 (2019, revisão 2023); **Ian Molyneaux** — *The Art of Application
Performance Testing* (2009); **Ragnar Lönn** + team Grafana — k6 (2017); **Beth Skurrie** +
**Matt Fellows** — Pact (2013, DiUS Computing → SmartBear). Cross-link Égide para operação
OWASP API Top 10. Adaptado de `github.com/msitarzewski/agency-agents@a597cb6` (MIT), bucket
B03/engineering, IDs TEST G5, G6, G7, G8.
