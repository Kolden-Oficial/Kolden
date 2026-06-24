---
tools:
  - pm-tool  # Usa a ferramenta de PM configurada (ClickUp, GitHub, Jira, ou somente-local)
---

# pull-story

**Propósito:** Puxar atualizações da story a partir da ferramenta de PM configurada para verificar mudanças externas.

**Quando Usar:**
- Para verificar se o status da story mudou na ferramenta de PM
- Antes de iniciar o trabalho em uma story (garantir que você tem o estado mais recente)
- Para detectar se outra pessoa atualizou a story na ferramenta de PM

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com logging
- Interação mínima com o usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pre-Flight - Planejamento Abrangente Antecipado
- Fase de análise da task (identificar todas as ambiguidades)
- Execução com zero ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: poPullStory()
responsável: Pax (Balancer)
responsavel_type: Agente
atomic_layer: Organism

**Entrada:**
- campo: task
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Deve ser uma task registrada

- campo: parameters
  tipo: object
  origem: User Input
  obrigatório: false
  validação: Parâmetros de task válidos

- campo: mode
  tipo: string
  origem: User Input
  obrigatório: false
  validação: yolo|interactive|pre-flight

**Saída:**
- campo: execution_result
  tipo: object
  destino: Memory
  persistido: false

- campo: logs
  tipo: array
  destino: File (.ai/logs/*)
  persistido: true

- campo: state
  tipo: object
  destino: State management
  persistido: true
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Task is registered; required parameters provided; dependencies met
    tipo: pre-condition
    blocker: true
    validação: |
      Check task is registered; required parameters provided; dependencies met
    error_message: "Pre-condition failed: Task is registered; required parameters provided; dependencies met"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a task ser concluída

**Checklist:**

```yaml
post-conditions:
  - [ ] Task completed; exit code 0; expected outputs created
    tipo: post-condition
    blocker: true
    validação: |
      Verify task completed; exit code 0; expected outputs created
    error_message: "Post-condition failed: Task completed; exit code 0; expected outputs created"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de aprovação/reprovação para conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Task completed as expected; side effects documented
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Assert task completed as expected; side effects documented
    error_message: "Acceptance criterion not met: Task completed as expected; side effects documented"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** task-runner
  - **Propósito:** Execução e orquestração de tasks
  - **Fonte:** .aiox-core/core/task-runner.js

- **Ferramenta:** logger
  - **Propósito:** Logging de execução e rastreamento de erros
  - **Fonte:** .aiox-core/utils/logger.js

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** execute-task.js
  - **Propósito:** Wrapper genérico de execução de task
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/scripts/execute-task.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Task Não Encontrada
   - **Causa:** Task especificada não registrada no sistema
   - **Resolução:** Verificar o nome e o registro da task
   - **Recuperação:** Listar tasks disponíveis, sugerir similares

2. **Erro:** Parâmetros Inválidos
   - **Causa:** Parâmetros da task não correspondem ao schema esperado
   - **Resolução:** Validar parâmetros contra a definição da task
   - **Recuperação:** Fornecer template de parâmetros, rejeitar a execução

3. **Erro:** Timeout de Execução
   - **Causa:** Task excede o tempo máximo de execução
   - **Resolução:** Otimizar a task ou aumentar o timeout
   - **Recuperação:** Encerrar a task, limpar recursos, registrar o estado

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 5-15 min (estimated)
cost_estimated: $0.003-0.010
token_usage: ~3,000-10,000 tokens
```

**Notas de Otimização:**
- Quebrar em workflows menores; implementar checkpointing; usar processamento assíncrono quando possível

---

## Metadados

```yaml
story: N/A
version: 1.0.0
dependencies:
  - N/A
tags:
  - product-management
  - planning
updated_at: 2025-11-17
```

---


## Entradas da Task

```yaml
required:
  - story_id: '{epic}.{story}' # e.g., "3.20"

optional:
  - auto_merge: false # If true, automatically apply updates to local file
```

## Pré-requisitos

- Ferramenta de PM configurada em `.aiox-pm-config.yaml` (ou usará o modo somente-local)

## Passos de Execução da Task

### Passo 1: Obter o PM Adapter

```javascript
const { getPMAdapter, isPMToolConfigured } = require('../.aiox-core/scripts/pm-adapter-factory');

if (!isPMToolConfigured()) {
  console.log('ℹ️  Local-only mode: No PM tool configured');
  console.log('   Local story file is the source of truth');
  return;
}

const adapter = getPMAdapter();
console.log(`Pulling from ${adapter.getName()}...`);
```

### Passo 2: Puxar Atualizações

```javascript
const result = await adapter.pullStory(storyId);

if (result.success) {
  if (result.updates) {
    console.log(`📥 Updates found:`);
    console.log(JSON.stringify(result.updates, null, 2));
  } else {
    console.log(`✅ Story is up to date`);
  }
} else {
  console.error(`❌ Pull failed: ${result.error}`);
}
```

### Passo 3: Exibir Atualizações (se houver)

Se forem encontradas atualizações:

```markdown
📥 Updates available from {PM_TOOL}:

**Status:** {old_status} → {new_status}
**Updated:** {timestamp}

Review changes before merging to local file.
```

### Passo 4: Auto-Merge Opcional

Se `auto_merge: true` e existirem atualizações:

```javascript
// Update local story file with pulled changes
// CAUTION: Only merge non-conflicting fields (status, etc.)
// DO NOT overwrite local task progress or dev notes
```

## Tratamento de Erros

- **Nenhuma ferramenta de PM configurada**: Informar o modo somente-local (não é um erro)
- **Story não encontrada na ferramenta de PM**: Exibir mensagem útil
- **Falha de conexão**: Mostrar o erro específico do adapter

## Notas

- O LocalAdapter sempre retorna {success: true, updates: null}
- A implementação atual é somente-pull (sincronização unidirecional)
- O auto-merge deve ser usado com cautela para evitar sobrescrever mudanças locais
- Aprimoramento futuro: sincronização bidirecional com resolução de conflitos

## Limitações (v1.0)

- **Unidirecional**: Puxa apenas mudanças de status, não o conteúdo completo
- **Sem resolução de conflitos**: Merge manual necessário se houver conflitos
- **Mapeamento de campos limitado**: Apenas o status é sincronizado na v1.0

## Integração com o Story Manager

```javascript
const { pullStoryFromPM } = require('../.aiox-core/scripts/story-manager');

const updates = await pullStoryFromPM(storyId);
if (updates) {
  console.log('Updates available:', updates);
}
```
