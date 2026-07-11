---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/revfactory--harness/inventario-de-capacidades|inventario-de-capacidades]]"
  - "[[Caos/registros/absorcao/revfactory--harness/seguranca|seguranca]]"
---

# Mapa de decisão — revfactory--harness

Comparação item-a-item contra o registro de entidades e as skills do Caos
(`criacao-de-squad`, `criacao-de-skill`, `criacao-de-subagent`, `diagnostico-de-agente`,
`consulta-ao-registro`, `geracao-de-prd`, `ingestao-de-repositorio`/`auditoria-de-squad`).

**Leitura central:** o harness é uma *fábrica de times de agentes* — sobreposição direta com o
**próprio Caos** (entidade `caos-fabrica`). A maior parte da capacidade é REUSE conceitual, mas a
absorção valiosa está nas **técnicas que o Caos ainda não tem explícitas**: o catálogo de 6 padrões
de topologia, o **runtime de time vivo** (TeamCreate/SendMessage/TaskCreate — coordenação lateral
entre agentes, que o Caos não modela: seus squads são orquestrador→especialistas estáticos), o
modo híbrido, o **QA de coerência de integração** e o **teste de skill A/B + trigger eval**.
Aplicado o viés autônomo (preferir ADAPT/CREATE a REUSE sem prova item-a-item).

