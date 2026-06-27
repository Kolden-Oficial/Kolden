---
name: arquetipos-de-newsletter
description: >
  Constrói as instruções de escrita de NEWSLETTER de uma marca/cliente sobre o perfil
  de voz já existente, produzindo `voz-newsletter.md`. Funciona com amostras (analisa
  2-3 edições passadas) OU sem amostras (escolhe entre 6 arquétipos editoriais: tutorial
  de dados, ensaio contrário, teardown de caso, digest curado, ensaio pessoal,
  entrevista/perfil — afinados à voz). Use quando o pedido for "construir a voz de
  newsletter", "estruturar a newsletter", "qual formato de edição usar", ou quando o
  usuário colar edições passadas pedindo análise. Requer `voz.md` e `sobre-mim.md`
  (rode `fundacao-de-voz` antes).
metadata:
  type: reference
---

# Arquétipos de Newsletter — voz editorial sobre a fundação de voz

A newsletter costuma ser a **fonte de onde toda peça deriva** (do longo nasce o curto:
post, Reels, carrossel). Esta habilidade adiciona regras específicas de newsletter por
cima do perfil de voz já construído.

## Pré-requisito (gate)
Verifique `voz.md` e `sobre-mim.md` na raiz do projeto. Se faltar qualquer um, pare e
redirecione para `fundacao-de-voz`. Se ambos existem, leia-os por inteiro antes de seguir.

## Passo 1 — Tem amostras?
Pergunte se há **2-3 edições passadas** para aprender. Sim → análise por amostra (Passo 2a).
"Arquétipo" → seleção de arquétipo (Passo 2b). Apenas 1 edição → ofereça modo arquétipo
usando a única edição como referência.

## Passo 2a — Análise por amostra
Leia cada edição por inteiro; padrões entre edições, não tiques de uma. Extraia:
- **Fórmula de abertura:** o que as 3 primeiras frases fazem (resultado específico,
  observação cultural, afirmação, cena, pergunta); tamanho da abertura até a 1ª quebra;
  movimento de credibilidade; promessa de valor.
- **Estrutura de seção:** setup de problema/contraste; framework nomeado vs. prosa livre;
  passos numerados vs. argumento contínuo; padrão de exemplos/evidências; seção bônus;
  fórmula de fechamento e assinatura.
- **Filosofia de dados:** números por edição; estilo de atribuição de fonte; razão
  exemplo:abstração; reconhecimento de limites/falhas.
- **Formatação:** uso de cabeçalhos, listas, negrito/itálico, blocos de código/citação,
  marcadores visuais.
- **Comprimento:** faixa de palavras por edição e por seção.
- **Marcadores únicos de newsletter:** dicas/callouts; fechamentos prospectivos;
  frase de assinatura (se consistente em 2+ amostras); meta-transparência.
- **Sinais de ausência:** o que nunca aparece em nenhuma amostra.

## Passo 2b — Seleção de arquétipo
Apresente os 6 arquétipos (descritos abaixo) e deixe o usuário escolher. Carregue os
defaults de `references/arquetipos.md` e **afine cada campo** com `voz.md` + `sobre-mim.md`
antes de escrever. Sinalize no arquivo de saída que foram usados defaults de arquétipo e
que ele deve ser revisitado após ~5 edições publicadas.

Os 6 arquétipos: **tutorial de dados** (números, frameworks, passo-a-passo) · **ensaio
contrário** (toma posição e defende) · **teardown de caso** (um assunto por edição, em
profundidade) · **digest curado** (5-7 links com comentário) · **ensaio pessoal**
(reflexão, história primeiro) · **entrevista/perfil** (uma pessoa por edição).

## Passo 3 — Escrever `voz-newsletter.md`
Arquivo único na raiz, alvo 800-1.200 palavras:

```
# Voz de Newsletter
## Fonte            (analisadas X edições | arquétipo [nome] afinado à voz.md — revisitar após 5 edições)
## Público e propósito
## Princípios de voz (3-5, declarativos)
## Fórmula de abertura (2 templates com placeholders entre colchetes + alvo de palavras)
## Fluxo de seções   (5-8 seções, o que cada uma faz e quanto ocupa)
## Dados e evidências (regras de números/fontes/razão exemplo:abstração)
## Regras de formatação
## Fechamento e assinatura (não invente assinatura inexistente)
## O que esta newsletter nunca faz (3-5 itens, comportamentos — não lista de palavras banidas)
## Comprimento       (alvo padrão + alvo de guias longas, se houver)
```

Preencha tudo das amostras (ou defaults afinados). Se algo não tem padrão claro, escreva
"sem padrão claro nas amostras" em vez de chutar.

## Regras
- Não duplique `voz.md` — adicione só regras específicas de newsletter.
- Não cole nomes/URLs/assinaturas do usuário a menos que apareçam em 2+ amostras.
- Tight vence exaustivo: mantenha < 1.200 palavras.
- Handoff: edição pronta para redigir → o redator de longo-form usa os 3 arquivos juntos;
  a derivação para post/Reels/carrossel passa por `roteiro-de-reels` e pelos especialistas
  de formato do squad.

## Cruzamentos
- **Orfeu** (narrativa/estrutura de storytelling) pode reforçar o arquétipo "ensaio pessoal".
- **Caliope** (copy craft) afina ganchos e CTAs de seção.

---
**Procedência:** método adaptado de `charlie947/social-media-skills`
(skills `newsletter-voice` + biblioteca `references/archetypes.md`),
@94f72ea2ece388fa30ef49a26fb2e6fd2109e0b1, licença MIT. De-personalizado, reescrito em
pt-BR. Os 6 arquétipos foram traduzidos e generalizados em `references/arquetipos.md`.
