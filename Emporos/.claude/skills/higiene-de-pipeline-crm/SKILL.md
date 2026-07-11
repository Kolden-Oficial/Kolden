---
name: higiene-de-pipeline-crm
description: >
  Use para manter o PIPELINE no GHL (GoHighLevel) fiel ao fato — criar/mover oportunidades pelos estágios,
  garantir próximo-passo + dono + data em cada deal, limpar deals parados, e produzir forecast operacional
  ponderado por estágio. O GHL é o sistema de registro do ciclo comercial. Gatilhos: "pipeline", "CRM",
  "GHL", "oportunidade", "estágio", "forecast", "previsão de vendas", "limpar pipeline", "deal parado",
  "atualizar deal", "próximo passo". Dono: gestor-de-crm. Credenciais GHL SEMPRE via Infisical.
tipo: skill
area: Emporos
up: "[[Emporos/_MOC-emporos]]"
---

# Higiene de Pipeline no CRM (GHL)

O pipeline é espelho da realidade, não vitrine. Inflar estágio/valor/probabilidade é veto do squad. O GHL
é o sistema de registro: todo contato, oportunidade, proposta e fechamento vivem nele.

## 1. Estágios canônicos (ajustar ao pipeline real do GHL)
`Novo → Qualificado (SQL) → Proposta → Negociação → Ganho / Perdido`
- Move-se pelo **fato**, não pela esperança: só avança quando o gatilho do estágio aconteceu.
- **Ganho/Perdido sempre com motivo** (alimenta o aprendizado e o forecast).

## 2. Regra de "deal vivo"
Toda oportunidade ativa precisa de: **estágio correto + valor real + próximo passo + dono + data**.
Sem próximo passo, o deal está **parado** — não vivo.

## 3. Limpeza de pipeline (housekeeping)
- Liste deals **parados** (X dias sem ação) e recomende: avançar / requalificar / perder-com-motivo.
- Remova duplicatas, corrija valores fantasiosos, feche deals zumbis.
- Garanta tags/origem corretas (Pheme / Ariadne / prospecção) para atribuição.

## 4. Forecast operacional
Previsão **ponderada por estágio**: `Σ (valor × probabilidade do estágio)`. Separe:
- **Committed** — alta confiança, próximo passo claro, fechamento na janela.
- **Best-case** — possível, mas depende de evento.
Nunca reporte forecast com deals sem próximo passo.

## 5. Operações típicas no GHL (via Infisical)
`get-pipelines`, `search-opportunity`, `update-opportunity`, gestão de contatos e tarefas/follow-up.
Recebe SQL do qualificador-de-leads, anexa proposta do redator-de-propostas, marca o fechamento.

## Saída
Use o formato do agente `gestor-de-crm` (PIPELINE / OPORTUNIDADES por estágio / DEALS PARADOS / FORECAST
committed vs best-case / AÇÕES DE HIGIENE / PRÓXIMO PASSO + DONO + DATA).

---
*Princípios reescritos (sem cópia literal) a partir de: anthropics/knowledge-work-plugins@78d74d5
(Apache-2.0) — plugin `sales` (pipeline-review, forecast); alirezarezvani/claude-skills@4a3c05b (MIT) —
cluster comercial G19 (revenue-operations, commercial-forecaster).*
