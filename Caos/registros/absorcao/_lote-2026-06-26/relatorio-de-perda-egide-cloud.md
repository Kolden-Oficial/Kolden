---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/_lote-2026-06-26/_indice|_indice]]"
---

# Relatório de reconciliação — Égide / bucket cloud (F6.5)

- **squad-alvo:** Égide (`C:/Kolden/Egide/`)
- **repo-fonte:** `mukul975/Anthropic-Cybersecurity-Skills@673da1f` (Apache-2.0)
- **bucket:** segurança de infraestrutura cloud — clusters G1, G11, G8, G18
- **modo:** aplicação exaustiva F6 (dual-use barrado: só MÉTODO defensivo absorvido)
- **invariante:** ABSORVIDO + DESCARTADO + DIFERIDO-INCREMENTAL = total do escopo; **PERDIDO = 0**

## Âncoras aplicadas (1 linha por cluster)

| repo | ID | cluster | disposicao | destino |
|---|---|---|---|---|
| mukul975 | G1 | cloud security multi-provider (AWS/Azure/GCP/O365) | ABSORVIDO | `Egide/.claude/skills/seguranca-de-cloud-multi-provider/SKILL.md` |
| mukul975 | G11 | container & Kubernetes security | ABSORVIDO | `Egide/.claude/skills/seguranca-de-containers-e-kubernetes/SKILL.md` |
| mukul975 | G8 | identity & access management (IAM/AD/PAM) | ABSORVIDO | `Egide/.claude/skills/gestao-de-identidade-e-acesso-iam/SKILL.md` |
| mukul975 | G18 | zero-trust architecture (ZTA) | ABSORVIDO | `Egide/.claude/skills/arquitetura-zero-trust-zta/SKILL.md` |

**4 clusters-âncora absorvidos → 4 skills PT-BR novas.** Nenhuma duplica as 5 skills pré-existentes
da Égide (auditoria-de-seguranca-de-ia-e-mcp, escrita-segura-e-dlp,
forense-digital-e-resposta-a-incidente, inteligencia-de-ameacas-cti, scanner-anti-injecao-resiliente).

## DESCARTADO (não absorvível — barrado por política dual-use)

| repo | item | motivo |
|---|---|---|
| mukul975 | G1: `exploiting-aws-with-pacu`, `enumerating-cloud-with-cloudfox` (ataque), `emulating-cloud-attacks-with-stratus-red-team`, `conducting-cloud-penetration-testing` | scripts/método ofensivo de nuvem; só a contraparte defensiva (CSPM/detecção) foi absorvida |
| mukul975 | G11: `escaping-containers-to-host`, `performing-kubernetes-penetration-testing`, `auditing-kubernetes-rbac-privilege-escalation` (vertente ataque) | container escape / pentest de cluster ofensivo |
| mukul975 | G8: `exploiting-active-directory-with-bloodhound`, `exploiting-active-directory-certificate-services-esc1`, `attacking-oauth-with-device-code-phishing`, `performing-active-directory-forest-trust-attack`, `executing-active-directory-attack-simulation`, demais `exploiting-*`/`attacking-*`/`performing-*-attack` | exploração ofensiva de diretório/identidade; só hardening + detecção absorvidos |
| mukul975 | scripts `scripts/*.py` ofensivos dos clusters acima | camada ferramenta-executável-de-ataque, barrada na absorção (ver `seguranca.md` do dossiê) |

## DIFERIDO-INCREMENTAL (registrado nas próprias skills + aqui; não aplicado nesta leva)

| cluster | sub-itens adiados | motivo |
|---|---|---|
| G1 | building-cloud-siem-with-sentinel, AWS Config Rules detalhado, Macie/DLP, Nitro Enclaves, conducting-cloud-incident-response | profundidade incremental; núcleo (CIS + storage + IAM + detecção de log) já cobre o eixo |
| G11 | Aqua/Sysdig comerciais, securing-helm-chart-deployments, registry hardening avançado, CIS de EKS/GKE/AKS gerenciado | refinamento; método base (hardening + RBAC + PSA + netpol + Falco) entregue |
| G8 | Entra PIM detalhado, identity federation SAML+Azure AD passo a passo, privileged session monitoring avançado, AD honeytokens, SCIM passo a passo | sub-receitas específicas de produto; método de IAM/AD/PAM/IGA já consolidado |
| G18 | browser isolation, zero-trust DNS (NextDNS), Tailscale ZT-VPN, ZT para SaaS específico, IAP com Google passo a passo | variações de produto; os 5 pilares CISA + ZTNA + microsegmentação + posture + mTLS já cobrem o arquitetural |

## Síntese
- **PERDIDO = 0.** Todo cluster do escopo tem disposição explícita: 4 ABSORVIDO, vertentes ofensivas
  DESCARTADO por dual-use, refinamentos DIFERIDO-INCREMENTAL (e registrados na seção "Incremental"
  de cada SKILL.md).
- **Não tocado** (consolidação posterior, conforme instrução): `catalogo.md`, `squad.yaml`,
  `MEMORY.md` da Égide.
- Demais clusters do repo (G2–G7, G9–G10, G12–G17, G19–G33) estão fora deste bucket e serão tratados
  por outras levas/subagentes — não são perda deste relatório.
