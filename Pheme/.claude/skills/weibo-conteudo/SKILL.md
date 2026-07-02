---
name: weibo-conteudo
description: >
  Estratégia de conteúdo para o Weibo (微博) — o "Twitter+Instagram+Reddit da China" com
  foco em trending topics (热搜), Super Topics (超话) e sentiment ao vivo. Use quando o
  pedido envolver "Weibo", "微博", "trending topic China", "热搜", "Super Topic 超话",
  "hot search China", "sentiment monitoring China", "crise China Weibo", "brand launch
  China com hype". Cobre: cadência de trending topic (Warm-up → Ignition → Amplification
  → Consolidation), KOL tiers, playbook de crise por severidade (Blue → Yellow → Orange
  → Red) e monetização (Weibo Ads + brand collab). NÃO é X/Twitter global (fora do
  escopo desta skill).
metadata:
  type: reference
---

# Weibo — trending + Super Topics + crisis playbook

Weibo é a "praça pública" chinesa: onde trending topic vira mainstream news, onde crise
escala em horas e onde marca é reconhecida (ou queimada) por milhões. É onde marcas
lançam produto para ganhar "hot search" e onde precisam de crisis playbook 24/7.

## Passo 1 — Anatomia do Weibo (o que a marca precisa entender)

- **Timeline (weibo)** — post curto (140-2000 chars) com foto, vídeo, article, poll.
- **Trending (热搜)** — top-50 topics tracked em real-time; ganhar hot search = 1M+ views
  em horas.
- **Super Topics (超话)** — comunidades por tema (like sub-reddit) com admins, ranking,
  cerimonial. Fandom + interest.
- **Fandom (粉圈)** — clubes de fã organizados por celebridade/marca; motor de amplificação
  orgânica quando aliados.
- **Repost (转发)** — retweet-like, sinal de amplificação horizontal (não Like).
- **Comment section** — onde crise escala mais rápido (não no post original).

## Passo 2 — KOL tiers e como escolher

Weibo tem hierarquia clara de KOL:

| Tier | Followers | RMB per collab | Uso ideal |
|---|---|---|---|
| **Top-tier (头部)** | 5M+ | RMB 300k-3M | Brand launch, celebridade endorsement |
| **Waist (腰部)** | 500k-5M | RMB 30k-300k | Product review, campaign amplification |
| **Long-tail (KOC 尾部)** | 10k-500k | RMB 500-30k | Grassroots authenticity, category depth |
| **Micro-KOC** | < 10k | RMB 50-500 | Volume + long-tail SEO |

**Regra prática:** 1 top-tier + 5-10 waist + 30-100 KOC é o mix canônico para launch
mid-range. Contra-intuitivo: top-tier sozinho raramente cria movimento; waist + KOC army
gera o sentiment que sustenta.

## Passo 3 — Cadência canônica de trending topic (4 fases)

Ganhar hot search não é sorte. É orquestração de 4 fases (às vezes 3-7 dias, às vezes
compressed em 24h para hype).

### Warm-up (T-3 a T-1)
- **KV teaser** — 3-5 KOCs mid-tier publicam imagem/quote parcial.
- **Super Topic ativado** — se ainda não existe, criar; se existe, revitalizar com admin.
- **Hint sem conclusão** — pergunta polêmica, mystery product, teaser tipográfico.

### Ignition (T-0, o dia D)
- **Ancoragem** — marca publica post oficial com KV + tag campanha.
- **Wave 1 de KOL** — top-tier + 5-10 waist publicam sincronizado 09h-11h (janela de
  máximo pico de uso).
- **Poll / interactive** — post interativo (poll, question, meme template) drena engajamento.

### Amplification (T+0 a T+2, primeiras 48h)
- **Wave 2** — 30-100 KOC + micro publicam com variações do KV.
- **Weibo Ads (信息流广告)** — paid injection para 500k-5M reach.
- **Newsjacking** — comentar tópicos correlatos trending que puxam para o seu.
- **Fandom activation** — se aliados a celeb/character fandom, ativar admin de Super Topic
  para "carrying" (fandom-jacking positivo).
- **Cross-plataforma** — linkar Xiaohongshu, Bilibili, Douyin para sentiment cross-canal.

### Consolidation (T+2 a T+7)
- **Case wrap** — publicar post "case results" (X views, Y engagement) para reforçar
  autoridade.
- **UGC amplification** — repostar melhor UGC que apareceu; conversão de espectador em
  criador.
- **KOC lifecycle** — os KOCs que participaram continuam falando organicamente (relacionamento
  não termina no post).

## Passo 4 — Playbook de crise por severidade (Blue → Yellow → Orange → Red)

Weibo é onde crise fica pública. Playbook em 4 níveis com SLA claro:

### 🟦 Blue (baixo) — Sentiment negativo isolado
- **Sinal:** < 5 posts negativos em 24h, engagement < 1000, sem viral spread.
- **SLA:** resposta interna em 4h; ação em 12h.
- **Ação:** monitorar, não escalar. Se conteúdo factualmente errado, responder com fato
  no comment (não post separado — não dar palco).
- **Ownership:** community manager.

### 🟨 Yellow (médio) — Sentiment crescendo
- **Sinal:** 5-50 posts negativos em 24h, engagement 1k-100k, começa a aparecer em
  discovery.
- **SLA:** resposta em 2h; escalation call em 30min.
- **Ação:** post oficial de esclarecimento (fatos, tom sóbrio, sem defensiveness).
  Ativar 3-5 KOCs neutros para trazer contexto. NÃO usar KOL top-tier (parece coordinated).
