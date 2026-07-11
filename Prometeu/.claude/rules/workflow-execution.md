---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.claude/rules/_indice|_indice]]"
---

# Execução de Workflows — Regras Detalhadas

## Princípio Task-First

**Workflows são compostos por tasks conectadas, não por agentes conectados.** Cada task define seus inputs, outputs, pre/post-conditions e execution modes. Os agentes listados abaixo são os **executores padrão** de cada task — mas a sequência, as regras e as dependências vêm das definições de tasks em `.aiox-core/development/tasks/`.

Uma task validada é lei: deve ser executada conforme configurada, com todas as suas dependências respeitadas, independente de quem a executa (agent, worker, clone ou humano).

---

## 4 Workflows Primários

### 1. Story Development Cycle (SDC) — PRIMÁRIO

**Workflow completo de 4 fases para todo trabalho de desenvolvimento.**

#### Fase 1: Criar (@sm)
- **Task:** `create-next-story.md`
- **Inputs:** PRD fragmentado (sharded), contexto do epic
- **Output:** `{epicNum}.{storyNum}.story.md`
- **Status:** Draft

#### Fase 2: Validar (@po)
- **Task:** `validate-next-story.md`
- **Checklist de 10 pontos** (veja `story-lifecycle.md`)
- **Decisão:** GO (>=7) ou NO-GO (correções obrigatórias listadas)

#### Fase 3: Implementar (@dev)
- **Task:** `dev-develop-story.md`
- **Modos:** Interactive / YOLO / Pre-Flight
- **CodeRabbit:** Auto-correção (self-healing) máximo de 2 iterações
- **Status:** Ready → InProgress

#### Fase 4: QA Gate (@qa)
- **Task:** `qa-gate.md`
- **7 verificações de qualidade** (veja `story-lifecycle.md`)
- **Decisão:** PASS / CONCERNS / FAIL / WAIVED
- **Status:** InProgress → InReview → Done

---

### 2. QA Loop — REVISÃO ITERATIVA

**Ciclo automatizado de revisão-correção após o QA gate inicial.**

```
@qa review → verdict → @dev fixes → re-review (max 5)
```

**Comandos:**
- `*qa-loop {storyId}` — Iniciar o loop
- `*qa-loop-review` — Retomar a partir da revisão
- `*qa-loop-fix` — Retomar a partir da correção
- `*stop-qa-loop` — Pausar, salvar estado
- `*resume-qa-loop` — Retomar a partir do estado
- `*escalate-qa-loop` — Forçar escalonamento

**Configuração:**
- Máximo de iterações: 5 (`autoClaude.qaLoop.maxIterations`)
- Arquivo de status: `qa/loop-status.json`

**Veredictos:**
- APPROVE → Concluir, marcar como Done
- REJECT → @dev corrige, re-revisar
- BLOCKED → Escalar imediatamente

**Gatilhos de escalonamento:**
- `max_iterations_reached`
- `verdict_blocked`
- `fix_failure`
- `manual_escalate`

---

### 3. Spec Pipeline — PRÉ-IMPLEMENTAÇÃO

**Transformar requisitos informais em uma spec executável.**

| Fase | Agente | Output | Pular Se |
|-------|-------|--------|---------|
| 1. Coletar | @pm | `requirements.json` | Nunca |
| 2. Avaliar | @architect | `complexity.json` | source=simple |
| 3. Pesquisar | @analyst | `research.json` | Classe SIMPLE |
| 4. Escrever Spec | @pm | `spec.md` | Nunca |
| 5. Criticar | @qa | `critique.json` | Nunca |
| 6. Planejar | @architect | `implementation.yaml` | Se APPROVED |

**Classes de Complexidade:**

| Pontuação | Classe | Fases |
|-------|-------|--------|
| <= 8 | SIMPLE | coletar → spec → criticar (3) |
| 9-15 | STANDARD | Todas as 6 fases |
| >= 16 | COMPLEX | 6 fases + ciclo de revisão |

**5 Dimensões de Complexidade (pontuadas de 1 a 5):**
- **Escopo:** Arquivos afetados
- **Integração:** APIs externas
- **Infraestrutura:** Mudanças necessárias
- **Conhecimento:** Familiaridade da equipe
- **Risco:** Nível de criticidade

**Veredictos da Crítica:**

| Veredicto | Pontuação Média | Próximo Passo |
|---------|--------------|-----------|
| APPROVED | >= 4.0 | Planejar (Fase 6) |
| NEEDS_REVISION | 3.0-3.9 | Revisar (Fase 5b) |
| BLOCKED | < 3.0 | Escalar para @architect |

**Constitutional Gate (Artigo IV — No Invention):**
Toda afirmação em spec.md DEVE rastrear a FR-*, NFR-*, CON-*, ou a um achado de pesquisa. NENHUMA funcionalidade inventada.

---

### 4. Brownfield Discovery — AVALIAÇÃO DE LEGADO

**Avaliação de dívida técnica de 10 fases para codebases existentes.**

**Coleta de Dados (Fases 1-3):**
- Fase 1: @architect → `system-architecture.md`
- Fase 2: @data-engineer → `SCHEMA.md` + `DB-AUDIT.md` (se houver DB)
- Fase 3: @ux-design-expert → `frontend-spec.md`

**Draft e Validação (Fases 4-7):**
- Fase 4: @architect → `technical-debt-DRAFT.md`
- Fase 5: @data-engineer → `db-specialist-review.md`
- Fase 6: @ux-design-expert → `ux-specialist-review.md`
- Fase 7: @qa → `qa-review.md` (QA Gate: APPROVED | NEEDS WORK)

**Finalização (Fases 8-10):**
- Fase 8: @architect → `technical-debt-assessment.md` (final)
- Fase 9: @analyst → `TECHNICAL-DEBT-REPORT.md` (executivo)
- Fase 10: @pm → Epic + stories prontas para desenvolvimento

**QA Gate (Fase 7):**
- **APPROVED:** Todos os débitos validados, sem lacunas críticas, dependências mapeadas
- **NEEDS WORK:** Lacunas não tratadas, retornar à Fase 4

---

## Guia de Seleção de Workflow

| Situação | Workflow |
|-----------|---------|
| Nova story a partir de epic | Story Development Cycle |
| QA encontrou problemas, precisa de iteração | QA Loop |
| Funcionalidade complexa precisa de spec | Spec Pipeline → depois SDC |
| Entrando em projeto existente | Brownfield Discovery |
| Correção simples de bug | Apenas SDC (modo YOLO) |
