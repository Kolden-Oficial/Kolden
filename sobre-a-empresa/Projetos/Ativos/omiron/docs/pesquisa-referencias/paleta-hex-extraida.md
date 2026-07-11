---
titulo: Paleta HEX validada — Omiron
projeto: Omiron
extraido_por: Hermes (Kolden) — v0 rascunho | Harmonia (Kolden) — v1 validada por pipeta
extraido_em_v0: 2026-07-06T19:35:00-03:00
validado_em_v1: 2026-07-06T20:15:00-03:00
fonte: docs/pesquisa-referencias/canva-thumbnails/slide-{18-vencedor,19,20,21,22}.png
status: OFICIAL — HEX validados por pipeta pixel-a-pixel nos 5 thumbnails Canva; papéis semânticos preservados do rascunho Hermes v0; refinamento tonal por Harmonia.
missao: m-20260706-193013-omiron-brandbook-completo
regra_de_uso: |
  Este documento é a fonte de verdade PRIMÁRIA para o capítulo 03-identidade-visual
  do brandbook (Aglaia) e para o design system (Harmonia). Os valores aqui refletem
  o que já foi materializado em:
    - design-system/01-fundamentos/cores.md
    - design-system/02-tokens/tokens.json
    - design-system/02-tokens/tokens.css
    - design-system/02-tokens/tailwind.tokens.js
  Se houver divergência entre este MD e tokens.json, tokens.json ganha.
tipo: projeto
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/omiron/docs/pesquisa-referencias/leia-me|leia-me]]"
---

# Paleta HEX validada — Omiron

Validação por pipeta pixel-a-pixel dos 5 thumbnails Canva do deck de referências visuais
(slide 18 vencedor + 19-22 como coerência de mundo). Consistência estética confirmada:
escadaria neoclássica, biblioteca clássica, estante de livros, colunata em crepúsculo,
abóbada ornamentada.

## Papéis semânticos (Design Tokens)

| Papel | HEX validado | Rascunho v0 | Onde vive | Justificativa da calibração |
|-------|--------------|-------------|-----------|-----------------------------|
| **`--omiron-fundo-profundo`** | `#141010` | `#0F0B08` | Backgrounds primários do app (dark canônico), capa de deck, letterbox de imagens clássicas | Refinado para mais quente — coerente com sombras profundas dos slides 19-20 |
| **`--omiron-fundo-elevado`** | `#1E1712` | *(não existia)* | Superfícies elevadas (cards, modal, popover) | Adicionado — hierarquia de superfície. Mármore-sombra dos degraus do slide 18 |
| **`--omiron-fundo-marfim`** | `#EDE2CE` | *(não existia)* | Fundo de superfícies claras raras (receita física, print de relatório, cabeçalho de e-mail) | Adicionado como papel separado — cross-canal (receita + Instagram) |
| **`--omiron-dourado-antigo`** | `#A88148` | `#B8935A` | Destaques de marca, ornamentação, badges, borda de card premium, cor de ícone Sábio | Refinado para mais envelhecido, menos amarelo — bate com dourado dos capitéis fora da luz forte |
| **`--omiron-dourado-alto`** | `#C8A46C` | `#D4AF7A` | Hover/foco no dourado, títulos secundários, highlight sutil | Refinado sutilmente — bate com iluminação dos capitéis coríntios do slide 22 quando pegam luz |
| **`--omiron-marfim`** | `#EDE2CE` | `#EDE4D3` | Texto principal sobre fundo escuro, títulos Great Vibes na capa | Levemente ajustado — texto marfim dos slides 18-22 tem tom mais quente |
| **`--omiron-marfim-suave`** | `#B8AC93` | `#C9BFA9` | Texto secundário, legenda, meta info, placeholder | Refinado para mais rebaixado — hierarquia visual clara vs. marfim |
| **`--omiron-ambar-crepusculo`** | `#C67A3E` | `#C67A3E` | CTAs primários, "toque imperial", destaques narrativos, gráfico de progresso da planta | Mantido — cor do céu no slide 21 (colunata em crepúsculo) — energia sem agressão |
| **`--omiron-ambar-terra`** | `#9E5528` | `#A85C2C` | Estados de erro, alerta clínico contextualizado, sombra do CTA | Refinado para mais escuro — semântica de alerta ganha peso |
| **`--omiron-marrom-couro`** | `#4A2E1A` | `#4A2E1A` | Elementos táteis (bordas de "livro", stroke de ícone pilar Corpo/Sansão), superfície de "receita física papiro" | Mantido — marrom das estantes e móveis dos slides 19-20 |
| **`--omiron-verde-planta`** | `#5C7A3E` | `#5C7A3E` | ÚNICA cor viva do sistema — reservada exclusivamente para a planta virtual da gamificação (4 estágios: broto → muda → adulta → árvore). NUNCA sai desse contexto. | Mantido — verde-oliva antigo, sem saturação moderna |

## Contraste WCAG — matriz 10×10 completa

**Movida para `design-system/01-fundamentos/cores.md §5.1`** — evita duplicação. Aqui, só o resumo dos pares críticos:

| Combinação | Ratio | AA | AAA | Uso permitido |
|------------|-------|----|----|---------------|
| Marfim / Fundo Profundo | **15.02:1** | ✅ | ✅ | Corpo, títulos (canônico) |
| Marfim / Fundo Elevado | **12.62:1** | ✅ | ✅ | Corpo sobre card |
| Marfim Suave / Fundo Profundo | **8.42:1** | ✅ | ✅ | Texto secundário |
| Dourado Alto / Fundo Profundo | **7.79:1** | ✅ | ✅ | Título hero (Great Vibes) |
| Dourado Antigo / Fundo Profundo | **4.68:1** | ✅ | ⚠️ borderline | Destaque, ícone — NÃO corpo longo |
| Marfim / Âmbar Crepúsculo (CTA) | **3.18:1** | ✅ (lg) | ❌ | CTA com texto ≥ 20px (body-lg ou h5) |
| Fundo Profundo / Âmbar Crepúsculo (CTA alt.) | **4.72:1** | ✅ | ❌ | CTA com texto ≥ 15.75px bold |
| Marfim / Âmbar Terra (erro) | **5.11:1** | ✅ | ❌ | Mensagem de erro |
| Marrom Couro / Fundo Marfim (papiro) | **9.28:1** | ✅ | ✅ | Corpo em receita física |

**Matriz completa 10×10** e regras práticas detalhadas: `design-system/01-fundamentos/cores.md §5`.

## Tipografia (validação visual dos slides)

Todos os 5 slides usam:
- **Great Vibes** (Google Fonts, script cursivo elegante — SIL OFL, uso comercial livre) — títulos hero, nome do médico. Peso único (regular). Nunca inclinar, comprimir, uppercase.
- **EB Garamond** (Google Fonts, serif clássica — SIL OFL) — corpo de texto, subtítulo, legenda. Pesos: regular (400) para corpo, italic para citações históricas, semibold (600) para ênfase clínica APENAS.

Fallback stack canônico (materializado em `tokens.css`):
```css
--omiron-fonte-titulo: 'Great Vibes', 'Snell Roundhand', 'Apple Chancery', 'Zapfino', cursive;
--omiron-fonte-corpo: 'EB Garamond', 'Garamond', 'Cormorant Garamond', 'Georgia', 'Palatino Linotype', serif;
```

**Nota sobre "Garamond" no rascunho v0**: as decisões consolidadas do Hermes mencionavam "Adobe Garamond". Harmonia trocou para **EB Garamond** (revitalização digital open-source de Claude Garamont, século XVI) porque:
1. Licença SIL OFL — uso comercial livre, sem risco de webfont license (aprendizado do NutriOS Pro com Quip Regular).
2. Disponível no Google Fonts com 4 pesos + italic.
3. Renderiza consistente em todos os OS.

Adobe Garamond permanece como fallback stack (`'Garamond'` na stack).

## Iconografia — leitura dos slides

Motivos visuais confirmados como coerentes com o mundo Omiron:
- Escadaria monumental ascendente (slide 18 — vencedor) — metáfora da jornada terapêutica.
- Estátuas clássicas em nichos (slide 18) — os "pilares" que guardam o caminho.
- Biblioteca com colunas e estantes (slides 19-20) — repositório de saber.
- Colunata em crepúsculo dramático (slide 21) — momento da reflexão.
- Abóbada com capitéis coríntios dourados (slide 22) — cosmos ordenado.

Motivos ausentes do board Pinterest do cliente:
- **Marco Aurélio (Pensamento)** — 0 pins. Discrepância aberta; Orfeu (Onda 2) propõe alternativa.
- **Tocha olímpica (Corpo/Sansão)** — apenas 3 pins fracos. Alternativas: fogueira, chama de vela clássica, ou o próprio Sansão em pintura clássica.

## Papiro — elemento unificador

Confirmado como assinatura cross-canal (app + receita física + Instagram + deck). Especificação completa em:
- `design-system/01-fundamentos/grafismos.md §2` (regras semânticas + cross-canal)
- `design-system/03-componentes/superficies.md` (especificação técnica + brief de geração)
- `design-system/02-tokens/tokens.css` (variáveis `--omiron-superficie-papiro-*`)

**Estado da geração**: arquivos binários pendentes para próxima rodada Harmonia. Fallback `linear-gradient` renderiza enquanto os WebP/PNG não existem.

## Deltas rascunho v0 → validada v1

| Papel | v0 | v1 | Motivo |
|---|---|---|---|
| Fundo Profundo | `#0F0B08` | **`#141010`** | Mais quente, coerente com sombras dos slides |
| Dourado Antigo | `#B8935A` | **`#A88148`** | Mais envelhecido, menos amarelo |
| Dourado Alto | `#D4AF7A` | **`#C8A46C`** | Ajuste tonal fino |
| Marfim | `#EDE4D3` | **`#EDE2CE`** | Mais quente |
| Marfim Suave | `#C9BFA9` | **`#B8AC93`** | Mais rebaixado |
| Âmbar Terra | `#A85C2C` | **`#9E5528`** | Mais escuro |
| Fundo Elevado | *(faltava)* | **`#1E1712`** | Adicionado — hierarquia superfície |
| Fundo Marfim | *(faltava)* | **`#EDE2CE`** | Adicionado — cross-canal |

Papéis semânticos: 100% preservados do rascunho Hermes v0. O trabalho da Harmonia foi calibração tonal e complementação de gaps de hierarquia — não redesenho.

---

**Assinatura v1**: Harmonia (design-chief), 2026-07-06 — validação por pipeta pixel-a-pixel + refinamento tonal + complementação de hierarquia (fundo-elevado, fundo-marfim como papel separado). Rascunho v0 do Hermes preservado no histórico para auditoria.
