---
name: inteligencia-de-ameacas-cti
description: >-
  Use quando precisar triar indicadores de comprometimento (IOC: URL, IP, hash,
  domínio), enriquecer artefatos observados, atribuir uma campanha a um ator/APT,
  ou estruturar inteligência de ameaça contra um framework (MITRE ATT&CK/Navigator,
  kill chain, modelo diamante). Eixo de CTI/threat-intel da Égide — alimenta o
  blue-team (chris-sanders) e a resposta a incidente (omar-santos). Defensiva:
  enriquecimento + julgamento de analista, nunca bloqueio cego.
domain: ciberseguranca
subdomain: cyber-threat-intelligence
tags: [cti, threat-intel, ioc, atribuicao, mitre-attack, killchain, diamond-model, stix]
tipo: skill
area: Egide
up: "[[Egide/_MOC-egide]]"
---

# Inteligência de Ameaças (CTI)

> Não use esta habilidade isoladamente para decisões de bloqueio de alto risco — sempre combine
> enriquecimento automatizado com julgamento de analista, especialmente para infraestrutura
> compartilhada (CDNs, provedores de nuvem). Um IP de CDN marcado como malicioso bloqueia meio
> mundo.

## O que é

CTI transforma artefatos brutos (um IP num alerta, um hash num e-mail de phishing) em
**conhecimento acionável sobre o adversário**: quem é, o que faz, com que confiança. A Égide hoje
tem o lado ofensivo e o blue-team, mas não tinha um eixo formal de inteligência. Esta habilidade
fornece o método; mapeia tudo a ATT&CK e aos modelos canônicos de análise.

## Método

### 1. Triagem e pontuação de confiança de IOC
Para cada indicador (URL / IP / hash / domínio):
- Enriquecer em múltiplas fontes de reputação (multi-AV + sandbox; reputação de IP; cross-ref
  contra plataforma de inteligência / MISP/TIP). Ferramentas de referência: VirusTotal, AbuseIPDB,
  MISP.
- **Pontuar a confiança**, não só "malicioso/limpo": idade do indicador, número de fontes
  concordantes, se é infra compartilhada, contexto do alerta.
- Só então alimentar controles de bloqueio — com o score, não com o booleano cru.
- Mapear a técnica observada a ATT&CK (ex.: T1071 C2 sobre protocolo de aplicação, T1105 transfer
  de tool, T1041/T1567 exfiltração).

### 2. Atribuição de campanha
- Agrupar indicadores por **infraestrutura, TTPs e timing**, não por um único IOC.
- Cruzar contra catálogos de ator/campanha (Malpedia, ATT&CK Groups) — hipótese de atribuição com
  nível de confiança explícito (possível / provável / confirmado).
- Atribuição é probabilística: nomeie o grau de incerteza. Falsa-bandeira existe.

### 3. Estruturar com frameworks
- **MITRE ATT&CK + Navigator** — mapear as técnicas observadas numa camada (`layer.json`) para
  visualizar cobertura e lacunas de detecção.
- **Kill chain** — posicionar cada artefato na fase (recon → weaponization → delivery →
  exploitation → installation → C2 → actions on objectives).
- **Modelo diamante** — relacionar adversário / capacidade / infraestrutura / vítima; cada vértice
  novo é um pivô de investigação.
- Padronizar a saída em **STIX** quando for compartilhar com terceiros/feeds.

### STIX 2.1 + Diamond Model + clustering de infraestrutura

> _Seção absorvida de github.com/msitarzewski/agency-agents@a597cb6 (G35, MIT)._

CTI sem formato canônico vira prosa não-acionável. STIX 2.1 + TAXII + Diamond Model dão estrutura compartilhável e pivotável.

#### STIX 2.1 (Structured Threat Information Expression)

**O que é:** padrão OASIS para representar CTI estruturada. JSON-LD com objetos tipados e relacionamentos.

