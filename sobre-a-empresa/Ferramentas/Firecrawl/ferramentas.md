---
tipo: ferramenta
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/_MOC-ferramentas]]"
---

# Firecrawl — Referência de Uso

Firecrawl é a API de contexto web para agentes de IA: faz busca (search), scraping, parse, crawl, map e interação com páginas, devolvendo conteúdo limpo em markdown ou dados estruturados prontos para LLM. Categoria: Busca/Scraping.

---

## Credenciais (Infisical)

| Credencial | Caminho Infisical |
|------------|-------------------|
| FIRECRAWL_API_KEY | `/kolden/prod/FIRECRAWL_API_KEY` |

> Art. VII (Constituição Kolden): nunca o valor — só o caminho. Resolver em runtime via `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- <comando>`.

---

## Fontes confiáveis

| Tipo | Link |
|------|------|
| Documentação oficial | https://docs.firecrawl.dev |
| Referência da API | https://docs.firecrawl.dev/api-reference/v2-introduction |
| Repositório GitHub | https://github.com/firecrawl/firecrawl |
| Fórum / Comunidade | https://community.firecrawl.dev/ (Discourse) · Discord: https://discord.com/invite/firecrawl |
| Changelog / Status | Changelog: https://www.firecrawl.dev/changelog · Status: https://status.firecrawl.dev/ |

---

## MCP (Model Context Protocol)

- **Disponível?** sim — **oficial** (mantido pela Firecrawl)
- **Repositório:** https://github.com/firecrawl/firecrawl-mcp-server (pacote npm: https://www.npmjs.com/package/firecrawl-mcp)
- **Instalação:** `claude mcp add firecrawl -e FIRECRAWL_API_KEY=$FIRECRAWL_API_KEY -- npx -y firecrawl-mcp`
  - Execução direta confirmada na doc oficial: `env FIRECRAWL_API_KEY=fc-YOUR_API_KEY npx -y firecrawl-mcp`
  - A chave deve vir da variável de ambiente `FIRECRAWL_API_KEY` (injetada pelo Infisical — nunca o valor literal).

---

## Uso básico

- **Base URL / SDK:** Base URL da API: `https://api.firecrawl.dev`. SDK oficial Node: `npm install firecrawl`; SDK oficial Python: `pip install firecrawl`.
- **Autenticação:** header HTTP `Authorization: Bearer <FIRECRAWL_API_KEY>` (as chaves têm prefixo `fc-`). Gere/gerencie chaves em https://www.firecrawl.dev/app/api-keys.
- **Exemplo mínimo:** (a chave é resolvida pelo Infisical em runtime; nunca escreva o valor literal)

```bash
# Resolve a credencial via Infisical e injeta $FIRECRAWL_API_KEY no ambiente do curl
infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- \
  curl -X POST https://api.firecrawl.dev/v2/scrape \
    -H "Authorization: Bearer $FIRECRAWL_API_KEY" \
    -H "Content-Type: application/json" \
    -d '{"url":"https://example.com","formats":["markdown"]}'
```

```bash
# SDK Python, lendo a chave da env injetada pelo Infisical
infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- python -c '
import os
from firecrawl import Firecrawl
app = Firecrawl(api_key=os.environ["FIRECRAWL_API_KEY"])
print(app.scrape("https://example.com", formats=["markdown"]))
'
```

---

## Notas Kolden

- Uso típico no Kolden: alimentar agentes/pesquisa (ex.: skill `busca-de-referencias`, fluxos de pesquisa do Caos) com conteúdo web limpo, e como servidor MCP `firecrawl-mcp` disponível ao Claude Code para scrape/search ao vivo.
- Sempre rodar comandos sob `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- ...` para que `FIRECRAWL_API_KEY` seja injetada em runtime; nunca persistir a chave em arquivos `.env` versionados nem em configs MCP com valor literal.
- API atual é a v2 (`/v2/...`); confira o changelog antes de fixar versões de endpoint ou SDK.
