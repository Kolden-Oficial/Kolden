# Relatório de reconciliação (F6.5) — Égide / bucket especializado + GRC

- **squad-alvo:** `Egide` (`C:/Kolden/Egide/`)
- **repo:** `mukul975/Anthropic-Cybersecurity-Skills@673da1f3b0b7be34ffc9624ef3858fe45f1c3bed` (Apache-2.0)
- **bucket:** domínios especializados + GRC (clusters G12, G21+G23, G24, G25, G26, G29, G31, G32)
- **método:** anti-exaustão — 1 habilidade PT-BR por cluster, método-âncora de maior valor; resto **DIFERIDO-INCREMENTAL**.
- **invariante:** PERDIDO = 0.

## Habilidades criadas (8)

| repo | ID (cluster) | disposicao | destino |
|---|---|---|---|
| mukul975 | G12 — OT/ICS/SCADA | ABSORVIDO | `Egide/.claude/skills/seguranca-ot-ics-scada/SKILL.md` |
| mukul975 | G24 — mobile (estática) | ABSORVIDO | `Egide/.claude/skills/seguranca-mobile-estatica/SKILL.md` |
| mukul975 | G29 — firmware/hardware | ABSORVIDO | `Egide/.claude/skills/seguranca-firmware-e-hardware/SKILL.md` |
| mukul975 | G32 — blockchain/smart-contract | ABSORVIDO | `Egide/.claude/skills/auditoria-de-smart-contracts/SKILL.md` |
| mukul975 | G31 — wireless | ABSORVIDO | `Egide/.claude/skills/seguranca-wireless/SKILL.md` |
| mukul975 | G26 — supply-chain | ABSORVIDO | `Egide/.claude/skills/seguranca-de-cadeia-de-suprimentos/SKILL.md` |
| mukul975 | G25 — GRC/compliance | ABSORVIDO | `Egide/.claude/skills/grc-e-conformidade-de-seguranca/SKILL.md` |
| mukul975 | G21 + G23 — phishing + ransomware | ABSORVIDO (fundido) | `Egide/.claude/skills/defesa-phishing-e-ransomware/SKILL.md` |

**Sobreposição resolvida:** G21 (phishing-defense) e G23 (ransomware-defense) foram **fundidos** numa
única habilidade — o phishing é o acesso inicial que desemboca no ransomware; a linha do tempo
defensiva (autenticação de e-mail → investigação → precursor → playbook) é contínua. Ambos os clusters
creditados no rodapé da skill.

## ABSORVIDO parcial — método de cada cluster (skills-fonte representativas reescritas)

- **G12:** `detecting-anomalies-in-industrial-control-systems`, `detecting-modbus-protocol-anomalies`, `implementing-network-segmentation-for-ot`, `performing-ot-vulnerability-scanning-safely`.
- **G24:** `performing-android-app-static-analysis-with-mobsf`, `analyzing-android-malware-with-apktool`, `performing-ios-app-security-assessment` (recorte estático).
- **G29:** `performing-firmware-extraction-with-binwalk`, `auditing-uefi-firmware-with-chipsec`, `analyzing-uefi-bootkit-persistence`, `validating-tpm-measured-boot-attestation`.
- **G32:** `auditing-foundry-smart-contract-security`, `analyzing-ethereum-smart-contract-vulnerabilities`.
- **G31:** `performing-wireless-security-assessment-with-kismet`, `conducting-wireless-network-penetration-test` (só metodologia defensiva).
- **G26:** `generating-and-analyzing-sboms`, `detecting-dependency-confusion`, `scanning-container-images-with-grype`, `implementing-supply-chain-security-with-in-toto`.
- **G25:** `implementing-iso-27001-information-security-management`, `performing-nist-csf-maturity-assessment`, `conducting-cyber-risk-assessment-with-nist-800-30`, `achieving-cmmc-level-2-compliance`, `implementing-gdpr-data-protection-controls`, `performing-privacy-impact-assessment`.
- **G21+G23:** `implementing-dmarc-dkim-spf-email-security`, `analyzing-email-headers-for-phishing-investigation`, `detecting-ransomware-precursors-in-network`, `building-ransomware-playbook-with-cisa-framework`.

## DESCARTADO

| item | motivo |
|---|---|
| Todos os `scripts/*.py` ofensivos/dual-use dos clusters (PoC de exploração, captura/cracking wireless, instrumentação dinâmica de app alheio, fuzzing ativo de CLP) | DUAL-USE — regra da missão: só MÉTODO de auditoria/defesa. Inventariados como ferramenta executável de ataque; barrados na absorção (ver `seguranca.md` do dossiê). |

## INCREMENTAL (não aplicado nesta leva)

Adiado por anti-exaustão (cada cluster registra seu próprio incremental no rodapé/seção da skill):

- **G12:** forense de firmware de CLP, integrações de fornecedor (Dragos/Nozomi/Claroty/Tofino), playbook IR-OT completo. — DIFERIDO-INCREMENTAL.
- **G24:** análise **dinâmica** (Frida/Objection, bypass de pinning, Keychain runtime), pentest de API mobile, forense de dispositivo (Cellebrite). — DIFERIDO-INCREMENTAL.
- **G29:** análise de firmware de CLP, integração HSM, autenticação por chave de hardware. — DIFERIDO-INCREMENTAL.
- **G32:** resposta a incidente on-chain (rastreio de wallet, análise de exploit), cadeias não-EVM. — DIFERIDO-INCREMENTAL.
- **G31:** BLE/Bluetooth aprofundado, IoT além do enlace, captura/cracking detalhado (fora do escopo defensivo). — DIFERIDO-INCREMENTAL.
- **G26:** malware em artefato de dependência, simulação de ataque de cadeia, SCA de fornecedor (Snyk). — DIFERIDO-INCREMENTAL.
- **G25:** NIST RMF/800-37 (ATO) completo, NERC CIP, PCI DSS, PIA por sistema, automação de compliance em nuvem (AWS Config/Security Hub). — DIFERIDO-INCREMENTAL.
- **G21+G23:** simulação de phishing (GoPhish), treinamento, SOAR/automação, recuperação detalhada pós-criptografia, análise de wallet/leak-site. — DIFERIDO-INCREMENTAL.

## Reconciliação

- Clusters-âncora do bucket: **8** (G12, G21+G23, G24, G25, G26, G29, G31, G32).
- ABSORVIDO: **8** habilidades criadas (G21+G23 fundidos → 1 arquivo).
- DESCARTADO: scripts dual-use (bloco único, por regra de missão).
- DIFERIDO-INCREMENTAL: subcapacidades de cada cluster, listadas acima.
- **PERDIDO: 0** — nada saiu sem registro.

## Notas

- `catalogo.md` do squad Égide: **AUSENTE** em `Egide/.claude/skills/` — não foi inventado (regra do guia).
  Pendência para o curador quando consolidar o catálogo da Égide.
- Nenhuma das 8 habilidades duplica skill existente da Égide (`auditoria-de-seguranca-de-ia-e-mcp`,
  `escrita-segura-e-dlp`, `forense-digital-e-resposta-a-incidente`, `inteligencia-de-ameacas-cti`,
  `scanner-anti-injecao-resiliente`).
- Licença: **Apache-2.0**; atribuição `mukul975/Anthropic-Cybersecurity-Skills@673da1f3` no rodapé de
  cada SKILL.md. Sem cópia literal — método extraído e reescrito em PT-BR.
- Sem web, sem execução de código, sem commit/push.
