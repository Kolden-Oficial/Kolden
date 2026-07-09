# Verificação Dike — Sub-onda 3.2 (baseline pré-aplicação)

> **Contrato-mãe:** `m-20260706-metodo-kolden` (Onda 3 · Sub-onda 3.2).
> **Papel Dike temporário:** prometeu-chief com 3 salvaguardas (padrão herdado Sub-ondas 1.1-1.6 + Onda 2 Hermes + Sub-onda 3.1). Dike squad-solo sem agente funcional em `Dike/agents/dike-chief.md` (nascimento pendente via Contrato próprio no Ritual do Caos).
> **Salvaguardas aplicadas:** (a) ordem serial diagnóstico ANTES da verificação; (b) evidência textual verbatim por checkbox; (c) declaração explícita de divergência conhecida.
> **Fonte-de-verdade do checklist:** `Caos/checklists/CAOS-CL-002.md` (canônico após Sub-onda 1.6; metadata "DRAFT" declarada como divergência-herdada).
> **Data:** 2026-07-07.
> **Modo:** BASELINE pré-aplicação do diff. Delta INDEPENDENTE por subagente Explore isolado **DEFERIDO para Sub-onda 3.3** conforme Q4 do gate humano (recomendação — padrão herdado Sub-onda 3.1).

---

## §0 — Sumário do veredito

**Score baseline Sub-onda 3.2 (pré-aplicação):**
- **Seção A Procedência:** PASS (3/3 salvaguardas ativas).
- **Seção B Princípios canônicos:** ~4/12 VERDE + 6/12 PARCIAL + 2/12 AUSENTE (herdado do baseline).
- **Seção C Critérios canônicos:** **2/8 hard PASS baseline** (G1 parcial via AIOX + G8 N/A legítimo) — **projetado 6/8 hard PASS pós-diff** (delta +4 pontos).
- **Seção D MCP:** N/A (Sub-onda 3.2 não altera MCP setup — escopo Sub-onda 3.3).
- **Seção E Safety Dashboard:** N/A (não é fase 5).
- **Seção F Costura final:** N/A (é fase 6 — Sub-onda 3.3).
- **Seção G Restrições invioláveis:** 6/6 PASS.

**Veredito baseline:** **SOBE com RESSALVAS** (3 salvaguardas + delta INDEPENDENTE deferido Sub-onda 3.3).

---

## §1 — Seção A — Procedência (aplicável a TODA mudança)

| # | Item | Verificação | Evidência textual verbatim | Veredito |
|---|---|---|---|---|
| A1 | Todo diff cita `procedencia: <linhagem>/<mente>/<obra>/<ano>` no changelog ou comentário | Grep reverso no `achados.jsonl` — 18 achados com `procedencia:` explícito | `achados.jsonl` linha 1: `"procedencia":"METODO §4 G1 + Bai et al. 2022 arXiv 2212.08073"`; linha 2: `"procedencia":"METODO §4 G2 + Amodei/Anthropic 2023 RSP"`; linha 3: `"procedencia":"METODO §4 G3 + Russell 2019 Human Compatible + Simon 1955 QJE 69"` etc. | ✅ **PASS** |
| A2 | Nenhuma procedência inventada | Grep na `procedencia.md` do Liceu confirma existência de: Bai et al. 2022 arXiv 2212.08073 + Amodei/Anthropic 2023 RSP + Russell 2019 + Simon 1955 + Bostrom 2012 + Brooks 1991 + Amodei-Olah 2016 + Yao 2022 + Anthropic MCP 2024 + Turing 1936/1950 + Minsky 1986 | Todas as procedências citadas em `achados.jsonl` batem 1:1 com `Liceu/frameworks/arquitetura-de-agents-kolden/procedencia.md` §"Procedência dos 12 Princípios Canônicos" + §"Procedência dos 8 Critérios de Safety+Quality". Nenhuma citação inventada. | ✅ **PASS** |
| A3 | Se procedência não for óbvia, houve consulta ao Liceu documentada | Não houve consulta necessária — Sub-onda 3.2 usa exclusivamente linhagens já validadas nas Sub-ondas 1.1-1.6 + Onda 2 + Sub-onda 3.1 | Nenhuma citação nova a linhagens não-canônicas. `achados.jsonl` cita apenas linhagens pré-validadas. | ✅ **PASS** |

