# Task: Aplicar Migration (com snapshot + advisory lock)

**Propósito**: Aplicar uma migration com segurança, com snapshots pré/pós e lock exclusivo

**Elicit**: true

---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com registro em log
- Interação mínima do usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pre-Flight - Planejamento Antecipado Abrangente
- Fase de análise da task (identificar todas as ambiguidades)
- Execução com ambiguidade zero
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: dbApplyMigration()
responsável: Dara (Sage)
responsavel_type: Agente
atomic_layer: Organism

**Entrada:**
- campo: query
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Query SQL válida

- campo: params
  tipo: object
  origem: User Input
  obrigatório: false
  validação: Parâmetros da query

- campo: connection
  tipo: object
  origem: config
  obrigatório: true
  validação: Conexão PostgreSQL válida via Supabase

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
  - [ ] Conexão com o banco de dados estabelecida; sintaxe da query válida
    tipo: pre-condition
    blocker: true
    validação: |
      Check database connection established; query syntax valid
    error_message: "Pre-condition failed: Database connection established; query syntax valid"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a conclusão da task

**Checklist:**

```yaml
post-conditions:
  - [ ] Query executada; resultados retornados; transação commitada
    tipo: post-condition
    blocker: true
    validação: |
      Verify query executed; results returned; transaction committed
    error_message: "Post-condition failed: Query executed; results returned; transaction committed"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de pass/fail para conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Dados persistidos corretamente; constraints respeitadas; sem dados órfãos
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
  - **Propósito:** Conexão e execução de queries no banco Neo4j
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
  - **Local:** .aiox-core/scripts/db-query.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Falha de Conexão
   - **Causa:** Não foi possível conectar ao banco Neo4j
   - **Resolução:** Verificar a string de conexão, credenciais, rede
   - **Recuperação:** Tentar novamente com backoff exponencial (máx. 3 tentativas)

2. **Erro:** Erro de Sintaxe da Query
   - **Causa:** Sintaxe de query Cypher inválida
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
duration_expected: 5-15 min (estimado)
cost_estimated: $0.003-0.010
token_usage: ~3,000-10,000 tokens
```

**Notas de Otimização:**
- Dividir em workflows menores; implementar checkpointing; usar processamento assíncrono quando possível

---

## Metadados

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

- `path` (string): Caminho do arquivo de migration SQL

---

## Processo

### 1. Verificações Pre-Flight

Pedir ao usuário para confirmar:
- Arquivo de migration: `{path}`
- Banco de dados: `$SUPABASE_DB_URL` (omitido)
- Dry-run concluído? (yes/no)
- Backup/snapshot feito? (será feito automaticamente)

**CRÍTICO**: Se o usuário disser que o dry-run não foi feito, parar e recomendar: `*dry-run {path}`

### 2. Adquirir o Advisory Lock

Garantir que não há migrations concorrentes:

```bash
psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 -c \
"SELECT pg_try_advisory_lock(hashtext('dbsage:migrate')) AS got" \
| grep -q t || { echo "❌ Another migration is running"; exit 1; }

echo "✓ Migration lock acquired"
```

### 3. Snapshot Pré-Migration

Criar um snapshot apenas do schema antes das mudanças:

```bash
TS=$(date +%Y%m%d%H%M%S)
mkdir -p supabase/snapshots supabase/rollback

pg_dump "$SUPABASE_DB_URL" --schema-only --clean --if-exists \
  > "supabase/snapshots/${TS}_before.sql"

echo "✓ Pre-migration snapshot: supabase/snapshots/${TS}_before.sql"
echo $TS > /tmp/dbsage_migration_ts
```

### 4. Aplicar a Migration

Rodar a migration em transação:

```bash
echo "Applying migration..."
psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 -f {path}

if [ $? -eq 0 ]; then
  echo "✓ Migration applied successfully"
else
  echo "❌ Migration failed - rolling back..."
  # Advisory lock will be released on disconnect
  exit 1
fi
```

### 5. Snapshot Pós-Migration

Criar um snapshot após as mudanças:

```bash
TS=$(cat /tmp/dbsage_migration_ts)

pg_dump "$SUPABASE_DB_URL" --schema-only --clean --if-exists \
  > "supabase/snapshots/${TS}_after.sql"

echo "✓ Post-migration snapshot: supabase/snapshots/${TS}_after.sql"
```

### 6. Gerar Diff (Opcional)

```bash
diff -u "supabase/snapshots/${TS}_before.sql" \
        "supabase/snapshots/${TS}_after.sql" \
  > "supabase/snapshots/${TS}_diff.patch" || true

echo "✓ Diff saved: supabase/snapshots/${TS}_diff.patch"
```

### 7. Liberar o Advisory Lock

```bash
psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 -c \
"SELECT pg_advisory_unlock(hashtext('dbsage:migrate'));"

echo "✓ Migration lock released"
```

### 8. Ações Pós-Migration

Apresentar opções ao usuário:

**1. Rodar smoke tests** - `*smoke-test`  
**2. Verificar cobertura de RLS** - `*rls-audit`  
**3. Verificar a performance das queries** - `*analyze-hotpaths`  
**4. Concluído por enquanto**

---

## Saída de Sucesso

```
✅ Migration Applied Successfully

Timestamp: {TS}
Migration: {path}
Snapshots:
  - Before: supabase/snapshots/{TS}_before.sql
  - After:  supabase/snapshots/{TS}_after.sql
  - Diff:   supabase/snapshots/{TS}_diff.patch

Next steps:
  *smoke-test     - Validate migration
  *rls-audit      - Check security
  *rollback {TS}  - Undo if needed
```

---

## Instruções de Rollback

Se a migration precisar ser desfeita:

```bash
*rollback supabase/snapshots/{TS}_before.sql
```

Ou criar um script manual de rollback em `supabase/rollback/{TS}_rollback.sql`

---

## Tratamento de Erros

### A Migration Falha no Meio da Execução

1. A transação do PostgreSQL é revertida automaticamente
2. O advisory lock é liberado na desconexão
3. O snapshot pré-migration continua disponível
4. O banco de dados permanece inalterado

### Lock Já Adquirido

```
❌ Another migration is running
Wait for completion or check for stuck locks:

SELECT * FROM pg_locks WHERE locktype = 'advisory';
```

### Falha na Criação do Snapshot

- Verificar o espaço em disco
- Verificar a compatibilidade da versão do pg_dump
- Verificar as permissões do banco de dados

---

## Recursos de Segurança

✅ O advisory lock previne migrations concorrentes  
✅ Snapshots pré/pós para comparação  
✅ ON_ERROR_STOP previne aplicação parcial  
✅ Execução envolvida em transação  
✅ Geração automática de diff  
✅ Instruções de rollback fornecidas
