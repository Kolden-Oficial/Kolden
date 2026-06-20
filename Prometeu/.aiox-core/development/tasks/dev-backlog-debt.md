# Dev Task: Registrar Dívida Técnica

**Agente:** @dev
**Comando:** `*backlog-debt`
**Propósito:** Registrar item de dívida técnica no backlog
**Criado:** 2025-01-16 (Story 6.1.2.6)

---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com registro em log
- Interação mínima com o usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pre-Flight - Planejamento Abrangente Antecipado
- Fase de análise da tarefa (identificar todas as ambiguidades)
- Execução com zero ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: devBacklogDebt()
responsável: Dex (Builder)
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
  - [ ] Task está registrada; parâmetros obrigatórios fornecidos; dependências atendidas
    tipo: pre-condition
    blocker: true
    validação: |
      Verificar se a task está registrada; parâmetros obrigatórios fornecidos; dependências atendidas
    error_message: "Pré-condição falhou: Task está registrada; parâmetros obrigatórios fornecidos; dependências atendidas"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução DEPOIS que a task é concluída

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

- **Ferramenta:** task-runner
  - **Propósito:** Execução e orquestração de tasks
  - **Origem:** .aiox-core/core/task-runner.js

- **Ferramenta:** logger
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
   - **Causa:** Task especificada não está registrada no sistema
   - **Resolução:** Verificar o nome da task e o registro
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
duration_expected: 5-15 min (estimado)
cost_estimated: $0.003-0.010
token_usage: ~3.000-10.000 tokens
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
  - development
  - code
updated_at: 2025-11-17
```

---


## Fluxo da Task

### 1. Elicitar Detalhes da Dívida Técnica
```yaml
elicit: true
questions:
  - Título (descrição de 1 linha):
    input: text
    validation: mínimo 10 caracteres, máximo 100 caracteres
    example: "Refatorar lógica de autenticação para usar injeção de dependência"

  - Descrição Detalhada:
    input: textarea
    validation: máximo 500 caracteres
    placeholder: "Descreva o que precisa de melhoria e por que é considerado dívida técnica"
    example: |
      A lógica de autenticação atual tem acoplamento forte com a camada de banco de dados.
      Deveria usar o padrão DI para melhorar testabilidade e manutenibilidade.
      Impacta: auth.js, user-service.js, session-manager.js

  - Prioridade:
    options:
      - Crítica (🔴) - Code smell severo, risco de segurança ou bloqueio de trabalho futuro
      - Alta (🟠) - Problema significativo de manutenibilidade
      - Média (🟡) - Melhoria de qualidade
      - Baixa (🟢) - Refatoração desejável
    default: Média
    note: "Seja honesto quanto ao impacto - nem toda dívida é crítica"

  - ID da Story Relacionada (opcional):
    input: text
    example: "6.1.2.6"
    note: "Vincular à story onde a dívida foi identificada ou introduzida"

  - Tags (opcional, separadas por vírgula):
    input: text
    example: "refactoring, architecture, testing"
    suggestions: [
      "refactoring",
      "architecture",
      "testing",
      "performance",
      "security",
      "duplication",
      "coupling",
      "naming",
      "documentation"
    ]

  - Esforço Estimado (opcional):
    input: text
    example: "4 horas", "2 dias", "1 semana"
    default: "A DEFINIR"
    note: "Uma estimativa aproximada ajuda na priorização"

  - Área de Impacto (opcional):
    input: text
    example: "autenticação, gestão de usuários"
    note: "Qual parte do codebase é afetada"
```

### 2. Validar Entrada
```javascript
// Validar se a story existe, caso fornecida
if (relatedStory) {
  const storyPath = `docs/stories/**/*${relatedStory}*.md`;
  const matches = await glob(storyPath);

  if (matches.length === 0) {
    console.log(`⚠️ Story not found: ${relatedStory}`);
    console.log('   Proceeding without related story link');
    relatedStory = null;
  }

  if (matches.length > 1) {
    console.log('⚠️ Multiple stories matched, using first:');
    matches.forEach(m => console.log(`  - ${m}`));
  }
}

// Analisar tags
const tags = tagsInput ? tagsInput.split(',').map(t => t.trim()) : [];
if (impactArea) {
  tags.push(`area:${impactArea}`);
}
```

### 3. Adicionar ao Backlog
```javascript
const { BacklogManager } = require('.aiox-core/scripts/backlog-manager');

const manager = new BacklogManager('docs/stories/backlog.md');
await manager.load();

// Dev sempre cria o tipo Technical Debt (T)
const item = await manager.addItem({
  type: 'T',  // Technical Debt
  title: title,
  description: description,
  priority: priority,
  relatedStory: relatedStory || null,
  createdBy: '@dev',
  tags: tags,
  estimatedEffort: estimatedEffort
});

