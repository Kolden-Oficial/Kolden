---
tipo: ferramenta
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/_MOC-ferramentas]]"
---

# Eden AI — Referência de Uso

Eden AI é um gateway/agregador único de IA: uma só API (compatível com OpenAI) que dá acesso a 500+ modelos e provedores (LLMs, OCR, visão, áudio, tradução, etc.) com roteamento, fallback e cost tracking embutidos. Categoria: IA/LLM.

---

## Credenciais (Infisical)

| Credencial | Caminho Infisical |
|------------|-------------------|
| EDENAI_API_KEY | `/kolden/prod/EDENAI_API_KEY` |

> Art. VII (Constituição Kolden): nunca o valor — só o caminho. Resolver em runtime via `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- <comando>`.

---

## Fontes confiáveis

| Tipo | Link |
|------|------|
| Documentação oficial | https://www.edenai.co/docs (redirecionado de https://docs.edenai.co/) |
| Referência da API | https://www.edenai.co/docs/v3/llms/chat-completions — Quick Start: https://www.edenai.co/docs/v3/quickstart/first-llm-call |
| Repositório GitHub | https://github.com/edenai |
| Fórum / Comunidade | Discord: https://discord.gg/VYwTbMQc8u |
| Changelog / Status | Changelog: https://changelog.edenai.co — Status: https://app-edenai.instatus.com/ |

---

## MCP (Model Context Protocol)

- **Disponível?** sim — comunidade/terceiro (Zapier). Não há servidor MCP oficial da Eden AI no GitHub `edenai`.
- **Repositório:** Zapier MCP (remoto, hospedado) — https://zapier.com/mcp/eden-ai (docs: https://docs.zapier.com/mcp/quickstart). n/a como repo público.
- **Instalação:** MCP remoto via URL `https://mcp.zapier.com` (endpoint gerado na sua conta Zapier). Ex.: `claude mcp add --transport http eden-ai <sua-url-do-zapier-mcp>`
- **Alternativa oficial:** a org `edenai` mantém uma Claude Code skill (`edenai-skill`) e nodes n8n (`n8n-nodes-edenai`), não um servidor MCP.

---

## Uso básico

- **Base URL / SDK:** Base URL `https://api.edenai.run/v3` (endpoint de chat: `https://api.edenai.run/v3/chat/completions`). Endpoint é **OpenAI-compatible** — use o SDK oficial da OpenAI (`pip install openai` / `npm i openai`) apontando `base_url` para `https://api.edenai.run/v3`. Modelos no formato `provider/model` (ex.: `openai/gpt-4o`, `anthropic/claude-sonnet-4-5`).
- **Autenticação:** Bearer token no header — `Authorization: Bearer <EDENAI_API_KEY>`. A chave é gerada no IAM/dashboard da conta Eden AI.
- **Exemplo mínimo (curl, chave injetada pelo Infisical):**

```bash
infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- \
  curl -X POST https://api.edenai.run/v3/chat/completions \
    -H "Authorization: Bearer $EDENAI_API_KEY" \
    -H "Content-Type: application/json" \
    -d '{"model":"openai/gpt-4o","messages":[{"role":"user","content":"Olá!"}]}'
```

Exemplo com SDK OpenAI em Python (chave via env injetada):

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["EDENAI_API_KEY"],  # injetada por: infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- python ...
    base_url="https://api.edenai.run/v3",
)
resp = client.chat.completions.create(
    model="openai/gpt-4o",
    messages=[{"role": "user", "content": "Olá!"}],
)
print(resp.choices[0].message.content)
```

---

## Notas Kolden

- Útil como camada única de roteamento/fallback de LLMs e features de IA (OCR, visão, áudio, tradução) sem manter contas por provedor — bom para os fluxos de copy/automação do squad e para tarefas multimodais pontuais.
- Por ser OpenAI-compatible, dá pra reusar código/SDK existente só trocando `base_url` e a chave (`EDENAI_API_KEY` via Infisical), sem reescrever integrações.
- Sempre resolver a chave em runtime com `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- <comando>`; nunca colocar em `.env` versionado nem hardcode.
