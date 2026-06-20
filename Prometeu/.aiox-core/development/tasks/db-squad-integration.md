# Análise de Integração de Banco de Dados para Squad

> Task ID: db-Squad-integration
> Agent: DB Sage (Database Architect)
> Version: 1.0.0

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
task: dbExpansionPackIntegration()
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


## Descrição

Analise os requisitos de dados de um squad e projete a estratégia de integração com o banco de dados. Mapeia entradas/saídas/estado do pack para o schema do banco de dados, propõe tabelas/relacionamentos e gera um plano de migration.

## Pré-requisitos

- Squad instalado e acessível
- Conexão com o banco de dados configurada (*env-check aprovado)
- Schema atual documentado ou acessível

## Workflow

### Passo 1: Identificar o Squad Alvo

**Elicite do usuário:**
- Qual squad? (mmos, creator-os, innerlens, etc.)
- Caminho para o diretório do squad

**Ações:**
- Verificar se o pack existe e tem config.yaml
- Carregar os metadados do pack (name, version, description)

---

### Passo 2: Auditar os Fluxos de Dados do Squad

**Varra a estrutura do pack em busca de pontos de contato de dados:**

```bash
# Look for data indicators
- Config files (*.yaml, *.json, .env.example)
- Input directories (sources/, inputs/, uploads/)
- Output directories (outputs/, generated/, artifacts/)
- State files (state.json, .cache/, db/)
- Scripts that read/write data
- API endpoints that handle data
```

**Documente os achados:**

```yaml
expansion_pack_audit:
  name: mmos
  version: 2.0.0

  data_inputs:
    - type: user_interview_transcript
      format: markdown
      location: sources/interviews/
      volume: ~50 files per mind

    - type: configuration
      format: yaml
      location: config/mind-config.yaml
      fields: [name, personality_type, communication_style]

  data_outputs:
    - type: cognitive_model
      format: yaml
      location: outputs/minds/{slug}/analysis/
      persistence_need: high (reusable artifact)

    - type: system_prompt
      format: markdown
      location: outputs/minds/{slug}/system_prompts/
      persistence_need: high (versioned, queryable)

    - type: knowledge_chunks
      format: json
      location: outputs/minds/{slug}/kb/
      persistence_need: high (searchable, referenceable)

  state_requirements:
    - processing_status: [pending, in_progress, completed, failed]
    - last_run_timestamp
    - version_tracking
    - validation_scores

  relationships:
    - One mind → many system_prompts (versioned)
    - One mind → many knowledge_chunks
    - One user → many minds
```

---

### Passo 3: Analisar o Schema Atual do Banco de Dados

**Conecte-se ao banco de dados e inspecione:**

```sql
-- List all tables
SELECT table_name, table_type
FROM information_schema.tables
WHERE table_schema = 'public';

-- Check for related tables
SELECT * FROM pg_tables WHERE schemaname = 'public';

-- Look for existing patterns
-- Users, projects, assets, metadata tables?
```

**Documente o schema atual:**

```yaml
current_schema:
  tables:
    - name: users
      has_auth: true
      fields: [id, email, created_at]

    - name: projects
      fields: [id, user_id, name, type, created_at]
      foreign_keys: [user_id → users.id]

  patterns_found:
    - Multi-tenancy via user_id
    - UUID primary keys
    - created_at/updated_at timestamps
    - RLS enabled on most tables
```

---

### Passo 4: Projetar o Schema de Integração

**Mapeie os dados do pack para tabelas do banco de dados:**

