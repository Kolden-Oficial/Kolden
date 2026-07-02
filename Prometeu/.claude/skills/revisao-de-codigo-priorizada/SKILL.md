---
name: revisao-de-codigo-priorizada
description: Use para **triar PRs por priority-tier** — hot-path (payment/auth/data-corruption) recebe 2 revisores humanos + testes obrigatórios; cold-path recebe 1 revisor + auto-checks. Heurística de triagem: files touched, LOC, complexity, blast radius, sensibilidade do módulo. Otimiza tempo de revisão sem baixar guarda onde mais importa. Gatilhos típicos: "priorizar revisão de PR", "code review prioritizado", "quem revisa esse PR", "quantos revisores", "hot-path review", "PR muito grande", "matriz de revisão", "PR de segurança/pagamento". NÃO substitui `coderabbit-review` (essa é execução automatizada) — esta habilidade decide **quem, quantos e com que profundidade** revisa.
agent-owner: qa (Quinn) + dev (Dex)
maturity: 7.5
origem: msitarzewski/agency-agents@a597cb6 · IDs G15, G16 · bucket B03 engineering
---

# Revisão de Código Priorizada

## Herança Histórica

**Metodologia base:** _Michael Fagan (IBM, 1976) — Fagan Inspection_, o método original de code inspection formal (7 papéis, 4 fases) — nossa priorização é a versão pragmática. _Google Engineering Practices Documentation_ (2020) para size guidelines e "small PRs" cultura. _Camille Fournier — The Manager's Path_ (2017) para escalonamento por sensibilidade. _Karl Wiegers — Peer Reviews in Software_ (2002) para ROI de inspeção. _Michael Lynch — "Code Review from the Command Line"_ (2018) para pragmatismo dev-first.

**Assinatura vocabular:** "hot-path", "cold-path", "blast radius", "priority-tier", "2-revisor rule", "auto-check gate", "risk-based review", "sensitive module".

## Quando invocar

Dispara quando:
- Time debate "todo PR precisa de 2 revisores?" (spoiler: não).
- Fila de PRs cresce e revisão vira gargalo.
- Bug de produção surgiu em módulo revisado por 1 pessoa apenas.
- Precisa desenhar política de revisão para novo repo.
- CODEOWNERS não existe ou está desatualizado.

NÃO dispara quando:
- Repo é solo/experimental (nenhum revisor).
- Já existe política clara e time respeita.

## O Método — Matriz de Triagem

### Passo 1 — Classificar o módulo

Cada módulo/pasta do repo recebe um tier em `.github/CODEOWNERS-KOLDEN.md`:

**Hot-path (Tier 1)** — 2 revisores + testes obrigatórios:
- `payment/`, `billing/`, `checkout/`
- `auth/`, `session/`, `identity/`
- `db/migrations/`
- `security/`, `crypto/`, `secrets/`
- Qualquer código que **corrompe dado** se falha (delete, batch update, ETL).
- API pública contratada (contract-first — `governanca-de-contratos-de-api`).

**Warm-path (Tier 2)** — 1 revisor humano + auto-checks obrigatórios:
- `features/` de produto principal.
- `dashboard/`, `admin/`.
- Integrações críticas (Stripe, GHL, provedor de LLM).
- Modelos ML em produção (ver `mlops-em-producao`).

**Cold-path (Tier 3)** — auto-checks + revisão opcional:
- Docs.
- Testes que testam apenas o código do PR.
- Scripts internos / makefiles.
- Configuração de dev / notebook.
- Refatoração puramente mecânica (rename, extract) validada por diff-cover.

### Passo 2 — Heurística de triagem por PR

Score de risco = soma dos pesos abaixo:

