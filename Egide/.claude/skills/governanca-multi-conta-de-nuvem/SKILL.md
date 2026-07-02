---
name: governanca-multi-conta-de-nuvem
description: >-
  Use quando precisar governar múltiplas contas de nuvem (AWS Organizations, Azure
  Management Groups, GCP Organization) com controles preventivos organização-wide:
  Service Control Policies (SCPs), Azure Policy Initiatives, Organization Policy
  Constraints, landing zones (Control Tower, Azure Landing Zones, Cloud Foundation
  Toolkit) e policy-as-code multi-cloud (OPA/Rego, Sentinel, Cloud Custodian, Checkov,
  tfsec, Terrascan). Eixo de governança hierárquica da Égide — controla a estrutura
  acima da conta isolada, complementando `seguranca-de-cloud-multi-provider` (que cobre
  postura DENTRO da conta — CSPM, CIS, CloudTrail). Use também para desenhar landing
  zones, definir guardrails por OU/MG/Folder, automatizar drift detection e blindar
  pipelines de IaC com gates de policy.
domain: ciberseguranca
subdomain: cloud-governance
tags: [aws-organizations, scp, azure-management-groups, azure-policy, gcp-organization-policy, landing-zones, policy-as-code, opa, sentinel, cloud-custodian, checkov, control-tower, iam-hierarchico, vpc-service-controls, drift-detection]
---

# Governança Multi-Conta de Nuvem

> Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT © 2025 AgentLand Contributors)

> Governança multi-conta é **estrutural**, não pontual: erra-se uma vez, polui-se toda a
> hierarquia. SCPs e Organization Policies **não substituem IAM** — são camada extra de
> negação. Toda política nova entra em modo `audit`/`dry-run` antes de `enforce` para não
> derrubar carga legítima. Cuidado com SCPs que bloqueiam o próprio time de segurança ou
> as funções de break-glass: exceções precisam ser nominais, auditadas e versionadas.
> Esta habilidade governa a hierarquia **acima** da conta; postura **dentro** da conta
> (CSPM, CIS benchmark, CloudTrail, baseline por workload) continua em
> `seguranca-de-cloud-multi-provider`.

## O que é

Governança multi-conta resolve um problema que o CSPM de conta isolada não resolve: como
garantir que **toda conta nova já nasça com guardrails**, que ninguém crie recurso fora
das regiões aprovadas, que ninguém desligue o logging central, que IaC quebre o build
antes de provisionar algo inseguro. É **defense-in-depth na hierarquia organizacional** —
o controle vive em Root/OU/MG/Folder, não na conta. A distinção que orienta toda esta
habilidade:

- **Controle preventivo** (esta skill) — policy-as-code que **bloqueia** a ação antes
  dela acontecer. SCP, Azure Policy `deny`, Organization Policy `constraint`, Terraform
  policy gate. Custo: configuração; ganho: a violação nunca existe.
- **Controle detectivo** (`seguranca-de-cloud-multi-provider`) — CSPM/CloudTrail/Defender
  que **detecta** a violação depois que ela aconteceu. Custo: ruído + MTTR; ganho:
  cobertura ampla.

As duas camadas se complementam. Esta skill cobre a primeira.

## Método

### 1. AWS: Organizations + Service Control Policies (SCPs)

**Hierarquia**: `Root` → `Organizational Unit (OU)` → `Account` → `IAM` (na conta).
SCPs aplicam **somente no nível organizacional** — são "deny-list" que define o **teto
de permissão** que qualquer principal da conta pode ter, mesmo administrador. Não
concedem permissão; restringem.

- **Padrões de SCP comuns**:
  - `Deny region` fora de uma lista aprovada (compliance e custo).
  - `Deny criação de IAM user` — força acesso via Identity Center (SSO) com federação.
  - `Deny disable de CloudTrail / GuardDuty / Config / Security Hub` — protege a
    telemetria central de ser desligada por conta-filha.
  - `Deny abertura pública de S3 bucket` (s3:PutBucketPublicAccessBlock).
  - `Deny criação de root access keys`.
  - Exceções por **tag** (`aws:PrincipalTag/break-glass=true`) para funções de emergência
    nominadas e versionadas.
- **Estrutura de OUs típica**: `Security`, `Infrastructure`, `Workloads/{Prod,NonProd}`,
  `Sandbox`, `Suspended`. SCPs mais restritivas em Sandbox e Workloads; Security e
  Infrastructure recebem SCPs específicas (ex.: só conta de auditoria pode ler logs
  agregados).
