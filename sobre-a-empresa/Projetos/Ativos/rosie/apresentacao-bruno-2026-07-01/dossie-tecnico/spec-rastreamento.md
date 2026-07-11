---
id: rosie-spec-rastreamento
titulo: "Rosie — Spec de rastreamento (Solomon como fonte primária; Meta CAPI + GA4 + Google Ads Enhanced Conversions como destinos)"
autor: peitho/pixel-specialist
squad: peitho
executivo: hefesto (co-owner apolo)
data: 2026-07-01
revisao: 2026-07-01 — v4 (Solomon volta a ser fonte primária após confirmação do Ronan)
missao: m-20260701-112935-rosie-90d
status: v4 — para revisão do Bruno e do time técnico da Rosie
depende_de: [F0 do contrato de missão — CVR/AOV real]
stack_primaria_tracking: Solomon (SDK web + API de pedidos) como fonte de verdade da jornada
destinos_server_side: Meta Conversions API, GA4 Measurement Protocol, Google Ads Enhanced Conversions, RD Station API — orquestrados por GTM server-side consumindo eventos Solomon
mcp_status: em construção (pré-Ritual do Caos aberto, Ronan escolheu prioridade ALTA 2026-07-01)
tipo: projeto
projeto: rosie
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/rosie/apresentacao-bruno-2026-07-01/README|README]]"
---

# Spec de Rastreamento — Rosie (Solomon como fonte primária + destinos server-side)

> Documento técnico para o time da Rosie (ou para Kolden/Hefesto) executar. Não é retrato do que existe hoje — é o alvo. Cada afirmação carrega tag `[VALIDADO]`, `[BENCHMARK — fonte]`, `[HIPÓTESE — validar em D+N]` ou `[PENDENTE]`.

> **Nota de versão v4 — 2026-07-01 (final):** Solomon volta ao papel de **primary tracking source** confirmado pelo Ronan (2026-07-01, "Confirmei a Solomon, vamos priorizar ela"). Histórico das versões:
> - **v1**: sem Solomon, arquitetura Nuvemshop→CAPI direto.
> - **v2**: Solomon como primary tracking source (após decisão do Ronan de tornar Solomon a ferramenta principal de rastreamento da Rosie).
> - **v3**: Solomon reposicionada como camada de gestão de links / UTM / rastreabilidade (após briefing v2 do deck usar linguagem "gestão de links" pra Rosie/Bruno).
> - **v4** (esta): reverte para **Solomon primary**. Deck v2 slide 9 também atualizado — apresenta Solomon como fonte central que coleta a jornada e distribui pra Meta, Google e GA4. A "gestão de links" e a "padronização de UTM" continuam sendo capacidades da Solomon, mas dentro do papel maior de fonte primária da jornada e atribuição multi-canal.
>
> **Motivação estratégica:** Ronan escolheu priorizar Solomon (construção do MCP em `Projetos/Rosie/mcp-solomon/`, deploy do SDK, atendimento estratégico). A stack padrão (Pixel + CAPI + GA4 + Google Ads) continua imprescindível — mas como **destino** que recebe da Solomon, não como fonte concorrente. Isso ganha: (a) fonte única de verdade para atribuição multi-canal (Solomon é neutra, vê Meta+Google+orgânico+direto+influencer), (b) soberania de dado (dados ficam na conta Rosie, não em plataforma de terceiro), (c) cookie server-side 365d de rastreabilidade longa. Perde: nada crítico — as plataformas continuam alimentadas via server-side com os eventos deduplicados.

## 1. Diagnóstico do que existe hoje

`[VALIDADO — briefing 2026-07-01]`:

- **Meta Pixel** instalado no site (Nuvemshop). Dispara `PageView` e provavelmente eventos padrão de e-commerce via integração nativa Nuvemshop↔Meta.
- **Google Ads** com tag global conectada à conta.
- **RD Station** em uso para e-mail (fluxos ativos: reativação; carrinho abandonado em construção).
- **GA4**: mencionado, status de configuração não confirmado. `[PENDENTE — auditar propriedade GA4 e streams]`.
- **Solomon**: `[VALIDADO — Ronan 2026-07-01]` cadastros confirmados:
  - `SOLOMON_TOKEN_API` (Live) em `/kolden/prod/SOLOMON_TOKEN_API` ✅
  - `SOLOMON_TOKEN_API` (Sandbox) em `/kolden/dev/SOLOMON_TOKEN_API` ✅
  - `SOLOMON_COMPANY_ID_ROSIE = caOEzYj1TqRM0r3nHrFP` ✅ (público — 20 caracteres — não é secret; também espelhado em `/kolden/prod/SOLOMON_COMPANY_ID_ROSIE` no Infisical para uso do MCP/SDK)
  - SDK web e ingestão de pedidos: **não implantados ainda** — deploy é a primeira ação da execução após aprovação do deck.

