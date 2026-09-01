---
tipo: diagnostico-tecnico
projeto: rosie
tema: nuvemshop-recife
capturado_em: 2026-08-18
severidade: alta
status: raiz-identificada
---

# Diagnóstico — Carrinho e deep-link de checkout da Loja Rosie

## Resumo executivo

A Loja Rosie usa o tema **Recife** (legacy) da Nuvemshop, que implementa o carrinho **inteiramente no cliente** (JS + drawer/mini-cart AJAX). Consequência: **não há página `/carrinho` server-rendered** e **os deep-links padrão da Nuvemshop para pré-adicionar produto ao carrinho não funcionam** nesta loja. O único caminho hoje é o botão "Comprar" da PDP (página do produto), que dispara `POST /comprar/` via AJAX.

Isso quebra qualquer estratégia que dependa de link direto para carrinho/checkout — anúncios one-click, WhatsApp com link "já com produto no carrinho", automação Kommo/RD com botão "retomar compra", etc.

---

## Evidências (testes ao vivo — Firecrawl 2026-08-18)

Testadas 4 URLs distintas com produto real (`variant_id=1501722537` — Regata Clássica Paetê M, estoque 30):

| URL testada | HTTP | Comportamento |
|-------------|------|---------------|
| `/carrinho` | **404** | Página de erro dentro do layout do tema |
| `/carrinho/agregar?variant_id=1501722537&quantity=1` | **404** | Idem |
| `/comprar/1501722537` (GET path) | **404** | Idem |
| `/checkout` | **404** | Idem |
| `/?add_to_cart=1501722537` | **200** | Home carrega normal; **JS do tema ignora o parâmetro** — confirmado pelo Ronan em navegador real (2026-08-18): nada é adicionado ao carrinho |

Todas as rotas 404 retornam 404 **também no header HTTP**, não só visualmente. Isso confirma que **o roteamento server-side não conhece essas URLs** — não é redirecionamento, não é overlay, é ausência de rota.

---

## Prova documental — form real do botão "Comprar"

Extraído do HTML da PDP `https://www.rosieiadoreyou.com.br/produtos/calca-reta-jeans-claro/`:

```html
<form action="https://www.rosieiadoreyou.com.br/comprar/"
      method="post"
      class="js-ajax-cart-panel h-100 "
      data-store="cart-form">

<form id="product_form"
      class="js-product-form mt-4"
      method="post"
      action="https://www.rosieiadoreyou.com.br/comprar/"
      data-store="product-form-345033559">
```

- **Endpoint real:** `/comprar/`
- **Método:** POST (não GET)
- **Classes JS:** `js-ajax-cart-panel`, `js-product-form` — confirma que o submit é interceptado por JavaScript AJAX
- **Atributo `data-store="cart-form"`** — indica handler JS custom que atualiza o drawer sem navegação

Ou seja: o botão "Comprar" nunca navega o browser para outra URL. Ele faz uma requisição AJAX em background e o tema atualiza o mini-cart em um drawer lateral. **Não há como reproduzir isso por link GET.**

---

## Confirmação do tema Recife

- Assets do tema em `acdn-us.mitiendanube.com/stores/007/249/579/themes/recife/...` (banners, logos)
- ID da loja Nuvemshop: **007249579**
- Nenhum link de menu aponta para `/carrinho` — todos os "Ver carrinho" no header/menu são âncoras (`href="#"`), o que reforça que a página não existe (nem o próprio tema linka pra ela)

---

## Crawl completo — inventário (42 URLs, todas 200)

Estrutura da loja mapeada:

- **Institucionais:** home, quem-somos, contato, trocas-e-devolucoes, politica-de-privacidade
- **Coleções pais:** sale, novidades, classicos, roupas1, jeans, acessorios
- **Coleções filhas:** classicos/{regatas,shorts1,camisetas1,calcas1}, roupas1/{camisetas2,calcas2,regatas1,shorts2,praia,jaquetas}, acessorios/faixas-headbands
- **18 produtos ativos** em `/produtos/{slug}/`
- **Sitemap XML** funcional
- **Zero páginas de checkout/carrinho** — nem no sitemap, nem em links de menu, nem em conteúdo

Cada uma das 42 páginas foi salva em `_crawl-2026-08-18/paginas/*.md` (com frontmatter YAML). Índice completo em `_crawl-2026-08-18/INDICE.md`.

---

## Descartes explícitos

Investiguei e descartei — **não são causa** do problema:

1. **Checkout externo (Olist / CartPanda / Yampi / AppMax):** zero ocorrência de strings `Olist`, `checkout_mode`, `checkout_url`, `checkout_domain`, `LS.checkout` no HTML de nenhuma das 42 páginas. As 36 menções a `nuvem-pago` são apenas âncoras de parcelamento em PDPs (`#installment_nuvem-pago`) — indicam Nuvem Pago habilitado como gateway, comportamento padrão. Checkout é nativo Nuvemshop.

2. **Placeholder `{ID_DA_VARIACAO}` literal:** eu havia dado essa URL como template para o Ronan substituir. Mesmo com o ID real (`1501722537`), o endpoint continua retornando 404. Não era erro de substituição — era rota inexistente.

3. **Tema custom com JS quebrado:** o JS funciona (o botão "Comprar" ao vivo abre o drawer). O problema é **de design**: o tema Recife nunca teve página `/carrinho` server-side.

---

## Causa raiz

**O tema Recife da Nuvemshop, na versão instalada na Rosie, não implementa as rotas nativas `/carrinho`, `/carrinho/agregar`, `/comprar/{id}` (GET) e `/checkout`.**

Isso não é um bug de config — é uma decisão de arquitetura do tema. Ele foi construído para ser 100% single-page-like no client: o carrinho vive só na memória do navegador (localStorage/cookie da Nuvemshop), o mini-cart é sempre um drawer, e o checkout só é atingido via clique no botão "Finalizar" do drawer, que redireciona para o domínio de checkout hospedado da Nuvemshop.

Consequência operacional: **é impossível gerar um link estático que já adicione produto ao carrinho** nessa loja com o tema atual.

---

## O que **funciona** hoje

1. **Link direto do produto:** `https://www.rosieiadoreyou.com.br/produtos/{slug}/` — abre a PDP, cliente escolhe variação, clica "Comprar", drawer abre, cliente finaliza. Fluxo humano completo, mas sem pré-preencher.

2. ~~**Query string `?add_to_cart=X`**~~ — **descartado 2026-08-18** pelo Ronan em navegador real: a home carrega mas o JS do tema não processa o parâmetro. Nenhum item é adicionado ao carrinho. **Conclusão definitiva: não existe deep-link funcional para pré-popular carrinho na Rosie com o tema Recife atual.**
