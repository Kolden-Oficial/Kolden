---
tipo: registro
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/Kommo/ferramentas]]"
---

# Ondas 2 e 3 — Resultado (2026-07-23 22:52 BRT)

Onda 2 é 100% UI Kommo — Kolden entrega **spec executável** que o Ronan constrói
(a API de Salesbot está indisponível nesta conta, plano não expõe).
Onda 3 tem 2 partes: (a) spec das automações no Digital Pipeline (também UI) e
(b) **middleware Hermes v0.2** que faz todo o encanamento de agenda/webhook/dispatch.

## Entregas

### 📄 Onda 2 — Salesbot spec
- `sobre-a-empresa/Ferramentas/Kommo/rosie-onda2-salesbot-spec.md`
- Cobre: nó ENTRADA + 3 botões, Trilha A completa (A.QUAL → A.MENU → A1/A2/A3/A4 → A.CART), Trilha B completa (B.ID1/B.ID2 → B.LOC → B.MENU → B1-B7), OUTRO, 6 handoffs H.1-H.6 com widget_request → conditions in_hours
- Cada nó com: ID, handler, UI click-a-clique, mensagem, próximo nó, efeito no card (tag/stage)
- Ordem sugerida de construção: 4 sessões de ~3-4h em 2-3 dias
- Checklist de aceite (12 itens)

### 📄 Onda 3.1 — Automações spec
- `sobre-a-empresa/Ferramentas/Kommo/rosie-onda3-automacoes-spec.md`
- Cobre 12 automações da aba 5 da planilha, divididas em:
  - **Salesbot** (AUT-01, 04, 11, 12) — já contempladas na Onda 2
  - **Digital Pipeline UI** (AUT-02, 03, 05 fallback, 06)
  - **Hermes middleware** (AUT-07, 08, 09, 10)

### 💻 Onda 3.2 + 3.3 — Hermes middleware v0.2
- `infra/hermes-middleware/` — versão bump v0.1 → v0.2
- **17/17 testes verdes** (10 horário + 4 scheduler + 3 chats-api)

**Novos endpoints:**

| Método | Path | Auth | Uso |
|--------|------|------|-----|
| POST | `/kommo/schedule/carrinho-enviado` | `X-Kolden-Token` | Agenda MA5.2 (+2h), MA5.3 (+24h), MA5.4 (+72h) |
| POST | `/kommo/schedule/carrinho-abandonado` | `X-Kolden-Token` | Agenda MC.1 (+1h), MC.2 (+24h) |
| POST | `/kommo/schedule/reativacao` | `X-Kolden-Token` | Agenda MR.1 (+24h), MR.2 (+72h) |
| DELETE | `/kommo/schedule/lead/:leadId` | `X-Kolden-Token` | Cancela follow-ups (chamado quando cliente responde) |
| GET | `/kommo/schedule/pending` | `X-Kolden-Token` | Debug — lista tasks vencidas |
| POST | `/kommo/webhook?secret=…` | querystring | Recebe eventos Kommo (add_message, status_lead), cancela follow-ups auto, migra P3→P1 (AUT-05) |
| POST | `/kommo/dispatch?secret=…` | querystring | Worker: lê fila vencida, envia via Chats API, marca done |

**Novos módulos (`src/kommo/`):**

- `config.ts` — carrega env Kommo + Upstash (features degradam se faltar)
- `chats-api.ts` — cliente Chats API amojo com HMAC-SHA1 + helpers `moveLead()` e `addLeadTag()` para AUT-05
- `scheduler.ts` — fila Redis Upstash (ZSET score=timestamp), helpers `scheduleCarrinhoEnviadoFollowUps()`, `scheduleCarrinhoAbandonadoFollowUps()`, `scheduleReativacaoFollowUps()`, `cancelByLead()`, `fetchDue()`, `markDone()`

**Env vars adicionadas (`.env.example`):**
```
KOMMO_ROSIE_SUBDOMAIN=
KOMMO_ROSIE_ACCESS_TOKEN=
KOMMO_ROSIE_ACCOUNT_ID=36679659
KOMMO_ROSIE_AMOJO_ID=141890a7-286c-4bf2-af0f-49f317014fba
KOMMO_ROSIE_CHANNEL_SCOPE_ID=       # criado depois via bootstrap-chat-channel
KOMMO_ROSIE_CHANNEL_SECRET=          # gerado pela Kommo ao registrar canal
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
KOMMO_WEBHOOK_SECRET=                # gerar com openssl rand -hex 32
```

## Como as peças se conectam

