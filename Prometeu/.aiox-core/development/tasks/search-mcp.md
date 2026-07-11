---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Task Buscar Catálogo de MCP

> Buscar e descobrir servidores MCP disponíveis no catálogo do Docker MCP Toolkit.

---

## Definição da Task

```yaml
task: searchMcp()
responsavel: DevOps Agent
responsavel_type: Agente
atomic_layer: Infrastructure
elicit: true

**Entrada:**
- campo: search_query
  tipo: string
  origem: User Input
  obrigatorio: true
  validacao: Consulta de busca para o catálogo MCP (ex.: "notion", "database", "slack")

**Saida:**
- campo: mcp_results
  tipo: array
  destino: Console output
  persistido: false

- campo: mcp_details
  tipo: object
  destino: Console output (se o usuário selecionar um MCP)
  persistido: false
```

---

## Pré-Condições

```yaml
pre-conditions:
  - [ ] Docker MCP Toolkit em execução
    tipo: pre-condition
    blocker: true
    validacao: docker mcp --version succeeds
    error_message: "Docker MCP Toolkit required. Enable in Docker Desktop settings."

  - [ ] Docker daemon em execução
    tipo: pre-condition
    blocker: true
    validacao: docker info succeeds
    error_message: "Start Docker Desktop before running this task"
```

---

## Elicitação Interativa

### Passo 1: Consulta de Busca

```
ELICIT: MCP Search Query

What type of MCP server are you looking for?

Examples:
  • "notion" - Workspace and document management
  • "database" - Database integrations (postgres, mysql, sqlite)
  • "slack" - Team messaging
  • "browser" - Browser automation (puppeteer, playwright)
  • "storage" - Cloud storage (s3, gcs)
  • "*" - List all available MCPs

→ Enter search query: _______________
```

### Passo 2: Exibir Resultados

```
ELICIT: Search Results

Found {n} MCPs matching "{query}":

┌─────────────────────────────────────────────────────────────────┐
│ #  │ MCP Name        │ Description                             │
├─────────────────────────────────────────────────────────────────┤
│ 1  │ mcp/notion      │ Notion workspace integration            │
│ 2  │ mcp/postgres    │ PostgreSQL database access              │
│ 3  │ mcp/sqlite      │ SQLite local database                   │
│ 4  │ mcp/mysql       │ MySQL database access                   │
└─────────────────────────────────────────────────────────────────┘

Options:
  • Enter a number to see details
  • Type "add {number}" to add the MCP
  • Type "search {query}" to search again
  • Type "exit" to finish

→ Select option: ___
```

### Passo 3: Exibir Detalhes do MCP (Opcional)

```
ELICIT: MCP Details

📦 mcp/{name}

Description: {full_description}

🔧 Tools Provided:
   • tool1 - Description of tool1
   • tool2 - Description of tool2
   • tool3 - Description of tool3

🔑 Required Credentials:
   • {CREDENTIAL_NAME} - {description}
   • (none) - if no credentials needed

📋 Example Usage:
   docker mcp server add {name}
   docker mcp tools call {name}.{tool} --param value

Options:
  • Type "add" to add this MCP
  • Type "back" to return to results
  • Type "exit" to finish

→ Select option: ___
```

---

## Passos de Implementação

### 1. Buscar no Catálogo

```bash
# Basic search
docker mcp catalog search {query}

# Example: Search for "notion"
docker mcp catalog search notion

# List all MCPs
docker mcp catalog search "*"

# Example output:
# NAME           DESCRIPTION
# mcp/notion     Notion workspace integration
# mcp/postgres   PostgreSQL database access
```

### 2. Obter Detalhes do MCP

```bash
# Get detailed info about an MCP
docker mcp catalog info {mcp-name}

# Example: Get notion details
docker mcp catalog info notion

# Example output:
# Name: mcp/notion
# Description: Notion workspace integration
# Tools:
#   - getPage: Retrieve a Notion page
#   - createPage: Create a new page
#   - search: Search Notion workspace
# Environment:
#   - NOTION_API_KEY (required)
```

### 3. Filtrar por Categoria (se suportado)

```bash
# Search by category
docker mcp catalog search --category database
docker mcp catalog search --category productivity
docker mcp catalog search --category automation
```

---

## Pós-Condições

```yaml
post-conditions:
  - [ ] Resultados da busca exibidos
    tipo: post-condition
    blocker: false
    validacao: O usuário consegue ver MCPs correspondentes ou a mensagem "no results"
    error_message: "Search failed - check Docker MCP connection"
```

---

## Tratamento de Erros

### Erro: Nenhum Resultado Encontrado

```
Resolution:
1. Try a broader search query
2. Use wildcards: docker mcp catalog search "*database*"
3. Check available categories: docker mcp catalog categories
4. Browse full catalog: docker mcp catalog search "*"
```

### Erro: Docker MCP Indisponível

```
Resolution:
1. Verify Docker Desktop 4.50+ is installed
2. Enable MCP Toolkit: Docker Desktop > Settings > Extensions > MCP Toolkit
3. Restart Docker Desktop
4. Verify: docker mcp --version
```

### Erro: Timeout do Catálogo

```
Resolution:
1. Check internet connection
2. Docker MCP catalog requires network access
3. Retry: docker mcp catalog search {query}
4. Check Docker proxy settings if behind firewall
```

---

## Saída de Sucesso

```
✅ MCP Catalog Search Complete

🔍 Query: "{query}"
📦 Results: {n} MCPs found

┌─────────────────────────────────────────────────────────────────┐
│ MCP Name        │ Description              │ Credentials       │
├─────────────────────────────────────────────────────────────────┤
│ mcp/notion      │ Notion workspace         │ NOTION_API_KEY    │
│ mcp/postgres    │ PostgreSQL access        │ DATABASE_URL      │
│ mcp/sqlite      │ SQLite local DB          │ None              │
└─────────────────────────────────────────────────────────────────┘

Next steps:
1. View details: *search-mcp → select number
2. Add an MCP: *add-mcp {name}
3. List enabled MCPs: *list-mcps
```

---

## Exemplos Comuns de Busca

| Consulta de Busca | Encontra | Caso de Uso |
|--------------|-------|----------|
| `notion` | MCP de workspace Notion | Gestão de documentos |
| `database` | postgres, mysql, sqlite, redis | Acesso a banco de dados |
| `slack` | MCP de mensageria Slack | Comunicação de equipe |
| `browser` | puppeteer, playwright | Automação de navegador |
| `storage` | s3, gcs, azure-blob | Armazenamento em nuvem |
| `github` | MCP da API do GitHub | Gestão de repositório |
| `*` | Todos os MCPs disponíveis | Navegar pelo catálogo completo |

---

## Comandos Relacionados

| Comando | Descrição |
|---------|-------------|
| `*add-mcp` | Adicionar um servidor MCP ao Docker MCP Toolkit |
| `*list-mcps` | Listar MCPs atualmente habilitados |
| `*remove-mcp` | Remover um MCP do Docker MCP Toolkit |
| `*setup-mcp-docker` | Configuração inicial do Docker MCP Toolkit |

---

## Performance

```yaml
duration_expected: 1-2 minutos
cost_estimated: $0 (operação local do Docker)
token_usage: ~200-500 tokens
```

---

## Metadados

```yaml
task: search-mcp
version: 1.0.0
story: Story 6.14 - MCP Governance Consolidation
dependencies:
  - Docker MCP Toolkit
  - Docker Desktop 4.50+
tags:
  - infrastructure
  - mcp
  - docker
  - discovery
  - catalog
created_at: 2025-12-17
updated_at: 2025-12-17
agents:
  - devops
```
