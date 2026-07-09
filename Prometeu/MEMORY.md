# MEMORY.md — Prometeu (Squad-level Kolden)

> **Analógico ao criado na Onda 2 do Hermes** — memória do SQUAD (padrões estruturais), não do agent-chief. Padrões técnicos de execução ficam em `agent-memory/prometeu.md`.
> **Ratificado:** 2026-07-07 (Sub-onda 3.1 do Contrato-mãe `m-20260706-metodo-kolden`).

## Padrões estruturais canônicos Kolden aplicados

- **Squad vendorizado** — segunda ocorrência do padrão após Hermes/Nous (Onda 2). Camada Kolden PT-BR envelopa vendor SynkraAI/aiox-core preservado intocado. Regra invariante: nenhuma mutação de código Node/YAML/MD vendor AIOX sem Contrato de Missão próprio (Fase 3 residual). Vendor SynkraAI intocado (~450 arquivos).
- **Constituição dupla co-existente** — Constitution AIOX interna (`.aiox-core/constitution.md`, 6 artigos engenharia-focados) coexiste com Constitution Kolden externa (`constitution.md` raiz, 15 veto-operacionais Art. X agent-safety-focados). Regra de precedência: Kolden Art. X prevalece em conflito.
- **Deny cirúrgico em L1+L2 vendor** — `.claude/settings.json` bloqueia Write/Edit em `.aiox-core/core/**`, `.aiox-core/constitution.md`, `bin/aiox.js`, `bin/aiox-init.js`, `.aiox-core/development/{tasks,templates,checklists,workflows}/**`, `.aiox-core/infrastructure/**`. Aprendizado transferido da Onda 2 do Hermes — aplicado como padrão invariante.
- **Convenção `@` dupla** — `@Prometeu` externo (dispatch cross-squad Kolden na Camada 5 do METODO §3) coexiste com `@dev`/`@qa`/`@architect`/etc. interno (ativação de aiox-agent AIOX vendor herdado de `.aiox-core/constitution.md` Art. II). Camadas semanticamente distintas — não conflitam.
- **Skills-como-tools cross-squad** — categoria constitucional emergente (candidata emenda METODO v1.1). 6 skills públicas (`spec-build-review`, `mcp-builder`, `orquestracao-de-comandos-slash`, `checklist-runner`, `tech-search`, `briefing-padrao`) são consumidas por outros 25 squads Kolden como tools funcionais.

## Padrões de escala aplicados

- **57 skills = maior número da Kolden** — Sub-onda 3.1 aplica padronização de identidade + fronteira (0 skills tocadas); Sub-onda 3.3 fará skills com read-only + nota cross-squad no diff conforme gate humano Passo 2 da Onda 3.
- **12 aiox-agents internos com MEMORY canônico AIOX** — Sub-onda 3.2 respeita path canônico AIOX (`.aiox-core/development/agents/<id>/MEMORY.md`); NUNCA duplica/move. Regra da skill `ritual-de-encerramento` § "Regra de resolução da memória" item 1.

## Handoffs Sub-ondas

