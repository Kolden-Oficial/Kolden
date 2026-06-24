# Task: Analisar Caminhos Quentes de Query

**PropÃ³sito**: Rodar EXPLAIN ANALYZE em queries comuns/crÃ­ticas para identificar problemas de performance

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
task: dbAnalyzeHotpaths()
responsÃ¡vel: Dara (Sage)
responsavel_type: Agente
atomic_layer: Strategy

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

**EstratÃ©gia:** fallback

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
duration_expected: 5-20 min (estimated)
cost_estimated: $0.003-0.015
token_usage: ~2,000-8,000 tokens
```

**Notas de OtimizaÃ§Ã£o:**
- AnÃ¡lise iterativa com limites de profundidade; cachear resultados intermediÃ¡rios; agrupar operaÃ§Ãµes similares

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


## Entradas

- `queries_file` (opcional): Caminho para o arquivo com queries rotuladas a analisar
- Se nÃ£o for fornecido, analisa os padrÃµes comuns de pg_stat_statements

---

## Processo

### 1. Habilitar as ExtensÃµes NecessÃ¡rias

Garantir que o monitoramento de performance esteja disponÃ­vel:

```bash
echo "Enabling performance extensions..."

psql "$SUPABASE_DB_URL" << 'EOF'
-- Enable pg_stat_statements (should already be enabled in Supabase)
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- Optionally enable index_advisor (Supabase extension)
CREATE EXTENSION IF NOT EXISTS index_advisor;

SELECT 'Extensions ready' AS status;
EOF

echo "âœ“ Extensions enabled"
```

### 2. Identificar as Queries Quentes

Se nenhum queries_file for fornecido, encontre as queries mais lentas em pg_stat_statements:

```bash
echo "Finding slow queries from pg_stat_statements..."

psql "$SUPABASE_DB_URL" << 'EOF'
SELECT
  query,
  calls,
  ROUND(total_exec_time::numeric, 2) AS total_time_ms,
  ROUND(mean_exec_time::numeric, 2) AS mean_time_ms,
  ROUND(max_exec_time::numeric, 2) AS max_time_ms,
  ROUND((100 * total_exec_time / SUM(total_exec_time) OVER ())::numeric, 2) AS pct_total_time
FROM pg_stat_statements
WHERE query NOT LIKE '%pg_stat_statements%'
  AND query NOT LIKE '%pg_catalog%'
ORDER BY mean_exec_time DESC
LIMIT 20;
EOF
```

Pergunte ao usuÃ¡rio:
```
Top 20 slow queries found.
Select query numbers to analyze (comma-separated, e.g., 1,3,5):
Or type 'all' to analyze all:
```

### 3. Rodar EXPLAIN ANALYZE com BUFFERS

Para cada query selecionada, rode uma anÃ¡lise abrangente:

```bash
echo "Analyzing query performance..."

# CRITICAL: Always use ANALYZE, BUFFERS for complete picture
psql "$SUPABASE_DB_URL" << 'EOF'
-- Query being analyzed
\echo '=========================================='
\echo 'QUERY: {query_label}'
\echo '=========================================='

-- Option 1: EXPLAIN ANALYZE with BUFFERS (recommended)
EXPLAIN (
  ANALYZE true,
  BUFFERS true,
  VERBOSE true,
  COSTS true,
  TIMING true
)
{actual_query};

\echo ''
\echo 'BUFFERS LEGEND:'
\echo '  - shared hit = blocks found in buffer cache (good)'
\echo '  - shared read = blocks read from disk (bad if high)'
\echo '  - temp read/written = temporary files (bad if present)'
\echo ''

EOF
```

### 4. Gerar RecomendaÃ§Ãµes de Ãndices

Use a extensÃ£o index_advisor (especÃ­fica do Supabase):

```bash
echo "Generating index recommendations..."

psql "$SUPABASE_DB_URL" << 'EOF'
-- Use index_advisor to get suggestions
SELECT *
FROM index_advisor('{actual_query}');

