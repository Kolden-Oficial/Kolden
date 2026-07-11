---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/mukul975--Anthropic-Cybersecurity-Skills/inventario-de-capacidades|inventario-de-capacidades]]"
  - "[[Caos/registros/absorcao/mukul975--Anthropic-Cybersecurity-Skills/mapa-de-decisao|mapa-de-decisao]]"
---

# F2 — Segurança estática

- **slug:** `mukul975--Anthropic-Cybersecurity-Skills`
- **sha:** `673da1f3b0b7be34ffc9624ef3858fe45f1c3bed`
- **rota:** A (skill/agente)
- **veredito:** **SAFE**
- **data:** 2026-06-27 (análise 100% estática, sem execução, sem web)

## Contexto

Biblioteca comunitária Apache-2.0 de **817 skills** de cibersegurança no padrão
`agentskills.io`, mapeadas a 6 frameworks (MITRE ATT&CK, NIST CSF 2.0, MITRE ATLAS,
D3FEND, NIST AI RMF, MITRE F3). **NÃO oficial da Anthropic** (o README declara isso
explicitamente). Cada skill = `SKILL.md` (frontmatter + metodologia) + `references/`
(api-reference.md + standards.md) + `scripts/` (`agent.py` e/ou `process.py` — helpers
de operador que orquestram ferramentas reais; não reimplementam exploits).

Por ser repo de segurança, ~58 skills são ofensivas/dual-use (red-team C2, exploração de
AD, phishing simulado). Avaliadas abaixo com a distinção **método-conhecimento** (absorvível)
vs **ferramenta executável de ataque** (não-absorvível).

## Achados

| achado | arquivo:linha | severidade | absorvível? |
|---|---|---|---|
| Apache-2.0 limpa no root e replicada por skill; sem cláusula hostil | `LICENSE:1`; `skills/*/LICENSE` | info | sim |
| Sem `package.json` / sem hooks `postinstall`/`preinstall` em qualquer JSON | (busca global: 0 hits) | info | sim |
| Sem segredos/chaves hardcoded (regex `api_key/secret/token/password` + 16+ chars) | (busca global: 0 hits reais) | info | sim |
| CI `validate-skills.yml` só valida frontmatter via `tools/validate-skill.py` (checkout@v4, sem deploy/exfil) | `.github/workflows/validate-skills.yml:1` | info | sim |
| Scripts ofensivos (`agent.py`) orquestram tooling real (SharpDPAPI, Impacket, BloodHound, Sliver/Havoc C2) c/ cabeçalho "authorized pentest only" | `skills/abusing-dpapi-for-credential-access/scripts/agent.py:1` | **alta** | **NÃO** (ferramenta executável de ataque) |
| 38 clusters red-team/pentest com helpers de exploração de AD (Zerologon, NoPac, Kerberoast, ESC1/ESC8, EternalBlue) | `skills/exploiting-zerologon-vulnerability-cve-2020-1472/`, `skills/performing-kerberoasting-attack/` | **alta** | **NÃO** (scripts); **sim** o método em `SKILL.md` |
| `curl\|bash` em scripts = **regex defensivo** (detector de IOC), não execução | `skills/analyzing-persistence-mechanisms-in-linux/scripts/agent.py:28` | baixa | sim (é detecção) |
| `curl\|bash` em refs = instruções de instalação documentadas de ferramentas (syft, grype, foundry, sliver, wazuh, uv) | `skills/building-c2-infrastructure-with-sliver-framework/SKILL.md:85` | baixa | sim (doc; não auto-executa) |
| URLs hardcoded em scripts = **clients de threat-intel** legítimos (VirusTotal, AbuseIPDB, urlscan.io, crt.sh, MITRE CTI, Malpedia, MS Graph) exigindo chave do operador; payloads são placeholders defangados (`evil[.]example`, `malicious-site.com/payload.exe`) | `skills/analyzing-indicators-of-compromise/scripts/process.py:69` | baixa | sim (consulta, não exfil) |
| 139 scripts usam `socket`/`requests.post` — esperado p/ tooling de rede/IR; nenhum reverse-shell embutido nem C2 hardcoded | (busca global) | média | parcial (scripts não; método sim) |

## Conclusão

Repo **SAFE**: nada se auto-executa, instala ou exfiltra; sem segredos; licença permissiva
limpa. O risco real é **dual-use** — os `scripts/*.py` ofensivos são ferramentas executáveis
de ataque e ficam classificados como **NÃO-ABSORVÍVEIS** (não viram capacidade Kolden).
O valor absorvível é a **camada de método-conhecimento** dos `SKILL.md` (workflows, decisão de
ferramenta, mapeamento MITRE/NIST), que é defensável e reescrevível em PT-BR pela fase seguinte.
