---
name: qualificacao-bant-meddic
description: >
  Use para QUALIFICAR um lead comercial antes de ele virar oportunidade — decidir se presta perseguir.
  Cobre fit com ICP, o framework BANT (Budget, Authority, Need, Timeline) para deals simples e MEDDIC
  (Metrics, Economic buyer, Decision criteria, Decision process, Identify pain, Champion) para deals
  complexos, mais lead scoring e o aceite/recusa do handoff marketing→vendas (MQL→SQL ou volta a nutrir).
  Gatilhos: "qualificar lead", "esse lead presta", "BANT", "MEDDIC", "lead scoring", "MQL", "SQL", "fit
  com ICP", "vale a pena perseguir". Dono: qualificador-de-leads. CRM e enriquecimento via Infisical.
---

# Qualificação BANT / MEDDIC

Decide se um lead merece esforço de vendas **antes** de virar oportunidade no pipeline. Sem qualificação
mínima registrada, o lead não avança (veto do squad).

## 1. Fit com ICP (porta de entrada)
Antes de qualquer framework, cheque aderência ao cliente-ideal: segmento, porte, dor central, capacidade
de pagar. Fit baixo + sem sinal forte = recusa (volta a nutrir no Pheme/Ariadne com motivo).

## 2. BANT — deals simples/transacionais
| Dimensão | Pergunta-chave | Sinais |
|---|---|---|
| **Budget** | Há verba para isso? | Faixa de investimento, dor que justifica gasto |
| **Authority** | Falamos com quem decide? | Cargo, poder de assinatura, comitê |
| **Need** | A dor é real e priorizada? | Impacto declarado, urgência, custo de não-agir |
| **Timeline** | Quando pretendem resolver? | Prazo, evento gatilho, janela de orçamento |

Cada dimensão recebe ✓ / ✗ / ? (lacuna a investigar).

## 3. MEDDIC — deals complexos/maiores (B2B, ciclo longo)
- **Metrics** — qual número o cliente quer mover (e em quanto)?
- **Economic buyer** — quem controla o orçamento de fato?
- **Decision criteria** — por que critérios a compra será decidida?
- **Decision process** — quais etapas/aprovações até a assinatura?
- **Identify pain** — a dor concreta que dói o suficiente para comprar.
- **Champion** — quem internamente vende por nós quando não estamos na sala.

## 4. Lead scoring
Nota composta para priorizar a fila: **Score = fit-ICP × engajamento × urgência** (normalizado 0-100).
Engajamento vem do histórico no GHL (aberturas, respostas, visitas); urgência vem de Timeline/evento gatilho.

## 5. Veredito do handoff marketing→vendas
- **SQL (aceito)** — fit + BANT/MEDDIC mínimo → o gestor-de-crm cria a oportunidade.
- **MAIS-INFO** — falta dado decisivo → enriquecer (Apollo/Common Room) ou nutrir mais um ciclo.
- **RECUSADO** — fit baixo / sem dor / sem verba → volta ao Pheme/Ariadne **com o motivo**.

## Saída
Use o formato do agente `qualificador-de-leads` (LEAD / FIT-ICP / BANT / MEDDIC / SCORE / VEREDITO /
PRÓXIMO PASSO + DONO + DATA). CRM e enriquecimento sempre com credenciais via Infisical.

---
*Princípios reescritos (sem cópia literal) a partir de: alirezarezvani/claude-skills@4a3c05b (MIT) —
cluster comercial G19 (sales-engineer, commercial-policy); anthropics/knowledge-work-plugins@78d74d5
(Apache-2.0) — plugin `sales` (account-research, daily-briefing).*
