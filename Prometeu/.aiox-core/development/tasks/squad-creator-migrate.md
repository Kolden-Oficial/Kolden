---
task: Migrate Squad
responsável: @squad-creator
responsável_type: agent
atomic_layer: task
Entrada: |
  - squad_path: Caminho para o diretório do squad a migrar (obrigatório)
  - dry_run: Se true, prévia das mudanças sem modificar arquivos (--dry-run)
  - verbose: Se true, exibe saída detalhada (--verbose)
Saída: |
  - migration_result: Objeto com { success, actions, validation, backupPath }
  - report: Relatório de migração formatado
  - exit_code: 0 se bem-sucedido, 1 se falhar
Checklist:
  - "[ ] Analisar o squad quanto às necessidades de migração"
  - "[ ] Criar backup em .backup/"
  - "[ ] Executar as ações de migração"
  - "[ ] Validar o squad migrado"
  - "[ ] Gerar relatório de migração"
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# *migrate-squad

Migra formatos legados de squad para o padrão AIOX 2.1.

## Uso

```
@squad-creator

# Preview changes without modifying files
*migrate-squad ./squads/my-squad --dry-run

# Migrate with automatic backup
*migrate-squad ./squads/my-squad

# Migrate with detailed output
*migrate-squad ./squads/my-squad --verbose

# Migrate squad
*migrate-squad ./squads/my-pack --verbose
```

## Parâmetros

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|---------|-------------|
| `squad_path` | string | - | Caminho completo para o diretório do squad (obrigatório) |
| `--dry-run` | flag | false | Prévia das mudanças sem modificar arquivos |
| `--verbose` | flag | false | Exibir saída detalhada da migração |

## Detecção de Migração

O migrador detecta os seguintes padrões legados:

| Padrão | Detecção | Ação de Migração |
|---------|-----------|------------------|
| `config.yaml` | Nome de manifesto legado | Renomear para `squad.yaml` |
| Estrutura plana | Sem diretórios `tasks/`, `agents/` | Criar estrutura de diretórios |
| `aiox.type` ausente | Campo não presente | Adicionar `aiox.type: squad` |
| `aiox.minVersion` ausente | Campo não presente | Adicionar `aiox.minVersion: 2.1.0` |
| `name` ausente | Campo não presente | Inferir do nome do diretório |
| `version` ausente | Campo não presente | Adicionar `version: 1.0.0` |

## Fluxo

```
1. Analyze Squad
   ├── Check for config.yaml vs squad.yaml
   ├── Check directory structure
   ├── Validate manifest schema
   └── Generate action list

2. Confirm Migration (if not --dry-run)
   ├── Display issues found
   ├── Display planned actions
   └── Request user confirmation

3. Create Backup
   └── Copy all files to .backup/pre-migration-{timestamp}/

4. Execute Actions
   ├── RENAME_MANIFEST: config.yaml → squad.yaml
   ├── CREATE_DIRECTORIES: tasks/, agents/, config/
   ├── ADD_FIELD: Add missing required fields
   └── MOVE_FILE: Reorganize files if needed

5. Validate Result
   ├── Run squad-validator on migrated squad
   └── Report any remaining issues

6. Generate Report
   ├── Summary of changes made
   ├── Backup location
   └── Validation result
```

## Exemplo de Saída

### Fase de Análise

```
═══════════════════════════════════════════════════════════
              SQUAD MIGRATION REPORT
═══════════════════════════════════════════════════════════

Squad Path: ./squads/my-legacy-squad/
Needs Migration: Yes

───────────────────────────────────────────────────────────
ISSUES FOUND:
───────────────────────────────────────────────────────────
  ⚠️ [WARNING] Uses deprecated config.yaml manifest
  ⚠️ [WARNING] Missing task-first directories: tasks, agents
  ❌ [ERROR] Missing required field: aiox.type
  ❌ [ERROR] Missing required field: aiox.minVersion

───────────────────────────────────────────────────────────
PLANNED ACTIONS:
───────────────────────────────────────────────────────────
  1. Rename config.yaml → squad.yaml
  2. Create directories: tasks, agents
  3. Add field: aiox.type = "squad"
  4. Add field: aiox.minVersion = "2.1.0"

═══════════════════════════════════════════════════════════
```

