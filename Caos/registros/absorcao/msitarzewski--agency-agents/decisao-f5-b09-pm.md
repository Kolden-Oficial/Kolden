# F5 — Decisão de Absorção · Bucket B09 = Cairos (project-management)

> **Repositório upstream:** `msitarzewski--agency-agents@a597cb6`
> **Divisão:** `project-management/` (7 agentes upstream → 21 IDs G1–G21)
> **Squad-alvo principal:** **Cairos** (semente-do-lote-2026-06-26)
> **Squads-alvo de dispersão:** **Prometeu**, **Metis**, **Olimpo**
> **Status:** F5 fechada; **F6 = pendente** (aplicação requer aprovação humana — Artigo III).
> **Data:** 2026-06-29.

## Veredito-resumo

- **PERDIDO = 0** (todas as 21 capacidades têm destino).
- **ABSORVIDO em Cairos:** 7 capacidades (3 ADAPT + 4 anexadas em 2 CREATE).
- **DISPERSAR para outros squads:** 14 capacidades (Prometeu 7 · Metis 4 · Olimpo 3).
- **Squad-alvo NÃO recebe agente novo** — recebe **2 skills CREATE + 3 pontos ADAPT** + uma fronteira mais nítida com Prometeu, Metis e Olimpo.

## A. Decisões em Cairos (`C:\Kolden\Cairos\`)

### A.1 CREATE — 2 skills novas

#### CREATE-1: `extracao-de-ata-de-reuniao` (absorve G3 + G12)

- **Path:** `C:\Kolden\Cairos\.claude\skills\extracao-de-ata-de-reuniao\SKILL.md`
- **Dono:** `gestor-de-stakeholders` (primário) e `gerente-de-projeto` (secundário, para insumo de governança de mudança).
- **Gatilhos (description):** "extrair ata", "transcrição de reunião", "decisões da reunião", "action items", "perguntas em aberto".
- **Template canônico (4 seções obrigatórias) — G12:**
  1. **Data + Presentes** (cabeçalho factual)
  2. **Decisões tomadas** (lista numerada, com dono se houver)
  3. **Action Items** (tarefa · dono · prazo)
  4. **Perguntas em aberto** (o que ficou sem resposta)
- **Regras de fidelidade — G3:**
  - Sem comentário editorial (a skill destila, não interpreta).
  - Se uma seção não tem dado na transcrição, marcar `[sem registro]` — nunca inventar.
  - Citar fala literal quando a decisão é ambígua.
- **Atribuição upstream:** rodapé referencia `msitarzewski/agency-agents@a597cb6 — project-management-meeting-notes-specialist.md`.

#### CREATE-2: `sop-e-processo-operacional` (absorve G5 + G15)

- **Path:** `C:\Kolden\Cairos\.claude\skills\sop-e-processo-operacional\SKILL.md`
- **Dono:** `gerente-de-projeto` (escopo de processo recorrente / SOP).
- **Gatilhos (description):** "SOP", "padrão operacional", "processo recorrente", "rotina operacional", "checklist de operação", "padronizar processo".
- **Estrutura SOP — G15:**
  - **Objetivo + Escopo** (o que cobre, o que não cobre).
  - **Atores + Responsabilidades** (RACI quando útil).
  - **Pré-requisitos** (insumos, ferramentas, credenciais — credencial sempre via Infisical).
  - **Passos sequenciados** — cada passo com **gate de qualidade** (verificação binária antes de avançar).
  - **Saídas + Critério de feito.**
  - **Versionamento** (versão · data · responsável pela mudança).
- **Fronteira anti-Metis:** SOP define **o passo**; **métrica operacional contínua** (G16) é Metis.
- **Atribuição upstream:** rodapé referencia `msitarzewski/agency-agents@a597cb6 — project-management-studio-operations.md`.

### A.2 ADAPT — 3 pontos em agentes existentes

#### ADAPT-1: `cairos-chief.md` + `gerente-de-projeto.md` — orquestração cross-funcional (absorve G4)

- **Onde:** `cairos-chief.md` seção "Protocolos de Colaboração" (linhas 152-175).
- **O que muda:** o "Protocolo de Colaboração" já cobre a sequência (escopo → cronograma → riscos → comunicação → roadmap). ADAPT adiciona uma **etapa explícita anterior**: "alinhamento de stakeholders ANTES de fixar escopo" — caso clássico onde o cronograma trava por divergência de patrocinador não tratada.
- **Diff conceitual:**
  ```
  [antes] 1. Gerente de Projeto define escopo (WBS) e cronograma.
  [depois] 0. Gestor de Stakeholders identifica patrocinador + interesse divergente.
           1. Gerente de Projeto define escopo (WBS) e cronograma — sob alinhamento.
  ```
