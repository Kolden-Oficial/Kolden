# Dials por sinal, presets de uso e direções de arte

> Digerido de `Leonxlnx/taste-skill` (MIT): seções de dials, presets, e as skills
> de direção (soft, minimalist, brutalist, gpt-taste/Awwwards, redesign). PT-BR.

## Inferência de dials (Design Read → valores)

| Sinal do briefing | VARIÂNCIA | MOTION | DENSIDADE |
|---|---|---|---|
| minimalista / clean / calmo / editorial / Linear-style | 5-6 | 3-4 | 2-3 |
| premium consumer / Apple-y / luxo / marca | 7-8 | 5-7 | 3-4 |
| playful / Dribbble / Awwwards / experimental / agência | 9-10 | 8-10 | 3-4 |
| landing / portfólio / marketing (default) | 7-9 | 6-8 | 3-5 |
| trust-first / setor público / regulado / acessibilidade-crítica | 3-4 | 2-3 | 4-5 |
| redesign — preservar | = existente | +1 | = existente |
| redesign — overhaul | +2 | +2 | = existente |

## Presets de uso

| Caso de uso | VARIÂNCIA | MOTION | DENSIDADE |
|---|---|---|---|
| Landing (SaaS mainstream) | 7 | 6 | 4 |
| Landing (agência/criativo) | 9 | 8 | 3 |
| Landing (premium consumer) | 7 | 6 | 3 |
| Portfólio (designer/estúdio) | 8 | 7 | 3 |
| Portfólio (dev) | 6 | 5 | 4 |
| Editorial / blog | 6 | 4 | 3 |
| Serviço de setor público | 3 | 2 | 5 |

## Escolher sistema real vs. estética

Quando o briefing lê como um sistema oficial, **instale o pacote oficial** e não
recrie o CSS à mão: Fluent (Microsoft), Material 3 (Google), Carbon (IBM), Polaris
(Shopify), Atlaskit (Atlassian), Primer (GitHub), GOV.UK / USWDS (setor público),
Radix Themes, shadcn/ui, Tailwind v4. Um sistema por projeto.

Quando o briefing é uma **estética** (glassmorphism, bento, brutalismo, editorial,
dark tech, aurora, kinetic type), não há pacote único: construa com CSS nativo +
Tailwind + lib mantida, e seja honesto em comentário sobre o que é inspiração vs.
material oficial.

## Direções de arte (presets estéticos)

- **Minimalista editorial** (Notion/Linear): monocromático quente, bento flat,
  pastéis dessaturados; banir excesso de fonte/ícone/sombra. Dials baixos.
- **Soft / premium** (estética de agência cara): variance engine (vibe×layout),
  double-bezel/Doppelrand, button-in-button, coreografia de motion com
  cubic-bezier. Acabamento caro.
- **Brutalista / telemetria tática**: grid blueprint, contraste tipográfico
  extremo, CRT/halftone/dithering, paleta utilitária.
- **Awwwards / experimental** (variante "gpt-taste"): randomização determinística
  para variar composição, estrutura AIDA, regra do hero em 2 linhas, bento gapless
  (`grid-flow-dense`), ScrollTriggers GSAP estritos. Dials altos.

## Protocolo de redesign (auditar antes de mexer)

Em redesign, os ativos existentes (logo, cor, tipo, foto) são **material de
partida**, não opcionais. Ordem: **scan → diagnose → fix.** Catalogue os problemas
por categoria, priorize correções, e decida preservar vs. overhaul (afeta os
dials). Workflow image-first opcional: gerar imagem de referência por seção →
análise profunda (tipografia/spacing/cor) → implementar, com anti-drift (1 imagem
por seção). A geração de imagem em si é tarefa do squad **Aglaia**.