-- Alternative: Supabase Studio has Index Advisor UI
-- Navigate to: Query Performance Report â†’ Select query â†’ "indexes" tab
EOF
```

### 5. Analisar os Resultados

Identifique problemas comuns de performance:

```bash
echo "Performance Issue Checklist:"
echo ""
echo "ðŸ” Sequential Scans:"
echo "   - Look for: 'Seq Scan on table_name'"
echo "   - Problem if: Large tables (>1000 rows) + filter removes many rows"
echo "   - Fix: Add index on filter columns"
echo ""
echo "ðŸ” Row Count Mismatches:"
echo "   - Compare: rows=XXXX (estimated) vs actual rows=YYYY"
echo "   - Problem if: Estimate differs by >10x from actual"
echo "   - Fix: ANALYZE table_name; (update statistics)"
echo ""
echo "ðŸ” Buffer Cache Misses:"
echo "   - Look for: 'shared read' in BUFFERS output"
echo "   - Problem if: High compared to 'shared hit'"
echo "   - Fix: Increase shared_buffers, optimize query, add indexes"
echo ""
echo "ðŸ” Temporary Files:"
echo "   - Look for: 'temp read' or 'temp written' in BUFFERS"
echo "   - Problem: Query using disk for sorting/hashing (work_mem too small)"
echo "   - Fix: Increase work_mem, optimize query, add indexes"
echo ""
echo "ðŸ” Nested Loops:"
echo "   - Look for: 'Nested Loop' with high row counts"
echo "   - Problem if: Loops=10000+ iterations"
echo "   - Fix: Add indexes on join columns, consider Hash Join"
echo ""
```

### 6. Criar o RelatÃ³rio de AnÃ¡lise

Gere um relatÃ³rio em markdown com os achados:

```bash
REPORT_FILE="supabase/docs/performance-analysis-$(date +%Y%m%d%H%M%S).md"
mkdir -p supabase/docs

cat > "$REPORT_FILE" << 'MDEOF'
# Query Performance Analysis

**Date**: $(date -u +"%Y-%m-%d %H:%M:%S UTC")
**Database**: [redacted]
**Tool**: DB Sage db-analyze-hotpaths

---

## Executive Summary

- Queries analyzed: {count}
- Avg execution time: {avg_time}ms
- Indexes recommended: {index_count}

---

## Detailed Findings

### Query 1: {query_label}

**Current Performance:**
- Mean execution time: {mean_time}ms
- Calls: {calls}
- % of total time: {pct_time}%

**EXPLAIN ANALYZE Output:**
```
{explain_output}
```

**Issues Identified:**
1. {issue_1}
2. {issue_2}

**Recommended Indexes:**
```sql
{recommended_indexes}
```

**Expected Improvement:** {estimated_improvement}

---

[Repeat for each query...]

---

## Action Items

- [ ] Create migration for recommended indexes
- [ ] Update statistics: ANALYZE {tables}
- [ ] Re-run analysis after changes
- [ ] Monitor with pg_stat_statements

MDEOF

echo "âœ“ Report: $REPORT_FILE"
```

---

## SaÃ­da

Exibir o resumo e os prÃ³ximos passos:

```
âœ… HOT PATH ANALYSIS COMPLETE

Queries analyzed: {count}
Report: supabase/docs/performance-analysis-{timestamp}.md

Key Findings:
- {finding_1}
- {finding_2}
- {finding_3}

Recommended Actions:
1. Review report: cat {report_file}
2. Create index migration for recommended indexes
3. Update statistics: ANALYZE {affected_tables}
4. Re-run analysis: *analyze-hotpaths

Index Recommendations:
{list of CREATE INDEX statements}
```

---

## PadrÃµes Comuns de Query a Verificar

### PadrÃ£o 1: Dados EspecÃ­ficos do UsuÃ¡rio
```sql
-- Hot path: Get user's posts
SELECT * FROM posts WHERE user_id = 'xxx';

