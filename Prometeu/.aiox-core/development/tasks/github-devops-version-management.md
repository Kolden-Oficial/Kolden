# version-management.md

**Task**: Gestão de Versão Semântica (Agnóstica de Repositório)

**Propósito**: Analisar mudanças, recomendar incrementos de versão (bumps) e gerenciar o versionamento semântico para QUALQUER repositório usando o AIOX.

**Quando Usar**: Antes de criar um release, para determinar o número de versão apropriado com base nas mudanças.

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
task: githubDevopsVersionManagement()
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
- Repositório Git com histórico de commits
- package.json com a versão atual
- Compreensão do versionamento semântico (MAJOR.MINOR.PATCH)

## Regras de Versionamento Semântico

- **MAJOR** (v4.0.0 → v5.0.0): Breaking changes, redesign de API
- **MINOR** (v4.31.0 → v4.32.0): Novas funcionalidades, compatíveis com versões anteriores
- **PATCH** (v4.31.0 → v4.31.1): Apenas correções de bug

## Palavras-chave para Detecção

**Breaking Changes** (MAJOR):
- `BREAKING CHANGE:`
- `BREAKING:`
- `!` no tipo do commit (ex.: `feat!:`)
- Redesign de API
- Funcionalidade removida
- Mudanças incompatíveis

**Novas Funcionalidades** (MINOR):
- `feat:`
- `feature:`
- Nova capacidade
- Melhoria (enhancement)

**Correções de Bug** (PATCH):
- `fix:`
- `bugfix:`
- `hotfix:`
- Patch

## Passos do Workflow

### Passo 1: Detectar o Contexto do Repositório

```javascript
const { detectRepositoryContext } = require('./../scripts/repository-detector');
const context = detectRepositoryContext();

if (!context) {
  throw new Error('Unable to detect repository context. Run "aiox init" first.');
}

console.log(`📦 Analyzing version for: ${context.packageName}`);
console.log(`Current version: ${context.packageVersion}`);
```

### Passo 2: Obter a Última Tag do Git

```bash
git describe --tags --abbrev=0
```

Se não existirem tags, use `v0.0.0` como linha de base.

### Passo 3: Analisar os Commits Desde a Última Tag

```bash
git log <last-tag>..HEAD --oneline
```

Faça o parse de cada mensagem de commit:
- Contar breaking changes
- Contar features
- Contar fixes

### Passo 4: Recomendar o Incremento de Versão

**Lógica**:
1. Se `breakingChanges > 0` → incremento MAJOR
2. Senão, se `features > 0` → incremento MINOR
3. Senão, se `fixes > 0` → incremento PATCH
4. Senão → Nenhum incremento de versão necessário

### Passo 5: Confirmação do Usuário

Apresente a recomendação:

```
📊 Version Analysis
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Current version:  v4.31.0
Recommended:      v4.32.0 (MINOR)

Changes since v4.31.0:
  Breaking changes: 0
  New features:     3
  Bug fixes:        2

Reason: New features detected (backward compatible)

Proceed with version v4.32.0? (Y/n)
```

### Passo 6: Atualizar o package.json

```javascript
const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(context.projectRoot, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

packageJson.version = newVersion;

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
console.log(`✓ Updated package.json to ${newVersion}`);
```

### Passo 7: Criar a Tag do Git

```bash
git tag -a v<newVersion> -m "Release v<newVersion>"
```

### Passo 8: Gerar o Changelog

Extraia os commits desde a última tag e formate:

```markdown
## [4.32.0] - 2025-10-25

### Added
- New feature A
- New feature B
- New feature C

### Fixed
- Bug fix 1
- Bug fix 2
```

## Exemplo de Implementação

```javascript
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const semver = require('semver');

async function manageVersion() {
  // Step 1: Detect context
  const { detectRepositoryContext } = require('./../scripts/repository-detector');
  const context = detectRepositoryContext();

  if (!context) {
    console.error('❌ Unable to detect repository context');
    process.exit(1);
  }

  console.log(`\n📦 Version Management for ${context.packageName}`);
  console.log(`Current version: ${context.packageVersion}\n`);

  // Step 2: Get last tag
  let lastTag;
  try {
    lastTag = execSync('git describe --tags --abbrev=0', {
      cwd: context.projectRoot
    }).toString().trim();
  } catch (error) {
    lastTag = 'v0.0.0';
    console.log('⚠️  No tags found, using v0.0.0 as baseline');
  }

  console.log(`Last tag: ${lastTag}\n`);

  // Step 3: Analyze commits
  const commits = execSync(`git log ${lastTag}..HEAD --oneline`, {
    cwd: context.projectRoot
  }).toString().trim().split('\n').filter(Boolean);

  let breakingChanges = 0;
  let features = 0;
  let fixes = 0;

  const breakingPattern = /BREAKING CHANGE:|BREAKING:|^\w+!:/;
  const featurePattern = /^feat:|^feature:/;
  const fixPattern = /^fix:|^bugfix:|^hotfix:/;

  commits.forEach(commit => {
    if (breakingPattern.test(commit)) breakingChanges++;
    else if (featurePattern.test(commit)) features++;
    else if (fixPattern.test(commit)) fixes++;
  });

  // Step 4: Recommend version
  const currentVersion = context.packageVersion.replace(/^v/, '');
  let newVersion;
  let bumpType;

  if (breakingChanges > 0) {
    newVersion = semver.inc(currentVersion, 'major');
    bumpType = 'MAJOR';
  } else if (features > 0) {
    newVersion = semver.inc(currentVersion, 'minor');
    bumpType = 'MINOR';
  } else if (fixes > 0) {
    newVersion = semver.inc(currentVersion, 'patch');
    bumpType = 'PATCH';
  } else {
    console.log('ℹ️  No version bump needed (no changes detected)');
    process.exit(0);
  }

  // Step 5: User confirmation
  console.log('📊 Version Analysis');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Current version:  v${currentVersion}`);
  console.log(`Recommended:      v${newVersion} (${bumpType})`);
  console.log('');
  console.log(`Changes since ${lastTag}:`);
  console.log(`  Breaking changes: ${breakingChanges}`);
  console.log(`  New features:     ${features}`);
  console.log(`  Bug fixes:        ${fixes}`);
  console.log('');

  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: `Proceed with version v${newVersion}?`,
      default: true
    }
  ]);

  if (!confirm) {
    console.log('❌ Version update cancelled');
    process.exit(0);
  }

  // Step 6: Update package.json
  const packageJsonPath = path.join(context.projectRoot, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  packageJson.version = newVersion;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
  console.log(`\n✓ Updated package.json to v${newVersion}`);

  // Step 7: Create git tag
  execSync(`git tag -a v${newVersion} -m "Release v${newVersion}"`, {
    cwd: context.projectRoot
  });
  console.log(`✓ Created git tag v${newVersion}`);

  console.log('\n✅ Version management complete!');
  console.log(`\nNext steps:`);
  console.log(`  - Review changes: git show v${newVersion}`);
  console.log(`  - Push tag: git push origin v${newVersion}`);
  console.log(`  - Create release with @github-devops *release`);
}

module.exports = { manageVersion };
```

## Uso

Chamada pelo agente `@github-devops` via comando `*version-check`.

## Validação

- O incremento de versão segue as regras de versionamento semântico
- O usuário confirma a mudança de versão
- A tag do git é criada com sucesso
- O package.json é atualizado corretamente

## Notas

- Funciona com QUALQUER repositório (framework ou projeto)
- Respeita o formato conventional commits
- O usuário sempre tem a aprovação final
- NÃO faz push para o remoto (isso é feito pelo comando *push)
