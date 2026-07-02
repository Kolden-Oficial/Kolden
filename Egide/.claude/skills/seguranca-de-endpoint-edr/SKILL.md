---
name: seguranca-de-endpoint-edr
description: >-
  Use quando o foco for o ENDPOINT — configurar a telemetria que torna o host
  observável (Sysmon, PowerShell Script Block Logging, AMSI, auditd, osquery),
  detectar persistência (autoruns, tarefas agendadas, serviços, run keys,
  cron/systemd, WMI), caçar ataques fileless/living-off-the-land (PowerShell em
  memória, injeção reflexiva de DLL, abuso de WMI), e operar/avaliar um agente EDR
  (CrowdStrike/MDE/SentinelOne) na detecção de evasão. É o eixo de segurança de
  endpoint/EDR da Égide. Defensiva: instrumentação, baseline e detecção no host —
  não a exploração dele.
domain: ciberseguranca
subdomain: seguranca-de-endpoint
tags: [endpoint, edr, sysmon, persistencia, fileless, autoruns, osquery, amsi, lolbin, telemetria]
---

# Segurança de Endpoint e EDR

> Defensiva. O endpoint é onde o ataque toca o chão — e onde a telemetria certa transforma "não vi nada"
> em detecção. Antivírus tradicional não pega fileless; a resposta é **instrumentar o host** e detectar
> comportamento, não assinatura. Tudo aqui é em ativo próprio ou autorizado.

## Premissa: sem telemetria, não há detecção

A maior parte das cegueiras de endpoint é falta de log, não falta de regra. Antes de caçar, garanta a
superfície de coleta:

| Telemetria | O que habilita ver |
|---|---|
| **Sysmon** | criação de processo + linha de comando, conexão de rede por processo, criação de imagem, evento de WMI, alteração de registro |
| **PowerShell Script Block Logging + Module Logging** | conteúdo real do script (mesmo ofuscado, desofuscado em parte) |
| **AMSI** | inspeção de script/conteúdo em runtime (pega payload em memória) |
| **auditd (Linux)** | execve, acesso a arquivo sensível, mudança de privilégio |
| **osquery** | estado do host como tabela SQL (processos, autoruns, usuários, sockets) — para baseline e hunt em frota |
| **EDR (MDE/CrowdStrike/S1)** | telemetria comportamental + advanced hunting (KQL) |

## Detecção de persistência (mapa por SO)
Procure o mecanismo, não o binário do dia. ATT&CK TA0003.
- **Windows**: run keys, tarefas agendadas (Sysmon Event 1 + linha de comando), serviços novos, WMI event
  subscription (consumer/filter), DLL search-order hijack, startup folder, IFEO.
- **Linux**: cron/`/etc/cron*`, unidades systemd, `.bashrc`/profile, `LD_PRELOAD`, módulos de kernel.
Baseline primeiro: o que é persistência legítima *deste* host? Diferença contra baseline = candidato.

## Caça a fileless / living-off-the-land
Ataque que roda só em RAM, sem arquivo em disco — evade AV clássico. Sinais:
- **PowerShell anômalo**: `-enc`/`-EncodedCommand`, `IEX`, `DownloadString`, `-WindowStyle Hidden`,
  comprimento/entropia altos no script block. Cruze com AMSI.
- **Injeção reflexiva**: processo legítimo alocando memória executável e criando thread remota (Sysmon +
  EDR comportamental).
- **Abuso de WMI**: `wmic` / subscription como execução e persistência.
- **LOLBins**: `certutil`, `mshta`, `rundll32`, `regsvr32`, `bitsadmin` usados para baixar/executar —
  detecte pela combinação binário-legítimo + argumento-suspeito + processo-pai incomum.

## Avaliar/operar o EDR
- Confirme **cobertura de telemetria** (o agente está reportando os eventos que a detecção precisa?).
- Teste **detecção de evasão**: o EDR pega tampering do próprio agente, unhooking, parada de serviço?
- Use o advanced hunting (KQL/queries) para validar hipóteses de `caca-a-ameacas-orientada-a-hipotese`.
- Lacunas de telemetria viram requisito para a `engenharia-de-deteccao-sigma-yara`.

## Workflow padrão
1. **Instrumentar**: habilitar Sysmon + PowerShell logging + AMSI (+ auditd/osquery no Linux).
2. **Baseline**: capturar o normal do host/frota (processos, autoruns, conexões).
3. **Detectar/caçar**: rodar detecção de persistência + fileless contra a telemetria.
4. **Validar**: separar verdadeiro positivo de admin legítimo (script de deploy, RMM autorizado).
5. **Fechar o loop**: lacuna de detecção → regra nova; lacuna de telemetria → mais instrumentação.

## Anti-falha
- "AV não acusou nada" ≠ host limpo (fileless); confie em comportamento, não em assinatura.
- LOLBin é legítimo por padrão — detecte pelo **contexto** (pai, argumento, host), não pelo nome só.
- Detecção sem baseline gera enxurrada de FP de administração legítima.

## Herança histórica

**Mark Russinovich** — cofundador da Sysinternals (adquirida pela Microsoft em 2006, hoje CTO do Azure); criador de **Sysmon** (2014+), **Autoruns**, **Process Explorer** e **PsTools**. A telemetria de host moderna é essencialmente o que Sysinternals codificou.

**Alex Ionescu** — coautor de *Windows Internals* (7ª ed., 2017-2022, Microsoft Press, com Russinovich, David Solomon e Andrea Allievi); referência mundial em internals de kernel Windows, base doutrinal para caça a fileless/injeção reflexiva.

**Halvar Flake (Thomas Dullien)** — pesquisador que codificou boa parte do vocabulário de análise binária moderna (BinNavi, BinDiff, hoje em `optimyze.dev`); ancestral doutrinal do reversing usado em análise de fileless.

**Osquery team (Facebook Security, 2014)** — cocriaram o modelo "estado do host como tabela SQL"; hoje na Linux Foundation (osquery.io). Base do bloco osquery da matriz de telemetria.

**MITRE ATT&CK team** — a taxonomia TA0002 (Execution), TA0003 (Persistence), TA0005 (Defense Evasion) e a subtécnica T1059.001 (PowerShell) estruturam o mapa de persistência e o catálogo de fileless.

**Frameworks canônicos herdados**:
- **Sysmon** (Russinovich, 2014+) — telemetria de host padrão.
- **MITRE ATT&CK — TA0003 Persistence** — mecanismos catalogados por SO.
- **LOLBAS Project** (Living Off The Land Binaries And Scripts, `lolbas-project.github.io`) — catálogo aberto de binários Windows abusáveis.
- **GTFOBins** (`gtfobins.github.io`) — equivalente Unix/Linux para LOLBAS.
- **Osquery + Fleet** — inventário e caça em frota.
- **AMSI** (Antimalware Scan Interface, Microsoft, Windows 10+) — inspeção de conteúdo em runtime.

---
*Fonte adaptada (princípio, sem cópia literal): `mukul975/Anthropic-Cybersecurity-Skills@673da1f`
(skills `detecting-fileless-attacks-on-endpoints`, `analyzing-malware-persistence-with-autoruns`,
`analyzing-persistence-mechanisms-in-linux`, `detecting-malicious-scheduled-tasks-with-sysmon`,
`deploying-osquery-for-endpoint-monitoring`, `deploying-edr-agent-with-crowdstrike`,
`detecting-evasion-techniques-in-endpoint-logs`) · Licença Apache-2.0. Reescrita em PT-BR para a Égide.*
