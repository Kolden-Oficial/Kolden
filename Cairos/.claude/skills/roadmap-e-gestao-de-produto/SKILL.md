---
name: roadmap-e-gestao-de-produto
description: >
  Use para gerir produto e roadmap dentro de um projeto: priorizar roadmap (valor × esforço × risco),
  escrever spec/PRD leve, planejar sprint/release, definir métricas de produto e sintetizar discovery
  em decisão. Gatilhos: "roadmap", "o que entra no próximo release", "priorização", "backlog",
  "sprint planning", "spec de feature", "métrica de produto". Dono: product-manager. Métrica → handoff
  ao Metis; build de software → handoff ao Prometeu; discovery → entrada da Aletheia.
---

# Roadmap & Gestão de Produto

Gestão de produto dentro do projeto é decidir **o que vale a pena fazer e em que ordem** — com critério
explícito, não preferência. O roadmap é a comunicação dessa decisão ao longo do tempo.

## 1. Priorização com critério explícito
Nunca priorize por "achei mais importante". Use um critério nomeado:
- **RICE:** Reach × Impact × Confidence ÷ Effort.
- **ICE:** Impact × Confidence × Ease (mais rápido, menos rigoroso).
- **Valor × Esforço × Risco:** matriz simples quando faltam dados para RICE.
Sempre registre o critério usado e os números — a priorização precisa ser reproduzível e defensável.

## 2. Roadmap por horizonte
Comunique o roadmap em horizontes, não em datas falsas de precisão:
- **Agora** (em execução, comprometido) · **Próximo** (planejado, provável) · **Depois** (explorando).
- Quanto mais distante o horizonte, menos preciso — explicite isso para o stakeholder (ponte com
  `comunicacao-com-stakeholders`).

## 3. Spec / PRD leve
Para o item que entra em execução, escreva o mínimo que evita retrabalho:
problema · usuário · solução proposta · escopo (in/out) · critério de aceite · métrica de sucesso.
Se o item é **software**, esse spec é o insumo do **handoff ao Prometeu** (que assume o ciclo de dev).

## 4. Sprint & release
- **Sprint planning:** objetivo da sprint · itens selecionados · capacidade do time · definição de pronto.
- **Release:** objetivo do release, escopo congelado, cadência. Marcos de release ancoram o cronograma
  do `gerente-de-projeto`.

## 5. Métricas de produto (define o quê; o Metis mede)
- Defina as métricas que dizem se o produto está funcionando: ativação, adoção, retenção, NPS, etc.
- A **instrumentação e a leitura estatística são handoff ao Metis** — esta skill define O QUE medir e o
  alvo, não roda a análise.

## 6. Discovery → decisão
- Achados de discovery/validação vêm da **Aletheia** (handoff de entrada). Esta skill os **sintetiza em
  decisão de roadmap** (o que construir, o que matar, o que adiar) — não refaz a pesquisa do zero.

## Saída
- Roadmap: item · valor · esforço · risco · score · horizonte (agora/próximo/depois) + critério usado.
- Spec leve: problema · usuário · solução · escopo · critério de aceite · métrica de sucesso.
- Plano de sprint: objetivo · itens · capacidade · definição de pronto.

## Fronteira
- Build de software → **Prometeu**. Discovery → **Aletheia**. Medição → **Metis**. Cronograma → `gerente-de-projeto`.

---
*Procedência (semente 2026-06-26): adaptado de `anthropics/knowledge-work-plugins@78d74d5` (Apache-2.0,
product-management: roadmap-update/synthesize-research/sprint-planning/metrics-review) e
`alirezarezvani/claude-skills@4a3c05b` (MIT, cluster produto — product-manager-toolkit/agile-product-owner/
roadmap-communicator). Sem cópia literal. Refino pelo Ritual do Caos pendente.*
