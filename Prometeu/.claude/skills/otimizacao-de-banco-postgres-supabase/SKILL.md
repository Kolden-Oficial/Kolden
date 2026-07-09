---
name: otimizacao-de-banco-postgres-supabase
description: Use para **otimizar Postgres/Supabase** em produção — EXPLAIN ANALYZE reading, index strategy (btree vs GIN vs BRIN vs partial vs covering), autovacuum tuning, connection pooling (PgBouncer transactional vs statement vs session), Supabase-specific (RLS policies performance, realtime channels, edge functions cold-start). Cobre desde query lenta isolada até tuning cluster. Gatilhos típicos: "query lenta", "EXPLAIN ANALYZE", "criar índice", "qual índice", "GIN vs btree", "autovacuum", "pg_stat_statements", "PgBouncer", "connection pool", "RLS lenta", "Supabase performance", "realtime channel", "edge function cold start". NÃO substitui `engenharia-de-dados` existente (schema design) nem `migracao-zero-downtime` (mudança de schema em prod) — esta habilidade é a **régua de performance** do DBA.
agent-owner: data-engineer (Dara)
maturity: 8.0
origem: msitarzewski/agency-agents@a597cb6 · IDs G22, G23, G24 · bucket B03 engineering
grounding_required: false
categoria_art_iv: MCP-nativo
squads_consumidores: [Prometeu-interno]
---

# Otimização de Postgres / Supabase

## Herança Histórica

**Metodologia base:** _Egor Rogov — PostgreSQL 14 Internals_ (2022, livro aberto) para o modelo mental de MVCC, autovacuum e planner; _Bruce Momjian_ (EnterpriseDB) para tuning conservador de longa data; _Álvaro Herrera_ (2ndQuadrant/EDB) para gotchas de partition e autovacuum; _pgstats.dev_ (Alicja Kucharczyk, 2020+) para observabilidade; _Depesz (Hubert Lubaczewski) — explain.depesz.com_ (2008) para leitura de plans; _Nikolay Samokhvalov (postgres.ai)_ para playbook prático de tuning. _Supabase docs + engineering blog_ (2021-2025) para especificidades de RLS, realtime e edge.

**Assinatura vocabular:** "EXPLAIN ANALYZE", "seq scan vs index scan", "buffers hit/read", "planner rows off", "index-only scan", "autovacuum bloat", "n_dead_tup", "hot update", "PgBouncer transactional", "RLS policy overhead".

## Quando invocar

Dispara quando:
- Query lenta identificada (p95 alto em endpoint específico).
- Postgres CPU/IO alto sem causa óbvia.
- Bloat suspeito (`n_dead_tup > n_live_tup`, disco crescendo sem dado novo).
- Vai criar índice — precisa escolher tipo correto (btree/GIN/BRIN/partial).
- Supabase RLS policy tornou API lenta.
- Migração vai tocar tabela grande (>10M rows) — precisa avaliar impacto.
- Connection pool esgotado em pico.

NÃO dispara quando:
- Dev local, dado de brinquedo, performance irrelevante.
- Já é claro que problema é aplicação, não DB (usar profiler de app).

## O Método (5 pilares)

### 1. Leitura de EXPLAIN ANALYZE

Sempre `EXPLAIN (ANALYZE, BUFFERS, VERBOSE, SETTINGS)`:

```sql
EXPLAIN (ANALYZE, BUFFERS, VERBOSE, SETTINGS)
SELECT * FROM users WHERE email = 'ronan@kolden.com.br';
```

**Sinais de problema:**

| Sinal | O que significa |
|---|---|
| `Seq Scan` em tabela > 10k rows | Falta índice OU planner escolheu errado |
| `rows` estimado != `actual` por >10x | Estatística desatualizada (rodar `ANALYZE tabela`) |
| `Buffers: shared read=N` alto | Cache miss — dado no disco, não em RAM |
| `Buffers: shared hit=N` alto sem `read` | OK — tudo em cache |
| `Rows Removed by Filter: N` alto | Índice acha muita coisa, filtro derruba — índice ruim |
| `Sort Method: external merge Disk` | Sort não coube em `work_mem` — subir work_mem OU adicionar índice ordenado |
| `Nested Loop` com >1000 iterações | Provavelmente deveria ser Hash Join — planner errou |
| `Parallel Seq Scan` | Postgres usou paralelismo — para tabela pequena, força a serial |

