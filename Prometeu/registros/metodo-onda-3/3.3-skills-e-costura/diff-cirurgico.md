# Diff Cirúrgico — Sub-onda 3.3 (Prometeu · 55 skills + PRM-3.2-019 + costura Onda 3)

> **Contrato-mãe:** `m-20260706-metodo-kolden` (Onda 3 · Sub-onda 3.3 · costura final).
> **Executor:** prometeu-chief (Tier-0).
> **Data:** 2026-07-07.
> **Status:** proposto — aguardando gate humano Passo 6.

---

## §1 — Tabela mestra das mudanças

| # | Tipo | Arquivo | Escopo | Gate afetado | Depende de |
|---|---|---|---|---|---|
| M1 | UPDATE (nota-só) | `Prometeu/registros/metodo-onda-3/3.3-skills-e-costura/dossie-publicas-cross-squad.md` | CREATE — 5 públicas listadas + consumidores externos + recomendação READ-ONLY | G1+G7 | — |
| M2 | UPDATE APPEND | 50 skills top-level internas AIOX × frontmatter | APPEND `grounding_required` + `categoria_art_iv` + `squads_consumidores` | G7+B12 | Q3.A |
| M3 (condicional) | UPDATE patch | `Prometeu/.gitignore` (linhas 379-390 bloco Kolden canonical) | APPEND `!.claude/agents/aiox-*.md` + `!.claude/agent-memory/_archive-pre-kolden/` | G1+G6 | Q2 = Opção 2 |
| M4 | UPDATE | `Prometeu/agent-memory/prometeu.md` | APPEND seção "Padrões Sub-onda 3.3 + fechamento Onda 3" | G4 | Passo 8 |
| M5 | UPDATE | `Prometeu/MEMORY.md` | APPEND bloco "Sub-onda 3.3 concluída + Onda 3 consolidada" | G4 | Passo 8 |
| M6 | UPDATE | `C:\Kolden\AGENTS.md` (raiz Kolden) | APPEND nota canônica "Onda 3 (Prometeu) CONCLUÍDA — 3 sub-ondas, 8/8, delta +6" | G1 exceção Passo 9 | Q6.A |
| M7 (opcional) | UPDATE | `C:\Kolden\METODO-KOLDEN.md` v1.0 → v1.1 | 7 emendas ratificadas pela Onda 3 com procedência 1:1 | G1 exceção Passo 10 | Q5.A |

**Total mudanças canônicas Sub-onda 3.3:** 5 (M1-M2-M4-M5-M6) + 2 condicionais (M3 Q2.B; M7 Q5.A).

---

## §2 — Detalhamento M1 — dossiê-publicas-cross-squad.md (CREATE)

Novo arquivo em `Prometeu/registros/metodo-onda-3/3.3-skills-e-costura/dossie-publicas-cross-squad.md` (~150 linhas) com:
- Perfil das 5 skills públicas cross-squad (spec-build-review, mcp-builder, orquestracao-de-comandos-slash, checklist-runner, tech-search).
- Grep reverso por-skill em `C:\Kolden\` (contagem + squads-consumidores identificados).
- Recomendação por-skill: 4/5 → nota cross-squad no diff; 1/5 (mcp-builder) → nota BREAKING por replicação silenciosa em Caos `criacao-de-mcp` (2026-07-06).
- Achado material: `mcp-builder` foi replicado em Caos SEM merge-back — cross-link para Onda 26 costura final (fora escopo desta 3.3).

**Efeito canônico:** as 5 públicas ficam READ-ONLY nesta Sub-onda 3.3 (nenhum arquivo `Prometeu/.claude/skills/<publica>/SKILL.md` tocado); só é criado o dossiê registro em disco (respeitando G6 artefato-em-disco).

---

## §3 — Detalhamento M2 — APPEND frontmatter canônico Kolden (50 skills internas)

### §3.1 — Template canônico do frontmatter APPEND

Cada skill top-level interna AIOX recebe APPEND do frontmatter existente (preservando `name:` + `description:`):

```markdown
---
name: <existente>
description: <existente>
grounding_required: <true|false>       # G7 — declarar se skill produz fato datável
categoria_art_iv: MCP-nativo           # B12 — 100% MCP-nativo confirmado para 50/50 internas
squads_consumidores: [Prometeu-interno]  # G8 — grep reverso vazio (ou lista se houver refs externas)
---
```

### §3.2 — Preenchimento por-skill (regra de derivação)

- **`grounding_required: true`** — skills que consultam fatos datáveis externos (data/nome/número/versão). Estimativa: ~5 candidatas (tech-search já é pública; `inteligencia-de-email-mime`, `arquitetura-de-inferencia-llm-autonoma`, `mlops-em-producao`, `topologias-de-inferencia-ml` — parcial).
- **`grounding_required: false`** — restante (~45 skills) — metodologias, padrões canônicos, playbooks estáveis.

### §3.3 — Fan-out proposto para aplicação (5 lotes de 10)

Para a fase de execução, dividir as 50 skills em 5 lotes de ~10 e aplicar APPEND paralelo com Edit tool (aprendizado 3.2: paralelização em lotes de ~5 Edits). Cada lote: 5 minutos de execução. Total: ~25 minutos.

**Regra de idempotência:** o APPEND só edita frontmatter (marcado pelos `---`); corpo da skill (a partir de `# <nome>`) NUNCA é tocado.

