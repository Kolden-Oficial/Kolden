---
id: ds-cores
titulo: "Design System — Cores"
resumo: "Paleta oficial da Kolden: scarlet, off-white e ink, com regras de uso e contraste WCAG."
categoria: marca
palavras-chave: [design-system, cores, paleta, scarlet, contraste, wcag, acessibilidade]
status: vigente
atualizado-em: 2026-06-22
relacionados: [ds-leia-me, identidade-visual, ds-tipografia, ds-tokens]
---

# Cores

A paleta da Kolden é **complementar e de alto contraste**: uma cor-sinal quente (scarlet)
sobre uma base escura (ink), equilibrada por um claro frio (off-white). Vem direto da
apresentação de identidade (guilherme asla, ago/2023) e dos valores amostrados dos arquivos
originais.

## Paleta principal

| Token | Nome | HEX | RGB | Papel |
|---|---|---|---|---|
| `scarlet` | Scarlet | `#FF3D22` | 255, 61, 34 | **Cor-sinal / primária.** Acento, CTAs, destaques, logo de impacto. |
| `ink` | Ink | `#110E0F` | 17, 14, 15 | **Base escura / fundo da marca.** Superfície padrão de quase tudo. |
| `off-white` | Off-white (branco azulado) | `#E8E6F1` | 232, 230, 241 | **Claro de apoio.** Fundo claro, texto sobre ink, superfícies invertidas. |
| `white` | Branco puro | `#FFFFFF` | 255, 255, 255 | Texto/logo de máximo contraste sobre ink ou scarlet. |

> A apresentação chama a primária de "Laranja", mas o valor real `#FF3D22` é um **scarlet**
> (vermelho-alaranjado vibrante) — usamos o nome técnico correto no design system.

## Neutros derivados (rampa de UI sobre o escuro)

O escuro puro `#110E0F` é o fundo; para hierarquia (cards, bordas, estados) derivamos uma
rampa próxima ao ink. Não são cores "novas" de marca — são tons funcionais de interface.

| Token | HEX | Uso |
|---|---|---|
| `ink-950` | `#110E0F` | Fundo base (a cor de marca) |
| `ink-900` | `#1A1617` | Superfície elevada (cards) |
| `ink-800` | `#241F20` | Superfície 2 / inputs |
| `ink-700` | `#332D2E` | Bordas e divisores sobre escuro |
| `ink-500` | `#6E6668` | Texto auxiliar / desabilitado sobre escuro |

## Regras de uso

- **Scarlet é sinal, não preenchimento.** Use para chamar ação e atenção (botões primários,
  links, destaques). Evite grandes áreas chapadas de scarlet — ele perde força.
- **Ink é o palco.** A marca vive em fundo escuro por padrão. O modo claro (fundo off-white)
  é a exceção elegante, não o default.
- **Off-white e branco** carregam o texto sobre o escuro. Em fundo claro, o texto é ink.
- **Máximo de 1 acento por composição.** Scarlet + ink + um claro. Nada de terceira cor de marca.

## Contraste e acessibilidade (WCAG 2.1)

Razões calculadas sobre os HEX reais. AA exige ≥4.5:1 (texto normal) e ≥3:1 (texto grande/UI).

| Combinação | Razão | Veredito |
|---|---|---|
| Branco `#FFFFFF` sobre ink `#110E0F` | 19.20:1 | ✅ AAA |
| Off-white `#E8E6F1` sobre ink `#110E0F` | 15.56:1 | ✅ AAA |
| Ink sobre off-white | 15.56:1 | ✅ AAA |
| **Scarlet `#FF3D22` sobre ink** | **5.43:1** | ✅ AA (texto normal) |
| **Ink sobre scarlet** | **5.43:1** | ✅ AA (texto normal) |
| Scarlet sobre branco | 3.53:1 | ⚠️ Só AA-large (≥18px/14px bold) |
| Branco sobre scarlet | 3.53:1 | ⚠️ Só AA-large |
| Scarlet sobre off-white `#E8E6F1` | 2.86:1 | ❌ Reprova para texto |

### Decisões que saem daqui (importantes)

- **Botão primário = fundo scarlet + texto ink** (5.43:1, passa AA-normal). **Não** use texto
  branco sobre scarlet para rótulos pequenos — cai para 3.53:1 (só large).
- **Scarlet como texto** só sobre ink/escuro. Nunca scarlet sobre off-white em corpo de texto
  (2.86:1) — ali o scarlet serve apenas para logo/grafismo grande.
- **Texto de leitura**: off-white ou branco sobre ink. É o par mais seguro (AAA).
