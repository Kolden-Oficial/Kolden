---
id: 03-componentes-logo-leia-me
titulo: "Omiron — Monograma Imperial · leia-me da vetorização"
resumo: "Documento de referência da logo Omiron oficial: 5 SVGs autorais desenhados do zero, sistema de aplicação canal-a-canal, matriz de escala × variante, checklist anti-slop e processo. Direção 1 do briefing de Aglaia (`brandbook/direcoes-logo.md`), escolhida pelo Ronan em 2026-07-07, aplicada em brandbook.html + apresentação/index.html. Insumo direto para reunião com Dr. Ariosto Filho em 08/07/2026."
categoria: projeto
status: oficial
atualizado-em: 2026-07-07
autor: Harmonia (design-chief)
missao: m-20260706-193013-omiron-brandbook-completo
insumos:
  - brandbook/direcoes-logo.md (Aglaia — Direção 1, L39-113)
  - 01-fundamentos/tipografia.md (EB Garamond como referência de forma)
  - 01-fundamentos/tom-visual.md (erudição prioritária + elegância imperfeita secundária)
  - 01-fundamentos/cores.md (matriz de contraste WCAG canônica)
  - 02-tokens/tokens.css (variáveis CSS canônicas — currentColor)
relacionados:
  - ./monograma-hero.svg
  - ./monograma-40.svg
  - ./monograma-mono.svg
  - ./lockup-horizontal.svg
  - ./lockup-vertical.svg
  - ./showcase.html
  - ../../../brandbook.html
  - ../../../apresentacao/index.html
---

# Monograma Imperial — leia-me

> Este é o documento oficial do símbolo Omiron. Cinco SVGs autorais, desenhados
> do zero em 2026-07-07 por Harmonia a partir do briefing conceitual de Aglaia
> (Direção 1 — Monograma Imperial). Aplicado no brandbook.html e no deck de
> apresentação para a reunião com Dr. Ariosto Filho em 08/07/2026.

## 1. Racional (síntese)

Uma cifra imperial em duas letras: **O** (a marca do produto) e **M** (a marca
do método — monitoramento). O O é um anel Didone modulado, contraste axial
completo. O M coroa o O como um "pequeno frontão neoclássico" (Aglaia L51) —
as duas hastes externas do M nascem exatamente sobre a borda interna do O,
selando o entrelaçamento como um monograma cifrado do século XVIII, não como
duas letras justapostas.

A **assinatura autoral** desta direção é a **serifa dupla no centro do M** —
duas hastes finíssimas descendo do vértice, terminadas em serifa horizontal
**bracket estoico** (não voluta floreada de casamento). É o traço da pena que
sustenta o rigor. Presente na versão hero; **ausente por escala** na versão 40
(empastaria a 40px, veto explícito do briefing L106).

Sensação-âncora prioritária: **erudição**. A cadência secundária é **elegância
imperfeita** — a modulação de espessura reconhece a pena, não o vetor perfeito.

## 2. Do — regras de uso

- Monograma sempre em **fill** (traçado modulado), nunca em outline uniforme.
- **Modulação de espessura visível** — laterais grossas, topo/base finos (Didone
  tardia). É a assinatura Didone; não achatar em circle uniforme.
- Wordmark em **EB Garamond medium small-caps**, letter-spacing generoso
  (`+0.13em` a `+0.16em`), sempre como legenda subordinada ao monograma.
- **Serifa dupla no centro do M** — assinatura autoral, presente **apenas** na
  versão hero. Não pode ser removida da hero.
- Cores canônicas: **dourado antigo** (`#A88148`) sobre **fundo profundo**
  (`#141010`) — 4.68:1, canônico dark. Ou **marrom couro** (`#4A2E1A`) sobre
  **marfim** (`#EDE2CE`) — 9.28:1, canônico receita física.
- **`currentColor`** herdado do container — trocar `color` do wrapper CSS
  troca a cor do monograma sem editar o SVG.

## 3. Don't — armadilhas travadas

- **Não** caligrafar a serifa dupla como voluta floreada — vira monograma de
  casamento de estúdio. A serifa dupla é sóbria, bracket estoico.
- **Não** desenhar o M com base horizontal fechada — o M precisa das duas
  hastes externas coincidindo com as bordas internas do O, senão vira dois
  glifos separados.
- **Não** usar Playfair, Bodoni, Trajan ou qualquer Didone óbvia de Google
  Fonts como base do path — as letras individuais podem partir de **EB
  Garamond** como REFERÊNCIA de forma, mas o entrelaçamento OM é AUTORAL.
- **Não** simular ornamento heráldico (coroa, laurel, estrela) ao redor do
  monograma. A força está na letra sozinha (Aglaia L97).