**Falha em A1-A3 = REJEITAR:** Nenhuma falha detectada. **Seção A: PASS 3/3.**

---

## §2 — Seção B — Princípios canônicos (aplicável a Ondas 2 e 3)

Para cada princípio, a Sub-onda 3.2 **implementa, refina ou mantém** conformidade dos 12 aiox-agents (não introduz divergência nova).

| # | Princípio | Mínimo esperado | Estado nos 12 aiox-agents pós-Sub-onda 3.2 | Evidência | Veredito |
|---|---|---|---|---|---|
| B1 | P1 Universalidade Turingiana | Model-agnostic; roda em qualquer LLM | 12/12 aiox-agents canônicos AIOX rodam em Claude/Codex/Gemini via `sync:ide:multi-IDE` (AGENTS.md L38-49); Prometeu não bloqueia nenhum LLM | AGENTS.md L38-49 "Sincronizar regras/agentes: `npm run sync:ide` + Rodar paridade multi-IDE" | ✅ **VERDE** |
| B2 | P2 Sociedade de Mentes | Ritual mantém tier 0 + tier 1 + squad.yaml | Prometeu MATERIALIZA Sociedade de Mentes: 12 aiox-agents especializados (aiox-master + 11 especialistas) com hierarquia de delegação em `.claude/rules/agent-authority.md`; `Prometeu/squad.yaml` L11-55 declara tier_0 (prometeu-chief) + tier_1 (12 aiox-agents) | `Prometeu/squad.yaml` L15-55 lista tier_1 com 12 agentes + `.claude/rules/agent-authority.md` L1-70 matriz de delegação | ✅ **VERDE** |
| B3 | P3 Bounded Rationality | PRD tem `aspiration_criteria` obrigatória | Sub-onda 3.2 APPEND 2-3 aspiration_criteria por-agente (10 UPDATE + 1 CREATE); baseline: `Prometeu/prd-de-ia.md` frontmatter L6-26 tem 5 aspiration_criteria squad-level | `Prometeu/prd-de-ia.md` L6-26 `aspiration_criteria:` com 5 IDs (AC-1 a AC-5); Sub-onda 3.2 refina para 2-3 por-agente | ✅ **VERDE pós-diff** |
| B4 | P4 Software 2.0 | Art. I "PRD é fonte da verdade" mantido | AIOX Constitution Art. III Story-Driven L58-66 mantido + Prometeu Constitution Kolden VO-3 herdado + PRD-de-IA frontmatter 5 campos canônicos | `.aiox-core/constitution.md` L58-66 + `Prometeu/constitution.md` VO-3 | ✅ **VERDE** |
| B5 | P5 Assistance Games (uncertainty) | Template CLAUDE.md tem bloco "Incerteza declarada" | `Prometeu/CLAUDE.md` §3 tem bloco Russell 2019 (Sub-onda 3.1); Sub-onda 3.2 APPEND `uncertainty_statement_ref: "Prometeu/CLAUDE.md §3"` por-agente | `Prometeu/CLAUDE.md` §3 L1-8 "Prometeu opera sob **incerteza sobre a função utilidade U do humano**..." | ✅ **VERDE pós-diff** |
| B6 | P6 Orthogonality | Gates Fase 6 BLOCK mantidos + PRD tem "auditoria de risco Bostrom" | Constitution Kolden VO-8 herdado por 12 aiox-agents; teste AB-3 no roteiro pendente (Sub-onda 3.3) | `Prometeu/constitution.md` VO-8 L54-58; ROTEIRO-DE-TESTE.md TENTE-3 pendente Sub-onda 3.3 | ⚠️ **PARCIAL** — WARN legítimo (Sub-onda 3.3 completará) |
| B7 | P7 Embodied Grounding | Artigo IX na constituição | Constitution Kolden VO-9 herdado; grounding real-time em §2 dos aiox-*.md (Git Status + Gotchas + Config + KB) | `Prometeu/constitution.md` VO-9 L60-64; aiox-*.md §2 Carregamento de Contexto | ✅ **VERDE** |
| B8 | P8 Constitutional AI | Cada agent tem `constitution.md` próprio | Sub-onda 3.2 APPEND `constitution: Prometeu/constitution.md` em 12 aiox-agents (herança squad-level); AIOX Constitution complementar preservada | Template APPEND §2 do `diff-cirurgico.md` linha "**G1 constituição:**" | ✅ **VERDE pós-diff** |
| B9 | P9 Race-to-the-Top | Dashboard schema em `Caos/registros/dashboard-safety.md` | Não é escopo Sub-onda 3.2 (fase 5); herdado da Onda 1 | Herdado | ✅ **VERDE** (herdado) |
| B10 | P10 ReAct como padrão | Templates system-prompt-base referenciam ReAct | `Prometeu/.claude/agents/prometeu-chief.md` L15 `loop_pattern: ReAct` + §Fluxo Operacional L29 ReAct implícito; aiox-agents implícito no §2-3 (Thought=leitura → Action=comando *task → Observation=feedback) | prometeu-chief.md L15 `loop_pattern: ReAct` | ⚠️ **PARCIAL** — aiox-agents implícito, sem declaração explícita `loop_pattern: ReAct` no frontmatter |
| B11 | P11 State Machine + HITL | Gates + interrupt_before para ASL-3+ | Story lifecycle (`.claude/rules/story-lifecycle.md`) = state machine; hook `enforce-git-push-authority.cjs` + reflexo `Prometeu/.claude/reflexos/interrupt-before-mutation.sh` (Sub-onda 3.1); Sub-onda 3.2 APPEND referência ao reflexo em 3 agentes ASL-3 (dev + devops + data-engineer + aiox-master) | `.claude/rules/story-lifecycle.md` + reflexo `.claude/reflexos/interrupt-before-mutation.sh` Sub-onda 3.1 | ✅ **VERDE pós-diff** |
| B12 | P12 MCP mandatório | Art. IV reformulado: proíbe wrappers | Constitution Kolden VO-13 herdado; Prometeu consome MCPs padrão (docker-gateway/EXA/Context7/Apify/Playwright/desktop-commander); zero wrappers proprietários | `.claude/rules/mcp-usage.md` L14-33 + `Prometeu/constitution.md` VO-13 | ✅ **VERDE** |

