---
name: cadencias-comportamentais-em-validacao
description: |
  Use quando precisar desenhar cadência de pesquisa/validação com participantes (entrevistas seriadas,
  pesquisa longitudinal, beta fechado, pilot B2B), aplicar arquitetura de escolha para reduzir drop-off,
  ou definir frequência/incentivo ético. NÃO é para gamification de produto/usuário final
  (jurisdição Harmonia/UX). NÃO substitui roteiro-de-entrevista nem desenho-de-experimento — complementa.
domain: discovery-and-validation
subdomain: comportamento-em-pesquisa
agente_primario: [david-bland, rob-fitzpatrick]
tags: [cadencia, comportamento, retencao, drop-off, choice-architecture, default-bias, validacao]
cross_links:
  - aletheia/roteiro-de-entrevista
  - aletheia/desenho-de-experimento
  - harmonia (handoff quando for produto, não validação)
fonte_upstream: msitarzewski--agency-agents@a597cb6 (G1, G2)
---

> _Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (G1+G2, MIT © 2025 AgentLand Contributors)._

# Cadências Comportamentais em Validação

> **Escopo:** participantes de pesquisa/validação (entrevistados, beta-testers, cohort de pilot).
> **Fora de escopo:** usuários finais do produto. Padrão comportamental sobre o produto é jurisdição
> de Harmonia (UX) e Aglaia (marca) — esta skill se recusa a desenhar engagement loops de produto.
> **Ética inegociável:** transparência de uso de dados, opt-out claro, escassez só quando verdadeira.

Especialistas responsáveis: `david-bland` (test cards, cadência de experimento) + `rob-fitzpatrick`
(Mom Test, contato com participante). Suporte: `eric-ries` (instrumentação de loop de aprendizado).

## O que é

Cadência de validação é o **desenho deliberado da relação no tempo** entre o time de discovery e
os participantes de pesquisa — frequência, intervalo, formato, incentivo e arquitetura de escolha.
É o que separa uma rodada de validação com 80% de retenção de uma com 20%.

O problema central: participantes de validação são humanos com vida própria. Respondem a primeira
pesquisa por curiosidade e ignoram a segunda. Drop-off de 60-80% entre rodadas é comum quando a
cadência não é desenhada — e cada drop-off corrompe a série temporal e a qualidade do sinal.

Esta skill aplica psicologia comportamental (reciprocidade, default bias, arquitetura de escolha,
loss aversion ética, compromisso pequeno) ao **processo de validação**, não ao produto que está
sendo validado. A distinção é o veto da skill: se o pedido for sobre prender o usuário final ao
produto, faça handoff para Harmonia/UX — esta skill não desenha gamification de produto.

## Método

### 1. Diagnosticar o tipo de validação

Antes de desenhar cadência, classifique o que está sendo validado. Cada tipo tem ritmo próprio:

- **Customer Discovery (Steve Blank):** entrevistas para entender a dor. 1 contato por participante.
- **Validação longitudinal (cohort tracking):** acompanhar mesma pessoa ao longo do tempo. Múltiplos contatos.
- **Beta fechado:** usuários iniciais com acesso limitado. Onboarding + check-ins recorrentes.
- **Pilot pago (B2B):** cliente pagante testando solução. Ritmo de account management.

A cadência errada para o tipo errado destrói a validação: pilot pago semanal vira ruído; cohort
longitudinal sem ritmo perde sinal entre as ondas.

### 2. Aplicar os princípios comportamentais

#### 2.1. Reciprocidade calibrada

A pessoa coopera mais quando recebe algo primeiro. Em validação, o "algo" não é dinheiro (que
contamina o sinal e atrai caçador de incentivo). É **acesso, conteúdo ou compromisso público**:

- Preview de um insight não-óbvio antes de pedir a próxima rodada.
- Acesso antecipado ao beta para quem completou 3 entrevistas.
- Compromisso público leve ("você topa participar das 4 ondas?") + lembrete no prazo.

Critério ético: o incentivo precisa ser explicado e o uso de dados precisa ser transparente.

#### 2.2. Default bias e arquitetura de escolha

A pessoa segue o caminho de menor fricção. Em validação:

- **Slot de horário pré-selecionado** > "escolha um horário". O paradoxo da escolha trava agenda.
- **Opt-out > opt-in** para follow-up de pesquisa longitudinal — desde que com transparência ética
  no momento da inscrição inicial ("você receberá 4 ondas, pode sair a qualquer momento").
- **Pergunta principal primeiro, demográfica no fim.** Demográfica no começo aumenta abandono.
- **Calendly com 2-3 slots sugeridos** > calendário aberto com 40 slots.

#### 2.3. Variable reward shaping (sem dark patterns)

Recompensa intelectual variável aumenta engajamento sem precisar de pontos/badges:

- "Na rodada anterior 3 outros participantes do seu segmento responderam X — quer ver a comparação?"
- "Vamos compartilhar 1 insight não-óbvio derivado das suas respostas no fim desta onda."
- **Nunca** gamification de pontos/badges em validação. Ruído alto, sinal baixo. Você não está
  construindo dependência — está medindo realidade.

#### 2.4. Adesão por compromisso pequeno (foot-in-the-door)

Compromisso grande de uma vez assusta. Compromisso pequeno e sucessivo retém:

- "Pode me dar 15 minutos terça?" > "pode participar de uma pesquisa de 1h?"
- Subdivida rodadas longas: 3 micro-pesquisas de 10 min > 1 sessão de 30 min.
- Confirmação prévia na véspera ("ainda vale terça às 14h?") reduz no-show em ~40%.

#### 2.5. Loss aversion ética

Perda dói mais que ganho equivalente. Mas só funciona quando a escassez é **verdadeira**:

- "Essa rodada fecha sexta 18h" — verdadeiro, comunique.
- "Só faltam 3 participantes para fechar essa rodada" — só se for verdade.
- Janelas explícitas evitam procrastinação eterna.

Vetado: falsa escassez, falsa exclusividade, contagem regressiva fake. Quebra confiança e
contamina o sinal de validação futura.

### 3. Escolher a cadência por tipo

#### Customer Discovery (Steve Blank)

- **Frequência:** 5-10 entrevistas/semana até saturação (3 entrevistas seguidas sem novidade).
- **Cadência por participante:** 1 entrevista de 30-60 min — não recorrente.
- **Follow-up:** opcional, "posso te procurar daqui 2-3 meses para ver como evoluiu?" (preparação
  para cohort futuro).

#### Validação longitudinal (cohort tracking)

- **Frequência:** pesquisa quinzenal, máximo 8 semanas (4 ondas) sem revisão de método.
- **Cadência por participante:** 3-4 micro-pesquisas de 5-10 min cada.
- **Recompensa:** insights agregados ao fim das ondas (relatório consolidado para o cohort).
- **Drop-off esperado com cadência bem desenhada:** ≤25% entre ondas 1-2; ≤15% entre 2-3.

#### Beta fechado

- **Semana 1:** alto contato. Onboarding 1:1 (30 min), check-in dia 3 (15 min), check-in dia 7 (15 min).
- **Semanas 2-N:** check-in semanal de 15 min.
- **Saída:** ritual de offboarding — NPS qualitativo + 1 pergunta aberta + agradecimento.

#### Pilot pago (B2B)

- **Semanas 1-2:** daily standup de 15 min (estabelecer ritmo).
- **Semanas 3-12:** weekly review de 45 min (operação).
- **Final:** QBR (Quarterly Business Review) com decisão de renovação.

### 4. Definir thresholds de drop-off

Antes da rodada, definir o que conta como sinal vs. ruído:

- Resposta < 60% da onda → revisar canal/horário/incentivo antes da próxima.
- Resposta < 40% → suspender e diagnosticar (cadência errada? canal errado? incentivo fraco?).
- Drop-off de > 50% entre ondas consecutivas → série temporal corrompida, refazer cohort.

### 5. Documentar o protocolo

Entregável padrão da skill:

1. **Cronograma de cadência** — quando cada contato, qual formato, qual canal.
2. **Protocolo de comunicação** — texto de convite, lembrete, agradecimento (pronto para envio).
3. **Thresholds de drop-off** — quando seguir, quando pausar, quando refazer.
4. **Arquitetura de escolha** — slots pré-selecionados, defaults, ordem das perguntas.
5. **Compromisso ético** — uso de dados, opt-out, transparência sobre o que vai acontecer com a resposta.