**Gap crítico** (o que a stack v4 resolve):

1. **CAPI ausente** — todo evento Meta passa só pelo browser. Em iOS 14.5+ com ATT recusado (maioria do tráfego iOS) e em contextos com ad-blocker, o Pixel perde de **30–60% dos eventos** `[BENCHMARK — Meta Business Help, "About the Conversions API" 2024]`. Sem CAPI: EMQ (Event Match Quality) baixo, CAC inflado, curva de aprendizado nunca fecha. **Este é o buraco mais caro hoje.**
2. **Sem deduplicação Pixel↔CAPI** — quando CAPI entrar, se não houver `event_id` compartilhado, a conversão conta em dobro.
3. **Sem GTM server-side** — hoje as tags estão hardcoded no tema Nuvemshop (ou via app), inflexível. Reescrever tag = tocar código do tema.
4. **GA4 e-commerce provavelmente sem `purchase` com `transaction_id` e `items[]`** — sem isso, não há relatório de produto, cohort ou funil confiável no lado Google.
5. **UTMs sem convenção** — RD Station, Meta Ads e Google Ads cada um com nomenclatura própria; a análise cross-canal quebra silenciosamente. **É aqui que Solomon entra como camada de padronização.**
6. **Zero rastreabilidade de link ponta a ponta** — hoje ninguém consegue responder "qual link/campanha/criativo gerou este pedido" com um único ID auditável. Cookie de plataforma expira em 7-90 dias dependendo do canal; sem uma camada própria, o histórico de longo prazo evapora.

## 2. Stack recomendada v4 — Solomon como fonte primária + destinos server-side

**Papéis (v4)**
- **Solomon = fonte primária de tracking**: SDK web na loja Nuvemshop dispara todos os eventos de jornada (`VIEW_PAGE`, `CONTENT_VIEW`, `ADD_TO_CART`, `INITIATE_CHECKOUT`, `ADD_*_INFO`, `CHECKOUT_COMPLETED`); API `POST /admin/v1/order` recebe pedidos server-side via webhook Nuvemshop; cookie server-side 365d mantém atribuição de longo prazo; painel Solomon mostra jornada multi-canal (Meta, Google, e-mail, orgânico, influencer, direto).
- **GTM server-side = distribuidor**: recebe eventos da Solomon (via API/webhook Solomon → Kolden ou consumindo o pixel Solomon) e distribui pros destinos com `event_id` compartilhado para dedup.
- **Meta CAPI, GA4 MP, Google Ads Enhanced Conversions = destinos**: cada plataforma recebe os eventos padronizados pra otimização de campanha. Não são fonte concorrente; são consumidores.
- **RD Station = destino**: contato + evento de compra sincronizados para cadência de e-mail.

### Diagrama textual (v4 — Solomon como fonte primária)

O diagrama abaixo é a arquitetura viva. O que mudou vs v3 é o **papel discursivo** e a **hierarquia de responsabilidade**: a Solomon agora é o oráculo do funil (fonte de verdade da atribuição), e os destinos server-side (Meta CAPI, GA4 MP, Google Ads Enhanced Conversions) são alimentados a partir dela via GTM Server ou webhook direto Solomon→destino.

