# Copy do Onboarding — Aplicativo Omiron

> Percurso do paciente entre o primeiro toque no app e o primeiro check-in.
> Título em **Great Vibes** (curto, script, cadência de convite). Corpo em **Garamond** (2–4 linhas, sem gordura). CTA em serifa regular (Garamond), verbo direto, sem hype.
> Voz da marca: Sábio. Tom erudito acessível. Sem exclamação. Sem "olá! seja bem-vindo!". Sem infantilização.
>
> Ordem de telas: **Cadastro → Boas-vindas → Corpo → Pensamento → Sentimento → Espírito → Primeiro Check-in → Encontro com Quíron**.

---

## Tela 1 — Cadastro

**Título (Great Vibes):**
Antes de começarmos

**Corpo (Garamond, 3 linhas):**
Este espaço é seu, e é privado. Apenas o Dr. Ariosto e a equipe autorizada da clínica terão acesso ao que você registrar aqui. Nada é publicado. Nada é compartilhado. Nada é vendido.

**Campos:**
- Nome completo
- E-mail
- Senha
- Data de nascimento

**Consentimento — texto canonizado por Nomos (LGPD Art. 11 II 'a' + 'f', Art. 18, Art. 20):**

*Corpo introdutório (Garamond regular, marfim sobre fundo profundo):*

> Este espaço é seu — e é privado por construção. O que você registrar aqui será tratado como *dado pessoal sensível de saúde*, com o cuidado que essa categoria exige por lei (LGPD, Art. 11).
>
> Antes de continuar, precisamos que você leia e concorde com o que segue. Leia com o tempo que quiser. Se algo não estiver claro, pause e converse com o Dr. Ariosto na próxima consulta antes de aceitar.

*Bloco de consentimento (6 checkboxes obrigatórios — um por finalidade, Garamond sobre fundo elevado):*

**☐ Consentimento 1 — Finalidade primária de acompanhamento terapêutico**

> Autorizo o tratamento dos meus dados de check-in (medicação, sono, alimentação, movimento, uso de substâncias, estresse, conexões sociais, produtividade, emoções, escalas HAM-A/HAM-D/YMRS e outras aplicáveis, e escritos livres) pela Clínica Omiron, com a **finalidade específica** de acompanhamento terapêutico complementar às minhas consultas com o Dr. Ariosto Filho (CRM XX.XXX/MG), responsável clínico pelo meu tratamento. Compreendo que a base legal deste tratamento é o **consentimento específico** *(LGPD Art. 11 II 'a')* combinado com a **tutela da saúde por profissional de saúde** *(LGPD Art. 11 II 'f')*.

**☐ Consentimento 2 — Compartilhamento com o médico responsável**

> Autorizo que os dados registrados sejam acessados **exclusivamente** pelo Dr. Ariosto Filho e por profissionais de saúde da Clínica Omiron sob sigilo médico *(Código de Ética Médica, Art. 73)*. Compreendo que o resumo mensal desses dados será enviado ao Dr. Ariosto para leitura antes da minha próxima consulta.

**☐ Consentimento 3 — Assistente de inteligência artificial (Quíron)**

> Compreendo que o aplicativo Omiron inclui um assistente chamado **Quíron**, que é uma **inteligência artificial** (LLM). Autorizo que Quíron leia meus check-ins para me devolver reflexões, observar padrões e citar referências clássicas. Compreendo que Quíron **não é médico**, **não faz diagnóstico**, **não prescreve medicação**, **não altera dose** e **não substitui consulta**. Compreendo que, se o Quíron detectar sinais de risco (ideação suicida, urgência clínica, piora aguda), o sistema notificará automaticamente o Dr. Ariosto para intervenção humana — e que essa notificação **não substitui** minha própria busca por atendimento humano em urgência. Nos termos da **LGPD Art. 20**, tenho o direito de solicitar revisão humana (pelo Dr. Ariosto) de qualquer padrão ou observação apontada pelo Quíron.

**☐ Consentimento 4 — Não compartilhamento com terceiros**

