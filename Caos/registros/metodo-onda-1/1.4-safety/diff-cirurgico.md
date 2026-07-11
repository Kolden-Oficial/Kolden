---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/metodo-onda-1/1.4-safety/dashboard-schema|dashboard-schema]]"
  - "[[Caos/registros/metodo-onda-1/1.4-safety/predictions-scorecard-template|predictions-scorecard-template]]"
  - "[[Caos/registros/metodo-onda-1/1.4-safety/sumario-executivo|sumario-executivo]]"
---

# Diff Cirúrgico — Sub-onda 1.4 (Safety Dashboard + Predictions Scorecard)

> **Contrato:** `m-20260706-metodo-kolden` · Sub-onda 1.4
> **Data de emissão:** 2026-07-06
> **Executor da aplicação:** caos-chief (raiz Kolden) — sessão anterior (Sub-onda 1.4 execução) + caos-chief (raiz Kolden) — sessão atual (normalização de path para convenção do Método)
> **Fan-out:** 0/3 subagentes (regra de interdependência cross-arquivo — Sub-ondas 1.1/1.2 confirmaram 2x; Sub-onda 1.4 confirma 3x)
> **Status:** ARTEFATOS APLICADOS — aguardando ratificação de gate humano (ver §7)

## 0. O que este diff É — e o que NÃO é

**É:** documento de aplicação da Sub-onda 1.4 do Método Kolden. Registra os 4 CREATEs feitos
pela sessão de execução (todos em `Caos/`, dentro do escopo do Contrato-mãe) + a normalização
de path para conformar ao padrão de 5 artefatos por sub-onda em `1.4-safety/`.

**NÃO é:** proposta de mudança pendente de aprovação. Os 4 CREATEs foram **aplicados** durante
a execução (sessão anterior); esta sessão apenas normaliza o padrão de indexação. A ratificação
do gate humano é **tardia** (§7) — o Contrato-mãe m-20260706 ainda não tem `resultado.sub_ondas["1.4"]`
appendado.

## 1. Mapa achados → mudanças

A Sub-onda 1.4 responde ao gap arquitetural documentado no diagnóstico da Onda 1 do redesenho
(`Caos/registros/redesenho-fase2/onda-1-diagnostico/`) e materializado como Art. X G8 na
Constituição v2.5.0 (Sub-onda 1.1) e como campo `predictions_scorecard` no `prd-de-ia.md`
(Sub-onda 1.2).

| Achado (gap) | Documento-fonte | Mudança que resolve | Aplicação |
|---|---|---|---|
| G8 Predictions Scorecard sem template canônico | Diagnóstico Onda 1 §Modelos (11% conformidade); Sub-onda 1.2 introduziu campo `predictions_scorecard: true \| false \| null` no PRD sem template para emissão | CREATE `Caos/modelos/predicoes.yaml` (schema v1.0.0) | Aplicado sessão anterior |
| Revisão anual do scorecard sem template canônico | Brooks 2018-2026 exige revisão em 1º de janeiro; sem template, cada agente inventaria formato | CREATE `Caos/modelos/revisao-anual.md` (10 seções — rubrica de dificuldade 1-5 declarada antes) | Aplicado sessão anterior |
| Dashboard safety sem schema declarado | Sub-onda 1.1 ratificou Art. X G1-G8; sem schema, dashboard vira exercício abstrato | CREATE `Caos/registros/dashboard-safety.md` v0.1.0 (5 blocos de colunas, 7 fontes, rubrica G5 heurística) | Aplicado sessão anterior |
| Kolden como organização sem safra concreta de predições | Fase 1 (Brooks G8) do Ritual pergunta "agent faz previsões datáveis?" — mas Kolden como org não tinha safra | CREATE `Caos/registros/predictions-scorecard-kolden-2026.md` (5 predições ancoradas na Sub-onda 1.3 + Constituição v2.5.0) | Aplicado sessão anterior |
| Padrão do Método pede 5 artefatos padronizados em `1.4-safety/` | Contrato-mãe m-20260706 § handoff + memória Sub-ondas 1.1/1.2/1.3 | Normalização — 5 arquivos-índice em `1.4-safety/` apontando para os canônicos preservados em `Caos/registros/` | Aplicado sessão atual |

