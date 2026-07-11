---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.claude/skills/mcp-builder/reference/evaluation|evaluation]]"
  - "[[Prometeu/.claude/skills/mcp-builder/reference/mcp_best_practices|mcp_best_practices]]"
  - "[[Prometeu/.claude/skills/mcp-builder/reference/python_mcp_server|python_mcp_server]]"
---

# Guia de Implementação de Servidores MCP em Node/TypeScript

## Visão Geral

Este documento fornece boas práticas e exemplos específicos de Node/TypeScript para implementar servidores MCP usando o MCP TypeScript SDK. Cobre estrutura de projeto, configuração do servidor, padrões de registro de tools, validação de entrada com Zod, tratamento de erros e exemplos completos e funcionais.

---

## Referência Rápida

### Imports Principais
```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import axios, { AxiosError } from "axios";
```

### Inicialização do Servidor
```typescript
const server = new McpServer({
  name: "service-mcp-server",
  version: "1.0.0"
});
```

### Padrão de Registro de Tools
```typescript
server.registerTool("tool_name", {...config}, async (params) => {
  // Implementation
});
```

---

## MCP TypeScript SDK

O MCP TypeScript SDK oficial fornece:
- A classe `McpServer` para inicialização do servidor
- O método `registerTool` para registro de tools
- Integração com schema Zod para validação de entrada em tempo de execução
- Implementações de handler de tool com segurança de tipos

Veja a documentação do MCP SDK nas referências para detalhes completos.

## Convenção de Nomenclatura de Servidores

Servidores MCP em Node/TypeScript devem seguir este padrão de nomenclatura:
- **Formato**: `{service}-mcp-server` (minúsculas com hífens)
- **Exemplos**: `github-mcp-server`, `jira-mcp-server`, `stripe-mcp-server`

O nome deve ser:
- Geral (não atrelado a funcionalidades específicas)
- Descritivo do serviço/API que está sendo integrado
- Fácil de inferir a partir da descrição da tarefa
- Sem números de versão ou datas

## Estrutura do Projeto

Crie a seguinte estrutura para servidores MCP em Node/TypeScript:

```
{service}-mcp-server/
├── package.json
├── tsconfig.json
├── README.md
├── src/
│   ├── index.ts          # Main entry point with McpServer initialization
│   ├── types.ts          # TypeScript type definitions and interfaces
│   ├── tools/            # Tool implementations (one file per domain)
│   ├── services/         # API clients and shared utilities
│   ├── schemas/          # Zod validation schemas
│   └── constants.ts      # Shared constants (API_URL, CHARACTER_LIMIT, etc.)
└── dist/                 # Built JavaScript files (entry point: dist/index.js)
```

## Implementação de Tools

### Nomenclatura de Tools

Use snake_case para nomes de tools (ex: "search_users", "create_project", "get_channel_info") com nomes claros e orientados a ação.

**Evite Conflitos de Nomenclatura**: Inclua o contexto do serviço para prevenir sobreposições:
- Use "slack_send_message" em vez de apenas "send_message"
- Use "github_create_issue" em vez de apenas "create_issue"
- Use "asana_list_tasks" em vez de apenas "list_tasks"

### Estrutura da Tool

Tools são registradas usando o método `registerTool` com os seguintes requisitos:
- Use schemas Zod para validação de entrada e segurança de tipos em tempo de execução
- O campo `description` deve ser fornecido explicitamente - comentários JSDoc NÃO são extraídos automaticamente
- Forneça explicitamente `title`, `description`, `inputSchema` e `annotations`
- O `inputSchema` deve ser um objeto de schema Zod (não um JSON schema)
- Tipifique todos os parâmetros e valores de retorno explicitamente

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

const server = new McpServer({
  name: "example-mcp",
  version: "1.0.0"
});

