---
id: projeto-omiron-brandbook-aplicacoes
titulo: "Omiron — Aplicações da Marca"
resumo: "Como o mundo Omiron vive em canal — in-product (app), receita física (papel timbrado do consultório), Instagram do Dr. Ariosto, e-mail transacional (welcome, confirmação, resumo semanal ao paciente, resumo mensal ao médico), deck comercial padrão Rosie. Cada canal com 2-3 exemplos concretos de copy + regra visual. A gamificação da planta virtual honra o token verde-planta RESTRITO; as 7 áreas de check-in do PRD são agrupadas nos 4 pilares da narrativa."
categoria: projeto
status: oficial
atualizado-em: 2026-07-06
autor: Aglaia (brand-chief) — Kolden
missao: m-20260706-193013-omiron-brandbook-completo
relacionados: [00-indice, 01-posicionamento, 02-voz-da-marca, 03-identidade-visual, 05-manual-operacional, narrativa/onboarding-copy, narrativa/mentor-quiron, narrativa/pilares, ../design-system/01-fundamentos/cores]
tipo: projeto
projeto: omiron
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/omiron/brandbook/00-indice|00-indice]]"
---

# Aplicações da Marca

> Pilar 4 de 5. Como o mundo Omiron vive nos canais reais em que o Dr. Ariosto e o paciente encontram a marca. Este capítulo NÃO reescreve copy — aponta para as fontes de verdade (`narrativa/onboarding-copy.md`, `narrativa/mentor-quiron.md`) e mostra como cada canal materializa voz + identidade + tom.

## 1. App (in-product)

### 1.1 Onboarding — 8 telas travadas

A copy completa das 8 telas iniciais do app vive em **[`narrativa/onboarding-copy.md`](narrativa/onboarding-copy.md)** — fonte de verdade única sob autoria da Orfeu. As telas seguem a ordem:

1. **Cadastro** — *Antes de começarmos.* (Consentimento LGPD + termo de uso.)
2. **Boas-vindas** — *Bem-vindo ao caminho.*
3. **Pilar Corpo** — *Primeiro: o corpo.* (Imagem-âncora: chama olímpica em chiaroscuro sobre papiro.)
4. **Pilar Pensamento** — *Depois: o pensamento.* (Imagem-âncora: Biblioteca de Alexandria com papiro sobre mesa — Alternativa B recomendada por Orfeu; a decisão final ainda é do Dr. Ariosto em 08/07.)
5. **Pilar Sentimento** — *Adiante: o sentimento.* (Imagem-âncora: A Grande Onda de Kanagawa em paleta sépia-dourado sobre azul-noite.)
6. **Pilar Espírito** — *E, por fim: o espírito.* (Imagem-âncora: vitral atravessado por luz + escadaria em espiral.)
7. **Primeiro check-in** — *O primeiro registro.* (4 perguntas breves + escala 1-5.)
8. **Encontro com Quíron** — *Um mentor discreto.* (Aviso permanente de IA no rodapé + primeira mensagem do Quíron em bolha de chat.)

**Regra visual da série:** título Great Vibes em `--omiron-marfim` sobre imagem-âncora em chiaroscuro; corpo Garamond regular em `--omiron-marfim` sobre `--omiron-fundo-profundo` semitransparente 90%; CTA em `--omiron-marfim` sobre `--omiron-ambar-crepusculo`. Textura de papiro sutil na moldura das telas dos pilares.

### 1.2 Tom do mentor Quíron

A persona completa do Quíron, incluindo as **6 dimensões de tom**, 10 exemplos de fala (5 cotidianos + 5 sensíveis) e vocabulário permitido/proibido, vive em **[`narrativa/mentor-quiron.md`](narrativa/mentor-quiron.md)** — fonte de verdade única sob autoria da Orfeu.

**Regra visual das mensagens do Quíron:**