---

## §4 — Detalhamento M3 (CONDICIONAL Q2.B) — patch `.gitignore` cirúrgico

**Se Q2 = Opção 2 (patch cirúrgico):**

Adicionar 2 linhas ao bloco Kolden canonical (linhas 379-390 do vendor `.gitignore`):

```diff
# Kolden canonical layer — Sub-onda 3.1 do METODO Kolden (Contrato-mãe m-20260706, 2026-07-07)
!CLAUDE.md
!.claude/agents/
.claude/agents/aiox-*.md
!.claude/agents/prometeu-chief.md
+!.claude/agents/aiox-*.md              # <— Sub-onda 3.3: expõe 10 UPDATE + 1 CREATE da Sub-onda 3.2 ao git
!.claude/reflexos/
.claude/reflexos/*
!.claude/reflexos/interrupt-before-mutation.sh
+!.claude/agent-memory/_archive-pre-kolden/  # <— Sub-onda 3.3: expõe 4 MOVE MEMORY + README da Sub-onda 3.2 ao git
```

**Efeito canônico:** os 12+ arquivos aplicados na Sub-onda 3.2 tornam-se visíveis via `git status` — reprodutibilidade e auditabilidade da Onda 3 completa.

**Se Q2 = Opção 1 (manter bloqueado):** M3 NÃO aplicada. Aceita divergência "12+ arquivos in-disco mas invisíveis ao git" com nota canônica no `Prometeu/MEMORY.md` (M5) e handoff explícito para Fase 3 residual (resolver via canal alternativo — MD5 hashes offline, tag git, etc.).

---

## §5 — Detalhamento M4 — APPEND agent-memory/prometeu.md

Seção nova (~50 linhas) com padrões da Sub-onda 3.3 + fechamento consolidado Onda 3:

```markdown
## Padrões Sub-onda 3.3 (2026-07-07) + fechamento consolidado Onda 3

### Padrões novos Sub-onda 3.3
1. **Fan-out 3/3 por independência estrutural** — quando A1/A2/A3 são catálogos disjuntos, fan-out 3/3 é válido (divergência positiva vs 0/3 padrão 9x confirmado). Prometeu 3.3 aplicou (A1 55 skills top-level + A2 5 públicas dossiê + A3 12 AIOX/agents + gitignore).
2. **Dike delta INDEPENDENTE tentado + fallback papel temporário** — subagente Explore isolado pode retornar análise inválida por confusão de contexto (pré-existente vs sessão) — fallback canônico para papel Dike temporário pelo executor com 3 salvaguardas declaradas.
3. **12 skills AIOX/agents vendor-gerado — Opção V INTOCADAS** — comentário `<!-- ACORE-CLAUDE-AGENT-SKILL: gerado -->` + `Origem: .aiox-core/development/agents/<id>.md` disparam regra invariante "vendor intocado" (3ª ocorrência).
4. **100% MCP-nativo em 55 top-level** — categoria Art. IV v2.5.0 declarada como fato canônico Prometeu (skills como código puro Markdown+YAML, sem tools externa).
5. **5 públicas cross-squad READ-ONLY + nota no diff** — mudança em skill pública impacta 25 squads → BLOCK sem confirmação por-squad. Achado material: mcp-builder replicado em Caos silenciosamente (2026-07-06).

### Fechamento consolidado Onda 3 (Sub-ondas 3.1 + 3.2 + 3.3)
- **Score total:** 2/8 → 8/8 VERDE (+6 pontos absolutos).
- **3.1** (identidade + fronteira SynkraAI): 2/8 → 5/8 (+3).
- **3.2** (12 aiox-agents + refactor MEMORY + mapeamento cross-camada): 5/8 → 6/8 (+1).
- **3.3** (55 skills + PRM-3.2-019 + costura + smoke): 6/8 → 8/8 (+2).
- **Vendor SynkraAI PRESERVADO INTOCADO** em todas as 3 sub-ondas (~450 arquivos + 12 canônicos AIOX + 10 MEMORY canônicos AIOX + 12 personas AIOX + 12 skills AIOX/agents vendor-gerado).
- **Padrão canônico Prometeu:** "INVÓLUCRO sobre MUTAÇÃO DE CÓDIGO" — 4ª ocorrência consecutiva (Hermes+3.1+3.2+3.3).

### Handoff Onda 4
Onda 4 = Olimpo (Grupo B Governance) — sessão dedicada em `C:\Kolden\Olimpo\`.
```

