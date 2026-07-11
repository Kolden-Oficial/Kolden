---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.claude/skills/mcp-builder/reference/evaluation|evaluation]]"
  - "[[Prometeu/.claude/skills/mcp-builder/reference/mcp_best_practices|mcp_best_practices]]"
  - "[[Prometeu/.claude/skills/mcp-builder/reference/node_mcp_server|node_mcp_server]]"
---

# Guia de Implementação de Servidores MCP em Python

## Visão Geral

Este documento fornece boas práticas e exemplos específicos de Python para implementar servidores MCP usando o MCP Python SDK. Cobre configuração do servidor, padrões de registro de tools, validação de entrada com Pydantic, tratamento de erros e exemplos completos e funcionais.

---

## Referência Rápida

### Imports Principais
```python
from mcp.server.fastmcp import FastMCP
from pydantic import BaseModel, Field, field_validator, ConfigDict
from typing import Optional, List, Dict, Any
from enum import Enum
import httpx
```

### Inicialização do Servidor
```python
mcp = FastMCP("service_mcp")
```

### Padrão de Registro de Tools
```python
@mcp.tool(name="tool_name", annotations={...})
async def tool_function(params: InputModel) -> str:
    # Implementation
    pass
```

---

## MCP Python SDK e FastMCP

O MCP Python SDK oficial fornece o FastMCP, um framework de alto nível para construir servidores MCP. Ele fornece:
- Geração automática de description e inputSchema a partir das assinaturas de função e docstrings
- Integração com modelos Pydantic para validação de entrada
- Registro de tools baseado em decorator com `@mcp.tool`

**Para a documentação completa do SDK, use WebFetch para carregar:**
`https://raw.githubusercontent.com/modelcontextprotocol/python-sdk/main/README.md`

## Convenção de Nomenclatura de Servidores

Servidores MCP em Python devem seguir este padrão de nomenclatura:
- **Formato**: `{service}_mcp` (minúsculas com underscores)
- **Exemplos**: `github_mcp`, `jira_mcp`, `stripe_mcp`

O nome deve ser:
- Geral (não atrelado a funcionalidades específicas)
- Descritivo do serviço/API que está sendo integrado
- Fácil de inferir a partir da descrição da tarefa
- Sem números de versão ou datas

## Implementação de Tools

### Nomenclatura de Tools

Use snake_case para nomes de tools (ex: "search_users", "create_project", "get_channel_info") com nomes claros e orientados a ação.

**Evite Conflitos de Nomenclatura**: Inclua o contexto do serviço para prevenir sobreposições:
- Use "slack_send_message" em vez de apenas "send_message"
- Use "github_create_issue" em vez de apenas "create_issue"
- Use "asana_list_tasks" em vez de apenas "list_tasks"

### Estrutura da Tool com FastMCP

Tools são definidas usando o decorator `@mcp.tool` com modelos Pydantic para validação de entrada:

```python
from pydantic import BaseModel, Field, ConfigDict
from mcp.server.fastmcp import FastMCP

# Initialize the MCP server
mcp = FastMCP("example_mcp")

# Define Pydantic model for input validation
class ServiceToolInput(BaseModel):
    '''Input model for service tool operation.'''
    model_config = ConfigDict(
        str_strip_whitespace=True,  # Auto-strip whitespace from strings
        validate_assignment=True,    # Validate on assignment
        extra='forbid'              # Forbid extra fields
    )

    param1: str = Field(..., description="First parameter description (e.g., 'user123', 'project-abc')", min_length=1, max_length=100)
    param2: Optional[int] = Field(default=None, description="Optional integer parameter with constraints", ge=0, le=1000)
    tags: Optional[List[str]] = Field(default_factory=list, description="List of tags to apply", max_items=10)

@mcp.tool(
    name="service_tool_name",
    annotations={
        "title": "Human-Readable Tool Title",
        "readOnlyHint": True,     # Tool does not modify environment
        "destructiveHint": False,  # Tool does not perform destructive operations
        "idempotentHint": True,    # Repeated calls have no additional effect
        "openWorldHint": False     # Tool does not interact with external entities
    }
)
async def service_tool_name(params: ServiceToolInput) -> str:
    '''Tool description automatically becomes the 'description' field.

    This tool performs a specific operation on the service. It validates all inputs
    using the ServiceToolInput Pydantic model before processing.

    Args:
        params (ServiceToolInput): Validated input parameters containing:
            - param1 (str): First parameter description
            - param2 (Optional[int]): Optional parameter with default
            - tags (Optional[List[str]]): List of tags

    Returns:
        str: JSON-formatted response containing operation results
    '''
    # Implementation here
    pass
```

