---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Task: Criar Snapshot do Banco de Dados

**Propósito**: Criar um snapshot somente-schema para capacidade de rollback

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
task: dbSnapshot()
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


## Entradas

- `label` (string): Rótulo/nome do snapshot (ex.: "baseline", "pre_migration", "v1_2_0")

---

## Processo

### 1. Confirmar Detalhes do Snapshot

Pergunte ao usuário:
- Rótulo do snapshot: `{label}`
- Propósito deste snapshot (ex.: "antes de adicionar a tabela user_roles")
- Incluir dados? (somente-schema é o padrão, mais seguro, mais rápido)

### 2. Criar o Diretório de Snapshots

```bash
mkdir -p supabase/snapshots
```

### 3. Gerar o Snapshot

```bash
TS=$(date +%Y%m%d_%H%M%S)
LABEL="{label}"
FILENAME="supabase/snapshots/${TS}_${LABEL}.sql"

echo "Creating snapshot: $FILENAME"

pg_dump "$SUPABASE_DB_URL" \
  --schema-only \
  --clean \
  --if-exists \
  --no-owner \
  --no-privileges \
  > "$FILENAME"

if [ $? -eq 0 ]; then
  echo "✅ Snapshot created: $FILENAME"
  ls -lh "$FILENAME"
else
  echo "❌ Snapshot failed"
  exit 1
fi
```

### 4. Verificar o Snapshot

Verificação rápida de sanidade:

```bash
# Check file size (should be > 0)
if [ ! -s "$FILENAME" ]; then
  echo "⚠️ Snapshot file is empty"
  exit 1
fi

# Count schema objects
echo ""
echo "=== Snapshot Contents ==="
grep -c "CREATE TABLE" "$FILENAME" && echo "tables found" || echo "no tables"
grep -c "CREATE FUNCTION" "$FILENAME" && echo "functions found" || echo "no functions"
grep -c "CREATE POLICY" "$FILENAME" && echo "policies found" || echo "no policies"
```

### 5. Criar Metadados do Snapshot

```bash
cat > "supabase/snapshots/${TS}_${LABEL}.meta" <<EOF
Snapshot: ${TS}_${LABEL}
Created: $(date -Iseconds)
Label: ${LABEL}
Database: $(echo "$SUPABASE_DB_URL" | sed 's/:.*/:[REDACTED]/')
Purpose: [user provided purpose]
File: ${FILENAME}
Size: $(ls -lh "$FILENAME" | awk '{print $5}')

To restore:
  *rollback supabase/snapshots/${TS}_${LABEL}.sql

Or manually:
  psql "\$SUPABASE_DB_URL" -f "${FILENAME}"
EOF

cat "supabase/snapshots/${TS}_${LABEL}.meta"
```

---

## Saída

```
✅ Snapshot Created Successfully

File: supabase/snapshots/20251026_143022_pre_migration.sql
Size: 45.2 KB
Timestamp: 20251026_143022
Label: pre_migration

Contents:
  - 12 tables
  - 8 functions
  - 15 policies

To restore this snapshot:
  *rollback supabase/snapshots/20251026_143022_pre_migration.sql

Metadata saved to:
  supabase/snapshots/20251026_143022_pre_migration.meta
```

---

## Opções de Snapshot

### Somente-Schema (Padrão)
- ✅ Rápido (segundos)
- ✅ Tamanho de arquivo pequeno
- ✅ Seguro para aplicar em qualquer ambiente
- ❌ Nenhum dado preservado
- **Use para**: Rollback de migration, versionamento de schema

### Schema + Dados
```bash
pg_dump "$SUPABASE_DB_URL" \
  --clean \
  --if-exists \
  --no-owner \
  --no-privileges \
  > "$FILENAME"
```
- ⚠️ Mais lento (minutos a horas)
- ⚠️ Tamanho de arquivo grande
- ⚠️ Dados podem conflitar na restauração
- ✅ Backup completo
- **Use para**: Recuperação de desastres, clonagem de ambiente

### Apenas Tabelas Específicas
```bash
pg_dump "$SUPABASE_DB_URL" \
  --schema-only \
  --table="users" \
  --table="profiles" \
  > "$FILENAME"
```
- ✅ Snapshot direcionado
- ✅ Arquivo menor
- **Use para**: Testar mudanças em tabelas específicas

---

## Melhores Práticas

### Quando Criar Snapshot

**Sempre antes de:**
- Migrations
- Mudanças de schema
- Mudanças de política RLS
- Modificações de funções
- Operações de dados de grande porte

**Regularmente:**
- Snapshots diários de schema (automatizados)
- Antes de cada deployment
- Após migrations bem-sucedidas (snapshot pós)

### Nomenclatura de Snapshots

