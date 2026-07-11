---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/thedotmack--claude-mem/briefing-de-execucao|briefing-de-execucao]]"
  - "[[Caos/registros/absorcao/thedotmack--claude-mem/mapa-de-decisao|mapa-de-decisao]]"
  - "[[Caos/registros/absorcao/thedotmack--claude-mem/seguranca|seguranca]]"
---

# Inventário de capacidades — thedotmack--claude-mem

- **slug:** thedotmack--claude-mem · **sha:** 3fe0725a · **rota:** A · **data:** 2026-06-26
- Plugin de memória persistente para Claude Code: captura tool-use → comprime via Claude Agent SDK → reinjeta contexto. Stack: hooks de ciclo de vida + worker Bun/Express + SQLite(FTS5) + ChromaDB + servidor MCP de busca + suíte de skills.

| ID | capacidade | tipo | keywords | dominio | fonte(arquivo:linha) |
|---|---|---|---|---|---|
| G1 | Pipeline de memória automática por hooks de ciclo de vida (Setup + SessionStart + UserPromptSubmit + PostToolUse + Stop + SessionEnd → observação→sumário→injeção) | reflexo | memoria, hooks, captura, ciclo-de-vida | claude-code/eng | plugin/hooks/hooks.json:3-86; docs/architecture-overview.md:31-42 |
| G2 | Busca MCP em 3 camadas (progressive disclosure): `search` (índice ~50-100 tok) → `timeline` (contexto cronológico) → `get_observations` (detalhe ~500-1k tok), ~10x economia de tokens | metodo-prompt | busca, mcp, progressive-disclosure, token-efficiency | claude-code/eng | README.md:239-272; plugin/scripts/mcp-server.cjs |
| G3 | Armazenamento híbrido SQLite (FTS5, tabelas sessions/observations/summaries) + ChromaDB (embeddings vetoriais, doc por fato) | codigo-mcp | sqlite, fts5, chroma, vetorial, storage | infra/dados | docs/architecture-overview.md:114-138 |
| G4 | Worker daemon HTTP (Express, porta por-usuário 37700+uid%100) com API de sessões/observações/busca + viewer web :37777 (SSE em tempo real) | ferramenta | worker, daemon, http, viewer, sse | infra | docs/architecture-overview.md:17-28; README.md:177 |
| G5 | Degradação graciosa: erros de transporte (ECONNREFUSED/timeout/5xx)→exit 0 (nunca bloqueia o host); bugs de cliente (4xx/TypeError)→exit 2 | metodo | hooks, resiliencia, fail-open, graceful-degradation | claude-code/eng | docs/architecture-overview.md:91-98 |
| G6 | Deduplicação de observações por `SHA256(session+title+narrative)[:16]` com janela de 30s | metodo | dedup, hash, idempotencia | claude-code/eng | docs/architecture-overview.md:100-106 |
| G7 | Tags `<private>` para excluir conteúdo sensível da captura/storage | metodo | privacidade, redacao, lgpd | seguranca | src/cli/handlers/user-message.ts; README.md:179 |
| G8 | Skill `mem-search` — busca em linguagem natural na memória cross-sessão (workflow search→filter→fetch) | skill | memoria, busca, sessoes-anteriores | claude-code/eng | plugin/skills/mem-search/SKILL.md |
| G9 | Skill `smart-explore` — busca estrutural de código via tree-sitter AST (smart_search/smart_outline/smart_unfold); "index first, fetch on demand" | skill | ast, tree-sitter, exploracao, token-optimizada | claude-code/eng | plugin/skills/smart-explore/SKILL.md; src/services/smart-file-read/parser.ts |
| G10 | Skill `learn-codebase` — prime de codebase lendo todo arquivo-fonte em full (paginação por offset/limit) | skill | onboarding, prime, codebase | claude-code/eng | plugin/skills/learn-codebase/SKILL.md |
| G11 | Skill `make-plan` — plano faseado executável em contextos novos; orquestrador + subagentes p/ fact-gathering, com Contrato de Reporte obrigatório | skill | planejamento, fases, orquestracao, subagentes | eng/spec-driven | plugin/skills/make-plan/SKILL.md |
| G12 | Skill `do` — executa plano faseado deployando subagentes (orquestrador puro, exige evidência por fase) | skill | execucao, orquestracao, subagentes | eng/spec-driven | plugin/skills/do/SKILL.md |
| G13 | Skill `pathfinder` — mapeia codebase em flowcharts por feature, detecta concerns duplicados, propõe arquitetura unificada + handoffs /make-plan | skill | arquitetura, refactor, duplicacao, flowchart | eng/spec-driven | plugin/skills/pathfinder/SKILL.md |
| G14 | Skill `knowledge-agent` — constrói/consulta "cérebros" (corpora filtrados de observações priorizadas em sessão de IA conversacional) | skill | knowledge-base, brain, corpus, memoria | mentes/pesquisa | plugin/skills/knowledge-agent/SKILL.md |
| G15 | Skill `timeline-report` — relatório narrativo "Journey Into [Project]" da história de desenvolvimento via timeline | skill | narrativa, historia, relatorio, timeline | storytelling/pesquisa | plugin/skills/timeline-report/SKILL.md |
| G16 | Skill `weekly-digests` — digest serial por semana ISO; um subagente consecutivo por semana, cada um recebendo o carry-forward do anterior | skill | digest, serial, carry-forward, narrativa | storytelling/eng | plugin/skills/weekly-digests/SKILL.md |
| G17 | Skill `standup` — reconciliação read-only entre worktrees/branches/PRs como agentes num chat markdown → 1 plano de consolidação | skill | git, worktree, reconciliacao, consolidacao | claude-code/eng | plugin/skills/standup/SKILL.md; standup.mjs |
| G18 | Skill `babysit` — acompanha PR/review até estar merge-ready (poll de checks/comentários/threads, corrige, repete) | skill | pr, ci, review, monitoramento | claude-code/eng | plugin/skills/babysit/SKILL.md |
| G19 | Skill `oh-my-issues` — clusteriza backlog de issues por causa-raiz em plan-masters 1:1 com PRs que fecham clusters atomicamente | skill | issues, triagem, cluster, roadmap | eng/pesquisa | plugin/skills/oh-my-issues/SKILL.md |
| G20 | Skill `design-is` — auditoria de design contra os 10 princípios de Dieter Rams (score+evidência) → verdito NEW/REFINE/REDESIGN + handoff | skill | design, ux, rams, auditoria | ux-ui | plugin/skills/design-is/SKILL.md |
| G21 | Skill `what-the` — breakdown em linguagem simples (quem/o quê/onde/porquê/quando) de algo técnico | skill | explicacao, didatico, plain-english | copy/conteudo | plugin/skills/what-the/SKILL.md |
| G22 | Skill `wowerpoint` — 1 doc → deck de slides kawaii em PDF (engine NotebookLM CLI) | skill | slides, deck, pdf, notebooklm | criacao/conteudo | plugin/skills/wowerpoint/SKILL.md |
| G23 | Skill `version-bump` — versionamento semântico/release de plugins Claude Code (sincroniza versão em todos os manifests, tag, GH release, changelog) | skill | release, semver, ci-cd, plugin | claude-code/eng | plugin/skills/version-bump/SKILL.md |
| G24 | Comando `anti-pattern-czar` — caça e corrige anti-padrões de error-handling via scanner automatizado (CRITICAL/HIGH/MEDIUM) | metodo-prompt | code-review, anti-padrao, error-handling | eng/qa | .claude/commands/anti-pattern-czar.md |
| G25 | Modos de observação configuráveis + i18n (`CLAUDE_MEM_MODE` = code / code--chill / code--<lang> ~30 idiomas, law-study, email-investigation) | metodo | modos, i18n, configuracao, prompt | claude-code/eng | plugin/modes/*.json; README.md:311-349 |
| G26 | Contrato de Reporte de Subagente (MANDATORY: fontes consultadas + achados concretos + locais de snippet + nota de confiança/gaps) | metodo-prompt | subagente, contrato, orquestracao, evidencia | eng/meta | plugin/skills/make-plan/SKILL.md; pathfinder/SKILL.md |
| G27 | Loop de restart de generator com backoff (1s→2s→4s, para após >3 restarts consecutivos; fila de pending preservada entre restarts) | metodo | resiliencia, retry, backoff, fila | infra/eng | docs/architecture-overview.md:80-89 |
| G28 | Integração OpenClaw gateway — memória persistente + feeds de observação em tempo real p/ Telegram/Discord/Slack/etc | ferramenta | gateway, openclaw, telegram, feeds | infra/integracao | README.md:162-170; openclaw/SKILL.md |

Total: **28 capacidades** (G1–G28).
