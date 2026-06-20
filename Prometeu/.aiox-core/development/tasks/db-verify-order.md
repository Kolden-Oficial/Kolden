# Task: Verificar Ordenação de DDL

**Propósito**: Fazer lint do DDL para uma ordem de execução segura, evitando erros de dependência

**Elicit**: true

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

### 3. Planejamento Pré-Voo - Planejamento Abrangente Antecipado
- Fase de análise da tarefa (identificar todas as ambiguidades)
- Execução com zero ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: dbVerifyOrder()
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
duration_expected: 5-20 min (estimated)
cost_estimated: $0.003-0.015
token_usage: ~2,000-8,000 tokens
```

**Notas de Otimização:**
- Análise iterativa com limites de profundidade; faça cache dos resultados intermediários; agrupe operações similares em lote

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

- `path` (string): Caminho para o arquivo SQL de migration

---

## Processo

### 1. Extrair as Seções de DDL

Faça o parsing do arquivo de migration e identifique as seções:

```bash
awk 'BEGIN{IGNORECASE=1}
  /create extension|alter extension/ {print "EXT:", NR, $0}
  /create table/ {print "TAB:", NR, $0}
  /create or replace function|create function/ {print "FUN:", NR, $0}
  /create trigger/ {print "TRG:", NR, $0}
  /enable row level security|create policy/ {print "RLS:", NR, $0}
  /create .* view/ {print "VIEW:", NR, $0}
' {path} > /tmp/ddl_order.txt

echo "=== DDL Section Analysis ==="
cat /tmp/ddl_order.txt
```

### 2. Analisar a Ordenação

Mostre a ordem recomendada e a ordem real:

```
Recommended Execution Order:
1. Extensions (CREATE EXTENSION)
2. Tables & Constraints (CREATE TABLE, ALTER TABLE)
3. Functions (CREATE FUNCTION)
4. Triggers (CREATE TRIGGER)
5. RLS (ENABLE RLS, CREATE POLICY)
6. Views & Materialized Views (CREATE VIEW)

Actual Order in File:
[output from grep above]
```

### 3. Executar Verificações Heurísticas

Detecte problemas comuns de ordenação:

```bash
# Check: Functions before tables
FIRST_TAB=$(grep '^TAB:' /tmp/ddl_order.txt | head -1 | cut -d: -f2)
FIRST_FUN=$(grep '^FUN:' /tmp/ddl_order.txt | head -1 | cut -d: -f2)

if [ -n "$FIRST_TAB" ] && [ -n "$FIRST_FUN" ] && [ "$FIRST_FUN" -lt "$FIRST_TAB" ]; then
  echo "❌ Functions appear before tables. Reorder recommended."
  exit 2
fi

# Check: RLS before tables exist
FIRST_RLS=$(grep '^RLS:' /tmp/ddl_order.txt | head -1 | cut -d: -f2)
if [ -n "$FIRST_RLS" ] && [ -n "$FIRST_TAB" ] && [ "$FIRST_RLS" -lt "$FIRST_TAB" ]; then
  echo "❌ RLS commands before table creation. Reorder required."
  exit 2
fi

# Check: Triggers before functions
FIRST_TRG=$(grep '^TRG:' /tmp/ddl_order.txt | head -1 | cut -d: -f2)
if [ -n "$FIRST_TRG" ] && [ -n "$FIRST_FUN" ] && [ "$FIRST_TRG" -lt "$FIRST_FUN" ]; then
  echo "⚠️ Triggers before functions. May fail if trigger calls function."
fi

echo "✓ Ordering looks reasonable by heuristics"
```

### 4. Reportar os Resultados

**Se todas as verificações passarem:**
```
✅ DDL Ordering Validation Passed

Sections found:
  - Extensions: X
  - Tables: Y
  - Functions: Z
  - Triggers: N
  - RLS: M
  - Views: V

Order appears correct. Safe to proceed with:
  *dry-run {path}
```

**Se forem encontrados problemas:**
```
❌ DDL Ordering Issues Detected

Problems:
  - Functions defined before tables (line X vs line Y)
  - Triggers reference functions not yet created
  
Recommended fixes:
  1. Move CREATE EXTENSION to top
  2. Group CREATE TABLE statements
  3. Then CREATE FUNCTION
  4. Then CREATE TRIGGER
  5. Then ENABLE RLS + policies
  6. Finally CREATE VIEW

After fixing, re-run: *verify-order {path}
```

---

## Exemplos de Ordenação Correta

### ✅ Ordem Boa

```sql
-- 1. Extensions first
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Tables and constraints
CREATE TABLE users (...);
CREATE TABLE fragments (...);
ALTER TABLE fragments ADD CONSTRAINT fk_user ...;

