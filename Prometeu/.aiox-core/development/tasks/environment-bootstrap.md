---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# environment-bootstrap

**Task ID:** environment-bootstrap
**Version:** 1.1.0
**Created:** 2025-12-02
**Updated:** 2025-12-02
**Agent:** @devops (Gage)

---

## Propósito

Bootstrap completo de ambiente para novos projetos AIOX. Verifica e instala todos os CLIs necessários, autentica serviços, inicializa o repositório Git/GitHub e valida o ambiente de desenvolvimento antes de iniciar o workflow greenfield.

**Esta tarefa deve ser o PRIMEIRO passo em qualquer novo projeto**, executada ANTES da criação do PRD.

---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)

- Tomada de decisão autônoma com registro em log
- Pula ferramentas opcionais, instala apenas as essenciais
- **Melhor para:** Desenvolvedores experientes, setup rápido

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**

- Checkpoints de decisão explícitos
- Explicações educativas para cada ferramenta
- **Melhor para:** Aprendizado, setup pela primeira vez, onboarding de equipe

### 3. Planejamento Pre-Flight - Planejamento Abrangente Antecipado

- Fase de análise completa antes de qualquer instalação
- Execução sem nenhuma ambiguidade
- **Melhor para:** Ambientes corporativos, políticas rígidas

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Tarefa (AIOX Task Format V1.0)

```yaml
task: environmentBootstrap()
responsável: Gage (Operator)
responsavel_type: Agente
atomic_layer: Organism

**Entrada:**
- campo: project_name
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Nome de projeto válido (minúsculas, hifens permitidos)

- campo: project_path
  tipo: string
  origem: User Input
  obrigatório: false
  validação: Caminho de diretório válido (padrão: diretório atual)

- campo: github_org
  tipo: string
  origem: User Input
  obrigatório: false
  validação: Organização ou nome de usuário GitHub válido

- campo: options
  tipo: object
  origem: User Input
  obrigatório: false
  validação: Opções de bootstrap (skip_optional, force_reinstall, etc.)

**Saída:**
- campo: environment_report
  tipo: object
  destino: File system (.aiox/environment-report.yaml)
  persistido: true

- campo: git_initialized
  tipo: boolean
  destino: Return value
  persistido: false

- campo: github_repo_url
  tipo: string
  destino: Return value
  persistido: false
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da tarefa (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] O sistema operacional é Windows, macOS ou Linux
    tipo: pre-condition
    blocker: true
    validação: |
      Detectar o SO via process.platform ou uname
    error_message: "Sistema operacional não suportado"

  - [ ] O usuário tem privilégios de admin/sudo para instalações
    tipo: pre-condition
    blocker: false
    validação: |
      Verificar se o usuário pode executar comandos elevados
    error_message: "Algumas instalações podem exigir privilégios elevados"

  - [ ] Conexão com a internet disponível
    tipo: pre-condition
    blocker: true
    validação: |
      Pingar github.com ou verificar a conectividade
    error_message: "Conexão com a internet necessária para instalação de ferramentas e autenticação"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a conclusão da tarefa

**Checklist:**

```yaml
post-conditions:
  - [ ] Todos os CLIs essenciais instalados e acessíveis no PATH
    tipo: post-condition
    blocker: true
    validação: |
      Verificar se os comandos git, gh, node são executáveis
    error_message: "Falha na instalação dos CLIs essenciais"

  - [ ] Repositório Git inicializado com .gitignore
    tipo: post-condition
    blocker: true
    validação: |
      Verificar se o diretório .git existe e o .gitignore está configurado
    error_message: "Falha na inicialização do Git"

  - [ ] Relatório de ambiente gerado
    tipo: post-condition
    blocker: false
    validação: |
      Verificar se .aiox/environment-report.yaml existe
    error_message: "Relatório de ambiente não gerado"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de aprovação/reprovação para a conclusão da tarefa

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Os CLIs essenciais (git, gh, node) estão instalados e funcionando
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Garantir que todos os comandos de CLI essenciais retornem saída de versão válida
    error_message: "Falha na verificação dos CLIs essenciais"

  - [ ] O GitHub CLI está autenticado
    tipo: acceptance-criterion
    blocker: true
    validação: |
      gh auth status retorna autenticado
    error_message: "GitHub CLI não autenticado"

  - [ ] Repositório Git criado localmente e no GitHub
    tipo: acceptance-criterion
    blocker: true
    validação: |
      .git existe e gh repo view tem sucesso
    error_message: "Repositório não inicializado corretamente"

  - [ ] A estrutura do projeto segue as convenções AIOX
    tipo: acceptance-criterion
    blocker: false
    validação: |
      Verificar se docs/, .aiox/ e package.json existem
    error_message: "Estrutura do projeto incompleta"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta tarefa:**

- **Ferramenta:** os-detector
  - **Propósito:** Detectar o sistema operacional e o gerenciador de pacotes
  - **Fonte:** Built-in (process.platform, uname)

- **Ferramenta:** cli-checker
  - **Propósito:** Verificar instalações e versões de CLIs
  - **Fonte:** .aiox-core/infrastructure/scripts/cli-checker.js

- **Ferramenta:** github-cli
  - **Propósito:** Criação de repositório e autenticação
  - **Fonte:** .aiox-core/infrastructure/tools/cli/github-cli.yaml

---

## Tratamento de Erros

**Estratégia:** retry-with-alternatives

