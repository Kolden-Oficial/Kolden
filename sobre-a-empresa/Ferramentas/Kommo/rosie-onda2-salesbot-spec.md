---
tipo: spec-executavel
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/Kommo/ferramentas]]"
---

# Onda 2 — Spec do Salesbot Rosie (executável clique-a-clique na UI Kommo)

Esta é a spec canônica do Salesbot. Cada linha vira uma configuração na UI Kommo
(`rosie.kommo.com` → Menu esquerdo → **Automation** → **Salesbot** → **Create bot**).

> **Ordem sugerida de construção:** primeiro o esqueleto no ambiente sombreado
> (usar Pipeline `[TESTE] Vendas` id=14171979 e `[TESTE] Pos-venda` id=14171991),
> testar, depois duplicar para produção.

Referências:
- Planilha `Rosie_Kommo_Build_Spec.xlsx` aba 5 (Salesbot) + aba 6 (Mensagens) — fonte-de-verdade
- Levantamento da conta: `rosie-conta-atual.md`
- Onda 1 aplicada: `rosie-onda1-resultado.md`

Identificadores usados aqui (todos vindos da Onda 1 aplicada em 2026-07-23):

| Custom fields | ID | Tipo |
|---|---|---|
| Nº Pedido Nuvemshop | 2053238 | text |
| CPF | 2053240 | text |
| E-mail da compra | 2053242 | text |
| Data aprox. compra | 2053244 | date |
| E-mail (lead) | 2053246 | text |
| Como conheceu a loja | 2053248 | select |
| Peça de interesse | 2053250 | text |
| Tamanho | 2053252 | text |
| Cor | 2053254 | text |
| Motivo do contato | 2053256 | select |
| Titular da compra | 2053258 | select |
| Valor aprox. carrinho | 2053260 | numeric |

| Tags | ID |
|---|---|
| venda | 149802 |
| pos-venda | 149804 |
| troca | 149806 |
| defeito | 149808 |
| devolucao | 149810 |
| cancelamento | 149812 |
| lista-reposicao | 149814 |
| carrinho-abandonado | 149816 |
| aguardando-transportadora | 149818 |

| Stages (Produção) | Pipeline | ID stage |
|---|---|---|
| Novo lead | Vendas 14033351 | 108316683 |
| Qualificado | Vendas | 108316687 |
| Carrinho enviado / aguardando pagamento | Vendas | 108316691 |
| Novo Chamado | Pós-Venda 14171615 | 109409503 |
| Com a Gente | Pós-Venda | 109409507 |
| Aguardando Cliente | Pós-Venda | 109409511 |
| Carrinho abandonado | Carrinho Abandonado 14171967 | 109412471 |
| Abordado | Carrinho Abandonado | 109412475 |
| Reengajou | Carrinho Abandonado | 109412479 |

| Stages (`[TESTE]`) | Pipeline | ID stage |
|---|---|---|
| Novo lead | `[TESTE] Vendas` 14171979 | 109412523 |
| Qualificado | `[TESTE] Vendas` | 109412527 |
| Carrinho enviado / aguardando pagamento | `[TESTE] Vendas` | 109412531 |
| Novo Chamado | `[TESTE] Pos-venda` 14171991 | 109412575 |
| Com a Gente | `[TESTE] Pos-venda` | 109412579 |
| Aguardando Cliente | `[TESTE] Pos-venda` | 109412583 |
| Carrinho abandonado | `[TESTE] Carrinho Abandonado` 14171987 | 109412559 |
| Abordado | `[TESTE] Carrinho Abandonado` | 109412563 |
| Reengajou | `[TESTE] Carrinho Abandonado` | 109412567 |

Variáveis Salesbot Kommo:
- `{{contact.name}}` — nome do contato
- `{{contact.first_name}}` — primeiro nome (Kommo derives)
- `{{lead.id}}`
- `{{lead.custom_field.XXX}}` onde XXX = ID do custom field
- `{{message.last_text}}` — última mensagem do cliente
- `{{contact.phone}}`, `{{contact.email}}`

