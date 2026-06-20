---
task: analyzeSquad()
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

  - campo: output_format
    tipo: string
    origem: User Input
    obrigatorio: false
    validacao: "console | markdown | json (default: console)"

  - campo: verbose
    tipo: boolean
    origem: User Input
    obrigatorio: false
    validacao: "Incluir detalhes de arquivos (default: false)"

  - campo: suggestions
    tipo: boolean
    origem: User Input
    obrigatorio: false
    validacao: "Incluir sugestões de melhoria (default: true)"

Saida:
  - campo: analysis_report
    tipo: object
    destino: Console or file
    persistido: false

  - campo: component_inventory
    tipo: object
    destino: Return value
    persistido: false

  - campo: coverage_metrics
    tipo: object
    destino: Return value
    persistido: false

  - campo: suggestions
    tipo: array
    destino: Return value
    persistido: false

Checklist:
  - "[ ] Validar que o squad existe"
  - "[ ] Carregar o manifesto squad.yaml"
  - "[ ] Inventariar os componentes por tipo"
  - "[ ] Calcular as métricas de cobertura"
  - "[ ] Gerar sugestões de melhoria"
  - "[ ] Formatar e exibir o relatório"
---

# Task Analisar Squad

## Propósito

Analisar a estrutura, os componentes e a cobertura de um squad existente para fornecer insights e sugestões de melhoria. Esta task permite que os desenvolvedores entendam o que um squad contém e identifiquem oportunidades de aprimoramento.

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
```

## Fluxo de Elicitação

```
@squad-creator

*analyze-squad

? Nome do squad: _________________
  (Tab para autocompletar a partir dos squads disponíveis)

? Formato de saída:
  > 1. console (default) - Exibir no terminal
    2. markdown - Salvar em arquivo
    3. json - Legível por máquina

? Incluir sugestões? (Y/n): Y

Analisando squad...
```

## Passos de Execução

### Passo 1: Validar que o Squad Existe

```javascript
const { SquadLoader } = require('../scripts/squad/squad-loader');
const loader = new SquadLoader();

const squadPath = path.join('./squads', squadName);
const exists = await loader.squadExists(squadName);

if (!exists) {
  throw new Error(`Squad "${squadName}" not found. Use *list-squads to see available squads.`);
}
```

### Passo 2: Carregar o Manifesto do Squad

```javascript
const manifest = await loader.loadManifest(squadName);

// Extrai a visão geral
const overview = {
  name: manifest.name,
  version: manifest.version,
  author: manifest.author,
  license: manifest.license,
  aioxMinVersion: manifest.aiox?.minVersion || 'N/A',
  description: manifest.description
};
```

### Passo 3: Inventariar os Componentes

```javascript
const { SquadAnalyzer } = require('../scripts/squad/squad-analyzer');
const analyzer = new SquadAnalyzer();

const inventory = await analyzer.inventoryComponents(squadPath);

// Estrutura esperada:
// {
//   agents: ['lead-agent.md', 'helper-agent.md'],
//   tasks: ['lead-agent-task1.md', 'lead-agent-task2.md'],
//   workflows: [],
//   checklists: [],
//   templates: ['report-template.md'],
//   tools: [],
//   scripts: [],
//   data: []
// }
```

### Passo 4: Calcular as Métricas de Cobertura

```javascript
const coverage = analyzer.calculateCoverage(inventory, manifest);

// Estrutura esperada:
// {
//   agents: { total: 2, withTasks: 2, percentage: 100 },
//   tasks: { total: 3, percentage: 75 },
//   config: { hasReadme: true, hasTechStack: false, percentage: 60 },
//   directories: { populated: 3, empty: 5, percentage: 37.5 }
// }
```

### Passo 5: Gerar Sugestões

```javascript
const suggestions = analyzer.generateSuggestions(inventory, coverage);

// Estrutura esperada:
// [
//   { priority: 'high', message: 'Adicionar tasks para o helper-agent (atualmente tem apenas 1)' },
//   { priority: 'medium', message: 'Criar workflows para sequências comuns' },
//   { priority: 'low', message: 'Adicionar checklists para validação' }
// ]
```

### Passo 6: Formatar e Exibir o Relatório

```javascript
const report = analyzer.formatReport({
  overview,
  inventory,
  coverage,
  suggestions
}, outputFormat);

if (outputFormat === 'console') {
  console.log(report);
} else if (outputFormat === 'markdown') {
  const outputPath = path.join(squadPath, 'ANALYSIS.md');
  await fs.writeFile(outputPath, report);
  console.log(`Análise salva em: ${outputPath}`);
} else if (outputFormat === 'json') {
  console.log(JSON.stringify({ overview, inventory, coverage, suggestions }, null, 2));
}
```

## Formato de Saída (Console)

```
=== Análise de Squad: {squad-name} ===

Visão Geral
  Nome: {name}
  Versão: {version}
  Autor: {author}
  Licença: {license}
  Versão Mínima do AIOX: {aioxMinVersion}

Componentes
  Agentes ({count})
    {agent-file-1}
    {agent-file-2}
  Tasks ({count})
    {task-file-1}
    {task-file-2}
  Workflows ({count}) {empty-indicator}
  Checklists ({count}) {empty-indicator}
  Templates ({count})
  Tools ({count}) {empty-indicator}
  Scripts ({count}) {empty-indicator}
  Data ({count}) {empty-indicator}

Cobertura
  Agentes: {bar} {percentage}% ({details})
  Tasks: {bar} {percentage}% ({details})
  Config: {bar} {percentage}% ({details})
  Docs: {bar} {percentage}% ({details})

Sugestões
  1. {suggestion-1}
  2. {suggestion-2}
  3. {suggestion-3}

Próximo: *extend-squad {squad-name}
```

## Tratamento de Erros

### Erro 1: Squad Não Encontrado

```yaml
error: SQUAD_NOT_FOUND
cause: O diretório do squad não existe
resolution: Use *list-squads para ver os squads disponíveis
recovery: Sugerir *create-squad para criar um novo squad
```

### Erro 2: Manifesto Inválido

```yaml
error: MANIFEST_PARSE_ERROR
cause: O squad.yaml contém YAML inválido
resolution: Corrigir os erros de sintaxe do YAML
recovery: Rodar *validate-squad para validação detalhada
```

### Erro 3: Permissão Negada

```yaml
error: PERMISSION_DENIED
cause: Não é possível ler o diretório ou os arquivos do squad
resolution: Verificar as permissões dos arquivos
recovery: chmod 644 para arquivos, 755 para diretórios
```

## Pós-condições

```yaml
post-conditions:
  - [ ] Relatório de análise gerado com sucesso
    tipo: post-condition
    blocker: false
    validacao: |
      Verificar se todos os componentes foram inventariados
    error_message: "Análise incompleta - alguns componentes podem não estar listados"
```

## Dependências

- **Scripts:**
  - `.aiox-core/development/scripts/squad/squad-loader.js`
  - `.aiox-core/development/scripts/squad/squad-analyzer.js`

- **Tools:**
  - js-yaml (parsing de YAML)
  - fs (operações de sistema de arquivos)

## Metadados

```yaml
story: SQS-11
version: 1.0.0
create