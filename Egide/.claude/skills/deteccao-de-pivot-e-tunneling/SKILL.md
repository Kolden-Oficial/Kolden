---
name: deteccao-de-pivot-e-tunneling
description: >-
  Use quando precisar detectar movimento lateral, pivoting ou tunneling
  (SSH reverso, HTTP/HTTPS via Chisel/Pivotnacci, DNS tunneling com dnscat2/iodine,
  ICMP covert channel, abuso de Ngrok/Cloudflare Tunnel) em logs de rede, NetFlow,
  IDS, EDR ou DNS — e quando precisar BLOQUEAR esse tráfego em egress filter, proxy
  ou RPZ. Cobre engenharia de regras (Sigma, Splunk SPL, Sentinel KQL), resposta de
  contenção sem técnica ofensiva, hardening preventivo (egress allow-list, DNS sinkholing,
  ZTNA, microsegmentação) e mapeamento ATT&CK (T1572/T1071/T1090). DEFENSIVA APENAS —
  veto ofensivo da Égide preservado. Se mencionar uma ferramenta atacante, é para
  descrever o IoC que ela deixa, NUNCA para ensinar a usá-la.
domain: ciberseguranca
subdomain: threat-detection
tags: [defensive-only, threat-detection, pivoting, tunneling, lateral-movement, c2, dns-tunneling, egress, sigma, attack-t1572, attack-t1071, attack-t1090, zero-trust]
---

# Detecção de Pivot e Tunneling

> Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT © 2025 AgentLand Contributors)
> **DEFENSIVA APENAS** — veto ofensivo da Égide preservado.

> O atacante já está dentro de A e quer chegar em B. Esta habilidade ensina a ENXERGAR esse
> salto — em rede, em host, em DNS — e a fechar a porta. Não ensina a abrir a porta. Quando
> um nome de ferramenta atacante aparece aqui (Chisel, dnscat2, ligolo, Ngrok mal-usado), é
> exclusivamente para descrever o **rastro** que ela deixa, nunca o **uso**.

## A linha que não se cruza

A Égide tem veto ético explícito contra técnicas ofensivas de pivoting. Esta skill cobre:

- **Detecção** — padrões em logs, EDR, NetFlow, IDS, DNS.
- **Bloqueio** — egress filter, proxy, DNS RPZ/sinkhole.
- **IoCs e comportamentos** — o que olhar e por quê.

E **NÃO cobre**, sob nenhuma reescrita criativa do pedido:

- Comandos, flags ou exemplos de uso de `chisel`, `ssh -R`, `socat`, `ligolo-ng`, `dnscat2`,
  `iodine`, `ptunnel`, `pivotnacci`, `SocksOverRDP`.
- Payloads, ofuscação, técnicas de evasão de detecção.
- Tunneling "para teste em ambiente próprio" — não é o jurisdição desta skill.

Se o pedido derivar para ofensiva, pare e devolva ao orquestrador da Égide com o motivo.

## Modelo mental: o que é pivoting do ponto de vista defensivo

Ator estabelece foothold em A (host comprometido, alcançável da rede dele) e usa A como
**ponte** para alcançar B (que ele não conseguiria atacar diretamente — está em VLAN interna,
atrás de NAT, sem rota pública). Pivot pode ser:

| Veículo | Forma do salto | Pista defensiva dominante |
|---|---|---|
| **SSH reverso** | A inicia conexão pra fora; atacante volta pelo túnel | sessão TCP longa, baixo throughput, sshd como pai de processo improvável |
| **HTTP/HTTPS tunneling** | tráfego encapsulado em web "normal" (Chisel, Pivotnacci, SocksOverRDP) | sessão muito longa pra porta 443, JA3/SNI fora do baseline da app, binário não-assinado escutando porta |
| **DNS tunneling** | dados em queries/respostas DNS (dnscat2, iodine) — C2 e exfil | queries grandes, TXT/NULL volumosas, entropia alta de subdomínio, volume por host |
| **ICMP tunneling** | payload em ICMP echo (ptunnel) | ICMP echo com payload acima do esperado, ICMP outbound de host que não é monitor de rede |
| **VPN/tunnel-as-a-service mal-usado** | Ngrok, Cloudflare Tunnel, Tailscale fora de política | conexão a `*.ngrok.io`, `*.trycloudflare.com`, `*.ts.net` de host que não deveria |

