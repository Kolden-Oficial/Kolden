---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Task: DB Env Check

**Propósito**: Validar o ambiente para operações de DB sem vazar segredos

**Elicit**: false

---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com registro em log
- Interação mínima com o usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pré-Voo (Pre-Flight) - Planejamento Abrangente Antecipado
- Fase de análise da tarefa (identificar todas as ambiguidades)
- Execução com zero ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: dbEnvCheck()
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

**Propósito:** Validar o sucesso da execução APÓS a conclusão da task

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

1. **Erro:** Conexão Falhou
   - **Causa:** Não foi possível conectar ao banco de dados Neo4j
   - **Resolução:** Verificar a string de conexão, credenciais, rede
   - **Recuperação:** Tentar novamente com backoff exponencial (máximo de 3 tentativas)

2. **Erro:** Erro de Sintaxe na Query
   - **Causa:** Sintaxe de query Cypher inválida
   - **Resolução:** Validar a sintaxe da query antes da execução
   - **Recuperação:** Retornar erro de sintaxe detalhado, sugerir correção

3. **Erro:** Rollback de Transação
   - **Causa:** A query viola restrições ou atinge timeout
   - **Resolução:** Revisar a lógica da query e as restrições
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
- Análise iterativa com limites de profundidade; armazenar em cache resultados intermediários; agrupar operações similares em lote

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


## Passos

### 1. Validar as Variáveis de Ambiente Obrigatórias

```bash
test -n "$SUPABASE_DB_URL" || { echo "❌ Missing SUPABASE_DB_URL"; exit 1; }
echo "✓ SUPABASE_DB_URL present (redacted)"
```

### 2. Verificar o Modo SSL e o Pooler

```bash
case "$SUPABASE_DB_URL" in
  *"sslmode="*) echo "✓ sslmode present";;
  *) echo "⚠️ Consider adding sslmode=require";;
esac

echo "$SUPABASE_DB_URL" | grep -q "pooler" && echo "✓ Using pooler" || echo "⚠️ Consider pooler host"
```

### 3. Verificar as Versões do Cliente

```bash
psql --version || { echo "❌ psql missing"; exit 1; }
pg_dump --version || { echo "❌ pg_dump missing"; exit 1; }
echo "✓ PostgreSQL client tools available"
```

### 4. Verificar a Conectividade com o Servidor

```bash
PSQL="psql \"$SUPABASE_DB_URL\" -v ON_ERROR_STOP=1 -t -c"
eval $PSQL "SELECT version();" > /dev/null && echo "✓ Database connection successful"
```

---

## Critérios de Sucesso

- Todas as variáveis de ambiente presentes
- Ferramentas de cliente do PostgreSQL instaladas
- Conexão com o banco de dados bem-sucedida
- Configuração de SSL e pooler validada

## Tratamento de Erros

Se qualquer verificação falhar:
1. Exibir mensagem de erro clara
2. Fornecer passos de remediação
3. Sair com status diferente de zero
