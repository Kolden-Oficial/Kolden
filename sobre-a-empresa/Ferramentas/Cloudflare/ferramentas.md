# Cloudflare — Referência de Uso

Cloudflare é uma plataforma global de infraestrutura e segurança (CDN, DNS, WAF, Workers/serverless, Pages, R2, túneis, Zero Trust). Categoria: Infra/Deploy. Toda a infraestrutura é controlável via API REST programática.

---

## Credenciais (Infisical)

| Credencial | Caminho Infisical |
|------------|-------------------|
| CLOUDFLARE_ACCOUNT_ID | `/kolden/prod/CLOUDFLARE_ACCOUNT_ID` |
| CLOUDFLARE_API_TOKEN | `/kolden/prod/CLOUDFLARE_API_TOKEN` |

> Art. VII (Constituição Kolden): nunca o valor — só o caminho. Resolver em runtime via `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- <comando>`.

---

## Fontes confiáveis

| Tipo | Link |
|------|------|
| Documentação oficial | https://developers.cloudflare.com/ |
| Referência da API | https://developers.cloudflare.com/api/ |
| Repositório GitHub | https://github.com/cloudflare/cloudflare-docs |
| Fórum / Comunidade | https://community.cloudflare.com/ |
| Changelog / Status | https://developers.cloudflare.com/changelog/ e https://www.cloudflarestatus.com/ |

---

## MCP (Model Context Protocol)

- **Disponível?** sim — **oficial** (mantido pela Cloudflare). São 13+ servidores MCP remotos por domínio (Docs, Workers Bindings, Workers Builds, Observability, Radar, Browser Rendering, Logpush, AI Gateway, Audit Logs, DNS Analytics, DEX, CASB, GraphQL) mais um servidor único que cobre toda a API.
- **Repositório:** https://github.com/cloudflare/mcp-server-cloudflare (servidores por domínio) e https://github.com/cloudflare/mcp (servidor token-efficient da API inteira)
- **Instalação:** servidores remotos via OAuth — adicione a URL ao cliente MCP. Exemplos de URLs:
  - API completa: `https://mcp.cloudflare.com/mcp`
  - Documentação: `https://docs.mcp.cloudflare.com/mcp`
  - Workers Bindings: `https://bindings.mcp.cloudflare.com/mcp`
  - Observability: `https://observability.mcp.cloudflare.com/mcp`

  Adicionar no Claude Code (transporte remoto/HTTP):
  ```
  claude mcp add --transport http cloudflare https://mcp.cloudflare.com/mcp
  ```
  Clientes sem suporte nativo a MCP remoto podem usar a ponte `mcp-remote`:
  ```
  npx mcp-remote https://mcp.cloudflare.com/mcp
  ```
  Na primeira conexão você é redirecionado ao Cloudflare para autorizar via OAuth.

---

## Uso básico

- **Base URL / SDK:**
  - Base URL da API REST (v4): `https://api.cloudflare.com/client/v4/`
  - SDK TypeScript/Node (oficial): `npm install cloudflare` (repo: https://github.com/cloudflare/cloudflare-typescript)
  - SDK Python (oficial): `pip install cloudflare` (repo: https://github.com/cloudflare/cloudflare-python)
- **Autenticação:** API Token via header padrão RFC `Authorization: Bearer <CLOUDFLARE_API_TOKEN>`. O `CLOUDFLARE_ACCOUNT_ID` identifica a conta nos endpoints que o exigem (ex.: `/accounts/{account_id}/...`). Tokens são escopados/permissionados — prefira tokens a Global API Keys.
- **Exemplo mínimo (curl, com Infisical injetando as variáveis):**
  ```bash
  infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- bash -c '
    curl "https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/tokens/verify" \
      --header "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}"
  '
  ```
  Exemplo com SDK Node (a variável é lida do ambiente injetado pelo Infisical, nunca literal):
  ```bash
  infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- node -e '
    const Cloudflare = require("cloudflare");
    const cf = new Cloudflare({ apiToken: process.env.CLOUDFLARE_API_TOKEN });
    cf.accounts.list().then(r => console.log(r));
  '
  ```

---

## Notas Kolden

- Categoria Infra/Deploy: usar para DNS, CDN/WAF, deploy serverless (Workers/Pages), storage R2 e túneis Zero Trust dos projetos Kolden (ex.: hospedagem de landing pages, APIs edge).
- Sempre resolver credenciais em runtime via `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod`; nunca commitar token nem account ID em código ou `.env` versionado.
- O servidor MCP oficial remoto (`https://mcp.cloudflare.com/mcp`) permite operar a conta por linguagem natural diretamente no Claude Code, com autorização OAuth — alternativa aos chamados curl/SDK para tarefas interativas.
