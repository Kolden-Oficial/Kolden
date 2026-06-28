# 06 — Padrões sistêmicos (defeitos de molde)

> Passo 6 do protocolo. **Defeito que aparece em ≥3 squads → padrão sistêmico.** Promovido aqui e separado dos achados por-squad.

## Padrões identificados

### PSI-01 — Dois formatos de `squad.yaml` coexistem na frota (K-007)
**Squads afetados (11):** Olimpo, Peitho, Caliope, Aglaia, Harmonia, Orfeu, Pluto, Dionisio, Themis, Metis, Egide (formato AIOX-legado).
**Squads "padrão-ouro" (5):** Aletheia, Argos, Liceu, Ariadne (formato Kolden-native) + os 6 semente.
**Caso especial:** Pheme — declarada nascido-no-caos no índice, mas o `squad.yaml` é AIOX-legado (K-010).
**Caso parcial:** Dedalo — AIOX-legado MAS com `cross_cutting.aios_awareness` e `quality_standards` (transição em curso).

**Severidade do molde:** MÉDIO.
**Raio de explosão:** dobra o custo de manutenção; parsing automático precisa de duas máquinas.
**Recomendação:** declarar Kolden-native como **canônico**; migrar os 11 AIOX em frente dedicada (`auditoria-de-squad` × 11 com benchmark = Aletheia/Argos).

### PSI-02 — Squads AIOX-legado NÃO declaram `cross_cutting.veto` (K-008)
**Squads afetados (11):** os 11 AIOX-legado, **incluindo o squad de cibersegurança (Égide)**.
**Squads OK (11):** os 5 nascido-no-caos + os 6 semente (todos têm `cross_cutting.veto`, mesmo que ainda em prosa).

**Severidade do molde:** **CRÍTICO**. Sem vetos declarativos, agentes podem fazer ações que violam diretrizes sem trava determinística no manifesto. O risco é mitigado parcialmente por reflexos PreToolUse (quando existem) e pelo CLAUDE.md §5 (regras globais), mas a camada de squad.yaml está descoberta.

**Raio de explosão:** agente do squad AIOX pode entregar saída que viola política sem trava no nível de squad.

**Recomendação:** adicionar `cross_cutting.veto` a cada um dos 11 AIOX **em ordem de risco**:
1. **Egide** (cyber sem veto = paradoxo)
2. **Pluto** (Hormozi tem promessas de ROI agressivas — risco de exagero)
3. **Themis** (advisory board — risco de parecer financeiro/jurídico)
4. **Peitho** (tráfego pago — risco de gasto sem teto)
5. **Caliope** (copy — risco de claim falso, alegação de eficácia)
6. Demais (Aglaia, Harmonia, Orfeu, Dionisio, Metis, Olimpo).

### PSI-03 — Squads AIOX-legado NÃO declaram `external_handoffs` no squad.yaml (K-009)
**Squads afetados (11):** os mesmos 11 AIOX.
**Squads OK (5+6):** nascido-no-caos + semente declaram `external_handoffs`.

**Severidade do molde:** MÉDIO.
**Raio de explosão:** fronteiras cross-squad não machine-readable; auditoria de roteamento exige ler agente por agente (K-011).

**Recomendação:** propagar Dedalo como referência (Dedalo é AIOX-legado **mas** já declara `cross_cutting.aios_awareness`); adicionar `external_handoffs` a cada um dos 11.

### PSI-04 — Inconsistência índice × chão (K-001, K-002, K-003, K-010)
**Manifestações:**
- K-001: protocolo afirma 247, CLAUDE.md declara 246, chão = 246 ou 279 (com copy-master).
- K-002: sub-squad oculto `Caliope/copy-master/` (33 agentes não declarados).
- K-003: Ariadne +18 (resumo) vs +7 (detalhe) no AGENTS.md — o detalhe está desatualizado.
- K-010: Pheme declarada nascido-no-caos mas formato é AIOX-legado.
- K-012: duplicação de personalidades entre `Caliope/agents/` e `Caliope/copy-master/agents/`.

**Severidade do molde:** ALTO (≥5 ocorrências distintas).
**Raio de explosão:** índice perde valor; nova auditoria precisa reconstruir do chão.

**Recomendação:** instituir hook periódico de reconciliação índice×chão (skill `verificacao-de-alinhamento` já existe — agendar como `SessionStart` global).

