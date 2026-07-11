---
tools:
  - git               # Rastrear mudanças no arquivo de backlog
  - context7          # Pesquisar boas práticas de gestão de backlog
checklists:
  - backlog-management-checklist.md
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# manage-story-backlog

Gerencie o arquivo STORY-BACKLOG.md para rastrear tarefas de follow-up, dívida técnica e oportunidades de otimização identificadas durante revisões de stories, desenvolvimento e processos de QA.

## Propósito

O Story Backlog oferece uma forma centralizada e estruturada de:
- Rastrear tarefas de follow-up identificadas durante as revisões de QA
- Documentar dívida técnica oriunda do desenvolvimento
- Capturar oportunidades de otimização
- Priorizar trabalho entre sprints
- Manter visibilidade sobre o trabalho adiado

## Pré-requisitos

- Revisão da story concluída (para itens originados do QA)
- Desenvolvimento da story concluído (para itens originados do dev)
- Entendimento claro do problema/oportunidade sendo rastreado

## Local do Arquivo de Backlog

**Local**: Configurado em `core-config.yaml` como `storyBacklogLocation`
**Padrão**: `docs/STORY-BACKLOG.md`
**Formato**: Markdown com frontmatter YAML para metadados

## Operações

### 1. Adicionar Novo Item de Backlog

**Disparo**: Após a revisão de QA, durante o desenvolvimento ou na priorização do PM

**Parâmetros de Entrada**:
```yaml
required:
  - story_id: 'STORY-XXX' # Source story
  - item_type: 'F' # F=followup, O=optimization, T=technical-debt
  - priority: 'HIGH|MEDIUM|LOW' # Priority level
  - title: 'Brief title' # Concise description
  - description: 'Detailed description' # What needs to be done
  - effort: '1 hour' # Time estimate

optional:
  - source: 'QA Review' # Where it came from
  - assignee: 'Backend Developer' # Who should do it
  - sprint: 'Sprint 1' # When to do it
  - risk: 'LOW|MEDIUM|HIGH' # Risk if not done
  - success_criteria: [] # How to validate completion
  - acceptance: 'How to accept as done'
```

**Processo**:
1. Leia o `STORY-BACKLOG.md` existente
2. Gere um ID único: `[{story_id}-{item_type}{sequential_number}]`
   - Exemplo: `[STORY-013-F1]` (primeiro follow-up da STORY-013)
   - Exemplo: `[STORY-013-O2]` (segunda otimização da STORY-013)
3. Determine a seção de prioridade (🔴 HIGH, 🟡 MEDIUM, 🟢 LOW)
4. Crie o item usando o template (veja abaixo)
5. Insira na seção de prioridade apropriada
6. Atualize a seção de estatísticas
7. Escreva o arquivo de backlog atualizado

**Template do Item**:
```markdown
#### [{story_id}-{type}{num}] {title}
- **Origem**: {source}
- **Prioridade**: {priority_emoji} {priority}
- **Esforço**: {effort}
- **Status**: 📋 TODO
- **Responsável**: {assignee}
- **Sprint**: {sprint}
- **Descrição**: {description}
- **Critérios de Sucesso**:
  {para cada critério}
  - [ ] {criterion}
- **Aceitação**: {acceptance}

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
task: poManageStoryBacklog()
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

## Pré-condições

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

## Pós-condições

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

**Propósito:** Critérios definitivos de pass/fail para a conclusão da task

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
  - **Origem:** .aiox-core/core/task-runner.js

- **Ferramenta:** logger
  - **Propósito:** Logging de execução e rastreamento de erros
  - **Origem:** .aiox-core/utils/logger.js

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** execute-task.js
  - **Propósito:** Wrapper genérico de execução de task
  - **Linguagem:** JavaScript
  - **Local:** .aiox-core/scripts/execute-task.js

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
   - **Causa:** A task excede o tempo máximo de execução
   - **Resolução:** Otimizar a task ou aumentar o timeout
   - **Recuperação:** Encerrar a task, limpar recursos, registrar estado

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

```

### 2. Atualizar Status do Item de Backlog

**Disparo**: Trabalho iniciado, concluído ou bloqueado

**Parâmetros de Entrada**:
```yaml
required:
  - item_id: '[STORY-XXX-FY]' # Item to update
  - new_status: 'TODO|IN_PROGRESS|BLOCKED|DONE|CANCELLED'

optional:
  - blocker_reason: 'Why blocked' # If status=BLOCKED
  - completion_notes: 'Notes on completion' # If status=DONE
```

