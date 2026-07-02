---
name: script-de-livestream
description: |
  Roteiro de live de venda (livestream commerce) — estrutura de bloco de 5 minutos que se repete
  (Retention/Pain → Intro/Trust → Price/Urgency → Follow-up), cronograma da sessão inteira,
  moldes de linhas para o host e transições entre produtos. Use quando o pedido for "roteiro de
  live", "script de live de venda", "livestream commerce", "live no TikTok/Kwai/Instagram/Shopee",
  "como vender ao vivo", "cronograma de live" ou "prompts para o host". NÃO é ops do estúdio /
  training do host / setup de câmera (isso é `Pheme:livestream-commerce`). Handoff DEVE existir.
license: MIT
allowed-tools:
  - Read
  - Write
  - Edit
  - Grep
  - Glob
  - AskUserQuestion
---

# Script de livestream — o bloco de 5 minutos que se repete (PT-BR)

Livestream commerce (Douyin, Kuaishou, TikTok Shop, Shopee Live, Amazon Live, Kwai) opera em
uma economia de atenção que se mede em segundos: o espectador entra no meio da live, precisa
entender em 8 segundos o que está sendo vendido e por que agora. O roteiro de uma live boa
não é linear — é um **bloco de 5 minutos que se repete o dia inteiro**, com variação de
produto, ângulo e urgência.

## Herança histórica

- **Viya (薇娅) / Austin Li (李佳琦)** — top hosts chineses que codificaram o padrão de
  Douyin/Taobao Live 2018-2022; introduziram o script rotacional de 5min por produto.
- **Fan Bingbing / TikTok Shop US 2023-2024** — adaptação ocidental: mesma estrutura, menos
  urgência artificial, mais story-selling.
- **QVC / HSN** (TV shopping anos 80-90) — a origem operacional: os "cornerstones" da venda
  ao vivo (demo → price reveal → scarcity → order → cross-sell) foram consolidados por
  Barry Diller e refinados por Kathy Levine.
- **Cassell (Convertkit) / Beyoncé keynote scripting** — protocolo de "energy tags" para o
  host: quando subir a voz, quando descer, quando pausar.

## O bloco canônico de 5 minutos (RIPF)

Cada produto rende 1 bloco. Um bloco tem 4 fases em ordem fixa. O host repete a estrutura
mudando o produto — a audiência que entra a qualquer momento pega o ciclo do começo.

| Fase | Tempo | Função | O que o host faz |
|---|---|---|---|
| **R — Retention/Pain** | 0:00 - 1:00 | prende quem acabou de entrar; nomeia a dor | pergunta direta: "Quantas de vocês passaram por {X}?"; pinta a dor concreta em 3 exemplos |
| **I — Intro/Trust** | 1:00 - 2:30 | apresenta o produto + prova | mostra o produto na mão; menciona 1 número real (vendas, review, tempo de mercado); usa (mas não abusa) demonstração |
| **P — Price/Urgency** | 2:30 - 4:00 | preço + escassez concreta | revela o preço; compara com o de fora da live; cita estoque real ("temos 240 unidades pra live inteira"); timer visível |
| **F — Follow-up** | 4:00 - 5:00 | fecha o pedido + prepara o próximo bloco | tutorial de compra em 15s ("clique no ícone da bolsinha…"); teaser do próximo produto |

**Regra dura:** nunca pule R (retention). Público de live rotaciona a cada 30-90 segundos.
Quem entrou às 3:30 precisa achar sentido no que está vendo — e o R volta a cada 5 minutos.

## Cronograma da sessão inteira (2h típica)

| Bloco | Papel | Produto |
|---|---|---|
| Bloco 0 (5 min) | **abertura fria** — hook do dia + agenda + regra da live | — |
| Blocos 1-4 (20 min) | produtos-âncora, os mais provados; construir confiança + volume | 4 produtos |
| Bloco 5 (5 min) | **quebra de energia** — sorteio, resposta a comentário, mini-game | — |
| Blocos 6-12 (35 min) | produtos-teste, hipóteses novas; aprender qual replicar | 7 produtos |
| Bloco 13 (5 min) | **momento pico** — produto-estrela, oferta exclusiva da live | 1 produto |
| Blocos 14-20 (35 min) | cross-sell dos vencedores dos blocos 1-13; upsell/kit | 7 produtos |
| Bloco 21 (5 min) | **encerramento** — recap + próxima live agendada + follow no perfil | — |

