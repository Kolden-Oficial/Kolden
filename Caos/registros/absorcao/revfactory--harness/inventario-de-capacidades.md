---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/revfactory--harness/mapa-de-decisao|mapa-de-decisao]]"
  - "[[Caos/registros/absorcao/revfactory--harness/seguranca|seguranca]]"
---

# Inventário de capacidades — revfactory--harness

- **slug:** revfactory--harness · **sha:** cceac68ea1d0ad198ef4b7b906cd238375836387 · **rota:** A
- **Natureza:** meta-skill ("harness factory") do Claude Code que converte a descrição de um
  domínio num **time de agentes** + as **skills** que eles usam. 1 `SKILL.md` (workflow de 8 fases,
  Phase 0→7) + 6 `references/`. Conteúdo em coreano. Plugin Apache-2.0.

| ID | capacidade | tipo | keywords | dominio | fonte(arquivo:linha) |
|---|---|---|---|---|---|
| G1 | Meta-skill "fábrica de harness": de 1 frase de domínio → time de agentes + skills + orquestrador | skill | meta-skill, fabrica, agent-team, scaffolding | eng-de-agentes | skills/harness/SKILL.md:1-8 |
| G2 | Phase 0 — auditoria de estado / detecção de drift (agents+skills vs registro no CLAUDE.md) | metodo-prompt | auditoria, drift, sincronizacao | eng-de-agentes | SKILL.md:18-35 |
| G3 | Phase 1 — análise de domínio + detecção de proficiência do usuário (calibra tom/jargão) | metodo-prompt | dominio, proficiencia, tom | eng-de-agentes | SKILL.md:37-42 |
| G4 | Seleção de modo de execução: Agent Team vs Sub-agent vs Híbrido (árvore de decisão) | metodo-prompt | agent-team, subagent, hibrido, teamcreate | eng-de-agentes | SKILL.md:44-61; references/agent-design-patterns.md:1-77 |
| G5 | Padrão de arquitetura: Pipeline (sequencial dependente) | metodo-prompt | pipeline, sequencial | eng-de-agentes | agent-design-patterns.md:83-93 |
| G6 | Padrão: Fan-out/Fan-in (paralelo + integração) | metodo-prompt | fanout, fanin, paralelo | eng-de-agentes | agent-design-patterns.md:95-107 |
| G7 | Padrão: Expert Pool (roteador → especialista sob demanda) | metodo-prompt | expert-pool, roteador | eng-de-agentes | agent-design-patterns.md:109-119 |
| G8 | Padrão: Producer-Reviewer (gerar→verificar, máx. 2-3 retries) | metodo-prompt | gerar-verificar, reviewer, retry | eng-de-agentes | agent-design-patterns.md:121-131 |
| G9 | Padrão: Supervisor (distribuição dinâmica em runtime) | metodo-prompt | supervisor, dinamico, batch | eng-de-agentes | agent-design-patterns.md:133-146 |
| G10 | Padrão: Hierarchical Delegation (delegação recursiva, ≤2 níveis) | metodo-prompt | hierarquico, delegacao | eng-de-agentes | agent-design-patterns.md:148-160 |
| G11 | Padrões compostos (fanout+producer-reviewer, pipeline+fanout, supervisor+expert-pool) | metodo-prompt | composto, hibrido | eng-de-agentes | agent-design-patterns.md:162-183 |
| G12 | Critérios de separação de agente (4 eixos: especialidade/paralelismo/contexto/reuso) | metodo-prompt | separacao, granularidade | eng-de-agentes | agent-design-patterns.md:253-260 |
| G13 | Design de reuso de agente (classificação de duplicata + generalização) | metodo-prompt | reuso, duplicata, generalizacao | eng-de-agentes | agent-design-patterns.md:262-275 |
| G14 | Template de definição de agente (com seção "protocolo de comunicação de time") | metodo-prompt | template-agente, protocolo-time | eng-de-agentes | agent-design-patterns.md:215-251 |
| G15 | Seleção de tipo de agente (general-purpose/Explore/Plan/custom) por necessidade | metodo-prompt | tipo-agente, explore, plan, ferramentas | eng-de-agentes | agent-design-patterns.md:185-211 |
| G16 | Estrutura de skill (SKILL.md + scripts/references/assets) | skill | skill, estrutura, frontmatter | eng-de-agentes | SKILL.md:107-128 |
| G17 | Description "pushy" + palavras-gatilho de follow-up (compensa Claude conservador) | metodo-prompt | description, trigger, pushy | eng-de-agentes | SKILL.md:130-137; references/skill-writing-guide.md:20-54 |
| G18 | Redação de skill: Why-first / generalização (anti-overfitting) / tom imperativo / economia de contexto | metodo-prompt | why-first, generalizacao, imperativo | eng-de-agentes | SKILL.md:139-147; skill-writing-guide.md:57-101 |
| G19 | Progressive disclosure (carregamento em 3 níveis, split por domínio, ToC em refs >300 linhas) | metodo-prompt | progressive-disclosure, contexto, refs | eng-de-agentes | SKILL.md:149-172; skill-writing-guide.md:139-186 |
| G20 | Conexão skill↔agente (3 vias: Skill tool / inline / load de reference) | metodo-prompt | skill-agente, conexao | eng-de-agentes | SKILL.md:173-179; agent-design-patterns.md:290-300 |
| G21 | Critérios de bundling de script (sinais de repetição na transcrição → scripts/) | metodo-prompt | bundling, scripts, repeticao | eng-de-agentes | skill-writing-guide.md:188-200 |
| G22 | Schema padrão de dados de avaliação (eval_metadata.json / grading.json / timing.json) | metodo-prompt | eval, schema, grading, timing | eng-de-agentes | skill-writing-guide.md:203-261 |
| G23 | Template de orquestrador A — Agent Team (TeamCreate + SendMessage + TaskCreate, auto-coordenação) | metodo-prompt | orquestrador, teamcreate, sendmessage, taskcreate | eng-de-agentes | references/orchestrator-template.md:11-162 |
| G24 | Template de orquestrador B — Sub-agent (Agent + run_in_background, coleta por retorno) | metodo-prompt | orquestrador, subagent, run-in-background | eng-de-agentes | orchestrator-template.md:166-215 |
| G25 | Template de orquestrador C — Híbrido (modo por fase, regras de transição team↔sub) | metodo-prompt | hibrido, transicao, fase | eng-de-agentes | orchestrator-template.md:219-263 |
| G26 | Matriz de protocolo de passagem de dados (mensagem/tarefa/arquivo/retorno por modo) | metodo-prompt | data-passing, handoff, matriz | eng-de-agentes | SKILL.md:222-241; orchestrator-template.md:119-132 |
| G27 | Error handling de orquestrador (retry 1x; dado conflitante: manter c/ fonte, nunca apagar) | metodo-prompt | erro, retry, conflito, fallback | eng-de-agentes | SKILL.md:242-246; orchestrator-template.md:134-143 |
| G28 | Diretrizes de tamanho de time (tarefas → nº de membros → tarefas/membro) | metodo-prompt | tamanho-time, overhead | eng-de-agentes | SKILL.md:248-256 |
| G29 | Convenção `_workspace/` p/ artefatos intermediários (`{phase}_{agent}_{artifact}`; preservar p/ auditoria) | metodo-prompt | workspace, artefato, auditoria | eng-de-agentes | SKILL.md:236-241; orchestrator-template.md:93-117 |
| G30 | Ponteiro de harness no CLAUDE.md (mínimo: trigger + tabela de histórico de mudanças; NÃO listar agentes/skills) | metodo-prompt | claude-md, ponteiro, historico | eng-de-agentes | SKILL.md:258-277 |
| G31 | Suporte a follow-up (Phase 0 de contexto: inicial/novo/re-exec parcial + keywords de retomada + re-invocação) | metodo-prompt | follow-up, contexto, re-execucao | eng-de-agentes | SKILL.md:279-300; orchestrator-template.md:37-47 |
| G32 | QA — padrões de bug de "boundary mismatch" (6 tipos de descasamento de contrato entre componentes) | referencia | qa, boundary, contrato, bug | qa/eng | references/qa-agent-guide.md:17-37 |
| G33 | QA — verificação de coerência de integração (comparação cruzada: API↔hook, rota↔href, transição-estado↔código) | metodo-prompt | qa, integracao, comparacao-cruzada | qa/eng | qa-agent-guide.md:40-99 |
| G34 | QA — princípio "ler os dois lados" + QA incremental (por módulo, não só no fim) | metodo-prompt | qa, incremental, dois-lados | qa/eng | qa-agent-guide.md:102-139 |
| G35 | QA — template de definição do agente QA (general-purpose; prioridade integração>spec>design>código) | metodo-prompt | qa, template, inspector | qa/eng | qa-agent-guide.md:141-213 |
| G36 | Teste de skill — execução comparativa With-skill vs Baseline (A/B para medir valor agregado) | metodo-prompt | teste, baseline, ab, valor | eng-de-agentes | SKILL.md:319-337; references/skill-testing-guide.md:75-113 |
| G37 | Avaliação por assertion (channel objetivo; descartar "non-discriminating assertion") | metodo-prompt | assertion, scoring, discriminacao | eng-de-agentes | skill-testing-guide.md:116-162 |
| G38 | Papéis especialistas de teste: Grader / Comparator (cego A/B) / Analyzer (estatístico) | metodo-prompt | grader, comparator, analyzer | eng-de-agentes | skill-testing-guide.md:166-196 |
| G39 | Validação de trigger: should-trigger (8-10) + should-NOT-trigger (8-10, foco "near-miss") | metodo-prompt | trigger, near-miss, eval, conflito | eng-de-agentes | SKILL.md:338-347; skill-testing-guide.md:233-262 |
| G40 | Auto-otimização de description (split train/test 60/40, `claude -p`, máx 5 iter — anti-overfit) | metodo-prompt | otimizacao, description, train-test | eng-de-agentes | skill-testing-guide.md:264-275 |
| G41 | Loop de iteração + estrutura de workspace de avaliação (iteration-N preservadas, nomes descritivos) | metodo-prompt | iteracao, workspace, avaliacao | eng-de-agentes | SKILL.md:331-336; skill-testing-guide.md:199-307 |
| G42 | Evolução de harness (coleta de feedback pós-exec + tabela de histórico + gatilhos de evolução) | metodo-prompt | evolucao, feedback, historico, regressao | eng-de-agentes | SKILL.md:361-405 |
| G43 | Workflow de operação/manutenção (auditar→mudança incremental→sync CLAUDE.md→verificar) | metodo-prompt | manutencao, operacao, sync | eng-de-agentes | SKILL.md:407-427 |
| G44 | 5 exemplos completos de time (research/novel/webtoon/code-review/migration) com arquivos-modelo | referencia | exemplos, time, casos | eng-de-agentes | references/team-examples.md:1-329 |

**Total: 44 capacidades.** Núcleo da capacidade-alvo (rota A): G1 (a fábrica) + G4–G11 (modos/padrões
de topologia de time) + G23–G25 (orquestradores team/sub/híbrido) + G32–G35 (QA de integração) +
G36–G41 (teste de skill A/B + trigger eval). Os demais reforçam autoria de skill e governança.
