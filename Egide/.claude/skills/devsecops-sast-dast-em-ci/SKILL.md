---
name: devsecops-sast-dast-em-ci
description: >-
  Use quando for embutir segurança no pipeline de CI/CD — escolher e ordenar os
  scanners (SAST, DAST, SCA, secret-scan, IaC), definir gates de build por
  severidade, calibrar falso-positivo, e desenhar o fluxo shift-left sem travar a
  entrega. É o eixo DevSecOps da Égide e cruza com o Prometeu (eng/spec-driven).
  Defensivo e de processo: ensina a montar o pipeline e os gates, não a atacar.
domain: ciberseguranca
subdomain: devsecops
tags: [devsecops, sast, dast, sca, secret-scan, iac, cicd, shift-left, gate]
---

# DevSecOps — SAST/DAST em CI

> A meta é **shift-left**: achar a falha o mais cedo e barato possível, sem
> transformar o pipeline num portão que ninguém consegue passar. O risco
> recorrente é afogar o time em ruído (falso-positivo) até desligarem o gate.
> Calibrar é parte do trabalho.

## Os scanners e onde cada um entra

Cada classe de scanner vê uma coisa; defesa em profundidade usa vários em
camadas, do mais barato/cedo ao mais caro/tarde:

- **Secret scanning** — segredo commitado (chave, token, senha). Roda em
  pre-commit **e** em CI sobre o diff, com histórico. O mais barato e o de maior
  retorno. Na Kolden, segredo vai sempre ao Infisical (ver `infisical-padrao`);
  achado bloqueia e dispara rotação.
- **SCA / dependências + SBOM** — vulnerabilidade em biblioteca de terceiro
  (cruza OWASP A06 e supply-chain). Gera SBOM e cruza com bases de CVE. Roda em
  cada build; alimenta a triagem de `gestao-de-vulnerabilidades-priorizacao`.
- **SAST (estático)** — analisa o código-fonte sem rodar; pega injeção, cripto
  fraca, deserialização. Cedo no pipeline. Tende a falso-positivo — calibrar
  regras por linguagem/projeto.
- **IaC scanning** — má configuração em Terraform/K8s/Docker/cloud (bucket
  aberto, sem cifragem, privilégio excessivo) antes do deploy.
- **DAST (dinâmico)** — testa a app rodando em ambiente de teste; pega o que só
  aparece em runtime (config, auth, headers). Mais tarde no pipeline, em ambiente
  efêmero.
- **Container/imagem** — scan da imagem (CVE de OS + libs) antes do push ao
  registry.

## Desenho do pipeline (ordem e gates)

1. **Pre-commit / IDE** — secret-scan + lint de segurança rápido (feedback em
   segundos).
2. **CI no PR** — secret-scan (diff+histórico) + SCA + SAST + IaC. *Gate de PR.*
3. **Build** — scan de imagem de container; gerar e arquivar SBOM.
4. **Staging** — DAST em ambiente efêmero contra a app de pé.
5. **Pós-deploy** — monitoria/observabilidade contínua.

**Gate por severidade, não tudo-ou-nada**: quebrar o build em achado
**novo** de severidade alta/crítica (e qualquer segredo); registrar e enfileirar
os de menor severidade sem travar. Diferenciar **achado novo** (introduzido no
diff) de dívida pré-existente evita parar a esteira por backlog herdado.

## Calibração de falso-positivo (faz ou quebra)

- Baseline inicial: suprimir a dívida existente, gate só sobre o **delta**.
- Regras afinadas por linguagem/framework; desligar checagem irrelevante ao stack.
- Triagem com supressão **rastreável** (com justificativa e validade), nunca
  ignore cego.
- Medir taxa de falso-positivo por scanner; scanner ruidoso demais perde a
  confiança do time e é desligado — pior que não ter.

### OIDC federation runner→cloud (sem credenciais de longa vida)

> _Seção absorvida de github.com/msitarzewski/agency-agents@a597cb6 (G15, MIT)._

**Problema:** segredos de cloud no CI (`AWS_ACCESS_KEY_ID`, JSON de service
account do GCP, `AZURE_CLIENT_SECRET`) são alvo primário de exfiltração e a
rotina de rotação manual costuma falhar. A federação OIDC elimina credencial
persistente — o runner emite um JWT assinado pelo seu OIDC issuer e a cloud
troca esse JWT por credencial temporária (STS), válida por minutos.

**Padrões por cloud (GitHub Actions como runner):**

