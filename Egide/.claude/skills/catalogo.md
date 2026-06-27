# Catálogo de Habilidades — Égide

Índice das 29 habilidades do squad Égide (cibersegurança). Todas **defensivas e
metodológicas** — descrevem como testar e corrigir, nunca entregam ataque/payload pronto;
operam só sobre o que se possui ou se tem autorização para avaliar.

| Habilidade | Gatilho de invocação | Propósito |
|---|---|---|
| `analise-estatica-de-malware` | triar/reversar artefato suspeito SEM executar (PE/ELF/macro/PDF) | Triagem estática + reversing (Ghidra/radare2) → extrai IOCs, capabilities e config de C2 |
| `arquitetura-zero-trust-zta` | desenhar/avaliar/implementar zero-trust | CISA ZTMM v2 + NIST 800-207; ZTNA substitui VPN, microsegmentação, device posture, mTLS |
| `auditoria-de-seguranca-de-ia-e-mcp` | auditar LLM/agente/servidor MCP antes de plugar | AI-security: tool-poisoning, prompt-injection, guardrails; defende a própria infra de agentes Kolden |
| `auditoria-de-smart-contracts` | auditar smart contract (Solidity/EVM) antes de deploy | Análise estática + execução simbólica + fuzz/invariantes + revisão manual (Slither/Mythril/Foundry) |
| `caca-a-ameacas-orientada-a-hipotese` | postura proativa: caçar comprometimento sem alerta | Threat hunting por hipótese (CTI/ATT&CK) → baseline + analítica comportamental; devolve detecção nova |
| `criptografia-aplicada` | auditar/desenhar uso de cripto num sistema | Algoritmo/modo, senha/TLS/PKI, gestão de chaves; caça antipadrões (ECB, IV reusado, segredo hardcoded) |
| `defesa-phishing-e-ransomware` | defender contra phishing/ransomware | SPF/DKIM/DMARC, análise de cabeçalho, precursores de ransomware, playbook CISA/NIST |
| `devsecops-sast-dast-em-ci` | embutir segurança no CI/CD | Ordenar scanners (SAST/DAST/SCA/secret/IaC), gates por severidade, shift-left sem travar entrega |
| `engenharia-de-deteccao-sigma-yara` | transformar ameaça em regra de detecção durável | Autoria de regra Sigma (multi-SIEM) + YARA; detection-as-code, ajuste de fidelidade/falso-positivo |
| `escrita-segura-e-dlp` | escrever flag/segredo com segurança ou pré-enviar arquivo a LLM | Escrita symlink-safe (O_NOFOLLOW, temp+rename, 0600) + DLP de pré-envio (denylist + cap de tamanho) |
| `forense-digital-e-resposta-a-incidente` | conduzir incidente ou forense digital | DFIR: dump de memória, disco/MFT, artefatos de execução, timeline (contenção→erradicação→recuperação) |
| `gestao-de-identidade-e-acesso-iam` | endurecer/auditar identidade e acesso | IAM cloud, AD (Tier 0/1/2), federação SSO (SAML/OIDC/SCIM), PAM; detecta golden ticket/DCSync |
| `gestao-de-vulnerabilidades-priorizacao` | transformar CVEs num plano de remediação ordenado | Prioriza por risco real (CVSS+EPSS+KEV+contexto), define SLA de correção, mede o fluxo |
| `grc-e-conformidade-de-seguranca` | estruturar governança, risco e conformidade | ISO 27001, NIST CSF, 800-30, CMMC/800-171, LGPD/GDPR; distingue risco de maturidade |
| `inteligencia-de-ameacas-cti` | triar/enriquecer IOC, atribuir campanha a ator/APT | CTI contra MITRE ATT&CK/kill chain/modelo diamante; alimenta blue-team e DFIR |
| `metodologia-de-pentest-ptes` | estruturar pentest autorizado (processo, não exploit) | Escopo+ROE, fases PTES, checklist por fase, relatório priorizado; SEM comandos de ataque |
| `operacoes-de-soc-blue-team` | operar o centro de defesa (não escrever regra/reversar) | Triagem de alerta SIEM, matriz de escalonamento, tiers T1/T2/T3, runbook, KPI (MTTD/MTTR) |
| `scanner-anti-injecao-resiliente` | varrer conteúdo de terceiro por prompt-injection antes do contexto | Detecta instruções desenhadas p/ sobreviver à compactação; defende a pipeline de absorção do Caos |
| `seguranca-de-api` | avaliar/endurecer API (REST/GraphQL/gateway) | OWASP API Top 10: BOLA/BFLA, authz de endpoint, rate-limit; método, sem payload |
| `seguranca-de-aplicacoes-web-owasp` | avaliar/endurecer aplicação web | OWASP Top 10: XSS/SQLi/SSRF/IDOR, threat modeling; como testar+corrigir, sem payload |
| `seguranca-de-cadeia-de-suprimentos` | defender a cadeia de suprimentos de software | SBOM (syft/grype), dependency confusion, CVE em imagem, atestação in-toto/SLSA |
| `seguranca-de-cloud-multi-provider` | auditar postura de nuvem (AWS/Azure/GCP/O365) | CSPM + análise de log: storage exposto, IAM permissivo, CIS benchmark, anomalia CloudTrail |
| `seguranca-de-containers-e-kubernetes` | endurecer/auditar container e cluster K8s | Hardening CIS, scan de imagem (Trivy), RBAC, Pod Security, network policy, Falco (runtime) |
| `seguranca-de-endpoint-edr` | foco no host: telemetria + detecção | Sysmon/PowerShell logging/AMSI/osquery, persistência, fileless/LOLBin, avaliação de EDR |
| `seguranca-de-rede-e-analise-de-trafego` | evidência no fio (PCAP/fluxo/DNS) | Wireshark/NetFlow: C2, exfiltração, DNS tunneling, DGA, beaconing; ao vivo ou pós-incidente |
| `seguranca-firmware-e-hardware` | auditar firmware / camada de boot | Extração de firmware IoT (binwalk), UEFI/BIOS, Secure Boot, bootkit que persiste após reinstalação |
| `seguranca-mobile-estatica` | auditar app móvel (APK/AAB/IPA) por análise estática | Manifesto/entitlements, segredos embarcados, cripto fraca; OWASP MASVS/Mobile Top 10 |
| `seguranca-ot-ics-scada` | avaliar/defender OT/ICS/SCADA | Modbus/DNP3/S7/OPC UA, baseline determinístico, segmentação Purdue/IEC 62443; nunca escreve em planta viva |
| `seguranca-wireless` | avaliar Wi-Fi/BLE em assessment autorizado | Mapeamento de espectro, rogue AP/evil-twin, WPA2/WPA3, segmentação; nunca jamming |

## Habilidades compartilhadas (fonte única no workspace)

| Habilidade | Gatilho | Propósito |
|---|---|---|
| `ritual-de-encerramento` | Fim de toda sessão com trabalho (reflexo `Stop`) | Reflete e grava lições no `MEMORY.md` do squad. Fonte: `C:\Kolden\.claude\skills\ritual-de-encerramento\` |
| `infisical-padrao` | Sempre que precisar de credencial/segredo | Buscar segredos via Infisical (nunca texto puro). Fonte: `Caos/.claude/skills/infisical-padrao/` |
