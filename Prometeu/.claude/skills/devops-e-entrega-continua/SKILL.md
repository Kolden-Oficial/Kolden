---
name: devops-e-entrega-continua
description: Use ao projetar pipeline de CI/CD, escrever infraestrutura como código (Docker/Kubernetes/deploy), instrumentar observabilidade (logs/métricas/traces/alertas) ou destravar erro de build/compilação por stack. Acione quando tocar `.github/`, `Dockerfile`, manifests k8s, ou quando um build/deploy quebrar e precisar de triagem. Cobre o conhecimento de entrega contínua; a AUTORIDADE de push/PR/MCP/pipeline continua exclusiva do `@devops` (Gage) — esta habilidade informa, não autoriza.
grounding_required: false
categoria_art_iv: MCP-nativo
squads_consumidores: [Prometeu-interno]
---

# DevOps & Entrega Contínua

Disciplina de **levar código a produção com segurança e visibilidade**: pipeline que
falha cedo e barato, infra declarada em código, e sistema observável o suficiente para
saber o que quebrou antes do usuário avisar. No AIOX, a execução de `git push`, `gh pr`,
gestão de MCP e pipeline é **exclusiva do `@devops`** — aqui está o *como*, não a chave.

## 1. Pipeline de CI/CD — falhe cedo, em camadas
Ordene os gates do mais rápido/barato ao mais lento/caro, parando no primeiro vermelho:
1. **Lint + format** (segundos) → 2. **Typecheck** → 3. **Testes unitários** →
4. **Build** → 5. **Testes de integração/e2e** → 6. **Scan de segurança** → 7. **Deploy**.
- **Quality gate pré-push** (espelha o CLAUDE.md do Prometeu): `lint` + `typecheck` +
  `test` verdes antes de qualquer push. CI repete o gate — confiança não substitui prova.
- **Build determinístico:** lockfile commitado, versões pinadas, sem `latest`. O mesmo
  commit produz o mesmo artefato.
- **Fail fast, cache inteligente:** cache de dependências entre runs; jobs independentes
  em paralelo; `fail-fast` no que é pré-requisito, paralelo no que não é.
- **Semver via commits convencionais:** `feat`→minor, `fix`→patch, `BREAKING CHANGE`→major.
  Release automatizado lê o histórico convencional (ver `padroes-de-engenharia-idiomatica`).

## 2. Infra como código (IaC) — nada de "configurei na mão"
- **Imagem Docker enxuta:** multi-stage build (builder pesado → runtime mínimo), usuário
  não-root, `.dockerignore`, camadas ordenadas da menos à mais volátil (deps antes do
  código) para aproveitar cache. Uma imagem = um processo.
- **Kubernetes declarativo:** requests/limits sempre definidos; liveness/readiness probes;
  config via ConfigMap/Secret (nunca hardcoded na imagem); rollout com `maxUnavailable`/
  `maxSurge` para deploy sem downtime.
- **Estratégia de deploy explícita:** rolling (padrão), blue-green (troca atômica) ou
  canary (fração do tráfego primeiro) — escolha por risco da mudança, não por hábito.
- **Segredos só via cofre:** no Kolden, **Infisical é obrigatório** — nenhuma credencial
  em texto puro em Dockerfile, manifest, env commitado ou pipeline. Injete em runtime.
- **Tudo versionado e reproduzível:** ambiente nasce do repositório, não de um snowflake.

## 3. Observabilidade — os três pilares + alerta acionável
- **Logs estruturados** (JSON, com correlação/trace-id), não `print` solto. Nível certo:
  erro é erro, não info.
- **Métricas** dos quatro sinais dourados: latência, tráfego, erros, saturação. Exponha
  para scraping (ex.: Prometheus); no Kolden, Sentry para erros de aplicação.
- **Traces** para seguir uma requisição cruzando serviços — indispensável em sistema
  distribuído para achar o gargalo.
- **Alerta acionável:** alerte sintoma que afeta usuário (SLO violado), não cada flutuação.
  Alerta que ninguém age vira ruído e treina o time a ignorar.

## 4. Triagem de erro de build/deploy
Quando um build quebra, leia o erro de baixo para cima (a causa raiz costuma estar acima
do ruído de cascata): identifique a stack (compilação? dependência? versão? ambiente?),
reproduza local com o mesmo lockfile/imagem, e conserte a causa — não silencie o sintoma
(`|| true`, retry cego, pin para versão velha sem entender). Build error tem causa
determinística; ache-a.

## Gate de saída
- Pipeline com gates ordenados e quality gate (lint+typecheck+test) bloqueando push.
- Infra declarada em código, imagem enxuta non-root, segredos via Infisical.
- Os três pilares de observabilidade presentes; alertas atrelados a SLO.
- Operações de autoridade (push/PR/MCP/release) roteadas ao `@devops`.

## Quando NÃO usar
- Push, PR, merge, configurar MCP ou disparar release → delegue ao `@devops` (autoridade
  exclusiva, `agent-authority.md`). Esta habilidade prepara; ela não executa o ato.

---
*Fonte: affaan-m/everything-claude-code@2bc924f (`skills/{docker,kubernetes,deployment}-patterns/`, `skills/{error-handling,latency-critical-systems}/`, `agents/{build-error-resolver,go-build-resolver,rust-build-resolver,...}.md`, `skills/{github-ops,git-workflow}/`, `hooks/hooks.json` — observe-runner/governance-capture) — licença MIT. Princípios (G16/G14/G34/G9) extraídos e reescritos em PT-BR; sem cópia literal. Camada de autoridade ajustada à matriz `@devops` do AIOX e ao Infisical-by-default do Kolden.*
