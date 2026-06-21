# Argos — Inteligência de Mercado & Scraping

> *Argos Panoptes (Ἄργος Πανόπτης): o gigante de cem olhos que tudo vê e nunca dorme por inteiro.*
> A camada de inteligência da Kolden — descobre e verifica a verdade do mercado, do macro ao micro,
> e nunca deixa passar um dado sem fonte e timestamp.

## O que é

Um squad de inteligência de mercado que vai do **macro ao micro**: dimensiona o mercado
(TAM/SAM/SOM), lê tendências e comportamento de audiência no topo, e desce até o concorrente
individual analisado post-a-post na base. Mapeia toda a presença **orgânica e paga** de um mercado
e de seus concorrentes em **todas as redes sociais**, coleta anúncios em ad libraries públicas,
extrai links e SEO/SERP, e revela os "dados que só o scraping mostra" — sempre com **fonte e
timestamp em cada dado**.

Argos **não sobe tráfego, não publica, não escreve copy, não cria oferta**. Ele descobre e verifica
a verdade do mercado — e então faz handoff para os squads de execução.

## Roster

15 agentes: 1 orquestrador (tier 0) + 6 de inteligência funcional (tier 1) + 7 de redes sociais
(tier 2) + 1 sentinela de compliance (tier 3).

| Ícone | ID | Tier | Papel |
|---|---|---|---|
| 👁️ | `argos-chief` | 0 | Orquestração: escopo macro→micro, roteamento, síntese e gate de confiabilidade |
| 🕸️ | `web-harvester` | 1 | Scraping geral, anti-bot/stealth, render JS, extração exaustiva de links |
| 🗺️ | `serp-seo-cartografo` | 1 | SERP, rankings, keywords, backlinks, sitemaps, footprint digital |
| 📢 | `ads-intel` | 1 | Inteligência de pago via ad libraries públicas (Meta/Google/TikTok/LinkedIn) |
| 📐 | `market-sizer` | 1 | TAM/SAM/SOM top-down e bottom-up, tendências, dados oficiais + Apollo |
| 🎯 | `competitor-mapper` | 1 | Dossiê por concorrente cruzando orgânico + pago + SEO em todas as redes |
| 🧠 | `research-synthesizer` | 1 | Pesquisa LLM multi-fonte, cross-check adversarial, relatório citado |
| 📸 | `social-instagram` | 2 | Instagram: perfis, Reels, engajamento, hashtags, criadores |
| 🎵 | `social-tiktok` | 2 | TikTok: vídeos, sons, hashtags, Creative Center, tendências |
| ▶️ | `social-youtube` | 2 | YouTube: canais, vídeos, métricas públicas, tags, tendências |
| 💼 | `social-linkedin` | 2 | LinkedIn: páginas, headcount, contratações, posts, anúncios |
| 🐦 | `social-x` | 2 | X/Twitter: perfis, posts, engajamento, tendências |
| 👥 | `social-facebook` | 2 | Facebook: páginas, grupos públicos, Ad Library, engajamento |
| 🤖 | `social-reddit` | 2 | Reddit: subreddits, threads, sentimento e dores reais da comunidade |
| 🛡️ | `compliance-sentinela` | 3 | Guardião de ToS: classifica VERDE/CINZA, portão único da zona cinza, contas/proxies descartáveis |

## Como usar

```
@argos research "<nicho>"        # diagnostica o escopo e roteia (ex.: "cursos de inglês online no Brasil")
*journey                          # roda a jornada completa de pesquisa de mercado (8 fases)
@argos:competitor-mapper          # fala direto com um especialista (roteamento direto)
@argos:ads-intel                  # idem — qualquer especialista por id
```

## A jornada (workflow `wf-pesquisa-de-mercado`)

