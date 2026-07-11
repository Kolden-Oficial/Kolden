---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/msitarzewski--agency-agents/_indice|_indice]]"
---

# F4 — Mapa de decisão · B02 Caliope + Pheme + Peitho

Inventários upstream: 107 IDs (marketing 83 + paid-media 24).
Squads-alvo: Caliope (copy), Pheme (social orgânico), Peitho (paid).

**Regra:** REUSE só com diff técnica-a-técnica. Sem match concreto = ADAPT ou CREATE.

**Convenção de prefixos** (para evitar colisão entre os dois inventários):
- `MKT-G1..G83` → IDs do `inventario-marketing.md`.
- `PM-G1..G24` → IDs do `inventario-paid-media.md`.

| ID upstream | capacidade | squad_alvo | decisao | match_kolden | justificativa | acao_f6 |
|---|---|---|---|---|---|---|
| MKT-G1 | Arquiteto de fundações AEO (infra de descoberta/parseabilidade/capacidade para IA) | pheme | CREATE | — | Pheme cuida do orgânico e do "ser falada"; AEO/citação por IA é o orgânico-da-era-LLM. Caliope é copy de produto, não arquitetura de descoberta. | criar skill `aeo-foundations-architect` em Pheme/.claude/skills/ |
| MKT-G2 | Scorecard AEO 3 camadas (0-12) | pheme | CREATE | — | Sem scorecard AEO no Pheme; score-de-post mede engajamento da própria conta, não descoberta IA. | embutir na nova skill `aeo-foundations-architect` (seção scorecard) |
| MKT-G3 | Tiers de disponibilidade de conteúdo (Markdown/HTML/SSR/SPA/PDF) | pheme | CREATE | — | Capacidade ausente no Pheme; é parte da fundação AEO. | embutir na nova skill `aeo-foundations-architect` (seção tiers) |
| MKT-G4 | Otimizador de busca agêntica (WebMCP) | pheme | CREATE | — | Nicho IA-agêntico; Pheme é o squad de descoberta/orgânico, sem cobertura WebMCP. | criar skill `agentic-search-webmcp` em Pheme/.claude/skills/ |
| MKT-G5 | Framework Declarativo vs Imperativo (WebMCP) | pheme | CREATE | — | Sub-técnica do WebMCP; nada no Pheme. | embutir em `agentic-search-webmcp` |
| MKT-G6 | Friction Map por passo da jornada do agente IA | pheme | CREATE | — | Mapa de fricção específico de agentes IA; ausente. | embutir em `agentic-search-webmcp` |
| MKT-G7 | Estrategista de citações IA (AEO/GEO multi-LLM) | pheme | CREATE | — | Não há nada de citação por ChatGPT/Claude/Gemini/Perplexity no Pheme. | criar skill `geo-citacoes-ia` em Pheme/.claude/skills/ |
| MKT-G8 | Lost Prompt Analysis com fix pack | pheme | CREATE | — | Técnica de auditoria de citações perdidas; nova. | embutir em `geo-citacoes-ia` |
| MKT-G9 | Engenharia de padrões de prompt (Best/X vs Y/How to choose) → conteúdo | pheme | CREATE | — | Mapeia padrões de prompt em estrutura de conteúdo; nova. | embutir em `geo-citacoes-ia` |
| MKT-G10 | App Store Optimizer (ASO + CRO de listagens) | caliope | CREATE | — | Caliope cobre copy de vendas mas não ASO; é copy/CRO de listagem de app, fit copy. | criar skill `aso-app-store` em Caliope/.claude/skills/ |
| MKT-G11 | Sequência de 5 screenshots (Hero/Features/Social/Promo) | caliope | CREATE | — | Estrutura visual+copy de screenshots; nova no Caliope. | embutir em `aso-app-store` (seção screenshots) |
| MKT-G12 | Roadmap fásico de testes A/B (icon→desc→screenshots) | caliope | CREATE | — | Roadmap A/B específico de ASO; nova. | embutir em `aso-app-store` (seção testes) |
| MKT-G13 | Baidu SEO Specialist (ICP, baiduspider, mobile-first) | pheme | CREATE | — | Cobertura China zero no Pheme; é orgânico/descoberta. Caliope não faz SEO. | criar skill `baidu-seo` em Pheme/.claude/skills/ |
| MKT-G14 | Mapa de presença no ecossistema Baidu (百科/知道/贴吧/文库/经验) | pheme | CREATE | — | Sub-técnica Baidu. | embutir em `baidu-seo` |
| MKT-G15 | Bilibili Content Strategist (UP主, danmaku) | pheme | CREATE | — | Plataforma chinesa ausente. | criar skill `bilibili-conteudo` em Pheme/.claude/skills/ |
| MKT-G16 | Danmaku Engagement Design (gatilhos por timestamp) | pheme | CREATE | — | Sub-técnica Bilibili. | embutir em `bilibili-conteudo` |
| MKT-G17 | Book Co-Author (thought-leadership ghostwriting) | caliope | CREATE | — | Caliope é copy de venda; ghostwriting de livro é trabalho de longo formato, fit no squad de copy. | criar skill `ghostwriting-de-livro` em Caliope/.claude/skills/ |
| MKT-G18 | Chapter Blueprint (Promise + 5 batidas) | caliope | CREATE | — | Sub-técnica de livro. | embutir em `ghostwriting-de-livro` |
| MKT-G19 | Carousel Growth Engine (TikTok/IG autônomo via Gemini+Upload-Post) | pheme | ADAPT | Pheme/.claude/skills/matriz-de-conteudo/SKILL.md + agente `carousel-architect` | matriz-de-conteudo gera ideias e carousel-architect produz carrossel humano; o motor autônomo (loop+learnings.json+upload) é uma camada nova. | criar skill `motor-de-carrossel-autonomo` em Pheme/ + handoff a `carousel-architect` |
| MKT-G20 | Arco narrativo de carrossel 6 slides (Hook→PAS→Solution→Feature→CTA) | pheme | REUSE | Pheme/agents/carousel-architect.md (PAS+arco em carrossel) + Caliope/.claude/skills/headline-e-hook-testaveis/SKILL.md | Pheme já tem carousel-architect com framework PAS; arco de 6 slides é apenas a versão materializada do que o agente já entrega. | ampliar `carousel-architect.md` citando arco de 6 slides como variante oficial |
| MKT-G21 | Loop de auto-otimização (learnings.json) | pheme | CREATE | — | Mecânica self-optimizing inexistente em Pheme; não é métrica humana, é loop algoritmo. | embutir em `motor-de-carrossel-autonomo` (seção loop) |
| MKT-G22 | China E-Commerce Operator (Taobao/Tmall/PDD/JD/Douyin Shop) | pheme | CREATE | — | E-commerce China é orgânico + ops; Pheme cobre orgânico, sem nada de China e-com. | criar skill `china-ecommerce-ops` em Pheme/.claude/skills/ |
| MKT-G23 | Battle plan 618/Double 11 (T-60/T-30/T-7/T-day/T+1) | pheme | CREATE | — | Faseamento de campanha sazonal China; sub-técnica. | embutir em `china-ecommerce-ops` (seção battle plan) |
| MKT-G24 | China Market Localization Strategist (sinal→GTM dual-track) | pheme | CREATE | — | Estratégia de localização China; transversal a todas as plataformas chinesas. | criar skill `china-localizacao-gtm` em Pheme/.claude/skills/ |
| MKT-G25 | Dual-track analysis (Content + Comment Track) | pheme | CREATE | — | Sub-técnica de localização. | embutir em `china-localizacao-gtm` |
| MKT-G26 | GTM Phase Gates P0-P5 (China) | pheme | CREATE | — | Gates fásicos GTM China; sub-técnica. | embutir em `china-localizacao-gtm` |
| MKT-G27 | Content Creator multi-plataforma (editorial + brand storytelling + SEO) | pheme | REUSE | Pheme/.claude/skills/matriz-de-conteudo/SKILL.md + .claude/skills/fundacao-de-voz/SKILL.md + agente `content-strategist` | Pheme já tem o trio fundacao-de-voz + matriz-de-conteudo + content-strategist que cobre exatamente editorial multi-plataforma + brand storytelling. | nenhuma — capacidade já presente |
| MKT-G28 | Cross-Border E-Commerce Specialist (Amazon/Shopee/Lazada/Temu/AliExpress) | pheme | CREATE | — | E-commerce cross-border (não China) é capacidade ausente no Pheme. | criar skill `cross-border-ecommerce` em Pheme/.claude/skills/ |
| MKT-G29 | Scorecard de avaliação de produto cross-border (Mercado × Margem × Compliance) | pheme | CREATE | — | Sub-técnica cross-border. | embutir em `cross-border-ecommerce` (seção scorecard) |
| MKT-G30 | Framework Amazon PPC fásico (Launch/Growth/Mature) ACOS/TACOS | peitho | CREATE | — | Amazon PPC é tráfego pago em marketplace; Peitho cobre Google/Meta/YT/TT/LI, sem Amazon. | criar skill `amazon-ppc` em Peitho/.claude/skills/ |
| MKT-G31 | Douyin Strategist (short-video viral + livestream + Qianchuan) | pheme | CREATE | — | Douyin é orgânico chinês — squad Pheme. (Qianchuan paga é referenciada mas o núcleo é orgânico+livestream commerce.) | criar skill `douyin-conteudo` em Pheme/.claude/skills/ |
| MKT-G32 | Viral script 3 fases (3s hook → pain+solution → wrap+hook) | pheme | ADAPT | Pheme/agents/short-video-architect.md (gancho 3s, retenção, roteiro) | short-video-architect já cobre gancho 3s e roteiro; estrutura específica viral-script-3-fases é uma variante mensurável. | adicionar §"Script viral 3 fases" em `short-video-architect.md` |
| MKT-G33 | Email Marketing Strategist (CRM-driven, lifecycle, post-MPP) | pheme | ADAPT | Pheme/.claude/skills/sequencia-de-nutricao/SKILL.md + .claude/skills/ciclo-de-vida-e-retencao/SKILL.md | Pheme já cobre sequência de nutrição e ciclo de vida; deliverability/MPP/GDPR/Brevo é sub-capacidade ausente. | adicionar §"Deliverability post-MPP + GDPR + atributos CRM↔ESP" em `sequencia-de-nutricao` |
| MKT-G34 | Spec de sequência (trigger/segment/exit/A-B subject/targets) | pheme | REUSE | Pheme/.claude/skills/sequencia-de-nutricao/SKILL.md | sequencia-de-nutricao já define gatilho, cadência, condições de saída, assunto+preview e copy. | nenhuma — capacidade já presente |
| MKT-G35 | Mapa de atributos CRM↔ESP (LANGUAGE/STATUS/TRANSACTION) | pheme | CREATE | — | Mapa concreto de atributos numéricos para sincronizar CRM-ESP; ausente. | embutir em `sequencia-de-nutricao` (anexo CRM↔ESP) |
| MKT-G36 | Global Podcast Strategist (Spotify/Apple/YouTube + show bible) | pheme | CREATE | — | Podcast como canal ausente no Pheme. | criar skill `podcast-global` em Pheme/.claude/skills/ |
| MKT-G37 | Hook engineering por episódio (Problem-First/Cliffhanger/Chapter/Cold Open) | pheme | CREATE | — | Sub-técnica podcast. | embutir em `podcast-global` |
| MKT-G38 | Algorithmic growth (Feed Drop/New&Noteworthy/Spotify editorial/YouTube full-funnel) | pheme | CREATE | — | Sub-técnica podcast. | embutir em `podcast-global` |
| MKT-G39 | Growth Hacker (aquisição experimental, viral loops, K-factor, LTV/CAC) | pheme | ADAPT | Pheme/.claude/skills/programa-de-indicacao/SKILL.md (coeficiente K + loops) + .claude/skills/motor-de-lancamento/SKILL.md | programa-de-indicacao já cobre loop viral + K; motor-de-lancamento cobre experimentação; LTV/CAC e north-star de growth não estão explicitados. | adicionar §"Quadro Growth (LTV/CAC, AARRR, north-star, experiment cadence)" em `programa-de-indicacao` |
| MKT-G40 | Instagram Curator (storytelling visual, multi-formato, social commerce) | pheme | REUSE | Pheme/agents/short-video-architect.md + carousel-architect.md + content-strategist.md + publisher.md | Pheme já tem cobertura IG plena (Reels via short-video-architect, Carrossel via carousel-architect, planejamento via content-strategist, publicação via publisher). | nenhuma — capacidade já presente |
| MKT-G41 | Regra 1/3 de mix de conteúdo (Brand/Educational/Community) | pheme | ADAPT | Pheme/.claude/skills/matriz-de-conteudo/SKILL.md (pilares × formatos) | matriz-de-conteudo cruza pilares × formatos mas não fixa a regra 1/3 IG; é uma calibração da saída. | adicionar §"Mixes de mercado (1/3 IG · 40-30-20-10 TikTok · 25/20/20/15/10/10 X · 70/20/10 XHS · 60/30/10 WeChat)" em `matriz-de-conteudo` |
| MKT-G42 | Kuaishou Strategist (老铁 grassroots + livestream + 下沉) | pheme | CREATE | — | Plataforma chinesa Kuaishou ausente. | criar skill `kuaishou-conteudo` em Pheme/.claude/skills/ |
| MKT-G43 | Tabela comparativa Kuaishou vs Douyin | pheme | CREATE | — | Sub-técnica de diferenciação plataforma. | embutir em `kuaishou-conteudo` |
| MKT-G44 | LinkedIn Content Creator (thought leadership + inbound) | pheme | REUSE | Pheme/agents/linkedin-x-authority.md | linkedin-x-authority já cobre autoridade B2B + threads + texto LinkedIn. | nenhuma — capacidade já presente |
| MKT-G45 | Hook 3 variantes (Curiosity Gap/Bold Claim/Specific Story) | caliope | REUSE | Caliope/.claude/skills/headline-e-hook-testaveis/SKILL.md | headline-e-hook-testaveis gera 5-10 hooks por famílias de fórmula com scoring; cobre as 3 variantes upstream e vai além. | nenhuma — capacidade já presente |
| MKT-G46 | Comment-to-pipeline (5 contas/dia + DM com referência) | pheme | CREATE | — | Mecânica outbound LinkedIn (engagement → DM); não está coberta. | criar skill `linkedin-comment-to-pipeline` em Pheme/.claude/skills/ |
| MKT-G47 | Livestream Commerce Coach (Douyin/Kuaishou/Taobao/Channels) | pheme | CREATE | — | Livestream commerce ausente; é um canal próprio. | criar skill `livestream-commerce` em Pheme/.claude/skills/ |
| MKT-G48 | Script single-product em 5 min (Retention/Pain→Intro/Trust→Price/Urgency→Follow-up) | caliope | CREATE | — | Roteiro de copy de venda em livestream; fit Caliope (script de venda falada). Co-uso com Pheme/livestream-commerce. | criar skill `script-de-livestream` em Caliope/.claude/skills/ |
| MKT-G49 | Funil de conversão de livestream (Impressões→Entradas→Watch>30s→Cart→Order→Payment) | pheme | CREATE | — | Funil específico de livestream; medição. | embutir em `livestream-commerce` (seção funil) |
| MKT-G50 | Multi-Platform Publisher (Wechatsync + xhs-mcp + biliup — 19+ plataformas China) | pheme | ADAPT | Pheme/.claude/skills/publicacao-social/SKILL.md + agente `publisher` | publicacao-social cobre Postiz/GHL para redes ocidentais; canais China (Wechatsync/xhs-mcp/biliup) são adições. | adicionar §"Canal China (draft-first via Wechatsync/xhs-mcp/biliup)" em `publicacao-social` |
| MKT-G51 | Matriz de fit plataforma×conteúdo (✅/⚠️/❌) | pheme | CREATE | — | Matriz de pre-publish decision; útil e ausente. | embutir em `publicacao-social` (anexo matriz de fit) |
| MKT-G52 | Podcast Strategist China (Xiaoyuzhou/Ximalaya) | pheme | CREATE | — | Variante China de podcast. | criar skill `podcast-china` em Pheme/.claude/skills/ |
| MKT-G53 | Outline de gravação (Opening/Part1-3/Wrap-Up + timestamps) | pheme | CREATE | — | Sub-técnica podcast. | embutir em `podcast-china` (e referenciar em `podcast-global`) |
| MKT-G54 | PR & Communications Manager (media relations, press release, crisis, byline) | caliope | CREATE | — | PR/crisis comms é redação institucional; fit Caliope (copy institucional). Pheme cobre social, não imprensa. | criar skill `pr-comunicacoes-institucionais` em Caliope/.claude/skills/ |
| MKT-G55 | Protocolo de resposta a crise por janelas (30min/2h/ongoing) | caliope | CREATE | — | Sub-técnica PR. | embutir em `pr-comunicacoes-institucionais` |
| MKT-G56 | Estrutura de press release jornalística (headline/lead 50w/quotes/forward) | caliope | CREATE | — | Sub-técnica PR. | embutir em `pr-comunicacoes-institucionais` |
| MKT-G57 | Private Domain Operator (WeCom SCRM + comunidades + Mini Program + lifecycle) | pheme | CREATE | — | Ecossistema WeCom (lado China do CRM/lifecycle) ausente; fit Pheme (lifecycle). | criar skill `wecom-private-domain` em Pheme/.claude/skills/ |
| MKT-G58 | Configuração SCRM em YAML (channel codes/tags/groups) | pheme | CREATE | — | Sub-técnica WeCom. | embutir em `wecom-private-domain` |
| MKT-G59 | Lifecycle automation (new/repurchase/dormant/churn_warning) | pheme | ADAPT | Pheme/.claude/skills/ciclo-de-vida-e-retencao/SKILL.md (churn, dunning, win-back) | ciclo-de-vida-e-retencao já cobre churn/recuperação; lifecycle de e-commerce (repurchase/dormant) é variante. | adicionar §"Lifecycle de e-commerce (new_customer/repurchase/dormant)" em `ciclo-de-vida-e-retencao` |
| MKT-G60 | Reddit Community Builder (value-first 90/10, AMA) | pheme | CREATE | — | Reddit ausente no Pheme. | criar skill `reddit-comunidade` em Pheme/.claude/skills/ |
| MKT-G61 | SEO Specialist (técnico + conteúdo + autoridade + SERP + cannibalization) | pheme | DESCARTADO | — | **Redundância com Ariadne** (squad de SEO dedicado da Kolden tem ariadne-chief + estrategista-de-conteudo-seo + auditor-tecnico-seo). Bucket B02 não invade Ariadne. | nenhuma — fora de escopo do B02; reservado a B-Ariadne se houver lote SEO |
| MKT-G62 | Auditoria de canibalização cross-page (gate antes de on-page) | pheme | DESCARTADO | — | Idem MKT-G61; SEO técnico é Ariadne. | nenhuma — reservado à Ariadne |
| MKT-G63 | Short-Video Editing Coach (full post-prod CapCut/PR/DaVinci/FCP) | pheme | CREATE | — | Pós-produção de vídeo (editoria, color, áudio) ausente — Pheme cobre roteiro mas não edição. | criar skill `edicao-de-shortvideo` em Pheme/.claude/skills/ |
| MKT-G64 | Árvore de decisão de software de edição (CapCut/PR/DaVinci/FCP) | pheme | CREATE | — | Sub-técnica de edição. | embutir em `edicao-de-shortvideo` |
| MKT-G65 | Mix de mixagem por tipo de vídeo (voz/BGM/SFX/LUFS) | pheme | CREATE | — | Sub-técnica de áudio. | embutir em `edicao-de-shortvideo` |
| MKT-G66 | Social Media Strategist cross-platform (LinkedIn/X + thought leadership + employee advocacy) | pheme | REUSE | Pheme/agents/linkedin-x-authority.md + content-strategist.md + social-chief.md | Pheme já é exatamente um social media strategist cross-platform; tier 1A/1C cobrem isso. Employee advocacy é caso de uso da matriz. | adicionar §"Employee advocacy mix" em `matriz-de-conteudo` (junto com MKT-G41) |
| MKT-G67 | TikTok Strategist (viral + algorithm + creator partnerships) | pheme | REUSE | Pheme/agents/short-video-architect.md + content-strategist.md | short-video-architect já é TikTok strategist (gancho 3s, retenção, roteiro, trends). | nenhuma — capacidade já presente |
| MKT-G68 | Mix 40/30/20/10 (Edu/Ent/Insp/Promo) TikTok | pheme | ADAPT | Pheme/.claude/skills/matriz-de-conteudo/SKILL.md | Sub-técnica do mix de conteúdo; entra no anexo de mixes (já mencionado em MKT-G41). | consolidar com MKT-G41 e MKT-G66 num único anexo "Mixes de mercado" |
| MKT-G69 | Twitter/X Engager (real-time, threads, Spaces, crisis) | pheme | REUSE | Pheme/agents/linkedin-x-authority.md | linkedin-x-authority cobre threads e texto X com autoridade. Spaces é gap menor (audio live no X). | nenhuma — capacidade essencial já presente; Spaces fica em backlog |
| MKT-G70 | Mix 25/20/20/15/10/10 Twitter (Threads/Stories/Comm/Eng/Promo/Ent) | pheme | ADAPT | Pheme/.claude/skills/matriz-de-conteudo/SKILL.md | Idem MKT-G68. | consolidar no anexo "Mixes de mercado" |
| MKT-G71 | Video Optimization Specialist (YouTube CTR + retenção + chaptering + thumbnails) | pheme | REUSE | Pheme/agents/youtube-strategist.md | youtube-strategist cobre Shorts+longo, títulos, thumbs, SEO YouTube. CTR/retenção é o cerne dele. | nenhuma — capacidade já presente |
| MKT-G72 | Template de audit de vídeo (Packaging/Structure-Chaptering/SEO-Metadata) | pheme | ADAPT | Pheme/agents/youtube-strategist.md | youtube-strategist faz a otimização mas não tem template de audit nomeado. | adicionar §"Template de audit de vídeo (3 camadas)" em `youtube-strategist.md` |
| MKT-G73 | WeChat OA Manager (content + automação + Mini Program + conversão) | pheme | CREATE | — | WeChat Official Account é canal próprio na China; ausente. | criar skill `wechat-official-account` em Pheme/.claude/skills/ |
| MKT-G74 | Regra 60/30/10 (value/community/promo) WeChat | pheme | ADAPT | Pheme/.claude/skills/matriz-de-conteudo/SKILL.md | Mix WeChat consolidado no anexo "Mixes de mercado". | consolidar no anexo "Mixes de mercado" |
| MKT-G75 | Weibo Strategist (trending + Super Topics + sentiment + ads) | pheme | CREATE | — | Plataforma chinesa Weibo ausente. | criar skill `weibo-conteudo` em Pheme/.claude/skills/ |
| MKT-G76 | Cadência de trending topic (Warm-up/Ignition/Amplification/Consolidation) + KOL tiers | pheme | CREATE | — | Sub-técnica Weibo. | embutir em `weibo-conteudo` |
| MKT-G77 | Playbook de crise Weibo (Blue/Yellow/Orange/Red + SLAs) | pheme | CREATE | — | Sub-técnica Weibo (crise dentro da plataforma). | embutir em `weibo-conteudo` |
| MKT-G78 | X/Twitter Intelligence Analyst (evidence-first research + competitor intel) | pheme | DESCARTADO | — | **Redundância com Argos** (squad de inteligência/research da Kolden cobre social listening + evidence-first + monitoring). Não invadir Argos. | nenhuma — reservado à Argos |
| MKT-G79 | Brief de inteligência (signal timeline) | pheme | DESCARTADO | — | Idem MKT-G78. | nenhuma — reservado à Argos |
| MKT-G80 | Xiaohongshu Specialist (lifestyle + trend riding + aesthetic) | pheme | CREATE | — | Plataforma chinesa Xiaohongshu ausente. | criar skill `xiaohongshu-conteudo` em Pheme/.claude/skills/ |
| MKT-G81 | Mix 70/20/10 Xiaohongshu (lifestyle/trend/brand) | pheme | ADAPT | Pheme/.claude/skills/matriz-de-conteudo/SKILL.md | Mix XHS consolidado no anexo "Mixes de mercado". | consolidar no anexo "Mixes de mercado" |
| MKT-G82 | Zhihu Strategist (knowledge + Q&A + Columns) | pheme | CREATE | — | Plataforma chinesa Zhihu ausente. | criar skill `zhihu-conteudo` em Pheme/.claude/skills/ |
| MKT-G83 | Seleção de perguntas por critério de impacto (lead/authority/eng) | pheme | CREATE | — | Sub-técnica Zhihu. | embutir em `zhihu-conteudo` |
| PM-G1 | Auditoria forense paid-media (Google/MS/Meta) — 200+ checkpoints, severidade | peitho | ADAPT | Peitho/tasks/audit-ad-account.md + agents/ads-analyst.md | audit-ad-account.md tem scorecard 8-dim e 5 listas (matar/escalar/corrigir/testar/construir). Os 200+ checkpoints + severidade nomeada (crítico/alto/médio/baixo) + impacto $/mês são expansão sistemática. | criar skill `auditoria-forense-200-checkpoints` em Peitho/.claude/skills/ (estende a task) |
| PM-G2 | Checklist de 200+ pontos com severidade + impacto | peitho | CREATE | — | Lista canônica nomeada que falta no Peitho. | embutir em `auditoria-forense-200-checkpoints` (anexo de checkpoints) |
| PM-G3 | Forense de change history (mudança→degradação) | peitho | CREATE | — | Capacidade de RCA temporal ausente; ads-analyst pontua estado, não correlaciona mudança→queda. | embutir em `auditoria-forense-200-checkpoints` (seção change-history) |
| PM-G4 | Executive summary técnico→negócio | peitho | ADAPT | Peitho/agents/ads-analyst.md (audit_report_structure.executive_summary) | ads-analyst já produz exec summary; padrão de tradução técnica→stakeholder está implícito mas não nomeado. | adicionar §"Tradução técnica→negócio (template stakeholder)" em `ads-analyst.md` |
| PM-G5 | Estratégia criativa paid (RSA, Meta, PMax) como hipótese testável | peitho | ADAPT | Peitho/agents/ad-midas.md + creative-analyst.md + tasks/create-ad-creative.md | ad-midas faz conceitos/roteiros/hooks/matrizes de teste; o framing "criativo = hipótese testável em bidding automatizado" é o ponto novo. | criar skill `criativo-como-hipotese-rsa-pmax` em Peitho/.claude/skills/ |
| PM-G6 | RSA 15 headlines (marca/benefício/feature/CTA/prova) + pin strategy | peitho | CREATE | — | RSA específico do Google Ads; nada nomeado em Peitho fora do kasim-aslam genérico. | embutir em `criativo-como-hipotese-rsa-pmax` (seção RSA) |
| PM-G7 | 20+ variações de anúncio a partir de um brief | peitho | ADAPT | Peitho/agents/ad-midas.md | ad-midas já trabalha em matriz de teste; quantidade 20+ por brief é uma calibração. | adicionar §"Iteração 20+ variações por brief" em `ad-midas.md` |
| PM-G8 | Fadiga criativa por queda de CTR + limiar de impressão | peitho | REUSE | Peitho/agents/creative-analyst.md (fadiga, decomposição, testes) + ads-analyst.md (audience_health.frequency_abuse) | creative-analyst tem fadiga e ads-analyst tem abuso de frequência (5+ exibições sem resultado). Cobre limiar + queda de CTR. | nenhuma — capacidade já presente |
| PM-G9 | Paid social cross-platform full-funnel (Meta/LI/TT/Pin/X/Snap) + CAPI | peitho | ADAPT | Peitho/agents/molly-pittman.md + ralph-burns.md + pixel-specialist.md | Pittman/Burns dominam Meta full-funnel; LinkedIn/TikTok/X paid e Pinterest/Snap não têm agente próprio. CAPI já é coberto pelo pixel-specialist. | criar skill `paid-social-cross-platform` em Peitho/.claude/skills/ (consolida Pin/Snap e operacionaliza cross-platform) |
| PM-G10 | Supressão cruzada de audiência cross-platform (frequência) | peitho | CREATE | — | Supressão cross-platform específica; ads-analyst trata sobreposição dentro de uma conta, não entre plataformas. | embutir em `paid-social-cross-platform` |
| PM-G11 | CAPI / server-side multi-plataforma + dedup browser+server | peitho | REUSE | Peitho/agents/pixel-specialist.md + tasks/setup-tracking.md (CAPI + Conversions API + Events API + Enhanced Conv + dedup) | setup-tracking.md já documenta Meta CAPI, Google Enhanced Conversions, TikTok Events API e dedup. | nenhuma — capacidade já presente |
| PM-G12 | Incrementalidade social cruzando Search/Display (anti-dupla-contagem) | peitho | CREATE | — | Validação de incrementalidade ausente nas tasks atuais. | criar skill `incrementalidade-cross-channel` em Peitho/.claude/skills/ |
| PM-G13 | Arquitetura enterprise PPC (Google/MS/Amazon) — $10K a $10M/mês | peitho | ADAPT | Peitho/agents/kasim-aslam.md (Solutions 8) + media-buyer.md | kasim-aslam cobre Google Ads metodologia; arquitetura tier (brand/non-brand/competitor/conquest) e escala $10K-$10M é a expansão enterprise. | criar skill `arquitetura-enterprise-ppc` em Peitho/.claude/skills/ |
| PM-G14 | Tier architecture (brand/non-brand/competitor/conquest) + isolamento | peitho | CREATE | — | Tier architecture explícita; sub-técnica. | embutir em `arquitetura-enterprise-ppc` |
| PM-G15 | Incrementality testing paid-search (geo-split, holdout, matched market) | peitho | CREATE | — | Frameworks de teste de incrementalidade em paid search; ausente. | embutir em `incrementalidade-cross-channel` (paid-search geo/holdout) |
| PM-G16 | Hierarquia de conversion actions (primária/secundária, micro/macro) | peitho | ADAPT | Peitho/tasks/setup-tracking.md (Fase 1: hierarquia primária/secundária/micro) | setup-tracking já define hierarquia; alimentação do smart-bidding por essa hierarquia é o ângulo novo. | adicionar §"Hierarquia alimenta smart-bidding (sinais primário/secundário/micro)" em `setup-tracking.md` |
| PM-G17 | Programmatic / Display (GDN/DV360/TTD/partner media/ABM) | peitho | CREATE | — | Programática/DV360/TTD/ABM ausentes; nenhum agente Peitho cobre. | criar skill `programatica-e-display` em Peitho/.claude/skills/ |
| PM-G18 | AMP (Addressable Media Plan) — 25+ parceiros (display/newsletter/sponsored) | peitho | CREATE | — | Plano AMB com múltiplos parceiros; sub-técnica programática. | embutir em `programatica-e-display` (anexo AMP template) |
| PM-G19 | Managed placements de alto valor por vertical | peitho | CREATE | — | Sub-técnica programática. | embutir em `programatica-e-display` |
| PM-G20 | Search Query Analyst (mineração + n-gram + taxonomia de negativas + intent map) | peitho | CREATE | — | Capacidade dedicada de análise de SQR ausente; ads-analyst cobre conta, não query mining. | criar skill `search-query-analise` em Peitho/.claude/skills/ |
| PM-G21 | N-gram frequency analysis (modificadores irrelevantes recorrentes) | peitho | CREATE | — | Sub-técnica SQR. | embutir em `search-query-analise` |
| PM-G22 | SQOS (Search Query Optimization System) — score query→ad→LP | peitho | CREATE | — | Framework SQOS; sub-técnica. | embutir em `search-query-analise` (seção SQOS) |
| PM-G23 | Tracking engineering (GTM/GA4/CAPI/server-side/dedup/Consent Mode v2) | peitho | ADAPT | Peitho/agents/pixel-specialist.md + tasks/setup-tracking.md | setup-tracking cobre GTM/GA4/CAPI/dedup; Consent Mode v2 (GDPR pós-2024) não está nomeado. | adicionar §"Consent Mode v2 + GDPR + privacy-sandbox" em `setup-tracking.md` |
| PM-G24 | Deduplicação CAPI por event_id (Pixel browser + CAPI server) | peitho | REUSE | Peitho/tasks/setup-tracking.md (Fase 4 QA: eventos server-side correspondem aos do navegador) | setup-tracking explicitamente cobre dedup browser+server. | nenhuma — capacidade já presente |