## Linhas moldadas para o host (com energy tags)

Energy tag: `[baixa]` `[média]` `[alta]` `[pico]` — a variação prende o espectador.

### R — Retention/Pain
- `[média]` "Se você tá entrando agora, deixa eu te contar por que essa live é diferente."
- `[alta]` "Levanta a mão quem já {evento ruim específico}. Eu passei por isso, e por isso
  achei o que vou mostrar agora."
- `[baixa]` "Fica comigo aqui por 90 segundos que você vai entender."

### I — Intro/Trust
- `[média]` "Isso aqui não é qualquer {categoria}. Nesses últimos {tempo} eu testei {número}
  antes de achar esse."
- `[alta]` "Olha o que ele faz [demonstração]. Você viu, né?"
- `[baixa]` "A marca é {nome}. Eles têm {número} de reviews com {rating}."

### P — Price/Urgency
- `[pico]` "Preço fora da live: {X}. Aqui, agora, nos próximos {tempo}: {Y}."
- `[alta]` "Estoque para a live é {número}. Não é marketing — é literalmente o que a gente
  conseguiu segurar."
- `[média]` "Timer tá aí no canto. Enquanto ele conta, quem quer, corre."

### F — Follow-up
- `[alta]` "Clica no ícone da bolsinha. Aparece o produto. Escolhe o {variante}. Bota
  quantidade. Finaliza. 15 segundos."
- `[média]` "Quem já pediu, comenta 'peguei' que eu confiro."
- `[baixa]` "Próximo bloco em 30 segundos, e é {teaser do próximo produto sem revelar}."

## Transições entre produtos (nunca cortar seco)

Entre blocos, 20-40 segundos de ponte. Molde:
> "Quem pegou o {produto anterior}, avisa aí. Enquanto eu confiro os pedidos, vou pegar aqui
> o próximo. Esse é para quem {dor conectada ao próximo produto}."

A ponte carrega três coisas ao mesmo tempo: (a) prova social ("quem pegou avisa"), (b)
autoridade operacional ("estou conferindo"), (c) hook do próximo bloco.

## Métricas por bloco (o que reportar depois)

| Métrica | O que revela | Ação |
|---|---|---|
| GMV/min por bloco | qual produto vendeu | replicar produto-âncora |
| Watch time médio | retention do bloco | ajustar R do próximo |
| Add-to-cart / view | eficiência do I+P | testar novo hook |
| Order / add-to-cart | eficiência do F | melhorar tutorial de compra |
| Comentários/min | engajamento | ajustar energy tags |

## Anti-padrões

- **Live linear sem repetição.** Espectador que entra às 45min ficou sem o R.
- **Gritar o tempo inteiro.** Energy tag `[pico]` só dura 30-60s por bloco; o resto é média.
- **Escassez inventada** ("só 3 unidades!" enquanto ainda há 300 no estoque). Douyin e TikTok
  Shop já derrubam por isso. Escassez tem que ser verdadeira.
- **Cross-sell antes de venda-âncora.** Não empurre kit no bloco 2. Ganhe confiança primeiro.
- **Depender do host lembrar o preço.** Sempre teleprompter ou cue-card. Um erro de preço
  é 200 pedidos revertidos.

## Fronteiras inter-squad

- **Roteiro / script / linhas do host / cronograma da live** — Caliope faz (esta habilidade).
- **Treinamento do host + operação do estúdio + regia da live + integração de estoque em
  tempo real** — handoff obrigatório a **`Pheme:livestream-commerce`**.
- **Post-live: cortes verticais de highlights + reels do momento pico** — handoff a
  **Pheme** (edição de shortvideo).
- **Ads que puxam público para a live (Qianchuan / Spark Ads)** — handoff a **Peitho**.

## Formato de saída

1. Cronograma da sessão (2-3h) com blocos numerados e produto de cada.
2. 1 bloco RIPF completo escrito para o produto-âncora (com energy tags).
3. Moldes de linha para R/I/P/F prontos para o host.
4. 3 pontes de transição entre blocos.
5. Handoff para `Pheme:livestream-commerce` declarado.

## Referências

- `references/moldes-de-linha.md` — biblioteca ampliada de linhas por energy tag.

---

Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B02/marketing
(ID MKT-G48). Herança histórica: Viya, Austin Li, QVC (Barry Diller / Kathy Levine),
TikTok Shop US 2023-2024. Sem cópia literal do upstream.
