---
name: china-ecommerce-ops
description: >
  Operação de e-commerce nas 5 grandes plataformas chinesas — Taobao, Tmall, Pinduoduo
  (PDD), JD e Douyin Shop — e battle plan operacional para os dois grandes eventos
  (618 e Double 11). Use quando o pedido envolver "vender na China", "e-commerce China",
  "Tmall flagship", "Taobao", "Pinduoduo", "JD", "Douyin Shop", "618", "Double 11",
  "11.11", "big promo China". Cobre a escolha da plataforma por vertical/margem/marca,
  a estrutura da loja (Tmall vs Taobao vs PDD), taxas, KPIs operacionais e o cronograma
  T-60 → T+1 dos grandes shopping festivals. NÃO cobre estratégia de conteúdo por
  plataforma (para isso use `xiaohongshu-conteudo`, `douyin-conteudo`, etc.).
metadata:
  type: reference
tipo: skill
area: Pheme
up: "[[Pheme/_MOC-pheme]]"
---

# China E-Commerce Ops — 5 plataformas + battle plan 618/Double 11

E-commerce na China é uma disciplina própria: 5 plataformas dominantes com culturas
opostas, dois grandes shopping festivals que respondem por 20-40% do GMV anual, e uma
mecânica de "loja flagship + live + private domain" que não existe no Ocidente.

## Passo 1 — Escolher a plataforma (matriz de fit)

Regra dura: **você não vende em todas.** Escolha 1-2 primárias baseadas em vertical,
margem e maturidade de marca.

| Plataforma | Perfil | Ideal para | Comissão típica | Barreira |
|---|---|---|---|---|
| **Tmall (天猫)** | Alto padrão, marca | Beauty, moda, eletrônicos, luxury | 0,5-5% + anuidade | Precisa TM registrado na China, business license |
| **Taobao (淘宝)** | Long-tail, C2C+C2B | SMB, dropshipping, nichos | 0% listing + Zhitongche ads | Aberto a estrangeiros via TP (Taobao Partner) |
| **Pinduoduo (PDD)** | Preço + social + tier 3-5 | Commodity, FMCG, low-price | 0,6% | Modelo group-buy; margem apertada |
| **JD (京东)** | Confiança + prazo | Eletrônicos, luxo, casa, B2B | 2-8% | JD Logistics obrigatório em muitas categorias |
| **Douyin Shop (抖音小店)** | Impulso + live commerce | Beauty, apparel, food, gadgets | 2-5% + comissão de creator | Precisa conteúdo Douyin ativo |

**Regras práticas:**
- Marca premium ocidental → Tmall Global (跨境天猫) para não precisar de PJ chinesa.
- SMB testando mercado → Taobao via TP (parceiro autorizado).
- Volume + margem baixa → PDD ou Douyin Shop.
- Eletrônicos técnicos → JD (autoridade em specs + logística confiável).

## Passo 2 — Estrutura da loja flagship (Tmall benchmark)

Tmall flagship é o padrão-ouro. Blocos obrigatórios:

1. **Home/首页** — banner rotativo (KV do momento), coupon, cupom de fidelidade,
   destaque de best-sellers.
2. **New arrivals / 新品** — sempre visível; freshness é sinal de vitalidade.
3. **Categoria** — coleções curadas (não catálogo cru); use pontos de vista editoriais.
4. **Detalhe do produto (SKU page)** — 8-12 imagens (main + variações + hero + spec +
   uso + comparação + review + video). Vídeo de 15-30s é obrigatório em beauty/apparel.
5. **Chat vivo (阿里旺旺 / Aliwang)** — resposta < 30s; taxa de resposta é KPI que
   afeta ranking. Contratar equipe 24/7 ou usar bot supervisionado.
6. **Live room (直播间)** — link permanente da live; hosts próprios + KOL/KOC.
7. **Membership / 会员** — pontos, cupons, aniversário, tiers.

## Passo 3 — KPIs operacionais (que a plataforma pontua)

Estas métricas viram ranking do produto/loja:

- **DSR (Detailed Seller Rating)** — 3 notas de 1-5: descrição, atendimento, logística.
  DSR < 4.6 na média = flagged pela plataforma.
- **Return rate (退货率)** — < 5% ideal em eletrônicos, < 10% em apparel.
- **Response rate (响应率)** — resposta < 30s, taxa > 90%.
- **On-time shipping (48h shipping率)** — envio em 48h > 95%.
- **Review rate + review positivo** — reviews com foto/vídeo pesam 3-5x mais.
- **Repurchase rate (复购率)** — 30 dias, 90 dias.

## Passo 4 — Tráfego pago dentro da plataforma

- **Tmall/Taobao:** 直通车 (Zhitongche — search ads), 引力魔方 (Yinli Mofang — DPA/display),
  超级推荐 (feed ads), 品销宝 (brand zone), 万相台 (all-in-one).
- **JD:** 京准通 (Jingzhuntong) — search + display + display network.
- **PDD:** 多多进宝 (Duoduo Jinbao — affiliate/CPS), 场景推广 (scene ads), 搜索推广 (search ads).
- **Douyin Shop:** Qianchuan (千川) — cobrado por conversão, sincroniza com feed/live.

Regra: ROAS de e-commerce China típico é 3-8x em launch, 1,5-3x em maturidade. Live
commerce tem ROAS de blended entrega (não só o ROAS do slot).

