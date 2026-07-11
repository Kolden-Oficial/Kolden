---
tipo: nota
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/modelos/_indice|_indice]]"
---

# Ferramentas — <Nome do Agente>

Template do `ferramentas.md`. Catálogo de toda API, MCP, CLI ou integração que o agente
usa. **Constituição, Artigo IV:** toda ferramenta citada no CLAUDE.md PRECISA ter uma
entrada aqui. **Artigo VII:** nenhuma credencial em texto puro — só a referência ao Infisical.
Apague estas instruções no arquivo final. Substitua os blocos entre <>.

---

## Tabela de ferramentas

| Ferramenta | Função | Forma de acesso | **MCP-nativo? (v2.5 Art. IV)** | **`grounding_required`? (v2.5 Art. IX)** | Credencial (Infisical) |
|------------|--------|-----------------|-------------------------------|----------------------------------------|------------------------|
| **Infisical** | Ferramenta padrão de segredos — todas as outras credenciais vêm daqui | MCP `infisical` ou API REST | sim (MCP-nativo) | não (não retorna fato datável) | `INFISICAL_TOKEN` (única credencial em env var do sistema) |
| <ex.: GoHighLevel> | <enviar/atualizar contatos no CRM> | <MCP-nativo `gohighlevel` / adapter> | <sim / adapter (justificar) / **wrapper (BLOCK em 90d — declarar dupla-vida abaixo)**> | <sim se retorna fato datável (ex.: data de última interação); não caso contrário> | <`/kolden/prod/GHL_PIT_KEY`> |
| <ex.: Supabase> | <memória vetorial e persistência> | <MCP-nativo `supabase` / SDK> | <sim / adapter> | <sim para leituras de fatos; não para writes> | <`/kolden/prod/SUPABASE_KEY`> |
| <ex.: Speechmatics (transcrição pt-BR)> | <transcrever áudio em português com qualidade superior> | <MCP-próprio `speechmatics` a construir (Sub-onda 1.3 do Método)> | <**adapter em construção — dupla-vida 30d até semana 6**; hoje é SDK Python direto> | <sim (retorna texto datado)> | <`/kolden/prod/SPEECHMATICS_API_KEY`> |
| <ex.: Discord (runtime bidirecional)> | <receber e enviar mensagens em canal Discord em tempo real> | <SDK Python `discord.py` via adapter Hermes> | <**exceção proposta v2.6 — runtime bidirecional em tempo real** (event stream); MCP spec 2024 não modela o caso, ver Onda 6 do Método> | <não (transporte, não fato)> | <`/kolden/prod/DISCORD_BOT_TOKEN`> |

## Detalhamento por ferramenta

### Infisical — Ferramenta Padrão de Segredos (obrigatória em todo agente)
- **Quando usar:** SEMPRE que precisar de qualquer credencial, API key ou token.
- **Como chamar:** MCP `infisical` → `infisical_get_secret(path="/kolden/prod/NOME_DA_CHAVE")` ou API REST `/api/v3/secrets/raw/<path>`.
- **Autenticação:** `INFISICAL_TOKEN` — única credencial que pode estar em variável de ambiente do sistema (configurada uma vez pelo humano).
- **Se falhar:** não continuar; logar em `registros/erros-infisical.md`; escalar para humano. Nunca usar fallback em texto puro.
- **Limites:** ver rate limit da API do Infisical na documentação oficial.

### <Ferramenta 1>
- **Quando usar:** <gatilho/situação>.
- **Como chamar:** <endpoint, método, parâmetros essenciais ou nome do MCP>.
- **Autenticação:** credencial via Infisical: `/kolden/<ambiente>/<NOME_DA_CHAVE>`.
- **Se falhar:** <comportamento esperado: retry, fallback, escalar para humano>.
- **Limites:** <rate limit, custo por chamada, volume máximo>.

### <Ferramenta 2>
- **Quando usar:** <...>
- **Como chamar:** <...>
- **Autenticação:** <...>
- **Se falhar:** <...>
- **Limites:** <...>

## Plano de dupla-vida (Art. IV v2.5.0 — obrigatório se alguma ferramenta é wrapper proprietário)

Wrapper proprietário identificado na tabela acima entra em dupla-vida de **até 90 dias**: adapter mantém a interface enquanto MCP-nativo é ligado. Após 90 dias, wrapper é **BLOCK** em Fase 6.

### Regra de preenchimento

- Um wrapper vai para esta tabela **se, e somente se**, a coluna "MCP-nativo?" da tabela principal marcou "**wrapper (BLOCK em 90d)**" ou "adapter em construção — dupla-vida <N>d".
- **Data início** = data em que o wrapper foi identificado no diagnóstico (Fase 2 do Ritual) OU data da absorção do repositório que trouxe o wrapper.
- **Data limite** = início + 30d (adapter simples: 1-5 endpoints), 60d (adapter médio: 5-15 endpoints), 90d (adapter complexo: multi-tenant/OAuth/streaming).
- **Owner** = agente Kolden responsável (usualmente o squad-dono do wrapper OU Caos como fábrica).
- **Status** = `em-construcao` → `ligado-em-dupla-vida` → `migrado` → `wrapper-removido`.

### Casos canônicos (referência — do Contrato m-20260706 Sub-onda 1.3)

