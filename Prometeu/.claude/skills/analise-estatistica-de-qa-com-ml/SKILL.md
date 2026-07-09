---
name: analise-estatistica-de-qa-com-ml
description: >
  Use quando a demanda for medir QUALIDADE DA SUÍTE DE TESTES com rigor estatístico
  e (opcionalmente) ML — não "roda os testes", mas "meus testes valem?". Cobre 4
  frentes: (a) flakiness — quantas vezes o teste passa em 100 runs? intervalo de
  confiança; (b) coverage gap ML-guided — código muito modificado e não coberto
  merece teste; (c) mutation testing — Stryker (JS/TS), PIT (Java), Mutmut (Python)
  medem "% de mutantes killed"; (d) test prioritization — rodar primeiro os testes
  mais propensos a falhar (fail-fast). Gatilhos: "test flakiness", "meus testes
  são bons?", "mutation testing", "Stryker", "coverage gap", "priorização de
  testes", "ML em QA", "test suite quality", "fail-fast". Dono: @qa (Quinn).
grounding_required: false
categoria_art_iv: MCP-nativo
squads_consumidores: [Prometeu-interno]
---

# Análise estatística de QA (com ML quando ajuda)

Testes verdes não significam qualidade da suíte. Suíte pode:
- Ter 90% de coverage mas 100% assert trivial (`expect(fn()).toBeDefined()`)
- Ter 5 testes flaky que ninguém sabe (retry mascarou)
- Ter teste passando por acidente (bug latente)
- Ter 3h de execução com 80% redundante

Esta habilidade mede a qualidade da suíte, não o código.

## Frente 1 — Flakiness (teste que passa às vezes)

**Definição:** teste que falha em ~5-30% das runs sem mudança de código.

**Método canônico:** rodar cada teste N vezes (N=100 default). Calcular:
- **Taxa de sucesso p** (0 a 1)
- **Intervalo de confiança de Wilson** (95%) — melhor que binomial para p próximo de 0 ou 1

```py
# pseudocódigo
from scipy.stats import binom
p_hat = successes / n
z = 1.96  # 95% CI
low, high = wilson_ci(p_hat, n, z)
if low < 0.98:
    print(f"Teste {name} é FLAKY: p={p_hat:.2%} CI=[{low:.2%}, {high:.2%}]")
```

**Threshold Kolden:** teste com CI low <98% é flaky. Isolar em quarentena, investigar, consertar.

**Causas típicas de flakiness:**
- Espera fixa (`sleep(1)`) em vez de `waitFor(condition)`
- Estado compartilhado entre testes (DB não resetado)
- Ordem-dependente (teste B depende de teste A ter rodado)
- Recurso externo instável (API de terceiro)
- Concorrência (assert de log que às vezes vem em outra ordem)
- Data/hora sem mock (`new Date()` real)

**Ferramentas:** Jest `jest-circus` com `retryTimes`, Vitest com `--reporter=verbose --repeat=100`,
GitHub Actions matrix para paralelizar.

## Frente 2 — Coverage gap ML-guided

Coverage tradicional te diz **o que está coberto**. ML-guided te diz **o que DEVERIA ser
coberto priorizando por risco**.

**Método:**
1. Extrair `git log` do repo — quantas vezes cada arquivo mudou nos últimos 6 meses.
2. Extrair `git blame` — quantos autores diferentes tocaram cada arquivo.
3. Extrair coverage report (`coverage-final.json`) — % de cobertura por arquivo.
4. Calcular **risco = mudanças × autores × (1 − coverage)**.

**Priorizar teste:** top 20 arquivos de maior risco sem coverage adequada.

```py
# pseudo
risco = churn * authors * (1 - coverage)
top_20 = sorted(files, key=lambda f: -f.risco)[:20]
```

Sem ML "fancy" — é heurística estatística. ML entra em versão avançada usando embeddings de código
para achar clusters de arquivos que mudam juntos e falham juntos (usar `code2vec`, `CodeBERT`).

**Quando ML fancy vale:** codebase >500k LoC + 50+ devs + histórico de 2+ anos. Antes disso, a
heurística `churn × authors × (1 − coverage)` domina.

