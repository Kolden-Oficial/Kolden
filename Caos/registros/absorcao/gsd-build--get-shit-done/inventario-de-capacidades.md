---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/gsd-build--get-shit-done/mapa-de-decisao|mapa-de-decisao]]"
  - "[[Caos/registros/absorcao/gsd-build--get-shit-done/seguranca|seguranca]]"
---

# Inventário de capacidades — gsd-build--get-shit-done (rota A)

GSD ("Get Shit Done") por TÂCHES / Lex Christopherson — sistema de **meta-prompting + context engineering + spec-driven development** para Claude Code (e OpenCode, Gemini, Codex). Pipeline central: **roadmap → milestone → spec/plan-phase → execute-phase → verify-phase → validate → ship**, com agentes especializados, gates humanos, hooks de segurança e um SDK TypeScript que gera o estado/ferramentas. Repo arquivado (sucessor: open-gsd/gsd-core). Volume real: 33 agentes, ~67 comandos slash, ~80 workflows, ~60 referências de metodologia, ~15 hooks, SDK.

Inventário agrupado por cluster de capacidade (cada técnica distintiva = 1 ID).

| ID | capacidade | tipo | keywords | dominio | fonte(arquivo:linha) |
|---|---|---|---|---|---|
| G1 | Planner: decompõe fase em planos executáveis (plans-as-prompts), grafo de dependências/ondas, must-haves goal-backward | agente | plano, fase, dependência, onda, decomposição | spec-driven/eng | agents/gsd-planner.md |
| G2 | Executor: executa PLAN.md atômico, commit por tarefa, tratamento de desvio, checkpoints, gera SUMMARY.md/STATE.md | agente | execução, commit-atômico, checkpoint, desvio | spec-driven/eng | agents/gsd-executor.md |
| G3 | Verifier: verificação goal-backward com postura adversarial (FORCE), classificação BLOCKER/WARNING, não confia em SUMMARY | agente | verificação, goal-backward, adversarial, blocker | qa/verificação | agents/gsd-verifier.md |
| G4 | Plan-checker: revisão/convergência de plano antes de executar | subagent | revisão-de-plano, convergência, gap | spec-driven/eng | agents/gsd-plan-checker.md, references/planner-reviews.md |
| G5 | Debugger + debug-session-manager: depuração por thinking-models, sessão de debug | agente | debug, depuração, hipótese, root-cause | eng/debug | agents/gsd-debugger.md, agents/gsd-debug-session-manager.md, references/debugger-philosophy.md |
| G6 | Code-reviewer + code-fixer: revisão de código e correção dirigida | subagent | code-review, fix, qualidade | eng | agents/gsd-code-reviewer.md, agents/gsd-code-fixer.md |
| G7 | Security-auditor: auditoria estática de fase (secure-phase) | subagent | segurança, SAST, auditoria | segurança | agents/gsd-security-auditor.md, commands/gsd/secure-phase.md |
| G8 | Cluster de pesquisa: ai/domain/phase/project/advisor-researcher + research-synthesizer + intel-updater | agente | pesquisa, research, síntese, domínio | pesquisa | agents/gsd-*researcher.md, agents/gsd-research-synthesizer.md |
| G9 | Codebase-mapper + pattern-mapper: mapeia base de código existente e padrões | subagent | mapear-codebase, scout, padrões | eng | agents/gsd-codebase-mapper.md, agents/gsd-pattern-mapper.md, references/scout-codebase.md |
| G10 | UI auditor/checker/researcher: fase e revisão de UI (brand, sketch, variantes) | subagent | ui, design, sketch, brand | ux/ui | agents/gsd-ui-*.md, references/ui-brand.md, sketch-*.md |
| G11 | Eval-auditor + eval-planner: planejamento e auditoria de avaliações de IA | subagent | eval, avaliação-ia, scorecard | ai-evals | agents/gsd-eval-auditor.md, agents/gsd-eval-planner.md, references/ai-evals.md |
| G12 | Nyquist-auditor: auditor de cobertura/amostragem | subagent | cobertura, amostragem, nyquist | qa | agents/gsd-nyquist-auditor.md |
| G13 | Assumptions-analyzer: aflora e analisa premissas da fase | subagent | premissas, assumptions, risco | discovery | agents/gsd-assumptions-analyzer.md, workflows/discuss-phase-assumptions.md |
| G14 | User-profiler: perfila o usuário/persona via questionário | subagent | perfil-usuário, persona, questionário | discovery | agents/gsd-user-profiler.md, references/user-profiling.md |
| G15 | Pipeline de docs: doc-classifier/synthesizer/verifier/writer + motor de conflito de docs | subagent | docs, documentação, síntese, conflito | docs | agents/gsd-doc-*.md, references/doc-conflict-engine.md |
| G16 | Roadmapper + framework-selector + integration-checker | subagent | roadmap, framework, integração | spec-driven/eng | agents/gsd-roadmapper.md, agents/gsd-framework-selector.md, agents/gsd-integration-checker.md |
| G17 | Ciclo de vida de fase (plan→execute→verify→validate→ship) como workflow encadeado com gates | metodo-prompt | fase, ciclo, gate, ship | spec-driven/eng | get-shit-done/workflows/{plan,execute,verify,validate}-phase.md, ship.md |
| G18 | Modos de planejamento: spec-phase, ultraplan-phase, mvp-phase (profundidade variável) | metodo-prompt | spec, ultraplan, mvp, planejamento | spec-driven/eng | commands/gsd/{spec,ultraplan,mvp}-phase.md |
| G19 | Discuss-phase + questioning + thinking-partner: descoberta colaborativa antes do plano | metodo-prompt | discutir, perguntar, parceiro-de-pensamento | discovery | workflows/discuss-phase*.md, references/questioning.md, thinking-partner.md |
| G20 | Estrutura de projeto: new-project, new-milestone, roadmap, workspaces, diagnóstico de novo projeto | metodo-prompt | projeto, milestone, workspace | gestão | workflows/new-{project,milestone}.md, .changeset/new-project-agent-diagnostics.md |
| G21 | Graphify: build/atualização de grafo de dependências de fases (com hook de auto-update) | codigo-mcp | grafo, dependência, graphify | eng | get-shit-done/bin/lib/graphify.cjs, hooks/gsd-graphify-update.sh |
| G22 | Modos de autonomia: autonomous, fast, quick (graus de supervisão) | metodo-prompt | autônomo, rápido, supervisão | eng | commands/gsd/{autonomous,fast,quick}.md |
| G23 | Captura de backlog: capture, inbox, thread, note, review-backlog | metodo-prompt | backlog, captura, inbox, ideia | gestão | commands/gsd/{capture,inbox,thread,review-backlog}.md |
| G24 | Loops de aprendizado: forensics, extract-learnings, retrospective, session-report | metodo-prompt | aprendizado, retrospectiva, forense | aprendizado | workflows/{forensics,extract-learnings,session-report}.md |
| G25 | Prototipagem exploratória: sketch (tema/variantes/interatividade) e spike | metodo-prompt | sketch, spike, protótipo, exploração | ux/eng | workflows/{sketch,spike}.md, references/sketch-*.md |
| G26 | Metodologia de verificação goal-backward (padrões, overrides, gate de verificação humana) | metodo-prompt | verificação, goal-backward, override | qa/verificação | references/verification-patterns.md, verification-overrides.md, planner-human-verify-mode.md |
| G27 | Suíte thinking-models (planning/execution/research/verification/debug) — modelos de raciocínio por fase | metodo-prompt | thinking-models, raciocínio, mental-model | meta-prompting | references/thinking-models-*.md |
| G28 | SPIDR story-splitting + user-story-template + mvp-concepts | metodo-prompt | spidr, story, fatiamento, mvp | produto/spec | references/spidr-splitting.md, user-story-template.md, mvp-concepts.md |
| G29 | TDD orientado (execute-mvp-tdd, tdd.md) | metodo-prompt | tdd, teste-primeiro, vermelho-verde | eng/qa | references/tdd.md, execute-mvp-tdd.md |
| G30 | Bancos de antipadrões: planner-antipatterns, universal-anti-patterns, common-bug-patterns | referencia | antipadrão, bug, armadilha | eng | references/{planner-antipatterns,universal-anti-patterns,common-bug-patterns}.md |
| G31 | Context engineering: orçamento de contexto + engine de truncação/compressão | codigo-mcp | contexto, orçamento, truncação, compactação | context-eng | references/context-budget.md, sdk/src/context-engine.ts, context-truncation.ts |
| G32 | Protocolo de gates humanos: gate-prompts, gates, checkpoints, continuation-format | metodo-prompt | gate, checkpoint, aprovação-humana | meta-prompting | references/{gate-prompts,gates,checkpoints,continuation-format}.md |
| G33 | Roteamento multi-runtime/modelo: model-profiles, model-catalog, dispatch Claude/Gemini/Codex/OpenCode | codigo | multi-runtime, modelo, perfil, dispatch | infra-llm | references/model-profiles.md, sdk/shared/model-catalog.json, get-shit-done/bin/lib/model-catalog.cjs |
| G34 | Reflexo gsd-prompt-guard: escaneia Write em .planning/ por injeção de prompt (advisory) | reflexo | injeção, prompt-guard, .planning | segurança | hooks/gsd-prompt-guard.js |
| G35 | Reflexo gsd-read-injection-scanner: escaneia conteúdo lido (Read) por injeção que sobrevive à compactação — NOVEL | reflexo | injeção, read, compactação, ingestão | segurança | hooks/gsd-read-injection-scanner.js |
| G36 | Reflexo gsd-workflow-guard: guarda suave contra edits fora do workflow GSD | reflexo | guarda, workflow, edit | eng | hooks/gsd-workflow-guard.js |
| G37 | Reflexo context-monitor + statusline: monitora utilização de contexto e exibe na statusline | reflexo | contexto, monitor, statusline | context-eng | hooks/gsd-context-monitor.js, hooks/gsd-statusline.js |
| G38 | Reflexos de estado: validate-commit, phase-boundary, session-state | reflexo | commit, estado, sessão, fronteira-de-fase | eng | hooks/gsd-validate-commit.sh, gsd-phase-boundary.sh, gsd-session-state.sh |
| G39 | gsd-tools / gsd-sdk: motor CLI de estado (phase/roadmap/milestone/workstream/decisions) com camada de query e golden tests | codigo-mcp | cli, estado, ferramentas, sdk, query | infra/eng | bin/gsd-sdk.js, get-shit-done/bin/gsd-tools.cjs, sdk/src/ |
| G40 | Engine de scan estático: security.cjs (segredos/base64/injeção) + scripts secret-scan/base64-scan/prompt-injection-scan | codigo-mcp | scan, segredo, base64, injeção, sast | segurança | get-shit-done/bin/lib/security.cjs, scripts/*-scan.sh |

**Total: 40 capacidades (G1–G40).** Nota de granularidade: agentes e referências foram agrupados por cluster funcional (ex.: G8 cobre 7 agentes de pesquisa); a contagem física bruta é ~33 agentes + ~67 comandos + ~80 workflows + ~60 referências + ~15 hooks. Itens fora do escopo de absorção (infra de release/changeset, CI, i18n de README, testes) não inventariados.
