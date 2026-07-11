---
name: estrategia-de-deal-complexo
description: |
  Use para desenhar ESTRATÉGIA de deal B2B enterprise complexo — a fase ANTES da proposta, quando
  ainda se decide como posicionar, como enquadrar (Challenger), onde ganhar (win/battle/lose zones)
  e que perguntas plantar (landmine questions) para expor risco do concorrente. Gatilhos: "deal
  strategy", "estratégia de deal", "deal complexo", "enterprise deal", "reframe do problema",
  "Challenger sale", "commercial insight", "win zone", "battle zone", "landmine question",
  "como posicionar contra <concorrente>", "vamos ao pitch executivo", "buyer não vê a dor".
  NÃO substitui `negociacao-e-fechamento` (essa opera na fase de assinatura — objeção, concessão,
  fechamento); esta opera na fase ANTERIOR — quando ainda estamos MOLDANDO a percepção do buyer.
domain: sales-enterprise
subdomain: deal-strategy
tier: 1
agente_dono: redator-de-propostas
heranca_historica: [challenger-sale-dixon-adamson, ceb-corporate-executive-board]
fonte_upstream: msitarzewski--agency-agents@a597cb6 (G10+G11+G12)
status: semente
tipo: skill
area: Emporos
up: "[[Emporos/_MOC-emporos]]"
---

# Estratégia de Deal Complexo

> Habilidade do `redator-de-propostas`. Desenha a **estratégia** de um deal enterprise B2B antes da
> proposta virar peça. Combina 3 sub-blocos: **Challenger sale 6 passos** (reframe), **Win/Battle/
> Lose zones** (matriz de posicionamento) e **Landmine questions** (perguntas que expõem risco
> antecipado). É a peça de PENSAMENTO antes de escrever proposta.

## Quando invocar

- Deal enterprise B2B (ARR ≥ 6 dígitos, ciclo ≥ 60d, 3+ stakeholders).
- Buyer ainda não vê a dor ou vê a dor errada — precisa de reframe.
- Concorrente forte no páreo — precisa de posicionamento explícito.
- Deal complexo com 3+ concorrentes ou 2+ status quo (não fazer / manter atual).
- Antes de reunião executiva pivô (com decisor econômico).
- Antes de responder RFP — RFP sem estratégia é resposta de commodity.

## Fronteiras (leia antes de operar)

| NÃO é isto | É isto |
|---|---|
| `negociacao-e-fechamento` (objeção/concessão/closing) | Fase ANTES — estratégia de como o deal vai ser conduzido |
| Discovery inicial (SPIN/Sandler) | Discovery + reframe + posicionamento = arsenal de deal enterprise |
| Proposta comercial (peça) | Estratégia que INFORMA a proposta |
| Battlecard genérico | Estratégia deal-específica com posicionamento vs concorrente ESPECÍFICO |
| Solution selling clássico | Challenger reframe — desafia o buyer, não confirma o que ele já pensava |

## Herança histórica

- **Matthew Dixon + Brent Adamson — "The Challenger Sale"** (Portfolio, 2011) — pesquisa CEB
  (Corporate Executive Board, hoje Gartner) com 6.000 sales reps. Descobriu 5 arquétipos de
  vendedor; o **Challenger** (foco em ensinar/tailor/take control) vence 54% dos deals complexos.
  Framework de 6 passos do pitch Challenger.
- **CEB / Gartner** — pesquisa sobre grupos de compra B2B: 6,8 stakeholders em média;
  consenso é raro; o "Commercial Insight" (insight comercial provocativo) é o que quebra a inércia.
- **Adamson + Toman — "The Challenger Customer"** (Portfolio, 2015) — sequência: **Mobilizers**
  (não Champions) são quem realmente move o deal internamente; identificá-los.
- **Miller-Heiman "Conceptual Selling"** — origem das landmine questions: perguntas que expõem
  risco de decisão errada, plantadas para o buyer levar internamente.
- **Solution Selling / SPI** (Mike Bosworth) — origem do conceito de "pain funnel" que informa
  onde plantar landmines.

---

## Sub-bloco A — Challenger Sale (6 passos)

Estrutura do pitch Challenger em ordem canônica. Cada passo tem função específica.

### 1. Warm-up (Aquecimento)
- **Função**: estabelecer credibilidade e autoridade sobre o setor do buyer (não sobre nosso produto).
- **Tática**: cita 2-3 tendências ou dados verificáveis do setor do cliente que ele reconhece
  como reais. Sem falar do nosso produto ainda.
- **Sinal de sucesso**: buyer confirma ("sim, é assim mesmo aqui").
- **Anti-padrão**: pular pro produto. Buyer fica em modo defensivo.

### 2. Reframe (Reenquadramento)
- **Função**: quebrar o modelo mental do buyer sobre o próprio problema.
- **Tática**: apresentar um insight que o buyer NÃO sabia — geralmente contra-intuitivo. Formato:
  "vocês estão focando em X, mas o dado mostra que o que realmente move Y é Z".
- **Sinal de sucesso**: buyer para, olha desconfortado, quer entender.
- **Anti-padrão**: reframe genérico. Precisa ser SETOR-específico e DADO-específico.