// Zod schema for input validation
const UserSearchInputSchema = z.object({
  query: z.string()
    .min(2, "Query must be at least 2 characters")
    .max(200, "Query must not exceed 200 characters")
    .describe("Search string to match against names/emails"),
  limit: z.number()
    .int()
    .min(1)
    .max(100)
    .default(20)
    .describe("Maximum results to return"),
  offset: z.number()
    .int()
    .min(0)
    .default(0)
    .describe("Number of results to skip for pagination"),
  response_format: z.nativeEnum(ResponseFormat)
    .default(ResponseFormat.MARKDOWN)
    .describe("Output format: 'markdown' for human-readable or 'json' for machine-readable")
}).strict();

// Type definition from Zod schema
type UserSearchInput = z.infer<typeof UserSearchInputSchema>;

server.registerTool(
  "example_search_users",
  {
    title: "Search Example Users",
    description: `Search for users in the Example system by name, email, or team.

This tool searches across all user profiles in the Example platform, supporting partial matches and various search filters. It does NOT create or modify users, only searches existing ones.

Args:
  - query (string): Search string to match against names/emails
  - limit (number): Maximum results to return, between 1-100 (default: 20)
  - offset (number): Number of results to skip for pagination (default: 0)
  - response_format ('markdown' | 'json'): Output format (default: 'markdown')

Returns:
  For JSON format: Structured data with schema:
  {
    "total": number,           // Total number of matches found
    "count": number,           // Number of results in this response
    "offset": number,          // Current pagination offset
    "users": [
      {
        "id": string,          // User ID (e.g., "U123456789")
        "name": string,        // Full name (e.g., "John Doe")
        "email": string,       // Email address
        "team": string,        // Team name (optional)
        "active": boolean      // Whether user is active
      }
    ],
    "has_more": boolean,       // Whether more results are available
    "next_offset": number      // Offset for next page (if has_more is true)
  }

Examples:
  - Use when: "Find all marketing team members" -> params with query="team:marketing"
  - Use when: "Search for John's account" -> params with query="john"
  - Don't use when: You need to create a user (use example_create_user instead)

Error Handling:
  - Returns "Error: Rate limit exceeded" if too many requests (429 status)
  - Returns "No users found matching '<query>'" if search returns empty`,
    inputSchema: UserSearchInputSchema,
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true
    }
  },
  async (params: UserSearchInput) => {
    try {
      // Input validation is handled by Zod schema
      // Make API request using validated parameters
      const data = await makeApiRequest<any>(
        "users/search",
        "GET",
        undefined,
        {
          q: params.query,
          limit: params.limit,
          offset: params.offset
        }
      );

      const users = data.users || [];
      const total = data.total || 0;

      if (!users.length) {
        return {
          content: [{
            type: "text",
            text: `No users found matching '${params.query}'`
          }]
        };
      }

      // Format response based on requested format
      let result: string;

      if (params.response_format === ResponseFormat.MARKDOWN) {
        // Human-readable markdown format
        const lines: string[] = [`# User Search Results: '${params.query}'`, ""];
        lines.push(`Found ${total} users (showing ${users.length})`);
        lines.push("");

        for (const user of users) {
          lines.push(`## ${user.name} (${user.id})`);
          lines.push(`- **Email**: ${user.email}`);
          if (user.team) {
            lines.push(`- **Team**: ${user.team}`);
          }
          lines.push("");
        }

        result = lines.join("\n");

      } else {
        // Machine-readable JSON format
        const response: any = {
          total,
          count: users.length,
          offset: params.offset,
          users: users.map((user: any) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            ...(user.team ? { team: user.team } : {}),
            active: user.active ?? true
          }))
        };

        // Add pagination info if there are more results
        if (total > params.offset + users.length) {
          response.has_more = true;
          response.next_offset = params.offset + users.length;
        }

        result = JSON.stringify(response, null, 2);
      }

      return {
        content: [{
          type: "text",
          text: result
        }]
      };
    } catch (error) {
      return {
        content: [{
          type: "text",
          text: handleApiError(error)
        }]
      };
    }
  }
);
```

## Schemas Zod para Validação de Entrada

O Zod fornece validação de tipos em tempo de execução:

```typescript
import { z } from "zod";

