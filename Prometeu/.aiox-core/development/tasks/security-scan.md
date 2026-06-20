# security-scan

**Task ID:** `security-scan`  
**Version:** 2.0.0  
**Status:** Active

---

## Propósito

Executa análise estática de segurança (SAST) no código do projeto/story. Automação total, zero intervenção manual, CLI-first.

**Estratégia:** Automação total, zero intervenção manual, CLI-first.

---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com registro em log
- Interação mínima com o usuário
- **Melhor para:** Desenvolvedores experientes, tarefas simples, trabalho sensível ao tempo

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas, trabalho colaborativo

### 3. Planejamento Pre-Flight - Planejamento Antecipado Abrangente
- Fase de análise da task (identificar todas as ambiguidades)
- Questionário antes da execução
- Execução sem ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico, necessidade de consenso da equipe

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

**Valores válidos:** `yolo`, `interactive`, `preflight`

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: securityScan()
responsável: Quinn (Guardian)
responsavel_type: Agente
atomic_layer: Strategy

**Entrada:**
- campo: target
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Valid path or resource

- campo: scan_depth
  tipo: number
  origem: config
  obrigatório: false
  padrão: 2
  validação: Default: 2 (1-5)

- campo: rules
  tipo: array
  origem: config
  obrigatório: true
  validação: Security rule set