- **Não** deixar hairline abaixo de 0.5pt em impressão — some no papel
  timbrado. Testar cedo em impressão A4 (rodada futura, hoje pendente).
- **Não** inverter para dourado sobre âmbar — mata o contraste. Sempre
  dourado sobre profundo (dark) ou dourado/marrom couro sobre marfim (light).
- **Não** usar hex cru no CSS — sempre tokens `--omiron-*`.

## 4. Aplicação canal-a-canal (do briefing L100-106)

| Canal | Variante | Escala | Cor container | Observação |
|---|---|---|---|---|
| **App — dark canônico** | `monograma-40.svg` | ~32px topo do header | `--omiron-dourado-antigo` sobre `--omiron-fundo-profundo` | Wordmark só em splash e rodapé de config |
| **Receita física — papiro** | `monograma-hero.svg` ou `monograma-mono.svg` | ~24mm canto superior direito | `--omiron-marrom-couro` sobre `--omiron-marfim` | Nome do médico em Great Vibes no topo centralizado; CRM/especialidade no rodapé (Nomos) |
| **Instagram — papiro** | `monograma-40.svg` | 6% da largura do quadro (~40-60px) | `--omiron-dourado-antigo` @ 60-70% opacidade | Marca d'água no canto inferior direito; nunca herói do feed |
| **Deck comercial — capa** | `lockup-vertical.svg` | 30% da altura da capa | `--omiron-dourado-alto` sobre fundo profundo | Aplicado em `apresentacao/index.html` slide 1 |
| **Deck comercial — slides internos** | `monograma-40.svg` | ~4% da largura | `--omiron-dourado-antigo` @ 75% opacidade | Canto inferior direito de cada slide via CSS `::after` mask |
| **Símbolo inline (nav lateral 40×40)** | `monograma-40.svg` | 32-40px | `--omiron-dourado-antigo` | Aplicado em `brandbook.html` nav sidebar |
| **Rodapé do brandbook** | `monograma-40.svg` | 24px | `--omiron-dourado-antigo` | Aplicado em `brandbook.html` foot |
| **Papel timbrado B&W** | `monograma-mono.svg` | ≥ 15mm de altura | Negro puro `#000` | Hairlines robustas — sobrevive à absorção de tinta |
| **Favicon (16-32px)** | `monograma-40.svg` | 16/32px | `--omiron-dourado-antigo` | Pendente — arquivo `.ico`/`.png` derivado em rodada futura |

## 5. Matriz de escala × variante (regra de escolha)

| Contexto de uso | Escala típica | Variante recomendada | Motivo |
|---|---|---|---|
| Header de app, favicon, inline < 60px | 16 – 60 px | **`monograma-40.svg`** | Hairlines engrossadas 15%, sem serifa dupla — sobrevive a pixel-hint |
| Card de destaque, ícone médio | 60 – 100 px | **`monograma-40.svg`** ou **`monograma-hero.svg`** (escolha estética) | Zona de fronteira — Harmonia decide caso a caso |
| Símbolo em conteúdo, badge de identidade | 100 – 200 px | **`monograma-hero.svg`** | Serifa dupla se resolve; Didone completo aparece |
| Hero de capa, deck cover, moldura de brandbook | ≥ 200 px | **`monograma-hero.svg`** ou **`lockup-vertical.svg`** | Presença total; assinatura autoral visível |
| Papel timbrado B&W, marca d'água em documento | ≥ 15mm físico | **`monograma-mono.svg`** | Modulação atenuada + serifa dupla robusta para absorção de tinta |
| Assinatura de e-mail, header horizontal | 40 × 320 px típico | **`lockup-horizontal.svg`** | Monograma + wordmark em uma linha |
| Capa de deck, cabeçalho de proposta | 240 × 320 px típico | **`lockup-vertical.svg`** | Monograma centrado + wordmark abaixo |

## 6. Processo de vetorização (o que foi autoral)

**Referência de forma**
- EB Garamond como base tipográfica (revitalização digital de Claude Garamont,
  século XVI — SIL OFL, uso comercial livre). Tem estrutura humanista, eixo
  diagonal, contraste médio-alto.
- Push do contraste em direção a **Didone TARDIA** (Bodoni-influenciado, mas
  desenhado do zero) para acentuar o ar imperial-estoico do monograma.
- **Playfair/Bodoni/Trajan/Cormorant** NÃO foram usados como base — veto do
  briefing L96.

**Modulação de espessura — solução técnica**
- O contorno do **O** é resolvido como **DOIS ELIPSES CONCÊNTRICOS** com
  `fill="currentColor"` e `fill-rule="evenodd"`. O par cria a contra-forma
  Didone: hairlines finíssimas no topo/base, hastes grossas nas laterais.
  - Hero: externa `rx=75, ry=65`; interna `rx=60, ry=52`. Espessura resultante
    = laterais 15 uni, topo/base 13 uni. Contraste axial ≈ 1.15:1.
  - 40:  externa `rx=76, ry=66`; interna `rx=60, ry=48`. Hairlines engrossadas
    15% (topo/base 18 uni). Contraste atenuado para pixel-hint.
  - Mono: externa `rx=75, ry=65`; interna `rx=58, ry=50`. Modulação levemente
    atenuada para absorção de tinta em impressão.
