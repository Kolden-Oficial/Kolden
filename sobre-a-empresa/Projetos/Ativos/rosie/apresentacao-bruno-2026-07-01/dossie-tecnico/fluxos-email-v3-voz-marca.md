---
id: rosie-dossie-tecnico-fluxos-email-v3
titulo: "Rosie — 5 Fluxos de E-mail (v3, voz da marca) — Pronto para RD Station"
resumo: "Reescrita dos 19 e-mails da operação Rosie na voz oficial da marca (Descomplicada · Sensorial · Acessível, bilíngue PT+EN), substituindo a 1ª pessoa da Cat pela 1ª pessoa da Rosie. Mesma estrutura de gatilhos, timings e frameworks de v2. Nomenclatura padronizada para catálogo do RD Station. Cada e-mail tem seu HTML pareado em `./emails-html/`."
categoria: projeto
palavras-chave: [rosie, email-marketing, caliope, fluxos, rd-station, voz-marca, brandbook, v3]
status: v3
atualizado-em: 2026-07-14
autor: "Squad Caliope — orquestrado por copy-chief (Cyrus)"
especialistas: [andre-chaperon, ben-settle, ry-schwartz, russell-brunson, todd-brown, joanna-wiebe]
relacionados:
  - ../../alinhamento.md
  - ../../brandbook/02-voz-da-marca/02-pilares-da-comunicacao.md
  - ../../pesquisa/04-tom-de-voz.md
  - ./fluxos-email.md
  - ./emails-html/_index.md
contrato: "Olimpo/contratos/missoes/m-20260701-112935-rosie-90d.yaml"
tipo: projeto
projeto: rosie
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/rosie/apresentacao-bruno-2026-07-01/README|README]]"
---

# 5 Fluxos de E-mail — Operação Rosie (v3 — voz da marca)

> **O que muda de v2 → v3.** A pedido da Cat: a marca **Rosie** passa a falar em 1ª pessoa (não mais a Cat como pessoa). Toda a arquitetura de fluxos, gatilhos, timings e frameworks de copy foi preservada de v2 — a **única mudança é o eu que assina**. Assinatura passa de `xo, cat` para `xo, Rosie`, com uso natural do bilíngue PT+EN previsto no brandbook oficial (pilar Voz da Marca, p. 20–26 do Manual da Marca).
>
> **Ferramenta de disparo:** RD Station Marketing.
> **Layout visual:** cada e-mail tem seu HTML pareado em [`./emails-html/`](./emails-html/), pronto para colar no editor do RD Station. Ver [`./emails-html/_index.md`](./emails-html/_index.md).
>
> **Regra de execução:** todos os corpos passaram pelas skills `sequencia-de-email-de-lancamento` + `de-slop`.
> Sem "vamos", "juntos", "descubra", "não perca", sem em-dash performático, sem "imperdível".
> Voz humana da marca, PT-BR coloquial elevado com temperos PT+EN (`Effortless chic`, `Just for fun!`, `Make it yours`, `Wear it, dress it and be you!`). Cada e-mail assinado **xo, Rosie**.

---

## Nomenclatura oficial dos e-mails (catálogo RD Station)

Padrão: **`rosie-{NN-fluxo}-{NN-posicao}-{tema-curto}`** (kebab-case).

- **`NN-fluxo`** dá ordem estável no explorador do RD Station (todo Boas-vindas fica junto).
- **`NN-posicao`** dá ordem dentro do fluxo.
- **`tema-curto`** dá leitura humana rápida em listas longas.

| # | Nomenclatura | Fluxo | Papel na jornada |
|---|--------------|-------|------------------|
| 1.1 | `rosie-01-boasvindas-01-hello` | Boas-vindas | Apresentação da marca |
| 1.2 | `rosie-01-boasvindas-02-canelada` | Boas-vindas | Storytelling — regata canelada |
| 1.3 | `rosie-01-boasvindas-03-jeans` | Boas-vindas | Storytelling — jeans premium |
| 1.4 | `rosie-01-boasvindas-04-troca` | Boas-vindas | Política de troca sem fricção |
| 1.5 | `rosie-01-boasvindas-05-mimo` | Boas-vindas | Cupom `PRIMEIRA` (frete grátis) |
| 2.1 | `rosie-02-nutricao-01-closet-enxuto` | Nutrição semanal | Filosofia de armário |
| 2.2 | `rosie-02-nutricao-02-statement-neon` | Nutrição semanal | Statement item |
| 2.3 | `rosie-02-nutricao-03-erro-so-basico` | Nutrição semanal | Anti-padrão "só neutro" |
| 2.4 | `rosie-02-nutricao-04-aposentei-peca` | Nutrição semanal | Edição de armário |
| — | (semanas 5–12) | Nutrição semanal | Diretrizes (ver §Fluxo 2) |
| 3.1 | `rosie-03-carrinho-01-lembrete` | Carrinho abandonado | Lembrete gentil (D+0) |
| 3.2 | `rosie-03-carrinho-02-provasocial` | Carrinho abandonado | Prova social + escassez real (D+1) |
| 3.3 | `rosie-03-carrinho-03-fretegratis` | Carrinho abandonado | Cupom `SEUFRETE` (D+3) |
| 4.1 | `rosie-04-poscompra-01-confirmacao` | Pós-compra | Confirmação emocional (D+0) |
| 4.2 | `rosie-04-poscompra-02-cuidados` | Pós-compra | Unboxing + como cuidar (D+3) |
| 4.3 | `rosie-04-poscompra-03-ugc` | Pós-compra | Pedido de foto/tag (D+7) |
| 4.4 | `rosie-04-poscompra-04-crosssell` | Pós-compra | Cross-sell inteligente (D+21) |
| 5.1 | `rosie-05-winback-01-sumiu` | Winback | Curiosidade (D+45) |
| 5.2 | `rosie-05-winback-02-o-que-mudou` | Winback | Valor / novidades (D+52) |
| 5.3 | `rosie-05-winback-03-ultima-chamada` | Winback | Binary choice (D+59) |

