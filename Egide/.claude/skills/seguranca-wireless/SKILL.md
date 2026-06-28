---
name: seguranca-wireless
description: >-
  Use quando precisar avaliar a segurança de redes sem fio (Wi-Fi corporativo, guest,
  IoT; Bluetooth/BLE) em assessment AUTORIZADO — mapeamento de espectro, detecção de
  rogue AP e evil-twin, validação de WPA2/WPA3 e transition mode, e teste de
  segmentação entre wireless e rede cabeada. Eixo wireless da Égide — método de
  auditoria/defesa, nunca jamming nem ataque a rede sem autorização escrita.
domain: ciberseguranca
subdomain: wireless-security
tags: [wireless, wifi, wpa2, wpa3, rogue-ap, evil-twin, bluetooth, ble, kismet, wids]
---

# Segurança Wireless

> Só audite redes sem fio com **autorização escrita** do dono. Jamming/negação de serviço contra
> infraestrutura sem fio é proibido salvo autorização explícita, e nunca em ambiente onde a
> interrupção afete sistemas de segurança de vida. O foco aqui é mapear, detectar e validar
> controles — não derrubar.

## O que é

O meio sem fio é compartilhado e atravessa paredes: um atacante em proximidade física é parte do
modelo de ameaça. Esta habilidade dá o método para inventariar o espectro, achar pontos de acesso
desonestos e medir a robustez dos controles de autenticação e segmentação.

## Método

### 1. Reconhecimento e mapeamento de espectro (passivo)
- Coloque o adaptador em modo monitor e use **Kismet** (ou equivalente) para inventariar SSIDs, BSSIDs,
  canais, cifras, clientes e força de sinal.
- Construa o **baseline** do que deveria existir (APs corporativos autorizados, guest, IoT) — tudo
  fora dele é candidato a investigação.

### 2. Detecção de rogue AP e evil-twin
- Compare o levantamento contra a lista de APs autorizados: SSID corporativo anunciado por BSSID
  desconhecido, ou mesmo SSID em canal/posição inesperada, indica **rogue/evil-twin**.
- Valide a eficácia do **WIDS/WIPS** existente disparando os indicadores que ele deveria pegar
  (dentro do escopo autorizado).

### 3. Validação de autenticação (WPA2/WPA3)
- **WPA2-Personal**: a robustez vive na passphrase. Avalie política de senha e o risco de captura de
  handshake + cracking offline — recomendação defensiva é passphrase forte e migração para WPA3.
- **WPA3 / transition mode**: verifique se o modo de transição não rebaixa silenciosamente clientes
  para WPA2 (downgrade); valide SAE e proteção de management frames (PMF).
- **WPA2-Enterprise (802.1X)**: confira validação de certificado do servidor RADIUS no suplicante —
  sem isso, autenticação é forjável.

### 4. Segmentação pós-acesso
- Assuma comprometimento do segmento wireless e teste o que ele alcança: guest/IoT/corporate devem
  estar isolados entre si e da rede cabeada crítica. Falha de segmentação é o achado de maior impacto.

## Entrega
Relatório de assessment wireless: inventário de espectro + rogue/evil-twin detectados + postura de
autenticação (WPA2/WPA3/Enterprise) + mapa de segmentação, com recomendações priorizadas. Handoff:
detecção contínua → blue-team (WIDS/WIPS).

## Incremental (não nesta leva)
Avaliação de BLE/Bluetooth aprofundada, security de IoT além do enlace sem fio e procedimentos de
captura/cracking detalhados ficam adiados (e fora do escopo defensivo) — ver relatório de perda.

---
*Fonte: `mukul975/Anthropic-Cybersecurity-Skills@673da1f3` (Apache-2.0), cluster G31 — wireless-security
(`performing-wireless-security-assessment-with-kismet`, `conducting-wireless-network-penetration-test`).
Método reescrito em PT-BR; só metodologia de auditoria/defesa; sem cópia literal nem passo ofensivo
executável.*
