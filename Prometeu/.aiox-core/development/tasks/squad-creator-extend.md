---
task: extendSquad()
responsavel: "@squad-creator"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: squad_name
    tipo: string
    origem: User Input
    obrigatorio: true
    validacao: O squad deve existir no diretório ./squads/

  - campo: component_type
    tipo: string
    origem: User Input
    obrigatorio: true
    validacao: "agent | task | workflow | checklist | template | tool | script | data"

  - campo: component_name
    tipo: string
    origem: User Input
    obrigatorio: true
    validacao: "kebab-case, sem caracteres especiais"

  - campo: agent_id
    tipo: string
    origem: User Input
    obrigatorio: false
    validacao: "Obrigatório para tasks - deve existir em agents/ do squad"

  - campo: story_id
    tipo: string
    origem: User Input
    obrigatorio: false
    validacao: "Formato: SQS-XX (rastreabilidade opcional)"

Saida:
  - campo: created_file
    tipo: string
    destino: Diretório do squad
    persistido: true

  - campo: updated_manifest
    tipo: boolean
    destino: squad.yaml
    persistido: true

  - campo: validation_result
    tipo: object
    destino: Console
    persistido: false

Checklist:
  - "[ ] Validar que o squad existe"
  - "[ ] Coletar o tipo de componente"
  - "[ ] Coletar o nome do componente e os metadados"
  - "[ ] Criar arquivo a partir do template"
  - "[ ] Atualizar o manifesto squad.yaml"
  - "[ ] Rodar validação"
  - "[ ] Exibir resultado e próximos passos"
---

# Task Estender Squad

## Propósito

Adicionar novos componentes a um squad existente com atualizações automáticas do manifesto e validação. Esta task permite a melhoria incremental do squad sem manipulação manual de arquivos.

## Referência da Story

- **Story:** SQS-11 - Squad Analyze & Extend
- **Epic:** SQS - Squad System Enhancement

## Pré-condições

```yaml
pre-conditions:
  - [ ] O squad existe no diretório ./squads/
    tipo: pre-condition
    blocker: true
    validacao: |
      Verificar se o diretório do squad existe com um manifesto válido
    error_message: "Squad não encontrado. Use *list-squads para ver os squads disponíveis."

  - [ ] O nome do componente é um kebab-case válido
    tipo: pre-condition
    blocker: true
    validacao: |
      Deve corresponder a /^[a-z][a-z0-9-]*[a-z0-9]$/
    error_message: "Nome de componente inválido. Use kebab-case (ex.: my-component)"
```

## Fluxo de Elicitação (Modo Interativo)

```
@squad-creator

*extend-squad my-squad

? O que você gostaria de adicionar?
  1. Agent - Nova persona de agente
  2. Task - Nova task para um agente
  3. Workflow - Workflow multi-etapas
  4. Checklist - Checklist de validação
  5. Template - Template de documento
  6. Tool - Ferramenta customizada (JavaScript)
  7. Script - Script de automação
  8. Data - Arquivo de dados estático (YAML)

> 2

? Nome da task: process-data
? Qual agente é dono desta task?
  1. lead-agent
  2. helper-agent
> 1
? Descrição da task (opcional): Processar dados recebidos e gerar saída
? Vincular a uma story? (deixe em branco para pular): SQS-11

Criando task...
  Criado: tasks/lead-agent-process-data.md
  Atualizado: squad.yaml (adicionado a components.tasks)
  Validação: PASS

Próximos passos:
  1. Editar tasks/lead-agent-process-data.md
  2. Adicionar entrada/saida/checklist
  3. Rodar: *validate-squad my-squad
```

## Modo Direto (Flags)

```bash
# Adicionar agente diretamente
*extend-squad my-squad --add agent --name analytics-agent

# Adicionar task com vínculo a um agente
*extend-squad my-squad --add task --name process-data --agent lead-agent

# Adicionar workflow com referência a uma story
*extend-squad my-squad --add workflow --name daily-processing --story SQS-11

# Adicionar todos os tipos de componente
*extend-squad my-squad --add template --name report-template
*extend-squad my-squad --add tool --name data-validator
*extend-squad my-squad --add checklist --name quality-checklist
*extend-squad my-squad --add script --name migration-helper
*extend-squad my-squad --add data --name config-data
```

## Passos de Execução

### Passo 1: Validar que o Squad Existe

```javascript
const { SquadLoader } = require('../scripts/squad/squad-loader');
const loader = new SquadLoader();

const squadPath = path.join('./squads', squadName);
const exists = await loader.squadExists(squadName);

if (!exists) {
  throw new Error(`Squad "${squadName}" not found`);
}
```

### Passo 2: Coletar Informações do Componente

```javascript
// Modo interativo
if (!componentType) {
  componentType = await promptComponentType();
}

if (!componentName) {
  componentName = await promptComponentName(componentType);
}

// Validar o formato do nome
if (!isValidKebabCase(componentName)) {
  throw new Error('Component name must be kebab-case');
}

// Para tasks, exigir agente
if (componentType === 'task' && !agentId) {
  const agents = await listAgents(squadPath);
  agentId = await promptAgentSelection(agents);
}
```

### Passo 3: Criar o Arquivo do Componente

```javascript
const { SquadExtender } = require('../scripts/squad/squad-extender');
const extender = new SquadExtender();

const result = await extender.addComponent(squadPath, {
  type: componentType,
  name: componentName,
  agentId: agentId,
  storyId: storyId,
  description: description
});

// result = {
//   filePath: 'squads/my-squad/tasks/lead-agent-process-data.md',
//   created: true,
//   templateUsed: 'task-template.md'
// }
```

