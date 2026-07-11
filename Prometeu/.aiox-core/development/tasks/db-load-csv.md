---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Task: Load CSV Data Safely

**Propósito**: Importar dados CSV usando PostgreSQL COPY com tabela de staging e validação

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
task: dbLoadCsv()
responsável: Dara (Sage)
responsavel_type: Agente
atomic_layer: Config

**Entrada:**
- campo: query
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Valid SQL query

- campo: params
  tipo: object
  origem: User Input
  obrigatório: false
  validação: Query parameters

- campo: connection
  tipo: object
  origem: config
  obrigatório: true
  validação: Valid PostgreSQL connection via Supabase

**Saída:**
- campo: query_result
  tipo: array
  destino: Memory
  persistido: false

- campo: records_affected
  tipo: number
  destino: Return value
  persistido: false

- campo: execution_time
  tipo: number
  destino: Memory
  persistido: false
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

**Propósito:** Validar o sucesso da execução DEPOIS que a task termina

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

- **Ferramenta:** neo4j-driver
  - **Propósito:** Conexão com banco de dados Neo4j e execução de queries
  - **Fonte:** npm: neo4j-driver

- **Ferramenta:** query-validator
  - **Propósito:** Validação de sintaxe de query Cypher
  - **Fonte:** .aiox-core/utils/db-query-validator.js

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** db-query.js
  - **Propósito:** Executar queries Neo4j com tratamento de erros
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/scripts/db-query.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Connection Failed
   - **Causa:** Não foi possível conectar ao banco de dados Neo4j
   - **Resolução:** Verificar connection string, credenciais, rede
   - **Recuperação:** Retentar com backoff exponencial (máximo 3 tentativas)

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
duration_expected: 2-10 min (estimated)
cost_estimated: $0.001-0.008
token_usage: ~800-2,500 tokens
```

**Notas de Otimização:**
- Validar a configuração cedo; usar escritas atômicas; implementar checkpoints de rollback

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


## Entradas

- `table` (string): Nome da tabela de destino
- `csv_file` (string): Caminho para o arquivo CSV

---

## Processo

### 1. Validar Entradas

Verificar se o arquivo existe e se a tabela existe:

```bash
echo "Validating inputs..."

# Verificar se o arquivo CSV existe
[ -f "{csv_file}" ] || {
  echo "❌ File not found: {csv_file}"
  exit 1
}

# Verificar se a tabela existe
psql "$SUPABASE_DB_URL" -c \
"SELECT EXISTS (
  SELECT 1 FROM information_schema.tables
  WHERE table_schema = 'public' AND table_name = '{table}'
);" | grep -q t || {
  echo "❌ Table '{table}' not found"
  exit 1
}

# Contar linhas do CSV
ROW_COUNT=$(wc -l < "{csv_file}" | tr -d ' ')
echo "✓ CSV file: {csv_file} ($ROW_COUNT rows)"
echo "✓ Target table: {table}"
```

### 2. Pré-visualizar a Estrutura do CSV

Mostrar as primeiras linhas:

```bash
echo "CSV Preview (first 5 rows):"
head -n 5 "{csv_file}"
echo ""
echo "Continue with import? (yes/no)"
read CONFIRM
[ "$CONFIRM" = "yes" ] || { echo "Aborted"; exit 0; }
```

### 3. Criar a Tabela de Staging

Importar primeiro para a staging para validação:

```bash
echo "Creating staging table..."

psql "$SUPABASE_DB_URL" << 'EOF'
-- Criar tabela de staging com a mesma estrutura da tabela de destino
CREATE TEMP TABLE {table}_staging (LIKE {table} INCLUDING ALL);

-- Ou, se você precisar definir a estrutura manualmente:
-- CREATE TEMP TABLE {table}_staging (
--   id TEXT,
--   name TEXT,
--   created_at TEXT
--   -- Defina todas as colunas como TEXT inicialmente para parsing flexível
-- );

SELECT 'Staging table created' AS status;
EOF

echo "✓ Staging table ready"
```

### 4. COPY dos Dados para a Staging

Usar o comando COPY do PostgreSQL (método mais rápido):

```bash
echo "Loading CSV into staging table..."

