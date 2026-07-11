---
name: walkthrough-de-persona
description: |
  Use quando precisar AUDITAR uma página/landing/produto simulando o percurso de personas-arquétipo
  com 3 modos: 5-second test (primeira impressão), scroll monologue (think-aloud por fold),
  decision-point analysis (cada CTA + objeção). Produz relatório com timestamps de fricção e
  gatilhos LIFT/Cialdini DETECTADOS por fold. NÃO escreve copy persuasiva (essa é Caliope/robert-cialdini)
  — esta skill AUDITA presença de gatilhos, não os PRODUZ.
domain: design
subdomain: ux-auditoria
agente_primario: [harmonia-chief]
tags: [walkthrough, persona, lift, cialdini, auditoria-de-pagina, 5-second-test, scroll-monologue]
fonte_upstream: msitarzewski--agency-agents@a597cb6 (G10, G11, G12)
tipo: skill
area: Harmonia
up: "[[Harmonia/_MOC-harmonia]]"
---

<!--
Procedência: princípios absorvidos e reescritos em PT-BR de
github.com/msitarzewski/agency-agents@a597cb6 (licença MIT — IDs G10, G11, G12).
Sem cópia literal do upstream; uso interno Kolden.
-->

# Walkthrough de persona — auditoria de página por percurso simulado

A Harmonia audita interfaces simulando o **percurso real** de uma persona-arquétipo pela página.
Esta habilidade **AUDITA** presença de gatilhos persuasivos, não os **PRODUZ** — escrever copy
persuasiva é jurisdição de Caliope/robert-cialdini.

## Fronteira crítica com Caliope/robert-cialdini

> **Esta skill AUDITA. Caliope ESCREVE.** Se a auditoria detectar gatilho ausente E necessário,
> a saída faz **handoff explícito** para Caliope/robert-cialdini com a evidência por fold —
> nunca tenta consertar reescrevendo copy aqui dentro.

Repetido em 3 lugares por design: (1) frontmatter, (2) esta seção, (3) anti-padrões.

## Quando aplicar

Use quando o pedido envolver **diagnóstico de UX/conversão de uma página existente** simulando
o olhar de quem chega: landing page, página de venda, checkout, onboarding, dashboard inicial,
formulário longo. Pule em backend, API, scripts sem superfície visível e em projetos onde a
persona ainda não foi definida (rode `pesquisa-qualitativa-de-usuario` ou a Aletheia antes).

## Os 3 modos de walkthrough

A escolha do modo depende do que se quer descobrir:

| Modo | Pergunta que responde | Output principal |
|---|---|---|
| **5-second test** | "O que essa página comunica em 5 segundos?" | 3-5 frases que a persona articula após 5s |
| **Scroll monologue** | "Onde a persona trava enquanto rola?" | Timeline com timestamps de fricção |
| **Decision-point analysis** | "O que segura a persona em cada CTA?" | Matriz CTA × persona × objeção × gatilho |

### Modo 1 — 5-second test

**Simulação:** a persona vê a página por 5 segundos, depois descreve o que entendeu.

**Protocolo:**
1. Defina a persona (nome, contexto, objetivo ao chegar).
2. Renderize a página acima do fold em viewport real (desktop + mobile separados).
3. Simule o olhar inicial — onde a vista pousa primeiro, segundo, terceiro.
4. Escreva 3-5 frases que a persona conseguiria articular após 5s.

**Diagnóstico:**
- Se a persona **não diz X em 5s**, então X **não está claro** na página.
- O que falta na fala é o que falta no design.

**Erro comum:** descrever o que está na página (auditor olhando), não o que a persona percebe.
A diferença é abismal — escreva sempre na voz da persona.

### Modo 2 — Scroll monologue

**Simulação:** a persona percorre a página verbalizando pensamento (think-aloud).

**Protocolo:**
1. Persona definida (incluindo objetivo + estado emocional ao chegar).
2. Percorra fold por fold registrando: o que a persona vê, lê, pensa e sente.
3. Marque **timestamps de fricção** — segundo aproximado em que a persona hesita, releia,
   volta ou abandona.
4. Cobertura obrigatória: cada fold + cada elemento interativo (botão, link, campo, vídeo).

**Output:** timeline cronológica.

```
00:00  [hero]      "Ok, é uma ferramenta de monitoramento. Quanto custa?"
00:04  [hero CTA]  "Não sei o que esse 'Comece agora' vai fazer. Vai cobrar?"
00:11  [fold 2]    "Espera, isso é para hospital ou para mim?"  ← fricção
00:23  [prova]     "Esses logos são reais? Não conheço nenhum."  ← fricção
```

### Modo 3 — Decision-point analysis

**Simulação:** a persona em cada CTA — qual fricção, qual objeção, qual gatilho ativo.

**Protocolo:**
1. Liste **todos** os CTAs primários e secundários da página.
2. Para cada CTA, escreva: contexto (o que vem antes), fricção (o que segura), objeção
   (a frase mental da persona), gatilho detectado (qual dos 7 está ativo no entorno).

**Output:** matriz CTA × persona × objeção × gatilho-detectado.