A pergunta defensiva é sempre a mesma: **"essa máquina precisa fazer isso?"** Se não precisa,
o pivot é candidato — investigar antes de declarar.

## Sinais de detecção por camada

### Camada de rede (NetFlow, IDS, proxy)

- **Conexões longas e magras** — sessão TCP de horas com baixo throughput médio constante (hora-em-hora). Padrão clássico de túnel idle aguardando comando.
- **Beaconing** — conexões periódicas (jitter baixo) a destino raro. Cruza com a skill `caca-a-ameacas-orientada-a-hipotese` (analítica de frequência).
- **DNS anômalo** — query length acima do baseline, alto volume de TXT/NULL, alta entropia em subdomínios, ratio query/response distorcido.
- **ICMP com payload** — echo request com `data length` muito maior que o ping padrão do OS de origem.
- **Portas conhecidas de C2/proxy** — sinal fraco isolado (atacantes mudam de porta). **Padrão > porta**: combine com SNI/JA3, destino e duração.
- **Egress fora de baseline** — tráfego para `*.ngrok.io`, `*.trycloudflare.com`, `*.serveo.net`, `*.ts.net`, IPs de cloud residencial, ASNs de hosting barato saindo de servidor que só deveria falar com a app interna.

### Camada de host (EDR, Sysmon)

- **Processo de SSH/proxy spawnado por usuário não-admin** ou por conta de serviço que não tem motivo (e.g., conta do app web rodando `ssh -R`).
- **Binário sem assinatura escutando porta TCP** — Sysmon EventID 3 (network connect) com flag de listen, ou EventID 5/22 dependendo da config. Sob processo desconhecido = candidato.
- **Process tree anômala** — exemplos vistos em produção: `w3wp.exe` → `cmd.exe` → `powershell.exe` → binário escutando; `winword.exe` → script → conexão out; navegador como pai de processo de tunneling.
- **Loopback que cruza para WAN** — processo escuta em `127.0.0.1:porta` e outro processo no mesmo host repassa para fora. Pode ser legítimo (dev), pode ser pivot interno.
- **Drivers/serviços novos** com nomes genéricos ("UpdaterSvc", "NetMon") instalados fora de janela de manutenção.

### Camada de DNS

- **Entropia alta de subdomínio** — `a7f3k.b9x2.c4m1.dominio.tld` saindo em volume = dnscat2/iodine clássico.
- **Queries TXT/NULL grandes** — TXT raramente é grande em uso legítimo (SPF/DKIM são fixos); NULL praticamente não tem uso benigno.
- **Domain age + volume** — domínio registrado nas últimas 72h recebendo alto volume de um host interno é altamente suspeito.
- **NXDOMAIN em rajada** seguido de resposta — padrão de algoritmos DGA.

## Engenharia de regras de detecção

A regra crua abaixo é **pseudo-código defensivo** — não é cópia de regra Sigma pronta, é o
esqueleto da lógica. O engenheiro de detecção adapta ao SIEM real e testa antes de promover.

### Sigma (esqueleto): SSH reverso anômalo via spawn + listen

```yaml
title: Possivel SSH Reverse Tunnel - spawn anomalo + listen
status: experimental
description: >
  SSH client spawnado por processo improvavel e em seguida atividade de listen
  em porta nao-padrao no mesmo host, dentro de janela curta.
logsource:
  product: windows
  category: process_creation
detection:
  ssh_spawn:
    Image|endswith: '\ssh.exe'
    ParentImage|endswith:
      - '\powershell.exe'
      - '\cmd.exe'
      - '\wscript.exe'
      - '\mshta.exe'
  condition: ssh_spawn
falsepositives:
  - Administradores que automatizam SSH via scripts (exigir lista de exceção).
level: medium
tags: [attack.command_and_control, attack.t1572, attack.lateral_movement]
```

### Splunk SPL (esqueleto): sessão TCP longa com baixo throughput

