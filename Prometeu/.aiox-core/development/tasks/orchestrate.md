---
title: Orchestrate Pipeline
description: Inicia o pipeline ADE completo para uma story
agent: aiox-master
version: 1.0.0
story: '0.9'
epic: '0'
---

# Comando \*orchestrate

Inicia o pipeline do ADE Master Orchestrator para uma determinada story.

## Uso

```
*orchestrate {story-id} [options]
```

## Opções

- `--epic N` - Inicia a partir de um epic específico (3, 4, 6 ou 7)
- `--dry-run` - Pré-visualiza o pipeline sem executá-lo
- `--strict` - Habilita o modo de gate estrito (qualquer falha = parada)

## Exemplos

```bash
# Pipeline completo
*orchestrate STORY-42

# Iniciar a partir do Epic 4
*orchestrate STORY-42 --epic 4

# Apenas pré-visualização
*orchestrate STORY-42 --dry-run

# Modo estrito
*orchestrate STORY-42 --strict
```

## Comportamento

1. Valida o ID da story
2. Inicializa o MasterOrchestrator
3. Detecta a stack tecnológica (pré-voo)
4. Executa os epics em sequência: 3 → 4 → 6 → 7
5. Avalia os quality gates entre os epics
6. Trata erros com recuperação automática
7. Salva o estado para capacidade de retomada
8. Atualiza o status do dashboard

## Saída

- Progresso em tempo real no terminal
- Status do dashboard em `.aiox/dashboard/status.json`
- Estado salvo em `.aiox/master-orchestrator/{story-id}.json`
- Logs em `.aiox/logs/{story-id}.log`

## Códigos de Saída

- 0: Sucesso
- 1: Pipeline falhou
- 2: Pipeline bloqueado (falha de gate)
- 3: Argumentos inválidos
