---
tipo: spec-executavel
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/Kommo/ferramentas]]"
---

# Onda 3.1 — Spec das 12 automações (AUT-01 a AUT-12)

Configuração das automações que aparecem na aba 5 da planilha `Rosie_Kommo_Build_Spec.xlsx`.
Divididas por **onde** vivem:

- **Salesbot** (dentro do bot da Onda 2) — automações reativas à interação do cliente
- **Digital Pipeline** (UI Kommo → Automation → Digital Pipeline) — reações a eventos de stage
- **Hermes middleware** (nosso Node/Fastify no Railway) — follow-ups temporais + integração Nuvemshop cart_abandoned

| AUT | Onde | Complexidade |
|---|---|---|
| AUT-01 | Salesbot | trivial (já na Onda 2) |
| AUT-02 | Digital Pipeline | média |
| AUT-03 | Digital Pipeline | média |
| AUT-04 | Salesbot | trivial (já na Onda 2) |
| AUT-05 | Digital Pipeline (cross-pipeline) | alta |
| AUT-06 | Digital Pipeline | média |
| AUT-07 | Hermes middleware (scheduler) | alta |
| AUT-08 | Hermes middleware (scheduler + PATCH lead) | alta |
| AUT-09 | Hermes middleware (webhook Nuvemshop) + scheduler | alta |
| AUT-10 | Hermes middleware (scheduler) | alta |
| AUT-11 | Salesbot | já configurada (widget_request /kommo/horario) |
| AUT-12 | Salesbot | trivial (já na Onda 2) |

---

## AUT-01 · Entrada roteia para P1 · Novo lead

**Local:** Salesbot, nó ENTRADA (já contemplado na Onda 2).
**Gatilho:** cliente clica botão 1 no nó ENTRADA.
**Ação:** Move card → **Pipeline Vendas > Novo lead** (108316683).
**Status:** ✅ especificado na Onda 2.

## AUT-02 · Bot esperando resposta → Aguardando Cliente

**Local:** Digital Pipeline no Pipeline Pós-Venda.
**UI (Kommo → Automation → Digital Pipeline → Pipeline Pós-Venda):**
- Add trigger: **When a lead has been in stage for N hours**
- Stage: `Com a Gente` (109409507)
- Duration: 1 hora (configurável)
- Condition (fine-grained): última mensagem do bot pediu algo E não há resposta do cliente
- Action: **Move to stage** → `Aguardando Cliente` (109409511)

**Alternativa via Salesbot:** melhor deixar aqui no Digital Pipeline mesmo — o bot terminou a interação e passou o controle. Se ele voltar a mover o card entre stages, cria loops.

## AUT-03 · Cliente responde → volta para Com a Gente

**Local:** Digital Pipeline no Pipeline Pós-Venda.
**UI:**
- Add trigger: **When a message is received** (webhook add_message)
- Condition: card está em stage `Aguardando Cliente` (109409511) do Pipeline Pós-Venda
- Action: **Move to stage** → `Com a Gente` (109409507)

## AUT-04 · Bot escalou → Com a Gente

**Local:** Salesbot (já contemplado na Onda 2, dentro dos handoffs H.5 e H.6).
**Gatilho:** nó HANDOFF_B_GENERICO ou HANDOFF_B_RASTREIO executado.
**Ação:** Move card → `Com a Gente` (109409507).
**Status:** ✅ especificado na Onda 2.

## AUT-05 · Cliente responde MC → migra P3→P1

**Local:** Digital Pipeline (cross-pipeline).
**UI:**
- Add trigger: **When a message is received**
- Condition: card está em stage `Abordado` (109412475) do Pipeline Carrinho Abandonado (14171967)
- Action A: **Move to stage** → `Reengajou` (109412479) — dentro do P3
- Action B: (opcional, se Kommo permite duplo action) **Move to pipeline** → Pipeline Vendas > Novo lead (108316683)

**Alternativa fallback:** se Kommo não deixar mover entre pipelines direto,
o Hermes middleware faz:
1. Detecta webhook `add_message` em card do P3 Abordado
2. `PATCH /api/v4/leads/{id}` com `pipeline_id=14033351, status_id=108316683` (P1 Novo lead)
3. Aplica tag `carrinho-abandonado` no card para rastreio

**Implementado no Hermes middleware:** ver Onda 3.3 abaixo.

## AUT-06 · Sem resposta após MC.2 → Perdido

**Local:** Digital Pipeline no Pipeline Carrinho Abandonado.
**UI:**
- Add trigger: **When a lead has been in stage for N hours**
- Stage: `Abordado` (109412475)
- Duration: 48 horas (24h MC.2 + 24h de graça)
- Action: **Move to stage** → `Closed - lost` (143)

## AUT-07 · Carrinho enviado → agendar follow-ups 2h/24h/72h

**Local:** Hermes middleware — **scheduler**.
**Fluxo:**
1. Kommo webhook `status_lead` dispara quando card entra em `Carrinho enviado` (108316691)
2. Hermes middleware recebe e agenda 3 follow-ups:
   - `+2h` → enviar template MA5.2 (`rosie_carrinho_followup_2h`)
   - `+24h` → enviar MA5.3 (`rosie_carrinho_followup_24h`)
   - `+72h` → enviar MA5.4 (`rosie_carrinho_followup_72h`)
