# Task: Story Checkpoint

## Story 11.3: Development Cycle Workflow

Task de checkpoint entre stories no Development Cycle.
Requer decisão humana para continuar, pausar, revisar ou abortar.

---

## Metadata

```yaml
task_id: story-checkpoint
version: "1.0.0"
agent: "@po"
elicit: true  # REQUIRES human interaction
epic: "11 - Projeto Bob"
story: "11.3"
```

---

## Propósito

Pausar o workflow de desenvolvimento entre stories para perguntar ao usuário qual ação tomar. Garante que o usuário mantém controle sobre o fluxo de trabalho.

---

## Entradas

| Entrada | Tipo | Obrigatório | Descrição |
|-------|------|----------|-------------|
| `story_file` | path | Sim | Caminho para o arquivo da story concluída |
| `pr_url` | string | Não | URL do PR criado (se o push teve sucesso) |
| `implementation` | object | Não | Detalhes da implementação da fase de desenvolvimento |
| `review_result` | object | Não | Resultado da revisão do quality gate |

---

## Execução

### Passo 1: Gerar Resumo

```yaml
summary:
  story_completed:
    file: "${story_file}"
    executor: "${story.executor}"
    quality_gate: "${story.quality_gate}"

  implementation:
    files_created: "${implementation.files_created.length}"
    files_modified: "${implementation.files_modified.length}"
    tests_added: "${implementation.tests_added.length}"

  quality_gate:
    verdict: "${review_result.verdict}"
    score: "${review_result.score}"

  pr:
    url: "${pr_url}"
    status: "${pr_url ? 'Created' : 'Pending'}"
```

### Passo 2: Exibir Resumo

```
═══════════════════════════════════════════════════════════════════
                    📋 STORY CHECKPOINT
═══════════════════════════════════════════════════════════════════

Story Concluída: ${story_file}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Resumo da Implementação:
   • Arquivos Criados:    ${implementation.files_created.length}
   • Arquivos Modificados: ${implementation.files_modified.length}
   • Testes Adicionados:  ${implementation.tests_added.length}

✅ Quality Gate: ${review_result.verdict} (${review_result.score}/100)

🔗 PR: ${pr_url || 'Ainda não criado'}

═══════════════════════════════════════════════════════════════════
```

### Passo 3: Elicitar Decisão

```yaml
elicitation:
  type: single_choice
  required: true
  timeout: 30m

  prompt: |
    Story concluída! O que você gostaria de fazer a seguir?

  options:
    - id: GO
      label: "🚀 GO - Continuar para a próxima story"
      description: |
        Continuar o ciclo de desenvolvimento com a próxima story do epic.
        O workflow vai carregar e validar a próxima story automaticamente.
      action: suggest_next_story

    - id: PAUSE
      label: "⏸️ PAUSE - Salvar estado e parar"
      description: |
        Salvar o estado atual do workflow e parar a execução.
        Você pode retomar depois com *workflow resume development-cycle.
      action: save_session_state

    - id: REVIEW
      label: "🔍 REVIEW - Mostrar o que foi feito"
      description: |
        Exibir um resumo detalhado de todas as mudanças feitas nesta story.
        Inclui diffs de arquivos, resultados de testes e achados do quality gate.
      action: show_detailed_summary

    - id: ABORT
      label: "⛔ ABORT - Parar o epic"
      description: |
        Parar completamente o trabalho neste epic.
        Todo o progresso é salvo, mas o workflow não vai continuar.
      action: abort_epic

  display_format: |
    ┌─────────────────────────────────────────────────────────────┐
    │                   O que vem a seguir?                       │
    ├─────────────────────────────────────────────────────────────┤
    │                                                             │
    │   [1] 🚀 GO     - Continuar para a próxima story           │
    │   [2] ⏸️ PAUSE  - Salvar estado e parar                    │
    │   [3] 🔍 REVIEW - Mostrar o que foi feito                  │
    │   [4] ⛔ ABORT  - Parar o epic                             │
    │                                                             │
    └─────────────────────────────────────────────────────────────┘

    Digite sua escolha (1-4):
```

---

## Ações

### Ação GO: Sugerir Próxima Story

