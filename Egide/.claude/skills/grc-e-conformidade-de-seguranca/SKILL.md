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

### 6. Conformidade comercial: SOC 2, HIPAA, PCI-DSS e automação de evidência

> _Sub-seções absorvidas de github.com/msitarzewski/agency-agents@a597cb6 (G16, G17, G18, MIT)._

A skill cobre ISO 27001 e NIST com profundidade; estes três frameworks dominam a conformidade
**comercial** (B2B SaaS, saúde, pagamentos) e cada um tem mecânica própria. Adicionado também o
**mapeamento cruzado** (uma evidência → múltiplos frameworks) e o padrão moderno de **evidência
contínua automatizada**.

#### SOC 2 (Trust Services Criteria)

**Quando aplica:** clientes SaaS B2B/enterprise — requerimento de aquisição.

**Estrutura:** AICPA Trust Services Criteria (TSC) — 5 categorias:
- **CC (Common Criteria, Security)** — obrigatório, base de tudo (9 CCs: CC1 Control Environment ... CC9 Risk Mitigation)
- **A (Availability)** — opcional, requerido se SLA é vendido
- **C (Confidentiality)** — opcional, requerido se NDA com cliente
- **PI (Processing Integrity)** — opcional, raramente requerido
- **P (Privacy)** — opcional, requerido se PII de consumidor

**Tipo I vs Tipo II:**
- **Tipo I**: snapshot — controles desenhados adequadamente em ponto-no-tempo (~30 dias de auditor)
- **Tipo II**: período de observação — controles operando efetivamente por 3-12 meses (padrão = 6-12)
- **Estratégia:** clientes geralmente aceitam Tipo I no primeiro ano, Tipo II depois

**Steps de implementação:**
1. Gap assessment contra TSC (auditor terceiro) → 4-6 semanas
2. Remediação de gaps (define policies, implementa controles) → 3-6 meses
3. Período de observação (Tipo II) — coletar evidência contínua
4. Auditoria final (~30-60 dias)

**Evidence types típicos por CC:**
- CC6.1 (Logical access) — screenshots/exports de IAM, MFA forçado, lista de admins
- CC7.2 (System monitoring) — SIEM dashboards, alerta de incidente, ticket de resposta
- CC8.1 (Change management) — PR templates, code review, deployment logs

**Anti-padrões:**
- Tipo I e Tipo II confundidos ("temos SOC 2 Tipo I, é a mesma coisa") — Tipo I é fraco para enterprise
- Evidence collection no fim do período (não retroativa — preciso coletar contínuo)
- TSC scope inflado (escolher só os necessários — A/C opcionais custam dinheiro)

#### HIPAA (Privacy / Security / Breach Rules)

**Quando aplica:** sistemas que processam Protected Health Information (PHI) — exigência federal US.

**3 regras principais:**
- **Privacy Rule** (45 CFR §164.500-534): direitos do paciente, uso/divulgação permitidos
- **Security Rule** (45 CFR §164.302-318): controles administrativos, físicos, técnicos para ePHI
- **Breach Notification Rule** (45 CFR §164.400-414): notificar HHS + indivíduos em ≤60 dias se >500 afetados; reporte anual para <500

**Security Rule — 3 categorias:**
- **Administrativas** (mais critérios): Security Officer, training, BAA com vendors, contingency plan
- **Físicas**: facility access, workstation security, device disposal
- **Técnicas**: access control (único user ID + MFA), audit logs, integrity, transmission security (TLS)

**Required vs Addressable:**
- **Required:** deve implementar exatamente como especificado
- **Addressable:** implementar OU documentar razão de não-implementar OU implementar alternativa equivalente

**BAA (Business Associate Agreement):**
- Contrato obrigatório com qualquer vendor que toca ePHI (AWS, GCP, Twilio, etc.)
- Sem BAA, transmissão de ePHI para vendor = violação

**Anti-padrões:**
- Confundir Privacy Rule com Security Rule (Privacy = direitos do paciente; Security = controles)
- Implementar HIPAA como "compliance" sem entender ePHI lifecycle
- Storage de PHI em ambiente não-BAA (S3 sem BAA = violação)

#### PCI-DSS (12 requisitos + SAQ vs ROC)

**Quando aplica:** processa, transmite ou armazena cartão de pagamento (PAN, CVV, track data).