```
0. Triagem & Escopo            → argos-chief        (nicho, geografia, concorrentes, profundidade, verde/cinza)
1. Visão Macro / Sizing        → market-sizer       (TAM/SAM/SOM método+fonte, tendências datadas)
2. SERP/SEO & Mapa de Links    → serp-seo-cartografo (rankings, keywords, backlinks, links classificados)
3. Presença Orgânica por Rede  → 7 social-* (fan-out) (perfis, engajamento, top posts por rede)
4. Inteligência de Pago        → ads-intel          (anúncios ativos nas ad libraries, criativos, datas)
5. Consolidação de Concorrência → competitor-mapper  (dossiê por concorrente, orgânico/pago separados)
6. Cross-check & Síntese       → research-synthesizer (verificação adversarial, relatório 100% citado)
7. Entrega + Aprovação + Handoff → argos-chief       (relatório final + pacotes de handoff)
```

Cada fase tem um checkpoint que pode dar **HALT** por falta de proveniência ou de autorização.

## Compliance híbrido

O apetite de risco é **híbrido** — duas zonas claramente separadas:

- **Zona verde (padrão):** fontes legítimas — APIs oficiais, ad libraries públicas, SERP, web
  pública, embeds. É onde a base do trabalho acontece.
- **Zona cinza (isolada, opt-in):** scraping autenticado de redes sociais via credencial vive num
  módulo segregado (`modulo-cinza/`), **desligado por padrão**. Só entra em jogo com **confirmação
  humana explícita na sessão + conta/proxy descartável**, e sempre através do **`compliance-sentinela`**,
  que é o único portão.

## Gate de confiabilidade (o veto)

Nenhum dado-fato chega ao relatório sem **fonte + timestamp**. Número-chave exige **cross-check**
(≥2 fontes independentes) ou rótulo explícito "fonte única — não confirmado". Dado sem origem é
descartado ou rebaixado. Orgânico nunca é tratado como pago. Faltou proveniência → **HALT**
(reflexo + checklist `output-quality.md` / ARGOS-CL-001 + checkpoint de workflow). Nada de
provimento sem proveniência.

## Handoff para execução (Argos descobre, os outros agem)

| Quando | Squad | Artefato |
|---|---|---|
| Anúncios ativos do concorrente | **Peitho** | Dossiê de anúncios + ângulos pagos que funcionam → estratégia de mídia |
| Top posts orgânicos por rede | **Pheme** | Formatos e cadência → calendário e produção de conteúdo |
| Dores reais e ganchos | **Caliope** | Promessas e ângulos que performam → copy e VSL |
| Preços e posicionamento | **Pluto** | Lacunas de mercado → oferta e precificação |
| Sizing e sinais de demanda | **Aletheia** | Evidência de mercado → validação de hipótese (entrada do funil) |
| Benchmarks do setor | **Metis** | Engajamento/crescimento → North Star e metas de growth |

## Mapa do projeto

```
Argos/
├── CLAUDE.md                 ← identidade do squad
├── prd-de-ia.md              ← PRD aprovado
├── squad.yaml                ← manifesto (tiers, agentes, handoffs, vetos)
├── README.md                 ← este arquivo (visão geral e uso)
├── MEMORY.md                 ← memória do squad (fontes/padrões de inteligência aprendidos)
├── ferramentas.md            ← APIs, MCPs, motor vendorizado e Infisical
├── instalacao.md             ← como colocar em produção
├── roteiro-de-teste.md       ← smoke tests (maturity score)
├── agents/                   ← orquestrador + 13 especialistas + sentinela (15 arquivos)
├── data/                     ← routing-catalog.yaml
├── workflows/                ← wf-pesquisa-de-mercado.yaml
├── checklists/               ← output-quality.md (gate de confiabilidade ARGOS-CL-001)
├── tasks/                    ← diagnose, dimensionar-mercado, mapear-serp-e-links, scan-rede, ad-library-scan, dossie-concorrente, sintetizar-relatorio
├── motor/                    ← motor de scraping vendorizado (Scrapling/Scrapy/GPT-Researcher/Crawlee/Skyvern)
├── modulo-cinza/             ← scrapers sociais isolados (ToS-cinza), só via compliance-sentinela
└── .claude/                  ← skills, reflexos e settings.json
```