**Regra para novos e-mails:** manter os dois primeiros níveis (`rosie-NN-fluxo`) e continuar a sequência `NN-posicao`. Ex.: se surgir um 6º fluxo de recompra sazonal → `rosie-06-sazonal-01-*`.

---

## Fluxo 1 — Boas-vindas (5 e-mails, D+0 → D+4)

**Especialista líder:** Andre Chaperon (Soap Opera Sequence).
**Camada de psicologia:** Blair Warren (validação de identidade — "eu sou uma mulher que sabe se vestir") + Robert Cialdini (reciprocidade no fecho).
**Objetivo:** apresentar a Rosie ao mundo effortless chic e converter a nova assinante em compradora dentro da 1ª semana, sem forçar. Cada e-mail fecha um loop e abre o próximo.

### E-mail 1.1 — `rosie-01-boasvindas-01-hello`

| Campo | Conteúdo |
|---|---|
| **Gatilho (RD Station)** | Conversão em formulário do site ou opt-in de lead magnet (evento `Novo lead — Rosie site`) |
| **Dia / Hora** | D+0, 15 minutos após o cadastro |
| **Assunto A** | Oi. Aqui é a Rosie. |
| **Assunto B** | Bem-vinda ao meu armário |
| **Preview** | Nice to meet you. Uma promessa em uma peça. |
| **Dono** | Andre Chaperon |

**Corpo:**

Oi. Aqui é a Rosie. **Nice to meet you.**

Nasci de uma incomodada bem simples: armário cheio e nada pra vestir. Peça bonita que amassava no primeiro uso, básico que desbotava na terceira lavagem, jeans que só servia dentro da loja. Cansei.

Aí resolvi ser a roupa que eu queria vestir. Algodão Pima que amacia com o tempo. Denim premium que fica melhor a cada uso. Caimento pensado pra corpo real. Nada de tendência que morre em três meses.

O que você vai receber de mim aqui é isso. **Effortless chic**, todos os dias. Peça pensada, história por trás, e às vezes uma dica de como usar. Sem enrolação, sem SAC robótico.

Amanhã eu te conto uma coisa sobre a regata que quase não entrou na primeira coleção. Virou best-seller.

xo, Rosie

**CTA principal:** Ver o que tem no armário agora → [link para home da loja]
**P.S.:** Se você preferir só olhar por enquanto, tudo bem. Amanhã tem história.

---

### E-mail 1.2 — `rosie-01-boasvindas-02-canelada`

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

Na primeira coleção, a canelada quase não entrou. Era simples demais. O ego de designer queria algo mais elaborado: detalhe, estampa, um "algo a mais". Alguém do time chegou a dizer: "básico ninguém compra."

Deixei ela mesmo assim, um pouco por teimosia. Foi a primeira peça a esgotar.

Aprendi ali que o que veste bem no dia a dia é o que a gente usa. O resto fica no cabide.

A canelada continua aí, em cores novas. Algodão Pima, caimento pensado pra não marcar nem ficar solto demais, faz cinturinha sem apertar. É a peça-âncora do meu armário. A que resolve quando você não sabe o que vestir.

**Simply Rosie.**

xo, Rosie

**CTA principal:** Conhecer a canelada → [link para produto regata canelada]
**P.S.:** Amanhã eu te mostro o jeans. Esse eu demorei um ano pra fechar.

---

### E-mail 1.3 — `rosie-01-boasvindas-03-jeans`

| Campo | Conteúdo |
|---|---|
| **Gatilho (RD Station)** | 24h após o e-mail 1.2 |
| **Dia / Hora** | D+2, 10h |
| **Assunto A** | Um ano só nesse jeans |
| **Assunto B** | Por que o jeans é a peça mais cara |
| **Preview** | e por que ele resolve o resto do armário |
| **Dono** | Andre Chaperon + Blair Warren |

**Corpo:**

O jeans da Rosie custa R$579. É a peça mais cara do meu armário. Levei um ano pra fechar essa modelagem, e não foi por perfeccionismo.

Testei em corpo real. Em quem veste 36 e em quem veste 44. Refiz o quadril três vezes. A costura interna, duas. Mudei o bolso de trás de lugar pra valorizar em vez de achatar.

