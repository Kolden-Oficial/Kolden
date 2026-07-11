---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Task do PO: Fechar Story

**Agente:** @po
**Comando:** `*close-story`
**Propósito:** Fechar uma story concluída, atualizar epic/backlog e sugerir a próxima story
**Criado:** 2026-02-05 (retrospectiva da Story PRO-5)

---

## Visão Geral

Esta task fecha o ciclo de vida da story do PO que começa com `*validate-story-draft`. Depois que uma story é implementada, testada e mergeada, esta task:

1. Marca a story como **Done**
2. Atualiza o **índice do Epic** com o status de conclusão
3. Adiciona uma **entrada de changelog** com informações de merge/PR
4. Atualiza as **contagens e estatísticas do backlog**
5. **Sugere a próxima story** do mesmo epic ou do backlog

**Ciclo de Vida:**
```
*validate-story-draft (INÍCIO) --> Desenvolvimento --> PR/Merge --> *close-story (FIM)
        |                                                            |
        v                                                            v
   Story: Draft -> Approved                              Story: Done + Próxima sugerida
```

---

## Modos de Execução

**Escolha o seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Atualizações autônomas com registro de logs
- Interação mínima com o usuário
- **Melhor para:** Fechamentos simples de stories com informações claras de PR

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Confirma cada atualização antes de aplicar
- Explicações educativas
- **Melhor para:** Aprendizado, usuários iniciantes

### 3. Planejamento Pre-Flight - Planejamento Antecipado Abrangente
- Analisa primeiro o estado da story, do epic e do backlog
- Mostra o plano completo antes da execução
- **Melhor para:** Epics complexos, marcos críticos

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: poCloseStory()
responsável: Pax (Balancer)
responsavel_type: Agente
atomic_layer: Organism

**Entrada:**
- campo: story_path
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Must be valid story file path

- campo: pr_number
  tipo: number
  origem: User Input
  obrigatório: false
  validação: Valid PR number if provided

- campo: commit_sha
  tipo: string
  origem: User Input
  obrigatório: false
  validação: Valid git SHA (7+ chars)

- campo: mode
  tipo: string
  origem: User Input
  obrigatório: false
  validação: yolo|interactive|pre-flight

**Saída:**
- campo: story_updated
  tipo: boolean
  destino: Story file
  persistido: true

- campo: epic_updated
  tipo: boolean
  destino: Epic index file
  persistido: true

- campo: next_story_suggestion
  tipo: object
  destino: User output
  persistido: false
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Arquivo da story existe no caminho fornecido
    tipo: pre-condition
    blocker: true
    validação: Arquivo existe e é legível
    error_message: "Arquivo da story não encontrado em: {story_path}"

  - [ ] O status da story NÃO é 'Done'
    tipo: pre-condition
    blocker: false
    validação: Campo Status != Done
    error_message: "Story já marcada como Done"

  - [ ] Arquivo de índice do epic existe (se a story pertencer a um epic)
    tipo: pre-condition
    blocker: false
    validação: EPIC-*-INDEX.md existe no mesmo diretório
    error_message: "Índice do epic não encontrado - apenas atualizações da story"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a conclusão da task

**Checklist:**

```yaml
post-conditions:
  - [ ] Campo Status da story atualizado para 'Done'
    tipo: post-condition
    blocker: true
    validação: Status: Done no frontmatter da story
    error_message: "Falha ao atualizar o status da story"

  - [ ] Entrada de changelog adicionada com data e autor
    tipo: post-condition
    blocker: true
    validação: Nova linha na tabela do Change Log
    error_message: "Falha ao adicionar entrada de changelog"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de aprovação/reprovação para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Story marcada como Done com referência de PR/commit
    tipo: acceptance-criterion
    blocker: true

  - [ ] Índice do epic atualizado (se aplicável)
    tipo: acceptance-criterion
    blocker: false

  - [ ] Sugestão de próxima story fornecida
    tipo: acceptance-criterion
    blocker: false
```

