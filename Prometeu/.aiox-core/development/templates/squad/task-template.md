---
task: {{COMPONENTNAME}}
responsavel: "@{{AGENTID}}"
responsavel_type: Agent
atomic_layer: Task
elicit: false

Entrada:
  - campo: input_param
    tipo: string
    origem: User Input
    obrigatorio: true
    validacao: "Descreva as regras de validação"

Saida:
  - campo: result
    tipo: object
    destino: Return value
    persistido: false

Checklist:
  - "[ ] Passo 1: Descreva o primeiro passo"
  - "[ ] Passo 2: Descreva o segundo passo"
  - "[ ] Passo 3: Descreva o terceiro passo"
---

# {{COMPONENTNAME}}

## Propósito

{{DESCRIPTION}}

{{#IF STORYID}}
## Referência da Story

- **Story:** {{STORYID}}
- **Squad:** {{SQUADNAME}}
{{/IF}}

## Pré-Condições

```yaml
pre-conditions:
  - [ ] Pré-condição 1
    tipo: pre-condition
    blocker: true
    validacao: |
      Descreva o que validar
    error_message: "Mensagem de erro se a pré-condição falhar"
```

{{#IF CODE_INTEL_AVAILABLE}}
## Verificação de Duplicata via Code Intelligence

> Verificação automática quando o provider de code intelligence está disponível.
> Este passo é apenas consultivo — nunca bloqueia a criação da task.
> Esta seção pode ser removida com segurança se não for necessária.

Antes de prosseguir, verifique se nenhuma task similar já existe:

```javascript
const { checkDuplicateArtefact } = require('.aiox-core/core/code-intel/helpers/creation-helper');
const result = await checkDuplicateArtefact('{{COMPONENTNAME}}', '{{DESCRIPTION}}');
if (result) {
  console.warn(result.warning);
  // Consultivo: "Similar task exists: {task-name}. Consider extending instead of creating."
}
```

- **Duplicatas Encontradas:** {{DUPLICATE_WARNING}}
{{/IF}}

## Passos de Execução

### Passo 1: Inicializar

```javascript
// Implementação aqui
const { Dependency } = require('./path/to/dependency');

async function step1() {
  // Lógica do passo 1
}
```

### Passo 2: Processar

```javascript
async function step2() {
  // Lógica do passo 2
}
```

### Passo 3: Concluir

```javascript
async function step3() {
  // Lógica do passo 3
  return {
    success: true,
    data: {},
  };
}
```

## Tratamento de Erros

### Erro 1: Descrição

```yaml
error: ERROR_CODE
cause: Descrição da causa
resolution: Como resolver
recovery: Ação de recuperação sugerida
```

## Pós-Condições

```yaml
post-conditions:
  - [ ] Resultado é válido
    tipo: post-condition
    blocker: true
    validacao: |
      Descreva a validação
    error_message: "Mensagem de erro se a pós-condição falhar"
```

## Metadados

```yaml
{{#IF STORYID}}
story: {{STORYID}}
{{/IF}}
version: 1.0.0
created: {{CREATEDAT}}
updated: {{CREATEDAT}}
author: squad-creator
tags:
  - {{SQUADNAME}}
  - {{COMPONENTNAME}}
```

---

*Definição de task criada por squad-creator*