// Basic schema with validation
const CreateUserSchema = z.object({
  name: z.string()
    .min(1, "Name is required")
    .max(100, "Name must not exceed 100 characters"),
  email: z.string()
    .email("Invalid email format"),
  age: z.number()
    .int("Age must be a whole number")
    .min(0, "Age cannot be negative")
    .max(150, "Age cannot be greater than 150")
}).strict();  // Use .strict() to forbid extra fields

// Enums
enum ResponseFormat {
  MARKDOWN = "markdown",
  JSON = "json"
}

const SearchSchema = z.object({
  response_format: z.nativeEnum(ResponseFormat)
    .default(ResponseFormat.MARKDOWN)
    .describe("Output format")
});

// Optional fields with defaults
const PaginationSchema = z.object({
  limit: z.number()
    .int()
    .min(1)
    .max(100)
    .default(20)
    .describe("Maximum results to return"),
  offset: z.number()
    .int()
    .min(0)
    .default(0)
    .describe("Number of results to skip")
});
```

## Opções de Formato de Resposta

Suporte múltiplos formatos de saída para flexibilidade:

```typescript
enum ResponseFormat {
  MARKDOWN = "markdown",
  JSON = "json"
}

const inputSchema = z.object({
  query: z.string(),
  response_format: z.nativeEnum(ResponseFormat)
    .default(ResponseFormat.MARKDOWN)
    .describe("Output format: 'markdown' for human-readable or 'json' for machine-readable")
});
```

**Formato Markdown**:
- Use cabeçalhos, listas e formatação para clareza
- Converta timestamps para formato legível por humanos
- Mostre nomes de exibição com IDs entre parênteses
- Omita metadados verbosos
- Agrupe informações relacionadas de forma lógica

**Formato JSON**:
- Retorne dados completos e estruturados, adequados para processamento programático
- Inclua todos os campos e metadados disponíveis
- Use nomes e tipos de campo consistentes

## Implementação de Paginação

Para tools que listam recursos:

```typescript
const ListSchema = z.object({
  limit: z.number().int().min(1).max(100).default(20),
  offset: z.number().int().min(0).default(0)
});

async function listItems(params: z.infer<typeof ListSchema>) {
  const data = await apiRequest(params.limit, params.offset);

  const response = {
    total: data.total,
    count: data.items.length,
    offset: params.offset,
    items: data.items,
    has_more: data.total > params.offset + data.items.length,
    next_offset: data.total > params.offset + data.items.length
      ? params.offset + data.items.length
      : undefined
  };

  return JSON.stringify(response, null, 2);
}
```

## Limites de Caracteres e Truncamento

Adicione uma constante CHARACTER_LIMIT para evitar respostas sobrecarregadas:

```typescript
// At module level in constants.ts
export const CHARACTER_LIMIT = 25000;  // Maximum response size in characters

async function searchTool(params: SearchInput) {
  let result = generateResponse(data);

  // Check character limit and truncate if needed
  if (result.length > CHARACTER_LIMIT) {
    const truncatedData = data.slice(0, Math.max(1, data.length / 2));
    response.data = truncatedData;
    response.truncated = true;
    response.truncation_message =
      `Response truncated from ${data.length} to ${truncatedData.length} items. ` +
      `Use 'offset' parameter or add filters to see more results.`;
    result = JSON.stringify(response, null, 2);
  }

  return result;
}
```

## Tratamento de Erros

Forneça mensagens de erro claras e acionáveis:

```typescript
import axios, { AxiosError } from "axios";

