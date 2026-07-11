---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/metodo-onda-1/1.3-mcp-camada-1/inventario|inventario]]"
  - "[[Caos/registros/metodo-onda-1/1.3-mcp-camada-1/mapa-de-dependencias|mapa-de-dependencias]]"
  - "[[Caos/registros/metodo-onda-1/1.3-mcp-camada-1/plano-migracao-escalonada|plano-migracao-escalonada]]"
  - "[[Caos/registros/metodo-onda-1/1.3-mcp-camada-1/sumario-executivo|sumario-executivo]]"
---

# Diff Cirúrgico — Caos/modelos/ferramentas.md v2.5 → v2.5.1

> **Contrato:** m-20260706-metodo-kolden · Sub-onda 1.3
> **Alvo:** `Caos/modelos/ferramentas.md` (template canônico do Ritual, Fase 5.3)
> **Escopo:** preencher a seção "Plano de dupla-vida" com **casos reais** da varredura de Sub-onda 1.3 (hoje é template genérico com placeholder `<nome>`)
> **Preserva:** tabela principal, detalhamento Infisical, MCPs próprios, stack de referência — NÃO tocar

## 1. Mudanças propostas

### 1.1 Seção "Tabela de ferramentas" — acrescentar 2 linhas de exemplo canônico após o exemplo Supabase (linha 16)

**Motivo:** hoje a tabela tem 3 exemplos (Infisical, GHL, Supabase) — todos com resposta "sim / adapter" na coluna MCP-nativo. Para o template servir de guia real, precisa mostrar as 3 categorias possíveis (sim / adapter / wrapper com dupla-vida). Sub-onda 1.3 identificou casos concretos.

**Diff no ferramentas.md linhas 12-16 (tabela atual):**

```diff
 ## Tabela de ferramentas

 | Ferramenta | Função | Forma de acesso | **MCP-nativo? (v2.5 Art. IV)** | **`grounding_required`? (v2.5 Art. IX)** | Credencial (Infisical) |
 |------------|--------|-----------------|-------------------------------|----------------------------------------|------------------------|
 | **Infisical** | Ferramenta padrão de segredos — todas as outras credenciais vêm daqui | MCP `infisical` ou API REST | sim (MCP-nativo) | não (não retorna fato datável) | `INFISICAL_TOKEN` (única credencial em env var do sistema) |
 | <ex.: GoHighLevel> | <enviar/atualizar contatos no CRM> | <MCP-nativo `gohighlevel` / adapter> | <sim / adapter (justificar) / **wrapper (BLOCK em 90d — declarar dupla-vida abaixo)**> | <sim se retorna fato datável (ex.: data de última interação); não caso contrário> | <`/kolden/prod/GHL_PIT_KEY`> |
 | <ex.: Supabase> | <memória vetorial e persistência> | <MCP-nativo `supabase` / SDK> | <sim / adapter> | <sim para leituras de fatos; não para writes> | <`/kolden/prod/SUPABASE_KEY`> |
+| <ex.: Speechmatics (transcrição pt-BR)> | <transcrever áudio em português com qualidade superior> | <MCP-próprio `speechmatics` a construir (Sub-onda 1.3 do Método)> | <**adapter em construção — dupla-vida 30d até semana 6**; hoje é SDK Python direto> | <sim (retorna texto datado)> | <`/kolden/prod/SPEECHMATICS_API_KEY`> |
+| <ex.: Discord (runtime bidirecional)> | <receber e enviar mensagens em canal Discord em tempo real> | <SDK Python `discord.py` via adapter Hermes> | <**exceção proposta v2.6 — runtime bidirecional em tempo real** (event stream); MCP spec 2024 não modela o caso, ver Onda 6 do Método> | <não (transporte, não fato)> | <`/kolden/prod/DISCORD_BOT_TOKEN`> |
```

### 1.2 Seção "Plano de dupla-vida" — reescrever com casos reais (linhas 41-49)

**Motivo:** hoje é template com placeholder `<nome>` (vazio). Sub-onda 1.3 identificou 6 wrappers no Grupo B que entram em dupla-vida real. Substituir template por caso-exemplo canônico + regra clara sobre quem preenche.

