---
name: governanca-de-contratos-de-api
description: Use para tratar API como **contrato-first** — OpenAPI (REST) ou AsyncAPI (mensageria) como source-of-truth versionado, validação em CI (schemathesis, dredd), backward compat check obrigatório (openapi-diff), versioning strategy explícita (URL vs header) e timeline de deprecação assinado por dono. Gatilhos típicos: "governar API", "OpenAPI", "AsyncAPI", "contrato-first", "backward compat", "quebra de contrato", "schemathesis", "versionar API", "deprecar endpoint", "spec de API como source-of-truth". NÃO cobre implementação de handler HTTP (isso é `padroes-de-engenharia-idiomatica`) nem segurança de API (isso é `seguranca-de-api` no Égide) — esta habilidade estabelece a **disciplina de contrato**.
agent-owner: architect (Aria)
maturity: 7.5
origem: msitarzewski/agency-agents@a597cb6 · ID G11 · bucket B03 engineering
grounding_required: false
categoria_art_iv: MCP-nativo
squads_consumidores: [Prometeu-interno]
---

# Governança de Contratos de API

## Herança Histórica

**Metodologia base:** _Ollie Doyle / Zally_ (Zalando, 2015) para linting de OpenAPI como CI gate; _SmartBear / OpenAPI Initiative_ para a spec canônica (OpenAPI 3.1, AsyncAPI 3.0); _Sam Newman — Building Microservices_ (2ed, 2021) capítulo 4 (Integration) para expand-contract em contratos; _Martin Fowler — Consumer-Driven Contracts_ (2006) e _Pact.io_ (2013) para o padrão consumer-driven; _Ian Robinson — Richardson Maturity Model_ (2008) para maturidade REST. _Google API Design Guide_ (2016+) para versioning e naming.

**Assinatura vocabular:** "contract-first", "source-of-truth", "backward compat", "breaking change", "expand-contract", "consumer-driven contract", "deprecation window", "spec-driven CI".

## Quando invocar

Dispara quando:
- Nova API pública (ou interna cross-team) está sendo desenhada.
- API existente foi quebrada em produção sem que ninguém percebesse no PR.
- Precisa versionar API pela primeira vez (v1 → v2, ou v1 → v1.1).
- Consumer se queixou de mudança silenciosa em field.
- Time debate "URL versioning vs header versioning" — precisa decisão fundamentada.

NÃO dispara quando:
- API é interna e efêmera (não tem consumer externo, muda toda semana).
- É um webhook único de terceiro (consumer é você — usa a spec deles).

## O Método (5 disciplinas)

### 1. Spec como Source-of-Truth

- **OpenAPI 3.1** para REST síncrono. **AsyncAPI 3.0** para mensageria (Kafka, RabbitMQ, webhooks).
- Spec mora em `docs/api/openapi.yaml` (ou `asyncapi.yaml`) — versionada no repo do serviço.
- **A spec é escrita antes do handler.** Handler valida contra a spec (não o contrário).
- Ferramenta padrão Kolden: **fastapi + pydantic** (Python) ou **Zod + tRPC/Hono** (TypeScript) para inferência bidirecional spec ↔ código.

**Gate:** PR que muda handler sem mudar spec = REJECT no CI.

### 2. Validação Automática em CI

Três checks obrigatórios:

**Check A — Lint da spec:**
- `spectral lint openapi.yaml --ruleset .spectral.yaml`
- Regras: `no-$ref-siblings`, `operation-operationId`, `path-params`, `contract-broken-links`, plus regras Kolden (todo endpoint precisa `x-owner`, `x-slo-latency-ms`, `x-deprecation-date` quando marcado).

**Check B — Contract test (schemathesis):**
- `schemathesis run openapi.yaml --checks all --hypothesis-max-examples 200`
- Gera requests aleatórios válidos pela spec → confirma que servidor responde conforme spec.
- **Roda contra ambiente staging real, não mock.**

**Check C — Consumer contract (Pact ou similar):**
- Cada consumer publica seu contrato.
- Provider CI roda todos os contratos de consumer conhecidos antes de merge.
- Se algum falha → REJECT.