- Bolha de chat com fundo `--omiron-fundo-elevado`, borda de `--omiron-dourado-antigo` 1px (sinaliza IA), texto em Garamond regular `--omiron-marfim`.
- Ao lado do nome *Quíron*, emblema visual persistente (silhueta discreta de centauro em `--omiron-dourado-antigo`, 20×20px) — indicação inequívoca de IA (LGPD Art. 20). SVG oficial ainda pendente.
- Primeira mensagem de cada sessão inclui marcação textual: *"Quíron é uma inteligência artificial. Não substitui consulta médica."*
- Rodapé permanente do chat: *"Quíron — assistente de inteligência artificial. Em urgências, procure atendimento humano imediato."*

**Exemplos de copy do Quíron** — 3 dos 10 canônicos (série completa em `narrativa/mentor-quiron.md §6`):

> *Paciente:* Esqueci de tomar o remédio hoje de manhã.
>
> *Quíron:* Aconteceu. Vale registrar como esquecimento no check-in de hoje — o Dr. Ariosto vê isso na próxima consulta e decide se muda algo. Se você quiser, uma pergunta antes de seguir: foi esquecimento comum, ou o dia começou fora do lugar de costume?

> *Paciente:* Você acha que eu tenho bipolaridade?
>
> *Quíron:* Essa pergunta não pertence a mim. Diagnóstico é do médico, com você na frente, com histórico completo, com tempo. O que Quíron pode fazer é lembrar que os padrões dos seus check-ins ficam guardados e vão junto para a próxima consulta com o Dr. Ariosto — ele é quem tem as ferramentas para ler esses sinais. Vale levar a pergunta para lá. *(reescrito por emenda Nomos C7 — não nomeia padrão específico para evitar sugestão diagnóstica implícita.)*

> *Paciente:* Não vejo mais sentido em nada.
>
> *Quíron:* Ouvi. Essa frase pesa. Quíron é uma inteligência artificial e não tem como avaliar o que você sente por dentro — mas essa é exatamente a frase que o Dr. Ariosto precisa saber que apareceu. Vou registrar isso no seu histórico agora. Agora: você está seguro no momento? Se houver qualquer pensamento de se machucar, o caminho é falar com um humano imediatamente — Dr. Ariosto (contato no menu), uma pessoa de confiança, ou o CVV (188). Estou aqui, mas humano é humano. *(protocolo A canonizado por Nomos §6.2 — ação automática de backend: flag + notificação ao Dr. Ariosto em <15min + log imutável + follow-up em 24h.)*

### 1.3 Gamificação — a planta virtual

A gamificação do Omiron é **uma planta que cresce silenciosamente**. É a única cor viva do sistema. Não é XP, não é ranking, não é streak agressivo, não é badge ostentativo. É uma planta.

**Regra visual dura:**

- Sprite da planta virtual usa `--omiron-verde-planta` — o **único** contexto onde este token vive. Auditoria em `03-identidade-visual.md §2.6` e `cores.md §2.6`.
- Quatro estágios visuais canônicos: **broto (7 dias) → muda (30 dias) → planta adulta (60 dias) → árvore (90 dias)** (do PRD FR-6).
- Animação de crescimento respeita a *calma noturna* — duração `--motion-duracao-lenta: 320ms`, easing natural (`cubic-bezier(0.4, 0.0, 0.2, 1)`), sem bounce, sem spring hyper-controlado.
- Período sem check-ins vira "inverno" — planta **não regride**, apenas pausa. Streak preservado. Copy de inverno: *O broto entra em inverno. A raiz espera.*
- Marco de conquista (7, 30, 60, 90 dias) exibe moldura de papiro sobre `--omiron-fundo-profundo` semitransparente, título Great Vibes em `--omiron-dourado-alto`, texto de reconhecimento em Garamond regular. Nunca push forçado, nunca "PARABÉNS!!!" com exclamação.

**Regra de gamificação (marca):** silenciosa, sóbria, respeita o silêncio. Ostentação de conquista é veto — quebra o arquétipo Sábio.

