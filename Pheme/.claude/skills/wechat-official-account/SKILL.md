---
name: wechat-official-account
description: >
  Estratégia de conteúdo + automação + conversão para o WeChat Official Account (OA,
  公众号) e a fronteira com Video Channels (视频号) e Mini Program. Use quando o pedido
  envolver "WeChat OA", "微信公众号", "content marketing na China via WeChat",
  "subscription vs service account", "Video Channels 视频号", "conversão via WeChat"
  ou brand hub na China. Cobre a distinção OA vs Video Channels (canais irmãos com
  algoritmos opostos), estrutura editorial da OA (long-form + short-form), automação
  (auto-reply + menu + subscription message) e o funil OA → Mini Program → private
  domain. NÃO substitui `wecom-private-domain` (essa é CRM operacional B2C).
metadata:
  type: reference
---

# WeChat OA + Video Channels + Mini Program — o brand hub chinês

WeChat é o super-app com 1.3B MAU. Marca séria na China precisa OA + Video Channels +
Mini Program orquestrados. OA é o "blog + newsletter + hub" — não morreu (apesar de queda
de open rate), continua sendo o **canal de autoridade e SEO da busca WeChat**.

## Passo 1 — OA: Subscription vs Service (escolha estrutural)

O tipo de OA determina tudo: cadência, template de mensagem, capacidade de push.

| Tipo | Cadência | Push notifications | Casos ideais |
|---|---|---|---|
| **Subscription (订阅号)** | 1 broadcast/dia (para PJ; múltiplos posts por broadcast) | Empurrado para "Subscription folder" (não interrupt) | Media, content brand, thought leadership |
| **Service (服务号)** | 4 broadcasts/mês | Empurrado para chat list (interrupt, alto engagement) | E-commerce, marca de produto, service |
| **Enterprise (企业号)** | Descontinuado; migrou para WeCom | — | (não usar mais) |

**Regra prática:** marca com produto + conversão → Service (menos frequência, mais
impacto). Media/thought leader → Subscription (frequência diária).

## Passo 2 — Anatomia do post editorial (long-form)

O padrão-ouro de OA post é longo (2.000-4.000 caracteres = ~800-1.600 palavras
equivalentes) com foto, com estrutura clara:

- **Título (标题)** — ≤ 30 caracteres, formato "número + pergunta + prova" costuma
  funcionar. Ex.: "5 erros que 90% das marcas cometem em Xiaohongshu (e como corrigir)".
- **Cover (封面)** — 900×500 principal + 200×200 secundária. Dense em texto, cor saturada.
- **Preview text (摘要)** — 54 chars aparecem no notification; use hook, não resumo.
- **Header brand hero** — imagem 900×300 com título + KV.
- **Corpo** — subtítulos H2 espaçados, imagens a cada 300-500 chars, aspas destacadas em
  cor de marca, listas numeradas.
- **CTA blocks** — 2-3 caixas com CTA (subscribe, Mini Program, WeCom scan).
- **Footer brand** — sobre a marca + tag "关注公众号 X" + assinatura.

## Passo 3 — Automação: menu + auto-reply + subscription message

Sem automação, OA é blog. Com automação, vira hub.

- **Menu (自定义菜单)** — 3 abas principais × até 5 sub-itens = 15 pontos de entrada.
  Padrão: "About / Products / Contact" ou "Mais Recente / Loja / Comunidade".
- **Keyword auto-reply (关键词回复)** — usuário digita "cupom" → OA responde com QR do
  desconto. Fluxo mais barato de conversão.
- **First-time follower message** — mensagem automática 3-5 sec após "seguir". Welcome
  + oferta + link Mini Program.
- **Subscription message (订阅通知)** — Service account pode enviar 3 notificações/user
  após opt-in explícito (mais poderoso que broadcast).
- **Template message** — para eventos transacionais (ordem confirmada, envio, agendamento).

## Passo 4 — Fronteira com Video Channels (视频号)

Video Channels é o "feed vertical" do WeChat, algoritmicamente independente do OA mas
que compartilha follower base. É onde o WeChat responde ao Douyin.

- **Formato** — vertical 9:16, 15s-15min (ideal 30-90s).
- **Algoritmo** — feed + follower base + WeChat contatos + Moments (Moments propagation
  é único: contato compartilha em Moments → viraliza dentro da rede social).
- **Live** — Video Channels tem live commerce integrado com Mini Program.
- **Cross-post OA ↔ Video Channels** — anexar Video Channels no OA post; anexar OA
  article na descrição do Video Channels.

**Regra:** OA para long-form + autoridade + newsletter; Video Channels para reach + top
of funnel + live commerce. Marca séria opera os dois.