```
                        ┌──────────────────────────────────────┐
                        │  Loja Rosie (Nuvemshop)              │
                        └───────────┬──────────────────────────┘
                                    │
        ┌───────────────────────────┼─────────────────────────────────────┐
        │                           │                                     │
        ▼                           ▼                                     ▼
┌──────────────────┐    ┌──────────────────────────┐         ┌────────────────────────┐
│ GTM Web          │    │ Solomon SDK web          │         │ Nuvemshop Webhook      │
│ (container)      │    │ (camada de link mgmt)    │         │ (order/paid, order/    │
│                  │    │                          │         │ created)               │
│ • Meta Pixel     │    │ • Cookie server-side     │         │                        │
│ • Google Ads tag │    │   365d de rastreabilidade│         │ orderId, items,        │
│ • GA4 gtag       │    │ • Captura UTM padronizado│         │ customer, UTMs, status │
│                  │    │ • Envia eventos p/       │         │                        │
│ event_id UUID    │    │   painel de atribuição   │         │                        │
│ compartilhado    │    │                          │         │                        │
└────────┬─────────┘    └──────────┬───────────────┘         └───────────┬────────────┘
         │                         │                                     │
         │                         │                                     │
         ▼                         │                                     ▼
┌────────────────────────┐         │                       ┌──────────────────────────┐
│ GTM Server             │◄────────┴──────── event_id ─────┤ GTM Server (mesmo)       │
│ (Cloudflare Workers    │                                 │ Recebe webhook,          │
│  ou Cloud Run)         │                                 │ dispara server-side      │
│                        │                                 │                          │
│ Recebe hits do GTM Web │                                 │                          │
│ + eventos de conversão │                                 │                          │
│ + webhook Nuvemshop    │                                 │                          │
│                        │                                 │                          │
│ Dispara em paralelo:   │                                 │                          │
│  → Meta CAPI (dedup    │                                 │                          │
│     por event_id)      │                                 │                          │
│  → GA4 Measurement     │                                 │                          │
│     Protocol           │                                 │                          │
│  → Google Ads          │                                 │                          │
│     Enhanced Conv.     │                                 │                          │
│  → Solomon API         │                                 │                          │
│     (POST /order)      │                                 │                          │
│  → RD Station API      │                                 │                          │
│     (evento compra)    │                                 │                          │
└────────────────────────┘                                 └──────────────────────────┘
```

### Tabela de componentes (v4)

| Camada | Ferramenta | Papel | Custo aproximado |
|---|---|---|---|
| **Fonte primária de tracking** | **Solomon (SDK web + API REST)** | **Coleta jornada + ingere pedidos + resolve atribuição multi-canal + fornece cookie server-side 365d + padroniza UTM ponta a ponta. É a fonte de verdade que alimenta todos os destinos.** | **Depende do plano contratado com Solomon (a confirmar com Bruno) `[PENDENTE]`** |
| Tag manager web | Google Tag Manager (web container) | Injeta Meta Pixel + Google Ads tag + GA4 gtag no navegador com `event_id` alinhado ao evento correspondente da Solomon | Gratuito |
| Tag manager server | GTM server-side em Cloudflare Workers ou Cloud Run | Consome eventos da Solomon + webhook Nuvemshop; distribui server-side para Meta CAPI + GA4 MP + Google Ads Enhanced Conversions + RD Station | `[BENCHMARK — CF Workers gratuito até 100k req/dia; Cloud Run ~US$5–15/mês em tráfego pequeno]` |
| Destino: Meta | Meta Pixel (client) + Meta Conversions API (server) | Recebe eventos padronizados pela Solomon, com `event_id` para dedup Pixel↔CAPI. Recupera 30-60% do sinal perdido em iOS/ad-blocker. | Gratuito (API Meta) |
| Destino: Google Ads | Google Ads tag + Enhanced Conversions | Recebe eventos + hash email/telefone dos compradores. Match de conversão pós-ITP. | Gratuito |
| Destino: GA4 | GA4 client + Measurement Protocol server | Analytics do Google recebendo mesmos eventos client + reforço server-side no `purchase` | Gratuito até 10M eventos/mês |
| Destino: RD Station | RD Station via API | Sincroniza contato + evento de compra, mantém contexto UTM na ficha do lead | Já contratado |
| **MCP Solomon (Kolden)** | **`Projetos/Rosie/mcp-solomon/` (em construção — pré-Ritual Caos, prioridade ALTA)** | **Expõe tools à frota Kolden: leitura do painel Solomon (eventos, atribuição, pedidos), ingestão programática, gestão de webhooks. Peitho/ads-analyst e pixel-specialist consomem direto do chat.** | **Interno Kolden — sem custo externo** |

**Papel real da Solomon nesta v4** (linguagem alinhada com slide 9 do deck ao Bruno):
- **Fonte primária da jornada**: Solomon SDK web na Nuvemshop dispara todos os eventos client-side (VIEW_PAGE → CHECKOUT_COMPLETED) e API `POST /admin/v1/order` recebe pedidos server-side via webhook Nuvemshop. Cookie server-side 365d mantém identidade de longo prazo. É onde Kolden e Rosie leem "o que aconteceu".
- **Distribuidora para destinos server-side**: cada evento coletado pela Solomon (ou casado com evento nativo do GTM Web) é replicado para Meta CAPI + GA4 MP + Google Ads Enhanced Conversions + RD Station via GTM Server, com `event_id` compartilhado. As plataformas de mídia paga **continuam alimentadas normalmente** — só que a fonte de verdade da atribuição é o painel Solomon, não o Meta Ads Manager isolado.
- **Padronização de UTM na origem**: a convenção da §4 é imposta via SDK Solomon + regra de negócio de "todo link novo tem UTMs preenchidos". Sem UTM padronizado, o painel de atribuição degrada.
- **Rastreabilidade ponta a ponta**: cookie server-side 365d resolve "usuário sumiu depois de 7 dias e voltou orgânico, quem ganha a atribuição?". Solomon liga o primeiro toque à compra final.

