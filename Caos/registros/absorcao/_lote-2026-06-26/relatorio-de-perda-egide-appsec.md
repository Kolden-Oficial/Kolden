# Relatório de perda (F6.5) — Égide / bucket AppSec e ofensiva (método)

- **squad-alvo:** `Egide` (`C:/Kolden/Egide/`)
- **repo-fonte:** `mukul975/Anthropic-Cybersecurity-Skills@673da1f3` (Apache-2.0)
- **dossiê:** `Caos/registros/absorcao/mukul975--Anthropic-Cybersecurity-Skills/`
- **data:** 2026-06-27
- **invariante:** count(ABSORVIDO) + count(DESCARTADO) + count(DIFERIDO) cobre todo o escopo do bucket; PERDIDO = 0.

## Âncoras aplicadas

| repo | ID | cluster | disposicao | destino |
|---|---|---|---|---|
| mukul975--Anthropic-Cybersecurity-Skills | G5 | Web app security / OWASP Top 10 | ABSORVIDO | `Egide/.claude/skills/seguranca-de-aplicacoes-web-owasp/SKILL.md` |
| mukul975--Anthropic-Cybersecurity-Skills | G13 | API security | ABSORVIDO | `Egide/.claude/skills/seguranca-de-api/SKILL.md` |
| mukul975--Anthropic-Cybersecurity-Skills | G15 | Vulnerability management (CVSS/EPSS) | ABSORVIDO | `Egide/.claude/skills/gestao-de-vulnerabilidades-priorizacao/SKILL.md` |
| mukul975--Anthropic-Cybersecurity-Skills | G16 | Penetration testing (metodologia) | ABSORVIDO (só método/PTES) | `Egide/.claude/skills/metodologia-de-pentest-ptes/SKILL.md` |
| mukul975--Anthropic-Cybersecurity-Skills | G17 | DevSecOps SAST/DAST | ABSORVIDO | `Egide/.claude/skills/devsecops-sast-dast-em-ci/SKILL.md` |
| mukul975--Anthropic-Cybersecurity-Skills | G20 | Cryptography | ABSORVIDO | `Egide/.claude/skills/criptografia-aplicada/SKILL.md` |

**Aportes secundários incorporados nas skills acima (sem skill própria, citados no rodapé de cada uma):**
- G30 (threat modeling / secure SDLC) → dentrou em `seguranca-de-aplicacoes-web-owasp` (fase de modelagem STRIDE).
- G26 (SBOM / supply-chain) → dentro de `devsecops-sast-dast-em-ci` (estágio SCA/SBOM).

## Coordenação de sobreposições
- **SSRF / misconfig**: tratados em `seguranca-de-aplicacoes-web-owasp` e referenciados (não duplicados) por `seguranca-de-api`.
- **Triagem de achados (CVSS/EPSS/SLA)**: centralizada em `gestao-de-vulnerabilidades-priorizacao`; `metodologia-de-pentest-ptes` e `devsecops-sast-dast-em-ci` apontam para ela em vez de repetir.
- **Validação de JWT/token e A02 Crypto Failures**: apontam para `criptografia-aplicada` a partir de web e API.
- **Secret-scan**: `devsecops-sast-dast-em-ci` cobre credencial em pipeline; distinto de `scanner-anti-injecao-resiliente` (prompt injection — já existente), explicitado para não colidir.
- **Sem duplicar skills existentes**: `scanner-anti-injecao-resiliente` e `auditoria-de-seguranca-de-ia-e-mcp` (cluster G22) não foram tocadas.

## Restrição dual-use aplicada
Todas as 6 skills entregam **metodologia + defesa** (como testar/corrigir). Nenhum exploit, payload ofensivo ou comando de ataque foi importado. G16 (pentest) foi absorvido **apenas como camada de método/PTES**; a camada técnica ofensiva e os ~1093 `scripts/*.py` dual-use do repo permanecem **não-absorvíveis** (barrados conforme `seguranca.md` do dossiê).

## INCREMENTAL (não aplicado nesta leva)

Demais clusters do repo (817 skills → 32 clusters) ficam **DIFERIDO-INCREMENTAL**, alinhado ao princípio anti-exaustão (3–8 âncoras por bucket) e à recomendação F4/F5 de absorção incremental por cluster:

