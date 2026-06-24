---
name: sintese-de-framework
description: Destila uma mente OU uma linhagem inteira (já dissecada e verificada) num framework operacional Kolden — um método de N passos acionáveis que um squad de execução usa amanhã, com a procedência de CADA passo registrada. Use quando o pedido for "transforma essa linhagem num framework", "destila isso num método", "matriz de X", "checklist de Y", "torna acionável para a Kolden", "como a Kolden usa isso na prática". Só consome dossiês verificados (nunca folclore) e exige procedencia.md em todo passo. Especialista responsável: sintetizador.
---

# Síntese de Framework

Especialista responsável: `sintetizador` (tier 3) — **dono operacional do veto "nenhum framework sem
procedência"**. Consome o trabalho dos dissecadores (`biografo`, `cartografo-de-modelos`,
`lexicografo`) já passado pelo `ceptico-verificador`; faz handoff aos squads de execução.

Esta habilidade transmuta o conhecimento **verificado** de uma mente — ou de várias mentes de uma
linhagem — num **framework operacional**: um procedimento de N passos **acionáveis**, gravado em
`frameworks/<slug>/framework.md`, **sempre** acompanhado de `frameworks/<slug>/procedencia.md` que
ancora cada passo a uma mente + obra/ano + citação. Os dois arquivos são inseparáveis.

## Quando usar
- "Transforma a linhagem da psicanálise do desejo num framework." → composição de linhagem.
- "Destila o Dichter num método de pesquisa motivacional." → destilação de uma mente.
- "Matriz de desejo inconsciente." / "Checklist de ângulos persuasivos." → método nomeado e acionável.
- "Como a Kolden usa o Jung na prática?" → tradução modelo mental → passo executável.
- NÃO use sobre folclore ou dossiê não verificado (devolva ao `ceptico-verificador`), nem para
  executar (escrever a copy/subir o anúncio — isso é handoff aos squads de execução).

## Processo (destilar mente/linhagem → framework com procedência)

| Passo | Ação |
|------|------|
| **1. Reunir insumos verificados** | Ler os dossiês (`mentes/<id>/dossie.md`) e/ou a linhagem (`linhagens/<slug>.md`). **Confirmar que passaram pelo `ceptico-verificador`** — só a "engenharia documentada" alimenta o método, nunca o folclore. |
| **2. Extrair os modelos mentais centrais** | De cada mente, isolar o modelo que importa para o objetivo (ex.: o "desejo recalcado" de Freud, a "falta" de Lacan, a "atmosfera" de Kotler). |
| **3. Traduzir modelo → passo** | Para cada modelo, perguntar "o que isso me manda FAZER?" e escrever o passo como **ação executável** (verbo imperativo, entrada → saída claras). Rejeitar o vago e o teórico. |
| **4. Compor a linhagem num método coerente** | Ordenar os passos numa lógica única que **flui** — não uma colagem de citações soltas. O framework tem uma só linha de raciocínio. |
| **5. Ancorar cada passo à procedência** | Para cada passo do `framework.md`, escrever a linha correspondente no `procedencia.md`: **passo → mente → obra/ano → citação**. Sem essa linha, o passo é rascunho → HALT. |
| **6. Testar a acionabilidade** | De cada passo: "um operador da Kolden consegue executar isto amanhã, com o que está escrito?". Se não, reescrever ou descartar. |
| **7. Exemplo aplicado + handoff** | Mostrar o framework rodando ponta a ponta num caso real e nomear o squad destino (Caliope/Aglaia/Peitho/Pluto) + o artefato. |

Regra de ouro: **nenhum passo sem procedência, nenhum passo sem ação.** Um framework do Liceu é
método com lastro — não palestra, não teoria.

## Saída

### `frameworks/<slug>/framework.md` (slug em kebab-case, ex.: `matriz-de-desejo-inconsciente`)
```
# Framework: <Nome>

## Quando usar
<que problema da Kolden este método resolve, qual squad o consome>

## Os N passos acionáveis
1. <Passo — verbo imperativo, entrada → saída> [procedência: <Mente>]
2. ...
N. <Passo N> [procedência: <Mente>]

## Exemplo aplicado
<o framework rodando ponta a ponta num caso real da Kolden>

## Handoff
Squad destino: <Caliope | Aglaia | Peitho | Pluto> — artefato: <framework + dossiês das mentes-fonte>
```