**12 requisitos (v4.0):**
1. Firewall/network segmentation
2. Não usar defaults de fornecedor (senha, configuração)
3. Proteger CHD armazenado (criptografia + tokenization)
4. Criptografar transmissão de CHD em redes públicas (TLS 1.2+)
5. Anti-malware
6. Desenvolver e manter sistemas seguros (SDLC + patching)
7. Restringir acesso a CHD por need-to-know
8. Identificar e autenticar (único user ID + MFA)
9. Restringir acesso físico a CHD
10. Logging e monitoring
11. Testar segurança regularmente (vuln scan trimestral + pentest anual)
12. Política de segurança organizacional

**SAQ vs ROC:**
- **SAQ (Self-Assessment Questionnaire)**: auto-avaliação, 9 tipos (A, A-EP, B, B-IP, C, C-VT, D-Merchant, D-SP, P2PE). Tipo depende do método de processamento.
- **ROC (Report on Compliance)**: auditor QSA terceiro. Obrigatório para Level 1 merchants (>6M transações/ano).
- **Levels (merchant):** 1 (>6M tx) → 2 (1-6M) → 3 (20K-1M e-commerce) → 4 (<20K e-commerce)

**Estratégia de redução de scope:**
- Tokenization (substituir PAN por token) — reduz escopo dramaticamente
- P2PE (Point-to-Point Encryption) certificado — terminal trata, sistema não vê CHD
- Outsource processing (Stripe, Adyen) — fica como Service Provider escopo deles

**Anti-padrões:**
- "Stripe processa, não preciso PCI" — SAQ A ainda é exigido se site coleta CHD no DOM (SAQ A-EP) ou tem iframe (SAQ A)
- Storage de CVV (proibido após autorização)
- Log de PAN em texto claro (proibido)

#### Control mapping cross-framework

Quando SOC 2 + ISO 27001 + HIPAA + PCI coexistem (cliente enterprise comum), evite duplicar controles. Mapeie:

| Domínio | SOC 2 (CC) | ISO 27001 (Annex A) | NIST 800-53 | HIPAA (Security) | PCI-DSS |
|---|---|---|---|---|---|
| Access control | CC6.1, CC6.2 | A.9 | AC family | §164.312(a) | Req 7, 8 |
| Encryption | CC6.7 | A.10 | SC-13 | §164.312(a)(2)(iv), (e)(1) | Req 3, 4 |
| Logging/monitoring | CC7.2, CC7.3 | A.12.4 | AU family | §164.312(b) | Req 10 |
| Incident response | CC7.4, CC7.5 | A.16 | IR family | §164.308(a)(6) | Req 12.10 |
| Change management | CC8.1 | A.12.1 | CM family | (implícito SDL) | Req 6 |
| Risk assessment | CC3.1, CC3.2 | A.6, A.18 | RA family | §164.308(a)(1)(ii)(A) | Req 12.2 |

**Estratégia:** uma evidência → múltiplos frameworks. Exemplo: screenshot de MFA forçado em IAM atende SOC 2 CC6.1, ISO 27001 A.9.4.2, HIPAA §164.312(d), PCI Req 8.3.

#### Evidence collection contínua (Drata-style)

A evidência manual no fim do período não escala — atinge custo proibitivo e qualidade duvidosa. Automação de evidência (ferramentas: Drata, Vanta, Secureframe, Tugboat Logic) é o padrão moderno.

**Como funciona:**
- Integrações via API com cloud (AWS, GCP), HRIS (BambooHR, Rippling), IdP (Okta, Azure AD), repos (GitHub), endpoint (Jamf, Intune), monitoring (PagerDuty, Sentry)
- Evidence assertions periódicas (diário/semanal) verificam controle vivo
- Snapshot automático em data de fim do período de auditoria

**Exemplo de assertions automatizadas:**
- "Todo IAM user tem MFA forçado" → query API IAM diário → falha = ticket automático
- "Todo PR é revisado por outro engenheiro" → API GitHub → métrica semanal
- "Todo employee tem laptop com FileVault" → MDM API → diário
- "Backup é testado mensalmente" → log de restore test

**Anti-padrões:**
- Drata/Vanta como "compliance no piloto automático" (ainda precisa Security Officer)
- Confundir automação com adequação (ferramenta detecta, time corrige)
- Falsos negativos (assertion passa mas controle quebrou) — sample manual periódico

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
