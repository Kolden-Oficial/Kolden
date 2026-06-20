# Task: Smoke Test de BD

**Propósito**: Executar verificações de validação pós-migration

**Elicit**: false

---

## Processo

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

### 3. Planejamento Pré-Voo - Planejamento Abrangente Antecipado
- Fase de análise da tarefa (identificar todas as ambiguidades)
- Execução com zero ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: dbSmokeTest()
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

## Tools

**Recursos externos/compartilhados usados por esta task:**

- **Tool:** supabase
  - **Propósito:** Conexão com o banco de dados PostgreSQL via cliente Supabase
  - **Origem:** @supabase/supabase-js

- **Tool:** query-validator
  - **Propósito:** Validação de sintaxe de queries SQL
  - **Origem:** .aiox-core/utils/db-query-validator.js

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** db-query.js
  - **Propósito:** Executar queries PostgreSQL com tratamento de erros via Supabase
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/scripts/db-query.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Falha de Conexão
   - **Causa:** Incapaz de conectar ao banco de dados Neo4j
   - **Resolução:** Verifique a connection string, as credenciais, a rede
   - **Recuperação:** Tentar novamente com backoff exponencial (máximo de 3 tentativas)

2. **Erro:** Erro de Sintaxe de Query
   - **Causa:** Sintaxe inválida de query Cypher
   - **Resolução:** Validar a sintaxe da query antes da execução
   - **Recuperação:** Retornar erro de sintaxe detalhado, sugerir correção

3. **Erro:** Rollback de Transação
   - **Causa:** A query viola constraints ou atinge timeout
   - **Resolução:** Revisar a lógica e as constraints da query
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
- Valide a configuração cedo; use escritas atômicas; implemente checkpoints de rollback

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


### 1. Localizar o Arquivo de Smoke Test

Procure pelo smoke test nesta ordem:

1. `supabase/tests/smoke/v_current.sql` (específico do projeto)
2. `supabase/tests/smoke_test.sql` (específico do projeto)
3. `.aiox-core/product/templates/tmpl-smoke-test.sql` (template)

### 2. Executar o Smoke Test

```bash
SMOKE_TEST=""

if [ -f "supabase/tests/smoke/v_current.sql" ]; then
  SMOKE_TEST="supabase/tests/smoke/v_current.sql"
elif [ -f "supabase/tests/smoke_test.sql" ]; then
  SMOKE_TEST="supabase/tests/smoke_test.sql"
elif [ -f ".aiox-core/product/templates/tmpl-smoke-test.sql" ]; then
  SMOKE_TEST=".aiox-core/product/templates/tmpl-smoke-test.sql"
else
  echo "❌ No smoke test file found"
  exit 1
fi

echo "Running smoke test: $SMOKE_TEST"
psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 -f "$SMOKE_TEST"
```

### 3. Reportar os Resultados

**Se bem-sucedido:**
```
✅ Smoke Test Passed

Checks completed:
  ✓ Table count validation
  ✓ Policy count validation
  ✓ Function existence checks
  ✓ Basic query sanity
```

**Se falhar:**
```
❌ Smoke Test Failed

Review errors above and:
  1. Check migration completeness
  2. Verify RLS policies installed
  3. Confirm functions created
  4. Consider rollback if critical
```

---

## O Que É Testado

Smoke tests básicos normalmente verificam:

### Objetos de Schema
- Tabelas esperadas existem
- Views esperadas existem
- Funções esperadas existem
- Triggers esperados existem

### Cobertura de RLS
- RLS habilitado em tabelas sensíveis
- Políticas existem e estão nomeadas corretamente
- Queries básicas de RLS não geram erro

### Integridade de Dados
- Foreign keys válidas
- Check constraints válidas
- Queries de amostra retornam os resultados esperados

### Performance
- Queries básicas concluem em tempo razoável
- Sem índices ausentes em FKs

---

## Criando Smoke Tests Personalizados

Crie `supabase/tests/smoke/v_X_Y_Z.sql`:

```sql
-- Smoke Test for v1.2.0
SET client_min_messages = warning;

-- Table count
SELECT COUNT(*) AS tables FROM information_schema.tables 
WHERE table_schema='public';
-- Expected: 15

-- RLS enabled
SELECT tablename FROM pg_tables 
WHERE schemaname='public' AND rowsecurity = false;
-- Expected: empty (all tables have RLS)

-- Critical functions exist
SELECT proname FROM pg_proc 
WHERE pronamespace = 'public'::regnamespace
AND proname IN ('function1', 'function2');
-- Expected: 2 rows

-- Sample data query
SELECT COUNT(*) FROM users WHERE deleted_at IS NULL;
-- Expected: > 0

-- RLS sanity (doesn't error)
SET LOCAL request.jwt.claims = '{"sub":"00000000-0000-0000-0000-000000000000","role":"authenticated"}';
SELECT 1 FROM protected_table LIMIT 1;
```

---

## Melhores Práticas

1. **Testes específicos por versão** - Nomeie pela versão do schema
2. **Execução rápida** - Menos de 5 segundos
3. **Sem efeitos colaterais** - Queries somente leitura
4. **Expectativas claras** - Documente os resultados esperados
5. **Falhar rápido** - Use ON_ERROR_STOP

---

## Próximos Passos Após Aprovação

✓ Migration validada  
→ Atualizar o log de migration  
→ Executar auditoria de RLS: `*rls-audit`  
→ Verificar performance: `*analyze-hotpaths`

## Próximos Passos Após Falha

❌ Problemas de migration detectados  
→ Revisar os erros  
→ Considerar rollback: `*rollback {snapshot}`  
→ Corrigir a migration  
→ Tentar novamente
