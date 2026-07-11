---
id: rosie-dossie-tecnico-fluxos-email
titulo: "Rosie — 5 Fluxos de E-mail (Boas-vindas, Nutrição, Carrinho, Pós-compra, Winback) — v2"
resumo: "Sequências completas de e-mail para a operação Rosie: 5 fluxos, 19 e-mails completos, cada um com gatilho RD Station, timing, assunto A/B, preview, corpo, CTA e especialista dono. Voz Catarina Tourinho, tom effortless chic, passado pelo de-slop. v2 preparada para embed clicável no slide 4 do deck v2."
categoria: projeto
palavras-chave: [rosie, email-marketing, caliope, fluxos, rd-station, boas-vindas, carrinho-abandonado, pos-compra, winback, nutricao]
status: v2
atualizado-em: 2026-07-01
autor: "Squad Caliope — orquestrado por copy-chief (Cyrus)"
especialistas: [andre-chaperon, ben-settle, ry-schwartz, russell-brunson, todd-brown]
relacionados: [../../alinhamento.md, ../../pesquisa/03-persona-icp.md, ../../pesquisa/04-tom-de-voz.md]
contrato: "Olimpo/contratos/missoes/m-20260701-112935-rosie-90d.yaml"
tipo: projeto
projeto: rosie
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/rosie/apresentacao-bruno-2026-07-01/README|README]]"
---

# 5 Fluxos de E-mail — Operação Rosie

> **v2 — 2026-07-01 — expandido para embed clicável no slide 4 do deck v2 (RD Station como ferramenta de disparo).**
>
> **Contexto:** ~5.5k contatos engajados no RD Station (após limpeza), AOV inferido ~R$250,
> frete grátis a partir de R$400. Voz oficial: Catarina Tourinho ("cat"), tom effortless chic —
> amiga estilosa, nunca varejo. Persona não validada por Mom Test — dores específicas são
> tratadas como `[PERSONA_VALIDAR]` até o retorno da Aletheia/Emporos.
>
> **Ferramenta de disparo:** RD Station Marketing (gatilhos, segmentações, cadências e tokens dinâmicos).
> Todos os fluxos foram desenhados para os objetos nativos do RD Station (leads, tags, eventos, listas
> segmentadas por comportamento).
>
> **Regra de execução:** todos os corpos passaram pela skill `de-slop` antes desta entrega.
> Sem "vamos", "juntos", "descubra", "não perca", sem em-dash performático, sem "imperdível".
> Voz humana, PT-BR coloquial elevado. Cada e-mail assinado xo, cat.

---

## Fluxo 1 — Boas-vindas (5 e-mails, D+0 → D+4)

**Especialista líder:** Andre Chaperon (Soap Opera Sequence).
**Camada de psicologia:** Blair Warren (validação de identidade — "eu sou uma mulher que sabe se vestir") + Robert Cialdini (reciprocidade no fecho).
**Objetivo:** apresentar Catarina + Rosie + o mundo effortless chic. Converter a nova assinante em compradora dentro da 1ª semana, sem forçar. Cada e-mail fecha um loop e abre o próximo.

### E-mail 1.1 — "Oi, sou a Catarina"

| Campo | Conteúdo |
|---|---|
| **Gatilho (RD Station)** | Conversão no formulário do site ou opt-in de lead magnet (evento `Novo lead — Rosie site`) |
| **Dia / Hora** | D+0, 15 minutos após o cadastro |
| **Assunto A** | Oi, aqui é a Cat |
| **Assunto B** | Bem-vinda ao meu armário |
| **Preview** | uma promessa, e ela cabe em uma peça |
| **Dono** | Andre Chaperon |

**Corpo:**

Oi, prazer. Sou a Catarina, a cat que assina os e-mails da Rosie.

A Rosie nasceu de uma incomodada minha. Eu tinha um armário cheio e nada para vestir. Peça bonita que amassava no primeiro uso, básico que desbotava na terceira lavagem, jeans que servia só na loja. Cansei.

Comecei a fazer roupa do jeito que eu queria vestir: algodão Pima que amacia com o tempo, denim premium que fica melhor a cada uso, caimento pensado para o corpo real. Nada de tendência que morre em três meses.

O que você vai receber de mim aqui na sua caixa de entrada é isso. Peça pensada, história por trás, e às vezes uma dica de como usar. Sem enrolação.

Amanhã eu te conto uma coisa sobre a regata que quase não entrou na primeira coleção. Ela virou best-seller.

xo, cat

**CTA principal:** Ver o que tem na loja agora → [link para home da loja]
**P.S.:** Se preferir só olhar por enquanto, tudo bem. Amanhã tem história.

---

### E-mail 1.2 — "A regata que quase não entrou"

