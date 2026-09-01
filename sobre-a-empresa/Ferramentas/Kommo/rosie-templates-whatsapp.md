---
tipo: runbook
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/Kommo/ferramentas]]"
---

# Templates WhatsApp — Rosie (submissão à Meta)

> Templates que precisam ser **aprovados pela Meta** antes de irem ao ar, porque
> disparam **fora da janela de 24h** desde a última mensagem do cliente (proativos).
> Extraídos da aba 6 (Mensagens) da planilha `Rosie_Kommo_Build_Spec.xlsx`.

**Submeter na Onda 0** (não esperar Ondas 2-3 — moderação Meta demora 24-48h).

## Quais mensagens precisam de template Meta e quais NÃO precisam

**PRECISAM** (7 — proativas, disparadas por AUT-07, AUT-09, AUT-10):
- `MA5.2`, `MA5.3`, `MA5.4` — follow-ups de carrinho enviado (2h, 24h, 72h)
- `MC.1`, `MC.2` — recuperação de carrinho abandonado (1h, 24h)
- `MR.1`, `MR.2` — reativação de "Aguardando cliente" (24h, 72h)

**NÃO PRECISAM** (todas as demais — o cliente já iniciou conversa nas últimas 24h):
- `M0.1`, `M0.3` (entrada)
- `H.1-A/B` até `H.6-A/B` (handoffs, em resposta imediata)
- `MA.0`, `MA.1`, `MA1.1`, `MA1.2`, `MA2.*`, `MA3.1`, `MA4.1`, `MA5.1` (Trilha A dentro da janela)
- `MB.0`, `MB.1`, `MB.2`, `MB.3`, `B3.col`, `B4.col`, `B5.col`, `B6.col`, `MB7.*` (Trilha B dentro da janela)

---

## Submissão via API Kommo

Endpoint: `POST /api/v4/templates/moderate` (checar doc oficial:
`developers.kommo.com/reference/submit-a-whatsapp-template-for-moderation`).

Alternativa: submeter via UI Kommo → Settings → Chats → WhatsApp → Templates.
Mais confiável para primeira submissão (a UI faz a tradução para o formato Meta).

---

## Os 7 templates prontos para submissão

### 1. `rosie_carrinho_followup_2h` (MA5.2) — MARKETING

**Categoria Meta:** MARKETING
**Idioma:** pt_BR
**Body:**
```
Oi, {{1}}! Seu carrinho ainda tá te esperando 💛
👉 {{2}}
Ficou com alguma dúvida?
```
**Variáveis:**
- `{{1}}` = `{contact.first_name}` (nome do lead)
- `{{2}}` = `{lead.custom_field.link_carrinho}` (link Nuvemshop)

**Disparo:** AUT-07 (2h após envio do link em MA5.1). Card em Pipeline 1 · Carrinho enviado.

---

### 2. `rosie_carrinho_followup_24h` (MA5.3) — MARKETING

**Categoria Meta:** MARKETING
**Idioma:** pt_BR
**Body:**
```
Oi, {{1}}! Passando só pra avisar: a {{2}} no tamanho {{3}} está com poucas unidades.
Se ainda quiser, seu carrinho continua aqui 👉 {{4}}
```
**Variáveis:**
- `{{1}}` = `{contact.first_name}`
- `{{2}}` = `{lead.custom_field.peca_interesse}`
- `{{3}}` = `{lead.custom_field.tamanho}`
- `{{4}}` = `{lead.custom_field.link_carrinho}`

**Disparo:** AUT-07 (24h após envio).

---

### 3. `rosie_carrinho_followup_72h` (MA5.4) — MARKETING

**Categoria Meta:** MARKETING
**Idioma:** pt_BR
**Body:**
```
Oi, {{1}}! Não quero insistir 💛
Vou deixar seu carrinho salvo. Se mudar de ideia, é só me chamar — tô por aqui.
```
**Variáveis:**
- `{{1}}` = `{contact.first_name}`

**Disparo:** AUT-07 (72h após envio, última tentativa). Depois: move para Perdido (AUT-08).

---

### 4. `rosie_recuperacao_1h` (MC.1) — MARKETING

**Categoria Meta:** MARKETING
**Idioma:** pt_BR
**Body:**
```
Oi, {{1}}! Vi que você deixou a {{2}} no carrinho lá na Rosie 💛
Ela ainda tá te esperando. Quer que eu te ajude a finalizar?
```
**Variáveis:**
- `{{1}}` = `{contact.first_name}` (vem do webhook Nuvemshop)
- `{{2}}` = `{lead.custom_field.peca_abandonada}` (vem do webhook)

