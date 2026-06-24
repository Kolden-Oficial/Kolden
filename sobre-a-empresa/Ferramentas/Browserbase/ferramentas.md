# Browserbase — Referência de Uso

Plataforma de navegadores headless na nuvem (Puppeteer, Playwright, Selenium e o SDK Stagehand com IA) para automação web e agentes que navegam e interagem com sites como humanos. Categoria: Browser.

---

## Credenciais (Infisical)

| Credencial | Caminho Infisical |
|------------|-------------------|
| BROWSERBASE_API_KEY | `/kolden/prod/BROWSERBASE_API_KEY` |
| BROWSERBASE_PROJECT_ID | `/kolden/prod/BROWSERBASE_PROJECT_ID` |

> Art. VII (Constituição Kolden): nunca o valor — só o caminho. Resolver em runtime via `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- <comando>`.

---

## Fontes confiáveis

| Tipo | Link |
|------|------|
| Documentação oficial | https://docs.browserbase.com/introduction/what-is-browserbase |
| Referência da API | https://docs.browserbase.com/reference/api/overview |
| Repositório GitHub | https://github.com/browserbase (SDKs: https://github.com/browserbase/sdk-node e https://github.com/browserbase/sdk-python) |
| Fórum / Comunidade | Discord (link no rodapé/seção de suporte de https://docs.browserbase.com) — URL direta de convite: não encontrado |
| Changelog / Status | Changelog: https://www.browserbase.com/changelog — Status: https://status.browserbase.com/ |

---

## MCP (Model Context Protocol)

- **Disponível?** sim — oficial (mantido pela Browserbase)
- **Repositório:** https://github.com/browserbase/mcp-server-browserbase (pacote npm `@browserbasehq/mcp`)
- **Instalação:**
  - Hosted (recomendado, remoto): adicionar como servidor MCP com a URL
    `https://mcp.browserbase.com/mcp?browserbaseApiKey=$BROWSERBASE_API_KEY`
  - Self-hosted (local via npx):
    `claude mcp add browserbase -e BROWSERBASE_API_KEY=$BROWSERBASE_API_KEY -e BROWSERBASE_PROJECT_ID=$BROWSERBASE_PROJECT_ID -- npx @browserbasehq/mcp`
  - Obs.: o servidor usa Stagehand; a versão hosted fornece o modelo (Gemini). Na versão self-hosted pode ser necessário `GEMINI_API_KEY`.

---

## Uso básico

- **Base URL / SDK:**
  - API REST base: `https://api.browserbase.com/v1`
  - SDK Node: `npm i @browserbasehq/sdk`
  - SDK Python: `pip install browserbase`
  - SDK de agentes com IA: Stagehand (act / extract / observe sobre Playwright)
- **Autenticação:** header `X-BB-API-Key: <BROWSERBASE_API_KEY>`. A maioria das chamadas (ex.: criar sessão) também exige o `projectId` (BROWSERBASE_PROJECT_ID) no corpo da requisição.
- **Exemplo mínimo (curl, criar sessão — chave injetada pelo Infisical):**

```bash
infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- \
  curl -s -X POST https://api.browserbase.com/v1/sessions \
    -H "X-BB-API-Key: $BROWSERBASE_API_KEY" \
    -H "Content-Type: application/json" \
    -d "{\"projectId\": \"$BROWSERBASE_PROJECT_ID\"}"
```

- **Exemplo mínimo (Node SDK):**

```javascript
// infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- node script.js
import Browserbase from "@browserbasehq/sdk";

const bb = new Browserbase({ apiKey: process.env.BROWSERBASE_API_KEY });
const session = await bb.sessions.create({
  projectId: process.env.BROWSERBASE_PROJECT_ID,
});
console.log(session.connectUrl); // usar com Playwright/Puppeteer/Selenium
```

---

## Notas Kolden

- Uso típico: dar a agentes (ex.: scraping, automação de funis, verificação de páginas) navegadores headless na nuvem sem manter infraestrutura local de Chrome.
- Preferir o MCP hosted para integração rápida com Claude Code; a versão self-hosted (`npx @browserbasehq/mcp`) quando for necessário controle local.
- Sempre injetar `BROWSERBASE_API_KEY` e `BROWSERBASE_PROJECT_ID` via `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod` — nunca colar valores literais em scripts, configs MCP ou `.env` versionado.
