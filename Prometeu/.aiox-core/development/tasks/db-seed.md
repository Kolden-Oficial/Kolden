---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Task: Aplicar Dados de Seed

**Propósito**: Aplicar dados de seed ao banco de dados com segurança, usando operações idempotentes

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
task: dbSeed()
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

- **Tool:** neo4j-driver
  - **Propósito:** Conexão com o banco de dados Neo4j e execução de queries
  - **Origem:** npm: neo4j-driver

- **Tool:** query-validator
  - **Propósito:** Validação de sintaxe de queries Cypher
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


## Entradas

- `path` (string): Caminho para o arquivo SQL de seed

---

## Processo

### 1. Verificações Pré-Voo

Peça ao usuário para confirmar:
- Arquivo de seed: `{path}`
- Banco de dados: `$SUPABASE_DB_URL` (redigido)
- Ambiente: (dev/staging/production)
- Idempotente? (usa INSERT...ON CONFLICT ou similar)

**CRÍTICO**: Nunca aplique seed em produção sem confirmação explícita!

### 2. Validar o Arquivo de Seed

Verifique se o arquivo de seed é idempotente:

```bash
echo "Validating seed file..."

# Check for dangerous patterns
if grep -qi "TRUNCATE\|DELETE FROM" {path}; then
  echo "⚠️  WARNING: Seed contains TRUNCATE/DELETE"
  echo "   This is destructive. Continue? (yes/no)"
  read CONFIRM
  [ "$CONFIRM" != "yes" ] && { echo "Aborted"; exit 1; }
fi

# Check for INSERT...ON CONFLICT (idempotent pattern)
if ! grep -qi "ON CONFLICT" {path}; then
  echo "⚠️  WARNING: No ON CONFLICT detected"
  echo "   Seed may not be idempotent. Continue? (yes/no)"
  read CONFIRM
  [ "$CONFIRM" != "yes" ] && { echo "Aborted"; exit 1; }
fi

echo "✓ Seed file validated"
```

### 3. Criar Snapshot (Opcional, mas Recomendado)

```bash
TS=$(date +%Y%m%d%H%M%S)
mkdir -p supabase/snapshots

echo "Creating pre-seed snapshot..."
pg_dump "$SUPABASE_DB_URL" --schema-only --clean --if-exists \
  > "supabase/snapshots/${TS}_before_seed.sql"

echo "✓ Snapshot: supabase/snapshots/${TS}_before_seed.sql"
```

### 4. Aplicar os Dados de Seed

Execute o seed em uma transação com tratamento de erros:

```bash
echo "Applying seed data..."

psql "$SUPABASE_DB_URL" \
  -v ON_ERROR_STOP=1 \
  -f {path}

if [ $? -eq 0 ]; then
  echo "✓ Seed data applied successfully"
else
  echo "❌ Seed failed"
  echo "   Rollback snapshot: supabase/snapshots/${TS}_before_seed.sql"
  exit 1
fi
```

### 5. Verificar os Dados de Seed

Execute uma verificação básica:

```bash
echo "Verifying seed data..."

# Count inserted rows (example - customize per seed)
psql "$SUPABASE_DB_URL" -c \
"SELECT
  'users' AS table, COUNT(*) AS rows FROM users
UNION ALL
SELECT
  'categories', COUNT(*) FROM categories
ORDER BY table;"

echo "✓ Verification complete"
```

### 6. Documentar o Seed

Registre o que foi aplicado via seed:

```bash
cat >> supabase/docs/SEED_LOG.md << EOF

## Seed Applied: ${TS}
- File: {path}
- Date: $(date -u +"%Y-%m-%d %H:%M:%S UTC")
- Environment: ${ENVIRONMENT:-unknown}
- Applied by: ${USER:-unknown}

EOF

echo "✓ Logged to supabase/docs/SEED_LOG.md"
```

---

## Saída

Exiba o resumo:
```
✅ SEED COMPLETE

File:      {path}
Timestamp: {TS}
Snapshot:  supabase/snapshots/{TS}_before_seed.sql
Log:       supabase/docs/SEED_LOG.md

Next steps:
- Verify data manually in database
- Run smoke tests if appropriate
- Commit seed file to git
```

---

## Padrão de Seed Idempotente

Exemplo de melhor prática para arquivos de seed:

```sql
-- ✅ GOOD: Idempotent seed
INSERT INTO categories (id, name, slug)
VALUES
  ('cat-1', 'Technology', 'technology'),
  ('cat-2', 'Design', 'design')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug;

-- ✅ GOOD: Conditional insert
INSERT INTO users (id, email, role)
SELECT 'user-1', 'admin@example.com', 'admin'
WHERE NOT EXISTS (
  SELECT 1 FROM users WHERE email = 'admin@example.com'
);

-- ❌ BAD: Not idempotent
INSERT INTO categories (name, slug)
VALUES ('Technology', 'technology');  -- Will fail on retry
```

---

## Tratamento de Erros

Se o seed falhar:
1. Verifique a mensagem de erro no terminal
2. Corrija o arquivo de seed
3. Restaure o snapshot, se necessário: `*rollback {TS}_before_seed`
4. Reexecute o seed: `*seed {path}`

---

## Notas

- Seeds devem ser idempotentes (seguros para executar várias vezes)
- Use `ON CONFLICT` ou `INSERT...WHERE NOT EXISTS`
- Nunca use TRUNCATE em seeds de produção
- Teste os seeds primeiro em dev/staging
- Versione os arquivos de seed no git (supabase/seeds/)
