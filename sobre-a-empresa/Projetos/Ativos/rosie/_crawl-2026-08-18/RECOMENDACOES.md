---
tipo: recomendacoes
projeto: rosie
depende_de: DIAGNOSTICO-CARRINHO.md
capturado_em: 2026-08-18
---

# Recomendações — corrigir carrinho / deep-link Rosie

## Teste `?add_to_cart` — **DESCARTADO** (2026-08-18)

Confirmado pelo Ronan em navegador real: o tema Recife **ignora** o parâmetro `?add_to_cart=X`. A home carrega mas nada é adicionado. Não existe deep-link funcional na loja atual.

## 4 caminhos para resolver

### 1. Trocar o tema (mais robusto, mais trabalho)

Os temas oficiais atuais da Nuvemshop (Amazonas, Bahia, Ceará, Pernambuco, Trend, Base) implementam a rota `/carrinho` nativa e suportam `/carrinho/agregar?variant_id=X&quantity=1` de forma consistente. Trocar por um tema oficial:

- **Prós:** deep-link funciona out-of-the-box, tema mantido pela Nuvemshop, ganha atualizações
- **Contras:** perde toda a customização visual do Recife (Rosie tem identidade forte — voz da marca já aplicada); reinstalação demanda revisão de todo o front-end
- **Custo:** dias de trabalho de re-configuração

### 2. Instalar o app "Botão de Compra" (rápido, funcional, feio)

A Nuvemshop tem um app oficial "Botão de Compra" que gera um botão embed adicionável em qualquer site externo. Ele adiciona ao carrinho remotamente e leva ao checkout nuvemshop.

- **Prós:** funciona hoje sem trocar tema; independe do tema Recife
- **Contras:** o "botão" gerado tem visual padrão Nuvemshop (não da marca); precisa hospedar o botão em uma LP externa

### 3. Customizar o tema Recife (contratar dev)

Reabilitar as rotas nativas dentro do próprio Recife — implementar `cart.tpl` no tema e mapear POST `/comprar/` para também aceitar GET `/carrinho/agregar`.

- **Prós:** mantém 100% da identidade visual; solução definitiva
- **Contras:** custo de dev; risco de quebrar o drawer atual; futuras atualizações do tema podem sobrescrever

### 4. Falar com o suporte Nuvemshop (grátis, incerto)

Abrir chamado descrevendo: "meu tema Recife retorna 404 em `/carrinho` e `/carrinho/agregar`. Preciso de deep-link para adicionar produto ao carrinho a partir de anúncios e WhatsApp. Existe alguma configuração para reabilitar essas rotas nativas?"

- **Prós:** grátis; pode ser flag simples do admin
- **Contras:** SLA lento; podem só sugerir troca de tema

---

## Workaround imediato para anúncios/WhatsApp/Kommo

Enquanto você decide qual caminho tomar acima, **use o link direto do produto**:

```
https://www.rosieiadoreyou.com.br/produtos/regata-classica-paete1/
https://www.rosieiadoreyou.com.br/produtos/calca-reta-jeans-claro/
https://www.rosieiadoreyou.com.br/produtos/calca-classica-canelada1/
```

Lista completa dos 18 produtos ativos no `INDICE.md`. Fluxo do cliente:

1. Clica no link (LP, WhatsApp, anúncio)
2. Cai na PDP com o produto já em destaque
3. Escolhe variação (cor/tamanho)
4. Clica "Comprar" — drawer abre com o item
5. Finaliza compra

Não é one-click, mas é o padrão que a loja suporta hoje. É o que os concorrentes de moda na Nuvemshop também fazem.

---

## Recomendação minha (Kolden) — atualizada 2026-08-18

Com `?add_to_cart` descartado, **ordem sugerida:**

