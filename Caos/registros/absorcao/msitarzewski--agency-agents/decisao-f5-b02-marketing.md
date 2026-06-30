# F5 — Decisão de aplicação · B02 Caliope + Pheme + Peitho

> PARA AQUI. Aguardando aprovação Ronan (Art. III da Constituição do Caos).

## TL;DR
- Inventário upstream: **107 IDs** (marketing 83 + paid-media 24) em **43 agentes**.
- Decisão: **13 REUSE / 17 ADAPT / 73 CREATE / 4 DESCARTADO** — todos os 4 descartados são fronteiras com squads fora do B02 (Ariadne e Argos), registrados para revisita em lotes futuros.
- **3 squads tocados:** Caliope (copy), Pheme (social orgânico/descoberta), Peitho (paid).
- Resultado estrutural: **35 skills novas** (5 Caliope + 22 Pheme + 8 Peitho), **6 skills estendidas em Pheme**, **3 agentes Pheme ampliados** e **3 ajustes em agentes/tasks Peitho** + criação do esqueleto `.claude/skills/` em Peitho.
- **Peitho ganha sua primeira camada de habilidades formais** (hoje só tem PRD + agents + tasks).
- **Pheme ganha o "eixo China" completo** (Baidu/Bilibili/Douyin/Kuaishou/WeChat/Weibo/Xiaohongshu/Zhihu + Wechatsync) e o "eixo AEO/GEO/WebMCP" (descoberta na era LLM).

## Plano por squad (F6)

### Caliope — 5 skills novas, 0 estendidas

| skill destino | IDs upstream consolidados | tipo | esqueleto |
|---|---|---|---|
| `aso-app-store` | MKT-G10, G11, G12 | NOVA | gatilhos ("ASO", "App Store Optimization", "screenshots", "ficha de app"); sequência de 5 screenshots; roadmap A/B fásico (icon→desc→screenshots) |
| `ghostwriting-de-livro` | MKT-G17, G18 | NOVA | gatilhos ("co-autoria de livro", "ghostwriting", "thought leadership de livro"); blueprint de capítulo (Promise + 5 batidas); voice protection |
| `script-de-livestream` | MKT-G48 | NOVA | gatilhos ("roteiro de live", "script de live de venda", "livestream commerce"); estrutura 5min (Retention/Pain→Intro/Trust→Price/Urgency→Follow-up); handoff a Pheme/livestream-commerce |
| `pr-comunicacoes-institucionais` | MKT-G54, G55, G56 | NOVA | gatilhos ("press release", "PR", "comunicação de crise", "byline"); protocolo de crise por janelas (30min/2h/ongoing); estrutura jornalística (headline/lead 50w/quotes) |

(MKT-G45 é REUSE puro de `headline-e-hook-testaveis` — nenhuma ação F6.)

### Pheme — 22 skills novas, 5 skills estendidas, 3 agentes ampliados

**Skills NOVAS:**

| skill destino | IDs upstream consolidados | foco |
|---|---|---|
| `aeo-foundations-architect` | MKT-G1, G2, G3 | infraestrutura de descoberta para IA: llms.txt, robots.txt, AI crawlers, scorecard 3 camadas, tiers Markdown/SSR |
| `agentic-search-webmcp` | MKT-G4, G5, G6 | WebMCP, declarativo vs imperativo, friction map por passo |
| `geo-citacoes-ia` | MKT-G7, G8, G9 | AEO/GEO multi-LLM (ChatGPT/Claude/Gemini/Perplexity), Lost Prompt Analysis, padrões de prompt |
| `baidu-seo` | MKT-G13, G14 | ranking Baidu, ICP, mobile-first, ecossistema 百科/知道/贴吧/文库/经验 |
| `bilibili-conteudo` | MKT-G15, G16 | UP主, cultura danmaku, B站 algoritmo, gatilhos de danmaku por timestamp |
| `motor-de-carrossel-autonomo` | MKT-G19, G21 | pipeline TikTok/IG via Gemini + Upload-Post, learnings.json loop |
| `china-ecommerce-ops` | MKT-G22, G23 | Taobao/Tmall/Pinduoduo/JD/Douyin Shop, battle plan 618/Double 11 (T-60→T+1) |
| `china-localizacao-gtm` | MKT-G24, G25, G26 | dual-track Content+Comment, gates GTM P0-P5 |
| `cross-border-ecommerce` | MKT-G28, G29 | Amazon/Shopee/Lazada/AliExpress/Temu/TikTok Shop, scorecard Mercado×Margem×Compliance |
| `douyin-conteudo` | MKT-G31 | short-video viral, matriz de tráfego, Qianchuan |
| `podcast-global` | MKT-G36, G37, G38 | Spotify/Apple/YouTube Podcasts, hook engineering, Feed Drop + N&N + editorial pitch |
| `kuaishou-conteudo` | MKT-G42, G43 | 老铁 grassroots, 下沉, tabela Kuaishou vs Douyin |
| `linkedin-comment-to-pipeline` | MKT-G46 | sistema 5 contas/dia + DM com referência específica |
| `livestream-commerce` | MKT-G47, G49 | host training + ops live room (Douyin/Kuaishou/Taobao/Channels), funil Impressões→Payment |
| `podcast-china` | MKT-G52, G53 | Xiaoyuzhou/Ximalaya, outline por episódio com timestamps |
| `wecom-private-domain` | MKT-G57, G58 | SCRM em YAML, channel codes, tags, group config, Mini Program |
| `reddit-comunidade` | MKT-G60 | engajamento autêntico value-first 90/10, AMA |
| `edicao-de-shortvideo` | MKT-G63, G64, G65 | post-prod CapCut/PR/DaVinci/FCP, árvore de decisão software, mix LUFS por tipo |
| `wechat-official-account` | MKT-G73 | conteúdo + automação + Mini Program + conversão |
| `weibo-conteudo` | MKT-G75, G76, G77 | trending + Super Topics + sentiment + cadência Warm-up→Consolidation + crise Blue/Yellow/Orange/Red |
| `xiaohongshu-conteudo` | MKT-G80 | lifestyle + trend riding + aesthetic storytelling |
| `zhihu-conteudo` | MKT-G82, G83 | Q&A authority + Columns + seleção de perguntas por impacto |