| Campo | Conteúdo |
|---|---|
| **Gatilho (RD Station)** | 24h após o e-mail 1.1 (timer no fluxo de automação) |
| **Dia / Hora** | D+1, 10h |
| **Assunto A** | A peça que quase ficou de fora |
| **Assunto B** | Quase joguei essa fora |
| **Preview** | história curta, moral no final |
| **Dono** | Andre Chaperon |

**Corpo:**

Prometi ontem uma história. Cá está.

Quando montei a primeira coleção, a regata canelada quase não entrou. Era simples demais. Meu ego de designer queria algo mais elaborado, com detalhe, com estampa. Um assessor me disse: "básico ninguém compra."

Deixei ela na coleção mesmo assim, um pouco por teimosia. Foi a primeira peça a esgotar.

O que eu aprendi: o que veste bem no dia a dia é o que a gente usa. O resto fica no cabide.

A regata canelada continua ali, em cores novas. Algodão Pima, caimento pensado para não marcar nem ficar solto demais, faz cinturinha sem apertar. É a que eu uso quando não sei o que usar.

xo, cat

**CTA principal:** Conhecer a canelada → [link para produto regata canelada]
**P.S.:** Amanhã eu te mostro o jeans. Esse eu demorei um ano para fechar.

---

### E-mail 1.3 — "O jeans que demorou um ano"

| Campo | Conteúdo |
|---|---|
| **Gatilho (RD Station)** | 24h após o e-mail 1.2 |
| **Dia / Hora** | D+2, 10h |
| **Assunto A** | Um ano só nesse jeans |
| **Assunto B** | Por que o jeans é o mais caro |
| **Preview** | e por que ele resolve o resto do armário |
| **Dono** | Andre Chaperon + Blair Warren |

**Corpo:**

O jeans da Rosie custa R$579. É a peça mais cara da loja. Eu demorei um ano para fechar essa modelagem.

Testei em corpo real. Testei em mim, testei em uma amiga que veste 36 e outra que veste 44. Refiz o quadril três vezes. A costura interna foi refeita duas. O bolso de trás mudou de posição para valorizar em vez de achatar.

Vou ser direta: se você já comprou jeans que apertava na cintura e sobrava na perna, ou que servia na loja e depois de lavar deixava de servir, é para isso que esse aqui existe. É denim premium que fica melhor a cada uso, não pior.

Ele resolve o resto do armário. Uma regata simples com esse jeans é look. Uma camiseta branca com esse jeans é look. Um paetê com esse jeans é o look.

xo, cat

**CTA principal:** Ver os jeans → [link para coleção jeans]
**P.S.:** Ainda tem dois e-mails nessa história. Amanhã eu te conto o que a gente faz quando você recebe uma peça e não fica bom.

---

### E-mail 1.4 — "Se não ficar bom, a gente troca"

| Campo | Conteúdo |
|---|---|
| **Gatilho (RD Station)** | 24h após o e-mail 1.3 |
| **Dia / Hora** | D+3, 10h |
| **Assunto A** | Se não servir, a gente resolve |
| **Assunto B** | Como funciona a troca da Rosie |
| **Preview** | sem burocracia, sem julgamento |
| **Dono** | Andre Chaperon + Blair Warren |

**Corpo:**

Compra online tem um medo real: e se não servir?

Aqui na Rosie a troca é assim. Você abre o pacote, experimenta com calma, veste na frente do espelho. Se não ficou como você imaginou, chama a gente no WhatsApp. Sem formulário, sem "prezada cliente", sem sete dias úteis.

A gente combina a troca por tamanho ou por outra peça. Se der para resolver no mesmo pedido, resolve. Se precisar de reembolso, reembolsa.

Isso é o que eu queria como cliente. Então é o que a gente faz.

Duas coisas que ajudam a acertar de primeira: cada ficha de produto tem a modelagem descrita (se veste no corpo, se é solta, onde marca), e o WhatsApp responde tira-dúvida antes de você comprar. Uso a mesma mulher que atende eu mesma.

xo, cat

**CTA principal:** Explorar a loja com tranquilidade → [link para home da loja]
**P.S.:** Amanhã, o último dessa série. Deixei um mimo pequeno para quem chegou até aqui.

---

### E-mail 1.5 — "Um mimo (e o que vem depois)"

| Campo | Conteúdo |
|---|---|
| **Gatilho (RD Station)** | 24h após o e-mail 1.4 |
| **Dia / Hora** | D+4, 10h |
| **Assunto A** | Um mimo pra você |
| **Assunto B** | Frete grátis na sua primeira |
| **Preview** | por ter lido até aqui |
| **Dono** | Andre Chaperon + Robert Cialdini (reciprocidade) |

**Corpo:**

Você leu cinco e-mails meus nessa semana. Já é mais atenção do que a maioria dá para uma marca. Obrigada.

Como quem chegou até aqui merece algo concreto: **frete grátis na sua primeira compra**, sem valor mínimo. Cupom `PRIMEIRA` no checkout, vale por 7 dias.

