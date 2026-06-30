---
name: pesquisa-qualitativa-de-usuario
description: |
  Use quando precisar conduzir PESQUISA QUALITATIVA DE UX em produto pronto: protocolo de estudo,
  coleta ética (consent + samples diverse), construção de PERSONA EMPÍRICA, sessão de USABILITY TEST
  60min com think-aloud + métricas (completion rate, error rate, time-on-task), análise +
  triangulação. NÃO substitui Aletheia roteiro-de-entrevista (Mom Test) — essa é descoberta
  pré-produto (validar dor + assunção); esta é UX em produto existente.
domain: design
subdomain: ux-research
agente_primario: [harmonia-chief]
tags: [ux-research, usability-test, think-aloud, persona-empirica, triangulacao]
fonte_upstream: msitarzewski--agency-agents@a597cb6 (G19, G20, G21)
---

<!--
Procedência: princípios absorvidos e reescritos em PT-BR de
github.com/msitarzewski/agency-agents@a597cb6 (licença MIT — IDs G19, G20, G21).
Sem cópia literal do upstream; uso interno Kolden.
-->

# Pesquisa qualitativa de usuário — UX em produto existente

A Harmonia conduz pesquisa qualitativa em **produto pronto** para entender como pessoas reais
usam o que já existe. O objetivo é **observar uso**, não **validar uma ideia** — esse é o
território da Aletheia.

## Fronteira crítica com Aletheia (Mom Test pré-produto)

> **Aletheia faz descoberta pré-produto.** Mom Test (Rob Fitzpatrick) pergunta sobre **a vida
> e o passado** do entrevistado para validar dor e assunção, **antes de construir**. Nunca
> mostra a ideia, nunca pede opinião sobre futuro hipotético.
>
> **Esta skill faz UX em produto existente.** Observa **uso presente** — como a pessoa
> interage com o produto que já está na frente dela, com tarefas reais, com think-aloud.

Documentado em 3 lugares por design: (1) frontmatter, (2) esta seção, (3) nota inline ao
falar de entrevista semi-estruturada.

**Regra prática:**
- Pergunta "Conta sobre a última vez que você teve esse problema" → Aletheia (Mom Test).
- Pergunta "Faça isso aqui no produto, pensando em voz alta" → esta skill.

## Quando aplicar

Use quando o produto existe (mesmo MVP) e a pergunta é "como pessoas reais usam isto e onde
elas travam". Pule quando ainda não há produto (vá para Aletheia) ou quando o que se quer é
medir comportamento em escala (analytics quantitativa → Metis).

## Fase 1 — Desenho do estudo

Antes de falar com ninguém, definir:

1. **Objetivo claro** — qual hipótese de UX validar? "Os usuários acham o botão de export?"
   é objetivo; "queremos entender melhor" não é.
2. **Sample size — regra Nielsen:** 5-8 participantes por persona detectam ~85% dos problemas
   de usabilidade. Mais que 8 por persona dá retorno decrescente.
3. **Sample diversity** — cobrir spectrum por:
   - **Skill** (iniciante / intermediário / avançado no domínio).
   - **Contexto** (mobile / desktop, ambiente calmo / ruidoso, com pressa / sem pressa).
   - **Demografia** (idade, profissão, região) quando relevante para o produto.
4. **Tarefas representativas** — extraídas de uso real (logs, suporte, vendas), nunca
   inventadas para "ficar bonito".
5. **Consent ético LGPD:**
   - Consentimento informado por escrito (o que é gravado, por quanto tempo é guardado,
     com quem é compartilhado).
   - Direito de saída a qualquer momento sem justificativa.
   - Anonimização nos artefatos finais (persona empírica não cita nome real).

## Fase 2 — Coleta ética

Duas frentes paralelas: construção de persona empírica + usability test.

### Construção de persona empírica

A persona aqui é **observada**, não **imaginada**.

**Insumos obrigatórios:**
- **Entrevista semi-estruturada (~30min)** — perguntas abertas sobre contexto de uso, fluxo
  de trabalho atual, ferramentas que já usa. *Nota:* aqui são perguntas sobre o uso do
  produto que está sendo estudado; perguntas sobre vida/passado para validar dor pré-produto
  são da Aletheia.
- **Observação de uso (~30min)** — a pessoa usa o produto sob observação, sem ser guiada.
  Esta é a fonte mais limpa de dado — comportamento real, não autorrelato.
- **Quotes literais** — frases inteiras anotadas, com timestamp, para fundamentar cada
  afirmação sobre a persona.

**Estrutura da persona empírica:**
1. **Dados demográficos reais** (faixa etária, profissão, contexto), anonimizados.
2. **Comportamento observado** (o que a pessoa fez, não o que disse que faria).
3. **Pain points concretos** com quote literal (não paráfrase).
4. **Goals derivados de uso real** (o que a pessoa tentou fazer, com sucesso ou falha).
5. **Diferencial de comportamento** — o que esta persona faz de diferente das outras
   estudadas. Sem diferencial, é fusão de duas personas.

