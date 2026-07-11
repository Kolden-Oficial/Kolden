---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# setup-github

**Task ID:** setup-github
**Version:** 1.0.0
**Created:** 2025-12-08
**Updated:** 2025-12-08
**Agent:** @devops (Gage)
**Story:** 5.10 - Setup de GitHub DevOps para Projetos de Usuário

---

## Propósito

Configura a infraestrutura completa de GitHub DevOps para projetos de usuário criados com AIOX. Esta task copia workflows do GitHub Actions, configura o CodeRabbit, define proteção de branch e gerencia secrets.

**Esta task deve ser executada DEPOIS de `*environment-bootstrap`**, quando o repositório Git já estiver inicializado e enviado (pushed) ao GitHub.

---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Setup autônomo com padrões sensatos
- Pula componentes opcionais, instala o DevOps essencial
- **Melhor para:** Desenvolvedores experientes, setup rápido

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas para cada componente
- **Melhor para:** Aprendizado, setup pela primeira vez, onboarding de equipe

### 3. Planejamento Pré-Voo (Pre-Flight) - Planejamento Abrangente Antecipado
- Fase de análise completa antes de qualquer configuração
- Execução sem ambiguidade
- **Melhor para:** Ambientes enterprise, políticas rígidas

**Parameter:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: setupGitHub()
responsável: Gage (Operator)
responsavel_type: Agente
atomic_layer: Organism

**Entrada:**
- campo: project_path
  tipo: string
  origem: Auto-detect (cwd)
  obrigatório: false
  validação: Diretório válido com .git e remote do GitHub

- campo: options
  tipo: object
  origem: User Input
  obrigatório: false
  validação: |
    {
      skip_workflows: boolean,      // Pula o setup do GitHub Actions
      skip_coderabbit: boolean,     // Pula a configuração do CodeRabbit
      skip_branch_protection: boolean, // Pula as regras de proteção de branch
      skip_secrets: boolean,        // Pula o wizard de secrets
      project_type: string          // node | python | go | rust | mixed
    }

**Saída:**
- campo: devops_setup_report
  tipo: object
  destino: File system (.aiox/devops-setup-report.yaml)
  persistido: true

- campo: workflows_installed
  tipo: array
  destino: Return value
  persistido: false

- campo: protection_enabled
  tipo: boolean
  destino: Return value
  persistido: false
```

---

## Pré-condições

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Repositório Git existe (diretório .git presente)
    tipo: pre-condition
    blocker: true
    validação: |
      Test-Path ".git" (PowerShell) or [ -d .git ] (bash)
    error_message: "Repositório Git não encontrado. Rode *environment-bootstrap primeiro."

  - [ ] Remote do GitHub configurado
    tipo: pre-condition
    blocker: true
    validação: |
      git remote get-url origin
    error_message: "Remote do GitHub não configurado. Rode *environment-bootstrap primeiro."

  - [ ] GitHub CLI autenticado
    tipo: pre-condition
    blocker: true
    validação: |
      gh auth status
    error_message: "GitHub CLI não autenticado. Rode 'gh auth login'."

  - [ ] Repositório existe no GitHub
    tipo: pre-condition
    blocker: true
    validação: |
      gh repo view
    error_message: "Repositório não encontrado no GitHub. Faça push das mudanças primeiro."

  - [ ] Ainda não configurado (verificação de idempotência)
    tipo: pre-condition
    blocker: false
    validação: |
      Check .aiox/devops-setup-report.yaml existence
    warning_message: "Setup de DevOps já concluído. Use --force para reconfigurar."
```

---

## Pós-condições

**Propósito:** Validar o sucesso da execução DEPOIS que a task termina

**Checklist:**