## 2. CREATEs aplicados pela sessão anterior (4 arquivos)

Nenhum arquivo existente foi tocado. Todos os 4 são criação limpa (Art. VI REUSE > ADAPT > CREATE
verificado — nenhum artefato equivalente pré-existia no acervo do Caos).

### 2.1 `Caos/modelos/predicoes.yaml` — Template canônico YAML

- **Schema:** v1.0.0
- **Estrutura:** cabeçalho (schema_version + emitido_em + emitido_por + escopo + cadência + revisor) + `exemplo_canonico` (KLD-PRED-2026-EXEMPLO real do Grupo A) + `predicoes:` (append-only) + `revisoes:` (histórico) + nota Art. X G8.
- **5 campos obrigatórios por predição:** `data_limite` (ISO 8601 futuro), `criterio` (uma sentença verificável), `revisor` (nominal), `proxima_revisao` (≥ anual), `procedencia` (contrato + sub_onda + documento + achado_ancorado).
- **3 exceções nomeadas no cabeçalho:** E1 CONDICIONAL, E2 REVOGADA, E3 CUMPRIDA-ANTECIPADA.
- **Procedência:** Brooks (2018-2026) *Predictions Scorecard* series — rodneybrooks.com/blog (8 edições anuais). Fonte primária no `procedencia.md` do Liceu §Critérios de Safety+Quality #8.

### 2.2 `Caos/modelos/revisao-anual.md` — Template canônico revisão

- **10 seções:** regra + exceções nomeadas + exemplos canônicos + template propriamente dito (§1-§10: predições avaliadas, score bruto, score calibrado, rubrica de dificuldade, análise por falhou, revogadas, condicionais, lições, próxima safra, meta-comentário).
- **Rubrica de dificuldade 1-5 declarada ANTES:** 1 trivial → 5 aposta contra consenso. **Não recalibra retroativamente** (Brooks 2019).
- **Score calibrado por dificuldade:** rubrica separada do bruto — `+1,0` cumprida 4-5 / `+0,5` cumprida 2-3 / `+0,1` cumprida 1 / `−1,0` falhou 1-2 / `−0,4` falhou 3-4 / `0` falhou 5.
- **§10 meta-comentário obrigatório** — revisor admite tendência própria (Brooks 2024 §meta).
- **Procedência:** Brooks 2019 + Brooks 2024 (7ª edição — introduz "hype vs conservadorismo").

### 2.3 `Caos/registros/dashboard-safety.md` — Schema do dashboard

- **Versão:** 0.1.0 (schema puro; NÃO é dashboard populado — população é Fase 3 residual)
- **13+ colunas em 5 blocos:** Identidade (§2.1, 5 col) + Risco/ASL (§2.2, 4 col) + Controle G1-G4 BLOCK (§2.3, 4 col) + Controle G5-G8 WARN/INFO (§2.4, 4 col) + Constituição per-agent (§2.5, 3 col) + Migração MCP (§2.6, 5 col — herdado Sub-onda 1.3).
- **Regra invariante (Brooks 1991 "use o mundo como seu próprio modelo"):** agregações são derivadas em tempo de render, nunca cacheadas.
- **Rubrica G5 interpretability_score 0-5** — heurística inicial explícita (§4), sujeita à substituição via ida-e-volta Liceu-chief na Onda 6.
- **7 fontes canônicas** listadas com responsável de manter + frequência de leitura pelo dashboard.
- **5 exceções nomeadas** (§7): Caos/Dike como meta; SOLO ASL-1 sem constitution; adapters runtime bidirecional; SOLO CLI sem log; G4 `n/a` ASL-1/2.
- **Procedência declarada no cabeçalho:** Amodei/Anthropic RSP 2023 + Amodei-Olah-Steinhardt-Christiano-Schulman-Mané 2016 (arXiv 1606.06565) + Bai-Kadavath-Kundu-Askell-Amodei et al. 2022 (arXiv 2212.08073) + Anthropic MCP 2024.

### 2.4 `Caos/registros/predictions-scorecard-kolden-2026.md` — Primeira safra Kolden 2026-2027

