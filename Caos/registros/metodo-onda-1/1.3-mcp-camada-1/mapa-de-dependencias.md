---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/metodo-onda-1/1.3-mcp-camada-1/diff-cirurgico-ferramentas|diff-cirurgico-ferramentas]]"
  - "[[Caos/registros/metodo-onda-1/1.3-mcp-camada-1/inventario|inventario]]"
  - "[[Caos/registros/metodo-onda-1/1.3-mcp-camada-1/plano-migracao-escalonada|plano-migracao-escalonada]]"
  - "[[Caos/registros/metodo-onda-1/1.3-mcp-camada-1/sumario-executivo|sumario-executivo]]"
---

# Mapa de Dependências — Sub-onda 1.3 (MCP Camada 1)

> **Contrato:** m-20260706-metodo-kolden · Sub-onda 1.3
> **Data:** 2026-07-06
> **Propósito:** para cada wrapper identificado no `inventario.md`, listar consumidores diretos (skills, agents, squads) via grep reverso

## 1. Método

Para cada wrapper W do inventário, o mapa reverso responde:
- **Quem chama W diretamente?** (skill A ou agent B invoca W)
- **Quem depende de W indiretamente?** (squad C usa skill A que chama W)
- **Impacto de remoção** (o que quebra se W for removido sem substituto)

Grep reverso executado por:
- Referências ao nome do wrapper (`ApifyClient`, `SociaVault`, `Speechmatics`, `Deepgram`, etc.)
- Referências ao path do wrapper (`argos-engine.py apify`, `argos-engine.py transcrever`, etc.)
- Referências à skill que orquestra o wrapper (via catálogo do squad)

## 2. Mapa por wrapper

### 2.1 Hermes — Runtime adapters

| Wrapper | Consumidores diretos | Consumidores indiretos | Impacto de remoção |
|---|---|---|---|
| **H1 Discord** | `Hermes/gateway/orchestrator` | Qualquer agent que envia via `mcp__hermes__messages_send` para canal Discord | Todas as conversas Kolden-em-Discord param |
| **H2 Slack** | `Hermes/gateway/orchestrator` | Idem Slack | Todas as conversas Kolden-em-Slack param |
| **H3 Telegram** | `Hermes/gateway/orchestrator` | Todos os squads que atendem clientes via bot Telegram (Ronan usa Telegram para conversar com Hermes-chief hoje) | Ronan perde canal principal ⚠️ |
| **H4 WhatsApp Cloud** | `Hermes/gateway/orchestrator` | Squads que atendem cliente via WhatsApp (Emporos, Peitho, Rosie) | Atendimento cliente WhatsApp para |
| **H5 Google Chat** | `Hermes/plugins/orchestrator` | Squads que usam Google Chat (residual) | Baixo impacto operacional |

### 2.2 Hermes — Tools STT/TTS/reasoning

| Wrapper | Consumidores diretos | Consumidores indiretos | Impacto de remoção |
|---|---|---|---|
| **H6 OpenAI Whisper (STT)** | tools/transcription_tools.py provider registry | Argos (skill `transcricao-de-conteudo` chama tool STT do Hermes), Caliope (analisa vídeo do concorrente) | Fallback para local (faster-whisper) — perda de qualidade em pt-BR |
| **H7 Groq STT** | Idem | Idem | Fallback para OpenAI ou local |
| **H8 Mistral STT+TTS** | Idem | Idem | Fallback para outro provider |
| **H9 ElevenLabs STT+TTS** | Idem | Aglaia (conteúdo com voz), Caliope, Pheme (áudio para social) | ⚠️ **JÁ TEM MCP** — substituição direta |
| **H10 OpenAI TTS** | tts_tool registry | Idem TTS | Fallback para outro |
| **H11 MiniMax TTS** | Idem | Idem | Fallback para outro |
| **H12 Google Gemini TTS** | Idem | Idem | Fallback para outro |
| **H13 xAI STT+TTS** | Idem | Agents que querem Grok como voz | Fallback trivial |
| **H14 xAI Grok x_search** | x_search_tool | Argos (retrieval alternativo), agents com necessidade de "search com viés X/Twitter" | Substituir por Exa/Firecrawl/Sonar (todos com MCP) |
| **H15 OpenAI fallback LLM** | Hermes agent auxiliary_client | Agents cuja LLM primária (Anthropic) esteja indisponível | ⚠️ Contradiz soberania — deprecar mesmo mantendo fallback |

