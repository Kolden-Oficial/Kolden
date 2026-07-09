---
id: 01-fundamentos-tom-visual
titulo: "Omiron — Fundamentos de Tom Visual (Design System v1)"
resumo: "Mood board em prosa. O que Omiron TRANSMITE ao olhar antes mesmo de ler: erudição, calma noturna, foco, elegância imperfeita, humano sob mármore. Guia calibração emocional para toda decisão visual downstream (Aglaia no capítulo 03-identidade-visual, Orfeu na narrativa, Hefesto na implementação futura)."
categoria: projeto
status: oficial
atualizado-em: 2026-07-06
autor: Harmonia (design-chief)
missao: m-20260706-193013-omiron-brandbook-completo
insumos:
  - docs/pesquisa-referencias/canva-thumbnails/slide-{18,19,20,21,22}.png
  - docs/pesquisa-referencias/decisoes-consolidadas-brand.md
  - docs/pesquisa-referencias/pinterest/pinterest-ariosto-analise.md
relacionados:
  - 01-fundamentos/cores.md
  - 01-fundamentos/tipografia.md
  - 01-fundamentos/grafismos.md
---

# Tom Visual — Omiron

> Este documento não descreve como algo VAI PARECER. Descreve como algo VAI SENTIR. É a calibração emocional que Aglaia, Orfeu, Hefesto e qualquer outro squad downstream vão usar para decidir se algo pertence ou não ao mundo Omiron. Um card, uma cor, um ícone, um copy — se transmite qualquer uma das cinco sensações abaixo, pertence. Se transmite outra coisa, não pertence.

## 1. Erudição

Não é ostentação de conhecimento. É a densidade tranquila de quem estudou muito e não precisa provar.

Erudição no Omiron se manifesta assim: uma epígrafe de Marco Aurélio abre a tela do check-in de manhã, sem exclamação, sem cabeçalho "Frase do Dia™". Ela está ali como uma lápide na parede da biblioteca — quem quer, lê. Quem passa, sente que existe algo mais profundo que o app oficialmente entrega.

A tipografia serifa clássica é erudição. O papiro é erudição. A escolha do latim "Omiron" (não "Insight Health™") é erudição. O nome do mentor "Quíron" (não "Bot da Saúde") é erudição.

O oposto de erudição no Omiron é **jargão de moda**. "Biohacking", "unlock potential", "transformação", "unlock your best self". Vetado. O mundo Omiron não usa essas palavras porque quem estudou de verdade não precisa delas.

**Calibração**: se uma decisão visual soa como palestra motivacional de LinkedIn, ela é o oposto de erudição. Refazer.

## 2. Calma noturna

Dark-mode não é preferência estética — é identidade. A luz do Omiron é a luz de biblioteca à noite, de vela na madeira, de janela da catedral em fim de tarde.

O paciente que abre o Omiron às 22h30 antes de dormir precisa sentir a mesma coisa que sente ao entrar numa igreja europeia de madrugada: silêncio, respiro, permissão para pausar. Não é a mesma coisa que "modo escuro reduz cansaço visual". É que a NOITE, como estado, é o momento em que o paciente psiquiátrico mais precisa do produto — e o produto precisa parecer que sabe disso.

A calma noturna se manifesta no fundo profundo `#141010` (não preto puro, quente), no marfim que substitui o branco, na luz âmbar crepúsculo do CTA (não neon), na animação que respira devagar (`--motion-duracao-lenta: 320ms`, não 100ms hyper).

O oposto de calma noturna é **alerta hospitalar**. Vermelho brilhante, azul-marinho clinical-cold, sirene visual, notificação forçada. Vetado. Se um alerta é necessário (erro, dado ausente), ele usa âmbar terra `#9E5528` acompanhado de ícone e texto — nunca vermelho brilhante genérico.

**Calibração**: se uma decisão visual funciona bem em pronto-socorro, ela é o oposto de calma noturna. Refazer.

## 3. Foco

O maximalismo do Omiron é OrnAMENTAL, não visual. O ornamento vive na moldura, na textura, na epígrafe — o CONTEÚDO precisa ser LIMPO.

Isso resolve a tensão registrada como aberta no contrato de missão ("maximalismo × UX simples"). A resolução Harmonia é: **cada elemento é maximalista, o layout é minimalista**. O card tem borda dourada rica e fundo com textura sutil — MAS só há 3 cards na tela. O botão tem tipografia serifa clássica com letra medium e cor âmbar crepúsculo — MAS a tela tem UM botão principal. A epígrafe é de Marco Aurélio — MAS aparece uma vez por tela.

Foco no Omiron significa: **densidade máxima por elemento, densidade mínima por tela**. É o oposto tanto do minimalismo escandinavo (que remove o ornamento) quanto do maximalismo caótico (que empilha ornamentos).

**Calibração**: se uma tela tem 5+ elementos competindo por atenção, ela é o oposto de foco. Reduzir para 3.

## 4. Elegância imperfeita

O papiro NÃO É plano. Tem fibras, mancha sutil, degradê de canto. Não é folha A4 branca digital. É pergaminho autêntico envelhecido.

Great Vibes NÃO É perfeitamente uniforme. Os glifos variam de espessura como se fossem escritos com nanquim e pena. Não é fonte geométrica de 8 pesos.

