// Gerador dos 19 HTMLs da Rosie a partir do _template.html
// Uso: node _gerar-htmls.mjs
// Idempotente — pode rodar de novo sempre que o template ou o conteúdo mudarem.

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATE = readFileSync(join(__dirname, '_template.html'), 'utf8');

// Helpers ------------------------------------------------------------------
const p  = (t) => `<p style="margin:0 0 16px 0;">${t}</p>`;
const em = (t) => `<em>${t}</em>`;
const b  = (t) => `<strong>${t}</strong>`;
const br = '<br>';
const hr = '<hr style="border:0;border-top:1px solid #EBEBEB;margin:24px 0;">';
const li = (items) =>
  '<ul style="margin:0 0 16px 0;padding-left:20px;">' +
  items.map((x) => `<li style="margin-bottom:8px;">${x}</li>`).join('') +
  '</ul>';

// URL do logotipo: para preview local funcionar sem servidor, aponta pro asset relativo.
// No RD Station, substituir por URL absoluta (ex.: https://rosieiadoreyou.com.br/assets/logo-rosie.png).
const URL_LOGO = './assets/logo-rosie.png';

const render = (email) =>
  TEMPLATE
    .replaceAll('{{TITULO}}', email.subject_a)
    .replaceAll('{{PREVIEW}}', email.preview)
    .replaceAll('{{TITULO_H1}}', email.titulo_h1)
    .replaceAll('{{CORPO}}', email.corpo)
    .replaceAll('{{CTA_URL}}', email.cta_url)
    .replaceAll('{{CTA_TEXTO}}', email.cta_texto)
    .replaceAll('{{PS}}', email.ps)
    .replaceAll('{{URL_LOGO}}', URL_LOGO)
    .replaceAll('{{UNSUBSCRIBE_URL}}', '{{UNSUBSCRIBE}}')
    .replaceAll('{{PREFS_URL}}', '{{PREFERENCIAS}}');