---

## Convenção do documento

Cada nó abaixo tem:
- **ID interno** (usado nas referências entre nós)
- **Tipo do handler** que a UI vai gerar (`show`, `action`, `conditions`, `goto`, `widget_request`, `stop`)
- **O que fazer na UI** — clique-a-clique
- **Próximo(s) nó(s)** para conectar
- **Mensagem** (referência à aba 6 da planilha)
- **Efeito no card** (tag/stage aplicado)

## Ativação do Salesbot

Salesbot Kommo dispara em resposta a **evento de entrada de mensagem** de canal externo
(WhatsApp, Instagram, Live Chat). Para construir:

1. Menu → **Automation** → **Salesbot** → **Create new bot**
2. Nome: `Rosie — Bot Principal` (produção) ou `[TESTE] Rosie Bot` (sombra)
3. Trigger: **Incoming message** (any channel)
4. Adicionar nós conforme abaixo.

---

## Nó ENTRADA

- **ID interno:** `ENTRADA`
- **Tipo:** `action` (definir campos automáticos) + `show`
- **UI:**
  - Bloco 1 — **Action** → **Save data to field** — grava:
    - Contact name = `{{message.contact.name}}` (Kommo geralmente auto-preenche)
    - Contact phone = `{{message.contact.phone}}`
    - Contact origin = `{{message.source}}` (canal)
  - Bloco 2 — **Send message** → texto de M0.1:
    ```
    Oi, {{contact.first_name}}! Aqui é a Rosie 💛
    Me diz o que você precisa que eu te ajudo rapidinho:
    1 — Quero comprar / tenho dúvida sobre uma peça
    2 — Já comprei e preciso de ajuda com meu pedido
    3 — Outro assunto
    ```
  - Bloco 3 — **Ask a question** com **3 botões** (Kommo suporta `Quick reply buttons`):
    - Botão 1: "1 — Quero comprar" → conecta ao nó **A.QUAL**
    - Botão 2: "2 — Preciso de ajuda com meu pedido" → conecta ao nó **B.ID1**
    - Botão 3: "3 — Outro assunto" → conecta ao nó **OUTRO**

## Nó OUTRO

- **ID interno:** `OUTRO`
- **Tipo:** `show` + `action` + `goto`
- **UI:**
  - Send message: M0.3
    ```
    Claro! Me conta rapidinho o que você precisa 💛
    ```
  - Ask a question — free text, salvar resposta em custom field `Motivo do contato` (id 2053256) OU em nota do lead
  - Action → **Add tag** → nenhuma tag específica (deixa fluxo humano)
  - Action → **Move lead to stage** → **Pipeline Vendas** > **Novo lead** (108316683)
  - Conectar ao nó `HANDOFF_GENERICO`

---

# TRILHA A — VENDAS

## Nó A.QUAL — qualificação inicial

- **ID:** `A.QUAL`
- **Tipo:** `action` + `show` + salvar respostas
- **UI:**
  - Action → **Move lead** → **Pipeline Vendas > Qualificado** (108316687)
  - Action → **Add tag** → `venda` (149802)
  - Send message: MA.0
    ```
    Perfeito! Antes, me passa seu e-mail? É por ele que eu te mando o carrinho
    e aviso das novidades ✨
    E me conta: como você conheceu a Rosie?
    ```
  - **Ask a question** — free text (aguarda resposta com o e-mail)
    - Save answer to field: `E-mail (lead)` (2053246)
  - **Ask a question** — 5 botões (Como conheceu):
    - Instagram → save `Como conheceu` = Instagram
    - TikTok → save = TikTok
    - Indicação → save = Indicação
    - Google → save = Google
    - Outro → save = Outro
  - Conectar ao nó **A.MENU**

## Nó A.MENU — menu de dúvidas

