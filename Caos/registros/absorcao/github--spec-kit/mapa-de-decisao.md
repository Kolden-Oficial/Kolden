---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/github--spec-kit/inventario-de-capacidades|inventario-de-capacidades]]"
  - "[[Caos/registros/absorcao/github--spec-kit/seguranca|seguranca]]"
---

# F4 — Mapa de decisão — github--spec-kit

- **slug:** github--spec-kit · **sha:** b7e67f55 · **rota:** A
- **Alvo natural:** **prometeu** (squad de engenharia spec-driven / framework AIOX). Já possui um pipeline equivalente: `gather → assess-complexity → research → write-spec → critique → plan` (`spec-pipeline.yaml`), constituição formal (Art. I-VI), IDS REUSE>ADAPT>CREATE, story-lifecycle, qa-loop, brownfield-discovery e a skill `checklist-runner`.
- **Por isso quase nada é CREATE-squad e quase nada é REUSE-limpo:** o domínio já existe no Prometeu, mas item-a-item as **técnicas do spec-kit são mais granulares/agnósticas** (comandos-slash desacoplados de persona). Conforme o viés da missão (REUSE sem prova = perda silenciosa), classifico como **ADAPT no Prometeu** o que enriquece o pipeline existente, e mando para **vendor/referencias** o que é camada-instalador inerte.

| ID | decisao | squad-alvo | justificativa(1 linha) |
|---|---|---|---|
| G1 | ADAPT | prometeu | `/specify` reforça a disciplina "O QUÊ/PORQUÊ, não o COMO" e a forma de comando-slash agnóstico sobre o `spec-write-spec` do Prometeu (hoje task-acoplada a @pm). |
| G2 | ADAPT | prometeu | `/clarify` (taxonomia de 11 categorias + ≤5 perguntas-alvo codificadas no spec) é técnica ausente — o `gather` tem `elicit:true` mas sem varredura estruturada de ambiguidade. Vira nova skill/task. |
| G3 | ADAPT | prometeu | `/plan` agrega "Constitution Check" como gate + artefatos de design (research/data-model/contracts/quickstart) ao `plan-create-implementation`. |
| G4 | ADAPT | prometeu | `/tasks` traz "tasks organizadas por user story + marcador `[P]` de paralelismo + MVP=US1" — granularidade que o Prometeu ainda não formaliza na decomposição. |
| G5 | ADAPT | prometeu | `/analyze` (consistência cross-artefato spec×plan×tasks×constitution, com tabela de cobertura requisito→task) é distinto do `spec-critique` (spec×requirements). Alto valor — nova skill de QA de spec. |
| G6 | ADAPT | prometeu | `/implement` (execução fase-a-fase de tasks.md) é majoritariamente coberto por `dev-develop-story`; absorver só a disciplina de fases/ordem topológica e marcadores `[P]`. |
| G7 | ADAPT | prometeu | `/constitution` como comando **gerativo por projeto** + sincronização de templates dependentes; o Prometeu tem constituição fixa de framework, não o ritual de criar/versionar a do projeto. |
| G8 | ADAPT | prometeu | `/checklist` "unit tests for English" (valida QUALIDADE de requisitos) complementa a `checklist-runner` (que só executa checklists), dando a ela um gerador de checklists de requisitos. |
| G9 | ADAPT | prometeu | `/converge` (assessment append-only código↔spec, anexa só o não-construído como tasks) é técnica lean distinta do `brownfield-discovery` de 10 fases; ótima para fechar drift. |
| G10 | ADAPT | prometeu | `/taskstoissues` (tasks → issues GitHub dependency-ordered via github MCP) é ponte ausente; cabe ao eixo @po/@devops do Prometeu. |
| G11 | ADAPT | prometeu | spec-template com **user stories P1/P2/P3 independentemente testáveis = fatias de MVP** enriquece o spec.md do Prometeu (tangencia também aletheia/MVP, mas a casa é o spec). |
| G12 | ADAPT | prometeu | plan-template: marcadores `NEEDS CLARIFICATION` + "Constitution Check" gate como disciplina de planejamento. |
| G13 | ADAPT | prometeu | tasks-template: formato de task em checklist `[ ] [TaskID] [P?] [Story?]` + fases Setup/Foundational/US/Polish. |
| G14 | ADAPT | prometeu | constitution-template (princípios versionados `Version/Ratified/Last Amended`) — modelo para o `/constitution`; também serve de referência ao `constituicao.md` do Caos. |
| G15 | ADAPT | prometeu | checklist-template (`CHK###` por categoria) — par natural do G8 e da `checklist-runner`. |
| G16 | ADAPT | prometeu | sistema de extension-hooks (`before_/after_<comando>`, opcional/mandatório) é um contrato de plugabilidade que o Prometeu não tem nos seus reflexos; absorver como padrão de extensão do pipeline. |
| G17 | CREATE | vendor | presets (lean/scaffold/self-test) — empacotamento do CLI; não vira capacidade de agente, preservar como vendor inerte/referência de design. |
| G18 | CREATE | vendor | workflows CI (GitHub Actions) — automação de pipeline do produto spec-kit; inerte para nós. |
| G19 | CREATE | vendor | Specify CLI (`src/specify_cli`, bundler, instalador air-gapped) — ferramenta-vendor; não absorvível como agente. |
| G20 | CREATE | vendor | adaptadores de integração multi-agente (~40) — camada de instalação por agente; inerte (curiosidade: já existe um adapter `hermes`). |
| G21 | CREATE | referencias | manifesto SDD (`spec-driven.md`/`AGENTS.md`) — doutrina "spec como fonte da verdade"; o Prometeu já a encarna, guardar como referência conceitual, não duplicar. |

**Decisão dominante:** **ADAPT → prometeu** (16 de 21 capacidades enriquecem o pipeline spec-driven existente). 5 itens são vendor/referência inerte (G17-G21). **Zero CREATE-squad** (o domínio já tem dono) e **zero REUSE-limpo** (toda equivalência é conceitual, não item-a-item — registrar como ADAPT evita perda silenciosa).
