# Plano de Migração Escalonada — Sub-onda 1.3 (MCP Camada 1)

> **Contrato:** m-20260706-metodo-kolden · Sub-onda 1.3
> **Data:** 2026-07-06
> **Norma:** Constituição v2.5.0 Art. IV — dupla-vida ≤90d, BLOCK após

## 1. Grades de decisão

Cada wrapper cai em um dos 6 grupos:

- **A — Substituição direta (<7 dias):** MCP oficial já cadastrado; troca é reescrita cirúrgica da skill/tool. **Zero janela de dupla-vida** (não faz sentido — o MCP já existe e funciona).
- **B — MCP-próprio simples (dupla-vida 30 dias):** Sem MCP oficial; API tem 1-5 endpoints; adapter FastMCP em <2 dias de trabalho; janela curta para testar em produção.
- **C — MCP-próprio complexo (dupla-vida 90 dias):** Sem MCP oficial; requer arquitetura non-trivial (multi-tenant, stateful, bidirecional) OU decisão de vendor externo (contato/parceria).
- **D — Exceção constitucional proposta (bump Art. IV):** MCP spec não modela o caso; Kolden propõe emenda formal ao Art. IV reconhecendo a categoria.
- **E — Deprecar / trocar por opção com MCP:** provider substituível por outro que já tem MCP oficial; migração é decisão de política, não arquitetura.
- **F — Investigar antes de decidir:** menção sem código; possível dead-reference; sondagem manual antes de plano.

## 2. Distribuição dos 22 wrappers pelos grupos

### Grupo A — Substituição direta (<7 dias) — 4 wrappers

| # | Wrapper | Substituto MCP | Ação |
|---|---|---|---|
| A1 | ApifyClient (Argos) | `mcp__apify__call-actor` + `mcp__apify__search-actors` + `mcp__apify__get-dataset-items` | Reescrever `argos-engine.py:_harvest_apify` como chamada MCP; remover import `apify_client`; remover env `APIFY_TOKEN` (MCP tem auth próprio) |
| P2 | GHL HTTP (Pheme) | `mcp__gohighlevel__social-media-posting_create-post` + `_get-post` + `_edit-post` | Reescrever skill `publicacao-social` bloco "GHL fallback" para invocar MCP; remover curl direto |
| E1 | GHL HTTP (Emporos) | `mcp__gohighlevel__contacts_*` (10 tools), `_opportunities_*` (5 tools), `_conversations_*` (3 tools), `_payments_*` (2 tools) | Reescrever skills `higiene-de-pipeline-crm`, `cadencia-de-outbound`, `qualificacao-bant-meddic`, `negociacao-e-fechamento` para invocar MCP; remover `GHL_PIT_KEY` da matriz de skills (mantido no Infisical para outros usos) |
| H9 | ElevenLabs SDK (Hermes) | `mcp__elevenlabs__text_to_speech` + `_speech_to_text` + `_voice_clone` + `_search_voices` (18 tools) | Reescrever provider `elevenlabs` em `tts_tool.py` e `transcription_tools.py` como delegate ao MCP; remover import `elevenlabs` |

**Cronograma A:** Semanas 1-2 pós-aprovação. Ordem sugerida: E1 primeiro (funil comercial, MCP mais maduro) → P2 → A1 → H9.

### Grupo B — MCP-próprio simples (dupla-vida 30 dias) — 6 wrappers

| # | Wrapper | Complexidade | MCP-próprio a construir |
|---|---|---|---|
| A3 | Speechmatics | Baixa — 2 endpoints (submit_job + wait_for_completion) | `Argos/mcp/speechmatics/` FastMCP Node/TS; 2 tools (`speechmatics_transcrever`, `speechmatics_status`); Infisical; pt-BR |
| A4 | Deepgram | Baixa — 1 endpoint principal + streaming (opcional v2) | `Argos/mcp/deepgram/` FastMCP; 1 tool inicial (`deepgram_transcrever_pt`) |
| H7 | Groq STT | Baixa — 1 endpoint OpenAI-compatible | `Hermes/mcp/groq-stt/` ou consolidar em `Hermes/mcp/hermes-audio/` (multi-provider) |
| H8 | Mistral STT+TTS | Baixa-Média — 4 endpoints | `Hermes/mcp/mistral-voxtral/` FastMCP; 4 tools |
| H11 | MiniMax TTS | Baixa — 1 endpoint | `Hermes/mcp/minimax-tts/` FastMCP; 1 tool |
| A2 | SociaVault | Média — API multi-plataforma, ~10 endpoints | `Argos/mcp/sociavault/` FastMCP; 5-8 tools (perfil, virais, hashtag por plataforma) |

