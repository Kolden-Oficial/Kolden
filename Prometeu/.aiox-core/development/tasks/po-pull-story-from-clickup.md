---
tools:
  - clickup  # Required for ClickUp integration
checklists:
  - po-master-checklist.md
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# pull-story-from-clickup

**Propósito:** Puxar atualizações completas de story do ClickUp para o arquivo local, incluindo conclusões de tasks, mudanças de descrição e atualizações de status. Esta é a **direção reversa** do sync-story-to-clickup.

**Quando Usar:**
- Após fazer mudanças diretamente na UI do ClickUp (marcar checkboxes, atualizar descrição)
- Quando você precisa puxar o estado mais recente do ClickUp para continuar o trabalho localmente
- Após colaboradores atualizarem a task do ClickUp
- Para resolver conflitos de sync (o ClickUp é a fonte da verdade)

**Importante:** Isto sobrescreve mudanças locais com dados do ClickUp. Use com cuidado se você tiver edições locais não commitadas.

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
task: poPullStoryFromClickup()
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
  - force: false # If true, pull even if last_sync indicates local is newer
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

### Passo 2: Obter os Dados da Task do ClickUp

```javascript
const clickupTool = await getClickUpTool();

// Get complete task data including description
const task = await clickupTool.getTask({
  taskId: storyData.frontmatter.clickup.task_id
});
```

**O que extrair da task do ClickUp:**
- Descrição da task (contém o markdown completo da story)
- Campo customizado story-status
- Status nativo da task
- Tags
- Campos customizados (epic_number, story_number, story_file_path)

### Passo 3: Parsear a Descrição do ClickUp

A descrição da task do ClickUp contém o **markdown completo da story**. Precisamos:

1. Extrair o markdown de `task.description`
2. Parsear as seções:
   - Story Statement
   - Context
   - Acceptance Criteria (com checkboxes)
   - Tasks/Subtasks (com checkboxes)
   - Dev Notes
   - Testing
   - File List
   - QA Results
   - Notes
   - Change Log

3. **Crítico:** Preservar os estados dos checkboxes do ClickUp
   - `- [x] Task` = concluída
   - `- [ ] Task` = pendente

### Passo 4: Mesclar com o Frontmatter Local

**NÃO sobrescreva o arquivo inteiro** - preserve a estrutura do frontmatter:

```javascript
const localFrontmatter = storyData.frontmatter;
const clickupFrontmatter = {
  version: localFrontmatter.version,
  story_id: localFrontmatter.story_id,
  epic_id: localFrontmatter.epic_id,
  title: task.name,
  status: mapStatusFromClickUp(task.custom_fields.find(f => f.name === 'story-status').value),
  created: localFrontmatter.created,
  updated: new Date().toISOString().split('T')[0], // Today's date
  clickup: {
    task_id: task.id,
    epic_task_id: task.parent,
    list: task.list.name,
    list_id: task.list.id,
    url: task.url,
    last_sync: new Date().toISOString(),
    custom_fields: {
      epic_number: task.custom_fields.find(f => f.name === 'epic-number')?.value || localFrontmatter.clickup.custom_fields.epic_number,
      story_number: task.custom_fields.find(f => f.name === 'story-number')?.value || localFrontmatter.clickup.custom_fields.story_number,
      story_file_path: task.custom_fields.find(f => f.name === 'story-file-path')?.value || localFrontmatter.clickup.custom_fields.story_file_path,
      'story-status': task.custom_fields.find(f => f.name === 'story-status')?.value
    }
  },
  tags: task.tags.map(t => t.name)
};
```

### Passo 5: Reconstruir o Arquivo da Story

Monte o markdown completo da story:

```markdown
# Story {story_id}: {title}

```yaml
{frontmatter}
```

{story body from ClickUp description}
```

**Importante:** Use a descrição do ClickUp como a **fonte da verdade** para o corpo da story.

### Passo 6: Gravar o Arquivo da Story Atualizado

```javascript
const { saveStoryFile } = require('../../common/scripts/story-manager');

// Save with skipSync=true to avoid circular sync
await saveStoryFile(storyFilePath, newContent, true);
```

**Por que skipSync=true?**
- Acabamos de puxar do ClickUp, então não queremos enviar de volta imediatamente
- Previne loops infinitos de sync

### Passo 7: Exibir Resumo do Sync

```markdown
✅ Story {story_id} puxada do ClickUp

**Task ID:** {task_id}
**Task URL:** {url}
**Last Sync:** {timestamp}

**Mudanças Puxadas:**
- Status: {old_status} → {new_status} (se mudou)
- Tasks concluídas: {count of checkboxes changed from [ ] to [x]}
- Tasks reabertas: {count of checkboxes changed from [x] to [ ]}
- Descrição atualizada: {yes/no}
- Tags atualizadas: {changes}

**Arquivo Local Atualizado:**
- Frontmatter: ✓
- Corpo da Story: ✓
- Estados dos Checkboxes: ✓
- Timestamp do Last Sync: ✓
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
Não é possível puxar do ClickUp sem task_id no frontmatter.
```

