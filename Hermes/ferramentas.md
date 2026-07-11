---
tipo: nota
area: Hermes
up: "[[Hermes/_MOC-hermes]]"
relacionado:
  - "[[Hermes/README|README]]"
---

# Ferramentas do Squad Hermes

> **Escopo:** catálogo canônico de tools + wrappers proprietários + fronteira vendor.
> **Modelo:** METODO §5 #7 (`Caos/modelos/ferramentas.md` v2.5.1).
> **Referência prévia:** Sub-onda 1.3 do Caos m-20260706 §Categoria "runtime bidirecional".
> **Publicado:** Onda 2 METODO 2026-07-06.

## §1 — Tools próprias (Kolden PT-BR)

| Tool | Path | Tipo | grounding_required | muda_algo | ASL exigido | Nota |
|---|---|---|---|---|---|---|
| Sealer de intenção | `scripts/abre-missao.sh` | Bash | false | false | 1 | Cria Contrato de Missão lacrado (sha256 hash) |
| Dispatcher de squad | `scripts/invoca-squad.ps1` | PowerShell | false | true (via `-Approved`) | 3 | Invoca `claude` headless adotando persona do chief; `-Approved` = gate humano dado |
| Gate de subida | `Dike/.claude/reflexos/gate-de-subida.sh` | Bash | false | false | 1 | Confirma que `dike.assinatura` existe; fail-closed |

## §2 — Wrappers proprietários — categoria "runtime bidirecional" (exceção Art. IV pendente)

Estes 3 wrappers são MCP-não-nativos por **design constitucional**: MCP spec 2024 (JSON-RPC request-response) não modela event streams bidirecionais em tempo real. Emenda Art. IV proposta ao Liceu-chief na Onda 6 do METODO (`Caos/registros/metodo-onda-1/1.6-metodo-kolden/emendas-liceu.md`). Aprovada em bloco pelo Ronan (Rota D-1 na Sub-onda 1.3, ver `Caos/registros/metodo-onda-1/1.3-mcp-camada-1/`).

| Wrapper | Path | Canal | Baileys/Meta/nativo | Estado | Preservado até |
|---|---|---|---|---|---|
| WhatsApp bridge | `scripts/whatsapp-bridge/bridge.js` | WhatsApp | Baileys | ATIVO | Emenda Art. IV ratificada + MCP spec 2025-2026 `streamable-http-transport` maturar |
| Discord voice doctor | `scripts/discord-voice-doctor.py` | Discord (voice) | discord.py | ATIVO | idem |
| Gateway Windows auto-start | `scripts/hermes-gateway/` | Multi (Telegram/Discord/Slack/WhatsApp gateway) | Vendor Nous | ATIVO | idem |

**Substituições MCP oficiais indicadas pela Sub-onda 1.3 do Caos:**
- Grupo A (7d): ApifyClient, GHL×2 (Pheme+Emporos), ElevenLabs — MCP oficial já cadastrado, substituição direta.
- Grupo B (30d): Speechmatics, Deepgram, SociaVault, Mistral, Groq, MiniMax — MCPs-próprios simples.
- Grupo B (90d): xAI consolidated + decisão OpenAI/Google TTS pendente.
- Grupo C (permanente): Discord/Slack/Telegram/WhatsApp/Google Chat (esta seção §2).

Implementação real é escopo **Fase 3 residual** (Contrato próprio após as 26 Ondas), não desta Onda 2.

## §3 — Runtime vendor Nous (fronteira externa×Kolden — INTOCÁVEL nesta Onda)

Estes módulos Python + config vivem no vendor Nous e NÃO são tocados pela padronização Kolden. Alterá-los exige Contrato de Missão próprio (Fase 3 residual).

| Categoria | Paths |
|---|---|
| Runtime core | `agent/` (~100 módulos: anthropic_adapter, azure_identity_adapter, bedrock_adapter, browser_provider, codex_responses_adapter, gemini_native_adapter, google_code_assist, ...) |
| CLI vendor | `hermes_cli/` (auth, banner, backup, active_sessions, azure_detect, ...) |
| Providers/plugins | `providers/`, `plugins/`, `acp_adapter/`, `acp_registry/`, `codex_runtime/` |
| Ferramentas de conexão | `tools/`, `toolsets.py`, `toolset_distributions.py`, `model_tools.py` |
| Docker/deploy | `Dockerfile`, `docker-compose.yml`, `docker-compose.windows.yml`, `flake.nix`, `flake.lock`, `nix/` |
| Setup Python | `pyproject.toml`, `setup.py`, `MANIFEST.in`, `constraints-termux.txt`, `uv.lock`, `package.json` |
| Testes vendor | `tests/`, `scripts/tests/`, `scripts/run_tests*.py`, `scripts/benchmark_*`, `scripts/tool_search_livetest.py` |

## §4 — Skills locais

### §4.1 — Skills Kolden PT-BR (canônicas)

| Skill | Path (após MOVE do gate humano Q2.A) | Escopo |
|---|---|---|
| `roteamento-de-squad` | `.claude/skills/roteamento-de-squad/SKILL.md` | Roteia pedidos para squad certo via `invoca-squad.ps1` + portão de aprovação em 2 etapas |

### §4.2 — Skills vendor Nous (fronteira — intocáveis)

19 skills EN em `skills/`: apple, autonomous-ai-agents, creative, data-science, devops, dogfood, email, github, index-cache, media, mlops, note-taking, productivity, research, smart-home, social-media, software-development, yuanbao.

Padrão de frontmatter Nous (`platforms:` + `metadata.hermes.tags:` + `metadata.hermes.related_skills:`) NÃO é o padrão Kolden. Não migrar (fronteira).

## §5 — Convenção de grounding

- **`grounding_required: true`** — obrigatório para toda tool que retorna fato datável (data, nome, versão, número, quantidade).
- **`grounding_required: false`** — para tool de dispatch/roteamento/reflexo (não retorna fato).

Hermes hoje não emite fato datável em output (delegação 100%). Sua rede de tools opera principalmente com `grounding_required: false`.

## §6 — Portão de aprovação (recap operacional)

Antes de qualquer invocação com `muda_algo: true`:
1. Chamar sem `-Approved` (diagnóstico-primeiro).
2. Squad devolve achados + o que faria.
3. Ronan aprova explicitamente ("ok" ou equivalente).
4. Chamar com `-Approved`.

Reflexo formal: `.claude/reflexos/interrupt-before-mutation.sh`.

---

*Ferramentas.md Hermes v1.0 — canônico Kolden. Publicado pela Onda 2 do METODO 2026-07-06. Categoria "runtime bidirecional" preservada em exceção Art. IV pendente. Fronteira vendor Nous intocável até Fase 3 residual.*
