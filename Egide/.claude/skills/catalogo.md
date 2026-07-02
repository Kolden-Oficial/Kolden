# Catálogo de Habilidades — Égide

Índice das **32 habilidades** do squad Égide (cibersegurança). Todas **defensivas e
metodológicas** — descrevem como testar e corrigir, nunca entregam ataque/payload pronto;
operam só sobre o que se possui ou se tem autorização para avaliar.

> **Consolidação 2026-07-01 (F6 de exaustão da leva `_lote-2026-06-26`):** as 32
> SKILL.md ganharam o bloco `## Herança histórica` com biografia do especialista
> humano de referência do domínio + frameworks canônicos herdados (padrão validado
> em `Aletheia/agents/eric-ries.md`, replicado em `heranca-de-especialista`). Cinco
> incrementais de alto valor foram absorvidos in-place: **Macie/DLP** em
> `seguranca-de-cloud-multi-provider`, **Falco + Tetragon** em
> `seguranca-de-containers-e-kubernetes`, **Browser Isolation (RBI/LBI)** em
> `arquitetura-zero-trust-zta`, **SOC 2/HIPAA/PCI-DSS + control mapping + Drata** em
> `grc-e-conformidade-de-seguranca`, e **OIDC federation runner→cloud** em
> `devsecops-sast-dast-em-ci`. Nenhuma skill nova foi criada; nenhuma perda.

| Habilidade | Gatilho de invocação | Propósito |
|---|---|---|
| `analise-estatica-de-malware` | triar/reversar artefato suspeito SEM executar (PE/ELF/macro/PDF) | Triagem estática + reversing (Ghidra/radare2) → extrai IOCs, capabilities e config de C2 |
| `arquitetura-zero-trust-zta` | desenhar/avaliar/implementar zero-trust | CISA ZTMM v2 + NIST 800-207; ZTNA substitui VPN, microsegmentação, device posture, mTLS |
| `auditoria-de-seguranca-de-ia-e-mcp` | auditar LLM/agente/servidor MCP antes de plugar | AI-security: tool-poisoning, prompt-injection, guardrails; defende a própria infra de agentes Kolden |
| `auditoria-de-smart-contracts` | auditar smart contract (Solidity/EVM) antes de deploy | Análise estática + execução simbólica + fuzz/invariantes + revisão manual (Slither/Mythril/Foundry) |
| `caca-a-ameacas-orientada-a-hipotese` | postura proativa: caçar comprometimento sem alerta | Threat hunting por hipótese (CTI/ATT&CK) → baseline + analítica comportamental; devolve detecção nova |
| `criptografia-aplicada` | auditar/desenhar uso de cripto num sistema | Algoritmo/modo, senha/TLS/PKI, gestão de chaves; caça antipadrões (ECB, IV reusado, segredo hardcoded) |
| `defesa-phishing-e-ransomware` | defender contra phishing/ransomware | SPF/DKIM/DMARC, análise de cabeçalho, precursores de ransomware, playbook CISA/NIST |
| `deteccao-de-pivot-e-tunneling` | detectar/bloquear pivoting e tunneling (SSH reverso, DNS/HTTP/ICMP tunneling, Ngrok abuso) | **Defensiva apenas** — IoCs por camada (rede/host/DNS) + Sigma/SPL/KQL + hardening egress (ZTNA, RPZ). Sem técnica ofensiva |
| `devsecops-sast-dast-em-ci` | embutir segurança no CI/CD | Ordenar scanners (SAST/DAST/SCA/secret/IaC), gates por severidade, shift-left sem travar entrega; OIDC federation runner→cloud (sem access keys) |
| `engenharia-de-deteccao-sigma-yara` | transformar ameaça em regra de detecção durável | Autoria de regra Sigma (multi-SIEM) + YARA; detection-as-code, ajuste de fidelidade/falso-positivo |
| `escrita-segura-e-dlp` | escrever flag/segredo com segurança ou pré-enviar arquivo a LLM | Escrita symlink-safe (O_NOFOLLOW, temp+rename, 0600) + DLP de pré-envio (denylist + cap de tamanho) |
| `forense-digital-e-resposta-a-incidente` | conduzir incidente ou forense digital | DFIR: dump de memória, disco/MFT, artefatos de execução, timeline (contenção→erradicação→recuperação) |
| `gestao-de-identidade-e-acesso-iam` | endurecer/auditar identidade e acesso | IAM cloud, AD (Tier 0/1/2), federação SSO (SAML/OIDC/SCIM), PAM; detecta golden ticket/DCSync |
| `gestao-de-vulnerabilidades-priorizacao` | transformar CVEs num plano de remediação ordenado | Prioriza por risco real (CVSS+EPSS+KEV+contexto), define SLA de correção, mede o fluxo |
| `governanca-multi-conta-de-nuvem` | governar org-wide multi-cloud (AWS Organizations/Azure MG/GCP Org) | SCPs preventivas + Azure Policy + GCP Org Policy + policy-as-code (OPA/Sentinel/Cloud Custodian) + landing zones |
| `grc-e-conformidade-de-seguranca` | estruturar governança, risco e conformidade | ISO 27001, NIST CSF, 800-30, CMMC/800-171, LGPD/GDPR, **SOC 2 + HIPAA + PCI-DSS** + control mapping + evidence collection (Drata) |
| `inteligencia-de-ameacas-cti` | triar/enriquecer IOC, atribuir campanha a ator/APT | CTI contra MITRE ATT&CK/kill chain/modelo diamante; alimenta blue-team e DFIR |
| `metodologia-de-pentest-ptes` | estruturar pentest autorizado (processo, não exploit) | Escopo+ROE, fases PTES, checklist por fase, relatório priorizado; SEM comandos de ataque |
| `modelagem-de-ameacas-stride-pasta` | modelar ameaças em arquitetura antes do build (qualquer sistema, não só web) | STRIDE sistemático com DFDs + PASTA 7 estágios + critério de escolha + handoffs por skill irmã |
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

