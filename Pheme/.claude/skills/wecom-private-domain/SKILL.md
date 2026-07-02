---
name: wecom-private-domain
description: >
  Operação de "private domain" (私域) no WeCom (企业微信) — a modalidade padrão de
  CRM social + lifecycle marketing na China. Use quando o pedido envolver "private
  domain", "私域", "WeCom", "企业微信", "SCRM na China", "channel codes", "WeChat
  groups", "Mini Program CRM" ou quando a estratégia China exigir tirar comprador do
  marketplace (Tmall/Douyin) para relacionamento direto. Cobre SCRM em YAML (channel
  codes, tags, group config), Mini Program como base de dados, e o lifecycle
  new/repurchase/dormant/churn_warning. NÃO substitui `wechat-official-account` (essa
  cobre publishing OA); private domain é CRM operacional.
metadata:
  type: reference
---

# WeCom Private Domain — SCRM chinês em YAML

"Private domain" (私域) é o conceito chinês para "audiência que a marca controla
diretamente" — vs "public domain" (公域, tráfego pago em Douyin/RED/Weibo). WeCom
(企业微信 — WeChat for Business) + Mini Program é a **stack canônica** de CRM social
na China. Marcas grandes chinesas movem 30-60% da receita via private domain porque
CAC público subiu 3-5x em 3 anos.

## Passo 1 — Por que WeCom (e não WeChat pessoal)

Antes de 2020, marcas usavam WeChat pessoal (个人号) para gerenciar clientes — insustentável
(400 friends limit soft, banning risk, sem auditoria). WeCom resolve:

- **Colaborador oficial da marca** — assina "员工 (Employee) of 品牌 X".
- **5000 friends por conta** com fila para 10000 (via unlock).
- **Grupos até 500 membros** (WeChat pessoal era 200).
- **API oficial** — auditoria, tag, message templates, integração com Mini Program.
- **Handover** — quando colaborador sai, transferir clientes automaticamente sem perder.

Dispositivo: WeCom no celular do colaborador (ou celular dedicado da marca).

## Passo 2 — Estrutura SCRM em YAML

O padrão-ouro é declarar SCRM em YAML versionado, não em cliques em interface. Exemplo:

```yaml
scrm:
  brand: marca_x
  channels:
    - id: ch_douyin_kv001
      source: douyin_video
      utm: kv001_summer
      destination: qr_group_beauty_2026q3
      tag_on_scan: [source:douyin, campaign:summer2026, interest:beauty]
    - id: ch_tmall_qr
      source: tmall_flagship_home
      utm: tmall_home_qr
      destination: employee_beauty_advisor
      tag_on_scan: [source:tmall, engagement:store_visitor]
    - id: ch_offline_pos
      source: offline_store_receipt
      utm: pos_shanghai
      destination: qr_vip_lounge
      tag_on_scan: [source:offline, city:shanghai, engagement:purchaser]

  employees:
    - id: emp_beauty_advisor_01
      role: beauty_advisor
      persona: "Alice, consultora especialista, vibe amigável"
      max_daily_new_friends: 50

  groups:
    - id: qr_group_beauty_2026q3
      type: interest
      pillar: beauty
      cap: 500
      moderator: emp_community_lead
      welcome_flow: welcome_beauty
    - id: qr_vip_lounge
      type: vip
      pillar: purchaser
      cap: 200
      moderator: emp_community_lead
      welcome_flow: welcome_vip

  tags:
    stage: [new, engaged, purchaser, repeat_purchaser, dormant, churn_warning]
    source: [douyin, xiaohongshu, weibo, tmall, offline]
    interest: [beauty, skincare, makeup]
    tier: [t1, t2, vip]

  message_templates:
    - id: welcome_beauty
      channel: employee_1to1
      trigger: on_add_friend_via_ch_douyin_kv001
      delay: 2min
      content_ref: /content/welcome/beauty_kv001.md
    - id: dormant_reactivation
      channel: employee_1to1 + group
      trigger: no_purchase_in_60d + no_message_in_30d
      content_ref: /content/lifecycle/dormant_reactivation.md
```

**Racional:** YAML versionado em git → mudança de configuração vira PR → auditável +
reproduzível. Não deixar em cliques.

## Passo 3 — Channel codes (渠道活码): a fundação

Cada ponto-de-entrada (KV Douyin, QR na embalagem, receipt POS offline, banner WeChat OA)
precisa ser um **channel code único** — QR code que rastreia origem + auto-atribui tag.

- **Live QR (活码)** — QR que rotaciona entre múltiplos colaboradores (não fura o limite
  de 5000 friends de um).
- **Tag automática** ao escanear — sem intervenção humana; scan → CRM já sabe canal +
  campanha + interesse.
- **Welcome flow** — mensagem 1:1 automática 2-5 min após scan (não instantânea; humaniza).

Ferramentas: WeCom nativo já suporta live QR + tag. SCRM comerciais (语鹦企服 Yuying, 尘峰
Chenfeng, 悟空 Wukong) adicionam analytics + automação de fluxo.

## Passo 4 — Groups (社群) — moderação e engajamento

Grupos WeCom são o core do relacionamento. Cada grupo tem:

- **Cap 500 members** (500+ vira "quiet" — não notifica).
- **Moderador humano** — não delegue tudo ao bot; culturalmente inaceitável.
- **Welcome flow** — quando alguém entra, apresentação de 3-5 mensagens: quem somos,
  regras do grupo, benefício exclusivo, group manager stack story.
