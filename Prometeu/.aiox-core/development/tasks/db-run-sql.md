---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Task: Executar SQL

**Propósito**: Executar arquivo SQL ou SQL inline com segurança transacional e medição de tempo

**Elicit**: true

---

## Modos de Execução

**Escolha o modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com logging
- Interação mínima com o usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Balanceado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pre-Flight - Planejamento Completo Antecipado
- Fase de análise da task (identificar todas as ambiguidades)
- Execução com zero ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: dbRunSql()
responsável: Dara (Sage)
responsavel_type: Agente
atomic_layer: Config

**Entrada:**
- campo: query
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Query SQL válida

- campo: params
  tipo: object
  origem: User Input
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
  - [ ] Conexão com o banco de dados estabelecida; sintaxe da query válida
    tipo: pre-condition
    blocker: true
    validação: |
      Check database connection established; query syntax valid
    error_message: "Pre-condition failed: Database connection established; query syntax valid"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a conclusão da task

**Checklist:**

```yaml
post-conditions:
  - [ ] Query executada; resultados retornados; transação commitada
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
  - [ ] Dados persistidos corretamente; constraints respeitadas; sem dados órfãos
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
  - **Propósito:** Conexão com o banco de dados Neo4j e execução de queries
  - **Origem:** npm: neo4j-driver

- **Ferramenta:** query-validator
  - **Propósito:** Validação de sintaxe de queries Cypher
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

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Falha de Conexão
   - **Causa:** Não foi possível conectar ao banco de dados Neo4j
   - **Resolução:** Verifique a string de conexão, credenciais, rede
   - **Recuperação:** Repetir com backoff exponencial (máximo de 3 tentativas)

2. **Erro:** Erro de Sintaxe da Query
   - **Causa:** Sintaxe de query Cypher inválida
   - **Resolução:** Valide a sintaxe da query antes da execução
   - **Recuperação:** Retornar erro de sintaxe detalhado, sugerir correção

3. **Erro:** Rollback de Transação
   - **Causa:** A query viola constraints ou timeout
   - **Resolução:** Revise a lógica e as constraints da query
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

- `sql` (string): Um caminho de arquivo ou uma instrução SQL inline

---

## Processo

### 1. Determinar o Tipo de Entrada

Verifique se a entrada é um arquivo ou SQL inline:

```bash
if [ -f "{sql}" ]; then
  echo "Mode: File"
  SQL_FILE="{sql}"
  SQL_MODE="file"
else
  echo "Mode: Inline SQL"
  SQL_MODE="inline"
  SQL_CONTENT="{sql}"
fi
```

### 2. Pré-visualizar o SQL

Mostre o que será executado:

```bash
echo "=========================================="
echo "SQL TO BE EXECUTED:"
echo "=========================================="

if [ "$SQL_MODE" = "file" ]; then
  cat "$SQL_FILE"
else
  echo "$SQL_CONTENT"
fi

echo ""
echo "=========================================="
```

### 3. Verificações de Segurança

Avise sobre operações perigosas:

```bash
# Check for destructive operations
DANGEROUS_PATTERNS="DROP TABLE|TRUNCATE|DELETE FROM.*WHERE.*1=1|UPDATE.*WHERE.*1=1"

if echo "$SQL_CONTENT" | grep -Eiq "$DANGEROUS_PATTERNS"; then
  echo "⚠️  WARNING: Potentially destructive operation detected!"
  echo ""
  echo "Detected patterns:"
  echo "$SQL_CONTENT" | grep -Ei "$DANGEROUS_PATTERNS"
  echo ""
  echo "Database: $SUPABASE_DB_URL (redacted)"
  echo ""
  echo "Continue? Type 'I UNDERSTAND THE RISKS' to proceed:"
  read CONFIRM
  [ "$CONFIRM" = "I UNDERSTAND THE RISKS" ] || { echo "Aborted"; exit 1; }
fi
```

### 4. Seleção do Modo de Transação

Pergunte ao usuário sobre o tratamento da transação:

```
Transaction mode:
1. auto   - Wrap in BEGIN/COMMIT (safe, rolls back on error)
2. manual - Execute as-is (file may have own transaction control)
3. read   - Read-only transaction (safe for queries)