**Processo**:
1. Encontre o item pelo ID no arquivo de backlog
2. Atualize o campo de status
3. Adicione a data de conclusão se DONE
4. Mova para a seção apropriada se a prioridade mudou
5. Atualize as estatísticas
6. Escreva o arquivo atualizado

**Valores de Status**:
- 📋 **TODO**: Não iniciado
- 🚧 **IN PROGRESS**: Em andamento atualmente
- ⏸️ **BLOCKED**: Aguardando dependência
- ✅ **DONE**: Concluído e verificado
- 💡 **IDEA**: Proposto mas ainda não aprovado
- ❌ **CANCELLED**: Decidiu-se não implementar

### 3. Revisar Backlog

**Disparo**: Reunião semanal de revisão de backlog

**Processo**:
1. Leia o arquivo de backlog inteiro
2. Gere um relatório de revisão:
   - Itens por status
   - Itens por prioridade
   - Itens por sprint
   - Itens atrasados
   - Itens bloqueados
3. Sugira ajustes de prioridade com base em:
   - Idade do item
   - Dependências
   - Prazos do sprint
   - Capacidade da equipe
4. Produza um resumo da revisão

**Perguntas de Revisão**:
- Todos os itens 📋 TODO ainda são relevantes?
- Algum item 💡 IDEA deveria ser promovido a TODO?
- Algum item está bloqueado por tempo demais?
- As prioridades ainda fazem sentido?
- As estimativas de esforço estão precisas?

### 4. Arquivar Itens Concluídos

**Disparo**: Mensalmente ou quando o backlog fica grande demais

**Processo**:
1. Colete todos os itens ✅ DONE
2. Crie o arquivo de arquivamento: `docs/qa/backlog-archive-{YYYY-MM}.md`
3. Mova os itens DONE para o arquivo de arquivamento com metadados de conclusão
4. Remova do backlog principal
5. Atualize as estatísticas
6. Mantenha o registro histórico

### 5. Gerar Relatório de Backlog

**Disparo**: Planejamento de sprint, solicitações de stakeholders

**Opções de Saída**:
- **Resumo**: Contagem de itens por prioridade/status/sprint
- **Detalhado**: Lista completa de itens com todos os campos
- **Visão por Sprint**: Itens agrupados por sprint
- **Visão por Equipe**: Itens agrupados por responsável
- **Visão de Risco**: Itens de alto risco que exigem atenção

## Dependências de Configuração

Esta task requer as seguintes chaves de configuração do `core-config.yaml`:

- **`storyBacklogLocation`**: Local do arquivo de backlog de stories (padrão: `docs/STORY-BACKLOG.md`)
- **`devStoryLocation`**: Local dos arquivos de story (para validar as stories de origem)
- **`qaLocation`**: Diretório de saída do QA (para vincular as revisões de QA)

**Exemplo de Adição de Config**:
```yaml
# Story Backlog Management (added with Story Backlog feature)
storyBacklog:
  enabled: true
  backlogLocation: docs/STORY-BACKLOG.md
  archiveLocation: docs/qa/backlog-archive
  reviewSchedule: weekly # weekly, biweekly, monthly
  autoArchiveAfter: 30 # days after completion
```

## Pontos de Integração

### Integração com o Agente QA

Após concluir a revisão da story (task `review-story`), o agente QA deve:
1. Identificar follow-ups, dívida técnica, otimizações
2. Chamar `manage-story-backlog` com operation='add' para cada item
3. Referenciar os itens de backlog na seção QA Results

**Exemplo de Adição em QA Results**:
```markdown
### Recommended Actions
1. ✅ **Commit immediately** - Unblocks dependent stories
2. 📝 **Created [STORY-013-F1]**: Install Jest+ESM transformer (tracked in backlog)
3. 📝 **Created [STORY-013-F2]**: Add integration tests (tracked in backlog)
```

### Integração com o Agente Dev

Durante o desenvolvimento (task `develop-story`), o agente dev deve:
1. Anotar a dívida técnica incorrida em prol da velocidade
2. Identificar oportunidades de otimização
3. Adicionar itens ao backlog com `source: Development`

