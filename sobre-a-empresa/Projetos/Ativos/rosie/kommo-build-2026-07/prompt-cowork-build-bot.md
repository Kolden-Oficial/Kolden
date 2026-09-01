# PROMPT PARA O CLAUDE CODE COWORK — Construir Salesbot Rosie na UI Kommo

> **Como usar:** copia tudo abaixo da linha `---` e cola no Cowork ativo no navegador com a UI da Kommo (`rosie.kommo.com`) aberta.

---

# MISSÃO

Você é um agente construtor de bots Kommo trabalhando no navegador do Ronan Silva (Kolden). Sua missão é construir o **Salesbot "Rosie – Bot Principal"** completo (~87 blocos) diretamente na UI oficial do Kommo (`rosie.kommo.com`), **clique-a-clique**, usando o Visual Builder.

**Zero JSON.** Antes tentaram construir via JSON e falhou por bugs não-documentados do formato proprietário. Sua abordagem é 100% pela UI visual — que é o único caminho que a Kommo suporta oficialmente.

**Você tem autonomia** para executar todo o build. Consulta as referências abaixo, monta cada bloco, testa cada trilha, e reporta progresso pro Ronan.

---

# 1. ACESSO À CONTA

- **URL:** `https://rosie.kommo.com`
- **Admin logado:** adm@kolden.com.br (Kolden)
- **Path do bot:** menu esquerdo → **Automation** → **Salesbot** → **Create new bot**
- **Nome do bot:** `Rosie - Bot Principal`
- **Trigger:** `Incoming message` — canal `Any` (marca WhatsApp E Instagram)

**Antes de começar:** verifica se já existe um bot com esse nome. Se sim, **NÃO deleta** — abre e continua de onde ficou. Confirma com Ronan se deve substituir ou continuar.

---

# 2. REFERÊNCIAS OBRIGATÓRIAS

Consulta essas fontes ANTES e DURANTE a construção. São a fonte-de-verdade de tudo:

## 📄 Google Doc — Todas as 33 mensagens do bot
**URL:** https://docs.google.com/document/d/1_lm8SHlEGpOyRb7Jhyxin4rWRGQNJNQmFpIE2Ye9BX8/edit

Este doc tem TODAS as mensagens, botões, ações e roteamentos organizados por trilha, na ordem exata em que o cliente encontra. Use como script principal — cada bloco tem título, texto exato da mensagem, botões com destino, e ações (grava/tag/move/nota) que o bot executa.

**Legenda dos ícones no Doc:**
- 📤 MENSAGEM — texto enviado ao cliente
- ⏸️ AGUARDA — bot pausa esperando resposta (Pause step "message received")
- 💾 GRAVA — salva valor num custom field (Set field action)
- 🏷️ TAG — aplica tag no card (Add tag action)
- 📍 MOVE — muda card de stage (Change lead status action)
- 📝 NOTA — cria nota interna no card (Add note action)
- 🌐 HERMES — chama webhook externo (Send webhook step)
- 🔀 SE — bifurcação por condição (Condition step)
- 🔘 BOTÕES — Quick Reply Buttons
- 🛑 FIM — Change conversation status → Closed (encerra bot)

## 🗺️ Figma FigJam — Fluxo visual
**URL:** https://www.figma.com/board/GkVpv2kBD9S1JHdf0BPFHV

Mapa visual do grafo completo (75 nodes, arestas dos botões, agrupamentos por trilha). Use pra entender a topologia do bot antes de começar, e como referência de "para onde este bloco conecta".

## 📖 Dossiê técnico Kommo (achados empíricos)
**Path no arquivo do Ronan:** `C:\Kolden\sobre-a-empresa\Ferramentas\Kommo\kommo-salesbot-oficial-2026-07-31.md`

Handlers documentados oficialmente + achados empíricos (starting_block sem botões, wait_answer é padrão canônico, comportamento de recipient/chat_sources, etc). Consulta se tiver dúvida técnica sobre um step.

---

# 3. IDs CANÔNICOS DA CONTA ROSIE

Você vai usar esses IDs ao configurar "Change lead status", "Set field", "Add tag", etc.

## Pipelines

| ID | Nome |
|---|---|
| 14033351 | Funil de Vendas |
| 14171615 | Funil de Pós-Venda |
| 14171967 | Funil de Carrinho Abandonado |

## Stages (por pipeline)

**Vendas (14033351):**
- 108316683 — Novo lead
- 108316687 — Qualificado
- 108316691 — Carrinho enviado / aguardando pagamento

