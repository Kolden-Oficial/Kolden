---
name: pesquisa-de-tendencia-e-sinais-fracos
description: |
  Use quando precisar mapear tendências relevantes para o produto/mercado (não modas), detectar sinais
  fracos antes que virem óbvios, analisar comportamento de early adopters, e transferir padrões maduros
  de indústrias adjacentes. Cadência mensal mínima. Diferente de competitive intel (Argos foca em
  concorrentes; esta skill foca em padrões macro/cross-industry).
domain: discovery-and-validation
subdomain: trend-research
agente_primario: [alberto-savoia, david-bland]
heranca_historica: [amy-webb-future-today, clayton-christensen, geoffrey-moore-chasm]
tags: [tendencia, weak-signal, early-adopter, cross-industry, future-today]
cross_links:
  - aletheia/mapa-de-assuncoes
  - aletheia/desenho-de-experimento
  - argos (competitive intel handoff bidirecional)
  - pluto (modelo de negócio)
  - aglaia (cultura/marca)
fonte_upstream: msitarzewski--agency-agents@a597cb6 (G19, G20, G21)
tipo: skill
area: Aletheia
up: "[[Aletheia/_MOC-aletheia]]"
---

# Pesquisa de Tendência e Sinais Fracos

Especialistas responsáveis: `alberto-savoia` (Pretotyping, sizing bottom-up) + `david-bland` (cards de teste).
Herança histórica: **Amy Webb** (Future Today Institute — weak signal framework), **Clayton Christensen** (disruption), **Geoffrey Moore** (Crossing the Chasm).

> _Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (G19+G20+G21, MIT)._

## O que é

Detecção sistemática de **tendências** (mudanças no comportamento, tecnologia, regulação, demografia) e **sinais fracos** (sinais pequenos hoje, potencialmente grandes amanhã) que podem alterar a função objetivo do produto.

Não é trend report decorativo. É insumo para reescrever hipóteses do Lean Canvas e do mapa de assunções.

## Distinguir tendência × moda × sinal-fraco × ruído

| Tipo | Janela | Profundidade | Exemplo |
|---|---|---|---|
| **Moda** | 6-18 meses | superficial | trending hashtag |
| **Tendência** | 2-5 anos | mudança comportamental observável | trabalho remoto pós-COVID |
| **Sinal fraco** | 5-15 anos | pequeno hoje, exponencial possível | LLMs em 2017 |
| **Ruído** | qualquer | aleatório | flutuação semanal |

Confundir as quatro categorias é o erro mais comum — e o mais caro, porque vira roadmap.

## Método em 4 passos

### 1. Definir área de observação

- Domínio (ex.: educação, fintech) + região + segmento.
- Demasiado amplo = ruído alto. Defina foco **antes** de coletar.

### 2. Coletar de fontes diversas (10 fontes mínimo)

- **Academia:** Google Scholar, arXiv, ResearchGate, jornais do domínio.
- **Indústria:** Gartner, Forrester, CB Insights, McKinsey reports.
- **Startups:** YC batches, Product Hunt, AngelList.
- **Comunidade:** Reddit, Hacker News, Discord/Slack do nicho.
- **Mídia:** newsletters especializadas, podcasts.
- **Etnográfica:** observação de uso (TikTok, redes).
- **Regulação:** propostas legislativas, normas setoriais.
- **Geográfica:** o que acontece primeiro em SF/Berlin/Shenzhen.
- **Cross-industry:** análogos em setores adjacentes (Amy Webb).
- **Fringe:** subculturas/futuristas (transhumanismo, plant-based, decentralization).

### 3. Aplicar o framework de sinais fracos (Amy Webb)

- **Direção:** o sinal aponta para onde? (mais X, menos Y)
- **Velocidade:** quanto está acelerando? (linear vs. exponencial)
- **Escala:** quantos atores são afetados hoje? (1, 10, 100, 1000)
- **Robustez:** tem múltiplas fontes confirmando? (sinal único = atenção; >3 = padrão)
- **Conectividade:** o sinal se conecta a outras tendências? (cluster = tendência forte)

