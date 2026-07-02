---
name: seguranca-de-cloud-multi-provider
description: >-
  Use quando precisar auditar a postura de segurança de um ambiente de nuvem
  (AWS, Azure, GCP ou O365): caçar buckets/storage expostos publicamente, IAM/policies
  permissivos demais, falta de criptografia e logging, ou rodar um benchmark CIS de
  baseline. Também para detecção: anomalias em CloudTrail/Activity Logs, credenciais
  comprometidas, exfiltração de S3, cryptomining. Eixo novo de cloud-security da Égide —
  postura defensiva (CSPM + análise de log), nunca exploração ofensiva de nuvem alheia.
domain: ciberseguranca
subdomain: cloud-security
tags: [cloud, aws, azure, gcp, o365, cspm, cis-benchmark, cloudtrail, iam, prowler, scoutsuite]
---

# Segurança de Cloud Multi-Provider (AWS / Azure / GCP / O365)

> Escopo defensivo. Só rode auditoria/detecção em contas que você administra ou foi
> nominalmente autorizado a avaliar. Nunca use esta habilidade para enumerar ou explorar
> nuvem de terceiros. Remediação que tranca acesso público pode quebrar workloads legítimos
> (sites estáticos, CDN) — confirme o uso pretendido do recurso antes de aplicar bloqueio.

## O que é

A Égide nasceu ofensiva + AppSec + blue-team, sem trilha formal de nuvem. Esta habilidade abre
o eixo **CSPM (Cloud Security Posture Management)**: avaliar configuração contra baseline,
encontrar exposição e desvio, e detectar atividade anômala nos logs de plano de controle dos
três grandes provedores. Tudo via API/CLI **somente-leitura** primeiro; remediação é passo
separado e explícito.

## Método

### 1. Baseline por benchmark CIS (postura)
- Escolha a versão correta do **CIS Foundations Benchmark** por provedor (AWS v5, Azure v4, GCP v4)
  e o perfil (Nível 1 = higiene prática; Nível 2 = defesa em profundidade que pode reduzir função).
- Rode varredura automatizada somente-leitura com **Prowler** (`--compliance cis_5.0_aws` etc.) e/ou
  **ScoutSuite** (relatório HTML com risco). Áreas cobertas: IAM/MFA/root, logging (CloudTrail/Activity
  Log), monitoramento, rede (SG/NSG/firewall), storage e banco.
- Gere **score de conformidade por seção** e priorize: Nível 1 primeiro, depois Nível 2.

### 2. Exposição de storage (o vetor #1 de vazamento)
Para cada bucket/conta de storage:
- Cheque o **Block Public Access** no nível de conta E de bucket (no AWS, os quatro flags).
- Avalie ACLs procurando grants a `AllUsers`/`AuthenticatedUsers`, e policies com `Principal: "*"`
  sem condição (`aws:SourceVpce`/`aws:SourceIp`).
- Verifique **criptografia em repouso** (SSE-KMS preferível), **versionamento** e **access logging**.
- Use **IAM Access Analyzer** (AWS) / equivalentes para achar recursos compartilhados externamente.
- Azure: storage accounts com acesso anônimo a blob; GCP: buckets com `allUsers`/`allAuthenticatedUsers`.

### 3. Hardening de IAM/identidade de nuvem
- Aplique **menor privilégio**: policies escopadas, `permission boundaries`, remoção de permissões
  não usadas (Access Analyzer reporta). Elimine chaves de acesso de root e force MFA no root.
- Prefira **credenciais de curta duração** (roles assumidas) a access keys de longa vida.
- (Ver a habilidade `gestao-de-identidade-e-acesso-iam` para o aprofundamento de IAM/PAM/AD.)

### 4. Detecção em logs de plano de controle
- **AWS CloudTrail**: consuma `lookup_events`, construa baseline estatístico (por usuário, IP, event
  source, event name) e sinalize desvios — primeira chamada de API por usuário, mudança geográfica de
  IP, alta taxa de erro `AccessDenied` (recon), uso de APIs sensíveis (IAM/KMS/S3 policy). Pontue
  anomalia, não classifique como booleano cru.
- **Azure Activity Logs** / **GCP Cloud Audit Logs**: mesmo princípio de baselining + caça a
  living-off-the-cloud (uso de serviços legítimos para fins maliciosos).
- Cubra os cenários de maior valor: **credenciais comprometidas**, **escalonamento de privilégio em
  IAM**, **exfiltração de S3**, **cryptomining** (picos de compute), **abuso de service principal** (Azure).
