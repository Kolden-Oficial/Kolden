---
name: china-localizacao-gtm
description: >
  Estratégia transversal de localização e go-to-market para a China — dual-track
  Content + Comment, gates GTM P0-P5 e sinais que determinam se o mercado está pronto.
  Use quando o pedido envolver "entrar na China", "localizar para China", "GTM China",
  "expandir para China", "China readiness", "sinal de China" ou quando qualquer skill
  China (Baidu/Bilibili/Douyin/WeChat/etc.) for chamada sem pré-decisão de mercado.
  É a camada de decisão ACIMA das skills específicas por plataforma. NÃO substitui as
  skills operacionais — orienta quando/como acioná-las e com que profundidade.
metadata:
  type: reference
---

# China Localização + GTM — sinal, tracks e fases P0-P5

Entrar na China não é "traduzir o site". É reengenharia de produto, canal, preço, marca
e ops. Esta habilidade orienta a decisão anterior a qualquer skill China específica:
**temos sinal? qual profundidade? em que fase estamos?**

## Passo 1 — Sinal de mercado (leitura antes de decidir)

Gate: só siga para P0+ se pelo menos 3 destes sinais forem verdadeiros.

- Consultas espontâneas de compradores/parceiros chineses ao seu produto (histórico DM/email).
- Concorrentes globais já lançaram na China com tração pública.
- Menções orgânicas em Bilibili, RED, Zhihu ou Weibo (usar `argos` para social listening).
- Google Analytics mostra tráfego crescente de China (mesmo com VPN — sinal parcial).
- Distribuidor/agente local aproximou por conta própria.
- Vertical regulada onde China lidera globalmente (EV, solar, e-commerce SaaS, semiconductor).

**Sinal fraco = P0 (research)**; sinal médio = P1 (Meta + mock); sinal forte = P2+ (execução real).

## Passo 2 — Dual-Track Analysis: Content Track + Comment Track

Toda ação de marca na China opera em dois tracks paralelos que se retroalimentam.

### Content Track — o que a marca PUBLICA

- **Ownership:** marca (via time interno chinês ou agência local).
- **Canais:** WeChat OA + Video Channels, Xiaohongshu, Weibo, Bilibili, Douyin, site
  Baidu-friendly.
- **Cadência:** semanal em pelo menos 2 canais; mensal em canais de nicho.
- **Objetivo:** narrativa + educação + drop de produto.

### Comment Track — o que o MERCADO diz sobre a marca

- **Ownership:** social listening + community + KOC advocacy.
- **Ferramentas:** Argos (social listening internacional) + serviços locais
  (WEIQ, Robin8, Weiboyi para KOC).
- **Cadência:** contínua (24/7 monitoring por reflex de crise).
- **Objetivo:** capturar sentiment, replicar palavras do consumidor no Content Track,
  detectar crise antes de escalar (playbook Weibo Blue→Red em `weibo-conteudo`).

**Regra:** Content sem Comment = broadcasting cego. Comment sem Content = defensivo puro.
Só os dois juntos fecham o ciclo.

## Passo 3 — Gates GTM P0 → P5

Estrutura fasada. Cada fase tem exit criteria explícito — não pular.

### P0 — Research (0-4 semanas, ~US$5-15k)

**Objetivo:** entender o mercado, não vender.

- Análise de 3-5 concorrentes chineses e globais operando na China (share, mix, pricing).
- Mapa de canais dominantes por vertical (`douyin-conteudo`, `xiaohongshu-conteudo`,
  `bilibili-conteudo` etc. só como leitura).
- Compliance mapping — categoria regulada? ICP? CFDA? CIQ? QS?
- 5-10 entrevistas com compradores/parceiros locais (via Aletheia + intérprete).
- Custo de estrutura mínima (PJ, WFOE, TP, hosting, agência).

**Exit criteria:** relatório executivo (10-20 pgs) com go/no-go recomendado.

### P1 — Meta + Mock (4-8 semanas, ~US$20-40k)

**Objetivo:** validar hipótese sem infraestrutura real.

- Landing page em Mandarim (hospedada em Hong Kong ou CDN China-friendly).
- 1 conta WeChat OA (subscription primeiro; service depois).
- 1 conta Xiaohongshu OU Weibo (escolha baseada em vertical).
- Content Track: 4-6 posts/mês; Comment Track: monitoring baseline.
- **Sem** ICP, sem loja, sem estoque.

**Exit criteria:** signal-to-noise definido (visits/inbound/DMs). Se sinal cresce
30%+ mês-a-mês → P2.

### P2 — Beta (2-4 meses, ~US$50-150k)

**Objetivo:** primeiras vendas, primeiro fulfillment.

- ICP filing iniciado (pode levar 3-6 semanas).
- Tmall Global ou parceria com JD Worldwide (cross-border, sem PJ chinesa).
- Estoque em warehouse bonded (保税仓) em Zhuhai/Shanghai.
- Content Track: cadência semanal; Xiaohongshu KOC (10-30 KOCs mid-tier).
- Comment Track: monitoring diário; primeiro playbook de crise.

**Exit criteria:** MRR/GMV mensurável, DSR > 4.6, NPS local decodificado.

### P3 — Beta + Community (4-6 meses, ~US$150-400k)

**Objetivo:** community-led growth + private domain.

- WeCom (企业微信) + Mini Program para captura e retenção (skill `wecom-private-domain`).
- Grupos WeChat + comunidades RED por segmento.
- Live commerce inicial (`livestream-commerce`) — 1-2 lives/semana.
- Content Track: crescimento para 2 canais primários + 2 secundários.
- KOC army escalando (30-100 KOCs ativos).

