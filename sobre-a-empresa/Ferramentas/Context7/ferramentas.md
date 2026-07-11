---
tipo: ferramenta
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/_MOC-ferramentas]]"
---

# Context7 — Referência de Uso

Context7 é um serviço (e servidor MCP) da Upstash que fornece documentação de código atualizada e versionada de bibliotecas/frameworks diretamente para LLMs e editores de IA, reduzindo alucinações. Categoria: Busca / Docs.

---

## Credenciais (Infisical)

| Credencial | Caminho Infisical |
|------------|-------------------|
| CONTEXT7_API_KEY | `/kolden/prod/CONTEXT7_API_KEY` |

> Art. VII (Constituição Kolden): nunca o valor — só o caminho. Resolver em runtime via `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- <comando>`.

---

## Fontes confiáveis

| Tipo | Link |
|------|------|
| Documentação oficial | https://context7.com/docs |
| Referência da API | https://context7.com/docs/api-guide |
| Repositório GitHub | https://github.com/upstash/context7 |
| Fórum / Comunidade | https://upstash.com/discord |
| Changelog / Status | https://github.com/upstash/context7/releases |

---

## MCP (Model Context Protocol)

- **Disponível?** sim — **oficial** (mantido pela Upstash/Context7)
- **Repositório:** https://github.com/upstash/context7
- **Instalação (remoto HTTP, recomendado):**
  ```bash
  claude mcp add --scope user --transport http \
    --header "CONTEXT7_API_KEY: ${CONTEXT7_API_KEY}" \
    context7 https://mcp.context7.com/mcp
  ```
- **Instalação (local via npx, stdio):**
  ```bash
  claude mcp add context7 -- npx -y @upstash/context7-mcp --api-key ${CONTEXT7_API_KEY}
  ```
- **URL remota do MCP:** `https://mcp.context7.com/mcp`
- **Ferramentas expostas:** `resolve-library-id` (nome → Context7 ID) e `get-library-docs` / `query-docs` (ID → documentação versionada).

---

## Uso básico

- **Base URL / SDK:**
  - REST API base: `https://context7.com/api/` (v2: `https://context7.com/api/v2/context`)
  - SDK oficial TypeScript: `@upstash/context7-sdk` (npm)
  - Servidor MCP: `@upstash/context7-mcp` (npm) | CLI: `ctx7` (npm)
  - Tools p/ Vercel AI SDK: `@upstash/context7-tools-ai-sdk`
- **Autenticação:** header `Authorization: Bearer <CONTEXT7_API_KEY>`. A chave tem formato `ctx7sk-...`, é criada em https://context7.com/dashboard e exibida apenas uma vez. No MCP remoto a chave vai no header `CONTEXT7_API_KEY`.
- **Exemplo mínimo (curl, chave injetada pelo Infisical — nunca literal):**
  ```bash
  infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- \
    curl "https://context7.com/api/v2/context?libraryId=/vercel/next.js&query=routing" \
      -H "Authorization: Bearer ${CONTEXT7_API_KEY}"
  ```

### Principais endpoints da API v2

| Endpoint | Método | Função |
|----------|--------|--------|
| `/v2/libs/search` | GET | Buscar bibliotecas por nome |
| `/v2/context` | GET | Recuperar trechos de documentação |
| `/v1/refresh` | POST | Atualizar documentação de uma lib |
| `/v2/policies` | GET / PATCH | Políticas de teamspace |
| `/v2/add/repo/{provider}` | POST | Submeter repositório para indexação |

---

## Notas Kolden

- Uso típico: plugar o MCP do Context7 no Claude Code / Cursor para que os agentes consultem documentação atualizada e versionada de libs antes de gerar código (anti-alucinação). Útil para os projetos de automação (GHL, Omiron, Telegram/Shopee) ao trabalhar com SDKs/frameworks em evolução.
- Sempre resolver `CONTEXT7_API_KEY` via Infisical (`/kolden/prod`) em runtime; jamais hardcodar a chave em config de MCP ou scripts. A chave é opcional para uso básico, mas recomendada para limites de taxa maiores.
