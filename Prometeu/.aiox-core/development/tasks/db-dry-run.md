---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Task: Migration Dry-Run

**Propósito**: Executar a migration dentro de BEGIN…ROLLBACK para capturar erros de sintaxe/ordenação

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
task: dbDryRun()
responsável: Dara (Sage)
responsavel_type: Agente
atomic_layer: Organism

inputs:
  - field: query
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

outputs:
  - field: query_result
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

- `path` (string): Caminho para o arquivo de migration SQL

---

## Processo

### 1. Confirmar o Arquivo de Migration

Peça ao usuário para confirmar:
- Caminho do arquivo de migration: `{path}`
- Propósito desta migration
- Mudanças esperadas (tabelas, funções, etc)

### 2. Executar o Dry-Run

Rode a migration em uma transação que será revertida (rolled back):

```bash
psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 <<'SQL'
BEGIN;
\echo 'Starting dry-run...'
\i {path}
\echo 'Dry-run completed successfully - rolling back...'
ROLLBACK;
SQL
```

### 3. Reportar os Resultados

**Se bem-sucedido:**
```
✓ Dry-run completed without errors
✓ Migration syntax is valid
✓ No dependency or ordering issues detected
```

**Se falhar:**
```
❌ Dry-run failed
Error: [error message]
Line: [line number if available]
Fix the migration and try again
```

---

## O Que Isto Valida

- ✅ Correção da sintaxe SQL
- ✅ Dependências de objetos existem
- ✅ Ordem de execução é válida
- ✅ Sem violações de constraints
- ❌ NÃO valida a correção dos dados
- ❌ NÃO verifica performance

---

## Próximos Passos Após o Sucesso

1. Revise a migration mais uma vez
2. Tire um snapshot: `*snapshot pre_migration`
3. Aplique a migration: `*apply-migration {path}`
4. Rode os smoke tests: `*smoke-test`

---

## Tratamento de Erros

Erros comuns e correções:

**"relation does not exist"**
- Dependência de tabela/view ausente
- Verifique se você precisa criar os objetos dependentes primeiro

**"function does not exist"**
- Função chamada antes da criação
- Reordene: tabelas → funções → triggers

**"syntax error"**
- Verifique a sintaxe SQL
- Verifique a compatibilidade com a versão do PostgreSQL
