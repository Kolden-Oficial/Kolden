## Problema
A logo está com `-my-6` (margin negativa) somada a `h-20/h-24` dentro de um header com `py-3.5`. Resultado: ela estoura visualmente o header e/ou parece desproporcional em relação ao botão "Entrar grátis no grupo" (que é bem menor).

## Mudança (`src/pages/LandingCata.tsx`, l.38-44)
1. Remover `-my-6` (margin negativa que cortava o header).
2. Ajustar altura para tamanhos proporcionais ao header: `h-12 sm:h-14` (48px mobile / 56px desktop) — bem visível mas alinhado ao tamanho do botão CTA.
3. Reduzir `py-3.5` do container para `py-2.5` para manter o header compacto.

Resultado: logo grande o suficiente para ser legível, sem estourar o header nem desproporcionar com o CTA ao lado.