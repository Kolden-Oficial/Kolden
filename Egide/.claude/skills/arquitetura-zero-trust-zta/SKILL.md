---
name: arquitetura-zero-trust-zta
description: >-
  Use quando precisar desenhar, avaliar a maturidade ou implementar arquitetura zero-trust
  (ZTA): aplicar o CISA Zero Trust Maturity Model v2 (5 pilares — identidade, dispositivos,
  redes, aplicações, dados) e o NIST SP 800-207, substituir VPN por ZTNA/identity-aware proxy
  (BeyondCorp, Cloudflare Access, Zscaler, AWS Verified Access), implementar microsegmentação
  para conter movimento lateral, avaliar device posture como condição de acesso, e mTLS
  serviço-a-serviço. Eixo arquitetural novo da Égide — desenho e verificação contínua de acesso,
  não um produto único.
domain: ciberseguranca
subdomain: zero-trust-architecture
tags: [zero-trust, ztna, zta, microsegmentacao, beyondcorp, device-posture, mtls, cisa-ztmm, nist-800-207, conditional-access]
tipo: skill
area: Egide
up: "[[Egide/_MOC-egide]]"
---

# Arquitetura Zero-Trust (ZTA)

> ZTA é arquitetura, não um produto que se instala. **Complementa** — não substitui — firewall,
> WAF e ACL de rede. Não a use como controle isolado sem verificação de identidade, nem para
> dispositivos IoT/headless que não rodam agente de posture. Mudanças de microsegmentação e
> conditional access podem cortar acesso legítimo: implemente em `audit`/`monitor` antes de `enforce`.

## O que é

Zero trust elimina a confiança implícita: ninguém é confiável por estar "dentro da rede". Todo
acesso é **verificado continuamente** com base em identidade, saúde do dispositivo e contexto,
concedido com **menor privilégio** e segmentado para conter o estrago. A Égide não tinha eixo
arquitetural de ZTA; esta habilidade dá o método de desenho, avaliação de maturidade e
implementação progressiva, ancorado no **NIST SP 800-207** e no **CISA ZTMM v2**.

## Método

### 1. Avaliar maturidade pelos 5 pilares (CISA ZTMM v2)
Mapeie o estado atual de cada pilar contra os 4 estágios (Tradicional → Inicial → Avançado → Ótimo),
mais as 3 capacidades transversais (Visibilidade & Analytics, Automação & Orquestração, Governança):
- **Identidade** — de senha para MFA resistente a phishing + acesso baseado em risco contínuo.
- **Dispositivos** — de não gerenciado para inventário + posture em tempo real condicionando acesso.
- **Redes** — de perímetro plano para microsegmentação e criptografia interna.
- **Aplicações & Workloads** — de acesso por rede para acesso autenticado por aplicação.
- **Dados** — de implícito para inventário, classificação e acesso governado.
Produza **gap analysis** e roadmap progressivo por pilar (não tente saltar para "Ótimo" de uma vez).

### 2. ZTNA: substituir a VPN
- Coloque aplicações atrás de um **identity-aware proxy** em vez de expor rede: **GCP IAP**,
  **Cloudflare Access**, **Zscaler ZPA**, **AWS Verified Access**, **Palo Alto Prisma**, ou
  BeyondCorp/HashiCorp Boundary. O usuário acessa a app, nunca a rede.
- Política de acesso **contextual**: identidade (do IdP, com MFA) + saúde do dispositivo + localização
  + sensibilidade do recurso. Decisão por requisição, com log centralizado de cada decisão.

### 3. Device posture como condição de acesso
- Defina **baselines de conformidade** por categoria de dispositivo (ex.: disco cifrado, secure boot,
  TPM, EDR ativo, versão mínima de SO).
- Ingira sinais de **EDR/MDM** (CrowdStrike ZTA, Intune, Jamf, Defender) e ligue-os a **conditional
  access** do IdP: dispositivo não-conforme não recebe acesso, mesmo com identidade válida. Use sinal
  **em tempo real** — posture obsoleto cria falsa confiança.

### 4. Microsegmentação (conter movimento lateral)
- Segmente por **identidade de workload**, não por VLAN/IP. Modelos: rede (VMware NSX/Cisco ACI),
  host (Illumio/Guardicore), container (Calico/Cilium — ver `seguranca-de-containers-e-kubernetes`),
  ou aplicação (Zscaler Workload Segmentation).
- Comece em modo de **observação** para mapear fluxos reais, depois aplique **default-deny** entre
  workloads. Mesmo após comprometer um host, o atacante não anda de lado.

### 5. Confiança serviço-a-serviço
- **mTLS** entre serviços (identidade mútua por certificado) para que nenhuma chamada interna seja
  confiável só pela origem de rede. Combine com identidade de workload e rotação curta de certificado.

