# Board Pinterest do Dr. Ariosto — Análise para Omiron

Fonte: scrape Firecrawl de `https://pin.it/7tpPWAghm` (redireciona para `https://br.pinterest.com/filhoariosto/omiron-pictures/`).
Arquivo bruto: `mcp-firecrawl-firecrawl_scrape-1783335879527.txt` (266 KB).
Data do scrape: 2026-07-06. Última atualização do board: 2026-07-01 14:22.

## Sumário do board

- **Nome**: Omiron Pictures
- **Donos declarados**: Ariosto Filho (`filhoariosto`) — dono principal; Kolden (`adm5139`) — colaborador
- **Total de pins declarado no metadata**: 53
- **Pins extraídos do scrape**: 95 blocos únicos por `pinId` (metadata `pinterestapp:pins` diz 53, então os ~42 excedentes são pins-relacionados/sugestões que o Pinterest injeta na página do board — ver §Riscos)
- **Seções**: não há divisão em seções internas — é um board único plano
- **Tags oficiais do board** (do `og:description`): "wallpapers bonitos, pinturas do renascimento, bibliotecas antigas"
- **Idioma da UI capturada**: pt-BR (mas os alt-texts e related-interests estão em inglês, gerados pelo classificador de imagens do Pinterest)

## Inventário dos pins

Dataset completo em `_pins-dedup.json` (mesma pasta deste documento). Cada pin tem: `pinId`, `pinUrl`, `img` (URL 236x direto no CDN `i.pinimg.com`), `alt` (alt-text descritivo gerado pelo Pinterest), `related` (lista de "related interests" — tags temáticas). Não há tags manuais/hashtags do dono no dataset — Pinterest não expõe isso no scrape do board público.

Amostra dos 30 primeiros pins (todos os 95 estão no JSON):

| # | Alt-text | pinId |
|---|---|---|
| 01 | pintura de pessoas em biblioteca com estantes e quadros nas paredes | 1069886455244627242 |
| 02 | grande onda de Kanagawa (variação estilo Hokusai) | 1069886455244627346 |
| 03 | duas mãos se tocando diante de céu com nuvens brancas (Criação de Adão) | 1069886455244627279 |
| 04 | Criação do Homem sendo erguido por dois homens diante de uma pintura | 1069886455244627317 |
| 05 | dois pássaros voando sobre edifício ornamentado | 1069886455244627270 |
| 06 | pintura ornamentada no teto de um edifício (afresco barroco) | 1069886455244627361 |
| 07 | duas mãos se tocando diante de céu nublado + citação "best" | 1069886455244627352 |
| 08 | pintura com pessoas dentro (afresco clássico) | — |
| 09 | pintura artística de nuvens rodeando um edifício no topo de uma montanha | — |
| 10 | muitos livros empilhados na parede | — |
| 11 | pessoa sentada no meio de água com montanhas ao fundo | — |
| 12 | relógio de bolso antigo pendurado por corrente sobre livros | — |
| 13 | luz do sol atravessando vitrais de igreja | — |
| 14 | "Noite Estrelada" ambientada em Nova York (Van Gogh remix) | — |
| 15 | estante antiga cheia de livros | — |
| 16 | estante antiga cheia de livros (variação) | — |
| 17 | pintura de ponte sobre rio com pessoas + montanhas ao fundo | — |
| 18 | estante estilizada com livros e elementos decorativos | — |
| 19 | homem sentado no meio de floresta com árvores altas | — |
| 20 | teto decorado em ouro + duas grandes colunas | — |
| 21 | globo terrestre antigo sobre escrivaninha | — |
| 22 | Criação de Adão e Eva pintada em parede | — |
| 23 | arco com vitrais e velas acesas conduzindo a um jardim | — |
| 24 | teto e pilares ornamentados de um edifício | — |
| 25 | sol atravessando um vitral | — |
| 26 | grande sala cheia de livros | — |
| 27 | pintura de ponte sobre rio com montanhas (variação) | — |
| 28 | montanha com árvores em primeiro plano e água no lado oposto | — |
| 29 | pintura de homem no topo de uma montanha olhando as nuvens | — |
| 30 | corredor ornamentado com ouro, mármore branco e grandes colunas | — |

