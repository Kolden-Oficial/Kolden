---
name: programatica-e-display
description: |
  Programática e display — GDN (Google Display Network), DV360 (Display & Video 360), The
  Trade Desk (TTD), partner media direta, ABM (account-based marketing) via bidstream,
  Advanced Matched Placements (AMP) em 25+ parceiros, managed placements por vertical
  (SaaS / e-com / DTC / healthcare / finance). Use quando o pedido for "GDN", "DV360",
  "Trade Desk", "TTD", "programática", "ABM", "partner media", "AMP", "managed placement",
  "display network", "vertical media", "in-stream OTT/CTV". NÃO é display de plataforma
  social (aí `paid-social-cross-platform`); criativo/design das peças = handoff Aglaia +
  Caliope.
license: MIT
allowed-tools:
  - Read
  - Write
  - Edit
  - Grep
  - Glob
  - AskUserQuestion
tipo: skill
area: Peitho
up: "[[Peitho/_MOC-peitho]]"
---

# Programática e display (PT-BR)

Programática é a compra de mídia por leilão em tempo real via bidstream — o oposto da
mídia comprada por reserva. Ambientes possíveis: GDN (self-serve, entry-level), DV360
(enterprise Google), TTD (independente, cross-inventory), partner media direta (deals com
publishers), OTT/CTV (Roku, Samsung, Netflix Ads, Amazon Freevee). Esta habilidade define
o playbook por objetivo, vertical e faixa de investimento.

## Herança histórica

- **The Trade Desk (Jeff Green, 2009+)** — primeira DSP independente enterprise; codificou
  transparência de bidstream e first-price auction moderno.
- **DoubleClick / Google (2007+)** — legado que virou DV360; DoubleClick Bid Manager
  (DBM) foi a régua de padrão IAB.
- **Terry Kawaja (LUMA Partners)** — desenhou o LUMAscape que virou a ontologia da
  indústria adtech.
- **Ari Paparo (ex-Beeswax / Marketecture)** — introduziu "curation" e a economia de
  bidstream pós-cookie.
- **Marketecture / AdMonsters** — publicações que padronizaram vocabulário técnico da
  programática.

## Escolha da DSP por objetivo

| DSP | Melhor uso | Ticket mínimo mensal |
|---|---|---|
| **GDN** | descoberta cost-efficient, sub-$50K/mês | $500 |
| **DV360** | enterprise Google-stack (GA4/CM360), YouTube CTV | $10K |
| **TTD** | cross-inventory, OTT/CTV, DOOH, audio | $20-50K |
| **Amazon DSP** | e-com/DTC + Amazon audience data | $15K |
| **StackAdapt** | mid-market, DR programático, contextual | $5K |
| **Basis (Centro)** | vertical media, local mid-market | $10K |
| **Beeswax / Freewheel** | white-label / advanced buyers | $50K+ |

## Estrutura de campanha programática

Estrutura minimal viável:

```
Campanha (objetivo + KPI)
├── Insertion Order (targeting layer)
│   ├── Line Item (deal/inventory + creative pack)
│   │   ├── Creatives (múltiplos formatos)
│   │   └── Targeting refinements
```

Regras:
- 1 campanha = 1 objetivo (nunca "aumentar awareness E gerar leads").
- IO por camada de targeting (retargeting, prospecting, CTV, ABM).
- Line item por deal/inventory + criativo pack.
- Frequência limitada em nível de campanha, não line item.

## Camadas de targeting programático

### 1. First-party
- CRM upload (customer match, LiveRamp, TTD First-Party Data).
- Site retargeting via pixel/tag.
- Custom segments a partir de eventos GA4/CM360.

### 2. Second-party
- Data partnerships (com um parceiro específico compartilhando audience).
- Cohorts contextuais.

### 3. Third-party
- Segmentos de dados (LiveRamp, Nielsen, Oracle Data Cloud, Adobe Audience Manager).
- **Aviso pós-cookie**: 3rd-party está morrendo em cookie-less. Já usar first-party como
  spine.

### 4. Contextual
- Contextual targeting moderno (Peer39, GumGum, Semasio, IAS Context Control).
- Ganhou peso pós-cookie; especialmente forte em publisher direct.

### 5. Placement direto
- Managed placements por vertical (lista abaixo).
- Deal ID (PMP, Preferred Deals, Programmatic Guaranteed).

## ABM (Account-Based Marketing) programático

ABM programático via bidstream faz sentido em B2B enterprise ($20K+/mês). Providers:

- **RollWorks** — ABM completo self-serve.
- **Terminus / Metadata.io** — enterprise stack.
- **6sense** — intent data + programmatic.
- **Demandbase** — legado enterprise.

Como funciona:
1. Lista de contas alvo (ideal customer profile, ~500-5000 accounts).
2. IP-based ou reverse-IP targeting (identifica visitor da conta).
3. Bidstream match em desktop + mobile via graph.
4. Frequência controlada por conta (não por user).

## Advanced Matched Placements (AMP) — 25+ parceiros

AMP é a lista mestra de publishers que fazem matched inventory disponível programaticamente.
Categorias:

| Categoria | Exemplos (não exaustivo) |
|---|---|
| News premium | NYT, WSJ, WaPo, FT, Bloomberg, Reuters |
| Business/finance | CNBC, Barron's, Kiplinger, MarketWatch |
| Tech | TechCrunch, Ars Technica, The Verge, Wired |
| Lifestyle | Vox Media (Eater, The Cut, SB Nation), Meredith |
| Vertical trade | Adweek, AdAge, Adweek, MediaPost |
| Local | Local news via LMA, Gannett, Hearst |
| CTV/OTT | Hulu, Roku, Samsung TV Plus, Amazon Freevee, Peacock |
| Audio | Spotify, Pandora, iHeartRadio, SoundCloud, podcasts (Acast, Megaphone) |

Deals são setup via ADX, DV360 marketplace, TTD marketplace, ou direct Deal ID negociado.

## Managed placements por vertical

Placements curados por vertical (whitelist manual, não deixado ao algoritmo):

### SaaS B2B
- LinkedIn (via managed native), tech news (TechCrunch, The Verge), SaaS review sites
  (G2, Capterra managed direct).

### E-com DTC
- Meredith properties (Real Simple, Better Homes), lifestyle vertical, e-com discovery
  sites, review sites.

### Healthcare
- WebMD Health Network, Healthline, verticals médicas com compliance NAI + HIPAA.

### Finance
- Bloomberg, Reuters, WSJ, Yahoo Finance, Investopedia; compliance FINRA se aplicável.

### Auto
- Kelley Blue Book, Edmunds, MotorTrend, TrueCar; long consideration cycle.

### Real estate
- Zillow, Trulia, Realtor.com; local media forte.

## Frequência e brand safety

- **Frequency cap**: 3-5 impressões/user/semana como default. Ajustar por vertical.
- **Brand safety**: obrigatório usar IAS, DoubleVerify ou Peer39 para pre-bid filtering em
  programmatic aberto.
- **Viewability**: MRC standard = 50% dos pixels por 1s (2s para vídeo); manter >70%
  como threshold saudável.
- **Fraud**: SIVT (sophisticated invalid traffic) rate deve ficar <2%; se >5%, mudar
  inventário.

## Anti-padrões

- **Programática pura para brand ($10K/mês)** — CPMs ineficientes; fica com CTV Hulu ou
  managed placement direto.
- **3rd-party como spine em 2025** — cookie-less já cortou 30-40%; migrar para first-party
  + contextual.
- **Frequency cap não aplicado em nível de campanha** — usuário vê 15 impressões, brand
  vira spam.
- **DV360 sem GA4/CM360 integrado** — perde 60% do potencial.
- **Amazon DSP sem 1P Amazon data** — vira mais um placement, sem edge.
- **ABM sem intent signals** — vira lista fria de emails com display anexado.

## Fronteiras inter-squad

- **Estratégia de DSP, targeting layers, ABM setup, AMP curation, managed placements** —
  Peitho faz (esta habilidade).
- **Criativo (banner, video, native)** — handoff a **Aglaia** + **Caliope**.
- **CTV vídeo commercial de 15-30s** — handoff a **Aglaia** (vídeo) + **Caliope** (roteiro
  via `script-de-livestream` adaptado para pré-roll).
- **Measurement pós-view / MMM** — handoff a **Metis**.

## Formato de saída

1. DSP escolhida + racional por ticket + objetivo.
2. Estrutura de campanha (IO → line items → creatives).
3. Camadas de targeting (1P/2P/3P/contextual/placement direto).
4. AMP curation (lista de placements) + managed placements por vertical.
5. Frequency cap + brand safety + viewability threshold.
6. Handoffs declarados.

## Referências

- `references/dsp-comparativo.md` — tabela detalhada DSP × recurso × ticket.

---

Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B02/paid-media
(IDs PM-G17, G18, G19). Herança histórica: The Trade Desk (Jeff Green), DoubleClick
legacy, Terry Kawaja (LUMA), Ari Paparo (Marketecture), IAB standards. Sem cópia literal.
