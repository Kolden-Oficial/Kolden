---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/metodo-onda-1/1.3-mcp-camada-1/diff-cirurgico-ferramentas|diff-cirurgico-ferramentas]]"
  - "[[Caos/registros/metodo-onda-1/1.3-mcp-camada-1/mapa-de-dependencias|mapa-de-dependencias]]"
  - "[[Caos/registros/metodo-onda-1/1.3-mcp-camada-1/plano-migracao-escalonada|plano-migracao-escalonada]]"
  - "[[Caos/registros/metodo-onda-1/1.3-mcp-camada-1/sumario-executivo|sumario-executivo]]"
---

# Inventário de Wrappers Proprietários — Sub-onda 1.3 (MCP Camada 1)

> **Contrato:** m-20260706-metodo-kolden · Sub-onda 1.3
> **Data:** 2026-07-06
> **Executor:** caos-chief (raiz Kolden) — fan-out ≤3 Explores paralelos
> **Norma:** Constituição v2.5.0 Art. IV — MCP mandatório, dupla-vida 90d, BLOCK após

## 1. Critério de classificação aplicado

**É wrapper proprietário (BLOCK candidato após 90d):**
- Cliente HTTP direto (`requests`, `fetch`, `axios`, `httpx`) para API externa fora do protocolo MCP
- Import de SDK proprietário de vendor (apify_client, speechmatics, deepgram, openai, mistralai, discord, slack_sdk/slack_bolt, python-telegram-bot, google-cloud) chamado dentro de skill/tool para expor a API ao agente
- HTTP com header custom (X-API-Key, Bearer) para endpoint que já tem MCP oficial cadastrado

**NÃO é wrapper (fora de escopo do Art. IV):**
- Skill de método puro (lê YAML local, decide, gera artefato)
- Orquestração de tools nativas do harness (Grep/Read/WebFetch/Bash)
- Orquestração de MCPs já cadastrados (`mcp__exa__*`, `mcp__github__*`, `mcp__firecrawl__*`, `mcp__hermes__*`, `mcp__gohighlevel__*`, `mcp__solomon__*`)
- Servidor MCP-nativo que usa `@modelcontextprotocol/sdk` ou `FastMCP` — validado em **Iris** (`sobre-a-empresa/Projetos/Rosie/mcp-solomon/`) ✅
- Thin wrapper de CLI (chamada única a binário existente: `gh`, `node`, `yt-dlp`, `ffmpeg`, `postiz-agent`)
- Vendor de biblioteca de scraping (Scrapling/Scrapy/Crawlee/Skyvern/gpt-researcher) em pasta `motor/` — libs locais, não wrappers de API

## 2. Cobertura da varredura

| Fan-out | Squads cobertos | Wrappers encontrados |
|---|---|---|
| #1 | Caos, Prometeu, Dedalo, Hermes, Egide | 9 (Hermes adapters + fallback LLM) |
| #2 | Argos (deep), Olimpo, Dike, Themis, Aletheia, Liceu, Aglaia | 4 (Argos motor) + 11 (Hermes tools STT/TTS/x_search) |
| #3 | Caliope, Harmonia, Orfeu, Pheme, Ariadne, Dionisio, Emporos, Peitho, Pluto, Metis, Ananke, Cairos, Hestia, Pactolo, Nomos | 4 (Pheme+Emporos) |