## Passo 5 — Battle Plan 618 e Double 11 (T-60 → T+1)

618 (18 de junho, evento do JD que virou industry-wide) e Double 11 (11 de novembro,
Alibaba) são os dois eventos que fazem-ou-quebram o ano. GMV pico de Double 11 = US$150B+
em 2024 no ecossistema Alibaba+JD+PDD.

### Cronograma canônico

| Fase | Janela | O que fazer |
|---|---|---|
| **T-60 a T-45** | Estratégia | Definir SKUs de destaque, preço-âncora, hero drop, ambição de GMV, orçamento de mídia. Registrar no sistema da plataforma (报名) |
| **T-45 a T-30** | Estoque + conteúdo | Fechar estoque (fábrica → warehouse regional); produzir hero video + KV + short-videos + livestream slides |
| **T-30 a T-14** | Pré-hype | Ativar comunidades (WeCom, RED, Xiaohongshu, Weibo); teasers; recrutar KOL/KOC (100-500 KOCs mid-tier > 5 top-KOL para maioria dos casos) |
| **T-14 a T-7** | Warm-up (预热) | Coupons pré-pagos, add-to-cart bonus, live rooms diários; Meta social listening; ajuste de mix |
| **T-7 a T-1** | Final push | Live diária das 20h-2h; media buy máximo; VIP rooms; last-call urgency |
| **T-day (0h-24h)** | Batalha | Estrutura de plantão 24h; monitoramento de estoque em tempo real; hosts em revezamento 4h; media buy dinâmico por hora |
| **T+1 a T+3** | Fulfillment + salvamento | Cumprir envio; gerenciar reviews; ativar fluxos de repurchase; salvar carts abandonados |

### Regras práticas do battle plan

- **Não estica estoque** — plataformas penalizam "esgotado" (缺货); melhor errar por cima.
- **Preço-âncora + desconto real** — plataforma audita histórico de 30d; preço "inflado
  para descontar" é fraude tipificada.
- **Live rooms simultâneas** — 2-3 lives por dia (dia, tarde, noite) com hosts distintos.
- **Contingência de logística** — pico esmaga couriers; contrate SLA premium.
- **Contingência técnica** — CDN, storefront com fallback estático para segunda pico.

## Compliance & risco

- **PJ chinesa ou Tmall Global** — vender direto exige business license; Tmall Global
  aceita PJ estrangeira mas com regras próprias (categoria restrita, TP obrigatório).
- **VPN não é canal legítimo** para gerenciar loja — usar Aliyun Cloud DingTalk ou
  parceiro TP com acesso direto.
- **Censura + regulação** — categorias reguladas (cosméticos precisam CFDA, food precisa
  QS/SC, importados precisam CIQ). Cada categoria tem "白名单" (whitelist) e proibições.
- **Publicidade falsa** ("最" máximo, "第一") é criminalmente punível desde 2015 — audit
  de copy é gate obrigatório.
- **Fake reviews (刷单)** — banimento de loja + multa; usar apenas reviews orgânicos.
- **Segredos** (API key do Open Platform de cada marketplace) via Infisical.

## Fluxo padrão da skill (resumo)

1. **Matriz de fit** — vertical × margem × marca → 1-2 plataformas primárias.
2. **Estrutura da loja** conforme padrão da plataforma escolhida (blocos + KPIs).
3. **KPI baseline** — DSR, return rate, response rate, on-time shipping.
4. **Plano de tráfego pago** dentro da plataforma (Zhitongche/Qianchuan/京准通).
5. **Roadmap 618/Double 11** — se estamos T-60+, ativar battle plan.
6. **Report semanal** — GMV, ROAS blended, DSR, ranking de SKU-hero.

## Checklist da skill
- [ ] Plataforma primária escolhida com racional (matriz de fit)
- [ ] TP/parceiro local contratado (se aplicável)
- [ ] Estrutura da loja fechada com todos os blocos obrigatórios
- [ ] DSR baseline monitorado > 4.6
- [ ] Chat vivo com SLA < 30s
- [ ] Plano de tráfego pago intra-plataforma orçado
- [ ] Battle plan 618/Double 11 documentado por fase (T-60 → T+1)
- [ ] Compliance de categoria (CFDA/CIQ/QS) verificado
- [ ] Credenciais no Infisical

## Handoffs
- **`douyin-conteudo`, `xiaohongshu-conteudo`, `weibo-conteudo`** para gerar tráfego externo.
- **`livestream-commerce`** para operação de live rooms.
- **`wecom-private-domain`** para reter comprador em domínio próprio.
- **Caliope** para copy de listing e KV em Mandarim.
- **Peitho / `paid-social-cross-platform`** para paid media externo (Feed Douyin/RED etc.).

## Fontes
- Tmall Global (Merchant Center): https://global.tmall.com
- Taobao Partner (TP) directory: https://xin.baidu.com (verificação)
- Pinduoduo Merchant: https://mms.pinduoduo.com
- JD Vendor Center (JD 服务市场): https://union.jd.com
- Douyin Shop: https://fxg.jinritemai.com

---

**Absorção:** cobre MKT-G22 (China E-Commerce Operator — Taobao/Tmall/PDD/JD/Douyin Shop) + MKT-G23 (Battle plan 618/Double 11 T-60 → T+1).
**Procedência:** Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B02/marketing. Reescrito em pt-BR, sem cópia literal.