## Sumário por squad e decisão

| Squad | REUSE | ADAPT | CREATE | DESCARTADO | Total |
|---|---|---|---|---|---|
| caliope | 1 | 0 | 9 | 0 | 10 |
| pheme | 9 | 10 | 50 | 4 | 73 |
| peitho | 3 | 7 | 14 | 0 | 24 |
| **Total** | **13** | **17** | **73** | **4** | **107** |

Notas de contagem:
- MKT-G45 ficou em Caliope (REUSE de headline-e-hook-testaveis).
- MKT-G10/G11/G12/G17/G18/G48/G54/G55/G56 são os 9 CREATE de Caliope.
- DESCARTADOS são 4 IDs: MKT-G61, MKT-G62 (SEO técnico → Ariadne) e MKT-G78, MKT-G79 (intel X/Twitter → Argos). PERDIDO=0 (tudo descartado tem motivo de fronteira inter-squad documentado).

## Skills a criar/estender (preview F5 — agrupado por squad)

### Caliope (10 IDs roteados → 5 skills novas, 0 estendidas)
- Skills NOVAS:
  - `aso-app-store` (MKT-G10, G11, G12)
  - `ghostwriting-de-livro` (MKT-G17, G18)
  - `script-de-livestream` (MKT-G48)
  - `pr-comunicacoes-institucionais` (MKT-G54, G55, G56)
