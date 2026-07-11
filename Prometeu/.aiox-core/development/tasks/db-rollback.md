---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Task: Rollback Database

**Propósito**: Restaurar o banco de dados para um snapshot anterior ou rodar um script de rollback

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
task: dbRollback()
responsável: Dara (Sage)
responsavel_type: Agente
atomic_layer: Organism

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

- **Ferramenta:** supabase
  - **Propósito:** Conexão com banco de dados PostgreSQL via cliente Supabase
  - **Origem:** @supabase/supabase-js

- **Ferramenta:** query-validator
  - **Propósito:** Validação de sintaxe de query SQL
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

**Estratégia:** abort

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
duration_expected: 5-15 min (estimated)
cost_estimated: $0.003-0.010
token_usage: ~3,000-10,000 tokens
```

**Notas de Otimização:**
- Quebrar em workflows menores; implementar checkpointing; usar processamento assíncrono quando possível

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

- `target` (string): Caminho para o arquivo de snapshot ou script de rollback

---

## Processo

### 1. Confirmar o Rollback

**AVISO CRÍTICO**: Exibir ao usuário antes de prosseguir

```
⚠️  DATABASE ROLLBACK WARNING ⚠️

You are about to restore the database to a previous state.

Target: {target}

This will:
  ✓ Drop and recreate all schema objects
  ✓ Preserve existing data (if schema-only snapshot)
  ✗ Lose any schema changes made after snapshot
  ✗ Potentially break application if schema incompatible

Are you ABSOLUTELY SURE you want to proceed?
```

Peça ao usuário para digitar: `ROLLBACK` para confirmar

### 2. Verificações de Segurança Pré-Rollback

```bash
# Create emergency snapshot before rollback
echo "Creating emergency snapshot before rollback..."
TS=$(date +%Y%m%d_%H%M%S)
EMERGENCY="supabase/snapshots/${TS}_emergency_before_rollback.sql"

pg_dump "$SUPABASE_DB_URL" \
  --schema-only \
  --clean \
  --if-exists \
  > "$EMERGENCY"

if [ $? -eq 0 ]; then
  echo "✓ Emergency snapshot: $EMERGENCY"
else
  echo "❌ Emergency snapshot failed - ABORTING ROLLBACK"
  exit 1
fi
```

### 3. Validar o Alvo do Rollback

```bash
TARGET="{target}"

# Check file exists
if [ ! -f "$TARGET" ]; then
  echo "❌ Rollback target not found: $TARGET"
  exit 1
fi

# Check file is valid SQL
if ! grep -q "CREATE\|DROP\|ALTER" "$TARGET"; then
  echo "❌ File doesn't appear to be valid SQL"
  exit 1
fi

echo "✓ Rollback target validated: $TARGET"
echo "  File size: $(ls -lh "$TARGET" | awk '{print $5}')"
echo "  Modified: $(ls -lh "$TARGET" | awk '{print $6, $7, $8}')"
```

### 4. Adquirir Lock Exclusivo

Previne operações concorrentes:

```bash
echo "Acquiring exclusive lock..."

psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 -c \
"SELECT pg_try_advisory_lock(hashtext('dbsage:rollback')) AS got" \
| grep -q t || { echo "❌ Another operation is running"; exit 1; }

echo "✓ Lock acquired"
```

### 5. Executar o Rollback

```bash
echo ""
echo "=== EXECUTING ROLLBACK ==="
echo "Started: $(date -Iseconds)"
echo ""

# Run rollback in single transaction
psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 -f "$TARGET"

RESULT=$?

echo ""
echo "Completed: $(date -Iseconds)"
echo ""

if [ $RESULT -eq 0 ]; then
  echo "✅ ROLLBACK SUCCESSFUL"