### 6. Verificação contínua e governança
- ZTA não é "logou, confiou": reavalie sessão por sinais (mudança de risco, posture que degradou,
  geo anômala) e reautentique/derrube. Governe com visibilidade central, automação de política e
  métricas de maturidade revisadas periodicamente.

## Entrega
Plano de ZTA: avaliação de maturidade CISA ZTMM por pilar + gap analysis + roadmap faseado +
desenho de ZTNA (qual proxy, quais apps) + política de device posture + plano de microsegmentação
(modelo + ordem de rollout audit→enforce) + estratégia de mTLS. Handoff: a parte de container/K8s
vai para `seguranca-de-containers-e-kubernetes`; a de identidade para `gestao-de-identidade-e-acesso-iam`.

## Ferramentas de referência (defensivas)
NIST SP 800-207, CISA ZTMM v2, GCP IAP, Cloudflare Access, Zscaler ZPA, AWS Verified Access, Palo
Alto Prisma, HashiCorp Boundary, Illumio/Guardicore/VMware NSX, Calico/Cilium, CrowdStrike ZTA /
Intune / Jamf (posture), Entra/Okta conditional access.

## Incremental (não nesta leva)
Zero-trust DNS (NextDNS), Tailscale para VPN ZT, zero-trust para SaaS específico e identity federation
detalhada ficam adiados — ver relatório de perda.

### Aprofundamento absorvido nesta consolidação: **browser isolation** (RBI/LBI)

Browser isolation completa o eixo 2 (ZTNA) quando o app **é** a web pública/SaaS de risco,
não uma app corporativa atrás de proxy.
- **Remote Browser Isolation (RBI)**: sessão renderiza em container efêmero na nuvem
  (Cloudflare Browser Isolation, Menlo, Zscaler); usuário vê pixels/stream. Vantagem:
  malware nunca toca o endpoint; anexo/download é sanitizado antes de descer.
- **Local Browser Isolation (LBI)**: browser dedicado hardened (Island Browser,
  Talon-of-Google) no dispositivo, com controle de política corporativa (DLP,
  copy/paste, screenshot).
- Padrão ZTA: para acesso a app **corporativa privada** → ZTNA/IAP (identity-aware
  proxy). Para acesso a **web pública de alto risco** (email, SaaS, pesquisa) →
  browser isolation. As duas camadas se somam no mesmo perímetro-de-um.
- Sinal para SIEM: cada sessão RBI emite decisão de política (bloqueio de download,
  reescrita de link, print bloqueado) — trate como evento de conditional access.

## Herança histórica

**John Kindervag** — cunhou o termo **Zero Trust** em 2010 (Forrester Research) no paper *No More Chewy Centers*, refutando o modelo de "perímetro casca-e-recheio"; hoje na Illumio. Sua tese "never trust, always verify" é o axioma desta skill.

**Google BeyondCorp team (Rory Ward, Betsy Beyer, Heather Adkins)** — publicaram entre 2014 e 2018 a série *BeyondCorp: A New Approach to Enterprise Security* (`research.google/pubs/`, IEEE Security & Privacy), a primeira implementação industrial em escala de ZTA que virou blueprint do mercado; origem do modelo de "acesso à app, não à rede" da seção 2.

**Scott Rose et al. (NIST)** — autores de **NIST SP 800-207: Zero Trust Architecture** (agosto 2020), padrão federal americano; a fonte primária do vocabulário PDP/PEP (Policy Decision Point / Policy Enforcement Point) que a seção 6 aplica.

**CISA (Cybersecurity and Infrastructure Security Agency)** — publicou o **Zero Trust Maturity Model v1** (2021) e **v2** (2023), com os 5 pilares (identidade, dispositivos, redes, aplicações, dados) e as 3 capacidades transversais que estruturam a seção 1.

**Frameworks canônicos herdados**:
- **NIST SP 800-207** — vocabulário PDP/PEP, 7 tenets ZTA.
- **CISA Zero Trust Maturity Model v2** — 5 pilares × 4 estágios (Tradicional/Inicial/Avançado/Ótimo).
- **BeyondCorp (Google, 2014+)** — implementação de referência de identity-aware proxy.
- **DoD Zero Trust Reference Architecture** (v2.0, 2022) — 91 capabilities agrupadas em 7 pilares (variante militar do CISA ZTMM).

---
*Fonte: `mukul975/Anthropic-Cybersecurity-Skills@673da1f` (Apache-2.0), cluster G18 — zero-trust
architecture (18 skills; representativas: `implementing-cisa-zero-trust-maturity-model`,
`implementing-zero-trust-network-access`, `configuring-microsegmentation-for-zero-trust`,
`implementing-device-posture-assessment-in-zero-trust`, `implementing-beyondcorp-zero-trust-access-model`,
`implementing-mtls-for-zero-trust-services`). Método extraído e reescrito em PT-BR; só a camada
defensiva/arquitetural; sem cópia literal.*
