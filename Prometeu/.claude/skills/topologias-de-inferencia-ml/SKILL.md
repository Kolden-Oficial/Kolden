---
name: topologias-de-inferencia-ml
description: Use para decidir **como servir um modelo de ML/DL** em produção — online (real-time API), batch (offline scoring), stream (Kafka + model server), edge (ONNX/TFLite no dispositivo) ou serverless (Lambda + SageMaker). Entrega uma matriz de decisão por SLA de latência, throughput, custo por 1M inferências e footprint de operação, mais o **contrato de deploy** por topologia. Gatilhos típicos: "como servir esse modelo", "online vs batch", "modelo no edge", "inferência em stream", "escolher topologia de serving", "Kafka + modelo", "modelo em dispositivo", "SageMaker vs Lambda". NÃO substitui `mlops-em-producao` (essa cobre o **ciclo de vida** do modelo — registry, CI/CD, drift); esta habilidade decide o **shape topológico** do serving.
agent-owner: architect (Aria)
maturity: 7.5
origem: msitarzewski/agency-agents@a597cb6 · ID G6 · bucket B03 engineering
---

# Topologias de Inferência ML

## Herança Histórica

**Metodologia base:** _Werner Vogels — "You build it, you run it"_ (Amazon, 2006) aplicado ao serving de modelo; _NVIDIA Triton Inference Server_ blueprint (2020) para multi-modelo em GPU; _Chip Huyen — Designing ML Systems_ cap. 7 (Model Deployment and Prediction Service); _Google TensorFlow Serving_ team para o padrão canônico de gRPC + REST. Complementado por _Pete Warden_ (TinyML / TFLite) para edge, e _Confluent — Streaming ML with Kafka_ para stream.

**Assinatura vocabular:** "online/batch/stream/edge/serverless", "cold start", "batch coalescing", "dynamic batching", "quantização", "gRPC vs REST", "sidecar de modelo", "colocated vs remote".

## Quando invocar

Dispara quando:
- Modelo saiu do notebook e precisa decidir formato de serving.
- SLA de latência não bate com a topologia atual (ex.: online mas p95 > 500ms).
- Custo de serving explodiu (ex.: GPU 24/7 servindo <1 req/s).
- Precisa suportar modo offline (edge, sem rede).
- Sistema atual mistura online e batch de forma ad-hoc e está impossível de operar.

NÃO dispara quando:
- Ainda não decidiu qual modelo vai a produção (isso é `mlops-em-producao` etapa CI/CD).
- Modelo é LLM (usar `arquitetura-de-inferencia-llm-autonoma`).

## O Método — 5 topologias canônicas + matriz

### 1. Online (real-time API)

**Quando**: latência p95 < 200ms, request unitária (1 exemplo por chamada), throughput variável.

**Stack padrão Kolden**:
- Modelo em **ONNX** ou **TorchServe** ou **TensorFlow Serving**.
- Servidor: pod K8s com HPA (auto-scaling por CPU/GPU) + PodDisruptionBudget.
- API gateway: FastAPI/gRPC em frente.
- Cache de predição (Redis) para requests idênticas (feature hash → prediction), TTL 60-300s.
- Dynamic batching (junta N requests próximas em micro-batch de 4-8 exemplos para amortizar overhead de GPU).

**Trade-off**: cold start ao escalar de 0. Custo alto se throughput baixo (GPU parada).

### 2. Batch (offline scoring)

**Quando**: sem SLA de latência (horas ok), dataset grande (milhões de exemplos), reprocessa periodicamente.

**Stack padrão Kolden**:
- Job Airflow/Prefect que dispara Spark/Ray/Dask.
- Lê batch de features do Postgres/Data Warehouse → predição → escreve tabela de scores.
- Idempotência por `(entity_id, batch_id)`.

**Trade-off**: predição não é "ao vivo" (staleness de horas). Mas custo/inferência é 10-100x menor.

### 3. Stream (event-driven)

**Quando**: eventos chegando em fluxo (Kafka), decisão precisa acompanhar (p95 < 5s), ordenação importa.

**Stack padrão Kolden**:
- Kafka Streams / Flink / Kafka + consumer Python.
- Consumer lê evento → carrega features do estado (RocksDB local ou feature store) → predição → publica em tópico de saída.
- Modelo colocated no consumer (sem RPC) para latência mínima.

