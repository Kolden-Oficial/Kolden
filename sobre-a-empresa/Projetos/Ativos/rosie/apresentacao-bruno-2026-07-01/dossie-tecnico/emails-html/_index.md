---
id: rosie-emails-html-index
titulo: "Rosie — Índice dos 19 HTMLs (RD Station)"
resumo: "Mapa completo dos 19 arquivos HTML dos fluxos de e-mail Rosie prontos para colar no RD Station Marketing. Cada linha inclui: nome do arquivo (= nome sugerido da campanha no RD), assunto A/B, preview text, gatilho, timing, URL do CTA e tokens dinâmicos usados."
categoria: projeto
palavras-chave: [rosie, email-marketing, rd-station, html, deploy, template]
status: v1
atualizado-em: 2026-07-14
autor: "Squad Caliope"
relacionados:
  - ../fluxos-email-v3-voz-marca.md
  - ../fluxos-email.md
  - ./_template.html
  - ./_gerar-htmls.mjs
tipo: projeto
projeto: rosie
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
---

# Rosie — Índice dos 19 HTMLs (deploy RD Station)

Todos os 19 e-mails da v3 (voz da marca Rosie) em HTML pronto para colar no editor do RD Station Marketing.

## Arquivos nesta pasta

| Arquivo | Tipo | Descrição |
|---------|------|-----------|
| `_template.html` | Template mestre | Base HTML com paleta Rose #E6D2DC + Black #14100C, tipografia Marcellus/DM Sans, header/footer. Nunca é enviado, é o molde. |
| `_gerar-htmls.mjs` | Script | Regenera os 19 HTMLs a partir do template. `node _gerar-htmls.mjs`. |
| `_index.md` | Este arquivo | Mapa/índice para deploy. |
| `assets/logo-rosie.png` | Logotipo | Wordmark oficial da Rosie (600×215 px, extraído do manual p. 29). Referenciado por `./assets/logo-rosie.png` para preview local. **Ao subir no RD Station, trocar por URL absoluta** (ver §Deploy da logo). |
| `rosie-*.html` (×19) | E-mails | Um arquivo por e-mail, pronto pra colar no RD Station. |

## Deploy da logo (importante)

Os 19 HTMLs referenciam a logo por caminho relativo `./assets/logo-rosie.png`. Isso faz o **preview local** funcionar (abrir HTML no navegador mostra a logo direto). Mas caminho relativo **não funciona em e-mail enviado** — o cliente de e-mail não conhece o "./" do disco do Bruno.

**Antes de subir no RD Station:**

1. Hospedar `assets/logo-rosie.png` numa URL pública (opções, em ordem de preferência):
   - CDN da própria loja (ex.: `https://rosieiadoreyou.com.br/assets/email/logo-rosie.png`)
   - Bucket S3/RustFS Kolden (`https://cdn.kolden.com.br/rosie/logo-rosie.png`)
   - Upload direto na biblioteca de mídia do RD Station Marketing (o RD gera a URL)
2. No editor HTML de cada campanha do RD Station, fazer **find & replace** de `./assets/logo-rosie.png` pela URL absoluta escolhida.
3. Testar envio (envio-teste do RD) e checar se a logo aparece em Gmail/Apple Mail/Outlook.

Alternativa "1 clique": alterar a constante `URL_LOGO` no topo do `_gerar-htmls.mjs` para a URL absoluta e rodar `node _gerar-htmls.mjs` de novo. Os 19 HTMLs saem prontos.

## 🌐 Deploy público (Vercel)

Os 19 e-mails estão hospedados publicamente pra revisão da Cat/Bruno e pra servir a logo em URL absoluta:

**Galeria completa:** https://rosie-emails.vercel.app
**URL da logo pra usar no RD Station:** `https://rosie-emails.vercel.app/assets/logo-rosie.png`
**URLs individuais dos e-mails:** `https://rosie-emails.vercel.app/emails/{nome-do-arquivo}.html`
Exemplo: https://rosie-emails.vercel.app/emails/rosie-01-boasvindas-01-hello.html

