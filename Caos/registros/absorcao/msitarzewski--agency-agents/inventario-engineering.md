# F3 — Inventário de capacidades · `msitarzewski--agency-agents@a597cb6` — divisão `engineering/`

Granularidade: 1 base por agente + técnicas transferíveis salientes (1-2 por agente em média). Total esperado: 33 (bases) + ~30-65 (técnicas) = 65-100 IDs.

| ID | capacidade | tipo | keywords | dominio | fonte(arquivo:linha) |
|---|---|---|---|---|---|
| G1 | engenharia de remediação de dados anômalos por IA local (ar-gapped) com garantia de zero perda | agente | data, slm, ollama, remediation, pii, zero-loss | engineering | engineering-ai-data-remediation-engineer.md:2 |
| G2 | compressão semântica de anomalias (50k linhas → ~12 clusters) por embeddings locais + clustering | tecnica | clustering, embeddings, semantic-compression | engineering | engineering-ai-data-remediation-engineer.md:28 |
| G3 | SLM gera lambda de transformação (não toca dado) + gate de segurança que rejeita imports/exec/eval | tecnica | safety-gate, lambda, sandbox, slm-output | engineering | engineering-ai-data-remediation-engineer.md:62 |
| G4 | reconciliação matemática Source==Success+Quarantine como invariante de pipeline (Sev-1 ao quebrar) | tecnica | reconciliation, invariant, audit | engineering | engineering-ai-data-remediation-engineer.md:170 |
| G5 | engenharia de ML para produção (treino, deploy, monitoração de drift, A/B, MLOps) | agente | ml, mlops, ai, production, llm, rag, vector-db | engineering | engineering-ai-engineer.md:2 |
| G6 | matriz de padrões de integração ML (real-time <100ms, batch, streaming, edge, hybrid) | tecnica | inference-patterns, latency-tier, edge | engineering | engineering-ai-engineer.md:67 |
| G7 | arquitetura de auto-otimização de pipelines de IA com guardrails financeiros/segurança e circuit breaker | agente | llm-as-judge, semantic-routing, finops, dark-launch | engineering | engineering-autonomous-optimization-architect.md:2 |
| G8 | shadow traffic (5% async) para A/B grading de modelos com promoção autônoma quando supera baseline | tecnica | shadow-traffic, ab-grading, auto-promotion | engineering | engineering-autonomous-optimization-architect.md:36 |
| G9 | router multi-provider com circuit breaker por custo/latência e fallback rankeado historicamente | tecnica | circuit-breaker, multi-provider-router, fallback-rank | engineering | engineering-autonomous-optimization-architect.md:42 |
| G10 | arquitetura backend escalável (DDD-ish, microservices vs modular monolith, APIs, segurança, observabilidade) | agente | backend, architecture, microservices, sql, openapi, slo | engineering | engineering-backend-architect.md:2 |
| G11 | governança de contrato de API (OpenAPI/AsyncAPI/protobuf) com versioning, deprecation e contract tests | tecnica | api-contracts, versioning, deprecation | engineering | engineering-backend-architect.md:65 |
| G12 | migração de schema zero-downtime via expand-and-contract com dual-writes e reconciliação | tecnica | expand-contract, zero-downtime-migration, backfill | engineering | engineering-backend-architect.md:71 |
| G13 | desenvolvimento CMS code-first em Drupal e WordPress (temas, módulos, plugins, Gutenberg, blocks) | agente | drupal, wordpress, cms, gutenberg, acf, twig | engineering | engineering-cms-developer.md:2 |
| G14 | code-over-UI: registrar CPTs, fields e blocos em código + config em YAML/wp-config (nunca DB-only) | tecnica | code-first, config-in-code, no-ui-config | engineering | engineering-cms-developer.md:39 |
| G15 | revisão de código construtiva com priorização explícita 🔴 blocker / 🟡 sugestão / 💭 nit | agente | code-review, pr-feedback, mentor, priorization | engineering | engineering-code-reviewer.md:2 |
| G16 | template de comentário "categoria + linha + porquê + sugestão" para reduzir ambiguidade de review | tecnica | review-template, structured-comment | engineering | engineering-code-reviewer.md:60 |
| G17 | onboarding em codebase desconhecido por leitura factual em 3 níveis (1-line / 5-min / deep dive) | agente | onboarding, code-reading, repo-orientation, read-only | engineering | engineering-codebase-onboarding-engineer.md:2 |
| G18 | regra "code before everything" + nunca inferir, sempre citar arquivo/função/rota inspecionada | tecnica | evidence-first, no-inference, file-citation | engineering | engineering-codebase-onboarding-engineer.md:46 |
| G19 | engenharia de dados em lakehouse medallion (Bronze/Silver/Gold) com data contracts e DQ por linha | agente | data, etl, elt, spark, dbt, delta, iceberg, kafka | engineering | engineering-data-engineer.md:2 |
| G20 | invariantes de pipeline: idempotência + schema contract + nulls deliberados + score DQ por linha | tecnica | idempotency, schema-contract, null-handling-explicit | engineering | engineering-data-engineer.md:47 |
| G21 | medallion strict: Bronze append-only imutável; Gold nunca lê Bronze/Silver diretamente | tecnica | medallion-architecture, layer-isolation | engineering | engineering-data-engineer.md:55 |
| G22 | otimização de banco (schema, índices, EXPLAIN, N+1, pooling) — Postgres/MySQL/Supabase/PlanetScale | agente | database, postgres, indexing, query-plan, n+1, supabase | engineering | engineering-database-optimizer.md:2 |
| G23 | regra "todo FK precisa de índice" + index parcial para query pattern + composite para filter+sort | tecnica | foreign-key-index, partial-index, composite-index | engineering | engineering-database-optimizer.md:50 |
| G24 | migração sem lock: ALTER+DEFAULT (PG11+) + CREATE INDEX CONCURRENTLY fora de transação | tecnica | concurrent-index, no-lock-migration | engineering | engineering-database-optimizer.md:121 |
| G25 | automação de infra/CI-CD com IaC (Terraform/CDK), pipelines (GHActions/GitLab) e observabilidade | agente | devops, terraform, kubernetes, ci-cd, prometheus, blue-green | engineering | engineering-devops-automator.md:2 |
| G26 | estratégia de deploy zero-downtime (blue-green, canary, rolling) com health-check + auto-rollback | tecnica | blue-green, canary, rolling, auto-rollback | engineering | engineering-devops-automator.md:26 |
| G27 | desenvolvimento de e-commerce Drupal Commerce (catálogo, payment, checkout, tax, ordem) | agente | drupal-commerce, ecommerce, payment-gateway, sca, pci | engineering | engineering-drupal-shopping-cart.md:2 |
| G28 | dinheiro como commerce_price (decimal+currency) via Calculator/Price, nunca float | tecnica | money-as-value-object, no-float-math | engineering | engineering-drupal-shopping-cart.md:45 |
| G29 | webhook gateway: signature-verified + idempotente + logado; pagamento nunca depende da volta do browser | tecnica | webhook-verification, idempotency, logged-events | engineering | engineering-drupal-shopping-cart.md:49 |
| G30 | engenharia de inteligência de email para agentes (thread reconstruction, dedup, citation grounding) | agente | email, mime, thread-graph, deduplication, llm-context, citations | engineering | engineering-email-intelligence-engineer.md:2 |
| G31 | reconstrução de topologia de thread via In-Reply-To/References + dedup de quoted reply (4-5x redução) | tecnica | thread-topology, quoted-dedup, token-reduction | engineering | engineering-email-intelligence-engineer.md:122 |
| G32 | attribution de action items por sender real da mensagem (não confiar em "I" em thread flattened) | tecnica | participant-binding, action-item-attribution | engineering | engineering-email-intelligence-engineer.md:207 |
| G33 | firmware embarcado bare-metal/RTOS (ESP-IDF, STM32 HAL/LL, Nordic nRF, FreeRTOS, Zephyr) | agente | embedded, firmware, esp32, stm32, freertos, zephyr, ble | engineering | engineering-embedded-firmware-engineer.md:2 |
| G34 | regras-ouro de RTOS: sem malloc em task após init; ISR mínima; FromISR; stack via HighWaterMark | tecnica | rtos-safety, no-dynamic-alloc, isr-discipline | engineering | engineering-embedded-firmware-engineer.md:24 |
| G35 | integração full-stack Feishu/Lark Open Platform (bots, cards, approvals, Bitable, SSO, mini program) | agente | feishu, lark, oauth, bitable, webhooks, sso | engineering | engineering-feishu-integration-developer.md:2 |
| G36 | cache de tenant_access_token com expiração antecipada (5min) para evitar revoga em borda | tecnica | token-cache, expiry-buffer | engineering | engineering-feishu-integration-developer.md:144 |
| G37 | event dispatcher idempotente: validar signature, dedup por event-id, processar async (200 < 3s) | tecnica | event-idempotency, signature-validation | engineering | engineering-feishu-integration-developer.md:78 |
| G38 | otimização estrutural de Filament PHP (tabs, side-by-side, slider sobre radio rows, itemLabel) | agente | filament, laravel, php, admin-ui, structural-redesign | engineering | engineering-filament-optimization-specialist.md:2 |
| G39 | hierarquia de otimização (tabs → grid → slider → collapsible → itemLabel → summary placeholder → nav group) | tecnica | optimization-hierarchy, ux-anti-pattern-replacement | engineering | engineering-filament-optimization-specialist.md:36 |
| G40 | regras anti-noise: 1 layer de guidance, sem icon saturation, preserve obvious defaults | tecnica | signal-over-noise, restraint-rules | engineering | engineering-filament-optimization-specialist.md:50 |
| G41 | desenvolvimento frontend moderno (React/Vue/Angular/Svelte) com performance, a11y e PWA | agente | frontend, react, typescript, lighthouse, wcag, pwa | engineering | engineering-frontend-developer.md:2 |
| G42 | virtualização de lista (TanStack Virtual) com renderItem memoizado e overscan controlado | tecnica | list-virtualization, memo, overscan | engineering | engineering-frontend-developer.md:78 |
| G43 | governança Git e branching (trunk-based vs Git Flow), conventional commits, rebase seguro, worktrees | agente | git, branching, conventional-commits, rebase, worktree | engineering | engineering-git-workflow-master.md:2 |
| G44 | atomic commits + force-with-lease + branch from latest (rebase em target antes de mergear) | tecnica | atomic-commit, force-with-lease, rebase-before-merge | engineering | engineering-git-workflow-master.md:30 |
| G45 | comando de incident response estruturado (SEV1-4, IC/Comms/TechLead/Scribe, post-mortem blameless) | agente | incident, sev1, sre, postmortem, slo, on-call | engineering | engineering-incident-response-commander.md:2 |
| G46 | classificação SEV1-4 com gatilhos de auto-upgrade (impacto dobra, sem RCA em 30min/2h, customer-reported) | tecnica | severity-matrix, auto-escalation-triggers | engineering | engineering-incident-response-commander.md:65 |
| G47 | error budget policy com tiers (>50%, 25-50%, <25%, exhausted) ligados a feature freeze | tecnica | error-budget, slo-policy, feature-freeze-trigger | engineering | engineering-incident-response-commander.md:272 |
| G48 | governança de ITSM (ITIL 4) — service catalog, incident, problem, change, SLA, CMDB, CSI | agente | itil, itsm, cmdb, sla, change-management, problem-management | engineering | engineering-it-service-manager.md:2 |
| G49 | priority matrix urgência × impacto (P1-P4) com response/resolution/cadence/escalation por nível | tecnica | priority-matrix, itil-classification | engineering | engineering-it-service-manager.md:99 |
| G50 | CSI register obrigatório (initiative + baseline + target + owner + result) — "intenção não é melhoria contínua" | tecnica | csi-register, baseline-metric, owned-improvement | engineering | engineering-it-service-manager.md:399 |
| G51 | engenharia de diff mínimo: smallest patch que resolve, recusa scope creep, surface > smuggle | agente | minimal-diff, scope-discipline, no-refactor-on-bugfix | engineering | engineering-minimal-change-engineer.md:2 |
| G52 | scope self-check: walk line by line, "task requires this exact line?", list follow-ups not done | tecnica | scope-self-check, line-by-line-justification | engineering | engineering-minimal-change-engineer.md:116 |
| G53 | desenvolvimento mobile nativo e cross-platform (Swift/SwiftUI, Kotlin/Compose, RN, Flutter) | agente | mobile, swiftui, jetpack-compose, react-native, flutter | engineering | engineering-mobile-app-builder.md:2 |
| G54 | arquitetura offline-first com sync inteligente e platform-specific perf (battery, memory, startup) | tecnica | offline-first, mobile-perf, platform-native | engineering | engineering-mobile-app-builder.md:28 |
| G55 | arquitetura de sistemas multi-agente (topologia, contexto, falha, trust, HITL, observabilidade, evals) | agente | multi-agent, orchestration, hitl, evals, prompt-injection, traceability | engineering | engineering-multi-agent-systems-architect.md:2 |
| G56 | 5 topologias canônicas (sequential, parallel fan-out/in, hierarchical, evaluator-optimizer, mesh) com regras | tecnica | topology-catalog, default-hierarchical | engineering | engineering-multi-agent-systems-architect.md:51 |
| G57 | falha taxonomy (hard/silent/partial/contradiction/cascade/loop/context) com detecção e recovery por tipo | tecnica | failure-taxonomy, recovery-per-type | engineering | engineering-multi-agent-systems-architect.md:232 |
| G58 | HITL gate placement matrix (irreversibility/blast/confidence/novelty/regulatory/policy → gate type) | tecnica | hitl-placement-matrix, escalation-calibration | engineering | engineering-multi-agent-systems-architect.md:328 |
| G59 | engenharia de OrgScript (DSL de processo) — parser, AST, lint, export Mermaid/Markdown/JSON | agente | dsl, orgscript, parser, ast, ebnf, process-modeling | engineering | engineering-orgscript-engineer.md:2 |
| G60 | engenharia de prompts versionada com test suite (happy + edge + adversarial) e changelog | agente | prompt, llm, test-suite, regression, versioning, injection-defense | engineering | engineering-prompt-engineer.md:2 |
| G61 | template de system prompt Role→Constraints→Reasoning→Examples + fallback explícito out-of-scope | tecnica | system-prompt-skeleton, fallback-clause | engineering | engineering-prompt-engineer.md:33 |
| G62 | "se o modelo não fez o que você queria, a spec estava ambígua — reescreva a spec" | tecnica | spec-as-prompt, ambiguity-is-bug | engineering | engineering-prompt-engineer.md:202 |
| G63 | rapid prototyping em <3 dias (Next.js + Clerk + Supabase + shadcn) com analytics e A/B desde dia 1 | agente | prototype, mvp, nextjs, clerk, supabase, shadcn, ab-testing | engineering | engineering-rapid-prototyper.md:2 |
| G64 | hook simples de A/B test baseado em hash de userId persistido em localStorage | tecnica | simple-ab-hook, hash-bucketing | engineering | engineering-rapid-prototyper.md:268 |
| G65 | desenvolvimento full-stack premium (Laravel/Livewire/FluxUI, three.js, animações luxury, glass) | agente | laravel, livewire, fluxui, threejs, premium-ui | engineering | engineering-senior-developer.md:2 |
| G66 | regra "light/dark/system theme toggle obrigatório em todo site" + spec colors | tecnica | mandatory-theme-toggle, premium-standard | engineering | engineering-senior-developer.md:42 |
| G67 | arquitetura de software (DDD bounded contexts, hexagonal/onion/layered, ADRs, evolution strategy) | agente | architecture, ddd, hexagonal, adr, bounded-context | engineering | engineering-software-architect.md:2 |
| G68 | matriz "use when / avoid when" por padrão arquitetural (layered, hex, onion, monolith, microservices, EDA, CQRS) | tecnica | pattern-selection-matrix, anti-astronautics | engineering | engineering-software-architect.md:82 |
| G69 | regras de dependência inward-only: domínio não importa framework/ORM/HTTP; bypass = smell documentado | tecnica | dependency-direction, architectural-smell | engineering | engineering-software-architect.md:94 |
| G70 | engenharia de smart contracts Solidity (EVM, gas, proxy patterns, DeFi, OpenZeppelin, Foundry) | agente | solidity, evm, gas-optimization, uups, defi, foundry, openzeppelin | engineering | engineering-solidity-smart-contract-engineer.md:2 |
| G71 | checks-effects-interactions + pull-over-push + nunca tx.origin + nunca transfer()/send() | tecnica | cei-pattern, security-defaults-solidity | engineering | engineering-solidity-smart-contract-engineer.md:44 |
| G72 | storage packing (uint128+uint128 num slot) + custom errors + calldata em external | tecnica | storage-packing, custom-errors, calldata-readonly | engineering | engineering-solidity-smart-contract-engineer.md:340 |
| G73 | SRE: SLOs/error budgets, observabilidade (3 pilares + golden signals), toil reduction, chaos | agente | sre, slo, error-budget, observability, chaos, toil | engineering | engineering-sre.md:2 |
| G74 | burn-rate alerts multi-window (short 5m/30m × long 1h/6h × factor 14.4x/6x) | tecnica | multi-window-burn-rate, slo-alerting | engineering | engineering-sre.md:43 |
| G75 | escrita técnica para devs (README, API ref, tutorial, conceptual) com docs-as-code e CI gating | agente | technical-writing, docs, openapi, divio, docusaurus | engineering | engineering-technical-writer.md:2 |
| G76 | sistema Divio (tutorial/how-to/reference/explanation) — nunca misturar; voz 2ª pessoa + ativa | tecnica | divio-system, voice-rules | engineering | engineering-technical-writer.md:376 |
| G77 | regra "code examples must run" + version everything + 5-second README test (o quê / por quê / como) | tecnica | runnable-examples, 5-second-test | engineering | engineering-technical-writer.md:41 |
| G78 | engenharia de pipeline de voz/ASR (Whisper/cloud) com diarization, SRT/VTT, e handoff estruturado | agente | speech, whisper, asr, diarization, srt, ffmpeg, pyannote | engineering | engineering-voice-ai-integration-engineer.md:2 |
| G79 | preprocessing ffmpeg canônico (-ar 16000 -ac 1 -af loudnorm EBU R128) antes de qualquer Whisper | tecnica | audio-preproc, 16khz-mono-loudnorm | engineering | engineering-voice-ai-integration-engineer.md:150 |
| G80 | chunking overlap-aware (30min chunk + 30s overlap) com trim na assembly para evitar duplicatas | tecnica | overlap-chunking, assembly-trim | engineering | engineering-voice-ai-integration-engineer.md:181 |
| G81 | desenvolvimento WeChat Mini Program (WXML/WXSS/WXS, WeChat Pay, subscription messages, ecossistema) | agente | wechat, miniprogram, wxml, wechat-pay, subpackage, 小程序 | engineering | engineering-wechat-mini-program-developer.md:2 |
| G82 | disciplina setData (batch + payload mínimo + pure data) para reduzir travessias da bridge JS-native | tecnica | setdata-discipline, bridge-cost | engineering | engineering-wechat-mini-program-developer.md:51 |
| G83 | engenharia de e-commerce WooCommerce (catálogo, gateway, checkout block/clássico, tax, cupons) | agente | woocommerce, wordpress, ecommerce, payment, hpos, block-checkout | engineering | engineering-wordpress-shopping-cart.md:2 |
| G84 | regra-mãe: nunca editar core/parent theme; customizações em child-theme/plugin via add_action/add_filter | tecnica | hooks-over-overrides, update-safe-customization | engineering | engineering-wordpress-shopping-cart.md:44 |
| G85 | exclusão obrigatória de cart/checkout/account de page cache/CDN (verificar no live) | tecnica | dynamic-page-cache-exclusion, stale-cart-prevention | engineering | engineering-wordpress-shopping-cart.md:54 |

