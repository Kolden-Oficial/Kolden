---
tipo: nota
area: Dedalo
up: "[[Dedalo/_MOC-dedalo]]"
---

# Motores vendor inerte + empacotamento

Os motores de grafo são **ferramentas instaláveis inertes** — não foram reescritos nem são
executados durante a absorção. A habilidade `compreensao-de-codebase` é a **interface**; estes são
os motores que ela orquestra quando o Ronan autorizar instalá-los.

## graphify (Python)
- Pacote PyPI `graphifyy` + servidor MCP stdio `graphify-mcp` (10 tools: `query_graph`, `get_node`,
  `get_neighbors`, `get_community`, `god_nodes`, `graph_stats`, `shortest_path`, `list_prs`,
  `get_pr_impact`, `triage_prs` + 6 resources).
- Exportadores: graph.json (GraphRAG), HTML interativo, Obsidian vault, SVG, GraphML, Neo4j/FalkorDB.
- Modo `--watch` (rebuild AST-only ao mudar arquivo) e ingest de URL + transcrição (Whisper) são
  funções operacionais da ferramenta — usar via CLI, não reescrever.

## Understand-Anything (TypeScript)
- `packages/core` — motor TS: registry de extratores tree-sitter WASM (~20+ linguagens), framework
  registry (django/express/fastapi/flask/gin/nextjs/rails/react/spring/vue), layer detector,
  fingerprint, merge/dedup de batches.
- `packages/dashboard` — app React Flow + ELK layout + Louvain + filtros + code viewer + i18n.

## Religação soberana (obrigatório)
Ambos os motores aceitam **backends LLM plugáveis** (Gemini, OpenAI, Anthropic, Bedrock, Ollama,
claude-CLI). Na Kolden, configure o backend para o **LLM próprio**: OpenRouter (modelo configurável)
ou local (Ollama). **Nunca** apontar para a API Anthropic direta. Chaves SEMPRE via Infisical.

## Empacotamento multi-host
A suíte original empacota para ~14 agentes/IDEs (Claude, Codex, Copilot, Cursor, Gemini, OpenCode…)
via matriz de install + symlink. Para o uso interno Kolden, basta o alvo Claude Code; a matriz fica
registrada como técnica de distribuição (dono: `skill-craftsman`/Anvil) caso se queira portar.

## Decisão pendente (escalada, não aplicada aqui)
- **MCP `caveman-shrink`** (proxy que comprime descrições de tools upstream) — CREATE de capacidade
  nova de economia de contexto MCP; reconstruir sob padrão Kolden (Infisical, registro), não
  vendorizar binário. Adiado para leva incremental.
- Adoção do **Obsidian** como destino de export depende de decisão de stack do Ronan (a Kolden não
  usa Obsidian hoje).

---
*Fontes: safishamsi/graphify@8994b550 + Lum1104/Understand-Anything. MIT. Inventário inerte; nada executado na absorção.*
