---
name: telemetria-de-tokens-e-custo
description: >
  Mede o consumo REAL de tokens e o custo em dólar de uma sessão, tarefa ou agente de IA —
  e calcula a eficiência de saída (tokens de saída por tarefa) e a economia honesta de uma
  técnica de compressão/concisão. Use quando o pedido for medir gasto de tokens, custo de LLM,
  ROI de uma otimização de prompt, "quanto economizamos com X", ou comparar agentes/modos por
  eficiência. NÃO use para estimar tokens "de cabeça" — esta habilidade exige número lido de log
  real. É a régua anti-vaidade do Metis para qualquer métrica de eficiência de IA.
---

# Telemetria de tokens e custo

Régua honesta para responder "quanto isto custou e quanto economizamos de verdade". Trata token e
dólar como o Kaushik trata qualquer métrica: número sem fonte e sem ação é **vaidade** — mate-o.

## Princípio inviolável: número lido, nunca estimado pelo modelo

A contagem de tokens **vem do log**, não da cabeça do LLM. Pedir ao modelo "quantos tokens isso
gastou?" produz chute. Sempre leia da fonte primária:

- **Sessões do Claude Code** — log `*.jsonl` em `$CLAUDE_CONFIG_DIR/projects/.../`. Some
  `usage.output_tokens` e `usage.cache_read_input_tokens` das entradas `type: "assistant"`; conte
  os turnos. Receita completa de parsing em `references/tabela-de-precos-e-leitura-de-log.md`.
- **API direta (Anthropic/OpenRouter/etc.)** — use o campo `usage` da resposta da API. É a verdade.
- **Benchmark controlado** — rode o conjunto de prompts pela API e grave as contagens cruas em
  JSON versionado. Nunca arredonde "para ficar redondo".

Se a fonte real não existe, a resposta honesta é "não medido" — não um número inventado.

## As três métricas

1. **Custo (USD).** `tokens_saída / 1_000_000 × preço_saída_do_modelo`. A tabela de preço por
   modelo (com correspondência por prefixo de id, para sobreviver a point-releases) está em
   `references/`. Modelo desconhecido → reporte tokens, **não** invente dólar.
2. **Eficiência de saída.** `tokens_de_saída ÷ tarefas` (ou por turno, ou por agente). É a métrica
   que separa um agente enxuto de um verborrágico — o equivalente analítico do "E daí?": output
   alto sem ganho de qualidade é desperdício, não trabalho.
3. **Economia honesta.** Veja abaixo. Sempre com a baseline nomeada.

## A baseline honesta (anti-vaidade)

A maior mentira de qualquer relatório de "economia de tokens" é a baseline escolhida para inflar o
número. Regra do Metis:

- **A baseline é a alternativa justa, não o pior caso.** Para julgar uma técnica de compressão de
  saída, compare contra **"responda de forma concisa"** (concisão genérica), **não** contra a saída
  crua sem nenhuma instrução. Comparar contra o cru credita à sua técnica o que qualquer pedido de
  brevidade já entregaria — isso é trapaça de medição.
- **Delta honesto = técnica − baseline-justa.** Reporte os dois números e nomeie a baseline. Ex.:
  "−42% vs. 'responda conciso' (baseline), não vs. saída crua".
- **Só estime economia para o que foi medido.** Se o modo/agente não tem dado de benchmark, mostre
  "sem estimativa de economia para este modo" — em vez de extrapolar de outro modo.
- **Atribua a economia ao custo certo.** Token de saída e token de entrada/cache têm preços
  diferentes; economia de saída ≠ economia de input (compressão de memória/contexto). Não some peras
  com maçãs num "% economizado" único.

## Fluxo padrão

1. **Defina a unidade de análise** — sessão, tarefa, agente ou modo? E o objetivo de negócio por
   trás (cortar custo? caber em janela de contexto? acelerar?).
2. **Leia a fonte real** (log JSONL, `usage` da API ou JSON de benchmark). Sem fonte → "não medido".
3. **Calcule** as três métricas. Custo só com modelo na tabela de preços.
4. **Nomeie a baseline** e reporte o delta honesto contra ela.
5. **Agregue** quando for vitalício/multi-sessão: deduplique por `session_id` mantendo o último
   snapshot por sessão antes de somar (evita contar a mesma sessão duas vezes).
6. **Entregue como o Kaushik exige** — dado, insight, ação recomendada, impacto no negócio. "−42%
   de tokens de saída a 15 USD/M = ~X USD/mês neste volume; recomendo adotar no agente Y."

## Anti-padrões (recuse)

- Reportar "% economizado" sem dizer contra qual baseline.
- Dólar para modelo fora da tabela de preços (chute de preço).
- Misturar economia de saída com economia de entrada num número só.
- Estimar tokens pelo modelo quando o log real está disponível.
- Tratar tokens como métrica final: o número serve a uma decisão (adotar/descartar a técnica, trocar
  de modelo, mudar o agente). Sem decisão, é vômito de dados.

## Referências
- `references/tabela-de-precos-e-leitura-de-log.md` — tabela de preço de saída por modelo
  (correspondência por prefixo) + receita de parsing do log JSONL de sessão + harness de eval de 3
  braços (baseline cru / concisão / técnica).

---

### Atribuição
Princípio absorvido de **JuliusBrussee/caveman** (`caveman-stats` G12 + harness de eval de 3 braços
e benchmark de tokens reais G21/G22) — commit `25d22f864ad68cc447a4cb93aefde918aa4aec9f`, licença
MIT. Reescrito em PT-BR e reenquadrado como régua de analytics do Metis (anti-vaidade, fonte real,
baseline honesta). Sem cópia literal de código; nenhuma chamada direta a provedor embutida — segredos
e contagem via Infisical / fonte primária.