## Frente 3 — Mutation testing

**Ideia:** o teste é bom se detecta bugs. Simulação: introduzir bugs pequenos ("mutantes")
no código e medir quantos testes falham. Se ninguém falha, o teste é decorativo.

**Mutantes canônicos:**
- Trocar `>` por `>=`
- Trocar `+` por `-`
- Retornar `null` em vez de valor
- Trocar `&&` por `||`
- Remover chamada de função

**Ferramentas:**
- **JS/TS:** Stryker Mutator (`@stryker-mutator/core`) — padrão Kolden
- **Python:** Mutmut, Cosmic Ray
- **Java:** PIT (pitest.org)
- **Go:** go-mutesting
- **Rust:** cargo-mutants

**Métrica: mutation score** = mutantes killed / total mutantes. Meta Kolden: ≥70% em código
crítico (auth, pagamento, cálculo). Trivial (UI, config) fica 50%.

**Custo:** mutation test é caro (10-100x tempo da suíte normal). Rodar semanal em CI, não em
cada PR. Ou rodar só nos arquivos alterados no PR (`--files=changed`).

## Frente 4 — Test prioritization

Se sua suíte demora 30min e 90% dos bugs vêm em 20% dos testes, rode esses 20% primeiro.

**Método simples (canônico):**
- Rankear teste por (a) probabilidade histórica de falhar (b) tempo de execução
- Executar em ordem descendente de `p(fail) / tempo` — fail-fast

**Método ML (fancy):**
- Treinar classificador (RandomForest, LightGBM) com features: mudanças no arquivo, autor,
  hora do dia, teste passa nos últimos 5 runs, cobertura do teste
- Prediz `p(fail | mudança)` — rodar top N% mais prováveis primeiro

Referência de estado da arte: Facebook "Predictive Test Selection" (2019) — 95% de bugs pegos
executando 33% da suíte.

**Kolden:** heurística simples primeiro. ML só quando suíte >1000 testes.

## Ritual mensal

1. **Flakiness sweep:** rodar suíte 100x, listar flaky, criar issues.
2. **Coverage gap:** rodar heurística de risco, listar top 20 arquivos, priorizar no backlog.
3. **Mutation score:** rodar Stryker no core, publicar tendência (subindo ou caindo?).
4. **Prioritization refresh:** re-treinar (se ML) ou re-ranquear (se heurística).

## Antipatrões

- **Perseguir 100% coverage.** Custa mais que rende. Meta é qualidade, não cobertura.
- **Retry mascarando flaky.** `retryTimes: 3` esconde teste ruim. Não use.
- **Rodar mutation em PR.** Muito caro. Nightly ou semanal.
- **Coverage do teste conta como coverage do código.** Quinn não confunde: coverage de linha
  ≠ coverage de comportamento.

## Handoffs

- **Flaky não morre** → Dex (@dev). Refatorar código (não teste) se causa é design ruim.
- **Mutation baixo em código crítico** → escalonar como bloqueante do release.
- **Suíte cresce sem controle** → Aria (@architect) revisa. Testabilidade é design.

## Regras Kolden

- **Sem `retryTimes` em CI de PR.** Flaky = bug, não retry-fest.
- **Mutation score do core ≥70%** antes de release. Trivial (UI) pode ficar em 50%.
- **Coverage report versionado** em `docs/qa/coverage-trend.md` — regressão >5% é warning.
- **Dashboards em Grafana Kolden** (não SonarCloud SaaS).

---
## Atribuição
Herança histórica: **Richard Lipton** — proposta original de mutation testing (1971);
**Yves Le Traon** + **Nicolas Riouault** — Stryker Mutator (2016+, JS/TS ecosystem); **Peter
Faller** — PIT mutator (Java, 2010); **John Micco** (Google) — flaky test statistical
approach (2016); **Kim Herzig** (Microsoft) — test selection with ML (2015); **Facebook
Engineering** — "Predictive Test Selection" paper (ICSE 2019); **Edwin Wilson** — Wilson
score interval (1927). Adaptado de `github.com/msitarzewski/agency-agents@a597cb6` (MIT),
bucket B03/engineering, IDs TEST G21, G22, G23, G24.
