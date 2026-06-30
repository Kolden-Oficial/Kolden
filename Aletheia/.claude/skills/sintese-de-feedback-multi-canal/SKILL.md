---
name: sintese-de-feedback-multi-canal
description: |
  Use quando precisar agregar feedback de múltiplas fontes (entrevistas + NPS + suporte + social + reviews +
  sales calls), aplicar schema único de tags, triangular sinais entre canais, distinguir dor vs. desejo vs.
  ruído, e gerar tema-cards acionáveis. Síntese cross-canal — não substitui análise profunda de UM canal
  específico (Pheme para social, Metis para NPS quantitativo).
domain: discovery-and-validation
subdomain: feedback-synthesis
agente_primario: [aletheia-chief]
tags: [feedback, sintese, voice-of-customer, nps, tickets, social, triangulacao, tema-vs-sintoma]
cross_links:
  - aletheia/mapa-de-assuncoes
  - aletheia/priorizacao-rice
  - pheme (social como fonte)
  - hestia (tickets como fonte)
  - argos (intel como fonte)
  - metis (NPS quantitativo handoff)
fonte_upstream: msitarzewski--agency-agents@a597cb6 (G5, G6)
---

# Síntese de Feedback Multi-Canal

Especialista responsável: `aletheia-chief` (orquestrador — agrega múltiplos canais e roteia o aprofundamento).

> _Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (G5+G6, MIT © 2025 AgentLand Contributors)._

## O problema

- Feedback de cliente vem de **N canais** (entrevistas, NPS, ticket de suporte, posts social, reviews app store) — síntese sem método vira **cherry-pick**.
- Sinal real vive na **interseção** de canais, não no volume de um canal único.
- Categorização inconsistente entre canais = feedback "perdido" (mesmo problema, classificações diferentes em cada fonte).

## Fontes canônicas e cross-link com squads

| Fonte | Squad Kolden | Características | Frequência sugerida |
|---|---|---|---|
| Entrevistas (estruturadas) | Aletheia | qualitativo, profundo, pequeno N | trimestral em rodadas |
| NPS/CSAT periódico | Metis (instrumentação) | quantitativo, large N | mensal/trimestral |
| Tickets de suporte | Hestia | reativo, indicador de problema | contínuo |
| Social (menções, comments) | Pheme | espontâneo, viral | contínuo |
| Reviews (app store, G2) | Pheme/Aletheia | público, com viés de extremos | mensal |
| Sales calls (gravadas) | Emporos/Pluto | objeções e necessidades | contínuo |
| Customer success calls | Hestia | retenção e expansão | contínuo |

## Método de síntese em 5 passos

### 1. Coletar com classificação consistente

- **Schema único de tags cross-canal** (ex.: `dor-onboarding`, `dor-performance`, `feature-faltando-X`).
- Glossário de tags em `Aletheia/dados/glossario-de-feedback.md` (vivo, evolui com o uso).
- Convenção: cada feedback ganha **1 tag primária + N tags secundárias**.
- Tag inconsistente entre canais = feedback perdido — o glossário é a única fonte de verdade.

### 2. Triangular: 3 canais ≥ 1 alarme

- Sinal verdadeiro raramente vem de 1 canal — exige **confirmação em 2-3**.
- Pattern: *"X aparece em NPS + tickets + social ⇒ alto sinal"*.
- Tabela de cruzamento (linhas = tags, colunas = canais, células = volume).
- 1 canal isolado a gritar = pista a investigar, não tema confirmado.

### 3. Extrair tema vs. sintoma

- Cliente reporta **sintoma** ("o app é lento"); tema é a **causa** ("percepção de carregamento sobre tela em branco — sem skeleton/spinner").
- Manter **voice-of-customer literal** + reformulação em **problem-language**.
- Cada tema com: descrição, voice-of-customer (3-5 citações), volume agregado, severidade.

### 4. Sentiment com calibração

- Sentiment automático (LLM/classifier) tem **viés sistemático** — calibrar com amostra humana periódica.
- Polaridade: **-2 (raiva) a +2 (encantamento)**, com 0 = neutro/factual.
- **Tendência > snapshot:** comparar período N vs N-1, não só foto do mês.
- Sentiment como dimensão, não veredito — uma dor com sentiment 0 (relato seco) pode ser mais grave que reclamação raivosa isolada.

### 5. Decisão: dor vs. desejo vs. ruído

- **Dor:** dificulta uso atual (não usar = problema). Tem custo real para o cliente.
- **Desejo:** "seria bom ter" (não usar não dói). Curiosidade ou conforto.
- **Ruído:** comentário sem sinal acionável. Ignorar na agregação, mas **não jogar fora** — pode virar sinal depois.
- **Tabela de priorização:** dor × volume × severidade × evidência cross-canal.

## Saída padrão

1. **Painel de feedback** (semanal/mensal): top 5 dores por volume + sentiment + tendência.
2. **Tema cards** (mensal): 1 página por tema com voice-of-customer + decisão sugerida + handoff.
3. **Backlog de hipóteses de produto** (mensal): cada tema vira 1-3 hipóteses validáveis (handoff para `mapa-de-assuncoes`).

## Anti-padrões

- 1 canal = verdade (cherry-pick por canal favorito do PM).
- Sentiment como métrica única (perde tema).
- Reportar volume sem severidade (10 reclamações leves ≠ 10 reclamações de bloqueio).
- Categorização ad-hoc (tags inconsistentes = feedback perdido).
- Fechar tema "porque foi resolvido" sem evidência de **queda no volume** nos canais que o gritavam.

## Cross-links e handoffs

- **Entrada:** Pheme (social), Hestia (tickets), Argos (intel competitivo), Metis (NPS/CSAT), Emporos (sales).
- **Saída:** Aletheia `mapa-de-assuncoes` (cada tema → hipóteses), Aletheia `priorizacao-rice` (priorização).
- **Não cobre:** churn prediction (Metis), NPS modeling avançado (Metis), análise profunda de UM canal (handoff ao squad dono do canal).
