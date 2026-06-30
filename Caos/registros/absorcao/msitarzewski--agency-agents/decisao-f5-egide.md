# F5 — Decisão de aplicação · B01 Égide

> **PARA AQUI.** Aguardando aprovação explícita do Ronan (Caos Art. III, F5 BLOCK). Nenhuma escrita em `C:\Kolden\Egide\` antes do OK.

## Resumo executivo (TL;DR)

- **Bucket:** B01 = Égide (squad de segurança).
- **Inventário upstream (B01):** 35 IDs (G1-G35) — divisão `security/` de `msitarzewski/agency-agents@a597cb6`, 10 agentes upstream.
- **Frota Égide atual:** 15 agentes + 29 skills.
- **Decisão F4 por ID:** 24 REUSE / 11 ADAPT / 0 CREATE.
- **Implicação:** cobertura natural alta. Nenhuma capacidade upstream é totalmente nova para a Égide — todas as 11 ADAPTs são extensões internas a skills/agentes já existentes.

## Plano de aplicação F6 (após aprovação)

### 3 skills NOVAS a criar

| # | Skill nova | IDs absorvidos | Justificativa |
|---|---|---|---|
| 1 | `modelagem-de-ameacas-stride-pasta` | G1, G7 | STRIDE existe escondido dentro de OWASP-web; PASTA (7 estágios) não existe. Autônoma, aplicável a qualquer sistema. |
| 2 | `governanca-multi-conta-de-nuvem` | G13 | Cloud-multi-provider cobre postura por conta; **não cobre** organization-wide (SCPs AWS, Azure Management Groups, GCP Org Policy, policy-as-code). |
| 3 | `deteccao-de-pivot-e-tunneling` | G25 (parcial — defensiva) | Apenas a vertente **detectiva** (logs, EDR, anomalia de rede); preserva veto ofensivo da Égide. |

### 5 skills a ESTENDER

| # | Skill existente | IDs absorvidos | Extensão concreta |
|---|---|---|---|
| 4 | `auditoria-de-smart-contracts` | G11 | + §"Auditoria de controle de acesso e escalação de privilégio" (RBAC OpenZeppelin, ownership transfer, initialize, proxy upgrade auth) |
| 5 | `devsecops-sast-dast-em-ci` | G15 | + §"OIDC federation runner→cloud" (GitHub Actions→AWS OIDC, Azure Workload Identity, GCP Workload Identity) |
| 6 | `grc-e-conformidade-de-seguranca` | G16, G17, G18 | + §"SOC 2 (TSC + Type I vs II)", §"HIPAA (Privacy/Security/Breach Rules)", §"PCI-DSS (12 reqs + SAQ vs ROC)", §"Evidence collection contínua (Drata-style)", §"Control mapping cross-framework" |
| 7 | `gestao-de-identidade-e-acesso-iam` | G24 (parcial — defensiva) | + §"Detecção de ataques AD" (Kerberoasting, DCSync, AS-REP roasting) — APENAS método detectivo, **preserva veto** ofensivo da Égide |
| 8 | `inteligencia-de-ameacas-cti` | G35 | + §"Clustering de infraestrutura de adversário", §"STIX 2.1 como formato canônico", §"Diamond Model + Kill Chain enriquecidos" |

### 24 IDs REUSE (sem ação F6)

A Égide já cobre — não duplicar. Opcionalmente no F6 podemos adicionar notas de rodapé de referência cruzada (ex.: CWE Top 25 em G2, Echidna em G10, typosquatting léxico em G8). Esses ajustes são opcionais e não bloqueantes.

## Invariantes a preservar no F6

1. **Veto ético ofensivo da Égide.** `Egide/.claude/skills/gestao-de-identidade-e-acesso-iam/SKILL.md` declara BLOCK explícito de AD ofensivo (Kerberoast/BloodHound-ataque/ESC1-8). G24 e G25 entram **apenas como detecção/defesa** — nunca como técnica ofensiva. Esta absorção respeita e reforça o veto.
2. **PT-BR estrito (Art. II).** Toda skill nova/estendida em português; upstream em inglês é só fonte, não cópia literal.
3. **Atribuição MIT.** Header 1-linha em cada skill derivada: `Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT)`. `_origem.md` central no `Egide/`.
4. **Cascata N0→N6 + maturity ≥ 7.0** em cada skill criada/estendida (gate F6).

## Reconciliação esperada (F6.5 — preview)

Disposição prevista (a confirmar ao executar F6.5 com `gate-reconciliacao.py`):

| Disposição | Qtd IDs | IDs |
|---|---|---|
| ABSORVIDO (REUSE — sem ação) | 24 | G2-G6, G8-G10, G12, G14, G19-G23, G26-G34 |
| ABSORVIDO (ADAPT — extensão aplicada) | 11 | G1, G7, G11, G13, G15, G16, G17, G18, G24, G25, G35 |
| DESCARTADO | 0 | — |
| PERDIDO | 0 | — |
| **Total** | **35** | — |

Invariante anti-perda satisfeita: `24 + 11 + 0 + 0 = 35` ✓ (corresponde ao inventário F3 do B01).

## Achados e anomalias da F4

1. **G24 colide com veto explícito da Égide.** Tratado como ADAPT defensivo (preserva o BLOCK). Registrar como invariante de absorção, não gap.
2. **G22/G23 (pentest+OSINT) já são SUPERIORES ao upstream na Égide.** Upstream tem 1 agente; Égide tem PTES + 6 agentes operacionais + peter-kim. Padrão mais maduro — só observação.
3. **CREATE = 0** sinaliza cobertura natural alta do mandato. Construção atual da Égide cobre bem a divisão `security/` upstream.

## Próximo passo (após aprovação)

**Comando esperado do Ronan:** "OK, aprovado" ou variante explícita.

Após o OK, executo F6 (criar 3 skills novas + estender 5 existentes via skills `criacao-de-skill` + cascata N0→N6) → F6.5 (gate-reconciliacao.py) → F7 (entrada parcial no ledger). Maturity ≥7.0 em cada skill é gate.

## Inputs auditáveis

- Inventário F3 do B01: `inventario-security.md` (35 IDs)
- Mapa F4 completo (decisão por ID + justificativa + ação F6): `mapa-de-decisao-egide.md`
- Veredito F2 (segurança): `seguranca.md` — SAFE
- Procedência F1: `quarentena/msitarzewski--agency-agents@a597cb6/_procedencia.md`
- Contrato de Missão: `Olimpo/contratos/missoes/m-20260628-234143-absorve-agency-agents.yaml`
