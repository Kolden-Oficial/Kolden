# Upstash — Referência de Uso

Plataforma de dados serverless (Redis, Vector, QStash/mensageria e Workflow) com cobrança por uso e API REST. Categoria: Infra/Dados.

---

## Credenciais (Infisical)

| Credencial | Caminho Infisical |
|------------|-------------------|
| UPSTASH_API_KEY | `/kolden/prod/UPSTASH_API_KEY` |

> Art. VII (Constituição Kolden): nunca o valor — só o caminho. Resolver em runtime via `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- <comando>`.

---

## Fontes confiáveis

| Tipo | Link |
|------|------|
| Documentação oficial | https://upstash.com/docs (espelho: https://developer.upstash.com/) |
| Referência da API | https://upstash.com/docs/devops/developer-api/introduction |
| Repositório GitHub | https://github.com/upstash |
| Fórum / Comunidade | https://upstash.com/discord |
| Changelog / Status | https://status.upstash.com/ |

---

## MCP (Model Context Protocol)

- **Disponível?** sim — oficial (mantido pela organização Upstash). Gerencia e depura recursos Upstash (Redis, QStash, Workflow, Upstash Box) via agente.
- **Repositório:** https://github.com/upstash/mcp-server
- **Instalação:**
  ```
  claude mcp add --scope user upstash -- npx -y @upstash/mcp-server@latest --email YOUR_EMAIL --api-key YOUR_API_KEY
  ```
  Suporta API keys readonly (desabilitam automaticamente todas as tools que modificam estado). Para a maioria dos fluxos, a doc recomenda usar a Upstash Skill + `@upstash/cli` em vez do MCP server.

> Observação: existe também o MCP `@upstash/context7` (https://github.com/upstash/context7), que é um produto distinto (documentação de bibliotecas atualizada para LLMs), não o gerenciador de recursos Upstash.

---

## Uso básico

- **Base URL / SDK:**
  - Developer/Management API (gerência de recursos): `https://api.upstash.com/v2` (ex.: `GET /v2/redis/databases`).
  - REST de um banco Redis específico: `https://<database-name>.upstash.io`.
  - SDK oficial: `@upstash/redis` (npm), `@upstash/qstash`, `@upstash/vector` (Node/TS); cliente Python `upstash-redis` (pip).
- **Autenticação:**
  - Developer/Management API: HTTP Basic Auth — e-mail da conta como usuário e a API key como senha. A key é criada em Console → Account → Management API → Create API Key (mostrada uma única vez).
  - REST de banco Redis: header `Authorization: Bearer <REST_TOKEN>` do próprio banco.
- **Exemplo mínimo (Management API, via Infisical):**
  ```bash
  # e-mail da conta em UPSTASH_EMAIL; chave injetada como UPSTASH_API_KEY
  infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- \
    curl -s -u "$UPSTASH_EMAIL:$UPSTASH_API_KEY" \
    https://api.upstash.com/v2/redis/databases
  ```
  ```bash
  # MCP server com a chave injetada pelo Infisical (nunca literal)
  infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- \
    npx -y @upstash/mcp-server@latest --email "$UPSTASH_EMAIL" --api-key "$UPSTASH_API_KEY"
  ```

---

## Notas Kolden

- Uso típico: cache/estado serverless (Redis), filas e agendamento (QStash) e busca vetorial (Vector) para agentes e automações — pago por requisição, bom para cargas intermitentes.
- Sempre resolver `UPSTASH_API_KEY` em runtime via Infisical (`/kolden/prod`); nunca colocar a chave em arquivos, env commitados ou comandos `claude mcp add` literais. Use uma key readonly quando o agente só precisa inspecionar/depurar recursos.