Uma sugestão de por onde começar: se você ainda não conhece a nossa canelada, ela é o teste mais barato para sentir a qualidade do algodão Pima. Se quiser ir direto na peça-chave, o jeans resolve por anos.

De qualquer forma, agora que você já me conhece um pouco, os próximos e-mails vão ser semanais. História curta, dica de look, às vezes uma peça nova. Nada de bombardeio.

xo, cat

**CTA principal:** Usar o cupom PRIMEIRA → [link para home da loja com cupom aplicado]
**P.S.:** Se você quiser me responder contando o que você mais gosta de vestir, eu leio. Prometido.

---

## Fluxo 2 — Nutrição semanal (evergreen, 1 e-mail/semana) — Ben Settle daily adaptado

**Especialista líder:** Ben Settle (infotainment adaptado à voz Rosie — sem o lado "elBenbo", mantido o "história-do-cotidiano → lição → CTA suave").
**Cadência:** 1 e-mail por semana, terça-feira 10h. Evergreen; ciclo de 12 semanas antes de repetir.
**Objetivo:** manter a caixa de entrada quente, personalidade Rosie em primeiro plano, soft CTA para a loja. Divertir primeiro, vender depois.

### E-mail 2.1 — Semana 1 do ciclo: "O truque do closet enxuto"

| Campo | Conteúdo |
|---|---|
| **Gatilho (RD Station)** | Segmentação "Assinante ativa" (abriu ≥1 e-mail em 30d) — envio da lista semanal |
| **Dia / Hora** | Terça, 10h |
| **Assunto A** | O truque do closet enxuto |
| **Assunto B** | Menos peças, mais look |
| **Preview** | o segredo é uma peça que multiplica |
| **Dono** | Ben Settle (estrutura) + Catarina (voz) |

**Corpo:**

Uma amiga me perguntou semana passada como eu sempre "monto look". Ela disse que abre o armário dela lotado e não sabe o que vestir. Eu abro o meu com um terço das peças e monto três looks por dia se precisar.

A diferença não é ter mais roupa. É ter roupa que conversa.

O jeans reto casa com a regata canelada, com a camiseta Pima, com o paetê num sábado à noite. A camiseta boxer branca é a peça neutra que salva qualquer combinação. Se você tiver essas três peças bem escolhidas, você já monta uma semana inteira.

O que me deixa mal é a peça bonita que fica só no cabide porque não combina com nada. Isso é dinheiro parado.

Se você quiser começar o teu enxuto pelos coringas, essas três estão todas na loja.

xo, cat

**CTA principal:** Ver as três coringas → [link para coleção Clássicos]
**P.S.:** Semana que vem eu vou te contar sobre a peça mais estranha que eu já criei. Uso muito.

---

### E-mail 2.2 — Semana 2 do ciclo: "A peça mais estranha que eu já criei"

| Campo | Conteúdo |
|---|---|
| **Gatilho (RD Station)** | Segmentação "Assinante ativa" — semana seguinte |
| **Dia / Hora** | Terça, 10h |
| **Assunto A** | A peça mais estranha que eu já criei |
| **Assunto B** | Todo mundo achou que eu tinha pirado |
| **Preview** | e virou a peça que eu mais uso no verão |
| **Dono** | Ben Settle (estrutura) + Catarina (voz) |

**Corpo:**

Prometi essa história semana passada. Vamos lá.

Quando eu desenhei o set neon (blusinha e short do mesmo tecido, cor que berra), meu sócio olhou e falou: "Cat, ninguém vai comprar isso." A confecção também torceu o nariz. Uma amiga minha, mais educada, disse "diferente."

Fabriquei mesmo assim. Cinquenta unidades. Achei que ia sobrar quarenta.

Sobrou zero. E hoje ele é a peça que eu mais uso no verão, seja no set completo, seja com jeans em cima, seja só o short com uma camiseta branca. A cor forte fez o que eu queria: virou statement sem eu precisar me esforçar.

Moral da história: statement item é aquilo que faz o look inteiro parar de pé sozinho. Você não precisa de dez. Precisa de um.

Se você não tem um statement no armário, é o que está faltando entre "vestida" e "montada".

xo, cat

**CTA principal:** Ver os statements da estação → [link para coleção Statement]
**P.S.:** Se você quiser começar mais leve, o rosa velho da canelada também é statement. Só que sussurrado.

---

### E-mail 2.3 — Semana 3 do ciclo: "O erro do 'só básico'"

| Campo | Conteúdo |
|---|---|
| **Gatilho (RD Station)** | Segmentação "Assinante ativa" — semana seguinte |
| **Dia / Hora** | Terça, 10h |
| **Assunto A** | O erro do "só básico" |
| **Assunto B** | Básico não é neutro |
| **Preview** | uma armadilha que eu já caí |
| **Dono** | Ben Settle + Blair Warren |