- **Sub-onda 3.2** (concluída 2026-07-07 em `C:\Kolden\Prometeu\`): 12 aiox-agents internos padronizados via 10 UPDATE APPEND `.claude/agents/aiox-*.md` + 1 CREATE `.claude/agents/aiox-master.md` (Orion — ASL-3) + refactor 4 MEMORY espúrios para `_archive-pre-kolden/` + APPEND bloco `mapeamento_cross_camada:` em `squad.yaml` (SSoT YAML) + APPEND seção por-agente em `agent-memory/prometeu.md` + correção personas Bob/Atlas em `prometeu-chief.md` + APPEND nota canônica em `C:\Kolden\AGENTS.md`. **19 mudanças canônicas + 1 condicional aplicadas.** Vendor SynkraAI intocado. Dike delta INDEPENDENTE deferido para Sub-onda 3.3.
- **Sub-onda 3.3** (concluída 2026-07-09 em `C:\Kolden\Prometeu\`): 55 skills top-level padronizadas (50 internas AIOX APPEND frontmatter canônico Kolden `grounding_required` + `categoria_art_iv: MCP-nativo` + `squads_consumidores: [Prometeu-interno]` via script Python idempotente; 5 públicas cross-squad READ-ONLY + dossiê `dossie-publicas-cross-squad.md`) + 12 AIOX/agents Opção V INTOCADAS (regra invariante 3ª ocorrência) + PRM-3.2-019 resolvido via patch cirúrgico `.gitignore` (+2 exceções) + smoke test canônico **Foinix** (expert Next.js 14 App Router consumidor de @Prometeu — 8/8 gates + baseline delta +100 pontos) + Dike delta INDEPENDENTE por subagente Explore isolado tentado (retornou análise inválida em 2/3 achados por confusão de contexto pré-existente vs sessão → fallback papel Dike temporário pelo prometeu-chief com 3 salvaguardas — **9ª ocorrência consecutiva**) + costura final Onda 3. **5 mudanças canônicas + 2 condicionais aplicadas.** Contagem real: 67 SKILL.md (55 top-level + 12 AIOX/agents), não 57 do briefing. 5 públicas em Prometeu (não 6 — `briefing-padrao` é global Kolden). 100% MCP-nativo confirmado.

## Score G1-G8 canônico Kolden

- **Baseline pré-Sub-onda 3.1:** ~2/8 hard PASS (G1 parcial via AIOX Constitution + G8 N/A legítimo).
- **Pós Sub-onda 3.1:** ~5/8 hard PASS (G1 + G2 + G3 + G4 + G8) + 3 WARN legítimo (G5 divergência METODO herdada, G6/G7 completude Sub-ondas 3.2/3.3). **Delta +3.**
- **Pós Sub-onda 3.2:** ~6/8 hard PASS (G1 + G2 + G3 + G4 + G8 + herança squad Art. X aplicada aos 12 aiox-agents) + 2 WARN legítimo (G5 divergência + G6 completude Sub-onda 3.3) + G7 PARCIAL implícito. **Delta +1.**
- **Pós Sub-onda 3.3 (Onda 3 CONCLUÍDA):** **8/8 VERDE** (G1-G8 todos hard PASS pós-Passo 8). **Delta +2. Delta absoluto Onda 3 total: +6 pontos (2/8 pré-3.1 → 8/8 pós-3.3).**

## Divergências declaradas ativas

1. CAOS-CL-002 cabeçalho "DRAFT" (metadata) — herdada da Onda 2 Hermes. Rename físico pendente.
2. Papel Dike temporário pelo executor da onda com 3 salvaguardas — aceito como transição até Dike agent-funcional nascer.
3. G5 interpretabilidade continua divergência herdada framework Liceu — plano MÍNIMO no CLAUDE.md §8 satisfaz WARN. Emenda pendente Onda 6.
4. Fronteira vendor SynkraAI × Kolden como segunda ocorrência do padrão "squad vendorizado" após Hermes/Nous — candidato emenda METODO v1.1 (Passo 10 opcional).
5. Constituição dupla (AIOX + Kolden) — declarada como co-existência com regra de precedência (Kolden Art. X prevalece em conflito).
6. Convenção `@` dupla (externa Kolden + interna AIOX) — declarada como camadas semanticamente distintas não-conflitantes.
7. Skills-como-tools cross-squad — categoria constitucional emergente. Candidata emenda METODO v1.1.

---

*MEMORY.md do Prometeu (squad-level) criado 2026-07-07 na Sub-onda 3.1 do Contrato-mãe m-20260706-metodo-kolden. Padrão herdado da Onda 2 do Hermes. Distinção canônica preservada: MEMORY.md squad-level (este arquivo — padrões estruturais) × agent-memory/prometeu.md (padrões técnicos de execução do agent-chief).*
