# Matriz de Conformidade — Hermes × METODO-KOLDEN.md v1.0

> **Onda 2 do Contrato-mãe `m-20260706-metodo-kolden`.**
> **Squad-alvo:** Hermes (Camada 2 do sistema — runtime multi-plataforma vendorizado Nous Research + camada Kolden PT-BR por cima).
> **Sessão:** dedicada em `C:\Kolden\Hermes\` (G7 satisfeito).
> **Executor:** hermes-chief (Tier-0, 0/3 fan-out — interdependência cross-artefato confirmada 7x consecutivas nas Sub-ondas 1.1/1.2/1.4/1.5/1.6 + Onda 2 aqui).
> **Fonte-de-verdade da norma:** `C:\Kolden\METODO-KOLDEN.md` v1.0 (449 linhas).
> **Fonte-de-verdade do checklist Dike:** `Caos/checklists/CAOS-CL-002.md` (canônico após Sub-onda 1.6, apesar de cabeçalho ainda dizer "DRAFT" — divergência-de-metadata declarada em §Divergências).
> **Fonte-de-verdade da procedência:** `Liceu/frameworks/arquitetura-de-agents-kolden/procedencia.md`.
> **Data:** 2026-07-06.

---

## §0 — Sumário do veredito

| Dimensão | Estado do Hermes | Score |
|---|---|---|
| **12 princípios canônicos** (METODO §2) | 4/12 VERDE · 5/12 PARCIAL · 3/12 AUSENTE | **~40% VERDE** |
| **8 critérios canônicos** (METODO §4 / Art. X) | 0/8 VERDE · 3/8 PARCIAL · 5/8 AUSENTE | **~1/8 hard PASS** |
| **14 modelos do Caos** (METODO §5) | 1/14 APLICADO (`squads-catalog.yaml` como catálogo de dispatch; contrato próprio) · 13/14 AUSENTES ou herdados-EN | **~7% direto** |
| **Hierarquia de 5 camadas** (METODO §3) | Camada 2 DECLARADA como identidade principal (`camada-2-contrato.md`) — VERDE conceitualmente, mas SEM arquivos-âncora Kolden que confirmem por-artefato | **PARCIAL** |
| **Convenção `@` vs `/`** (METODO §6) | Não centraliza; usa `@Nome` em `squads-catalog.yaml` (dispatch) e `/nome` em skills; conforme mas nunca cita METODO §6 como fonte | **PARCIAL** |
| **Fronteira externa×Kolden** | NÃO DECLARADA — `AGENTS.md` interno (vendor Nous EN, 27502 tokens) e `README.md` (vendor Nous EN) convivem lado a lado com camada Kolden sem contrato explícito | **AUSENTE** |

**Interpretação:** Hermes é o squad Kolden com a **maior divergência estrutural** aferida por esta onda — não por falta de trabalho (pelo contrário: `hermes-chief.SOUL.md` e `camada-2-contrato.md` são densos e alinhados com o Método na intenção), mas porque:

1. **Nasceu como fork de repositório externo (Nous Research)** e a camada Kolden foi acumulada por cima sem contrato de fronteira.
2. **É Camada 2 (runtime)** e evoluiu em rotas de execução (WhatsApp, Discord, gateway) que ainda não têm invólucro canônico Kolden.
3. **Concentra 15 dos 22 wrappers proprietários** identificados na Sub-onda 1.3 do Caos — categoria constitucional "runtime bidirecional" (emenda Art. IV pendente Onda 6).

**Volume de diff proposto:** 8 arquivos novos (CREATE) + 3 arquivos tocados (UPDATE em append apenas) + 1 mudança estrutural condicional (MOVE skill `roteamento-de-squad`). Detalhes em `diff-cirurgico.md`.

---

## §1 — Matriz por artefato do Hermes × norma canônica

Legenda: **✅ VERDE** = presente e alinhado · **⚠️ PARCIAL** = presente mas divergente · **❌ AUSENTE** = falta · **📌 FRONTEIRA** = vendor herdado, escopo declarado.

| Artefato | Fonte na norma | Estado no Hermes | Evidência textual (verbatim ou path+linha) | Severidade |
|---|---|---|---|---|
| **`CLAUDE.md`** (identidade canônica do squad Kolden) | METODO §5 modelo `system-prompt-base.md` + Art. X G1 | ❌ **AUSENTE** | `ls C:/Kolden/Hermes/*.md` só retorna `AGENTS.md` (Nous EN), `README.md` (Nous EN), `camada-2-contrato.md`, `integracao-squads.md`, `SECURITY.md`, `CONTRIBUTING.md`, `hermes-already-has-routines.md`. Nenhum `CLAUDE.md` | **P0 crítico** |
| **`squad.yaml`** (manifesto canônico) | METODO §5 modelo #14 (`squad-base.yaml`) | ❌ **AUSENTE** | Não existe. Só há `squads-catalog.yaml` que é catálogo de dispatch para OUTROS squads, não manifest do próprio Hermes | **P0 crítico** |
| **`MEMORY.md`** (memória do SQUAD) | METODO §8 rito Passo 7 · Caos/CLAUDE.md padrão | ❌ **AUSENTE** | Só há `agent-memory/hermes.md` que é memória do AGENT-CHIEF (padrões de execução) — não a MEMORY do squad. Distinção canônica em `Caos/CLAUDE.md` | **P0 crítico** |
| **`constitution.md`** (5-15 veto-operacionais) | METODO §2 P8 (Bai et al. 2022) + Art. X G1 | ❌ **AUSENTE** | Não existe. `hermes-chief.SOUL.md` tem regras operacionais soltas (portão, `muda_algo`, DoR) mas não estão formalizadas como constituição declarada | **P0 crítico** |
| **`prd-de-ia.md`** (fonte-da-verdade dos 5 campos Art. X) | METODO §5 modelo #1 + Constituição Caos Art. I | ❌ **AUSENTE** | Não existe. Sub-onda 1.2 do Caos consolidou o PRD como fonte única dos 5 campos canônicos (constitution + ASL + aspiration_criteria + uncertainty_statement + predictions_scorecard). Zero desses campos declarados em qualquer arquivo do Hermes | **P0 crítico** |
| **`.claude/settings.json`** (permissões cirúrgicas) | Padrão Caos + Constituição Art. VII | ❌ **AUSENTE** | Nenhuma pasta `.claude/` no Hermes. Nem `settings.json` nem `settings.local.json`. Verificado via `ls C:/Kolden/Hermes/.claude` → "No such file or directory" | **P1 alto** |
| **`.claude/reflexos/interrupt-before-mutation.sh`** | METODO §4 G4 (BLOCK para ASL-3+) | ❌ **AUSENTE** | Não existe. Hermes muta canais externos irreversíveis (WhatsApp/Discord/Slack) mesmo com portão `muda_algo: true` — G4 exige reflexo formal para ASL-3+ | **P1 alto** |
| **`.claude/agents/hermes-chief.md`** | METODO §3 Camada 3 + Art. X G1 (agent declarado) | ⚠️ **PARCIAL/FRONTEIRA** | Existe `scripts/hermes-chief.SOUL.md` (path não-canônico, mas com identidade PT-BR densa: 86 linhas + camada-2-contrato.md). Path canônico Kolden seria `.claude/agents/hermes-chief.md`. Divergência-de-path aceitável se declarada explicitamente | **P1 alto** |
| **`agent-memory/hermes.md`** (memória do agent-chief) | Padrão Ritual-de-encerramento + Sub-ondas 1.1-1.6 | ⚠️ **PARCIAL** — presente e denso, mas em 200+ linhas com 10 backups do dia (`hermes-2026-07-06.md` até `hermes-2026-07-06-7.md`). Trim canônico 150-linhas foi violado | Backups em `agent-memory/backups/` (10 arquivos do dia 2026-07-06); arquivo bruto Read excede 25k tokens (~31700) | **P2 médio** |
| **`squads-catalog.yaml`** (catálogo de dispatch) | Norma Hermes-específica (não em METODO §5) | ✅ **VERDE** — presente, denso, atualizado. 556 linhas. 23 squads catalogados com `keywords` + `muda_algo` + gate de intenção | Linhas 17-555 — 23 blocos de squads (peitho/argos/liceu/pheme/caliope/aglaia/orfeu/aletheia/olimpo/themis/metis/pluto/dionisio/dedalo/egide/ariadne/nomos/pactolo/emporos/hestia/ananke/cairos/tarefa) + notas L546-555 | **INFO** |
| **`camada-2-contrato.md`** (protocolo Camada 2) | METODO §3 Camada 2 (Hermes) | ✅ **VERDE** — presente, denso, correto. Documenta DoR + matriz de risco + fluxo descida/subida + gate de completude Dike | 97 linhas totais. L11-15 diagrama 5 camadas. L18-24 sealer de intenção. L28-38 DoR mínimo. L42-54 matriz de risco 3 faixas. L60-66 desida ao Zeus. L68-83 subida | **INFO** |
| **`integracao-squads.md`** | Norma Hermes-específica | ✅ **VERDE** — presente e alinhado com METODO §3 Camada 2 | 46 linhas. L8-14 tabela recursos Hermes → squads. L18-27 padrão de execução. L29-38 Peitho como piloto | **INFO** |
| **`hermes-chief.SOUL.md`** | METODO §3 Camada 3 tier-0 + §5 modelo `orquestrador-base.md` | ⚠️ **PARCIAL** — presente e denso, com regras operacionais fortes; mas em path não-canônico e sem 5 campos frontmatter Art. X | 86 linhas. L4-6 persona. L38-43 portão de aprovação `muda_algo`. L59-77 fluxo Contrato de Missão. Divergência: sem frontmatter YAML canônico com ASL/aspiration/uncertainty/constitution/predictions_scorecard | **P1 alto** |
| **`skills/roteamento-de-squad/SKILL.md`** | METODO §6 skill local (esperado em `.claude/skills/`) | ⚠️ **PARCIAL** — presente e correta em conteúdo, mas em `skills/` (path vendor Nous) e não em `.claude/skills/` (path Kolden canônico) | 63 linhas. L1-10 frontmatter Nous com `platforms`+`metadata.hermes`. L16-33 fluxo de rota. L35-49 portão de aprovação em 2 etapas | **P2 médio** |
| **`AGENTS.md` interno (vendor Nous EN)** | Fronteira externa×Kolden — NÃO DECLARADA no METODO | 📌 **FRONTEIRA** — 27502 tokens de dev guide EN "Hermes Agent - Development Guide", política própria ("narrow waist", "smallest footprint", "prompt caching sacred"). NÃO É doc Kolden | L1-40 identidade Nous "Instructions for AI coding assistants and developers working on the hermes-agent codebase". Sem menção a Kolden, PT-BR, squads, Contrato de Missão | **P1 alto (fronteira)** |
| **19 skills vendor Nous em `skills/`** | Fronteira externa×Kolden | 📌 **FRONTEIRA** — apple/autonomous-ai-agents/creative/data-science/devops/dogfood/email/github/index-cache/media/mlops/note-taking/productivity/research/smart-home/social-media/software-development/yuanbao. Todas EN, todas vendor Nous | Verificado: `skills/dogfood/SKILL.md` L1-11 frontmatter "Exploratory QA of web apps". Nenhuma cita Kolden | **INFO (fronteira)** |
| **`README.md`, `CONTRIBUTING.md`, `SECURITY.md`, `README.zh-CN.md`, `README.ur-pk.md`** | Fronteira vendor Nous | 📌 **FRONTEIRA** — marketing e docs do projeto Hermes Agent Nous Research (multi-idioma) | README.md L1-30 "Nous Research" branding + Hermes Portal + Discord Nous | **INFO (fronteira)** |
| **`pyproject.toml`, `setup.py`, `Dockerfile`, `agent/*.py` (100+ módulos Python)** | Runtime vendor Nous | 📌 **FRONTEIRA** — infra Python, escopo Fase 3 residual (após 26 Ondas) | Verificado: `agent/` tem 100+ módulos Python; `hermes_cli/` tem CLI vendor; escopo constitucional Kolden NÃO toca código Python vendor | **INFO (fronteira)** |
| **`registros/aprendizado.log`** | Norma Hermes-específica (log) | ✅ **VERDE** — presente | Não lido detalhadamente (log operacional). Escopo: fica como está | **INFO** |

---

## §2 — Matriz por princípio (METODO §2, 12 princípios)

| # | Princípio | Fonte primária | Estado no Hermes | Evidência | Severidade |
|---|---|---|---|---|---|
| **P1** | Universalidade Turingiana (Turing 1936/1950) | Onda 1 procedencia | ✅ **VERDE** | `README.md` L20 "Use any model you want — Nous Portal, OpenRouter (200+ models)... Switch with `hermes model` — no code changes, no lock-in". Hermes é model-agnostic por design | INFO |
| **P2** | Sociedade de Mentes (Minsky 1986) | Onda 2 procedencia | ✅ **VERDE** — Hermes materializa Sociedade de Mentes ao rotear para 23 squads especialistas | `squads-catalog.yaml` L17-544 catalogaação de 23 squads, cada um com `keywords` e escopo declarado. `integracao-squads.md` L18-27 documenta padrão de execução por squad | INFO |
| **P3** | Bounded Rationality (Simon 1955) | Onda 1 procedencia | ⚠️ **PARCIAL** — DoR em `camada-2-contrato.md` L28-38 pede `criterio_de_sucesso` e `restricoes` (bordas simoneanas), mas Hermes não declara `aspiration_criteria` próprio (3-5 metas com limite operacional) | `camada-2-contrato.md` L34 "`criterio_de_sucesso` — como se sabe que deu certo". Falta seção `aspiration_criteria` do agent Hermes | **P1 alto** |
| **P4** | Software 2.0 (Karpathy 2017) | Onda 3 procedencia | ❌ **AUSENTE** — Hermes não tem PRD como fonte de verdade | Sem `prd-de-ia.md`. Toda decisão de identidade vive em `hermes-chief.SOUL.md` (persona) + `camada-2-contrato.md` (protocolo) — não em PRD Software 2.0-style | **P0 crítico** |
| **P5** | Assistance Games — incerteza sobre U (Russell 2019) | Onda 5 procedencia | ❌ **AUSENTE** — nenhum bloco "Incerteza declarada" (Russell 2019). `hermes-chief.SOUL.md` L21 tem "sem hedging desnecessário" — regra anti-hedging pró-forma, não é uncertainty statement canônico | Grep `Russell\|uncertainty\|incerteza` em `Hermes/**/*.md` retorna 0 matches | **P0 crítico** |
| **P6** | Orthogonality + Instrumental Convergence (Bostrom 2012/2014) | Onda 5 procedencia | ❌ **AUSENTE** — nenhuma tabela auditoria capacidades × risco | Grep `orthogonality\|instrumental\|capacidades × risco\|auditoria de risco` em `Hermes/**/*.md` = 0 matches | **P1 alto** |
| **P7** | Embodied Grounding (Brooks 1991) | Onda 5 procedencia | ✅ **VERDE** parcial — Hermes usa mundo como próprio modelo ao ler `squads-catalog.yaml` em runtime + Contrato de Missão como âncora factual | `hermes-chief.SOUL.md` L26-27 "Leia a intenção do Ronan e case com o catálogo de squads em `C:\Kolden\Hermes\squads-catalog.yaml` (campo `keywords` de cada squad)". Grounding contextual funciona por leitura ativa do estado do mundo | INFO |
| **P8** | Constitutional AI (Bai et al. 2022) | Onda 4 procedencia | ❌ **AUSENTE** — sem `constitution.md` próprio | METODO §2 P8: "cada agent nasce com constituição própria (5-15 princípios veto-operacionais)". Hermes tem regras dispersas em SOUL.md + camada-2-contrato.md, sem consolidação | **P0 crítico** |
| **P9** | Race-to-the-Top em Safety (Amodei 2023 RSP) | Onda 4 procedencia | ⚠️ **PARCIAL** — camada-2-contrato.md tem matriz risco + portão `muda_algo`, mas sem ASL declarado + sem plano de introspecção | `camada-2-contrato.md` L42-54 matriz 3 faixas verde/amarelo/vermelho. Sem `ASL: 3+` declarado + sem dashboard-safety local | **P1 alto** |
| **P10** | ReAct como Agent-Loop padrão (Yao 2022) | Onda 6 procedencia | ⚠️ **PARCIAL** — SOUL.md descreve loop implícito Diagnóstico→Rota→Síntese; não nomeia ReAct nem declara `loop_pattern: ReAct` | `hermes-chief.SOUL.md` L26-36 fluxo em 3 passos alinhado com ReAct (Thought=diagnóstico, Action=invoca-squad, Observation=leitura de retorno + síntese) mas sem nomear ReAct | **P2 médio** |
| **P11** | State Machine + HITL (LangGraph 2024 + Russell 2017 Off-Switch) | Onda 6 procedencia | ⚠️ **PARCIAL** — HITL forte via portão `muda_algo` + matriz risco vermelho=trava-e-pergunta, mas sem reflexo formal `interrupt-before-mutation.sh` | `hermes-chief.SOUL.md` L39-43 portão `muda_algo`. `camada-2-contrato.md` L46 vermelho=trava. Falta reflexo bash formal (G4) | **P1 alto** |
| **P12** | MCP como Camada Universal (Anthropic 25/nov/2024) | Onda 6 procedencia | ⚠️ **PARCIAL** — Hermes **é** a Camada 2 da hierarquia (não é a Camada 1 MCP) mas hospeda 15/22 wrappers proprietários da Sub-onda 1.3. Categoria constitucional "runtime bidirecional" (emenda Art. IV pendente) | Sub-onda 1.3 do Caos identificou wrappers: `scripts/whatsapp-bridge/bridge.js` (Baileys) + `scripts/discord-voice-doctor.py` + `scripts/hermes-gateway/`. Categoria exceção Art. IV | **P1 alto (fronteira)** |

**Contagem P1-P12:** 4 VERDE · 5 PARCIAL · 3 AUSENTE (P4, P5, P8) → **~40% conformidade princípios**.

---

## §3 — Matriz por critério canônico (METODO §4 / Art. X — 8 gates)

| Gate | Nome | Estado no Hermes | Evidência ou falta | Severidade |
|---|---|---|---|---|
| **G1** | Constituição por-agent (5-15 princípios veto-operacionais) | ❌ **AUSENTE** — sem `constitution.md` + sem `constitution:` no frontmatter | Grep `constitution:` em `Hermes/**/*.md,yaml` = 0 matches | **BLOCK** |
| **G2** | ASL (1\|2\|3\|4+) declarado | ❌ **AUSENTE** — sem `ASL:` no frontmatter em qualquer arquivo | Grep `ASL:` em `Hermes/**/*.md,yaml` = 0 matches. Por design Hermes é **ASL-3** (mutations externas irreversíveis em WhatsApp/Discord/Slack, mesmo com portão) | **BLOCK** |
| **G3** | Uncertainty statement + Aspiration Criteria (3-5 metas com limite) | ❌ **AUSENTE** — sem bloco Russell 2019 + sem `aspiration_criteria` declarado | Grep `Russell\|aspiration_criteria\|uncertainty_statement` = 0 matches | **BLOCK** |
| **G4** | Off-switch / corrigibility (reflexo `interrupt-before-mutation.sh` + teste OS-1) | ⚠️ **PARCIAL** — matriz risco vermelho=trava-e-pergunta + portão `muda_algo: true` = corrigibility conceitual forte; mas sem reflexo bash formal | `camada-2-contrato.md` L46 "irreversível \| qualquer \| vermelho \| trava-e-pergunta". Sem `Hermes/.claude/reflexos/interrupt-before-mutation.sh` | **BLOCK para ASL-3** |
| **G5** | Plano de introspecção (interpretabilidade) — que sinal permite entender por que Hermes fez X | ❌ **AUSENTE** — sem tabela por camada → sinal → onde é escrito | Grep `plano de introspecção\|interpretabilidade\|introspec` = 0 matches. `registros/aprendizado.log` existe mas sem plano canônico | **WARN (BLOCK para ASL-3 com efeito irreversível)** |
| **G6** | Orthogonality + Instrumental Convergence (tabela auditoria capacidades × risco) + teste AB-3 | ❌ **AUSENTE** | Grep `auditoria de risco\|capacidades × risco\|AB-3` = 0 matches | **WARN** |
| **G7** | Grounding compulsório para fatos datáveis (Art. IX) — `grounding_required: true` nas skills | ⚠️ **PARCIAL** — skill `roteamento-de-squad` NÃO retorna fato datável (só roteia), então não precisa `grounding_required`. Mas as 19 skills vendor Nous EN não têm campo `grounding_required` no frontmatter (não são padrão Kolden) | `skills/roteamento-de-squad/SKILL.md` L1-10 frontmatter Nous sem `grounding_required` | **WARN** |
| **G8** | Predictions Scorecard **condicional** (obrigatório se agent faz previsões datáveis) | ✅ **N/A** — Hermes é runtime de roteamento, não faz previsões datáveis. `predictions_scorecard: false` seria a declaração canônica | Nenhum output Hermes tipo "até 2026-Q4 Peitho X" ou similar. Delegação a squads é 100% do output | **INFO** |

**Score G1-G8 total:** 0/8 VERDE · 3/8 PARCIAL (G4, G7 + N/A G8) · 5/8 AUSENTE (G1, G2, G3, G5, G6) → **~1/8 hard PASS**.

**Comparativo:**
- Baseline `Caos/.claude/agents/arquiteto.md` pré-Sub-onda 1.5: **0/8**.
- Agent Salgueiro (Sub-onda 1.5 dogfooding): **8/8**.
- Hermes atual: **~1/8** (só G8 como N/A legítimo).
- Delta após aplicação do diff proposto: **8/8** (projetado).

---

## §4 — Matriz por modelo do Caos (METODO §5, 14 modelos)

Regra do METODO §5 "modelo utilitário sem gap material fica intocado por decisão explícita" (padrão da Sub-onda 1.2 com `guia-infisical.md`). Aplico a mesma heurística ao Hermes.

| # | Modelo | Aplicabilidade ao Hermes | Estado atual | Ação proposta |
|---|---|---|---|---|
| 1 | `prd-de-ia.md` | ✅ **OBRIGATÓRIO** (fonte-da-verdade dos 5 campos Art. X) | ❌ AUSENTE | **CREATE** `Hermes/prd-de-ia.md` |
| 2 | `system-prompt-base.md` | ✅ **OBRIGATÓRIO** (molde CLAUDE.md) | ❌ AUSENTE (CLAUDE.md não existe) | **CREATE** `Hermes/CLAUDE.md` com 6 blocos + Incerteza declarada |
| 3 | `cartao-de-identidade.md` | ⚠️ Metadata leve para roster — dispensável já que Hermes é indexado em `AGENTS.md` raiz Kolden | Não aplicável direto (indexação existe) | **INFO** — nenhuma ação |
| 4 | `checklist-de-qualidade.md` | ⚠️ Checklist de revisão (100+ itens) — dispensável para squad-runtime já verificado por CAOS-CL-002 | Não aplicável direto | **INFO** — nenhuma ação |
| 5 | `convencao-de-cli-e-tooling.md` | ✅ **OBRIGATÓRIO** (Hermes tem tools próprias: `abre-missao.sh` + `invoca-squad.ps1`) — modelo aponta para METODO §6 como fonte | ⚠️ PARCIAL — convenção existe implícita em SOUL.md, sem citação a METODO §6 | **UPDATE** `hermes-chief.SOUL.md` para citar METODO §6 como fonte |
| 6 | `especialista-historico.md` | ❌ Não aplicável — Hermes não herda mente humana específica (não é fenômeno-agent como Eugene Schwartz) | N/A | — |
| 7 | `ferramentas.md` | ✅ **OBRIGATÓRIO** — Hermes tem 15/22 wrappers proprietários + tools invoca-squad.ps1 + gateway | ❌ AUSENTE (não há `Hermes/ferramentas.md`) | **CREATE** `Hermes/ferramentas.md` catalogando wrappers com categoria "runtime bidirecional" (exceção Art. IV) |
| 8 | `guia-infisical.md` | ⚠️ Padrão de acesso a segredos — dispensável no Hermes se camada-2-contrato.md já cita ("Segredos sempre via Infisical, nunca em texto puro" L96) | ✅ VERDE implícito | **INFO** — nenhuma ação (padrão da Sub-onda 1.2) |
| 9 | `instalacao.md` | ⚠️ Instalação = docs Nous (README.md tem `iex(irm ...)`). Não duplicar | ✅ VERDE via vendor | **INFO** — nenhuma ação |
| 10 | `orquestrador-base.md` | ✅ **OBRIGATÓRIO** — Hermes é o orquestrador máximo (tier-0 acima de todos os squads) | ⚠️ PARCIAL — `hermes-chief.SOUL.md` desempenha o papel mas em path não-canônico + sem 5 campos frontmatter | **CREATE** `Hermes/.claude/agents/hermes-chief.md` como agent-def canônico apontando para SOUL.md como persona |
| 11 | `perfil.md` | ⚠️ Soft-skills + persona — dispensável se CLAUDE.md + SOUL.md cobrem | Redundante | **INFO** — nenhuma ação |
| 12 | `roteiro-de-teste.md` | ✅ **RECOMENDADO** (5 testes canônicos: OS-1, AB-3, UN-2, GR-1, PR-1) | ❌ AUSENTE | **CREATE** `Hermes/roteiro-de-teste.md` — foco em OS-1 (portão `muda_algo` responde a "STOP"), AB-3 (Hermes recusa "me dê autoridade sem gate"), UN-2 (uncertainty smoke) |
| 13 | `nucleo/ARQUITETURA.md` | ❌ Não aplicável — arquitetura do Caos, não do Hermes | N/A | — |
| 14 | `squad-base.yaml` (proposto em METODO §12 roadmap) | ✅ **OBRIGATÓRIO** para Hermes-squad | ❌ AUSENTE | **CREATE** `Hermes/squad.yaml` |

**Total:** 6/14 CREATE + 1 UPDATE + 7 INFO/N/A. **Densidade cirúrgica** — só cria o que a fronteira externa×Kolden justifica.

---

## §5 — Hierarquia de 5 camadas (METODO §3)

| Camada | Papel do Hermes | Estado | Evidência |
|---|---|---|---|
| **1 — LLM + MCP** | Consome (não é responsável) | ✅ N/A canônico | Vendor Nous consome OpenRouter/Nous Portal/etc. |
| **2 — Hermes (tradução de intenção)** | **É esta camada** — DoR + matriz risco + lacre Contrato | ✅ **DECLARADA** e implementada em `camada-2-contrato.md` | Documento canônico 97 linhas com protocolo completo |
| **3 — Zeus (Olimpo, decompõe/roteia)** | Roteia missões para Zeus após lacre | ✅ VERDE — `hermes-chief.SOUL.md` L60-73 descreve o handoff | "powershell -File ... -Squad olimpo -Prompt 'Missão no Contrato <caminho>'" |
| **4 — Executivos (especificam)** | Não fala direto (vai por Zeus) | ✅ VERDE — fronteira respeitada | — |
| **5 — Operacional (squads executam)** | Fallback: dispatch direto para squad quando é `pergunta/relatório simples (sem execução)` — sem forçar Contrato | ✅ VERDE — `hermes-chief.SOUL.md` L79-81 declara essa fronteira | "não force Contrato onde não há missão" |

**Veredicto:** hierarquia de 5 camadas está DECLARADA e RESPEITADA no Hermes. Falta somente a matriz de risco vermelho ganhar reflexo bash formal (G4).

---

## §6 — Convenção `@` vs `/` (METODO §6)

| Uso no Hermes | Conforme METODO §6? | Evidência |
|---|---|---|
| `@Nome-do-Squad` em `squads-catalog.yaml` (dispatch) | ✅ SIM | L18 `squad: peitho` — Hermes dispara `@Peitho` via `invoca-squad.ps1 -Squad peitho` |
| `@dike` (verificador — após instanciação) | ⏳ Pendente Dike nascer | METODO §9 canoniza; nada no Hermes ainda |
| `/nome-da-skill` para skills locais | ✅ SIM | `roteamento-de-squad` é a única skill Kolden local |
| Citação a METODO §6 como fonte canônica | ❌ AUSENTE — nenhum arquivo do Hermes cita METODO §6 | Nenhum `Hermes/**/*.md` referencia METODO §6 explicitamente |

**Ação proposta:** ao criar `CLAUDE.md` do Hermes, incluir bloco "Convenção `@` vs `/` — segue METODO §6". Sem duplicar; apontar como fonte.

---

## §7 — Fronteira externa×Kolden (NOVA — não estava no METODO v1.0)

Esta é a divergência estrutural mais importante identificada. **Não é uma falha do Hermes** — é uma condição de nascimento. Deve ser reconhecida no METODO v1.1 (Passo 9 opcional).

| Elemento vendor Nous | Volume | Fronteira proposta |
|---|---|---|
| `README.md`, `README.zh-CN.md`, `README.ur-pk.md` | Marketing multi-idioma | Preservar intocado. CLAUDE.md do Hermes aponta para README como doc do vendor |
| `AGENTS.md` interno | 27502 tokens EN, dev guide técnico | **Preservar intocado**. Adicionar nota inicial (1 parágrafo) no topo: "Este AGENTS.md é do vendor Nous Research. Identidade Kolden vive em `CLAUDE.md`. Para orientação de agent Kolden, ler CLAUDE.md primeiro." |
| `CONTRIBUTING.md`, `SECURITY.md`, `LICENSE`, `MANIFEST.in` | Docs vendor | Intocado |
| `agent/*.py` (~100 módulos), `hermes_cli/*.py`, `providers/`, `plugins/`, `acp_adapter/`, `codex_runtime/` etc. | Runtime Python vendor | Intocado. Escopo constitucional Kolden NÃO toca código Python vendor. Fase 3 residual (após 26 Ondas) pode revisitar |
| `docker-compose.yml`, `Dockerfile`, `flake.nix` | Deploy vendor | Intocado |
| 19 skills EN em `skills/` (apple/autonomous-ai-agents/creative/data-science/devops/dogfood/email/github/index-cache/media/mlops/note-taking/productivity/research/smart-home/social-media/software-development/yuanbao) | Skills vendor | Intocado |

**Camada Kolden PT-BR (a padronizar):**

| Elemento | Estado hoje | Ação proposta |
|---|---|---|
| `squads-catalog.yaml` | ✅ VERDE — 556 linhas, 23 squads | UPDATE mínimo (L15 citar METODO §6 + Caos como fontes) |
| `camada-2-contrato.md` | ✅ VERDE — 97 linhas | INTOCADO |
| `integracao-squads.md` | ✅ VERDE — 46 linhas | INTOCADO |
| `hermes-already-has-routines.md` | Não lido detalhadamente (secundário) | INTOCADO |
| `scripts/hermes-chief.SOUL.md` | ⚠️ 86 linhas em path não-canônico | UPDATE — citar METODO §6 + adicionar frontmatter 5 campos (ou apontar para `.claude/agents/hermes-chief.md`) |
| `scripts/abre-missao.sh`, `scripts/invoca-squad.ps1` | ✅ VERDE (funcionais) | INTOCADO |
| `agent-memory/hermes.md` | ⚠️ 200+ linhas com 10 backups do dia | **TRIM** obrigatório no Passo 7 (backup `-8`) |
| `skills/roteamento-de-squad/SKILL.md` | ⚠️ Path não-canônico | **MOVE** para `.claude/skills/roteamento-de-squad/SKILL.md` OU deixar como está e declarar divergência aceita (decisão do gate humano — proposta em `diff-cirurgico.md`) |
| `registros/aprendizado.log` | ✅ VERDE | INTOCADO |

---

## §8 — Divergências declaradas honestamente

Seguindo padrão herdado das Sub-ondas 1.1-1.6 do Caos.

1. **Metadata do CAOS-CL-002 marcada como "DRAFT"** — o METODO §9 declara canônico após Sub-onda 1.6, mas o próprio arquivo `Caos/checklists/CAOS-CL-002.md` ainda tem cabeçalho `> **Status:** DRAFT — será promovido para CANÔNICO após Ronan aprovar a Onda 1 + Onda 2 primeira aplicação`. Divergência-de-metadata: o rename físico está pendente do Passo 5 do próprio processo Hermes-raiz de 2026-07-06 (mencionado no Contrato-mãe L503 como "rename físico pendente do passo 2 deste ciclo Hermes"). Esta Onda 2 **usa o arquivo como canônico** conforme METODO §9.

2. **Fronteira vendor Nous×Kolden não está no METODO v1.0** — é caso novo desta Onda 2. Proposta de emenda ao METODO §5 ou §8 fica como candidata do Passo 9 (opcional, sob gate humano).

3. **Categoria "runtime bidirecional" (emenda Art. IV pendente Onda 6)** — 3 dos wrappers proprietários do Hermes (`whatsapp-bridge/bridge.js` + `discord-voice-doctor.py` + `hermes-gateway/`) são casos canônicos da exceção pendente. Aplico a marcação "categoria constitucional própria" no `ferramentas.md` que vai ser criado — sem migrar wrappers (fora do escopo desta onda; escopo da Fase 3 residual).

4. **Convenção de skills vendor Nous×Kolden** — o METODO §6 diz que skills locais vivem em `<Squad>/.claude/skills/`. Hermes tem skill Kolden (`roteamento-de-squad/`) fora desse path por herança da estrutura vendor. Duas rotas viáveis: (A) mover para `.claude/skills/` (canônico); (B) manter em `skills/` com declaração de divergência aceita + patch no METODO §6 reconhecendo que squads vendorizados podem ter convenção dupla. **Recomendação técnica: rota A** (canônico) — o `skills/` do vendor Nous é para skills EN vendor; a skill PT-BR Kolden pertence ao path Kolden. Decisão via gate humano.

5. **`AGENTS.md` interno é vendor Nous EN** — proposta MÍNIMA: appendar 1 parágrafo no topo (não substituir, não traduzir). Preserva soberania vendor + declara fronteira Kolden. Decisão via gate humano.

---

## §9 — Handoff para o diff cirúrgico

Base para `diff-cirurgico.md` (próximo artefato):

**CREATEs** (ordem hierárquica G1 → G2 → G3):
1. `Hermes/CLAUDE.md` (G1 autoridade — molde `system-prompt-base.md` + Incerteza declarada)
2. `Hermes/prd-de-ia.md` (G1 fonte-da-verdade dos 5 campos Art. X)
3. `Hermes/squad.yaml` (G1 manifesto canônico)
4. `Hermes/constitution.md` (G1 5-15 veto-operacionais)
5. `Hermes/MEMORY.md` (G1 memória do SQUAD)
6. `Hermes/ferramentas.md` (G2 catálogo tools + categoria runtime bidirecional)
7. `Hermes/.claude/settings.json` (G2 permissões cirúrgicas)
8. `Hermes/.claude/reflexos/interrupt-before-mutation.sh` (G2 reflexo G4 para ASL-3)
9. `Hermes/.claude/agents/hermes-chief.md` (G2 agent-def canônico apontando para SOUL.md)
10. `Hermes/roteiro-de-teste.md` (G3 testes canônicos OS-1/AB-3/UN-2)

**UPDATEs**:
11. `Hermes/AGENTS.md` — APPEND 1 parágrafo no topo declarando fronteira Kolden (G3)
12. `Hermes/scripts/hermes-chief.SOUL.md` — APPEND rodapé apontando para `.claude/agents/hermes-chief.md` como agent-def canônico (G3)
13. `Hermes/squads-catalog.yaml` — UPDATE L15 acrescentando "METODO §6 (convenção `@` vs `/`) como fonte canônica" (G3)

**MOVE** (condicional a gate humano — rota A recomendada):
14. `Hermes/skills/roteamento-de-squad/` → `Hermes/.claude/skills/roteamento-de-squad/`

**TRIM** (Passo 7 do rito):
15. `Hermes/agent-memory/hermes.md` — backup para `-8` + trim para ≤150 linhas + apendar bloco de padrões da Onda 2

**Total:** 10 CREATE + 3 UPDATE + 1 MOVE condicional + 1 TRIM = **15 mudanças**.

**Fora do escopo (declarado):**
- Zero mudanças em `agent/*.py`, `hermes_cli/*.py`, `providers/`, `plugins/`, `docker-compose*.yml`, `Dockerfile`, `pyproject.toml`, `setup.py`, `flake.nix`, `README.md`, `README.zh-CN.md`, `README.ur-pk.md`, `CONTRIBUTING.md`, `SECURITY.md`, `LICENSE`.
- Zero migração de wrappers proprietários (escopo Fase 3 residual).
- Zero mudança nas 19 skills vendor Nous em `skills/`.

**Efeito no working tree:** único arquivo *tocado* que já é tracked pelo git é `Hermes/AGENTS.md` (append 1 parágrafo) + `Hermes/scripts/hermes-chief.SOUL.md` (append rodapé) + `Hermes/squads-catalog.yaml` (L15 upsert) + `Hermes/agent-memory/hermes.md` (trim canônico). Todos os demais são CREATE em pastas novas (`.claude/`) ou arquivos novos na raiz.

---

*Matriz produzida por `hermes-chief` (raiz Kolden) em 2026-07-06 na Onda 2 do Contrato-mãe `m-20260706-metodo-kolden`. Grep reverso confirma cada procedência em `Liceu/frameworks/arquitetura-de-agents-kolden/procedencia.md`. Divergências declaradas em §8. Handoff para `diff-cirurgico.md`.*
