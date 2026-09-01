# PROMPT COWORK — Continuação: Trilha B (Ajuda com pedido) + Ramo OUTRO + Fixes

> **Como usar:** copia tudo abaixo da linha `---` e cola no Cowork ativo com a UI da Kommo aberta em `rosie.kommo.com`, com o bot "Rosie - Bot Principal" já em edição.

---

# CONTEXTO — CONTINUAÇÃO

Você já construiu **a Trilha A (Vendas) completa** do Salesbot Rosie na UI Kommo (blocos 0-45). **Excelente trabalho.** Agora precisa completar o bot com:

1. **Fixes em 5 blocos existentes** (roteamentos quebrados + botões sem destino)
2. **Trilha B (Pós-Venda / Ajuda com pedido)** — ~20 blocos novos
3. **Ramo OUTRO** — ~2 blocos novos

Ao final, testar tudo end-to-end (menu principal → cada trilha até encerrar).

---

# 1. PADRÕES QUE VOCÊ JÁ DESCOBRIU (mantém iguais)

**Confirma que essas descobertas suas ficam no novo trabalho:**

## 1.1 Handler `waits` (não `wait_answer`)
Pra pausar bot aguardando resposta do cliente:
```json
{
  "handler": "waits",
  "params": {
    "logic": "or",
    "conditions": [
      { "event": {"action": "received", "source": "message"},
        "action": {"type": "question", "step": <PROXIMO_BLOCO>} }
    ]
  }
}
```

## 1.2 `action name=set_custom_fields` com valor
**Texto livre** (captura próxima mensagem do cliente):
```json
{ "handler": "action", "params": { "name": "set_custom_fields",
  "params": { "type": "lead", "value": "{{message_text}}", "value_type": "value",
              "custom_field": "{{lead.cf.<field_id>}}" } } }
```

**Enum de select** (usa o ID do enum value):
```json
{ "handler": "action", "params": { "name": "set_custom_fields",
  "params": { "type": "lead", "value": "{{lead.cf.<field_id>.<enum_id>}}",
              "value_type": "value", "custom_field": "{{lead.cf.<field_id>}}" } } }
```

## 1.3 `action name=set_tag`
```json
{ "handler": "action", "params": { "name": "set_tag",
  "params": { "type": 1, "value": ["<nome_tag>"],
              "element_type": 1, "contact_type": "main" } } }
```

## 1.4 `action name=change_status`
```json
{ "handler": "action", "params": { "name": "change_status",
  "params": { "value": <status_id>, "pipeline_id": <pipeline_id> } } }
```

## 1.5 `action name=change_responsible_user` (encerramento com atribuição)
Você usou user 15509887 nos blocos 44/45. Continua usando o mesmo padrão pra encerrar Trilha B:
```json
{ "handler": "action", "params": { "name": "change_responsible_user",
  "params": { "type": 1, "value": 15509887,
              "element_type": 1, "contact_type": "current" } } }
```
Depois: `{ "handler": "goto", "params": { "type": "finish", "step": <N> } }`

## 1.6 `action name=add_note`
```json
{ "handler": "action", "params": { "name": "add_note",
  "params": { "text": "...", "note_type": 4,
              "element_type": 1, "type": 1, "contact_type": "main" } } }
```

## 1.7 Detecção de canal via `{{messenger}}` (você já implementou no bloco 4)
Não precisa repetir na Trilha B — se o lead chegar direto na B via botão "2 - Ajuda com pedido" a tag de canal fica sem, e tudo bem (a consultora resolve manual).

---

# 2. IDs DA CONTA (referência rápida)

## Pipelines
- **Vendas:** 14033351
- **Pós-Venda:** 14171615
- **Carrinho Abandonado:** 14171967

## Stages Pós-Venda
- **Novo Chamado:** 109409503
- **Com a Gente:** 109409507
- **Aguardando Cliente:** 109409511

## Stages Vendas
- **Novo lead:** 108316683
- **Qualificado:** 108316687
- **Carrinho enviado:** 108316691

## Custom Fields relevantes pra Trilha B + OUTRO
| ID | Nome | Tipo |
|---|---|---|
| 2053238 | Nº Pedido Nuvemshop | text |
| 2053240 | CPF | text |
| 2053242 | E-mail da compra | text |
| 2053244 | Data aprox. compra | date |
| 2053256 | Motivo do contato | select |
| 2053258 | Titular da compra | select |

**Enum values do field 2053256 (Motivo do contato)** — você vai precisar. Se não souber os IDs, cria os enums na UI (Settings → Fields → Motivo do contato) com esses labels:
- `Rastreio`
- `Atraso`
- `Item errado ou faltando`
- `Defeito`
- `Troca`
- `Devolução`
- `Cancelamento`
- `Outro`