### Resultado da Migração

```
───────────────────────────────────────────────────────────
MIGRATION RESULT:
───────────────────────────────────────────────────────────
  Status: ✅ SUCCESS
  Message: Migration completed successfully
  Backup: ./squads/my-legacy-squad/.backup/pre-migration-1703318400000/

  Executed Actions:
    ✅ Rename config.yaml → squad.yaml [success]
    ✅ Create directories: tasks, agents [success]
    ✅ Add field: aiox.type = "squad" [success]
    ✅ Add field: aiox.minVersion = "2.1.0" [success]

  Post-Migration Validation:
    Valid: Yes

═══════════════════════════════════════════════════════════
```

### Modo Dry-Run

```
───────────────────────────────────────────────────────────
MIGRATION RESULT:
───────────────────────────────────────────────────────────
  Status: ✅ SUCCESS
  Message: Dry-run completed successfully

  Executed Actions:
    🔍 Rename config.yaml → squad.yaml [dry-run]
    🔍 Create directories: tasks, agents [dry-run]
    🔍 Add field: aiox.type = "squad" [dry-run]
    🔍 Add field: aiox.minVersion = "2.1.0" [dry-run]

═══════════════════════════════════════════════════════════
```

## Procedimento de Rollback

Se a migração falhar ou produzir resultados inesperados, restaure a partir do backup:

```bash
# List available backups
ls ./squads/my-squad/.backup/

# View backup contents
ls ./squads/my-squad/.backup/pre-migration-1703318400000/

# Restore from backup (removes current, restores backup)
rm -rf ./squads/my-squad/squad.yaml ./squads/my-squad/tasks ./squads/my-squad/agents
cp -r ./squads/my-squad/.backup/pre-migration-1703318400000/. ./squads/my-squad/

# Verify restoration
ls ./squads/my-squad/
```

## Códigos de Erro

| Código | Severidade | Descrição |
|------|----------|-------------|
| `SQUAD_NOT_FOUND` | Error | O diretório do squad não existe |
| `NO_MANIFEST` | Error | Nenhum config.yaml ou squad.yaml encontrado |
| `BACKUP_FAILED` | Error | Falha ao criar o backup |
| `MIGRATION_FAILED` | Error | Falha na execução de uma ação |
| `VALIDATION_FAILED` | Warning | A validação pós-migração encontrou problemas |
| `INVALID_PATH` | Error | Caminho de squad inválido fornecido |

## Implementação

```javascript
const { SquadMigrator } = require('./.aiox-core/development/scripts/squad');
const { SquadValidator } = require('./.aiox-core/development/scripts/squad');

async function migrateSquad(options) {
  const { squadPath, dryRun, verbose } = options;

  // Create migrator with optional validator
  const validator = new SquadValidator();
  const migrator = new SquadMigrator({
    dryRun,
    verbose,
    validator
  });

  // Analyze first
  const analysis = await migrator.analyze(squadPath);

  // Display analysis report
  console.log(migrator.generateReport(analysis));

  if (!analysis.needsMigration) {
    console.log('Squad is already up to date. No migration needed.');
    return 0;
  }

  // Execute migration
  const result = await migrator.migrate(squadPath);

  // Display final report
  console.log(migrator.generateReport(analysis, result));

  return result.success ? 0 : 1;
}
```

## Relacionados

- **Story:** SQS-7 (Squad Migration Tool)
- **Dependências:** squad-migrator.js, squad-validator.js
- **Schema:** .aiox-core/schemas/squad-schema.json
- **Agente:** @squad-creator (Craft)
- **Tasks Similares:** *validate-squad, *create-squad
