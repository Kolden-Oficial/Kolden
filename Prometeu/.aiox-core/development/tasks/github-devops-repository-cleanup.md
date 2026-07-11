---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# repository-cleanup.md

**Task**: Limpeza de Repositório (Agnóstica de Repositório)

**Propósito**: Identificar e remover branches obsoletas e arquivos temporários de QUALQUER repositório.

**Quando Usar**: Manutenção periódica via comando `@github-devops *cleanup`.

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com logging
- Interação mínima com o usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints explícitos de decisão
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pré-Voo (Pre-Flight) - Planejamento Abrangente Antecipado
- Fase de análise da tarefa (identificar todas as ambiguidades)
- Execução com zero ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: githubDevopsRepositoryCleanup()
responsável: Gage (Automator)
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

**Propósito:** Validar pré-requisitos ANTES da execução da tarefa (bloqueante)

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

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a conclusão da tarefa

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

**Propósito:** Critérios definitivos de aprovação/reprovação para a conclusão da tarefa

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

**Recursos externos/compartilhados usados por esta tarefa:**

- **Tool:** task-runner
  - **Propósito:** Execução e orquestração de tarefas
  - **Origem:** .aiox-core/core/task-runner.js

- **Tool:** logger
  - **Propósito:** Logging de execução e rastreamento de erros
  - **Origem:** .aiox-core/utils/logger.js

---

## Scripts

**Código específico do agente para esta tarefa:**

- **Script:** execute-task.js
  - **Propósito:** Wrapper genérico de execução de tarefas
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/scripts/execute-task.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Task Not Found (Tarefa Não Encontrada)
   - **Causa:** A tarefa especificada não está registrada no sistema
   - **Resolução:** Verificar o nome e o registro da tarefa
   - **Recuperação:** Listar as tarefas disponíveis, sugerir similares

2. **Erro:** Invalid Parameters (Parâmetros Inválidos)
   - **Causa:** Os parâmetros da tarefa não correspondem ao schema esperado
   - **Resolução:** Validar os parâmetros contra a definição da tarefa
   - **Recuperação:** Fornecer um template de parâmetros, rejeitar a execução

3. **Erro:** Execution Timeout (Tempo de Execução Esgotado)
   - **Causa:** A tarefa excede o tempo máximo de execução
   - **Resolução:** Otimizar a tarefa ou aumentar o timeout
   - **Recuperação:** Encerrar a tarefa, limpar recursos, registrar o estado

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 5-15 min (estimated)
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
  - automation
  - workflow
updated_at: 2025-11-17
```

---


## Pré-requisitos
- Repositório Git
- GitHub CLI para operações de branch remota
- Contexto do repositório detectado

## Operações de Limpeza

### 1. Identificar Branches Obsoletas

**Definição**: Branches mescladas com mais de 30 dias

```javascript
const { execSync } = require('child_process');

function findStaleBranches(projectRoot) {
  // Get all merged branches
  const mergedBranches = execSync('git branch --merged', {
    cwd: projectRoot
  }).toString()
    .split('\n')
    .map(b => b.trim())
    .filter(b => b && b !== '* main' && b !== '* master' && b !== 'main' && b !== 'master');

  const staleBranches = [];
  const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);

  for (const branch of mergedBranches) {
    try {
      const lastCommitDate = execSync(`git log -1 --format=%ct ${branch}`, {
        cwd: projectRoot
      }).toString().trim();

      const commitTimestamp = parseInt(lastCommitDate) * 1000;

      if (commitTimestamp < thirtyDaysAgo) {
        staleBranches.push({
          name: branch,
          lastCommit: new Date(commitTimestamp).toISOString(),
          daysOld: Math.floor((Date.now() - commitTimestamp) / (24 * 60 * 60 * 1000))
        });
      }
    } catch (error) {
      console.warn(`⚠️  Unable to check ${branch}:`, error.message);
    }
  }

  return staleBranches;
}
```

### 2. Identificar Arquivos Temporários

```javascript
const glob = require('glob');

function findTemporaryFiles(projectRoot) {
  const patterns = [
    '**/.DS_Store',
    '**/Thumbs.db',
    '**/*.tmp',
    '**/*.log',
    '**/.eslintcache'
  ];

  const tempFiles = [];

  for (const pattern of patterns) {
    const files = glob.sync(pattern, {
      cwd: projectRoot,
      ignore: ['node_modules/**', '.git/**']
    });

    tempFiles.push(...files);
  }

  return tempFiles;
}
```

### 3. Apresentar Sugestões de Limpeza

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧹 Repository Cleanup Suggestions
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Repository: {repositoryUrl}

Stale Branches (merged, >30 days old):
  - feature/story-3.1-dashboard (45 days old)
  - bugfix/memory-leak (60 days old)
  - feature/old-feature (120 days old)

Total: 3 stale branches

Temporary Files:
  - .DS_Store (5 files)
  - .eslintcache
  - debug.log

Total: 7 temporary files

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Proceed with cleanup? (Y/n)
```

### 4. Executar a Limpeza

```javascript
async function executeCleanup(staleBranches, tempFiles, projectRoot) {
  // Delete stale branches
  for (const branch of staleBranches) {
    try {
      execSync(`git branch -d ${branch.name}`, { cwd: projectRoot });
      console.log(`✓ Deleted local branch: ${branch.name}`);

      // Try to delete remote branch
      try {
        execSync(`git push origin --delete ${branch.name}`, { cwd: projectRoot });
        console.log(`✓ Deleted remote branch: ${branch.name}`);
      } catch (error) {
        console.warn(`⚠️  Unable to delete remote branch ${branch.name}`);
      }
    } catch (error) {
      console.error(`❌ Failed to delete ${branch.name}:`, error.message);
    }
  }

  // Delete temporary files
  for (const file of tempFiles) {
    try {
      fs.unlinkSync(path.join(projectRoot, file));
      console.log(`✓ Deleted: ${file}`);
    } catch (error) {
      console.warn(`⚠️  Unable to delete ${file}`);
    }
  }
}
```

## Verificações de Segurança

- Nunca deletar a branch main/master
- Nunca deletar a branch atual
- Nunca deletar branches não mescladas (sem a flag --force)
- Sempre exigir confirmação do usuário

## Integração

Chamada por `@github-devops` via comando `*cleanup`.

## Validação

- Identifica corretamente as branches mescladas
- Respeita o limiar de 30 dias
- Exige aprovação do usuário
- Lida com erros graciosamente

## Notas

- Funciona com QUALQUER repositório
- Padrões seguros (sem force delete)
- Modo dry-run disponível
