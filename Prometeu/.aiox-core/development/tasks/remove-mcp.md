# remove-mcp

Remove um servidor MCP do Docker MCP Toolkit.

## Propósito

Desabilitar e remover um servidor MCP da configuração do toolkit.

## Uso

```bash
*remove-mcp {server-name}
```

## Parâmetros

- `server-name` - Nome do servidor MCP a ser removido

## Passos

1. Verificar se o servidor existe: `docker mcp tools ls`
2. Confirmar com o usuário antes da remoção
3. Remover o servidor: `docker mcp server remove {server-name}`
4. Verificar a remoção: `docker mcp tools ls`

## Segurança

- Sempre confirme antes de remover
- Verifique se o servidor está em uso por outras configurações
- Documente a remoção nas notas da sessão

## Relacionados

- `*list-mcps` - Listar MCPs habilitados
- `*add-mcp` - Adicionar servidor MCP
