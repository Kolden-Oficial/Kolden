---
tipo: nota
area: Dedalo
up: "[[Dedalo/_MOC-dedalo]]"
relacionado:
  - "[[Dedalo/mcp/vscode-coach/adr/0002-sem-segredos-v1|0002-sem-segredos-v1]]"
---

# ADR 0001 — Stack Node/TypeScript

**Status:** Aceito | **Data:** 2026-06-28 | **Decisor:** Piper (Dédalo) + Caos | **Aprovação:** Ronan

## Contexto

O padrão da Kolden para criação de MCPs próprios (skill `criacao-de-mcp` → `mcp-builder` do Prometeu) é Python/FastMCP. O `vscode-coach` precisa decidir stack antes de qualquer linha de código.

## Decisão

**Node 20+ / TypeScript 5.6+ com `@modelcontextprotocol/sdk` (TypeScript SDK oficial).**

## Alternativas consideradas

| Alternativa | Por que rejeitada |
|---|---|
| **Python / FastMCP** (padrão Kolden) | Operações críticas são Node-first: `code --list-extensions`, parsing de `package.json`, futuro acesso à Marketplace API. Toda integração teria custo de subprocess/parsing. |
| **Deno** | MCP SDK oficial é Node-first; menos exemplos; outro runtime para a casa manter |
| **Bun** | Menos maduro para MCP server em produção; risco de incompatibilidade com stdio do SDK |

## Consequências

### Positivas
- Ecossistema nativo: `code` CLI, parsers de config VS Code, tipos `vscode-extension-manifest` (futuro)
- MCP SDK em TS é maduro: `McpServer`, `StdioServerTransport`, `registerTool` com `annotations`, schemas via Zod com `.strict()`
- Consumidores Kolden já têm Node como precondição do próprio VS Code
- Build determinístico (`tsc`), zero bundler na v1 (princípio "less is more")

### Negativas
- Desvio do padrão Python/FastMCP — quebra uniformidade dos MCPs próprios da Kolden
- Curador precisa registrar duas convenções de tooling (Python para outros, TS para este)
- Revisores precisam alternar mental model

### Neutras
- Pino opcional como logger (decisão deferida — v1 usa logger interno simples em `src/lib/log.ts`)
- Zod escolhido sobre `valibot` por maturidade e integração nativa com MCP SDK

## Quando reavaliar

Se um segundo MCP Node/TS aparecer na casa, considerar promover Node/TS como **segundo padrão oficial** (não substituir Python/FastMCP — coexistir). Reavaliar também se `mcp-builder` do Prometeu evoluir para gerar scaffolds TypeScript com qualidade comparável ao Python.
