---
tipo: ferramenta
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/_MOC-ferramentas]]"
---

# Neon — Referência de Uso

Neon é uma plataforma de Postgres serverless que separa armazenamento e computação para oferecer autoscaling, branching de banco (como código), instant restore e scale-to-zero. Totalmente compatível com Postgres. Categoria: Banco de dados.

---

## Credenciais (Infisical)

| Credencial | Caminho Infisical |
|------------|-------------------|
| DATABASE_URL | `/kolden/prod/DATABASE_URL` |

> Art. VII (Constituição Kolden): nunca o valor — só o caminho. Resolver em runtime via `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- <comando>`.

---

## Fontes confiáveis

| Tipo | Link |
|------|------|
| Documentação oficial | https://neon.com/docs/introduction |
| Referência da API | https://neon.com/docs/reference/api-reference (interativa: https://api-docs.neon.tech/reference/authentication) |
| Repositório GitHub | https://github.com/neondatabase/neon |
| Fórum / Comunidade | https://neon.com/discord (Discord oficial) |
| Changelog / Status | https://neonstatus.com (status) — changelog: https://neon.com/docs/changelog |

---

## MCP (Model Context Protocol)

- **Disponível?** sim — oficial (Neon)
- **Repositório:** https://github.com/neondatabase/mcp-server-neon
- **Instalação:**
  - Remoto (recomendado): `npx add-mcp https://mcp.neon.tech/mcp` — ou no Claude Code: `claude mcp add --transport http neon https://mcp.neon.tech/mcp`
  - Local (npx + chave): `npx @neondatabase/mcp-server-neon init $NEON_API_KEY`
  - Setup automatizado: `npx neonctl@latest init`

> O servidor MCP usa a Neon Management API (criar projetos/branches, rodar queries, migrações). Endpoint remoto: `https://mcp.neon.tech/mcp` (o `/sse` está deprecado).

---

## Uso básico

- **Base URL / SDK:**
  - Management API REST: `https://console.neon.tech/api/v2/`
  - SDK serverless driver (npm): `@neondatabase/serverless` (`npm install @neondatabase/serverless`) — drop-in replacement do `pg`, via HTTP/WebSockets, ideal para edge/serverless. JSR: `@neon/serverless`.
  - CLI: `neonctl` (`npm install -g neonctl`).
- **Autenticação:**
  - Conexão ao banco: usar a connection string completa em `DATABASE_URL` (formato `postgresql://user:pass@host/db?sslmode=require`).
  - Management API: header `Authorization: Bearer $NEON_API_KEY` (chave de 64 bits gerada no Neon Console — esta é separada da `DATABASE_URL`).
- **Exemplo mínimo (driver serverless, usando env injetada pelo Infisical):**

```js
// rode com: infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- node app.js
import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL); // nunca a credencial literal
const rows = await sql`SELECT now()`;
console.log(rows);
```

  - Exemplo via psql:

```bash
infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- psql "$DATABASE_URL" -c "SELECT version();"
```

  - Exemplo Management API (requer NEON_API_KEY, não a DATABASE_URL):

```bash
curl 'https://console.neon.tech/api/v2/projects' \
  -H 'Accept: application/json' \
  -H "Authorization: Bearer $NEON_API_KEY"
```

---

## Notas Kolden

- A `DATABASE_URL` em `/kolden/prod/DATABASE_URL` é a connection string Postgres para uso direto por apps/ORMs (Prisma, Drizzle, node-postgres) e via `psql`. Sempre resolver em runtime com `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- <comando>`, nunca expor o valor.
- Para tarefas administrativas (criar branches efêmeras por feature/PR, rodar migrações, gerenciar projetos) preferir o servidor MCP oficial ou o CLI `neonctl`, que exigem um `NEON_API_KEY` próprio — guardar essa chave também no Infisical se for adotada (caminho a definir).
- Branching de banco é o diferencial Neon: cada ambiente/preview pode ter sua própria branch isolada apontando para a mesma origem, útil para staging e testes do squad sem tocar produção.
