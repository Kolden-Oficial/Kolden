---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/msitarzewski--agency-agents/_indice|_indice]]"
---

# F4 — Mapa de decisão · Bucket B10 = `support/`

**Repositório:** `msitarzewski--agency-agents@a597cb6`
**Divisão upstream:** `support/` (6 agentes / 23 IDs)
**Squad-alvo proposto:** **Hestia** (RH) — **DESCARTADO como single-target**
**Decisão real:** **DISPERSÃO ALTA — 6 squads/destinos diferentes**

---

## 1. Por que a Hestia NÃO absorve o bucket inteiro

A divisão `support/` upstream foi nomeada por **carregar o nome `support` no slug**, não por ser um time coeso de customer support. Os 6 agentes upstream cobrem 6 funções operacionais distintas:

| Agente upstream | Função real | Encaixe Hestia? |
|---|---|---|
| analytics-reporter | Web/customer analytics + RFM + attribution + churn | **NÃO** — Hestia é RH, não analytics |
| executive-summary-generator | SCQA + Pyramid Principle para C-level | **NÃO** — habilidade transversal, não-RH |
| finance-tracker | FP&A + cash flow + NPV/IRR + variance | **NÃO** — finanças, não-pessoas |
| infrastructure-maintainer | Prometheus + Terraform + backup + uptime | **NÃO** — infra de TI, não-RH |
| legal-compliance-checker | GDPR/CCPA/SOX/PCI + privacy policies | **NÃO** — jurídico/compliance, não-RH |
| support-responder | Omnichannel CS + FCR/CSAT + KB | **NÃO** — customer support de cliente externo; Hestia trata gente da casa |

**Conclusão:** Hestia (RH/Pessoas & Cultura) cobre o ciclo de vida do **colaborador humano interno** (atrair / integrar / desenvolver / cultura / política). O bucket `support` upstream é sobre **operação geral do negócio**. Nenhum dos 23 IDs cabe em Hestia. Dispersão alta confirmada.

---

## 2. Mapeamento por ID (23 IDs → 6 destinos)

### 2.1 `analytics-reporter` (G1–G4) → **Metis** (analytics/dados)

Metis já tem **Avinash Kaushik** (web analytics) + **Peter Fader** (CLV/segmentação) — alinhamento perfeito.

| ID | Capacidade | Destino | Justificativa |
|---|---|---|---|
| G1 | Transformar dados brutos em insights (RFM + churn + attribution) | Metis · `data-chief` orquestra; `peter-fader` aprofunda CLV | "Análise customer-centric" é a frente do Fader; coerente com `domain_routing.web_analytics_measurement` do data-chief |
| G2 | RFM (Recency-Frequency-Monetary) scoring | Metis · skill nova `rfm-e-segmentacao` (dono: `peter-fader`) | RFM é livro-texto Fader; já tem skill `clv-e-segmentacao` na linhagem — RFM complementa |
| G3 | Multi-touch attribution + weighted revenue allocation | Metis · skill nova `atribuicao-multi-touch` (dono: `avinash-kaushik`) | Modelos de atribuição são domínio Kaushik (Web Analytics 2.0); falta skill explícita no acervo |
| G4 | Predictive modeling para churn e LTV | Metis · ADAPT skill existente de CLV/segmentação; adicionar bloco "churn prediction" (dono: `peter-fader`) | Já há aderência forte; ADAPT > CREATE |

**Total Metis: 4 IDs (1 base agente colapsa para orquestração + 3 técnicas → 3 skills + 1 ADAPT)**

---

### 2.2 `executive-summary-generator` (G5–G7) → **skill compartilhada Olimpo** (não-agente)

O Olimpo (8 executivos) é **destinatário** de sumários executivos, não produtor. A capacidade SCQA + Pyramid Principle é **transversal** — qualquer chief que precise reportar a C-level usa.

