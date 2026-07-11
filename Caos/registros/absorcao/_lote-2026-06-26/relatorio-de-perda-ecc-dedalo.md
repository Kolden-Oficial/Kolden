---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/_lote-2026-06-26/_indice|_indice]]"
---

# Relatório de perda (F6.5) — bucket Dédalo ← affaan-m/everything-claude-code

- **squad-alvo:** Dédalo (`C:/Kolden/Dedalo/`)
- **repo aplicado:** affaan-m/everything-claude-code@2bc924f (MIT)
- **dossiê:** `C:/Kolden/Caos/registros/absorcao/affaan-m--everything-claude-code/`
- **modo:** seletivo (271 skills no repo) — âncoras de maior valor para o domínio do Dédalo (Claude Code / eng de agentes)
- **invariante:** ABSORVIDO + DESCARTADO + DIFERIDO-INCREMENTAL = clusters considerados; **PERDIDO = 0**

## Âncoras aplicadas nesta leva

| repo | ID | disposição | destino |
|---|---|---|---|
| ecc@2bc924f | G13 | ABSORVIDO | `Dedalo/.claude/skills/revisao-de-codigo-por-linguagem/SKILL.md` |
| ecc@2bc924f | G12 | ABSORVIDO | `Dedalo/.claude/skills/estrategia-de-testes-e-tdd/SKILL.md` |
| ecc@2bc924f | G4  | ABSORVIDO | `Dedalo/.claude/skills/orquestracao-por-grafo-de-tarefas/SKILL.md` |
| ecc@2bc924f | G28 | ABSORVIDO | `Dedalo/.claude/skills/sanitizacao-de-saida-de-agente/SKILL.md` |

Notas de fusão/coordenação:
- **G13** funde o agente `code-reviewer` (protocolo + portão de confiança + lista de falsos-positivos) com
  `silent-failure-hunter` (caça a falha silenciosa) e o pool `*-reviewer` por linguagem (roteamento) — uma
  skill, não três. O roteamento acopla explicitamente à skill já existente `orquestracao-de-subagentes-paralelos`.
- **G4** foi escrita como **complemento** (não duplicata) da `orquestracao-de-subagentes-paralelos` já
  presente no Dédalo: aquela cobre *despacho* de trabalho independente; esta cobre *integração de time*
  (work item, Kanban, matriz de faixas, integrador único, painel). Fronteira declarada nas duas pontas.
- **G28** alinhada à regra de segredos do Kolden (§5/Infisical): a skill **bloqueia** vazamento na saída,
  enquanto o Infisical **provê** credencial — papéis distintos, declarado no corpo e no rodapé.

## INCREMENTAL (não aplicado nesta leva)

Clusters do ECC com afinidade ao Dédalo, **diferidos** (qualidade/coerência > volume; ficam registrados
para uma próxima leva incremental no Dédalo ou pertencem melhor a outro squad-alvo do mesmo dossiê):

| repo | ID | disposição | motivo |
|---|---|---|---|
| ecc@2bc924f | G1  | DIFERIDO-INCREMENTAL | avaliação eval-first de agentes (rubrica/auditoria 12-camadas/introspecção) — alto valor, mas o mapa roteia primário a `caos-fabrica`+Dédalo; melhor absorver junto ao testador da fábrica para não bifurcar a rubrica. |
| ecc@2bc924f | G2  | DIFERIDO-INCREMENTAL | harness autônomo + action-space/loop design — runtime de agente; merece skill própria densa, fora do orçamento de 3-5 desta leva. |
| ecc@2bc924f | G3  | DIFERIDO-INCREMENTAL | aprendizado contínuo via stop-hook ("instinct") — sobrepõe ritual-de-encerramento/MEMORY.md; exige diff fino para não duplicar o reflexo existente. |
| ecc@2bc924f | G7  | DIFERIDO-INCREMENTAL | governança de contexto/token/custo de sessão — parcialmente coberto por `brevidade-de-saida`; resto (orçamento de token, roteamento por custo) fica para leva incremental. |
| ecc@2bc924f | G37 | DIFERIDO-INCREMENTAL | workflow de sessão/épico/PRP (checkpoint/epic-*/prp-*) — gestão de sessão; candidato a skill própria, adiado por orçamento. |

Demais clusters (G5–G6, G8–G11, G14–G36) pertencem primariamente a outros squads-alvo (Prometeu, Egide,
Dike, Caos, e o eixo marketing) conforme o `mapa-de-decisao.md` do dossiê — **fora do escopo do bucket
Dédalo** e tratados (ou a tratar) nas respectivas levas; não são perda deste bucket.

## Veredito

- **ABSORVIDO:** 4 (G13, G12, G4, G28)
- **DIFERIDO-INCREMENTAL:** 5 (G1, G2, G3, G7, G37)
- **DESCARTADO:** 0
- **PERDIDO:** 0
- **catálogo do squad:** ausente em `Dedalo/.claude/skills/` (sem `catalogo.md`; não inventado — apenas reportado)
- **licença:** MIT — atribuição (owner/repo@sha + licença) no rodapé de cada SKILL.md criado.
