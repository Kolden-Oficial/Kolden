---
title: Orchestrate Resume
description: Retoma a execução do orquestrador a partir do estado salvo
agent: aiox-master
version: 1.0.0
story: '0.9'
epic: '0'
---

# Comando \*orchestrate-resume

Retoma a execução do orquestrador a partir do último estado salvo.

## Uso

```
*orchestrate-resume {story-id}
```

## Exemplos

```bash
# Retomar a STORY-42 de onde parou
*orchestrate-resume STORY-42
```

## Saída

```
🔄 Retomando o orquestrador para a STORY-42...

Carregando estado de: .aiox/master-orchestrator/STORY-42.json

Estado anterior:
  Status: stopped
  Último Epic: 4 (Execution Engine)
  Progresso: 45%
  Parado em: 2026-01-29 11:30:00

Retomando a partir do Epic 4...

⏳ Continuando o Epic 4: Execution Engine
...
```

## Comportamento

1. Carrega o estado salvo de `.aiox/master-orchestrator/{story-id}.json`
2. Valida se o estado é retomável (não concluído, não corrompido)
3. Restaura o orquestrador ao estado anterior
4. Continua a execução a partir do último epic concluído
5. Atualiza o status do dashboard para "in_progress"

## Códigos de Saída

- 0: Sucesso
- 1: Nenhum estado salvo encontrado
- 2: O estado não é retomável (concluído ou corrompido)
- 3: Argumentos inválidos