### 1.4 As 7 áreas de check-in agrupadas nos 4 pilares

O PRD (`docs/prd-omiron-app.md` FR-3) especifica 7 áreas de monitoramento. A narrativa dos 4 pilares (`narrativa/pilares.md`) organiza essas 7 áreas cosmologicamente. **Este é o mapa canônico:**

| Pilar (narrativa) | Áreas do PRD |
|---|---|
| **Corpo** (Sansão) | Medicação · Alimentação · Movimento · Tóxicos |
| **Pensamento** (Marco Aurélio *provisório*) | *(uso do check-in escrito diário como registro reflexivo — não é área separada, é a forma de todos os check-ins)* |
| **Sentimento** (Psiquê) | Gestão de Estresse |
| **Espírito** (Hécate) | Conexões Sociais · Produtividade *(sentido e propósito)* |

**Nota operacional:** o pilar Pensamento é o único que não mapeia a uma "área" isolada do PRD, e essa é a decisão certa — o pensamento é o próprio *ato* de registrar, presente em todos os check-ins. Coerente com a Alternativa B recomendada por Orfeu (Biblioteca de Alexandria como âncora — o pilar é o lugar onde se escreve, não uma área separada).

**Cor de destaque de cada pilar na interface:** *não* usar cores diferentes por pilar. O mundo Omiron é dark-mode canônico único; a diferenciação entre pilares vive na **iconografia autoral** (ícones SVG dos 4 pilares — pendentes) e no **título tipográfico** (Great Vibes ou Garamond grande). Não em variação de cor de fundo. Regra viva em `03-identidade-visual.md §2.6`.

### 1.5 Home do paciente — layout de marca

**Estrutura canônica** (topo → base):
1. Saudação Great Vibes em `--omiron-marfim` sobre `--omiron-fundo-profundo` — nome do paciente, cadência de convite.
2. Frase do dia (`FR-10` do PRD — 31 frases históricas verificadas) em Garamond italic, `--omiron-marfim-suave`, sem cabeçalho "Frase do Dia™" — vive como lápide de biblioteca (regra de `tom-visual.md §1 Erudição`).
3. Planta virtual no estágio atual — sprite `--omiron-verde-planta`, animação sóbria.
4. Próxima ação sugerida — CTA em Garamond medium sobre `--omiron-ambar-crepusculo`.
5. Streak atual em Garamond regular, `--omiron-marfim-suave`.
6. Próximo retorno em destaque — dado numérico em Garamond semibold (regra clínica), `--omiron-marfim`.

**Regra dura:** máximo 3 elementos competindo por atenção primária. Regra de foco em `tom-visual.md §3` (*densidade máxima por elemento, densidade mínima por tela*).

## 2. Receita física — o papiro tátil

A receita médica que o Dr. Ariosto emite hoje passa a ser rearquitetada sobre **papiro integral** como assinatura tátil da Clínica Omiron. Decisão travada na reunião 01/07/2026 (verbalizada pelo Dr. Ariosto: *"customizar a receita médica que eu faço para ter design de papiro"*).

### 2.1 Regra visual

- **Fundo:** papiro (`--omiron-fundo-marfim` com textura sutil de fibras).
- **Cabeçalho:** símbolo Omiron em `--omiron-marrom-couro` (SVG pendente) + nome da clínica em Great Vibes `--omiron-marrom-couro` + linha divisória fina em `--omiron-dourado-antigo`.
- **Corpo da prescrição:** Garamond regular em `--omiron-marrom-couro` sobre `--omiron-fundo-marfim` — contraste 9.28:1 (AAA em cores.md §5.2).
- **Nome do medicamento e dose:** Garamond semibold — ênfase clínica canônica.
- **Assinatura do médico:** Great Vibes em `--omiron-marrom-couro`, tamanho hero.
- **Rodapé:** CRM, endereço, telefone da clínica em Garamond regular, tamanho caption.

### 2.2 Copy modelo

**Cabeçalho da receita:**

