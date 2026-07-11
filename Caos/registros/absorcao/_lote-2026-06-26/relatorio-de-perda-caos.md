---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/_lote-2026-06-26/_indice|_indice]]"
---

# Relatório de Perda (F6.5) — bucket Caos-fábrica

- **Alvo:** as **skills de criação do próprio Caos** (`C:/Kolden/Caos/.claude/skills/`) — o
  meta-agente que cria agentes/squads/skills/hooks/MCPs.
- **Lote:** `_lote-2026-06-26`. **Aplicação:** F6 (escrita de 4 habilidades-âncora novas +
  arquivo de recomendações cirúrgicas).
- **Repos aplicados:** `obra--superpowers` (896224c4, MIT, Jesse Vincent),
  `revfactory--harness` (cceac68e, Apache-2.0; conteúdo original em coreano),
  `garrytan--gstack` (11de390, MIT, © 2026 Garry Tan),
  `anthropics--claude-code`/plugin-dev (proprietário © Anthropic PBC — uso interno, não redistribuir).
- **Invariante:** `count(ABSORVIDO) + count(DIFERIDO-INCREMENTAL) + count(ROTEADO-OUTRO-SQUAD) +
  count(DESCARTADO) == soma dos inventários` · **PERDIDO = 0**.
- **Restrições honradas:** sem web, sem execução de código, sem commit/push, sem cópia literal
  (princípio extraído e reescrito em PT-BR; atribuição no rodapé de cada SKILL.md). Conteúdo
  coreano do harness traduzido pelo princípio, não copiado. Skills existentes do Caos **não
  foram reescritas** — só criadas 4 novas + um arquivo de recomendações.

## Habilidades-âncora criadas (4)

| # | habilidade | destino |
|---|---|---|
| 1 | `descoberta-de-skill` | `Caos/.claude/skills/descoberta-de-skill/SKILL.md` (+ `references/gatilhos-e-camadas.md`) |
| 2 | `validacao-de-skill` | `Caos/.claude/skills/validacao-de-skill/SKILL.md` (+ `references/avaliacao-ab.md`, `references/principios-de-persuasao.md`) |
| 3 | `topologias-de-time` | `Caos/.claude/skills/topologias-de-time/SKILL.md` (+ `references/catalogo-de-topologias.md`, `references/orquestradores.md`) |
| 4 | `qa-de-integracao-de-time` | `Caos/.claude/skills/qa-de-integracao-de-time/SKILL.md` (+ `references/checklist-de-coerencia.md`) |

## Âncoras ABSORVIDAS (mapa ID → habilidade)

