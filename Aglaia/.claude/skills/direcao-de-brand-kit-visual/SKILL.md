---
name: direcao-de-brand-kit-visual
description: Use quando o pedido for gerar um DECK/BOARD/GUIDELINES visual de identidade de marca — brand-kit overview, board 3x3 de sistema, deck de apresentação de identidade, moodboard estruturado com nivel de estúdio de identidade, canvas "museum-quality" para juntar logo + tipografia + paleta + aplicações num único artefato imagético. Gatilhos "brand kit", "brand board", "brand guidelines em imagem", "deck de identidade", "canvas de marca", "grid de identidade", "moodboard premium", "board 3x3 de marca", "identidade visual pra apresentar". NÃO use para engenharia de prompt de imagem solta (isso é engenharia-de-prompt-de-imagem — camada mais baixa, uma imagem por vez). NÃO use para narrativa multimídia com arco temporal (isso é narrativa-visual-de-marca). Esta habilidade opera na camada de COMPOSIÇÃO DE BOARD — o artefato é um deck ou uma imagem-canvas que apresenta a marca INTEIRA de uma vez.
tipo: skill
area: Aglaia
up: "[[Aglaia/_MOC-aglaia]]"
---

# Direção de brand-kit visual

Habilidade que trata o brand-kit como argumento visual completo em um único
artefato. Não é uma imagem solta, não é uma sequência de peças de campanha — é
o board/deck que faz um cliente ou júri olhar e entender por que essa marca
existe, como ela se comporta em cada aplicação, e por que o sistema é ownable.

## Quando esta habilidade dispara

- "Faz um brand-kit da marca X"
- "Board 3x3 de identidade"
- "Canvas apresentável do sistema visual"
- "Deck de identidade pra reunião"
- "Guidelines resumido num único artefato"
- "Museum-quality moodboard"

Se o pedido for "faz um prompt de logo pro Midjourney", isso é
`engenharia-de-prompt-de-imagem`. Se for "arco visual da campanha de
lançamento" ou "storyboard emocional", é `narrativa-visual-de-marca`. Aqui é
especificamente **um artefato que apresenta o sistema todo**.

## Princípio central

Um brand-kit premium NÃO é decoração. É **um argumento visual sobre por que
a marca existe**. Todo board precisa responder cinco perguntas antes de
compor:

1. O que essa marca representa?
2. Qual é a metáfora central?
3. Como o logo expressa essa metáfora?
4. Como o sistema escala em UI, impressão, imagem e detalhe?
5. Por que o conjunto todo sente-se ownable (não emprestado, não genérico)?

Se qualquer resposta não estiver clara antes de escolher layout, o board vai
sair genérico. Volta e responde.

## Fluxo de decisão

### 1. Inferir a estratégia da marca (antes de qualquer visual)

Antes de decidir grid, palette ou logo, mapear:

- Categoria (dev tool, security, luxury, gaming, voice AI, compliance, etc.)
- Audiência (buyer, usuário, comunidade)
- Função do produto
- Promessa emocional
- Posição cultural (challenger, incumbent, cultural)
- Nível de confiança que a marca precisa transmitir
- Mundo visual associado (matéria, luz, densidade)
- Metáfora simbólica que ancora o sistema
- O que a marca precisa **evitar** para não ser confundida

Sem esse mapeamento, o board é ilustração — não é identidade.

### 2. Escolher o modo visual pelo domínio da marca

Modos codificados (cada um vira uma estética completa; escolher UM, não
misturar dois):

| Modo | Para quem | Sinais visuais | Lógica de logo |
|---|---|---|---|
| **Dark developer / builder** | dev tools, agentes de código, infra, automação | near-black, monospace, terminal, prompt bar, grid sutil, accents cyan/coral/lime | cursor + frame, bolt + build speed, scaffold + monogram |
| **Dark product / operator** | growth tools, sales agents, produtividade | black + dark red/amber, UI chips com glow, card systems, icon rows, reward motifs | signal, gift, path, switch, loop, command mark |
| **Dark nature / calm system** | strategy, wellness, travel, climate, quiet SaaS | deep green, lime accent, misty landscapes, image circles, calm labels | path, leaf, moon, horizon, compass, folded mark |
| **Dark security / threat** | security, compliance, monitoring, network | black/navy, shield forms, radar lines, threat labels, red/blue alert chips | shield, raptor, eye, watch, protected core |
| **Light editorial / compliance** | legal, privacy, documents, trust brands | warm ivory, paper texture, small serif labels, seals, deep blue/red/gold | seal, dog, shield, document, stamp, monogram |
| **Luxury / beauty / fashion** | beauty, fashion, hospitality, premium services | ivory/stone/espresso, serif wordmark, monogram elegante, paper grain, embossing | monogram, seal, petal, vessel, ritual object |
| **Voice / communication** | voice AI, chat, assistants, speech | dark indigo, lilac glow, waveform, mic motif, phone crop, app icon | wave + initial, sound orb, speech path, mic abstraction |
| **Cultural / experimental** | music, tools criativos, eventos, gaming-adjacent | halftone, CRT texture, print analógico, accent bold, poster panels | wordmark custom, ícone com atitude, mascote simbólico |

