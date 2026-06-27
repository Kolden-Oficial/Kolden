---
name: busca-semantica-no-acervo
description: Buscar, deduplicar e re-ranquear itens do acervo do Argos (resultados crus de múltiplos retrievers, fontes coletadas, relatórios e padrões passados no MEMORY.md/registros) combinando busca léxica fuzzy + similaridade semântica. Use quando o fan-out de retrievers (Exa/Tavily/Firecrawl/Sonar) devolver MUITAS fontes sobrepostas e você precisar consolidar as N mais relevantes sem duplicatas, ou quando quiser recuperar inteligência já produzida ("já pesquisamos isso?") antes de coletar de novo.
---

# Habilidade: busca-semantica-no-acervo (fusão léxica + semântica)

Quando o Argos faz **fan-out de retrievers** (agora Exa, Tavily, Firecrawl e Sonar), o resultado é um
monte de fontes **sobrepostas e ruidosas**. Esta habilidade aplica uma técnica de **busca híbrida**
para (a) recuperar o que já existe no acervo antes de recoletar e (b) consolidar os resultados crus
nas **N fontes mais relevantes, sem duplicatas**.

A técnica tem duas pernas, usadas juntas (híbrido) ou isoladas:

## 1. Busca léxica fuzzy (rápida, sem custo de LLM)

Busca aproximada por palavra-chave sobre campos com **peso** — tolera erro de digitação e ordem de
tokens. Esquema de pesos (adaptado do `fuse.js` do repo-fonte):

| Campo do item | Peso |
|---|---|
| `titulo`/`nome` | 0.4 |
| `tags`/`keywords` | 0.3 |
| `resumo` | 0.2 |
| `notas` | 0.1 |

- Quebre a query em tokens e una com **OR** (`"auth contrl"` → `auth | contrl`) — casa itens com
  qualquer token, robusto a erro.
- `threshold` ~0.4 (0 = match perfeito, 1 = pior). `ignoreLocation: true` (não penaliza posição).
- Score: **0 = melhor**, 1 = pior. Ordene crescente, corte no `limit`.

Use para: "já temos relatório/fonte sobre X?" varrendo `registros/` e o `MEMORY.md` do squad.

## 2. Similaridade semântica (mais precisa, exige embeddings)

Quando há embeddings pré-computados dos itens, ranqueie por **similaridade de cosseno** entre o
embedding da query e o de cada item:

```
cos(a,b) = (a·b) / (|a|·|b|)        # 0 se algum vetor tiver magnitude zero
```

- `threshold` mínimo de similaridade (descarta itens abaixo).
- Filtro por `tipo` de item (ex.: só `relatorio`, ou só `fonte`).
- Converta para score "menor = melhor" (`score = 1 - similaridade`), ordene, corte no `limit`.

Use para: agrupar fontes que **dizem a mesma coisa com palavras diferentes** (dedup semântico) e
re-ranquear o fan-out por relevância real à pergunta, não só por overlap de palavra.

## Receita de fusão (o uso típico no Argos)

1. Junte os resultados crus dos retrievers num pool, normalizando `{url, titulo, snippet, tipo, data}`.
2. **Dedup exato** por URL canônica.
3. **Dedup semântico**: agrupe itens com cosseno alto entre os snippets; mantenha 1 representante por
   cluster (preferindo a fonte mais citável / com data mais recente).
4. **Re-ranqueie** o pool consolidado pela perna léxica + semântica contra a pergunta original.
5. Devolva o **top-N** ao `research-synthesizer` — cada item ainda carrega **URL + timestamp**
   (gate ARGOS-CL-001). A fusão **não** dispensa o cross-check de ≥2 fontes para número-chave.

## Regras (herdadas do Argos)

1. **Proveniência preservada.** Dedup/re-ranking nunca apaga a origem de um item; só escolhe o
   representante. A URL + data de cada fonte sobrevive ao processo.
2. **Sem alucinação de relevância.** O score é um auxílio de ordenação, não um veredito de verdade —
   a confiabilidade continua vindo da fonte + cross-check.
3. **Acervo é zona verde.** Busca sobre o que o Argos já coletou/produziu; não toca `modulo-cinza/`.

---
*Fonte: `Lum1104/Understand-Anything@54754a6` (packages/core/src/search.ts + embedding-search.ts,
ID G29) — licença MIT. Técnica de busca híbrida (fuzzy ponderado + cosseno) extraída e reescrita em
PT-BR, aplicada ao acervo do Argos (não ao grafo de código original); sem cópia literal.*