- Skills ESTENDIDAS: nenhuma (MKT-G45 é REUSE puro de headline-e-hook-testaveis).

### Pheme (73 IDs roteados → 17 skills novas, 6 estendidas + 1 agente ampliado)
- Skills NOVAS:
  - `aeo-foundations-architect` (MKT-G1, G2, G3)
  - `agentic-search-webmcp` (MKT-G4, G5, G6)
  - `geo-citacoes-ia` (MKT-G7, G8, G9)
  - `baidu-seo` (MKT-G13, G14)
  - `bilibili-conteudo` (MKT-G15, G16)
  - `motor-de-carrossel-autonomo` (MKT-G19, G21)
  - `china-ecommerce-ops` (MKT-G22, G23)
  - `china-localizacao-gtm` (MKT-G24, G25, G26)
  - `cross-border-ecommerce` (MKT-G28, G29)
  - `douyin-conteudo` (MKT-G31)
  - `podcast-global` (MKT-G36, G37, G38)
  - `kuaishou-conteudo` (MKT-G42, G43)
  - `linkedin-comment-to-pipeline` (MKT-G46)
  - `livestream-commerce` (MKT-G47, G49)
  - `podcast-china` (MKT-G52, G53)
  - `wecom-private-domain` (MKT-G57, G58)
  - `reddit-comunidade` (MKT-G60)
  - `edicao-de-shortvideo` (MKT-G63, G64, G65)
  - `wechat-official-account` (MKT-G73)
  - `weibo-conteudo` (MKT-G75, G76, G77)
  - `xiaohongshu-conteudo` (MKT-G80)
  - `zhihu-conteudo` (MKT-G82, G83)

  Total: 22 skills novas em Pheme.

