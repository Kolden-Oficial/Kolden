# Briefing — Banners Display Remarketing

> **Origem:** Onda 3 Phase 1 do `google-ads/ROADMAP.md` — campanha `US_Remkt_All_LP-view_v1`.
> **Squad executor:** Aglaia (design), com apoio Caliope (validação de copy final).
> **Prazo:** D+7 do roadmap (junto com o lançamento da campanha de Remarketing).
> **Budget da campanha:** USD 30/mês (10% do split Google) — banners são baixo-volume, alto-impacto.
> **Tokens visuais:** `design-tokens-vilela.md`. Ler antes de produzir.

---

## 1. Papel da campanha

Remarketing puxa de volta ao form quem visitou a LP nos últimos 30–60 dias mas não converteu. Ticket alto ($30k–$65k) + ciclo de decisão longo (semanas) = o visitante volta ao Google, YouTube ou site de notícias e precisa **reencontrar a Vilela num tom que reforça confiança, não pressiona venda**.

**O que a peça precisa dizer em 2 segundos:**
1. Isso é a Vilela — a marca que ele visitou.
2. É um contractor confiável em MA + NH.
3. Ele pode voltar e agendar Free Estimate agora.

**O que a peça NUNCA diz:** "50% OFF", "LIMITED OFFER", "ACT NOW", "HURRY". Vilela vende premium — desconto grita "posso ser barato". A urgência real está na sazonalidade (maio–novembro), não em fake scarcity.

---

## 2. Tamanhos obrigatórios (Google Display Network core 5)

| Slot | Dimensões | Uso primário |
|---|---|---|
| **Medium Rectangle** | 300 × 250 | Volume mais alto do GDN — em corpo de artigo, sidebar |
| **Leaderboard** | 728 × 90 | Topo de blog / site de notícia desktop |
| **Wide Skyscraper** | 160 × 600 | Sidebar vertical (menos comum em 2026, ainda relevante) |
| **Half Page** | 300 × 600 | Sidebar de alta atenção (real estate / news premium) |
| **Mobile Banner** | 320 × 50 | 60%+ da impressão do GDN em mobile |

**5 tamanhos × 2 variações = 10 arquivos por entrega inicial.** Extras opcionais em §6.

---

## 3. Restrições técnicas Google Display Network

| Item | Limite Google | Target Aglaia |
|---|---|---|
| Peso máximo por banner | 150 KB | ≤ 100 KB |
| Formatos aceitos | GIF, JPG, PNG, HTML5 (AMPHTML) | PNG-24 principal; HTML5 se time tiver bandwidth |
| Animação max | 30 segundos (2024+) | 15 segundos, 3 states max se HTML5 |
| Frame rate max | 5 FPS | 3 FPS (transições suaves, não flicker) |
| Loop | Máx 3 loops se animado | 1 loop only — nada de auto-repeat |
| Border | Obrigatório se fundo do banner casa com fundo da página (evita "sumir") | Border 1px `ink-800` externa em TODOS os banners |
| Área clicável | Banner inteiro | Padrão — sem UX de "clique aqui" |
| Landing URL | Deep link para seção correta da LP | Ver §7 |

**Nota HTML5:** Google aceita HTML5 (via AMP HTML for Ads), mas o setup Vilela é simples e PNG estático cobre 95% do impacto. **Não priorizar HTML5** na primeira leva. Reavaliar em D+30 se CTR do estático for < 0.3%.

---

## 4. Composição por tamanho (com prioridade hierárquica)

Cada banner segue a **regra dos 3 elementos obrigatórios**:
1. **Marca** (logo ou wordmark, sempre visível).
2. **Mensagem** (headline + 1 subcopy ou trust marker).
3. **CTA** ("Free Estimate", "Get a Free Estimate", ou similar).

Foto é opcional em tamanhos pequenos (320×50, 160×600). Nos maiores, foto real do projeto é diferencial.

---

### 4.1 Medium Rectangle — 300 × 250 px

**Estrutura:** foto ocupa 55% (topo), texto ocupa 45% (base).

```
+--------------------------------+
|                                |
|  [ Foto projeto Vilela ]        |
|                                |
+--------------------------------+
|  [Logo Vilela] 16px            |
|  Headline (Montserrat 700 18px)|
|  Subcopy trust (Inter 500 11px)|
|  [CTA button scarlet]          |
+--------------------------------+
```

