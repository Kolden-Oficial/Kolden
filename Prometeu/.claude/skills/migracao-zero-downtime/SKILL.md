---
name: migracao-zero-downtime
description: Use para migrar schema/dados em produção **sem downtime** — expand-contract pattern, dual-writes, backfill em batch controlado, feature-flag por leitura, gates de reversibilidade obrigatórios. Foco Postgres (pg_repack, DDL non-blocking, CONCURRENTLY, add-column-not-null trap). Gatilhos típicos: "migração sem downtime", "expand-contract", "dual-write", "backfill", "add column safe", "rename column safe", "split table", "migração de produção", "pg_repack", "CONCURRENTLY", "Supabase migration produção". NÃO cobre migração inicial de dev (usa migração padrão) nem primeira instalação de schema (isso é `engenharia-de-dados` existente) — esta habilidade é a **régua de segurança** para mudar schema em prod com tráfego real.
agent-owner: data-engineer (Dara)
maturity: 8.0
origem: msitarzewski/agency-agents@a597cb6 · IDs G12, G24 · bucket B03 engineering
grounding_required: false
categoria_art_iv: MCP-nativo
squads_consumidores: [Prometeu-interno]
tipo: skill
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
---

# Migração Zero-Downtime

## Herança Histórica

**Metodologia base:** _Andrew Kane_ (Braintree/PayPal, `strong_migrations` gem 2015) — cardápio canônico de "migrations perigosas em Postgres e como evitar"; _Shopify Engineering_ para blueprint expand-contract em escala; _GitHub gh-ost_ (2016, Shlomi Noach) e _Percona pt-online-schema-change_ (2011) para modelo de trigger + copy incremental (MySQL, mas conceito porta); _PostgreSQL `pg_repack`_ (Josh Berkus, ~2013) para VACUUM FULL sem lock; _Nikolay Samokhvalov_ (postgres.ai) para gotchas de DDL em Postgres moderno.

**Assinatura vocabular:** "expand-contract", "dual-write", "backfill", "shadow read", "reversível", "gate de reversibilidade", "add column not-null trap", "CONCURRENTLY", "long-running lock".

## Quando invocar

Dispara quando:
- Precisa mudar schema em produção com tráfego real (>1 req/s).
- Precisa renomear/dividir/consolidar coluna ou tabela.
- Precisa mudar tipo de coluna em tabela grande (>1M rows).
- Precisa migrar dados entre tabelas mantendo API estável.
- Postgres/Supabase em produção — jamais rodar `ALTER TABLE` cru sem esta habilidade.

NÃO dispara quando:
- É migração inicial (schema vazio, sem tráfego).
- É ambiente dev/staging descartável.
- Tabela pequena (< 10k rows) e janela de manutenção existe.

## O Método — Expand-Contract em 5 fases

### Fase 0 — Análise pré-vôo

Antes de qualquer DDL, responder:

1. **Tamanho**: quantas rows? `SELECT reltuples::bigint FROM pg_class WHERE relname = 'X'`.
2. **Índices existentes**: `\d+ tabela` — qualquer índice vira dor de cabeça em `ALTER TYPE`.
3. **Foreign keys entrantes e sainte**: `SELECT ... FROM pg_constraint`.
4. **Locks atuais**: `SELECT * FROM pg_locks WHERE granted = false` — se já tem contention, migração vai amplificar.
5. **Reversibilidade**: como reverto se der ruim? Se resposta = "restore de backup", planejamento inaceitável.

### Fase 1 — EXPAND (adição)

Nunca modifica o que já existe. **Só adiciona**. Nesta fase, código e schema convivem.

**Padrões seguros em Postgres:**

- `ALTER TABLE ... ADD COLUMN ... NULL` — seguro em Postgres 11+ (metadata-only).
- **NUNCA** `ADD COLUMN ... NOT NULL DEFAULT` sem `DEFAULT` — em Postgres antigo (<11) reescreve tabela inteira. Em Postgres 11+, `DEFAULT` estático é seguro; `DEFAULT` volatile ainda reescreve.
- `CREATE INDEX CONCURRENTLY` — sempre. Nunca `CREATE INDEX` sem `CONCURRENTLY` em prod.
- `CREATE TABLE nova_tabela` + backfill posterior (rename vem no CONTRACT).
- Adicionar constraint: use `NOT VALID` primeiro (metadata-only), depois `VALIDATE CONSTRAINT` (escaneia sem lock exclusivo).

**Gotcha da coluna NOT NULL:**

```sql
-- ERRADO (reescreve tabela em Postgres <11, e ainda pode ser lento):
ALTER TABLE users ADD COLUMN status text NOT NULL DEFAULT 'active';

-- CERTO:
ALTER TABLE users ADD COLUMN status text;  -- Fase 1: adiciona nullable
-- (code writes 'active' em novas rows via dual-write)
-- (Fase 2 backfill preenche antigas)
-- Fase 3:
ALTER TABLE users ALTER COLUMN status SET NOT NULL;  -- só quando 0 nulls
```

