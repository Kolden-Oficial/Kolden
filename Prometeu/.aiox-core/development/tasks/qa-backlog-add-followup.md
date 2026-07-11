---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Task de QA: Adicionar Follow-up ao Backlog

**Agente:** @qa
**Comando:** `*backlog-add` (quando usado pelo @qa, assume o tipo F por padrão)
**Propósito:** Adicionar item de follow-up da revisão de QA ao backlog
**Criado:** 2025-01-16 (Story 6.1.2.6)

---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com registro em log
- Interação mínima do usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pre-Flight - Planejamento Antecipado Abrangente
- Fase de análise da task (identificar todas as ambiguidades)
- Execução com ambiguidade zero
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: qaBacklogAddFollowup()
responsável: Quinn (Guardian)
responsavel_type: Agente
atomic_layer: Organism

**Entrada:**
- campo: target
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Deve existir

- campo: criteria
  tipo: array
  origem: config
  obrigatório: true
  validação: Critérios de validação não vazios

- campo: strict
  tipo: boolean
  origem: User Input
  obrigatório: false
  validação: Padrão: true

**Saída:**
- campo: validation_result
  tipo: boolean
  destino: Return value
  persistido: false

- campo: errors
  tipo: array
  destino: Memory
  persistido: false

- campo: report
  tipo: object
  destino: File (.ai/*.json)
  persistido: true
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Regras de validação carregadas; alvo disponível para validação
    tipo: pre-condition
    blocker: true
    validação: |
      Check validation rules loaded; target available for validation
    error_message: "Pre-condition failed: Validation rules loaded; target available for validation"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a conclusão da task

**Checklist:**

```yaml
post-conditions:
  - [ ] Validação executada; resultados precisos; relatório gerado
    tipo: post-condition
    blocker: true
    validação: |
      Verify validation executed; results accurate; report generated
    error_message: "Post-condition failed: Validation executed; results accurate; report generated"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de pass/fail para conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Regras de validação aplicadas; pass/fail preciso; feedback acionável
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Assert validation rules applied; pass/fail accurate; actionable feedback
    error_message: "Acceptance criterion not met: Validation rules applied; pass/fail accurate; actionable feedback"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** validation-engine
  - **Propósito:** Validação e geração de relatórios baseada em regras
  - **Origem:** .aiox-core/utils/validation-engine.js

- **Ferramenta:** schema-validator
  - **Propósito:** Validação de schema JSON/YAML
  - **Origem:** ajv ou similar

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** run-validation.js
  - **Propósito:** Executar regras de validação e gerar relatório
  - **Linguagem:** JavaScript
  - **Local:** .aiox-core/scripts/run-validation.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Critérios de Validação Ausentes
   - **Causa:** Regras de validação obrigatórias não definidas
   - **Resolução:** Garantir que os critérios de validação sejam carregados da config
   - **Recuperação:** Usar regras de validação padrão, registrar aviso

2. **Erro:** Schema Inválido
   - **Causa:** O alvo não corresponde ao schema esperado
   - **Resolução:** Atualizar o schema ou corrigir a estrutura do alvo
   - **Recuperação:** Relatório detalhado de erro de validação

3. **Erro:** Dependência Ausente
   - **Causa:** Dependência obrigatória para validação não encontrada
   - **Resolução:** Instalar as dependências ausentes
   - **Recuperação:** Abortar com lista clara de dependências

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 5-15 min (estimado)
cost_estimated: $0.003-0.010
token_usage: ~3,000-10,000 tokens
```

**Notas de Otimização:**
- Dividir em workflows menores; implementar checkpointing; usar processamento assíncrono quando possível

---

## Metadados

```yaml
story: N/A
version: 1.0.0
dependencies:
  - N/A
tags:
  - quality-assurance
  - testing
updated_at: 2025-11-17
```

---


## Fluxo da Task

### 1. Elicitar Detalhes do Follow-up
```yaml
elicit: true
questions:
  - Title (1-line description):
    input: text
    validation: min 10 chars, max 100 chars
    example: "Add edge case tests for user authentication flow"

  - Detailed Description:
    input: textarea
    validation: max 500 chars
    placeholder: "Describe what needs to be followed up on and why"

  - Priority:
    options:
      - Critical (🔴) - Blocking issue or security concern
      - High (🟠) - Important but not blocking
      - Medium (🟡) - Nice to have
      - Low (🟢) - Optional improvement
    default: Medium
    note: "Critical/High follow-ups should be addressed before story completion"

  - Related Story ID:
    input: text
    example: "6.1.2.6"
    note: "Usually the story being reviewed"
    required: true

  - Tags (optional, comma-separated):
    input: text
    example: "testing, edge-case, security"
    suggestions: ["testing", "edge-case", "security", "performance", "documentation"]

  - Estimated Effort (optional):
    input: text
    example: "2 hours", "1 day"
    default: "TBD"
```

### 2. Validar a Story Relacionada
```javascript
// QA review items MUST have a related story
if (!relatedStory) {
  throw new Error('QA follow-ups must be linked to a story. Use related story ID.');
}

// Validate story exists
const storyPath = `docs/stories/**/*${relatedStory}*.md`;
const matches = await glob(storyPath);

if (matches.length === 0) {
  throw new Error(`Story not found: ${relatedStory}`);
}

if (matches.length > 1) {
  console.log('⚠️ Multiple stories matched, using first:');
  matches.forEach(m => console.log(`  - ${m}`));
}

const storyFile = matches[0];
```

### 3. Adicionar ao Backlog
```javascript
const { BacklogManager } = require('.aiox-core/scripts/backlog-manager');

const manager = new BacklogManager('docs/stories/backlog.md');
await manager.load();

// QA always creates Follow-up type (F)
const item = await manager.addItem({
  type: 'F',  // Follow-up
  title: title,
  description: description,
  priority: priority,
  relatedStory: relatedStory,
  createdBy: '@qa',
  tags: tags,
  estimatedEffort: estimatedEffort
});

console.log(`✅ Follow-up added to backlog: ${item.id}`);
```

### 4. Atualizar QA Results da Story (Opcional)
```yaml
elicit: true
question: "Add reference to QA Results section in story?"
options:
  - yes: Update story file with backlog reference
  - no: Skip story update
default: yes
```

```javascript
if (updateStory) {
  const storyContent = await fs.readFile(storyFile, 'utf8');

  // Find QA Results section
  const qaResultsMatch = storyContent.match(/## QA Results/);

  if (qaResultsMatch) {
    const updatedContent = storyContent.replace(
      /## QA Results/,
      `## QA Results\n\n**Follow-up Created:** [Backlog Item ${item.id}](../backlog.md) - ${title}\n`
    );

    await fs.writeFile(storyFile, updatedContent, 'utf8');
    console.log(`✅ Story updated with backlog reference`);
  } else {
    console.log('⚠️ QA Results section not found in story, skipping update');
  }
}
```

### 5. Regenerar o Backlog
```javascript
await manager.generateBacklogFile();