**Corpo:**

Já cai naquela onda de "quero um armário todo básico, todo neutro, tudo combina com tudo."

Fiquei três meses assim. Preto, cinza, off-white, denim. Só isso.

Sabe o que acontece? Você começa a se olhar no espelho e achar que sumiu. Combina tudo, mas nada te representa. É armário de figurante, não de você.

O básico bem feito é a base. Mas base sem identidade é parede lisa. Uma peça de cor, um statement, um acessório que é só teu — isso é o que muda a foto de "roupa que serve" para "roupa que é minha".

Não precisa ser drama. Um rosa velho, um dourado discreto, uma paetê pontual. Uma peça só, no meio do preto e do denim, já muda o jogo.

Se você anda meio invisível no próprio espelho, provavelmente não é a roupa. É a falta de uma.

xo, cat

**CTA principal:** Ver o que tem de novidade → [link para coleção Novidades]
**P.S.:** Semana que vem a história é sobre uma peça que eu aposentei. Doeu.

---

### E-mail 2.4 — Semana 4 do ciclo: "Uma peça que eu aposentei"

| Campo | Conteúdo |
|---|---|
| **Gatilho (RD Station)** | Segmentação "Assinante ativa" — semana seguinte |
| **Dia / Hora** | Terça, 10h |
| **Assunto A** | Aposentei uma peça essa semana |
| **Assunto B** | Deixei uma peça para trás |
| **Preview** | e o que eu aprendi doando ela |
| **Dono** | Ben Settle + Catarina |

**Corpo:**

Doei uma peça essa semana. Um vestido que eu amava três anos atrás e não uso há um ano e meio.

Ficou no cabide todo esse tempo porque doía passar por ele e admitir. Não porque ficou feio. Porque eu mudei.

O que eu vestia com 28 não é o que eu quero vestir com 31. Não é regressão, é edição.

Aprendi uma coisa doando: armário não é museu. Se uma peça não entra no rodízio há mais de um ano, ela está ocupando espaço da peça que você usaria hoje. Sem drama, sem culpa. Doa. Vende. Passa adiante.

O que eu coloquei no lugar dela: uma camisa off-white de linho que eu uso três vezes por semana. Uma peça que fala comigo hoje.

Se você tem um cabide travado assim, é sinal de que o armário quer conversar com você.

xo, cat

**CTA principal:** Ver a coleção atual → [link para coleção Novidades da estação]
**P.S.:** Nenhuma peça Rosie tem prazo de validade curto. Mas as suas mudanças, sim. Tudo bem.

---

### Diretrizes para as outras 8 semanas do ciclo

O ciclo evergreen fecha em 12 semanas. As próximas 8 seguem o padrão história → conexão com peça → soft CTA:

- **Semana 5:** "Frete grátis não é o motivo" — anti-hype sobre por que o AOV alto existe; CTA carrinho > R$400.
- **Semana 6:** "A cliente que me mandou foto" — UGC lido em voz alta (real, com permissão); CTA para peça citada.
- **Semana 7:** "O que uma amiga me perguntou" — dúvida real de tamanho respondida com transparência; CTA para guia de medidas.
- **Semana 8:** "Denim é escolha, não moda" — filosofia da marca sobre jeans; CTA para linha jeans.
- **Semana 9:** "O acessório que quase ninguém compra sozinho" — faixa de cabelo como fecho de look; CTA para acessórios.
- **Semana 10:** "Por que eu ainda faço a mesma canelada" — não seguir tendência efêmera; CTA para clássicos.
- **Semana 11:** "Um domingo à toa" — cena mundana com peça Rosie; CTA para loja.
- **Semana 12:** "O que a Rosie não é" — posicionamento contrário à moda descartável; CTA para valores da marca.

Após semana 12, o ciclo recomeça (mesmos assuntos, refresh sazonal se aplicável).

---

## Fluxo 3 — Carrinho abandonado (3 e-mails, D+0 / D+1 / D+3)

**Especialista líder:** Ry Schwartz (coaching the conversion — treinar a decisão, não pressionar).
**Camada de psicologia:** Robert Cialdini (prova social + escassez real; sem urgência falsa).
**Objetivo:** recuperar venda. Sem desconto agressivo que canibaliza margem. Fricção-quebrada = frete grátis se aplicável (>R$400) já como cortesia.

### E-mail 3.1 — Lembrete gentil

| Campo | Conteúdo |
|---|---|
| **Gatilho (RD Station)** | Evento `Carrinho abandonado` (integração Nuvemshop → RD Station) — item adicionado, checkout não finalizado |
| **Dia / Hora** | D+0, 1h após o abandono |
| **Assunto A** | Deixou uma coisa aqui |
| **Assunto B** | Isso ainda é seu |
| **Preview** | não some, mas o estoque é limitado |
| **Dono** | Ry Schwartz |

