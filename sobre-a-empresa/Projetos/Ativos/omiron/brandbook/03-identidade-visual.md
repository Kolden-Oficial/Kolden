---
id: projeto-omiron-brandbook-identidade-visual
titulo: "Omiron — Identidade Visual"
resumo: "Como o mundo Omiron se materializa em pixel e papel. Símbolo (declaração + regras; SVG oficial pendente para próxima rodada), paleta com 10 papéis semânticos referenciados por token (nenhum HEX cru — fonte primária em design-system/01-fundamentos/cores.md), tipografia Great Vibes + EB Garamond (regras cirúrgicas em design-system/01-fundamentos/tipografia.md), grafismos (papiro como assinatura cross-canal + motivos permitidos escadaria/estátuas/colunata/abóbada/biblioteca + motivos proibidos bolinha/mascote/flat-genérico), matriz WCAG (9 pares críticos + link para matriz 10×10 completa em cores.md §5.1)."
categoria: projeto
status: oficial
atualizado-em: 2026-07-06
autor: Aglaia (brand-chief) — Kolden
missao: m-20260706-193013-omiron-brandbook-completo
relacionados: [00-indice, 01-posicionamento, 02-voz-da-marca, 04-aplicacoes, ../design-system/01-fundamentos/cores, ../design-system/01-fundamentos/tipografia, ../design-system/01-fundamentos/tom-visual]
---

# Identidade Visual

> Pilar 3 de 5. Define **como o Omiron aparece** — em cor, forma, tipografia, textura. Este capítulo NÃO é o design system; é o brandbook. As decisões técnicas (HEX, HSL, matriz WCAG completa, escala tipográfica exata, tokens DTCG) vivem no design system, sob autoria da Harmonia. Este capítulo traduz essas decisões para linguagem de marca — o que cada escolha *significa*, onde ela vive, o que ela recusa.

> **Regra ativa neste capítulo:** nenhum HEX cru. Toda referência de cor é por **token semântico** (`--omiron-*`). Fonte primária: [`design-system/01-fundamentos/cores.md`](../design-system/01-fundamentos/cores.md). Se este brandbook divergir do design system, o design system ganha.

## 1. Símbolo

### 1.1 Declaração

O símbolo oficial do Omiron **ainda não foi produzido em vetor final** — está registrado como pendência ativa em `05-manual-operacional.md §Tensões abertas`. Este brandbook trava as **regras de uso** e a **concepção conceitual** para que, quando o SVG oficial for entregue na próxima rodada Harmonia + direção de arte, ele nasça respeitando o mundo aqui definido.

**Concepção conceitual travada:**

- **Origem do nome:** *Omiron* — deriva do grego *"ómoros"* (limítrofe, próximo, adjacente) via o gesto interior *"mi-orion"* (a constelação de Órion como referência de orientação no céu noturno). O nome funciona como declaração da promessa: *proximidade* + *orientação* + *céu noturno*. Traduz o slogan (*Monitoramento próximo. Tratamento real.*) em uma palavra.
- **Registro visual do símbolo:** deve pertencer ao mundo maximalista clássico. Referências de forma: capitel coríntio (dourado antigo, ornamento sóbrio), abóbada (curva ascendente), papiro enrolado (assinatura cross-canal), ou monograma serifa "Ω" (ômega — encerramento e integração — como base tipográfica). A decisão final entre esses caminhos fica para a próxima rodada.
- **Legibilidade em escala reduzida:** o símbolo precisa funcionar em três escalas — favicon 16px (leitura de forma), avatar 64px (leitura de identidade), hero 320px (leitura de detalhe ornamental).

### 1.2 Regras de uso (aplicáveis a partir do SVG oficial)

Estas regras se aplicam ao símbolo assim que existir em vetor. Registrar aqui evita retrabalho depois.

**Do:**
- Símbolo em `--omiron-dourado-antigo` sobre `--omiron-fundo-profundo` (canônico).
- Símbolo em `--omiron-marfim` sobre `--omiron-fundo-profundo` (variante monocromática light-on-dark).
- Símbolo em `--omiron-marrom-couro` sobre `--omiron-fundo-marfim` (variante para receita física e print).
- Sempre com área de segurança mínima ao redor = altura do próprio símbolo (regra de clearance clássica).
- Tamanho mínimo 24px (abaixo disso perde ornamento).

