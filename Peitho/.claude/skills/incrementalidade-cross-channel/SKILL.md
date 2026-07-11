---
name: incrementalidade-cross-channel
description: |
  Validação de incrementalidade cross-channel — quanto de venda um canal realmente adiciona
  (vs. quanto ele reivindica). Desenho de geo-split, holdout puro, matched market, poder
  estatístico mínimo, leitura por lift em conversão base vs. pausa. Use quando o pedido for
  "incrementalidade", "lift test", "geo split", "holdout", "matched market", "quanto realmente
  incremental", "esse canal traz venda nova?", "cross-channel attribution", "meta-analysis
  de campanhas", "canal X ou Y — qual pausar", "true ROAS". NÃO é atribuição multi-touch
  determinística (isso é dashboard, não teste). Modelagem estatística profunda além do desenho
  do teste = handoff Metis.
license: MIT
allowed-tools:
  - Read
  - Write
  - Edit
  - Grep
  - Glob
  - AskUserQuestion
tipo: skill
area: Peitho
up: "[[Peitho/_MOC-peitho]]"
---

# Incrementalidade cross-channel — teste real vs. reivindicação (PT-BR)

Cada plataforma reivindica a mesma conversão. Meta diz "veio de Meta". Google diz "veio de
search". TikTok diz "veio do último click 24h". No total, os dashboards somam 130-160% da
receita real. Esta habilidade responde a pergunta que o CFO quer ouvir: **quanto de vendas
existe *por causa* do canal?** — não quanto o canal reivindica.

## Herança histórica

- **Meta / Facebook Marketing Science (2015-2020)** — publicou os primeiros lift tests
  auditáveis usando conversion lift studies via holdout.
- **Google / Nielsen Marketing Effectiveness Consortium** — codificou geo experiments como
  padrão da indústria; Google Ads GeoX foi o primeiro protocolo aberto.
- **Wes Nichols (MarketShare / Neustar)** — teoria moderna de marketing mix modeling (MMM)
  que complementa lift tests.
- **Avinash Kaushik** — popularizou "incrementality > attribution" como regra prática.

## Modelo mental — o único teste honesto

Atribuição é **reivindicação**. Incrementalidade é **prova**. A pergunta:

> Se eu pausasse este canal por N semanas em M% do mercado, quantas conversões eu perderia?

A resposta = incrementalidade. Tudo o mais é modelagem, ou seja, hipótese.

## Métodos por robustez

| Método | Robustez | Custo | Duração | Quando usar |
|---|---|---|---|---|
| **Holdout puro (user-level)** | Alta | Baixo | 4-8 semanas | plataformas que suportam (Meta Conversion Lift) |
| **Geo-split randomizado** | Alta | Médio | 4-6 semanas | canais offline / display / DOOH / OOT |
| **Matched market** | Média | Médio | 4-8 semanas | quando geos não podem ser randomizadas |
| **Time-based (ligado/desligado)** | Baixa-Média | Baixo | 4-12 semanas | sem outra opção; suscetível a sazonalidade |
| **Diff-in-diff post-hoc** | Baixa | Baixo | análise histórica | quando não há como testar prospectivamente |

## Desenho de teste — 6 passos

### 1. Hipótese testável

> Pausar {canal} em {M% de geos ou M% de usuários} por {N semanas} vai gerar um lift
> negativo de X% ± Y em conversões.

Se você não tem uma expectativa numérica prévia (X), o teste é fishing expedition.

### 2. Poder estatístico

Fórmula prática:
- MDE (minimum detectable effect) = 10-20% na maioria dos casos.
- Volume mínimo por variante = 500-2000 conversões.
- Poder desejado = 80%. Alpha = 5%.
- Duração = max(4 semanas, tempo para atingir volume).

Se o volume não bate no prazo, o teste **não é conclusivo** — reconhecer é melhor do que
declarar vencedor com p=0.3.

### 3. Escolha da unidade de aleatorização

| Unidade | Quando |
|---|---|
| User-level (holdout) | plataforma suporta (Meta Conv Lift); melhor sinal |
| Geo (DMA / estado / cidade) | para canal offline ou quando user-level indisponível |
| Time (rolling on/off) | último recurso; alta variância |

### 4. Matched market (se geo-split)

- Selecionar 3-6 geos "teste" e 3-6 geos "controle" com trajetória similar nas últimas
  8-12 semanas (baseline pareado).
- Métrica de pareamento: euclidean distance sobre {conv/semana, revenue/semana,
  tráfego orgânico}.
- Validar com placebo test (comparar geos antes do teste).

### 5. Execução

- Congelar demais canais nesse período (evitar confundimento).
- Nada de refresh estrutural nas outras plataformas.
- Documentar TUDO em change log.
- Se houver "vazamento" (canal offline reativado por engano), teste morre — declarar
  inconclusivo e reiniciar.

### 6. Leitura

Lift = (conv geo-teste - conv geo-controle) / conv geo-controle × 100.

- Positivo e significativo (p<0.05, IC 95% não cruza 0): canal é incremental.
- Positivo mas não significativo: mais dados ou canal marginal.
- Zero ou negativo significativo: canal está canibalizando outros; pausar é ganho.

## Meta-analysis — reunir vários testes

Um teste = 1 dado. 4-6 testes ao longo de 12-24 meses = padrão confiável.

Ferramentas: MMM (Marketing Mix Modeling — Robyn open-source Meta, LightweightMMM Google)
absorve os lifts como priors bayesianos e calibra alocação futura.

## Cross-channel — interação entre canais

Um lift test isolado não captura interação (Meta puxa search brand, e daí?). Para isso:

- **Search brand como métrica secundária**: pausa de social geralmente reduz search brand
  em 5-25%.
- **Direct traffic** também cai (5-15%).
- **CRM opt-in** também cai (visitor volume).

Sempre reportar lift em 3-5 métricas, não só compra final.

## Anti-padrões

- **Teste sem hipótese numérica.** "Vamos ver o que dá" — não é teste.
- **Trocar criativo no meio do teste.** Confundimento fatal.
- **Ler o teste depois de 5 dias.** Poder estatístico não fecha em 5 dias.
- **Pausar canal só em uma cidade sem controle.** Sem matched market, é observação, não
  experimento.
- **Ignorar sazonalidade.** Rodar teste na semana pré-Black Friday distorce tudo.
- **Comparar lift entre testes com metodologias diferentes.** Não são comparáveis.

## Fronteiras inter-squad

- **Desenho do teste + leitura básica + comunicação executiva** — Peitho faz (esta
  habilidade).
- **Modelagem estatística avançada (MMM, causal inference, DAG)** — handoff a **Metis**
  (`desenho-de-experimento-estatistico`).
- **Comunicação do resultado ao CFO / board** — handoff a **Plutos**.

## Formato de saída

1. Hipótese testável com expectativa numérica.
2. Método escolhido + justificativa.
3. Unidade de aleatorização + matched market (se geo).
4. Poder estatístico calculado (MDE / N / alpha / poder).
5. Cronograma de execução com congelamento dos demais canais.
6. Métricas de leitura (primária + 3-5 secundárias).
7. Plano de meta-analysis (próximos 3-6 testes).

## Referências

- `references/desenho-de-lift-test.md` — template de desenho completo.

---

Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B02/paid-media
(IDs PM-G12, G15). Herança histórica: Meta Marketing Science, Google/Nielsen MEC,
Wes Nichols (MarketShare), Avinash Kaushik. Sem cópia literal do upstream.
