---
task: Design Squad from Documentation
responsavel: "@squad-creator"
responsavel_type: agent
atomic_layer: task
elicit: true
Entrada: |
  - docs: Fontes de documentação (texto, arquivos ou descrição verbal)
  - domain: Dica opcional de domínio para guiar a análise
  - output_path: Onde salvar o blueprint (default: ./squads/.designs/)
Saida: |
  - blueprint_path: Caminho para o squad-design.yaml gerado
  - summary: Resumo legível por humanos das recomendações
  - confidence: Score de confiança geral (0-1)
Checklist:
  - "[ ] Coletar a entrada de documentação"
  - "[ ] Analisar o domínio e extrair conceitos"
  - "[ ] Gerar recomendações de agents"
  - "[ ] Gerar recomendações de tasks"
  - "[ ] Apresentar recomendações para refinamento"
  - "[ ] Aplicar ajustes do usuário"
  - "[ ] Gerar o arquivo de blueprint"
  - "[ ] Exibir os próximos passos"
---

# *design-squad

Analisa a documentação e guia o usuário pelo design de uma estrutura de squad com recomendações inteligentes de agents e tasks.

## Uso

```bash
@squad-creator

*design-squad
# → Modo interativo, solicita a documentação

*design-squad --docs ./docs/prd/my-project.md
# → Analisa um arquivo específico

*design-squad --docs ./docs/prd/my-project.md,./docs/specs/api.yaml
# → Analisa múltiplos arquivos

*design-squad --domain "e-commerce order management"
# → Usa a dica de domínio para orientação
```

## Parâmetros

| Parâmetro | Tipo | Default | Descrição |
|-----------|------|---------|-------------|
| `--docs` | string | - | Caminhos separados por vírgula para arquivos de documentação |
| `--domain` | string | - | Dica de domínio para guiar a análise |
| `--output` | string | ./squads/.designs/ | Diretório de saída para o blueprint |
| `--quick` | flag | false | Aceita todas as recomendações sem revisão |
| `--verbose` | flag | false | Exibe a saída detalhada da análise |

## Fluxo Interativo

### Fase 1: Entrada de Documentação

```
? How would you like to provide documentation?
  1. Paste text directly
  2. Provide file paths
  3. Describe the domain verbally
  > 2

? Documentation file paths (comma-separated):
  > ./docs/prd/my-project.md, ./docs/specs/api.yaml

Analyzing documentation...
```

### Fase 2: Confirmação do Domínio

```
Based on your documentation, I identified:

Domain: Order Management System
Key Entities: Order, Customer, Product, Payment, Shipment
Main Workflows:
  1. order-creation
  2. payment-processing
  3. inventory-check
  4. shipment-tracking

Is this correct? [Y/n/Adjust]
> Y
```

### Fase 3: Revisão de Agents

```
Recommended Agent 1 of 3:

  ID: order-manager
  Role: Manages order lifecycle from creation to fulfillment
  Commands: *create-order, *update-order, *cancel-order
  Confidence: 92%

  [A]ccept / [R]eject / [M]odify / [S]kip to tasks
> A

Recommended Agent 2 of 3:
...
```

### Fase 4: Revisão de Tasks

```
Tasks for order-manager:

  1. create-order.md (90% confidence)
     Entrada: customer_id, items[], payment_method
     Saida: order_id, status, total

  2. update-order.md (85% confidence)
     Entrada: order_id, updates{}
     Saida: updated_order, changelog

  [A]ccept all / Review [1-2] / [R]eject all
> A
```

### Fase 5: Adições Customizadas

```
Would you like to add any agents or tasks not recommended?

  [A]dd agent / Add [T]ask / [C]ontinue to blueprint
> C
```

### Fase 6: Geração do Blueprint

```
Generating blueprint...

Summary:
  Agents: 3 (3 recommended, 0 added)
  Tasks: 8 (7 recommended, 1 added)
  User adjustments: 2
  Overall confidence: 88%

Saved: ./squads/.designs/order-management-squad-design.yaml

Next steps:
  1. Review blueprint: cat ./squads/.designs/order-management-squad-design.yaml
  2. Create squad: *create-squad order-management --from-design
  3. Or edit blueprint manually before creation
```

## Pipeline de Análise