> Compreendo que meus dados **não serão vendidos, cedidos ou compartilhados com terceiros** (seguradoras, empregadores, anunciantes, laboratórios, outras clínicas) **em hipótese alguma**, exceto: (i) por determinação judicial nos limites da lei; (ii) para atender obrigação legal ou regulatória (ANVISA, ANPD, autoridade sanitária) — sempre limitado ao mínimo necessário; (iii) para o próprio Dr. Ariosto Filho e sua equipe clínica autorizada dentro da Clínica Omiron.

**☐ Consentimento 5 — Prazo de retenção**

> Autorizo a retenção dos meus dados enquanto durar meu tratamento com o Dr. Ariosto **e por 20 (vinte) anos após o encerramento do vínculo clínico**, prazo definido pelo **CFM Res 1.821/2007** para guarda de prontuário eletrônico. Após esse período, os dados serão anonimizados ou eliminados, salvo se eu solicitar antes.

**☐ Consentimento 6 — Meus direitos como titular (LGPD Art. 18)**

> Compreendo que, a qualquer momento, posso: **confirmar** se meus dados estão sendo tratados; **acessar** meus dados registrados; **corrigir** dados incompletos, inexatos ou desatualizados; **solicitar anonimização, bloqueio ou eliminação** de dados desnecessários; **portar** meus dados para outro fornecedor; **eliminar** meus dados tratados com base neste consentimento (respeitado o dever de guarda de prontuário); **revogar este consentimento** a qualquer momento, sem prejuízo do atendimento clínico presencial com o Dr. Ariosto.
>
> Para exercer qualquer desses direitos: menu do aplicativo ou e-mail do encarregado de proteção de dados da Clínica Omiron: **[encarregado@clinicaomiron.com.br — a definir]**.

**☐ Declaração agregada (obrigatório):**

> **Li e compreendi os 6 pontos acima. Autorizo o tratamento dos meus dados nos termos descritos.**

**CTA:**
Continuar

> **Nota Nomos:** os 6 checkboxes são intencionais. LGPD Art. 11 exige *"forma específica e destacada"*. Redação final requer revisão de jurista humano (Direito Digital + Direito Médico) antes do primeiro paciente-piloto. Ver `../compliance-checklist.md §5.1`.

---

## Tela 2 — Boas-vindas

**Título (Great Vibes):**
Bem-vindo ao caminho

**Corpo (Garamond, 4 linhas):**
O tratamento psiquiátrico não termina quando a consulta acaba. É no intervalo entre uma sessão e a próxima que o cuidado ganha corpo — ou o perde. O Omiron existe para caminhar com você nesse intervalo. Nem mais, nem menos.

**CTA:**
Conhecer o método

---

## Tela 3 — Pilar Corpo

**Título (Great Vibes):**
Primeiro: o corpo

**Corpo (Garamond, 4 linhas):**
Sono, alimento, movimento, medicação, energia. É por aqui que se começa, não por ser o mais importante, mas por ser o mais próximo. Sansão nos lembra: a força que sustenta se cultiva em hábitos que ninguém vê. Aqui você registra os seus.

**Imagem-âncora:** chama olímpica sobre paisagem em chiaroscuro. Textura de papiro no fundo.

**CTA:**
Seguir

---

## Tela 4 — Pilar Pensamento

**Título (Great Vibes):**
Depois: o pensamento

**Corpo (Garamond, 4 linhas):**
Marco Aurélio governava um império e ainda assim reservava tempo para se examinar por escrito. Não escrevia para publicar; escrevia para se lembrar. O que passa pela sua mente hoje merece um registro parecido — breve, honesto, apenas para você e para quem cuida de você.

**Imagem-âncora:** Biblioteca de Alexandria, escadaria com livros, papiro sobre mesa.

**CTA:**
Seguir

---

## Tela 5 — Pilar Sentimento

**Título (Great Vibes):**
Adiante: o sentimento

**Corpo (Garamond, 4 linhas):**
O sentimento é uma onda; a razão é o dique. Nenhum dos dois vence sozinho. Psiquê cumpriu quatro provas impossíveis não pela força, e sim pela persistência de dar o próximo passo. Aqui você nomeia a onda que passou pelo dia — o que ganha nome perde parte do poder.

