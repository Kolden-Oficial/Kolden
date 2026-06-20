# Boas Práticas e Diretrizes de Desenvolvimento de Servidores MCP

## Visão Geral

Este documento compila boas práticas e diretrizes essenciais para construir servidores MCP (Model Context Protocol). Cobre convenções de nomenclatura, design de tools, formatos de resposta, paginação, tratamento de erros, segurança e requisitos de conformidade.

---

## Referência Rápida

### Nomenclatura de Servidores
- **Python**: `{service}_mcp` (ex: `slack_mcp`)
- **Node/TypeScript**: `{service}-mcp-server` (ex: `slack-mcp-server`)

### Nomenclatura de Tools
- Use snake_case com prefixo de serviço
- Formato: `{service}_{action}_{resource}`
- Exemplo: `slack_send_message`, `github_create_issue`

### Formatos de Resposta
- Suporte tanto o formato JSON quanto o Markdown
- JSON para processamento programático
- Markdown para legibilidade humana

### Paginação
- Sempre respeite o parâmetro `limit`
- Retorne `has_more`, `next_offset`, `total_count`
- Use como padrão 20-50 itens

### Limites de Caracteres
- Defina a constante CHARACTER_LIMIT (tipicamente 25.000)
- Trunque graciosamente com mensagens claras
- Forneça orientação sobre filtragem

---

## Índice
1. Convenções de Nomenclatura de Servidores
2. Nomenclatura e Design de Tools
3. Diretrizes de Formato de Resposta
4. Boas Práticas de Paginação
5. Limites de Caracteres e Truncamento
6. Boas Práticas de Desenvolvimento de Tools
7. Boas Práticas de Transporte
8. Requisitos de Testes
9. Boas Práticas de OAuth e Segurança
10. Boas Práticas de Gerenciamento de Recursos
11. Boas Práticas de Gerenciamento de Prompts
12. Padrões de Tratamento de Erros
13. Requisitos de Documentação
14. Conformidade e Monitoramento

---

## 1. Convenções de Nomenclatura de Servidores

Siga estes padrões de nomenclatura padronizados para servidores MCP:

**Python**: Use o formato `{service}_mcp` (minúsculas com underscores)
- Exemplos: `slack_mcp`, `github_mcp`, `jira_mcp`, `stripe_mcp`

**Node/TypeScript**: Use o formato `{service}-mcp-server` (minúsculas com hífens)
- Exemplos: `slack-mcp-server`, `github-mcp-server`, `jira-mcp-server`

O nome deve ser:
- Geral (não atrelado a funcionalidades específicas)
- Descritivo do serviço/API que está sendo integrado
- Fácil de inferir a partir da descrição da tarefa
- Sem números de versão ou datas

---

## 2. Nomenclatura e Design de Tools

### Boas Práticas de Nomenclatura de Tools

1. **Use snake_case**: `search_users`, `create_project`, `get_channel_info`
2. **Inclua prefixo de serviço**: Antecipe que seu servidor MCP pode ser usado junto a outros servidores MCP
   - Use `slack_send_message` em vez de apenas `send_message`
   - Use `github_create_issue` em vez de apenas `create_issue`
   - Use `asana_list_tasks` em vez de apenas `list_tasks`
3. **Seja orientado a ação**: Comece com verbos (get, list, search, create, etc.)
4. **Seja específico**: Evite nomes genéricos que possam conflitar com outros servidores
5. **Mantenha consistência**: Use padrões de nomenclatura consistentes dentro do seu servidor

### Diretrizes de Design de Tools

- As descrições das tools devem descrever a funcionalidade de forma restrita e inequívoca
- As descrições devem corresponder precisamente à funcionalidade real
- Não devem criar confusão com outros servidores MCP
- Devem fornecer annotations de tool (readOnlyHint, destructiveHint, idempotentHint, openWorldHint)
- Mantenha as operações das tools focadas e atômicas

---

## 3. Diretrizes de Formato de Resposta

Todas as tools que retornam dados devem suportar múltiplos formatos para flexibilidade:

### Formato JSON (`response_format="json"`)
- Dados estruturados legíveis por máquina
- Inclua todos os campos e metadados disponíveis
- Nomes e tipos de campo consistentes
- Adequado para processamento programático
- Use quando LLMs precisarem processar os dados adicionalmente