1. **HOJE — Kolden atualiza LPs/anúncios/WhatsApp/Kommo para usar link direto do produto** (workaround). Zera o sangramento. Lista de 18 produtos com URL em `INDICE.md`.
2. **HOJE — Ronan verifica se há atualização do tema Recife disponível.** Na admin da Nuvemshop → Loja online → Temas → Recife → "Atualizar" (se aparecer). Versão mais nova do mesmo tema pode ter reabilitado as rotas nativas. 2 minutos. Se sim, testar novamente `/carrinho/agregar?variant_id=1501722537&quantity=1`.
3. **HOJE — Ronan abre chamado no suporte Nuvemshop.** Texto sugerido:
   > "Olá. Meu tema Recife retorna HTTP 404 em `/carrinho`, `/carrinho/agregar` e `/checkout`. Preciso de deep-link para adicionar produto ao carrinho a partir de anúncios pagos, WhatsApp e automações de e-mail (RD Station). Existe alguma configuração no admin para reabilitar essas rotas nativas do tema Recife, ou preciso trocar de tema? Store ID: 007249579."
   
   SLA típico Nuvemshop: 3-7 dias. Gratuito. Melhor cenário: flag admin. Pior cenário: eles confirmam que Recife não suporta e sugerem trocar tema.
4. **SE suporte disser "não tem jeito" — decisão executiva Ronan+Kolden:** trocar tema (Amazonas/Bahia/Ceará/Pernambuco/Base). É projeto grande — revisão de UX, mobile, brand, tracking (GA4/Meta Pixel/Enhanced Conversions), e-mails RD, salesbot Kommo. Encaixar no radar Kolden como iniciativa formal. Estimativa preliminar: 15-30 dias de squad focado, custo de retrabalho de tudo que depende do markup HTML atual.

**Não recomendo:**
- ~~Customizar o Recife~~ — gastar dev em tema legacy que vai ter que ser trocado mesmo
- ~~Botão de Compra oficial Nuvemshop~~ — só serve pra embed em site externo, não resolve deep-link para a própria Rosie
- ~~Esperar Nuvemshop resolver sozinho~~ — Recife é tema legado, provavelmente não vai receber correção

---

## Impacto para o cliente Rosie

- **Anúncios pagos:** perdendo eficiência de funil — cliente vindo de anúncio idealmente vai direto pro carrinho, não para PDP com 5 cliques até compra
- **Fluxos Kommo (salesbot Rosie v1):** o bot pode incluir CTA "clique aqui para finalizar sua compra" — hoje não tem link estável. Confirma se algum passo do salesbot usa deep-link de carrinho — se sim, marcar como bloqueio.
- **RD Station (fluxo Carrinho Abandonado, 3 e-mails):** provavelmente usa link nativo Nuvemshop de "retomar carrinho" (que é diferente de deep-link customizado — funciona via cookie). Confirmar no `dossie-tecnico/rd-station-configuracao.md`.
- **WhatsApp:** perde conversão — hoje quando o time manda "compra aqui!" com link, cliente cai no site sem contexto.

---

## Próximos passos concretos (atualizado 2026-08-18 após descarte de `?add_to_cart`)

- [x] ~~Ronan testa `?add_to_cart=X` no navegador~~ — falhou, tema ignora
- [ ] **Ronan hoje:** verifica se tema Recife tem atualização disponível no admin Nuvemshop
- [ ] **Ronan hoje:** abre chamado no suporte Nuvemshop com o texto sugerido acima (Store ID 007249579)
- [ ] **Kolden hoje:** atualiza LPs/anúncios/WhatsApp ativos para usar link direto de produto (lista em `INDICE.md`)
- [ ] **Kolden esta semana:** confirma se salesbot Rosie v1 e fluxos RD Station (especialmente Carrinho Abandonado) dependem de deep-link — se sim, marcar como bloqueio ativo
- [ ] **Ronan+Kolden em 7 dias:** avaliar resposta do suporte; se negativa, decidir formalmente troca de tema como iniciativa no radar Kolden