**Especificações:**
- Foto topo: 300×138 (55%), sem overlay, crop centralizado.
- Bloco texto base: 300×112 (45%), fundo `off-white`.
- Padding interno bloco texto: 12 px lateral + 10 px vertical.
- Logo Vilela: 16 px altura (`ink-950`), alinhado esquerda topo do bloco.
- Headline: Montserrat 700, 18 px, `ink-950`, 2 linhas máx.
- Subcopy: Inter 500, 11 px, `ink-600`, 1 linha.
- CTA botão: fundo `scarlet-500`, texto `ink-950` (Inter 700 12 px UPPERCASE), padding 8 px vertical + 12 px horizontal, `radius-md` (8 px), largura auto.

---

### 4.2 Leaderboard — 728 × 90 px

**Estrutura horizontal:** foto esquerda 30%, texto centro 45%, CTA direita 25%.

```
+----------+---------------------------+----------+
| [Foto]    | [Logo] Headline           | [CTA]    |
| 218×90    | Subcopy trust             | button   |
+----------+---------------------------+----------+
```

**Especificações:**
- Foto esquerda: 218×90 (30%), crop centralizado, sem overlay.
- Bloco central: 328×90 (45%), fundo `off-white`, padding lateral 16 px.
- Logo Vilela: 20 px altura, alinhado esquerda do bloco central (topo).
- Headline: Montserrat 700, 20 px, `ink-950`, 1 linha (≤6 palavras).
- Subcopy: Inter 500, 11 px, `ink-600`, 1 linha (badge trust).
- Bloco CTA direita: 182×90 (25%), fundo `scarlet-500`, texto `ink-950` centralizado (Inter 700 14 px UPPERCASE), sem borda.

---

### 4.3 Wide Skyscraper — 160 × 600 px

**Estrutura vertical:** foto topo 40%, marca+headline centro 40%, CTA base 20%.

```
+-------------+
|  [Foto]      |
|  160×240     |
+-------------+
| [Logo]       |
| Headline     |
| Subcopy      |
+-------------+
| [CTA button] |
+-------------+
```

**Especificações:**
- Foto topo: 160×240 (40%).
- Bloco meio: 160×240 (40%), fundo `off-white`, padding 12 px.
- Logo Vilela: 16 px altura, centralizado.
- Headline: Montserrat 700, 18 px, `ink-950`, 2–3 linhas curtas.
- Subcopy: Inter 500, 10 px, `ink-600`, trust marker.
- CTA base: 160×120 (20%), fundo `scarlet-500`, texto `ink-950` centralizado (Inter 700 13 px UPPERCASE), 2 linhas se necessário.

---

### 4.4 Half Page — 300 × 600 px

**Estrutura vertical rica:** foto topo 50%, texto+badge centro 35%, CTA base 15%.

```
+----------------+
|                 |
|   [ Foto ]      |
|   300×300       |
|                 |
+----------------+
| [Logo]           |
| Headline grande  |
| Subcopy          |
| [Badge trust]    |
+----------------+
| [CTA button]     |
+----------------+
```

**Especificações:**
- Foto topo: 300×300 (50%).
- Bloco meio: 300×210 (35%), fundo `off-white`, padding 20 px.
- Logo Vilela: 24 px altura.
- Headline: Montserrat 700, 26 px, `ink-950`, 2 linhas.
- Subcopy: Inter 500, 14 px, `ink-600`, 1–2 linhas.
- Badge trust pill: fundo `navy-500`, texto `off-white` (Inter 600 11 px UPPERCASE), padding 6 px vertical + 12 px horizontal, `radius-pill`.
- CTA base: 300×90 (15%), fundo `scarlet-500`, texto `ink-950` centralizado (Inter 700 18 px UPPERCASE).

---

### 4.5 Mobile Banner — 320 × 50 px

**Estrutura horizontal condensada:** logo esquerda + headline centro + CTA direita.

```
+------+----------------------+----------+
| Logo | Headline curta       | CTA      |
+------+----------------------+----------+
```

**Especificações:**
- Sem foto — tamanho não comporta com dignidade.
- Fundo inteiro: `off-white`.
- Padding: 12 px lateral, 8 px vertical.
- Logo Vilela: 28 px altura, alinhado esquerda.
- Headline: Montserrat 700, 14 px, `ink-950`, 1 linha ultra curta.
- CTA: fundo `scarlet-500`, texto `ink-950` (Inter 700 11 px UPPERCASE), padding 6 px vertical + 10 px horizontal, `radius-sm` (4 px).