- O **M** usa hastes retangulares diretas (não modulação por concentricidade)
  porque tipograficamente o M Didone tem hastes de LARGURA UNIFORME dentro de
  cada peso — o contraste do M vive nas serifas de topo/base, não no fuste.
  As hastes externas coincidem geometricamente com a borda interna do O.

**Serifa dupla no centro do M — escolha do glyph**
- Duas hastes verticais finíssimas (largura 1.6 uni no hero) descem do vértice
  central do V (x=100, y=100) até y=118. Cada uma termina em **serifa
  horizontal bracket** (largura 6 uni, altura 1.4 uni).
- **Bracket**, não voluta: linha reta horizontal com terminação seca — é a
  cadência tipográfica romana de serifa bracket, não a cadência caligráfica
  de voluta ornamental. O briefing veta explicitamente a voluta floreada
  (L94: "Não caligrafar a serifa dupla como voluta floreada").
- Ausente na versão 40 (empastaria a 40px) — regra por arquivo, não CSS
  conditional. Consumidor escolhe o asset por escala.

**Entrelaçamento OM**
- Hastes externas do M em `x=39-47` (esquerda) e `x=153-161` (direita) no
  hero. Coincidem com a borda interna do O (`rx interno = 60` centrado em
  `x=100`, o que dá borda interna esquerda em `x=40` e direita em `x=160`).
- V central do M: topo em `y=43` (nas serifas superiores), desce até `y=101.5`
  no lado externo e `y=111` no lado interno — o V não fecha no baseline
  (respiro imperial). As diagonais internas são as PARTES FINAS do M
  (contraste inverso do fuste horizontal, cadência Didone).
- Cristas serifadas do M sobem 10 uni acima do topo do O (`y=42` vs `y=50`),
  criando a silhueta de "pequeno frontão neoclássico coroando a letra
  circular" (Aglaia L51).

**Cor via currentColor**
- Todos os path do symbol usam `fill="currentColor"` — herdam a `color` do
  container CSS.
- Container CSS aplica `color: var(--omiron-dourado-antigo)` (dark) ou
  `color: var(--omiron-marrom-couro)` (receita).
- Prova viva no `showcase.html` §VI (token switcher).

**Wordmark do lockup**
- SVG `<text>` com `font-family="'EB Garamond', 'Cormorant Garamond', 'Georgia', serif"`.
- **Fallback** para Cormorant Garamond (Google Fonts fallback aprovado no
  `tipografia.md`) e Georgia (system fallback), garantindo renderização mesmo
  se EB Garamond não carregar.
- Weight 500 (medium), font-size 32-34 uni, `letter-spacing` 4.2-4.5 uni
  (≈ `+0.13em` a `+0.16em`, dentro da regra do briefing L88 de piso `+0.08em`).

## 7. Aplicação no brandbook + deck (o que foi modificado)

### `brandbook.html`
1. **Substituído** `<symbol id="omiron-mark">` — o símbolo procedural anterior
   (escadaria + O + pluma) foi trocado pelo Monograma Imperial versão 40.
2. **Adicionado** `<symbol id="omiron-mark-hero">` — versão hero para a capa.
3. **Corrigido** `viewBox` dos consumidores (`<svg viewBox="0 0 40 40">` →
   `viewBox="0 0 200 200"`) para casar com o viewBox do novo symbol.
4. **Adicionado** `.capa__mark` com o hero symbol acima do eyebrow da capa
   (~120px, cor `--omiron-dourado-alto`).

### `apresentacao/index.html`
1. **Substituído** `<symbol id="omiron-mark">` idem brandbook.
2. **Adicionado** `<symbol id="omiron-mark-hero">` e `<symbol id="omiron-lockup-vertical">`.
3. **Substituído** o `.cover__mark` do slide 1 pelo `.cover__lockup` com o
   lockup vertical inline (~30vh, min 200px, max 320px).
4. **Adicionado** CSS `.slide::after` com CSS mask apontando para
   `../design-system/03-componentes/logo/monograma-40.svg` — cria o selo
   dourado antigo (~4% da largura) no canto inferior direito de cada slide
   automaticamente. Slides `.cover` e `.end` não recebem o selo (regra
   contextual: a capa já é o monograma, o slide final tem outro tratamento).

