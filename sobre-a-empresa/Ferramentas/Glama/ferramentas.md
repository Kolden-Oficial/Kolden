---
tipo: ferramenta
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/_MOC-ferramentas]]"
---

# Glama — Referência de Uso

Glama é uma plataforma para IA/LLM que oferece um Gateway compatível com a API da OpenAI para acessar 100+ modelos de múltiplos provedores (OpenAI, Anthropic, Google, DeepSeek, Mistral, xAI etc.) com load balancing, fallbacks, cache, logging e billing consolidado. Também opera um registro/inspetor/gateway de servidores MCP (Model Context Protocol). Categoria: IA/LLM.

---

## Credenciais (Infisical)

| Credencial | Caminho Infisical |
|------------|-------------------|
| GLAMA_API_KEY | `/kolden/prod/GLAMA_API_KEY` |

> Art. VII (Constituição Kolden): nunca o valor — só o caminho. Resolver em runtime via `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- <comando>`.

---

## Fontes confiáveis

| Tipo | Link |
|------|------|
| Documentação oficial | https://glama.ai/gateway/docs/api |
| Referência da API | https://gateway.glama.ai/reference |
| Repositório GitHub | https://github.com/glama-ai |
| Fórum / Comunidade | https://discord.gg/C3eCXhYWtJ (via https://glama.ai/discord) — também https://reddit.com/r/glama |
| Changelog / Status | Release notes: https://glama.ai/release-notes — Status: https://glama.ai/status |

---

## MCP (Model Context Protocol)

- **Disponível?** sim — comunidade (não oficial da Glama). A Glama em si é uma *plataforma/registro* de servidores MCP; existe um servidor MCP da comunidade que consulta o registro MCP da Glama.
- **Repositório:** https://github.com/meetmatt/glama-mcp-registry-mcp-server (servidor MCP da comunidade que expõe `search_mcp_servers(query)` para pesquisar o registro de MCP da Glama)
- **Instalação:** não há comando oficial publicado pela Glama. Para o servidor da comunidade, seguir o README do repositório acima (não encontrado comando `claude mcp add` ou `npx` oficial documentado).

> Observação: a Glama opera o registro/inspetor/gateway de MCP em https://glama.ai/mcp/servers, mas isso é uma plataforma web — não um servidor MCP "da Glama" para instalar localmente.

---

## Uso básico

- **Base URL / SDK:** Base URL do Gateway: `https://gateway.glama.ai/v1` (ex.: `https://gateway.glama.ai/v1/chat/completions`). API compatível com OpenAI — usar os SDKs oficiais da OpenAI (`openai` no npm/pip) apontando `base_url` para o gateway. Endpoints adicionais: `GET /v1/models` (lista modelos) e `GET /v1/completion-requests/:id` (status via header `x-request-id`).
- **Autenticação:** header HTTP `Authorization: Bearer <GLAMA_API_KEY>`. A chave é obtida no painel da Glama (conta/settings do gateway).
- **Exemplo mínimo (curl, com Infisical injetando a chave):**

```bash
infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- bash -c '
curl -s https://gateway.glama.ai/v1/chat/completions \
  -H "Authorization: Bearer $GLAMA_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{\"model\":\"openai/gpt-4o\",\"messages\":[{\"role\":\"user\",\"content\":\"Hello, World!\"}]}"
'
```

Exemplo com SDK OpenAI (Python), também via Infisical:

```bash
infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- python -c '
import os
from openai import OpenAI
client = OpenAI(base_url="https://gateway.glama.ai/v1", api_key=os.environ["GLAMA_API_KEY"])
print(client.chat.completions.create(model="openai/gpt-4o",
      messages=[{"role":"user","content":"Hello, World!"}]).choices[0].message.content)
'
```

---

## Notas Kolden

- Uso típico no Kolden: roteador/gateway único para LLMs — centralizar chamadas a múltiplos provedores via uma API compatível com OpenAI, aproveitando fallback, cache e billing consolidado, sem espalhar chaves de cada provedor pelos projetos.
- Sempre resolver `GLAMA_API_KEY` em runtime via Infisical (`/kolden/prod`); nunca gravar a chave em `.env` versionado ou em código.
- Para descoberta de servidores MCP, a plataforma web da Glama (https://glama.ai/mcp/servers) é referência; o servidor MCP de registro é da comunidade e opcional.