- **ID:** `A.MENU`
- **Tipo:** `show` + `conditions` (4 opções)
- **UI:**
  - Send message: MA.1
    ```
    Show. Sobre o que é a sua dúvida?
    1 — Tamanho e caimento
    2 — Disponibilidade, cor ou reposição de uma peça
    3 — Pagamento, parcelamento ou cupom
    4 — Não sei o que levar, quero uma indicação
    ```
  - **Ask a question** — 4 botões:
    - 1 → nó **A1**
    - 2 → nó **A2**
    - 3 → nó **A3**
    - 4 → nó **A4**

## Nó A1 — tamanho / provador virtual

- **ID:** `A1`
- **Tipo:** `show` + `conditions`
- **UI:**
  - Send message: MA1.1
    ```
    A gente tem provador virtual no site 👉
    Você escolhe a peça, coloca suas medidas e vê o caimento antes de comprar
    — sem chute.
    👉 https://rosieiadoreyou.com/provador
    Dá uma olhada e me diz se resolveu!
    ```
  - **Ask a question** — 2 botões:
    - "Resolveu!" → nó **A1.OK**
    - "Ainda tô na dúvida" → nó **HANDOFF_A1** (H.2)

## Nó A1.OK

- **ID:** `A1.OK`
- **Tipo:** `show` + conectar
- **UI:**
  - Send message: MA1.2
    ```
    Que ótimo ✨ Quer que eu já monte seu carrinho?
    ```
  - **Ask a question** — 2 botões:
    - "Sim, monta pra mim" → nó **A.CART**
    - "Ainda não" → nó **HANDOFF_GENERICO** (H.1)

## Nó A2 — disponibilidade / cor / reposição

- **ID:** `A2`
- **Tipo:** `show` + salvar respostas + escalar humano
- **UI:**
  - Send message: MA2.1
    ```
    Me manda o link ou o print da peça que você quer 👉
    E me diz: qual tamanho e qual cor?
    ```
  - **Ask a question** — free text → save `Peça de interesse` (2053250)
  - **Ask a question** — free text → save `Tamanho` (2053252)
  - **Ask a question** — free text → save `Cor` (2053254)
  - Action → **Add tag** → nenhuma (humano decide)
  - Conectar ao nó **HANDOFF_A2**

## Nó A3 — pagamento

- **ID:** `A3`
- **Tipo:** `show` + escala direto
- **UI:**
  - Send message: MA3.1 (idêntica ao H.3-A)
    ```
    Claro! Você quer saber sobre parcelamento, desconto ou tem um cupom pra usar?
    Me diz qual é a sua dúvida que já te passo pra uma consultora resolver 💛
    ```
  - **Ask a question** — free text → save em nota do lead ("Dúvida de pagamento: ...")
  - Conectar ao nó **HANDOFF_A3** (H.3)

## Nó A4 — indicação de look

- **ID:** `A4`
- **Tipo:** `show` + coleta + escala
- **UI:**
  - Send message: MA4.1
    ```
    Adoro essa missão 💛 Me conta:
    • Qual a ocasião?
    • Que estilo você curte?
    • Qual sua faixa de preço?
    • Qual seu tamanho?
    ```
  - **Ask a question** — free text → save em nota do lead ("Indicação de look: ...")
  - Save `Tamanho` (2053252) = trecho do texto
  - Conectar ao nó **HANDOFF_A4** (H.4)

## Nó A.CART — envio de carrinho

- **ID:** `A.CART`
- **Tipo:** `action` + `show`
- **UI:**
  - Action → **Move lead** → **Pipeline Vendas > Carrinho enviado / aguardando pagamento** (108316691)
  - Send message: MA5.1
    ```
    Montei seu carrinho 👉
    É só finalizar por aqui:
    👉 [link do carrinho]
    Qualquer dúvida, me chama.
    ```
  - Action → **Save data** → gravar `Valor aprox. carrinho` (2053260) se o operador humano souber o valor
  - **STOP** (encerra o bot; conversa segue humana; AUT-07 dispara follow-ups temporais)

**IMPORTANTE:** o link real do carrinho é montado por Gabriela na Nuvemshop antes.
O bot só notifica "carrinho pronto" quando Gabriela já enviou.
No fluxo simplificado (sem widget_request Nuvemshop), a Gabriela cola o link na conversa
Kommo e depois arrasta o card manualmente para "Carrinho enviado".

