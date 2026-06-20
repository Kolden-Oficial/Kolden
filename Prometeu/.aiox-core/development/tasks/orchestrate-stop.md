---
title: Orchestrate Stop
description: Para a execução do orquestrador para uma story
agent: aiox-master
version: 1.0.0
story: '0.9'
epic: '0'
---

# Comando \*orchestrate-stop

Para a execução do orquestrador para uma story.

## Uso

```
*orchestrate-stop {story-id}
```

## Exemplos

```bash
# Parar a execução da STORY-42
*orchestrate-stop STORY-42
```

## Saída

```
🛑 Parando o orquestrador para a STORY-42...

Estado atual: in_progress
Epic atual: 4

Salvando estado para retomada...
Estado salvo em: .aiox/master-orchestrator/STORY-42.json

✅ Orquestrador parado com sucesso.
   Execute *orchestrate-resume STORY-42 para continuar.
```

## Comportamento

1. Localiza o orquestrador em execução para a story
2. Para graciosamente a execução do epic atual
3. Salva o estado atual para retomada
4. Atualiza o status do dashboard para "stopped"
5. Envia notificação

## Códigos de Saída

- 0: Sucesso
- 1: Story não encontrada ou não em execução
- 3: Argumentos inválidos