- **AWS (via STS `AssumeRoleWithWebIdentity`):**
  1. Na AWS, criar um OIDC provider apontando para
     `https://token.actions.githubusercontent.com`.
  2. Criar uma role IAM com `Principal.Federated` = esse OIDC provider e
     `Condition.StringEquals` em `token.actions.githubusercontent.com:sub`
     restringindo a `repo:OWNER/REPO:environment:NAME` ou
     `:ref:refs/heads/main`.
  3. No workflow, usar `aws-actions/configure-aws-credentials@v4` com
     `role-to-assume: arn:aws:iam::ACCT:role/ROLE_NAME` (sem `AWS_ACCESS_KEY`).
  4. A trust policy **precisa** restringir por repo + branch/environment — sem
     isso, qualquer fork pode assumir a role.

- **Azure (Workload Identity Federation):**
  1. Criar App Registration + federated credential com issuer
     `https://token.actions.githubusercontent.com` e subject
     `repo:OWNER/REPO:environment:NAME`.
  2. No workflow, `azure/login@v2` com `client-id`, `tenant-id` e
     `subscription-id`.
  3. Subject string-match **exato** — não usar wildcard.

- **GCP (Workload Identity Federation):**
  1. Criar Workload Identity Pool + Provider apontando para o OIDC do GitHub.
  2. Criar service account e permitir o Pool a impersonar via
     `roles/iam.workloadIdentityUser`.
  3. No workflow, `google-github-actions/auth@v2` com
     `workload_identity_provider` e `service_account`.
  4. Attribute condition em CEL limita por repo:
     `attribute.repository=='OWNER/REPO'`.

- **GitLab CI:** mesma lógica — o `CI_JOB_JWT_V2` é trocado por credencial
  temporária com setup análogo.

**Verificação no audit:**

- `grep` em `.github/workflows/*.yml` por `AWS_ACCESS_KEY_ID`,
  `AZURE_CLIENT_SECRET` ou `GOOGLE_CREDENTIALS` — qualquer match indica que o
  workflow **não** usa OIDC.
- Trust policy AWS sem `Condition.StringEquals`/`StringLike` em `:sub` é
  config inseguro.
- Duração da credencial temporária: ideal <1h, máximo 6h.

**Anti-padrões:**

- Trust policy OIDC sem condição em `:sub` (qualquer repo do GitHub pode
  assumir a role).
- Wildcard em subject (`repo:OWNER/*`) sem restrição por ref/environment.
- Manter access keys "de backup" em paralelo ao OIDC — pior dos dois mundos.
- Continuar com rotação manual quando o OIDC já estava disponível.
- Role com permissões amplas (`AdministratorAccess`) em vez de menor
  privilégio.

**Migração de access keys → OIDC (em produção):**

1. Identificar workflows que usam access keys (grep).
2. Criar role IAM nova com trust OIDC, paralela à atual.
3. Atualizar o workflow para usar `configure-aws-credentials` com OIDC.
4. Validar em PR/staging antes de produção.
5. Após N runs sem erro, deletar a access key antiga.
6. Auditar CloudTrail para confirmar **zero uso** da access key antes de
   deletar.

## Critérios de validação
- Secret-scan roda em pre-commit e em CI; achado bloqueia e dispara rotação.
- O gate quebra em achado novo alto/crítico, sem travar por dívida pré-existente.
- SBOM gerado e versionado a cada build.
- Falso-positivo é medido e a supressão é rastreável.
- DAST roda contra ambiente efêmero, não produção.
- Workflows de cloud usam OIDC federation (sem access keys de longa vida); trust
  policy restringe `:sub` por repo + branch/environment.

## Sobreposição resolvida
A **triagem** dos achados (CVSS/EPSS/SLA) é de `gestao-de-vulnerabilidades-
priorizacao`; aqui está só **como rodar os scanners no pipeline e gatear**. O
secret-scan resiliente a injeção em conteúdo de agente é de
`scanner-anti-injecao-resiliente` (vetor diferente: prompt, não credencial). Cruza
com o eixo de engenharia do Prometeu (que já opera coderabbit/SAST).

---
*Fonte: `mukul975/Anthropic-Cybersecurity-Skills@673da1f3` (Apache-2.0), cluster
G17 (DevSecOps — CI/CD security, SAST/DAST, IaC scanning, pipeline hardening,
~18 skills) com aporte de G26 (SBOM/supply-chain). Método extraído e reescrito em
PT-BR; nenhuma cópia literal.*
