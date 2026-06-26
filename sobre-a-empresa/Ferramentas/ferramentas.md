# Ferramentas do Kolden — Índice Mestre

Catálogo de todas as ferramentas externas usadas pelos agentes do Kolden. Cada ferramenta tem
um manual próprio em `<Nome>/ferramentas.md` (dentro desta pasta) com fontes confiáveis (doc oficial,
GitHub, fórum, API) e status de MCP.

> **Art. VII (Constituição Kolden):** nenhuma credencial em texto puro — só o **caminho** no
> Infisical. Resolver em runtime:
> `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=<prod|dev> -- <comando>`.
> ⚠️ Os secrets estão no **path raiz** de cada ambiente (não em `/kolden/<env>`); por isso usa-se
> `--projectId`+`--env`, e não `--path`. Ver decisão pendente em `mcp-status.md`.

**Legenda MCP:** ✅ oficial · 🟡 comunidade · 🔌 conector claude.ai (configurável na sessão) · 🧩 host/cliente MCP (consome servidores MCP — é o lado oposto, não um servidor que adicionamos) · ❌ nenhum

---

## 🤖 IA / LLMs

| Ferramenta | Credenciais (Infisical) | Manual | MCP |
|------------|-------------------------|--------|-----|
| Anthropic | `/kolden/prod/ANTHROPIC_API_KEY` | [Anthropic](Anthropic/ferramentas.md) | ❌ |
| OpenRouter | `/kolden/prod/OPENROUTER_API_KEY` | [OpenRouter](OpenRouter/ferramentas.md) | 🟡 |
| Google AI Studio (Gemini) | `/kolden/prod/GOOGLESTUDIO_API_KEY`, `/kolden/prod/GOOGLESTUDIO_PROJECT_ID` | [GoogleAIStudio](GoogleAIStudio/ferramentas.md) | 🟡 |
| Eden AI | `/kolden/prod/EDENAI_API_KEY` | [EdenAI](EdenAI/ferramentas.md) | 🟡 |
| Glama | `/kolden/prod/GLAMA_API_KEY` | [Glama](Glama/ferramentas.md) | 🟡 |
| LobeChat | `/kolden/prod/LOBECHAT_API_KEY` | [LobeChat](LobeChat/ferramentas.md) | 🟡 |

## 🎨 IA Generativa / Mídia

| Ferramenta | Credenciais (Infisical) | Manual | MCP |
|------------|-------------------------|--------|-----|
| Replicate | `/kolden/prod/REPLICATE_API_TOKEN` | [Replicate](Replicate/ferramentas.md) | ✅ |
| Fal (fal.ai) | `/kolden/prod/FAL_API_KEY` | [Fal](Fal/ferramentas.md) | ✅ |
| v0 (Vercel) *(dev)* | `/kolden/dev/V0_API_TOKEN` | [v0](v0/ferramentas.md) | ✅ |

## 🔊 Áudio / Vídeo

| Ferramenta | Credenciais (Infisical) | Manual | MCP |
|------------|-------------------------|--------|-----|
| ElevenLabs | `/kolden/prod/ELEVENLABS_API_KEY` | [ElevenLabs](ElevenLabs/ferramentas.md) | ✅ |
| Deepgram | `/kolden/prod/DEEPGRAM_API_KEY` | [Deepgram](Deepgram/ferramentas.md) | ✅ |
| Speechmatics | `/kolden/dev/SPEECHMATICS_API_KEY` | [Speechmatics](Speechmatics/ferramentas.md) | ❌ |
| Creatomate | `/kolden/prod/CREATOMATE_API_KEY`, `/kolden/prod/CREATOMATE_PUBLIC_TOKEN` | [Creatomate](Creatomate/ferramentas.md) | 🟡 |

## 🔎 Busca / Scraping / Browser

