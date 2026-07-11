---
name: spec-build-review
description: |
  Orquestra o ciclo completo Spec → Build → Review de ponta a ponta para uma story,
  encadeando os três pipelines do aiox-core (spec-pipeline, development-cycle, qa-loop)
  com dois gates de aprovação humana entre as fases. Use quando o usuário quer levar
  uma ideia/requisito de informal até código revisado, parando para decisão humana
  após a especificação e após a implementação. Não faz git push (autoridade @devops).
user-invocable: true
argument-hint: "<storyId | descrição da feature> [--resume]"
tipo: skill
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
---

# Spec → Build → Review

Maestro de um único comando para o ciclo de desenvolvimento agêntico do aiox-core.
Não reimplementa nada: **lê as sequências dos pipelines existentes e as executa via
subagentes do Claude Code**, inserindo dois gates humanos. As tasks e personas do
aiox-core são a fonte de verdade de cada passo; esta skill é a cola entre as três fases.

```
/spec-build-review "<descrição ou storyId>"
   │
   ▼  ESTÁGIO 1 — SPEC   (sequência de spec-pipeline.yaml)
   ▼  ═══ GATE 1 (humano): GO · REVISAR · ABORTAR ═══
   ▼  ESTÁGIO 2 — BUILD  (sequência de development-cycle.yaml, SEM push)
   ▼  ═══ GATE 2 (humano): GO · REVISAR · ABORTAR ═══
   ▼  ESTÁGIO 3 — REVIEW (loop de qa-loop.yaml, máx 5 iterações)
   ▼  Relatório consolidado — PARA aqui (push é passo manual separado)
```

## Quando usar / quando não usar

- **Use** quando há uma feature/story a desenvolver de ponta a ponta com supervisão humana nos gates.
- **Não use** para: correção trivial de uma linha (vá direto ao `@dev`), pesquisa (use `deep-research`/`tech-search`), ou orquestração de epic multi-story (isso é `@pm *execute-epic` / `epic-orchestration`).

## Princípios inegociáveis

1. **Skill-native.** Toda execução acontece dentro do Claude Code via subagentes (ferramenta `Task`/Agent). Não depende do engine Node (`workflow-executor.js`).
2. **Gated.** Para de verdade nos dois gates e espera decisão humana via `AskUserQuestion`. Nunca pula um gate.
3. **Sem push.** O ciclo entrega tudo pronto e para. `git push`/`gh pr create` é autoridade EXCLUSIVA do `@devops` e exige ordem explícita (CLAUDE.md / agent-authority.md). Não fazer aqui.
4. **No Invention** (Constitution Art. IV). Cada passo deriva dos inputs; nada inventado. As tasks do aiox-core já aplicam esse gate.
5. **PT-BR** em toda saída ao usuário, logs e artefatos narrativos.

---

## Entrada e estado

### Parse do argumento

`$ARGUMENTS` pode ser:

| Forma | Interpretação |
|-------|---------------|
| Bate com diretório existente `docs/stories/{id}/` ou tem cara de ID (`epic-NNN`, `NN.N`, `STORY-NN`) | **storyId existente** — retomar/continuar nessa story |
| Texto livre ("quero um endpoint que…") | **nova story** — derive um `storyId` em kebab-case a partir do texto, crie `docs/stories/{storyId}/`, e use o texto como fonte de requisitos (`source=user`) |
| Contém `--resume` | Retomar a partir do `.sbr-state.json` da story (ver Retomada) |

Se o argumento estiver vazio, pergunte ao usuário o que será desenvolvido antes de prosseguir.

### Estado unificado

Arquivo único por story: `docs/stories/{storyId}/.sbr-state.json`. Spans as três fases (o `spec/.pipeline-state.json` e o `qa/loop-status.json` continuam sendo escritos pelas tasks internas; este é o estado de nível superior).

```json
{
  "version": "1.0",
  "sessionId": "sbr-{storyId}",
  "storyId": "{storyId}",
  "status": "in_progress | done | aborted | escalated",
  "currentStage": "spec | gate1 | build | gate2 | review | done",
  "complexity": "SIMPLE | STANDARD | COMPLEX | null",
  "stageResults": {
    "spec":   { "verdict": null, "artifacts": [] },
    "build":  { "qualityGate": null, "filesTouched": [] },
    "review": { "finalVerdict": null, "iterations": 0 }
  },
  "gateDecisions": [
    { "gate": 1, "decision": "GO|REVISAR|ABORTAR", "notes": "" }
  ],
  "history": []
}
```