- **Atribuição:** comentário/nota referenciando `project-management-project-shepherd.md`.

#### ADAPT-2: `gestor-de-stakeholders.md` + `cairos-chief.md` — escalação com solução proposta (absorve G13)

- **Onde:** `gestor-de-stakeholders.md` campo "Expectativa e escalonamento" (linha 22).
- **O que muda:** Hoje a escalação está descrita como "alinhamento de expectativa, gestão de patrocinador, caminho e gatilho de escalonamento". ADAPT adiciona a **regra de saída**: "toda escalação carrega **2-3 soluções propostas**, nunca só o problema".
- **Diff conceitual:**
  ```
  [antes] Caminho e gatilho de escalonamento.
  [depois] Caminho e gatilho de escalonamento, com REGRA: escalação inclui 2-3 soluções propostas
           (não apenas diagnóstico). Diagnóstico-sem-solução é stress, não gestão.
  ```
- **Reforço no chief:** adicionar um critério ao `quality_review_criteria` — "Toda escalação no plano traz alternativas propostas, não só problema?"
- **Atribuição:** referência a `project-management-project-shepherd.md`.

#### ADAPT-3: `gerente-de-projeto.md` + `cairos-chief.md` — matriz de controle de mudanças (absorve G14)

- **Onde:** `gerente-de-projeto.md` campo "Governança" (linha 24) + `cairos-chief.md` veto 3 (linha 122).
- **O que muda:** A solicitação de mudança já é o vetorial (o que muda · impacto em prazo/custo/risco · quem aprova). ADAPT acrescenta:
  - **Matriz formal** (tabela canônica como output): item · justificativa · impacto-prazo · impacto-custo · impacto-risco · impacto-escopo · alternativa-considerada · aprovador · status.
  - **Limite operacional**: scope creep cumulativo monitorado; ao passar de 10% do baseline (em qualquer dimensão), Cairos sinaliza "amarelo" no status report e exige decisão consciente (não silenciosa).
- **Diff conceitual:**
  ```
  [antes] Solicitação de mudança (impacto em prazo/custo/risco/escopo + quem aprova).
  [depois] Matriz de solicitações de mudança versionada; gate de 10% de creep
           cumulativo dispara amarelo + decisão explícita.
  ```
- **Atribuição:** referência a `project-management-project-shepherd.md`.

### A.3 ADAPT parcial — G18 (comunicação executiva calibrada)

- **Onde em Cairos:** `gestor-de-stakeholders.md` já tem "status update adaptado à audiência (executivo conciso vs time detalhado)" (linha 22). ADAPT acrescenta um **template canônico** de status executivo (3 linhas — estado · decisão pedida · próximo marco) e um template operacional (mais longo, com bloqueios e métricas).
- **Onde em Olimpo:** ver C.3.

## B. Decisões em Prometeu (dispersão — build de software / AIOX)

Jurisdição: software (declarada no README do Cairos). Tudo que segue absorve em `Prometeu/`.

### B.1 CREATE — skill `jira-git-traceability` (absorve G2 + G10 + G11)

- **Path:** `C:\Kolden\Prometeu\.claude\skills\jira-git-traceability\SKILL.md`
- **Dono:** pm/po/sm do AIOX (`Prometeu/.aiox-core/development/agents/`).
- **Gatilhos:** "rastreabilidade Jira-Git", "commit atômico", "Gitmoji", "ID de Jira no commit", "branch strategy auditável".
- **Conteúdo:**
  - **Padrão de commit (G10):** `<gitmoji> <JIRA-ID>: descrição em uma linha`. Tipos: feat (✨), fix (🐛), refactor (♻️), test (✅), docs (📝), etc. Referência: gitmoji.dev.
  - **Atomicidade (G2):** 1 commit = 1 mudança lógica. Sem "wip" / "small fixes" / catch-all.
  - **Gate de Jira-ID (G11):** branch sem ID de Jira mapeado **bloqueia** o workflow (reflexo PreToolUse no projeto que adota a skill). Mensagem: "código anônimo não entra — vincule uma task de Jira ou justifique como hotfix com retroativo explícito".
- **Atribuição:** referência a `project-management-jira-workflow-steward.md`.

