---
name: desenho-de-processos-sop
description: >
  Use para MAPEAR o fluxo real de um processo e transformá-lo em SOP (procedimento operacional
  padrão) e runbook utilizáveis por terceiros. Cobre o levantamento do fluxo como ele É (atores,
  gatilhos, sistemas, decisões, exceções, gargalos), a estrutura do SOP (objetivo, escopo, RACI,
  pré-condições, passos numerados com ação+sistema+resultado, critério de pronto) e do runbook
  (operação + modos de falha + ação corretiva + escalonamento). Habilidade-âncora do squad Ananke,
  dona: arquiteto-de-processos. Gatilhos: "documentar processo", "escreve o SOP", "monta o runbook",
  "padronizar", "como a gente faz isso", "mapear o fluxo". Sem a fonte do fluxo real, é rascunho
  rotulado — nunca SOP do ideal imaginado. Candidatos a automação → handoff ao analista-de-automacao.
---

# Desenho de Processos — SOP e Runbook

Transformar trabalho tácito ("a gente meio que faz assim") em processo explícito, documentado e
executável por qualquer pessoa. A regra inegociável: **documentar o fluxo REAL, não o ideal**. Sem a
fonte (quem executa hoje, em qual sistema, onde trava), o que se escreve é rascunho a validar, não SOP.

## 1. Mapear o fluxo real (antes de escrever qualquer coisa)

Levante, com a fonte (entrevista com quem executa + observação do sistema):

- **Atores / RACI:** quem é Responsável, quem Aprova, quem é Consultado, quem é Informado.
- **Gatilho de início:** o que dispara o processo (evento, pedido, data, status).
- **Passos em sequência:** cada ação, em qual sistema/ferramenta, com que entrada e que saída.
- **Decisões e ramificações:** os "se isso, então aquilo".
- **Exceções e contornos:** os casos fora do padrão — é onde o processo real vive e onde a automação depois quebra.
- **Saída / critério de conclusão:** como se sabe que terminou.
- **Gargalos e retrabalho:** onde espera, onde refaz, onde acumula.

Saída desta etapa: um **mapa do fluxo** (atores × passos × sistemas) com gargalos e exceções sinalizados.

## 2. Escrever o SOP (procedimento operacional padrão)

Estrutura mínima de um SOP utilizável:

```
SOP-<ÁREA>-<NNN> — <Nome do processo>            versão: x.y | dono: <RACI-R>
Objetivo: o que o processo entrega e por quê.
Escopo: o que cobre e o que NÃO cobre.
Responsável (RACI): R / A / C / I.
Pré-condições: o que precisa existir antes do passo 1.
Passos:
  1. <ação> [sistema] → resultado esperado.
  2. ...
Critério de pronto: como validar que terminou certo.
Exceções: <caso fora do padrão> → <o que fazer>.
```

Princípios: cada passo é **executável por terceiro** (ação + sistema + resultado), numerado, sem ambiguidade.
Documente as exceções — um SOP que só cobre o caminho feliz não sobrevive ao primeiro caso real.

## 3. Escrever o runbook (operação e incidente)

Quando o processo é uma operação contínua ou tem incidentes, o runbook complementa o SOP:

- **Procedimento de execução/operação** (o caminho feliz, passo a passo).
- **Modos de falha conhecidos** → sintoma → causa provável → **ação corretiva**.
- **Escalonamento:** quando e para quem escalar; o que registrar.

## 4. Versionar e comunicar

SOP/runbook são documentos vivos: versão, data, dono. Mudanças passam pela habilidade
`gestao-de-mudanca-e-risco-operacional` (change request + risco + rollback + comunicação interna).

## 5. Sinalizar candidatos a automação (sem desenhar o build)

Ao mapear, marque os passos **repetitivos e baseados em gatilho** como candidatos a automação — mas o
desenho técnico do fluxo e o mapeamento n8n são **handoff ao `analista-de-automacao`**, e a construção é
do **Dédalo**. Esta habilidade desenha o processo; não automatiza.

## Limites e handoffs

- **Não** desenha a automação técnica → `analista-de-automacao` (depois Dédalo constrói).
- **Não** define a métrica do processo → `analista-de-eficiencia`.
- **Não** decide a estratégia de operações → Poseidon (COO), via `ananke-chief`.

---
*Procedência (squad-semente, lote 2026-06-26): princípio adaptado de `alirezarezvani/claude-skills@4a3c05b`
(MIT — cluster G20: process-mapper, knowledge-ops) e `anthropics/knowledge-work-plugins@78d74d5` (Apache-2.0 —
operations: process-doc, runbook). Sem cópia literal — reescrito para o padrão Kolden.*