**Erros Comuns:**

1. **Erro:** Falha na Instalação de CLI
   - **Causa:** Gerenciador de pacotes indisponível ou problemas de rede
   - **Resolução:** Tentar um gerenciador de pacotes alternativo ou instalação manual
   - **Recuperação:** Fornecer instruções de instalação manual

2. **Erro:** Falha na Autenticação do GitHub
   - **Causa:** Token expirado ou usuário cancelou
   - **Resolução:** Reexecutar gh auth login
   - **Recuperação:** Oferecer pular o setup do GitHub e continuar localmente

3. **Erro:** Permissão Negada
   - **Causa:** Privilégios insuficientes para instalação
   - **Resolução:** Executar com privilégios elevados ou usar instalação com escopo de usuário
   - **Recuperação:** Documentar as permissões necessárias para correção manual

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 5-15 min (dependendo das instalações necessárias)
cost_estimated: $0.00 (sem tokens de IA, apenas operações de CLI)
token_usage: ~500-1.000 tokens (apenas para orientação)
```

**Notas de Otimização:**

- Verificações de CLI em paralelo para reduzir o tempo total
- Cachear os resultados de detecção em .aiox/environment-report.yaml
- Pular ferramentas já instaladas

---

## Metadata

```yaml
story: N/A (Framework enhancement)
version: 1.1.0
dependencies:
  - github-cli.yaml
  - supabase-cli.yaml
  - railway-cli.yaml
  - coderabbit
tags:
  - bootstrap
  - environment
  - setup
  - greenfield
updated_at: 2025-12-02
changelog:
  1.1.0:
    - Corrigido: Workflow do Git - commit antes de gh repo create --push
    - Corrigido: Separação de sintaxe PowerShell vs bash
    - Adicionado: Detecção de atualização de CLI e oferta para ferramentas desatualizadas
    - Adicionado: Verificação aprimorada do CodeRabbit CLI com suporte a WSL
    - Melhorado: Separação clara dos comandos Windows/Unix
```

---

## Elicitação

```yaml
elicit: true
interaction_points:
  - project_name: 'Qual é o nome do projeto?'
  - github_org: 'Organização ou nome de usuário GitHub para o repositório?'
  - optional_tools: 'Quais ferramentas opcionais você quer instalar?'
  - git_provider: 'Preferência de provedor Git (GitHub/GitLab/Bitbucket)?'
```

---

## Processo

### Passo 1: Detectar o Sistema Operacional

**Ação:** Identificar o SO e os gerenciadores de pacotes disponíveis

**IMPORTANTE:** O agente executando esta tarefa deve detectar o SO usando comandos nativos apropriados para o shell atual. NÃO misture sintaxe de PowerShell e bash.

**Para Windows (PowerShell):**

```powershell
# Detecção em Windows PowerShell - usar apenas em contexto PowerShell
Write-Host "Detecting operating system..."
Write-Host "OS: Windows"
Write-Host "Architecture: $([System.Environment]::Is64BitOperatingSystem ? '64-bit' : '32-bit')"

# Verificar gerenciadores de pacotes
$pkgMgrs = @()
if (Get-Command winget -ErrorAction SilentlyContinue) { $pkgMgrs += "winget" }
if (Get-Command choco -ErrorAction SilentlyContinue) { $pkgMgrs += "chocolatey" }
if (Get-Command scoop -ErrorAction SilentlyContinue) { $pkgMgrs += "scoop" }
Write-Host "Package managers: $($pkgMgrs -join ', ')"
```

**Para macOS/Linux (bash):**

```bash
# Detecção em Unix bash - usar apenas em contexto bash/zsh
echo "Detecting operating system..."
OS=$(uname -s)
ARCH=$(uname -m)

echo "OS: $OS"
echo "Architecture: $ARCH"

# Verificar gerenciadores de pacotes disponíveis
if [ "$OS" = "Darwin" ]; then
  command -v brew >/dev/null 2>&1 && echo "Package manager: Homebrew"
elif [ "$OS" = "Linux" ]; then
  command -v apt >/dev/null 2>&1 && echo "Package manager: apt"
  command -v dnf >/dev/null 2>&1 && echo "Package manager: dnf"
  command -v pacman >/dev/null 2>&1 && echo "Package manager: pacman"