Depois pega o ID de cada enum e usa no `set_custom_fields`. Se preferir salvar como texto livre (sem enum), pode usar `"value": "Rastreio"` diretamente sem `{{lead.cf.2053256.<enum_id>}}`.

**Enum values do field 2053258 (Titular da compra)**:
- `Própria`
- `Outra pessoa`

## Tags novas a criar (se não existirem)
`pos-venda`, `troca`, `defeito`, `devolucao`, `cancelamento`

## Usuário responsável (mesmo dos blocos 44/45)
- **User ID:** 15509887

---

# 3. FIXES nos BLOCOS EXISTENTES (aplicar ANTES de começar Trilha B)

## FIX-1 — Bloco 1 (Menu inicial): roteamento dos botões

O botão "1 - Quero comprar" está ok (→ step 2). Os outros 2 estão apontando pra step 45 (encerramento), quando deveriam ir pras trilhas específicas.

**Muda pra:**
- "2 - Ajuda com pedido" → **step 46** (será o primeiro bloco da Trilha B, você vai criar)
- "3 - Outro assunto" → **step 66** (primeiro bloco do Ramo OUTRO, você vai criar)
- else → mantém step 45 (encerra com humano)

## FIX-2 — Bloco 19 (A1 provador): botão "Ainda tô na dúvida" sem destino

Adiciona no `answer[0].params` do bloco 19 o segundo botão com destino:
```json
{
  "value": "Ainda tô na dúvida",
  "params": [{ "handler": "goto", "params": {"type": "question", "step": 44} }],
  "synonyms": ["ainda", "duvida", "dúvida"]
}
```
Destino: step 44 (encerra com humano — igual "Tamanho" faz).

## FIX-3 — Bloco 20 (A1.OK): botão "Ainda não" sem destino

Adiciona no `answer[0].params` do bloco 20 o segundo botão com destino:
```json
{
  "value": "Ainda não",
  "params": [{ "handler": "goto", "params": {"type": "question", "step": 44} }],
  "synonyms": ["nao", "não", "ainda nao"]
}
```
Destino: step 44.

## FIX-4 — Bloco 23 (nota carrinho): sem goto no final

Adiciona ao final do `question[]` do bloco 23:
```json
{ "handler": "goto", "params": { "type": "finish", "step": 46 } }
```
Isso encerra o bot após criar a nota (bloco 46 será usado como marker de finish).

## FIX-5 — Bloco 30 (grava cor): sem goto no final

Adiciona ao final do `question[]` do bloco 30:
```json
{ "handler": "goto", "params": { "type": "question", "step": 44 } }
```
Direciona pro encerramento com humano.

---

# 4. TRILHA B — AJUDA COM PEDIDO (blocos 46-65)

Referência de textos e lógica no Google Doc:
https://docs.google.com/document/d/1_lm8SHlEGpOyRb7Jhyxin4rWRGQNJNQmFpIE2Ye9BX8/edit
→ seções "TRILHA B — PÓS-VENDA · identificação" em diante.

**Estrutura geral:**
1. Aplica tag `pos-venda`
2. Move card para Pós-Venda > Novo Chamado (109409503)
3. Pergunta nº do pedido com 2 botões (Aqui está / Não achei)
4. Se "Aqui está" → captura nº → menu B
5. Se "Não achei" → pergunta email → captura → pergunta CPF → captura → pergunta data → captura → menu B
6. Menu B com 7 opções (Rastreio, Atraso, Item errado, Defeito, Troca, Devolução, Cancelamento)
7. Cada opção grava motivo + tag específica (quando aplicável) + mensagem + encerra com humano

## Bloco 46 — B.ID1_tag
Aplica tag `pos-venda`, segue pra bloco 47.
```
question:
  - set_tag "pos-venda"
  - goto step 47
```

## Bloco 47 — B.ID1_status
Muda status pra Pós-Venda > Novo Chamado, segue pra bloco 48.
```
question:
  - change_status pipeline_id=14171615 value=109409503
  - goto step 48
```

## Bloco 48 — B.ID1_pergunta
Mensagem: "Poxa, vamos resolver isso 💛\nMe manda o número do seu pedido? Ele está no e-mail de confirmação, no formato #1234."
Botões:
- "Aqui está" (synonyms: `aqui esta`, `aqui`, `esta`) → step 49
- "Não achei o número" (synonyms: `nao achei`, `nao tenho`, `sem numero`, `sem número`) → step 52

**Não esqueça:** ao adicionar botões, também adiciona `else` apontando pra step 49 (assume que respondeu com o número direto).

## Bloco 49 — waits (aguarda cliente digitar nº pedido)
```
question:
  - waits (event=received/message, action=goto step 50)
```

## Bloco 50 — B.ID1b_pedido (grava nº pedido)
```
question:
  - set_custom_fields custom_field={{lead.cf.2053238}} value={{message_text}}
  - goto step 51
```

