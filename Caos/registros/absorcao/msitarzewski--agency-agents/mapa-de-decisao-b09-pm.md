# F4 — Mapa de Decisão · Bucket B09 = Cairos (project-management)

> **Repositório upstream:** `msitarzewski--agency-agents@a597cb6`
> **Divisão:** `project-management/` (7 agentes upstream → 21 IDs G1–G21)
> **Squad-alvo principal:** **Cairos** (`C:\Kolden\Cairos\`) — squad-semente do lote 2026-06-26 (5 agentes; refino pelo Ritual pendente).
> **Squads-alvo de dispersão:** **Prometeu** (build de software, AIOX), **Metis** (analytics/estatística), **Olimpo** (portfólio executivo).
> **Regra aplicada:** Artigo VI (REUSE > ADAPT > CREATE) + Artigo VIII (absorção sem perda) + jurisdição declarada no `README.md` do Cairos.

## Estado verificado dos squads-alvo (2026-06-29)

**Cairos** (5 agentes):
- `cairos-chief` (tier 0) — orquestrador com gate de 7 critérios + 6 vetos invioláveis (premissa explícita, risco com dono/gatilho, governança de mudança, handoff de software→Prometeu, portfólio→Olimpo, métricas→Metis).
- `gerente-de-projeto` — escopo/WBS, cronograma/caminho crítico/marcos/baseline, recursos, metodologia (ágil/waterfall/híbrido), governança de mudança.
- `gestor-de-riscos` — registro de riscos, P×I, 4 estratégias (mitigar/transferir/aceitar/evitar), dono + gatilho + contingência.
- `gestor-de-stakeholders` — matriz poder×interesse, plano de comunicação, status reporting por audiência, escalonamento.
- `product-manager` — roadmap priorizado (valor×esforço×risco), specs leves, sprint planning, métricas de produto (handoff Metis).

**Fronteiras declaradas pelo Cairos** (do `README.md`):
- Build de software → **Prometeu** (jurisdição AIOX, spec-driven).
- Descoberta/validação → **Aletheia**.
- Portfólio executivo/go-no-go → **Olimpo**.
- Estatística/medição de métrica → **Metis**.

## Mapa G1–G21 → decisão

| ID | Capacidade (resumo) | Tipo | Squad-alvo | Decisão | Destino concreto | Justificativa |
|---|---|---|---|---|---|---|
| **G1** | Design de experimentos científicos (A/B, validação estatística) | base | Metis | **DISPERSAR-CREATE** | `Metis/.claude/skills/desenho-de-experimento-estatistico/` | Não é PMO de negócio — é instrumentação estatística. Cairos só define **o que** medir (gate `quality_review_criteria` linha 116); a medição/análise é do Metis. |
| **G2** | Rastreabilidade Jira-Git (commits estruturados, atomicidade) | base | Prometeu | **DISPERSAR-CREATE** | `Prometeu/.claude/skills/jira-git-traceability/` | Disciplina de software (commits atômicos, branch strategy, audit-ready). Jurisdição declarada do Prometeu (build de software). |
| **G3** | Extrair decisões e action items de transcrições | base | Cairos | **CREATE** | `Cairos/.claude/skills/extracao-de-ata-de-reuniao/` | Insumo direto do `gestor-de-stakeholders` (status reporting) e do `gerente-de-projeto` (governança de mudança). Hoje Cairos não tem skill para destilar reunião. |
| **G4** | Orquestrar projetos cross-funcional com alinhamento de stakeholders | base | Cairos | **ADAPT** | `cairos-chief.md` (Protocolos de Colaboração) + reforço em `gerente-de-projeto` | O chief já orquestra cross-funcional (linha 154 — "Protocolos de Colaboração"). Capacidade já está. ADAPT registra a herança e refina o passo de "alinhamento de stakeholders" como pré-requisito do plano. |
| **G5** | Otimizar eficiência operacional diária (SOPs, processos) | base | Cairos | **CREATE** | `Cairos/.claude/skills/sop-e-processo-operacional/` | Gap real: Cairos cobre **projetos**, não **operação contínua / processo recorrente** (SOP). Skill nova ancorada no `gerente-de-projeto`. Métricas operacionais (G16) cair em Metis. |
| **G6** | Gerir portfolio estratégico (ROI, posicionamento competitivo) | base | Olimpo | **DISPERSAR-ADAPT** | `Olimpo/agents/zeus.md` (CEO) + skill `Olimpo/.claude/skills/portfolio-estrategico/` | Portfólio é veto explícito do Cairos (`veto_rules` linha 124 — "NUNCA decida portfólio/go-no-go executivo — escalone ao Olimpo"). Vai para o Zeus (CEO). |
| **G7** | Converter especificações em tarefas (escopo realista, anti gold-plating) | base | Prometeu | **DISPERSAR-ADAPT** | `Prometeu/.aiox-core/development/agents/` (pm/po/sm AIOX) | Spec-to-tasks é o coração do AIOX (Prometeu). Cairos faz spec **leve de produto**, mas a decomposição rigorosa de spec → tasks executáveis é jurisdição declarada do Prometeu. |
| **G8** | Tamanho de amostra e poder estatístico | tecnica | Metis | **DISPERSAR-CREATE** | Anexa a G1 em `Metis/.claude/skills/desenho-de-experimento-estatistico/` | Cálculo estatístico — Metis. |
| **G9** | Parada precoce e testes sequenciais (Bayesian) | tecnica | Metis | **DISPERSAR-CREATE** | Anexa a G1 em `Metis/.claude/skills/desenho-de-experimento-estatistico/` | Idem G8. |
| **G10** | Padrão Gitmoji + Jira-ID em commits | tecnica | Prometeu | **DISPERSAR-CREATE** | Anexa a G2 em `Prometeu/.claude/skills/jira-git-traceability/` | Convenção de commit — software. |
| **G11** | Gate de Jira-ID bloqueando workflow | tecnica | Prometeu | **DISPERSAR-CREATE** | Anexa a G2 em `Prometeu/.claude/skills/jira-git-traceability/` (reflexo PreToolUse) | Validação pré-execução — software. |
| **G12** | Template 4-seções (Data/Presentes, Decisões, Action Items, Perguntas Abertas) | tecnica | Cairos | **CREATE** | Anexa a G3 em `Cairos/.claude/skills/extracao-de-ata-de-reuniao/` (template canônico) | Estrutura concreta da skill G3. |
| **G13** | Escalar problemas com SOLUÇÕES propostas (não só diagnóstico) | tecnica | Cairos | **ADAPT** | `gestor-de-stakeholders.md` (campo "escalonamento") + `cairos-chief.md` (gate de qualidade) | O chief já tem escalonamento e o stakeholder já tem "caminho e gatilho de escalonamento" (linha 24). ADAPT adiciona a regra "escalação carrega solução proposta, não apenas problema". |
| **G14** | Matriz de controle de mudanças (anti scope creep, 10% creep limit) | tecnica | Cairos | **ADAPT** | `gerente-de-projeto.md` (campo "Governança") + `cairos-chief.md` (`veto_rules`: "mudança nunca silenciosa") | Cairos JÁ tem governança de mudança (veto 3 do chief; campo "Governança" do gerente). ADAPT formaliza a **matriz** (o que muda, impacto em prazo/custo/risco, quem aprova) + o limite operacional (creep ≤10%). |
| **G15** | Template SOP com checkpoints de qualidade | tecnica | Cairos | **CREATE** | Anexa a G5 em `Cairos/.claude/skills/sop-e-processo-operacional/` (template canônico) | Estrutura concreta da skill G5 — SOP versionado com gates passo-a-passo. |
| **G16** | Rastrear métricas operacionais (loops de melhoria contínua) | tecnica | Metis | **DISPERSAR-CREATE** | `Metis/.claude/skills/metricas-operacionais-continuas/` | Métrica/instrumentação — Metis. Cairos define o que medir; Metis mede e analisa. |
| **G17** | Priorização de portfolio com risco e ROI balanceado | tecnica | Olimpo | **DISPERSAR-CREATE** | Anexa a G6 em `Olimpo/.claude/skills/portfolio-estrategico/` (rubrica de priorização) | Portfólio executivo — Olimpo (Zeus/CEO + Plutos/CFO). |
| **G18** | Comunicação executiva calibrada por audiência | tecnica | Cairos + Olimpo | **ADAPT (Cairos) + DISPERSAR-CREATE (Olimpo)** | Cairos: `gestor-de-stakeholders.md` (já tem "status update adaptado à audiência (executivo conciso vs time detalhado)" linha 22). Olimpo: skill `comunicacao-executiva` no zeus. | A capacidade existe em Cairos (audiência operacional) e o Olimpo precisa da versão **board-level** (framing de impacto de negócio para C-level/conselho). Vai para os dois sem duplicar — Cairos lê para baixo; Olimpo lê para cima. |
| **G19** | Critério de aceitação testável e específico | tecnica | Prometeu | **DISPERSAR-ADAPT** | `Prometeu/.aiox-core/development/` (já existe na disciplina spec-driven do AIOX) | Critério de aceite é coração do AIOX. Prometeu já tem; ADAPT registra a herança no schema. |
| **G20** | Granularidade de tarefa 30-60 min (1 mudança clara por task) | tecnica | Prometeu | **DISPERSAR-CREATE** | Anexa a G7 em `Prometeu/.aiox-core/development/` (regra de granularidade) | Ergonomia de developer-first task — Prometeu. |
| **G21** | Citação literal de especificação (anti gold-plating) | tecnica | Prometeu | **DISPERSAR-ADAPT** | `Prometeu/.aiox-core/development/` (princípio "spec fidelity") | Disciplina spec-driven do AIOX. Prometeu já tem o princípio anti gold-plating; ADAPT formaliza "citar literal, nunca inventar". |

## Resumo de decisões

- **REUSE:** 0
- **ADAPT (Cairos):** 3 — G4, G13, G14, G18(parcial)
- **CREATE (Cairos):** 4 skills novas
  1. `extracao-de-ata-de-reuniao` (G3 + G12)
  2. `sop-e-processo-operacional` (G5 + G15)
- **DISPERSAR (fora de Cairos):**
  - Para **Prometeu** (build de software / AIOX): G2, G7, G10, G11, G19, G20, G21 → 1 skill nova `jira-git-traceability` (G2+G10+G11) + reforço/herança em pm/po/sm AIOX (G7+G19+G20+G21).
  - Para **Metis** (analytics/estatística): G1, G8, G9, G16 → 2 skills novas `desenho-de-experimento-estatistico` (G1+G8+G9) e `metricas-operacionais-continuas` (G16).
  - Para **Olimpo** (portfólio executivo): G6, G17, G18(parcial) → 1 skill nova `portfolio-estrategico` (G6+G17) + skill `comunicacao-executiva` para o Zeus (G18 board-level).

## Invariante de absorção sem perda

```
count(ABSORVIDO) + count(DESCARTADO) + count(PERDIDO) == 21
ABSORVIDO  = 21  (3 ADAPT-Cairos + 4 CREATE-skills-Cairos + 7 DISPERSAR-Prometeu + 4 DISPERSAR-Metis + 3 DISPERSAR-Olimpo)
DESCARTADO = 0
PERDIDO    = 0
```

Detalhe: G18 é contado **uma vez** no ABSORVIDO (ele tem dois destinos — ADAPT em Cairos + CREATE em Olimpo — mas é uma única capacidade upstream que é tratada nos dois lados sem duplicação semântica: Cairos cobre o lado operacional, Olimpo cobre o lado board).

## Fronteiras-chave (anti-duplicação)

1. **Cairos × Prometeu:** spec **leve de produto** = Cairos (`product-manager`); spec **rigorosa para build de software** + decomposição em tasks executáveis = Prometeu. O `cairos-chief` já tem o "TESTE DE FRONTEIRA" (linha 50: "O OBJETO do projeto é desenvolvimento de software? → handoff ao Prometeu").
2. **Cairos × Metis:** Cairos define **o que** medir (campo `métricas de produto` do `product-manager`); Metis **mede e analisa**. Experimento estatístico em si é Metis (G1, G8, G9, G16).
3. **Cairos × Olimpo:** Cairos gere **o projeto já priorizado**; Olimpo decide **portfólio** (qual projeto e em que ordem). Veto explícito no `cairos-chief.md` linha 124.
4. **Cairos × Aletheia:** Cairos **recebe** oportunidade validada da Aletheia — não faz discovery (declarado no README linha 56).

## Próximo passo (F5 — entrega)

Ver `decisao-f5-b09-pm.md` (decisão formal por capacidade, com path final de cada skill/ADAPT e ordem de implementação proposta para a fase F6 do pipeline `/absorver`).