**Don't:**
- Nunca símbolo em cores fora dos 3 pares acima.
- Nunca com sombra externa (drop-shadow), stroke adicional, glow, gradiente.
- Nunca inclinar (`skew`, `transform: rotate`) — o símbolo é ereto.
- Nunca combinar com mascote, emoji, ícone auxiliar decorativo.
- Nunca dentro de fundo azul-marinho (clinical-cold), gradiente rosa-lilás (wellness Instagram), branco puro (banido).

### 1.3 Contra-exemplo — o que o Omiron NÃO é

Se o símbolo do Omiron for confundido com qualquer um dos padrões abaixo, é veto. Refazer.

- Mascote sorridente antropomórfico (é o padrão dos apps de saúde mental fofinhos vetados pelo Dr. Ariosto).
- Bolinha colorida gradiente com iniciais dentro (é o padrão dos apps de wellness Instagram).
- Ícone de coração + estetoscópio + folha verde (é o padrão do clinical-cold hospitalar).
- Flat design geométrico com sans-serif Poppins (é o padrão do SaaS genérico).

## 2. Paleta e tokens semânticos

> **Fonte primária:** [`design-system/01-fundamentos/cores.md`](../design-system/01-fundamentos/cores.md). Este capítulo do brandbook resume os papéis semânticos e o significado de marca de cada token — sem duplicar HEX. Os valores canônicos vivem no design system e no `tokens.json` DTCG.

A paleta Omiron tem **10 papéis semânticos**. Cada papel resolve um problema de UX de interior de app psiquiátrico erudito. Nenhum é escolha estética arbitrária.

### 2.1 Fundos e superfícies

| Token | Papel de marca | Onde vive |
|---|---|---|
| `--omiron-fundo-profundo` | O mundo. A calma noturna. A luz de biblioteca à meia-noite. | Background primário do app (dark-mode = identidade), capa de deck, letterbox de imagens clássicas. |
| `--omiron-fundo-elevado` | Um degrau acima do fundo — hierarquia sem quebrar o mood. | Cards, modais, popovers, superfícies elevadas. |
| `--omiron-fundo-marfim` | O papiro. A superfície tátil rara. | Receita física do consultório, print de exportação, cabeçalho de e-mail transacional, moldura de conquista sobre fundo escuro. |

**Regra de marca:** o dark-mode não é preferência — é identidade. O modo claro `--omiron-fundo-marfim` só aparece em contextos específicos (receita, print, moldura de conquista). O app não tem light-mode padrão, e isso é decisão. Motivo detalhado em `cores.md §6`.

### 2.2 Marca — os dourados

| Token | Papel de marca | Onde vive |
|---|---|---|
| `--omiron-dourado-antigo` | A cor de marca. Dourado envelhecido — não brilhante moderno. Herança sacra, folha-de-ouro de afresco barroco. | Ícone do arquétipo Sábio, borda de card premium, ornamentação, badge, destaque de identidade. |
| `--omiron-dourado-alto` | O dourado quando pega luz. Iluminação de capitel coríntio. | Estado hover/foco no dourado, título secundário, highlight sutil. |

**Regra de marca:** dourado brilhante consumista (o ouro de joia contemporânea, de luxo ostentativo) é veto. O dourado do Omiron é sacro/antigo. Se o resultado visual parece "app de luxo fintech", refazer.

### 2.3 Texto — os marfins

| Token | Papel de marca | Onde vive |
|---|---|---|
| `--omiron-marfim` | O branco quente. Substituto absoluto do `#FFFFFF` puro em todo o sistema. | Texto principal sobre fundo escuro, títulos Great Vibes na capa, corpo Garamond em leitura padrão. |
| `--omiron-marfim-suave` | O marfim rebaixado. Hierarquia visual sem sair do mundo. | Texto secundário, legenda, metadata, placeholder. |

**Regra de marca:** `#FFFFFF` puro e `#000000` puro estão banidos por veto explícito do cliente. Preto puro é raso e digital; branco puro é *clinical-cold* (hospitalar). Substitutos canônicos: `--omiron-fundo-profundo` (preto quente) e `--omiron-marfim` (branco quente). Auditoria em `cores.md §8`.

