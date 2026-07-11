---
tools:
  - pm-tool  # Uses configured PM tool (ClickUp, GitHub, Jira, or local-only)
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# sync-story

**Propósito:** Sincronizar um arquivo de story local com a ferramenta de PM configurada. Funciona com ClickUp, GitHub Projects, Jira ou modo local-only.

**Quando Usar:**
- Após fazer mudanças no arquivo de story que precisam ser sincronizadas com a ferramenta de PM
- Quando você quer forçar o envio do estado atual da story
- Após edições manuais que ignoraram os utilitários do story-manager
- Para atualizar a ferramenta de PM com o progresso atual da story

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

### 3. Planejamento Pre-Flight - Planejamento Antecipado Abrangente
- Fase de análise da task (identificar todas as ambiguidades)
- Execução com zero ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: poSyncStory()
responsável: Pax (Balancer)
responsavel_type: Agente
atomic_layer: Organism

**Entrada:**
- campo: task
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Must be registered task

- campo: parameters
  tipo: object
  origem: User Input
  obrigatório: false
  validação: Valid task parameters

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
    error_message: "Pré-condição falhou: a task está registrada; os parâmetros obrigatórios foram fornecidos; as dependências foram atendidas"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a conclusão da task

**Checklist:**

```yaml
post-conditions:
  - [ ] Task completed; exit code 0; expected outputs created
    tipo: post-condition
    blocker: true
    validação: |
      Verify task completed; exit code 0; expected outputs created
    error_message: "Pós-condição falhou: a task foi concluída; código de saída 0; as saídas esperadas foram criadas"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de aprovação/reprovação para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Task completed as expected; side effects documented
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Assert task completed as expected; side effects documented
    error_message: "Critério de aceite não atendido: a task foi concluída conforme esperado; os efeitos colaterais foram documentados"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Tool:** task-runner
  - **Propósito:** Execução e orquestração de tasks
  - **Source:** .aiox-core/core/task-runner.js

- **Tool:** logger
  - **Propósito:** Logging de execução e rastreamento de erros
  - **Source:** .aiox-core/utils/logger.js

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** execute-task.js
  - **Propósito:** Wrapper genérico de execução de task
  - **Language:** JavaScript
  - **Location:** .aiox-core/scripts/execute-task.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Task Não Encontrada
   - **Causa:** A task especificada não está registrada no sistema
   - **Resolução:** Verificar o nome e o registro da task
   - **Recuperação:** Listar tasks disponíveis, sugerir similares

2. **Erro:** Parâmetros Inválidos
   - **Causa:** Os parâmetros da task não correspondem ao schema esperado
   - **Resolução:** Validar os parâmetros contra a definição da task
   - **Recuperação:** Fornecer template de parâmetros, rejeitar a execução

3. **Erro:** Timeout de Execução
   - **Causa:** A task excede o tempo máximo de execução
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
- Divida em workflows menores; implemente checkpointing; use processamento assíncrono sempre que possível

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
  - story_path: 'path/to/story.yaml' # Full path to story YAML file

optional:
  - force: false # If true, sync even if no changes detected
```

## Pré-requisitos

- O arquivo de story deve existir
- Ferramenta de PM configurada em `.aiox-pm-config.yaml` (ou usará o modo local-only)

## Passos de Execução da Task

### Passo 1: Carregar o Arquivo da Story

- Verificar se o arquivo de story existe no caminho fornecido
- Ler e parsear o conteúdo YAML
- Extrair o ID, o título e o status da story

### Passo 2: Obter o Adapter de PM

```javascript
const { getPMAdapter } = require('../.aiox-core/scripts/pm-adapter-factory');

const adapter = getPMAdapter();
console.log(`Using ${adapter.getName()} adapter`);
```

### Passo 3: Sincronizar com a Ferramenta de PM

```javascript
const result = await adapter.syncStory(storyPath);

if (result.success) {
  console.log(`✅ Story ${storyId} synced successfully`);
  if (result.url) {
    console.log(`   URL: ${result.url}`);
  }
} else {
  console.error(`❌ Sync failed: ${result.error}`);
}
```

### Passo 4: Exibir os Resultados

Exibir o resumo formatado:

```markdown
✅ Story {story_id} sincronizada com {PM_TOOL}

**PM Tool:** {adapter_name}
**Status:** {story_status}
**URL:** {url} (se disponível)
**Timestamp:** {current_time}

{Detalhes das mudanças sincronizadas}
```

## Tratamento de Erros

- **Arquivo de story não encontrado**: Exibir erro com o caminho correto
- **Falha na conexão com a ferramenta de PM**: Mostrar a mensagem de erro do adapter
- **Configuração ausente**: Informar ao usuário para rodar `aiox init`
- **Falha no sync**: Exibir a mensagem de erro específica do adapter

## Notas

- O LocalAdapter (sem ferramenta de PM) sempre tem sucesso (apenas valida o YAML)
- O adapter do ClickUp preserva a compatibilidade retroativa com os workflows existentes
- O adapter do GitHub cria/atualiza uma issue do GitHub
- O adapter do Jira cria/atualiza uma issue do Jira
- Todos os adapters retornam o formato consistente {success, url?, error?}

## Integração com o Story Manager

Esta task pode ser chamada diretamente ou via utilitários do story-manager:

```javascript
const { syncStoryToPM } = require('../.aiox-core/scripts/story-manager');

await syncStoryToPM(storyPath);
```
