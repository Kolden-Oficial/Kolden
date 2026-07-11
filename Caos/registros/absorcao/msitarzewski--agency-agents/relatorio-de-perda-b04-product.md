---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/msitarzewski--agency-agents/_indice|_indice]]"
---

# F6.5 — Relatório de Reconciliação · B04 Product

**Repo upstream:** `msitarzewski/agency-agents@a597cb6`
**Bucket:** B04 = Aletheia + Prometeu (divisão `product/` upstream)
**Inventário F3:** 23 IDs (G1-G23) — `inventario-product.md`
**Data:** 2026-06-29

## Invariante anti-perda (Caos Art. VIII)

`count(ABSORVIDO) + count(DESCARTADO) + count(PERDIDO) == 23`
- ABSORVIDO = 21 (Aletheia 10 + Prometeu 10 + G11 contado 1x)
- DESCARTADO = 2 (G4 gamification, G7 NPS/churn)
- PERDIDO = **0** ✓

`21 + 2 + 0 = 23` ✓

## Disposição por ID

| ID | disposicao | destino_ou_motivo |
|---|---|---|
| G1 | ABSORVIDO | aletheia/.claude/skills/cadencias-comportamentais-em-validacao (NOVA, junto com G2) |
| G2 | ABSORVIDO | aletheia/.claude/skills/cadencias-comportamentais-em-validacao (default bias + arquitetura de escolha) |
| G3 | ABSORVIDO | prometeu/.claude/skills/micro-sprints-e-decomposicao-de-task (NOVA, sm-river + dev-dex) |
| G4 | DESCARTADO | **Motivo:** Gamification é capacidade de produto-cliente (Omiron/CataLogo/etc.), não framework Prometeu nem Aletheia. Trivial demais e fora de jurisdição. |
| G5 | ABSORVIDO | aletheia/.claude/skills/sintese-de-feedback-multi-canal (NOVA, junto com G6) |
| G6 | ABSORVIDO | aletheia/.claude/skills/sintese-de-feedback-multi-canal (tema extraction + sentiment + categorização) |
| G7 | DESCARTADO | **Motivo:** NPS/CSAT/churn é pós-PMF — squad Metis (futuro) quando evoluir para instrumentação de North Star. Nota registrada em `Aletheia/MEMORY.md` (Candidatos a Promoção). |
| G8 | ABSORVIDO | aletheia/.claude/skills/priorizacao-rice (NOVA, cross-link bidirecional com prometeu/moscow-kano-mcda) |
| G9 | ABSORVIDO | aletheia/.claude/skills/mapeamento-de-jornada-com-pain-points (NOVA, tony-ulwick lidera) |
| G10 | ABSORVIDO | prometeu/.aiox-core/development/agents/pm/MEMORY.md (REUSE puro — Princípio "outcome-obsessed + discovery-to-launch ownership") |
| G11 | ABSORVIDO | prometeu/.claude/skills/prfaq-amazon-style (NOVA, pm-morgan) — pre-mortem e hypothesis-driven são REUSE puro do Article III AIOX |
| G12 | ABSORVIDO (PENDÊNCIA F6 B03) | **prometeu/.claude/skills/estrategias-de-deploy-zero-downtime** (cohort testing e A/B na fase de rollout) — skill **não existe ainda** (será criada no F6 do B03). Pendência registrada no ledger. |
| G13 | ABSORVIDO | prometeu/.aiox-core/development/agents/pm/MEMORY.md (REUSE puro — "PRD embute upstream problem statement + scope IN/OUT explícito") |
| G14 | ABSORVIDO | prometeu/.aiox-core/development/agents/po/MEMORY.md + sm/MEMORY.md (REUSE puro — data-driven prioritization at scale, rolling average de velocity) |
| G15 | ABSORVIDO | prometeu/.claude/skills/moscow-kano-mcda (NOVA, po-pax) |
| G16 | ABSORVIDO | prometeu/.claude/skills/matriz-valor-esforco-quick-wins (NOVA, po-pax) |
| G17 | ABSORVIDO | prometeu/.aiox-core/development/agents/sm/MEMORY.md (REUSE puro — capacity planning com buffer 20-30% + alerta de outlier + trend analysis) |
| G18 | ABSORVIDO | prometeu/.claude/skills/matriz-de-risco-e-contingencia (NOVA, po-pax + sm-river) |
| G19 | ABSORVIDO | aletheia/.claude/skills/pesquisa-de-tendencia-e-sinais-fracos (NOVA, junto com G20 e G21) |
| G20 | ABSORVIDO | aletheia/.claude/skills/pesquisa-de-tendencia-e-sinais-fracos (early adopter analysis) |
| G21 | ABSORVIDO | aletheia/.claude/skills/pesquisa-de-tendencia-e-sinais-fracos (cross-industry pattern transfer) |
| G22 | ABSORVIDO | aletheia/.claude/skills/sizing-tam-sam-som-com-ressalva (NOVA — **com ressalva crítica explícita: NUNCA substitui XYZ Hypothesis de Savoia em validação primária**) |
| G23 | ABSORVIDO | aletheia/.claude/skills/mapa-competitivo-swot-gap (NOVA, steve-blank lidera — Market Type) |