console.log(`✅ Technical debt registered: ${item.id}`);
```

### 4. Regenerar o Backlog
```javascript
await manager.generateBacklogFile();

console.log('✅ Backlog updated: docs/stories/backlog.md');
```

### 5. Saída do Resumo
```markdown
## 🔧 Dívida Técnica Registrada

**ID:** ${item.id}
**Tipo:** 🔧 Dívida Técnica
**Título:** ${title}
**Prioridade:** ${priorityEmoji} ${priority}
**Story Relacionada:** ${relatedStory || 'Nenhuma'}
**Esforço Estimado:** ${estimatedEffort}
**Área de Impacto:** ${impactArea || 'Não especificada'}
**Tags:** ${tags.join(', ') || 'Nenhuma'}

**Descrição:**
${description}

**Próximos Passos:**
- Revisar no backlog: docs/stories/backlog.md
- @po irá priorizar com `*backlog-prioritize ${item.id}`
- Pode ser tratada em uma story dedicada de refatoração ou junto a trabalho relacionado

${priority === 'Critical'
  ? '⚠️ **DÍVIDA CRÍTICA** - Deve ser tratada em breve para evitar o bloqueio de trabalho futuro'
  : ''
}
```

---

## Exemplo de Uso

```bash
# Durante o desenvolvimento da Story 6.1.2.6
*backlog-debt

# Exemplos de respostas:
Título: Adicionar testes unitários para o utilitário decision-log-generator
Descrição: decision-log-generator.js tem 0% de cobertura de testes. São necessários testes unitários abrangentes para todas as funções auxiliares (calculateDuration, generateDecisionsList, etc.) e para a função principal generateDecisionLog.
Prioridade: Alta
Story Relacionada: 6.1.2.6
Tags: testing, coverage, utilities
Esforço: 3 horas
Área de Impacto: registro de decisões

# Saída:
✅ Technical debt registered: 1763298999001
✅ Backlog updated: docs/stories/backlog.md

🔧 Dívida Técnica Registrada
ID: 1763298999001
Tipo: 🔧 Dívida Técnica
Título: Adicionar testes unitários para o utilitário decision-log-generator
Prioridade: 🟠 Alta
...
```

---

## Diretrizes Específicas do Dev

1. **Seja Proativo** - Registre a dívida quando a notar, não espere
2. **Seja Honesto** - Nem toda dívida é crítica, priorize com precisão
3. **Seja Específico** - Inclua nomes de arquivos, funções, padrões envolvidos
4. **Seja Realista** - Estime o esforço para ajudar na priorização
5. **Marque com Tags Apropriadas** - Use tags para facilitar a filtragem depois

### Quando Registrar Dívida Técnica

**REGISTRE:**
- Duplicação de código em 3 ou mais arquivos
- Cobertura de testes ausente para caminhos críticos
- Valores hard-coded que deveriam ser configuráveis
- Nomenclatura ruim que obscurece a intenção
- Acoplamento forte impedindo a testabilidade
- Gargalos de performance
- Anti-padrões de segurança

**NÃO REGISTRE:**
- Preferências de estilo minuciosas
- Otimizações prematuras
- "Eu teria feito diferente"
- Complexidade normal da lógica de negócio

---

## Tratamento de Erros

- **Story não encontrada:** Registrar aviso, prosseguir sem o vínculo
- **Prioridade inválida:** Usar Média como padrão
- **Backlog bloqueado:** Tentar novamente 3x com 1s de intervalo
- **Sem descrição:** Exigir pelo menos o título

---

## Testes

```bash
# Testar o fluxo de registro
*backlog-debt

# Preencher com dados de teste:
Título: Item de teste de dívida técnica
Descrição: Este é um item de dívida de teste
Prioridade: Baixa
Story Relacionada: 6.1.2.6
Tags: test
Esforço: 1 hora

# Verificar:
cat docs/stories/backlog.md
# - Item aparece na seção Technical Debt
# - Ordenação por prioridade correta
# - Tags exibidas
# - Link da story relacionada funciona

cat docs/stories/backlog.json
# - Item tem type: "T"
# - createdBy: "@dev"
# - Todos os campos preenchidos corretamente
```

---

## Integração com npm Scripts

Adicionar ao `package.json`:

```json
{
  "scripts": {
    "debt:add": "echo 'Use *backlog-debt command from @dev agent'",
    "debt:review": "node .aiox-core/scripts/backlog-manager.js stats"
  }
}
```

---

**Tasks Relacionadas:**
- `develop-story.md` - Workflow principal de desenvolvimento
- `apply-qa-fixes.md` - Tratamento do feedback de QA
- `po-backlog-review.md` - O PO revisa todos os itens de dívida