```yaml
post-conditions:
  - [ ] Workflows do GitHub Actions presentes em .github/workflows/
    tipo: post-condition
    blocker: true
    validação: |
      Test-Path ".github/workflows/ci.yml"
    error_message: "Falha na instalação do workflow"

  - [ ] Config do CodeRabbit presente (se não pulado)
    tipo: post-condition
    blocker: false
    validação: |
      Test-Path ".coderabbit.yaml"
    warning_message: "CodeRabbit não configurado"

  - [ ] Relatório de setup de DevOps gerado
    tipo: post-condition
    blocker: false
    validação: |
      Test-Path ".aiox/devops-setup-report.yaml"
    error_message: "Relatório de setup não gerado"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de pass/fail para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Pelo menos o workflow ci.yml está instalado e válido
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Verify .github/workflows/ci.yml exists and is valid YAML
    error_message: "Workflow de CI não instalado"

  - [ ] Workflows são customizados para o tipo de projeto
    tipo: acceptance-criterion
    blocker: false
    validação: |
      Check node_version, python_version, etc. match project
    error_message: "Falha na customização do workflow"

  - [ ] Relatório de setup documenta todas as configurações
    tipo: acceptance-criterion
    blocker: true
    validação: |
      .aiox/devops-setup-report.yaml contains all setup details
    error_message: "Relatório de setup incompleto"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Tool:** github-cli
  - **Propósito:** Operações de repositório, proteção de branch, secrets
  - **Source:** .aiox-core/infrastructure/tools/cli/github-cli.yaml

- **Tool:** git
  - **Propósito:** Operações locais de repositório
  - **Source:** Built-in

---

## Tratamento de Erros

**Estratégia:** retry-with-alternatives

**Erros Comuns:**

1. **Erro:** API de Proteção de Branch Falhou
   - **Causa:** Permissões insuficientes ou limitações do tier gratuito
   - **Resolução:** Avisar o usuário sobre as limitações do tier gratuito do GitHub
   - **Recuperação:** Pular a proteção de branch, documentar no relatório

2. **Erro:** Conflito de Arquivo de Workflow
   - **Causa:** Arquivos de workflow já existem
   - **Resolução:** Solicitar ao usuário sobrescrever ou mesclar (merge)
   - **Recuperação:** Fazer backup do existente, instalar o novo

3. **Erro:** Permissão de Secrets Negada
   - **Causa:** O token não tem o escopo de secrets
   - **Resolução:** Reautenticar com o escopo de secrets
   - **Recuperação:** Pular os secrets, fornecer instruções manuais

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 2-5 min
cost_estimated: $0.00 (sem tokens de IA, apenas operações de API)
token_usage: ~300-500 tokens (apenas para orientação)
```

---

## Metadata

```yaml
story: 5.10
version: 1.0.0
dependencies:
  - environment-bootstrap.md
  - github-cli.yaml
tags:
  - devops
  - github
  - workflows
  - ci-cd
  - setup
updated_at: 2025-12-08
changelog:
  1.0.0:
    - Implementação inicial para a Story 5.10
    - Suporte a templates do GitHub Actions
    - Configuração do CodeRabbit
    - Proteção de branch via gh api
    - Integração com o wizard de secrets
```

---

## Elicitação

```yaml
elicit: true
interaction_points:
  - project_type: "Que tipo de projeto é este? (node/python/go/rust/mixed)"
  - workflows_select: "Quais workflows você quer instalar?"
  - branch_protection: "Habilitar proteção de branch para main? (requer GitHub Pro para repositórios privados)"
  - secrets_configure: "Quais secrets você quer configurar?"
```

---

## Processo

### Passo 1: Verificar Pré-condições

**Ação:** Verificar se todos os pré-requisitos foram atendidos