fi
```

**Orientação ao Agente:**

- No Windows: Use comandos PowerShell diretamente (sem necessidade de wrapper bash)
- No macOS/Linux: Use comandos bash diretamente
- NUNCA misture sintaxe (ex: não use variáveis bash `${}` em contexto PowerShell)
- Verificações simples de versão funcionam em qualquer plataforma: `git --version`, `node --version`, etc.

**Saída:** Armazenar informações do SO para os passos subsequentes

---

### Passo 2: Auditoria das Ferramentas de CLI

**Ação:** Verificar todos os CLIs obrigatórios e opcionais

Apresente uma tabela de status abrangente:

```
╔════════════════════════════════════════════════════════════════════════╗
║                     AIOX ENVIRONMENT AUDIT                              ║
╠════════════════════════════════════════════════════════════════════════╣
║ Category      │ Tool          │ Status    │ Version    │ Required     ║
╠═══════════════╪═══════════════╪═══════════╪════════════╪══════════════╣
║ ESSENTIAL     │ git           │ ✅ OK     │ 2.43.0     │ YES          ║
║               │ gh (GitHub)   │ ❌ MISSING│ -          │ YES          ║
║               │ node          │ ✅ OK     │ 20.10.0    │ YES          ║
║               │ npm           │ ✅ OK     │ 10.2.4     │ YES          ║
╠═══════════════╪═══════════════╪═══════════╪════════════╪══════════════╣
║ INFRASTRUCTURE│ supabase      │ ❌ MISSING│ -          │ RECOMMENDED  ║
║               │ railway       │ ❌ MISSING│ -          │ OPTIONAL     ║
║               │ docker        │ ✅ OK     │ 24.0.7     │ RECOMMENDED  ║
╠═══════════════╪═══════════════╪═══════════╪════════════╪══════════════╣
║ QUALITY       │ coderabbit    │ ⚠️ CHECK  │ 0.8.0      │ RECOMMENDED  ║
║               │               │ (WSL/Win) │            │              ║
╠═══════════════╪═══════════════╪═══════════╪════════════╪══════════════╣
║ OPTIONAL      │ pnpm          │ ❌ MISSING│ -          │ OPTIONAL     ║
║               │ bun           │ ❌ MISSING│ -          │ OPTIONAL     ║
╚════════════════════════════════════════════════════════════════════════╝

Summary: 4/10 tools installed | 2 essential missing | 4 recommended missing
```

**Detecção de Atualizações:**

Quando uma ferramenta está instalada mas desatualizada, exiba informações adicionais:

```
║  ⚠️ UPDATES AVAILABLE                                                        ║
╠═══════════════╪═══════════════╪═══════════════╪═══════════════╪══════════════╣
║ Tool          │ Current       │ Latest        │ Update Command                ║
╠═══════════════╪═══════════════╪═══════════════╪═══════════════════════════════╣
║ supabase      │ 2.24.3        │ 2.62.10       │ npm update -g supabase        ║
║ gh            │ 2.40.0        │ 2.63.0        │ winget upgrade GitHub.cli     ║
╚═══════════════════════════════════════════════════════════════════════════════╝

Would you like to update outdated tools? (Y/n): _
```

**Comandos de Verificação de Atualização:**

```yaml
update_checks:
  supabase:
    check_latest: 'npm view supabase version'
    update:
      npm: 'npm update -g supabase'
      scoop: 'scoop update supabase'
      brew: 'brew upgrade supabase'

  gh:
    check_latest: 'gh api repos/cli/cli/releases/latest --jq .tag_name'
    update:
      windows: 'winget upgrade GitHub.cli'
      macos: 'brew upgrade gh'
      linux: 'gh upgrade'

  node:
    note: 'Considere usar nvm/fnm para o gerenciamento de versão do Node.js'
    check_latest: 'npm view node version'

  railway:
    check_latest: 'npm view @railway/cli version'
    update:
      npm: 'npm update -g @railway/cli'
