---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/garrytan--gstack/mapa-de-decisao|mapa-de-decisao]]"
  - "[[Caos/registros/absorcao/garrytan--gstack/seguranca|seguranca]]"
---

# Inventário de capacidades — garrytan--gstack

- **slug:** garrytan--gstack · **sha:** 11de390… · **rota:** A
- **resumo:** 59 `SKILL.md` (mark­down de prompt) = "23 especialistas + 8 power-tools" (auto-descrição
  do README) + camada de tooling (74 CLIs `bin/`, daemon `browse`, memória `gbrain`).
  Granularidade: 1 ID por persona/papel/técnica de prompt; tooling agrupado como ferramenta inerte.

## Personas / papéis e métodos de revisão (núcleo rota A — comparável ao Olimpo)

| ID | capacidade | tipo | keywords | dominio | fonte(arquivo:linha) |
|---|---|---|---|---|---|
| G1 | office-hours — YC Office Hours: reenquadra a ideia de produto antes do código ("vale construir?") | metodo-prompt | brainstorm, validar, ideia, vale-construir | discovery | office-hours/SKILL.md:1 |
| G2 | plan-ceo-review — modo CEO/founder: acha o "produto 10 estrelas" no pedido, pensa maior | metodo-prompt | ceo, founder, estrategia, escopo, ambicao | c-level | plan-ceo-review/SKILL.md:1 |
| G3 | plan-eng-review — modo eng manager: trava arquitetura, fluxo de dados, edge cases, testes | metodo-prompt | arquitetura, eng-manager, plano, edge-case | engenharia | plan-eng-review/SKILL.md:1 |
| G4 | plan-design-review — olhar de designer: nota 0-10 por dimensão, descreve o "10", corrige o plano | metodo-prompt | design, ux, rubrica, nota-0-10 | ux-ui | plan-design-review/SKILL.md:1 |
| G5 | plan-devex-review — DX: personas de dev, momentos mágicos, fricção, TTHW; 3 modos | metodo-prompt | dx, developer-experience, onboarding, persona | ux-ui | plan-devex-review/SKILL.md:1 |
| G6 | autoplan — pipeline que roda CEO→design→eng→DX em sequência com auto-decisão (6 princípios) | metodo-prompt | painel, orquestracao, auto-review, pipeline | c-level | autoplan/SKILL.md:1 |
| G7 | cso — Chief Security Officer: OWASP Top 10 + STRIDE, segredos, supply-chain, 2 modos (diário/profundo) | metodo-prompt | seguranca, owasp, stride, cso, auditoria | seguranca | cso/SKILL.md:1 |
| G8 | review — revisão de PR pré-merge: SQL safety, fronteiras de confiança LLM, side-effects condicionais | metodo-prompt | code-review, pr, pre-merge, diff | engenharia | review/SKILL.md:1 |
| G9 | investigate — debugging sistemático por causa-raiz; "sem fix sem investigação" | metodo-prompt | debug, causa-raiz, investigacao, bug | engenharia | investigate/SKILL.md:1 |
| G10 | qa — abre navegador real, acha bugs, corrige no código, commit atômico, re-verifica | metodo-prompt | qa, teste, navegador, bug-fix | engenharia | qa/SKILL.md:1 |
| G11 | qa-only — mesma metodologia do qa, mas só relata (sem mudar código) | metodo-prompt | qa, relatorio, read-only, teste | engenharia | qa-only/SKILL.md:1 |
| G12 | retro — retrospectiva semanal de engenharia, por-pessoa, streaks de shipping, trend | metodo-prompt | retro, retrospectiva, semanal, metricas | analytics | retro/SKILL.md:1 |
| G13 | design-review — auditoria visual de site ao vivo + loop de fix com commits atômicos | metodo-prompt | design, visual, slop, ux, audit | ux-ui | design-review/SKILL.md:1 |
| G14 | design-consultation — constrói design system completo do zero (estética, tipo, cor, layout, motion) | metodo-prompt | design-system, branding, tipografia, cor | ux-ui | design-consultation/SKILL.md:1 |
| G15 | design-html — gera HTML/CSS Pretext-native de qualidade de produção | metodo-prompt | html, css, frontend, design-final | ux-ui | design-html/SKILL.md:1 |
| G16 | design-shotgun — gera múltiplas variantes de design por IA, board de comparação, itera | metodo-prompt | variantes, comparacao, design, iteracao | ux-ui | design-shotgun/SKILL.md:1 |
| G17 | devex-review — auditoria ao vivo de DX (TTHW medido contra o fluxo real) | metodo-prompt | dx, developer-experience, audit, friccao | ux-ui | devex-review/SKILL.md:1 |
| G18 | spec — intenção vaga → spec executável em 5 fases; abre issue no GitHub, opcional spawn em worktree | metodo-prompt | spec, prd, story, issue, spec-driven | engenharia | spec/SKILL.md:1 |
| G19 | plan-tune — auto-tuning da sensibilidade do AskUserQuestion + psicográfico do dev | metodo-prompt | tuning, askuserquestion, sensibilidade | automacao | plan-tune/SKILL.md:1 |
| G20 | document-generate — gera docs Diataxis (tutorial/how-to/reference/explanation) a partir do código | metodo-prompt | docs, diataxis, documentacao, geracao | engenharia | document-generate/SKILL.md:1 |
| G21 | document-release — atualiza toda a doc para refletir o que foi enviado (pós-ship) | metodo-prompt | docs, release, pos-ship, atualizacao | engenharia | document-release/SKILL.md:1 |

