# Catálogo de fontes por frente

Detalhamento das fontes e dos comandos de varredura usados pela skill `vigia-de-ecossistema`.
Carregue este arquivo ao executar o `/vigia` ou ao fazer pesquisa ao vivo na Fase 2.

---

## Frente 1 — Modelos & labs

**Blogs / release notes oficiais (WebFetch ou Exa):**
- Anthropic — anthropic.com/news
- OpenAI — openai.com/news
- Google DeepMind — deepmind.google/discover/blog
- Meta AI — ai.meta.com/blog
- Mistral — mistral.ai/news
- DeepSeek — api-docs.deepseek.com / github.com/deepseek-ai
- xAI — x.ai/news

**Hugging Face (MCP):**
- `mcp__claude_ai_Hugging_Face__paper_search` — papers recentes por tema.
- Busca de repos/modelos em alta (`hub_repo_search`) e spaces.

**Benchmarks / preços (WebFetch):**
- LMArena (lmarena.ai), Artificial Analysis (artificialanalysis.ai), páginas de pricing dos labs.

**Query Exa típica:** "release notes de novos modelos LLM nas últimas 2 semanas <lab>".

## Frente 2 — MCPs & ferramentas

**Registries de MCP (Exa / WebFetch):**
- `github.com/modelcontextprotocol/servers` (oficial) — usar `gh` para releases/commits recentes.
- mcp.so, Smithery (smithery.ai), Glama (glama.ai/mcp/servers) — diretórios da comunidade.

**Frameworks de agente (gh):**
- `gh release list` / `gh search repos` para LangChain, LlamaIndex, CrewAI, Autogen, PydanticAI, etc.

**Query Exa típica:** "novos servidores MCP lançados <mês/ano>" / "MCP server for <domínio>".

## Frente 3 — Comunidade

**Hacker News (WebFetch — API Algolia, sem auth):**
- `https://hn.algolia.com/api/v1/search_by_date?query=LLM&tags=story` (recência)
- `https://hn.algolia.com/api/v1/search?query=MCP&tags=story` (relevância/pontos)

**Reddit (WebFetch — sufixo `.json`):**
- `https://www.reddit.com/r/LocalLLaMA/top.json?t=week`
- `https://www.reddit.com/r/MachineLearning/top.json?t=week`

**X / Twitter (Exa):** não há API aberta; usar `web_search_exa` com nomes de pesquisadores/labs.

## Frente 4 — GitHub & newsletters

**GitHub (gh CLI):**
- Trending não tem API oficial — aproximar com `gh search repos --sort stars --order desc`
  filtrando por tópico (`topic:llm`, `topic:mcp`, `topic:ai-agents`) e janela recente.
- `gh release list -R <owner/repo>` para repos-chave já conhecidos (do retrato vivo).

**Newsletters (WebFetch nos arquivos web):**
- TLDR AI — tldr.tech/ai
- Latent Space — latent.space
- The Batch (DeepLearning.AI) — deeplearning.ai/the-batch
- Import AI — importai.substack.com
- Ben's Bites — bensbites.com

**Query Exa típica:** "principais novidades de IA dessa semana newsletter".

---

## Notas operacionais
- Tavily existe mas exige OAuth; se indisponível, ignore e use Exa + WebSearch nativo.
- Respeite limites: priorize profundidade nas fontes oficiais antes de varrer fóruns.
- Sempre anote a data de publicação de cada item; descarte o que não tiver data verificável.
