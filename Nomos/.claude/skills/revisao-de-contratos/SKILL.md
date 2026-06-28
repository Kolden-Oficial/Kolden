---
name: revisao-de-contratos
description: >-
  Revisa contratos e triaga NDAs, sinalizando cláusulas-chave e de risco. Use quando o pedido envolver
  "contrato", "revisar contrato", "NDA", "acordo de confidencialidade", "cláusula", "MSA", "DPA", "SLA",
  "termo de uso", "due diligence de fornecedor", "rescisão", "indenização", "limitação de
  responsabilidade" ou "assinatura". Produz resumo executivo + tabela de risco por cláusula + lista de
  itens que exigem advogado. Não aprova nem assina — sinaliza risco.
---

# Revisão de Contratos

Dona: `gestor-de-contratos` (squad Nomos). Saída **informativa** — não aprova, não assina, não dá parecer.

## Quando usar
Ler um contrato/NDA, mapear obrigações e cláusulas de risco, e preparar o que precisa ir ao advogado.

## Sequência
1. **Resumo executivo.** Partes, objeto, vigência, valor, renovação automática, lei/foro aplicável.
2. **Triagem (se NDA).** Mútuo vs unilateral, definição de informação confidencial, prazo, exceções, devolução.
3. **Cláusulas de risco.** Indenização, limitação/exclusão de responsabilidade, rescisão e multa,
   propriedade intelectual, não-concorrência, force majeure, auto-renovação, confidencialidade.
4. **DPA / dado pessoal.** Se houver tratamento de dados, coordenar com `avaliacao-lgpd-gdpr`.
5. **Due-diligence de fornecedor.** Risco contratual/reputacional antes de contratar.
6. **Itens para advogado.** Lista explícita do que exige revisão jurídica humana.

## Saída
- Resumo executivo.
- Tabela: cláusula → o que diz → risco (alto/médio/baixo) → recomendação / redline sugerido.
- Lista "exige advogado".
- Selo obrigatório: `⚠️ Orientação informativa — requer revisão humana/advogado`.

## Vetos
- Nunca aprove/assine. Nunca declare cláusula "válida/inválida" sem fundamento — rotule como ponto a verificar.
- Nunca exponha texto contratual sigiloso além do necessário. Segredos via Infisical.

## Fronteiras
- Cláusula que toca lei nova/EU AI Act → `conformidade-eu-ai-act` (analista-regulatorio).
- Exposição financeira do contrato → handoff ao **Pactolo**.

---
*Princípios reescritos (sem cópia literal) a partir de: anthropics/knowledge-work-plugins@78d74d5
(legal — review-contract, triage-nda, vendor-check, signature-request, Apache-2.0).*
</content>