**Disparo:** AUT-09 (1h após webhook `cart_abandoned` da Nuvemshop). Card em Pipeline 3.

---

### 5. `rosie_recuperacao_24h` (MC.2) — MARKETING

**Categoria Meta:** MARKETING
**Idioma:** pt_BR
**Body:**
```
Oi, {{1}}! Sua {{2}} ainda tá guardada ✨
Pra facilitar, separei {{3}} pra você fechar hoje: 👉 {{4}}
```
**Variáveis:**
- `{{1}}` = `{contact.first_name}`
- `{{2}}` = `{lead.custom_field.peca_abandonada}`
- `{{3}}` = "frete grátis" OU "cupom de X%" (a Rosie define semanalmente qual incentivo enviar; texto entra como variável para não precisar re-submeter template a cada mudança)
- `{{4}}` = `{lead.custom_field.link_carrinho}`

**Disparo:** AUT-09 (24h após carrinho abandonado, sem resposta ao MC.1). Se cliente responder → AUT-05 migra para Pipeline 1.

---

### 6. `rosie_reativacao_24h` (MR.1) — UTILITY

**Categoria Meta:** UTILITY (é uma transação em curso, não promoção)
**Idioma:** pt_BR
**Body:**
```
Oi, {{1}}! Ainda tô esperando {{2}} pra conseguir seguir com seu atendimento 💛
```
**Variáveis:**
- `{{1}}` = `{contact.first_name}`
- `{{2}}` = `{lead.custom_field.aguardando_o_que}` (ex.: "a foto do defeito", "o número do pedido")

**Disparo:** AUT-10 (24h após card entrar em "Aguardando cliente" sem resposta).

---

### 7. `rosie_reativacao_72h_encerrar` (MR.2) — UTILITY

**Categoria Meta:** UTILITY
**Idioma:** pt_BR
**Body:**
```
Oi, {{1}}! Como não consegui o que precisava, vou pausar seu atendimento por aqui.
Mas fica tranquila: é só me responder que a gente retoma na hora 💛
```
**Variáveis:**
- `{{1}}` = `{contact.first_name}`

**Disparo:** AUT-10 (72h sem resposta em "Aguardando cliente"). Move card para "Resolvido" (pausado).

---

## Checklist de submissão (Ronan roda na Onda 0)

- [ ] Passo 1: entrar em `rosie.kommo.com` → Settings → Chats → WhatsApp Business → Templates
- [ ] Passo 2: verificar que o canal WhatsApp Business API está conectado (WABA + phone_number_id ativos)
- [ ] Passo 3: criar cada um dos 7 templates acima, colando o body exato, marcando categoria correta
- [ ] Passo 4: enviar cada um para moderação Meta
- [ ] Passo 5: registrar no log:
  ```
  2026-07-25 09:XX | Ronan | rosie_carrinho_followup_2h → submitted
  ...
  ```
- [ ] Passo 6: acompanhar status ao longo de 24-48h. Meta aprova/rejeita cada um separadamente.
- [ ] Passo 7: se algum for rejeitado, ajustar (Meta explica o motivo) e re-submeter.
- [ ] Passo 8: quando todos aprovados, marcar Onda 0 · templates ✅.

## Cuidados de conteúdo (Meta rejeita se…)

- ❌ Excesso de emojis (limite ~2 por template)
- ❌ Ameaça de escassez ("última chance!", "só hoje!")
- ❌ Todas as letras maiúsculas
- ❌ Link encurtado (bit.ly etc.) — usar link direto Nuvemshop
- ❌ Placeholder mal formatado (`{{ 1 }}` com espaço → rejeita; usar `{{1}}` sem espaço)
- ❌ Body vazio ou só variáveis (Meta precisa entender o contexto)

Os 7 textos acima já foram construídos evitando esses armadilhas.

---

## Após aprovação

Cada template aprovado ganha um `template_id` interno da Kommo. Registrar em:
`/kolden/prod/KOMMO_ROSIE_TEMPLATE_MA5_2` = `<id>` etc. (opcional, só se formos disparar via API direta e não pela automação nativa).

Como o disparo será via Digital Pipeline + Chats API amojo (Onda 3), a Kommo já
resolve o `template_id` internamente quando referenciarmos pelo nome.