Continuação parcial (para provar diversidade):

- 33 grande afresco com anjos
- 41 homem sobre penhasco à beira do oceano sob céu de tempestade com raios
- 42 pessoa diante de um arco com a lua acima
- 44 mulher sentada num trono cercada por velas
- 45 homem em corredor com asas de anjo na cabeça e braços
- 47 pin educativo sobre Leonardo da Vinci
- 48 homem no topo de montanha com raio no céu (evocação Zeus)
- 50 Van Gogh "Noite Estrelada" azul aesthetic
- 52 mulher em traje grego antigo empunhando lança (Atena/Palas)
- 53 homem parado nas nuvens com raio + imagem de deus
- 56 cavaleiro ferido / "Soldier of God" / referências às Cruzadas
- 60 velho trabalhando com madeira e serra (São José carpinteiro / Geppetto?)
- 62 homem segurando cruz com céu em chamas atrás (arcanjo?)
- 65 duas pessoas caminhando entre colunas e nuvens
- 67 escadaria em espiral subindo ao céu
- 70 mulher em muro de pedra diante de campo de homens em armadura
- 71 jardim com flores cercado por colunas
- 73 estátua de Jesus com mãos erguidas diante de colunas
- 75 ruínas de edifício antigo com colunas e estátuas
- 76 lago cercado de montanhas nevadas à noite
- 78 olho no centro de cena com pessoas e animais grandes (visão mística)
- 80 mulher de vestido roxo cercada por bruxas
- 84 homem em escadaria diante de arco com moeda dourada suspensa
- 85 homem de capuz preto com olhos brilhando diante de arco
- 86 cena com estátuas e lua cheia entre colunas
- 89 mulher com olhos fechados segurando luz sobre a cabeça + texto "the hindu"
- 91 cena artística com colunas, nuvens e pássaros voando sobre água
- 93 homem no meio de céu em espiral gigante de nuvens
- 94 homem parado num campo à noite
- 95 pessoa diante de foto P&B com texto "vivi mil vidas na minha mente"

**Dimensões**: o scrape não expõe dimensões originais — o Pinterest serve variantes 75x75 (avatar), 236x (thumb da grid), 736x e originais. As URLs no dataset estão na variante 236x; para reconstruir a original basta trocar `/236x/` por `/originals/` na URL (nem sempre funciona; 736x é o fallback estável).

## Matriz de padrões

### Paleta dominante (deduzida das tags + alt-texts)

Não há amostragem de pixel possível sem baixar imagens, então a leitura é indireta pelos rótulos:

1. **Dourado sobre escuro profundo** — 34 pins em tags com "dark", 4 com "gold" direto; combinação típica de fotos de tetos barrocos, afrescos iluminados por vela e cenas noturnas com raio (pins 20, 30, 44, 62, 84).
2. **Sépia / paleta terrosa clássica** — quase todos os afrescos e pinturas do Renascimento entram aqui (Sistina, Criação de Adão, Da Vinci); tag "renaissance"/"baroque" aparece 11 vezes.
3. **Azul-noite / preto profundo com estrelas** — pins 14, 50 (Van Gogh remix), 76 (lago à noite), 86 (lua cheia entre colunas), 94 (homem à noite no campo).
4. **Mármore branco frio + ouro** — corredores neoclássicos (pins 30, 35, 73, 75); tag "gothic library" 6 vezes.
5. **Céu tempestuoso com raio** — dourado dramático + azul-chumbo (pins 41, 48, 53). Alta densidade emocional.

Ausentes ou marginais: nada com pastéis/rosa/verde-menta; nada com neon/cyberpunk; zero flat/UI-design; zero fotografia de comida ou lifestyle contemporâneo.

### Motivos recorrentes (top-down por frequência)