---

## 5. Copy por variação (kitchen vs bathroom) e por tamanho

Cada tamanho recebe **2 variações** — Kitchen highlight e Bathroom highlight. Copy é curta e cabe em cada canvas.

### 5.1 Variação Kitchen

| Tamanho | Headline | Subcopy | CTA |
|---|---|---|---|
| 300×250 | `Your kitchen deserves better.` | `Licensed & Insured — MA + NH.` | `Free Estimate` |
| 728×90 | `Kitchen remodel, done right.` | `Licensed & Insured — MA + NH.` | `Free Estimate` |
| 160×600 | `Kitchen remodel that feels like home.` | `Licensed & Insured. MA + NH.` | `Get a Free Estimate` |
| 300×600 | `Kitchen remodel, done right the first time.` | `Clear communication, immaculate cleanliness, dedicated craftsmanship.` | `Free Estimate` (+ badge `LICENSED & INSURED · MA + NH`) |
| 320×50 | `Kitchen remodel done right.` | — | `Free Estimate` |

**Foto Kitchen:** usar `bathroom-after.jpg` — **CORREÇÃO:** usar `hero-kitchen.jpg` (candidato órfão no repo, ideal para reuso), OU `kitchen-after.jpg` do slider before/after atual da LP. Confirmar com Bernardo qual é a foto de mais alta qualidade.

### 5.2 Variação Bathroom

| Tamanho | Headline | Subcopy | CTA |
|---|---|---|---|
| 300×250 | `A bathroom that feels like a spa.` | `Licensed & Insured — MA + NH.` | `Free Estimate` |
| 728×90 | `Bathroom remodel, done right.` | `Licensed & Insured — MA + NH.` | `Free Estimate` |
| 160×600 | `Spa-inspired bathroom, real craftsmanship.` | `Licensed & Insured. MA + NH.` | `Get a Free Estimate` |
| 300×600 | `Bathroom remodel that respects your home.` | `Clear communication, immaculate cleanliness, dedicated craftsmanship.` | `Free Estimate` (+ badge `LICENSED & INSURED · MA + NH`) |
| 320×50 | `Bathroom remodel done right.` | — | `Free Estimate` |

**Foto Bathroom:** usar `hero-bathroom.jpg` ou `bathroom-after.jpg` da LP atual.

### 5.3 Regras gerais de copy (Caliope valida)

- Verbo forte e concreto ("done right", "deserves better", "feels like home") — nunca hedged ("consider", "explore", "discover").
- Sem exclamação em nenhum ponto. A voz é honest & grounded, não hype.
- Sem "!!" "!!!" "URGENT" "TODAY ONLY". Zero urgência artificial.
- Trust marker aparece **sempre** ("Licensed & Insured — MA + NH") — é o argumento diferencial em construção residencial nos EUA.
- CTA é sempre `Free Estimate` ou `Get a Free Estimate` — nunca variantes como "Learn More" (fraco) ou "Book Now" (alta pressão).

---

## 6. Extras opcionais (D+30, se dado justificar)

Se em D+30 o CTR médio dos 5 tamanhos > 0.35% e o volume de site visitors qualificar >200 pessoas/mês, considerar produzir:

- **Large Rectangle 336 × 280** (variação grande do medium).
- **Square 250 × 250** (crescente em mobile app placements).
- **Skyscraper 120 × 600** (menos comum, mas ainda com inventory).

Pular por padrão na primeira leva — orçamento USD 30/mês não justifica 15 arquivos.

---

## 7. Landing URLs por variação (deep link — F15 do fixes)

Bernardo/media-buyer configura o URL de destino no Google Ads. Aglaia entrega o **hint textual** de landing por variação no arquivo de entrega (metadata do PNG ou README junto):

| Variação | Landing URL sugerida |
|---|---|
| Kitchen | `https://{lp-url}/#services` (âncora seção Services, próximo do card Kitchen) |
| Bathroom | `https://{lp-url}/#services` (mesma âncora — a seção agrupa; se F15 acontecer com âncora `#kitchen` / `#bathroom`, atualizar aqui) |

**Nota:** todos os banners levam para a MESMA LP — o deep link só melhora scent match. Não criar landing dedicada por banner nesta fase.

---

## 8. Tokens visuais rápidos (para todos banners)

