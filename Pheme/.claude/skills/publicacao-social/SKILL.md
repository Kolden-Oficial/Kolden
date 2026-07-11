---
name: publicacao-social
description: >
  Publica e agenda conteúdo nas redes sociais da Kolden por dois caminhos — Postiz
  (principal, self-host + postiz-agent conectado ao Claude Code) e GoHighLevel
  (alternativo, via credenciais existentes). Use sempre que o agente publisher
  precisar postar/agendar uma peça aprovada em Instagram, TikTok, YouTube, LinkedIn,
  X ou Pinterest. Tokens SEMPRE via Infisical, nunca em texto puro.
metadata:
  type: reference
tipo: skill
area: Pheme
up: "[[Pheme/_MOC-pheme]]"
---

# Publicação Social — Postiz (principal) + GoHighLevel (alternativo)

Esta habilidade documenta como o squad **Pheme** publica de verdade. O agente
`publisher` é quem a aciona, depois que a peça passou pelo checklist
`qualidade-conteudo.md` e pela revisão de marca.

> **Regra de ouro (Constituição Kolden, Art. VII):** nenhuma credencial em texto
> puro. Resolva segredos em runtime via Infisical:
> `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- <comando>`
> (ver skill `infisical-padrao`).

---

## Caminho 1 — Postiz (principal)

**O que é:** `gitroomhq/postiz-app` (~32k★) é uma ferramenta open-source de
agendamento/publicação agêntica que cobre Instagram, TikTok, YouTube, LinkedIn,
X, Pinterest, Threads, Facebook, Bluesky, Mastodon e mais. O `gitroomhq/postiz-agent`
é um CLI que **conecta o Postiz ao Claude Code / agentes** para criar e agendar posts.

### 1.1 Subir o Postiz (self-host, uma vez)

Pré-requisito: Docker. Caminho recomendado: Docker Compose.

```bash
# Exemplo de docker-compose (resumo). Ver doc oficial: https://docs.postiz.com
# Serviços: postiz (app), postgres, redis.
# Variáveis principais do container postiz:
#   MAIN_URL, FRONTEND_URL, NEXT_PUBLIC_BACKEND_URL
#   DATABASE_URL (postgres), REDIS_URL
#   JWT_SECRET  ← gerar e guardar no Infisical
docker compose up -d
```

Sugestão de hospedagem na stack Kolden: Railway ou um VPS. Registrar a URL e os
segredos (JWT_SECRET, DATABASE_URL, chaves de API de cada rede) no Infisical em
`/kolden/prod/POSTIZ_*`.

### 1.2 Conectar as contas das redes

No painel do Postiz (MAIN_URL), conectar via OAuth: Instagram, TikTok, YouTube,
LinkedIn, X, Pinterest. Cada rede pode exigir app/developer próprio (ex.: Meta
app para Instagram, TikTok for Developers). Guardar tokens resultantes no Infisical.

### 1.3 Gerar a API key do Postiz

No painel → Settings → API. Guardar como `/kolden/prod/POSTIZ_API_KEY` no Infisical.

### 1.4 Publicar/agendar via postiz-agent (uso pelo publisher)

```bash
# Instalar/conectar o postiz-agent (ver https://github.com/gitroomhq/postiz-agent)
# Ele expõe comandos para o Claude Code agendar posts.
infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- \
  postiz-agent post \
    --channels "instagram,tiktok,linkedin" \
    --content "<legenda/roteiro aprovado>" \
    --media "<caminho/arte/video>" \
    --schedule "2026-06-21T18:00:00-03:00"
```

Alternativa direta pela API REST do Postiz (quando o CLI não cobrir um caso):

```bash
infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- bash -c '
curl -X POST "$POSTIZ_API_URL/public/v1/posts" \
  -H "Authorization: $POSTIZ_API_KEY" \
  -H "Content-Type: application/json" \
  -d @post.json'
```

