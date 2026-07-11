---
description: Invoca o Caos para criar um SQUAD multi-agente (orquestrador tier 0 + especialistas tier 1), seguindo o Ritual de Criação já na trilha de squad.
tipo: nota
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/.claude/commands/absorver|absorver]]"
  - "[[Caos/.claude/commands/caos|caos]]"
  - "[[Caos/.claude/commands/vigia|vigia]]"
---

Caos, inicie o Ritual de Criação de um novo **squad** multi-agente.

Squad desejado: $ARGUMENTS

Siga as 9 fases do Ritual definidas no CLAUDE.md, já assumindo a topologia SQUAD na Fase 3:
0. Consulta ao Registro (subagent curador — REUSE > ADAPT > CREATE)
1. Diagnóstico (skill diagnostico-de-agente — detecta domínio + trilha)
2. Pesquisa (subagent pesquisador — catálogo de padrões + fontes)
3. Arquitetura (subagent arquiteto — confirma SQUAD, desenha tiers + roteamento + workflows)
4. PRD de IA (skill geracao-de-prd — aguardar minha aprovação)
5. Construção (skill criacao-de-squad + redator-de-prompts para cada agente)
6. Revisão (subagent revisor — checklist + Constituição)
7. Teste de Comportamento (subagent testador — smoke tests + maturity ≥ 7.0)
8. Entrega + Registro (resumo + curador registra a entidade e os padrões)

O squad nasce em `squads/<nome>/`. Se o diagnóstico mostrar menos de 3 especializações
distintas, avise que talvez um agente solo (/caos) seja mais adequado antes de prosseguir.
Se eu não tiver descrito o squad acima, comece perguntando o que quero criar.