- **Cadência de conteúdo** — 2-4 posts/dia em grupos ativos; 1/dia em grupos VIP; 3/semana
  em grupos ainda quietos. Cronograma tipo: manhã (motivacional), meio-dia (produto),
  noite (community discussion), fim-de-semana (live/live-in-group).
- **Anti-churn** — silêncio > 3 dias, group manager envia 1:1 personalizado.

**Tipologia de grupo:**
- Interest (por pilar de conteúdo)
- Purchaser tier (por LTV)
- VIP (top spenders + comunidade fechada)
- Campaign (temporário, para launch específico)

## Passo 5 — Mini Program como base de dados + storefront

Mini Program (小程序) é o app-em-app dentro do WeChat, obrigatório para private domain
maduro:

- **Storefront** — catálogo, checkout, cupons, membership. Substitui abrir Tmall.
- **Membership tier** — points, tier badges, birthday reward.
- **Content hub** — artigos + video hospedados; sem sair do WeChat.
- **Data layer** — todo scan, view, click, purchase alimenta CRM.
- **Push segmentado** — WeCom + subscription message do Mini Program para nudge
  contextual.

Nomenclatura: 品牌X会员店 (Brand X Membership Store), 品牌X服务 (Brand X Service).

## Passo 6 — Lifecycle CRM: new → repurchase → dormant → churn_warning

Estágios canônicos e cadência:

| Estágio | Definição | Cadência de contato | Tática |
|---|---|---|---|
| **new** | Adicionou friend nas últimas 48h | 3 msgs em 7 dias | Welcome flow + first purchase incentive |
| **engaged** | Interagiu (msg, view, click) sem comprar | 1-2 msgs/semana | Educação + prova social + oferta baixa |
| **purchaser** | Comprou 1 vez | 2 msgs/semana + group | Onboarding produto + cross-sell related |
| **repeat_purchaser** | Comprou 2+ vezes | 1 msg/semana + grupo VIP | Advocacy + referral + upsell |
| **dormant** | Sem compra 60d + sem interação 30d | 1:1 humanizado + cupom | Reactivation flow |
| **churn_warning** | Dormant 90d+ | Última tentativa 1:1 + off-boarding | Win-back deal ou reciclagem para pool "aware" |

Cada transição de estágio dispara uma mensagem específica; templates ficam versionados
em `content/lifecycle/`.

## Compliance & risco

- **PIPL (Personal Information Protection Law)** — consentimento explícito para tag +
  message + Mini Program tracking. Fluxo de "opt-in" no welcome flow é obrigatório.
- **Anti-spam** — mensagem 1:1 excessiva (> 3-5/dia por indivíduo) vira report; WeChat
  monitora e pode restringir a conta WeCom.
- **VPN não é canal legítimo** — WeCom operado por celular chinês/parceiro autorizado.
- **Fake group / fake friend** — comprar friend em batch é banimento certo.
- **Data residency** — dados de user chinês ficam em servidor chinês (Aliyun, Tencent
  Cloud); export precisa security assessment.
- **Segredos** (WeCom API token, SCRM tool key) via Infisical.

## Fluxo padrão da skill (resumo)

1. **Diagnóstico** — a marca tem entry points para private domain (Douyin KV, RED nome,
   packaging QR, POS)? Se não, primeiro item é criar.
2. **YAML SCRM** — desenhar channels + employees + groups + tags + message_templates.
3. **Channel codes ativados** com tags automáticas e welcome flow.
4. **Estrutura de groups** — Interest / Tier / VIP / Campaign; moderador humano nomeado.
5. **Mini Program** operando como storefront + membership + data layer.
6. **Lifecycle flow** por estágio (new → repurchase → dormant → churn_warning).
7. **KPI mensal** — friend growth, group activity rate, msg response rate, repurchase
   rate, dormant → reactivation rate.
8. **Auditoria trimestral** — % contribuição do private domain no revenue total.

## Checklist da skill
- [ ] YAML SCRM versionado em git
- [ ] Channel codes ativos com tag automática
- [ ] Employees WeCom nomeados com persona documentada
- [ ] Groups com moderador humano + welcome flow
- [ ] Mini Program storefront + membership tier operando
- [ ] Lifecycle templates prontos para cada transição
- [ ] Cadência de contato calibrada por estágio (sem spam)
- [ ] PIPL opt-in explícito no welcome flow
- [ ] Segredos no Infisical
- [ ] KPI mensal + contribuição de revenue rastreado

## Handoffs
- **`wechat-official-account`** — WeChat OA como broadcaster + Mini Program entry.
- **`china-ecommerce-ops`** — Tmall/Douyin Shop drena para private domain via QR na
  embalagem/receipt.
- **`ciclo-de-vida-e-retencao`** (Pheme) — lifecycle occidental é base; esta skill
  aplica ao contexto WeCom.
- **`sequencia-de-nutricao`** — templates adaptados para 1:1 WeCom (não e-mail).
- **Caliope** — copy dos templates de lifecycle em Mandarim.

## Fontes
- WeCom Open Platform: https://developer.work.weixin.qq.com
- Yuying (SCRM): https://www.yuying.io
- Chenfeng (尘峰): https://chenfeng.com
- Mini Program dev docs: https://developers.weixin.qq.com/miniprogram

---

**Absorção:** cobre MKT-G57 (Private Domain Operator — WeCom SCRM + comunidades + Mini Program + lifecycle) + MKT-G58 (Configuração SCRM em YAML — channel codes / tags / groups).
**Procedência:** Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B02/marketing. Reescrito em pt-BR, sem cópia literal.
