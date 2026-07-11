---
tipo: ferramenta
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/_MOC-ferramentas]]"
---

# Google AI Studio (Gemini) — Referência de Uso

Google AI Studio é o IDE web (aistudio.google.com) do Google para prototipar prompts e construir apps com os modelos Gemini, dando acesso à Gemini API. Categoria: IA/LLM.

---

## Credenciais (Infisical)

| Credencial | Caminho Infisical |
|------------|-------------------|
| GOOGLESTUDIO_API_KEY | `/kolden/prod/GOOGLESTUDIO_API_KEY` |
| GOOGLESTUDIO_PROJECT_ID | `/kolden/prod/GOOGLESTUDIO_PROJECT_ID` |

> Art. VII (Constituição Kolden): nunca o valor — só o caminho. Resolver em runtime via `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- <comando>`.

---

## Fontes confiáveis

| Tipo | Link |
|------|------|
| Documentação oficial | https://ai.google.dev/gemini-api/docs |
| Referência da API | https://ai.google.dev/api |
| Repositório GitHub | https://github.com/googleapis/python-genai (Python) e https://github.com/googleapis/js-genai (JS/TS) |
| Fórum / Comunidade | https://discuss.ai.google.dev/c/gemini-api/ |
| Changelog / Status | https://ai.google.dev/gemini-api/docs/changelog |

---

## MCP (Model Context Protocol)

- **Disponível?** sim — apenas comunidade (não há servidor MCP oficial do Google para a Gemini API)
- **Repositório:** https://github.com/bsmi021/mcp-gemini-server (comunidade; wrapper do SDK `@google/genai`). Alternativas: https://github.com/aliargun/mcp-server-gemini
- **Instalação:** `claude mcp add gemini -- npx -y mcp-gemini-server` (servidor comunitário; requer a API key da Gemini via variável de ambiente — ver Notas Kolden)

---

## Uso básico

- **Base URL / SDK:** Base URL REST: `https://generativelanguage.googleapis.com/v1beta/models/`. Endpoint compatível com OpenAI: `https://generativelanguage.googleapis.com/v1beta/openai/`. SDK oficial unificado (Google GenAI SDK): Python `pip install google-genai`, Node `npm install @google/genai`.
- **Autenticação:** API key via header HTTP `x-goog-api-key: <API_KEY>` (não usa `Authorization: Bearer`). Os SDKs leem automaticamente a variável de ambiente `GEMINI_API_KEY` (ou `GOOGLE_API_KEY`).
- **Exemplo mínimo:** (a chave é injetada pelo Infisical; nunca literal)

```bash
infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- bash -c '
curl -s "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent" \
  -H "x-goog-api-key: $GOOGLESTUDIO_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{\"contents\":[{\"parts\":[{\"text\":\"Olá, Gemini\"}]}]}"
'
```

Via SDK Python (variável esperada `GEMINI_API_KEY` apontando para o segredo do Infisical):

```bash
infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- \
  env GEMINI_API_KEY="$GOOGLESTUDIO_API_KEY" python app.py
```

```python
# app.py
from google import genai
client = genai.Client()  # lê GEMINI_API_KEY do ambiente
resp = client.models.generate_content(model="gemini-2.5-flash", contents="Olá, Gemini")
print(resp.text)
```

---

## Notas Kolden

- A Gemini API associa requisições a um projeto Google Cloud para billing/quota — o `GOOGLESTUDIO_PROJECT_ID` cobre esse vínculo quando aplicável (chaves de autorização ligadas a service account / Vertex).
- Padrão Kolden: nunca exportar a chave literal. Use `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- ...` e mapeie `GOOGLESTUDIO_API_KEY` para `GEMINI_API_KEY` apenas em runtime quando o SDK exigir esse nome.
- O SDK antigo `google-generativeai` está deprecado; usar o unificado `google-genai` / `@google/genai`.
- Para uso como MCP server, apenas implementações da comunidade existem hoje — avaliar antes de colocar em produção.