### 3. Backward Compat Check (obrigatório)

Antes de merge:
- `openapi-diff base.yaml head.yaml --fail-on-incompatible`
- **Breaking changes (bloqueio):**
  - Remover endpoint sem deprecation window.
  - Remover/renomear field de response.
  - Adicionar campo required em request.
  - Mudar tipo de field (`string` → `number`).
  - Reduzir enum values.
- **Non-breaking (ok):**
  - Adicionar novo endpoint.
  - Adicionar field opcional em response.
  - Adicionar campo opcional em request com default.
  - Expandir enum values.

**Gate:** breaking change requer approval do arquiteto + ADR + timeline de deprecação. Sem os três, REJECT.

### 4. Versioning Strategy

Decisão Kolden padrão: **URL path versioning** (`/v1/`, `/v2/`) para APIs públicas externas; **header versioning** (`API-Version: 2026-07-01`) para APIs internas.

Justificativa:
- URL: mais visível, cacheável em CDN, fácil de debug em log/curl. Custo: URL feia, harder de manter em swagger.
- Header: URL limpa, versão rolling por cliente. Custo: menos visível, cache complica.

Padrão único por serviço — não misturar dentro do mesmo serviço.

**Rolling version na Anthropic-style** (`API-Version: 2026-07-01`): cada release recebe data. Consumer fixa em data específica. Provider suporta todas as datas listadas em spec.

### 5. Deprecation Timeline Explícito

Todo endpoint deprecado tem 3 campos obrigatórios em spec:

```yaml
paths:
  /v1/users/{id}:
    get:
      deprecated: true
      x-deprecation-announced: "2026-05-01"
      x-deprecation-sunset: "2026-11-01"
      x-migration-guide: "https://kolden.docs/api/migrations/users-v1-to-v2"
```

Resposta HTTP inclui `Deprecation: true` e `Sunset: Sun, 01 Nov 2026 00:00:00 GMT` (RFC 8594).

Janela mínima Kolden: **6 meses entre announced e sunset** para API pública, **3 meses** para interna. Consumer é notificado por email/slack no announce e reminders 30/7/1 dia antes de sunset.

## Templates operacionais

**`.spectral.yaml` Kolden mínimo:**

```yaml
extends: ["spectral:oas"]
rules:
  operation-operationId: error
  path-params: error
  x-owner-required:
    given: "$.paths.*.*"
    then:
      field: "x-owner"
      function: truthy
    severity: error
  x-slo-latency-required:
    given: "$.paths.*.*"
    then:
      field: "x-slo-latency-ms"
      function: truthy
    severity: warn
```

**Fluxo de deprecação:**

1. ADR aberto propondo deprecation → aprovado.
2. Spec atualizada com `deprecated: true` e datas.
3. Consumer notificado (email/slack + campo em response).
4. Job de monitoramento conta requests no endpoint deprecado → dashboard.
5. 30 dias antes de sunset: comunicação final aos consumers que ainda usam.
6. Sunset date: endpoint responde `410 Gone` com header `Sunset` explicativo.

## Anti-padrões

- Mudar API "só um pouquinho" e deployar sem passar por CI de contrato — silent break.
- Spec desatualizada em relação ao código ("o código é a documentação") — perde valor de contrato-first.
- Versionar em URL E header ao mesmo tempo no mesmo serviço.
- Deprecar sem sunset date — endpoint fica deprecated forever, ninguém migra.
- Breaking change como "não é bem breaking, é fix" — bug fix visível ao consumer é breaking.

## Cross-links

- Prometeu → `padroes-de-engenharia-idiomatica` (implementação do handler).
- Prometeu → `migracao-zero-downtime` (deprecação de API sem downtime).
- Prometeu → `slo-error-budget-burn-rate` (SLO de latência declarado na spec).
- Égide → `seguranca-de-api` (OWASP API Top 10 sobre o endpoint especificado).
- Ariadne → `analise-de-gap-de-conteudo` (spec é fonte para docs públicas).

---

Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B03/engineering.