- Onde houver serviço nativo, ligue-o: GuardDuty/Security Hub (AWS), Defender for Cloud/Sentinel
  (Azure), Security Command Center (GCP) — e centralize o alerta no SIEM.

### 5. Monitoramento contínuo (anti-drift)
- Não pare na auditoria pontual: habilite o padrão CIS no Security Hub/Azure Policy/SCC e agende
  reavaliação Prowler periódica para pegar **desvio de configuração** entre auditorias.

## Entrega
Relatório de postura: score CIS por seção + achados críticos (recurso, risco, remediação) +
inventário de exposição pública + lista priorizada de remediação por prazo (7/30/60/90 dias) +
regras de detecção recomendadas para o SIEM. Handoff: incidente confirmado → resposta a incidente
(`forense-digital-e-resposta-a-incidente`); IOC/atribuição → `inteligencia-de-ameacas-cti`.

## Ferramentas de referência (defensivas)
Prowler, ScoutSuite, CloudFox (enumeração de postura), AWS CLI/Access Analyzer/Security Hub,
Azure Policy/Defender, GCP Security Command Center, boto3 para baselining de CloudTrail.

## Incremental (não nesta leva)
SIEM de nuvem com Sentinel, AWS Config Rules detalhado, Nitro Enclaves e resposta a incidente
específica de nuvem ficam adiados — ver relatório de perda. A exploração ofensiva de nuvem (Pacu,
Stratus Red Team, CloudFox em modo ataque) é **barrada** (dual-use).

### Aprofundamento absorvido nesta consolidação: **Macie / DLP em nuvem**

DLP de nuvem detecta e classifica dado sensível em objeto de storage **antes** de virar
exposição — camada anterior ao "está público?" (que a seção 2 cobre).
- **AWS Macie**: classificação gerenciada de S3, detecta PII/PHI/credencial em objeto,
  gera *sensitive data discovery job* recorrente; integra com Security Hub. Regra: rode
  Macie em bucket com dado de negócio antes de habilitar `AllowedCredentials`.
- **Azure Purview / Microsoft Defender for Storage — sensitive data discovery**:
  equivalente para Blob Storage e Data Lake Gen2.
- **GCP Sensitive Data Protection (ex-DLP)**: `InfoTypes` para PII/PHI/segredo em GCS
  e BigQuery; `--info-types` com custom regex para dado da empresa.
- Padrão: rode DLP **antes** da auditoria de exposição; se dado sensível existe, o
  achado "público" sobe uma severidade. Alimenta o gate `escrita-segura-e-dlp` da Égide
  (denylist local) com o inventário de nuvem.

## Herança histórica

**AWS Well-Architected Framework — Security Pillar** (AWS, 2015+; principal editorial: Ben Potter) — base do modelo de responsabilidade compartilhada e da doutrina "menos-privilégio + tudo-loga" que a seção 3 aplica. Referência: `aws.amazon.com/architecture/well-architected/`.

**Rich Mogul** — cofundador da Cloud Security Alliance (CSA, 2009) e diretor de pesquisa em nuvem por mais de uma década; autor do *CSA Security Guidance v4* (2017), que consolidou o método de auditoria multi-provider por domínio (governança, arquitetura, dados, IAM, resposta).

**CIS Benchmarks Community** — comitê voluntário que mantém os **CIS Foundations Benchmark** (AWS v5, Azure v4, GCP v4), o baseline consensual de configuração que Prowler/ScoutSuite implementam.

**Frameworks canônicos herdados**:
- **CIS Foundations Benchmark** por provedor — a régua de conformidade da seção 1.
- **AWS Well-Architected Security Pillar** — os 8 princípios de projeto (identidade forte, tudo audita, defesa em camadas, dados criptografados, permissões mínimas, resposta rápida etc.).
- **Cloud Controls Matrix (CCM) v4 da CSA** — mapeamento cross-framework (ISO 27001, NIST 800-53, PCI-DSS) usado quando o cliente é regulado.
- **Model of Shared Responsibility** (AWS, 2011+) — cliente responde por "segurança **na** nuvem", provedor por "segurança **da** nuvem"; regra que define o escopo desta skill.

---
*Fonte: `mukul975/Anthropic-Cybersecurity-Skills@673da1f` (Apache-2.0), cluster G1 — cloud security
multi-provider (66 skills; representativas: `auditing-aws-s3-bucket-permissions`,
`auditing-cloud-with-cis-benchmarks`, `detecting-aws-cloudtrail-anomalies`,
`analyzing-azure-activity-logs-for-threats`, `auditing-gcp-iam-permissions`). Método extraído e
reescrito em PT-BR; só a camada defensiva; sem cópia literal; scripts ofensivos excluídos.*