### Passo 4: Atualizar o Manifesto

```javascript
const manifestUpdated = await extender.updateManifest(squadPath, {
  type: componentType,
  file: result.fileName
});

// Cria backup antes de atualizar
// Adiciona a components.{type}[]
// Preserva a formatação do YAML
```

### Passo 5: Validar

```javascript
const { SquadValidator } = require('../scripts/squad/squad-validator');
const validator = new SquadValidator();

const validationResult = await validator.validate(squadPath);

if (!validationResult.valid) {
  console.log('Validation errors:', validationResult.errors);
  console.log('Suggestions:', validationResult.suggestions);
}
```

### Passo 6: Exibir o Resultado

```javascript
console.log(`
Criando ${componentType}...
  Criado: ${result.relativePath}
  Atualizado: squad.yaml (adicionado a components.${componentType}s)
  Validação: ${validationResult.valid ? 'PASS' : 'FAIL'}

Próximos passos:
  1. Editar ${result.relativePath}
  2. ${getNextStepHint(componentType)}
  3. Rodar: *validate-squad ${squadName}
`);
```

## Templates de Componentes

Cada tipo de componente usa um template de `.aiox-core/development/templates/squad/`:

| Tipo | Template | Campos-Chave |
|------|----------|------------|
| agent | agent-template.md | name, id, role, commands |
| task | task-template.md | responsavel, entrada, saida, checklist |
| workflow | workflow-template.md | steps, conditions, triggers |
| checklist | checklist-template.md | items, categories |
| template | template-template.md | placeholders, structure |
| tool | tool-template.js | functions, exports |
| script | script-template.js | main, helpers |
| data | data-template.yaml | schema, content |

## Tratamento de Erros

### Erro 1: Squad Não Encontrado

```yaml
error: SQUAD_NOT_FOUND
cause: O diretório do squad não existe
resolution: Use *list-squads para ver os squads disponíveis
recovery: Sugerir *create-squad para criar um novo squad
```

### Erro 2: Nome de Componente Inválido

```yaml
error: INVALID_COMPONENT_NAME
cause: O nome não corresponde ao padrão kebab-case
resolution: Use apenas letras minúsculas, números e hífens
recovery: Sugerir um formato de nome válido
```

### Erro 3: Componente Já Existe

```yaml
error: COMPONENT_EXISTS
cause: O arquivo já existe no diretório do squad
resolution: Use --force para sobrescrever ou escolha um nome diferente
recovery: Mostrar o caminho do arquivo existente
```

### Erro 4: Agente Não Encontrado (para tasks)

```yaml
error: AGENT_NOT_FOUND
cause: O agente especificado não existe no squad
resolution: Crie o agente primeiro com --add agent
recovery: Listar os agentes disponíveis
```

### Erro 5: Falha ao Atualizar o Manifesto

```yaml
error: MANIFEST_UPDATE_FAILED
cause: Não foi possível atualizar o squad.yaml
resolution: Verifique as permissões do arquivo e a sintaxe do YAML
recovery: Restaurar a partir do backup (.squad.yaml.bak)
```

## Considerações de Segurança

### Prevenção de Path Traversal

```javascript
// Validar o nome do componente - sem separadores de caminho
if (componentName.includes('/') || componentName.includes('\\') || componentName.includes('..')) {
  throw new Error('Invalid component name - path traversal not allowed');
}
```

### Proteção contra Sobrescrita

```javascript
if (await fs.access(targetPath).then(() => true).catch(() => false)) {
  if (!force) {
    throw new Error(`File already exists: ${targetPath}. Use --force to overwrite`);
  }
}
```

### Backup Antes de Atualizar

```javascript
const backupPath = manifestPath + '.bak';
await fs.copyFile(manifestPath, backupPath);
```

## Pós-condições

```yaml
post-conditions:
  - [ ] Arquivo do componente criado no diretório correto
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que o arquivo existe e contém conteúdo válido
    error_message: "O arquivo do componente não foi criado com sucesso"

  - [ ] Manifesto atualizado com o novo componente
    tipo: post-condition
    blocker: true
    validacao: |
      Verificar que o squad.yaml contém a nova entrada
    error_message: "O manifesto não foi atualizado"

  - [ ] A validação passa
    tipo: post-condition
    blocker: false
    validacao: |
      O squad passa na validação após a extensão
    error_message: "A validação do squad falhou após a extensão"
```

## Dependências

- **Scripts:**
  - `.aiox-core/development/scripts/squad/squad-loader.js`
  - `.aiox-core/development/scripts/squad/squad-extender.js`
  - `.aiox-core/development/scripts/squad/squad-validator.js`

- **Templates:**
  - `.aiox-core/development/templates/squad/agent-template.md`
  - `.aiox-core/development/templates/squad/task-template.md`
  - `.aiox-core/development/templates/squad/workflow-template.md`
  - `.aiox-core/development/templates/squad/checklist-template.md`
  - `.aiox-core/development/templates/squad/template-template.md`
  - `.aiox-core/development/templates/squad/tool-template.js`
  - `.aiox-core/development/templates/squad/script-template.js`
  - `.aiox-core/development/templates/squad/data-template.yaml`

- **Tools:**
  - js-yaml (parsing de YAML)
  - fs (operações de sistema de arquivos)

## Metadados

```yaml
story: SQS-11
version: 1.0.0
created: 2025-12-26
updated: 2025-12-26
author: Dex (dev)
tags:
  - squad
  - extension
  - components
  - templates
```

---

*Definição da task para o comando *extend-squad*