### 2.3 Hermes — Utilidade interna

| Wrapper | Consumidores diretos | Consumidores indiretos | Impacto de remoção |
|---|---|---|---|
| **H16 OpenAI trajectory compression** | trajectory_compressor.py | Contexto interno de agente longo | Trocar por Anthropic SDK direto (mesma qualidade) |

### 2.4 Argos — Motor

| Wrapper | Consumidores diretos | Consumidores indiretos | Impacto de remoção |
|---|---|---|---|
| **A1 ApifyClient** | `Argos/motor/argos-engine.py apify` subcomando | skill `descoberta-de-virais`, subagent `web-harvester`, subagent `social-tiktok`/`social-instagram` (quando escopo pede Apify actor) | ⚠️ **JÁ TEM MCP** — substituição direta e imediata |
| **A2 SociaVault** | `Argos/motor/argos-engine.py viral` subcomando | skill `descoberta-de-virais` (fluxo multi-plataforma virais TikTok/IG/YT/X) | Sem MCP oficial — precisa alternativa (Apify parcial) OU MCP-próprio Kolden |
| **A3 Speechmatics** | `Argos/motor/argos-engine.py transcrever --engine speechmatics` | skill `transcricao-de-conteudo`, subagent `social-*` (extrai ganchos de vídeo do concorrente → handoff Caliope) | Fallback para Deepgram (perda em pt-BR) — Speechmatics é o melhor pt-BR |
| **A4 Deepgram** | `Argos/motor/argos-engine.py transcrever --engine deepgram` | Idem A3 (fallback) | Fallback para Speechmatics OU MCP-próprio |

### 2.5 Pheme + Emporos

| Wrapper | Consumidores diretos | Consumidores indiretos | Impacto de remoção |
|---|---|---|---|
| **P1 Postiz CLI** | skill `publicacao-social` (Pheme) | agent `publisher`, meta Kolden 100k seguidores (Pheme roadmap) | Thin CLI é aceitável Art. IV — não precisa remover |
| **P2 GHL HTTP direto (Pheme)** | skill `publicacao-social` (path alternativo) | agent `publisher` | ⚠️ **JÁ TEM MCP** — substituir por `mcp__gohighlevel__social-media-posting_create-post` |
| **E1 GHL HTTP direto (Emporos)** | skills `higiene-de-pipeline-crm`, `cadencia-de-outbound`, `qualificacao-bant-meddic`, `negociacao-e-fechamento` | agents `gestor-de-crm`, `qualificador-de-leads`, `executivo-de-cadencia`, `redator-de-propostas`, emporos-chief | ⚠️ **JÁ TEM MCP** — substituir por `mcp__gohighlevel__contacts_*`, `mcp__gohighlevel__opportunities_*`, etc. (20+ tools GHL existentes) |
| **E2 Apollo** | skill `cadencia-de-outbound` (mencionado, código não localizado) | agent `executivo-de-cadencia` | Investigar antes de decidir (código pode estar oculto ou ser roadmap) |
| **E3 Common Room** | skill `cadencia-de-outbound` (mencionado, código não localizado) | Idem | Idem E2 |

## 3. Matriz de acoplamento — quantos consumidores por wrapper