**Diff no ferramentas.md linhas 41-49:**

```diff
 ## Plano de dupla-vida (Art. IV v2.5.0 — obrigatório se alguma ferramenta é wrapper proprietário)

 Wrapper proprietário identificado na tabela acima entra em dupla-vida de **até 90 dias**: adapter mantém a interface enquanto MCP-nativo é ligado. Após 90 dias, wrapper é **BLOCK** em Fase 6.

-| Wrapper existente | MCP-nativo em construção | Data início dupla-vida | Data limite (+90d) | Owner da migração | Status |
-|---|---|---|---|---|---|
-| <nome> | <nome MCP planejado> | AAAA-MM-DD | AAAA-MM-DD | <agente/humano> | <em-construcao / ligado / migrado> |
-
-Se a tabela está vazia = sem wrappers proprietários no agente (situação padrão v2.5).
+### Regra de preenchimento
+
+- Um wrapper vai para esta tabela **se, e somente se**, a coluna "MCP-nativo?" da tabela principal marcou "**wrapper (BLOCK em 90d)**" ou "adapter em construção — dupla-vida <N>d".
+- **Data início** = data em que o wrapper foi identificado no diagnóstico (Fase 2 do Ritual) OU data da absorção do repositório que trouxe o wrapper.
+- **Data limite** = início + 30d (adapter simples: 1-5 endpoints), 60d (adapter médio: 5-15 endpoints), 90d (adapter complexo: multi-tenant/OAuth/streaming).
+- **Owner** = agente Kolden responsável (usualmente o squad-dono do wrapper OU Caos como fábrica).
+- **Status** = `em-construcao` → `ligado-em-dupla-vida` → `migrado` → `wrapper-removido`.
+
+### Casos canônicos (referência — do Contrato m-20260706 Sub-onda 1.3)
+
+| Wrapper existente | MCP-nativo em construção | Data início | Data limite | Owner | Status |
+|---|---|---|---|---|---|
+| `apify_client.ApifyClient` (Argos motor) | `mcp__apify__*` **já existe** (substituição direta) | 2026-07-06 | 2026-07-13 (7d) | argos-chief | `substituicao-direta` |
+| `GHL PIT Key` via curl (Pheme, Emporos) | `mcp__gohighlevel__*` **já existe** (substituição direta) | 2026-07-06 | 2026-07-13 (7d) | pheme-chief, emporos-chief | `substituicao-direta` |
+| `speechmatics-python` SDK (Argos motor) | MCP-próprio `speechmatics` (Argos/mcp/speechmatics/) — 2 tools | 2026-07-06 | 2026-08-05 (30d) | argos-chief | `em-construcao` |
+| `deepgram-sdk` (Argos motor) | MCP-próprio `deepgram` (Argos/mcp/deepgram/) — 1 tool | 2026-07-06 | 2026-08-05 (30d) | argos-chief | `em-construcao` |
+| `requests` para SociaVault (Argos motor) | MCP-próprio `sociavault` (Argos/mcp/sociavault/) — 5-8 tools | 2026-07-06 | 2026-08-19 (45d) | argos-chief | `em-construcao` |
+| `mistralai` SDK STT+TTS (Hermes tools) | MCP-próprio `mistral-voxtral` (Hermes/mcp/) — 4 tools | 2026-07-06 | 2026-08-05 (30d) | hermes-chief | `em-construcao` |
+| `groq` client STT (Hermes tools) | MCP-próprio `groq-stt` OU consolidação `hermes-audio` | 2026-07-06 | 2026-08-05 (30d) | hermes-chief | `em-construcao` |
+| `xai_http` custom (Hermes tools) | MCP-próprio `xai-consolidated` (STT+TTS+search) | 2026-07-06 | 2026-10-04 (90d) | hermes-chief | `em-construcao` |
+
+### Exceção constitucional proposta (v2.6 — Onda 6 do Método)
+
+A partir da Sub-onda 1.3, categoria **"adapter de runtime bidirecional em tempo real"** foi identificada como não-coberta pelo MCP spec 2024 (request-response síncrono). Adapters de plataforma de mensageria (`discord.py`, `slack-bolt`, `python-telegram-bot`, `whatsapp-graph`, `google-cloud pubsub`) entram nesta categoria e ficam **suspensos do gate BLOCK do Art. IV** até:
+
+1. Ida-e-volta com Liceu-chief propor emenda formal ao Art. IV (Onda 6 do Método) — se rejeitada, wrappers migram para dupla-vida 90d + reavaliação a cada release do MCP spec.
+2. MCP spec publicar `streamable-http-transport` estável (roadmap Anthropic 2025-2026) — ao publicar, wrappers migram compulsoriamente em 90d.
+
+**Tabela de wrappers sob exceção (documentar por transparência):**
+
+| Wrapper sob exceção | Justificativa | Reavaliar em |
+|---|---|---|
+| Discord adapter (Hermes) | Event stream via Discord Gateway (WebSocket) | Onda 6 do Método OU release MCP streamable |
+| Slack adapter (Hermes) | Socket Mode async | Idem |
+| Telegram adapter (Hermes) | Long-polling ou webhook | Idem |
+| WhatsApp Cloud adapter (Hermes) | Webhook Meta Graph + Bearer state | Idem |
+| Google Chat adapter (Hermes) | Pub/Sub push | Idem |
+
+Se **este agente** não tem nenhum wrapper e nenhuma exceção declarada = as duas tabelas ficam vazias (situação padrão v2.5.1 pós-migração).
```

