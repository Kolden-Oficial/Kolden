---
name: score-de-post
description: >
  Pontua um rascunho de post (LinkedIn/X/etc.) contra DADOS REAIS de performance da
  própria conta, em vez de conselho genérico. Extrai os padrões do top 10% do histórico
  e pontua o rascunho em 5 critérios (gancho, aderência à voz, densidade de valor,
  estrutura/formato, prontidão). Use quando o pedido for "pontua meu post", "revisa esse
  post", "que nota esse post tem", "dá feedback", ou quando colarem um rascunho pedindo
  crítica. Lê `voz.md`/`sobre-mim.md` se existirem. Pensado para revisão rápida e ao vivo.
metadata:
  type: reference
---

# Score de Post — pontuação contra dados reais

Pontua um rascunho comparando-o ao que de fato performa na conta da marca/cliente. Cada
fix precisa citar um dado real, não opinião.

> **MÉTODO, não auto-exec.** Esta habilidade NÃO gera nem roda script de coleta sozinha.
> A obtenção de histórico (quando necessária) é um passo **opcional, com custo, e exige
> confirmação humana explícita**. Segredos (token Apify etc.) **sempre via Infisical**,
> nunca como variável de ambiente em texto puro (ver skill `infisical-padrao` e o squad
> **Argos** para a coleta em si).

## Passo 1 — Obter o post
Se o usuário já colou, use. Senão, peça o rascunho.

## Passo 2 — Carregar a base de pontuação
Precisa de duas coisas: o sistema de voz e os dados de performance.
- **Voz:** leia `sobre-mim.md` e `voz.md`. Se faltarem, registre e pontue sem aderência de voz.
- **Dados de performance:** procure cache no projeto (arquivos `*-posts.json` / `*-posts.txt`).
  Se houver cache válido, use. Se não houver, ofereça três caminhos e **espere a escolha**:
  1. **Coletar o histórico** (≈ últimos 100 posts). Custa dinheiro (scrape pago, ~US$0,50) e
     leva 1-2 min. → **Delegue ao Argos** (skills `descoberta-de-virais`/scraping + `classificacao-tos`),
     com token resolvido por Infisical. Salve o resultado como `<conta>-posts.json` no projeto.
     **Nunca rode o scrape sem o "sim" explícito do usuário.**
  2. **Pular a coleta** → pontue só contra a voz + boas práticas gerais (menos preciso, instantâneo).
  3. **Usar benchmark de referência** (quando o cliente é novo e não há histórico) — declare
     que está usando benchmark genérico, não dado da conta.

## Passo 3 — Analisar os top performers
Com dados disponíveis, antes de pontuar:
1. Calcule um score de engajamento por post: `reações + (comentários × 3)`.
2. Identifique o **top 10%** por esse score.
3. Dos top, extraia: tipos de gancho mais frequentes (contrário, liderado por número,
   afirmação ousada, história pessoal, pergunta, notícia); comprimento médio (palavras);
   distribuição de formato (texto, imagem, carrossel, vídeo); padrões de CTA; clusters de
   tema que over-indexam; ritmo de frase.
4. Anote também os padrões do **bottom 10%** (o que falha).
Guarde isso como "perfil de pontuação" e referencie a cada critério.

## Passo 4 — Pontuar (5 critérios, 1 a 10 cada)
- **Força do gancho** — a abertura usa um tipo de gancho que historicamente performa?
  É específica (número/nome/detalhe)? Para o scroll segundo os dados? 8+ só se o tipo
  bater com um padrão do top 10%.
- **Aderência à voz** — bate com tom/ritmo/comprimento de `voz.md`? Viola alguma proibição
  da seção de ausência? (Sem arquivos de voz: pontue contra os padrões extraídos dos dados.)
- **Densidade de valor** — os melhores posts da conta ensinam/dão passos/trazem dado/contam
  história? O rascunho bate com esse padrão? O takeaway é específico o bastante para salvar/compartilhar?
- **Estrutura e formato** — qual formato engaja mais para a conta? O ritmo de quebra de linha
  bate com o dos top? É escaneável no mobile? O CTA bate com o dos melhores?
- **Prontidão para publicar** — soa escrito de verdade ou texto cru de IA? Funde no feed da
  conta? Há red flags (palavras proibidas em `voz.md`, frases genéricas, tom corporativo)?
  Está no comprimento certo vs. os top performers?

## Passo 5 — Scorecard
Saída compacta (boa de ler em tela grande, num evento):

```
SCORE DO POST
Fonte de dados: [conta / benchmark / genérico]   Posts analisados: [n]   Top 10% eng. médio: [n]
Força do gancho:        [X]/10  [tipo detectado]
Aderência à voz:        [X]/10
Densidade de valor:     [X]/10
Estrutura e formato:    [X]/10  [formato]
Prontidão:              [X]/10
----------------------------------------
TOTAL:                  [XX]/50
VEREDITO: [uma frase citando um dado específico]
COMPARAÇÃO COM TOP: seus top posts têm média de [X] palavras, gancho [tipo], CTA [padrão].
                    Este rascunho [bate/diverge] porque [razão específica].
FIXES:
1. [fix com dado, ex.: "seu top 10% abre com número (42% dos acertos); este abre com pergunta (12%). Troque para a estatística."]
2. ...  3. ...
```
Todo fix referencia o dado real da conta — nunca "melhore o gancho".

## Passo 6 — Próximo passo
Ofereça reescrever a seção mais fraca usando os padrões dos top posts, ou publicar.

## Regras
- Sempre tente dado real antes de cair em conselho genérico.
- Nunca dê nota > 8 sem que o rascunho realmente bata com os padrões do top 10%.
- Seja honesto — um avaliador generoso é inútil.
- Dado velho (14+ dias): sugira atualizar antes de pontuar.
- **Avise antes de qualquer coleta paga e só rode com confirmação.** Token via Infisical.

## Cruzamento
O lado **analítico profundo** (séries históricas, experimentos, dashboards) é do **Metis**;
esta habilidade é ferramenta de conteúdo para revisão rápida de rascunho.

---
**Procedência:** método adaptado de `charlie947/social-media-skills` (skill `post-scorer`),
@94f72ea2ece388fa30ef49a26fb2e6fd2109e0b1, licença MIT. Absorvido **o método** (extração do
top 10% + 5 critérios); o **auto-exec** (chamada literal de actor Apify e benchmarks/persona
"Charlie Hills") foi removido — coleta vira passo opcional, gated por custo, delegado ao Argos
com segredo via Infisical. Reescrito em pt-BR.
