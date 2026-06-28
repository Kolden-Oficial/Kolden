# 02 — Hipóteses (H1–H3) com evidência

> Passo 1 do protocolo. Cada hipótese é resolvida com `arquivo:linha`.

## H1 — Zeus em dois degraus

**Pergunta do protocolo:** Zeus é camada 3 (roteador), camada 4 (CEO/Olimpo) ou ambos? Se ambos, está declarado ou silencioso?

**Veredito: CONFIRMADA como DESIGN INTENCIONAL DECLARADO.** Severidade: **BAIXO** (transparência).

### Evidência
- `Olimpo\agents\zeus.md:11` — `cargo: "CEO"` (camada 4 — executivo).
- `Olimpo\agents\zeus.md:14-16` — `tier: 0`, `squad: olimpo`, `role: orchestrator` (camada 3 — roteador do squad).
- `Olimpo\agents\zeus.md:18` — `routing_triggers: [visão, estratégia, direção, prioridade, diagnóstico, roteamento, decisão executiva, captação, cultura, conselho, pivot, missão, valores, OKR de empresa, arbitragem entre áreas]`.
- `Olimpo\agents\zeus.md:184-198` — `orchestrates` declara 7 executivos sob o Zeus: poseidon, apolo, hefesto, hades, atena, plutos, afrodite.
- `Olimpo\agents\zeus.md:219-233` — seção "Contrato de Missão (camada 3)" explicita: *"O Zeus opera sobre o Contrato de Missão (`Olimpo/contratos/`)... Na descida, o Zeus preenche e assina a seção `zeus` (diagnóstico, decomposição, paralelo)."*
- `Olimpo\contratos\contrato-de-missao.schema.md:26` — confirma o papel de Zeus na **camada 3**.

### Interpretação
O Zeus encarna **duas funções no mesmo arquivo**, e isso é **declarado** no arquivo, no schema do Contrato e no CLAUDE.md §10. Não há colapso silencioso. **Achado de transparência (K-H1, BAIXO)**: o índice CLAUDE.md poderia explicitar que "Zeus = camada 3 + camada 4" para evitar confusão de leitor novo.

### Achado JSONL
```json
{"id":"K-H1","severidade":"BAIXO","classe":"hierarquia","titulo":"Zeus colapsa camadas 3 e 4 no mesmo agente — declarado, mas o índice não destaca a sobreposição","evidencia":[{"arquivo":"Olimpo/agents/zeus.md","linha":11},{"arquivo":"Olimpo/agents/zeus.md","linha":18},{"arquivo":"Olimpo/agents/zeus.md","linha":184},{"arquivo":"Olimpo/contratos/contrato-de-missao.schema.md","linha":26}],"hipotese_pai":"H1","raio_de_explosao":"confusao-de-leitor","recomendacao_breve":"adicionar nota explicita em CLAUDE.md §10 sobre o colapso intencional camada-3+camada-4 do Zeus","status":"aberto"}
```

---

## H2 — Hermes camada-2 fantasma

**Pergunta do protocolo:** quem materializa DoR + matriz de risco + assinatura do `lacre_sha256` + Contrato de Missão inicial, se Hermes não é squad nativo Kolden?

**Veredito: REFUTADA como fantasma — lastro concreto identificado. Achado real = dependência de runtime vendorizado sem fallback Kolden-nativo.** Severidade: **MÉDIO**.

### Evidência do lastro
- `Hermes\camada-2-contrato.md:1-15` — protocolo MD declara o papel da camada 2 (tradutor + DoR + lacre + matriz de risco + Contrato).
- `Hermes\camada-2-contrato.md:19-26` — script **`abre-missao.sh`** é o sealer determinístico:
  > *"bash C:/Kolden/Hermes/scripts/abre-missao.sh --input ... — Ele cria o Contrato em `Olimpo/contratos/missoes/m-<ts>-<slug>.yaml` com a seção `intencao_original` lacrada (`input_cru` verbatim + `hash` sha256)."*
- `Hermes\camada-2-contrato.md:73-77` — gate de subida: `bash C:/Kolden/Dike/.claude/reflexos/gate-de-subida.sh <caminho-do-contrato>` (fail-closed na devolução).
- `Hermes\camada-2-contrato.md:85-89` — propriedade da memória do usuário (`%LOCALAPPDATA%\hermes\memories\USER.md`) — Hermes é dono.
- `Olimpo\contratos\contrato-de-missao.schema.md:24` — schema confirma: "intencao_original | 1 — Humano | hermes (em nome do humano) | na entrada; lacrada".