## Bloco 51 — B.MENU_prepara (mensagem antes do menu)
Mensagem: "Anotei aqui ✓\nMe conta o que aconteceu:"
Sem botões. Só a mensagem + goto step 59 (que é o menu real).
```
question:
  - send_message "Anotei aqui ✓\nMe conta o que aconteceu:"
  - goto step 59
```
*(Você já sabe da R1: menu com botões precisa de mensagem-de-preparo antes)*

## Bloco 52 — B.ID2_pergunta_email
Mensagem: "Sem problema! Me manda o e-mail que você usou na compra:"
```
question:
  - send_message
  - goto step 53
```

## Bloco 53 — waits
```
question:
  - waits (goto step 54)
```

## Bloco 54 — grava email da compra
```
question:
  - set_custom_fields custom_field={{lead.cf.2053242}} value={{message_text}}
  - goto step 55
```

## Bloco 55 — pergunta CPF
Mensagem: "E o CPF que você usou (se tiver na mão):"
```
question:
  - send_message
  - goto step 56
```

## Bloco 56 — waits
```
question:
  - waits (goto step 57)
```

## Bloco 57 — grava CPF
```
question:
  - set_custom_fields custom_field={{lead.cf.2053240}} value={{message_text}}
  - goto step 58
```

## Bloco 58 — pergunta data + waits + grava
Mensagem: "Por último, mais ou menos que data você comprou?"
Depois waits, depois set_custom_fields data (field 2053244), depois goto 51 (que preparou "Anotei aqui" antes do menu).

*Sugestão de estrutura (você distribui em blocos separados como fez em outros lugares):*
- Bloco 58: send_message pergunta data → goto step 60 novo (waits)
- Bloco 60: waits → goto 61
- Bloco 61: set_custom_fields custom_field={{lead.cf.2053244}} value={{message_text}} → goto 51 (preparação do menu)

Se preferir numeração diferente, ajusta — o importante é que TODOS os caminhos (Aqui está OU Não achei) terminem indo pro bloco 51 (preparo do menu) → 59 (menu real).

## Bloco 59 — B.MENU (menu com 7 botões)
Mensagem: "Escolhe uma opção abaixo:"
Botões (**cada label ≤20 chars**):
- "1 - Rastreio" (synonyms: `1`, `rastreio`, `rastrear`) → step novo (grava motivo=Rastreio + tag opcional + msg + encerra)
- "2 - Atraso" (synonyms: `2`, `atraso`, `atrasado`) → step novo
- "3 - Item errado" (synonyms: `3`, `errado`, `item errado`) → step novo (grava motivo + tag `troca`)
- "4 - Defeito" (synonyms: `4`, `defeito`, `defeituoso`) → step novo (grava motivo + tag `defeito`)
- "5 - Troca" (synonyms: `5`, `troca`, `trocar`) → step novo (grava motivo + tag `troca`)
- "6 - Devolução" (synonyms: `6`, `devolucao`, `devolver`, `devolução`) → step novo (grava motivo + tag `devolucao`)
- "7 - Cancelamento" (synonyms: `7`, `cancelamento`, `cancelar`) → step novo (grava motivo + tag `cancelamento`)

*(Ajusta números dos steps conforme você for criando)*

## Blocos 60-65 — Ramos B1-B7 (cada opção do menu)

Padrão pra cada ramo (usa mesma sequência que você usou na Trilha A):

**B1 (Rastreio):**
- Bloco N: set_custom_fields custom_field={{lead.cf.2053256}} value="Rastreio" → goto N+1
- Bloco N+1: send_message "Vou puxar essa informação pra você. Um minutinho 💛" → goto step 44 (encerra)

**B2 (Atraso):** idêntico ao B1, só muda valor pra "Atraso" e mensagem pra "Vou verificar seu pedido. Um minutinho 💛"

**B3 (Item errado):**
- set_custom_fields motivo="Item errado ou faltando"
- set_tag "troca"
- send_message: "Que chato, {{lead.name}}. Vamos resolver 👉\nPra agilizar, me manda:\n• uma foto do que chegou\n• uma foto da etiqueta ou da nota que veio na embalagem"
- goto step 44

**B4 (Defeito):**
- set_custom_fields motivo="Defeito"
- set_tag "defeito"
- send_message: "Poxa, sinto muito 💛 Vamos resolver isso.\nMe manda uma foto ou um vídeo mostrando o defeito e me conta rapidinho o que aconteceu."
- goto step 44

**B5 (Troca):**
- set_custom_fields motivo="Troca"
- set_tag "troca"
- send_message: "Claro 💛 Me diz:\n• Qual peça você quer trocar?\n• Por qual tamanho ou modelo?\n• A peça está sem uso e com a etiqueta?"
- send_message: "Só mais uma coisa: a compra foi feita no seu nome ou no de outra pessoa?"
- waits
- set_custom_fields custom_field={{lead.cf.2053258}} value={{message_text}}
- goto step 44

