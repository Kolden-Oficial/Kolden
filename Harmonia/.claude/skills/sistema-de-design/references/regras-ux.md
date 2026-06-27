# Regras de UX (~99 diretrizes, 18 categorias)

Corpo de regras com `Faça / Não faça / exemplo bom / exemplo ruim / severidade`,
fundamentado em Apple HIG, Material Design e WCAG
(`ui-ux-pro-max/data/ux-guidelines.csv`, MIT). Use como checklist de QA visual.
Distribuição por categoria: Acessibilidade (11), Forms (10), Animação (8),
Interação (8), Performance (8), Responsivo (8), Layout (7), Touch (6),
Tipografia (6), Feedback (6), Navegação (6), Content (4), AI Interaction (3),
Spatial UI (2), Search (2), Sustentabilidade (2), Data Entry (1), Onboarding (1).

## Acessibilidade (CRÍTICA)

- Contraste mínimo 4.5:1 (texto normal) / 3:1 (texto grande).
- Anel de foco visível (2–4px) em todo elemento interativo. Nunca remover foco.
- Alt descritivo em imagens com significado; aria-label em botão só-ícone.
- Ordem de tab = ordem visual; suporte total a teclado.
- `label` com `for`; hierarquia de heading sequencial h1→h6 sem pular nível.
- Não transmitir informação só por cor (adicionar ícone/texto).
- Respeitar `prefers-reduced-motion`; suportar dynamic type/escala de texto.
- Rotas de escape (cancelar/voltar) em modais e fluxos multi-etapa.

## Touch & Interação (CRÍTICA)

- Alvo mínimo 44×44pt (Apple) / 48×48dp (Material); estender hit-area além do
  visual quando preciso.
- Gap mínimo 8px entre alvos de toque.
- Clique/tap para ações primárias; não depender só de hover.
- Desabilitar botão durante operação async; mostrar spinner/progresso.
- Mensagem de erro clara perto do problema (não só no topo).

## Performance

- WebP/AVIF, lazy loading, reservar espaço para mídia (CLS < 0.1).
- Evitar layout thrashing; mirar Core Web Vitals (LCP < 2.5s, INP < 200ms).

## Layout & Responsivo

- Mobile-first, breakpoints, viewport meta, sem scroll horizontal.
- Container fluido (não largura fixa em px); nunca desabilitar zoom.

## Tipografia & Cor

- Base 16px, line-height 1.5, tokens semânticos (sem hex cru no componente).
- Evitar cinza-sobre-cinza; corpo nunca < 12px.

## Animação

- Duração 150–300ms; movimento carrega significado (hierarquia/feedback/transição
  de estado), nunca decoração pura.
- Não animar `width`/`height` (usar transform/opacity); honrar reduced-motion.

## Forms & Feedback

- Rótulo visível (não só placeholder); erro junto ao campo; helper text.
- Divulgação progressiva — não despejar tudo de uma vez.

## Navegação

- Voltar previsível; bottom-nav ≤ 5 itens; deep-linking; estado ativo visível.

## Charts & Dados

- Legenda, tooltip, cores acessíveis; nunca depender só de cor para transmitir.

## AI Interaction / Spatial / Search / Sustentabilidade

- Estados de carregamento/streaming claros em interfaces de IA.
- Profundidade e alvos confortáveis em UI espacial (VisionOS).
- Busca com feedback de zero-resultado e sugestões.
- Reduzir peso/energia (assets enxutos, dark opcional em OLED).
