# PROMPT-DE-ABERTURA — Onda 4 do METODO Kolden (squad-alvo: Olimpo)

> **Contrato-mãe:** `C:\Kolden\Olimpo\contratos\missoes\m-20260706-metodo-kolden.yaml`
> **Nó de execução:** `resultado_ondas_2_a_26.onda_4` (bloco YAML lavrado 2026-07-09 pela sessão raiz Kolden)
> **Squad-alvo desta sessão:** Olimpo (Camada 3-4 do METODO §3 — dono do Contrato de Missão)
> **Sessão:** DEDICADA em `C:\Kolden\Olimpo\` (G7 do METODO §8 — nunca duas ondas na mesma sub-sessão)
> **Executor esperado:** `olimpo-chief` (a criar no Passo 5 como `.claude/agents/olimpo-chief.md`)
> **Norma canônica:** `C:\Kolden\METODO-KOLDEN.md` v1.1 (~500 linhas, 12 seções, ratificado 2026-07-09 pela Sub-onda 3.3 Prometeu com 6 emendas E1/E2/E3/E5/E6/E7 canonizadas)
> **Checklist Dike canônico:** `C:\Kolden\Caos\checklists\CAOS-CL-002.md` v1.0 (promovido de DRAFT a CANÔNICO em 2026-07-09; validado empiricamente 9x com 8/8 VERDE)
> **Procedência-âncora:** `C:\Kolden\Liceu\frameworks\arquitetura-de-agents-kolden\procedencia.md` (Fase 1 do Contrato `m-20260704`)
> **Este briefing:** produzido pela skill `briefing-padrao` da sessão raiz (2026-07-09) — molde **Tier-0** (orquestrador `olimpo-chief`)

---

## §1 — Escopo desta sessão (o que você vai fazer)

Você vai **padronizar o squad Olimpo** contra o METODO Kolden v1.1 em **1 onda direta** (Ondas anteriores: Onda 1 Caos = 6 sub-ondas; Onda 2 Hermes = 1 onda direta 8/8 VERDE; Onda 3 Prometeu = 3 sub-ondas 8/8 VERDE consolidado).

**Regra invioável G7:** nada nesta sessão pode ser feito FORA de `C:\Kolden\Olimpo\` (exceção autorizada: `C:\Kolden\AGENTS.md` raiz no Passo 8, e opcionalmente `C:\Kolden\METODO-KOLDEN.md` no Passo 9 se aprendizado for canônico e Ronan aprovar bump v1.2).

**Regra invioável G2:** nenhum commit sem ordem explícita do Ronan.

## §2 — Contexto estratégico (por que Olimpo agora)

Olimpo é o **dono do Contrato de Missão**. Toda missão descendente Kolden atravessa 5 camadas (METODO §3): Ronan → Hermes → **Zeus (Camada 3, aqui em Olimpo)** → **7 executivos deuses (Camada 4, aqui em Olimpo)** → Operacional (Camada 5). Padronizar Olimpo padroniza a espinha da governança da Kolden.

**Precedente que você herda (regra invariante):**
- **Hermes/Nous (Onda 2, 2026-07-07)** — padrão INVÓLUCRO sobre MUTAÇÃO DE CÓDIGO ✅ 8/8 VERDE delta +7
- **Prometeu/SynkraAI (Onda 3, 2026-07-07 → 2026-07-09)** — mesma regra em 3 sub-ondas ✅ 8/8 VERDE delta +6
- **Olimpo/xquads-squads (Onda 4 = você agora)** — **3ª ocorrência** do padrão vendor. Regra E1 do METODO v1.1 confirmada 4x prevê que você preserva ~todos os arquivos vendor intocados e envelopa em camada Kolden PT-BR externa.

## §3 — Inventário pré-onda (já mapeado pela sessão raiz)

**Vendor Olimpo (xquads-squads, commit `dcb32f35fbeab23913233c8aafe5ee5e7fd2f149`, importado-cru):**
- **8 agents mitológicos** em `Olimpo/agents/` (não em `.claude/agents/`):
  - `zeus.md` (CEO/Orquestrador — Camada 3)
  - `poseidon.md` (COO — Camada 4)
  - `apolo.md` (CMO — Camada 4)
  - `hefesto.md` (CTO — Camada 4)
  - `hades.md` (CIO — Camada 4)
  - `atena.md` (CAIO — Camada 4)
  - `plutos.md` (CFO — Camada 4)
  - `afrodite.md` (CRO — Camada 4)
- **14 skills públicas cross-squad** em `Olimpo/.claude/skills/`:
  `alocacao-de-capital`, `analise-de-pricing-wtp`, `chief-of-staff-filtragem-e-escalonamento`, `comunicacao-executiva`, `estrategia-de-entrada-e-posicionamento`, `estrategia-de-supply-chain`, `integracao-pos-fusao-pmi`, `investor-relations`, `operacoes-lean-six-sigma`, `painel-executivo-autoplan`, `portfolio-estrategico`, `programa-esg-corporativo`, `reframe-produto-10-estrelas`, `rubrica-dimensional-0-10`, `sumario-executivo-scqa`
- **`squad.yaml`** (59 linhas, MIT, `aios: type: squad`, **6 vetos operacionais declarados**: `decisao_sem_premissa`, `arbitragem_sem_escalada`, `framework_apresentado_como_lei`, `promessa_de_resultado`, `bypass_de_contrato_de_missao`, `credencial_texto_puro`) → base para a Seção "Constituição dupla co-existente" (padrão E6 canonizado no METODO v1.1)
- **`MEMORY.md`** (31 linhas — minimalista, quase virgem)
- **`README.md`** (59 linhas)
- **`_origem.md`** (vendor snapshot)
- **Subpastas do vendor:** `contratos/` (⚠️ ONDE VIVE O CONTRATO DE MISSÃO — INTOCADO), `agent-memory/`, `checklists/`, `config/`, `data/`, `prd/`, `tasks/`, `workflows/`

**Ausências canônicas Kolden (o que você vai CRIAR na Camada Kolden PT-BR externa):**
1. `Olimpo/CLAUDE.md` (identidade canônica Kolden Camada 3-4)
2. `Olimpo/prd-de-ia.md` (5 campos canônicos Art. X: aspiration + ASL + uncertainty + constitution + MCP)
3. `Olimpo/constitution.md` (15 veto-operacionais Kolden agent-safety — co-existência com os 6 vetos operacionais já em `squad.yaml` via regra de precedência Kolden Art. X prevalece)
4. `Olimpo/ferramentas.md` (categorização MCP-nativo × adapter dupla-vida)
5. `Olimpo/roteiro-de-teste.md` (OS-1, AB-3, UN-2, GR-1, PR-1 + smoke específicos Camada 3-4)
6. `Olimpo/.claude/agents/olimpo-chief.md` (agent-def canônico Kolden externo — VOCÊ)
7. `Olimpo/.claude/reflexos/interrupt-before-mutation.sh` (G4 ASL-3+ — Olimpo escala board/investidor, ASL provável 3)
8. `Olimpo/.claude/settings.json` (deny cirúrgico vendor xquads + reflexos + ask -Approved dispatcher)
9. `Olimpo/agent-memory/olimpo.md` (agent-chief memory — padrões de execução)

## §4 — Rito canônico de 9 passos (METODO §8)

Você vai executar o rito canônico das Ondas 2-26. Cada passo tem gate explícito.

### Passo 1 — Ler as normas canônicas
- `C:\Kolden\METODO-KOLDEN.md` v1.1 completo (~500 linhas, 12 seções)
- `C:\Kolden\Caos\checklists\CAOS-CL-002.md` v1.0 canônico (~155 linhas, seções A-G)
- Este PROMPT-DE-ABERTURA (você já leu)
- Bloco `resultado_ondas_2_a_26.onda_4` do Contrato-mãe (contexto adjacente)
- **Bônus recomendado (opcional):** sumários da Onda 2 Hermes + Sub-onda 3.1/3.3 Prometeu — servem como caso-canônico do padrão INVÓLUCRO sobre MUTAÇÃO. Paths:
  - `Hermes/registros/metodo-onda-2/sumario-executivo.md`
  - `Prometeu/registros/metodo-onda-3/3.1-identidade-fronteira/sumario-executivo.md`
  - `Prometeu/registros/metodo-onda-3/3.3-skills-e-costura/sumario-executivo.md`

### Passo 2 — Diagnóstico READ-ONLY (fan-out ≤3 Explores)
**Regra de fan-out (10x confirmada — canônica METODO §8):** teto ≤3, escolha por INTERDEPENDÊNCIA:
- **Se alvos interdependentes** (bloco canônico único, coerência estilística cross-arquivo) → **0/3** (padrão dominante 10x). **Recomendação a priori:** 0/3 aqui — os 8 agents mitológicos + 14 skills executivas C-level compartilham vocabulário coeso (governança executiva, contrato de missão, board, investidor).
- **Se alvos independentes** (varredura por catálogos disjuntos) → **até 3/3**. Caso oposto isolado: Sub-onda 1.3 (26 squads varredura MCP) e Sub-onda 3.3 (3 catálogos disjuntos 55 skills + AIOX/agents + gitignore).

Você DECIDE por interdependência dos ALVOS, não por escopo.

**Escopo do diagnóstico Passo 2:**
- Matriz 12 princípios (METODO §2) × 8 critérios (METODO §4 = CAOS-CL-002 Seção C) × 14 modelos Caos (METODO §5) × 5 camadas (METODO §3) × convenção @/ (METODO §6) — evidência textual verbatim por célula.
- **Seção específica** "Camada 3 (Zeus decompõe + roteia) × Camada 4 (7 executivos traduzem) × Fronteira vendor xquads × Kolden" — porque Olimpo é caso NOVO Camada 3-4 combinada.
- **Contrato de Missão** (Olimpo/contratos/) é a estrutura mais estratégica de todo o workspace Kolden — como ele é lacrado por Hermes, decomposto por Zeus, e assinado por cada executivo? Documente em texto verbatim.

### Passo 3 — Escrever 5 (ou 6-7) artefatos padronizados
Padrão confirmado 10x consecutivas (canônico METODO §8):

1. **`matriz-de-conformidade.md`** (~250-500 linhas) — auditoria com evidência textual verbatim
2. **`achados.jsonl`** (JSONL por linha, severidade P0-P3+INFO, rastro-gates + procedência)
3. **`diff-cirurgico.md`** (~800-1200 linhas — 10-15 CREATEs + 3-5 UPDATEs + 0-2 MOVE em diff-format)
4. **`verificacao-dike.md`** (baseline pelo olimpo-chief sob 3 salvaguardas: ordem serial + evidência textual verbatim + divergências declaradas)
5. **`sumario-executivo.md`** (sumário ≤10 min + 4-6 gates humanos com recomendação técnica em negrito + bloco YAML pronto para appendar no Contrato-mãe)

Bônus:
6. **`verificacao-dike-delta.md`** (Dike delta INDEPENDENTE via subagente Explore isolado — se possível; fallback declarado se subagente confundir contexto pré-existente vs sessão — INCLUIR `git log --oneline -5` no prompt do subagente pelo aprendizado da Sub-onda 3.3)
7. **`agent-gerado-smoke.md`** (opcional se você quiser rodar smoke tipo Foinix/Salgueiro — caso amostral 1 agent produzido pelo Caos que consome painel-executivo-autoplan do Olimpo)

### Passo 4 — GATE HUMANO OBRIGATÓRIO (`AskUserQuestion`)
**PARE. NÃO aplique diff sem aprovação explícita do Ronan.**
Perguntas típicas (padrão herdado de Hermes + Prometeu):
- Q1: aplicar diff em bloco (recomendado) ou por lote
- Q2: vendor xquads-squads — deny cirúrgico L1 (agents mitológicos vendor) em settings.json (aprendizado transferido de Prometeu Sub-onda 3.1)
- Q3: APPEND parágrafo no topo do `Olimpo/README.md` vendor apontando para `Olimpo/CLAUDE.md` Kolden como identidade canônica (Q3.A padrão Hermes + Prometeu)
- Q4: schema `resultado_ondas_2_a_26.onda_4` conforme lavrado nesta sessão raiz — confirmar ou emendar
- Q5 (opcional): emenda METODO v1.1 → v1.2 se aprendizado for canônico

### Passo 5 — Aplicar diff (reescrita cirúrgica com procedência linha-a-linha)
Ordem canônica G1→G2→G3→G4 (validada 10x). **INVÓLUCRO sobre MUTAÇÃO DE CÓDIGO** (regra invariante 4ª aplicação). Vendor xquads-squads preservado intocado; APPEND cirúrgico em pontos declarados.

### Passo 6 — Dike verifica INDEPENDENTE contra CAOS-CL-002 canônico
- Executor baseline: olimpo-chief sob 3 salvaguardas
- Dike delta INDEPENDENTE: subagente Explore isolado (INCLUIR `git log --oneline -5` no prompt)
- Fallback declarado: papel Dike temporário 10ª ocorrência consecutiva (padrão transitório até Dike agent-funcional nascer na **Onda 5 Grupo B** — próxima sessão após esta)

### Passo 7 — Ritual de encerramento
- Backup preventivo `Olimpo/agent-memory/olimpo.md` (`olimpo-pre-onda-4-ritual.md`) — só se já existir; caso contrário CREATE
- APPEND `Olimpo/MEMORY.md` squad-level
- APPEND `Olimpo/agent-memory/olimpo.md` agent-chief-level (padrões técnicos de execução)
- Skill `ritual-de-encerramento` global Kolden — invocar
- Trim ≤150 linhas se necessário (regra de higiene)

### Passo 8 — Atualizar `C:\Kolden\AGENTS.md` raiz
- Nota canônica de Olimpo Onda 4 CONCLUÍDA (8/8 VERDE, delta absoluto medido, sub-ondas se aplicável, Grupo B aberto)
- Exceção autorizada G1 (declarar explicitamente na verificacao_auto)

### Passo 9 — Emenda METODO v1.1 → v1.2 (condicional)
Candidatos empíricos monitorados:
- **E4 distinção 3-way MEMORY** — 2ª ocorrência esperada (canoniza em v1.2 §5). Se Olimpo tiver `agent-memory/olimpo.md` + `MEMORY.md` squad-level + memory canônico vendor xquads = 2ª confirmação.
- **Camada 3-4 combinada como categoria constitucional** — potencial emenda §3 (Zeus decompõe + 7 executivos traduzem em cascata)
- **Vetos operacionais em squad.yaml (Olimpo tem 6) × veto em constitution.md (Kolden Art. X 15)** — regra de precedência co-existente (semelhante a Prometeu AIOX Constitution v1.0.0 × Kolden Art. X, canonizada como E6)

## §5 — Regras invioláveis (aplicáveis a TODAS as Ondas — METODO §8)

- **G1** — Nenhum arquivo tocado fora do squad-alvo (exceção autorizada: `AGENTS.md` raiz no Passo 8, e opcionalmente `METODO-KOLDEN.md` no Passo 9).
- **G2** — Sem commit sem ordem explícita do Ronan.
- **G3** — Sem push sem ordem explícita.
- **G4** — Ritual de encerramento em `Olimpo/MEMORY.md` + `Olimpo/agent-memory/olimpo.md` por onda.
- **G5** — Fan-out ≤3 subagentes internos por onda (regra rate-limit validada 2026-06-27).
- **G6** — Artefato-em-disco entre ondas (nenhuma decisão perdida em memória de sessão).
- **G7** — Nunca duas ondas na mesma sub-sessão (por isso ESTA sessão é dedicada Olimpo).
- **G8** — Procedência rastreável (linhagem/mente/obra/ano batendo com `procedencia.md` do Liceu — divergências declaradas honestamente).

## §6 — Divergências carregadas (declarar em `verificacao-dike.md`)

- **G5 interpretabilidade** — divergência METODO herdada framework Liceu Fase 1 (emenda pendente **Onda 6**)
- **Categoria runtime bidirecional Art. IV** — divergência pendente **Onda 6** (MCP spec 2024 não modela event streams)
- **Papel Dike temporário pelo executor + 3 salvaguardas** — 10ª ocorrência consecutiva. Padrão transitório até Dike agent-funcional nascer **Onda 5** (próxima).

## §7 — O que ficou RESOLVIDO ontem/hoje (2026-07-09) que você herda como estado limpo

- ✅ **CAOS-CL-002** promovido fisicamente de DRAFT a CANÔNICO (rename + auditoria de escopo) — divergência 3x herdada Hermes/Prometeu ELIMINADA.
- ✅ **PRM-3.2-019** (gitignore vendor SynkraAI bloqueando 12 arquivos Prometeu) RESOLVIDO Sub-onda 3.3 via patch cirúrgico Q2.2.
- ✅ **METODO v1.1** ratificado com 6 emendas (E1/E2/E3/E5/E6/E7 canonizadas).
- ✅ **Onda 3 concluída** — 8/8 VERDE consolidado, delta absoluto +6 pontos.
- ✅ **Bloco YAML da Onda 4** lavrado no Contrato-mãe pela sessão raiz.

## §8 — Handoff para Onda 5 (após você fechar Onda 4)

**Recomendação técnica:** Onda 5 = **Dike (Grupo B)** — nascimento como agent-funcional via Contrato próprio (`m-2026MMDD-nascimento-dike`). Isso fecha o padrão Dike temporário confirmado 10x (você será a 10ª) e destrava independência estrutural máxima nas Ondas 6-26. Alternativa: Themis (Grupo B) se Ronan preferir manter Dike como esqueleto até fase mais tardia.

## §9 — Início da sua execução

1. Confirme (mentalmente ou em 1 linha ao Ronan) que leu este briefing e o METODO v1.1 + CAOS-CL-002 canônico.
2. Comece pelo **Passo 2 — Diagnóstico READ-ONLY** (Passo 1 já cumprido nesta leitura).
3. Registre TUDO em `C:\Kolden\Olimpo\registros\metodo-onda-4\`.

**Sem commit até ordem explícita do Ronan.** Sem push jamais nesta sessão.

---

*PROMPT-DE-ABERTURA produzido pela sessão raiz Kolden em 2026-07-09 via skill `briefing-padrao`. Fonte-de-verdade da norma: `C:\Kolden\METODO-KOLDEN.md` v1.1. Fonte-de-verdade do checklist Dike: `C:\Kolden\Caos\checklists\CAOS-CL-002.md` v1.0 canônico. Contrato-mãe: `Olimpo/contratos/missoes/m-20260706-metodo-kolden.yaml` (bloco `resultado_ondas_2_a_26.onda_4`).*
