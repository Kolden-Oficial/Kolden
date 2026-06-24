# Task: Aplicar Template de PolÃ­tica RLS

**PropÃ³sito**: Instalar polÃ­ticas RLS KISS ou granulares em uma tabela

**Elicit**: true

---

## Modos de ExecuÃ§Ã£o

**Escolha seu modo de execuÃ§Ã£o:**

### 1. Modo YOLO - RÃ¡pido, AutÃ´nomo (0-1 prompts)
- Tomada de decisÃ£o autÃ´noma com registro em log
- InteraÃ§Ã£o mÃ­nima com o usuÃ¡rio
- **Melhor para:** Tarefas simples e determinÃ­sticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃƒO]**
- Checkpoints de decisÃ£o explÃ­citos
- ExplicaÃ§Ãµes educativas
- **Melhor para:** Aprendizado, decisÃµes complexas

### 3. Planejamento Pre-Flight - Planejamento Abrangente Antecipado
- Fase de anÃ¡lise da task (identificar todas as ambiguidades)
- ExecuÃ§Ã£o sem ambiguidade
- **Melhor para:** Requisitos ambÃ­guos, trabalho crÃ­tico

**ParÃ¢metro:** `mode` (opcional, padrÃ£o: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: dbPolicyApply()
responsÃ¡vel: Dara (Sage)
responsavel_type: Agente
atomic_layer: Config

**Entrada:**
- campo: query
  tipo: string
  origem: Entrada do UsuÃ¡rio
  obrigatÃ³rio: true
  validaÃ§Ã£o: Query SQL vÃ¡lida

- campo: params
  tipo: object
  origem: Entrada do UsuÃ¡rio
  obrigatÃ³rio: false
  validaÃ§Ã£o: ParÃ¢metros da query

- campo: connection
  tipo: object
  origem: config
  obrigatÃ³rio: true
  validaÃ§Ã£o: ConexÃ£o PostgreSQL vÃ¡lida via Supabase

**SaÃ­da:**
- campo: query_result
  tipo: array
  destino: MemÃ³ria
  persistido: false

- campo: records_affected
  tipo: number
  destino: Valor de retorno
  persistido: false

- campo: execution_time
  tipo: number
  destino: MemÃ³ria
  persistido: false
```

---

## PrÃ©-CondiÃ§Ãµes

**PropÃ³sito:** Validar os prÃ©-requisitos ANTES da execuÃ§Ã£o da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] ConexÃ£o com o banco de dados estabelecida; sintaxe da query vÃ¡lida
    tipo: pre-condition
    blocker: true
    validaÃ§Ã£o: |
      Verificar se a conexÃ£o com o banco de dados estÃ¡ estabelecida; sintaxe da query vÃ¡lida
    error_message: "PrÃ©-condiÃ§Ã£o falhou: ConexÃ£o com o banco de dados estabelecida; sintaxe da query vÃ¡lida"
```

---

## PÃ³s-CondiÃ§Ãµes

**PropÃ³sito:** Validar o sucesso da execuÃ§Ã£o DEPOIS que a task Ã© concluÃ­da

**Checklist:**

```yaml
post-conditions:
  - [ ] Query executada; resultados retornados; transaÃ§Ã£o commitada
    tipo: post-condition
    blocker: true
    validaÃ§Ã£o: |
      Verificar se a query foi executada; resultados retornados; transaÃ§Ã£o commitada
    error_message: "PÃ³s-condiÃ§Ã£o falhou: Query executada; resultados retornados; transaÃ§Ã£o commitada"
```

---

## CritÃ©rios de Aceite

**PropÃ³sito:** CritÃ©rios definitivos de pass/fail para a conclusÃ£o da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Dados persistidos corretamente; constraints respeitadas; sem dados Ã³rfÃ£os
    tipo: acceptance-criterion
    blocker: true
    validaÃ§Ã£o: |
      Afirmar que os dados foram persistidos corretamente; constraints respeitadas; sem dados Ã³rfÃ£os
    error_message: "CritÃ©rio de aceite nÃ£o atendido: Dados persistidos corretamente; constraints respeitadas; sem dados Ã³rfÃ£os"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** neo4j-driver
  - **PropÃ³sito:** ConexÃ£o com o banco de dados Neo4j e execuÃ§Ã£o de queries
  - **Origem:** npm: neo4j-driver

- **Ferramenta:** query-validator
  - **PropÃ³sito:** ValidaÃ§Ã£o da sintaxe de queries Cypher
  - **Origem:** .aiox-core/utils/db-query-validator.js

---

## Scripts

**CÃ³digo especÃ­fico do agente para esta task:**

- **Script:** db-query.js
  - **PropÃ³sito:** Executar queries Neo4j com tratamento de erros
  - **Linguagem:** JavaScript
  - **LocalizaÃ§Ã£o:** .aiox-core/scripts/db-query.js

---

## Tratamento de Erros

**EstratÃ©gia:** abort

**Erros Comuns:**

1. **Erro:** Falha na ConexÃ£o
   - **Causa:** NÃ£o foi possÃ­vel conectar ao banco de dados Neo4j
   - **ResoluÃ§Ã£o:** Verificar a string de conexÃ£o, credenciais, rede
   - **RecuperaÃ§Ã£o:** Retentar com backoff exponencial (mÃ¡ximo de 3 tentativas)

2. **Erro:** Erro de Sintaxe na Query
   - **Causa:** Sintaxe de query Cypher invÃ¡lida
   - **ResoluÃ§Ã£o:** Validar a sintaxe da query antes da execuÃ§Ã£o
   - **RecuperaÃ§Ã£o:** Retornar erro de sintaxe detalhado, sugerir correÃ§Ã£o

3. **Erro:** Rollback de TransaÃ§Ã£o
   - **Causa:** A query viola constraints ou atinge timeout
   - **ResoluÃ§Ã£o:** Revisar a lÃ³gica da query e as constraints
   - **RecuperaÃ§Ã£o:** Rollback automÃ¡tico, preservar a integridade dos dados

---

## Performance

**MÃ©tricas Esperadas:**

```yaml
duration_expected: 2-10 min (estimated)
cost_estimated: $0.001-0.008
token_usage: ~800-2,500 tokens
```

**Notas de OtimizaÃ§Ã£o:**
- Validar a configuraÃ§Ã£o cedo; usar escritas atÃ´micas; implementar checkpoints de rollback

---

## Metadata

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


## ðŸš€ NOVO: Use o Instalador Automatizado de PolÃ­ticas RLS (RECOMENDADO)

**Economia de Tokens: 89% | Economia de Tempo: ~85%**

```bash
# Use the rls-policy-installer script
./Squads/super-agentes/scripts/database-operations/rls-policy-installer.sh {table} {mode}

# Examples:
./Squads/super-agentes/scripts/database-operations/rls-policy-installer.sh minds kiss
./Squads/super-agentes/scripts/database-operations/rls-policy-installer.sh sources read-only
./Squads/super-agentes/scripts/database-operations/rls-policy-installer.sh fragments private

# Available modes: kiss, read-only, private, team, custom

# Benefits:
#   - Standardized policy templates
#   - Automatic testing after installation
#   - Safety checks for existing policies
#   - 89% token savings
```

**OU continue com a instalaÃ§Ã£o manual da polÃ­tica abaixo:**

---

## Entradas

- `table` (string): Nome da tabela em que aplicar a polÃ­tica
- `mode` (string): 'kiss' ou 'granular' - tipo de polÃ­tica

---

## Processo (MÃ©todo Manual)

### 1. Validar as Entradas

Verifique se a tabela existe e se o modo Ã© vÃ¡lido:

```bash
echo "Validating inputs..."

# Check table exists
psql "$SUPABASE_DB_URL" -c \
"SELECT EXISTS (
  SELECT 1 FROM information_schema.tables
  WHERE table_schema = 'public' AND table_name = '{table}'
);" | grep -q t || {
  echo "âŒ Table '{table}' not found"
  exit 1
}

# Check mode
if [[ "{mode}" != "kiss" && "{mode}" != "granular" ]]; then
  echo "âŒ Invalid mode: {mode}"
  echo "   Use 'kiss' or 'granular'"
  exit 1
fi

echo "âœ“ Table exists: {table}"
echo "âœ“ Mode: {mode}"
```

### 2. Verificar PolÃ­ticas Existentes

Exiba o status atual de RLS:

```bash
echo "Checking existing RLS policies..."

psql "$SUPABASE_DB_URL" << EOF
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = '{table}';
EOF

echo ""
echo "RLS enabled on {table}?"
psql "$SUPABASE_DB_URL" -c \
"SELECT relrowsecurity FROM pg_class WHERE relname = '{table}';" \
| grep -q t && echo "âœ“ Yes" || echo "âš ï¸  No (will be enabled)"
```

### 3. Pedir ConfirmaÃ§Ã£o ao UsuÃ¡rio

Apresente a polÃ­tica que serÃ¡ aplicada com base no modo:

**Se mode = 'kiss':**
```
Will apply KISS policy to {table}:
- Enable RLS
- Single policy: users can only access their own rows
- Uses: (select auth.uid()) = user_id [PERFORMANCE OPTIMIZED]
- Applies to: SELECT, INSERT, UPDATE, DELETE

âš ï¸  CRITICAL PERFORMANCE NOTE:
Wrapping auth.uid() in SELECT provides 99.99% performance improvement
by allowing PostgreSQL to cache the function result.

Continue? (yes/no)
```

**Se mode = 'granular':**
```
Will apply granular policies to {table}:
- Enable RLS
- Separate policies for each operation (SELECT, INSERT, UPDATE, DELETE)
- Fine-grained control
- Uses: auth.uid() = user_id

Continue? (yes/no)
```

Obtenha a confirmaÃ§Ã£o antes de prosseguir.

### 4. Gerar o SQL da PolÃ­tica

Com base no modo, gere o SQL apropriado:

**Modo KISS:**
```sql
-- Enable RLS
ALTER TABLE {table} ENABLE ROW LEVEL SECURITY;

-- Drop existing policies (if any)
DROP POLICY IF EXISTS "{table}_policy" ON {table};

-- Create single KISS policy (PERFORMANCE OPTIMIZED)
CREATE POLICY "{table}_policy"
  ON {table}
  FOR ALL
  TO authenticated
  USING (
    -- âœ… CRITICAL: Wrap auth.uid() in SELECT for 99.99% performance gain
    -- This allows PostgreSQL to cache the function result per statement
    (select auth.uid()) IS NOT NULL AND
    (select auth.uid()) = user_id
  )
  WITH CHECK (
    (select auth.uid()) IS NOT NULL AND
    (select auth.uid()) = user_id
  );

-- Add helpful comment
COMMENT ON POLICY "{table}_policy" ON {table} IS
  'KISS policy: users can only access their own rows (performance optimized with cached auth.uid())';
```

**Modo Granular (OTIMIZADO PARA PERFORMANCE):**
```sql
-- Enable RLS
ALTER TABLE {table} ENABLE ROW LEVEL SECURITY;

-- Drop existing policies (if any)
DROP POLICY IF EXISTS "{table}_select" ON {table};
DROP POLICY IF EXISTS "{table}_insert" ON {table};
DROP POLICY IF EXISTS "{table}_update" ON {table};
DROP POLICY IF EXISTS "{table}_delete" ON {table};

-- SELECT: Users read own rows
-- âœ… Wrapping auth.uid() in SELECT provides 99.99% performance improvement
CREATE POLICY "{table}_select"
  ON {table}
  FOR SELECT
  TO authenticated
  USING (
    (select auth.uid()) IS NOT NULL AND
    (select auth.uid()) = user_id
  );

-- INSERT: Users create own rows
CREATE POLICY "{table}_insert"
  ON {table}
  FOR INSERT
  TO authenticated
  WITH CHECK (
    (select auth.uid()) IS NOT NULL AND
    (select auth.uid()) = user_id
  );

-- UPDATE: Users update own rows
CREATE POLICY "{table}_update"
  ON {table}
  FOR UPDATE
  TO authenticated
  USING (
    (select auth.uid()) IS NOT NULL AND
    (select auth.uid()) = user_id
  )
  WITH CHECK (
    (select auth.uid()) IS NOT NULL AND
    (select auth.uid()) = user_id
  );

-- DELETE: Users delete own rows
CREATE POLICY "{table}_delete"
  ON {table}
  FOR DELETE
  TO authenticated
  USING (
    (select auth.uid()) IS NOT NULL AND
    (select auth.uid()) = user_id
  );

-- Add helpful comments
COMMENT ON POLICY "{table}_select" ON {table} IS 'Users can read own rows (cached auth.uid())';
COMMENT ON POLICY "{table}_insert" ON {table} IS 'Users can insert own rows (cached auth.uid())';
COMMENT ON POLICY "{table}_update" ON {table} IS 'Users can update own rows (cached auth.uid())';
COMMENT ON POLICY "{table}_delete" ON {table} IS 'Users can delete own rows (cached auth.uid())';
```

### 5. Criar o Arquivo de Migration

Salve o SQL da polÃ­tica em um arquivo de migration:

```bash
TS=$(date +%Y%m%d%H%M%S)
MIGRATION_FILE="supabase/migrations/${TS}_rls_${mode}__{table}.sql"

mkdir -p supabase/migrations

cat > "$MIGRATION_FILE" << 'EOF'
-- Migration: Apply {mode} RLS policy to {table}
-- Generated: $(date -u +"%Y-%m-%d %H:%M:%S UTC")
-- Table: {table}
-- Mode: {mode}

BEGIN;

[... SQL from step 4 ...]

COMMIT;
EOF

echo "âœ“ Migration created: $MIGRATION_FILE"
```

### 6. Aplicar a Migration

Use a task db-apply-migration existente:

```bash
echo "Applying migration..."
# Execute db-apply-migration task internally
# (This will create snapshots, apply, verify)
```

### 7. Testar as PolÃ­ticas

Verifique se as polÃ­ticas funcionam corretamente:

```bash
echo "Testing RLS policies..."

# Test 1: Anonymous user should see nothing
psql "$SUPABASE_DB_URL" << EOF
SET ROLE anon;
SELECT COUNT(*) AS anon_count FROM {table};
RESET ROLE;
EOF

# Test 2: Authenticated user should see only their rows
# (Requires setting up test user - provide instructions)

echo ""
echo "âœ“ Policy tests complete"
echo "  âš ï¸  Manual testing recommended:"
echo "    - Use *impersonate to test as specific user"
echo "    - Verify each operation (SELECT, INSERT, UPDATE, DELETE)"
```

---

## SaÃ­da

Exiba o resumo:
```
âœ… RLS POLICY APPLIED

Table:     {table}
Mode:      {mode}
Migration: supabase/migrations/{TS}_rls_{mode}__{table}.sql
Policies:  [list created policies]

Next steps:
1. Test policies manually: *impersonate {user_id}
2. Run RLS audit: *rls-audit
3. Update documentation
4. Commit migration to git
```

---

## Notas

### KISS vs Granular

**KISS** (Keep It Simple, Stupid):
- âœ… PolÃ­tica Ãºnica para todas as operaÃ§Ãµes
- âœ… Mais fÃ¡cil de entender
- âœ… Menos verboso
- âŒ Menos flexÃ­vel

**Granular**:
- âœ… PolÃ­ticas separadas por operaÃ§Ã£o
- âœ… Controle granular
- âœ… Pode ter lÃ³gica diferente por operaÃ§Ã£o
- âŒ Mais verboso

### PadrÃµes Comuns

**Leitura PÃºblica, Escrita Autenticada (Otimizado para Performance):**
```sql
-- SELECT: Public
CREATE POLICY "{table}_select" ON {table}
  FOR SELECT TO public
  USING (true);

-- INSERT/UPDATE/DELETE: Authenticated users only
CREATE POLICY "{table}_write" ON {table}
  FOR ALL TO authenticated
  USING (
    (select auth.uid()) IS NOT NULL AND
    (select auth.uid()) = user_id
  )
  WITH CHECK (
    (select auth.uid()) IS NOT NULL AND
    (select auth.uid()) = user_id
  );
```

**Baseado em Tenant (Otimizado para Performance):**
```sql
CREATE POLICY "{table}_tenant" ON {table}
  FOR ALL TO authenticated
  USING (
    (select auth.uid()) IS NOT NULL AND
    tenant_id IN (
      SELECT tenant_id FROM user_tenants
      WHERE user_id = (select auth.uid())
    )
  );
```

### Dicas de Performance

**OtimizaÃ§Ã£o CrÃ­tica de Performance:**
Sempre envolva `auth.uid()` em um statement `SELECT`:
```sql
-- âŒ SLOW (99.99% slower)
USING (auth.uid() = user_id)

-- âœ… FAST (cached per statement)
USING ((select auth.uid()) = user_id)
```

**Por que isso importa:**
- Sem SELECT: o PostgreSQL chama `auth.uid()` para CADA linha
- Com SELECT: o PostgreSQL cacheia o resultado para o statement inteiro
- Ganho de performance: **99.99%** (essencialmente 10.000x mais rÃ¡pido em tabelas grandes)

**RecomendaÃ§Ãµes de Ãndices:**
- Sempre indexe as colunas usadas nas polÃ­ticas (ex.: `user_id`, `tenant_id`)
- Exemplo: `CREATE INDEX idx_{table}_user_id ON {table}(user_id);`
- Ganho de performance: **99.94%** quando combinado com funÃ§Ãµes de auth envolvidas

---

## Avisos de SeguranÃ§a âš ï¸

### CRÃTICO: NÃƒO Use raw_user_meta_data nas PolÃ­ticas

```sql
-- âŒ DANGEROUS - User can modify this data!
CREATE POLICY "bad_policy" ON {table}
  USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );
```

**Por que Ã© perigoso:** `raw_user_meta_data` pode ser modificado pelo usuÃ¡rio atravÃ©s do Supabase Auth client. Um atacante pode definir `{ "role": "admin" }` e burlar a seguranÃ§a!

**Alternativa segura:** Use `raw_app_meta_data` (somente do servidor):
```sql
-- âœ… SAFE - Only server can modify app_metadata
CREATE POLICY "safe_policy" ON {table}
  USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );
```

### VerificaÃ§Ã£o de NULL no Auth

Sempre verifique se o usuÃ¡rio estÃ¡ autenticado:
```sql
-- âŒ Missing NULL check
USING (auth.uid() = user_id)  -- Fails silently for anon users

-- âœ… Explicit authentication check
USING (
  (select auth.uid()) IS NOT NULL AND
  (select auth.uid()) = user_id
)
```

### DepuraÃ§Ã£o de PolÃ­ticas

Habilite as polÃ­ticas RLS no SQL Editor (apenas dev):
```sql
-- Temporarily disable RLS for debugging (DANGEROUS - dev only!)
ALTER TABLE {table} DISABLE ROW LEVEL SECURITY;

-- Re-enable when done
ALTER TABLE {table} ENABLE ROW LEVEL SECURITY;
```

---

## PrÃ©-requisitos

A tabela deve ter:
- Coluna `user_id UUID` (para polÃ­ticas baseadas em usuÃ¡rio)
- Ou coluna `tenant_id` (para polÃ­ticas baseadas em tenant)
- **Ãndices em todas as colunas de filtro da polÃ­tica** (crÃ­tico para a performance!)
  - `CREATE INDEX idx_{table}_user_id ON {table}(user_id);`

---

## Tratamento de Erros

Se a aplicaÃ§Ã£o da polÃ­tica falhar:
1. Verifique se a tabela tem as colunas necessÃ¡rias (user_id, etc.)
2. Verifique se auth.uid() estÃ¡ disponÃ­vel (Supabase)
3. Verifique se hÃ¡ polÃ­ticas existentes com os mesmos nomes
4. Reverta a migration se necessÃ¡rio: `*rollback`