Ver `references/vocabulario-estetico.md` para 67 estilos adicionais com
"AI prompt keywords" quando o modo do domínio não caber.

### 3. Escolher o método de logo (1 ou combinação de 2 no máximo)

Cinco métodos codificados para chegar num mark ownable:

1. **Monograma + significado** — letra inicial + metáfora (K + kite, S + waveform, A + ascent). Não é letra chapada — usar negative space, cortes, dobras, geometria.
2. **Ação do produto** — transformar o verbo central do produto em símbolo abstrato (build → frame/scaffold; protect → shield/boundary; convert → switch; speak → waveform).
3. **Fusão de metáforas** — combinar duas ideias significativas em uma marca reduzida (owl + drone vision; shield + mountain; moon + waveform; cursor + lightning).
4. **Negative space** — espaço vazio criando inteligência (seta escondida, centro protegido, letra recortada, olho formado por cruzamento).
5. **Geometria de construção** — mark derivado de sistema claro (círculos, cortes diagonais, grids, frames, blocos modulares, orbital paths, crosshairs).

Sempre evitar: raio genérico sem justificativa, animais aleatórios,
brasões luxo falso, cópias de famous marks, símbolos overcomplicated,
clipart, sparkles sem meaning, variantes inconsistentes.

### 4. Escolher o layout do board

Layouts codificados (default: 3×3):

- `3 × 3` — sistema de identidade completo (padrão para brand-kit overview)
- `2 × 3` — deck cinemático (referência de estúdio de identidade)
- `2 × 2` — board compacto de conceito
- `1 × 3` — brand strip horizontal
- `4 × 2` — layout wide de contact-sheet
- custom — quando o brief pedir

### 5. Compor os painéis do board

Cada painel do 3×3 tem função ESPECÍFICA. Não pintar todos igualmente
altos. O board precisa de ritmo: quieto → funcional → emocional → técnico
→ atmosférico → detalhado.

#### Anatomia padrão de 3×3

1. **Logo cover** — logo e wordmark grandes, título minimal, negative space forte
2. **Logo construction** — decomposição do símbolo, grid de construção, geometria ou negative-space logic — mostrar POR QUE o mark existe
3. **Digital application** — browser chrome, app header, terminal, dashboard fragment ou app icon
4. **Brand essence** — uma tagline curta em typography grande e legível, composição sparse
5. **Color system** — swatches, gradient strips, discos de cor, material chips, palette cards
6. **Typography** — specimen grande, alphabet row, ou pairing primary/secondary
7. **Physical application** — cartão, folder, badge, poster, label, seal, packaging ou objeto
8. **Image direction** — cinematic landscape, product crop, halftone poster, editorial scene, textura
9. **System detail** — UI chips, input bar, command line, icon row, badge system, componente, pattern

#### Anatomia alternativa 2×3 (deck de referência)

1. Logo / wordmark (centrado ou offset, ultra minimal)
2. Browser / product surface (browser bar, app frame, prompt input)
3. Command / functional panel (terminal, prompt bar, install command, dashboard fragment)
4. Atmosphere / campaign image (halftone landscape, cinematic, product-world, foto art-directed)
5. Symbol / construction / badge (mark em target, seal, frame geométrico)
6. Tagline / system promise (uma linha curta, tipo grande, fundo quieto)

### 6. Aplicar as regras de disciplina

**Cor:**
- Uma paleta dominante — base + primary accent + secondary accent + neutros
- Accents REPETEM através dos painéis (não trocar por painel)
- Sem rainbow randômico
- Sem AI purple-blue glow default (a menos que o modo peça)
- Um único accent pode carregar o sistema inteiro

**Texto no board:**
- Muito pouco texto: brand name, uma tagline, uma URL, um comando, 2–5 labels curtos, alguns UI chips
- Sem parágrafos, sem fake body copy, sem lorem ipsum, sem descrições densas, sem labels ilegíveis