---

## Fluxo da Task

### 1. Coletar Informações da Story e do Merge (Elicit)

```yaml
elicit: true
questions:
  - Caminho da story (relativo a docs/stories/):
    input: text
    validation: O arquivo deve existir
    example: "epics/epic-pro-aiox-pro-architecture/story-pro-5-repo-bootstrap.md"

  - Número do PR (opcional):
    input: text
    validation: Numérico ou vazio
    example: "84"

  - SHA do commit de merge (opcional):
    input: text
    validation: 7+ chars hex ou vazio
    example: "ce19c81a"

  - Notas adicionais para o changelog (opcional):
    input: textarea
    example: "CodeRabbit aprovado com 0 achados"
```

### 2. Ler e Parsear a Story

```javascript
// Load story file
const storyPath = path.join('docs/stories', userInput.storyPath);
const storyContent = fs.readFileSync(storyPath, 'utf8');

// Extract metadata
const metadata = parseStoryFrontmatter(storyContent);
const epicId = extractEpicId(storyPath); // e.g., "PRO" from epic-pro-*
const storyId = metadata.storyId; // e.g., "PRO-5"

// Verify not already done
if (metadata.status === 'Done') {
  console.warn('⚠️ Story already marked as Done');
  // Continue anyway to update other fields
}
```

### 3. Atualizar o Status e o Changelog da Story

```javascript
// Update Status field
const updatedStory = storyContent.replace(
  /\*\*Status:\*\* .+/,
  '**Status:** Done'
);

// Add changelog entry
const today = new Date().toISOString().split('T')[0];
const version = getNextVersion(storyContent); // e.g., "1.3"
const prInfo = pr_number ? `PR #${pr_number}` : '';
const commitInfo = commit_sha ? `(commit ${commit_sha})` : '';
const notes = userInput.notes || '';

const changelogEntry = `| ${today} | ${version} | ${prInfo} merged ${commitInfo}. ${notes} Story closed. | Pax (@po) |`;

// Insert before last row of changelog table
const finalStory = insertChangelogEntry(updatedStory, changelogEntry);

// Write back
fs.writeFileSync(storyPath, finalStory);
console.log('✅ Story updated: Status → Done, Changelog added');
```

### 4. Atualizar o Índice do Epic (se aplicável)

```javascript
if (epicId) {
  const epicIndexPath = findEpicIndex(storyPath);

  if (epicIndexPath) {
    const epicContent = fs.readFileSync(epicIndexPath, 'utf8');

    // Update story status in table (Draft/Approved → Done)
    let updatedEpic = epicContent.replace(
      new RegExp(`\\| ${storyId} \\| [📋🔄] \\w+`, 'g'),
      `| ${storyId} | ✅ Done`
    );

    // Update Epic status if all stories done
    const storiesRemaining = countPendingStories(updatedEpic);
    const totalStories = countTotalStories(updatedEpic);
    const completedStories = totalStories - storiesRemaining;

    if (storiesRemaining === 0) {
      updatedEpic = updatedEpic.replace(
        /\*\*Status:\*\* .+/,
        '**Status:** Complete'
      );
    } else {
      updatedEpic = updatedEpic.replace(
        /\*\*Status:\*\* .+/,
        `**Status:** Implementation In Progress (${completedStories}/${totalStories} stories done)`
      );
    }

    // Update review checkboxes if applicable
    updatedEpic = updateReviewStatus(updatedEpic, '@po', 'checked');

    fs.writeFileSync(epicIndexPath, updatedEpic);
    console.log(`✅ Epic index updated: ${completedStories}/${totalStories} complete`);
  }
}
```

### 5. Sugerir a Próxima Story

```javascript
// Find next story in epic
if (epicId) {
  const nextStory = findNextPendingStory(epicIndexPath, storyId);

  if (nextStory) {
    console.log('\n## 🎯 Suggested Next Story\n');
    console.log(`**${nextStory.id}:** ${nextStory.title}`);
    console.log(`**Status:** ${nextStory.status}`);
    console.log(`**Owner:** ${nextStory.owner}`);
    console.log(`**File:** ${nextStory.file}`);
    console.log('\n**Quick Actions:**');
    console.log(`- Validate: \`*validate-story-draft ${nextStory.file}\``);
    console.log(`- View: \`Read ${nextStory.file}\``);
  } else {
    console.log('\n## 🎉 Epic Complete!\n');
    console.log(`All stories in Epic ${epicId} are done.`);
    console.log('\n**Quick Actions:**');
    console.log('- Review backlog: `*backlog-review`');
    console.log('- Start new epic: `@pm *create-epic`');
  }
}
```

### 6. Atualizar as Estatísticas do Backlog (opcional)

```javascript
// Update docs/stories/backlog.md statistics if applicable
const backlogPath = 'docs/stories/backlog.md';
if (fs.existsSync(backlogPath)) {
  // Increment completed stories count
  // Update last updated date
  // Add to resolved items if story was in backlog
}
```

### 7. Saída de Resumo

```markdown
## ✅ Story Fechada: ${storyId}

