---
name: selecao-de-metodologia
description: >
  Use para ESCOLHER e configurar a metodologia de gestão do projeto — ágil (Scrum/Kanban),
  waterfall (fases) ou híbrido — a partir das características do projeto (incerteza, regulação,
  cadência de entrega, dependências). Gatilhos: "qual metodologia usar", "ágil ou waterfall",
  "scrum ou kanban", "como organizar o projeto", "rito de gestão". Dono: gerente-de-projeto
  (com product-manager quando é produto).
tipo: skill
area: Cairos
up: "[[Cairos/_MOC-cairos]]"
---

# Seleção de Metodologia

Não existe metodologia universalmente certa — existe a que se encaixa na **incerteza** e na **cadência**
do projeto. Escolher errado custa caro: ágil sobre algo rígido e regulado vira caos; waterfall sobre algo
incerto vira plano que nasce morto.

## 1. Diagnóstico antes da escolha
Pontue o projeto em 4 eixos:
- **Incerteza de requisitos:** estáveis e conhecidos ↔ voláteis e emergentes.
- **Regulação/formalidade:** baixa ↔ alta (auditoria, contrato, conformidade exigem rastro formal).
- **Cadência de entrega:** big-bang (entrega única) ↔ incremental (valor a cada iteração).
- **Dependências/sequência:** paralelizável ↔ rigidamente sequencial.

## 2. As três famílias

### Ágil (Scrum / Kanban)
- **Quando:** requisitos voláteis, valor incremental, time dedicado, feedback rápido.
- **Scrum:** sprints de duração fixa, papéis (PO/SM/time), ritos (planning, daily, review, retro). Bom
  para escopo que se descobre iterando.
- **Kanban:** fluxo contínuo, limite de WIP, sem sprint fixa. Bom para fluxo de demanda variável
  (suporte, operação, conteúdo).

### Waterfall (fases)
- **Quando:** requisitos estáveis, regulação alta, sequência rígida, entrega única.
- Fases com marcos formais (requisito → desenho → execução → validação → encerramento) e gate de
  aprovação entre fases. Baseline forte, mudança via solicitação formal.

### Híbrido
- **Quando:** o caso mais comum em projeto de negócio — governança formal por cima (marcos, gates,
  relatório ao patrocinador) com execução iterativa por baixo (sprints/kanban dentro de cada fase).
- Ex.: lançamento com marcos contratuais fixos, mas o time de conteúdo/produto opera em sprints.

## 3. Configuração mínima
Escolhida a família, defina: a **cadência** (duração de sprint ou gates de fase), os **ritos** (quais
reuniões, com quem, com qual saída), os **artefatos** (backlog/WBS, registro de riscos, status report) e a
**definição de pronto**. Menos é mais — só o rito que produz decisão.

## Saída
Recomendação de metodologia (família + justificativa pelos 4 eixos) · cadência · ritos · artefatos ·
definição de pronto. Sempre com o **porquê** ancorado no diagnóstico — nunca "use ágil porque é moderno".

## Fronteira
- Se o projeto é build de software, a metodologia de **engenharia** é do **Prometeu** (spec-driven do
  AIOX); esta skill cobre a gestão do projeto de **negócio** em volta.

---
*Procedência (semente 2026-06-26): adaptado de `alirezarezvani/claude-skills@4a3c05b` (MIT, cluster PMO —
scrum-master/senior-pm/agile-product-owner). Princípios reescritos, sem cópia literal. Refino pelo Ritual
do Caos pendente.*
