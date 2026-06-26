# F3 — Inventário de capacidades — coreyhaines31/marketingskills@8bfcdff

> Pipeline de absorção (`ingestao-de-repositorio`), Fase 3 (gate BLOCK). Schema máquina-validável
> (`protocolo-de-absorcao-sem-perda`): uma linha por capacidade, ID `G\d+`.
> Cada `fonte(arquivo:linha)` aponta para a quarentena `_staging/quarentena/coreyhaines31--marketingskills@8bfcdff/`.
> Data: 2026-06-24. Veredito de segurança (F2): SAFE para absorção estática.

## Procedência das contagens estruturais (verificadas nesta passagem)
`find` na quarentena @8bfcdff: **45** `skills/*/SKILL.md` · **43** `evals.json` · **38** dirs `references/`
· **64** `tools/clis/*.js` · **93** `tools/integrations/*.md` · **2** arquivos em `tools/composio/`.
Casam 1:1 com o gabarito do diagnóstico (`diagnostico_caos/teste/gabarito.md`).

## Convenção de IDs
Os IDs **G1–G22 são preservados do gabarito** do diagnóstico (não renumerar) — o ledger
(`repositorios-absorvidos.yaml`) e o diagnóstico referenciam G13/G18/G21 por esses números.
Inventário conservador: cada uma das 45 skills tem frameworks internos próprios; G21 é a **amostra**
(`copywriting`), não o teto. Sub-capacidades por skill serão expandidas no build (F6) se o plano F5 aprovar.

## Capacidades estruturais (G1–G11)

| ID | capacidade | tipo | keywords | dominio | fonte(arquivo:linha) |
|----|-----------|------|----------|---------|----------------------|
| G1  | 45 Agent Skills (copy, ads, cro, seo, analytics, social, offers, pricing, lifecycle, prospecting…) | conjunto-skill | skills,marketing | multi | skills/*/SKILL.md (45) |
| G2  | Padrão `evals/evals.json` por skill (suíte de avaliação) | padrão-qualidade | evals,teste,maturity | multi | skills/*/evals.json (43) |
| G3  | `references/` por skill (docs profundos sob demanda) | padrão-doc | referencias,contexto | multi | skills/*/references/ (38) |
| G4  | 64 CLIs Node zero-dependência (`tools/clis/*.js`) | conjunto-codigo | cli,node,ferramentas | infra | tools/clis/*.js (64) |
| G5  | Padrão consistente de CLI: `--dry-run`, auth `{TOOL}_API_KEY`, saída JSON, fetch nativo Node 18+ | padrao-codigo | cli,dry-run,auth,json | infra | AGENTS.md:41-46,519-524 |
| G6  | `tools/REGISTRY.md` — índice ~90 ferramentas, matriz API/MCP/CLI/SDK + recomendação por categoria | referencia-dado | ferramentas,registry,matriz | infra | tools/REGISTRY.md:15-110 |
| G7  | 93 guias de integração (`tools/integrations/*.md`) — endpoints/auth/operações | conjunto-doc | integracao,api,endpoints | infra | tools/integrations/*.md (93) |
| G8  | Camada Composio (`tools/composio/`) — MCP para ferramentas OAuth-heavy sem MCP nativo | codigo-mcp | composio,mcp,oauth | infra | tools/REGISTRY.md:548-556; tools/integrations/composio.md |
| G9  | Gateway Cogny — MCP federado marketing-only | codigo-mcp | cogny,mcp,federado | infra | tools/REGISTRY.md:558-566 |
| G10 | `.claude-plugin/marketplace.json` — manifesto de marketplace de plugin do Claude Code | infra-plugin | plugin,marketplace,claude-code | infra | .claude-plugin/marketplace.json; AGENTS.md:130-139 |
| G11 | `validate-skills.sh` + `validate-skills-official.sh` — conformação à spec Agent Skills | reflexo-validacao | validacao,spec,conformidade | infra | validate-skills.sh:1-170; validate-skills-official.sh:1-85 |

## Capacidades não-óbvias / truques de prompt (G12–G22)

| ID | capacidade | tipo | keywords | dominio | fonte(arquivo:linha) |
|----|-----------|------|----------|---------|----------------------|
| G12 | Protocolo "check for updates 1×/sessão" (busca VERSIONS.md, compara, notifica só se ≥2 updates/major; não-bloqueante) | metodo-prompt | updates,versao,protocolo | infra | AGENTS.md:196-218 |
| G13 | Injeção dinâmica Claude-Code-only `` !`cmd` `` (auto-injeta `.agents/product-marketing.md`, data, branch, commits) — incompatível cross-agent | truque-prompt | injecao,claude-code,contexto | infra | AGENTS.md:223-254 |
| G14 | Convenção de contexto compartilhado `.agents/product-marketing.md` (fallbacks `.claude/`, legado), lida antes de perguntar | metodo-prompt | contexto,convencao,produto | multi | skills/copywriting/SKILL.md:14-15 |
| G15 | Regras de conformância da spec (name 1-64 lower/hífen=dir; sem `--`; description 1-1024 com trigger phrases; SKILL.md <500 linhas) | padrao-regra | spec,conformidade,frontmatter | infra | AGENTS.md:48-88 |
| G16 | Grafo de cross-referência entre skills (fronteiras de escopo: "for email copy see emails; for offers see offers") | padrao-arquitetura | cross-ref,roteamento,escopo | multi | skills/copywriting/SKILL.md:3,246-252 |
| G17 | Heurísticas de seleção de ferramenta por categoria ("Agent recommendation" em ~30 categorias) | metodo-dado | selecao,ferramenta,heuristica | infra | tools/REGISTRY.md:129,144,167+ |
| G18 | Método github-prospects (stargazers/forks de 3-5 repos âncora → filtrar `company` → enriquecer Apollo/Hunter → validar Truelist) | metodo-skill | prospeccao,github,apollo,hunter | estrategia | tools/REGISTRY.md:330-338 |
| G19 | Estados de validação Truelist (`email_state`: ok/email_invalid/risky/unknown/accept_all + `email_sub_state`) | dado-metodo | email,validacao,truelist | estrategia | tools/REGISTRY.md:326 |
| G20 | 14 ferramentas MCP-enabled mapeadas (ga4, stripe, mailchimp, google-ads, resend, zapier, zoominfo, clay, supermetrics, coupler, outreach, crossbeam, introw, exa) | dado-mapa | mcp,ferramentas,mapa | infra | tools/REGISTRY.md:527-544 |
| G21 | Frameworks internos das skills — ex. copywriting: voice-of-customer mirroring, 4 fórmulas de headline, `copy-frameworks.md`, `natural-transitions.md`, fórmula de CTA, 6 guias page-specific, output com anotações+alternativas | conjunto-skill | copy,frameworks,headline,voc | criacao | skills/copywriting/SKILL.md:53-54,115-123,161,170-196,230-238; skills/copywriting/references/{copy-frameworks,natural-transitions}.md |
| G22 | Biblioteca de experimentos CRO (`cro/references/experiments.md`, `form.md`) | conjunto-doc | cro,experimentos,otimizacao | criacao | skills/cro/references/experiments.md; skills/cro/references/form.md |

## Total
**22 capacidades** (G1–G11 estruturais + G12–G22 não-óbvias). Cada ID será disposto explicitamente no
`relatorio-de-perda.md` (F6.5) quando o build for aprovado — `ABSORVIDO` (com destino) ou `DESCARTADO`
(com motivo), `PERDIDO=0`. Mapeamento REUSE/ADAPT/CREATE por ID em `mapa-de-decisao.md` (F4).