- **Landing zone**: **AWS Control Tower** provisiona Organizations + Identity Center +
  log archive + audit account + guardrails (preventivos via SCP + detectivos via Config
  Rules) num blueprint coerente. Para casos fora do Control Tower, **Customizations for
  Control Tower (CfCT)** ou **Account Factory for Terraform (AFT)**.
- **Identidade central**: **AWS IAM Identity Center** (antigo SSO) federa com IdP
  externo (Entra ID, Okta, Google Workspace). Cross-account fica em **assume role**, não
  em IAM user com chave longa.
- **Credenciais**: nada de chave longa em texto. Para automação, **roles** com OIDC
  federation (GitHub Actions, GitLab) ou Secrets Manager + rotação. Segredos sensíveis
  passam por **Infisical**.

### 2. Azure: Management Groups + Azure Policy

**Hierarquia**: `Tenant Root Group` → `Management Group (MG)` → `Subscription` →
`Resource Group` → `Resource`. Policy aplicada em nível mais alto é herdada pelos
descendentes; assignments mais específicos podem **incluir exceções controladas**
(`notScopes`).

- **Modos de Azure Policy**: `audit` (registra não-conformidade), `deny` (bloqueia
  criação/alteração), `modify` (corrige tags/properties automaticamente),
  `deployIfNotExists` (provisiona o que falta — diagnostic settings, Defender plan),
  `auditIfNotExists`.
- **Initiatives** (policy sets): empacotam dezenas de policies sob um único assignment.
  Iniciativas built-in essenciais: `Azure Security Benchmark`, `CIS Microsoft Azure
  Foundations Benchmark`, `NIST SP 800-53`, `ISO 27001`. Custom initiatives para regras
  Kolden (ex.: tag obrigatória `owner`/`cost-center`, restrição de SKU).
- **Estrutura de MG típica**: `Tenant Root` → `Platform` (identity, management,
  connectivity, security) + `Landing Zones` (corp, online) + `Sandbox` + `Decommissioned`.
  Modelo de referência **Microsoft Cloud Adoption Framework (CAF) — Enterprise Scale**.
- **Landing zone**: **Azure Landing Zones (Enterprise Scale)** via Bicep ou Terraform
  AVM (Azure Verified Modules) entrega a árvore de MG, policies, RBAC, conectividade
  hub-spoke e Defender for Cloud habilitado.
- **Azure Lighthouse**: para gestão delegada multi-tenant (MSP/agência operando contas
  de clientes) sem precisar de identidade convidada em cada tenant.
- **Defender for Cloud**: ativado por policy `deployIfNotExists` em todo MG — é o CSPM,
  fica em `seguranca-de-cloud-multi-provider` no que toca à postura por recurso.

### 3. GCP: Resource Hierarchy + Organization Policy + IAM hierárquico

**Hierarquia**: `Organization` → `Folder` (até 10 níveis) → `Project` → `Resource`.
Policies e IAM são **herdados** descendo a árvore.

- **Organization Policy constraints**: definem regras booleanas (`constraint =
  enforced`) ou listas (`allow`/`deny`) sobre o que pode existir na hierarquia. Exemplos
  essenciais:
  - `compute.disableSerialPortAccess` (boolean: true).
  - `gcp.resourceLocations` (list: `in:us-locations`, `in:eu-locations`).
  - `iam.disableServiceAccountKeyCreation` (chaves de SA são vetor crítico).
  - `storage.publicAccessPrevention` (impede bucket público).
  - `compute.requireOsLogin`.
- **Custom Constraints** (CEL) para regras Kolden que built-in não cobre.
- **IAM herança vs deny rules**: `allow` herda automaticamente; **IAM Deny policies**
  (GA) bloqueiam permissões independentemente de `allow` herdado — useful para revogar
  ações sensíveis (ex.: `iam.serviceAccountKeys.create`) em toda a árvore.
- **VPC Service Controls**: cria **perímetro de serviço** em torno de projetos
  sensíveis (BigQuery, Cloud Storage, Pub/Sub) bloqueando exfiltração para fora do
  perímetro mesmo com credencial válida. Modo `dry-run` antes de `enforced` é
  obrigatório — VPC-SC sem dry-run quebra serviços legítimos.
- **Security Command Center (SCC)**: CSPM/SIEM no nível de Organização — fica em
  `seguranca-de-cloud-multi-provider` para a parte de findings.
- **Landing zone**: **Cloud Foundation Toolkit (CFT)** + **Terraform Example
  Foundation** entrega Folder structure, Org Policies, log sink central, billing alerts,
  shared VPC e baseline de IAM.

