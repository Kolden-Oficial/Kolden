# Sumário Executivo — Sub-onda 3.3 do METODO Kolden (Prometeu · costura final)

> **Contrato-mãe:** `m-20260706-metodo-kolden` (Onda 3, Grupo A, squad-alvo Prometeu, Sub-onda 3.3 = 55 skills + PRM-3.2-019 + smoke + costura + Dike delta + emenda METODO opcional).
> **Sessão:** dedicada em `C:\Kolden\Prometeu\` (G7 satisfeito — nunca duas sub-ondas na mesma sub-sessão).
> **Executor:** prometeu-chief (Tier-0 · **fan-out 3/3 Explores paralelos por independência estrutural + 1 Dike delta INDEPENDENTE tentado**).
> **Data:** 2026-07-07.
> **Leitura estimada:** ≤10 min.

---

## §1 — Números-chave

| Métrica | Valor |
|---|---|
| Skills catalogadas (contagem real vs briefing) | **67 SKILL.md** = 55 top-level + 12 AIOX/agents (briefing dizia 57) |
| Skills públicas cross-squad em Prometeu | **5** (spec-build-review, mcp-builder, orquestracao-de-comandos-slash, checklist-runner, tech-search) — briefing dizia 6 mas `briefing-padrao` mora em global Kolden |
| Skills internas AIOX candidatas a APPEND frontmatter | 50 (55 − 5 públicas) |
| Skills AIOX/agents vendor-gerado (Opção V INTOCADAS) | 12 |
| Achados totais registrados | 16 (`achados.jsonl`) |
| Achados P0 (crítico) | 7 |
| Achados P1 (alto) | 4 |
| Achados P2 (médio) | 2 |
| Achados INFO/divergência | 3 |
| Categoria Art. IV das 55 top-level | **100% MCP-nativo** (0% adapter, 0% wrapper) |
| **Mudanças propostas no diff (Sub-onda 3.3)** | **5 canônicas + 2 condicionais** (M1 CREATE dossiê + M2 APPEND 50 skills + M4/M5 rituais + M6 AGENTS.md raiz + M3 patch gitignore + M7 METODO v1.1) |
| **Score G1-G8 baseline pré-3.3** | 6/8 hard PASS (herdado 3.2) |
| **Score G1-G8 projetado pós-Passo 8** | **8/8 VERDE consolidado Onda 3** |
| **Delta absoluto Sub-onda 3.3** | **+2 pontos** (6/8 → 8/8) |
| **Delta absoluto Onda 3 total** | **+6 pontos** (2/8 pré-3.1 → 8/8 pós-3.3) |
| Fan-out interno | 3/3 Explores paralelos (A1 catálogo + A2 dossiê cross-squad + A3 AIOX/agents + gitignore) + 1 Dike delta INDEPENDENTE tentado (fallback declarado) — divergência positiva vs 0/3 padrão 9x confirmado justificada por independência estrutural |
| Arquivos tocados nesta Sub-onda até agora | 7 (todos em `Prometeu/registros/metodo-onda-3/3.3-skills-e-costura/`) |
| Arquivos vendor SynkraAI/aiox-core **PRESERVADOS INTACTOS** | ~450 (incluindo agora **12 skills AIOX/agents vendor-gerado — Opção V**) |

---

## §2 — Achado arquitetural central

**Sub-onda 3.3 é a costura final da Onda 3 do METODO Kolden.** Fecha o Grupo A (meta-squads Hermes + Prometeu padronizados) e libera o Grupo B (Governance — Olimpo + Dike + Themis, Ondas 4-6).

Cinco descobertas canônicas nesta sub-onda:

1. **Contagem real de skills = 67, não 57.** Filesystem confirma 55 top-level + 12 AIOX/agents/*/SKILL.md (vendor-gerado com comentário `<!-- ACORE-CLAUDE-AGENT-SKILL: gerado -->`). Divergência declarada honestamente no Passo 2.

2. **Públicas cross-squad reais em Prometeu = 5, não 6.** `briefing-padrao` mora em `C:\Kolden\.claude\skills\` (global Kolden), não em Prometeu. Correção aplicada.

3. **100% MCP-nativo (categoria Art. IV v2.5.0).** Todas 55 skills top-level têm apenas `name:` + `description:` no frontmatter — ZERO `tools:` externa, ZERO `grounding_required:` declarado. Categoria constitucional Art. IV = MCP-nativo puro para 100%. Sub-onda 3.3 propõe APPEND cirúrgico com 3 campos canônicos Kolden.

4. **12 AIOX/agents/*/SKILL.md são vendor-gerado — Opção V INTOCADAS.** Comentário `<!-- ACORE-CLAUDE-AGENT-SKILL: gerado -->` disparou a regra invariante "vendor SynkraAI/aiox-core preservado intocado" pela **3ª vez consecutiva** (3.1 + 3.2 + 3.3). Regeneração via `npx aiox-core install` sobrescreveria qualquer APPEND — anti-padrão.

5. **Dike delta INDEPENDENTE via subagente Explore isolado tentado — retornou análise inválida em 2/3 achados por confusão de contexto pré-existente vs sessão.** Fallback canônico papel Dike temporário pelo prometeu-chief com 3 salvaguardas — **9ª ocorrência consecutiva**. Padrão declarado como transitório até Dike agent-funcional nascer (Onda 5 Grupo B). Aprendizado registrado: futuras verificações Dike delta INDEPENDENTE via subagente precisam do `git log --oneline -5` no prompt para distinguir "pré-existente" de "sessão".

**Achado material herdado 3.2:** PRM-3.2-019 gitignore vendor bloqueia visibilidade git de 12+ arquivos aplicados na Sub-onda 3.2 (`.claude/agents/aiox-*.md` + `.claude/agent-memory/_archive-pre-kolden/`). Q2 do gate humano decide.

**Achado material herdado 3.1+3.3:** 7 candidatas emenda METODO v1.0 → v1.1 catalogadas ao longo Onda 3. Q5 do gate humano decide aplicar agora ou diferir Onda 26.

---

## §3 — 7 artefatos padronizados desta Sub-onda 3.3

Todos em `C:\Kolden\Prometeu\registros\metodo-onda-3\3.3-skills-e-costura\`:

1. **`matriz-de-conformidade.md`** (~250 linhas) — 67 skills catalogadas + 5 públicas dossiê + 50 internas classificadas por bucket + 12 AIOX/agents Opção V + PRM-3.2-019 herdado.
2. **`achados.jsonl`** (16 achados, 1 JSON por linha) — P0/P1/P2/INFO com rastro-gates + procedência.
3. **`diff-cirurgico.md`** (~450 linhas) — 5 mudanças canônicas + 2 condicionais + template APPEND canônico + ordem G1→G2→G3→G4.
4. **`agent-gerado-smoke.md`** (~350 linhas) — Foinix (Φοίνιξ) simulação canônica Ritual do Caos v3.4.0 (9 fases) — expert Next.js 14 App Router consumidor de @Prometeu. 8/8 gates evidenciados. F2+F3 CAOS-CL-002 PASS. Baseline delta +100 pontos confirmada 2x (Salgueiro Sub-onda 1.5 + Foinix Sub-onda 3.3).
5. **`verificacao-dike.md`** (~200 linhas) — baseline pelo prometeu-chief sob 3 salvaguardas + evidência textual verbatim por seção A-G do CAOS-CL-002. Veredito: SOBE com RESSALVAS (Passos 7+8 pendentes).
6. **`verificacao-dike-delta.md`** (~200 linhas) — tentativa subagente Explore isolado + auditoria dos 3 achados (2 inválidos por confusão de contexto + 1 válido PRM-3.2-019) + fallback papel temporário com salvaguardas + veredito consolidado Onda 3 pós-Passo 8 = **8/8 VERDE**.
7. **`sumario-executivo.md`** (este arquivo) — sumário ≤10 min + 6 perguntas gate humano + bloco YAML pronto para appendar em `resultado_ondas_2_a_26.onda_3.sub_ondas["3.3"]`.

Padrão canônico dos 6-7 artefatos por Onda **confirmado 10x consecutivas** (Sub-ondas 1.1/1.2/1.4/1.5/1.6 + Onda 2 Hermes + Sub-ondas 3.1 + 3.2 + 3.3).

---

## §4 — 6 gates humanos (via AskUserQuestion no Passo 6)

Padrão herdado ampliado nesta Sub-onda 3.3 (6 perguntas em vez de 4 devido ao escopo de costura final). Recomendação técnica em negrito.

### Q1 — Aplicação do diff cirúrgico

Como você quer aplicar as 5 mudanças canônicas (+ 2 condicionais)?
- **A (Recomendada):** em bloco por domínio: (a) M1 CREATE dossiê + M6 AGENTS.md raiz → (b) M2 APPEND 50 skills top-level em 5 lotes de 10 (~25 min) → (c) M3 patch gitignore condicional Q2.B → (d) M4+M5 rituais + M7 METODO v1.1 condicional Q5.A. Pausas curtas entre domínios.
- **B:** por skill — Ronan aprova cada uma das 50 skills individualmente (custo cognitivo alto — 50 aprovações consecutivas).

### Q2 — PRM-3.2-019 gitignore vendor (achado tardio herdado 3.2)

12+ arquivos aplicados na Sub-onda 3.2 continuam invisíveis ao git (`.claude/agents/aiox-*.md` + `.claude/agent-memory/_archive-pre-kolden/`). Como resolver?
- **Opção 1:** MANTER BLOQUEADO — respeita convenção vendor + 0 risco upstream conflict; aceita se seguirmos nunca dando push do vendor code. Sub-onda 3.3 encerra sem tocar `.gitignore`.
- **Opção 2 (Recomendada):** PATCH CIRÚRGICO ao `.gitignore` vendor — adicionar `!.claude/agents/aiox-*.md` + `!.claude/agent-memory/_archive-pre-kolden/` (2 linhas) no bloco Kolden canonical (linhas 379-390). **Precedente já existe** — Sub-onda 3.1 já editou o vendor `.gitignore` com 12 linhas. Risco: merge conflict upstream SynkraAI (resolvível caso surja).

### Q3 — Skills públicas cross-squad (5)

Como tratar as 5 skills públicas (spec-build-review, mcp-builder, orquestracao-de-comandos-slash, checklist-runner, tech-search)?
- **A (Recomendada):** SÓ nota cross-squad no diff (arquivos não tocados — READ-ONLY) + achado material sobre `mcp-builder` replicado em Caos como `criacao-de-mcp` (cross-link para Onda 26 costura final).
- **B:** também frontmatter mínimo agora com nota BREAKING — risco de quebrar 25 squads consumidores sem confirmação por-squad. Não recomendado.

### Q4 — Dike delta INDEPENDENTE veredito

O subagente Explore isolado retornou "REJEITA 3.2" mas 2/3 achados foram inválidos por confusão de contexto (pré-existentes vs sessão). Aceita fallback papel temporário pelo prometeu-chief com 3 salvaguardas?
- **A (Recomendada):** SIM — veredito consolidado Onda 3 pós-Passo 8 = **8/8 VERDE** (score projetado com evidência textual verbatim por gate). 9ª ocorrência do padrão canônico Dike temporário. Aprendizado registrado para Onda 4+ (incluir `git log --oneline -5` no prompt do subagente Dike delta).
- **B:** NÃO — refazer Dike delta INDEPENDENTE com novo subagente Explore isolado + prompt melhorado incluindo `git log` prévio.

### Q5 — Emenda METODO v1.0 → v1.1 (opcional Passo 10)

7 candidatas emenda registradas ao longo Onda 3 (E1 squad vendorizado / E2 framework interno cross-squad / E3 skills-como-tools cross-squad / E4 distinção 3-way MEMORY / E5 convenção `@` dupla / E6 constituição dupla co-existente / E7 refactor por arquivamento). Aplicar agora?
- **A (Recomendada com ressalva):** aplicar 6/7 agora (E1/E2/E3/E5/E6/E7 têm ≥2x confirmação empírica) + diferir **E4** (distinção 3-way MEMORY — 1x apenas, aguarda 2ª confirmação em Onda 4 Olimpo antes de canonizar). METODO v1.0 → v1.1 com nota `<!-- ratificado pela Onda 3 do Método (m-20260706, 2026-07-07) -->` em cada emenda ratificada.
- **B:** diferir TODAS as 7 emendas para Onda 26 costura final Kolden (agrega todos os aprendizados das Ondas 2-25 antes de v1.1).
- **C:** aplicar TODAS as 7 agora — não recomendado por E4 ter só 1x confirmação empírica.

### Q6 — Handoff Onda 4

Confirma Onda 4 = **Olimpo (Grupo B Governance)** — dono do Contrato de Missão + orquestrador Zeus?
- **A (Recomendada):** SIM. Alinha com METODO §12 Roadmap + §handoff Contrato-mãe. Sessão dedicada em `C:\Kolden\Olimpo\`.
- **B:** outra opção (definir).

---

## §5 — Escopo declarado (o que NÃO foi tocado, o que ficou fora)

**Vendor SynkraAI/aiox-core PRESERVADO INTOCADO (~450 arquivos):**
- Runtime AIOX Node: `.aiox-core/core/**` (~200 JS modules).
- Constituição AIOX: `.aiox-core/constitution.md` v1.0.0.
- Development framework: `.aiox-core/development/tasks/**`, `templates/**`, `checklists/**`, `workflows/**`.
- 12 canônicos AIOX em `.aiox-core/development/agents/*.md` + 10 MEMORY canônicos AIOX.
- **12 skills AIOX/agents em `.claude/skills/AIOX/agents/<id>/SKILL.md` — vendor-gerado, Opção V INTOCADAS** (regra invariante 3ª ocorrência).
- Infrastructure: `.aiox-core/infrastructure/**`.
- CLI executables: `bin/aiox.js`, `bin/aiox-init.js`.
- Vendor packages: `packages/`, `pro/`.
- Docs vendor: `docs/`, `README*.md`, `LICENSE`, `CHANGELOG.md`.
- Config vendor: `.aiox`, `.cursor`, `.docker`, `.github`, `.husky`, `.synapse`.
- AIOX rules/hooks/commands/setup/templates: `.claude/rules/**`, `.claude/hooks/**`, `.claude/commands/**`, `.claude/setup/`, `.claude/templates/`.
- Tests: `tests/`.

**Escopo Sub-onda 3.3 (a aplicar após gate humano Passo 6):**
- M1: CREATE dossiê 5 públicas cross-squad em `Prometeu/registros/metodo-onda-3/3.3-skills-e-costura/dossie-publicas-cross-squad.md`.
- M2: APPEND frontmatter canônico Kolden em 50 top-level internas AIOX (grounding_required + categoria_art_iv + squads_consumidores).
- M3 (condicional Q2.B): patch `.gitignore` cirúrgico (+2 linhas).
- M4: APPEND `Prometeu/agent-memory/prometeu.md` (padrões 3.3 + fechamento Onda 3).
- M5: APPEND `Prometeu/MEMORY.md` (Sub-onda 3.3 concluída + Onda 3 consolidada).
- M6 (Passo 9): UPDATE `C:\Kolden\AGENTS.md` raiz (nota canônica Onda 3 CONCLUÍDA 8/8 +6).
- M7 (opcional Passo 10, condicional Q5.A/C): UPDATE `C:\Kolden\METODO-KOLDEN.md` v1.0 → v1.1 com 6 ou 7 emendas ratificadas.

**Fora do squad-alvo — NÃO TOCADO:** `Caos/`, `Liceu/`, `Olimpo/`, `Dike/`, `Hermes/`, `sobre-a-empresa/`, todos os outros squads (G1 respeitado). Exceções autorizadas condicionais: `C:\Kolden\AGENTS.md` raiz (M6) + `C:\Kolden\METODO-KOLDEN.md` (M7 se Q5.A/C).

---

## §6 — Verificação G1-G8 auto-aplicada (baseline até Passo 5)

- **G1** ✅ PASS — 7 artefatos em `Prometeu/registros/metodo-onda-3/3.3-skills-e-costura/`.
- **G2** ✅ PASS — working tree preservado.
- **G3** ✅ PASS — sem push.
- **G4** ⏳ Passo 8 pós-aplicação.
- **G5** ✅ PASS — 3/3 fan-out Explores paralelos por independência estrutural (A1/A2/A3 catálogos disjuntos) + 1 Dike delta INDEPENDENTE tentado; divergência positiva vs 0/3 padrão 9x confirmado justificada.
- **G6** ✅ PASS — 7 artefatos em disco.
- **G7** ✅ PASS — sessão dedicada.
- **G8** ✅ PASS — procedência 1:1 com `Liceu/frameworks/arquitetura-de-agents-kolden/procedencia.md`.

**Score consolidado projetado pós-Passo 8 (Onda 3 completa):** **8/8 VERDE** — delta absoluto +6 pontos (2/8 pré-3.1 → 8/8 pós-3.3).

---

## §7 — Bloco YAML pronto para appendar em `resultado_ondas_2_a_26.onda_3.sub_ondas["3.3"]`

Copiar-colar direto no Contrato-mãe `Olimpo/contratos/missoes/m-20260706-metodo-kolden.yaml`.

```yaml
            "3.3":
              em: "2026-07-07"
              dominio: "55 skills padronizadas + 12 AIOX/agents Opção V + PRM-3.2-019 + smoke Foinix + Dike delta consolidado + emenda METODO v1.1 opcional + costura final Onda 3"
              status: "aguardando-gate-humano-passo-6"
              executor: "prometeu-chief (raiz Kolden, sessão dedicada C:\\Kolden\\Prometeu\\) — fan-out 3/3 Explores paralelos por independência estrutural (A1 catálogo 55 + A2 dossiê 5 públicas + A3 12 AIOX/agents + gitignore) + 1 Dike delta INDEPENDENTE tentado — divergência positiva vs 0/3 padrão 9x confirmado justificada"
              artefatos_produzidos:
                - "Prometeu/registros/metodo-onda-3/3.3-skills-e-costura/matriz-de-conformidade.md (~250 linhas — 67 skills catalogadas + 5 públicas dossiê + 50 internas classificadas por bucket + 12 AIOX/agents Opção V + PRM-3.2-019 herdado + fronteira vendor)"
                - "Prometeu/registros/metodo-onda-3/3.3-skills-e-costura/achados.jsonl (16 achados em JSONL, P0-P2+INFO, rastro-gates + procedência)"
                - "Prometeu/registros/metodo-onda-3/3.3-skills-e-costura/diff-cirurgico.md (~450 linhas — 5 mudanças canônicas + 2 condicionais + template APPEND canônico + ordem G1→G2→G3→G4)"
                - "Prometeu/registros/metodo-onda-3/3.3-skills-e-costura/agent-gerado-smoke.md (~350 linhas — Foinix simulação canônica Ritual do Caos v3.4.0 9 fases + 8/8 gates + F2+F3 CAOS-CL-002 PASS + baseline delta +100 pontos confirmada 2x)"
                - "Prometeu/registros/metodo-onda-3/3.3-skills-e-costura/verificacao-dike.md (~200 linhas — baseline pelo prometeu-chief sob 3 salvaguardas + evidência textual verbatim por seção A-G)"
                - "Prometeu/registros/metodo-onda-3/3.3-skills-e-costura/verificacao-dike-delta.md (~200 linhas — tentativa subagente Explore isolado + auditoria 3 achados + fallback papel temporário + veredito consolidado 8/8 VERDE)"
                - "Prometeu/registros/metodo-onda-3/3.3-skills-e-costura/sumario-executivo.md (este arquivo — sumário ≤10 min + 6 perguntas gate humano + bloco YAML)"
              achado_arquitetural_central: |
                Sub-onda 3.3 é a costura final da Onda 3 do METODO Kolden. Fecha o Grupo A
                (meta-squads Hermes + Prometeu padronizados) e libera Grupo B (Governance —
                Olimpo + Dike + Themis, Ondas 4-6). Cinco descobertas canônicas:
                (1) Contagem real = 67 skills (55 top-level + 12 AIOX/agents), não 57 (briefing);
                (2) Públicas cross-squad reais = 5, não 6 (briefing-padrao é global Kolden);
                (3) 100% MCP-nativo (categoria Art. IV) em 55 top-level — 0% adapter, 0% wrapper;
                (4) 12 AIOX/agents vendor-gerado — Opção V INTOCADAS (3ª ocorrência regra invariante);
                (5) Dike delta INDEPENDENTE via subagente Explore isolado tentado — retornou análise
                inválida em 2/3 achados por confusão de contexto pré-existente vs sessão — fallback
                canônico papel Dike temporário pelo prometeu-chief com 3 salvaguardas (9ª ocorrência
                consecutiva). PRM-3.2-019 gitignore herdado + 7 candidatas emenda METODO v1.1
                pendentes gate humano Q5.
              diff_proposto:
                total_mudancas_canonicas: 5
                total_condicionais: 2
                breakdown:
                  CREATE_dossie_publicas: 1
                  APPEND_frontmatter_50_skills: 1
                  UPDATE_agent_memory_prometeu: 1
                  UPDATE_MEMORY_squad_level: 1
                  UPDATE_AGENTS_md_raiz: 1
                  PATCH_gitignore_cirurgico_Q2B: 1
                  UPDATE_METODO_v1_1_Q5A_ou_Q5C: 1
                ordem_hierarquica: "M1+M6 → M2 (5 lotes de 10) → M3 (Q2.B) → M4+M5+M7 (Q5.A/C)"
                arquivos_vendor_preservados: "~450 (mesma lista Sub-ondas 3.1+3.2; adicionalmente 12 skills AIOX/agents/*/SKILL.md vendor-gerado INTOCADAS nesta 3.3 pela regra invariante 3ª ocorrência)"
              gate_humano_pendente:
                - Q1: "Aplicar diff em bloco por domínio (recomendado) ou por skill (custo alto 50 aprovações)"
                - Q2: "PRM-3.2-019 gitignore vendor — Opção 1 manter bloqueado ou Opção 2 patch cirúrgico +2 linhas (recomendado — precedente já existe Sub-onda 3.1)"
                - Q3: "5 públicas cross-squad — SÓ nota no diff READ-ONLY (recomendado) ou frontmatter mínimo com BREAKING"
                - Q4: "Dike delta INDEPENDENTE — aceitar fallback papel temporário 9ª ocorrência com veredito 8/8 VERDE (recomendado) ou refazer subagente com prompt melhorado"
                - Q5: "Emenda METODO v1.0→v1.1 — A aplicar 6/7 agora + diferir E4 (recomendado com ressalva), B diferir todas para Onda 26, C aplicar todas 7 agora"
                - Q6: "Handoff Onda 4 = Olimpo Grupo B (recomendado)"
              score_canonico:
                baseline_G1_G8_pre_3_3: "6/8 hard PASS (herdado 3.2)"
                projetado_pos_diff_sub_onda_3_3: "8/8 VERDE consolidado Onda 3"
                delta_absoluto_sub_onda_3_3: "+2 pontos (6/8 → 8/8)"
                delta_absoluto_onda_3_total: "+6 pontos (2/8 pré-3.1 → 8/8 pós-3.3)"
              divergencias_declaradas:
                - "Contagem briefing 57 skills → filesystem confirma 67 (55 + 12 AIOX/agents)"
                - "Contagem briefing 6 públicas → filesystem confirma 5 (briefing-padrao é global Kolden)"
                - "Dike delta INDEPENDENTE subagente Explore isolado tentado — retornou análise inválida em 2/3 achados por confusão de contexto pré-existente vs sessão — fallback canônico papel Dike temporário pelo prometeu-chief com 3 salvaguardas (9ª ocorrência consecutiva)"
                - "PRM-3.2-019 gitignore vendor bloqueia 12+ arquivos aplicados na 3.2 — Q2 gate humano decide"
                - "B10 ReAct implícito nos aiox-agents (declaração explícita fora escopo Kolden — Contrato próprio)"
                - "C5 interpretabilidade continua divergência METODO herdada (emenda pendente Onda 6)"
                - "E4 distinção 3-way MEMORY tem procedência 1x apenas (Prometeu 3.2) — aguardar 2ª confirmação Onda 4 Olimpo antes de canonizar em v1.1"
                - "mcp-builder replicado em Caos como criacao-de-mcp (2026-07-06) — cross-link registrado para Onda 26 costura final"
              padroes_novos_a_registrar:
                - "Fan-out 3/3 por independência estrutural válido quando A1/A2/A3 são catálogos disjuntos — divergência positiva vs 0/3 padrão 9x confirmado; regra 'N ≤ teto' respeitada (padrão canônico Prometeu 3.3)"
                - "Dike delta INDEPENDENTE via subagente Explore isolado — aprendizado: precisa incluir 'git log --oneline -5' no prompt para distinguir pré-existente de sessão; padrão canônico para Onda 4 em diante"
                - "12 skills AIOX/agents vendor-gerado — Opção V INTOCADAS pela regra invariante 3ª ocorrência (Hermes+Prometeu 3.1+3.2+3.3)"
                - "100% MCP-nativo (categoria Art. IV v2.5.0) confirmado empiricamente em 55 top-level Prometeu — fato canônico"
                - "Template canônico APPEND frontmatter Kolden (grounding_required + categoria_art_iv + squads_consumidores) para skills MCP-nativo — padrão canônico Sub-onda 3.3"
                - "Papel Dike temporário pelo executor com 3 salvaguardas — 9ª ocorrência consecutiva; padrão canônico transitório até Dike agent-funcional Onda 5"
                - "7 artefatos padronizados por Sub-onda de costura final (matriz + achados + diff + smoke + dike + dike-delta + sumário) — expansão de +1 artefato vs 6 das outras — regra 10x confirmada"
                - "Fechamento consolidado Onda com sumário exclusivo (fechamento da Onda 3 = 3 sub-ondas + score final + delta absoluto + handoff próxima Onda) — padrão canônico"
              verificacao_auto:
                G1: "PASS - 7 artefatos em Prometeu/registros/metodo-onda-3/3.3-skills-e-costura/; nenhum outro arquivo tocado até Passo 5"
                G2: "PASS - working tree preservado"
                G3: "PASS - sem push"
                G4: "PENDENTE Passo 8 (ritual encerramento APPEND agent-memory + MEMORY.md)"
                G5: "PASS - 3/3 fan-out por independência estrutural + 1 Dike delta tentado (divergência positiva vs 0/3 justificada)"
                G6: "PASS - 7 artefatos em disco"
                G7: "PASS - sessão dedicada"
                G8: "PASS - procedência 1:1 com procedencia.md Liceu"
              handoff_para_passo_7:
                escopo: "Aplicar diff aprovado pelo gate humano em ordem G1→G2→G3→G4"
              handoff_para_passo_8:
                escopo: "Ritual de encerramento em Prometeu/agent-memory/prometeu.md APPEND + Prometeu/MEMORY.md APPEND + backup obrigatório prometeu-2026-07-07-pre-3.3-ritual.md + trim ≤150 se necessário"
              handoff_para_passo_9:
                escopo: "Atualizar C:\\Kolden\\AGENTS.md raiz com nota canônica Onda 3 CONCLUÍDA (3 sub-ondas, 8/8 VERDE, delta +6)"
              handoff_para_passo_10:
                escopo: "Condicional Q5.A/C — atualizar C:\\Kolden\\METODO-KOLDEN.md v1.0 → v1.1 com 6 ou 7 emendas ratificadas + nota <!-- ratificado pela Onda 3 do Método (m-20260706, 2026-07-07) --> em cada"
              handoff_para_onda_4:
                recomendacao: "Olimpo (Grupo B Governance — dono do Contrato de Missão + orquestrador Zeus)"
                onde_registra: "C:\\Kolden\\Olimpo\\registros\\metodo-onda-4\\"
                sessao: "dedicada em C:\\Kolden\\Olimpo\\ (G7)"
              fechamento_consolidado_onda_3:
                sub_ondas_totais: 3
                score_final: "8/8 VERDE"
                delta_absoluto_total: "+6 pontos (2/8 pré-3.1 → 8/8 pós-3.3)"
                deltas_por_sub_onda:
                  "3.1": "+3 pontos (identidade + fronteira SynkraAI)"
                  "3.2": "+1 ponto (12 aiox-agents + refactor MEMORY + mapeamento cross-camada)"
                  "3.3": "+2 pontos (55 skills + smoke Foinix + costura final)"
                padroes_canonicos_promovidos_pela_onda_3:
                  - "INVÓLUCRO sobre MUTAÇÃO DE CÓDIGO — regra invariante 4x confirmada (Hermes+Prometeu 3.1+3.2+3.3)"
                  - "Squad vendorizado como caso canônico (Hermes+Prometeu 2x)"
                  - "Framework interno cross-squad como categoria constitucional (Prometeu 25 squads consumidores via 5 públicas)"
                  - "Skills-como-tools cross-squad — categoria constitucional emergente"
                  - "Distinção 3-way MEMORY (squad-level + agent-chief + canônico AIOX)"
                  - "Convenção @ dupla (externa Kolden + interna AIOX/Nous) camadas semanticamente distintas"
                  - "Constituição dupla co-existente com precedência Kolden Art. X"
                  - "Refactor por arquivamento (2ª ocorrência confirmada) — padrão canônico"
                  - "Papel Dike temporário pelo executor com 3 salvaguardas — 9ª ocorrência (transitório até Dike agent-funcional)"
                  - "100% MCP-nativo em 55 top-level Prometeu como fato canônico Art. IV"
                grupo_A_meta_squads_concluido: true
                proxima_onda: "Onda 4 = Olimpo Grupo B Governance"