```yaml
action: suggest_next_story
steps:
  1_find_next:
    description: "Encontrar a próxima story no epic"
    logic: |
      - Ler o arquivo do epic para obter a lista de stories
      - Encontrar a posição da story atual
      - Obter a próxima story (status = Draft ou Approved)
      - Se não houver mais stories, reportar "Epic concluído"

  2_validate_next:
    description: "Validar que a próxima story está pronta"
    checks:
      - Tem executor atribuído
      - Tem quality_gate atribuído
      - Status é Draft ou Approved
      - Dependências estão satisfeitas

  3_confirm:
    description: "Confirmar com o usuário"
    prompt: |
      Próxima story: ${next_story.title}
      Executor: ${next_story.executor}
      Quality Gate: ${next_story.quality_gate}

      Iniciar desenvolvimento? (Y/n)

  4_transition:
    description: "Transicionar para a próxima story"
    actions:
      - Atualizar o estado do workflow com a nova story
      - Resetar a fase para 1_validation
      - Continuar a execução do workflow
```

### Ação PAUSE: Salvar Estado da Sessão

```yaml
action: save_session_state
steps:
  1_save_state:
    description: "Persist workflow state"
    location: ".aiox/workflow-state/${story_id}-state.yaml"
    content:
      workflow_id: development-cycle
      current_story: "${story_file}"
      current_phase: "6_checkpoint"
      paused_at: "${timestamp}"
      epic_progress:
        completed_stories: []
        remaining_stories: []
      accumulated_context: {}

  2_confirm:
    description: "Confirm state saved"
    message: |
      ✅ Workflow state saved!

      To resume later, run:
        *workflow resume development-cycle

      Or activate @po and run:
        *validate-story-draft ${next_story}

  3_exit:
    description: "Exit workflow"
    status: paused
```

### REVIEW Action: Show Detailed Summary

```yaml
action: show_detailed_summary
steps:
  1_gather_data:
    description: "Collect all changes"
    data:
      - Git diff since workflow start
      - All files created/modified/deleted
      - Test results
      - Quality gate findings
      - PR details

  2_display:
    description: "Show detailed summary"
    format: |
      ═══════════════════════════════════════════════════════════════════
                         📊 DETAILED SUMMARY
      ═══════════════════════════════════════════════════════════════════

      Story: ${story_file}
      Duration: ${duration}

      ─────────────────────────────────────────────────────────────────────
      📁 FILES CHANGED
      ─────────────────────────────────────────────────────────────────────

      Created:
      ${files_created.map(f => '  + ' + f).join('\n')}

      Modified:
      ${files_modified.map(f => '  ~ ' + f).join('\n')}

      ─────────────────────────────────────────────────────────────────────
      🧪 TEST RESULTS
      ─────────────────────────────────────────────────────────────────────

      Passed: ${test_results.passed}
      Failed: ${test_results.failed}
      Skipped: ${test_results.skipped}

      ─────────────────────────────────────────────────────────────────────
      ✅ QUALITY GATE
      ─────────────────────────────────────────────────────────────────────

      Verdict: ${review_result.verdict}
      Score: ${review_result.score}/100

      Findings:
      ${review_result.findings.map(f => '  • ' + f).join('\n')}

      ═══════════════════════════════════════════════════════════════════

  3_return:
    description: "Return to checkpoint"
    action: "Re-display checkpoint options"
```

### ABORT Action: Stop Epic

```yaml
action: abort_epic
steps:
  1_confirm:
    description: "Confirm abort"
    prompt: |
      ⚠️ Are you sure you want to abort the epic?

      This will:
      - Stop the development cycle
      - Save current progress
      - NOT affect completed stories

      Abort? (yes/no)

  2_save_final_state:
    description: "Save abort state"
    location: ".aiox/workflow-state/${story_id}-state.yaml"
    status: aborted

  3_report:
    description: "Report abort"
    message: |
      ⛔ Epic aborted.

      Progress saved. Completed stories are unaffected.

      To review progress:
        *backlog-summary

      To restart:
        *workflow development-cycle ${next_incomplete_story}

  4_exit:
    description: "Exit workflow"
    status: aborted
```

---

## Output

```yaml
output:
  decision:
    type: enum
    values: [GO, PAUSE, REVIEW, ABORT]

  next_story:
    type: path
    optional: true
    description: "Path to next story (only if GO)"

  state_file:
    type: path
    optional: true
    description: "Path to saved state file (if PAUSE or ABORT)"
```

---

## Error Handling

| Error | Handling |
|-------|----------|
| No next story found | Display "Epic complete" message |
| Next story not ready | Display warning, allow manual selection |
| State save failed | Retry 3x, then warn user |
| User timeout | Default to PAUSE after 30 minutes |

---

## Related

- **Workflow:** `d