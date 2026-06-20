# init-project-status

**Task ID:** init-project-status
**Versão:** 1.0
**Criado:** 2025-01-14 (Story 6.1.2.4)
**Agente:** @devops (Gage)

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
task: initProjectStatus()
responsável: River (Facilitator)
responsavel_type: Agente
atomic_layer: Atom

**Entrada:**
- campo: project_path
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Caminho de diretório válido

- campo: options
  tipo: object
  origem: User Input
  obrigatório: false
  validação: Opções de inicialização

**Saída:**
- campo: initialized_project
  tipo: string
  destino: File system
  persistido: true

- campo: config_created
  tipo: boolean
  destino: Return value
  persistido: false
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Diretório vazio ou flag de force definida; config válida
    tipo: pre-condition
    blocker: true
    validação: |
      Check directory is empty or force flag set; config valid
    error_message: "Pre-condition failed: Directory is empty or force flag set; config valid"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a conclusão da task

**Checklist:**

```yaml
post-conditions:
  - [ ] Projeto inicializado; arquivos de config criados; estrutura válida
    tipo: post-condition
    blocker: true
    validação: |
      Verify project initialized; config files created; structure valid
    error_message: "Post-condition failed: Project initialized; config files created; structure valid"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de pass/fail para conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Estrutura do projeto correta; todos os arquivos de config válidos
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Assert project structure correct; all config files valid
    error_message: "Acceptance criterion not met: Project structure correct; all config files valid"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** project-scaffolder
  - **Propósito:** Gerar a estrutura e a config do projeto
  - **Origem:** .aiox-core/scripts/project-scaffolder.js

- **Ferramenta:** config-manager
  - **Propósito:** Inicializar arquivos de configuração
  - **Origem:** .aiox-core/utils/config-manager.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Diretório Não Vazio
   - **Causa:** O diretório alvo já contém arquivos
   - **Resolução:** Usar a flag de force ou escolher um diretório vazio
   - **Recuperação:** Solicitar confirmação, mesclar ou abortar

2. **Erro:** Falha na Inicialização
   - **Causa:** Erro ao criar a estrutura do projeto
   - **Resolução:** Verificar permissões e espaço em disco
   - **Recuperação:** Limpar a inicialização parcial, registrar erro

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 0.5-2 min (estimado)
cost_estimated: $0.0001-0.0005
token_usage: ~500-1,000 tokens
```

**Notas de Otimização:**
- Minimizar dependências externas; cachear resultados se reutilizáveis; validar entradas cedo

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


## Descrição

Inicializa o rastreamento dinâmico de status do projeto para o contexto de ativação de agentes. Esta task configura a funcionalidade de status do projeto que exibe o estado do git, o trabalho recente e as informações da story/epic atual nas saudações dos agentes.

---

## Entradas

Nenhuma (roda no diretório atual do projeto)

---

## Elicitação

```yaml
elicit: false
```

Esta task roda de forma autônoma, sem interação do usuário.

---

## Passos

### Passo 1: Detectar Repositório Git

**Ação:** Verificar se o diretório atual é um repositório git

```bash
git rev-parse --is-inside-work-tree 2>/dev/null
```

**Condição de Saída:** Se não for um repo git, exibir mensagem e sair de forma graciosa:
```
⚠️  Project status feature requires a git repository.
    Initialize git first: git init
```

---

### Passo 2: Verificar a Configuração Atual

**Ação:** Ler `.aiox-core/core-config.yaml` e verificar `projectStatus.enabled`

**Lógica:**
```javascript
const config = yaml.load(fs.readFileSync('.aiox-core/core-config.yaml'));
const isEnabled = config?.projectStatus?.enabled === true;
```

**Se já estiver habilitado:**
```
✅ Project status is already enabled in core-config.yaml
```

Pular para o Passo 4.

---

### Passo 3: Habilitar o Status do Projeto na Config

**Ação:** Atualizar `core-config.yaml` para habilitar o status do projeto

**Mudanças:**
```yaml
projectStatus:
  enabled: true
  autoLoadOnAgentActivation: true
  showInGreeting: true
  cacheTimeSeconds: 60
  components:
    gitBranch: true
    gitStatus: true
    recentWork: true
    currentEpic: true
    currentStory: true
  statusFile: .aiox/project-status.yaml
  maxModifiedFiles: 5
  maxRecentCommits: 2
```

**Confirmation:**
```
✅ Enabled projectStatus in core-config.yaml
```

---

### Step 4: Create .aiox Directory

**Action:** Ensure `.aiox/` directory exists

```bash
mkdir -p .aiox
```

**Note:** Directory is created if missing, no error if exists.

---

### Step 5: Initialize Status Cache

**Action:** Load project status for the first time

```javascript
const { loadProjectStatus } = require('./.aiox-core/scripts/project-status-loader.js');
const status = await loadProjectStatus();
```

**Verification:** Check that `.aiox/project-status.yaml` was created with valid content.