### Verificação adicional
- **Não há agente Kolden chamado Hermes** em `Hermes/agents/`. Confirmado por Glob.
- **Não há skill** Kolden em `.claude/skills/` chamada `contrato-de-missao`, `lacre-de-intencao`, `tradutor-de-intencao` ou `dor-e-matriz-de-risco` (busca da Fase 1 — Explore C).
- O papel é **funcionalmente embutido no runtime Nous + scripts shell**, governado por um documento markdown.

### Por que é MÉDIO e não CRÍTICO
- A camada 2 **funciona** (script materializa, gate verifica, schema obriga).
- Risco real: **dependência de runtime externo**. Se o runtime Nous quebrar ou for descontinuado, a camada 2 cai junto. Não há agente Kolden nativo para tomar o papel.

### Achado JSONL
```json
{"id":"K-H2","severidade":"MEDIO","classe":"hierarquia","titulo":"Camada 2 (Hermes) é runtime vendorizado Nous sem agente Kolden nativo equivalente — dependência externa em camada-chave","evidencia":[{"arquivo":"Hermes/camada-2-contrato.md","linha":1},{"arquivo":"Hermes/camada-2-contrato.md","linha":20},{"arquivo":"Olimpo/contratos/contrato-de-missao.schema.md","linha":24}],"hipotese_pai":"H2","raio_de_explosao":"se-runtime-Nous-cair-camada-2-cai","recomendacao_breve":"criar agente Kolden nativo equivalente (ou skill) que materialize DoR + lacre + Contrato, mantendo o script abre-missao.sh como motor mas com fallback Kolden","status":"aberto"}
```

---

## H3 — Squads-semente órfãos de roteamento

**Pergunta do protocolo:** os 6 semente (Nomos, Pactolo, Êmporos, Héstia, Ananke, Cairós) aparecem como destinatários em `routing_triggers` de algum executivo do Olimpo?

**Veredito: CONFIRMADA. CRÍTICO** — nenhum semente é nominado em `routing_triggers` de executivo. Os handoffs estão registrados nos próprios `squad.yaml` dos semente (`external_handoffs`), **não** no `routing_logic` dos executivos.

### Evidência
Confirmado por leitura de `Olimpo\agents\zeus.md:122-161` (todos os `routing_logic` do Zeus):
- `operational_challenge` → `poseidon` (operações genéricas; **não** menciona Ananke)
- `marketing_challenge` → `apolo` (não menciona nenhum semente)
- `technology_challenge` → `hefesto` (não menciona Cairós/PMO)
- `information_systems_challenge` → `hades` (cita `conformidade` mas **não** menciona Nomos)
- `ai_strategy_challenge` → `atena`
- `financial_challenge` → `plutos` (cita `unit economics, CAC, LTV` mas **não** menciona Pactolo)
- `revenue_challenge` → `afrodite` (cita `pipeline de vendas, geração de leads, CRM/GHL` mas **não** menciona Êmporos)
- `vision_culture_fundraise` → `self` (cita `cultura` genérica mas **não** menciona Héstia)

E confirmado nos próprios semente (handoffs de subida bem declarados, mas roteamento de descida silencioso):
- `Hestia\squad.yaml:80-95` — `external_handoffs` declara handoffs **de saída** para Caos, Olimpo, Caliope/Aglaia/Pheme, Metis. Nenhum executivo do Olimpo cita Héstia em `routing_triggers`. **ÓRFÃO** completo.
- `Cairos\squad.yaml:82-95` — `external_handoffs.discovery_e_validacao` declara `from: aletheia` (entrada), mas nenhum executivo cita Cairós. **ÓRFÃO** completo.
- `Nomos\squad.yaml:80-90` — `external_handoffs` declara `to: themis/egide/pactolo` (saída). Hades cita `compliance` genérico em `routing_triggers` mas não Nomos. **ÓRFÃO** de roteamento explícito.
- `Pactolo\squad.yaml:78-88` — `external_handoffs.decisao_estrategica` declara `to: plutos` (subida). Plutos não nomina Pactolo na descida. **ÓRFÃO** de roteamento explícito.
- `Emporos\squad.yaml:77-90` — `external_handoffs.estrategia_de_receita` declara `to: afrodite` (subida). Afrodite não nomina Êmporos. **ÓRFÃO** de roteamento explícito.
- `Ananke\squad.yaml:82-97` — `external_handoffs.estrategia_de_operacoes` declara `from: poseidon` (entrada). Poseidon não nomina Ananke. **ÓRFÃO** de roteamento explícito.

