---
name: demo-invertida-por-impacto
description: |
  Demo B2B/SaaS estruturada pela DOR (impacto-primeiro), não pelo produto (feature-primeiro).
  Abre pelo "wow" (o resultado final que resolve a dor específica do prospect), valida a
  hipótese de dor em voz alta, e só então mostra o COMO. Regra dura: "no feature no ask" —
  cada bloco de feature exige um micro-ask ("faz sentido?") antes de avançar. Use quando
  o SE/AE vai apresentar o produto a um lead qualificado, pós-discovery. NÃO usar como
  substituto de discovery (isso é `spin-selling` / `sandler-pain-funnel`).
domain: sales-enterprise
subdomain: sales-engineering
tier: 1
agente_dono: engenheiro-de-pre-vendas
heranca_historica:
  - chris-orlob
  - gong-labs
  - peter-cohan-great-demo
fonte_upstream: msitarzewski--agency-agents@a597cb6 (G19)
status: semente
---

# Demo Invertida por Impacto

> Antítese do "feature dump" ("e aqui temos… e também temos… e ainda temos…"). Começa
> pelo IMPACTO — a tela que responde à dor específica do prospect — e desce ao COMO só
> depois de validar que a dor está certa. É a estrutura de demo com maior taxa de
> conversão medida em call analytics enterprise (Gong, Chorus, ExecVision).

## Herança histórica

- **Peter Cohan — "Great Demo!" (2005, 4ª ed. 2020)**. Livro-base. Argumento central:
  a "Illustration First" — mostrar o resultado final na tela 1 (a "última tela" que o
  usuário veria após 30 min de uso), antes de qualquer setup. Método "Vision Generation"
  → "Do It" → "Peel Back the Layers". Cohan cunhou a regra "não comece pela navegação;
  comece pelo destino".
