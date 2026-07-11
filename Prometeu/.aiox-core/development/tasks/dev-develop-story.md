---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Tarefa Desenvolver Story

## Propósito

Executar o desenvolvimento de story com modos de automação selecionáveis para acomodar diferentes preferências de desenvolvedores, níveis de habilidade e complexidade de story.

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

**Uso**:
```
*develop {story-id}           # Usa o modo interativo (padrão)
*develop {story-id} yolo      # Usa o modo YOLO
*develop {story-id} preflight # Usa o modo de planejamento pre-flight
```

**Tratamento de Casos Extremos**:
- Modo inválido → Usar interativo como padrão com aviso
- Cancelamento pelo usuário → Sair graciosamente com mensagem
- Arquivo de story ausente → Mensagem de erro clara, interromper a execução
- Compatibilidade retroativa → Stories sem o parâmetro de modo usam o interativo

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: devDevelopStory()
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

## Gates Constitucionais

> **Referência:** Constitution Artigos I, III
> **Enforcement:** Validação automática antes da execução

### Gate 1: Story-Driven Development (Artigo III)

```yaml
constitutional_gate:
  article: III
  name: Story-Driven Development
  severity: BLOCK

  validation:
    - O arquivo da story DEVE existir em docs/stories/{storyId}/story.yaml
    - A story DEVE ter status != "Draft" (Ready, In Progress ou Done)
    - A story DEVE ter critérios de aceite definidos
    - A story DEVE ter pelo menos uma task/subtask

  on_violation:
    action: BLOCK
    message: |
      VIOLAÇÃO CONSTITUCIONAL: Artigo III - Story-Driven Development
      Não é possível desenvolver sem uma story válida.

      Problema: {violation_details}

      Resolução: Crie ou atualize a story via @sm *draft ou @po *create-story
```

### Gate 2: CLI First (Artigo I)