### 2.4 Acentos narrativos — os âmbares

| Token | Papel de marca | Onde vive |
|---|---|---|
| `--omiron-ambar-crepusculo` | O toque imperial. O momento do crepúsculo — reflexão, não alarme. | CTAs primários, destaques narrativos, transição de estado importante. |
| `--omiron-ambar-terra` | O alerta sóbrio. Semântica de "atenção sem susto" — variação terrosa coerente com o mundo. | Estados de erro, alerta clínico contextualizado, sombra do CTA em active. |

**Regra de marca:** vermelho brilhante genérico como sinal de erro é veto — quebra a calma noturna. Alerta no Omiron usa `--omiron-ambar-terra` acompanhado de ícone + texto, nunca só cor (WCAG 1.4.1).

### 2.5 Táctil — o marrom

| Token | Papel de marca | Onde vive |
|---|---|---|
| `--omiron-marrom-couro` | O elemento que "segura". Marrom das estantes, dos móveis antigos, dos livros de couro. | Borda de card, stroke de ícone do pilar Corpo/Sansão, moldura de receita física papiro. |

**Regra de marca:** o couro ancora a leveza do marfim. Sem ele, o mundo fica etéreo demais. Com ele em excesso, fica escuro pesado. Uso pontual: bordas, strokes, molduras.

### 2.6 Cor viva — USO RESTRITO

| Token | Papel de marca | Onde vive |
|---|---|---|
| `--omiron-verde-planta` | **RESERVADA EXCLUSIVAMENTE à gamificação da planta virtual** (broto → muda → adulta → árvore). Verde-oliva antigo, sem saturação moderna. | Sprite da planta virtual da gamificação. Ponto final. |

**Regra de marca dura:** `--omiron-verde-planta` é a **única cor viva do sistema**. Nunca sai do contexto da planta. Nem para "botão de sucesso", nem para "check verde de check-in completo", nem para "badge de streak". Para sucesso genérico, usar `--omiron-dourado-alto` ou `--omiron-marfim` com ícone check em stroke. Auditoria automatizada: `grep -riE "verde.plant" --exclude-dir=gamification` deve retornar 0 em código de produção (regra em `cores.md §2.6`).

### 2.7 Cores banidas

Fora dos 10 papéis semânticos + preto puro + branco puro, **qualquer HEX cru fora da paleta canônica é veto** neste brandbook. Auditoria (regra viva em `cores.md §8`):

```bash
grep -rE "#[0-9A-Fa-f]{6}" design-system/ \
  | grep -vE "(141010|1E1712|EDE2CE|A88148|C8A46C|B8AC93|C67A3E|9E5528|4A2E1A|5C7A3E)"
# -> deve retornar 0
```

## 3. Tipografia

> **Fonte primária:** [`design-system/01-fundamentos/tipografia.md`](../design-system/01-fundamentos/tipografia.md). Este capítulo do brandbook resume os papéis de marca de cada família — sem duplicar escala, line-height e `@font-face`.

O sistema tipográfico do Omiron usa **três famílias hierarquizadas** por função:

### 3.1 Great Vibes — o título hero

**Papel de marca:** o momento emocional alto. A caneta-tinteiro. A saudação do mentor. O nome do médico. A frase-âncora emocional.

Ariosto pediu na reunião de 01/07: *"uma fonte que imitasse caneta-tinteiro, elegante como Dr. Ariosto"*. Great Vibes foi ele mesmo quem sugeriu e aprovou. Aspiração pessoal declarada: caneta Montblanc — a Great Vibes é a materialização visual dessa aspiração.

**Onde vive (marca):** capa de deck, hero de landing, título de tela emocional, saudação de abertura, marco de conquista, nome do médico em receita, epígrafe de conteúdo clínico.

**Onde NÃO vive:** botão (ilegível), formulário (label, placeholder), tabela, corpo de mensagem, dado clínico, qualquer contexto de leitura contínua. Regras cirúrgicas completas em `tipografia.md §2.1`.

### 3.2 EB Garamond — o corpo, o subtítulo, a UI

