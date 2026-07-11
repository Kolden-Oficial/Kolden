---
id_fonte: "603ed49c-cfae-4b52-84ce-7dcb1c8ff93b"
notebook_id: "1eb3e160-2c74-42dc-aff2-9b95a5fb44c6"
notebook_titulo: "Kolden"
titulo: "Otimizando o processo de criação de uma paleta de cores eficiente - UX Collective"
tipo: "unknown"
url_original: "https://brasil.uxdesign.cc/otimizando-o-processo-de-cria%C3%A7%C3%A3o-de-uma-paleta-de-cores-eficiente-712fb4402b5d"
keywords: "('Design System creation', 'Color psychology', 'Accessibility guidelines', 'System status colors', 'HSL color model')"
summary: "This article provides a comprehensive guide for designers on developing a **scalable and inclusive color palette** for a design system. The author transitions from the **psychological impact of color** to the technical necessity of **accessibility and system status**, arguing that color choices must serve a functional purpose rather than a purely aesthetic one. By following a structured **five-step process**—which includes researching references, categorizing hues into primary, system, and neutral tones, and validating contrast via **WCAG standards**—designers can ensure their interfaces are usable for everyone. The text culminates in a practical \"formula\" using the **HSL (Hue, Saturation, Lightness) model** to systematically generate color variants that maintain visual harmony and professional rigor."
extraido_em: "2026-06-30T16:13:46Z"
extraido_por: "notebooklm-py-0.7.3"
area: mercado
up: "[[sobre-a-empresa/Kolden/mercado/_MOC-mercado]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/mercado/referencias/geral/_indice|_indice]]"
---

# Otimizando o processo de criação de uma paleta de cores eficiente - UX Collective

SitemapOpen in app
Sign in
Medium LogoWriteSearch
Sign in

#### UX Collective 🇧🇷

·
Textos para designers  —  que pensam e criam.

### Otimizando o processo de criação de uma paleta de cores eficiente

#### Compartilhando meu processo para desenvolver uma paleta de cores escalável e acessível para um sistema de design.

Jean Fraga8 min read · May 18, 2023--
Paleta de cores

#### Introdução

Antes de começar a falar sobre o tema propriamente dito, podemos deixar claro uma coisa, se você está lendo este texto é, assim como eu, um entusiasta sobre o assunto.
A relação do ser humano com cor está por todo lugar. **A psicologia das cores** , de Eva Heller, estuda como elas afetam o comportamento humano, as emoções, percepções e decisões. Essa área de estudo analisa como a exposição a diferentes cores pode influenciar como as pessoas se sentem e se comportam. Como, por exemplo, na escolha de uma paleta de cores de uma casa, na percepção de qualidade de um produto, entre outros.
Tudo isso para entendermos que definir uma paleta para o seu Design System vai muito além da estética, preferências e muitas vezes está acima de decisões já estipuladas, como a cor principal da marca.

#### Cores além da estética

Nem todas as pessoas enxergam cores da mesma forma. Tecnicamente falando, nosso cérebro identifica as cores ao receber luz pela retina dos olhos, onde são analisadas e interpretadas por algumas células: **cones e bastonetes** . E existem pessoas com uma deficiência genética nessa capacidade de distinguir certas cores, o que faz com que tenhamos um número plural de pessoas que interpretam a mesma cor de formas diferentes.
Sob esse contexto, imagine lidar com pessoas usuárias com dificuldades de distinguir elementos em um aplicativo. Cores muito bem selecionadas, além de auxiliar na usabilidade do produto, padronizam comportamentos, elementos interativos e situação do sistema.

#### A função das cores

Como dito anteriormente, as cores de um sistema podem ser muito úteis para nos guiar na forma como nos comunicamos com determinado produto via uma interface. Ou seja, em um Design System é fundamental que cada pequena parte tenha uma função, uma forma de ser aplicada com propósito de orientar a pessoa usuária a tomar suas decisões. Nesse artigo **aqui** o Nielsen Norman Group fala mais sobre visibilidade do status do sistema.
Dou um exemplo clássico: um sinal de trânsito tem o objetivo de organizar e controlar o fluxo de veículos e pedestres, evitando congestionamentos e acidentes. E como isso acontece? Com o auxílio de cores. As cores usadas nos sinais de trânsito são padronizadas internacionalmente e seguem uma lógica simples: vermelho (pare), amarelo (atenção) e verde (siga).

#### Criando uma paleta

Ao pesquisar na internet e materiais de apoio, não é uma tarefa fácil encontrar informações mais concretas e consolidadas sobre como criar uma paleta de cores eficiente. Ao longo de vários projetos nos quais trabalhei, eu aprimorei uma fórmula que tem me ajudado bastante nesse processo.
Para começar, elaborei os 5 passos necessários para chegarmos lá:

##### Passo 1: Entender a necessidade

Iniciando com uma pergunta: por qual motivo você precisa gerar um paleta de cores? Pode ser que você precise desenvolver um sistema para um produto e não tenha nada na mão a não ser o logotipo da empresa e muita boa-fé. Talvez, esse produto já exista e tenha cores pré-definidas que já são utilizadas, mas você sabe que faltam opções para poder replicar pelo sistema.
Para ambos os casos, é preciso estar ciente qual é a etapa inicial e obter alguma conexão com o produto, seja ele o conceito da marca, uma necessidade dos stakeholders, entre outros significados que você pode buscar para agregar valor a sua justificativa.

##### Passo 2: Explorar referências

Para um bom profissional, seja da área do design ou afins, nada como uma boa pesquisa de referências. Existem diversas formas e ferramentas para isso, citemos alguns exemplos. O primeiro é investigar produtos ou marcas que possam ser concorrentes ou que compartilham da mesma área de negócio. É importante saber como o coleguinha ao lado trabalha as cores na prática.
Outro exemplo, mais inspiracional, é a **Comunidade do Figma** , uma ferramenta de design de interface do usuário. Muitos acabam postando seus projetos pessoais, além de grandes empresas apresentarem cases de seus sistemas de design. É uma ótima oportunidade de saber como é processo.

##### Passo 3: Definir categorias de cores

Este é o momento que pensamos quais serão as cores de textos, botões, fundos, cores interativas, desabilitados, como representar elevação, hierarquia e por aí vai. Mas calma lá, para te ajudar nessa parte mais mão na massa, eu desenvolvi uma fórmula que não é a fonte da verdade, muito menos está escrita em pedra, mas pode servir como um bela fonte de inspiração, então vamos lá.
A partir daqui, é interessante que você já tenha um cor em mente, aquela que deve ser a principal entre todas, a que representa seu produto e marca. Assim como quando cito o *“roxinho”* elogo vem o Nubank a nossa mente, precisamos definir qual será nosso *“roxinho”* , seja ele a cor que for. E então chegamos a primeira categoria.
**Cores primária e secundária**
Como dito anteriormente, a cor primária deve estar diretamente ligada a cor da marca, produto, instituição, ou remeter diretamente ao que você e os stakeholders envolvidos almejam. Para ilustrar todas as etapas juntos, seguimos com a cor terracota, visualmente ilustrada a seguir.
Press enter or click to view image in full size Cor primária
Podemos ter uma cor secundária que se aplica da mesma maneira, ficando como o próprio nome diz, abaixo da cor primária. Desta forma escalamos de maneira simples a quantidade de cores. Particularmente prefiro trabalhar com uma, no máximo duas cores que representam a marca.
Lembrando que não precisa ser a mesma cor do logotipo, até porque algumas vezes essa cor não é muito escalável, não havendo muitas vezes um bom contraste, mas não vamos pular etapas.
As cores primária e secundária terão maior destaque na interface, por botões, links e vão guiar o tom visual dê as demais cores, e frisarei isso, todas mesmo. Por isso essa etapa é bem importante.

#### Get Jean Fraga ’s stories in your inbox

Join Medium for free to get updates from this writer.
Remember me for faster sign in
**Cores de status de sistema**
Lembra quando falamos sobre o sinal de trânsito num exemplo anterior e como as cores tem um papel fundamental na compreensão das regras de trânsito? Em sistemas digitais isso não é diferente, por isso vamos resgatar esse conceito aqui. Sempre que uma pessoa usuária interagir com uma interface, ela espera que a mesma retorne se sua ação foi bem sucedida. É por isso que um dos fatores que somam a várias diretrizes de feedback são as cores, e aqui não tem muito mistério na hora da escolha. Continuando com nossos exemplos visuais a seguir estão três possibilidades de cores de feedback.
Press enter or click to view image in full size Cores de status de sistema
**Cores neutras ou escala de cinzas**
São os tons mais usados em quantidade. Títulos, parágrafos, fundos de página, cards e mais. Chamamos de cores neutras, por ficarem na escala de cinza, ou seja, do branco ao preto. Seguem mais exemplos dessa escala a seguir.
Press enter or click to view image in full size Cores neutras

##### Passo 4: Tornar acessível

