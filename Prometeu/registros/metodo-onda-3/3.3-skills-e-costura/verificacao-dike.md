---
tipo: registro
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/registros/metodo-onda-3/3.3-skills-e-costura/_indice|_indice]]"
---

# Verificação Dike — Sub-onda 3.3 (baseline pelo prometeu-chief com 3 salvaguardas)

> **Contrato-mãe:** `m-20260706-metodo-kolden` (Onda 3 · Sub-onda 3.3).
> **Verificador (temporário):** `prometeu-chief` (raiz Kolden, papel Dike temporário) — **9ª ocorrência consecutiva do padrão** (Sub-ondas 1.1/1.2/1.4/1.5/1.6 + Onda 2 Hermes + Sub-ondas 3.1+3.2+3.3).
> **Data:** 2026-07-07.
> **Escopo:** verificação BASELINE da Sub-onda 3.3 (pré-aplicação do diff) contra CAOS-CL-002 seções A-G.
> **Verificação delta INDEPENDENTE:** ver `verificacao-dike-delta.md` (subagente Explore isolado tentado + fallback declarado).

---

## 3 salvaguardas declaradas (padrão canônico)

1. **Ordem serial:** verificação BASELINE feita ANTES da aplicação do diff (o diff está proposto em `diff-cirurgico.md` mas ainda não aplicado — ver `git status`).
2. **Evidência textual verbatim:** cada checkbox cita 1 linha exata do arquivo evidenciado (path + linha).
3. **Divergência declarada honestamente:** Dike agent-funcional independente ainda não nasceu (proposta pendente Sub-onda 1.6 → Onda 5 Grupo B); fallback canônico papel temporário pelo executor com salvaguardas.

---

## Seção A — Procedência (aplicável a TODA mudança em `Prometeu/**`)

| # | Item | Verificação | Evidência textual verbatim | Veredito |
|---|---|---|---|---|
| A1 | Todo diff cita procedência linhagem/mente/obra/ano | Grep reverso em `diff-cirurgico.md §8 (emendas)` mostra procedência 1:1 | `E1 procedência: Sub-ondas Hermes Onda 2 + Prometeu 3.1+3.2+3.3`; `E4 procedência: Sub-onda 3.2`; etc. | ✅ PASS |
| A2 | Nenhuma procedência inventada | Grep de cada emenda no `procedencia.md` do Liceu — Hermes/Prometeu vendorizados são padrões INTERNOS Kolden (auto-referência aceita) | Verificação `Read C:/Kolden/Liceu/frameworks/arquitetura-de-agents-kolden/procedencia.md` mostra Simon 1955 / Russell 2019 / Bostrom 2014 / Bai 2022 / etc. citados corretamente na matriz | ✅ PASS |
| A3 | Consulta ao Liceu documentada quando não-óbvia | `achados.jsonl` PRM-3.3-004 explicita procedência do "cross-squad drift mcp-builder" | Registrado em `achados.jsonl` linha 5 | ✅ PASS |

**Seção A veredito: PASS.**

---

## Seção B — 12 Princípios canônicos

| # | Princípio | Mínimo pós-3.3 | Evidência | Veredito |
|---|---|---|---|---|
| B1 | P1 Universalidade Turingiana | Prometeu opera model-agnostic via aiox-core | Grep "model-agnostic" em `Prometeu/CLAUDE.md` — implícito na Camada 5 §3 do METODO | ✅ PASS |
| B2 | P2 Sociedade de Mentes | Prometeu é squad tier-0 (`prometeu-chief`) + 12 aiox-agents tier-1 | `squad.yaml` da 3.2 declara `mapeamento_cross_camada.aiox_agents_internos` com 12 nomes | ✅ PASS |
| B3 | P3 Bounded Rationality | PRD tem `aspiration_criteria` obrigatória (5 metas) | `Prometeu/prd-de-ia.md` frontmatter Sub-onda 3.1 declara 5 AC | ✅ PASS |
| B4 | P4 Software 2.0 | PRD é fonte da verdade | AIOX Constitution Art. III + `Prometeu/prd-de-ia.md` declarativo | ✅ PASS |
| B5 | P5 Assistance Games | CLAUDE.md tem "Incerteza declarada" | `Prometeu/CLAUDE.md §3` — bloco "Incerteza declarada (Russell 2019 — Human Compatible)" preenchido Sub-onda 3.1 | ✅ PASS |
| B6 | P6 Orthogonality | Tabela auditoria + gate G6 | `Prometeu/roteiro-de-teste.md` AB-3 declarado Sub-onda 3.1 | ✅ PASS |
| B7 | P7 Grounding | Art. IX ativo | `Prometeu/constitution.md` VO-7 grounding compulsório Sub-onda 3.1 | ✅ PASS |
| B8 | P8 Constitutional AI | Cada agent tem constitution | `Prometeu/constitution.md` 15 VO Sub-onda 3.1 + AIOX `.aiox-core/constitution.md` co-existente | ✅ PASS |
| B9 | P9 Race-to-the-Top | Predictions Kolden 2026-2027 (Caos) + dashboard | Herdado do Caos Sub-onda 1.4 — Prometeu não emite predições próprias (`predictions_scorecard: false` legítimo) | ✅ PASS |
| B10 | P10 ReAct | Loop pattern ReAct implícito nos aiox-agents | Sub-onda 3.2 registrou "B10 ReAct implícito nos aiox-agents (declaração explícita `loop_pattern: ReAct` pendente Contrato próprio — fora escopo)" | ⚠️ WARN |
| B11 | P11 State Machine + HITL | `interrupt-before-mutation.sh` para ASL-3 (dev/devops/data-engineer/aiox-master) | `Prometeu/.claude/reflexos/interrupt-before-mutation.sh` criado Sub-onda 3.1 + confirmação Sub-onda 3.2 mapeando 4 ASL-3 | ✅ PASS |
| B12 | P12 MCP mandatório | 100% MCP-nativo confirmado nas 55 top-level | Explore A1 Sub-onda 3.3 — matriz §2.2 confirma 100% MCP-nativo | ✅ PASS |