**Papel de marca:** o texto que se lê. A serifa clássica humanista. A herança de Claude Garamont, século XVI, reeditada em open-source (SIL OFL — sem risco de licença webfont).

**Onde vive (marca):** corpo de texto, subtítulo, legenda, label, botão, tabela, mensagem do Quíron, dado clínico. Todo lugar onde LEITURA acontece.

**Pesos permitidos:**
- Regular (400) — corpo padrão.
- Medium (500) — botão hover, ênfase leve, título de card.
- Semibold (600) — APENAS ênfase clínica (dose, nome de medicamento).
- Italic (400 italic) — APENAS citação histórica (Marco Aurélio, Sêneca, Epicteto).

**Escala em terça maior (razão 1.250):** decisão Harmonia, valida par serifa clássica sem saltos bruscos. Referência técnica: `tipografia.md §2.2`.

### 3.3 Stack de fallback

Quando Great Vibes ou EB Garamond não carregarem, o sistema degrada com elegância — **nunca** cai em Times New Roman genérico ou sans-serif do OS.

```css
--omiron-fonte-titulo: 'Great Vibes', 'Snell Roundhand', 'Apple Chancery', 'Zapfino', cursive;
--omiron-fonte-corpo: 'EB Garamond', 'Garamond', 'Cormorant Garamond', 'Georgia', 'Palatino Linotype', serif;
```

Sans-serif como fonte primária é veto de marca. Só aparece como último recurso absoluto (`--omiron-fonte-fallback-critico` — regra em `tipografia.md §2.3`). Se algum ambiente estiver renderizando Inter, Roboto, Helvetica ou Arial como padrão do Omiron, é bug crítico — reportar imediatamente.

### 3.4 Legibilidade para dislexia (regra ativa)

O Dr. Ariosto vetou Alex Brush na reunião por preocupação com pacientes com dislexia. A regra ficou ativa como **veto de arquitetura**:

- Corpo mínimo 16px. Nunca abaixo.
- Line-height mínimo 1.6 em corpo (Garamond usa 1.65).
- Sem justificação (`text-align: justify`) — o espaço variável entre palavras confunde leitor disléxico.
- Sem uppercase em bloco — quebra reconhecimento de forma de palavra.
- Sem italic em corpo longo — só citação curta.

Detalhamento em `tipografia.md §4`. Teste de aceite: paciente-piloto disléxico lê 3 parágrafos de onboarding em <90 segundos sem re-leitura.

## 4. Grafismos — papiro e motivos clássicos

### 4.1 Papiro — a assinatura cross-canal

O papiro é o **elemento gráfico unificador** do Omiron. Decisão travada na reunião 01/07/2026. Vive em quatro canais e cria a identidade visual da Clínica Omiron atravessando app, papel e feed:

1. **App (in-product):** cards de recompensa da gamificação, moldura de mensagens do Quíron, background de tela de conquista, papel de fundo de conteúdo estático (frase do dia, epígrafe).
2. **Receita física:** o papel timbrado do Dr. Ariosto é integralmente sobre papiro. É a assinatura tátil da consulta.
3. **Instagram do médico:** linha editorial dos posts com fundo papiro + serifa Garamond + citação clássica.
4. **Deck comercial:** capa e separadores de seção sobre papiro.

**Regra de ouro:** se um artefato de comunicação Omiron não tem papiro em algum lugar, ele **não é Omiron**. É a impressão digital visual — muda o material, mantém a assinatura.

**Estado da textura papiro (pendência ativa):** os arquivos binários finais (WebP/PNG em 3 densidades) ainda não foram gerados. Fallback ativo em `design-system/02-tokens/tokens.css` usa `linear-gradient` enquanto os arquivos oficiais não existem. Pendência registrada em `05-manual-operacional.md §Tensões abertas` — próxima rodada Harmonia.

### 4.2 Motivos permitidos (mundo visual maximalista clássico)

Os motivos visuais do Omiron nascem do **cenário-âncora do slide 18 vencedor** e do **board Pinterest** do Dr. Ariosto. Todos foram validados na reunião 01/07 e no dossiê `docs/pesquisa-referencias/pinterest/pinterest-ariosto-analise.md`.