**Trade-off**: complexidade operacional de streaming. Não trivial de rollback (evento já foi consumido).

### 4. Edge (on-device)

**Quando**: dispositivo offline (mobile, IoT, browser), latência precisa ser sub-100ms, privacidade (dado não sai do device).

**Stack padrão**:
- Modelo convertido para **TFLite** (mobile) ou **ONNX Runtime Web** (browser) ou **CoreML** (iOS).
- **Quantização** obrigatória (INT8) para modelos > 10MB.
- Distribuição via app bundle ou CDN (versionamento importa — modelo pode ficar preso em versão antiga em dispositivo do usuário).

**Trade-off**: retrain lento (usuários com app antigo). Debug remoto difícil. Modelo precisa ser leve.

### 5. Serverless (Lambda / SageMaker Endpoint / Cloud Run)

**Quando**: throughput baixo e imprevisível, quer zero operação de infra.

**Stack padrão**:
- **AWS Lambda + SageMaker Endpoint** ou **GCP Cloud Run** com contêiner do modelo.
- Frio: cold start 3-15s (aceita?).
- Custo por invocação (sem servidor rodando ocioso).

**Trade-off**: cold start é matador se p95 é sensível. Custo explode se throughput sobe muito (10x custo de VM dedicada acima de X req/s).

## Matriz de Decisão

| Critério | Online | Batch | Stream | Edge | Serverless |
|---|---|---|---|---|---|
| **Latência p95** | <200ms | horas | <5s | <100ms | 500ms-15s (cold) |
| **Throughput** | variável, alto | massivo, agendado | contínuo | por-device | baixo/burst |
| **Custo/1M inferências** | $$$ | $ | $$ | $ (fixo no device) | $$ (variável) |
| **Complexidade operacional** | média | baixa | alta | média | baixa |
| **Rollback** | 1 comando | rerun job | complexo | atualização de app | 1 comando |
| **Offline?** | não | N/A | não | sim | não |
| **Multi-modelo simultâneo** | sim (Triton) | sim | difícil | não | 1 por endpoint |

## Contrato de Deploy por Topologia

Cada topologia tem seu **contrato mínimo** (Prometeu-style):

**Online:**
- Health check endpoint (`/healthz`, `/readyz`).
- Métrica exposta em Prometheus (`prediction_latency_seconds`, `prediction_total`).
- Log estruturado (JSON) por request.
- Contract test: `POST /predict` com fixture → response conforme schema OpenAPI.

**Batch:**
- Idempotência: `(entity_id, batch_id, model_version)` é chave única.
- Log de linhagem: qual dataset foi lido, qual modelo foi usado.
- SLA de conclusão (job deve terminar até T horas do disparo).

**Stream:**
- Consumer group dedicado, offset commit após publicação bem-sucedida no tópico de saída.
- DLQ (dead letter queue) para eventos que falharam N vezes.
- Métrica de lag (`consumer_lag_records`).

**Edge:**
- Versão do modelo embutida no artifact.
- Fallback para servidor cloud se predição local falhar.
- Telemetria opt-in de acertos/erros para retrain.

**Serverless:**
- Warm pool configurado se cold start é problema (provisioned concurrency).
- Timeout > 2x p99 esperado (evita false-negatives).

## Anti-padrões

- Escolher online porque "quero real-time" quando batch resolveria com 1/10 do custo.
- Colocar modelo grande no edge sem quantizar (app bundle 300MB).
- Stream sem DLQ — evento envenenado trava consumer para sempre.
- Serverless com modelo de 4GB de pesos — cold start de 45s.
- Não versionar modelo no artifact do edge (usuário fica preso em v1 forever).

## Cross-links

- Prometeu → `mlops-em-producao` (ciclo de vida do modelo, precede esta decisão).
- Prometeu → `arquitetura-de-inferencia-llm-autonoma` (LLM tem topologias próprias).
- Prometeu → `slo-error-budget-burn-rate` (SLO de latência define a topologia).
- Prometeu → `otimizacao-de-banco-postgres-supabase` (batch escreve em Postgres, feature store lê do Postgres).

---

Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B03/engineering.