3. Cada follow-up cancelado se cliente responder (webhook `add_message` limpa a fila)

**Implementado no Hermes middleware:** ver Onda 3.2 e 3.3 abaixo.

## AUT-08 · Sem resposta 72h após MA5.4 → Perdido + tag campanha

**Local:** Hermes middleware ou Digital Pipeline.
**Preferência:** Hermes (encadeamento natural do AUT-07).

**Fluxo:**
1. Após enviar MA5.4 (+72h), agenda um "check final" +72h depois
2. Se ainda sem resposta, PATCH lead → status `Pedido cancelado – perdido` (143) + tag `campanha-reengajamento` (nova tag, criar na Onda 1 v2 ou agora)

**Alternativa via Digital Pipeline:**
- Trigger: lead em stage `Carrinho enviado` há **144 horas** (6 dias)
- Action: move para `Pedido cancelado – perdido` (143) + add tag

## AUT-09 · Nuvemshop cart_abandoned → cria P3 + agenda MC.1/MC.2

**Local:** Hermes middleware — **webhook receiver Nuvemshop**.

**Confirmação técnica (Q4 do plan file):** Nuvemshop só dispara webhook `cart_abandoned`
depois que o cliente insere e-mail no checkout. Cobertura ~60-70%.

**Fluxo:**
1. Nuvemshop → POST para `https://<hermes-mw>/nuvemshop/cart-abandoned`
2. Hermes valida assinatura HMAC da Nuvemshop
3. Cria lead na Kommo: POST `/api/v4/leads` com pipeline `Carrinho Abandonado` (14171967), stage `Carrinho abandonado` (109412471), custom fields (nome, peça, valor)
4. Agenda:
   - `+1h` → enviar MC.1
   - `+24h` → enviar MC.2

**Implementação:** ver Onda 3.3.

**Nota:** o webhook Nuvemshop existente (`nuvemshop.kommo.com/v1/crm/webhook/unsorted`)
é da integração nativa, que já cria leads em unsorted. Precisamos **desabilitar essa
rota** e usar a nossa (senão vai duplicar). Alternativa: interceptar o `add_unsorted` do
Kommo e agendar direto (menos código).

**Recomendação inicial:** manter o webhook nativo Nuvemshop → Kommo (cria lead) +
Digital Pipeline no Kommo agenda os follow-ups. Só ir para Hermes se precisarmos
lógica mais fina.

## AUT-10 · Aguardando cliente sem resposta → MR.1 e MR.2

**Local:** Hermes middleware — scheduler.

**Fluxo:**
1. Kommo webhook `status_lead` quando card entra em `Aguardando Cliente` (109409511)
2. Hermes agenda:
   - `+24h` → enviar MR.1
   - `+72h` → enviar MR.2 + PATCH lead para `Resolvido` (142) OU manter em Aguardando com tag `pausado-por-timeout`

**Alternativa Digital Pipeline (mais simples):**
- Trigger 1: lead em `Aguardando Cliente` há 24h → dispara mensagem MR.1 via canal
- Trigger 2: lead em `Aguardando Cliente` há 72h → dispara MR.2 + move para `Resolvido`

## AUT-11 · Escalonamento → checa horário

**Local:** Salesbot (nós HANDOFF_*).
**Status:** ✅ especificado na Onda 2 (widget_request `/kommo/horario`).

## AUT-12 · Peça esgotada + e-mail confirmado → lista-reposicao

**Local:** Salesbot, nó A2.
**Ação:** Add tag `lista-reposicao` (149814) + save custom fields Peça (2053250) e Tamanho (2053252).
**Status:** ✅ especificado na Onda 2.

---

## Ordem de configuração

**Sessão 1 (0.5h) — Digital Pipeline básicas:**
- AUT-02, AUT-03 (Pipeline Pós-venda)
- AUT-05 (fallback via Digital Pipeline se não usar Hermes)
- AUT-06 (Pipeline Carrinho Abandonado)

**Sessão 2 (0.5h) — Digital Pipeline complementares:**
- AUT-08 (fallback: 144h em `Carrinho enviado`)
- AUT-10 (alternativa simples se não usar Hermes)

**Sessão 3 (código, ~10h) — Hermes middleware:**
- AUT-07 (scheduler follow-ups)
- AUT-08 (encadeamento)
- AUT-09 (webhook Nuvemshop se decidir usar)
- AUT-10 (versão fina)

## Requisitos antes da Onda 3

- ✅ Onda 1 completa (custom fields + tags + pipelines) — feito 2026-07-23
- ✅ Hermes middleware deployado no Railway com `/kommo/horario` — pendente Ronan
- ✅ Salesbot da Onda 2 construído no ambiente `[TESTE]` — próximo passo
- ✅ Templates WhatsApp aprovados pela Meta (~24-48h de moderação após submissão)