## Reflexos de segurança/escopo (guardrails como skill)

| ID | capacidade | tipo | keywords | dominio | fonte(arquivo:linha) |
|---|---|---|---|---|---|
| G22 | careful — avisa antes de comandos destrutivos (rm -rf, DROP TABLE, force-push) | reflexo | guardrail, destrutivo, seguranca, aviso | automacao | careful/SKILL.md:1 |
| G23 | freeze — trava edições a um diretório (bloqueio rígido, não só aviso) | reflexo | freeze, escopo, bloqueio, edicao | automacao | freeze/SKILL.md:1 |
| G24 | unfreeze — remove a trava de diretório do freeze | reflexo | unfreeze, escopo, liberar | automacao | unfreeze/SKILL.md:1 |
| G25 | guard — ativa careful + freeze juntos | reflexo | guard, seguranca, escopo, combinado | automacao | guard/SKILL.md:1 |

## Técnicas transversais de alto valor (engenharia de prompt do gstack)

| ID | capacidade | tipo | keywords | dominio | fonte(arquivo:linha) |
|---|---|---|---|---|---|
| G26 | Reframe "produto 10 estrelas" — força a ambição máxima antes de planejar | metodo-prompt | 10-estrelas, ambicao, reframe, ceo | c-level | plan-ceo-review/SKILL.md; README.md:23 |
| G27 | Rubrica dimensional 0-10 — "nota cada dimensão, descreve como seria um 10, então corrige para chegar lá" | metodo-prompt | rubrica, 0-10, criterio, melhoria | ux-ui | plan-design-review/SKILL.md |
| G28 | Painel de personas com auto-decisão — rodar revisores em sequência com 6 princípios de decisão | metodo-prompt | painel, auto-decisao, orquestracao, review | c-level | autoplan/SKILL.md |
| G29 | gbrain context_queries — injeta no skill, no load, o contexto de sessões anteriores (filtro/glob/sort) | metodo-prompt | memoria, contexto, injecao, sessao-anterior | automacao | office-hours/SKILL.md:18-28; retro/SKILL.md |
| G30 | triggers + preamble-tier — auto-invocação por frase-gatilho + carregamento em camadas (tier 2/3/4) | metodo-prompt | trigger, invocacao, preamble-tier, roteamento | automacao | (frontmatter de todos os SKILL.md) |
| G31 | scrape→skillify — protótipo de scrape vira browser-skill codificada e permanente (~200ms) | metodo-prompt | scrape, skillify, codificar, browser-skill | automacao | scrape/SKILL.md:1; skillify/SKILL.md:1 |

## Camada de tooling / vendor inerte (fora do alvo, agrupado)