| repo | ID | disposicao | destino |
|---|---|---|---|
| superpowers | G20 (SDO — description = SÓ quando usar, nunca resumir o workflow) | ABSORVIDO | descoberta-de-skill |
| gstack | G30 (triggers + preamble-tier — auto-invocação + carga em camadas) | ABSORVIDO (fundido) | descoberta-de-skill + `references/gatilhos-e-camadas.md` |
| gstack | G29 (gbrain context_queries — injeção de contexto de sessões anteriores no load) | ABSORVIDO (fundido, mecânica gbrain → MEMORY.md/sobre-a-empresa) | descoberta-de-skill + `references/gatilhos-e-camadas.md` |
| gstack | G54 (router de suíte por trigger/tier) | ABSORVIDO (fundido) | descoberta-de-skill + `references/gatilhos-e-camadas.md` |
| superpowers | G19 (writing-skills = TDD de processo, RED-GREEN-REFACTOR, micro-teste de redação) | ABSORVIDO | validacao-de-skill |
| superpowers | G22 (testing-skills-with-subagents — baseline RED vs GREEN, tipos de pressão) | ABSORVIDO (fundido) | validacao-de-skill + `references/avaliacao-ab.md` |
| superpowers | G21 (persuasion-principles — Iron Laws/Red Flags/anti-racionalização) | ABSORVIDO | validacao-de-skill/`references/principios-de-persuasao.md` |
| harness | G36 (teste A/B com-skill vs baseline) | ABSORVIDO (fundido) | validacao-de-skill |
| harness | G37 (assertion + descarte de non-discriminating) | ABSORVIDO (fundido) | validacao-de-skill + `references/avaliacao-ab.md` |
| harness | G38 (papéis Grader/Comparator/Analyzer) | ABSORVIDO (fundido) | validacao-de-skill/`references/avaliacao-ab.md` |
| harness | G39 (trigger eval should/should-NOT, near-miss) | ABSORVIDO (fundido) | validacao-de-skill + `references/avaliacao-ab.md` |
| harness | G41 (loop de iteração + workspace de avaliação) | ABSORVIDO (fundido) | validacao-de-skill |
| harness | G22-schema (eval_metadata/grading/timing) | ABSORVIDO (fundido) | validacao-de-skill/`references/avaliacao-ab.md` |
| harness | G4 (seleção de modo: Agent Team vs Sub-agent vs Híbrido) | ABSORVIDO | topologias-de-time + `references/orquestradores.md` |
| harness | G5–G10 (6 padrões: pipeline/fan-out/expert-pool/producer-reviewer/supervisor/hierárquica) | ABSORVIDO (fundido) | topologias-de-time/`references/catalogo-de-topologias.md` |
| harness | G11 (padrões compostos) | ABSORVIDO (fundido) | topologias-de-time/`references/catalogo-de-topologias.md` |
| harness | G12 (critérios de separação — 4 eixos) | ABSORVIDO | topologias-de-time |
| harness | G15 (seleção de tipo de agente general-purpose/Explore/Plan/custom) | ABSORVIDO (fundido) | topologias-de-time/`references/catalogo-de-topologias.md` |
| harness | G23/G24/G25 (orquestradores team/sub/híbrido) | ABSORVIDO (fundido) | topologias-de-time/`references/orquestradores.md` |
| harness | G26 (matriz de passagem mensagem/tarefa/arquivo/retorno) | ABSORVIDO (fundido) | topologias-de-time/`references/orquestradores.md` |
| harness | G27 (error handling: retry 1x, conflito mantém com fonte) | ABSORVIDO (fundido) | topologias-de-time/`references/orquestradores.md` |
| harness | G28 (diretrizes de tamanho de time) | ABSORVIDO (fundido) | topologias-de-time |
| harness | G29-workspace (`_workspace/{fase}_{agente}_{artefato}`) | ABSORVIDO (fundido) | topologias-de-time + `references/orquestradores.md` |
| harness | G32 (boundary mismatch — 6 tipos) | ABSORVIDO | qa-de-integracao-de-time/`references/checklist-de-coerencia.md` |
| harness | G33 (verificação de coerência de integração — comparação cruzada) | ABSORVIDO | qa-de-integracao-de-time |
| harness | G34 ("ler os dois lados" + QA incremental) | ABSORVIDO (fundido) | qa-de-integracao-de-time |
| harness | G35 (template do agente QA — general-purpose, verificar→reportar→corrigir) | ABSORVIDO (fundido) | qa-de-integracao-de-time |

Total de IDs-âncora absorvidos: **28** (a maioria em fusão de fontes para evitar skills duplicadas;
2 repos fundidos em `descoberta-de-skill`, 2 em `validacao-de-skill`).

## DIFERIDO-INCREMENTAL (alvo caos-fabrica, não aplicado nesta leva)
Técnicas reais de alvo caos-fabrica, adiadas por menor valor marginal agora, custo, ou por
dependerem de viabilidade de ambiente. Registradas para próxima leva incremental.
- **harness G40** (auto-otimização de description via train/test 60/40 + `claude -p`, máx 5 iter):
  citada em `validacao-de-skill/references/avaliacao-ab.md` como técnica, **não ativada** por custo
  e por exigir orquestração `claude -p`.
- **harness G1/G2/G3** (a meta-skill "fábrica de harness", Phase 0 auditoria de drift, Phase 1
  detecção de proficiência): sobrepõem o próprio Ritual de 9 fases + `verificacao-de-alinhamento`.
  REUSE conceitual; só a *calibração de proficiência do usuário* (G3) é delta novo — adiado.