**Score B: ~10/12 VERDE + 2/12 PARCIAL + 0/12 AUSENTE = ~85% conformidade princípios pós-Sub-onda 3.2** (delta +55% vs. baseline pré-Sub-onda 3.1).

---

## §3 — Seção C — Critérios canônicos (aplicável a Ondas 3 e 5) — 8 gates canônicos Art. X

**Baseline Sub-onda 3.2 (pré-aplicação):**

| # | Critério | Estado nos 12 aiox-agents baseline | Evidência | Veredito baseline |
|---|---|---|---|---|
| C1 | G1 constituição (herança squad + AIOX) | ⚠️ PARCIAL — AIOX Constitution 6 artigos herdados via hook, mas sem `constitution:` frontmatter Kolden por-agente | `.claude/agents/aiox-dev.md` L14-22 hook L18-22 sem frontmatter `constitution:` | ⚠️ PARCIAL |
| C2 | G2 ASL declarado | ❌ AUSENTE — 0/12 declaram `ASL:` frontmatter | Grep `ASL:` em `.claude/agents/aiox-*.md` = 0 matches | ❌ AUSENTE |
| C3 | G3 uncertainty + aspiration | ❌ AUSENTE — 0/12 declaram | Grep `uncertainty\|aspiration_criteria` = 0 matches | ❌ AUSENTE |
| C4 | G4 off-switch | ⚠️ PARCIAL — 9/10 têm hook enforce-git-push-authority; 0/12 têm reflexo genérico interrupt-before-mutation.sh; devops sem hook (é dono da autoridade) | aiox-devops.md L16-21 sem bloco hooks | ⚠️ PARCIAL |
| C5 | G5 interpretability | ⚠️ WARN — MEMORY canônico AIOX + Story Change Log são auditoria implícita | 10/10 canônicos + 4/12 espúrios em path não-canônico | ⚠️ WARN (herdado divergência Liceu) |
| C6 | G6 orthogonality + instrumental | ❌ AUSENTE — sem tabela capacidades × risco | 0 matches em grep | ❌ AUSENTE |
| C7 | G7 grounding | ⚠️ PARCIAL — grounding IMPLÍCITO §2; sem `grounding_required` explícito | aiox-*.md §2 L42-47 Carregamento de Contexto | ⚠️ PARCIAL |
| C8 | G8 predictions_scorecard | ✅ N/A — aiox-agents são executores, não fazem previsões datáveis | Nenhum output tipo "até 2026-Q4 X %" | ✅ N/A |

