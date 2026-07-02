---
name: arquitetura-de-inferencia-llm-autonoma
description: Use para arquitetar a camada de **inferência de LLM** (proprietário ou local) com autonomia de execução — token accounting real, cache semântico + exato, fallback chain provider-agnostic, circuit breaker por latência, cost/token telemetry e uso do **prompt cache header da Anthropic**. Cobre o serving de LLM autônomo sob a filosofia Kolden (vendor-agnóstico, soberania de dados) e o cross-link direto com o runtime Hermes (camada-2). Gatilhos típicos: "arquitetar chamada de LLM", "fallback OpenAI/Anthropic/local", "prompt cache", "circuit breaker de LLM", "cost telemetry por token", "cache semântico de LLM", "roteamento multi-provider", "Hermes runtime". NÃO cobre engenharia de prompt propriamente dita (essa é `engenharia-de-prompts-versionada` no roadmap Prometeu B03-B) — esta habilidade decide a **arquitetura de execução** por trás.
agent-owner: architect (Aria)
maturity: 8.0
origem: msitarzewski/agency-agents@a597cb6 · IDs G7, G8, G9 · bucket B03 engineering
---

# Arquitetura de Inferência LLM Autônoma

## Herança Histórica

**Metodologia base:** _Anthropic Engineering Blog — Prompt Caching_ (2024) para `anthropic-beta: prompt-caching-2024-07-31` header; _OpenAI cookbook / Azure OpenAI reliability patterns_ (2023) para fallback chain; _LangChain / LlamaIndex_ padrões de LLM router; _Michael Nygard — Release It!_ (2007, 2ed 2018) capítulo 5 (Stability Patterns) para circuit breaker e bulkhead aplicados a LLM. _Simon Willison_ (llm CLI, 2023-2025) para o padrão provider-agnostic. _Kolden Hermes runtime_ (camada-2 do Contrato) como referência de execução autônoma real.

**Assinatura vocabular:** "prompt cache", "fallback chain", "circuit breaker por latência", "token accounting", "cache semântico", "provider-agnostic", "cost/token", "TPS budget", "graceful degradation".

## Quando invocar

Dispara quando:
- Está desenhando um agente/serviço que chama LLM em produção com SLA.
- Uma chamada LLM já custou mais do que o esperado — precisa telemetria real de tokens.
- Provider caiu (OpenAI 5xx) e sistema parou — precisa fallback chain.
- Cache atual só bate em queries idênticas (0% hit rate real) — precisa cache semântico.
- Vai plugar novo provider (Mistral, DeepSeek, modelo local via Ollama) na arquitetura.

NÃO dispara quando:
- Está apenas prototipando em notebook (uso direto do SDK basta).
- Está desenhando o **prompt** em si (essa é engenharia-de-prompt).

## O Método — 6 componentes canônicos

### 1. Provider Abstraction Layer

Interface única para todo provider:

```typescript
interface LLMProvider {
  name: string
  complete(req: LLMRequest): Promise<LLMResponse>
  stream(req: LLMRequest): AsyncIterable<LLMChunk>
  countTokens(text: string): number
  supportedFeatures: {
    promptCache: boolean
    tools: boolean
    vision: boolean
    streaming: boolean
  }
}
```

Implementações: `AnthropicProvider`, `OpenAIProvider`, `MistralProvider`, `OllamaProvider` (local), etc. Todos plugam no mesmo router.

**Regra Kolden:** chave via **Infisical** (nunca env em texto puro). Ver `infisical-padrao`.

### 2. Prompt Cache (exato + semântico)

**Camada A — Cache exato** (mesma request literal):
- Redis, chave = `sha256(provider + model + messages_json + temperature)`.
- TTL 60-3600s conforme sensibilidade.
- Hit rate baseline: 5-15% em produção real.

**Camada B — Cache semântico** (queries similares):
- Embedding da query (BGE-small, all-MiniLM) → busca top-k em Qdrant/Postgres pgvector com similaridade > 0.92.
- Se hit, devolve resposta em cache **com telemetria clara** (`cache_hit_type: semantic`).
- Hit rate baseline: 15-30% em produção real (adicional ao exato).

**Camada C — Provider-native cache** (Anthropic):
- Adicionar header `anthropic-beta: prompt-caching-2024-07-31`.
- Marcar blocos estáveis (system prompt, few-shots, contexto grande) com `cache_control: {type: "ephemeral"}`.
- Redução de custo até 90% no cache hit para prompt cacheado.

### 3. Fallback Chain

Ordem padrão Kolden (customizável por caso):

