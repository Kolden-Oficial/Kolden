---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Task: Build Resume

> **Comando:** `*build-resume {story-id}`
> **Agente:** @dev
> **Story:** 8.4 - Build Recovery & Resume
> **AC:** AC3

---

## Propósito

Retomar um build autônomo a partir do seu último checkpoint após falha ou interrupção.

---

## Uso

```bash
*build-resume {story-id}
```

### Argumentos

| Argumento | Obrigatório | Descrição                            |
| --------- | ----------- | ------------------------------------ |
| story-id  | Sim         | Identificador da story (ex.: "story-8.4") |

---

## Workflow

```yaml
steps:
  - name: Carregar Estado do Build
    action: |
      Carregar o estado do build de plan/build-state.json
      Verificar se o estado existe e é retomável
    validates:
      - O arquivo de estado existe
      - O status não é "completed"

  - name: Obter Último Checkpoint
    action: |
      Identificar o último checkpoint bem-sucedido
      Determinar a próxima subtask a executar
    outputs:
      - lastCheckpoint
      - nextSubtask
      - completedSubtasks

  - name: Restaurar Contexto
    action: |
      - Verificar se o worktree ainda existe (se aplicável)
      - Carregar o plano de implementação
      - Restaurar a posição atual
    validates:
      - Worktree acessível
      - O arquivo do plano existe

  - name: Atualizar Estado
    action: |
      - Definir o status como "in_progress"
      - Limpar flags de abandono
      - Adicionar notificação de retomada

  - name: Exibir Resumo da Retomada
    action: |
      Mostrar:
      - ID da story
      - ID do último checkpoint
      - Contagem de subtasks concluídas
      - Próxima subtask a executar
      - Caminho do worktree (se houver)

  - name: Continuar Execução
    action: |
      Retomar o loop de build autônomo a partir da próxima subtask
      (Integra com o comando *build-autonomous)
```

---

## Exemplo de Saída

```
✓ Build retomado para story-8.4

  Do checkpoint: cp-lxyz123-abc456
  Concluídas: 4 subtasks
  Próxima subtask: 2.3
  Worktree: .worktrees/story-8.4

Retomando build...
```

---

## Tratamento de Erros

| Erro                    | Resolução                                  |
| ----------------------- | ------------------------------------------ |
| Nenhum estado de build encontrado | Rode `*build {story-id}` para iniciar um novo build |
| Build já concluído      | Não é possível retomar um build concluído  |
| Worktree ausente        | Recrie o worktree ou comece do zero        |
| Checkpoint inválido     | Tente o checkpoint anterior ou comece do zero |

---

## Integração

- **Usa:** `BuildStateManager.resumeBuild()`
- **Requer:** `plan/build-state.json`
- **Atualiza:** Status do estado, notificações, log de tentativas

---

## Comandos Relacionados

- `*build-status {story-id}` - Verificar o status do build
- `*build {story-id}` - Iniciar novo build
- `*build-log {story-id}` - Visualizar o log de tentativas

---

_Arquivo de task para a Story 8.4 - Build Recovery & Resume_
