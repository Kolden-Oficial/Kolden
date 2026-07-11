---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Task: Impersonate User (RLS Testing)

**Propósito**: Definir os claims da sessão para emular um usuário autenticado em testes de RLS

**Elicit**: true

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
task: dbImpersonate()
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
duration_expected: 2-10 min (estimated)
cost_estimated: $0.001-0.008
token_usage: ~800-2,500 tokens
```

**Notas de Otimização:**
- Validar a configuração cedo; usar escritas atômicas; implementar checkpoints de rollback

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

- `user_id` (uuid): ID do usuário a ser personificado (impersonate)

---

## Processo

### 1. Confirmar a Personificação (Impersonation)

Pergunte ao usuário:
- ID do usuário a personificar: `{user_id}`
- Propósito da personificação (testar o quê?)
- Queries que você planeja rodar

**AVISO CRÍTICO**: Isto é apenas para testes. Nunca use em código de aplicação em produção.

### 2. Definir os Claims da Sessão

```bash
psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 <<SQL
-- Set JWT claims for current session
SELECT
  set_config('request.jwt.claims', 
    jsonb_build_object(
      'sub', '{user_id}',
      'role', 'authenticated'
    )::text, 
    true
  ) AS jwt_claims,
  set_config('request.jwt.claim.sub', '{user_id}', true) AS sub,
  set_config('role', 'authenticated', true) AS role;

-- Verify settings
SELECT 
  current_setting('request.jwt.claims', true) AS jwt_claims,
  current_setting('request.jwt.claim.sub', true) AS user_id,
  current_setting('role', true) AS role;

\echo ''
\echo '✓ Impersonating user: {user_id}'
\echo 'Run your test queries now.'
\echo 'To exit, close this session or run: RESET ALL;'
SQL
```

### 3. Sessão SQL Interativa

Abra um psql interativo para testes:

```bash
psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1
```

O usuário agora pode rodar queries como este usuário:

```sql
-- Test queries
SELECT * FROM my_table;  -- Should respect RLS for this user

-- Check current context
SELECT 
  auth.uid() AS current_user_id,
  current_setting('role') AS current_role;

-- Exit impersonation
RESET ALL;
```

---

## Cenários de Teste

### Teste Positivo (Deve Ter Sucesso)

Teste que o usuário PODE acessar seus próprios dados:

```sql
-- User should see their own records
SELECT * FROM users WHERE id = auth.uid();

-- User should see their own fragments
SELECT * FROM fragments WHERE user_id = auth.uid();
```

### Teste Negativo (Deve Falhar ou Retornar Vazio)

Teste que o usuário NÃO PODE acessar dados de terceiros:

```sql
-- Should return empty (not their data)
SELECT * FROM fragments WHERE user_id != auth.uid();

-- Should fail if trying to insert as another user
INSERT INTO fragments (user_id, content) 
VALUES ('00000000-0000-0000-0000-000000000000', 'test');
-- Expected: RLS policy violation
```

### Teste Multi-Tenant

Se estiver usando isolamento baseado em organização:

```sql
-- Set org_id in JWT
SELECT set_config('request.jwt.claims', 
  jsonb_build_object(
    'sub', '{user_id}',
    'role', 'authenticated',
    'org_id', '{org_id}'
  )::text, 
  true
);

-- Test org isolation
SELECT * FROM projects;  -- Should only see org's projects
```

---

## Casos de Uso Comuns

### Testar uma Nova Policy de RLS

```sql
-- 1. Apply new policy
CREATE POLICY "new_policy" ON table_name ...;

-- 2. Impersonate user
*impersonate {user_id}

-- 3. Test access
SELECT * FROM table_name;

-- 4. Reset and test as different user
RESET ALL;
*impersonate {other_user_id}
SELECT * FROM table_name;
```

### Depurar Problemas de Acesso

O usuário relata "não consigo ver meus dados":

```sql
-- 1. Impersonate the user
*impersonate {user_id}

-- 2. Try their query
SELECT * FROM table_name WHERE ...;

-- 3. Check what RLS policies are active
SELECT * FROM pg_policies 
WHERE tablename = 'table_name';

-- 4. Verify user_id matches
SELECT auth.uid(), user_id FROM table_name LIMIT 5;
```

### Validar Cenário Multi-Usuário

```sql
-- User A
*impersonate {user_a_id}
SELECT COUNT(*) FROM fragments;  -- Returns A's count

-- User B
*impersonate {user_b_id}
SELECT COUNT(*) FROM fragments;  -- Returns B's count

-- Verify isolation
SELECT user_id, COUNT(*) FROM fragments GROUP BY user_id;
-- Should only show current user in impersonation
```

---

## Notas Importantes

### Apenas Local à Sessão

As configurações são locais à sessão e são resetadas quando:
- A sessão é fechada
- `RESET ALL;` é executado
- Uma nova conexão é estabelecida

### Não Para Produção

**Nunca use isto em código de aplicação:**
- ❌ Definir claims manualmente no app
- ❌ Burlar o Supabase Auth
- ✅ Apenas para testes e depuração

### A Service Role Burla o RLS

Se estiver usando a chave de service role, o RLS é burlado completamente:
- Não é possível testar RLS com a service role
- É preciso usar a role authenticated
- A service role enxerga TODOS os dados

### Funciona com Funções

As policies de RLS respeitam estas configurações mesmo dentro de funções:

```sql
CREATE FUNCTION get_user_data() 
RETURNS TABLE(...)
LANGUAGE sql
SECURITY DEFINER  -- Function runs as owner
AS $$
  SELECT * FROM table_name;  -- Still respects RLS
$$;
```

---

## Sair da Personificação (Impersonation)

Para parar de personificar:

```sql
-- Reset all session variables
RESET ALL;

-- Or just close the psql session
\q
```

---

## Solução de Problemas

### "auth.uid() returns NULL"

**Problema**: Claims não definidos corretamente  
**Correção**: Verifique o formato dos claims e a definição da role

```sql
-- Check current settings
SELECT 
  current_setting('request.jwt.claims', true),
  current_setting('role', true);
```

### "Still seeing all data"

**Problema**: Usando service role ou RLS não habilitado  
**Correção**: 
1. Verifique a connection string (não deve ser service role)
2. Confirme que o RLS está habilitado: `*rls-audit`
3. Confirme que existem policies

### "Permission denied"

**Problema**: Role não definida como authenticated  
**Correção**: Garanta que a role está definida:

```sql
SELECT set_config('role', 'authenticated', true);
```

---

## Integração com o Workflow

Workflow de teste típico:

1. Crie/modifique a policy de RLS
2. `*dry-run migration.sql` - Verificação de sintaxe
3. `*apply-migration migration.sql` - Aplicar mudanças
4. `*impersonate {test_user_id}` - Testar como usuário
5. Rodar queries de teste
6. `*impersonate {other_user_id}` - Testar isolamento
7. `*rls-audit` - Verificar cobertura

---

## Lembrete de Segurança

🔒 **Esta é apenas uma ferramenta de teste**  

Nunca burle o Supabase Auth em produção. Sempre use:
- Cliente Supabase com autenticação de usuário
- Tokens JWT apropriados de auth.users
- Sessões de usuário reais com credenciais válidas
