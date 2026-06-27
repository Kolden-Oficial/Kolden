# Relatório de perda (F6.5) — squad Metis

- **Squad-alvo:** Metis (analytics & growth) — `C:/Kolden/Metis/`
- **Lote:** `_lote-2026-06-26`
- **Repo absorvido (parte Metis):** `JuliusBrussee--caveman` @ `25d22f864ad68cc447a4cb93aefde918aa4aec9f` (licença MIT)
- **Escopo desta aplicação:** apenas o que o `mapa-de-decisao.md` rotulou com squad-alvo = **metis**
  (G12) + a métrica de eficiência de saída. Os demais IDs do repo (G1–G11, G13–G20) vão para
  **dedalo/egide**; G21–G22 (eval honesto / benchmark de tokens reais) são alvo **prometeu** e
  entram aqui apenas como **princípio de honestidade** embutido na skill, não como entidade própria
  do Metis.
- **Catálogo de skills do Metis:** AUSENTE (não havia `.claude/skills/` nem `catalogo.md`). Diretório
  de skills criado nesta aplicação; catálogo não inventado (conforme guia).

## IDs-âncora aplicados

| repo | ID | disposicao | destino |
|---|---|---|---|
| JuliusBrussee--caveman | G12 | ABSORVIDO | `Metis/.claude/skills/telemetria-de-tokens-e-custo/SKILL.md` (telemetria de tokens real, custo USD, eficiência de saída) |
| JuliusBrussee--caveman | G21 | ABSORVIDO (princípio) | mesma skill — baseline honesta de 3 braços (cru/conciso/técnica); ENTIDADE difere-se a prometeu |
| JuliusBrussee--caveman | G22 | ABSORVIDO (princípio) | mesma skill + `references/tabela-de-precos-e-leitura-de-log.md` — contagem de tokens reais, snapshots versionados; ENTIDADE difere-se a prometeu |

Sobreposição resolvida: G12 + a metodologia honesta de G21/G22 foram **fundidas numa única skill**
(`telemetria-de-tokens-e-custo`), citando o repo-fonte uma vez. Evita criar uma skill de "stats" e
outra de "eval" desconectadas — o valor para o Metis é a régua única anti-vaidade.

## INCREMENTAL (não aplicado nesta leva)

| repo | ID | disposicao | motivo |
|---|---|---|---|
| JuliusBrussee--caveman | G21 (entidade) | DIFERIDO-INCREMENTAL | Harness de eval de 3 braços como ferramenta executável é alvo **prometeu** (mapa F4); aqui ficou só o princípio. Aplicar no bucket Prometeu. |
| JuliusBrussee--caveman | G22 (entidade) | DIFERIDO-INCREMENTAL | Benchmark com API real + JSON versionado é alvo **prometeu**; entidade executável fora do escopo Metis. |

> IDs G1–G11, G13–G20 não pertencem ao Metis (alvos dedalo/egide/prometeu no mapa de decisão) —
> fora do escopo deste relatório; serão tratados nos relatórios dos respectivos squads.

## Invariante de perda

- ABSORVIDO = 1 entidade (G12, com G21/G22 fundidos como princípio)
- DIFERIDO-INCREMENTAL = 2 (entidades executáveis G21/G22 → bucket Prometeu)
- DESCARTADO = 0
- **PERDIDO = 0** — toda capacidade de escopo-Metis tem destino nomeado.

## Nota de licença
Fonte MIT (Julius Brussee, 2026). Sem cópia literal de código; princípio extraído e reescrito em
PT-BR. Atribuição (owner/repo@sha + licença) registrada no rodapé da SKILL.md e do references.