| Motivo | Origem no acervo | Onde usar |
|---|---|---|
| **Escadaria monumental ascendente** | Slide 18 vencedor + 10 Rückenfigur românticos no Pinterest | Hero de landing, capa de deck, tela de conquista de marco, imagem-âncora do onboarding tela 2 (Boas-vindas). |
| **Estátuas clássicas em nichos** | Slide 18 vencedor + tag "statue" em 5 pins | Ambientação de tela sensível, moldura de citação histórica, ilustração do pilar Corpo (Sansão em pedra). |
| **Colunas neoclássicas / colunata** | 9 pins Pinterest + 2 com "pillar" + slide 21 (colunata em crepúsculo) | Grid de layout (colunas como estrutura, não decoração), ilustração do pilar Espírito (portal). |
| **Abóbada com capitéis coríntios dourados** | Slide 22 + afrescos barrocos do Pinterest | Ilustração do pilar Sentimento (o céu ordenado sobre a tempestade), capa de e-mail transacional. |
| **Biblioteca (Alexandria)** | 34 tags "library" no Pinterest + 10 pins diretos + verbalização do Dr. Ariosto na reunião | Imagem-âncora do pilar Pensamento (Alternativa B recomendada por Orfeu), tela de onboarding do Pensamento, background de conteúdo educativo. |
| **Rückenfigur solitária** (silhueta contemplativa de costas) | 10+ pins Pinterest — segundo motivo mais forte | Fotografia-âncora do produto — landing, onboarding, capa de deck da Fase 2. Convoca o adulto lúcido em jornada. |
| **A Grande Onda de Kanagawa (Hokusai)** | 1 pin explícito + 9 tags "hokusai" + metáfora "onda × dique" do próprio Ariosto | Ilustração do pilar Sentimento — símbolo do afeto que se atravessa sem lutar. |
| **Chiaroscuro (contraste luz/sombra pesado)** | 24 pins com afrescos e óleos + tag "gothic" 6x + tag "dark academia" 10x | Tratamento visual padrão de todas as imagens do mundo Omiron — não é motivo isolado, é a *iluminação* de todo o mundo. |
| **Papiro (textura + rolo)** | Decisão travada na reunião | Assinatura cross-canal — ver §4.1 acima. |

### 4.3 Motivos proibidos

Todos vetados por triangulação: (a) rejeição explícita do Dr. Ariosto na reunião, (b) ausência absoluta no board Pinterest do cliente, (c) contradição direta com o arquétipo Sábio.

- **Mascote antropomórfico** de qualquer espécie (humano, animal, planta com rosto). Ariosto vetou explicitamente "app de saúde mental fofo".
- **Bolinha colorida gradiente** com iniciais dentro (padrão wellness Instagram). Vetado.
- **Flat design genérico** com ícones lineares Feather/Font Awesome padrão. Não pertence ao mundo maximalista clássico.
- **Fotografia stock de "pessoa sorrindo usando o app"**. Contradiz *humano sob mármore* (`design-system/01-fundamentos/tom-visual.md §5`).
- **Gradiente vibrante multicoloroso** (rosa-lilás, verde-menta neon, azul-ciano). Nenhum sustenta o mood dark-mode maximalista clássico.
- **Cor neon** de qualquer natureza. Nenhum pin do board sustenta.
- **Glassmorphism / neomorphism / skeuomorfismo cartunesco**. São padrões do SaaS genérico contemporâneo — o Omiron recusa a categoria.
- **Ícone de coração + estetoscópio + folha verde**. Padrão do clinical-cold hospitalar.
- **Tipografia manuscrita ilegível** (Alex Brush foi vetada explicitamente por dislexia). Great Vibes só em título curto.
- **Ilustração vetorial infantil** com curvas bouncy e traços grossos coloridos. Não pertence.
- **Emoji como elemento de UI** (`🌱`, `✨`, `❤️`). Ícone no Omiron é SVG autoral, nunca emoji.

**Regra de auditoria:** grep `"mascote|bolinha|fofinho"` sobre o brandbook deve retornar 0 fora do bloco documental `02-voz-da-marca.md §3.2` e este `03-identidade-visual.md §4.3`. Estes são os únicos lugares autorizados a nomear os vetos.

