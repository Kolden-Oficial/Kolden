# v0 (Vercel v0) — Referência de Uso

v0 é o sistema de geração de UI da Vercel: a partir de linguagem natural (ou imagens) gera apps web full stack e componentes React baseados em shadcn/ui + Tailwind CSS. Categoria: IA/Dev. A Platform API permite gerar e gerenciar esses apps programaticamente.

---

## Credenciais (Infisical)

| Credencial | Caminho Infisical |
|------------|-------------------|
| V0_API_TOKEN | `/kolden/dev/V0_API_TOKEN` |

> Art. VII (Constituição Kolden): nunca o valor — só o caminho. Resolver em runtime via `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=dev -- <comando>`.

---

## Fontes confiáveis

| Tipo | Link |
|------|------|
| Documentação oficial | https://v0.app/docs/quickstart |
| Referência da API | https://v0.app/docs/api/platform/overview |
| Repositório GitHub | https://github.com/vercel/v0-sdk |
| Fórum / Comunidade | https://community.vercel.com/c/v0/59 |
| Changelog / Status | https://vercel.com/changelog (status: https://www.vercel-status.com/) |

---

## MCP (Model Context Protocol)

- **Disponível?** sim — **oficial** (v0 MCP server hospedado pela Vercel). Também existe alternativa de comunidade (`hellolucky/v0-mcp` e `m2rads/v0-mcp`).
- **Repositório:** oficial = endpoint remoto hospedado, sem repo público de instalação (doc: https://v0.app/docs/api/platform/adapters/mcp-server). Comunidade: https://github.com/hellolucky/v0-mcp
- **Instalação (oficial, endpoint remoto):**
  ```bash
  # Endpoint oficial: https://mcp.v0.dev
  # Autenticação por header: Authorization: Bearer ${V0_API_KEY}
  claude mcp add --transport http v0 https://mcp.v0.dev \
    --header "Authorization: Bearer ${V0_API_KEY}"
  ```
  > Injete a chave via Infisical, sem literal:
  > `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=dev -- bash -c 'claude mcp add --transport http v0 https://mcp.v0.dev --header "Authorization: Bearer $V0_API_TOKEN"'`
- **Instalação (comunidade `hellolucky/v0-mcp`, local):** `claude mcp add v0-mcp -- node $(pwd)/dist/main.js` (requer `V0_API_KEY` no ambiente)

---

## Uso básico

- **Base URL / SDK:** Base URL da API REST = `https://api.v0.dev` (a variante `/v1` aparece em clientes). SDK oficial TypeScript: pacote npm `v0-sdk` (`npm install v0-sdk`).
- **Autenticação:** API key obtida em `v0.dev/chat/settings/keys`. O cliente padrão lê automaticamente da variável de ambiente `V0_API_KEY`. Requer plano Premium/Team com usage-based billing habilitado (API em beta).
  > No Kolden, exporte `V0_API_KEY` a partir do segredo `V0_API_TOKEN` ao rodar via Infisical.
- **Exemplo mínimo (SDK, chave injetada pelo Infisical):**
  ```bash
  infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=dev -- bash -c 'V0_API_KEY="$V0_API_TOKEN" node app.js'
  ```
  ```javascript
  // app.js
  import { v0 } from 'v0-sdk' // lê process.env.V0_API_KEY automaticamente

  const chat = await v0.chats.create({
    message: 'Create a responsive navbar with Tailwind CSS',
    system: 'You are an expert React developer',
  })
  console.log(`Chat criado: ${chat.webUrl}`)
  ```
- **Exemplo mínimo (curl, chave nunca literal):**
  ```bash
  infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=dev -- bash -c '
    curl https://api.v0.dev/v1/chats \
      -H "Authorization: Bearer $V0_API_TOKEN" \
      -H "Content-Type: application/json" \
      -d "{\"message\":\"Create a pricing page\"}"
  '
  ```

---

## Notas Kolden

- Uso típico: geração programática de UIs/landing pages (ex.: páginas de funil, LPs Telegram→Shopee) e componentes React via Platform API ou via MCP server dentro do Claude Code/IDE.
- Sempre resolver `V0_API_TOKEN` em runtime pelo Infisical (`/kolden/dev`); nunca commitar a chave nem expô-la em config de MCP literal.
- Atenção a custo: API em beta exige plano pago com usage-based billing — monitorar consumo antes de automações em escala.
