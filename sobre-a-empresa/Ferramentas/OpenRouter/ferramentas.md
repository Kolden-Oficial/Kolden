---
tipo: ferramenta
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/_MOC-ferramentas]]"
---

# OpenRouter — Referência de Uso

OpenRouter é um gateway/agregador unificado de LLMs: uma única API (compatível com OpenAI) que dá acesso a 500+ modelos de OpenAI, Anthropic, Google, Meta, Mistral e outros, com fallback automático e roteamento por custo. Categoria: IA/LLM.

---

## Credenciais (Infisical)

| Credencial | Caminho Infisical |
|------------|-------------------|
| OPENROUTER_API_KEY | `/kolden/prod/OPENROUTER_API_KEY` |

> Art. VII (Constituição Kolden): nunca o valor — só o caminho. Resolver em runtime via `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- <comando>`.

---

## Fontes confiáveis

| Tipo | Link |
|------|------|
| Documentação oficial | https://openrouter.ai/docs/quickstart |
| Referência da API | https://openrouter.ai/docs/api/reference/overview |
| Repositório GitHub | https://github.com/OpenRouterTeam |
| Fórum / Comunidade | https://discord.com/invite/openrouter (Discord oficial); suporte em https://openrouter.ai/support |
| Changelog / Status | Changelog: https://openrouter.ai/docs/changelog |

---

## MCP (Model Context Protocol)

- **Disponível?** sim — apenas **comunidade** (não há servidor MCP oficial da OpenRouter nem no repo github.com/modelcontextprotocol/servers).
- **Repositório:** https://github.com/physics91/openrouter-mcp (comunidade; expõe 100+ modelos via MCP para chat/visão/benchmark/integração com Claude Desktop). Outras opções da comunidade: https://github.com/wdmtech/openrouter-search-mcp e https://github.com/overtimepog/OpenrouterMCP
- **Instalação:** `npx @physics91/openrouter-mcp init` e depois `npx @physics91/openrouter-mcp start` (requer Node.js 16+ e Python 3.10+; defina `OPENROUTER_API_KEY` no ambiente). Comando `claude mcp add` oficial: não encontrado.

---

## Uso básico

- **Base URL / SDK:** Base URL da API: `https://openrouter.ai/api/v1` (endpoint principal: `POST /api/v1/chat/completions`). SDKs oficiais: TypeScript/Node `@openrouter/sdk` (npm) e Python `openrouter` (pip). Há também o framework de agentes `@openrouter/agent` (npm). A API é compatível com OpenAI, então o SDK oficial da OpenAI funciona como drop-in apontando o `baseURL`.
- **Autenticação:** Header HTTP `Authorization: Bearer <OPENROUTER_API_KEY>`. A chave nunca deve ser escrita literalmente — injete via Infisical como variável de ambiente.
- **Exemplo mínimo (curl, chave injetada pelo Infisical):**

```bash
infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- \
  curl https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openai/gpt-4o-mini","messages":[{"role":"user","content":"Olá, mundo"}]}'
```

  Exemplo com SDK Python (a chave é lida do ambiente injetado pelo Infisical, nunca hardcoded):

```python
import os
from openrouter import OpenRouter

client = OpenRouter(api_key=os.environ["OPENROUTER_API_KEY"])
resp = client.chat.send(
    model="openai/gpt-4o-mini",
    messages=[{"role": "user", "content": "Olá, mundo"}],
)
print(resp)
```

  Rode com: `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- python app.py`

---

## Notas Kolden

- Uso típico no Kolden: provedor único de LLM para subagentes/scripts que precisam alternar entre modelos (Anthropic, OpenAI, Google etc.) sem múltiplas contas — útil para fallback de custo e para experimentar modelos no squad de copywriters e em projetos como Omiron.
- Sempre resolver `OPENROUTER_API_KEY` em runtime via `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- <comando>`; nunca colocar a chave em `.env` versionado nem em código.
- Como a API é OpenAI-compatible, dá para reaproveitar código existente de OpenAI apenas trocando `baseURL` para `https://openrouter.ai/api/v1`.
