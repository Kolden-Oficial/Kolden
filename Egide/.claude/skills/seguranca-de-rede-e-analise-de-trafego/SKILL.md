---
name: seguranca-de-rede-e-analise-de-trafego
description: >-
  Use quando a evidência estiver no FIO: analisar captura de pacotes (Wireshark),
  dados de fluxo (NetFlow/IPFIX) e logs de DNS para detectar C2, exfiltração,
  tunneling de DNS, canais cobertos, domínios DGA/typosquatting e tráfego de
  malware — ao vivo ou em PCAP pós-incidente. É o eixo de segurança de rede da
  Égide: detecção e investigação na camada de rede, complementar ao endpoint (host)
  e ao SOC (alerta). Defensiva: inspeção de tráfego em rede própria/autorizada, não
  interceptação ofensiva.
domain: ciberseguranca
subdomain: seguranca-de-rede
tags: [rede, pcap, wireshark, netflow, dns, exfiltracao, tunneling, c2, dga, covert-channel, beaconing]
---

# Segurança de Rede e Análise de Tráfego

> Defensiva. A rede vê o que o host esconde: mesmo malware fileless precisa falar com o C2 em algum
> momento. Análise de tráfego em rede própria ou com autorização — capturar tráfego alheio sem permissão
> é ilegal. Nunca reexecute payload extraído de um PCAP.

## Três lentes, uma camada
- **Pacote (PCAP / Wireshark / Scapy)** — profundidade total: payload, handshake, headers. Para a
  investigação fina de um fluxo suspeito.
- **Fluxo (NetFlow / IPFIX)** — volume e padrão sem payload: quem falou com quem, quanto, quando. Para
  achar a agulha em escala (beaconing, exfil por volume).
- **DNS** — o canal mais abusado e mais logado: resolução, tunneling, DGA, C2.

A escolha depende da pergunta: "este fluxo é malicioso?" → pacote; "onde está o anômalo na rede?" → fluxo;
"há tunneling/C2 por DNS?" → DNS.

## Detecção por categoria

### C2 e beaconing
- **Periodicidade**: conexões em intervalo regular (com jitter) a um destino raro = sinal clássico de
  beacon. Análise de frequência sobre NetFlow agrupado por par origem→destino.
- **Perfil de tráfego**: razão upload/download anômala, payloads de tamanho constante, user-agent/headers
  que não batem com a aplicação alegada (perfil malleable disfarçando HTTP). Cruze com a config extraída
  na `analise-estatica-de-malware`.

### Exfiltração
- **Por volume**: saída atípica de um host para destino externo (NetFlow), fora de baseline/horário.
- **Por canal coberto**: dado escondido em campos legítimos — TXT/subdomínio de DNS, ICMP, headers HTTP.

### Tunneling e abuso de DNS
- **Tunneling de DNS**: subdomínios longos/alta entropia, volume de query atípico por host, predomínio de
  TXT/NULL, mesmo domínio-base recebendo fluxo contínuo. Baseline de DNS normal é pré-requisito.
- **DGA**: domínios gerados algoritmicamente — alta entropia no nome, NXDOMAIN em rajada, baixa idade de
  registro. Passive DNS ajuda a historiar resolução.
- **Typosquatting**: domínios visualmente próximos de marcas legítimas (distância de edição) — phishing/C2.
- **DoH**: DNS sobre HTTPS evade o log de DNS clássico — observe destino a resolvers DoH conhecidos no fluxo.

### Tráfego de malware / canais cobertos
Protocolo não-padrão em porta padrão, TLS com certificado anômalo (auto-assinado, JA3 raro), ICMP com
payload, sequência que não casa o protocolo declarado.

## Workflow padrão
1. **Definir a pergunta** e escolher a lente (pacote/fluxo/DNS).
2. **Baseline**: o normal deste segmento (destinos, volumes, distribuição de DNS, horário).
3. **Filtrar e isolar**: no Wireshark/Scapy, reduzir ao fluxo de interesse; no NetFlow, agrupar por par e
   medir periodicidade/volume.
4. **Correlacionar**: cruzar com IOCs (CTI), com a config de C2 (análise de malware) e com o host
   (endpoint/EDR) — o fluxo aponta o processo culpado no host.
5. **Concluir + devolver detecção**: IOC de rede (IP/domínio/JA3/padrão) vira regra
   (`engenharia-de-deteccao-sigma-yara`) e alerta de SOC.

## Anti-falha
- Periodicidade legítima existe (update, telemetria, NTP, sync) — beaconing exige destino raro + contexto,
  não só regularidade.
- Sem baseline de DNS/fluxo, entropia e volume viram só ruído.
- IP de CDN/cloud compartilhado marcado como malicioso bloqueia serviço legítimo — valide com CTI antes de
  qualquer bloqueio cego (handoff `inteligencia-de-ameacas-cti`).
- PCAP carrega payload vivo: trate como amostra, não reexecute.

---
*Fonte adaptada (princípio, sem cópia literal): `mukul975/Anthropic-Cybersecurity-Skills@673da1f`
(skills `analyzing-network-traffic-with-wireshark`, `analyzing-network-flow-data-with-netflow`,
`analyzing-dns-logs-for-exfiltration`, `analyzing-network-covert-channels-in-malware`,
`analyzing-typosquatting-domains-with-dnstwist`, `analyzing-network-packets-with-scapy`) ·
Licença Apache-2.0. Reescrita em PT-BR para a Égide.*
