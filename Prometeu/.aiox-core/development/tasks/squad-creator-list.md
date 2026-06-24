---
task: List Squads
responsavel: "@squad-creator"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - path: Caminho alternativo (opcional, default: ./squads)
  - format: Formato de output (table | json | yaml)
Saida: |
  - squads: Lista de squads encontrados
  - count: Numero total de squads
Checklist:
  - "[ ] Usar squad-generator.listLocal()"
  - "[ ] Formatar output conforme format"
  - "[ ] Exibir informacoes basicas de cada squad"
---

# *list-squads

Lista todos os squads locais do projeto.

## Uso

```
@squad-creator
*list-squads
*list-squads --format json
*list-squads --path ./custom-squads
```

## Parametros

| Parâmetro | Tipo | Default | Descrição |
|-----------|------|---------|-------------|
| `--path` | string | ./squads | Caminho para o diretório de squads |
| `--format` | string | table | Formato de saída: table, json, yaml |
| `--include-invalid` | flag | false | Inclui squads sem manifest válido |

## Output Exemplo (Table)

```
Local Squads (./squads/)

┌─────────────────────┬─────────┬─────────────────────────────┬────────┐
│ Name                │ Version │ Description                 │ Status │
├─────────────────────┼─────────┼─────────────────────────────┼────────┤
│ meu-dominio-squad   │ 1.0.0   │ Squad para automacao de X   │ ✅     │
│ outro-squad         │ 2.1.0   │ Outro squad customizado     │ ✅     │
│ legacy-pack         │ 1.0.0   │ Using config.yaml           │ ⚠️     │
└─────────────────────┴─────────┴─────────────────────────────┴────────┘

Total: 3 squads (2 valid, 1 deprecated)
```

## Output Exemplo (JSON)

```json
{
  "squads": [
    {
      "name": "meu-dominio-squad",
      "version": "1.0.0",
      "description": "Squad para automacao de X",
      "path": "./squads/meu-dominio-squad",
      "status": "valid"
    },
    {
      "name": "outro-squad",
      "version": "2.1.0",
      "description": "Outro squad customizado",
      "path": "./squads/outro-squad",
      "status": "valid"
    }
  ],
  "count": 2,
  "path": "./squads"
}
```

## Output Exemplo (YAML)

```yaml
squads:
  - name: meu-dominio-squad
    version: 1.0.0
    description: Squad para automacao de X
    path: ./squads/meu-dominio-squad
    status: valid
  - name: outro-squad
    version: 2.1.0
    description: Outro squad customizado
    path: ./squads/outro-squad
    status: valid
count: 2
path: ./squads
```

## Indicadores de Status

| Status | Ícone | Descrição |
|--------|------|-------------|
| valid | ✅ | Manifest squad.yaml válido |
| deprecated | ⚠️ | Usando config.yaml (depreciado) |
| invalid | ❌ | Nenhum manifest encontrado |

## Fluxo

```
1. Parsear argumentos
   ├── Obter path (default: ./squads)
   └── Obter format (default: table)

2. Listar squads
   ├── Chamar SquadGenerator.listLocal()
   └── Obter o array com info dos squads

3. Filtrar resultados
   ├── Se --include-invalid → mostrar todos
   └── Se não → filtrar os inválidos

4. Formatar a saída
   ├── Se table → formatar como tabela ASCII
   ├── Se json → JSON.stringify
   └── Se yaml → yaml.dump

5. Exibir o resultado
   └── Imprimir a lista formatada
```

## Implementação

```javascript
const { SquadGenerator } = require('./.aiox-core/development/scripts/squad');

async function listSquads(options) {
  const { path: squadsPath, format, includeInvalid } = options;

  // List local squads
  const generator = new SquadGenerator({ squadsPath });
  let squads = await generator.listLocal();

  // Filter if needed
  if (!includeInvalid) {
    squads = squads.filter(s => !s.invalid);
  }

  // Format output
  switch (format) {
    case 'json':
      return JSON.stringify({ squads, count: squads.length, path: squadsPath }, null, 2);

    case 'yaml':
      return formatYaml({ squads, count: squads.length, path: squadsPath });

    case 'table':
    default:
      return formatTable(squads, squadsPath);
  }
}

function formatTable(squads, squadsPath) {
  if (squads.length === 0) {
    return `No squads found in ${squadsPath}/\n\nCreate one with: @squad-creator *create-squad my-squad`;
  }

  let output = `Local Squads (${squadsPath}/)\n\n`;

  // Header
  output += '┌' + '─'.repeat(22) + '┬' + '─'.repeat(9) + '┬' + '─'.repeat(30) + '┬' + '─'.repeat(8) + '┐\n';
  output += '│ Name                 │ Version │ Description                  │ Status │\n';
  output += '├' + '─'.repeat(22) + '┼' + '─'.repeat(9) + '┼' + '─'.repeat(30) + '┼' + '─'.repeat(8) + '┤\n';

  // Rows
  for (const squad of squads) {
    const name = squad.name.padEnd(20).substring(0, 20);
    const version = squad.version.padEnd(7).substring(0, 7);
    const desc = (squad.description || '').padEnd(28).substring(0, 28);
    const status = squad.invalid ? '❌' : squad.deprecated ? '⚠️' : '✅';
    output += `│ ${name} │ ${version} │ ${desc} │ ${status}     │\n`;
  }

  output += '└' + '─'.repeat(22) + '┴' + '─'.repeat(9) + '┴' + '─'.repeat(30) + '┴' + '─'.repeat(8) + '┘\n';

  // Summary
  const valid = squads.filter(s => !s.invalid && !s.deprecated).length;
  const deprecated = squads.filter(s => s.deprecated).length;
  const invalid = squads.filter(s => s.invalid).length;

  output += `\nTotal: ${squads.length} squads`;
  if (deprecated > 0 || invalid > 0) {
    output += ` (${valid} valid`;
    if (deprecated > 0) output += `, ${deprecated} deprecated`;
    if (invalid > 0) output += `, ${invalid} invalid`;
    output += ')';
  }

  return output;
}
```

## Estado Vazio

Quando nenhum squad é encontrado:

```
No squads found in ./squads/

Create one with: @squad-creator *create-squad my-squad

Or download a public squad: @squad-creator *download-squad squad-name
```

## Tratamento de Erros

| Erro | Causa | Resolução |
|-------|-------|------------|
| `ENOENT` | Diretório de squads não existe | Retornará uma lista vazia |
| `PERMISSION_DENIED` | Não é possível ler o diretório | Verifique as permissões |

## Relacionado

- **Agente:** @squad-creator (Craft)
- **Script:** squad-generator.js (método listLocal)
- **Create:** *create-squad
- **Validate:** *validate-squad
