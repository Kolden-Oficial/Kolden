# Sumário Executivo — Sub-onda 3.2 do METODO Kolden (Prometeu · 12 aiox-agents internos)

> **Contrato-mãe:** `m-20260706-metodo-kolden` (Onda 3, Grupo A, squad-alvo Prometeu, Sub-onda 3.2 = 12 aiox-agents internos + refactor MEMORY canônico + mapeamento cross-camada).
> **Sessão:** dedicada em `C:\Kolden\Prometeu\` (G7 satisfeito).
> **Executor:** prometeu-chief (Tier-0 · fan-out 0/3 por interdependência cross-arquivo — regra 8x confirmada Sub-ondas 1.1/1.2/1.4/1.5/1.6 + Onda 2 Hermes + Sub-onda 3.1; **Sub-onda 3.2 é a 9ª confirmação**).
> **Data:** 2026-07-07.
> **Leitura estimada:** ≤10 min.

---

## §1 — Números-chave

| Métrica | Valor |
|---|---|
| Achados totais registrados | 18 (`achados.jsonl`) |
| Achados P0 (crítico) | 4 (constitution + ASL + uncertainty/aspiration + aiox-master CREATE) |
| Achados P1 (alto) | 5 (G4 off-switch devops/data-engineer + G5 interpretability + G6 orthogonality + duplicação MEMORY) |
| Achados P2 (médio) | 3 (G7 grounding + mapeamento cross-camada + agent-memory por-agente) |
| Achados INFO/divergência | 6 (contagem 12 confere / squad-creator fora escopo / personas Bob-Atlas corrigir prometeu-chief / rule agent-memory-imports sub-inclusão) |
| **Mudanças propostas no diff (Sub-onda 3.2)** | **19 canônicas + 1 condicional** (10 UPDATE aiox-*.md + 1 CREATE aiox-master.md + 4 MOVE MEMORY espúrio + 1 CREATE README arquivo + 1 UPDATE agent-memory + 1 UPDATE squad.yaml + 1 UPDATE prometeu-chief.md correção personas + 1 UPDATE condicional AGENTS.md raiz) |
| **Score G1-G8 baseline Sub-onda 3.2** | **2/8 hard PASS** (herdado pré-3.1) → 5/8 pós-3.1 → **pré-3.2** |
| **Score G1-G8 projetado pós-diff Sub-onda 3.2** | **6/8 hard PASS + 2 WARN legítimo** (G5+G6 divergência METODO/completude 3.3; G7 PARCIAL implícito) |
| **Score G1-G8 projetado pós-Sub-ondas 3.1+3.2+3.3** | **8/8 VERDE** |
| **Delta absoluto Sub-onda 3.2** | **+1 ponto** (5/8 → 6/8 hard PASS canônico Kolden) |
| **Delta absoluto Onda 3 total (projetado)** | **+6 pontos** (2/8 → 8/8) |
| Fan-out interno | 0/3 (regra **9ª confirmação consecutiva**) |
| Arquivos tocados nesta Sub-onda até agora | 6 (todos em `Prometeu/registros/metodo-onda-3/3.2-agents-internos/`) |
| Arquivos vendor SynkraAI/aiox-core **PRESERVADOS INTACTOS** | ~450 (`.aiox-core/**` + `bin/aiox*.js` + `packages/` + `pro/` + `docs/` + `README*.md` + `LICENSE` + `.claude/rules/**` + `.claude/hooks/**` + `.claude/commands/**` + `.claude/skills/**` + `.claude/agents/aiox-*.md` intocados ATÉ passo 4 — Sub-onda 3.2 aplica APPEND cirúrgico, não substituição) |

---

## §2 — Achado arquitetural central

**Os 12 aiox-agents internos do Prometeu operam PERFEITAMENTE dentro do vendor AIOX** (Story-Driven Development + Agent Authority + Quality First + gates AIOX) mas **NÃO DECLARAM os 8 gates Art. X do METODO Kolden**. A camada externa Kolden (`.claude/agents/aiox-*.md` — 10 variantes Claude Code + 1 CREATE aiox-master) é o local certo para APPEND cirúrgico: persona AIOX preservada intocada + gates Art. X declarados no rodapé (bloco `<!-- kolden-art-x-inicio -->` ... `<!-- kolden-art-x-fim -->` inserido ANTES do `<!-- ritual-de-encerramento -->` que já existe).

**Coerente com padrão canônico Sub-onda 3.1** (INVÓLUCRO sobre MUTAÇÃO), a Sub-onda 3.2 respeita a regra invariante: **vendor SynkraAI intocado** (`.aiox-core/**` ~450 arquivos + 12 canônicos AIOX + 10 MEMORY canônicos AIOX + 12 personas AIOX + Constitution AIOX v1.0.0).

**Novos padrões emergentes desta Sub-onda 3.2 (a registrar em `Prometeu/MEMORY.md`):**

1. **Distinção canônica MEMORY squad-level × agent-memory técnica × MEMORY canônico AIOX** — três locais distintos com semânticas diferentes:
   - `Prometeu/MEMORY.md` = padrões estruturais do squad Kolden (estabelecido Sub-onda 3.1).
   - `Prometeu/agent-memory/prometeu.md` = padrões técnicos de execução como Camada 5 Kolden (Sub-onda 3.2 acrescenta seção por-agente).
   - `.aiox-core/development/agents/<id>/MEMORY.md` = padrão AIOX-story-driven canônico (**INTOCADO** — regra dura da skill `ritual-de-encerramento`).

2. **Refactor de MEMORY espúrio pelo arquivamento (Opção B)** — segunda ocorrência do padrão de arquivamento canônico (após `Hermes/agent-memory/backups/` Onda 2). Confirma padrão canônico Kolden para lidar com duplicações forenses.

3. **Personas AIOX vendor como fonte-de-verdade** — quando CLAUDE.md AIOX diverge do canônico AIOX (`.aiox-core/development/agents/<id>.md`), o **canônico AIOX prevalece** (personas Bob no pm + Atlas no analyst — CLAUDE.md AIOX está desatualizado). Sub-onda 3.2 corrige `prometeu-chief.md` L37+L39 mas NÃO toca CLAUDE.md AIOX (L1 vendor).

4. **ASL-3 crítico em 4 agentes (dev + devops + data-engineer + aiox-master)** — mapeamento explícito por-agente. Reflexo `interrupt-before-mutation.sh` (herdado Sub-onda 3.1) cobre TODOS os 4 casos:
   - `dev`: mutation local reversível mas com invocação potencial externa (n8n, npm publish).
   - `devops`: git push + PR + release + MCP setup (canal externo GitHub).
   - `data-engineer`: DDL production + RLS + migration Supabase remoto.
   - `aiox-master`: modificação de framework de agentes/tasks/workflows + `--force-execute`.

5. **Convenção `@` dupla reforçada** (externa Kolden `@Prometeu` + interna AIOX `@dev`/`@qa`/etc.) via bloco `mapeamento_cross_camada:` explícito em `squad.yaml`. Sub-onda 3.2 reforça declaração implícita da Sub-onda 3.1.

6. **12 aiox-agents ≠ 12 variantes Claude Code** — canônico AIOX tem 12 (aiox-master + 11 especialistas incluindo squad-creator); Claude Code Kolden tem 10 variantes existentes; Sub-onda 3.2 CREATE aiox-master.md (11ª variante); aiox-squad-creator fica sem variante Claude Code por decisão explícita (fora do escopo Kolden — factory = Caos).

---

## §3 — 6 artefatos padronizados desta Sub-onda 3.2

Todos em `C:\Kolden\Prometeu\registros\metodo-onda-3\3.2-agents-internos\`:

1. **`matriz-de-conformidade.md`** (~500 linhas) — matriz por-agente contra Art. X (8 gates canônicos) + investigação 4 MEMORY espúrios + mapeamento cross-camada AIOX×Kolden. Evidência textual verbatim por célula.
2. **`achados.jsonl`** (18 achados, 1 JSON por linha) — cada achado com id (PRM-3.2-###), severidade (P0-P2+INFO), gate afetado, evidência, mudança proposta, procedência, rastro-gates, status.
3. **`diff-cirurgico.md`** (~800 linhas) — 19 mudanças canônicas + 1 condicional com CONTEÚDO EXATO das notas Kolden por-agente. Tabela mestra §1 + Template canônico §2 + preenchimentos por-agente §3 + CREATE aiox-master §4 + refactor MEMORY §5 + agent-memory §6 + squad.yaml §7 + prometeu-chief personas §8 + AGENTS.md raiz §9.
4. **`verificacao-dike.md`** (~250 linhas) — baseline pré-aplicação sob 3 salvaguardas (papel Dike temporário pelo prometeu-chief) + veredito baseline com evidência textual verbatim por seção A-G do CAOS-CL-002. **Veredito: SOBE com RESSALVAS**.
5. **`verificacao-dike-delta.md`** — nota de deferimento para Sub-onda 3.3 (Q4.A recomendada — padrão herdado Sub-onda 3.1). Alternativa Q4.B declarada explicitamente.
6. **`sumario-executivo.md`** (este arquivo) — resumo ≤10 min + 4 perguntas gate humano + bloco YAML pronto para appendar em `resultado_ondas_2_a_26.onda_3.sub_ondas["3.2"]`.

Padrão canônico dos 6 artefatos por Onda **confirmado 9x consecutivas** (Sub-ondas 1.1/1.2/1.4/1.5/1.6 + Onda 2 Hermes + Sub-ondas 3.1 + 3.2 aqui).

---

## §4 — 4 gates humanos (via AskUserQuestion no Passo 4)

Padrão herdado das Sub-ondas 1.1-1.6 + Onda 2 Hermes + Sub-onda 3.1. Recomendação técnica em negrito.

### Q1 — Aplicação do diff cirúrgico

Como você quer aplicar as 19 mudanças canônicas (M1-M19)?
- **A (Recomendada):** em bloco por domínio: (a) 10 UPDATEs cirúrgicos aiox-*.md (M1-M10) → (b) CREATE aiox-master.md (M11) → (c) refactor MEMORY espúrios (M12-M16 se Q2.B) → (d) UPDATEs Kolden squad (M17-M18-M19). Pausas curtas entre domínios para permitir cancelamento.
- **B:** por agente — Ronan aprova cada UPDATE individualmente (maior controle, custo cognitivo alto — 19 aprovações consecutivas).

### Q2 — Destino dos 4 MEMORY.md espúrios em `.claude/agent-memory/aiox-{architect,dev,po,qa}/`

Esses 4 arquivos são EN puro, snapshots pré-absorção Kolden (2026-02-06 a 2026-02-10), sem estrutura Ritual Kolden. Canônico AIOX vive em `.aiox-core/development/agents/<id>/MEMORY.md` (rule `.claude/rules/agent-memory-imports.md` confirma). Como resolver?
- **A:** DELETE — remove duplicação, perde histórico técnico de sprints AIOX (EPIC-ACT / IDS-4a / IDS-5a / IDS-7 já concluídos).
- **B (Recomendada):** ARQUIVAR — mover para `.claude/agent-memory/_archive-pre-kolden/aiox-*/MEMORY.md` + CREATE `_archive-pre-kolden/README.md` declarando propósito. Zero perda + rastreabilidade + padrão herdado `Hermes/agent-memory/backups/` da Onda 2.
- **C:** MERGE cirúrgico nos MEMORY canônicos AIOX — **VIOLA regra invariante Sub-onda 3.1** (mexe em vendor). Não recomendado.

### Q3 — Bloco `mapeamento_cross_camada:` (AIOX×Kolden) — onde vive?

Duas rotas para declarar explicitamente o mapeamento cross-camada:
- **A (Recomendada):** appendar em `Prometeu/squad.yaml` como SSoT YAML (padrão validado Kolden `feedback_ssot_yaml_projecoes_readonly` — YAML único mutável + MD projeção read-only). CLAUDE.md aponta para squad.yaml.
- **B:** appendar seção nova em `Prometeu/CLAUDE.md` §7 (mais legível para humanos, mas duplica info + quebra SSoT — projeção MD ficaria mutável).

**Sub-questão condicional a Q3.A: aplicar Passo 8 nesta Sub-onda 3.2?** Ronan aprova UPDATE `C:\Kolden\AGENTS.md` raiz agora (APPEND nota canônica Sub-onda 3.2 concluída — contagem 12 confere, sem ajuste numérico) OU adia para conclusão da Onda 3 completa (após Sub-onda 3.3)?

### Q4 — Dike delta INDEPENDENTE

Verificação Dike delta por subagente Explore isolado:
- **A (Recomendada):** **deferido para Sub-onda 3.3** — mantém padrão herdado Sub-onda 3.1; Sub-onda 3.3 faz costura final + Dike delta INDEPENDENTE cobrindo 3.1+3.2+3.3 de uma vez (1 sessão subagente).
- **B:** Dike delta INDEPENDENTE nesta Sub-onda 3.2 via subagente Explore agora. Custo: 2 sessões subagente Explore total (3.2 + 3.3); benefício: veredito canônico da Sub-onda 3.2 isolado agora.

---

## §5 — Escopo declarado (o que NÃO foi tocado, o que ficou fora)

**Fronteira vendor SynkraAI — INTOCADO (~450 arquivos):**
- Runtime AIOX Node: `.aiox-core/core/**` (~200 JS modules).
- Constituição AIOX: `.aiox-core/constitution.md` v1.0.0 preservada.
- Development framework: `.aiox-core/development/tasks/**`, `.aiox-core/development/templates/**`, `.aiox-core/development/checklists/**`, `.aiox-core/development/workflows/**`.
- **12 canônicos AIOX** em `.aiox-core/development/agents/*.md` (aiox-master + analyst + architect + data-engineer + dev + devops + pm + po + qa + sm + squad-creator + ux-design-expert) — **INTOCADOS**.
- **10 MEMORY canônicos AIOX** em `.aiox-core/development/agents/<id>/MEMORY.md` — **INTOCADOS**.
- **12 personas AIOX** em `.claude/commands/AIOX/agents/*.md` — **INTOCADAS**.
- Infrastructure: `.aiox-core/infrastructure/**`.
- CLI executables: `bin/aiox.js`, `bin/aiox-init.js`, `bin/*`.
- Vendor packages: `packages/`, `pro/`.
- Docs vendor: `docs/`, `README.md`, `README.en.md`, `LICENSE`, `CHANGELOG.md`, `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`.
- Config vendor: `.aiox`, `.cursor`, `.docker`, `.github`, `.husky`, `.synapse`.
- AIOX rules: `.claude/rules/*.md` (10 arquivos).
- AIOX hooks/commands: `.claude/hooks/*.cjs`, `.claude/commands/**`, `.claude/setup/`, `.claude/templates/`.
- AIOX skills: `.claude/skills/**` (57 skills) — **Sub-onda 3.3** cuidará.
- Tests: `tests/`.

**Escopo Sub-onda 3.2 (a aplicar após gate):**
- 10 UPDATEs cirúrgicos em `.claude/agents/aiox-*.md` (APPEND bloco Kolden Art. X entre persona AIOX e `<!-- ritual-de-encerramento -->`).
- 1 CREATE `.claude/agents/aiox-master.md` (nova variante Claude Code Kolden do Orion — ASL-3).
- 4 MOVE + 1 CREATE README (refactor MEMORY espúrios — Q2.B).
- 1 UPDATE `Prometeu/agent-memory/prometeu.md` (APPEND seção por-agente).
- 1 UPDATE `Prometeu/squad.yaml` (bloco `mapeamento_cross_camada:` — Q3.A).
- 1 UPDATE `.claude/agents/prometeu-chief.md` (correção personas Bob/Atlas em L37+L39).
- 1 UPDATE condicional `C:\Kolden\AGENTS.md` raiz (APPEND nota canônica — Passo 8 se Q3.A).

**Fora do squad-alvo — NÃO TOCADO:** `Caos/`, `Liceu/`, `Olimpo/`, `Dike/`, `Hermes/`, `sobre-a-empresa/`, todos os outros squads (G1 respeitado). Exceção autorizada condicional: `C:\Kolden\AGENTS.md` raiz (Passo 8 se Q3.A).

**Sub-onda 3.3 (próxima sessão dedicada em `C:\Kolden\Prometeu\`):**
- 57 skills padronizadas + 6 skills públicas com read-only + nota cross-squad no diff.
- Costura final da Onda 3.
- Smoke test canônico.
- **Dike delta INDEPENDENTE por-subagente Explore isolado** cobrindo 3.1+3.2+3.3 de uma vez.

---

## §6 — Verificação G1-G8 auto-aplicada Sub-onda 3.2 (baseline até Passo 3)

- **G1** (escopo cirúrgico) — ✅ PASS · 6 artefatos em `Prometeu/registros/metodo-onda-3/3.2-agents-internos/`.
- **G2** (sem commit sem ordem) — ✅ PASS · working tree preservado.
- **G3** (sem push sem ordem) — ✅ PASS.
- **G4** (ritual de encerramento) — ⏳ Passo 7 pós-aplicação.
- **G5** (fan-out ≤3) — ✅ PASS · 0/3 (regra 9x confirmada — Sub-onda 3.2 é a 9ª confirmação consecutiva).
- **G6** (artefato-em-disco entre passos) — ✅ PASS · 6 artefatos gravados sequencialmente.
- **G7** (sessão dedicada) — ✅ PASS · Sub-onda 3.2 executada em `C:\Kolden\Prometeu\`.
- **G8** (procedência rastreável) — ✅ PASS · grep reverso confirma cada citação em `Liceu/frameworks/arquitetura-de-agents-kolden/procedencia.md`.

**Score projetado pós-diff Sub-onda 3.2:** **6/8 hard PASS + 2 WARN legítimo** (G5+G6 divergência METODO/completude 3.3; G7 PARCIAL implícito Sub-onda 3.3).

**Score projetado pós Sub-ondas 3.1+3.2+3.3:** **8/8 VERDE** (delta absoluto Onda 3 total: **+6 pontos**, 2/8 → 8/8 canônico Kolden).

---

## §7 — Bloco YAML pronto para appendar em `resultado_ondas_2_a_26.onda_3.sub_ondas["3.2"]`

Copiar-colar direto no Contrato-mãe `Olimpo/contratos/missoes/m-20260706-metodo-kolden.yaml`.

```yaml
            "3.2":
              em: "2026-07-07"
              dominio: "12 aiox-agents internos + refactor MEMORY canonico + mapeamento cross-camada AIOX x Kolden"
              status: "aguardando-gate-humano-passo-4"
              executor: "prometeu-chief (raiz Kolden, sessao dedicada C:\\Kolden\\Prometeu\\) — 0/3 fan-out por interdependencia cross-arquivo (regra 8x confirmada Sub-ondas 1.1/1.2/1.4/1.5/1.6 + Onda 2 Hermes + Sub-onda 3.1; Sub-onda 3.2 e 9a confirmacao)"
              artefatos_produzidos:
                - "Prometeu/registros/metodo-onda-3/3.2-agents-internos/matriz-de-conformidade.md (~500 linhas — matriz por-agente contra Art. X (8 gates canonicos) + investigacao 4 MEMORY espurios + mapeamento cross-camada AIOX x Kolden)"
                - "Prometeu/registros/metodo-onda-3/3.2-agents-internos/achados.jsonl (18 achados em JSONL, severidade P0-P2+INFO, rastro-gates + procedencia)"
                - "Prometeu/registros/metodo-onda-3/3.2-agents-internos/diff-cirurgico.md (~800 linhas — 19 mudancas canonicas + 1 condicional com CONTEUDO EXATO)"
                - "Prometeu/registros/metodo-onda-3/3.2-agents-internos/verificacao-dike.md (~250 linhas — baseline pre-aplicacao sob 3 salvaguardas — veredito SOBE com RESSALVAS)"
                - "Prometeu/registros/metodo-onda-3/3.2-agents-internos/verificacao-dike-delta.md (nota de deferimento para Sub-onda 3.3 — Q4.A recomendada, alternativa Q4.B declarada)"
                - "Prometeu/registros/metodo-onda-3/3.2-agents-internos/sumario-executivo.md (este arquivo — sumario <=10min + 4 perguntas gate humano + bloco YAML)"
              achado_arquitetural_central: |
                Os 12 aiox-agents internos do Prometeu operam PERFEITAMENTE dentro do vendor
                AIOX (Story-Driven + Agent Authority + Quality First) mas NAO DECLARAM os
                8 gates Art. X do METODO Kolden. Camada externa Kolden .claude/agents/aiox-*.md
                (10 variantes Claude Code + 1 CREATE aiox-master.md) e o local certo para
                APPEND cirurgico: persona AIOX preservada intocada + gates Art. X declarados
                no rodape (bloco <!-- kolden-art-x --> inserido antes do <!-- ritual-de-encerramento -->
                que ja existe). Coerente com padrao Sub-onda 3.1 INVOLUCRO sobre MUTACAO.
                Vendor SynkraAI intocado (~450 arquivos + 12 canonicos AIOX + 10 MEMORY canonicos
                AIOX + 12 personas AIOX + Constitution AIOX v1.0.0). Novos padroes emergentes:
                distincao MEMORY squad-level x agent-memory x MEMORY canonico AIOX; refactor
                por arquivamento (2a ocorrencia apos Hermes/agent-memory/backups); personas AIOX
                canonico prevalece sobre CLAUDE.md AIOX desatualizado; ASL-3 critico em 4 agentes
                (dev+devops+data-engineer+aiox-master); convencao @ dupla reforcada via bloco
                mapeamento_cross_camada em squad.yaml; 12 aiox-agents != 12 variantes Claude Code
                (squad-creator fora de escopo Kolden — factory = Caos).
              diff_proposto:
                total_mudancas: 19
                condicional: 1
                breakdown:
                  UPDATE_APPEND_aiox: 10
                  CREATE_variante_claude_code: 1
                  MOVE_MEMORY_espurio: 4
                  CREATE_README_arquivo: 1
                  UPDATE_agent_memory_prometeu: 1
                  UPDATE_squad_yaml_mapeamento: 1
                  UPDATE_prometeu_chief_personas: 1
                  UPDATE_AGENTS_md_raiz_condicional: 1
                ordem_hierarquica: "10 UPDATEs aiox-*.md -> 1 CREATE aiox-master.md -> 4 MOVE + 1 CREATE README refactor MEMORY (Q2.B) -> UPDATEs Kolden squad -> Passo 8 raiz Kolden (Q3.A)"
                arquivos_vendor_preservados: "~450 (mesma lista Sub-onda 3.1; adicionalmente 12 canonicos AIOX + 10 MEMORY canonicos AIOX + 12 personas AIOX INTOCADOS nesta 3.2 tambem)"
              gate_humano_pendente:
                - Q1: "Aplicar diff em bloco por dominio (recomendado — aiox-*.md → aiox-master → MEMORY refactor → Kolden squad) ou por agente (19 aprovacoes)"
                - Q2: "Destino dos 4 MEMORY espurios — DELETE / ARQUIVAR (recomendado — padrao Hermes) / MERGE (viola invariante 3.1)"
                - Q3: "Bloco mapeamento_cross_camada — squad.yaml SSoT (recomendado) ou CLAUDE.md §7 (duplica); sub-questao Passo 8 AGENTS.md raiz nesta 3.2 (recomendado) ou apos 3.3"
                - Q4: "Dike delta INDEPENDENTE — deferido Sub-onda 3.3 (recomendado — 1 sessao subagente cobrindo 3.1+3.2+3.3) ou agora (2 sessoes total)"
              score_canonico:
                baseline_G1_G8: "5/8 hard PASS pos-3.1 (herdado)"
                projetado_pos_diff_sub_onda_3_2: "6/8 hard PASS + 2 WARN legitimo (G5+G6 divergencia/completude 3.3; G7 PARCIAL implicito)"
                delta_absoluto_sub_onda_3_2: "+1 ponto (5/8 -> 6/8 canonico Kolden)"
                projetado_pos_onda_3_total: "8/8 VERDE (delta absoluto total Onda 3: +6 pontos, 2/8 pre-3.1 -> 8/8 pos-3.3)"
              divergencias_declaradas:
                - "CAOS-CL-002 cabecalho DRAFT vs METODO canonico (herdada Sub-onda 3.1)"
                - "Verificacao Dike temporariamente pelo prometeu-chief com 3 salvaguardas — delta INDEPENDENTE DEFERIDO para Sub-onda 3.3 (Q4.A recomendado)"
                - "G5 interpretabilidade continua divergencia herdada framework Liceu (emenda pendente Onda 6)"
                - "G6 orthogonality WARN legitimo — teste AB-3 real Sub-onda 3.3"
                - "G7 grounding PARCIAL implicito — Sub-onda 3.3 elevara via 57 skills com grounding_required real"
                - "B10 ReAct implicito nos aiox-agents (declaracao explicita loop_pattern: ReAct pendente Contrato proprio — fora do escopo Kolden Sub-onda 3.2)"
                - "squad-creator (Craft) fora de escopo direto Sub-onda 3.2 — Prometeu nao cria squad (Kolden factory = Caos)"
                - "aiox-master (Orion) SEM variante Claude Code — corrigido nesta 3.2 via CREATE .claude/agents/aiox-master.md (11a variante)"
                - "4 MEMORY espurios em path nao-canonico — veredito recomendado ARQUIVAR (Q2.B) — padrao herdado Hermes/agent-memory/backups"
                - "Personas AIOX vendor canonico prevalece sobre CLAUDE.md AIOX desatualizado (Bob no pm, Atlas no analyst) — correcao interna prometeu-chief.md L37+L39"
                - "Rule .claude/rules/agent-memory-imports.md so importa 6 MEMORY (dev/qa/architect/devops/pm/po) — 4 sub-inclusao (analyst/data-engineer/sm/ux). Registrado como INFO — fora do escopo Sub-onda 3.2 (vendor AIOX)"
              padroes_novos_a_registrar:
                - "Distincao canonica MEMORY squad-level (Prometeu/MEMORY.md — Sub-onda 3.1) x agent-memory (Prometeu/agent-memory/prometeu.md — padroes tecnicos Camada 5 Kolden por-agente pos-3.2) x MEMORY canonico AIOX (.aiox-core/development/agents/<id>/MEMORY.md — intocado)"
                - "Refactor de MEMORY espurio pelo arquivamento — segunda ocorrencia do padrao (apos Hermes/agent-memory/backups Onda 2) — promove a padrao canonico Kolden para lidar com duplicacoes forenses"
                - "Personas AIOX vendor canonico prevalece sobre CLAUDE.md AIOX desatualizado — regra de fonte-de-verdade estabelecida Sub-onda 3.2"
                - "ASL-3 critico em 4 agentes — mapeamento explicito por-agente (dev+devops+data-engineer+aiox-master) com reflexo interrupt-before-mutation.sh cobrindo cada caso"
                - "Convencao @ dupla reforcada via bloco mapeamento_cross_camada: em squad.yaml (Q3.A) — SSoT YAML como padrao Kolden"
                - "12 aiox-agents != 12 variantes Claude Code — squad-creator FORA DE ESCOPO Kolden por decisao explicita (Prometeu nao cria squad; factory = Caos)"
                - "6 artefatos padronizados por Onda/Sub-onda confirmado 9x consecutivas (regra global do METODO §8 — Sub-onda 3.2 e 9a confirmacao)"
                - "Fan-out 0/3 por interdependencia cross-arquivo confirmado 9x consecutivas"
                - "Papel Dike temporario pelo executor da onda + 3 salvaguardas + delta INDEPENDENTE DEFERIDO para sub-onda seguinte — padrao herdado Sub-onda 3.1"
                - "APPEND cirurgico entre persona AIOX e bloco ritual-de-encerramento — posicao canonica para intervencao Kolden Art. X sem tocar vendor"
              verificacao_auto:
                G1: "PASS - 6 artefatos em Prometeu/registros/metodo-onda-3/3.2-agents-internos/; nenhum outro arquivo tocado ate Passo 3"
                G2: "PASS - working tree preservado"
                G3: "PASS - sem push"
                G4: "PENDENTE Passo 7 (ritual encerramento APPEND por-agente + backup + trim <=150 linhas)"
                G5: "PASS - 0/3 fan-out (regra 9x confirmada — Sub-onda 3.2 e 9a confirmacao)"
                G6: "PASS - 6 artefatos em disco entre passos"
                G7: "PASS - sessao dedicada em C:\\Kolden\\Prometeu\\ (nunca duas sub-ondas na mesma sub-sessao)"
                G8: "PASS - procedencia grep reverso em Liceu/frameworks/arquitetura-de-agents-kolden/procedencia.md bate 1:1"
              handoff_para_passo_5:
                escopo: "Aplicar diff aprovado pelo gate humano na ordem definida em Q1 — 10 UPDATEs aiox-*.md -> 1 CREATE aiox-master.md -> refactor MEMORY (Q2) -> UPDATEs Kolden squad (M17-M18-M19) -> UPDATE condicional AGENTS.md raiz (Passo 8)"
              handoff_para_passo_6:
                escopo: "Dike delta INDEPENDENTE — deferido Sub-onda 3.3 (Q4.A recomendada) ou agora via subagente Explore isolado (Q4.B)"
              handoff_para_passo_7:
                escopo: "Ritual de encerramento em Prometeu/agent-memory/prometeu.md APPEND (existente) + Prometeu/MEMORY.md APPEND (existente Sub-onda 3.1) — backup obrigatorio + trim <=150 linhas + APPEND bloco de padroes Sub-onda 3.2"
              handoff_para_passo_8:
                escopo: "Atualizar C:\\Kolden\\AGENTS.md com nota canonica de Prometeu Sub-onda 3.2 concluida (condicional a Q3.A) — contagem 12 aiox-agents CONFIRMADA via Glob 2026-07-07, sem ajuste numerico"
              handoff_para_sub_onda_3_3:
                escopo: "57 skills padronizadas + 6 skills publicas com read-only + nota cross-squad no diff + costura final da Onda 3 + smoke test + Dike delta INDEPENDENTE por-subagente Explore isolado cobrindo 3.1+3.2+3.3 de uma vez"
                onde_registra: "C:\\Kolden\\Prometeu\\registros\\metodo-onda-3\\3.3-skills-e-costura\\"
                sessao: "dedicada em C:\\Kolden\\Prometeu\\ (G7 - nunca duas sub-ondas na mesma sub-sessao)"
              handoff_para_onda_4:
                recomendacao: "Olimpo (Grupo B Governance) — abre grupo B a partir do dono do Contrato de Missao + orquestrador Zeus"
                onde_registra: "C:\\Kolden\\Olimpo\\registros\\metodo-onda-4\\"
                sessao: "dedicada em C:\\Kolden\\Olimpo\\ (G7)"
```

---

## §8 — Próxima Sub-onda recomendada

**Sub-onda 3.3 = 57 skills padronizadas + 6 skills públicas com read-only + nota cross-squad no diff + costura final da Onda 3 + smoke test + Dike delta INDEPENDENTE por-subagente Explore cobrindo 3.1+3.2+3.3 de uma vez.**

Sessão dedicada em `C:\Kolden\Prometeu\` (G7 satisfeito — nunca duas sub-ondas na mesma sub-sessão).

Prazos: sessão dedicada; sem teto de rodadas.

**Após Sub-ondas 3.1 + 3.2 + 3.3 concluídas com 8/8 Dike:** próxima Onda recomendada é **Olimpo (Grupo B Governance — Ondas 4-6: Olimpo, Dike, Themis)** — abre o Grupo B a partir do dono do Contrato de Missão + orquestrador Zeus.

---

## §9 — Estado final desta Sub-onda 3.2 (PÓS-APLICAÇÃO)

- **Gate humano Passo 4 respondido 2026-07-07:** todas as 4 opções "Recomendada" aprovadas.
  - Q1 = A (em bloco por domínio)
  - Q2 = B (ARQUIVAR)
  - Q3 = A (squad.yaml SSoT + AGENTS.md raiz agora)
  - Q4 = A (Dike delta deferido Sub-onda 3.3)
- **Diff aplicado (Passo 5):** 19 mudanças canônicas + 1 condicional executadas.
  - Domínio A ✅ 10 UPDATEs cirúrgicos em `.claude/agents/aiox-*.md` (APPEND `<!-- kolden-art-x -->` bloco entre persona AIOX e ritual-de-encerramento).
  - Domínio B ✅ 1 CREATE `.claude/agents/aiox-master.md` (Orion — ASL-3).
  - Domínio C ✅ 4 MOVE MEMORY espúrios → `.claude/agent-memory/_archive-pre-kolden/` + CREATE README declarativo.
  - Domínio D ✅ UPDATE `agent-memory/prometeu.md` (seção por-agente + padrões novos) + UPDATE `squad.yaml` (bloco `mapeamento_cross_camada:`) + UPDATE `prometeu-chief.md` (personas Bob/Atlas) + UPDATE `C:\Kolden\AGENTS.md` raiz (nota canônica).
- **Passo 6 Dike delta INDEPENDENTE:** DEFERIDO para Sub-onda 3.3 conforme Q4.A (padrão herdado Sub-onda 3.1).
- **Passo 7 Ritual de encerramento:** ✅ backup `Prometeu/agent-memory/backups/prometeu-2026-07-07-pre-3.2-ritual.md` + APPEND padrões novos + UPDATE `MEMORY.md` squad-level. Contagem: 143 linhas agent-memory (≤150 — sem trim), 43 linhas MEMORY.md.
- **Working tree pós-aplicação (git status):**
  - **5 arquivos visíveis ao git:** `Prometeu/.claude/agents/prometeu-chief.md`, `Prometeu/MEMORY.md`, `Prometeu/agent-memory/prometeu.md`, `Prometeu/squad.yaml`, `C:\Kolden\AGENTS.md`.
  - **12 arquivos INVISÍVEIS ao git por `.gitignore` do vendor:** 10 UPDATE `.claude/agents/aiox-*.md` (linha 386 `.claude/agents/aiox-*.md`) + 1 CREATE `.claude/agents/aiox-master.md` (mesma linha) + 4 arquivos em `.claude/agent-memory/_archive-pre-kolden/` (linha 355 `.claude/agent-memory/`).
- **Achado tardio material PRM-3.2-019:** vendor SynkraAI `.gitignore` bloqueia visibilidade git das intervenções cirúrgicas Sub-onda 3.2 nos aiox-*.md. Aplicações em disco ✓ mas invisíveis ao git. **Decisão arquitetural pendente para Sub-onda 3.3:** manter bloqueado (padrão Sub-onda 3.1) OU patch cirúrgico ao `.gitignore` para abrir seletivamente (risco: merge conflict com upstream SynkraAI).
- **Vendor SynkraAI PRESERVADO INTOCADO:** ~450 arquivos + 12 canônicos AIOX + 10 MEMORY canônicos AIOX + 12 personas AIOX + Constitution AIOX v1.0.0. Confirmado via `git status` (nenhum arquivo `.aiox-core/**` modificado).
- **Commit:** nenhum (G2 respeitado — sem ordem explícita).
- **Fan-out:** 0/3 (regra 9x confirmada — 9ª confirmação consecutiva).
- **Passos concluídos:** 1 (leitura das 4 fontes) + 2 (diagnóstico) + 3 (6 artefatos) + 4 (gate humano) + 5 (aplicação) + 7 (ritual encerramento) + 8 (AGENTS.md raiz).
- **Passos pendentes:** 6 Dike delta (deferido Sub-onda 3.3) + 9 handoff Sub-onda 3.3 (a fazer agora).

---

*Sumário executivo Sub-onda 3.2 produzido por `prometeu-chief` (raiz Kolden) em 2026-07-07 no Contrato-mãe `m-20260706-metodo-kolden`. 6 artefatos canônicos gravados + 19 mudanças canônicas + 1 condicional aplicadas. Sem commit até ordem explícita. Vendor SynkraAI preservado intocado. Constituição AIOX v1.0.0 preservada. 12 agentes canônicos AIOX intocados. MEMORY canônico AIOX respeitado como fonte-de-verdade. Achado tardio PRM-3.2-019 (gitignore vendor bloqueia visibilidade git de 12/19 arquivos aplicados) documentado para gate humano Sub-onda 3.3.*