### 4. Cross-industry pattern transfer

- Padrão observado em indústria A pode aparecer em B com lag de N anos.
- Exemplos clássicos: subscription model (SaaS → consumer goods), creator economy (YouTube → educação), AI assistants (texto → áudio → vídeo).
- Pergunta-chave: *"que padrão maduro em [indústria adjacente] ainda não chegou aqui?"*

## Análise de early adopters

Early adopters se comportam diferente da maioria — entendê-los previne extrapolação errada.

**Características:**
- Tolerância alta a fricção (compensam UX ruim com motivação).
- Mais técnicos / mais informados / pertencem a uma sub-cultura específica.
- Influenciam o discurso, mas não representam o mainstream.
- "Chasm" de Geoffrey Moore — gap entre early adopter e early majority.

**Como entrevistá-los:**
- Perguntar *"como você descobriu?"* (revela canal de difusão).
- *"O que tinha que dar errado para você desistir?"* (revela tolerância).
- *"Quem você indicaria? Por quê?"* (revela mecanismo de espalhamento).
- **NÃO** perguntar *"por que a maioria não usa?"* (early adopter não sabe).

## Padrões cross-industry úteis

- **Disintermediation:** corretor → marketplace direto (todos os setores).
- **Productization of services:** consultoria → SaaS (engenharia, RH, jurídico).
- **Subscription:** compra única → recorrência (mídia, software, comida).
- **Self-serve:** sales-led → product-led (B2B).
- **Vertical AI:** AI horizontal → AI vertical (legal AI, medical AI).
- **Community-as-moat:** SaaS único → SaaS + comunidade (Notion, Linear).
- **Embedded finance:** banco → SaaS-com-pagamento (Shopify, Stripe Issuing).
- **Creator economy:** plataformas → ferramentas para criadores.

## Anti-padrões

- Coletar de 1 tipo de fonte (só Twitter, só academia) — viés sistemático.
- Confundir moda com tendência (TikTok dance ≠ shift cultural).
- Extrapolar early adopter para mainstream (chasm de Moore).
- "Trend report" sem hipótese acionável (vira PowerPoint que ninguém lê).
- Ignorar contra-tendências (toda tendência tem backlash; mapeie).
- Atualizar trend report uma vez por ano (sinais mudam mês a mês — cadência mensal mínima).

## Saída padrão

1. **Trend brief** (trimestral): 5-7 tendências mapeadas com direção/velocidade/escala/robustez/conectividade.
2. **Weak signal log** (vivo): 10-20 sinais sob observação, com indicadores para promoção a tendência.
3. **Cross-industry analog cards** (vivo): padrões maduros em outras indústrias, candidatos a transferir.
4. **Backlog de hipóteses** (mensal): cada tendência relevante vira 1-3 hipóteses (handoff para `mapa-de-assuncoes`).

## Cross-links

- **Aletheia:** `mapa-de-assuncoes` (hipóteses derivadas), `desenho-de-experimento` (teste), `priorizacao-rice` (priorização).
- **Argos** (competitive intel executável): handoff bidirecional — Argos foca em concorrentes, esta skill foca em padrões macro.
- **Pluto** (oferta): tendência de modelo de negócio.
- **Aglaia** (marca): tendência cultural/identidade.

## Herança histórica

- **Amy Webb** (Future Today Institute) — weak signal framework, 11 fontes.
- **Tom Stoppard / Steve Jobs** (anti-mercado): *"people don't know what they want"* — sinal fraco vence pesquisa de demanda.
- **Clayton Christensen** (disruption theory) — sinais de baixa qualidade que crescem.
- **Geoffrey Moore** (Crossing the Chasm) — early adopter ≠ mainstream.
