---
name: avaliacao-lgpd-gdpr
description: >-
  Avalia a conformidade de um tratamento de dados pessoais com a LGPD (Brasil) e o GDPR (UE). Use quando
  o pedido envolver "LGPD", "GDPR", "dado pessoal", "privacidade", "base legal", "DPIA/RIPD", "RoPA",
  "registro de tratamento", "direitos do titular", "consentimento", "transferência internacional" ou
  "incidente/vazamento de dados". Conduz base legal → DPIA → RoPA → direitos → incidente, sempre com a
  fonte normativa e rótulo de orientação informativa (requer revisão humana/advogado).
tipo: skill
area: Nomos
up: "[[Nomos/_MOC-nomos]]"
---

# Avaliação LGPD / GDPR

Dona: `privacidade-de-dados` (squad Nomos). Saída **informativa** — nunca parecer vinculante.

## Quando usar
Mapear a legalidade de um tratamento de dados pessoais, conduzir avaliação de impacto, montar o registro
de operações ou orientar resposta a pedido de titular / incidente.

## Sequência
1. **Mapear o tratamento.** Finalidade, dados coletados, titulares, fluxo, retenção, compartilhamento.
2. **Definir a base legal.** Escolher entre as hipóteses legais (consentimento, legítimo interesse,
   execução de contrato, obrigação legal, etc.) — com o artigo que a fundamenta. Verificar minimização,
   finalidade e necessidade.
3. **Avaliar impacto (DPIA/RIPD).** Se o tratamento é de alto risco (dado sensível, larga escala,
   monitoramento, decisão automatizada): listar risco ao titular (probabilidade × severidade) e a
   mitigação; calcular risco residual.
4. **Registrar (RoPA).** Quem trata, o quê, por quê, com quem compartilha, por quanto tempo retém.
5. **Direitos do titular.** Fluxo e prazo para acesso, correção, exclusão, portabilidade, oposição, revogação.
6. **Transferência internacional.** Verificar adequação / cláusulas-padrão (SCC) / garantias.
7. **Incidente.** Se houver vazamento: triar severidade, dever e prazo de notificação (ANPD/autoridade + titular).

## Saída
- Mapa de tratamento (finalidade → base legal com artigo → dado → retenção → compartilhamento).
- DPIA: risco → mitigação → risco residual.
- Lacunas priorizadas por exposição.
- Selo obrigatório: `⚠️ Orientação informativa — requer revisão humana/advogado`.

## Vetos
- Nunca afirme "conforme" sem a evidência do controle (sem evidência = gap).
- Nunca cite exigência sem o artigo. Nunca exponha PII além do necessário. Segredos via Infisical.

## Fronteiras
- Implementação técnica (criptografia, DLP, pseudonimização em produção) → handoff ao **Egide**.
- Lei nova / EU AI Act → `conformidade-eu-ai-act` (analista-regulatorio).

---
*Princípios reescritos (sem cópia literal) a partir de: alirezarezvani/claude-skills@4a3c05b (cluster
G17 — gdpr-dsgvo, MIT) e anthropics/knowledge-work-plugins@78d74d5 (legal/compliance-check, Apache-2.0).*
</content>