> Os nomes exatos de flags/endpoints podem mudar entre versões — confira a doc
> oficial (https://docs.postiz.com) e o README do `postiz-agent` antes de rodar.

---

## Caminho 2 — GoHighLevel (alternativo)

**Quando usar:** para unificar publicação com o CRM/automações da Kolden, ou onde
o Postiz não cobrir. O GHL tem o módulo **Social Planner** que publica em
Facebook, Instagram, LinkedIn, GMB, TikTok, X e YouTube (cobertura varia por plano).

Credenciais já existentes (Infisical): `/kolden/prod/GHL_PIT_KEY`,
`/kolden/prod/GHL_AGENCY_KEY`, `/kolden/prod/GHL_LOCATION_ID` (+ tokens em `dev`).

Caminhos de uso:
1. **MCP/conector claude.ai do GoHighLevel** (ver catálogo de Ferramentas, status 🔌)
   — autenticar na sessão e usar as ferramentas de Social Planner quando disponíveis.
2. **API REST do GHL** (Social Media Posting API) com o PIT key:

```bash
infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- bash -c '
curl -X POST "https://services.leadconnectorhq.com/social-media-posting/$GHL_LOCATION_ID/posts" \
  -H "Authorization: Bearer $GHL_PIT_KEY" \
  -H "Version: 2021-07-28" \
  -H "Content-Type: application/json" \
  -d @ghl-post.json'
```

> Verificar o manual `sobre-a-empresa/Ferramentas/GoHighLevel/ferramentas.md` para a referência
> de endpoints e escopos atuais.

---

## Fluxo padrão do publisher (resumo)

1. **Gate:** a peça passou no `qualidade-conteudo.md` (CRÍTICOS [x]) e na marca? Senão, devolve.
2. **Formata** por rede (proporção, legenda, hashtags, link, limites).
3. **Preview + confirmação** explícita do usuário.
4. **Resolve segredos** via Infisical.
5. **Publica/agenda** via Postiz (principal) ou GHL (alternativo), no melhor horário (growth-analyst).
6. **Reporta** conta, horário, link/id e status → entrega ao growth-analyst.

## Checklist da skill
- [ ] Postiz no ar e contas conectadas (uma vez) OU GHL autenticado
- [ ] Tokens no Infisical (`/kolden/prod/POSTIZ_*`, `GHL_*`)
- [ ] Peça aprovada no gate de qualidade + marca
- [ ] Preview confirmado antes de publicar
- [ ] Report entregue ao growth-analyst

## Fontes
- Postiz app: https://github.com/gitroomhq/postiz-app
- Postiz agent (CLI p/ Claude): https://github.com/gitroomhq/postiz-agent
- Postiz n8n node: https://github.com/gitroomhq/postiz-n8n
- Postiz docs: https://docs.postiz.com
- GoHighLevel: `sobre-a-empresa/Ferramentas/GoHighLevel/ferramentas.md`
- Infisical: skill `infisical-padrao`

---

## Absorção B02 (MKT-G50, G51) — Canal China + Matriz de fit plataforma×conteúdo

Postiz e GHL não cobrem redes chinesas. Para o eixo China (WeChat, Weibo,
Xiaohongshu, Bilibili, Douyin, Kuaishou, Zhihu, Baidu Tieba, +11 outras) o padrão
é **draft-first via ferramentas open-source** — o publisher gera o post local,
uma ferramenta faz upload como rascunho, e um humano na China finaliza (dado
que muitas plataformas não têm API pública ou exigem KYC local).

### Caminho 3 — China draft-first (19+ plataformas)

Três ferramentas cobrem quase tudo:

- **Wechatsync** (`https://github.com/overtrue/wechat-sync` ou `wechatsync/article-syncjs`) —
  sincroniza artigo Markdown para: WeChat Official Account, Zhihu Column, Toutiao,
  Jianshu, CSDN, SegmentFault, OSChina, Bilibili (article), Weibo (long-post), +5 outras.
- **xhs-mcp** — MCP server para Xiaohongshu (post + comentário + agendamento).
- **biliup** (`biuliupload/biliup`) — CLI de upload para Bilibili (vídeo + capa + tags + partition).

**Regra draft-first**: as ferramentas fazem UPLOAD como RASCUNHO. Um humano na
China verifica compliance/censura + clica publicar. Isso protege contra ban da
conta e respeita as regras dinâmicas de conteúdo.

### Fluxo padrão China

```
1. Publisher chama a skill de plataforma (xiaohongshu-conteudo, weibo-conteudo, etc.)
2. Skill gera post em Markdown + assets
3. Ferramenta (Wechatsync/xhs-mcp/biliup) faz upload como rascunho
4. Notificação para o operador local (WeCom/WeChat)
5. Operador local revisa, ajusta, publica
6. Publisher registra ID + link no growth-analyst
```

### Credenciais (Infisical)

- `/kolden/prod/WECHAT_SYNC_TOKEN`, `/kolden/prod/XHS_MCP_TOKEN`, `/kolden/prod/BILIUP_COOKIE`.
- Cookies de conta chinesa: **guardados encriptados + rotação por 60d**. Muitas
  plataformas invalidam cookie ao detectar IP externo — usar proxy CN quando
  possível.

### Anexo — Matriz de fit plataforma × conteúdo

| Conteúdo ↓ / Plataforma → | Postiz | GHL | Wechatsync | xhs-mcp | biliup |
|---|---|---|---|---|---|
| IG post/reel | ✅ | ⚠️ | ❌ | ❌ | ❌ |
| TikTok | ✅ | ⚠️ | ❌ | ❌ | ❌ |
| YouTube (video) | ✅ | ❌ | ❌ | ❌ | ❌ |
| LinkedIn | ✅ | ✅ | ❌ | ❌ | ❌ |
| X/Twitter | ✅ | ⚠️ | ❌ | ❌ | ❌ |
| Pinterest | ✅ | ❌ | ❌ | ❌ | ❌ |
| Threads | ✅ | ❌ | ❌ | ❌ | ❌ |
| Bluesky/Mastodon | ✅ | ❌ | ❌ | ❌ | ❌ |
| Facebook | ✅ | ✅ | ❌ | ❌ | ❌ |
| WeChat OA (article) | ❌ | ❌ | ✅ | ❌ | ❌ |
| Weibo | ❌ | ❌ | ✅ | ❌ | ❌ |
| Xiaohongshu | ❌ | ❌ | ⚠️ | ✅ | ❌ |
| Zhihu | ❌ | ❌ | ✅ | ❌ | ❌ |
| Bilibili (article) | ❌ | ❌ | ✅ | ❌ | ⚠️ |
| Bilibili (video) | ❌ | ❌ | ❌ | ❌ | ✅ |
| Douyin/Kuaishou | ❌ | ❌ | ❌ | ❌ | ⚠️ (fluxo separado) |
| Toutiao/Jianshu/CSDN | ❌ | ❌ | ✅ | ❌ | ❌ |

**Legenda**: ✅ suporte pleno · ⚠️ suporte parcial ou depende de plano · ❌ sem suporte.

### Fontes adicionais
- Wechatsync: https://github.com/overtrue/wechat-sync
- xhs-mcp: (buscar por xhs-mcp no GitHub, comunidade)
- biliup: https://github.com/biuliupload/biliup

---
**Procedência da absorção B02:** Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B02/marketing (IDs MKT-G50, G51 — canal China draft-first via Wechatsync/xhs-mcp/biliup + matriz de fit plataforma×conteúdo).
