---
name: criativo-como-hipotese-rsa-pmax
description: |
  Criativo paid como hipótese testável — Responsive Search Ads (RSA) com 15 headlines +
  4 descriptions com pin strategy calibrada, asset groups do Performance Max (PMax) por
  tema/ângulo, matriz de teste de hooks para vídeo PMax, ciclo hipótese → validação por
  conversão. Use quando o pedido for "criar RSA", "responsive search ad", "PMax", "Performance
  Max", "asset group PMax", "pin strategy", "criativo é hipótese", "matriz de teste de
  criativo", "ângulos de PMax", "como estruturar Performance Max". NÃO é escrita da headline
  em si (isso é handoff a Caliope — `headline-e-hook-testaveis`). NÃO é criativo de social
  paid Meta/TikTok (use `paid-social-cross-platform`).
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

# Criativo como hipótese — RSA + PMax (PT-BR)

Um criativo paid não é "arte" — é uma **hipótese testável**. Toda peça carrega implícita uma
tese ("público X responde à angulação Y no momento Z") e o job da mídia paga é submeter
essa tese ao veredito da conversão. Esta habilidade trata RSA (search) e PMax (Performance
Max) como duas máquinas diferentes de testar hipóteses.

## Herança histórica

- **Frederick Vallaeys (Optmyzr)** — codificou o conceito "cada criativo = uma hipótese";
  formulou o teste ex-post RSA baseado em asset performance.
- **Ginny Marvin (Google Ads Product Liaison, 2018-2024)** — documentou o padrão pin
  strategy: pin para brand safety, unpin para descoberta.
- **Kirk Williams / Zato Marketing** — publicou os primeiros teardowns públicos de PMax
  (2022) e evidenciou o padrão de asset group por tema.
- **Menachem Ani (JXT Group)** — engenheiro do padrão "search-first, PMax second" para
  contas $1M+/mês.

## Modelo mental — hipótese testável

Cada peça carrega, no verso, uma frase testável:

> "**Público-alvo** X, buscando/consumindo Y, no momento Z, converte melhor com
> **ângulo** A do que com ângulo B."

Se você não consegue formular essa frase para o criativo, ele não é uma hipótese — é um
palpite. E palpite queima orçamento em silêncio.

## RSA — Responsive Search Ads

RSA é a hipótese search. Google combina headlines e descriptions para servir a combinação
com melhor performance por auction. Regras operacionais:

### 15 headlines + 4 descriptions — a matriz

Não escreva "15 variações da mesma headline". Escreva **grupos de ângulo**.

| Bloco | Nº headlines | Ângulo |
|---|---|---|
| Marca + oferta | 3 | "{Marca}: {benefício}" |
| Palavra-chave direta | 3 | inclui a keyword da campanha textualmente |
| Benefício principal | 3 | resultado quantificado |
| Prova social | 2 | "10.000 clientes / 4.8★" |
| Urgência / oferta | 2 | "Hoje / Vagas limitadas / Garantia 30d" |
| Diferenciação | 2 | "O único que {X}" |

Descriptions (4):
- 1 focada em benefício + prova
- 1 focada em oferta + garantia
- 1 focada em objeção respondida
- 1 focada em CTA claro

### Pin strategy — calibrar, não engessar

Pin de tudo mata o algoritmo. Pin de nada compromete brand safety. A régua:

| Elemento | Pin ou não | Racional |
|---|---|---|
| Headline 1 (posição 1) | **Pin** se brand safety exige | Marca + oferta ou compliance-critical |
| Headline 2 (posição 2) | **Pin fraco** (2+3) | Deixa Google testar entre 2 opções |
| Headline 3 (posição 3) | Não pin | Liberdade total pro algoritmo |
| Description 1 | **Pin fraco** para 1 opção institucional | Trust + benefício |
| Description 2 | Não pin | Descoberta |

**Regra dura:** se a Ad Strength está em "Poor" ou "Average", é sinal de pin excessivo ou
falta de ângulos — não ignore, calibre.

### Ciclo de vida — a hipótese

1. **Escrever** 15 heads em 6 ângulos.
2. **Rodar** 21 dias mínimo (não julgue antes).
3. **Ler** asset performance report (Best / Good / Low / Learning).
4. **Substituir** apenas os "Low" — nunca troque um "Best".
5. **Iterar** com novos ângulos derivados dos Best.

