---
tipo: dossie-tecnico
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/Kommo/ferramentas]]"
data: 2026-07-31
fontes: [developers.kommo.com, support.kommo.com, github.com/Miguelgbastos/Kommo-MCP]
---

# Kommo Salesbot — documentação oficial consolidada (2026-07-31)

Resultado de 3 sub-agents rodando Firecrawl nível máximo. Fontes verbatim citadas ao final. Substitui e amplia o mapeamento inicial em `api.md` e `docs-oficiais.md` **apenas para o subsistema Salesbot** — não toca em Chats API, CRM, etc.

## Sumário executivo (leia isto primeiro)

1. **Não existem "dois formatos" distintos de Salesbot** — a doc oficial documenta UM dialeto JSON. O que o `Suporte.json` da Rosie usa (`send_message`, `add_tag`, `change_status`, `save_data`, `ask`, `talk_close`, `create_note`) é o **Visual Builder da UI moderna** serializando handlers proprietários dentro de um envelope `type_functionality`. Esses nomes NÃO aparecem na doc oficial.

2. **Handler PAUSE/DELAY NÃO tem JSON documentado publicamente.** A UI tem step "Pause" com 4 modos (Message received, Timer, Duty hours, Video) mas o Kommo NÃO publica o schema serializado. Único primo público: `wait_answer` (equivale só ao modo "Message received").

3. **Duplicação de mensagens em conta com 2 canais é comportamento nativo do Kommo** com recipient `all_contacts` + `way_of_communication: over_all`. Fix pela API: usar `main_contact` OU `all_contacts + primary_channel`.

4. **Único caminho confiável pra descobrir handlers proprietários (Pause etc):** montar o step no editor visual, salvar, capturar o body do `PATCH /api/v4/salesbots/{id}` no DevTools do navegador. Não há outra fonte pública.

---

## 1. Envelope do Salesbot (formato Visual Builder)

Mesmo padrão do `Suporte.json`:

```json
{
  "type_functionality": 0,
  "model": {
    "text": "<STRING JSON serializada com os blocos>",
    "name": "Nome do bot",
    "positions": "<STRING JSON serializada com posições visuais>",
    "type": 2
  }
}
```

- `type_functionality: 0` — não documentado. Provavelmente enum de tipo de automação.
- `model.type: 2` — Salesbot (vs outros tipos).
- `model.text` e `model.positions` são **strings JSON escapadas**, não objetos aninhados. Kommo faz `JSON.parse` internamente.

### Estrutura de `model.text` decodificado

```json
{
  "0": { "question": [...], "answer": [...opcional], "block_uuid": "..." },
  "1": { "question": [...], "block_uuid": "..." },
  "conversation": false
}
```

- Chaves numéricas string ("0", "1", "2"...) = índice do bloco.
- `question[]` = handlers executados quando o bot entra no bloco.
- `answer[]` = handlers de roteamento por input do cliente (tipicamente `handler: buttons`).
- `block_uuid` = UUID único por bloco (gerado pelo Kommo).
- `conversation: false` — sempre. Propósito não documentado.

### Estrutura de `model.positions` decodificado

```json
[
  {"x":0,"y":0,"z":2,"id":0,"goto":{"block":1},"step":-1,"type":"start",...},
  {"x":-350,"y":0,"z":4,"id":-1,"code":"trigger","step":-1,"type":"static",...},
  {"x":...,"id":1,"step":0,"type":"question","actions":[...],"deletable":true,...}
]
```

- 2 nós fixos: `start` (id=0) e `trigger` (id=-1).
- Demais: 1 por bloco de conteúdo, com `step` apontando pra chave do `model.text`.
- `positions` é só coreografia visual — o Kommo executa lendo `model.text`.

---

## 2. Handlers documentados publicamente (doc dev)

Fonte: https://developers.kommo.com/docs/salesbot-dp

**Lista canônica (15 handlers):** `show`, `buttons`, `action`, `meta`, `condition`, `validations`, `preset`, `goto`, `wait_answer`, `find`, `filter`, `send_internal`, `stop`, `send_external_message`, `widget_request`.

**Actions dentro de `action` (14 nomes):** `unsorted`, `change_status`, `set_tag`, `unset_tag`, `set_custom_fields`, `subscribe`, `unsubscribe`, `add_lead_contact`, `set_budget`, `add_linked_company`, `add_note`, `link`, `change_responsible_user`, `link_to_unsorted`.

**Limite:** 64 KB por JSON de bot.

### Mapeamento verbatim → nomes do Visual Builder (Suporte.json)