**Bons nomes:**
- `baseline` - Estado inicial do schema
- `pre_migration` - Antes de qualquer migration
- `pre_v1_2_0` - Antes do deployment de uma versão
- `working_state` - Estado conhecido como bom

**Nomes ruins:**
- `backup` - Genérico demais
- `test` - Propósito não claro
- `snapshot1` - Sem contexto

### Retenção

Mantenha snapshots por:
- Últimos 7 dias: Todos os snapshots
- Últimos 30 dias: Snapshots diários
- Último ano: Snapshots mensais
- Para sempre: Snapshots de versões principais

```bash
# Example cleanup (keep last 10)
cd supabase/snapshots
ls -t *.sql | tail -n +11 | xargs rm -f
```

---

## Snapshot vs Backup

| Funcionalidade | Snapshot (pg_dump) | Backup do Supabase |
|---------|-------------------|-----------------|
| Velocidade | Rápido | Depende |
| Escopo | Somente schema (padrão) | Banco de dados completo |
| Armazenamento | Arquivos locais | Gerenciado pelo Supabase |
| Restauração | psql manual | Dashboard do Supabase |
| Controle de versão | ✅ Compatível com Git | ❌ Binário |
| Automação | Fácil (script) | Automático |

**Use snapshots para:**
- Controle de versão de schema
- Rollback de migration
- Fluxos de desenvolvimento
- Backups locais rápidos

**Use backups do Supabase para:**
- Recuperação de desastres
- Restauração point-in-time
- Incidentes em produção
- Retenção de longo prazo

---

## Solução de Problemas

### "pg_dump: error: connection failed"

**Problema**: Não consegue conectar ao banco de dados  
**Correção**: Verifique a SUPABASE_DB_URL

```bash
*env-check
```

### "pg_dump: error: permission denied"

**Problema**: Privilégios insuficientes  
**Correção**: Use uma connection string com permissões suficientes

### "Snapshot file is empty"

**Problema**: Nenhum objeto de schema ou falha de conexão  
**Correção**: 
1. Verifique se o banco de dados tem tabelas: `SELECT * FROM pg_tables WHERE schemaname='public';`
2. Verifique a compatibilidade de versão do pg_dump
3. Verifique a conectividade de rede

### "Snapshot is huge"

**Problema**: Incluindo dados involuntariamente  
**Correção**: Use a flag `--schema-only` explicitamente

---

## Integração com o Workflow

### Workflow Pré-Migration
```bash
*snapshot pre_migration      # Create rollback point
*verify-order migration.sql  # Check DDL order
*dry-run migration.sql       # Test safely
*apply-migration migration.sql  # Apply
*snapshot post_migration     # Capture new state
```

### Workflow de Comparação
```bash
*snapshot before_changes
# ... make changes ...
*snapshot after_changes
diff supabase/snapshots/*_before_changes.sql \
     supabase/snapshots/*_after_changes.sql
```

---

## Uso Avançado

### Comparar Dois Snapshots

```bash
# Visual diff
diff -u snapshot1.sql snapshot2.sql | less

# Summary of changes
diff snapshot1.sql snapshot2.sql | grep "^[<>]" | head -20
```

### Extrair Objetos Específicos

```bash
# Just table definitions
grep -A 20 "CREATE TABLE" snapshot.sql

# Just functions
sed -n '/CREATE FUNCTION/,/\$\$/p' snapshot.sql
```

### Versionar no Git

```bash
# Snapshot before commit
*snapshot before_feature_x
git add supabase/snapshots/*_before_feature_x.sql
git commit -m "snapshot: schema before feature X"
```

---

## Notas de Segurança

⚠️ **Snapshots podem conter informações sensíveis de schema**:
- Nomes de tabelas revelam a lógica de negócio
- Nomes de funções expõem funcionalidades
- Comentários podem conter notas internas

**Em repositórios públicos:**
- Considere usar .gitignore para snapshots
- Ou sanitize antes de commitar
- Ou use apenas repositórios privados

**NÃO commite:**
- Snapshots com `--data-included`
- Arquivos contendo senhas/segredos
- Connection strings nos metadados

---

## Automação

### Script de Snapshot Diário

```bash
#!/bin/bash
# Save as: scripts/daily-snapshot.sh

DATE=$(date +%Y%m%d)
*snapshot "daily_${DATE}"

# Cleanup old snapshots (keep 7 days)
find supabase/snapshots -name "daily_*.sql" -mtime +7 -delete
```

### Hook Pré-Deploy

```bash
# In CI/CD pipeline
- name: Create pre-deploy snapshot
  run: |
    /db-sage
    *snapshot "pre_deploy_${CI_COMMIT_SHA}"
```

---

## Comandos Relacionados

- `*rollback {snapshot}` - Restaurar snapshot
- `*apply-migration {path}` - Inclui snapshots automáticos
- `*env-check` - Verificar se pg_dump está disponível
