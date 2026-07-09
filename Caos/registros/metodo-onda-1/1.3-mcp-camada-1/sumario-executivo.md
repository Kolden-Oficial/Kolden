# Sumário Executivo — Sub-onda 1.3 (MCP Camada 1)

> **Contrato:** m-20260706-metodo-kolden · Sub-onda 1.3
> **Data:** 2026-07-06
> **Executor:** caos-chief (raiz Kolden) — fan-out ≤3 Explores paralelos
> **Status:** DIFF PROPOSTO — aguardando gate humano

## 1. Uma frase

Kolden tem **22 wrappers proprietários** distribuídos em 4 squads (Argos, Hermes, Pheme, Emporos) — dos quais **4 são substituíveis por MCP oficial já cadastrado em <7 dias** (Grupo A) e **5 constituem exceção arquitetural** (event streams Discord/Slack/Telegram/WhatsApp/Google Chat) que MCP spec 2024 não modela.

## 2. Números-chave

- **26 squads varridos** · 22 sem wrappers · **4 com wrappers**
- **22 wrappers únicos** (deduplicados; Fan-out #1 e #2 sobrepõem em Hermes)
- **85% dos squads Kolden** já operam sem wrapper proprietário (padrão v2.5 respeitado)
- **Concentração:** Hermes runtime (15 de 22) — o esperado, dado que é o runtime multi-plataforma
- **4 substituições diretas** (MCP oficial já existe): ApifyClient, GHL×2, ElevenLabs SDK
- **6 MCPs-próprios simples** a construir em janela 30d: Speechmatics, Deepgram, SociaVault, Mistral, Groq, MiniMax
- **2 MCPs-próprios complexos** em janela 90d: xAI consolidated, decisão pendente OpenAI/Google TTS
- **5 wrappers em exceção proposta:** Discord, Slack, Telegram, WhatsApp Cloud, Google Chat
- **2 deprecações:** OpenAI fallback LLM (contradiz soberania), OpenAI trajectory compression (usar Claude)
- **2 investigar:** Apollo + Common Room em Emporos (menção sem código)

## 3. Achado arquitetural crítico

MCP spec 2024 (Anthropic 25/nov/2024, JSON-RPC 2.0 request-response) **não modela** runtimes de mensageria bidirecional em tempo real. Os 5 adapters de plataforma do Hermes (Discord/Slack/Telegram/WhatsApp/Google Chat) usam event streams (Gateway WebSocket, Socket Mode, long-polling, webhooks Meta, Pub/Sub) que fogem do modelo request-response.

**Duas rotas legítimas para o gate humano:**

- **Rota D-1 (Ratificação):** aceitar categoria constitucional nova "adapter de runtime bidirecional em tempo real"; H1-H5 permanecem SEM dupla-vida. Emenda ao Art. IV via ida-e-volta com Liceu-chief na Onda 6 do Método. Procedência: LSP-inspiração do MCP (Microsoft 2016) + literatura de sistemas distribuídos (eventos vs request-response).
- **Rota D-2 (Postergação):** manter H1-H5 em dupla-vida indefinida enquanto MCP spec 2025-2026 (`streamable-http-transport`, na roadmap Anthropic) não maturar. Reavaliar janeiro/2027.

## 4. Artefatos entregues nesta sub-onda

| Artefato | Path | Propósito |
|---|---|---|
| Inventário completo | `inventario.md` | Os 22 wrappers, tabela por squad, achados prévios validados (Iris ✅, Solomon ✅), constatação arquitetural |
| Mapa de dependências | `mapa-de-dependencias.md` | Grep reverso por wrapper — quem consome cada um, impacto de remoção, cadeias de handoff afetadas |
| Plano migração escalonada | `plano-migracao-escalonada.md` | 6 grupos (A-F), ordem topológica em 14 semanas, métricas Dike, matriz de riscos |
| Diff cirúrgico ferramentas.md | `diff-cirurgico-ferramentas.md` | Proposta de 3 blocos de mudança em `Caos/modelos/ferramentas.md` (+42 linhas úteis, 0 remoções) — casos canônicos reais no lugar do template genérico |
| Sumário executivo | `sumario-executivo.md` | Este arquivo |

## 5. Perguntas para o gate humano — Ronan

Preciso de decisão antes de aplicar o diff:

### Q1 — Exceção constitucional para runtime bidirecional (arquitetural)

Aceita a **Rota D-1** (categoria constitucional nova + emenda Art. IV na Onda 6) ou prefere a **Rota D-2** (dupla-vida indefinida até MCP spec maturar)?

**Recomendação técnica:** D-1. Wrappers Hermes de plataforma são thin-adapters legítimos; a categoria "adapter de runtime bidirecional" é honesta e distinguível do wrapper genérico que o Art. IV quer bloquear. Postergar (D-2) cria dívida sem resolver.

### Q2 — OpenAI fallback LLM (H15) — soberania vs disponibilidade

Deprecar completo (remover OpenAI como fallback → Hermes falha graceful se Anthropic cair) ou manter com nota explícita "contradiz soberania mas necessário para SLA"?

**Recomendação técnica:** deprecar. Kolden é soberania-first; SLA se resolve com retry policy + circuit breaker + alerta ao Ronan, não com vazamento de dado.

### Q3 — Ordem de execução — Emporos primeiro ou Argos primeiro?

O plano sugere semana 2 = Emporos GHL (funil comercial ao vivo) → semana 3 = Pheme GHL + Argos Apify. Isso maximiza redução de risco operacional. Mantém ou inverte (Argos primeiro por ser meta-squad de dados)?

**Recomendação técnica:** manter. Emporos GHL é caminho crítico do funil de vendas hoje — quanto antes migrar para MCP nativo, menor a superfície de risco.

### Q4 — Sondagem Grupo F (Apollo, Common Room em Emporos)

Autorizar sondagem manual esta semana (Grep exaustivo em `Emporos/tools/` + `Emporos/scripts/`)? Se código não existir, autorizo remover a menção do catálogo Emporos (dead-reference)?

**Recomendação técnica:** sim para ambos.

### Q5 — Aplicação do diff em Caos/modelos/ferramentas.md

Aprovar a aplicação do diff proposto em `diff-cirurgico-ferramentas.md` (+42 linhas úteis, 0 remoções, preserva Infisical/MCPs-próprios/stack)?

**Recomendação técnica:** aplicar. É a materialização direta dos achados — sem os casos canônicos reais, o template continua abstrato e ninguém sabe preencher.

### Q6 — Escopo Sub-onda 1.3 = fecha aqui, ou expandir?

O Contrato-mãe define Sub-onda 1.3 como **inventário + plano** (implementação real fica para Fase 3 residual `m-2026MMDD-implementacao-mcp-e-dashboard`). Fecha aqui após aprovação do diff, ou quer que eu também construa 1 MCP-próprio como prova (candidato: `speechmatics` — 2 tools, ~2 dias)?

**Recomendação técnica:** fecha aqui. Sub-onda 1.4 (safety dashboard) e 1.5 (smoke test) precisam ser destravadas antes de 1.6 escrever o METODO-KOLDEN.md v1.0. Construir MCP na 1.3 arrasta o cronograma sem ganho — o próximo Contrato tem esse escopo.

## 6. Divergências declaradas com o Contrato-mãe

- **Contrato-mãe § handoff_para_sub_onda_1_3** dizia "grep por skills-como-tools: **busca-de-referencias, consulta-ao-registro, vigia-de-ecossistema**, outras que o diagnóstico identificar". Investigação mostrou que **as 3 skills-âncora mencionadas NÃO são wrappers** — são skills de método puro/orquestração. Wrappers reais estão em outros pontos (Hermes runtime, Argos motor, Pheme/Emporos GHL). Sinalizado no `inventario.md §5`.
- **Contrato-mãe § escopo** enfatiza "Camada 1" (só Kolden-nativos). Iris já é MCP-nativo e Solomon-oficial já é MCP oficial cadastrado; ambos ficam fora do inventário de wrappers e SÃO o padrão do estado desejado. ✅

## 7. Verificação auto (regras G1-G2 do CAOS-CL-002)

- [x] G1 — Nenhum arquivo tocado fora de `Caos/registros/metodo-onda-1/1.3-mcp-camada-1/` (working tree fora respeitado)
- [x] G2 — Sem commit; artefatos aguardam gate humano
- [x] 5 artefatos padronizados produzidos (inventário + mapa + plano + diff + sumário) coerentes com padrão Sub-ondas 1.1 e 1.2
- [x] Fan-out ≤3 respeitado (3 Explores paralelos, todos concluídos)
- [x] Ritual de encerramento pendente — será executado quando o gate humano fechar

## 8. Handoff para Sub-onda 1.4

Se este gate aprovar o diff (ou parte dele), próximo passo do Contrato-mãe é:

- **Sub-onda 1.4 — Safety dashboard schema + Predictions Scorecard template + primeiras predições Kolden 2026-2027**
- Registrar em: `Caos/registros/metodo-onda-1/1.4-safety/`
- Escopo: dashboard populado com dados desta 1.3 (contagem wrappers, timeline de migração, exceção Art. IV) + primeiras predições datáveis (Brooks 2018-2026 style) sobre Kolden 2026-2027

---
*Sub-onda 1.3 — Sumário executivo. Pronto para gate humano. 2026-07-06.*