- Skills ESTENDIDAS:
  - `matriz-de-conteudo`: anexo "Mixes de mercado" (MKT-G41, G68, G70, G74, G81, G66)
  - `sequencia-de-nutricao`: §deliverability/MPP/GDPR/Brevo + anexo CRM↔ESP (MKT-G33, G35)
  - `ciclo-de-vida-e-retencao`: §"Lifecycle de e-commerce" (MKT-G59)
  - `publicacao-social`: §"Canal China" + anexo matriz de fit (MKT-G50, G51)
  - `programa-de-indicacao`: §"Quadro Growth (LTV/CAC, AARRR)" (MKT-G39)

- Agentes ampliados (sem skill, ajuste de §):
  - `carousel-architect`: arco 6 slides como variante oficial (MKT-G20)
  - `short-video-architect`: §"Script viral 3 fases" (MKT-G32)
  - `youtube-strategist`: §"Template de audit de vídeo" (MKT-G72)

### Peitho (24 IDs roteados → 8 skills novas + 5 ajustes em agentes/tasks)

**Atenção:** Peitho não tem `.claude/skills/` hoje. F6 deve criar a estrutura e iniciar o catálogo.

- Skills NOVAS:
  - `auditoria-forense-200-checkpoints` (PM-G1, G2, G3)
  - `criativo-como-hipotese-rsa-pmax` (PM-G5, G6)
  - `paid-social-cross-platform` (PM-G9, G10)
  - `incrementalidade-cross-channel` (PM-G12, G15)
  - `arquitetura-enterprise-ppc` (PM-G13, G14)
  - `programatica-e-display` (PM-G17, G18, G19)
  - `search-query-analise` (PM-G20, G21, G22)
  - `amazon-ppc` (MKT-G30 — roteado a Peitho por marketplace PPC)

  Total: 8 skills novas em Peitho.

