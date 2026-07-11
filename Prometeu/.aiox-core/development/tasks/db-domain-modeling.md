---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Task: Sessão de Modelagem de Domínio

**Propósito**: Sessão interativa para modelar o domínio de negócio em um schema de banco de dados

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
- Fase de análise da task (identificar todas as ambiguidades)
- Execução sem ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: dbDomainModeling()
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

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** neo4j-driver
  - **Propósito:** Conexão com o banco Neo4j e execução de queries
  - **Origem:** npm: neo4j-driver

- **Ferramenta:** query-validator
  - **Propósito:** Validação da sintaxe de queries Cypher
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

1. **Erro:** Falha na Conexão
   - **Causa:** Não foi possível conectar ao banco Neo4j
   - **Resolução:** Verificar a connection string, as credenciais, a rede
   - **Recuperação:** Repetir com backoff exponencial (máximo de 3 tentativas)

2. **Erro:** Erro de Sintaxe na Query
   - **Causa:** Sintaxe de query Cypher inválida
   - **Resolução:** Validar a sintaxe da query antes da execução
   - **Recuperação:** Retornar erro de sintaxe detalhado, sugerir correção

3. **Erro:** Rollback de Transação
   - **Causa:** A query viola restrições ou sofre timeout
   - **Resolução:** Revisar a lógica e as restrições da query
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
- Análise iterativa com limites de profundidade; cachear resultados intermediários; agrupar operações similares em lote

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


## Visão Geral

Esta task guia você pelo design de banco de dados orientado a domínio (domain-driven), ajudando a traduzir requisitos de negócio em um schema de banco de dados bem estruturado.

---

## Processo

### 1. Entender o Domínio

Faça ao usuário perguntas abrangentes:

```
Vamos modelar seu domínio!

1. Qual é o domínio de negócio? (ex.: e-commerce, redes sociais, SaaS)

2. Quem são os principais atores? (ex.: usuários, admins, clientes)

3. Quais são as entidades centrais? (ex.: produtos, pedidos, posts)

4. Quais são os relacionamentos-chave? (ex.: usuários têm pedidos, posts pertencem a usuários)

5. Quais são as regras de negócio críticas? (ex.: pedidos não podem ser excluídos, usuários devem verificar o e-mail)

6. Quais são os principais casos de uso? (ex.: usuário cria post, admin aprova conteúdo)

7. Qual é a escala esperada? (ex.: 1K usuários, 100K pedidos/mês)

8. Há algum requisito de conformidade? (ex.: GDPR, HIPAA)
```

### 2. Identificar as Entidades Centrais

Para cada entidade mencionada, reúna detalhes:

```
Entidade: {entity_name}

1. Descrição: O que é?

2. Atributos: Quais propriedades ela possui?
   - Campos obrigatórios?
   - Campos opcionais?
   - Campos computados?

3. Identificador: Como ela é identificada de forma única?
   - UUID (recomendado para sistemas distribuídos)
   - Inteiro serial
   - Chave natural (e-mail, SKU, etc.)

4. Ciclo de vida: Como ela muda ao longo do tempo?
   - Imutável (nunca muda)
   - Mutável (pode ser atualizada)
   - Soft-deletable (arquivada, não excluída)

5. Padrões de acesso: Como ela será consultada?
   - Por ID (busca por chave primária)
   - Por usuário (filtrada por user_id)
   - Por intervalo de datas
   - Busca full-text
   - Agregações
```

### 3. Mapear os Relacionamentos

Identifique os relacionamentos entre entidades:

```
Análise de Relacionamentos:

Para cada par de entidades, determine:

1. Tipo de relacionamento:
   - Um-para-Um (1:1)
   - Um-para-Muitos (1:N)
   - Muitos-para-Muitos (M:N)

2. Titularidade (ownership):
   - Quem é o dono do relacionamento?
   - Ele pode existir de forma independente?

3. Cardinalidade:
   - Opcional ou obrigatório?
   - Restrições de mín/máx?

4. Comportamento de cascata:
   - O que acontece ao excluir?
   - O que acontece ao atualizar?

Exemplos:
- User → Posts (1:N, user é dono, CASCADE delete)
- Post ← Tags (M:N, tabela de junção, sem cascata)
- User → Profile (1:1, user é dono, CASCADE delete)
```

### 4. Projetar as Tabelas

Para cada entidade, projete a tabela:

