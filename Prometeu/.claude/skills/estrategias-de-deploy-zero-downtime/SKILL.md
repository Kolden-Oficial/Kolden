---
name: estrategias-de-deploy-zero-downtime
description: Use quando precisar decidir COMO fazer deploy de uma nova versão sem downtime — blue-green, canary, rolling, feature-flag toggle, shadow traffic. Cobre matriz de decisão por criticality/rollback-window/observability, ativação progressiva (5% → 25% → 50% → 100%), instrumentação de métricas por coorte, kill-switch por flag e cross-link com `slo-error-budget-burn-rate` para gatilhos de rollback automático. Dono&#58; @devops (Gage). Cross-link @qa para validar SLI/SLO durante ramp. Fronteira&#58; para MIGRAÇÃO de schema use `migracao-zero-downtime` (expand-contract). NÃO decide provider (AWS vs GCP vs on-prem) — isso é `topologias-de-inferencia-ml` ou @architect. NÃO configura CI/CD pipeline — isso é `devops-e-entrega-continua`.
---

# Estratégias de Deploy Zero-Downtime

## Quando invocar

Antes de qualquer release que toque produção — feature nova, refactor grande, mudança de infraestrutura, upgrade de dependência crítica. Pode ser invocada por:

- `@devops` planejando a estratégia de rollout no epic execution
- `@architect` desenhando a topologia deploy no início do projeto
- `@dev` (Dex) quando a story exige mudança de comportamento observável em produção
- `@qa` (Quinn) validando os gates de promoção entre estágios (canary → 25% → 100%)

## As 5 estratégias canônicas

### 1. Blue-Green

**Modelo:** dois ambientes idênticos (Blue = produção atual, Green = nova versão). Router (load balancer, DNS, Kubernetes service) alterna 100% do tráfego de Blue para Green num flip atômico.

**Quando usar:**
- Cutover de major version com breaking change não-negociável (migração de framework, refactor de core service)
- Rollback precisa ser <30s
- Custo de dobrar infra é aceitável (temporário, geralmente < 30min)

**Anti-padrão:** blue-green com banco compartilhado sem plano de compatibilidade schema — se Blue e Green rodam DDL incompatível, rollback quebra dados. Nesse caso, **exigir** `migracao-zero-downtime` primeiro.

**Gate:** contract test rodado contra Green **antes** do flip; se falhar, sequer promove.

### 2. Canary

**Modelo:** subconjunto do tráfego (5%) roteado para nova versão; observação; incremento (25% → 50% → 100%) por gate de SLI/SLO.

**Progressão default Kolden:**

| Estágio | Tráfego | Duração mínima | Gate |
|---|---|---|---|
| Canary | 5% | 15min | error rate ≤ baseline + 0.1pp, P99 ≤ baseline + 10% |
| Rampa 1 | 25% | 30min | burn rate ≤ 6× em janela 6h (ver `slo-error-budget-burn-rate`) |
| Rampa 2 | 50% | 60min | mesmos gates + zero SEV1 em 60min |
| Full | 100% | permanente | dashboard de saúde estável por 24h antes de deletar velha versão |

**Instrumentação obrigatória:**
- Label `version` em todo métrica (Prometheus/Datadog): permite comparar coortes
- Distributed trace com atributo `deployment_id`
- Log com campo estruturado `version`

**Kill-switch:** feature flag global em store rápido (Redis/LaunchDarkly) que force 0% em <5s.

### 3. Rolling Update

**Modelo:** substituir instâncias em lotes (2 de cada vez, por exemplo) até frota inteira estar em nova versão. Padrão de Kubernetes `RollingUpdate`.

**Quando usar:**
- Serviço stateless, backward-compat com clientes atuais garantida
- Não precisa de comparação A/B (mudança "obviamente correta": patch de segurança, hotfix)
- Custo de blue-green (dobrar infra) inaceitável

**Anti-padrão:** rolling com backward-compat quebrada — clientes falam com pod v2 e depois com pod v1 na mesma sessão. Solução: **feature flag** + **API versioning** explícito.

**Config canônica K8s:**
```yaml
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxSurge: 25%
    maxUnavailable: 0  # zero-downtime absoluto
```

### 4. Feature Flag Toggle

**Modelo:** código nova versão já em produção (deployed), mas comportamento gated por flag. Ativação = flag on; rollback = flag off. Deploy separa de release.

**Quando usar (default Kolden):** qualquer feature de produto observável pelo usuário. Habilita:
- Deploys sem risco (código dormant)
- A/B teste built-in (flag por user_id/segment)
- Kill-switch <1s (flag global off)
- Rollback sem redeploy

**Anti-padrão:** flags eternas. **Regra**: toda flag nasce com data de morte (ticket agendado). Auditoria mensal de flags > 90d.

**Cross-link `engenharia-de-prompts-versionada`:** flags também governam qual prompt/modelo LLM está ativo.

### 5. Shadow Traffic

**Modelo:** tráfego real duplicado — copia é enviada para nova versão em **modo mirror** (resposta descartada, apenas observada). Zero risco ao usuário.

**Quando usar:**
- Rewrite de sistema crítico (payment gateway, recomendador, motor de busca)
- Validar que nova versão dá resultado equivalente sob carga real
- Detectar regressão de latência/erro **antes** de qualquer usuário ser afetado

