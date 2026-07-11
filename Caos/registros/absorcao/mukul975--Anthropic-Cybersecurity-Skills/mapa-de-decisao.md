---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/mukul975--Anthropic-Cybersecurity-Skills/inventario-de-capacidades|inventario-de-capacidades]]"
  - "[[Caos/registros/absorcao/mukul975--Anthropic-Cybersecurity-Skills/seguranca|seguranca]]"
---

# F4 — Mapa de decisão (REUSE / ADAPT / CREATE)

- **slug:** `mukul975--Anthropic-Cybersecurity-Skills` · **sha:** `673da1f3b0b7be34ffc9624ef3858fe45f1c3bed` · **rota:** A

> **Base de comparação.** Único squad equivalente no registro: **`egide`** (`Egide/`, 15 agentes,
> origem `ohmyjahh/xquads-squads`). Propósito declarado: "pentest, AppSec, blue team, OSINT,
> resposta a incidente". Agentes reais (georgia-weidman, jim-manico, omar-santos, peter-kim,
> marcus-carey, chris-sanders + funcionais busterer/dirber/fuzzer/ripper/rogue/cartographer/
> shannon-runner/command-generator) confirmam foco **ofensivo + AppSec + blue-team**, com
> `security-tools-catalog.yaml` e `routing-catalog.yaml`. A biblioteca cobre **29 domínios** —
> muito além do escopo atual da Egide. **Viés da missão:** sem match item-a-item, prefiro
> ADAPT/CREATE a REUSE. Nenhuma skill PT-BR equivalente existe no registro → **zero REUSE**.

