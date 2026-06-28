---
name: forense-digital-e-resposta-a-incidente
description: >-
  Use quando houver um incidente para conduzir (contenção → erradicação →
  recuperação) ou quando precisar de forense digital: análise de dump de memória
  (malware fileless, injeção de processo, chaves em RAM), forense de disco/MFT,
  artefatos de execução (LNK/jumplist/browser), e montagem de timeline. Eixo DFIR
  da Égide — profundidade que o squad não tinha. Defensiva: análise de sistemas
  que se possui ou se tem autorização para investigar.
domain: ciberseguranca
subdomain: dfir
tags: [dfir, forense, volatility, memoria, disco, mft, incident-response, playbook, timeline]
---

# Forense Digital e Resposta a Incidente (DFIR)

> Análise apenas em sistemas próprios ou com autorização. Preserve a cadeia de custódia: trabalhe
> sobre cópia/imagem, nunca sobre o original; registre hash de cada evidência.

## Dois modos, um eixo

A Égide tem pentest e blue-team, mas não tinha profundidade forense. Esta habilidade entrega o
método de **DFIR**: como investigar o que aconteceu e como responder estruturadamente.

## A. Forense (responder "o que aconteceu")

### Memória (RAM)
Quando um sistema comprometido teve a RAM capturada — pega malware fileless, injeção/hollowing de
processo, chaves/senhas/config descriptografada em memória, rootkit que se esconde do disco.
Ferramenta de referência: **Volatility 3**.
1. Identificar o perfil/símbolos do dump (OS e versão).
2. Enumerar processos e achar entradas suspeitas (pslist + árvore + escondidos).
3. Conexões de rede, DLLs/handles, código injetado, dump de processo suspeito.
4. Varrer a memória com **YARA** por assinaturas conhecidas; extrair strings/IOCs.
> Não use Volatility para imagem de disco — para disco use Autopsy/Sleuth Kit/FTK.

### Disco e artefatos
Imagem de disco (dd/dcfldd com hash), **MFT** (linha do tempo de criação/modificação de arquivo),
artefatos de execução (LNK, jumplists, Prefetch), forense de navegador (histórico, cache,
downloads). Cada artefato vira um evento datado.

### Timeline
Consolidar todos os artefatos numa **timeline única** ordenada (super-timeline) — é o que conecta
"como entrou" a "o que fez". Ferramenta de referência: Timesketch / plaso.

## B. Resposta a incidente (responder "o que fazer")

Playbook estruturado em fases — **contenção → erradicação → recuperação** — derivado de frameworks
(ex.: CISA para ransomware, NIST 800-61):
1. **Escopo** do incidente: quais ativos, qual janela temporal, qual vetor.
2. **Contenção**: isolar sem destruir evidência (preserve a RAM antes de desligar).
3. **Erradicação**: remover persistência, credenciais comprometidas, artefatos.
4. **Recuperação**: restaurar de backup limpo, validar, monitorar reincidência.
5. **Comunicação**: template de comunicação de incidente (stakeholders, prazo, fato vs hipótese).
6. **Lições**: post-mortem que vira regra de detecção nova (handoff a CTI/blue-team).

## Critérios de validação
- Toda evidência tem hash e cópia; o original não foi tocado.
- A timeline conecta vetor de entrada → ações → impacto.
- O playbook tem dono por fase e gate humano para ações destrutivas.

## Incremental (não nesta leva)
Forense de container/K8s (G11), forense de nuvem (sub-skills de G1/G6) e dashboards de IR ficam
adiados — ver relatório de perda.

---
*Fonte: `mukul975/Anthropic-Cybersecurity-Skills@673da1f3` (Apache-2.0), clusters G6 (DFIR:
`analyzing-memory-dumps-with-volatility` e correlatos) + G14 (incident-response:
`building-incident-response-playbook`, `building-ransomware-playbook-with-cisa-framework`,
`building-incident-timeline-with-timesketch`). Método reescrito em PT-BR; sem cópia literal.*