Alternativa mais automatizada: bot só dispara MA5.1 quando o card é movido pela Gabriela
para o stage "Carrinho enviado". Isso está no Digital Pipeline (AUT-07 da Onda 3).

---

# TRILHA B — PÓS-VENDA

## Nó B.ID1 — portão de identificação (Nº do pedido)

- **ID:** `B.ID1`
- **Tipo:** `action` + `show` + `conditions`
- **UI:**
  - Action → **Move lead** → **Pipeline Pós-Venda > Novo Chamado** (109409503)
  - Action → **Add tag** → `pos-venda` (149804)
  - Send message: MB.0
    ```
    Poxa, vamos resolver isso 💛
    Me manda o número do seu pedido? Ele está no e-mail de confirmação, no
    formato #1234.
    ```
  - **Ask a question** — 2 botões:
    - "Aqui está" → aguarda cliente digitar o número → conecta a **B.LOC**
    - "Não achei o número" → conecta a **B.ID2**

  - Se cliente digitar direto (sem clicar botão), tentar salvar:
    - Ask a question — free text → save `Nº Pedido Nuvemshop` (2053238)
    - Conectar a **B.LOC**

## Nó B.ID2 — sem número, pede alternativas

- **ID:** `B.ID2`
- **Tipo:** `show`
- **UI:**
  - Send message: MB.1
    ```
    Sem problema! Então me manda:
    • o e-mail ou o CPF que você usou na compra
    • e mais ou menos a data em que você comprou
    Com isso eu acho aqui 👉
    ```
  - Ask a question — free text → save em CPF (2053240) OU E-mail da compra (2053242)
    (deixar humano decidir qual — ou dividir em 2 perguntas)
  - Ask a question — date picker → save `Data aprox. compra` (2053244)
  - Conectar a **B.LOC**

## Nó B.LOC — localizar pedido

- **ID:** `B.LOC`
- **Tipo:** `action` (nota)
- **UI:**
  - Action → **Create note** → texto: "Bot coletou dados de identificação. Consultora, por favor verificar Nuvemshop e mover para B.MENU (motivo do problema) ou B.NF (não localizado)."
  - Conectar a **HANDOFF_B_LOC** (nota temporária: humano decide)

**Nota importante do briefing:** o passo "localizar pedido na Nuvemshop e gravar
no card" foi simplificado na Fase 3. Aqui o bot só coleta os dados de
identificação e escala. A consultora abre a Nuvemshop, localiza, grava manualmente
`Nº Pedido` no card, e depois pergunta ao cliente o tipo de problema (nó B.MENU
via chat humano, ou usa Salesbot secundário disparado por tag).

**Alternativa mais fluida (mesmo sem widget Nuvemshop):** o bot avança direto
para B.MENU sem esperar a validação — a consultora valida em paralelo enquanto
o cliente responde qual é o problema.

## Nó B.MENU — tipo do problema

- **ID:** `B.MENU`
- **Tipo:** `show` + `conditions` (7 opções)
- **UI:**
  - Send message: MB.2
    ```
    Achei! Pedido #{{lead.custom_field.2053238}}, feito em {{lead.custom_field.2053244}}. Status: [status].
    Me conta o que aconteceu:
    1 — Quero saber onde está meu pedido
    2 — Meu pedido está atrasado
    3 — Veio item errado ou faltando
    4 — Produto com defeito
    5 — Quero trocar
    6 — Quero devolver
    7 — Quero cancelar
    ```
  - Ask a question — 7 botões:
    - 1 → B1
    - 2 → B2
    - 3 → B3
    - 4 → B4
    - 5 → B5
    - 6 → B6
    - 7 → B7

## Nós B1 e B2 — rastreio / atraso