**Objetos SDO (Domain Objects) principais:**
- `indicator` — IoC com pattern matchable (file hash, domain, IP, URL)
- `malware` — família de malware
- `threat-actor` — adversário (grupo)
- `intrusion-set` — campanha agrupada por TTPs
- `campaign` — operação coordenada
- `attack-pattern` — TTP (geralmente MITRE ATT&CK ID)
- `tool` — ferramenta de attacker
- `vulnerability` — CVE
- `identity` — vítima, organização
- `infrastructure` — recursos do adversário (C2 server, domínio, IP)
- `observed-data` — telemetria bruta observada
- `report` — coletânea de SDOs com contexto

**Objetos SRO (Relationship Objects):**
- `relationship` — liga 2 SDOs (ex.: `indicator` `indicates` `malware`)
- `sighting` — observação de SDO no ambiente

**Padrão STIX (em `indicator.pattern`):**
```
[file:hashes.SHA-256 = 'abc123...']
[domain-name:value = 'evil.com']
[ipv4-addr:value = '1.2.3.4'] AND [network-traffic:dst_port = 443]
```

**Por que importa:**
- TAXII (transporte) consome/produz STIX — interoperabilidade entre TIPs (Threat Intelligence Platforms)
- MISP exporta STIX 2.1
- OpenCTI usa STIX nativamente
- Vendor feeds (Anomali, Recorded Future, CrowdStrike Falcon Intel) — todos STIX

**Anti-padrões:**
- IoC list em CSV sem TTPs/atribuição = inteligência fraca
- STIX gerado sem `created_by_ref` (perde proveniência)
- Reuso de UUID (cada object STIX é imutável + tem UUID v4 único)

#### Diamond Model of Intrusion Analysis

**4 vértices:**
- **Adversary** (quem ataca)
- **Capability** (com o quê — malware, ferramenta, exploit)
- **Infrastructure** (de onde — C2 IP, domain, hosting)
- **Victim** (alvo)

**Conexões (axiomas):**
- "For every intrusion event, there exists an adversary using a capability over an infrastructure against a victim"
- Pivoting: descoberta de 1 vértice abre os outros 3
- Confidence levels por vértice (high/medium/low)

**Como usar:**
- Cada incidente vira um diamante
- Múltiplos diamantes ligados por arestas comuns = mesma campanha
- Pivots típicos: passive DNS (infrastructure → infrastructure histórica), VirusTotal pivots (capability → infrastructure)

#### Kill Chain (Lockheed Martin) e Unified Kill Chain

**7 fases Lockheed:**
1. Reconnaissance
2. Weaponization
3. Delivery
4. Exploitation
5. Installation
6. Command & Control
7. Actions on Objectives

**Por que usar:** Mapeia detecção/resposta por fase — defesa em profundidade. Interromper na fase 6 (C2) ainda salva dado.

**Unified Kill Chain (Pols, 2017):** 18 fases incluindo pivoting/lateral movement (mais granular que Lockheed). Útil para análise pós-incidente.

#### Clustering de infraestrutura

**Objetivo:** ligar IPs/domínios/certificados de uma campanha por co-ocorrência ou similaridade.

**Sinais para clustering:**

**Passive DNS (pDNS):**
- Domains resolvendo para mesmo IP em janela temporal próxima
- Domains com mesmo registrar + criação no mesmo dia
- Domains com WHOIS overlap (mesmo email/phone/org, antes de privacy)

**Certificate Transparency (CT):**
- TLS certs emitidos para sub-domains de mesma raiz
- Self-signed certs com mesmo CN/SAN entre IPs aparentemente não relacionados
- crt.sh + Censys para pivots

**Network fingerprinting:**
- JARM hashes (TLS server fingerprint) idênticos entre IPs = mesma stack
- SSH banner + version + algorithms — Shodan/Censys
- HTTP headers + favicon hash + technology stack (Wappalyzer-style)

**Hosting/ASN clustering:**
- ASN ou hosting provider comum + janela de tempo
- BulletProof Hosting providers conhecidos (PQ.Hosting, Selectel, certos AS rotineiramente abusados)