**Por que Solomon-first e não Meta-first**:
- Meta CAPI, GA4 MP e Google Ads Enhanced Conversions continuam **imprescindíveis** para alimentar os algoritmos das plataformas — mas cada um vê só o seu próprio ecossistema (Meta só vê Meta, Google só vê Google). Nenhum deles resolve atribuição multi-canal (Meta vs Google vs e-mail vs orgânico vs influencer).
- Solomon é a **única camada neutra** que vê a jornada inteira, tem cookie server-side 365d próprio e permite que a Rosie/Kolden respondam "de onde veio cada venda de verdade" sem depender do relatório enviesado de cada plataforma.
- **Soberania de dado**: eventos e pedidos ficam na conta Solomon da Rosie, não em plataforma de terceiro. Se a Rosie quiser migrar de plataforma amanhã, os dados vão junto.
- **Ronan confirmou 2026-07-01**: Solomon é a ferramenta primária de tracking. Deck v2 slide 9 comunica isso em linguagem simples de negócio ("uma fonte só pra saber de onde vem cada venda").

## 3. Eventos e-commerce mínimos (nomenclatura primária = GA4 recommended)

Nomenclatura primária no dossiê técnico = **eventos GA4 recommended** (padrão do ecossistema web). Cada evento carrega `event_id` (UUID gerado no browser) replicado no server-side para dedup em Meta CAPI e GA4 MP. A coluna "Solomon equivalente" mostra o mapeamento para quem for consultar o painel Solomon depois.

| GA4 (primário) | Meta Pixel/CAPI | Solomon equivalente | Gatilho | Parâmetros GA4 mínimos |
|---|---|---|---|---|
| `page_view` | `PageView` | `VIEW_PAGE` | Toda navegação | (automáticos) |
| `view_item` | `ViewContent` | `CONTENT_VIEW` | PDP carregada | `currency`, `value`, `items[]` (`item_id`, `item_name`, `price`) |
| `add_to_cart` | `AddToCart` | `ADD_TO_CART` | Botão Adicionar | `currency`, `value`, `items[]` (com `quantity`) |
| `begin_checkout` | `InitiateCheckout` | `INITIATE_CHECKOUT` | Entrada checkout Nuvemshop | `currency`, `value`, `items[]`, `coupon` (se houver) |
| `add_shipping_info` | `AddShippingInfo` | `ADD_SHIPPING_INFO` | Endereço preenchido | `currency`, `value`, `items[]`, `shipping_tier` |
| `add_payment_info` | `AddPaymentInfo` | `ADD_PAYMENT_INFO` | Forma de pagamento confirmada | `currency`, `value`, `items[]`, `payment_type` |
| `purchase` | `Purchase` | `CHECKOUT_COMPLETED` | Thank-you page (client) **+** webhook `order/paid` (server, fonte de verdade da conversão) | `transaction_id` (obrig.), `currency`, `value`, `items[]`, `tax`, `shipping`, `coupon` |

**Regra dura de `purchase` (o evento mais caro para errar)**:
- **`purchase` cliente-side** dispara ao carregar a thank-you page com `event_id` UUID e `transaction_id` = orderId da Nuvemshop.
- **`purchase` server-side** é enviado pelo GTM Server ao receber o webhook `order/paid` da Nuvemshop, com o **mesmo** `event_id` que foi gerado no browser (propagado via cookie ou payload da thank-you page) → dedup Pixel↔CAPI = conta 1x.
- **`POST /admin/v1/order`** da Solomon é chamado **em paralelo** pelo GTM Server ao receber o webhook, criando o pedido no painel Solomon com `orderId`, `customer`, `items`, UTMs e `userId` (do cookie server-side 365d Solomon). Isso fecha o loop de atribuição no painel Solomon.
- **Produtos** (via `POST /admin/v1/product`) devem ser sincronizados na criação/atualização do catálogo Nuvemshop — não é evento de tracking, é setup de catálogo para Solomon cruzar com jornada no painel.
- **Dedup Pixel↔CAPI (Meta)**: `event_id` do Meta = mesmo UUID gerado no browser. Sem isso, dobra.

