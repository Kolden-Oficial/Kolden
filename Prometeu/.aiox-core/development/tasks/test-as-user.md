---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Task: Test As User (RLS Testing)

**Propósito**: Emular usuário autenticado para teste de políticas RLS

**Elicit**: true

**Renomeado De (Story 6.1.2.3):**
- `db-impersonate.md` - Nome mais claro para o propósito de teste de RLS

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

### 3. Planejamento Pre-Flight - Planejamento Antecipado Abrangente
- Fase de análise da task (identificar todas as ambiguidades)
- Execução sem ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: testAsUser()
responsável: Quinn (Guardian)
responsavel_type: Agente
atomic_layer: Config

**Entrada:**
- campo: task
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Must be registered task

- campo: parameters
  tipo: object
  origem: User Input
  obrigatório: false
  validação: Valid task parameters

- campo: mode
  tipo: string
  origem: User Input
  obrigatório: false
  validação: yolo|interactive|pre-flight

**Saída:**
- campo: execution_result
  tipo: object
  destino: Memory
  persistido: false

- campo: logs
  tipo: array
  destino: File (.ai/logs/*)
  persistido: true

- campo: state
  tipo: object
  destino: State management
  persistido: true
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Task is registered; required parameters provided; dependencies met
    tipo: pre-condition
    blocker: true
    validação: |
      Check task is registered; required parameters provided; dependencies met
    error_message: "Pre-condition failed: Task is registered; required parameters provided; dependencies met"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a conclusão da task

**Checklist:**

```yaml
post-conditions:
  - [ ] Task completed; exit code 0; expected outputs created
    tipo: post-condition
    blocker: true
    validação: |
      Verify task completed; exit code 0; expected outputs created
    error_message: "Post-condition failed: Task completed; exit code 0; expected outputs created"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de pass/fail para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Task completed as expected; side effects documented
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Assert task completed as expected; side effects documented
    error_message: "Acceptance criterion not met: Task completed as expected; side effects documented"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** task-runner
  - **Propósito:** Execução e orquestração de tasks
  - **Fonte:** .aiox-core/core/task-runner.js

- **Ferramenta:** logger
  - **Propósito:** Logging de execução e rastreamento de erros
  - **Fonte:** .aiox-core/utils/logger.js

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** execute-task.js
  - **Propósito:** Wrapper genérico de execução de tasks
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/scripts/execute-task.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Task Not Found
   - **Causa:** Task especificada não registrada no sistema
   - **Resolução:** Verificar o nome e o registro da task
   - **Recuperação:** Listar tasks disponíveis, sugerir semelhantes

2. **Erro:** Invalid Parameters
   - **Causa:** Os parâmetros da task não correspondem ao schema esperado
   - **Resolução:** Validar os parâmetros contra a definição da task
   - **Recuperação:** Fornecer template de parâmetros, rejeitar a execução

3. **Erro:** Execution Timeout
   - **Causa:** A task excede o tempo máximo de execução
   - **Resolução:** Otimizar a task ou aumentar o timeout
   - **Recuperação:** Encerrar a task, limpar recursos, registrar o estado

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

## Metadados

```yaml
story: N/A
version: 1.0.0
dependencies:
  - N/A
tags:
  - automation
  - workflow
updated_at: 2025-11-17
```

---


## Entradas

**Obrigatório:**
- `user_id` (uuid): ID do usuário a emular

**Opcional:**
- `role` (text): Role a testar (padrão: 'authenticated')

---

## Elicitação

**Solicitar ao usuário:**

```
=== Teste de Políticas RLS ===

Informe o ID do usuário a emular:
```

**Captura:** `{user_id}`

```
Informe o role (padrão: authenticated):
Opções: authenticated, anon, service_role
```

**Captura:** `{role}` (padrão: 'authenticated')

```
O que você está testando?
(ex.: "Usuário só pode ler os próprios posts", "Admin consegue ver todos os dados")
```

**Captura:** `{test_purpose}`

**AVISO CRÍTICO:** Exibir aviso:
```
⚠️  ATENÇÃO: Isto é apenas para teste de RLS!
   - Nunca use em código de aplicação em produção
   - Os claims de sessão são temporários (apenas a sessão atual)
   - Use a chave service_role com extrema cautela
```

**Confirmar:** O usuário reconhece o aviso (y/n)

---

## Processo

### Passo 1: Definir os Claims de Sessão

```bash
psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 <<SQL
\echo '=== Definindo os Claims de Sessão ==='
\echo ''
\echo 'User ID: {user_id}'
\echo 'Role: {role}'
\echo 'Purpose: {test_purpose}'
\echo ''

-- Definir os claims JWT para a sessão atual
SELECT
  set_config('request.jwt.claims',
    jsonb_build_object(
      'sub', '{user_id}',
      'role', '{role}',
      'email', 'test-user@example.com'
    )::text,
    true
  ) AS jwt_claims_set;

-- Definir claim individual para a função auth.uid()
SELECT
  set_config('request.jwt.claim.sub', '{user_id}', true) AS user_id_set,
  set_config('role', '{role}', true) AS role_set;

\echo ''
\echo '=== Verificação ==='

-- Verificar as configurações
SELECT
  current_setting('request.jwt.claims', true) AS jwt_claims,
  current_setting('request.jwt.claim.sub', true) AS user_id,
  current_setting('role', true) AS role,
  auth.uid() AS auth_uid_function;

\echo ''
\echo '✓ Sessão configurada para o usuário: {user_id}'
\echo ''

SQL
```

### Passo 2: Exemplos de Query de Teste

**Forneça ao usuário templates de query de teste:**

```sql
-- Exemplo 1: Testar acesso SELECT (tabela users)
SELECT id, email, created_at
FROM users
WHERE id = auth.uid();
-- Esperado: Deve retornar 1 linha (apenas o usuário atual)

-- Exemplo 2: Testar acesso SELECT (tabela posts)
SELECT id, title, user_id, created_at
FROM posts
WHERE user_id = auth.uid();
-- Esperado: Deve retornar apenas os posts criados por este usuário

-- Exemplo 3: Testar acesso INSERT
INSERT INTO posts (title, content, user_id)
VALUES ('Test Post', 'Test Content', auth.uid());
-- Esperado: Deve ter sucesso se o RLS permitir INSERT

-- Exemplo 4: Testar acesso UPDATE (dados próprios)
UPDATE posts
SET title = 'Updated Title'
WHERE id = '...' AND user_id = auth.uid();
-- Esperado: Deve ter sucesso apenas se o post pertencer ao usuário

-- Exemplo 5: Testar acesso UPDATE (dados de outro usuário)
UPDATE posts
SET title = 'Hacked!'
WHERE user_id != auth.uid();
-- Esperado: Deve falhar ou afetar 0 linhas (RLS bloqueia)

-- Exemplo 6: Testar acesso DELETE
DELETE FROM posts
WHERE id = '...' AND user_id = auth.uid();
-- Esperado: Deve ter sucesso apenas se o post pertencer ao usuário
```

### Passo 3: Sessão Interativa de Teste

```bash
\echo ''
\echo '=== Teste Interativo ==='
\echo ''
\echo 'Entrando na sessão interativa do psql...'
\echo 'Você está agora emulando o usuário: {user_id}'
\echo ''
\echo 'Comandos disponíveis:'
\echo '  - Rode qualquer query SQL para testar RLS'
\echo '  - \d tablename - Mostrar a estrutura da tabela'
\echo '  - \dp tablename - Mostrar as políticas RLS'
\echo '  - SELECT auth.uid(); - Verificar o usuário atual'
\echo '  - RESET ALL; - Sair da emulação'
\echo '  - \q - Sair do psql'
\echo ''

psql "$SUPABASE_DB_URL"
```

---

## Cenários de Teste Comuns

### Cenário 1: Usuário Só Pode Ler os Próprios Dados

**Teste:** Verificar que o usuário só consegue dar SELECT nas próprias linhas

```sql
-- Deve retornar apenas as linhas onde user_id = auth.uid()
SELECT * FROM posts;

-- Verificar que auth.uid() está definido corretamente
SELECT auth.uid() AS current_user;

-- Conferir a política
\dp posts
```

**Resultado Esperado:**
- Apenas as linhas com `user_id = '{user_id}'` retornadas
- A política `users_read_own_posts` deve estar ativa

### Cenário 2: Usuário Não Pode Ler Dados de Outros Usuários

**Teste:** Verificar que o RLS bloqueia o acesso aos dados de outros usuários

```sql
-- Tentar ler um post específico de outro usuário
SELECT * FROM posts WHERE user_id != auth.uid();
```

**Resultado Esperado:**
- 0 linhas retornadas (RLS bloqueia o acesso)
- Nenhum erro (apenas filtrado pelo RLS)

### Cenário 3: Usuário Pode Inserir os Próprios Dados

**Teste:** Verificar que o usuário consegue dar INSERT com o user_id correto

```sql
-- Deve ter sucesso (user_id corresponde a auth.uid())
INSERT INTO posts (title, content, user_id)
VALUES ('My Post', 'Content', auth.uid());

-- Deve falhar (user_id não corresponde a auth.uid())
INSERT INTO posts (title, content, user_id)
VALUES ('Hacked Post', 'Content', 'another-user-id');
```

**Resultado Esperado:**
- O primeiro INSERT tem sucesso
- O segundo INSERT falha ou é bloqueado pela política RLS `WITH CHECK`

### Cenário 4: Usuário Não Pode Atualizar Dados de Outros Usuários

**Teste:** Verificar que o usuário não consegue dar UPDATE em linhas que não possui

```sql
-- Deve ter sucesso (post próprio)
UPDATE posts SET title = 'Updated' WHERE id = 'my-post-id';

-- Deve afetar 0 linhas (RLS filtra)
UPDATE posts SET title = 'Hacked' WHERE user_id != auth.uid();
```

**Resultado Esperado:**
- O primeiro UPDATE tem sucesso
- O segundo UPDATE retorna `UPDATE 0` (nenhuma linha modificada)

### Cenário 5: Admin Consegue Ver Todos os Dados

**Teste:** Verificar que o role admin/service ignora o RLS

```sql
-- Rodar novamente o teste com role = 'service_role'
-- (requer reiniciar o test-as-user com um role diferente)

SELECT * FROM posts;  -- Deve ver TODOS os posts
```

**Resultado Esperado:**
- Todas as linhas retornadas (o service_role ignora o RLS)
- **ATENÇÃO:** Nunca use o service_role em código de cliente!

---

## Solução de Problemas

### Problema: auth.uid() retorna NULL

**Causa:** Os claims de sessão não foram definidos corretamente

**Correção:**
```sql
-- Conferir as configurações atuais
SELECT
  current_setting('request.jwt.claim.sub', true) AS sub,
  auth.uid() AS auth_uid;

-- Se sub estiver definido mas auth_uid for NULL, reinicie a sessão
RESET ALL;
-- Rode novamente o comando test-as-user
```

### Problema: política RLS não está sendo aplicada

**Causa:** RLS não habilitado na tabela

**Correção:**
```sql
-- Conferir se o RLS está habilitado
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';

-- Habilitar RLS
ALTER TABLE {tablename} ENABLE ROW LEVEL SECURITY;
```

### Problema: erro "Permission denied"

**Causa:** O role não tem permissões na tabela

**Correção:**
```sql
-- Conceder permissões de tabela ao role
GRANT SELECT, INSERT, UPDATE, DELETE ON {tablename} TO authenticated;
```

### Problema: Consegue ver dados de outros usuários

**Causa:** Política RLS ausente ou incorreta

**Correção:**
```sql
-- Conferir as políticas existentes
\dp {tablename}

-- Criar a política ausente (exemplo)
CREATE POLICY users_read_own_data ON {tablename}
  FOR SELECT
  USING (user_id = auth.uid());
```

---

## Boas Práticas

### Antes de Testar

1. **Conheça suas políticas:** Revise as políticas RLS antes de testar
   ```sql
   \dp tablename
   ```

2. **Tenha dados de teste:** Garanta que o usuário de teste tenha dados para consultar
   ```sql
   SELECT * FROM posts WHERE user_id = '{user_id}';
   ```

3. **Documente os casos de teste:** Anote o que você espera que aconteça

### Durante o Teste

1. **Teste casos positivos:** Verifique que o usuário CONSEGUE acessar os próprios dados
2. **Teste casos negativos:** Verifique que o usuário NÃO CONSEGUE acessar os dados de outros
3. **Teste todas as operações:** SELECT, INSERT, UPDATE, DELETE
4. **Teste casos extremos:** valores NULL, resultados vazios, acesso concorrente

### Após o Teste

1. **Reinicie a sessão:** Sempre rode `RESET ALL;` ou feche a sessão
2. **Documente os resultados:** Anote quaisquer lacunas ou problemas nas políticas
3. **Corrija as políticas:** Atualize as políticas RLS com base nos resultados do teste
4. **Teste novamente:** Verifique as correções com outra execução de teste

---

## Notas de Segurança

**NUNCA faça isto em produção:**

```javascript
// ❌ RUIM: Definir claims JWT no código da aplicação
supabase.rpc('set_claims', { user_id: userId })

// ❌ RUIM: Usar a chave service_role no cliente
const supabase = createClient(url, SERVICE_ROLE_KEY)
```

**Workflow de teste:**

```
DB de Desenvolvimento → comando test-as-user → Verificar RLS
                                      ↓
                              Corrigir políticas se necessário
                                      ↓
                         Deploy para staging → Testar com auth real
                                      ↓
                              Produção (tokens JWT reais)
```

---

## Comandos Relacionados

- `*security-audit rls` - Auditar a cobertura de RLS antes de testar
- `*policy-apply {table}` - Instalar políticas RLS
- `*create-migration-plan` - Planejar migrations de políticas RLS
- `*impersonate` - Comando legado (deprecado, use `*test-as-user`)

---

## Exemplo de Saída

```
=== Definindo os Claims de Sessão ===

User ID: 123e4567-e89b-12d3-a456-426614174000
Role: authenticated
Purpose: Test user can only read own posts

 jwt_claims_set
----------------
 t

 user_id_set | role_set
-------------+----------
 t           | t

=== Verificação ===

 jwt_claims                                      | user_id                              | role          | auth_uid_function
-------------------------------------------------+--------------------------------------+---------------+----------------------------------
 {"sub":"123e4567-e89b-12d3-a456-426614174000"...| 123e4567-e89b-12d3-a456-426614174000 | authenticated | 123e4567-e89b-12d3-a456-426614174000

✓ Sessão configurada para o usuário: 123e4567-e89b-12d3-a456-426614174000

=== Teste Interativo ===

Entrando na sessão interativa do psql...
Você está agora emulando o usuário: 123e4567-e89b-12d3-a456-426614174000

psql (14.5)
Type "help" for help.

database=>
```

---

**Nota:** Esta task substitui `db-impersonate.md` com uma nomenclatura mais clara (renomeada na Story 6.1.2.3)
