---
name: seguranca-ot-ics-scada
description: >-
  Use quando precisar avaliar ou defender ambientes de tecnologia operacional —
  OT/ICS/SCADA, CLPs, IHMs, historiadores e protocolos industriais (Modbus, DNP3,
  S7comm, OPC UA). Cobre baseline de comportamento determinístico, detecção de
  anomalias por protocolo, segmentação Purdue/IEC 62443 e varredura de
  vulnerabilidade SEM derrubar processo. Eixo de OT da Égide — defensivo: monitora
  e segmenta, nunca dá comando de escrita em planta viva.
domain: ciberseguranca
subdomain: ot-ics-security
tags: [ot, ics, scada, modbus, dnp3, iec62443, purdue, anomalia, segmentacao]
---

# Segurança de OT / ICS / SCADA

> Em OT, disponibilidade e segurança física vêm antes de confidencialidade. Nunca rode
> scanner de TI agressivo (perfis Nessus padrão) contra CLP legado — ele trava o
> controlador e pode parar uma linha de produção. Toda ação ativa exige janela de
> manutenção, perfil testado em laboratório e aprovação de operações. Sistemas
> instrumentados de segurança (SIS) jamais entram no escopo de teste ativo.

## O que é

A rede industrial é **determinística**: as mesmas estações conversam nos mesmos horários,
com as mesmas funções, em ciclos previsíveis. Essa previsibilidade é a maior alavanca de
defesa — desvio do normal é sinal. Esta habilidade dá o método para mapear esse normal,
detectar o anômalo e isolar zonas, sem nunca interferir no processo físico.

## Método

### 1. Baseline multidimensional (monitoramento passivo)
- Capture tráfego por **SPAN/TAP**, nunca por sonda ativa. Mínimo de 2-4 semanas, cobrindo
  trocas de turno, batelada e janelas de manutenção.
- Modele três dimensões: **temporização** (intervalo de polling), **comportamento de
  protocolo** (quais function codes, quais registradores) e **topologia** (quem fala com quem).
- Correlacione com dados do **historiador** (processo físico): um comando de rede que
  contradiz a física da planta é altíssima suspeita.

### 2. Detecção de anomalia por protocolo
- **Modbus/TCP (porta 502)**: valide function code contra allowlist, faixa de registrador
  autorizada, e cliente de origem. Comando de **escrita** (FC 5/6/15/16) inesperado pode
  alterar setpoint — é evento crítico. Cadeias de Markov modelam a sequência normal de
  transações.
- **DNP3 / S7comm / OPC UA**: mesma lógica — modele a gramática normal e alerte no malformado
  ou no não-autorizado. Use Zeek com analisador OT ou Suricata com regra de OT.
- Complemente IDS por assinatura com detecção comportamental; um não substitui o outro.

### 3. Segmentação Purdue / IEC 62443
- Desenhe **zonas e condutos** a partir do baseline de tráfego (preserva todo caminho legítimo).
- Aplique o **Modelo Purdue**: separe TI de OT por uma DMZ industrial; isole SIS do controle
  básico de processo (BPCS).
- Use firewall OT-aware com DPI de protocolo industrial e allowlist de function code; migre de
  rede plana para segmentada **sem parar operação** (plano de rollback aprovado).

### 4. Vulnerabilidade e ativos com segurança
- Inventário de ativos primeiro — descoberta **passiva** (Claroty/Nozomi/Dragos) classificando
  por nível Purdue.
- Detecção passiva de vulnerabilidade não envia pacote ao dispositivo. Varredura ativa só com
  plataforma OT-safe (Tenable OT), perfil validado em lab e janela aprovada.
- Para o que não dá para corrigir (CLP legado sem patch), documente **controles compensatórios**
  (segmentação, monitoramento) — eles são a defesa real.

## Entrega
Pacote OT: baseline determinístico + regras de anomalia por protocolo + desenho de zonas/condutos
IEC 62443 + relatório de vulnerabilidade com priorização por risco de processo. Handoff: resposta
a incidente OT → omar-santos; detecção contínua → chris-sanders.

## Incremental (não nesta leva)
Forense de firmware de CLP (`performing-plc-firmware-security-analysis`), implementações específicas
de fornecedor (Dragos/Nozomi/Claroty/Tofino) e playbook de IR-OT completo ficam adiados — ver
relatório de perda.

## Herança histórica

**Robert M. Lee** — cofundador da **Dragos** (2016); ex-analista de ICS/SCADA da USAF e NSA. Autor do curso SANS ICS515 (*ICS Active Defense and Incident Response*) e do *ICS Cyber Kill Chain* (SANS Whitepaper, 2015, com Michael Assante e Tim Conway). Referência viva em resposta a incidente OT.

**Michael Assante** (1968-2021) — Chief Security Officer da NERC (2007-2010); cocriou a visão moderna de defesa de infraestrutura crítica; cofundador da SANS ICS academy. Sua doutrina "safety > availability > security > confidentiality" reordena as prioridades para OT.

**Joe Weiss** — autor de *Protecting Industrial Control Systems from Electronic Threats* (2010, Momentum Press); consultor histórico e voz pública desde a Aurora Generator Test (2007); mantém o `controlglobal.com/unfettered/`.

**Theodore J. Williams (1923-2013)** — arquiteto do **Purdue Enterprise Reference Architecture (Purdue Model, 1990)** na Purdue University; base histórica dos níveis 0-5 usados na seção 3.

**ISA/IEC 62443 committee (ISA99)** — família de padrões internacionais para segurança de sistemas de automação industrial (partes 3-2, 3-3, 4-2 são as mais aplicadas); origem do vocabulário "zonas e condutos".

**Frameworks canônicos herdados**:
- **Modelo Purdue (Theodore Williams, 1990)** — níveis 0-5.
- **ISA/IEC 62443** — segurança de IACS (Industrial Automation and Control Systems).
- **ICS Cyber Kill Chain** (Lee/Assante/Conway, SANS 2015) — 2 estágios (Cyber Intrusion + ICS Attack).
- **NIST SP 800-82 rev.3 (2023) — Guide to Operational Technology Security**.
- **MITRE ATT&CK for ICS (2020+)** — tática/técnica específica para ambiente industrial.
- **Regra de ouro Assante**: safety > availability > integrity > confidentiality (inverso da CIA de TI).

---
*Fonte: `mukul975/Anthropic-Cybersecurity-Skills@673da1f3` (Apache-2.0), cluster G12 — ot-ics-security
(`detecting-anomalies-in-industrial-control-systems`, `detecting-modbus-protocol-anomalies`,
`implementing-network-segmentation-for-ot`, `performing-ot-vulnerability-scanning-safely` e correlatos).
Método reescrito em PT-BR; scripts dual-use não absorvidos; sem cópia literal.*
