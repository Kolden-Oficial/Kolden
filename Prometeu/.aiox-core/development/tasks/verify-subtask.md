---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Verify Subtask

> **Fase:** Execução - Verificação
> **Agente Responsável:** @dev
> **Pipeline:** execution-pipeline

---

## Propósito

Verificar se uma subtask foi concluída com sucesso executando o tipo de verificação configurado (command, api, browser, e2e). Usa o script subtask-verifier.js para a execução.

---

## autoClaude

```yaml
autoClaude:
  version: '3.0'
  pipelinePhase: execution-verify

  deterministic: true
  elicit: false
  composable: true

  inputs:
    - name: subtaskId
      type: string
      required: true
      description: "ID da subtask em implementation.yaml (ex.: '1.1', '2.3')"

    - name: storyId
      type: string
      required: true
      description: 'ID da story para localizar o implementation.yaml'

    - name: implementationPath
      type: file
      path: docs/stories/{storyId}/plan/implementation.yaml
      required: true

  outputs:
    - name: verificationResult
      type: object
      schema:
        subtaskId: string
        passed: boolean
        verificationType: string
        duration: number
        logs: array
        attempts: number
        error: object|null

  verification:
    type: script
    script: .aiox-core/infrastructure/scripts/subtask-verifier.js
    timeout: 120
```

---

## Integração de Comando (@dev)

```yaml
command:
  name: '*verify-subtask'
  syntax: '*verify-subtask {subtask-id}'
  agent: dev

  examples:
    - '*verify-subtask 1.1'
    - '*verify-subtask 2.3'

  aliases:
    - '*verify'
```

---

## Execução

### Passo 1: Localizar o Plano de Implementação

```yaml
step_1:
  actions:
    - action: find_implementation
      paths:
        - docs/stories/{storyId}/plan/implementation.yaml
        - .aiox/plans/{storyId}/implementation.yaml

  validation:
    check: 'implementation.yaml encontrado'
    onFailure: halt
```

### Passo 2: Executar o Script de Verificação

```yaml
step_2:
  actions:
    - action: execute_script
      script: |
        node .aiox-core/infrastructure/scripts/subtask-verifier.js {subtaskId} \
          --implementation {implementationPath} \
          --verbose \
          --update

  timeout: 120000

  output:
    verificationResult: object
```

### Passo 3: Reportar os Resultados

```yaml
step_3:
  actions:
    - action: display_report
      format: |
        ## Verification Result: {subtaskId}

        **Status:** {passed ? '✅ PASS' : '❌ FAIL'}
        **Type:** {verificationType}
        **Duration:** {duration}ms
        **Attempts:** {attempts}

        {error ? '### Error\n' + error.message : ''}

        ### Logs
        {logs.slice(-5).join('\n')}
```

---

## Tipos de Verificação Suportados

| Tipo      | Descrição                           | Campos de Config                                |
| --------- | ----------------------------------- | ----------------------------------------------- |
| `command` | Roda comando shell, verifica o exit code | `command`, `timeout`                       |
| `api`     | Requisição HTTP, verifica status/resposta | `url`, `expectedStatus`, `method`, `body`  |
| `browser` | Verificação de UI com Playwright    | `url`, `selector`, `expectedText`, `screenshot` |
| `e2e`     | Suíte de testes end-to-end          | `testCommand`, `timeout`                        |

---

## Exemplos

### Verificação por Comando

```yaml
# Em implementation.yaml
subtasks:
  - id: '1.1'
    description: 'Create store module'
    verification:
      type: command
      command: 'npm run typecheck'
      timeout: 60
```

### Verificação por API

```yaml
subtasks:
  - id: '2.1'
    description: 'Implement login endpoint'
    verification:
      type: api
      url: 'http://localhost:3000/api/auth/login'
      method: POST
      body:
        email: 'test@example.com'
        password: 'test123'
      expectedStatus: 200
```

### Verificação por Browser

```yaml
subtasks:
  - id: '3.1'
    description: 'Add login form'
    verification:
      type: browser
      url: 'http://localhost:3000/login'
      selector: "form[data-testid='login-form']"
      expectedText: 'Sign In'
```

---

## Tratamento de Erros

```yaml
errors:
  - id: implementation-not-found
    condition: 'implementation.yaml não encontrado'
    action: halt
    message: 'Não é possível verificar - implementation.yaml não encontrado para {storyId}'

  - id: subtask-not-found
    condition: 'ID da subtask não está no plano'
    action: halt
    message: 'Subtask {subtaskId} não encontrada em implementation.yaml'

  - id: verification-failed
    condition: 'Verificação falhou após as retentativas'
    action: report
    message: 'Verificação falhou para {subtaskId}: {error}'

  - id: timeout
    condition: 'Verificação excedeu o tempo limite'
    action: report
    message: 'Verificação excedeu o tempo limite após {timeout}ms'
```

---

## Metadata

```yaml
metadata:
  story: '4.5'
  epic: 'Epic 4 - Execution Pipeline'
  created: '2026-01-28'
  author: '@architect (Aria)'
  version: '1.0.0'
  tags:
    - execution-pipeline
    - verification
    - subtask
    - development
```
