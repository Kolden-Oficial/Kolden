---
id: 01-fundamentos-grafismos
titulo: "Omiron — Fundamentos de Grafismos (Design System v1)"
resumo: "Textura de papiro como assinatura cross-canal (app + receita física + Instagram + deck), motivos visuais permitidos (escadaria, estátuas em nichos, colunata, abóbada, estantes clássicas), motivos proibidos (bolinhas gradientes, mascotes, avatares abstratos, ícones flat modernos genéricos) e grid de nichos como metáfora arquitetural para layout."
categoria: projeto
status: oficial
atualizado-em: 2026-07-06
autor: Harmonia (design-chief)
missao: m-20260706-193013-omiron-brandbook-completo
insumos:
  - docs/pesquisa-referencias/canva-thumbnails/slide-18-vencedor.png
  - docs/pesquisa-referencias/canva-thumbnails/slide-{19,20,21,22}.png
  - docs/pesquisa-referencias/decisoes-consolidadas-brand.md
  - docs/pesquisa-referencias/pinterest/pinterest-ariosto-analise.md (95 pins)
relacionados:
  - 01-fundamentos/cores.md
  - 01-fundamentos/tipografia.md
  - 01-fundamentos/tom-visual.md
  - 03-componentes/superficies.md
tipo: projeto
projeto: omiron
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/omiron/design-system/01-fundamentos/cores|cores]]"
  - "[[sobre-a-empresa/Projetos/Ativos/omiron/design-system/01-fundamentos/tipografia|tipografia]]"
  - "[[sobre-a-empresa/Projetos/Ativos/omiron/design-system/01-fundamentos/tom-visual|tom-visual]]"
---

# Fundamentos de Grafismos — Omiron

> Grafismo, aqui, é tudo que NÃO é cor nem tipografia mas ainda assim compõe a assinatura visual: texturas, motivos ornamentais, iconografia, uso de imagem clássica, arquitetura de composição. O Omiron opera dentro de um mundo — Alexandria, biblioteca barroca, colunata neoclássica. Qualquer grafismo que rompa esse mundo é veto.

## 1. Filosofia

Três compromissos regem os grafismos Omiron:

1. **Papiro é assinatura cross-canal.** É a textura que atravessa app, receita física, Instagram e deck. Muda o material, mantém a assinatura. Se um artefato não tem papiro em algum lugar, não é Omiron.
2. **Imagem clássica > ilustração vetorial.** Estátua, coluna, capitel dourado, biblioteca fotografada, pintura clássica. Ilustração vetorial em app de saúde mental caiu em cliché ("bolinhas gradientes") — Omiron recusa. Composição preferida: fotografia clássica com overlay escuro + tipografia serifa por cima.
3. **Grid de nichos.** Metáfora arquitetural do slide 18 (escadaria com estátuas em nichos): o layout organiza conteúdo em "nichos" — cada bloco ganha moldura discreta e respira ao redor. Densidade máxima do maximalismo clássico está no CONTEÚDO (imagem, textura, ornamento serif), não em blocos coloridos densos.

## 2. Textura de papiro

### 2.1 Especificação técnica

**Papel**: assinatura visual cross-canal.

**Formato**: WebP como primário; PNG como fallback para renderers sem suporte WebP e para impressão.

**Resolução mínima**: 2048×2048 px. Isso garante uso em:
- Retina em app (2x → renderiza a 1024×1024 nítido em iPhone Pro).
- Receita física A5/A4 impressa a 300 DPI.
- Instagram feed (1080×1080) com overhead de crop.
- Deck em projetor 4K.

**Cor-base**: derivada do token `--omiron-fundo-marfim` (`#EDE2CE`). A textura deve ter:
- Gradiente sutil de canto (mais escuro nas bordas, mais claro no centro) simulando desgaste orgânico.
- Manchas irregulares muito sutis (opacidade 3-8%) sugerindo tempo, sem virar sujeira ruidosa.
- Fibras finas visíveis no zoom 100% mas invisíveis a 25% (uso em thumbnail).