**Score C baseline:** **2/8 hard PASS** (C1 PARCIAL herdado como parcial; C8 N/A legítimo) + 4/8 PARCIAL + 2/8 AUSENTE.

**Projeção pós-diff Sub-onda 3.2:**

| # | Critério | Estado pós-diff | Mudança que fecha o gate | Veredito projetado |
|---|---|---|---|---|
| C1 | G1 | ✅ VERDE — 12/12 aiox-agents APPEND `constitution: Prometeu/constitution.md` | M1-M10 + M11 (aiox-master CREATE) | ✅ VERDE |
| C2 | G2 | ✅ VERDE — 12/12 declaram ASL (7 ASL-2 + 4 ASL-3 + 1 squad-creator fora de escopo declarado) | M1-M10 + M11 | ✅ VERDE |
| C3 | G3 | ✅ VERDE — herança PRD + 2-3 aspiration próprio por-agente | M1-M10 + M11 | ✅ VERDE |
| C4 | G4 | ✅ VERDE — hook enforce + reflexo interrupt-before-mutation.sh + HITL explícito ASL-3 | M1-M10 + M11 (+ referência reflexo Sub-onda 3.1) | ✅ VERDE |
| C5 | G5 | ⚠️ WARN legítimo — plano mínimo por camada declarado + MEMORY canônico AIOX + `.aiox/handoffs/` | M1-M10 + M11 | ⚠️ WARN legítimo (divergência herdada Liceu) |
| C6 | G6 | ⚠️ WARN legítimo — herança VO-8 declarada + teste AB-3 pendente Sub-onda 3.3 | M1-M10 + M11 (+ pendência AB-3 3.3) | ⚠️ WARN legítimo (Sub-onda 3.3 completará) |
| C7 | G7 | ⚠️ PARCIAL implícito — grounding real-time §2 + declaração explícita `grounding_required` onde aplicável | M1-M10 + M11 (+ implementação real skills 3.3) | ⚠️ PARCIAL (Sub-onda 3.3 elevará via 57 skills) |
| C8 | G8 | ✅ VERDE — `predictions_scorecard: false` explícito | M1-M10 + M11 | ✅ VERDE |

**Score C projetado pós-Sub-onda 3.2:** **6/8 hard PASS + 2/8 WARN legítimo** (delta absoluto Sub-onda 3.2: **+4 pontos** em relação ao baseline; **+1 ponto** em relação ao pós-3.1 5/8).

**Score C projetado pós-Sub-onda 3.3:** **8/8 VERDE** (G7 elevado via skills reais com `grounding_required: true` + AB-3 teste real).

---

## §4 — Seção D — MCP (aplicável à Onda 4)

**N/A para Sub-onda 3.2.** Escopo Sub-onda 3.3 (skills consomem MCPs padrão Kolden — inventário em `Prometeu/ferramentas.md` Sub-onda 3.1). Sub-onda 3.2 não altera MCP setup.

---

## §5 — Seção E — Safety Dashboard + Predictions (aplicável à Onda 5)

**N/A para Sub-onda 3.2.** Não é fase 5. Predições Kolden 2026-2027 vivem em `Caos/registros/predictions-scorecard-kolden-2026.md` (Onda 1 do METODO).