**Pós-Venda (14171615):**
- 109409503 — Novo Chamado
- 109409507 — Com a Gente
- 109409511 — Aguardando Cliente

**Carrinho Abandonado (14171967):**
- 109412471 — Carrinho abandonado
- 109412475 — Abordado
- 109412479 — Reengajou

## Custom Fields (do lead)

| ID | Nome | Tipo |
|---|---|---|
| 2053238 | Nº Pedido Nuvemshop | text |
| 2053240 | CPF | text |
| 2053242 | E-mail da compra | text |
| 2053244 | Data aprox. compra | date |
| 2053246 | E-mail (lead) | text |
| 2053248 | Como conheceu a loja | select |
| 2053250 | Peça de interesse | text |
| 2053252 | Tamanho | text |
| 2053254 | Cor | text |
| 2053256 | Motivo do contato | select |
| 2053258 | Titular da compra | select |
| 2053260 | Valor aprox. carrinho | numeric |

## Tags (crie se não existirem)

- `venda`, `pos-venda`, `troca`, `defeito`, `devolucao`, `cancelamento`, `lista-reposicao`, `canal-whatsapp`, `canal-instagram`

## Chat sources (canais conectados)

| ID | Canal |
|---|---|
| 30392 | WhatsApp |
| 31328 | Instagram |

## Middleware Hermes (webhook externo dos handoffs)

- **URL:** `https://HERMES_MW_URL.substituir/kommo/horario` (Ronan vai te passar a URL real depois do deploy Railway — por enquanto usa placeholder)
- **Método:** POST
- **Header:** `X-Kolden-Token: SUBSTITUIR_KOLDEN_TOKEN` (Ronan te passa o valor)
- **Retorna:** `{ "horario": { "in_hours": true/false } }`
- **Uso:** os 6 handoffs por horário chamam esse webhook e branch em `{{json.horario.in_hours}}`

---

# 4. 🔴 REGRAS CRÍTICAS (bugs descobertos empiricamente)

Essas regras vieram de 6+ horas de debug via JSON. **Segue todas SEM discutir** — cada uma foi validada empiricamente em conversas de teste no WhatsApp da Rosie.

### R1 — Starting block com botões duplica mensagem
**Regra:** o PRIMEIRO bloco do bot deve ser APENAS uma mensagem simples (só texto, sem botões, sem Pause, sem nada além do texto de saudação).

**Aplicação prática:**
- **Bloco 0** = Message step com "Oi, {{lead.name}}! Aqui é a Rosie 💛 Tô aqui pra te ajudar rapidinho." (só isso, conecta pro próximo)
- **Bloco 1** = Message step com o menu de 3 botões (Trilha A/B/OUTRO)

**Por quê:** se o starting block já tem Quick Reply Buttons, o Kommo dispara a mensagem duas vezes (bug não-documentado).

### R2 — Botões limite 20 caracteres
**Regra:** cada Quick Reply Button (label) tem **máximo 20 chars**. Passou disso, o WhatsApp trunca.

**Aplicação prática:** o texto DA MENSAGEM pode ser longo, mas o LABEL do botão deve ser curto. Ex: mensagem diz "1 - Quero comprar / tenho dúvida sobre uma peça", botão só diz "1 - Quero comprar" (17 chars ✓).

### R3 — Padrão canônico pra capturar resposta
**Regra:** o padrão pra pedir e capturar uma resposta do cliente em custom field é:

1. **Message step** com a pergunta (ex: "Me manda seu e-mail?")
2. **Pause step** modo "Until message received" (bot pausa aguardando)
3. **Set field action** — configura `Field = <custom_field_alvo>`, `Value = Client message` (vai pegar a última mensagem do cliente e salvar)

**Por quê:** o handler `ask` inline não funciona no Visual Builder. `Set field` sozinho com variável interpolada não grava valor. Só esse padrão funciona.

### R4 — Verifica o card após CADA teste com Set field
**Regra:** todo Set field precisa ser **verificado no card do lead** após teste. Abre `rosie.kommo.com → Leads → filtra pelo teste → abre o card → confirma que o campo foi preenchido com o valor que você digitou`.

**Se ficar vazio:** provavelmente configurou `Client message` errado. Refaz e testa.

### R5 — Sinônimos nos botões (opcional mas recomendado)
**Regra:** pra cada Quick Reply Button, adiciona sinônimos que permitem o cliente responder com "1" em vez de clicar o botão inteiro. Sempre adiciona pelo menos: o número puro, primeira palavra em minúsculo, palavra-chave.