**Saída:**
- campo: scan_report
  tipo: object
  destino: File (.ai/security/*)
  persistido: true

- campo: vulnerabilities
  tipo: array
  destino: Memory
  persistido: false

- campo: risk_score
  tipo: number
  destino: Memory
  persistido: false
```

---

## Pré-condições

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Scanner available; target accessible; rules configured
    tipo: pre-condition
    blocker: true
    validação: |
      Check scanner available; target accessible; rules configured
    error_message: "Pre-condition failed: Scanner available; target accessible; rules configured"
```

---

## Execução Passo a Passo

### Step 1: Setup Security Tools

**Propósito:** Garantir que todas as ferramentas de varredura de segurança necessárias estejam instaladas e configuradas

**Ações:**
1. Verificar a disponibilidade do npm audit
2. Instalar plugins de segurança do ESLint se ausentes
3. Configurar as regras de segurança do ESLint
4. Verificar a disponibilidade do secretlint (opcional)

**Validação:**
- Comando npm audit disponível
- Plugins de segurança do ESLint instalados
- Arquivos de configuração criados

---

### Step 2: Dependency Vulnerability Scan

**Propósito:** Varrer as dependências npm em busca de vulnerabilidades conhecidas

**Ações:**
1. Executar `npm audit --audit-level=moderate --json`
2. Fazer o parse dos resultados do audit
3. Categorizar as vulnerabilidades por severidade
4. Determinar o impacto no gate

**Validação:**
- Relatório de audit gerado
- Vulnerabilidades categorizadas corretamente
- Impacto no gate calculado

---

### Step 3: Code Security Pattern Scan

**Propósito:** Analisar o código em busca de padrões inseguros usando os plugins de segurança do ESLint

**Ações:**
1. Rodar o ESLint com plugins de segurança
2. Fazer o parse dos resultados do ESLint
3. Identificar problemas de segurança por severidade
4. Determinar o impacto no gate

**Validação:**
- Varredura do ESLint concluída
- Problemas de segurança identificados
- Impacto no gate calculado

---

### Step 4: Secret Detection

**Propósito:** Detectar secrets expostos, API keys e senhas no codebase

**Ações:**
1. Rodar a varredura do secretlint
2. Fazer o parse dos resultados da detecção de secrets
3. Categorizar os achados
4. Determinar o impacto no gate

**Validação:**
- Varredura de secrets concluída
- Secrets identificados (se houver)
- Impacto no gate calculado

---

### Step 5: Generate Security Report

**Propósito:** Criar um relatório abrangente de varredura de segurança

**Ações:**
1. Agregar todos os resultados da varredura
2. Calcular a pontuação de risco geral
3. Gerar o relatório em markdown
4. Salvar o relatório no diretório `.ai/security/`

**Validação:**
- Arquivo de relatório criado
- Todas as seções incluídas
- Decisão do gate documentada

---

## Pós-condições

**Propósito:** Validar o sucesso da execução APÓS a task ser concluída

**Checklist:**

```yaml
post-conditions:
  - [ ] Scan completed; vulnerabilities reported; no scan errors
    tipo: post-condition
    blocker: true
    validação: |
      Verify scan completed; vulnerabilities reported; no scan errors
    rollback: false
    error_message: "Post-condition failed: Scan completed; vulnerabilities reported; no scan errors"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de pass/fail para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] No critical vulnerabilities; all checks passed
    tipo: acceptance-criterion
    blocker: false
    story: N/A
    manual_check: false
    validação: |
      Assert no critical vulnerabilities; all checks passed
    error_message: "Acceptance criterion not met: No critical vulnerabilities; all checks passed"
```

---

## Ferramentas (Externas/Compartilhadas)

**Propósito:** Catalogar ferramentas reutilizáveis usadas por múltiplos agentes

```yaml
**Tools:**
- github-cli:
    version: latest
    used_for: Create security issues if necessary
    shared_with: [qa, dev]
    cost: $0

- npm-audit:
    version: built-in
    used_for: Dependency vulnerability scanning
    shared_with: [qa, dev]
    cost: $0

- eslint-plugin-security:
    version: ^1.7.1
    used_for: Code security pattern detection
    shared_with: [qa, dev]
    cost: $0

- secretlint:
    version: latest
    used_for: Secret detection in codebase
    shared_with: [qa, dev]
    cost: $0
```

---

## Scripts (Específicos do Agente)

**Propósito:** Código específico do agente para esta task

```yaml
**Scripts:**
- security-scan.js:
    description: Run security scans and generate reports
    language: JavaScript
    location: .aiox-core/scripts/security-scan.js
```

---

## Tratamento de Erros

**Estratégia:** fallback

**Erros Comuns:**

1. **Erro:** Scanner Indisponível
   - **Causa:** Scanner de segurança não instalado ou com falha
   - **Resolução:** Instalar o scanner ou verificar a configuração
   - **Recuperação:** Pular a varredura com aviso de alto risco

2. **Erro:** Vulnerabilidade Crítica Detectada
   - **Causa:** Problema de segurança de alta severidade encontrado
   - **Resolução:** Revisar o relatório de vulnerabilidade, aplicar patches
   - **Recuperação:** Bloquear o deployment, alertar a equipe

3. **Erro:** Timeout da Varredura
   - **Causa:** Codebase grande excede o limite de tempo da varredura
   - **Resolução:** Reduzir o escopo ou aumentar o timeout
   - **Recuperação:** Resultados parciais da varredura com aviso

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 5-20 min
cost_estimated: $0.003-0.015
token_usage: ~2,000-8,000 tokens
```

**Notas de Otimização:**
- Análise iterativa com limites de profundidade
- Cachear resultados intermediários
- Agrupar operações similares em lote

---

## Metadados

```yaml
story: STORY-6.1.7.2
version: 2.0.0
dependencies:
  - N/A
tags:
  - security
  - audit
updated_at: 2025-01-17
```

---

## Entradas

```yaml
required:
  - story_id: '{epic}.{story}' # e.g., "3.14"
  - story_path: 'Path to story file'
  - project_root: 'Project root directory (default: cwd)'
```

## Pré-requisitos

- Node.js e npm instalados
- Projeto com package.json

## Ferramentas (Instaladas Automaticamente)

1. **npm audit** (built-in) - Vulnerabilidades em dependências
2. **ESLint + security plugins** (via npm) - Padrões inseguros de código
3. **Semgrep** (via npx) - Análise estática avançada (opcional)
4. **secretlint** (via npx) - Detecção de secrets vazados

## Dependências de Configuração

Esta task requer as seguintes chaves de configuração de `core-config.yaml`:

- **`devStoryLocation`**: Localização dos arquivos de story (tipicamente docs/stories)
- **`architectureShardedLocation`**: Localização dos documentos de arquitetura fragmentados (sharded) (tipicamente docs/architecture)
- **`utils.registry`**: Localização do registry de utilitários para utilitários do framework

**Carregando a Config:**
```javascript
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '../../.aiox-core/core-config.yaml');
const config = yaml.load(fs.readFileSync(configPath, 'utf8'));

const dev_story_location = config.devStoryLocation;
const architectureShardedLocation = config.architectureShardedLocation || 'docs/architecture';
const utils_registry = config.utils?.registry || config['utils.registry'] || '.aiox-core/utils';
```

## Processo de Scan

### Fase 1: Setup Automático

```javascript
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Garantir que ferramentas de segurança estão instaladas
function ensureSecurityTools(projectRoot) {
  const packageJsonPath = path.join(projectRoot, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  const requiredDevDeps = {
    'eslint': '^8.0.0',
    'eslint-plugin-security': '^1.7.1',
    'eslint-plugin-no-secrets': '^0.8.9'
  };

  let needsInstall = false;
  const devDeps = packageJson.devDependencies || {};

  for (const [pkg, version] of Object.entries(requiredDevDeps)) {
    if (!devDeps[pkg]) {
      console.log(`📦 Installing ${pkg}...`);
      needsInstall = true;
    }
  }

  if (needsInstall) {
    execSync('npm install --save-dev eslint eslint-plugin-security eslint-plugin-no-secrets', {
      cwd: projectRoot,
      stdio: 'inherit'
    });
  }

  // Copiar template de configuração ESLint se não existir
  const eslintConfigPath = path.join(projectRoot, '.eslintrc.security.json');
  if (!fs.existsSync(eslintConfigPath)) {
    const templatePath = path.join(__dirname, '../templates/eslintrc-security.json');
    if (fs.existsSync(templatePath)) {
      fs.copyFileSync(templatePath, eslintConfigPath);
      console.log('✓ Created .eslintrc.security.json');
    }
  }
}
```

### Fase 2: Dependency Vulnerability Scan

```bash
# Executar npm audit
npm audit --audit-level=moderate --json > audit-report.json
```

**Análise de Resultados**:
```javascript
function analyzeAuditResults(auditJson) {
  const results = JSON.parse(auditJson);
  const vulnerabilities = results.vulnerabilities || {};

  const summary = {
    critical: 0,
    high: 0,
    moderate: 0,
    low: 0,
    info: 0
  };

  for (const [pkg, vuln] of Object.entries(vulnerabilities)) {
    const severity = vuln.severity.toLowerCase();
    if (summary[severity] !== undefined) {
      summary[severity]++;
    }
  }

  return {
    summary,
    details: vulnerabilities,
    gateImpact: summary.critical > 0 ? 'FAIL' :
                summary.high > 0 ? 'CONCERNS' : 'PASS'
  };
}
```

### Fase 3: Code Security Pattern Scan

```bash
# Executar ESLint com plugins de segurança
npx eslint . --ext .js,.ts \
  --config .eslintrc.security.json \
  --format json \
  --output-file eslint-security.json
```

**Regras Verificadas**:
- `security/detect-object-injection` - Injeção de propriedades
- `security/detect-eval-with-expression` - Uso de eval()
- `security/detect-child-process` - Execução de comandos
- `security/detect-non-literal-require` - Requires dinâmicos
- `security/detect-unsafe-regex` - ReDoS (Regex Denial of Service)
- `security/detect-buffer-noassert` - Buffer inseguro
- `no-secrets/no-secrets` - API keys, tokens, passwords

**Análise de Resultados**:
```javascript
function analyzeESLintResults(eslintJson) {
  const results = JSON.parse(eslintJson);

  const issues = [];
  let errorCount = 0;
  let warningCount = 0;

  for (const file of results) {
    for (const message of file.messages) {
      if (message.ruleId && message.ruleId.startsWith('security/') ||
          message.ruleId === 'no-secrets/no-secrets') {

        issues.push({
          file: file.filePath,
          line: message.line,
          column: message.column,
          rule: message.ruleId,
          severity: message.severity === 2 ? 'error' : 'warning',
          message: message.message
        });

        if (message.severity === 2) errorCount++;
        else warningCount++;
      }
    }
  }

  return {
    issues,
    errorCount,
    warningCount,
    gateImpact: errorCount > 0 ? 'FAIL' :
                warningCount > 0 ? 'CONCERNS' : 'PASS'
  };
}
```

### Fase 4: Secret Detection

```bash
# Executar secretlint
npx secretlint "**/*" \
  --format json \
  --output-file secrets-report.json
```

**Análise de Resultados**:
```javascript
function analyzeSecretResults(secretsJson) {
  const results = JSON.parse(secretsJson);

  const secrets = results.messages || [];

  return {
    secretsFound: secrets.length,
    secrets: secrets.map(s => ({
      file: s.filePath,
      type: s.ruleId,
      message: s.message
    })),
    gateImpact: secrets.length > 0 ? 'FAIL' : 'PASS'
  };
}
```

### Fase 5 (Opcional): Advanced SAST com Semgrep

```bash
# Executar Semgrep (apenas se disponível)
npx semgrep --config auto --json --output semgrep-report.json || echo "Semgrep skipped"
```

**Nota**: Semgrep é opcional. Se não estiver disponível ou falhar, não bloqueia o scan.

## Saída: Relatório de Segurança

Cria arquivo em: `qa.qaLocation/security/{epic}.{story}-sast-{YYYYMMDD}.md`

```markdown
# Security Scan Report - Story {epic}.{story}

**Scan Date**: {ISO-8601 timestamp}
**Project**: {packageName} v{version}
**Files Scanned**: {fileCount}
**Overall Risk**: {CRITICAL|HIGH|MEDIUM|LOW}

---

## Executive Summary

| Category | Critical | High | Medium | Low | Status |
|----------|----------|------|--------|-----|--------|
| Dependencies | {count} | {count} | {count} | {count} | {PASS/FAIL} |
| Code Patterns | {count} | {count} | {count} | {count} | {PASS/FAIL} |
| Secrets | {count} | - | - | - | {PASS/FAIL} |

**Gate Impact**: {FAIL|CONCERNS|PASS}

---

## 1. Dependency Vulnerabilities (npm audit)

{if vulnerabilities found}
### Critical Vulnerabilities

| Package | Version | CVE | Severity | Fix Available |
|---------|---------|-----|----------|---------------|
| lodash | 4.17.15 | CVE-2020-8203 | CRITICAL | Yes (4.17.21) |

### Recommendations

- [ ] **IMMEDIATE**: Run `npm audit fix --force` to auto-fix
- [ ] Review breaking changes in upgraded packages
- [ ] Re-run tests after upgrade

{else}
✅ No dependency vulnerabilities found.
{endif}

---

## 2. Code Security Issues (ESLint + Plugins)

{if issues found}
### High Severity

| File | Line | Rule | Issue | Recommendation |
|------|------|------|-------|----------------|
| src/api.js | 42 | security/detect-eval-with-expression | Use of eval() | Refactor to JSON.parse() or safe alternatives |
| src/db.js | 128 | security/detect-object-injection | Object injection risk | Validate user input before property access |

### Medium Severity

| File | Line | Rule | Issue | Recommendation |
|------|------|------|-------|----------------|
| lib/utils.js | 67 | security/detect-non-literal-require | Dynamic require() | Use static imports or whitelist |

### Recommendations

- [ ] **IMMEDIATE**: Fix eval() usage in src/api.js
- [ ] **IMMEDIATE**: Add input validation in src/db.js
- [ ] **FUTURE**: Refactor dynamic requires to static imports

{else}
✅ No code security issues found.
{endif}

---

## 3. Secrets Detection (secretlint)

{if secrets found}
### ⚠️ SECRETS DETECTED - ACTION REQUIRED

| File | Secret Type | Action |
|------|-------------|--------|
| .env.example | API Key Pattern | Verify it's example only (not real key) |
| config/db.js | Password Pattern | Move to environment variables |

### Recommendations

- [ ] **CRITICAL**: Remove real secrets from codebase immediately
- [ ] Move all secrets to environment variables
- [ ] Add .env to .gitignore
- [ ] Rotate compromised credentials if committed

{else}
✅ No secrets detected in codebase.
{endif}

---

## 4. Advanced Analysis (Semgrep) [OPTIONAL]

{if semgrep ran}
### Findings

| Rule | Severity | Count | Description |
|------|----------|-------|-------------|
| sql-injection | ERROR | 2 | Potential SQL injection vectors |
| xss-risk | WARNING | 1 | Unescaped user input in HTML |

{else}
ℹ️ Semgrep not available - skipped advanced analysis.
{endif}

---

## Gate Decision

**Status**: {FAIL|CONCERNS|PASS}

**Reasoning**:
{if FAIL}
- ❌ {count} CRITICAL dependency vulnerabilities found
- ❌ {count} secrets detected in codebase
- ❌ {count} high-severity code security issues

**Action Required**: Address all CRITICAL and HIGH issues before merging.

{else if CONCERNS}
- ⚠️ {count} HIGH dependency vulnerabilities found
- ⚠️ {count} medium-severity code security issues

**Recommendation**: Address issues before production deployment.

{else}
- ✅ No critical or high-severity vulnerabilities found
- ✅ Codebase passes security standards

**Status**: Ready for production.
{endif}

---

## Next Steps

### Immediate Actions (Block Merge)
{immediate actions list}

### Short-term Actions (Before Production)
{short-term actions list}

### Long-term Actions (Technical Debt)
{long-term actions list}

---

**Scan Tool Versions**:
- npm: v{version}
- ESLint: v{version}
- eslint-plugin-security: v{version}
- secretlint: v{version}
- semgrep: v{version} (if used)

**Report Generated**: {timestamp}
**Report Generator**: @qa (Quinn - Test Architect)
```

## Integração com review-story.md

Quando `@qa *review {story}` é executado, **automaticamente** chama `security-scan`:

```markdown
# review-story.md (atualizar)

### 2. Comprehensive Analysis

**A. Requirements Traceability**
[existing content]

**B. Code Quality Review**
[existing content]

**C. Security Scan (SAST) - AUTOMATIC**

Execute security-scan.md task:
- Run npm audit
- Run ESLint security plugins
- Run secret detection
- Generate security report
- Update gate decision based on findings

Gate Impact Rules:
- Any CRITICAL vulnerability → Gate = FAIL
- Any secret detected → Gate = FAIL
- Any HIGH vulnerability → Gate = CONCERNS
- Only MEDIUM/LOW → Gate = PASS (with notes)
```

## Lógica de Decisão do Gate

```javascript
function determineOverallGate(auditGate, eslintGate, secretsGate) {
  // Secrets are auto-fail
  if (secretsGate === 'FAIL') return 'FAIL';

  // Any FAIL → overall FAIL
  if (auditGate === 'FAIL' || eslintGate === 'FAIL') return 'FAIL';

  // Any CONCERNS → overall CONCERNS
  if (auditGate === 'CONCERNS' || eslintGate === 'CONCERNS') return 'CONCERNS';

  // All PASS → overall PASS
  return 'PASS';
}
```

## Critérios de Sucesso

- ✅ A varredura é concluída sem erros
- ✅ Relatório gerado em qa.qaLocation/security/
- ✅ Decisão do gate baseada nos achados
- ✅ Zero intervenção manual necessária
- ✅ Funciona em pipeline de CI/CD
- ✅ Capaz de operar offline (exceto npm audit)

## Notas

- **Automação**: 100% automatizado, sem intervenção do usuário
- **Performance**: Tempo típico de varredura de 30 a 120 segundos
- **Offline**: Funciona offline (exceto npm audit, que requer registry)
- **Ferramentas Opcionais**: Semgrep é um aprimoramento opcional
- **Suporte a IDE**: As ferramentas funcionam com qualquer IDE via Language Server Protocol
- **Pronto para CI/CD**: Todas as ferramentas funcionam em ambientes GitHub Actions / CI