Temos nossas cores escolhidas em suas categorias, chegou a hora de validar se o contraste entre elas está acessível. Para essa parte, também temos algumas diretrizes muito bem estabelecidas no mercado criadas e mantidas pela **W3C** (World Wide Web Consortium), uma organização internacional que desenvolve padrões para a web.
Um desses padrões é a famosa **WCAG** (Web Content Accessibility Guidelines), que são as Diretrizes de Acessibilidade para Conteúdo da Web. Elas definem uma série de orientações para tornar o conteúdo da web mais acessível a pessoas com deficiência, incluindo deficiências visuais, auditivas, físicas, cognitivas e neurológicas. Por sorte, temos esse conteúdo traduzido e disponibilizado pelo Marcelo Sales.
As diretrizes WCAG são organizadas em três níveis de conformidade (A, AA e AAA), com cada nível estabelecendo um conjunto de critérios que o conteúdo da web deve atender para ser considerado acessível. Alguns desses critérios incluem usar cores de maneira acessível.
Para a paleta que estamos construindo juntos nesse artigo, a fórmula para gerar cores eficientes seguirá um contraste mínimo (AA), com isso, estamos habilitados para a próxima e última etapa.

##### Passo 5: Gerar as variantes

Agora é aquele momento que nos aprofundamos mais sobre a tal fórmula que citei. Antes disso, vamos entender algumas partes técnicas, entre elas um modelo de cores utilizado para especificar as características de uma cor, o **HSL** , Matiz, Saturação e Luminosidade (em inglês, Hue, Saturation, Lightness).

* A Matiz (Hue) representa o tom da cor, ou seja, qual cor ela é;
* A Saturação (Saturation) representa a intensidade da cor, ou seja, o quão vibrante ou mais apagada ela é;
* A Luminosidade (Lightness) representa o brilho da cor, ou seja, quão clara ou escura ela é.
  Com base nessas informações, voltemos a nossa cor primária escolhida. Em um sistema de design é interessante usar quantidades ímpares de variações de uma cor, para termos uma referência que delimite as cores mais claras das escuras. Eu busco usar 3 ou 5 cores primárias/secundárias.
  Press enter or click to view image in full size Escala de cores primárias
  Pensando em escala de luz, a cor do “meio” deve estar no meio-termo, correto? Para isso a luminosidade da cor, seguindo o modelo HSL, deve estar na casa dos 50%. A partir disso, trabalhamos os saltos de maneira proporcional para obter um resultado agradável, acessível e que acolha as necessidades do produto. O gráfico a seguir, ilustra bem como está administrado a configuração dessa escala.
  Press enter or click to view image in full size Escala de luminosidade
  A quantidade de luz da variante mais clara deve ser mais alto que a segunda cor mais clara e assim por diante. Já a saturação, eu mantenho as duas extremidades em 100%, para assim tirarmos o maior contraste e percepção daquela cor, conforme o gráfico a seguir.
  Press enter or click to view image in full size Escala de saturação
  Esse processo pode ser repetido em todas as categorias de cores que listamos aqui. Seguindo esse método, é possível gerar cores eficientes e aderentes para seu Design System.
  Para conhecer mais de perto e ter acesso à fórmula, eu disponibilizei o **Jam Design Tokens kit** , um arquivo de Figma. Nele é possível testar na prática o grau de contraste entre as cores, ver todas as variantes prontas e de quebra, usar de esboço para os seus projetos. Trocando apenas o *Hue* da escala HSL é possível adicionar qualquer cor gerando uma nova paleta.
  Este arquivo faz parte de um projeto pessoal para contribuir com a comunidade de design. O Jam Design Tokens kit, traz além de cores, todos os estilos e componentes necessários para uso livre e gratuito por toda a comunidade de design. Para ter acesso ao Jam e outros conteúdos, acesse o **meu perfil na comunidade do Figma** .
  Se quiser saber mais sobre mim, realizar uma mentoria ou trocar uma ideia, estou disponível nos canais a seguir:
  **LinkedIn** | **ADPList** | **Twitter**

##### **Referências**

* A psicologia das cores de Eva Heller
* Cones e bastonetes: o que são, funções e diferenças de Lenscope
* Visibility of System Status (Usability Heuristic #1) de Nielsen Norman Group
* Figma Community
* W3C (World Wide Web Consortium)
* WCAG Guide (Web Content Accessibility Guidelines) de Marcelo Salles
* Colors HSL and HSLA de W3 Schools

##### Continue lendo

* Jam Design Tokens kit de Jean Fraga
  Design SystemsDesignColorsUI DesignUX Design

#### Published in UX Collective 🇧🇷

35K followers·Last published 1 day agoTextos para designers  —  que pensam e criam.

#### Written by Jean Fraga

5 followers·2 followingSenior Product Designer. Trabalho do discovery ao delivery com experiência em Design System & Ops e domínio em implementar e dar manutenção a produtos digitais.

#### No responses yet

Help
Status
About
Careers
Press
Blog
Privacy
Rules
Terms
Text to speech