## Sumário por disposição

| Disposição | Quantidade | Percentual |
|---|---:|---:|
| ABSORVIDO (skill nova) | 16 | 69.6% |
| ABSORVIDO (REUSE em MEMORY) | 5 | 21.7% (G10, G13, G14×2, G17) |
| DESCARTADO | 2 | 8.7% |
| PERDIDO | **0** | **0.0%** ✓ |
| **Total** | **23** | **100%** |

## Escritas aplicadas em F6

### Skills NOVAS (12)

**Aletheia (7 skills compartilhadas):**
- `cadencias-comportamentais-em-validacao` (G1+G2) — david-bland + rob-fitzpatrick
- `sintese-de-feedback-multi-canal` (G5+G6) — aletheia-chief
- `priorizacao-rice` (G8) — Sean McBride/Intercom
- `mapeamento-de-jornada-com-pain-points` (G9) — tony-ulwick
- `pesquisa-de-tendencia-e-sinais-fracos` (G19+G20+G21) — alberto-savoia + david-bland
- `sizing-tam-sam-som-com-ressalva` (G22) — alberto-savoia (com ressalva)
- `mapa-competitivo-swot-gap` (G23) — steve-blank (Market Type)

**Prometeu (5 skills L3):**
- `micro-sprints-e-decomposicao-de-task` (G3) — sm-river + dev-dex
- `prfaq-amazon-style` (G11) — pm-morgan
- `moscow-kano-mcda` (G15) — po-pax
- `matriz-valor-esforco-quick-wins` (G16) — po-pax
- `matriz-de-risco-e-contingencia` (G18) — po-pax + sm-river

### Anexos MEMORY.md (3 agentes AIOX, L3 mutable)

- `pm/MEMORY.md` (G10 + G13)
- `po/MEMORY.md` (G14)
- `sm/MEMORY.md` (G14 + G17)

### Catálogos atualizados

- `Aletheia/.claude/skills/catalogo.md` reorganizado em **4 estágios** (Descoberta / Validação / Mercado-Demanda / Cross-cutting). De 3 → **10 skills**.
- `Prometeu/.claude/skills/catalogo.md` ganhou seção das 5 skills novas + nota de procedência + pendência B03. De 17 → **22 skills**.

### Pendências documentadas

- **G12 (cohort/A-B testing)** — anexo previsto em `Prometeu/.claude/skills/estrategias-de-deploy-zero-downtime/SKILL.md`. Essa skill será criada no F6 do B03. G12 conta como ABSORVIDO pendente — pré-disposição registrada aqui (não PERDIDO).
- **`Aletheia/.claude/skills/otimizacao-de-workflow-lean`** (categorizada como Cross-cutting no catálogo) — também pendente do F6 do B03 (divisão `testing/` upstream).

### Anti-conflito L1-L4 (AIOX) respeitado

- F6 escreveu **apenas** em `Prometeu/.claude/skills/` (L3) e em `.aiox-core/development/agents/{pm,po,sm}/MEMORY.md` (L3 mutable).
- **ZERO modificação** em `.aiox-core/core/` (L1), `.aiox-core/development/tasks/` (L2), `.aiox-core/development/templates/` (L2), `.aiox-core/development/checklists/` (L2), `.aiox-core/development/agents/*.md` (L2 extend-only).

### Invariantes preservadas

- **PT-BR estrito** (Art. II) — todo conteúdo novo em português.
- **Sem cópia literal** do upstream — padrão extraído, reescrito.
- **Atribuição MIT** — header em cada skill nova; nota em cada anexo MEMORY.
- **Ressalva crítica em `sizing-tam-sam-som-com-ressalva`** — registrada em 3 pontos (frontmatter veto, blockquote de atribuição, seção "Ressalva inicial não-negociável"). Veto Savoia preservado.
- **`cadencias-comportamentais-em-validacao` é para PARTICIPANTES, não usuários** — registrado em frontmatter + corpo + anti-padrões.
- **NPS/churn (G7) → roadmap Metis** — registrado em `Aletheia/MEMORY.md` (Candidatos a Promoção).

## Verificação do gate determinístico

Para rodar manualmente:
```bash
export CAOS_REPO_SLUG="msitarzewski--agency-agents@a597cb6"
python3 C:/Kolden/Caos/.claude/reflexos/gate-reconciliacao.py "$CAOS_REPO_SLUG/b04"
# Esperado: exit 0 (PERDIDO=0, soma bate)
```

Bucket B04 = APROVADO para F7 (atualização parcial do ledger).
