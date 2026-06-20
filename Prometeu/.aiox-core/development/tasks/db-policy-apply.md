# Task: Aplicar Template de Política RLS

**Propósito**: Instalar políticas RLS KISS ou granulares em uma tabela

**Elicit**: true

---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com registro em log
- Interação mínima com o usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pre-Flight - Planejamento Abrangente Antecipado
- Fase de análise da task (identificar todas as ambiguidades)
- Execução sem ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Task Definition (AIOX Task Format V1.0)

```yaml
task: dbPolicyApply()
responsável: Dara (Sage)
responsavel_type: Agente
atomic_layer: Config

**Entrada:**
- campo: query
  tipo: string
  origem: Entrada do Usuário
  obrigatório: true
  validação: Query SQL válida

- campo: params
  tipo: object
  origem: Entrada do Usuário
  obrigatório: false
  validação: Parâmetros da query

- campo: connection
  tipo: object
  origem: config
  obrigatório: true
  validação: Conexão PostgreSQL válida via Supabase

**Saída:**
- campo: query_result
  tipo: array
  destino: Memória
  persistido: false

- campo: records_affected
  tipo: number
  destino: Valor de retorno
  persistido: false

- campo: execution_time
  tipo: number
  destino: Memória
  persistido: false
```

---

## Pré-Condições

**Propósito:** Validar os pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Conexão com o banco de dados estabelecida; sintaxe da query válida
    tipo: pre-condition
    blocker: true
    validação: |
      Verificar se a conexão com o banco de dados está estabelecida; sintaxe da query válida
    error_message: "Pré-condição falhou: Conexão com o banco de dados estabelecida; sintaxe da query válida"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução DEPOIS que a task é concluída

**Checklist:**

```yaml
post-conditions:
  - [ ] Query executada; resultados retornados; transação commitada
    tipo: post-condition
    blocker: true
    validação: |
      Verificar se a query foi executada; resultados retornados; transação commitada
    error_message: "Pós-condição falhou: Query executada; resultados retornados; transação commitada"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de pass/fail para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Dados persistidos corretamente; constraints respeitadas; sem dados órfãos
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Afirmar que os dados foram persistidos corretamente; constraints respeitadas; sem dados órfãos
    error_message: "Critério de aceite não atendido: Dados persistidos corretamente; constraints respeitadas; sem dados órfãos"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** neo4j-driver
  - **Propósito:** Conexão com o banco de dados Neo4j e execução de queries
  - **Origem:** npm: neo4j-driver

- **Ferramenta:** query-validator
  - **Propósito:** Validação da sintaxe de queries Cypher
  - **Origem:** .aiox-core/utils/db-query-validator.js

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** db-query.js
  - **Propósito:** Executar queries Neo4j com tratamento de erros
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/scripts/db-query.js

---

## Tratamento de Erros

**Estratégia:** abort

**Erros Comuns:**

1. **Erro:** Falha na Conexão
   - **Causa:** Não foi possível conectar ao banco de dados Neo4j
   - **Resolução:** Verificar a string de conexão, credenciais, rede
   - **Recuperação:** Retentar com backoff exponencial (máximo de 3 tentativas)

2. **Erro:** Erro de Sintaxe na Query
   - **Causa:** Sintaxe de query Cypher inválida
   - **Resolução:** Validar a sintaxe da query antes da execução
   - **Recuperação:** Retornar erro de sintaxe detalhado, sugerir correção

3. **Erro:** Rollback de Transação
   - **Causa:** A query viola constraints ou atinge timeout
   - **Resolução:** Revisar a lógica da query e as constraints
   - **Recuperação:** Rollback automático, preservar a integridade dos dados

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 2-10 min (estimated)
cost_estimated: $0.001-0.008
token_usage: ~800-2,500 tokens
```

**Notas de Otimização:**
- Validar a configuração cedo; usar escritas atômicas; implementar checkpoints de rollback

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


## 🚀 NOVO: Use o Instalador Automatizado de Políticas RLS (RECOMENDADO)

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

**OU continue com a instalação manual da política abaixo:**

---

## Entradas

- `table` (string): Nome da tabela em que aplicar a política
- `mode` (string): 'kiss' ou 'granular' - tipo de política

---

## Processo (Método Manual)

### 1. Validar as Entradas

Verifique se a tabela existe e se o modo é válido:

```bash
echo "Validating inputs..."

# Check table exists
psql "$SUPABASE_DB_URL" -c \
"SELECT EXISTS (
  SELECT 1 FROM information_schema.tables
  WHERE table_schema = 'public' AND table_name = '{table}'
);" | grep -q t || {
  echo "❌ Table '{table}' not found"
  exit 1
}

# Check mode
if [[ "{mode}" != "kiss" && "{mode}" != "granular" ]]; then
  echo "❌ Invalid mode: {mode}"
  echo "   Use 'kiss' or 'granular'"
  exit 1
fi

echo "✓ Table exists: {table}"
echo "✓ Mode: {mode}"
```