| CTA | Persona | Objeção mental | Gatilho ativo | Gatilho ausente/necessário |
|---|---|---|---|---|
| "Comece agora" (hero) | Médico ocupado | "Vai me cobrar? Não vi preço." | nenhum | escassez ausente, prova fraca |
| "Falar com vendas" | Diretor clínico | "Vão me ligar sem parar." | autoridade (médico-aval) | unidade ausente |

## Rubrica LIFT — anexo executável por fold

Avalie **cada fold** nas 6 dimensões do modelo LIFT, score 1-10:

| Dimensão | Pergunta-âncora | Vermelho (1-4) | Amarelo (5-7) | Verde (8-10) |
|---|---|---|---|---|
| **Value Proposition** | A oferta é clara? Para quem? Por quê agora? | sem proposta visível | proposta vaga | proposta + para-quem + porquê |
| **Relevance** | Casa com a persona que chegou? | linguagem genérica | metade casa | persona se reconhece |
| **Clarity** | Visual e verbal entregam a mensagem? | confuso | ok com esforço | claro à primeira leitura |
| **Urgency** | Há razão para agir agora? | nenhuma | implícita | explícita e crível |
| **Anxiety** | Quais objeções ficam sem resposta? | várias graves | algumas | tratadas no fold |
| **Distraction** | O que tira o foco da ação principal? | muitas distrações | algumas | foco preservado |

Pontue cada dimensão em **cada fold separadamente** — a página varia de qualidade ao longo do scroll.

### Três perguntas-âncora da Value Proposition (não negociar)

Toda Value Proposition precisa responder, dentro do fold em que aparece:
1. **O que é** o produto/oferta?
2. **Para quem** é?
3. **Por que** essa pessoa deveria se importar agora?

Faltando uma das três, score de Value Proposition **não passa de 5**, independente do resto.

## Rubrica Cialdini-presença — detecção (não escrita) por fold

Marque cada um dos 7 gatilhos por fold com **PRESENTE** / **AUSENTE** / **PRESENTE-MAS-FRACO**.
Onde o gatilho é **ausente E necessário**, gere handoff explícito para Caliope/robert-cialdini.

| Gatilho | O que conta como PRESENTE | O que conta como FRACO |
|---|---|---|
| **Reciprocidade** | algo entregue antes de pedir (template, guia, demo livre) | "ganhe um e-book" sem valor verificável |
| **Compromisso/consistência** | micro-yes anterior que ancora o próximo passo | pedido grande sem ancoragem |
| **Prova social** | número específico + fonte verificável | "milhares confiam" sem número |
| **Autoridade** | credencial nominal e verificável | "líder do mercado" sem evidência |
| **Afinidade** | "para gente como você" com sinal real (foto, nome, contexto) | foto de stock sem nome |
| **Escassez** | tempo/quantidade real e verificável | "últimas vagas" perene |
| **Unidade** | identidade compartilhada ("nós, [grupo]") | "junte-se à comunidade" genérico |

**Regra de evidência:** marcar PRESENTE exige citar o elemento visual ou textual exato do fold.
Sem citação, não vale.

## Anti-padrões — proibidos por design

- **Walkthrough sem persona definida** — vira "minha opinião" de auditor; resultado inútil.
- **Detectar gatilhos sem evidência visual citada** — vira intuição, não auditoria.
- **Confundir auditoria com escrita** — "vou melhorar o copy aqui" é trabalho de Caliope.
  Saída desta skill é **diagnóstico + handoff**, nunca copy reescrito.
- **Walkthrough genérico (1 persona para todos os públicos)** — página B2B + B2C precisa de
  walkthroughs separados; senão o resultado é mediano para todos.
- **LIFT sem score numérico** — vira retórica. O número força disciplina.
- **Ignorar mobile** — 5-second test em mobile é diferente: viewport menor, scroll mais rápido,
  hierarquia desktop quebra. Rode os dois.
- **Tratar fricção como "usuário burro"** — fricção é defeito do design, não do usuário.

## Saída padrão

Relatório por fold contendo:

1. **Identificação do fold** (hero, fold 2, fold 3, CTA-zone, etc.) + screenshot/descrição.
2. **LIFT score** por dimensão (6 números 1-10) com 1 linha de justificativa cada.
3. **Cialdini-presença** por gatilho (PRESENTE/AUSENTE/FRACO) com citação visual.
4. **Timestamps de fricção** do scroll monologue (se aplicado).
5. **Objeções não tratadas** (lista da persona, voz da persona).
6. **Recomendação:**
   - Para problemas de **visual/hierarquia/layout** → handoff para Harmonia/sistema-de-design.
   - Para problemas de **copy/persuasão/gatilho ausente** → handoff explícito para
     Caliope/robert-cialdini com a evidência da auditoria.

## Cross-links

- **Caliope/robert-cialdini** — handoff bidirecional. Esta skill **audita** presença de
  gatilhos. Caliope **escreve** os gatilhos quando ausentes.
- **Harmonia/sistema-de-design** — o design system informa a rubrica de Clarity (tipografia,
  hierarquia, espaçamento) e a rubrica de Distraction (uso de cor de acento).
- **Harmonia/pesquisa-qualitativa-de-usuario** — fornece personas empíricas (não inventadas)
  para alimentar o walkthrough.
- **Aletheia/roteiro-de-entrevista** — personas validadas pelo Mom Test são insumo legítimo
  para os walkthroughs aqui.