function handleApiError(error: unknown): string {
  if (error instanceof AxiosError) {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          return "Error: Resource not found. Please check the ID is correct.";
        case 403:
          return "Error: Permission denied. You don't have access to this resource.";
        case 429:
          return "Error: Rate limit exceeded. Please wait before making more requests.";
        default:
          return `Error: API request failed with status ${error.response.status}`;
      }
    } else if (error.code === "ECONNABORTED") {
      return "Error: Request timed out. Please try again.";
    }
  }
  return `Error: Unexpected error occurred: ${error instanceof Error ? error.message : String(error)}`;
}
```

## Utilitários Compartilhados

Extraia funcionalidades comuns em funções reutilizáveis:

```typescript
// Shared API request function
async function makeApiRequest<T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data?: any,
  params?: any
): Promise<T> {
  try {
    const response = await axios({
      method,
      url: `${API_BASE_URL}/${endpoint}`,
      data,
      params,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
```

## Boas Práticas de Async/Await

Sempre use async/await para requisições de rede e operações de E/S:

```typescript
// Good: Async network request
async function fetchData(resourceId: string): Promise<ResourceData> {
  const response = await axios.get(`${API_URL}/resource/${resourceId}`);
  return response.data;
}

// Bad: Promise chains
function fetchData(resourceId: string): Promise<ResourceData> {
  return axios.get(`${API_URL}/resource/${resourceId}`)
    .then(response => response.data);  // Harder to read and maintain
}
```

## Boas Práticas de TypeScript

1. **Use TypeScript Strict**: Habilite o modo strict no tsconfig.json
2. **Defina Interfaces**: Crie definições de interface claras para todas as estruturas de dados
3. **Evite `any`**: Use tipos apropriados ou `unknown` em vez de `any`
4. **Zod para Validação em Tempo de Execução**: Use schemas Zod para validar dados externos
5. **Type Guards**: Crie funções type guard para verificação de tipos complexa
6. **Tratamento de Erros**: Sempre use try-catch com verificação de tipo de erro adequada
7. **Segurança contra Null**: Use optional chaining (`?.`) e nullish coalescing (`??`)

```typescript
// Good: Type-safe with Zod and interfaces
interface UserResponse {
  id: string;
  name: string;
  email: string;
  team?: string;
  active: boolean;
}

const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  team: z.string().optional(),
  active: z.boolean()
});

type User = z.infer<typeof UserSchema>;

async function getUser(id: string): Promise<User> {
  const data = await apiCall(`/users/${id}`);
  return UserSchema.parse(data);  // Runtime validation
}

// Bad: Using any
async function getUser(id: string): Promise<any> {
  return await apiCall(`/users/${id}`);  // No type safety
}
```

## Configuração do Pacote

### package.json

```json
{
  "name": "{service}-mcp-server",
  "version": "1.0.0",
  "description": "MCP server for {Service} API integration",
  "type": "module",
  "main": "dist/index.js",
  "scripts": {
    "start": "node dist/index.js",
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "clean": "rm -rf dist"
  },
  "engines": {
    "node": ">=18"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.6.1",
    "axios": "^1.7.9",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/node": "^22.10.0",
    "tsx": "^4.19.2",
    "typescript": "^5.7.2"
  }
}
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16",
    "moduleResolution": "Node16",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "allowSyntheticDefaultImports": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## Exemplo Completo

```typescript
#!/usr/bin/env node
/**
 * MCP Server for Example Service.
 *
 * This server provides tools to interact with Example API, including user search,
 * project management, and data export capabilities.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import axios, { AxiosError } from "axios";

// Constants
const API_BASE_URL = "https://api.example.com/v1";
const CHARACTER_LIMIT = 25000;

// Enums
enum ResponseFormat {
  MARKDOWN = "markdown",
  JSON = "json"
}

// Zod schemas
const UserSearchInputSchema = z.object({
  query: z.string()
    .min(2, "Query must be at least 2 characters")
    .max(200, "Query must not exceed 200 characters")
    .describe("Search string to match against names/emails"),
  limit: z.number()
    .int()
    .min(1)
    .max(100)
    .default(20)
    .describe("Maximum results to return"),
  offset: z.number()
    .int()
    .min(0)
    .default(0)
    .describe("Number of results to skip for pagination"),
  response_format: z.nativeEnum(ResponseFormat)
    .default(ResponseFormat.MARKDOWN)
    .describe("Output format: 'markdown' for human-readable or 'json' for machine-readable")
}).strict();

type UserSearchInput = z.infer<typeof UserSearchInputSchema>;

// Shared utility functions
async function makeApiRequest<T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data?: any,
  params?: any
): Promise<T> {
  try {
    const response = await axios({
      method,
      url: `${API_BASE_URL}/${endpoint}`,
      data,
      params,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

function handleApiError(error: unknown): string {
  if (error instanceof AxiosError) {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          return "Error: Resource not found. Please check the ID is correct.";
        case 403:
          return "Error: Permission denied. You don't have access to this resource.";
        case 429:
          return "Error: Rate limit exceeded. Please wait before making more requests.";
        default:
          return `Error: API request failed with status ${error.response.status}`;
      }
    } else if (error.code === "ECONNABORTED") {
      return "Error: Request timed out. Please try again.";
    }
  }
  return `Error: Unexpected error occurred: ${error instanceof Error ? error.message : String(error)}`;
}

// Create MCP server instance
const server = new McpServer({
  name: "example-mcp",
  version: "1.0.0"
});

// Register tools
server.registerTool(
  "example_search_users",
  {
    title: "Search Example Users",
    description: `[Full description as shown above]`,
    inputSchema: UserSearchInputSchema,
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true
    }
  },
  async (params: UserSearchInput) => {
    // Implementation as shown above
  }
);

// Main function
async function main() {
  // Verify environment variables if needed
  if (!process.env.EXAMPLE_API_KEY) {
    console.error("ERROR: EXAMPLE_API_KEY environment variable is required");
    process.exit(1);
  }

  // Create transport
  const transport = new StdioServerTransport();

  // Connect server to transport
  await server.connect(transport);

  console.error("Example MCP server running via stdio");
}

// Run the server
main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
```

---

## Recursos Avançados do MCP

### Registro de Resources

Exponha dados como resources para acesso eficiente baseado em URI:

```typescript
import { ResourceTemplate } from "@modelcontextprotocol/sdk/types.js";

// Register a resource with URI template
server.registerResource(
  {
    uri: "file://documents/{name}",
    name: "Document Resource",
    description: "Access documents by name",
    mimeType: "text/plain"
  },
  async (uri: string) => {
    // Extract parameter from URI
    const match = uri.match(/^file:\/\/documents\/(.+)$/);
    if (!match) {
      throw new Error("Invalid URI format");
    }

    const documentName = match[1];
    const content = await loadDocument(documentName);

    return {
      contents: [{
        uri,
        mimeType: "text/plain",
        text: content
      }]
    };
  }
);

// List available resources dynamically
server.registerResourceList(async () => {
  const documents = await getAvailableDocuments();
  return {
    resources: documents.map(doc => ({
      uri: `file://documents/${doc.name}`,
      name: doc.name,
      mimeType: "text/plain",
      description: doc.description
    }))
  };
});
```

**Quando usar Resources vs Tools:**
- **Resources**: Para acesso a dados com parâmetros simples baseados em URI
- **Tools**: Para operações complexas que exigem validação e lógica de negócio
- **Resources**: Quando os dados são relativamente estáticos ou baseados em template
- **Tools**: Quando as operações têm efeitos colaterais ou fluxos de trabalho complexos

### Múltiplas Opções de Transporte

O TypeScript SDK suporta diferentes mecanismos de transporte:

```typescript
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";