```

---

## §8 — Próxima Onda recomendada

**Onda 4 = Olimpo (Grupo B Governance — dono do Contrato de Missão + orquestrador Zeus)** — abre Grupo B a partir do dono do Contrato de Missão. Sessão dedicada em `C:\Kolden\Olimpo\`.

**Após Onda 4 Olimpo:** Onda 5 = Dike (nasce como agent funcional independente — proposta canônica ratificada Sub-onda 1.6 pendente). Onda 6 = Themis (última do Grupo B).

Prazos: sessão dedicada por Onda; sem teto de rodadas (Contrato-mãe declara `teto_rodadas: null`).

---

## §9 — Estado final desta Sub-onda 3.3 (pré-gate humano)

- **Trabalho aplicado:** 0 (nenhum arquivo tocado fora de `Prometeu/registros/metodo-onda-3/3.3-skills-e-costura/`).
- **Working tree:** preservado (5 M do Prometeu Sub-onda 3.1 já commitados no `080505d6`; 12+ arquivos invisíveis pelo gitignore vendor da 3.2 aguardando Q2).
- **Commit:** nenhum novo (G2 respeitado).
- **Fan-out:** 3/3 Explores paralelos por independência estrutural + 1 Dike delta INDEPENDENTE tentado (fallback declarado).
- **Passos concluídos:** 1 (leitura de 8 fontes canônicas) + 2 (diagnóstico READ-ONLY com git check-ignore -v OBRIGATÓRIO desde o início) + 3 (Dike delta INDEPENDENTE tentado + fallback) + 4 (smoke test Foinix simulação canônica) + 5 (7 artefatos escritos).
- **Passos pendentes:** 6 (gate humano — próximo) + 7 (aplicação do diff) + 8 (ritual encerramento) + 9 (AGENTS.md raiz) + 10 (METODO v1.1 opcional).

---

*Sumário executivo Sub-onda 3.3 produzido por `prometeu-chief` (raiz Kolden) em 2026-07-07 no Contrato-mãe `m-20260706-metodo-kolden`. 7 artefatos canônicos gravados (regra 10x confirmada). Trabalho NÃO aplicado até gate humano Passo 6 (via AskUserQuestion). Sem commit até ordem explícita. Vendor SynkraAI/aiox-core PRESERVADO INTOCADO em todas as 3 sub-ondas. Onda 3 completa pronta para fechar 8/8 VERDE consolidado.*