```

**Comandos de Verificação de CLI:**

```yaml
cli_checks:
  essential:
    git:
      check: 'git --version'
      expected: 'git version 2.x'
      install:
        windows: 'winget install --id Git.Git'
        macos: 'xcode-select --install'
        linux: 'sudo apt install git'

    gh:
      check: 'gh --version'
      expected: 'gh version 2.x'
      install:
        windows: 'winget install --id GitHub.cli'
        macos: 'brew install gh'
        linux: 'sudo apt install gh'
      post_install: 'gh auth login'

    node:
      check: 'node --version'
      expected: 'v18.x or v20.x'
      install:
        windows: 'winget install --id OpenJS.NodeJS.LTS'
        macos: 'brew install node@20'
        linux: 'curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt install nodejs'

    npm:
      check: 'npm --version'
      expected: '10.x'
      note: 'Instalado com o Node.js'

  infrastructure:
    supabase:
      check: 'supabase --version'
      expected: '1.x'
      install:
        npm: 'npm install -g supabase'
        scoop: 'scoop bucket add supabase https://github.com/supabase/scoop-bucket.git && scoop install supabase'
        brew: 'brew install supabase/tap/supabase'
      post_install: 'supabase login'

    railway:
      check: 'railway --version'
      expected: '3.x'
      install:
        npm: 'npm install -g @railway/cli'
        brew: 'brew install railway'
      post_install: 'railway login'

    docker:
      check: 'docker --version'
      expected: '24.x or 25.x'
      install:
        windows: 'winget install --id Docker.DockerDesktop'
        macos: 'brew install --cask docker'
        linux: 'See https://docs.docker.com/engine/install/'
      note: 'Necessário para o desenvolvimento local do Supabase'

  quality:
    coderabbit:
      check_windows: |
        # Windows: CodeRabbit CLI is installed in WSL, not native Windows
        # First check if WSL is available
        wsl --version
        if ($LASTEXITCODE -eq 0) {
          # Then check CodeRabbit in WSL
          wsl bash -c 'if [ -f ~/.local/bin/coderabbit ]; then ~/.local/bin/coderabbit --version; else echo "NOT_INSTALLED"; fi'
        } else {
          Write-Host "WSL not available - CodeRabbit requires WSL on Windows"
        }
      check_unix: |
        # macOS/Linux: Check direct installation
        if command -v coderabbit >/dev/null 2>&1; then
          coderabbit --version
        elif [ -f ~/.local/bin/coderabbit ]; then
          ~/.local/bin/coderabbit --version
        else
          echo "NOT_INSTALLED"
        fi
      expected: '0.8.x or higher'
      install:
        windows_wsl: |
          # 1. Ensure WSL is installed: wsl --install
          # 2. In WSL terminal:
          curl -fsSL https://coderabbit.ai/install.sh | bash
          # 3. Authenticate:
          ~/.local/bin/coderabbit auth login
        macos: 'curl -fsSL https://coderabbit.ai/install.sh | bash'
        linux: 'curl -fsSL https://coderabbit.ai/install.sh | bash'
      note: |
        Cross-platform CodeRabbit CLI (Issue #731):
        - macOS/Linux: CodeRabbit runs natively. Binary at ~/.local/bin/coderabbit
          or anywhere on PATH. Invoke directly — no wrapper needed.
        - Windows: CodeRabbit runs through WSL (no native Windows binary today).
          Requires WSL with Ubuntu/Debian; binary at ~/.local/bin/coderabbit
          inside WSL; commands wrapped as `wsl bash -c '...'`.
        - The aiox-core runtime auto-detects the host (`process.platform`) and
          builds the right command shape. Override with `installation_mode:
          'wsl' | 'native'` in `quality-gate-config.yaml` only if detection
          is wrong.
        - See: docs/guides/coderabbit/README.md for full setup guide
      verification:
        windows: "wsl bash -c '~/.local/bin/coderabbit --version'"
        unix: 'coderabbit --version'

  optional:
    pnpm:
      check: 'pnpm --version'
      expected: '8.x'
      install:
        npm: 'npm install -g pnpm'
      note: 'Alternativa mais rápida ao npm'

    bun:
      check: 'bun --version'
      expected: '1.x'
      install:
        windows: 'powershell -c "irm bun.sh/install.ps1 | iex"'
        unix: 'curl -fsSL https://bun.sh/install | bash'
      note: 'Runtime JavaScript ultra-rápido'
```

---

### Passo 3: Instalação Interativa

**Ação:** Oferecer a instalação das ferramentas faltantes

**Ponto de Elicitação:**

```
Missing tools detected. How would you like to proceed?

1. INSTALL ALL - Install all missing essential + recommended tools
2. ESSENTIAL ONLY - Install only essential tools (git, gh, node)
3. CUSTOM - Choose which tools to install
4. SKIP - Continue without installing (not recommended)

Select option (1/2/3/4): _
```

**Se CUSTOM selecionado:**

```
Select tools to install (comma-separated numbers):

ESSENTIAL (required for AIOX):
  [1] gh (GitHub CLI) - Repository management, PR creation

INFRASTRUCTURE (recommended):
  [2] supabase - Database management, local development
  [3] railway - Cloud deployment
  [4] docker - Containerization, local Supabase

QUALITY (recommended):
  [5] coderabbit - Pre-PR code review (WSL required on Windows)

OPTIONAL:
  [6] pnpm - Fast package manager
  [7] bun - Ultra-fast JavaScript runtime

Enter selection (e.g., 1,2,3,5): _
```

**Execução da Instalação:**

```bash
# Example: Installing GitHub CLI on Windows
echo "Installing GitHub CLI..."
winget install --id GitHub.cli --accept-source-agreements --accept-package-agreements

if ($LASTEXITCODE -eq 0) {
  Write-Host "✅ GitHub CLI installed successfully"

  # Refresh PATH
  $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

  # Verify installation
  gh --version
} else {
  Write-Host "❌ Installation failed. Manual installation required."
  Write-Host "   Download: https://cli.github.com/"
}
```

---

### Passo 4: Autenticação de Serviços

**Ação:** Autenticar os serviços necessários

**Ponto de Elicitação:**

```
Service authentication required. The following services need login:

1. GitHub CLI (gh) - Required for repository creation
2. Supabase CLI - Required for database management
3. Railway CLI - Required for deployment

Authenticate now? (Y/n): _
```

**Autenticação do GitHub:**

```bash
echo "=== GitHub CLI Authentication ==="
echo ""

# Check current auth status
$authStatus = gh auth status 2>&1

if ($LASTEXITCODE -eq 0) {
  Write-Host "✅ Already authenticated to GitHub"
  gh auth status
} else {
  Write-Host "Starting GitHub authentication..."
  Write-Host ""
  Write-Host "Options:"
  Write-Host "  1. Login with browser (recommended)"
  Write-Host "  2. Login with token"
  Write-Host ""

  gh auth login

  if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ GitHub authentication successful"
  } else {
    Write-Host "❌ GitHub authentication failed"
    Write-Host "   Try again: gh auth login"
  }
}
```

**Autenticação do Supabase:**

```bash
echo "=== Supabase CLI Authentication ==="

# Check if already logged in
$supabaseStatus = supabase projects list 2>&1

if ($LASTEXITCODE -eq 0) {
  Write-Host "✅ Already authenticated to Supabase"
} else {
  Write-Host "Starting Supabase authentication..."
  supabase login

  if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Supabase authentication successful"
  }
}
```

**Autenticação do Railway:**

```bash
echo "=== Railway CLI Authentication ==="

$railwayStatus = railway whoami 2>&1

if ($LASTEXITCODE -eq 0) {
  Write-Host "✅ Already authenticated to Railway"
  railway whoami
} else {
  Write-Host "Starting Railway authentication..."
  railway login
}
```

---

### Passo 5: Inicialização do Repositório Git

**Ação:** Inicializar o repositório Git local e criar o remote no GitHub

**Ponto de Elicitação:**

```
Git Repository Setup