else
  echo "❌ ROLLBACK FAILED"
  echo "Emergency snapshot available: $EMERGENCY"
  echo "Attempting to restore from emergency snapshot..."
  
  # Try to restore emergency snapshot
  psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 -f "$EMERGENCY"
  
  if [ $? -eq 0 ]; then
    echo "✓ Restored from emergency snapshot"
  else
    echo "❌ Emergency restore also failed - DATABASE MAY BE INCONSISTENT"
    echo "Manual intervention required"
  fi
  
  exit 1
fi
```

### 6. Validação Pós-Rollback

```bash
echo ""
echo "=== POST-ROLLBACK VALIDATION ==="
echo ""

# Count schema objects
echo "Schema object counts:"
psql "$SUPABASE_DB_URL" -t -c \
"SELECT 
  (SELECT COUNT(*) FROM pg_tables WHERE schemaname='public') AS tables,
  (SELECT COUNT(*) FROM pg_policies WHERE schemaname='public') AS policies,
  (SELECT COUNT(*) FROM pg_proc WHERE pronamespace='public'::regnamespace) AS functions;"

# Check for basic sanity
echo ""
echo "Quick sanity checks:"
psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 <<'SQL'
-- Check tables exist
SELECT 'Tables exist' AS check, COUNT(*) > 0 AS pass 
FROM pg_tables WHERE schemaname='public';

-- Check functions exist  
SELECT 'Functions exist' AS check, COUNT(*) > 0 AS pass
FROM pg_proc WHERE pronamespace='public'::regnamespace;

-- Check for orphaned objects (optional)
-- SELECT 'No orphaned triggers' AS check, COUNT(*) = 0 AS pass
-- FROM pg_trigger WHERE tgrelid NOT IN (SELECT oid FROM pg_class);
SQL
```

### 7. Liberar o Lock e Criar Snapshot Pós-Rollback

```bash
# Release lock
psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 -c \
"SELECT pg_advisory_unlock(hashtext('dbsage:rollback'));"

echo "✓ Lock released"

# Create post-rollback snapshot
POST_SNAPSHOT="supabase/snapshots/${TS}_post_rollback.sql"
pg_dump "$SUPABASE_DB_URL" --schema-only --clean --if-exists > "$POST_SNAPSHOT"

echo "✓ Post-rollback snapshot: $POST_SNAPSHOT"
```

### 8. Reportar os Resultados

```
✅ DATABASE ROLLBACK COMPLETED

Rolled back to: {target}
Timestamp: {TS}

Snapshots created:
  - Emergency (before): $EMERGENCY
  - Post-rollback (after): $POST_SNAPSHOT

Next steps:
  1. *smoke-test - Validate schema
  2. *rls-audit - Check security
  3. Test application functionality
  4. Monitor for issues

If issues detected:
  *rollback $EMERGENCY  # Restore to pre-rollback state
```

---

## Estratégias de Rollback

### Estratégia 1: Restauração de Snapshot (Recomendada)

**Use quando**: Revertendo mudanças de schema

```bash
*rollback supabase/snapshots/20251026_pre_migration.sql
```

**Prós**:
- ✅ Rápido
- ✅ Estado completo do schema
- ✅ Testado com pg_dump

**Contras**:
- ❌ Dados preservados (podem ser incompatíveis)
- ❌ Requer um snapshot prévio

### Estratégia 2: Script de Rollback Explícito

**Use quando**: Mudanças cirúrgicas em objetos específicos

```sql
-- supabase/rollback/20251026_rollback_user_roles.sql

BEGIN;

-- Undo changes in reverse order
DROP TRIGGER IF EXISTS set_user_role_timestamp ON user_roles;
DROP FUNCTION IF EXISTS update_user_role_timestamp();
DROP TABLE IF EXISTS user_roles;

-- Restore previous state if needed
-- ...