## Passo 5 — Mini Program como CTA final

Todo OA post deve terminar com Mini Program CTA (não link externo, que abre browser).
Mini Program mantém user dentro do WeChat.

- **Landing Mini Program** — página produto, curso, cupom, form.
- **Membership Mini Program** — se private domain está ativo (skill `wecom-private-domain`).
- **Booking / appointment** — B2B ou service brands.

## Passo 6 — SEO e discovery dentro do WeChat

Poucos falam: WeChat tem busca interna (微信搜索/搜一搜) que indexa OA articles + Mini
Programs + Moments públicos. Isso é a "SEO do WeChat".

- **Título do artigo com keyword-alvo** em posição inicial.
- **Palavras-chave no primeiro parágrafo** repetidas naturalmente 2-3x.
- **Hashtags/tags no fim do post** — WeChat busca considera.
- **Series** — publicar em série (mesmo prefixo de título) ajuda discovery.
- **External backlink** de outro OA que já ranqueia = boost.

## Passo 7 — Cadência editorial

- **Subscription OA:** 3-5 posts/semana; ligados por editorial calendar; mix (skill
  `matriz-de-conteudo`, anexo "Mixes de mercado"):
  - 60% value (educação, insight)
  - 30% community (case, entrevista, curadoria)
  - 10% promo (produto, oferta, launch)
- **Service OA:** 1 post/semana; mais promocional aceito (30-40%); 4 posts/mês.
- **Video Channels:** 2-4 vídeos/semana + live 1-2x/mês.

## Compliance & risco

- **Verificação da conta** — OA para marca precisa "微信认证" (WeChat Certification,
  RMB 300/ano) — desbloqueia menu, custom auto-reply e subscription message. Sem
  certification, é blog cru.
- **VPN não é canal legítimo** — usar interface oficial ou ferramenta autorizada
  (Wechatsync para publicação draft-first).
- **Censura ativa** — mesmo em text, revisão humana + automática. Política, saúde
  não-registrada, medical claims, financial claims sem license = takedown ou lock do
  post ("delete + count against account health").
- **Advertising labels** — post patrocinado precisa "广告" label; oferta comercial
  precisa preço explícito (não "consultar preço").
- **Segredos** (WeChat OA API token, Video Channels API) via Infisical.

## Fluxo padrão da skill (resumo)

1. **Escolha estrutural** — Subscription ou Service OA (função do modelo de conversão).
2. **Certificação WeChat** — obrigatória para automação.
3. **Editorial calendar** — cadência + mix 60/30/10.
4. **Automação** — menu + first-time follower + keyword auto-reply + subscription
   message templates.
5. **Video Channels cross-post** — publicação sincronizada quando possível.
6. **Mini Program CTA** em todo post editorial.
7. **SEO do WeChat** — títulos + tags + series.
8. **KPI mensal** — read count, share count, follow-conversion, click para Mini Program,
   revenue attributed.

## Checklist da skill
- [ ] Tipo de OA escolhido (Subscription vs Service) com racional
- [ ] Certificação WeChat ativa
- [ ] Menu customizado (3 abas × 5 sub-itens) publicado
- [ ] First-time follower message + keyword auto-reply configurados
- [ ] Subscription message templates aprovados
- [ ] Video Channels acoplada + cross-post fluxo definido
- [ ] Mini Program storefront linkado em toda peça
- [ ] Editorial calendar mensal com mix 60/30/10
- [ ] SEO do WeChat (título + tags + series) verificado
- [ ] Segredos no Infisical
- [ ] Publicação via ferramenta oficial (Wechatsync, draft-first)

## Handoffs
- **`wecom-private-domain`** — WeChat OA leva para private domain via QR/scan.
- **`podcast-china`** — cross-post de transcrição.
- **`china-ecommerce-ops`** — OA anuncia lançamento no Tmall/JD.
- **`livestream-commerce`** — Video Channels live + Mini Program checkout.
- **Caliope** — copy do post em Mandarim, título com hook, subscription message.
- **`matriz-de-conteudo`** — anexo "Mixes de mercado" (WeChat 60/30/10) para editorial.

## Fontes
- WeChat OA (公众平台): https://mp.weixin.qq.com
- WeChat certification (微信认证): https://kf.qq.com/product/wxrz.html
- Video Channels creator: https://channels.weixin.qq.com
- Mini Program dev: https://developers.weixin.qq.com/miniprogram
- Wechatsync (publish tool): github.com/wechatsync

---

**Absorção:** cobre MKT-G73 (WeChat OA Manager — content + automação + Mini Program + conversão).
**Procedência:** Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B02/marketing. Reescrito em pt-BR, sem cópia literal.
