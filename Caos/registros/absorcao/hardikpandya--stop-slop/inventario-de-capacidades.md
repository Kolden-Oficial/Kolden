---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/hardikpandya--stop-slop/mapa-de-decisao|mapa-de-decisao]]"
  - "[[Caos/registros/absorcao/hardikpandya--stop-slop/seguranca|seguranca]]"
---

# F3 — Inventário de capacidades · hardikpandya--stop-slop

Rota A — granularidade por técnica. Repo = 1 skill ("stop-slop") decomposta em métodos de edição + 3 referências de dados.

| ID | capacidade | tipo | keywords | dominio | fonte(arquivo:linha) |
|---|---|---|---|---|---|
| G1 | Skill "stop-slop": remover padrões de escrita de IA da prosa (drafting/editing/review) | skill | anti-ia, slop, edicao, prosa, tells, humanizar | copy | SKILL.md:1-69 |
| G2 | Cortar frases de enchimento: aberturas de pigarro, muletas de ênfase, todos os advérbios | metodo-prompt | filler, advérbio, throat-clearing, ênfase | copy | SKILL.md:15; references/phrases.md:1-128 |
| G3 | Quebrar estruturas formulaicas (contraste binário, listagem negativa, fragmentação dramática, setup retórico, falsa agência) | metodo-prompt | estrutura, contraste-binário, clichê, falsa-agência | copy | SKILL.md:17; references/structures.md:1-127 |
| G4 | Forçar voz ativa: todo período com sujeito humano agindo; sem passiva; sem objeto inanimado com verbo humano | metodo-prompt | voz-ativa, passiva, ator, sujeito | copy | SKILL.md:19; references/structures.md:96-106 |
| G5 | Ser específico: matar declarativas vagas e extremos preguiçosos (every/always/never) | metodo-prompt | especificidade, vago, declarativa, extremos | copy | SKILL.md:21; references/phrases.md:118-128 |
| G6 | Pôr o leitor na cena: "você" > "as pessoas"; eliminar narrador-à-distância | metodo-prompt | leitor-na-cena, narrador, voz, você | copy | SKILL.md:23; references/structures.md:82-93 |
| G7 | Variar ritmo: misturar tamanhos de frase, dois itens > três, sem em-dash | metodo-prompt | ritmo, cadência, em-dash, listas | copy | SKILL.md:25; references/structures.md:118-127 |
| G8 | Confiar no leitor + cortar quotáveis: afirmar direto, reescrever pull-quotes | metodo-prompt | confiança, quotável, direto, hand-holding | copy | SKILL.md:27-29 |
| G9 | Checklist "Quick Checks" pré-entrega (12 verificações de padrões de IA) | metodo-prompt | checklist, qa, revisão, pré-entrega | copy | SKILL.md:31-46 |
| G10 | Rubrica de pontuação 5 dimensões (Directness, Rhythm, Trust, Authenticity, Density) 1-10; <35/50 revisa | metodo-prompt | scoring, rubrica, scorecard, qualidade-de-prosa | copy | SKILL.md:48-60 |
| G11 | Dataset de frases proibidas (pigarro, jargão de negócio→plain, advérbios, meta-comentário, ênfase performática, telling, declarativas vagas) | referencia | frases-banidas, jargão, glossário, swipe-negativo | copy | references/phrases.md:1-128 |
| G12 | Dataset de estruturas/padrões a evitar com tabela "padrão→problema→fix" | referencia | estruturas, padrões, anti-padrão, fix | copy | references/structures.md:1-127 |
| G13 | Conjunto de exemplos antes/depois (5 transformações comentadas) | referencia | exemplos, before-after, transformação, treino | copy | references/examples.md:1-59 |

**Total: 13 capacidades (G1–G13).**