console.log('✅ Backlog updated: docs/stories/backlog.md');
```

### 6. Saída de Resumo
```markdown
## 📌 Follow-up Added to Backlog

**ID:** ${item.id}
**Type:** 📌 Follow-up (from QA review)
**Title:** ${title}
**Priority:** ${priorityEmoji} ${priority}
**Related Story:** ${relatedStory}
**Estimated Effort:** ${estimatedEffort}
**Tags:** ${tags.join(', ') || 'None'}

**Next Steps:**
- Review in backlog: docs/stories/backlog.md
- @po will prioritize with `*backlog-prioritize ${item.id}`
- @dev will address before story completion (if Critical/High)

${priority === 'Critical' || priority === 'High'
  ? '⚠️ **HIGH PRIORITY** - Should be addressed before story completion'
  : ''
}
```

---

## Exemplo de Uso

```bash
# During QA review of Story 6.1.2.6
*backlog-add

# Example responses:
Title: Add integration tests for story index generator
Description: Current implementation only has unit tests. Integration tests needed to verify end-to-end story scanning and index generation.
Priority: High
Related Story: 6.1.2.6
Tags: testing, integration, coverage
Effort: 3 hours
Update story? yes

# Output:
✅ Follow-up added to backlog: 1763298742141
✅ Story updated with backlog reference
✅ Backlog updated: docs/stories/backlog.md
```

---

## Regras Específicas de QA

1. **O tipo é sempre F (Follow-up)** - QA cria follow-ups, não dívida técnica
2. **A story relacionada é obrigatória** - Todos os itens de QA vinculados à story revisada
3. **Orientação de prioridade:**
   - Critical: Problema de segurança, risco de corrupção de dados, bug bloqueante
   - High: Lacuna importante de teste, edge case significativo
   - Medium: Teste desejável, lacuna menor
   - Low: Melhoria opcional
4. **Atualização da story recomendada** - Manter os follow-ups visíveis no arquivo da story

---

## Tratamento de Erros

- **Sem story relacionada:** Exigir ID da story, não permitir follow-ups órfãos
- **Story não encontrada:** Mostrar nomes de stories similares, permitir nova tentativa
- **Seção QA Results ausente:** Registrar aviso, pular atualização da story
- **Backlog travado:** Tentar novamente 3x com 1s de intervalo

---

## Testes

```bash
# Test with sample story
*backlog-add
# Fill in test data
# Verify:
# - Item added to backlog with type=F
# - createdBy = @qa
# - Story file updated (if QA Results section exists)
# - Priority reflected in backlog ordering
```

---

**Tasks Relacionadas:**
- `qa-review.md` - Revisão abrangente da story
- `qa-gate.md` - Decisão de quality gate
- `po-backlog-review.md` - PO revisa todos os follow-ups