```
┌─────────────────────────────────────────────────────────────────────┐
│                     DOMAIN ANALYSIS PIPELINE                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  1. INPUT NORMALIZATION                                              │
│     ├── Parse markdown/yaml/json files                               │
│     ├── Extract text content                                         │
│     └── Merge multiple sources                                       │
│                                                                      │
│  2. ENTITY EXTRACTION                                                │
│     ├── Identify nouns and proper nouns (capitalized terms)          │
│     ├── Detect domain-specific terms (repeated concepts)             │
│     ├── Group related concepts                                       │
│     └── Output: entities[]                                           │
│                                                                      │
│  3. WORKFLOW DETECTION                                               │
│     ├── Identify action verbs (create, update, delete, process)      │
│     ├── Detect sequential processes (steps, flows)                   │
│     ├── Map input → process → output patterns                        │
│     └── Output: workflows[]                                          │
│                                                                      │
│  4. INTEGRATION MAPPING                                              │
│     ├── Detect external system references (API, database, service)   │
│     ├── Identify third-party mentions                                │
│     └── Output: integrations[]                                       │
│                                                                      │
│  5. STAKEHOLDER IDENTIFICATION                                       │
│     ├── Detect user types/roles (admin, user, manager)               │
│     ├── Identify personas mentioned                                  │
│     └── Output: stakeholders[]                                       │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

## Motor de Recomendação

```
┌─────────────────────────────────────────────────────────────────────┐
│                   RECOMMENDATION ENGINE                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  AGENT GENERATION:                                                   │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │ For each major workflow:                                        ││
│  │   → Generate agent with matching role                           ││
│  │   → Derive commands from workflow steps                         ││
│  │   → Calculate confidence based on clarity                       ││
│  │                                                                 ││
│  │ Deduplication:                                                  ││
│  │   → Merge similar agents (>70% overlap)                         ││
│  │   → Consolidate commands                                        ││
│  └─────────────────────────────────────────────────────────────────┘│
│                                                                      │
│  TASK GENERATION:                                                    │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │ For each agent command:                                         ││
│  │   → Generate task following TASK-FORMAT-SPECIFICATION-V1        ││
│  │   → Derive entrada from workflow inputs                         ││
│  │   → Derive saida from workflow outputs                          ││
│  │   → Generate checklist from workflow steps                      ││
│  └─────────────────────────────────────────────────────────────────┘│
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

## Saída: Schema do Blueprint

```yaml
# squad-design.yaml
squad:
  name: my-domain-squad
  description: "Generated from documentation analysis"
  domain: domain-name

analysis:
  entities: [Entity1, Entity2, ...]
  workflows: [workflow-1, workflow-2, ...]
  integrations: [API1, Service2, ...]
  stakeholders: [Role1, Role2, ...]

recommendations:
  agents:
    - id: agent-id
      role: "Agent role description"
      commands: [cmd1, cmd2]
      confidence: 0.92
      user_added: false
      user_modified: false

  tasks:
    - name: task-name
      agent: agent-id
      entrada: [input1, input2]
      saida: [output1, output2]
      confidence: 0.88

  template: basic | etl | agent-only | custom
  config_mode: extend | override | none

metadata:
  created_at: "2025-12-18T00:00:00Z"
  source_docs: ["./path/to/doc1.md"]
  user_adjustments: 2
  overall_confidence: 0.87
```

## Integração com *create-squad

Após gerar um blueprint, use-o com *create-squad:

```bash
*create-squad my-domain-squad --from-design ./squads/.designs/my-domain-squad-design.yaml
```

Isto irá:
1. Carregar o blueprint
2. Validar contra o schema
3. Gerar a estrutura do squad com agents/tasks customizados do blueprint
4. Pular a elicitação interativa (usa os valores do blueprint)

## Tratamento de Erros

| Erro | Causa | Resolução |
|-------|-------|------------|
| `NO_DOCUMENTATION` | Nenhuma entrada fornecida | Forneça docs via --docs ou interativamente |
| `PARSE_ERROR` | Não é possível ler/parsear o arquivo | Verifique o formato do arquivo (md, yaml, json) |
| `EMPTY_ANALYSIS` | Nenhum conceito de domínio extraído | Forneça documentação mais detalhada |
| `BLUEPRINT_EXISTS` | O blueprint já existe | Use --force para sobrescrever |

## Implementação

```javascript
const { SquadDesigner } = require('./.aiox-core/development/scripts/squad');

async function designSquad(options) {
  const designer = new SquadDesigner();

  // 1. Coletar a documentação
  const docs = await designer.collectDocumentation(options);

  // 2. Analisar o domínio
  const analysis = await designer.analyzeDomain(docs);

  // 3. Gerar recomendações
  const recommendations = {
    agents: designer.generateAgentRecommendations(analysis),
    tasks: designer.generateTaskRecommendations(analysis)
  };

  // 4. Refinamento interativo (a menos que --quick)
  if (!options.quick) {
    await designer.interactiveRefinement(recommendations);
  }

  // 5. Gerar o blueprint
  const blueprint = await designer.generateBlueprint({
    analysis,
    recommendations,
    metadata: {
      source_docs: options.docs,
      created_at: new Date().toISOString()
    }
  });

  // 6. Salvar o blueprint
  const blueprintPath = await designer.saveBlueprint(blueprint, options.output);

  return { blueprintPath, blueprint };
}
```

## Relacionados

- **Agent:** @squad-creator (Craft)
- **Script:** squad-designer.js
- **Schema:** squad-design-schema.json
- **Integração:** *create-squad --from-design
- **Story:** SQS-9 (Squad Designer)
