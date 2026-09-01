---
tipo: registro
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/Kommo/ferramentas]]"
---

# Onda 1 — Resultado da execução (2026-07-23 22:25 BRT)

Modo: **LIVE** (irreversível). Token JWT ainda o original (rotação pendente).
Log completo: `infra/hermes-middleware/logs/rosie-onda1-live.log`.

## O que foi feito

### ✅ 12 custom fields criados em leads

```
#2053238 Nº Pedido Nuvemshop         (text)
#2053240 CPF                          (text)
#2053242 E-mail da compra             (text)
#2053244 Data aproximada da compra    (date)
#2053246 E-mail (lead)                (text)
#2053248 Como conheceu a loja         (select, 5 opções)
#2053250 Peça de interesse            (text)
#2053252 Tamanho                      (text)
#2053254 Cor                          (text)
#2053256 Motivo do contato            (select, 9 opções)
#2053258 Titular da compra            (select, 2 opções)
#2053260 Valor aproximado do carrinho (numeric)
```

Total após Onda 1: **35 custom fields** (23 originais + 12 novos).

### ✅ 9 tags criadas em leads

```
#149802 venda
#149804 pos-venda
#149806 troca
#149808 defeito
#149810 devolucao
#149812 cancelamento
#149814 lista-reposicao
#149816 carrinho-abandonado
#149818 aguardando-transportadora
```

Total após Onda 1: **10 tags** (1 legada `importacao-2026-05-04` + 9 novas).

### ✅ Pipeline Vendas refatorado

- **Renomeado** stage #108316691: `Carrinho Enviado` → `Carrinho enviado / aguardando pagamento`
- **Não deletada** stage `Incoming leads` (tem 187 leads — ver §Pendências)

### ⊘ Pipeline Pós-Venda — refactor parcial

- Stage `Incoming leads` (#109409499) **não pôde ser deletada via API** (`NotSupportedChoice` — Kommo protege stages sistema). Fica assim. Se o Ronan quiser tirar, precisa via UI.
- Stage `Perdido` (#143) é sistema — mantida (Kommo mostra "Perdido" na UI PT-BR).

### ✅ Pipeline Recuperação renomeado

- `Funil de Recuperação` → `Recuperação / Logística` (95 leads preservados).

### ✅ Pipeline "Carrinho Abandonado" criado — id=**14171967**

```
#109412467 Incoming leads       [sys, gerado automaticamente pelo Kommo]
#109412471 Carrinho abandonado  azul claro
#109412475 Abordado             amarelo
#109412479 Reengajou            verde claro
#142       Closed - won         [sys, Kommo mostra "Ganho" na UI PT-BR]
#143       Closed - lost        [sys, Kommo mostra "Perdido" na UI PT-BR]
```

### ✅ 3 pipelines `[TESTE]` sombreados criados

- **`[TESTE] Vendas`** — id=14171979
- **`[TESTE] Carrinho Abandonado`** — id=14171987
- **`[TESTE] Pos-venda`** — id=14171991 (sem acento — Ronan renomeia via UI depois se quiser)

## Pendências humanas (Ronan / Gabrielas)

### 1. Triagem dos 187 leads em `Incoming leads` (Pipeline Vendas)

CSV completo: `sobre-a-empresa/Projetos/Ativos/rosie/kommo-build-2026-07/leads-incoming-vendas-2026-07-23.csv`.

Distribuição:
- **96 leads "Order XXX"** — pedidos Nuvemshop empilhados (integração nativa cria em Incoming). São pedidos reais de e-commerce.
- **91 leads "Lead #XXX"** — genéricos, provavelmente importação legado sem nome de contato.
- Idade: 3 (< 7d), 149 (7-30d), 35 (30-90d), 0 (>90d).
- **Responsável: 100% no user #15509887 (marketing@rosieiadoreyou.com — Rosie)**.

**Ação sugerida às Gabrielas:**
- Passar os "Order XXX" para `Novo lead` ou `Qualificado` (é pedido real Nuvemshop, tem dado).
- Analisar os "Lead #XXX" caso a caso — pode ser legado morto (marcar Perdido) ou lead válido.

**Prevenção:** o Salesbot (Onda 2) e as automações (Onda 3) vão colocar novos leads direto em `Novo lead` (não Incoming). O acúmulo para de crescer.

### 2. Renomear stages 142/143 do novo Pipeline "Carrinho Abandonado" via UI

Kommo API não permite (stages sistema, `is_editable: False`). Via UI Kommo → Editar pipeline → clicar em cada stage → renomear:
- `Closed - won` → `Recuperado`
- `Closed - lost` → `Perdido`

(A UI PT-BR já traduz automaticamente para "Ganho/Perdido" mas ficam mais claros se renomeados.)

### 3. Renomear `[TESTE] Pos-venda` → `[TESTE] Pós-venda` (opcional)

Via UI Kommo (o encoding de acento em POST direto via curl não passou; PATCH via UI resolve).

### 4. Configurar `Incoming leads on/off` por pipeline via UI

Pipelines novos vieram com `is_unsorted_on: true` (Kommo auto-manda leads não classificados pra lá). Nos pipelines `[TESTE]` deixei `false`.

Nos pipelines de produção, avaliar:
- **Vendas** (`unsorted=False` atualmente) — manter false, para AUT-01 do bot criar direto em "Novo lead".
- **Pós-venda** (`unsorted=False`) — manter false.
- **Recuperação/Logística** (`unsorted=True` atualmente) — provavelmente ok, mas ver com Gabrielas.
- **Carrinho Abandonado** (`unsorted=True`) — manter true (webhook Nuvemshop → unsorted → AUT-09 do bot cria card).

## Gotchas descobertas na execução

| Gotcha | Impacto | Documentado em |
|--------|---------|----------------|
| Nomes de stages via API vêm em EN mesmo com conta PT (UI faz i18n) | Script precisa cobrir `Incoming leads` **e** `Etapa de leads de entrada` | bootstrap-onda1.ts |
| Cores de stage vêm de paleta tabelada Kommo — hex fora dela dá 400 | Cores válidas nesta conta: `#c1c1c1 #fffeb2 #98cbff #87f2c0 #CCFF66 #D5D8DB #99ccff #ffff99 #ffcc66` | rosie-conta-atual.md |
| `POST /leads/pipelines` exige `is_unsorted_on` (bool) — não é opcional | Script default = false; ajustar por pipeline | bootstrap-onda1.ts |
| Stages `is_editable: false` NÃO podem ser renomeadas/deletadas via API (`Incoming leads`, 142, 143) | Renomear via UI | rosie-conta-atual.md |
| Caractere `ó` no body JSON POST via curl dá "Invalid request data" | Ou usa arquivo `@body.json`, ou POST via Node fetch (funcionou), ou renomeia via PATCH depois | bootstrap-onda1.ts |

## Estado final da conta

- **7 pipelines** (4 produção + 3 teste sombreado)
- **35 custom fields** em leads
- **10 tags** em leads
- **2 webhooks** (Nuvemshop + RD Station — mantidos ativos)
- **3 admins** (Ronan, Bruno, Rosie)
- **1 catálogo** (Produtos — populado pela Nuvemshop)

Pronto para Onda 2 (construção do Salesbot na UI).