**Como usar no RD Station:**
1. No editor HTML de cada campanha, cole o conteúdo do HTML local (`rosie-*.html`).
2. Faça find & replace de `./assets/logo-rosie.png` por `https://rosie-emails.vercel.app/assets/logo-rosie.png`.
3. Ou, alternativa mais elegante: use a opção **"Importar por URL"** do editor RD Station apontando pra `https://rosie-emails.vercel.app/emails/{nome-do-arquivo}.html` — o RD baixa o HTML pronto com logo absoluta.

**Como redeployar após mudança:** rodar `node emails-html/_montar-deploy.mjs` e depois `cd rosie-emails && vercel --prod --yes`.

## Conformidade com as regras do RD Station

Os 19 HTMLs foram produzidos seguindo as regras de importação HTML do RD Station Marketing:

- **Sem JavaScript.** Nenhum `<script>` no código.
- **Sem CSS externo.** Sem `<style>` no `<head>`, sem `class=`, sem `@import` de Google Fonts, sem `@media` queries. Toda formatação é **inline** (`style="..."` em cada elemento).
- **Sem `:hover`.** E-mail não tem estado hover.
- **Tabelas email-safe.** `<table role="presentation">` com `border="0"`, `cellpadding="0"`, `cellspacing="0"`. Nada de flexbox/grid.
- **Fontes de sistema.** Georgia (títulos) + Arial (corpo). O próprio Manual da Marca Rosie (p. 40) aceita Arial como fallback quando não há Marcellus/DM Sans, então isso é aderente ao brandbook.
- **Preheader** invisível inline (aparece ao lado do assunto em Gmail/Apple Mail/Outlook).
- **Cores hex** e **tamanhos px** em todos os estilos (nada de `rem`/`em`/`vh`).

Pode passar direto no importador de HTML do RD Station sem massagem.

## Como subir no RD Station Marketing

1. Criar as **listas e segmentações** (ver §4 das notas de execução em [`../fluxos-email-v3-voz-marca.md`](../fluxos-email-v3-voz-marca.md)):
   - `Novo lead — Rosie site` (evento) → dispara Fluxo 1
   - `Assinante ativa` (30d) → recebe Fluxo 2
   - `Cold 45d` → entra no Fluxo 5
   - `Compradora D+21` → recebe 4.4
   - `Reengajada` (tag) → volta pra ativa
2. Criar os **cupons na Nuvemshop**: `PRIMEIRA` (frete grátis, 7 dias) e `SEUFRETE` (frete grátis, 48h).
3. Criar as **integrações Nuvemshop → RD Station** para os eventos `Carrinho abandonado` e `Compra finalizada`.
4. Para cada e-mail abaixo:
   - Criar uma **Campanha** no RD Station com o mesmo nome do arquivo (ex.: `rosie-01-boasvindas-01-hello`).
   - Colar o **assunto A** (deixar B para teste posterior).
   - Colar o **preview text**.
   - Abrir o editor de HTML e **colar o conteúdo do arquivo**.
   - **Substituir os placeholders** `{{...}}` pelos tokens dinâmicos correspondentes do RD Station (ver tabela abaixo).
5. Montar os **4 fluxos de automação** no RD Station arrastando as campanhas na ordem indicada e configurando os gatilhos/esperas.

---

## Mapa completo — 19 e-mails

### Fluxo 1 — Boas-vindas (5 e-mails)
Gatilho de entrada: `Novo lead — Rosie site`.

| # | Arquivo | Assunto A | Espera | CTA |
|---|---------|-----------|--------|-----|
| 1.1 | `rosie-01-boasvindas-01-hello.html` | Oi. Aqui é a Rosie. | Imediato (+15min) | Ver o que tem no armário |
| 1.2 | `rosie-01-boasvindas-02-canelada.html` | A peça que quase ficou de fora | +24h | Conhecer a canelada |
| 1.3 | `rosie-01-boasvindas-03-jeans.html` | Um ano só nesse jeans | +24h | Ver os jeans |
| 1.4 | `rosie-01-boasvindas-04-troca.html` | Se não servir, a gente resolve | +24h | Explorar o armário |
| 1.5 | `rosie-01-boasvindas-05-mimo.html` | Um mimo pra você | +24h | Usar o cupom PRIMEIRA |

