---
tipo: registro
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/registros/metodo-onda-3/3.1-identidade-fronteira/diff-cirurgico|diff-cirurgico]]"
  - "[[Prometeu/registros/metodo-onda-3/3.1-identidade-fronteira/matriz-de-conformidade|matriz-de-conformidade]]"
  - "[[Prometeu/registros/metodo-onda-3/3.1-identidade-fronteira/verificacao-dike|verificacao-dike]]"
---

# Sumário Executivo — Sub-onda 3.1 do METODO Kolden (Prometeu · identidade + fronteira)

> **Contrato-mãe:** `m-20260706-metodo-kolden` (Onda 3, Grupo A, squad-alvo Prometeu, Sub-onda 3.1 = domínio A identidade + fronteira vendor SynkraAI).
> **Sessão:** dedicada em `C:\Kolden\Prometeu\` (G7 satisfeito).
> **Executor:** prometeu-chief (Tier-0 · fan-out 0/3 por interdependência cross-artefato — regra 7x confirmada nas Sub-ondas 1.1/1.2/1.4/1.5/1.6 + Onda 2 Hermes; **Sub-onda 3.1 é a 8ª confirmação**).
> **Data:** 2026-07-07.
> **Leitura estimada:** ≤10 min.

---

## §1 — Números-chave

| Métrica | Valor |
|---|---|
| Achados totais registrados | 18 (`achados.jsonl`) |
| Achados P0 (crítico) | 5 (CLAUDE.md / PRD / squad.yaml / constitution / MEMORY) |
| Achados P1 (alto) | 6 (settings.json deny / reflexo G4 / prometeu-chief agent-def / ferramentas.md / AGENTS.md fronteira / agent-memory/prometeu.md ritual) |
| Achados P2 (médio) | 2 (roteiro-de-teste / `.claude/CLAUDE.md` APPEND convenção) |
| Achados INFO/divergência | 5 (MEMORY canônico AIOX fora do escopo / CAOS-CL-002 metadata DRAFT / constituição AIOX×Kolden co-existência / candidato emenda METODO v1.1 / skills-como-tools cross-squad categoria emergente) |
| **Mudanças propostas no diff (Sub-onda 3.1)** | **13** (10 CREATE + 3 UPDATE) |
| **Score G1-G8 baseline Sub-onda 3.1** | **~2/8 hard PASS** (G1 parcial via AIOX Constitution + G8 N/A legítimo) |
| **Score G1-G8 projetado pós-diff Sub-onda 3.1** | **~5/8 hard PASS** (G5/G6/G7 WARN legítimo — completude Sub-ondas 3.2/3.3) |
| **Score G1-G8 projetado pós-Onda-3 (todas as 3 sub-ondas)** | **8/8 VERDE** |
| **Delta absoluto Sub-onda 3.1** | **+3 pontos** (2/8 → 5/8 hard PASS canônico Kolden) |
| **Delta absoluto Onda 3 total (projetado)** | **+6 pontos** (2/8 → 8/8) |
| Fan-out interno | 0/3 (regra 7x confirmada — Sub-onda 3.1 é a 8ª confirmação) |
| Arquivos tocados nesta Sub-onda até agora | 5 (todos em `Prometeu/registros/metodo-onda-3/3.1-identidade-fronteira/`) |
| Arquivos vendor SynkraAI/aiox-core **PRESERVADOS INTACTOS** | ~450 (`.aiox-core/core/**` ~200 JS + `.aiox-core/development/**` ~250 md/yml + `.aiox-core/constitution.md` + `bin/aiox.js` + `bin/aiox-init.js` + `packages/` + `pro/` + `docs/` + `README*.md` + `LICENSE` + `CHANGELOG.md` + `.claude/rules/**` + `.claude/hooks/**` + `.claude/commands/**` + `.claude/setup/**` + `.claude/templates/**` + `.claude/skills/**` + `.claude/agents/aiox-*.md`) |

---

## §2 — Achado arquitetural central

**Prometeu é o segundo squad Kolden padronizado que herda estrutura vendorizada** (fork **SynkraAI/aiox-core**, commit `77265d5`, importado 2026-06-19). É a segunda ocorrência do padrão "squad vendorizado" após Hermes/Nous (Onda 2). Diferenças estruturais críticas vs Hermes:

1. **Prometeu JÁ TEM constituição AIOX interna** (`.aiox-core/constitution.md` v1.0.0 com 6 artigos AIOX: CLI First, Agent Authority, Story-Driven Dev, No Invention, Quality First, Absolute Imports) — Hermes NÃO tinha constituição alguma. **Mas os 6 artigos AIOX são engenharia-focados, NÃO agent-safety focados** (uncertainty + ASL + orthogonality + off-switch + interpretability + grounding + predictions do Kolden Art. X). Rota canônica: **co-existência declarada** com regra de precedência (Kolden Art. X prevalece em conflito).

2. **Prometeu JÁ TEM `.claude/CLAUDE.md` framework-owned pelo AIOX installer** (13686 bytes) + `.claude/settings.json` com hooks (synapse-wrapper + precompact-wrapper + enforce-git-push-authority + reflexos marca-trabalho/encerramento-aprendizado) + `language: portuguese` + `.claude/rules/*.md` (10 arquivos AIOX-interno) + `.claude/hooks/*.cjs` + `.claude/commands/`. Vendor AIOX MUITO mais estruturado que Hermes. **Camada Kolden precisa envelopar sem colidir** — CREATE `Prometeu/CLAUDE.md` raiz (nível-squad Kolden) + APPEND cirúrgico em `.claude/CLAUDE.md` (seção final citando METODO §6) + APPEND cirúrgico em `.claude/settings.json` (deny rules em L1+L2 vendor AIOX).

3. **Prometeu tem 12 aiox-agents especializados** em `.aiox-core/development/agents/<id>/` com MEMORY.md canônico AIOX (10 memórias validadas via `find`). Regra da skill `ritual-de-encerramento` § "Regra de resolução da memória" item 1: **NUNCA duplicar/mover MEMORY canônico AIOX**. Sub-onda 3.1 respeita: **zero toque** em `.aiox-core/development/agents/**`. Sub-onda 3.2 cuidará com respeito ao path canônico AIOX.

4. **Prometeu tem 57 skills (o maior número da Kolden)** em `.claude/skills/` — a maioria PT-BR com frontmatter `description`. **6 skills são públicas** (consumidas por outros 25 squads Kolden como tools funcionais): `spec-build-review`, `mcp-builder`, `orquestracao-de-comandos-slash`, `checklist-runner`, `tech-search`, `briefing-padrao`. **Categoria constitucional emergente** — "skills-como-tools cross-squad" — não modelada no METODO v1.0 nem no Art. IV (MCP). Candidata emenda METODO v1.1 (§5 modelos ou §7 buckets). Sub-onda 3.1 apenas documenta em `ferramentas.md`. Sub-onda 3.3 aplicará padronização real com **read-only + nota cross-squad no diff** (conforme gate humano do Passo 2 desta Onda 3, Q2 = Recomendada).

5. **AGENTS.md interno é PT-BR** (3023 bytes, dev guide Codex CLI) — divergência positiva vs caso Hermes (AGENTS.md Nous era EN 27502 tokens). Precisa apenas de nota-topo declaratória de fronteira Kolden × AIOX interno + apontar `CLAUDE.md` raiz como identidade canônica Kolden. Nenhuma tradução necessária.

6. **Duas convenções `@` co-existentes** — `@Prometeu` externo (dispatch cross-squad Kolden na Camada 5 do METODO §3) coexiste com `@dev`/`@qa`/`@architect`/etc. interno (ativação de aiox-agent AIOX vendor conforme `.aiox-core/constitution.md` Art. II). **Camadas semanticamente distintas — não conflitam**. Declarado explicitamente em `Prometeu/CLAUDE.md` §6 (proposto) + `Prometeu/.claude/CLAUDE.md` seção final APPEND.

**Conclusão canônica:** Sub-onda 3.1 aplica o Método por **INVÓLUCRO** (identidade + fronteira Kolden externa sobre vendor SynkraAI intocado) em coerência com o padrão estabelecido pela Onda 2 do Hermes (INVÓLUCRO sobre MUTAÇÃO). Vendor AIOX preservado intocado. Camada Kolden ganha os 10 CREATE + 3 UPDATE cirúrgicos. Fronteira declarada explicitamente em 5 lugares (CLAUDE.md §9, squad.yaml `fronteira_vendor_synkraai`, constitution.md VO-1, AGENTS.md nota-topo, `.claude/settings.json` deny rules).

**Padrão canônico a promover:** "squad vendorizado" como caso canônico do METODO — segunda ocorrência empírica após Hermes reforça a proposta de emenda §5 ou §8 na v1.1 (candidato Passo 10 opcional).

---

## §3 — 5 artefatos padronizados desta Sub-onda

Todos em `C:\Kolden\Prometeu\registros\metodo-onda-3\3.1-identidade-fronteira\`:

1. **`matriz-de-conformidade.md`** (~275 linhas) — matriz 12 princípios × 8 critérios × 14 modelos × 5 camadas × convenção `@` vs `/` × fronteira SynkraAI × Kolden. Evidência textual verbatim por célula.
2. **`achados.jsonl`** (18 achados, 1 JSON por linha) — cada achado com id (PRM-3.1-###), severidade (P0-P2+INFO), gate afetado, evidência, mudança proposta, procedência, rastro-gates, status.
3. **`diff-cirurgico.md`** (~1000 linhas) — 13 mudanças com **CONTEÚDO COMPLETO** dos 10 CREATEs + 3 UPDATEs em diff-format. Tabela mestra §1 + CREATEs G1 §2 + UPDATEs cirúrgicos §4 + fora do escopo §5 + verificação G1-G8 §6 + gate humano §7.
4. **`verificacao-dike.md`** (~180 linhas) — baseline pré-aplicação sob 3 salvaguardas (papel Dike temporário pelo prometeu-chief) + veredito baseline com evidência textual verbatim por seção A-G do CAOS-CL-002. Delta INDEPENDENTE pelo Passo 7 (subagente Explore isolado).
5. **`sumario-executivo.md`** (este arquivo) — resumo ≤10 min + 4 perguntas gate humano + bloco YAML pronto para appendar em `resultado_ondas_2_a_26.onda_3.sub_ondas["3.1"]`.

Padrão canônico dos 5 artefatos por Onda **confirmado 8x consecutivas** (Sub-ondas 1.1/1.2/1.4/1.5/1.6 + Onda 2 Hermes + Sub-onda 3.1 aqui).

---

## §4 — 4 gates humanos (via AskUserQuestion no Passo 5)

Padrão herdado das Sub-ondas 1.1-1.6 + Onda 2 Hermes. Recomendação técnica em negrito.

### Q1 — Aplicação do diff cirúrgico

Como você quer aplicar as 13 mudanças?
- **A (Recomendada):** em bloco por ordem hierárquica G1 → G2 → G3 (autoridade → primários → secundários), com pausas curtas entre grupos para permitir cancelamento.
- **B:** por artefato — Ronan aprova 1 a 1 (maior controle, custo cognitivo alto — 13 aprovações consecutivas).

### Q2 — Deny rules em `.aiox-core/L1+L2`

O `.claude/CLAUDE.md` L94-105 declara boundary L1-L4 com nota "Protegido por deny rules" MAS o `.claude/settings.json` real NÃO TEM `permissions.deny`. Aprendizado transferido da Onda 2 do Hermes propõe APPEND cirúrgico.
- **A (Recomendada):** APPEND `permissions.deny` cirúrgico em `.claude/settings.json` bloqueando Write/Edit em L1 (`.aiox-core/core/**`, `.aiox-core/constitution.md`, `bin/aiox.js`, `bin/aiox-init.js`) + L2 (`.aiox-core/development/{tasks,templates,checklists,workflows}/**`, `.aiox-core/infrastructure/**`).
- **B:** Apenas documentar em `Prometeu/CLAUDE.md` §9 sem tocar `settings.json`. Fronteira **declarada mas não enforced**.

### Q3 — `AGENTS.md` interno + `C:\Kolden\AGENTS.md` raiz

Duas decisões conexas de fronteira/índice:
- **`Prometeu/AGENTS.md`** (vendor SynkraAI PT-BR, 3023 bytes) — **A (Recomendada):** APPEND 1 parágrafo no topo declarando fronteira Kolden × AIOX interno (padrão Onda 2 Hermes). **B:** deixar sem nota (fronteira só vive em CLAUDE.md).
- **`C:\Kolden\AGENTS.md` raiz** (índice de 26 squads) — Passo 9 do rito. **A (Recomendada):** appendar nota canônica "Prometeu padronizado pela Sub-onda 3.1 do METODO v1.0 em 2026-07-07 — ver `Prometeu/CLAUDE.md`; Sub-ondas 3.2/3.3 pendentes". **B:** adiar para conclusão da Onda 3 completa (após Sub-ondas 3.2 e 3.3).

### Q4 — Passo 10 opcional — emenda METODO v1.1

Atualizar METODO-KOLDEN.md v1.0 → v1.1 acrescentando cláusula sobre "squad vendorizado" + "framework interno cross-squad" + "deny cirúrgico em L1+L2 quando existir" + "skills-como-tools cross-squad" (após Dike delta 8/8 confirmar Sub-ondas 3.1+3.2+3.3):
- **A (Recomendada):** propor emenda §5 ou §8 na v1.1 (aprendizado canônico de segunda ocorrência empírica).
- **B:** adiar para Onda 26 costura final Kolden (agregar todos os aprendizados das Ondas 2-25).

---

## §5 — Escopo declarado (o que NÃO foi tocado, o que ficou fora)

**Fronteira vendor SynkraAI — INTOCADO (~450 arquivos):**
- Runtime AIOX Node: `.aiox-core/core/**` (~200 JS modules — orchestration, memory, execution, ideation, ids, mcp, quality-gates, etc.).
- Constituição AIOX: `.aiox-core/constitution.md` v1.0.0 preservada.
- Development framework: `.aiox-core/development/tasks/**` (~200 tasks), `.aiox-core/development/templates/**` (~50 templates), `.aiox-core/development/checklists/**`, `.aiox-core/development/workflows/**`.
- Infrastructure: `.aiox-core/infrastructure/**`.
- CLI executables: `bin/aiox.js`, `bin/aiox-init.js`, `bin/*`.
- Vendor packages: `packages/`, `pro/` (submodule proprietário).
- Docs vendor: `docs/`, `README.md`, `README.en.md`, `LICENSE`, `CHANGELOG.md`, `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`.
- Config vendor: `.aiox`, `.cursor`, `.docker`, `.github`, `.husky`, `.synapse`.
- AIOX rules: `.claude/rules/*.md` (10 arquivos).
- AIOX hooks/commands: `.claude/hooks/*.cjs`, `.claude/commands/`, `.claude/setup/`, `.claude/templates/`.
- AIOX skills: `.claude/skills/**` (57 skills) — **Sub-onda 3.3** cuidará.
- AIOX agent variants: `.claude/agents/aiox-*.md` (10 variantes) — **Sub-onda 3.2** cuidará.
- AIOX agents internos: `.aiox-core/development/agents/<id>/` (10 arquivos MD + 10 MEMORY.md canônicos AIOX) — **Sub-onda 3.2** cuidará.
- Tests: `tests/`.

**Único APPEND cirúrgico em vendor:**
- 1 parágrafo no topo do `AGENTS.md` interno declarando fronteira Kolden (condicional a Q3.A).
- 1 seção final em `.claude/CLAUDE.md` declarando METODO §6 como fonte canônica da convenção `@` vs `/` (condicional a proposta aprovada).
- 1 objeto `permissions.deny` em `.claude/settings.json` cirúrgico (condicional a Q2.A).

**Fora do squad-alvo — NÃO TOCADO:** `Caos/`, `Liceu/`, `Olimpo/`, `Dike/`, `Hermes/`, `sobre-a-empresa/`, todos os outros squads (G1 respeitado). Exceção autorizada condicional: `C:\Kolden\AGENTS.md` raiz (Passo 9 se Q3 = A) + `C:\Kolden\METODO-KOLDEN.md` (Passo 10 se Q4 = A).

**Sub-ondas seguintes:**
- **Sub-onda 3.2 (próxima sessão dedicada em `C:\Kolden\Prometeu\`):** 12 aiox-agents internos + refactor MEMORY canônico + `.claude/agents/aiox-*.md` (10 variantes) + APPEND por-agente em `agent-memory/prometeu.md`.
- **Sub-onda 3.3 (sessão dedicada seguinte):** 57 skills + 6 skills públicas com read-only + nota cross-squad no diff + costura final + smoke test.

---

## §6 — Verificação G1-G8 auto-aplicada Sub-onda 3.1 (baseline até Passo 3 + projetado pós-Passos 5-8)

- **G1** (escopo cirúrgico) — ✅ PASS · todos os 5 artefatos gravados em `Prometeu/registros/metodo-onda-3/3.1-identidade-fronteira/`.
- **G2** (sem commit sem ordem) — ✅ PASS · working tree preservado.
- **G3** (sem push sem ordem) — ✅ PASS.
- **G4** (ritual de encerramento) — ⏳ Passo 8 pós-aplicação.
- **G5** (fan-out ≤3) — ✅ PASS · 0/3 (interdependência cross-artefato confirmada 8x consecutivas — Sub-onda 3.1 é 8ª confirmação).
- **G6** (artefato-em-disco entre passos) — ✅ PASS · 5 artefatos gravados sequencialmente.
- **G7** (sessão dedicada) — ✅ PASS · Sub-onda 3.1 executada em `C:\Kolden\Prometeu\`.
- **G8** (procedência rastreável) — ✅ PASS · grep reverso em `Liceu/frameworks/arquitetura-de-agents-kolden/procedencia.md` confirma cada citação.

**Score projetado pós-diff Sub-onda 3.1:** 5/8 hard PASS (G1 canônico Kolden VERDE + G2 + G3 + G4 + G8) + 3/8 WARN legítimo (G5 divergência METODO herdada, G6/G7 completude Sub-ondas 3.2/3.3).

**Score projetado pós Sub-ondas 3.1+3.2+3.3:** 8/8 VERDE (delta absoluto Onda 3 total: **+6 pontos**, 2/8 → 8/8 canônico Kolden).

---

## §7 — Bloco YAML pronto para appendar em `resultado_ondas_2_a_26.onda_3.sub_ondas["3.1"]`

Copiar-colar direto no Contrato-mãe `Olimpo/contratos/missoes/m-20260706-metodo-kolden.yaml`. Sub-onda 3.1 abre a Onda 3.

```yaml
      resultado_ondas_2_a_26:
        em: "2026-07-07T09:00:00-03:00"
        status: "onda-3-sub-onda-3.1-em-andamento-aguardando-gate-humano-passo-5"
        onda_3:
          em: "2026-07-07"
          status: "aguardando-gate-humano-sub-onda-3.1-passo-5"
          grupo: "A"
          squad_alvo: "Prometeu"
          arquitetura_de_execucao:
            escolhida: "sub-ondas-3-1-3-2-3-3"
            justificativa: "12 aiox-agents internos + 57 skills = escala 5x maior que Hermes; sub-ondas por dominio (identidade+fronteira / agents+memory / skills+costura); confirmado no gate humano Passo 2"
          sub_ondas:
            "3.1":
              em: "2026-07-07"
              dominio: "identidade + fronteira vendor SynkraAI"
              status: "aguardando-gate-humano-passo-5"
              executor: "prometeu-chief (raiz Kolden, sessao dedicada C:\\Kolden\\Prometeu\\) — 0/3 fan-out por interdependencia cross-artefato (regra 7x confirmada nas Sub-ondas 1.1/1.2/1.4/1.5/1.6 + Onda 2 Hermes; Sub-onda 3.1 e 8a confirmacao)"
              artefatos_produzidos:
                - "Prometeu/registros/metodo-onda-3/3.1-identidade-fronteira/matriz-de-conformidade.md (~275 linhas — matriz 12 principios x 8 criterios x 14 modelos x 5 camadas x convencao @/, evidencia textual verbatim por celula + secao vendor SynkraAI x Kolden)"
                - "Prometeu/registros/metodo-onda-3/3.1-identidade-fronteira/achados.jsonl (18 achados em JSONL, severidade P0-P2+INFO, rastro-gates + procedencia por achado)"
                - "Prometeu/registros/metodo-onda-3/3.1-identidade-fronteira/diff-cirurgico.md (~1000 linhas — 13 mudancas com CONTEUDO COMPLETO dos 10 CREATEs + 3 UPDATEs em diff-format; tabela mestra + gate humano + fora do escopo + verificacao G1-G8)"
                - "Prometeu/registros/metodo-onda-3/3.1-identidade-fronteira/verificacao-dike.md (~180 linhas — baseline 5/8 hard PASS projetado + 3 WARN sob 3 salvaguardas; Passo 7 delta INDEPENDENTE por subagente Explore)"
                - "Prometeu/registros/metodo-onda-3/3.1-identidade-fronteira/sumario-executivo.md (este arquivo — sumario <=10min + 4 perguntas gate humano + bloco YAML)"
              achado_arquitetural_central: |
                Prometeu e o segundo squad Kolden padronizado que herda estrutura vendorizada
                (fork SynkraAI/aiox-core, commit 77265d5, importado 2026-06-19). Segunda ocorrencia
                do padrao "squad vendorizado" apos Hermes/Nous (Onda 2). Diferencas vs Hermes:
                (a) Prometeu JA TEM constituicao AIOX interna (6 artigos engenharia-focados)
                que coexiste com Constituicao Kolden a criar (15 VO agent-safety) via regra
                de precedencia (Kolden Art. X prevalece em conflito); (b) Prometeu JA TEM
                .claude/CLAUDE.md framework-owned + .claude/settings.json com hooks
                (synapse-wrapper + precompact-wrapper + enforce-git-push-authority + reflexos)
                + language:portuguese, mas sem deny rules para L1+L2 do vendor AIOX; (c)
                12 aiox-agents especializados em .aiox-core/development/agents/<id>/ com MEMORY
                canonico AIOX (10 memorias) — NUNCA duplicar/mover; (d) 57 skills — maior
                numero da Kolden — Sub-onda 3.3 cuidara; (e) AGENTS.md interno e PT-BR
                (divergencia positiva vs Hermes/Nous EN 27502 tokens); (f) duas convencoes
                @ co-existentes (@Prometeu externo Kolden + @dev/@qa/@architect interno AIOX)
                declaradas como camadas semanticamente distintas nao-conflitantes. Sub-onda
                3.1 aplica o Metodo por INVOLUCRO (identidade + fronteira Kolden externa
                sobre vendor SynkraAI intocado) — coerente com padrao Onda 2 Hermes.
              diff_proposto:
                total_mudancas: 13
                breakdown:
                  CREATE: 10
                  UPDATE: 3
                ordem_hierarquica: "G1 autoridade -> G2 primarios -> G3 secundarios"
                arquivos_vendor_preservados: "~450 (.aiox-core/core/** ~200 JS + .aiox-core/development/** ~250 md/yml + .aiox-core/constitution.md + bin/aiox.js + bin/aiox-init.js + packages/ + pro/ + docs/ + README*.md + LICENSE + CHANGELOG.md + .claude/rules/** + .claude/hooks/** + .claude/commands/** + .claude/setup/** + .claude/templates/** + .claude/skills/** intocado nesta 3.1 + .claude/agents/aiox-*.md intocado nesta 3.1 + .aiox-core/development/agents/<id>/ intocado nesta 3.1)"
              gate_humano_pendente:
                - Q1: "Aplicar diff em bloco G1->G2->G3 (recomendado) ou por artefato"
                - Q2: "Deny rules em .aiox-core/L1+L2 vendor AIOX — APPEND cirurgico em .claude/settings.json (recomendado, aprendizado transferido Onda 2 Hermes) ou apenas documentar em CLAUDE.md"
                - Q3: "AGENTS.md interno Prometeu — APPEND 1 paragrafo topo (recomendado, padrao Onda 2 Hermes) ou deixar sem nota; e AGENTS.md raiz Kolden — Passo 9 append nota canonica (recomendado) ou adiar para conclusao Onda 3 completa"
                - Q4: "Passo 10 opcional — emenda METODO v1.0 -> v1.1 acrescentando clausula sobre squad vendorizado + framework interno cross-squad + deny cirurgico em L1+L2 + skills-como-tools cross-squad (recomendado apos Dike delta 8/8) ou adiar para Onda 26 costura final"
              score_canonico:
                baseline_G1_G8: "~2/8 hard PASS (G1 parcial via AIOX Constitution + G8 N/A legitimo)"
                projetado_pos_diff_sub_onda_3_1: "~5/8 hard PASS + 3 WARN legitimo (G5 divergencia METODO herdada, G6/G7 completude Sub-ondas 3.2/3.3)"
                delta_absoluto_sub_onda_3_1: "+3 pontos (2/8 -> 5/8 canonico Kolden)"
                projetado_pos_onda_3_total: "8/8 VERDE (delta absoluto total Onda 3: +6 pontos, 2/8 -> 8/8)"
              divergencias_declaradas:
                - "CAOS-CL-002 cabecalho DRAFT vs METODO canonico (rename fisico pendente do processo Hermes-raiz 2026-07-06 — herdada)"
                - "Verificacao Dike temporariamente pelo prometeu-chief com 3 salvaguardas — Passo 7 fara delta INDEPENDENTE por subagente Explore"
                - "G5 interpretabilidade continua divergencia herdada framework Liceu (emenda pendente Onda 6 do METODO)"
                - "Fronteira vendor SynkraAI x Kolden como segunda ocorrencia do padrao squad vendorizado apos Hermes/Nous — candidato emenda METODO v1.1 (Passo 10 opcional)"
                - "Constituicao dupla (AIOX interna engenharia-focada + Kolden externa agent-safety-focada) — co-existencia declarada com regra de precedencia (Kolden Art. X prevalece em conflito)"
                - "Convencao @ dupla (externa Kolden @Prometeu + interna AIOX @dev/@qa/@architect/etc) — declarada como camadas semanticamente distintas nao-conflitantes"
                - "Skills-como-tools cross-squad — categoria constitucional emergente nao modelada no METODO v1.0 nem no Art. IV (MCP) — candidata emenda METODO v1.1 §5 ou §7"
              padroes_novos_a_registrar:
                - "Segunda ocorrencia do padrao squad vendorizado (Hermes/Nous Onda 2 + Prometeu/SynkraAI Sub-onda 3.1) — merece elevar a padrao canonico Kolden com clausula propria em METODO §5 ou §8 v1.1"
                - "Framework interno cross-squad como categoria constitucional propria — Prometeu e consumido por outros 25 squads Kolden via 6 skills publicas (spec-build-review, mcp-builder, orquestracao-de-comandos-slash, checklist-runner, tech-search, briefing-padrao)"
                - "Constituicao dupla co-existente com regra de precedencia (Kolden Art. X prevalece em conflito) — padrao replicavel para todo squad vendorizado que tenha constituicao propria"
                - "Deny cirurgico em L1+L2 do vendor como padrao invariante — aprendizado transferido da Onda 2 do Hermes aplicado sistematicamente na Sub-onda 3.1"
                - "Convencao @ dupla como padrao para squad-que-vive-em-runtime-vendor — declaracao explicita em CLAUDE.md como camadas semanticamente distintas"
                - "5 artefatos padronizados por Onda/Sub-onda confirmado 8x consecutivas (regra global do METODO §8 — Sub-onda 3.1 e 8a confirmacao)"
                - "Fan-out 0/3 por interdependencia cross-artefato confirmado 8x consecutivas (regra global do METODO §8)"
                - "Papel Dike temporario pelo executor da onda + 3 salvaguardas (ordem serial + verbatim + divergencia) mantido como padrao aceito de transicao ate Dike agent-funcional nascer"
              verificacao_auto:
                G1: "PASS - todos os 5 artefatos em Prometeu/registros/metodo-onda-3/3.1-identidade-fronteira/; nenhum outro arquivo tocado ate Passo 3"
                G2: "PASS - working tree preservado"
                G3: "PASS - sem push"
                G4: "PENDENTE Passo 8 (ritual encerramento em agent-memory/prometeu.md CREATE + MEMORY.md CREATE squad-level + backup obrigatorio)"
                G5: "PASS - 0/3 fan-out (regra 8x confirmada — Sub-onda 3.1 e 8a confirmacao)"
                G6: "PASS - 5 artefatos em disco entre passos"
                G7: "PASS - sessao dedicada em C:\\Kolden\\Prometeu\\"
                G8: "PASS - procedencia grep reverso em Liceu/frameworks/arquitetura-de-agents-kolden/procedencia.md bate 1:1"
              handoff_para_passo_6:
                escopo: "Aplicar diff aprovado pelo gate humano em ordem hierarquica G1 (CLAUDE.md + PRD + squad.yaml + constitution.md + MEMORY.md) -> G2 (settings.json deny + reflexo interrupt.sh + agents/prometeu-chief.md + ferramentas.md) -> G3 (roteiro-de-teste.md + UPDATE AGENTS.md + UPDATE .claude/CLAUDE.md)"
                excecoes_G1_autorizadas: "C:\\Kolden\\AGENTS.md raiz (Passo 9) condicional a Q3.A + C:\\Kolden\\METODO-KOLDEN.md (Passo 10) condicional a Q4.A"
              handoff_para_passo_7:
                escopo: "Dike delta INDEPENDENTE por subagente Explore isolado apos aplicacao do diff; verificacao contra CAOS-CL-002 com 3 salvaguardas (ordem serial pos-aplicacao + evidencia verbatim + divergencia declarada); se <8/8 na Sub-onda 3.1, gerar diff-cirurgico V2 com correcoes cirurgicas e voltar ao gate humano"
              handoff_para_passo_8:
                escopo: "Ritual de encerramento em Prometeu/agent-memory/prometeu.md CREATE (nao existe hoje) + Prometeu/MEMORY.md CREATE squad-level (analogico Hermes/MEMORY.md Onda 2) — backup obrigatorio + trim <=150 linhas + APPEND bloco de padroes Sub-onda 3.1"
              handoff_para_passo_9:
                escopo: "Atualizar C:\\Kolden\\AGENTS.md com nota canonica de Prometeu Sub-onda 3.1 padronizada (condicional a Q3.A) — linha 33 validar contagem 12 agentes AIOX via Glob **/agents/*.md"
              handoff_para_passo_10:
                escopo: "Opcional — atualizar METODO-KOLDEN.md v1.0 -> v1.1 acrescentando clausula sobre squad vendorizado + framework interno cross-squad + deny cirurgico em L1+L2 + skills-como-tools cross-squad em §5 ou §8 (candidato via gate humano Passo 10)"
              handoff_para_sub_onda_3_2:
                escopo: "12 aiox-agents internos + refactor MEMORY canonico + .claude/agents/aiox-*.md (10 variantes) + APPEND por-agente em agent-memory/prometeu.md"
                onde_registra: "C:\\Kolden\\Prometeu\\registros\\metodo-onda-3\\3.2-agents-internos\\"
                sessao: "dedicada em C:\\Kolden\\Prometeu\\ (G7 - nunca duas sub-ondas na mesma sub-sessao)"
              handoff_para_sub_onda_3_3:
                escopo: "57 skills + 6 skills publicas com read-only + nota cross-squad no diff + costura final + smoke test"
                onde_registra: "C:\\Kolden\\Prometeu\\registros\\metodo-onda-3\\3.3-skills-e-costura\\"
                sessao: "dedicada em C:\\Kolden\\Prometeu\\ (G7 - nunca duas sub-ondas na mesma sub-sessao)"
              handoff_para_onda_4:
                recomendacao: "Olimpo (Grupo B Governance) — abre grupo B a partir do dono do Contrato de Missao + orquestrador Zeus"
                onde_registra: "C:\\Kolden\\Olimpo\\registros\\metodo-onda-4\\"
                sessao: "dedicada em C:\\Kolden\\Olimpo\\ (G7)"
```

---

## §8 — Próxima Sub-onda recomendada

**Sub-onda 3.2 = 12 aiox-agents internos + refactor MEMORY canônico + `.claude/agents/aiox-*.md` (10 variantes) + APPEND por-agente em `agent-memory/prometeu.md`.**

Sessão dedicada em `C:\Kolden\Prometeu\` (G7 satisfeito — nunca duas sub-ondas na mesma sub-sessão).

Prazos: sessão dedicada; sem teto de rodadas (Contrato-mãe declara `teto_rodadas: null`).

**Após Sub-ondas 3.1 + 3.2 + 3.3 concluídas com 8/8 Dike:** próxima Onda recomendada é **Olimpo (Grupo B Governance — Ondas 4-6: Olimpo, Dike, Themis)** — abre o Grupo B a partir do dono do Contrato de Missão + orquestrador Zeus.

---

## §9 — Estado final desta Sub-onda (pré-gate)

- **Trabalho aplicado:** 0 (nenhum arquivo tocado fora de `Prometeu/registros/metodo-onda-3/3.1-identidade-fronteira/`).
- **Working tree:** limpo (exceto os 5 artefatos desta Sub-onda + tarefas do sistema pré-existentes conforme `git status` inicial).
- **Commit:** nenhum (G2 respeitado).
- **Fan-out:** 0/3 (regra 8x confirmada — Sub-onda 3.1 é 8ª confirmação).
- **Passos concluídos:** 1 (leitura das 4 fontes canônicas: METODO + Hermes Onda 2 sumário + Hermes Onda 2 matriz + CAOS-CL-002) + 2 (gate humano fatiamento Onda única vs Sub-ondas) + 3 (diagnóstico read-only) + 4 (5 artefatos escritos).
- **Passos pendentes:** 5 (gate humano — próximo) + 6 (aplicação do diff) + 7 (Dike delta INDEPENDENTE) + 8 (ritual encerramento) + 9 (AGENTS.md raiz) + 10 (METODO emenda opcional).

---

*Sumário executivo Sub-onda 3.1 produzido por `prometeu-chief` (raiz Kolden) em 2026-07-07 no Contrato-mãe `m-20260706-metodo-kolden`. 5 artefatos canônicos gravados. Trabalho não aplicado até gate humano (Passo 5 via AskUserQuestion). Sem commit até ordem explícita.*