**Erro: Task do ClickUp não encontrada**
```
❌ Task do ClickUp não encontrada: {task_id}

Possíveis razões:
- A task foi deletada do ClickUp
- O Task ID está incorreto no frontmatter
- Você não tem acesso a esta task
- A autenticação da API do ClickUp falhou

Verifique se a task existe: {task_url}
```

**Erro: Descrição vazia ou malformada**
```
❌ A descrição da task do ClickUp está vazia ou malformada

A descrição da task deve conter o markdown completo da story.
Isto pode indicar:
- A task foi criada manualmente no ClickUp (não via story-manager)
- A descrição foi limpa acidentalmente
- A task precisa ser sincronizada do local primeiro

Recomendação:
1. Rode: *sync-story {story_id}
2. Depois tente puxar novamente
```

## Exemplos de Uso

### Pull Básico
```
*pull-story 99.2
```

### Pull Forçado (mesmo se o local for mais recente)
```
*pull-story 5.2.2 --force
```

### Após Atualizações no ClickUp
```
# Cenário: Você marcou checkboxes na UI do ClickUp
1. Rode: *pull-story {story_id}
2. Revise as mudanças mostradas no resumo
3. O arquivo local agora corresponde ao ClickUp
4. Continue trabalhando localmente
```

## Notas de Integração

**Para o Agente PO:**
- Adicione aos comandos do po.md: `pull-story {story}`: Puxar atualizações de story do ClickUp
- Use após colaboradores atualizarem tasks do ClickUp
- Use antes de iniciar a validação se a task foi modificada no ClickUp

**Para o Agente Dev:**
- Adicione aos comandos do dev.md: `pull-story {story}`: Puxar atualizações de story do ClickUp
- Use no início da sessão de trabalho para obter o estado mais recente
- Use após o QA ou o PO atualizarem a task no ClickUp

**Para o Agente QA:**
- Adicione aos comandos do qa.md: `pull-story {story}`: Puxar atualizações de story do ClickUp
- Use antes de iniciar a revisão para obter o estado mais recente
- Use após o Dev marcar tasks como concluídas no ClickUp

**Boa Prática:**
- Puxe no **início** das sessões de trabalho
- Envie (*sync-story) no **final** das sessões de trabalho
- O ClickUp é a fonte da verdade para atualizações colaborativas
- O arquivo local é a fonte da verdade para o trabalho do agente

## Exemplos de Workflow

### Workflow Colaborativo
```
1. PO atualiza a story na UI do ClickUp (adiciona acceptance criteria)
2. Dev puxa a story: *pull-story 5.2.2
3. Dev implementa localmente, marca tasks como concluídas
4. Dev envia para o ClickUp: *sync-story 5.2.2
5. QA puxa a versão mais recente: *pull-story 5.2.2
6. QA revisa e atualiza localmente
7. QA envia os resultados: *sync-story 5.2.2
```

### Resolução de Conflitos
```
# Se o local e o ClickUp divergiram:

Opção 1: ClickUp vence (recomendado para trabalho colaborativo)
*pull-story 5.2.2 --force

Opção 2: Local vence (quando você tem trabalho importante não commitado)
*sync-story 5.2.2 --force

Opção 3: Merge manual (mudanças complexas)
1. Faça backup do arquivo local
2. Puxe do ClickUp
3. Compare com o backup
4. Mescle manualmente as mudanças importantes
5. Envie de volta para o ClickUp
```

## Implementação Técnica

**Dependências:**
- `common/scripts/story-manager.js` - saveStoryFile, parseStoryFile
- `common/scripts/status-mapper.js` - mapStatusFromClickUp
- Ferramenta MCP do ClickUp (via global.mcp__clickup__* ou tool-resolver)

**Fluxo do Processo:**
```
Task invocada
    ↓
Ler o arquivo de story local
    ↓
Extrair o task_id do frontmatter
    ↓
Buscar a task completa do ClickUp (via ferramenta MCP)
    ↓
Parsear a descrição do ClickUp (markdown da story)
    ↓
Mesclar o frontmatter (preservar a estrutura local, atualizar a partir do ClickUp)
    ↓
Reconstruir o arquivo de story completo
    ↓
    ├─ Frontmatter (mesclado)
    ├─ Corpo da story (da descrição do ClickUp)
    └─ Estados dos checkboxes (da descrição do ClickUp)
    ↓
Gravar no arquivo local (skipSync=true)
    ↓
Exibir o resumo do sync
```

## Testando Esta Task

**Teste Manual:**
1. Marque checkboxes na UI do ClickUp para a Story 99.2
2. Rode: `*pull-story 99.2`
3. Verifique:
   - Checkboxes atualizados no arquivo local
   - Timestamp last_sync atualizado
   - Mudanças de status refletidas
   - Resumo mostra a contagem correta de mudanças

**Teste Automatizado:** `tests/tasks/pull-story-from-clickup.test.js`

---

*Task criada para fornecer sincronização reversa do ClickUp para arquivos de story locais*
