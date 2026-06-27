---
name: seguranca-mobile-estatica
description: >-
  Use quando precisar auditar a segurança de um app móvel (Android APK/AAB ou iOS
  IPA) por análise ESTÁTICA — antes de release, em triagem de app de terceiro
  (risco de cadeia de suprimentos) ou em pentest autorizado. Cobre análise de
  manifesto/entitlements, segredos embarcados, criptografia fraca, comunicação
  insegura e proteções de binário, mapeado ao OWASP MASVS/Mobile Top 10. Eixo
  mobile da Égide — auditoria sobre o artefato, sem instrumentar dispositivo alheio.
domain: ciberseguranca
subdomain: mobile-security
tags: [mobile, android, ios, apk, ipa, mobsf, owasp-masvs, estatica, appsec]
---

# Segurança Mobile (análise estática)

> Análise estática pega vulnerabilidade baseada em padrão (segredo hardcoded, cripto
> fraca, configuração insegura), mas **não** pega falha de lógica em runtime — não é
> substituta de revisão manual nem de análise dinâmica. Só audite apps com autorização
> explícita; app de loja de terceiro só para triagem do artefato, nunca para atacar a
> infraestrutura de quem o publicou.

## O que é

O pacote do app (APK/AAB/IPA) é um artefato inspecionável: manifesto, recursos, bytecode/binário
e bibliotecas nativas. A análise estática extrai disso a postura de segurança **sem executar o app**.
É barata, automatizável em CI/CD e ideal para triagem de volume.

## Método

### 1. Triagem automatizada (MobSF como motor)
- Suba MobSF e envie o APK/AAB/IPA por API; recupere o relatório JSON. Bom para CI/CD e para
  baselinar muitos apps.
- Trate o score automático como **ponto de partida**, não veredito — confirme cada achado de alta
  severidade no código.

### 2. Android — categorias críticas (OWASP Mobile Top 10 2024)
- **Manifesto (M8 misconfig)**: componentes exportados (activity/service/receiver/provider) sem
  guarda de permissão; `android:debuggable="true"`; `allowBackup="true"` (extração via ADB);
  ausência de `networkSecurityConfig`.
- **Código (M1 credenciais)**: API keys/senhas/tokens hardcoded; `SharedPreferences` guardando dado
  sensível; cripto quebrada (ECB, IV estático, chave fixa).
- **Rede (M5 comunicação)**: sem certificate pinning; `TrustManager` que aceita qualquer cert;
  cleartext HTTP permitido.
- **Binário (M7 proteção)**: sem ofuscação ProGuard/R8; ausência de detecção de root/tamper.
- Para desmontar e ler o `smali`/manifesto manualmente, `apktool` decodifica o APK (revisão de
  código, não execução).

### 3. iOS — pacote IPA
- Análise estática do IPA: segredos hardcoded, **entitlements** excessivos, `Info.plist` permissivo
  (ATS desabilitado), proteções de binário (PIE, stack canary, encryption flag).
- Avalie controles declarados de jailbreak detection / anti-tamper e armazenamento de credencial
  (uso correto do Keychain vs arquivo em claro).
- Critério de referência: **OWASP MASVS/MASTG**.

### 4. Relatório priorizado
- Mapeie cada achado ao MASVS/Mobile Top 10, com severidade e evidência (linha/arquivo).
- Separe falso-positivo de bug real; recomende correção concreta (mover segredo para backend,
  ativar pinning, desabilitar backup, ofuscar).

## Entrega
Relatório de auditoria estática: achados por categoria OWASP + severidade + evidência + remediação.
Handoff: o que exigir runtime (bypass de pinning, hook de método, storage em uso) é análise dinâmica
— eixo separado, fora desta leva.

## Incremental (não nesta leva)
Análise dinâmica (Frida/Objection, bypass de SSL pinning, extração de Keychain em runtime), pentest
de API mobile e forense de dispositivo (Cellebrite) ficam adiados — ver relatório de perda.

---
*Fonte: `mukul975/Anthropic-Cybersecurity-Skills@673da1f3` (Apache-2.0), cluster G24 — mobile-security
(`performing-android-app-static-analysis-with-mobsf`, `analyzing-android-malware-with-apktool`,
`performing-ios-app-security-assessment`). Método reescrito em PT-BR; foco estático/defensivo; sem cópia
literal.*
