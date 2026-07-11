---
name: mapeamento-de-linhagem
description: Monta o grafo de influência de uma mente ou de uma escola de pensamento — de quem ela herdou e a quem influenciou — com prova de contato em cada aresta. Use quando o pedido for "mapeia a linhagem de X", "quem influenciou Y", "de quem Z herdou", "X é discípulo de quem", "monta a genealogia dessa linhagem", "de onde veio essa ideia". Distingue influência direta de zeitgeist, rotula toda aresta sem prova como "inferida" e nunca inventa discipulado. Especialista responsável: genealogista.
tipo: skill
area: Liceu
up: "[[Liceu/_MOC-liceu]]"
---

# Mapeamento de Linhagem

Especialista responsável: `genealogista` (tier 2). Escala ao `ceptico-verificador` quando a prova
de contato de uma aresta é fraca; cruza datas com o `biografo`; entrega ao `bibliotecario` para o índice.

Esta habilidade transforma **uma mente** OU **uma escola de pensamento** num **grafo de influência**
bidirecional (`herdou_de` / `influenciou`), onde cada aresta tem prova de contato com fonte — ou o
rótulo "inferida". Preenche a **seção 2 do dossiê** (Linhagem intelectual), grava a narrativa em
`linhagens/<slug>.md` e o grafo machine-readable em `linhagens/indice-de-linhagens.yaml`.

## Quando usar
- "Mapeia a linhagem do Ernest Dichter." → uma mente, os dois sentidos da influência.
- "Quem influenciou o Eugene Schwartz?" → só os frutos (`influenciou`).
- "De quem o Bernays herdou?" → só as raízes (`herdou_de`).
- "Monta a genealogia da psicanálise do desejo." → escola inteira, encadeamento A→B→C.
- NÃO use para levantar biografia (→ `biografo`), extrair frameworks (→ `cartografo-de-modelos`) nem
  para mercado/concorrente (→ Argos).

## Processo (montar o grafo de influência)

| Passo | Ação |
|------|------|
| **1. Definir o nó** | Qual mente está sendo conectada e a que linhagem(ns) pertence. O nó aponta para um **caminho-canônico**: o dossiê em `mentes/<id>/dossie.md` OU a persona de um squad por referência — nunca duplicada. |
| **2. Levantar as raízes (`herdou_de`)** | De quem a mente herdou: mestres, autores que **leu e citou**, escolas em que se formou. Para cada candidato, exigir **prova de contato**: citação na obra, registro de formação, carta, dedicatória. Sem prova → "influência inferida". |
| **3. Levantar os frutos (`influenciou`)** | A quem a mente influenciou: discípulos diretos, autores que a citaram, escolas derivadas. Mesma exigência de prova nos dois sentidos — a árvore vai para frente e para trás. |
| **4. Classificar a natureza** | **direta** (leu / foi aluno / correspondeu, com fonte) vs **inferida** (indício fraco, citação de citação) vs **zeitgeist** (mesma época, mesmo ar intelectual, sem contato comprovado). Zeitgeist é contexto, não discipulado. |
| **5. Datar a cadeia** | A ordem temporal tem de fechar: a mente-fonte é anterior à mente-herdeira. Anacronismo invalida a aresta — cruzar com o `biografo`. |
| **6. Teste de isolamento** | Sem prova nem indício, a mente é **"isolado"** com justificativa honesta. Nunca forçar mestre ou discípulo para não deixar o nó solto. |
| **7. Gravar grafo + linhagem** | Cada aresta vira uma entrada `edges`; a cadeia vira `linhagens/<slug>.md`. O grafo espelha os campos `herdou_de`/`influenciou` do dossiê — sem divergência. |

Regra de ouro: **uma aresta sem prova de contato não é influência — é inferência, e inferência se rotula.**

## Saída

