---
name: headline-e-hook-testaveis
description: |
  Gera headlines e hooks (a primeira linha que faz parar e ler) usando fórmulas de copy
  comprovadas, pontua cada candidata e entrega as 2-3 melhores com a nota — em vez de um
  palpite único. Use quando o pedido for "preciso de uma headline", "me dá títulos para X",
  "qual o melhor gancho", "abertura para esse anúncio/e-mail/post", "essa headline está
  fraca" ou "variações de título para testar". Para a página inteira, use
  estrutura-de-pagina-de-vendas. Para o ângulo do anúncio por temperatura do público, use
  anuncio-por-estagio-de-consciencia.
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

# Headline e hook testáveis (PT-BR)

A headline é a peça mais importante de qualquer copy: decide se o resto será lido. O hook é
a primeira linha de um anúncio, e-mail ou post — o gancho de 3 segundos. Esta habilidade
não chuta um título; ela **gera muitos, pontua todos e recomenda os melhores com a nota**,
para que a escolha seja testável e não uma questão de gosto.

## O método (gerar → pontuar → escolher)

1. **Colha o essencial.** Qual o resultado/transformação que a oferta entrega? Qual a dor?
   Quem é o público? Há um número real (tempo, %, quantidade)? Onde a headline vai aparecer
   (página, anúncio, e-mail, post)? Sem um número ou um benefício concreto, a headline cai
   no genérico — peça antes de inventar.
2. **Gere 5 a 10 candidatas** variando as **famílias de fórmula** (não repita a mesma
   estrutura): foco em resultado, em problema, em público, em diferenciação, em prova,
   curiosidade, objeção. O catálogo de fórmulas com exemplos está em
   `references/formulas-de-headline.md`.
3. **Pontue cada candidata** nas 6 dimensões abaixo (0-2 cada, total 0-12). Descarte
   qualquer uma abaixo de ~7.
4. **Entregue as 2-3 melhores** com a nota e o detalhamento por dimensão, mais a família de
   fórmula de cada. Nunca apresente uma candidata fraca como recomendação principal.

## As 6 dimensões de pontuação (0-2 cada)

| Dimensão | 0 | 1 | 2 |
|---|---|---|---|
| **Especificidade** | adjetivo vago | algum detalhe | número/prazo/resultado concreto |
| **Clareza** | exige reler | compreensível | entendida em 1 leitura, 5 segundos |
| **Tamanho/ritmo** | longa demais ou arrastada | aceitável | enxuta, sem palavra sobrando |
| **Palavra de força** | neutra | 1 termo forte | verbo/termo que puxa ação ou emoção |
| **Puxão emocional** | indiferente | leve interesse | toca dor ou desejo real do público |
| **Formato/encaixe** | não cabe no canal | cabe | sob medida para o canal e o tráfego |

Regra dura: **específico vence vago em toda métrica.** "Economize tempo" (vago) → "Corte o
relatório de 8h para 45min" (específico). Se não há número, vá buscar um (fale com 5
clientes e pegue o antes/depois) — um número real vence dez adjetivos de marketing.

## Famílias de fórmula (resumo — detalhe nas referências)

- **Resultado:** "{resultado desejável} sem {dor}"; "Transforme {X} em {Y}"; "{resultado}
  em {prazo}".
- **Problema:** "Nunca mais {evento ruim}"; "{pergunta que nomeia a dor}"; "Pare de {dor}.
  Comece a {prazer}".
- **Público:** "{categoria} para {público}"; "Você não precisa {habilidade} para
  {resultado}".
- **Diferenciação:** "A {categoria} que {diferencial}"; "O jeito {oposto do usual} de
  {resultado}".
- **Prova:** "{número} {pessoas} usam {produto} para {resultado}".
- **Curiosidade:** "{algo contraintuitivo ou inesperado}".
- **Objeção:** "Não, você não precisa de {objeção nº 1} para {resultado}".

## Hooks (a primeira linha que segura)

Para anúncios, e-mails e posts, o hook é a abertura. Padrões que funcionam:
- **Pergunta:** "Ainda exportando para CSV toda segunda?"
- **Número:** "14 dias. Zero código. Automação completa."
- **Contraintuitivo:** "Mandar mais e-mail não é a solução."
- **Tease de história:** "O erro que cometi com [tema]."
- **Direto:** "[Nome], seu [coisa] está pronto."
Para e-mail, a linha de assunto segue a mesma lógica (claro > esperto, 40-60 caracteres) e
o pré-cabeçalho (preview, ~90-140 caracteres) **complementa** o assunto, não o repete.

## Anti-padrões (rejeite na pontuação)

- "Somos a plataforma nº 1 de..." — não comprovado, ignorado. Lidere com prova, não com
  ranking.
- "Soluções para times modernos" — quem não é um time moderno? Nomeie o time e o problema.
- "Poderoso e fácil de usar" — todo produto diz isso. Mostre o resultado.
- "Desbloqueie seu potencial" — fluff zero específico.
- Abuso de emoji — parece desespero; no máximo um, só se acrescentar sentido.

## Formato de saída

Entregue as 2-3 melhores candidatas, cada uma com: o texto, a nota total (0-12), o
detalhamento por dimensão, a família de fórmula e uma linha de justificativa. Liste também
as demais candidatas geradas (com a nota) para o time poder testar. Se o texto saiu com
cara de IA, passe pela habilidade `de-slop`.

## Referências

- `references/formulas-de-headline.md` — catálogo de fórmulas de headline e hook por família,
  com exemplos e a tabela de referência rápida.

---

## Atribuição

Habilidade reescrita em PT-BR a partir de fonte MIT (princípios adaptados, sem cópia
literal): **alirezarezvani/claude-skills** (`marketing-skill/skills/copywriting`,
referência `copy-frameworks.md`, e `ad-creative`, referência `creative-frameworks.md`),
SHA `4a3c05b69e64f4925f7fc65c88890f614f79caf0`, licença MIT. A rubrica de pontuação em 6
dimensões adapta o `headline_scorer.py` da mesma fonte. Absorvida pelo Caos (Kolden) em
2026-06-27.
