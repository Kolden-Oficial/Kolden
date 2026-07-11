---
name: avaliacao-de-risco-de-conformidade
description: >-
  Avalia e prioriza o risco de conformidade de uma iniciativa, processo ou fornecedor, e orienta a
  redação de políticas internas. Use quando o pedido envolver "risco de conformidade", "compliance risk",
  "avaliação de risco", "matriz de risco", "política interna", "código de conduta", "risco regulatório"
  ou "estamos expostos a quê?". Produz mapa de exposição (probabilidade × severidade) por obrigação, com
  ação, dono e priorização — sempre informativo.
tipo: skill
area: Nomos
up: "[[Nomos/_MOC-nomos]]"
---

# Avaliação de Risco de Conformidade

Habilidade transversal do squad Nomos (donos: `analista-regulatorio` e `auditor-de-conformidade`).
Saída **informativa** — não é parecer vinculante.

## Quando usar
Quando a pergunta é "qual a nossa exposição?" — priorizar riscos de conformidade e estruturar políticas
que os mitiguem.

## Sequência
1. **Inventariar obrigações.** Quais regras se aplicam (LGPD/GDPR, ISO/SOC2, EU AI Act, contratos) — com a fonte.
2. **Avaliar cada risco.** Probabilidade × severidade (multa, embargo, violação de titular, reputação,
   quebra contratual). Considerar controle existente (risco residual).
3. **Priorizar.** Matriz de exposição; o que vira ação imediata vs monitorar.
4. **Plano de mitigação.** Ação → dono → evidência esperada → prazo.
5. **Política interna (se for o caso).** Estrutura de código de conduta / uso aceitável de IA / retenção,
   ancorada na regra externa; marcar pontos que exigem advogado.
6. **Handoffs.** Risco material estratégico → **Themis**; provisão/custo → **Pactolo**; controle técnico → **Egide**.

## Saída
- Matriz de risco: obrigação → exposição (prob × severidade) → controle atual → risco residual → ação → dono.
- Plano priorizado.
- Selo obrigatório: `⚠️ Orientação informativa — requer revisão humana/advogado`.

## Vetos
- Nunca afirme "conforme/em risco" sem a fonte e a evidência. Sem evidência = gap; sem fonte = hipótese.
- Nunca exponha PII / texto sigiloso além do necessário. Segredos via Infisical.

---
*Princípios reescritos (sem cópia literal) a partir de: alirezarezvani/claude-skills@4a3c05b (cluster
G17 — risk-management, compliance-os, MIT) e anthropics/knowledge-work-plugins@78d74d5 (legal —
legal-risk-assessment, compliance-check, Apache-2.0).*
</content>