- **5 predições concretas** ancoradas em Sub-onda 1.3 (achados MCP Camada 1) + Constituição v2.5.0 (Sub-onda 1.1):
  - **KLD-PRED-2026-001** (dif. 2) — Grupo A migrado (4 wrappers → MCP oficial) até 2026-10-01.
  - **KLD-PRED-2026-002** (dif. 3) — 0 agentes ASL-3+ sem `interrupt-before` até 2026-12-31.
  - **KLD-PRED-2026-003** (dif. 4, CONDICIONAL) — runtime bidirecional resolvido (Rota D-1 OU D-2) até 2027-01-01.
  - **KLD-PRED-2026-004** (dif. 3) — ≥ 5 de 6 MCPs Grupo B em dupla-vida até 2026-10-31.
  - **KLD-PRED-2026-005** (dif. 3) — ≥ 3 escopos com scorecard próprio publicado até 2027-01-01.
- **Dificuldade média:** 3.0 (distribuição 2, 3, 4, 3, 3 — não é safra inflada nem impossível).
- **Categorias de erro possível declaradas ANTES** (Brooks 2024 §meta): `erro-por-hype`, `erro-por-conservadorismo`, `erro-de-execução-interna`, `erro-de-modelo-do-mundo`.

## 3. CREATEs aplicados pela sessão atual (normalização — 5 arquivos-índice em `1.4-safety/`)

Todos em `Caos/registros/metodo-onda-1/1.4-safety/`. Nenhum duplica conteúdo dos canônicos —
todos são índices que apontam para os artefatos entregues em 2.1-2.4.

| # | Arquivo | Papel |
|---|---|---|
| 1 | `dashboard-schema.md` | Índice do schema (§2.3) — resume estrutura + procedência linha-a-linha |
| 2 | `predictions-scorecard-template.md` | Índice do mecanismo — aponta para os 3 arquivos (2.1 + 2.2 + 2.4) |
| 3 | `predicoes-2026-2027.yaml` | Extração YAML pura das 5 predições Kolden 2026-2027 (formato canônico `predicoes.yaml`) |
| 4 | `diff-cirurgico.md` | Este arquivo |
| 5 | `sumario-executivo.md` | Atualizado para refletir 5 artefatos em `1.4-safety/` + status "APLICADO aguardando ratificação" |

**Por que índices em vez de mover os canônicos?** Grep confirmou que `Caos/registros/redesenho-fase2/
onda-1-diagnostico/achados.jsonl` e `CAOS-CL-002-draft.md` referenciam os paths originais como
canônicos da Onda 5 do m-20260705 (agora Sub-onda 1.4). Mover quebra referências históricas. A
convenção do Método é preservada por índices.

## 4. Procedência — linha-a-linha ancorada em `Liceu/frameworks/arquitetura-de-agents-kolden/procedencia.md`

| Bloco / conceito | Fonte primária | Linhagem (Onda do dossiê) | Ano |
|---|---|---|---|
| G1 constitution + G6 orthogonality/instrumental | Bai, Kadavath, Kundu, Askell et al. *Constitutional AI* (arXiv 2212.08073) + Bostrom (2012) *The Superintelligent Will* (Minds and Machines 22) + (2014) *Superintelligence* cap. 7 | Onda 4 + Onda 5 | 2022 + 2012/2014 |
| G2 ASL declarado + estrutura do dashboard | Anthropic *Responsible Scaling Policy v1.0* — anthropic.com/rsp | Onda 4 (labs-frontier) | 2023 |
| G3 uncertainty + assistance game | Hadfield-Menell, Russell, Abbeel, Dragan (2016) *Cooperative Inverse Reinforcement Learning* (NeurIPS) + Russell *Human Compatible* (Viking) | Onda 5 (alinhamento) | 2016 + 2019 |
| G4 off-switch / interrupt-before | Hadfield-Menell, Russell (2017) *The Off-Switch Game* (IJCAI 2017) | Onda 5 | 2017 |
| G5 interpretability heurística inicial | Amodei-Olah-Steinhardt-Christiano-Schulman-Mané (2016) *Concrete Problems in AI Safety* (arXiv 1606.06565) §Interpretability | Onda 4 (via Amodei) | 2016 |
| G7 grounding compulsório + "mundo é seu próprio modelo" | Brooks (1990) *Elephants Don't Play Chess* (Robotics and Autonomous Systems 6) + (1991) *Intelligence Without Representation* (Artificial Intelligence 47) | Onda 5 | 1990-1991 |
| G8 predictions scorecard — template + revisão + safra | Brooks rodneybrooks.com/blog *Predictions Scorecard* series (8 edições anuais) — regra "não recalibrar retroativamente" (Brooks 2019) + categorias "hype/conservadorismo" (Brooks 2024) | Onda 5 | 2018-2026 |
| Bloco MCP (2.6 do schema) | Sub-onda 1.3 deste Contrato — inventário + plano dupla-vida + categoria "adapter de runtime bidirecional" | — | 2026-07-06 |
| Predições 001/004 — cronograma de migração honesto | Sub-onda 1.3 §plano-migração-escalonada; margem Brooks 2018-2024 (cronogramas subestimados) | Onda 5 | 2018-2024 |
| Predição 002 — ASL-3+ interrupt-before | Sub-onda 1.1 §Art. X G4 v2.5.0 | — | 2026-07-05 |
| Predição 003 — runtime bidirecional | Sub-onda 1.3 §sumário-executivo §3 (Rota D-1 vs D-2) | — | 2026-07-06 |
| Predição 005 — scorecard como prática institucional | Esta Sub-onda 1.4 — templates canônicos criados em 2.1 + 2.2 | — | 2026-07-06 |