### 3. Rational Drowning (Afogamento Racional)
- **Função**: mostrar com dado o custo do reframe — se buyer não agir sobre o novo insight,
  quanto perde.
- **Tática**: dados, benchmarks, estudos de caso comparáveis. **Sem falar do nosso produto ainda.**
- **Sinal de sucesso**: buyer visualiza a perda em números.
- **Anti-padrão**: encher de dado sem storytelling. Buyer se defende.

### 4. Emotional Impact (Impacto Emocional)
- **Função**: personalizar a dor. Sair do "sua indústria" e ir para "sua empresa, seu cargo,
  seu quarter".
- **Tática**: 2-3 exemplos concretos de como o problema afeta o buyer PESSOALMENTE (o quarter dele,
  sua reputação, seu time). Sempre acompanhado do dado do passo 3.
- **Sinal de sucesso**: buyer valida ("é o que estou vivendo").
- **Anti-padrão**: manipulação óbvia. Precisa ser diagnóstico, não teatro.

### 5. Value Proposition (Proposta de Valor)
- **Função**: ancorar a solução no reframe + na dor emocional dos passos 2-4.
- **Tática**: 1-2 frases posicionando o produto como a resposta específica ao insight que abrimos.
  Sem features — só a proposta.
- **Sinal de sucesso**: buyer pergunta "como funciona isso?".
- **Anti-padrão**: pular pra demo. Ainda não é o momento.

### 6. Purchase Suggest (Sugestão de Compra)
- **Função**: definir o próximo passo concreto.
- **Tática**: convite específico ao próximo compromisso: workshop de discovery, POC com gate binário
  (usa `poc-com-gate-binario`), proposta com escopo pré-alinhado.
- **Sinal de sucesso**: buyer aceita marco próximo com data.
- **Anti-padrão**: "vamos conversar depois". Sem próximo passo = deal perdido.

---

## Sub-bloco B — Win / Battle / Lose Zones

Matriz de posicionamento contra concorrentes. Para cada dimensão de compra, o deal está em uma zona:

- **Win zone** — dimensão onde ganhamos claramente contra o concorrente.
- **Battle zone** — dimensão onde estamos em paridade; buyer decide por gosto/preço/relacionamento.
- **Lose zone** — dimensão onde perdemos claramente.

### Como construir
Para o deal específico:

```
DEAL: <nome da conta / oportunidade>
CONCORRENTES ATIVOS: <lista> · STATUS QUO: fazer nada | manter atual

DIMENSÕES DE COMPRA (extraídas do discovery):
  1. <dimensão — ex: velocidade de implementação>
  2. <dimensão — ex: preço total 3 anos>
  3. <dimensão — ex: aderência regulatória LGPD>
  ...

MATRIZ (por dimensão × concorrente):
                | Nós  | Concorrente A | Concorrente B | Status Quo
  Velocidade    | WIN  | LOSE          | BATTLE        | WIN
  Preço 3 anos  | LOSE | BATTLE        | WIN           | WIN
  LGPD          | WIN  | LOSE          | LOSE          | LOSE
  Integração    | BATTLE| WIN          | BATTLE        | WIN
  ROI 12m       | WIN  | BATTLE        | LOSE          | LOSE
```

### Como usar
- **Move o deal para WIN zones** — na conversa, forçar as dimensões onde ganhamos. Cada
  dimensão de win precisa ser TRAZIDA à tona pelo vendedor, não esperada.
- **Neutralize BATTLE zones** — mostre que paridade é suficiente; foco não é aqui.
- **Reframe LOSE zones** — nunca aceite lose zone como definitiva; ou traga contexto que muda a
  dimensão, ou tire a dimensão do critério de decisão do buyer (via Challenger reframe).
- **Status quo** — na maioria dos deals enterprise, o maior concorrente é NÃO FAZER NADA. Mapeie
  sempre.

### Quando ativar
- Antes de reunião com decisor econômico.
- Quando surge concorrente novo no ciclo.
- Após cada round de discovery — dimensões podem mudar.

---

## Sub-bloco C — Landmine Questions

Perguntas que o vendedor "planta" na cabeça do buyer para que ele use INTERNAMENTE contra o
concorrente ou contra o status quo. O buyer as leva para a reunião interna e as usa como
critério de exclusão.

### Anatomia de uma landmine question boa

- **Aberta** (não sim/não).
- **Ancorada em risco real** que o buyer vai enfrentar se escolher errado.
- **Não menciona nosso produto** — parece pergunta genérica de due diligence.
- **Buyer pode fazer INTERNAMENTE** — ele pergunta ao próprio time ou ao concorrente.
- **Concorrente/status quo tem dificuldade em responder** — ou responde mal, ou expõe fraqueza.

### Exemplos de estrutura (adapte ao setor)

**Contra concorrente com fraqueza em compliance:**
- "Como vocês vão garantir que a auditoria LGPD do próximo Q não trave a implementação?"
- "Qual o SLA de resposta a solicitação de titular de dados que essa opção oferece por escrito?"