COMMIT;
```

```bash
*rollback supabase/rollback/20251026_rollback_user_roles.sql
```

**Prós**:
- ✅ Controle preciso
- ✅ Processo de desfazer documentado
- ✅ Pode ser testado

**Contras**:
- ❌ Precisa ser escrito manualmente
- ❌ Fácil esquecer passos
- ❌ Precisa ser mantido junto com a migration

### Estratégia 3: Forward Fix (Correção para Frente)

**Use quando**: O rollback é perigoso; corrija para frente em vez disso

```sql
-- Instead of rolling back, apply corrective migration
-- migration: 20251026_fix_user_roles_bug.sql
```

**Prós**:
- ✅ Sem risco de perda de dados
- ✅ Mantém o histórico
- ✅ Seguro em produção

**Contras**:
- ❌ Mais trabalho
- ❌ Deixa um estado intermediário no histórico

---

## Matriz de Decisão de Rollback

| Situação | Estratégia | Comando |
|-----------|----------|---------|
| Migration falhou no meio | Restaurar snapshot | `*rollback snapshot_before.sql` |
| Schema quebra o app | Restaurar snapshot | `*rollback snapshot_before.sql` |
| Migration errada aplicada | Restaurar snapshot | `*rollback snapshot_before.sql` |
| Bug menor em função | Forward fix | Criar migration de correção |
| Risco de corrupção de dados | Forward fix | Não fazer rollback |
| Produção com usuários | Forward fix | Evitar rollback de schema |

---

## Checklist de Segurança

Antes de executar o rollback:

- [ ] Snapshot de emergência criado automaticamente ✓
- [ ] Aplicação parada ou em modo de manutenção
- [ ] Usuários notificados sobre a indisponibilidade
- [ ] Equipe ciente da operação de rollback
- [ ] Alvo do rollback validado
- [ ] Lock exclusivo adquirido
- [ ] Plano de teste pós-rollback pronto

---

## Rollback em Diferentes Ambientes

### Desenvolvimento
```bash
# Fast and loose - just do it
*rollback snapshot.sql
```

### Staging
```bash
# Test the rollback process
*rollback snapshot.sql
*smoke-test
# Test app functionality
```

### Produção
```bash
# CAREFUL - follow full checklist
# 1. Notify stakeholders
# 2. Enable maintenance mode
# 3. Create emergency snapshot (automatic)
# 4. Coordinate with team
*rollback snapshot.sql
# 5. Validation
*smoke-test
*rls-audit
# 6. Test critical flows
# 7. Disable maintenance mode
# 8. Monitor closely
```

---

## Cenários Comuns de Rollback

### Cenário 1: Migration Falhou Durante a Aplicação

**Situação**: `*apply-migration` falhou pela metade

**Ação**: O PostgreSQL já reverteu a transação ✓

**Nenhum rollback necessário**: Banco de dados inalterado

**Próximos passos**:
1. Corrija o arquivo de migration
2. `*dry-run` para testar
3. `*apply-migration` novamente

### Cenário 2: Migration Bem-Sucedida mas Quebra o App

**Situação**: Mudança de schema incompatível com a aplicação

**Ação**: Rollback para o snapshot pré-migration

```bash
*rollback supabase/snapshots/20251026_143022_pre_migration.sql
*smoke-test
# Deploy previous app version or fix app
```

### Cenário 3: Migration Errada Aplicada

**Situação**: Aplicou a migration v1.3.0 em vez da v1.2.5

**Ação**: Rollback para o último estado bom conhecido

```bash
*rollback supabase/snapshots/20251026_120000_v1_2_4.sql
*smoke-test
# Apply correct migration
*apply-migration v1_2_5.sql
```

### Cenário 4: Corrupção de Dados Após a Migration

**Situação**: A mudança de schema causou problemas de integridade de dados

**Ação**: NÃO faça rollback do schema - corrija os dados

```sql
-- Forward fix with data correction
BEGIN;

-- Fix data
UPDATE users SET status = 'active' WHERE status IS NULL;

-- Add constraint to prevent recurrence
ALTER TABLE users ADD CONSTRAINT status_not_null CHECK (status IS NOT NULL);

