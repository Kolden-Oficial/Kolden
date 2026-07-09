# Matriz de Conformidade — 12 aiox-agents internos × METODO Kolden v1.0 (Sub-onda 3.2)

> **Contrato-mãe:** `m-20260706-metodo-kolden` (Onda 3 · Grupo A · squad-alvo Prometeu · Sub-onda 3.2 = 12 aiox-agents internos + refactor MEMORY canônico + mapeamento cross-camada).
> **Sessão:** dedicada em `C:\Kolden\Prometeu\` (G7 satisfeito — nunca duas sub-ondas na mesma sub-sessão).
> **Executor:** prometeu-chief (Tier-0 · fan-out 0/3 por interdependência cross-arquivo — regra 8x consecutivas confirmada nas Sub-ondas 1.1/1.2/1.4/1.5/1.6 + Onda 2 Hermes + Sub-onda 3.1; a Sub-onda 3.2 é a 9ª confirmação).
> **Fonte-de-verdade da norma:** `C:\Kolden\METODO-KOLDEN.md` v1.0 (§2 12 princípios + §3 5 camadas + §4 Art. X 8 gates + §8 rito 9 passos).
> **Fonte-de-verdade do checklist Dike:** `Caos/checklists/CAOS-CL-002.md` (canônico após Sub-onda 1.6).
> **Template calibrado herdado:** `Prometeu/registros/metodo-onda-3/3.1-identidade-fronteira/matriz-de-conformidade.md` (Sub-onda 3.1, delta +3 pontos, 5/8 hard PASS).
> **Data:** 2026-07-07.

---

## §0 — Escopo da Sub-onda 3.2

**Objetivo canônico:** aplicar Art. X (8 gates canônicos) aos **12 aiox-agents internos do Prometeu** via **APPEND cirúrgico em `.claude/agents/aiox-*.md`** (variantes Claude Code Kolden — camada externa segura), **preservando vendor SynkraAI intocado** em `.aiox-core/development/agents/`.

**Vendor AIOX preservado (regra invariante Sub-onda 3.1 replicada):**
- 12 arquivos canônicos AIOX em `.aiox-core/development/agents/*.md` — **INTOCADOS**.
- 10 MEMORY canônicos AIOX em `.aiox-core/development/agents/<id>/MEMORY.md` — **INTOCADOS**.
- 12 personas AIOX em `.claude/commands/AIOX/agents/*.md` — **INTOCADAS**.
- `.aiox-core/constitution.md` v1.0.0 — **INTOCADA**.

**Camada Kolden a ganhar Art. X (esta Sub-onda 3.2):**
- 10 variantes Claude Code em `.claude/agents/aiox-*.md` — **APPEND** Kolden Art. X.
- 1 CREATE `.claude/agents/aiox-master.md` — variante Claude Code Kolden para o orquestrador AIOX interno Orion (não existe hoje).
- 4 MEMORY.md espúrios em `.claude/agent-memory/aiox-{architect,dev,po,qa}/MEMORY.md` — **REFACTOR** (mover para `_archive-pre-kolden/`).
- 1 UPDATE `Prometeu/agent-memory/prometeu.md` — APPEND seção "Padrões de execução como Camada 5 Kolden por-agente".
- 1 UPDATE `Prometeu/squad.yaml` (ou `Prometeu/CLAUDE.md`) — bloco `mapeamento_cross_camada:` explícito (gate humano Q3).
- 1 UPDATE condicional `C:\Kolden\AGENTS.md` — nota canônica Sub-onda 3.2 concluída (Passo 8 — CONTAGEM 12 CONFIRMADA, sem ajuste numérico).

---

## §1 — Sumário do veredito

| Dimensão | Estado dos 12 aiox-agents | Score |
|---|---|---|
| **Personas AIOX preservadas** | 12/12 canônicos AIOX vendor intocados; 10/12 variantes Claude Code existentes; 1/12 falta variante Claude Code (aiox-master); 1/12 fora de escopo (aiox-squad-creator) | ✅ **VERDE** (12/12 vendor + 10/12 variante) |
| **Art. X G1 constituição por-agent** | 0/12 declaram `constitution:` no frontmatter Kolden; herdam AIOX Art. II Agent Authority via hook | ❌ **AUSENTE canônico Kolden** — APPEND resolverá |
| **Art. X G2 ASL declarado** | 0/12 declaram `ASL:` no frontmatter Kolden | ❌ **AUSENTE canônico Kolden** — APPEND resolverá (mapa ASL abaixo) |
| **Art. X G3 uncertainty + aspiration** | 0/12 declaram `uncertainty_statement` ou `aspiration_criteria` no frontmatter Kolden | ❌ **AUSENTE canônico Kolden** — herdam `Prometeu/prd-de-ia.md` via APPEND |
| **Art. X G4 off-switch** | 9/12 têm hook `enforce-git-push-authority.cjs` (aiox-devops é dono da autoridade, aiox-master + aiox-squad-creator sem variante Claude Code — não têm hook); 0/12 têm reflexo genérico `interrupt-before-mutation.sh` declarado por-agente | ⚠️ **PARCIAL** — herdam `Prometeu/.claude/reflexos/interrupt-before-mutation.sh` via APPEND |
| **Art. X G5 interpretabilidade** | 0/12 declaram plano de introspecção próprio; Story Change Log + MEMORY canônico AIOX são auditoria implícita | ⚠️ **WARN legítimo** (divergência METODO herdada — emenda pendente Onda 6) |
| **Art. X G6 orthogonality + instrumental** | 0/12 declaram tabela auditoria capacidades × risco | ❌ **AUSENTE** — herdam do `Prometeu/constitution.md` VO-8 via APPEND + teste AB-3 |
| **Art. X G7 grounding** | 0/12 declaram `grounding_required` por-agente; grounding IMPLÍCITO via §2 Carregamento de Contexto (Git Status + Gotchas + Config + AIOX KB) | ⚠️ **PARCIAL** — grounding real-time via §2 |
| **Art. X G8 predictions scorecard** | N/A — aiox-agents são executores, não fazem previsões datáveis; `predictions_scorecard: false` herdado do `Prometeu/prd-de-ia.md` | ✅ **N/A legítimo** |
| **`<!-- ritual-de-encerramento -->` bloco** | 10/10 variantes Claude Code TÊM (reflexo Kolden já anexou); 12/12 canônicos AIOX TÊM (Ritual absorção Kolden) | ✅ **VERDE** |
| **MEMORY canônico AIOX** | 10/10 canônicos existentes em path canônico `.aiox-core/development/agents/<id>/MEMORY.md`; 2/12 sem MEMORY (aiox-master + squad-creator — aceitável para orquestrador tier-0 AIOX interno + criador-de-squad interno); 4/12 com duplicações espúrias em path NÃO-canônico `.claude/agent-memory/aiox-*/MEMORY.md` | ⚠️ **PARCIAL** — 4 espúrios precisam de refactor |
| **Handoff cross-camada AIOX×Kolden** | Declarado implicitamente em `Prometeu/squad.yaml` §tier_1 + `Prometeu/CLAUDE.md` §6; falta bloco explícito `mapeamento_cross_camada:` YAML | ⚠️ **PARCIAL** — bloco novo em squad.yaml resolverá |

**Interpretação:** os 12 aiox-agents internos do Prometeu operam **PERFEITAMENTE** dentro do vendor AIOX (Story-Driven Development + Agent Authority + Quality First + gates AIOX), mas **NÃO DECLARAM** os 8 gates Art. X do METODO Kolden. A camada externa Kolden (`.claude/agents/aiox-*.md`) é o local certo para APPEND cirúrgico (persona AIOX preservada + gates Art. X declarados no rodapé) — coerente com padrão Sub-onda 3.1 (INVÓLUCRO sobre MUTAÇÃO).

**Volume de diff proposto Sub-onda 3.2:** 10 UPDATE cirúrgico em `.claude/agents/aiox-*.md` + 1 CREATE `.claude/agents/aiox-master.md` + 4 MOVE (refactor MEMORY espúrio) + 1 UPDATE `Prometeu/agent-memory/prometeu.md` + 1 UPDATE `Prometeu/squad.yaml` (bloco cross-camada) + 1 UPDATE condicional `C:\Kolden\AGENTS.md`. **Total: 18 mudanças** (10 UPDATE aiox-*.md + 1 CREATE aiox-master.md + 4 MOVE MEMORY + 2 UPDATE Kolden raiz + 1 condicional). Detalhes em `diff-cirurgico.md`.

---

## §2 — Matriz por-agente contra Art. X (8 gates canônicos)

Legenda: **✅ VERDE** = presente e alinhado · **⚠️ PARCIAL** = presente mas divergente · **❌ AUSENTE** = falta · **📌 N/A** = não aplicável · **🔧 APPEND** = corrigível via APPEND cirúrgico

### §2.1 — aiox-dev (Dex — Builder)

| Gate | Estado | Evidência | Ação Sub-onda 3.2 |
|---|---|---|---|
| G1 constituição | ⚠️ PARCIAL | `.claude/agents/aiox-dev.md` L15 `permissionMode: bypassPermissions` + herança AIOX Art. II via hook L17-22; sem `constitution:` frontmatter | 🔧 APPEND `constitution: Prometeu/constitution.md` |
| G2 ASL | ❌ AUSENTE | Sem `ASL:` frontmatter | 🔧 APPEND `ASL: 3` — dev opera write real em `packages/`, `docs/stories/`, tests + git add/commit (não push) |
| G3 uncertainty + aspiration | ❌ AUSENTE | Sem `uncertainty_statement` / `aspiration_criteria` | 🔧 APPEND herança `Prometeu/prd-de-ia.md` + aspiration próprio (`AC-DEV-1`: quality gates verdes 100% antes Ready for Review; `AC-DEV-2`: IDS REUSE > ADAPT > CREATE em cada arquivo tocado) |
| G4 off-switch | ⚠️ PARCIAL | Hook `enforce-git-push-authority.cjs` ativo L18-22; sem reflexo genérico `interrupt-before-mutation.sh` | 🔧 APPEND referência a `Prometeu/.claude/reflexos/interrupt-before-mutation.sh` para mutations irreversíveis não-git-push (npm publish, gh workflow run, etc.) |
| G5 interpretability | ⚠️ WARN | Story File List + Change Log + `.aiox-core/development/agents/dev/MEMORY.md` (canônico AIOX) | 🔧 APPEND plano mínimo explícito (WARN legítimo — divergência METODO herdada) |
| G6 orthogonality | ❌ AUSENTE | Sem tabela capacidades × risco | 🔧 APPEND herança VO-8 `Prometeu/constitution.md` + teste AB-3 no `Prometeu/roteiro-de-teste.md` |
| G7 grounding | ⚠️ PARCIAL | Grounding IMPLÍCITO via §2 Carregamento de Contexto L42-49 (Git Status + Gotchas + tech-preferences + core-config) | 🔧 APPEND explicit `grounding_required: true` para skills que retornam fato datável |
| G8 predictions | ✅ N/A | Executor de story, não previsão datável | 🔧 APPEND `predictions_scorecard: false` explícito |

**Score dev pós-APPEND:** 8/8 (com G5 WARN legítimo herdado + G7 PARCIAL implícito).

### §2.2 — aiox-qa (Quinn — Guardian)

| Gate | Estado | Evidência | Ação Sub-onda 3.2 |
|---|---|---|---|
| G1 constituição | ⚠️ PARCIAL | `.claude/agents/aiox-qa.md` L15 `permissionMode: bypassPermissions` + hook L18-22 | 🔧 APPEND `constitution: Prometeu/constitution.md` |
| G2 ASL | ❌ AUSENTE | Sem `ASL:` | 🔧 APPEND `ASL: 2` — qa só edita seção QA Results de story (write local restrito), não faz push |
| G3 uncertainty + aspiration | ❌ AUSENTE | Sem campos | 🔧 APPEND herança + aspiration próprio (`AC-QA-1`: veredito PASS/CONCERNS/FAIL/WAIVED evidence-based com AC traceability; `AC-QA-2`: CodeRabbit self-healing max 3 iterações) |
| G4 off-switch | ⚠️ PARCIAL | Hook enforce-git-push-authority.cjs ativo | 🔧 APPEND referência |
| G5 interpretability | ⚠️ WARN | `docs/qa/gates/{story-slug}.yml` + `docs/qa/coderabbit-reports/` são auditoria de raciocínio | 🔧 APPEND plano mínimo |
| G6 orthogonality | ❌ AUSENTE | — | 🔧 APPEND |
| G7 grounding | ⚠️ PARCIAL | Grounding via §2 + `qa-security-checklist.md` + `qa-evidence-requirements.md` | 🔧 APPEND explicit |
| G8 predictions | ✅ N/A | Executor de gate, não previsão | 🔧 APPEND `predictions_scorecard: false` |

### §2.3 — aiox-architect (Aria — Visionary)

| Gate | Estado | Evidência | Ação Sub-onda 3.2 |
|---|---|---|---|
| G1 constituição | ⚠️ PARCIAL | Hook L18-22; sem `constitution:` | 🔧 APPEND |
| G2 ASL | ❌ AUSENTE | Sem `ASL:` | 🔧 APPEND `ASL: 2` — architect só ANALISA e RECOMENDA (L86 "NUNCA implemente código"), sem mutation irreversível |
| G3 uncertainty + aspiration | ❌ AUSENTE | — | 🔧 APPEND herança + aspiration próprio (`AC-ARCH-1`: análise de trade-off obrigatória por decisão arquitetural; `AC-ARCH-2`: backward compatibility flag em cada spec) |
| G4 off-switch | ⚠️ PARCIAL | Hook ativo | 🔧 APPEND |
| G5 interpretability | ⚠️ WARN | `.aiox-core/development/agents/architect/MEMORY.md` (canônico) tem Architecture Patterns to Track | 🔧 APPEND |
| G6 orthogonality | ❌ AUSENTE | — | 🔧 APPEND |
| G7 grounding | ⚠️ PARCIAL | `WebSearch + WebFetch` tools L14-15 = grounding para pesquisa em tempo real | 🔧 APPEND |
| G8 predictions | ✅ N/A | Executor de análise | 🔧 APPEND `predictions_scorecard: false` |

### §2.4 — aiox-pm (Bob — Strategist)

| Gate | Estado | Evidência | Ação Sub-onda 3.2 |
|---|---|---|---|
| G1 constituição | ⚠️ PARCIAL | Hook L18-22 | 🔧 APPEND |
| G2 ASL | ❌ AUSENTE | — | 🔧 APPEND `ASL: 2` — pm cria PRD/epic/story (write local em docs/) |
| G3 uncertainty + aspiration | ❌ AUSENTE | — | 🔧 APPEND herança + aspiration (`AC-PM-1`: recomendações fundamentadas em dados/evidências L82; `AC-PM-2`: avaliação de risco em cada recomendação estratégica L83) |
| G4 off-switch | ⚠️ PARCIAL | Hook | 🔧 APPEND |
| G5 interpretability | ⚠️ WARN | — | 🔧 APPEND |
| G6 orthogonality | ❌ AUSENTE | — | 🔧 APPEND |
| G7 grounding | ⚠️ PARCIAL | — | 🔧 APPEND |
| G8 predictions | ✅ N/A | Executor de spec | 🔧 APPEND `predictions_scorecard: false` |

### §2.5 — aiox-po (Pax — Balancer)

| Gate | Estado | Evidência | Ação Sub-onda 3.2 |
|---|---|---|---|
| G1 constituição | ⚠️ PARCIAL | Hook L18-22 | 🔧 APPEND |
| G2 ASL | ❌ AUSENTE | — | 🔧 APPEND `ASL: 2` — po valida story (write restrito ao Status + QA Results + Change Log) |
| G3 uncertainty + aspiration | ❌ AUSENTE | — | 🔧 APPEND herança + aspiration (`AC-PO-1`: checklist 10 pontos aplicado literalmente (não resumido) L74; `AC-PO-2`: transição Draft→Ready registrada no Change Log — violação = processo quebrado) |
| G4 off-switch | ⚠️ PARCIAL | Hook | 🔧 APPEND |
| G5 interpretability | ⚠️ WARN | Change Log de story = trace auditável | 🔧 APPEND |
| G6 orthogonality | ❌ AUSENTE | — | 🔧 APPEND |
| G7 grounding | ⚠️ PARCIAL | — | 🔧 APPEND |
| G8 predictions | ✅ N/A | Validador | 🔧 APPEND `predictions_scorecard: false` |

### §2.6 — aiox-sm (River — Facilitator)

| Gate | Estado | Evidência | Ação Sub-onda 3.2 |
|---|---|---|---|
| G1 constituição | ⚠️ PARCIAL | Hook L18-22 | 🔧 APPEND |
| G2 ASL | ❌ AUSENTE | — | 🔧 APPEND `ASL: 2` — sm cria story em Draft (write em docs/stories/) |
| G3 uncertainty + aspiration | ❌ AUSENTE | Model `sonnet` (não opus como os outros — divergência de custo/velocidade) | 🔧 APPEND herança + aspiration (`AC-SM-1`: preservar redação exata dos AC do epic L79; `AC-SM-2`: story-draft-checklist aplicado antes de marcar como completo) |
| G4 off-switch | ⚠️ PARCIAL | Hook | 🔧 APPEND |
| G5 interpretability | ⚠️ WARN | — | 🔧 APPEND |
| G6 orthogonality | ❌ AUSENTE | — | 🔧 APPEND |
| G7 grounding | ⚠️ PARCIAL | `accumulated-context.md` L78 = grounding cross-story | 🔧 APPEND |
| G8 predictions | ✅ N/A | Criador de story | 🔧 APPEND `predictions_scorecard: false` |

### §2.7 — aiox-devops (Gage)

| Gate | Estado | Evidência | Ação Sub-onda 3.2 |
|---|---|---|---|
| G1 constituição | ⚠️ PARCIAL | Sem hook enforce-git-push-authority.cjs L16-21 (é o DONO da autoridade — hook não se aplica) | 🔧 APPEND |
| G2 ASL | ❌ AUSENTE | — | 🔧 APPEND `ASL: 3` — devops opera git push (canal externo GitHub, irreversível uma vez pushado a `main`) + PR + release + MCP setup |
| G3 uncertainty + aspiration | ❌ AUSENTE | — | 🔧 APPEND herança + aspiration (`AC-DEVOPS-1`: pre-push quality gates verdes 100%; `AC-DEVOPS-2`: NUNCA `--no-verify` L91; `AC-DEVOPS-3`: stage seletivo por categoria — nunca `git add -A` L80) |
| G4 off-switch | ❌ AUSENTE (crítico) | É dono da autoridade — não pode ser bloqueado por hook próprio; precisa reflexo genérico `interrupt-before-mutation.sh` para push -f + release + PR create | 🔧 APPEND referência ao reflexo Kolden + declaração explícita HITL antes de push -f/release |
| G5 interpretability | ⚠️ WARN | git log + PR body são auditoria | 🔧 APPEND |
| G6 orthogonality | ❌ AUSENTE | — | 🔧 APPEND |
| G7 grounding | ⚠️ PARCIAL | Repos.yaml L44 = grounding para operação multi-repo | 🔧 APPEND |
| G8 predictions | ✅ N/A | Executor de push | 🔧 APPEND `predictions_scorecard: false` |

**ATENÇÃO devops:** ASL-3 mais grave que os outros — HITL obrigatório antes de `git push -f`, `gh release create`, MCP setup no host.

### §2.8 — aiox-analyst (Atlas)

| Gate | Estado | Evidência | Ação Sub-onda 3.2 |
|---|---|---|---|
| G1 constituição | ⚠️ PARCIAL | Hook L18-22 | 🔧 APPEND |
| G2 ASL | ❌ AUSENTE | — | 🔧 APPEND `ASL: 2` — analyst faz pesquisa (WebSearch + WebFetch) e escreve reports (write local) |
| G3 uncertainty + aspiration | ❌ AUSENTE | — | 🔧 APPEND herança + aspiration (`AC-ANALYST-1`: análise fundamentada em dados L93; `AC-ANALYST-2`: revelar incertezas e níveis de confiança L93 — perfeito alinhamento com Russell 2019) |
| G4 off-switch | ⚠️ PARCIAL | Hook | 🔧 APPEND |
| G5 interpretability | ⚠️ WARN | Reports datados + WebSearch trace | 🔧 APPEND |
| G6 orthogonality | ❌ AUSENTE | — | 🔧 APPEND |
| G7 grounding | ✅ **VERDE parcial** | `WebSearch + WebFetch` L14-15 + protocolo §4 "cite as fontes na saída" L83 = grounding forte | 🔧 APPEND explicit |
| G8 predictions | ⚠️ CONDICIONAL | Analyst faz "market-research", "competitor-analysis", "shock-report" — potencialmente com predições datáveis; mas atualmente sem scorecard | 🔧 APPEND `predictions_scorecard: false` (padrão); revisitar em Onda 26 se analyst começar a fazer predições Kolden datáveis |

### §2.9 — aiox-data-engineer (Dara)

| Gate | Estado | Evidência | Ação Sub-onda 3.2 |
|---|---|---|---|
| G1 constituição | ⚠️ PARCIAL | Hook L18-22 | 🔧 APPEND |
| G2 ASL | ❌ AUSENTE | — | 🔧 APPEND `ASL: 3` — data-engineer aplica migration real (`db-apply-migration.md`), CREATE/ALTER/DROP em Supabase (canal externo — irreversível), RLS policies |
| G3 uncertainty + aspiration | ❌ AUSENTE | — | 🔧 APPEND herança + aspiration (`AC-DATA-1`: dry-run antes de aplicar migrations L104; `AC-DATA-2`: plano de rollback para cada migration L96) |
| G4 off-switch | ⚠️ PARCIAL | Hook enforce-git-push-authority.cjs (mas não cobre `db-apply-migration.md` em produção) | 🔧 APPEND referência ao reflexo Kolden para mutation DDL production |
| G5 interpretability | ⚠️ WARN | Migration logs + rollback scripts | 🔧 APPEND |
| G6 orthogonality | ❌ AUSENTE | Regra §4 "NUNCA execute CREATE/ALTER/DROP sem documentar" = controle de escopo implícito | 🔧 APPEND |
| G7 grounding | ⚠️ PARCIAL | `.aiox-core/data/database-best-practices.md` + `.aiox-core/data/supabase-patterns.md` + `supabase/docs/SCHEMA.md` = grounding forte | 🔧 APPEND |
| G8 predictions | ✅ N/A | Executor DDL | 🔧 APPEND `predictions_scorecard: false` |

**ATENÇÃO data-engineer:** ASL-3 igual devops — HITL obrigatório antes de migration production.

### §2.10 — aiox-ux (Uma)

| Gate | Estado | Evidência | Ação Sub-onda 3.2 |
|---|---|---|---|
| G1 constituição | ⚠️ PARCIAL | Hook L18-22 | 🔧 APPEND |
| G2 ASL | ❌ AUSENTE | — | 🔧 APPEND `ASL: 2` — ux cria componentes (write local em app/components/) |
| G3 uncertainty + aspiration | ❌ AUSENTE | — | 🔧 APPEND herança + aspiration (`AC-UX-1`: NUNCA inventar ícones — sempre verificar icon-map.ts L112; `AC-UX-2`: WCAG a11y checklist antes de marcar componente como completo L114) |
| G4 off-switch | ⚠️ PARCIAL | Hook | 🔧 APPEND |
| G5 interpretability | ⚠️ WARN | — | 🔧 APPEND |
| G6 orthogonality | ❌ AUSENTE | — | 🔧 APPEND |
| G7 grounding | ⚠️ PARCIAL | `.aiox-core/product/data/design-opinions.md` + design system | 🔧 APPEND |
| G8 predictions | ✅ N/A | Designer | 🔧 APPEND `predictions_scorecard: false` |

### §2.11 — aiox-master (Orion — Orchestrator) — SEM VARIANTE CLAUDE CODE

| Gate | Estado | Evidência | Ação Sub-onda 3.2 |
|---|---|---|---|
| G1 constituição | ❌ AUSENTE (Kolden) | `.aiox-core/development/agents/aiox-master.md` L65-75 declara agent.customization ("AUTORIZAÇÃO... SEGURANÇA... MEMÓRIA... AUDITORIA") — próximo mas não Art. X | 🔧 CREATE `.claude/agents/aiox-master.md` + APPEND `constitution: Prometeu/constitution.md` |
| G2 ASL | ❌ AUSENTE | Sem `ASL:` | 🔧 CREATE + APPEND `ASL: 3` — orquestrador AIOX interno com autoridade de meta-operação (Constituição AIOX Art. II execução direta permitida com `--force-execute`) |
| G3 uncertainty + aspiration | ❌ AUSENTE | — | 🔧 CREATE + APPEND herança + aspiration (`AC-MASTER-1`: delegação preferida sobre execução direta — apenas governança do framework justifica execução direta; `AC-MASTER-2`: `--force-execute` requerido explícito para debugging do framework) |
| G4 off-switch | ❌ AUSENTE | Sem variante Claude Code, sem hook aplicado | 🔧 CREATE + APPEND hook `enforce-git-push-authority.cjs` + referência ao reflexo Kolden |
| G5 interpretability | ⚠️ WARN | Sem MEMORY canônico AIOX próprio (aiox-master.md sem `MEMORY.md` — decisão vendor AIOX) | 🔧 CREATE + APPEND plano mínimo (usar `.aiox/handoffs/` como trace) |
| G6 orthogonality | ❌ AUSENTE | — | 🔧 CREATE + APPEND |
| G7 grounding | ⚠️ PARCIAL | Grounding via activation-instructions L26-52 (Git Status + `.aiox/handoffs/` + `.aiox-core/data/workflow-chains.yaml`) | 🔧 CREATE + APPEND |
| G8 predictions | ✅ N/A | Orquestrador de meta-operação | 🔧 CREATE + APPEND `predictions_scorecard: false` |

**ATENÇÃO aiox-master:** ASL-3 pela capacidade de execução direta (`--force-execute`) + modificação de framework de agentes/tasks/workflows (canal externo se pushed).

### §2.12 — aiox-squad-creator (Craft) — FORA DE ESCOPO DIRETO

| Gate | Estado | Evidência | Decisão Sub-onda 3.2 |
|---|---|---|---|
| Todos | 📌 **FORA DE ESCOPO** | `.aiox-core/development/agents/squad-creator.md` é agente AIOX interno que cria squads AIOX — Prometeu **não cria squad** (quem cria é Caos via Ritual de 9 fases) | **NÃO CREATE** variante Claude Code Kolden. Deixar canônico AIOX preservado + registrar decisão em INFO/divergência. Sub-onda 3.3 pode revisitar se aparecer caso de uso cross-squad Kolden |

**Justificativa:** Kolden factory = Caos (nasce agents via Ritual dos 14 modelos). AIOX squad-creator = utilitário AIOX interno para criar expansion-squads AIOX vendor. **Não intersectam**. Preservar `squad-creator.md` canônico AIOX intocado é coerente com regra invariante Sub-onda 3.1.

---

## §3 — Investigação dos 4 MEMORY.md espúrios (path NÃO-canônico)

**Path não-canônico investigado:** `.claude/agent-memory/aiox-{architect,dev,po,qa}/MEMORY.md`

**Comparação verbatim com canônico AIOX (`.aiox-core/development/agents/<id>/MEMORY.md`):**

| Elemento | `.claude/agent-memory/aiox-*/` (espúrio) | `.aiox-core/development/agents/*/` (canônico) |
|---|---|---|
| **Idioma** | 🇺🇸 EN puro | 🇧🇷 PT-BR (idioma Kolden) |
| **Estrutura Ritual Kolden** (`## Padrões Ativos` / `## Candidatos a Promoção` / `## Arquivados`) | ❌ Ausente | ✅ Presente |
| **Datas mais recentes** | 2026-02-06 a 2026-02-10 (~5 meses velho) | 2026-02-22 (dev) até 2026-06-29 (po — pós absorção Kolden) |
| **Conteúdo** | Snapshots técnicos específicos: EPIC-ACT Wave 1/2 review (dev), IDS-5a/IDS-7 validation (po), IDS module patterns (qa), UnifiedActivationPipeline (architect) | Padrões genéricos + regras de delegação + estrutura projeto + gotchas comuns + princípios absorvidos B04/B09 (po) |
| **Rule de import** | ❌ Nenhuma referência em `.claude/rules/agent-memory-imports.md` | ✅ 6 arquivos IMPORTADOS explicitamente via `@import` (dev/qa/architect/devops/pm/po) |
| **Auto-aprendizado (skill `ritual-de-encerramento`)** | ❌ Nunca escreve aqui | ✅ Path canônico da skill |

**Veredito recomendado (Q2 do gate humano):**

**Opção A — DELETE** (limpeza total): elimina duplicação, mas perde histórico técnico de sprints AIOX passados que podem ter valor arqueológico.

**Opção B — ARQUIVAR (RECOMENDADA):** mover para `.claude/agent-memory/_archive-pre-kolden/aiox-{architect,dev,po,qa}/MEMORY.md` preservando rastro forense + adicionar `_archive-pre-kolden/README.md` declarando "snapshots pré-absorção Kolden 2026-02, EN puro, sem estrutura Ritual Kolden — canônico vive em `.aiox-core/development/agents/<id>/MEMORY.md`". Padrão de arquivamento canônico Kolden herdado da Onda 2 do Hermes (`Hermes/agent-memory/backups/`). Zero perda + rastreabilidade explícita.

**Opção C — MERGE cirúrgico:** consolidar gems técnicas do EN nos MEMORY canônicos AIOX. Preserva conhecimento útil mas exige leitura+decisão sobre o que migrar (custo cognitivo alto — decisão por-item). Não recomendado nesta Sub-onda 3.2 (custo cognitivo alto sem valor claro — o conteúdo é sobre EPIC-ACT/IDS-5a/IDS-7 já concluídos).

**Recomendação: Opção B (ARQUIVAR)** — segurança operacional (zero perda) + clareza (canônico permanece source-of-truth) + rastreabilidade (padrão Kolden replicado).

---

## §4 — Mapeamento cross-camada AIOX×Kolden (Q3 do gate humano)

**Cadeia canônica Kolden (METODO §3):**
```
1. Humano (Ronan) → 2. Hermes (Camada 2) → 3. Zeus (Camada 3 — CEO/Olimpo)
                                              ↓
4. Hefesto (Camada 4 — CTO Executivo Olimpo)
                                              ↓
5. Prometeu (Camada 5 — Operacional Engenharia)
                                              ↓
        [aiox-agent interno: @dev/@qa/@architect/@pm/@po/@sm/@devops/@analyst/@data-engineer/@ux/@aiox-master]
```

**Cadeia canônica AIOX interna (`.aiox-core/constitution.md` Art. II + `.claude/rules/agent-authority.md`):**
```
@aiox-master (Orion — governança framework)
                                              ↓
@pm (Bob — PRD/epic) → @sm (River — story) → @po (Pax — validate) → @dev (Dex — implement) → @qa (Quinn — gate) → @devops (Gage — push)
                                              +
@architect (Aria) / @data-engineer (Dara) / @analyst (Atlas) / @ux (Uma) — specialists cross-cutting
```

**Mapeamento explícito (bloco proposto para squad.yaml `mapeamento_cross_camada:`):**

```yaml
mapeamento_cross_camada:
  descricao: "Fronteira canônica entre 5 camadas Kolden (METODO §3) e sub-camada aiox-agent interno AIOX vendor"
  entrada_externa_kolden:
    - de: "Humano (Ronan)"
      canal: "@Prometeu"
      via: "sessao raiz Claude Code em C:\\Kolden\\"
      ativa: "prometeu-chief (tier-0 externo Kolden)"
    - de: "Hermes (Camada 2)"
      canal: "@Prometeu"
      via: "dispatch cross-squad Kolden"
      ativa: "prometeu-chief"
    - de: "Zeus (Camada 3 CEO)"
      canal: "Contrato de Missao (Olimpo/contratos/missoes/*.yaml)"
      via: "arquivo YAML lacrado sha256"
      ativa: "prometeu-chief"
    - de: "Hefesto (Camada 4 CTO)"
      canal: "especificacao tecnica"
      via: "Contrato de Missao com detalhamento tecnico Hefesto"
      ativa: "prometeu-chief"

  roteamento_interno_aiox:
    executor: "prometeu-chief (dentro da sessao dedicada Prometeu)"
    regra_ativacao: |
      prometeu-chief diagnostica intencao e roteia para aiox-agent AIOX interno via convencao AIOX @{id}:
      - feature/bug + story existe → @dev (Dex)
      - feature/bug + sem story → @sm (River) primeiro
      - refactor/architecture → @architect (Aria)
      - schema/DB/migration → @data-engineer (Dara)
      - teste/QA → @qa (Quinn)
      - PRD/product → @pm (Bob) ou @po (Pax)
      - deploy/push/release → @devops (Gage) — autoridade exclusiva
      - pesquisa/analise → @analyst (Atlas)
      - UX/UI → @ux-design-expert (Uma)
      - cross-disciplinar → @aiox-master (Orion) orchestrator interno
    referencia_persona_aiox: ".claude/commands/AIOX/agents/{id}.md"
    referencia_variante_claude_code: ".claude/agents/aiox-{id}.md (10 existentes + aiox-master CREATE Sub-onda 3.2)"
    referencia_canonico_aiox_vendor: ".aiox-core/development/agents/{id}.md (12 preservados intocados)"

  saida_externa_kolden:
    - para: "Hefesto (Camada 4)"
      canal: "Entrega tecnica"
      via: "PR + release note + Contrato-de-Missao entregue"
      trigger: "aiox-devops (Gage) faz git push"
    - para: "Dike (verificador na subida)"
      canal: "Verificacao independente"
      via: "CAOS-CL-002 checklist"
      trigger: "APOS entrega Prometeu, antes de Hermes devolver ao Ronan"
    - para: "Outros 25 squads Kolden"
      canal: "6 skills publicas cross-squad"
      via: "invocacao /spec-build-review, /mcp-builder, /orquestracao-de-comandos-slash, /checklist-runner, /tech-search, /briefing-padrao"
      trigger: "qualquer squad Kolden que precise de servico Prometeu como tool funcional"

  fronteira_autoridade:
    kolden_art_x_prevalece:
      condicao: "conflito entre Constitution AIOX (engenharia-focada) e Kolden Art. X (agent-safety-focada)"
      regra: "Kolden Art. X prevalece por ser norma canonica externa da Kolden"
      procedencia: "Prometeu/constitution.md §Regra de precedencia + Sub-onda 3.1"
    aiox_constitution_interna:
      condicao: "escopo de engenharia (CLI First, Story-Driven, No Invention, Quality First)"
      regra: "AIOX Constitution v1.0.0 aplicada dentro do framework"
      procedencia: ".aiox-core/constitution.md v1.0.0 preservada intocada"
```

**Opção Q3.A (RECOMENDADA):** appendar bloco `mapeamento_cross_camada:` em `Prometeu/squad.yaml` (SSoT YAML — padrão validado Kolden `feedback_ssot_yaml_projecoes_readonly`).

**Opção Q3.B:** appendar seção em `Prometeu/CLAUDE.md` §7 (mais legível para humanos, mas duplica informação — YAML fica sem SSoT).

---

## §5 — Handoff para o diff cirúrgico

Base para `diff-cirurgico.md` (próximo artefato):

**UPDATE cirúrgico em `.claude/agents/aiox-*.md` (10 variantes) — APPEND Kolden Art. X:**

Cada arquivo ganha bloco novo `<!-- kolden-art-x-inicio -->` ... `<!-- kolden-art-x-fim -->` inserido ANTES do bloco `<!-- ritual-de-encerramento -->` existente. Persona AIOX vendor preservada intocada.

**CREATE `.claude/agents/aiox-master.md` (nova variante Claude Code) + APPEND Art. X**

Bloco novo Claude Code Kolden com frontmatter YAML padrão (name/description/model/tools/permissionMode/memory/hooks/skills/color) + APPEND Kolden Art. X + `<!-- ritual-de-encerramento -->`.

**REFACTOR MEMORY.md espúrios (4 arquivos):**

Mover:
- `.claude/agent-memory/aiox-architect/MEMORY.md` → `.claude/agent-memory/_archive-pre-kolden/aiox-architect/MEMORY.md`
- `.claude/agent-memory/aiox-dev/MEMORY.md` → `.claude/agent-memory/_archive-pre-kolden/aiox-dev/MEMORY.md`
- `.claude/agent-memory/aiox-po/MEMORY.md` → `.claude/agent-memory/_archive-pre-kolden/aiox-po/MEMORY.md`
- `.claude/agent-memory/aiox-qa/MEMORY.md` → `.claude/agent-memory/_archive-pre-kolden/aiox-qa/MEMORY.md`

CREATE `.claude/agent-memory/_archive-pre-kolden/README.md` declarando propósito do arquivamento.

**UPDATE `Prometeu/agent-memory/prometeu.md` — APPEND seção "Padrões de execução como Camada 5 Kolden por-agente":**

Seção nova com 12 sub-blocos (1 por aiox-agent) declarando padrão técnico de execução como Camada 5 Kolden — sem duplicar MEMORY canônico AIOX.

**UPDATE `Prometeu/squad.yaml` — APPEND bloco `mapeamento_cross_camada:` (condicional Q3.A):**

Bloco completo conforme §4 acima.

**UPDATE condicional `C:\Kolden\AGENTS.md`:**

Contagem confirmada em 12 aiox-agents — **NENHUM ajuste numérico**. Apenas APPEND nota canônica: "Sub-onda 3.2 do METODO Kolden 2026-07-07: 12 aiox-agents internos padronizados via APPEND cirúrgico em `.claude/agents/aiox-*.md` + refactor de 4 MEMORY espúrios + mapeamento cross-camada AIOX×Kolden declarado em `Prometeu/squad.yaml` — vendor SynkraAI preservado intocado. Detalhes em `Prometeu/registros/metodo-onda-3/3.2-agents-internos/`."

**Total mudanças Sub-onda 3.2:** 10 UPDATE + 1 CREATE + 4 MOVE + 1 CREATE (README arquivo) + 1 UPDATE (agent-memory/prometeu.md) + 1 UPDATE (squad.yaml) + 1 UPDATE condicional (AGENTS.md raiz) = **18 mudanças** (17 canônicas + 1 condicional).

**Fora do escopo declarado:**
- **Vendor AIOX intocado (~450 arquivos):** `.aiox-core/core/**`, `.aiox-core/development/tasks/**`, `.aiox-core/development/templates/**`, `.aiox-core/development/checklists/**`, `.aiox-core/development/workflows/**`, `.aiox-core/infrastructure/**`, `.aiox-core/development/agents/*.md` (12 canônicos), `.aiox-core/development/agents/<id>/MEMORY.md` (10 canônicos), `.aiox-core/constitution.md`, `bin/aiox.js`, `bin/aiox-init.js`, `packages/`, `pro/`, `docs/`, `README*.md`, `LICENSE`, `CHANGELOG.md`, `.claude/rules/*.md` (10 arquivos), `.claude/hooks/*.cjs`, `.claude/commands/**` (incluindo 12 personas AIOX intocadas), `.claude/setup/`, `.claude/templates/`, `.claude/skills/**` (57 skills).
- **squad-creator sem variante Claude Code Kolden** — decisão explícita registrada como INFO (Prometeu não cria squad, Kolden factory = Caos).
- **57 skills** — Sub-onda 3.3 cuidará.
- **Costura final + smoke test** — Sub-onda 3.3.
- **Dike delta INDEPENDENTE por-subagente Explore** — deferido para Sub-onda 3.3 conforme padrão herdado da Sub-onda 3.1 (Q4 do gate humano).

---

## §6 — Score projetado pós-Sub-onda 3.2

**Baseline pré-Sub-onda 3.2** (herdado da Sub-onda 3.1): **5/8 hard PASS + 3 WARN legítimo** (G1 canônico Kolden VERDE + G2 + G3 + G4 + G8 N/A) + 3/8 WARN legítimo (G5 divergência METODO herdada, G6/G7 completude Sub-ondas 3.2/3.3).

**Score projetado pós-diff Sub-onda 3.2:**
- **G1** constituição: 6 canônicos AIOX MEMORY intocados + 12 aiox-agents ganham `constitution: Prometeu/constitution.md` via APPEND → **✅ VERDE (12/12 aiox-agents + herança squad + refactor espúrio)**.
- **G2** ASL: 12 aiox-agents ganham `ASL: 2` ou `ASL: 3` declarado + mapping por-agente → **✅ VERDE**.
- **G3** uncertainty + aspiration: herança PRD + aspiration próprio por-agente → **✅ VERDE**.
- **G4** off-switch: hook enforce-git-push-authority.cjs em 9/10 + referência genérica interrupt-before-mutation.sh + declaração explícita HITL devops/data-engineer/aiox-master ASL-3 → **✅ VERDE** (com nuance devops/data-engineer/aiox-master ASL-3).
- **G5** interpretability: plano mínimo por-camada declarado por-agente → **⚠️ WARN legítimo** (divergência METODO herdada — emenda pendente Onda 6).
- **G6** orthogonality: herança VO-8 + teste AB-3 no roteiro → **⚠️ WARN legítimo** (Sub-onda 3.3 fará implementação real do teste).
- **G7** grounding: grounding real-time via §2 Carregamento de Contexto + `grounding_required: true` explícito por-agente → **⚠️ PARCIAL implícito** (Sub-onda 3.3 fará skills com `grounding_required`).
- **G8** predictions_scorecard: `false` declarado por-agente → **✅ N/A VERDE**.

**Score projetado pós-Sub-onda 3.2:** **~6/8 hard PASS + 2 WARN legítimo** (G1 + G2 + G3 + G4 + G8 hard PASS; G5 + G6 WARN legítimo; G7 PARCIAL implícito — Sub-onda 3.3 elevará).

**Delta absoluto Sub-onda 3.2:** **+1 ponto** (5/8 → 6/8 hard PASS canônico Kolden).

**Delta absoluto Onda 3 total (projetado pós-3.1+3.2+3.3):** **+6 pontos** (2/8 → 8/8 VERDE).

---

## §7 — Divergências declaradas honestamente

1. **Metadata do CAOS-CL-002 marcada como "DRAFT"** — o METODO §9 declara canônico após Sub-onda 1.6, mas o próprio arquivo `Caos/checklists/CAOS-CL-002.md` L7 ainda tem cabeçalho `> **Status:** DRAFT`. Divergência-de-metadata declarada + herdada. Sub-onda 3.2 **usa como canônico** conforme METODO §9.

2. **Verificação Dike temporariamente pelo prometeu-chief** — Dike squad-solo sem agente funcional em `Dike/agents/dike-chief.md`. Sub-onda 3.2 baseline pelo prometeu-chief com 3 salvaguardas (ordem serial + evidência verbatim + divergência declarada). Delta INDEPENDENTE por subagente Explore **deferido para Sub-onda 3.3** conforme padrão herdado Sub-onda 3.1 (Q4 do gate humano — recomendação).

3. **G5 interpretabilidade continua divergência herdada framework Liceu** (emenda pendente Onda 6 do METODO).

4. **Convenção `@` dupla (externa Kolden @Prometeu + interna AIOX @dev/@qa/@architect/etc.)** declarada em `Prometeu/CLAUDE.md` §6 (Sub-onda 3.1) como camadas semanticamente distintas não-conflitantes. Sub-onda 3.2 reforça via bloco `mapeamento_cross_camada:` (Q3).

5. **`squad-creator` (Craft) fora de escopo direto Sub-onda 3.2** — decisão explícita: Prometeu não cria squad (Kolden factory = Caos). Squad-creator canônico AIOX preservado intocado sem variante Claude Code Kolden. INFO — pode ser revisitado se aparecer caso de uso cross-squad Kolden.

6. **`aiox-master` (Orion) sem variante Claude Code** — Sub-onda 3.2 corrige com CREATE explícito (é orquestrador AIOX interno com uso real em governança framework + debugging + workflow-engine). Padrão coerente com as 10 variantes existentes.

7. **ASL-3 crítico em 3 agentes** — `aiox-devops` (git push, PR, release), `aiox-data-engineer` (migration production, CREATE/ALTER/DROP), `aiox-master` (execução direta framework, `--force-execute`, meta-operações). Reflexo `interrupt-before-mutation.sh` (herdado Sub-onda 3.1) precisa cobrir esses casos explicitamente.

8. **4 MEMORY.md espúrios em path não-canônico** — EN puro pré-absorção Kolden 2026-02. Veredito recomendado: **ARQUIVAR** (Opção B — Q2 do gate humano). Rule `.claude/rules/agent-memory-imports.md` confirma path canônico único.

---

## §8 — Auto-verificação G1-G8 desta Sub-onda 3.2 (baseline pré-aplicação)

- **G1** (escopo cirúrgico) — ✅ **PASS** · todos os 6 artefatos em `Prometeu/registros/metodo-onda-3/3.2-agents-internos/`; nenhum outro arquivo tocado até Passo 3.
- **G2** (sem commit sem ordem) — ✅ **PASS** · working tree preservado.
- **G3** (sem push sem ordem) — ✅ **PASS**.
- **G4** (ritual de encerramento) — ⏳ Passo 7 pós-aplicação.
- **G5** (fan-out ≤3) — ✅ **PASS** · 0/3 (regra 9x consecutivas confirmada — Sub-onda 3.2 é 9ª confirmação; interdependência cross-arquivo Art. X unificado + persona AIOX + APPEND coerente).
- **G6** (artefato-em-disco entre passos) — ✅ **PASS** · 6 artefatos gravados sequencialmente.
- **G7** (sessão dedicada) — ✅ **PASS** · Sub-onda 3.2 executada em `C:\Kolden\Prometeu\` (nunca duas sub-ondas na mesma sub-sessão).
- **G8** (procedência rastreável) — ✅ **PASS** · grep reverso em `Liceu/frameworks/arquitetura-de-agents-kolden/procedencia.md` confirma cada citação (Russell 2019, Bostrom 2012/2014, Brooks 1991, Amodei-Olah 2016, Bai et al. 2022, Yao et al. 2022, Anthropic MCP 2024).

---

*Matriz de conformidade Sub-onda 3.2 produzida por `prometeu-chief` (raiz Kolden) em 2026-07-07 na Onda 3 do Contrato-mãe `m-20260706-metodo-kolden`. Fan-out 0/3 por interdependência cross-arquivo (regra 9x confirmada Sub-ondas 1.1/1.2/1.4/1.5/1.6 + Onda 2 Hermes + Sub-onda 3.1 — Sub-onda 3.2 é a 9ª confirmação). Vendor SynkraAI preservado intocado. Constituição AIOX v1.0.0 preservada. 12 agentes canônicos AIOX intocados. Divergências declaradas em §7. Handoff para `diff-cirurgico.md`.*
