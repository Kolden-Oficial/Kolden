---
tipo: registro
area: Dike
up: "[[Dike/_MOC-dike]]"
---

# Diff cirúrgico — Onda 5 (Dike nasce como agente)

> **Escopo (G1):** 100% em `C:\Kolden\Dike\` + AGENTS.md (Passo 8) + METODO §12 (Passo 9, status). Nada mais.
> **Princípio:** nenhum conteúdo inventado — tudo deriva do **PRD v2.0** já aprovado (fonte-da-verdade) e dos moldes canônicos (`olimpo-chief.md`, `Olimpo/constitution.md`, `Olimpo/squad.yaml`).
> **Fan-out:** 0/3 (alvos interdependentes — coerência cross-artefato). Mesma heurística do Olimpo (Onda 4).

## Decisões de arquitetura (a validar no gate)

| Decisão | Proposta | Justificativa |
|---|---|---|
| **ASL** | **2** | Dike é interno e fail-closed: barra a subida (reversível → volta-para-correção), sem canal externo irreversível. Não é ASL-3 (que exige gate humano em ação irreversível). O poder é "barrar", conservador por design. |
| **model** | sonnet | Julgamento fino de fidelidade (reconciliação); o determinismo crítico (hash) é reflexo, não modelo. |
| **loop_pattern** | ReAct especializado | Thought (lê assinaturas) → Action (reconcilia elo top-down) → Observation (veredito). Yao et al. 2022. |
| **tools** | Read, Grep, Glob, Bash, Write | Bash roda `confere-hash.sh`; Write limitado à seção `dike` pelo reflexo `escrita-restrita.sh`. **Sem Agent** (SOLO, não delega). |
| **predictions_scorecard** | false | Dike verifica, não prevê (C8 N/A). |
| **agents/** | 1 persona (`dike.md`) | SOLO — a persona canônica, não um enxame. Satisfaz B2 sem inflar. |

## Arquivos a CRIAR (7)

### 1. `Dike/.claude/agents/dike-chief.md` — agent-def executável (o coração do nascimento)
Molde: `Olimpo/.claude/agents/olimpo-chief.md`. Frontmatter: `name: dike-chief`, `description` (verificador de subida, reconciliação top-down, fail-closed), `model: sonnet`, `tools`, `constitution: ../../constitution.md`, `prd: ../../prd-de-ia.md`, `ASL: 2`, `uncertainty_statement_ref`, `predictions_scorecard: false`, `loop_pattern: ReAct`, `procedencia_lavratura: "Onda 5 METODO m-20260706 2026-07-13"`, `tipo: agente`, `squad: Dike`, `up: "[[_MOC-frota]]"`. Corpo: síntese da persona (remete a `agents/dike.md` + CLAUDE.md), a cadeia de reconciliação (PRD §4), os 5 critérios de `bateu`, handoffs (invocado pelo pipeline; destinatário Hermes; escala Egide p/ segurança), ritual de encerramento.

### 2. `Dike/agents/dike.md` — persona canônica
Deriva de CLAUDE.md "Quem é você" + PRD §3. A persona detalhada (Δίκη, filha de Têmis; aponta-não-acusa; vocabulário proibido; tom imparcial/cirúrgico). `tipo: agente`, `squad: Dike`, `up: "[[_MOC-frota]]"`.

### 3. `Dike/constitution.md` — ~12 artigos veto-operacionais
Molde: `Olimpo/constitution.md`. Deriva de PRD §8 (guardrails) + §10 (modos de falha). Cada artigo com procedência:
- I — **Fail-closed** (não abre portão por omissão) ← PRD §8 + modo #10
- II — **Hash só determinístico** (nunca juízo do modelo) ← modo #6 + reflexo `valida-confere-hash`
- III — **Não corrige** (devolve ao degrau) ← PRD §4 fora-de-escopo
- IV — **Não culpa** pessoa/agente (nomeia degrau) ← PRD §3 + modo #3
- V — **Escrita restrita** à seção `dike` (append-only) ← reflexo `escrita-restrita` + modo #8
- VI — **Lacre soberano** (reconcilia `input_cru` primeiro) ← PRD §4 + modo #9
- VII — **Regra do elo mais alto** (degrau top-down) ← PRD §4
- VIII — **Fidelidade ≠ perfeição/outcome** ← PRD §4 + modo #2/#5
- IX — **Memória prioriza atenção, nunca decide** (anti-viés) ← PRD §6 + modo #7
- X — **Não arbitra** entre executivos (é do Zeus) ← PRD §4 fora-de-escopo
- XI — **Sem commit/push sem ordem** ← CLAUDE.md §6 Kolden global
- XII — **Escala a humano** após teto de rodadas (default 2) ← PRD §8 escalação
Procedência-âncora: Bai et al. 2022 (Constitutional AI) + Constituição Caos v2.5 + `Liceu/frameworks/arquitetura-de-agents-kolden/procedencia.md`.

### 4. `Dike/squad.yaml` — manifesto SOLO nativo
Molde: `Olimpo/squad.yaml` (camada Kolden), **sem** bloco `fronteira_vendor` (Dike é nativo). Campos: `name: dike`, `camada: "verificador-subida"` (entre Zeus/Camada 3 e Hermes/Camada 2), `tier_0: dike-chief`, `tier_1: []` (SOLO), `external_handoffs` (invocado pelo pipeline; destinatário Hermes; escala Egide), `mcp_categoria` (nenhum — Art. IV), `procedencia_lavratura`.

### 5. `Dike/README.md` — o que faz + como é invocado
Molde: `Olimpo/README.md`. Missão (TPND=0), invocação (`@dike` / Passo 6 do `/padronizar`), gate fail-closed, tabela de posição na hierarquia.

### 6. `Dike/_origem.md` — procedência
Nascido pelo Ritual do Caos (9 fases) 2026-06-26 (PRD v2.0); instanciado como agent-funcional na Onda 5 do METODO 2026-07-13.

### 7. `Dike/agent-memory/dike-chief.md` — memória chief-level (Regra E4 nível 2)
Esqueleto `Padrões Ativos / Candidatos / Arquivado`. Semeado com o aprendizado desta Onda.

## Arquivos a EDITAR (2, fora de Dike/ — exceções G1 autorizadas)

- **`AGENTS.md`** (Passo 8) — atualizar a entrada do Dike: de "pendente/sem agent" para "agent-funcional (Onda 5)".
- **`METODO-KOLDEN.md`** §12 (Passo 9) — marcar Onda 5 concluída; §9 estado do Dike: de "não tem agent próprio" para "instanciado".

## NÃO tocar
- PRD v2.0, CLAUDE.md, MEMORY.md, ferramentas.md, roteiro-de-teste.md, os 8 reflexos, settings.json — **já conformes**; o nascimento os envelopa, não os reescreve.
- `Caos/checklists/CAOS-CL-002.md` — é do Caos (G1).

## Mapa achados → gates (Seção C do CAOS-CL-002)

| Gate | Como fica satisfeito |
|---|---|
| C1 constitution | `constitution.md` (12 art.) + `dike-chief.md` frontmatter `constitution:` |
| C2 ASL | `dike-chief.md` `ASL: 2` + PRD |
| C3 incerteza | `dike-chief.md` bloco incerteza (Russell) |
| C4 off-switch | reflexos `gate-de-subida` + `escrita-restrita` (já existem) + roteiro OS-1 |
| C5 orthogonality | PRD §10 (10 modos de falha = auditoria de risco) |
| C6 instrumental | roteiro AB-3 (Dike recusa expandir escopo próprio) |
| C7 grounding | Art. II hash determinístico = grounding factual |
| C8 scorecard | N/A (Dike não prevê) — declarado |
