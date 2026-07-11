---
name: ghostwriting-de-livro
description: |
  Co-autoria / ghostwriting de livro para thought leadership — projeta arco do livro, blueprint
  de capítulo (Promise + 5 batidas), voice protection (não descaracterizar o autor) e estrutura
  de venda pré-lançamento. Use quando o pedido for "quero escrever um livro", "ghostwriting",
  "co-autoria de livro", "livro de autoridade", "thought leadership em livro", "blueprint de
  capítulo", "meu livro está travado", "prefácio / apresentação do autor" ou "vender livro antes
  de escrever". NÃO é copy de e-book de isca digital (aí use `estrutura-de-pagina-de-vendas`
  para a página de captura + `sequencia-de-email-de-lancamento` para nutrição). NÃO é publicação
  no Amazon KDP (execução de publicação → handoff Emporos quando existir).
license: MIT
allowed-tools:
  - Read
  - Write
  - Edit
  - Grep
  - Glob
  - AskUserQuestion
tipo: skill
area: Caliope
up: "[[Caliope/_MOC-caliope]]"
---

# Ghostwriting de livro — arco, capítulo, voz (PT-BR)

Livro de thought leadership não é blog longo. É um argumento sustentado ao longo de 40-80k
palavras que exige (a) uma **promessa central** que o leitor lembra em uma frase, (b) um
**arco** que empilha capítulos, (c) uma **voz** que soa como o autor — não como o
ghostwriter. Esta habilidade opera nas três frentes.

## Herança histórica

- **Josh Bernoff — "Writing Without Bullshit" (2016)** — a régua moderna de prosa de negócios:
  fórmula ROAM (Readers → Objective → Action → iMpression), regra dos 30 minutos por dia,
  proibição de jargão vazio.
- **William Zinsser — "On Writing Well" (1976 → 30ª ed. 2016)** — clareza, brevidade, humanidade;
  fonte primária de disciplina de revisão.
- **Ryan Holiday** (via *Perennial Seller*, 2017) — livro como produto de longa cauda; publicar
  para se destacar em 10 anos, não em 10 semanas.
- **Tucker Max / Book in a Box (Scribe)** — industrializou o processo de ghostwriting em bloco;
  criou o *positioning statement* + *table of contents interview*.

## As 4 fases do livro

Nunca comece escrevendo o capítulo 1. Nunca. Escreve-se **fora de ordem** e por camadas.

| Fase | Entregável | Duração típica |
|---|---|---|
| **1. Positioning** | promessa em 1 frase + público em 1 parágrafo + why-now em 3 linhas | 1-2 semanas |
| **2. Arquitetura** | table of contents (10-15 capítulos) + arco em 3 atos | 2-3 semanas |
| **3. Escrita** | primeira versão de cada capítulo (fora de ordem, do mais fácil ao mais difícil) | 3-9 meses |
| **4. Revisão de voz** | passar tudo pelo filtro do autor (leitura em voz alta obrigatória) | 4-8 semanas |

## Positioning — a promessa em 1 frase

O leitor precisa terminar o livro sabendo dizer, sem hesitar, o que ele aprendeu. Esse é o
"one-sentence takeaway".

Molde:
> Depois deste livro, {público} vai {mudança específica de comportamento ou visão},
> especialmente {contexto de uso}.

Exemplos:
- "Depois deste livro, engenheiros seniores vão saber estruturar uma decisão arquitetural
  como um trade-off consciente, não como uma opinião — especialmente sob pressão de deadline."
- "Depois deste livro, fundadores solo vão saber quando NÃO contratar, mesmo com dinheiro no
  caixa."

Se você não consegue escrever essa frase em 30 segundos, **não há livro ainda**. Volte para a
entrevista com o autor.

## Blueprint de capítulo — Promise + 5 batidas

Todo capítulo repete a mesma estrutura microscópica. É o que faz o leitor entrar em ritmo.