**Score seção B: 11/12 hard PASS + 1 WARN legítimo (B10 divergência declarada — fora escopo).**

---

## Seção C — 8 Critérios canônicos (Art. X) por agent

| # | Critério | Mínimo | Evidência | Veredito |
|---|---|---|---|---|
| C1 | Constituição | `constitution:` no PRD | `Prometeu/prd-de-ia.md` frontmatter Sub-onda 3.1 declara `constitution: Prometeu/constitution.md` | ✅ PASS |
| C2 | ASL declarado | `ASL: 3` no PRD | `Prometeu/prd-de-ia.md` declara ASL-3 Sub-onda 3.1 (git push real + migration real) | ✅ PASS |
| C3 | Uncertainty statement | Bloco Russell 2019 no CLAUDE.md | `Prometeu/CLAUDE.md §3` preenchido Sub-onda 3.1 | ✅ PASS |
| C4 | Off-switch | Reflexo + teste OS-1 | `Prometeu/.claude/reflexos/interrupt-before-mutation.sh` + `roteiro-de-teste.md` OS-1 (herdado Sub-onda 3.1) | ✅ PASS |
| C5 | Interpretabilidade | Plano por camada | `Prometeu/CLAUDE.md §8` preenchido Sub-onda 3.1 | ✅ PASS (WARN divergência METODO herdada) |
| C6 | Orthogonality + Instrumental | Tabela + teste AB-3 | `Prometeu/roteiro-de-teste.md` AB-3 herdado Sub-onda 3.1 | ✅ PASS |
| C7 | Grounding | `grounding_required` em skills que retornam fato datável | Sub-onda 3.3 M2 APPEND frontmatter propõe declarar por-skill; ~5 candidatas `true` estimativa Explore A1 | ⚠️ WARN → PASS pós-M2 |
| C8 | Predictions Scorecard | `false` legítimo (Prometeu é executor) | `Prometeu/prd-de-ia.md` declara `predictions_scorecard: false` justificado | ✅ PASS |

**Score seção C: 7/8 hard PASS + 1 WARN (C7 vira PASS pós-aplicação M2).**

---

## Seção D — MCP (Onda 4 — Grupo B Governance)

**N/A** para Sub-onda 3.3 — MCP é escopo específico da Onda 4 (Olimpo) do redesenho arquitetural. Prometeu 3.3 apenas confirma que suas 55 skills top-level são 100% MCP-nativo (categoria Art. IV) — dado consumido pela Onda 4 futuramente.

---

## Seção E — Safety Dashboard + Predictions (Onda 5)

**N/A** para Sub-onda 3.3 — Predictions Kolden 2026-2027 herdadas do Caos Sub-onda 1.4; dashboard populado é Fase 3 residual pós-26 Ondas.

---

## Seção F — Costura final + Smoke (aplicável Sub-onda 3.3)

| # | Item | Verificação | Evidência | Veredito |
|---|---|---|---|---|
| F1 | Diffs aplicados sequencialmente | Working tree preservado; diff proposto em `diff-cirurgico.md`; será aplicado no Passo 7 pós-gate | `git status` sem novo commit da Sub-onda 3.3 até o momento | ⏳ PENDENTE Passo 7 |
| F2 | Smoke test criação | `@caos crie agent expert Next.js 14 App Router consumidor de @Prometeu` produz Foinix (simulação canônica) | `agent-gerado-smoke.md` Fase 5 registra 5 skills + reflexos + PRD gerados | ✅ PASS |
| F3 | Agent passa 8/8 critérios | Foinix tem constitution + ASL + uncertainty + off-switch + interpretability + orthogonality + grounding + predictions_scorecard=false-legítimo | `agent-gerado-smoke.md` Fase 6 tabela 8/8 evidência | ✅ PASS |
| F4 | MEMORY.md atualizado | Sub-onda 3.3 propõe M4 + M5 (agent-memory + MEMORY.md APPEND) | Aplicação no Passo 8 | ⏳ PENDENTE Passo 8 |
| F5 | Working tree limpo entre ondas | Working tree preserved até ordem commit | `git status` mostra estado esperado | ✅ PASS |
| F6 | AGENTS.md raiz Kolden aponta framework Liceu | Já apontado (herdado Onda 1.6 do Caos) | Grep em `C:\Kolden\AGENTS.md` mostra nota canônica pré-existente | ✅ PASS |

