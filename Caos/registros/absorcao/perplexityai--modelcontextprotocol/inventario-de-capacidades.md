---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/perplexityai--modelcontextprotocol/mapa-de-decisao|mapa-de-decisao]]"
  - "[[Caos/registros/absorcao/perplexityai--modelcontextprotocol/seguranca|seguranca]]"
---

# Inventário de capacidades (F3) — perplexityai--modelcontextprotocol

Rota **D** (Framework/MCP grande). Capacidade-alvo principal: o **servidor MCP da Perplexity** e suas **4 tools**,
mais técnicas reutilizáveis no transporte/cliente. Inventário focado no alvo; testes e configs de build ficam de fora.

| ID | capacidade | tipo | keywords | dominio | fonte(arquivo:linha) |
|---|---|---|---|---|---|
| G1 | `perplexity_search` — busca web direta (Search API), retorna resultados rankeados (título/URL/snippet/data); filtros `max_results`, `max_tokens_per_page`, `country` | codigo-mcp | busca-web, search, serp, fontes, citacoes, pesquisa | pesquisa | src/server.ts:498-532 |
| G2 | `perplexity_ask` — Q&A conversacional web-grounded (modelo `sonar-pro`) com citações; filtros recency/domínio/context-size | codigo-mcp | pergunta-resposta, qa, sonar-pro, citacoes, busca-web | pesquisa | src/server.ts:364-402 |
| G3 | `perplexity_research` — pesquisa profunda multi-fonte (modelo `sonar-deep-research`, streaming SSE); `reasoning_effort` minimal→high | codigo-mcp | deep-research, pesquisa-profunda, literatura, multi-fonte, relatorio | pesquisa | src/server.ts:404-440 |
| G4 | `perplexity_reason` — raciocínio passo-a-passo web-grounded (modelo `sonar-reasoning-pro`); filtros recency/domínio/context-size | codigo-mcp | raciocinio, chain-of-thought, analise, comparacao, logica | pesquisa | src/server.ts:442-482 |
| G5 | `strip_thinking` — remove tags `<think>...</think>` da resposta p/ economizar tokens de contexto | metodo-prompt | think-tags, economia-de-tokens, contexto, reasoning | pesquisa | src/server.ts:60-62,238-240 |
| G6 | Filtros de busca compartilhados: `search_recency_filter` (hour→year), `search_domain_filter` (inclui/exclui domínios com `-`), `search_context_size` (low/medium/high) | metodo-prompt | recency, filtro-de-dominio, context-size, busca-dirigida | pesquisa | src/server.ts:328-335,205-208 |
| G7 | Consumo de stream SSE → reconstrução de resposta + citações/usage (resiliente a chunks malformados/keep-alive) | codigo-mcp | sse, streaming, parsing-incremental, citacoes | engenharia | src/server.ts:121-190 |
| G8 | `proxyAwareFetch` — fetch ciente de proxy corporativo via `PERPLEXITY_PROXY`/`HTTPS_PROXY`/`HTTP_PROXY` (undici ProxyAgent) | codigo-mcp | proxy, rede-corporativa, undici, firewall | engenharia | src/server.ts:18-39 |
| G9 | Transporte HTTP endurecido: allowlist de Host (421), CORS por origem (403), default loopback-only, banners de aviso p/ exposição pública | codigo-mcp | http-transport, cors, host-allowlist, hardening, mcp | engenharia/segurança | src/http.ts:20-164 |
| G10 | Empacotamento como plugin Claude Code + entrada de marketplace + `server.json` (registry MCP) + `smithery.yaml` | referencia | plugin, marketplace, mcp-registry, smithery, distribuicao | engenharia | .claude-plugin/marketplace.json; server.json; smithery.yaml |
| G11 | Validação de I/O com Zod (schemas de resposta chat/search) + `validateMessages` defensivo | codigo-mcp | validacao, zod, schema, defensivo | engenharia | src/validation.ts:1-46; src/server.ts:41-58 |