## Recursos-Chave do Pydantic v2

- Use `model_config` em vez da classe `Config` aninhada
- Use `field_validator` em vez do `validator` obsoleto
- Use `model_dump()` em vez do `dict()` obsoleto
- Validators exigem o decorator `@classmethod`
- Type hints são obrigatórios para métodos validators

```python
from pydantic import BaseModel, Field, field_validator, ConfigDict

class CreateUserInput(BaseModel):
    model_config = ConfigDict(
        str_strip_whitespace=True,
        validate_assignment=True
    )

    name: str = Field(..., description="User's full name", min_length=1, max_length=100)
    email: str = Field(..., description="User's email address", pattern=r'^[\w\.-]+@[\w\.-]+\.\w+$')
    age: int = Field(..., description="User's age", ge=0, le=150)

    @field_validator('email')
    @classmethod
    def validate_email(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("Email cannot be empty")
        return v.lower()
```

## Opções de Formato de Resposta

Suporte múltiplos formatos de saída para flexibilidade:

```python
from enum import Enum

class ResponseFormat(str, Enum):
    '''Output format for tool responses.'''
    MARKDOWN = "markdown"
    JSON = "json"

class UserSearchInput(BaseModel):
    query: str = Field(..., description="Search query")
    response_format: ResponseFormat = Field(
        default=ResponseFormat.MARKDOWN,
        description="Output format: 'markdown' for human-readable or 'json' for machine-readable"
    )
```

**Formato Markdown**:
- Use cabeçalhos, listas e formatação para clareza
- Converta timestamps para formato legível por humanos (ex: "2024-01-15 10:30:00 UTC" em vez de epoch)
- Mostre nomes de exibição com IDs entre parênteses (ex: "@john.doe (U123456)")
- Omita metadados verbosos (ex: mostre apenas uma URL de imagem de perfil, não todos os tamanhos)
- Agrupe informações relacionadas de forma lógica

**Formato JSON**:
- Retorne dados completos e estruturados, adequados para processamento programático
- Inclua todos os campos e metadados disponíveis
- Use nomes e tipos de campo consistentes

## Implementação de Paginação

Para tools que listam recursos:

```python
class ListInput(BaseModel):
    limit: Optional[int] = Field(default=20, description="Maximum results to return", ge=1, le=100)
    offset: Optional[int] = Field(default=0, description="Number of results to skip for pagination", ge=0)

async def list_items(params: ListInput) -> str:
    # Make API request with pagination
    data = await api_request(limit=params.limit, offset=params.offset)

    # Return pagination info
    response = {
        "total": data["total"],
        "count": len(data["items"]),
        "offset": params.offset,
        "items": data["items"],
        "has_more": data["total"] > params.offset + len(data["items"]),
        "next_offset": params.offset + len(data["items"]) if data["total"] > params.offset + len(data["items"]) else None
    }
    return json.dumps(response, indent=2)
```

## Limites de Caracteres e Truncamento

Adicione uma constante CHARACTER_LIMIT para evitar respostas sobrecarregadas:

```python
# At module level
CHARACTER_LIMIT = 25000  # Maximum response size in characters

async def search_tool(params: SearchInput) -> str:
    result = generate_response(data)

    # Check character limit and truncate if needed
    if len(result) > CHARACTER_LIMIT:
        # Truncate data and add notice
        truncated_data = data[:max(1, len(data) // 2)]
        response["data"] = truncated_data
        response["truncated"] = True
        response["truncation_message"] = (
            f"Response truncated from {len(data)} to {len(truncated_data)} items. "
            f"Use 'offset' parameter or add filters to see more results."
        )
        result = json.dumps(response, indent=2)

    return result
```

## Tratamento de Erros

Forneça mensagens de erro claras e acionáveis:

```python
def _handle_api_error(e: Exception) -> str:
    '''Consistent error formatting across all tools.'''
    if isinstance(e, httpx.HTTPStatusError):
        if e.response.status_code == 404:
            return "Error: Resource not found. Please check the ID is correct."
        elif e.response.status_code == 403:
            return "Error: Permission denied. You don't have access to this resource."
        elif e.response.status_code == 429:
            return "Error: Rate limit exceeded. Please wait before making more requests."
        return f"Error: API request failed with status {e.response.status_code}"
    elif isinstance(e, httpx.TimeoutException):
        return "Error: Request timed out. Please try again."
    return f"Error: Unexpected error occurred: {type(e).__name__}"
```

## Utilitários Compartilhados

Extraia funcionalidades comuns em funções reutilizáveis:

```python
# Shared API request function
async def _make_api_request(endpoint: str, method: str = "GET", **kwargs) -> dict:
    '''Reusable function for all API calls.'''
    async with httpx.AsyncClient() as client:
        response = await client.request(
            method,
            f"{API_BASE_URL}/{endpoint}",
            timeout=30.0,
            **kwargs
        )
        response.raise_for_status()
        return response.json()
```

## Boas Práticas de Async/Await

Sempre use async/await para requisições de rede e operações de E/S:

```python
# Good: Async network request
async def fetch_data(resource_id: str) -> dict:
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{API_URL}/resource/{resource_id}")
        response.raise_for_status()
        return response.json()

# Bad: Synchronous request
def fetch_data(resource_id: str) -> dict:
    response = requests.get(f"{API_URL}/resource/{resource_id}")  # Blocks
    return response.json()
```

## Type Hints

Use type hints por toda parte:

```python
from typing import Optional, List, Dict, Any

async def get_user(user_id: str) -> Dict[str, Any]:
    data = await fetch_user(user_id)
    return {"id": data["id"], "name": data["name"]}
```

## Docstrings de Tools

Toda tool deve ter docstrings abrangentes com informação de tipo explícita:

```python
async def search_users(params: UserSearchInput) -> str:
    '''
    Search for users in the Example system by name, email, or team.

    This tool searches across all user profiles in the Example platform,
    supporting partial matches and various search filters. It does NOT
    create or modify users, only searches existing ones.

    Args:
        params (UserSearchInput): Validated input parameters containing:
            - query (str): Search string to match against names/emails (e.g., "john", "@example.com", "team:marketing")
            - limit (Optional[int]): Maximum results to return, between 1-100 (default: 20)
            - offset (Optional[int]): Number of results to skip for pagination (default: 0)

    Returns:
        str: JSON-formatted string containing search results with the following schema:

        Success response:
        {
            "total": int,           # Total number of matches found
            "count": int,           # Number of results in this response
            "offset": int,          # Current pagination offset
            "users": [
                {
                    "id": str,      # User ID (e.g., "U123456789")
                    "name": str,    # Full name (e.g., "John Doe")
                    "email": str,   # Email address (e.g., "john@example.com")
                    "team": str     # Team name (e.g., "Marketing") - optional
                }
            ]
        }

        Error response:
        "Error: <error message>" or "No users found matching '<query>'"

    Examples:
        - Use when: "Find all marketing team members" -> params with query="team:marketing"
        - Use when: "Search for John's account" -> params with query="john"
        - Don't use when: You need to create a user (use example_create_user instead)
        - Don't use when: You have a user ID and need full details (use example_get_user instead)

    Error Handling:
        - Input validation errors are handled by Pydantic model
        - Returns "Error: Rate limit exceeded" if too many requests (429 status)
        - Returns "Error: Invalid API authentication" if API key is invalid (401 status)
        - Returns formatted list of results or "No users found matching 'query'"
    '''
```

## Exemplo Completo

Veja abaixo um exemplo completo de servidor MCP em Python:

```python
#!/usr/bin/env python3
'''
MCP Server for Example Service.

This server provides tools to interact with Example API, including user search,
project management, and data export capabilities.
'''

from typing import Optional, List, Dict, Any
from enum import Enum
import httpx
from pydantic import BaseModel, Field, field_validator, ConfigDict
from mcp.server.fastmcp import FastMCP

# Initialize the MCP server
mcp = FastMCP("example_mcp")

# Constants
API_BASE_URL = "https://api.example.com/v1"
CHARACTER_LIMIT = 25000  # Maximum response size in characters

# Enums
class ResponseFormat(str, Enum):
    '''Output format for tool responses.'''
    MARKDOWN = "markdown"
    JSON = "json"

# Pydantic Models for Input Validation
class UserSearchInput(BaseModel):
    '''Input model for user search operations.'''
    model_config = ConfigDict(
        str_strip_whitespace=True,
        validate_assignment=True
    )

    query: str = Field(..., description="Search string to match against names/emails", min_length=2, max_length=200)
    limit: Optional[int] = Field(default=20, description="Maximum results to return", ge=1, le=100)
    offset: Optional[int] = Field(default=0, description="Number of results to skip for pagination", ge=0)
    response_format: ResponseFormat = Field(default=ResponseFormat.MARKDOWN, description="Output format")

    @field_validator('query')
    @classmethod
    def validate_query(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("Query cannot be empty or whitespace only")
        return v.strip()

# Shared utility functions
async def _make_api_request(endpoint: str, method: str = "GET", **kwargs) -> dict:
    '''Reusable function for all API calls.'''
    async with httpx.AsyncClient() as client:
        response = await client.request(
            method,
            f"{API_BASE_URL}/{endpoint}",
            timeout=30.0,
            **kwargs
        )
        response.raise_for_status()
        return response.json()

def _handle_api_error(e: Exception) -> str:
    '''Consistent error formatting across all tools.'''
    if isinstance(e, httpx.HTTPStatusError):
        if e.response.status_code == 404:
            return "Error: Resource not found. Please check the ID is correct."
        elif e.response.status_code == 403:
            return "Error: Permission denied. You don't have access to this resource."
        elif e.response.status_code == 429:
            return "Error: Rate limit exceeded. Please wait before making more requests."
        return f"Error: API request failed with status {e.response.status_code}"
    elif isinstance(e, httpx.TimeoutException):
        return "Error: Request timed out. Please try again."
    return f"Error: Unexpected error occurred: {type(e).__name__}"

# Tool definitions
@mcp.tool(
    name="example_search_users",
    annotations={
        "title": "Search Example Users",
        "readOnlyHint": True,
        "destructiveHint": False,
        "idempotentHint": True,
        "openWorldHint": True
    }
)
async def example_search_users(params: UserSearchInput) -> str:
    '''Search for users in the Example system by name, email, or team.

    [Full docstring as shown above]
    '''
    try:
        # Make API request using validated parameters
        data = await _make_api_request(
            "users/search",
            params={
                "q": params.query,
                "limit": params.limit,
                "offset": params.offset
            }
        )

        users = data.get("users", [])
        total = data.get("total", 0)

        if not users:
            return f"No users found matching '{params.query}'"

        # Format response based on requested format
        if params.response_format == ResponseFormat.MARKDOWN:
            lines = [f"# User Search Results: '{params.query}'", ""]
            lines.append(f"Found {total} users (showing {len(users)})")
            lines.append("")

            for user in users:
                lines.append(f"## {user['name']} ({user['id']})")
                lines.append(f"- **Email**: {user['email']}")
                if user.get('team'):
                    lines.append(f"- **Team**: {user['team']}")
                lines.append("")

            return "\n".join(lines)

        else:
            # Machine-readable JSON format
            import json
            response = {
                "total": total,
                "count": len(users),
                "offset": params.offset,
                "users": users
            }
            return json.dumps(response, indent=2)

    except Exception as e:
        return _handle_api_error(e)

if __name__ == "__main__":
    mcp.run()
```

---

## Recursos Avançados do FastMCP

### Injeção do Parâmetro Context

O FastMCP pode injetar automaticamente um parâmetro `Context` nas tools para capacidades avançadas como logging, relatório de progresso, leitura de resources e interação com o usuário:

```python
from mcp.server.fastmcp import FastMCP, Context

mcp = FastMCP("example_mcp")

@mcp.tool()
async def advanced_search(query: str, ctx: Context) -> str:
    '''Advanced tool with context access for logging and progress.'''

    # Report progress for long operations
    await ctx.report_progress(0.25, "Starting search...")

    # Log information for debugging
    await ctx.log_info("Processing query", {"query": query, "timestamp": datetime.now()})

    # Perform search
    results = await search_api(query)
    await ctx.report_progress(0.75, "Formatting results...")

    # Access server configuration
    server_name = ctx.fastmcp.name

    return format_results(results)

@mcp.tool()
async def interactive_tool(resource_id: str, ctx: Context) -> str:
    '''Tool that can request additional input from users.'''

    # Request sensitive information when needed
    api_key = await ctx.elicit(
        prompt="Please provide your API key:",
        input_type="password"
    )

    # Use the provided key
    return await api_call(resource_id, api_key)
```

