# Task: Build Autônomo

> **Comando:** `*build-autonomous {story-id}`
> **Agente:** @dev
> **Story:** 8.1 - Coder Agent Loop
> **AC:** AC5

---

## Propósito

Iniciar um loop de build autônomo para uma story, executando subtasks com retries automáticos e autocrítica.

Isto implementa o padrão **Coder Agent Loop** do Auto-Claude, fornecendo:

- Retry automático em caso de falha (máximo de 3 tentativas por subtask)
- Autocrítica em marcos de implementação
- Proteção por timeout global (configurável)
- Rastreamento de progresso orientado a eventos
- Integração de recuperação baseada em checkpoints

---

## Uso

```bash
*build-autonomous {story-id}
*build-autonomous {story-id} --worktree    # Usar isolamento por worktree
*build-autonomous {story-id} --timeout=60  # Definir timeout global (minutos)
```

### Argumentos

| Argumento | Obrigatório | Descrição                            |
| --------- | ----------- | ------------------------------------ |
| story-id  | Sim         | Identificador da story (ex.: "story-8.1") |

### Opções

| Opção         | Padrão  | Descrição                    |
| ------------- | ------- | ---------------------------- |
| --worktree    | false   | Executar em worktree isolado |
| --timeout     | 30      | Timeout global em minutos    |
| --max-retries | 3       | Máximo de retries por subtask|

---

## Workflow

```yaml
steps:
  - name: Inicializar Build
    action: |
      1. Carregar o arquivo da story de docs/stories/
      2. Carregar o plano de implementação de plan/implementation.yaml
      3. Inicializar o BuildStateManager
      4. Criar o estado do build com status "in_progress"
    validates:
      - A story existe e está aprovada
      - O plano de implementação existe
      - Não há build conflitante em andamento

  - name: Configurar Worktree (se --worktree)
    action: |
      1. Criar worktree isolado para a story
      2. Definir o caminho do worktree no estado do build
    skip_if: a opção worktree é false

  - name: Executar Loop de Build
    action: |
      PARA CADA subtask em implementation.yaml:
        1. Rastrear início da tentativa (RecoveryTracker)
        2. **Verificação Code Intelligence IDS G4** (antes de criar novos arquivos):
           - Se `isCodeIntelAvailable()` (de `.aiox-core/core/code-intel`):
             - Chamar `checkBeforeWriting(fileName, description)` do `dev-helper`
             - Se duplicatas detectadas: registrar no decision-log e exibir como aviso
             - NÃO bloqueia a execução (o modo autônomo continua)
           - Se code intelligence não disponível: pular silenciosamente
        3. Executar subtask (workflow plan-execute-subtask.md)
        4. Autocrítica nos passos 5.5 e 6.5
        5. Verificar conclusão (workflow verify-subtask.md)
        6. Criar checkpoint em caso de sucesso

        SE falha:
          - Incrementar contagem de tentativas
          - SE tentativas < maxRetries: retry
          - SENÃO: marcar como falha, continuar ou parar

        SE timeout global excedido:
          - Marcar o build como "timed_out"
          - Salvar estado para retomada
          - PARAR
    outputs:
      - completedSubtasks
      - failedSubtasks
      - totalDuration

  - name: Finalizar Build
    action: |
      1. Atualizar o estado do build para "completed" ou "failed"
      2. Gerar relatório do build
      3. Atualizar o status da story
      4. Limpar o worktree (se usado)
```

---

## Eventos Emitidos

O AutonomousBuildLoop emite estes eventos para monitoramento:

| Evento             | Payload                       | Descrição                     |
| ------------------ | ----------------------------- | ----------------------------- |
| BUILD_STARTED      | storyId, totalSubtasks        | Inicialização do build concluída |
| SUBTASK_STARTED    | subtaskId, phase, attempt     | Início da execução da subtask |
| SUBTASK_COMPLETED  | subtaskId, duration           | Subtask concluída com sucesso |
| SUBTASK_FAILED     | subtaskId, error, willRetry   | Falha na execução da subtask  |
| CHECKPOINT_CREATED | checkpointId, subtaskId       | Checkpoint de recuperação salvo |
| BUILD_SUCCESS      | storyId, duration, stats      | Todas as subtasks concluídas  |
| BUILD_FAILED       | storyId, error, failedSubtask | Build interrompido por falha  |
| BUILD_TIMEOUT      | storyId, elapsed, lastSubtask | Timeout global excedido       |

---

## Exemplo de Saída

```
🚀 Iniciando build autônomo para story-8.1

📋 Plano carregado: 12 subtasks
⏱️  Timeout global: 30 minutos
🔄 Máximo de retries: 3

[1/12] Executando: Criar estrutura do componente
  ✓ Implementado (tentativa 1)
  ✓ Autocrítica aprovada
  ✓ Verificado
  📌 Checkpoint: cp-1706500000-abc123

[2/12] Executando: Adicionar gerenciamento de estado
  ✗ Falhou (tentativa 1): Erro de tipo no reducer
  ✓ Implementado (tentativa 2)
  ✓ Autocrítica aprovada
  ✓ Verificado
  📌 Checkpoint: cp-1706500060-def456

...

✅ Build concluído com sucesso!
   Duração: 18m 32s
   Subtasks: 12/12 concluídas
   Retries: 2 no total
```

---

## Tratamento de Erros

| Erro                  | Resolução                                      |
| --------------------- | ---------------------------------------------- |
| Story não encontrada  | Verifique o story-id e o caminho do arquivo    |
| Plano não encontrado  | Rode o spec pipeline primeiro para gerar o plano |
| Build já em execução  | Aguarde a conclusão ou use \*build-status      |
| Máximo de retries excedido | Revise o erro, corrija manualmente, use \*build-resume |
| Timeout global        | Use \*build-resume para continuar              |

---

## Integração

- **Usa:**
  - `AutonomousBuildLoop` de `core/execution/autonomous-build-loop.js`
  - `BuildStateManager` de `core/execution/build-state-manager.js`
  - `RecoveryTracker` de `infrastructure/scripts/recovery-tracker.js`
- **Tasks:**
  - `plan-execute-subtask.md` - Workflow de execução de subtask
  - `verify-subtask.md` - Verificação de conclusão
- **Checklists:**
  - `self-critique-checklist.md` - Passos 5.5 e 6.5

---

## Comandos Relacionados

- `*build-resume {story-id}` - Retomar a partir do checkpoint
- `*build-status {story-id}` - Verificar o progresso do build
- `*build-log {story-id}` - Visualizar o histórico de tentativas
- `*build-cleanup` - Remover builds abandonados

---

_Arquivo de task para a Story 8.1 - Coder Agent Loop_

## Handoff
next_agent: @qa
next_command: *review {story-id}
condition: Build autônomo concluído com sucesso
alternatives:
  - agent: @dev, command: *build-resume {story-id}, condition: Build falhou, precisa de retomada