// -------------------------------------------------------------------------
// 19 e-mails, na ordem canônica da nomenclatura
// -------------------------------------------------------------------------
const emails = [

  // FLUXO 1 — BOAS-VINDAS ---------------------------------------------------
  {
    file: 'rosie-01-boasvindas-01-hello.html',
    subject_a: 'Oi. Aqui é a Rosie.',
    preview: 'Nice to meet you. Uma promessa em uma peça.',
    titulo_h1: 'Oi. Aqui é a Rosie.',
    corpo:
      p(`Oi. Aqui é a Rosie. ${b('Nice to meet you.')}`) +
      p(`Nasci de uma incomodada bem simples: armário cheio e nada pra vestir. Peça bonita que amassava no primeiro uso, básico que desbotava na terceira lavagem, jeans que só servia dentro da loja. Cansei.`) +
      p(`Aí resolvi ser a roupa que eu queria vestir. Algodão Pima que amacia com o tempo. Denim premium que fica melhor a cada uso. Caimento pensado pra corpo real. Nada de tendência que morre em três meses.`) +
      p(`O que você vai receber de mim aqui é isso. ${b('Effortless chic')}, todos os dias. Peça pensada, história por trás, e às vezes uma dica de como usar. Sem enrolação, sem SAC robótico.`) +
      p(`Amanhã eu te conto uma coisa sobre a regata que quase não entrou na primeira coleção. Virou best-seller.`),
    cta_texto: 'Ver o que tem no armário',
    cta_url: '{{URL_HOME_LOJA}}',
    ps: p(`${b('P.S.')} Se você preferir só olhar por enquanto, tudo bem. Amanhã tem história.`),
  },

  {
    file: 'rosie-01-boasvindas-02-canelada.html',
    subject_a: 'A peça que quase ficou de fora',
    preview: 'história curta, moral no final',
    titulo_h1: 'A peça que quase ficou de fora',
    corpo:
      p(`Prometi ontem uma história. Cá está.`) +
      p(`Na primeira coleção, a canelada quase não entrou. Era simples demais. O ego de designer queria algo mais elaborado: detalhe, estampa, um "algo a mais". Alguém do time chegou a dizer: "básico ninguém compra."`) +
      p(`Deixei ela mesmo assim, um pouco por teimosia. Foi a primeira peça a esgotar.`) +
      p(`Aprendi ali que o que veste bem no dia a dia é o que a gente usa. O resto fica no cabide.`) +
      p(`A canelada continua aí, em cores novas. Algodão Pima, caimento pensado pra não marcar nem ficar solto demais, faz cinturinha sem apertar. É a peça-âncora do meu armário. A que resolve quando você não sabe o que vestir.`) +
      p(b('Simply Rosie.')),
    cta_texto: 'Conhecer a canelada',
    cta_url: '{{URL_PRODUTO_CANELADA}}',
    ps: p(`${b('P.S.')} Amanhã eu te mostro o jeans. Esse eu demorei um ano pra fechar.`),
  },

  {
    file: 'rosie-01-boasvindas-03-jeans.html',
    subject_a: 'Um ano só nesse jeans',
    preview: 'e por que ele resolve o resto do armário',
    titulo_h1: 'Um ano só nesse jeans',
    corpo:
      p(`O jeans da Rosie custa R$579. É a peça mais cara do meu armário. Levei um ano pra fechar essa modelagem, e não foi por perfeccionismo.`) +
      p(`Testei em corpo real. Em quem veste 36 e em quem veste 44. Refiz o quadril três vezes. A costura interna, duas. Mudei o bolso de trás de lugar pra valorizar em vez de achatar.`) +
      p(`Direto: se você já comprou jeans que apertava na cintura e sobrava na perna, ou que servia na loja e depois da primeira lavagem deixava de servir, é pra esse aqui que eu te chamo. ${b('Denim premium')} fica melhor a cada uso. Não pior.`) +
      p(`E ele resolve o resto do armário. Uma canelada com esse jeans é look. Uma camiseta branca com esse jeans é look. Um paetê com esse jeans é ${em('o')} look.`) +
      p(b('Wear it, dress it and be you.')),
    cta_texto: 'Ver os jeans',
    cta_url: '{{URL_COLECAO_JEANS}}',
    ps: p(`${b('P.S.')} Ainda tem dois e-mails nessa história. Amanhã eu te conto o que a gente faz quando a peça chega e não fica boa.`),
  },

  {
    file: 'rosie-01-boasvindas-04-troca.html',
    subject_a: 'Se não servir, a gente resolve',
    preview: 'sem stress, sem julgamento',
    titulo_h1: 'Se não servir, a gente resolve',
    corpo:
      p(`Compra online tem um medo real: e se não servir?`) +
      p(`Aqui na Rosie a troca é assim. Você abre o pacote, experimenta com calma, veste na frente do espelho. Se não ficou como você imaginou, chama a gente no WhatsApp. Sem formulário, sem "prezada cliente", sem sete dias úteis.`) +
      p(`A gente combina a troca por tamanho ou por outra peça. Se der pra resolver no mesmo pedido, resolve. Se precisar de reembolso, reembolsa. Sem stress.`) +
      p(`Isso é o que eu queria como cliente. Então é o que a gente faz.`) +
      p(`Duas coisas ajudam a acertar de primeira: cada ficha de produto tem a modelagem descrita (se veste no corpo, se é solta, onde marca), e o WhatsApp responde tira-dúvida ${b('antes')} de você comprar.`) +
      p(`${b('Effortless chic')} começa na hora de escolher. Não só depois que a peça chega.`),
    cta_texto: 'Explorar o armário',
    cta_url: '{{URL_HOME_LOJA}}',
    ps: p(`${b('P.S.')} Amanhã, o último dessa série. Deixei um mimo pequeno pra quem chegou até aqui.`),
  },

  {
    file: 'rosie-01-boasvindas-05-mimo.html',
    subject_a: 'Um mimo pra você',
    preview: 'por ter lido até aqui',
    titulo_h1: 'Um mimo pra você',
    corpo:
      p(`Você leu cinco e-mails meus nessa semana. Já é mais atenção do que a maioria dá pra uma marca. Obrigada.`) +
      p(`Como quem chega até aqui merece algo concreto: ${b('frete grátis na sua primeira compra')}, sem valor mínimo. Cupom <code style="background:#F8E3E8;padding:2px 8px;letter-spacing:0.1em;">PRIMEIRA</code> no checkout, vale por 7 dias.`) +
      p(`Uma sugestão de por onde começar: se você ainda não conhece a canelada, ela é o teste mais barato pra sentir a qualidade do algodão Pima. Se quiser ir direto na peça-âncora, o jeans resolve por anos.`) +
      p(`De qualquer forma, agora que a gente já se conhece um pouco, os próximos e-mails vão ser semanais. História curta, dica de look, às vezes uma peça nova. Nada de bombardeio.`) +
      p(b('Just for fun. Make it yours.')),
    cta_texto: 'Usar o cupom PRIMEIRA',
    cta_url: '{{URL_HOME_LOJA_COM_CUPOM}}',
    ps: p(`${b('P.S.')} Se você quiser me responder contando o que mais gosta de vestir, eu leio. Prometido.`),
  },

  // FLUXO 2 — NUTRIÇÃO SEMANAL ----------------------------------------------
  {
    file: 'rosie-02-nutricao-01-closet-enxuto.html',
    subject_a: 'O truque do closet enxuto',
    preview: 'o segredo é uma peça que multiplica',
    titulo_h1: 'O truque do closet enxuto',
    corpo:
      p(`Uma cliente perguntou essa semana como algumas mulheres sempre "montam look". Ela disse que abre o armário lotado dela e não sabe o que vestir. Enquanto isso, tem quem abra o próprio com um terço das peças e monte três looks por dia se precisar.`) +
      p(`A diferença não é ter mais roupa. É ter roupa que ${b('conversa')}.`) +
      p(`O jeans reto casa com a canelada, com a camiseta Pima, com o paetê num sábado à noite. A camiseta boxer branca é a peça neutra que salva qualquer combinação. Três peças bem escolhidas montam uma semana inteira.`) +
      p(`O que deixa mal é a peça bonita que fica só no cabide porque não combina com nada. Isso é dinheiro parado.`) +
      p(`Se você quiser começar o teu enxuto pelas coringas, essas três estão todas aqui no meu armário.`) +
      p(b('Always Rosie.')),
    cta_texto: 'Ver as três coringas',
    cta_url: '{{URL_COLECAO_CLASSICOS}}',
    ps: p(`${b('P.S.')} Semana que vem a história é sobre a peça mais estranha que eu já criei. Uso muito.`),
  },

  {
    file: 'rosie-02-nutricao-02-statement-neon.html',
    subject_a: 'A peça mais estranha que eu já criei',
    preview: 'e virou a peça que eu mais uso no verão',
    titulo_h1: 'A peça mais estranha que eu já criei',
    corpo:
      p(`Prometi essa história semana passada. Vamos lá.`) +
      p(`Quando desenhei o set neon (blusinha e short do mesmo tecido, cor que berra), o time olhou e disse: "ninguém vai comprar isso." A confecção torceu o nariz. Uma cliente-teste, mais educada, disse "diferente."`) +
      p(`Fabriquei mesmo assim. Cinquenta unidades. Achei que ia sobrar quarenta.`) +
      p(`Sobrou zero. Hoje o set neon é uma das peças que mais sai no verão. Uso completo, com jeans por cima, ou só o short com uma camiseta branca. A cor forte fez o serviço: virou statement sem precisar de esforço.`) +
      p(`Moral da história: ${b('statement item')} é aquilo que faz o look inteiro parar de pé sozinho. Você não precisa de dez. Precisa de um.`) +
      p(`Se não tem um statement no armário, é o que está faltando entre "vestida" e "montada".`) +
      p(b(`Peachy cheeks. That's the Rosie experience.`)),
    cta_texto: 'Ver os statements',
    cta_url: '{{URL_COLECAO_STATEMENT}}',
    ps: p(`${b('P.S.')} Se você quiser começar mais leve, o rosa velho da canelada também é statement. Só que sussurrado.`),
  },

  {
    file: 'rosie-02-nutricao-03-erro-so-basico.html',
    subject_a: 'O erro do "só básico"',
    preview: 'uma armadilha em que muita gente cai',
    titulo_h1: 'O erro do "só básico"',
    corpo:
      p(`Muita mulher cai naquela onda de "quero um armário todo básico, todo neutro, tudo combina com tudo."`) +
      p(`Fica três meses assim. Preto, cinza, off-white, denim. Só isso.`) +
      p(`Sabe o que acontece? Você começa a se olhar no espelho e achar que sumiu. Combina tudo, mas nada te representa. É armário de figurante. Não de você.`) +
      p(`O básico bem feito é a base. Mas base sem identidade é parede lisa. Uma peça de cor, um statement, um acessório que é só teu. É isso que muda a foto de "roupa que serve" pra "roupa que é minha".`) +
      p(`Não precisa ser drama. Um rosa velho, um dourado discreto, um paetê pontual. Uma peça só, no meio do preto e do denim, já muda o jogo.`) +
      p(`Se você anda meio invisível no próprio espelho, provavelmente não é a roupa. É a falta de uma.`) +
      p(b('Own your style.')),
    cta_texto: 'Ver as novidades',
    cta_url: '{{URL_COLECAO_NOVIDADES}}',
    ps: p(`${b('P.S.')} Semana que vem a história é sobre uma peça que eu aposentei. Doeu.`),
  },

  {
    file: 'rosie-02-nutricao-04-aposentei-peca.html',
    subject_a: 'Aposentei uma peça essa semana',
    preview: 'e o que eu aprendi doando ela',
    titulo_h1: 'Aposentei uma peça essa semana',
    corpo:
      p(`Doei uma peça essa semana. Um vestido amado três anos atrás e não usado há um ano e meio.`) +
      p(`Ficou no cabide todo esse tempo porque doía passar por ele e admitir. Não porque ficou feio. Porque a mulher que o vestia mudou.`) +
      p(`O que se veste com 28 não é o que se quer vestir com 31. Não é regressão, é ${b('edição')}.`) +
      p(`Aprendi uma coisa doando: armário não é museu. Se uma peça não entra no rodízio há mais de um ano, ela está ocupando espaço da peça que você usaria hoje. Sem drama, sem culpa. Doa. Vende. Passa adiante.`) +
      p(`O que entrou no lugar: uma camisa off-white de linho que sai três vezes por semana. Uma peça que fala com quem você é hoje.`) +
      p(`Se você tem um cabide travado assim, é sinal de que o armário quer conversar com você.`) +
      p(b('Live it, love it.')),
    cta_texto: 'Ver a coleção atual',
    cta_url: '{{URL_COLECAO_NOVIDADES}}',
    ps: p(`${b('P.S.')} Nenhuma peça Rosie tem prazo de validade curto. Mas suas mudanças, sim. Tudo bem.`),
  },

  // FLUXO 3 — CARRINHO ABANDONADO ------------------------------------------
  {
    file: 'rosie-03-carrinho-01-lembrete.html',
    subject_a: 'Você deixou uma coisa aqui',
    preview: 'não some, mas o estoque é limitado',
    titulo_h1: 'Você deixou uma coisa aqui',
    corpo:
      p(`Você deixou {{NOME_DA_PECA}} no carrinho. Só queria te avisar que ela ainda está aí.`) +
      p(`Compra online é assim mesmo. Você fecha a aba, vai fazer outra coisa, esquece. Ou trava numa dúvida pequena. Se for isso, me chama no WhatsApp que a gente responde rápido.`) +
      p(`O que você escolheu:`) +
      `<div style="background:#F8E3E8;padding:16px 20px;margin:0 0 16px 0;font-family:'DM Sans', Arial, Helvetica, sans-serif;">
         <strong>{{NOME_DA_PECA}}</strong> &middot; {{TAMANHO}} &middot; <strong>R$ {{PRECO}}</strong>
       </div>` +
      p(`Se quiser voltar de onde parou, o link aqui embaixo abre direto no seu carrinho.`) +
      p(`${b('Effortless chic')} também vale pro checkout.`),
    cta_texto: 'Voltar pro carrinho',
    cta_url: '{{URL_RETOMAR_CHECKOUT}}',
    ps:
      p(`${b('P.S.')} Dúvida de tamanho ou modelagem? Chama no WhatsApp: <a href="{{URL_WHATSAPP}}">clica aqui</a>. A gente responde antes de você fechar.`),
  },

  {
    file: 'rosie-03-carrinho-02-provasocial.html',
    subject_a: 'Deixa eu te contar quem já tem essa peça',
    preview: 'e o que eu queria te falar antes de você decidir',
    titulo_h1: 'Deixa eu te contar quem já tem essa peça',
    corpo:
      p(`Sobre a {{NOME_DA_PECA}} que ficou no seu carrinho.`) +
      p(`Semana passada uma cliente, Renata, mandou uma foto vestindo ela. Escreveu: "achei que ia ser só mais uma regata, mas essa é a única que eu não tiro nem pra dormir." Não é depoimento fabricado. É a mensagem que ela mandou. A gente guardou o print.`) +
      p(`Duas coisas honestas:`) +
      p(`O tamanho que você escolheu, ${b('{{TAMANHO}}')}, tem ${b('{{ESTOQUE}} peças')} em estoque agora. Não é escassez inventada por contador falso. É o estoque real da confecção. Quando essa cor de {{TAMANHO}} acaba, a próxima leva demora 15 a 20 dias pra voltar.`) +
      p(`Se você estava esperando um sinal, aqui vai um: <em>[PERSONA_VALIDAR: Aletheia/Emporos inserir sentimento validado sobre uso]</em>.`) +
      p(`O carrinho continua aberto.`),
    cta_texto: 'Fechar o pedido',
    cta_url: '{{URL_RETOMAR_CHECKOUT}}',
    ps: p(`${b('P.S.')} Se você quiser trocar de tamanho antes de fechar, o WhatsApp é o caminho mais rápido: <a href="{{URL_WHATSAPP}}">clica aqui</a>.`),
  },

  {
    file: 'rosie-03-carrinho-03-fretegratis.html',
    subject_a: 'Última coisa que eu queria te dizer',
    preview: 'um empurrão pequeno, sem drama',
    titulo_h1: 'Última coisa que eu queria te dizer',
    corpo:
      p(`Terceira e última vez que eu escrevo sobre essa peça no seu carrinho. Prometido.`) +
      p(`Se o que travou foi o frete, deixa eu resolver isso. ${b('Frete grátis nesse pedido')}, mesmo abaixo dos R$400. Cupom <code style="background:#F8E3E8;padding:2px 8px;letter-spacing:0.1em;">SEUFRETE</code> no checkout, vale por 48h.`) +
      p(`Se o que travou foi outra coisa (tamanho, cor, se combina com o que você tem), me responde esse e-mail contando. A gente lê e responde, prometido. Compra online só funciona quando a dúvida some.`) +
      p(`Se você decidiu que não é agora, tudo bem também. Sem mágoa. A gente se fala nos próximos e-mails da lista.`),
    cta_texto: 'Usar SEUFRETE no carrinho',
    cta_url: '{{URL_RETOMAR_CHECKOUT_CUPOM}}',
    ps: p(`${b('P.S.')} Se depois de 48h você mudar de ideia, o cupom já era. Mas a peça, se ainda tiver, continua sua pra pegar.`),
  },

  // FLUXO 4 — PÓS-COMPRA ---------------------------------------------------
  {
    file: 'rosie-04-poscompra-01-confirmacao.html',
    subject_a: 'Recebi o seu pedido',
    preview: 'e uma coisa que eu queria te dizer',
    titulo_h1: 'Recebi o seu pedido',
    corpo:
      p(`Obrigada. Seu pedido chegou aqui.`) +
      p(`Sei que isso soa clichê, mas cada pedido é lido pessoalmente. Cada nome, cada peça, cada endereço. É a parte do dia que eu mais gosto.`) +
      p(`O que você levou:`) +
      `<div style="background:#F8E3E8;padding:16px 20px;margin:0 0 16px 0;font-family:'DM Sans', Arial, Helvetica, sans-serif;">
         {{RESUMO_DO_PEDIDO}}
         <br><br>
         <strong>Total:</strong> R$ {{VALOR}}<br>
         <strong>Entrega para:</strong> {{ENDERECO_CURTO}}
       </div>` +
      p(`A gente separa hoje ou amanhã, dependendo da hora que você fechou o pedido. Assim que sair da confecção, você recebe o código de rastreio nesse mesmo e-mail. O prazo pra {{CIDADE}} costuma ficar entre {{X}} e {{Y}} dias úteis.`) +
      p(`Enquanto isso chega, mais alguns e-mails meus vão passar por aqui. Um sobre como cuidar da peça pra ela durar, outro convidando você a mandar foto. Sem venda no meio, prometido.`),
    cta_texto: 'Acompanhar meu pedido',
    cta_url: '{{URL_STATUS_PEDIDO}}',
    ps: p(`${b('P.S.')} Qualquer coisa antes da entrega, WhatsApp: <a href="{{URL_WHATSAPP}}">clica aqui</a>.`),
  },

  {
    file: 'rosie-04-poscompra-02-cuidados.html',
    subject_a: 'Antes de você abrir o pacote',
    preview: 'duas coisas simples, e a segunda importa mais',
    titulo_h1: 'Antes de você abrir o pacote',
    corpo:
      p(`Duas coisas pra quando o pacote chegar.`) +
      p(`${b('Primeira:')} o cheiro. Pode ter um leve cheiro de tecido novo. É o algodão fresco da confecção, não é perfume. Some com a primeira ventilada.`) +
      p(`${b('Segunda, que é a que importa:')} a lavagem. Minhas peças são feitas pra durar, mas duram muito mais se você lavar do jeito certo.`) +
      li([
        `${b('Regata e camiseta Pima:')} água fria, do avesso, sem torcer. Secar na sombra. Só isso já dobra a vida útil.`,
        `${b('Jeans:')} lavar o mínimo possível. Não é frescura, é o que o denim premium pede. Duas ou três vezes por ano, água fria, ao contrário. Ele fica melhor com o tempo, tipo bota de couro.`,
        `${b('Statement (paetê):')} lavar à mão, com sabão neutro, sem torcer. Deitar numa toalha pra secar.`,
      ]) +
      p(`Ficha completa de cuidados em cada etiqueta, também. Deixei aqui em cima porque a maioria não lê etiqueta.`) +
      p(b(`Sinta o frescor. Rosie's essence, pure & eternal.`)),
    cta_texto: 'Guia completo de cuidados',
    cta_url: '{{URL_GUIA_CUIDADOS}}',
    ps: p(`${b('P.S.')} Amanhã ou depois eu passo aqui de novo pra pedir uma coisa. Não é dinheiro.`),
  },

  {
    file: 'rosie-04-poscompra-03-ugc.html',
    subject_a: 'Me manda uma foto?',
    preview: 'e o que eu faço com ela',
    titulo_h1: 'Me manda uma foto?',
    corpo:
      p(`Se a peça já chegou e você já vestiu, eu queria pedir uma coisa.`) +
      p(`Me manda uma foto. Não precisa ser produzida. Espelho do banheiro serve. Selfie de saída pro trabalho serve. Foto de amiga tirando enquanto você almoça serve.`) +
      p(`Duas vias:`) +
      li([
        `${b('Responder esse e-mail')} com a foto anexada. A gente vê.`,
        `${b('Postar no Instagram')} marcando <code style="background:#F8E3E8;padding:2px 6px;">@rosieiadoreyou</code>. A gente reposta no perfil (com sua permissão antes).`,
      ]) +
      p(`O motivo é honesto: a Rosie não faz campanha com modelo profissional. As fotos das clientes reais são a única "campanha" que tem cara de gente de verdade. É o que faz outra mulher ler o e-mail e pensar "ah, então serve em mulher normal também".`) +
      p(`Se você não quiser mandar, tudo bem. Não é obrigação e não te tira da lista.`),
    cta_texto: 'Marcar no Instagram',
    cta_url: '{{URL_INSTAGRAM_ROSIE}}',
    ps: p(`${b('P.S.')} Se você quiser me contar o que achou por escrito, também vale. A gente lê.`),
  },

  {
    file: 'rosie-04-poscompra-04-crosssell.html',
    subject_a: 'Uma peça que combina com o que você já pegou',
    preview: 'escolhida a dedo, não é lista aleatória',
    titulo_h1: 'Uma peça que combina com o que você já pegou',
    corpo:
      p(`Passaram três semanas desde que você levou {{PECA_COMPRADA}}. Espero que ela já esteja no rodízio da semana.`) +
      p(`Uma coisa que eu penso quando alguém leva uma peça específica: o que fecharia essa combinação sem virar armário lotado?`) +
      li([
        `Se você levou uma ${b('regata canelada')}, o par natural é a ${b('calça reta jeans premium')} (denim que fica melhor com o uso, look completo com a canelada em minutos).`,
        `Se você levou o ${b('jeans premium')}, o par que multiplica é a ${b('camiseta boxer Pima branca')} (a peça neutra que salva combinação).`,
        `Se você levou uma ${b('peça statement (paetê/neon)')}, o par que reduz esforço é a ${b('canelada preta')} (base neutra que deixa o statement brilhar).`,
      ]) +
      p(`Não é regra. É sugestão de quem escolheu as duas peças pensando na mesma mulher.`) +
      p(b('Peças que falam com você. Own your style.')),
    cta_texto: 'Ver a sugestão pro meu pedido',
    cta_url: '{{URL_PRODUTO_COMPLEMENTAR}}',
    ps: p(`${b('P.S.')} Se você comprar de novo agora, o frete grátis a partir de R$400 continua rodando. Não é cupom novo, é a política de sempre.`),
  },

  // FLUXO 5 — WINBACK ------------------------------------------------------
  {
    file: 'rosie-05-winback-01-sumiu.html',
    subject_a: 'Sumiu ou eu que estou chata?',
    preview: 'pergunta honesta, uma resposta simples',
    titulo_h1: 'Sumiu ou eu que estou chata?',
    corpo:
      p(`Faz um tempo que você não abre um e-mail meu. Eu percebi.`) +
      p(`Não estou brava. Sei que caixa de entrada é bagunçada, sei que a gente segue marca sem lembrar por quê. Você pode ter entrado na lista há muito tempo, ganho um cupom e nunca mais olhado. Acontece.`) +
      p(`Só quero saber duas coisas:`) +
      li([
        `Você ainda quer receber e-mail meu? Se sim, é só clicar no botão aqui embaixo. Sinaliza pra mim que faz sentido continuar.`,
        `Se não quer, também tá bom. Nesse caso, pode ignorar esse e-mail. Nos próximos 15 dias eu paro de aparecer aqui e você não precisa fazer nada.`,
      ]) +
      p(`Sem drama, sem "última chance", sem gatilho falso.`),
    cta_texto: 'Continuo na lista da Rosie',
    cta_url: '{{URL_REENGAJAMENTO}}',
    ps: p(`${b('P.S.')} Se você quiser me contar o que aconteceu (comprou e não gostou? mudou de estilo? só cansou de e-mail?), me responde. É útil pra mim.`),
  },

  {
    file: 'rosie-05-winback-02-o-que-mudou.html',
    subject_a: 'O que aconteceu na Rosie desde que você sumiu',
    preview: 'três coisas concretas, e uma delas te interessa',
    titulo_h1: 'O que aconteceu na Rosie desde que você sumiu',
    corpo:
      p(`Se você não abriu o e-mail passado, tudo bem. Vou tentar de outro jeito.`) +
      p(`Se faz um tempo que você não olha pra Rosie, três coisas mudaram e talvez te interessem:`) +
      p(`${b('A linha jeans premium.')} Denim que fica melhor a cada uso, modelagem testada em corpo real, três lavagens (nu, médio, escuro). É a peça-âncora do armário pra quem quer parar de comprar jeans todo ano.`) +
      p(`${b('A canelada em cores novas.')} A regata que era só preta e branca agora tem verde-oliva, marrom-terra e um rosa velho que sumiu em uma semana da primeira leva.`) +
      p(`${b('Frete grátis a partir de R$400.')} Que é o valor de uma cesta razoável: uma calça e uma camiseta, ou duas caneladas com um acessório. Se você prefere comprar um combo por trimestre em vez de peça avulsa toda semana, essa política favorece você.`) +
      p(`Se qualquer uma dessas coisas mexeu alguma coisa em você, o link aqui embaixo abre direto no meu armário.`),
    cta_texto: 'Dar uma olhada no armário',
    cta_url: '{{URL_HOME_LOJA}}',
    ps: p(`${b('P.S.')} Se você não abriu esse também, o próximo é o último. Prometido.`),
  },

  {
    file: 'rosie-05-winback-03-ultima-chamada.html',
    subject_a: 'Último e-mail meu',
    preview: 'sem culpa, sem drama, só honestidade',
    titulo_h1: 'Último e-mail meu',
    corpo:
      p(`Esse é o último e-mail que eu te mando.`) +
      p(`Não é ameaça, é limpeza de casa. Se você não abre há dois meses, faz mais sentido eu parar de chegar aqui do que insistir. Sua caixa de entrada agradece, e minha lista fica com quem realmente quer estar.`) +
      p(`Duas opções:`) +
      p(`${b('Se você quer continuar recebendo:')} clica em "quero ficar" aqui embaixo. Volta pra lista ativa, sem perder nada.`) +
      p(`${b('Se você não quer:')} não precisa fazer nada. A partir de amanhã, você para de receber e-mail meu. Se um dia mudar de ideia, pode voltar a se cadastrar no site.`) +
      p(`Sem culpa, sem "não perca", sem gatilho vazio.`),
    cta_texto: 'Quero ficar na lista',
    cta_url: '{{URL_REENGAJAMENTO}}',
    ps: p(`${b('P.S.')} Se você virou cliente Rosie e continua comprando de vez em quando mesmo sem abrir e-mail, obrigada. Não precisa fazer nada aqui.`),
  },
];

// -------------------------------------------------------------------------
// Renderiza e escreve
// -------------------------------------------------------------------------
let count = 0;
for (const email of emails) {
  const html = render(email);
  writeFileSync(join(__dirname, email.file), html, 'utf8');
  count++;
  console.log(`  ✓ ${email.file}`);
}
console.log(`\nGerados ${count} HTMLs em ${__dirname}`);
