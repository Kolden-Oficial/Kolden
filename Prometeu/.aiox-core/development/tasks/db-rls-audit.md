---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Task: RLS Audit

**Propósito**: Reportar tabelas com/sem RLS e listar todas as policies

**Elicit**: false

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

### 3. Planejamento Pre-Flight - Planejamento Abrangente Antecipado
- Fase de análise da task (identificar todas as ambiguidades)
- Execução com zero ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, default: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: dbRlsAudit()
responsável: Dara (Sage)
responsavel_type: Agente
atomic_layer: Strategy

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

**Propósito:** Validar o sucesso da execução DEPOIS que a task é concluída

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

**Propósito:** Critérios definitivos de aprovação/reprovação para a conclusão da task

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
  - **Origem:** npm: neo4j-driver

- **Ferramenta:** query-validator
  - **Propósito:** Validação de sintaxe de query Cypher
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

1. **Erro:** Connection Failed
   - **Causa:** Não foi possível conectar ao banco de dados Neo4j
   - **Resolução:** Verifique a connection string, credenciais, rede
   - **Recuperação:** Repetir com backoff exponencial (máx. 3 tentativas)

2. **Erro:** Query Syntax Error
   - **Causa:** Sintaxe de query Cypher inválida
   - **Resolução:** Validar a sintaxe da query antes da execução
   - **Recuperação:** Retornar erro de sintaxe detalhado, sugerir correção

3. **Erro:** Transaction Rollback
   - **Causa:** A query viola constraints ou atinge timeout
   - **Resolução:** Revisar a lógica e as constraints da query
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
- Análise iterativa com limites de profundidade; cache de resultados intermediários; agrupar operações similares em lote

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


## Processo

### Rodar a Auditoria Abrangente de RLS

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
\echo '=== Summary ==='

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
\echo '=== Policy Coverage ==='

SELECT 
  t.tablename,
  COUNT(p.policyname) AS policy_count,
  ARRAY_AGG(p.cmd) AS commands_covered
FROM pg_tables t
LEFT JOIN pg_policies p ON p.tablename = t.tablename AND p.schemaname = 'public'
WHERE t.schemaname = 'public'
AND t.rowsecurity = true
GROUP BY t.tablename
ORDER BY policy_count, t.tablename;

SQL
```

---

## Interpretação do Output

### Status do RLS

**✓ ENABLED** - A tabela tem RLS ativo (bom)  
**❌ DISABLED** - A tabela não tem RLS (risco de segurança)

### Cobertura de Policies

**Boa cobertura:**
- 1 policy com `FOR ALL` (abordagem KISS), OU
- 4 policies cobrindo SELECT, INSERT, UPDATE, DELETE (granular)

**Cobertura incompleta:**
- RLS habilitado mas 0 policies = ninguém consegue acessar
- 1-3 policies (granular) = algumas operações não cobertas

**Sem cobertura:**
- RLS desabilitado = acesso total sem restrições

---

## Problemas Comuns e Correções

### Problema: A tabela tem RLS mas não tem policies

**Problema**: RLS habilitado mas nenhuma policy definida  
**Impacto**: A tabela fica inacessível para todos os usuários  
**Correção**: Adicione policies ou desabilite o RLS

```sql
-- Add KISS policy
ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;

CREATE POLICY "table_name_all"
ON table_name FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
```

Ou use: `*policy-apply table_name kiss`

### Problema: A tabela não tem RLS

**Problema**: Tabela acessível sem restrições  
**Impacto**: Vulnerabilidade de segurança, exposição de dados  
**Correção**: Habilite o RLS e adicione policies

```sql
ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;
-- Then add policies
```

### Problema: Cobertura de policy incompleta (granular)

**Problema**: RLS habilitado com 1-3 policies (sem cobrir todas as operações)  
**Impacto**: Algumas operações podem ser bloqueadas inesperadamente  
**Correção**: Adicione as policies faltantes ou mude para a abordagem KISS

---

## Ações Recomendadas

### Para Dados Públicos
Tabelas que deveriam ser legíveis publicamente:

```sql
-- Public read, authenticated write
CREATE POLICY "public_read"
ON table_name FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "authenticated_write"
ON table_name FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);
```

### Para Dados de Propriedade do Usuário
Use a policy KISS:

```bash
*policy-apply table_name kiss
```

### Para Dados Multi-Tenant
Acesso com escopo de organização:

```sql
CREATE POLICY "org_isolation"
ON table_name FOR ALL
TO authenticated
USING (org_id = (auth.jwt() ->> 'org_id')::uuid)
WITH CHECK (org_id = (auth.jwt() ->> 'org_id')::uuid);
```

---

## Testando Policies de RLS

Após corrigir os problemas, teste com:

```bash
*impersonate {user_id}
# Then run queries to verify access
```

---

## Boas Práticas

✅ **Habilite o RLS em todas as tabelas com dados sensíveis**  
✅ **Use policies KISS para acesso simples baseado em proprietário**  
✅ **Documente por que o RLS está desabilitado, se for intencional**  
✅ **Teste as policies com contextos de usuário reais**  
✅ **Indexe as colunas usadas nas policies de RLS**  
✅ **Rode esta auditoria após cada migration**

❌ **Não habilite o RLS sem policies**  
❌ **Não use a service role para burlar o RLS no código da aplicação**  
❌ **Não esqueça de testar os casos negativos**

---

## Integração com o Workflow

Rode a auditoria de RLS:
1. Após migrations: `*smoke-test` → `*rls-audit`
2. Antes do deploy em produção: `*rls-audit`
3. Revisões de segurança regulares: `*rls-audit`
4. Ao adicionar novas tabelas: `*rls-audit`
