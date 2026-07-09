---
name: engenharia-de-prompts-versionada
description: Use ao operar prompts de LLM como CÓDIGO — versionados no repo (prompts/*.md com frontmatter), registry central com hash por versão, A/B test com eval automático (accuracy/latency/cost), rollback binário sem redeploy, deprecation com timeline. Cobre a fronteira entre code (que muda por PR) e prompt (que muda por experimento). Anti-padrão&#58; prompt hardcoded em string dentro do código-fonte. Dono&#58; @dev (Dex) + @qa (Quinn). Cross-link `arquitetura-de-inferencia-llm-autonoma` (runtime de execução), `telemetria-de-tokens-e-custo` (Metis; economia real) e `estrategias-de-deploy-zero-downtime` (flag por versão de prompt).
grounding_required: false
categoria_art_iv: MCP-nativo
squads_consumidores: [Prometeu-interno]
---

# Engenharia de Prompts Versionada

## Quando invocar

- Produto embute LLM como camada de produção (não brincadeira interna)
- Já há mais de 3 prompts diferentes em produção — vira problema de gestão
- Diferença de qualidade entre modelos/prompts precisa ser MEDIDA (não intuição)
- Rollback de prompt precisa ser < 1 min (não redeploy)
- Compliance/auditoria pede "qual prompt exato foi enviado ao LLM no request X"

## O princípio

**Prompt é código de produção.** Toda regra que vale para código, vale para prompt:
- Versionado no repo, revisado em PR
- Testado antes de shipar
- Instrumentado em produção
- Rollback sem drama
- Deprecation com timeline

Prompt hardcoded como string dentro de `getAnswer()` no service é **débito técnico crônico**.

## Estrutura de arquivo — prompts como MD com frontmatter

```
prompts/
├── summarize/
│   ├── v1.md
│   ├── v2.md          ← atual em produção
│   ├── v3-experiment.md  ← em A/B
│   └── README.md
├── classify-intent/
│   ├── v1.md
│   └── v2.md          ← atual
└── registry.json      ← hash + status por versão
```

### Frontmatter canônico

```markdown
---
id: summarize
version: 2
model: claude-sonnet-4-6
temperature: 0.2
max_tokens: 500
status: production   # draft | canary | production | deprecated
deprecated_after: null   # ou data ISO se agendado
owner: @dev
created: 2026-07-01
change_from_v1: "Adicionado exemplo de tom-de-marca; troca de temperatura 0.7→0.2"
eval_baseline: "eval-summarize-golden-100.json"
eval_score: 0.87
---

# System

Você é um assistente de resumo da Kolden. Resuma o texto do usuário em no
máximo 3 bullets, mantendo tom técnico e neutro.

# User

{{text}}
```

### Registry central (`registry.json`)

```json
{
  "prompts": [
    {
      "id": "summarize",
      "current_version": 2,
      "sha256": "3b2f...ae1c",
      "path": "prompts/summarize/v2.md"
    },
    {
      "id": "classify-intent",
      "current_version": 2,
      "sha256": "8d1a...cf03",
      "path": "prompts/classify-intent/v2.md"
    }
  ]
}
```

Hash SHA-256 do conteúdo do prompt garante que "produção v2" é bit-exato ao arquivo. Qualquer edição sem bump de versão → CI falha.

## Loader/runtime

```typescript
import promptRegistry from '@/prompts/registry.json'

async function loadPrompt(id: string, overrides?: { version?: number }) {
  const entry = promptRegistry.prompts.find(p => p.id === id)
  const version = overrides?.version ?? entry.current_version
  const content = await fs.readFile(`prompts/${id}/v${version}.md`, 'utf8')
  const parsed = parseMdWithFrontmatter(content)
  const actualHash = sha256(content)
  if (actualHash !== entry.sha256 && version === entry.current_version) {
    throw new Error(`Prompt ${id} v${version} tampered — expected ${entry.sha256}`)
  }
  return parsed
}
```

Cross-link `arquitetura-de-inferencia-llm-autonoma` — o runtime chama loadPrompt, injeta variáveis, envia ao provider.

## Ciclo de versão

```
draft → canary → production → deprecated → archived
```

| Estado | Tráfego | Duração | Gate |
|---|---|---|---|
| **draft** | 0% (só testes locais) | livre | eval score ≥ baseline |
| **canary** | 5-25% via feature flag | 3-7 dias | métricas: quality, latency, cost, error rate |
| **production** | 100% | permanente | monitor contínuo |
| **deprecated** | 100% mas versão nova em canary | ≤ 30 dias | plan de migração pronto |
| **archived** | 0% (mantido no repo p/ auditoria) | permanente | — |

## Eval — o teste que prompt precisa passar

Sem eval automatizado, "prompt melhor" é opinião.

### Dataset golden

Para cada prompt em produção, um **dataset golden** (`eval-{id}-golden-{n}.json`):

```json
[
  {
    "id": "case-1",
    "input": { "text": "..." },
    "expected": {
      "must_contain": ["prazo", "orçamento"],
      "must_not_contain": ["desculpe", "não posso"],
      "max_length": 500,
      "must_be_json": false
    }
  }
]
```

### Métricas obrigatórias

Toda promoção de canary → production DEVE reportar:

| Métrica | Fonte | Gate |
|---|---|---|
| **Accuracy** (rubric-based) | eval runner | ≥ baseline |
| **Latência P95** | telemetria produção | ≤ baseline + 10% |
| **Custo por chamada** (input+output tokens × preço) | telemetria (`telemetria-de-tokens-e-custo`) | ≤ baseline + 5% |
| **Error rate** (LLM refused / JSON parse fail) | telemetria produção | ≤ baseline |
| **Human eval spot check** (5-10% amostrado) | curador humano | ≥ baseline satisfação |

**LLM-as-judge:** pode ser usado para acelerar eval, mas com cuidado — LLM avaliador tende a favorecer prompt do mesmo family/modelo. Sempre calibre com humano em 10-20% dos casos.

## A/B em produção

Feature flag por `prompt_version`:

```typescript
const version = await flagService.getVariant('summarize.version', {
  userId,
  fallback: 2
})
const prompt = await loadPrompt('summarize', { version })
```

Instrumentação por chamada:
- Emit evento `llm_call` com atributos `prompt_id`, `prompt_version`, `model`, `input_tokens`, `output_tokens`, `latency_ms`, `cost_usd`, `success`
- Warehouse (BigQuery/Postgres/Snowflake) recebe
- Dashboard compara coortes v2 vs v3

Cross-link `estrategias-de-deploy-zero-downtime` — o rollout de v3 é canary; burn rate em business metrics governa.

## Rollback binário

Rollback = mudar `current_version` no registry.json de volta para versão anterior. Sem redeploy — apenas commit + merge (deploy contínuo cuida).

Para rollback ainda mais rápido (segundos): feature flag global `prompt.summarize.forceVersion = 2` num store de flag (LaunchDarkly, PostHog, ConfigCat) que override o registry.

## Deprecation

Ao aposentar v2:
1. Marcar v2 como `deprecated`, publicar `deprecated_after: 2026-08-01`
2. v3 vira `current_version`
3. Callers com override explícito (`{version: 2}`) recebem warn no log
4. Após `deprecated_after`, remover suporte
5. Arquivo v2.md permanece no repo (auditoria, comparação)

## Compliance e auditoria

Cada `llm_call` deve permitir responder:
- Qual prompt (id + version) foi enviado?
- Qual modelo?
- Qual input completo?
- Qual output completo?
- Que decisão a aplicação tomou com o output?

Storage:
- 30 dias em quente (para debugging)
- N anos em frio (compliance) — dependendo do domínio (financeiro, saúde)
- Anonimizar PII antes de storage frio se lei exigir

Cross-link Égide `grc-e-conformidade-de-seguranca` para retenção legal.

## Handoff — `telemetria-de-tokens-e-custo` (Metis)

Prompt novo com claim "reduz 40% do custo" DEVE ser medido pela skill de Metis `telemetria-de-tokens-e-custo`. Sem número real (não estimado de cabeça), claim é vaidade.

Métrica canônica: **tokens de saída por tarefa**. Modelo com temperatura baixa pode gerar menos tokens, mas se acurácia cai, custo real (retries + fallback) sobe.

## Estrutura de repo — exemplo Kolden

```
project-root/
├── src/
│   └── services/
│       └── summarize.service.ts   ← usa loadPrompt('summarize')
├── prompts/
│   ├── registry.json
│   ├── summarize/
│   │   ├── v1.md      (deprecated)
│   │   ├── v2.md      (production)
│   │   └── v3-canary.md
│   └── classify-intent/
│       └── v1.md
├── evals/
│   ├── datasets/
│   │   ├── summarize-golden-100.json
│   │   └── classify-intent-golden-50.json
│   └── runners/
│       └── run-eval.ts
└── .github/workflows/
    └── eval-prompts.yml   ← CI que rejeita PR sem eval
```

## Checklist de PR para mudança de prompt

- [ ] Novo arquivo `vN.md` (não sobrescreve versão em produção)
- [ ] Frontmatter completo (id, version, model, params, status, owner, change_from)
- [ ] Explicação em `change_from` do que muda e por quê
- [ ] Eval rodado localmente com dataset golden — score reportado no PR
- [ ] registry.json atualizado se promoção
- [ ] Deprecation timeline documentado se versão antiga sai
- [ ] Cross-link com story-id
- [ ] Flag configurada para canary (se aplicável)

## Cross-links

- `arquitetura-de-inferencia-llm-autonoma` — runtime que consome o prompt (fallback, cache, circuit breaker)
- `telemetria-de-tokens-e-custo` (Metis) — mede economia REAL de uma otimização
- `estrategias-de-deploy-zero-downtime` — flag por versão de prompt = canary de prompt
- `disciplina-de-diff-minimo` — PR de prompt = 1 versão nova; sem refactor de código junto
- `governanca-de-contratos-de-api` — se prompt gera JSON estruturado, schema é contrato

## Herança histórica

**Simon Willison** (LLM CLI, `llm` Python tool, Django creator) — pioneiro do "prompt como arquivo versionado" na comunidade open-source. Sua CLI `llm` embute prompts em templates YAML/MD, executáveis por versão. Blog dele é registro contínuo de práticas emergentes.

**Amanda Askell** (Anthropic) — publicações sobre Constitutional AI e sobre por que **avaliação sistemática** é o gargalo real da engenharia de prompts (não a redação criativa).

**Karpathy, Andrej** — vídeo "State of GPT" (2023) plantou a ideia de prompt como código-de-primeiro-nível na indústria.

**OpenAI cookbook team** (Ted Sanders, Boris Power et al.) — repo de exemplos que virou referência de padrões para eval, few-shot, function calling, JSON mode.

**Chip Huyen** ("Designing Machine Learning Systems", 2022) — capítulos sobre monitoring e experimentação são a base do que fazemos aqui para LLMs (mesmo antes de LLMs virarem centrais).

**Hamel Husain** ("Your AI Product Needs Evals", 2024) — evangelista do "eval-first" — sem eval automatizado, produtos LLM têm regressão silenciosa a cada mudança.

**PromptLayer / Langfuse / LangSmith teams** — ferramentas dedicadas para o ciclo prompt-eval-versioning que consolidaram práticas em produtos.

## Anti-padrões

- ❌ Prompt como f-string dentro de service — impossível versionar/auditar
- ❌ "Melhorei o prompt" sem eval — regressão silenciosa
- ❌ Sem hash no registry — arquivo pode ser editado sem bump
- ❌ Trocar prompt de produção sem canary — 100% do tráfego vira canário
- ❌ Sem deprecation timeline — múltiplas versões vivem para sempre
- ❌ Log de LLM call sem prompt_version — debugging impossível
- ❌ LLM-as-judge sem calibração humana — feedback loop enviesado
- ❌ Rollback exige redeploy — janela de dor grande sob incident

---
*Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B03/engineering.*