**Sample Cache Content:**
```yaml
status:
  branch: main
  modifiedFiles:
    - story-6.1.2.4.md
  recentCommits:
    - "chore: cleanup Utils Registry"
  currentEpic: null
  currentStory: null
  lastUpdate: '2025-01-14T10:30:00.000Z'
  isGitRepo: true
timestamp: 1705238400000
ttl: 60
```

**Confirmation:**
```
✅ Initialized project status cache (.aiox/project-status.yaml)
```

---

### Step 6: Test Status Display

**Action:** Simulate agent activation to verify status displays correctly

**Method:** Load status and format for display

```javascript
const { loadProjectStatus, formatStatusDisplay } = require('./.aiox-core/scripts/project-status-loader.js');
const status = await loadProjectStatus();
const display = formatStatusDisplay(status);
console.log('\nExample Agent Greeting:\n');
console.log('💻 Dex (Builder) ready. Let's build something great!\n');
console.log('Current Project Status:');
console.log(display);
console.log('\nType *help to see available commands!');
```

---

### Step 7: Update .gitignore

**Action:** Ensure `.aiox/project-status.yaml` is gitignored

**Check:** Look for `.aiox/project-status.yaml` entry in `.gitignore`

**If missing:** Add entry to `.gitignore`

```gitignore
# AIOX Project Status Cache (auto-generated)
.aiox/project-status.yaml
```

**Confirmation:**
```
✅ Added .aiox/project-status.yaml to .gitignore
```

---

### Step 8: Display Success Summary

**Action:** Show complete setup summary

```
╔═══════════════════════════════════════════════════════════╗
║  ✅ Project Status Tracking Initialized                  ║
╚═══════════════════════════════════════════════════════════╝

Configuration:
  • projectStatus.enabled = true
  • Cache file: .aiox/project-status.yaml
  • Cache TTL: 60 seconds
  • Gitignored: Yes

Next Steps:
  1. Activate any agent to see project status in greeting
  2. Example: /dev or /po
  3. Status automatically refreshes every 60 seconds

Documentation: docs/guides/project-status-feature.md
```

---

## Outputs

### Files Created

- `.aiox/project-status.yaml` - Status cache file (gitignored)

### Files Modified

- `.aiox-core/core-config.yaml` - projectStatus section enabled (if was disabled)
- `.gitignore` - Added cache file entry (if missing)

### System State

- Project status feature: **ENABLED**
- All 11 agents will now display project context on activation

---

## Validation

- [ ] `.aiox/project-status.yaml` exists and contains valid YAML
- [ ] `core-config.yaml` has `projectStatus.enabled: true`
- [ ] `.gitignore` includes `.aiox/project-status.yaml`
- [ ] Test agent activation shows status display
- [ ] Git repository detected correctly
- [ ] Cache TTL is 60 seconds

---

## Error Handling

### Not a Git Repository

**Error:**
```
⚠️  Project status feature requires a git repository.
```

**Resolution:**
```bash
git init
```

### core-config.yaml Not Found

**Error:**
```
❌ Could not find .aiox-core/core-config.yaml
   Are you in the project root directory?
```

**Resolution:** Navigate to project root before running task.

### Permission Denied on .aiox Directory

**Error:**
```
❌ Cannot create .aiox directory: Permission denied
```

**Resolution:** Check file system permissions for project directory.

---

## Rollback

To disable project status tracking:

1. **Edit core-config.yaml:**
   ```yaml
   projectStatus:
     enabled: false
   ```

2. **Remove cache file:**
   ```bash
   rm .aiox/project-status.yaml
   ```

3. **Restart agent sessions** - new activations won't load status

---

## Performance Notes

- **First load:** ~80-100ms (git commands + file I/O)
- **Cached load:** ~5-10ms (YAML read only)
- **Cache invalidation:** Automatic after 60 seconds
- **Agent overhead:** Minimal (<100ms added to activation)

---

## Dependencies

### Scripts

- `.aiox-core/scripts/project-status-loader.js` - Core status loader

### NPM Packages

- `js-yaml` - YAML parsing (already in project dependencies)
- `execa` - Git command execution (already in project dependencies)

### Git Commands Used

- `git rev-parse --is-inside-work-tree` - Detect git repo
- `git branch --show-current` - Get current branch (git >= 2.22)
- `git rev-parse --abbrev-ref HEAD` - Fallback for older git
- `git status --porcelain` - Get modified files
- `git log -2 --oneline --no-decorate` - Get recent commits

---

## Related

- **Story:** 6.1.2.4 - Dynamic Project Status Context
- **Documentation:** `docs/guides/project-status-feature.md`
- **Config:** `.aiox-core/core-config.yaml` (projectStatus section)

---

**Status:** ✅ Production Ready
**Tested On:** Windows, Linux, macOS
**Git Requirement:** git >= 2.0 (2.22+ recommended)
