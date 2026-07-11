---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Task do PO: Adicionar Item ao Backlog

**Agente:** @po
**Comando:** `*backlog-add`
**Propósito:** Adicionar item ao backlog de stories (follow-up, dívida técnica ou melhoria)
**Criado:** 2025-01-16 (Story 6.1.2.6)

---

## Modos de Execução

**Escolha o seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com registro de logs
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
task: poBacklogAdd()
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
  - [ ] Task registrada; parâmetros obrigatórios fornecidos; dependências atendidas
    tipo: pre-condition
    blocker: true
    validação: |
      Verificar se a task está registrada; parâmetros obrigatórios fornecidos; dependências atendidas
    error_message: "Pré-condição falhou: Task registrada; parâmetros obrigatórios fornecidos; dependências atendidas"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a conclusão da task

**Checklist:**

```yaml
post-conditions:
  - [ ] Task concluída; código de saída 0; saídas esperadas criadas
    tipo: post-condition
    blocker: true
    validação: |
      Verificar se a task foi concluída; código de saída 0; saídas esperadas criadas
    error_message: "Pós-condição falhou: Task concluída; código de saída 0; saídas esperadas criadas"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de aprovação/reprovação para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Task concluída conforme esperado; efeitos colaterais documentados
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Garantir que a task foi concluída conforme esperado; efeitos colaterais documentados
    error_message: "Critério de aceite não atendido: Task concluída conforme esperado; efeitos colaterais documentados"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Tool:** task-runner
  - **Propósito:** Execução e orquestração de tasks
  - **Origem:** .aiox-core/core/task-runner.js

- **Tool:** logger
  - **Propósito:** Registro de execução e rastreamento de erros
  - **Origem:** .aiox-core/utils/logger.js

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** execute-task.js
  - **Propósito:** Wrapper genérico de execução de tasks
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
   - **Recuperação:** Fornecer template de parâmetros, rejeitar execução

3. **Erro:** Timeout de Execução
   - **Causa:** Task excede o tempo máximo de execução
   - **Resolução:** Otimizar a task ou aumentar o timeout
   - **Recuperação:** Encerrar a task, limpar recursos, registrar estado

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 5-15 min (estimado)
cost_estimated: $0.003-0.010
token_usage: ~3,000-10,000 tokens
```

**Notas de Otimização:**
- Dividir em workflows menores; implementar checkpointing; usar processamento assíncrono onde possível

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

### 1. Coletar Detalhes do Item (Elicit)
```yaml
elicit: true
questions:
  - Tipo de item?
    options:
      - F: Follow-up (📌) - Item de ação pós-story
      - T: Dívida Técnica (🔧) - Melhoria de qualidade de código ou arquitetura
      - E: Melhoria (✨) - Aprimoramento ou otimização de funcionalidade

  - Título (descrição de 1 linha):
    input: text
    validation: mín. 10 chars, máx. 100 chars

  - Descrição Detalhada (opcional):
    input: textarea
    validation: máx. 500 chars

  - Prioridade:
    options:
      - Crítica (🔴)
      - Alta (🟠)
      - Média (🟡)
      - Baixa (🟢)
    default: Média

  - ID da Story Relacionada (opcional):
    input: text
    example: "6.1.2.6"
    validation: o arquivo da story deve existir se fornecido

  - Tags (opcional, separadas por vírgula):
    input: text
    example: "testing, performance, security"

  - Esforço Estimado (opcional):
    input: text
    example: "2 hours", "1 day", "1 week"
    default: "TBD"
```

### 2. Validar a Entrada
```javascript
// Validate story exists if relatedStory provided
if (relatedStory) {
  const storyPath = `docs/stories/**/*${relatedStory}*.md`;
  const matches = await glob(storyPath);

  if (matches.length === 0) {
    throw new Error(`Story not found: ${relatedStory}`);
  }

  if (matches.length > 1) {
    console.log('⚠️ Multiple stories matched, using first:');
    matches.forEach(m => console.log(`  - ${m}`));
  }
}

// Parse tags
const tags = tagsInput ? tagsInput.split(',').map(t => t.trim()) : [];
```

### 3. Adicionar o Item ao Backlog
```javascript
const { BacklogManager } = require('.aiox-core/scripts/backlog-manager');

const manager = new BacklogManager('docs/stories/backlog.md');
await manager.load();

const item = await manager.addItem({
  type: itemType,
  title: title,
  description: description || '',
  priority: priority,
  relatedStory: relatedStory || null,
  createdBy: '@po',
  tags: tags,
  estimatedEffort: estimatedEffort
});

console.log(`✅ Backlog item added: ${item.id}`);
console.log(`   Type: ${itemType} | Priority: ${priority}`);
console.log(`   ${title}`);
```

### 4. Regenerar o Arquivo de Backlog
```javascript
await manager.generateBacklogFile();

console.log('✅ Backlog updated: docs/stories/backlog.md');
```

### 5. Saída de Resumo
```markdown
## 🎯 Item de Backlog Adicionado

**ID:** ${item.id}
**Tipo:** ${itemTypeEmoji} ${itemTypeName}
**Título:** ${title}
**Prioridade:** ${priorityEmoji} ${priority}
**Story Relacionada:** ${relatedStory || 'Nenhuma'}
**Esforço Estimado:** ${estimatedEffort}
**Tags:** ${tags.join(', ') || 'Nenhuma'}

**Próximos Passos:**
- Revisar no backlog: docs/stories/backlog.md
- Priorizar com `*backlog-prioritize ${item.id}`
- Agendar com `*backlog-schedule ${item.id}`
```

---

## Exemplo de Uso

```bash
# Interactive mode (recommended)
*backlog-add

# Example responses:
Type: F
Title: Add integration tests for story index generator
Description: Story 6.1.2.6 implementation needs integration tests
Priority: High
Related Story: 6.1.2.6
Tags: testing, integration, story-6.1.2.6
Effort: 3 hours
```

---

## Tratamento de Erros

- **Story não encontrada:** Avisar o usuário, permitir prosseguir sem story relacionada
- **Tipo inválido:** Mostrar opções válidas (F, T, E)
- **Prioridade inválida:** Usar Média como padrão
- **Arquivo de backlog bloqueado:** Retentar 3x com atraso de 1s

---

## Testes

```bash
# Test with sample data
*backlog-add
# Fill in sample data and verify:
# - Item added to docs/stories/backlog.json
# - Backlog file regenerated at docs/stories/backlog.md
# - Item appears in correct section by type
# - Priority sorting works
```

---

**Tasks Relacionadas:**
- `po-stories-index.md` - Regenerar o índice de stories
- `po-backlog-review.md` - Revisar e priorizar o backlog
- `po-backlog-schedule.md` - Agendar itens do backlog
