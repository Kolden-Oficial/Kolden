---
name: orquestracao-de-comandos-slash
description: Use ao desenhar, escrever ou revisar um comando slash (/nome) — o mecanismo pelo qual o Claude Code executa pipelines determinísticos disparados por prefixo. Cobre anatomia canônica (markdown + frontmatter + template + prompt), o pipeline spec-driven (/specify > /clarify > /plan > /tasks > /implement > /analyze > /checklist), a semântica append-only de /converge, a ponte /taskstoissues via GitHub MCP, o marcador [P] de paralelismo em tarefas, e os extension-hooks before/after. Complementa `spec-build-review` (que ORQUESTRA a jornada) — esta define A LINGUAGEM dos comandos individuais que compõem qualquer jornada.
tipo: skill
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
---

# Orquestracao de Comandos Slash

Um comando slash e a unidade de composicao do Claude Code: um verbo curto,
determinístico, que o agente aciona sem ambiguidade. Esta habilidade define
como escreve-los, como encadeia-los em pipeline e como estende-los sem
quebrar a idempotencia.

## Quando disparar

- Voce vai adicionar um `/nome` novo em `.claude/commands/`.
- Voce esta encadeando 3+ comandos (pipeline) e precisa garantir contratos.
- Um pipeline existente perdeu determinismo (mesma entrada, saida diferente).
- Precisa expor um extension-hook para que outro agente/squad estenda o
  comando sem tocar no arquivo original.

**Nao use quando:** o pedido e escrever a implementacao de uma feature
(isso e o `@dev`) nem quando e revisar uma spec (isso e
`clarificacao-de-ambiguidade` + `analise-cross-artefato`).

## Anatomia de um comando slash

Todo `/comando` vive em `.claude/commands/<nome>.md`, com esta forma:

```markdown
---
name: nome-do-comando
description: Frase-gatilho, imperativa, orientada ao efeito.
argument-hint: "[argumento opcional]"
allowed-tools: Bash, Read, Write, Edit, Grep, Glob
---

# /nome-do-comando

[intent] O que este comando faz, em 1 paragrafo, sem jargao.

## Pre-condicoes
- Arquivo X existe.
- Fase anterior do pipeline fechada.

## Passos determinísticos
1. Ler `path/a.md`.
2. Aplicar template `template/b.md`.
3. Gravar `output/c.md` com marcador de rastreabilidade.

## Pos-condicoes
- `output/c.md` existe e cabe em N linhas.
- Rastreabilidade registrada em `traceability.md`.

## Extension hooks
- `before:nome-do-comando` — executa antes.
- `after:nome-do-comando` — executa depois.

## Erros e recuperacao
Sem `path/a.md` > abortar com mensagem X, sem escrever nada.
```

O `frontmatter` e onde o Claude Code decide **quando** invocar. O corpo e o
prompt de execucao — leia como codigo, nao como narrativa.

## Pipeline canonico (spec-driven)

O pipeline que o aiox-core ja encarna e este — a ordem e lei, o pulo e
proibido:

```
/specify   > /clarify   > /plan     > /tasks    > /implement > /analyze  > /checklist
(what)       (ambiguity)   (how)       (chunks)     (do)          (verify)    (quality)
```

- **/specify** — coleta o "o que" e produz `spec.md`. Escrito em linguagem
  do cliente, nao do time. Cross-link com `prfaq-amazon-style`.
- **/clarify** — varre ambiguidade estruturada; produz ate 5 perguntas
  criticas. Cross-link com `clarificacao-de-ambiguidade`.
- **/plan** — decide "como" (arquitetura, contratos, data model, research).
  Passa pelo Constitution Check antes de fechar.
- **/tasks** — decompoe em `tasks.md` com marcador `[P]` (ver abaixo).
- **/implement** — executa tarefa por tarefa, TDD test-first quando
  aplicavel. Cross-link com `ciclo-de-fase-goal-backward`.
- **/analyze** — consistencia cross-artefato. Cross-link com
  `analise-cross-artefato`.