### 1. Bloco de linhagem para o dossiê (seção 2)
```
## 2. Linhagem intelectual
**Herdou de:** <Mente> — <direta | inferida | zeitgeist> — <prova: obra/citação/carta (ano)> ou "influência inferida"
**Influenciou:** <Mente> — <natureza> — <prova (ano)> ou "influência inferida"
**Posição na linhagem `<slug>`:** <fundadora | herdeira-e-transmissora | sintetizadora | ramo dissidente | terminal | isolado>
```

### 2. `linhagens/<slug>.md` — narrativa da cadeia
Slug em kebab-case (ex.: `psicanalise-do-desejo`). Contém: cabeçalho com a cadeia
(`Freud → Bernays → Dichter → Packard → Cheskin`) e o tema que une; **narrativa da cadeia**
(um parágrafo por mente, com posição + `herdou_de`/`influenciou` + prova); e uma **tabela de arestas
e provas** (De | Para | Natureza | Prova/rótulo). Lacunas honestas e checagem de anacronismo ao final.

### 3. `linhagens/indice-de-linhagens.yaml` — grafo machine-readable
```yaml
nodes:
  - id: <kebab>                 # ex.: freud
    nome: "<Nome Completo>"
    caminho-canonico: "mentes/<id>/dossie.md"   # OU "Pluto/agents/<id>.md" por referência
    linhagens: [<slug>, ...]
edges:
  - de: <id>
    para: <id>
    tipo: <herdou-de | influenciou>             # espelha o campo do dossiê
    natureza: <direta | inferida | zeitgeist>
    fonte: "<obra/citação (ano)>"               # ou "influência inferida — <motivo>"
```
Cada `edge` espelha um campo `herdou_de`/`influenciou` de um dossiê. Grafo e dossiês não podem divergir.

## Vetos (HALT)
- `VETO_ARESTA_SEM_FONTE` — toda aresta carrega **fonte** (prova de contato) OU o rótulo **"inferida"**. Sem isso, não entra como direta.
- `VETO_ZEITGEIST_VIRA_DISCIPULADO` — mesma época sem contato comprovado **não** é `herdou_de`. Registra-se como contexto, nunca como discipulado.
- `VETO_DISCIPULADO_INVENTADO` — nunca fabricar mestre/herdeiro para embelezar a árvore. Conexão falsa é pior que lacuna honesta.
- `VETO_GRAFO_DIVERGENTE` — o `indice-de-linhagens.yaml` tem de ficar **consistente** com os campos `herdou_de`/`influenciou` dos dossiês.
- `VETO_CITACAO_DE_CITACAO` — prova por citação de citação nasce **"inferida"**; escalar a verificação de contato ao `ceptico-verificador`.

## Anti-padrão
- Forçar uma linhagem onde só há coincidência de época: zeitgeist não é discipulado — rotule "isolado" ou "inferida".
- Mapear só as raízes e esquecer os frutos: o mapeamento é **bidirecional** (`herdou_de` E `influenciou`).
- Duplicar a persona ao criar o nó: aponte para a `persona_canonica` do squad por referência, nunca recrie.
- Aceitar discipulado célebre como dado: trate todo "fulano é discípulo de beltrano" como suspeito até achar a prova de contato.
- Deixar o grafo divergir do dossiê: toda aresta espelha um campo do dossiê — edite os dois juntos.

## Exemplo — a cadeia da psicanálise do desejo
`Freud → Bernays → Dichter → Packard → Cheskin`:
- **Freud → Bernays**: `direta`. Bernays é sobrinho de Freud e o cita em *Propaganda* (1928) e *Crystallizing Public Opinion* (1923).
- **Bernays → Dichter**: `inferida`. Sobreposição de campo (pesquisa motivacional); contato direto não localizado → rotula "inferida".
- **Dichter → Packard**: `direta`. Packard documenta e critica Dichter em *The Hidden Persuaders* (1957).
- **Dichter → Cheskin**: natureza a verificar; Cheskin leva o desejo inconsciente ao design e à embalagem.
Anacronismo checado com o `biografo`: a ordem temporal fecha em toda a cadeia.
