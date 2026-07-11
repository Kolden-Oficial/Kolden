---
name: arquitetura-multi-agente-canonica
description: >
  Use quando a decisão for desenhar o padrão de coordenação de um sistema
  multi-agente — hierárquico (supervisor + workers), peer-to-peer (agentes iguais
  se coordenam), blackboard (fonte compartilhada de contexto), ou combinações.
  Cobre 5 padrões canônicos (Chain-of-Responsibility, Mediator, Producer-Consumer,
  MapReduce, Blackboard), matriz de quando-usar (complexidade × observabilidade
  × custo), e cross-link Hermes camada 2 (mensageria) + Olimpo `topologias-de-time`
  (organização humana análoga). Gatilhos: "arquitetura multi-agente", "orquestração
  de agentes", "swarm", "hierarquia de agentes", "blackboard", "supervisor",
  "peer-to-peer agent", "como orquestrar N agentes", "mediator entre agentes".
  Dono: swarm-orchestrator (Nexus). Fronteira: define O QUE E COMO os agentes se
  falam; `topologias-de-time` decide POR QUE (papéis).
tipo: skill
area: Dedalo
up: "[[Dedalo/_MOC-dedalo]]"
---

# Arquitetura multi-agente canônica

Sistema multi-agente sem padrão claro é caos: agentes falam com quem quiserem, contexto
cresce sem controle, um cai e derruba os outros. Esta habilidade codifica 5 padrões
canônicos e a matriz de quando usar cada.

## Fronteira desta skill

- **AQUI:** COMO os agentes se coordenam (protocolo, canal, ordem).
- **NÃO AQUI:** POR QUE existem (papéis, incentivos) → `Olimpo/topologias-de-time`.
- **NÃO AQUI:** transporte de mensagem físico (broker, retry) → `Hermes camada 2`.

## Os 5 padrões canônicos

### 1. Chain-of-Responsibility
```
Request → A → B → C → Response
```
Cada agente recebe, decide se trata ou passa adiante. Ordem importa. Fail-fast se ninguém trata.

**Quando usa:**
- Roteamento com filtros (spam → categorização → priorização)
- Escalação (nível 1 → 2 → 3)
- Pipeline linear de transformação

**Não usa:**
- Quando ordem não importa (perde paralelismo à toa)
- Quando um agente precisa da resposta de outro (Chain é uni-direcional)

### 2. Mediator
```
    A ──┐
    B ──┼──> Mediator ──> decisões
    C ──┘
```
Um mediador central sabe todos e coordena. Agentes não falam entre si — só com o mediador.

**Quando usa:**
- N agentes iguais que precisam evitar acoplamento N-para-N (N² conexões)
- Precisa auditoria centralizada
- Regras de negócio ficam num só lugar (o Mediator)

**Não usa:**
- Mediator vira gargalo (single point of failure)
- Precisa latência ultrabaixa (hop extra)

**Kolden Hermes:** o próprio hermes-chief é um Mediator.

### 3. Producer-Consumer (via fila)
```
Producer(s) ──> [Queue] ──> Consumer(s)
```
Produtor emite, fila armazena, consumidor puxa. Desacoplamento temporal — produtor não espera.

**Quando usa:**
- Assíncrono (usuário não precisa esperar)
- Picos de tráfego (fila absorve)
- Retry natural (mensagem volta pra fila)

**Não usa:**
- Precisa resposta síncrona
- Não pode perder mensagem (exige DLQ + monitoramento)

**Kolden:** BullMQ (Redis) para jobs internos; NATS/Redpanda para event bus.

### 4. MapReduce
```
Input ──> Split ──┬──> Map A ──┐
                  ├──> Map B ──┼──> Reduce ──> Output
                  └──> Map C ──┘
```
Divide input em N partes, cada agente processa uma, um agente consolida.

**Quando usa:**
- Tarefa embaraçosamente paralela (auditar 1000 arquivos, analisar 100 URLs)
- Sub-tarefas independentes (nenhuma precisa do resultado de outra)
- Ganho de tempo vale complexidade

**Não usa:**
- Task pequena (overhead > ganho)
- Sub-tarefas dependentes (não é paralelo)

**Kolden:** Ritual do Caos F6 usa MapReduce em ondas (3 subagentes paralelos → consolidação).

### 5. Blackboard
```
   ┌────── Blackboard (contexto compartilhado) ───────┐
   │                                                   │
   A ↔ read/write     B ↔ read/write     C ↔ read/write
```
Todos leem e escrevem num quadro central. Agente reage quando o quadro tem input do seu domínio.