**Capacidades do Context:**
- `ctx.report_progress(progress, message)` - Relata progresso para operações longas
- `ctx.log_info(message, data)` / `ctx.log_error()` / `ctx.log_debug()` - Logging
- `ctx.elicit(prompt, input_type)` - Solicita entrada dos usuários
- `ctx.fastmcp.name` - Acessa a configuração do servidor
- `ctx.read_resource(uri)` - Lê resources MCP

### Registro de Resources

Exponha dados como resources para acesso eficiente baseado em template:

```python
@mcp.resource("file://documents/{name}")
async def get_document(name: str) -> str:
    '''Expose documents as MCP resources.

    Resources are useful for static or semi-static data that doesn't
    require complex parameters. They use URI templates for flexible access.
    '''
    document_path = f"./docs/{name}"
    with open(document_path, "r") as f:
        return f.read()

@mcp.resource("config://settings/{key}")
async def get_setting(key: str, ctx: Context) -> str:
    '''Expose configuration as resources with context.'''
    settings = await load_settings()
    return json.dumps(settings.get(key, {}))
```

**Quando usar Resources vs Tools:**
- **Resources**: Para acesso a dados com parâmetros simples (templates de URI)
- **Tools**: Para operações complexas com validação e lógica de negócio

### Tipos de Saída Estruturada

O FastMCP suporta múltiplos tipos de retorno além de strings:

```python
from typing import TypedDict
from dataclasses import dataclass
from pydantic import BaseModel

# TypedDict for structured returns
class UserData(TypedDict):
    id: str
    name: str
    email: str

@mcp.tool()
async def get_user_typed(user_id: str) -> UserData:
    '''Returns structured data - FastMCP handles serialization.'''
    return {"id": user_id, "name": "John Doe", "email": "john@example.com"}

# Pydantic models for complex validation
class DetailedUser(BaseModel):
    id: str
    name: str
    email: str
    created_at: datetime
    metadata: Dict[str, Any]

@mcp.tool()
async def get_user_detailed(user_id: str) -> DetailedUser:
    '''Returns Pydantic model - automatically generates schema.'''
    user = await fetch_user(user_id)
    return DetailedUser(**user)
```

### Gerenciamento de Lifespan

Inicialize recursos que persistem entre requisições:

```python
from contextlib import asynccontextmanager

@asynccontextmanager
async def app_lifespan():
    '''Manage resources that live for the server's lifetime.'''
    # Initialize connections, load config, etc.
    db = await connect_to_database()
    config = load_configuration()

    # Make available to all tools
    yield {"db": db, "config": config}

    # Cleanup on shutdown
    await db.close()

mcp = FastMCP("example_mcp", lifespan=app_lifespan)

@mcp.tool()
async def query_data(query: str, ctx: Context) -> str:
    '''Access lifespan resources through context.'''
    db = ctx.request_context.lifespan_state["db"]
    results = await db.query(query)
    return format_results(results)
```

### Múltiplas Opções de Transporte

O FastMCP suporta diferentes mecanismos de transporte:

```python
# Default: Stdio transport (for CLI tools)
if __name__ == "__main__":
    mcp.run()

# HTTP transport (for web services)
if __name__ == "__main__":
    mcp.run(transport="streamable_http", port=8000)

# SSE transport (for real-time updates)
if __name__ == "__main__":
    mcp.run(transport="sse", port=8000)
```

**Seleção de transporte:**
- **Stdio**: Ferramentas de linha de comando, integração como subprocesso
- **HTTP**: Serviços web, acesso remoto, múltiplos clientes
- **SSE**: Atualizações em tempo real, notificações push

---

## Boas Práticas de Código

### Composabilidade e Reusabilidade de Código

Sua implementação DEVE priorizar composabilidade e reuso de código:

1. **Extraia Funcionalidades Comuns**:
   - Crie funções helper reutilizáveis para operações usadas em múltiplas tools
   - Construa clientes de API compartilhados para requisições HTTP em vez de duplicar código
   - Centralize a lógica de tratamento de erros em funções utilitárias
   - Extraia lógica de negócio em funções dedicadas que possam ser compostas
   - Extraia funcionalidade compartilhada de seleção e formatação de campos markdown ou JSON

