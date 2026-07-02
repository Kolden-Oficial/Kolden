---
name: invariantes-de-pipeline-de-dados
description: Use para declarar e enforçar **invariantes contratuais em pipelines de dados** — row-count consistency (source ± X% = target), null-rate por coluna, PK uniqueness, range constraints, referential integrity cross-pipeline. Asserts como código (Great Expectations, dbt tests, Soda) e job trava se invariante quebra. Gatilhos típicos: "invariante de pipeline", "data quality", "asserts em pipeline", "Great Expectations", "dbt tests", "row-count check", "null rate", "referential integrity", "data contract", "pipeline confiável". NÃO cobre schema evolution (isso é `migracao-zero-downtime`) nem otimização (isso é `otimizacao-de-banco-postgres-supabase`) — esta habilidade estabelece **o que sempre precisa ser verdade** no dado.
agent-owner: data-engineer (Dara)
maturity: 8.0
origem: msitarzewski/agency-agents@a597cb6 · IDs G20, G21 · bucket B03 engineering
---

# Invariantes de Pipeline de Dados

## Herança Histórica

**Metodologia base:** _Great Expectations team_ (Superconductive → GX, 2018) — o pioneiro de "declarative data validation as code"; _Airbnb Data Quality framework — Wall_ (2021) e _Data Portal_ para a disciplina de data contracts em escala; _dbt tests_ (dbt Labs, 2019+) como padrão SQL-native para asserts; _Soda / SodaCL_ (2020+) para syntax declarativa; _Chad Sanderson_ para o movimento "data contracts" (2022+). _Chip Huyen — Designing ML Systems_ cap. 4 (Training Data) para asserts de treino. _Tim Berglund_ ("Streaming Data Mesh") para invariantes em stream.

**Assinatura vocabular:** "invariante contratual", "assert como código", "row-count fence", "null rate ceiling", "PK uniqueness", "referential integrity", "data contract", "expectation", "trip on failure".

## Quando invocar

Dispara quando:
- Pipeline ETL/ELT novo está sendo desenhado.
- "Sumiu dado" ou "dobrou dado" em pipeline existente — precisa invariantes para próxima vez.
- Time debate "cada tabela precisa de teste?" — sim, mas quais.
- Dashboard mostra número errado e ninguém sabe qual etapa introduziu o erro.
- Consumer downstream (dashboard, ML model, API) recebeu dado inconsistente.

NÃO dispara quando:
- Dado é experimental/one-shot (custo dos asserts > valor).
- Pipeline muda toda semana (asserts ficam obsoletos rápido — melhor consolidar primeiro).

## O Método — 6 famílias de invariantes canônicas

### 1. Row-count consistency

Fonte e destino têm contagens compatíveis dentro de uma banda.

```yaml
# Great Expectations style
expectation: expect_table_row_count_to_be_between
min_value: 0
max_value: null  # derivado de source_count * (1 + tolerance)

# dbt test style
tests:
  - dbt_utils.equality:
      compare_model: ref('source_users')
      tolerance: 0.005  # 0.5% de diferença aceitável
```

**Regra Kolden:** toda tabela terminal (que serve dashboard/API) tem row-count check contra fonte. Tolerância padrão 0.1%. Falha = pipeline reprovado.

### 2. Null rate ceiling

Cada coluna crítica tem teto de null rate. Se sobe, algo mudou upstream.

```yaml
# Colunas críticas (definidas em data contract):
- user_id: null_rate_max: 0
- email: null_rate_max: 0.001
- birth_date: null_rate_max: 0.05  # opcional, ok até 5%
```

Baseline capturada nos primeiros 30 dias. Ceiling = baseline + 2*σ (ou 20% acima, o que for maior).

### 3. PK uniqueness

Chave primária é chave primária.

```yaml
tests:
  - unique:
      column_name: user_id
  - not_null:
      column_name: user_id
```

**Anti-padrão comum:** join em pipeline anterior duplicou linhas e ninguém percebeu — asserts pegam na hora.

### 4. Range constraints

Colunas numéricas/temporais dentro de faixas realistas.

```yaml
- age: between(0, 130)
- price_brl: between(0.01, 1000000)
- event_ts: between('2020-01-01', now() + interval '1 day')  # nada no futuro além de +1d (tolerância timezone)
```