## Herança histórica (consolidação 2026-07-01)

Cada uma das 32 SKILL.md acima carrega no rodapé um bloco `## Herança histórica`
com **biografia curta** dos especialistas humanos que fundaram o domínio +
**frameworks canônicos herdados** (obra + ano). Padrão validado em
`Aletheia/agents/eric-ries.md` e replicado pela habilidade `heranca-de-especialista`
do Caos.

Mapa condensado dos ancestrais por skill (o SKILL.md tem a bio completa):

| Skill | Especialistas herdados |
|---|---|
| `analise-estatica-de-malware` | Sikorski & Honig (*Practical Malware Analysis*, 2012); Ghidra (NSA, 2019); radare2 (Àlvarez, 2006) |
| `arquitetura-zero-trust-zta` | Kindervag (Forrester, 2010); Google BeyondCorp (2014-2018); NIST SP 800-207 (2020); CISA ZTMM v2 (2023) |
| `auditoria-de-seguranca-de-ia-e-mcp` | Willison (prompt injection, 2022); Goodside; MITRE ATLAS; OWASP LLM Top 10 |
| `auditoria-de-smart-contracts` | Trail of Bits (Slither, 2018); ConsenSys Diligence; OpenZeppelin; SWC Registry |
| `caca-a-ameacas-orientada-a-hipotese` | Sqrrl/Bianco (Threat Hunting Loop, 2015); Pyramid of Pain (2013); Sanders; Rodriguez |
| `criptografia-aplicada` | Schneier (*Applied Cryptography*, 1996); Percival (scrypt, 2009); Bernstein (Curve25519/ChaCha20) |
| `defesa-phishing-e-ransomware` | Mitnick (*Art of Deception*, 2001); Hadnagy; IETF DMARC WG (RFC 7489, 2015); CISA #StopRansomware |
| `deteccao-de-pivot-e-tunneling` | MITRE ATT&CK (T1572/T1071/T1090); Rob Joyce (NSA TAO, 2016); Sanders |
| `devsecops-sast-dast-em-ci` | Lietz (DevSecOps.org); Humble & Farley (*Continuous Delivery*, 2010); OpenSSF Scorecard; SLSA |
| `engenharia-de-deteccao-sigma-yara` | Roth (Sigma, 2016); Alvarez (YARA, 2007); Bianco (Pyramid of Pain, 2013) |
| `escrita-segura-e-dlp` | Schneier; Bishop (*Computer Security: Art and Science*, 2018); CWE-59/732 |
| `forense-digital-e-resposta-a-incidente` | Sarah Edwards (SANS FOR518); Carvey (*Windows Registry Forensics*, 2016); Volatility Foundation; NIST 800-61 rev.2 |
| `gestao-de-identidade-e-acesso-iam` | Kindervag (Zero Trust, 2010); Schneier; Microsoft ESAE/Sean Metcalf; NIST 800-63 |
| `gestao-de-vulnerabilidades-priorizacao` | FIRST.org (CVSS); Jacobs & Romanosky (EPSS, 2019); CISA KEV (2021); Kenna+Cyentia (2018-2023) |
| `governanca-multi-conta-de-nuvem` | AWS Well-Architected + Control Tower; Microsoft CAF; Google CFT; Sandall (OPA/Rego, 2016) |
| `grc-e-conformidade-de-seguranca` | Landoll (*Security Risk Assessment Handbook*, 2011); ISO 27001 SC 27; NIST (Ron Ross); AICPA SOC 2 TSC |
| `inteligencia-de-ameacas-cti` | Caltagirone et al. (Diamond Model, 2013); Hutchins et al. (Kill Chain, 2011); MITRE ATT&CK; STIX 2.1 |
| `metodologia-de-pentest-ptes` | PTES Team (2012); Dave Kennedy (TrustedSec); NIST SP 800-115; OSSTMM (ISECOM) |
| `modelagem-de-ameacas-stride-pasta` | Kohnfelder & Garg (STRIDE, Microsoft, 1999); Shostack (*Threat Modeling*, 2014); UcedaVélez & Morana (PASTA, 2015) |
| `operacoes-de-soc-blue-team` | Hutchins/Cloppert/Amin (Kill Chain, 2011); Sanders (*ANSM*, 2013); Rob Lee (SANS FOR508); Chuvakin |
| `scanner-anti-injecao-resiliente` | Willison; Greshake et al. (arXiv 2302.12173, 2023); Trojan Source (2021); Unicode TR9 |
| `seguranca-de-api` | De Ryck (Pragmatic Web Security); Mauny & Yalon (42Crunch/OWASP API Top 10, 2019/2023) |
| `seguranca-de-aplicacoes-web-owasp` | Manico (OWASP Cheat Sheets); van der Stock (OWASP Top 10/ASVS); Stuttard & Pinto (*WAHH*, 2011) |
| `seguranca-de-cadeia-de-suprimentos` | Lorenc/Lewandowski (SLSA v1.0, 2023); Cappos (in-toto/TUF, NYU); Sigstore team; Ken Thompson (1984) |
| `seguranca-de-cloud-multi-provider` | AWS Well-Architected; Rich Mogull (CSA); CIS Benchmarks Community |
| `seguranca-de-containers-e-kubernetes` | Liz Rice (*Container Security*, 2020); Kelsey Hightower; Falco/Sysdig (Degioanni, 2016); NIST SP 800-190 |
| `seguranca-de-endpoint-edr` | Russinovich (Sysinternals/Sysmon, 2014); Alex Ionescu (*Windows Internals*); LOLBAS/GTFOBins; Osquery team |
| `seguranca-de-rede-e-analise-de-trafego` | Sanders (*Practical Packet Analysis*, 2007); Combs (Wireshark, 1998); Cisco NetFlow; Vixie (BIND/RPZ) |
| `seguranca-firmware-e-hardware` | Joe FitzPatrick; bunnie Huang; Heffner (binwalk, 2010); Matrosov (*Rootkits and Bootkits*, 2019); TCG TPM 2.0 |
| `seguranca-mobile-estatica` | Adrian Ludwig (Google Android Security); OWASP MASVS v2.0 team (Schleier, Mueller, Willemsen, Holguera); Abraham (MobSF) |
| `seguranca-ot-ics-scada` | Rob M. Lee (Dragos); Michael Assante (NERC/SANS); Joe Weiss; Theodore Williams (Purdue Model, 1990); ISA/IEC 62443 |
| `seguranca-wireless` | Vivek Ramachandran (SecurityTube); Mike Kershaw (Kismet, 2001); Mathy Vanhoef (KRACK 2017/Dragonblood 2019); IEEE 802.11 |
