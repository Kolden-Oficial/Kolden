# Mapa de decisão (F4) — perplexityai--modelcontextprotocol

Comparação de cada ID do inventário contra `dados/registro-de-entidades.yaml` e os squads existentes.
**Contexto:** o registro NÃO tem nenhuma entidade Perplexity/Sonar; o único vestígio é "Perplexity" na lista de
provedores suportados pelo LobeHub (não é integração própria). O **motor do Argos** já declara
`pontosDeExtensao: retrievers plugados nos backends Hermes (Exa/Tavily/Firecrawl)` — Perplexity Sonar é um novo
retriever/backend natural para esse motor. Decisão dominante: **vendor inerte que aprimora o Argos** (viés ADAPT/CREATE).

| ID | decisao | squad-alvo | justificativa(1 linha) |
|---|---|---|---|
| G1 | ADAPT | argos (vendor) | Novo retriever de busca web no motor Argos, ao lado de Exa/Tavily/Firecrawl; sem equivalente Perplexity no registro. |
| G2 | ADAPT | argos (vendor) | `sonar-pro` Q&A com citações como backend adicional do motor de pesquisa; não há tool de ask-com-citações nativa. |
| G3 | ADAPT | argos (vendor) | `sonar-deep-research` complementa a skill `deep-research` existente como provedor externo de pesquisa profunda. |
| G4 | ADAPT | argos (vendor) | `sonar-reasoning-pro` adiciona raciocínio web-grounded ao motor; sem equivalente registrado. |
| G5 | ADAPT | argos | Técnica `strip_thinking` (corte de `<think>`) reutilizável para economia de contexto em qualquer chamada de reasoning. |
| G6 | ADAPT | argos | Filtros recency/domínio/context-size enriquecem a camada de busca dirigida do Argos. |
| G7 | CREATE | vendor | Parser SSE resiliente — referência de engenharia reaproveitável em outros wrappers de stream (inert, não há equivalente). |
| G8 | ADAPT | dedalo / vendor | Padrão `proxyAwareFetch` (proxy corporativo via env) útil como receita para MCPs/clients próprios do ecossistema. |
| G9 | ADAPT | dedalo / egide | Hardening de transporte HTTP (Host allowlist + CORS + loopback-default) é padrão-ouro para qualquer MCP HTTP próprio. |
| G10 | REUSE | vendor | Empacotamento plugin/marketplace/server.json/smithery já é padrão conhecido; absorver só como referência de distribuição. |
| G11 | REUSE | dedalo | Validação Zod + guarda defensiva de mensagens já é prática estabelecida nos agentes; nada novo a absorver. |

**Síntese:** absorção como **vendor inerte** (`@perplexity-ai/mcp-server` — MCP de busca/pesquisa Perplexity Sonar)
registrado no catálogo de ferramentas, **conectado ao motor do Argos** como novo backend/retriever (G1–G6). G7–G9 são
referências de engenharia para os MCPs/transportes próprios (Dedalo/Egide). Nenhuma capacidade vira agente novo.
