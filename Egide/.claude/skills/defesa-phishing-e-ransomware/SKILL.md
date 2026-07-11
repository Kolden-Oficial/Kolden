---
name: defesa-phishing-e-ransomware
description: >-
  Use quando precisar defender contra phishing e ransomware — autenticar e-mail
  (SPF/DKIM/DMARC), analisar cabeçalhos de um e-mail suspeito para achar a origem
  real, detectar precursores de ransomware na rede (a janela pré-criptografia), e
  estruturar um playbook de resposta a ransomware alinhado a CISA/NIST. Eixo de
  defesa de acesso inicial + impacto da Égide — detecção, contenção e recuperação.
domain: ciberseguranca
subdomain: phishing-ransomware-defense
tags: [phishing, ransomware, dmarc, dkim, spf, email-headers, cisa, playbook, deteccao, bec]
tipo: skill
area: Egide
up: "[[Egide/_MOC-egide]]"
---

# Defesa contra Phishing e Ransomware

> Phishing é o acesso inicial mais comum; ransomware é o impacto mais caro — e os dois se ligam: o
> e-mail de hoje vira a criptografia de amanhã. O tempo médio do deploy de Cobalt Strike até a
> criptografia é ~17 minutos: a defesa que importa é a **janela pré-criptografia**. Decisões de
> pagamento de resgate e notificação de violação exigem aconselhamento jurídico, não estão nesta
> habilidade.

## O que é

Esta habilidade cobre a linha do tempo do ataque mais comum: bloquear/detectar o phishing na entrada,
investigar o e-mail suspeito que passou, detectar a movimentação pré-ransomware, e ter o playbook
pronto para conter e recuperar.

## Método

### 1. Autenticação de e-mail (SPF/DKIM/DMARC) — prevenção
- **Auditoria** do estado atual do domínio; implemente **SPF** (quem pode enviar), **DKIM**
  (assinatura), **DMARC** (política + alinhamento).
- Suba o DMARC em modo `p=none` (monitorar) → `quarantine` → `reject`, lendo os **relatórios agregados**
  para não bloquear remetente legítimo antes da hora. DMARC em `reject` derruba a maioria do spoofing
  direto do seu domínio.

### 2. Investigação de e-mail suspeito (forense de cabeçalho)
- Extraia os **cabeçalhos brutos** e parseie a cadeia `Received` para achar a **origem real** (não o
  `From` exibido).
- Valide alinhamento **SPF/DKIM/DMARC** — desalinhamento delata spoofing.
- Analise domínio e infraestrutura do remetente (idade, reputação, cert transparency para domínios de
  phishing recém-criados) e o corpo/anexos/URLs. Detecte **BEC** (comprometimento de e-mail
  corporativo) e regras de encaminhamento maliciosas.

### 3. Detecção de precursores de ransomware (janela pré-criptografia)
- Mapeie as fases do kill chain na rede: acesso inicial → beacon C2 (ex.: Cobalt Strike) →
  reconhecimento interno → movimento lateral → staging/exfil → criptografia.
- Implemente **regras de detecção de rede** e **correlação no SIEM** que encadeiam múltiplos
  precursores num alerta de alta confiança (um indicador isolado é ruído; a cadeia é sinal).
- Enriqueça com threat intel e estabeleça triagem/escalonamento — o objetivo é **conter antes da
  criptografia**.

### 4. Playbook de ransomware (CISA StopRansomware / NIST)
- **Preparação/Prevenção**: backups testados e isolados (offline/imutável), segmentação, hardening.
- **Detecção e análise**: identificar escopo, família, vetor de entrada.
- **Contenção**: isolar hosts/segmentos, cortar C2, preservar evidência.
- **Erradicação e recuperação**: remover persistência, restaurar de backup conhecido-bom, validar
  integridade.
- **Pós-incidente**: lições aprendidas, fechar lacunas, atualizar o playbook. Valide o playbook em
  **tabletop** periódico.

## Entrega
Pacote de defesa: postura de autenticação de e-mail (SPF/DKIM/DMARC) + laudo de investigação de
phishing + regras de detecção de precursor de ransomware + playbook CISA/NIST testado. Handoff:
contenção/IR → omar-santos; indicadores → CTI (`inteligencia-de-ameacas-cti`).

## Incremental (não nesta leva)
Simulação de phishing (GoPhish), treinamento anti-phishing, SOAR/automação de resposta, recuperação
detalhada pós-criptografia e análise de wallet/leak-site de ransomware ficam adiados — ver relatório
de perda.

## Herança histórica

**Kevin Mitnick** (1963-2023) — o hacker social por excelência; autor de *The Art of Deception* (2001, Wiley) e *The Art of Intrusion* (2005). Codificou a doutrina "a interface humana é o elo mais fraco" que fundamenta a defesa contra phishing.

**Christopher Hadnagy** — fundador da Social-Engineer, LLC; autor de *Social Engineering: The Art of Human Hacking* (2010) e *Phishing Dark Waters* (2015, Wiley); mantém o **Social-Engineer Toolkit (SET)** e o framework de engenharia social usado como referência de defesa.

**IETF DMARC WG (John Levine, Murray Kucherawy et al.)** — publicaram **RFC 7489 (DMARC)** em 2015, sobre **RFC 7208 (SPF, 2014)** e **RFC 6376 (DKIM, 2011)**. A tríade de autenticação de email da seção 1.

**CISA #StopRansomware team (Jen Easterly e equipe)** — publicaram o *Ransomware Guide* (2020+) e mantêm `stopransomware.gov`, incluindo o **KEV Catalog** e o playbook nacional americano que estrutura a seção 4.

**No More Ransom Project** (Europol EC3 + NHTCU + Kaspersky + McAfee, 2016+) — coalizão que mantém decryptors gratuitos e cataloga famílias; fonte defensiva para recuperação.

**Frameworks canônicos herdados**:
- **RFC 7489 (DMARC) + RFC 7208 (SPF) + RFC 6376 (DKIM)** — a tríade canônica.
- **BIMI (Brand Indicators for Message Identification, 2020+)** — quarto pilar de autenticação para clientes que exibem logo.
- **CISA #StopRansomware Guide** e **NIST SP 1800-25/26** — framework nacional americano de defesa/recuperação.
- **Mandiant M-Trends (annual)** — telemetria pública de tempo médio deploy→criptografia (~17 min citado).
- **MITRE ATT&CK — TA0001 Initial Access (T1566 Phishing) e T1486 Data Encrypted for Impact** — vocabulário da linha do tempo.

---
*Fonte: `mukul975/Anthropic-Cybersecurity-Skills@673da1f3` (Apache-2.0), clusters G21 (phishing-defense)
+ G23 (ransomware-defense): `implementing-dmarc-dkim-spf-email-security`,
`analyzing-email-headers-for-phishing-investigation`, `detecting-ransomware-precursors-in-network`,
`building-ransomware-playbook-with-cisa-framework`. Método reescrito em PT-BR; defensivo; sem cópia literal.*