**Variações necessárias** (3 total):
1. **`papiro-liso`** — textura padrão, uso em card, moldura, fundo de mensagem do Quíron.
2. **`papiro-envelhecido`** — mais desgaste nas bordas, uso em receita física e capa de conquista.
3. **`papiro-manchado`** — mancha central sutil, uso em separador de seção de deck.

### 2.2 Cabeçalho de nota Harmonia

> **A textura de papiro NÃO foi gerada nesta rodada.** Harmonia entrega a especificação. Geração dos 3 arquivos WebP+PNG fica para a próxima rodada, com brief abaixo. O tokens.json já referencia os paths esperados — quando os arquivos existirem, entram sem quebra de contrato.

**Brief para próxima rodada** (Harmonia gera ou coordena Aglaia/visual-generator):

```
Assunto: Textura de papiro Omiron — 3 variações
Formato: WebP (primário) + PNG (fallback), 2048×2048 min
Paths de destino:
  - assets/texturas/papiro-liso.webp
  - assets/texturas/papiro-liso.png
  - assets/texturas/papiro-envelhecido.webp
  - assets/texturas/papiro-envelhecido.png
  - assets/texturas/papiro-manchado.webp
  - assets/texturas/papiro-manchado.png

Referência visual: pergaminho autêntico envelhecido, fibras finas visíveis,
cor-base #EDE2CE, sem manchas brutais (nada de "burned edges" hollywood),
elegância imperfeita, humano sob mármore. Estilo: fotografia macro de papiro
egípcio conservado em museu, tratamento de cor quente. Evitar: gradientes
digitais óbvios, texturas procedurais artificiais, "old paper" clichê.

Após gerar, validar por: (1) contraste do texto Marrom Couro #4A2E1A por cima
= 9.28:1 AAA preservado; (2) impressão A5 a 300 DPI mantém a assinatura
visível sem virar ruído.
```

### 2.3 Uso semântico (onde papiro vive)

| Superfície | Uso |
|---|---|
| **App — card de recompensa** | Fundo de tela quando o paciente completa uma sequência. Papiro-envelhecido sobre fundo profundo, borda dourada. |
| **App — moldura mensagem Quíron** | Balão de mensagem do mentor com fundo papiro-liso, texto Marrom Couro. Diferencia visualmente mensagem do mentor de mensagem do paciente. |
| **App — background de conquista** | Modal de "Você regou a planta esta semana" com papiro-liso, planta virtual centralizada. |
| **Receita física** | Layout inteiro. Papiro-envelhecido como fundo do papel A5. Cabeçalho com nome Dr. Ariosto em Great Vibes dourado antigo, corpo em EB Garamond regular marrom couro. |
| **Instagram do médico** | Feed com posts sobre fundo papiro-liso, Great Vibes como assinatura na saudação, corpo Garamond regular. |
| **Deck de apresentação** | Capa e separadores de seção com papiro-manchado. Slides de conteúdo continuam com fundo profundo. |
| **E-mail transacional** | Cabeçalho do e-mail (topo 200px) com papiro-liso e assinatura do médico. Corpo do e-mail em fundo Marfim + texto Espresso (não papiro para não pesar). |

## 3. Motivos visuais permitidos

Extraídos dos 5 thumbnails Canva (slides 18-22) e do board Pinterest do Ariosto (95 pins). São os elementos que COMPÕEM o mundo Omiron.

### 3.1 Arquitetura clássica (âncora visual)

