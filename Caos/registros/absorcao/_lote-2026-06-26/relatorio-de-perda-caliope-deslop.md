# Relatório de perda — fusão Caliope/de-slop

> **Habilidade-destino:** `C:/Kolden/Caliope/.claude/skills/de-slop/`
> **Fontes:** `blader--humanizer` (G1–G9) + `hardikpandya--stop-slop` (G1–G13)
> **Data:** 2026-06-27 · **Fase:** F6.5 (reconciliação sem perda)
> **Invariante:** ABSORVIDO + DESCARTADO + PERDIDO = 22 · **PERDIDO = 0**

Caminhos de destino abreviados:
- `SKILL.md` = `de-slop/SKILL.md`
- `padroes` = `de-slop/references/padroes-anti-ia.md`
- `voz` = `de-slop/references/calibracao-de-voz.md`
- `checklist` = `de-slop/references/checklist-e-scorecard.md`
- `falso-positivo` = `de-slop/references/guia-falso-positivo.md`

## blader--humanizer (esqueleto)

| repo | ID | disposicao | destino_ou_motivo |
|---|---|---|---|
| blader--humanizer | G1 | ABSORVIDO | `SKILL.md` (invólucro da habilidade: frontmatter name/description + tarefa) |
| blader--humanizer | G2 | ABSORVIDO | `padroes` (taxonomia recalibrada PT-BR, grupos A–E; pares Antes/Depois) |
| blader--humanizer | G3 | ABSORVIDO | `SKILL.md` (seção "O loop: rascunho → auditoria → final" + segunda passada) |
| blader--humanizer | G4 | ABSORVIDO | `voz` (seção 1: espelhar a voz do autor a partir de amostra) |
| blader--humanizer | G5 | ABSORVIDO | `voz` (seção 2: "Alma"; gatilho por gênero, opinião, ritmo, imperfeição) |
| blader--humanizer | G6 | ABSORVIDO | `falso-positivo` ("O que NÃO marcar" — 12 sinais adaptados PT-BR) |
| blader--humanizer | G7 | ABSORVIDO | `falso-positivo` ("Sinais de escrita humana — preserve isto") |
| blader--humanizer | G8 | ABSORVIDO | `SKILL.md` (restrição dura travessão) + `padroes` C1 (corte total + varredura) |
| blader--humanizer | G9 | ABSORVIDO | `falso-positivo` ("Regra de ouro: decida por cluster") + `SKILL.md` |

## hardikpandya--stop-slop (entra pelo diff)

| repo | ID | disposicao | destino_ou_motivo |
|---|---|---|---|
| hardikpandya--stop-slop | G1 | ABSORVIDO | `SKILL.md` (invólucro fundido; um só de-slop em vez de duas skills) |
| hardikpandya--stop-slop | G2 | ABSORVIDO | `padroes` E1 (enchimento) + B1 (vocabulário) + `checklist` (advérbios) |
| hardikpandya--stop-slop | G3 | ABSORVIDO | `padroes` B3/B4/E8/E9 (estruturas formulaicas) + `padroes` C/E |
| hardikpandya--stop-slop | G4 | ABSORVIDO | `padroes` B7 (voz ativa, agente humano, anti-falsa-agência) |
| hardikpandya--stop-slop | G5 | ABSORVIDO | `padroes` A5/E3 (declarativas vagas, extremos preguiçosos) |
| hardikpandya--stop-slop | G6 | ABSORVIDO | `padroes` B7/E (narrador-à-distância → leitor na cena, "você") |
| hardikpandya--stop-slop | G7 | ABSORVIDO | `padroes` B4/C1/E8 (variar ritmo, dois > três, sem travessão) + `checklist` |
| hardikpandya--stop-slop | G8 | ABSORVIDO | `SKILL.md` (confiar no leitor) + `padroes` (cortar quotáveis) |
| hardikpandya--stop-slop | G9 | ABSORVIDO | `checklist` ("Quick Checks" — varredura final pré-entrega) |
| hardikpandya--stop-slop | G10 | ABSORVIDO | `checklist` (rubrica 5 dimensões 1–10; corte < 35/50) |
| hardikpandya--stop-slop | G11 | ABSORVIDO | `padroes` (dataset de frases dobrado em E1/E4/E5/B1/D + glossário jargão) |
| hardikpandya--stop-slop | G12 | ABSORVIDO | `padroes` (dataset de estruturas dobrado em B3/B7/E8/E9 "padrão→problema→fix") |
| hardikpandya--stop-slop | G13 | ABSORVIDO | `padroes` (exemplos antes/depois reescritos como pares Antes/Depois em PT-BR) |

## Contagem

- **ABSORVIDO:** 22 (9 humanizer + 13 stop-slop)
- **DESCARTADO:** 0
- **PERDIDO:** 0
- **Soma:** 22 ✓ (= inventário humanizer 9 + inventário stop-slop 13)

Invariante satisfeita: `count(ABSORVIDO) + count(DESCARTADO) + count(PERDIDO) == 22`, com
`PERDIDO == 0`.