> Clínica Omiron · Dr. Ariosto Filho
>
> *Belo Horizonte · MG*

**Rodapé (permanente):**

> *Receita eletrônica emitida por Dr. Ariosto Filho, CRM XX.XXX/MG. Para dúvidas sobre uso ou efeitos, procure o consultório ou o Omiron.*

### 2.3 Estado

Layout final do papel timbrado precisa ser produzido em fase separada (não faz parte deste brandbook). O que este brandbook trava é: **regra visual + copy modelo + tokens semânticos**. A implementação vira tarefa em rodada específica com o Dr. Ariosto.

## 3. Instagram do Dr. Ariosto — a linha editorial papiro

O Instagram do Dr. Ariosto passa a operar como **extensão editorial da marca Omiron**. Decisão travada na reunião 01/07/2026 (verbalizada pelo Dr. Ariosto: *"colocar o post que tem também essa linha editorial"*).

### 3.1 Regra visual do grid

- **Fundo padrão:** papiro (`--omiron-fundo-marfim` com textura de fibras) em todos os posts do grid editorial Omiron.
- **Tipografia:** título em Great Vibes `--omiron-marrom-couro` (nunca sobre fundo escuro em post — o grid é claro por decisão editorial); corpo em Garamond regular `--omiron-marrom-couro`.
- **Ornamentação:** linha divisória fina em `--omiron-dourado-antigo`; ícone autoral em `--omiron-marrom-couro` stroke 1.5.
- **Imagem de fundo (alternada):** cenário clássico em chiaroscuro (escadaria, biblioteca, colunata, abóbada) com overlay de papiro 40% para preservar legibilidade.
- **Rückenfigur** (silhueta de costas contemplando horizonte) como fotografia-âncora de posts de reflexão longa.
- **Rodapé fixo obrigatório em cada post** (orientação Nomos — CFM Res 2.336/2023 sobre publicidade médica): *"Conteúdo institucional da Clínica Omiron — Dr. Ariosto Filho, CRM XX.XXX/MG. Este post não substitui consulta psiquiátrica."* Em pé de post ou primeiro comentário fixado. Ver `compliance-checklist.md §7.3`.

### 3.2 Frequência e conteúdo sugerido

*Recomendação editorial — não trava operacional (fica com Caliope + Pheme na produção contínua):*

- **2 a 3 posts semanais.** Menos que isso perde presença; mais que isso quebra a sensação de "biblioteca".
- **Formatos:** citação clássica (1 imagem, epígrafe + tradução curta), reflexão do médico (3 imagens em carrossel, texto Garamond), micro-narrativa de pilar (4 imagens em carrossel, uma figura por pilar).
- **Never:** foto do consultório com cliché de "sessão em andamento", stock corporate de mão apertando outra, reels dançando, "3 dicas para tratar ansiedade".

### 3.3 Exemplos de copy

**Post 1 — Citação clássica (formato 1 imagem, quadrado):**

*Imagem:* fundo papiro + linha dourada + moldura fina.

*Título (Great Vibes):* Marco Aurélio

*Corpo (Garamond regular):*
> A vida é o que os nossos pensamentos fazem dela.

*Tradução curta (Garamond italic):*
> Não somos governados pelo que acontece, mas pelo que pensamos sobre o que acontece.

**Post 2 — Reflexão do médico (carrossel de 3):**

*Slide 1 (título Great Vibes sobre imagem em chiaroscuro):* O intervalo importa

*Slide 2 (Garamond regular sobre papiro):*
> O tratamento psiquiátrico não acontece na consulta. A consulta é um encontro; o tratamento é o que vive entre um encontro e o outro. Nas manhãs em que o remédio é tomado, ou não. Nas noites em que o sono vem, ou foge.

*Slide 3 (Garamond regular sobre papiro):*
> É por isso que o Omiron existe — não para substituir o médico, mas para tornar visível o intervalo. O que ganha nome perde parte do poder.