**Story:** ${storyTitle}
**Status:** Done
**PR:** #${pr_number} (${commit_sha})
**Changelog:** v${version} adicionado

### Progresso do Epic
**Epic:** ${epicId}
**Progresso:** ${completedStories}/${totalStories} stories concluídas
**Status:** ${epicStatus}

### Próximos Passos
${nextStorySuggestion}

---
— Pax, equilibrando prioridades 🎯
```

---

## Tratamento de Erros

- **Story não encontrada:** Mostrar as stories disponíveis no diretório
- **Índice do epic não encontrado:** Atualizar apenas a story, pular atualizações do epic
- **PR não encontrado:** Permitir fechar sem informações de PR (merge manual)
- **Permissão de escrita negada:** Mostrar instruções de atualização manual

---

## Exemplo de Uso

```bash
# Interactive mode (recommended)
*close-story epics/epic-pro-aiox-pro-architecture/story-pro-5-repo-bootstrap.md

# With PR info
*close-story story-pro-5-repo-bootstrap.md --pr 84 --commit ce19c81a

# YOLO mode for quick closure
*close-story story-pro-5.md --mode yolo
```

---

## Pontos de Integração

**Complementa:**
- `*validate-story-draft` - Início do ciclo de vida da story (validação)
- `*close-story` - Fim do ciclo de vida da story (fechamento)

**Tasks Relacionadas:**
- `po-backlog-add.md` - Adicionar itens descobertos durante o fechamento
- `po-stories-index.md` - Regenerar o índice de stories após o fechamento
- `po-sync-story.md` - Sincronizar a story fechada com a ferramenta de PM

---

## Testes

```bash
# Test with sample story
*close-story epics/epic-test/story-test-1.md --pr 999 --commit abc1234

# Verify:
# - Story status changed to Done
# - Changelog entry added
# - Epic index updated (if applicable)
# - Next story suggested
```

---

## Metadados

```yaml
story: PRO-5 retrospective
version: 1.0.0
dependencies:
  - validate-next-story.md
tags:
  - product-management
  - story-lifecycle
  - epic-management
created_at: 2026-02-05
updated_at: 2026-02-05
```

---

**Tasks Relacionadas:**
- `validate-next-story.md` - Valida a story antes da implementação (INÍCIO)
- `po-close-story.md` - Fecha a story após o merge (FIM)
- `po-backlog-review.md` - Revisar o backlog para o planejamento de sprint

## Handoff
next_agent: @sm
next_command: *draft
condition: Story fechada, próxima story do epic disponível
alternatives:
  - agent: @po, command: *backlog-review, condition: Revisão de sprint necessária antes da próxima story
