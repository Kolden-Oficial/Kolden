# Ferramentas dos Squads — Cross-check com o catálogo

Mapeamento de **todas as ferramentas/APIs/plataformas/MCPs citadas** pelos squads importados
(xquads-squads + aiox-core) contra o catálogo existente (`ferramentas.md`).

- ✅ **Já temos** — manual em `<Nome>/ferramentas.md` (dentro desta pasta).
- ➕ **Adicionar** — relevante; falta cadastrar. Para adicionar: provisionar credencial no Infisical
  (`/kolden/<env>/<NOME>`) → criar `<Nome>/ferramentas.md` → linha no índice + `mcp-status.md`
  (processo em `ferramentas.md` §"Como adicionar"). Nomes em PT-BR onde fizer sentido.
- 🧰 **CLI local** — ferramenta de linha de comando sem API key/credencial centralizada (não exige Infisical).
- 💡 **Conceitual** — citada como conceito/canal, não como integração técnica.

> Nota: a maioria dos squads de marketing/estratégia é **conhecimento** (personas + frameworks) e
> **não chama ferramentas externas diretamente** — as plataformas aparecem como canais. As integrações
> reais concentram-se em **Tráfego (Peitho)**, **Analytics (Metis)**, **Engenharia (Prometeu/Dedalo)**
> e **Segurança (Egide)**.

---

## 📣 Marketing / Ads (Peitho, Pluto, Caliope)

| Ferramenta | Status | Caminho Infisical sugerido | Usada por |
|---|---|---|---|
| Meta Ads / Conversions API (CAPI) | ✅ | `/kolden/dev/META_CAPI_TOKEN`, `META_PIXEL_ID` | Peitho |
| Google Ads | ➕ Não iniciado (verif. 2026-06-24) — bloqueio = credenciais (developer token + customer/MCC id) | `/kolden/prod/GOOGLEADS_*` | Peitho |
| **TikTok Ads** | ➕ Adicionar | `/kolden/prod/TIKTOK_ADS_TOKEN` | Peitho |
| **LinkedIn Ads** | ➕ Adicionar | `/kolden/prod/LINKEDIN_ADS_TOKEN` | Peitho |
| YouTube Ads | 💡 (via Google Ads) | — | Peitho |
| Meta Pixel / TikTok Pixel / LinkedIn Insight Tag | ✅/➕ (pixel via Meta; demais com a respectiva plataforma) | — | Peitho |

## 📊 Analytics / Growth (Metis, Peitho)

| Ferramenta | Status | Caminho Infisical sugerido | Usada por |
|---|---|---|---|
| **Google Analytics 4 (GA4)** | ✅ MCP oficial conectado (2026-06-24) — ADC gcloud; runReport validado (166 users/28d) | ADC (`gcloud`) | Metis, Peitho |
| **Google Tag Manager (GTM)** | ✅ Acesso via ADC validado (2026-06-24) — conta Kolden 6327657811 (read-only) | ADC (`gcloud`) | Peitho |
| **Google Search Console** | ✅ Acesso via ADC validado (2026-06-24) — sc-domain:kolden.com.br | ADC (`gcloud`) | Metis |
| **PageSpeed Insights API** | ✅ Provisionada e validada (2026-06-24) — score real obtido | `/kolden/dev/GOOGLE_DRIVE_API_KEY` | Metis |
| **YouTube Data API v3** | ✅ Provisionada e validada (2026-06-24) — channels.list OK | `/kolden/dev/GOOGLE_DRIVE_API_KEY` (Argos: `/kolden/argos`) | Argos/social-youtube, Metis |
| **Mixpanel** | ➕ Adicionar | `/kolden/prod/MIXPANEL_TOKEN` | Metis |
| **Amplitude** | ➕ Adicionar | `/kolden/prod/AMPLITUDE_API_KEY` | Metis |
| **Hotjar** | ➕ Adicionar | `/kolden/prod/HOTJAR_*` | Metis, Harmonia |
| **SEMrush / SimilarWeb** | ➕ Adicionar (SEO/concorrência) | `/kolden/prod/SEMRUSH_API_KEY` | Metis |
| CataLogo (tracking interno) | ✅ (projeto interno em `projetos/catalogo`) | — | Metis, Peitho |

## 🎨 Design / Web (Harmonia)

