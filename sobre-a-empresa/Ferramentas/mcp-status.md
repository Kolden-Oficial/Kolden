# MCP Status — Ferramentas do Kolden

Estado final dos servidores MCP (`claude mcp list`). Atualizado em 2026-06-24.

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

## 1. Conectados ✔ (18) — Íris via Infisical (headless); Solomon oficial via OAuth (interativo)

**Via Infisical (token em runtime) — 13:**

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
| **iris (mcp-iris)** | prod | **custom Kolden** (Ritual do Caos 2026-07-01, maturity 10.0/10). Server para API Solomon, cliente-scoped Rosie. Path: `sobre-a-empresa/Projetos/Rosie/mcp-solomon/dist/index.js`. Requer também `SOLOMON_COMPANY_ID_ROSIE` no env (público). v1 write-only (4 tools). |

**Remoto HTTP + OAuth interativo — 1:**

| MCP | Env | Observação |
|-----|-----|-----------|
| **solomon (oficial)** | prod | `claude mcp add solomon --scope user --transport http https://mcp-solomon-685646918301.us-east1.run.app/mcp` — MCP oficial da Solomon (Cloud Run us-east1, mantido pela Solomon). OAuth via login e-mail+senha; 1 sessão = 1 conta. Cobre LEITURA (faturamento, campanhas, funil, atribuição). Tutorial: https://intercom.help/solomon-d7e33f0728c8/pt-BR/articles/13860266. Complementa o MCP Íris (write). |

**Conectores claude.ai — 2:** Apollo.io ✔, Canva ✔

**OAuth desktop local — 1:** google-drive ✔ (`@piotr-agier/google-drive-mcp`, stdio via `npx`).
Cobre Drive/Docs/Sheets/Slides/Calendar (~150 tools), 8 escopos concedidos. **Não usa Infisical** —
OAuth desktop com client/tokens em `~/.config/google-drive-mcp/` (`gcp-oauth.keys.json` + `tokens.json`,
refresh automático), projeto GCP `1098911614973`. Verificado ao vivo 2026-06-24: Drive/Sheets OK.
Manual: `GoogleWorkspace/ferramentas.md`.
✅ **Calendar resolvido (2026-06-24):** Calendar API habilitada via `gcloud services enable`; validado ao vivo
(`listCalendars` retornou 7 calendários da org kolden.com.br). Ecossistema Workspace 100%.

**ADC gcloud (Application Default Credentials) — 1 MCP + 3 APIs diretas:**
`google-analytics` ✔ (MCP **oficial** do Google `analytics-mcp`, via `uvx`, read-only) — usa ADC da conta
`adm@kolden.com.br` (Workspace, consent screen **Internal** → tokens não expiram), projeto `gen-lang-client-0988823565`.
Validado 2026-06-24: `runReport` 166 users/28d (Kolden Institucional). Manual: `GA4/ferramentas.md`.
O mesmo ADC dá acesso direto (API REST, sem MCP) a **GTM** (`tagmanager.readonly`, conta Kolden 6327657811) e
**Search Console** (`webmasters.readonly`, sc-domain:kolden.com.br) — validados ao vivo. Manuais
`GoogleTagManager/` e `SearchConsole/`.

**API key Google (env dev) — 2 APIs diretas:** PageSpeed Insights + YouTube Data API v3 via
`/kolden/dev/GOOGLE_DRIVE_API_KEY` (nome genérico; serve as duas). Validadas 2026-06-24. Manuais `PageSpeed/`, `YouTubeData/`.

> **Ecossistema Google (resumo 2026-06-24):** Workspace (Drive/Docs/Sheets/Slides/Calendar), GA4, GTM,
> Search Console, PageSpeed, YouTube — **todos provisionados e validados ao vivo**. Falta só Google Ads
> (ver §3, aguarda developer token). gcloud SDK 574 instalado; 8 APIs habilitadas no projeto.

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
| Apify | Chave `APIFY_TOKEN` (+ `APIFY_USER_ID`) cadastrada no env **dev**; camada `apify` do motor do Argos validada com actor real; MCP **oficial** ainda não adicionado via `claude mcp add` | Rodar `claude mcp add --scope user apify -- infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=dev -- npx -y @apify/actors-mcp-server` (detalhes em `Apify/ferramentas.md`) |
| **Google Ads** | API habilitada + ADC prontos, mas a Google Ads API exige **developer token aprovado** (Explorer/Test imediato; Basic Access leva dias–semanas). MCP **oficial** `google-ads-mcp` aceita ADC + token | Ronan: aplicar token em ads.google.com/aw/apicenter (conta MCC), cadastrar `GOOGLEADS_DEVELOPER_TOKEN`/`GOOGLEADS_LOGIN_CUSTOMER_ID` no Infisical → ativar bloco já documentado em `GoogleAds/ferramentas.md`. Ponte: Windsor.ai |
| Windsor.ai | MCP **oficial** (`https://mcp.windsor.ai`); chave `WINDSOR_API_KEY` (env dev) a cadastrar; ainda não adicionado | Cadastrar `WINDSOR_API_KEY` e rodar `claude mcp add --scope user windsor -- mcp-remote https://mcp.windsor.ai` com `api_key` via Infisical (detalhes em `Windsor/ferramentas.md`) |

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

## SDKs Python não-MCP (consumidos sob demanda via `uv tool`)

Vendors registrados como **SDK Python**, não como servidor MCP. Não aparecem em `claude mcp list`. Chamados via script local quando necessário.

| Vendor | Pacote | Auth | Status |
|---|---|---|---|
| **NotebookLM** (extração de conhecimento) | `notebooklm-py[cookies,browser]` (uv tool) | cookie de sessão em `/kolden/prod/NOTEBOOKLM_STORAGE_STATE` | ✔ instalado 2026-06-30; ~1.030 fontes extraídas dos 32 notebooks aproveitáveis. Manual: `NotebookLM/ferramentas.md` |

Por que não MCP: extração é batch único de ~1h, não uso contínuo. Se o Hermes Chief precisar consultar NotebookLM dinamicamente um dia, avaliar `notebooklm-mcp-cli` (jacob-bd).

## Resumo

- **16 MCPs conectados** sem login (12 via Infisical + Apollo + Canva + google-drive OAuth local + google-analytics ADC), em **user scope**.
- **8 aguardando `/mcp`** (cloudflare, vercel, neon, sentry, supabase, GHL, MS365, Notion).
- **3 follow-ups** com bloqueio de credencial: **Railway** (precisa Account Token),
  **Glama** (precisa Gateway key), **Deepgram** (precisa binário do CLI).
- **CLIs:** ver `cli-status.md` (5 autenticados; railway/neonctl/dg pendentes).
- **APIs:** ver `api-validation.md` (20 válidas de 24 testadas).
- Nenhuma credencial em texto puro no config (Art. VII intacto).

> **Nota — VSCode não entra nesta contagem.** O VSCode é **host/cliente** de servidores MCP (lado oposto: ele *consome* MCPs via `.vscode/mcp.json`, não é um servidor que adicionamos ao Claude Code). Documentado em [`VSCode/ferramentas.md`](VSCode/ferramentas.md); não soma aos "MCPs conectados" acima.
