---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/obra--superpowers/inventario-de-capacidades|inventario-de-capacidades]]"
  - "[[Caos/registros/absorcao/obra--superpowers/seguranca|seguranca]]"
---

# Mapa de decisão — obra--superpowers

- **slug:** obra--superpowers | **sha:** 896224c4 | **rota:** A
- **Princípio:** REUSE > ADAPT > CREATE. Viés desta missão: na dúvida, ADAPT/CREATE (REUSE sem prova item-a-item = perda silenciosa).
- **Contexto de match:** O Caos NÃO tem hoje skills nomeadas equivalentes a "TDD", "systematic-debugging", "writing-plans". O mais próximo: Prometeu (`architect-first`, `spec-build-review`, `checklist-runner`, `coderabbit-review`, `skill-creator`, `mcp-builder`) = workflow de engenharia spec-driven; Dedalo = domínio Claude Code (hooks/MCP/skills/subagents/git); Caos = `criacao-de-skill`/`criacao-de-subagent`/`criacao-de-hooks`. Nenhum cobre item-a-item — daí ADAPT predominante.

| ID | decisao | squad-alvo | justificativa(1 linha) |
|---|---|---|---|
| G1 | ADAPT | prometeu | Design-before-code com HARD-GATE de aprovação; complementa `architect-first`/`spec-build-review` que já existem mas não impõem o gate conversacional 1-pergunta-por-vez. |
| G2 | CREATE | prometeu (tooling) / vendor | Servidor visual zero-dep não tem equivalente; baixa prioridade, opcional — reescrever sem `BRAINSTORM_OPEN_CMD` via shell (ver segurança). |
| G3 | ADAPT | prometeu | Planos bite-sized (2-5 min) com código completo e sem placeholders afinam o `spec-pipeline`/`writing-plans` ausente. |
| G4 | ADAPT | prometeu | Execução de plano com checkpoints e parada por blocker; par natural do G3. |
| G5 | ADAPT | dedalo | Orquestração de 1 subagente fresco/tarefa + review + ledger durável: o Caos já faz fan-out (ingestão/auditoria) mas sem o padrão formalizado; Dedalo é o dono de "eng de agentes/subagents". |
| G6 | ADAPT | dedalo | Padrão file-handoff (brief/report/diff como arquivos) combate poluição de contexto do orquestrador; técnica reaproveitável em todas as cascatas do Caos/Dedalo. |
| G7 | ADAPT | dedalo | Fan-out por domínio independente formaliza o que o Caos já pratica ad hoc na tradução em lote. |
| G8 | ADAPT | prometeu | TDD com Iron Law e anti-racionalização; Prometeu tem QA-loop mas não a disciplina test-first explícita. |
| G9 | ADAPT | prometeu | Anti-patterns de teste — anexo direto do G8. |
| G10 | ADAPT | prometeu | Debugging sistemático em 4 fases; lacuna real no acervo de qualidade. |
| G11 | ADAPT | prometeu | Rastreio de causa-raiz backward — técnica de apoio do G10. |
| G12 | ADAPT | prometeu | Defense-in-depth pós-causa-raiz — técnica de apoio do G10. |
| G13 | ADAPT | prometeu | Condition-based-waiting mata testes flaky/race — técnica de apoio do G10/G8. |
| G14 | ADAPT | prometeu | Review por subagente com contexto curado; difere de `coderabbit-review` (CLI externo) — é a via subagente-nativa, complementar. |
| G15 | ADAPT | prometeu | Cultura de receber review com rigor técnico (anti-bajulação "you're absolutely right"); aplicável a todos os squads, ancorar em Prometeu. |
| G16 | ADAPT | prometeu | Gate "evidência antes de alegar conclusão" reforça o `checklist-runner` e a política anti-alucinação do Caos. |
| G17 | ADAPT | dedalo | Finalização de branch (merge/PR/keep/discard) com cleanup de worktree por procedência: workflow git do Claude Code = domínio Dedalo. |
| G18 | ADAPT | dedalo | Isolamento por worktree com detecção/guard de submódulo; domínio git/Claude Code do Dedalo. |
| G19 | ADAPT | caos-fabrica | "writing-skills = TDD de processo" eleva `criacao-de-skill`: baseline RED sem skill vs GREEN com skill. |
| G20 | ADAPT | caos-fabrica | SDO (description = SÓ "quando usar", nunca resumir o workflow) corrige um anti-pattern real nas descrições das skills do Caos. |
| G21 | ADAPT | caos-fabrica | Persuasion-principles fundamentam as skills rígidas (Iron Laws/Red Flags/racionalizações) que o Caos já usa intuitivamente. |
| G22 | ADAPT | caos-fabrica | Pressure-testing de skill por subagente antes do deploy — vira gate da Fase 5.3/6 do Ritual. |
| G23 | ADAPT | dedalo | Bootstrap "regra do 1%" + ordem de prioridade (usuário > skills > sistema) + mapa multi-harness; padrão de invocação de skills, dono Dedalo. |
| G24 | ADAPT | dedalo | Reflexo SessionStart que injeta o gateway de skills por harness; Dedalo é o dono de hooks/reflexos do Claude Code. |
| G25 | CREATE | caos-fabrica (tooling) | Renderizador Graphviz das skills — ferramenta de autoria opcional; depende de `dot` instalado, baixa prioridade. |

## Síntese

Decisão dominante: **ADAPT** (21 de 25). Três squads-alvo, por afinidade de domínio:
- **prometeu** (12 IDs) — workflow de engenharia + qualidade: brainstorming, planos, TDD, debugging e suas técnicas, code-review, verificação.
- **dedalo** (7 IDs) — orquestração de subagentes, git/worktrees, bootstrap e reflexo de skills (domínio Claude Code).
- **caos-fabrica** (4 IDs) — meta: elevar `criacao-de-skill` com writing-skills/SDO/persuasão/pressure-testing.
- **CREATE** (2 IDs): visual companion (G2) e render-graphs (G25), ambos tooling opcional de baixa prioridade.

Sem REUSE: nenhuma skill existente cobre item-a-item; afirmar "já temos engenharia" seria perda silenciosa. O ouro do repo é a metodologia behavior-shaping (Iron Laws, Red Flags, anti-racionalização) e o insight de SDO — tudo absorvível como texto, reescrito em pt-BR na fase seguinte.
