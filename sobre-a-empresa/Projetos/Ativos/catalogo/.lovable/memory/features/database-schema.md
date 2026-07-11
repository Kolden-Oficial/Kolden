---
name: Database Schema
description: "Schema completo do PostgreSQL (Supabase): 8 tabelas, RLS policies, 5 funções SQL e constraints críticas. Padrão de acesso: frontend usa anon key + RLS; Edge Functions usam SUPABASE_SERVICE_ROLE_KEY."
type: feature
tipo: projeto
projeto: catalogo
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/catalogo/.lovable/memory/features/architecture-overview|architecture-overview]]"
  - "[[sobre-a-empresa/Projetos/Ativos/catalogo/.lovable/memory/features/external-integrations|external-integrations]]"
  - "[[sobre-a-empresa/Projetos/Ativos/catalogo/.lovable/memory/features/security-constraints|security-constraints]]"
  - "[[sobre-a-empresa/Projetos/Ativos/catalogo/.lovable/memory/features/technical-debt|technical-debt]]"
---

## Padrão de acesso ao banco

- **Frontend (anon key):** acesso filtrado por RLS — nunca bypassa policies
- **Edge Functions:** usam `SUPABASE_SERVICE_ROLE_KEY` — bypassa RLS (service role)
- **Regra:** nunca expor `SUPABASE_SERVICE_ROLE_KEY` no código frontend

## Tabelas

### `links`
Slug de redirect com UTMs. Um link por campanha/canal.
```
id              uuid PK
slug            text UNIQUE NOT NULL           ← index: idx_links_slug
destination_url text NOT NULL
product_name    text NOT NULL
channel         text NOT NULL
user_id         uuid NULL (FK → auth.users implícito)
utm_source      text NULL
utm_medium      text NULL
utm_campaign    text NULL
created_at      timestamptz NOT NULL DEFAULT now()
```
**RLS:** SELECT e INSERT públicos (`USING (true)`) — qualquer anon pode ler e inserir. Problema conhecido.

### `clicks`
Cada clique em `/go/:slug`. Ponto de entrada do funil.
```
id               uuid PK
link_id          uuid NOT NULL FK → links(id) ON DELETE CASCADE  ← index: idx_clicks_link_id
lead_id          uuid NULL (referência soft a leads, sem FK)
ip_address       text NULL
user_agent       text NULL
fbp              text NULL     ← cookie _fbp do Meta Pixel
fbc              text NULL     ← cookie _fbc ou construído de fbclid
event_source_url text NULL     ← URL completa do clique (para Meta CAPI)
query_params     jsonb NULL    ← {utms, fbclid, raw}
created_at       timestamptz NOT NULL DEFAULT now()
```
**RLS:** SELECT e INSERT públicos. O `GoRedirect.tsx` insere sem auth.

### `leads`
Lead capturado nas LPs via `submit-lead` Edge Function.
```
id                  uuid PK
variant             text NOT NULL ('a' ou 'b')
first_name          text NOT NULL
last_name           text NULL
email               text NOT NULL
phone               text NOT NULL
dob                 text NULL (YYYY-MM-DD)
consent_accepted_at timestamptz NULL
consent_version     text NULL
utm_source/medium/campaign/content/term  text NULL
fbclid/fbp/fbc      text NULL
user_agent          text NULL
event_source_url    text NULL
meta_sync_status    text DEFAULT 'pending'
ghl_sync_status     text DEFAULT 'pending'
ga4_sync_status     text DEFAULT 'pending'
sync_logs           jsonb NULL
created_at          timestamptz NOT NULL DEFAULT now()
```

### `conversions`
Conversão recebida via webhook de afiliado. PII armazenada apenas como hashes SHA-256.
```
id                  uuid PK
click_id            uuid NOT NULL FK → clicks(id)
purchase_value      numeric DEFAULT 0
external_order_id   text NULL
status              text DEFAULT 'approved'
emq_score           numeric NULL (0–10, Event Match Quality)
-- Hashes SHA-256 de PII (Meta Playbook §5.1)
email_hash / phone_hash / first_name_hash / last_name_hash  text NULL
city_hash / state_hash / zip_hash / country_hash             text NULL
dob_hash / gender_hash / external_id_hash                    text NULL
-- Sync
meta_sync_status    text DEFAULT 'pending'
ghl_sync_status     text DEFAULT 'pending'
retry_count         int DEFAULT 0
next_retry_at       timestamptz NULL
last_sync_attempt_at timestamptz NULL
sync_logs           text NULL
created_at          timestamptz NOT NULL DEFAULT now()
```

### `identities`
PII raw enriquecida por `identities-upsert`. Keyed por `lead_id` (UNIQUE).
```
id          uuid PK
lead_id     text NOT NULL UNIQUE
user_id     uuid NULL
email / phone / first_name / last_name  text NULL
city / state / zip / country            text NULL
dob / gender / external_id              text NULL
fbc / fbp                               text NULL
created_at  timestamptz NOT NULL DEFAULT now()
updated_at  timestamptz NOT NULL DEFAULT now()
```
**RLS:** INSERT e UPDATE públicos (para webhooks GHL via `identities-upsert`).

### `integrations`
Credenciais por usuário e provider. `credentials` é JSONB com schema por provider.
```
id          uuid PK
user_id     uuid NOT NULL
provider    text NOT NULL          ← 'meta', 'gohighlevel', 'tiktok', 'google_analytics', etc.
api_key     text DEFAULT ''        ← campo legacy
api_secret  text NULL              ← campo legacy
credentials jsonb DEFAULT '{}'     ← campo atual — veja external-integrations.md para schema por provider
updated_at  timestamptz NOT NULL DEFAULT now()
```

### `products`
Produtos com preço para cálculo de revenue.
```
id                  uuid PK
user_id             uuid NOT NULL
name                text NOT NULL
price               numeric DEFAULT 0
sku_or_external_id  text NULL
created_at          timestamptz NOT NULL DEFAULT now()
```

### `taxonomies`
Valores de UTM gerenciados pelo usuário (fonte de autocomplete).
```
id         uuid PK
user_id    uuid NOT NULL
type       text NOT NULL   ← 'source', 'medium', 'campaign', etc.
value      text NOT NULL
created_at timestamptz NOT NULL DEFAULT now()
```

## Funções PostgreSQL

| Função | Retorno | Propósito |
|---|---|---|
| `get_cron_status()` | TABLE | Status dos jobs pg_cron (nome, schedule, última execução, runtime_ms) |
| `get_emq_stats_24h()` | TABLE | Avg EMQ score, signal coverage, total conversions das últimas 24h |
| `get_landing_tracking()` | TABLE | Retorna `meta_pixel_id` e `gtm_container_id` da integração configurada |
| `get_retry_queue_stats()` | TABLE | Contagem de retries pendentes e próximo retry_at |
| `process_conversion_retries()` | int | Processa conversions com `next_retry_at <= now()` (chamada pelo cron) |

## Constraints críticas

- `clicks.link_id → links.id` com `ON DELETE CASCADE` — deletar link apaga clicks
- `conversions.click_id → clicks.id` — sem FK explícita via schema type, mas referência real no banco
- `identities.lead_id` é UNIQUE — upsert por lead_id é safe
- Todas as colunas `*_hash` em `conversions` são hex de 64 chars (SHA-256) — nunca armazenar PII raw nessa tabela

## Migrations aplicadas
22 migrations no total (20260411 até 20260420). Sempre adicionar novas features via nova migration — nunca editar migrations existentes.
