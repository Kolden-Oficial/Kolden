# Teste Funcional — "Está funcionando?" de todas as ferramentas

Teste mínimo, real e **sem custo** (endpoints de auth/list; nenhuma completion/scrape/modelo pago).
Cada camada testada via `infisical run` (credencial em runtime, nunca exposta). 2026-06-18.

**Camadas:** **API** = chamada HTTP autenticada real · **CLI** = comando read do CLI ·
**MCP** = handshake JSON-RPC + `tools/list` (nº de tools) ou chamada real na sessão.

**Legenda:** ✅ funciona · 🔴 ação necessária · ⚠️ aguarda `/mcp` (OAuth) · — não aplicável

---

## Matriz

| Ferramenta | API | CLI | MCP | Veredito |
|------------|-----|-----|-----|----------|
| Anthropic | ✅ 200 | — | — | ✅ ok (API/SDK) |
| OpenRouter | ✅ 200 | — | — | ✅ ok (API) |
| Google AI Studio | ✅ 200 | — | — | ✅ ok (API) |
| Eden AI | ✅ 200 | — | — | ✅ ok (API) |
| Replicate | ✅ 200 | — | ✅ 35 tools | ✅ ok |
| Fal | ✅ 200 | — | ✅ 11 tools | ✅ ok |
| ElevenLabs | ✅ 200 | — | ✅ 24 tools | ✅ ok |
| Deepgram | ✅ 200 | ⏳ s/ CLI | ⏳ s/ CLI | ✅ ok (API) |
| Creatomate | ✅ 200 | — | — | ✅ ok (API) |
| Tavily | ✅ 200 | — | ✅ 5 tools | ✅ ok |
| Exa | ✅ 200 | — | ✅ 2 tools | ✅ ok |
| Firecrawl | ✅ 200 | — | ✅ 21 tools | ✅ ok |
| Browserbase | ✅ 200 | — | ✅ 6 tools | ✅ ok |
| Context7 | ✅ 200 | — | ✅ 2 tools | ✅ ok |
| GitHub | ✅ 200 | ✅ Koldenoficial | ✅ 44 tools | ✅ ok |
| Upstash | ✅ 200 | — | ✅ 33 tools | ✅ ok |
| Synter | 🟡 s/ GET teste | — | ✅ 25 tools | ✅ ok (MCP prova a chave) |
| v0 | ✅ 200 *(reemitida)* | — | ✅ 5 tools | ✅ ok |
| Meta (CAPI) | ✅ 200 | — | — | ✅ ok (API) |
| Apollo | — | — | ✅ chamada real | ✅ ok |
| Canva | — | — | ✅ chamada real | ✅ ok |
| Cloudflare | ✅ 200 | ✅ wrangler (Kolden) | ⚠️ OAuth | ✅ ok (API+CLI); MCP via `/mcp` |
| Vercel | ✅ 200 | ✅ vercel (kolden) | ⚠️ OAuth | ✅ ok (API+CLI); MCP via `/mcp` |
| Supabase | ✅ 200 | ✅ supabase (Kolden) | ⚠️ OAuth | ✅ ok (API+CLI); MCP via `/mcp` |
| Sentry | ✅ 200 | ✅ sentry-cli (adm@) | ⚠️ OAuth | ✅ ok (API+CLI); MCP via `/mcp` |
| GoHighLevel | ✅ (uso prévio) | — | ⚠️ OAuth | ✅ ok; MCP via `/mcp` |
| Infisical | ✅ login adm@ | ✅ infisical | — | ✅ ok |
| **Glama** | 🔴 401 | — | — | 🔴 **chave do tipo errado** (precisa key do **Gateway**) |
| **Railway** | 🔴 401 | 🔴 Unauthorized | ⏳ | 🔴 **token do tipo errado** (precisa **Account Token**) |
| **Neon** | — (só `DATABASE_URL`) | 🔴 s/ NEON_API_KEY | ⚠️ OAuth | 🟡 connection string ok; MCP/CLI exigem **Neon API key** |
| **LobeChat** | — | — | — | 🟡 app self-hosted; sem instância para testar |

---

## Resumo

- **26 ferramentas funcionando** (API e/ou CLI e/ou MCP comprovados com chamada real).
- **14 MCPs funcionais** (12 stdio com `tools/list` real + Apollo + Canva). Os outros 8 conectam
  após login OAuth (`/mcp`): cloudflare, vercel, neon, sentry, supabase, GoHighLevel, MS365, Notion
  — sendo que cloudflare/vercel/supabase/sentry **já funcionam via API+CLI** independentemente do MCP.
- **4 itens com pendência:**
  - 🔴 **Glama** — gerar key na seção **Gateway** (glama.ai/gateway) e atualizar `GLAMA_API_KEY`.
  - 🔴 **Railway** — criar **Account Token** (railway.com/account/tokens, sem workspace) e atualizar `RAILWAY_API_TOKEN`.
  - 🟡 **Neon** — temos só a connection string; para MCP/`neonctl` cadastrar uma **Neon API key** (`NEON_API_KEY`).
  - 🟡 **LobeChat** — é app self-hosted; testar quando houver instância/URL Kolden no ar.

> Detalhes por camada: `api-validation.md` (chaves), `cli-status.md` (CLIs), `mcp-status.md` (MCPs).
