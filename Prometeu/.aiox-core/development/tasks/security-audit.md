---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Task: Auditoria de Segurança

**Propósito**: Auditoria abrangente de segurança e qualidade de banco de dados (cobertura de RLS, design de schema, sistema completo)

**Elicit**: true

**Consolidado A Partir De (Story 6.1.2.3):**
- `db-rls-audit.md` - Verificação de cobertura de políticas RLS
- `schema-audit.md` - Validação da qualidade do design de schema

---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com logging
- Interação mínima com o usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints explícitos de decisão
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pre-Flight - Planejamento Abrangente Antecipado
- Fase de análise da task (identificar todas as ambiguidades)
- Execução com zero ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: securityAudit()
responsável: Quinn (Guardian)
responsavel_type: Agente
atomic_layer: Strategy

**Entrada:**
- campo: target
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Valid path or resource

- campo: scan_depth
  tipo: number
  origem: config
  obrigatório: false
  validação: Default: 2 (1-5)

- campo: rules
  tipo: array
  origem: config
  obrigatório: true
  validação: Security rule set

**Saída:**
- campo: scan_report
  tipo: object
  destino: File (.ai/security/*)
  persistido: true

- campo: vulnerabilities
  tipo: array
  destino: Memory
  persistido: false

- campo: risk_score
  tipo: number
  destino: Memory
  persistido: false
```

---

## Pré-condições

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Scanner available; target accessible; rules configured
    tipo: pre-condition
    blocker: true
    validação: |
      Check scanner available; target accessible; rules configured
    error_message: "Pre-condition failed: Scanner available; target accessible; rules configured"
```

---

## Pós-condições

**Propósito:** Validar o sucesso da execução APÓS a task ser concluída

**Checklist:**

```yaml
post-conditions:
  - [ ] Scan completed; vulnerabilities reported; no scan errors
    tipo: post-condition
    blocker: true
    validação: |
      Verify scan completed; vulnerabilities reported; no scan errors
    error_message: "Post-condition failed: Scan completed; vulnerabilities reported; no scan errors"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de pass/fail para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] No critical vulnerabilities; all checks passed
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Assert no critical vulnerabilities; all checks passed
    error_message: "Acceptance criterion not met: No critical vulnerabilities; all checks passed"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** security-scanner
  - **Propósito:** Análise estática de segurança e detecção de vulnerabilidades
  - **Origem:** npm: eslint-plugin-security ou similar

- **Ferramenta:** dependency-checker
  - **Propósito:** Verificar dependências vulneráveis
  - **Origem:** npm audit ou snyk

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** security-scan.js
  - **Propósito:** Rodar varreduras de segurança e gerar relatórios
  - **Linguagem:** JavaScript
  - **Local:** .aiox-core/scripts/security-scan.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Scanner Indisponível
   - **Causa:** Scanner de segurança não instalado ou falhou
   - **Resolução:** Instalar o scanner ou verificar a configuração
   - **Recuperação:** Pular a varredura com aviso de alto risco

2. **Erro:** Vulnerabilidade Crítica Detectada
   - **Causa:** Problema de segurança de alta severidade encontrado
   - **Resolução:** Revisar o relatório de vulnerabilidade, aplicar patches
   - **Recuperação:** Bloquear o deployment, alertar a equipe

3. **Erro:** Timeout da Varredura
   - **Causa:** Codebase grande excede o limite de tempo da varredura
   - **Resolução:** Reduzir o escopo ou aumentar o timeout
   - **Recuperação:** Resultados parciais da varredura com aviso

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 5-20 min (estimated)
cost_estimated: $0.003-0.015
token_usage: ~2,000-8,000 tokens
```

**Notas de Otimização:**
- Análise iterativa com limites de profundidade; cachear resultados intermediários; agrupar operações similares em lote

---

## Metadados

```yaml
story: N/A
version: 1.0.0
dependencies:
  - N/A
tags:
  - security
  - audit
updated_at: 2025-11-17
```

---


## Levantamento (Elicitation)

**Solicitar ao usuário que selecione o escopo da auditoria:**

```
Select security audit scope:

1. **rls** - RLS policy coverage only (quick)
2. **schema** - Schema design quality only (quick)
3. **full** - Complete security audit (comprehensive)

Which scope? [rls/schema/full]:
```

**Capturar:** `{scope}`

---

## Processo

### Escopo: Auditoria RLS

**Quando:** O usuário seleciona `rls` ou `full`

**Propósito:** Reportar tabelas com/sem RLS e listar todas as políticas

```bash
psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 <<'SQL'
\echo '=== RLS Coverage Audit ==='
\echo ''

-- Tables with/without RLS
WITH t AS (
  SELECT tablename, rowsecurity
  FROM pg_tables WHERE schemaname='public'
)
SELECT
  tablename,
  CASE WHEN rowsecurity THEN '✓ ENABLED' ELSE '❌ DISABLED' END AS rls_status,
  (SELECT json_agg(json_build_object(
    'policy', policyname,
    'cmd', cmd,
    'roles', roles,
    'qual', qual,
    'with_check', with_check
  ))
   FROM pg_policies p
   WHERE p.tablename=t.tablename
   AND p.schemaname='public') AS policies
FROM t
ORDER BY rowsecurity DESC, tablename;

\echo ''
\echo '=== RLS Summary ==='

SELECT
  COUNT(*) AS total_tables,
  COUNT(*) FILTER (WHERE rowsecurity) AS rls_enabled,
  COUNT(*) FILTER (WHERE NOT rowsecurity) AS rls_disabled
FROM pg_tables
WHERE schemaname='public';

\echo ''
\echo '=== Tables Without RLS (Security Risk) ==='

SELECT tablename
FROM pg_tables
WHERE schemaname='public'
AND rowsecurity = false
ORDER BY tablename;

\echo ''
\echo '=== Policy Coverage by Command ==='

SELECT
  tablename,
  COUNT(*) FILTER (WHERE cmd='SELECT') AS select_policies,
  COUNT(*) FILTER (WHERE cmd='INSERT') AS insert_policies,
  COUNT(*) FILTER (WHERE cmd='UPDATE') AS update_policies,
  COUNT(*) FILTER (WHERE cmd='DELETE') AS delete_policies
FROM pg_policies
WHERE schemaname='public'
GROUP BY tablename
ORDER BY tablename;

SQL
```

---

### Escopo: Auditoria de Schema

**Quando:** O usuário seleciona `schema` ou `full`

**Propósito:** Validar a qualidade do design de schema e as boas práticas

```bash
psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 <<'SQL'
\echo '=== Schema Design Quality Audit ==='
\echo ''

-- Missing Primary Keys
\echo '1. Tables Without Primary Keys (CRITICAL):'
SELECT t.tablename
FROM pg_tables t
LEFT JOIN pg_constraint c ON c.conrelid = (t.schemaname||'.'||t.tablename)::regclass
  AND c.contype = 'p'
WHERE t.schemaname = 'public'
  AND c.conname IS NULL
ORDER BY t.tablename;

\echo ''
\echo '2. Missing NOT NULL on Required Fields:'
SELECT
  table_name,
  column_name,
  data_type
FROM information_schema.columns
WHERE table_schema = 'public'
  AND is_nullable = 'YES'
  AND column_name IN ('email', 'user_id', 'created_at', 'updated_at', 'status')
ORDER BY table_name, column_name;

\echo ''
\echo '3. Missing Foreign Key Constraints:'
-- Tables with _id columns but no FK
SELECT
  c.table_name,
  c.column_name,
  'Missing FK to ' || REPLACE(c.column_name, '_id', 's') AS suggestion
FROM information_schema.columns c
LEFT JOIN information_schema.table_constraints tc
  ON tc.table_name = c.table_name
  AND tc.constraint_type = 'FOREIGN KEY'
LEFT JOIN information_schema.key_column_usage kcu
  ON kcu.constraint_name = tc.constraint_name
  AND kcu.column_name = c.column_name
WHERE c.table_schema = 'public'
  AND c.column_name LIKE '%_id'
  AND c.column_name != 'id'
  AND kcu.column_name IS NULL
ORDER BY c.table_name, c.column_name;

\echo ''
\echo '4. Missing Audit Timestamps (created_at, updated_at):'
SELECT
  t.tablename,
  CASE WHEN created_col.column_name IS NULL THEN '❌ No created_at' ELSE '✓' END AS created,
  CASE WHEN updated_col.column_name IS NULL THEN '❌ No updated_at' ELSE '✓' END AS updated
FROM pg_tables t
LEFT JOIN information_schema.columns created_col
  ON created_col.table_name = t.tablename
  AND created_col.column_name = 'created_at'
  AND created_col.table_schema = 'public'
LEFT JOIN information_schema.columns updated_col
  ON updated_col.table_name = t.tablename
  AND updated_col.column_name = 'updated_at'
  AND updated_col.table_schema = 'public'
WHERE t.schemaname = 'public'
  AND (created_col.column_name IS NULL OR updated_col.column_name IS NULL)
ORDER BY t.tablename;

\echo ''
\echo '5. Missing Indexes on Foreign Keys:'
SELECT
  t.tablename,
  c.column_name,
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
ORDER BY t.tablename, c.column_name;

\echo ''
\echo '=== Schema Audit Summary ==='
SELECT
  (SELECT COUNT(*) FROM pg_tables WHERE schemaname='public') AS total_tables,
  (SELECT COUNT(DISTINCT tablename) FROM pg_policies WHERE schemaname='public') AS tables_with_policies,
  (SELECT COUNT(*) FROM pg_constraint WHERE contype='f') AS foreign_keys,
  (SELECT COUNT(*) FROM pg_indexes WHERE schemaname='public') AS total_indexes;

SQL
```

---

### Escopo: Auditoria Completa

**Quando:** O usuário seleciona `full`

**Executa:** Auditoria RLS + Auditoria de Schema sequencialmente

**Verificações Adicionais:**

```bash
psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 <<'SQL'
\echo ''
\echo '=== Security Best Practices Check ==='
\echo ''

-- Check for sensitive data exposure
\echo '6. Potential PII/Sensitive Columns (Review for RLS):'
SELECT
  table_name,
  column_name,
  data_type
FROM information_schema.columns
WHERE table_schema = 'public'
  AND (
    column_name ILIKE '%password%'
    OR column_name ILIKE '%token%'
    OR column_name ILIKE '%secret%'
    OR column_name ILIKE '%ssn%'
    OR column_name ILIKE '%credit%'
    OR column_name ILIKE '%api_key%'
  )
ORDER BY table_name, column_name;

\echo ''
\echo '7. Public Schema Permissions:'
SELECT
  schemaname,
  tablename,
  tableowner,
  hasindexes,
  hasrules,
  hastriggers
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

SQL
```

---

## Saída

### Saída da Auditoria RLS

```
=== RLS Coverage Audit ===

 tablename | rls_status |           policies
-----------+------------+-------------------------------
 users     | ✓ ENABLED  | [{"policy":"Users read own",...}]
 posts     | ✓ ENABLED  | [{"policy":"Public read",...}]
 secrets   | ❌ DISABLED| null

=== RLS Summary ===

 total_tables | rls_enabled | rls_disabled
--------------+-------------+--------------
           10 |           8 |            2

=== Tables Without RLS (Security Risk) ===

 tablename
-----------
 secrets
 internal_logs
```

### Saída da Auditoria de Schema

```
=== Schema Design Quality Audit ===

1. Tables Without Primary Keys (CRITICAL):
 tablename
-----------
 (0 rows) ✓

2. Missing NOT NULL on Required Fields:
 table_name | column_name | data_type
------------+-------------+-----------
 users      | email       | text

3. Missing Foreign Key Constraints:
 table_name | column_name | suggestion
------------+-------------+----------------------
 posts      | user_id     | Missing FK to users

... (additional checks)
```

---

## Interpretação

### Problemas Críticos (Corrigir Imediatamente)

- **RLS Desabilitado:** Tabelas sem RLS são acessíveis publicamente
- **Sem Chaves Primárias:** Integridade dos dados em risco
- **Colunas Sensíveis Expostas:** PII/segredos sem proteção de RLS

### Problemas de Alta Prioridade (Corrigir em Breve)

- **Chaves Estrangeiras Ausentes:** Integridade dos dados e performance de queries
- **NOT NULL Ausente:** Problemas de qualidade dos dados
- **Índices Ausentes em FKs:** Degradação da performance de queries

### Problemas de Média Prioridade (Dívida Técnica)

- **Timestamps de Auditoria Ausentes:** Dificuldades de rastreamento
- **Nomenclatura Inconsistente:** Problemas de manutenibilidade

---

## Recomendações

**Após a Auditoria RLS:**
1. Habilitar RLS em todas as tabelas públicas: `ALTER TABLE {table} ENABLE ROW LEVEL SECURITY;`
2. Criar políticas para todas as operações CRUD (use o comando `*policy-apply`)
3. Testar com o comando `*test-as-user`

**Após a Auditoria de Schema:**
1. Adicionar chaves primárias ausentes: `ALTER TABLE {table} ADD PRIMARY KEY (id);`
2. Adicionar chaves estrangeiras ausentes: `ALTER TABLE {table} ADD FOREIGN KEY ({col}) REFERENCES {ref_table}(id);`
3. Adicionar NOT NULL ausente: `ALTER TABLE {table} ALTER COLUMN {col} SET NOT NULL;`
4. Criar índices nas chaves estrangeiras: `CREATE INDEX idx_{table}_{col} ON {table}({col});`

---

## Comandos Relacionados

- `*policy-apply {table} {mode}` - Instalar políticas RLS após a auditoria
- `*test-as-user {user_id}` - Testar políticas RLS
- `*verify-order {migration}` - Validar a ordenação do DDL da migration
- `*create-migration-plan` - Planejar mudanças de schema

---

**Nota:** Esta task consolidada substitui `db-rls-audit.md` e `schema-audit.md` (depreciados na v3.0)