**Ferramentas de clustering (defensivo):**
- **MISP** — TIP open-source, eventos com tags, sharing communities
- **OpenCTI** — knowledge graph STIX nativo
- **Maltego** — visual link analysis
- **VirusTotal Graph** — pivots em hashes/domains/IPs
- **Shodan/Censys** — fingerprints de internet pública
- **PassiveTotal/RiskIQ** (agora Microsoft) — pDNS + WHOIS history
- **Cisco Umbrella** — pDNS + domain reputation

**Anti-padrões:**
- Clustering por IP único sem corroboração (IP rotativo = atribuição fraca)
- Atribuir a grupo sem ≥3 vetores independentes (TTPs + infra + capability)
- Confiar em WHOIS pós-2018 (privacy mascarou maioria)
- Ignorar JARM/JA3/JA4 (network-level fingerprints são robustos)

### Workflow integrado (CTI maduro)

1. **Ingest** — feeds (STIX/TAXII), incident reports, OSINT, telemetry
2. **Triage** — relevância para a organização (matched IoCs, mesmo setor)
3. **Pivot** — Diamond Model: dado 1 vértice, busca os outros 3
4. **Cluster** — agrupa em campanhas/intrusion-set
5. **Atribuição** — opcional; 90% das vezes "TA-XXXX" interno é suficiente
6. **Disseminar** — STIX/TAXII para SOC + EDR/SIEM rules (Sigma + YARA)
7. **Loop** — feedback de SOC enriquece CTI

## Entrega
Um pacote de inteligência: indicadores com score de confiança + mapeamento ATT&CK + hipótese de
atribuição (com grau) + recomendações de detecção priorizadas. Handoff natural: detecção →
chris-sanders (blue-team), contenção → omar-santos (IR).

## Incremental (não nesta leva)
Threat hunting orientado a hipótese com Sigma/baselining (cluster G2) e detection engineering /
autoria de regras (G27) ficam adiados — ver relatório de perda.

## Herança histórica

**Sergio Caltagirone, Andrew Pendergast e Christopher Betz** — autores do **Diamond Model of Intrusion Analysis** (2013, Center for Cyber Intelligence Analysis and Threat Research), o modelo canônico de 4 vértices (adversário, capacidade, infraestrutura, vítima) que estrutura pivoting de CTI. Referência: paper `The Diamond Model of Intrusion Analysis` (CCIATR-2013).

**Eric M. Hutchins, Michael J. Cloppert e Rohan M. Amin (Lockheed Martin)** — autores de *Intelligence-Driven Computer Network Defense Informed by Analysis of Adversary Campaigns and Intrusion Kill Chains* (2011), que formalizou a **Cyber Kill Chain** de 7 fases.

**MITRE ATT&CK team** — a base de conhecimento de táticas, técnicas e procedimentos (TTP) publicada pela MITRE desde 2013; STIX/TAXII (OASIS) padronizados desde 2013+ (STIX 2.1 finalizado em 2021).

**Frameworks canônicos herdados**:
- **Diamond Model** (Caltagirone et al., 2013) — cada intrusão = 1 diamante; múltiplos diamantes com aresta comum = 1 campanha.
- **Cyber Kill Chain** (Lockheed Martin, 2011) e **Unified Kill Chain** (Pols, 2017, 18 fases).
- **STIX 2.1 + TAXII** (OASIS) — formato de troca; SDO/SRO como grafo compartilhável de inteligência.
- **Modelo Admiralty** (NATO STANAG 2511) — pontuação de fonte e informação (A–F × 1–6), origem da regra "pontue confiança, não booleano".

---
*Fonte: `mukul975/Anthropic-Cybersecurity-Skills@673da1f3` (Apache-2.0), cluster G3
(`analyzing-indicators-of-compromise` e correlatos: IOC, atribuição, Navigator, Malpedia, kill
chain, diamond model). Método reescrito em PT-BR; sem cópia literal.*