- **Escadaria monumental ascendente** — slide 18 (vencedor). Metáfora da jornada terapêutica: cada degrau é um dia de tratamento. Uso: hero de landing, capa de deck, tela de início da jornada.
- **Estátuas clássicas em nichos** — slide 18. Metáfora dos 4 pilares que guardam o caminho (Corpo/Sansão, Pensamento/Marco Aurélio, Sentimento/Psiquê, Espírito/Hécate). Uso: tela de escolha de pilar, ícone de arquétipo.
- **Colunata em crepúsculo dramático** — slide 21. Metáfora do momento de reflexão. Uso: onboarding emocional, tela de check-in noturno.
- **Abóbada com capitéis coríntios dourados** — slide 22. Metáfora do cosmos ordenado. Uso: tela de resultado semanal, conquista de longo prazo.

### 3.2 Biblioteca e saber

- **Biblioteca com colunas e estantes** — slides 19-20. Repositório de saber. Uso: seção "Aprender", conteúdo educativo do mentor Quíron, biblioteca de exercícios.
- **Livros próximos, luz de vela** — slide 19. Intimidade do estudo. Uso: mensagem íntima do mentor, momento de reflexão pessoal.

### 3.3 Referências Pinterest do cliente (95 pins classificados)

- **Rückenfigur solitária** (Friedrich) — figura de costas contemplando paisagem. Uso: hero de landing "você e sua jornada", capa de seção "reflexão".
- **Afrescos renascentistas** (Michelangelo, Sistina) — para epígrafes visuais de conteúdo espiritual (pilar Hécate).
- **Chiaroscuro** (Caravaggio, tenebrismo) — luz dramática sobre fundo escuro. Referência de iluminação para composições fotográficas próprias.
- **A Grande Onda de Hokusai** — motivo do movimento, do que não pode ser lutado. Uso: pilar Sentimento/Psiquê, exercício de aceitação.
- **Noite Estrelada de Van Gogh** — motivo do céu profundo. Uso: modo noturno de deep-check-in, tela de meditação.
- **Caspar David Friedrich** (romantismo alemão) — paisagens de reflexão. Uso: hero e transição narrativa.

## 4. Motivos proibidos

Qualquer um destes rompe o mundo Omiron. Veto absoluto.

- **Bolinhas gradientes coloridas** (típicas de app de saúde mental "fofinho"). Não.
- **Mascotes** (planta antropomórfica, cérebro sorridente, monstrinho da ansiedade). Não. A única presença viva é a planta virtual da gamificação — mas ela é planta literal, não personagem.
- **Avatares abstratos** ("blobs" coloridos, formas orgânicas gradientes). Não.
- **Ícones flat modernos genéricos** (biblioteca Material Icons puro, Feather Icons sem retrabalho). Iconografia Omiron é sempre serifa-adjacente ou linha fina clássica.
- **Emojis em UI persistente**. Não. Se precisa de ícone semântico, é ícone Lucide com stroke-width customizado (§6). Emoji só em conteúdo user-generated se necessário.
- **Ilustração vetorial infantil**. Não. Ilustração é sempre foto clássica com overlay ou pintura clássica em domínio público.
- **Gradientes vibrantes multicoloridos** (rosa-para-azul-para-verde). Não.
- **Glassmorphism** (blur + transparência de UI moderno). Não. Superfície Omiron é opaca, com textura ou sombra soft.
- **Jargão visual do "wellness"** (mandala, chakra, borboleta transformação). Não.
- **Fotos clínicas** (jaleco branco, estetoscópio, seringa). Não. O médico não aparece com uniforme — aparece com autoridade erudita.

## 5. Grid de nichos — metáfora arquitetural para layout

O layout Omiron não é grid de 12 colunas Bootstrap. É grid de nichos.

**Princípio**: no slide 18, as estátuas ocupam nichos individuais dentro de uma parede monumental. Cada nicho tem moldura, respira ao redor, é isolado mas pertence ao conjunto. O layout do app segue essa metáfora:

- Cada card = nicho. Ganha moldura (borda dourada 1px em situações premium, ou apenas fundo elevado + shadow em uso padrão).
- Espaço ao redor do card > espaço interno do card. Nichos precisam respirar.
- Alinhamento centralizado dentro do nicho — como estátua no nicho.
- Máximo 3-4 nichos por tela mobile, 6-9 desktop. Densidade excessiva quebra a metáfora.