**Corpo:**

Você deixou {NOME_DA_PEÇA} no carrinho e eu queria só te avisar que ela ainda está lá.

Sei que compra online é diferente. Você fecha a aba, vai fazer outra coisa, esquece. Ou fica com uma dúvida pequena que trava a decisão. Se for isso, me chama no WhatsApp que eu respondo.

O que você escolheu:

**{NOME_DA_PEÇA} — {TAMANHO} — R$ {PREÇO}**

Se você quiser voltar de onde parou, o link aqui embaixo abre direto no seu carrinho.

xo, cat

**CTA principal:** Voltar para o carrinho → [link retomar checkout]
**CTA secundário (P.S.):** Dúvida de tamanho ou modelagem? Chama no WhatsApp: [link WhatsApp] — respondo eu ou a Fernanda.

---

### E-mail 3.2 — Prova social + escassez real

| Campo | Conteúdo |
|---|---|
| **Gatilho (RD Station)** | 24h após o e-mail 3.1, sem conversão (condição no fluxo) |
| **Dia / Hora** | D+1, 10h |
| **Assunto A** | Também vou te contar quem já tem essa peça |
| **Assunto B** | O que a Renata falou dessa peça |
| **Preview** | e o que eu queria te falar antes de você decidir |
| **Dono** | Ry Schwartz + Robert Cialdini |

**Corpo:**

Sobre a {NOME_DA_PEÇA} que ficou no seu carrinho.

Semana passada uma cliente, Renata, me mandou uma foto vestindo ela. Escreveu: "achei que ia ser só mais uma regata, mas essa aqui é a única que eu não tiro nem para dormir". Não é depoimento fabricado, é a mensagem que ela me mandou. Guardei o print.

Duas coisas honestas:

O tamanho que você escolheu, {TAMANHO}, tem {ESTOQUE} peças em estoque agora. Não é escassez inventada de contador falso; é o estoque real da confecção. Quando essa cor de {TAMANHO} acaba, a próxima leva de 15 a 20 dias para voltar.

Se você estava esperando um sinal, aqui vai um: `[PERSONA_VALIDAR — inserir sentimento validado sobre uso: ex. "toda semana chega alguém contando que virou peça favorita"]`.

O carrinho continua aberto.

xo, cat

**CTA principal:** Fechar o pedido → [link retomar checkout]
**P.S.:** Se você quiser trocar de tamanho antes de fechar, o WhatsApp é o caminho mais rápido: [link WhatsApp].

---

### E-mail 3.3 — Fricção quebrada (sem desconto agressivo)

| Campo | Conteúdo |
|---|---|
| **Gatilho (RD Station)** | 48h após o e-mail 3.2, sem conversão |
| **Dia / Hora** | D+3, 15h |
| **Assunto A** | Última coisa que eu queria te dizer |
| **Assunto B** | Frete grátis nessa aqui, por minha conta |
| **Preview** | um empurrão pequeno, sem drama |
| **Dono** | Ry Schwartz + Ben Settle (voz direta) |

**Corpo:**

Terceira e última vez que eu escrevo sobre essa peça no seu carrinho. Prometo.

Se o que travou foi o frete, deixa eu resolver isso. **Frete grátis nesse pedido**, mesmo abaixo dos R$400. Cupom `SEUFRETE` no checkout, vale por 48h.

Se o que travou foi outra coisa (tamanho, cor, se combina com o que você tem), me responde esse e-mail contando. Eu leio e respondo, prometido. Compra online só funciona quando a dúvida some.

Se você decidiu que não é agora, tudo bem também. Sem mágoa. A gente se fala nos próximos e-mails da lista.

xo, cat

**CTA principal:** Usar `SEUFRETE` no carrinho → [link retomar checkout com cupom]
**P.S.:** Se depois de 48h você mudar de ideia, o cupom já era. Mas a peça, se ainda tiver, continua sua para pegar.

---

## Fluxo 4 — Pós-compra (4 e-mails, D+0 / D+3 / D+7 / D+21)

**Especialista líder:** Russell Brunson (value ladder + LTV).
**Camada complementar:** Andre Chaperon (voz íntima na confirmação e no unboxing).
**Objetivo:** aumentar LTV. Transformar comprador em recomprador e em criador de conteúdo (UGC).

### E-mail 4.1 — Confirmação (transacional-emocional)

| Campo | Conteúdo |
|---|---|
| **Gatilho (RD Station)** | Evento `Compra finalizada` (integração Nuvemshop → RD Station) |
| **Dia / Hora** | D+0, imediato (até 5min) |
| **Assunto A** | Recebi o seu pedido |
| **Assunto B** | Seu pedido tá comigo |
| **Preview** | e uma coisa que eu queria te dizer |
| **Dono** | Andre Chaperon + Catarina |