**Exit criteria:** repurchase rate > 20%; private domain > 5000 users; 1º shopping
festival minor (Chinese Valentine's, 520, 6.18 mini).

### P4 — Launch (6-9 meses, ~US$400k-1M)

**Objetivo:** presença de marca reconhecida.

- Tmall flagship (não Global) ou JD self-operated se compliance permite; ou seguir em
  Tmall Global se margem cross-border > local.
- Media buy full-funnel (`paid-social-cross-platform` chinês — Xiaohongshu Ads + Qianchuan
  + WeChat OA Advertising).
- Battle plan 618 ou Double 11 executado (skill `china-ecommerce-ops`).
- Content Track: 3-4 canais operados por time interno chinês (não agência).
- Comment Track: sentiment tracker semanal; playbook de crise testado em tabletop.

**Exit criteria:** GMV mensal recorrente; market-share visível no vertical; brand
awareness > 15% no público-alvo (survey local).

### P5 — Growth + Otimização (9m+, contínuo)

**Objetivo:** dominância em nicho ou expansão para adjacências.

- Localização de produto (features, integrações, pricing).
- WFOE (Wholly Foreign-Owned Enterprise) para operar direto em RMB.
- R&D local (para categorias que exigem — tech, MedTech, AutoTech).
- Category leadership via thought leadership no Zhihu, palestras em conferências
  chinesas (Tencent Global, Bilibili Creator).
- Cross-border expansion: uso da base China para SEA (Sudeste Asiático).

## Passo 4 — Padrões-Anti (não faça)

- **Copy-paste do site global traduzido** — Mandarim UX é diferente (densidade, hierarquia
  visual, cor, chat como CTA principal).
- **Dropar em 8 plataformas ao mesmo tempo** — fluxo típico é 2 canais em P1, escalonando.
- **Pular P0-P1 e ir direto para Tmall flagship** — queima de US$500k-1M sem lição.
- **Delegar para agência ocidental "com escritório em Xangai"** — sem time local com
  cultura + skin in the game, deploy falha.
- **Ignorar Comment Track** — crises Weibo escalam de Blue para Red em 24-48h; sem
  monitoring diário, marca queima.

## Compliance & risco

- **ICP filing** é gate para P2+ com site na China; sem ele, ficar em cross-border.
- **VPN não é canal legítimo** — todo Content Track precisa ferramenta oficial ou
  parceiro autorizado (Wechatsync, xhs-mcp, biliup em modo draft-first).
- **Censura ativa por fase de vida do produto** — copy que passou na P1 pode ser
  bloqueado em P4 por mudança regulatória; re-audit a cada campanha grande.
- **Segredos** — todo token/API key via Infisical.
- **Data residency** — dados de usuário chinês precisam ficar em servidor chinês (PIPL
  desde 2021). Transferência internacional exige security assessment.

## Fluxo padrão da skill (resumo)

1. **Ler sinal de mercado** (Passo 1). Se < 3 sinais, recomendação = "não agora".
2. **Definir fase P0-P5** com base em sinal + budget + risk appetite.
3. **Instalar Dual-Track** (Content + Comment) desde o começo — mesmo em P1.
4. **Selecionar skills operacionais** apropriadas para a fase (não invocar tudo).
5. **Exit criteria** documentado antes de começar a fase — sem exit, sem próxima fase.
6. **Reports mensais** ao Ronan + gate no final de cada fase.

## Checklist da skill
- [ ] Sinal de mercado avaliado (≥3 verdadeiros para prosseguir)
- [ ] Fase alvo definida (P0/P1/P2/P3/P4/P5) com racional escrito
- [ ] Dual-Track configurado (Content + Comment) — não só Content
- [ ] Exit criteria da fase escrito e mensurável
- [ ] Compliance de categoria mapeado (ICP, CFDA, CIQ, QS, PIPL)
- [ ] Time local ou parceiro TP contratado (não agência ocidental pura)
- [ ] Skills operacionais chamadas conforme fase (não excedente)
- [ ] Segredos no Infisical
- [ ] Gate de fim-de-fase agendado com Ronan

## Handoffs
- **`baidu-seo`**, **`weibo-conteudo`**, **`xiaohongshu-conteudo`**, **`bilibili-conteudo`**,
  **`douyin-conteudo`**, **`kuaishou-conteudo`**, **`wechat-official-account`**,
  **`wecom-private-domain`**, **`zhihu-conteudo`** — skills operacionais por plataforma.
- **`china-ecommerce-ops`** — quando P2+ envolver marketplace.
- **`podcast-china`** — quando thought leadership B2B/tech em P4-P5.
- **Argos** — social listening para Comment Track.
- **Aletheia** — Mom-test com entrevistados chineses em P0.

## Fontes
- China cross-border e-commerce policy (ecomobi.com/china-cross-border-guide)
- PIPL (Personal Information Protection Law): 全国人大 (npc.gov.cn)
- WFOE setup guide (State Administration for Market Regulation): samr.gov.cn
- ICP filing portal: https://beian.miit.gov.cn

---

**Absorção:** cobre MKT-G24 (China Market Localization Strategist — sinal → GTM dual-track) + MKT-G25 (Dual-track analysis: Content + Comment Track) + MKT-G26 (GTM Phase Gates P0-P5).
**Procedência:** Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B02/marketing. Reescrito em pt-BR, sem cópia literal.
