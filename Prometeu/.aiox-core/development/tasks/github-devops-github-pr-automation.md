---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# github-pr-automation.md

**Task**: Automação de Pull Request do GitHub (Agnóstica de Repositório)

**Propósito**: Automatizar a criação de PR a partir do contexto da story usando o GitHub CLI, funciona com QUALQUER repositório.

**Quando Usar**: Após enviar (push) a branch de feature, via comando `@github-devops *create-pr`.

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
task: githubDevopsGithubPrAutomation()
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

- **Ferramenta:** task-runner
  - **Propósito:** Execução e orquestração de tarefas
  - **Origem:** .aiox-core/core/task-runner.js

- **Ferramenta:** logger
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

1. **Erro:** Task Não Encontrada
   - **Causa:** A tarefa especificada não está registrada no sistema
   - **Resolução:** Verificar o nome e o registro da tarefa
   - **Recuperação:** Listar as tarefas disponíveis, sugerir similares

2. **Erro:** Parâmetros Inválidos
   - **Causa:** Os parâmetros da tarefa não correspondem ao schema esperado
   - **Resolução:** Validar os parâmetros contra a definição da tarefa
   - **Recuperação:** Fornecer um template de parâmetros, rejeitar a execução

3. **Erro:** Tempo de Execução Esgotado
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
- GitHub CLI (`gh`) instalado e autenticado
- Branch de feature enviada (push) para o remoto
- Contexto do repositório detectado
- Arquivo de story (opcional, mas recomendado)

## Passos do Workflow

### Passo 1: Detectar o Contexto do Repositório

```javascript
const { detectRepositoryContext } = require('./../scripts/repository-detector');

const context = detectRepositoryContext();
if (!context) {
  throw new Error('Unable to detect repository. Run "aiox init" first.');
}
```

### Passo 2: Obter a Branch Atual

```bash
git branch --show-current
```

### Passo 3: Extrair Informações da Story (se disponível)

```javascript
function extractStoryInfo(storyPath) {
  if (!storyPath || !fs.existsSync(storyPath)) {
    return null;
  }

  const content = fs.readFileSync(storyPath, 'utf8');

  // Extract story ID from path or content
  const storyIdMatch = storyPath.match(/(\d+\.\d+)/);
  const storyId = storyIdMatch ? storyIdMatch[1] : null;

  // Extract title
  const titleMatch = content.match(/title:\s*["']?([^"'\n]+)["']?/);
  const title = titleMatch ? titleMatch[1] : null;

  // Extract acceptance criteria
  const acMatch = content.match(/acceptance_criteria:([\s\S]*?)(?=\n\w+:|$)/);

  return {
    id: storyId,
    title,
    hasAcceptanceCriteria: !!acMatch
  };
}
```

### Passo 4: Gerar o Título do PR (Formato Configurável)

> **Orientado por Configuração:** O formato do título do PR é controlado por `core-config.yaml` → `github.pr.title_format`
> Isso permite que cada projeto escolha o formato que corresponde ao seu workflow.