- **/checklist** — "testes unitarios para o portugues" da spec. Cross-link
  com `checklist-de-requisitos`.

Cada comando **le somente** as saidas dos anteriores + template proprio,
**escreve somente** o proprio artefato. Idempotencia obrigatoria: rodar
`/plan` duas vezes com o mesmo `spec.md` produz o mesmo `plan.md`
(exceto timestamp).

## /converge — semantica append-only

Alguns comandos (tipicamente `/converge`) precisam **acumular** em vez de
substituir. Regra:

- **Nunca sobrescreve.** A escrita e sempre `>>`, nunca `>`.
- **Cada bloco anexado carrega cabecalho de origem** (data, agente,
  contexto) para rastreabilidade.
- **Deduplicacao por chave** (nao por hash exato) — mesma decisao expressa
  de forma diferente ainda e a mesma; a chave e o `topic` da decisao.
- **Ordem cronologica preservada.** O leitor recupera a linha do tempo sem
  reconstruir.

Aplicacao tipica: `decisions.md`, `research-log.md`, `ADR-cadence.md`.
Antipadrao: usar append-only para `spec.md` ou `plan.md` — esses sao
substituidos por versao nova.

## /taskstoissues (ponte GitHub MCP)

Quando `tasks.md` esta pronto, `/taskstoissues` converte cada tarefa em
issue no GitHub via MCP. Regras:

- **Uma tarefa = uma issue.** Nao agrupar; nao fatiar.
- **Titulo = titulo da tarefa** (sem prefixo `[TASK-###]` no titulo;
  usar label).
- **Body = corpo da tarefa + link para spec + link para plan.**
- **Label obrigatoria** — `story:{story-id}`, `type:{task-type}`,
  `paralelismo:{P|S}`.
- **Marcador `[P]` vira label `paralelismo:P`** (habilita agrupamento).
- **Idempotente:** rodar 2x nao cria issues duplicadas — busca por titulo +
  label `story:{id}` antes de criar.

Requer que o agente executor tenha o MCP `github` autorizado e o repo
correto configurado. `@devops` mantem exclusividade sobre `gh pr create`
e `gh pr merge`; `/taskstoissues` cria **issues**, nao PRs — nao viola a
autoridade.

## Marcador [P] de paralelismo

Em `tasks.md`, cada tarefa tem prefixo:

```
- [P] TASK-001: escrever teste unitario do modulo A
- [P] TASK-002: escrever teste unitario do modulo B
- [S] TASK-003: consolidar cobertura (depende de 001 e 002)
```

- **[P]** = paralelizavel. Nao tem dependencia entre si. Pode ir para
  fan-out de subagentes.
- **[S]** = sequencial. Depende explicitamente das anteriores.

O agente orquestrador **agrupa `[P]` em ondas** e so passa para a proxima
onda quando todas terminam. Cross-link com `orquestracao-de-subagentes-paralelos`
(habilidade compartilhada da familia Kolden — nao esta em Prometeu, esta em
Caos/skills globais).

## Extension hooks (before/after)

Cada `/comando` publica dois pontos de extensao — nomes reservados:

- `before:{comando}` — executa antes do corpo. Se retornar erro, aborta.
  Uso: validacao adicional, sync com fonte externa, gate de licenca.
- `after:{comando}` — executa depois do corpo. Nao afeta o resultado.
  Uso: notificacao, sync com bugtracker, geracao de digest.

Os hooks vivem em `.claude/hooks/before-{comando}.sh` /
`after-{comando}.sh`. Habilitados por reflexo em `settings.json`. **Nao
substituem** o comando; **estendem** o comando. Quem escreve o comando
raiz nao precisa saber quem estende.

Contrato: hook e stateless para o comando. Comando nao le variaveis do
hook. Comunicacao e por arquivo (o hook escreve, o comando le se souber
o path).

## Contratos que todo comando novo respeita

- **Determinismo:** mesma entrada, mesma saida. Timestamp e o unico ruido
  aceitavel.
- **Idempotencia:** rodar 2x nao corrompe estado. Segundo run detecta que
  ja rodou e pula com sucesso (nao erro).