| Wrapper existente | MCP-nativo em construção | Data início | Data limite | Owner | Status |
|---|---|---|---|---|---|
| `apify_client.ApifyClient` (Argos motor) | `mcp__apify__*` **já existe** (substituição direta) | 2026-07-06 | 2026-07-13 (7d) | argos-chief | `substituicao-direta` |
| `GHL PIT Key` via curl (Pheme, Emporos) | `mcp__gohighlevel__*` **já existe** (substituição direta) | 2026-07-06 | 2026-07-13 (7d) | pheme-chief, emporos-chief | `substituicao-direta` |
| `speechmatics-python` SDK (Argos motor) | MCP-próprio `speechmatics` (Argos/mcp/speechmatics/) — 2 tools | 2026-07-06 | 2026-08-05 (30d) | argos-chief | `em-construcao` |
| `deepgram-sdk` (Argos motor) | MCP-próprio `deepgram` (Argos/mcp/deepgram/) — 1 tool | 2026-07-06 | 2026-08-05 (30d) | argos-chief | `em-construcao` |
| `requests` para SociaVault (Argos motor) | MCP-próprio `sociavault` (Argos/mcp/sociavault/) — 5-8 tools | 2026-07-06 | 2026-08-19 (45d) | argos-chief | `em-construcao` |
| `mistralai` SDK STT+TTS (Hermes tools) | MCP-próprio `mistral-voxtral` (Hermes/mcp/) — 4 tools | 2026-07-06 | 2026-08-05 (30d) | hermes-chief | `em-construcao` |
| `groq` client STT (Hermes tools) | MCP-próprio `groq-stt` OU consolidação `hermes-audio` | 2026-07-06 | 2026-08-05 (30d) | hermes-chief | `em-construcao` |
| `xai_http` custom (Hermes tools) | MCP-próprio `xai-consolidated` (STT+TTS+search) | 2026-07-06 | 2026-10-04 (90d) | hermes-chief | `em-construcao` |

### Exceção constitucional proposta (v2.6 — Onda 6 do Método)

A partir da Sub-onda 1.3, categoria **"adapter de runtime bidirecional em tempo real"** foi identificada como não-coberta pelo MCP spec 2024 (request-response síncrono). Adapters de plataforma de mensageria (`discord.py`, `slack-bolt`, `python-telegram-bot`, `whatsapp-graph`, `google-cloud pubsub`) entram nesta categoria e ficam **suspensos do gate BLOCK do Art. IV** até:

1. Ida-e-volta com Liceu-chief propor emenda formal ao Art. IV (Onda 6 do Método) — se rejeitada, wrappers migram para dupla-vida 90d + reavaliação a cada release do MCP spec.
2. MCP spec publicar `streamable-http-transport` estável (roadmap Anthropic 2025-2026) — ao publicar, wrappers migram compulsoriamente em 90d.

**Tabela de wrappers sob exceção (documentar por transparência):**

| Wrapper sob exceção | Justificativa | Reavaliar em |
|---|---|---|
| Discord adapter (Hermes) | Event stream via Discord Gateway (WebSocket) | Onda 6 do Método OU release MCP streamable |
| Slack adapter (Hermes) | Socket Mode async | Idem |
| Telegram adapter (Hermes) | Long-polling ou webhook | Idem |
| WhatsApp Cloud adapter (Hermes) | Webhook Meta Graph + Bearer state | Idem |
| Google Chat adapter (Hermes) | Pub/Sub push | Idem |

Se **este agente** não tem nenhum wrapper e nenhuma exceção declarada = as duas tabelas ficam vazias (situação padrão v2.5.1 pós-migração).

Fonte: Anthropic 25/nov/2024 "Introducing the Model Context Protocol" (modelcontextprotocol.io); Constituição Art. IV refactored (v2.5.0); **casos canônicos e exceção "runtime bidirecional" da Sub-onda 1.3 do Contrato m-20260706-metodo-kolden (Caos/registros/metodo-onda-1/1.3-mcp-camada-1/)**.

## MCPs próprios (construídos pelo Caos)

Diferencie **MCP consumido** (já existe no catálogo `sobre-a-empresa/Ferramentas/` — você só conecta e usa) de
**MCP construído** (integração própria do Kolden, criada na Fase 5.4 via habilidade
`criacao-de-mcp`). Liste aqui apenas os MCPs/APIs que ESTE agente construiu.

| MCP próprio | Fluxos que expõe (tools) | Stack | Credencial (Infisical) | Eval |
|---|---|---|---|---|
| <ex.: kolden-crm> | <`sincronizar_contato`, `mover_no_funil`> | <FastMCP / Node> | <`/kolden/prod/...`> | <10 Q&A ok> |

Cada MCP construído precisa: tools de fluxo (não 1:1 de endpoint), erros acionáveis em pt-BR,
`annotations` de segurança por tool, credenciais só via Infisical e o harness de avaliação
(~10 perguntas) passando. Detalhes na habilidade `criacao-de-mcp`.

## Stack de referência do Kolden

Ao escolher ferramentas, priorize a stack interna (ver `CLAUDE.md`): OpenRouter e Eden AI
(multi-LLM), DeepSeek e Hugging Face (modelos), Supabase e Neon (dados/memória vetorial),
Firecrawl (extração web), Browserbase (navegador), Infisical (segredos), Sentry
(observabilidade), GitHub (versionamento). Só saia da stack se nenhuma interna resolver — e justifique.
