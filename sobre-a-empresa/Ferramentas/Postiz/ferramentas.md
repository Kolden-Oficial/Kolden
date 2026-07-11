---
tipo: ferramenta
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/_MOC-ferramentas]]"
---

# Postiz — Publicação & Agendamento Social (self-host)

**Categoria:** Marketing / Publicação social
**Usado por:** squad **Pheme** (agente `publisher`)
**MCP:** 🟡 comunidade (via `postiz-agent` CLI / API REST) — não é MCP oficial

## O que é
Ferramenta open-source de agendamento e publicação agêntica em redes sociais
(`gitroomhq/postiz-app`, ~32k★). Cobre Instagram, TikTok, YouTube, LinkedIn, X,
Pinterest, Threads, Facebook, Bluesky, Mastodon. É o **canal principal de
publicação** da Kolden. O `postiz-agent` conecta o Postiz ao Claude Code.

## Credenciais (Infisical — a cadastrar)
| Chave | Caminho | Função |
|-------|---------|--------|
| `POSTIZ_API_KEY` | `/kolden/prod/POSTIZ_API_KEY` | API key gerada no painel (Settings → API) |
| `POSTIZ_API_URL` | `/kolden/prod/POSTIZ_API_URL` | URL base da instância self-host |
| `POSTIZ_JWT_SECRET` | `/kolden/prod/POSTIZ_JWT_SECRET` | Segredo do container Postiz |
| (por rede) | `/kolden/prod/POSTIZ_<REDE>_TOKEN` | Tokens OAuth de cada conta conectada |

> Resolver em runtime: `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- <comando>`.

## Setup e uso
Guia completo em `Pheme/.claude/skills/publicacao-social/SKILL.md` (subir via Docker,
conectar contas, publicar/agendar com `postiz-agent` ou API REST).

## Fontes confiáveis
- App: https://github.com/gitroomhq/postiz-app
- Agent (CLI p/ Claude): https://github.com/gitroomhq/postiz-agent
- Node n8n: https://github.com/gitroomhq/postiz-n8n
- Docs: https://docs.postiz.com

## Notas Kolden
- Canal **alternativo** de publicação: GoHighLevel (ver `GoHighLevel/ferramentas.md`).
- Publicação só após o checklist `Pheme/checklists/qualidade-conteudo.md` (gate) + revisão de marca.
- Status de deploy: **pendente** (subir self-host e conectar contas).