**Contraste com grid moderno**:

| Grid Bootstrap moderno | Grid de nichos Omiron |
|---|---|
| Densidade máxima | Densidade contida, respiro ao redor |
| Card sem moldura, separado só por espaço | Card com moldura sutil (borda ou shadow) |
| Alinhamento à esquerda de cada card | Centralização quando o nicho é uma estátua |
| Colunas iguais | Colunas variáveis (uma seção pode ter 1 nicho grande + 3 pequenos, como fachada assimétrica de igreja barroca) |

**Traduções práticas**:
- Home do app: 1 hero de saudação (nicho maior) + 4 pilares em grid 2×2 (nichos iguais menores).
- Deck de apresentação: capa com hero centralizado (1 nicho de tela cheia), slides de conteúdo com 1-3 nichos por slide.
- Landing: cada seção é uma sequência vertical de nichos, não uma parede de conteúdo denso.

## 6. Iconografia — regras de estilo

Ícones seguem 3 regras cirúrgicas para não cair em "ícone Material genérico":

1. **Stroke-width 1.5px** (mais fino que shadcn/Lucide default 2px). O fino combina com serifa clássica.
2. **Cantos ligeiramente arredondados**, nunca chanfrados retos. Alma humanista.
3. **Cor: sempre `currentColor`** — herda do texto que acompanha. Assim ícone respeita token semântico e nunca gruda em hex hardcoded.

**Biblioteca base**: Lucide (open-source, padrão shadcn) com stroke-width customizado a 1.5.

**Ícones dos 4 pilares** (deve ser assets SVG próprios, não Lucide):
- **Corpo/Sansão** — tocha ou fogueira clássica (Lucide não tem — SVG próprio).
- **Pensamento/Marco Aurélio** — busto imperial ou livro aberto (Lucide `book-open` retrabalhado; alternativa proposta por Orfeu na Onda 2).
- **Sentimento/Psiquê** — onda estilizada à Hokusai (SVG próprio).
- **Espírito/Hécate** — tocha dupla ou chave (SVG próprio).

**Tamanhos permitidos**: 16px (inline em corpo), 20px (padrão UI), 24px (destaque), 32px (hero ilustrativo), 48px+ (icônico grande em tela vazia).

## 7. Do / Don't consolidado

### Do

- Papiro em cross-canal (app + receita + Instagram + deck).
- Fotografia clássica com overlay escuro + texto por cima.
- Grid de nichos com respiro entre blocos.
- Ícones Lucide stroke-width 1.5 usando `currentColor`.
- Referências ao board Pinterest do cliente (Friedrich, Michelangelo, Hokusai, Van Gogh, Caravaggio).
- Motivos arquitetônicos como metáfora (escadaria = jornada, nicho = pilar, colunata = crepúsculo).

### Don't

- Bolinhas gradientes, mascotes, avatares abstratos.
- Ilustração vetorial infantil, ícones flat modernos genéricos.
- Foto clínica (jaleco, estetoscópio).
- Glassmorphism, gradientes vibrantes multicoloridos.
- Emojis em UI persistente.
- Grid Bootstrap denso sem respiro.
- Verde-planta fora da gamificação.

## 8. Ganchos de rastreabilidade

- Motivos visuais: extraídos dos slides 18-22 + análise Pinterest 95 pins.
- Slide 18 (escadaria) confirmado como âncora visual na reunião 01/07/2026.
- Motivos proibidos: derivados do veto explícito do Ariosto ("nada de app de saúde mental fofo") + rejeição do "biohacking/wellness" listada em decisões consolidadas.
- Textura papiro: brief pronto; geração pendente para próxima rodada (Harmonia ou Aglaia).
- Iconografia dos 4 pilares: SVGs próprios pendentes (2 dependem de definição narrativa Orfeu — Marco Aurélio vs. alternativa).
