# F3 — Inventário de capacidades

- **slug:** `mukul975--Anthropic-Cybersecurity-Skills` · **sha:** `673da1f3b0b7be34ffc9624ef3858fe45f1c3bed` · **rota:** A

> **Método de agrupamento.** O repo tem **817 skills** (817 `SKILL.md`, cada uma com
> `scripts/` + `references/`). Conforme orientação da missão, **agrupo por cluster de
> domínio/tática MITRE** em vez de emitir 817 IDs. Cada `Gn` abaixo = **1 cluster** de skills
> do mesmo subdomínio; a coluna `fonte` cita o `SKILL.md` representativo + o nº de skills do
> cluster. Cobertura declarada: **14/14 táticas ATT&CK, 756 técnicas únicas** referenciadas.
> Toda skill é `tipo: skill` (método-conhecimento); os `scripts/*.py` são `tipo: ferramenta`
> dual-use tratados em bloco à parte (G24).

| ID | capacidade | tipo | keywords | dominio | fonte(arquivo:linha) |
|---|---|---|---|---|---|
| G1 | Cloud security multi-provider (AWS/Azure/GCP/O365): scoping de breach, análise de logs de atividade, padrões de acesso a storage | skill | cloud, aws, azure, gcp, o365, cloudtrail, cspm | Defense Evasion / Discovery / Collection (66 skills) | `skills/analyzing-azure-activity-logs-for-threats/SKILL.md` (66) |
| G2 | Threat hunting orientado a hipótese: caça com Sigma, baselining, behavioral analytics | skill | threat-hunting, sigma, hipotese, hunt, baseline | Discovery / Defense Evasion (58 skills) | `skills/analyzing-apt-group-with-mitre-navigator/SKILL.md` (58) |
| G3 | Threat intelligence: IOC, atribuição de campanha, MITRE Navigator, Malpedia, kill chain, diamond model | skill | threat-intel, ioc, atribuicao, apt, malpedia, killchain | Resource Development / Recon (52 skills) | `skills/analyzing-indicators-of-compromise/SKILL.md` (52) |
| G4 | Network security: análise de pacotes (Wireshark/Scapy), NetFlow, canais cobertos, DNS exfil | skill | rede, pcap, wireshark, scapy, netflow, dns, c2 | Command & Control / Exfiltration (43 skills) | `skills/analyzing-network-traffic-with-wireshark/SKILL.md` (43) |
| G5 | Web application security: OWASP Top 10, exploração e defesa de webapps, API gateway logs | skill | web, owasp, xss, sqli, ssrf, appsec-web | Initial Access / Execution (42 skills) | `skills/analyzing-api-gateway-access-logs/SKILL.md` (42) |
| G6 | Digital forensics & DFIR: Volatility, Autopsy, MFT, LNK/jumplist, imagem de disco (dd/dcfldd), browser forensics | skill | dfir, forense, volatility, autopsy, mft, memoria, disco | Collection / Discovery (41 skills) | `skills/analyzing-memory-dumps-with-volatility/SKILL.md` (41) |
| G7 | Malware analysis: reversing (Ghidra), sandbox (Cuckoo), config de C2 (Cobalt Strike beacon/malleable), ELF/Go/Android malware, evasão de sandbox | skill | malware, reversing, ghidra, cuckoo, cobaltstrike, yara | Execution / Defense Evasion (39 skills) | `skills/analyzing-cobalt-strike-beacon-configuration/SKILL.md` (39) |
| G8 | Identity & Access Management: AD ACL abuse, Kerberos, shadow credentials, IAM hardening (consolida iam+identity-security variantes) | skill | iam, active-directory, kerberos, acl, identidade, privesc | Credential Access / Privilege Escalation (~43 skills) | `skills/analyzing-active-directory-acl-abuse/SKILL.md` (37+6 variantes) |
| G9 | SOC operations & security operations: detection engineering, SIEM, triagem, runbooks (consolida soc-operations+security-operations) | skill | soc, siem, deteccao, alerta, runbook, blue-team | Cross-tactic / Detection (63 skills) | `skills/analyzing-linux-audit-logs-for-intrusion/SKILL.md` (35+28) |
| G10 | **Red teaming / offensive (DUAL-USE)**: C2 (Sliver/Havoc), exploração de AD (Zerologon/NoPac/Kerberoast/ESC1-8), lateral movement, OSINT ofensivo, eng. social (consolida red-teaming+red-team+offensive+purple) | skill+ferramenta | red-team, c2, exploit, ad, lateral, osint | Initial Access→Impact (38 skills) | `skills/conducting-full-scope-red-team-engagement/SKILL.md` (33+5) |
| G11 | Container & Kubernetes security: forense de container Docker, auditoria de K8s, hardening | skill | container, docker, kubernetes, k8s, runtime | Execution / Persistence (33 skills) | `skills/analyzing-docker-container-forensics/SKILL.md` (33) |
| G12 | OT/ICS/SCADA security: protocolos industriais, defesa de OT (consolida ot-ics+ot-security) | skill | ot, ics, scada, industrial, modbus | Impact / Discovery (29 skills) | `skills/` (ot-ics-security) (28+1) |
| G13 | API security: autenticação, autorização, abuso de API, gateway | skill | api, oauth, jwt, rest, gateway, rate-limit | Initial Access / Credential Access (28 skills) | `skills/analyzing-api-gateway-access-logs/SKILL.md` (28) |
| G14 | Incident response: playbooks de contenção/erradicação/recuperação, escopo de incidente | skill | ir, incidente, contencao, playbook, recuperacao | Cross-tactic / Response (26 skills) | `skills/` (incident-response) (26) |
| G15 | Vulnerability management: scanning, triagem, priorização (CVSS/EPSS), remediação | skill | vuln, cve, cvss, scanning, remediacao | Discovery / Other (25 skills) | `skills/` (vulnerability-management) (25) |
| G16 | **Penetration testing (DUAL-USE)**: metodologia de pentest, privesc Linux, recon interno (BloodHound) | skill+ferramenta | pentest, privesc, recon, bloodhound, engagement | Initial Access→Lateral (21 skills) | `skills/conducting-internal-reconnaissance-with-bloodhound-ce/SKILL.md` (21) |
| G17 | DevSecOps: segurança de CI/CD, SAST/DAST, IaC scanning, pipeline hardening | skill | devsecops, cicd, sast, dast, iac, pipeline | Resource Development / Other (18 skills) | `skills/` (devsecops) (18) |
| G18 | Zero-trust architecture: microsegmentação, política de acesso, verificação contínua (consolida zero-trust variantes) | skill | zero-trust, ztna, microsegmentacao, beyondcorp | Cross-tactic / Architecture (18 skills) | `skills/` (zero-trust-architecture) (17+1) |
| G19 | Endpoint security & EDR: detecção em endpoint, autoruns/persistência, telemetria | skill | endpoint, edr, autoruns, persistencia, telemetria | Persistence / Defense Evasion (17 skills) | `skills/analyzing-malware-persistence-with-autoruns/SKILL.md` (17) |
| G20 | Cryptography: análise criptográfica, gestão de chaves, auditoria de implementação cripto | skill | cripto, tls, chaves, cifras, pki | Credential Access / Other (16 skills) | `skills/` (cryptography) (16) |
| G21 | Phishing & social-engineering defense: análise de cabeçalhos de e-mail, cert transparency p/ phishing, URL maliciosa (consolida phishing+se-defense) | skill | phishing, email, urlscan, cert-transparency, se | Initial Access / Recon (16 skills) | `skills/analyzing-email-headers-for-phishing-investigation/SKILL.md` (15+1) |
| G22 | AI security: MITRE ATLAS, auditoria de MCP servers (tool poisoning), segurança de LLM/agentes | skill | ai-security, atlas, mcp, llm, tool-poisoning, prompt-injection | AI/ML (ATLAS) (14 skills) | `skills/auditing-mcp-servers-for-tool-poisoning/SKILL.md` (14) |
| G23 | Ransomware defense: detecção, contenção, recuperação, análise de família de ransomware | skill | ransomware, criptografia-maliciosa, recuperacao, ransomlook | Impact / Response (13 skills) | `skills/` (ransomware-defense) (13) |
| G24 | Mobile security: iOS (objection), Android (apktool), análise de app mobile | skill | mobile, ios, android, apktool, objection, frida | Execution / Collection (13 skills) | `skills/analyzing-android-malware-with-apktool/SKILL.md` (13) |
| G25 | Compliance & governance: CMMC L2, NIST SP 800-171, SPRS, privacidade/LGPD-GDPR (consolida compliance+privacy+grc+data-protection) | skill | compliance, cmmc, nist-800-171, sprs, gdpr, governanca | Governance (13 skills) | `skills/achieving-cmmc-level-2-compliance/SKILL.md` (9+4) |
| G26 | Supply-chain security: SBOM (syft/grype), análise de malware em dependências, artefatos | skill | supply-chain, sbom, syft, grype, dependencias | Resource Development (8 skills) | `skills/analyzing-sbom-for-supply-chain-vulnerabilities/SKILL.md` (8) |
| G27 | Detection engineering (threat-detection): autoria de regras de detecção, fidelidade de alerta | skill | deteccao, regras, sigma, fidelidade, fp | Detection (7 skills) | `skills/` (threat-detection) (7) |
| G28 | Deception technology: honeypots, honeytokens, canários | skill | deception, honeypot, honeytoken, canary | Defense / Discovery (6 skills) | `skills/` (deception-technology) (6) |
| G29 | Hardware/firmware security: análise de firmware, segurança de hardware (consolida hw-firmware variantes) | skill | firmware, hardware, uefi, bootkit, jtag | Persistence / Defense Evasion (6 skills) | `skills/analyzing-bootkit-and-rootkit-samples/SKILL.md` (4+2) |
| G30 | Application security (genérica): threat modeling, secure SDLC, code review de segurança | skill | appsec, threat-modeling, sdlc, secure-coding | Other / Resource Dev (4 skills) | `skills/` (application-security) (4) |
| G31 | Wireless security: análise/defesa wifi, ataques de rede sem fio | skill | wireless, wifi, wpa, rogue-ap, rf | Initial Access / Discovery (2 skills) | `skills/` (wireless-security) (2) |
| G32 | Blockchain security: vulns de smart contract (Foundry), análise Ethereum | skill | blockchain, smart-contract, ethereum, foundry, solidity | Other (2 skills) | `skills/analyzing-ethereum-smart-contract-vulnerabilities/SKILL.md` (2) |
| G33 | **Infra do repo (não-capacidade-alvo)**: validador de frontmatter (`tools/validate-skill.py`), mapeamentos cross-framework (`mappings/`, `index.json`), `attack-navigator-layer.json` | referencia | validador, index, mitre-navigator, mapping | meta/repo | `tools/validate-skill.py`; `mappings/README.md` |

**Total:** 817 skills consolidadas em **32 clusters de capacidade** (G1–G32) + 1 cluster de
infra do repo (G33). Camada absorvível = método (SKILL.md). Camada **não-absorvível** = os
~1093 `scripts/*.py` ofensivos/dual-use (G10/G16 e os helpers de exploração espalhados),
inventariados como ferramenta executável de ataque e barrados na absorção.
