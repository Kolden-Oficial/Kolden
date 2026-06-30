# F5 — Decisão de absorção · Bucket B10 = `support/`

**Repositório:** `msitarzewski--agency-agents@a597cb6`
**Bucket:** `support/` (6 agentes upstream / 23 IDs)
**Data:** 2026-06-29
**Squad-alvo inicial:** Hestia (RH) — **dispersado**
**Status:** DECISÃO LAVRADA — pendente aprovação Ronan (Art. III) antes de F6

---

## 1. Veredito por ID

| ID | Capacidade | Decisão | Destino canônico | Tipo |
|---|---|---|---|---|
| G1 | Insights acionáveis (RFM + churn + attribution) | ABSORVER | Metis · `data-chief` (orq) + `peter-fader` | base/ADAPT |
| G2 | RFM scoring | ABSORVER | Metis · skill nova `rfm-e-segmentacao` (peter-fader) | CREATE skill |
| G3 | Multi-touch attribution + weighted revenue | ABSORVER | Metis · skill nova `atribuicao-multi-touch` (avinash-kaushik) | CREATE skill |
| G4 | Predictive churn + LTV | ABSORVER | Metis · ADAPT skill `clv-e-segmentacao` (peter-fader) | ADAPT |
| G5 | SCQA framework executivo | ABSORVER | Olimpo · skill compartilhada `sumario-executivo-scqa` | CREATE skill compartilhada |
| G6 | Pyramid Principle hierarquização | ABSORVER | Olimpo · mesma skill `sumario-executivo-scqa` (Pyramid fundido com SCQA) | fusão |
| G7 | Quantificação de impacto + ROI projection | ABSORVER | Pactolo · ADAPT `unit-economics-operacional` | ADAPT |
| G8 | Saúde financeira (budget + cash + perf analysis) | ABSORVER | Pactolo · `pactolo-chief` (whenToUse já cobre) | REUSE |
| G9 | NPV/IRR + risk assessment | ABSORVER | Pactolo · skill nova `npv-irr-e-analise-de-investimento` (modelador-financeiro) | CREATE skill |
| G10 | Cash flow forecast + sazonalidade + anomalia | ABSORVER | Pactolo · ADAPT `gestao-de-fluxo-de-caixa` (analista-de-fluxo-de-caixa) | ADAPT |
| G11 | Variance analysis + drill-down departamental | ABSORVER | Pactolo · ADAPT `analise-fpa-e-variancia` (analista-fpa) | ADAPT |
| G12 | 99.9% uptime + IaC + monitoramento + backup | ROADMAP | `_lote-2026-06-26/ROADMAP-ESTRUTURA-ROBUSTA.md` (squad infra-kolden-os ou expansão Dedalo) | escalado |
| G13 | Prometheus monitoring + alertas | ROADMAP | idem G12 | escalado |
| G14 | Terraform IaC + state management | ROADMAP | idem G12 | escalado |
| G15 | Backup AES256 + S3-replication + integrity | ROADMAP | idem G12 | escalado |
| G16 | Compliance multi-jurisdicional (GDPR/CCPA/SOX/PCI) | ABSORVER | Themis · especialista novo `analista-de-compliance-regulatorio` | CREATE agente |
| G17 | GDPR framework + data categories + breach 72h | ABSORVER | Themis · skill nova `framework-gdpr-lgpd` (adapta GDPR→GDPR+LGPD) | CREATE skill |
| G18 | Privacy policy generator com jurisdições | ABSORVER | Themis · skill nova `gerador-de-politica-de-privacidade` | CREATE skill |
| G19 | Contract review + risk keyword scoring | ABSORVER | Themis · skill nova `revisao-de-contratos-com-risco` | CREATE skill |
| G20 | Multi-channel customer support (CSAT obsession) | ROADMAP | `_lote-2026-06-26/ROADMAP-ESTRUTURA-ROBUSTA.md` (squad-cs novo) | escalado |
| G21 | Omnichannel routing + SLAs por canal | ROADMAP | idem G20 | escalado |
| G22 | Support analytics (FCR + CSAT + trend) | ROADMAP | idem G20 (com sub-ponte futura a Metis) | escalado |
| G23 | Knowledge base + template + optimization by usage | ROADMAP | idem G20 | escalado |

