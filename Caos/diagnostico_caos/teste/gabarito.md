# Gabarito de capacidades — coreyhaines31/marketingskills@8bfcdff

> Inventário-verdade montado **manualmente** pelo auditor, ANTES de qualquer comparação com a saída do CAOS.
> Cada item tem citação `arquivo:linha` na quarentena. Repo escolhido por ser **o caso difícil real**: um repo de skills de agente com truques não-óbvios e camada de ferramentas (não um "hello world"). Bônus: foi **o próprio repo que o CAOS absorveu de verdade** em 2026-06-22 — diff direto contra a saída real, sem trapaça.

## Estruturais (verificados por `find`/`ls`)

| ID | Capacidade | Evidência |
|---|---|---|
| G1 | **45 Agent Skills** (`skills/*/SKILL.md`) cobrindo copy, ads, cro, seo, analytics, social, offers, pricing, lifecycle, prospecting… | 45 SKILL.md |
| G2 | **Padrão `evals/evals.json`** por skill (suíte de avaliação) — 43 skills | 43 evals.json |
| G3 | **`references/` por skill** (docs profundos carregados sob demanda) — 38 skills | 38 dirs |
| G4 | **64 CLIs Node zero-dependência** (`tools/clis/*.js`) | 64 .js |
| G5 | **Padrão consistente de CLI**: `--dry-run` (preview sem enviar), auth por env var `{TOOL}_API_KEY`, saída JSON, Node 18+ nativo `fetch` | `AGENTS.md:41-46,519-524` |
| G6 | **`tools/REGISTRY.md`** — índice de ~90 ferramentas com matriz API/MCP/CLI/SDK + recomendação por categoria | `REGISTRY.md:15-110` |
| G7 | **93 guias de integração** (`tools/integrations/*.md`) — endpoints/auth/operações por ferramenta | 93 .md |
| G8 | **Camada Composio** (`tools/composio/`) — MCP para ferramentas OAuth-heavy sem MCP nativo (HubSpot, Salesforce, Meta Ads…) | `REGISTRY.md:548-556` |
| G9 | **Gateway Cogny** — MCP federado marketing-only | `REGISTRY.md:558-566` |
| G10 | **`.claude-plugin/marketplace.json`** — manifesto de marketplace de plugin do Claude Code | `AGENTS.md:130-139` |
| G11 | **`validate-skills.sh` + `validate-skills-official.sh`** — conformação à spec Agent Skills | `validate-skills.sh:1-20` |

## Não-óbvios / truques de prompt (o que "45 skills" apaga)

| ID | Capacidade não-óbvia | Evidência |
|---|---|---|
| G12 | **Protocolo "check for updates 1×/sessão"**: buscar `VERSIONS.md` do GitHub, comparar versões, notificar só se ≥2 updates ou major bump, não-bloqueante | `AGENTS.md:196-218` |
| G13 | **Injeção dinâmica Claude-Code-only `` !`cmd` ``** — auto-injeta `.agents/product-marketing.md`, data, branch, commits no corpo da skill; **explicitamente incompatível cross-agent** (outros agentes veem o literal) | `AGENTS.md:223-254` |
| G14 | **Convenção de contexto compartilhado `.agents/product-marketing.md`** (fallbacks `.claude/`, legado) lida antes de perguntar | `copywriting/SKILL.md:14-15` |
| G15 | **Regras de conformância da spec** (name 1-64 lower/hífen = dir; sem `--`; description 1-1024 c/ trigger phrases; SKILL.md <500 linhas) | `AGENTS.md:48-88` |
| G16 | **Grafo de cross-referência entre skills** ("For email copy, see emails… For offers, see offers") — fronteiras de escopo entre as 45 | `copywriting/SKILL.md:3,246-252` |
| G17 | **Heurísticas de seleção de ferramenta por categoria** ("Agent recommendation" em ~30 categorias) | `REGISTRY.md:129,144,167…` |
| G18 | **Método github-prospects** (stargazers/forks de 3-5 repos âncora → filtrar `company` → enriquecer Apollo/Hunter → validar Truelist) | `REGISTRY.md:330-338` |
| G19 | **Estados de validação Truelist** (`email_state`: ok/email_invalid/risky/unknown/accept_all + `email_sub_state`) | `REGISTRY.md:326` |
| G20 | **14 ferramentas MCP-enabled** mapeadas (ga4, stripe, mailchimp, google-ads, resend, zapier, zoominfo, clay, supermetrics, coupler, outreach, crossbeam, introw, exa) | `REGISTRY.md:527-544` |
| G21 | **Frameworks internos de cada skill** — ex. copywriting: voice-of-customer mirroring, 4 fórmulas de headline, `copy-frameworks.md`, `natural-transitions.md`, fórmula de CTA, 6 guias page-specific, output c/ anotações+alternativas | `copywriting/SKILL.md:53-54,115-123,161,170-196,230-238` |
| G22 | **Biblioteca de experimentos CRO** (`cro/references/experiments.md`, `form.md`) | `find skills/cro` |

**Total do gabarito: 22 capacidades** (11 estruturais G1-G11 + 11 não-óbvias G12-G22). Conservador — cada uma das 45 skills tem frameworks internos próprios (G21 é só a amostra de `copywriting`); o número real de técnicas é muito maior.