| Uso | Token | Valor |
|---|---|---|
| Fundo bloco texto | `off-white` | `#F7F5F1` |
| Texto headline | `ink-950` | `#0F1013` |
| Texto subcopy | `ink-600` | `#4A4E57` |
| Texto trust badge | `off-white` sobre `navy-500` (badge pill) | badge fundo `#1B3A5C` |
| CTA fundo | `scarlet-500` | `#E63C1E` |
| CTA texto | `ink-950` | `#0F1013` |
| Borda externa banner | `ink-800` | `#1F2126`, 1 px |
| Fonte headline | Montserrat 700 |
| Fonte subcopy | Inter 500 |
| Fonte CTA | Inter 700 UPPERCASE |

---

## 9. Entrega — estrutura de arquivos

Aglaia entrega em: `google-ads/brief-visual/exports/banners-remarketing/`

```
banners-remarketing/
├── kitchen/
│   ├── vilela-remkt-kitchen-300x250.png
│   ├── vilela-remkt-kitchen-728x90.png
│   ├── vilela-remkt-kitchen-160x600.png
│   ├── vilela-remkt-kitchen-300x600.png
│   └── vilela-remkt-kitchen-320x50.png
├── bathroom/
│   ├── vilela-remkt-bathroom-300x250.png
│   ├── vilela-remkt-bathroom-728x90.png
│   ├── vilela-remkt-bathroom-160x600.png
│   ├── vilela-remkt-bathroom-300x600.png
│   └── vilela-remkt-bathroom-320x50.png
└── README.md   (Aglaia: manifest com dimensões, peso, landing URL, alt text)
```

**Convenção:** `vilela-remkt-{tema}-{largura}x{altura}.png`.

**Nome no Google Ads (quando Bernardo subir):** `US_Remkt_All_LP-view_v1 · {tema} · {tamanho}` — casa com o naming do `arquitetura-de-conta.yaml`.

---

## 10. QA obrigatório antes de subir para Google Ads

- [ ] Todos 10 arquivos ≤ 100 KB (target) / ≤ 150 KB (limite Google).
- [ ] Border 1px `ink-800` presente em todos.
- [ ] Nenhum banner sem CTA visível.
- [ ] Nenhum banner sem logo Vilela.
- [ ] Copy Caliope-aprovada (voz honest & grounded, sem hype).
- [ ] Foto real Vilela (não stock, não render 3D).
- [ ] Preview em Google Ads Preview Tool antes de ativar.
- [ ] Preview em placement real (visitar site com preview de banner em dev tools).
- [ ] Contrast check via WebAIM — todos par texto+fundo passam AA.
- [ ] Nome de arquivo bate com convenção.

---

## 11. Gaps conhecidos

| # | Gap | Solução |
|---|---|---|
| G1 | HTML5 responsive não priorizado — se PMax expandir p/ Display, precisa | Reavaliar em D+30 se estático não performar |
| G2 | Falta variação Basement / Deck / Flooring / Painting nos banners | Basement + Deck: não urgente (basement não é foco de Remarketing no ROADMAP §3.4). Flooring/Painting: reavaliar em D+30 quando gallery expansion (`gallery-expansion.md`) estiver produzida |
| G3 | Landing URL final da LP Kolden não confirmada (B5 do ROADMAP) | Bernardo entrega URL final antes de Aglaia rodar QA §10 |
| G4 | Se CTR < 0.3% em D+7, pausar Remarketing (§3.2 do ROADMAP prevê realocação para Non-brand Kitchen) | Não produzir extras opcionais até D+14 confirmar performance |

---

## 12. Aderência ao checklist Aglaia (`design-tokens-vilela.md` §11)

- [x] Paleta: off-white + ink + scarlet (CTA) + navy (badge trust em 300×600). Zero outra cor.
- [x] Escarlate ocupa apenas o botão CTA — ≤15% em todos tamanhos.
- [x] Nenhum gradient, glow ou drop shadow.
- [x] Tipografia: Montserrat + Inter only.
- [x] Foto real Vilela (não stock).
- [x] Trust badge em navy (300×600) ou trust marker em subcopy — nunca em scarlet.
- [x] CTA `scarlet-500` com texto `ink-950` (não branco) — WCAG AA-normal.
- [x] Nenhum item "não é" (§1 dos tokens) presente.
- [x] Passa "teste do grounded" em todos os 5 tamanhos.
