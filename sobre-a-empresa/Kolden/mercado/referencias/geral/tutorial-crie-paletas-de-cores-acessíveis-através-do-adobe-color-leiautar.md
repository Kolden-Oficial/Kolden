---
id_fonte: "312ba351-430d-48c9-9986-eba21f5419c4"
notebook_id: "1eb3e160-2c74-42dc-aff2-9b95a5fb44c6"
notebook_titulo: "Kolden"
titulo: "Tutorial: Crie paletas de cores acessíveis através do Adobe Color - Leiautar"
tipo: "unknown"
url_original: "https://leiautar.com.br/tutorial-crie-paletas-de-cores-acessiveis-atraves-do-adobe-color/"
keywords: "('Accessible color palettes', 'Adobe Color tools', 'WCAG guidelines', 'Color contrast validation', 'Color blind safety')"
summary: "This guide details how to use **Adobe Color** to implement **accessible design** by following international standards known as the **WCAG**. The author emphasizes that visual contrast can be deceptive, requiring designers to validate their work to ensure it is **perceptible, operable, understandable, and robust** for all users. The process involves two primary stages: ensuring a palette is **safe for colorblind individuals** so that information remains distinct, and using a **contrast checker** to verify that text is legible against its background. Ultimately, the text advocates for **inclusive design** as a fundamental professional practice that guarantees digital content remains usable regardless of a person's physical abilities."
extraido_em: "2026-06-30T16:16:52Z"
extraido_por: "notebooklm-py-0.7.3"
area: mercado
up: "[[sobre-a-empresa/Kolden/mercado/_MOC-mercado]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/mercado/referencias/geral/_indice|_indice]]"
---

# Tutorial: Crie paletas de cores acessíveis através do Adobe Color - Leiautar

Pular para o conteúdo

* Search Lista de espera Search acessibilidade, conhecimento, cores, design, inclusão, tutorial

### Tutorial: Crie paletas de cores acessíveis através do Adobe Color

Aprenda como tornar a sua paleta de cores acessível para a maior quantidade de pessoas através da ferramenta de acessibilidade do Adobe Color.

* Itamara Ferreira
* 17 de novembro de 2021
  Ao criar uma paleta de cores sempre fica aquela dúvida de quais cores podem se sobrepor adequadamente obedecendo os critérios de acessibilidade.
  Muitas vezes os nossos olhos podem nos enganar, algumas cores que julgamos terem bom contraste podem ter notas baixíssimas na WCAG, por isso é importante que utilizemos ferramentas adequadas para validar a acessibilidade.
  "Acessibilidade na web é tornar todos os serviços, assuntos e publicações tão fáceis de serem utilizados por todas as pessoas que até esqueceremos que há diferenças."
  Carla Nascimento

#### O que é a WCAG

Segundo o UX Marcelo Sales, “WCAG são diretrizes e recomendações organizadas e mantidas pelo W3C que fundamentam a construção de conteúdos digitais com qualidade e acessíveis a qualquer pessoa independentemente de sua deficiência e/ou habilidade.”
A WCAG possui 4 princípios básicos. P ara que todos possam consumir seu design sem dificuldades, ele deve ser:

* Perceptível;
* Operável;
* Compreensível;
* Robusto.
  Um conteúdo **perceptível** é aquele que pode ser percebido pelo usuário. Ou seja, que pode ser consumido de fato.
  Um conteúdo **operável** é aquele que pode ser acessado por diferentes meios e que permite que o usuário controle o tempo de consumo das informações.
  A **compreensão** está intimamente ligada ao princípio da percepção. O que não é percebido não é compreendido. Um conteúdo compreensível também deve possuir níveis de linguagens adequados para cada público.
  O conteúdo deve ser estruturado de forma **robusta** para que possa ser interpretado por uma larga gama de atores, incluindo as tecnologias assistivas. Ele deve procurar maximizar a compatibilidade.

#### Como validar uma paleta de cores

Nesse artigo nós vamos ensinar como validar a paleta de cores em duas etapas: cores apropriadas para daltônicos e verificador de contraste.
A primeira diz respeito ao conflito entre as cores de uma paleta e no quanto elas são seguras para daltônicos, já a segunda etapa é para nos dar certeza se a sobreposição das cores é adequada e tem boa visibilidade. Ambas serão feitas através da ferramenta de acessibilidade do Adobe Color.

#### 1ª etapa: Temas seguros para daltônicos

Ao contrário do que muitos pensam, paleta de cores acessíveis não farão com que daltônicos vejam as mesmas cores que pessoas sem a deficiência.
A ideia é a seguinte: se o seu design original requer que cada usuário perceba cinco cores diferentes, então é preciso que todas as cinco cores sejam vistas de maneiras diferentes. Isso é o que significa ter um tema seguro para daltônicos.

#### ➔ Passo 1: Crie a paleta de cores no Adobe Color

Abra o site do Adobe Color e crie uma paleta de cores.
Você pode criar uma paleta original, extrair de uma imagem, tema ou simplesmente inserir o código hexadecimal direto na ferramenta.

#### ➔ Passo 2: Paleta apropriada para daltônicos