**Ferramenta:** cole no [explain.depesz.com](https://explain.depesz.com) para visualização + hierarquia colorida.

### 2. Estratégia de Índice

**btree (default):**
- Igualdade, range, ORDER BY.
- 90% dos casos.
- Cardinalidade alta.

**Partial (com WHERE):**
- Coluna muito enviesada (ex.: 99% `active=true`).
- Índice em `WHERE active = true` — 10x menor, 10x mais rápido de manter.

**Covering (com INCLUDE):**
- Index-only scan.
- `CREATE INDEX ON orders (user_id) INCLUDE (total, created_at)`.
- Evita heap access se query só lê essas colunas.

**GIN:**
- Arrays, JSONB, full-text search.
- `CREATE INDEX ON products USING gin (tags)` — busca "produto com tag X" em milissegundos.
- Custo: escrita 5-10x mais lenta que btree.

**BRIN:**
- Tabela grande com ordem natural (ex.: `event_ts` em tabela de log).
- Índice ridiculamente pequeno.
- Custo: só útil se dado é fisicamente correlacionado com a coluna.

**Hash:**
- Só igualdade, sem range.
- Rara utilidade — btree em coluna com hash já resolve na maioria dos casos.

**Regra dura:**
- **Sempre** `CREATE INDEX CONCURRENTLY` em prod (ver `migracao-zero-downtime`).
- Remove índice não usado (`pg_stat_user_indexes.idx_scan = 0` por >30 dias).

### 3. Autovacuum tuning

Autovacuum default está calibrado para Postgres antigo. Em produção Kolden:

```sql
-- Global (postgresql.conf ou Supabase Studio):
autovacuum_vacuum_scale_factor = 0.05   -- default 0.2 (roda mais cedo)
autovacuum_analyze_scale_factor = 0.02  -- default 0.1
autovacuum_naptime = 15s                 -- default 1min

-- Por tabela quente (muita UPDATE/DELETE):
ALTER TABLE eventos SET (
  autovacuum_vacuum_scale_factor = 0.01,
  autovacuum_analyze_scale_factor = 0.005
);
```

**Monitorar:**

```sql
SELECT relname, n_live_tup, n_dead_tup,
       last_vacuum, last_autovacuum,
       round(100.0 * n_dead_tup / NULLIF(n_live_tup, 0), 2) AS pct_dead
FROM pg_stat_user_tables
WHERE n_dead_tup > 1000
ORDER BY pct_dead DESC NULLS LAST;
```

`pct_dead > 20%` = autovacuum atrasado, ajustar.

### 4. Connection Pooling (PgBouncer)

Sempre atrás de PgBouncer. Nunca conexão direta em prod.

**Modos:**

| Modo | Quando | Custo |
|---|---|---|
| `transactional` | Default Kolden. Web app, API stateless. | Não pode usar `SET`, prepared statements sessão-scope. |
| `session` | Long-lived connection, LISTEN/NOTIFY, `pg_advisory_lock`. | Pool esgota rápido. |
| `statement` | Cargas muito paralelas, sem transação. | Não pode transação multi-statement. |

**Sizing:**
- Postgres `max_connections`: 100-200 (Supabase medium: 200).
- PgBouncer `default_pool_size`: 20-50 por database/user.
- App workers: `pool_size * pgbouncer_pool_size`.

**Supabase-specific:**
- Pooler URL (porta 6543 = transactional) vs Direct (porta 5432 = session).
- Realtime + PostgREST vão pelo pooler.
- Migrations pela direct (precisam de session).

### 5. Supabase-specific

**RLS policy performance:**

```sql
-- ANTES (lenta):
CREATE POLICY "user_owns_row" ON orders
USING (user_id = auth.uid());

-- Cada linha reavalia auth.uid() — em query com 100k linhas, chamada 100k vezes.

-- DEPOIS (rápida):
CREATE POLICY "user_owns_row" ON orders
USING (user_id = (SELECT auth.uid()));

-- Subquery avalia 1x, planner cacheia.
```

**Sempre `EXPLAIN ANALYZE` com RLS ativa** — sem RLS parece rápido, com RLS pode ficar 100x mais lenta.

**Realtime channels:**
- Cada channel = 1 subscription em `pg_publication` + WAL streaming.
- Custo: WAL crescer 20-30% por channel muito ativo.
- Regra: canal por entidade (não canal por linha).

**Edge functions cold start:**
- Deno runtime, cold start ~200-800ms.
- Warm pool via cron ping /5min se latência importa.
- Preferir Postgres function (`plpgsql`) para lógica trivial — 0 cold start.

**Índices para RLS:**
- Toda coluna usada em USING/WITH CHECK precisa índice (btree ou parcial).
- Ex.: `CREATE INDEX orders_user_id ON orders (user_id);`

## Templates operacionais

**Query diagnóstico "top 10 queries lentas":**

```sql
SELECT
  substring(query, 1, 100) AS query,
  calls,
  round(mean_exec_time::numeric, 2) AS mean_ms,
  round(total_exec_time::numeric / 1000, 2) AS total_sec,
  rows / calls AS avg_rows
FROM pg_stat_statements
WHERE calls > 10
ORDER BY mean_exec_time DESC
LIMIT 10;
```

**Query "índices não usados":**

```sql
SELECT schemaname, relname, indexrelname, idx_scan
FROM pg_stat_user_indexes
WHERE idx_scan = 0
  AND indexrelname NOT LIKE '%pkey'
ORDER BY pg_relation_size(indexrelid) DESC;
```

**Query "tabelas com bloat":**

```sql
-- pgstattuple ou pg_bloat_check (extensões)
SELECT relname, n_dead_tup, n_live_tup,
       pg_size_pretty(pg_total_relation_size(relid)) AS size
FROM pg_stat_user_tables
WHERE n_dead_tup > 10000
ORDER BY n_dead_tup DESC;
```

## Anti-padrões

- Criar índice em toda coluna "por garantia" — escrita degrada, bloat cresce.
- `CREATE INDEX` em prod sem `CONCURRENTLY`.
- Ignorar `pg_stat_statements` — voando cego.
- RLS policy que chama `auth.uid()` sem subquery — 100x mais lenta.
- `SELECT *` em query analítica — força heap access mesmo com covering index disponível.
- PgBouncer transactional + código que faz `SET LOCAL` sem entender consequência.
- Rodar `VACUUM FULL` em prod — trava tabela. Use `pg_repack`.
- Não rodar `ANALYZE` após backfill grande — planner com estatística estale escolhe plano ruim.

## Cross-links

- Prometeu → `engenharia-de-dados` (design de schema precede tuning).
- Prometeu → `migracao-zero-downtime` (índices em prod = CONCURRENTLY).
- Prometeu → `invariantes-de-pipeline-de-dados` (asserts precisam de queries otimizadas).
- Prometeu → `slo-error-budget-burn-rate` (SLO de latência disciplina otimização).
- Prometeu → `mlops-em-producao` (feature store lê do Postgres — precisa índice em `(entity_id, event_ts)`).

---

Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B03/engineering.
