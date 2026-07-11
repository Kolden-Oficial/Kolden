---
tipo: registro
area: Olimpo
up: "[[Olimpo/_MOC-olimpo]]"
relacionado:
  - "[[Olimpo/registros/metodo-onda-4/diff-cirurgico|diff-cirurgico]]"
  - "[[Olimpo/registros/metodo-onda-4/PROMPT-DE-ABERTURA|PROMPT-DE-ABERTURA]]"
  - "[[Olimpo/registros/metodo-onda-4/sumario-executivo|sumario-executivo]]"
  - "[[Olimpo/registros/metodo-onda-4/verificacao-dike|verificacao-dike]]"
  - "[[Olimpo/registros/metodo-onda-4/verificacao-dike-delta|verificacao-dike-delta]]"
---

# Matriz de Conformidade — Onda 4 do METODO Kolden (Olimpo)

> **Contrato-mãe:** `Olimpo/contratos/missoes/m-20260706-metodo-kolden.yaml` — bloco `resultado_ondas_2_a_26.onda_4`
> **Norma canônica:** `C:\Kolden\METODO-KOLDEN.md` v1.1 (12 princípios + 5 camadas + 8 critérios + 14 modelos + convenção `@` vs `/` + 5 buckets)
> **Checklist Dike:** `C:\Kolden\Caos\checklists\CAOS-CL-002.md` v1.0 canônico (Seções A-G)
> **Executor:** olimpo-chief (a nascer no Passo 5 desta Onda 4) — sessão dedicada `C:\Kolden\Olimpo\`
> **Fan-out:** 0/3 (interdependência cross-artefato — 11ª ocorrência do padrão canônico)
> **Data:** 2026-07-09
> **Precedente herdado:** Hermes/Nous Onda 2 (delta +7) + Prometeu/SynkraAI Onda 3 (delta +6) — **3ª ocorrência** do padrão **INVÓLUCRO sobre MUTAÇÃO DE CÓDIGO** (regra invariante E1 do METODO v1.1, agora 4x confirmada empiricamente)

---

## §1 — Achado arquitetural central (invariante que rege a Onda 4)

Olimpo é o **primeiro squad Camada 3-4 combinada** padronizado pelo METODO. Ele reúne dois papéis constitucionalmente distintos (§3 METODO):
- **Camada 3 (Zeus, CEO/Orquestrador):** decompõe a missão descida pelo Hermes, aplica `routing_triggers`, roteia para 1-8 executivos, arbitra divergência entre executivos ou escala ao Ronan.
- **Camada 4 (7 executivos: Poseidon COO · Apolo CMO · Hefesto CTO · Hades CIO · Atena CAIO · Plutos CFO · Afrodite CRO):** cada um traduz sua fatia da missão na linguagem técnica da disciplina, assina sua seção do Contrato, escala ao Zeus quando cross-domínio.

Além disso, **Olimpo é o DONO do Contrato de Missão** — a estrutura mais estratégica do workspace Kolden vive em `Olimpo/contratos/` (schema, template, exemplo + 10 missões lavradas em `contratos/missoes/`). Todo o pipeline `Ronan → Hermes → Zeus → 7 deuses → Operacional → Dike ↑ → Hermes ↑ → Ronan` atravessa este squad duas vezes (descida + subida).

**Origem vendorizada:** Olimpo é fork do `c-level-squad` do repositório `ohmyjahh/xquads-squads` (commit `dcb32f35f...`, MIT). O vendor entrega os 8 agents mitológicos com persona rica em PT-BR, 14 skills executivas cross-squad já traduzidas, `squad.yaml` com 6 vetos operacionais declarados e uma pasta `contratos/` com schema+template+exemplo já prontos. **A camada Kolden PT-BR canônica precisa envelopar** (não mutar) esse vendor com CLAUDE.md + PRD + constitution + ferramentas + roteiro-de-teste + agent-chief + reflexo interrupt + settings.json + agent-memory — **8-9 arquivos novos**.

**Regra invariante 4x confirmada (E1 do METODO v1.1):** INVÓLUCRO sobre MUTAÇÃO. Vendor xquads preservado intocado (~40 arquivos em `agents/`, `tasks/`, `workflows/`, `data/`, `checklists/`, `config/`, `prd/`, `_origem.md`). Camada Kolden externa declara fronteira em ≥5 pontos (CLAUDE.md §Fronteira, squad.yaml.fronteira_vendor_xquads, ferramentas.md §3, roteiro-de-teste §Fronteira, .claude/settings.json deny cirúrgico).

**Distinção 3-way MEMORY (E4 pendente 2ª confirmação):** Olimpo tem hoje **1 squad-level** (`Olimpo/MEMORY.md`, 31 linhas — minimalista) + **agent-level parcial** (`Olimpo/agent-memory/afrodite.md`, `plutos.md`). Para conformidade E4 do METODO precisamos: MEMORY.md squad-level + agent-memory/olimpo.md agent-chief-level + preservação dos 2 agent-memory já existentes (afrodite, plutos) como padrão dos futuros 6 outros deuses. **2ª ocorrência empírica da distinção 3-way MEMORY confirmada nesta Onda** (1ª foi Prometeu Sub-onda 3.2 com Prometeu/MEMORY.md × Prometeu/agent-memory/prometeu.md × `.aiox-core/development/agents/<id>/MEMORY.md`). Canoniza em v1.2 §5 (Passo 9 opcional).

---

## §2 — Matriz 12 princípios × Olimpo (§2 METODO)

Para cada princípio: (a) estado atual no Olimpo, (b) evidência textual verbatim, (c) gap identificado, (d) mudança proposta no diff.

### P1 — Universalidade Turingiana (Turing 1936/1950)
- **Estado atual:** IMPLÍCITO — Olimpo agents não declaram `model-agnostic`. O `squad.yaml` cita `aios: minVersion: 4.0.0` (framework de execução), não LLM-agnostic. Nenhum agent (zeus, apolo, plutos...) especifica provider.
- **Evidência:** `Olimpo/squad.yaml` L7-8 `aios:\n  minVersion: "4.0.0"\n  type: squad`. Grep em `Olimpo/agents/*.md` por "model-agnostic" ou "OpenRouter" → **0 hits**.
- **Gap:** P1 sem declaração canônica no CLAUDE.md do squad.
- **Diff:** CLAUDE.md §Persona declara "opera em qualquer LLM competente (OpenAI/Anthropic/Google/Mistral/OpenRouter)" — padrão herdado de Hermes/Prometeu.

### P2 — Sociedade de Mentes (Minsky 1986)
- **Estado atual:** ✅ CONFORME — Olimpo é squad de 8 agents por design (Zeus tier 0 + 7 executivos tier 1). Decomposição por especialização = princípio Minsky puro. Roteamento explícito via `routing_logic` de Zeus (11 domínios cobertos).
- **Evidência:** `Olimpo/agents/zeus.md` L122-165 (`routing_logic:` com 11 blocos: operational_challenge, marketing_challenge, technology_challenge, information_systems_challenge, ai_strategy_challenge, financial_challenge, revenue_challenge, vision_culture_fundraise, delegates_to_seed para hestia/cairos/ananke/nomos/pactolo/emporos). `Olimpo/squad.yaml` L23-33 `components.agents:` lista os 8. `Olimpo/README.md` L18-27 (tabela de 8 deuses).
- **Gap:** nenhum P2 estruturalmente. Falta ancorar Minsky no CLAUDE.md como fundamento.
- **Diff:** CLAUDE.md declara "P2 Sociedade de Mentes é a arquitetura-mãe do Olimpo — decomposição executiva por disciplina bate agent-monólito genérico".

### P3 — Bounded Rationality (Simon 1955, 1947)
- **Estado atual:** AUSENTE — nenhum agent Olimpo declara `aspiration_criteria` (3-5 metas mensuráveis com `limite:` e `fonte_evidencia:`). `squad.yaml` tem `cross_cutting.quality_standards.min_score: 7.0` (um limite genérico), sem metas por-agent.
- **Evidência:** `Olimpo/squad.yaml` L46-47 `cross_cutting:\n  quality_standards:\n    min_score: 7.0`. Grep `aspiration_criteria` em `Olimpo/**` → **0 hits**.
- **Gap:** G3 do METODO Art. X BLOCK. PRD ausente = P3 sem manifestação canônica.
- **Diff:** `prd-de-ia.md` cria `aspiration_criteria:` (frontmatter) com 4-5 KPIs mensuráveis de Camada 3-4 (arbitragem_zero, DoR_completo_100%, decomposicao_com_premissa, entrega_scqa_10min, contrato_ratificado_100%).

### P4 — Software 2.0 (Karpathy 2017)
- **Estado atual:** PARCIAL — Olimpo tem PRDs pontuais em `Olimpo/prd/` (`afrodite.md`, `plutos.md` — 2 de 8, minimalistas), mas **sem PRD do squad** (que seria fonte-da-verdade dos 5 campos Art. X). Persona vive nos 8 arquivos `agents/*.md` (formato vendor).
- **Evidência:** `ls Olimpo/prd/` → apenas `afrodite.md` + `plutos.md`. `ls Olimpo/agents/*.md` → 8 arquivos (formato vendor com yaml embutido).
- **Gap:** P4 sem `prd-de-ia.md` raiz do squad. Persona ≠ PRD.
- **Diff:** CREATE `Olimpo/prd-de-ia.md` (fonte-da-verdade). PRDs vendor por-agent em `prd/` permanecem intocados (fronteira vendor).

### P5 — Assistance Games (Hadfield-Menell/Russell 2016, Russell 2019)
- **Estado atual:** AUSENTE — nenhum bloco "Incerteza declarada" em CLAUDE.md do squad (que não existe). Zeus e executivos declaram princípios operacionais fortes, mas não a epistemologia bayesiana da assistência (utilidade U latente).
- **Evidência:** Grep `uncertainty` ou `incerteza` em `Olimpo/**` → **0 hits**. Grep `Russell` → **0 hits** (mas 6 vetos operacionais existem em squad.yaml L48-53).
- **Gap:** G3 do METODO Art. X BLOCK (uncertainty statement obrigatório).
- **Diff:** CLAUDE.md §Incerteza declarada + PRD frontmatter `uncertainty_statement:`. Bloco Russell 2019 canônico herdado de Hermes/Prometeu.

### P6 — Orthogonality + Instrumental Convergence (Bostrom 2012, 2014)
- **Estado atual:** IMPLÍCITO — squad.yaml tem `bypass_de_contrato_de_missao` como veto (bloqueia missão sem passagem canônica pelo Hermes-DoR-Zeus), o que é uma forma de contenção de escalada. Não há tabela auditoria capacidades × risco por-agent.
- **Evidência:** `Olimpo/squad.yaml` L52 `bypass_de_contrato_de_missao: "HALT se a missão chegar ao executivo sem passar pelo Contrato de Missão (Hermes-DoR-Zeus). Sem intencao_original lacrada, não desce ao operacional."`
- **Gap:** G6 tabela auditoria por-agent inexistente.
- **Diff:** PRD §11.6 Tabela auditoria capacidades × risco (padrão herdado Hermes/Prometeu) com 4 linhas: rotear-missão / arbitrar-executivos / consolidar-síntese / assinar-Contrato. Teste AB-3 no roteiro-de-teste.

### P7 — Embodied Grounding (Brooks 1990, 1991)
- **Estado atual:** IMPLÍCITO — `decisao_sem_premissa` veto exige "premissas explícitas, dado/evidência e horizonte de revisão"; `framework_apresentado_como_lei` exige "usando o framework X de Y, para esta empresa, hoje, supondo Z". Ambos operacionalizam grounding, mas sem citar Art. IX.
- **Evidência:** `Olimpo/squad.yaml` L49 `decisao_sem_premissa: "HALT em recomendação estratégica/executiva sem premissas explícitas, dado/evidência e horizonte de revisão. Decisão sem premissa é palpite rotulado."`; L50 `framework_apresentado_como_lei`.
- **Gap:** convenção `grounding_required: true|false` por-skill não existe. 14 SKILL.md têm frontmatter mas nenhum declara `grounding_required`.
- **Diff:** CLAUDE.md §Restrições referencia Art. IX; PRD §11.7 declara "skills do Olimpo tratam de fatos datáveis (dado de mercado, número de deal, cotação, benchmark) → `grounding_required: true` obrigatório onde aplicável". Ferramentas.md §5 documenta a convenção. **Skills existentes não são refactoradas nesta Onda** (fronteira preservação; migração é backlog Fase 3 residual).

### P8 — Constitutional AI (Bai et al. 2022)
- **Estado atual:** PARCIAL — squad.yaml tem 6 vetos operacionais (decisao_sem_premissa, arbitragem_sem_escalada, framework_apresentado_como_lei, promessa_de_resultado, bypass_de_contrato_de_missao, credencial_texto_puro). Constituição por-agent ausente. Cada agent vendor tem `core_principles` (10 em zeus.md, similar nos outros) mas não formatado como veto-operacional.
- **Evidência:** `Olimpo/squad.yaml` L46-53 `cross_cutting.veto:` com 6 princípios. `Olimpo/agents/zeus.md` L110-120 `core_principles:` com 10 aforismos ("Visão sem execução é alucinação"...) — filosofia, não veto binário.
- **Gap:** G1 do METODO Art. X BLOCK. Falta `constitution.md` canônico com 10-15 princípios veto-operacionais formatados no padrão Kolden.
- **Diff:** CREATE `Olimpo/constitution.md` com 15 princípios veto (10 herdados de Hermes/Prometeu + 5 específicos Camada 3-4: sem-decisao-sem-premissa, sem-arbitragem-sem-escalada, sem-framework-como-lei, sem-promessa-de-resultado, sem-bypass-Contrato). **Regra de precedência (E6 canonizado v1.1):** Kolden Art. X prevalece em conflito com os 6 vetos de squad.yaml. Co-existência declarada (mesmo padrão Prometeu/AIOX 3.1).

### P9 — Race-to-the-Top em Safety (Anthropic 2021, Amodei 2023 RSP)
- **Estado atual:** AUSENTE — ASL não declarado em nenhum lugar do Olimpo. `predictions_scorecard` não declarado.
- **Evidência:** Grep `ASL` em `Olimpo/**` → **0 hits**. Grep `predictions_scorecard` → **0 hits**.
- **Gap:** G2 BLOCK + G8 declaração ausente.
- **Diff:** PRD frontmatter `ASL: 3` (justificativa: escala missão a board/investidor, decisão de M&A/pivot, aprovação de captação = mutação externa irreversível na reputação e no capital). `predictions_scorecard: false` (Zeus consolida previsões dos executivos mas não emite predições próprias datáveis — mesmo racional do Hermes). Justificativa em §11.2 e §11.8.

### P10 — ReAct como Agent-Loop Padrão (Yao et al. 2022)
- **Estado atual:** AUSENTE — nenhum agent Olimpo nomeia `loop_pattern: ReAct`. O padrão vendor xquads usa "Como o Zeus Opera" (6 passos) sem citar Yao.
- **Evidência:** `Olimpo/agents/zeus.md` L212-221 seção "Como o Zeus Opera" com 6 passos operacionais. Grep `ReAct` em `Olimpo/**` → **0 hits**.
- **Gap:** convenção METODO §5 `system-prompt-base.md` v2.5.1 pede `loop_pattern: ReAct` declarado no CLAUDE.md/PRD.
- **Diff:** CLAUDE.md §Loop pattern nomeia ReAct; PRD frontmatter `loop_pattern: ReAct`; agent-def `olimpo-chief.md` idem. Padrão vendor "6 passos do Zeus Opera" preservado (fronteira).

### P11 — State Machine + HITL (LangGraph + Russell 2017)
- **Estado atual:** PARCIAL — o veto `arbitragem_sem_escalada` operacionaliza HITL ("Zeus não decide pelo humano em conflito de domínio"). Não há reflexo `interrupt-before-mutation.sh` nem teste OS-1.
- **Evidência:** `Olimpo/squad.yaml` L50 `arbitragem_sem_escalada: "HALT se dois executivos divergem materialmente e a divergência não for escalada ao humano (Ronan) com a tabela de trade-off. Zeus não decide pelo humano em conflito de domínio."`
- **Gap:** G4 BLOCK (ASL-3 exige reflexo).
- **Diff:** CREATE `Olimpo/.claude/reflexos/interrupt-before-mutation.sh` (padrão herdado Hermes/Prometeu); teste OS-1 no roteiro-de-teste.

### P12 — MCP como Camada Universal (Anthropic 25/nov/2024)
- **Estado atual:** N/A DIRETO — Olimpo é Camada 3-4 (governança executiva). Não consome MCP direto (não muta canal externo, não fetch dado datável em runtime; delegação 100% aos executivos para depois descer ao operacional). Semelhante ao Hermes Camada 2 (`camada_1_direto: []`).
- **Evidência:** Grep `MCP` em `Olimpo/**` → **0 hits**. Grep `mcp_tools` → **0 hits**.
- **Gap:** convenção METODO §5 `ferramentas.md` v2.5.1 pede categorização MCP-nativo × adapter mesmo se vazia.
- **Diff:** CREATE `Olimpo/ferramentas.md` com §1 declarando `camada_3_4_direto: []` + §2 Skills como tools cross-squad (categoria E3 canonizada v1.1 — 14 skills executivas são tools consumidas pelos executivos internamente e por outros squads externamente).

**Score P1-P12 baseline:** 2/12 CONFORME (P2, P4 parcial) + 4/12 IMPLÍCITO (P6, P7, P8 parcial, P11 parcial) + 5/12 AUSENTE (P1, P3, P5, P9, P10) + 1/12 N/A (P12 legítimo).
**Score P1-P12 projetado pós-diff:** 12/12 VERDE.

---

## §3 — Matriz 8 critérios × Olimpo (§4 METODO — Art. X)

Baseline pré-Onda 4 e evidência textual verbatim por gate.

### G1 — Constituição por-agent declarada (BLOCK)
- **Estado:** PARCIAL — 6 vetos operacionais no squad.yaml (nível squad, não por-agent), 10 core_principles no zeus.md (filosofia, não veto binário formatado no padrão Kolden).
- **Evidência:** `Olimpo/squad.yaml` L46-53 (bloco `veto:`); `Olimpo/agents/zeus.md` L110-120 (`core_principles:` filosofia).
- **Baseline:** 0.5/1 (existe algo funcional; falta arquivo canônico `constitution.md`).
- **Diff:** CREATE `Olimpo/constitution.md` com 15 princípios veto-operacionais + regra E6 precedência (Kolden Art. X prevalece).

### G2 — ASL declarado (BLOCK)
- **Estado:** AUSENTE.
- **Evidência:** Grep `ASL` → 0.
- **Baseline:** 0/1.
- **Diff:** PRD frontmatter `ASL: 3` + justificativa em §11.2 (arbitragem entre executivos + escala board/investidor + decisão de M&A/pivot = irreversibilidade reputacional).

### G3 — Uncertainty statement + Aspiration Criteria (BLOCK)
- **Estado:** AUSENTE (uncertainty) + PARCIAL (aspiration — `min_score: 7.0` existe mas não é metas por-agent com fonte de evidência).
- **Evidência:** Grep `uncertainty`/`aspiration_criteria` → 0. `squad.yaml` L46-47 `quality_standards.min_score: 7.0`.
- **Baseline:** 0/1.
- **Diff:** PRD frontmatter `aspiration_criteria:` com 4-5 KPIs Camada 3-4 (arbitragem_zero, DoR_completo_100%, decomposicao_com_premissa, entrega_scqa_10min, contrato_ratificado_100%) + `uncertainty_statement:` (bloco Russell 2019). CLAUDE.md §Incerteza declarada.

### G4 — Off-switch / corrigibility (BLOCK para ASL-3+)
- **Estado:** PARCIAL — veto `arbitragem_sem_escalada` opera como portão HITL textual. Reflexo formal `.sh` ausente. Sem teste OS-1.
- **Evidência:** `Olimpo/squad.yaml` L50; ausência de `Olimpo/.claude/reflexos/`.
- **Baseline:** 0.5/1.
- **Diff:** CREATE `.claude/reflexos/interrupt-before-mutation.sh`; teste OS-1 no roteiro-de-teste.

### G5 — Plano de introspecção (WARN; BLOCK para ASL-3+ com efeito irreversível)
- **Estado:** AUSENTE — nenhum plano por-camada.
- **Evidência:** Grep `introspec`/`interpretab` → 0.
- **Baseline:** 0/1.
- **Diff:** PRD §11.5 tabela por-camada (Zeus decompõe → decomposicao YAML no Contrato + log_de_decisao; Executivo assina → executivos[N].assinatura + processo; Consolidação → zeus.consolidacao com premissas + trade-offs; Arbitragem → escalada ao Ronan com tabela). **Divergência declarada:** G5 continua divergência herdada framework Liceu (emenda pendente Onda 6 do METODO).

### G6 — Orthogonality + Instrumental Convergence + teste AB-3 (WARN)
- **Estado:** IMPLÍCITO (via `bypass_de_contrato_de_missao` veto). Tabela auditoria ausente. Teste ausente.
- **Evidência:** `Olimpo/squad.yaml` L52.
- **Baseline:** 0.3/1.
- **Diff:** PRD §11.6 tabela 4 linhas (rotear-missão → risco squad-errado / arbitrar-executivos → risco decisão-sem-consenso / consolidar-síntese → risco perda-informação / assinar-Contrato → risco lacre-incorreto). Teste AB-3 no roteiro (Zeus recusa "vamos pular o Contrato agora que é urgente").

### G7 — Grounding compulsório para fatos datáveis (WARN; BLOCK em asserção materialmente errada)
- **Estado:** IMPLÍCITO — veto `decisao_sem_premissa` + `framework_apresentado_como_lei` são substrato P7. Nenhuma skill declara `grounding_required`.
- **Evidência:** Grep `grounding_required` em `Olimpo/**` → 0 hits.
- **Baseline:** 0.5/1.
- **Diff:** PRD §11.7 declara convenção Kolden herdada Art. IX; ferramentas.md §5 documenta grounding_required por-tool; **skills existentes preservadas** (migração backlog Fase 3 residual — não escopo desta Onda).

### G8 — Predictions Scorecard condicional (BLOCK condicional)
- **Estado:** AUSENTE mas legítimamente N/A — Zeus e executivos consolidam decisões estratégicas mas não emitem predições datáveis próprias (mesmo racional Hermes runtime). Skill `programa-esg-corporativo` pode ter KPIs datáveis, mas isso é output do cliente, não previsão Olimpo.
- **Evidência:** N/A — condicional não acionada.
- **Baseline:** 0/1 (não declarado) → N/A LEGÍTIMO se justificado no PRD.
- **Diff:** PRD frontmatter `predictions_scorecard: false` + justificativa §11.8. Categoria N/A LEGÍTIMO (mesma marca de Hermes).

**Score G1-G8 baseline:** 1/8 (~1.8/8 se contarmos parciais; endurecendo para hard PASS = 1/8 com G4 parcial não passando).
**Score G1-G8 projetado pós-diff:** 8/8 VERDE (delta absoluto **+7 pontos**, empatado com Hermes Onda 2 = maior delta de squad vendorizado depois de Salgueiro +8).

---

## §4 — Matriz 14 modelos × Olimpo (§5 METODO)

Para cada modelo do Caos: (a) Olimpo já tem?, (b) obrigatório/opcional?, (c) diff.

| # | Modelo | Presença Olimpo | Obrigatoriedade | Diff proposto |
|---|--------|-----------------|-----------------|---------------|
| 1 | `prd-de-ia.md` | ❌ AUSENTE (só 2 PRDs vendor por-agent em `Olimpo/prd/`) | OBRIGATÓRIO | CREATE `Olimpo/prd-de-ia.md` (fonte-da-verdade dos 5 campos Art. X) |
| 2 | `system-prompt-base.md` → CLAUDE.md do squad | ❌ AUSENTE | OBRIGATÓRIO | CREATE `Olimpo/CLAUDE.md` (persona + objetivo + incerteza + loop pattern + restrições + formato de saída + exemplos + convenção @// + fronteira vendor + onde encontrar) |
| 3 | `cartao-de-identidade.md` | ❌ AUSENTE no formato canônico; agents/zeus.md L8-18 tem YAML `agent:` no formato vendor xquads | OPCIONAL (cartão canônico entra no roster global; padrão herdado Hermes usa `.claude/agents/<chief>.md` como cartão do orquestrador) | CREATE `.claude/agents/olimpo-chief.md` (cartão + agent-def; padrão Hermes/Prometeu) |
| 4 | `checklist-de-qualidade.md` | PARCIAL — `Olimpo/checklists/output-quality.md` existe (vendor) | OPCIONAL para Onda 4 (Dike executa CAOS-CL-002 canônico) | INTOCADO (vendor preserved); referenciado no roteiro-de-teste como fonte auxiliar |
| 5 | `convencao-de-cli-e-tooling.md` | ❌ AUSENTE | OPCIONAL (aponta para METODO §6 como fonte) | CLAUDE.md §Convenção `@` vs `/` aponta para METODO §6 |
| 6 | `especialista-historico.md` | N/A — Olimpo agents são arquétipos (CEO/COO/CMO...), não pessoas reais. `persona_profile.real_person: false` em cada agent vendor | N/A | Nenhum diff |
| 7 | `ferramentas.md` | ❌ AUSENTE | OBRIGATÓRIO com categorização mesmo se vazia (Camada 3-4 → `camada_1_direto: []`) | CREATE `Olimpo/ferramentas.md` |
| 8 | `guia-infisical.md` | ❌ AUSENTE — mas veto `credencial_texto_puro` em squad.yaml opera a regra | OPCIONAL (não intersecta Art. X; padrão M1.2 do Caos) | CLAUDE.md §Restrições referencia Art. VII Constituição Caos (via constitution.md item nº 6) |
| 9 | `instalacao.md` | N/A — Olimpo é squad interno Kolden, não deploy | N/A | Nenhum diff |
| 10 | `orquestrador-base.md` → `.claude/agents/olimpo-chief.md` | ❌ AUSENTE (Zeus é orquestrador vendor tier 0 em `agents/zeus.md`; padrão Kolden externo tem `.claude/agents/<chief>.md`) | OBRIGATÓRIO (Camada 3 é orquestração pura) | CREATE `.claude/agents/olimpo-chief.md` — cross com item 3 (mesmo arquivo) |
| 11 | `perfil.md` | PARCIAL — `persona_profile:` YAML dentro dos 8 agents vendor cobre o essencial | OPCIONAL para Onda 4 | Sem CREATE — persona vendor coberta; CLAUDE.md aponta para `agents/*.md` como referência de persona por-executivo |
| 12 | `roteiro-de-teste.md` | ❌ AUSENTE | OBRIGATÓRIO | CREATE `Olimpo/roteiro-de-teste.md` (OS-1, AB-3, UN-2, GR-1, PR-1 + Camada 3-4 específicos: Arb-1 arbitragem cross-executivo, Contrato-1 lacre integrity, Roteamento-1 keyword ambígua) |
| 13 | `nucleo/ARQUITETURA.md` | N/A — só Caos tem `nucleo/`; Olimpo não é fábrica | N/A | Nenhum diff |
| 14 | `squad-base.yaml` | PARCIAL — `Olimpo/squad.yaml` existe no formato AIOS (aios/type: squad) com 6 vetos declarados | UPDATE cirúrgico | UPDATE `Olimpo/squad.yaml` acrescentando `camada: "3-4"` + `tier_0` + `tier_1` + `fronteira_vendor_xquads:` + `external_handoffs:` + `mcp_categoria:` — sem tocar nas seções vendor originais |

**Score modelos:** 4/9 obrigatórios ausentes (PRD, CLAUDE, ferramentas, roteiro-de-teste) + 1 UPDATE cirúrgico (squad.yaml) + 1 CREATE cross (olimpo-chief.md).

---

## §5 — Matriz 5 camadas × Olimpo (§3 METODO)

Olimpo ocupa **duas** camadas simultaneamente — condição única entre os squads padronizados até aqui.

| Camada | Papel Olimpo | Evidência | Gap Kolden |
|--------|--------------|-----------|------------|
| Camada 1 (LLM + MCP) | N/A (Olimpo não consome MCP direto — Camada 3-4 pura) | — | Declarar em ferramentas.md §1 (`camada_1_direto: []`) |
| Camada 2 (Hermes) | Handoff externo Hermes → Zeus (descida) e Zeus → Hermes (subida via Dike) | `Hermes/squads-catalog.yaml` L? cita Olimpo; `Olimpo/agents/zeus.md` §"Contrato de Missão (camada 3)" L223-237 | Explicitar handoff bidirecional no PRD §7 external_handoffs |
| **Camada 3 (Zeus)** | Zeus = CEO/Orquestrador; decompõe + `routing_logic` para 7 domínios + `delegates_to_seed` para 6 sementes | `Olimpo/agents/zeus.md` L122-166 (`routing_logic:` com 11 domínios); L226-237 (descida/subida no Contrato) | CLAUDE.md §Camada declara Camada 3-4 combinada como caso NOVO |
| **Camada 4 (7 executivos)** | Poseidon COO / Apolo CMO / Hefesto CTO / Hades CIO / Atena CAIO / Plutos CFO / Afrodite CRO — cada um traduz na disciplina | `Olimpo/agents/{poseidon,apolo,hefesto,hades,atena,plutos,afrodite}.md`; `Olimpo/README.md` L18-27 (tabela) | CLAUDE.md §Camada explicita fronteira Camada 3 × Camada 4 dentro do mesmo squad |
| Camada 5 (Operacional) | Handoff externo para 26 squads via `delegates_to_seed` (hestia/cairos/ananke/nomos/pactolo/emporos) — declarado no zeus.md L127/143/153/159; e cross-squad para Aletheia/Argos/Egide etc. | `Olimpo/agents/zeus.md` L127 (Poseidon → hestia/cairos/ananke); L143 (Hades → nomos); L153 (Plutos → pactolo); L159 (Afrodite → emporos) | PRD §7 external_handoffs declara os 6 destinos-semente + collaborates_with (themis, pluto) |

**Caso novo canônico:** Olimpo é o **primeiro squad Kolden com Camada 3-4 combinada dentro do mesmo squad**. Hermes é Camada 2 pura (com tier_1 vazio por design); Prometeu é Camada 5 (engenharia). Candidato à emenda METODO §3 v1.2 — "Camada 3-4 combinada como categoria constitucional própria" (declarado no Contrato-mãe onda_4 candidatos_emenda).

---

## §6 — Matriz convenção `@` vs `/` × Olimpo (§6 METODO)

- **`@Olimpo`:** dispara Zeus (tier 0) via `Hermes/scripts/invoca-squad.ps1 -Squad olimpo` — o dispatcher já reconhece (Hermes squads-catalog.yaml catalogado). ✅
- **`@Olimpo:apolo`:** dispararia Apolo diretamente. Não testado; escopo do dispatcher atual dispara chief. Registrar como TODO no PRD §7.
- **`@dike`:** Olimpo recebe verificação Dike na subida (via `dike.assinatura` no Contrato). ✅
- **`/skill`:** Olimpo tem 14 skills em `.claude/skills/` invocáveis localmente na sessão do squad. Nenhuma delas usa `@` para dispatch — ✅ correto.
- **Comandos vendor `*diagnose`, `*strategic-planning`, `*board-presentation`, `*vision`, `*strategy`, `*fundraise`, `*culture`, `*board`, `*pivot`, `*roster`, `*synthesize`:** ~11 comandos slash-prefix-star do padrão vendor xquads. Não colidem com METODO §6 (`/` skill invocation local) porque usam `*` prefix (padrão AIOS). Preservar como fronteira vendor.

**Score convenção:** ✅ COMPATÍVEL. Diff apenas explicita no CLAUDE.md §Convenção que `*<comando>` é padrão vendor xquads preservado (fronteira, não colide com METODO §6).

---

## §7 — Matriz 5 buckets de capacidade × skills Olimpo (§7 METODO)

As 14 skills executivas classificadas por bucket (§7 do METODO):

| Skill | Bucket | Rationale |
|-------|--------|-----------|
| `alocacao-de-capital` | 3 (agente-instrumenta-humano-decide) | Plutos propõe política; Ronan aprova |
| `analise-de-pricing-wtp` | 2 (agente-faz-com-input) | Plutos precisa de discovery + input de mercado (Argos handoff) |
| `chief-of-staff-filtragem-e-escalonamento` | 3 | Zeus filtra Escalate/Handle/Park; humano decide sobre Escalate |
| `comunicacao-executiva` | 1 (agente-faz-sozinho) | Zeus/Plutos produzem 1-página autônoma |
| `estrategia-de-entrada-e-posicionamento` | 3 | Zeus propõe onde-competir; decisão de mercado é humana |
| `estrategia-de-supply-chain` | 3 | Poseidon propõe sourcing; humano assina contrato de fornecedor |
| `integracao-pos-fusao-pmi` | 3 | Zeus+Plutos executam plano 100d; humano decide sobre erosão de sinergia |
| `investor-relations` | 2 | Plutos formata; humano assina mensagem ao investidor |
| `operacoes-lean-six-sigma` | 2 | Poseidon aplica DMAIC; humano valida gargalos |
| `painel-executivo-autoplan` | 3 | Zeus orquestra 8 deuses; para nas decisões de gosto e desafios de direção |
| `portfolio-estrategico` | 3 | Zeus+Plutos alocam 70/20/10; humano decide kill criteria |
| `programa-esg-corporativo` | 3 | Zeus+Plutos desenham política; humano ratifica compromissos |
| `reframe-produto-10-estrelas` | 3 | Zeus reenquadra; humano decide se aceita a visão maior |
| `rubrica-dimensional-0-10` | 1 | Zeus avalia por dimensão e corrige até chegar ao 10 |
| `sumario-executivo-scqa` | 1 | Qualquer chief produz sumário autônomo |

**Distribuição:** 3 skills bucket 1 (autônomas) + 3 skills bucket 2 (com input) + 9 skills bucket 3 (instrumenta-humano-decide) + 0 skills bucket 4-5.
**Insight:** Olimpo é **majoritariamente bucket 3** (governança executiva estrutural = humano no ponto de decisão). Confirma P5 assistance games (Russell 2019) em produção. Registrar no PRD §5 como padrão canônico Camada 3-4.

---

## §8 — Estado dos artefatos-âncora canônicos Kolden

| Arquivo canônico | Presença | Baseline | Diff |
|------------------|----------|----------|------|
| `Olimpo/CLAUDE.md` | ❌ AUSENTE | Ausente | CREATE ~150 linhas (padrão Hermes) |
| `Olimpo/prd-de-ia.md` | ❌ AUSENTE | Ausente | CREATE ~155 linhas (5 campos Art. X + 12 seções) |
| `Olimpo/constitution.md` | ❌ AUSENTE (6 vetos parciais em squad.yaml) | Parcial | CREATE ~50 linhas (15 princípios veto + regra E6 precedência) |
| `Olimpo/ferramentas.md` | ❌ AUSENTE | Ausente | CREATE ~90 linhas |
| `Olimpo/roteiro-de-teste.md` | ❌ AUSENTE | Ausente | CREATE ~100 linhas (OS-1, AB-3, UN-2, GR-1, PR-1 + Arb-1 + Contrato-1 + Roteamento-1) |
| `Olimpo/.claude/agents/olimpo-chief.md` | ❌ AUSENTE | Ausente | CREATE ~75 linhas (agent-def canônico Kolden externo) |
| `Olimpo/.claude/reflexos/interrupt-before-mutation.sh` | ❌ AUSENTE | Ausente | CREATE ~30 linhas bash |
| `Olimpo/.claude/settings.json` | ❌ AUSENTE | Ausente | CREATE — deny cirúrgico vendor xquads + reflexo PreToolUse |
| `Olimpo/agent-memory/olimpo.md` | ❌ AUSENTE (afrodite.md + plutos.md existem) | Ausente | CREATE ~40 linhas — agent-chief memory (padrões técnicos Zeus enquanto orquestrador) |
| `Olimpo/squad.yaml` | ✅ EXISTE — vendor + 6 vetos + `aios type:squad` | Parcial (falta camada, tier_0/tier_1 formal, fronteira_vendor_xquads, external_handoffs, mcp_categoria) | UPDATE cirúrgico com 5 campos Kolden novos; sem tocar campos vendor |
| `Olimpo/MEMORY.md` | ✅ EXISTE — 31 linhas com Padrões Ativos (identidade jurídica) + Candidatos a Promoção (M&A) | Bom baseline | APPEND cirúrgico com padrão Onda 4 + regra distinção 3-way MEMORY (E4) |
| `Olimpo/README.md` | ✅ EXISTE — 59 linhas vendor + bloco ritual-de-encerramento | Bom baseline | APPEND parágrafo topo declarando fronteira Kolden + aponta CLAUDE.md como identidade canônica |
| `Olimpo/_origem.md` | ✅ EXISTE — vendor snapshot | Bom (intocado) | Nenhum diff |
| `Olimpo/.claude/skills/catalogo.md` | ⚠️ STALE — diz "5 habilidades" quando existem 14 SKILL.md | Erro material | UPDATE — atualizar para 14 skills + dono nominal por-executivo |

---

## §9 — Estado das subpastas vendor (INTOCÁVEIS por regra E1 do METODO v1.1)

| Subpasta | Conteúdo | Regra |
|----------|----------|-------|
| `agents/` | 8 arquivos mitológicos (zeus, poseidon, apolo, hefesto, hades, atena, plutos, afrodite) | INTOCADO |
| `tasks/` | 7 arquivos (design-operations, diagnose, evaluate-technology, plan-fundraise, plan-go-to-market, review, set-vision) | INTOCADO |
| `workflows/` | 2 arquivos (wf-board-presentation, wf-strategic-planning) | INTOCADO |
| `data/` | 2 arquivos (executive-frameworks, routing-catalog) | INTOCADO |
| `checklists/` | 1 arquivo (output-quality) | INTOCADO |
| `config/` | 1 arquivo (config.yaml) | INTOCADO |
| `prd/` | 2 arquivos vendor por-agent (afrodite, plutos) — parciais | INTOCADOS (não são fonte-da-verdade canônica Kolden; PRD raiz nasce separado) |
| `contratos/` | schema + template + exemplo + `missoes/` (10 contratos) — **ESTRUTURA MAIS ESTRATÉGICA DO WORKSPACE** | INTOCADO (dono do Contrato de Missão; Onda 4 apenas envelopa, não muta) |
| `agent-memory/` | 2 arquivos parciais (afrodite, plutos) — pattern por-executivo estabelecido | PRESERVADO; expandido com CREATE `olimpo.md` para agent-chief |

**Padrão canônico:** vendor xquads-squads preservado 1:1. Camada Kolden externa envelopa. **4ª aplicação da regra invariante E1** (Hermes/Nous + Prometeu/SynkraAI ×3 sub-ondas + Olimpo/xquads-squads).

---

## §10 — Distinção 3-way MEMORY (E4 do METODO v1.1 — 2ª ocorrência empírica esperada)

E4 foi canonizada Sub-onda 3.2 Prometeu (1 ocorrência) e aguarda 2ª confirmação empírica para canonização em v1.2 §5.

**Olimpo confirma E4 aqui:**
1. **`Olimpo/MEMORY.md`** — squad-level (padrões estruturais do squad; hoje: identidade jurídica Kolden + Candidatos a Promoção M&A/DD como B08 do ROADMAP). PRESERVADO + APPEND cirúrgico.
2. **`Olimpo/agent-memory/olimpo.md`** — agent-chief-level (padrões técnicos de execução Zeus como orquestrador). CREATE nesta Onda.
3. **`Olimpo/agent-memory/{afrodite,plutos,...}.md`** — agent-especialista-level por-executivo (Afrodite + Plutos já existem; padrão dos 6 outros deuses estabelecido). PRESERVADOS + padrão canonizado.

**Conclusão:** E4 confirmada 2x (Prometeu Sub-onda 3.2 + Olimpo Onda 4). Pronto para canonizar em v1.2 §5 do METODO (Passo 9 opcional). Q5 do gate humano pode ratificar bump v1.1 → v1.2.

---

## §11 — Vendor xquads-squads como caso E1 (3ª ocorrência)

**Precedente 4x:**
1. **Hermes / Nous Research** (Onda 2 · 2026-07-06) — MIT, ~150 arquivos, PRESERVADO
2. **Prometeu / SynkraAI AIOX** (Sub-onda 3.1 · 2026-07-07) — MIT, ~200+ arquivos incluindo `.aiox-core/`, PRESERVADO
3. **Prometeu / SynkraAI AIOX** (Sub-onda 3.2 · 2026-07-08) — 12 aiox-agents PRESERVADOS + refactor por arquivamento
4. **Prometeu / SynkraAI AIOX** (Sub-onda 3.3 · 2026-07-09) — 55 skills + costura, gitignore vendor patchado cirurgicamente (Q2.2)
5. **Olimpo / xquads-squads** (Onda 4 · 2026-07-09 — **esta Onda**) — MIT, ~40 arquivos vendor, PRESERVADO INTEGRALMENTE

**Regra invariante 5x confirmada:** camada Kolden PT-BR **envelopa** vendor via 8-9 arquivos-âncora novos + UPDATEs cirúrgicos em pontos de fronteira (squad.yaml, MEMORY, README, catalogo skills). Vendor code path (`agents/`, `tasks/`, `workflows/`, `data/`, `checklists/`, `config/`, `prd/`) permanece **1:1 intocado**. Fronteira declarada em ≥5 pontos operacionais.

**Contribuição desta Onda ao METODO:**
- E1 promovido de "canonizado com 2 confirmações (Hermes+Prometeu)" para **"canonizado com 3+ confirmações" — regra 5x confirmada empiricamente** (Passo 9 opcional).
- E4 obtém 2ª confirmação empírica → canonizar em METODO v1.2 §5 (padrão distinção 3-way MEMORY).
- **Emergente:** categoria "Camada 3-4 combinada dentro do mesmo squad" — candidato à emenda METODO §3 v1.2 (a decidir no Passo 9).

---

## §12 — Score canônico consolidado (baseline pré-Onda 4)

| Dimensão | Baseline | Projetado pós-diff | Delta |
|----------|----------|--------------------|-------|
| P1-P12 (12 princípios) | 2/12 CONFORME + 4/12 IMPLÍCITO + 5/12 AUSENTE + 1/12 N/A | **12/12 VERDE** | +10 pontos |
| G1-G8 (8 critérios Art. X) | 1/8 hard PASS (G3 aspiration parcial) + 4/8 PARCIAL + 3/8 AUSENTE | **8/8 VERDE** (7 hard PASS + 1 N/A legítimo em G8) | **+7 pontos** (empatado com Hermes Onda 2) |
| Modelos 14 do Caos | 3/14 presentes (checklist + squad.yaml + persona vendor) | 8/14 canonizados (+ CLAUDE + PRD + constitution + ferramentas + roteiro + agent-chief) | +5 modelos |
| Cobertura de camadas 3-4 | Implícita | Explícita + fronteira declarada + handoffs canonizados | Novo |

**Score alvo pós-Onda 4:** **8/8 VERDE** com delta absoluto **+7 pontos** (mesma magnitude do Hermes Onda 2 — 2º maior delta do METODO após Salgueiro +8; superior à média Prometeu 3 sub-ondas +6).

---

## §13 — Fan-out desta Onda

**Escolha: 0/3 subagentes.** Justificativa por interdependência:
- Os 8 agents mitológicos + 14 skills executivas + squad.yaml + MEMORY compartilham vocabulário coeso (governança executiva, contrato de missão, board, investidor, arbitragem cross-executivo, escalada ao humano). Cross-artefato dominante.
- Precedente 10x: Sub-ondas 1.1/1.2/1.4/1.5/1.6 + Hermes Onda 2 + Prometeu 3.1/3.2/3.3 = 8 casos 0/3 por interdependência (padrão dominante).
- Caso oposto isolado: Sub-onda 1.3 (26 squads independentes MCP inventário) e Sub-onda 3.3 (3 catálogos disjuntos 55 skills + AIOX/agents + gitignore) = 3/3 por independência estrutural.

**11ª ocorrência do padrão canônico** (regra METODO §8 "Fan-out ≤N é TETO, não obrigação — escolha por INTERDEPENDÊNCIA").

---

## §14 — Divergências carregadas (declarar em `verificacao-dike.md`)

1. **G5 interpretabilidade** — continua divergência METODO herdada framework Liceu Fase 1 (framework não tem G5 nomeado como critério próprio; METODO consolidou #5+#6 em G6 e elevou interpretabilidade a G5 próprio). Emenda pendente **Onda 6 do METODO**.
2. **Categoria "runtime bidirecional Art. IV"** — divergência pendente **Onda 6**. Olimpo NÃO consome canal externo direto (Camada 3-4 delega ao operacional); não amplifica esta divergência.
3. **Papel Dike temporário pelo executor da Onda + 3 salvaguardas** — 10ª ocorrência consecutiva. Padrão transitório até Dike agent-funcional nascer **Onda 5** (Grupo B; sessão dedicada após esta). Declarado em `verificacao-dike.md`.
4. **Categoria "Camada 3-4 combinada dentro do mesmo squad"** — NOVA divergência positiva (candidato à emenda METODO §3 v1.2; a decidir no Passo 9 via gate humano Q5 opcional).

**Divergências RESOLVIDAS que Olimpo herda:**
- ✅ **CAOS-CL-002** rename físico canonizado 2026-07-09 (divergência 3x herdada Hermes+Prometeu eliminada).
- ✅ **PRM-3.2-019** gitignore vendor SynkraAI RESOLVIDO Sub-onda 3.3 (Q2.2 aplicada).
- ✅ **METODO v1.1** ratificado com 6 emendas (E1/E2/E3/E5/E6/E7 canonizadas).

---

## §15 — Handoff para Passo 3 (achados.jsonl + diff-cirurgico.md)

- **Achados a registrar:** ~22-26 (10-12 P0 canônicos G1-G8 + 5 P1 (G4/G5/G6/G7/fronteira) + 3 P2 (catálogo stale, ReAct não nomeado, README fronteira) + 2 P3 (settings.json / trim MEMORY) + 2-3 INFO/divergência).
- **Diff proposto:** ~15 mudanças (9-10 CREATE + 3-4 UPDATE + 0 MOVE + 1 APPEND no README/AGENTS.md interno se houver; catalogo.md UPDATE).
- **Ordem canônica G1→G2→G3→G4:** autoridade (CLAUDE.md + PRD + squad.yaml + constitution.md) → primários (ferramentas.md + roteiro-de-teste.md + settings.json + reflexos + olimpo-chief) → secundários (MEMORY append + agent-memory + README append + catalogo update) → ritual encerramento.

---

*Matriz de Conformidade — Onda 4 do METODO Kolden. Executor: olimpo-chief (a nascer no Passo 5). Fan-out 0/3 (11ª ocorrência). 4x confirmada regra E1 INVÓLUCRO sobre MUTAÇÃO. 2ª confirmação E4 distinção 3-way MEMORY. Divergências G5 + Art. IV pendentes Onda 6. Sem commit até ordem explícita do Ronan.*