**Grave um checkpoint no `.sbr-state.json` ANTES de avançar de estágio e ANTES de cada gate.** É o que permite retomar após uma parada/crash.

---

## Orquestração

### Como despachar cada passo (template)

Cada passo de cada estágio é executado por um **subagente** via ferramenta `Task` (subagent_type `general-purpose`), nunca inline pelo maestro. Prompt-base do subagente:

```
Você é o agente @{agente} ({persona}) do aiox-core. Execute EXATAMENTE a task
`.aiox-core/development/tasks/{task}.md`, seguindo seus inputs/outputs e gates.

Contexto:
- storyId: {storyId}
- Diretório da story: docs/stories/{storyId}/
- Inputs disponíveis: {lista de artefatos já gerados}

Regras: PT-BR; No Invention (Art. IV) — derive só dos inputs; NÃO faça git push nem
gh pr; escreva os artefatos nos caminhos que a task especifica. Ao terminar, retorne
um JSON com: {{ "ok": bool, "outputs": [caminhos], "verdict": "...", "resumo": "..." }}.
```

Verifique o retorno por inspeção dos artefatos no disco (Read/Grep), **não** apenas pelo relatório do subagente. Se a persona não puder ser "vestida" pelo subagente, embuta o conteúdo da task diretamente no prompt como fallback.

---

### ESTÁGIO 1 — SPEC

Espelha a sequência de `.aiox-core/development/workflows/spec-pipeline.yaml`. Saídas em `docs/stories/{storyId}/spec/`.

| # | Agente | Task | Saída | Pular se |
|---|--------|------|-------|----------|
| 1 | @pm | `spec-gather-requirements.md` | `requirements.json` | nunca |
| 2 | @architect | `spec-assess-complexity.md` | `complexity.json` | `source=simple` |
| 3 | @analyst | `spec-research-dependencies.md` | `research.json` | complexity = SIMPLE |
| 4 | @pm | `spec-write-spec.md` | `spec.md` | nunca |
| 5 | @qa | `spec-critique.md` | `critique.json` (`verdict`) | nunca |
| 6 | @architect | `plan-create-implementation.md` | `plan.json` | verdict ≠ APPROVED |

Após o passo 2, **leia `complexity.json`** e ajuste quais passos rodar:
- **SIMPLE** (score ≤ 8): passos 1 → 4 → 5 (pula 2/3, ou já rodou 2).
- **STANDARD** (9–15): todos os 6.
- **COMPLEX** (≥ 16): todos os 6 + uma rodada de revisão (re-spec → re-critique) antes do plano.

O passo 5 (`critique`) é gate interno: `BLOCKED` → não siga para o plano; leve o motivo ao Gate 1 como bloqueio. `NEEDS_REVISION` → rode uma revisão (re-spec) antes do Gate 1 (máx 2 iterações).

Ao fim: atualize `.sbr-state.json` (`currentStage: gate1`, `stageResults.spec.verdict`, artifacts).

---

### ═══ GATE 1 (humano) ═══

Apresente um resumo curto: título, classe de complexidade, `verdict` do critique, riscos principais e o plano (`plan.json`). Liste os caminhos dos artefatos. Então use `AskUserQuestion`:

- **GO** → segue para o Estágio 2 (Build).
- **REVISAR** → pergunte o que ajustar, rode re-spec (passo 4) + re-critique (passo 5) com o feedback, e volte ao Gate 1.
- **ABORTAR** → `status: aborted`, encerra com resumo.

**Regra dura:** se `critique.verdict == BLOCKED`, **não ofereça GO** — só REVISAR ou ABORTAR.

Registre a decisão em `gateDecisions`.

---

### ESTÁGIO 2 — BUILD

Espelha `.aiox-core/development/workflows/development-cycle.yaml`, **omitindo as fases de push e PR** por design.

| # | Agente | Task / Ação | Saída |
|---|--------|-------------|-------|
| 1 | @po | `validate-next-story.md` (checklist 10 pontos, GO ≥ 7) | `validation_result` |
| 2 | @dev | `dev-develop-story.md` (implementa contra `spec.md` + `plan.json`) | código + File List |
| 3 | @dev | self-heal via skill `coderabbit-review` (máx 2 iter, CRITICAL+HIGH) | relatório |
| 4 | @qa | `qa-gate.md` (7 verificações) | `quality_gate` (PASS/CONCERNS/FAIL/WAIVED) |