- **ID:** `B1` e `B2` (mesma estrutura)
- **Tipo:** `action` + `show` → escalar sem coleta adicional
- **UI:**
  - Action → **Save data** → `Motivo do contato` (2053256) = "Rastreio" (B1) ou "Atraso" (B2)
  - Conectar a **HANDOFF_B_RASTREIO** (H.6)

**Nota do briefing:** "Sem nova coleta; escala (humano puxa no Olist)".

## Nó B3 — item errado ou faltando

- **ID:** `B3`
- **Tipo:** `action` + `show` + coleta de fotos
- **UI:**
  - Action → Save `Motivo do contato` = "Item errado ou faltando"
  - Action → Add tag → `troca` (149806) — provisório, humano ajusta
  - Send message: B3.col
    ```
    Que chato, {{contact.first_name}}. Vamos resolver 👉
    Pra agilizar, me manda:
    • uma foto do que chegou
    • uma foto da etiqueta ou da nota que veio na embalagem
    ```
  - Ask for **attachment** (Kommo suporta anexar imagens no fluxo do bot)
  - Conectar a **HANDOFF_B_GENERICO** (H.5)

## Nó B4 — defeito

- **ID:** `B4`
- **Tipo:** `action` + `show` + coleta de mídia
- **UI:**
  - Action → Save `Motivo do contato` = "Defeito"
  - Action → Add tag → `defeito` (149808)
  - Send message: B4.col
    ```
    Poxa, sinto muito 💛 Vamos resolver isso.
    Me manda uma foto ou um vídeo mostrando o defeito e me conta rapidinho
    o que aconteceu.
    ```
  - Ask for attachment
  - Ask for text (descrição)
  - Conectar a **HANDOFF_B_GENERICO** (H.5)

## Nó B5 — troca

- **ID:** `B5`
- **Tipo:** `action` + `show` + coleta
- **UI:**
  - Action → Save `Motivo do contato` = "Troca"
  - Action → Add tag → `troca` (149806)
  - Send message: B5.col
    ```
    Claro 💛 Me diz:
    • Qual peça você quer trocar?
    • Por qual tamanho ou modelo?
    • A peça está sem uso e com a etiqueta?
    (depois) Só mais uma coisinha: a compra foi feita no seu nome ou no
    nome de outra pessoa?
    ```
  - Ask — free text (peça atual + tamanho desejado)
  - Ask — 2 botões (sem uso? sim / não)
  - Ask — 2 botões: "Própria" / "Outra pessoa" → save `Titular da compra` (2053258)
  - Conectar a **HANDOFF_B_GENERICO** (H.5)

## Nó B6 — devolução (7 dias, CDC)

- **ID:** `B6`
- **Tipo:** `action` + `show`
- **UI:**
  - Action → Save `Motivo do contato` = "Devolução"
  - Action → Add tag → `devolucao` (149810)
  - Send message: B6.col
    ```
    Sem problema, {{contact.first_name}}. Você tem 7 dias corridos depois de
    receber pra desistir da compra — é seu direito.
    Me conta:
    • Qual o motivo?
    • Em que dia você recebeu o pedido?
    (depois) E a compra foi feita no seu nome ou no nome de outra pessoa?
    ```
  - Ask — free text (motivo)
  - Ask — date picker (data recebimento)
  - Ask — 2 botões titular → save `Titular da compra` (2053258)
  - Conectar a **HANDOFF_B_GENERICO** (H.5)

## Nó B7 — cancelamento

- **ID:** `B7`
- **Tipo:** `show` + `conditions` (verifica status já lido do card pela consultora)
- **UI:**
  - Send message: MB7.1
    ```
    Deixa eu checar o status do seu pedido rapidinho...
    ```
  - **Nota importante:** como não temos widget_request Nuvemshop, o bot NÃO
    consegue verificar status sozinho. Duas opções:
    - **Opção A (mais simples):** encaminha SEMPRE para humano via HANDOFF_B_GENERICO,
      que verifica na Nuvemshop e responde. Bot fica igual a B1-B6.
    - **Opção B (mais assertiva):** bot pergunta ao cliente "seu pedido já saiu?
      (Sim / Não / Não sei)".
      - Sim → desvia para B6 (devolução): já saiu = não dá pra cancelar mais.
      - Não → HANDOFF_B_GENERICO com nota "consultora verifica e cancela se ainda dá tempo"
      - Não sei → HANDOFF_B_GENERICO
  - **Recomendação Kolden:** usar Opção A (mais simples, mais rápida) por enquanto.
    Registra decisão como nota do lead: "B7 escalado — verificar Nuvemshop antes de responder"
  - Action → Save `Motivo do contato` = "Cancelamento"
  - Action → Add tag → `cancelamento` (149812)
  - Conectar a **HANDOFF_B_GENERICO** (H.5)