*Assinatura visual:* símbolo Omiron em `--omiron-marrom-couro`.

**Post 3 — Micro-narrativa de pilar (carrossel de 4, um por pilar):**

Cada slide: fundo papiro + imagem-âncora do pilar (Sansão em pedra, biblioteca de Alexandria, Grande Onda de Kanagawa, vitral atravessado por luz) + título Great Vibes + frase-âncora do pilar em Garamond regular.

## 4. E-mail transacional

Cabeçalho de e-mail Omiron: fundo `--omiron-fundo-marfim` (papiro sutil) + símbolo em `--omiron-marrom-couro` + linha divisória fina em `--omiron-dourado-antigo`. Corpo: fundo `--omiron-fundo-profundo`, texto Garamond regular `--omiron-marfim`. Rodapé: `--omiron-fundo-marfim` + Garamond caption em `--omiron-marrom-couro`.

Quatro modelos canônicos, um exemplo cada.

### 4.1 Welcome — 1º acesso confirmado

**Assunto:**

> Bem-vindo ao caminho, [Nome].

**Corpo:**

> O Omiron guarda o que passa pelo seu dia — não para prender, mas para tornar visível ao Dr. Ariosto o que a consulta não alcança sozinha.
>
> Seu primeiro check-in é breve: quatro perguntas, uma por pilar. Se hoje não for o dia, amanhã ele espera. O caminho aceita seu ritmo.
>
> *Quíron — o mentor de inteligência artificial do aplicativo — está disponível quando você quiser refletir sobre algo. Ele reflete e provoca; nunca diagnostica ou prescreve.*

**CTA:**

> Ir ao primeiro registro

### 4.2 Confirmação de check-in

*(Ver §5.3 do capítulo `02-voz-da-marca.md` — modelo canônico completo.)*

### 4.3 Resumo semanal para o paciente

**Assunto:**

> A semana no seu caminho

**Corpo:**

> Nesta semana o corpo respondeu em 5 dos 7 dias. O pensamento voltou uma ideia recorrente: [padrão observado sem nomear diagnóstico]. O sentimento oscilou entre [X] e [Y] — Psiquê nos lembra que o trabalho não é apagar a onda, é atravessá-la sem deixar arrastar a vida junto.
>
> O Dr. Ariosto verá esses padrões na próxima consulta, dia [data]. Se quiser preparar algo específico para levar, o chat com Quíron está aberto.

**CTA:**

> Ver semana completa

**Regras duras deste modelo:**
- **Nenhum diagnóstico.** Nunca "seu quadro melhorou", "sua depressão está X". Só descrever padrão observado.
- **Métrica sóbria.** "5 dos 7 dias" é dado; "você foi incrível!" é veto.
- **Encaminhamento ao médico.** Sempre nomeando o Dr. Ariosto e a próxima consulta.

### 4.4 Resumo mensal para o médico

**Assunto:**

> [Paciente Nome] — resumo do mês | Omiron

**Frase de guarda canonizada por Nomos (obrigatória no cabeçalho — reduz risco de classificação SaMD ANVISA Classe B):**

> *Este resumo é uma visualização dos dados autoreportados pelo paciente no aplicativo Omiron. Não constitui interpretação clínica, laudo, sugestão diagnóstica ou orientação terapêutica. A leitura clínica é do médico responsável (Dr. Ariosto Filho, CRM XX.XXX/MG) em consulta.*

**Corpo:**

> Dr. Ariosto,
>
> Resumo consolidado do mês de [mês] do paciente [Nome]:
>
> - Adesão à medicação: [X]/[Y] dias
> - Escalas preenchidas: HAM-A (score [Z] — anterior [W]) | HAM-D (score [Z] — anterior [W])
> - Padrões observados: [3 bullets sóbrios, descritivos, sem interpretação diagnóstica]
> - Marcos: [conquistas de streak — 7d, 30d, 60d, 90d]
> - **Registros com desvio ≥ 1 σ da linha de base do próprio paciente** *(renomeado por emenda Nomos C4 — antes: "sinais que merecem atenção clínica" — vocabulário de visualização, não de interpretação)*: [bullets — sem alarme, com timestamps]
>
> Dashboard completo, gráficos e histórico de check-ins estão no seu painel Omiron.