### Tabela consolidada

| Semente | Padrinho declarado pelo semente | Trigger explícito do padrinho? | Veredito |
|---|---|---|---|
| Héstia (RH) | — | **NÃO** — nenhum executivo cita RH/pessoas/Héstia | ÓRFÃO COMPLETO |
| Cairós (PMO) | — | **NÃO** — nenhum executivo cita PMO/projetos/Cairós | ÓRFÃO COMPLETO |
| Nomos (Compliance) | Themis/Egide/Pactolo (`squad.yaml:80-90`) | **NÃO** — Hades cita `compliance` genérico, não Nomos | ÓRFÃO |
| Pactolo (FP&A) | Plutos (`squad.yaml:80-88`) | **NÃO** — Plutos cita `unit economics`, não Pactolo | ÓRFÃO |
| Êmporos (Vendas) | Afrodite (`squad.yaml:80-90`) | **NÃO** — Afrodite cita `pipeline de vendas`, não Êmporos | ÓRFÃO |
| Ananke (Operações) | Poseidon (`squad.yaml:82-97`) | **NÃO** — Poseidon cita `processo` genérico, não Ananke | ÓRFÃO |

### Por que é CRÍTICO
- A descida de uma missão real do Zeus para os semente vai falhar: o Zeus roteia para o executivo, e o executivo **não tem registro de que os semente existem como destinos**. O resultado prático: ou o executivo tenta executar (camada errada) ou devolve com erro.
- O fluxo descrito no Contrato de Missão (`zeus.md:184-198` + `contrato-de-missao.schema.md:88`) presume `handoff_operacional: {squad, artefato}` — e o destino precisa estar conhecido pelo executivo.

### Achados JSONL
```json
{"id":"K-H3a","severidade":"CRITICO","classe":"roteamento","titulo":"Héstia (RH) é órfão completo — nenhum executivo do Olimpo a tem em routing_triggers; nenhum padrinho declarado em prosa","evidencia":[{"arquivo":"Hestia/squad.yaml","linha":80},{"arquivo":"Olimpo/agents/zeus.md","linha":122}],"hipotese_pai":"H3","raio_de_explosao":"missao-de-RH-nao-desce","recomendacao_breve":"adicionar Héstia em routing_logic de Poseidon (people-ops) ou criar gancho explícito no Zeus","status":"aberto"}
{"id":"K-H3b","severidade":"CRITICO","classe":"roteamento","titulo":"Cairós (PMO) é órfão completo — nenhum executivo do Olimpo a tem em routing_triggers; nenhum padrinho declarado em prosa","evidencia":[{"arquivo":"Cairos/squad.yaml","linha":82},{"arquivo":"Olimpo/agents/zeus.md","linha":122}],"hipotese_pai":"H3","raio_de_explosao":"missao-de-PMO-nao-desce","recomendacao_breve":"adicionar Cairós em routing_logic de Poseidon ou criar trigger novo no Zeus","status":"aberto"}
{"id":"K-H3c","severidade":"CRITICO","classe":"roteamento","titulo":"Nomos/Pactolo/Êmporos/Ananke — handoff declarado no semente, mas executivo padrinho não os nomina em routing_triggers","evidencia":[{"arquivo":"Nomos/squad.yaml","linha":80},{"arquivo":"Pactolo/squad.yaml","linha":80},{"arquivo":"Emporos/squad.yaml","linha":80},{"arquivo":"Ananke/squad.yaml","linha":82},{"arquivo":"Olimpo/agents/zeus.md","linha":148}],"hipotese_pai":"H3","raio_de_explosao":"descida-do-zeus-pode-nao-encontrar-o-destino","recomendacao_breve":"adicionar squad-semente correspondente em routing_logic de cada padrinho (Hades→Nomos, Plutos→Pactolo, Afrodite→Êmporos, Poseidon→Ananke)","status":"aberto"}
```

---

## H4 (bônus) — Inconsistência Ariadne no índice
- AGENTS.md resumo diz `Ariadne +18 skills` mas detalhe lista `+7` — Δ = 11.
- Investigação adiada para Passo 6 (padrões sistêmicos de inventário).
