---
tools:
  - clickup  # Required for ClickUp synchronization
checklists:
  - po-master-checklist.md
---

# sync-story-to-clickup

**Propósito:** Forçar manualmente a sincronização de um arquivo de story local com o ClickUp. Use isto quando você tiver editado um arquivo de story diretamente (via ferramenta Edit) e precisar garantir que as mudanças sejam refletidas no ClickUp.

**Quando Usar:**
- Após fazer mudanças no arquivo de story que não foram sincronizadas automaticamente
- Quando você quer forçar o envio do estado atual da story para o ClickUp
- Após edições manuais que ignoraram os utilitários do story-manager
- Quando o sync parece desatualizado (verifique o timestamp last_sync no frontmatter)

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
task: poSyncStoryToClickup()
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
  - story_id: '{epic}.{story}' # e.g., "99.2" or "5.2.2"

optional:
  - force: false # If true, sync even if no changes detected
```

## Pré-requisitos

- O arquivo de story deve existir em `docs/stories/`
- A story deve ter metadados do ClickUp no frontmatter (clickup.task_id)
- A ferramenta MCP do ClickUp deve estar disponível e autenticada

## Passos de Execução da Task

### Passo 1: Localizar o Arquivo da Story

- Encontre o arquivo da story em `docs/stories/` que corresponda ao padrão de story_id
- Formato esperado: `{epic}.{story}.*.md`
- Se múltiplos arquivos forem encontrados, mostre a lista e peça ao usuário para esclarecer
- Se nenhum arquivo for encontrado, ERRO e saída

### Passo 2: Parsear o Arquivo da Story

- Ler o conteúdo atual do arquivo de story
- Extrair o frontmatter com o parser YAML
- Verificar se `clickup.task_id` existe no frontmatter
- Se o task_id estiver ausente:
  - ERRO: "Story has no ClickUp integration metadata"
  - Sugerir: Verificar se a story foi criada via workflow do ClickUp
  - SAIR da task

### Passo 3: Preparar os Dados de Sync

Extrair do arquivo de story:
- Conteúdo markdown completo (para atualização da descrição)
- Status atual do frontmatter
- Tasks/checkboxes (para detecção de mudanças)
- Seção File List
- Seção Dev Notes
- Seção Acceptance Criteria

### Passo 4: Sincronizar com o ClickUp

**CRÍTICO:** Use o módulo story-manager para um sync adequado

```javascript
const { saveStoryFile } = require('../../common/scripts/story-manager');

// Read current content
const currentContent = await fs.readFile(storyFilePath, 'utf-8');

// Force sync by re-saving with skipSync=false
await saveStoryFile(storyFilePath, currentContent, false);
```

**O Que Isto Faz:**
1. Detecta mudanças entre o conteúdo anterior e o atual
2. Atualiza a descrição da task do ClickUp com o markdown completo
3. Atualiza o campo customizado story-status se o status mudou
4. Adiciona um comentário de changelog se tasks foram concluídas ou arquivos adicionados
5. Atualiza o timestamp last_sync no frontmatter

### Passo 5: Verificar o Sucesso do Sync

- Verificar se o timestamp last_sync foi atualizado no frontmatter
- Registrar os resultados do sync:
  - Mudanças de status detectadas
  - Número de tasks concluídas
  - Arquivos adicionados
  - Outras mudanças sincronizadas

### Passo 6: Exibir os Resultados

Exibir o resumo formatado:

```markdown
✅ Story {story_id} sincronizada com o ClickUp

**Task ID:** {task_id}
**Task URL:** {url}
**Last Sync:** {timestamp}

**Mudanças Sincronizadas:**
- Status: {old_status} → {new_status} (se mudou)
- Tasks concluídas: {count}
- Arquivos adicionados: {count}
- Dev Notes atualizadas: {yes/no}
- Acceptance Criteria atualizados: {yes/no}

**Atualizações no ClickUp:**
- Descrição da task atualizada com o markdown completo da story
- Campo customizado story-status atualizado
- Comentário de changelog adicionado à task
```

## Tratamento de Erros

**Erro: Arquivo de story não encontrado**
```
❌ Arquivo de story não encontrado para o ID: {story_id}