// Stdio transport (default - for CLI tools)
const stdioTransport = new StdioServerTransport();
await server.connect(stdioTransport);

// SSE transport (for real-time web updates)
const sseTransport = new SSEServerTransport("/message", response);
await server.connect(sseTransport);

// HTTP transport (for web services)
// Configure based on your HTTP framework integration
```

**Guia de seleção de transporte:**
- **Stdio**: Ferramentas de linha de comando, integração como subprocesso, desenvolvimento local
- **HTTP**: Serviços web, acesso remoto, múltiplos clientes simultâneos
- **SSE**: Atualizações em tempo real, notificações server-push, dashboards web

### Suporte a Notificações

Notifique os clientes quando o estado do servidor mudar:

```typescript
// Notify when tools list changes
server.notification({
  method: "notifications/tools/list_changed"
});

// Notify when resources change
server.notification({
  method: "notifications/resources/list_changed"
});
```

Use notificações com moderação - apenas quando as capacidades do servidor realmente mudarem.

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

## Build e Execução

Sempre faça o build do seu código TypeScript antes de executar:

```bash
# Build the project
npm run build

# Run the server
npm start

# Development with auto-reload
npm run dev
```

Sempre garanta que `npm run build` conclua com sucesso antes de considerar a implementação completa.

## Checklist de Qualidade

Antes de finalizar sua implementação de servidor MCP em Node/TypeScript, garanta:

### Design Estratégico
- [ ] As tools permitem fluxos de trabalho completos, não apenas wrappers de endpoints de API
- [ ] Os nomes das tools refletem subdivisões naturais de tarefas
- [ ] Os formatos de resposta otimizam a eficiência de contexto do agente
- [ ] Identificadores legíveis por humanos usados onde apropriado
- [ ] As mensagens de erro guiam os agentes em direção ao uso correto

### Qualidade da Implementação
- [ ] IMPLEMENTAÇÃO FOCADA: As tools mais importantes e valiosas implementadas
- [ ] Todas as tools registradas usando `registerTool` com configuração completa
- [ ] Todas as tools incluem `title`, `description`, `inputSchema` e `annotations`
- [ ] Annotations corretamente definidas (readOnlyHint, destructiveHint, idempotentHint, openWorldHint)
- [ ] Todas as tools usam schemas Zod para validação de entrada em tempo de execução com aplicação de `.strict()`
- [ ] Todos os schemas Zod têm restrições adequadas e mensagens de erro descritivas
- [ ] Todas as tools têm descrições abrangentes com tipos de entrada/saída explícitos
- [ ] As descrições incluem exemplos de valores de retorno e documentação completa de schema
- [ ] As mensagens de erro são claras, acionáveis e educativas

### Qualidade do TypeScript
- [ ] Interfaces TypeScript definidas para todas as estruturas de dados
- [ ] TypeScript strict habilitado no tsconfig.json
- [ ] Nenhum uso do tipo `any` - use `unknown` ou tipos apropriados
- [ ] Todas as funções async têm tipos de retorno Promise<T> explícitos
- [ ] O tratamento de erros usa type guards adequados (ex: `axios.isAxiosError`, `z.ZodError`)

### Recursos Avançados (onde aplicável)
- [ ] Resources registrados para endpoints de dados apropriados
- [ ] Transporte apropriado configurado (stdio, HTTP, SSE)
- [ ] Notificações implementadas para capacidades dinâmicas do servidor
- [ ] Type-safe com as interfaces do SDK

### Configuração do Projeto
- [ ] O package.json inclui todas as dependências necessárias
- [ ] O script de build produz JavaScript funcional no diretório dist/
- [ ] O entry point principal está corretamente configurado como dist/index.js
- [ ] O nome do servidor segue o formato: `{service}-mcp-server`
- [ ] O tsconfig.json está corretamente configurado com modo strict

### Qualidade de Código
- [ ] A paginação está corretamente implementada onde aplicável
- [ ] Respostas grandes verificam a constante CHARACTER_LIMIT e truncam com mensagens claras
- [ ] Opções de filtragem são fornecidas para conjuntos de resultados potencialmente grandes
- [ ] Todas as operações de rede tratam timeouts e erros de conexão graciosamente
- [ ] Funcionalidades comuns são extraídas em funções reutilizáveis
- [ ] Os tipos de retorno são consistentes entre operações similares

### Testes e Build
- [ ] `npm run build` conclui com sucesso sem erros
- [ ] dist/index.js criado e executável
- [ ] O servidor roda: `node dist/index.js --help`
- [ ] Todos os imports resolvem corretamente
- [ ] Chamadas de tool de exemplo funcionam conforme esperado
