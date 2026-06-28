# Catálogo de Habilidades — Ananke

Habilidades disponíveis ao squad Ananke (Operações & BizOps), seu gatilho de invocação, propósito e dono.

> **status: semente-do-lote-2026-06-26** — 5 habilidades-âncora. O refino pelo Ritual do Caos (9 fases)
> pode materializar tasks/workflows/checklists e desdobrar cada cluster em habilidades mais finas.

## Habilidades-âncora de domínio (SKILL.md próprios)

| Habilidade | Gatilho | Propósito | Dono |
|---|---|---|---|
| `desenho-de-processos-sop` | "documentar processo", "escreve o SOP", "monta o runbook", "padronizar", "mapear o fluxo" | Mapeia o fluxo REAL → SOP + runbook executáveis por terceiro (RACI, passos, exceções, critério de pronto) | arquiteto-de-processos |
| `gestao-de-mudanca-e-risco-operacional` | "mudar esse fluxo", "change request", "qual o risco operacional", "plano de rollback", "comunicar a mudança" | Conduz mudança de processo com change request + matriz de risco + rollback + comunicação interna | arquiteto-de-processos |
| `mapeamento-de-automacao` | "automatizar", "isso é repetitivo", "dá pra automatizar X?", "n8n", "integrar A com B" | Triagem por retorno + blueprint n8n (gatilho→nós→erro) + pacote de handoff ao Dédalo. Desenha, não constrói | analista-de-automacao |
| `gestao-de-fornecedores` | "qual fornecedor contratar", "avaliar vendor", "comparar opções", "vale renovar?", "make or buy" | Matriz de decisão por critério ponderado + due diligence + ciclo de revisão de SLA (soberania de dados como critério) | gestor-de-fornecedores |
| `metricas-e-eficiencia-operacional` | "qual KPI", "está eficiente?", "temos capacidade?", "relatório de status", "onde está o desperdício" | KPI ligado a decisão + capacidade pelo gargalo + status honesto + melhoria contínua por hipótese mensurável | analista-de-eficiencia |

## Mapa frente → onde vive → dono

| Frente | Onde vive | Agente dono |
|---|---|---|
| Processos & documentação (SOP/runbook) | `agents/arquiteto-de-processos.md` + skill `desenho-de-processos-sop` | arquiteto-de-processos |
| Mudança & risco operacional | `agents/arquiteto-de-processos.md` + skill `gestao-de-mudanca-e-risco-operacional` | arquiteto-de-processos |
| Automação de fluxo (desenho → Dédalo) | `agents/analista-de-automacao.md` + skill `mapeamento-de-automacao` | analista-de-automacao |
| Fornecedores & procurement | `agents/gestor-de-fornecedores.md` + skill `gestao-de-fornecedores` | gestor-de-fornecedores |
| Eficiência & métricas | `agents/analista-de-eficiencia.md` + skill `metricas-e-eficiencia-operacional` | analista-de-eficiencia |

## Habilidades compartilhadas (fonte única no workspace)

| Habilidade | Gatilho | Propósito |
|---|---|---|
| `ritual-de-encerramento` | Fim de toda sessão com trabalho (reflexo `Stop`) | Reflete e grava lições no `MEMORY.md` do squad. Fonte: `C:\Kolden\.claude\skills\ritual-de-encerramento\SKILL.md` |
| `infisical-padrao` | Sempre que precisar de credencial/segredo | Buscar segredos via Infisical (nunca texto puro). Fonte: `Caos/.claude/skills/infisical-padrao/` |
| `verificacao-de-alinhamento` | SessionStart >24h (reflexo `verificacao-diaria`) | Checa pontas soltas nos documentos do squad |

## Procedência

Habilidades-âncora derivadas dos clusters de operações do lote 2026-06-26:
`alirezarezvani/claude-skills@4a3c05b` (MIT — G20: process-mapper, vendor-management, procurement-optimizer,
capacity-planner, knowledge-ops) + `anthropics/knowledge-work-plugins@78d74d5` (Apache-2.0 — operations:
process-doc, process-optimization, change-request, risk-assessment, capacity-plan, status-report, vendor-review,
runbook). Sem cópia literal — princípios reescritos para o padrão Kolden.