### B.2 ADAPT/CREATE — disciplina spec-to-tasks AIOX (absorve G7 + G19 + G20 + G21)

- **Onde:** `Prometeu/.aiox-core/development/agents/` (pm/po/sm) + `Prometeu/.aiox-core/development/skills/` (se a estrutura permitir) ou skill nova `spec-to-tasks-aiox`.
- **O que muda:** AIOX já é spec-driven (princípio anti gold-plating é constitucional). ADAPT registra a **herança histórica** desta capacidade upstream e formaliza 4 regras operacionais:
  - **G7 — Spec parsing realista:** quebrar a spec respeitando a ordem real (não otimizar pelo o que é fácil); cada task = unidade que cabe num review.
  - **G20 — Granularidade 30-60 min:** se uma task estimada extrapola 60 min, quebra; se cai abaixo de 30 min, agrupa.
  - **G19 — Critério de aceitação testável:** cada task tem "como verificar pronto" em termo binário (não "ficou bom").
  - **G21 — Citação literal de spec:** ao decompor, citar a frase da spec; nunca inventar requisito de luxo ("seria legal ter X também").
- **Atribuição:** referência a `project-manager-senior.md`.

## C. Decisões em Metis (dispersão — analytics / estatística)

Jurisdição: medição/análise/estatística (declarada no README do Cairos como handoff).

### C.1 CREATE — skill `desenho-de-experimento-estatistico` (absorve G1 + G8 + G9)

- **Path:** `C:\Kolden\Metis\.claude\skills\desenho-de-experimento-estatistico\SKILL.md` (criar pasta `.claude/skills/` se não existir).
- **Dono:** o especialista de estatística do Metis.
- **Gatilhos:** "A/B test", "experimento", "hypothesis test", "tamanho de amostra", "poder estatístico", "parada precoce", "Bayesian test".
- **Conteúdo:**
  - **G1 — Design de experimento:** hipótese nula vs. alternativa; intervalo de confiança (95% padrão); registro de variável tratamento × controle.
  - **G8 — Tamanho de amostra:** cálculo de n por **poder estatístico** (80% padrão) e tamanho de efeito mínimo detectável; pré-lançamento obrigatório.
  - **G9 — Parada precoce:** regras de teste sequencial (alpha-spending), análise Bayesian opcional, definição de critério antes de iniciar (proteger contra peek-and-stop).
- **Atribuição:** referência a `project-management-experiment-tracker.md`.

### C.2 CREATE — skill `metricas-operacionais-continuas` (absorve G16)

- **Path:** `C:\Kolden\Metis\.claude\skills\metricas-operacionais-continuas\SKILL.md`
- **Gatilhos:** "métrica operacional", "loop de melhoria contínua", "trend de eficiência", "process analysis".
- **Conteúdo:** instrumentação de métricas de processo, baseline, alerta de variação, ciclo de revisão.
- **Fronteira anti-Cairos:** Cairos (skill SOP) define **o passo**; Metis define **a métrica do passo** e a analisa.
- **Atribuição:** referência a `project-management-studio-operations.md` (métricas).

## D. Decisões em Olimpo (dispersão — portfólio executivo)

Jurisdição: portfólio + decisão C-level (declarada em `cairos-chief.md` veto `linha 124`).

### D.1 CREATE — skill `portfolio-estrategico` (absorve G6 + G17)

- **Path:** `C:\Kolden\Olimpo\.claude\skills\portfolio-estrategico\SKILL.md`
- **Dono:** Zeus (CEO) — primário; Plutos (CFO) — secundário (ROI/alocação financeira).
- **Gatilhos:** "portfólio", "qual projeto priorizar entre vários", "ROI estratégico", "posicionamento competitivo", "decisão go/no-go executiva".
- **Conteúdo:**
  - **G6 — Gestão de portfólio:** visão estratégica + alocação de recursos entre projetos competitivos + posicionamento competitivo (meta 25% ROI mantida como referência tunable).
  - **G17 — Priorização por risco-ROI:** rubrica de portfólio (valor estratégico × ROI × risco × dependência); cada item carregando o critério explícito de inclusão/exclusão.
- **Atribuição:** referência a `project-management-studio-producer.md`.

### D.2 CREATE — skill `comunicacao-executiva` para o Zeus (absorve G18 — board-level)