```sql
-- Template for each table

CREATE TABLE {entity_name} (
  -- Primary Key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Foreign Keys (relationships)
  {parent}_id UUID REFERENCES {parent}(id) ON DELETE CASCADE,

  -- Required Attributes
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Optional Attributes
  description TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,

  -- Audit Fields
  updated_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,  -- For soft deletes

  -- Constraints
  CONSTRAINT valid_name CHECK (LENGTH(name) > 0),
  CONSTRAINT valid_dates CHECK (created_at <= COALESCE(updated_at, NOW()))
);

-- Indexes (based on access patterns)
CREATE INDEX idx_{entity}_parent ON {entity}({parent}_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_{entity}_created ON {entity}(created_at DESC);

-- Comments (documentation)
COMMENT ON TABLE {entity} IS 'Stores {business description}';
COMMENT ON COLUMN {entity}.metadata IS 'Flexible JSONB field for extensibility';
```

### 5. Tratar Relacionamentos Muitos-para-Muitos

Crie tabelas de junção para relacionamentos M:N:

```sql
-- Junction table pattern
CREATE TABLE {entity1}_{entity2} (
  {entity1}_id UUID NOT NULL REFERENCES {entity1}(id) ON DELETE CASCADE,
  {entity2}_id UUID NOT NULL REFERENCES {entity2}(id) ON DELETE CASCADE,

  -- Optional attributes (e.g., role, priority)
  role TEXT DEFAULT 'member',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Composite primary key
  PRIMARY KEY ({entity1}_id, {entity2}_id)
);

-- Indexes for both directions
CREATE INDEX idx_{entity1}_{entity2}_1 ON {entity1}_{entity2}({entity1}_id);
CREATE INDEX idx_{entity1}_{entity2}_2 ON {entity1}_{entity2}({entity2}_id);
```

### 6. Aplicar as Regras de Negócio

Traduza as regras de negócio em restrições de banco de dados:

```sql
-- Example business rules

-- Rule: Email must be unique
ALTER TABLE users ADD CONSTRAINT unique_email UNIQUE (email);

-- Rule: Orders cannot be negative
ALTER TABLE orders ADD CONSTRAINT positive_total CHECK (total >= 0);

-- Rule: Published posts must have title
ALTER TABLE posts ADD CONSTRAINT published_has_title
  CHECK (status != 'published' OR (title IS NOT NULL AND LENGTH(title) > 0));

-- Rule: Soft-deleted records are read-only
CREATE OR REPLACE FUNCTION prevent_update_deleted()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.deleted_at IS NOT NULL THEN
    RAISE EXCEPTION 'Cannot update deleted record';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_prevent_update_deleted
  BEFORE UPDATE ON {table}
  FOR EACH ROW
  EXECUTE FUNCTION prevent_update_deleted();
```

### 7. Projetar para os Padrões de Acesso

Crie índices com base em como os dados serão consultados:

```sql
-- Pattern 1: User-specific data (multi-tenant)
CREATE INDEX idx_posts_user ON posts(user_id) WHERE deleted_at IS NULL;

-- Pattern 2: Time-based queries
CREATE INDEX idx_posts_created ON posts(created_at DESC) WHERE deleted_at IS NULL;

-- Pattern 3: Status filtering
CREATE INDEX idx_posts_status ON posts(status, created_at DESC);

-- Pattern 4: Full-text search
CREATE INDEX idx_posts_search ON posts USING gin(to_tsvector('english', title || ' ' || content));

-- Pattern 5: JSONB queries
CREATE INDEX idx_posts_metadata ON posts USING gin(metadata jsonb_path_ops);

-- Pattern 6: Composite (multiple filters)
CREATE INDEX idx_posts_user_status ON posts(user_id, status, created_at DESC);
```

### 8. Adicionar Políticas de RLS

Implemente Row Level Security para o Supabase:

```sql
-- Enable RLS
ALTER TABLE {table} ENABLE ROW LEVEL SECURITY;

-- Policy: Users see only their own data
CREATE POLICY "{table}_users_own"
  ON {table}
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Admins see everything
CREATE POLICY "{table}_admins_all"
  ON {table}
  FOR ALL
  TO authenticated
  USING (
    (auth.jwt() ->> 'role') = 'admin'
  );

-- Policy: Public read, authenticated write
CREATE POLICY "{table}_public_read"
  ON {table}
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "{table}_auth_write"
  ON {table}
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
```

### 9. Gerar o Documento de Schema

Crie o documento de design de schema usando o template:

```
Use o template: schema-design-tmpl.yaml

Preencha:
- domain_context
- entities (todas as entidades identificadas)
- relationships (todos os relacionamentos)
- access_patterns (do passo 7)
- constraints (do passo 6)
- indexes (do passo 7)
- rls_policies (do passo 8)
```

