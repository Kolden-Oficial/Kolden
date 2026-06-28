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

---
*Fonte: `mukul975/Anthropic-Cybersecurity-Skills@673da1f3` (Apache-2.0), cluster G29 — firmware/hardware
(`performing-firmware-extraction-with-binwalk`, `auditing-uefi-firmware-with-chipsec`,
`analyzing-uefi-bootkit-persistence`, `validating-tpm-measured-boot-attestation`). Método reescrito em
PT-BR; forense/defensivo; sem cópia literal.*