| ID | decisao | squad-alvo | justificativa(1 linha) |
|---|---|---|---|
| G1 | REUSE | caos-fabrica | O Caos JÁ é a fábrica de agentes/squads via Ritual de 9 fases — mesma função meta. |
| G2 | ADAPT | caos-fabrica | `verificacao-de-alinhamento` cobre pontas soltas, mas não a auditoria de drift agents↔skills↔CLAUDE.md de um time. |
| G3 | ADAPT | caos-fabrica (diagnostico-de-agente) | Detecção de domínio já existe (Passo 0); a calibração de proficiência/tom do usuário é nova. |
| G4 | CREATE | caos-fabrica | Modo Agent Team vs Sub-agent vs Híbrido não existe; o arquiteto só decide solo×squad, sem topologia de runtime. |
| G5 | ADAPT | caos-fabrica (arquiteto) | Padrão Pipeline como item nomeado do catálogo de arquitetura do arquiteto. |
| G6 | ADAPT | caos-fabrica (arquiteto) | Padrão Fan-out/Fan-in nomeado — squads atuais não o expressam formalmente. |
| G7 | ADAPT | caos-fabrica (arquiteto) | Padrão Expert Pool (roteador→especialista) — aproxima do roteamento por keyword do squad. |
| G8 | ADAPT | caos-fabrica (arquiteto) | Padrão Producer-Reviewer com teto de retry — formaliza o par gerador/revisor. |
| G9 | ADAPT | caos-fabrica (arquiteto) | Padrão Supervisor (distribuição dinâmica) — novo no repertório de topologias. |
| G10 | ADAPT | caos-fabrica (arquiteto) | Delegação hierárquica com limite de profundidade — nova diretriz de arquitetura. |
| G11 | ADAPT | caos-fabrica (arquiteto) | Padrões compostos: vocabulário ausente no arquiteto. |
| G12 | ADAPT | caos-fabrica (criacao-de-squad) | Critérios de separação por 4 eixos refinam a granularidade de especialistas do squad. |
| G13 | REUSE | consulta-ao-registro | REUSE>ADAPT>CREATE com classificação de duplicata já é o núcleo do curador. |
| G14 | ADAPT | criacao-de-subagent | Template de agente já existe; a seção "protocolo de comunicação de time" é o delta a absorver. |
| G15 | ADAPT | criacao-de-subagent | Tabela de escolha general-purpose/Explore/Plan/custom refina a seleção de tipo+tools. |
| G16 | REUSE | criacao-de-skill | Anatomia SKILL.md + scripts/references/assets é idêntica à do Caos. |
| G17 | ADAPT | criacao-de-skill | Description "pushy" + keywords de follow-up endurece o guia de description existente. |
| G18 | REUSE | criacao-de-skill | Why-first/generalização/tom imperativo já constam do guia de redação de skill do Caos. |
| G19 | REUSE | criacao-de-skill | Progressive disclosure / references sob demanda = o "G3" já registrado na criacao-de-skill. |
| G20 | ADAPT | criacao-de-skill | As 3 vias de conexão skill↔agente (Skill tool/inline/ref-load) explicitam o que o Caos faz implícito. |
| G21 | ADAPT | criacao-de-skill | Critérios de bundling de script por sinal de repetição — heurística nova. |
| G22 | ADAPT | criacao-de-skill (evals) | Schema eval_metadata/grading/timing padroniza a pasta `evals/` já prevista. |
| G23 | CREATE | caos-fabrica | Orquestrador Agent Team vivo (TeamCreate/SendMessage/TaskCreate) — runtime que o Caos não possui. |
| G24 | ADAPT | criacao-de-squad | Orquestrador Sub-agent (Agent+run_in_background) aproxima do orquestrador-base atual. |
| G25 | CREATE | caos-fabrica | Orquestrador Híbrido (modo por fase + transições) — sem equivalente. |
| G26 | ADAPT | criacao-de-squad | Matriz mensagem/tarefa/arquivo/retorno enriquece a definição de handoffs do squad.yaml. |
| G27 | ADAPT | criacao-de-squad | Política "retry 1x; conflito mantém com fonte" reforça error-handling de workflow. |
| G28 | ADAPT | caos-fabrica | Diretriz de tamanho de time é heurística de dimensionamento ausente. |
| G29 | ADAPT | caos-fabrica | Convenção `_workspace/{phase}_{agent}_{artifact}` para artefatos intermediários auditáveis. |
| G30 | ADAPT | criacao-de-squad | Ponteiro minimalista + tabela de histórico no CLAUDE.md do squad (anti-duplicação). |
| G31 | ADAPT | criacao-de-squad | Suporte a follow-up (re-exec parcial + keywords de retomada) — squads hoje não tratam re-invocação. |
| G32 | ADAPT | dedalo | Padrões de boundary-mismatch são conhecimento de QA de software de agentes — domínio do dedalo/Prometeu. |
| G33 | ADAPT | dedalo | Verificação de coerência de integração (comparação cruzada) reforça o qa-loop do Prometeu. |
| G34 | ADAPT | dedalo | "Ler os dois lados" + QA incremental — princípio de revisão adotável pelo dedalo. |
| G35 | ADAPT | dedalo | Template de agente QA (general-purpose, prioridade integração) vira especialista reutilizável. |
| G36 | ADAPT | criacao-de-skill | Teste With-skill vs Baseline (A/B) eleva a suíte `evals/` de medição de valor da skill. |
| G37 | ADAPT | criacao-de-skill | Assertion + descarte de non-discriminating assertion endurece o scoring de eval. |
| G38 | ADAPT | criacao-de-skill | Papéis Grader/Comparator/Analyzer como especialistas de avaliação de skill. |
| G39 | ADAPT | criacao-de-skill | Trigger eval should/should-NOT (near-miss) — método de validação de description ausente. |
| G40 | CREATE | caos-fabrica | Auto-otimização de description via train/test + `claude -p` — técnica nova (usar com cautela de custo). |
| G41 | ADAPT | criacao-de-skill | Loop de iteração + estrutura de workspace de avaliação preservada por iteração. |
| G42 | ADAPT | caos-fabrica | Evolução de harness (feedback + histórico + gatilhos de regressão) — governança viva do time criado. |
| G43 | ADAPT | caos-fabrica | Workflow de operação/manutenção (auditar→mudar→sync→verificar) para times já entregues. |
| G44 | CREATE | referencias | 5 exemplos completos de time → material inerte de benchmarking em `referencias/` (score ≥8). |

**Resumo:** 4 REUSE · 33 ADAPT · 7 CREATE — decisão dominante **MISTA (ADAPT)**. Alvo primário
**caos-fabrica** (topologias de time, runtime vivo, evolução/manutenção) e **criacao-de-skill**
(teste A/B + trigger eval + schema de eval); alvo secundário **dedalo** (QA de coerência de
integração) e **criacao-de-subagent** (protocolo de comunicação de time). Nada vira squad novo: o
harness é absorvido como **upgrade do próprio Caos** + reforço de skills existentes. Ressalva: a
absorção do runtime de "time vivo" (G4/G23/G25) depende de o ambiente expor as ferramentas
TeamCreate/SendMessage/TaskCreate — mapear viabilidade antes de prometer a capacidade.
