---
tipo: ferramenta
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/_MOC-ferramentas]]"
relacionado:
  - "[[sobre-a-empresa/Ferramentas/ferramentas|ferramentas]]"
---

# Validação de API Keys — Ferramentas do Kolden

Cada chave do Infisical foi testada com **uma chamada autenticada real** (endpoint read-only,
sem gastar crédito), injetando a chave via `infisical run` — o valor nunca foi exposto.
Atualizado em 2026-06-18.

**Legenda:** ✅ válida · 🔴 inválida/expirada · 🟡 inconclusivo · ⏳ falta credencial p/ testar

## Resultado

| Ferramenta | Status | HTTP | Endpoint testado |
|------------|--------|------|------------------|
| Anthropic | ✅ válida | 200 | `GET /v1/models` |
| OpenRouter | ✅ válida | 200 | `GET /api/v1/key` |
| Google AI Studio | ✅ válida | 200 | `GET /v1beta/models` |
| Replicate | ✅ válida | 200 | `GET /v1/account` (user: Kolden) |
| Fal | ✅ válida | 200 | `GET /v1/account/billing` |
| Eden AI | ✅ válida | 200 | `GET /v3/models` |
| ElevenLabs | ✅ válida | 200 | `GET /v1/user` |
| Deepgram | ✅ válida | 200 | `GET /v1/auth/token` |
| Creatomate | ✅ válida | 200 | `GET /v1/templates` |
| Tavily | ✅ válida | 200 | `GET /usage` |
| Exa | ✅ válida | 200 | `POST /search` (numResults=1) |
| Firecrawl | ✅ válida | 200 | `GET /v2/team/credit-usage` |
| Browserbase | ✅ válida | 200 | `GET /v1/sessions` |
| Context7 | ✅ válida | 200 | `GET /api/v2/libs/search` |
| Cloudflare | ✅ válida | 200 | `GET /tokens/verify` (active) |
| Vercel | ✅ válida | 200 | `GET /v2/user` |
| GitHub | ✅ válida | 200 | `GET /user` |
| Supabase | ✅ válida | 200 | `GET /v1/organizations` |
| Sentry | ✅ válida | 200 | `GET /api/0/organizations/` |
| Meta (CAPI) | ✅ válida | 200 | `GET /v25.0/me` |
| **Glama** | 🔴 **tipo de chave errado** | 401 | `gateway.glama.ai/v1/models` — "unrecognized API key prefix" (key `glama_…` é a API geral, não a do **Gateway LLM**) |
| **v0** | ✅ válida *(reemitida)* | 200 | `GET /v1/user` — token novo OK |
| Synter | 🟡 inconclusivo | 404 | Só há `POST /v1/tools/run` (gasta crédito); sem GET de teste |
| Upstash | ✅ válida | 200 | `GET /v2/redis/databases` (Basic auth `adm@kolden.com.br:UPSTASH_API_KEY`) |
| **Railway** | 🔴 **tipo de token errado** | 401 | GraphQL `me` → "Not Authorized" — o token é **Project Token**; precisa de **Account Token** (railway.app/account/tokens) |

## Resumo (atualizado 2026-06-18, pós-reemissão)

- **22 chaves válidas** e ativas (incl. **v0** e **Upstash**, resolvidas nesta rodada).
- **2 ainda a corrigir — tipo de credencial errado:**
  - **Glama:** a key `glama_…` é a API geral; o **Gateway LLM** exige uma key criada na seção
    *Gateway* do Glama. Gerar a key correta lá e atualizar `GLAMA_API_KEY`.
  - **Railway:** o token atual é **Project Token**; criar um **Account Token** em
    railway.app/account/tokens e atualizar `RAILWAY_API_TOKEN`.
- **Synter:** chave provavelmente ok, mas a API não tem endpoint GET de verificação; só dá para
  confirmar disparando um `POST /v1/tools/run` (consome crédito) — não testado de propósito.

## Não testáveis por chamada simples

| Ferramenta | Motivo |
|------------|--------|
| Infisical | É a própria fonte das credenciais (login `adm@kolden.com.br` validado). |
| LobeChat | App/host de chat; sem endpoint de validação de chave padrão. |
| GoHighLevel | Token validado em uso anterior (ver manual GHL). |

> ⚠️ **Descoberta de path:** os secrets vivem no **path raiz** do projeto Infisical em cada
> ambiente (`prod`/`dev`), **não** em `/kolden/prod`. O comando correto é
> `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- …`
> (usar `--path=/kolden/prod` retorna 404). Os manuais foram corrigidos para refletir isso.