**Total: 85 capacidades (G1–G85).**

## Resumo por agente upstream

- `engineering-ai-data-remediation-engineer.md` → G1 (base) + G2, G3, G4 (3 técnicas) — pipeline air-gapped com clustering+lambda+reconciliação
- `engineering-ai-engineer.md` → G5 (base) + G6 (1 técnica) — ML engineer generalista
- `engineering-autonomous-optimization-architect.md` → G7 (base) + G8, G9 (2 técnicas) — auto-routing AI com guardrails
- `engineering-backend-architect.md` → G10 (base) + G11, G12 (2 técnicas) — arquitetura backend com contratos
- `engineering-cms-developer.md` → G13 (base) + G14 (1 técnica) — Drupal+WP code-first
- `engineering-code-reviewer.md` → G15 (base) + G16 (1 técnica) — review mentor com prioridades
- `engineering-codebase-onboarding-engineer.md` → G17 (base) + G18 (1 técnica) — read-only 3-level explanation
- `engineering-data-engineer.md` → G19 (base) + G20, G21 (2 técnicas) — medallion strict
- `engineering-database-optimizer.md` → G22 (base) + G23, G24 (2 técnicas) — PG/MySQL/Supabase
- `engineering-devops-automator.md` → G25 (base) + G26 (1 técnica) — IaC + CI/CD + observabilidade
- `engineering-drupal-shopping-cart.md` → G27 (base) + G28, G29 (2 técnicas) — Drupal Commerce reliability
- `engineering-email-intelligence-engineer.md` → G30 (base) + G31, G32 (2 técnicas) — thread topology + attribution
- `engineering-embedded-firmware-engineer.md` → G33 (base) + G34 (1 técnica) — bare-metal/RTOS
- `engineering-feishu-integration-developer.md` → G35 (base) + G36, G37 (2 técnicas) — Feishu/Lark full-stack
- `engineering-filament-optimization-specialist.md` → G38 (base) + G39, G40 (2 técnicas) — restraint UX Filament
- `engineering-frontend-developer.md` → G41 (base) + G42 (1 técnica) — React/Vue/Angular performance
- `engineering-git-workflow-master.md` → G43 (base) + G44 (1 técnica) — branching + clean history
- `engineering-incident-response-commander.md` → G45 (base) + G46, G47 (2 técnicas) — comando de incidente
- `engineering-it-service-manager.md` → G48 (base) + G49, G50 (2 técnicas) — ITIL 4 ops
- `engineering-minimal-change-engineer.md` → G51 (base) + G52 (1 técnica) — smallest diff discipline
- `engineering-mobile-app-builder.md` → G53 (base) + G54 (1 técnica) — iOS/Android nativo + xplatform
- `engineering-multi-agent-systems-architect.md` → G55 (base) + G56, G57, G58 (3 técnicas) — topologias + falha + HITL
- `engineering-orgscript-engineer.md` → G59 (base) — DSL OrgScript (sem técnica saliente extra)
- `engineering-prompt-engineer.md` → G60 (base) + G61, G62 (2 técnicas) — prompt como contrato versionado
- `engineering-rapid-prototyper.md` → G63 (base) + G64 (1 técnica) — MVP em 3 dias
- `engineering-senior-developer.md` → G65 (base) + G66 (1 técnica) — full-stack premium Laravel
- `engineering-software-architect.md` → G67 (base) + G68, G69 (2 técnicas) — DDD + matriz + dep direction
- `engineering-solidity-smart-contract-engineer.md` → G70 (base) + G71, G72 (2 técnicas) — EVM seguro + gas
- `engineering-sre.md` → G73 (base) + G74 (1 técnica) — SLOs + burn rate
- `engineering-technical-writer.md` → G75 (base) + G76, G77 (2 técnicas) — Divio + docs-as-code
- `engineering-voice-ai-integration-engineer.md` → G78 (base) + G79, G80 (2 técnicas) — Whisper pipeline + overlap
- `engineering-wechat-mini-program-developer.md` → G81 (base) + G82 (1 técnica) — WeChat MP + setData
- `engineering-wordpress-shopping-cart.md` → G83 (base) + G84, G85 (2 técnicas) — WooCommerce update-safe + cache

**Distribuição:** 33 bases + 52 técnicas = 85 IDs. Média ≈ 1,58 técnicas por agente (dentro do alvo 1-2).