| Wrapper | # consumidores diretos | # squads impactados | Criticidade operacional |
|---|---|---|---|
| H3 Telegram | 1 gateway | 5+ (Ronan usa) | CRÍTICA |
| H4 WhatsApp Cloud | 1 gateway | 3+ (atende cliente) | CRÍTICA |
| H1 Discord | 1 gateway | 2+ | ALTA |
| H2 Slack | 1 gateway | 2+ | ALTA |
| E1 GHL Emporos | 4-5 skills | 1 squad (Emporos) mas coração do funil comercial | ALTA |
| A3 Speechmatics | 1 skill | 3 squads (Argos, Caliope, Aglaia) | ALTA (qualidade pt-BR) |
| A2 SociaVault | 1 skill | 2 squads (Argos, Pheme) | MÉDIA |
| P2 GHL Pheme | 1 skill | 1 squad (Pheme) | MÉDIA |
| A1 ApifyClient | 1 subcomando | 2 squads (Argos, Pheme) | MÉDIA (Apify tem MCP — substituição trivial) |
| A4 Deepgram | 1 skill (fallback) | 3 squads | MÉDIA |
| H9 ElevenLabs | 1 registry | 4+ squads (voz) | MÉDIA (JÁ TEM MCP) |
| H6-H8, H10-H14 (Hermes STT/TTS/x_search) | 1 registry cada | Uso variado | BAIXA-MÉDIA |
| H15 OpenAI fallback LLM | 1 client | Todo Hermes | ALTA em modo fallback |
| H16 OpenAI compression | 1 utility | Todo Hermes | BAIXA |
| H5 Google Chat | 1 plugin | Residual | BAIXA |
| P1 Postiz CLI | 1 skill | 1 squad | BAIXA (aceitável) |
| E2, E3 Apollo/Common Room | menção sem código | 1 squad | INVESTIGAR |

## 4. Cadeia de handoffs afetada

**Se A3 (Speechmatics) sair sem substituto:**
```
Cliente TikTok viral → social-tiktok extrai URL → transcricao-de-conteudo (QUEBRA) → Caliope não recebe copy → funil paid Peitho perde matéria-prima de gancho
```

**Se H3 (Telegram adapter) sair sem substituto:**
```
Ronan escreve para Hermes-chief no Telegram (QUEBRA) → Hermes não recebe intenção → todos os squads perdem entrada principal do dia-a-dia
```

**Se P2 + E1 (GHL) saem sem substituto:**
```
Emporos qualifica lead (QUEBRA CRM) → Pheme publica no GHL social (QUEBRA fallback) → operação cliente pausada
```
**Mitigação P2+E1:** substituição por `mcp__gohighlevel__*` é DIRETA (mesmos endpoints, protocol MCP). Zero tempo de dupla-vida.

## 5. Dependências cruzadas descobertas

- **Argos ↔ Hermes:** skill `transcricao-de-conteudo` do Argos chama tools STT do Hermes (H6-H9, ElevenLabs); Argos motor também tem A3+A4 próprios. **Duplicação:** Argos e Hermes têm STT separado. Consolidação candidata na Fase 3.
- **Pheme ↔ Emporos:** ambos usam GHL — Pheme para social-posting, Emporos para CRM. Mesma credencial `GHL_PIT_KEY` reusada. Substituição por MCP unifica.
- **Argos ↔ Pheme:** skill `descoberta-de-virais` (Argos) alimenta `matriz-de-conteudo` (Pheme). Wrapper compartilhado A1 (Apify) é o único caminho.

## 6. Alerta — código oculto

Emporos E2 (Apollo) e E3 (Common Room) foram mencionados em skill/catálogo mas o Fan-out #3 NÃO localizou código de integração. Duas hipóteses:
- Referência pró-forma no catálogo (roadmap, não implementado ainda)
- Código em pasta não escaneada (fora de `.claude/skills/`, ex.: `Emporos/tools/` ou `Emporos/scripts/`)

Pendente de sondagem manual antes de decidir migração.

---
*Sub-onda 1.3 — Mapa de dependências. 2026-07-06.*
