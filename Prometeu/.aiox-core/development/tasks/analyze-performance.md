# Task: Analisar Performance

**Propósito**: Análise e otimização de performance de queries (explain plans, detecção de hotpaths, otimização interativa)

**Elicit**: true

**Consolidado A Partir De (Story 6.1.2.3):**
- `db-explain.md` - Análise de plano de execução de query
- `db-analyze-hotpaths.md` - Detecção de gargalos de performance
- `query-optimization.md` - Otimização interativa de queries (se existisse)

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

### 3. Planejamento Pré-Voo - Planejamento Abrangente Antecipado
- Fase de análise de tarefa (identificar todas as ambiguidades)
- Execução com zero ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: analyzePerformance()
responsável: Dex (Builder)
responsavel_type: Agente
atomic_layer: Strategy

**Entrada:**
- campo: target
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Caminho ou identificador válido

- campo: options
  tipo: object
  origem: config
  obrigatório: false
  validação: Configuração de análise

- campo: depth
  tipo: number
  origem: User Input
  obrigatório: false
  validação: Padrão: 1 (0-3)

**Saída:**
- campo: analysis_report
  tipo: object
  destino: File (.ai/*.json)
  persistido: true

- campo: findings
  tipo: array
  destino: Memory
  persistido: false

- campo: metrics
  tipo: object
  destino: Memory
  persistido: false
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Target existe e está acessível; ferramentas de análise disponíveis
    tipo: pre-condition
    blocker: true
    validação: |
      Verificar se o target existe e está acessível; ferramentas de análise disponíveis
    error_message: "Pré-condição falhou: Target existe e está acessível; ferramentas de análise disponíveis"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a conclusão da task

**Checklist:**

```yaml
post-conditions:
  - [ ] Análise concluída; relatório gerado; sem problemas críticos
    tipo: post-condition
    blocker: true
    validação: |
      Verificar se a análise foi concluída; relatório gerado; sem problemas críticos
    error_message: "Pós-condição falhou: Análise concluída; relatório gerado; sem problemas críticos"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de aprovação/reprovação para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Análise precisa; todos os targets cobertos; relatório completo
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Afirmar que a análise é precisa; todos os targets cobertos; relatório completo
    error_message: "Critério de aceite não atendido: Análise precisa; todos os targets cobertos; relatório completo"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** code-analyzer
  - **Propósito:** Análise estática de código e métricas
  - **Origem:** .aiox-core/utils/code-analyzer.js

- **Ferramenta:** file-system
  - **Propósito:** Travessia recursiva de diretórios
  - **Origem:** Módulo fs do Node.js

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** analyze-codebase.js
  - **Propósito:** Análise de codebase e geração de relatórios
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/scripts/analyze-codebase.js

---

## Tratamento de Erros

**Estratégia:** fallback

**Erros Comuns:**

1. **Erro:** Target Não Acessível
   - **Causa:** Caminho não existe ou permissões negadas
   - **Resolução:** Verificar o caminho e checar as permissões
   - **Recuperação:** Pular caminhos inacessíveis, continuar com os acessíveis

2. **Erro:** Timeout de Análise
   - **Causa:** A análise excede o limite de tempo para codebases grandes
   - **Resolução:** Reduzir a profundidade ou o escopo da análise
   - **Recuperação:** Retornar resultados parciais com aviso de timeout

3. **Erro:** Limite de Memória Excedido
   - **Causa:** Codebase grande excede a alocação de memória
   - **Resolução:** Processar em lotes ou aumentar o limite de memória
   - **Recuperação:** Degradação graciosa para análise resumida

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 5-20 min (estimado)
cost_estimated: $0.003-0.015
token_usage: ~2.000-8.000 tokens
```

**Notas de Otimização:**
- Análise iterativa com limites de profundidade; cache de resultados intermediários; agrupar operações similares em lote

---

## Metadados

```yaml
story: N/A
version: 1.0.0
dependencies:
  - N/A
tags:
  - analysis
  - metrics
updated_at: 2025-11-17
```

---


## Elicitação

**Solicitar ao usuário que selecione o tipo de análise:**

```
Selecione o tipo de análise de performance:

1. **query** - Analisar o plano de execução de uma query específica
2. **hotpaths** - Detectar gargalos de performance em todo o sistema
3. **interactive** - Sessão interativa de otimização de query

Qual tipo? [query/hotpaths/interactive]:
```

**Capturar:** `{type}`

**Se type=query, também solicitar:**
```
Informe a query SQL a analisar (ou caminho do arquivo):
```

**Capturar:** `{query}`

---

## Processo

### Tipo: Análise de Query (EXPLAIN)

**Quando:** O usuário seleciona `query`

**Propósito:** Analisar o plano de execução de uma query específica

#### Passo 1: Validar a Query

```bash
# Verifica se a query é um caminho de arquivo
if [[ -f "$QUERY" ]]; then
  QUERY_SQL=$(cat "$QUERY")
else
  QUERY_SQL="$QUERY"
fi

# Valida a sintaxe SQL (básico)
echo "$QUERY_SQL" | grep -iE '^(SELECT|WITH|EXPLAIN)' || {
  echo "❌ Erro: A query deve começar com SELECT, WITH ou EXPLAIN"
  exit 1
}
```

#### Passo 2: Rodar EXPLAIN ANALYZE

```bash
psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 <<SQL
\echo '=== Query Performance Analysis ==='
\echo ''
\echo 'Query:'
\echo '$QUERY_SQL'
\echo ''
\echo '=== Execution Plan (EXPLAIN ANALYZE) ==='

EXPLAIN (ANALYZE, BUFFERS, VERBOSE, FORMAT TEXT)
$QUERY_SQL;

\echo ''
\echo '=== JSON Format (for tools) ==='

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
$QUERY_SQL;

SQL
```

#### Passo 3: Analisar os Resultados

```bash
psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 <<'SQL'
\echo ''
\echo '=== Performance Recommendations ==='

-- Verifica sequential scans em tabelas grandes
SELECT
  schemaname,
  tablename,
  seq_scan,
  seq_tup_read,
  idx_scan,
  CASE
    WHEN seq_scan > idx_scan THEN '⚠️ Consider adding index'
    WHEN seq_tup_read > 10000 THEN '⚠️ Large sequential scan detected'
    ELSE '✓ Looks good'
  END AS recommendation
FROM pg_stat_user_tables
WHERE schemaname = 'public'
  AND (seq_scan > idx_scan OR seq_tup_read > 10000)
ORDER BY seq_tup_read DESC
LIMIT 10;

SQL
```

---

### Tipo: Análise de Hotpaths

**Quando:** O usuário seleciona `hotpaths`

**Propósito:** Detectar gargalos de performance em todo o sistema

```bash
psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 <<'SQL'
\echo '=== Performance Hotpaths Analysis ==='
\echo ''

-- 1. Queries mais lentas (requer a extensão pg_stat_statements)
\echo '1. Top 10 Slowest Queries:'
SELECT
  LEFT(query, 80) AS query_preview,
  calls,
  ROUND(total_exec_time::numeric / 1000, 2) AS total_seconds,
  ROUND(mean_exec_time::numeric, 2) AS avg_ms,
  ROUND((100 * total_exec_time / SUM(total_exec_time) OVER ())::numeric, 2) AS percent_total
FROM pg_stat_statements
WHERE query NOT LIKE '%pg_stat_statements%'
ORDER BY total_exec_time DESC
LIMIT 10;

\echo ''
\echo '2. Most Frequent Queries:'
SELECT
  LEFT(query, 80) AS query_preview,
  calls,
  ROUND(mean_exec_time::numeric, 2) AS avg_ms,
  ROUND(total_exec_time::numeric / 1000, 2) AS total_seconds
FROM pg_stat_statements
WHERE query NOT LIKE '%pg_stat_statements%'
ORDER BY calls DESC
LIMIT 10;

\echo ''
\echo '3. Tables with Most Sequential Scans:'
SELECT
  schemaname,
  tablename,
  seq_scan,
  seq_tup_read,
  idx_scan,
  n_live_tup AS approx_rows,
  ROUND((seq_tup_read::numeric / NULLIF(seq_scan, 0)), 0) AS avg_rows_per_scan
FROM pg_stat_user_tables
WHERE schemaname = 'public'
  AND seq_scan > 0
ORDER BY seq_tup_read DESC
LIMIT 10;

\echo ''
\echo '4. Tables with Bloat (Dead Tuples):'
SELECT
  schemaname,
  tablename,
  n_live_tup,
  n_dead_tup,
  ROUND((n_dead_tup::numeric / NULLIF(n_live_tup, 0) * 100), 2) AS dead_tuple_percent,
  last_vacuum,
  last_autovacuum
FROM pg_stat_user_tables
WHERE schemaname = 'public'
  AND n_dead_tup > 100
ORDER BY n_dead_tup DESC
LIMIT 10;

\echo ''
\echo '5. Missing Indexes (Foreign Keys without indexes):'
SELECT
  t.tablename,
  c.column_name,
  pg_size_pretty(pg_relation_size(t.tablename::regclass)) AS table_size,
  'CREATE INDEX idx_' || t.tablename || '_' || c.column_name || ' ON ' || t.tablename || '(' || c.column_name || ');' AS suggested_index
FROM pg_tables t
JOIN information_schema.columns c ON c.table_name = t.tablename
LEFT JOIN pg_indexes i ON i.tablename = t.tablename
  AND i.indexdef LIKE '%' || c.column_name || '%'
WHERE t.schemaname = 'public'
  AND c.table_schema = 'public'
  AND c.column_name LIKE '%_id'
  AND c.column_name != 'id'
  AND i.indexname IS NULL
ORDER BY pg_relation_size(t.tablename::regclass) DESC
LIMIT 10;

\echo ''
\echo '6. Index Usage Statistics:'
SELECT
  schemaname,
  tablename,
  indexname,
  idx_scan,
  idx_tup_read,
  idx_tup_fetch,
  pg_size_pretty(pg_relation_size(indexrelid)) AS index_size,
  CASE
    WHEN idx_scan = 0 THEN '❌ Unused - consider dropping'
    WHEN idx_scan < 100 THEN '⚠️ Low usage'
    ELSE '✓ Active'
  END AS usage_status
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
ORDER BY idx_scan ASC, pg_relation_size(indexrelid) DESC
LIMIT 15;

\echo ''
\echo '7. Cache Hit Ratio (should be > 99%):'
SELECT
  'Index Hit Rate' AS metric,
  ROUND((SUM(idx_blks_hit) / NULLIF(SUM(idx_blks_hit + idx_blks_read), 0) * 100)::numeric, 2) AS percentage
FROM pg_statio_user_indexes
UNION ALL
SELECT
  'Table Hit Rate' AS metric,
  ROUND((SUM(heap_blks_hit) / NULLIF(SUM(heap_blks_hit + heap_blks_read), 0) * 100)::numeric, 2) AS percentage
FROM pg_statio_user_tables;

\echo ''
\echo '8. Connection Pool Status:'
SELECT
  COUNT(*) AS total_connections,
  COUNT(*) FILTER (WHERE state = 'active') AS active,
  COUNT(*) FILTER (WHERE state = 'idle') AS idle,
  COUNT(*) FILTER (WHERE state = 'idle in transaction') AS idle_in_transaction,
  MAX(EXTRACT(EPOCH FROM (NOW() - query_start))) AS longest_query_seconds
FROM pg_stat_activity
WHERE datname = current_database();

SQL
```

---

### Tipo: Otimização Interativa

**Quando:** O usuário seleciona `interactive`

**Propósito:** Sessão guiada de otimização de query

```bash
\echo '=== Interactive Query Optimization Session ==='
\echo ''
\echo 'This will guide you through optimizing a slow query.'
\echo ''

# Solicita a query
read -p "Paste your slow query: " SLOW_QUERY

# Passo 1: Performance atual
psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 <<SQL
\echo ''
\echo 'Step 1: Current Performance Baseline'
\echo ''

\timing on
EXPLAIN (ANALYZE, BUFFERS)
$SLOW_QUERY;
\timing off

SQL

# Passo 2: Analisar as estatísticas das tabelas
psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 <<'SQL'
\echo ''
\echo 'Step 2: Table Statistics'
\echo ''

-- Extrai os nomes das tabelas da query (regex básico)
-- Isto é simplificado - a implementação real faria o parse da query
SELECT
  schemaname,
  tablename,
  n_live_tup AS row_count,
  seq_scan,
  idx_scan,
  n_tup_ins,
  n_tup_upd,
  n_tup_del,
  last_vacuum,
  last_analyze
FROM pg_stat_user_tables
WHERE schemaname = 'public'
ORDER BY n_live_tup DESC;

SQL

# Passo 3: Sugerir índices
\echo ''
\echo 'Step 3: Index Suggestions'
\echo ''
\echo 'Based on your query, consider these indexes:'
\echo ''
\echo '  1. Check WHERE clause columns - add index'
\echo '  2. Check JOIN columns - add composite index'
\echo '  3. Check ORDER BY columns - add index'
\echo ''
read -p "Would you like to see existing indexes? (y/n): " SHOW_INDEXES

if [[ "$SHOW_INDEXES" == "y" ]]; then
  psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 <<'SQL'
  SELECT
    schemaname,
    tablename,
    indexname,
    indexdef
  FROM pg_indexes
  WHERE schemaname = 'public'
  ORDER BY tablename, indexname;
SQL
fi

# Passo 4: Recomendações de otimização
\echo ''
\echo 'Step 4: General Optimization Tips'
\echo ''
\echo '  ✓ Use EXPLAIN ANALYZE to understand execution'
\echo '  ✓ Add indexes on WHERE/JOIN/ORDER BY columns'
\echo '  ✓ Avoid SELECT * - specify only needed columns'
\echo '  ✓ Use LIMIT for large result sets'
\echo '  ✓ Consider materialized views for complex aggregations'
\echo '  ✓ Use connection pooling (Supabase Pooler)'
\echo '  ✓ Run VACUUM ANALYZE periodically'
\echo ''

read -p "Create index now? (y/n): " CREATE_INDEX

if [[ "$CREATE_INDEX" == "y" ]]; then
  read -p "Enter index SQL: " INDEX_SQL
  psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 <<SQL
  $INDEX_SQL;
  \echo 'Index created. Re-run EXPLAIN to see improvement.'
SQL
fi
```

---

## Exemplos de Saída

### Saída da Análise de Query

```
=== Query Performance Analysis ===

Query:
SELECT u.*, COUNT(p.id) FROM users u LEFT JOIN posts p ON p.user_id = u.id GROUP BY u.id;

=== Execution Plan (EXPLAIN ANALYZE) ===

 HashAggregate  (cost=1234.56..1234.78 rows=22 width=520) (actual time=12.345..12.456 rows=22 loops=1)
   ->  Hash Left Join  (cost=45.67..890.12 rows=34567 width=512) (actual time=2.345..10.123 rows=34567 loops=1)
         Hash Cond: (p.user_id = u.id)
         ->  Seq Scan on posts p  (cost=0.00..678.90 rows=34567 width=8) (actual time=0.012..5.678 rows=34567 loops=1)
         ->  Hash  (cost=23.45..23.45 rows=22 width=504) (actual time=0.234..0.234 rows=22 loops=1)
               ->  Seq Scan on users u  (cost=0.00..23.45 rows=22 width=504) (actual time=0.012..0.123 rows=22 loops=1)
 Planning Time: 1.234 ms
 Execution Time: 12.567 ms
```

### Saída de Hotpaths

```
=== Performance Hotpaths Analysis ===

1. Top 10 Slowest Queries:
 query_preview                                    | calls | total_seconds | avg_ms | percent_total
--------------------------------------------------+-------+---------------+--------+---------------
 SELECT * FROM large_table WHERE complex_cond...  |  1234 |        123.45 | 100.04 |         45.67
 UPDATE users SET last_seen = NOW() WHERE...     |  5678 |         67.89 |  11.95 |         25.12

... (saída adicional)
```

---

## Recomendações por Tipo de Análise

### Após a Análise de Query

- **Seq Scan → Index Scan:** Adicionar índice nas colunas da cláusula WHERE
- **Alto tempo de execução:** Considerar reescrever a query ou usar cache
- **Altas leituras de buffer:** Adicionar índices para reduzir I/O

### Após a Análise de Hotpaths

- **seq_scan alto:** Adicionar índices em tabelas frequentemente varridas
- **dead_tup alto:** Rodar VACUUM ANALYZE
- **Índices não utilizados:** Remover para reduzir overhead de escrita
- **Cache hit baixo:** Aumentar shared_buffers ou otimizar queries

### Após a Otimização Interativa

- Testar o impacto do índice com EXPLAIN ANALYZE antes/depois
- Monitorar a performance da query ao longo do tempo
- Documentar as decisões de otimização

---

## Comandos Relacionados

- `*security-audit` - Verificar índices ausentes em FKs
- `*verify-order {migration}` - Validar a ordem de criação de índices
- `*create-migration-plan` - Planejar adições de índices
- `*explain {query}` - Comando legado (descontinuado, use `*analyze-performance query`)

---

**Pré-requisitos:**

- Extensão `pg_stat_statements` habilitada para a análise de hotpaths:
  ```sql
  CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
  ```

---

**Nota:** Esta task consolidada substitui `db-explain.md` e `db-analyze-hotpaths.md` (descontinuados na v3.0)
