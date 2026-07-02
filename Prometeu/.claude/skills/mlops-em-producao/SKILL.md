---
name: mlops-em-producao
description: Use para desenhar ou operar MLOps end-to-end em produção — model registry, CI/CD para modelos (test data → validation → shadow deploy → canary), feature store, drift detection (PSI/KS), retrain triggers automáticos e rollback binário. Cobre o ciclo completo do modelo em produção: **do treino ao canary passando por gates de qualidade determinísticos**, com telemetria de custo por inferência e alarme de degradação. Gatilhos típicos: "MLOps", "model registry", "MLflow", "W&B", "shadow deploy de modelo", "detecção de drift", "PSI/KS test", "retrain automático", "canary de modelo", "rollback de modelo em produção". NÃO cobre a arquitetura de servir o modelo (essa é `topologias-de-inferencia-ml`) nem a inferência de LLM autônomo (essa é `arquitetura-de-inferencia-llm-autonoma`).
agent-owner: dev (Dex)
maturity: 8.0
origem: msitarzewski/agency-agents@a597cb6 · ID G5 · bucket B03 engineering
---

# MLOps em Produção

## Herança Histórica

**Metodologia base:** _Chip Huyen — "Designing Machine Learning Systems"_ (O'Reilly, 2022): capítulos 8 (Data Distribution Shifts and Monitoring) e 10 (Infrastructure and Tooling). Complementado por _Andrew Ng — LandingAI / MLOps foundations_ (2021) para disciplina de data-centric AI. Emei Burr e Neal Lathia (Monzo) para o padrão de shadow deploy antes de canary. Ernest Kim (Uber Michelangelo) para blueprint de feature store versionado.

**Assinatura vocabular:** "model registry", "shadow deploy", "canary", "PSI/KS drift", "training-serving skew", "feature store versionado", "retrain trigger", "champion vs challenger", "gate determinístico".

## Quando invocar

Dispara quando:
- Modelo ML/DL vai para produção pela primeira vez.
- Retrain manual está virando gargalo (>1/mês, engenheiro puxando dado à mão).
- Modelo está em produção mas ninguém sabe qual versão está servindo cada request.
- Predições em produção divergiram do treino (suspeita de drift).
- Rollback de modelo levou >1h no último incidente.

NÃO dispara quando:
- Você está apenas fazendo _experimentação_ em notebook (sem produção).
- É um modelo one-shot que roda 1x e joga fora.
- É LLM proprietário via API (drift detection é diferente — usar `arquitetura-de-inferencia-llm-autonoma`).

## O Método (7 componentes canônicos)

### 1. Model Registry (fonte da verdade)

- Ferramenta padrão Kolden: **MLflow** (self-hosted em Postgres) ou W&B (SaaS quando ok).
- Toda versão de modelo tem: `{model_id, versao, hash_dos_pesos, framework, dataset_id_treino, dataset_hash, metricas_offline, autor, timestamp, status}`.
- `status` ∈ {`Staging`, `Production`, `Archived`}. **Apenas 1 versão por model_id pode estar em `Production` de cada vez.**
- Zero modelo em produção sem entrada no registry (gate).

### 2. Feature Store versionado

- Feature = par `(nome, tipo, definição_SQL_ou_transformação, versao)`.
- Feature store armazena `(entity_id, feature_name, feature_value, event_ts, ingest_ts)` — permite _point-in-time correctness_ (a feature que valia NO MOMENTO daquele evento).
- Ferramentas: **Feast** (open-source, self-hosted em Postgres/Redis) para Kolden, ou Tecton (SaaS) quando volume justificar.
- **Gate anti-training-serving-skew:** treino e serving leem da MESMA feature store, com a MESMA transformação. Nada de "recalcula feature em Python no treino e em JS na produção".

### 3. CI/CD para modelos

Pipeline padrão:

```
commit no repo de modelo
  → test data (dataset canônico versionado)
  → treino em ambiente reprodutível (Dockerfile pinado)
  → métricas offline batem baseline (gate: se piorou >X%, aborta)
  → registro em Model Registry como Staging
  → shadow deploy (mesma request vai para champion + challenger, response do challenger é logada mas não devolvida)
  → após N requests, comparar métricas online champion vs challenger
  → canary (5% → 25% → 100%) com auto-rollback se métrica pior
  → promoção para Production
```

**Gate determinístico entre cada etapa:** sem gate assinado, não avança.

### 4. Drift Detection

Dois tipos:
- **Data drift** (input mudou): compara distribuição da feature `X` em produção contra distribuição no treino.
- **Concept drift** (label mudou): a relação `X → y` mudou (só detectado com feedback loop rotulado).

Métricas padrão:
- **PSI (Population Stability Index)**: PSI > 0.25 = drift crítico, > 0.10 = investigar.
- **KS test (Kolmogorov-Smirnov)**: p-valor < 0.01 = distribuição estatisticamente diferente.
- Para categóricas: **chi-squared test**.

Roda em batch diário/semanal. Alarme dispara `retrain_recommended`.

### 5. Retrain Triggers

Três gatilhos possíveis:
- **Schedule** (cron): retrain toda segunda-feira 3AM.
- **Drift-based**: PSI > 0.25 em ≥1 feature crítica → dispara retrain.
- **Performance-based**: métrica online (ex.: precision) cai >X% do baseline por N janelas consecutivas → dispara.

Cada retrain gera nova versão candidata que **entra no CI/CD do item 3 desde o início** (não pula direto para produção).

### 6. Champion vs Challenger (shadow + canary)

- **Shadow**: challenger recebe cópia da request. Response não é devolvida. Métricas coletadas em paralelo. Duração típica: 3-7 dias.
- **Canary**: challenger recebe % crescente de tráfego real. Auto-rollback se p-valor de degradação < 0.05 em métrica de negócio.
- Promoção manual (com aprovação) na última etapa. Rollback binário: 1 comando reverte o `Production` para versão anterior.

### 7. Telemetria de Inferência

Por request: `{model_id, versao, features_hash, prediction, latency_ms, cost_usd (se GPU), user_id_ofuscado, ts}`.
Vai para Postgres/ClickHouse (dependendo do volume).
Dashboard mostra: p50/p95/p99 latência, requests/s, custo/hora, distribuição de features (para drift).

## Rollback

Requisito duro: **rollback binário em < 60 segundos**. Como:
- Model Registry aponta para artifact URI.
- Toggle: `PRODUCTION_MODEL_VERSION=v42 → v41` (variável de ambiente lida pelo servidor de inferência a cada M requests, cache TTL 30s).
- Não é redeploy, é **hot swap** de versão no mesmo servidor.

## Anti-padrões

- Modelo em produção sem entrada no registry ("mas eu sei qual é o `.pkl` que subi").
- Recalcular feature em Python no treino e em SQL na produção — training-serving skew garantido.
- "Vou monitorar drift depois" — deixa para depois = nunca detecta drift silencioso.
- Retrain manual mensal sem trigger de drift — pode estar retreinando quando não precisa, ou não retreinando quando precisa.
- Canary de 100% direto ("é só 5% de degradação, vai") — perde alarme precoce.

## Cross-links

- Prometeu → `topologias-de-inferencia-ml` (COMO servir o modelo: online/batch/stream/edge).
- Prometeu → `arquitetura-de-inferencia-llm-autonoma` (LLMs seguem padrão diferente).
- Prometeu → `invariantes-de-pipeline-de-dados` (feature store depende de pipeline com invariantes).
- Prometeu → `devops-e-entrega-continua` (CI/CD do modelo herda da CI/CD do repo).
- Prometeu → `slo-error-budget-burn-rate` (SLO de latência/erro de inferência).

---

Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B03/engineering.
