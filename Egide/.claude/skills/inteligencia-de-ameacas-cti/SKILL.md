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

## Entrega
Um pacote de inteligência: indicadores com score de confiança + mapeamento ATT&CK + hipótese de
atribuição (com grau) + recomendações de detecção priorizadas. Handoff natural: detecção →
chris-sanders (blue-team), contenção → omar-santos (IR).

## Incremental (não nesta leva)
Threat hunting orientado a hipótese com Sigma/baselining (cluster G2) e detection engineering /
autoria de regras (G27) ficam adiados — ver relatório de perda.

---
*Fonte: `mukul975/Anthropic-Cybersecurity-Skills@673da1f3` (Apache-2.0), cluster G3
(`analyzing-indicators-of-compromise` e correlatos: IOC, atribuição, Navigator, Malpedia, kill
chain, diamond model). Método reescrito em PT-BR; sem cópia literal.*