**Corpo:**

Obrigada. Seu pedido está aqui.

Sei que isso soa clichê, mas eu leio literalmente cada pedido que entra. Cada nome, cada peça, cada endereço. É a parte do dia que eu mais gosto.

O que você comprou:

{RESUMO_DO_PEDIDO}

**Total:** R$ {VALOR} | **Entrega para:** {ENDEREÇO_CURTO}

A gente separa hoje ou amanhã, dependendo da hora que você fechou o pedido. Assim que sair da confecção, você recebe o código de rastreio nesse mesmo e-mail. O prazo para {CIDADE} costuma ficar entre {X} e {Y} dias úteis.

Enquanto isso chega, você vai receber mais alguns e-mails meus. Um sobre como cuidar da peça para ela durar, outro convidando você para me mandar foto. Sem venda no meio, prometido.

xo, cat

**CTA principal:** Acompanhar meu pedido → [link status do pedido]
**P.S.:** Qualquer coisa antes da entrega, WhatsApp: [link WhatsApp]. Respondo eu ou a Fernanda.

---

### E-mail 4.2 — Unboxing + como cuidar

| Campo | Conteúdo |
|---|---|
| **Gatilho (RD Station)** | 72h após a compra (ajustar por CEP quando integração com rastreio permitir) |
| **Dia / Hora** | D+3, 10h |
| **Assunto A** | Antes de você abrir o pacote |
| **Assunto B** | Como fazer a peça durar |
| **Preview** | duas coisas simples, e a segunda importa mais |
| **Dono** | Russell Brunson (expectativa) + Andre Chaperon (voz) |

**Corpo:**

Duas coisas para quando o pacote chegar.

**Primeira:** o cheiro. Pode ter cheiro de tecido novo, é o algodão fresco da confecção, não é perfume. Some com a primeira ventilada.

**Segunda, que é a que importa:** a lavagem. Nossas peças são feitas para durar, mas duram muito mais se você lavar do jeito certo.

Regata e camiseta Pima: água fria, do avesso, sem torcer. Secar na sombra. Só isso já dobra a vida útil.

Jeans: lavar o mínimo possível (isso não é frescura, é o que o denim premium pede). Duas ou três vezes por ano, água fria, ao contrário. Ele fica melhor com o tempo, tipo bota de couro.

Statement (paetê): lavar à mão, com sabão neutro, sem torcer. Deitar numa toalha para secar.

Ficha completa de cuidados em cada etiqueta, também. Guardei aqui em cima porque a maioria não lê etiqueta.

xo, cat

**CTA principal:** Guia completo de cuidados → [link guia de cuidados]
**P.S.:** Amanhã ou depois eu passo aqui de novo para pedir uma coisa. Não é dinheiro.

---

### E-mail 4.3 — Pedido de UGC (foto/tag)

| Campo | Conteúdo |
|---|---|
| **Gatilho (RD Station)** | 7 dias após a compra |
| **Dia / Hora** | D+7, 11h |
| **Assunto A** | Me manda uma foto? |
| **Assunto B** | Isso é o que eu peço em troca |
| **Preview** | e o que eu faço com ela |
| **Dono** | Ben Settle (voz direta) + Russell Brunson (loop de comunidade) |

**Corpo:**

Se a peça já chegou e você já vestiu, eu queria pedir uma coisa.

Me manda uma foto. Não precisa ser produzida. Espelho do banheiro serve. Selfie de saída para o trabalho serve. Foto de amigo tirando enquanto você almoça serve.

Você pode me mandar em duas vias:

1. Responder esse e-mail com a foto anexada. Eu vejo.
2. Postar no Instagram marcando `@rosieiadoreyou`. Eu reposto no perfil (com sua permissão prévia).

O motivo é honesto: a Rosie não faz campanha com modelo profissional. As fotos das clientes reais são a única "campanha" que tem cara de gente de verdade. É o que faz outra mulher ler o e-mail e pensar "ah, então serve em mulher normal também".

Se você não quiser mandar, tudo bem. Não é obrigação e não te tira da lista.

xo, cat

**CTA principal:** Responder com uma foto → [reply-to este e-mail]
**CTA secundário:** Marcar `@rosieiadoreyou` no Instagram → [link perfil]
**P.S.:** Se você quiser me contar o que achou por escrito, também vale. Eu leio.

---

### E-mail 4.4 — Cross-sell inteligente

| Campo | Conteúdo |
|---|---|
| **Gatilho (RD Station)** | 21 dias após a compra (tag `Cliente D+21`) |
| **Dia / Hora** | D+21, 10h |
| **Assunto A** | Uma peça que combina com o que você já pegou |
| **Assunto B** | Uma sugestão pra fechar o look |
| **Preview** | escolhida a dedo, não é lista aleatória |
| **Dono** | Russell Brunson (value ladder) |