```powershell
echo "=== GitHub DevOps Setup Pre-Check ==="

# Check Git repository
if (-not (Test-Path ".git")) {
  Write-Host "❌ Repositório Git não encontrado"
  Write-Host "   Run: @devops *environment-bootstrap"
  exit 1
}
Write-Host "✅ Repositório Git encontrado"

# Check GitHub remote
$remoteUrl = git remote get-url origin 2>$null
if (-not $remoteUrl) {
  Write-Host "❌ Remote do GitHub não configurado"
  exit 1
}
Write-Host "✅ Remote do GitHub: $remoteUrl"

# Check GitHub CLI auth
$ghStatus = gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
  Write-Host "❌ GitHub CLI não autenticado"
  Write-Host "   Run: gh auth login"
  exit 1
}
Write-Host "✅ GitHub CLI autenticado"

# Check repo exists on GitHub
gh repo view --json name 2>$null
if ($LASTEXITCODE -ne 0) {
  Write-Host "❌ Repositório não encontrado no GitHub"
  exit 1
}
Write-Host "✅ Repositório existe no GitHub"

# Check idempotency
if (Test-Path ".aiox/devops-setup-report.yaml") {
  Write-Host "⚠️  Setup de DevOps já concluído"
  Write-Host "   Use --force to reconfigure"
}
```

---

### Passo 2: Detectar o Tipo de Projeto

**Ação:** Analisar o projeto para determinar o tipo e customizar os workflows

```powershell
echo "=== Detecting Project Type ==="

$projectType = "unknown"
$detectedFeatures = @()

# Node.js detection
if (Test-Path "package.json") {
  $projectType = "node"
  $detectedFeatures += "Node.js (package.json encontrado)"

  $pkg = Get-Content "package.json" | ConvertFrom-Json
  if ($pkg.devDependencies.typescript -or $pkg.dependencies.typescript) {
    $detectedFeatures += "TypeScript"
  }
  if ($pkg.devDependencies.jest -or $pkg.devDependencies.vitest) {
    $detectedFeatures += "Framework de testes (Jest/Vitest)"
  }
  if ($pkg.devDependencies.eslint) {
    $detectedFeatures += "ESLint"
  }
}

# Python detection
if (Test-Path "requirements.txt" -or Test-Path "pyproject.toml") {
  if ($projectType -eq "node") {
    $projectType = "mixed"
  } else {
    $projectType = "python"
  }
  $detectedFeatures += "Python"
}

# Go detection
if (Test-Path "go.mod") {
  if ($projectType -ne "unknown") {
    $projectType = "mixed"
  } else {
    $projectType = "go"
  }
  $detectedFeatures += "Go"
}

# Rust detection
if (Test-Path "Cargo.toml") {
  if ($projectType -ne "unknown") {
    $projectType = "mixed"
  } else {
    $projectType = "rust"
  }
  $detectedFeatures += "Rust"
}

Write-Host "Tipo de projeto: $projectType"
Write-Host "Features detectadas:"
$detectedFeatures | ForEach-Object { Write-Host "  - $_" }
```

**Ponto de Elicitação (se o tipo de projeto for incerto):**

```
Resultados da detecção do tipo de projeto:

Detectado: node (projeto Node.js/TypeScript)

Features encontradas:
  ✓ package.json
  ✓ TypeScript
  ✓ ESLint
  ✓ Testes Jest

Está correto? (Y/n): _

Ou selecione manualmente:
  1. Node.js/TypeScript
  2. Python
  3. Go
  4. Rust
  5. Mixed (múltiplas linguagens)
```

---

### Passo 3: Instalar os Workflows do GitHub Actions

**Ação:** Copiar e customizar os templates de workflow

**Ponto de Elicitação:**

```
╔════════════════════════════════════════════════════════════════════════╗
║              SELEÇÃO DE WORKFLOW DO GITHUB ACTIONS                      ║
╠════════════════════════════════════════════════════════════════════════╣
║                                                                         ║
║  Workflows disponíveis para projetos Node.js:                          ║
║                                                                         ║
║  [1] ci.yml           - Lint, TypeCheck, Test em PRs (RECOMENDADO)     ║
║  [2] pr-automation.yml - Resumo de qualidade, relatório de cobertura    ║
║  [3] release.yml      - Automação de release em tags                    ║
║                                                                         ║
║  Selecione os workflows a instalar (separados por vírgula, ou 'all'):    ║
║  Padrão: 1,2 (ci + pr-automation)                                       ║
║                                                                         ║
║  Seleção: _                                                             ║
║                                                                         ║
╚════════════════════════════════════════════════════════════════════════╝
```