### Fase 2 — DUAL-WRITE + BACKFILL

Código passa a escrever nas duas colunas/tabelas simultaneamente:

```typescript
// Antes:
await db.users.update({ id, nome_completo: 'Ronan Silva' })

// Fase 2 (dual-write):
await db.users.update({
  id,
  nome_completo: 'Ronan Silva',      // legado
  primeiro_nome: 'Ronan',              // novo
  sobrenome: 'Silva'                   // novo
})
```

**Backfill em batch controlado:**

```sql
-- NUNCA:
UPDATE users SET primeiro_nome = split_part(nome_completo, ' ', 1);  -- lock tabela toda

-- CERTO — batch de 1000 com sleep:
DO $$
DECLARE
  batch_size INT := 1000;
  affected INT;
BEGIN
  LOOP
    UPDATE users
    SET primeiro_nome = split_part(nome_completo, ' ', 1),
        sobrenome = split_part(nome_completo, ' ', 2)
    WHERE id IN (
      SELECT id FROM users WHERE primeiro_nome IS NULL LIMIT batch_size
    );
    GET DIAGNOSTICS affected = ROW_COUNT;
    EXIT WHEN affected = 0;
    PERFORM pg_sleep(0.1);  -- 100ms entre batches
  END LOOP;
END $$;
```

Métricas de acompanhamento: `SELECT count(*) FROM users WHERE primeiro_nome IS NULL` — cai monotonicamente.

### Fase 3 — SHADOW READ + FLAG

Código lê da nova coluna **com feature flag** (default off). Métrica compara leitura antiga vs nova:

```typescript
const primeiroNome = flag('ler-nome-fatiado')
  ? user.primeiro_nome
  : user.nome_completo.split(' ')[0]
```

Ligar flag para 1% → 10% → 50% → 100% ao longo de dias, monitorando erro (`sentry`) e latência.

### Fase 4 — CONTRACT (remoção)

Só quando 100% do tráfego lê da nova coluna e backfill = 0 nulls remanescentes:

```sql
ALTER TABLE users ALTER COLUMN primeiro_nome SET NOT NULL;
ALTER TABLE users DROP COLUMN nome_completo;
```

**Gate:** DROP COLUMN é irreversível sem restore. Antes:
- Snapshot lógico (`pg_dump -t users > backup.sql`).
- Confirmação escrita do dono do serviço.
- Janela de observação de 24-72h após DROP para reverter via restore se sinal fraco de bug.

### Fase 5 — Cleanup

- Remove feature flag.
- Remove código dual-write.
- Fecha ADR com timestamps das 4 fases.

## Padrões específicos

**Rename coluna:**
1. EXPAND: `ADD COLUMN novo_nome` + dual-write.
2. Backfill batch.
3. Shadow read + flag.
4. CONTRACT: `DROP COLUMN antigo_nome`.

**Split table (users → users + user_profiles):**
1. EXPAND: `CREATE TABLE user_profiles` + dual-write.
2. Backfill batch.
3. Shadow read.
4. CONTRACT: DROP columns migrated.

**Change column type (text → uuid):**
1. EXPAND: `ADD COLUMN id_uuid uuid`.
2. Backfill batch.
3. Update all FKs (mais expand-contract em outras tabelas).
4. Swap primary key (usando `ALTER TABLE ... REPLICA IDENTITY` se logical replication ativa).
5. CONTRACT: DROP `id` (text).

**pg_repack (recuperar espaço sem lock):**

```bash
pg_repack -h host -U user -d db -t users --no-superuser-check
```

Não roda VACUUM FULL em prod. Nunca.

## Anti-padrões

- `ALTER TABLE ... ADD COLUMN ... NOT NULL DEFAULT valor_volatile` — reescreve tabela.
- `CREATE INDEX` sem `CONCURRENTLY`.
- `UPDATE users SET ...` sem WHERE ou batch — lock tabela toda por minutos/horas.
- Migrar sem flag + shadow read → rollback impossível quando bug aparece só em 5% do tráfego.
- Rodar migration em transaction longa (`BEGIN; ... COMMIT;`) que segura locks.
- `ALTER COLUMN ... TYPE` sem `USING` explícito — cast implícito pode falhar em row #942856.

## Cross-links

- Prometeu → `engenharia-de-dados` (schema design base).
- Prometeu → `otimizacao-de-banco-postgres-supabase` (EXPLAIN antes/depois da migração).
- Prometeu → `invariantes-de-pipeline-de-dados` (backfill idempotente).
- Prometeu → `governanca-de-contratos-de-api` (mudança de schema pode implicar deprecação de field na API).
- Prometeu → `devops-e-entrega-continua` (migração como parte do pipeline CD).

---

Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B03/engineering.