-- Check: Index on user_id exists?
-- Verify: USING (auth.uid() = user_id) is wrapped in SELECT for RLS performance
```

### PadrÃ£o 2: Joins
```sql
-- Hot path: Posts with author info
SELECT p.*, u.name
FROM posts p
JOIN users u ON p.user_id = u.id;

-- Check: Index on posts(user_id)? Index on users(id) should exist (PK)
```

### PadrÃ£o 3: Filtros + OrdenaÃ§Ãµes
```sql
-- Hot path: Recent published posts
SELECT * FROM posts
WHERE status = 'published'
ORDER BY created_at DESC
LIMIT 10;

-- Check: Index on (status, created_at DESC)?
```

### PadrÃ£o 4: AgregaÃ§Ãµes
```sql
-- Hot path: User post count
SELECT user_id, COUNT(*)
FROM posts
GROUP BY user_id;

-- Check: Index on user_id? Or denormalize count?
```

---

## InterpretaÃ§Ã£o da SaÃ­da de BUFFERS

**Bom (Em Cache):**
```
Buffers: shared hit=100
```
= 100 blocos encontrados no cache (sem I/O de disco)

**Ruim (Leituras de Disco):**
```
Buffers: shared hit=10 read=990
```
= Apenas 10 blocos em cache, 990 lidos do disco

**Muito Ruim (Arquivos TemporÃ¡rios):**
```
Buffers: temp read=5000 written=5000
```
= A query usou disco (work_mem muito pequeno)

**Alvo:** Maximizar "shared hit", minimizar "shared read", zerar "temp"

---

## Notas EspecÃ­ficas do Supabase

### Usando com o Supabase Client (PostgREST)

Habilite o explain primeiro no editor SQL (apenas dev):
```sql
-- Run once in Dashboard SQL Editor
ALTER DATABASE postgres SET app.settings.explain TO 'on';
```

Depois use no cÃ³digo:
```javascript
const { data, error } = await supabase
  .from('posts')
  .select('*')
  .eq('status', 'published')
  .explain({ analyze: true, buffers: true })
```

### IntegraÃ§Ã£o com o Supabase Studio

- Navegue atÃ©: **Query Performance Report**
- Selecione a query lenta
- Clique na **aba "indexes"** para as recomendaÃ§Ãµes do index_advisor
- Um clique para criar a migration

---

## PrÃ©-requisitos

- ExtensÃ£o pg_stat_statements habilitada (padrÃ£o no Supabase)
- Atividade de banco de dados suficiente para popular as estatÃ­sticas
- Para o index_advisor: extensÃ£o index_advisor (Supabase Pro+)

---

## Boas PrÃ¡ticas

1. **Sempre use BUFFERS**: `EXPLAIN (ANALYZE, BUFFERS)`
2. **Procure por padrÃµes**: Uma query lenta frequentemente indica um problema sistÃªmico
3. **Atualize as estatÃ­sticas**: Rode `ANALYZE` apÃ³s mudanÃ§as significativas de dados
4. **Teste os Ã­ndices**: Crie Ã­ndices CONCURRENTLY em produÃ§Ã£o
5. **Re-meÃ§a**: ApÃ³s as otimizaÃ§Ãµes, reexecute esta anÃ¡lise
6. **Performance de RLS**: Envolva funÃ§Ãµes de auth em SELECT para um ganho de 19x

---

## ReferÃªncias

- [PostgreSQL EXPLAIN Documentation](https://www.postgresql.org/docs/current/sql-explain.html)
- [Supabase Query Optimization](https://supabase.com/docs/guides/database/query-optimization)
- [Supabase RLS Performance](https://supabase.com/docs/guides/troubleshooting/rls-performance-and-best-practices-Z5Jjwv)
- [index_advisor Extension](https://supabase.com/docs/guides/database/extensions/index_advisor)