```javascript
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

/**
 * Load PR configuration from core-config.yaml
 * @returns {Object} PR configuration with defaults
 */
function loadPRConfig() {
  const configPath = path.join(process.cwd(), '.aiox-core', 'core-config.yaml');

  // Default configuration (for projects without core-config)
  const defaults = {
    title_format: 'story-first',  // Safe default for most projects
    include_story_id: true,
    conventional_commits: {
      enabled: false,
      branch_type_map: {
        'feature/': 'feat',
        'feat/': 'feat',
        'fix/': 'fix',
        'bugfix/': 'fix',
        'hotfix/': 'fix',
        'docs/': 'docs',
        'chore/': 'chore',
        'refactor/': 'refactor',
        'test/': 'test',
        'perf/': 'perf',
        'ci/': 'ci',
        'style/': 'style',
        'build/': 'build'
      },
      default_type: 'feat'
    }
  };

  try {
    if (fs.existsSync(configPath)) {
      const config = yaml.load(fs.readFileSync(configPath, 'utf8'));
      return { ...defaults, ...config?.github?.pr };
    }
  } catch (error) {
    console.warn('Could not load core-config.yaml, using defaults');
  }

  return defaults;
}

/**
 * Generate PR title based on project configuration.
 *
 * Supported formats (configured in core-config.yaml → github.pr.title_format):
 *
 * 1. "conventional" - Conventional Commits format (for semantic-release)
 *    Example: "feat(auth): implement OAuth login [Story 6.17]"
 *
 * 2. "story-first" - Story ID first (legacy/simple projects)
 *    Example: "[Story 6.17] Implement OAuth Login"
 *
 * 3. "branch-based" - Branch name converted to title
 *    Example: "Feature User Auth"
 *
 * @param {string} branchName - Current git branch name
 * @param {Object} storyInfo - Story information (id, title)
 * @returns {string} Formatted PR title
 */
function generatePRTitle(branchName, storyInfo) {
  const config = loadPRConfig();
  const format = config.title_format || 'story-first';

  switch (format) {
    case 'conventional':
      return generateConventionalTitle(branchName, storyInfo, config);
    case 'story-first':
      return generateStoryFirstTitle(branchName, storyInfo, config);
    case 'branch-based':
      return generateBranchBasedTitle(branchName, storyInfo, config);
    default:
      return generateStoryFirstTitle(branchName, storyInfo, config);
  }
}

/**
 * Format: {type}({scope}): {description} [Story {id}]
 * Used for: Projects with semantic-release automation
 */
function generateConventionalTitle(branchName, storyInfo, config) {
  const typeMap = config.conventional_commits?.branch_type_map || {};
  const defaultType = config.conventional_commits?.default_type || 'feat';

  // Detect commit type from branch prefix
  let type = defaultType;
  for (const [prefix, commitType] of Object.entries(typeMap)) {
    if (branchName.startsWith(prefix)) {
      type = commitType;
      break;
    }
  }

  // Extract scope from branch name (e.g., feat/auth/login -> scope=auth)
  const scopeMatch = branchName.match(/^[a-z-]+\/([a-z-]+)\//);
  const scope = scopeMatch ? scopeMatch[1] : null;
  const scopeStr = scope ? `(${scope})` : '';

  // Generate description
  if (storyInfo && storyInfo.id && storyInfo.title) {
    let cleanTitle = storyInfo.title
      .replace(/^Story\s*\d+\.\d+[:\s-]*/i, '')
      .trim();
    cleanTitle = cleanTitle.charAt(0).toLowerCase() + cleanTitle.slice(1);

    const storyRef = config.include_story_id ? ` [Story ${storyInfo.id}]` : '';
    return `${type}${scopeStr}: ${cleanTitle}${storyRef}`;
  }

  // Fallback: convert branch name to description
  const description = branchName
    .replace(/^(feature|feat|fix|bugfix|hotfix|docs|chore|refactor|test|perf|ci|style|build)\//, '')
    .replace(/^[a-z-]+\//, '')
    .replace(/-/g, ' ')
    .toLowerCase()
    .trim();

  return `${type}${scopeStr}: ${description}`;
}

/**
 * Format: [Story {id}] {Title}
 * Used for: Simple projects, legacy workflows, non-NPM projects
 */
function generateStoryFirstTitle(branchName, storyInfo, config) {
  if (storyInfo && storyInfo.id && storyInfo.title) {
    return `[Story ${storyInfo.id}] ${storyInfo.title}`;
  }

  // Fallback: convert branch name to title
  return branchName
    .replace(/^(feature|feat|fix|bugfix|hotfix|docs|chore|refactor|test|perf|ci|style|build)\//, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

/**
 * Format: {Branch Name As Title}
 * Used for: Minimal projects, quick iterations
 */
function generateBranchBasedTitle(branchName, storyInfo, config) {
  const title = branchName
    .replace(/^(feature|feat|fix|bugfix|hotfix|docs|chore|refactor|test|perf|ci|style|build)\//, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());

  if (config.include_story_id && storyInfo?.id) {
    return `${title} [Story ${storyInfo.id}]`;
  }

  return title;
}
```

## Referência de Configuração

Adicione ao `core-config.yaml` do seu projeto:

```yaml
github:
  pr:
    # Options: conventional | story-first | branch-based
    title_format: conventional  # For semantic-release projects
    # title_format: story-first  # For simple projects (default)

    include_story_id: true

    conventional_commits:
      enabled: true
      branch_type_map:
        feature/: feat
        fix/: fix
        docs/: docs
        # Add custom mappings as needed
      default_type: feat

  semantic_release:
    enabled: true  # Set false if not using semantic-release
```