## 5. Matriz WCAG — resumo dos 9 pares críticos

> **Fonte primária:** [`design-system/01-fundamentos/cores.md §5.1`](../design-system/01-fundamentos/cores.md#51-matriz-completa-1010-texto-sobre-fundo) — matriz 10×10 completa. Aqui vive o resumo com uso semântico.

Contrastes calculados via luminância relativa sRGB linearizada (WCAG 2.1). AAA ≥ 7:1 (normal) · AA ≥ 4.5:1 (normal) · AA/lg ≥ 3:1 (grande, ≥ 18.66px bold ou ≥ 24px regular).

| Uso semântico | Par | Ratio | Verdicto |
|---|---|---|---|
| **Corpo dark (leitura padrão)** | `--omiron-marfim` / `--omiron-fundo-profundo` | 15.02:1 | AAA — canônico |
| **Corpo sobre card** | `--omiron-marfim` / `--omiron-fundo-elevado` | 12.62:1 | AAA |
| **Texto secundário dark** | `--omiron-marfim-suave` / `--omiron-fundo-profundo` | 8.42:1 | AAA — legenda, metadata |
| **Título hero (Great Vibes)** | `--omiron-dourado-alto` / `--omiron-fundo-profundo` | 7.79:1 | AAA — capa |
| **Destaque de marca (Garamond)** | `--omiron-dourado-antigo` / `--omiron-fundo-profundo` | 4.68:1 | AA — subtítulo, ícone (nunca corpo longo) |
| **CTA primário — texto grande** | `--omiron-marfim` / `--omiron-ambar-crepusculo` | 3.18:1 | AA/lg — botão com texto ≥ 20px |
| **CTA primário — alternativo** | `--omiron-fundo-profundo` / `--omiron-ambar-crepusculo` | 4.72:1 | AA — botão com texto ≥ 15.75px bold |
| **Estado de erro** | `--omiron-marfim` / `--omiron-ambar-terra` | 5.11:1 | AA — mensagem de erro |
| **Receita física (papiro)** | `--omiron-marrom-couro` / `--omiron-fundo-marfim` | 9.28:1 | AAA — corpo em receita/print |

**Regras derivadas:**

- Corpo e dados clínicos usam **sempre** `--omiron-marfim` sobre `--omiron-fundo-profundo` (15.02:1). Nenhuma outra combinação é aceitável para leitura contínua.
- `--omiron-dourado-antigo` **nunca** em texto longo. É destaque de marca, ícone, borda.
- `--omiron-ambar-crepusculo` como CTA **sempre com texto grande** — mínimo 15.75px bold ou 20px regular.
- Estado de erro **nunca** só cor — sempre acompanhar de ícone + texto (WCAG 1.4.1). Regra em `cores.md §5.3`.
- Foco visível: usar `--omiron-dourado-antigo` como cor de foco (outline 2px). Vive também em `05-manual-operacional.md §Acessibilidade`.

Matriz completa 10×10 e detalhamento por par: `design-system/01-fundamentos/cores.md §5.1`.

---

## Ganchos de rastreabilidade

- **Design system canônico (tokens, cores, tipografia, tom visual):** `design-system/01-fundamentos/`.
- **Paleta HEX validada por pipeta:** `docs/pesquisa-referencias/paleta-hex-extraida.md` (v1 oficial).
- **Cenário-âncora visual (escadaria):** slide 18 do deck Canva — vencedor confirmado em reunião 01/07/2026.
- **Board Pinterest do cliente:** `docs/pesquisa-referencias/pinterest/pinterest-ariosto-analise.md` — 95 pins classificados.
- **Regras de motivos permitidos e proibidos:** triangulação de reunião 01/07 + Pinterest + tom visual (`design-system/01-fundamentos/tom-visual.md`).
- **SVG oficial do símbolo:** PENDENTE — registrado em `05-manual-operacional.md §Tensões abertas` para próxima rodada Harmonia + direção de arte.
- **Textura papiro binária:** PENDENTE — fallback `linear-gradient` ativo em `tokens.css` até próxima rodada.
- **Ícones dos 4 pilares (SVGs):** PENDENTES — registrados em `05-manual-operacional.md §Tensões abertas`.