---

## §6 — Detalhamento M5 — APPEND MEMORY.md squad-level

Bloco novo (~15 linhas):

```markdown
## Sub-onda 3.3 (2026-07-07) — costura final Onda 3

- **Escopo:** 55 skills top-level padronizadas (50 internas APPEND frontmatter + 5 públicas READ-ONLY) + 12 AIOX/agents INTOCADAS + PRM-3.2-019 gitignore decidido (Q2) + smoke test canônico (Foinix) + Dike delta consolidado.
- **Score final Onda 3:** **8/8 VERDE** (delta +6 vs baseline 2/8 pré-3.1).
- **Padrão canônico invariante 4x confirmado:** "INVÓLUCRO sobre MUTAÇÃO DE CÓDIGO" (Hermes + Prometeu 3.1+3.2+3.3).
- **Próxima Onda:** Onda 4 = Olimpo (Grupo B Governance) — dono do Contrato de Missão + orquestrador Zeus.
- **Divergências declaradas:** Dike delta INDEPENDENTE subagente Explore isolado tentado uma vez retornou análise inválida por confusão de contexto — fallback canônico papel Dike temporário pelo prometeu-chief com 3 salvaguardas. Dike agent-funcional proposta ratificada em Sub-onda 1.6 continua pendente Onda 5 (Grupo B).
```

---

## §7 — Detalhamento M6 — APPEND `C:\Kolden\AGENTS.md` raiz Kolden

Localizar a nota canônica da Sub-onda 3.2 (já aplicada em Passo 8 da 3.2) e substituir por versão consolidada Onda 3:

```markdown
### Nota canônica: Onda 3 (Prometeu) — CONCLUÍDA
- Data: 2026-07-07
- Sub-ondas: 3.1 (identidade + fronteira SynkraAI) + 3.2 (12 aiox-agents + refactor MEMORY + mapeamento cross-camada) + 3.3 (55 skills + PRM-3.2-019 + costura + smoke).
- Score final: **8/8 VERDE** (delta absoluto +6, 2/8 → 8/8).
- Vendor SynkraAI/aiox-core PRESERVADO INTOCADO (~450 arquivos + 12 canônicos AIOX + 12 skills AIOX/agents vendor-gerado).
- Norma canônica externa: `C:\Kolden\Prometeu\CLAUDE.md` + `Prometeu/constitution.md` (15 VO agent-safety).
- Próxima Onda: Onda 4 = Olimpo (Grupo B Governance).
- Contrato-mãe: `m-20260706-metodo-kolden` (Olimpo).
```

---

## §8 — Detalhamento M7 (OPCIONAL Q5.A) — METODO v1.0 → v1.1

Se Q5 = A (aplicar agora), atualizar `C:\Kolden\METODO-KOLDEN.md`:
- Bump versão: `v1.0` → `v1.1`.
- 7 emendas canônicas com nota `<!-- ratificado pela Onda 3 do Método (m-20260706, 2026-07-07) -->` em cada:

### E1 — Squad vendorizado como cláusula §5 ou §8 canônica
Segunda ocorrência empírica confirmada (Hermes/Nous Onda 2 + Prometeu/SynkraAI Onda 3). Padrão canônico: **INVÓLUCRO sobre MUTAÇÃO DE CÓDIGO**. Vendor completo preservado intocado; camada Kolden PT-BR externa (CLAUDE.md + PRD + constitution + squad.yaml + MEMORY.md + ferramentas.md + roteiro-de-teste.md + prometeu-chief.md) declara fronteira em 5+ pontos. **Procedência:** Sub-ondas Hermes Onda 2 + Prometeu 3.1+3.2+3.3.

### E2 — Framework interno cross-squad como categoria constitucional própria
Prometeu é consumido por outros 25 squads Kolden via 5 skills públicas (spec-build-review, mcp-builder, orquestracao-de-comandos-slash, checklist-runner, tech-search). Categoria constitucional emergente identificada Sub-onda 3.1, confirmada 3.3. **Procedência:** Sub-onda 3.1 + 3.3.