### `frameworks/<slug>/procedencia.md` (inseparável do framework.md)
```
# Procedência — Framework: <Nome>

| Passo | Mente | Obra / ano | Citação / ancoragem |
|-------|-------|-----------|----------------------|
| 1 — <rótulo> | <Mente> | "<Obra>" (<ano>) | <conceito que ancora o passo> |
| ... |

> GATE: nenhum passo do framework.md sem uma linha aqui. Passo sem procedência → HALT, devolve ao dissecador/cético.
```

## Vetos (HALT)
- `VETO_PASSO_SEM_PROCEDENCIA` — **todo passo** do `framework.md` tem uma linha no `procedencia.md` (mente + obra + ano). Passo sem origem é rascunho → HALT.
- `VETO_FOLCLORE_VIRA_PASSO` — só dossiês que passaram pelo `ceptico-verificador` viram passo. Folclore/anedota não comprovada nunca entra.
- `VETO_ARQUIVOS_SEPARADOS` — `framework.md` e `procedencia.md` são entregues **juntos**; um nunca sai sem o outro.
- `VETO_PASSO_VAGO` — nada de "seja autêntico", "alinhe a marca", "entenda o cliente". Todo passo é executável por um operador amanhã, ou não entra.
- `VETO_HANDOFF_ORFAO` — nunca fazer handoff de framework sem **nomear o squad destino** e o artefato.
- `VETO_OBRA_INVENTADA` — nunca fabricar obra/ano para preencher a procedência; admitir a lacuna e devolver ao dissecador/cético.

## Anti-padrão
- Escrever passo teórico em vez de ação: "compreenda o inconsciente" é teoria; "nomeie o desejo recalcado que o produto satisfaz por baixo da justificativa racional" é passo.
- Empilhar citações em vez de compor: a linhagem vira **um** método que flui, não uma lista de pensadores justapostos.
- Entregar o `framework.md` e prometer o `procedencia.md` "depois": são inseparáveis — saem no mesmo turno.
- Pesquisar do zero: a pesquisa aqui é **mínima**, só para confirmar a citação exata de uma obra/ano já presente no dossiê.
- Deixar o framework órfão: sem squad destino nomeado, o método não serve a ninguém.

## Exemplo canônico — matriz-de-desejo-inconsciente (4 passos)
Funde quatro mentes da linhagem `psicanalise-do-desejo` num método que flui:
1. **Escolher o arquétipo** que ancora a peça — `[procedência: Carl Jung]`.
2. **Nomear o desejo recalcado** que o produto satisfaz por baixo da justificativa racional — `[procedência: Freud / Bernays / Dichter]`.
3. **Projetar a falta** — mostrar o que falta ao consumidor sem o produto — `[procedência: Jacques Lacan]`.
4. **Construir a atmosfera/significação** que envolve tudo — `[procedência: Kotler / Barthes]`.

`procedencia.md` correspondente:

| Passo | Mente | Obra / ano | Citação / ancoragem |
|-------|-------|-----------|----------------------|
| 1 — arquétipo | Carl Jung | "Os Arquétipos e o Inconsciente Coletivo" (1959) | arquétipo como padrão psíquico universal |
| 2 — desejo recalcado | Freud / Bernays / Dichter | "Propaganda" (Bernays, 1928); "The Strategy of Desire" (Dichter, 1960) | o produto satisfaz um desejo inconsciente sob a justificativa racional |
| 3 — projetar a falta | Jacques Lacan | "Écrits" (1966) | o desejo se estrutura em torno da falta (manque) |
| 4 — atmosfera/significação | Kotler / Barthes | "Atmospherics as a Marketing Tool" (Kotler, 1973); "Mythologies" (Barthes, 1957) | ambiente e signos carregam o sentido do desejo |

Handoff: Caliope (copy), Aglaia (marca), Peitho (tráfego), Pluto (oferta) — conforme o uso.
