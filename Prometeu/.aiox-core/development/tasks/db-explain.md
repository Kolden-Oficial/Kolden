---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Task: EXPLAIN (ANALYZE, BUFFERS)

**Propósito**: Executar análise detalhada do plano de query para avaliar a performance

**Elicit**: true

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

### 3. Planejamento Pre-Flight - Planejamento Abrangente Antecipado
- Fase de análise da tarefa (identificar todas as ambiguidades)
- Execução com zero ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: dbExplain()
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

- `sql` (string): Query SQL a ser analisada

---

## Processo

### 1. Confirmar a Query

Pergunte ao usuário:
- Query a ser analisada
- Contagem esperada de resultados (aproximada)
- Problemas de performance conhecidos?

### 2. Executar EXPLAIN ANALYZE

Execute com as opções completas de análise:

```bash
psql "$SUPABASE_DB_URL" -v ON_ERROR_STOP=1 <<SQL
EXPLAIN (ANALYZE, BUFFERS, VERBOSE, FORMAT TEXT)
{sql};
SQL
```

### 3. Interpretar os Resultados

Apresente as métricas-chave:

```
=== Query Performance Analysis ===

Execution Time: X.XX ms
Planning Time: Y.YY ms
Total Time: Z.ZZ ms

Buffers:
  - Shared Hit: XXX (cache hits)
  - Shared Read: YYY (disk reads)
  - Temp Read/Written: ZZZ (temp files)

Cost: XXX.XX..YYY.YY
Rows: Estimated XXX, Actual YYY
```

---

## Entendendo a Saída do EXPLAIN

### Métricas de Nível Superior

**Planning Time (Tempo de Planejamento)**
- Tempo gasto planejando a query
- Valor alto (>100ms) sugere query complexa ou estatísticas ausentes

**Execution Time (Tempo de Execução)**
- Tempo real de execução da query
- É isto que os usuários experimentam

**Total Cost (Custo Total)**
- Unidades de custo estimadas (não milissegundos)
- Maior = mais caro
- Compare diferentes versões da query

### Tipos de Nó (Padrões Comuns)

**Seq Scan** (Sequential Scan / Varredura Sequencial)
- 🔴 Lê a tabela inteira
- Lento para tabelas grandes
- **Correção**: Adicionar índice se estiver filtrando linhas

**Index Scan**
- ✅ Usa índice para encontrar linhas
- Rápido para queries seletivas
- Bom quando retorna poucas linhas

**Index Only Scan**
- ✅✅ Melhor caso - lê apenas o índice
- Nenhum acesso à tabela necessário
- Requer VACUUM para atualizar o visibility map

**Bitmap Heap Scan**
- ✅ Bom para seletividade média
- Combina múltiplos índices
- Melhor do que múltiplos index scans

**Nested Loop**
- Bom para conjuntos de resultados pequenos
- Faz join iterando
- Pode ser lento com grandes volumes de dados

**Hash Join**
- Bom para conjuntos de resultados grandes
- Constrói uma hash table na memória
- Rápido para equi-joins

**Merge Join**
- Bom para entradas ordenadas
- Eficiente para grandes volumes de dados ordenados
- Requer entradas ordenadas (ou as ordena)

### Análise de Buffer

**Shared Hits** (Bom)
- Dados encontrados no cache
- Nenhum I/O de disco necessário
- Razão alta = bom caching

**Shared Reads** (Ruim se alto)
- Dados lidos do disco
- Lento comparado ao cache
- Razão alta = cache misses

**Temp Read/Written** (Ruim)
- Usando arquivos temporários de disco
- Memória insuficiente
- Frequentemente devido a grandes sorts/hashes

---

## Problemas Comuns de Performance

### Problema 1: Sequential Scan em Tabela Grande

```
Seq Scan on fragments  (cost=0.00..10000 rows=1000000)
  Filter: (user_id = '...')
```

**Problema**: Varrendo a tabela inteira  
**Impacto**: Lento para tabelas grandes  
**Correção**: Criar índice

```sql
CREATE INDEX idx_fragments_user_id ON fragments(user_id);
```

### Problema 2: Índice Ausente em Join

```
Nested Loop  (cost=0.00..50000)
  -> Seq Scan on users
  -> Seq Scan on fragments
       Filter: (fragments.user_id = users.id)
```

**Problema**: Nenhum índice para a condição de join  
**Impacto**: Complexidade quadrática  
**Correção**: Indexar a foreign key

```sql
CREATE INDEX idx_fragments_user_id ON fragments(user_id);
```

### Problema 3: Alto Uso de Arquivos Temporários

```
Sort  (cost=10000..12000)
  Sort Key: created_at DESC
  Sort Method: external merge  Disk: 5000kB
```

**Problema**: A ordenação transborda para o disco  
**Impacto**: Muito mais lento do que em memória  
**Correção**: Aumentar o work_mem ou adicionar índice

```sql
-- Option 1: Increase memory (session)
SET work_mem = '64MB';

-- Option 2: Add index to avoid sort
CREATE INDEX idx_fragments_created_at ON fragments(created_at DESC);
```

### Problema 4: Estimativa de Linhas Ruim

```
Seq Scan on users  (cost=0.00..100 rows=10 actual rows=10000)
```

**Problema**: Estimou 10 linhas, na verdade 10.000  
**Impacto**: Estratégia de join errada escolhida  
**Correção**: Atualizar as estatísticas

```sql
ANALYZE users;
-- Or more aggressive:
VACUUM ANALYZE users;
```

### Problema 5: Política RLS Lenta

