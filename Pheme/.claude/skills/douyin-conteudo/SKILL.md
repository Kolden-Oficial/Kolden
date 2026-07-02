---
name: douyin-conteudo
description: >
  Estratégia de conteúdo para o Douyin (抖音) — a versão chinesa do TikTok, com
  algoritmo próprio, cultura de matriz de tráfego e integração nativa com Douyin Shop
  + Qianchuan (千川, a plataforma de ads). Use quando o pedido envolver "Douyin",
  "抖音", "short-video China", "TikTok China", "Qianchuan", "matriz de tráfego China",
  "viral no Douyin", "Douyin livestream" ou brand launch chinês em vídeo curto. Cobre
  o algoritmo (diferente do TikTok internacional), a estrutura "matrix account", o
  gancho 3-3-3, e handoff para Qianchuan (paid). NÃO é TikTok internacional (esse é
  handoff a `short-video-architect`); NÃO é livestream commerce (essa é `livestream-commerce`).
metadata:
  type: reference
---

# Douyin — short-video viral + matriz de tráfego + Qianchuan

Douyin é o TikTok da China continental, mas com regras próprias: **algoritmo diferente
do TikTok global**, integração vertical com **Douyin Shop** (e-commerce nativo) e
**Qianchuan** (千川 — a plataforma de paid dentro do próprio Douyin). O modelo dominante
de marca de sucesso é uma **matriz de contas** (matrix account), não uma conta única.

## Passo 1 — Entender o algoritmo do Douyin (diferente do TikTok internacional)

Douyin premia sinais em ordem, com maior peso em **completion rate** e **repeat watch**.

**Ondas de distribuição:**
1. **Onda 1 (500-1.000 views)** — cold pool para seguidores + tags. Retenção primeiros
   3s > 65% avança para onda 2.
2. **Onda 2 (5k-10k views)** — tag pool + interest similar. CTR do thumbnail > 8% +
   completion > 40% avança para onda 3.
3. **Onda 3 (50k-500k views)** — explore + interest cross. Interação (like, comment,
   share, save) precisa acumular; se ratio de interação/view > 3-5% mantém em ondas.
4. **Onda 4+ (viral)** — 500k → milhões. Depende de share > save > comment > like.

**Sinais fatais que travam o algoritmo:**
- Duração < 15s + retenção < 60% (algoritmo interpreta como low-quality).
- Watermark de outro app (TikTok, Kuaishou) → penalty imediato.
- Copy de trending audio sem license → shadow-ban.
- Publicação de 5+ vídeos/dia da mesma conta → dilui distribuição.

## Passo 2 — Matriz de tráfego (matrix account)

Marcas competitivas no Douyin operam **3-15 contas simultâneas** com papéis distintos,
não uma conta única. Estrutura padrão:

| Papel | Descrição | Frequência |
|---|---|---|
| **主号 (Main)** | Conta oficial da marca; branding, releases, hero content | 2-3 vídeos/semana |
| **矩阵号 (Matrix — por vertical/produto)** | 3-8 contas de sub-nicho (ex.: "marca X — beleza", "marca X — skincare") | 1 vídeo/dia cada |
| **员工号 (Employee)** | Colaboradores como creators (behind-the-scenes, humanização) | Ad-hoc |
| **达人号 (KOC/creator próprio contratado)** | 2-5 hosts próprios que ganham audiência independente | Diário |
| **直播号 (Live-only)** | Conta dedicada a live commerce diária | Live 6-12h/dia |

**Racional:** cada conta acumula tag + retenção próprias. Se a main é penalizada (censura
ou queda de sinal), matriz continua entregando. Concentração de tráfego em única conta é
frágil.

## Passo 3 — Gancho 3-3-3 e arco viral

Estrutura canônica que maximiza chance de passar as 3 primeiras ondas.

- **3s (0-3s):** Hook agressivo — pergunta polêmica, promessa numérica, reveal invertido,
  contradição visual. Precisa fazer o dedo parar.
- **3s-15s:** Payoff primário — entrega o valor principal em texto+visual denso.
- **15s-30s+:** Amplificação + CTA — segunda camada, prova social, chamada para engajar
  (comment, save, share).

**Duração ótima:**
- 15-30s para viralização máxima (retenção mais fácil).
- 45-60s para conteúdo educacional/thought leadership (aceita se retenção > 55%).
- 60s+ para deep-dive só se creator já tem base de fãs sólida.

## Passo 4 — Elementos on-video obrigatórios

- **Legenda burnt-in** (não confia no auto-caption) — Mandarim, cor de contraste alto,
  bold, top-third ou bottom-third (nunca cobrindo centro).
- **BGM licensed pela biblioteca do Douyin** — nunca importar áudio externo.
- **Ratio 9:16 vertical** — nunca 16:9 ou 1:1.
- **Capa (封面)** — thumbnail estático com texto grande (28-40pt), rosto expressivo,
  cor saturada.
