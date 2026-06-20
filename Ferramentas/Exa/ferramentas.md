# Exa — Referência de Uso

Exa é um motor de busca web projetado para IAs/LLMs: faz busca semântica (neural e por palavra-chave), retorna o conteúdo limpo das páginas e crawl/scraping de URLs, além de agentes de pesquisa. Categoria: Busca/Scraping.

---

## Credenciais (Infisical)

| Credencial | Caminho Infisical |
|------------|-------------------|
| EXA_API_KEY | `/kolden/prod/EXA_API_KEY` |

> Art. VII (Constituição Kolden): nunca o valor — só o caminho. Resolver em runtime via `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- <comando>`.

---

## Fontes confiáveis

| Tipo | Link |
|------|------|
| Documentação oficial | https://exa.ai/docs |
| Referência da API | https://exa.ai/docs/reference/search-api-guide |
| Repositório GitHub | https://github.com/exa-labs/exa-mcp-server (org oficial: https://github.com/exa-labs) |
| Fórum / Comunidade | https://exa.ai/contact (link para o Discord) |
| Changelog / Status | Changelog: https://exa.ai/docs/changelog — Status: https://status.exa.ai/ |

---

## MCP (Model Context Protocol)

- **Disponível?** sim — oficial (mantido por exa-labs)
- **Repositório:** https://github.com/exa-labs/exa-mcp-server
- **Instalação:**
  - Remoto (recomendado): `claude mcp add --transport http exa https://mcp.exa.ai/mcp`
  - Local (npm): `npx -y exa-mcp-server` com a variável de ambiente `EXA_API_KEY`
  - Endpoint hospedado com chave por query param: `https://mcp.exa.ai/mcp?exaApiKey=<chave>`

Ferramentas expostas pelo MCP: `web_search_exa` (busca web), `web_fetch_exa` (conteúdo de uma URL) e, opcional, `web_search_advanced_exa` (filtros avançados).

---

## Uso básico

- **Base URL / SDK:**
  - Base URL da API: `https://api.exa.ai` (ex.: endpoint de busca `https://api.exa.ai/search`)
  - SDK oficial Python: `exa-py` (`pip install exa-py`)
  - SDK oficial JavaScript: `exa-js` (`npm install exa-js`)
- **Autenticação:** Header HTTP `x-api-key: <EXA_API_KEY>` nas chamadas REST, ou passando `api_key` ao instanciar o cliente do SDK. Obtenha a chave em https://dashboard.exa.ai/api-keys.
- **Exemplo mínimo (curl, com Infisical injetando a chave — nunca a chave literal):**

```bash
infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- \
  curl -X POST "https://api.exa.ai/search" \
    -H "Content-Type: application/json" \
    -H "x-api-key: $EXA_API_KEY" \
    -d '{"query": "melhores práticas de afiliados Shopee", "type": "auto", "contents": {"highlights": true}}'
```

- **Exemplo mínimo (Python, lendo a env injetada pelo Infisical):**

```python
import os
from exa_py import Exa

exa = Exa(api_key=os.environ["EXA_API_KEY"])  # injetada por: infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- python script.py
result = exa.search("melhores práticas de afiliados Shopee", type="auto", contents={"highlights": True})
print(result)
```

---

## Notas Kolden

- Uso típico no Kolden: busca web e scraping/coleta de conteúdo atualizado para pesquisa de referências (ex.: skill `busca-de-referencias`), enriquecimento de dados e research agents. Pode ser plugado como servidor MCP no harness via `claude mcp add` apontando para `https://mcp.exa.ai/mcp`, com a chave resolvida pelo Infisical em runtime — nunca hardcoded.
- Sempre resolver `EXA_API_KEY` via `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- <comando>` (Art. VII).