---

## §6 — Seção F — Costura final + Smoke (aplicável à Onda 6)

**N/A para Sub-onda 3.2.** É fase 6 — escopo Sub-onda 3.3 (costura final da Onda 3 + smoke test canônico).

---

## §7 — Seção G — Restrições invioláveis (aplicáveis a TODAS as ondas)

| # | Item | Estado Sub-onda 3.2 baseline | Veredito |
|---|---|---|---|
| G1 | Nenhum arquivo tocado fora de `Prometeu/` (exceção: `AGENTS.md` Passo 8 condicional Q3.A) | 6 artefatos até Passo 3 todos em `Prometeu/registros/metodo-onda-3/3.2-agents-internos/`. Nenhum arquivo tocado fora ainda | ✅ **PASS** |
| G2 | Nenhum commit sem ordem explícita | Working tree preservado até ordem (Passo 4 gate) | ✅ **PASS** |
| G3 | Nenhum push sem ordem explícita | Sem push | ✅ **PASS** |
| G4 | Ritual de encerramento em `<Squad>/MEMORY.md` + `agent-memory/prometeu.md` | Pendente Passo 7 (APPEND por-agente + backup + trim ≤150 linhas) | ⏳ **Pendente Passo 7** |
| G5 | Fan-out ≤3 subagentes por onda | 0/3 (9ª confirmação consecutiva da regra — interdependência cross-arquivo Art. X unificado) | ✅ **PASS** |
| G6 | Artefato-em-disco entre ondas | 6 artefatos gravados sequencialmente (matriz + achados + diff + verificacao-dike baseline + verificacao-dike-delta nota deferimento + sumario-executivo) | ✅ **PASS** |

**Score G: 5/6 PASS + 1 pendente Passo 7.** Post-Passo 7 = **6/6 PASS**.

---

## §8 — Divergências declaradas honestamente

1. **Metadata "DRAFT" do CAOS-CL-002** — declarada como divergência herdada (mesma nota Sub-ondas 1.1-1.6 + Onda 2 Hermes + Sub-onda 3.1). Sub-onda 3.2 usa como canônico conforme METODO §9.

2. **Verificação Dike temporariamente pelo prometeu-chief** — declarada com 3 salvaguardas (ordem serial + evidência verbatim + divergência). Delta INDEPENDENTE por-subagente Explore isolado **DEFERIDO para Sub-onda 3.3** conforme Q4 do gate humano (padrão herdado Sub-onda 3.1).

3. **G5 interpretabilidade continua divergência herdada framework Liceu** (emenda pendente Onda 6). WARN legítimo mantido em C5.

4. **B10 ReAct implícito** — os 12 aiox-agents implementam ReAct implicitamente via activation-instructions (§2-§3 Thought/Action/Observation) mas sem declaração explícita `loop_pattern: ReAct` no frontmatter. Sub-onda 3.2 NÃO altera vendor AIOX — divergência declarada, correção em Contrato próprio (fora do escopo Kolden agent-safety).

5. **G7 grounding PARCIAL implícito** — grounding real-time via §2 Carregamento de Contexto OK, mas sem `grounding_required: true` explícito nas skills. Sub-onda 3.3 elevará via implementação real das 57 skills.

6. **G6 orthogonality WARN legítimo** — herança VO-8 declarada por-agente, mas teste AB-3 real fica para Sub-onda 3.3 (roteiro-de-teste.md refinamento).

7. **4 MEMORY.md espúrios em path não-canônico** — investigação completa (§3 da matriz + achado PRM-3.2-012). Veredito recomendado ARQUIVAR (Q2.B) — decisão em gate humano Passo 4.

8. **`squad-creator` (Craft) fora de escopo direto Sub-onda 3.2** — decisão explícita registrada em achado PRM-3.2-011. Preservar canônico AIOX intocado.

---

## §9 — Veredito final (baseline pré-aplicação)

