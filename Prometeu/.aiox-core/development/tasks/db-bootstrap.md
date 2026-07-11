---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Task: Bootstrap Supabase Project

**Propósito**: Criar a estrutura padrão de projeto Supabase

**Elicit**: true

---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com logging
- Interação mínima com o usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pre-Flight - Planejamento Antecipado Abrangente
- Fase de análise da task (identificar todas as ambiguidades)
- Execução com zero ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: dbBootstrap()
responsible: Dara (Sage)
responsible_type: Agent
atomic_layer: Organism

inputs:
  - field: query
    type: string
    source: User Input
    required: true
    validation: Valid SQL query

  - field: params
    type: object
    source: User Input
    required: false
    validation: Query parameters

  - field: connection
    type: object
    source: config
    required: true
    validation: Valid PostgreSQL connection via Supabase

outputs:
  - field: query_result
    type: array
    destination: Memory
    persisted: false

  - field: records_affected
    type: number
    destination: Return value
    persisted: false

  - field: execution_time
    type: number
    destination: Memory
    persisted: false
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Database connection established; query syntax valid
    tipo: pre-condition
    blocker: true
    validação: |
      Check database connection established; query syntax valid
    error_message: "Pre-condition failed: Database connection established; query syntax valid"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução DEPOIS que a task é concluída

**Checklist:**

```yaml
post-conditions:
  - [ ] Query executed; results returned; transaction committed
    tipo: post-condition
    blocker: true
    validação: |
      Verify query executed; results returned; transaction committed
    error_message: "Post-condition failed: Query executed; results returned; transaction committed"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de pass/fail para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Data persisted correctly; constraints respected; no orphaned data
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Assert data persisted correctly; constraints respected; no orphaned data
    error_message: "Acceptance criterion not met: Data persisted correctly; constraints respected; no orphaned data"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** supabase
  - **Propósito:** Conexão com banco de dados PostgreSQL via cliente Supabase
  - **Fonte:** @supabase/supabase-js

- **Ferramenta:** query-validator
  - **Propósito:** Validação de sintaxe de query SQL
  - **Fonte:** .aiox-core/utils/db-query-validator.js

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** db-query.js
  - **Propósito:** Executar queries PostgreSQL com tratamento de erros via Supabase
  - **Language:** JavaScript
  - **Location:** .aiox-core/scripts/db-query.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Connection Failed
   - **Causa:** Não foi possível conectar ao banco de dados Neo4j
   - **Resolução:** Verificar a connection string, as credenciais e a rede
   - **Recuperação:** Tentar novamente com backoff exponencial (máximo de 3 tentativas)

2. **Erro:** Query Syntax Error
   - **Causa:** Sintaxe de query Cypher inválida
   - **Resolução:** Validar a sintaxe da query antes da execução
   - **Recuperação:** Retornar erro de sintaxe detalhado, sugerir correção

3. **Erro:** Transaction Rollback
   - **Causa:** A query viola constraints ou atinge timeout
   - **Resolução:** Revisar a lógica da query e as constraints
   - **Recuperação:** Rollback automático, preservar a integridade dos dados

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 5-15 min (estimated)
cost_estimated: $0.003-0.010
token_usage: ~3,000-10,000 tokens
```

**Notas de Otimização:**
- Dividir em workflows menores; implementar checkpointing; usar processamento assíncrono sempre que possível

---

## Metadados

```yaml
story: N/A
version: 1.0.0
dependencies:
  - N/A
tags:
  - database
  - infrastructure
updated_at: 2025-11-17
```

---


## Processo

### 1. Confirmar a Configuração do Projeto

Pergunte ao usuário:

**Nome do projeto**: (ex.: "mmos-platform")

**Incluir templates iniciais?**
1. Minimal - Apenas diretórios
2. Standard - Diretórios + READMEs + config
3. Full - Tudo + exemplo de schema baseline

### 2. Criar a Estrutura de Diretórios

```bash
mkdir -p supabase/{migrations,seeds,tests,rollback,snapshots,docs}

echo "✓ Created directories:
  supabase/migrations/    - Schema migrations
  supabase/seeds/         - Seed data
  supabase/tests/         - Smoke tests
  supabase/rollback/      - Rollback scripts
  supabase/snapshots/     - Schema snapshots
  supabase/docs/          - Documentation"
```

