---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/harry0703--MoneyPrinterTurbo/briefing-de-execucao|briefing-de-execucao]]"
  - "[[Caos/registros/absorcao/harry0703--MoneyPrinterTurbo/mapa-de-decisao|mapa-de-decisao]]"
  - "[[Caos/registros/absorcao/harry0703--MoneyPrinterTurbo/seguranca|seguranca]]"
---

# Inventário de capacidades — harry0703--MoneyPrinterTurbo (rota B, enxuto)

- **slug:** harry0703--MoneyPrinterTurbo · **sha:** ad6aabfeb94f16f35474058d9c3e1f74ce66e9d4
- **O que é:** app Python (arquitetura MVC) que, a partir de um **tópico/keyword**, gera automaticamente roteiro, busca material de stock, sintetiza voz, gera legendas, adiciona trilha e **renderiza um vídeo curto em HD** (9:16 ou 16:9). Três interfaces: WebUI (Streamlit), API REST (FastAPI) e CLI.
- **Stack:** Python 3.11 · moviepy 2.x + ffmpeg (render) · streamlit (UI) · fastapi+uvicorn (API) · edge-tts / azure-speech (TTS) · faster-whisper (legenda local) · litellm + openai SDK + google-generativeai + dashscope (LLM) · redis (estado opcional) · uv/pyproject (deps).
- Inventário em nível de **função/módulo** (rota B — não vira agente; vendor inerte).

| ID | capacidade | tipo | keywords | dominio | fonte(arquivo:linha) |
|---|---|---|---|---|---|
| G1 | Geração de roteiro/copy de vídeo por IA a partir de tópico + geração de termos de busca de material | ferramenta | roteiro, copy, script, video-subject | produção de vídeo | app/services/llm.py:1-140 |
| G2 | Camada LLM multi-provider (~20: openai, gemini, deepseek, ollama, azure, qwen, moonshot, grok, groq, minimax, ernie, cloudflare, modelscope, pollinations, aihubmix, aimlapi, oneapi, evolink, mimo, litellm) com chave trocável | ferramenta | llm, multi-provider, vendor-agnostico, openrouter-like | infra IA | app/services/llm.py:144-360 |
| G3 | Busca e download de material de stock royalty-free (Pexels, Pixabay, Coverr) + uso de mídia local | ferramenta | stock, b-roll, pexels, pixabay, coverr, material | mídia | app/services/material.py:70,129,200 |
| G4 | Síntese de voz TTS multi-provider: Edge TTS (grátis, default), Azure Speech V2, ElevenLabs, SiliconFlow, MiniMax/xiaomimimo + preview | ferramenta | tts, voz, narração, dublagem, edge-tts, elevenlabs | áudio | app/services/voice.py:330,762,1204,146 |
| G5 | Geração de legendas: alinhamento por timestamps do Edge TTS **ou** transcrição local via faster-whisper (word-level) | ferramenta | legenda, subtitle, srt, whisper, transcrição | áudio/texto | app/services/subtitle.py |
| G6 | Trilha sonora de fundo (BGM aleatória ou arquivo escolhido) com volume ajustável | ferramenta | música, bgm, trilha, áudio-fundo | áudio | app/services/video.py (mix) + resource/songs |
| G7 | Composição/render de vídeo HD via ffmpeg+moviepy: 9:16 e 16:9, duração de clipe, legendas estilizadas (fonte/cor/posição/contorno), geração em lote | ferramenta | render, ffmpeg, moviepy, hd, batch, 9:16, 16:9 | produção de vídeo | app/services/video.py:1-50,347 |
| G8 | Cross-post automático do vídeo para TikTok / Instagram / YouTube Shorts via API upload-post.com | ferramenta | publicação, tiktok, instagram, youtube-shorts, cross-post | distribuição social | app/services/upload_post.py:1-40 |
| G9 | Três superfícies de uso: API REST (FastAPI, /docs), WebUI (Streamlit i18n) e CLI (`cli.py --video-subject`) | ferramenta | api, webui, cli, fastapi, streamlit | interface | main.py, cli.py, webui/Main.py, app/router.py |
| G10 | Pipeline orquestrado de task (roteiro→termos→material→voz→legenda→trilha→render→[upload]) com estado em memória/redis e `--stop-at` por estágio | ferramenta | pipeline, orquestração, task, estágios | produção de vídeo | app/services/task.py, app/services/state.py |

**Total: 10 capacidades** (granularidade de módulo/função, adequada à rota B).