Detalhes técnicos Solomon: ver [`Ferramentas/Solomon/docs/04-eventos-web.md`](../../../../sobre-a-empresa/Ferramentas/Solomon/docs/04-eventos-web.md), [`docs/03-eventos-conceitos.md`](../../../../sobre-a-empresa/Ferramentas/Solomon/docs/03-eventos-conceitos.md), [`docs/07-api-ingestion-orders.md`](../../../../sobre-a-empresa/Ferramentas/Solomon/docs/07-api-ingestion-orders.md).

## 4. UTMs padronizados

Estrutura fixa: `utm_source / utm_medium / utm_campaign / utm_content / utm_term`. Tudo em `lowercase-kebab-case`. Sem acento, sem espaço.

> **Nota Solomon**: a padronização de UTM abaixo é o que a Solomon consome pra montar o painel de atribuição — sem UTM consistente, o painel Solomon fica pobre e o algoritmo de atribuição multi-canal degrada. **Este é o principal ganho de negócio de ter Solomon no funil**: ela é a camada que impõe e valida a padronização em todas as campanhas rodando. Meta CAPI, GA4 e Google Ads também consomem esses mesmos UTMs em paralelo — o mesmo valor vai para todos os destinos.

| Canal | utm_source | utm_medium | utm_campaign | utm_content | utm_term |
|---|---|---|---|---|---|
| Meta Ads (Feed/Reels/Stories) | `facebook` ou `instagram` | `paid-social` | `<nome-campanha-conta>` (ex: `canelada-out26`) | `<criativo>-<variacao>` (ex: `carrossel-v2`) | `<publico>` (ex: `lookalike-1pct`) |
| Google Ads (Search) | `google` | `cpc` | `<nome-campanha-conta>` | `<ad-group>` | `{keyword}` (dinâmico) |
| Google Ads (PMax/Shopping) | `google` | `paid-shopping` | `<nome-campanha-conta>` | `pmax` ou `shopping` | — |
| E-mail RD Station | `rdstation` | `email` | `<nome-fluxo>` (ex: `reativacao-canelada`) | `<template>` (ex: `hero-a`) | — |
| Orgânico Instagram (link bio) | `instagram` | `organic-social` | `linkbio` | `<post-id>` ou `perfil` | — |
| Influencer / afiliada | `influencer` | `partnership` | `<nome-influencer>` | `<pauta>` | — |

**Google Ads**: manter auto-tagging (`gclid`) ligado — os UTMs manuais servem para Solomon, GA4 e RD Station verem a origem; o `gclid` é o que o Google Ads usa internamente para atribuição.

## 5. Como validar

1. **Meta Events Manager > Test Events**: gerar `event_id` de teste, verificar que browser e server chegam com o **mesmo** `event_id` e são deduplicados (contam 1x). Alvo de EMQ por evento: **`Purchase` ≥ 8/10, `ViewContent` ≥ 6/10** `[BENCHMARK — Meta Business Help, "Event Match Quality" 2024]`.
2. **GA4 > DebugView**: cada evento aparecendo com `items[]` populado + `event_id` alinhado. `purchase` com `transaction_id` único (sem duplicatas em relatório de 24h).
3. **Google Ads > Ferramentas > Conversões > Diagnóstico**: status **"Rastreamento ativo"** e Enhanced Conversions em **"Registro qualificado"** com `email` ou `phone_number` batendo.
4. **GTM Preview (web + server)**: cada tag dispara exatamente 1x por evento. Sem tag laranja/vermelha.
5. **RD Station**: contato de teste com compra fake precisa aparecer com estágio de funil atualizado + evento de compra no histórico + UTMs da campanha original preservados na ficha.
6. **Painel Solomon** (`[PENDENTE — URL do painel confirmar com Ronan]`): navegar o funil de teste e verificar que (a) todos os eventos chegam com UTM padronizado, (b) pedido de teste ingerido via API aparece com `orderId`, `customer`, `items`, UTMs corretos e atrelamento ao `user_id` do cookie 365d, (c) painel de atribuição multi-canal mostra a receita quebrada por canal com valores plausíveis. Processamento assíncrono — aguardar até **10 minutos** (docs Solomon).
7. **Auditoria de fumaça (10 compras reais)**: em D+30, 10 compras reais rastreadas ponta-a-ponta. Bater totais Meta ↔ GA4 ↔ Google Ads ↔ Solomon ↔ Nuvemshop. Diferença aceitável entre plataformas de mídia paga e Solomon = **≤10%** `[HIPÓTESE — calibrar em produção]`; diferença Solomon ↔ Nuvemshop = **0 pedidos** (reconciliação diária).
8. **Auditoria mensal** `[VALIDADO — princípio Peitho §core]`: rodar checklist acima todo dia 5 do mês. Rastreamento quebra silenciosamente (mudança de tema Nuvemshop, atualização de app, expira token, quota Solomon estourada).

