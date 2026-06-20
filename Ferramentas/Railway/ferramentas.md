# Railway — Referência de Uso

Railway é uma plataforma de infraestrutura/deploy (PaaS) que permite provisionar, fazer deploy e escalar aplicações, bancos de dados e serviços a partir de repositórios Git ou imagens, com gerenciamento via dashboard, CLI e API pública. Categoria: Infra/Deploy.

---

## Credenciais (Infisical)

| Credencial | Caminho Infisical |
|------------|-------------------|
| RAILWAY_API_TOKEN | `/kolden/prod/RAILWAY_API_TOKEN` |

> Art. VII (Constituição Kolden): nunca o valor — só o caminho. Resolver em runtime via `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- <comando>`.

---

## Fontes confiáveis

| Tipo | Link |
|------|------|
| Documentação oficial | https://docs.railway.com/ |
| Referência da API | https://docs.railway.com/reference/public-api |
| Repositório GitHub | https://github.com/railwayapp (CLI: https://github.com/railwayapp/cli) |
| Fórum / Comunidade | https://station.railway.com/ (Help Station / Central Station) |
| Changelog / Status | Changelog: https://railway.com/changelog — Status: https://status.railway.com/ |

---

## MCP (Model Context Protocol)

- **Disponível?** sim — oficial (mantido pela Railway / org `railwayapp`)
- **Repositório:** https://github.com/railwayapp/railway-mcp-server (arquivado em 23/05/2026; substituído pela instalação via CLI)
- **Instalação:**
  - Local (recomendado): instale a Railway CLI e rode `railway mcp install` (ou `railway setup agent`)
  - Remoto: `railway setup agent --remote` (endpoint hospedado em `mcp.railway.com`, autenticação via OAuth no navegador)
  - Shim legado (não recomendado): `npx -y @railway/mcp-server`

> Instalação da CLI: `bash <(curl -fsSL https://railway.com/install.sh)` (também disponível via Homebrew, npm, Scoop e binários pré-compilados).

---

## Uso básico

- **Base URL / SDK:** API pública GraphQL em `https://backboard.railway.com/graphql/v2` (mesma API que alimenta o dashboard). Suporta introspection — usável via Postman/Insomnia/GraphiQL. CLI oficial: `railway` (instalável via `npm i -g @railway/cli`).
- **Autenticação:** Tokens de conta/workspace/OAuth usam o header `Authorization: Bearer <TOKEN>`. Tokens de projeto usam header diferente: `Project-Access-Token: <TOKEN>`. Os tokens são criados no dashboard da Railway. Rate limits: 100 RPH (Free), 1000 RPH (Hobby), 10000 RPH (Pro), custom (Enterprise).
- **Exemplo mínimo** (a chave é injetada pelo Infisical como `RAILWAY_API_TOKEN`, nunca escrita literalmente):

```bash
infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- bash -c '
  curl --request POST \
    --url https://backboard.railway.com/graphql/v2 \
    --header "Authorization: Bearer $RAILWAY_API_TOKEN" \
    --header "Content-Type: application/json" \
    --data "{\"query\":\"query { me { name email } }\"}"
'
```

Via CLI (também com o token injetado pelo Infisical):

```bash
infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- railway whoami
```

---

## Notas Kolden

- Railway tende a ser usado no Kolden como plataforma de deploy/hospedagem de serviços e APIs (ex.: backends de automação como GHL, app Omiron, ou MCP servers próprios).
- Preferir sempre resolver `RAILWAY_API_TOKEN` em runtime via `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- ...`; nunca colar o valor em scripts, `.env` versionados ou configs de MCP.
- Para integração com agentes (Claude Code), o MCP oficial via `railway mcp install` é o caminho indicado; a variante remota OAuth evita expor o token de CLI localmente.
