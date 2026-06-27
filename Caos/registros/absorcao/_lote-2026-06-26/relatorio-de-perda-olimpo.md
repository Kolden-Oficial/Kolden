# Relatório de perda (F6.5) — squad Olimpo

- **squad-alvo:** Olimpo (`C:/Kolden/Olimpo/`)
- **repo aplicado:** `garrytan--gstack` (sha `11de390…`, licença MIT)
- **leva:** `_lote-2026-06-26`
- **escopo:** absorção das TÉCNICAS de maior valor (2-3 âncoras), NÃO das 23 personas
  (o Olimpo já encarna os papéis nos 8 deuses). Tooling/personas/runtime do gstack ficam inertes.

## Âncoras aplicadas

| repo | ID | disposicao | destino |
|------|----|-----------|---------|
| garrytan--gstack | G2 + G26 | ABSORVIDO | `Olimpo/.claude/skills/reframe-produto-10-estrelas/SKILL.md` |
| garrytan--gstack | G27 | ABSORVIDO | `Olimpo/.claude/skills/rubrica-dimensional-0-10/SKILL.md` |
| garrytan--gstack | G6 + G28 | ABSORVIDO | `Olimpo/.claude/skills/painel-executivo-autoplan/SKILL.md` |

Notas de fusão:
- **G2 (plan-ceo-review) + G26 (técnica "10 estrelas")** fundidos numa skill — são a mesma
  técnica de reframe de ambição (persona CEO já existe = Zeus; absorvida só a técnica).
- **G6 (autoplan) + G28 (painel de personas com auto-decisão)** fundidos — são o mesmo
  mecanismo (pipeline sequencial + 6 princípios de decisão), espelhando o Zeus orquestrando
  os 8 deuses sobre o Contrato de Missão.
- **G27** generalizado de revisão de UI para avaliação executiva multidomínio (qualquer deus).

## INCREMENTAL (não aplicado nesta leva)

Itens do dossiê roteados a OUTROS squads no `mapa-de-decisao.md` — fora do escopo do bucket Olimpo;
ficam para as levas dos squads donos. Registrados aqui para PERDIDO=0, não para reaplicação no Olimpo.

| ID | disposicao | motivo |
|----|-----------|--------|
| G1 | DIFERIDO-INCREMENTAL | roteado a Aletheia (veto build-sem-evidência) — outro squad |
| G3, G8, G9, G10, G11, G18, G20, G21 | DIFERIDO-INCREMENTAL | roteados a Prometeu (spec/arquitetura/QA/doc) |
| G4, G5, G13, G14, G15, G16, G17, G47 | DIFERIDO-INCREMENTAL | roteados a Harmonia (UX/design/DX) |
| G7 | DIFERIDO-INCREMENTAL | roteado a Egide (CSO/OWASP/STRIDE) |
| G12, G39 | DIFERIDO-INCREMENTAL | roteados a Metis (retro/analytics/benchmark cross-LLM) |
| G19, G22, G23, G24, G25, G46, G53 | DIFERIDO-INCREMENTAL | roteados a Dedalo (reflexos/Claude Code/codex/make-pdf) |
| G31, G36 | DIFERIDO-INCREMENTAL | roteados a Argos (scrape→skillify) |
| G29, G30, G54 | DIFERIDO-INCREMENTAL | roteados a caos-fabrica (memória/roteamento de skill) |
| G32–G35, G37, G38, G40–G45, G48–G52, G58 | DESCARTADO | tooling/runtime vendor inerte (gbrain, browse, ship, telemetria) — não absorver código de terceiro |
| G55 | DIFERIDO-INCREMENTAL | cluster iOS QA — fora de domínio Kolden; guardar como referência |
| G56, G57 | DESCARTADO | duplicatas (openclaw) / exemplo (hackernews) — sem capacidade nova |

## Invariante de reconciliação (escopo Olimpo)

- Âncoras-alvo do bucket Olimpo: **3** (G2/G26, G27, G6/G28) → **ABSORVIDO = 3**.
- **DESCARTADO** (vendor/duplicata, na cauda): registrados acima.
- **DIFERIDO-INCREMENTAL**: pertencem a outros squads/levas, não ao Olimpo.
- **PERDIDO = 0** — nada do escopo Olimpo saiu sem registro.
- catálogo do Olimpo: **AUSENTE** (não há `.claude/skills/catalogo.md` no squad; `.claude/` foi
  criado nesta leva). Não inventei catálogo do zero — fica como ponta para a conformação do squad.
