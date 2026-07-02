---
name: modelagem-de-ameacas-stride-pasta
description: >-
  Use quando precisar identificar ameaças e priorizar mitigações ANTES de construir
  (no desenho da arquitetura) ou ao revisar um sistema crítico já em produção: aplica
  STRIDE (Microsoft SDL — Spoofing, Tampering, Repudiation, Information disclosure,
  Denial of service, Elevation of privilege) componente-a-componente e fluxo-a-fluxo
  sobre um DFD com trust boundaries explícitas, e/ou PASTA (Process for Attack
  Simulation and Threat Analysis — 7 estágios) para sistemas de alto risco com
  exposição regulatória, simulando o adversário real. Habilidade autônoma de threat
  modeling da Égide aplicável a qualquer sistema (web, mobile, embarcado, microsserviços,
  data pipeline) — não acoplada a OWASP nem a ZTA.
domain: ciberseguranca
subdomain: threat-modeling
tags: [threat-modeling, stride, pasta, microsoft-sdl, dfd, data-flow-diagram, trust-boundary, kill-chain, cwe, attack-simulation, security-by-design]
---

> Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT © 2025 AgentLand Contributors)

# Modelagem de Ameaças com STRIDE e PASTA

> Threat model não é entregável de sprint zero arquivado e esquecido — é artefato
> **vivo**, revisado a cada mudança de arquitetura, novo dataflow ou nova superfície
> de exposição. STRIDE é rápido mas system-centric: enxerga o sistema, não o atacante.
> PASTA é attack-centric e profundo, mas custa caro: não invoque em ferramenta interna
> de baixo risco. Threat model SEM **DFD desenhado** e SEM **trust boundaries explícitas**
> vira teatro técnico — checklist mental não conta. Saídas desta habilidade são
> **defensivas**: lista de mitigações priorizadas, nunca instruções ofensivas reutilizáveis.

## O que é

Modelagem de ameaças é o método de **antecipar como um sistema pode ser atacado**
antes de o atacante chegar — identificando atores, ativos, fluxos, fronteiras de
confiança e categorias de ameaça, para priorizar mitigações onde dói menos (no desenho)
em vez de onde dói mais (em produção sob incidente). A Égide tinha STRIDE como passo
embutido em `seguranca-de-aplicacoes-web-owasp` e `arquitetura-zero-trust-zta`, mas
faltava habilidade autônoma cobrindo o método clássico do Microsoft SDL **mais** o
processo de 7 estágios da PASTA. Esta habilidade fecha a lacuna como ferramenta de
**desenho seguro** aplicável a qualquer sistema.

## Método

### 1. Decidir STRIDE, PASTA ou os dois
Antes de modelar, escolha o método pela natureza do alvo:
- **STRIDE** — sistema novo em desenho, microsserviço isolado, mudança arquitetural
  pontual, revisão rápida por componente. System-centric, barato, repetível.
- **PASTA** — sistema crítico em regulação (financeiro, saúde, infraestrutura),
  alta exposição, alvo provável de adversário motivado, necessidade de mapear
  TTPs reais e justificar investimento em controle. Attack-centric, profundo.
- **Combinado** — PASTA como camada estratégica (estágios 1-3 e 7) e STRIDE como
  motor de identificação de ameaças dentro do estágio 4. É o padrão quando o time
  já domina STRIDE e quer subir para attack-centric sem jogar fora o que sabe.

### 2. Desenhar o DFD (Data Flow Diagram) com trust boundaries
Sem DFD não existe threat model — é a base sobre a qual STRIDE e PASTA operam.
Elementos canônicos:
- **Processos** — código que executa lógica (serviço, função, container).
- **Data stores** — bancos, filas, caches, buckets, sistemas de arquivos.
- **External entities** — usuários, sistemas terceiros, atacantes potenciais.
- **Data flows** — toda comunicação entre os elementos acima (HTTP, gRPC, fila,
  arquivo, IPC), anotada com protocolo, autenticação e sensibilidade do dado.
- **Trust boundaries** — linhas tracejadas onde a confiança muda: internet ↔ DMZ,
  DMZ ↔ rede interna, processo de usuário ↔ processo privilegiado, tenant A ↔
  tenant B, browser ↔ backend. **Toda travessia de boundary é candidata a STRIDE.**

