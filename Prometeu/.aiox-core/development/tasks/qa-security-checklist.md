---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Task de Checklist de Segurança

Varredura automatizada de vulnerabilidades de segurança para anti-padrões comuns de segurança.

**Absorvido de:** Auto-Claude PR Review Phase 6.1

---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)

- Varredura autônoma com registro em log
- Interação mínima com o usuário
- **Melhor para:** Integração CI/CD, hooks de pre-commit

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**

- Explica cada vulnerabilidade encontrada
- Contexto educativo sobre riscos
- **Melhor para:** Aprendizado, treinamento de segurança

### 3. Planejamento Pre-Flight - Planejamento Antecipado Abrangente

- Auditoria de segurança completa do codebase
- Execução sem ambiguidade
- **Melhor para:** Revisões de segurança, auditorias

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: qaSecurityChecklist()
responsavel: Quinn (Guardian)
responsavel_type: Agente
atomic_layer: Molecule

**Entrada:**
- campo: story_id
  tipo: string
  origem: User Input
  obrigatorio: true
  validacao: Must be valid story ID format (e.g., "6.3")

- campo: file_paths
  tipo: array
  origem: git diff or explicit list
  obrigatorio: false
  validacao: If empty, extracts from uncommitted changes

- campo: severity_threshold
  tipo: string
  origem: config
  obrigatorio: false
  validacao: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" (default: "HIGH")

**Saida:**
- campo: security_report
  tipo: object
  destino: Return value
  persistido: false

- campo: vulnerabilities_found
  tipo: number
  destino: Memory
  persistido: false

- campo: report_file
  tipo: file
  destino: docs/stories/{story-id}/qa/security_issues.json
  persistido: true
```

---

## Pré-Condições

**Propósito:** Validar os pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Files to scan exist
    tipo: pre-condition
    blocker: true
    validacao: |
      git diff --name-only returns files OR --files provided
    error_message: "Pré-condição falhou: nenhum arquivo para varrer."

  - [ ] Grep tool available
    tipo: pre-condition
    blocker: true
    validacao: |
      Native Grep tool accessible
    error_message: "Pré-condição falhou: ferramenta Grep não disponível."
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a conclusão da task

**Checklist:**

```yaml
post-conditions:
  - [ ] Security report generated
    tipo: post-condition
    blocker: true
    validacao: |
      security_issues.json exists with results
    error_message: "Pós-condição falhou: relatório de segurança não gerado."

  - [ ] All patterns checked
    tipo: post-condition
    blocker: true
    validacao: |
      All 8 security patterns scanned
    error_message: "Pós-condição falhou: nem todos os padrões foram verificados."
```

---

## Padrões de Segurança (8 Verificações)

### Verificação 1: eval() e Execução Dinâmica de Código

**Severidade:** CRITICAL
**Linguagens:** JavaScript, TypeScript, Python

```yaml
patterns:
  javascript:
    - "eval\\("
    - "new Function\\("
    - "setTimeout\\(['\"`][^'\"]+['\"`]"
    - "setInterval\\(['\"`][^'\"]+['\"`]"
  python:
    - "eval\\("
    - "exec\\("
    - "compile\\("

risk: Remote Code Execution (RCE)
fix: Use JSON.parse() for data, avoid dynamic code entirely
```

### Verificação 2: innerHTML e DOM XSS

**Severidade:** CRITICAL
**Linguagens:** JavaScript, TypeScript

```yaml
patterns:
  - "\\.innerHTML\\s*="
  - "\\.outerHTML\\s*="
  - "document\\.write\\("
  - "document\\.writeln\\("

risk: Cross-Site Scripting (XSS)
fix: Use textContent, createElement, or sanitization libraries
```

### Verificação 3: dangerouslySetInnerHTML (React)

**Severidade:** CRITICAL
**Linguagens:** JavaScript, TypeScript (React/JSX)

```yaml
patterns:
  - 'dangerouslySetInnerHTML'

risk: Cross-Site Scripting (XSS) in React
fix: Use DOMPurify or avoid entirely
exception: Only if sanitized with DOMPurify.sanitize()
```

### Verificação 4: shell=True (Python)

**Severidade:** CRITICAL
**Linguagens:** Python

```yaml
patterns:
  - "subprocess\\..*shell\\s*=\\s*True"
  - "os\\.system\\("
  - "os\\.popen\\("

