---
name: gestao-de-cronograma-e-escopo
description: >
  Use para PLANEJAR escopo e cronograma de um projeto de negócio: declaração de escopo + WBS
  (estrutura analítica), sequenciamento por dependência, estimativa com premissas, caminho
  crítico, marcos e baseline. Cobre a escolha de método de estimativa e a governança de
  mudança de escopo. Gatilhos: "montar cronograma", "definir escopo", "WBS", "caminho crítico",
  "marcos do projeto", "baseline", "vai atrasar?", "quanto tempo leva". Dono: gerente-de-projeto.
  Se o objeto do projeto for build de software, faça handoff ao Prometeu.
tipo: skill
area: Cairos
up: "[[Cairos/_MOC-cairos]]"
---

# Gestão de Cronograma & Escopo

Planejar é tornar explícito o que será feito (escopo), em que ordem (dependência) e quando (cronograma)
— sempre com as **premissas** que sustentam cada data. Cronograma sem premissa é chute; aqui ele é plano.

## 1. Escopo antes de data
- **Declaração de escopo:** objetivo, entregáveis, o que está **dentro** e o que está **fora** (a fronteira
  anti escopo-crescente é o item mais importante).
- **WBS (estrutura analítica de projeto):** decompõe o entregável em pacotes de trabalho gerenciáveis até
  o nível em que se consegue estimar e atribuir dono. Regra: cada pacote tem um único responsável e um
  critério de "pronto".
- **Critérios de aceite:** como se sabe que o entregável está concluído (evita retrabalho silencioso).

## 2. Sequenciamento e caminho crítico
- Mapeie **dependências** entre pacotes (o que precede o quê: fim-início, início-início...).
- O **caminho crítico** é a sequência mais longa de tarefas dependentes — define a menor duração possível
  do projeto. Atraso em tarefa do caminho crítico atrasa o projeto inteiro; em tarefa com folga, não.
- **Marcos (milestones):** pontos de verificação sem duração (decisão, aprovação, entrega) que ancoram a
  comunicação com stakeholders.

## 3. Estimativa com premissa (inegociável)
- Toda estimativa carrega: a **premissa** (ex.: "assume 2 pessoas dedicadas, sem feriado no período"), o
  **nível de confiança** (alto/médio/baixo) e a **faixa** quando a incerteza é alta (otimista/provável/pessimista).
- Distinga **estimativa** (o que o trabalho provavelmente leva) de **compromisso** (a data que se promete,
  já com folga e contingência). Nunca os confunda na comunicação.

## 4. Baseline e governança de mudança
- A **baseline** é a foto aprovada de escopo/cronograma contra a qual se mede o progresso.
- Todo desvio vira **solicitação de mudança**: o que muda · impacto em prazo/custo/risco/escopo ·
  alternativas · quem aprova. Mudança silenciosa de escopo é veto do squad.

## 5. Escolha de metodologia (ponte com a skill `selecao-de-metodologia`)
- Incerteza alta / requisitos voláteis → cadência ágil (Scrum/Kanban) com escopo por iteração.
- Requisitos estáveis / regulação / sequência rígida → fases (waterfall) com marcos formais.
- Mistura comum → híbrido (marcos de governança por cima de execução iterativa).

## Saída
Escopo (in/out) · WBS · cronograma (marcos + caminho crítico) · premissas + confiança · recursos ·
baseline. Status report quando em execução: verde/amarelo/vermelho vs baseline + desvio + ação.

## Fronteira
- Riscos sobre este cronograma → skill `gestao-de-riscos-de-projeto` (gestor-de-riscos).
- Build de software como objeto do projeto → **handoff ao Prometeu**.

---
*Procedência (semente 2026-06-26): adaptado de `alirezarezvani/claude-skills@4a3c05b` (MIT, cluster PMO —
senior-pm/scrum-master) e `anthropics/knowledge-work-plugins@78d74d5` (Apache-2.0, product-management:
sprint-planning). Princípios reescritos, sem cópia literal. Refino pelo Ritual do Caos pendente.*