Select mode (1/2/3):
```

### 5. Executar o SQL

Execute com o modo de transação selecionado e medição de tempo:

```bash
echo "Executing SQL..."

if [ "$TRANSACTION_MODE" = "auto" ]; then
  # Wrapped transaction
  (
    echo "BEGIN;"
    if [ "$SQL_MODE" = "file" ]; then
      cat "$SQL_FILE"
    else
      echo "$SQL_CONTENT"
    fi
    echo "COMMIT;"
  ) | psql "$SUPABASE_DB_URL" \
      -v ON_ERROR_STOP=1 \
      --echo-errors \
      2>&1 | tee /tmp/dbsage_sql_output.txt

elif [ "$TRANSACTION_MODE" = "read" ]; then
  # Read-only transaction
  (
    echo "BEGIN TRANSACTION READ ONLY;"
    if [ "$SQL_MODE" = "file" ]; then
      cat "$SQL_FILE"
    else
      echo "$SQL_CONTENT"
    fi
    echo "COMMIT;"
  ) | psql "$SUPABASE_DB_URL" \
      -v ON_ERROR_STOP=1 \
      2>&1 | tee /tmp/dbsage_sql_output.txt

else
  # Manual mode (no wrapper)
  if [ "$SQL_MODE" = "file" ]; then
    psql "$SUPABASE_DB_URL" \
      -v ON_ERROR_STOP=1 \
      -f "$SQL_FILE" \
      2>&1 | tee /tmp/dbsage_sql_output.txt
  else
    psql "$SUPABASE_DB_URL" \
      -v ON_ERROR_STOP=1 \
      -c "$SQL_CONTENT" \
      2>&1 | tee /tmp/dbsage_sql_output.txt
  fi
fi

EXIT_CODE=$?
```

### 6. Verificar Resultados

Exiba o resumo da execução:

```bash
echo ""
echo "=========================================="
echo "EXECUTION SUMMARY"
echo "=========================================="

if [ $EXIT_CODE -eq 0 ]; then
  echo "✅ SUCCESS"
else
  echo "❌ FAILED (Exit code: $EXIT_CODE)"
  echo ""
  echo "Error output saved to: /tmp/dbsage_sql_output.txt"
  exit $EXIT_CODE
fi

# Count affected rows (if available in output)
ROWS_AFFECTED=$(grep -oP 'INSERT 0 \K\d+|UPDATE \K\d+|DELETE \K\d+' /tmp/dbsage_sql_output.txt | head -1)
if [ -n "$ROWS_AFFECTED" ]; then
  echo "Rows affected: $ROWS_AFFECTED"
fi

# Execution time (if using \timing in psql)
EXEC_TIME=$(grep -oP 'Time: \K[\d.]+' /tmp/dbsage_sql_output.txt | tail -1)
if [ -n "$EXEC_TIME" ]; then
  echo "Execution time: ${EXEC_TIME}ms"
fi
```

---

## Saída

Exiba o resumo final:

```
✅ SQL EXECUTED SUCCESSFULLY

Mode:           {file|inline}
Transaction:    {auto|manual|read}
Rows affected:  {count}
Duration:       {time}ms

Output saved to: /tmp/dbsage_sql_output.txt

Next steps:
- Verify results in database
- Check for expected side effects
- Update application if schema changed
```

---

## Exemplos de Uso

### Exemplo 1: Executar Arquivo SQL

```bash
*run-sql supabase/migrations/20240101_add_users.sql
```

### Exemplo 2: Query Inline

```bash
*run-sql "SELECT COUNT(*) FROM users WHERE created_at > NOW() - INTERVAL '7 days'"
```

### Exemplo 3: Inline Multilinha

```bash
*run-sql "
  UPDATE users
  SET last_login = NOW()
  WHERE id = 'user-123'
  RETURNING *;