**Exemplo:** botão "1 - Quero comprar" → sinônimos: `1`, `1.`, `01`, `quero`, `quero comprar`, `comprar`

### R6 — Recipient default vs Main contact
**Regra:** deixa o default (**All contacts – selected channels**). Só muda pra **Main contact – primary channel** se em teste você observar duplicação de mensagens.

**Por quê:** o Kommo pode duplicar quando lead tem múltiplos contatos ou múltiplos canais conectados. `Main contact – primary channel` corta isso.

### R7 — Handoffs por horário: branches devem ser mutuamente exclusivas
**Regra:** cada handoff (6 no total: HANDOFF_GENERICO, HANDOFF_A1, HANDOFF_A2, HANDOFF_A3, HANDOFF_A4, HANDOFF_B_GENERICO, HANDOFF_B_RASTREIO) tem uma versão de mensagem "in_hours=true" (dentro do horário) e outra "in_hours=false" (fora). Use o **Condition step** da UI com AMBAS as branches configuradas em ramos SEPARADOS (não sequenciais).

**UI Kommo:**
- Após o Send webhook (que chama Hermes e retorna `{{json.horario.in_hours}}`), adiciona **Condition step**
- Configura: `IF {{json.horario.in_hours}} equals "true"` → conecta a **Message step "consultora vai te atender agora"** → **Change conversation status → Closed**
- No mesmo Condition, configura o **ELSE branch** → conecta a **Message step "não estamos em atendimento agora, mas vamos responder assim que abrir"** → **Change conversation status → Closed**

**Por quê:** se você colocar as duas mensagens em sequência (uma depois da outra), o bot manda AMBAS. As branches precisam ser mutuamente exclusivas via Condition step com IF/ELSE.

### R8 — Set field pode ter valor fixo OU Client message
- **Valor fixo:** quando você QUER gravar um texto específico (ex: bloco Instagram grava `2053248 = "Instagram"` fixo)
- **Client message:** quando você QUER capturar a próxima mensagem do cliente (ex: pergunta email, cliente responde, grava `2053246 = Client message`)

Nunca use variáveis tipo `{{message_text}}` ou `{{lead.name}}` no valor do Set field — só funcionam em `{{contact.name}}`/`{{lead.name}}` DENTRO do texto de Message, não como valor de Set field.

### R9 — Variável do nome no texto: {{lead.name}}
**Uso correto:** dentro do texto de uma Message step. Se o lead não tem nome, renderiza o ID (ex: "Oi, 16241475!"). Ideal seria não personalizar (só "Oi! Aqui é a Rosie 💛"), mas o texto atual do Google Doc usa `{{lead.name}}` — mantém.

### R10 — Chame Ronan em qualquer bloqueio
Se algo não bater com o Google Doc, se um step não tiver como configurar do jeito descrito, se a UI mudou desde a documentação — **para e pergunta**. Melhor perguntar do que assumir e refazer depois.

---

# 5. SEQUÊNCIA DE CONSTRUÇÃO (8 trilhas, ~87 blocos)

Constrói na ordem abaixo. **Testa cada trilha ANTES de passar pra próxima.**

## Trilha 0 — ENTRADA (2 blocos)
- Bloco 0: Message só saudação
- Bloco 1: Message com botões (3 opções: Comprar / Ajuda pedido / Outro assunto)
- Botões roteiam pra Trilhas A / B / OUTRO

**Referência no Google Doc:** seção "ENTRADA (comum)"

## Trilha A · qualificação e origem (blocos 1–10, ~9 blocos)
- Move status pra Vendas > Qualificado
- Aplica tags `venda` e `canal-whatsapp` (ou `canal-instagram` — detecta por qual canal veio)
- Pergunta email + captura em field 2053246
- Pergunta como conheceu (5 botões: Instagram, TikTok, Indicação, Google, Outro) + captura em field 2053248

**Referência no Google Doc:** seção "TRILHA A — VENDAS · qualificação e captura de origem"

## Trilha A · menu de dúvidas (bloco 10, 1 bloco)
- Message com 4 botões: Tamanho, Disponibilidade, Pagamento, Indicação look
- Roteia pra A1, A2, A3, A4

**Referência no Google Doc:** seção "TRILHA A — VENDAS · menu de dúvidas"

