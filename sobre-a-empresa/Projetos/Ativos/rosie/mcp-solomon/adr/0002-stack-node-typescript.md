---
tipo: projeto
projeto: rosie
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/rosie/mcp-solomon/adr/0001-path-isolado-por-cliente|0001-path-isolado-por-cliente]]"
---

# ADR 0002 — Stack Node/TypeScript

**Status:** Aceito | **Data:** 2026-07-01 | **Decisor:** Ronan Silva + Caos | **Aprovação:** Ronan

## Contexto

A skill `criacao-de-mcp` do Caos delega a construção de MCPs para a skill `mcp-builder` do Prometeu. O mcp-builder oficialmente tem **Python/FastMCP** como padrão. Ao mesmo tempo, o molde de qualidade Kolden vivo hoje é o **`Dedalo/mcp/vscode-coach/`** — implementado em **Node/TypeScript** com `@modelcontextprotocol/sdk` — porque VS Code CLI, parsers de config e ecossistema natural pedem Node.

O MCP Íris precisa decidir a stack antes de qualquer linha de código.

## Decisão

**Node ≥20 / TypeScript ≥5.6 com `@modelcontextprotocol/sdk` ≥1.20 e Zod ≥3.24.**

Runtime, versões mínimas e libs alinham-se **exatamente** ao vscode-coach para maximizar reuso de padrões idiomáticos (`KoldenError`, log JSON estruturado em `~/.kolden/<mcp>/server.log`, Zod `.strict()` com `.describe()`, wrapper `envolverErros`, eval harness via stdio JSON-RPC).

## Alternativas consideradas

| Alternativa | Por que rejeitada |
|---|---|
| **Python / FastMCP** (padrão do mcp-builder) | Perde alinhamento com o molde vscode-coach. A API Solomon não exige nada específico de Python (é REST simples com Bearer). Manter dois padrões impõe overhead de revisão. |
| **Deno** | MCP SDK oficial é Node-first. Menos exemplos, outro runtime para a casa manter. |
| **Bun** | Menos maduro em stdio MCP em produção — risco desnecessário para uma MCP com SLA de cliente. |

## Consequências

### Positivas
- **Consistência com vscode-coach.** Revisor humano navega ambos com o mesmo mental model.
- **Tipagem forte em compile-time.** Zod + `strict: true` + `noUncheckedIndexedAccess` pegam classes inteiras de bug antes do `claude mcp add`.
- **Fetch nativo Node 20+.** Zero dependência HTTP externa (axios, node-fetch) para a chamada Solomon.
- **Build determinístico.** `tsc → dist/`, sem bundler; alinhado ao princípio "less is more" do CLAUDE.md.

### Negativas
- **Node 20+ obrigatório na máquina do dev/consumidor.** Máquinas antigas precisam upgrade.
- **Build step (`tsc`) antes de `claude mcp add`.** Um passo a mais na cadeia de deploy.
- **Desvio do padrão Python do mcp-builder.** Curador precisa registrar que MCPs cliente-scoped podem adotar Node/TS quando o molde de qualidade for o vscode-coach.

### Neutras
- Pino/Winston não são usados na v1 — logger interno simples em `src/lib/log.ts` basta.
- Zod escolhido sobre `valibot` por maturidade e integração nativa com MCP SDK (mesma escolha do vscode-coach).

## Quando reavaliar

- Se o `mcp-builder` do Prometeu evoluir para gerar scaffold TypeScript com qualidade comparável ao Python, reavaliar se vale delegar geração via Prometeu (hoje o padrão de código foi copiado manualmente do vscode-coach).
- Se surgir requisito para rodar dentro de ambiente 100% Python (ex: pipeline Airflow), reavaliar port para Python/FastMCP.