O ícone de tocha do pilar Corpo/Sansão NÃO É pixel-perfect Feather Icons. Tem stroke-width 1.5 com cantos arredondados humanistas. Sente-se que alguém desenhou, não que um algoritmo gerou.

**Elegância imperfeita** é a palavra-chave que separa o Omiron de qualquer "design system de saúde tech premium" genérico. Todos os concorrentes têm SF Pro, Roboto, ilustração Figma vetorizada, gradiente rosa-para-lilás. O Omiron tem serifa clássica, papiro, chiaroscuro. É elegante porque é imperfeito.

O oposto de elegância imperfeita é **perfeição digital sem alma**. Sans-serif geométrica moderna, ilustração vetorial pura, gradiente digital óbvio, animação spring hyper-controlada. Vetado.

**Calibração**: se uma decisão visual funcionaria idêntica em fintech, e-commerce e clínica psiquiátrica, ela é perfeição digital sem alma. Refazer com imperfeição autoral.

## 5. Humano sob mármore

O Omiron é sobre pessoas — adultos em tratamento psiquiátrico, buscando excelência, não rótulo de doente. Mas o Omiron NÃO recorre a fotografia de pessoas sorridentes em capa. Não usa mascote humano. Não usa avatar antropomórfico.

Como ele carrega o HUMANO? Sob mármore.

A estátua de Sansão é a representação do PILAR corpo. É pedra, tem musculatura, é a mesma figura que ficou 500 anos numa igreja renascentista. O paciente olha para ela e projeta si mesmo — não em uma foto perfeita de modelo em roupa esportiva Instagram, mas em uma FIGURA que dura séculos e representa uma dimensão humana.

O nome do médico em Great Vibes é humano. O tom da mensagem do Quíron é humano (Orfeu escreve na Onda 2). A saudação do dia é humana. A conquista da planta virtual é humana. Mas o PIXEL não é humano — ele é mármore, papiro, capitel dourado.

Essa contradição é o produto. É por isso que o app psiquiátrico Omiron não parece app psiquiátrico: porque ele SE RECUSA a colocar humano exposto no pixel. Ele coloca humano em CADA CAMADA — narrativa, tom, ritual, jornada — mas o pixel visual carrega mármore.

**Calibração**: se uma decisão visual mostra "pessoa sorrindo enquanto usa o app", ela é o oposto de humano sob mármore. Substituir por estátua clássica, epígrafe, momento arquitetônico.

## 6. Como usar este documento downstream

Aglaia (capítulo 03-identidade-visual do brandbook), Orfeu (narrativa dos pilares) e Hefesto (implementação futura do app) usam este documento como PENEIRA emocional.

Fluxo de uso:

1. **Antes de tomar uma decisão visual/narrativa**, ler as 5 seções (Erudição, Calma noturna, Foco, Elegância imperfeita, Humano sob mármore).
2. **Testar a decisão contra cada uma**: "Isso transmite erudição? Sim/Não. Calma noturna? Sim/Não. Foco? Sim/Não. Elegância imperfeita? Sim/Não. Humano sob mármore? Sim/Não."
3. **Contagem**: se a decisão transmite ≥ 4 das 5, ela pertence. Se ≤ 2, ela NÃO pertence — refazer. Se 3, discutir com Harmonia para desempate.
4. **Registrar** a análise no artefato de decisão (comment no MD, PR description, ata de reunião).

Este é o teste de aceite qualitativo do design system Omiron. É complementar à validação técnica (contraste WCAG, tamanho tipográfico mínimo, `tabular-nums`) — a técnica garante que FUNCIONA, o tom visual garante que PERTENCE.

## 7. Anti-padrões emocionais nomeados

Além dos vetos técnicos em `grafismos.md §4`, há vetos emocionais. Se qualquer decisão futura evoca uma das sensações abaixo, é veto:

- **"App de saúde mental fofinho"** — mascote sorridente, bolinhas, animação bouncy. Não.
- **"Wellness tech Instagram"** — gradiente rosa-lilás, tipografia sans-serif com pesos variáveis modernos, foto de mulher em athleisure. Não.
- **"Clinical-cold hospitalar"** — azul-marinho, sans-serif, foto de jaleco, ícone estetoscópio. Não.
- **"Motivacional palestra LinkedIn"** — "Você consegue!", "Transforme sua vida!", "Unlock your potential!". Não.
- **"Biohacking dashboard"** — dados densos, gráficos vibrantes, gamificação por pontos ostentativa. A gamificação Omiron é UMA planta que cresce, silenciosamente. Não é XP nem streak agressivo.
- **"Meditação genérica"** — mandala, mudra, cor pastel, ambient music. Omiron NÃO é app de meditação — é monitoramento terapêutico psiquiátrico com narrativa erudita. Não.

## 8. Ganchos de rastreabilidade

- Sensação-âncora emocional confirmada em reunião 01/07/2026: "Você entra numa catedral europeia e se sente elevado."
- Cliente rejeitou explicitamente "app de saúde mental fofo", "biohacking", "wellness Instagram", "clinical-cold" (registrado em `decisoes-consolidadas-brand.md`).
- Referências ao board Pinterest de Ariosto (Friedrich Rückenfigur, chiaroscuro Caravaggio, Hokusai onda, Van Gogh noite estrelada, afrescos Michelangelo) fundamentam as 5 sensações.
- Este documento é insumo direto do capítulo 03-identidade-visual da Aglaia e da narrativa da Orfeu.
