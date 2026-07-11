---
tipo: nota
area: staging-aiox
up: "[[.claude/_staging/aiox/_MOC-staging-aiox]]"
relacionado:
  - "[[.claude/_staging/aiox/.aiox-core/development/tasks/_indice|_indice]]"
---

# list-mcps

List currently enabled MCP servers and their available tools.

## Purpose

Display all MCP servers configured in Docker MCP Toolkit with their status and tools.

## Usage

```bash
*list-mcps
```

## Output

Shows:
- Server name and status (enabled/disabled)
- Available tools per server
- Connection status

## Implementation

Uses Docker MCP Toolkit CLI:
```bash
docker mcp tools ls
```

## Related

- `*add-mcp` - Add new MCP server
- `*remove-mcp` - Remove MCP server
- `*search-mcp` - Search MCP catalog
