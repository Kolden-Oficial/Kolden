---
tipo: ferramenta
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/_MOC-ferramentas]]"
---

# Vercel — Referência de Uso

Vercel é uma plataforma de cloud para deploy e hospedagem de aplicações front-end e serverless (Next.js, funções, sites estáticos), com previews automáticos por commit e CI/CD integrado ao Git. Categoria: Infra/Deploy.

---

## Credenciais (Infisical)

| Credencial | Caminho Infisical |
|------------|-------------------|
| VERCEL_API_TOKEN | `/kolden/prod/VERCEL_API_TOKEN` |

> Art. VII (Constituição Kolden): nunca o valor — só o caminho. Resolver em runtime via `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- <comando>`.

---

## Fontes confiáveis

| Tipo | Link |
|------|------|
| Documentação oficial | https://vercel.com/docs |
| Referência da API | https://vercel.com/docs/rest-api |
| Repositório GitHub | https://github.com/vercel/vercel |
| Fórum / Comunidade | https://community.vercel.com/ |
| Changelog / Status | https://vercel.com/changelog e https://www.vercel-status.com/ |

---

## MCP (Model Context Protocol)

- **Disponível?** sim — oficial (Vercel MCP, endpoint remoto com OAuth)
- **Repositório:** n/a (servidor remoto hospedado em `https://mcp.vercel.com`; não é um pacote local)
- **Instalação:** `claude mcp add --transport http vercel https://mcp.vercel.com`
  - Alternativa multi-cliente: `npx add-mcp https://mcp.vercel.com`
  - Após adicionar, autenticar via OAuth digitando `/mcp` no Claude Code.

---

## Uso básico

- **Base URL / SDK:**
  - API REST: `https://api.vercel.com`
  - SDK oficial TypeScript: `@vercel/sdk` (npm) — instalar com `npm add @vercel/sdk` (ESM-only)
  - Doc do SDK: https://vercel.com/docs/rest-api/sdk
- **Autenticação:** Access Token enviado no header HTTP `Authorization: Bearer <TOKEN>`. Tokens são criados/gerenciados em Account Settings → Tokens e podem ser escopados por Team.
- **Exemplo mínimo (curl, com a chave injetada pelo Infisical — nunca literal):**

```bash
infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- \
  curl "https://api.vercel.com/v6/deployments" \
  -H "Authorization: Bearer $VERCEL_API_TOKEN"
```

Exemplo com SDK (Node, token via env injetada pelo Infisical):

```js
import { Vercel } from "@vercel/sdk";

const vercel = new Vercel({ bearerToken: process.env.VERCEL_API_TOKEN });
const { deployments } = await vercel.deployments.getDeployments({});
console.log(deployments);
```

Rodar com: `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- node script.js`

---

## Notas Kolden

- Usar sempre `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- <comando>` para injetar `VERCEL_API_TOKEN`; nunca colar o valor da chave em código, scripts ou .env versionado.
- Para operações interativas via agente (inspecionar deployments, ler logs de build/runtime, disparar deploys, buscar docs), preferir o Vercel MCP oficial (`https://mcp.vercel.com`), que usa OAuth e dá ao agente o mesmo acesso da conta — confirmação humana recomendada para ações destrutivas.
- Para automações programáticas (CI, scripts), usar a API REST (`https://api.vercel.com`) ou o SDK `@vercel/sdk` com o token do Infisical.