- **Chris Orlob — Gong Labs Research (2018+)**. Análise de 100k+ demos gravadas em SaaS
  B2B. Descoberta empírica: demos com abertura por impacto ("aqui está o resultado que X
  cliente teve") convertem 2–3× mais que demos com abertura por navegação ("deixa eu te
  mostrar a home"). Publicou dezenas de estudos em gong.io/blog. Vocabulário
  característico: "monólogo do rep", "objection stacking", "reverse demo".
- **Robert Riefstahl — "Demonstrating to Win!" (2003)**. Fonte da metodologia Demo2Win
  (mercado enterprise). Introduz "Tell-Show-Tell" — anuncia o wow, mostra, valida.
- **Refino contemporâneo — Presales Collective (2020+)**. Comunidade global de Sales
  Engineers. Codificou "no feature no ask" como regra hard: nenhum bloco de feature
  avança sem confirmação de interesse do prospect.

## Estrutura em 4 blocos

### Bloco 1 — Impacto (30–60 seg)
A **última tela primeiro**. Não é o dashboard vazio; é o dashboard com o número que
resolve a dor do prospect.
- Rep: "Antes de te mostrar como funciona, olha isso — esse é o painel de um cliente
  do teu tamanho que estava com o mesmo gargalo de [dor X]. Antes: [métrica ruim].
  Depois: [métrica boa]. Em [tempo]. É esse o resultado que quero te mostrar como
  chegar. Faz sentido a gente destrinchar como?"

**Regra**: mostrar UM impacto, específico, ancorado na dor levantada no discovery.
Se o discovery mapeou 3 dores, escolher a que mais dói — não tentar cobrir as três
no impacto. Feature dump inverso é tão ruim quanto o normal.

### Bloco 2 — Validação da hipótese (2–3 min)
Pergunta direta que confirma ou ajusta o rumo.
- "Baseado no que a gente conversou na última call, minha leitura é que o que mais
  vale destrinchar é [X]. Antes de eu abrir o produto, confirma comigo: é isso mesmo
  ou tem algo que mudou de peso?"

**Se o prospect ajusta a hipótese**: adapte a demo em tempo real. Melhor sair 40% da
demo planejada e endereçar a dor real do que executar o script perfeito da dor errada.

### Bloco 3 — O como (10–15 min)
Fluxo enxuto que prova o wow. Cada micro-etapa termina em **micro-ask** ("no feature
no ask").
- Passo A → "Isso resolve o pedaço [Y] que você mencionou. Faz sentido?"
- Passo B → "Aqui é onde o time [Z] entraria. Isso alivia o que você descreveu?"
- Passo C → "Essa integração com [ferramenta que ele usa] fecha o loop. Você
  consegue ver o time usando desse jeito?"

**Regra "no feature no ask"**: não avance para a próxima feature enquanto o prospect
não sinalizar interesse (verbal ou não-verbal claro) na anterior. Se ele hesitar,
parar, perguntar por quê, ajustar.

**Anti-padrão fatal**: rep entra em "monólogo do rep" — 8 minutos falando sozinho sem
ask. Gong Labs mediu: monólogo > 90 segundos = engajamento cai 60%. A demo já morreu
antes do final.

### Bloco 4 — Fechamento com ask claro (3–5 min)
Recapitular + próximo passo binário.
- "Recapitulando: você tinha [dor]. Te mostrei como [produto] resolve com [caminho].
  Você viu [3 features específicas mencionadas por ele]. Meu ask é: faz sentido
  a gente seguir pra [POC / proposta / demo pro time]? Se sim, agendamos agora.
  Se não, quero entender o que ainda não fechou pra você."

## Regra "No feature, no ask" — anatomia

Regra hard do Presales Collective. Cada FEATURE mostrada precisa terminar em uma
ASK antes de avançar.

**FEATURE** = qualquer capacidade do produto que consome > 30 seg de demonstração.

**ASK válida** = pergunta aberta que force resposta (sim/não/dúvida):
- "Isso resolve o [dor específica]?"
- "Você consegue ver o teu time usando desse jeito?"
- "Isso substitui o [processo atual]?"
- "O que ficou nebuloso?"

**ASK inválida** (não conta):
- "Faz sentido?" [muito genérica; lead diz "sim" no automático]
- "Alguma dúvida?" [convite ao silêncio]
- silêncio expectante do rep [passivo]

**Se o ASK produz hesitação**: PARE. Não avance. Diagnostique. É o gate — sem sinal
de interesse, a próxima feature é ruído e queima energia da call.

## Roteiro de preparação — pré-demo

```
LEAD/CONTA: <nome>
DISCOVERY PRÉVIO — 3 dores mapeadas:
  D1 (a mais forte): <...>
  D2: <...>
  D3: <...>

HIPÓTESE DE FOCO (D1): <a mais forte + por quê>

BLOCO 1 — Impacto:
  Tela final que resolve D1: <descrição concreta>
  Cliente-âncora referenciável (mesmo porte/setor): <nome ou perfil>
  Números antes/depois: <...>

BLOCO 3 — Fluxo do como (5–7 passos):
  Passo 1: <ação> → ASK: <pergunta>
  Passo 2: <ação> → ASK: <pergunta>
  ...

FEATURES FORA DA DEMO (para não cair em dump):
  <lista de coisas legais que NÃO vou mostrar hoje — não servem D1>

PRÓXIMO PASSO ALVO: <POC / proposta / demo pro time — data>
PLANO B se ele resistir: <o que perguntar pra diagnosticar>
```

## Diferença vs "feature dump" (anti-padrão)

| Eixo | Demo invertida por impacto | Feature dump (anti-padrão) |
|---|---|---|
| Abertura | tela final com impacto | home / navegação / setup |
| Estrutura | dor → wow → como | features na ordem do menu |
| Densidade | 3–5 features específicas | 15+ features tour completo |
| ASK | "no feature no ask" | monólogo de 8 minutos |
| Adaptação em tempo real | ajusta pela hipótese ao vivo | script fixo do começo ao fim |
| Recap | dor recap → próximo passo | "espero que tenha gostado" |
| Conversão medida (Gong) | 2–3× maior | baseline |

## Fronteiras

- **Não substitui discovery** — discovery é `spin-selling` / `sandler-pain-funnel`.
  Demo sem discovery é chute com tela bonita. Se você ainda não sabe a dor específica,
  agende call de discovery antes.
- **Não é POC** — demo mostra o wow; POC prova com dado real. Demo → interesse → POC.
  POC é `poc-com-gate-binario`.
- **Não é battlecard** — se o prospect começa comparando com concorrente, saia da demo
  e ative `engenheiro-de-pre-vendas` para battlecard FIA.
- **Não é apresentação institucional** — não abra com "quem somos, missão, valores".
  Cliente compra resolução da dor, não sua história.

## Vetos

- **Nunca abrir demo mostrando a home vazia ou navegação.** Comece pela última tela
  que resolve a dor. Cohan chamou isso de "The Great Sin of Demos".
- **Nunca fazer monólogo > 90 segundos sem ASK.** Gong Labs mede a queda de
  engajamento em tempo real — a call já morreu.
- **Nunca mostrar feature nova sem confirmar interesse na anterior.** "No feature,
  no ask" é regra hard.
- **Nunca inventar cliente-âncora que não existe.** Se você não tem case similar,
  diga: "Não tenho caso idêntico em [setor exato], mas temos [caso análogo] e o
  mecanismo é o mesmo".
- **Não faça demo sem próximo-passo binário no fim.** Se a demo termina em
  "aguardo teu retorno", virou apresentação institucional — não venda.

## Handoffs

- **Prospect topou o próximo passo POC** → `poc-com-gate-binario` para desenhar
  os success criteria ANTES da POC começar.
- **Prospect quer bater com concorrente ao vivo** → `engenheiro-de-pre-vendas` para
  battlecard FIA (fact / impact / act — sem FUD).
- **Prospect trava no preço** → `negociacao-e-fechamento` (AECR).
- **Prospect precisa que o time técnico dele veja também** → agendar nova demo
  invertida com discovery adaptado + `estrategia-de-deal-complexo` para mapear
  buying committee.

## Atribuição

Princípios reescritos de "Great Demo!" (Peter Cohan, 2005+), "Demonstrating to Win!"
(Robert Riefstahl, 2003), das pesquisas do Gong Labs (Chris Orlob, 2018+) e das
regras do Presales Collective (2020+). Síntese própria em PT-BR — sem cópia literal.

Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B06/sales.