**Contra concorrente com fraqueza em integração:**
- "Quem no time deles vai ficar dedicado ao projeto de integração nos primeiros 90d? Vamos ter
  o nome e a alocação por escrito?"
- "Se a integração atrasar 60d, qual a cláusula de multa/reembolso?"

**Contra status quo (não fazer nada):**
- "Se em 12m nada mudar, qual métrica-chave estará onde? E se a métrica não mover, o que
  acontece?"
- "Qual o custo de oportunidade de manter o processo atual por mais 4 quarters — em pessoas,
  receita, risco?"

**Contra concorrente barato:**
- "Qual o custo total 3 anos (implementação + treinamento + expansão + saída) — não só
  licença?"
- "Se a solução barata não atender daqui a 12m, qual o custo de troca já modelado?"

### Como plantar
- No fim de reunião de discovery: "só uma dúvida antes de encerrar — quando vocês forem avaliar
  as opções, vocês vão querer saber X, certo?"
- Em pré-leitura de reunião executiva: enviar 3 landmines como "perguntas que sugerimos vocês
  fazerem a qualquer opção considerada".
- Nunca pareça manipulação — a landmine tem que ser pergunta DE VERDADE que qualquer buyer
  sério faria.

### Anti-padrão
- Landmine óbvia demais ("qual empresa é mais barata que nós?") — buyer sente. Perde credibilidade.
- Landmine sem base real — se o concorrente responder bem, viramos contra nós.
- Landmine que só nós sabemos responder — insight comercial, não pergunta plantada.

---

## Como os 3 sub-blocos se combinam num deal

```
1. USE Challenger 6 passos para MOLDAR a percepção do buyer sobre o problema.
2. USE Win/Battle/Lose para SABER que dimensões forçar no ciclo.
3. USE Landmine questions para EQUIPAR o buyer contra concorrentes/status quo.

Ordem típica:
- Reunião 1 (Discovery): coleta dado; pré-monta win/battle/lose.
- Reunião 2 (Reframe): Challenger 6 passos completo; planta 2-3 landmines.
- Reunião 3 (Executivo): reforça win zone; entrega proposta com prova das dimensões.
- Handoff a `negociacao-e-fechamento` para fase de assinatura.
```

## Formato de saída

```
DEAL: <conta / oportunidade> · ARR estimado: <R$>
ESTÁGIO ATUAL: <discovery / reframe / executivo / negociação>
CONCORRENTES ATIVOS: <lista> · STATUS QUO: <fazer nada / manter X>

--- CHALLENGER 6 PASSOS ---
Warm-up (setor): <tendência/dado do setor do cliente>
Reframe (insight): <o insight contra-intuitivo que muda o problema>
Rational drowning (custo): <dado do custo de não agir>
Emotional impact (pessoal): <como afeta o buyer no quarter dele>
Value prop (ancoragem): <1-2 frases posicionando nossa solução>
Purchase suggest (próximo passo): <compromisso específico + data>

--- WIN / BATTLE / LOSE ---
Dimensões prioritárias (top 3-5):
  <dimensão 1> — Nós: <WIN/BATTLE/LOSE> vs <concorrente>
  <dimensão 2> — <...>
  <dimensão 3> — <...>
Táticas por zona:
  WIN → forçar na conversa: <como>
  BATTLE → neutralizar: <como>
  LOSE → reframe ou remover da decisão: <como>

--- LANDMINE QUESTIONS ---
Plantadas para o buyer usar internamente:
  1. <pergunta 1> — alvo: <concorrente/status quo> — quando plantar: <momento>
  2. <pergunta 2> — <...>
  3. <pergunta 3> — <...>

RISCOS DO DEAL: <top 3 riscos + mitigação>
HANDOFF: quando fase de assinatura abrir → `negociacao-e-fechamento`
PRÓXIMO PASSO: <ação> · DONO: <agente> · DATA: <quando>
```

## Vetos

- **Não** faça Challenger sem dado real de setor — reframe sem dado é opinião. Buyer sente.
- **Não** trate LOSE zone como inevitável — sempre há reframe ou remoção da dimensão.
- **Não** ignore status quo como concorrente — é o mais forte em 60% dos deals enterprise.
- **Não** plante landmine sem confiar que qualquer buyer sério faria essa pergunta — vira
  manipulação.
- **Não** substitua `negociacao-e-fechamento` — esta habilidade PARA quando entra na fase de
  concessão/objeção/closing. Handoff explícito.
- **Não** faça Challenger com buyer que NÃO tem autoridade — Challenger requer decisor. Sem
  decisor na sala, vira teatro. Escalone antes.
- **Não** invente insight (passo 2 do Challenger) — se não tem insight defensável, pule
  Challenger e faça discovery clássico (`coach-de-discovery` — SPIN/Sandler).

## Ferramentas

- **GHL** (via Infisical) — registrar estratégia de deal no campo da oportunidade; anexar matriz
  win/battle/lose; marcar landmines plantadas por reunião.
- **Infisical** — única fonte de credenciais.
- **Handoff dominante**: `negociacao-e-fechamento` quando entra em objeção/closing.

## Atribuição

Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B06/sales.
