# Pré-flight visual — checklist mecânico de saída

> Digerido de `Leonxlnx/taste-skill` seção 14 "Final Pre-Flight Check" (MIT).
> Reescrito em PT-BR. **Apenas itens visuais/estruturais.** Itens de copy/conteúdo
> (em-dash, auto-auditoria de texto) são gate do squad **Caliope**.
>
> Regra: **rode todo box. Se um único não pode ser honestamente marcado, a tela
> não está pronta.** Conte de fato (eyebrows, marquees) — é mecânico, não impressão.

## Fundamentos do processo

- [ ] Design Read declarado (uma linha: tipo × público × vibe × família).
- [ ] Dials explícitos e justificados pelo briefing (não usando baseline em silêncio).
- [ ] Design-system escolhido (oficial) OU estética rotulada honestamente.
- [ ] Modo redesign detectado e auditoria feita (se aplicável).

## Travas de consistência

- [ ] **Tema único** na página (light, dark ou auto) — nenhuma seção inverte no meio.
- [ ] **Cor de acento única** usada igual em todas as seções.
- [ ] **Sistema de raio único** aplicado consistentemente.

## Hero

- [ ] Headline ≤ 2 linhas; subtexto ≤ 20 palavras e ≤ 4 linhas; CTA visível sem scroll.
- [ ] Padding-top do hero ≤ `pt-24` no desktop; conteúdo não flutua no meio da viewport.
- [ ] Máx. 4 elementos de texto no hero (eyebrow OU brand-strip, headline, subtexto, CTAs).
- [ ] Logo wall ("Used by/Trusted by") vive ABAIXO do hero, com logos SVG reais.

## Contagens mecânicas

- [ ] **Eyebrows:** contar micro-labels `uppercase tracking` acima de headlines.
      Total ≤ ceil(nº de seções / 3)? (hero conta como 1)
- [ ] Sem split-header ("headline grande à esquerda + parágrafo pequeno à direita").
- [ ] Sem 3+ seções consecutivas com o mesmo layout imagem+texto (cap de zig-zag).
- [ ] Pelo menos 4 famílias de layout diferentes em 8 seções.
- [ ] Marquee: no máx. um por página.
- [ ] Bento: nº de itens = nº de células (sem célula vazia no meio/fim); 2-3 células
      com variação visual real (imagem/gradiente/padrão), não tudo texto branco.

## Cor, forma, contraste

- [ ] Todo CTA legível contra seu fundo (sem branco-no-branco; WCAG AA 4.5:1).
- [ ] Label de CTA não quebra em 2+ linhas no desktop.
- [ ] Inputs/placeholders/focus-ring/labels passam WCAG AA contra o fundo da seção.
- [ ] Se premium-consumer: paleta NÃO é o default bege+latão+oxblood+espresso de IA.
- [ ] Se há serifa: justificada por marca, diferente do projeto anterior.

## Imagens & componentes

- [ ] Imagens reais (ferramenta de geração → picsum-seed → slot de placeholder).
      Sem fake screenshot de div, sem SVG decorativo à mão, sem minimalismo só-texto.
- [ ] Sem pills/labels sobre imagens; sem legenda de crédito-de-foto decorativa.
- [ ] Sem footer de versão (`v1.4.2`); sem strip de decoração no fim do hero.
- [ ] Sem dots decorativos (zero por default; só estado semântico real).
- [ ] Sem barras de score com trilho de fundo; sem strip de locale/hora/clima.
- [ ] Sem scroll cues; sem labels de versão no hero; sem eyebrows numeradas.
- [ ] Listas longas usam o componente certo (não `<ul>` com `divide-y` para > 5 itens).
- [ ] Ícones só de lib permitida (Phosphor/HugeIcons/Radix/Tabler).

## Movimento & técnica

- [ ] Toda animação justificável em uma frase; sem GSAP-for-show.
- [ ] Se MOTION > 4, a página de fato anima (não só alega).
- [ ] Sem `window.addEventListener('scroll')` (usar useScroll/ScrollTrigger/IO/CSS).
- [ ] Reduced-motion envolto para todo MOTION > 3; dark mode testado nos dois modos.
- [ ] `min-h-[100dvh]` (nunca `h-screen`); `useEffect` com cleanup estrito.
- [ ] Estados empty/loading/error presentes; nav em uma linha (≤ 80px) no desktop.
- [ ] Um design-system por projeto (sem Material + shadcn misturados).
- [ ] CWV plausíveis (LCP < 2.5s, INP < 200ms, CLS < 0.1).