### 10. Gerar a Migration

Crie o arquivo de migration inicial:

```bash
TS=$(date +%Y%m%d%H%M%S)
MIGRATION_FILE="supabase/migrations/${TS}_initial_schema.sql"

cat > "$MIGRATION_FILE" << 'EOF'
-- Initial Schema Migration
-- Domain: {domain_name}
-- Generated: {timestamp}

BEGIN;

-- Create all tables
{table_definitions}

-- Create all indexes
{index_definitions}

-- Create all constraints
{constraint_definitions}

-- Enable RLS and create policies
{rls_policies}

-- Add comments
{comment_statements}

COMMIT;
EOF

echo "✓ Migration created: $MIGRATION_FILE"
```

---

## Saída

Forneça um modelo de domínio abrangente:

```
✅ MODELO DE DOMÍNIO COMPLETO

Domínio: {domain_name}

Entidades: {count}
- {entity1}
- {entity2}
...

Relacionamentos:
- {entity1} → {entity2} (1:N)
- {entity3} ← {entity4} (M:N via junção)
...

Arquivos Gerados:
1. docs/schema-design.yaml - Documentação completa do schema
2. supabase/migrations/{TS}_initial_schema.sql - Arquivo de migration
3. docs/erd.md - Diagrama de relacionamento de entidades (markdown)

Próximos Passos:
1. Revisar o documento de design de schema
2. Validar com os stakeholders
3. Rodar dry-run: *dry-run {migration_file}
4. Aplicar a migration: *apply-migration {migration_file}
5. Adicionar dados de seed se necessário: *seed {seed_file}
```

---

## Boas Práticas

### 1. Comece Simples

- Comece com as entidades centrais
- Adicione complexidade de forma incremental
- Evite otimização prematura

### 2. Use Padrões Padronizados

- id (chave primária UUID)
- created_at, updated_at (timestamps)
- deleted_at (soft deletes)
- user_id (titularidade)

### 3. Documente Tudo

- Comentários de tabela
- Comentários de coluna
- Nomes de restrição que explicam o propósito

### 4. Pense na Escala

- Como as tabelas vão crescer?
- Quais queries serão mais comuns?
- Onde estão os hot paths?

### 5. Projete para Mudança

- Use JSONB para atributos flexíveis
- Soft deletes preservam o histórico
- Migrations são aditivas quando possível

### 6. Segurança em Primeiro Lugar

- RLS por padrão
- Restrições garantem a integridade dos dados
- Foreign keys evitam órfãos

---

## Padrões Comuns de Domínio

### 1. Multi-Tenancy

```sql
-- Tenant isolation
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  email TEXT NOT NULL UNIQUE,
  UNIQUE (organization_id, email)
);

-- RLS for tenant isolation
CREATE POLICY "org_isolation" ON users
  FOR ALL TO authenticated
  USING (
    organization_id IN (
      SELECT organization_id
      FROM user_organizations
      WHERE user_id = auth.uid()
    )
  );
```

### 2. Trilha de Auditoria (Audit Trail)

```sql
-- Immutable audit log
CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name TEXT NOT NULL,
  record_id UUID NOT NULL,
  operation TEXT NOT NULL, -- INSERT, UPDATE, DELETE
  old_data JSONB,
  new_data JSONB,
  user_id UUID REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigger for automatic auditing
CREATE OR REPLACE FUNCTION audit_trigger()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_log (table_name, record_id, operation, old_data, new_data, user_id)
  VALUES (
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    TG_OP,
    CASE WHEN TG_OP != 'INSERT' THEN to_jsonb(OLD) END,
    CASE WHEN TG_OP != 'DELETE' THEN to_jsonb(NEW) END,
    auth.uid()
  );
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 3. Dados Hierárquicos

```sql
-- Adjacency list pattern
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID REFERENCES categories(id),
  name TEXT NOT NULL,
  path TEXT[] -- Materialized path for fast queries
);

-- Update path on insert/update
CREATE OR REPLACE FUNCTION update_category_path()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.parent_id IS NULL THEN
    NEW.path := ARRAY[NEW.id];
  ELSE
    SELECT path || NEW.id INTO NEW.path
    FROM categories
    WHERE id = NEW.parent_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

---

## Referências

- [Domain-Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design)
- [PostgreSQL Data Types](https://www.postgresql.org/docs/current/datatype.html)
- [Supabase RLS Policies](https://supabase.com/docs/guides/auth/row-level-security)