## 6. Riscos

- **Deduplicação Pixel↔CAPI**: sem `event_id` compartilhado, conversão dobra e o algoritmo Meta otimiza cego. Mitigação: gerar UUID no browser, guardar em `dataLayer`, propagar ao server via cookie ou payload da thank-you page — reusar como `event_id` no Meta CAPI **e** como `alias` de correlação no Solomon.
- **Match Quality Meta**: sem `email`, `phone`, `first_name`, `last_name`, `city`, `state` hasheados (SHA-256) no `Purchase` CAPI, o Meta não liga a compra ao usuário que viu o anúncio → EMQ despenca, CAC infla. Mitigação: no checkout Nuvemshop, capturar e enviar hasheados via CAPI.
- **Iframe do checkout Nuvemshop**: o Meta Pixel e o Solomon SDK podem não conseguir ler o carrinho dentro do iframe do checkout. Mitigação: `postMessage` do iframe para a página pai; usar `begin_checkout` do parent com `items[]` extraído. `[PENDENTE — validar comportamento do checkout Nuvemshop atual]`.
- **Consent Mode / LGPD**: Rosie precisa de banner de consentimento (cookie de marketing vs. essencial). Sem consentimento, atribuição fica degradada em todas as plataformas. Mitigação: implementar Consent Mode v2 do Google + `consent_state` no evento CAPI + política de consent no SDK Solomon. `[PENDENTE — decisão jurídica sobre política de privacidade da Rosie]`.
- **Webhook Nuvemshop cai**: o `purchase` server-side não dispara → Meta CAPI perde a conversão e a Solomon fica sem o pedido. Mitigação: fila de retry no GTM Server (Cloud Run com Cloud Tasks, ou Cloudflare Queues) + reconciliação diária Solomon ↔ Nuvemshop (relatório de pedidos faltantes). `[HIPÓTESE — dimensionar em D+15]`.
- **`companyId` errado no SDK Solomon**: se o SDK for inicializado com `companyId` de outra loja (ex: sandbox de dev vazando para prod), eventos vão para o lugar errado no painel — sem alerta. Mitigação: `companyId` sempre vem de variável de ambiente injetada pelo Infisical (`SOLOMON_COMPANY_ID`), nunca hardcoded. (Menor impacto que na v2 — Solomon não é mais primary, então erro aqui não zera o funil, só degrada o painel de atribuição.)
- **API Key Solomon sandbox × live**: chaves não são intercambiáveis. Mitigação: dev do Kolden usa Sandbox (`/kolden/dev/SOLOMON_TOKEN_API`); produção da Rosie usa Live (`/kolden/prod/SOLOMON_TOKEN_API`). Nunca cruzar.
- **Processamento assíncrono Solomon (10 min)**: eventos e pedidos não aparecem em tempo real no painel Solomon. Mitigação: comunicar ao Bruno que o painel Solomon é near-real-time, não real-time (Meta/GA4/Google Ads têm suas próprias latências — Meta ~15min-24h, GA4 ~24-48h para relatórios estáveis). Para verificação instantânea Solomon, usar `debug: true` do SDK.
- **UTMs quebrando na Nuvemshop**: alguns temas Nuvemshop perdem UTMs entre página → checkout → thank-you. Mitigação: cookie próprio no site que persiste UTMs de primeiro toque, injetado no `dataLayer` do GTM. **Este é o problema que a camada Solomon foi comprada para resolver operacionalmente** (cookie 365d + padronização).
- **MCP Solomon ainda não existe**: enquanto o Ritual do Caos não completar, agentes Kolden não podem ler o painel Solomon via ferramenta. Mitigação de curto prazo: `curl` embrulhado em `infisical run` pelos agentes Peitho/ads-analyst para consultas ad-hoc.

## 7. Cronograma de implementação

