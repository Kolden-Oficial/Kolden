---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Task de Validação de Migrations

Valida se as migrations de banco de dados estão corretamente criadas e aplicadas para as mudanças de schema.

**Absorvida de:** Auto-Claude PR Review Phase 5

---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)

- Validação autônoma com logging
- Interação mínima com o usuário
- **Melhor para:** integração de CI/CD

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[DEFAULT]**

- Explica os requisitos da migration
- Contexto educativo sobre mudanças no banco de dados
- **Melhor para:** aprendizado, entender migrations

### 3. Pre-Flight Planning - Planejamento Completo Antecipado

- Auditoria completa das migrations
- Execução sem ambiguidade
- **Melhor para:** deploys em produção

**Parâmetro:** `mode` (opcional, default: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: qaMigrationValidation()
responsavel: Quinn (Guardian)
responsavel_type: Agente
atomic_layer: Molecule

**Entrada:**
- campo: story_id
  tipo: string
  origem: Input do Usuário
  obrigatorio: true
  validacao: Deve estar em formato válido de story ID (ex.: "6.3")

- campo: framework
  tipo: string
  origem: Autodetecção ou explícito
  obrigatorio: false
  validacao: "supabase" | "prisma" | "drizzle" | "django" | "rails" | "sequelize"

**Saida:**
- campo: migration_report
  tipo: object
  destino: Valor de retorno
  persistido: false

- campo: issues_found
  tipo: number
  destino: Memória
  persistido: false

- campo: report_file
  tipo: file
  destino: docs/stories/{story-id}/qa/migration_validation.json
  persistido: true
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Framework de banco de dados detectado
    tipo: pre-condition
    blocker: true
    validacao: |
      Um de: supabase/, prisma/, drizzle/, migrations/, db/
    error_message: "Pré-condição falhou: Nenhum framework de banco de dados detectado."

  - [ ] Mudanças de schema detectadas no diff
    tipo: pre-condition
    blocker: false
    validacao: |
      Mudanças em arquivos de schema, models ou diretórios de migration
    error_message: "Info: Nenhuma mudança de schema detectada, a validação pode ser pulada."
```

---

## Frameworks Suportados

### 1. Supabase

**Detecção:**

```
supabase/
├── migrations/
│   └── *.sql
└── config.toml
```

**Comandos de Validação:**

```bash
supabase db diff          # Verifica mudanças de schema pendentes
supabase migration list   # Lista o status das migrations
supabase db lint          # Faz lint das migrations SQL
```

**Verificações:**

- [ ] Arquivo SQL de migration existe para as mudanças de schema
- [ ] Migration aplicada localmente (supabase db reset)
- [ ] Nenhum diff de schema pendente
- [ ] Políticas RLS incluídas se houver novas tabelas
- [ ] Migration de rollback existe (down.sql ou reversível)

### 2. Prisma

**Detecção:**

```
prisma/
├── schema.prisma
└── migrations/
    └── */migration.sql
```

**Comandos de Validação:**

```bash
npx prisma migrate status     # Verifica o status da migration
npx prisma validate           # Valida o schema
npx prisma db pull --preview  # Compara com o DB
```

**Verificações:**

- [ ] schema.prisma atualizado com novos models/campos
- [ ] Migration gerada (prisma migrate dev)
- [ ] Migration aplicada localmente
- [ ] Nenhum drift entre o schema e o DB
- [ ] Índices definidos para foreign keys

### 3. Drizzle

**Detecção:**

```
drizzle/
├── schema.ts
└── migrations/
    └── *.sql
```

**Comandos de Validação:**

```bash
npx drizzle-kit generate  # Gera as migrations
npx drizzle-kit check     # Verifica o schema
```

**Verificações:**

- [ ] Arquivo de schema atualizado
- [ ] Migration SQL gerada
- [ ] Tipos exportados corretamente

### 4. Django

**Detecção:**

```
*/models.py
*/migrations/
manage.py
```

**Comandos de Validação:**

```bash
python manage.py makemigrations --dry-run  # Verifica pendências
python manage.py showmigrations            # Lista o status
python manage.py migrate --plan            # Mostra o plano
```

**Verificações:**

- [ ] Arquivos de migration criados para as mudanças de model
- [ ] Migrations aplicam sem erros
- [ ] Nenhuma migration não aplicada
- [ ] Migrations reversíveis (têm operações de reversão)

### 5. Rails (ActiveRecord)

**Detecção:**

```
db/
├── schema.rb
└── migrate/
    └── *.rb
```

**Comandos de Validação:**

```bash
rails db:migrate:status   # Verifica o status
rails db:migrate:redo     # Testa a reversibilidade
```

**Verificações:**

- [ ] Arquivo de migration existe
- [ ] Migration roda para frente
- [ ] Migration roda para trás (reversível)
- [ ] schema.rb atualizado

### 6. Sequelize

**Detecção:**

```
migrations/
├── *.js
models/
├── index.js
```

**Comandos de Validação:**

```bash
npx sequelize-cli db:migrate:status  # Verifica o status
```

**Verificações:**

- [ ] Arquivo de migration criado
- [ ] Métodos up e down definidos
- [ ] Migration aplica com sucesso

---

## Comando

```
*validate-migrations {story-id} [--framework supabase|prisma|drizzle|django|rails|sequelize]
```

**Parâmetros:**

- `story-id` (obrigatório): Identificador da story (ex.: "6.3")
- `--framework` (opcional): Força um framework específico (default: autodetecção)

**Exemplos:**

```bash
*validate-migrations 6.3
*validate-migrations 6.3 --framework prisma
```

---

## Workflow

### Fase 1: Detectar o Framework

1. Verificar os indicadores de framework:

   ```javascript
   const frameworks = {
     supabase: ['supabase/config.toml', 'supabase/migrations'],
     prisma: ['prisma/schema.prisma'],
     drizzle: ['drizzle.config.ts', 'drizzle/schema.ts'],
     django: ['manage.py', '*/models.py'],
     rails: ['db/schema.rb', 'Gemfile'],
     sequelize: ['.sequelizerc', 'migrations/*.js'],
   };
   ```

2. Selecionar o framework detectado (ou usar `--framework`)

3. Se múltiplos forem detectados, preferir:
   - Flag `--framework` explícita
   - Timestamp de migration mais recente
   - Solicitar a seleção ao usuário

### Fase 2: Detectar Mudanças de Schema

1. Obter os arquivos modificados:

   ```bash
   git diff --name-only HEAD~1
   ```

2. Identificar mudanças relacionadas a schema:

   ```javascript
   const schemaPatterns = {
     supabase: ['supabase/migrations/*.sql', '*.sql'],
     prisma: ['prisma/schema.prisma'],
     drizzle: ['drizzle/schema.ts', 'src/db/schema.ts'],
     django: ['*/models.py'],
     rails: ['db/migrate/*.rb', 'app/models/*.rb'],
     sequelize: ['models/*.js', 'migrations/*.js'],
   };
   ```

3. Categorizar as mudanças:
   - Novas tabelas/models
   - Colunas modificadas
   - Novos índices
   - Novas constraints
   - Políticas RLS (Supabase)

### Fase 3: Validar as Migrations

Para cada mudança de schema detectada:

1. **Verificar se a migration existe:**
   - Existe um arquivo de migration correspondente?
   - O timestamp da migration bate com a mudança de schema?

2. **Validar o conteúdo da migration:**
   - A migration corresponde à mudança de schema?
   - Todas as colunas/tipos estão corretos?
   - Os índices estão incluídos?
   - As constraints estão definidas?

3. **Verificar a reversibilidade:**
   - A migration de down existe?
   - Operações reversíveis foram usadas?
   - A preservação de dados foi considerada?

4. **Testar localmente:**
   - Rodar a migration para frente
   - Rodar a migration para trás (se reversível)
   - Verificar erros

### Fase 4: Verificações Adicionais

**Especificamente para Supabase:**

- [ ] Políticas RLS para novas tabelas
- [ ] Statements de grant para roles
- [ ] Permissões de edge function

**Para todos os frameworks:**

- [ ] Índices de foreign key
- [ ] Constraints NOT NULL com defaults
- [ ] Migração de dados para linhas existentes
- [ ] Tratamento de tipo enum

### Fase 5: Gerar o Relatório

```json
{
  "timestamp": "2026-01-29T10:00:00Z",
  "story_id": "6.3",
  "framework": "prisma",
  "summary": {
    "schema_changes": 3,
    "migrations_found": 2,
    "missing_migrations": 1,
    "issues": 2
  },
  "validation": {...},
  "issues": [...],
  "recommendations": [...]
}
```

---

## Formato do Problema

```json
{
  "id": "MIG-001",
  "type": "MISSING_MIGRATION",
  "severity": "CRITICAL",
  "schema_change": {
    "file": "prisma/schema.prisma",
    "line": 45,
    "change": "Added field 'email_verified' to User model"
  },
  "expected": "Migration file adding email_verified column",
  "found": null,
  "fix": {
    "description": "Generate migration for schema change",
    "command": "npx prisma migrate dev --name add_email_verified"
  }
}
```

---

## Mapeamento de Severidade

| Tipo de Problema                     | Severidade | Bloqueante  |
| ------------------------------------ | -------- | ----------- |
| Migration ausente para mudança de schema | CRITICAL | Sim         |
| Migration não corresponde ao schema  | CRITICAL | Sim         |
| Migration destrutiva não reversível  | HIGH     | Recomendado |
| Índice ausente em foreign key        | MEDIUM   | Não         |
| Política RLS ausente (Supabase)      | HIGH     | Recomendado |
| Migration não testada localmente     | HIGH     | Recomendado |
| Sem migration de down                | MEDIUM   | Não         |

---

## Integração com a Revisão de QA

Esta task se integra ao pipeline de revisão de QA:

```
*review-build {story}
├── Fase 1-5: Verificações padrão
├── Fase 6.0: Validação de Bibliotecas
├── Fase 6.1: Checklist de Segurança
├── Fase 6.2: Validação de Migrations ← ESTA TASK
└── Fase 7-10: Continuar a revisão
```

**Gatilho:** Chamada automaticamente durante o `*review-build` se mudanças de schema forem detectadas
**Manual:** Pode ser executada isoladamente via `*validate-migrations`

---

## Exemplo de Saída

```json
{
  "timestamp": "2026-01-29T10:30:00Z",
  "story_id": "6.3",
  "framework": "supabase",
  "framework_version": "1.142.0",
  "summary": {
    "schema_changes_detected": 2,
    "migrations_found": 1,
    "migrations_missing": 1,
    "migrations_applied": 1,
    "issues_found": 2,
    "blocking": true
  },
  "schema_changes": [
    {
      "type": "NEW_TABLE",
      "name": "user_preferences",
      "file": "supabase/migrations/20260129_create_user_preferences.sql",
      "migration_exists": true,
      "migration_applied": true
    },
    {
      "type": "NEW_COLUMN",
      "table": "users",
      "column": "last_login_at",
      "file": null,
      "migration_exists": false,
      "migration_applied": false
    }
  ],
  "issues": [
    {
      "id": "MIG-001",
      "type": "MISSING_MIGRATION",
      "severity": "CRITICAL",
      "description": "New column 'last_login_at' on 'users' table has no migration",
      "schema_location": "Code references users.last_login_at",
      "fix": {
        "description": "Create migration for new column",
        "command": "supabase migration new add_last_login_to_users",
        "sql": "ALTER TABLE users ADD COLUMN last_login_at TIMESTAMPTZ;"
      }
    },
    {
      "id": "MIG-002",
      "type": "MISSING_RLS",
      "severity": "HIGH",
      "description": "New table 'user_preferences' has no RLS policies",
      "migration_file": "20260129_create_user_preferences.sql",
      "fix": {
        "description": "Add RLS policies for user_preferences",
        "sql": [
          "ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;",
          "CREATE POLICY \"Users can view own preferences\" ON user_preferences FOR SELECT USING (auth.uid() = user_id);",
          "CREATE POLICY \"Users can update own preferences\" ON user_preferences FOR UPDATE USING (auth.uid() = user_id);"
        ]
      }
    }
  ],
  "passed_checks": [
    {
      "check": "migration_format",
      "status": "PASS",
      "details": "Migration SQL syntax is valid"
    },
    {
      "check": "migration_applied",
      "status": "PASS",
      "details": "Migration 20260129_create_user_preferences applied successfully"
    },
    {
      "check": "foreign_key_indexes",
      "status": "PASS",
      "details": "All foreign keys have indexes"
    }
  ],
  "recommendation": "BLOCK - 1 CRITICAL issue (missing migration) must be fixed before merge"
}
```

---

## Template de Checklist

Para cada revisão de migration:

```yaml
migration_checklist:
  existence:
    - [ ] Arquivo de migration existe para cada mudança de schema
    - [ ] O timestamp da migration é recente
    - [ ] A nomenclatura da migration segue a convenção

  content:
    - [ ] SQL/código corresponde à mudança de schema pretendida
    - [ ] Os tipos de coluna estão corretos
    - [ ] As constraints estão definidas (NOT NULL, UNIQUE, etc.)
    - [ ] Valores default especificados onde necessário

  indexes:
    - [ ] Chaves primárias definidas
    - [ ] Índices de foreign key criados
    - [ ] Índices por padrão de query adicionados

  security:
    - [ ] Políticas RLS para novas tabelas (Supabase)
    - [ ] Grants/permissões configurados
    - [ ] Colunas sensíveis protegidas

  reversibility:
    - [ ] Migration de down existe
    - [ ] Migration de down testada
    - [ ] Preservação de dados considerada

  testing:
    - [ ] A migration roda localmente
    - [ ] A migration é idempotente (pode rodar duas vezes)
    - [ ] Dados existentes preservados/migrados
```

---

## Critérios de Saída

Esta task está completa quando:

- O framework de banco de dados foi detectado
- Todas as mudanças de schema foram identificadas
- Os arquivos de migration foram validados contra as mudanças
- Migrations ausentes foram reportadas
- Políticas RLS foram verificadas (se Supabase)
- A reversibilidade foi avaliada
- O relatório foi gerado com classificação de severidade
- A recomendação de bloqueio foi fornecida

---

_Absorvida do Auto-Claude PR Review System - Phase 5_
_AIOX QA Enhancement v1.0_