```
1. Cliente termina compra na Nuvemshop
   → integração nativa Nuvemshop→Kommo cria lead em Vendas · Novo lead
   → Digital Pipeline (UI): quando card move para "Carrinho enviado"
     → POST hermes-mw/kommo/schedule/carrinho-enviado (com dados do lead)
   → Hermes agenda 3 follow-ups no Redis Upstash

2. A cada minuto, Railway cron → POST hermes-mw/kommo/dispatch
   → Hermes pega tasks vencidas
   → Envia MA5.2/5.3/5.4 via Chats API amojo (usando templates aprovados pela Meta)
   → Marca como done

3. Cliente responde ao follow-up
   → Kommo → POST hermes-mw/kommo/webhook (evento add_message)
   → Hermes cancela follow-ups pendentes do lead (cancelByLead)

4. Cliente responde à mensagem de recuperação (MC.1 ou MC.2 do Pipeline 3)
   → Kommo → POST hermes-mw/kommo/webhook
   → Hermes cancela follow-ups + PATCH lead para Pipeline Vendas · Novo lead (AUT-05)
   → Aplica tag "carrinho-abandonado" no lead migrado
```

## O que ainda depende do Ronan (para Ondas 2 e 3 irem ao ar)

1. **Deploy Hermes middleware v0.2 no Railway** (código pronto — `npm run build && npm start`)
2. **Configurar env vars no Railway:**
   - `KOLDEN_TOKEN` (gerar novo com `openssl rand -hex 32`)
   - `KOMMO_WEBHOOK_SECRET` (idem)
   - `KOMMO_ROSIE_ACCESS_TOKEN` (novo, depois de rotacionar)
   - `UPSTASH_REDIS_REST_URL` + `TOKEN` (criar novo DB Upstash gratuito ou usar existente)
3. **Registrar canal custom na Chats API** (uma vez) para pegar `KOMMO_ROSIE_CHANNEL_SCOPE_ID` + `SECRET`. Script auxiliar a criar em `scripts/bootstrap-chat-channel.ts` (não bloqueia — pode fazer depois)
4. **Configurar cron no Railway** (ou Upstash QStash) para `POST /kommo/dispatch?secret=…` a cada 60s
5. **Configurar webhook Kommo:** UI Kommo → Settings → Webhooks → adicionar `https://<railway-url>/kommo/webhook?secret=<KOMMO_WEBHOOK_SECRET>` com eventos: `add_message`, `add_outgoing_message`, `status_lead`
6. **Construir Salesbot na UI** seguindo `rosie-onda2-salesbot-spec.md` (14h estimadas em 4 sessões)
7. **Configurar Digital Pipeline** com AUT-02, AUT-03, AUT-06 (~1h)
8. **Submeter os 7 templates WhatsApp à moderação Meta** (via UI Kommo → Chats → WhatsApp → Templates) — usar textos de `rosie-templates-whatsapp.md`

## Testes cobertos automaticamente

- `test/horario.test.ts` (10 casos) — horário comercial + próxima abertura
- `test/scheduler.test.ts` (4 casos) — enqueue, fetchDue, cancelByLead, markDone com mock Redis
- `test/chats-api.test.ts` (3 casos) — MD5 e HMAC-SHA1

**Não coberto por teste unitário (integração manual):**
- Envio real via Chats API amojo (precisa canal registrado)
- Webhook Kommo real (precisa Kommo configurado apontando para o Railway)
- AUT-05 (migração P3→P1) — testar com um lead real após deploy

## Métricas de código

- **20 arquivos** (11 src + 3 test + 4 config + 2 docs)
- **~700 linhas** de TypeScript
- **~500 linhas** de teste
- **1 dep de runtime** adicionada: `@upstash/redis@^1.34.0`

## Estado final por onda

| Onda | Escopo | Estado |
|------|--------|--------|
| 0.1 Hermes middleware v0.1 (`/horario`) | ✅ Código pronto + testes |
| 0.2 Runbook rotação token | ✅ Doc |
| 0.3 Templates WhatsApp | ✅ 7 templates catalogados |
| 0.4 Ambiente [TESTE] | ✅ Doc + criado na Onda 1 |
| 1.1 Bootstrap script | ✅ Aplicado LIVE em 2026-07-23 |
| 1.2 Rename terminais | ⊘ N/A via API (deixar UI Kommo traduzir) |
| 1.3 Pipelines [TESTE] | ✅ 3 criados |
| 1.4 CSV 187 leads | ✅ Gerado |
| 1.5 Verificação | ✅ Passa |
| 2 Salesbot spec | ✅ Doc executável clique-a-clique |
| 3.1 Automações spec | ✅ Doc |
| 3.2 Scheduler | ✅ Código + testes |
| 3.3 Webhook + Dispatch | ✅ Código + testes |

## Próxima parada (Onda 5 — teste)

Depois que Salesbot está construído e o Hermes middleware está deployado:

- 8 smoke tests Kolden (Emporos + Peitho + Dike) em `[TESTE]`
- 10 cenários aceite Gabrielas (whitelist de números)
- 13 critérios formais aba 8 da planilha
- Passe = 100% em todos os 3 conjuntos
- Estimativa: 6h Kolden + 8h Rosie em 3 dias

Depois Onda 6 (go-live + doc + Dike audita).
