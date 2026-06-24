---
task: Validate Squad
responsável: @squad-creator
responsável_type: agent
atomic_layer: task
Entrada: |
  - squad_path: Caminho para o diretório do squad (padrão: ./squads/{name})
  - name: Nome do squad (alternativa ao caminho completo)
  - strict: Se true, warnings viram erros (padrão: false)
  - verbose: Se true, exibe saída detalhada (padrão: false)
Saída: |
  - validation_result: Objeto com { valid, errors, warnings, suggestions }
  - report: Relatório formatado para exibição
  - exit_code: 0 se válido, 1 se inválido
Checklist:
  - [ ] Resolver o caminho do squad via squad-loader
  - [ ] Executar squad-validator.validate()
  - [ ] Formatar o resultado para saída
  - [ ] Retornar o exit code apropriado
---

# *validate-squad

Valida um squad contra o JSON Schema e a TASK-FORMAT-SPECIFICATION-V1.

## Uso

```
@squad-creator
*validate-squad ./squads/my-squad
*validate-squad my-squad
*validate-squad my-squad --strict
*validate-squad my-squad --verbose
```

## Parâmetros

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|---------|-------------|
| `squad_path` | string | - | Caminho completo para o diretório do squad |
| `name` | string | - | Nome do squad (resolve para ./squads/{name}) |
| `--strict` | flag | false | Tratar warnings como erros |
| `--verbose` | flag | false | Exibir saída detalhada da validação |

## Verificações de Validação

### 1. Validação do Manifesto
- Verifica `squad.yaml` ou `config.yaml` (depreciado)
- Valida contra o JSON Schema
- Campos obrigatórios: `name`, `version`

### 2. Validação de Estrutura
- Verifica os diretórios esperados: `tasks/`, `agents/`
- Confirma que os arquivos referenciados existem

### 3. Validação de Task (TASK-FORMAT-SPECIFICATION-V1)
- Verifica os campos obrigatórios nos arquivos de task
- Valida as convenções de nomenclatura (kebab-case)

### 4. Validação de Agente
- Verifica o formato válido de definição de agente
- Valida as convenções de nomenclatura

### 5. Validação de Referência de Config (SQS-10)
- Valida se os caminhos de config no squad.yaml resolvem corretamente
- Suporta tanto caminhos locais (`config/coding-standards.md`) quanto de nível de projeto (`../../docs/framework/CODING-STANDARDS.md`)
- Emite warning se a referência de nível de projeto não existir
- Emite erro se a referência local não existir

## Fluxo

```
1. Resolve squad path
   ├── If full path provided → use directly
   └── If name provided → resolve via ./squads/{name}/

2. Execute validations
   ├── validateManifest() → Schema check
   ├── validateStructure() → Directory check
   ├── validateTasks() → Task format check
   ├── validateAgents() → Agent format check
   └── validateConfigReferences() → Config path check (SQS-10)

3. Format and display result
   ├── Show errors (if any)
   ├── Show warnings (if any)
   └── Show final result (VALID/INVALID)

4. Return exit code
   ├── 0 → Valid (or valid with warnings)
   └── 1 → Invalid (errors found)
```

## Exemplo de Saída

```
Validating squad: ./squads/my-squad/

Errors: 0
Warnings: 2
  - [MISSING_DIRECTORY]: Expected directory not found: workflows/
    Suggestion: mkdir workflows (task-first architecture recommends tasks/ and agents/)
  - [TASK_MISSING_FIELD] (my-task.md): Task missing recommended field: Checklist
    Suggestion: Add "Checklist:" to my-task.md (TASK-FORMAT-SPECIFICATION-V1)

Result: VALID (with warnings)
```

## Códigos de Erro

| Código | Severidade | Descrição |
|------|----------|-------------|
| `MANIFEST_NOT_FOUND` | Error | Nenhum squad.yaml ou config.yaml encontrado |
| `YAML_PARSE_ERROR` | Error | Sintaxe YAML inválida |
| `SCHEMA_ERROR` | Error | O manifesto não corresponde ao JSON Schema |
| `FILE_NOT_FOUND` | Error | O arquivo referenciado não existe |
| `DEPRECATED_MANIFEST` | Warning | Usando config.yaml em vez de squad.yaml |
| `MISSING_DIRECTORY` | Warning | Diretório esperado não encontrado |
| `NO_TASKS` | Warning | Nenhum arquivo de task em tasks/ |
| `TASK_MISSING_FIELD` | Warning | Task sem campo recomendado |
| `AGENT_INVALID_FORMAT` | Warning | O arquivo de agente pode não seguir o formato |
| `INVALID_NAMING` | Warning | Nome de arquivo fora do kebab-case |

## Implementação

```javascript
const { SquadLoader } = require('./.aiox-core/development/scripts/squad');
const { SquadValidator } = require('./.aiox-core/development/scripts/squad');

async function validateSquad(options) {
  const { squadPath, name, strict, verbose } = options;

  // Resolve path
  const loader = new SquadLoader();
  let resolvedPath = squadPath;
  if (!squadPath && name) {
    const resolved = await loader.resolve(name);
    resolvedPath = resolved.path;
  }

  // Validate
  const validator = new SquadValidator({ strict, verbose });
  const result = await validator.validate(resolvedPath);

  // Format output
  console.log(validator.formatResult(result, resolvedPath));

  // Return exit code
  return result.valid ? 0 : 1;
}
```

## Relacionados

- **Story:** SQS-3 (Squad Validator + JSON Schema)
- **Story:** SQS-10 (Project Config Reference) - Resolução de caminho de config
- **Dependências:** squad-loader.js, squad-validator.js
- **Schema:** .aiox-core/schemas/squad-schema.json
- **Agente:** @squad-creator (Craft)