| ID | decisao | squad-alvo | justificativa(1 linha) |
|---|---|---|---|
| G1 | CREATE | egide (novo eixo cloud) | Egide não tem trilha cloud multi-provider (AWS/Azure/GCP/O365); vira novo conjunto de skills/especialista cloud-security. |
| G2 | ADAPT | egide | Threat hunting reforça o blue-team da Egide; entra como skills de caça orientada a hipótese + Sigma. |
| G3 | CREATE | egide (novo eixo CTI) | Threat intelligence (IOC/atribuição/Navigator) é capacidade ausente; candidata a especialista de CTI. |
| G4 | ADAPT | egide | Network security (pcap/NetFlow/DNS exfil) amplia detecção de rede da Egide. |
| G5 | ADAPT | egide | Web/AppSec já é core (jim-manico); absorve como novas skills OWASP/API-web reescritas. |
| G6 | CREATE | egide (novo eixo DFIR) | Forense digital (Volatility/Autopsy/MFT) é profundidade que a Egide não possui hoje. |
| G7 | CREATE | egide (novo eixo malware) | Análise de malware/reversing (Ghidra/Cuckoo/C2 config) ausente; candidata a especialista de malware. |
| G8 | ADAPT | egide | AD/Kerberos/IAM dialoga com o lado ofensivo da Egide (peter-kim); entra como skills de IAM/AD. |
| G9 | ADAPT | egide | SOC/SIEM/detection consolida e formaliza o blue-team existente (chris-sanders). |
| G10 | ADAPT | egide | Red-team/C2/AD exploit casa com a alma ofensiva da Egide — **só o MÉTODO** (SKILL.md); scripts dual-use ficam vendor/excluídos. |
| G11 | CREATE | egide (novo eixo container) | Segurança de container/K8s (forense + hardening) ausente no roster atual. |
| G12 | CREATE | egide (novo eixo OT/ICS) | OT/ICS/SCADA é domínio especializado inexistente; candidata a especialista próprio. |
| G13 | ADAPT | egide | API security complementa o AppSec já presente; novas skills de auth/abuso de API. |
| G14 | ADAPT | egide | Resposta a incidente já está no propósito da Egide; absorve playbooks estruturados. |
| G15 | ADAPT | egide | Gestão de vulnerabilidade (scanning/triagem/CVSS) reforça fluxo já tocado pela Egide. |
| G16 | ADAPT | egide | Pentest é core da Egide (georgia-weidman/peter-kim); absorve metodologia — scripts dual-use excluídos. |
| G17 | ADAPT | egide + prometeu | DevSecOps (SAST/DAST/IaC) cruza Egide (segurança) e Prometeu (eng/spec-driven, já tem coderabbit/SAST). |
| G18 | CREATE | egide (novo eixo ZTA) | Zero-trust architecture é tema arquitetural ausente; vira skills de design ZTA. |
| G19 | ADAPT | egide | Endpoint/EDR/persistência reforça blue-team/forense leve da Egide. |
| G20 | ADAPT | egide | Criptografia/PKI entra como skills de auditoria cripto sob AppSec. |
| G21 | ADAPT | egide | Defesa contra phishing (headers/cert-transparency/urlscan) amplia OSINT/blue-team. |
| G22 | ADAPT | egide + dedalo | AI-security/ATLAS e **auditoria de MCP (tool poisoning/prompt injection)** — altíssima relevância p/ a própria Kolden (Dedalo opera Claude Code/MCPs; Egide audita). |
| G23 | ADAPT | egide | Defesa anti-ransomware consolida detecção+IR existentes. |
| G24 | CREATE | egide (novo eixo mobile) | Segurança mobile (iOS/Android/objection/apktool) ausente no roster. |
| G25 | CREATE | egide (novo eixo GRC) | Compliance/CMMC/NIST-800-171/LGPD é governança ausente; candidata a especialista GRC. |
| G26 | ADAPT | egide | Supply-chain/SBOM (syft/grype) cruza DevSecOps; entra como skills de cadeia de suprimentos. |
| G27 | ADAPT | egide | Detection engineering formaliza autoria de regras junto ao SOC (G9). |
| G28 | CREATE | egide (novo eixo deception) | Tecnologia de deception (honeypots/honeytokens) é capacidade nova e pequena. |
| G29 | CREATE | egide (novo eixo firmware) | Segurança de hardware/firmware (bootkit/UEFI) é nicho ausente. |
| G30 | ADAPT | egide | AppSec genérico (threat modeling/secure SDLC) reforça o eixo AppSec da Egide. |
| G31 | ADAPT | egide | Wireless security (2 skills) entra como skills pontuais de rede sem fio. |
| G32 | CREATE | egide (novo eixo blockchain) | Segurança de smart contract (Foundry/Ethereum) é domínio novo e isolado. |
| G33 | REUSE-parcial / referencias | referencias + caos-fabrica | Validador de frontmatter e mapeamentos cross-framework são **infra**, não capacidade; o `attack-navigator-layer.json` e `index.json` servem como dado de referência inerte; o padrão `SKILL.md` já é dominado pela fábrica (`criacao-de-skill`). |

## Síntese da decisão

- **Decisão dominante:** **ADAPT** (Egide é o destino natural de quase tudo), com forte
  componente **CREATE** (12 novos eixos que a Egide hoje não cobre: cloud, CTI, DFIR, malware,
  container, OT/ICS, ZTA, mobile, GRC, deception, firmware, blockchain).
- **Zero REUSE real:** não há skill PT-BR equivalente registrada; trazer como REUSE seria perda
  silenciosa (viés da missão respeitado). G33 é o único REUSE-parcial (infra/padrão já dominado).
- **Recomendação para a fase seguinte (F5/F6):** a Egide cresce de squad ofensivo/AppSec para
  um **squad de cibersegurança full-spectrum**. Volume alto (817 skills → 32 clusters) pede
  absorção **incremental por cluster**, priorizando os de maior alavancagem para a Kolden:
  **G22 (AI-security/MCP)** primeiro (defende a própria infra de agentes), depois G1/G6/G7/G3
  (cloud, DFIR, malware, CTI). Toda reescrita em PT-BR, sem cópia literal; **scripts ofensivos
  ficam de fora** (não-absorvíveis, ver `seguranca.md`).