**Exemplo de Uso**:
```javascript
// Dev notices optimization opportunity during implementation
await addBacklogItem({
  story_id: 'STORY-013',
  item_type: 'O',
  priority: 'LOW',
  title: 'Optimize multi-service query performance',
  description: 'Add database indexes on service column for better query performance',
  effort: '2 hours',
  source: 'Development',
  assignee: 'Backend Developer',
  sprint: 'Sprint 2'
});
```

### Integração com o Agente PO

O Product Owner usa o backlog para:
1. Priorização do planejamento de sprint
2. Revisões semanais de backlog
3. Gestão de dívida técnica
4. Reporte a stakeholders

**Comandos do PO** (veja a atualização do agente abaixo):
- `*backlog-review`: Gera o relatório de revisão para o planejamento de sprint
- `*backlog-summary`: Resumo rápido do status do backlog
- `*backlog-prioritize`: Repriorizar itens com base em novas informações

## Ciclo de Vida do Item de Backlog

```
┌──────────┐
│   IDEA   │ ← Proposed items
└────┬─────┘
     │ (approved)
     ▼
┌──────────┐
│   TODO   │ ← Ready for work
└────┬─────┘
     │ (started)
     ▼
┌──────────┐
│IN PROGRESS│ ← Actively being worked
└────┬─────┘
     │
     ├─(blocked)──▶ ⏸️  BLOCKED
     │
     ├─(cancelled)─▶ ❌ CANCELLED
     │
     └─(completed)─▶ ✅ DONE ──▶ 📦 ARCHIVED
```

## Boas Práticas

1. **Seja Específico**: Descrições claras e acionáveis
2. **Dimensione Adequadamente**: Quebre itens grandes em menores (< 8 horas)
3. **Vincule o Contexto**: Referencie a story de origem, o relatório de QA ou o documento de decisão
4. **Estime com Honestidade**: Inclua estimativas de esforço para o planejamento
5. **Revise Regularmente**: Revisões semanais mantêm o backlog saudável
6. **Arquive Prontamente**: Não deixe o backlog estagnar com itens DONE antigos
7. **Rastreie Dependências**: Anote blockers e dependências
8. **Celebre a Conclusão**: Marque itens como DONE, não os deixe se arrastando

## Exemplo de Fluxo de Trabalho

**Após a Revisão de QA da STORY-013**:
1. O QA identifica 3 follow-ups
2. O QA chama `manage-story-backlog` 3 vezes:
   ```bash
   # Add Jest+ESM config item
   *backlog-add STORY-013 F HIGH "Install Jest+ESM transformer" "..."

   # Add integration tests item
   *backlog-add STORY-013 F HIGH "Create integration tests" "..."

   # Add README update item
   *backlog-add STORY-013 F MEDIUM "Update README documentation" "..."
   ```
3. Os itens aparecem no backlog com os IDs `[STORY-013-F1]`, `[STORY-013-F2]`, `[STORY-013-F3]`
4. Planejamento de sprint: o PO chama `*backlog-review`
5. A equipe se compromete com F1 e F2 no Sprint 1, adia F3 para o Sprint 2
6. O Dev inicia F1, atualiza o status para IN_PROGRESS
7. O Dev conclui F1, atualiza o status para DONE
8. O arquivamento mensal move F1 para o arquivo de arquivamento

## Métricas de Sucesso

Acompanhe a eficácia do Story Backlog:
- **Taxa de Conclusão de Itens**: % de itens do backlog concluídos
- **Idade dos Itens**: Quanto tempo os itens ficam no estado TODO
- **Resolução de Itens Bloqueados**: Tempo para desbloquear itens bloqueados
- **Frequência de Arquivamento**: O arquivamento regular indica um fluxo saudável
- **Precisão do Compromisso de Sprint**: % de itens do backlog comprometidos que foram concluídos

## Tasks Relacionadas

- `review-story.md`: Cria itens de backlog durante a revisão de QA
- `develop-story.md`: Pode criar itens de backlog durante o desenvolvimento
- `execute-checklist.md`: Pode identificar itens de backlog durante a validação

## Templates Relacionados

- `story-backlog-item-tmpl.yaml`: Template para itens individuais de backlog
- `story-backlog-report-tmpl.yaml`: Template para relatórios de backlog

---

*Criado: 2025-11-11*
*Propósito: Integrar oficialmente o Story Backlog ao framework AIOX*
*Story: STORY-013 QA Review Process*
