# list-mcps

Lista os servidores MCP atualmente habilitados e suas ferramentas disponíveis.

## Propósito

Exibir todos os servidores MCP configurados no Docker MCP Toolkit com seu status e ferramentas.

## Uso

```bash
*list-mcps
```

## Saída

Mostra:
- Nome e status do servidor (habilitado/desabilitado)
- Ferramentas disponíveis por servidor
- Status da conexão

## Implementação

Usa o CLI do Docker MCP Toolkit:
```bash
docker mcp tools ls
```

## Relacionados

- `*add-mcp` - Adicionar novo servidor MCP
- `*remove-mcp` - Remover servidor MCP
- `*search-mcp` - Buscar no catálogo MCP