risk: Command Injection
fix: Use subprocess with shell=False and list arguments
```

### Verificação 5: Segredos Hardcoded

**Severidade:** CRITICAL
**Linguagens:** Todas

```yaml
patterns:
  # API Keys
  - "api[_-]?key\\s*[=:]\\s*['\"][^'\"]{10,}['\"]"
  - "apikey\\s*[=:]\\s*['\"][^'\"]{10,}['\"]"

  # Passwords
  - "password\\s*[=:]\\s*['\"][^'\"]+['\"]"
  - "passwd\\s*[=:]\\s*['\"][^'\"]+['\"]"
  - "pwd\\s*[=:]\\s*['\"][^'\"]+['\"]"

  # Tokens
  - "token\\s*[=:]\\s*['\"][^'\"]{10,}['\"]"
  - "secret\\s*[=:]\\s*['\"][^'\"]{10,}['\"]"
  - "bearer\\s+[a-zA-Z0-9_-]{20,}"

  # AWS
  - 'AKIA[0-9A-Z]{16}'
  - 'aws[_-]?secret[_-]?access[_-]?key'

  # Private Keys
  - '-----BEGIN (RSA |DSA |EC |OPENSSH )?PRIVATE KEY-----'

risk: Credential Exposure
fix: Use environment variables, secrets manager, or .env files
```

### Verificação 6: Padrões de SQL Injection

**Severidade:** CRITICAL
**Linguagens:** JavaScript, TypeScript, Python

```yaml
patterns:
  javascript:
    - "query\\s*\\(\\s*['\"`].*\\$\\{" # Template literal in query
    - "query\\s*\\(.*\\+.*\\)" # String concatenation in query
    - "execute\\s*\\(\\s*['\"`].*\\$\\{"
  python:
    - "execute\\s*\\(\\s*['\"].*%s" # % formatting in SQL
    - "execute\\s*\\(.*\\.format\\(" # .format() in SQL
    - "execute\\s*\\(.*f['\"]" # f-string in SQL

risk: SQL Injection
fix: Use parameterized queries, ORM, or prepared statements
```

### Verificação 7: Validação de Entrada Ausente

**Severidade:** HIGH
**Linguagens:** JavaScript, TypeScript

```yaml
patterns:
  # Express routes without validation
  - "req\\.body\\.[a-zA-Z]+[^?]" # Direct access without optional chaining
  - "req\\.query\\.[a-zA-Z]+[^?]"
  - "req\\.params\\.[a-zA-Z]+[^?]"

risk: Input validation bypass, type confusion
fix: Use Zod, Joi, or express-validator
exception: If validation middleware is present
```

### Verificação 8: Configuração Insegura de CORS

**Severidade:** HIGH
**Linguagens:** JavaScript, TypeScript

```yaml
patterns:
  - "origin:\\s*['\"]\\*['\"]" # Allow all origins
  - "Access-Control-Allow-Origin.*\\*"
  - "cors\\(\\)" # Default CORS without config

