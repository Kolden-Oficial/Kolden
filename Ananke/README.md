---
tipo: nota
area: Ananke
up: "[[Ananke/_MOC-ananke]]"
---

# Ananke — Squad de Operações & BizOps

> **status: semente-do-lote-2026-06-26 (refino pelo Ritual do Caos pendente)**

Ananke (Ἀνάγκη, *necessidade/ordem inevitável*) é o squad de **operações e BizOps** da Kolden — a
camada que transforma o trabalho da empresa em **processo desenhado, documentado, medido e melhorado**.
Onde o **Poseidon** (Olimpo/COO) decide a **estratégia** de operações, a Ananke **executa o BizOps**:
mapeia processos em SOPs, identifica e desenha automações, governa fornecedores e mede a eficiência
operacional. É a ordem necessária que faz a operação rodar previsível.

## O que a Ananke faz

- **Desenho e documentação de processos (SOPs):** mapeia o fluxo real, escreve o procedimento operacional
  padrão, gera runbooks e cartilhas de mudança.
- **Automação de fluxos de trabalho:** identifica gargalos repetitivos, desenha a automação e **mapeia para
  o n8n-MCP** — fazendo **handoff ao Dédalo** para a construção técnica.
- **Gestão de fornecedores/vendors:** avaliação, due diligence operacional, comparação, ciclo de revisão e
  otimização de procurement.
- **Métricas operacionais & melhoria contínua:** KPIs de operação, planejamento de capacidade, relatórios de
  status e ciclos de melhoria (PDCA/kaizen) por hipótese de ganho mensurável.

## Agentes

| Agente | Tier | Especialidade |
|--------|------|---------------|
| `ananke-chief` | 0 | Orquestradora — tria (processo / automação / fornecedor / eficiência), roteia, QA e handoffs |
| `arquiteto-de-processos` | 1 | Desenho e documentação de processos: mapeamento, SOP, runbook, gestão de mudança e risco operacional |
| `analista-de-automacao` | 1 | Identifica e desenha automações de fluxo; mapeia para n8n-MCP → handoff ao Dédalo para construir |
| `gestor-de-fornecedores` | 1 | Gestão de fornecedores/vendors: avaliação, due diligence, procurement, ciclo de revisão |
| `analista-de-eficiencia` | 1 | Métricas operacionais, capacidade, relatórios de status e melhoria contínua por ganho mensurável |

## Como ativar

```
@ananke-chief         # Ativa a orquestradora
*diagnose             # Tria a demanda (processo / automação / fornecedor / eficiência) e roteia
*journey              # Jornada completa de BizOps (mapear → padronizar → automatizar → medir → melhorar)
```

Você também pode ativar um especialista direto: `@ananke:arquiteto-de-processos`. A chief é o ponto de
entrada recomendado.

## Matriz de roteamento (resumo)

| Demanda | Primário | Secundário |
|---|---|---|
| Documentar/padronizar um processo, escrever SOP/runbook | arquiteto-de-processos | analista-de-eficiencia |
| Mudança de processo / risco operacional | arquiteto-de-processos | analista-de-automacao |
| "Isso é repetitivo, dá pra automatizar?" / desenhar fluxo | analista-de-automacao | arquiteto-de-processos |
| Avaliar/comparar/revisar fornecedor, procurement | gestor-de-fornecedores | analista-de-eficiencia |
| KPI de operação, capacidade, relatório de status, melhoria | analista-de-eficiencia | arquiteto-de-processos |

## Fronteiras (o que a Ananke NÃO faz)

- **Não define a estratégia de operações** → isso é a camada do **Poseidon** (Olimpo/COO). A Ananke é
  BizOps de execução: recebe a direção estratégica e a operacionaliza em processo/automação/métrica.
- **Não constrói a automação técnica** (não escreve o workflow n8n, código ou integração) → desenha o
  fluxo e o mapeamento, e faz **handoff ao Dédalo** (engenharia) para a construção.
- **Não instrumenta/lê estatística profunda** de métrica → handoff ao **Metis** (analytics) quando a leitura
  exigir modelagem de dados.
- **Não faz a análise financeira** de contrato/custo de fornecedor → handoff ao **Pluto** (CFO/ofertas).
- **Não trata segurança/compliance técnica** do fornecedor ou do sistema → handoff ao **Egide** (segurança).

## Vetos invioláveis

1. **Sem processo de fachada.** SOP/runbook descreve o fluxo **real e verificado**, não o ideal imaginado —
   sem a fonte (quem executa hoje, qual sistema), é rascunho rotulado, não procedimento.
2. **Toda automação começa como mapa, não como build.** A Ananke desenha o fluxo e o gargalo; a construção
   técnica é handoff ao Dédalo. Nunca prometer "já automatizei".
3. **Toda melhoria de impacto é hipótese mensurável:** o que muda, qual desperdício ataca, e **como medir** o
   ganho. Nada de "vai ficar mais eficiente" sem métrica.
4. **Fornecedor é decisão com evidência:** avaliação com critérios e dado (SLA, custo, risco), nunca preferência.
5. **Sem invenção de capacidade** (Art. IV): só ferramentas de `ferramentas.md`. **Segredos só no Infisical**
   (Art. VII), nunca em texto puro.

## Handoffs

- **Entrada — Poseidon (Olimpo/COO):** direção estratégica de operações → a Ananke operacionaliza em BizOps.
- **Saída — Dédalo (engenharia):** automação desenhada + mapeamento n8n → construção técnica do workflow.
- **Saída — Metis (analytics):** métrica operacional a instrumentar/ler com profundidade estatística.
- **Saída — Pluto (CFO):** análise financeira de custo/contrato de fornecedor.
- **Saída — Egide (segurança):** avaliação de risco de segurança/compliance técnica.

## Componentes (semente)

- **5 agentes** — 1 orquestradora + 4 especialistas
- **5 habilidades-âncora** — desenho-de-processos-sop, gestao-de-mudanca-e-risco-operacional,
  mapeamento-de-automacao, gestao-de-fornecedores, metricas-e-eficiencia-operacional
- **1 catálogo** de habilidades + **1 MEMORY.md**

## Origem

Squad-semente do **lote de absorção 2026-06-26**, a partir do cluster de **operações de negócio**:
`alirezarezvani/claude-skills@4a3c05b` (G20 — BizOps: process-mapper, vendor-management, procurement-optimizer,
capacity-planner, knowledge-ops, internal-comms) + `anthropics/knowledge-work-plugins@78d74d5` (G15 —
operations: vendor-review, process-doc, process-optimization, change-request, capacity-plan,
compliance-tracking, runbook, risk-assessment, status-report). Ambos os clusters eram **CREATE de lacuna**
(a Kolden não tinha squad de BizOps de execução). Sem cópia literal — princípio reescrito. Refino completo
pelo Ritual do Caos (9 fases) pendente.

## Ritual de Encerramento (auto-aprendizado obrigatório)

Todo agente deste squad, ao final de uma sessão com trabalho, aciona a habilidade `ritual-de-encerramento`
— reflete, extrai lições verificadas e grava na memória do squad (`MEMORY.md`). Fonte única:
`C:\Kolden\.claude\skills\ritual-de-encerramento\SKILL.md`. O reflexo `Stop` dispara automaticamente.
