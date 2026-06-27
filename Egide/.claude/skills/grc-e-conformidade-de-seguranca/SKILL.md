---
name: grc-e-conformidade-de-seguranca
description: >-
  Use quando precisar estruturar governança, risco e conformidade de segurança —
  implantar ISO 27001 (ISMS), avaliar maturidade NIST CSF, conduzir avaliação de
  risco NIST SP 800-30, ou atender CMMC/NIST SP 800-171 (SPRS, SSP, POA&M) e
  privacidade (LGPD/GDPR). Distingue avaliação de RISCO de score de MATURIDADE.
  Eixo GRC da Égide — método de framework; não substitui aconselhamento jurídico.
domain: ciberseguranca
subdomain: grc-compliance
tags: [grc, iso27001, isms, nist-csf, nist-800-30, nist-800-171, cmmc, sprs, lgpd, gdpr, risco]
---

# GRC e Conformidade de Segurança

> Não confunda **maturidade** com **risco**: maturidade diz quão maduras são suas práticas contra um
> framework; avaliação de risco diz o que pode te machucar e quão gravemente. Frameworks (CSF, ISO,
> RMF, SOC 2, PCI, HIPAA) frequentemente exigem a avaliação de risco como insumo obrigatório. GRC
> orienta decisão — questões de pagamento de resgate, prazo de notificação e obrigação regulatória
> específica do jurisdição pedem aconselhamento jurídico.

## O que é

GRC converte requisito (regulatório, contratual, de board) em controle implementado e evidência
auditável. Esta habilidade dá o método para os frameworks mais cobrados, com clareza sobre quando
usar cada um.

## Método

### 1. ISO 27001 — Sistema de Gestão (ISMS)
- Defina escopo do ISMS, contexto e partes interessadas; obtenha a **avaliação de risco** (Cláusula
  6.1.2) como base da declaração de aplicabilidade (SoA).
- Selecione controles do Anexo A justificados pelo risco; implemente, opere e melhore (ciclo PDCA);
  prepare evidência para auditoria de certificação.

### 2. NIST CSF — avaliação de maturidade
- Mapeie práticas atuais contra as funções/categorias (GV, ID, PR, DE, RS, RC) e atribua tier/score
  de maturidade.
- O resultado é **lacuna priorizada** (estado atual → alvo), não uma lista de vulnerabilidades.
  ID.RA (risk assessment) consome a avaliação de risco abaixo.

### 3. NIST SP 800-30 — avaliação de risco
- Quando precisar de risco real (não score): identifique fontes de ameaça, eventos, vulnerabilidades,
  **probabilidade × impacto** → risco. Produza o **registro de risco** ranqueado, defensável a board
  e regulador.
- É o insumo exigido por CSF (ID.RA), ISO (6.1.2), RMF/800-37, SOC 2 (CC3), PCI, HIPAA.

### 4. CMMC / NIST SP 800-171 (Base Industrial de Defesa)
- Para quem trata **CUI** sob contrato DoD (DFARS -7012/-7019/-7020/-7021): faça o **scoping** do
  boundary (ativos CUI, de proteção, gerenciados por risco, fora de escopo).
- Avalie os 110 requisitos pela metodologia DoD; **compute e poste o score SPRS**; autore/remedie o
  **SSP** e o **POA&M**; prepare para avaliação C3PAO.

### 5. Privacidade (LGPD / GDPR)
- Implemente controles de proteção de dados pessoais e o fluxo de **direitos do titular** (acesso,
  correção, exclusão — DSAR no GDPR; equivalentes na LGPD).
- Conduza **avaliação de impacto à privacidade (DPIA/RIPD)** para tratamentos de alto risco.

## Entrega
Pacote GRC conforme o pedido: SoA/ISMS, ou score de maturidade CSF com roadmap, ou registro de risco
800-30, ou pacote CMMC (score SPRS + SSP + POA&M), ou controles + DPIA de privacidade. Sempre com a
distinção risco vs. maturidade explícita.

## Incremental (não nesta leva)
NIST RMF (ATO/800-37) completo, NERC CIP, PCI DSS e PIA detalhada por sistema, e automação de
compliance em nuvem (AWS Config/Security Hub) ficam adiados — ver relatório de perda.

---
*Fonte: `mukul975/Anthropic-Cybersecurity-Skills@673da1f3` (Apache-2.0), cluster G25 — compliance/governance
(`implementing-iso-27001-information-security-management`, `performing-nist-csf-maturity-assessment`,
`conducting-cyber-risk-assessment-with-nist-800-30`, `achieving-cmmc-level-2-compliance`,
`implementing-gdpr-data-protection-controls`, `performing-privacy-impact-assessment`). Método reescrito
em PT-BR; sem cópia literal.*
