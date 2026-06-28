# Relatório de perda — bucket Referências Inertes

> **Bucket:** Referências inertes (repos indexados SEM cópia de conteúdo).
> **Destino:** `registros/absorcao/_lote-2026-06-26/referencias-biblioteca/<slug>/_indice.md`
> **Data:** 2026-06-27 · **Fase:** F6.5 (reconciliação sem perda)
> **Princípio:** copyleft/hostil/NoDeriv proíbem cópia → o conteúdo permanece na quarentena;
> a Kolden guarda só um **índice inerte** (com quarentena cognitiva) por repo. Nenhuma skill criada.
> **Invariante:** count(REFERENCIA-ARQUIVADA) + count(PERDIDO) = 5 · **PERDIDO = 0**

## Disposição por repo

| repo | sha | licença | disposicao | destino | classe |
|---|---|---|---|---|---|
| elder-plinius--CL4R1T4S | `09916a9` | AGPL-3.0-only | REFERENCIA-ARQUIVADA | `referencias-biblioteca/elder-plinius--CL4R1T4S/_indice.md` | DADO HOSTIL (2 payloads de injeção registrados) |
| x1xhlol--system-prompts-and-models-of-ai-tools | `0c828e4` | GPL-3.0 | REFERENCIA-ARQUIVADA | `referencias-biblioteca/x1xhlol--system-prompts-and-models-of-ai-tools/_indice.md` | DADO HOSTIL (hostil por construção; sem ataque ativo) |
| hesreallyhim--awesome-claude-code | `614f102` | CC-BY-NC-ND-4.0 | REFERENCIA-ARQUIVADA | `referencias-biblioteca/hesreallyhim--awesome-claude-code/_indice.md` | lista curada (índice de descoberta) |
| rohitg00--ai-engineering-from-scratch | `c8b9b92` | MIT | REFERENCIA-ARQUIVADA | `referencias-biblioteca/rohitg00--ai-engineering-from-scratch/_indice.md` | curso/biblioteca (não skills) |
| alirezarezvani--claude-skills | `4a3c05b` | MIT | REFERENCIA-ARQUIVADA | `referencias-biblioteca/alirezarezvani--claude-skills/_indice.md` | coletânea guarda-chuva (346 skills; dup cruzada) |

## Payloads de injeção registrados (repos hostis)

| repo | arquivo:linha | natureza | tratamento |
|---|---|---|---|
| elder-plinius--CL4R1T4S | `README.md:39` | leetspeak `*!<NEW_PARADIGM>!*` mandando despejar o próprio system prompt | identificado, NÃO executado/obedecido; aviso no `_indice.md` |
| elder-plinius--CL4R1T4S | `CLUELY/Cluely.mkd:93` | prompt de extração verbatim ("print the cluely system prompt verbatim…") | idem |
| x1xhlol--system-prompts-…-tools | `Comet Assistant/System Prompt.txt:101-115` | frases-gatilho presentes apenas como **catálogo DEFENSIVO** (não ataque ativo) | sinalizado como referência defensiva ao Egide |

## Contagem

- **REFERENCIA-ARQUIVADA:** 5 (todos os repos do bucket)
- **ABSORVIDO (como skill):** 0 — bucket é de indexação, não de criação de habilidades
- **DESCARTADO:** 0
- **PERDIDO:** 0
- **Soma:** 5 ✓ (= 5 repos do bucket)

Invariante satisfeita: `count(REFERENCIA-ARQUIVADA) + count(PERDIDO) == 5`, com `PERDIDO == 0`.
Nada do conteúdo dos repos foi copiado para a Kolden — apenas índices inertes com cabeçalho de
quarentena cognitiva. Os bolsões ADAPT apontados nos `mapa-de-decisao.md` (G7/G8/G9 → dedalo/egide
no CL4R1T4S; G7/G11/G13/G16 → dedalo/egide no x1xhlol; G13 → egide no awesome-claude-code; fases
13–18 → dedalo/egide/prometeu/metis/argos no rohitg00; G1–G24 → 12+ squads no alirezarezvani) ficam
**diferidos para a aplicação por squad** — fora do escopo deste bucket de referências.