### 2. Verificar Políticas Existentes

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
| grep -q t && echo "✓ Yes" || echo "⚠️  No (will be enabled)"
```

### 3. Pedir Confirmação ao Usuário

Apresente a política que será aplicada com base no modo:

**Se mode = 'kiss':**
```
Will apply KISS policy to {table}:
- Enable RLS
- Single policy: users can only access their own rows
- Uses: (select auth.uid()) = user_id [PERFORMANCE OPTIMIZED]
- Applies to: SELECT, INSERT, UPDATE, DELETE

⚠️  CRITICAL PERFORMANCE NOTE:
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

Obtenha a confirmação antes de prosseguir.

### 4. Gerar o SQL da Política

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
    -- ✅ CRITICAL: Wrap auth.uid() in SELECT for 99.99% performance gain
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
-- ✅ Wrapping auth.uid() in SELECT provides 99.99% performance improvement
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

Salve o SQL da política em um arquivo de migration:

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

echo "✓ Migration created: $MIGRATION_FILE"
```

### 6. Aplicar a Migration

Use a task db-apply-migration existente:

```bash
echo "Applying migration..."
# Execute db-apply-migration task internally
# (This will create snapshots, apply, verify)
```

### 7. Testar as Políticas

Verifique se as políticas funcionam corretamente:

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
echo "✓ Policy tests complete"
echo "  ⚠️  Manual testing recommended:"
echo "    - Use *impersonate to test as specific user"
echo "    - Verify each operation (SELECT, INSERT, UPDATE, DELETE)"
```

---

## Saída

Exiba o resumo:
```
✅ RLS POLICY APPLIED

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
- ✅ Política única para todas as operações
- ✅ Mais fácil de entender
- ✅ Menos verboso
- ❌ Menos flexível

**Granular**:
- ✅ Políticas separadas por operação
- ✅ Controle granular
- ✅ Pode ter lógica diferente por operação
- ❌ Mais verboso

### Padrões Comuns

**Leitura Pública, Escrita Autenticada (Otimizado para Performance):**
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

**Otimização Crítica de Performance:**
Sempre envolva `auth.uid()` em um statement `SELECT`:
```sql
-- ❌ SLOW (99.99% slower)
USING (auth.uid() = user_id)

-- ✅ FAST (cached per statement)
USING ((select auth.uid()) = user_id)
```

**Por que isso importa:**
- Sem SELECT: o PostgreSQL chama `auth.uid()` para CADA linha
- Com SELECT: o PostgreSQL cacheia o resultado para o statement inteiro
- Ganho de performance: **99.99%** (essencialmente 10.000x mais rápido em tabelas grandes)

**Recomendações de Índices:**
- Sempre indexe as colunas usadas nas políticas (ex.: `user_id`, `tenant_id`)
- Exemplo: `CREATE INDEX idx_{table}_user_id ON {table}(user_id);`
- Ganho de performance: **99.94%** quando combinado com funções de auth envolvidas

---

## Avisos de Segurança ⚠️

### CRÍTICO: NÃO Use raw_user_meta_data nas Políticas

```sql
-- ❌ DANGEROUS - User can modify this data!
CREATE POLICY "bad_policy" ON {table}
  USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );
```

**Por que é perigoso:** `raw_user_meta_data` pode ser modificado pelo usuário através do Supabase Auth client. Um atacante pode definir `{ "role": "admin" }` e burlar a segurança!

**Alternativa segura:** Use `raw_app_meta_data` (somente do servidor):
```sql
-- ✅ SAFE - Only server can modify app_metadata
CREATE POLICY "safe_policy" ON {table}
  USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );
```

### Verificação de NULL no Auth

Sempre verifique se o usuário está autenticado:
```sql
-- ❌ Missing NULL check
USING (auth.uid() = user_id)  -- Fails silently for anon users

-- ✅ Explicit authentication check
USING (
  (select auth.uid()) IS NOT NULL AND
  (select auth.uid()) = user_id
)
```

### Depuração de Políticas

Habilite as políticas RLS no SQL Editor (apenas dev):
```sql
-- Temporarily disable RLS for debugging (DANGEROUS - dev only!)
ALTER TABLE {table} DISABLE ROW LEVEL SECURITY;

-- Re-enable when done
ALTER TABLE {table} ENABLE ROW LEVEL SECURITY;
```

---

## Pré-requisitos

A tabela deve ter:
- Coluna `user_id UUID` (para políticas baseadas em usuário)
- Ou coluna `tenant_id` (para políticas baseadas em tenant)
- **Índices em todas as colunas de filtro da política** (crítico para a performance!)
  - `CREATE INDEX idx_{table}_user_id ON {table}(user_id);`

---

## Tratamento de Erros

Se a aplicação da política falhar:
1. Verifique se a tabela tem as colunas necessárias (user_id, etc.)
2. Verifique se auth.uid() está disponível (Supabase)
3. Verifique se há políticas existentes com os mesmos nomes
4. Reverta a migration se necessário: `*rollback`