Project name: my-awesome-project

Options:
1. Create NEW repository on GitHub (recommended for greenfield)
2. Link to EXISTING GitHub repository
3. LOCAL ONLY - Initialize git without GitHub
4. SKIP - No git initialization

Select option (1/2/3/4): _
```

**Se NOVO repositório:**

```
GitHub Repository Configuration:

Repository name: my-awesome-project
Visibility:
  1. Public
  2. Private (recommended)

GitHub Organization/Username:
  Found organizations: SynkraAI
  Or use personal account: your-username

Select owner: _

Description (optional): _
```

**Criação do Repositório:**

```bash
echo "=== Creating Git Repository ==="

# Initialize local git
git init

# Create .gitignore
@"
# Dependencies
node_modules/
.pnpm-store/

# Build outputs
dist/
build/
.next/
out/

# Environment files
.env
.env.local
.env.*.local

# IDE
.idea/
.vscode/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db

# AIOX generated files
.aiox/project-status.yaml
.aiox/environment-report.yaml

# Logs
logs/
*.log
npm-debug.log*

# Testing
coverage/
.nyc_output/

# Temporary files
tmp/
temp/
*.tmp
"@ | Out-File -FilePath .gitignore -Encoding utf8

# Create initial README
@"
# $PROJECT_NAME

> Created with Synkra AIOX

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

## Documentation

- [PRD](docs/prd.md)
- [Architecture](docs/architecture.md)

---
*Generated by AIOX Environment Bootstrap*
"@ | Out-File -FilePath README.md -Encoding utf8

# CRITICAL: Create initial commit BEFORE gh repo create --push
# The --push flag requires at least one commit to exist
git add .
git commit -m "chore: initial project setup

- Initialize Synkra AIOX project structure
- Add .gitignore with standard exclusions
- Add README.md with project placeholder

🤖 Generated by AIOX Environment Bootstrap"

if ($LASTEXITCODE -ne 0) {
  Write-Host "⚠️ Initial commit failed. Checking if already committed..."
  $hasCommits = git rev-parse HEAD 2>$null
  if (-not $hasCommits) {
    Write-Host "❌ Cannot proceed without initial commit"
    exit 1
  }
}

# Now create GitHub repository with --push (requires existing commits)
gh repo create $PROJECT_NAME --private --description "$DESCRIPTION" --source . --remote origin --push

if ($LASTEXITCODE -eq 0) {
  Write-Host "✅ Repository created and pushed to GitHub"
  gh repo view --web
} else {
  Write-Host "❌ GitHub repository creation failed"
  Write-Host "   Trying alternative approach..."

  # Alternative: Create repo without push, then push manually
  gh repo create $PROJECT_NAME --private --description "$DESCRIPTION" --source . --remote origin
  if ($LASTEXITCODE -eq 0) {
    git push -u origin main
    Write-Host "✅ Repository created and pushed (alternative method)"
  } else {
    Write-Host "❌ Please create repository manually: gh repo create"
  }
}
```

---

### Passo 6: Scaffold da Estrutura do Projeto

**Ação:** Criar a estrutura de projeto em conformidade com o AIOX

```bash
echo "=== Creating Project Structure ==="

# Create directory structure
$directories = @(
  "docs",
  "docs/stories",
  "docs/architecture",
  "docs/guides",
  ".aiox",
  "src",
  "tests"
)

foreach ($dir in $directories) {
  New-Item -ItemType Directory -Path $dir -Force | Out-Null
  Write-Host "  Created: $dir/"
}

# Create .aiox/config.yaml
@"
# AIOX Project Configuration
version: 2.1.0
project:
  name: $PROJECT_NAME
  type: greenfield
  created: $(Get-Date -Format "yyyy-MM-dd")

environment:
  bootstrapped: true
  bootstrap_date: $(Get-Date -Format "yyyy-MM-ddTHH:mm:ss")

workflow:
  current: greenfield-fullstack
  phase: 0-bootstrap-complete

permissions:
  mode: ask  # Permission mode: explore (read-only), ask (confirm changes), auto (full autonomy)

settings:
  auto_update_status: true
  quality_gates_enabled: true
"@ | Out-File -FilePath ".aiox/config.yaml" -Encoding utf8