**Skills ESTENDIDAS:**

| skill destino | IDs upstream consolidados | tipo da edição |
|---|---|---|
| `matriz-de-conteudo` | MKT-G41, G66, G68, G70, G74, G81 | anexo "Mixes de mercado" (1/3 IG, 40/30/20/10 TT, 25/20/20/15/10/10 X, 60/30/10 WeChat, 70/20/10 XHS, employee advocacy) |
| `sequencia-de-nutricao` | MKT-G33, G35 | §"Deliverability post-MPP + GDPR + Brevo" + anexo "Mapa CRM↔ESP (LANGUAGE/STATUS/TRANSACTION)" |
| `ciclo-de-vida-e-retencao` | MKT-G59 | §"Lifecycle de e-commerce (new_customer/repurchase/dormant/churn_warning)" |
| `publicacao-social` | MKT-G50, G51 | §"Canal China (draft-first via Wechatsync/xhs-mcp/biliup — 19+ plataformas)" + anexo "Matriz de fit plataforma×conteúdo (✅/⚠️/❌)" |
| `programa-de-indicacao` | MKT-G39 | §"Quadro Growth (AARRR + LTV/CAC + north-star + experiment cadence)" |

**Agentes ampliados:**

| agente destino | IDs upstream | tipo da edição |
|---|---|---|
| `Pheme/agents/carousel-architect.md` | MKT-G20 | adicionar arco oficial de 6 slides (Hook→Problem→Agitation→Solution→Feature→CTA) ao framework do agente |
| `Pheme/agents/short-video-architect.md` | MKT-G32 | §"Script viral 3 fases (3s/4-20s/21-30s)" |
| `Pheme/agents/youtube-strategist.md` | MKT-G72 | §"Template de audit de vídeo (Packaging/Structure-Chaptering/SEO-Metadata)" |

### Peitho — 8 skills novas (esqueleto `.claude/skills/` criado), 3 ajustes em agentes/tasks

**Pré-requisito de F6:** criar `Peitho/.claude/skills/` + `catalogo.md` (Peitho hoje não tem essa camada).

**Skills NOVAS:**

| skill destino | IDs upstream consolidados | foco |
|---|---|---|
| `auditoria-forense-200-checkpoints` | PM-G1, G2, G3 | checklist 200+ pontos com severidade (crítico/alto/médio/baixo) + impacto $/mês + forense change-history |
| `criativo-como-hipotese-rsa-pmax` | PM-G5, G6 | criativo paid = hipótese testável; RSA 15 headlines + pin strategy + ângulos PMax |
| `paid-social-cross-platform` | PM-G9, G10 | full-funnel Meta/LI/TT/Pin/X/Snap, supressão cruzada de audiência |
| `incrementalidade-cross-channel` | PM-G12, G15 | validação incrementalidade social ↔ search/display, geo-split, holdout, matched market |
| `arquitetura-enterprise-ppc` | PM-G13, G14 | conta PPC enterprise $10K-$10M, tier brand/non-brand/competitor/conquest, isolamento |
| `programatica-e-display` | PM-G17, G18, G19 | GDN/DV360/TTD/partner media/ABM, AMP (25+ parceiros), managed placements por vertical |
| `search-query-analise` | PM-G20, G21, G22 | mineração SQR, n-gram, taxonomia negativas, query→intent, framework SQOS |
| `amazon-ppc` | MKT-G30 | Amazon PPC fásico (Launch/Growth/Mature) com ACOS/TACOS targets |