```yaml
chain:
  - provider: anthropic
    model: claude-opus-4.7
    timeout_ms: 30000
    max_retries: 2
  - provider: openai
    model: gpt-4o
    timeout_ms: 30000
    max_retries: 1
  - provider: mistral
    model: mistral-large
    timeout_ms: 30000
    max_retries: 1
  - provider: ollama-local
    model: llama-3.3-70b
    timeout_ms: 60000
    max_retries: 0
```

Regras:
- Salto para o próximo provider em: `5xx`, `429 sem retry-after`, timeout, circuit breaker aberto.
- **NUNCA** salta em erro do próprio prompt (`400 invalid_request`, `content_policy_violation`) — problema é do prompt, provider seguinte não resolve.
- Registra `provider_used` na resposta para auditoria.

### 4. Circuit Breaker por Latência

Padrão do _Release It!_ aplicado ao LLM:

- **CLOSED**: chamadas normais. Coleta p95 e error rate em janela de 60s.
- **OPEN**: se p95 > 2x baseline por 3 janelas OU error rate > 10% por 1 janela → abre. Chamadas subsequentes falham imediato (`503 circuit_open`), forçando fallback chain.
- **HALF_OPEN**: após 30s em OPEN, permite 10% do tráfego. Se sucesso, volta a CLOSED. Se falha, volta a OPEN.

Um circuit breaker **por provider por model** (não global — Anthropic Sonnet lento não deve abrir circuit do Opus).

### 5. Token Accounting e Cost Telemetry

Por request registra:

```jsonl
{
  "req_id": "...",
  "provider": "anthropic",
  "model": "claude-opus-4.7",
  "input_tokens": 4231,
  "cached_input_tokens": 3800,
  "output_tokens": 512,
  "cost_input_usd": 0.00423,
  "cost_cached_input_usd": 0.00038,
  "cost_output_usd": 0.00768,
  "cost_total_usd": 0.01229,
  "latency_ms": 1842,
  "cache_hit_type": "provider_native",
  "fallback_depth": 0,
  "ts": "2026-07-02T15:30:00Z"
}
```

Vai para ClickHouse (volume) ou Postgres (baixo volume). Dashboard: custo/hora, custo/tenant, cost per successful outcome (Metis — telemetria-de-tokens-e-custo).

**Regra dura:** não confiar em estimativa por caracteres — sempre **ler do response do provider** os token counts reais. Estimar de cabeça = viés confirmatório.

### 6. TPS Budget e Backpressure

Cada tenant/agente tem budget:

```yaml
budget:
  tenant_id: ronan-personal
  monthly_usd_cap: 500
  daily_tps_cap: 10   # requests/second
  hard_stop_at_pct: 100  # bloqueia
  soft_alert_at_pct: 80  # notifica
```

Quando 80% → alerta. Quando 100% → bloqueia com erro claro (`429 budget_exhausted`) — não faz "melhor esforço".

## Cross-link Hermes Runtime

Hermes (camada-2 do Contrato Kolden) é o **runtime** que executa agentes autônomos. Esta arquitetura de inferência é o **substrato** que o Hermes usa:

- Fallback chain: quando OpenRouter (provider default do Hermes) falha, cai para Anthropic direto → Mistral → local.
- Prompt cache: sistema-prompt do Hermes (mesmo entre invocações do mesmo agente) usa `cache_control: ephemeral`.
- Circuit breaker: Hermes vê `503 circuit_open` como sinal de que o próximo tick deve tentar outro provider.
- Cost telemetry: alimenta `Metis/telemetria-de-tokens-e-custo`, que calcula ROI por agente.

## Anti-padrões

- Cache só exato (0% de hit real em produção onde queries são "parecidas mas não idênticas").
- Fallback chain que pula em erro `400 invalid_request` — sintoma de que quem escreveu não entendeu o padrão.
- Estimar token por `text.length / 4` — erra em 30-50% para prompts multilíngues ou com JSON.
- Sem circuit breaker — provider degradado leva o sistema junto.
- Chave hardcoded no código ou em `.env` versionado — fere a Constituição Kolden (Art. VII).

## Cross-links

- Prometeu → `mlops-em-producao` (LLM tem ciclo de vida diferente de modelo ML clássico).
- Prometeu → `topologias-de-inferencia-ml` (LLM cai em subset das topologias — sempre online + cache).
- Metis → `telemetria-de-tokens-e-custo` (dashboard de custo real).
- Hermes (camada-2) → `runtime` — consumidor principal desta arquitetura.
- Caos → `infisical-padrao` (chaves de provider vêm daqui).

---

Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B03/engineering.