**Instalação do Workflow:**

```powershell
echo "=== Installing GitHub Actions Workflows ==="

# Create .github/workflows directory
New-Item -ItemType Directory -Path ".github/workflows" -Force | Out-Null

# Copy ci.yml template with customization
$ciTemplate = Get-Content ".aiox-core/infrastructure/templates/github-workflows/ci.yml.template" -Raw

# Substitute variables based on project type
$ciWorkflow = $ciTemplate `
  -replace '\{\{NODE_VERSION\}\}', '20' `
  -replace '\{\{PROJECT_NAME\}\}', $projectName `
  -replace '\{\{LINT_COMMAND\}\}', 'npm run lint' `
  -replace '\{\{TEST_COMMAND\}\}', 'npm run test:coverage' `
  -replace '\{\{TYPECHECK_COMMAND\}\}', 'npm run typecheck'

$ciWorkflow | Out-File -FilePath ".github/workflows/ci.yml" -Encoding utf8

Write-Host "✅ ci.yml instalado"

# Copy pr-automation.yml
Copy-Item ".aiox-core/infrastructure/templates/github-workflows/pr-automation.yml.template" `
  -Destination ".github/workflows/pr-automation.yml"
Write-Host "✅ pr-automation.yml instalado"

# Copy release.yml
Copy-Item ".aiox-core/infrastructure/templates/github-workflows/release.yml.template" `
  -Destination ".github/workflows/release.yml"
Write-Host "✅ release.yml instalado"
```

---

### Passo 4: Configurar o CodeRabbit

**Ação:** Gerar a configuração do CodeRabbit com base na estrutura do projeto

**Ponto de Elicitação:**

```
╔════════════════════════════════════════════════════════════════════════╗
║              CONFIGURAÇÃO DO CODERABBIT                                 ║
╠════════════════════════════════════════════════════════════════════════╣
║                                                                         ║
║  O CodeRabbit fornece revisão de código automatizada em PRs.           ║
║                                                                         ║
║  Opções de perfil de revisão:                                          ║
║  [1] chill     - Feedback mínimo, apenas problemas críticos             ║
║  [2] balanced  - Feedback moderado (RECOMENDADO)                       ║
║  [3] assertive - Feedback abrangente, padrões rígidos                   ║
║                                                                         ║
║  Selecione o perfil (1/2/3): _                                         ║
║                                                                         ║
║  ⚠️  Nota: Instale o GitHub App do CodeRabbit após o setup:            ║
║      https://github.com/apps/coderabbitai                               ║
║                                                                         ║
╚════════════════════════════════════════════════════════════════════════╝
```

**Configuração do CodeRabbit:**

```powershell
echo "=== Configuring CodeRabbit ==="

# Generate .coderabbit.yaml with project-specific path instructions
$coderabbitConfig = Get-Content ".aiox-core/infrastructure/templates/coderabbit.yaml.template" -Raw

# Customize based on project structure
$pathInstructions = @()

if (Test-Path "src") {
  $pathInstructions += @"
    - path: "src/**"
      instructions: |
        Foque em qualidade de código, performance e segurança.
        Verifique o tratamento de erros adequado e a validação de entrada.
"@
}

if (Test-Path "tests" -or Test-Path "__tests__") {
  $pathInstructions += @"
    - path: "**/*.test.*"
      instructions: |
        Garanta a cobertura de testes e os casos de borda (edge cases).
        Verifique se as implementações de mock estão corretas.
"@
}

if (Test-Path "docs") {
  $pathInstructions += @"
    - path: "docs/**"
      instructions: |
        Verifique a clareza e a completude da documentação.
"@
}

# Substitute variables
$coderabbitConfig = $coderabbitConfig `
  -replace '\{\{REVIEW_PROFILE\}\}', $reviewProfile `
  -replace '\{\{PATH_INSTRUCTIONS\}\}', ($pathInstructions -join "`n")

$coderabbitConfig | Out-File -FilePath ".coderabbit.yaml" -Encoding utf8