Se o passo 1 der NO-GO (< 7), retorne ao usuário com as correções obrigatórias (a story precisa de ajuste antes de codar) — trate como mini-gate, não force.
Se o passo 4 der FAIL, **não** vá ao Gate 2 automaticamente: isso é o sinal de que o Estágio 3 (Review/QA-loop) é necessário — mas a política gated manda parar e relatar no Gate 2 com o veredito FAIL.

Atualize `.sbr-state.json` (`currentStage: gate2`, `qualityGate`, `filesTouched`).

---

### ═══ GATE 2 (humano) ═══

Apresente: arquivos criados/modificados, resultado do `qa-gate` (PASS/CONCERNS/FAIL), e o `git diff --stat` do working tree. `AskUserQuestion`:

- **GO** → segue para o Estágio 3 (Review).
- **REVISAR** → pergunte o que ajustar, re-rode `@dev develop` com o feedback, volte ao Gate 2.
- **ABORTAR** → `status: aborted`, encerra (deixa o código no working tree para inspeção; não reverte sem ordem).

Registre a decisão.

---

### ESTÁGIO 3 — REVIEW

Espelha o loop de `.aiox-core/development/workflows/qa-loop.yaml`. Estado interno em `qa/loop-status.json`. Máx `maxIterations = 5`.

```
iteração = 1
LOOP:
  @qa  → qa-review-story.md      → veredito: APPROVE | REJECT | BLOCKED
  SE APPROVE  → concluir
  SE BLOCKED  → escalar (parar, pacote de contexto ao humano)
  SE REJECT:
     @qa  → qa-create-fix-request.md   → fix-request.md
     @dev → dev-apply-qa-fixes.md       → aplica + roda testes
     iteração++; SE iteração > 5 → escalar
  repetir
```

Ao fim (APPROVE ou escalonamento): atualize `.sbr-state.json` (`currentStage: done` ou `escalated`, `finalVerdict`, `iterations`).

---

### Conclusão

Emita um relatório consolidado em PT-BR:

```markdown
## Spec → Build → Review — {storyId}

| Fase   | Resultado                          |
|--------|------------------------------------|
| Spec   | {verdict} (complexidade {classe})  |
| Build  | quality gate {PASS/CONCERNS/FAIL}  |
| Review | {APPROVE/escalado} em {N} iterações|

Artefatos: docs/stories/{storyId}/ (spec/, qa/, código no working tree)

Próximo passo (manual): revisar o diff e, quando aprovado, pedir o push:
  @devops *push   (ou autorizar git push explicitamente)
```

**Lembrete final:** não faça commit nem push. Pare aqui.

---

## Retomada (`--resume`)

1. Leia `docs/stories/{storyId}/.sbr-state.json`.
2. Pule para `currentStage` e continue. Se parou num gate, reapresente o gate.
3. Cada estágio é idempotente o suficiente: se um artefato já existe e está íntegro, não re-rode o passo (a menos que o gate anterior tenha pedido REVISAR).

## Tratamento de erros / escalonamento

| Situação | Ação |
|----------|------|
| `critique.verdict = BLOCKED` no Spec | Gate 1 sem opção GO; escalar a @architect se o humano pedir |
| `validate-next-story` NO-GO | Parar, devolver correções obrigatórias antes do Build |
| `qa-gate = FAIL` no Build | Reportar no Gate 2; humano decide GO (→ Review corrige) ou REVISAR |
| QA-loop atinge 5 iterações ou BLOCKED | `status: escalated`; entregar pacote de contexto (loop-status.json, gates, fix-requests) ao humano |
| Subagente falha/timeout | 1 retry; se persistir, parar o estágio e relatar com o estado salvo |
| `.sbr-state.json` corrompido | Não adivinhar; pedir ao usuário para resetar ou reconstruir a partir dos artefatos no disco |

## Não-objetivos (escopo travado v1)

- Não toca em `workflow-executor.js` nem em arquivos L1/L2 (`.aiox-core/development/{tasks,templates,workflows}` são read-only aqui).
- Não faz `git push` / `gh pr create` / commit.
- Não orquestra múltiplas stories em paralelo (sem waves/epic-orchestration).
- Não modifica as tasks/personas do aiox-core — só as invoca.

## Referências (read-only)

- `.aiox-core/development/workflows/spec-pipeline.yaml`
- `.aiox-core/development/workflows/development-cycle.yaml`
- `.aiox-core/development/workflows/qa-loop.yaml`
- `.claude/rules/agent-authority.md` · `.claude/rules/story-lifecycle.md` · `.claude/rules/workflow-execution.md`