| Ferramenta | Status | Caminho Infisical sugerido | Usada por |
|---|---|---|---|
| **Figma** | ➕ Adicionar | `/kolden/prod/FIGMA_TOKEN` | Harmonia |
| Storybook | 🧰 CLI local (frontend) | — | Harmonia |
| v0 (Vercel) | ✅ | `/kolden/dev/V0_API_TOKEN` | Harmonia, Prometeu |
| **Lovable** | ➕ Adicionar (já é stack de referência do Caos) | `/kolden/prod/LOVABLE_*` | Harmonia |
| Replicate / Fal (gerador visual por IA) | ✅ | — | Harmonia |

## 🛠️ Engenharia / Dev (Prometeu, Dedalo)

| Ferramenta | Status | Caminho Infisical sugerido | Usada por |
|---|---|---|---|
| GitHub (API, gh CLI, Actions) | ✅ | `/kolden/prod/GITHUB_ACCESS_TOKEN` | Prometeu, Dedalo |
| Supabase / PostgreSQL / Neon | ✅ | — | Prometeu |
| Vercel / Railway | ✅ | — | Prometeu |
| Context7 / Exa (pesquisa técnica) | ✅ | — | Prometeu, Dedalo |
| **CodeRabbit** (revisão de código, via WSL) | ➕ Adicionar | `/kolden/prod/CODERABBIT_API_KEY` | Prometeu, Dedalo |
| **Docker MCP Toolkit / Gateway** | ➕ Adicionar (gateway de MCPs) | — (config local) | Prometeu, Dedalo |
| **ClickUp / Jira / Linear** (adapters de PM) | ➕ Adicionar conforme uso | `/kolden/prod/<TOOL>_TOKEN` | Prometeu |
| Husky / ESLint / Jest / Prettier / npm | 🧰 CLI local (dev) | — | Prometeu, Dedalo |
| Playwright (MCP) | ➕ Adicionar | — | Dedalo, Prometeu |

## 🔐 Segurança (Egide)

O squad Egide usa um arsenal grande de **CLIs locais de pentest/forense** (Nmap, masscan, amass,
subfinder, gobuster/ffuf, Nuclei, Nikto, WPScan, sqlmap, Metasploit, Hydra, Hashcat, John, Burp Suite,
Wireshark/tshark, Volatility, YARA, BloodHound, Impacket, CrackMapExec...). São **🧰 CLI local** — não
exigem credenciais centralizadas no Infisical. Serviços com API/conta que mereceriam cadastro:

| Ferramenta | Status | Caminho Infisical sugerido |
|---|---|---|
| **Shodan** | ➕ Adicionar | `/kolden/prod/SHODAN_API_KEY` |
| **Censys** | ➕ Adicionar | `/kolden/prod/CENSYS_API_*` |
| **Have I Been Pwned / DeHashed** | ➕ Adicionar | `/kolden/prod/HIBP_API_KEY` |
| Nessus / OpenVAS / Snyk | ➕ Adicionar conforme uso | `/kolden/prod/<TOOL>_TOKEN` |

---

## Resumo: o que adicionar (prioridade para o objetivo de marketing)

1. **Alta (marketing/analytics):** TikTok Ads, LinkedIn Ads, GA4, Google Tag Manager, Mixpanel,
   Amplitude, Hotjar, Figma, Google Ads (regularizar no índice).
2. **Média (engenharia):** CodeRabbit, Docker MCP Toolkit, Playwright (MCP), Lovable.
3. **Sob demanda:** SEMrush/SimilarWeb, ClickUp/Jira/Linear, Shodan/Censys/HIBP (segurança).

> **Verif. 2026-06-24 (ecossistema Google):** Google **Workspace** (Drive/Docs/Sheets/Slides/Calendar) já
> está ✅ via MCP `google-drive` — ver `GoogleWorkspace/ferramentas.md`. **Gemini** ✅ (API validada).
> **YouTube Data API** referenciada no squad Argos (`Argos/ferramentas.md`, chave `/kolden/argos`). Os demais
> (Ads, GA4, GTM, PageSpeed, Search Console, BigQuery, Maps) seguem ➕/💡 — **bloqueio = credenciais** que só
> o Ronan pode obter; nada instalável sem isso.

> Cada item ➕ vira uma pasta `<Nome>/ferramentas.md` (dentro desta pasta) quando a credencial for provisionada
> no Infisical (Constituição Art. VII). Verificar MCP disponível em `mcp-status.md` antes (vários já
> existem na sessão: Firecrawl, Exa, Context7, GitHub, Replicate, Fal, v0, Synter, Upstash, ElevenLabs,
> Browserbase, Tavily).