---

# NÓS DE HANDOFF (com regra de horário via Hermes middleware)

Todos os handoffs seguem o mesmo padrão: `widget_request` para `/kommo/horario`,
depois `conditions` sobre `{{json.in_hours}}` para escolher versão A ou B da mensagem.

## Nó HANDOFF_GENERICO (H.1)

- **ID:** `HANDOFF_GENERICO`
- **Tipo:** `widget_request` + `conditions`
- **UI:**
  - **Widget request** (na UI Kommo, dentro do fluxo do bot):
    - URL: `https://<railway-url>/kommo/horario`
    - Method: POST
    - Headers: `X-Kolden-Token: {{kolden_token}}` (constante configurada uma vez)
    - Body: `{}`
    - Save response to variable: `horario`
  - **Conditions** sobre `{{horario.in_hours}}`:
    - Se **true** → send H.1-A:
      ```
      Uma consultora assume seu atendimento agora 💛
      ```
    - Se **false** → send H.1-B:
      ```
      Já deixei tudo registrado aqui 💛 A gente não está em atendimento agora,
      mas assim que abrir uma consultora te responde por aqui — pode ficar
      tranquila.
      ```
  - **STOP** (encerra o bot)

## Nós HANDOFF_A1 / A2 / A3 / A4 (H.2, específicos, H.3, H.4)

Mesma estrutura de HANDOFF_GENERICO, mas com textos diferentes por ramo:

### HANDOFF_A1 (H.2 — tamanho)
- Widget request → in_hours ? A : B
- A: "Sem problema. Vou te passar agora pra uma consultora que vai te ajudar a escolher o tamanho certo. Um minutinho 💛"
- B: "Sem problema! Anotei tudo aqui 💛 A gente não está em atendimento agora, mas assim que abrir uma consultora te ajuda a escolher o tamanho certo."

### HANDOFF_A2 (usa H.1 genérico ou H.5)
Bot escala com peça+tamanho+cor coletados. Usa H.1 (genérico).

### HANDOFF_A3 (H.3 — pagamento)
- A: "Claro! Você quer saber sobre parcelamento, desconto ou tem um cupom pra usar? Me diz qual é a sua dúvida que já te passo pra uma consultora resolver 💛"
- B: "Claro! Você quer saber sobre parcelamento, desconto ou tem um cupom pra usar? Me conta aqui que já deixo registrado 💛 A gente não está em atendimento agora, mas assim que abrir uma consultora te responde."

### HANDOFF_A4 (H.4 — indicação look)
- A: "Perfeito, já tenho tudo ✨ Vou te passar pra uma consultora que vai montar um look pensado só pra você. Um minutinho."
- B: "Perfeito, já tenho tudo ✨ A gente não está em atendimento agora, mas assim que abrir uma consultora monta um look pensado só pra você 💛"

## Nós HANDOFF_B_GENERICO (H.5) e HANDOFF_B_RASTREIO (H.6)

### HANDOFF_B_GENERICO (H.5)
- Widget request → in_hours ? A : B
- A: "Uma consultora assume agora e já te responde 💛"
- B: "Está tudo registrado aqui 💛 A gente não está em atendimento agora, mas assim que abrir uma consultora assume seu caso e te responde."
- Action → Move card → **Pipeline Pós-Venda > Com a Gente** (109409507)