```yaml
constitutional_gate:
  article: I
  name: CLI First
  severity: WARN

  validation:
    - Se a story envolve nova funcionalidade:
      - A implementação de CLI DEVERIA existir ou ser criada primeiro
      - Componentes de UI NÃO DEVERIAM ser criados antes de a CLI estar funcional

  on_violation:
    action: WARN
    message: |
      AVISO CONSTITUCIONAL: Artigo I - CLI First
      Implementação de UI detectada sem fundação de CLI.

      Lembrete: CLI First → Observability Second → UI Third

      Continuar mesmo assim? (Isto será registrado em log)
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Gates constitucionais aprovados (Artigo III: Story existe, Artigo I: verificação CLI First)
    tipo: constitutional-gate
    blocker: true
    validação: |
      Verificar se a story existe e tem estrutura válida
    error_message: "Violação constitucional - veja a saída do gate acima"

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

## Scripts

**Código específico do agente para esta task:**

- **Script:** execute-task.js
  - **Propósito:** Wrapper genérico de execução de tasks
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/scripts/execute-task.js

---

## Tratamento de Erros

**Estratégia:** abort

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


## Modo: YOLO (Autônomo)

### Workflow

**CRÍTICO: Integração de Registro de Decisões (Story 6.1.2.6.2 Fase 2)**

Antes de começar, carregue a infraestrutura de registro de decisões:
```javascript
const {
  initializeDecisionLogging,
  recordDecision,
  trackFile,
  trackTest,
  completeDecisionLogging
} = require('./.aiox-core/scripts/decision-recorder');
```

1. **Inicialização** (No Início do Modo Yolo)
   - Ler o arquivo da story por completo
   - Extrair o caminho da story do contexto
   - **Inicializar o registro de decisões**:
     ```javascript
     const context = await initializeDecisionLogging('dev', storyPath, {
       agentLoadTime: loadTimeInMs  // From agent startup metrics
     });
     ```
   - Identificar todas as tasks e critérios de aceite
   - Analisar os requisitos técnicos

2. **Execução da Task** (Loop autônomo)
   - Ler a próxima task
   - **Tomar decisões autônomas** e REGISTRAR imediatamente:

     **Escolhas de arquitetura**:
     ```javascript
     recordDecision({
       description: 'Use microservices architecture for user service',
       reason: 'Better scalability and independent deployment',
       alternatives: ['Monolithic architecture', 'Serverless functions'],
       type: 'architecture',
       priority: 'high'
     });
     ```

     **Seleções de biblioteca**:
     ```javascript
     recordDecision({
       description: 'Use Axios for HTTP client',
       reason: 'Better error handling, interceptor support, TypeScript definitions',
       alternatives: ['Fetch API (native)', 'Got library', 'node-fetch'],
       type: 'library-choice',
       priority: 'medium'
     });
     ```

     **Implementações de algoritmo**:
     ```javascript
     recordDecision({
       description: 'Use binary search for user lookup',
       reason: 'O(log n) performance vs O(n) linear search',
       alternatives: ['Linear search', 'Hash map lookup'],
       type: 'algorithm',
       priority: 'medium'
     });
     ```

   - Implementar a task e as subtasks
   - **Rastrear modificações de arquivo**:
     ```javascript
     trackFile('src/api/users.js', 'created');
     trackFile('package.json', 'modified');
     trackFile('src/legacy/old-api.js', 'deleted');
     ```

   - Escrever testes
   - Executar validações
   - **Rastrear a execução de testes**:
     ```javascript
     trackTest({
       name: 'users.test.js',
       passed: true,
       duration: 125  // milliseconds
     });
     ```

   - Marcar a task como concluída [x] apenas se TODAS as validações passarem
   - Atualizar a File List

3. **Registro de Decisões** (Automático)
   - Todas as decisões rastreadas em memória durante a execução
   - Operações de arquivo registradas automaticamente
   - Resultados de testes registrados
   - Métricas coletadas (tempo de execução, tempo de carregamento do agente)
   - **Formato**: Compatível com ADR (Architecture Decision Record)
   - **Nenhum registro manual necessário** - use apenas a API

4. **Conclusão** (Na Conclusão do Modo Yolo)
   - Todas as tasks concluídas
   - Todos os testes passam
   - Executar o story-dod-checklist
   - Definir status: "InReview" (veja a seção Transições de Status)
   - **Gerar o decision log**:
     ```javascript
     const logPath = await completeDecisionLogging(storyId, 'completed');
     console.log(`📝 Decision log saved: ${logPath}`);
     ```
   - **Resumo**: Resumo do decision log exibido automaticamente
   - Arquivo de log: `.ai/decision-log-{story-id}.md` (formato ADR)

**Prompts ao Usuário**: 0-1 (apenas se um problema bloqueante exigir aprovação)

---

## Modo: Interativo (Equilibrado) **[PADRÃO]**

### Workflow

1. **Análise da Story** (Com o Usuário)
   - Ler o arquivo da story por completo
   - Apresentar um resumo das tasks e dos AC
   - Confirmar o entendimento com o usuário

2. **Execução da Task** (Loop interativo)
   - Ler a próxima task
   - **Checkpoints de Decisão** (Solicitar ao usuário em):
     - Decisões de arquitetura (ex.: "Usar microsserviços ou monólito?")
     - Seleções de biblioteca (ex.: "Usar Axios ou Fetch?")
     - Escolhas de algoritmo (ex.: "Usar BFS ou DFS para percorrer o grafo?")
     - Abordagens de teste (ex.: "Testes unitários ou de integração primeiro?")

   - **Explicações Educativas**:
     - Antes de cada decisão: Explicar as opções e os trade-offs
     - Após a escolha do usuário: Explicar por que é uma boa opção para este contexto
     - Durante a implementação: Explicar o que você está fazendo e por quê

   - Implementar a task e as subtasks
   - Escrever testes
   - Executar validações
   - Mostrar os resultados ao usuário antes de marcar [x]
   - Atualizar a File List

3. **Conclusão**
   - Todas as tasks concluídas
   - Todos os testes passam
   - Executar o story-dod-checklist
   - Apresentar o resumo de conclusão ao usuário
   - Definir status: "InReview" (veja a seção Transições de Status)

**Prompts ao Usuário**: 5-10 (equilibrado entre controle e velocidade)

---

## Modo: Planejamento Pre-Flight (Abrangente)

### Workflow

1. **Fase de Análise da Story**
   - Ler o arquivo da story por completo
   - **Identificar todas as ambiguidades**:
     - Especificações técnicas ausentes
     - Escolhas de biblioteca não especificadas
     - Critérios de aceite pouco claros
     - Tratamento de casos extremos indefinido
     - Orientação de testes ausente

2. **Geração de Questionário**
   - Gerar perguntas abrangentes cobrindo:
     - Decisões de arquitetura
     - Escolhas de biblioteca e framework
     - Seleções de algoritmo e estrutura de dados
     - Estratégia de testes
     - Tratamento de casos extremos
     - Requisitos de performance
     - Considerações de segurança

   - Apresentar todas as perguntas ao usuário de uma vez
   - Coletar todas as respostas em lote

3. **Criação do Plano de Execução**
   - Criar um plano de execução detalhado com todas as decisões documentadas
   - Apresentar o plano ao usuário para aprovação
   - Aguardar a confirmação do usuário antes de prosseguir

4. **Execução com Zero Ambiguidade**
   - Executar as tasks com contexto completo do questionário
   - Sem pontos de decisão adicionais (tudo decidido no pre-flight)
   - Implementar a task e as subtasks
   - Escrever testes
   - Executar validações
   - Marcar a task como concluída [x] apenas se TODAS as validações passarem
   - Atualizar a File List

5. **Conclusão**
   - Todas as tasks concluídas
   - Todos os testes passam
   - Executar o story-dod-checklist
   - Apresentar o resumo de execução vs. o plano
   - Definir status: "InReview" (veja a seção Transições de Status)

**Prompts ao Usuário**: Todos antecipadamente (fase de questionário), depois 0 durante a execução

---

## Workflow Comum (Todos os Modos)

### Ordem de Execução

1. Ler a (primeira ou próxima) task
2. **Verificação de Code Intelligence (IDS G4)** — Antes de criar novos arquivos ou funções:
   - Se a code intelligence estiver disponível (`isCodeIntelAvailable()` de `.aiox-core/core/code-intel`):
     - Chamar `checkBeforeWriting(fileName, description)` de `.aiox-core/core/code-intel/helpers/dev-helper`
     - Se o resultado não for nulo, exibir como **"Sugestão de Code Intelligence"** (aviso não bloqueante)
     - Registrar a sugestão no decision-log se estiver no modo YOLO
   - Se a code intelligence NÃO estiver disponível: pular silenciosamente (impacto zero no workflow)
3. Implementar a task e suas subtasks
4. Escrever testes
5. Executar validações
6. **Apenas se TODOS passarem**: Marcar o checkbox da task [x]
7. Atualizar a File List da story (garantir que todos os arquivos criados/modificados/excluídos estejam listados)
8. Repetir até que todas as tasks estejam concluídas

### Atualizações do Arquivo de Story (Todos os Modos)

**CRÍTICO**: Atualize APENAS estas seções:
- Checkboxes de Tasks / Subtasks
- Seção Dev Agent Record e todas as suas subseções
- Agent Model Used
- Debug Log References
- Completion Notes List
- File List
- Change Log (adicionar entrada na conclusão)
- Status (definir como "InReview" quando concluído — veja a seção Transições de Status)

**NÃO modifique**: as seções Story, Acceptance Criteria, Dev Notes, Testing

### Condições de Bloqueio (Todos os Modos)

**INTERROMPA e pergunte ao usuário se**:
- Dependências não aprovadas forem necessárias
- Requisitos ambíguos após verificar a story
- 3 falhas ao tentar implementar ou corrigir algo
- Configuração ausente
- Testes de regressão falhando

### Critérios de InReview (Todos os Modos)

- O código atende a todos os requisitos
- Todas as validações passam
- Segue os padrões de codificação
- A File List está completa e precisa

### Checklist de Conclusão (Todos os Modos)

1. Todas as tasks e subtasks marcadas [x]
2. Todas têm testes correspondentes
3. Todas as validações passam
4. A suíte completa de testes de regressão passa
5. A File List está completa
6. **Executar o Loop de Auto-cura do CodeRabbit** (veja abaixo)
7. Executar `.aiox-core/product/checklists/story-dod-checklist.md`
8. Definir o status da story: "InReview" (veja a seção Transições de Status)
9. INTERROMPER (não prosseguir adiante)

---

## Loop de Auto-cura do CodeRabbit (Story 6.3.3)

**Propósito**: Detectar e corrigir automaticamente problemas de qualidade de código antes de marcar a story como "Ready for Review"

**Configuração**: Auto-cura leve (máximo de 2 iterações, apenas problemas CRITICAL)

### Quando Executar

Executar **DEPOIS** que todas as tasks estiverem concluídas, mas **ANTES** de rodar o checklist de DOD.

### Workflow de Auto-cura

```
┌──────────────────────────────────────────────────────────────┐
│                  CODERABBIT SELF-HEALING                     │
│                   (Light Mode - @dev)                        │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  iteration = 0                                               │
│  max_iterations = 2                                          │
│                                                              │
│  WHILE iteration < max_iterations:                           │
│    ┌────────────────────────────────────────────────────┐   │
│    │ 1. Run CodeRabbit CLI (runtime picks the shape      │   │
│    │    for process.platform — see Issue #731):          │   │
│    │    macOS/Linux: ~/.local/bin/coderabbit             │   │
│    │                 --prompt-only -t uncommitted        │   │
│    │    Windows:     wsl bash -c 'cd /mnt/<drive>/...    │   │
│    │                 ~/.local/bin/coderabbit             │   │
│    │                 --prompt-only -t uncommitted'       │   │
│    │                                                     │   │
│    │ 2. Parse output for severity levels                │   │
│    └────────────────────────────────────────────────────┘   │
│                         │                                    │
│                         ▼                                    │
│    ┌────────────────────────────────────────────────────┐   │
│    │ IF no CRITICAL issues:                             │   │
│    │   - Document HIGH issues in story Dev Notes        │   │
│    │   - Log: "✅ CodeRabbit passed"                    │   │
│    │   - BREAK → Proceed to DOD checklist               │   │
│    └────────────────────────────────────────────────────┘   │
│                         │                                    │
│                         ▼                                    │
│    ┌────────────────────────────────────────────────────┐   │
│    │ IF CRITICAL issues found:                          │   │
│    │   - Attempt auto-fix for each issue                │   │
│    │   - iteration++                                    │   │
│    │   - CONTINUE loop                                  │   │
│    └────────────────────────────────────────────────────┘   │
│                         │                                    │
│                         ▼                                    │
│  IF iteration == 2 AND CRITICAL issues remain:              │
│    - Log: "❌ CRITICAL issues remain"                       │
│    - HALT and report to user                                │
│    - DO NOT mark story complete                             │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Código de Implementação

```javascript
async function runCodeRabbitSelfHealing(storyPath) {
  const maxIterations = 2;
  let iteration = 0;

  console.log('🐰 Starting CodeRabbit Self-Healing Loop...');
  console.log(`   Mode: Light (CRITICAL only)`);
  console.log(`   Max Iterations: ${maxIterations}\n`);

  while (iteration < maxIterations) {
    console.log(`📋 Iteration ${iteration + 1}/${maxIterations}`);

    // Run CodeRabbit CLI
    const output = await runCodeRabbitCLI('uncommitted');
    const issues = parseCodeRabbitOutput(output);

    const criticalIssues = issues.filter(i => i.severity === 'CRITICAL');
    const highIssues = issues.filter(i => i.severity === 'HIGH');

    console.log(`   Found: ${criticalIssues.length} CRITICAL, ${highIssues.length} HIGH`);

    // No CRITICAL issues = success
    if (criticalIssues.length === 0) {
      if (highIssues.length > 0) {
        console.log(`\n📝 Documenting ${highIssues.length} HIGH issues in story Dev Notes...`);
        await documentIssuesInStory(storyPath, highIssues);
      }
      console.log('\n✅ CodeRabbit Self-Healing: PASSED');
      return { success: true, iterations: iteration + 1 };
    }

    // Attempt auto-fix for CRITICAL issues
    console.log(`\n🔧 Attempting auto-fix for ${criticalIssues.length} CRITICAL issues...`);
    for (const issue of criticalIssues) {
      await attemptAutoFix(issue);
    }

    iteration++;
  }

  // Max iterations reached with CRITICAL issues
  console.log('\n❌ CodeRabbit Self-Healing: FAILED');
  console.log(`   CRITICAL issues remain after ${maxIterations} iterations.`);
  console.log('   HALTING - Please fix manually before marking story complete.');

  return { success: false, iterations: maxIterations };
}
```

### Tratamento de Severidade

| Severidade | Comportamento | Notas |
|----------|----------|-------|
| **CRITICAL** | Auto-correção (máx. 2 tentativas) | Vulnerabilidades de segurança, bugs que quebram |
| **HIGH** | Documentar no Dev Notes da story | Recomendar correção antes do QA |
| **MEDIUM** | Ignorar | O @qa irá tratar |
| **LOW** | Ignorar | Detalhes mínimos, não bloqueantes |

### Timeout

- **Padrão**: 15 minutos por execução do CodeRabbit
- **Máximo total**: ~30 minutos (2 iterações)

### Tratamento de Erros

```javascript
// If CodeRabbit fails
try {
  await runCodeRabbitSelfHealing(storyPath);
} catch (error) {
  if (error.message.includes('command not found')) {
    console.warn(
      process.platform === 'win32'
        ? '⚠️  CodeRabbit not found in WSL — install inside the WSL distribution.'
        : '⚠️  CodeRabbit not found on PATH — install ~/.local/bin/coderabbit.',
    );
    console.warn('   Skipping self-healing. Manual review required.');
    return; // Continue without self-healing
  }
  if (error.message.includes('timeout')) {
    console.warn('⚠️  CodeRabbit review timed out');
    console.warn('   Skipping self-healing. Manual review required.');
    return;
  }
  throw error; // Re-throw unknown errors
}
```

### Integração com os Modos de Execução

| Modo | Comportamento da Auto-cura |
|------|----------------------|
| **YOLO** | Automático, sem prompts |
| **Interativo** | Mostra o progresso, sem prompts |
| **Pre-Flight** | Incluído no plano de execução |

---

## Implementação da Seleção de Modo

### Validação

```javascript
function validateMode(mode) {
  const validModes = ['yolo', 'interactive', 'preflight'];

  if (!mode) {
    return 'interactive'; // Default
  }

  if (validModes.includes(mode.toLowerCase())) {
    return mode.toLowerCase();
  }

  console.warn(`Invalid mode '${mode}'. Defaulting to 'interactive'.`);
  console.warn(`Valid modes: ${validModes.join(', ')}`);
  return 'interactive';
}
```

### Tratamento de Cancelamento pelo Usuário

```javascript
function handleCancellation() {
  console.log('Development cancelled by user.');
  console.log('Story progress saved. You can resume with *develop {story-id}.');
  process.exit(0);
}
```

### Tratamento de Arquivo de Story Ausente

```javascript
function validateStoryFile(storyId) {
  // Story files are in nested directories: docs/stories/{storyId}/story.yaml
  const storyPath = `docs/stories/${storyId}/story.yaml`;

  if (!fs.existsSync(storyPath)) {
    console.error(`Error: Story file not found at ${storyPath}`);
    console.error(`Please verify story ID and try again.`);
    process.exit(1);
  }

  return storyPath;
}
```

---

## Formato do Decision Log (Compatível com ADR)

**Arquivo**: `.ai/decision-log-{story-id}.md`

**Formato**: ADR (Architecture Decision Record) - gerado automaticamente por `completeDecisionLogging()`

**Seções**:
1. **Contexto** - Informações da story, tempo de execução, arquivos modificados, testes executados
2. **Decisões Tomadas** - Todas as decisões autônomas com classificação de tipo/prioridade
3. **Justificativa e Alternativas** - Por que cada escolha foi feita, o que mais foi considerado
4. **Mudanças de Implementação** - Arquivos criados/modificados/excluídos, resultados de testes
5. **Consequências e Rollback** - Hash do commit git, instruções de rollback, impacto de performance

**Exemplo de Saída**:
```markdown
# Decision Log: Story 6.1.2.6.2

**Generated:** 2025-11-16T14:30:00.000Z
**Agent:** dev
**Mode:** Yolo (Autonomous Development)
**Story:** docs/stories/story-6.1.2.6.2.md
**Rollback:** `git reset --hard abc123def456`

---

## Context

**Story Implementation:** 6.1.2.6.2
**Execution Time:** 15m 30s
**Status:** completed

**Files Modified:** 5 files
**Tests Run:** 8 tests
**Decisions Made:** 3 autonomous decisions

---

## Decisions Made

### Decision 1: Use Axios for HTTP client

**Timestamp:** 2025-11-16T14:32:15.000Z
**Type:** library-choice
**Priority:** medium

**Reason:** Better error handling, interceptor support, and TypeScript definitions

**Alternatives Considered:**
- Fetch API (native)
- Got library
- node-fetch

---

## Implementation Changes

### Files Modified

- `src/api/client.js` (created)
- `package.json` (modified)

### Test Results

- ✅ PASS: `api.test.js` (125ms)

---

## Consequences & Rollback

### Rollback Instructions

\`\`\`bash
# Full rollback
git reset --hard abc123def456

# Selective file rollback
git checkout abc123def456 -- <file-path>
\`\`\`

### Performance Impact

- Agent Load Time: 150ms
- Task Execution Time: 15m 30s
- Logging Overhead: Minimal (async, non-blocking)
```

**Para a especificação completa do formato, veja**: `docs/guides/decision-logging-guide.md`

---

## Exemplos

### Exemplo 1: Modo YOLO

```bash
*develop 3.14 yolo
```

**Saída**:
```
🚀 YOLO Mode - Autonomous Development
📋 Story 3.14: GitHub DevOps Agent
⚡ Executing autonomously with decision logging...

✅ Task 1 complete (Decision: Use Octokit library - rationale logged)
✅ Task 2 complete (Decision: REST API over GraphQL - rationale logged)
✅ Task 3 complete
✅ All tests pass

📝 Decision log: .ai/decision-log-3.14.md (3 decisions logged)
✅ Story ready for review
```

### Exemplo 2: Modo Interativo (Padrão)

```bash
*develop 3.15
```

**Saída**:
```
💬 Interactive Mode - Balanced Development
📋 Story 3.15: Squad Auto Configuration

📖 Task 1: Design configuration schema
❓ Decision Point - Schema Format
   Option 1: YAML (human-readable, widely used)
   Option 2: JSON (strict typing, better IDE support)
   Option 3: TOML (simple, clear)

   Your choice? [1/2/3]: _
```

### Exemplo 3: Planejamento Pre-Flight

```bash
*develop 3.16 preflight
```

**Saída**:
```
✈️ Pre-Flight Planning Mode
📋 Story 3.16: Data Architecture Capability

🔍 Analyzing story for ambiguities...
Found 5 technical decisions needed.

📝 Pre-Flight Questionnaire:
1. Database choice: PostgreSQL or MySQL?
2. ORM preference: Prisma, TypeORM, or raw SQL?
3. Migration strategy: Sequential or timestamp-based?
4. Backup approach: Daily snapshots or continuous?
5. Testing database: SQLite, Docker PostgreSQL, or mock?

[Please answer all questions before proceeding]
```

---

## Dependências

- `.aiox-core/product/checklists/story-dod-checklist.md` - Checklist da Definition of Done

## Ferramentas

- git - Operações locais (add, commit, status, diff, log)
- Sistema de arquivos - Ler/escrever arquivos de story
- Frameworks de teste - Executar testes de validação

## Notas

- **Compatibilidade Retroativa**: Comandos existentes como `*develop {story-id}` continuam funcionando (usam o modo interativo)
- **Aliases de Modo**: Pode ser estendido com os comandos `*develop-yolo`, `*develop-interactive`, `*develop-preflight`
- **Decision Logs**: Persistidos em `.ai/decision-log-{story-id}.md` para referência e revisão futuras
- **Valor Educativo**: As explicações do modo interativo ajudam os desenvolvedores a aprender os padrões do framework
- **Prevenção de Desvio de Escopo**: O modo pre-flight elimina a ambiguidade no meio do desenvolvimento

## Transições de Status (OBRIGATÓRIO — Todos os Modos)

**Referência:** `.claude/rules/story-lifecycle.md` — o @dev é responsável pelas transições Ready → InProgress e InProgress → InReview.

**Estes passos DEVEM ser executados nos pontos especificados, independentemente do modo de execução.**

**Formato do Change Log:** Use `{date: YYYY-MM-DD}` e `{version: MAJOR.MINOR.PATCH}`. A versão DEVE seguir as regras de incremento semântico: major para breaking changes, minor para features, patch para correções/atualizações de processo. INTERROMPA se qualquer um dos valores não puder ser resolvido de forma determinística.

### No Início do Desenvolvimento (antes da primeira task):

0. **Pré-verificação (bloqueante):**
   - Se o Status atual for `**InProgress**`, pular para a primeira task não concluída (cenário de retomada — nenhuma mudança de status necessária).
   - Se o Status atual não for `**Ready**` e não for `**InProgress**`, INTERROMPER e registrar: "Não é possível iniciar o desenvolvimento: esperado Ready ou InProgress, encontrado {current status}."
   - Se a seção Change Log estiver ausente, INTERROMPER e solicitar ao usuário que restaure a estrutura do template.
1. **Atualizar o campo Status da story:** alterar `**Ready**` para `**InProgress**` (pular se já estiver InProgress)
2. **Adicionar entrada no Change Log:**
   ```text
   | {date: YYYY-MM-DD} | {version: MAJOR.MINOR.PATCH} | Development started ({mode} mode) — Status: Ready → InProgress | @dev |
   ```
3. **Registrar:** "🚀 Story status updated: Ready → InProgress"

### Na Conclusão do Desenvolvimento (após o checklist de DOD, antes do INTERROMPER):

0. **Pré-verificação (bloqueante):**
   - Se o Status atual não for `**InProgress**`, INTERROMPER e registrar: "Não é possível marcar para revisão: esperado InProgress, encontrado {current status}."
   - Se a seção Change Log estiver ausente, INTERROMPER e solicitar ao usuário que restaure a estrutura do template.
1. **Atualizar o campo Status da story:** alterar `**InProgress**` para `**InReview**`
2. **Adicionar entrada no Change Log:**
   ```text
   | {date: YYYY-MM-DD} | {version: MAJOR.MINOR.PATCH} | Development complete — Status: InProgress → InReview | @dev |
   ```
3. **Registrar:** "✅ Story status updated: InProgress → InReview"

### Justificativa

As transições de status definidas em `story-lifecycle.md` são consultivas (regras contextuais). Estes passos as tornam imperativas (procedurais), garantindo que os agentes sempre executem as transições como parte do workflow em vez de depender da percepção das regras contextuais.

---

## Handoff
next_agent: @qa
next_command: *review {story-id}
condition: O status da story é InReview (atualizado em Transições de Status acima)
alternatives:
  - agent: @qa, command: *gate {story-id}, condition: Decisão rápida de gate necessária
  - agent: @dev, command: *apply-qa-fixes, condition: Problemas autoidentificados durante o dev
