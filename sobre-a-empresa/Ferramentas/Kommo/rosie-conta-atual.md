---
tipo: levantamento
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/Kommo/ferramentas]]"
---

# Rosie — estado atual da conta Kommo (levantamento 2026-07-23)

Snapshot forense antes de qualquer intervenção. Serve para (a) diff pós-Onda 1
comparando o que criamos vs. o que já existia; (b) rollback se necessário; (c)
docs base para as Gabrielas entenderem o "antes/depois".

## Meta

- **Subdomain:** `rosie.kommo.com`
- **Account ID:** 36679659
- **Criada em:** 2026-06-30
- **Idioma:** pt · **Moeda:** BRL · **País:** BR
- **amojo_id:** `141890a7-286c-4bf2-af0f-49f317014fba`
- **Drive URL:** `https://drive-c.kommo.com`
- **Kommo AI:** desativado

## Usuários (admins ativos)

| ID | Nome | Email | Notas |
|----|------|-------|-------|
| 10991863 | Ronan Sérgio Silva | adm@kolden.com.br | Kolden |
| 14984439 | Bruno Felice Vilas-Boas | bruno.vilasboas@grupoett.com.br | Contato B2B — dono/decisor da Rosie |
| 15509887 | Rosie | marketing@rosieiadoreyou.com | Conta técnica/marketing |

## Pipelines existentes (⚠️ diferentes do briefing)

### #14033351 · Funil de Vendas · **91 leads ativos**

Etapas atuais (nomes REAIS via API — a UI Kommo traduz "Incoming leads" para "Etapa de leads de entrada", mas na API é EN):
```
#108316527 · Incoming leads             · sort 10   · ⚠ TEM 91 LEADS
#108316683 · Novo lead                  · sort 20
#108316687 · Qualificado                · sort 30
#108316691 · Carrinho Enviado           · sort 40
#     142  · Pedido entregue – ganho    · sort 10000
#     143  · Pedido cancelado – perdido · sort 11000
```

Delta vs. briefing (Pipeline 1 · Vendas, 4 etapas):
- ⚠️ **"Incoming leads" TEM 91 LEADS** — antes de deletar essa stage, migrar os leads para "Novo lead" (ou motivo-de-perda apropriado). Revisão manual pelas Gabrielas.
- ✏️ **Renomear "Carrinho Enviado"** → "Carrinho enviado / aguardando pagamento" ✓ script bootstrap faz
- ✓ Ganho (142) e Perdido (143) mantidos como estão

**Alerta:** o script `bootstrap-onda1.ts` detecta que a stage "Incoming leads" tem leads e **pula o delete automaticamente** — reporta como ação manual pendente.

### #14171615 · Funil de Pós-Venda · **vazio**

Etapas atuais (nomes REAIS via API):
```
#109409499 · Incoming leads     · sort 10   · vazio
#109409503 · Novo Chamado       · sort 20
#109409507 · Com a Gente        · sort 30
#109409511 · Aguardando Cliente · sort 40
#     142  · Resolvido          · sort 10000
#     143  · Perdido            · sort 11000
```

Delta vs. briefing (Pipeline 2 · Pós-venda, 4 etapas):
- ✂️ **Suprimir "Etapa de leads de entrada"**
- ✂️ **Suprimir "Perdido"** (o briefing só tem Resolvido como terminal — resolvido é o único terminal explícito)
- ✓ Novo Chamado, Com a Gente, Aguardando Cliente, Resolvido mantidos

**Como está vazio, refactor é livre — sem risco de perder dado.**

### #14034623 · Funil de Recuperação · **95 leads ativos** (semantica DIFERENTE do briefing)

Etapas atuais:
```
#108327103 · Etapa de leads de entrada · sort 10
#108327107 · Pendente                  · sort 20
#108327111 · Pago                      · sort 30
#108327115 · Enviado                   · sort 40
#108327119 · Fechado                   · sort 50
#108327123 · Cancelado                 · sort 60
#     142  · Closed - won              · sort 10000
#     143  · Closed - lost             · sort 11000
```

**Este funil = pedidos pagos avançando na esteira logística. NÃO é carrinho abandonado.**

Decisão Fase 3 (Q1 híbrido):
- 🏷️ **RENOMEAR** para "Recuperação / Logística" (deixa claro que é esteira operacional, não carrinho)
- ✓ Manter todas as etapas atuais (95 leads dependem delas)
- ➕ **CRIAR NOVO** Pipeline "Carrinho Abandonado" com 5 etapas do briefing

## Custom fields em leads (23 existentes)