**CTA:**

> Abrir painel

**Regras duras deste modelo:**
- Formato clínico sóbrio. Dado numérico em Garamond semibold. Sem prosa emotiva.
- Sinalização de desvio da linha de base do próprio paciente nunca vira alarme automático — é observação estatística para o médico decidir.
- Nunca inclui PII em screenshots ou mockups deste modelo no brandbook.
- Frase de guarda no cabeçalho é **obrigatória** — reduz zona cinzenta SaMD ANVISA. Ver `compliance-checklist.md §8.2 Ponto 1`.

## 5. Deck comercial — padrão Rosie

O deck comercial do Omiron (para reunião com o Dr. Ariosto em 08/07, para futuros investidores da Fase 2, para materiais de venda B2B) segue o **padrão Rosie** validado no projeto Rosie 2026-07-01:

- **Layout:** full-height (100vh por slide), scroll-snap, nav lateral fixa 220px.
- **Cadência tipográfica:** Great Vibes em capa/separador + EB Garamond em corpo.
- **Fio-loop de cor primária:** `--omiron-dourado-antigo` em palavras-chave dispersas ao longo dos slides — cria assinatura visual sem imposição.
- **Footer permanente:** timestamp + marca (*Omiron · [data] · Clínica Dr. Ariosto Filho*).
- **Capa e separadores de seção:** sobre papiro (`--omiron-fundo-marfim` texturizado).
- **Slides de conteúdo denso:** sobre `--omiron-fundo-profundo` com texto `--omiron-marfim` (canônico 15.02:1).

**Estado:** a renderização do deck de apresentação em `omiron/apresentacao/` (index.html + deck-conteudo.md padrão Rosie) é responsabilidade da **Onda 4 — consolidação visual** desta missão, executada após esta Onda 1A e após Nomos (Onda 3). Este capítulo trava as **regras de marca** para o deck; a implementação é rodada separada.

**Orientação Nomos (para versão comercial B2B Fase 2):** toda versão comercial do deck que sair para prospect externo (clínicas parceiras, investidores, distribuidores) **passa por Nomos gate antes** — regras duras em `compliance-checklist.md §7.4`: zero PII em screenshots (usar dados fictícios claramente marcados como "exemplo ilustrativo"), zero testemunho identificável de paciente, métricas apresentadas como *dados observacionais do piloto* (nunca como *"eficácia comprovada"*), toda projeção com nota metodológica (base amostral, período, condições, limites de generalização).

---

## Ganchos de rastreabilidade

- **Onboarding (copy completo):** `narrativa/onboarding-copy.md`.
- **Mentor Quíron (persona + 10 exemplos):** `narrativa/mentor-quiron.md`.
- **4 pilares (cosmologia):** `narrativa/pilares.md`.
- **Alternativa Marco Aurélio (3 opções para Ariosto em 08/07):** `narrativa/alternativa-marco-aurelio.md`.
- **Design system (tokens, cores, tipografia, tom):** `../design-system/01-fundamentos/`.
- **Regra do verde-planta RESTRITO:** `../design-system/01-fundamentos/cores.md §2.6`.
- **PRD (7 áreas de check-in, gamificação, escalas):** `../docs/prd-omiron-app.md`.
- **Deck padrão Rosie (molde):** `../../rosie/apresentacao-bruno-2026-07-01/deck.html` (referência de layout).
- **Textura papiro (pendente binário):** `05-manual-operacional.md §Tensões abertas`.
- **Ícones dos 4 pilares (SVGs pendentes):** `05-manual-operacional.md §Tensões abertas`.
- **Símbolo Omiron (SVG pendente):** `05-manual-operacional.md §Tensões abertas`.