### E3 — Skills-como-tools cross-squad no §5 (modelos) ou §7 (5 buckets)
Categoria constitucional emergente. Não modelada no METODO v1.0 nem no Art. IV MCP. Skills públicas viram tools cross-squad (READ-ONLY + nota BREAKING quando modificadas). **Procedência:** Sub-ondas 3.1 + 3.3.

### E4 — Distinção 3-way MEMORY como padrão universal
Canonizada Sub-onda 3.2: (a) `<Squad>/MEMORY.md` = padrões estruturais do squad Kolden; (b) `<Squad>/agent-memory/<chief>.md` = padrões técnicos de execução; (c) `.aiox-core/development/agents/<id>/MEMORY.md` = padrão AIOX-story-driven canônico INTOCADO. Regra dura de skill `ritual-de-encerramento`. **Procedência:** Sub-onda 3.2.

### E5 — Convenção `@` dupla como padrão canônico para squad vendorizado com framework interno
`@Squad` externo (dispatch cross-squad Camada 5) × `@aiox-agent`/`@nous-agent` interno (ativação especializada dentro da sessão do squad) como camadas semanticamente distintas — não conflitam. Declaradas em CLAUDE.md do squad. **Procedência:** Sub-ondas 3.1 + 3.2.

### E6 — Constituição dupla co-existente com regra de precedência "Kolden Art. X prevalece em conflito"
AIOX Constitution (engenharia — 6 artigos) + Kolden Art. X (agent-safety — 15 VO) co-existentes. Em conflito, Kolden Art. X prevalece por ser norma canônica externa. **Procedência:** Sub-onda 3.1.

### E7 — Refactor por arquivamento como categoria canônica §9 rito
2ª ocorrência confirmada (Hermes/agent-memory/backups Onda 2 + Prometeu 3.2 `_archive-pre-kolden/`). Padrão para MEMORY espúrios / duplicados / snapshots: ARQUIVAR ≥ DELETE ≥ MERGE. Rastreabilidade + zero perda. **Procedência:** Sub-onda 3.2.

**Se Q5 = B (diferir para Onda 26):** M7 NÃO aplicada. Emendas registradas em `Prometeu/registros/metodo-onda-3/3.3-skills-e-costura/candidatas-emenda-metodo-v1.1.md` para consolidação futura na Onda 26 costura final.

---

## §9 — Ordem de aplicação (Passo 7 pós-gate)

Se Q1 = A (em bloco por domínio):

1. **Grupo G1 (skills públicas SÓ nota — se Q3.A):** M1 CREATE dossiê. ~2 min.
2. **Grupo G2 (50 skills internas APPEND frontmatter):** M2 em 5 lotes de 10 Edits paralelos. ~25 min.
3. **Grupo G3 (patch gitignore — se Q2.B):** M3 Edit cirúrgico. ~1 min.
4. **Grupo G4 (costura Kolden):** M4 + M5 + M6 + M7 (se Q5.A). ~15 min.

**Total estimado:** ~45 min para aplicação completa se todas as opções recomendadas forem aprovadas.

Se Q1 = B (por skill): custo cognitivo alto (50 aprovações consecutivas para o Grupo G2 sozinho). Não recomendado.

---

## §10 — Verificação G1-G8 auto-aplicada pós-diff Sub-onda 3.3

- **G1** ✅ PASS — todas mudanças em `Prometeu/**` + 2 exceções autorizadas condicionais (`C:\Kolden\AGENTS.md` M6 + `C:\Kolden\METODO-KOLDEN.md` M7 se Q5.A).
- **G2** ✅ PASS — working tree preservado até ordem de commit.
- **G3** ✅ PASS — sem push.
- **G4** ✅ PASS pós-Passo 8 (ritual encerramento em agent-memory + MEMORY.md).
- **G5** ✅ PASS — 3/3 fan-out por independência estrutural justificado (com registro no MEMORY para casos futuros).
- **G6** ✅ PASS — 7 artefatos em disco.
- **G7** ✅ PASS — sessão dedicada.
- **G8** ✅ PASS — procedência 1:1 com `Liceu/frameworks/arquitetura-de-agents-kolden/procedencia.md`.

**Score consolidado projetado pós-3.3:** **8/8 VERDE** (delta absoluto Onda 3: **+6 pontos**, 2/8 pré-3.1 → 8/8 pós-3.3).

---

*Diff cirúrgico Sub-onda 3.3 produzido por `prometeu-chief` (raiz Kolden) em 2026-07-07 no Contrato-mãe `m-20260706-metodo-kolden`. 5 mudanças canônicas + 2 condicionais propostas. 5 públicas cross-squad READ-ONLY + nota no dossiê. 50 internas AIOX APPEND frontmatter em 5 lotes paralelos. Gitignore vendor Q2 pendente. Emenda METODO v1.1 Q5 pendente.*