| Sinal | Peso |
|---|---|
| Toca módulo Tier 1 | +5 |
| Toca módulo Tier 2 | +2 |
| Toca módulo Tier 3 | 0 |
| LOC > 400 (excluindo lock files) | +3 |
| Toca > 15 arquivos | +2 |
| Toca ≥ 1 migration | +4 |
| Toca ≥ 1 handler HTTP público | +3 |
| Toca `Dockerfile` / infra | +2 |
| Autor tem <3 meses no time | +1 |
| PR é `Draft` de exploração | -5 |
| PR é auto-gerado (dependabot, autofix) | -3 |

**Escala:**
- **Score ≥ 8** → 2 revisores humanos, um deles CODEOWNER do módulo Tier 1 tocado.
- **Score 3-7** → 1 revisor humano + auto-checks OK.
- **Score ≤ 2** → auto-checks OK, merge sem review humano permitido (opcional).

### Passo 3 — Gates automáticos por tier

**Tier 1 hot-path — gate:**
- Cobertura de testes ≥ 85% no módulo tocado.
- `coderabbit-review` sem findings de severity ≥ warning.
- Contract test passa (schemathesis se API).
- Security scan (SAST) sem finding new critical.
- Manual sign-off registrado.

**Tier 2 warm-path — gate:**
- Cobertura ≥ 70%.
- CodeRabbit sem findings de severity critical.
- Lint + typecheck limpos.

**Tier 3 cold-path — gate:**
- Lint + typecheck limpos.
- Build passa.

### Passo 4 — Regras de revisor

**Quem pode ser revisor de Tier 1:**
- CODEOWNER do módulo, OU
- Engenheiro com histórico de ≥ 20 PRs mergeados no módulo nos últimos 6 meses.
- **NÃO pode**: autor do PR (obviamente), autor do commit anterior no mesmo módulo (evita pair-review espelhado sem par).

**Quem pode ser revisor de Tier 2:**
- Qualquer engenheiro sênior/staff do time.

**Quem pode ser revisor de Tier 3:**
- Qualquer engenheiro.

**Time-to-review SLA:**
- Tier 1: primeiro reviewer olha em ≤ 4h úteis.
- Tier 2: ≤ 24h úteis.
- Tier 3: ≤ 48h úteis.

## Templates

**`.github/CODEOWNERS`:**

```
# Tier 1 (hot-path)
/payment/       @dara @gage @architect
/auth/          @architect @gage
/db/migrations/ @dara
/security/      @egide-team

# Tier 2 (warm-path)
/features/      @dev-team
/dashboard/     @dev-team

# Tier 3 (cold-path)
/docs/          @caliope-team
/scripts/       @gage
```

**Bot de triagem no PR (comment automático):**

```
[revisao-de-codigo-priorizada]
Score de risco: 9 (hot-path)
Módulos tocados: payment/ (Tier 1), db/migrations/ (Tier 1)
Revisores requeridos: 2 (mínimo 1 CODEOWNER de payment/)
SLA de primeira revisão: 4h úteis
Auto-checks: 5/5 passing ✓
```

## Anti-padrões

- Política "todo PR = 2 revisores" — todos revisam superficialmente para vazar a fila. Piora qualidade.
- Política "só quem escreveu revisa" — hot-path sem review externa é bug time-bomb.
- Auto-merge em Tier 1 baseado só em CodeRabbit — auto-check não substitui olho humano em código sensível.
- Reviewer que aprova sem ler ("LGTM") em Tier 1 — se acontecer, retira permissão de reviewer temporariamente.
- Zero CODEOWNERS em repo com mais de 3 devs — perde rastreio de responsabilidade.

## Cross-links

- Prometeu → `coderabbit-review` (executor automático que roda em todos os tiers).
- Prometeu → `qa-e-quality-gates` (quality gates que este tier exige).
- Prometeu → `spec-build-review` (pipeline maior, esta é a política de review dentro dele).
- Prometeu → `debugging-por-council-e-verification-loop` (Council de 3 subagentes para decisão de fronteira, tática interna).
- Égide → `devsecops-sast-dast-em-ci` (SAST gate de Tier 1).

---

Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B03/engineering.