COMMIT;
```

---

## Solução de Problemas

### "Rollback failed: relation already exists"

**Problema**: Objetos do novo schema ainda existem  
**Correção**: O snapshot deve ter instruções `DROP ... IF EXISTS`

Verifique o arquivo de snapshot:
```bash
grep -c "DROP.*IF EXISTS" snapshot.sql
```

Se estiver faltando, regenere o snapshot com as flags `--clean --if-exists`.

### "Rollback succeeded but app still broken"

**Problema**: Aplicação incompatível com o schema revertido  
**Soluções**:
1. Faça deploy da versão anterior do app
2. Corrija o código do app para funcionar com o schema antigo
3. Avance com uma nova migration em vez disso

### "Emergency snapshot failed during rollback"

**Problema**: Não é possível criar o snapshot de segurança  
**Ação**: ABORTAR O ROLLBACK

```
❌ ROLLBACK ABORTED
Cannot proceed without emergency snapshot
Check database connectivity and disk space
```

### "Rollback created orphaned objects"

**Problema**: Alguns objetos não foram limpos  
**Correção**: Identifique e remova manualmente

```sql
-- Find orphaned triggers
SELECT tgname FROM pg_trigger 
WHERE tgrelid NOT IN (SELECT oid FROM pg_class);

-- Find orphaned indexes
SELECT indexname FROM pg_indexes 
WHERE tablename NOT IN (SELECT tablename FROM pg_tables);
```

---

## Boas Práticas

### FAÇA

- ✅ Sempre tire um snapshot antes do rollback (automático)
- ✅ Teste o rollback em staging primeiro
- ✅ Coordene com a equipe
- ✅ Tenha um plano de teste pós-rollback
- ✅ Monitore a aplicação após o rollback
- ✅ Documente por que o rollback foi necessário

### NÃO FAÇA

- ❌ Rollback em produção sem coordenação
- ❌ Rollback sem snapshot de emergência
- ❌ Rollback quando o forward fix é mais seguro
- ❌ Rollback se houver risco de corrupção de dados
- ❌ Rollback durante horários de pico de uso
- ❌ Rollback sem entender o impacto

---

## Alternativas Zero-Downtime

Em vez de rollback, considere:

### Blue-Green Deployment
- Mantenha o schema antigo rodando
- Faça deploy do novo app + schema separadamente
- Mude o tráfego quando estiver pronto
- Rollback = mudar de volta

### Feature Flags
- Faça deploy das mudanças de schema
- Mantenha os caminhos de código antigos ativos
- Alterne funcionalidades via flags
- Rollback = inverter a flag

### Migrations Retrocompatíveis
- Adicione novas colunas como nullable
- Mantenha as colunas antigas temporariamente
- Remova as colunas antigas em uma migration posterior
- Rollback = apenas remover as colunas novas

---

## Métricas de Rollback

Acompanhe estas após o rollback:

- **Duração do rollback**: Quanto tempo levou?
- **Downtime**: Por quanto tempo o app ficou indisponível?
- **Perda de dados**: Algum dado perdido? (deve ser nenhum)
- **Contagem de objetos de schema**: Antes vs depois
- **Erros da aplicação**: Algum problema pós-rollback?
- **Tempo de recuperação**: Tempo até a funcionalidade plena

```bash
# Log rollback event
echo "$(date -Iseconds) | ROLLBACK | $TARGET | Duration: ${DURATION}s" \
  >> supabase/rollback/rollback.log
```

---

## Comandos Relacionados

- `*snapshot {label}` - Criar ponto de rollback
- `*apply-migration {path}` - Cria snapshots automáticos
- `*smoke-test` - Validar após o rollback
- `*rls-audit` - Verificar a segurança após o rollback

---

## Contatos de Emergência

Se o rollback falhar criticamente:

1. **Verifique o snapshot de emergência**: `$EMERGENCY`
2. **Revise o dashboard do Supabase**: Verifique locks/problemas
3. **Contate a equipe**: Peça ajuda imediatamente
4. **Documente o estado**: Salve logs e mensagens de erro
5. **Considere o restore do Supabase**: Recuperação point-in-time

**Nunca entre em pânico**: O snapshot de emergência protege você.