### Fluxo 2 — Nutrição semanal (4 e-mails escritos + 8 diretrizes)
Gatilho: agendamento semanal para a segmentação `Assinante ativa`. Terça, 10h.

| # | Arquivo | Assunto A | CTA |
|---|---------|-----------|-----|
| 2.1 | `rosie-02-nutricao-01-closet-enxuto.html` | O truque do closet enxuto | Ver as três coringas |
| 2.2 | `rosie-02-nutricao-02-statement-neon.html` | A peça mais estranha que eu já criei | Ver os statements |
| 2.3 | `rosie-02-nutricao-03-erro-so-basico.html` | O erro do "só básico" | Ver as novidades |
| 2.4 | `rosie-02-nutricao-04-aposentei-peca.html` | Aposentei uma peça essa semana | Ver a coleção atual |
| 2.5–2.12 | *(diretrizes)* | ver `../fluxos-email-v3-voz-marca.md` §Fluxo 2 | — |

### Fluxo 3 — Carrinho abandonado (3 e-mails)
Gatilho de entrada: evento `Carrinho abandonado` (Nuvemshop). Cortar quando `Compra finalizada`.

| # | Arquivo | Assunto A | Espera | CTA |
|---|---------|-----------|--------|-----|
| 3.1 | `rosie-03-carrinho-01-lembrete.html` | Você deixou uma coisa aqui | +1h | Voltar pro carrinho |
| 3.2 | `rosie-03-carrinho-02-provasocial.html` | Deixa eu te contar quem já tem essa peça | +24h | Fechar o pedido |
| 3.3 | `rosie-03-carrinho-03-fretegratis.html` | Última coisa que eu queria te dizer | +48h | Usar SEUFRETE no carrinho |

### Fluxo 4 — Pós-compra (4 e-mails)
Gatilho de entrada: evento `Compra finalizada` (Nuvemshop).

| # | Arquivo | Assunto A | Espera | CTA |
|---|---------|-----------|--------|-----|
| 4.1 | `rosie-04-poscompra-01-confirmacao.html` | Recebi o seu pedido | Imediato (+5min) | Acompanhar meu pedido |
| 4.2 | `rosie-04-poscompra-02-cuidados.html` | Antes de você abrir o pacote | +72h | Guia completo de cuidados |
| 4.3 | `rosie-04-poscompra-03-ugc.html` | Me manda uma foto? | +7d | Marcar no Instagram |
| 4.4 | `rosie-04-poscompra-04-crosssell.html` | Uma peça que combina com o que você já pegou | +21d | Ver a sugestão pro meu pedido |

### Fluxo 5 — Winback (3 e-mails)
Gatilho de entrada: segmentação `Cold 45d` (sem abertura ≥ 45 dias).

| # | Arquivo | Assunto A | Espera | CTA |
|---|---------|-----------|--------|-----|
| 5.1 | `rosie-05-winback-01-sumiu.html` | Sumiu ou eu que estou chata? | Imediato | Continuo na lista da Rosie |
| 5.2 | `rosie-05-winback-02-o-que-mudou.html` | O que aconteceu na Rosie desde que você sumiu | +7d | Dar uma olhada no armário |
| 5.3 | `rosie-05-winback-03-ultima-chamada.html` | Último e-mail meu | +7d | Quero ficar na lista |

---

## Placeholders a substituir por tokens RD Station

Ao colar cada HTML no editor do RD Station, procurar e substituir por tokens dinâmicos:

### Tokens de URL (todos os e-mails têm ao menos um)