-- 3. Functions
CREATE OR REPLACE FUNCTION current_user_id() ...;
CREATE OR REPLACE FUNCTION update_timestamp() ...;

-- 4. Triggers
CREATE TRIGGER set_timestamp 
BEFORE UPDATE ON users ...;

-- 5. RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users_all" ON users ...;

-- 6. Views
CREATE VIEW user_fragments_view AS ...;
```

### ❌ Ordem Ruim (Vai Falhar)

```sql
-- ❌ Function before table it references
CREATE FUNCTION get_user_name(user_id UUID) 
RETURNS TEXT AS $$
  SELECT name FROM users WHERE id = user_id;  -- users doesn't exist yet!
$$ LANGUAGE sql;

-- ❌ Table created after function
CREATE TABLE users (...);

-- ❌ RLS before table
CREATE POLICY "users_policy" ON users ...;  -- Can't create policy on non-existent table
```

---

## Padrões Comuns de Dependência

### Padrão 1: Funções Chamando Outras Funções

**Ordem**: Funções base → Funções compostas

```sql
-- First: Base function
CREATE FUNCTION base_func() ...;

-- Second: Function that calls base_func
CREATE FUNCTION composite_func() AS $$
BEGIN
  RETURN base_func();  -- Safe, base_func exists
END;
$$ LANGUAGE plpgsql;
```

### Padrão 2: Tabelas com Foreign Keys

**Ordem**: Tabelas referenciadas → Tabelas referenciadoras

```sql
-- First: Parent table
CREATE TABLE users (id UUID PRIMARY KEY);

-- Second: Child table
CREATE TABLE posts (
  user_id UUID REFERENCES users(id)  -- Safe, users exists
);
```

### Padrão 3: Views sobre Views

**Ordem**: Views base → Views derivadas

```sql
-- First: Base view
CREATE VIEW active_users AS 
SELECT * FROM users WHERE deleted_at IS NULL;

-- Second: View on view
CREATE VIEW active_users_with_posts AS
SELECT u.*, COUNT(p.id) 
FROM active_users u  -- Safe, active_users exists
LEFT JOIN posts p ON p.user_id = u.id;
```

### Padrão 4: RLS Usando Funções

**Ordem**: Tabelas → Funções → Políticas RLS

```sql
-- First: Table
CREATE TABLE data (...);

-- Second: Helper function
CREATE FUNCTION user_can_access(data_id UUID) ...;

-- Third: RLS policy using function
CREATE POLICY "access_check" ON data
USING (user_can_access(id));  -- Safe, function exists
```

---

## Checklist de Revisão Manual

Após as verificações automatizadas, verifique manualmente:

- [ ] Todos os CREATE EXTENSION no topo
- [ ] Referências de foreign key vêm depois das tabelas pai
- [ ] Triggers referenciam funções existentes
- [ ] Políticas RLS referenciam tabelas existentes
- [ ] Views referenciam tabelas/views existentes
- [ ] Funções chamadas por outras funções definidas primeiro
- [ ] Sem dependências circulares

---

## Integração com o Workflow

Workflow típico de validação:

1. Escreva a migration
2. `*verify-order migration.sql` - Verificar a ordenação
3. Corrigir quaisquer problemas encontrados
4. `*dry-run migration.sql` - Testar a execução
5. `*apply-migration migration.sql` - Aplicar se o dry-run passar

---

## Avançado: Grafo de Dependências

Para migrations complexas, visualize as dependências:

```bash
# Extract CREATE statements
grep -i "create" {path} | \
  grep -E "(table|function|view|trigger)" > /tmp/creates.txt

# Manual review of dependencies
cat /tmp/creates.txt
```

Procure por:
- Tabela → Foreign Key → Outra Tabela
- Função → Chama → Outra Função
- Trigger → Chama → Função
- View → Seleciona → Tabela/View
- Política → Usa → Função

---

## Por Que Isso Importa

**Problema**: Ordem errada causa falhas de migration

```
ERROR: relation "users" does not exist
ERROR: function "user_can_access" does not exist
ERROR: table "data" does not exist for policy creation
```

**Solução**: Verifique a ordem antes de executar

- Pegue os problemas em segundos (não após uma migration que falhou)
- Sem estado parcial de schema
- Sem necessidade de rollback por erros de ordenação
- Ciclo de desenvolvimento mais rápido

---

## Limitações

Esta é uma verificação heurística, não um parser completo:

✅ **Pega**: A maioria dos problemas comuns de ordenação  
✅ **Rápido**: Roda em < 1 segundo  
✅ **Seguro**: Nenhuma conexão com banco de dados necessária  

❌ **Não pega**: Dependências complexas entre arquivos  
❌ **Não pega**: SQL dinâmico  
❌ **Não pega**: Dependências sutis de tipo  

Para validação 100%, use: `*dry-run {path}`