### Formato Markdown (`response_format="markdown"`, tipicamente o padrão)
- Texto formatado e legível por humanos
- Use cabeçalhos, listas e formatação para clareza
- Converta timestamps para formato legível por humanos (ex: "2024-01-15 10:30:00 UTC" em vez de epoch)
- Mostre nomes de exibição com IDs entre parênteses (ex: "@john.doe (U123456)")
- Omita metadados verbosos (ex: mostre apenas uma URL de imagem de perfil, não todos os tamanhos)
- Agrupe informações relacionadas de forma lógica
- Use ao apresentar informações para usuários

---

## 4. Boas Práticas de Paginação

Para tools que listam recursos:

- **Sempre respeite o parâmetro `limit`**: Nunca carregue todos os resultados quando um limite for especificado
- **Implemente paginação**: Use `offset` ou paginação baseada em cursor
- **Retorne metadados de paginação**: Inclua `has_more`, `next_offset`/`next_cursor`, `total_count`
- **Nunca carregue todos os resultados na memória**: Especialmente importante para grandes conjuntos de dados
- **Use limites padrão razoáveis**: 20-50 itens é típico
- **Inclua informações claras de paginação nas respostas**: Facilite para os LLMs solicitarem mais dados

Exemplo de estrutura de resposta de paginação:
```json
{
  "total": 150,
  "count": 20,
  "offset": 0,
  "items": [...],
  "has_more": true,
  "next_offset": 20
}
```

---

## 5. Limites de Caracteres e Truncamento

Para evitar respostas sobrecarregadas com dados demais:

- **Defina a constante CHARACTER_LIMIT**: Tipicamente 25.000 caracteres em nível de módulo
- **Verifique o tamanho da resposta antes de retornar**: Meça o comprimento final da resposta
- **Trunque graciosamente com indicadores claros**: Avise o LLM que os dados foram truncados
- **Forneça orientação sobre filtragem**: Sugira como usar parâmetros para reduzir resultados
- **Inclua metadados de truncamento**: Mostre o que foi truncado e como obter mais

Exemplo de tratamento de truncamento:
```python
CHARACTER_LIMIT = 25000

if len(result) > CHARACTER_LIMIT:
    truncated_data = data[:max(1, len(data) // 2)]
    response["truncated"] = True
    response["truncation_message"] = (
        f"Response truncated from {len(data)} to {len(truncated_data)} items. "
        f"Use 'offset' parameter or add filters to see more results."
    )
```

---

## 6. Opções de Transporte

Servidores MCP suportam múltiplos mecanismos de transporte para diferentes cenários de implantação:

### Transporte Stdio

**Melhor para**: Ferramentas de linha de comando, integrações locais, execução como subprocesso

**Características**:
- Comunicação por streams de entrada/saída padrão
- Configuração simples, sem necessidade de configuração de rede
- Roda como um subprocesso do cliente
- Ideal para aplicações desktop e ferramentas CLI

**Use quando**:
- Construir ferramentas para ambientes de desenvolvimento local
- Integrar com aplicações desktop (ex: Claude Desktop)
- Criar utilitários de linha de comando
- Cenários de usuário único, sessão única

### Transporte HTTP

**Melhor para**: Serviços web, acesso remoto, cenários multi-cliente

**Características**:
- Padrão requisição-resposta sobre HTTP
- Suporta múltiplos clientes simultâneos
- Pode ser implantado como um serviço web
- Requer configuração de rede e considerações de segurança

**Use quando**:
- Atender múltiplos clientes simultaneamente
- Implantar como um serviço em nuvem
- Integrar com aplicações web
- Necessidade de balanceamento de carga ou escalabilidade

### Transporte Server-Sent Events (SSE)

**Melhor para**: Atualizações em tempo real, notificações push, streaming de dados

**Características**:
- Streaming unidirecional servidor-para-cliente sobre HTTP
- Permite atualizações em tempo real sem polling
- Conexões de longa duração para fluxo contínuo de dados
- Construído sobre infraestrutura HTTP padrão

**Use quando**:
- Clientes precisarem de atualizações de dados em tempo real
- Implementar notificações push
- Fazer streaming de logs ou dados de monitoramento
- Entrega progressiva de resultados para operações longas

### Critérios de Seleção de Transporte

