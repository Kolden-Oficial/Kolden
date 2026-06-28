# 04 — Hierarquia, roteamento e contratos (cross-squad)

> Passo 4 do protocolo. Consolida as classes **C (hierarquia)**, **D (roteamento)** e **E (contrato I/O)** atravessando squads.

## 5 camadas do KoldenOS — estado declarado vs estado verificado

| Camada | Descrição | Implementação verificada | Status |
|---|---|---|---|
| **1 — Humano** | Ronan; canal whatsapp/telegram/cli/chat | `Hermes/camada-2-contrato.md:11-14` | **OK declarativo** |
| **2 — Hermes** | DoR + matriz de risco + lacre sha256 + Contrato | `Hermes/camada-2-contrato.md:17-66` + script `Hermes/scripts/abre-missao.sh` (referido, não lido) | **K-H2 (MEDIO)** — runtime vendorizado sem agente Kolden |
| **3 — Zeus** | Decomposição + roteamento aos executivos | `Olimpo/agents/zeus.md:122-161` (`routing_logic`) | **K-H1 (BAIXO)** — colapsada com camada 4 |
| **4 — Executivos** | Especificação técnica + `handoff_operacional` | `Olimpo/agents/{poseidon, apolo, hefesto, hades, atena, plutos, afrodite, zeus}.md` | OK; **K-H3** — não nominam semente |
| **5 — Operacional** | Squads executam | 23 squads operacionais + 6 semente | **K-H3 (CRITICO)** parcial |
| **Subida — Dike** | Reconcilia entrega × lacre; gate `gate-de-subida.sh` | `Dike/.claude/reflexos/gate-de-subida.sh` (referido em `Hermes/camada-2-contrato.md:74`) | OK (papel sem `agents/`) |

## Roteamento de descida (camada 3 → camada 5) — tabela cross-squad

A descida do Zeus distribui o trabalho para 1 dos 7 executivos + self (`vision_culture_fundraise`). Cada executivo, então, faz **`handoff_operacional`** para um squad operacional ou para subordinado funcional.

### Roteamento explícito do Zeus (do `Olimpo/agents/zeus.md:122-161`)

| Trilha | Executivo | Squads operacionais alvo (declarados no índice CLAUDE.md §10) | Squads-semente alvo (declarados?) |
|---|---|---|---|
| `operational_challenge` | Poseidon (COO) | — (operações genéricas) | **Ananke** — ÓRFÃO (K-H3c) |
| `marketing_challenge` | Apolo (CMO) | Caliope, Aglaia, Pheme, Orfeu | — |
| `technology_challenge` | Hefesto (CTO) | Dedalo, Prometeu | — |
| `information_systems_challenge` | Hades (CIO) | Egide | **Nomos** — ÓRFÃO de trigger (K-H3c) |
| `ai_strategy_challenge` | Atena (CAIO) | Caos | — |
| `financial_challenge` | Plutos (CFO) | Pluto | **Pactolo** — ÓRFÃO de trigger (K-H3c) |
| `revenue_challenge` | Afrodite (CRO) | — (vendas/CRM) | **Êmporos** — ÓRFÃO de trigger (K-H3c) |
| `vision_culture_fundraise` | Zeus (CEO/self) | Olimpo (interno), Themis (conselho) | **Héstia** (cultura) — ÓRFÃO completo (K-H3a) |
| **—** (sem trilha) | — | — | **Cairós (PMO)** — ÓRFÃO completo (K-H3b) |

**Veredito**: dos 6 semente, **0/6** estão nominados em `routing_logic` do Zeus ou em `routing_triggers` de qualquer executivo.

## Match `contrato_saida` ↔ `contrato_entrada`

Conferido nos 5 nascido-no-caos (formato Kolden-native) e nos 6 semente: todos declaram `external_handoffs` com `to`/`from` + `artifact`. **Mas** os destinos (Plutos, Afrodite, Poseidon, Hades, Apolo) **não declaram** o `from` recíproco (K-005).

| Semente | Declara `to:` | Padrinho declara `from:`? |
|---|---|---|
| Nomos → Themis, Egide, Pactolo | ✅ `Nomos/squad.yaml:82-90` | ❌ Themis/Egide não declaram (`Themis/squad.yaml` é AIOX-legado, sem `external_handoffs`) |
| Pactolo → Plutos, Metis, Argos | ✅ `Pactolo/squad.yaml:80-88` | ❌ Plutos (agent `.md`) cita finanças genéricas, não Pactolo |
| Êmporos → Pheme/Ariadne, Afrodite, ghl | ✅ `Emporos/squad.yaml:77-90` | ❌ Afrodite (agent `.md`) cita CRM/GHL genéricos, não Êmporos |
| Héstia → Caos, Olimpo, Caliope/Aglaia/Pheme, Metis | ✅ `Hestia/squad.yaml:80-95` | ❌ ninguém declara `from: hestia` |
| Ananke → Poseidon, Dedalo, Metis, Pluto, Egide | ✅ `Ananke/squad.yaml:82-97` | ❌ Poseidon (agent `.md`) cita ops genéricas, não Ananke |
| Cairós → Prometeu, Olimpo, Aletheia, Metis | ✅ `Cairos/squad.yaml:82-95` | ❌ ninguém declara `from: cairos` |

**Veredito**: contratos **unilaterais** em 6/6 semente. Confirma K-005.

## Schema do Contrato de Missão — campos não verificados em runtime

`Olimpo/contratos/contrato-de-missao.schema.md:32-119` declara:
- `intencao_original.hash` (sha256) — **obrigatório**
- 7 seções com `assinatura: {por, em}`
- `orcamento.teto_rodadas` (default 2)
- `log_de_decisao` append-only

Auditoria **estática** confirma: schema/template/exemplo presentes. **Não verificado em runtime** se uma missão real é processada respeitando o schema (auditoria viva é Dike — fora do escopo aqui).

## Achados consolidados (sem novos achados nesta seção)

Os achados de hierarquia/roteamento/contrato já foram registrados:
- K-H1, K-H2, K-H3a, K-H3b, K-H3c (hipóteses)
- K-005 (handshake unilateral dos semente)
- K-009 (squads AIOX sem `external_handoffs`)
- K-011 (Olimpo `routing_logic` mora dentro dos agentes `.md`)
- K-013 (2 constituições coexistem)

## Recomendação geral

1. **CRÍTICO**: adicionar os 6 semente em `routing_logic` do executivo padrinho (zeus.md + agents/poseidon/hades/plutos/afrodite.md).
2. **ALTO**: definir se contratos cross-squad são bidirecionais (handshake) ou unilaterais (verdade do executivo é suficiente) — escolha 1 e aplique consistente.
3. **MÉDIO**: migrar os 11 AIOX-legado para Kolden-native ou compatibilizar parser.