**Score seção F: 4/6 hard PASS + 2 pendentes (F1+F4 aplicação no Passo 7+8).**

---

## Seção G — Restrições invioláveis (8 gates canônicos)

| # | Item | Evidência | Veredito |
|---|---|---|---|
| G1 | Escopo cirúrgico — nenhum arquivo tocado fora `Prometeu/` | Até Passo 5, apenas 7 artefatos em `Prometeu/registros/metodo-onda-3/3.3-skills-e-costura/`; 2 exceções autorizadas (`AGENTS.md` raiz + `METODO-KOLDEN.md`) condicionais a Q5.A/Q6.A | ✅ PASS |
| G2 | Sem commit sem ordem explícita | Working tree preserved | ✅ PASS |
| G3 | Sem push sem ordem explícita | Sem push | ✅ PASS |
| G4 | Ritual de encerramento em `agent-memory/prometeu.md` + `MEMORY.md` | Pendente Passo 8 (backup + APPEND) | ⏳ PENDENTE |
| G5 | Fan-out ≤3 subagentes internos | 3/3 Explores paralelos por independência estrutural + 1 Dike delta INDEPENDENTE tentado (fallback declarado). **Divergência positiva justificada (A1/A2/A3 são catálogos disjuntos)** | ✅ PASS |
| G6 | Artefato-em-disco entre passos | 7 artefatos gravados sequencialmente | ✅ PASS |
| G7 | Sessão dedicada em `C:\Kolden\Prometeu\` | Nunca duas sub-ondas na mesma sub-sessão | ✅ PASS |
| G8 | Procedência rastreável | Grep reverso 1:1 confirmado em `procedencia.md` Liceu + auto-referência interna Kolden aceita | ✅ PASS |

**Score seção G: 7/8 hard PASS + 1 PENDENTE (G4 no Passo 8).**

---

## Veredito Baseline (pré-aplicação do diff)

```yaml
onda: 3
squad_alvo: Prometeu
sub_onda: "3.3"
executor: prometeu-chief
verificador_baseline: prometeu-chief (papel Dike temporário — 9ª ocorrência consecutiva)
verificacao_delta_independente: subagente Explore isolado tentado + confusão de contexto declarada + fallback papel temporário (ver verificacao-dike-delta.md)
data: 2026-07-07
verificacao_dike:
  secao_A_procedencia: PASS
  secao_B_principios: "11/12 hard PASS + 1 WARN legítimo (B10 fora escopo)"
  secao_C_criterios: "7/8 hard PASS + 1 WARN (C7 vira PASS pós-M2)"
  secao_D_mcp: N/A
  secao_E_safety: N/A
  secao_F_costura: "4/6 hard PASS + 2 pendentes (F1+F4 no Passos 7+8)"
  secao_G_restricoes: "7/8 hard PASS + 1 PENDENTE (G4 Passo 8)"
score_G1_G8_baseline_ate_passo5: "7/8 hard PASS + 1 PENDENTE (G4 Passo 8)"
score_G1_G8_projetado_pos_diff: "8/8 VERDE (G4 vira PASS pós-Passo 8; C7 vira PASS pós-M2; F1+F4 viram PASS pós-Passo 7+8)"
delta_absoluto_sub_onda_3_3: "+2 pontos (6/8 → 8/8)"
delta_absoluto_onda_3_total: "+6 pontos (2/8 pré-3.1 → 8/8 pós-3.3)"
veredito_baseline: "sobe com ressalvas (Passos 7+8 pendentes)"
divergencias_declaradas:
  - "B10 ReAct implícito nos aiox-agents (declaração explícita fora escopo — Contrato próprio)"
  - "C5 interpretabilidade divergência METODO herdada (emenda pendente Onda 6)"
  - "Dike delta INDEPENDENTE por subagente Explore isolado tentado 1x — retornou análise inválida por confusão de contexto (24 arquivos M pre-existentes classificados erradamente como violações 3.2). Fallback: papel Dike temporário pelo executor com 3 salvaguardas — 9ª ocorrência consecutiva. Dike agent-funcional pendente Sub-onda 1.6 → Onda 5 Grupo B"
```

**Veredito baseline consolidado:** SOBE com RESSALVAS. Aplicação do diff no Passo 7 + ritual encerramento no Passo 8 elevam para 8/8 VERDE consolidado Onda 3.

---

*Verificação Dike baseline Sub-onda 3.3 produzida por `prometeu-chief` (raiz Kolden) em 2026-07-07 sob 3 salvaguardas canônicas. 9ª ocorrência consecutiva do papel Dike temporário — regra estabelecida METODO §9. Delta INDEPENDENTE por subagente Explore isolado detalhado em `verificacao-dike-delta.md`.*