## Exemplos de Formato de Título

| Formato | Branch | Story | Título Gerado |
|--------|--------|-------|-----------------|
| `conventional` | `feature/user-auth` | 6.17: User Auth | `feat: user auth [Story 6.17]` |
| `conventional` | `fix/cli/parsing` | 6.18: CLI Fix | `fix(cli): cLI fix [Story 6.18]` |
| `story-first` | `feature/user-auth` | 6.17: User Auth | `[Story 6.17] User Auth` |
| `story-first` | `fix/cli-bug` | - | `Cli Bug` |
| `branch-based` | `feature/user-auth` | 6.17 | `User Auth [Story 6.17]` |
| `branch-based` | `docs/readme` | - | `Readme` |

### Passo 5: Gerar a Descrição do PR

```javascript
function generatePRDescription(storyInfo, context) {
  let description = `## Summary\n\n`;

  if (storyInfo) {
    description += `This PR implements Story ${storyInfo.id}: ${storyInfo.title}\n\n`;
    description += `**Story File**: \`docs/stories/${storyInfo.id}-*.yaml\`\n\n`;
  } else {
    description += `Changes from branch: ${branchName}\n\n`;
  }

  description += `## Changes\n\n`;
  description += `- [List main changes here]\n\n`;

  description += `## Testing\n\n`;
  description += `- [ ] Unit tests passing\n`;
  description += `- [ ] Integration tests passing\n`;
  description += `- [ ] Manual testing completed\n\n`;

  description += `## Checklist\n\n`;
  description += `- [ ] Code follows project standards\n`;
  description += `- [ ] Tests added/updated\n`;
  description += `- [ ] Documentation updated\n`;
  description += `- [ ] Quality gates passed\n\n`;

  description += `---\n`;
  description += `**Repository**: ${context.repositoryUrl}\n`;
  description += `**Mode**: ${context.mode}\n`;
  description += `**Package**: ${context.packageName} v${context.packageVersion}\n`;

  return description;
}
```

### Passo 5.1: Enriquecer a Descrição do PR com Análise de Impacto (Code Intelligence — Consultivo)

> **Adicionado por:** Story NOG-7 (DevOps Pre-Push Impact Analysis)
> **Comportamento:** Auto-pula se a code intelligence estiver indisponível. Anexa a seção "Impact Analysis" ao corpo do PR.

```javascript
const { generateImpactSummary } = require('.aiox-core/core/code-intel/helpers/devops-helper');

async function enrichPRWithImpactAnalysis(description, changedFiles) {
  // Auto-skip if code intelligence unavailable
  const { isCodeIntelAvailable } = require('.aiox-core/core/code-intel');
  if (!isCodeIntelAvailable()) {
    return description; // Return original description unchanged
  }

  const impact = await generateImpactSummary(changedFiles);

  if (!impact) {
    return description; // No impact data — return original
  }

  // Append Impact Analysis section to PR description
  const impactSection = [
    '',
    '## Impact Analysis',
    '',
    impact.summary,
    '',
    '---',
    '*Generated by Code Intelligence (advisory only)*',
  ].join('\n');

  return description + impactSection;
}
```

**Uso no fluxo de criação de PR:**

Depois que `generatePRDescription()` retornar a descrição base, chame `enrichPRWithImpactAnalysis()` para opcionalmente anexar a seção de impacto:

```javascript
let description = generatePRDescription(storyInfo, context);
description = await enrichPRWithImpactAnalysis(description, changedFiles);
```

**Importante:** Se a code intelligence estiver indisponível ou retornar null, a descrição do PR permanece inalterada — zero impacto no workflow existente.

---

### Passo 6: Determinar a Branch Base

```javascript
function determineBaseBranch(projectRoot) {
  // Check default branch from git
  try {
    const defaultBranch = execSync('git symbolic-ref refs/remotes/origin/HEAD', {
      cwd: projectRoot
    }).toString().trim().replace('refs/remotes/origin/', '');

    return defaultBranch || 'main';
  } catch (error) {
    // Fallback to main
    return 'main';
  }
}
```

### Passo 7: Criar o PR via GitHub CLI

```bash
gh pr create \
  --title "{title}" \
  --body "{description}" \
  --base {baseBranch} \
  --head {currentBranch}
