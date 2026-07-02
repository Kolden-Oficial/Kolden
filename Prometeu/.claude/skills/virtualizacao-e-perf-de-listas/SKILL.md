---
name: virtualizacao-e-perf-de-listas
description: Use quando renderizar listas/tabelas/grids GRANDES (>100 itens) e o usuário percebe scroll travando, jank, FPS baixo ou tempo de mount alto. Cobre virtualization (react-window, tanstack-virtual), windowing dinâmico (altura variável), overscan tuning, skeleton loading, mensuração de altura on-mount e estratégias de paginação vs infinite scroll vs load-more. Regra dura&#58; renderizar apenas o que está no viewport + buffer. Dono&#58; @dev (Dex). NÃO cobre otimização de query no backend (isso é `otimizacao-de-banco-postgres-supabase`). NÃO cobre server components / streaming SSR (isso é ROADMAP React RSC).
---

# Virtualização e Performance de Listas

## Quando invocar

- Lista/tabela com > 100 itens (regra de ouro; acima disso, render de tudo já dá jank perceptível em mid-range)
- Feed infinito (social, chat, notification center)
- Grid de imagens/cards (Pinterest-style)
- Datatable admin com milhares de linhas
- Chat com histórico longo (mensagens antigas)
- Autocomplete/combobox com muitos resultados

## Diagnóstico primeiro — quando NÃO virtualizar

Virtualização adiciona complexidade. Antes de aplicar, meça:

1. **Chrome DevTools Performance:** grave 5s de scroll. Se long tasks > 50ms aparecem, tem problema.
2. **React Profiler:** mount time > 300ms para primeira renderização de lista? Custo real.
3. **Number of DOM nodes:** > 5000? Custo real.
4. **Bundle size do item:** cada item importa componente pesado? Otimize o item primeiro.

**Se a lista tem < 100 itens simples**, virtualization piora — overhead > ganho. Alternativas:
- `React.memo` no item
- `useMemo` para lista derivada
- Key estável (nunca `index` em lista mutável)

## As 3 bibliotecas principais

### react-window (Brian Vaughn, ~2018)

**Quando:** casos comuns, lista/grid fixed-size ou variable-size, sem necessidades exóticas.

**API:** `FixedSizeList`, `VariableSizeList`, `FixedSizeGrid`, `VariableSizeGrid`. Pequena (~7KB), rápida.

**Anti-padrão:** usar `FixedSizeList` com altura variável (falha silenciosamente, itens sobrepõem).

### @tanstack/react-virtual (Tanner Linsley, 2023+)

**Quando:** precisa de flexibilidade — window virtualization, horizontal + vertical, dynamic measurement, scroll-to-index preciso, framework-agnostic (React, Vue, Solid, Svelte).

**Vantagem sobre react-window:** hook-based, controle fino, primitivas melhores para dynamic-size sem intrusão no JSX.

**Default Kolden:** `@tanstack/react-virtual` para novos projetos. `react-window` para código legado.

### react-virtualized (Brian Vaughn, ~2016 — LEGACY)

**Quando:** NUNCA em código novo. Manutenção mínima; substituído por `react-window` pelo próprio autor.

Se herdou codebase com `react-virtualized`, migração para `react-window` ou `tanstack-virtual` é backlog.

## Windowing com altura variável

**Problema:** virtualization "assume" que sabe a altura de cada item para calcular offset. Se a altura varia (texto multiline, imagens de dimensão variada, cards com conteúdo dinâmico), precisa **medir on-mount**.

### Estratégia measure-on-mount

1. Renderize item invisível (ou com `visibility: hidden`) num container off-screen na primeira vez que aparece.
2. Meça `element.getBoundingClientRect().height` (ou `ResizeObserver`).
3. Cache no store: `Map<itemId, height>`.
4. Use altura estimada (`estimateSize`) até medir; substitua ao medir.
5. Reajuste scroll offset se altura medida ≠ estimada (evita "salto").

Em `@tanstack/react-virtual`:
```
const virtualizer = useVirtualizer({
  count: items.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 80,  // estimativa
  measureElement: (el) => el?.getBoundingClientRect().height,  // medida real
  overscan: 5,
})
```

**Anti-padrão:** medir cada item em cada render (custa reflow). Meça uma vez e cache.

## Overscan tuning

**Overscan** = quantos itens renderizar ALÉM do viewport (antes/depois). Buffer contra scroll rápido.

| Cenário | Overscan recomendado |
|---|---|
| Lista simples texto | 3-5 |
| Cards com imagem (lazy loaded) | 5-10 (evita "buraco" branco) |
| Scroll acelerado (fling em mobile) | 10-15 |
| Grid 2D | 2-3 linhas (pode multiplicar por colunas) |
| Autocomplete (usuário para de scrollar rápido) | 2 |

**Trade-off:** overscan alto = memória e mount cost. Overscan baixo = risco de tela em branco em scroll rápido.

Mensuração: FPS durante scroll rápido. Se cai abaixo de 55, sobe overscan. Se memória sobe demais, desce.

## Skeleton loading

Enquanto a lista carrega (dados do backend + primeira medida de altura), evite CLS (Cumulative Layout Shift) com skeleton:

- Skeleton item com **mesma altura estimada** do item real
- Skeleton lista com quantidade proporcional (mostra 8-12 itens, não 1000)
- Animação sutil (shimmer) — não requerida, mas melhora percepção

Cross-link `sistema-de-design` (Harmonia) para tokens de skeleton (cor de fundo, cor de shimmer).

**Anti-padrão:** spinner central em vez de skeleton. Perde a promessa de "vai ter conteúdo aqui, na forma X".

## Estratégias de carregamento de dados

### Paginação clássica (page/size)

Backend: `GET /items?page=3&size=50`. Frontend: render página inteira, navegação por número.

**Quando:** dados imutáveis (arquivo histórico), busca com "página 5 de 200".

### Infinite scroll (cursor-based)

Backend: `GET /items?cursor=xyz&limit=50`. Frontend: fetch mais ao chegar perto do fim da lista (IntersectionObserver na "sentinela").

**Quando:** feed cronológico, chat, notifications.

**Cuidado:** rewind (usuário perde posição) e SEO ruim. Para conteúdo importante indexável, prefira paginação.

### Load-more (botão)

Backend: cursor-based. Frontend: botão explícito.

**Quando:** admin dashboards, dados de compliance (auditoria explícita do "ver mais").

### Bidirecional (chat, timeline)

Load mais itens **acima** ao scrollar para cima **e** mais abaixo ao scrollar para baixo. `@tanstack/react-virtual` suporta com `range` customizado + anchor management.

**Regra dura:** ao carregar mais itens acima, PRESERVE o scroll offset (não pule o usuário). Anchor no item mais alto visível antes do append.

## Casos-limite

### Sticky headers em virtualizer

Coluna/linha "fixa" no topo enquanto rola. Duas abordagens:
- Renderizar fora do virtualizer (mais simples)
- Marcador `sticky` no virtualizer com CSS `position: sticky` (requer parent com overflow certo)

### Grid virtualizado (2D)

Cálculo de célula = `(rowIndex, colIndex)`. `FixedSizeGrid` de `react-window` cobre bem. Overscan aplicado nos dois eixos.

**Cuidado:** medir altura por linha (não por célula individual) é comum e simplifica.

### Scroll-to-index

Ao abrir lista já centrada num item (deep link, "reply to message X"):
1. `virtualizer.scrollToIndex(index, { align: 'center' })`
2. Se altura variável e item ainda não medido → salto errado. Solução: measure-all-above-and-target antes de scrollTo, ou usar `align: 'start'` que é mais tolerante.

### Search dentro de lista virtualizada

Filtrar array antes de passar para virtualizer. Não tente filtrar dentro do render de item — quebra os índices.

## Mobile: cuidados extras

- Touch scroll = flings velozes. Overscan +50% vs desktop.
- iOS Safari tem quirks com `overflow: scroll` + `-webkit-overflow-scrolling: touch`. Teste em device real.
- Momentum scroll interfere em IntersectionObserver — use limiar generoso (`rootMargin: '200px'`).
- Fila de jank é multi-frame — use `requestAnimationFrame` para atualizar altura medida.

## Ferramentas de mensuração

- **Chrome DevTools Performance** — gravação de scroll de 5s
- **React DevTools Profiler** — commit time por item
- **Lighthouse** — se página tem lista principal, roda cinco vezes
- **web-vitals** JS (INP, CLS, LCP)

Cross-link `core-web-vitals-e-performance` (Ariadne) — lista virtualizada afeta LCP se está above-the-fold.

## Cross-links

- `padroes-de-engenharia-idiomatica` — regras React (memo, keys estáveis)
- `sistema-de-design` (Harmonia) — tokens de skeleton
- `core-web-vitals-e-performance` (Ariadne) — impacto no LCP/INP
- `desenvolvimento-mobile-multiplataforma` — mesma preocupação em React Native (FlatList, FlashList)

## Herança histórica

**Brian Vaughn** (React core team ~2016-2020, autor de `react-window` e `react-virtualized`) — deu à comunidade React a virtualização de lista de fato. Documentação e tests dos dois pacotes são leitura obrigatória.

**Tanner Linsley** (TanStack team, autor de `react-virtual`, `tanstack-query`, `tanstack-table`) — evolução: hook-based, framework-agnostic, dynamic measurement como primitiva de primeira classe.

**Ryan Florence & Michael Jackson** (React Router, Remix) — evangelistas do "load only what the user sees" como princípio, além de virtualização (ex: nested routes com data-loading por segmento).

**Adrian Holovaty & Simon Willison** (Django, Datasette) — no lado servidor, cursor-based pagination como default. Um bom cursor é meio caminho para virtualization boa.

## Anti-padrões

- ❌ Virtualizar lista de 20 itens — overhead > ganho
- ❌ `key={index}` em lista virtualizada mutável — reordenação quebra
- ❌ Medir altura em cada render — reflow massivo
- ❌ Overscan = 0 — buraco branco em scroll rápido
- ❌ Não fixar scroll ao inserir itens acima (chat) — usuário perde contexto
- ❌ Filtrar dentro do render de item — índices ficam errados
- ❌ Deixar `react-virtualized` em código novo — legacy sem manutenção

---
*Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B03/engineering.*