---

## 2. Resumo de aplicação

### 2.1 Metis (4 IDs)
- **1 base na orquestração** (G1) — REUSE `data-chief` (já mapeia `web_analytics_measurement` em `domain_routing`).
- **2 skills novas:** `rfm-e-segmentacao` (G2), `atribuicao-multi-touch` (G3).
- **1 ADAPT:** `clv-e-segmentacao` (G4 — adicionar bloco "predictive-churn + regression + confidence-intervals").
- **Donos:** `peter-fader` (G2/G4 — linhagem CLV+Customer Centricity); `avinash-kaushik` (G3 — Web Analytics 2.0).

### 2.2 Olimpo (2 IDs → 1 skill compartilhada)
- **1 skill nova compartilhada:** `sumario-executivo-scqa` (G5+G6 fundidos: SCQA + Pyramid Principle).
- **Sem dono fixo:** invocável por qualquer chief que precise reportar a C-level executivo. Vive em `C:\Kolden\Olimpo\.claude\skills\sumario-executivo-scqa\SKILL.md`.
- **Padrão NOVO:** primeira skill compartilhada no acervo (precedente a registrar em `dados/padroes-aprendidos.yaml` na F7).

### 2.3 Pactolo (5 IDs)
- **1 REUSE no chief** (G8) — `pactolo-chief.whenToUse` já cobre.
- **1 skill nova:** `npv-irr-e-analise-de-investimento` (G9) — dono: `modelador-financeiro`.
- **3 ADAPT:**
  - `unit-economics-operacional` (G7 — adicionar "ROI-projection + scenario-modeling + probability-assessment").
  - `gestao-de-fluxo-de-caixa` (G10 — adicionar "seasonal-adjustment + anomaly-detection + liquidity-warnings").
  - `analise-fpa-e-variancia` (G11 — adicionar "drill-down por centro de custo + corrective-actions automáticas").

### 2.4 Themis (4 IDs → 1 agente novo + 3 skills novas)
- **1 agente novo:** `analista-de-compliance-regulatorio` em `C:\Kolden\Themis\agents\analista-de-compliance-regulatorio.md`.
  - Persona: advisor operacional de governança/compliance (complementa o board de mental-models existente).
  - Tier: 1 (executor); reporta ao `board-chair`.
- **3 skills novas (dono = novo agente):**
  - `framework-gdpr-lgpd` (G17 — fundir GDPR + LGPD pt-BR, lei 13.709/2018).
  - `gerador-de-politica-de-privacidade` (G18 — jurisdições GDPR/LGPD/CCPA).
  - `revisao-de-contratos-com-risco` (G19 — liability-analysis + risk-keyword-scoring + approval-routing).
- **Referência cruzada na Égide:** `cyber-chief` ganha bloco "em incidente de privacidade/PII vazado, escalar para Themis · `analista-de-compliance-regulatorio`" — **não** é skill nova na Égide, é só ponte.

### 2.5 Hestia (0 IDs)
- Escopo semente preservado. Nada absorvido. Documentado no mapa B10 a justificativa de zero-encaixe.

### 2.6 ROADMAP (8 IDs / 2 frentes)
- **Frente A — infra-kolden-os (4 IDs):** Prometheus monitoring + Terraform IaC + backup encriptado + uptime 99.9%. Decisão de Ronan/Caos entre (1) expandir Dedalo para incluir infra-de-servidor ou (2) criar squad novo. Documentar em `_lote-2026-06-26/ROADMAP-ESTRUTURA-ROBUSTA.md`.
- **Frente B — squad-cs-novo (4 IDs):** customer support pós-venda omnichannel + KB + analytics CS. Squad novo via Ritual do Caos. Documentar em `_lote-2026-06-26/ROADMAP-ESTRUTURA-ROBUSTA.md`.

---

## 3. Conformidade