Vá ao **nível 1** ou **nível 2** de detalhe (Shostack): nível 0 (contexto) é raso
demais para gerar ameaça acionável.

### 3. Aplicar STRIDE sistematicamente
Para **cada elemento** do DFD, percorra as 6 categorias e pergunte "como isso pode
acontecer aqui?":

- **S — Spoofing** (autenticidade) — alguém se passar por outro usuário, serviço,
  processo. Aplica-se a processos e external entities. Mitigação: autenticação
  forte, MFA resistente a phishing, mTLS, identidade de workload, assinatura.
- **T — Tampering** (integridade) — alteração não-autorizada de código, dado em
  trânsito, dado em repouso, parâmetro de chamada. Aplica-se a processos, data
  stores e data flows. Mitigação: assinatura, hash, TLS, controle de acesso de
  escrita, integridade de filesystem, code signing.
- **R — Repudiation** (não-repúdio) — usuário negar ter feito uma ação. Aplica-se
  a processos. Mitigação: log assinado e imutável (append-only), trilha de
  auditoria com timestamp confiável, transação assinada.
- **I — Information disclosure** (confidencialidade) — vazamento de dado
  sensível por canal, log, erro, side-channel. Aplica-se a processos, data
  stores e data flows. Mitigação: cifragem em trânsito (TLS 1.3) e em repouso
  (KMS/HSM), minimização de dado, mascaramento em log, controle de acesso por
  princípio do menor privilégio.
- **D — Denial of service** (disponibilidade) — derrubar ou degradar o serviço
  via volume, exaustão de recurso ou amplificação. Aplica-se a processos, data
  stores e data flows. Mitigação: rate limiting, quotas, circuit breaker,
  autoscaling, DDoS protection na borda, backpressure.
- **E — Elevation of privilege** (autorização) — usuário ganhar privilégio que
  não deveria ter (escalada vertical) ou acessar recurso de outro (escalada
  horizontal, IDOR). Aplica-se a processos. Mitigação: autorização explícita
  por requisição, RBAC/ABAC, validação de entrada, sandboxing, separação de
  processos privilegiados, princípio do menor privilégio.

**Travessias de trust boundary** recebem atenção redobrada: lá é onde S, T, I e
E mais frequentemente acontecem.

### 4. PASTA — 7 estágios attack-centric
Aplique nos sistemas críticos quando a análise system-centric do STRIDE não
basta para justificar onde investir mitigação.

1. **Definição de objetivos** — qual o impacto ao negócio se este sistema cair,
   for adulterado ou vazar? Mapeie ativos críticos, requisitos regulatórios
   (LGPD, PCI-DSS, HIPAA, SOX) e apetite de risco. **Sem esta etapa com
   stakeholder de negócio, o resto vira teatro técnico.**
2. **Definição do escopo técnico** — inventário de componentes, dependências
   (SBOM), infraestrutura, fluxos de dado e superfície de exposição (entry
   points externos e internos). Saída: arquitetura de referência congelada
   para o exercício.
3. **Decomposição da aplicação** — identifique atores (usuário, admin, serviço,
   parceiro), entry points (UI, API, fila, upload), ativos (dados sensíveis,
   credenciais, lógica de negócio), trust boundaries e fluxos críticos. É
   onde o **DFD do passo 2 vira insumo**.
4. **Análise de ameaças** — quem ataca este alvo? Mapeie adversários prováveis
   (crime organizado, insider, oportunista, APT) e suas **TTPs** ancoradas em
   **MITRE ATT&CK**. Aqui o STRIDE pode ser embutido como motor de
   identificação ameaça-a-ameaça, agora colorido pelo perfil do adversário.
5. **Análise de vulnerabilidades e fraquezas** — cruze as ameaças com
   vulnerabilidades reais (CVE) e classes de fraqueza (**CWE**) presentes nos
   componentes inventariados. Consulte SAST/DAST/SCA prévios; sem esses dados,
   esta etapa vira inferência.
