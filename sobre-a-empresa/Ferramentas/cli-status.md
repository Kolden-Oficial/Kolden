---
tipo: ferramenta
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/_MOC-ferramentas]]"
relacionado:
  - "[[sobre-a-empresa/Ferramentas/ferramentas|ferramentas]]"
---

# CLI Status — Ferramentas do Kolden

CLIs de fornecedor instalados na máquina e validados com os tokens do Infisical (auth
não-interativa, sem login no navegador). Atualizado em 2026-06-18.

> Padrão de auth: `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- <cmd>`
> injeta o token; quando o CLI espera outro nome de env var, remapeia-se em `bash -c`.
> Nenhuma chave é gravada em texto puro (Art. VII).

## Instalados e autenticados ✔

| CLI | Versão | Instalação | Auth validada (env do Infisical) | Resultado |
|-----|--------|-----------|----------------------------------|-----------|
| gh (GitHub) | 2.95.0 | winget `GitHub.cli` | `GH_TOKEN=$GITHUB_ACCESS_TOKEN` | usuário **Koldenoficial** |
| vercel | 54.14.2 | npm `vercel` | `--token $VERCEL_API_TOKEN` | conta **kolden** |
| wrangler (Cloudflare) | 4.102.0 | npm `wrangler` | `CLOUDFLARE_API_TOKEN` | conta **Kolden** |
| supabase | 2.107.0 | npm `supabase` | `SUPABASE_ACCESS_TOKEN=$SUPABASE_API_TOKEN` | projetos **Kolden**, **Cata Logo** |
| sentry-cli | 3.5.1 | npm `@sentry/cli` | `SENTRY_AUTH_TOKEN` | usuário **adm@kolden.com.br** |

## Instalados com pendência ⚠️

| CLI | Versão | Pendência |
|-----|--------|-----------|
| railway | 5.15.0 | Instalado, mas `RAILWAY_API_TOKEN` retorna **Unauthorized** (token inválido/sem acesso). Precisa de um token de conta Railway válido no Infisical. |
| neonctl | instalado | `--version` trava no startup nesta máquina **e** exige uma **Neon API key** (não temos; só a `DATABASE_URL`). Ver follow-up Neon. |

## Não instalado ⏳

| CLI | Motivo | Como instalar |
|-----|--------|---------------|
| dg (Deepgram) | Não há pacote oficial em npm/winget/pip — o `dg` é um binário do GitHub releases | Baixar de https://github.com/deepgram/cli/releases e pôr no PATH; auth por `DEEPGRAM_API_KEY` |

---

## Exemplos de uso (sempre via Infisical)

```bash
PID=43d90b85-ca09-437c-b8f2-364b5cbe6093
# GitHub
infisical run --projectId=$PID --env=prod -- bash -c 'GH_TOKEN="$GITHUB_ACCESS_TOKEN" gh repo list'
# Vercel
infisical run --projectId=$PID --env=prod -- bash -c 'vercel ls --token "$VERCEL_API_TOKEN"'
# Cloudflare (wrangler lê CLOUDFLARE_API_TOKEN do ambiente)
infisical run --projectId=$PID --env=prod -- wrangler whoami
# Supabase
infisical run --projectId=$PID --env=prod -- bash -c 'SUPABASE_ACCESS_TOKEN="$SUPABASE_API_TOKEN" supabase projects list'
# Sentry
infisical run --projectId=$PID --env=prod -- sentry-cli info
```