**Corpo:**

Passaram três semanas desde que você levou {PEÇA_COMPRADA}. Espero que ela já esteja no rodízio da semana.

Uma coisa que eu penso quando alguém compra uma peça específica: o que fecharia essa combinação sem virar armário lotado?

Se você levou uma **regata canelada**, o par natural é a **calça reta jeans premium** (denim que fica melhor com o uso, faz look completo com a canelada em minutos).

Se você levou o **jeans premium**, o par que multiplica é a **camiseta boxer Pima branca** (a peça neutra que salva combinação).

Se você levou uma **peça statement (paetê/neon)**, o par que reduz esforço é a **canelada preta** (base neutra que deixa o statement brilhar).

Não é regra, é sugestão de quem escolheu as duas peças pensando na mesma cliente.

xo, cat

**CTA principal:** Ver a sugestão para o meu pedido → [link produto complementar dinâmico]
**P.S.:** Se você comprar de novo agora, o frete grátis a partir de R$400 continua rodando. Não é cupom novo, é a política de sempre.

---

## Fluxo 5 — Reativação / Winback (3 e-mails, para D+45 sem abertura)

**Especialista líder:** Todd Brown (E5 — reengajar via curiosidade + Big Idea) + Ben Settle (voz direta, polarização leve).
**Público-alvo:** contatos da lista de ~5.5k que não abriram nenhum e-mail há 45+ dias.
**Objetivo:** recuperar o assinante ou removê-lo da lista principal (mover para lista suprimida). Não vale segurar assinante morto.

### E-mail 5.1 — Curiosidade ("sumiu?")

| Campo | Conteúdo |
|---|---|
| **Gatilho (RD Station)** | Segmentação "Cold 45d" — sem abertura de e-mail Rosie há 45 dias |
| **Dia / Hora** | D+45, 11h |
| **Assunto A** | Sumiu ou eu que estou chata? |
| **Assunto B** | Faz um tempo |
| **Preview** | pergunta honesta, uma resposta simples |
| **Dono** | Ben Settle |

**Corpo:**

Faz um tempo que você não abre um e-mail meu. Eu vi.

Não estou brava. Sei que caixa de entrada é bagunçada, sei que a gente segue marca sem lembrar por quê. Você pode ter entrado na lista há muito tempo, ganho um cupom e nunca mais olhado. Acontece.

Só quero saber duas coisas:

1. Você ainda quer receber e-mail meu? Se sim, é só clicar no botão aqui embaixo. Sinaliza para mim que faz sentido continuar.
2. Se não quer, também tá bom. Nesse caso, pode ignorar esse e-mail. Nos próximos 15 dias eu paro de aparecer aqui e você não precisa fazer nada.

Sem drama, sem "última chance", sem gatilho falso.

xo, cat

**CTA principal:** Continuo na lista da Rosie → [link tracker de reengajamento — tag `Reengajada`]
**P.S.:** Se você quiser me contar o que aconteceu (comprou e não gostou? mudou de estilo? só cansou de e-mail?), me responde. É útil para mim.

---

### E-mail 5.2 — Valor ("o que mudou na Rosie")

| Campo | Conteúdo |
|---|---|
| **Gatilho (RD Station)** | 7 dias após o e-mail 5.1, sem clique no botão de reengajamento |
| **Dia / Hora** | D+52, 10h |
| **Assunto A** | O que aconteceu na Rosie desde que você sumiu |
| **Assunto B** | Vou te atualizar rápido |
| **Preview** | três coisas concretas, e uma delas te interessa |
| **Dono** | Todd Brown (E5 — educate/excite) |

**Corpo:**

Se você não abriu o e-mail passado, tudo bem. Vou tentar de outro jeito.

Se faz um tempo que você não olha para a Rosie, três coisas mudaram e talvez te interessem:

**A linha jeans premium.** Denim que fica melhor a cada uso, modelagem testada em corpo real, três lavagens (nu, médio, escuro). É a peça-âncora do armário para quem quer parar de comprar jeans todo ano.

**A canelada em cores novas.** A regata que era só preta e branca agora tem verde-oliva, marrom-terra e um rosa velho que sumiu em uma semana da primeira leva.

**Frete grátis a partir de R$400.** Que é o valor de uma cesta razoável: uma calça e uma camiseta, ou duas caneladas mais um acessório. Se você prefere comprar um combo por trimestre em vez de peça avulsa toda semana, essa política favorece você.

Se qualquer uma dessas coisas mexeu alguma coisa em você, o link aqui embaixo abre direto na loja.

xo, cat

**CTA principal:** Dar uma olhada na loja → [link home da loja]
**P.S.:** Se você não abriu esse também, o próximo é o último. Prometido.

---

### E-mail 5.3 — Última chamada

