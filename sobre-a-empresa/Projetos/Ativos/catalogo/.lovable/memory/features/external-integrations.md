---
name: External Integrations
description: Credentials management for Meta CAPI, GHL, Telegram, Sendflow, Google Ads, GA4, GTM, Telegram Ads, TikTok + Advanced Matching pipeline (track-conversion → conversions → identities enrichment → sync-outbound) + identities-upsert HMAC webhook + browser-side Pixel/GTM dedup + outbound to Meta CAPI, GHL, TikTok Events API, GA4 Measurement Protocol
type: feature
tipo: projeto
projeto: catalogo
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/catalogo/.lovable/memory/features/architecture-overview|architecture-overview]]"
  - "[[sobre-a-empresa/Projetos/Ativos/catalogo/.lovable/memory/features/database-schema|database-schema]]"
  - "[[sobre-a-empresa/Projetos/Ativos/catalogo/.lovable/memory/features/security-constraints|security-constraints]]"
  - "[[sobre-a-empresa/Projetos/Ativos/catalogo/.lovable/memory/features/technical-debt|technical-debt]]"
---

## Schema
- `integrations.credentials` (jsonb) — per-provider key/value:
  - **meta**: `pixel_id`, `capi_token`, `graph_token`, optional `test_event_code`
  - **gohighlevel**: `api_key`, optional `webhook_secret`
  - **google_analytics**: `measurement_id`, `api_secret`, optional `stream_id`
  - **google_tag_manager**: `container_id` (must start with `GTM-`), optional `server_container_url`
  - **google_ads**: `customer_id`, `developer_token`, optional `conversion_action_id`, `login_customer_id`
  - **tiktok**: `pixel_id`, `access_token`, optional `advertiser_id`, `test_event_code`, `ttclid`
  - **telegram_ads**: `api_token`, optional `advertiser_id`
  - **telegram_bot**: `bot_token`
- `conversions` carries SHA256 Advanced Matching hashes + `emq_score` (0–10).
- `clicks` stores `ip_address`, `user_agent`, `fbp`, `fbc`, `event_source_url`, `lead_id`, `query_params`.
- `identities` — CRM table keyed by `lead_id` (unique). Public INSERT/UPDATE for CRM webhooks.

## UI architecture (`/settings`)
- **`src/config/integration-providers.ts`** — single source of truth for `PROVIDERS` schema + `maskValue` helper.
- **`src/hooks/useIntegrations.ts`** — `{ userId, saved, savedCredentials, loading, refresh, save }`. Handles upsert + legacy `api_key` fallback.
- **`src/components/integrations/ProviderCard.tsx`** — generic card with Meta/GHL special slots (test button, webhook URL/curl copy).
- **`src/components/integrations/ProviderConfigDialog.tsx`** — form dialog with per-field validation (`optional`), masked placeholders, hints.
- **`src/pages/IntegrationSettings.tsx`** — slim orchestrator (~170 lines).

## Browser-side Pixel + GTM (`/go/:slug`)
- `GoRedirect.tsx` fetches Meta `pixel_id` and GTM `container_id` in **one** `.in("provider", ["meta","google_tag_manager"])` round-trip.
- **Meta Pixel**: `init` + `PageView` with `eventID = click.id` for CAPI dedup.
- **GTM**: `dataLayer.push({event:"click_redirect", click_id, slug, lead_id, utm_*})` BEFORE loader so initial tags see the event. Then standard GTM loader + `<noscript>` iframe injection.
- Both run in parallel via `Promise.all`; shared 250ms flush window before `window.location.replace`.

## Webhook (`track-conversion`)
- Accepts raw PII + many aliases (PT/EN). Looks up `identities` by `clicks.lead_id`; body wins, identity fills gaps.
- Normalizes per Meta Playbook §5.1 BEFORE SHA256. Pre-hashed values pass through.
- Computes `emq_score` from present hashes + click signals.

## Webhook (`identities-upsert`)
- URL: `/functions/v1/identities-upsert?user_id=<uuid>`
- Header: `x-signature: sha256=<hmac_hex>` validated via HMAC-SHA256 of raw body using `integrations.credentials.webhook_secret` (GHL row).
- Upserts into `identities` by `lead_id`. Strips null fields (partial updates).

## Outbound (`sync-outbound`)
Identity enrichment cached via `getIdentity()` (single fetch shared by Meta + TikTok).

### Meta CAPI v21.0 `Purchase` (blocks retry on failure)
- `event_id = conversion.id`, `event_time` ≤7d, `action_source: "website"`, required `event_source_url`.
- `user_data`: `em, ph, fn, ln, ct, st, zp, country, db, ge, external_id` (each `[hash]`) + `client_ip_address, client_user_agent, fbp, fbc`.
- `custom_data`: `currency: "BRL"`, `value`, `order_id`, `content_ids`, `content_type: "product"`.
- 1500ms timeout, exponential backoff (5/15/60min, max 3). Logs include `emq_score` + `emq_signals`.

### GoHighLevel (blocks retry on failure)
- `POST https://rest.gohighlevel.com/v1/contacts/`, 8000ms timeout.

### TikTok Events API (best-effort, doesn't block retry)
- `POST https://business-api.tiktok.com/open_api/v1.3/event/track/`, header `Access-Token: <token>`, 2000ms timeout.
- `event: "CompletePayment"`, `event_id = conversion.id` for Pixel dedup, `event_source: "web"`, `event_source_id: pixel_id`.
- `user`: hashed `email[]`, `phone[]`, `external_id[]` (reuses Meta's normalize/hash funcs) + raw `ip`, `user_agent`, optional `ttp`.
- Success = HTTP 200 + `code === 0`. Logged as `provider: "tiktok"` in `sync_logs` only.

### GA4 Measurement Protocol (best-effort, doesn't block retry)
- `POST https://www.google-analytics.com/mp/collect?measurement_id=<id>&api_secret=<secret>`, 1500ms timeout.
- `client_id = click.id` (deterministic, S2S only — no real session correlation), optional `user_id = lead_id`.
- Event `purchase` with `transaction_id`, `value`, `currency: "BRL"`, `items[{item_id, item_name: link.product_name}]`.
- Success = HTTP 204 No Content. Logged as `provider: "google_analytics"`.

## Identities admin (`/identities`)
- Lists `identities` with search by `lead_id`/email/phone/name.
- Inline edit dialog for all PII fields.
- "Test EMQ" button shows projected score + signal coverage.