- Ajustes em agentes/tasks existentes:
  - `ads-analyst.md`: §"Tradução técnica→negócio (template stakeholder)" (PM-G4)
  - `ad-midas.md`: §"Iteração 20+ variações por brief" (PM-G7)
  - `setup-tracking.md`: §"Hierarquia alimenta smart-bidding" (PM-G16); §"Consent Mode v2 + GDPR + privacy-sandbox" (PM-G23)

## Achados e anomalias

1. **Fronteira preservada com Ariadne e Argos.** 4 IDs upstream (MKT-G61, G62, G78, G79) foram DESCARTADOs deste bucket porque pertencem a squads existentes fora do B02 (Ariadne = SEO, Argos = inteligência/research). Se um lote futuro de absorção pegar Ariadne/Argos, esses 4 IDs voltam à mesa.

2. **Pheme vira o squad com maior peso do bucket** (73 dos 107 IDs, 68%) — em grande parte porque o repo `agency-agents` traz cobertura exaustiva de plataformas chinesas (Baidu/Bilibili/Douyin/Kuaishou/WeChat/Weibo/Xiaohongshu/Zhihu) e o Pheme tinha apenas cobertura ocidental. Pós-F6, o Pheme passa a ter um "eixo China" maduro, sem precisar de squad novo.

