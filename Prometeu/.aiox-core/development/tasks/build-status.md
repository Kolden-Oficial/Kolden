---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Task: Build Status

> **Comando:** `*build-status {story-id}` ou `*build-status --all`
> **Agente:** @dev
> **Story:** 8.4 - Build Recovery & Resume
> **AC:** AC4

---

## Propósito

Exibir o status atual de builds autônomos, incluindo progresso, métricas e indicadores de saúde.

---

## Uso

```bash
# Status de um único build
*build-status {story-id}

# Todos os builds ativos
*build-status --all
```

### Argumentos

| Argumento | Obrigatório | Descrição                                |
| --------- | ----------- | ---------------------------------------- |
| story-id  | Não\*       | Identificador da story (obrigatório, exceto com --all) |
| --all     | Não         | Mostrar todos os builds ativos           |

---

## Workflow

```yaml
steps:
  - name: Carregar Estado
    action: |
      Se --all: Encontrar todos os arquivos build-state.json
      Senão: Carregar o estado da story específica

  - name: Verificar Abandono
    action: |
      Verificar o timestamp da última atividade
      Marcar como abandonado se inativo > 1 hora
    threshold: 3600000ms (1 hora)

  - name: Calcular Métricas
    action: |
      - Percentual de progresso
      - Duração desde o início
      - Tempo médio por subtask
      - Contagem de falhas

  - name: Formatar Saída
    action: |
      Exibir status formatado com:
      - Barra de progresso visual
      - Fase/subtask atual
      - Resumo de métricas
      - Falhas recentes (se houver)
      - Contagem de notificações
```

---

## Exemplo de Saída

### Build Único

```
Status do Build: story-8.4
──────────────────────────────────────────────────
Status:      IN_PROGRESS
Iniciado:    2026-01-29T10:00:00Z
Duração:     1h 30m
Última verif.: 2026-01-29T11:25:00Z

Progresso:   [████████████░░░░░░░░░░░░░░░░░░] 40%
             4/10 subtasks

Atual:       2.3
Fase:        phase-2

Métricas:
  Tentativas: 6
  Falhas:    2
  Tempo médio: 12m/subtask
  Checkpts:  4

📬 1 notificação(ões) não lida(s)

Falhas Recentes:
  • [2.2] TypeError: Cannot read property...
──────────────────────────────────────────────────
```

### Todos os Builds

```
Todos os Builds Ativos
══════════════════════════════════════════════════════════════════════
◐ story-8.4              in_progress  4/10     1h 30m
✓ story-7.2              completed    8/8      45m
✗ story-6.1              failed       3/5      2h 15m
○ story-9.1              pending      0/12     0s

══════════════════════════════════════════════════════════════════════
```

---

## Ícones de Status

| Ícone | Status      | Descrição           |
| ----- | ----------- | ------------------- |
| ○     | pending     | Build não iniciado  |
| ◐     | in_progress | Build em execução   |
| ◑     | paused      | Build pausado       |
| ✗     | abandoned   | Sem atividade > 1h  |
| ✗     | failed      | Build falhou        |
| ✓     | completed   | Build bem-sucedido  |

---

## Indicadores de Saúde

O status inclui verificações de saúde:

1. **Detecção de Abandono** - Avisa se não houver atividade por > 1 hora
2. **Detecção de Travamento** - Avisa se a mesma subtask falha repetidamente
3. **Contagem de Notificações** - Mostra notificações não lidas

---

## Integração

- **Usa:** `BuildStateManager.getStatus()`, `BuildStateManager.getAllBuilds()`
- **Verifica:** Estado abandonado (AC5)
- **Formato:** Amigável para CLI, com cores e barras de progresso

---

## Comandos Relacionados

- `*build-resume {story-id}` - Retomar build pausado/com falha
- `*build {story-id}` - Iniciar novo build
- `*build-log {story-id}` - Visualizar o log de tentativas
- `*build-cleanup` - Limpar builds abandonados

---

_Arquivo de task para a Story 8.4 - Build Recovery & Resume_
