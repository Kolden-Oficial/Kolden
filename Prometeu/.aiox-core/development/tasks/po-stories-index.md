---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# PO Task: Regenerar o Índice de Stories

**Agent:** @po
**Command:** `*stories-index`
**Propósito:** Regenerar o índice de stories a partir do diretório docs/stories/
**Created:** 2025-01-16 (Story 6.1.2.6)

---

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
task: poStoriesIndex()
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


## Fluxo da Task

### 1. Confirmar a Regeneração
```yaml
elicit: true
question: "Regenerate story index? This will scan all stories and update docs/stories/index.md"
options:
  - yes: Proceed with regeneration
  - no: Cancel operation
  - preview: Show current stats without writing
```

### 2. Gerar o Índice de Stories
```javascript
const { generateStoryIndex } = require('.aiox-core/scripts/story-index-generator');

console.log('📚 Scanning stories directory...');

const result = await generateStoryIndex('docs/stories');

console.log(`✅ Story index generated`);
console.log(`   Total Stories: ${result.totalStories}`);
console.log(`   Output: ${result.outputPath}`);
```

### 3. Exibir o Resumo
```markdown
## 📊 Índice de Stories Atualizado

**Total de Stories:** ${totalStories}
**Arquivo de Saída:** docs/stories/index.md

**Stories por Epic:**
${epics.map(epic => `- ${epic.name}: ${epic.count} stories`).join('\n')}

**Stories por Status:**
${statuses.map(status => `- ${status.emoji} ${status.name}: ${status.count}`).join('\n')}

**Próximos Passos:**
- Revise o índice: docs/stories/index.md
- Use `*backlog-review` para ver os itens do backlog
- Use `*create-story` para adicionar novas stories
```

### 4. Modo Preview (se selecionado)
```javascript
if (mode === 'preview') {
  const stories = await scanStoriesDirectory('docs/stories');

  console.log('\n📊 Story Index Preview');
  console.log(`   Total Stories: ${stories.length}`);

  const grouped = groupStoriesByEpic(stories);
  Object.entries(grouped).forEach(([epic, items]) => {
    console.log(`   ${epic}: ${items.length} stories`);
  });

  console.log('\nRun with "yes" to generate index file.');
  return;
}
```

---

## Exemplo de Uso

```bash
# Interactive mode
*stories-index
> yes

# Expected output:
📚 Scanning stories directory...
✅ Found 70 stories
✅ Story index generated: docs/stories/index.md

📊 Story Index Updated
Total Stories: 70
Output File: docs/stories/index.md

Stories by Epic:
- Epic 6.1 AIOX Migration: 45 stories
- Epic 3 Gap Remediation: 20 stories
- Unassigned: 5 stories
```

---

## Tratamento de Erros

- **Nenhuma story encontrada:** Avisar o usuário, criar índice vazio
- **Metadados de story inválidos:** Registrar avisos, pular stories malformadas
- **Permissão negada:** Verificar as permissões de arquivo em docs/stories/
- **Falha na gravação:** Verificar se o diretório docs/stories/ existe

---

## Testes

```bash
# Test regeneration
*stories-index
> preview  # Check counts without writing

*stories-index
> yes      # Generate full index

# Verify:
cat docs/stories/index.md
# - Total stories count matches directory scan
# - Stories grouped by epic correctly
# - All story links work
# - Status/priority emojis display correctly
```

---

## Integração de Script npm

Adicione ao `package.json`:

```json
{
  "scripts": {
    "stories:index": "node .aiox-core/scripts/story-index-generator.js docs/stories"
  }
}
```

Uso:
```bash
npm run stories:index
```

---

**Tasks Relacionadas:**
- `po-backlog-add.md` - Adicionar itens ao backlog
- `po-create-story.md` - Criar novas stories
- `story-index-generator.js` - Utilitário gerador core