| Critério | Stdio | HTTP | SSE |
|-----------|-------|------|-----|
| **Implantação** | Local | Remoto | Remoto |
| **Clientes** | Único | Múltiplos | Múltiplos |
| **Comunicação** | Bidirecional | Requisição-Resposta | Servidor-Push |
| **Complexidade** | Baixa | Média | Média-Alta |
| **Tempo real** | Não | Não | Sim |

---

## 7. Boas Práticas de Desenvolvimento de Tools

### Diretrizes Gerais
1. Nomes de tools devem ser descritivos e orientados a ação
2. Use validação de parâmetros com JSON schemas detalhados
3. Inclua exemplos nas descrições das tools
4. Implemente tratamento de erros e validação adequados
5. Use relatórios de progresso para operações longas
6. Mantenha as operações das tools focadas e atômicas
7. Documente as estruturas esperadas dos valores de retorno
8. Implemente timeouts adequados
9. Considere rate limiting para operações intensivas em recursos
10. Registre o uso das tools (logging) para depuração e monitoramento

### Considerações de Segurança para Tools

#### Validação de Entrada
- Valide todos os parâmetros contra o schema
- Sanitize caminhos de arquivo e comandos de sistema
- Valide URLs e identificadores externos
- Verifique tamanhos e faixas dos parâmetros
- Previna injeção de comandos

#### Controle de Acesso
- Implemente autenticação onde necessário
- Use verificações de autorização apropriadas
- Audite o uso das tools
- Aplique rate limit às requisições
- Monitore quanto a abuso

#### Tratamento de Erros
- Não exponha erros internos aos clientes
- Registre erros relevantes para segurança
- Trate timeouts apropriadamente
- Limpe recursos após erros
- Valide valores de retorno

### Annotations de Tools
- Forneça annotations readOnlyHint e destructiveHint
- Lembre-se de que annotations são dicas, não garantias de segurança
- Clientes não devem tomar decisões críticas de segurança baseadas somente em annotations

---

## 8. Boas Práticas de Transporte

### Diretrizes Gerais de Transporte
1. Trate o ciclo de vida da conexão adequadamente
2. Implemente tratamento de erros adequado
3. Use valores de timeout apropriados
4. Implemente gerenciamento do estado da conexão
5. Limpe recursos na desconexão

### Boas Práticas de Segurança para Transporte
- Siga as considerações de segurança para ataques de DNS rebinding
- Implemente mecanismos de autenticação adequados
- Valide os formatos das mensagens
- Trate mensagens malformadas graciosamente

### Específico do Transporte Stdio
- Servidores MCP locais NÃO devem fazer log no stdout (interfere no protocolo)
- Use stderr para mensagens de log
- Trate os streams de E/S padrão adequadamente

---

## 9. Requisitos de Testes

Uma estratégia de testes abrangente deve cobrir:

### Testes Funcionais
- Verifique a execução correta com entradas válidas/inválidas

### Testes de Integração
- Teste a interação com sistemas externos

### Testes de Segurança
- Valide autenticação, sanitização de entrada, rate limiting

### Testes de Desempenho
- Verifique o comportamento sob carga, timeouts

### Tratamento de Erros
- Garanta relatórios de erro e limpeza adequados

---

## 10. Boas Práticas de OAuth e Segurança

### Autenticação e Autorização

Servidores MCP que se conectam a serviços externos devem implementar autenticação adequada:

**Implementação de OAuth 2.1:**
- Use OAuth 2.1 seguro com certificados de autoridades reconhecidas
- Valide tokens de acesso antes de processar requisições
- Aceite somente tokens especificamente destinados ao seu servidor
- Rejeite tokens sem claims de audience adequados
- Nunca repasse tokens recebidos de clientes MCP

**Gerenciamento de API Keys:**
- Armazene API keys em variáveis de ambiente, nunca no código
- Valide as chaves na inicialização do servidor
- Forneça mensagens de erro claras quando a autenticação falhar
- Use transmissão segura para credenciais sensíveis

### Validação de Entrada e Segurança

**Sempre valide as entradas:**
- Sanitize caminhos de arquivo para prevenir directory traversal
- Valide URLs e identificadores externos
- Verifique tamanhos e faixas dos parâmetros
- Previna injeção de comandos em chamadas de sistema
- Use validação por schema (Pydantic/Zod) para todas as entradas