### 3.1 Constituição (Caos v2.3.0)
- **Art. I (PRD fonte da verdade):** N/A em absorção (não é criação de agente novo de zero); a F5 lavra a mudança antes de aplicar.
- **Art. II (PT-BR + kebab-case):** todos os nomes propostos em PT-BR kebab-case (`rfm-e-segmentacao`, `analista-de-compliance-regulatorio`, etc.).
- **Art. III (aprovação humana):** este documento PARA para aprovação do Ronan antes de F6.
- **Art. IV (zero invenção):** todas as capacidades absorvidas têm origem rastreada no inventário G1–G23 com arquivo:linha.
- **Art. V (prompts agnósticos de modelo):** preservado nas adaptações.
- **Art. VI (REUSE > ADAPT > CREATE):** 7 REUSE/ADAPT (G1, G4, G7, G8, G10, G11 + G6 fundido em G5), 6 CREATE skill, 1 CREATE agente, 8 ROADMAP. Reuso dominante onde havia ancoragem.
- **Art. VII (segredos no Infisical):** sem novos segredos hard-coded — o `analista-de-compliance-regulatorio` quando precisar de credencial (e.g., API de assinatura de contratos no futuro) vai via Infisical.
- **Art. VIII (absorção):** segue o protocolo; F0–F4 já fechadas; F5 lavrada aqui.

### 3.2 Protocolo de absorção sem perda
**Invariante:** `count(ABSORVIDO) + count(DESCARTADO) + count(PERDIDO) = count(inventário) = 23`.

| Categoria | Total | IDs |
|---|---|---|
| ABSORVIDO | 15 | G1–G11 + G16–G19 |
| ROADMAP (absorção diferida com registro) | 8 | G12–G15 + G20–G23 |
| DESCARTADO | 0 | — |
| PERDIDO | 0 | — |

15 + 8 + 0 + 0 = 23 ✓

ROADMAP não é PERDIDO — é roteamento formal documentado em `_lote-2026-06-26/ROADMAP-ESTRUTURA-ROBUSTA.md`, com a procedência preservada para retomada quando o squad/expansão nascer. Esta é a saída canônica do protocolo para capacidades sem destino imediato no acervo.

### 3.3 Fronteiras respeitadas
- **Hestia ≠ customer support de cliente externo** (RH interno preservado).
- **Dedalo ≠ infra-de-servidor** (claude-mastery preservado; infra escala para ROADMAP).
- **Égide ≠ compliance regulatório** (cyber preservado; ponte cross-squad para Themis registrada).
- **Olimpo ≠ produtor de sumário** (Olimpo consome; skill compartilhada vive lá mas é invocada por todos).

---

## 4. Plano de F6 (aplicação — só após aprovação)

Ordem de execução, por squad, com gates da cascata 5.1→5.6:

### 4.1 Metis (4 IDs)
1. **5.3 skills:** criar `rfm-e-segmentacao` (G2) e `atribuicao-multi-touch` (G3); ADAPT `clv-e-segmentacao` (G4).
2. **5.6 referências:** atualizar herança histórica dos donos (Fader para RFM/churn; Kaushik para attribution) com fontes ≥7/10.
3. **Catálogo:** atualizar `C:\Kolden\Metis\.claude\skills\catalogo.md`.

### 4.2 Olimpo (2 IDs)
1. **5.3 skill compartilhada:** criar `C:\Kolden\Olimpo\.claude\skills\sumario-executivo-scqa\SKILL.md` (fusão SCQA + Pyramid).
2. **Documentar precedente** em `Caos/dados/padroes-aprendidos.yaml` na F7: "skill compartilhada no Olimpo" como padrão NOVO.
3. **Catálogo Olimpo:** atualizar listagem de skills.

### 4.3 Pactolo (5 IDs)
1. **5.3 skill nova:** `npv-irr-e-analise-de-investimento` (G9).
2. **5.3 ADAPT:** `unit-economics-operacional` (G7), `gestao-de-fluxo-de-caixa` (G10), `analise-fpa-e-variancia` (G11).
3. **5.6 referências:** Fader/Kaushik não-aplicáveis aqui; fontes de FP&A (e.g., Steve Ross para corporate finance, Aswath Damodaran para valuation) score ≥7.
4. **Catálogo:** atualizar `C:\Kolden\Pactolo\.claude\skills\catalogo.md`.

