---
tipo: ferramenta
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/_MOC-ferramentas]]"
---

# GitHub — Referência de Uso

GitHub é a plataforma de hospedagem de código baseada em Git para versionamento, colaboração (issues, pull requests), CI/CD (Actions) e automação via API REST/GraphQL. Categoria: Infra/Dev.

---

## Credenciais (Infisical)

| Credencial | Caminho Infisical |
|------------|-------------------|
| GITHUB_ACCESS_TOKEN | `/kolden/prod/GITHUB_ACCESS_TOKEN` |

> Art. VII (Constituição Kolden): nunca o valor — só o caminho. Resolver em runtime via `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- <comando>`.

---

## Fontes confiáveis

| Tipo | Link |
|------|------|
| Documentação oficial | https://docs.github.com |
| Referência da API | https://docs.github.com/en/rest |
| Repositório GitHub | https://github.com/github/github-mcp-server (MCP oficial) / https://github.com/octokit/octokit.js (SDK) |
| Fórum / Comunidade | https://github.com/orgs/community/discussions |
| Changelog / Status | https://github.blog/changelog/ / https://www.githubstatus.com |

---

## MCP (Model Context Protocol)

- **Disponível?** sim — **oficial** (mantido pela própria GitHub)
- **Repositório:** https://github.com/github/github-mcp-server
- **Instalação:**
  - Remoto (HTTP, recomendado): `claude mcp add --transport http github https://api.githubcopilot.com/mcp/ -H "Authorization: Bearer $GITHUB_ACCESS_TOKEN"`
  - Local (Docker): `claude mcp add github -e GITHUB_PERSONAL_ACCESS_TOKEN=$GITHUB_ACCESS_TOKEN -- docker run -i --rm -e GITHUB_PERSONAL_ACCESS_TOKEN ghcr.io/github/github-mcp-server`

> Nota: o pacote antigo `@modelcontextprotocol/server-github` foi descontinuado (abr/2025). Use o servidor oficial `github/github-mcp-server`.

---

## Uso básico

- **Base URL / SDK:** API REST em `https://api.github.com` (v3 por padrão). SDK oficial: `octokit` (npm — `npm install octokit` ou `@octokit/rest`). Para Python a comunidade usa `PyGithub` (`pip install PyGithub`).
- **Autenticação:** envie o token no header `Authorization: Bearer <token>` (ou `token <token>`). O token é um Personal Access Token (PAT) injetado pelo Infisical como variável de ambiente — nunca literal.
- **Exemplo mínimo (curl, via Infisical):**
  ```bash
  infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- \
    curl -s -H "Authorization: Bearer $GITHUB_ACCESS_TOKEN" \
         -H "Accept: application/vnd.github+json" \
         https://api.github.com/user
  ```
- **Exemplo mínimo (Octokit / Node, via Infisical):**
  ```js
  import { Octokit } from "@octokit/rest";
  const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });
  const { data } = await octokit.request("/user");
  ```
  Executar com: `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- node script.js`

---

## Notas Kolden

- Usar o caminho Infisical `/kolden/prod/GITHUB_ACCESS_TOKEN` para qualquer automação (CI, scripts, agentes) que toque repositórios, issues ou PRs.
- Preferir o MCP oficial remoto (`https://api.githubcopilot.com/mcp/`) para integrar agentes Claude ao GitHub sem precisar de Docker local.
- Nunca commitar tokens; resolver sempre em runtime via `infisical run`.
