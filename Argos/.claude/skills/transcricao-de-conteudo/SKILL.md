---
name: transcricao-de-conteudo
description: Transcrever vídeos/áudios (TikTok/IG/YouTube/podcasts) em texto para o time de copy — extrair ganchos, estrutura, CTA e a linguagem do cliente. Use quando o pedido for "transcreve esse vídeo", "o que o concorrente fala nesse Reels", "pega a copy desse vídeo viral". Baixa o áudio com yt-dlp e transcreve com Speechmatics (melhor pt-BR) ou Deepgram (fallback). Handoff ao Caliope (copy).
---

# Habilidade: transcricao-de-conteudo

Transforma vídeo/áudio em texto utilizável pelo time de copy (squad **Caliope**). O alvo típico são os
vídeos virais descobertos pela skill `descoberta-de-virais` — transcrever para destrinchar o gancho dos
primeiros segundos, a estrutura e o CTA.

## Fluxo

```
URL do vídeo (TikTok/IG/YouTube)
   ↓ yt-dlp  (baixa o áudio; Unlicense, pip install yt-dlp)
   ↓ STT     (Speechmatics — melhor pt-BR, diarização; ou Deepgram — fallback/realtime)
   ↓ texto + timestamps + fonte (URL) + timestamp de coleta
   → handoff ao Caliope (ganchos / estrutura / CTA / voz do cliente)
```

Comando (sob Infisical, env dev):
```bash
infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=dev -- \
  python motor/argos-engine.py transcrever --url "<URL>" --engine speechmatics
# --engine deepgram para usar a Deepgram (DEEPGRAM_API_KEY vive no env prod)
```

## Quando usar cada engine
- **Speechmatics** (padrão): melhor qualidade em pt-BR, diarização, timestamps — ideal para análise de conteúdo em lote.
- **Deepgram** (fallback): já no catálogo; bom para realtime/voice. `DEEPGRAM_API_KEY` (env prod).

## Regras
- Toda transcrição carrega a **fonte** (URL do vídeo) + **timestamp** de coleta.
- Segredos só via Infisical (`SPEECHMATICS_API_KEY` em dev; `DEEPGRAM_API_KEY` em prod), nunca literais.
- Baixar conteúdo de plataforma sob login/ToS-cinza → escalar ao `compliance-sentinela`. Conteúdo público
  (Reels/vídeos abertos) é zona verde.
- A saída é insumo de copy → entregar ao **Caliope** com os ganchos e a estrutura destacados.
