---
name: metricas-e-eficiencia-operacional
description: >
  Use para DEFINIR KPIs operacionais que mudam uma decisão, PLANEJAR capacidade (demanda × gargalo),
  montar RELATÓRIO DE STATUS honesto e conduzir MELHORIA CONTÍNUA (PDCA/kaizen/lean) por hipótese de
  ganho mensurável. Cobre a seleção de KPI ligada a decisão (corta métrica de vaidade), a análise de
  capacidade pelo gargalo real, o status verde/amarelo/vermelho com causa+ação+dono e o ciclo de melhoria
  (hipótese → piloto → medição → padronizar/descartar). Habilidade-âncora do squad Ananke, dona:
  analista-de-eficiencia. Gatilhos: "qual KPI acompanhar", "esse processo está eficiente?", "temos
  capacidade para X?", "relatório de status", "onde está o desperdício", "como melhorar isso". REGRA DURA:
  melhoria sem métrica de ganho é opinião. Instrumentação/estatística profunda → handoff ao Metis.
tipo: skill
area: Ananke
up: "[[Ananke/_MOC-ananke]]"
---

# Métricas e Eficiência Operacional

Medir a operação **para decidir**, não para enfeitar relatório. Esta habilidade liga número a decisão,
acha o gargalo, comunica o estado com honestidade e fecha o ciclo de melhoria por ganho comprovado.

## 1. KPIs operacionais (ligados a decisão)

Teste de cada candidato a KPI: **se nenhuma decisão muda com esse número, é métrica de vaidade — corte.**

Para cada processo: `KPI → decisão que ele informa → fonte do dado → meta/limiar`. KPIs operacionais comuns:

- **Lead time** (tempo do gatilho à conclusão)
- **Throughput** (vazão: unidades por período)
- **Taxa de retrabalho** (% que volta para refazer)
- **Custo por unidade** (eficiência econômica)
- **Aderência ao SLA** (% dentro do prometido)

Mantenha o conjunto **enxuto** — poucos KPIs que decidem, não um painel de vaidade.

## 2. Planejamento de capacidade (pelo gargalo)

**Capacidade ≠ soma das tarefas.** A vazão é limitada pelo **gargalo** (o recurso de menor capacidade):

1. Mapear a **demanda** (volume esperado).
2. Medir a **vazão por recurso**.
3. Identificar o **gargalo** (menor vazão = teto do sistema).
4. Calcular folga/sobrecarga e projetar **cenários** (demanda × capacidade).
5. Recomendar: adicionar capacidade no gargalo, ou aliviá-lo com automação (→ handoff `analista-de-automacao`).

Adicionar capacidade fora do gargalo não aumenta a vazão — só custo.

## 3. Melhoria contínua (PDCA / kaizen / lean)

Caçar **desperdício** antes de propor solução. Categorias lean: espera, retrabalho, gargalo, superprodução,
movimento/transporte, estoque, defeito. Para cada melhoria de impacto, monte o **cartão de hipótese**:

```
HIPÓTESE: Se [mudança], então [ganho esperado na métrica], porque [desperdício que ataca].
  Métrica primária: <KPI>.  Estado atual → esperado: <x → y>.  Piloto: <escopo/prazo>.
PLAN → DO (piloto pequeno) → CHECK (ganho real vs esperado) → ACT (padronizar ou descartar).
```

- **Padronizar** o que funcionou → handoff ao `arquiteto-de-processos` (vira SOP).
- Priorizar por **impacto × esforço**.

## 4. Relatório de status (honesto e acionável)

Por frente: **cor (verde/amarelo/vermelho) + número + causa + ação + dono**. Nunca só a cor; nunca maquiar
amarelo de verde. Destaque bloqueios e decisões pendentes.

```
Frente X: 🔴 lead time 6,2d (meta <3d) — causa: lançamento manual — ação: automatizar (H1) — dono: <nome>
Frente Y: 🟡 retrabalho 18% — causa: cadastro incompleto — ação: validar entrada — dono: <nome>
```

## Limites e handoffs

- **Não** instrumenta nem modela dados em profundidade → **Metis** (analytics).
- **Não** documenta o processo do zero → `arquiteto-de-processos`.
- **Não** constrói a automação que alivia o gargalo → desenho com `analista-de-automacao`, build com Dédalo.

---
*Procedência (squad-semente, lote 2026-06-26): princípio adaptado de `alirezarezvani/claude-skills@4a3c05b`
(MIT — cluster G20: capacity-planner) e `anthropics/knowledge-work-plugins@78d74d5` (Apache-2.0 — operations:
capacity-plan, status-report). Disciplina de hipótese mensurável herdada do padrão da casa. Sem cópia literal —
reescrito para o padrão Kolden.*