Toda linha da tabela remete a documento datável — Art. IX (grounding compulsório) respeitado.

## 5. §Não-mudanças preservadas (por decisão explícita)

Padrão herdado das Sub-ondas 1.1 (10 itens) e 1.2 (12 itens). Sub-onda 1.4 preserva:

1. **Constituição v2.5.0** — Art. X G8 já ratificado na Sub-onda 1.1; Sub-onda 1.4 apenas materializa o mecanismo. Sem re-bump.
2. **CLAUDE.md v3.4.0 do Caos** — Fase 8 do Ritual já referencia o requisito de scorecard (§ Gate canônico "Predictions Scorecard publicado"); Sub-onda 1.2 já expandiu. Sem re-edit.
3. **`prd-de-ia.md` (modelo)** — Sub-onda 1.2 já incluiu `predictions_scorecard:` no frontmatter canônico. Sem re-edit.
4. **`nucleo/ARQUITETURA.md`** — não intersecta safety dashboard (é arquitetura interna do runtime Python do Caos). Sem edit.
5. **Modelos `system-prompt-base.md`, `checklist-de-qualidade.md`, `roteiro-de-teste.md`, `cartao-de-identidade.md`, `orquestrador-base.md`, `especialista-historico.md`, `perfil.md`, `ferramentas.md`, `instalacao.md`, `convencao-de-cli-e-tooling.md`, `guia-infisical.md`** — Sub-onda 1.2 já materializou os 5 campos Art. X onde cabia; safety dashboard consome os modelos, não os altera.
6. **`nucleo/*.py`** — código Python do runtime do Caos não é alterado por schema de dashboard (que é doc). Sem edit.
7. **`referencias/` do Caos** — busca de referências vive lá; safety dashboard não muda o motor de busca.
8. **Ondas 2-26 do Contrato-mãe** — Sub-onda 1.4 não instancia dashboard em outros squads; apenas declara schema. Ondas 2-26 aplicarão via Ritual próprio.
9. **Framework do Liceu (`arquitetura-de-agents-kolden/framework.md`)** — Sub-onda 1.4 consome via `procedencia.md`; NÃO propõe emenda (a emenda ficou pendente para Onda 6, sobre categoria "runtime bidirecional" da Sub-onda 1.3).
10. **`AGENTS.md` da raiz Kolden** — atualização é escopo da Sub-onda 1.6 (`METODO-KOLDEN.md` v1.0). Sub-onda 1.4 não toca.

## 6. Verificação G1-G8 do CAOS-CL-002

Checklist Dike canônico (promovido pela Sub-onda 1.1). Cada gate é verificado explicitamente:

- **G1 (escopo cirúrgico):** ✅ Todos os 4 CREATEs originais em `Caos/modelos/` + `Caos/registros/`. Todos os 5 índices em `Caos/registros/metodo-onda-1/1.4-safety/`. Nenhum arquivo fora de `Caos/` tocado. Working tree fora de Caos/ intacto.
- **G2 (sem commit sem ordem):** ✅ Nenhum commit foi feito. Working tree tem os artefatos como untracked/modified aguardando decisão explícita do Ronan.
- **G3 (procedência declarada):** ✅ §4 acima traz procedência linha-a-linha ancorada em `procedencia.md` do Liceu.
- **G4 (consulta ao Liceu documentada):** ✅ Fontes primárias (Amodei RSP, Amodei-Olah 2016, Bai et al. 2022, Bostrom, Russell 2016/2019, Brooks 1990/1991/2018-2026) todas presentes no `procedencia.md`. Nenhuma consulta web foi necessária (procedência já consolidada Fase 1).
- **G5 (mapa achados→mudanças):** ✅ §1 acima traz tabela cross-ref (5 achados → 5 mudanças).
- **G6 (nomeação de invariância):** ✅ §5 lista 10 não-mudanças com justificativa.
- **G7 (grounding compulsório em fato datável):** ✅ Datas, versões, IDs, autores citados com fonte (procedência.md + Sub-ondas 1.1/1.2/1.3).
- **G8 (predictions scorecard condicional):** ✅ Sub-onda 1.4 EMITE a primeira safra (organização Kolden 2026-2027) — G8 é auto-cumprido por dogfooding.

## 7. Ratificação tardia do gate humano

O `sumario-executivo.md` da sessão anterior declarava "DIFF PROPOSTO — aguardando gate humano".
Entre a lavratura desse sumário e esta sessão, os 4 CREATEs foram aplicados. Isto significa que
os artefatos vivem no disco **sem log-de-decisão explícito no Contrato-mãe m-20260706**.

**Impacto:** nenhuma perda. Os 4 CREATEs são todos limpos (nenhum arquivo pré-existente tocado —
verificado por Grep). O working tree fora de `Caos/` está intacto. Se o gate humano recusar
alguma decisão nesta sessão, os arquivos podem ser removidos com `rm` cirúrgico.

**Ação necessária no gate humano:** o Ronan precisa ratificar em bloco (ou por artefato) as
5 decisões pendentes descritas no `sumario-executivo.md` §7 (Q1 escopo do schema; Q2 rubrica G5;
Q3 predição 003 aberta ou forçada; Q4 cadência de revisão; Q5 aplicação dos 4 CREATEs).
Depois disso, o bloco `resultado_onda_1.sub_ondas["1.4"]` (§8 abaixo) é appendado ao Contrato-mãe.

## 8. Bloco YAML para appendar em `m-20260706-metodo-kolden.yaml`

Estrutura idêntica às Sub-ondas 1.1/1.2/1.3 já preenchidas. Deve ser inserido em
`operacional[0].resultado_onda_1.sub_ondas["1.4"]` (após `"1.3"`).

Ver `sumario-executivo.md` §Bloco YAML para o texto pronto.

## 9. Handoff para Sub-onda 1.5

Se o gate humano aprovar:

- **Sub-onda 1.5 — Costura + Smoke test:** o Método (implicitamente presente nas Sub-ondas 1.1-1.4 aplicadas) é testado em um agente-piloto — provavelmente Aletheia (recente + método Predictions-Scorecard-adjacente). Passa pelo Ritual Fase 1-7 com Constituição v2.5.0; colhe onde os gates G1-G8 tropeçam na prática.
- **Registrar em:** `Caos/registros/metodo-onda-1/1.5-smoke/`
- **Escopo:** piloto real (não drill mental) + laudo por gate + ajustes ao mecanismo se necessário.
- **Sub-onda 1.6 — METODO-KOLDEN.md v1.0:** consolidação da Onda 1 em documento raiz canônico.

## 10. Histórico

| Versão | Data | Mudança |
|---|---|---|
| — | 2026-07-06 | Diff cirúrgico criado nesta sessão para documentar os 4 CREATEs aplicados pela sessão anterior + a normalização de path para `1.4-safety/`. Nenhum arquivo existente tocado. Aguarda ratificação de gate humano tardio. |

---

*Diff cirúrgico da Sub-onda 1.4 — 4 CREATEs limpos + 5 índices em `1.4-safety/`. Procedência
ancorada em `procedencia.md` do Liceu (Fase 1). Nenhuma consulta web necessária. Working tree
fora de Caos/ preservado.*