Write-Host "✅ .coderabbit.yaml criado"
Write-Host ""
Write-Host "📌 IMPORTANTE: Instale o GitHub App do CodeRabbit:"
Write-Host "   https://github.com/apps/coderabbitai"
```

---

### Passo 5: Configurar a Proteção de Branch

**Ação:** Configurar regras de proteção de branch via API do GitHub

**Ponto de Elicitação:**

```
╔════════════════════════════════════════════════════════════════════════╗
║              CONFIGURAÇÃO DE PROTEÇÃO DE BRANCH                         ║
╠════════════════════════════════════════════════════════════════════════╣
║                                                                         ║
║  A proteção de branch garante a qualidade do código antes do merge.    ║
║                                                                         ║
║  ⚠️  Nota: Alguns recursos exigem GitHub Pro (pago) p/ repos privados. ║
║                                                                         ║
║  Regras de proteção para 'main':                                       ║
║  [1] Status checks obrigatórios (lint, test, typecheck)                 ║
║  [2] Exigir revisões de PR antes do merge                              ║
║  [3] Exigir resolução de conversas                                     ║
║  [4] Impedir force pushes                                              ║
║                                                                         ║
║  Habilitar proteção de branch? (Y/n): _                               ║
║                                                                         ║
║  Número de revisores obrigatórios (0-6, padrão: 1): _                  ║
║                                                                         ║
╚════════════════════════════════════════════════════════════════════════╝
```

**Setup da Proteção de Branch:**

```bash
echo "=== Configuring Branch Protection ==="

# Get repository info
REPO_INFO=$(gh repo view --json owner,name)
OWNER=$(echo $REPO_INFO | jq -r '.owner.login')
REPO=$(echo $REPO_INFO | jq -r '.name')

# Configure branch protection for main
gh api \
  --method PUT \
  -H "Accept: application/vnd.github+json" \
  /repos/$OWNER/$REPO/branches/main/protection \
  -f "required_status_checks[strict]=true" \
  -f "required_status_checks[contexts][]=lint" \
  -f "required_status_checks[contexts][]=typecheck" \
  -f "required_status_checks[contexts][]=test" \
  -f "enforce_admins=false" \
  -f "required_pull_request_reviews[required_approving_review_count]=1" \
  -f "required_pull_request_reviews[dismiss_stale_reviews]=true" \
  -f "restrictions=null" \
  -f "allow_force_pushes=false" \
  -f "allow_deletions=false"

if [ $? -eq 0 ]; then
  echo "✅ Proteção de branch habilitada para 'main'"
else
  echo "⚠️  Falha no setup da proteção de branch"
  echo "   Isso pode ser devido às limitações do tier gratuito do GitHub para repos privados"
  echo "   Setup manual: Settings → Branches → Add branch protection rule"
fi
```

---

### Passo 6: Wizard de Secrets

**Ação:** Wizard interativo para configurar os secrets do repositório

**Ponto de Elicitação:**

```
╔════════════════════════════════════════════════════════════════════════╗
║              WIZARD DE CONFIGURAÇÃO DE SECRETS                          ║
╠════════════════════════════════════════════════════════════════════════╣
║                                                                         ║
║  Secrets de repositório são valores criptografados usados pelo Actions. ║
║                                                                         ║
║  Secrets comuns para o seu tipo de projeto:                            ║
║                                                                         ║
║  [1] CODECOV_TOKEN        - Relatório de cobertura (opcional)           ║
║  [2] NPM_TOKEN            - Publicação no NPM (se for biblioteca)       ║
║  [3] VERCEL_TOKEN         - Deploy na Vercel (se for frontend)          ║
║  [4] RAILWAY_TOKEN        - Deploy na Railway (se for backend)          ║
║  [5] SUPABASE_URL         - Conexão Supabase (se estiver usando)        ║
║  [6] SUPABASE_ANON_KEY    - Chave anônima do Supabase                   ║
║  [7] SUPABASE_SERVICE_KEY - Chave de serviço do Supabase (para CI)      ║
║                                                                         ║
║  Selecione os secrets a configurar (separados por vírgula, ou 'skip'): _ ║
║                                                                         ║
╚════════════════════════════════════════════════════════════════════════╝
```

**Configuração de Secrets:**

```powershell
echo "=== Configuring Secrets ==="