3. **Caliope ganha 4 skills "fora do copy clássico"** — ASO (copy de listagem de app), ghostwriting de livro, script de livestream e PR institucional. Todas são variantes de redação persuasiva/institucional que cabem nas fronteiras já desenhadas do squad.

4. **Peitho precisa montar o esqueleto de `.claude/skills/`** — o squad opera hoje só com PRD+agents+tasks. F6 introduz a primeira camada de habilidades formais (8 skills novas) + catálogo. Esse é o efeito estrutural mais relevante do B02 em Peitho.

5. **Consolidação dos "mixes" num único anexo** em `matriz-de-conteudo` (Pheme) — 6 IDs upstream (regras 1/3 IG, 40/30/20/10 TikTok, 25/20/20/15/10/10 X, 70/20/10 XHS, 60/30/10 WeChat, employee advocacy) viram um anexo único em vez de skills isoladas. Evita pulverização e mantém o catálogo da Pheme enxuto.

6. **Eixo AEO/GEO/WebMCP é novidade absoluta** — 3 skills novas em Pheme (`aeo-foundations-architect`, `agentic-search-webmcp`, `geo-citacoes-ia`) abrem uma nova frente: descoberta orgânica na era LLM. Vale alinhamento futuro com Ariadne (que cobre AEO/E-E-A-T para SEO clássico): no F6, declarar interface de handoff Pheme→Ariadne para citação IA.

7. **Tracking e CAPI já estavam fortes em Peitho** — PM-G11 e PM-G24 são REUSE puro (setup-tracking.md cobre dedup, CAPI multi-plataforma, Enhanced Conversions). Confirma a maturidade do pixel-specialist e da task.

8. **2 IDs upstream produzem ajustes cruzados Peitho↔Pheme**: nenhum (cada bucket fica em seu squad). O único "cross-bucket" interno é MKT-G48 (script livestream) em Caliope com handoff a Pheme/livestream-commerce — registrado no F6.