### 4.4 Themis (4 IDs)
1. **5.2 especialista novo:** criar `C:\Kolden\Themis\agents\analista-de-compliance-regulatorio.md` (tier 1; reporta a `board-chair`).
2. **5.3 skills novas:** `framework-gdpr-lgpd` (G17), `gerador-de-politica-de-privacidade` (G18), `revisao-de-contratos-com-risco` (G19) — todas dono = novo agente.
3. **5.6 referências:** herança histórica do novo agente — autoridade em LGPD (lei 13.709/2018 + Danilo Doneda no Brasil); GDPR (regulamento 2016/679 UE); Hadrian Bach (privacy-by-design).
4. **Ponte Égide:** editar `C:\Kolden\Egide\agents\cyber-chief.md` adicionando bloco "escalação para Themis em incidente de privacidade" — **não-skill**.
5. **Catálogo Themis:** atualizar para refletir o operacional + as 3 skills.

### 4.5 ROADMAP (8 IDs)
1. Editar `C:\Kolden\Caos\registros\absorcao\_lote-2026-06-26\ROADMAP-ESTRUTURA-ROBUSTA.md`:
   - Adicionar **Frente A: infra-kolden-os** com G12/G13/G14/G15 (procedência: msitarzewski--agency-agents · support/infrastructure-maintainer).
   - Adicionar **Frente B: squad-cs-novo** com G20/G21/G22/G23 (procedência: msitarzewski--agency-agents · support/support-responder).
2. Marcar ambas as frentes como **decisão-pendente-Ronan** (criar squad novo vs. expandir squad existente).

### 4.6 Hestia
- **Nenhuma ação.** Squad-semente preservado.

---

## 5. Pendências para F7 (registro)

1. **Ledger** `dados/repositorios-absorvidos.yaml`: adicionar bloco B10 com 15 IDs absorvidos + 8 IDs em ROADMAP, citando os 4 squads tocados (Metis, Olimpo, Pactolo, Themis) + 2 frentes ROADMAP.
2. **Padrão NOVO** `dados/padroes-aprendidos.yaml`: documentar "skill compartilhada no Olimpo" como precedente do acervo.
3. **Registro de entidades:** registrar o especialista novo `analista-de-compliance-regulatorio` (Themis) + as 6 skills novas + 1 skill compartilhada.
4. **MEMORY.md** dos 4 squads tocados (Metis, Olimpo, Pactolo, Themis): bloco "lições da absorção B10".
5. **Relatório de bucket:** este documento mais o mapa-de-decisao-b10 anexados ao relatório-mestre do lote.

---

## 6. Pontos de atenção e riscos

1. **Themis ganhando especialista operacional:** quebra ligeira da tese "Themis = board de mental-models". Aceitável (compliance/governance é função clássica de advisor) MAS marcar para revisão semântica no Ritual do Caos seguinte ao squad Themis.
2. **Olimpo skill compartilhada:** padrão NOVO sem precedente. Validar com Ronan que skill compartilhada (sem dono fixo de agente) é aceitável no acervo. Se não for, fallback é colocar a skill no `zeus.md` (CEO/orquestrador máximo) com nota "invocável por qualquer chief".
3. **Dedalo escalado e não expandido:** decisão consciente de não puxar escopo de Dedalo. Se Ronan preferir "Dedalo cuida de TUDO de tecnologia (claude + infra)", basta migrar G12–G15 para Dedalo em vez de ROADMAP. Aguardar decisão.
4. **squad-cs-novo:** lacuna estratégica revelada — Kolden hoje não tem nenhum squad para cliente externo pós-venda. Pode ser prioridade alta dependendo do roadmap comercial.
5. **PERDIDO=0:** verificado por contagem. Sem perda silenciosa.

---

## 7. Verificação final do invariante

- Inventário F3: **23 IDs** (G1–G23).
- ABSORVIDO: **15** (Metis 4 + Olimpo 2 + Pactolo 5 + Themis 4).
- ROADMAP (absorção diferida formal): **8** (infra 4 + CS 4).
- DESCARTADO: **0**.
- PERDIDO: **0**.

**15 + 8 + 0 + 0 = 23** ✓

`PERDIDO=0` confirmado.

---

**Próximo passo:** aguardar aprovação explícita do Ronan (Art. III) antes de iniciar F6 (aplicação).