- **Pre/pos-condicoes explicitas:** o comando falha rapido se pre nao esta
  satisfeita; escreve pos so quando garantidas.
- **Um arquivo escrito por comando.** Comando que escreve N arquivos vira
  N comandos (ou vira 1 comando + N hooks after).
- **Rastreabilidade:** cada artefato aponta pra spec/plan/task que o
  originou. Sem rastreabilidade, nao entra no pipeline.

## Anti-padroes (nao faca)

- Comando que le o resultado do proximo (ordem viola).
- Comando que "descobre" o que fazer em runtime a partir de LLM (nao e
  deterministico).
- Comando que grava em `.aiox-core/core/` (viola L1/L2 do framework).
- Comando cujo prompt cita o nome do agente que o executa (deve ser
  agnostico).
- Comando com `allowed-tools: *` (sempre restrinja).

## Checklist antes de mesclar um /comando novo

- [ ] Frontmatter completo (name, description, argument-hint,
      allowed-tools).
- [ ] Pre e pos-condicoes escritas.
- [ ] Idempotente (testado 2x, mesmo output).
- [ ] Extension hooks `before:` e `after:` publicados (mesmo que vazios).
- [ ] Ordem no pipeline documentada (quem antes, quem depois).
- [ ] Escreve **um** arquivo. Se mais, refatorar.
- [ ] Testado com entrada minima (smoke) e entrada real (integration).

## Handoffs

| Situacao | Habilidade destino |
|---|---|
| Spec ambigua entrou no /clarify | `clarificacao-de-ambiguidade` |
| Tarefas geradas precisam de fatiamento | `fatiamento-mvp-por-historia` |
| /analyze detectou inconsistencia cross-artefato | `analise-cross-artefato` |
| /checklist gera checklist de requisitos | `checklist-de-requisitos` |
| Pipeline de spec > build > review completo | `spec-build-review` |
| Comando novo cria/usa MCP | `mcp-builder` |

---

## Heranca historica

- **GitHub Spec-Kit team** — repositorio `github/spec-kit` (2025-2026).
  Pipeline canonico `/specify > /clarify > /plan > /tasks > /implement >
  /analyze > /checklist` e a definicao de extension-hooks foram
  formalizados por este time; a arquitetura serve de referencia para
  spec-driven development sobre agentes LLM.
- **Anthropic — Claude Code team** — introducao dos slash commands e do
  sistema de hooks (`before` / `after`, PreToolUse, PostToolUse, Stop,
  UserPromptSubmit, SessionStart) como camada determinística sobre o
  agente. Documentacao oficial do Claude Code define os pontos de extensao
  reusados aqui.
- **Cognition Labs / Devin (2024+)** — pioneiro em pipelines de agente
  como sequencia auditavel de acoes com contratos de entrada/saida. A
  cultura de "cada passo tem artefato" que sustenta esta habilidade e
  contemporanea daquela geracao de agentes.
- **Kent Beck & Ward Cunningham** — pattern languages (*A Laundry List of
  Software Patterns*, OOPSLA 1987). Cada comando slash e um "pattern
  cadenciado": nome curto, intent, contexto, solucao, consequencias — a
  mesma estrutura, aplicada ao agente.
- **Doug McIlroy** — filosofia Unix (Bell Labs, 1978): "faca uma coisa e
  faca bem; escreva programas para trabalharem juntos". Todo comando slash
  desta habilidade e uma pipe Unix reencarnada — um verbo, uma saida, uma
  composicao.

## Procedencia

Skill nova (F6 do lote `_lote-2026-06-26`), fundindo IDs diferidos do
`github/spec-kit` (G1 /specify, G3 /plan, G4 /tasks, G6 /implement, G7
/constitution, G9 /converge, G10 /taskstoissues, G12 plan-template, G13
tasks-template, G14 constitution-template, G16 extension-hooks)
documentados em
`Caos/registros/absorcao/_lote-2026-06-26/relatorio-de-perda-prometeu.md`.
Absorcao em PT-BR, sem copia literal. Autoria: Prometeu / Kolden, 2026.