### 3. Criar os Arquivos Centrais

#### supabase/migrations/README.md

```markdown
# Migrations

## Nomenclatura: YYYYMMDDHHMMSS_description.sql

Exemplo: 20251026120000_baseline_schema.sql

## Ordem (dentro de cada arquivo):
1. Extensions
2. Tables + Constraints
3. Functions
4. Triggers
5. RLS (enable + policies)
6. Views

## Workflow:
*verify-order migration.sql  # Check order
*dry-run migration.sql       # Test
*snapshot pre_migration      # Create rollback point
*apply-migration migration.sql  # Apply
*smoke-test                  # Validate
```

#### supabase/seeds/README.md

```markdown
# Seeds

## Nomenclatura: YYYYMMDDHHMMSS_description_seed.sql

## Tipos:
- Required: Dados que o app precisa para funcionar
- Test: Dados de exemplo para desenvolvimento
- Reference: Tabelas de lookup (países, categorias)

## Padrão idempotente:
INSERT INTO table (id, name) VALUES (1, 'value')
ON CONFLICT (id) DO NOTHING;
```

#### supabase/tests/README.md

```markdown
# Tests

## Smoke tests (validação pós-migration):
- Tabelas existem
- RLS habilitado
- Políticas instaladas
- Funções chamáveis
- Queries básicas funcionam

## Executar: *smoke-test
```

#### supabase/rollback/README.md

```markdown
# Rollback

## Snapshots (automáticos):
Criados pelos comandos *apply-migration e *snapshot
Localizados em: ../snapshots/

## Scripts de rollback manuais:
Escreva operações de desfazer explícitas para migrations complexas

Exemplo: YYYYMMDDHHMMSS_rollback_description.sql
```

#### supabase/.gitignore

```gitignore
# Dev local
.env
.env.local
.branches
.temp

# OS
.DS_Store
Thumbs.db

# Opcional: Snapshots (se grandes demais para o git)
# snapshots/*.sql
```

### 4. Gerar config.toml (se Standard ou Full)

```toml
# Supabase Local Development Config

[api]
enabled = true
port = 54321

[db]
port = 54322
shadow_port = 54320
major_version = 15

[db.pooler]
enabled = true
port = 54329
pool_mode = "transaction"

[studio]
enabled = true
port = 54323

[auth]
enabled = true
site_url = "http://localhost:3000"

# See: https://supabase.com/docs/guides/cli/config
```

### 5. Criar o Schema Baseline (se opção Full)

#### supabase/migrations/00000000000000_baseline.sql

```sql
-- Schema Baseline
-- Executar após: supabase init

BEGIN;

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Tabela de exemplo (customize para o seu projeto)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger de updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Grants
GRANT USAGE ON SCHEMA public TO authenticated, anon;
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;

COMMIT;
```

### 6. Criar o Smoke Test Inicial

#### supabase/tests/smoke_test.sql

```sql
-- Smoke test básico
SET client_min_messages = warning;

\echo 'Checking tables...'
SELECT COUNT(*) AS tables FROM information_schema.tables 
WHERE table_schema='public';

\echo 'Checking RLS...'
SELECT COUNT(*) AS rls_enabled FROM pg_tables 
WHERE schemaname='public' AND rowsecurity=true;

\echo 'Checking policies...'
SELECT COUNT(*) AS policies FROM pg_policies 
WHERE schemaname='public';

\echo '✓ Smoke test complete'
```

### 7. Criar o Log de Migration

#### supabase/docs/migration-log.md

```markdown
# Migration Log

## Formato:
### Version X.Y.Z - Descrição (Data)
- Migration: filename.sql
- Status: ✅ Success / ❌ Failed / ⏪ Rolled Back
- Changes: O que mudou
- Rollback: Como desfazer

---

## Baseline (Inicial)
- Migration: 00000000000000_baseline.sql
- Status: ⏳ Pending
- Changes: Estrutura inicial do projeto
- Rollback: N/A (baseline)
```

---

## Saída de Sucesso