- **harness G42/G43** (evolução de harness / workflow de manutenção pós-entrega): governança viva
  do time criado; candidato a reforço futuro do `registro-de-entidade`/curador.
- **harness G16/G17/G18/G19/G20/G21** (anatomia SKILL.md, description pushy, why-first,
  progressive disclosure, conexão skill↔agente, bundling): já cobertos por `criacao-de-skill`
  (REUSE) ou reforçados em `descoberta-de-skill`; o residual fica como recomendação (ver
  `recomendacoes-caos-fabrica.md`).
- **anthropics G7/G8/G9/G11/G14/G15/G16/G17** (plugin-dev: skill/hook/mcp/agent-development,
  agent-creator, validadores, workflow 8 fases): **reforços** das skills `criacao-de-*` existentes
  — anotados cirurgicamente em `recomendacoes-caos-fabrica.md` em vez de virar skills novas (o Caos
  já tem as skills de criação; material proprietário Anthropic, uso interno).
- **superpowers G25** (render-graphs Graphviz): tooling de autoria opcional, depende de `dot`
  instalado — não absorvido como skill.

## ROTEADO-OUTRO-SQUAD (fora deste bucket, sem perda)
IDs cujo `squad-alvo` no `mapa-de-decisao.md` **não** é caos-fabrica — pertencem a outras ondas.
- **superpowers** → prometeu: G1, G3, G4, G8, G9, G10, G11, G12, G13, G14, G16. → dedalo: G5, G6,
  G7, G17, G18, G23, G24. → tooling/vendor: G2 (visual companion).
- **harness** → dedalo: (os mesmos G32–G35 têm espelho em dedalo no mapa; absorvidos aqui como
  meta-QA de times — o ângulo caos-fabrica). → criacao-de-subagent: G14, G15-detalhe. →
  referências: G44 (5 exemplos de time). → caos-fabrica REUSE: G13 (consulta-ao-registro).
- **gstack** → olimpo: G2, G6, G26, G28. → prometeu: G3, G8, G9, G10, G11, G18, G20, G21. →
  harmonia: G4, G5, G13, G14, G15, G16, G17, G27, G47. → egide: G7. → aletheia: G1. → metis: G12,
  G39. → dedalo: G19, G22, G23, G24, G25, G46, G53. → argos: G31, G36. → vendor inerte: G32–G35,
  G37, G38, G40–G45, G48–G52, G58. → referências: G55. → caos-fabrica (par dos absorvidos): nenhum
  residual. **DESCARTADO no mapa-gstack:** G56, G57 (duplicatas/exemplo) — registrados no relatório
  do bucket gstack/vendor, não nesta leva.
- **anthropics** → harmonia: G1, G2, G3, G4, G5, G6 (frontend-design). → dedalo: G10, G12, G13,
  G17, G18, G19, G20, G21, G22 (commands/packaging/settings/hookify).

## DESCARTADO (nesta leva)
Nenhum item descartado por inadequação **dentro do escopo caos-fabrica**. Descartes do gstack
(G56/G57) são de outro bucket e ficam no relatório daquele bucket.

## Catálogo
**ATUALIZADO.** `Caos/.claude/skills/catalogo.md` recebeu as 4 entradas novas
(`descoberta-de-skill`, `validacao-de-skill`, `topologias-de-time`, `qa-de-integracao-de-time`)
com gatilho de invocação e propósito.

## Conformidade do invariante
- ABSORVIDO: 28 IDs-âncora (alvo caos-fabrica) → 4 habilidades + 1 arquivo de recomendações.
- DIFERIDO-INCREMENTAL: IDs caos-fabrica adiados (harness G40/G1-3/G42/G43/G16-21; anthropics
  plugin-dev G7-17 como recomendação; superpowers G25).
- ROTEADO-OUTRO-SQUAD: demais IDs dos 4 inventários (alvo ≠ caos-fabrica) — ondas A2/A3.
- DESCARTADO (caos-fabrica): 0. · **PERDIDO: 0.** Nada saiu sem registro.