```spl
index=netflow earliest=-24h
| stats min(_time) as start max(_time) as end sum(bytes) as total_bytes by src_ip dest_ip dest_port
| eval duration_min = (end - start) / 60
| eval bps = total_bytes / (duration_min * 60)
| where duration_min > 120 AND bps < 1024
| where dest_port IN (443, 80, 8080, 22)
| `excluir_baseline_legitimo(src_ip,dest_ip,dest_port)`
| sort - duration_min
```

A macro `excluir_baseline_legitimo` é onde mora a sanidade: backup, SaaS, monitoração têm
sessões longas legítimas e precisam ser removidos antes de o analista ver alerta.

### Sentinel KQL (esqueleto): DNS query length acima do baseline

```kql
let janela = 24h;
let baseline = DnsEvents
  | where TimeGenerated > ago(7d) and TimeGenerated < ago(janela)
  | summarize p95_len = percentile(strlen(Name), 95) by ClientIP;
DnsEvents
| where TimeGenerated > ago(janela)
| extend query_len = strlen(Name)
| join kind=inner baseline on ClientIP
| where query_len > p95_len * 2 and query_len > 60
| summarize cnt = count(), max_len = max(query_len), exemplos = make_set(Name, 5)
            by ClientIP
| where cnt > 50
| sort by cnt desc
```

Threshold absoluto (`> 60`) e razão (`> 2x p95`) juntos cortam falso positivo de CDN com
nomes longos legítimos.

### Sysmon EventID 3 + listen: binário desconhecido escutando

A regra é cruzar: processo com hash desconhecido (não está no allow-list de software) gerou
EventID 3 com `Initiated=false` (escuta) em porta alta dentro da janela em que apareceu pela
primeira vez no host. Em ambiente maduro, isso vira hipótese de caça.

## Resposta (sem técnica ofensiva)

Quando a detecção sobe, o playbook defensivo é:

1. **Isolar o host** via EDR (network containment) — corta o pivot e congela o estado para
   forensics. Não desligue (mata RAM volátil).
2. **Captura volátil** — memória, lista de processos, conexões ativas, handles abertos,
   serviços, scheduled tasks, autoruns. Snapshot de disco se possível.
3. **Hunt cross-host** — pegue os IoCs do incidente (hash, domínio C2, IP, JA3, padrão de URI)
   e procure nos outros hosts da frota. Pivot raramente é solo.
4. **Bloqueio em profundidade** — egress proxy bloqueia o domínio/IP, DNS RPZ sinkhola o
   domínio, firewall corta o IP, EDR adiciona o hash à blocklist.
5. **Lições viram detecção** — fechou o incidente, devolva regra nova para
   `engenharia-de-deteccao-sigma-yara` (handoff). Caça que não vira regra foi desperdício.

Operações **fora** desta skill: hack-back, scan ofensivo do C2, qualquer tentativa de "entrar
de volta" no atacante. Veto.

## Hardening preventivo (não-ofensivo)

A detecção que mais vale é a que não precisa disparar porque o canal não existe.

- **Egress filtering com deny default + allow-list** num proxy explícito. A maioria dos hosts
  internos não tem motivo de falar com a internet aberta — só com a app, com update server
  específico, com SaaS aprovado. Isso sozinho mata a maioria dos túneis genéricos.
- **DNS controlado + RPZ + sinkholing** — todo DNS interno passa por resolver corporativo;
  RPZ bloqueia domínios newly-registered, ngrok-like, dynamic DNS. Host não-corporativo (BYOD)
  fica em VLAN isolada.
- **ZTNA substituindo VPN aberta** — VPN full-tunnel é convite a pivot. Zero Trust Network
  Access dá acesso por aplicação, não por rede.
- **Segmentação e microsegmentação** — o salto de A para B só existe se há rota de A para B.
  Tier 0 (DC, AD) isolado de tier 1 (servidores) isolado de tier 2 (estações). Microsegmentação
  por workload em cloud.
- **Cloud egress controls** — VPC endpoints para serviços AWS (sem sair para internet), AWS
  Network Firewall com domain allow-list, security groups restritivos, NACLs simétricas.
- **Allow-list de software no endpoint** — binário não-assinado e desconhecido não deveria
  rodar; AppLocker / WDAC / EDR allow-list. Tunneling tools são binários desconhecidos.

## Frameworks de referência