Por favor verifique:
- Formato do Story ID correto? (e.g., "99.2" não "Story 99.2")
- O arquivo de story existe em docs/stories/?
- A nomeação do arquivo segue o padrão: {epic}.{story}.*.md
```

**Erro: Sem metadados do ClickUp**
```
❌ A story não tem integração com o ClickUp

Esta story não foi criada via workflow do ClickUp e não tem task_id.

Para integrar com o ClickUp:
1. Crie a task do ClickUp manualmente na lista Backlog
2. Adicione os metadados ao frontmatter:
   clickup:
     task_id: "your-task-id"
     epic_task_id: "parent-epic-id"
     list: "Backlog"
     url: "https://app.clickup.com/t/task-id"
```

**Erro: Falha na API do ClickUp**
```
❌ Falha ao sincronizar com o ClickUp: {error_message}

Por favor verifique:
- A ferramenta MCP do ClickUp está autenticada
- O Task ID é válido e acessível
- A conexão de rede está estável
- A API do ClickUp está operacional

Você pode verificar a task manualmente em:
{task_url}
```

**Erro: Nenhuma mudança detectada (com force=false)**
```
ℹ️  Nenhuma mudança detectada - sync não necessário

A story já está sincronizada com o ClickUp.
Last sync: {timestamp}

Use force=true para sincronizar mesmo assim:
*sync-story {story_id} --force
```

## Exemplos de Uso

### Sync Básico
```
*sync-story 99.2
```

### Sync Forçado (mesmo se não houver mudanças)
```
*sync-story 5.2.2 --force
```

### Após Edições Manuais
```
# Cenário: Você usou a ferramenta Edit para atualizar o arquivo de story
1. Edite o arquivo de story com as mudanças
2. Rode: *sync-story {story_id}
3. Verifique a mensagem de sucesso do sync
4. Verifique a UI do ClickUp para confirmar as atualizações
```

## Notas de Integração

**Para o Agente PO:**
- Adicione aos comandos do po.md: `sync-story {story}`: Forçar o sync da story para o ClickUp
- Use após edições manuais de story ou quando a validação atualizar a story

**Para o Agente Dev:**
- Adicione aos comandos do dev.md: `sync-story {story}`: Forçar o sync da story para o ClickUp
- Use após marcar tasks como concluídas ou atualizar a File List

**Para o Agente QA:**
- Adicione aos comandos do qa.md: `sync-story {story}`: Forçar o sync da story para o ClickUp
- Use após adicionar a seção QA Results

**Boa Prática:**
- Os agentes devem usar os utilitários do story-manager sempre que possível (sync automático)
- Use esta task apenas quando edições diretas de arquivo forem feitas
- Verifique o timestamp last_sync para conferir a atualidade do sync

## Implementação Técnica

**Dependências:**
- `common/scripts/story-manager.js` - função saveStoryFile
- `common/scripts/story-update-hook.js` - detectChanges, syncStoryToClickUp
- `common/scripts/clickup-helpers.js` - wrappers da API do ClickUp
- Ferramenta MCP do ClickUp (via global.mcp__clickup__* ou tool-resolver)

**Fluxo do Processo:**
```
Task invocada
    ↓
Ler o arquivo de story
    ↓
Parsear o frontmatter em busca do task_id
    ↓
Chamar story-manager.saveStoryFile()
    ↓
    ├─ detectChanges() identifica as diferenças
    ├─ syncStoryToClickUp() orquestra as atualizações
    ├─ updateTaskDescription() se o AC/conteúdo mudou
    ├─ updateStoryStatus() se o status mudou
    └─ addTaskComment() com o changelog
    ↓
Atualizar o timestamp last_sync
    ↓
Retornar os resultados do sync
```

## Testando Esta Task

**Teste Manual:**
1. Edite a Story 99.2 diretamente (marque um checkbox)
2. Anote o timestamp last_sync atual
3. Rode: `*sync-story 99.2`
4. Verifique:
   - Timestamp last_sync atualizado
   - A task do ClickUp mostra o comentário de changelog
   - Mudança de checkbox refletida no ClickUp
   - Descrição da task atualizada

**Teste Automatizado:** `tests/tasks/sync-story-to-clickup.test.js`

---

*Task criada para fornecer controle de sync manual para a integração com o ClickUp*