### HANDOFF_B_RASTREIO (H.6)
- Widget request → in_hours ? A : B
- A: "Uma consultora já vai puxar essa informação pra você e te manda por aqui. Um minutinho 💛"
- B: "Anotei aqui 💛 A gente não está em atendimento agora, mas assim que abrir uma consultora puxa essa informação e te manda por aqui."
- Action → Move card → **Pipeline Pós-Venda > Com a Gente** (109409507)

---

## Ordem de construção sugerida (na UI Kommo)

**Sessão 1 (~3h) — Esqueleto e fluxo Vendas:**
1. Criar bot base + trigger + nó ENTRADA + botões
2. Nó OUTRO + HANDOFF_GENERICO (H.1)
3. Nó A.QUAL + A.MENU
4. Nós A1, A1.OK, A.CART, HANDOFF_A1

**Sessão 2 (~3h) — Restante da Trilha A:**
5. Nós A2 + HANDOFF_A2
6. Nós A3 + HANDOFF_A3
7. Nós A4 + HANDOFF_A4

**Sessão 3 (~4h) — Trilha B completa:**
8. Nós B.ID1, B.ID2, B.LOC, B.MENU
9. Nós B1, B2 + HANDOFF_B_RASTREIO (H.6)
10. Nós B3, B4, B5, B6, B7 + HANDOFF_B_GENERICO (H.5)

**Sessão 4 (~4h) — Widget requests + testes:**
11. Configurar todos os widget_requests para `/kommo/horario` (precisa do Hermes middleware já deployado no Railway)
12. Testar cada ramo end-to-end no ambiente `[TESTE]`
13. Ajustes finos

**Total estimado:** 14h Kolden (Emporos 10 + Ronan 2 + Caliope 2 de revisão) em 2-3 dias corridos.

## Checklist de aceite (Onda 2)

- [ ] Bot criado com nome "Rosie — Bot Principal" (produção) OU "[TESTE] Rosie Bot" (sombra)
- [ ] Trigger = "Incoming message" (any channel)
- [ ] Nó ENTRADA com 3 botões roteando corretamente
- [ ] Trilha A completa: A.QUAL → A.MENU → {A1, A2, A3, A4} → A.CART ou handoffs
- [ ] Trilha B completa: B.ID1/B.ID2 → B.LOC → B.MENU → {B1-B7} → handoff
- [ ] Nó OUTRO conecta a HANDOFF_GENERICO
- [ ] Todos os 6 handoffs (H.1 a H.6) fazem widget_request e branch A/B
- [ ] Tags aplicadas conforme spec
- [ ] Custom fields preenchidos conforme spec
- [ ] Cards movem para stage certo em cada trilha
- [ ] Testes com 4 números da whitelist (Ronan + 3 Gabrielas + Catarinas) — cada ramo pelo menos 1x
- [ ] Dike audita nó-por-nó vs. esta spec (Onda 6)

## Dependências antes de iniciar Onda 2

- ⚠️ **Hermes middleware deployado no Railway** com endpoint `/kommo/horario` funcional (só isso — sem outros endpoints)
- ⚠️ **KOLDEN_TOKEN** (var de env) configurado no Railway E salvo em variável do Salesbot Kommo (usada nos `widget_request`)
- ⚠️ **Token Kommo rotacionado** (segurança — o atual foi transmitido em texto puro no chat)
- ⚠️ **Ambiente `[TESTE]` funcional** (pipelines já criados na Onda 1 ✓)

## Notas sobre limitações da UI Salesbot

1. **Kommo Salesbot não expõe formalmente handler `stop`** — encerrar é "não conectar próximo nó". A conversa fica pausada.
2. **Kommo NÃO tem handler nativo `time_condition`** — por isso o widget_request para nosso Hermes decide o horário.
3. **Cores de nó** — recomenda-se colorir por trilha (Vendas = verde, Pós-venda = laranja, Handoff = vermelho) para facilitar visualização.
4. **Salesbots API está indisponível nessa conta** (planilha do plano — 404 no endpoint). Não dá para exportar/importar JSON. Rebuild manual entre ambientes.