### 4. Policy-as-code: gate cross-cloud no pipeline de IaC

Policy organização-wide não substitui o gate no pipeline — a SCP bloqueia o `apply`,
mas o engenheiro só descobre depois. Falhar **no `plan`** é mais barato.

- **OPA (Open Policy Agent) + Rego**: agnóstico de nuvem; roda contra `terraform
  plan -out=plan.json` ou Kubernetes admission. **Conftest** é o front-end de linha de
  comando; **Gatekeeper** é o admission controller K8s.
- **HashiCorp Sentinel**: nativo do Terraform Cloud/Enterprise. Três níveis:
  `advisory` (avisa), `soft-mandatory` (override por humano autorizado),
  `hard-mandatory` (sem override).
- **AWS Cloud Custodian (c7n)**: DSL YAML; funciona em AWS/Azure/GCP. Executa runtime
  policies (Lambda agendado) corrigindo desvios — ponte entre preventivo e detectivo.
- **Scanners de IaC** (rodam em PR/CI):
  - **Checkov** — Terraform/CloudFormation/K8s/ARM/Bicep; cobertura ampla, baixo falso
    positivo.
  - **tfsec** (agora dentro do Trivy) — Terraform focado.
  - **Terrascan** — Rego sob o capô; multi-IaC.
  - **KICS** — multi-IaC (Checkmarx).
- **Pipeline de referência** (CI/CD gate):
  1. `terraform fmt -check` + `terraform validate`.
  2. `terraform plan -out=plan.bin && terraform show -json plan.bin > plan.json`.
  3. `checkov -f plan.json --framework terraform_plan` (soft-fail em achados informativos).
  4. `conftest test plan.json` contra políticas Rego internas (hard-fail).
  5. `terraform apply` só executa após aprovação humana + todos os gates verdes.
- **Princípio**: **dry-run primeiro, enforce depois**. Toda política nova roda em modo
  `audit` por uma janela observada (mín. uma sprint) antes de virar `deny`.

### 5. Landing zones: nasce blindado, não blindado depois

Provisionar conta nova manualmente garante drift e esquecimento. Landing zone é o
**template de conta** com guardrails já aplicados no instante zero.

- **AWS Control Tower / AFT** — Organizations + Identity Center + log archive + audit +
  guardrails. Account Factory provisiona contas novas via pull request.
- **Azure Landing Zones (Enterprise Scale)** — Bicep ou Terraform; entrega MG tree,
  policies, RBAC, conectividade.
- **GCP Cloud Foundation Toolkit (CFT) + Terraform Example Foundation** — Folder
  structure, Org Policies, log sink, shared VPC.
- **Princípio Kolden**: nenhuma conta de nuvem nasce fora da landing zone. Conta nova =
  pull request no repositório de IaC da landing zone, aprovado pela Égide.

### 6. Governança contínua: drift, métricas, exceções

A landing zone aplica o estado inicial; o tempo erode. Sem instrumentação, a entropia
vence.

- **Drift detection**: AWS Config drift no Control Tower; Azure Policy compliance
  state; GCP Asset Inventory + Recommender. Cross-cloud: Cloud Custodian + dashboard
  unificado.
- **Métricas mínimas**:
  - **% de contas com baseline aplicado** (cobertura da landing zone).
  - **% de OUs/MGs/Folders cobertos por SCP/Policy/Constraint** (heatmap).
  - **MTTD** (mean time to detect) de violação de policy.
  - **MTTR** (mean time to remediate) — auto-remediação reduz ambos.
  - **Número de exceções nominais ativas** (deve cair com o tempo, não crescer).
- **Exceções controladas**: toda exceção a uma policy vive em arquivo versionado, com
  dono, justificativa, escopo (recurso/tag/conta específica) e **data de expiração**.
  Sem expiração, vira dívida silenciosa.
- **Auditoria periódica**: revisão trimestral do conjunto de SCPs/Policies/Constraints
  contra benchmarks (CIS Foundations, NIST 800-53, ISO 27001) e contra a realidade da
  operação (policy que nunca dispara é candidata a remover; policy que dispara demais é
  candidata a refatorar).

## Anti-padrões

- **Conta única "tudo dentro"** — impossível segmentar blast radius; toda violação
  contamina prod, dev e segurança ao mesmo tempo.
- **SCP/Policy que bloqueia o próprio time de segurança** — sem exceção nominal para
  break-glass e auditoria, o controle vira tiro no pé na primeira emergência.
- **Policy-as-code direto em `deny`/`enforce`** — sem janela de `audit`/`dry-run` antes,
  quebra carga legítima e queima a credibilidade do programa de governança.