Direto: se você já comprou jeans que apertava na cintura e sobrava na perna, ou que servia na loja e depois da primeira lavagem deixava de servir, é pra esse aqui que eu te chamo. **Denim premium** fica melhor a cada uso. Não pior.

E ele resolve o resto do armário. Uma canelada com esse jeans é look. Uma camiseta branca com esse jeans é look. Um paetê com esse jeans é **o** look.

**Wear it, dress it and be you.**

xo, Rosie

**CTA principal:** Ver os jeans → [link para coleção jeans]
**P.S.:** Ainda tem dois e-mails nessa história. Amanhã eu te conto o que a gente faz quando a peça chega e não fica boa.

---

### E-mail 1.4 — `rosie-01-boasvindas-04-troca`

| Campo | Conteúdo |
|---|---|
| **Gatilho (RD Station)** | 24h após o e-mail 1.3 |
| **Dia / Hora** | D+3, 10h |
| **Assunto A** | Se não servir, a gente resolve |
| **Assunto B** | Como funciona a troca aqui |
| **Preview** | sem stress, sem julgamento |
| **Dono** | Andre Chaperon + Blair Warren |

**Corpo:**

Compra online tem um medo real: e se não servir?

Aqui na Rosie a troca é assim. Você abre o pacote, experimenta com calma, veste na frente do espelho. Se não ficou como você imaginou, chama a gente no WhatsApp. Sem formulário, sem "prezada cliente", sem sete dias úteis.

A gente combina a troca por tamanho ou por outra peça. Se der pra resolver no mesmo pedido, resolve. Se precisar de reembolso, reembolsa. Sem stress.

Isso é o que eu queria como cliente. Então é o que a gente faz.

Duas coisas ajudam a acertar de primeira: cada ficha de produto tem a modelagem descrita (se veste no corpo, se é solta, onde marca), e o WhatsApp responde tira-dúvida **antes** de você comprar.

**Effortless chic** começa na hora de escolher. Não só depois que a peça chega.

xo, Rosie

**CTA principal:** Explorar o armário com tranquilidade → [link para home da loja]
**P.S.:** Amanhã, o último dessa série. Deixei um mimo pequeno pra quem chegou até aqui.

---

### E-mail 1.5 — `rosie-01-boasvindas-05-mimo`

| Campo | Conteúdo |
|---|---|
| **Gatilho (RD Station)** | 24h após o e-mail 1.4 |
| **Dia / Hora** | D+4, 10h |
| **Assunto A** | Um mimo pra você |
| **Assunto B** | Frete grátis na sua primeira |
| **Preview** | por ter lido até aqui |
| **Dono** | Andre Chaperon + Robert Cialdini (reciprocidade) |

**Corpo:**

Você leu cinco e-mails meus nessa semana. Já é mais atenção do que a maioria dá pra uma marca. Obrigada.

Como quem chega até aqui merece algo concreto: **frete grátis na sua primeira compra**, sem valor mínimo. Cupom `PRIMEIRA` no checkout, vale por 7 dias.

Uma sugestão de por onde começar: se você ainda não conhece a canelada, ela é o teste mais barato pra sentir a qualidade do algodão Pima. Se quiser ir direto na peça-âncora, o jeans resolve por anos.

De qualquer forma, agora que a gente já se conhece um pouco, os próximos e-mails vão ser semanais. História curta, dica de look, às vezes uma peça nova. Nada de bombardeio.

**Just for fun. Make it yours.**

xo, Rosie

**CTA principal:** Usar o cupom `PRIMEIRA` → [link para home da loja com cupom aplicado]
**P.S.:** Se você quiser me responder contando o que mais gosta de vestir, eu leio. Prometido.

---

## Fluxo 2 — Nutrição semanal (evergreen, 1 e-mail/semana) — Ben Settle daily adaptado

**Especialista líder:** Ben Settle (infotainment adaptado à voz Rosie — sem o lado "elBenbo", mantido o "história-do-cotidiano → lição → CTA suave").
**Cadência:** 1 e-mail por semana, terça-feira 10h. Evergreen; ciclo de 12 semanas antes de repetir.
**Objetivo:** manter a caixa quente, personalidade Rosie em primeiro plano, soft CTA pra loja. Divertir primeiro, vender depois.

### E-mail 2.1 — `rosie-02-nutricao-01-closet-enxuto`

| Campo | Conteúdo |
|---|---|
| **Gatilho (RD Station)** | Segmentação "Assinante ativa" (abriu ≥1 e-mail em 30d) — envio da lista semanal |
| **Dia / Hora** | Terça, 10h |
| **Assunto A** | O truque do closet enxuto |
| **Assunto B** | Menos peças, mais look |
| **Preview** | o segredo é uma peça que multiplica |
| **Dono** | Ben Settle (estrutura) + Rosie (voz) |

**Corpo:**

Uma cliente perguntou essa semana como algumas mulheres sempre "montam look". Ela disse que abre o armário lotado dela e não sabe o que vestir. Enquanto isso, tem quem abra o próprio com um terço das peças e monte três looks por dia se precisar.