**Segurança no tratamento de erros:**
- Não exponha erros internos aos clientes
- Registre erros relevantes para segurança no lado do servidor
- Forneça mensagens de erro úteis, mas que não revelem detalhes
- Limpe recursos após erros

### Privacidade e Proteção de Dados

**Princípios de coleta de dados:**
- Colete apenas os dados estritamente necessários para a funcionalidade
- Não colete dados de conversa supérfluos
- Não colete PII a menos que explicitamente exigido para o propósito da tool
- Forneça informações claras sobre quais dados são acessados

**Transmissão de dados:**
- Não envie dados a servidores fora da sua organização sem divulgação
- Use transmissão segura (HTTPS) para toda comunicação de rede
- Valide certificados para serviços externos

---

## 11. Boas Práticas de Gerenciamento de Recursos

1. Sugira apenas os recursos necessários
2. Use nomes claros e descritivos para roots
3. Trate os limites dos recursos adequadamente
4. Respeite o controle do cliente sobre os recursos
5. Use primitivas controladas pelo modelo (tools) para exposição automática de dados

---

## 12. Boas Práticas de Gerenciamento de Prompts

- Os clientes devem mostrar aos usuários os prompts propostos
- Os usuários devem poder modificar ou rejeitar prompts
- Os clientes devem mostrar aos usuários as conclusões (completions)
- Os usuários devem poder modificar ou rejeitar conclusões
- Considere os custos ao usar sampling

---

## 13. Padrões de Tratamento de Erros

- Use códigos de erro padrão do JSON-RPC
- Reporte erros de tool dentro dos objetos de resultado (não em nível de protocolo)
- Forneça mensagens de erro úteis e específicas
- Não exponha detalhes internos de implementação
- Limpe recursos adequadamente em caso de erros

---

## 14. Requisitos de Documentação

- Forneça documentação clara de todas as tools e capacidades
- Inclua exemplos funcionais (pelo menos 3 por funcionalidade principal)
- Documente considerações de segurança
- Especifique permissões e níveis de acesso necessários
- Documente rate limits e características de desempenho

---

## 15. Conformidade e Monitoramento

- Implemente logging para depuração e monitoramento
- Acompanhe os padrões de uso das tools
- Monitore quanto a potencial abuso
- Mantenha trilhas de auditoria para operações relevantes para segurança
- Esteja preparado para revisões de conformidade contínuas

---

## Resumo

Estas boas práticas representam as diretrizes abrangentes para construir servidores MCP seguros, eficientes e em conformidade que funcionam bem dentro do ecossistema. Os desenvolvedores devem seguir estas diretrizes para garantir que seus servidores MCP atendam aos padrões para inclusão no diretório MCP e proporcionem uma experiência segura e confiável para os usuários.


----------


# Tools

> Permita que LLMs realizem ações por meio do seu servidor

Tools são uma primitiva poderosa no Model Context Protocol (MCP) que permitem que servidores exponham funcionalidade executável aos clientes. Por meio de tools, LLMs podem interagir com sistemas externos, realizar cálculos e tomar ações no mundo real.

<Note>
  Tools são projetadas para serem **controladas pelo modelo**, o que significa que tools são expostas dos servidores aos clientes com a intenção de que o modelo de IA possa invocá-las automaticamente (com um humano no loop para conceder aprovação).
</Note>

## Visão Geral

Tools no MCP permitem que servidores exponham funções executáveis que podem ser invocadas por clientes e usadas por LLMs para realizar ações. Aspectos-chave das tools incluem:

* **Descoberta**: Clientes podem obter uma lista de tools disponíveis enviando uma requisição `tools/list`
* **Invocação**: Tools são chamadas usando a requisição `tools/call`, em que os servidores realizam a operação solicitada e retornam resultados
* **Flexibilidade**: Tools podem variar de cálculos simples a interações complexas com APIs

Como [resources](/docs/concepts/resources), tools são identificadas por nomes únicos e podem incluir descrições para orientar seu uso. No entanto, ao contrário de resources, tools representam operações dinâmicas que podem modificar estado ou interagir com sistemas externos.

## Estrutura de definição de uma tool

Cada tool é definida com a seguinte estrutura:

```typescript
{
  name: string;          // Unique identifier for the tool
  description?: string;  // Human-readable description
  inputSchema: {         // JSON Schema for the tool's parameters
    type: "object",
    properties: { ... }  // Tool-specific parameters
  },
  annotations?: {        // Optional hints about tool behavior
    title?: string;      // Human-readable title for the tool
    readOnlyHint?: boolean;    // If true, the tool does not modify its environment
    destructiveHint?: boolean; // If true, the tool may perform destructive updates
    idempotentHint?: boolean;  // If true, repeated calls with same args have no additional effect
    openWorldHint?: boolean;   // If true, tool interacts with external entities
  }
}
```

## Implementando tools

Aqui está um exemplo de implementação de uma tool básica em um servidor MCP:

<Tabs>
  <Tab title="TypeScript">
    ```typescript
    const server = new Server({
      name: "example-server",
      version: "1.0.0"
    }, {
      capabilities: {
        tools: {}
      }
    });

    // Define available tools
    server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [{
          name: "calculate_sum",
          description: "Add two numbers together",
          inputSchema: {
            type: "object",
            properties: {
              a: { type: "number" },
              b: { type: "number" }
            },
            required: ["a", "b"]
          }
        }]
      };
    });

    // Handle tool execution
    server.setRequestHandler(CallToolRequestSchema, async (request) => {
      if (request.params.name === "calculate_sum") {
        const { a, b } = request.params.arguments;
        return {
          content: [
            {
              type: "text",
              text: String(a + b)
            }
          ]
        };
      }
      throw new Error("Tool not found");
    });
    ```
  </Tab>

  <Tab title="Python">
    ```python
    app = Server("example-server")

    @app.list_tools()
    async def list_tools() -> list[types.Tool]:
        return [
            types.Tool(
                name="calculate_sum",
                description="Add two numbers together",
                inputSchema={
                    "type": "object",
                    "properties": {
                        "a": {"type": "number"},
                        "b": {"type": "number"}
                    },
                    "required": ["a", "b"]
                }
            )
        ]

    @app.call_tool()
    async def call_tool(
        name: str,
        arguments: dict
    ) -> list[types.TextContent | types.ImageContent | types.EmbeddedResource]:
        if name == "calculate_sum":
            a = arguments["a"]
            b = arguments["b"]
            result = a + b
            return [types.TextContent(type="text", text=str(result))]
        raise ValueError(f"Tool not found: {name}")
    ```
  </Tab>
</Tabs>

## Exemplos de padrões de tools

Aqui estão alguns exemplos de tipos de tools que um servidor poderia fornecer:

### Operações de sistema

Tools que interagem com o sistema local:

```typescript
{
  name: "execute_command",
  description: "Run a shell command",
  inputSchema: {
    type: "object",
    properties: {
      command: { type: "string" },
      args: { type: "array", items: { type: "string" } }
    }
  }
}
```

### Integrações de API

Tools que encapsulam APIs externas:

```typescript
{
  name: "github_create_issue",
  description: "Create a GitHub issue",
  inputSchema: {
    type: "object",
    properties: {
      title: { type: "string" },
      body: { type: "string" },
      labels: { type: "array", items: { type: "string" } }
    }
  }
}
```

### Processamento de dados

Tools que transformam ou analisam dados:

```typescript
{
  name: "analyze_csv",
  description: "Analyze a CSV file",
  inputSchema: {
    type: "object",
    properties: {
      filepath: { type: "string" },
      operations: {
        type: "array",
        items: {
          enum: ["sum", "average", "count"]
        }
      }
    }
  }
}
```

## Boas práticas

Ao implementar tools:

1. Forneça nomes e descrições claros e descritivos
2. Use definições detalhadas de JSON Schema para parâmetros
3. Inclua exemplos nas descrições das tools para demonstrar como o modelo deve usá-las
4. Implemente tratamento de erros e validação adequados
5. Use relatórios de progresso para operações longas
6. Mantenha as operações das tools focadas e atômicas
7. Documente as estruturas esperadas dos valores de retorno
8. Implemente timeouts adequados
9. Considere rate limiting para operações intensivas em recursos
10. Registre o uso das tools (logging) para depuração e monitoramento

### Conflitos de nome de tools

Aplicações cliente MCP e proxies de servidor MCP podem encontrar conflitos de nome de tools ao construir suas próprias listas de tools. Por exemplo, dois servidores MCP conectados `web1` e `web2` podem ambos expor uma tool chamada `search_web`.

As aplicações podem desambiguar tools com uma das seguintes estratégias (entre outras; lista não exaustiva):