**Critério de refutabilidade:** se um dado novo não pode desafiar a persona, ela é fantasia.
Toda persona empírica precisa ter ao menos um "ponto de quebra" — uma afirmação que,
se observada falsa em N pessoas, força revisão.

### Usability test 60min — protocolo

| Bloco | Tempo | Atividade |
|---|---|---|
| Rapport + consent | 0-5min | apresentação, leitura do termo, confirmação verbal |
| Contexto e expectativa | 5-10min | perguntas abertas sobre uso atual, expectativa para a sessão |
| Tarefas com think-aloud | 10-50min | 5-7 tarefas representativas, voz alta durante toda a execução |
| Entrevista pós-teste | 50-60min | o que confundiu, o que faltou, o que surpreendeu |

**Métricas registradas por tarefa:**
- **Completion rate** — completou sem ajuda? Completou com ajuda? Desistiu?
- **Error rate** — quantos erros até completar? Quais erros?
- **Time-on-task** — tempo do início ao fim da tarefa.
- **Pontos de fricção** — timestamps onde a pessoa hesitou, releu, voltou.
- **Quote literal** — pelo menos uma frase verbatim por tarefa.

**Regra do think-aloud:** se a pessoa silencia por mais de ~10s, o facilitador diz "o que
está pensando agora?" — sem sugerir resposta. Nunca explicar o que o botão faz.

## Fase 3 — Análise + triangulação

**Identificação de padrões:**
- Tema que aparece em **≥3 participantes** é um pattern, não anedota.
- Tema que aparece em **1-2** vai para "watch list" — investigar em estudos futuros.

**Triangulação (obrigatória antes de qualquer recomendação):**
Compare três fontes para o mesmo comportamento:
1. **Self-report** — o que a pessoa disse na entrevista.
2. **Comportamento observado** — o que a pessoa fez no usability test.
3. **Analytics** — o que os dados quantitativos mostram em escala (handoff Metis).

Se as três batem, achado é forte. Se divergem, o **comportamento observado** ganha do
autorrelato — pessoas mentem (sem querer) sobre o próprio uso.

**Output do relatório:**
- **Por tarefa** — métricas + padrões + quotes representativos.
- **Persona empírica final** — uma por segmento, com critério de refutabilidade.
- **Recomendações priorizadas** — por severidade (bloqueia uso / atrapalha / cosmético)
  × frequência (todos / metade / poucos).

## Anti-padrões — proibidos por design

- **Persona sem dado empírico** — vira fantasia + viés do designer. Persona inventada é
  pior do que persona nenhuma porque dá falsa segurança.
- **Usability test com líder fazendo o usuário** — facilitador que explica o produto durante
  a tarefa destrói o sinal. Se a pessoa precisa de explicação, esse é o achado.
- **Sample homogêneo** — 8 pessoas do mesmo perfil cobrem 1 segmento bem e os outros zero.
- **Métrica sem contexto qualitativo** — "60% completou a tarefa" sem saber por que os 40%
  travaram é número sem ação.
- **"Pesquisa = grupo focal"** — grupo focal é o pior método para UX. Dinâmica de grupo +
  desejo de aprovação social distorce respostas. A pessoa mais vocal dita a opinião do grupo.
- **Inverter a fronteira com Aletheia** — perguntar "o que você acha desta nova feature?"
  durante o teste é Mom Test ao contrário: pede opinião sobre futuro hipotético. Se quer
  validar feature ainda não construída, é Aletheia, não esta skill.

## Saída padrão

Relatório consolidado contendo:
1. **Resumo executivo** (1 página) — 3-5 achados mais importantes com severidade.
2. **Personas empíricas** finais — 2-4 personas com critério de refutabilidade explícito.
3. **Relatório por tarefa** — métricas (completion, error, time) + padrões + quotes.
4. **Triangulação** — onde self-report bate com comportamento, onde diverge.
5. **Recomendações priorizadas** — matriz severidade × frequência.
6. **Handoffs:**
   - Visual/hierarquia → Harmonia/sistema-de-design.
   - Persuasão/copy → Caliope/robert-cialdini.
   - Quantitativo em escala → Metis (analytics).
   - Validação de feature **ainda não construída** → Aletheia (Mom Test).

## Cross-links

- **Aletheia/roteiro-de-entrevista** — fronteira pré-produto. Mom Test valida dor + assunção
  antes de existir produto.
- **Harmonia/walkthrough-de-persona** — pode consumir personas empíricas geradas aqui para
  rodar walkthroughs ancorados em dado real.
- **Metis** — analytics quantitativa para triangulação. "60% abandonam o fluxo de checkout"
  vem da Metis; "por que abandonam" vem desta skill.
- **Harmonia/sistema-de-design** — recomendações de hierarquia/clarity descem para o design
  system.
