---
tipo: nota
area: Argos
up: "[[Argos/_MOC-argos]]"
---

# Referência — Perplexity Sonar (modelos, tools e parâmetros)

Detalhamento das 4 tools do Sonar e seus parâmetros, para consulta do `retriever-sonar`.
Endpoint base: `api.perplexity.ai` (vendor externo — ver ressalva de soberania na SKILL).

## Modelos por tool

| Tool | Modelo | Característica |
|---|---|---|
| `perplexity_search` | Search API | retorno cru rankeado (sem síntese LLM); o mais barato/rápido |
| `perplexity_ask` | `sonar-pro` | Q&A web-grounded sintético com citações inline |
| `perplexity_research` | `sonar-deep-research` | pesquisa profunda multi-fonte; resposta via streaming SSE |
| `perplexity_reason` | `sonar-reasoning-pro` | cadeia de raciocínio web-grounded; emite blocos `<think>` |

## Parâmetros da Search API (`perplexity_search`)

| Parâmetro | Efeito |
|---|---|
| `max_results` | nº máximo de resultados retornados |
| `max_tokens_per_page` | corta o conteúdo extraído por página (controla custo) |
| `country` | viés geográfico dos resultados (ex.: `BR`) |

## Filtros compartilhados (ask / research / reason)

| Parâmetro | Valores | Uso no Argos |
|---|---|---|
| `search_recency_filter` | `hour`, `day`, `week`, `month`, `year` | recência de tendências/notícias de mercado |
| `search_domain_filter` | lista de domínios; prefixo `-` exclui | focar fontes citáveis; excluir agregadores de ruído |
| `search_context_size` | `low`, `medium`, `high` | trade-off custo × profundidade da varredura web |
| `reasoning_effort` (só `research`) | `minimal` → `high` | profundidade da pesquisa profunda |

## Parsing de streaming (`research`)

`perplexity_research` devolve **Server-Sent Events (SSE)**. A resposta final é reconstruída
agregando os chunks `delta`; ao final extraem-se **citações** e **usage** (tokens). O parser deve
ser resiliente a chunks de keep-alive e a fragmentos malformados (ignorar linha não-JSON em vez de
abortar). Quem usa o MCP `perplexity` recebe a resposta já remontada; quem usa o motor recebe via
GPT-Researcher.

## `strip_thinking`

`sonar-reasoning-pro` antepõe o raciocínio em `<think>...</think>`. Remover antes de repassar:

```
resposta_final = remover_regex(resposta, /<think>[\s\S]*?<\/think>/g).trim()
```

Mantém a resposta útil, descarta o raciocínio que infla o contexto downstream.

## Credencial

`PERPLEXITY_API_KEY` em `/kolden/argos` (Infisical). Resolução em runtime
(`infisical run --path=/kolden/argos -- ...` ou MCP `infisical`). Nunca literal.

---
*Fonte: `perplexityai/modelcontextprotocol@7c89934` (src/server.ts, src/http.ts) — licença MIT.
Parâmetros e comportamento reescritos em PT-BR a partir do inventário de absorção (G1–G7).*