# Método 1: Usando psql \copy (arquivo no lado do cliente)
psql "$SUPABASE_DB_URL" << 'EOF'
\copy {table}_staging FROM '{csv_file}' WITH (
  FORMAT csv,
  HEADER true,
  DELIMITER ',',
  QUOTE '"',
  ESCAPE '"',
  NULL 'NULL'
);
EOF

# Método 2: COPY no lado do servidor (se o arquivo estiver no servidor)
# COPY {table}_staging FROM '/path/to/file.csv' WITH (FORMAT csv, HEADER true);

echo "✓ Data loaded to staging"
```

### 5. Validar os Dados

Rodar verificações de validação antes do merge:

```bash
echo "Validating staged data..."

psql "$SUPABASE_DB_URL" << 'EOF'
-- Verificar a contagem de linhas
SELECT COUNT(*) AS staged_rows FROM {table}_staging;

-- Verificar NULL em colunas obrigatórias (exemplo)
SELECT COUNT(*) AS null_ids
FROM {table}_staging
WHERE id IS NULL;

-- Verificar duplicatas (exemplo)
SELECT id, COUNT(*) AS duplicates
FROM {table}_staging
GROUP BY id
HAVING COUNT(*) > 1;

-- Verificar se os tipos de dados podem ser convertidos (exemplo)
SELECT
  COUNT(*) FILTER (WHERE created_at::timestamptz IS NULL) AS invalid_dates
FROM {table}_staging;

-- Alguma falha de validação?
SELECT
  CASE
    WHEN EXISTS (SELECT 1 FROM {table}_staging WHERE id IS NULL) THEN
      'FAIL: NULL ids found'
    WHEN EXISTS (SELECT 1 FROM {table}_staging GROUP BY id HAVING COUNT(*) > 1) THEN
      'FAIL: Duplicate ids found'
    ELSE
      'PASS: All validations passed'
  END AS validation_status;
EOF

echo ""
echo "Review validation results above."
echo "Continue with merge? (yes/no)"
read CONFIRM
[ "$CONFIRM" = "yes" ] || { echo "Aborted - data in staging table for review"; exit 1; }
```

### 6. Merge para a Tabela de Destino

Usar o padrão UPSERT para idempotência:

```bash
echo "Merging to target table..."

psql "$SUPABASE_DB_URL" << 'EOF'
BEGIN;

-- Inserir novas linhas ou atualizar as existentes (idempotente)
INSERT INTO {table} (id, name, created_at, ...)
SELECT
  id::uuid,                  -- Fazer cast para os tipos corretos
  name,
  created_at::timestamptz,
  ...
FROM {table}_staging
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  created_at = EXCLUDED.created_at,
  updated_at = NOW();  -- Atualizar o timestamp

-- Obter as contagens
SELECT
  (SELECT COUNT(*) FROM {table}) AS final_count,
  (SELECT COUNT(*) FROM {table}_staging) AS imported_count;

COMMIT;

SELECT 'Import complete' AS status;
EOF

echo "✓ Data merged successfully"
```

### 7. Limpeza

Remover a tabela de staging:

```bash
echo "Cleaning up..."

psql "$SUPABASE_DB_URL" << 'EOF'
DROP TABLE IF EXISTS {table}_staging;
EOF

echo "✓ Cleanup complete"
```

---

## Saída

Exibir o resumo da importação:

```
✅ CSV IMPORT COMPLETE

CSV File:       {csv_file}
Target Table:   {table}
Rows Imported:  {count}
Duration:       {duration}s

Validation:
✓ No NULL in required columns
✓ No duplicate keys
✓ All data types valid

