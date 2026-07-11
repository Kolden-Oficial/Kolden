---
tipo: skill
area: Aglaia
up: "[[Aglaia/_MOC-aglaia]]"
---

<!--
Atribuição: derivado de msitarzewski/agency-agents@a597cb6 (G25) — licença MIT.
Esta skill é uma reescritura PT-BR original, sem cópia literal do upstream.
-->
---
name: micro-interacoes-de-marca
description: |
  Use quando precisar DECIDIR a personalidade da marca em micro-interações (botão hover, form
  validation, loading, transição). DECISÃO CRIATIVA — não escreve código nem motion (essa é
  Harmonia/implementacao-ui). Cobre delightful feedback, cultural sensitivity, brand voice na
  animação. Handoff explícito para Harmonia (motion + a11y) e Caliope (microcopy de mensagem).
domain: design
subdomain: brand-micro-interactions
agente_primario: [aglaia-chief]
tags: [micro-interacao, motion-personality, delightful-feedback, brand-expression]
fonte_upstream: msitarzewski--agency-agents@a597cb6 (G25)
---

# Micro-interações de marca

## Fronteira (CRÍTICA — declarar 3x)

**1ª declaração — no frontmatter:** "DECISÃO CRIATIVA — não escreve código nem motion".

**2ª declaração — na abertura:** esta skill **DECIDE** a personalidade da animação.
Quem **IMPLEMENTA** é `Harmonia/implementacao-ui` (motion code, a11y, performance). Quem
**ESCREVE** o microcopy associado é `Caliope/fundacao-de-voz` (estratégico) ou
`Aglaia/microcopy-de-interface` (aplicado). Aglaia entrega brief criativo executável,
não TSX/CSS.

**3ª declaração — repetida no anti-padrão:** "Aglaia entregando TSX/CSS (handoff Harmonia)".

## Quando usar

Acione quando o produto for **personalidade de marca em micro-interações** — qual o tom
do hover do botão? Como a marca "se move" quando valida um form? Que sensação o loading
deixa? O entregável é uma direção criativa + mood board + brief de handoff.

## 1. Tom da micro-interação

Quatro arquétipos de personalidade. A escolha vem da identidade de marca (definida em
`pipeline-de-identidade-de-marca`).

| Tom      | Características                                    | Exemplos de contexto                    |
|----------|----------------------------------------------------|-----------------------------------------|
| Lúdico   | Bounce, easter eggs ao hover, sound opcional       | Loud brands, jogos, infantil, lifestyle |
| Sério    | Transições suaves, fade, sem som                   | Banks, healthcare, jurídico             |
| Técnico  | Snap rápido, instant feedback, sem fanfare         | Devtools, IDE, dashboards de operação   |
| Premium  | Slow ease-in, subtle parallax, luxury feel         | High-end fashion, joalheria, hospitality|

A escolha do tom é **estratégica** — vem da marca, não da preferência do designer.

## 2. Delightful feedback (sem comprometer função)

Função vem primeiro. Delight vem em cima. Categorias:

- **Confirmação visual em sucesso** — checkmark animado, color flash. Diz "deu certo"
  antes do texto carregar.
- **Friendly error** — não martelado, com tom da marca. "Ops, tenta de novo" (lúdico) vs
  "Erro X, verifique Y" (sério).
- **Empty state com personalidade** — momento de explicar por que está vazio e o que
  fazer. Marca aparece aqui.
- **Loading state que distrai positivamente** — não só spinner. Skeleton loader, frase
  curta, animação temática. Distrai sem irritar.

## 3. Cultural sensitivity

- **Cores** — significados culturais variam. Vermelho = perigo (ocidente) / sorte (China).
  Branco = pureza / luto. Decisão de paleta deve considerar mercado.
- **Animação** — velocidade percebida varia culturalmente. Mercados rápidos toleram
  menos delay; mercados contemplativos absorvem ritmo mais lento.
- **Som** — opt-in sempre (acessibilidade + cultura silenciosa em ambiente público).
  Som default = perda de confiança em metade dos contextos de uso.

## 4. Brand voice na animação

Como a marca **se move**?

- Espontâneo (bounce, overshoot, curva alegre)?
- Metódico (linear, previsível, curva técnica)?
- Elegante (ease-in lento, sem brusquidão)?

**Princípios consistentes** — mesma curva de easing em toda interface, mesma duração
para mesma classe de ação, mesma hierarquia visual de feedback. Inconsistência destrói
percepção de marca antes mesmo de o usuário nomear o problema.

## 5. Output

Brief de 1 página em 4 blocos:

1. **Tom escolhido** + justificativa (vem da identidade de marca).
2. **Delightful feedback** — 4 micro-momentos prioritários (sucesso, erro, empty, loading).
3. **Cultural sensitivity** — restrições do mercado-alvo.
4. **Brand voice na animação** — princípios + curva de easing padrão + durações.

Anexos:

- Mood board de referência (3-5 exemplos visuais).
- Handoff para Harmonia: brief executável (não código), com decisões criativas
  amarradas.

## 6. Anti-padrões

- **Aglaia entregando TSX/CSS** — quebra de fronteira. Handoff é para Harmonia.
- **Lúdico em contexto sério** — banking app com confetti em transferência = perda de
  confiança imediata.
- **Animação só por animação** — sem função, sem feedback, sem ritmo. Vira ruído.
- **Inconsistência de easing** — curvas diferentes em mesma interface percebem como
  "feito por gente diferente".
- **Ignorar a11y** — `prefers-reduced-motion` é obrigatório respeitar. Brief sem isso
  vira retrabalho no handoff.

## 7. Cross-links

- **Harmonia/implementacao-ui** — handoff técnico (motion + a11y + performance).
- **Caliope/fundacao-de-voz** — voz estratégica que rege o microcopy associado.
- **Aglaia/microcopy-de-interface** — aplicação do tom em mensagens funcionais.
- **Aglaia/pipeline-de-identidade-de-marca** — voice + visual + valores que informam
  as decisões aqui.