# Create package.json if not exists
if (-not (Test-Path "package.json")) {
@"
{
  "name": "$PROJECT_NAME",
  "version": "0.1.0",
  "description": "Created with Synkra AIOX",
  "scripts": {
    "dev": "echo 'Add your dev script'",
    "build": "echo 'Add your build script'",
    "test": "echo 'Add your test script'",
    "lint": "echo 'Add your lint script'",
    "typecheck": "echo 'Add your typecheck script'"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
"@ | Out-File -FilePath "package.json" -Encoding utf8
}

Write-Host "✅ Project structure created"
```

---

### Passo 6.1: Seleção do Perfil de Usuário (Story 12.1)

**Ação:** Perguntar ao usuário a preferência de perfil e persistir em `~/.aiox/user-config.yaml`

**Ponto de Elicitação (PRD §2.4):**

```
🤖 Bem-vindo ao AIOX!

Quando uma IA gera código para você, qual opção te descreve melhor?

[1] 🟢 Modo Assistido (Recomendado)
    → "Não sei avaliar se o código está certo ou errado"

[2] 🔵 Modo Avançado
    → "Consigo identificar quando algo está errado e corrigir"

Escolha [1/2]:
```

**Comportamento do Modo YOLO:** Auto-selecionar `advanced` (o desenvolvedor rodando em modo autônomo é avançado por definição)

**Mapeamento de Perfil:**
- Opção 1 (Modo Assistido) → `user_profile: "bob"`
- Opção 2 (Modo Avançado) → `user_profile: "advanced"`

**Persistência:**

```bash
# Create ~/.aiox/ with secure permissions
mkdir -p ~/.aiox
chmod 700 ~/.aiox

# Write user-config.yaml with selected profile
cat > ~/.aiox/user-config.yaml << EOF
# AIOX User Preferences (global, cross-project)
# Created by environment-bootstrap
# Change with: *toggle-profile
user_profile: "${SELECTED_PROFILE}"
default_language: "pt-BR"
EOF
```

**Programático (Node.js):**

```javascript
const { setUserConfigValue, ensureUserConfigDir } = require('.aiox-core/core/config/config-resolver');

// Ensure directory exists with permissions 700
ensureUserConfigDir();

// Write user profile
setUserConfigValue('user_profile', selectedProfile); // 'bob' or 'advanced'
setUserConfigValue('default_language', 'pt-BR');
```

**Validação:**
- O perfil deve ser `bob` ou `advanced`
- O diretório `~/.aiox/` deve ter permissões 700
- O `~/.aiox/user-config.yaml` deve ser YAML válido após a escrita

---

### Passo 6.5: Setup do Docker MCP (Opcional, mas Recomendado)

**Condição:** Docker Desktop 4.50+ está instalado E o Docker MCP Toolkit está disponível

**Ação:** Configurar o Docker MCP Toolkit com transporte HTTP para integração com o Claude Code

**Ponto de Elicitação:**

```
╔════════════════════════════════════════════════════════════════════════╗
║                     DOCKER MCP SETUP                                    ║
╠════════════════════════════════════════════════════════════════════════╣
║                                                                         ║
║  Docker Desktop detected with MCP Toolkit!                              ║
║                                                                         ║
║  Configure MCP servers for Claude Code?                                 ║
║                                                                         ║
║  1. MINIMAL - context7 + desktop-commander + playwright (no API keys)   ║
║  2. FULL - minimal + exa (requires EXA_API_KEY)                         ║
║  3. SKIP - Configure later with *setup-mcp-docker                       ║
║                                                                         ║
║  Select option (1/2/3): _                                               ║
║                                                                         ║
╚════════════════════════════════════════════════════════════════════════╝
```

**Comportamento do Modo YOLO:** Auto-selecionar MINIMAL (nenhuma API key necessária)

**Se MINIMAL ou FULL selecionado:**

**Passo 6.5.1: Iniciar o Serviço Gateway**

```powershell
# Windows
Write-Host "Starting MCP Gateway service..."

# Create gateway service file if not exists
if (-not (Test-Path ".docker/mcp/gateway-service.yml")) {
  # Copy from template or create
  New-Item -ItemType Directory -Path ".docker/mcp" -Force | Out-Null
  # Gateway service will be started by Docker Compose
}

# Start gateway as persistent service
docker compose -f .docker/mcp/gateway-service.yml up -d

# Wait for gateway to be healthy
$maxRetries = 12
$retryCount = 0
do {
  Start-Sleep -Seconds 5
  $health = Invoke-WebRequest -Uri "http://localhost:8080/health" -UseBasicParsing -ErrorAction SilentlyContinue
  $retryCount++
} while ($health.StatusCode -ne 200 -and $retryCount -lt $maxRetries)

if ($health.StatusCode -eq 200) {
  Write-Host "✅ MCP Gateway is healthy"
} else {
  Write-Host "⚠️ MCP Gateway health check failed - continuing anyway"
}
```

**Passo 6.5.2: Habilitar os MCPs Padrão**

```powershell
# Enable minimal preset MCPs (no API keys required)
Write-Host "Enabling MCP servers..."

docker mcp server enable context7
docker mcp server enable desktop-commander
docker mcp server enable playwright

# If FULL preset selected and EXA_API_KEY exists
if ($PRESET -eq "FULL" -and $env:EXA_API_KEY) {
  docker mcp server enable exa
  Write-Host "✅ Exa MCP enabled (web search)"
}

# Configure desktop-commander with user home path
$userHome = $env:USERPROFILE
docker mcp config write "desktop-commander:`n  paths:`n    - $userHome"

Write-Host "✅ MCP servers enabled"
docker mcp server ls
```

**Passo 6.5.3: Configurar o Claude Code (Transporte HTTP)**

```powershell
Write-Host "Configuring Claude Code for MCP Gateway..."

$claudeConfigPath = Join-Path $env:USERPROFILE ".claude.json"

if (Test-Path $claudeConfigPath) {
  # Read existing config
  $claudeConfig = Get-Content $claudeConfigPath | ConvertFrom-Json

  # Add or update docker-gateway with HTTP transport
  if (-not $claudeConfig.mcpServers) {
    $claudeConfig | Add-Member -NotePropertyName "mcpServers" -NotePropertyValue @{} -Force
  }

  $claudeConfig.mcpServers.'docker-gateway' = @{
    type = "http"
    url = "http://localhost:8080/mcp"
  }

  # Save config
  $claudeConfig | ConvertTo-Json -Depth 10 | Set-Content $claudeConfigPath -Encoding UTF8
  Write-Host "✅ Claude Code configured with HTTP transport"
} else {
  Write-Host "⚠️ ~/.claude.json not found - please configure manually"
  Write-Host "   Add to mcpServers: { 'docker-gateway': { 'type': 'http', 'url': 'http://localhost:8080/mcp' } }"
}
```

**Passo 6.5.4: Verificar o Setup do MCP**

```powershell
Write-Host "Verifying MCP setup..."

# Check gateway health
$health = Invoke-WebRequest -Uri "http://localhost:8080/health" -UseBasicParsing -ErrorAction SilentlyContinue
if ($health.StatusCode -eq 200) {
  Write-Host "✅ Gateway: Healthy"
} else {
  Write-Host "❌ Gateway: Not responding"
}

# Check enabled servers
$servers = docker mcp server ls
Write-Host "✅ Enabled servers: $servers"

# Summary
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════"
Write-Host "  MCP SETUP COMPLETE"
Write-Host "═══════════════════════════════════════════════════════════════"
Write-Host "  Gateway: http://localhost:8080 (HTTP/SSE)"
Write-Host "  MCPs: context7, desktop-commander, playwright"
Write-Host "  Claude Config: ~/.claude.json (HTTP transport)"
Write-Host ""
Write-Host "  ⚠️ IMPORTANT: Restart Claude Code to connect to MCP Gateway"
Write-Host "═══════════════════════════════════════════════════════════════"
```

**Condições para Pular:**

- Docker não instalado ou não em execução
- Docker MCP Toolkit não disponível
- Usuário selecionou a opção SKIP

**Saída:** Status do setup do MCP adicionado ao relatório de ambiente

---

### Passo 7: Geração do Relatório de Ambiente

**Ação:** Gerar um relatório de ambiente abrangente

```bash
echo "=== Generating Environment Report ==="

# Collect all environment information
$report = @{
  generated_at = Get-Date -Format "yyyy-MM-ddTHH:mm:ss"
  project_name = $PROJECT_NAME

  system = @{
    os = [System.Environment]::OSVersion.VersionString
    architecture = if ([System.Environment]::Is64BitOperatingSystem) { "x64" } else { "x86" }
    user = $env:USERNAME
    hostname = $env:COMPUTERNAME
  }

  cli_tools = @{
    git = @{
      installed = $true
      version = (git --version) -replace "git version ", ""
      path = (Get-Command git).Source
    }
    gh = @{
      installed = (Get-Command gh -ErrorAction SilentlyContinue) -ne $null
      version = if (Get-Command gh -ErrorAction SilentlyContinue) { (gh --version | Select-Object -First 1) -replace "gh version ", "" } else { $null }
      authenticated = (gh auth status 2>&1) -match "Logged in"
    }
    node = @{
      installed = (Get-Command node -ErrorAction SilentlyContinue) -ne $null
      version = if (Get-Command node -ErrorAction SilentlyContinue) { (node --version) -replace "v", "" } else { $null }
    }
    npm = @{
      installed = (Get-Command npm -ErrorAction SilentlyContinue) -ne $null
      version = if (Get-Command npm -ErrorAction SilentlyContinue) { npm --version } else { $null }
    }
    supabase = @{
      installed = (Get-Command supabase -ErrorAction SilentlyContinue) -ne $null
      version = if (Get-Command supabase -ErrorAction SilentlyContinue) { (supabase --version) } else { $null }
      authenticated = $false # Check separately
    }
    railway = @{
      installed = (Get-Command railway -ErrorAction SilentlyContinue) -ne $null
      version = if (Get-Command railway -ErrorAction SilentlyContinue) { (railway --version) } else { $null }
    }
    docker = @{
      installed = (Get-Command docker -ErrorAction SilentlyContinue) -ne $null
      version = if (Get-Command docker -ErrorAction SilentlyContinue) { (docker --version) -replace "Docker version ", "" -replace ",.*", "" } else { $null }
      running = (docker info 2>&1) -notmatch "error"
    }
  }

  repository = @{
    initialized = Test-Path ".git"
    remote_url = if (Test-Path ".git") { git remote get-url origin 2>$null } else { $null }
    branch = if (Test-Path ".git") { git branch --show-current } else { $null }
  }

  validation = @{
    essential_complete = $true
    recommended_complete = $false
    ready_for_development = $true
  }
}

# Convert to YAML and save
# (Simplified - in practice use ConvertTo-Yaml module or js-yaml)
$report | ConvertTo-Json -Depth 5 | Out-File -FilePath ".aiox/environment-report.json" -Encoding utf8

Write-Host "✅ Environment report saved to .aiox/environment-report.json"
```

---

### Passo 8: Validação Final e Resumo

**Ação:** Validar o ambiente e exibir o resumo

```
╔═══════════════════════════════════════════════════════════════════════════╗
║              ✅ AIOX ENVIRONMENT BOOTSTRAP COMPLETE                        ║
╠═══════════════════════════════════════════════════════════════════════════╣
║                                                                            ║
║  Project: my-awesome-project                                               ║
║  Repository: https://github.com/username/my-awesome-project                ║
║  Branch: main                                                              ║
║                                                                            ║
╠═══════════════════════════════════════════════════════════════════════════╣
║  CLI Tools Status                                                          ║
╠═══════════════════════════════════════════════════════════════════════════╣
║  ✅ git 2.43.0          ✅ gh 2.40.1 (authenticated)                       ║
║  ✅ node 20.10.0        ✅ npm 10.2.4                                      ║
║  ✅ supabase 1.123.0    ✅ railway 3.5.0                                   ║
║  ✅ docker 24.0.7       ⚠️  coderabbit (WSL only)                          ║
║                                                                            ║
╠═══════════════════════════════════════════════════════════════════════════╣
║  Project Structure                                                         ║
╠═══════════════════════════════════════════════════════════════════════════╣
║  my-awesome-project/                                                       ║
║  ├── .aiox/                    # AIOX configuration                        ║
║  │   ├── config.yaml           # Project config                            ║
║  │   └── environment-report.json                                           ║
║  ├── docs/                     # Documentation (PRD, architecture)         ║
║  │   ├── stories/              # User stories                              ║
║  │   ├── architecture/         # Architecture docs                         ║
║  │   └── guides/               # Developer guides                          ║
║  ├── src/                      # Source code                               ║
║  ├── tests/                    # Test files                                ║
║  ├── .gitignore                # Git ignore rules                          ║
║  ├── package.json              # NPM configuration                         ║
║  └── README.md                 # Project readme                            ║
║                                                                            ║
╠═══════════════════════════════════════════════════════════════════════════╣
║  NEXT STEPS                                                                ║
╠═══════════════════════════════════════════════════════════════════════════╣
║                                                                            ║
║  Your environment is ready! Continue with the Greenfield workflow:         ║
║                                                                            ║
║  1. @analyst → Create Project Brief                                        ║
║     Start a new chat: @analyst                                             ║
║     Command: *create-doc project-brief                                     ║
║                                                                            ║
║  2. @pm → Create PRD                                                       ║
║     After project brief is approved                                        ║
║     Command: *create-doc prd                                               ║
║                                                                            ║
║  3. Continue with greenfield-fullstack workflow...                         ║
║                                                                            ║
║  Full workflow: .aiox-core/development/workflows/greenfield-fullstack.yaml ║
║                                                                            ║
╠═══════════════════════════════════════════════════════════════════════════╣
║  Quick Reference                                                           ║
╠═══════════════════════════════════════════════════════════════════════════╣
║  • View environment report: cat .aiox/environment-report.json              ║
║  • Check GitHub repo: gh repo view --web                                   ║
║  • AIOX help: @aiox-master *help                                           ║
║  • Re-run bootstrap: @devops *environment-bootstrap                        ║
║                                                                            ║
╚═══════════════════════════════════════════════════════════════════════════╝

Environment bootstrap completed in 8m 32s

— Gage, environment configured with confidence 🚀
```

---

## Checklist de Validação

- [ ] Sistema operacional detectado corretamente
- [ ] Todos os CLIs essenciais instalados (git, gh, node, npm)
- [ ] GitHub CLI autenticado
- [ ] Repositório Git inicializado
- [ ] Repositório remoto no GitHub criado
- [ ] .gitignore configurado
- [ ] Estrutura do projeto criada
- [ ] .aiox/config.yaml criado
- [ ] Relatório de ambiente gerado
- [ ] Commit inicial enviado (push) para o GitHub

---

## Solução de Problemas

### Problema 1: winget não reconhecido

**Erro:** `winget: The term 'winget' is not recognized`

**Correção:**

1. Atualize o Windows para a versão mais recente (winget requer Windows 10 1809+)
2. Ou instale o App Installer da Microsoft Store
3. Ou use a alternativa: `choco install gh` ou `scoop install gh`

### Problema 2: gh auth login falha

**Erro:** `error connecting to api.github.com`

**Correção:**

1. Verifique a conexão com a internet
2. Verifique se está atrás de um proxy corporativo: `gh config set http_proxy http://proxy:port`
3. Tente autenticação baseada em token: `gh auth login --with-token`

### Problema 3: Permissão negada ao criar o repositório

**Erro:** `Resource not accessible by personal access token`

**Correção:**

1. Reautentique com os escopos corretos: `gh auth login --scopes repo,workflow`
2. Verifique se a organização exige SSO: `gh auth login --hostname github.com`

### Problema 4: Docker não iniciando

**Erro:** `Cannot connect to Docker daemon`

**Correção:**

1. Windows: Garanta que o Docker Desktop esteja em execução
2. macOS: Abra o Docker.app
3. Linux: `sudo systemctl start docker`

---

## Rollback

Para desfazer o bootstrap de ambiente:

```bash
# Remove local git
rm -rf .git

# Remove AIOX files
rm -rf .aiox
rm -f .gitignore
rm -f README.md

# Delete GitHub repository (CAUTION!)
gh repo delete REPO_NAME --yes
```

---

## Referências

- [Documentação do GitHub CLI](https://cli.github.com/manual/)
- [Documentação do Supabase CLI](https://supabase.com/docs/guides/cli)
- [Documentação do Railway CLI](https://docs.railway.app/reference/cli-api)
- [Workflow Greenfield do AIOX](.aiox-core/development/workflows/greenfield-fullstack.yaml)
- [Guia de Setup do CodeRabbit](docs/guides/coderabbit/README.md)

---

**Status:** ✅ Pronto para Produção
**Testado em:** Windows 11, macOS Sonoma, Ubuntu 22.04
**Requisitos Mínimos:** Windows 10 1809+, macOS 12+, Ubuntu 20.04+