**Regra dura Kolden:** dinheiro nunca como float — usar `numeric(19,4)` ou centavos em `bigint`. Range check confirma que não escapou float por engano.

### 5. Referential integrity cross-pipeline

Cada FK aponta para linha que existe no destino, mesmo entre pipelines diferentes.

```sql
-- assert dbt
SELECT COUNT(*)
FROM orders o
LEFT JOIN users u ON o.user_id = u.user_id
WHERE u.user_id IS NULL;
-- expected: 0
```

Cross-pipeline: `orders` vem de pipeline A, `users` de pipeline B. Ambos rodam em horários diferentes → **assert dispara após o mais lento**.

### 6. Business rule invariants

Regras específicas do domínio que sempre precisam ser verdade.

Exemplos Kolden:
- `total_venda = sum(item.price * item.qty)` — reconciliação de linha vs cabeçalho.
- `data_conclusao >= data_criacao` — nenhuma tarefa concluída antes de criada.
- `status ∈ {'ativa', 'arquivada', 'excluida'}` — enum literal.
- `count(user_events WHERE event = 'signup' AND ts_dia = X) <= count(users WHERE ts_dia_criacao = X)` — não pode ter mais signups do que usuários criados.

## Ferramenta padrão Kolden

**dbt tests** para pipeline analítico em Postgres/Supabase (nativo, SQL-based, integra com CI):

```yaml
# models/marts/users.yml
version: 2
models:
  - name: fct_users
    tests:
      - dbt_utils.equal_rowcount:
          compare_model: ref('stg_users')
    columns:
      - name: user_id
        tests:
          - unique
          - not_null
      - name: email
        tests:
          - not_null
      - name: age
        tests:
          - dbt_utils.accepted_range:
              min_value: 0
              max_value: 130
```

**Great Expectations** quando o pipeline é Python/Spark/Airflow e precisa de expectations mais expressivas.

**Soda Cloud** quando precisa de UI de observabilidade cross-time (data lineage + trend de qualidade).

## Failure mode

Invariante quebra → **pipeline trava** (não deixa dado ruim propagar). Alarme dispara para Dara. Correção:

1. Diagnóstico: qual invariante quebrou, quando começou, qual etapa introduziu.
2. Hipótese: mudança em source? bug em transform? volume anômalo real?
3. Fix: correção do transform OU release do invariante com justificativa (se mudança de source é permanente e ok).
4. Rerun do pipeline a partir do ponto anterior à quebra.
5. Registro em `MEMORY.md` do Dara: "invariante X foi ajustada de Y para Z porque..."

## Baseline e evolução

Invariantes evoluem:
- Semana 1: baseline solto (só testes triviais — not-null em PK, unique em PK).
- Semana 2-4: capturam-se distribuições reais.
- Mês 2: adiciona-se range constraints e null-rate ceilings baseados em observação.
- Mês 3+: business rules maduras codificadas.

**Regra:** cada invariante tem `owner`, `data_criacao`, `motivo`, `versao`. Se releasado (afrouxado), registra por quê e quem aprovou.

## Anti-padrões

- Só testar not-null em PK — invariante que já é enforced por DB, sem valor extra.
- 200 asserts para 20 tabelas — ruído, ninguém investiga alerts, invariantes viram cerimônia.
- Assert sem `owner` — quando quebra, ninguém sabe quem corrige.
- "Falha do assert = warning, não bloqueia" — dado ruim propaga, invariante vira decoração.
- Copiar/colar asserts entre tabelas sem pensar (null_rate=0 em coluna que legitimamente pode ser null).
- Baseline fixa forever — mundo muda, distribuição de dado muda, asserts precisam de revisão trimestral.

## Cross-links

- Prometeu → `engenharia-de-dados` (schema DDL vem antes dos asserts).
- Prometeu → `otimizacao-de-banco-postgres-supabase` (queries de assert podem precisar de índice).
- Prometeu → `migracao-zero-downtime` (backfill precisa de assert de idempotência).
- Prometeu → `mlops-em-producao` (feature store depende de pipeline com invariantes).
- Metis → `metricas-operacionais-continuas` (invariante como métrica com baseline ± banda).

---

Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B03/engineering.