| ID | cluster | disposicao | motivo |
|---|---|---|---|
| G1 | Cloud security multi-provider | DIFERIDO-INCREMENTAL | novo eixo (CREATE) cloud — fora do bucket AppSec; alta prioridade futura |
| G2 | Threat hunting | DIFERIDO-INCREMENTAL | eixo blue-team — outro bucket |
| G3 | Threat intelligence / CTI | DIFERIDO-INCREMENTAL | já absorvido em parte por skill CTI existente; expansão futura |
| G4 | Network security | DIFERIDO-INCREMENTAL | eixo rede — outro bucket |
| G6 | DFIR / forense | DIFERIDO-INCREMENTAL | coberto por `forense-digital-e-resposta-a-incidente` (existente) |
| G7 | Malware analysis | DIFERIDO-INCREMENTAL | novo eixo (CREATE) malware/reversing |
| G8 | IAM / Active Directory | DIFERIDO-INCREMENTAL | eixo identidade — incremental |
| G9 | SOC / SIEM / detection | DIFERIDO-INCREMENTAL | eixo blue-team — outro bucket |
| G10 | Red teaming / offensive | DESCARTADO (camada ofensiva) / DIFERIDO (método) | scripts dual-use barrados; método só se houver bucket ofensivo-defensivo dedicado |
| G11 | Container / K8s security | DIFERIDO-INCREMENTAL | novo eixo (CREATE) container |
| G12 | OT/ICS/SCADA | DIFERIDO-INCREMENTAL | novo eixo (CREATE) OT |
| G14 | Incident response | DIFERIDO-INCREMENTAL | coberto em parte por skill DFIR/IR existente |
| G18 | Zero-trust architecture | DIFERIDO-INCREMENTAL | novo eixo (CREATE) ZTA |
| G19 | Endpoint / EDR | DIFERIDO-INCREMENTAL | eixo endpoint — incremental |
| G21 | Phishing / SE defense | DIFERIDO-INCREMENTAL | eixo OSINT/blue-team |
| G22 | AI security / MCP | ABSORVIDO (leva anterior) | já em `auditoria-de-seguranca-de-ia-e-mcp` + `scanner-anti-injecao-resiliente` |
| G23 | Ransomware defense | DIFERIDO-INCREMENTAL | consolida IR/detecção — incremental |
| G24 | Mobile security | DIFERIDO-INCREMENTAL | novo eixo (CREATE) mobile |
| G25 | Compliance / GRC | DIFERIDO-INCREMENTAL | novo eixo (CREATE) GRC |
| G27 | Detection engineering | DIFERIDO-INCREMENTAL | eixo SOC — outro bucket |
| G28 | Deception technology | DIFERIDO-INCREMENTAL | novo eixo (CREATE) deception |
| G29 | Hardware / firmware | DIFERIDO-INCREMENTAL | novo eixo (CREATE) firmware |
| G31 | Wireless security | DIFERIDO-INCREMENTAL | eixo rede sem fio — incremental |
| G32 | Blockchain security | DIFERIDO-INCREMENTAL | novo eixo (CREATE) blockchain |
| G33 | Infra do repo (validador/mappings) | DESCARTADO | infra/padrão já dominado pela fábrica (`criacao-de-skill`); dado inerte de referência |

**Não-absorvível (DESCARTADO permanente):** ~1093 `scripts/*.py` ofensivos/dual-use (exploração, C2, privesc) — barrados na absorção por política de segurança (`seguranca.md`). Não são perda: são exclusão registrada.

## Reconciliação
- Âncoras do bucket AppSec aplicadas: **6** (G5, G13, G15, G16, G17, G20) → 6 skills ABSORVIDO.
- Aportes secundários incorporados: 2 (G30, G26).
- Diferido-incremental: 23 clusters. Descartado: G10 (ofensivo) + G33 (infra) + scripts dual-use.
- **PERDIDO = 0** — todo cluster do inventário F3 tem disposição registrada acima.
- **catalogo.md:** AUSENTE em `Egide/.claude/skills/` — não havia catálogo no squad; reportado, não inventado.
