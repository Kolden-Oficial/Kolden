---
name: gestao-de-mudanca-e-risco-operacional
description: >
  Use para conduzir uma MUDANÇA de processo/operação sem parar a empresa e para avaliar o RISCO
  operacional de uma decisão. Cobre o change request (gatilho, o que muda, impacto nos atores/sistemas,
  aprovação), a matriz de risco (probabilidade × impacto, com mitigação), o plano de rollback e a
  comunicação interna aos afetados. Habilidade-âncora do squad Ananke, dona: arquiteto-de-processos.
  Gatilhos: "vamos mudar esse fluxo", "change request", "qual o risco operacional", "plano de rollback",
  "como comunicar a mudança", "isso pode parar a operação?". Toda mudança de impacto vem com risco e
  rollback — nunca uma mudança "no susto".
---

# Gestão de Mudança e Risco Operacional

Mudar um processo é arriscado: pode parar a operação, gerar retrabalho ou quebrar dependências. Esta
habilidade impõe que **toda mudança de impacto seja deliberada** — com gatilho, impacto, risco, rollback,
aprovação e comunicação. Nada de mudar "no susto".

## 1. Change request (solicitação de mudança)

```
CR-<NNN> — <título da mudança>                    dono: <quem propõe> | aprova: <quem decide>
Gatilho / justificativa: por que mudar agora (problema, oportunidade, exigência).
O que muda: estado atual → estado proposto (processo, sistema, responsável).
Impacto: quais atores, sistemas, SOPs e fornecedores são afetados.
Esforço: estimativa (impacto × esforço para priorizar).
Risco: ver matriz abaixo.
Rollback: como reverter se der errado.
Comunicação: quem precisa saber, quando, por qual canal.
```

## 2. Matriz de risco (probabilidade × impacto)

Para cada risco identificado na mudança:

| Risco | Probabilidade (B/M/A) | Impacto (B/M/A) | Severidade | Mitigação | Dono |
|---|---|---|---|---|---|

- **Severidade** = probabilidade × impacto. Tratar primeiro os **Alto×Alto**.
- Todo risco de severidade alta exige **mitigação explícita** antes de aprovar a mudança.
- Riscos de segurança/compliance técnica → **handoff ao Egide**. Riscos financeiros → **handoff ao Pluto**.

## 3. Plano de rollback

Toda mudança de impacto precisa de um caminho de volta conhecido **antes** de executar:

- Qual o **ponto de não retorno** (até onde dá para reverter).
- **Gatilho de rollback:** que sinal indica que a mudança falhou e é hora de reverter.
- **Passos de reversão:** como voltar ao estado anterior (e quanto tempo leva).
- **Estado de segurança:** para onde a operação volta enquanto se reverte.

Uma mudança sem rollback é uma aposta — só aceitável quando explicitamente irreversível e aprovada como tal.

## 4. Comunicação interna (knowledge-ops)

Mudança não comunicada gera processo-sombra (gente seguindo o fluxo antigo). Para cada mudança aprovada:

- **Quem** é afetado (executores, aprovadores, dependências, fornecedores).
- **O que** muda na prática para cada um (não o CR inteiro — o delta relevante).
- **Quando** entra em vigor e por **qual canal** comunicar.
- Atualizar o **SOP/runbook** afetado (versão nova) — a documentação é a fonte da verdade.

## 5. Faseamento (quando o risco é alto)

Mudança de alto risco não vai "tudo de uma vez": piloto → grupo controlado → rollout. Cada fase tem
critério de avanço (mediu, deu certo, avança) e gatilho de rollback. A medição de cada fase é handoff ao
`analista-de-eficiencia`.

## Limites e handoffs

- **Não** executa a mudança técnica em sistema → engenharia (Dédalo) quando envolver build/automação.
- **Não** dá veredito de risco de segurança → Egide. **Não** avalia custo financeiro → Pluto.
- A **decisão estratégica** de fazer ou não a mudança maior é do Poseidon (COO), via `ananke-chief`.

---
*Procedência (squad-semente, lote 2026-06-26): princípio adaptado de `anthropics/knowledge-work-plugins@78d74d5`
(Apache-2.0 — operations: change-request, risk-assessment) e `alirezarezvani/claude-skills@4a3c05b` (MIT —
cluster G20). Sem cópia literal — reescrito para o padrão Kolden.*