6. **Modelagem de ataque** — para cada combinação ameaça × vulnerabilidade
   relevante, monte a **kill chain**: reconhecimento, weaponização, entrega,
   exploração, instalação, C2, ação no objetivo. O exercício é **defensivo**:
   onde quebrar a cadeia mais cedo e mais barato? Não documente exploit
   reutilizável; documente o **ponto de quebra**.
7. **Análise de risco e resposta** — calcule risco (probabilidade × impacto)
   por cenário, priorize mitigações por custo-benefício e produza o plano de
   resposta: o que mitigar agora, o que aceitar, o que transferir (seguro,
   provedor), o que monitorar. Entregue ao dono do sistema com prazo e
   responsável.

### 5. Priorizar mitigações
Não saia da modelagem com uma lista de 80 itens sem ordem. Priorize por:
- **Risco** (probabilidade × impacto) — não invente número; use escala
  qualitativa consistente (baixo/médio/alto/crítico) com critérios escritos.
- **Custo de mitigação** — mudar configuração de um WAF é mais barato que
  refatorar um módulo; ataque o de maior risco com menor custo primeiro.
- **Ponto na kill chain** — quebrar mais cedo na cadeia (autenticação,
  validação de entrada) costuma mitigar várias ameaças de uma vez.
- **Acoplamento a outras frentes** — mitigação que já está coberta por
  controle existente (ZTA, OWASP, IAM) deve ser **referenciada**, não
  duplicada.

### 6. Threat model como artefato vivo
- Versione o DFD e o modelo no mesmo repositório do sistema (markdown +
  diagrama-como-código: PlantUML, Mermaid, Structurizr ou drawio versionado).
- **Gatilhos de revisão**: nova feature que cria entry point, nova
  integração com terceiro, mudança de zona de confiança, incidente real
  relacionado, mudança de regulação aplicável.
- Cada revisão **assina** uma versão (quem revisou, quando, contra qual
  versão da arquitetura). Sem assinatura, o modelo apodrece.

## Ferramentas de referência (defensivas)
**STRIDE / Microsoft SDL** — Microsoft Threat Modeling Tool, OWASP Threat Dragon,
IriusRisk, ThreatModeler, pytm (threat-model-as-code), Threagile. **PASTA** —
metodologia VerSprite/Tony UcedaVélez (livro-base "Risk Centric Threat Modeling").
**Apoio** — MITRE ATT&CK (TTPs), CAPEC (padrões de ataque), CWE (fraquezas), CVE
(vulnerabilidades conhecidas), NIST SP 800-154 (data-centric threat modeling),
OWASP Threat Modeling Cheat Sheet, "Threat Modeling: Designing for Security"
(Adam Shostack), Threat Modeling Manifesto.

## Quando usar STRIDE vs PASTA — critério rápido
| Situação | STRIDE | PASTA |
|---|---|---|
| Microsserviço novo em desenho | Sim | Não |
| Sistema crítico regulado (PCI/LGPD/HIPAA) | Insuficiente | Sim |
| Alvo de adversário motivado (APT, crime org.) | Insuficiente | Sim |
| Revisão pontual de uma mudança | Sim | Não |
| Justificar orçamento de segurança ao negócio | Fraco | Forte |
| Time iniciante em threat modeling | Comece aqui | Depois |
| Sistema embarcado / OT / ICS | Sim, com cuidado | Sim, se crítico |

## Anti-padrões
- **Threat model em sprint zero e nunca mais.** Vira documento morto na
  primeira mudança de arquitetura.
- **STRIDE na cabeça, sem DFD.** Você vai esquecer metade dos data flows e
  todas as trust boundaries que importam.
- **PASTA sem stakeholder de negócio no estágio 1.** Vira exercício técnico
  desconectado do impacto real; mitigação ganha prioridade errada.
- **Listar ameaça e parar.** Ameaça sem mitigação priorizada e dono é
  observação, não decisão.
- **Misturar STRIDE com lista de bugs.** Threat model não é pentest report;
  é mapa de risco arquitetural. Bug específico vai para a fila do produto.
- **Copiar threat model de sistema parecido sem revalidar trust boundaries.**
  As fronteiras de confiança são o que muda mais entre sistemas; copiar é
  ilusão de produtividade.
