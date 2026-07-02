---
name: seguranca-firmware-e-hardware
description: >-
  Use quando precisar auditar firmware ou a camada de hardware/boot — extração e
  análise de firmware de IoT/embarcado (binwalk), auditoria de UEFI/BIOS (proteção
  de escrita, lock de SPI flash, Secure Boot) e investigação de bootkit/implante de
  firmware que persiste após reinstalação do SO. Eixo firmware/hardware da Égide —
  forense e hardening sobre imagens e plataformas, defensivo.
domain: ciberseguranca
subdomain: firmware-hardware-security
tags: [firmware, uefi, bios, bootkit, secure-boot, binwalk, chipsec, iot, spi-flash]
---

# Segurança de Firmware e Hardware

> O firmware vive **abaixo** do SO: um implante de UEFI sobrevive à formatação e à troca de
> disco. Por isso o sinal de alerta clássico é "a máquina volta a chamar o C2 depois de
> reinstalar o SO". Dump de SPI flash e teste de proteção de BIOS exigem driver de kernel e
> privilégio — faça em plataforma autorizada, com imagem known-good para comparar.

## O que é

Firmware é código persistente e privilegiado, frequentemente esquecido pela defesa. Esta
habilidade cobre duas frentes: **firmware de dispositivo embarcado/IoT** (roteador, câmera,
CLP) e **firmware de plataforma** (UEFI/BIOS de laptop/servidor). O método é forense e de
hardening — extrair, comparar com baseline e verificar proteções.

## Método

### 1. Firmware embarcado / IoT (extração com binwalk)
- **Reconhecimento** da imagem: identifique formato, headers e regiões.
- **Análise de entropia**: regiões de alta entropia indicam compressão ou criptografia; baixa,
  dados/strings.
- **Extração** de filesystems embutidos (SquashFS, CramFS, JFFS2, UBIFS) e montagem para inspeção.
- **Caça a segredos**: strings, credenciais hardcoded, chaves privadas, certificados e config
  embarcada. Relatório com o que foi achado e onde.

### 2. Auditoria de UEFI / BIOS (CHIPSEC)
- Rode a suíte automatizada e os módulos de **proteção de firmware**: write protection da BIOS,
  locks de SPI flash, proteção do boot-script S3.
- Verifique **proteção das variáveis de Secure Boot** e permissões de acesso às regiões do SPI flash.
- **Dump do SPI flash** para forense offline: compare contra imagem do OEM (known-good) para detectar
  modificação.
- Enumere e triague as variáveis UEFI; objetivo de baseline é confirmar que o OEM habilitou as
  proteções corretas na frota.

### 3. Investigação de bootkit / implante UEFI
- Gatilhos: persistência pós-reinstalação, Secure Boot adulterado/desabilitado, enrolamento
  inesperado de MOK, falha de verificação de integridade de firmware, componente de rootkit
  carregando cedo no boot.
- Fluxo: dump do SPI flash → inspeção de variáveis UEFI → análise da EFI System Partition (ESP) →
  varredura por assinaturas conhecidas de bootkit → checagem de bypass de Secure Boot → verificação
  de integridade da cadeia de boot → laudo.
- Valide **measured boot via TPM** (atestação) quando disponível — âncora de confiança independente.

## Entrega
Laudo de firmware/hardware: para IoT, inventário de segredos e filesystems + vulnerabilidades; para
plataforma, status das proteções de BIOS/Secure Boot + diff contra known-good + veredito de implante.
Handoff: indicadores → CTI (`inteligencia-de-ameacas-cti`); contenção → resposta a incidente.

## Incremental (não nesta leva)
Análise de firmware de CLP (`performing-plc-firmware-security-analysis`), integração com HSM e
autenticação por chave de hardware ficam adiados — ver relatório de perda.

## Herança histórica

**Joe FitzPatrick** — instrutor e fundador do `SecuringHardware.com`; referência mundial em avaliação de hardware defensiva (Applied Physical Attacks, cursos desde 2013+). Codificou a doutrina "o firmware abaixo do SO é a superfície esquecida" que motiva esta skill.

**Andrew "bunnie" Huang** — autor de *Hacking the Xbox* (2003, No Starch) e *The Hardware Hacker* (2017); referência em análise de hardware embarcado e engenharia reversa de dispositivos IoT que sustenta o bloco 1.

**Craig Heffner** — criador do **binwalk** (2010+, hoje ReFirm Labs/Microsoft), a ferramenta padrão de extração de firmware embutido; a análise de entropia + carving de filesystem embutido são doutrinárias.

**Alex Matrosov (Eclypsium/Binarly)** — coautor de *Rootkits and Bootkits: Reversing Modern Malware and Next Generation Threats* (2019, No Starch); autoridade em bootkit UEFI (LoJax, MoonBounce, BlackLotus) e forense de firmware de plataforma.

**Intel + Microsoft (Task Force da TCG, 2003+)** — publicaram os padrões **TPM 1.2 (2003)** e **TPM 2.0 (2014)** e a arquitetura de **Measured Boot**; NIST SP 800-155 (2011) codificou BIOS Integrity Measurement.

**Frameworks canônicos herdados**:
- **UEFI Specification** (UEFI Forum, 2005+) — a especificação que define a superfície de auditoria.
- **NIST SP 800-147 (BIOS Protection Guidelines)** e **SP 800-193 (Platform Firmware Resiliency)** — base regulatória.
- **CHIPSEC** (Intel Security, 2014+) — framework aberto para auditar proteções de plataforma.
- **TPM 2.0 + Measured Boot** — âncora de confiança independente do SO.
- **UEFI Secure Boot + shim + MOK** — cadeia de confiança de boot em Linux/Windows.
- **binwalk + FACT (Firmware Analysis and Comparison Tool, Fraunhofer FKIE)** — pipeline de extração e diff.

---
*Fonte: `mukul975/Anthropic-Cybersecurity-Skills@673da1f3` (Apache-2.0), cluster G29 — firmware/hardware
(`performing-firmware-extraction-with-binwalk`, `auditing-uefi-firmware-with-chipsec`,
`analyzing-uefi-bootkit-persistence`, `validating-tpm-measured-boot-attestation`). Método reescrito em
PT-BR; forense/defensivo; sem cópia literal.*
