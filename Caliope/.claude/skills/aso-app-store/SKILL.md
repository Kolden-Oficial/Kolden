---
name: aso-app-store
description: |
  Otimização de ficha de app na App Store / Google Play (ASO — App Store Optimization) — sequência
  visual de 5 screenshots, keyword strategy, roadmap A/B fásico (icon → description → screenshots)
  e resposta a ratings/reviews. Use quando o pedido for "otimizar minha ficha da App Store", "ASO",
  "screenshots do app", "ícone do app não converte", "descrição da Play Store", "keywords do App
  Store", "responder review de app" ou "roadmap de teste A/B da store". NÃO é ads em rede da store
  (Apple Search Ads / Google App Campaigns → handoff Peitho); não é copy de landing page do site
  (isso é `estrutura-de-pagina-de-vendas`).
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

# ASO — otimização da ficha de app (PT-BR)

ASO é copywriting sob restrição extrema: 30 caracteres no título, 5 screenshots que precisam
vender antes do dedo passar, um ícone que compete com dezenas no resultado da busca. Esta
habilidade trata a ficha como uma **página de vendas verticalizada em 5 batidas**, com roadmap
de teste A/B por fase e uma disciplina de resposta a reviews que vira sinal de rank.

## Herança histórica

- **Gabe Kwakyi (Incipia)** — pioneiro de ASO como disciplina; introduziu o conceito de
  *keyword competitiveness score* e a distinção entre ASO da descoberta (busca) vs. ASO da
  conversão (ficha).
- **Steve Young (ASOMobile / App Masters)** — publicou o primeiro *screenshot A/B playbook*
  público (2015-2017); provou que **screenshot 1 sozinho** move conversão 20-40%.
- **Sensor Tower / data.ai** — normalizaram a métrica *conversion rate to install* (CRI) como
  a régua honesta da ficha (impressão → instalação).

## O quadro de decisão da ficha (5 componentes)

| Componente | Papel | Restrição | Alavanca principal |
|---|---|---|---|
| **Ícone** | pattern-interrupt no resultado | 1 símbolo, 1 cor dominante | contraste + reconhecibilidade em 30px |
| **Título / subtítulo** | keyword + promessa | 30 char + 30 char (iOS) | keyword primária no título |
| **Screenshots (1-5)** | os 5 slides do pitch | 5 imagens verticais | slide 1 = hook (60% do peso) |
| **Descrição** | prova + objeção + long-tail keywords | 4000 char (Play Store lê tudo; iOS lê pouco) | primeiras 3 linhas |
| **Reviews & ratings** | sinal de rank + prova social | resposta pública | responder em <48h |

## Sequência canônica dos 5 screenshots

Cada screenshot é uma batida. Um layout, um benefício, uma prova. **Nunca** mostre a UI crua
sem legenda: a store não é um dashboard, é um outdoor.

| # | Papel | Legenda-tipo | Erro comum |
|---|---|---|---|
| 1 | **Hook** (o que é + para quem) | "{Categoria} para {público específico}" | mostrar 12 features num só slide |
| 2 | **Problema/dor** | "Nunca mais {evento ruim}" | copiar tela de onboarding |
| 3 | **Solução em ação** | screenshot da feature-âncora + seta | UI sem contexto |
| 4 | **Prova** | número real (10k users / 4.8 estrelas / prêmio) | testimonial genérico |
| 5 | **CTA + diferencial** | "Comece grátis. Sem cartão." | mais uma feature em vez de fechar |

**Regra dura:** o slide 1 é lido isolado pela maioria dos usuários (nunca deslizam). Se o
slide 1 não vende sozinho, a ficha não converte — não importa o resto.

## Roadmap A/B fásico (nunca teste tudo junto)

A Apple (Product Page Optimization) e o Google Play (Store Listing Experiments) permitem A/B.
A ordem importa porque cada teste **contamina o próximo**: mude o ícone e a taxa muda; mude
depois os screenshots e você não sabe qual variável foi.

| Fase | O que testar | Volume mínimo | Duração |
|---|---|---|---|
| **1. Ícone** | 2-3 variações de ícone (mesma cor-mãe, forma diferente) | 5k impressões/variante | 7-14 dias |
| **2. Descrição / primeira linha** | 2 aberturas (curta punchy vs. narrativa) | 3k impressões/variante | 7 dias |
| **3. Screenshot 1** | 2 hooks diferentes (mesmo layout) | 5k impressões/variante | 7-14 dias |
| **4. Sequência 2-5** | ordem: dor → solução vs. solução → dor | 10k impressões/variante | 14 dias |
| **5. Vídeo preview** | 15s com hook forte | 10k impressões/variante | 14 dias |

Nunca teste ícone + screenshots ao mesmo tempo. Nunca declare vencedor antes de significância
estatística (p < 0.05 no CRI — não confie no dashboard "sugestão de vencedor").

## Keyword strategy (dois eixos)

- **Título / subtítulo (peso máximo)** — 1 keyword primária alta-intent (volume alto, dificuldade
  média). Ex.: para um app de meditação, "meditação para dormir" > "wellness".
- **Long-tail no keyword field (iOS) ou na descrição (Play)** — 30-50 termos secundários.
  Não repita palavras entre título e keyword field (iOS combina automaticamente).
- **Localize** — a busca é por país. Traduzir a ficha para top-3 mercados aumenta CRI em
  15-40% (é o ROI mais rápido do ASO).

## Ratings & reviews como sinal de rank

Store ranking é ponderado por: (a) volume de downloads, (b) CRI, (c) rating médio, (d) taxa
de retenção D1/D7, (e) frequência de resposta a reviews. Os três primeiros são fáceis de
entender. **Os dois últimos são invisíveis e decisivos.**

Protocolo de resposta:

| Review | Janela | Molde |
|---|---|---|
| ★1-★2 | <24h | reconhecer + pedir contato privado + oferecer resolução ("estou aqui: suporte@") |
| ★3 | <48h | agradecer + pergunta específica ("o que faltou para o quinto?") |
| ★4-★5 | semanal em lote | agradecer + apontar próximo release |

Nunca copie-cole a mesma resposta em 10 reviews — o algoritmo detecta. Sempre cite o problema
concreto do review na primeira linha da resposta.

## Fronteiras inter-squad

- **Copy da ficha** (título, screenshots, descrição, resposta a reviews) — Caliope faz.
- **Design visual dos screenshots** (renderização, arte) — handoff a **Aglaia**.
- **Apple Search Ads / Google App Campaigns** (mídia paga dentro da store) — handoff a
  **Peitho** (aciona `criativo-como-hipotese-rsa-pmax` + `paid-social-cross-platform`).
- **Rastreio de instalações e cohorts de retenção** — handoff a **Metis**.

## Formato de saída

1. Diagnóstico da ficha atual (5 componentes) com scorecard 0-10 por componente.
2. Recomendação para os 5 screenshots (papel + legenda + racional).
3. Roadmap A/B priorizado (qual fase primeiro + hipótese testável).
4. Título + subtítulo + primeiras 3 linhas da descrição reescritos.
5. Molde de resposta a reviews (3 níveis).
6. Handoffs declarados (Aglaia / Peitho / Metis).

## Referências

- `references/scorecard-de-ficha.md` — rubrica 0-10 por componente.
- `references/moldes-de-resposta-a-review.md` — moldes por severidade.

---

Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B02/marketing
(IDs MKT-G10, G11, G12). Herança histórica: Gabe Kwakyi (Incipia), Steve Young (App Masters),
data-empírica Sensor Tower/data.ai. Sem cópia literal do upstream.