- **Ownership:** community manager + comms lead + brand director.

### 🟧 Orange (alto) — Trending topic negativo
- **Sinal:** trending com hashtag negativa; 100k-1M engagement; imprensa começa a cobrir.
- **SLA:** resposta em 30min; C-level briefed em 15min.
- **Ação:** post oficial em 60min (não delay); vídeo do CEO se apropriado; ação corretiva
  concreta (recall, refund, apology). Coordenação com PR (skill `pr-comunicacoes-institucionais`
  em Caliope) e Weibo internal team para reduzir amplification algorítmico. Coordenar
  cross-channel (WeChat OA, RED, Douyin) para narrative consistency.
- **Ownership:** CEO/C-level + comms + legal + community lead.

### 🟥 Red (crítico) — Crise nacional
- **Sinal:** > 1M engagement, imprensa nacional cobrindo, boycott movement organizado,
  regulador movendo-se.
- **SLA:** war-room aberto em 15min; C-level 24/7.
- **Ação:** apology executive (video + text) em janela cultural adequada. Ação corretiva
  material (executivo demitido, produto retirado, compensação anunciada). Coordenação
  com government relations (regulador chinês). Silence nas outras plataformas até
  narrativa central estabilizar. Post-mortem pública em 30 dias com plano.
- **Ownership:** war-room completo (CEO, legal, comms, GR, community, product).

**Regra dura:** nunca deletar comments negativos em massa (backfires — "Streisand
effect"). Deletar só spam óbvio, threats, illegal content.

## Passo 5 — Sentiment monitoring 24/7

Skill precisa infra de monitoring contínuo:

- **Ferramentas** — Weibo Enterprise Console (企业版) + third-party (知微 Zhiwei, 蓝鲸
  BlueWhale, Trustdata). Integrar com Argos (Kolden) para social listening.
- **Keywords tracked** — marca + variações + typos + hashtags + concorrentes.
- **Threshold de alerta** — post negativo com > 100 engagement em 1h → alert Yellow;
  hashtag negativa aparecendo em trending → alert Orange.
- **Dashboard** — sentiment score, volume, top posts, top influencers pró/contra.

## Passo 6 — Weibo Ads (paid amplification)

Duas categorias principais:

- **Fanstong (粉丝通)** — feed ads segmentados por interesse/idade/tier.
- **Weibo Trending Ad (商业热搜)** — placement em trending list (RMB 500k-3M por dia).
- **KOL matching platform (V影响力)** — matchmaking oficial com KOLs verificados.

## Compliance & risco

- **Verificação (V) da conta** — marca precisa "蓝V" (blue V, business verification).
- **VPN não é canal legítimo** — operar via interface oficial ou parceiro autorizado.
- **Censura ativa** — palavras-gatilho automáticas + revisão humana. Política + saúde
  não-registrada + celebridade banida + evento histórico = takedown do post + account
  score down. Weibo compliance team é agressivo em delete.
- **Fake accounts** — comprar follow / repost em batch = ban.
- **Advertising labels** — post patrocinado precisa "微博橱窗" ou label "广告" explícito.
- **Segredos** (Weibo API token, ads console) via Infisical.

## Fluxo padrão da skill (resumo)

1. **Fit + goal** — hot search launch? mantém sentiment? crisis response?
2. **KOL mix** — top-tier + waist + KOC army calibrado.
3. **Cadência** — Warm-up → Ignition → Amplification → Consolidation com timeline claro.
4. **Sentiment monitoring** ligado 24/7 antes de publicar (não depois).
5. **Playbook de crise** pronto e testado em tabletop (não improvise em Red).
6. **Weibo Ads** para amplification se paid é parte do plano.
7. **Report** por fase (reach, engagement, sentiment, share of voice, top influencers).

## Checklist da skill
- [ ] Conta 蓝V (blue V) certificada
- [ ] Super Topic ativa ou criada
- [ ] KOL mix orçado e contratado (top + waist + KOC)
- [ ] Timeline Warm-up → Consolidation documentado
- [ ] Sentiment monitoring 24/7 ativado com thresholds
- [ ] Playbook de crise Blue/Yellow/Orange/Red exercitado
- [ ] Weibo Ads plan (se aplicável) com bidding + creative
- [ ] Compliance review de todo copy (palavras-gatilho)
- [ ] Segredos no Infisical
- [ ] Publicação via ferramenta oficial (não bot proibido)

## Handoffs
- **`xiaohongshu-conteudo`, `douyin-conteudo`, `bilibili-conteudo`** — cross-channel
  amplification.
- **`wechat-official-account`** — long-form narrative após ignition Weibo.
- **`podcast-china`** — deep-dive B2B sobre o tema/case.
- **Caliope + `pr-comunicacoes-institucionais`** — copy institucional para crise
  Orange/Red.
- **Argos** — social listening + sentiment tracking.
- **Peitho** — Weibo Ads bidding.

## Fontes
- Weibo Enterprise (企业版): https://e.weibo.com
- V影响力 platform: https://v.weibo.com
- Weibo Ads (Fanstong): https://data.weibo.com/ads
- Community rules (微博社区公约): https://weibo.com/1934183965/rules

---

**Absorção:** cobre MKT-G75 (Weibo Strategist — trending + Super Topics + sentiment + ads) + MKT-G76 (Cadência de trending topic Warm-up/Ignition/Amplification/Consolidation + KOL tiers) + MKT-G77 (Playbook de crise Weibo Blue/Yellow/Orange/Red + SLAs).
**Procedência:** Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B02/marketing. Reescrito em pt-BR, sem cópia literal.