- **Colunas gregas / neoclássicas** — 9 pins mencionam "column" no alt, 2 mais "pillar" (pins 20, 24, 30, 35, 65, 71, 73, 75, 86, 91). É o motivo arquitetônico dominante.
- **Bibliotecas / estantes carregadas de livros** — 10 pins com "book" no alt + 34 no related-interest "library" (1, 10, 15, 16, 17, 18, 21, 26, 34, 36, 37).
- **Afrescos / tetos barrocos** — pins 6, 20, 24, 30, 33, 81; padrão de teto ornado com anjos é uma assinatura.
- **Homens em montanhas ou penhascos olhando o horizonte** — Rückenfigur romântica tipo Caspar David Friedrich (pins 11, 19, 29, 31, 41, 46, 48, 55, 82, 93). É o segundo motivo mais forte.
- **Mãos se tocando (Criação de Adão)** — pins 3, 4, 7, 22 + tag Michelangelo em 9 pins.
- **Anjos / figuras com asas** — 15 ocorrências de "angel" nos related-interests; pins 33, 45, 81.
- **Sol/luz atravessando vitral** — pins 13, 23, 25 (motivo "luz divina").
- **Onda de Kanagawa (Hokusai)** — 1 pin explícito (2) + 9 tags "hokusai"; presente mas único, é a peça-símbolo.
- **Estátuas de mármore** — 5 pins com "statue" (35, 59, 73, 75, 86).
- **Guerreiro / cavaleiro / armadura** — pins 52, 56, 70; tag "warrior" 9x.
- **Lua cheia / céu estrelado** — pins 14, 42, 50, 86.
- **Chama / vela / tocha** — apenas 3 pins (23, 44, 62) — muito menos que o mapa mental sugere.
- **Corujas / corvos** — apenas 2 pins com pássaros genéricos, nenhum com coruja/corvo específicos.
- **Relógio / ampulheta / tempo** — 3 pins (12 relógio de bolso; 79 teia de aranha com frase sobre "ordem divina"). Menos que se esperava.

### Estilo dominante

Pintura clássica reproduzida como imagem digital domina com folga: **~24 pins são reproduções de afrescos, óleos renascentistas/barrocos ou obras neoclássicas** (Michelangelo, Da Vinci, Van Gogh, Hokusai, cena estilo Caspar Friedrich). Vem depois **arte digital "concept art" fantasia** — cenas de castelos, cavaleiros, arcos com portais místicos (pins 42, 55, 63, 84, 85). Fotografia realista é minoria (uns 3-4 pins: 13 vitrais, 76 lago). Render 3D "aesthetic" wallpaper aparece em pins 38, 49, 63. Tipografia decorativa como motivo visual quase não aparece — só há citações em overlay em 4-5 pins (7, 51, 79, 89, 95), sempre em serifa clássica ou sans-serif genérica, sem fontes script/blackletter destacadas.

### Tipografia visível nos pins

Baixíssima presença. Os poucos pins que trazem tipografia:

- Pin 7: sans-serif branca sobre nuvem — genérica.
- Pin 51: serifa branca sobre fundo preto — clean, Adobe Garamond-like.
- Pin 79: fonte manuscrita clara sobre teia — poderia ser algo tipo Great Vibes.
- Pin 89: sans-serif clean.
- Pin 95: serifa condensada com texto longo em P&B.

**Nenhum pin mostra blackletter/gótica alemã, nenhum mostra rubricas medievais decoradas.** O board indica preferência por **serifas clássicas discretas** e não por tipografia como personagem principal. Great Vibes/Alex Brush aparecem, no máximo, em 1 pin muito sutil.

### Densidade visual

**Maximalismo em conteúdo, mas composição centrada.** Quase todos os afrescos e ambientes são carregadíssimos (biblioteca cheia, teto barroco cheio, corredor com dezenas de estátuas), mas o ponto focal está no centro geométrico do quadro em ~70% dos pins. Não há minimalismo (nada de espaço branco, nada de flat design). Não há descentralização/composição de regra dos terços moderna. É a estética do sublime clássico: enche o quadro e coloca a figura protagonista no eixo.

### Iluminação e mood

- **Chiaroscuro** (contraste luz/sombra pesado) domina — visível nos pins 6, 20, 25, 44, 62, 68, 85.
- **Luz dourada / âmbar** de vela ou pôr do sol em 21 pins (~22%).
- **Céu tempestuoso com raio** em 3 pins de alto impacto (41, 48, 53) — tratamento pictórico dramático.
- **Névoa/nuvem** presente em 14 pins com "cloud" no alt (~15%).
- **Noite / dark** em 26 pins com temas noturnos ou related-interest com "dark academia" (10x).

