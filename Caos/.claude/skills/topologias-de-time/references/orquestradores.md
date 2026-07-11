---
tipo: nota
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/.claude/skills/topologias-de-time/references/catalogo-de-topologias|catalogo-de-topologias]]"
---

# Orquestradores: team / sub-agent / híbrido + protocolo de passagem

Fonte: `revfactory--harness@cceac68e` — `skills/harness/references/orchestrator-template.md` e
`skills/harness/SKILL.md` (original em coreano). Reescrito em PT-BR. Apache-2.0.

## A. Orquestrador Sub-agent (padrão Kolden hoje)
O controlador despacha subagentes e coleta pelo **retorno**. Cada subagente é isolado.
```
para cada tarefa independente:
    Agent(subagent_type, prompt=brief, run_in_background=true)
aguarda conclusões → coleta retornos → integra
```
- **Quando:** tarefas isoladas single-shot; ambiente sem ferramentas de time vivo.
- **Vantagem:** funciona em qualquer ambiente; contexto do controlador fica limpo.
- **Limite:** sem coordenação lateral — subagentes não se falam. É o modo do fan-out de ingestão
  e tradução em lote que o Caos já pratica.

## B. Orquestrador Agent Team (vivo)
Membros se coordenam em runtime via ferramentas de time.
```
TeamCreate(membros=[...])            # cria o time vivo
TaskCreate(...)                      # registra tarefas na lista compartilhada
SendMessage(para=membro, conteudo)   # coordenação lateral, troca de descobertas
```
- **Quando:** fan-out de pesquisa, producer-reviewer, supervisor — qualquer caso em que a troca
  entre membros melhora o resultado.
- **Pré-requisito (gate):** o ambiente precisa expor `TeamCreate`/`SendMessage`/`TaskCreate`.
  **Verifique antes de prometer a capacidade**; sem elas, caia para o modo Sub-agent (A).
- **Limite:** membro não cria sub-time (sem aninhamento).

## C. Orquestrador Híbrido
Alterna modo por fase, com regras de transição explícitas.
```
Fase pesquisa   → modo Team (descobertas compartilhadas)
Fase implementação → modo Sub-agent (tarefas isoladas em paralelo)
Fase integração → modo Team (revisão cruzada)
```
- Defina o **gatilho de transição** de cada fronteira e o que é passado adiante (qual artefato).

## Matriz de passagem de dados
| Canal | Modo | Uso |
|---|---|---|
| **mensagem** | Team | `SendMessage`: coordenação, pergunta, desafio entre membros |
| **tarefa** | Team/Supervisor | `TaskCreate`: lista compartilhada; workers se auto-atribuem |
| **arquivo** | qualquer | handoff por artefato em `_workspace/{fase}_{agente}_{artefato}` |
| **retorno** | Sub-agent | saída do subagente coletada pelo controlador |

### Error handling do orquestrador
- **Retry:** 1x por falha transitória.
- **Conflito de dados:** mantenha **ambos com a fonte** (proveniência), **nunca apague** o
  divergente. Casa com o invariante de não-perda do `protocolo-de-absorcao-sem-perda`.
- **Timeout/bloqueio:** registre o estado em `_workspace/` e suba o blocker — não invente
  resultado.

### Convenção `_workspace/`
Todos os artefatos intermediários ficam em `_workspace/{fase}_{agente}_{artefato}`, preservados
para auditoria. É a trilha que o `qa-de-integracao-de-time` e o `auditoria-de-squad` inspecionam.

## Diretriz de dimensionamento
1. Liste as tarefas do trabalho. 2. Agrupe por eixo de separação (especialidade/paralelismo/
contexto/reuso). 3. Um membro por grupo coeso. 4. Estime tarefas/membro — se um membro acumula
tarefas demais, há candidato a split; se vários membros têm 1 tarefa trivial, há candidato a
fusão. Prefira o **menor** time que cubra os eixos.