### 1.3 Nota de rodapé — atualizar a linha de fonte (linha 51)

```diff
-Fonte: Anthropic 25/nov/2024 "Introducing the Model Context Protocol" (modelcontextprotocol.io); Constituição Art. IV refactored (v2.5.0).
+Fonte: Anthropic 25/nov/2024 "Introducing the Model Context Protocol" (modelcontextprotocol.io); Constituição Art. IV refactored (v2.5.0); **casos canônicos e exceção "runtime bidirecional" da Sub-onda 1.3 do Contrato m-20260706-metodo-kolden (Caos/registros/metodo-onda-1/1.3-mcp-camada-1/)**.
```

## 2. Resumo de impacto do diff

| Local | Antes | Depois | Delta |
|---|---|---|---|
| Tabela principal | 3 linhas de exemplo (todas "sim/adapter") | 5 linhas cobrindo 4 categorias (sim, adapter, wrapper-BLOCK, exceção) | +2 linhas, +1 coluna de categoria implícita |
| Plano de dupla-vida | Template genérico com 1 linha placeholder | Regra de preenchimento + 8 casos canônicos reais + exceção constitucional | +37 linhas úteis |
| Rodapé | Fonte MCP Anthropic 2024 | Fonte + procedência Sub-onda 1.3 | +1 procedência |

**Contagem final:** 3 blocos de mudança, +42 linhas úteis, 0 remoções (só substituições).

## 3. Preservações declaradas

- Não tocar **Detalhamento Infisical** (linhas 20-25) — canônico
- Não tocar **MCPs próprios** (linhas 53-65) — canônico
- Não tocar **Stack de referência** (linhas 67-73) — canônico
- Não tocar cabeçalho do arquivo (linhas 1-9) — comentário-guia

## 4. Verificação pré-aplicação

- [ ] Todas as 8 linhas da tabela de casos canônicos batem com o `inventario.md` (mesma numeração de wrappers)
- [ ] Datas coerentes com o `plano-migracao-escalonada.md` (semana 1 = 2026-07-06 + 7d; semana 4 = 2026-08-05; semana 14 = 2026-10-04)
- [ ] Nenhuma referência a wrapper Kolden por nome próprio na tabela (só padrão-Kolden ex.: "MCP-próprio `speechmatics`") — não vaza informação de agente-cliente
- [ ] Owner sempre `<squad>-chief` — coerente com hierarquia de 5 camadas
- [ ] Redator preservou o tom sério/técnico do template original — sem markdown decorativo

## 5. Gate humano — perguntas para o Ronan (antes de aplicar)

Ver `sumario-executivo.md` §Perguntas para o gate.

---
*Sub-onda 1.3 — Diff cirúrgico proposto para Caos/modelos/ferramentas.md. 2026-07-06.*