- **IAM user de longa duração para automação** — sempre OIDC federation com role ou
  segredo rotacionado via Infisical.
- **Landing zone "uma vez e esquece"** — sem GitOps no template e sem drift detection,
  contas envelhecem em direções diferentes.
- **Exceção sem data de expiração** — vira norma; trate exceção como issue com SLA.
- **Confiar só em preventivo OU só em detectivo** — preventivo bloqueia o conhecido;
  detectivo pega o desconhecido. Os dois operam juntos.

## Entrega

Plano de governança multi-conta: desenho da árvore (OU/MG/Folder) + escolha de landing
zone (Control Tower / Azure LZ / CFT) + catálogo inicial de SCPs/Policies/Constraints
faseado (`audit` → `enforce`) + integração de policy-as-code no pipeline de IaC
(scanner + gate Rego/Sentinel) + métricas de cobertura e drift + processo de exceção
versionada com expiração. Handoff: postura dentro da conta vai para
`seguranca-de-cloud-multi-provider`; identidade central (SSO, federação) para
`gestao-de-identidade-e-acesso-iam`; segredos para a regra Infisical.

## Ferramentas de referência (defensivas)

AWS Organizations, Service Control Policies, AWS Control Tower, Customizations for
Control Tower (CfCT), Account Factory for Terraform (AFT), IAM Identity Center; Azure
Management Groups, Azure Policy, Azure Landing Zones (Enterprise Scale), Bicep, Azure
Verified Modules, Azure Lighthouse, CAF; GCP Resource Manager, Organization Policy
Service, Custom Constraints (CEL), IAM Deny policies, VPC Service Controls, Cloud
Foundation Toolkit, Terraform Example Foundation; OPA + Rego, Conftest, Gatekeeper,
HashiCorp Sentinel, AWS Cloud Custodian (c7n), Checkov, tfsec/Trivy, Terrascan, KICS.
Benchmarks: CIS AWS/Azure/GCP Foundations, NIST SP 800-53, ISO 27001. Segredos:
Infisical.

## Incremental (não nesta leva)

FinOps multi-conta (allocation por tag, budgets cross-account), Kubernetes admission
control em cluster multi-tenant (vai para `seguranca-de-containers-e-kubernetes`),
delegação fina via Service Control Policies condicionais por sessão, e modelo de
governança para edge accounts (Outposts/Stack HCI/Anthos) ficam adiados.

## Herança histórica

**AWS Well-Architected + Control Tower team** (AWS, 2018+) — desenharam o modelo de landing zone opinionativa (Control Tower, 2019) e o blueprint de contas por OU; consolidaram a doutrina "conta nova nasce com guardrail, não com dívida". Referência: `docs.aws.amazon.com/controltower/`.

**Microsoft Cloud Adoption Framework — Enterprise Scale team** (Microsoft, 2019+) — codificaram a arquitetura de referência **Azure Landing Zones** com hierarquia MG opinada (`Platform`, `Landing Zones`, `Sandbox`, `Decommissioned`) e integrou o Defender for Cloud como CSPM padrão.

**Google Cloud Adoption Framework + Cloud Foundation Toolkit team** (Google, 2019+) — publicaram o CFT e a Terraform Example Foundation que formalizam Folder/Project + Organization Policy hierárquica como padrão GCP.

**Torin Sandall e Tim Hinrichs (Styra)** — cocriadores do **Open Policy Agent (OPA, 2016)** e da linguagem **Rego**, adotados pela CNCF em 2018 (graduação 2021); base do padrão policy-as-code cross-cloud da seção 4.

**Frameworks canônicos herdados**:
- **AWS Well-Architected Framework — Security Pillar** (princípios de guardrail preventivo).
- **Microsoft Cloud Adoption Framework (CAF) — Enterprise Scale** (hierarquia MG opinada).
- **Google Cloud Adoption Framework** (Folder + Org Policy hierárquica).
- **CIS Foundations Benchmark** (AWS v5, Azure v4, GCP v4) e **NIST SP 800-53** (control mapping) — as réguas que initiatives e SCPs implementam.
- **OPA/Rego** (CNCF) — linguagem canônica de policy-as-code multi-cloud.

---
*Fonte: `msitarzewski/agency-agents@a597cb6` (MIT © 2025 AgentLand Contributors), cluster
G21 — governança multi-conta (padrões AWS Organizations/SCPs, Azure MG/Policy, GCP
Organization Policy, landing zones, policy-as-code). Método adaptado e reescrito em
PT-BR; nenhum código importado.*