**D+7 — GTM Web + Meta Pixel refinado + Google Ads Enhanced Conversions + Solomon SDK web**:
- GTM Web container publicado, absorvendo Meta Pixel + Google Ads tag + GA4 gtag.
- `event_id` UUID gerado no browser e propagado via `dataLayer` para todas as tags.
- Google Ads Enhanced Conversions ativo (email/telefone hasheados client-side).
- Solomon SDK web inicializado com `companyId` de produção via Infisical + `useTouchpoint: true`.
- Cookie server-side Solomon 365d gerado no primeiro `page_view`.
- Solomon dispara `VIEW_PAGE`, `CONTENT_VIEW`, `ADD_TO_CART`, `INITIATE_CHECKOUT`, `CHECKOUT_COMPLETED` client-side em paralelo às tags de mídia — **para painel de atribuição, não para algoritmo de mídia**.
- Validação em `debug: true` navegando o funil completo.

**D+15 — CAPI Meta + GA4 MP + Nuvemshop webhook → GTM Server**:
- GTM Server em Cloudflare Workers (ou Cloud Run) publicado.
- Meta Conversions API ativa via GTM Server, dedup por `event_id`.
- GA4 Measurement Protocol ativa para reforço server-side em `purchase`.
- Webhook Nuvemshop `order/paid` → GTM Server → dispara em paralelo: Meta CAPI + GA4 MP + Google Ads Enhanced (server-side complement) + Solomon `POST /admin/v1/order` + RD Station API.
- Sincronização inicial de catálogo Solomon (todos os produtos existentes → `POST /admin/v1/product`).
- F0 do contrato: `[BLOQUEANTE]` AOV real, CVR real, taxa de checkout Nuvemshop dos últimos 30d.

**D+21 — Painel Solomon operando + UTM padronizado em todas as campanhas + MCP Solomon v1 (via Caos)**:
- Painel Solomon consumindo os eventos + pedidos e devolvendo relatório de atribuição multi-canal com valores plausíveis.
- UTMs padronizados da §4 aplicados em todas as campanhas ativas (Meta Ads, Google Ads, RD Station, links de influencer, link bio).
- Ritual do Caos completa 9 fases (aprox 4-6 sessões dedicadas).
- MCP em `sobre-a-empresa/Projetos/Rosie/mcp-solomon/` com pelo menos as tools de leitura de eventos, criação de pedido e criação de produto ativas.
- Peitho/ads-analyst consegue puxar métricas Solomon direto pelo MCP no chat.

**D+30 — Consent Mode v2 + auditoria de fumaça 10 compras**:
- Consent Mode v2 implementado (se decisão jurídica sair a tempo).
- Auditoria de fumaça: 10 compras reais rastreadas ponta-a-ponta em Meta Events Manager + GA4 + Google Ads + Solomon + Nuvemshop, com totais batendo dentro da tolerância da §5.7.
- Dashboard Kolden consumindo Solomon via MCP.
- Reconciliação diária Solomon ↔ Nuvemshop (bater totais de pedidos).

**Responsáveis**: spec = Peitho/pixel-specialist (esta entrega). Execução = time técnico da Rosie **ou** Hefesto (Kolden) sob contrato adicional — decisão do Bruno. MCP Solomon = Caos + Hefesto.

## 8. Referências (Kolden)

- Manual Solomon: [`sobre-a-empresa/Ferramentas/Solomon/ferramentas.md`](../../../../sobre-a-empresa/Ferramentas/Solomon/ferramentas.md)
- Docs Solomon (mirror interno pt-BR): [`sobre-a-empresa/Ferramentas/Solomon/docs/`](../../../../sobre-a-empresa/Ferramentas/Solomon/docs/README.md)
- Índice mestre de ferramentas: [`sobre-a-empresa/Ferramentas/ferramentas.md`](../../../../sobre-a-empresa/Ferramentas/ferramentas.md)
- Pré-Ritual MCP Solomon (Caos): `~/.claude/plans/caos-mcp-solomon-<slug>.md` (em elaboração)
- Contrato de Missão: `Olimpo/contratos/missoes/m-20260701-112935-rosie-90d.yaml`
- Análise Solomon 30d (F0.1 resolvido): `~/.claude/plans/retomar-an-lise-da-nifty-ritchie.md` (2026-07-01)

---

## DELTA v4.1 · matriz de gap com dados Solomon reais (2026-07-01T22:00)

Trigger: análise Solomon 30d rodada via MCP oficial (`caOEzYj1TqRM0r3nHrFP`). Esta matriz atualiza a §7 do arquivo v4 original com o **estado observado real** de cada item da spec — não hipótese.

### §7 · Matriz de gap · estado real (Solomon 30d 2026-06-01→2026-07-01)