| Ferramenta | Credenciais (Infisical) | Manual | MCP |
|------------|-------------------------|--------|-----|
| Tavily | `/kolden/prod/TAVILY_API_KEY` | [Tavily](Tavily/ferramentas.md) | ✅ |
| Exa | `/kolden/prod/EXA_API_KEY` | [Exa](Exa/ferramentas.md) | ✅ |
| Firecrawl | `/kolden/prod/FIRECRAWL_API_KEY` | [Firecrawl](Firecrawl/ferramentas.md) | ✅ |
| Browserbase | `/kolden/prod/BROWSERBASE_API_KEY`, `/kolden/prod/BROWSERBASE_PROJECT_ID` | [Browserbase](Browserbase/ferramentas.md) | ✅ |
| Apify | `/kolden/dev/APIFY_TOKEN`, `/kolden/dev/APIFY_USER_ID` | [Apify](Apify/ferramentas.md) | ✅ |
| SociaVault | `/kolden/dev/SOCIAVAULT_API_KEY` | [SociaVault](SociaVault/ferramentas.md) | ❌ |
| Context7 | `/kolden/prod/CONTEXT7_API_KEY` | [Context7](Context7/ferramentas.md) | ✅ |

## ☁️ Infra / Deploy

| Ferramenta | Credenciais (Infisical) | Manual | MCP |
|------------|-------------------------|--------|-----|
| Cloudflare | `/kolden/prod/CLOUDFLARE_ACCOUNT_ID`, `/kolden/prod/CLOUDFLARE_API_TOKEN` | [Cloudflare](Cloudflare/ferramentas.md) | ✅ |
| Vercel | `/kolden/prod/VERCEL_API_TOKEN` | [Vercel](Vercel/ferramentas.md) | ✅ |
| Railway | `/kolden/prod/RAILWAY_API_TOKEN` | [Railway](Railway/ferramentas.md) | ✅ |
| Upstash | `/kolden/prod/UPSTASH_API_KEY` | [Upstash](Upstash/ferramentas.md) | ✅ |
| GitHub | `/kolden/prod/GITHUB_ACCESS_TOKEN` | [GitHub](GitHub/ferramentas.md) | ✅ |

## 🧩 IDE / Ambiente de Dev

| Ferramenta | Credenciais (Infisical) | Manual | MCP |
|------------|-------------------------|--------|-----|
| VSCode *(editor; host/cliente MCP)* | — (editor local; usa as credenciais dos MCP servers que consome, via `${env:...}`/Infisical) | [VSCode](VSCode/ferramentas.md) | 🧩 |

## 🗄️ Banco de dados / Backend

| Ferramenta | Credenciais (Infisical) | Manual | MCP |
|------------|-------------------------|--------|-----|
| Neon | `/kolden/prod/DATABASE_URL` | [Neon](Neon/ferramentas.md) | ✅ |
| Supabase | `/kolden/prod/SUPABASE_API_TOKEN` | [Supabase](Supabase/ferramentas.md) | ✅ |

## 🔐 Observabilidade / Segredos

| Ferramenta | Credenciais (Infisical) | Manual | MCP |
|------------|-------------------------|--------|-----|
| Sentry | `/kolden/prod/SENTRY_AUTH_TOKEN`, `/kolden/prod/SENTRY_ORG_AUTH_TOKEN` | [Sentry](Sentry/ferramentas.md) | ✅ |
| Infisical | (gerencia todas as demais) | [Infisical](Infisical/ferramentas.md) | ✅ |

## 📂 Produtividade / Workspace

| Ferramenta | Credenciais | Manual | MCP |
|------------|-------------|--------|-----|
| Google Workspace (Drive/Docs/Sheets/Slides/Calendar) | OAuth desktop local — `~/.config/google-drive-mcp/` (não Infisical) | [GoogleWorkspace](GoogleWorkspace/ferramentas.md) | 🟡 |

## 📊 Analytics / Web (Google)

| Ferramenta | Credenciais (Infisical) | Manual | MCP |
|------------|-------------------------|--------|-----|
| PageSpeed Insights | `/kolden/dev/GOOGLE_DRIVE_API_KEY` ✅ | [PageSpeed](PageSpeed/ferramentas.md) | ❌ (API direta) |
| YouTube Data API v3 | `/kolden/dev/GOOGLE_DRIVE_API_KEY` ✅ | [YouTubeData](YouTubeData/ferramentas.md) | ❌ (API direta) |
| Google Analytics 4 (GA4) | ADC (`gcloud`) — conta adm@kolden.com.br ✅ | [GA4](GA4/ferramentas.md) | ✅ (oficial Google, conectado) |
| Google Tag Manager | ADC (`gcloud`, `tagmanager.readonly`) ✅ | [GoogleTagManager](GoogleTagManager/ferramentas.md) | ❌ (API direta; MCP comunitário opcional) |
| Search Console | ADC (`gcloud`, `webmasters.readonly`) ✅ | [SearchConsole](SearchConsole/ferramentas.md) | ❌ (API direta) |