2. **Evite Duplicação**:
   - NUNCA copie e cole código similar entre tools
   - Se você se pegar escrevendo lógica similar duas vezes, extraia-a em uma função
   - Operações comuns como paginação, filtragem, seleção de campos e formatação devem ser compartilhadas
   - A lógica de autenticação/autorização deve ser centralizada

### Boas Práticas Específicas de Python

1. **Use Type Hints**: Sempre inclua anotações de tipo para parâmetros de função e valores de retorno
2. **Modelos Pydantic**: Defina modelos Pydantic claros para toda validação de entrada
3. **Evite Validação Manual**: Deixe o Pydantic tratar a validação de entrada com restrições
4. **Imports Adequados**: Agrupe imports (biblioteca padrão, terceiros, locais)
5. **Tratamento de Erros**: Use tipos de exceção específicos (httpx.HTTPStatusError, não a Exception genérica)
6. **Context Managers Assíncronos**: Use `async with` para recursos que precisam de limpeza
7. **Constantes**: Defina constantes em nível de módulo em UPPER_CASE

## Checklist de Qualidade

Antes de finalizar sua implementação de servidor MCP em Python, garanta:

### Design Estratégico
- [ ] As tools permitem fluxos de trabalho completos, não apenas wrappers de endpoints de API
- [ ] Os nomes das tools refletem subdivisões naturais de tarefas
- [ ] Os formatos de resposta otimizam a eficiência de contexto do agente
- [ ] Identificadores legíveis por humanos usados onde apropriado
- [ ] As mensagens de erro guiam os agentes em direção ao uso correto

### Qualidade da Implementação
- [ ] IMPLEMENTAÇÃO FOCADA: As tools mais importantes e valiosas implementadas
- [ ] Todas as tools têm nomes descritivos e documentação
- [ ] Os tipos de retorno são consistentes entre operações similares
- [ ] O tratamento de erros está implementado para todas as chamadas externas
- [ ] O nome do servidor segue o formato: `{service}_mcp`
- [ ] Todas as operações de rede usam async/await
- [ ] Funcionalidades comuns são extraídas em funções reutilizáveis
- [ ] As mensagens de erro são claras, acionáveis e educativas
- [ ] As saídas são adequadamente validadas e formatadas

### Configuração da Tool
- [ ] Todas as tools implementam 'name' e 'annotations' no decorator
- [ ] Annotations corretamente definidas (readOnlyHint, destructiveHint, idempotentHint, openWorldHint)
- [ ] Todas as tools usam Pydantic BaseModel para validação de entrada com definições Field()
- [ ] Todos os Fields do Pydantic têm tipos e descrições explícitas com restrições
- [ ] Todas as tools têm docstrings abrangentes com tipos de entrada/saída explícitos
- [ ] As docstrings incluem a estrutura completa de schema para retornos dict/JSON
- [ ] Os modelos Pydantic tratam a validação de entrada (sem necessidade de validação manual)

### Recursos Avançados (onde aplicável)
- [ ] Injeção de Context usada para logging, progresso ou elicitation
- [ ] Resources registrados para endpoints de dados apropriados
- [ ] Gerenciamento de lifespan implementado para conexões persistentes
- [ ] Tipos de saída estruturada usados (TypedDict, modelos Pydantic)
- [ ] Transporte apropriado configurado (stdio, HTTP, SSE)

### Qualidade de Código
- [ ] O arquivo inclui imports adequados, incluindo os imports do Pydantic
- [ ] A paginação está corretamente implementada onde aplicável
- [ ] Respostas grandes verificam o CHARACTER_LIMIT e truncam com mensagens claras
- [ ] Opções de filtragem são fornecidas para conjuntos de resultados potencialmente grandes
- [ ] Todas as funções async estão adequadamente definidas com `async def`
- [ ] O uso do cliente HTTP segue padrões async com context managers adequados
- [ ] Type hints são usados por todo o código
- [ ] Constantes são definidas em nível de módulo em UPPER_CASE

### Testes
- [ ] O servidor roda com sucesso: `python your_server.py --help`
- [ ] Todos os imports resolvem corretamente
- [ ] Chamadas de tool de exemplo funcionam conforme esperado
- [ ] Cenários de erro tratados graciosamente
