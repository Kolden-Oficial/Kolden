---
name: fundacao-de-voz
description: >
  Constrói o perfil de voz de uma marca/pessoa (Kolden ou cliente) a partir de uma
  entrevista curta + 3 a 5 amostras de escrita, produzindo dois artefatos de contexto
  compartilhado — `sobre-mim.md` (quem é, público, pilares, ponto de vista) e
  `voz.md` (como a voz escreve E o que ela nunca faz). Use no INÍCIO de qualquer
  trabalho de conteúdo do Pheme, antes de redigir a primeira linha — quando o pedido
  for "construir a voz", "treinar na minha escrita", "onboarding de marca", "quero que
  soe como a gente", ou quando o usuário colar um lote de amostras no começo. É a
  FUNDAÇÃO que as demais habilidades do squad leem antes de escrever.
metadata:
  type: reference
---

# Fundação de Voz — perfil + arquitetura de contexto compartilhado

Esta é a habilidade-base do sistema de conteúdo do Pheme. Ela produz dois arquivos que
**toda outra habilidade de redação do squad lê antes de escrever**: `sobre-mim.md` e
`voz.md`. Sem eles, a redação cai em genérico.

> **Arquitetura de contexto compartilhado (princípio do squad):** `sobre-mim.md` +
> `voz.md` são o contexto que `arquetipos-de-newsletter`, `matriz-de-conteudo`,
> `score-de-post`, `roteiro-de-reels` e `comentario-fixado` consultam primeiro. Esta
> habilidade é a raiz da cascata; as demais penduram nela.

## Quando rodar
No primeiro contato com uma marca/cliente novo, ou quando a voz mudou e os arquivos
estão desatualizados. Se `sobre-mim.md` e `voz.md` já existem e ainda valem, pule esta
habilidade e siga direto para a redação.

## Passo 1 — Entrevista de identidade
Levante (de forma interativa, uma pergunta por vez quando o assunto for crítico):
1. **Quem é e o que faz** — papel, empresa/projeto.
2. **Para quem escreve** — público (expanda em 2-3 frases sobre quem é o leitor).
3. **3 a 5 pilares de tema** — os assuntos pelos quais quer ser reconhecido.
4. **Ponto de vista** — a crença distintiva/contrária que diferencia da concorrência.
5. **Promessa de marca** — o único pensamento que o leitor deve ter ao ver o nome.
6. **Fora de cogitação** — temas/ângulos que a marca nunca aborda.

## Passo 2 — Escrever `sobre-mim.md`
Crie na raiz do projeto, **< 300 palavras**. Cada linha precisa ser algo que a
redação consultaria de fato:

```
# Sobre Mim
## Nome e papel
## Público
## Pilares de tema
## Ponto de vista
## Promessa de marca
## Fora de cogitação
```

## Passo 3 — Coletar amostras
Peça **3 a 5 peças de escrita publicadas** (posts, newsletters, ensaios, e-mails,
threads — próprias ou de uma voz admirada). Mínimo 3 para detectar padrão. Se vierem
menos de 3, peça mais. Sempre exiba conteúdo-amostra dentro de bloco de código para
preservar a formatação.

## Passo 4 — Analisar as amostras (padrões, não tiques)
Procure o que se repete **em todas** as amostras, não a peculiaridade de uma:

- **Sinais de voz:** tamanho médio de frase; ritmo de parágrafo; estilo de gancho
  (contrário, pergunta, dado, história, confissão, observação); pessoa (1ª/2ª/observacional);
  tom (seco, caloroso, direto, brincalhão, clínico); frases-assinatura; estilo de CTA/fechamento.
- **Sinais estruturais:** faixa de comprimento; lista vs. prosa; como abre, como fecha; transições.
- **Sinais de tema:** assuntos recorrentes; público aparente; o que a marca defende.
- **Sinais de AUSÊNCIA (crítico):** palavras/pontuações ausentes em todas as amostras;
  tipos de gancho que a voz nunca usa; tons que nunca atinge; estruturas que evita.

## Passo 5 — Escrever `voz.md`
Perfil integrado único, **< 500 palavras**, cobrindo como a voz escreve E o que evita:

```
# Perfil de Voz
## Como eu soo
## Tom            (3-5 atributos que sempre atinge + 1-2 que nunca atinge)
## Ritmo de frase (médias, pacing; padrões de evitação)
## Padrões de gancho (3-5 observados, 1 exemplo cada; ganchos ausentes)
## Como eu abro
## Como eu fecho   (inclui estilo de CTA; movimentos de fechamento evitados)
## Frases-assinatura
## Proibições      (palavras/pontuação/construções ausentes em TODA amostra)
## O que esta voz nunca faz (3-5 comportamentos específicos, tirados das lacunas)
```

As seções de ausência saem **da observação, nunca de um template genérico de palavras
banidas**. Todo item precisa ser respaldado por ausência nas amostras.

## Regras
- Trabalhe só com o que está nas amostras. Não invente padrões.
- Se as amostras se contradizem, registre a contradição em `voz.md`, não suavize.
- Não duplique público/pilares de `sobre-mim.md` dentro de `voz.md` — referencie.
- Idioma e convenções de pontuação seguem a própria marca/cliente (não imponha regras
  estrangeiras de estilo). Para a marca Kolden, a referência viva é o design-system
  (`sobre-a-empresa/marca/`) e o squad Aglaia.

## Entrega e handoff
Confirme os dois arquivos criados e ofereça os próximos passos do squad: construir a voz
de newsletter (`arquetipos-de-newsletter`), gerar pauta (`matriz-de-conteudo`), pontuar um
rascunho (`score-de-post`), roteirizar um Reels (`roteiro-de-reels`) ou escrever um
comentário fixado (`comentario-fixado`).

---
**Procedência:** método adaptado de `charlie947/social-media-skills`
(skills `voice-builder` + arquitetura de contexto compartilhado do README),
@94f72ea2ece388fa30ef49a26fb2e6fd2109e0b1, licença MIT. De-personalizado (persona
"Charlie Hills" removida), reescrito em pt-BR e religado à fundação de voz do Pheme.
Regras de estilo pessoais do autor (inglês britânico, proibição de travessão) foram
substituídas pela voz da própria marca/cliente.