A diferença não é ter mais roupa. É ter roupa que **conversa**.

O jeans reto casa com a canelada, com a camiseta Pima, com o paetê num sábado à noite. A camiseta boxer branca é a peça neutra que salva qualquer combinação. Três peças bem escolhidas montam uma semana inteira.

O que deixa mal é a peça bonita que fica só no cabide porque não combina com nada. Isso é dinheiro parado.

Se você quiser começar o teu enxuto pelas coringas, essas três estão todas aqui no meu armário.

**Always Rosie.**

xo, Rosie

**CTA principal:** Ver as três coringas → [link para coleção Clássicos]
**P.S.:** Semana que vem a história é sobre a peça mais estranha que eu já criei. Uso muito.

---

### E-mail 2.2 — `rosie-02-nutricao-02-statement-neon`

| Campo | Conteúdo |
|---|---|
| **Gatilho (RD Station)** | Segmentação "Assinante ativa" — semana seguinte |
| **Dia / Hora** | Terça, 10h |
| **Assunto A** | A peça mais estranha que eu já criei |
| **Assunto B** | Todo mundo achou que eu tinha pirado |
| **Preview** | e virou a peça que eu mais uso no verão |
| **Dono** | Ben Settle (estrutura) + Rosie (voz) |

**Corpo:**

Prometi essa história semana passada. Vamos lá.

Quando desenhei o set neon (blusinha e short do mesmo tecido, cor que berra), o time olhou e disse: "ninguém vai comprar isso." A confecção torceu o nariz. Uma cliente-teste, mais educada, disse "diferente."

Fabriquei mesmo assim. Cinquenta unidades. Achei que ia sobrar quarenta.

Sobrou zero. Hoje o set neon é uma das peças que mais sai no verão. Uso completo, com jeans por cima, ou só o short com uma camiseta branca. A cor forte fez o serviço: virou statement sem precisar de esforço.

Moral da história: **statement item** é aquilo que faz o look inteiro parar de pé sozinho. Você não precisa de dez. Precisa de um.

Se não tem um statement no armário, é o que está faltando entre "vestida" e "montada".

**Peachy cheeks. That's the Rosie experience.**

xo, Rosie

**CTA principal:** Ver os statements da estação → [link para coleção Statement]
**P.S.:** Se você quiser começar mais leve, o rosa velho da canelada também é statement. Só que sussurrado.

---

### E-mail 2.3 — `rosie-02-nutricao-03-erro-so-basico`

| Campo | Conteúdo |
|---|---|
| **Gatilho (RD Station)** | Segmentação "Assinante ativa" — semana seguinte |
| **Dia / Hora** | Terça, 10h |
| **Assunto A** | O erro do "só básico" |
| **Assunto B** | Básico não é neutro |
| **Preview** | uma armadilha em que muita gente cai |
| **Dono** | Ben Settle + Blair Warren |

**Corpo:**

Muita mulher cai naquela onda de "quero um armário todo básico, todo neutro, tudo combina com tudo."

Fica três meses assim. Preto, cinza, off-white, denim. Só isso.

Sabe o que acontece? Você começa a se olhar no espelho e achar que sumiu. Combina tudo, mas nada te representa. É armário de figurante. Não de você.

O básico bem feito é a base. Mas base sem identidade é parede lisa. Uma peça de cor, um statement, um acessório que é só teu. É isso que muda a foto de "roupa que serve" pra "roupa que é minha".

Não precisa ser drama. Um rosa velho, um dourado discreto, um paetê pontual. Uma peça só, no meio do preto e do denim, já muda o jogo.

Se você anda meio invisível no próprio espelho, provavelmente não é a roupa. É a falta de uma.

**Own your style.**

xo, Rosie

**CTA principal:** Ver o que tem de novidade → [link para coleção Novidades]
**P.S.:** Semana que vem a história é sobre uma peça que eu aposentei. Doeu.

---

### E-mail 2.4 — `rosie-02-nutricao-04-aposentei-peca`

| Campo | Conteúdo |
|---|---|
| **Gatilho (RD Station)** | Segmentação "Assinante ativa" — semana seguinte |
| **Dia / Hora** | Terça, 10h |
| **Assunto A** | Aposentei uma peça essa semana |
| **Assunto B** | Deixei uma peça pra trás |
| **Preview** | e o que eu aprendi doando ela |
| **Dono** | Ben Settle + Rosie |

**Corpo:**

Doei uma peça essa semana. Um vestido amado três anos atrás e não usado há um ano e meio.

Ficou no cabide todo esse tempo porque doía passar por ele e admitir. Não porque ficou feio. Porque a mulher que o vestia mudou.

O que se veste com 28 não é o que se quer vestir com 31. Não é regressão, é **edição**.

Aprendi uma coisa doando: armário não é museu. Se uma peça não entra no rodízio há mais de um ano, ela está ocupando espaço da peça que você usaria hoje. Sem drama, sem culpa. Doa. Vende. Passa adiante.