**Duração típica:** 3-7 dias de shadow antes de canary. Comparação automatizada de outputs (diff sampling).

**Custo:** duplica compute da nova versão; economizar não-duplicando storage (writes descartados).

## Matriz de decisão

```
| Critério                          | Blue-Green | Canary | Rolling | Feature Flag | Shadow |
|-----------------------------------|:----------:|:------:|:-------:|:------------:|:------:|
| Rollback <30s                     |     ✅     |   ✅   |    ⚠️   |      ✅      |   ✅   |
| Custo baixo de infra              |     ❌     |   ⚠️   |    ✅   |      ✅      |   ❌   |
| Comparação A/B em produção        |     ❌     |   ✅   |    ❌   |      ✅      |   ⚠️   |
| Backward-compat quebrada tolerada |     ✅     |   ❌   |    ❌   |      ❌      |   N/A  |
| Validação antes de qualquer usuário|    ❌     |   ❌   |    ❌   |      ❌      |   ✅   |
| Complexidade operacional          |    Média   |  Alta  |  Baixa  |     Baixa    |  Alta  |
```

**Default Kolden para SaaS:** feature flag + canary 5% → 25% → 100%, com blue-green reservado para cutover de major version e shadow reservado para rewrite de sistema crítico.

## Cohort/A-B testing (anexo REUSE — G12 do bucket B04)

Quando a nova versão é uma variante experimental (não apenas patch), a estratégia canary vira A-B test formal:

- **Coorte determinística por user_id hash** (garante que usuário sempre vê mesma variante)
- **Sample size mínimo** dado por skill `desenho-de-experimento-estatistico` (Metis) — poder estatístico ≥ 80%, α = 0.05
- **Métricas primária + guardrail**: primária mede impacto desejado; guardrail (P99, error rate, revenue) impede shipar variante que ganha em uma dimensão e perde em outra
- **Ponto de parada precoce**: alpha-spending Pocock ou O'Brien-Fleming; NÃO parar visualmente ao "atingir significância"

Cross-link `desenho-de-experimento-estatistico` (Metis) para o método estatístico; esta skill cuida apenas do transporte (roteamento de tráfego).

## Instrumentação mínima para promover estágios

Sem estas métricas, **NÃO promova**:

| Métrica | Fonte | Gate para promover |
|---|---|---|
| Error rate (5xx + business errors) | logs estruturados | Δ ≤ +0.1pp vs baseline |
| P95 latência | APM/traces | Δ ≤ +10% vs baseline |
| P99 latência | APM/traces | Δ ≤ +25% vs baseline |
| Throughput (req/s) | métricas ingress | Δ ≥ −5% vs baseline |
| CPU/memória por pod | container runtime | Δ ≤ +30% vs baseline |
| Business KPI (conversão, revenue) | evento analytics | flat ou melhor |

Se qualquer gate falhar em 15min de canary, **rollback automático** — não peça permissão.

## Rollback: os 3 tipos

1. **Instantâneo (flag off):** <1s. Preferido sempre que possível.
2. **Reroteamento (blue-green flip back):** <30s. Rede/DNS.
3. **Redeploy (rolling back para versão anterior):** 5-15min. Último recurso.

**Regra dura:** toda estratégia DEVE definir qual dos 3 usará **antes** do deploy — se descobrir isso durante a queima, já é tarde.

## Cross-links

- `migracao-zero-downtime` — schema evolui em paralelo ao deploy do código; sem expand-contract, deploy zero-downtime é ficção
- `slo-error-budget-burn-rate` — burn rate governa quando abortar canary
- `devops-e-entrega-continua` — pipeline que ENTREGA para essa estratégia
- `arquitetura-de-inferencia-llm-autonoma` — deploy de mudança em provider/prompt/modelo LLM se enquadra aqui
- `engenharia-de-prompts-versionada` — prompt deploy = feature flag por versão de prompt

## Herança histórica

**Jez Humble** ("Continuous Delivery", 2010): separação **deploy** vs **release** (feature flag = manifestação canônica). Deploys frequentes só são seguros quando desacoplados de exposição ao usuário.

**Adrian Cockcroft** (Netflix, ~2011-2015): canary + shadow traffic + chaos engineering como práticas complementares. "Everything fails all the time" — a estratégia de deploy PRESSUPÕE falha, não a evita.

**Charity Majors** (Honeycomb): observability-driven deploys — sem instrumentação por label `version`, canary é performance teatral. Deploy só é seguro quando você **consegue perguntar** ao sistema como a coorte v2 está indo.

**Kelsey Hightower** (Google Cloud): Kubernetes rolling update como estratégia default, mas com o alerta: "rolling não é canary — rolling assume que a mudança é segura, canary VALIDA que é".

## Anti-padrões

- ❌ Canary sem gate automatizado ("olho no dashboard" durante a rampa) — humano cansa, gate não
- ❌ Feature flag sem data de morte — vira débito técnico permanente
- ❌ Blue-green com banco compartilhado sem plano de schema compat — quebra rollback
- ❌ Rolling sem `maxUnavailable: 0` — janela de indisponibilidade parcial
- ❌ Shadow com side-effects (writes reais no banco de test) — corrompe dados
- ❌ Deploy sexta 17h antes de feriado — política, não técnica: só deploy quando a equipe está para observar

---
*Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B03/engineering.*
