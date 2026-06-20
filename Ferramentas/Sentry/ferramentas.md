# Sentry — Referência de Uso

Sentry é uma plataforma de observabilidade para monitoramento de erros, performance e rastreamento de exceções em aplicações, ajudando equipes a detectar, diagnosticar e corrigir problemas em produção. Categoria: Observabilidade.

---

## Credenciais (Infisical)

| Credencial | Caminho Infisical |
|------------|-------------------|
| SENTRY_AUTH_TOKEN | `/kolden/prod/SENTRY_AUTH_TOKEN` |
| SENTRY_ORG_AUTH_TOKEN | `/kolden/prod/SENTRY_ORG_AUTH_TOKEN` |

> Art. VII (Constituição Kolden): nunca o valor — só o caminho. Resolver em runtime via `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- <comando>`.

---

## Fontes confiáveis

| Tipo | Link |
|------|------|
| Documentação oficial | https://docs.sentry.io/ |
| Referência da API | https://docs.sentry.io/api/ |
| Repositório GitHub | https://github.com/getsentry/sentry |
| Fórum / Comunidade | https://forum.sentry.io/ (e Discord: https://discord.com/invite/sentry) |
| Changelog / Status | https://sentry.io/changelog/ (Status: https://status.sentry.io/) |

---

## MCP (Model Context Protocol)

- **Disponível?** sim — oficial (publicado por `getsentry`)
- **Repositório:** https://github.com/getsentry/sentry-mcp
- **Instalação:**
  - Remoto (HTTP, OAuth — nada a instalar, hospedado em `https://mcp.sentry.dev/mcp`):
    `claude mcp add --transport http sentry https://mcp.sentry.dev/mcp`
  - Local (stdio, via npx — útil para Sentry self-hosted):
    `claude mcp add --transport stdio getsentry-sentry-mcp -- npx -y @sentry/mcp-server`

---

## Uso básico

- **Base URL / SDK:** API REST em `https://sentry.io/api/0/` (região US). SDKs oficiais por linguagem, ex.: `@sentry/node` / `@sentry/browser` (npm), `sentry-sdk` (pip). CLI oficial: `@sentry/cli` (https://github.com/getsentry/sentry-cli).
- **Autenticação:** Bearer token no header `Authorization`. Tokens são criados em User Settings > Auth Tokens (user auth token) ou via Organization Auth Tokens (org-level). Os escopos do token determinam quais endpoints podem ser acessados (403 se fora de escopo).
- **Exemplo mínimo:** (token injetado pelo Infisical como variável de ambiente, nunca literal)

```bash
infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- \
  curl https://sentry.io/api/0/organizations/ \
    -H "Authorization: Bearer $SENTRY_AUTH_TOKEN"
```

Exemplo SDK (Node, DSN também resolvido via Infisical):

```bash
infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- node -e "
const Sentry = require('@sentry/node');
Sentry.init({ dsn: process.env.SENTRY_DSN });
Sentry.captureException(new Error('teste Kolden'));
"
```

---

## Notas Kolden

- Uso recomendado como camada de observabilidade dos projetos do Kolden (ex.: backends de automação, app Omiron, integrações GHL): capturar exceções, performance e alertas.
- O `SENTRY_ORG_AUTH_TOKEN` (org-level) é o indicado para CI/CD e upload de source maps / releases via `sentry-cli`; o `SENTRY_AUTH_TOKEN` (user/projeto) para chamadas pontuais à API.
- Para automação assistida por IA, preferir o MCP oficial remoto (`https://mcp.sentry.dev/mcp`) que dá acesso a issues, erros, projetos e análise Seer sem expor a chave manualmente.
- Sempre resolver credenciais em runtime via `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod` — nunca colar o valor do token em arquivos ou comandos.