| Campo | Conteúdo |
|---|---|
| **Gatilho (RD Station)** | 7 dias após o e-mail 5.2, sem abertura |
| **Dia / Hora** | D+59, 15h |
| **Assunto A** | Último e-mail meu |
| **Assunto B** | Vou parar de aparecer aqui |
| **Preview** | sem culpa, sem drama, só honestidade |
| **Dono** | Ben Settle + Todd Brown (binary choice) |

**Corpo:**

Esse é o último e-mail que eu te mando.

Não é ameaça, é limpeza de casa. Se você não abre há dois meses, faz mais sentido eu parar de chegar aqui do que insistir. Sua caixa de entrada agradece, e a minha lista fica com quem realmente quer estar.

Duas opções:

**Se você quer continuar recebendo:** clica em "quero ficar" aqui embaixo. Volta para a lista ativa, sem perder nada.

**Se você não quer:** não precisa fazer nada. A partir de amanhã, você para de receber e-mail meu. Se um dia mudar de ideia, pode voltar a se cadastrar no site.

Sem culpa, sem "não perca", sem gatilho vazio.

xo, cat

**CTA principal:** Quero ficar na lista → [link reengajamento — tag `Reengajada`]
**P.S.:** Se você virou cliente Rosie e continua comprando de vez em quando, mesmo sem abrir e-mail, obrigada mesmo assim. Não precisa fazer nada aqui.

---

## Notas de execução (para o time RD Station)

1. **Placeholders `[PERSONA_VALIDAR]`:** aparecem no fluxo 3.2. Aletheia/Emporos precisa preencher antes da subida em produção. Sem validação, deixar o parágrafo inteiro genérico ou remover.

2. **Tokens dinâmicos do RD Station a mapear:**
   - `{NOME_DA_PEÇA}`, `{TAMANHO}`, `{PREÇO}`, `{ESTOQUE}` (carrinho abandonado — vêm da integração Nuvemshop)
   - `{RESUMO_DO_PEDIDO}`, `{VALOR}`, `{ENDEREÇO_CURTO}`, `{CIDADE}`, `{X}`, `{Y}` (pós-compra)
   - `{PEÇA_COMPRADA}` (cross-sell — pode virar segmentação por categoria comprada em vez de token simples)

3. **Cupons a criar na Nuvemshop:**
   - `PRIMEIRA` — frete grátis, sem valor mínimo, uso único, validade 7 dias após emissão (fluxo boas-vindas).
   - `SEUFRETE` — frete grátis, uso único, validade 48h após emissão (fluxo carrinho abandonado E3).

4. **Segmentações RD Station:**
   - **Assinante ativa:** abriu pelo menos 1 e-mail nos últimos 30 dias → recebe Fluxo 2 (nutrição semanal).
   - **Cold 45d:** sem abertura há 45+ dias → entra no Fluxo 5 (winback). Se após E3 não reengajar, mover para lista suprimida.
   - **Compradora D+21:** 21 dias desde a última compra → cross-sell (Fluxo 4.4).
   - **Reengajada:** clique no botão de reengajamento nos e-mails 5.1 ou 5.3 → volta à lista ativa.

5. **Sequência de disparo por dia (janela recomendada):** manhã (10h-11h) para Boas-vindas, Nutrição e Pós-compra. Tarde (15h-16h) para Carrinho E3 e Winback E3 — evita concorrer com o pico da manhã.

6. **Métricas mínimas a acompanhar (dashboard Solomon):**
   - Boas-vindas: taxa de abertura E1 → E5, conversão para 1ª compra.
   - Nutrição: taxa de abertura média, CTR para loja, receita atribuída semanal.
   - Carrinho: taxa de recuperação por e-mail, valor médio recuperado.
   - Pós-compra: taxa de UGC (respostas + tags), taxa de recompra em 30d.
   - Winback: % que reengajou, % que foi para lista suprimida.

7. **Camada de psicologia aplicada:**
   - **Cialdini** (reciprocidade + prova social + escassez real): fluxos 1.5, 3.2, 3.3.
   - **Blair Warren** (validação de identidade — "mulher que sabe se vestir"): fluxos 1.3, 1.4, 2.3.
   - **Ry Schwartz** (coaching, não pressão): todo o Fluxo 3.
   - **Anti-hype** (voz Rosie): todos os fluxos.

---

**Contagem de entrega v2:** 19 e-mails completos (5 boas-vindas + 4 nutrição + 3 carrinho + 4 pós-compra + 3 winback) + 8 diretrizes evergreen (nutrição semanas 5-12).

**Assinado:** Cyrus (copy-chief) — orquestrador Caliope
**Escritos por:** Andre Chaperon, Ben Settle, Ry Schwartz, Russell Brunson, Todd Brown
**Passado por:** `sequencia-de-email-de-lancamento`, `anuncio-por-estagio-de-consciencia`, `de-slop`
**Data:** 2026-07-01