## Trilha A · ramos A1-A4 + A.CART (blocos 11–18, ~8 blocos)
- A1: provador virtual + 2 botões (Resolveu → A1.OK, Ainda tenho dúvida → HANDOFF_A1)
- A1.OK: 2 botões (Sim monta carrinho → A.CART, Ainda não → HANDOFF_GENERICO)
- A2: pergunta peça+tamanho+cor + captura em 3 fields → HANDOFF_A2 (com tag lista-reposicao)
- A3: pergunta dúvida pagamento → HANDOFF_A3
- A4: pergunta ocasião+estilo+preço+tamanho → HANDOFF_A4
- A.CART: move status pra Carrinho enviado + envia mensagem com link + cria nota interna "preencher valor" + encerra bot

**Referência no Google Doc:** seções "ramo A1/A2/A3/A4/envio de carrinho"

## Trilha B · identificação (blocos 19–25, ~7 blocos)
- Move status pra Pós-Venda > Novo Chamado
- Aplica tags `pos-venda` e `canal-*`
- Pergunta nº pedido com 2 botões (Aqui está / Não achei)
- Se "Aqui está": captura nº do pedido em 2053238
- Se "Não achei": pergunta email da compra + CPF + data (captura 3 fields separados 2053242, 2053240, 2053244)
- Nota interna pra consultora validar na Nuvemshop
- Menu 7 opções pra tipo de problema

**Referência no Google Doc:** seção "TRILHA B — PÓS-VENDA · identificação (B.ID)"

## Trilha B · ramos B1-B7 (blocos 26–41, ~16 blocos)
- B1 Rastreio: grava motivo "Rastreio" → HANDOFF_B_RASTREIO
- B2 Atraso: grava motivo "Atraso" → HANDOFF_B_RASTREIO
- B3 Item errado: grava motivo + tag `troca` + pede fotos → HANDOFF_B_GENERICO
- B4 Defeito: grava motivo + tag `defeito` + pede foto/vídeo → HANDOFF_B_GENERICO
- B5 Troca: grava motivo + tag `troca` + pede detalhes + pergunta titular (2053258) → HANDOFF_B_GENERICO
- B6 Devolução: grava motivo + tag `devolucao` + explica CDC 7 dias + pede motivo/data + titular → HANDOFF_B_GENERICO
- B7 Cancelamento: grava motivo + tag `cancelamento` → HANDOFF_B_GENERICO

**Referência no Google Doc:** seções "ramo B1/B2/B3/B4/B5/B6/B7"

## Trilha 7 — HANDOFFS por horário (blocos 42–72, ~30 blocos)
6 handoffs distintos, cada um com o padrão:
1. Send webhook → Hermes `/kommo/horario` (retorna `{horario.in_hours}`)
2. Condition step: IF `{{json.horario.in_hours}} == true` → Message "consultora atende agora" | ELSE → Message "não em atendimento, respondemos ao abrir"
3. Change conversation status → Closed (encerra bot)

**6 handoffs específicos** (cada um com sua mensagem própria):
- **HANDOFF_GENERICO** (H.1) — genérico Trilha A
- **HANDOFF_A1** (H.2) — específico ramo tamanho
- **HANDOFF_A2** (H.2b) — específico disponibilidade (aplica tag `lista-reposicao` antes)
- **HANDOFF_A3** (H.3) — específico pagamento
- **HANDOFF_A4** (H.4) — específico look
- **HANDOFF_B_GENERICO** (H.5) — genérico Trilha B (move card pra Pós-Venda > Com a Gente antes)
- **HANDOFF_B_RASTREIO** (H.6) — específico rastreio (move card pra Pós-Venda > Com a Gente antes)

**Referência no Google Doc:** seções "HANDOFF..." (7 seções)

## Trilha OUTRO (blocos 73–74, 2 blocos)
- Message "Me conta rapidinho" + captura motivo em 2053256
- Aplica tag `canal-*` + move card pra Vendas > Novo lead → HANDOFF_GENERICO

**Referência no Google Doc:** seção "RAMO OUTRO"

---

# 6. CHECKLIST DE TESTE (rodar após cada trilha)

Antes de passar pra próxima trilha, teste ponta a ponta:

1. **Envia mensagem** do WhatsApp Ronan (número que ele te passa) pro número da Rosie
2. **Percorre TODOS os caminhos** da trilha (ex: se tem 4 botões, testa clicando em cada um separadamente em conversas diferentes)
3. **Verifica na conversa:**
   - [ ] Cada mensagem chegou **exatamente 1 vez** (nem duplicada, nem faltando)
   - [ ] Botões apareceram corretos, com labels dentro de 20 chars
   - [ ] Bot pausou nos pontos de captura (não mandou próxima mensagem antes de você responder)
   - [ ] Bot encerrou onde deveria (talk_close/handoff)
