# F3 — Inventário de capacidades · `msitarzewski--agency-agents@a597cb6` — divisão `security/`

Granularidade: 1 base por agente + técnicas transferíveis salientes. Total: 10 (bases) + 25 (técnicas) = 35 IDs.

| ID | capacidade | tipo | keywords | dominio | fonte(arquivo:linha) |
|---|---|---|---|---|---|
| G1 | Threat modeling com STRIDE e PASTA para identificar riscos antes de desenvolvimento | agente | threat-modeling, STRIDE, PASTA, risk-identification, secure-design | security | security/agents/security-appsec-engineer.md:22-27 |
| G2 | Code review seguro com foco em OWASP Top 10, CWE Top 25 e padrões framework-específicos | agente | code-review, OWASP, CWE, vulnerability-detection, secure-coding | security | security/agents/security-appsec-engineer.md:29-33 |
| G3 | Integração SAST/DAST/SCA em CI/CD com tunagem de false positives (<20%) | agente | SAST, DAST, SCA, CI/CD, pipeline-security | security | security/agents/security-appsec-engineer.md:35-39 |
| G4 | Educação de segurança de desenvolvedores com secure coding patterns | agente | developer-training, secure-coding, security-champions, knowledge-transfer | security | security/agents/security-appsec-engineer.md:41-45 |
| G5 | Gerenciamento de vulnerabilidades de dependências com SLA por severidade | skill | dependency-scanning, npm-audit, pip-audit, vulnerability-management | security | security/agents/security-appsec-engineer.md:186-331 |
| G6 | Arquitetura de segurança com zero-trust, defense-in-depth e modelo de confiança | agente | zero-trust, defense-in-depth, architecture-design, trust-boundaries | security | security/agents/security-architect.md:43-49 |
| G7 | STRIDE analysis sistemática de componentes e trust boundaries | skill | STRIDE, threat-analysis, attack-surface, risk-assessment, systematic-review | security | security/agents/security-architect.md:103-111 |
| G8 | Supply chain security com SBOM, verificação de integridade e detecção de typosquatting | skill | SBOM, supply-chain-security, dependency-integrity, CycloneDX, package-verification | security | security/agents/security-architect.md:51-56 |
| G9 | Auditoria de smart contracts com análise de reentrância, overflow/underflow, oracle manipulation | agente | smart-contract-audit, reentrancy, formal-verification, exploit-analysis | security | security/agents/security-blockchain-security-auditor.md:22-27 |
| G10 | Análise formal com Slither, Mythril, Echidna e property-based testing | skill | formal-verification, symbolic-execution, fuzz-testing, Slither, Mythril | security | security/agents/security-blockchain-security-auditor.md:29-32 |
| G11 | Detecção de access control flaws e escalação de privilégios em contratos | skill | access-control-audit, privilege-escalation, RBAC-verification, initialization-checks | security | security/agents/security-blockchain-security-auditor.md:172-199 |
| G12 | Arquitetura de zero-trust multi-cloud com IAM e segmentação de rede | agente | zero-trust-cloud, multi-cloud-security, IAM-design, network-segmentation | security | security/agents/security-cloud-security-architect.md:22-26 |
| G13 | Orquestração de múltiplas contas AWS/Azure/GCP com SCPs e políticas centralizadas | skill | AWS-SCP, Azure-policy, GCP-policy, organization-guardrails, policy-as-code | security | security/agents/security-cloud-security-architect.md:70-240 |
| G14 | Kubernetes security com network policies e pod security standards | skill | Kubernetes-security, network-policies, pod-security, container-segmentation | security | security/agents/security-cloud-security-architect.md:242-324 |
| G15 | CI/CD pipeline security com OIDC federation e scanning de IaC/secrets/containers | skill | CI-CD-security, OIDC-federation, IaC-scanning, secrets-detection, GitHub-Actions | security | security/agents/security-cloud-security-architect.md:326-389 |
| G16 | Avaliação de conformidade contra SOC 2, ISO 27001, HIPAA e PCI-DSS | agente | compliance-audit, SOC2, ISO27001, HIPAA, PCI-DSS, readiness-assessment | security | security/agents/security-compliance-auditor.md:20-39 |
| G17 | Gap assessment com mapa de controles para múltiplos frameworks | skill | gap-assessment, control-mapping, compliance-roadmap, risk-prioritization | security | security/agents/security-compliance-auditor.md:62-88 |
| G18 | Coleta automatizada de evidência com matriz de controls e auditoria interna | skill | evidence-collection, control-validation, audit-trails, automation, audit-matrix | security | security/agents/security-compliance-auditor.md:89-100 |
| G19 | Resposta a incidentes com triage de severidade e cadeia de custódia forense | agente | incident-response, forensics, triage, evidence-handling, IR-playbooks | security | security/agents/security-incident-responder.md:20-45 |
| G20 | Análise forense de memória e coleta volátil com preservação de evidência | skill | memory-forensics, volatile-data, Windows-forensics, Linux-forensics, Volatility | security | security/agents/security-incident-responder.md:70-289 |
| G21 | Classificação de severidade SEV1-SEV4 e coordenação de crise em tempo real | skill | incident-severity, crisis-coordination, escalation-procedures, war-room-management | security | security/agents/security-incident-responder.md:291-340 |
| G22 | Teste de penetração com reconhecimento, exploitation e lateral movement | agente | penetration-testing, red-team, vulnerability-exploitation, attack-chains | security | security/agents/security-penetration-tester.md:20-44 |
| G23 | Enumeração de superfície de ataque com OSINT e descoberta de assets | skill | OSINT, asset-discovery, attack-surface-mapping, passive-reconnaissance | security | security/agents/security-penetration-tester.md:69-110 |
| G24 | Exploitation de Active Directory com Kerberoasting, pass-the-hash, DCSync | skill | AD-attacks, Kerberoasting, lateral-movement, domain-compromise, BloodHound | security | security/agents/security-penetration-tester.md:222-268 |
| G25 | Pivoting e tunelamento (SSH, Chisel, Ligolo) para movimento de rede | skill | network-pivoting, tunneling, SOCKS-proxy, traffic-redirection, port-forwarding | security | security/agents/security-penetration-tester.md:270-312 |
| G26 | Scanning de segurança com verificação automática de secrets e padrões CRITICAL | agente | secrets-scanning, SAST, vulnerability-detection, pre-commit-security | security | security/agents/security-senior-secops.md:22-170 |
| G27 | Validação de JWT com pinning de algoritmo e rejeição de "alg:none" | skill | JWT-validation, algorithm-pinning, token-security, algorithm-confusion-prevention | security | security/agents/security-senior-secops.md:90-100 |
| G28 | Configuração segura de cookies HttpOnly/Secure/SameSite e storage de tokens | skill | cookie-security, token-storage, XSS-prevention, CSRF-protection, browser-security | security | security/agents/security-senior-secops.md:213-420 |
| G29 | Rate limiting de auth endpoints e proteção contra brute force | skill | rate-limiting, auth-protection, brute-force-defense, HTTP-429, DDoS-mitigation | security | security/agents/security-senior-secops.md:480-514 |
| G30 | Desenvolvimento de regras de detecção Sigma compiláveis a Splunk/Sentinel/Elastic | agente | Sigma-rules, SIEM-rules, detection-engineering, threat-detection | security | security/agents/security-threat-detection-engineer.md:68-166 |
| G31 | Mapeamento de cobertura MITRE ATT&CK com identificação de gaps críticos | skill | MITRE-ATT&CK, coverage-assessment, gap-analysis, technique-mapping | security | security/agents/security-threat-detection-engineer.md:168-212 |
| G32 | Threat hunting hypothesis-driven com hunts estruturadas e conversão para detections | skill | threat-hunting, hunt-playbooks, IOC-analysis, retroactive-scanning, anomaly-detection | security | security/agents/security-threat-detection-engineer.md:344-397 |
| G33 | Análise de inteligência de ameaças com atribuição de adversários e perfil de TTPs | agente | threat-intelligence, adversary-tracking, campaign-analysis, attribution | security | security/agents/security-threat-intelligence-analyst.md:20-44 |
| G34 | Desenvolvimento de regras YARA para detecção de malware e payloads | skill | YARA-rules, malware-detection, payload-analysis, signature-writing, file-inspection | security | security/agents/security-threat-intelligence-analyst.md:70-164 |
| G35 | Enriquecimento de IOCs com correlação de contexto e clustering de infraestrutura | skill | IOC-enrichment, indicator-correlation, infrastructure-analysis, passive-DNS, STIX | security | security/agents/security-threat-intelligence-analyst.md:343-557 |