$secretsConfigured = @()

# Configure selected secrets
foreach ($secret in $selectedSecrets) {
  Write-Host ""
  Write-Host "Configurando $secret..."

  # Prompt for value (masked input)
  $value = Read-Host -AsSecureString "Digite o valor para $secret"
  $plainValue = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($value)
  )

  # Set secret via gh cli
  echo $plainValue | gh secret set $secret

  if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ $secret configurado"
    $secretsConfigured += $secret
  } else {
    Write-Host "❌ Falha ao definir $secret"
  }
}

Write-Host ""
Write-Host "Secrets configurados: $($secretsConfigured.Count)"
```

---

### Passo 7: Gerar o Relatório de Setup

**Ação:** Criar um relatório de setup abrangente

```powershell
echo "=== Generating DevOps Setup Report ==="

$report = @"
# Relatório de Setup de DevOps do AIOX
# Gerado em: $(Get-Date -Format "yyyy-MM-ddTHH:mm:ss")

setup:
  completed: true
  date: "$(Get-Date -Format "yyyy-MM-ddTHH:mm:ss")"
  project_type: $projectType
  story_id: "5.10"

repository:
  url: $remoteUrl
  owner: $repoOwner
  name: $repoName

workflows_installed:
  - ci.yml
  - pr-automation.yml
  - release.yml

coderabbit:
  configured: true
  profile: $reviewProfile
  config_file: ".coderabbit.yaml"
  github_app_url: "https://github.com/apps/coderabbitai"

branch_protection:
  enabled: $branchProtectionEnabled
  branch: "main"
  required_checks:
    - lint
    - typecheck
    - test
  required_reviewers: $requiredReviewers

secrets_configured:
$(($secretsConfigured | ForEach-Object { "  - $_" }) -join "`n")

next_steps:
  - "Instale o GitHub App do CodeRabbit: https://github.com/apps/coderabbitai"
  - "Crie o primeiro PR para testar o CI/CD"
  - "Configure secrets adicionais conforme necessário"
  - "Revise as configurações de proteção de branch: Settings → Branches"

validation_checklist:
  - "[x] Workflows do GitHub Actions instalados"
  - "[$(if($coderabbitConfigured){'x'}else{' '})] CodeRabbit configurado"
  - "[$(if($branchProtectionEnabled){'x'}else{' '})] Proteção de branch habilitada"
  - "[$(if($secretsConfigured.Count -gt 0){'x'}else{' '})] Secrets de repositório configurados"
"@

# Ensure .aiox directory exists
New-Item -ItemType Directory -Path ".aiox" -Force | Out-Null

$report | Out-File -FilePath ".aiox/devops-setup-report.yaml" -Encoding utf8