| ID | capacidade | tipo | keywords | dominio | fonte(arquivo:linha) |
|---|---|---|---|---|---|
| G32 | browse — daemon de navegador headless (Chromium real, CDP, ~100ms/comando), com sidecar de segurança | ferramenta | navegador, headless, chromium, cdp, qa | automacao | browse/SKILL.md; browse/src/*.ts (63) |
| G33 | open-gstack-browser + extension — Chromium visível controlado por IA, sidebar, stealth | ferramenta | navegador, extensao, sidebar, stealth | automacao | open-gstack-browser/SKILL.md:1 |
| G34 | setup-browser-cookies — importa cookies do navegador real para teste autenticado | ferramenta | cookies, autenticacao, navegador | automacao | setup-browser-cookies/SKILL.md:1 |
| G35 | pair-agent — pareia agente remoto (OpenClaw/Codex) com o navegador | ferramenta | pair, agente-remoto, openclaw | automacao | pair-agent/SKILL.md:1 |
| G36 | scrape — extrai dados de página web (1ª call prototipa) | ferramenta | scrape, extracao, web, dados | automacao | scrape/SKILL.md:1 |
| G37 | health — dashboard de qualidade de código (type checker, linter, testes, dead code) | ferramenta | qualidade, lint, dashboard, dead-code | engenharia | health/SKILL.md:1 |
| G38 | benchmark — detecção de regressão de performance (page load, Core Web Vitals) via daemon browse | ferramenta | performance, regressao, web-vitals | analytics | benchmark/SKILL.md:1 |
| G39 | benchmark-models — benchmark cross-model de skills (Claude, GPT, Gemini lado a lado) | ferramenta | benchmark, multi-llm, avaliacao, modelos | analytics | benchmark-models/SKILL.md:1 |
| G40 | ship — workflow de envio: testes, review, bump VERSION, CHANGELOG, commit, push, abre PR | ferramenta | ship, deploy, pr, versao, changelog | automacao | ship/SKILL.md:1 |
| G41 | land-and-deploy — merge do PR, espera CI+deploy, verifica saúde de produção | ferramenta | deploy, merge, ci, producao | automacao | land-and-deploy/SKILL.md:1 |
| G42 | canary — loop de monitoramento pós-deploy via daemon browse | ferramenta | canary, monitoramento, pos-deploy | automacao | canary/SKILL.md:1 |
| G43 | landing-report — dashboard read-only da fila de ship workspace-aware | ferramenta | dashboard, fila, ship, read-only | automacao | landing-report/SKILL.md:1 |
| G44 | setup-deploy — detecção one-time de config de deploy (Fly/Render/Vercel) | ferramenta | deploy, config, fly, vercel | automacao | setup-deploy/SKILL.md:1 |
| G45 | gstack-upgrade — atualiza o gstack para a última versão | ferramenta | upgrade, atualizacao, gstack | automacao | gstack-upgrade/SKILL.md:1 |
| G46 | make-pdf — markdown → PDF de qualidade de publicação | ferramenta | pdf, markdown, publicacao | automacao | make-pdf/SKILL.md:1 |
| G47 | diagram — inglês → diagrama (mermaid + .excalidraw editável + SVG/PNG, offline) | ferramenta | diagrama, mermaid, excalidraw, offline | automacao | diagram/SKILL.md:1 |
| G48 | context-save — salva contexto de trabalho (git state, decisões, trabalho restante) | ferramenta | contexto, save, sessao, git-state | automacao | context-save/SKILL.md:1 |
| G49 | context-restore — restaura contexto salvo (mesmo entre workspaces Conductor) | ferramenta | contexto, restore, sessao | automacao | context-restore/SKILL.md:1 |
| G50 | learn — gerencia o que o gstack aprendeu entre sessões | ferramenta | aprendizado, memoria, sessao | automacao | learn/SKILL.md:1 |
| G51 | setup-gbrain — provisiona gbrain (CLI, PGLite/Supabase, MCP, política de confiança por remote) | ferramenta | gbrain, memoria, supabase, mcp | automacao | setup-gbrain/SKILL.md:1 |
| G52 | sync-gbrain — mantém gbrain atualizado com o código do repo; atualiza guidance no CLAUDE.md | ferramenta | gbrain, sync, memoria, claude-md | automacao | sync-gbrain/SKILL.md:1 |
| G53 | codex — wrapper do OpenAI Codex CLI (segunda opinião): review, challenge, consult | ferramenta | codex, openai, segunda-opiniao | engenharia | codex/SKILL.md:1 |
| G54 | gstack (router) — SKILL.md raiz que roteia a suíte por trigger/preamble-tier | metodo-prompt | router, roteamento, suite, gstack | automacao | SKILL.md:1 |
| G55 | iOS QA cluster — ios-qa, ios-fix, ios-design-review, ios-clean, ios-sync (iPhone real via USB/Tailscale) | ferramenta | ios, iphone, swiftui, qa, tailscale | engenharia | ios-qa/SKILL.md + 4 |
| G56 | openclaw cluster — 4 skills duplicadas (ceo-review, investigate, office-hours, retro) p/ runtime OpenClaw | referencia | openclaw, duplicata, runtime, persona | automacao | openclaw/skills/*/SKILL.md |
| G57 | hackernews-frontpage — browser-skill de exemplo (scrape do HN front page) | referencia | exemplo, scrape, browser-skill, hn | automacao | browser-skills/hackernews-frontpage/SKILL.md:1 |
| G58 | suíte de CLIs gstack — 74 scripts em bin/ (gbrain, telemetry, decision-log, redact, version, slug…) | codigo-mcp | cli, bin, gbrain, telemetria, orquestracao | automacao | bin/ (74 arquivos) |

**Total: 58 IDs** (G1–G58). Núcleo rota A = G1–G31 (personas + reflexos + técnicas); cauda vendor = G32–G58.
