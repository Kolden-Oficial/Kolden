---
name: comunicacao-com-stakeholders
description: >
  Use para mapear stakeholders e desenhar a comunicação do projeto: matriz poder × interesse,
  plano de comunicação (quem recebe o quê, quando, por qual canal), status reporting por audiência
  e caminho de escalonamento. Gatilhos: "quem precisa saber", "plano de comunicação", "matriz de
  stakeholders", "status report", "reunião de status", "gerir o patrocinador", "como comunico isso".
  Dono: gestor-de-stakeholders.
tipo: skill
area: Cairos
up: "[[Cairos/_MOC-cairos]]"
---

# Comunicação com Stakeholders

A maioria dos projetos não falha por execução técnica — falha por **desalinhamento de expectativa**.
Comunicar é gerir percepção e decisão na cadência certa, adaptada a cada audiência.

## 1. Mapa de stakeholders — poder × interesse
Classifique cada stakeholder em dois eixos (**poder** de afetar o projeto × **interesse** no resultado):

| | Interesse baixo | Interesse alto |
|---|---|---|
| **Poder alto** | Manter satisfeito | Gerir de perto |
| **Poder baixo** | Monitorar (esforço mínimo) | Manter informado |

A estratégia de comunicação muda por quadrante: "gerir de perto" (patrocinador) recebe envolvimento
ativo; "monitorar" recebe o mínimo. Use **RACI** (Responsável/Aprovador/Consultado/Informado) quando
o projeto tem muitos papéis sobrepostos.

## 2. Plano de comunicação
Para cada grupo, defina: **mensagem** (o que importa para ele) · **canal** (e-mail, reunião, dashboard,
Slack) · **frequência** · **formato** · **dono** da comunicação. Princípio: a mesma verdade, embalada
para a audiência — o executivo recebe o titular e a decisão; o time recebe o detalhe e a tarefa.

## 3. Status reporting
- **Sinal claro primeiro:** verde / amarelo / vermelho — antes de qualquer parágrafo.
- **Estrutura:** estado · destaques · bloqueios · **decisões necessárias** · próximos passos.
- **Peça a decisão explicitamente** quando há bloqueio — status report sem pedido de ação vira ruído.
- Mantenha **uma versão executiva** (5 linhas) e **uma operacional** (detalhada) do mesmo status.

## 4. Expectativa e escalonamento
- Alinhe expectativa **cedo e por escrito** (escopo, prazo, premissas) — divergência tardia é cara.
- Defina o **caminho de escalonamento**: qual decisão sobe para quem, e o gatilho que dispara a subida.
- Gestão de patrocinador: mantenha o sponsor informado o suficiente para defender o projeto sem
  microgerenciar.

## Saída
- Matriz de stakeholders: stakeholder · poder · interesse · quadrante · estratégia · dono da relação.
- Plano de comunicação (tabela): audiência · mensagem · canal · frequência · formato · responsável.
- Status update: versão executiva + versão operacional, com sinal verde/amarelo/vermelho e decisões pedidas.

## Fronteira
- O conteúdo do status (progresso, riscos) vem de `gestao-de-cronograma-e-escopo` e
  `gestao-de-riscos-de-projeto`. Esta skill **embala e direciona**, não gera o dado de progresso.
- Decisão executiva pedida no escalonamento → **Olimpo**.

---
*Procedência (semente 2026-06-26): adaptado de `alirezarezvani/claude-skills@4a3c05b` (MIT, cluster PMO —
team-communications/meeting-analyzer) e `anthropics/knowledge-work-plugins@78d74d5` (Apache-2.0,
product-management: stakeholder-update + operations: status-report). Sem cópia literal. Refino pelo
Ritual do Caos pendente.*
