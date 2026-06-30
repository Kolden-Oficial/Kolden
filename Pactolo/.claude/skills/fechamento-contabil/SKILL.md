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

## Controllership e governança do close

> _Seção absorvida de github.com/msitarzewski/agency-agents@a597cb6 (G1, MIT)._

Confiança no close é confiança **baseada em verificável**, não em "o time é bom". A controladoria opera
sobre regras de segregação e evidência — não sobre julgamento de pessoa.

- **Separação de funções (segregation of duties):** quem **lança** o registro contábil não é quem **revisa**;
  quem revisa não é quem **aprova**. As três cadeiras precisam ter ocupantes distintos no fluxo de cada
  lançamento material — controle invariável de fraude e erro.
- **Evidência mínima por lançamento:** todo lançamento exige documento-fonte (nota, contrato, extrato,
  memória de cálculo), aprovação formal de quem tem alçada e carimbo de data/hora. Lançamento sem o trio
  é rejeitado pelo checklist do close — não entra na demonstração.
- **Escalonamento de exceção por materialidade:**
  - Variação > **R$ 5.000** OU > **5% do baseline** da conta → revisão obrigatória do **controller** com
    justificativa documentada antes do close.
  - Variação > **R$ 50.000** → revisão do **chief/Plutos** com decisão registrada (aceita / corrige / abre
    investigação) antes de qualquer demonstração ser publicada.
- **Anti-padrões (red flags imediatos):**
  - Lançamento sem documento-fonte anexado.
  - Mesma pessoa lançando, revisando e aprovando (segregação rompida).
  - Exceção material aceita sem registro escrito de quem decidiu e por quê.
  - Aprovação retroativa ("aprova aqui que eu já lancei mês passado").

## Matriz de reconciliação por conta

> _Seção absorvida de github.com/msitarzewski/agency-agents@a597cb6 (G2, MIT)._

Reconciliação não é "passar o olho no extrato" — é uma matriz fechada por conta de balanço, com cadência,
fonte de verdade externa e critério de materialidade declarado. O que não está nessa matriz não foi
reconciliado.

- **Caixa (bancos):** razão × extrato bancário × livro caixa interno. Cadência **mensal**, materialidade
  **R$ 1.000**. Itens em trânsito (cheques não compensados, depósitos não creditados) listados item a item.
- **AR — contas a receber:** aging do subledger × posição comercial (CRM, Shopee, plataformas) × expectativa
  de recebimento por janela. Cadência **mensal**. Materialidade casada com prazo (recebível atrasado >30d entra
  obrigatoriamente na reconciliação, qualquer que seja o valor).
- **AP — contas a pagar:** aging do subledger × contratos vigentes × confirmação do fornecedor para itens
  materiais. Cadência **mensal**. Materialidade **R$ 5.000** por fornecedor.
- **Estoque (inventory):** contagem cíclica × sistema. Cadência **trimestral** (ou mensal para SKUs A-curve
  em modelos com estoque próprio). Diferença vira ajuste de estoque com causa atribuída (quebra, furto,
  erro de baixa).
- **Intercompany:** NF/contrato intercompany × DRE da contraparte. Cadência **mensal**. Diferença = 0 obrigatório
  (qualquer gap vira chamada imediata entre os controllers das pontas — intercompany aberto contamina o
  consolidado).
- **Accruals e provisões:** lançamento × evidência de cálculo. Cadência **mensal**. Cobre provisões
  trabalhistas (férias, 13º, encargos), contas a vencer já incorridas (utilities, comissão, royalties) e
  qualquer obrigação reconhecida por competência sem nota ainda emitida.
- **Critério geral de materialidade:** variação > **1% do saldo da conta** OU > **R$ 10.000** (o que for
  menor) dispara investigação **documentada** — não basta "olhei e está ok", precisa registrar o que foi
  conferido e qual a conclusão.
- **Evidência preservada:** todo papel de trabalho de reconciliação fica anexado ao close do período, com
  hash/versão da fonte externa usada. Auditoria interna ou externa precisa conseguir refazer o caminho sem
  pedir nada por chat.

## Fronteira
Não analisa variância nem projeta (handoff ao FP&A/modelador). Decisão de política contábil estratégica
ou tratamento fiscal estatutário → fora do escopo desta versão / **Plutos (Olimpo/CFO)** quando for decisão.

---
*Semente-do-lote-2026-06-26 (refino pelo Ritual do Caos pendente). Princípios reescritos da fonte
`anthropics/knowledge-work-plugins@78d74d5` (plugin finance — journal-entry, reconciliation,
financial-statements, close-management; Apache-2.0) — sem cópia literal.*