* Concatenar um nome de servidor único, definido pelo usuário, com o nome da tool, ex: `web1___search_web` e `web2___search_web`. Esta estratégia pode ser preferível quando nomes de servidor únicos já são fornecidos pelo usuário em um arquivo de configuração.
* Gerar um prefixo aleatório para o nome da tool, ex: `jrwxs___search_web` e `6cq52___search_web`. Esta estratégia pode ser preferível em proxies de servidor onde nomes únicos definidos pelo usuário não estão disponíveis.
* Usar o URI do servidor como prefixo para o nome da tool, ex: `web1.example.com:search_web` e `web2.example.com:search_web`. Esta estratégia pode ser adequada ao trabalhar com servidores MCP remotos.

Note que o nome fornecido pelo servidor no fluxo de inicialização não tem garantia de ser único e, em geral, não é adequado para fins de desambiguação.

## Considerações de segurança

Ao expor tools:

### Validação de entrada

* Valide todos os parâmetros contra o schema
* Sanitize caminhos de arquivo e comandos de sistema
* Valide URLs e identificadores externos
* Verifique tamanhos e faixas dos parâmetros
* Previna injeção de comandos

### Controle de acesso

* Implemente autenticação onde necessário
* Use verificações de autorização apropriadas
* Audite o uso das tools
* Aplique rate limit às requisições
* Monitore quanto a abuso

### Tratamento de erros

* Não exponha erros internos aos clientes
* Registre erros relevantes para segurança
* Trate timeouts apropriadamente
* Limpe recursos após erros
* Valide valores de retorno

## Descoberta e atualizações de tools

O MCP suporta descoberta dinâmica de tools:

1. Clientes podem listar tools disponíveis a qualquer momento
2. Servidores podem notificar clientes quando tools mudam usando `notifications/tools/list_changed`
3. Tools podem ser adicionadas ou removidas em tempo de execução
4. Definições de tool podem ser atualizadas (embora isso deva ser feito com cuidado)

## Tratamento de erros

Erros de tool devem ser reportados dentro do objeto de resultado, não como erros em nível de protocolo MCP. Isso permite que o LLM veja e potencialmente trate o erro. Quando uma tool encontra um erro:

1. Defina `isError` como `true` no resultado
2. Inclua detalhes do erro no array `content`

Aqui está um exemplo de tratamento de erros adequado para tools:

<Tabs>
  <Tab title="TypeScript">
    ```typescript
    try {
      // Tool operation
      const result = performOperation();
      return {
        content: [
          {
            type: "text",
            text: `Operation successful: ${result}`
          }
        ]
      };
    } catch (error) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Error: ${error.message}`
          }
        ]
      };
    }
    ```
  </Tab>

  <Tab title="Python">
    ```python
    try:
        # Tool operation
        result = perform_operation()
        return types.CallToolResult(
            content=[
                types.TextContent(
                    type="text",
                    text=f"Operation successful: {result}"
                )
            ]
        )
    except Exception as error:
        return types.CallToolResult(
            isError=True,
            content=[
                types.TextContent(
                    type="text",
                    text=f"Error: {str(error)}"
                )
            ]
        )
    ```
  </Tab>
</Tabs>

Esta abordagem permite que o LLM veja que ocorreu um erro e potencialmente tome ação corretiva ou solicite intervenção humana.

## Annotations de tools

Annotations de tools fornecem metadados adicionais sobre o comportamento de uma tool, ajudando os clientes a entender como apresentar e gerenciar as tools. Essas annotations são dicas que descrevem a natureza e o impacto de uma tool, mas não devem ser usadas como base para decisões de segurança.

### Propósito das annotations de tools

As annotations de tools cumprem vários propósitos-chave:

1. Fornecer informação específica de UX sem afetar o contexto do modelo
2. Ajudar os clientes a categorizar e apresentar tools apropriadamente
3. Transmitir informação sobre os potenciais efeitos colaterais de uma tool
4. Auxiliar no desenvolvimento de interfaces intuitivas para aprovação de tools

### Annotations de tools disponíveis

A especificação do MCP define as seguintes annotations para tools:

| Annotation        | Tipo    | Padrão  | Descrição                                                                                                                            |
| ----------------- | ------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `title`           | string  | -       | Um título legível por humanos para a tool, útil para exibição em UI                                                                  |
| `readOnlyHint`    | boolean | false   | Se true, indica que a tool não modifica seu ambiente                                                                                 |
| `destructiveHint` | boolean | true    | Se true, a tool pode realizar atualizações destrutivas (só é significativo quando `readOnlyHint` é false)                            |
| `idempotentHint`  | boolean | false   | Se true, chamar a tool repetidamente com os mesmos argumentos não tem efeito adicional (só é significativo quando `readOnlyHint` é false) |
| `openWorldHint`   | boolean | true    | Se true, a tool pode interagir com um "mundo aberto" de entidades externas                                                           |

### Exemplo de uso

Veja como definir tools com annotations para diferentes cenários:

```typescript
// A read-only search tool
{
  name: "web_search",
  description: "Search the web for information",
  inputSchema: {
    type: "object",
    properties: {
      query: { type: "string" }
    },
    required: ["query"]
  },
  annotations: {
    title: "Web Search",
    readOnlyHint: true,
    openWorldHint: true
  }
}

