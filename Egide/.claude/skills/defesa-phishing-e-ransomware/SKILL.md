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

---
*Fonte: `mukul975/Anthropic-Cybersecurity-Skills@673da1f3` (Apache-2.0), clusters G21 (phishing-defense)
+ G23 (ransomware-defense): `implementing-dmarc-dkim-spf-email-security`,
`analyzing-email-headers-for-phishing-investigation`, `detecting-ransomware-precursors-in-network`,
`building-ransomware-playbook-with-cisa-framework`. Método reescrito em PT-BR; defensivo; sem cópia literal.*