## PMax — Performance Max

PMax é a máquina de teste multi-rede (Search + Display + YouTube + Discovery + Gmail + Maps).
A alavanca do anunciante é o **asset group**.

### Asset group por tema/ângulo (não por rede)

Erro comum: 1 asset group monolítico. Correto: 3-5 asset groups por conta, cada um com um
tema:

| Asset group | Tema | Signals |
|---|---|---|
| Brand defender | consumidores buscando pela marca | search themes: nome da marca + variações |
| Category challenger | consumidores buscando pela categoria | search themes: keywords genéricas alto-volume |
| Problem solver | consumidores pesquisando a dor | audience signal: interest cluster da dor |
| Competitor conquest | consumidores pesquisando concorrente | search themes com competitor names |
| Retargeting | remarketing de site visitors | audience signal: 1st-party CRM + site visitors |

Cada asset group carrega assets próprios: 15 heads / 5 descriptions / 5 imagens (múltiplos
aspect ratios) / até 5 vídeos / logos / call-to-action.

### Signals do PMax — como acelerar o aprendizado

- **Audience signals** — 1st-party (CRM upload), 2nd-party (custom segments), 3rd-party
  (in-market / affinity). Signal não é target, é dica.
- **Search themes** (após 2024) — Google publica; use como "keywords sugeridas". Máximo
  25 por asset group.
- **Final URL expansion** — desligue no início. Ligue depois quando o asset group está
  travado num tema claro.

### Matriz de teste de hooks (vídeo PMax)

PMax roda o vídeo em YouTube, Discovery, in-stream. Cada tem retention curve diferente. A
matriz mínima:

| Hook | Duração | Contexto de teste |
|---|---|---|
| Pergunta direta ("Você paga X por Y?") | 6s + 15s | Discovery, in-stream skip |
| Prova visual (produto na tela) | 15s + 30s | in-stream, YouTube Shorts |
| Depoimento em texto na tela | 15s | Shorts, mobile |
| Contraintuitivo (afirmação inesperada) | 6s | pre-roll skippable |

Todos os hooks precisam ter caption embutida (mute-first) e resolver a promessa em <3s.

## Anti-padrões

- **RSA com 15 headlines quase idênticas** — algoritmo não combina, entrega "Poor" e você
  não descobre por que.
- **Pin em tudo** — desativa o A/B implícito do RSA. Se você precisa pinar tudo, sua conta
  precisa de RSA restrito, não RSA.
- **PMax com 1 asset group para tudo** — Google não sabe qual tema priorizar, gasta com
  brand queries e mata margem.
- **Ignorar Search Themes / search terms de PMax** — perde 40-70% do controle disponível.
- **Vídeo PMax sem caption** — 85% do inventário roda mudo; se depende de áudio, o hook
  morre no primeiro segundo.

## Fronteiras inter-squad

- **Estrutura de teste + asset group design + pin strategy** — Peitho faz (esta habilidade).
- **Copy das headlines / descriptions** — handoff a **Caliope**
  (`headline-e-hook-testaveis` + `anuncio-por-estagio-de-consciencia`).
- **Design de imagens e vídeos** — handoff a **Aglaia**.
- **Landing page casada com o RSA** — handoff a **Caliope** (`estrutura-de-pagina-de-vendas`).

## Formato de saída

1. Hipótese testável explícita para cada asset group / RSA.
2. Matriz de 15 heads + 4 descriptions com bloco/ângulo.
3. Pin strategy justificada por posição.
4. Asset groups do PMax (3-5) com tema, signals e assets alocados.
5. Matriz de hooks para vídeo (4 mínimo).
6. Ciclo de vida do teste (21 dias mínimo, o que ler, quando iterar).

## Referências

- `references/rsa-blueprint.md` — molde de RSA com blocos de ângulo.
- `references/pmax-asset-group-template.md` — template de asset group.

---

Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B02/paid-media
(IDs PM-G5, G6). Herança histórica: Frederick Vallaeys, Ginny Marvin, Kirk Williams
(Zato), Menachem Ani (JXT). Sem cópia literal do upstream.