| Batida | Extensão típica | Papel |
|---|---|---|
| **Promise** (abre o capítulo) | 100-300 palavras | promete o insight específico daquele capítulo (não do livro inteiro) |
| **1. Cena** | 300-800 | história concreta que carrega a tese; nome próprio, lugar, número |
| **2. Tese** | 200-500 | o princípio abstrato que a cena ilustra, dito com clareza |
| **3. Mecânica** | 500-1500 | como funciona (o que fazer, com quê, em que ordem) |
| **4. Objeção** | 200-500 | a crítica óbvia que o leitor já formou — nomeada e respondida |
| **5. Aplicação** | 200-500 | próximo passo executável (exercício, checklist, prompt) |

**Regra dura:** a Promise abre. A Aplicação fecha. Nunca inverta. O leitor entra no capítulo
sabendo o que vai ganhar e sai sabendo o que fazer amanhã de manhã.

## Voice protection — o filtro do autor

O maior risco do ghostwriting é o livro sair **soando como o ghostwriter**. O leitor detecta em
duas páginas. Três disciplinas obrigatórias:

1. **Léxico próprio do autor.** Antes de escrever qualquer capítulo, montar uma planilha com
   50-100 termos que o autor usa e 20-40 termos que ele **nunca** usa. O texto respeita a
   lista. Ex.: um autor que diz "operação" nunca deve aparecer dizendo "workflow".
2. **Marcas rítmicas.** Frases longas ou curtas? Aforismos? Perguntas retóricas? Digressões
   parentéticas? Mapeie a assinatura rítmica em 2-3 gravações do autor falando (podcast,
   entrevista) e aplique.
3. **Leitura em voz alta.** Todo capítulo passa pela leitura do autor em voz alta. Onde ele
   tropeça, corta. Onde ele para pra respirar antes da vírgula, ajusta a pontuação. Essa
   passada é intransponível.

Se o autor não tem tempo pra ler em voz alta, ele não está pronto pra publicar. Isso não é
opcional.

## Estrutura de venda pré-lançamento (opcional mas alto-ROI)

Livro que vende antes de existir cria compromisso e valida a promessa. Três formatos:

| Formato | Quando | Objetivo |
|---|---|---|
| **Newsletter serializada** | 6-12 meses antes | testar 3 capítulos como posts; medir engajamento por tema |
| **Workshop / cohort** | 3-6 meses antes | vender o conteúdo cru como curso; entrevistas viram material |
| **Pré-venda editorial** | 1-3 meses antes | cadastro de e-mail em página específica; medir intenção |

Todas alimentam a lista que dispara o launch (isso vira input para
`sequencia-de-email-de-lancamento`).

## Anti-padrões

- **Escrever o capítulo 1 primeiro.** É o mais difícil e o que mais muda. Comece pelo
  capítulo que o autor melhor domina.
- **Ghostwriter narrando em terceira pessoa "o autor diz…"** — quebra a voz. Ghost escreve
  em primeira, autor lê e ajusta.
- **Capítulo sem cena.** Vira ensaio abstrato. Sem nome próprio, sem número, sem lugar, o
  leitor não fixa.
- **"Coloque um exemplo do seu negócio aqui" sem exemplo.** Se o autor não tem o exemplo, a
  tese ainda não está pronta.
- **Book proposal com 30 páginas de teoria e 0 leitores validados.** Se ninguém pagou por uma
  aula sobre a tese, o livro provavelmente não vende.

## Fronteiras inter-squad

- **Copy do livro + prefácio + promo copy** — Caliope faz.
- **Arte de capa + diagramação** — handoff a **Aglaia**.
- **Distribuição orgânica (podcasts, newsletters, redes)** — handoff a **Pheme**.
- **Ads de pré-venda e lançamento** — handoff a **Peitho**.

## Formato de saída

1. Promise em 1 frase (validada).
2. Public + why-now em 3 linhas.
3. Table of contents (10-15 capítulos) com Promise de cada.
4. Léxico próprio do autor (usa / não usa).
5. Um capítulo escrito no blueprint completo (Promise + 5 batidas).
6. Plano de pré-venda em 1-3 formatos.

## Referências

- `references/blueprint-capitulo.md` — template completo do capítulo com contagem-alvo.
- `references/lexico-do-autor.md` — planilha para mapear voz.

---

Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B02/marketing
(IDs MKT-G17, G18). Herança histórica: Josh Bernoff, William Zinsser, Ryan Holiday,
Tucker Max/Scribe. Sem cópia literal do upstream.