```

### Passo 8: Atribuir Revisores (Opcional)

```javascript
function assignReviewers(storyType, prNumber) {
  const reviewerMap = {
    'feature': ['@dev-team'],
    'bugfix': ['@qa-team'],
    'docs': ['@tech-writer'],
    'security': ['@security-team']
  };

  const reviewers = reviewerMap[storyType] || ['@dev-team'];

  execSync(`gh pr edit ${prNumber} --add-reviewer ${reviewers.join(',')}`, {
    cwd: projectRoot
  });
}
```

## Exemplo de Uso

```javascript
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function createPullRequest(storyPath) {
  // Detect repository
  const { detectRepositoryContext } = require('./../scripts/repository-detector');
  const context = detectRepositoryContext();

  console.log(`\n🔀 Creating Pull Request`);
  console.log(`Repository: ${context.repositoryUrl}\n`);

  // Get current branch
  const currentBranch = execSync('git branch --show-current', {
    cwd: context.projectRoot
  }).toString().trim();

  console.log(`Branch: ${currentBranch}`);

  // Extract story info
  const storyInfo = storyPath ? extractStoryInfo(storyPath) : null;

  // Generate PR title and description
  const title = generatePRTitle(currentBranch, storyInfo);
  const description = generatePRDescription(storyInfo, context);
  const baseBranch = determineBaseBranch(context.projectRoot);

  console.log(`Title: ${title}`);
  console.log(`Base: ${baseBranch}\n`);

  // Create PR
  const prUrl = execSync(
    `gh pr create --title "${title}" --body "${description}" --base ${baseBranch}`,
    { cwd: context.projectRoot }
  ).toString().trim();

  console.log(`\n✅ Pull Request created: ${prUrl}`);

  return { prUrl, title, baseBranch };
}

module.exports = { createPullRequest };
```

## Integração

Chamada por `@github-devops` via comando `*create-pr`.

## Validação

- PR criado no repositório correto (URL detectada)
- O título do PR segue o formato Conventional Commits (obrigatório para semantic-release)
- O título do PR inclui o ID da story se disponível (ex.: `[Story 6.17]`)
- A descrição do PR inclui o contexto do repositório
- A branch base está correta (geralmente main/master)

## Integração com Semantic-Release (Opcional)

> **Nota:** Esta seção só se aplica quando o `core-config.yaml` tem:
> - `github.pr.title_format: conventional`
> - `github.semantic_release.enabled: true`
>
> Projetos sem semantic-release devem usar `title_format: story-first` (padrão).

**Quando habilitado:** PRs mesclados via "Squash and merge" usam o título do PR como mensagem de commit, disparando o semantic-release:

| Padrão de Branch | Título Gerado | Release |
|---------------|-----------------|---------|
| `feature/user-auth` | `feat: user auth` | ✅ Minor |
| `feat/auth/sso-login` | `feat(auth): sso login` | ✅ Minor |
| `fix/cli-parsing` | `fix: cli parsing` | ✅ Patch |
| `docs/readme-update` | `docs: readme update` | ❌ Nenhum |
| `chore/deps-update` | `chore: deps update` | ❌ Nenhum |

Para breaking changes, edite manualmente o título do PR para incluir `!`:
- `feat!: redesign authentication API [Story 7.1]`

## Configuração para Diferentes Tipos de Projeto

### Pacote NPM com Semantic-Release (aiox-core)
```yaml
github:
  pr:
    title_format: conventional
  semantic_release:
    enabled: true
```

### App Web Simples (sem releases)
```yaml
github:
  pr:
    title_format: story-first  # [Story 6.17] Title
  semantic_release:
    enabled: false
```

### Protótipos Rápidos
```yaml
github:
  pr:
    title_format: branch-based  # Just branch name as title
    include_story_id: false
```

## Notas

- Funciona com QUALQUER repositório
- Lida graciosamente com a ausência do arquivo de story
- Usa o GitHub CLI para confiabilidade
- Contexto do repositório a partir do detector

## Handoff
next_agent: @po
next_command: *close-story {story-id}
condition: PR merged successfully
alternatives:
  - agent: @dev, command: *apply-qa-fixes, condition: PR review requested changes