| ID | Capacidade | Destino | Justificativa |
|---|---|---|---|
| G5 | Estruturar complexidade em clareza executiva (SCQA) | **Olimpo · skill compartilhada `sumario-executivo-scqa`** (sem dono fixo, invocável por qualquer chief) | SCQA é framework de Barbara Minto (McKinsey) — meta-comunicação, não papel de agente. Skill compartilhada > especialista próprio |
| G6 | Pyramid Principle hierarquização de insights | **Olimpo · mesma skill `sumario-executivo-scqa`** (Pyramid é o complemento natural de SCQA) | Fundir num único pacote evita fragmentação |
| G7 | Quantificação de impacto financeiro + ROI | **Pactolo · skill `unit-economics-operacional` (ADAPT)** | Quantificação financeira de impacto é função do FP&A (já existe); ADAPT adiciona "scenario-modeling + probability-assessment + financial-projection" |

**Total: G5+G6 → 1 skill nova no Olimpo (`sumario-executivo-scqa`); G7 → ADAPT em `Pactolo/unit-economics-operacional`**

**Justificativa anti-criação-de-agente:** G5+G6 são técnica de comunicação, não cargo. Criar agente "summary-generator" violaria REUSE>ADAPT>CREATE (Art. VI da Constituição). Skill compartilhada é a forma certa.

---

### 2.3 `finance-tracker` (G8–G11) → **Pactolo** (FP&A operacional)

Pactolo já tem `analista-fpa`, `modelador-financeiro`, `controller`, `analista-de-fluxo-de-caixa` — alinhamento canônico.

| ID | Capacidade | Destino | Justificativa |
|---|---|---|---|
| G8 | Saúde financeira via budgeting + cash flow + performance analysis | Pactolo · `pactolo-chief` orquestra; base já existe | É exatamente o `whenToUse` do pactolo-chief — REUSE |
| G9 | NPV/IRR investment analysis + risk assessment | Pactolo · skill nova `npv-irr-e-analise-de-investimento` (dono: `modelador-financeiro`) | Modelagem financeira já existe; NPV/IRR + payback + risk-scoring é módulo natural |
| G10 | Cash flow forecast + sazonalidade + anomaly detection | Pactolo · ADAPT skill existente `gestao-de-fluxo-de-caixa` (dono: `analista-de-fluxo-de-caixa`) | Já existe skill — apenas adicionar bloco "seasonal-adjustment + anomaly + liquidity-warnings" |
| G11 | Variance analysis + drill-down por departamento | Pactolo · ADAPT skill existente `analise-fpa-e-variancia` (dono: `analista-fpa`) | Skill existente; ADAPT adiciona "drill-down por centro de custo + corrective-actions" |

**Total Pactolo: 4 IDs (G8 base REUSE no chief + G9 nova skill + G10 ADAPT + G11 ADAPT) + G7 ADAPT do bucket anterior = 5 IDs no Pactolo**

---

### 2.4 `infrastructure-maintainer` (G12–G15) → **Dedalo (escalado)** + **ROADMAP infra-kolden-os**

**Atenção à fronteira:** Dedalo hoje é "claude-mastery" (MCPs, hooks, skills, agentes Claude Code) — **NÃO** é infra-de-servidor (Prometheus/Terraform/uptime/backup). O bucket `support` aqui descreve **infra de TI do negócio**, que hoje no Kolden é o `lobehub/docker-compose.yml` + WSL — domínio do **Ronan/Dedalo expandido** ou de **squad infra dedicado** que não existe.

| ID | Capacidade | Destino | Justificativa |
|---|---|---|---|
| G12 | Assegurar 99.9% uptime + custo + monitoramento + IaC + backup | **ROADMAP** — squad infra-kolden-os NÃO EXISTE; Dedalo é claude-mastery | Não cabe em Dedalo (não-claude); não cabe em nenhum squad atual; **escala para Ronan/Caos decidir CREATE de squad ou expansão de Dedalo** |
| G13 | Prometheus monitoring + alertas por severidade | **ROADMAP** — depende de G12 | Mesma justificativa |
| G14 | Terraform IaC + state management + multi-environment | **ROADMAP** — depende de G12 | Mesma justificativa |
| G15 | Backup AES256 + S3-replication + integrity check | **ROADMAP** — depende de G12 | Mesma justificativa |