**Tagline:**
- Curta e específica. Exemplos bons: "What will you build today?", "Nothing random.", "On guard.", "Clarity builds confidence."
- Evitar slogans corporativos, marketing longo, buzzword soup, inspiracional fake

**Imagem direction:**
- Art-directed: cinematic mountains, dusk skies, halftone clouds, CRT screens, dark product closeups, textured paper, moody architecture
- Evitar: stock people, escritório aleatório, robô clichê, cenas overbusy, imagens sem relação

**Mockup direction:**
- Minimal e crível: browser chrome, URL bar, terminal, app icon, phone corner crop, card stack, badge, seal, folder, UI chips, product label
- Evitar: dashboards fake com data demais, mockups glossy baratos, device overload

**Detalhe premium (usar com restrição):**
- Small page numbers, tiny footer labels, alignment marks, construction lines, crosshair grids sutis, thin rules, browser bars, image masks, soft shadows, halftone treatment, uma palavra highlighted, um accent chip, um icon state forte
- NÃO overuse — detalhe premium recompensa quem olha mais perto

### 7. Regras anti-genérico (banidas por default)

Nunca gerar:
- Random floating icons
- Startup gradients genéricos
- Logos overdesigned
- Meaningless blobs
- Colagens de layout bagunçadas
- Fake tiny UI
- Marks inconsistentes entre painéis
- Cores demais (mais de 4 famílias)
- Neon barato
- Boards estilo template
- Slides corporativos
- SaaS dashboards sem alma

O board deve ser **mais quieto, mais afiado, mais intencional** do que a
resposta default do modelo.

## Uso de referências externas

Quando o Ronan / cliente fornecer references:

**Extrair:**
- Ritmo de layout
- Estilo do grid
- Espaçamento
- Escala tipográfica
- Densidade visual
- Placement do logo
- Quantidade de texto
- Tratamento de imagem
- Lógica de accent color
- Comportamento do sistema

**NÃO copiar:**
- Logo exato
- Nome da marca
- Composição exata
- Slogan exato
- Asset visual específico

References são treinamento de qualidade, não template.

## Handoffs

- **Prompt operacional para gerar cada painel** → `engenharia-de-prompt-de-imagem` (framework 6 camadas). Esta habilidade DEFINE o board; a de prompt EXECUTA cada imagem.
- **Sujeito humano em qualquer painel** → chamar `visuais-inclusivos-anti-vies` em par (obrigatório).
- **Copy da tagline / voice do wordmark** → Caliope.
- **Implementação em HTML/Figma / código do design** → Harmonia (`sistema-de-design` para tokens; `implementacao-ui` para código).
- **Trademark do wordmark** → `protecao-de-marca-monitoramento-crise`.
- **Se ainda não há posicionamento estratégico** → antes disso, `pipeline-de-identidade-de-marca` (fases 1-2, purpose+values).

## Estrutura de prompt interna (checklist antes de emitir)

Antes de enviar o board para geração, o especialista chief responde:

- [ ] Categoria + audiência + metáfora central declaradas
- [ ] Modo visual escolhido (um dos 8, ou default do domínio)
- [ ] Método de logo definido (1 ou 2 no máximo)
- [ ] Layout do grid escolhido (3×3, 2×3, etc.)
- [ ] Cada painel tem função nomeada (não repetir função)
- [ ] Paleta disciplinada declarada (base + 1-2 accents + neutros)
- [ ] Tipografia declarada (primary + secondary opcional)
- [ ] Tagline curta escrita (ou omitida se não couber)
- [ ] Nenhum item da lista "anti-genérico" presente
- [ ] Sem cópia literal de marca famosa

Só depois emitir o prompt operacional via `engenharia-de-prompt-de-imagem`
para cada painel.

## Padrão de saída final

O artefato final tem que parecer:
- Um deck de identidade premium
- O board de apresentação de um designer sênior
- Um case study de sistema de marca
- Uma direção de launch visual
- Um board profissional de conceito de logo

Não pode parecer:
- Colagem de moodboard
- Slide corporate
- Grid de assets soltos
- Screen do Pinterest
- Board template estilo Canva

## Referências

- `references/vocabulario-estetico.md` — catálogo de 67 estilos com AI prompt keywords + 24 patterns de landing para quando o modo padrão não couber

---

Adaptado de github.com/Leonxlnx/taste-skill@06d6028b5c623016c59ce8536f578e5a1127b499 (MIT) — skill `brandkit`.
Adaptado de github.com/nextlevelbuilder/ui-ux-pro-max-skill@9fd25fe07e46ae444edc356e62fe913347ab9e23 (MIT) — canvas "museum-quality" (G15) integrado ao vocabulário estético em `references/`.
