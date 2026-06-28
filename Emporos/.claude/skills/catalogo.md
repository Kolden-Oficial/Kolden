# Catálogo de Habilidades — Êmporos

Habilidades disponíveis ao squad Êmporos (execução comercial), seu gatilho de invocação e propósito.
Squad-semente do lote `2026-06-26` — refino completo pelo Ritual do Caos pendente.

## Habilidades-âncora (SKILL.md próprios)

| Habilidade | Gatilho | Propósito | Dono |
|---|---|---|---|
| `qualificacao-bant-meddic` | "qualificar lead", "esse lead presta", "BANT", "MEDDIC", "lead scoring", "MQL/SQL", "fit ICP" | Qualifica o lead antes de virar oportunidade: ICP + BANT (simples) + MEDDIC (complexo) + scoring + aceite/recusa do handoff marketing→vendas | qualificador-de-leads |
| `cadencia-de-outbound` | "cadência", "outbound", "cold email", "sequência", "prospecção", "follow-up", "abrir conversa", "Apollo" | Abre/mantém conversa por outbound multi-toque: sequência (dias/canais), cold email 1:1, prospecção e enriquecimento (Apollo/Common Room), sem spam | executivo-de-cadencia |
| `redacao-de-proposta-comercial` | "proposta", "orçamento", "RFP", "licitação", "contrato comercial", "termos" | Redige proposta/orçamento/resposta a RFP dentro da política de preço do Afrodite; matriz de aderência; não emite parecer jurídico | redator-de-propostas |
| `higiene-de-pipeline-crm` | "pipeline", "CRM", "GHL", "oportunidade", "estágio", "forecast", "limpar pipeline", "deal parado" | Mantém o pipeline no GHL fiel ao fato: estágios, próximo-passo+dono+data, limpeza, forecast ponderado | gestor-de-crm |
| `negociacao-e-fechamento` | "negociar", "objeção", "desconto", "fechar", "closing", "está caro", "concessão" | Conduz negociação e fechamento: mapa de objeções, concessão dentro da faixa, técnicas de fechamento, escalonamento de exceção ao Afrodite | redator-de-propostas + emporos-chief |

## Fronteira com o Afrodite (Olimpo/CRO)
O Êmporos é **execução**; o Afrodite é **estratégia de receita**. Estas habilidades operam **dentro** da
política do Afrodite (preço, metas, RevOps macro). Preço/prazo/escopo fora da política é **exceção a
escalar**, nunca decisão local. Conta fechada → handoff de expansão/retenção sinalizado ao Afrodite.

## Habilidades compartilhadas (fonte única no workspace)
| Habilidade | Gatilho | Propósito |
|---|---|---|
| `ritual-de-encerramento` | Fim de toda sessão com trabalho (reflexo `Stop`) | Reflete e grava lições no `MEMORY.md` do squad. Fonte: `C:\Kolden\.claude\skills\ritual-de-encerramento\SKILL.md` |
| `infisical-padrao` | Sempre que precisar de credencial (GHL/Apollo/Common Room) | Buscar segredos via Infisical (nunca texto puro). Fonte: `Caos/.claude/skills/infisical-padrao/` |

## Atribuição
Capacidades derivadas (princípios reescritos, **sem cópia literal**) de:
- `alirezarezvani/claude-skills@4a3c05b` (MIT) — cluster comercial G19 (13 skills: deal-desk, pricing,
  rfp-responder, contract-and-proposal-writer, sales-engineer, revenue-operations, commercial-forecaster,
  commercial-policy, channel-economics, partnerships-architect, customer-success-manager, business-growth) + G4 (cold-email).
- `anthropics/knowledge-work-plugins@78d74d5` (Apache-2.0) — plugin `sales` (account-research, call-prep,
  draft-outreach, forecast, pipeline-review, competitive-intelligence, create-an-asset) + conectores
  `apollo` e `common-room`.
