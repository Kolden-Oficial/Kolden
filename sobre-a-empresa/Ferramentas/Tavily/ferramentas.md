# Tavily — Referência de Uso

Tavily é uma API de busca, extração, crawling e research na web projetada para agentes de IA (LLMs), fornecendo acesso à web em tempo real e extração de conteúdo. Categoria: Busca/Scraping.

---

## Credenciais (Infisical)

| Credencial | Caminho Infisical |
|------------|-------------------|
| TAVILY_API_KEY | `/kolden/prod/TAVILY_API_KEY` |

> Art. VII (Constituição Kolden): nunca o valor — só o caminho. Resolver em runtime via `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- <comando>`.

---

## Fontes confiáveis

| Tipo | Link |
|------|------|
| Documentação oficial | https://docs.tavily.com/ |
| Referência da API | https://docs.tavily.com/documentation/api-reference/introduction |
| Repositório GitHub | https://github.com/tavily-ai (Python: https://github.com/tavily-ai/tavily-python · JS: https://github.com/tavily-ai/tavily-js) |
| Fórum / Comunidade | Discord: https://discord.gg/TPu2gkaWp2 (via https://community.tavily.com) · Discourse: https://community.tavily.com/ |
| Changelog / Status | Status: https://status.tavily.com/ |

---

## MCP (Model Context Protocol)

- **Disponível?** sim — **oficial** (desenvolvido pela Tavily AI)
- **Repositório:** https://github.com/tavily-ai/tavily-mcp (pacote npm: `tavily-mcp` / `@tavily/mcp`)
- **Instalação:**
  - Remoto (recomendado, via Claude Code/OAuth):
    `claude mcp add tavily-remote-mcp --transport http https://mcp.tavily.com/mcp/`
  - Remoto com chave na URL:
    `https://mcp.tavily.com/mcp/?tavilyApiKey=<TAVILY_API_KEY>`
  - Local via npx:
    `npx -y tavily-mcp`

---

## Uso básico

- **Base URL / SDK:**
  - Base URL da API: `https://api.tavily.com`
  - SDK Python (oficial): `pip install tavily-python`
  - SDK JavaScript/TypeScript (oficial): `npm i @tavily/core`
  - Endpoints principais: `/search`, `/extract`, `/crawl`, `/map`, `/research`
- **Autenticação:** Bearer token no header HTTP — `Authorization: Bearer tvly-YOUR_API_KEY`. A chave tem prefixo `tvly-`.
- **Exemplo mínimo:**

  cURL (chave injetada pelo Infisical via variável de ambiente `$TAVILY_API_KEY`):
  ```bash
  infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- \
    curl -s -X POST https://api.tavily.com/search \
      -H "Authorization: Bearer $TAVILY_API_KEY" \
      -H "Content-Type: application/json" \
      -d '{"query": "Quem é Leo Messi?", "search_depth": "basic"}'
  ```

  Python:
  ```bash
  infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- python script.py
  ```
  ```python
  import os
  from tavily import TavilyClient

  client = TavilyClient(api_key=os.environ["TAVILY_API_KEY"])  # injetada pelo Infisical
  response = client.search("Quem é Leo Messi?")
  print(response)
  ```

  JavaScript:
  ```js
  const { tavily } = require("@tavily/core");
  const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY }); // injetada pelo Infisical
  const response = await tvly.search("Quem é Leo Messi?");
  ```

---

## Notas Kolden

- Resolver `TAVILY_API_KEY` sempre via Infisical (`/kolden/prod`), nunca hardcode. A chave usa prefixo `tvly-`.
- Para integração com agentes Claude Code, preferir o MCP remoto oficial (`https://mcp.tavily.com/mcp/`) — expõe as ferramentas `tavily-search` e `tavily-extract` sem necessidade de rodar processo local.
- Uso típico no Kolden: enriquecimento de pesquisa web em tempo real para subagentes (ex.: skills de busca-de-referências e research), e scraping/extração de conteúdo de páginas.
