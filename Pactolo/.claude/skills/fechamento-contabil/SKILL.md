---
name: fechamento-contabil
description: >
  Use para CONDUZIR ou REVISAR o fechamento contábil do período: preparar e revisar lançamentos
  (journal entries), accruals/deferrals e provisões; reconciliar contas (banco, AR/AP, intercompany,
  balanço); produzir as demonstrações (DRE/BP/DFC) amarradas entre si; e manter o checklist e os
  controles do close. Regra dura: nada se reporta sem reconciliação fechada (diferença = 0 ou explicada).
  Gatilhos: "fechar o mês", "fechamento", "close", "lançamento", "journal entry", "reconciliação",
  "conciliar banco", "accrual", "provisão", "DRE/balanço/DFC". Dono: controller.
---

# Fechamento Contábil (close)

Camada executável da controladoria. Regra-mãe: **só reporta o que está conciliado** — diferença = 0 ou
explicada item a item. Saldo aberto vai sinalizado, nunca silenciado.

## 0. Insumos (porta de entrada)
- Razão geral do período, extratos bancários, subledgers (AR/AP, estoque).
- Checklist de fechamento do período anterior (para herdar tarefas e owners).

## 1. Lançamentos (journal entries)
- **Accruals** (despesa incorrida sem nota) e **deferrals** (recebido/pago antecipado) por competência.
- Provisões e alocações com **memória de cálculo** e suporte anexado.
- Cada lançamento: débito/crédito | conta | valor | natureza | suporte. Revisão por segunda pessoa (segregação).

## 2. Reconciliação
- **Banco:** razão vs extrato; itens em trânsito identificados.
- **AR/AP:** subledger vs razão; aging coerente.
- **Intercompany** e contas de balanço: diferença = 0 ou explicada por item.
- Saída: conta | saldo razão | saldo fonte | diferença | status (fechada/aberta) | item explicativo.

## 3. Demonstrações
- **DRE**, **Balanço** e **DFC** consistentes entre si e com o razão.
- Amarração obrigatória: lucro → patrimônio; caixa do DFC = variação de caixa no BP; ativo = passivo + PL.
- Flags automáticos: saldo invertido, conta suspensa, variação anômala mês a mês.

## 4. Close management
- Checklist com tarefa | owner | prazo | status; cronograma do close (soft → hard close).
- Trilha de auditoria preservada; suporte pronto para auditoria externa/interna.

## 5. Saída e handoff
Demonstrações conciliadas + papéis de reconciliação + lista de itens abertos. Entrega o **realizado
conciliado** ao `analista-fpa` (variância) e ao `modelador-financeiro` (ponto de partida do modelo).

## Fronteira
Não analisa variância nem projeta (handoff ao FP&A/modelador). Decisão de política contábil estratégica
ou tratamento fiscal estatutário → fora do escopo desta versão / **Plutos (Olimpo/CFO)** quando for decisão.

---
*Semente-do-lote-2026-06-26 (refino pelo Ritual do Caos pendente). Princípios reescritos da fonte
`anthropics/knowledge-work-plugins@78d74d5` (plugin finance — journal-entry, reconciliation,
financial-statements, close-management; Apache-2.0) — sem cópia literal.*