**Total Dedalo escalado: 4 IDs roteados para ROADMAP em `_lote-2026-06-26/ROADMAP-ESTRUTURA-ROBUSTA.md`.**

**Por que não DESCARTAR:** as 4 capacidades são padrão-ouro de SRE (Prometheus/Terraform/backup encriptado/health-check de uptime) — o Kolden vai precisar disso quando sair de localhost. **PERDIDO=0** exige roteamento; ROADMAP é roteamento aceito (Art. III + protocolo-de-absorcao-sem-perda).

**Alternativa rejeitada:** absorver em Dedalo "puxando o escopo" para cima. Rejeitada porque Dedalo tem cobrança interna definida (claude-mastery-chief) e expansão de escopo deveria passar por Ritual do Caos. Roteamento por ROADMAP preserva a opção sem ferir nenhuma fronteira.

---

### 2.5 `legal-compliance-checker` (G16–G19) → **Themis** (conselho) + **Égide** (operacional)

Tradeoff documentado:
- **Themis** = conselho estratégico (Munger, Thiel, Dalio, Sinek, etc.) — pensa o jurídico/governança em nível de princípio.
- **Égide** = squad de cyber/segurança ofensiva e defensiva — não tem skill de compliance regulatório hoje.

**Decisão híbrida:** o conhecimento operacional (frameworks GDPR/LGPD, policy-generation, contract-review) vai para **Themis** como **especialista novo `analista-de-compliance-regulatorio`** + 3 skills. A Égide ganha apenas referência cruzada (não-skill) para acionar Themis em incidentes de privacidade.

| ID | Capacidade | Destino | Justificativa |
|---|---|---|---|
| G16 | Compliance multi-jurisdicional (GDPR/CCPA/SOX/PCI-DSS) | **Themis · especialista novo `analista-de-compliance-regulatorio`** | Themis hoje só tem mental-models (board); falta um operacional. Compliance regulatório é função de "advisor/conselheiro de governança" — cabe semanticamente |
| G17 | GDPR framework + data categories + breach-response 72h | Themis · skill nova `framework-gdpr-lgpd` (dono: novo agente acima) | Adapta GDPR ao par GDPR+LGPD (PT-BR; lei 13.709/2018) — não-cópia literal |
| G18 | Privacy policy generator automático com jurisdições | Themis · skill nova `gerador-de-politica-de-privacidade` (dono: idem) | Generator com jurisdições GDPR/LGPD/CCPA — útil para Kolden e clientes |
| G19 | Contract review automation + risk keyword scoring | Themis · skill nova `revisao-de-contratos-com-risco` (dono: idem) | Liability-analysis + risk-scoring de contratos — função clássica de conselho jurídico |

**Total Themis: 4 IDs (1 agente novo + 3 skills novas) + referência cruzada na Égide (não conta como skill nova lá).**

**Por que NÃO Égide:** Égide é cyber (busterer, dirber, fuzzer, rogue, ripper — pentest/recon/exploit). Compliance regulatório ≠ segurança ofensiva. Forçar em Égide seria erro de domínio. A ponte fica no chief da Égide referenciando Themis para questões legais (sem skill nova na Égide).

**Por que NÃO criar squad jurídico próprio:** 4 IDs não justificam squad; Themis já carrega "conselho/governança" e absorver compliance operacional não rompe a tese (board → quase-jurídico). Se mais material legal chegar em buckets futuros, reavalia escalar para squad.

---

### 2.6 `support-responder` (G20–G23) → **ROADMAP squad-cs-novo**

Esta é a parte DE FATO de customer support. **Não cabe em Hestia (RH interno)**. **Não cabe em Peitho** (Peitho é persuasão/copy de funnel, não atendimento pós-venda). **Não cabe em Argos** (Argos coleta inteligência externa, não responde cliente).

