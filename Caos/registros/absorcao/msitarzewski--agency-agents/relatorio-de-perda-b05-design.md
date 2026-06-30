# F6.5 — Relatório de Reconciliação · B05 Design

**Repo upstream:** `msitarzewski/agency-agents@a597cb6`
**Bucket:** B05 = Harmonia (UX/UI) + Aglaia (Branding/Estética) — divisão `design/` upstream
**Inventário F3:** 27 IDs (G1-G27) — `inventario-design.md`
**Data:** 2026-06-29

## Invariante anti-perda (Caos Art. VIII)

`count(ABSORVIDO) + count(DESCARTADO) + count(PERDIDO) == 27`
- ABSORVIDO = 26 (4 REUSE Harmonia + 12 em skills Harmonia ADAPTadas/CREATE + 9+1 anexos Aglaia)
- DESCARTADO = 1 (G24)
- PERDIDO = **0** ✓

`26 + 1 + 0 = 27` ✓

## Disposição por ID

| ID | disposicao | destino_ou_motivo |
|---|---|---|
| G1 | ABSORVIDO | aglaia/.claude/skills/pipeline-de-identidade-de-marca (NOVA — 4 fases purpose→values→visual→voice) |
| G2 | ABSORVIDO | aglaia/.claude/skills/protecao-de-marca-monitoramento-crise (NOVA — 3 frentes + janelas 30min/2h/24h) |
| G3 | ABSORVIDO | aglaia/.claude/skills/paineis-de-equidade-de-marca (NOVA — CBBE 4 dimensões + cadência trimestral) |
| G4 | ABSORVIDO | aglaia/.claude/skills/engenharia-de-prompt-de-imagem (NOVA — framework 6 camadas) |
| G5 | ABSORVIDO | aglaia/.claude/skills/engenharia-de-prompt-de-imagem (templates por gênero — anexo embebido) |
| G6 | ABSORVIDO | aglaia/.claude/skills/engenharia-de-prompt-de-imagem (pós-processamento film stocks — anexo embebido) |
| G7 | ABSORVIDO | aglaia/.claude/skills/visuais-inclusivos-anti-vies (NOVA — counter-stereotype + physical reality) |
| G8 | ABSORVIDO | aglaia/.claude/skills/visuais-inclusivos-anti-vies (negative prompting — anexo embebido) |
| G9 | ABSORVIDO | aglaia/.claude/skills/visuais-inclusivos-anti-vies (review checklist sociological audit — anexo embebido) |
| G10 | ABSORVIDO | harmonia/.claude/skills/walkthrough-de-persona (NOVA — simulação cognitiva 3 modos) |
| G11 | ABSORVIDO | harmonia/.claude/skills/walkthrough-de-persona (LIFT framework — anexo executável) |
| G12 | ABSORVIDO | harmonia/.claude/skills/walkthrough-de-persona (Cialdini-presença DETECTADOS por fold — fronteira clara com Caliope/robert-cialdini) |
| G13 | ABSORVIDO (REUSE) | harmonia/.claude/skills/tokens-de-design + implementacao-ui (3 camadas de tokens + shadcn/ui/Tailwind + WCAG-AA já cobrem) |
| G14 | ABSORVIDO | harmonia/.claude/skills/sistema-de-design (ADAPT — §Responsividade canônica + 8-point grid + breakpoints) |
| G15 | ABSORVIDO (REUSE) | harmonia/.claude/skills/* (WCAG 2.1 AA aplicado em todas as 4 skills da Harmonia) |
| G16 | ABSORVIDO (REUSE) | harmonia/.claude/skills/tokens-de-design (CSS-in-JS) + implementacao-ui (Tailwind theme) |
| G17 | ABSORVIDO | harmonia/.claude/skills/sistema-de-design (ADAPT — §Hierarquia visual + padrões de scanning + cognitive load) |
| G18 | ABSORVIDO (REUSE) | harmonia/.claude/skills/implementacao-ui (theme management com persistência + system preference) |
| G19 | ABSORVIDO | harmonia/.claude/skills/pesquisa-qualitativa-de-usuario (NOVA — protocolo 3 fases) |
| G20 | ABSORVIDO | harmonia/.claude/skills/pesquisa-qualitativa-de-usuario (persona-build empírica — anexo embebido) |
| G21 | ABSORVIDO | harmonia/.claude/skills/pesquisa-qualitativa-de-usuario (usability test 60min think-aloud — anexo embebido) |
| G22 | ABSORVIDO | aglaia/.claude/skills/narrativa-visual-de-marca (NOVA — story arc + character + emotional pacing) |
| G23 | ABSORVIDO | aglaia/.claude/skills/narrativa-visual-de-marca (repertório multimídia — anexo embebido) |
| G24 | DESCARTADO | **Motivo:** Cross-platform content adaptation (Instagram/YouTube/TikTok/LinkedIn/Pinterest/Web) é jurisdição de **Pheme**. A `matriz-de-conteudo` (Pheme) já cobre "Mixes de mercado" no lote B02. Aglaia define a narrativa (G22); Pheme distribui. Revisita só se um vetor específico não estiver coberto. |
| G25 | ABSORVIDO | aglaia/.claude/skills/micro-interacoes-de-marca (NOVA — decisão criativa; handoff técnico para Harmonia) |
| G26 | ABSORVIDO | aglaia/.claude/skills/microcopy-de-interface (NOVA — biblioteca por contexto + matriz tom × marca) |
| G27 | ABSORVIDO | aglaia/.claude/skills/gamificacao-como-sistema-de-marca (NOVA — SDT motivation mechanics + reward architecture + Easter eggs) |

## Sumário por disposição

| Disposição | Quantidade | Percentual |
|---|---:|---:|
| ABSORVIDO REUSE (sem ação F6) | 4 (G13, G15, G16, G18) | 14.8% |
| ABSORVIDO ADAPT (em skill existente) | 2 (G14, G17 em sistema-de-design) | 7.4% |
| ABSORVIDO CREATE (skills novas + anexos embebidos) | 20 (G1-G12, G19-G23, G25-G27 — 11 skills novas no total) | 74.1% |
| DESCARTADO | 1 (G24) | 3.7% |
| PERDIDO | **0** | **0.0%** ✓ |
| **Total** | **27** | **100%** |

## Escritas aplicadas em F6

### Skills NOVAS no Harmonia (2)

| Skill | IDs | Linhas |
|---|---|---:|
| `walkthrough-de-persona` | G10+G11+G12 | ~140 |
| `pesquisa-qualitativa-de-usuario` | G19+G20+G21 | ~150 |

### Skill ESTENDIDA no Harmonia (1)

| Skill | IDs | Linhas adicionadas |
|---|---|---:|
| `sistema-de-design` | G14, G17 | ~100 (2 seções: Responsividade canônica + Hierarquia visual) |

### Skills NOVAS no Aglaia (9) — 1ª camada `.claude/skills/` criada do zero

| Skill | IDs | Linhas |
|---|---|---:|
| `pipeline-de-identidade-de-marca` | G1 | ~120 |
| `protecao-de-marca-monitoramento-crise` | G2 | ~135 |
| `paineis-de-equidade-de-marca` | G3 | ~115 |
| `engenharia-de-prompt-de-imagem` | G4+G5+G6 | ~175 |
| `visuais-inclusivos-anti-vies` | G7+G8+G9 | ~145 |
| `narrativa-visual-de-marca` | G22+G23 | ~125 |
| `micro-interacoes-de-marca` | G25 | ~110 |
| `microcopy-de-interface` | G26 | ~120 |
| `gamificacao-como-sistema-de-marca` | G27 | ~125 |

### Catálogos

- `Harmonia/.claude/skills/catalogo.md` — +2 linhas para skills novas + bloco de procedência B05
- `Aglaia/.claude/skills/catalogo.md` — **CRIADO DO ZERO** (1ª camada formal de skills da Aglaia)

### Invariantes preservadas

- **PT-BR estrito** (Art. II).
- **Sem cópia literal** do upstream.
- **Atribuição MIT** em cada artefato novo / seção ADAPT.
- **Fronteiras inter-squad explicitadas** (declaradas em frontmatter + corpo + anti-padrões):
  - `Harmonia/walkthrough-de-persona` (audita gatilhos) ↔ `Caliope/robert-cialdini` (escreve copy) — declarada 4x no documento
  - `Harmonia/pesquisa-qualitativa-de-usuario` (UX em produto) ↔ `Aletheia/roteiro-de-entrevista` (Mom Test pré-produto) — regra prática: "Conta sobre a última vez..." → Aletheia; "Faça isso aqui pensando em voz alta" → Harmonia
  - `Aglaia/micro-interacoes-de-marca` (decisão criativa) ↔ `Harmonia/implementacao-ui` (motion + a11y) — fronteira declarada 3x
  - `Aglaia/visuais-inclusivos-anti-vies` (anti-viés sociológico) ↔ `Harmonia/julgamento-estetico-anti-slop` (anti-slop estético) — complementares
  - `Aglaia/microcopy-de-interface` aplica voz; `Caliope/fundacao-de-voz` define voz estratégica
  - `Aglaia/engenharia-de-prompt-de-imagem` executa prompt; `Harmonia/julgamento-estetico-anti-slop` decide estética
- **Aglaia ganha 1ª camada de skills** — antes só tinha 15 agentes/pensadores históricos sem habilidade executável.
- **REUSE com diff técnica-a-técnica** validado: G13 (tokens 3 camadas, shadcn/Tailwind), G15 (WCAG 2.1 AA), G16 (CSS-in-JS + Tailwind theme), G18 (theme management) — cada um cobre direto skill existente da Harmonia.
- **DESCARTADO com motivo explícito** (G24 → Pheme matriz-de-conteudo + skills de plataforma já cobrem).

## Verificação do gate determinístico

```bash
export CAOS_REPO_SLUG="msitarzewski--agency-agents@a597cb6"
python3 C:/Kolden/Caos/.claude/reflexos/gate-reconciliacao.py "$CAOS_REPO_SLUG/b05"
# Esperado: exit 0 (PERDIDO=0, soma bate)
```

Bucket B05 = APROVADO para F7 (atualização parcial do ledger).