Mood geral: **solene, épico, contemplativo**. Não há nada leve, cômico ou ensolarado casual. Pin 87 (gato de tutu) e 61 (gato com jaqueta de couro) são as únicas quebras cômicas — parecem pins escapados do algoritmo de sugestão, não escolha temática.

### Simbolismo predominante

Por ordem de força no dataset:

1. **Cristianismo / iconografia sagrada (herança clássica-ocidental)** — Criação de Adão, Sistina, anjos, Jesus, cruz, vitrais, arcanjos. É a camada mais espessa (~25 pins).
2. **Mitologia greco-romana** — 15 tags "greek mythology", 7 "olympus"; pins 48 e 53 são leituras contemporâneas de Zeus; pin 52 é Atena.
3. **Saber / filosofia / erudição** — bibliotecas, globos, livros, tag "dark academia" 10x.
4. **Espiritualidade oriental** — yoga, meditação, Shiva (pins 32, 39, 49, 89). Pequeno mas presente — o dono não é puramente greco-cristão.
5. **Guerreiro / soldado / cavaleiro** — 9x "warrior"; pins 52, 56, 70. Simbologia de honra e sacrifício.
6. **Ocultismo suave** — pin 80 (bruxas), 85 (figura encapuzada com olhos brilhantes), 78 (olho místico). Marginal mas existente.
7. **Estoicismo explícito** — quase ausente. Não há tag "stoic" nem "Marcus Aurelius" em nenhuma related-interest. O tema está no mapa mental do Ronan, não no board.

### Presença humana

- **Figuras humanas dominam** — 32 pins mencionam "man", 5 "woman", 6 "person/people". Total: ~50% dos pins têm figura humana como protagonista.
- **Homem, adulto, solitário** — perfil do arquétipo dominante. Ele quase sempre está de costas para o espectador (Rückenfigur romântica) ou olhando para longe. Em roupa neutra (calça escura, casaco longo, capa/robe).
- **Mulher aparece em contextos específicos** — trono cercada de velas (44), guerreira em traje grego (52), bruxa/mística (80, 89). Papel arquetípico, nunca casual.
- **Idoso com barba branca** — pin 68 é retrato clássico de sábio ancião. Pin 60 tem um velho artesão. Poucos, mas alinhados ao arquétipo Sábio/Mestre.
- **Zero crianças. Zero grupos familiares. Zero cenas urbanas contemporâneas.** O board recusa modernidade cotidiana.

## Cruzamento com o mapa mental do Ronan

O mapa mental fornecido tem termos: Sábio/Mestre/Professor, Adobe Garamond, Great Vibes, Alex Brush, Marco Aurélio, Sansão, Psique, Hécate, Quíron, Oráculo de Delfos, Alexandria Bibliotheca, Chama Olímpica, Série Dark, "erudição, sofisticação, elegância, arte", "maximalismo, majestoso, glorioso, antiguidade, gótica, prosperidade", símbolos de tempo, estoicismo, conexão espiritual.

### CONFIRMA (o board mostra em força)

- **Sábio/Mestre/Professor como arquétipo** — a figura solitária contemplativa de costas, o velho barbudo, o guerreiro veterano, o eremita em montanha.
- **Alexandria Bibliotheca** — bibliotecas antigas são o segundo motivo mais forte do board (34 tags "library").
- **Maximalismo majestoso** — afrescos barrocos, corredores dourados, tetos ornamentados abundam.
- **Antiguidade / colunas gregas** — motivo arquitetônico dominante.
- **Erudição, sofisticação, elegância** — bibliotecas, globos, Da Vinci, Renascimento, dark academia.
- **Conexão espiritual / gótica** — vitrais, arcanjos, chiaroscuro em cenas religiosas, tag "gothic" 6x.
- **Hécate (feminino místico noturno)** — presente em 5 tags related "hecate" + pins 44 (trono com velas), 80 (bruxas), 89 (mulher com luz na cabeça).
- **Michelangelo / Sistina** — 9 tags "michelangelo"; a Criação de Adão é o segundo pin do board.

### AMPLIA (o board mostra o que o mapa não citou)