O que entrou no lugar: uma camisa off-white de linho que sai três vezes por semana. Uma peça que fala com quem você é hoje.

Se você tem um cabide travado assim, é sinal de que o armário quer conversar com você.

**Live it, love it.**

xo, Rosie

**CTA principal:** Ver a coleção atual → [link para coleção Novidades da estação]
**P.S.:** Nenhuma peça Rosie tem prazo de validade curto. Mas suas mudanças, sim. Tudo bem.

---

### Diretrizes para as outras 8 semanas do ciclo

O ciclo evergreen fecha em 12 semanas. As próximas 8 seguem o padrão história → conexão com peça → soft CTA (todos com nomenclatura `rosie-02-nutricao-NN-tema`):

- **Semana 5 · `rosie-02-nutricao-05-frete-nao-e-o-motivo`** — anti-hype sobre por que o AOV alto existe; CTA carrinho > R$400.
- **Semana 6 · `rosie-02-nutricao-06-cliente-mandou-foto`** — UGC lido em voz alta (real, com permissão); CTA pra peça citada.
- **Semana 7 · `rosie-02-nutricao-07-duvida-de-tamanho`** — dúvida real de tamanho respondida com transparência; CTA pro guia de medidas.
- **Semana 8 · `rosie-02-nutricao-08-denim-e-escolha`** — filosofia da marca sobre jeans; CTA pra linha jeans.
- **Semana 9 · `rosie-02-nutricao-09-acessorio-fechado`** — faixa de cabelo como fecho de look; CTA pra acessórios.
- **Semana 10 · `rosie-02-nutricao-10-mesma-canelada`** — não seguir tendência efêmera; CTA pros clássicos.
- **Semana 11 · `rosie-02-nutricao-11-domingo-a-toa`** — cena mundana com peça Rosie; CTA pra loja.
- **Semana 12 · `rosie-02-nutricao-12-o-que-a-rosie-nao-e`** — posicionamento contrário à moda descartável; CTA pros valores da marca.

Após semana 12, o ciclo recomeça (mesmos assuntos, refresh sazonal se aplicável).

---

## Fluxo 3 — Carrinho abandonado (3 e-mails, D+0 / D+1 / D+3)

**Especialista líder:** Ry Schwartz (coaching the conversion — treinar a decisão, não pressionar).
**Camada de psicologia:** Robert Cialdini (prova social + escassez real; sem urgência falsa).
**Objetivo:** recuperar venda. Sem desconto agressivo que canibaliza margem. Fricção-quebrada = frete grátis se aplicável (>R$400) já como cortesia.

### E-mail 3.1 — `rosie-03-carrinho-01-lembrete`

| Campo | Conteúdo |
|---|---|
| **Gatilho (RD Station)** | Evento `Carrinho abandonado` (integração Nuvemshop → RD Station) — item adicionado, checkout não finalizado |
| **Dia / Hora** | D+0, 1h após o abandono |
| **Assunto A** | Você deixou uma coisa aqui |
| **Assunto B** | Isso ainda é seu |
| **Preview** | não some, mas o estoque é limitado |
| **Dono** | Ry Schwartz |

**Corpo:**

Você deixou {NOME_DA_PEÇA} no carrinho. Só queria te avisar que ela ainda está aí.

Compra online é assim mesmo. Você fecha a aba, vai fazer outra coisa, esquece. Ou trava numa dúvida pequena. Se for isso, me chama no WhatsApp que a gente responde rápido.

O que você escolheu:

**{NOME_DA_PEÇA} · {TAMANHO} · R$ {PREÇO}**

Se quiser voltar de onde parou, o link aqui embaixo abre direto no seu carrinho.

**Effortless chic** também vale pro checkout.

xo, Rosie

**CTA principal:** Voltar pro carrinho → [link retomar checkout]
**CTA secundário (P.S.):** Dúvida de tamanho ou modelagem? Chama no WhatsApp: [link WhatsApp]. A gente responde antes de você fechar.

---

### E-mail 3.2 — `rosie-03-carrinho-02-provasocial`

| Campo | Conteúdo |
|---|---|
| **Gatilho (RD Station)** | 24h após o e-mail 3.1, sem conversão (condição no fluxo) |
| **Dia / Hora** | D+1, 10h |
| **Assunto A** | Deixa eu te contar quem já tem essa peça |
| **Assunto B** | O que a Renata falou dessa peça |
| **Preview** | e o que eu queria te falar antes de você decidir |
| **Dono** | Ry Schwartz + Robert Cialdini |

**Corpo:**

Sobre a {NOME_DA_PEÇA} que ficou no seu carrinho.

Semana passada uma cliente, Renata, mandou uma foto vestindo ela. Escreveu: "achei que ia ser só mais uma regata, mas essa é a única que eu não tiro nem pra dormir." Não é depoimento fabricado. É a mensagem que ela mandou. A gente guardou o print.

Duas coisas honestas:

O tamanho que você escolheu, {TAMANHO}, tem **{ESTOQUE} peças** em estoque agora. Não é escassez inventada de contador falso; é o estoque real da confecção. Quando essa cor de {TAMANHO} acaba, a próxima leva demora 15 a 20 dias pra voltar.

