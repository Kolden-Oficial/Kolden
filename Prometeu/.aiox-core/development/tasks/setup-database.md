---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Task: Setup Database

**PropÃ³sito**: ConfiguraÃ§Ã£o interativa de projeto de banco de dados (Supabase, PostgreSQL, MongoDB, MySQL, SQLite)

**Elicit**: true

**Renomeado De (Story 6.1.2.3):**
- `db-supabase-setup.md` - Agora agnÃ³stico de banco de dados (suporta 5+ tipos de DB)

---

## Modos de ExecuÃ§Ã£o

**Escolha seu modo de execuÃ§Ã£o:**

### 1. Modo YOLO - RÃ¡pido, AutÃ´nomo (0-1 prompts)
- Tomada de decisÃ£o autÃ´noma com logging
- InteraÃ§Ã£o mÃ­nima com o usuÃ¡rio
- **Melhor para:** Tarefas simples e determinÃ­sticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃƒO]**
- Checkpoints explÃ­citos de decisÃ£o
- ExplicaÃ§Ãµes educativas
- **Melhor para:** Aprendizado, decisÃµes complexas

### 3. Planejamento Pre-Flight - Planejamento Antecipado Abrangente
- Fase de anÃ¡lise da task (identificar todas as ambiguidades)
- ExecuÃ§Ã£o sem ambiguidade
- **Melhor para:** Requisitos ambÃ­guos, trabalho crÃ­tico

