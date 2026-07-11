---
tipo: nota
area: Caliope
up: "[[Caliope/_MOC-caliope]]"
relacionado:
  - "[[Caliope/.claude/skills/de-slop/references/calibracao-de-voz|calibracao-de-voz]]"
  - "[[Caliope/.claude/skills/de-slop/references/checklist-e-scorecard|checklist-e-scorecard]]"
  - "[[Caliope/.claude/skills/de-slop/references/guia-falso-positivo|guia-falso-positivo]]"
---

# Padrões anti-IA (taxonomia adaptada ao PT-BR)

Catálogo dos sinais que denunciam texto gerado por IA, recalibrado para o português do
Brasil. **Não** é uma tradução da lista inglesa: os tells em inglês (em-dash, "rule of
three", curly quotes, "delve") têm equivalentes próprios em PT-BR, e é deles que tratamos.

Use por **cluster**, nunca por sinal isolado (ver `guia-falso-positivo.md`). Cada padrão
tem o problema e um par Antes/Depois em português.

---

## A. Conteúdo (inflar significado)

### A1. Ênfase indevida em importância, legado e "tendências maiores"
**Palavras-sentinela:** "é um marco", "representa um divisor de águas", "consolida-se
como", "desempenha um papel fundamental/crucial/central", "reforça a importância de",
"reflete um movimento mais amplo", "abre caminho para", "deixa uma marca indelével",
"profundamente enraizado".

**Problema:** o modelo infla a relevância colando frases sobre como um detalhe qualquer
"representa" ou "contribui para" um tema maior.

**Antes:** O instituto foi criado em 1989, marcando um momento decisivo na evolução das
estatísticas regionais e refletindo um movimento mais amplo de descentralização.
**Depois:** O instituto foi criado em 1989 para coletar e publicar estatísticas regionais
de forma independente do órgão nacional.

### A2. Ênfase indevida em notoriedade e cobertura de mídia
**Sentinelas:** "ganhou destaque na mídia", "foi citado por diversos veículos", "tem forte
presença nas redes", "reconhecido por especialistas".

**Problema:** empilha provas de relevância (lista de veículos sem contexto) em vez de
dizer o que a pessoa fez.

**Antes:** Suas ideias foram citadas pela Folha, pela BBC e por diversos veículos. Mantém
presença ativa nas redes, com mais de 500 mil seguidores.
**Depois:** Em entrevista à Folha em 2024, defendeu que a regulação de IA deveria mirar
resultados, não métodos.

### A3. Análises rasas com gerúndio decorativo
**Sentinelas:** "...destacando", "...evidenciando", "...reforçando", "...garantindo",
"...simbolizando", "...refletindo", "...contribuindo para", "...consolidando".

**Problema:** o gerúndio é colado no fim da frase para fingir profundidade. (O gerúndio em
si é legítimo em PT-BR; o tell é o gerúndio *avaliativo* pendurado para inflar.)

**Antes:** A paleta de azul, verde e dourado dialoga com a natureza local, simbolizando o
céu, o mar e a mata, refletindo a conexão profunda da comunidade com a terra.
**Depois:** A paleta usa azul, verde e dourado. Segundo o arquiteto, as cores remetem ao
céu, ao mar e à mata da região.

### A4. Linguagem promocional / de folder turístico
**Sentinelas:** "vibrante", "rico em", "exuberante", "deslumbrante", "encravado em",
"no coração de", "imperdível", "de tirar o fôlego", "consagrado", "pujante".

**Problema:** o modelo não segura tom neutro, sobretudo em "patrimônio cultural".

**Antes:** Encravada na deslumbrante região serrana, a cidade se destaca como um polo
vibrante de rica herança cultural e belezas naturais de tirar o fôlego.
**Depois:** A cidade fica na região serrana e é conhecida pela feira semanal e pela igreja
do século XVIII.

### A5. Atribuições vagas e palavras-comadre
**Sentinelas:** "especialistas apontam", "observadores notam", "estudos indicam",
"sabe-se que", "muitos afirmam", "fontes do setor" (sem citar quais).

**Problema:** atribui opiniões a autoridades genéricas, sem fonte específica.

**Antes:** Por suas características, o rio desperta interesse. Especialistas acreditam que
ele cumpre papel crucial no ecossistema regional.
**Depois:** O rio abriga espécies endêmicas de peixe, segundo levantamento de 2019 da
universidade estadual.

### A6. Seção formulaica "Desafios e perspectivas futuras"
**Sentinelas:** "Apesar dos desafios...", "Apesar disso, segue prosperando", "Desafios e
legado", "Perspectivas futuras".

**Problema:** o modelo fecha quase tudo com uma seção genérica de desafios e otimismo.

**Antes:** Apesar de sua prosperidade, o bairro enfrenta desafios típicos das áreas
urbanas, como trânsito e falta d'água. Ainda assim, segue prosperando.
**Depois:** O trânsito piorou depois de 2015, com a abertura de três polos de tecnologia.
A prefeitura iniciou em 2022 uma obra de drenagem contra as enchentes recorrentes.

---

## B. Léxico e gramática

### B1. Vocabulário-clichê de IA (PT-BR)
**Alta frequência:** "ademais", "outrossim", "ressaltar/destacar", "fomentar",
"potencializar", "robusto", "intrincado", "nuances", "tessitura", "panorama/cenário"
(abstrato), "fundamental", "crucial", "primordial", "no tocante a", "vasto", "rico",
"singular", "ímpar", "verdadeiro divisor".

**Problema:** essas palavras aparecem muito mais em texto pós-2023 e costumam andar juntas.

**Antes:** Ademais, um traço singular da culinária local é o uso de mandioca. Um
verdadeiro testemunho da influência portuguesa é a adoção do bacalhau, ressaltando como
esses pratos se integraram ao cardápio.
**Depois:** A culinária local também usa muito mandioca. O bacalhau, herdado dos
portugueses, é comum, sobretudo nas festas.

### B2. Fuga do verbo "ser/estar" (perífrases pomposas)
**Sentinelas:** "configura-se como", "constitui-se em", "apresenta-se como", "consolida-se
como", "destaca-se por", "conta com" (no lugar de "tem"), "dispõe de".

**Problema:** o modelo troca "é/tem" por construções elaboradas.

**Antes:** A galeria configura-se como o espaço de arte contemporânea da instituição e
conta com mais de 300 metros quadrados.
**Depois:** A galeria é o espaço de arte contemporânea da instituição e tem mais de 300
metros quadrados.

### B3. Paralelismos negativos e negação-rabo
**Problema:** "não só... mas também...", "não se trata de... e sim de...", "mais do que X,
é Y" são superusados. Também o fragmento de negação grudado no fim ("sem achismo", "sem
esforço") em vez de virar oração de verdade.

**Antes:** Não se trata só da batida sob o vocal; é parte da agressividade. Não é apenas
uma música, é um manifesto.
**Depois:** A batida pesada reforça o tom agressivo da faixa.

**Antes (negação-rabo):** As opções vêm do item selecionado, sem achismo.
**Depois:** As opções vêm do item selecionado, sem obrigar o usuário a adivinhar.

### B4. Regra de três (tríades forçadas)
**Problema:** o modelo enfileira ideias em grupos de três para parecer completo. Em PT-BR
aparece muito como adjetivos tríplices ("ágil, intuitivo e poderoso") e listas de três
itens onde dois bastam.

**Antes:** O evento traz palestras, painéis e networking. Espere inovação, inspiração e
insights de mercado.
**Depois:** O evento tem palestras e painéis, com tempo para conversas no intervalo.

### B5. Variação elegante (caça-sinônimo)
**Problema:** por penalidade de repetição, a IA troca o mesmo referente por uma fila de
sinônimos ("o protagonista... o herói... a personagem central... o jovem").

**Antes:** O protagonista enfrenta desafios. O herói precisa superar obstáculos. A
personagem central enfim triunfa. O jovem volta para casa.
**Depois:** O protagonista enfrenta vários desafios, mas no fim triunfa e volta para casa.

### B6. Falsas amplitudes ("de X a Y")
**Problema:** construções "do X ao Y" em que X e Y não estão numa escala real, só para
soar abrangente.

**Antes:** Nossa jornada pelo universo nos levou da singularidade do Big Bang à grande teia
cósmica, do nascimento das estrelas à dança enigmática da matéria escura.
**Depois:** O livro cobre o Big Bang, a formação das estrelas e as teorias atuais sobre
matéria escura.

### B7. Voz passiva e sujeito oculto/inanimado
**Problema:** a IA esconde o agente na passiva ("foram tomadas medidas") ou some com o
sujeito ("Não é necessário configurar nada"). Pior: dá verbo humano a coisa
("a reclamação vira um conserto", "a decisão emerge", "os dados nos dizem"). Nomeie o humano.

**Antes:** Não é necessário arquivo de configuração. Os resultados são preservados
automaticamente. A decisão foi tomada.
**Depois:** Você não precisa de arquivo de configuração. O sistema preserva os resultados.
A diretoria decidiu.

---

## C. Estilo e formatação

### C1. Travessão — corte total
**Regra:** a versão final não tem travessão (—) nem traço-en (–), nem espaçado (` — `),
nem hifén duplo (` -- `). É o tell mais confiável. Troque por ponto, vírgula, dois-pontos,
parênteses ou reestruture. Varra o texto atrás de `—` e `–` antes de entregar.
**Cuidado PT-BR:** não confunda com o **travessão de diálogo** no início da linha em
ficção, que é legítimo. O tell é o travessão *no meio da frase* fazendo o papel de vírgula
ou parêntese.

**Antes:** O termo é empurrado pelas instituições — não pelas pessoas. Você não diz "Brasil,
América" como endereço — e ainda assim o erro persiste — até em documento oficial.
**Depois:** O termo é empurrado pelas instituições, não pelas pessoas. Você não diz
"Brasil, América" como endereço, e ainda assim o erro persiste, até em documento oficial.

### C2. Negrito mecânico
**Problema:** a IA emnegrita frases inteiras sem critério.

**Antes:** Ele combina **OKRs**, **KPIs** e ferramentas visuais como o **Business Model
Canvas** e o **Balanced Scorecard**.
**Depois:** Ele combina OKRs, KPIs e ferramentas visuais como o Business Model Canvas e o
Balanced Scorecard.

### C3. Listas com cabeçalho-embutido (rótulo: explicação)
**Problema:** itens que começam com um rótulo em negrito seguido de dois-pontos.

**Antes:**
> - **Experiência:** a experiência do usuário melhorou com uma nova interface.
> - **Desempenho:** o desempenho aumentou com algoritmos otimizados.
> - **Segurança:** a segurança foi reforçada com criptografia ponta a ponta.

**Depois:** A atualização renova a interface, acelera o carregamento com algoritmos
otimizados e adiciona criptografia ponta a ponta.

### C4. Caixa-alta de título em estilo inglês
**Problema:** capitular todas as palavras do título ("Negociações Estratégicas E Parcerias
Globais"). Em PT-BR, título usa caixa-alta só na primeira palavra e em nomes próprios.

**Antes:** ## Negociações Estratégicas E Parcerias Globais
**Depois:** ## Negociações estratégicas e parcerias globais

### C5. Emojis decorativos
**Problema:** a IA enfeita títulos e bullets com emojis.

**Antes:** 🚀 **Lançamento:** o produto sai no 3º trimestre · 💡 **Insight:** usuários
preferem simplicidade · ✅ **Próximo passo:** marcar reunião.
**Depois:** O produto sai no 3º trimestre. A pesquisa mostrou preferência por simplicidade.
Próximo passo: marcar a reunião.

### C6. Aspas curvas / tipográficas misturadas
**Problema:** mistura de aspas curvas ("..." e '...') com aspas retas, ou uso de aspas
inglesas onde o texto pedia aspas retas ou angulares. Padronize conforme o veículo.
*Cuidado:* aspas curvas sozinhas **não** são tell (editores curvam por padrão) — só contam
em cluster.

**Antes:** Ele disse "o projeto está no prazo" mas outros discordaram.
**Depois:** Ele disse "o projeto está no prazo", mas outros discordaram.

---

## D. Comunicação (resíduo de chatbot)

### D1. Artefatos de conversa colados no conteúdo
**Sentinelas:** "Espero ter ajudado!", "Claro!", "Com certeza!", "Você está certíssimo!",
"Quer que eu detalhe?", "Posso continuar?", "Aqui está um resumo...", "Segue abaixo...".

**Antes:** Aqui está um panorama da Revolução Francesa. Espero ter ajudado! Me avise se
quiser que eu expanda alguma parte.
**Depois:** A Revolução Francesa começou em 1789, quando a crise financeira e a falta de
alimentos provocaram revolta generalizada.

### D2. Disclaimers de corte de conhecimento e preenchimento especulativo
**Sentinelas:** "até a minha última atualização", "embora os detalhes sejam escassos",
"com base nas informações disponíveis", "não há registros públicos", "mantém um perfil
discreto", "preserva a privacidade", "provavelmente estudou/cresceu", "acredita-se que".

**Problema:** dois tells. (a) o modelo deixa o aviso de corte no texto; (b) quando não acha
fonte, escreve um parágrafo *sobre* não ter achado e inventa recheio plausível. Diga o que
não se sabe, ou corte a frase — não vista um chute de fato.

**Antes:** Embora os detalhes sobre a fundação não estejam amplamente documentados nas
fontes disponíveis, ela parece ter sido criada nos anos 1990.
**Depois:** A empresa foi fundada em 1994, segundo o registro na junta comercial.

### D3. Tom bajulador/servil
**Problema:** linguagem positiva e agradadora demais.

**Antes:** Ótima pergunta! Você tem toda razão, é um tema complexo. Excelente ponto sobre
os fatores econômicos.
**Depois:** Os fatores econômicos que você citou são relevantes aqui.

---

## E. Enchimento, hedging e drama fabricado

### E1. Frases de enchimento
**Antes → Depois:**
- "com o intuito de alcançar esse objetivo" → "para isso"
- "devido ao fato de que estava chovendo" → "porque estava chovendo"
- "neste momento" / "no presente momento" → "agora"
- "na eventualidade de precisar de ajuda" → "se precisar de ajuda"
- "o sistema tem a capacidade de processar" → "o sistema processa"
- "é importante destacar que os dados mostram" → "os dados mostram"
- "no que diz respeito a" → "sobre"
- "em um mundo onde" → (corte)

### E2. Hedging excessivo (qualificar demais)
**Antes:** Poderia-se eventualmente talvez argumentar que a política possa vir a ter algum
tipo de efeito sobre os resultados.
**Depois:** A política pode afetar os resultados.

### E3. Conclusão positiva genérica
**Antes:** O futuro é promissor. Tempos empolgantes virão à medida que a empresa segue sua
jornada rumo à excelência. É um passo na direção certa.
**Depois:** A empresa planeja abrir duas novas unidades no ano que vem.

### E4. Tropos de autoridade persuasiva
**Sentinelas:** "a verdadeira questão é", "no fundo", "na prática", "o que realmente
importa", "essencialmente", "o cerne da questão", "a questão de fundo".

**Problema:** finge cortar o ruído até "uma verdade mais profunda", mas a frase seguinte só
repete um ponto comum com pompa.

**Antes:** A verdadeira questão é se os times conseguem se adaptar. No fundo, o que importa
é a prontidão organizacional.
**Depois:** A questão é se os times conseguem se adaptar. Isso depende de a empresa estar
disposta a mudar de hábito.

### E5. Sinalização e anúncios ("vamos explorar")
**Sentinelas:** "vamos mergulhar", "vamos explorar", "vamos destrinchar", "veja o que você
precisa saber", "sem mais delongas", "agora vamos analisar".

**Problema:** a IA anuncia o que vai fazer em vez de fazer. Dá ar de roteiro de tutorial.

**Antes:** Vamos mergulhar em como funciona o cache no Next.js. Veja o que você precisa
saber.
**Depois:** O Next.js faz cache em várias camadas: memoização de requisição, cache de dados
e cache de rota.

### E6. Cabeçalho fragmentado (eco do título)
**Problema:** depois do título, uma frase de uma linha que só repete o título antes do
conteúdo real.

**Antes:**
> ## Desempenho
> Velocidade importa.
> Quando o usuário pega uma página lenta, ele vai embora.

**Depois:**
> ## Desempenho
> Quando o usuário pega uma página lenta, ele vai embora.

### E7. Escrita ancorada no diff
**Problema:** documentação escrita como se narrasse uma mudança, não a coisa como ela é.
Salvo changelogs e notas de versão, o texto deve se sustentar sem saber o que mudou.

**Antes:** Esta função foi adicionada para substituir a abordagem anterior, que percorria
todos os itens e causava lentidão.
**Depois:** Esta função usa um hash map para busca em O(1), evitando o custo da iteração
ingênua.

### E8. Punchlines fabricados e drama em staccato
**Problema:** toda frase fecha como citação de impacto, e a IA empilha fragmentos curtos
para fabricar drama. Uma frase curta de ênfase é ok; uma sequência delas soa engenhada.

**Antes:** Então o algoritmo chegou. Sem preferência por simetria. Sem viés estético. Sem
nostalgia. As velhas regras se foram.
**Depois:** O algoritmo mudou a busca porque não favorecia simetria nem desenhos de aspecto
humano, o que tornou algumas suposições antigas menos úteis.

### E9. Fórmulas de aforismo
**Sentinelas:** "X é o Y de Z", "X vira uma armadilha", "não é ferramenta, é espelho", "a
linguagem do", "a moeda do", "a arquitetura do".

**Problema:** transforma afirmações comuns em aforismos reutilizáveis que soam profundos
sem ganhar precisão. Troque a fórmula pela afirmação concreta por trás dela.

**Antes:** A simetria é a linguagem da confiança. A eficiência vira uma armadilha quando os
times esquecem o humano.
**Depois:** Layouts simétricos costumam parecer mais previsíveis ao usuário. Times podem
otimizar demais o processo e perder de vista como as pessoas usam de fato.

### E10. Aberturas retóricas de falsa franqueza
**Sentinelas:** "Olha", "Sinceramente?", "A real é que", "Vou ser honesto", "Deixa eu te
falar", como ganchos isolados antes de um ponto comum.

**Problema:** a IA abre com um gancho de falsa intimidade antes de entregar uma afirmação
trivial. O tell é a pausa teatral: uma palavra ou pergunta solta, e então a resposta
"verdadeira". Quem é franco de verdade costuma só dizer a coisa.

**Antes:** Vale o preço? Sinceramente? Depende de quanto você vai usar.
**Depois:** Vale o preço depende de quanto você vai usar.

### E11. Pares hifenizados/compostos repetidos
**Problema:** a IA empilha compostos da moda ("orientado a dados", "multifuncional",
"de ponta a ponta", "em tempo real", "de longo prazo"). Não é proibido, mas em série vira
tell. Prefira a forma simples quando o composto não for atributo direto do substantivo.

**Antes:** O time multifuncional entregou um relatório orientado a dados, de alta qualidade,
em tempo real.
**Depois:** O time entregou um relatório de qualidade, com dados atualizados.
