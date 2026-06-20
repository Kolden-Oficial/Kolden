# Task: Analisar Caminhos Quentes de Query

**Propósito**: Rodar EXPLAIN ANALYZE em queries comuns/críticas para identificar problemas de performance

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
task: dbAnalyzeHotpaths()
responsável: Dara (Sage)
responsavel_type: Agente
atomic_layer: Strategy

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

**Estratégia:** fallback

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
duration_expected: 5-20 min (estimated)
cost_estimated: $0.003-0.015
token_usage: ~2,000-8,000 tokens
```

**Notas de Otimização:**
- Análise iterativa com limites de profundidade; cachear resultados intermediários; agrupar operações similares

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
- Se não for fornecido, analisa os padrões comuns de pg_stat_statements

---

## Processo

### 1. Habilitar as Extensões Necessárias

Garantir que o monitoramento de performance esteja disponível:

```bash
echo "Enabling performance extensions..."

psql "$SUPABASE_DB_URL" << 'EOF'
-- Enable pg_stat_statements (should already be enabled in Supabase)
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- Optionally enable index_advisor (Supabase extension)
CREATE EXTENSION IF NOT EXISTS index_advisor;

SELECT 'Extensions ready' AS status;
EOF

echo "✓ Extensions enabled"
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

Pergunte ao usuário:
```
Top 20 slow queries found.
Select query numbers to analyze (comma-separated, e.g., 1,3,5):
Or type 'all' to analyze all:
```

### 3. Rodar EXPLAIN ANALYZE com BUFFERS

Para cada query selecionada, rode uma análise abrangente:

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

### 4. Gerar Recomendações de Índices

Use a extensão index_advisor (específica do Supabase):

```bash
echo "Generating index recommendations..."

psql "$SUPABASE_DB_URL" << 'EOF'
-- Use index_advisor to get suggestions
SELECT *
FROM index_advisor('{actual_query}');

-- Alternative: Supabase Studio has Index Advisor UI
-- Navigate to: Query Performance Report → Select query → "indexes" tab
EOF
```

### 5. Analisar os Resultados

Identifique problemas comuns de performance:

```bash
echo "Performance Issue Checklist:"
echo ""
echo "🔍 Sequential Scans:"
echo "   - Look for: 'Seq Scan on table_name'"
echo "   - Problem if: Large tables (>1000 rows) + filter removes many rows"
echo "   - Fix: Add index on filter columns"
echo ""
echo "🔍 Row Count Mismatches:"
echo "   - Compare: rows=XXXX (estimated) vs actual rows=YYYY"
echo "   - Problem if: Estimate differs by >10x from actual"
echo "   - Fix: ANALYZE table_name; (update statistics)"
echo ""
echo "🔍 Buffer Cache Misses:"
echo "   - Look for: 'shared read' in BUFFERS output"
echo "   - Problem if: High compared to 'shared hit'"
echo "   - Fix: Increase shared_buffers, optimize query, add indexes"
echo ""
echo "🔍 Temporary Files:"
echo "   - Look for: 'temp read' or 'temp written' in BUFFERS"
echo "   - Problem: Query using disk for sorting/hashing (work_mem too small)"
echo "   - Fix: Increase work_mem, optimize query, add indexes"
echo ""
echo "🔍 Nested Loops:"
echo "   - Look for: 'Nested Loop' with high row counts"
echo "   - Problem if: Loops=10000+ iterations"
echo "   - Fix: Add indexes on join columns, consider Hash Join"
echo ""
```

### 6. Criar o Relatório de Análise

Gere um relatório em markdown com os achados:

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

echo "✓ Report: $REPORT_FILE"
```

---

## Saída

Exibir o resumo e os próximos passos:

```
✅ HOT PATH ANALYSIS COMPLETE

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

## Padrões Comuns de Query a Verificar

### Padrão 1: Dados Específicos do Usuário
```sql
-- Hot path: Get user's posts
SELECT * FROM posts WHERE user_id = 'xxx';

-- Check: Index on user_id exists?
-- Verify: USING (auth.uid() = user_id) is wrapped in SELECT for RLS performance
```

### Padrão 2: Joins
```sql
-- Hot path: Posts with author info
SELECT p.*, u.name
FROM posts p
JOIN users u ON p.user_id = u.id;

-- Check: Index on posts(user_id)? Index on users(id) should exist (PK)
```

### Padrão 3: Filtros + Ordenações
```sql
-- Hot path: Recent published posts
SELECT * FROM posts
WHERE status = 'published'
ORDER BY created_at DESC
LIMIT 10;

-- Check: Index on (status, created_at DESC)?
```

### Padrão 4: Agregações
```sql
-- Hot path: User post count
SELECT user_id, COUNT(*)
FROM posts
GROUP BY user_id;

-- Check: Index on user_id? Or denormalize count?
```

---

## Interpretação da Saída de BUFFERS

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

**Muito Ruim (Arquivos Temporários):**
```
Buffers: temp read=5000 written=5000
```
= A query usou disco (work_mem muito pequeno)

**Alvo:** Maximizar "shared hit", minimizar "shared read", zerar "temp"

---

## Notas Específicas do Supabase

### Usando com o Supabase Client (PostgREST)

Habilite o explain primeiro no editor SQL (apenas dev):
```sql
-- Run once in Dashboard SQL Editor
ALTER DATABASE postgres SET app.settings.explain TO 'on';
```

Depois use no código:
```javascript
const { data, error } = await supabase
  .from('posts')
  .select('*')
  .eq('status', 'published')
  .explain({ analyze: true, buffers: true })
```

### Integração com o Supabase Studio

- Navegue até: **Query Performance Report**
- Selecione a query lenta
- Clique na **aba "indexes"** para as recomendações do index_advisor
- Um clique para criar a migration

---

## Pré-requisitos

- Extensão pg_stat_statements habilitada (padrão no Supabase)
- Atividade de banco de dados suficiente para popular as estatísticas
- Para o index_advisor: extensão index_advisor (Supabase Pro+)

---

## Boas Práticas

1. **Sempre use BUFFERS**: `EXPLAIN (ANALYZE, BUFFERS)`
2. **Procure por padrões**: Uma query lenta frequentemente indica um problema sistêmico
3. **Atualize as estatísticas**: Rode `ANALYZE` após mudanças significativas de dados
4. **Teste os índices**: Crie índices CONCURRENTLY em produção
5. **Re-meça**: Após as otimizações, reexecute esta análise
6. **Performance de RLS**: Envolva funções de auth em SELECT para um ganho de 19x

---

## Referências

- [PostgreSQL EXPLAIN Documentation](https://www.postgresql.org/docs/current/sql-explain.html)
- [Supabase Query Optimization](https://supabase.com/docs/guides/database/query-optimization)
- [Supabase RLS Performance](https://supabase.com/docs/guides/troubleshooting/rls-performance-and-best-practices-Z5Jjwv)
- [index_advisor Extension](https://supabase.com/docs/guides/database/extensions/index_advisor)