Se você estava esperando um sinal, aqui vai um: `[PERSONA_VALIDAR: inserir sentimento validado sobre uso, ex. "toda semana chega alguém contando que virou peça favorita"]`.

O carrinho continua aberto.

xo, Rosie

**CTA principal:** Fechar o pedido → [link retomar checkout]
**P.S.:** Se você quiser trocar de tamanho antes de fechar, o WhatsApp é o caminho mais rápido: [link WhatsApp].

---

### E-mail 3.3 — `rosie-03-carrinho-03-fretegratis`

| Campo | Conteúdo |
|---|---|
| **Gatilho (RD Station)** | 48h após o e-mail 3.2, sem conversão |
| **Dia / Hora** | D+3, 15h |
| **Assunto A** | Última coisa que eu queria te dizer |
| **Assunto B** | Frete grátis nessa aqui, por minha conta |
| **Preview** | um empurrão pequeno, sem drama |
| **Dono** | Ry Schwartz + Ben Settle (voz direta) |

**Corpo:**

Terceira e última vez que eu escrevo sobre essa peça no seu carrinho. Prometido.

Se o que travou foi o frete, deixa eu resolver isso. **Frete grátis nesse pedido**, mesmo abaixo dos R$400. Cupom `SEUFRETE` no checkout, vale por 48h.

Se o que travou foi outra coisa (tamanho, cor, se combina com o que você tem), me responde esse e-mail contando. A gente lê e responde, prometido. Compra online só funciona quando a dúvida some.

Se você decidiu que não é agora, tudo bem também. Sem mágoa. A gente se fala nos próximos e-mails da lista.

xo, Rosie

**CTA principal:** Usar `SEUFRETE` no carrinho → [link retomar checkout com cupom]
**P.S.:** Se depois de 48h você mudar de ideia, o cupom já era. Mas a peça, se ainda tiver, continua sua pra pegar.

---

## Fluxo 4 — Pós-compra (4 e-mails, D+0 / D+3 / D+7 / D+21)

**Especialista líder:** Russell Brunson (value ladder + LTV).
**Camada complementar:** Andre Chaperon (voz íntima na confirmação e no unboxing).
**Objetivo:** aumentar LTV. Transformar compradora em recompradora e em criadora de conteúdo (UGC).

### E-mail 4.1 — `rosie-04-poscompra-01-confirmacao`

| Campo | Conteúdo |
|---|---|
| **Gatilho (RD Station)** | Evento `Compra finalizada` (integração Nuvemshop → RD Station) |
| **Dia / Hora** | D+0, imediato (até 5min) |
| **Assunto A** | Recebi o seu pedido |
| **Assunto B** | Seu pedido tá comigo |
| **Preview** | e uma coisa que eu queria te dizer |
| **Dono** | Andre Chaperon + Rosie |

**Corpo:**

Obrigada. Seu pedido chegou aqui.

Sei que isso soa clichê, mas cada pedido é lido pessoalmente. Cada nome, cada peça, cada endereço. É a parte do dia que eu mais gosto.

O que você levou:

{RESUMO_DO_PEDIDO}

**Total:** R$ {VALOR} | **Entrega para:** {ENDEREÇO_CURTO}

A gente separa hoje ou amanhã, dependendo da hora que você fechou o pedido. Assim que sair da confecção, você recebe o código de rastreio nesse mesmo e-mail. O prazo pra {CIDADE} costuma ficar entre {X} e {Y} dias úteis.

Enquanto isso chega, mais alguns e-mails meus vão passar por aqui. Um sobre como cuidar da peça pra ela durar, outro convidando você a mandar foto. Sem venda no meio, prometido.

xo, Rosie

**CTA principal:** Acompanhar meu pedido → [link status do pedido]
**P.S.:** Qualquer coisa antes da entrega, WhatsApp: [link WhatsApp].

---

### E-mail 4.2 — `rosie-04-poscompra-02-cuidados`

| Campo | Conteúdo |
|---|---|
| **Gatilho (RD Station)** | 72h após a compra (ajustar por CEP quando integração com rastreio permitir) |
| **Dia / Hora** | D+3, 10h |
| **Assunto A** | Antes de você abrir o pacote |
| **Assunto B** | Como fazer a peça durar |
| **Preview** | duas coisas simples, e a segunda importa mais |
| **Dono** | Russell Brunson (expectativa) + Andre Chaperon (voz) |

**Corpo:**

Duas coisas pra quando o pacote chegar.

**Primeira:** o cheiro. Pode ter um leve cheiro de tecido novo. É o algodão fresco da confecção, não é perfume. Some com a primeira ventilada.

**Segunda, que é a que importa:** a lavagem. Minhas peças são feitas pra durar, mas duram muito mais se você lavar do jeito certo.

- **Regata e camiseta Pima:** água fria, do avesso, sem torcer. Secar na sombra. Só isso já dobra a vida útil.
- **Jeans:** lavar o mínimo possível. Não é frescura, é o que o denim premium pede. Duas ou três vezes por ano, água fria, ao contrário. Ele fica melhor com o tempo, tipo bota de couro.
- **Statement (paetê):** lavar à mão, com sabão neutro, sem torcer. Deitar numa toalha pra secar.