| Nome no editor visual | Handler JSON documentado | Handler JSON usado no formato do editor visual (Suporte.json) |
|---|---|---|
| Message (texto+botões) | `show` type=buttons | `send_message` com `buttons: [{text, type: "inline"}]` |
| Message (só texto) | `show` type=text | `send_message` sem buttons |
| Add tag | `action name="set_tag"` | `add_tag` `{value}` |
| Remove tag | `action name="unset_tag"` | (não confirmado — provavelmente `remove_tag`) |
| Change lead status | `action name="change_status"` | `change_status` `{status_id, pipeline_id}` |
| Set field | `action name="set_custom_fields"` | `save_data` `{field_id, entity_type, value}` |
| Add note | `action name="add_note"` | `create_note` `{text}` |
| Talk close / Change conversation status | `stop` `{action: "talk-close"}` | `talk_close` `{}` |
| Start bot | `stop` `{action: "salesbot-start", bot: N}` | (não confirmado) |
| Wait for message / Ask | `wait_answer` `{type, step}` | `ask` `{field_id, type, field_type}` |
| Condition | `condition` OU `validations` | `condition` `{logic, conditions: [...]}` |
| Go to another step | `goto` `{type, step}` | `goto` `{type, step}` — mesmo nome |
| Send webhook / Custom widget | `widget_request` | `widget_request` `{url, method, headers, body, target}` |
| Send internal message | `send_internal` | (não confirmado) |
| **Pause (Timer)** | **NÃO DOCUMENTADO** | **NÃO DOCUMENTADO** |
| Pause (Message received) | `wait_answer` | `ask` (variante) |
| Pause (Duty hours) | **NÃO DOCUMENTADO** | **NÃO DOCUMENTADO** |
| Pause (Video open/close) | **NÃO DOCUMENTADO** | **NÃO DOCUMENTADO** |

**Conclusão:** o Visual Builder gera nomes proprietários simplificados. Sob o capô é o mesmo mecanismo, mas o mapeamento reverso não é público.

---

## 3. Handler `wait_answer` — o único primo publicado do Pause

Verbatim de `developers.kommo.com/docs/salesbot-dp`:

```json
{
  "handler": "wait_answer",
  "params": {
    "type": "question",
    "step": 2
  }
}
```

`type` aceita `"question"` ou `"answer"`. `step` é o índice do bloco de destino. **Não tem parâmetro `timeout`, `duration`, `seconds`.** Só espera resposta do cliente.

---

## 4. Handler `send_external_message` — recipient/channels

Verbatim de `developers.kommo.com/docs/salesbot-dp`:

```json
{
  "handler": "send_external_message",
  "params": {
    "message": { "type": "external", "text": "..." },
    "recipient": {
      "type": "main_contact",
      "way_of_communication": "over_all"
    },
    "channels": [ { "id": 23499795 } ],
    "metadata": { "facebook_tag": "CONFIRMED_EVENT_UPDATE" },
    "on_error": { "handler": "goto", "params": { "step": 1, "type": "question" } }
  }
}
```

- `recipient.type`: `"all_contacts"` | `"main_contact"` | `"filtered_contacts"`.
- `recipient.way_of_communication`: `"over_all"` | `"any_first"` | `"last_active"`.
- `channels: []` (array vazio) = todos os canais conectados ao lead.
- `channels: [{id: N}]` = canal específico.
- `on_error` = branch alternativo se envio falhar.

**Nota crítica:** `send_to_all_chat_sources: true` (que o Suporte.json usa) NÃO existe no dialeto documentado. É campo proprietário do Visual Builder.

### Comportamento de duplicação (doc de suporte, verbatim)

`support.kommo.com/docs/salesbot-overview` — Message step tem 4 recipients:

- **All contacts – selected channels** (default): envia para todos os contatos do lead usando apenas os canais marcados.
- **All contacts – primary channel**: todos os contatos, um único canal (primário de cada).
- **Main contact – selected channel**: só o contato principal, só nos canais marcados.
- **Main contact – primary channel**: só o contato principal, só no canal primário.

**Duplicação = combinação `(contatos escolhidos) × (canais escolhidos)`.** Se lead tem 2 canais conectados (WhatsApp + Instagram) e config está default (All contacts + All channels) → envia 2x.

**Fix pela API:** trocar `recipient.type` de `"all_contacts"` para `"main_contact"` + `"way_of_communication": "any_first"` OU `"last_active"`.

---

## 5. Step Pause — 4 modos (doc de suporte, verbatim)

`support.kommo.com/docs/salesbot-overview` seção Pause:

1. **Message received** — bot pausa até cliente enviar mensagem. Equivalente JSON: `wait_answer`.
2. **Timer is out** — espera período fixo. Máximo: **8760 h + 60 min + 60 s** (~1 ano). **JSON não documentado.**
3. **Except for duty hours** — pausa fora do expediente pré-configurado. **JSON não documentado.**
4. **Video is opened / closed** — pausa até cliente abrir/fechar vídeo enviado. Só Live Chat. **JSON não documentado.**

Modos podem coexistir via `+ Add next condition`. Bot segue apenas o primeiro que disparar.

**Comportamento de interrupção** (`support.kommo.com/docs/manage-salesbot-interruptions`): se durante um `Pause: message received` outro bot dispara com pausa, **Bot1 morre e Bot2 assume**.

---

## 6. Outros steps do Visual Builder

Fonte: `support.kommo.com/docs/salesbot-overview`.

- **Message** — texto/template, até 13 quick reply buttons (recomendado ≤3), URL button, sinônimos, anexos (docs/imagens/vídeo/áudio/voice `.ogg`). Auto-cria branches `Another answer` (input diferente) e `No answer` (com timer embutido).
- **List message (WhatsApp)** — até 10 opções em lista estruturada, seções, título/footer/description. Exige WhatsApp Cloud API.
- **Condition** — filtro entre steps. Casa contra Active chat code, Lead source, custom fields, texto do cliente.
- **Comment** — reply público em post Instagram (exige integração IG).
- **Pause** — 4 modos (§5).
- **Validation** — 6 operadores: equals, does not equal, contains (numbers/letters/phone/email/range), does not contain, length, regex.
- **Send internal message** — mensagem privada visível só ao usuário/time escolhido.
- **Subscribe (Meta)** — opt-in para janela 24h Meta. Só Facebook/Instagram.
- **Go to another step** — salto arbitrário. Só aparece após ≥1 step existir.
- **Start bot** — encadeia bot inteiro dentro do fluxo atual.
- **Custom step (Code / Widget)** — JSON handler custom OU plug de widget (Stripe, Mailer, etc.).
- **Round Robin** — rotação circular até 100 opções (mínimo 2). Reseta ao editar. Útil para A/B.

---

## 7. Actions completos (14 itens do Visual Builder)

`support.kommo.com/docs/salesbot-overview` seção "All available actions":

Add note · Add task · Change conversation status (closed/answered) · Change lead status (pipeline+stage) · Change responsible user · Complete task · Generate form (Webform) · Create Lead · Manage subscribers · Manage tags · Meta Conversions API (CAPI) · Send email · Send webhook · Set field (via client message OU manual input).

---

## 8. Descoberta sobre `save_data` vs `ask`

O `Set field` do Visual Builder aceita 2 tipos de valor:

- **Client message** = capturar próxima resposta do cliente e salvar no field → serializa como `ask` `{field_id, type, field_type}` (pausa esperando mensagem).
- **Manual input** = Kommo pergunta ao usuário responsável no CRM, não ao cliente.
- **Valor fixo** = `save_data` `{field_id, entity_type, value}` (não pausa).

Confirma o mapeamento que o script `kolden-to-kommo-native.mjs` faz.

---

## 9. Miguelgbastos/Kommo-MCP — não ajuda com handlers

Fork MIT (recomendado pela Kolden em `mcp-ai.md`). Só tem tools `run_salesbot` e `stop_salesbot` (chamam `/api/v4/bots/{id}/run`). **NÃO parseia nem monta o envelope de blocos.** Não serve como referência pra pause.

---

## 10. Recomendação prática para a Rosie

### Opção A — Capturar handler proprietário via DevTools (única forma confiável)

Precisa acesso à UI Kommo com Visual Builder disponível. Ronan reportou que sua conta só tem "código direto" (sem editor visual arrastar-e-soltar). Se em algum momento a UI voltar:

1. Criar bot novo com 1 step Pause (Timer 60s), 1 step Pause (Message received), 1 step Pause (Duty hours), 1 step Pause (Video opened) — um bot pra cada modo.
2. Salvar cada um.
3. Chrome DevTools → Network → filtrar por `salesbots`.
4. Capturar o body do `PATCH /api/v4/salesbots/{id}` de cada salvamento.
5. Registrar aqui neste dossiê como "handler `X` — descoberto empiricamente em `data`".

### Opção B — Fazer o delay via Digital Pipeline (Onda 3)

`rosie-onda3-automacoes-spec.md` já prevê usar Digital Pipeline pra delays temporais (AUT-02, AUT-06 usam trigger "lead em stage há N horas"). Delay dentro do bot pode ser substituído por:

1. Bot move card pra stage "Aguardando N segundos" (fictício).
2. Digital Pipeline com trigger "lead em stage há 3s" → dispara Salesbot secundário que continua o fluxo.

Overhead maior, mas funciona.

### Opção C — Delay via Hermes middleware (mais controle)

Hermes middleware (Node/Fastify no Railway) tem scheduler pras AUT-07/08/09/10. Adicionar rota `/kommo/pause?ms=N` que devolve resposta após N milissegundos. Bot faz `widget_request` bloqueante:

```json
{
  "handler": "widget_request",
  "params": {
    "url": "{{env.HERMES_MW_URL}}/kommo/pause",
    "method": "POST",
    "body": "{\"ms\": 3000}",
    "target": "pause_result"
  }
}
```

Se o Kommo espera a resposta do widget_request antes de seguir, isso pausa o bot 3s. Precisa testar se o Kommo tem timeout curto no widget_request (algumas plataformas cortam em 5-10s).

### Opção D — Não usar delay (workaround UX)

Aceitar que mensagens saem em rajada. Se o problema é o cliente se sentir bombardeado, alternativa é:

1. Concatenar múltiplas mensagens curtas em uma única mensagem maior.
2. Usar quick reply buttons pra dar tempo do cliente ler (bot pausa esperando clique).

---

## 11. URLs consultadas (verificadas 2026-07-31)

**Developers (API):**
- https://developers.kommo.com/docs/salesbot-dp (canônica de handlers, atualizada 2026-06-11)
- https://developers.kommo.com/docs/kommo-for-developers
- https://developers.kommo.com/docs/private-chatbot-integration
- https://developers.kommo.com/docs/salesbot-sdk
- https://developers.kommo.com/reference/stop-salesbot
- https://developers.kommo.com/reference/launch-a-salesbot
- https://developers.kommo.com/llms.txt (índice)

**Support (UI/features):**
- https://support.kommo.com/docs/salesbot-overview (steps, Pause 4 modos)
- https://support.kommo.com/docs/create-a-salesbot-in-kommo
- https://support.kommo.com/docs/manage-salesbot-interruptions (interações entre bots)
- https://support.kommo.com/docs/use-salesbot-templates
- https://support.kommo.com/docs/salesbot-triggers-overview

**GitHub:**
- https://github.com/Miguelgbastos/Kommo-MCP (fork MIT, sem handlers)
- https://github.com/kommo-crm (org oficial, só birthday-widget)
- https://github.com/ufee/amoapi (client PHP, sem schema)
- https://github.com/shevernitskiy/amo (client TS, sem schema)

## 12. Lacunas confirmadas

- **Handler Pause (Timer/Duty/Video) não é publicado.** Só descoberta empírica via DevTools.
- Campo `send_to_all_chat_sources` do Visual Builder — não documentado.
- Campo `is_in_starting_block` — não documentado.
- Envelope `type_functionality` / `model.type` — enum não documentado.
- Como Kommo trata `positions` inconsistente com `model.text` — não documentado.

Essas lacunas são resolvidas só empiricamente. A recomendação canônica Kolden (pra outros bots futuros): **sempre capturar o body do PATCH ao salvar um step novo** e ir populando este dossiê como fonte-de-verdade.


---

## 🎯 ACHADO EMPÍRICO — 2026-08-03 (Rosie build)

**Bug/limitação não documentada:** o **starting_block** do Salesbot **NÃO PODE** ter botões (Quick Reply) diretamente. Se tiver, o Kommo dispara a mensagem duas vezes (duplicação).

**Padrão que funciona (descoberto por Ronan Sérgio Silva testando na UI):**

1. **Starting block** = APENAS send_message de texto (saudação neutra, sem botões, sem ask, sem nada além do texto)
2. **Segundo bloco** = send_message com Quick Reply Buttons + roteamento por answer[buttons]

**Exemplo mínimo funcional:**

```
Bloco 0 (starting_block: true)
  send_message: "Oi! Aqui é a Rosie 💛 Tô aqui pra te ajudar rapidinho."
  goto: bloco 1

Bloco 1
  send_message: "Me diz o que você precisa: 1 - Comprar / 2 - Ajuda / 3 - Outro"
  buttons: [1 - Comprar, 2 - Ajuda, 3 - Outro]
  answer[buttons] roteia para blocos 2, 3, 4 conforme escolha
```

**Aplicar a TODOS os bots Kommo futuros da Kolden.** Registrado após 6+ ciclos de debug de duplicação sem sucesso — a causa era comportamento do próprio Kommo, não do JSON.