```
Seq Scan on fragments  (cost=0.00..10000 rows=500000)
  Filter: ((user_id = auth.uid()) AND (deleted_at IS NULL))
  Rows Removed by Filter: 499990
```

**Problema**: A política RLS não está usando índice  
**Impacto**: Varre todas as linhas para aplicar a política  
**Correção**: Indexar as colunas da política RLS

```sql
CREATE INDEX idx_fragments_user_id_not_deleted 
ON fragments(user_id) 
WHERE deleted_at IS NULL;
```

---

## Workflow de Otimização

### 1. Baseline

Execute a query atual:
```bash
*explain "SELECT * FROM table WHERE ..."
```

Anote o tempo de execução e o plano.

### 2. Levantar Hipóteses

O que pode estar lento?
- Sequential scans?
- Índices ausentes?
- Transbordamentos de sort/hash?
- Estatísticas ruins?

### 3. Testar a Correção

Aplique a correção potencial:
```sql
CREATE INDEX ...;
-- or
VACUUM ANALYZE table;
-- or
SET work_mem = '...';
```

### 4. Re-Medir

Execute o explain novamente:
```bash
*explain "SELECT * FROM table WHERE ..."
```

Compare:
- O tempo de execução melhorou?
- O plano mudou como esperado?
- O custo foi reduzido?

### 5. Iterar

Repita até que a performance seja aceitável.

---

## Opções Avançadas

### Comparar Diferentes Queries

```bash
# Option A
*explain "SELECT * FROM users WHERE status = 'active'"

# Option B (rewritten)
*explain "SELECT * FROM users WHERE deleted_at IS NULL AND status = 'active'"
```

Escolha a query com o melhor plano.

### Analisar os Hot Paths

Para queries críticas, analise sob carga:

```sql
-- Run multiple times to warm cache
EXPLAIN (ANALYZE, BUFFERS) SELECT ...;
EXPLAIN (ANALYZE, BUFFERS) SELECT ...;
EXPLAIN (ANALYZE, BUFFERS) SELECT ...;

-- Check consistency of execution time
```

### Exportar o Plano para Análise

```bash
psql "$SUPABASE_DB_URL" -qAt -c \
"EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON) SELECT ..." \
> query_plan.json
```

Faça upload para: https://explain.depesz.com ou https://explain.dalibo.com

---

## Metas de Performance

### Objetivos de Tempo de Resposta

**Queries interativas**: < 100ms  
**Relatórios**: < 1s  
**Batch/Background**: < 5s  

**Se mais lento:**
- Verifique sequential scans
- Adicione/otimize índices
- Considere caching
- Otimize as políticas RLS

### Razão de Cache Hit

**Meta**: > 95% de shared hits

```sql
-- Check overall cache hit ratio
SELECT 
  sum(heap_blks_hit) / (sum(heap_blks_hit) + sum(heap_blks_read)) AS cache_hit_ratio
FROM pg_statio_user_tables;
```

**Se baixa:**
- Aumente shared_buffers (task de DBA)
- Otimização de query necessária
- Considere mudanças no padrão de query

---

## Quando Usar o EXPLAIN

**Sempre:**
- Nova query em código de produção
- Após mudanças de schema
- Ao adicionar índices
- Mudanças em políticas RLS

**Reativo:**
- Relatórios de query lenta
- Degradação de performance
- Alta carga do banco de dados
- Antes de tentativas de otimização

**Nunca:**
- Para queries já conhecidas como rápidas
- Em queries ainda sem dados (estatísticas não confiáveis)
- Sem ANALYZE se você precisar do tempo real

---

## Limitações

### EXPLAIN ANALYZE Executa a Query

⚠️ **Aviso**: ANALYZE de fato executa a query

**Seguro:**
- Queries SELECT
- Queries somente-leitura

**Perigoso:**
- INSERT/UPDATE/DELETE (use transação + rollback)
- Queries com efeitos colaterais

```sql
-- Safe way to EXPLAIN write queries
BEGIN;
EXPLAIN ANALYZE DELETE FROM ...;
ROLLBACK;  -- Undo changes
```

### As Estatísticas Podem Estar Desatualizadas

Planos baseiam-se nas estatísticas da tabela:
- Atualizadas por VACUUM/ANALYZE
- Podem não refletir os dados atuais
- Execute ANALYZE se as estimativas estiverem muito fora

### O Plano Pode Mudar

Os planos variam com base em:
- Distribuição dos dados
- Tamanho da tabela
- Configuração do servidor
- Estado do cache
- Hora do dia (carga)

---

## Integração com o Workflow

Workflow de otimização de query:

1. Encontrar a query lenta (logs, monitoramento)
2. `*explain "SELECT ..."` - Baseline
3. Analisar o plano (sequential scans? índices ausentes?)
4. Levantar hipótese de correção
5. Aplicar a correção em dev
6. `*explain "SELECT ..."` - Verificar a melhoria
7. Testar com volume real de dados
8. Fazer deploy em produção
9. Monitorar a performance real

---

## Recursos

**Ferramentas de Visualização:**
- https://explain.depesz.com
- https://explain.dalibo.com
- https://tatiyants.com/pev/

**Documentação:**
- PostgreSQL EXPLAIN: https://www.postgresql.org/docs/current/sql-explain.html
- Using EXPLAIN: https://www.postgresql.org/docs/current/using-explain.html

**Comandos Relacionados:**
- `*analyze-hotpaths` - Verificar padrões comuns de query
- `*design-indexes` - Planejar a estratégia de índices
- `*rls-audit` - Verificar a performance das políticas RLS