**B6 (Devolução):**
- set_custom_fields motivo="Devolução"
- set_tag "devolucao"
- send_message: "Sem problema, {{lead.name}}. Você tem 7 dias corridos depois de receber pra desistir da compra - é seu direito.\nMe conta:\n• Qual o motivo?\n• Em que dia você recebeu o pedido?"
- send_message: "Só mais uma coisa: a compra foi feita no seu nome ou no de outra pessoa?"
- waits
- set_custom_fields custom_field={{lead.cf.2053258}} value={{message_text}}
- goto step 44

**B7 (Cancelamento):**
- set_custom_fields motivo="Cancelamento"
- set_tag "cancelamento"
- send_message: "Anotei aqui — vou verificar o status do seu pedido e te retorno se ainda dá tempo de cancelar."
- goto step 44

---

# 5. RAMO OUTRO (blocos 66-67)

## Bloco 66 — OUTRO_msg
Mensagem: "Claro! Me conta rapidinho o que você precisa 💛"
```
question:
  - send_message
  - goto step 67
```

## Bloco 67 — OUTRO_waits + captura
```
question:
  - waits (goto step 68)
```

## Bloco 68 — OUTRO_captura
```
question:
  - set_custom_fields custom_field={{lead.cf.2053256}} value={{message_text}}
  - change_status pipeline_id=14033351 value=108316683 (Vendas > Novo lead)
  - goto step 44 (encerra com humano)
```

---

# 6. CHECKLIST DE TESTE (após completar TUDO)

Testa da sua conta WhatsApp pro número da Rosie, cada caminho separado:

## Teste A — Trilha A completa (já feito, revalida)
- [ ] Clica "1 - Quero comprar" → chegam mensagens uma por uma sem duplicar
- [ ] Digita email → aparece no card no field 2053246
- [ ] Clica origem (Instagram) → aparece no card 2053248
- [ ] Menu 4 opções aparece
- [ ] Cada opção (Tamanho / Disponibilidade / Pagamento / Look) roteia certo
- [ ] Card muda pra stage "Qualificado" na pipeline Vendas
- [ ] Tags "venda" + "canal-whatsapp" aplicadas

## Teste B — Trilha B completa (novo)
- [ ] Clica "2 - Ajuda com pedido" → bot pergunta nº pedido
- [ ] Caminho A: clica "Aqui está" + digita "1234" → salva em 2053238 → aparece menu 7 opções
- [ ] Caminho B: clica "Não achei" → pede email + CPF + data (3 asks separados) → salva nos fields → aparece menu 7 opções
- [ ] Cada opção do menu (Rastreio até Cancelamento) → grava motivo + tag correta + mensagem certa + encerra
- [ ] B5 e B6 fazem pergunta extra "titular?" e capturam em 2053258
- [ ] Card move pra Pós-Venda > Novo Chamado

## Teste C — Ramo OUTRO
- [ ] Clica "3 - Outro assunto" → bot pergunta "me conta"
- [ ] Digita texto qualquer → salva em 2053256
- [ ] Card move pra Vendas > Novo lead

## Teste D — Encerramento
- [ ] Todos os caminhos chegam em `change_responsible_user` + `finish`
- [ ] Card tem responsável = usuário 15509887 (ou o nome dele)
- [ ] Bot para (não fica em loop)

---

# 7. REPORTE PRO RONAN

Após terminar + testar tudo, manda:
```
✅ Trilha B + Ramo OUTRO + Fixes — completos

- Blocos adicionados: ~22 (46-67)
- Fixes aplicados: 5 (blocos 1, 19, 20, 23, 30)
- Testes passados: N/N
- Bugs encontrados: [lista]
- Screenshots: [1 do editor mostrando o grafo completo, 1 do card do lead com todos os dados de um teste]

Bot completo. Pronto pra Ronan validar.
```

---

# 8. ATENÇÃO ESPECIAL

- **Cada label de botão ≤20 chars** (senão WhatsApp trunca)
- **Todo bloco intermediário precisa de goto no final** (senão bot para)
- **Mensagens com botões precisam ter texto antes** ou pode duplicar
- **Se `set_custom_fields` de enum não funcionar** (não achou o enum ID), usa texto livre `"value": "Rastreio"` sem `{{lead.cf...}}`
- **NÃO deleta a Trilha A que já está pronta** — só adiciona novos blocos + faz os 5 fixes específicos
- **Testa CADA fix** antes de passar pra próxima trilha

---

**Bom trabalho! Qualquer bloqueio, para e pergunta.**

*Prompt gerado em 2026-08-06 por Claude (Anthropic) pra Ronan Silva (Kolden). Continua o build iniciado em 2026-08-03.*