**Wrappers únicos consolidados: 22** (Fan-out #1 e #2 sobrepõem em Hermes; deduplicado)
**Squads sem wrappers proprietários: 22 de 26** (85%)

## 3. Inventário consolidado — 22 wrappers proprietários

### 3.1 Hermes — Runtime adapters de plataforma (5)

| # | Wrapper | Path | Tipo | Impacto | Evidência | MCP oficial? |
|---|---|---|---|---|---|---|
| H1 | Discord | `Hermes/plugins/platforms/discord/adapter.py:42-48` | runtime adapter | ALTO | `import discord; from discord import Message, Intents; from discord.ext import commands` | Não (mcp__hermes__* é o próprio Hermes) |
| H2 | Slack | `Hermes/gateway/platforms/slack.py:22-25,93-100` | runtime adapter | ALTO | `from slack_bolt.async_app import AsyncApp; from slack_sdk.web.async_client import AsyncWebClient` | Parcial (mcp__claude_ai_Slack__* exige OAuth interativo do usuário) |
| H3 | Telegram | `Hermes/gateway/platforms/telegram.py:25-39` | runtime adapter | ALTO | `from telegram import Update, Bot, Message; from telegram.ext import Application, CommandHandler` | Não |
| H4 | WhatsApp Cloud | `Hermes/gateway/platforms/whatsapp_cloud.py:65-71` | runtime adapter | ALTO | `import httpx` + custom HTTP client para Graph API | Não |
| H5 | Google Chat | `Hermes/plugins/platforms/google_chat/adapter.py:76-100` | runtime adapter | MÉDIO | `from google.cloud import pubsub_v1; from googleapiclient.discovery import build` | Não |

### 3.2 Hermes — Tools STT/TTS/reasoning (10)

| # | Wrapper | Path | Tipo | Impacto | Evidência | MCP oficial? |
|---|---|---|---|---|---|---|
| H6 | OpenAI Whisper (STT) | `Hermes/tools/transcription_tools.py` | tool provider | ALTO | `OPENAI_MODELS = {"whisper-1", ...}`; env `VOICE_TOOLS_OPENAI_KEY` | Não (OpenAI não expõe MCP para audio) |
| H7 | Groq Whisper (STT) | `Hermes/tools/transcription_tools.py` | tool provider | ALTO | `GROQ_BASE_URL = "https://api.groq.com/openai/v1"`; modelos `whisper-large-v3` | Não |
| H8 | Mistral Voxtral (STT+TTS) | `Hermes/tools/tts_tool.py` + `transcription_tools.py` | tool provider | MÉDIO | `MISTRAL_API_KEY` env | Não |
| H9 | ElevenLabs (STT+TTS) | `Hermes/tools/tts_tool.py`, `transcription_tools.py` | tool provider | MÉDIO | `DEFAULT_ELEVENLABS_STT_MODEL = "scribe_v2"`; `ELEVENLABS_API_KEY` | **SIM — `mcp__elevenlabs__*` (18 tools)** |
| H10 | OpenAI TTS | `Hermes/tools/tts_tool.py` | tool provider | ALTO | provider `openai` no TTS registry | Não |
| H11 | MiniMax TTS | `Hermes/tools/tts_tool.py` | tool provider | BAIXO | provider `minimax` no TTS registry | Não |
| H12 | Google Gemini TTS | `Hermes/tools/tts_tool.py` | tool provider | MÉDIO | `GEMINI_API_KEY` env; `from google.cloud import ...` | Não (Google MCP não cobre TTS) |
| H13 | xAI STT+TTS | `Hermes/tools/tts_tool.py` + `xai_http.py` | tool provider | MÉDIO | custom wrapper `resolve_xai_http_credentials`; base URL `https://api.x.ai/v1` | Não |
| H14 | xAI Grok x_search | `Hermes/tools/x_search_tool.py:51,58+` | tool provider | MÉDIO | `import requests; requests.get(...)` para xAI Grok search API | Não |
| H15 | OpenAI fallback LLM | `Hermes/agent/auxiliary_client.py:53,67,76` | provider | MÉDIO | `from openai import OpenAI, AsyncOpenAI` (lazy) — fallback quando Anthropic indisponível | Não (contradição de soberania) |

### 3.3 Hermes — Utilidade interna (1)

| # | Wrapper | Path | Tipo | Impacto | Evidência | MCP oficial? |
|---|---|---|---|---|---|---|
| H16 | OpenAI trajectory compression | `Hermes/trajectory_compressor.py:405,426` | utility | BAIXO | `from openai import OpenAI, AsyncOpenAI` (token counting) | Não — deprecar em favor de Claude |

### 3.4 Argos — Motor de scraping/multi-vendor (4)

| # | Wrapper | Path | Tipo | Impacto | Evidência | MCP oficial? |
|---|---|---|---|---|---|---|
| A1 | ApifyClient | `Argos/motor/argos-engine.py:170-207` | SDK Python | MÉDIO | `from apify_client import ApifyClient; client.actor(actor).call(...)` | **SIM — `mcp__apify__*` (20+ tools)** ⚠️ redundante |
| A2 | SociaVault (HTTP direto) | `Argos/motor/argos-engine.py:270-294` | HTTP direto | MÉDIO | `requests.get("https://api.sociavault.com/v1/...", headers={"X-API-Key": key})` | Não |
| A3 | Speechmatics SDK | `Argos/motor/argos-engine.py:297-315` | SDK Python | MÉDIO | `from speechmatics.batch_client import BatchClient` | Não |
| A4 | Deepgram SDK | `Argos/motor/argos-engine.py:318-336` | SDK Python | MÉDIO | `from deepgram import DeepgramClient` | Não |

### 3.5 Pheme + Emporos — Publicação social e CRM (5, sendo 2 CLI-thin)

| # | Wrapper | Path | Tipo | Impacto | Evidência | MCP oficial? |
|---|---|---|---|---|---|---|
| P1 | Postiz CLI (`postiz-agent`) | `Pheme/.claude/skills/publicacao-social/SKILL.md:66-81` | thin CLI wrapper | BAIXO | `infisical run ... postiz-agent post --channels ...` | Não (thin CLI é aceitável Art. IV) |
| P2 | GHL HTTP direto (Pheme) | `Pheme/.claude/skills/publicacao-social/SKILL.md:104-109` | HTTP direto | MÉDIO | `curl -X POST "https://services.leadconnectorhq.com/social-media-posting/..." -H "Authorization: Bearer $GHL_PIT_KEY"` | **SIM — `mcp__gohighlevel__*`** ⚠️ redundante |
| E1 | GHL HTTP direto (Emporos) | `Emporos/.claude/skills/higiene-de-pipeline-crm/` | HTTP direto | MÉDIO | Idem P2 (mesma stack GHL) | **SIM — `mcp__gohighlevel__*`** ⚠️ redundante |
| E2 | Apollo (menção) | `Emporos/.claude/skills/cadencia-de-outbound/SKILL.md:9` + `catalogo.md:47,58` | referência sem código | BAIXO | Skill cita "conectores apollo e common-room"; código não localizado | Não (a investigar) |
| E3 | Common Room (menção) | `Emporos/.claude/skills/cadencia-de-outbound/SKILL.md:129` | referência sem código | BAIXO | Idem E2 | Não (a investigar) |

## 4. Squads sem wrappers proprietários (22 de 26)

Confirmado por varredura ativa nas 3 ondas:

- **Método puro (0 código técnico):** Caos, Prometeu, Dedalo, Egide, Olimpo, Dike, Themis, Aletheia, Liceu, Aglaia, Caliope, Harmonia, Orfeu, Ariadne, Dionisio, Pluto, Ananke, Cairos, Hestia, Pactolo, Nomos
- **Cobertura por MCPs cadastrados:** Peitho (mcp__meta__* + mcp__synter__*), Metis (mcp__google-analytics__* + mcp__solomon__*)

## 5. Achados prévios já validados (fora do Art. IV)

- **Iris** (`sobre-a-empresa/Projetos/Rosie/mcp-solomon/`) — MCP-nativo desde a origem (`@modelcontextprotocol/sdk` 1.20+, `registerTool` × 4). Padrão do estado desejado v2.5.0 ✅
- **Solomon-oficial** — MCP remoto oficial via Cloud Run + OAuth. Cadastrado em `dados/registro-de-entidades.yaml` como `tipo: mcp` ✅
- **Vendors do Argos motor** (Scrapling/Scrapy/Crawlee/Skyvern/gpt-researcher) — libs vendorizadas, NÃO wrappers de API externa; usam SDKs internos para processo local de scraping
- **Prometeu mcp-builder** — usa Anthropic SDK apenas em `scripts/evaluation.py` (utilitário de harness de eval), NÃO em produção

## 6. Constatação arquitetural crítica — Hermes runtime

O Fan-out #1 argumentou que **Hermes é fundamentalmente incompatível com o padrão MCP simples** por design:

- MCP spec 2024 é **request-response síncrono** (JSON-RPC unidirecional)
- Hermes runtime precisa:
  - **Inbound event streams em tempo real** (Discord gateway, Slack Socket Mode, Telegram polling)
  - **Outbound sends <1s** (resposta imediata sem polling loop)
  - **State correlation entre eventos** (botões interativos, threads, DMs com contexto)

Estes requisitos **não se resolvem com adapter MCP thin sobre event stream** — implicariam re-implementar o loop de eventos dentro do MCP server, criando latência e ponto único de falha.

**Duas interpretações possíveis do Art. IV neste caso:**

1. **Interpretação restrita:** wrappers Hermes de plataforma (H1-H5) são thin-wrappers de SDK necessários, análogos a "thin wrapper de CLI" — Art. IV já permite. Aceitáveis SEM dupla-vida.
2. **Interpretação estrita:** Art. IV não abriu exceção para SDK; wrappers Hermes entram em dupla-vida 90d como qualquer outro; após 90d, propor emenda ao Art. IV que reconheça a categoria "adapter de runtime bidirecional em tempo real".

**Decisão pendente do gate humano** (Ronan) — ver `sumario-executivo.md`.

## 7. Observação de escopo

Sub-onda 1.3 é **inventário + plano**, não implementação. Fase 3 residual (`m-2026MMDD-implementacao-mcp-e-dashboard`) é onde os MCPs próprios efetivamente são construídos + ligados + testados. Este documento é o **mapa de terreno** para essa Fase 3.

---
*Sub-onda 1.3 — Inventário. Executor: caos-chief (raiz Kolden). 2026-07-06.*