**Estratégia dupla-vida 30d:** wrapper existente permanece **em paralelo** com MCP-próprio durante 30 dias — skill migra para MCP, motor mantém wrapper para rollback rápido. Após 30d, wrapper é removido (BLOCK em Fase 6).

**Cronograma B:** Semanas 3-8 pós-aprovação. **Ordem sugerida** (por impacto operacional): A3 Speechmatics (qualidade pt-BR crítica) → A4 Deepgram → A2 SociaVault → H8 Mistral → H7 Groq → H11 MiniMax.

### Grupo C — MCP-próprio complexo (dupla-vida 90 dias) — 2 wrappers

| # | Wrapper | Complexidade | Motivo dos 90 dias |
|---|---|---|---|
| H13+H14 | xAI STT+TTS+x_search | Média-Alta — 3 domínios diferentes, auth OAuth SuperGrok | Kolden construir 1 MCP consolidado xAI cobrindo audio + reasoning + search; requer contato vendor para clarificar rate-limit por domínio; auth OAuth exige revisar shim Infisical |
| H10+H12 | OpenAI TTS + Google Gemini TTS | Alta — provider externos com MCP disputado; Google prometeu MCP mas não entregou | Decisão pendente: (a) construir wrappers próprios; (b) esperar Google/OpenAI publicarem MCP oficial; (c) deprecar em favor de ElevenLabs |

**Cronograma C:** Semanas 5-14 pós-aprovação (janelas sobrepostas com Grupo B).

### Grupo D — Exceção constitucional proposta — 5 wrappers (candidatos)

| # | Wrappers | Categoria proposta | Justificativa |
|---|---|---|---|
| H1-H5 | Discord, Slack, Telegram, WhatsApp Cloud, Google Chat | **Adapter de runtime bidirecional em tempo real** | MCP spec 2024 (Anthropic 25/nov/2024) é request-response síncrono. Event streams (Discord gateway, Slack Socket Mode, Telegram polling, WhatsApp webhook, Pub/Sub) não se encaixam sem re-implementar o loop de eventos dentro do MCP server — o que introduziria latência e ponto único de falha. Categoria não existia quando o Art. IV foi ratificado (v2.5.0, 2026-07-05). |

**Duas rotas propostas para o gate humano:**

- **Rota D-1 (Ratificação):** aceitar como categoria constitucional nova; H1-H5 permanecem como SDK-wrappers legítimos SEM dupla-vida. Emenda ao Art. IV formalizada na Onda 6 do Método via ida-e-volta com Liceu-chief (procedência: LSP-inspiração do MCP + evento vs request-response na literatura de sistemas distribuídos).
- **Rota D-2 (Postergação):** manter H1-H5 em dupla-vida indefinida enquanto MCP spec 2025-2026 (`streamable-http-transport`, previsto na roadmap Anthropic) não maturar. Reavaliar em janeiro/2027.

### Grupo E — Deprecar / trocar — 2 wrappers

| # | Wrapper | Alternativa | Ação |
|---|---|---|---|
| H15 | OpenAI fallback LLM (auxiliary_client) | Deprecar. Fallback = degradar gracefully (Anthropic-only), não recorrer a OpenAI direto | Contradiz soberania Kolden (dado do Ronan flui para OpenAI). Remover fallback OpenAI; se Anthropic indisponível, retornar erro operacional para tratar via Hermes retry policy |
| H16 | OpenAI trajectory compression | Anthropic SDK ou `mcp__claude_ai_*` | Substituir por Claude direto (mesma qualidade, dentro da soberania). Trabalho <1 dia |