| Item da spec v4 §2 | Estado observado | Fonte | Gap crítico |
|---|---|---|---|
| **Solomon SDK web na Nuvemshop** | ✅ Ativo — `view_content` + `add_to_cart` + `purchase` disparando em PDPs | 2.034 VC em 7d, 216 ATC, 36 Purchase | Cobertura parcial: home (48% do tráfego pago) não dispara VC/IC; PDP não dispara IC |
| **Cookie server-side 365d** | ✅ Ativo | jornadas de 20 touchpoints e até 28 dias no painel | Nenhum |
| **Ingestão de pedidos** (`POST /admin/v1/order`) | ✅ Ativa | 119 pedidos aprovados / 137 totais aparecem no financial_summary | Reconciliação com Nuvemshop pendente (sem MCP Nuvemshop nesta sessão) |
| **Padronização UTM** | ⚠️ Parcial | `sem_atribuicao` = R$ 4.873 (8,8% receita, 12 pedidos); "Moda" genérico aparece | Aplicar convenção §4 nas campanhas ativas (Emporos/Peitho D+7) |
| **Meta CAPI dedup por `event_id`** | ❌ **NÃO CONFIRMADO** | Add Customer Info = 0 eventos indica canal server-side não ligado | Auditar Events Manager (EMQ). Bloqueante D+15 |
| **GTM Server (CF Workers/Cloud Run)** | ❌ Não implantado | não visível via Solomon | Cronograma spec D+15 |
| **GA4 Measurement Protocol server-side** | ❌ Não implantado | idem | idem D+15 |
| **Google Ads Enhanced Conversions** | ❌ Não implantado | idem | idem D+15 |
| **Add Customer Info** | ❌ **0 eventos em 7d** | Solomon funnel | Investigar: bug SDK **OU** etapa inexistente no fluxo Nuvemshop. Peitho/pixel-specialist auditar antes do GTM Server D+15 |
| **Initiate Checkout na entrada Nuvemshop** | ⚠️ Parcial (73 IC em 7d contra 216 ATC) | drop 66% ATC→IC | Iframe do checkout Nuvemshop provavelmente cortando eventos. Mitigação: postMessage (não implementada) |

### §7.1 · Métricas de saúde real do rastreamento (novo)

| Métrica | Valor Solomon 30d | Observação |
|---|---|---|
| ROAS agregado (paid_last_click + orgânico) | **10,56x** | narrativa forte para deck |
| ROAS pago Solomon linear | 4,18x | vs 12,54x na Meta API (superestimado) |
| MER (Marketing Efficiency Ratio) | 10,01% | R$ 5.547 de gasto / R$ 55.405 receita |
| CAC | **R$ 48,59** | bate 1:1 com CAC target Peitho R$ 55 M1 |
| Retenção M+1 (safra jun/26) | **0,97%** | alvo pós-fluxos e-mail = 5% |
| Sessões 7d | 4.745 | usuários únicos: 4.493 |
| CVR sessão→compra | **0,76%** | baseline pré-landing quick-win |
| Frequência iPhone (Meta ADV principal) | 5,63 | risco de fadiga criativa |
| iPhone % do spend Meta | **97,2%** | Advantage+ concentração extrema |

### §7.2 · Reconciliação a fazer

- **Solomon ↔ Nuvemshop** — dependente do MCP Nuvemshop subir (Caos priorizou; ETA D+7-14) OU relatório manual da Rosie.
- **Solomon ↔ Meta Events Manager (EMQ)** — auditar Purchase EMQ atual (alvo 8/10) via UI Events Manager. Peitho/pixel-specialist D+3.
- **Solomon ↔ GA4** — GA4 configurado? Se sim, comparar totais de purchase.

### §7.3 · Ordem de deploy revisada (bloqueantes reordenados por Solomon)

1. **D+7:** GTM Web + auditar SDK Solomon vs Nuvemshop checkout (por que `add_customer_info` está em zero?).
2. **D+15:** GTM Server + CAPI + GA4 MP + webhook Nuvemshop → Solomon (garantir dedup event_id).
3. **D+21:** Padronizar UTM em todas as campanhas ativas + link in bio + e-mail + influencer (elimina `sem_atribuicao` R$ 4.873).
4. **D+30:** Consent Mode v2 + auditoria de fumaça 10 compras (todos os destinos batendo dentro da tolerância §5.7).

**Assinatura DELTA v4.1:** Peitho/pixel-specialist @ 2026-07-01T22:00 · matriz de gap agora ancorada em Solomon 30d observado, não hipótese.
