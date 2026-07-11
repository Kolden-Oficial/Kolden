---
name: seguranca-de-containers-e-kubernetes
description: >-
  Use quando precisar endurecer ou auditar containers e clusters Kubernetes: hardening
  de Docker/daemon por CIS Benchmark, scanning de imagem (Trivy/Grype/kubesec), auditoria
  de RBAC do cluster (roles curinga, ClusterRoleBindings perigosos, abuso de service
  account), Pod Security Standards/Admission, network policies (Calico/Cilium), e detecção
  de container escape e drift em runtime (Falco). Eixo novo de container-security da Égide —
  postura defensiva e detecção, nunca quebra ofensiva de cluster alheio.
domain: ciberseguranca
subdomain: container-security
tags: [container, docker, kubernetes, k8s, rbac, pod-security, falco, trivy, calico, cis-benchmark, runtime]
tipo: skill
area: Egide
up: "[[Egide/_MOC-egide]]"
---

# Segurança de Containers e Kubernetes

> Escopo defensivo. Aplique somente em clusters/imagens que você opera ou foi autorizado a
> avaliar. Mudanças de RBAC, PSA e network policy podem derrubar workloads — teste em
> não-produção (audit/warn antes de enforce). Nunca use esta habilidade para escapar de
> container ou comprometer cluster de terceiro.

## O que é

Container e Kubernetes não estavam no roster da Égide. Esta habilidade cobre as quatro frentes
defensivas: **endurecer a imagem/host**, **auditar o controle de acesso do cluster**, **forçar
políticas de admissão e rede**, e **detectar abuso em runtime**. A ordem importa: reduza a
superfície de ataque antes de confiar em detecção.

## Método

### 1. Hardening de Docker e do host (CIS Docker Benchmark)
Princípios: **menor privilégio** (rodar como não-root, `drop ALL` de capabilities e adicionar só
as necessárias), **imutabilidade** (rootfs read-only, `tmpfs` para escrita), **minimalismo**
(base distroless/Alpine, multi-stage build, pin por digest), **isolamento** (seccomp,
AppArmor/SELinux), **auditabilidade** (content trust, log de atividade).
- Lint do Dockerfile com **Hadolint**; lint de imagem com **Dockle**.
- Avaliação do host/daemon com **docker-bench-security**; proteja `/var/run/docker.sock`, habilite
  TLS no daemon, restrinja comunicação inter-container e ajuste permissões do `daemon.json`.

### 2. Scanning de imagem e manifesto (shift-left)
- Escaneie imagens com **Trivy** ou **Grype** (CVEs em SO + dependências) — integre no CI/CD e
  falhe o build em severidade alta/crítica.
- Escaneie manifestos K8s com **kubesec** (score de risco por securityContext) e o registry com
  **Harbor**/scanner embutido. Prefira **base mínima distroless** para encolher a superfície.

### 3. Auditoria de RBAC do cluster
- Enumere ClusterRoles/Roles com **verbos/recursos curinga** (`*`), acesso a `secrets`, `pods/exec`,
  `pods/attach`, e verbos de escalonamento (`escalate`, `bind`, `impersonate`).
- Mapeie **ClusterRoleBindings perigosos** (cluster-admin amplo) e **service accounts** com mais
  poder que o necessário — caminho clássico de movimento lateral e privesc dentro do cluster.
- Ferramentas: `kubectl` + **rbac-tool**, **KubiScan**, **Kubeaudit**. Cruze achados com os audit
  logs do cluster para ver o que é de fato usado e podar o resto (menor privilégio).

### 4. Políticas de admissão e de rede
- **Pod Security Standards (PSS)** via **Pod Security Admission** (K8s 1.25+): rotule namespaces
  com `enforce/audit/warn` nos perfis `baseline` (bloqueia escalonamentos conhecidos: hostNetwork,
  hostPID, privileged, capabilities perigosas) e `restricted` (não-root, drop ALL, seccomp, rootfs
  read-only). Suba pelos modos `audit`→`warn`→`enforce` para não quebrar produção.