**Ajustes em agentes/tasks existentes:**

| destino | IDs upstream | tipo da edição |
|---|---|---|
| `Peitho/agents/ads-analyst.md` | PM-G4 | §"Tradução técnica→negócio (template stakeholder + linguagem)" |
| `Peitho/agents/ad-midas.md` | PM-G7 | §"Iteração 20+ variações por brief" |
| `Peitho/tasks/setup-tracking.md` | PM-G16, G23 | §"Hierarquia alimenta smart-bidding (sinais primário/secundário/micro)" + §"Consent Mode v2 + GDPR + privacy-sandbox" |

## Reconciliação prevista (F6.5)

Invariante (Art. VIII / `protocolo-de-absorcao-sem-perda`): `count(ABSORVIDO) + count(DESCARTADO) + count(PERDIDO) == 107`.

| status | total |
|---|---|
| ABSORVIDO (REUSE + ADAPT + CREATE) | 103 |
| DESCARTADO (fronteira inter-squad documentada) | 4 |
| PERDIDO | 0 |
| **Soma** | **107** ✅ |

**DESCARTADOS** com motivo registrado:
- MKT-G61, MKT-G62 → fronteira **Ariadne** (SEO técnico + canibalização). Reservados a um lote futuro Ariadne.
- MKT-G78, MKT-G79 → fronteira **Argos** (inteligência X/Twitter evidence-first). Reservados a um lote futuro Argos.

PERDIDO = 0 — cada ID tem decisão e ação F6 explícitas.

## Invariantes a preservar

- **PT-BR estrito** em todos os artefatos novos (skills, anexos, ajustes de agentes, catálogo Peitho). Termos em inglês só quando o ecossistema impuser (e.g. RSA, PMax, CAPI, GTM, GDN, DV360, TTD, ACOS/TACOS, AEO, GEO, WebMCP).
- **Atribuição MIT central** na ingestão (Art. VIII):
  - `Caliope/_origem.md` — adicionar entrada `msitarzewski--agency-agents@a597cb6` listando os 10 IDs MKT roteados.
  - `Pheme/_origem.md` — adicionar entrada com os 73 IDs MKT roteados.
  - `Peitho/_origem.md` — adicionar entrada com os 24 IDs PM + 1 MKT (G30) roteados.
- **Maturity ≥ 7.0** por skill nova/estendida (gate da Fase 7 — testador). Toda skill nova precisa: gatilhos claros (descoberta-de-skill ≥ 7/10), pelo menos um teste em A/B (validacao-de-skill), e fontes ≥ 7/10 quando puxar técnicas externas (busca-de-referencias).
- **Infisical obrigatório** para qualquer credencial que apareça em skill nova (Wechatsync, xhs-mcp, biliup, Upload-Post, Gemini API, Speechmatics, plataformas chinesas) — Art. VII.
- **Catálogos atualizados** ao final de F6:
  - `Caliope/.claude/skills/catalogo.md` ganha 4 linhas (5 ASOs/livro/livestream/PR — `aso-app-store` lista 1 entrada que cobre G10+G11+G12 com 3 seções).
  - `Pheme/.claude/skills/catalogo.md` reescrito em 3 blocos: "Conteúdo & social" (atual) + "Eixo China" (novo) + "Eixo descoberta IA / AEO-GEO" (novo).
  - `Peitho/.claude/skills/catalogo.md` criado do zero com as 8 entradas.
- **Fronteiras inter-squad explícitas** em cada skill nova com handoff:
  - `Caliope:script-de-livestream` → handoff a `Pheme:livestream-commerce` (estrutura visual + ops).
  - `Pheme:geo-citacoes-ia` → futuro handoff a `Ariadne:e-e-a-t` quando lote Ariadne acontecer (declarar interface no header da skill).
  - `Pheme:reddit-comunidade` → eventual handoff a `Argos` para social listening adversarial (registrar no MEMORY.md do Pheme).
- **Ledger atualizado**: `Caos/dados/repositorios-absorvidos.yaml` ganha o bucket B02 com timestamps F4/F5 e a contagem 107=103+4+0.

## Próximo passo

Aguardo OK do Ronan para executar **F6 do bucket B02** (aplicação): construção/edição das 35 skills + 6 estendidas + 6 agentes ampliados, com gate de qualidade N0→N6 da cascata da Fase 5 (Constituição v2.2.0). Após F6, executar **F6.5** (reconciliação anti-perda) e **F7** (registro no ledger + memória).

Buckets paralelos abertos: B03 (Prometeu+Dedalo) e B15 (Specialized) estão em F4+F5 separado; consolidação executiva final ocorre no F5 consolidado dos 15 buckets.