Ficha completa de cuidados em cada etiqueta, também. Deixei aqui em cima porque a maioria não lê etiqueta.

**Sinta o frescor. Rosie's essence, pure & eternal.**

xo, Rosie

**CTA principal:** Guia completo de cuidados → [link guia de cuidados]
**P.S.:** Amanhã ou depois eu passo aqui de novo pra pedir uma coisa. Não é dinheiro.

---

### E-mail 4.3 — `rosie-04-poscompra-03-ugc`

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

Me manda uma foto. Não precisa ser produzida. Espelho do banheiro serve. Selfie de saída pro trabalho serve. Foto de amiga tirando enquanto você almoça serve.

Duas vias:

1. Responder esse e-mail com a foto anexada. A gente vê.
2. Postar no Instagram marcando **`@rosieiadoreyou`**. A gente reposta no perfil (com sua permissão antes).

O motivo é honesto: a Rosie não faz campanha com modelo profissional. As fotos das clientes reais são a única "campanha" que tem cara de gente de verdade. É o que faz outra mulher ler o e-mail e pensar "ah, então serve em mulher normal também".

Se você não quiser mandar, tudo bem. Não é obrigação e não te tira da lista.

xo, Rosie

**CTA principal:** Responder com uma foto → [reply-to este e-mail]
**CTA secundário:** Marcar **`@rosieiadoreyou`** no Instagram → [link perfil]
**P.S.:** Se você quiser me contar o que achou por escrito, também vale. A gente lê.

---

### E-mail 4.4 — `rosie-04-poscompra-04-crosssell`

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

Uma coisa que eu penso quando alguém leva uma peça específica: o que fecharia essa combinação sem virar armário lotado?

- Se você levou uma **regata canelada**, o par natural é a **calça reta jeans premium** (denim que fica melhor com o uso, look completo com a canelada em minutos).
- Se você levou o **jeans premium**, o par que multiplica é a **camiseta boxer Pima branca** (a peça neutra que salva combinação).
- Se você levou uma **peça statement (paetê/neon)**, o par que reduz esforço é a **canelada preta** (base neutra que deixa o statement brilhar).

Não é regra. É sugestão de quem escolheu as duas peças pensando na mesma mulher.

**Peças que falam com você. Own your style.**

xo, Rosie

**CTA principal:** Ver a sugestão pro meu pedido → [link produto complementar dinâmico]
**P.S.:** Se você comprar de novo agora, o frete grátis a partir de R$400 continua rodando. Não é cupom novo, é a política de sempre.

---

## Fluxo 5 — Reativação / Winback (3 e-mails, para D+45 sem abertura)

**Especialista líder:** Todd Brown (E5 — reengajar via curiosidade + Big Idea) + Ben Settle (voz direta, polarização leve).
**Público-alvo:** contatos da lista de ~5.5k que não abriram nenhum e-mail há 45+ dias.
**Objetivo:** recuperar a assinante ou removê-la da lista principal (mover pra lista suprimida). Não vale segurar assinante morto.

### E-mail 5.1 — `rosie-05-winback-01-sumiu`

| Campo | Conteúdo |
|---|---|
| **Gatilho (RD Station)** | Segmentação "Cold 45d" — sem abertura de e-mail Rosie há 45 dias |
| **Dia / Hora** | D+45, 11h |
| **Assunto A** | Sumiu ou eu que estou chata? |
| **Assunto B** | Faz um tempo |
| **Preview** | pergunta honesta, uma resposta simples |
| **Dono** | Ben Settle |

**Corpo:**

Faz um tempo que você não abre um e-mail meu. Eu percebi.

Não estou brava. Sei que caixa de entrada é bagunçada, sei que a gente segue marca sem lembrar por quê. Você pode ter entrado na lista há muito tempo, ganho um cupom e nunca mais olhado. Acontece.

Só quero saber duas coisas:

1. Você ainda quer receber e-mail meu? Se sim, é só clicar no botão aqui embaixo. Sinaliza pra mim que faz sentido continuar.
2. Se não quer, também tá bom. Nesse caso, pode ignorar esse e-mail. Nos próximos 15 dias eu paro de aparecer aqui e você não precisa fazer nada.

Sem drama, sem "última chance", sem gatilho falso.

xo, Rosie

**CTA principal:** Continuo na lista da Rosie → [link tracker de reengajamento — tag `Reengajada`]
**P.S.:** Se você quiser me contar o que aconteceu (comprou e não gostou? mudou de estilo? só cansou de e-mail?), me responde. É útil pra mim.

---

### E-mail 5.2 — `rosie-05-winback-02-o-que-mudou`

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

Se faz um tempo que você não olha pra Rosie, três coisas mudaram e talvez te interessem:

**A linha jeans premium.** Denim que fica melhor a cada uso, modelagem testada em corpo real, três lavagens (nu, médio, escuro). É a peça-âncora do armário pra quem quer parar de comprar jeans todo ano.

