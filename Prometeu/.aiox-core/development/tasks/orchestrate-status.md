---
title: Orchestrate Status
description: Mostra o status do orquestrador para uma story
agent: aiox-master
version: 1.0.0
story: '0.9'
epic: '0'
---

# Comando \*orchestrate-status

Mostra o status atual da execução do orquestrador para uma story.

## Uso

```
*orchestrate-status {story-id}
```

## Exemplos

```bash
# Mostrar o status da STORY-42
*orchestrate-status STORY-42
```

## Saída

```
📊 Status do Orquestrador: STORY-42
═══════════════════════════════════════

Estado: in_progress
Epic Atual: 4 (Execution Engine)
Progresso: 45%

Status dos Epics:
  ✅ Epic 3: Spec Pipeline - concluído
  ⏳ Epic 4: Execution Engine - em andamento (60%)
  ⏸️ Epic 6: QA Loop - pendente
  ⏸️ Epic 7: Memory Layer - pendente

Iniciado: 2026-01-29 10:00:00
Atualizado: 2026-01-29 11:30:00
Duração: 1h 30m

Erros: 0
Bloqueado: Não
```

## Comportamento

1. Lê o estado de `.aiox/master-orchestrator/{story-id}.json`
2. Lê o status do dashboard de `.aiox/dashboard/status.json`
3. Formata e exibe o status atual
4. Mostra o detalhamento do progresso dos epics
5. Lista quaisquer erros ou avisos

## Códigos de Saída

- 0: Sucesso
- 1: Story não encontrada
- 3: Argumentos inválidos