- **Hokusai / A Grande Onda de Kanagawa** — pin 2 é uma variação, e há 9 tags Hokusai. O mapa mental menciona "tsunami" como símbolo de tempo, mas o board traz especificamente a iconografia Hokusai — vale citar por nome no brandbook.
- **Van Gogh Noite Estrelada** — pins 14 e 50. Céu em espiral azul-cobalto é uma paleta a considerar.
- **Rückenfigur romântica (Caspar David Friedrich)** — homem sobre penhasco olhando o horizonte é o segundo motivo mais forte. O mapa mental não nomeia isso, mas é o que Dr. Ariosto puxa mais em quantidade.
- **Céu tempestuoso com raio (Zeus contemporâneo)** — pins 41, 48, 53. Composição fotográfica/concept-art muito intensa.
- **Van Gogh + Hokusai + Michelangelo** — o dono transita entre três tradições canônicas, não fica só na Grécia.
- **Espiritualidade indiana (Shiva, yoga, chakra)** — presença real (~5 pins). O mapa é greco-cristão; o board é mais eclético.
- **Escadaria em espiral subindo ao céu** (pin 67) — motivo forte de ascensão, vale isolar.
- **Cavaleiro/soldado de fé** — pin 56 "Soldier of God". Tag "warrior" 9x. Ampliação da ideia de Sansão para "guerreiro sagrado".

### CONTRADIZ ou NÃO SUSTENTA

- **Estoicismo / Marco Aurélio** — 0 pins, 0 tags. O tema está na cabeça do Ronan, não no board.
- **Chama Olímpica / tocha** — 3 pins com fogo/vela. Bem menos do que o mapa sugere. Tocha olímpica especificamente = 0.
- **Símbolos de tempo (relógio, ampulheta)** — apenas 1 pin de relógio (12) + 1 de "ordem divina" (79). Tempo cronológico não é motivo forte. **Tsunami** aparece como Hokusai, mas o simbolismo "passagem do tempo" está mais implícito em ruínas e ancião (pin 68) do que em relógio.
- **Oráculo de Delfos** — 1 tag related, nenhum pin figurativo direto. Ampliar o oráculo teria que ser decisão de design, não replicação do board.
- **Tipografia manuscrita (Great Vibes, Alex Brush)** — o board não sustenta. Fontes decorativas quase não aparecem como elemento visual.
- **Adobe Garamond** — o board não mostra tipografia proeminente para julgar; a preferência declarada por serifa clássica é compatível mas não visualmente comprovada.
- **Série "Dark" (do Netflix)** — o board tem "dark academia" 10x e "gothic" 6x, mas não há nenhum pin com estética sci-fi/túnel temporal/paleta grade-color-teal característica da série. O "dark" do board é "dark clássico" (barroco escuro), não "dark contemporâneo" (Fincher/série alemã).
- **Prosperidade / opulência dourada** — presente (~20 pins com ouro), mas sempre como ouro **sacro/antigo** (afresco, moldura, coroa), nunca como ouro **contemporâneo** (luxo consumista, joia). Convém desambiguar no brandbook.
- **Corujas** — 0. Se a coruja de Atena for âncora simbólica, não vem do board.

## Recomendação executiva para o brandbook do Omiron

Bullets prontos para incorporar ao design system:

1. **Adotar a Rückenfigur solitária como fotografia-âncora do produto.** Homem/mulher contemplando horizonte de costas para a câmera é a composição mais repetida (10+ pins) e resume o arquétipo "paciente em jornada terapêutica olhando para dentro". Vale contratar direção de arte fotográfica que produza cenas assim para landing/onboarding.
2. **Paleta primária: preto profundo + dourado antigo + off-white marfim.** É o cruzamento entre o dark academia (10x), o barroco (11x) e o afresco renascentista (24 pins). Evitar dourado brilhante consumista — mirar dourado sacro tipo folha-de-ouro envelhecida.
3. **Paleta secundária: azul-noite estrelado.** Pins 14, 50, 76, 86, 94 sustentam. Excelente para modos "descanso" ou telas de meditação noturna do app.
4. **Motivos gráficos: colunas gregas + arcos + escadaria em espiral.** Alta densidade e coerência simbólica (ascensão, portal, saber clássico). Traduzir em ícones e ilustrações do sistema — não como decoração, como estrutura de layout (colunas como grid).
5. **Iconografia central: mãos se tocando (Criação de Adão) como pictograma-âncora do vínculo médico-paciente.** Já é sub-representado no board (pins 3, 4, 7, 22) — o Dr. Ariosto vai reconhecer imediatamente.
6. **Tipografia: serifa clássica de texto (Adobe Garamond ou similar) + serifa display para títulos.** Sem blackletter, sem script decorativa. O board não sustenta manuscritas. Se quiser um toque personalidade, usar itálico de Garamond em citações. Great Vibes/Alex Brush do mapa mental do Ronan devem ser rebaixadas de "identidade" para "assinatura ocasional".
7. **Evitar rigorosamente**: flat design, ilustração corporativa vetorial genérica, fotografia stock corporate, cores neon/pastel, sans-serif geométrica moderna (tipo Poppins/Circular). Nenhum pin sustenta isso. Se aparecer no design, vai bater de frente com o gosto do médico.
8. **Símbolos de tempo**: usar com moderação. Trocar o "relógio de bolso" (batido) pela **onda de Hokusai** como símbolo do tempo/ciclo — o pin explícito 2 e as 9 tags provam que ele reconhece essa metáfora. Complementarmente, "ruínas + ancião" carregam a passagem do tempo com mais elegância que um relógio literal.
9. **Guerreiro sagrado como iconografia opcional**: o board sustenta 9 tags "warrior" + pins 52, 56, 62, 70. Para materiais de comunicação sobre "coragem/resiliência" do paciente psiquiátrico, essa camada funciona sem parecer clichê motivacional.
10. **Espiritualidade oriental**: presente porém minoritária. Se Omiron for tratar mindfulness/meditação, incorporar de forma discreta (pin 89 mostra que Dr. Ariosto aceita a leitura Hindu com sobriedade); não fazer disso a fachada.

## Riscos e ressalvas

- **Contaminação por "related pins" do Pinterest**: o board declara 53 pins, extraímos 95. A diferença (~42 pins) provavelmente vem da barra de "mais pins relacionados" que o Pinterest renderiza na mesma página. **A análise agregada não é comprometida** porque esses pins-relacionados são gerados exatamente pelo perfil temático do board — refletem o gosto do dono por sugestão do algoritmo, não desviam do vetor. Mas se quiser rigor absoluto para uma decisão específica, filtre o dataset pelos 53 primeiros pinIds únicos que aparecem no markdown (a ordem de aparição no scrape corresponde à ordem visual do board).
- **Alt-texts são autogerados pelo Pinterest**, não pelo Dr. Ariosto. Descrevem o que a IA de imagem vê. São confiáveis para conteúdo objetivo (número de figuras, presença de colunas) mas subjetivos para atmosfera. Cruzei com as related-interests (tags que Pinterest atribui) para ganhar redundância.
- **Zero descrições do dono**: o Dr. Ariosto não escreveu descrições próprias nos pins — todo texto veio da automação. Isso limita insights sobre a **intenção** dele. Só temos o que ele **escolheu salvar**, não o que ele **diz** dele mesmo. Se quiser mais camada psicológica, valeria uma entrevista de 30 minutos com ele passando por 10-15 pins e narrando por que salvou cada um.
- **Não capturamos comentários, upvotes ou datas de save** — só o par (imagem, alt-text, related). Se importar cronologia (quando ele salvou cada pin) seria preciso outro método (Apify actor de Pinterest, ex.: `epctex/pinterest-scraper`).
- **Dataset limpo**: não vi HTML/JS/CSS residual, não vi pins de outros donos, não vi anúncios injetados. O scrape do Firecrawl entregou markdown navegável. **Não é necessário rodar Apify como fallback.**
- **Imagens não baixadas**: só temos URLs 236x. Para decisões de paleta baseadas em pixel real (extração de cor média por pin), o próximo passo é baixar os 95 arquivos e rodar um k-means. Ficou fora do escopo deste dossiê.
- **Pins 61, 74, 83, 87, 88**: gato de couro, orc de ArtStation, Rick and Morty, gato de tutu, avatares anime — são ruído/sugestões que fugiram do padrão do board. Ignore-os na análise.