Acesse a guia “Ferramentas de acessibilidade” e, em seguida, na parte esquerda da tela, selecione a opção “Apropriado para daltônicos”.
Essa ferramenta irá identificar se existe conflito para daltônicos entre as cores escolhidas. Os conflitos serão sinalizados com um traço branco em cima das cores e também descrito no texto ao lado da roda de cores como “possíveis conflitos” (para indicar que alguém que possua apenas um leve grau de daltonismo pode não ter problemas ao visualizar as cores).

#### ➔ Passo 3: Ajuste as cores

Você deve ajustar as cores até que o traço branco suma. Para isso você pode mover as amostras de cores dentro da própria roda de cores.
Assim que o conflito for resolvido a ferramenta irá mostrar uma mensagem de sucesso dizendo que as amostras são apropriadas para daltônicos.

#### 2ª etapa: Verificando o contraste de cores

Nessa etapa iremos identificar quais cores poderão ser sobrepostas umas às outras obedecendo aos critérios de acessibilidade.

#### ➔ Passo 1: Verificador de contraste

Ainda dentro da guia “Ferramentas de acessibilidade” escolha a opção “Verificador de contraste” na parte esquerda da tela.
Repare que irá aparecer uma caixa de seleção escrito “WCAG versão 2.1”, vamos entender o que são essas opções.
Na WCAG existem alguns critérios de sucesso e para cada um desses critérios são utilizados níveis de conformidade (uma espécie de “nota”):

* A (o mais baixo);
* AA (o mínimo requerido nesse caso);
* AAA (o mais elevado).
  Deixe selecionada a opção “AA” e seguimos para o próximo passo.

#### ➔ Passo 2: Definindo cor de fundo e de texto

Copie e cole o hexadecimal da cor de fundo e dar cor de texto que deseja testar.
Após inserir o código irá aparecer uma nota no canto direito da tela, que é a proporção de contraste.
Logo abaixo irá aparecer algumas telas indicando se cada uma das opções “texto normal, texto grande e componentes gráficos” possuem contraste adequado.
Nesse caso todos os contrastes tiveram sucesso.

#### ➔ Passo 3: Caso o contraste seja reprovado

Caso a sua sobreposição de cores não seja adequada ela irá aparecer da seguinte maneira:
Ao lado da “nota” baixa estará o ícone de reprovação e, abaixo de cada quadro, estarão as descrições do que teve sucesso ou não.
O próprio site do Adobe Color te oferece algumas opções de ajuste de contraste.
No painel que aparecerá no lado direito da tela você poderá visualizar as sugestões de contraste feitas pela própria ferramenta. Caso você concorde com alguma delas é só clicar em “aplicar” e esta será feita automaticamente.

#### ➔ Passo 4: Determinando bons contrastes

Uma paleta de cores não precisa sem 100% contrastante (isso seria inaplicável). Não é porque algumas cores não possuem bons níveis que contraste que você deva tirá-las do seu projeto.
A validação de contraste serve para que você, como designer, tenha consciência de quais cores poderá sobrepor com segurança priorizando a acessibilidade de cada uma delas.
Uma boa alternativa é entregar junto com o manual de identidade do seu cliente um mapa de quais cores funcionam sobrepostas. Dessa forma você terá a certeza de que seu cliente estará fazendo um bom trabalho com o projeto desenvolvido.

#### Módulo gratuito sobre Design Inclusivo

Lembrando que acessibilidade não é apenas sobre cores. Existe um universo inteiro no qual precisamos pensar, agir e abrir diálogo para tornar a informação mais acessível.
O Leiautar possui um módulo inteiro sobre Design Inclusivo. Ele foi feito em conjunto com dois especialistas em acessibilidade e está disponível gratuitamente para toda a comunidade.
Para acessar o módulo **Design Inclusivo** é só clicar Aqui.
Referências:

* <https://guia-wcag.com/>
* <https://clubedoportugues.com.br/4-diretrizes-para-tornar-seu-conteudo-totalmente-acessivel/>
* <https://helpx.adobe.com/br/creative-cloud/adobe-color-accessibility-tools.html>

###### Curtiu o post? Compartilhe nas suas redes sociais: Itamara Ferreira

#### Designer, criadora do Leiautar e especialista em diálogos delirantes. Adora ouvir pessoas apaixonadas pelo que fazem e acredita que o design está em tudo e é para todos. Deixar uma respostaCancelar resposta

###### Você também poderá gostar de:

##### Por que os médicos usam verde no centro cirúrgico

##### A importância de incluir o cliente no processo criativo

##### Cursos de design gráfico online

O Leiautar ajuda designers a pensarem como profissionais de verdade. Se você curte botar a cachola para funcionar, esperamos que aproveite os nossos conteúdos e iniciativas 🙂

#### Como o Leiautar pode te ajudar

* ➔ Ferramentas de design
* ➔ Curso de Design
* ➔ Blog

#### Posts recentes

* Por que os médicos usam verde no centro cirúrgico
* A importância de incluir o cliente no processo criativo
* Cursos de design gráfico online
  Instagram LinkedIn Email YouTube Spotify © 2026 Leiautar® - Todos os direitos reservados