| Placeholder no HTML | Ação no RD Station |
|---------------------|--------------------|
| `{{URL_HOME_LOJA}}` | URL fixa da home da loja Rosie |
| `{{URL_HOME_LOJA_COM_CUPOM}}` | Home com cupom `PRIMEIRA` pré-aplicado |
| `{{URL_PRODUTO_CANELADA}}` | URL do produto regata canelada |
| `{{URL_COLECAO_JEANS}}` | URL da coleção jeans |
| `{{URL_COLECAO_CLASSICOS}}` | URL da coleção clássicos |
| `{{URL_COLECAO_STATEMENT}}` | URL da coleção statement |
| `{{URL_COLECAO_NOVIDADES}}` | URL da coleção novidades |
| `{{URL_RETOMAR_CHECKOUT}}` | Token dinâmico Nuvemshop do carrinho |
| `{{URL_RETOMAR_CHECKOUT_CUPOM}}` | Carrinho com `SEUFRETE` pré-aplicado |
| `{{URL_STATUS_PEDIDO}}` | Token dinâmico Nuvemshop do status |
| `{{URL_GUIA_CUIDADOS}}` | URL fixa do guia de cuidados |
| `{{URL_PRODUTO_COMPLEMENTAR}}` | URL dinâmica de produto complementar (opcional: fixo) |
| `{{URL_INSTAGRAM_ROSIE}}` | `https://instagram.com/rosieiadoreyou` |
| `{{URL_WHATSAPP}}` | URL do WhatsApp de atendimento |
| `{{URL_REENGAJAMENTO}}` | Landing/tracker de reengajamento (aplica tag `Reengajada`) |
| `{{UNSUBSCRIBE}}` | Token padrão de descadastro do RD Station |
| `{{PREFERENCIAS}}` | Token padrão de central de preferências do RD |

### Tokens de conteúdo dinâmico (Carrinho abandonado — fluxo 3)

| Placeholder | Origem |
|-------------|--------|
| `{{NOME_DA_PECA}}` | Integração Nuvemshop — item do carrinho |
| `{{TAMANHO}}` | Integração Nuvemshop — variação do item |
| `{{PRECO}}` | Integração Nuvemshop — preço da unidade |
| `{{ESTOQUE}}` | Integração Nuvemshop — estoque da variação (opcional: fallback "pouquíssimas") |

### Tokens de conteúdo dinâmico (Pós-compra — fluxo 4)

| Placeholder | Origem |
|-------------|--------|
| `{{RESUMO_DO_PEDIDO}}` | Integração Nuvemshop — lista de itens do pedido |
| `{{VALOR}}` | Integração Nuvemshop — total do pedido |
| `{{ENDERECO_CURTO}}` | Integração Nuvemshop — cidade/UF |
| `{{CIDADE}}` | Integração Nuvemshop — cidade |
| `{{X}}` / `{{Y}}` | Faixa de prazo Nuvemshop por CEP |
| `{{PECA_COMPRADA}}` | Integração Nuvemshop — última peça (ou usar segmentação por categoria) |

---

## Placeholder textual pendente

- **`[PERSONA_VALIDAR]`** em `rosie-03-carrinho-02-provasocial.html`: substituir por sentimento validado após o Mom Test da Aletheia/Emporos. Enquanto isso, generalizar (ex.: "toda semana chega alguém contando que virou peça favorita").

---

## Preview local (opcional)

Para revisar visualmente antes do RD Station:

1. Abrir qualquer `rosie-*.html` no navegador (duplo-clique).
2. As fontes Marcellus e DM Sans são carregadas via Google Fonts — o preview reflete o visual real que chega na inbox de Gmail/Apple Mail. Outlook usa Georgia/Arial (fallback), o que é esperado.

## Regenerar os HTMLs

Se qualquer copy mudar em `../fluxos-email-v3-voz-marca.md`, atualizar o objeto correspondente em `_gerar-htmls.mjs` e rodar:

```powershell
node _gerar-htmls.mjs
```

Os 19 arquivos são reescritos idempotentemente.

---

**Assinado:** Cyrus (copy-chief) — orquestrador Caliope
**Data:** 2026-07-14