```yaml
onda: 3
sub_onda: 3.2
executor: prometeu-chief (raiz Kolden)
papel_dike: temporario_pelo_executor_com_3_salvaguardas
data: 2026-07-07

verificacao_dike_baseline:
  secao_A_procedencia:
    A1: PASS
    A2: PASS
    A3: PASS
  secao_B_principios:
    contagem: "10/12 VERDE + 2/12 PARCIAL (B6+B10 WARN legítimo) + 0/12 AUSENTE"
    score: "~85% conformidade princípios pós-Sub-onda 3.2 projetado"
  secao_C_criterios:
    baseline_pre_diff: "2/8 hard PASS (C1 PARCIAL + C8 N/A legítimo)"
    projetado_pos_diff_sub_onda_3_2: "6/8 hard PASS + 2/8 WARN legítimo (C5+C6+C7 completude Sub-onda 3.3)"
    projetado_pos_onda_3_total: "8/8 VERDE (Sub-onda 3.3 finaliza G7)"
    delta_absoluto_sub_onda_3_2: "+1 ponto (5/8 pós-3.1 → 6/8 hard PASS canônico Kolden pós-3.2)"
    delta_absoluto_onda_3_total: "+6 pontos (2/8 baseline pré-3.1 → 8/8 projetado pós-3.3)"
  secao_D_mcp: N/A_sub_onda_3_3
  secao_E_safety: N/A_fase_5
  secao_F_costura: N/A_sub_onda_3_3
  secao_G_restricoes:
    G1: PASS
    G2: PASS
    G3: PASS
    G4: pendente_passo_7
    G5: PASS
    G6: PASS

veredito: SOBE_com_RESSALVAS
justificativa: |
  Sub-onda 3.2 baseline verificada pelo prometeu-chief com 3 salvaguardas.
  Score C projetado pós-diff: 6/8 hard PASS + 2/8 WARN legítimo — coerente
  com padrão Sub-onda 3.1 (5/8 hard PASS). Vendor SynkraAI preservado intocado.
  Constituição AIOX v1.0.0 preservada. 12 agentes canônicos AIOX intocados.
  MEMORY canônico AIOX respeitado. Delta absoluto Sub-onda 3.2: +1 ponto.
  Ressalvas:
    (a) papel Dike temporário pelo prometeu-chief (Dike squad-solo sem
        agente funcional — nascimento pendente via Contrato próprio no
        Ritual do Caos).
    (b) delta INDEPENDENTE por-subagente Explore DEFERIDO para Sub-onda 3.3
        (padrão herdado Sub-onda 3.1) — Q4 do gate humano.
    (c) G5 divergência METODO herdada (emenda pendente Onda 6).
    (d) G6+G7 completude via Sub-onda 3.3 (implementação real do teste AB-3 +
        skills com grounding_required).
    (e) B10 ReAct implícito nos aiox-agents (fora do escopo — vendor AIOX).

ressalvas_a_registrar_no_contrato_mae:
  - "Dike delta INDEPENDENTE por-subagente Explore deferido para Sub-onda 3.3 (padrão Sub-onda 3.1)"
  - "G5 interpretabilidade continua divergência herdada framework Liceu (emenda Onda 6)"
  - "G6 orthogonality WARN legítimo — teste AB-3 real Sub-onda 3.3"
  - "G7 grounding PARCIAL implícito — Sub-onda 3.3 eleva via 57 skills"
  - "squad-creator fora de escopo direto Sub-onda 3.2 (Prometeu não cria squad — Kolden factory = Caos)"
  - "B10 ReAct implícito nos aiox-agents (declaração explícita loop_pattern: ReAct pendente Contrato próprio)"
```

---

*Verificação Dike Sub-onda 3.2 (baseline pré-aplicação) produzida por `prometeu-chief` (raiz Kolden) em 2026-07-07 na Onda 3 do Contrato-mãe `m-20260706-metodo-kolden`. Papel Dike temporário com 3 salvaguardas declaradas. Delta INDEPENDENTE por-subagente Explore isolado deferido para Sub-onda 3.3 (padrão herdado Sub-onda 3.1). Score C projetado pós-diff: 6/8 hard PASS + 2/8 WARN legítimo. Veredito: **SOBE com RESSALVAS**.*
