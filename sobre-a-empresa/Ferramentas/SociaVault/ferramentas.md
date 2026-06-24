# SociaVault — Referência de Uso

SociaVault é uma API REST de dados sociais multi-plataforma (TikTok, Instagram, YouTube, X/Twitter, LinkedIn, Reddit, Pinterest — 25+). Usada para descoberta de vídeos/posts virais por engajamento (likes/views/shares), trending por hashtag/som/criador e scraping de perfis. Filtros por país/nicho/período. Categoria: Dados sociais/Descoberta de virais.

---

## Credenciais (Infisical)

| Credencial | Caminho Infisical |
|------------|-------------------|
| SOCIAVAULT_API_KEY | `/kolden/dev/SOCIAVAULT_API_KEY` |

> Art. VII (Constituição Kolden): nunca o valor — só o caminho. Resolver em runtime via `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=dev -- <comando>`.

---

## Fontes confiáveis

| Tipo | Link |
|------|------|
| Documentação oficial | https://docs.sociavault.com/quickstart |
| Site oficial | https://sociavault.com |
| Pricing | https://sociavault.com/pricing |

---

## MCP (Model Context Protocol)

- **Disponível?** ❌ não — SociaVault é uma API REST pura, sem servidor MCP.
- Consumo direto por HTTP (`curl`, SDK próprio ou cliente HTTP do agente), sempre com a credencial injetada pelo Infisical.

---

## Uso básico

- **Base URL:** `https://api.sociavault.com/v1`
- **Autenticação:** header HTTP `X-API-Key: <SOCIAVAULT_API_KEY>`. Gerencie a chave no painel em https://sociavault.com.
- **Modelo de cobrança:** créditos one-time (não expiram) — consumidos por chamada.
- **Exemplo mínimo:** (a chave é resolvida pelo Infisical em runtime; nunca escreva o valor literal)

```bash
# Resolve a credencial via Infisical e injeta $SOCIAVAULT_API_KEY no ambiente do curl
infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=dev -- \
  curl --url 'https://api.sociavault.com/v1/scrape/tiktok/profile?handle=stoolpresidente' \
    --header 'X-API-Key: $SOCIAVAULT_API_KEY'
```

---

## Notas Kolden

- Uso típico no Kolden: squad **Argos** — especialistas `social-*` e `competitor-mapper` usam a SociaVault para descoberta de virais por nicho/concorrente. Complementa a **Apify** (que já temos) com cobertura multi-plataforma numa só API.
- Coleta de dados sociais ainda passa pelo juízo de ToS do `compliance-sentinela` sempre que tocar plataforma sob login.
- Sempre rodar comandos sob `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=dev -- ...` para que `SOCIAVAULT_API_KEY` seja injetada em runtime; nunca persistir a chave em arquivos `.env` versionados.
