# Hermes Middleware — Kommo Rosie

Middleware Node/Fastify que serve endpoints chamados pelo Salesbot da Kommo Rosie
(`widget_request`), pelo Digital Pipeline (agendamento de follow-ups) e pelos
webhooks do próprio Kommo, rodando no Railway.

**Escopo v0.2 (Ondas 0-3 do plano `maravilha-eu-recebi-a-twinkling-cat.md`):**

- `POST /kommo/horario` — decide handoff A (dentro do horário) vs B (fora)
- `POST /kommo/schedule/carrinho-enviado` — agenda MA5.2 (+2h), MA5.3 (+24h), MA5.4 (+72h)
- `POST /kommo/schedule/carrinho-abandonado` — agenda MC.1 (+1h), MC.2 (+24h)
- `POST /kommo/schedule/reativacao` — agenda MR.1 (+24h), MR.2 (+72h)
- `DELETE /kommo/schedule/lead/:leadId` — cancela follow-ups do lead
- `GET /kommo/schedule/pending` — lista tasks vencidas (debug)
- `POST /kommo/webhook` — recebe eventos Kommo, cancela follow-ups, migra P3→P1 (AUT-05)
- `POST /kommo/dispatch` — worker que dispara templates WhatsApp via Chats API amojo

Endpoints de rastreio/estoque Nuvemshop **foram removidos do escopo na Fase 3** —
consultora humana lê do card e responde.

---

## Endpoints

### `GET /health`
Público. Retorna `{ status: "ok", ... }`.

### `POST /kommo/horario` (autenticado)
Header obrigatório: `X-Kolden-Token: <KOLDEN_TOKEN>`.

Body (opcional, útil só para teste):
```json
{ "now": "2026-07-28T17:00:00Z" }
```

Response:
```json
{
  "in_hours": true,
  "texto": "Uma consultora assume seu atendimento agora 💛",
  "agora_local": "2026-07-28T14:00:00",
  "proxima_abertura": null
}
```

**Uso no Salesbot Kommo:**
```json
{
  "handler": "widget_request",
  "params": {
    "url": "https://hermes-middleware.railway.app/kommo/horario",
    "headers": { "X-Kolden-Token": "{{env.KOLDEN_TOKEN}}" },
    "data": {}
  }
}
```
Passo seguinte: `conditions` sobre `{{json.in_hours}}` → branch para `show` A ou B.

---

## Regra de horário (Rosie)

| Dia | Faixa | Estado |
|-----|-------|--------|
| Seg-Sex | 09:00–17:59 | dentro |
| Seg-Sex | 18:00 em diante | fora |
| Sáb | 09:00–12:59 | dentro |
| Sáb | 13:00 em diante | fora |
| Dom | todo dia | fora |

Timezone: `America/Sao_Paulo` (sem horário de verão em 2026).

---

## Instalação local

```bash
cd C:/Kolden/infra/hermes-middleware
cp .env.example .env
# edite .env, gere KOLDEN_TOKEN com: openssl rand -hex 32
npm install
npm test
npm run dev
```

## Deploy Railway

1. Criar novo serviço Railway a partir deste diretório.
2. Definir env vars (copiar do `.env.example`, gerar `KOLDEN_TOKEN` novo).
3. Railway sobe automaticamente com `npm start` (depois de `npm run build`).
4. Smoke test:
   ```bash
   curl https://<seu-app>.up.railway.app/health
   curl -X POST https://<seu-app>.up.railway.app/kommo/horario \
     -H "X-Kolden-Token: $KOLDEN_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"now":"2026-07-28T17:00:00Z"}'
   ```

## Segurança

- `KOLDEN_TOKEN` rotacionado a cada 90d (owner: Egide).
- No Infisical: `KOLDEN_TOKEN_HERMES_MW` em `/kolden/prod/`.
- Sem credencial Nuvemshop ou Kommo — este middleware não fala com nenhuma API externa;
  só computa horário local.

## Testes

`npm test` roda 10 casos: edge cases de abertura/fechamento seg-sex, sáb 9h-13h,
domingo, próxima abertura.

## Roadmap curto

- **v0.1 (2026-07-23):** `POST /kommo/horario` ✅
- **v0.2 (2026-07-23):** Scheduler (Redis Upstash) + Chats API amojo + Webhook Kommo + Dispatch worker ✅
- **v0.3 (opcional, pós-go-live):** `POST /nuvemshop/cart-abandoned` (webhook direto do Nuvemshop) + `POST /kommo/nuvemshop-rastreio` (consulta ao vivo)
  se as Gabrielas relatarem gargalo em resposta ao vivo ou se o webhook nativo Nuvemshop→Kommo tiver limitações.

## Arquitetura v0.2

```
┌─────────────────┐   widget_request        ┌────────────────────┐
│  Salesbot Kommo │────────────────────────>│  /kommo/horario    │
└─────────────────┘                         └────────────────────┘
                                                     │
                                                     v
                                            (in_hours: true/false)

┌─────────────────┐   status_lead webhook   ┌────────────────────┐
│  Kommo Digital  │────────────────────────>│  /kommo/webhook    │──> cancela follow-ups
│  Pipeline       │                         └────────────────────┘    de leads que responderam
└─────────────────┘   POST /kommo/schedule/*         │
                     ────────────────────>          v
                                            ┌────────────────────┐
                                            │  scheduler         │
                                            │  (Redis Upstash    │
                                            │   ZSET score=ts)   │
                                            └────────────────────┘
                                                     │
              cron a cada 1min → POST /kommo/dispatch│
                                                     v
                                            ┌────────────────────┐
                                            │  ChatsApiClient    │
                                            │  amojo.kommo.com/v2│
                                            │  HMAC-SHA1         │
                                            └────────────────────┘
                                                     │
                                                     v
                                          Cliente recebe MA5.2, MC.1, MR.1…
```

## Como o worker roda

Escolher UM dos 3:

1. **Railway cron** (recomendado): job `POST /kommo/dispatch?secret=…` a cada 60s
2. **Upstash QStash** com schedule `*/1 * * * *`
3. **Node-cron interno**: adicionar `node-cron` como dep e um `setInterval(60000)` — não recomendado (perde tasks se container reinicia)

## Segurança adicional v0.2

- `KOMMO_WEBHOOK_SECRET` protege `/kommo/webhook` e `/kommo/dispatch` (querystring `?secret=…`)
- `KOLDEN_TOKEN` protege `/kommo/horario` e `/kommo/schedule/*` (header `X-Kolden-Token`)
- Chats API amojo usa HMAC-SHA1 com `KOMMO_ROSIE_CHANNEL_SECRET`
- Nenhum credencial hardcoded — tudo via env (Railway) / Infisical (local)
