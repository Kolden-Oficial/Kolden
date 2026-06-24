# YouTube Data API v3 — Referência de Uso

API do Google para ler dados públicos do YouTube — canais, vídeos, estatísticas, busca, playlists. Categoria: Inteligência Social / Dados. **Uso direto via API** (dados públicos via API key; não exige OAuth para leitura pública).

---

## Credenciais (Infisical)

| Credencial | Caminho Infisical |
|------------|-------------------|
| GOOGLE_DRIVE_API_KEY *(API key Google geral)* | `/kolden/dev/GOOGLE_DRIVE_API_KEY` ✅ validada 2026-06-24 |

> Art. VII: nunca o valor — só o caminho. Resolver em runtime via `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=dev -- <comando>` (no Windows, sob SAC, via o shim Node `~/.claude/infisical-shim.cjs`).
>
> **Nota de naming:** nome genérico `GOOGLE_DRIVE_API_KEY` — é uma **API key Google** compartilhada (mesma key serve PageSpeed). Validada ao vivo: `channels.list` retornou "Google for Developers" (2,66M subs). O squad **Argos** espera a chave em `/kolden/argos`; pode reusar esta de `dev` ou duplicá-la lá.

---

## Pré-requisitos no GCP

- Projeto: `gen-lang-client-0988823565` (nº `1098911614973`).
- API habilitada: `youtube.googleapis.com` (via `gcloud services enable youtube.googleapis.com`).

---

## Fontes confiáveis

| Tipo | Link |
|------|------|
| Documentação oficial | https://developers.google.com/youtube/v3/docs |
| Referência da API | https://developers.google.com/youtube/v3/docs/videos/list |
| Custo de quota | https://developers.google.com/youtube/v3/determine_quota_cost |

---

## MCP

- **Disponível?** existem MCPs comunitários, mas o padrão Kolden (Argos) é **uso direto** — leitura pública via API key, sem necessidade de servidor MCP.

---

## Uso básico

- **Base:** `https://www.googleapis.com/youtube/v3/`
- **Endpoints úteis:** `channels` (estatísticas de canal), `videos` (estatísticas de vídeo), `search` (busca), `playlistItems`.
- **Auth:** dados públicos → `key=<API_KEY>` na query (sem OAuth).

```bash
# Estatísticas de um canal (por ID)
infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- bash -c '
curl -s "https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=UC_x5XG1OV2P6uZZ5FSM9Ttw&key=$YOUTUBE_API_KEY"
'
```

---

## Notas Kolden

- **Quem usa:** squad **Argos**, agente `social-youtube` (`Argos/agents/social-youtube.md`) — coleta de estatísticas públicas (channels.list, videos.list, search.list) para inteligência de mercado. **Esta chave destrava esse agente, que já está pronto.**
- **Quota:** 10.000 unidades/dia por padrão. `search.list` custa 100 unidades; `videos.list`/`channels.list` custam 1. Planejar buscas com parcimônia.
- Leitura é só de dados públicos — para dados privados de um canal próprio (YouTube Analytics), seria OAuth + escopo `yt-analytics.readonly` (fora do escopo atual).
- Nunca exportar a key literal; sempre via Infisical.