## 📈 Marketing / CRM

| Ferramenta | Credenciais (Infisical) | Manual | MCP |
|------------|-------------------------|--------|-----|
| GoHighLevel | `/kolden/prod/GHL_PIT_KEY`, `GHL_AGENCY_KEY`, `GHL_LOCATION_ID` (+ tokens em `dev`) | [GoHighLevel](GoHighLevel/ferramentas.md) | 🔌 |
| Postiz *(publicação social — self-host)* | `/kolden/prod/POSTIZ_API_KEY`, `POSTIZ_API_URL`, `POSTIZ_JWT_SECRET` *(a cadastrar)* | [Postiz](Postiz/ferramentas.md) | 🟡 |
| Meta (Ads / Conversions API) *(dev)* | `/kolden/dev/META_CAPI_TOKEN`, `/kolden/dev/META_PIXEL_ID` | [Meta](Meta/ferramentas.md) | 🟡 |
| Google Ads *(aguarda developer token)* | ADC + `GOOGLEADS_*` *(a cadastrar)* | [GoogleAds](GoogleAds/ferramentas.md) | ✅ (oficial; pendente token) |
| Synter *(dev)* | `/kolden/dev/SYNTER_API_KEY` | [Synter](Synter/ferramentas.md) | ✅ |
| Windsor.ai *(dados de marketing/ETL)* | `/kolden/dev/WINDSOR_API_KEY` | [Windsor](Windsor/ferramentas.md) | ✅ |
| AiGrow *(growth Instagram — sem API pública)* | — | [AiGrow](AiGrow/ferramentas.md) | ❌ |

---

## Segredos internos de configuração (sem manual próprio)

Não são ferramentas externas — são variáveis de configuração da própria aplicação Kolden:

| Chave | Caminho Infisical | Função |
|-------|-------------------|--------|
| `APP_URL` | `/kolden/prod/APP_URL` | URL base da aplicação |
| `AUTH_SECRET` | `/kolden/prod/AUTH_SECRET` | Segredo de sessão/auth da app |
| `JWKS_KEY` | `/kolden/prod/JWKS_KEY` | Chave JWKS (assinatura de tokens) |
| `KEY_VAULTS_SECRET` | `/kolden/prod/KEY_VAULTS_SECRET` | Segredo de cofre interno |
| `DATABASE_URL` | `/kolden/prod/DATABASE_URL` | Connection string → **Neon** (ver manual) |

---

## Relatórios de status

- **[ferramentas-dos-squads.md](ferramentas-dos-squads.md)** — cross-check das ferramentas citadas pelos squads importados (Peitho, Metis, Harmonia, Prometeu, Egide...) vs catálogo: o que já temos e o que adicionar (TikTok/LinkedIn Ads, GA4, GTM, Mixpanel, Amplitude, Hotjar, Figma, CodeRabbit...).
- **[matriz-de-marketing-absorvida.md](matriz-de-marketing-absorvida.md)** — matriz de ~90 ferramentas de marketing por categoria (API/MCP/CLI/SDK) + heurística de escolha + mapa MCP-enabled, absorvida de `coreyhaines31/marketingskills` (G6/G7/G17/G20). **Candidatas a provisionar** (ainda sem credencial Kolden); guias profundos dos 93 integrations preservados na quarentena.
- **[teste-funcional.md](teste-funcional.md)** — teste real "está funcionando?" por camada (API/CLI/MCP): 26 ok, 4 pendências.
- **[mcp-status.md](mcp-status.md)** — servidores MCP: 15 conectados (inclui google-drive), 8 aguardando OAuth, follow-ups.
- **[cli-status.md](cli-status.md)** — CLIs de fornecedor instalados e autenticados (gh, vercel, wrangler, supabase, sentry-cli…).
- **[api-validation.md](api-validation.md)** — cada API key testada com chamada real (20 válidas; Glama e v0 a reemitir).

## Como adicionar uma nova ferramenta

1. Cadastrar a credencial no Infisical seguindo `/kolden/<env>/<NOME>` (ver `Infisical/instalacao.md`).
2. Criar `<Nome>/ferramentas.md` (dentro desta pasta) no template padrão (descrição, credenciais, fontes,
   MCP, uso básico, notas Kolden).
3. Adicionar a linha na categoria correta deste índice + no `mcp-status.md`.