- **Tag (话题) inteligente** — 3 tags: 1 broad (#美妆), 1 mid-tail (#秋冬护肤), 1 branded/
  campaign (#品牌X秋冬季).

## Passo 5 — Douyin Shop + Qianchuan (千川)

**Douyin Shop (抖音小店)** — e-commerce nativo dentro do app. Produto pode ser linkado
diretamente ao vídeo/live (yellow cart 黄色购物车). Comissão típica 2-5%.

**Qianchuan (千川)** — a plataforma de ads que amplifica vídeo orgânico ou live para
audiência interesse-similar. Modelo de bidding por conversão (não por CPM).

**Fluxo canônico "orgânico + pago":**
1. Publica vídeo orgânico. Espera onda 1-2 (24-48h).
2. Se retenção > 55% e ratio de venda orgânica > 2%, injeta Qianchuan para escalar
   para ondas 3-4.
3. Se retenção fica em 40-55%, injeta Qianchuan em teste pequeno (RMB 500-2000) para
   validar; se ROAS > 2.5, escala.
4. Live commerce sempre com Qianchuan on — orgânico raramente escala live em cold-start.

**KPIs Qianchuan:**
- **GPM (GMV per Mille impressions)** — GMV / (impressões / 1000). Metabench: > 5.000
  RMB/1000 imp em beauty; > 3.000 em apparel; > 1.500 em food.
- **ROAS blended** — 3-6x saudável; > 8x é raro fora de hero SKU.
- **CTR de anúncio** — > 6% em feed; > 10% em live cover.

## Passo 6 — Trending audios e desafios (challenges)

- **Trending audio** — top-20 sons trending por semana no explore. Usar dentro de 3-5
  dias do pico; depois já é "velho".
- **Desafios (挑战)** — brand challenges pagos (sticker challenge com KV) ou orgânicos
  (usar hashtag trending já em uso). Sticker challenge oficial custa RMB 300k-3M
  dependendo de escala.
- **Duet + Stitch (合拍/抢镜)** — recurso do Douyin para responder a criador com engagement.
  Use para responder review negativa (public accountability) ou construir sobre viral
  de outro creator.

## Compliance & risco

- **Verificação da conta** — marca opera como "企业号" (enterprise); precisa business
  license chinesa + admin nomeado. Sem verificação, não vende no Douyin Shop.
- **VPN não é canal legítimo** — usar interface oficial ou parceiro MCN autorizado; NÃO
  automatizar publicação com bot (proibido pelas T&C).
- **Censura ativa** — palavras-gatilho (política, saúde não-registrada, medical claims,
  jogos, crypto) removem o vídeo em minutos + rebaixamento da conta. Revisão humana +
  automática. Cursos de "5 palavras que te fazem viralizar" são armadilhas — muitas são
  gatilho de censura.
- **Direitos autorais** — música/imagem sem license = takedown; Douyin tem biblioteca
  própria licenciada, use ela.
- **Segredos** (Qianchuan API, Open Platform tokens) via Infisical.

## Fluxo padrão da skill (resumo)

1. **Diagnóstico**: já temos conta verificada? Matriz atual? Retenção média histórica?
2. **Estrutura de matriz** — desenhar 3-8 contas com papéis distintos.
3. **Roteiro** — gancho 3-3-3 mapeado + BGM licensed + tag correta.
4. **Produção** — legenda burnt-in, capa densa, vertical 9:16.
5. **Publicação draft-first** via ferramenta oficial ou parceiro MCN.
6. **Monitoramento onda 1** (24h): retenção + CTR + interação.
7. **Decisão Qianchuan**: injetar paid conforme regras do Passo 5.
8. **Report semanal** — GPM, ROAS blended, tag saúde da matriz.

## Checklist da skill
- [ ] Conta enterprise verificada
- [ ] Matriz de contas desenhada (3+ contas com papéis distintos)
- [ ] Roteiro com gancho 3s testado + payoff 15s
- [ ] Legenda burnt-in em Mandarim + BGM licensed + capa densa
- [ ] Tags 3-camada (broad + mid + branded)
- [ ] Fluxo orgânico → Qianchuan decidido (thresholds explícitos)
- [ ] Compliance de categoria + copy revisado
- [ ] Credenciais Qianchuan no Infisical
- [ ] Publicação via ferramenta oficial, não automação bloqueada

## Handoffs
- **`livestream-commerce`** — para Douyin live (cross-plataforma).
- **`china-ecommerce-ops`** — quando Douyin Shop for canal primário de venda.
- **`edicao-de-shortvideo`** — pós-produção (CapCut CN — 剪映 — versão China).
- **Caliope + Peitho** — copy do gancho e do Qianchuan; paid strategy para escalar.
- **`kuaishou-conteudo`** — republicar para audiência tier 3-5 (com edição própria).

## Fontes
- Douyin Creator Academy (创作服务平台): https://creator.douyin.com
- Qianchuan (千川) documentation: https://qianchuan.jinritemai.com
- Douyin Shop merchant: https://fxg.jinritemai.com
- Content policy (社区自律公约): https://www.douyin.com/rule/creation

---

**Absorção:** cobre MKT-G31 (Douyin Strategist — short-video viral + matriz de tráfego + Qianchuan).
**Procedência:** Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B02/marketing. Reescrito em pt-BR, sem cópia literal.