- **Path:** `C:\Kolden\Olimpo\.claude\skills\comunicacao-executiva\SKILL.md` (ou anexa em `portfolio-estrategico`).
- **Dono:** Zeus (board readiness).
- **Conteúdo:** segmentação de audiência (conselho · investidor · time de liderança · operacional), framing por impacto de negócio (não por feature), formato 1-página-executiva, regra "decisão pedida em destaque".
- **Fronteira anti-Cairos:** Cairos (`gestor-de-stakeholders`) cobre comunicação **para o time / patrocinador**; Olimpo (Zeus) cobre **board / investidor / liderança**.
- **Atribuição:** referência a `project-management-studio-producer.md`.

## E. Plano de aplicação (F6 — pendente de aprovação humana, Art. III)

Ordem proposta (do mais barato e contido para o mais amplo):

1. **Cairos · ADAPT-2** (escalação com solução, G13) — diff curto em `gestor-de-stakeholders.md` + 1 critério novo no `quality_review_criteria` do chief.
2. **Cairos · ADAPT-3** (matriz de mudança + 10% creep, G14) — diff em `gerente-de-projeto.md` + reforço no veto 3 do chief.
3. **Cairos · ADAPT-1** (orquestração cross-funcional com alinhamento de stakeholders antes, G4) — diff em "Protocolos de Colaboração" do chief.
4. **Cairos · CREATE-1** (`extracao-de-ata-de-reuniao`, G3+G12).
5. **Cairos · CREATE-2** (`sop-e-processo-operacional`, G5+G15).
6. **Cairos · ADAPT G18 (parcial)** — template canônico de status no `gestor-de-stakeholders`.
7. **Prometeu · CREATE skill `jira-git-traceability`** (G2+G10+G11).
8. **Prometeu · ADAPT/CREATE disciplina spec-to-tasks** (G7+G19+G20+G21).
9. **Metis · CREATE skill `desenho-de-experimento-estatistico`** (G1+G8+G9).
10. **Metis · CREATE skill `metricas-operacionais-continuas`** (G16).
11. **Olimpo · CREATE skill `portfolio-estrategico`** (G6+G17).
12. **Olimpo · CREATE skill `comunicacao-executiva`** (G18 board-level).

Cada passo, ao ser aplicado em F6, atualiza:
- O catálogo da skill no squad-alvo (`.claude/skills/catalogo.md`).
- O `MEMORY.md` do squad-alvo (entrada nova em Padrões Ativos).
- O ledger `Caos/dados/repositorios-absorvidos.yaml` (linha por capacidade absorvida com `origem: msitarzewski/agency-agents@a597cb6`).

## F. Invariante validada

```
inventario(F3)  = 21
ABSORVIDO       = 21
  ├─ Cairos     :  7  (3 ADAPT + 4 anexadas em 2 CREATE — G3,G4,G5,G12,G13,G14,G15 + parte de G18)
  ├─ Prometeu   :  7  (G2,G7,G10,G11,G19,G20,G21)
  ├─ Metis      :  4  (G1,G8,G9,G16)
  └─ Olimpo     :  3  (G6,G17,G18 board-level)
DESCARTADO      = 0
PERDIDO         = 0
```

> Nota sobre G18: capacidade-única tratada em dois lugares **sem duplicação semântica** — Cairos cobre o lado operacional (time/patrocinador), Olimpo cobre o lado board. Conta uma vez no ABSORVIDO; é absorvida nos dois squads-alvo conforme a audiência.

## G. Riscos identificados (pré-morte de F6)

1. **Cairos vira lixão de "tudo que é gestão"** — risco mitigado pela dispersão agressiva (14 de 21 capacidades vão para outros squads).
2. **Metis ainda não tem estrutura `.claude/skills/`** — verificar antes de F6; se não tiver, criar a pasta no mesmo passo. Se Metis ainda não foi criado como squad pleno, a F6 destas capacidades fica **bloqueada** até o squad existir (gate de pré-requisito).
3. **Olimpo deve receber skills em `.claude/skills/` do squad** — o Zeus é o dono primário, mas a skill é do squad (todos os deuses podem acionar quando o tema for portfólio/comunicação executiva).
4. **Duplicação com `criacao-de-mcp` / `criacao-de-skill` de Prometeu** — verificar se a disciplina spec-to-tasks já está formalizada no AIOX antes de criar; se já existir, vira ADAPT puro (registrar herança), não CREATE.

## H. Próximo passo

Apresentar este F5 ao Ronan e aguardar aprovação para F6 (Artigo III — nada é escrito no squad-alvo antes do veredito).