4. **Verifica no card do lead** (`rosie.kommo.com → Leads → abre o lead do teste`):
   - [ ] Custom fields esperados foram preenchidos (email, tamanho, motivo, etc — o que a trilha coletou)
   - [ ] Tags esperadas foram aplicadas (venda, pos-venda, troca, defeito, canal-*, etc)
   - [ ] Stage do card foi atualizado (Qualificado / Carrinho enviado / Novo Chamado / etc)
   - [ ] Notas internas foram criadas (quando aplicável — A.CART e B.LOC criam nota)

**Se um item falhar:** anota o bloco exato onde falhou + o comportamento observado, corrige na UI, testa de novo. Só passa pra próxima trilha quando 100% dos itens do checklist estão ✓.

---

# 7. COMO REPORTAR PROGRESSO

Após completar + testar CADA trilha, manda mensagem pro Ronan (ele te diz o canal: Slack, WhatsApp Kolden, ou nota no card do próprio Kommo) com:

```
✅ Trilha [nome] — completa

- Blocos construídos: N
- Testes passados: N/N
- Bugs encontrados: [lista curta]
- Ajustes feitos: [lista curta]
- Screenshots: [anexa 2 prints — 1 do editor mostrando os blocos, 1 do card do lead com dados preenchidos]

Próxima: [nome da próxima trilha]
```

**Se travar em algum bloco:** para o build, manda print do bloco + descrição do problema + tenta 1 alternativa razoável. Se falhar, aguarda resposta do Ronan.

---

# 8. AUTONOMIA E LIMITES

## Você PODE (sem pedir permissão):
- Criar novos steps, editar textos, adicionar/remover botões
- Ajustar sinônimos nos botões pra melhorar reconhecimento
- Aplicar tags (usa as existentes ou cria as que estão listadas em §3)
- Mudar stages dos cards (só usa os IDs listados em §3)
- Testar quantas vezes precisar (a Rosie tem plano com testes ilimitados)
- Reformular texto pra corrigir português/clareza — mas MANTÉM o significado e o tom da voz da Rosie (descomplicada, sensorial, próximo)

## Você NÃO PODE (sem confirmar com Ronan):
- Deletar bots antigos (verifica se existe outro bot ativo, mas não deleta — Ronan decide)
- Criar novos custom fields (só usa os 12 listados)
- Criar novas tags além das 9 listadas
- Mudar o trigger do bot (deve ser `Incoming message`, `Any channel`)
- Publicar em produção sem Ronan validar (deixa o bot em modo teste até ele autorizar)
- Modificar Digital Pipeline (Onda 3 — separado)
- Configurar templates WhatsApp (Onda 0 — separado)

## Escale se precisar:
- Dúvida sobre texto ou fluxo → consulta o **Google Doc**
- Dúvida técnica de Kommo → consulta o **dossiê `kommo-salesbot-oficial-2026-07-31.md`**
- Bug persistente após 2 tentativas de fix → pergunta Ronan
- Divergência entre Google Doc e FigJam → **Google Doc é a fonte-de-verdade**

---

# 9. ORDEM DO DIA — comece por aqui

1. Abre `rosie.kommo.com` (deve estar logado como adm@kolden.com.br)
2. Abre o Google Doc (link em §2) numa aba nova
3. Vai em `Automation → Salesbot`
4. Verifica se já existe bot "Rosie - Bot Principal" — se existe, avisa Ronan
5. Cria novo bot com nome `Rosie - Bot Principal`
6. Configura trigger: `Incoming message`, `Any channel`
7. Começa pela Trilha 0 (ENTRADA — 2 blocos)
8. Testa Trilha 0 (checklist §6)
9. Reporta pro Ronan (formato §7)
10. Continua com Trilha A · qualificação e origem

---

# 10. RESUMO ULTRA-CURTO (se você só ler isso)

- Constrói o bot **Rosie - Bot Principal** na UI do `rosie.kommo.com`
- **Sequência:** 8 trilhas, ~87 blocos, na ordem em §5
- **Fonte-de-verdade dos textos:** Google Doc [link acima]
- **Regras críticas não-óbvias:** §4 (10 regras — LÊ TUDO antes de começar)
- **IDs canônicos:** §3 (pipelines, stages, custom fields, tags, canais)
- **Testa cada trilha** antes de passar pra próxima (§6)
- **Reporta após cada trilha completa** (§7)

Bom trabalho. Qualquer dúvida, para e pergunta.

---

*Prompt gerado em 2026-08-03 por Claude (Anthropic) para Ronan Silva (Kolden), após 6+ horas de tentativas de build via JSON.*