**Total: 35 capacidades (G1–G35).**

## Resumo por agente upstream

- **Application Security Engineer** (appsec-engineer.md): G1, G2, G3, G4, G5 — especialista em secure SDLC, code review e educação de desenvolvedores
- **Security Architect** (architect.md): G6, G7, G8 — designer de arquitetura segura com threat modeling e supply chain security
- **Blockchain Security Auditor** (blockchain-security-auditor.md): G9, G10, G11 — especialista em auditoria de smart contracts e formal verification
- **Cloud Security Architect** (cloud-security-architect.md): G12, G13, G14, G15 — arquiteto de zero-trust multi-cloud e CI/CD security
- **Compliance Auditor** (compliance-auditor.md): G16, G17, G18 — especialista em conformidade SOC 2, ISO 27001, HIPAA, PCI-DSS
- **Incident Responder** (incident-responder.md): G19, G20, G21 — coordenador de resposta a incidentes e análise forense
- **Penetration Tester** (penetration-tester.md): G22, G23, G24, G25 — red-teamer com foco em reconhecimento e exploitation
- **Senior SecOps Engineer** (senior-secops.md): G26, G27, G28, G29 — guardião de segurança de aplicação e validação de secrets
- **Threat Detection Engineer** (threat-detection-engineer.md): G30, G31, G32 — engenheiro de detecção com Sigma, ATT&CK coverage e threat hunting
- **Threat Intelligence Analyst** (threat-intelligence-analyst.md): G33, G34, G35 — analista de inteligência de ameaças, YARA e IOC enrichment