**ParÃ¢metro:** `mode` (opcional, padrÃ£o: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: setupDatabase()
responsÃ¡vel: Dara (Sage)
responsavel_type: Agente
atomic_layer: Config

**Entrada:**
- campo: project_path
  tipo: string
  origem: User Input
  obrigatÃ³rio: true
  validaÃ§Ã£o: Valid directory path

- campo: options
  tipo: object
  origem: User Input
  obrigatÃ³rio: false
  validaÃ§Ã£o: Initialization options

**SaÃ­da:**
- campo: initialized_project
  tipo: string
  destino: File system
  persistido: true

- campo: config_created
  tipo: boolean
  destino: Return value
  persistido: false
```

---

## PrÃ©-CondiÃ§Ãµes

**PropÃ³sito:** Validar prÃ©-requisitos ANTES da execuÃ§Ã£o da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Directory is empty or force flag set; config valid
    tipo: pre-condition
    blocker: true
    validaÃ§Ã£o: |
      Check directory is empty or force flag set; config valid
    error_message: "Pre-condition failed: Directory is empty or force flag set; config valid"
```

---

## PÃ³s-CondiÃ§Ãµes

**PropÃ³sito:** Validar o sucesso da execuÃ§Ã£o APÃ“S a task ser concluÃ­da

**Checklist:**

```yaml
post-conditions:
  - [ ] Project initialized; config files created; structure valid
    tipo: post-condition
    blocker: true
    validaÃ§Ã£o: |
      Verify project initialized; config files created; structure valid
    error_message: "Post-condition failed: Project initialized; config files created; structure valid"
```

---

## CritÃ©rios de Aceite

**PropÃ³sito:** CritÃ©rios definitivos de pass/fail para a conclusÃ£o da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Project structure correct; all config files valid
    tipo: acceptance-criterion
    blocker: true
    validaÃ§Ã£o: |
      Assert project structure correct; all config files valid
    error_message: "Acceptance criterion not met: Project structure correct; all config files valid"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** project-scaffolder
  - **PropÃ³sito:** Gerar estrutura de projeto e configuraÃ§Ã£o
  - **Fonte:** .aiox-core/scripts/project-scaffolder.js

- **Ferramenta:** config-manager
  - **PropÃ³sito:** Inicializar arquivos de configuraÃ§Ã£o
  - **Fonte:** .aiox-core/utils/config-manager.js

---

## Scripts

**CÃ³digo especÃ­fico do agente para esta task:**

- **Script:** init-project.js
  - **PropÃ³sito:** Workflow de inicializaÃ§Ã£o do projeto
  - **Linguagem:** JavaScript
  - **LocalizaÃ§Ã£o:** .aiox-core/scripts/init-project.js

---

## Tratamento de Erros

**EstratÃ©gia:** retry

**Erros Comuns:**

1. **Erro:** Directory Not Empty
   - **Causa:** O diretÃ³rio alvo jÃ¡ contÃ©m arquivos
   - **ResoluÃ§Ã£o:** Usar flag force ou escolher um diretÃ³rio vazio
   - **RecuperaÃ§Ã£o:** Solicitar confirmaÃ§Ã£o, mesclar ou abortar

2. **Erro:** Initialization Failed
   - **Causa:** Erro ao criar a estrutura do projeto
   - **ResoluÃ§Ã£o:** Verificar permissÃµes e espaÃ§o em disco
   - **RecuperaÃ§Ã£o:** Limpar inicializaÃ§Ã£o parcial, registrar erro

---

## Performance

**MÃ©tricas Esperadas:**

```yaml
duration_expected: 2-10 min (estimated)
cost_estimated: $0.001-0.008
token_usage: ~800-2,500 tokens
```

**Notas de OtimizaÃ§Ã£o:**
- Validar configuraÃ§Ã£o cedo; usar escritas atÃ´micas; implementar checkpoints de rollback

---

## Metadados

```yaml
story: N/A
version: 1.0.0
dependencies:
  - N/A
tags:
  - automation
  - workflow
updated_at: 2025-11-17
```

---


## ElicitaÃ§Ã£o

**Passo 1: Detectar ou solicitar o tipo de banco de dados**

```bash
# Auto-detectar a partir do PRD ou tech stack, se disponÃ­vel
if grep -qiE "supabase|postgres" docs/prd/*.yaml docs/architecture/*.yaml 2>/dev/null; then
  DETECTED_DB="postgresql"
  echo "ðŸ“Š Detected database: PostgreSQL/Supabase"
elif grep -qiE "mongodb|mongo" docs/prd/*.yaml docs/architecture/*.yaml 2>/dev/null; then
  DETECTED_DB="mongodb"
  echo "ðŸ“Š Detected database: MongoDB"
elif grep -qiE "mysql|mariadb" docs/prd/*.yaml docs/architecture/*.yaml 2>/dev/null; then
  DETECTED_DB="mysql"
  echo "ðŸ“Š Detected database: MySQL"
elif grep -qiE "sqlite" docs/prd/*.yaml docs/architecture/*.yaml 2>/dev/null; then
  DETECTED_DB="sqlite"
  echo "ðŸ“Š Detected database: SQLite"
else
  DETECTED_DB=""
fi
```

**Solicitar ao usuÃ¡rio:**

```
Selecione o tipo de banco de dados:

1. **supabase** - PostgreSQL + RLS + Realtime + Edge Functions
2. **postgresql** - PostgreSQL padrÃ£o (self-hosted ou gerenciado)
3. **mongodb** - Banco de dados de documentos NoSQL
4. **mysql** - Banco de dados relacional MySQL ou MariaDB
5. **sqlite** - Banco de dados SQLite embarcado

Qual banco de dados? [supabase/postgresql/mongodb/mysql/sqlite]:
```

**Captura:** `{db_type}` (padrÃ£o: $DETECTED_DB se disponÃ­vel)

---

## Processo por Tipo de Banco de Dados

### Tipo: Supabase

**Quando:** O usuÃ¡rio seleciona `supabase`

#### Passo 1: Instalar o Supabase CLI

```bash
\echo '=== Installing Supabase CLI ==='

# Verificar se jÃ¡ estÃ¡ instalado
if command -v supabase &> /dev/null; then
  echo "âœ“ Supabase CLI already installed: $(supabase --version)"
else
  echo "Installing Supabase CLI..."

  # macOS/Linux
  if [[ "$OSTYPE" == "darwin"* ]]; then
    brew install supabase/tap/supabase
  else
    # Linux
    curl -fsSL https://github.com/supabase/cli/releases/latest/download/supabase_linux_amd64.tar.gz | tar -xz
    sudo mv supabase /usr/local/bin/
  fi

  echo "âœ“ Supabase CLI installed"
fi
```

#### Passo 2: Inicializar o Projeto Supabase

```bash
\echo ''
\echo '=== Initializing Supabase Project ==='

# Inicializar projeto local
supabase init

echo "âœ“ Created supabase/ directory structure"
```

#### Passo 3: Criar DiretÃ³rios PadrÃ£o

```bash
mkdir -p supabase/migrations
mkdir -p supabase/seed.sql
mkdir -p supabase/tests
mkdir -p supabase/functions

echo "âœ“ Created standard Supabase directories"
```

#### Passo 4: Criar Migration Inicial

```bash
cat > supabase/migrations/$(date +%Y%m%d%H%M%S)_initial_schema.sql <<'SQL'
-- Initial Schema Migration
-- Generated by AIOX data-engineer

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";

-- Example: Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Example RLS policy
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  USING (auth.uid() = id);

-- Add updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
SQL

echo "âœ“ Created initial migration"
```

#### Passo 5: Criar Seed Data Inicial

```bash
cat > supabase/seed.sql <<'SQL'
-- Seed Data
-- Generated by AIOX data-engineer

-- Example seed user (for local development only)
INSERT INTO users (id, email)
VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'test@example.com')
ON CONFLICT (email) DO NOTHING;
SQL

echo "âœ“ Created seed data file"
```

#### Passo 6: Iniciar Desenvolvimento Local

```bash
\echo ''
\echo '=== Starting Local Supabase ==='

supabase start

echo ""
echo "âœ“ Supabase is running locally"
echo ""
echo "ðŸ“‹ Next steps:"
echo "  1. supabase migration new {name} - Create new migration"
echo "  2. supabase db push - Push migrations to remote"
echo "  3. supabase db reset - Reset local database"
echo "  4. supabase status - View local services"
```

---

### Tipo: PostgreSQL (PadrÃ£o)

**Quando:** O usuÃ¡rio seleciona `postgresql`

#### Passo 1: Criar Estrutura do Projeto

```bash
\echo '=== Setting Up PostgreSQL Project ==='

mkdir -p database/migrations
mkdir -p database/seeds
mkdir -p database/scripts

echo "âœ“ Created PostgreSQL project structure"
```

#### Passo 2: Criar ConfiguraÃ§Ã£o de ConexÃ£o

```bash
cat > database/.env.example <<'ENV'
# PostgreSQL Connection
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=myapp_development
POSTGRES_USER=postgres
POSTGRES_PASSWORD=changeme

# Connection URL
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}
ENV

cp database/.env.example database/.env

echo "âœ“ Created .env configuration"
```

#### Passo 3: Criar Migration Inicial

```bash
cat > database/migrations/001_initial_schema.sql <<'SQL'
-- Initial Schema Migration
-- Generated by AIOX data-engineer

BEGIN;

-- Example: Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

COMMIT;
SQL

echo "âœ“ Created initial migration"
```

#### Passo 4: Criar Script Executor de Migrations

```bash
cat > database/scripts/migrate.sh <<'BASH'
#!/bin/bash
set -e

# Load environment
source database/.env

echo "Running migrations..."

for migration in database/migrations/*.sql; do
  echo "Applying: $migration"
  psql "$DATABASE_URL" -f "$migration"
done

echo "âœ“ All migrations applied"
BASH

chmod +x database/scripts/migrate.sh

echo "âœ“ Created migration runner"
```

---

### Tipo: MongoDB

**Quando:** O usuÃ¡rio seleciona `mongodb`

#### Passo 1: Criar Estrutura do Projeto

```bash
\echo '=== Setting Up MongoDB Project ==='

mkdir -p database/migrations
mkdir -p database/seeds
mkdir -p database/schemas

echo "âœ“ Created MongoDB project structure"
```

#### Passo 2: Criar ConfiguraÃ§Ã£o de ConexÃ£o

```bash
cat > database/.env.example <<'ENV'
# MongoDB Connection
MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_DB=myapp_development
MONGO_USER=admin
MONGO_PASSWORD=changeme

# Connection URL
MONGO_URL=mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=admin
ENV

cp database/.env.example database/.env

echo "âœ“ Created .env configuration"
```

#### Passo 3: Criar Schema Inicial

```bash
cat > database/schemas/users.js <<'JS'
// User Schema
// Generated by AIOX data-engineer

module.exports = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["email", "createdAt"],
      properties: {
        email: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        createdAt: {
          bsonType: "date",
          description: "must be a date and is required"
        },
        updatedAt: {
          bsonType: "date"
        }
      }
    }
  }
};
JS

echo "âœ“ Created user schema"
```

#### Passo 4: Criar Seed Data

```bash
cat > database/seeds/users.json <<'JSON'
[
  {
    "email": "test@example.com",
    "createdAt": {"$date": "2025-01-01T00:00:00.000Z"},
    "updatedAt": {"$date": "2025-01-01T00:00:00.000Z"}
  }
]
JSON

echo "âœ“ Created seed data"
```

---

### Tipo: MySQL

**Quando:** O usuÃ¡rio seleciona `mysql`

#### Passo 1: Criar Estrutura do Projeto

```bash
\echo '=== Setting Up MySQL Project ==='

mkdir -p database/migrations
mkdir -p database/seeds
mkdir -p database/scripts

echo "âœ“ Created MySQL project structure"
```

#### Passo 2: Criar ConfiguraÃ§Ã£o de ConexÃ£o

```bash
cat > database/.env.example <<'ENV'
# MySQL Connection
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DB=myapp_development
MYSQL_USER=root
MYSQL_PASSWORD=changeme

# Connection URL
DATABASE_URL=mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DB}
ENV

cp database/.env.example database/.env

echo "âœ“ Created .env configuration"
```

#### Passo 3: Criar Migration Inicial

```bash
cat > database/migrations/001_initial_schema.sql <<'SQL'
-- Initial Schema Migration
-- Generated by AIOX data-engineer

-- Example: Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
SQL

echo "âœ“ Created initial migration"
```

---

### Tipo: SQLite

**Quando:** O usuÃ¡rio seleciona `sqlite`

#### Passo 1: Criar Estrutura do Projeto

```bash
\echo '=== Setting Up SQLite Project ==='

mkdir -p database/migrations
mkdir -p database/seeds

echo "âœ“ Created SQLite project structure"
```

#### Passo 2: Criar Migration Inicial

```bash
cat > database/migrations/001_initial_schema.sql <<'SQL'
-- Initial Schema Migration
-- Generated by AIOX data-engineer

-- Example: Users table
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Trigger for updated_at
CREATE TRIGGER IF NOT EXISTS update_users_updated_at
AFTER UPDATE ON users
BEGIN
  UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;
SQL

echo "âœ“ Created initial migration"
```

#### Passo 3: Criar o Banco de Dados

```bash
sqlite3 database/myapp_development.db < database/migrations/001_initial_schema.sql

echo "âœ“ Created SQLite database"
```

---

## PrÃ³ximos Passos Comuns (Todos os Bancos de Dados)

```
ðŸ“‹ Database setup complete!

Next steps:
  1. Configure environment variables (.env file)
  2. Create your schema design (*create-schema)
  3. Generate migrations (*create-migration-plan)
  4. Apply migrations (*apply-migration)
  5. Set up RLS policies (Supabase/PostgreSQL only: *policy-apply)
  6. Add seed data (*seed)

Related commands:
  - *create-schema - Design database schema
  - *apply-migration {path} - Run migrations
  - *security-audit - Check RLS coverage (PostgreSQL)
  - *analyze-performance - Optimize queries
```

---

## Exemplos de SaÃ­da

### SaÃ­da do Supabase

```
=== Installing Supabase CLI ===
âœ“ Supabase CLI already installed: 1.27.7

=== Initializing Supabase Project ===
âœ“ Created supabase/ directory structure
âœ“ Created standard Supabase directories
âœ“ Created initial migration
âœ“ Created seed data file

=== Starting Local Supabase ===
Started supabase local development setup.

         API URL: http://localhost:54321
          DB URL: postgresql://postgres:postgres@localhost:54322/postgres
      Studio URL: http://localhost:54323

âœ“ Supabase is running locally
```

### SaÃ­da do PostgreSQL

```
=== Setting Up PostgreSQL Project ===
âœ“ Created PostgreSQL project structure
âœ“ Created .env configuration
âœ“ Created initial migration
âœ“ Created migration runner

ðŸ“‹ Database setup complete!
```

---

## Comandos Relacionados

- `*env-check` - Validar variÃ¡veis de ambiente do banco de dados
- `*bootstrap` - Comando de setup alternativo com mais opÃ§Ãµes
- `*create-schema` - Projetar o schema do banco de dados
- `*apply-migration` - Executar migrations
- `*setup-supabase` - Comando legado (depreciado, use `*setup-database supabase`)

---

**Nota:** Esta task substitui `db-supabase-setup.md` pela versÃ£o agnÃ³stica de banco de dados (renomeada na Story 6.1.2.3)
