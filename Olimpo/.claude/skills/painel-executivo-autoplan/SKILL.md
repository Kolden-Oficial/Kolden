---
name: painel-executivo-autoplan
description: >-
  Use quando o Zeus precisar rodar uma REVISÃO EXECUTIVA COMPLETA de um plano ou
  Contrato de Missão em sequência (vários deuses, cada um construindo sobre o
  anterior) com AUTO-DECISÃO das questões intermediárias, parando só nas decisões
  de gosto e nos desafios à direção do Ronan. Espelha o Zeus orquestrando os 8
  deuses sobre o Contrato de Missão num único comando. Acione quando o Ronan
  pedir "revisão executiva completa", "passa esse plano por todos", "painel
  C-level", "autoplan", ou quando uma missão exigir várias perspectivas
  executivas sem 15-30 perguntas intermediárias. NÃO use para roteamento simples
  a um único deus — aí basta o `*diagnose` do Zeus.
tipo: skill
area: Olimpo
up: "[[Olimpo/_MOC-olimpo]]"
---

# Painel executivo (autoplan)

Um comando. Plano bruto entra, plano executivamente revisado sai. O Zeus lê as
perspectivas dos executivos necessários e as roda **em sequência**, no mesmo
rigor de cada deus operando isolado. A única diferença: as perguntas
intermediárias são **auto-decididas** pelos 6 princípios abaixo; as decisões de
gosto e os desafios à direção do Ronan sobem a um **portão de aprovação final**.

## Execução sequencial — OBRIGATÓRIA

Os deuses do painel executam em ordem estrita de dependência (ex.: Zeus visão/
escopo → Apolo mercado → Plutos finanças → Hefesto viabilidade → Hades risco/
governança → Atena IA → Poseidon operação → Afrodite receita). **Cada fase
completa antes da próxima começar — nunca em paralelo**, pois cada uma constrói
sobre a anterior. Entre fases, emita um resumo de transição e verifique que os
outputs da fase anterior estão escritos na seção `executivos[]` do contrato.

## Os 6 princípios de decisão

Auto-respondem toda questão intermediária:

1. **Escolha a completude** — entregue a coisa inteira; prefira a abordagem que
   cobre mais casos de borda.
2. **Resolva o raio de impacto** — conserte tudo no raio do plano; auto-aprove
   expansões que estão no raio E custam < 1 dia de esforço (poucas frentes, sem
   nova infra).
3. **Pragmático** — se duas opções resolvem a mesma coisa, pegue a mais limpa. 5
   segundos escolhendo, não 5 minutos.
4. **DRY** — duplica algo que já existe? Rejeite. Reuse o que há (alinha ao
   REUSE > ADAPT > CREATE da Kolden).
5. **Explícito sobre esperto** — solução óbvia de 10 linhas > abstração de 200.
   Prefira o que um novato entende em 30 segundos.
6. **Viés à ação** — avançar > ciclos infinitos de revisão. Sinalize a
   preocupação, mas não trave.

**Desempate por fase:** estratégia (Zeus) → P1+P2 dominam; viabilidade (Hefesto/
Hades) → P5+P3; receita/mercado (Afrodite/Apolo) → P5+P1.

## Classificação de cada decisão

- **Mecânica** — uma resposta claramente certa. Auto-decida em silêncio.
- **Gosto** — pessoas razoáveis poderiam discordar (abordagens próximas, escopo
  na fronteira, divergência entre deuses). Auto-decida COM recomendação, mas
  **leve ao portão final**.
- **Desafio ao Ronan** — quando os executivos concordam que a direção declarada
  pelo Ronan deveria mudar (fundir, dividir, adicionar, remover algo que ele
  pediu). **NUNCA é auto-decidido.** Sobe ao portão final com contexto rico: o
  que o Ronan disse · o que os deuses recomendam · por quê · que contexto podemos
  estar perdendo · qual o custo se estivermos errados. A direção original do
  Ronan é o default; os deuses têm de provar a mudança, não o contrário.

## O que "auto-decidir" significa

Auto-decisão substitui o **julgamento** do Ronan pelos 6 princípios — **não** a
análise. Cada perspectiva ainda é executada em profundidade total. Você AINDA
deve: ler os dados/arquivos reais que cada fase referencia; produzir todo output
exigido (tabelas, diagramas, registros); identificar todo problema; **decidir**
cada um pelos 6 princípios; **registrar** cada decisão na trilha de auditoria.
Você NÃO pode: comprimir uma fase numa linha de tabela; escrever "sem problemas"
sem mostrar o que examinou; pular uma fase sem declarar o que checou.

**Duas exceções nunca auto-decididas:** (1) premissas — qual problema resolver
exige julgamento humano; (2) desafios ao Ronan — ele sempre tem contexto que os
modelos não têm.

> Onde encaixa no Olimpo: este painel É a **descida** do Zeus sobre os
> `executivos[]` do Contrato de Missão. Auto-decisões ficam logadas no contrato;
> decisões de gosto e desafios ao Ronan compõem o portão final, que sobe via
> consolidação do Zeus → verificação da **Dike** → **Hermes** → Ronan. O portão
> de aprovação é humano e inegociável.

---
*Técnica absorvida de `garrytan/gstack@11de390` (skill `autoplan`: pipeline sequencial, 6 princípios de decisão e classificação mecânica/gosto/desafio), licença MIT. Reescrita em PT-BR e mapeada ao Contrato de Missão e às 5 camadas do Olimpo — sem cópia literal; o runtime/tooling do gstack (gbrain, browse, codex, telemetria) não foi absorvido.*