## Exemplos práticos

### Cohort longitudinal de fundadores beta

Cenário: validar comportamento de uso de uma ferramenta SaaS ao longo de 6 semanas com 30 founders.

- **Onda 0 (inscrição):** opt-in com transparência — "4 pesquisas de 10 min, 1 entrevista final
  de 30 min, em troca acesso vitalício à v1.0 e relatório consolidado do cohort".
- **Onda 1 (semana 2):** 8 perguntas, slots pré-selecionados para 3 horários, pergunta principal
  primeiro, demográfica no fim.
- **Onda 2 (semana 4):** preview do insight da onda 1 no convite ("descobrimos que 60% de vocês
  usam X de forma inesperada — quer detalhar como você usa?").
- **Onda 3 (semana 6):** lembrete na véspera + janela explícita ("fecha quinta 18h").
- **Entrevista final:** convite com 3 slots, gravação opt-in, 30 min cap.

Drop-off esperado: 30 → 27 → 25 → 22 → 20 entrevistados (33% perda total, dentro do aceitável).

### Pilot B2B de 12 semanas com cliente enterprise

Cenário: validar adoção de uma ferramenta interna num cliente de 50 colaboradores.

- **Kickoff (semana 1):** 1 hora, definir métrica de sucesso conjunta, slots pré-selecionados para daily.
- **Semanas 1-2:** daily de 15 min com champion + 2 power users.
- **Semanas 3-12:** weekly de 45 min com champion, mensal com sponsor executivo.
- **Semana 12:** QBR com sponsor + decisão go/no-go.

Loss aversion ético: marcos contratuais explícitos ("até semana 8 precisamos atingir X% de
adoção para seguir com a contratação anual").

## Anti-padrões

- **Engagement loops em validação como se fosse produto.** Você está medindo o produto, não
  construindo dependência. Streak de 7 dias, badges, pontos — tudo dark pattern em validação.
- **Recompensa por velocidade de preenchimento.** Incentiva qualidade baixa. Recompense
  participação, não velocidade.
- **"Vai gerar conteúdo se você responder"** sem ética de uso transparente — viola consentimento.
- **Cadência ad hoc** ("entrevista quando der") — perde série temporal e impossibilita comparação
  entre ondas.
- **Falsa escassez/exclusividade** — quebra confiança e contamina sinal futuro.
- **Confundir comportamento de PARTICIPANTE com comportamento de USUÁRIO FINAL** — se o pedido
  for desenhar onboarding/retenção do produto em si, recuse e faça handoff para Harmonia/UX.
- **Demográfica no começo do formulário** — abandono sobe 30-50% sem necessidade.
- **Slots abertos sem sugestão** — paradoxo da escolha trava agenda do participante.

## Handoff

- `roteiro-de-entrevista` (Aletheia) — método de entrevista; esta skill cuida da cadência ENTRE
  entrevistas, não do conteúdo de cada uma.
- `desenho-de-experimento` (Aletheia) — test card e instrumentação; esta skill cuida da retenção
  de participantes ao longo do experimento.
- `mapa-de-assuncoes` (Aletheia) — prioriza o que testar; esta skill cuida de como manter o
  participante engajado para testar.
- **Harmonia (UX)** e **Aglaia (marca)** — handoff explícito quando o padrão comportamental for
  sobre o PRODUTO sendo construído (onboarding, retenção, ciclo de vida do usuário final), não
  sobre a relação com participantes de validação.

### Fluxo no squad

1. `aletheia-chief` recebe pedido de cadência → roteia para `david-bland` (cadência de teste) ou
   `rob-fitzpatrick` (contato com participante) conforme o eixo dominante.
2. Especialista produz cronograma + protocolo + thresholds usando esta skill.
3. Output passa pelo `checklists/output-quality.md` (gate de evidência) antes de entregar.
4. Se em algum momento o pedido virar gamification de produto → **HALT** e handoff para Harmonia.