**Imagem-âncora:** A Grande Onda de Kanagawa, de Hokusai, em paleta sépia-dourado sobre azul-noite.

**CTA:**
Seguir

---

## Tela 6 — Pilar Espírito

**Título (Great Vibes):**
E, por fim: o espírito

**Corpo (Garamond, 4 linhas):**
Quando o corpo se cuida, o pensamento se ordena e o sentimento se atravessa, o quarto pilar se alinha por conta própria. Não como recompensa mística — como consequência de uma vida bem cultivada. Hécate ilumina a próxima curva; a chave, quem atravessa é você.

**Imagem-âncora:** vitral atravessado por luz, escadaria em espiral, silhueta de arco em pórtico neoclássico.

**CTA:**
Ir ao primeiro registro

---

## Tela 7 — Primeiro Check-in

**Título (Great Vibes):**
O primeiro registro

**Corpo (Garamond, 3 linhas):**
O check-in de hoje leva cerca de três minutos. Quatro perguntas simples, uma por pilar. Sem certo, sem errado — apenas o que passou pelo seu dia. Dele nasce o padrão que o Dr. Ariosto lê antes da próxima consulta.

**Perguntas (uma por pilar, resposta breve + escala 1–5):**
- **Corpo:** Como o corpo respondeu ao dia? *(sono, medicação, movimento, alimentação)*
- **Pensamento:** Que ideia voltou mais vezes hoje?
- **Sentimento:** Qual foi a emoção mais forte, e por quanto tempo ela durou?
- **Espírito:** Em uma frase, o dia teve sentido?

**CTA:**
Registrar

---

## Tela 8 — Primeiro Encontro com Quíron

**Título (Great Vibes):**
Um mentor discreto

**Corpo (Garamond, 4 linhas):**
Quíron é o assistente de inteligência artificial do Omiron. Nome emprestado do centauro que ensinou Aquiles e Asclépio a caminhar por conta própria. Ele reflete com você, aponta padrões e guarda o caminho. Não diagnostica, não prescreve, não substitui a consulta.

**Aviso permanente no rodapé do chat (texto canonizado — LGPD Art. 20 + CFM Res 2.314/2022):**
*Quíron é um assistente de inteligência artificial. Reflete, observa padrões e guarda o caminho — mas não faz diagnóstico, não prescreve medicação, não altera dose e não substitui consulta com o Dr. Ariosto Filho. Em urgências ou pensamentos de se machucar, procure imediatamente o Dr. Ariosto (contato no menu), uma pessoa de confiança ou o CVV — ligue 188.*

**Bolha de sistema (obrigatória antes da primeira mensagem editorial — texto canonizado por Nomos §4.2):**

> **Antes de começarmos esta conversa:**
>
> **Quíron é um assistente de inteligência artificial do aplicativo Omiron. Não é médico, não é o Dr. Ariosto, não é psicólogo, não é rede de urgência.**
>
> **Quíron reflete com você sobre padrões dos seus check-ins, cita clássicos quando ilumina algo, e sinaliza o Dr. Ariosto quando o assunto passa do que ele pode. Todas as conversas ficam guardadas no seu histórico e podem ser vistas pelo Dr. Ariosto antes da próxima consulta.**
>
> **Se em algum momento você tiver pensamentos de se machucar ou sensação de urgência, o caminho é falar com um humano imediatamente: Dr. Ariosto (contato no menu), uma pessoa de confiança, ou CVV — 188.**

Renderização: bolha de sistema centrada, fundo `--omiron-fundo-elevado`, sem avatar. Aparece antes da mensagem editorial do Quíron.

**Primeira mensagem editorial de Quíron (bolha do chat, preservada):**
> Primeiro dia registrado. Não me apresento em cada mensagem — a marca da minha presença é o jeito de falar. Estou aqui quando você me chamar. Amanhã, no mesmo horário do check-in de hoje, o caminho continua.

**CTA:**
Concluir onboarding