**Cronograma E:** Semanas 1-3 pós-aprovação (paralelo ao Grupo A).

### Grupo F — Investigar — 2 wrappers

| # | Wrapper | Ação de sondagem |
|---|---|---|
| E2 | Apollo (Emporos, menção) | Grep exaustivo em `Emporos/tools/`, `Emporos/scripts/`, `Emporos/agents/*.md` procurando `apollo`, `Apollo`, `apolloapi`. Se código existe → adicionar à lista B (MCP-próprio simples). Se não existe → remover menção do catálogo Emporos (dead-reference) |
| E3 | Common Room (Emporos, menção) | Idem E2 para `common-room`, `commonroom` |

**Cronograma F:** Semana 1 pós-aprovação (sondagem <2h). Decisão sai daí.

## 3. Ordem topológica sugerida

Semanas de execução (assumindo 1 sessão/semana com ritmo alto):

```
Semana 1: Sondagem F (E2, E3) + Deprecar H15+H16
Semana 2: Grupo A — E1 GHL Emporos (impacto operacional máximo)
Semana 3: Grupo A — P2 GHL Pheme + A1 Apify
Semana 4: Grupo A — H9 ElevenLabs + começar Grupo B — A3 Speechmatics
Semana 5-6: Grupo B — A3 conclui + A4 Deepgram + começar A2 SociaVault
Semana 7-8: Grupo B — A2 conclui + H8 Mistral + H7 Groq
Semana 9-10: Grupo B — H11 MiniMax + começar Grupo C — H13+H14 xAI
Semana 11-14: Grupo C — xAI conclui + H10/H12 (decisão pendente)
Semana 15: Ritualização — Onda 6 do Método propõe emenda Art. IV para Grupo D (H1-H5)
```

**Marco crítico:** Semana 4 já produz redução mensurável de >80% dos wrappers "redundantes" (Grupo A + E). Semana 10 fecha o Grupo B. Grupo C+D são a janela longa.

## 4. Métricas de sucesso da Sub-onda 1.3 (para verificação Dike)

- [ ] Grupo A (4 wrappers) — 100% migrado até semana 4
- [ ] Grupo B (6 wrappers) — 100% em dupla-vida até semana 8; 100% BLOCK até semana 12
- [ ] Grupo C (2 wrappers) — MCP-próprio construído E ligado até semana 14
- [ ] Grupo D (5 wrappers) — decisão constitucional lavrada em Onda 6 (Ronan + Liceu-chief)
- [ ] Grupo E (2 wrappers) — 100% substituído até semana 3
- [ ] Grupo F (2 wrappers) — decisão binária (integrar ou remover) até semana 1
- [ ] Nenhum novo wrapper criado sem passar por Fase 5.4 (`criacao-de-mcp`) do Ritual
- [ ] `Caos/modelos/ferramentas.md` atualizado com casos reais (não template genérico) — este dossiê propõe o diff cirúrgico

## 5. Riscos e mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Semana 2 (E1 GHL) trava operação Emporos se MCP oficial falhar | Baixa | Alta | Rollback via feature-flag; skill Emporos mantém 2 caminhos por 3 dias |
| Grupo B leva mais que 30d por complexidade oculta em API | Média | Média | Timebox rígido; se >30d, escalar para Grupo C sem culpa |
| Grupo C (xAI) esbarra em rate-limit não documentado | Alta | Baixa | Iniciar com endpoints de leitura (x_search) antes de write (STT/TTS) |
| Grupo D (exceção) polariza — Ronan quer estrita | Alta | Alta | Preparar Rota D-1 e D-2 no gate; deixar Ronan escolher |
| Sondagem F revela Apollo em produção com dependência não mapeada | Baixa | Média | Se sim, promover E2 ao Grupo B com prioridade |
| Novo Kolden squad criado durante execução consome wrapper legado | Média | Baixa | Reflexo PostToolUse: bloquear `import apify_client`, `import speechmatics`, etc., em qualquer arquivo novo pós-semana 4 |

---
*Sub-onda 1.3 — Plano de migração escalonada. 2026-07-06.*