### Preservado (nada alterado)
- Motion (IntersectionObserver + fade cinematográfico).
- Papiro procedural (filter SVG).
- Ícones dos 4 pilares (Corpo/Sansão, Pensamento/Alexandria, Sentimento/
  Kanagawa, Espírito/Hécate).
- Ornamento neoclássico separador.
- Todas as seções, cores, tipografia, layout.

## 8. Checklist anti-slop (auditado antes desta rodada)

- [x] **Nenhuma fonte pronta como base do path.** Os path do monograma são
      autorais — só o wordmark é `<text>` com EB Garamond (que é regra do
      brandbook, não base do desenho).
- [x] **Modulação de espessura visível.** Contraste axial O ~1.15:1 no hero,
      resultado de dois elipses concêntricos com contra-forma calculada.
- [x] **Serifa dupla no centro do M** presente na versão hero, ausente na
      versão 40 (regra por arquivo).
- [x] **`currentColor` funcionando** — validado no `showcase.html` §VI: mesmo
      symbol, 4 cores diferentes só trocando `color` do container.
- [x] **Sem ornamento heráldico** (coroa/laurel/estrela) ao redor do
      monograma. A letra sozinha.
- [x] **Contraste WCAG** — dourado antigo/fundo profundo 4.68:1 (AA + SC 1.4.11
      elemento gráfico); marrom couro/marfim 9.28:1 (AAA). Confere com
      `cores.md §5.2`.
- [x] **Hairline mínima 0.5pt** — menor traço no viewBox 200×200 é ~13 uni
      (topo/base do O no hero). A 40px físico, isso vira ~2.6px com anti-alias.
      A 200px, ~13px. Passa 0.5pt em qualquer escala prevista.
- [x] **Testado visualmente em 4 escalas** (40, 80, 200, 800 px) no
      `showcase.html` §I e §II. Renderiza limpo em todas.
- [x] **Anti-slop passado**:
  - Não parece monograma de estúdio de casamento (sem voluta, sem swash, sem
    caligrafia romântica).
  - Não parece brasão medieval de fantasia (sem coroa, sem laurel, sem
    cartouche floreado).
  - Não parece logo de perfume (sem serifa cursiva, sem espaçamento
    ultra-generoso de moda francesa).
  - Não parece "boutique de coisa cara vazia" (a assinatura autoral do
    entrelaçamento OM + serifa dupla dá densidade real).

## 9. Próximos passos

- **Teste de impressão A4 real** — imprimir `monograma-mono.svg` em impressora
  laser preto puro sobre papel timbrado marfim/off-white. Validar hairlines a
  15mm e 25mm. **Pendente para rodada seguinte** (não coube nesta).
- **Produção de PNG bitmap** derivado — 16, 32, 48, 64, 128, 256, 512 px.
  Utilidade: favicon multi-size, splash screen do app, avatar Instagram.
  **Pendente** — rodada seguinte gera via headless Chrome + tool de otimização.
- **Gate Nomos CFM 2.336** — validar que o monograma NÃO simula brasão médico
  oficial (Aglaia L28). O Monograma Imperial não tem cruz, caduceu, taça de
  Higieia, estetoscópio, coração ou qualquer emblema médico — passa o gate.
  Nomos confirma formalmente antes da reunião de 08/07 (se possível).
- **Validação com Dr. Ariosto** em 08/07/2026 — reunião ao vivo. Se ele pedir
  ajuste (ex.: sem serifa dupla, ou outro tratamento), Harmonia versiona
  `monograma-hero-v2.svg` sem quebrar o v1 (registro histórico).
- **Aplicação em favicon** — gerar `favicon.ico` multi-tamanho a partir de
  `monograma-40.svg`. Rodada seguinte.
- **Guia de dev handoff** — se e quando o app for para produção, criar
  `03-componentes/logo/handoff-dev.md` com receita de embed em React/Vue/Vanilla.

## 10. Ganchos de rastreabilidade

- **Direção conceitual**: Aglaia — `brandbook/direcoes-logo.md` §"Direção 1 —
  O Monograma Imperial" (L39-113).
- **Escolha do Ronan**: comunicada em 2026-07-07 via briefing desta rodada.
- **Vetorização**: Harmonia, 2026-07-07, esta sessão.
- **Rejeições que informaram o desenho**:
  - "sem app fofo de saúde mental" (Ariosto 01/07) → sem bounce, sem cor pastel.
  - "sem mascote" → sem cara, sem antropomorfismo.
  - "sem gradiente rosa-lilás" → cor plana (currentColor).
  - "sem flat design com sans-serif" → serif clássica autoral.
  - "sem brasão médico CFM" (Nomos) → sem cruz/caduceu/etc.
  - "sem monograma de casamento" (auto-imposto pela erudição) → bracket
    estoico, não voluta.
- **Reunião-alvo**: 2026-07-08, Dr. Ariosto Filho, Clínica Omiron BH.