### PSI-05 — Roteamento "dentro do agente" vs "no squad.yaml" (K-011)
**Squads afetados:** Olimpo + os 10 AIOX-legado (exceto Aglaia, que tem `routing_matrix` próprio).
**Squads OK:** os 5 nascido-no-caos + os 6 semente (declaram `routing_triggers` no squad.yaml).

**Severidade do molde:** BAIXO.
**Raio de explosão:** custo de manutenção do roteamento; ferramenta de análise precisa ler 20+ arquivos `.md` em vez de 11 `squad.yaml`.

**Recomendação:** aceitar como design dos AIOX ou migrar como parte do PSI-01.

### PSI-06 — Vetos em prosa, não materializados como reflexo (K-006)
**Squads afetados (6):** os 6 semente.
**Squads OK (5):** os nascido-no-caos têm vetos + reflexos PreToolUse derivados (Aletheia, Argos, Liceu, Ariadne — declaração em `cross_cutting.veto` linked com reflexos em `.claude/reflexos/`).

**Severidade do molde:** MÉDIO (maturidade).
**Raio de explosão:** veto pode ser burlado pelo agente; promessa em prosa, não trava determinística.

**Recomendação:** acelerar refino dos 6 semente pelo Ritual do Caos (gerar reflexos a partir de cada `cross_cutting.veto`).

### PSI-07 — Duas constituições, fronteira implícita (K-013)
**Constituições:** `Caos/constituicao.md` (7 artigos, criação de agente) + `Prometeu/.aiox-core/constitution.md` (6 artigos, desenvolvimento de software).
**Severidade do molde:** MÉDIO.
**Recomendação:** declarar fronteira em CLAUDE.md §10.

## Matriz de maturidade (defeitos NÃO contam aqui; separado do placar)

| Squad | Status declarado | Pheme/A§5 testado? | Reflexo materializado? | PRD aprovado? | Maturidade |
|---|---|---|---|---|---|
| **Aletheia** | nascido-no-caos | sim (PRD/instalação/teste) | sim | sim (`prd-de-ia.md`) | **A** (maduro) |
| **Argos** | nascido-no-caos | sim | sim | sim | **A** |
| **Liceu** | nascido-no-caos | sim | sim | sim | **A** |
| **Ariadne** | nascido-no-caos | sim | sim | sim | **A** |
| **Pheme** | nascido-no-caos (índice) / AIOX (formato) | parcial | parcial | parcial | **B** (transição) |
| **Caos** | fábrica | sim | sim | constituição | **A** |
| **Prometeu** | framework vendorizado | sim | parcial (toggle) | constituição AIOX | **A** |
| **Dedalo** | importado-cru / parcial | parcial | não | não | **C** (parcial) |
| **Olimpo + Peitho + Caliope + Aglaia + Harmonia + Orfeu + Pluto + Dionisio + Themis + Metis + Egide** (10) | importado-cru | não | não | não | **D** (importado, dívida do Ritual) |
| **Nomos, Pactolo, Êmporos, Héstia, Ananke, Cairós** (6) | semente | não | não (vetos em prosa) | não | **E** (semente, dívida do Ritual) |

**Distribuição de maturidade**:
- A (maduro): 6 squads (Aletheia, Argos, Liceu, Ariadne, Caos, Prometeu)
- B (transição): 1 squad (Pheme)
- C (parcial): 1 squad (Dedalo)
- D (importado): 10 squads
- E (semente): 6 squads

## Sumário dos padrões sistêmicos

| ID | Severidade | Squads afetados | Aproveita conserto comum? |
|---|---|---|---|
| PSI-01 | MÉDIO | 11 AIOX | Sim — migração canônica |
| PSI-02 | **CRÍTICO** | 11 AIOX | Sim — frente de veto |
| PSI-03 | MÉDIO | 11 AIOX | Sim — frente de handoff |
| PSI-04 | ALTO | índice geral | Sim — `verificacao-de-alinhamento` agendada |
| PSI-05 | BAIXO | 11 AIOX | Coberto pelo PSI-01 |
| PSI-06 | MÉDIO (maturidade) | 6 semente | Sim — refino Ritual |
| PSI-07 | MÉDIO | constituições | Sim — declarar fronteira |
