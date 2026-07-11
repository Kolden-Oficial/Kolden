---
tipo: registro
area: kolden-os
up: "[[.claude/_MOC-kolden-os]]"
relacionado:
  - "[[.claude/registros/auditoria/2026-06-28-vistoria-v2/_indice|_indice]]"
---

# 99 — Fila de remediação priorizada

> Passo 7 do protocolo. Ordenação por **severidade × raio de explosão**. Executável: cada item tem ação concreta, dono sugerido e referência ao achado.

## Fila CRÍTICA (resolver primeiro)

### 1. K-H3a + K-H3b — Héstia e Cairós órfãos completos de roteamento
- **Ação**: editar `Olimpo/agents/zeus.md` para adicionar 2 trilhas novas em `routing_logic` (ou nominar nas trilhas existentes):
  - `people_culture_challenge`: triggers `[RH, pessoas, recrutamento, onboarding, cultura, eNPS]` → `route_to: poseidon`, com handoff externo a `hestia`.
  - `pmo_challenge`: triggers `[PMO, cronograma, gestão de projeto, roadmap, riscos do projeto, stakeholders]` → `route_to: poseidon` (ou criar novo executivo) com handoff externo a `cairos`.
- **Editar também**: `Olimpo/agents/poseidon.md` `routing_triggers` adicionando `cultura` e `gestão de projeto`.
- **Dono**: Caos (curador) + revisão humana.
- **Esforço**: 1 sessão.

### 2. K-H3c — Nomos/Pactolo/Êmporos/Ananke sem `routing_triggers` explícito do padrinho
- **Ação**: editar `Olimpo/agents/{hades, plutos, afrodite, poseidon}.md` para adicionar nominação explícita do semente:
  - Hades: adicionar `nomos` no `routing_triggers` (ou trilha dedicada `compliance_challenge`).
  - Plutos: adicionar `pactolo` (ou trilha `fpa_operacional`).
  - Afrodite: adicionar `emporos` (ou trilha `execucao_comercial`).
  - Poseidon: adicionar `ananke` (ou trilha `bizops`).
- **Dono**: Caos + revisão humana.
- **Esforço**: 1 sessão.

### 3. K-008 + PSI-02 — Veto crítico ausente nos 11 AIOX (Egide como prioridade)
- **Ação**: adicionar `cross_cutting.veto` ao `Egide/squad.yaml` PRIMEIRO (paradoxo: cyber sem veto), depois Pluto, Themis, Peitho, Caliope. Vetos mínimos:
  - `escopo_autorizado`, `credencial_texto_puro` (universais)
  - Específicos por squad.
- **Dono**: Caos + cada agente-chefe de squad.
- **Esforço**: 11 sessões (uma por squad AIOX) — pode rodar em paralelo.

## Fila ALTO

### 4. K-012 + PSI-04 — Duplicação `Caliope/agents/` × `Caliope/copy-master/`
- **Ação**: decisão arquitetural sobre destino do copy-master:
  - **Opção A** (recomendada): consolidar 10 mestres exclusivos do copy-master em `Caliope/agents/` e descartar o sub-squad. Atualizar AGENTS.md.
  - **Opção B**: declarar copy-master como squad independente (formato Kolden-native) e remover duplicatas de `Caliope/agents/`.
- **Dono**: Ronan (decisão) + Caos (execução).
- **Esforço**: 1 sessão de decisão + 1 sessão de migração.

## Fila MÉDIO

### 5. K-H2 — Hermes camada-2 sem agente Kolden nativo
- **Ação**: criar agente Kolden nativo (ou skill) equivalente que materialize DoR + lacre + Contrato. Manter `abre-missao.sh` como motor mas com fallback Kolden caso runtime Nous caia.
- **Dono**: Caos (criar via Ritual).
- **Esforço**: 1 Ritual completo (~3-5 sessões).

### 6. K-001 + K-002 + K-003 + PSI-04 — Reconciliação de índice
- **Ação**:
  - Atualizar CLAUDE.md §10 com contagem real (com vs sem copy-master).
  - Atualizar AGENTS.md detalhe de Ariadne para +18 skills (corrigindo o detalhe).
  - Documentar Caliope/copy-master como sub-squad ou consolidar (depende de #4).
  - Agendar `verificacao-de-alinhamento` como reflexo `SessionStart` global semanal.
- **Dono**: Caos (curador).
- **Esforço**: 1 sessão.

### 7. K-005 + PSI-03 — Contratos unilaterais nos semente + AIOX sem `external_handoffs`
- **Ação**: definir política — handshake bidirecional OU verdade-unilateral-do-executivo. Aplicar consistente.
- **Dono**: Caos + revisão arquitetural.
- **Esforço**: 1 sessão de decisão + propagação aos 11 + 6 semente.

### 8. K-006 + PSI-06 — Vetos dos semente em prosa (não como reflexo)
- **Ação**: Refinar os 6 semente pelo Ritual do Caos completo (9 fases). Materializa vetos como reflexo PreToolUse.
- **Dono**: Caos.
- **Esforço**: 6 Rituais (~20-30 sessões total). Priorizar Héstia/Cairós (também órfãos).

### 9. K-007 + PSI-01 — 2 formatos de squad.yaml
- **Ação**: migrar os 11 AIOX para Kolden-native. Usar `auditoria-de-squad` com benchmark = Aletheia.
- **Dono**: Caos.
- **Esforço**: 11 sessões.

### 10. K-009 — AIOX sem `external_handoffs` (coberto pelo PSI-03 e #9)

### 11. K-010 — Pheme em transição (status × formato)
- **Ação**: migrar `Pheme/squad.yaml` para Kolden-native completo OU corrigir status para "transição/parcial" no índice.
- **Dono**: Caos.
- **Esforço**: 1 sessão.

### 12. K-013 + PSI-07 — Fronteira entre duas constituições
- **Ação**: adicionar 1 parágrafo em CLAUDE.md §10 declarando: "Caos governa criação de agentes (incl. F2 de absorção); Prometeu/AIOX governa ciclo de desenvolvimento de software de aplicação. Os dois não se sobrepõem."
- **Dono**: Caos (curador).
- **Esforço**: 5 minutos.

## Fila BAIXO

### 13. K-H1 — Zeus em 2 degraus (transparência)
- **Ação**: adicionar nota em CLAUDE.md §10 que Zeus colapsa camada 3 + camada 4 intencionalmente.
- **Dono**: Caos.
- **Esforço**: 5 minutos.

### 14. K-011 — Roteamento Olimpo nos `.md`, não em squad.yaml
- **Ação**: aceitar como design ou propagar como parte do #9.

### 15. K-004 — Superfície vendorizada do motor Skyvern
- **Ação**: documentar `Argos/motor/**` em escopo de exceção; congelar SBOM/commit-hash do motor.
- **Dono**: Argos (chefe) + Egide (auditor).
- **Esforço**: 1 sessão.

## Resumo de esforço

| Severidade | Itens | Esforço estimado |
|---|---:|---|
| CRÍTICO | 3 | 2-3 sessões + 11 paralelas (vetos) |
| ALTO | 1 | 2 sessões |
| MÉDIO | 9 | ~30-40 sessões (refinos de Ritual dominam) |
| BAIXO | 3 | < 1h total |

**Total**: ordem de **40-50 sessões de trabalho** para fechar 100% do laudo. Frente paralela mais alta produtividade: vetos dos 11 AIOX (paralelizáveis via subagentes).