"
```

### Exemplo 4: Script Complexo

```bash
*run-sql "
  DO $$
  DECLARE
    user_count INTEGER;
  BEGIN
    SELECT COUNT(*) INTO user_count FROM users;
    RAISE NOTICE 'Total users: %', user_count;
  END $$;
"
```

---

## Recursos de Segurança

### 1. Detecção de Operação Destrutiva

Avisa automaticamente para:
- `DROP TABLE`
- `TRUNCATE`
- `DELETE FROM ... WHERE 1=1`
- `UPDATE ... WHERE 1=1`

### 2. Modos de Transação

**Modo Auto (Recomendado):**
- Envolve o SQL em BEGIN/COMMIT
- Rollback automático em caso de erro
- Seguro para modificações

**Modo Manual:**
- Para arquivos com controle de transação próprio
- Use quando o script tiver múltiplas transações
- Mais controle, menos segurança

**Modo Read:**
- Transação somente-leitura
- Não pode modificar dados
- Seguro para queries/exploração

### 3. Tratamento de Erros

- `ON_ERROR_STOP=1` para no primeiro erro
- A transação faz rollback em caso de erro (modo auto)
- Saída de erro completa preservada

---

## Opções Avançadas

### Habilitar Medição de Tempo

```bash
# Add timing to all queries
psql "$SUPABASE_DB_URL" << 'EOF'
\timing on
{your_sql_here}
EOF
```

### Saída Verbosa

```bash
# Show all SQL commands
psql "$SUPABASE_DB_URL" --echo-all -f script.sql
```

### Salvar a Saída em Arquivo

```bash
# Redirect output
psql "$SUPABASE_DB_URL" -f script.sql > output.txt 2>&1
```

### Modo Interativo

```bash
# Drop into psql shell
psql "$SUPABASE_DB_URL"
```

---

## Operações SQL Comuns

### 1. Consultar Dados

```sql
SELECT
  id,
  email,
  created_at
FROM users
WHERE created_at > NOW() - INTERVAL '1 day'
ORDER BY created_at DESC
LIMIT 10;
```

### 2. Atualizar Registros

```sql
UPDATE users
SET
  last_login = NOW(),
  login_count = login_count + 1
WHERE id = 'user-123'
RETURNING *;
```

### 3. Operações em Massa

```sql
-- Update all inactive users
UPDATE users
SET status = 'archived'
WHERE last_login < NOW() - INTERVAL '1 year'
  AND status = 'active';
```

### 4. Análise de Dados

```sql
-- Aggregation query
SELECT
  DATE_TRUNC('day', created_at) AS day,
  COUNT(*) AS new_users,
  COUNT(*) FILTER (WHERE email_verified) AS verified
FROM users
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY day
ORDER BY day DESC;
```

---

## Meta-Comandos psql

Comandos úteis quando estiver no modo interativo do psql:

```
\dt              -- List tables
\d table_name    -- Describe table
\df              -- List functions
\dv              -- List views
\l               -- List databases
\c database      -- Connect to database
\timing on       -- Enable query timing
\x on            -- Expanded display mode
\q               -- Quit
\?               -- Help
```

---

## Tratamento de Erros

Se a execução falhar:

1. Verifique a mensagem de erro na saída
2. Revise a sintaxe SQL
3. Verifique se os nomes de tabela/coluna existem
4. Verifique as permissões
5. Para erros de transação, verifique as constraints

Erros comuns:

- **Erro de sintaxe:** Revise a sintaxe SQL
- **Relation does not exist:** Tabela/view não encontrada
- **Column does not exist:** Erro de digitação no nome da coluna
- **Permission denied:** Necessita de role/permissões apropriadas

---

## Notas de Segurança

- **Nunca** execute SQL não confiável
- Sempre revise o SQL antes de executar
- Use o modo somente-leitura para queries não confiáveis
- Tenha cuidado com SQL dinâmico
- Considere usar prepared statements para entrada do usuário

---

## Referências

- [PostgreSQL psql Documentation](https://www.postgresql.org/docs/current/app-psql.html)
- [PostgreSQL SQL Commands](https://www.postgresql.org/docs/current/sql-commands.html)