- **Documentar exploit reutilizável.** A entrega é **defensiva**: ponto de
  quebra, mitigação, dono, prazo. Detalhe ofensivo fica fora do artefato.

## Checklist de entrega
- [ ] DFD desenhado em nível 1 ou 2, com trust boundaries explícitas.
- [ ] Inventário de atores, entry points e ativos críticos.
- [ ] STRIDE aplicado a cada processo, data store, data flow e external entity.
- [ ] Travessias de trust boundary recebem atenção extra (S, T, I, E).
- [ ] (Se PASTA) Estágios 1-7 com saída concreta — sem pular o estágio 1.
- [ ] (Se PASTA) TTPs ancoradas em MITRE ATT&CK; fraquezas em CWE; vulns em CVE.
- [ ] Lista de mitigações **priorizada** por risco × custo, com dono e prazo.
- [ ] Mitigações que pertencem a outras frentes (OWASP, ZTA, IAM, K8s) são
      **referenciadas**, não duplicadas — handoff explícito.
- [ ] Threat model versionado no repositório do sistema com gatilhos de revisão.
- [ ] Sem detalhe ofensivo reutilizável; saída exclusivamente defensiva.

## Entrega
Pacote do threat model: DFD versionado (diagrama-como-código) + planilha/tabela
de ameaças STRIDE por elemento + (se aplicável) relatório PASTA dos 7 estágios +
matriz de risco priorizada + plano de mitigação com dono e prazo + gatilhos de
revisão. Handoffs: ameaças de aplicação web vão para `seguranca-de-aplicacoes-web-owasp`;
ameaças de identidade/autorização para `gestao-de-identidade-e-acesso-iam`;
ameaças de container/K8s para `seguranca-de-containers-e-kubernetes`; controle de
acesso por arquitetura para `arquitetura-zero-trust-zta`.

## Herança histórica

**Loren Kohnfelder e Praerit Garg** — engenheiros da Microsoft que, no memorando interno *The Threats to Our Products* (abril 1999), cunharam o acrônimo **STRIDE** (Spoofing/Tampering/Repudiation/Information disclosure/Denial of service/Elevation of privilege). Base histórica das 6 categorias da seção 3.

**Adam Shostack** — engenheiro-chefe de threat modeling na Microsoft nos anos 2000, arquiteto do Microsoft SDL e da Threat Modeling Tool; autor de *Threat Modeling: Designing for Security* (2014, Wiley), obra canônica do campo. Refinou STRIDE-per-element/per-interaction, definiu o "nível 1/2 de DFD" (base da seção 2) e é cosignatário do **Threat Modeling Manifesto** (2020).

**Tony UcedaVélez e Marco M. Morana** — autores de *Risk Centric Threat Modeling: Process for Attack Simulation and Threat Analysis* (2015, Wiley), a obra que formalizou os 7 estágios da PASTA. UcedaVélez cofundou a VerSprite.

**Frameworks canônicos herdados**:
- **STRIDE** (Kohnfelder & Garg, Microsoft, 1999) — 6 categorias por ameaça sobre DFD.
- **PASTA** (UcedaVélez & Morana, 2015) — 7 estágios attack-centric.
- **Microsoft SDL — Threat Modeling Tool** e a doutrina STRIDE-per-element/per-interaction (Shostack, 2014).
- **Threat Modeling Manifesto** (2020) — valores e princípios cosignados por Shostack, Sheridan, Braiterman e outros.
- **MITRE ATT&CK + CAPEC + CWE + CVE** — a cadeia canônica de vocabulário (tática → padrão → fraqueza → vulnerabilidade) usada nos estágios 4-5 da PASTA.
- **NIST SP 800-154 (Guide to Data-Centric System Threat Modeling)** — variação data-centric complementar quando o ativo primário é dado.

---
*Fonte: `msitarzewski/agency-agents@a597cb6` (MIT © 2025 AgentLand Contributors), cluster
G22 — threat modeling (STRIDE + PASTA + DFD + trust boundary). Método adaptado e
reescrito em PT-BR; nenhum código importado.*