**Quando usa:**
- Problema complexo com sub-domínios (diagnóstico médico, planejamento)
- Ordem de resolução não é conhecida a priori
- Agentes com especialidades diferentes que se complementam

**Não usa:**
- Blackboard vira bagunça sem esquema
- Escrita concorrente sem lock explode

**Kolden:** MEMORY.md canônico do agente é um blackboard leve entre sessões.

## Matriz de decisão

| Padrão | Complexidade | Observabilidade | Latência | Fail-safety |
|---|---|---|---|---|
| Chain-of-Responsibility | baixa | fácil (log linear) | alta (soma) | baixa (1 falha = tudo cai) |
| Mediator | média | fácil (Mediator loga tudo) | média (hop extra) | média (Mediator = SPOF) |
| Producer-Consumer | média | fila = log natural | alta (assíncrono) | alta (retry) |
| MapReduce | alta | consolidador loga | baixa (paralelo) | média (1 map falha = degrada) |
| Blackboard | alta | difícil (concorrência) | variável | baixa (deadlock possível) |

**Regra de bolso Kolden:**
- **Começar com Mediator** (hermes-chief) — simples, auditável.
- **Adicionar Producer-Consumer** quando aparecer job assíncrono.
- **Escalar para MapReduce** quando aparecer trabalho paralelizável.
- **Blackboard** só quando problema é reconhecidamente sub-domínios complementares.

## Padrões compostos (o mundo real)

Kolden usa combinações:
- **hermes-chief (Mediator) despacha subagentes em MapReduce** (ondas de 3).
- **Ritual do Caos (Chain-of-Responsibility de 9 fases) + F6 MapReduce interna**.
- **Sessão AIOX = Mediator (aiox-master) + Blackboard (MEMORY.md por agente)**.

Não force um padrão único — combine com sobriedade.

## Cross-links obrigatórios

- **Hermes camada 2** — transporte físico de mensagem entre agentes (WhatsApp, fila, HTTP).
  Esta skill decide protocolo lógico; Hermes carrega o byte.
- **Olimpo `topologias-de-time`** — decide papel (analista/executor/revisor) e organização
  humana. Multi-agente espelha o modelo mental de time humano.
- **@architect (Aria)** — envolvida sempre que padrão afeta arquitetura de deploy (ex.: Producer-
  Consumer exige fila; fila exige infra).

## Antipatrões

- **N-para-N sem Mediator** — N agentes, N² conexões, N² formatos de mensagem. Explosão.
- **Blackboard sem schema** — cada agente escreve como quer, ninguém entende o outro.
- **MapReduce com sub-tarefas dependentes** — não é paralelo; é serial com custo extra.
- **Chain sem timeout** — 1 agente lento trava tudo.
- **Mediator com regra de negócio embutida em código** — vira bola de neve. Extrair para rulebook.

## Observabilidade obrigatória

Todo sistema multi-agente Kolden expõe:
- **Trace de conversa** — quem falou com quem, ordem, timestamp.
- **Métricas por agente** — invocações, latência, erro rate.
- **Deadlock detector** — se blackboard ou fila trava, alerta.

Sem isso, você não debuga — adivinha.

## Handoffs

- **Escolha de fila específica (BullMQ vs NATS)** → @devops (Gage).
- **Deploy do Mediator com HA** → @architect (Aria).
- **Papel de cada agente no time** → Olimpo `topologias-de-time`.
- **Mensageria multi-canal (WhatsApp, Slack)** → Hermes.

## Regras Kolden

- **Padrão default é Mediator** (hermes-chief). Só evolua se dor justificar.
- **Todo agente registra em log estruturado** (JSON, correlação por trace_id).
- **Fila SEMPRE tem DLQ** e alerta em backlog.
- **Blackboard SEMPRE tem schema versionado** (JSON Schema).

---
## Atribuição
Herança histórica: **Erich Gamma + Richard Helm + Ralph Johnson + John Vlissides** ("Gang of
Four") — *Design Patterns* (1994), padrões Chain-of-Responsibility e Mediator; **Douglas
Schmidt** — Producer-Consumer patterns (POSA 2, 2000); **Jeffrey Dean + Sanjay Ghemawat** —
MapReduce paper (OSDI 2004, Google); **Barbara Hayes-Roth** — Blackboard Systems (1985);
**Yoav Shoham + Kevin Leyton-Brown** — *Multiagent Systems* (2009); **Michael Wooldridge** —
*An Introduction to MultiAgent Systems* (2002). Cross-link Hermes camada 2 (mensageria) +
Olimpo `topologias-de-time` (papéis). Adaptado de `github.com/msitarzewski/agency-agents@a597cb6`
(MIT), bucket B03/engineering, IDs G55, G56, G57, G58.