**A canelada em cores novas.** A regata que era só preta e branca agora tem verde-oliva, marrom-terra e um rosa velho que sumiu em uma semana da primeira leva.

**Frete grátis a partir de R$400.** Que é o valor de uma cesta razoável: uma calça e uma camiseta, ou duas caneladas com um acessório. Se você prefere comprar um combo por trimestre em vez de peça avulsa toda semana, essa política favorece você.

Se qualquer uma dessas coisas mexeu alguma coisa em você, o link aqui embaixo abre direto no meu armário.

xo, Rosie

**CTA principal:** Dar uma olhada no armário → [link home da loja]
**P.S.:** Se você não abriu esse também, o próximo é o último. Prometido.

---

### E-mail 5.3 — `rosie-05-winback-03-ultima-chamada`

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

Não é ameaça, é limpeza de casa. Se você não abre há dois meses, faz mais sentido eu parar de chegar aqui do que insistir. Sua caixa de entrada agradece, e minha lista fica com quem realmente quer estar.

Duas opções:

**Se você quer continuar recebendo:** clica em "quero ficar" aqui embaixo. Volta pra lista ativa, sem perder nada.

**Se você não quer:** não precisa fazer nada. A partir de amanhã, você para de receber e-mail meu. Se um dia mudar de ideia, pode voltar a se cadastrar no site.

Sem culpa, sem "não perca", sem gatilho vazio.

xo, Rosie

**CTA principal:** Quero ficar na lista → [link reengajamento — tag `Reengajada`]
**P.S.:** Se você virou cliente Rosie e continua comprando de vez em quando mesmo sem abrir e-mail, obrigada. Não precisa fazer nada aqui.

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
   - **Cold 45d:** sem abertura há 45+ dias → entra no Fluxo 5 (winback). Se após E3 não reengajar, mover pra lista suprimida.
   - **Compradora D+21:** 21 dias desde a última compra → cross-sell (Fluxo 4.4).
   - **Reengajada:** clique no botão de reengajamento nos e-mails 5.1 ou 5.3 → volta à lista ativa.

5. **Sequência de disparo por dia (janela recomendada):** manhã (10h-11h) pra Boas-vindas, Nutrição e Pós-compra. Tarde (15h-16h) pra Carrinho E3 e Winback E3 — evita concorrer com o pico da manhã.

6. **Métricas mínimas a acompanhar (dashboard Solomon):**
   - Boas-vindas: taxa de abertura E1 → E5, conversão pra 1ª compra.
   - Nutrição: taxa de abertura média, CTR pra loja, receita atribuída semanal.
   - Carrinho: taxa de recuperação por e-mail, valor médio recuperado.
   - Pós-compra: taxa de UGC (respostas + tags), taxa de recompra em 30d.
   - Winback: % que reengajou, % que foi pra lista suprimida.

7. **Camada de psicologia aplicada:**
   - **Cialdini** (reciprocidade + prova social + escassez real): fluxos 1.5, 3.2, 3.3.
   - **Blair Warren** (validação de identidade): fluxos 1.3, 1.4, 2.3.
   - **Ry Schwartz** (coaching, não pressão): todo o Fluxo 3.
   - **Anti-hype** (voz Rosie): todos os fluxos.

---

## Diff resumido v2 → v3

**Persona-que-fala:** Catarina Tourinho (pessoa) → **Rosie (marca)**.
**Assinatura:** `xo, cat` → **`xo, Rosie`**.
**Backstory pessoal ("meu ego de designer", "meu sócio", "uma amiga minha"):** substituído por versão institucional da marca ("o ego de designer", "o time", "uma cliente-teste"). A memória e a paixão continuam presentes, mas passam a ser da Rosie — não de uma fundadora citada nominalmente.
**Bilíngue PT+EN (oficial):** inserido de forma pontual e natural, seguindo o brandbook (`Effortless chic`, `Make it yours`, `Just for fun`, `Wear it, dress it and be you`, `Simply Rosie`, `Always Rosie`, `Peachy cheeks. That's the Rosie experience`, `Own your style`, `Sinta o frescor. Rosie's essence, pure & eternal`, `Live it, love it`).
**Preservado sem alteração:** todos os gatilhos RD Station, timings, assuntos A/B, previews, CTAs, P.S., tokens dinâmicos, cupons, segmentações e a estrutura de Chaperon/Settle/Schwartz/Brunson/Todd Brown.

---

**Contagem de entrega v3:** 19 e-mails completos (5 boas-vindas + 4 nutrição + 3 carrinho + 4 pós-compra + 3 winback) + 8 diretrizes evergreen (nutrição semanas 5-12) + nomenclatura completa + 19 HTMLs pareados em `./emails-html/`.

**Assinado:** Cyrus (copy-chief) — orquestrador Caliope
**Voz da marca por:** Squad Caliope + Brandbook Rosie (v.01.04.2024, pilar Voz da Marca)
**Passado por:** `sequencia-de-email-de-lancamento`, `de-slop`
**Data:** 2026-07-14
