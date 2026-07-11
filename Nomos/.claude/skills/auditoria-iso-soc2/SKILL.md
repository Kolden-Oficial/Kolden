---
name: auditoria-iso-soc2
description: >-
  Prepara e avalia conformidade com normas certificáveis — ISO 27001 (ISMS), SOC 2 (Trust Services
  Criteria) e ISO 42001 (AIMS, gestão de IA). Use quando o pedido envolver "ISO 27001", "ISMS/SGSI",
  "SOC 2", "ISO 42001", "AIMS", "auditoria", "readiness", "controle", "evidência", "gap analysis",
  "Statement of Applicability/SoA" ou "certificação". Produz matriz de controles, readiness score e plano
  de remediação — preparação interna, não certificação externa.
tipo: skill
area: Nomos
up: "[[Nomos/_MOC-nomos]]"
---

# Auditoria ISO / SOC 2 / ISO 42001

Dona: `auditor-de-conformidade` (squad Nomos). Saída **informativa**; certificação é de organismo externo.

## Quando usar
Medir a distância até uma certificação, mapear controles a evidência e organizar a auditoria interna.

## Sequência
1. **Escolher a norma e o escopo.** ISO 27001 (segurança da informação), SOC 2 (TSC: segurança,
   disponibilidade, confidencialidade, integridade de processamento, privacidade) tipo I vs II, ou
   ISO 42001 (governança de IA). Definir as fronteiras do sistema.
2. **Mapa de controles.** Para cada controle exigido: dono → como é implementado → qual evidência prova.
3. **SoA (ISO 27001).** Aplicabilidade e justificativa de cada controle do Anexo A.
4. **Gap-analysis.** Status (implementado / parcial / ausente) → severidade da lacuna.
5. **Evidência.** Confirmar o que conta como prova (política, log, configuração, registro de revisão de
   acesso) e organizá-la para o auditor.
6. **Readiness score + plano.** Score por domínio da norma + remediação priorizada por severidade.

## Saída
- Matriz: controle → status → evidência → dono → gap.
- Readiness score por domínio + plano priorizado.
- Selo obrigatório: `⚠️ Orientação informativa — requer revisão humana`.

## Vetos
- Nunca afirme "conforme" sem o controle + a evidência. Nunca confunda preparação interna com certificação.
- Nunca cite exigência sem a referência ao controle/critério da norma. Segredos via Infisical.

## Fronteiras
- Implementação do controle técnico (hardening, logging, IAM) → handoff ao **Egide** (a Nomos pede a evidência).
- Privacidade dentro da norma → `avaliacao-lgpd-gdpr`.

---
*Princípios reescritos (sem cópia literal) a partir de: alirezarezvani/claude-skills@4a3c05b (cluster
G17 — iso27001/isms, soc2, iso42001, compliance-os audits, MIT).*
</content>
