---
tipo: registro
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/registros/metodo-onda-3/3.3-skills-e-costura/_indice|_indice]]"
---

# Dossiê: 5 skills públicas cross-squad em Prometeu (READ-ONLY)

> **Contrato-mãe:** `m-20260706-metodo-kolden` (Onda 3 · Sub-onda 3.3 · M1 CREATE).
> **Executor:** prometeu-chief (raiz Kolden).
> **Data:** 2026-07-09.
> **Escopo:** classificação canônica das 5 skills públicas de Prometeu como categoria constitucional emergente **"skills-como-tools cross-squad"** — candidata emenda METODO v1.1 §5 ou §7 (E3 ratificada Q5.A).
> **Status:** READ-ONLY — nenhum arquivo em `Prometeu/.claude/skills/<publica>/SKILL.md` tocado nesta Sub-onda 3.3.

---

## §1 — Regra canônica

Skills classificadas como **públicas cross-squad** são consumidas por outros squads Kolden (além de Prometeu). Mudança estrutural em skill pública impacta 25 squads consumidores → **BLOCK sem confirmação por-squad**. Fica para Fase 3 residual ou Onda 26 costura final.

**Sub-onda 3.3 aplica READ-ONLY:**
- Nenhum arquivo `Prometeu/.claude/skills/<publica>/SKILL.md` tocado.
- Este dossiê registra o inventário de consumidores externos (grep reverso em `C:\Kolden\`).
- Achado material sobre `mcp-builder` replicado em Caos (2026-07-06) cross-link para Onda 26 costura final.

---

## §2 — Perfil por-skill

### 2.1 — `spec-build-review`

**Descrição:** orquestra ciclo Spec → Build → Review de story de ponta a ponta encadeando 3 pipelines aiox-core (spec-pipeline, development-cycle, qa-loop) com 2 gates humanos entre fases. Não faz `git push` (autoridade @devops).

**Consumidores externos (grep reverso — excluindo Prometeu/):**
- Hermes: 3 refs em `agent-memory/backups/` (documenta orquestração de Ondas do Método Kolden).
- Caos: 3 refs em absorção (padrão de pipeline validado como referência).

**Impacto de mudança:** Médio — hoje é referência documental. Se estrutura de pipeline mudar, backups de agent-memory Hermes ficam desalinhados.

**Recomendação canônica:** **READ-ONLY** — nota no diff. Futura evolução via Contrato de Missão próprio com aprovação Hermes + Caos.

---

### 2.2 — `mcp-builder`

**Descrição:** guia para construir servidores MCP (Model Context Protocol) de alta qualidade em Python (FastMCP) ou Node/TypeScript (MCP SDK) para integrar APIs/serviços externos.

**Consumidores externos:**
- Caos: **replicação SILENCIOSA** em `C:\Kolden\Caos\.claude\skills\criacao-de-mcp\SKILL.md` (2026-07-06 — 3 dias antes desta Sub-onda 3.3).
- Pheme: 1 ref em skill `agentic-search` (padrão MCP citado como referência).
- Dedalo: 1 ref em ADR de stack (menciona `mcp-builder` como skill canônica).
- Rosie: 1 ref em ADR de stack (idem).

**Impacto de mudança:** **ALTO — replicação silenciosa em Caos criou divergência não-sincronizada.**

**Achado material ACHADO-DIKE-3.3-D:** `Caos/.claude/skills/criacao-de-mcp/SKILL.md` foi criada em 2026-07-06 (Onda 1 do Caos ou trabalho paralelo) SEM merge-back para Prometeu (versão canônica). Diferenças estruturais entre as duas versões precisam ser inventariadas antes de qualquer mudança quebra-compatibilidade em `Prometeu/mcp-builder`.

**Recomendação canônica:** **READ-ONLY + nota BREAKING no diff da Onda 26.** Sub-onda 3.3 registra o achado mas não sincroniza. Cross-link para Onda 26 costura final Kolden (que agregará todas as divergências cross-squad detectadas ao longo Ondas 2-25).

**Ação recomendada Onda 26:**
1. Diff estrutural `Prometeu/mcp-builder/SKILL.md` × `Caos/criacao-de-mcp/SKILL.md`.
2. Decisão canônica: (a) merge de volta em Prometeu como fonte-de-verdade; (b) reconhecer Caos como fork legítimo com propósito distinto (criação vs uso).
3. Registrar decisão em `MEMORY.md` de ambos os squads.

---

### 2.3 — `orquestracao-de-comandos-slash`

**Descrição:** guia para desenhar, escrever ou revisar comando slash (`/nome`) — mecanismo pelo qual Claude Code executa pipelines determinísticos disparados por prefixo `/`. Cobre anatomia canônica (markdown + frontmatter + template + prompt), pipeline spec-driven (`/specify` → `/clarify` → `/plan` → `/tasks` → `/implement` → `/analyze` → `/checklist`), semântica append-only de `/converge`, ponte `/taskstoissues` via GitHub MCP.

**Consumidores externos:**
- 1 ref em `Prometeu/.claude/skills/catalogo.md` (índice interno; auto-referência).
- **Zero refs externas confirmadas.**

**Impacto de mudança:** Baixo — uso concentrado em Prometeu internamente.

**Recomendação canônica:** **READ-ONLY + nota mínima no diff** — potencial de expansão futura para outros squads (Caos ao desenhar `/caos`, Hermes ao desenhar `/hermes`, etc.).

---

### 2.4 — `checklist-runner`

**Descrição:** motor genérico de execução de checklist para qualquer checklist `.md`. Suporta modos YOLO (autônomo) e interactive com veredictos pass/fail/partial. Use quando um agente precisar validar trabalho contra checklist.

**Consumidores externos:**
- Prometeu (uso interno): 7 refs em `catalogo.md`, skills AIOX QA, `qa-e-quality-gates`, `checklist-de-requisitos`.
- Caos: 1 ref em `CLAUDE.md` (Ritual do Caos consome checklist-runner para executar CAOS-CL-002 e outros).

**Impacto de mudança:** **Alto** — 8 arquivos externos referenciam. Central para pipeline QA cross-squad.

**Recomendação canônica:** **READ-ONLY + nota "checklist-runner é motor canônico QA cross-squad Kolden — modificação estrutural exige aprovação por-squad" no diff.**

---

### 2.5 — `tech-search`

**Descrição:** pesquisa técnica aprofundada e autocontida usando WebSearch + WebFetch + workers Haiku em pipeline Query → Decompose → Parallel Search → Evaluate → Synthesize → Document. Zero dependências externas. MCPs opcionais. Salva em `docs/research/{YYYY-MM-DD}-{slug}/`.

**Consumidores externos:**
- Liceu: 1 ref em skill `dissecacao-de-mente` + 1 ref em skill que usa grep.
- Prometeu (uso interno): 4 refs em skills AIOX analyst + docs.

**Impacto de mudança:** **Alto** — 6 arquivos externos referenciam. Padrão de pesquisa técnica adotado fora squad origem.

**Recomendação canônica:** **READ-ONLY + nota "tech-search é skill canônica de pesquisa técnica Kolden — grounding_required: true implícito por natureza (WebSearch+WebFetch)" no diff.** Skill emblema da categoria constitucional emergente "skills-como-tools cross-squad" (E3 ratificada Q5.A).

---

## §3 — Tabela consolidada

| Skill | Arquivos externos | Squads consumidores | Impacto | Ação Sub-onda 3.3 |
|---|---|---|---|---|
| `spec-build-review` | 3 | Hermes + Caos | Médio | READ-ONLY + nota |
| `mcp-builder` | 5 | Caos (replica) + Pheme + Dedalo + Rosie | **ALTO** — replicação silenciosa Caos | READ-ONLY + nota BREAKING + cross-link Onda 26 |
| `orquestracao-de-comandos-slash` | 1 (interno) | Prometeu | Baixo | READ-ONLY + nota mínima |
| `checklist-runner` | 8 | Prometeu QA + Caos | Alto | READ-ONLY + nota "motor QA cross-squad" |
| `tech-search` | 6 | Liceu + Prometeu | Alto | READ-ONLY + nota "grounding_required implícito" |

**Total refs externas (fora Prometeu):** 23 arquivos. Categoria constitucional emergente confirmada.

---

## §4 — Ratificação da emenda E3 (via Q5.A)

Skill-pública cross-squad como categoria constitucional emergente é **E3** das 7 emendas METODO v1.0 → v1.1 ratificadas na Q5.A. Este dossiê alimenta a redação da emenda com procedência 1:1:

- **Fonte primária:** grep reverso empírico em `C:\Kolden\` (5 skills × 23 arquivos externos) — Sub-onda 3.3.
- **Segunda ocorrência empírica:** Hermes ainda não formalizou "skills públicas" mas tem paralelo em `squads-catalog.yaml` (routing_triggers cross-squad) — Onda 2. **Confirmação 2x justificada.**
- **Precedência conceitual:** Sub-onda 1.6 do Método já sinalizou "categoria emergente" mas não canonizou. Sub-onda 3.3 canoniza.

---

## §5 — Cross-link para Onda 26 costura final

**Achado material a resolver na Onda 26:**

```yaml
achado_onda_26:
  id: PRM-3.3-DIKE-D
  categoria: "cross-squad divergence"
  skill_afetada: "mcp-builder (Prometeu) vs criacao-de-mcp (Caos)"
  data_replica_caos: "2026-07-06"
  status: "não-sincronizado"
  acao_proposta:
    - "Diff estrutural entre as duas versões"
    - "Decisão canônica: merge-back OU fork legítimo com propósito distinto"
    - "Registrar decisão em MEMORY.md de ambos os squads"
  responsavel: "Onda 26 costura final Kolden (agregação Ondas 2-25)"
```

---

## §6 — Bloco YAML pronto para diff-cirurgico.md §11 (fora do escopo desta Sub-onda 3.3 — declarativo)

Se em futuro Contrato de Missão for autorizado modificar as 5 públicas, o template do APPEND frontmatter cross-squad seria:

```yaml
---
name: <existente>
description: <existente>
grounding_required: <true|false>
categoria_art_iv: MCP-nativo
squads_consumidores: [Prometeu-interno, <lista externa>]
breaking_note: |
  Skill pública cross-squad — modificação estrutural exige confirmação
  por-squad de cada consumidor externo. Impacto potencial: <lista>.
last_sync: 2026-07-09
cross_squad_forks:
  - {squad: Caos, path: .claude/skills/criacao-de-mcp/, data_fork: 2026-07-06, status: nao-sincronizado}
---
```

**Regra invariante:** este template NÃO é aplicado nesta Sub-onda 3.3 (Q3.A aprovada — READ-ONLY). Fica declarativo em `Prometeu/registros/metodo-onda-3/3.3-skills-e-costura/` para Fase 3 residual ou Onda 26 costura final.

---

*Dossiê das 5 públicas cross-squad Sub-onda 3.3 produzido por `prometeu-chief` em 2026-07-09 no Contrato-mãe `m-20260706-metodo-kolden`. Q3.A aprovada — READ-ONLY. Achado material `mcp-builder` × `criacao-de-mcp` cross-link para Onda 26. Emenda E3 ratificada Q5.A. Categoria constitucional emergente "skills-como-tools cross-squad" canonizada na v1.1 do METODO Kolden.*