```yaml
proposed_schema:
  new_tables:

    # MMOS example
    - name: minds
      purpose: Store cognitive clone definitions
      fields:
        - id: uuid PRIMARY KEY
        - user_id: uuid REFERENCES users(id)
        - slug: text UNIQUE NOT NULL
        - name: text NOT NULL
        - personality_type: text
        - status: mind_status_enum
        - version: integer DEFAULT 1
        - created_at: timestamptz
        - updated_at: timestamptz
      indexes:
        - (user_id, slug) UNIQUE
        - (status) WHERE status = 'active'
      rls: "Users can only access their own minds"

    - name: mind_system_prompts
      purpose: Version-controlled system prompts
      fields:
        - id: uuid PRIMARY KEY
        - mind_id: uuid REFERENCES minds(id) ON DELETE CASCADE
        - version: integer NOT NULL
        - prompt_type: text (generalista, specialist, etc.)
        - content: text NOT NULL
        - metadata: jsonb
        - created_at: timestamptz
      indexes:
        - (mind_id, version, prompt_type) UNIQUE
      rls: "Inherit from minds table via mind_id"

    - name: mind_knowledge_chunks
      purpose: RAG-ready knowledge base
      fields:
        - id: uuid PRIMARY KEY
        - mind_id: uuid REFERENCES minds(id) ON DELETE CASCADE
        - chunk_text: text NOT NULL
        - embedding: vector(1536)  # OpenAI embeddings
        - metadata: jsonb (source_file, chunk_index, etc.)
        - created_at: timestamptz
      indexes:
        - (mind_id)
        - GiST (embedding vector_cosine_ops) # For similarity search
      rls: "Inherit from minds table"

  modified_tables: []

  enums:
    - name: mind_status_enum
      values: [pending, processing, completed, failed, archived]

  functions:
    - name: search_mind_knowledge(mind_id uuid, query_embedding vector)
      purpose: Vector similarity search for RAG
      returns: TABLE(chunk_id uuid, chunk_text text, similarity float)
```

---

### Passo 5: Validar o Design de Integração

**Execute as verificações:**

- [ ] Todas as saídas do pack têm estratégia de armazenamento
- [ ] Todas as entradas do pack podem ser referenciadas (uploads de usuário → tabela?)
- [ ] Requisitos de estado mapeados para campos
- [ ] Foreign keys impõem os relacionamentos
- [ ] Políticas RLS definidas para todas as tabelas
- [ ] Índices suportam as queries esperadas (listar minds, buscar na KB, lookup de versão)
- [ ] Nenhum dado órfão (CASCADE nas exclusões)
- [ ] Segue os padrões de schema existentes (user_id, timestamps, etc.)

**Verificação do KISS Gate:**

- O banco de dados é mesmo necessário? (Se o pack funciona bem com o sistema de arquivos, pare aqui)
- Que problema isso resolve? (capacidade de busca? multiusuário? versionamento?)
- Tabelas existentes podem ser estendidas em vez disso? (ex.: uma tabela genérica `projects`?)
- Schema mínimo viável? (Comece com 1 tabela, expanda depois se necessário)

---

### Passo 6: Gerar o Plano de Migration

**Crie a estratégia de migration:**

```yaml
migration_plan:
  phase_1_foundation:
    - Create enums (mind_status_enum)
    - Create base table (minds)
    - Add RLS policies to minds
    - Create seed data (test mind)

  phase_2_extensions:
    - Create related tables (mind_system_prompts, mind_knowledge_chunks)
    - Add foreign keys
    - Add indexes
    - Enable RLS on related tables

  phase_3_functions:
    - Create vector search function
    - Create helper views (active_minds, latest_prompts)

  rollback_strategy:
    - Snapshot before each phase
    - Rollback scripts generated
    - Test on staging first

  risk_assessment:
    - Low risk: New tables, no existing data affected
    - Medium risk: If modifying existing tables
    - High risk: If changing core auth/users tables
```

**Gere os arquivos de migration reais:**

```bash
# Use template to generate
*create-migration-plan

# Then scaffold files
supabase/migrations/20251027_001_create_minds_table.sql
supabase/migrations/20251027_002_create_mind_prompts_table.sql
supabase/migrations/20251027_003_create_mind_kb_table.sql
supabase/migrations/20251027_004_add_vector_search.sql
```

---

### Passo 7: Gerar a Documentação de Integração

**Crie docs/mmos/database-integration.md:**

```markdown
# MMOS Database Integration

## Overview
MMOS cognitive clones are now persisted in Supabase with full RLS, versioning, and vector search.

## Schema

### minds table
- Stores core mind definition
- One per cognitive clone
- User-scoped via RLS

### mind_system_prompts table
- Version-controlled prompts
- Many per mind
- Allows A/B testing and rollback

### mind_knowledge_chunks table
- RAG-ready knowledge base
- Vector embeddings for similarity search
- Efficient retrieval during clone interaction

## Usage

### Creating a mind
```sql
INSERT INTO minds (user_id, slug, name, personality_type)
VALUES (auth.uid(), 'joao-lozano', 'João Lozano', 'ENTJ');
```

### Storing system prompt
```sql
INSERT INTO mind_system_prompts (mind_id, version, prompt_type, content)
VALUES (:mind_id, 1, 'generalista', :prompt_content);
```

### Searching knowledge base
```sql
SELECT * FROM search_mind_knowledge(
  :mind_id,
  :query_embedding::vector(1536)
)
LIMIT 10;
```

## Migration Path

1. Run migrations in order (see supabase/migrations/)
2. Backfill existing minds from outputs/ directory
3. Update MMOS scripts to read/write database
4. Keep filesystem outputs as backup during transition
```