// A destructive file deletion tool
{
  name: "delete_file",
  description: "Delete a file from the filesystem",
  inputSchema: {
    type: "object",
    properties: {
      path: { type: "string" }
    },
    required: ["path"]
  },
  annotations: {
    title: "Delete File",
    readOnlyHint: false,
    destructiveHint: true,
    idempotentHint: true,
    openWorldHint: false
  }
}

// A non-destructive database record creation tool
{
  name: "create_record",
  description: "Create a new record in the database",
  inputSchema: {
    type: "object",
    properties: {
      table: { type: "string" },
      data: { type: "object" }
    },
    required: ["table", "data"]
  },
  annotations: {
    title: "Create Database Record",
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: false,
    openWorldHint: false
  }
}
```

### Integrando annotations na implementação do servidor

<Tabs>
  <Tab title="TypeScript">
    ```typescript
    server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [{
          name: "calculate_sum",
          description: "Add two numbers together",
          inputSchema: {
            type: "object",
            properties: {
              a: { type: "number" },
              b: { type: "number" }
            },
            required: ["a", "b"]
          },
          annotations: {
            title: "Calculate Sum",
            readOnlyHint: true,
            openWorldHint: false
          }
        }]
      };
    });
    ```
  </Tab>

  <Tab title="Python">
    ```python
    from mcp.server.fastmcp import FastMCP

    mcp = FastMCP("example-server")

    @mcp.tool(
        annotations={
            "title": "Calculate Sum",
            "readOnlyHint": True,
            "openWorldHint": False
        }
    )
    async def calculate_sum(a: float, b: float) -> str:
        """Add two numbers together.

        Args:
            a: First number to add
            b: Second number to add
        """
        result = a + b
        return str(result)
    ```
  </Tab>
</Tabs>

### Boas práticas para annotations de tools

1. **Seja preciso sobre efeitos colaterais**: Indique claramente se uma tool modifica seu ambiente e se essas modificações são destrutivas.

2. **Use títulos descritivos**: Forneça títulos amigáveis que descrevam claramente o propósito da tool.

3. **Indique a idempotência corretamente**: Marque tools como idempotentes apenas se chamadas repetidas com os mesmos argumentos realmente não tiverem efeito adicional.

4. **Defina dicas de mundo aberto/fechado apropriadas**: Indique se uma tool interage com um sistema fechado (como um banco de dados) ou um sistema aberto (como a web).

5. **Lembre-se de que annotations são dicas**: Todas as propriedades em ToolAnnotations são dicas e não há garantia de que forneçam uma descrição fiel do comportamento da tool. Clientes nunca devem tomar decisões críticas de segurança baseadas somente em annotations.

## Testando tools

Uma estratégia de testes abrangente para tools MCP deve cobrir:

* **Testes funcionais**: Verifique se as tools executam corretamente com entradas válidas e tratam entradas inválidas apropriadamente
* **Testes de integração**: Teste a interação da tool com sistemas externos usando dependências reais e mockadas
* **Testes de segurança**: Valide autenticação, autorização, sanitização de entrada e rate limiting
* **Testes de desempenho**: Verifique o comportamento sob carga, o tratamento de timeouts e a limpeza de recursos
* **Tratamento de erros**: Garanta que as tools reportem erros adequadamente por meio do protocolo MCP e limpem recursos