Write-Host "✅ Relatório de setup salvo em .aiox/devops-setup-report.yaml"
```

---

### Passo 8: Resumo Final

**Ação:** Exibir o resumo de conclusão e os próximos passos

```
╔═══════════════════════════════════════════════════════════════════════════╗
║              ✅ SETUP DE GITHUB DEVOPS CONCLUÍDO                          ║
╠═══════════════════════════════════════════════════════════════════════════╣
║                                                                            ║
║  Repositório: https://github.com/username/my-project                       ║
║  Tipo de Projeto: node (Node.js/TypeScript)                                ║
║                                                                            ║
╠═══════════════════════════════════════════════════════════════════════════╣
║  Resumo da Configuração                                                    ║
╠═══════════════════════════════════════════════════════════════════════════╣
║                                                                            ║
║  GitHub Actions:                                                           ║
║    ✅ ci.yml - Lint, TypeCheck, Test                                      ║
║    ✅ pr-automation.yml - Resumo de qualidade, cobertura                   ║
║    ✅ release.yml - Automação de release                                   ║
║                                                                            ║
║  CodeRabbit:                                                               ║
║    ✅ .coderabbit.yaml criado (perfil: balanced)                          ║
║    ⚠️  Instale o GitHub App: https://github.com/apps/coderabbitai          ║
║                                                                            ║
║  Proteção de Branch (main):                                                ║
║    ✅ Status checks obrigatórios: lint, typecheck, test                    ║
║    ✅ Exigir 1 revisão de PR                                              ║
║    ✅ Impedir force pushes                                                ║
║                                                                            ║
║  Secrets Configurados:                                                     ║
║    ✅ CODECOV_TOKEN                                                        ║
║    ⏭️  Outros pulados (configure depois via Settings → Secrets)            ║
║                                                                            ║
╠═══════════════════════════════════════════════════════════════════════════╣
║  PRÓXIMOS PASSOS                                                           ║
╠═══════════════════════════════════════════════════════════════════════════╣
║                                                                            ║
║  1. Instale o GitHub App do CodeRabbit (necessário p/ revisão de código): ║
║     https://github.com/apps/coderabbitai                                   ║
║                                                                            ║
║  2. Crie seu primeiro PR para testar o pipeline de CI/CD:                  ║
║     git checkout -b feature/test-ci                                        ║
║     git commit --allow-empty -m "chore: test CI pipeline"                  ║
║     git push -u origin feature/test-ci                                     ║
║     gh pr create --title "Test CI Pipeline" --body "Testing CI setup"      ║
║                                                                            ║
║  3. Faça commit da configuração de DevOps:                                 ║
║     git add .github/ .coderabbit.yaml .aiox/                              ║
║     git commit -m "chore: add DevOps configuration [Story 5.10]"          ║
║     git push                                                               ║
║                                                                            ║
║  Relatório salvo: .aiox/devops-setup-report.yaml                          ║
║                                                                            ║
╚═══════════════════════════════════════════════════════════════════════════╝

— Gage, DevOps configurado com confiança 🚀
```

---

## Checklist de Validação

- [ ] Pré-condições verificadas (git, remote, gh auth)
- [ ] Tipo de projeto detectado
- [ ] Workflows do GitHub Actions instalados
- [ ] Configuração do CodeRabbit criada
- [ ] Proteção de branch configurada (se suportada)
- [ ] Secrets configurados (se selecionados)
- [ ] Relatório de setup gerado
- [ ] Próximos passos apresentados ao usuário

---

## Solução de Problemas

### Problema 1: A API de proteção de branch retorna 403

**Erro:** `Resource not accessible by personal access token`

**Correção:**
1. Para repos privados no tier gratuito, a proteção de branch requer GitHub Pro
2. Reautentique com os escopos corretos: `gh auth login --scopes repo,admin:repo_hook`
3. Setup manual via UI do GitHub: Settings → Branches

### Problema 2: A validação do workflow falha

**Erro:** `Invalid workflow file`

**Correção:**
1. Valide a sintaxe YAML: `yamllint .github/workflows/ci.yml`
2. Verifique a presença de caracteres de tabulação (use apenas espaços)
3. Verifique se as versões das actions são válidas

### Problema 3: O CodeRabbit não está revisando os PRs

**Correção:**
1. Verifique se o GitHub App está instalado: https://github.com/apps/coderabbitai
2. Verifique se o app tem acesso ao repositório
3. Verifique se o .coderabbit.yaml está no branch padrão

---

## Referências

- [Documentação do GitHub Actions](https://docs.github.com/en/actions)
- [API de Proteção de Branch do GitHub](https://docs.github.com/en/rest/branches/branch-protection)
- [Documentação do CodeRabbit](https://docs.coderabbit.ai/)
- [Story 5.10 - GitHub DevOps Setup](docs/stories/v4.0.4/sprint-5/story-5.10-github-devops-user-projects.md)

---

**Status:** ✅ Pronto para Produção
**Testado Em:** Windows 11, macOS Sonoma, Ubuntu 22.04
