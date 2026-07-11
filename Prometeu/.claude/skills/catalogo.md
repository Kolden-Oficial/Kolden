---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
---

# Catálogo de Habilidades — Prometeu

Índice das habilidades próprias em `.claude/skills/` (framework de engenharia AIOX).
**NÃO** inclui o bundle vendorizado `.aiox-core/` nem as 12 personas de agente em
`.claude/skills/AIOX/agents/` (réplica vendorizada dos agentes do aiox-core — `aiox-master`,
`analyst`, `architect`, `data-engineer`, `dev`, `devops`, `pm`, `po`, `qa`, `sm`,
`squad-creator`, `ux-design-expert`).

| Habilidade | Gatilho de invocação | Propósito |
|---|---|---|
| `architect-first` | iniciar feature, refatorar, decisão arquitetural | Filosofia Architect-First: design/doc completos antes do código, acoplamento zero, validação multi-perspectiva |
| `clarificacao-de-ambiguidade` | spec recém-escrita, antes de planejar/implementar | Varre ambiguidade e lacunas de decisão (escopo/dados/NFR/edge cases) de forma estruturada |
| `checklist-de-requisitos` | spec parece pronta, quer gate de qualidade dos requisitos | GERADOR de checklist que valida a qualidade da spec (completude/clareza/consistência/mensurabilidade) |
| `fatiamento-mvp-por-historia` | decompor feature em user stories priorizadas | Fatias P1/P2/P3 independentemente testáveis (desenvolvível/deployável/demonstrável); eixo SPIDR |
| `analise-cross-artefato` | após `tasks.md` e antes de implementar | Análise read-only de consistência spec×plan×tasks×constituição; rastreabilidade requisito→task + severidade |
| `ciclo-de-fase-goal-backward` | executar feature/fase de ponta a ponta com rigor | Ciclo plan→execute→verify→validate, TDD test-first, gate de evidência (existência ≠ implementação) |
| `spec-build-review` | levar ideia informal até código revisado | Orquestra Spec→Build→Review (spec-pipeline/development-cycle/qa-loop) com 2 gates humanos; não dá push |
| `padroes-de-engenharia-idiomatica` | escrever/revisar código de implementação | Código idiomático na linguagem/framework, commits convencionais, refatoração sem gold-plating |
| `engenharia-de-dados` | schema, migrations, pipeline de dados, qualidade de dado | Forma idiomática do dado (Postgres/MySQL/Redis/Prisma): DDL, índice, normalização, idempotência |
| `devops-e-entrega-continua` | projetar CI/CD, IaC, observabilidade, destravar build | Conhecimento de entrega contínua (Docker/K8s/deploy/logs/métricas); informa, não autoriza push (@devops) |
| `qa-e-quality-gates` | estratégia de teste, gates avançados antes de Done | Arsenal de teste (unit/integração/e2e), verificação adversarial, regressão/canary/auditoria de produção |
| `checklist-runner` | validar trabalho contra um checklist `.md` | Motor genérico de execução de checklist (YOLO/interativo) com veredicto pass/fail/partial |
| `coderabbit-review` | revisão automatizada antes de commit/PR/QA gate | CodeRabbit CLI via WSL com loop de auto-fix e filtragem por severidade |
| `mcp-builder` | construir servidor MCP para integrar API/serviço externo | Servidores MCP de alta qualidade em Python (FastMCP) ou Node/TS (MCP SDK) |
| `skill-creator` | criar/atualizar uma skill | Guia de criação de skills eficazes (frontmatter, descrição que dispara invocação, corpo enxuto) |
| `synapse` | entender/gerenciar o motor de contexto SYNAPSE | Domains, regras de contexto, star-commands, brackets, pipeline de 8 layers de injeção |
| `tech-search` | pesquisa técnica aprofundada autocontida | WebSearch+WebFetch+workers Haiku: query→decompose→parallel→evaluate→synthesize; salva em `docs/research/` |
| `micro-sprints-e-decomposicao-de-task` | story com alto risco de descoberta tardia (API externa, debate técnico, spike) | Ciclo de 1-3 dias acoplado à Fase 3 do Story Development Cycle (dev-develop-story). Decomposição em 5 dimensões (escopo/bloqueios/tamanho/confiança/dono), max 8h/task. Dono: sm-river + dev-dex |
| `prfaq-amazon-style` | spec pipeline Fase 4 (Write Spec) / decisão de iniciar projeto de escala / alinhamento de stakeholders | Press Release + FAQ externo + FAQ interno (assunções honestas) estilo Amazon Working Backwards. Linguagem do cliente. 1 página max. Dono: pm-morgan |
| `moscow-kano-mcda` | priorizar backlog/escopo de release (não validação) | MoSCoW classifica (Must/Should/Could/Won't); Kano categoriza (Basic/Performance/Delighter); MCDA pondera em empates. Cross-link bidirecional com Aletheia/priorizacao-rice. Dono: po-pax |
| `matriz-valor-esforco-quick-wins` | MoSCoW empata Should/Could / roadmap em 4 quadrantes para stakeholders | Valor × Esforço (4 quadrantes: Quick Wins / Major Projects / Fill-ins / Time Wasters). Max 30% sprint em Quick Wins. Dono: po-pax |
| `matriz-de-risco-e-contingencia` | mapear riscos de story/sprint/projeto antes de iniciar | Matriz 5x5 (Probabilidade × Impacto); mitigação E contingência (ambos); triggers observáveis e donos. Para risco de runtime SLO use slo-error-budget-burn-rate (B03). Dono: po-pax + sm-river |
| `depuracao-sistematica` | bug/incidente, fix repetido em variantes, teste passa e produção falha | 4 fases (observar > hipótese > isolar > intervir), 5-whys sobre stack+blame+logs, defense-in-depth (fail-fast/assert/retry+backoff/circuit-breaker), condition-based-waiting, caça a anti-padrões de teste. Dono: @dev + @qa |
| `orquestracao-de-comandos-slash` | escrever `/comando` novo, pipeline determinístico, extension-hook | Anatomia canônica (frontmatter + template + prompt), pipeline `/specify > /clarify > /plan > /tasks > /implement > /analyze > /checklist`, semântica append-only de `/converge`, `/taskstoissues` via GitHub MCP, marcador `[P]` de paralelismo, hooks `before:`/`after:`. Dono: arquiteto de comando (agnóstico) |
| `debugging-por-council-e-verification-loop` | decisão técnica de fronteira precisa de discordância estruturada antes do commit | Council de 3 subagentes (revisor / verificador / executor) com Santa Method (crítica só vale se traz sugestão), verification loop de 5 passos (hipótese > escrita > revisão > reescrita > aprovação), max 3 rodadas > escalar. Tática INTERNA de `spec-build-review` |
| `remediacao-air-gapped` | transferir código/dado entre bolhas seguras com rastro forense (air-gap, quarentena, drive removível auditado) | Inventário origem + chain-of-custody + sandbox de detonação + invariante PERDIDO=0. Dono: @data-engineer (Dara). Cross-link Caos `protocolo-de-absorcao-sem-perda` |
| `mlops-em-producao` | levar modelo ML/DL a produção com registry, CI/CD, shadow deploy, drift detection e rollback binário | Model registry (MLflow) + feature store versionado + shadow/canary + PSI/KS drift + retrain triggers + telemetria de inferência. Dono: @dev (Dex) |
| `topologias-de-inferencia-ml` | decidir como servir modelo ML — online/batch/stream/edge/serverless — por SLA, throughput e custo | 5 topologias canônicas + matriz de decisão + contrato de deploy por topologia. Dono: @architect (Aria) |
| `arquitetura-de-inferencia-llm-autonoma` | arquitetar chamada de LLM em produção com fallback provider-agnostic, prompt cache e circuit breaker | Provider abstraction + cache exato/semântico/nativo Anthropic + fallback chain + circuit breaker por latência + token accounting + TPS budget. Cross-link Hermes camada-2. Dono: @architect (Aria) |
| `governanca-de-contratos-de-api` | tratar API como contrato-first (OpenAPI/AsyncAPI como source-of-truth) com CI de compat e deprecation timeline | Spec-first + schemathesis/dredd + openapi-diff bloqueia breaking + versioning strategy explícita + sunset RFC 8594. Dono: @architect (Aria) |
| `migracao-zero-downtime` | mudar schema em produção sem downtime (expand-contract, dual-write, backfill batch) — foco Postgres | 5 fases (analise > EXPAND > DUAL-WRITE+BACKFILL > SHADOW READ+FLAG > CONTRACT+cleanup); padrões por caso (rename/split/change type). Dono: @data-engineer (Dara) |
| `revisao-de-codigo-priorizada` | triar PRs por priority-tier (hot/warm/cold) com heurística de score de risco | Matriz de triagem (peso por sinal) + gates automáticos por tier + regras de reviewer + SLA de primeira revisão. Donos: @qa (Quinn) + @dev (Dex) |
| `onboarding-de-codebase-em-3-niveis` | onboarding de nova pessoa em codebase em 3 níveis com checkpoints objetivos | N1 48h (run/build/test/deploy sozinho) → N2 2sem (modificar módulo isolado) → N3 2mes (feature cross-módulo com ADR) + mentor pair rotation. Dono: @analyst (Alex) |
| `invariantes-de-pipeline-de-dados` | declarar e enforçar invariantes contratuais em pipelines (row-count, null-rate, PK, RI, business) | 6 famílias de invariantes + dbt tests / Great Expectations / Soda + failure mode que trava pipeline + baseline evolutiva. Dono: @data-engineer (Dara) |
| `otimizacao-de-banco-postgres-supabase` | tuning Postgres/Supabase (EXPLAIN, índices, autovacuum, PgBouncer, RLS, realtime) | 5 pilares: leitura de EXPLAIN + estratégia de índice (btree/GIN/BRIN/partial/covering) + autovacuum + PgBouncer + Supabase-specific (RLS + realtime + edge). Dono: @data-engineer (Dara) |

## Bucket B03 engineering — 28 skills novas (2026-07-02)

Absorvidas em 2026-07-02 do upstream `msitarzewski/agency-agents@a597cb6` (MIT). Bucket B03 do
Ritual de Absorção do Caos — divisão engineering. Aplicadas em 3 sub-lotes (B03-A já anotado
acima; B03-B e B03-C listados aqui). Detalhe em
`C:\Kolden\Caos\registros\absorcao\msitarzewski--agency-agents\decisao-f5-b03-engineering.md`.

### B03-A (10 skills — anotadas na tabela principal acima)
| Skill | IDs upstream | Tipo | Herança histórica |
|---|---|---|---|
| `remediacao-air-gapped` | G1-G4 | ADAPT | NIST SP 800-82 + CISA Cross-Domain + SANS ICS515 |
| `mlops-em-producao` | G5 | ADAPT | Chip Huyen, Andrew Ng, Neal Lathia, Ernest Kim |
| `topologias-de-inferencia-ml` | G6 | ADAPT | Werner Vogels, NVIDIA Triton, TF Serving, Pete Warden |
| `arquitetura-de-inferencia-llm-autonoma` | G7-G9 | CREATE | Anthropic Prompt Caching, Michael Nygard, Simon Willison, Hermes |
| `governanca-de-contratos-de-api` | G11 | ADAPT | Ollie Doyle, OpenAPI Initiative, Sam Newman, Fowler+Pact |
| `migracao-zero-downtime` | G12, G24 | ADAPT | Andrew Kane, gh-ost/pt-osc, pg_repack, Nikolay Samokhvalov |
| `revisao-de-codigo-priorizada` | G15-G16 | ADAPT | Michael Fagan, Google Eng Practices, Camille Fournier, Karl Wiegers |
| `onboarding-de-codebase-em-3-niveis` | G17-G18 | CREATE | Camille Fournier, Charity Majors, Fred Brooks, GitLab handbook |
| `invariantes-de-pipeline-de-dados` | G20-G21 | ADAPT | Great Expectations, Airbnb Wall/Data Portal, dbt tests, Chad Sanderson |
| `otimizacao-de-banco-postgres-supabase` | G22-G24 | ADAPT | Egor Rogov, Bruce Momjian, Álvaro Herrera, Nikolay Samokhvalov, Supabase eng |

### B03-B (10 skills)
| Skill | IDs upstream | Tipo | Herança histórica |
|---|---|---|---|
| `estrategias-de-deploy-zero-downtime` | G26-G30 + B04 G12 (cohort/A-B) | ADAPT | Michael Nygard (*Release It!*), Charity Majors (Honeycomb), Etsy/Flickr deploy culture, LaunchDarkly team |
| `mvp-em-3-dias-nextjs-supabase` | G63, G64 | CREATE | Jason Fried (37signals *Shape Up*), Eric Ries (MVP), Guillermo Rauch (Vercel), Paul Copplestone (Supabase) |
| `virtualizacao-e-perf-de-listas` | G31, G32 | ADAPT | Tanner Linsley (@tanstack/virtual), Brian Vaughn (react-window), Chrome DevTools team, Jake Archibald |
| `governanca-git-branching` | G33-G36 | ADAPT | Vincent Driessen (git-flow 2010), Adam Ruka (trunk-based), GitHub Flow, Google monorepo eng |
| `disciplina-de-diff-minimo` | G37-G40 | CREATE | Michael Feathers (*Working Effectively w/ Legacy Code*), Kent Beck (TDD), Martin Fowler (refactoring), Robert Martin |
| `slo-error-budget-burn-rate` | G42-G45 | ADAPT | Google SRE Book (Betsy Beyer, Chris Jones), Charity Majors, Björn Rabenstein, Liz Fong-Jones |
| `inteligencia-de-email-mime` | G46-G50 | CREATE | John Klensin (RFC 5321), Ned Freed (MIME RFC 2045-2049), Postfix team, DKIM/DMARC (Jim Fenton) |
| `desenvolvimento-mobile-multiplataforma` | G51-G54 | ADAPT | Eric Rozell (React Native original), Filip Hráček (Flutter), Guillermo Rauch (PWA), Tim Neutkens (Next.js) |
| `arquitetura-mobile-offline-first` | G59 | ADAPT | Alex Feyerke (offline-first movement 2013), James Long (Actual Budget CRDT), Martin Kleppmann (local-first) |
| `engenharia-de-prompts-versionada` | G60, G61, G62 | ADAPT | Riley Goodside (prompt engineering canonical), Anthropic prompt-eng team, Simon Willison, DSPy team (Omar Khattab) |

### B03-C (8 skills)
| Skill | IDs upstream | Tipo | Herança histórica |
|---|---|---|---|
| `efeitos-visuais-premium-threejs` | G65 (parcial), G66 | ADAPT parcial | Ricardo Cabello ("mrdoob"), Bruno Simon (threejs-journey), Paul Henschel (poimandres/r3f). **DESCARTA** Laravel/Livewire/FluxUI |
| `selecao-de-padrao-arquitetural` | G68, G69 | ADAPT | Eric Evans (DDD 2003), Alistair Cockburn (hexagonal 2005), Jeffrey Palermo (onion 2008), Robert C. Martin (Clean Arch), Sam Newman, Vaughn Vernon |
| `acessibilidade-wcag-2-2-aa` | TEST G1, G2, G3, G4 | CREATE | W3C WAI, Adrian Roselli, Léonie Watson, Deque Systems (axe-core), Marcy Sutton, Sara Soueidan |
| `testes-de-api-funcional-seguranca-performance` | TEST G5, G6, G7, G8 | ADAPT (cross-link Égide `seguranca-de-api`) | Alberto Lerner (Bruno CLI), Kent C. Dodds (testing trophy), OWASP API Security Project, Ragnar Lönn (k6), Beth Skurrie (Pact) |
| `qa-anti-fantasia-com-evidencia-visual` | TEST G9, G10, G11, G12 | ADAPT | Michael Bolton (Rapid Software Testing), James Bach (Satisfice), Elisabeth Hendrickson, Alan Page + Brent Jensen, Cem Kaner, Lisa Crispin + Janet Gregory |
| `benchmarking-com-k6-multi-stage` | TEST G13, G15 | ADAPT | Ragnar Lönn + Grafana Labs, Simon Aronsson, Ian Molyneaux, Neil Gunther (Guerrilla Capacity Planning) |
| `cross-validation-qa-integracao` | TEST G18 | ADAPT | Marc Wandschneider, Martin Fowler (IntegrationTest), Simon Brown (C4 model), Michael Feathers, Michael Nygard |
| `spec-vs-implementation-gap-analysis` | TEST G19 | ADAPT (cross-link Artigo III + IV AIOX) | Barry Boehm, Alistair Cockburn, Dean Leffingwell + Don Widrig, Ivar Jacobson (OOSE), IEEE Std 830 |
| `analise-estatistica-de-qa-com-ml` | TEST G21, G22, G23, G24 | CREATE | Richard Lipton (mutation 1971), Yves Le Traon (Stryker), Peter Faller (PIT), John Micco (Google), Kim Herzig (Microsoft), Facebook Eng (Predictive Test Selection ICSE 2019), Edwin Wilson (Wilson CI 1927) |

**Anti-conflito B03:** todas as 28 skills escritas em `.claude/skills/` (L3). Nenhum arquivo de
`.aiox-core/` foi tocado — a fronteira L1/L2 do AIOX está intacta. Skills que declaram
agente-dono AIOX (Dara/Dex/Aria/Alex/Quinn/Gage) fazem-o apenas via frontmatter — nenhum `.md`
de agente foi editado.

**Aplicação:** B03 aplicado em 2026-07-02 — **28 skills novas em Prometeu, PERDIDO=0** (invariante
do protocolo de absorção sem perda mantida). Sub-lotes cronológicos: B03-A (O5, 10 skills) →
B03-B (O6-Sub2, 10 skills) → B03-C (O6-Sub3, 8 skills, incluindo esta reconciliação do catálogo).

**Aplicações irmãs (B03) em outros squads Kolden:**
- Dédalo: 2 skills (`arquitetura-multi-agente-canonica`, `avaliacao-de-ferramentas-mcda`)
- Égide: 1 skill (`solidity-evm-foundry-seguro`)
- Ariadne: extensão da skill `core-web-vitals-e-performance` (Metas absolutas + Capacity planning)
- Caliope: 1 skill (`escrita-tecnica-docs-as-code` — compartilhada do squad)
- Aletheia: 1 skill (`otimizacao-de-workflow-lean` — compartilhada do squad)

Total bucket B03 aplicado no ecossistema Kolden: **28 skills Prometeu + 5 skills/extensões
cross-squad = 33 entregas**. B03 encerrado.

## Procedência das 5 skills novas (B04)

Absorvidas em 2026-06-29 do upstream `msitarzewski/agency-agents@a597cb6` divisão `product/` (MIT). Bucket B04 do Ritual de Absorção do Caos. Detalhe em `C:\Kolden\Prometeu\_origem.md`.

**Anexos REUSE em MEMORY.md (sem skill nova):**
- `pm/MEMORY.md` — G10 (outcome-driven + discovery-to-launch ownership) + G13 (PRD embute problem statement + scope IN/OUT)
- `po/MEMORY.md` — G14 (priorização ancorada em rolling average de velocity)
- `sm/MEMORY.md` — G14 + G17 (capacity planning com buffer 20-30% + alerta de outlier + trend analysis)

**Pendência (F6 do B03) — RESOLVIDA em 2026-07-02:** o anexo em `estrategias-de-deploy-zero-downtime`
(G12 cohort/A-B testing) foi aplicado como parte do B03-B; a skill agora consolida deploy zero-downtime
+ cohort/A-B da B04 G12.

## Procedência das 3 skills novas (F6 — segunda rodada de exaustão)

Absorvidas em 2026-07-01 do lote de quarentena `_lote-2026-06-26` (rodada F6 de exaustão), fundindo IDs diferidos residuais (~28 IDs > 3 skills):

- `depuracao-sistematica` — funde `obra--superpowers` G9 (testing-anti-patterns), G10 (systematic-debugging 4 fases), G11 (root-cause-tracing), G12 (defense-in-depth), G13 (condition-based-waiting).
- `orquestracao-de-comandos-slash` — funde `github/spec-kit` G1 (`/specify`), G3 (`/plan`), G4 (`/tasks`), G6 (`/implement`), G7 (`/constitution`), G9 (`/converge` append-only), G10 (`/taskstoissues`), G12 (plan-template), G13 (tasks-template), G14 (constitution-template), G16 (extension-hooks).
- `debugging-por-council-e-verification-loop` — funde `affaan-m/everything-claude-code` G6 (council / santa-method / verification-loop) — tática interna, NÃO substitui `spec-build-review`.

Detalhe em `C:\Kolden\Caos\registros\absorcao\_lote-2026-06-26\relatorio-de-perda-prometeu.md`. Absorção em PT-BR, sem cópia literal. Herança histórica em cada SKILL.md (Kernighan/Hunt-Thomas/Allspaw/Vogels/Nygard/Dijkstra; GitHub Spec-Kit team/Anthropic Claude Code team/Cognition/Beck-Cunningham/McIlroy; Engelbart/Cockburn/Beck/Ousterhout/Alexander).