risk: Cross-Origin attacks, data theft
fix: Specify allowed origins explicitly
```

---

## Comando

```
*security-check {story-id} [--files file1,file2] [--threshold CRITICAL|HIGH|MEDIUM|LOW]
```

**Parâmetros:**

- `story-id` (obrigatório): Identificador da story (ex.: "6.3")
- `--files` (opcional): Caminhos de arquivo separados por vírgula (padrão: git diff)
- `--threshold` (opcional): Severidade mínima a reportar (padrão: HIGH)

**Exemplos:**

```bash
*security-check 6.3
*security-check 6.3 --threshold CRITICAL
*security-check 6.3 --files src/api/auth.ts,src/utils/db.ts
```

---

## Workflow

### Fase 1: Coletar Arquivos

1. Obter os arquivos modificados:

   ```bash
   git diff --name-only HEAD~1
   ```

2. Filtrar por extensão:

   ```
   .js, .ts, .jsx, .tsx, .py, .mjs, .cjs
   ```

3. Excluir arquivos de teste (opcional):
   ```
   *.test.*, *.spec.*, __tests__/*
   ```

### Fase 2: Rodar Varreduras de Segurança

Para cada verificação de segurança:

1. Construir o padrão grep para a verificação
2. Varrer todos os arquivos relevantes
3. Para cada correspondência:
   - Extrair o número da linha
   - Extrair o contexto de código (3 linhas antes/depois)
   - Classificar a severidade
   - Gerar a sugestão de correção

### Fase 3: Análise de Contexto

Para cada problema potencial:

1. Verificar falsos positivos:
   - Está em um comentário?
   - Está em um arquivo de teste?
   - Há sanitização por perto?
   - É uma correspondência falsa de padrão?

2. Validar a severidade:
   - Há entrada do usuário envolvida?
   - Está em um contexto sensível?
   - Há controle compensatório?

### Fase 4: Gerar Relatório

```json
{
  "timestamp": "2026-01-29T10:00:00Z",
  "story_id": "6.3",
  "summary": {
    "critical": 2,
    "high": 1,
    "medium": 0,
    "low": 0,
    "total": 3
  },
  "issues": [...],
  "scan_coverage": {
    "files_scanned": 15,
    "patterns_checked": 8,
    "lines_analyzed": 2500
  }
}
```

---

## Formato de Issue

```json
{
  "id": "SEC-001",
  "check": "EVAL_USAGE",
  "severity": "CRITICAL",
  "file": "src/utils/parser.ts",
  "line": 45,
  "column": 12,
  "code": "const result = eval(userInput);",
  "context": {
    "before": ["function parseExpression(userInput) {", "  // Parse user expression"],
    "after": ["  return result;", "}"]
  },
  "risk": "Remote Code Execution (RCE) - User input is directly evaluated",
  "fix": {
    "description": "Use a safe expression parser library",
    "suggestion": "const result = safeEval(userInput, { timeout: 1000 });",
    "references": ["https://owasp.org/www-community/attacks/Code_Injection"]
  },
  "false_positive_check": {
    "in_comment": false,
    "in_test": false,
    "has_sanitization": false
  }
}
```

---

## Mapeamento de Severidade

| Verificação             | Severidade Padrão | Bloqueante  |
| ------------------------ | ---------------- | ----------- |
| eval() / exec()          | CRITICAL         | Sim         |
| innerHTML / XSS          | CRITICAL         | Sim         |
| dangerouslySetInnerHTML  | CRITICAL         | Sim         |
| shell=True               | CRITICAL         | Sim         |
| Segredos Hardcoded       | CRITICAL         | Sim         |
| SQL Injection            | CRITICAL         | Sim         |
| Validação de Entrada Ausente | HIGH         | Recomendado |
| CORS Inseguro            | HIGH             | Recomendado |

---

## Integração com a Revisão de QA

Esta task se integra ao pipeline de revisão de QA:

```
*review-build {story}
├── Phase 1-5: Standard checks
├── Phase 6.0: Library Validation
├── Phase 6.1: Security Checklist ← THIS TASK
├── Phase 6.2: Migration Validation
└── Phase 7-10: Continue review
```

**Gatilho:** Chamada automaticamente durante `*review-build`
**Manual:** Pode ser executada de forma autônoma via `*security-check`

---

## Tratamento de Falsos Positivos

### Falsos Positivos Conhecidos

1. **Arquivos de teste usando padrões perigosos intencionalmente**
   - Resolução: Excluir arquivos de teste ou marcar como aceito

2. **Comentários descrevendo vulnerabilidades**
   - Resolução: Verificar se a correspondência está em contexto de comentário

3. **Documentação/exemplos**
   - Resolução: Excluir arquivos .md e diretórios de exemplo

4. **dangerouslySetInnerHTML sanitizado**
   - Resolução: Verificar se há DOMPurify.sanitize() por perto

### Supressão

Adicione um comentário para suprimir linhas específicas:

```javascript
// security-ignore: SEC-001 - sanitized via DOMPurify
const html = DOMPurify.sanitize(userContent);
element.innerHTML = html; // This line won't be flagged
```

---

## Exemplo de Saída

```json
{
  "timestamp": "2026-01-29T10:30:00Z",
  "story_id": "6.3",
  "summary": {
    "critical": 2,
    "high": 1,
    "medium": 0,
    "low": 0,
    "total": 3,
    "blocking": true
  },
  "issues": [
    {
      "id": "SEC-001",
      "check": "HARDCODED_SECRET",
      "severity": "CRITICAL",
      "file": "src/config/api.ts",
      "line": 12,
      "code": "const API_KEY = 'sk-live-abc123xyz789';",
      "risk": "API key exposed in source code",
      "fix": {
        "description": "Use environment variable",
        "suggestion": "const API_KEY = process.env.API_KEY;"
      }
    },
    {
      "id": "SEC-002",
      "check": "SQL_INJECTION",
      "severity": "CRITICAL",
      "file": "src/api/users.ts",
      "line": 28,
      "code": "db.query(`SELECT * FROM users WHERE id = ${userId}`)",
      "risk": "SQL injection via template literal",
      "fix": {
        "description": "Use parameterized query",
        "suggestion": "db.query('SELECT * FROM users WHERE id = $1', [userId])"
      }
    },
    {
      "id": "SEC-003",
      "check": "MISSING_VALIDATION",
      "severity": "HIGH",
      "file": "src/api/auth.ts",
      "line": 15,
      "code": "const email = req.body.email;",
      "risk": "Direct access without validation",
      "fix": {
        "description": "Add input validation",
        "suggestion": "const { email } = validateLoginInput(req.body);"
      }
    }
  ],
  "scan_coverage": {
    "files_scanned": 8,
    "patterns_checked": 8,
    "lines_analyzed": 1200
  },
  "recommendation": "BLOCK - 2 CRITICAL issues must be fixed before merge"
}
```

---

## Critérios de Saída (Exit Criteria)

Esta task está completa quando:

- Todos os 8 padrões de segurança foram varridos
- Todos os arquivos modificados foram analisados
- Falsos positivos foram filtrados
- Relatório gerado com classificação de severidade
- Recomendação de bloqueio fornecida
- Issues integradas à revisão de QA

---

_Absorvido do Auto-Claude PR Review System - Phase 6.1_
_AIOX QA Enhancement v1.0_
