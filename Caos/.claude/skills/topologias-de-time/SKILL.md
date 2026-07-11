---
name: topologias-de-time
description: Use ao decidir a arquitetura de coordenação de um squad/time de agentes — quando o arquiteto precisa escolher entre pipeline, fan-out/fan-in, expert pool, producer-reviewer, supervisor ou delegação hierárquica, dimensionar o time e definir o protocolo de passagem de dados entre os membros. Vai além do "solo vs squad": define COMO os agentes se coordenam.
tipo: skill
area: Caos
up: "[[Caos/_MOC-caos]]"
---

# Topologias de time de agentes

O `arquiteto` do Caos hoje decide **solo vs squad** e tiers (0 orquestrador + 1 especialistas).
Esta habilidade adiciona a camada que faltava: o **padrão de coordenação** entre os membros —
o vocabulário formal de topologias, os modos de orquestração e como dimensionar o time. Use na
Fase 3 (Arquitetura) e na 5.1 (orquestrador) do Ritual, e na conformação de squads antigos.

## Os 6 padrões de topologia
Escolha pelo formato do trabalho, não por hábito. Catálogo completo (com diagramas, exemplos e
armadilhas) em **`references/catalogo-de-topologias.md`**.

| # | Padrão | Quando | Armadilha principal |
|---|---|---|---|
| 1 | **Pipeline** | cada etapa depende forte do produto da anterior (analisar→projetar→implementar→verificar) | gargalo de uma etapa atrasa tudo; isole etapas ao máximo |
| 2 | **Fan-out/Fan-in** | mesma entrada, perspectivas/áreas independentes em paralelo → integração | a qualidade da **integração** decide a qualidade final |
| 3 | **Expert Pool** | um roteador chama só o especialista certo por tipo de entrada | acurácia do roteador é tudo |
| 4 | **Producer-Reviewer** | qualidade importa e há critério objetivo de verificação | loop infinito — fixe **teto de 2–3 retries** |
| 5 | **Supervisor** | carga variável; distribuição decidida em runtime | o supervisor vira gargalo se a unidade de delegação for pequena |
| 6 | **Delegação hierárquica** | o problema se decompõe naturalmente em níveis | profundidade >2 perde contexto; **fique em ≤2 níveis** |

**Fan-out ≠ Supervisor:** fan-out distribui o trabalho **fixo, antecipado**; supervisor
**ajusta dinamicamente** vendo o progresso.

### Padrões compostos (o caso real)
Na prática, combinam-se: **fan-out + producer-reviewer** (gerar em paralelo, revisar cada um),
**pipeline + fan-out** (etapa do meio paralelizada), **supervisor + expert-pool** (supervisor
chama especialistas dinamicamente). Comece pelo padrão dominante e componha.

## Modo de execução: time vivo vs subagente vs híbrido
Como os agentes efetivamente coordenam depende do runtime. Três modos (templates em
`references/orquestradores.md`):
- **Sub-agent (padrão Kolden hoje)** — orquestrador despacha subagentes (`Agent`,
  `run_in_background`) e **coleta pelo retorno**. Cada subagente é isolado e single-shot. É o que
  o Caos já faz em fan-out de ingestão/tradução. Funciona em qualquer ambiente.
- **Agent Team (vivo)** — membros se **coordenam lateralmente** em runtime (`TeamCreate` +
  `SendMessage` + `TaskCreate`): compartilham descobertas, desafiam uns aos outros, ajustam rumo.
  Natural para fan-out de pesquisa, producer-reviewer e supervisor. **Pré-requisito:** o ambiente
  precisa expor essas ferramentas de time — **verifique a viabilidade antes de prometer**; sem
  elas, caia para sub-agent.
- **Híbrido** — alterna por fase (ex.: time vivo na pesquisa, sub-agent na implementação isolada),
  com regras de transição explícitas.

> Restrição de aninhamento: um membro de time vivo não cria outro time. Hierarquia = nível 1 em
> time, nível 2 em sub-agent — ou achate para um único time.

## Critérios de separação de agente (4 eixos)
Antes de criar mais um especialista, justifique por pelo menos um eixo: **especialidade**
(domínio distinto), **paralelismo** (roda concorrente com outro), **isolamento de contexto**
(contexto pesado que polui o orquestrador) ou **reuso** (serve a vários fluxos). Sem nenhum eixo,
**não separe** — vira overhead.

## Dimensionamento do time
Estime tarefas → derive nº de membros → tarefas por membro. Time grande demais tem overhead de
coordenação que come o ganho do paralelismo; pequeno demais serializa. Heurística: prefira o
**menor** time que cubra os eixos de separação. Conecte ao tamanho do trabalho, não à ambição.

## Protocolo de passagem de dados
Defina explicitamente, por modo, como o dado anda — matriz completa em `references/orquestradores.md`:
- **mensagem** (time vivo, `SendMessage`), **tarefa** (`TaskCreate`, lista compartilhada),
  **arquivo** (handoff por artefato — ver convenção abaixo), **retorno** (sub-agent coleta a saída).
- **Error handling do orquestrador:** retry 1x; dado conflitante → **mantenha com a fonte, nunca
  apague** (alinha ao princípio de não-perda do `protocolo-de-absorcao-sem-perda`).
- **Convenção de workspace:** artefatos intermediários em `_workspace/{fase}_{agente}_{artefato}`
  — auditáveis, preservados para inspeção.

## Habilidades relacionadas
- Materializar o squad escolhido (manifesto, orquestrador, especialistas): `criacao-de-squad`.
- Decidir tipo e tools de cada especialista: `criacao-de-subagent`.
- Verificar que o time montado está **coerente entre componentes**: `qa-de-integracao-de-time`.
- Conformar um squad antigo ao padrão: `auditoria-de-squad`.

---
*Fonte absorvida (princípio extraído, reescrito em PT-BR, sem cópia literal):
`revfactory--harness@cceac68e` — `skills/harness/references/agent-design-patterns.md` (6 padrões +
compostos + seleção de tipo + critérios de separação), `references/orchestrator-template.md`
(orquestradores team/sub/híbrido, matriz de passagem, error handling), `skills/harness/SKILL.md`
(dimensionamento, `_workspace/`). Conteúdo original em coreano. Apache-2.0. Uso interno Kolden.*
