---
name: anuncio-por-estagio-de-consciencia
description: |
  Escreve copy de anúncio ajustada ao estágio de consciência do público (de quem nunca
  ouviu falar do problema até quem só falta o empurrão final), escolhendo o framework de
  copy (PAS, BAB, FAB, AIDA, prova social, contrarian, especificidade) certo para cada
  temperatura e canal. Use quando o pedido for "escrever anúncio para público frio/quente",
  "copy de Meta/Google/LinkedIn/TikTok", "ângulo do anúncio", "qual framework usar nesse
  criativo", "anúncio de topo/meio/fundo de funil" ou "o anúncio não converte no público
  frio". Para a página de destino, use estrutura-de-pagina-de-vendas. Para só a headline,
  use headline-e-hook-testaveis.
license: MIT
allowed-tools:
  - Read
  - Write
  - Edit
  - Grep
  - Glob
  - AskUserQuestion
---

# Anúncio por estágio de consciência (PT-BR)

O mesmo produto exige mensagens diferentes conforme o quanto o público já sabe. Um anúncio
que fala de feature para quem nem sabe que tem o problema é dinheiro queimado; um anúncio
que explica o problema para quem já está comparando preços é lento. Esta habilidade casa o
**estágio de consciência** do público com o **framework de copy** e o **canal** certos.

## Os 5 estágios de consciência (Eugene Schwartz)

1. **Inconsciente** — não sabe que tem o problema. Mensagem: gerar reconhecimento da dor /
   romper o padrão. Não venda ainda; faça a pessoa parar e se enxergar.
2. **Consciente do problema** — sente a dor, não sabe que há solução. Mensagem: nomear a dor
   com as palavras dela e agitar o custo de não resolver.
3. **Consciente da solução** — sabe que esse tipo de solução existe, não conhece a sua.
   Mensagem: mostrar o mecanismo, educar, diferenciar.
4. **Consciente do produto** — conhece seu produto, ainda não comprou. Mensagem: prova,
   diferenciação, derrubar a objeção, reverter risco.
5. **Mais consciente** — só falta o empurrão. Mensagem: oferta direta, urgência/escassez
   genuína, CTA sem rodeio.

## Matriz estágio → framework → mensagem

| Estágio | Objetivo | Frameworks fortes | Foco da mensagem |
|---|---|---|---|
| Inconsciente | interromper, gerar reconhecimento | Contrarian, Especificidade, Curiosidade | a dor/realidade, não o produto |
| Consciente do problema | nomear e agitar a dor | **PAS**, Contrarian | a dor nas palavras do cliente |
| Consciente da solução | educar, diferenciar | **AIDA**, How-It-Works, BAB | o mecanismo e o porquê |
| Consciente do produto | provar, remover risco | Social Proof, **BAB**, FAB | prova específica + garantia |
| Mais consciente | converter | Especificidade + oferta/garantia | oferta direta, urgência real |

O detalhamento de cada framework (estrutura + exemplo), o seletor por canal e a tabela de
anti-padrões estão em `references/frameworks-e-matriz.md`.

## Os frameworks de copy (resumo)

- **PAS — Problema, Agitação, Solução.** Público frio que sente a dor. Nomeie a dor, faça
  sentir o quanto ela custa (sem exagerar — eles percebem), posicione o produto como o
  conserto óbvio.
- **BAB — Antes, Depois, Ponte.** Quem conhece o problema e está avaliando. Onde ele está
  hoje → onde quer chegar → como o produto leva de um a outro. Ótimo para caso/antes-depois
  com número.
- **FAB — Feature, Vantagem, Benefício.** Fundo de funil / remarketing. Erro comum: parar na
  feature. "2FA" é feature; "segurança de banco" é vantagem; "durma tranquilo sabendo que os
  dados do cliente estão protegidos" é o benefício.
- **AIDA — Atenção, Interesse, Desejo, Ação.** Vídeo e copy mais longa (LinkedIn, e-mail).
  Gancho nos 3 primeiros segundos.
- **Prova social.** Decisão / remarketing. Voz do cliente com número específico, resultado
  liderado por dado, ou prova por volume ("X times confiam").
- **Contrarian.** Topo de funil em tema saturado. Desafie a sabedoria convencional da
  categoria e reposicione — só funciona com substância real por trás.
- **Especificidade.** Funciona em todo estágio e é o mais subutilizado. Troque toda
  afirmação vaga por número: "economize tempo" → "economize 3 horas por semana".

## Gatilhos psicológicos (use com ética e só quando genuínos)

Aversão à perda (enquadre o que se perde por não agir), prova social/bandwagon, escassez e
urgência (apenas quando reais), ancoragem (mostre o preço/alternativa maior primeiro),
contraste antes/depois, reciprocidade (dê valor antes de pedir). Catálogo completo no
material de referência.

## A regra de ouro

Todo anúncio tem **um** trabalho: fazer a pessoa certa parar, ler e tomar **uma** ação. Se a
copy tenta fazer três coisas, não faz nenhuma bem. Uma mensagem, um CTA, um próximo passo.

## Formato de saída

Para cada anúncio entregue: o estágio de consciência alvo, o framework escolhido (e por
quê), a copy completa (texto principal + headline + CTA) e o canal recomendado. Quando o
público abranger mais de um estágio, entregue uma variação por estágio. Para a headline,
gere e pontue com `headline-e-hook-testaveis`. Marque a confiança e proponer 2-3 variações
de headline/CTA. Se o texto saiu com cara de IA, passe pela `de-slop`.

## Referências

- `references/frameworks-e-matriz.md` — frameworks detalhados com exemplos, seletor por
  canal (Google/Meta frio/Meta remarketing/LinkedIn/TikTok), matriz funil→framework,
  gatilhos psicológicos e anti-padrões.

---

## Atribuição

Habilidade reescrita em PT-BR a partir de fonte MIT (princípios adaptados, sem cópia
literal): **alirezarezvani/claude-skills** (`marketing-skill/skills/ad-creative`, referência
`creative-frameworks.md`, e `marketing-psychology`, referência `mental-models-catalog.md`),
SHA `4a3c05b69e64f4925f7fc65c88890f614f79caf0`, licença MIT. Os 5 estágios de consciência
são um conceito clássico de copywriting (Eugene Schwartz, *Breakthrough Advertising*).
Absorvida pelo Caos (Kolden) em 2026-06-27.
