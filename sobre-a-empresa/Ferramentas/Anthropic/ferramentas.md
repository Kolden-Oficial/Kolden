# Anthropic — Referência de Uso

Plataforma de IA/LLM da Anthropic: API RESTful (Claude API) que dá acesso programático aos modelos Claude (Opus, Sonnet, Haiku, Fable) para geração de texto, raciocínio, código, visão, tool use, agentes e MCP. Categoria: IA/LLM.

---

## Credenciais (Infisical)

| Credencial | Caminho Infisical |
|------------|-------------------|
| ANTHROPIC_API_KEY | `/kolden/prod/ANTHROPIC_API_KEY` |

> Art. VII (Constituição Kolden): nunca o valor — só o caminho. Resolver em runtime via `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- <comando>`.

---

## Fontes confiáveis

| Tipo | Link |
|------|------|
| Documentação oficial | https://platform.claude.com/docs/en/home |
| Referência da API | https://platform.claude.com/docs/en/api/overview |
| Repositório GitHub | https://github.com/anthropics/anthropic-sdk-python |
| Fórum / Comunidade | https://github.com/modelcontextprotocol/servers (ecossistema MCP, mantido pela Anthropic + comunidade) — comunidade dedicada de desenvolvedores oficial não encontrada |
| Changelog / Status | https://status.anthropic.com (status) · https://docs.anthropic.com/en/release-notes/api (changelog) |

---

## MCP (Model Context Protocol)

- **Disponível?** não (para a própria Anthropic API) — a Anthropic é o provedor/host do LLM, não uma ferramenta exposta via servidor MCP. A Anthropic **criou e mantém** o padrão MCP e os SDKs oficiais, mas não publica um "servidor MCP da Anthropic API". Servidores MCP referência (comunidade + Anthropic) existem para outros serviços.
- **Repositório:** https://github.com/modelcontextprotocol/servers (servidores MCP de referência) · https://github.com/modelcontextprotocol (org oficial do padrão)
- **Instalação:** n/a (não há servidor MCP oficial para a Anthropic API). Para usar o Claude *como cliente* MCP, ver `mcp_servers` na Messages API ou a Files/Managed Agents API. Para consumir um servidor MCP de terceiros no Claude Code: `claude mcp add <nome> <comando-ou-url>`.

---

## Uso básico

- **Base URL / SDK:** Base URL da API: `https://api.anthropic.com` (endpoint principal `POST /v1/messages`). SDKs oficiais: Python `pip install anthropic`, TypeScript/JS `npm install @anthropic-ai/sdk`, além de Go, Java, Ruby, PHP, C#. Versão da API via header `anthropic-version: 2023-06-01`.
- **Autenticação:** Chave de API no header `x-api-key`. Os SDKs leem automaticamente a variável de ambiente `ANTHROPIC_API_KEY` — basta injetá-la em runtime pelo Infisical; nunca passar a chave literal no código.
- **Exemplo mínimo:**

  cURL (chave injetada pelo Infisical como variável de ambiente):

  ```bash
  infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- \
    curl https://api.anthropic.com/v1/messages \
      -H "x-api-key: $ANTHROPIC_API_KEY" \
      -H "anthropic-version: 2023-06-01" \
      -H "content-type: application/json" \
      -d '{
        "model": "claude-opus-4-8",
        "max_tokens": 1024,
        "messages": [{"role": "user", "content": "Olá, Claude"}]
      }'
  ```

  Python (SDK lê `ANTHROPIC_API_KEY` do ambiente; rodar via `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- python script.py`):

  ```python
  import anthropic

  client = anthropic.Anthropic()  # usa ANTHROPIC_API_KEY do ambiente
  resp = client.messages.create(
      model="claude-opus-4-8",
      max_tokens=1024,
      messages=[{"role": "user", "content": "Olá, Claude"}],
  )
  print(next(b.text for b in resp.content if b.type == "text"))
  ```

---

## Notas Kolden

- Modelo padrão recomendado: `claude-opus-4-8` (Opus 4.8). Para tarefas de alto volume/custo, `claude-sonnet-4-6`; para tarefas simples e rápidas, `claude-haiku-4-5`.
- Sempre injetar a chave via `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- <comando>`; nunca commitar a chave nem colocá-la em `.env` versionado.
- Defaults úteis: thinking adaptativo (`thinking: {type: "adaptive"}`) para tarefas complexas; streaming (`messages.stream`) para respostas longas ou `max_tokens` alto (evita timeout HTTP).
- Para resolver IDs de modelo, capacidades e limites em runtime, usar a Models API (`GET /v1/models`).
- O Kolden tende a usar a Anthropic API como motor de LLM dos subagentes (ex.: Caos/GHL) e dos squads de copy — chamadas server-side com a chave de produção.