---

### Passo 8: Emitir o Relatório de Integração

**Gere Squads/{pack-name}/database-integration-report.yaml:**

```yaml
integration_analysis:
  expansion_pack: mmos
  database: supabase_production
  analysis_date: 2025-10-27
  analyst: DB Sage

summary:
  recommendation: "Integrate with database"
  rationale: |
    - Multi-user access required (MMOS will be SaaS)
    - Version tracking needed (system prompt evolution)
    - Vector search needed (RAG for clone responses)
    - Filesystem alone cannot support these requirements

  tables_added: 3
  tables_modified: 0
  migration_risk: low
  estimated_effort: 4 hours (design + migrate + test)

schema_design:
  file: docs/mmos/database-schema.yaml
  erd: docs/mmos/database-erd.png (generate with *create-schema)

migration_plan:
  file: docs/mmos/migration-plan.yaml
  migrations_directory: supabase/migrations/
  rollback_scripts: supabase/rollback/

next_steps:
  - [ ] Review schema design with team
  - [ ] Approve migration plan
  - [ ] Run *snapshot baseline
  - [ ] Execute migrations (*migrate)
  - [ ] Test integration (*smoke-test)
  - [ ] Update MMOS scripts to use database
  - [ ] Deploy to staging
  - [ ] Monitor for 48h
  - [ ] Deploy to production
```

---

## Critérios de Sucesso

- [ ] Fluxos de dados do squad totalmente documentados
- [ ] Schema atual analisado
- [ ] Schema de integração projetado (segue os padrões, tem RLS)
- [ ] Validação do KISS Gate aprovada (o banco de dados é realmente necessário)
- [ ] Plano de migration gerado com estratégia de rollback
- [ ] Documentação de integração criada
- [ ] Relatório gerado com próximos passos claros

---

## Arquivos de Saída

```
Squads/{pack-name}/
├── database-integration-report.yaml  ← Main output
├── data-flow-audit.yaml              ← Step 2 findings
└── schema-design.yaml                ← Step 4 design

docs/{pack-name}/
├── database-integration.md           ← Usage guide
├── database-schema.yaml              ← Schema definition
└── migration-plan.yaml               ← Migration strategy

supabase/migrations/
└── 2025MMDD_NNN_{pack}_*.sql        ← Ready to apply
```

---

## Exemplos

### Integração do CreatorOS

```yaml
# CreatorOS generates courses → needs to store:
# - Course metadata (title, description, status)
# - Curriculum structure (modules, lessons)
# - Generated content (video scripts, quizzes)
# - User progress (if multi-user platform)

proposed_schema:
  - courses table (id, user_id, slug, title, status)
  - course_modules table (id, course_id, order, title)
  - course_lessons table (id, module_id, order, title, content_type)
  - course_content table (id, lesson_id, content, generated_at)
```

### Integração do InnerLens

```yaml
# InnerLens does psychometric assessments → needs to store:
# - Assessment definitions (Big5, MBTI, etc.)
# - User responses (answers, timestamps)
# - Computed results (personality profiles)

proposed_schema:
  - assessments table (id, name, type, questions_jsonb)
  - user_assessments table (id, user_id, assessment_id, completed_at)
  - assessment_responses table (id, user_assessment_id, question_id, response)
  - assessment_results table (id, user_assessment_id, results_jsonb)
```

---

## Notas

- **Sempre execute a validação do KISS Gate** - o banco de dados pode não ser necessário
- **Siga os padrões existentes** - não reinvente (user_id, timestamps, RLS)
- **Comece mínimo** - sempre é possível adicionar tabelas depois
- **Pense nas queries** - os índices devem corresponder aos padrões de acesso
- **Planeje para escala** - busca vetorial, particionamento se necessário
- **RLS desde o dia 1** - segurança não pode ser adaptada facilmente depois
- **Documente tudo** - os futuros mantenedores agradecerão

---

## Tasks Relacionadas

- `*validate-kiss` - Execute antes desta task (OBRIGATÓRIO)
- `*create-schema` - Gerar documentação completa do schema com ERD
- `*create-migration-plan` - Gerar estratégia detalhada de migration
- `*migrate` - Executar as migrations reais
- `*smoke-test` - Validar a integração após a migration