- **MITRE ATT&CK** — Táticas: `Lateral Movement` (TA0008), `Command and Control` (TA0011).
- **Técnicas específicas**:
  - `T1572` — Protocol Tunneling (a técnica genérica de túnel).
  - `T1071` — Application Layer Protocol (`.001` Web, `.004` DNS, `.002` File Transfer).
  - `T1090` — Proxy (`.001` Internal, `.002` External, `.003` Multi-hop).
  - `T1090.004` — Domain Fronting.
  - `T1571` — Non-Standard Port.
- **NIST SP 800-53** — controles `SC-7` (Boundary Protection), `AC-4` (Information Flow
  Enforcement), `SI-4` (System Monitoring).
- **Cruzamentos com outras skills da Égide**:
  - `caca-a-ameacas-orientada-a-hipotese` para a analítica de beaconing/frequência.
  - `engenharia-de-deteccao-sigma-yara` para promover IoC de incidente em regra.
  - `arquitetura-zero-trust-zta` para o hardening preventivo.

## Anti-padrões defensivos

- **"Bloquear SSH outbound" sem mapear quem precisa** — DevOps real usa SSH para git, deploy,
  jumphost. Bloqueio cego quebra usuário legítimo, gera shadow IT e enfraquece adesão. Mapeie,
  permita por exceção justificada, audite.
- **Detecção de DNS tunneling só por assinatura de ferramenta** (e.g., só `dnscat2`-string) —
  atacante muda nome do binário em segundos. Olhe **comportamento** (entropia, tamanho, volume),
  não nome.
- **Regra Sigma sem teste em ambiente real antes de promover** — analista soterrado em FP para
  de ler alerta. Toda regra nova passa por janela de observação (silent mode), tuning e só
  então entra em produção.
- **Bloquear o domínio C2 e considerar encerrado** — atacante já está dentro; o domínio era um
  canal de tantos. Hunt cross-host e revise IoCs antes de declarar contido.
- **Confundir Ngrok/Tailscale legítimo de DevOps com pivot** — política primeiro (essa
  ferramenta é permitida nesse host?), detecção depois. Sem política, detecção é só ruído.
- **Egress allow-list "por IP"** — IPs de SaaS mudam. Faça por **domínio** num proxy que
  inspeciona SNI/Host header, não em firewall de camada 3 sozinho.

## Herança histórica

**MITRE ATT&CK team (Blake Strom e equipe)** — mantém desde 2013 a base pública onde as técnicas T1572 (Protocol Tunneling), T1071 (Application Layer Protocol) e T1090 (Proxy) vivem como vocabulário canônico. É o índice defensivo que a seção "Frameworks de referência" ancora.

**Rob Joyce (NSA TAO, hoje NSA Cybersecurity Director)** — em sua palestra *Disrupting Nation State Hackers* (USENIX Enigma 2016), documentou publicamente a mecânica de pivoting/lateral movement e defendeu o modelo de egress allow-list + segmentação como controle primário — base doutrinal do bloco de hardening preventivo.

**Chris Sanders** — autor de *Practical Packet Analysis* (3ª ed., 2017, No Starch) e de *Applied Network Security Monitoring* (2013, Syngress); codificou a análise por camada (NetFlow → PCAP → DNS) que sustenta a seção "Sinais de detecção".

**Frameworks canônicos herdados**:
- **MITRE ATT&CK — TA0008 (Lateral Movement)** e **TA0011 (Command and Control)** — táticas cobertas.
- **NIST SP 800-53** — controles SC-7 (Boundary Protection), AC-4 (Information Flow Enforcement), SI-4 (System Monitoring).
- **NIST SP 800-207 (Zero Trust Architecture, 2020)** — base do "ZTNA substituindo VPN aberta".
- **Purdue Model / IEC 62443** — segmentação tier 0/1/2 (para OT/ICS; se aplica análogo em TI).
- **CIS Controls v8** — Control 12 (Network Infrastructure Management) e Control 13 (Network Monitoring and Defense).

---

*Fonte adaptada (princípio defensivo, sem cópia literal nem técnica ofensiva):
`msitarzewski/agency-agents@a597cb6` ID G25 · Licença MIT © 2025 AgentLand Contributors.
Reescrita em PT-BR para a Égide, sob o veto ofensivo do squad.*