Next steps:
- Verify data in database
- Run smoke tests if needed
- Update statistics: ANALYZE {table};
```

---

## Boas Práticas

### Requisitos de Formato do CSV

**Obrigatório:**
- Codificação UTF-8
- Delimitadores consistentes (vírgula recomendada)
- Linha de cabeçalho com os nomes das colunas
- Strings entre aspas se contiverem delimitadores

**Exemplo:**
```csv
id,name,email,created_at
"user-1","John Doe","john@example.com","2024-01-01 00:00:00"
"user-2","Jane Smith","jane@example.com","2024-01-02 00:00:00"
```

### Lidando com Arquivos Grandes

Para arquivos CSV > 100MB ou > 1M de linhas:

1. **Dividir o arquivo:**
```bash
split -l 100000 large.csv chunk_
```

2. **Importar em lotes:**
```bash
for file in chunk_*; do
  *load-csv {table} $file
done
```

3. **Ou usar COPY em streaming:**
```bash
cat large.csv | psql "$SUPABASE_DB_URL" -c \
  "COPY {table} FROM STDIN WITH (FORMAT csv, HEADER true);"
```

### Conversão de Tipos de Dados

Sempre faça cast de TEXT para os tipos corretos no SELECT:

```sql
SELECT
  id::uuid,                    -- UUID
  amount::numeric(10,2),       -- Decimal
  created_at::timestamptz,     -- Timestamp
  is_active::boolean,          -- Boolean
  metadata::jsonb             -- JSON
FROM {table}_staging
```

---

## Problemas Comuns

### Problema 1: Codificação de Caracteres

**Erro:** `invalid byte sequence for encoding "UTF8"`

**Correção:**
```bash
# Converter para UTF-8
iconv -f ISO-8859-1 -t UTF-8 input.csv > output.csv
```

### Problema 2: Conflitos de Aspas/Delimitador

**Erro:** `unterminated CSV quoted field`

**Correção:** Ajustar os parâmetros do COPY:
```sql
COPY table FROM 'file.csv' WITH (
  DELIMITER ';',    -- Mudar o delimitador
  QUOTE '''',       -- Mudar o caractere de aspas
  ESCAPE '\'       -- Mudar o caractere de escape
);
```

### Problema 3: Valores NULL

**Erro:** `null value in column "id" violates not-null constraint`

**Correção:** Definir a representação de NULL:
```sql
COPY table FROM 'file.csv' WITH (
  NULL 'NULL',      -- Tratar o literal "NULL" como NULL
  -- Or NULL ''     -- Tratar strings vazias como NULL
);
```

---

## Notas de Segurança

- **Nunca** faça COPY de fontes não confiáveis sem validação
- Sempre use primeiro a tabela de staging
- Valide os tipos de dados e as constraints antes do merge
- Verifique SQL injection no conteúdo do CSV (embora o COPY seja seguro)
- Considere row-level security (RLS) ao carregar no Supabase

---

## Dicas de Performance

1. **Desabilitar triggers durante a carga em massa:**
```sql
ALTER TABLE {table} DISABLE TRIGGER ALL;
-- Carregar os dados
ALTER TABLE {table} ENABLE TRIGGER ALL;
```

2. **Remover índices, carregar, recriar:**
```sql
-- Apenas para cargas iniciais, não para atualizações!
DROP INDEX idx_name;
-- Carregar os dados
CREATE INDEX CONCURRENTLY idx_name ON {table}(column);
```

3. **Usar tabelas UNLOGGED para staging:**
```sql
CREATE UNLOGGED TABLE {table}_staging (...);
-- Escritas mais rápidas, mas não seguras contra crash
```

4. **Commits em lote:**
```sql
-- Para cargas muito grandes
BEGIN;
COPY ... -- Carregar 100k linhas
COMMIT;
BEGIN;
COPY ... -- Carregar as próximas 100k linhas
COMMIT;
```

---

## Alternativa: INSERT a partir da Aplicação

Para conjuntos de dados pequenos (<1000 linhas), pode-se usar o INSERT comum:

```javascript
// Exemplo de client do Supabase
const { data, error } = await supabase
  .from('table')
  .upsert(csvData, { onConflict: 'id' })
```

Mas o COPY é **10-100x mais rápido** para cargas em massa!

---

## Referências

- [Documentação do PostgreSQL COPY](https://www.postgresql.org/docs/current/sql-copy.html)
- [Comando psql \copy](https://www.postgresql.org/docs/current/app-psql.html)