| ID | Capacidade | Destino | Justificativa |
|---|---|---|---|
| G20 | Converter interações em experiências positivas (multi-channel CS) | **ROADMAP** — squad-cs (customer success/support) NÃO EXISTE | Não há squad no Kolden hoje que atenda cliente externo pós-venda. Cabe escalar para Ronan |
| G21 | Omnichannel routing + SLAs por canal (email/chat/phone) | **ROADMAP** — depende de G20 | Mesma justificativa |
| G22 | Support analytics (FCR + CSAT + trend) | **ROADMAP** — pode ter sub-ponte com Metis | A análise pode reusar Metis quando o squad nascer; agora vai ROADMAP |
| G23 | Knowledge base com template automation + optimization by usage | **ROADMAP** — depende de G20 | KB é função de CS; orfã sem o squad |

**Total ROADMAP CS: 4 IDs escalados para `_lote-2026-06-26/ROADMAP-ESTRUTURA-ROBUSTA.md`.**

**Alternativa considerada e rejeitada:** colocar em Hestia como "expansão para customer-success interno". Rejeitada porque Hestia foi nascida-semente para **gente da casa** (colaboradores humanos), não para cliente externo. Forçar a expansão sem Ritual viola o `whenToUse` da hestia-chief e o status `semente` (refino pelo Caos pendente).

---

## 3. Resumo de roteamento (23 IDs → destinos)

| Destino | IDs | Total | Tipo |
|---|---|---|---|
| **Metis** | G1, G2, G3, G4 | 4 | 2 skills novas + 1 ADAPT + 1 orq |
| **Olimpo (skill compartilhada)** | G5, G6 | 2 | 1 skill nova compartilhada |
| **Pactolo** | G7, G8, G9, G10, G11 | 5 | 1 skill nova + 3 ADAPT + 1 base |
| **Themis** | G16, G17, G18, G19 | 4 | 1 agente novo + 3 skills novas |
| **ROADMAP infra-kolden-os** | G12, G13, G14, G15 | 4 | Escalado para Ronan/Caos |
| **ROADMAP squad-cs-novo** | G20, G21, G22, G23 | 4 | Escalado para Ronan/Caos |

**Soma: 4 + 2 + 5 + 4 + 4 + 4 = 23 IDs**

**Invariante:** `count(ABSORVIDO) + count(DESCARTADO) + count(PERDIDO) = 23`. Aqui: ABSORVIDO=15 (Metis 4 + Olimpo 2 + Pactolo 5 + Themis 4), ROTEADO-ROADMAP=8 (infra 4 + CS 4), DESCARTADO=0, PERDIDO=0. ROADMAP **não é DESCARTE** — é absorção diferida com registro formal (Art. VIII).

---

## 4. Hestia: por que zero IDs

Decisão final: **0 IDs absorvidos em Hestia.**

Justificativa: nenhum dos 6 agentes upstream cobre o ciclo de vida do colaborador humano (atrair / integrar / desenvolver / cultura / política). O nome do bucket upstream (`support`) confundiu na hipótese inicial — não é customer-support coeso, é "tudo que sobrou da operação não-marketing/não-vendas". Hestia preserva escopo de semente intocado para o Ritual do Caos refinar quando chegar nela.

---

## 5. Frontes / observações para F5

- **Skill compartilhada no Olimpo:** padrão NOVO no acervo. Hoje cada squad tem suas skills; sumário executivo SCQA-Pyramid deveria viver no Olimpo (consumidores naturais) e ser referenciada por todos os chiefs. Documentar como precedente em `dados/padroes-aprendidos.yaml` na F7.
- **Themis ganhando especialista operacional:** Themis hoje é só conselho/board (mental models). Adicionar `analista-de-compliance-regulatorio` quebra ligeiramente a tese (mental-models vs. operacional). Aceitável porque governance/legal-compliance é função clássica de board-advisor; **sinalizar no Ritual do Caos para revisão semântica futura**.
- **Dois ROADMAPs:** infra-kolden-os e squad-cs-novo são as 2 maiores lacunas do Kolden expostas por este bucket. Ronan deve priorizar.
- **PERDIDO=0:** verificado por contagem (23 = 4+2+5+4+4+4).