```
✅ Supabase Project Bootstrapped

Structure created:
  supabase/
  ├── migrations/      (migration files)
  ├── seeds/          (seed data)
  ├── tests/          (smoke tests)
  ├── rollback/       (rollback scripts)
  ├── snapshots/      (schema snapshots)
  ├── docs/           (documentation)
  ├── config.toml     (local config)
  └── .gitignore

Next steps:
  1. Set SUPABASE_DB_URL in .env
  2. *env-check - Validate setup
  3. *apply-migration supabase/migrations/00000000000000_baseline.sql
  4. *smoke-test - Validate baseline
  5. *snapshot baseline - Create initial snapshot

Documentation:
  - supabase/migrations/README.md
  - supabase/docs/migration-log.md
```

---

## Configuração de Ambiente

Crie o arquivo `.env` na raiz do projeto:

```bash
# Conexão com o Banco de Dados Supabase
# Obtenha em: https://app.supabase.com/project/_/settings/database

# Pooler (recomendado para migrations)
SUPABASE_DB_URL="postgresql://postgres.[PASSWORD]@[PROJECT-REF].supabase.co:6543/postgres?sslmode=require"

# Direto (para backups/análise)
# SUPABASE_DB_URL="postgresql://postgres.[PASSWORD]@[PROJECT-REF].supabase.co:5432/postgres?sslmode=require"
```

**Segurança**:
- ✅ Adicionado ao .gitignore
- ✅ Usar pooler (porta 6543)
- ✅ Exigir SSL

---

## Opções de Projeto

### Minimal (Apenas Diretórios)
```
supabase/
├── migrations/
├── seeds/
├── tests/
├── rollback/
├── snapshots/
└── docs/
```
**Use para**: Projetos existentes, configurações simples

### Standard (+ READMEs + Config)
```
+ README.md files
+ config.toml
+ .gitignore
+ migration-log.md
```
**Use para**: Projetos novos, ambientes de equipe

### Full (+ Schema Baseline)
```
+ baseline.sql migration
+ smoke_test.sql
+ Example profiles table
+ RLS policies
```
**Use para**: Projetos greenfield, aprendizado

---

## Integração com Projetos Existentes

Se `supabase/` já existir:

```bash
# Fazer backup do existente
mv supabase supabase.backup

# Bootstrap do novo
*bootstrap

# Mesclar conforme necessário
cp supabase.backup/migrations/* supabase/migrations/
```

---

## Customização

### Para o Seu Projeto

Substitua o baseline.sql pelas suas tabelas:
- Copie o schema de um DB existente
- Ou projete com: `*create-schema`
- Depois crie o arquivo de migration

### Padrões da Equipe

Edite os READMEs para adicionar:
- Convenções de nomenclatura específicas da equipe
- Revisores obrigatórios para migrations
- Procedimentos de deploy
- Informações de contato

### Integração CI/CD

Adicione ao pipeline:

```yaml
# .github/workflows/db-test.yml
- name: Run smoke tests
  run: |
    /db-sage
    *smoke-test
```

---

## Próximos Passos Após o Bootstrap

1. **Ambiente**: Defina SUPABASE_DB_URL
2. **Validar**: `*env-check`
3. **Projetar**: `*create-schema` (ou use o existente)
4. **Migrar**: `*apply-migration baseline.sql`
5. **Testar**: `*smoke-test`
6. **Snapshot**: `*snapshot baseline`
7. **Documentar**: Atualize o migration-log.md

---

## Problemas Comuns

### "Directory already exists"

**Problema**: a pasta supabase/ existe  
**Opções**:
1. Fazer backup e substituir (recomendado)
2. Mesclar manualmente
3. Escolher um diretório diferente

### "No permission to create directories"

**Problema**: Permissões de arquivo insuficientes  
**Correção**: Verifique se você está na raiz do projeto com acesso de escrita

### "Config conflicts with existing Supabase project"

**Problema**: Já usando o Supabase CLI  
**Solução**: O Bootstrap é compatível com o Supabase CLI
- Mantenha a configuração existente
- Use o bootstrap apenas para organização

---

## Comandos Relacionados

- `*create-schema` - Projetar o schema interativamente
- `*apply-migration {path}` - Executar a primeira migration
- `*smoke-test` - Validar a configuração
- `*snapshot baseline` - Criar o snapshot inicial
- `*env-check` - Validar o ambiente