- **Network policies** default-deny com **Calico**/**Cilium**: negue tudo e libere só o tráfego
  pod-a-pod necessário — contém movimento lateral mesmo após comprometimento de um pod.
- Reforce com benchmark de cluster: **kube-bench** (CIS Kubernetes) e avaliação de **etcd**.

### 5. Detecção em runtime
- **Falco** (regras de runtime) para sinalizar **tentativas de container escape**, exec inesperado,
  montagem de paths sensíveis do host, e **drift** (binário que apareceu no container após o build —
  forte sinal de comprometimento, pois imagem deve ser imutável).
- Forense de container Docker quando houver incidente: inspeção de camadas, processos e artefatos do
  container suspeito (handoff para `forense-digital-e-resposta-a-incidente`).

## Entrega
Pacote defensivo: relatório de hardening (Dockerfile/host) + achados de RBAC priorizados +
manifesto de PSA e network policy default-deny + lista de CVEs de imagem por severidade + conjunto
de regras Falco recomendado. Handoff: escape/comprometimento confirmado → resposta a incidente;
CVE crítica de dependência → gestão de vulnerabilidade.

## Ferramentas de referência (defensivas)
Hadolint, Dockle, docker-bench-security, Trivy, Grype, kubesec, kube-bench, rbac-tool, KubiScan,
Kubeaudit, Falco, Calico/Cilium, Harbor, distroless.

## Incremental (não nesta leva)
Aqua/Sysdig comerciais, securing Helm chart deployments, registry hardening avançado e CIS de
cloud-managed K8s (EKS/GKE/AKS) específico ficam adiados — ver relatório de perda. Pentest de
Kubernetes e container escape ofensivo são **barrados** (dual-use).

### Aprofundamento absorvido nesta consolidação: **Falco + Tetragon (dupla eBPF de runtime)**

Falco cobre a família *system-call-based* de detecção em runtime; **Tetragon (Isovalent/Cilium,
2022+)** cobre a mesma família com **eBPF policy-as-code**, com vantagem de custo em cluster
grande e enforce em kernel (kill do processo antes do syscall completar).
- Rode Falco para a maior parte da frota (regras `k8s_audit`, `default_macros`, drift).
- Rode Tetragon quando precisar de **enforce em kernel** (não só alerta) ou quando o
  volume de syscalls do Falco custa caro; suas `TracingPolicy` são versionáveis por Git,
  encaixam no gitops do cluster.
- Correlacione ambos no mesmo SIEM; use o mesmo campo `container.image.repo_digest` como
  chave para deduplicar alerta.

## Herança histórica

**Liz Rice** — Chief Open Source Officer da Isovalent; autora de *Container Security: Fundamental Technology Concepts that Protect Containerized Applications* (2020, O'Reilly) e do curso da CNCF sobre segurança de containers. Sua taxonomia namespaces × cgroups × capabilities é a base da seção 1.

**Kelsey Hightower** — engenheiro na Google Cloud e autor de **Kubernetes The Hard Way** (repositório GitHub, 2016+), guia pedagógico que forma quase todos os operadores de K8s do mundo; codificou a doutrina de "entenda cada componente antes de confiar num operador gerenciado".

**Sysdig / Falco team (Loris Degioanni)** — fundadores do projeto **Falco** (2016, doado à CNCF 2018), o detector de runtime baseado em regras que a seção 5 usa; também autores do CIS-benchmarks-focados `sysdig secure`.

**Frameworks canônicos herdados**:
- **CIS Docker Benchmark** e **CIS Kubernetes Benchmark** — baselines de conformidade das seções 1 e 4.
- **Pod Security Standards (PSS)** — perfis `privileged/baseline/restricted` (K8s SIG-auth, 2021), sucessor do PodSecurityPolicy.
- **NIST SP 800-190 (Application Container Security Guide)** — a referência oficial de risco em container adotada por reguladores federais.
- Regra "imagem é imutável — binário novo dentro do container em runtime é comprometimento" (Falco/Rice) — base do sinal de **drift**.

---
*Fonte: `mukul975/Anthropic-Cybersecurity-Skills@673da1f` (Apache-2.0), cluster G11 — container &
Kubernetes security (33 skills; representativas: `hardening-docker-containers-for-production`,
`auditing-kubernetes-cluster-rbac`, `implementing-kubernetes-pod-security-standards`,
`implementing-network-policies-for-kubernetes`, `detecting-container-escape-with-falco-rules`,
`scanning-containers-with-trivy-in-cicd`). Método extraído e reescrito em PT-BR; só a camada
defensiva; sem cópia literal; scripts ofensivos excluídos.*
