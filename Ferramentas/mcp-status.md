# MCP Status — Ferramentas do Kolden

Estado final dos servidores MCP (`claude mcp list`). Atualizado em 2026-06-18.

> **Art. VII (não-negociável):** nenhuma chave em texto puro. MCPs que precisam de credencial
> rodam embrulhados em `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=<env> -- ...`
> (chave injetada em runtime). Verificado: `grep` por padrões de chave no `.claude.json` = limpo.

> **Escopo:** todos os MCPs abaixo foram adicionados em **user scope** (`claude mcp add --scope user`),
> visíveis em qualquer projeto/`cwd`. Motivo: o `.claude.json` tinha duas chaves para o mesmo
> projeto (`C:/Kolden` via CLI e `C:\Kolden` via app) e os servers em escopo local só apareciam
> em uma delas. User scope elimina essa ambiguidade.

> **Nota de robustez:** servidores que dependiam de `bash -c` (remap de env var) falhavam quando
> lançados pelo app (sem `bash` garantido no PATH). Por isso **sentry** e **supabase** foram
> movidos para o remoto OAuth. Os demais usam `npx`/`uvx`/`mcp-remote` direto, sem `bash`.

**Legenda:** ✔ conectado · ⚠️ aguarda OAuth (`/mcp`) · ⏳ follow-up (bloqueio externo)

---

## 1. Conectados ✔ (14) — sem nenhum login

**Via Infisical (token em runtime) — 12:**

| MCP | Env | Observação |
|-----|-----|-----------|
| firecrawl | prod | npx firecrawl-mcp |
| elevenlabs | prod | uvx elevenlabs-mcp |
| browserbase | prod | npx @browserbasehq/mcp |
| tavily | prod | npx tavily-mcp |
| exa | prod | npx exa-mcp-server |
| replicate | prod | npx replicate-mcp |
| github | prod | mcp-remote + header `${GITHUB_ACCESS_TOKEN}` |
| fal | prod | mcp-remote + header `${FAL_API_KEY}` |
| context7 | prod | mcp-remote + header `${CONTEXT7_API_KEY}` |
| synter | dev | npx @synterai/mcp-server |
| v0 | dev | mcp-remote + header `${V0_API_TOKEN}` — ✅ token reemitido e válido |
| upstash | prod | npx @upstash/mcp-server `--email adm@kolden.com.br` (key via env, sem bash) |

**Conectores claude.ai — 2:** Apollo.io ✔, Canva ✔

> Aviso cosmético de `claude mcp list`: "Missing environment variables" em fal/context7/v0/github
> — o linter estático não enxerga o Infisical; todos conectam normalmente.

## 2. Aguardando login OAuth via `/mcp` ⚠️ (8)

| MCP | Motivo |
|-----|--------|
| cloudflare | Pacote local descontinuado; só resta o remoto OAuth |
| vercel | Vercel só oferece MCP remoto com OAuth |
| neon | MCP exige **Neon API key** própria (não temos; ver follow-up) → usa OAuth |
| sentry | Movido p/ remoto OAuth (a variante `bash -c` falhava no app) |
| supabase | Movido p/ remoto OAuth (idem) |
| GoHighLevel | Conector claude.ai (estava em `disabledMcpServers` de `C:/Kolden`) |
| Microsoft 365 | Conector claude.ai |
| Notion | Conector claude.ai |

➡️ **Ação:** `/mcp` → *Authenticate* nos 8. Reabilitar o GoHighLevel se aparecer desabilitado.

## 3. Follow-up ⏳ (bloqueio externo)

| Ferramenta | Bloqueio | Como concluir |
|------------|----------|---------------|
| Railway | O `RAILWAY_API_TOKEN` é um **Project Token** (GraphQL `me` → Not Authorized); o CLI 5.15.0 está instalado | Criar **Account Token** em railway.app/account/tokens, atualizar `RAILWAY_API_TOKEN`, depois `claude mcp add --scope user railway -- infisical run … -- railway mcp` |
| Deepgram | Não há CLI `dg` em npm/winget/pip (binário GitHub); a **API key é válida** p/ uso direto | Instalar binário de github.com/deepgram/cli/releases → `claude mcp add --scope user deepgram -- infisical run … -- dg mcp` |
| Glama | A `GLAMA_API_KEY` (`glama_…`) é a API geral; o **Gateway LLM** rejeita ("unrecognized API key prefix") | Gerar uma key na seção **Gateway** do Glama e atualizar `GLAMA_API_KEY` |

> **Upstash:** ✅ resolvido — conectado em user scope com `--email adm@kolden.com.br` (key lida do env, sem `bash`).

## 4. Chaves a corrigir (de api-validation.md)

- **Glama** 🔴 — `401 unrecognized API key prefix`: reemitir/conferir `GLAMA_API_KEY`.
- **v0** 🔴 — `401`: reemitir `V0_API_TOKEN` (o MCP conecta no handshake, mas chamadas reais falham).

---

## Decisão pendente — estrutura de paths no Infisical

Descoberto na validação: os secrets vivem no **path raiz** de cada ambiente (`prod`/`dev`),
**não** em `/kolden/prod` como a constituição (`guia-infisical.md`) prescreve. Hoje funciona com
`--projectId`+`--env`. Duas opções (escolha do Ronan):
1. **Reorganizar** os secrets para a pasta `/kolden/<env>` no Infisical (alinha com a constituição,
   mas exige reapontar apps/serviços que hoje leem da raiz — ex.: Hermes, Omiron).
2. **Atualizar a convenção** (guia-infisical) para refletir o path raiz e padronizar `--projectId`+`--env`.

Enquanto não se decide, todos os comandos usam `--projectId`+`--env` (forma que funciona).

## Resumo

- **14 MCPs conectados** sem login (12 via Infisical + Apollo + Canva), em **user scope**.
- **8 aguardando `/mcp`** (cloudflare, vercel, neon, sentry, supabase, GHL, MS365, Notion).
- **3 follow-ups** com bloqueio de credencial: **Railway** (precisa Account Token),
  **Glama** (precisa Gateway key), **Deepgram** (precisa binário do CLI).
- **CLIs:** ver `cli-status.md` (5 autenticados; railway/neonctl/dg pendentes).
- **APIs:** ver `api-validation.md` (20 válidas de 24 testadas).
- Nenhuma credencial em texto puro no config (Art. VII intacto).