```
# 12 UTM/tracking (todos code = MAIÚSCULAS)
#666550 utm_content                type=tracking_data
#666552 utm_medium                 type=tracking_data
#666554 utm_campaign               type=tracking_data
#666556 utm_source                 type=tracking_data
#666558 utm_term                   type=tracking_data
#666560 utm_referrer               type=tracking_data
#666562 referrer                   type=tracking_data
#666564 gclientid                  type=tracking_data
#666566 gclid                      type=tracking_data
#666568 fbclid                     type=tracking_data
#666590 ttad_id                    type=tracking_data
#666592 ttad_name                  type=tracking_data

# 11 negócio (sem code)
#666726 Número de rastreamento    type=text
#666728 Endereço de entrega       type=text
#666730 Método de pagamento       type=select
#666732 Desconto                  type=select
#666734 Motivo de perda           type=select
#666736 Número do contrato        type=text
#666738 Data do contrato          type=date
#666740 Pagamento                 type=select
# … 3 outros não capturados no smoke inicial (paginação)
```

**Delta vs. planilha aba 2:** planilha pede 11 novos custom fields.
Comparando com os existentes:
- `Endereço de entrega` (666728) ≈ `CEP / endereço de entrega` do briefing → **REUSAR** (renomear/adicionar CEP)
- Os outros 10 são NOVOS.

Lista definitiva do que criar na Onda 1:
1. `Nº Pedido Nuvemshop` (text)
2. `CPF` (text)
3. `E-mail da compra` (text)
4. `Data aproximada da compra` (date)
5. `E-mail (lead)` (text)
6. `Como conheceu a loja` (select: Instagram/TikTok/Indicação/Google/Outro)
7. `Peça de interesse` (text)
8. `Tamanho` (text)
9. `Cor` (text)
10. `Motivo do contato` (select — valores do briefing)
11. `Titular da compra` (select: Própria / Outra pessoa)
12. `Valor aproximado do carrinho` (numeric)

## Custom fields em contacts (5 existentes)

```
#666540 Posição                 type=text        code=POSITION
#666542 Telefone                type=multitext   code=PHONE
#666544 O email                 type=multitext   code=EMAIL
#678302 Tiendanube user ID      type=text        code=NUVEMSHOP_USER_ID
#678304 Token do pedido         type=text        code=NUVEMSHOP_ORDER_TOKEN
```

**⭐ Insight:** `NUVEMSHOP_USER_ID` e `NUVEMSHOP_ORDER_TOKEN` são gravados pela
integração nativa Nuvemshop → utilizáveis pelo Salesbot na Trilha B para
identificar o pedido sem pedir número novamente (quando o cliente já é conhecido).

## Tags em leads

- **Só 1 tag existe:** `#36256 importacao-2026-05-04-09:37:16` (sinal de que
  importaram leads legados de outro sistema).
- **Zero conflito** com as 9 tags do briefing — criação livre.

## Catálogo de produtos

- **#23464 · "Produtos"** · type=products
- Populado pelo widget Nuvemshop (integração nativa).
- **Utilidade:** consultar via `/api/v4/catalogs/23464/elements` para validar se
  uma peça existe no catálogo (útil para futuro; escopo removido da Onda 4).

## Webhooks ativos

```
#47388979 → https://nuvemshop.kommo.com/v1/crm/webhook/unsorted
           events: [add_unsorted]
           disabled: False
#47391511 → https://rdstation.amocrm.com/amocrm/webhook/…
           events: [status_lead]
           disabled: False
```

**Ambos ativos e em produção.** Não mexer sem plano.

## Endpoints indisponíveis nesta versão/plano

- `GET /salesbots` → 404 (endpoint só liberado abr/2026, exige plano Pro+)
- `GET /templates` → 404 (idem)

**Consequência:** Salesbot e Templates configurados via UI, não via API.

## Sources (fontes)

Vazio via API. Nuvemshop e RD Station chegam como **webhook payloads** para
`add_unsorted`, não como `sources` estruturadas.

## Fontes desses dados

Levantamento por chamadas curl às 22:30 de 2026-07-23, com o token JWT válido
(`iat=1784852166`, `exp=1942531200`) e scopes `crm+files+list_external_messages+send_external_messages+notifications+push_notifications`.

Comandos executados (para reprodutibilidade):
```
GET /api/v4/account?with=amojo_id,version,drive_url
GET /api/v4/users
GET /api/v4/leads/pipelines
GET /api/v4/leads/custom_fields
GET /api/v4/leads/tags?limit=100
GET /api/v4/contacts/custom_fields?limit=50
GET /api/v4/catalogs
GET /api/v4/webhooks
GET /api/v4/sources
GET /api/v4/leads?filter[pipeline_id]=<ID>&limit=250
```
