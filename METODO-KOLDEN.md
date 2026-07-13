# MÉTODO KOLDEN — v1.2

> **Versão:** 1.2 · **Ratificado inicialmente:** 2026-07-06 (v1.0) · **Emenda v1.1:** 2026-07-09 (Sub-onda 3.3 da Onda 3) · **Emenda v1.2:** 2026-07-09 (Onda 4 Olimpo — E4 canonizada + NOTA §3 Camada 3-4 combinada) · **Sub-onda de origem:** 1.6 v1.0 → Onda 3 (v1.1) → Onda 4 (v1.2) do Contrato-mãe `m-20260706-metodo-kolden`)
> **Escopo:** norma canônica para nascer, operar e verificar todo agente de IA da Kolden.
> **Idioma:** PT-BR em tudo (identidade Kolden). Termos técnicos e nomes de tools ficam no original.
> **Fonte-de-verdade da procedência:** `Liceu/frameworks/arquitetura-de-agents-kolden/procedencia.md` (Fase 1 do Contrato `m-20260704`).

---

## Sumário

- **§1** O que é o Método (identidade + escopo + para quem)
- **§2** Os 12 princípios canônicos + procedência
- **§3** A hierarquia de 5 camadas (Humano → Hermes → Zeus → Executivos → Operacional)
- **§4** Os 8 critérios canônicos por agent (rubrica + evidência textual esperada)
- **§5** Os 14 modelos do Caos (o que padronizam, quando invocar)
- **§6** A convenção `@` (dispatch) vs `/` (skill invocation local)
- **§7** Os 5 buckets de capacidade Kolden
- **§8** O rito de padronização por squad (ondas 2-26)
- **§9** Papel do Dike (verificação independente)
- **§10** Predições Kolden 2026-2027
- **§11** Referências completas por seção (procedência-âncora)
- **§12** Notas de versão + roadmap

---

## §1 — O que é o Método

O **Método Kolden** é a norma que consolida (a) o framework **arquitetura-de-agents-kolden** produzido pelo Liceu na Fase 1 do Contrato `m-20260704` (12 princípios + 5 camadas + 8 critérios), (b) os 14 modelos do Caos, (c) a hierarquia de 5 camadas do AGENTS.md, e (d) as convenções PT-BR + kebab-case + mitologia grega + REUSE > ADAPT > CREATE.

**Para quem:** para qualquer humano ou agente que crie, opere, revise ou padronize um agente de IA dentro da Kolden. Toda decisão estrutural sobre agent Kolden (nascimento, mutação, aposentadoria) passa por este documento.

**O que não é:**
- **Não é implementação real de MCP** — a Camada 1 (LLM + tools MCP) é padronizada aqui; a construção real de MCPs + dashboard de safety é escopo da Fase 3 residual (Contrato próprio a lavrar após as 26 Ondas).
- **Não é substituto do framework do Liceu** — é sua *projeção operacional* na fábrica do Caos. O framework declara `o que` deve ser verdadeiro; o Método declara `como` a Kolden materializa.
- **Não é substituto da Constituição do Caos** — é seu *invólucro* raiz. A Constituição do Caos v2.5.0 é a materialização por-artigo dos princípios deste Método.

**Filosofia central (4 pilares):**
1. **Dogfooding** — o Caos padronizou a si mesmo (Onda 1, sub-ondas 1.1-1.5) antes de padronizar os 25 squads restantes. A fábrica passa pelo próprio fluxo.
2. **Procedência linha-a-linha** — nenhum princípio, camada ou critério existe sem citação verbatim a linhagem/mente/obra/ano em `Liceu/frameworks/arquitetura-de-agents-kolden/procedencia.md`. Divergências são declaradas honestamente com plano de emenda.
3. **Reversibilidade** — todo diff é cirúrgico, working tree preservado, gate humano entre passos, ratificação por artefato ou em bloco via `AskUserQuestion`.
4. **Incerteza declarada** — o Método reconhece que preferências do humano são espaço latente; corrigibility não é retrofit de safety, é lógica direta da incerteza sobre a utilidade (Russell 2019).

---

## §2 — Os 12 princípios canônicos

Os 12 princípios são a **norma canônica** herdada do framework do Liceu Fase 1 e ancorados 1:1 em `procedencia.md`. Cada princípio nomeia sua linhagem primária.

| # | Princípio | Fonte primária | Onde vive no Método |
|---|---|---|---|
| P1 | **Universalidade Turingiana** — todo agent Kolden é model-agnostic; roda em qualquer LLM competente | Turing (1936/1950) — Onda 1 do dossiê Liceu | §3 Camada 1 · §5 modelo `system-prompt-base.md` |
| P2 | **Sociedade de Mentes** — squads existem porque decomposição por especialização bate agent-monólito | Minsky (1986) *The Society of Mind* — Onda 2 | §3 Camada 3 (Squad) · §5 modelo `orquestrador-base.md` |
| P3 | **Bounded Rationality** — todo agent nasce com `aspiration_criteria` (3-5 metas mensuráveis com limite) | Simon (1955) QJE 69 + (1947) *Administrative Behavior* — Onda 1 | §4 Critério C1-B + §5 modelo `prd-de-ia.md` (frontmatter) |
| P4 | **Software 2.0** — PRD é a fonte da verdade; código é derivado | Karpathy (2017) "Software 2.0" — Onda 3 | Constituição Caos Art. I · §5 modelo `prd-de-ia.md` |
| P5 | **Assistance Games** — utilidade humana não é observável; agent tem incerteza sobre U | Hadfield-Menell-Russell-Abbeel-Dragan (2016) CIRL NeurIPS + Russell (2019) *Human Compatible* — Onda 5 | §4 Critério C3 (uncertainty) + §5 bloco "Incerteza declarada" |
| P6 | **Orthogonality + Instrumental Convergence** — capacidade e valores são ortogonais; sub-metas emergem | Bostrom (2012) Minds and Machines 22 + (2014) *Superintelligence* cap. 7 — Onda 5 | §4 Critério C6 (tabela auditoria capacidades × risco) |
| P7 | **Embodied Grounding** — use o mundo como próprio modelo; fatos datáveis via tool | Brooks (1991) "Intelligence Without Representation" AI 47 + (1990) "Elephants Don't Play Chess" — Onda 5 | Constituição Art. IX · §4 Critério C7 |
| P8 | **Constitutional AI** — cada agent nasce com constituição própria (5-15 princípios veto-operacionais) | Bai-Kadavath-Kundu-Askell-Amodei et al. (2022) arXiv 2212.08073 — Onda 4 | §4 Critério C1 · §8 Rito passo 5.5 |
| P9 | **Race-to-the-Top em Safety** — safety como fonte de vantagem competitiva; dashboard público | Anthropic (2021) "Introducing Anthropic" + Amodei (2023) RSP — Onda 4 | §4 Critério C2 (ASL) · §10 Predictions Kolden |
| P10 | **ReAct como Agent-Loop Padrão** — Thought → Action → Observation é a operação-padrão | Yao-Zhao-Yu-Du-Shafran-Narasimhan-Cao (2022) arXiv 2210.03629 ICLR 2023 — Onda 6 | §5 modelo `system-prompt-base.md` (`loop_pattern: ReAct`) |
| P11 | **State Machine + HITL** — grafos de estado com humano no loop no ponto certo | LangGraph docs (jan/2024) + Russell (2017) IJCAI Off-Switch — Onda 6 | §4 Critério C4 + §5 reflexo `interrupt-before-mutation.sh` |
| P12 | **MCP como Camada Universal** — toda tool é MCP-nativa ou adapter fino | Anthropic (25/nov/2024) "Introducing the Model Context Protocol" — Onda 6 | Constituição Art. IV v2.5.0 · §3 Camada 1 |

**Regra de sobrescrita:** um agent Kolden pode divergir de um princípio, mas a divergência precisa (a) estar declarada em `<Agent>/constitution.md`; (b) citar procedência da divergência (linhagem/mente/obra); (c) ter data-limite de reavaliação. Divergência silenciosa = BLOCK em Fase 6 do Ritual.

**Divergência atualmente ativa no Método:** interpretabilidade (Amodei-Olah 2016) é elevada a critério canônico próprio C3 (rebatizado como G5 no Art. X) por decisão do Contrato-mãe `m-20260706` — emenda ao framework do Liceu proposta em §11 do Contrato, ida-e-volta com Liceu-chief agendada para Onda 6 do Método. Ver §11 (Referências).

---

## §3 — A hierarquia de 5 camadas

Todo input humano atravessa 5 camadas, enriquecido e assinado a cada degrau num **Contrato de Missão** (`Olimpo/contratos/`).

```
1. HUMANO (Ronan) ─── dá o input; aprova no portão de subida
       │
       ▼
2. HERMES (Camada 2) ── traduz intenção, aplica DoR + matriz de risco (verde/amarelo/vermelho → autonomia progressiva),
                        lacra a intenção (sha256), cria o Contrato de Missão. Dono do USER.md.
       │
       ▼
3. ZEUS (Camada 3 — CEO/Orquestrador do Olimpo) ── decompõe a missão, roteia por `routing_triggers`
       │
       ▼
4. EXECUTIVOS DO OLIMPO (8 deuses — Camada 4) ── especificam na língua técnica da disciplina
   Zeus (CEO) · Poseidon (COO) · Apolo (CMO) · Hefesto (CTO)
   Hades (CIO) · Atena (CAIO) · Plutos (CFO) · Afrodite (CRO)
       │
       ▼
5. OPERACIONAL (Camada 5) ── squads de execução (26 squads Kolden + 6 sementes)
   Marketing:   Pheme · Peitho · Caliope · Aglaia · Harmonia · Orfeu · Ariadne
   Estratégia:  Aletheia · Argos · Liceu · Olimpo · Themis · Metis · Pluto · Dionisio
   Engenharia:  Prometeu · Dedalo · Egide
   Sementes:    Nomos · Pactolo · Emporos · Hestia · Ananke · Cairos
```

**Na subida** — a **`Dike`** (verificador) reconcilia a entrega contra o lacre (sha256 da intenção original) e localiza o degrau de qualquer quebra (TPND = Turno-Perdido-Na-Descida deve ser 0) antes do Hermes devolver ao Ronan.

**Camada 1 (fora do diagrama humano):** LLM provider + MCP tools — a infra que os agents da Camada 5 consomem. É onde vive o Art. IV v2.5.0 (MCP mandatório) da Constituição do Caos.

**Fronteira canônica:**
- **Cada camada só fala com a de cima e a de baixo** (exceto Hermes, que fala com todos por design de runtime).
- **Handoff cross-squad na Camada 5** passa por `external_handoffs` declarado no `squad.yaml` do produtor.
- **Runtime bidirecional (Discord/Slack/Telegram/WhatsApp/Google Chat)** — 5 adapters do Hermes que MCP spec 2024 não modela. Categoria constitucional própria (proposta de emenda ao Art. IV) — ver §12 e Sub-onda 1.3.

**Padrão de agent monolítico rejeitado:** o Método proíbe agent-monólito genérico (Anti-padrão #1 do framework Liceu, herança Minsky + Newell-Simon). Agent Kolden é sempre membro de squad OU solo com escopo cirúrgico declarado.

**NOTA (v1.2) — Camada 3-4 combinada dentro do mesmo squad (caso especial documentado):** um squad pode reunir Camada 3 (decompõe + roteia) e Camada 4 (traduz na disciplina) dentro do mesmo squad quando é uma C-suite virtual. **Ocorrente único até aqui: Olimpo** (Zeus/CEO na Camada 3 decompõe + roteia; os 7 executivos-deuses na Camada 4 traduzem + assinam). Hermes é Camada 2 pura; Prometeu e o Grupo C (Aletheia/Argos/Liceu) são Camada 5. A fronteira Camada 3 × Camada 4 dentro do squad é declarada no `CLAUDE.md` §Persona + `prd-de-ia.md` §6 do squad. Canonizado como caso especial pela Onda 4 (2026-07-09) — se uma 2ª ocorrência surgir, promover a categoria estrutural própria em revisão futura.

---

## §4 — Os 8 critérios canônicos por agent (Art. X)

Todo agent Kolden nasce, opera e é revisado sob **8 critérios canônicos** (herdados do framework `arquitetura-de-agents-kolden`). Cada critério tem severidade declarada (BLOCK/WARN/INFO) e fase do Ritual onde é ativado. O checklist canônico `CAOS-CL-002` (promovido de draft na Sub-onda 1.6) faz a verificação por gate.

| Gate | Nome | Severidade | Onde nasce (frontmatter/arquivo) | Fase Ritual | Evidência textual esperada |
|---|---|---|---|---|---|
| **G1** | Constituição por-agent declarada (5-15 princípios veto-operacionais) | **BLOCK** | `<Agent>/constitution.md` + `constitution:` no PRD | 4 + 6 | `constitution: <Agent>/constitution.md` (frontmatter PRD) + bullet "Constituição do agente" na Persona do CLAUDE.md |
| **G2** | ASL (1\|2\|3\|4+) declarado | **BLOCK** | `ASL:` no frontmatter do PRD + cartão-de-identidade | 4 + 5.5 + 6 | `ASL: 3` com nota de justificativa (mutations irreversíveis em canal externo? = ASL-3) |
| **G3** | Uncertainty statement + Aspiration Criteria (3-5 metas mensuráveis com `limite:` e `fonte_evidencia:`) | **BLOCK** | `uncertainty_statement:` + `aspiration_criteria:` no PRD + bloco "Incerteza declarada" no CLAUDE.md | 1 + 4 + 5b | Bloco Russell 2019 no CLAUDE.md + 3-5 critérios com limite operacional numérico no PRD |
| **G4** | Off-switch / corrigibility (reflexo `interrupt-before-mutation.sh` + teste OS-1) | **BLOCK** para ASL-3+; WARN para ASL-2; INFO para ASL-1 | `<Agent>/.claude/reflexos/interrupt-before-mutation.sh` + `roteiro-de-teste.md` (OS-1) | 5.5 + 7 | Script bash que pausa antes de mutation-with-side-effect até resposta humana + teste que valida a pausa |
| **G5** | Plano de introspecção (interpretabilidade) — que sinal permite entender por que o agent fez X | **WARN** (BLOCK para ASL-3+ com efeito irreversível) | Fase 3 §"Plano de introspecção por camada" no blueprint do arquiteto | 3 + 6 | Tabela: por camada (orquestrador, especialista, skill) → sinal (trace ReAct, log de decisão, tool call trace) → onde é escrito |
| **G6** | Orthogonality + Instrumental Convergence (tabela auditoria capacidades × risco) + teste AB-3 no roteiro | **WARN** | Fase 3 §"Tabela auditoria capacidades × risco" + `roteiro-de-teste.md` (AB-3) | 3 + 7 | Tabela: capacidade → vetor de risco separado → mitigação; teste que valida agent recusa "você precisa de mais poder" |
| **G7** | Grounding compulsório para fatos datáveis (Art. IX) — habilidades com `grounding_required: true` | **WARN** (BLOCK em asserção materialmente errada) | Frontmatter da skill + reflexo `verificacao-de-fato-datavel.sh` (opcional) | 2 + 5.3-5.4 + 6 | `grounding_required: true` em toda skill que retorna fato datável (data/nome/número/versão) |
| **G8** | Predictions Scorecard **condicional** — obrigatório se agent faz previsões datáveis | **BLOCK condicional** (só se Rodada 0 pergunta (a) = SIM) | `predictions_scorecard: true\|false\|null` no frontmatter PRD | 1 + 4 + 8 | Se `true`: `<Agent>/registros/predictions-scorecard-<agente>.md` com previsões (data \| critério \| revisor \| próxima_revisão) |

**Regra de severidade:** BLOCK impede transição de fase; WARN emite alerta mas permite prosseguir com nota; INFO é observação sem gate. Ver Constituição Art. X §Severidade.

**Ritual dos 8 critérios em runtime:**
- Fase 1 (Diagnóstico) pergunta G3 e G8 (Rodada Alma).
- Fase 2 (Pesquisa) aplica G7 (grounding compulsório).
- Fase 3 (Arquitetura) produz G5 (plano de introspecção) e G6 (tabela capacidades × risco).
- Fase 4 (PRD) exige G1, G2, G3, G8 como campos frontmatter obrigatórios.
- Fase 5.5 (Reflexos) gera G4 (interrupt-before-mutation para ASL-3+).
- Fase 6 (Revisão) executa CAOS-CL-002 por gate.
- Fase 7 (Teste) inclui OS-1, AB-3, UN-2, GR-1, PR-1 (testes canônicos derivados).
- Fase 8 (Entrega) publica G8 (predictions scorecard) se aplicável.

**Baseline dogfooding (Sub-onda 1.5):** `Caos/.claude/agents/arquiteto.md` (pré-Fase 2) marca **0/8** gates. O agent Salgueiro (simulação canônica do Ritual v3.4.0) marca **8/8**. Delta absoluto: **+100 pontos de conformidade**. Justifica a escala das Ondas 2-26.

**Divergência declarada:** o critério G5 (interpretabilidade) NÃO está nomeado como critério próprio no framework do Liceu Fase 1 — o framework tem #5 = Orthogonality e #6 = Instrumental separados. O Contrato-mãe `m-20260706` consolidou #5-#6 em G6 e elevou interpretabilidade a G5 próprio (procedência: Amodei-Olah-Steinhardt-Christiano-Schulman-Mané 2016 arXiv 1606.06565 § Interpretability + linhagem Anthropic Circuits, Olah 2020-). Emenda ao framework proposta ao Liceu-chief — ver §12 e `Caos/registros/metodo-onda-1/1.6-metodo-kolden/emendas-liceu.md`.

---

## §5 — Os 14 modelos do Caos

Os 14 modelos vivem em `Caos/modelos/` e formam o **kit canônico** que o Ritual de 9 fases consome para nascer todo agent Kolden. Redesenhados na Sub-onda 1.2 do Contrato-mãe para carregar os 5 campos canônicos do Art. X (constituição + ASL + aspiration + uncertainty + predictions_scorecard) onde aplicável.

**Autoridade escalonada:** o `prd-de-ia.md` é a **fonte da verdade** dos 5 campos (Art. III da Constituição). Todos os demais modelos referenciam o PRD por campo — nunca duplicam. Padrão validado 2x nas sub-ondas 1.1 e 1.2 (regra `PRD-como-fonte`).

| # | Modelo | Papel canônico | Quando invocar |
|---|---|---|---|
| 1 | `prd-de-ia.md` | **Fonte da verdade** — 12 seções + frontmatter com 5 campos canônicos (constitution, ASL, aspiration_criteria, uncertainty_statement, predictions_scorecard) | Fase 4 do Ritual (obrigatório antes de qualquer arquivo do agent ser escrito) |
| 2 | `system-prompt-base.md` | Molde do CLAUDE.md do agent — 6 blocos obrigatórios (persona, objetivo, restrições, formato de saída, exemplos, **Incerteza declarada** Russell 2019) | Fase 5b (redator-de-prompts) |
| 3 | `cartao-de-identidade.md` | Metadata leve para o roster (`Caos/dados/elenco-de-agentes.yaml`) — nome, ASL, camada, links | Fase 5.1 (orquestrador) + Fase 8 (curador) |
| 4 | `checklist-de-qualidade.md` | Checklist de revisão do agent (100+ itens organizados por dimensão) — consome G1-G8 | Fase 6 (revisor) |
| 5 | `convencao-de-cli-e-tooling.md` | Nomenclatura de comandos, tools, MCPs; convenção `@` vs `/` (**agora centralizada em §6 deste Método** — este modelo aponta para METODO como fonte) | Fase 5.3-5.4 (habilidades + MCPs) |
| 6 | `especialista-historico.md` | Herança histórica de mente humana (biography + core_frameworks + signature_vocabulary) sem cópia literal | Fase 5.6 (herança-de-especialista) |
| 7 | `ferramentas.md` | Catálogo de tools do agent — MCP-nativo vs adapter (Art. IV v2.5.0) + `grounding_required` (Art. IX) | Fase 5.3-5.4 |
| 8 | `guia-infisical.md` | Padrão de acesso a segredos via Infisical (Art. VII) — não intersecta Art. X, preservado sem mudança na Sub-onda 1.2 | Sempre que o agent precisar de credencial |
| 9 | `instalacao.md` | Passo-a-passo de deploy do agent em produção | Fase 8 (entrega) |
| 10 | `orquestrador-base.md` | Molde do agent tier-0 de um squad — roteia, não executa; roster declarado | Fase 5.1 (quando arquitetura = SQUAD) |
| 11 | `perfil.md` | Soft-skills + hard-skills + persona detalhada | Fase 5b (complemento do CLAUDE.md) |
| 12 | `roteiro-de-teste.md` | Roteiro de smoke tests da Fase 7 + testes canônicos (OS-1, AB-3, UN-2, GR-1/GR-2, PR-1) | Fase 7 (testador) |
| 13 | `nucleo/ARQUITETURA.md` | Descrição da arquitetura do próprio Caos (fábrica) — atualizado na Sub-onda 1.2 com 5 campos canônicos | Sempre que reformar fábrica (meta-fluxo) |
| 14 | `squad-base.yaml` (esperado, ver §12 roadmap) | Manifesto canônico de squad — tiers, agentes, handoffs, cross_cutting, entry_agent, veto | Fase 5.1 quando arquitetura = SQUAD |

**Regra de invocação (padrão validado):** um agent só ganha um modelo se o PRD justificar. Agent solo SEM catálogo de MCPs pode dispensar `ferramentas.md` (o modelo continua canônico, mas o item específico é opcional). Modelo utilitário sem gap material fica intocado por decisão explícita — padrão da Sub-onda 1.2 (`guia-infisical.md` não tocado).

**Regra E4 — distinção 3-way MEMORY (CANONIZADA v1.2, 2ª confirmação empírica):** a memória persistente de um squad Kolden vive em **três níveis distintos, não-fungíveis**:
1. **squad-level** — `<Squad>/MEMORY.md`: padrões estruturais do squad (identidade, candidatos a promoção, aprendizados de onda).
2. **agent-chief-level** — `<Squad>/agent-memory/<chief>.md`: padrões técnicos de execução do orquestrador tier-0.
3. **agent-especialista-level** — `<Squad>/agent-memory/<especialista>.md`: padrões por-especialista tier-1.

Se o squad é vendorizado e o vendor traz memória própria canônica (ex.: `.aiox-core/.../MEMORY.md` do Prometeu), ela é um 4º artefato **INTOCÁVEL** (fronteira E1). O Ritual de Encerramento (§8 Passo 7) grava nos níveis Kolden, nunca no vendor. Procedência: Prometeu Sub-onda 3.2 (1ª ocorrência) + Olimpo Onda 4 (2ª ocorrência — `Olimpo/MEMORY.md` squad-level × `Olimpo/agent-memory/olimpo.md` chief-level × `Olimpo/agent-memory/{afrodite,plutos,...}.md` especialista-level).

---

## §6 — A convenção `@` (dispatch) vs `/` (skill invocation local)

Convenção **centralizada aqui como fonte de verdade**. Arquivos históricos (Caos/CLAUDE.md, Hermes/squads-catalog.yaml, Caos/modelos/convencao-de-cli-e-tooling.md) apontam para este §6 como fonte canônica.

### `@` — dispatch (roteamento entre squads / disparo cross-nível)

- **`@Nome-do-Squad`** dispara o orquestrador tier-0 daquele squad.
  - Exemplo: `@Caos crie um agente vendedor SaaS` → dispara `caos-chief` que inicia o Ritual de 9 fases.
  - Exemplo: `@Hermes preciso ir na Rosie` → dispara `hermes-chief` que triga uma missão.
- **`@dike`** — verificador independente (nasce como agent funcional na Sub-onda 1.6; ver §9).
- **`@Nome-do-Squad:nome-do-especialista`** dispara um especialista específico tier-1 dentro do squad.
  - Exemplo: `@Caliope:eugene-schwartz revise essa headline`.
- **Ambiente de disparo:** `@` funciona **cross-sessão** — pode ser digitado numa sessão raiz do Claude Code em `C:\Kolden\` e roteia para a sessão dedicada do squad (mesmo padrão do `hermes-chief` como interpretador).

### `/` — skill invocation local (dentro da sessão atual)

- **`/nome-da-skill`** invoca uma skill do Claude Code disponível na sessão atual (auto-descoberta via frontmatter `description`).
  - Exemplo: `/metodo` → invoca a skill deste próprio Método (ver `.claude/skills/metodo/SKILL.md`).
  - Exemplo: `/padronizar Aletheia` → invoca a skill de padronização de squad.
  - Exemplo: `/ritual-de-encerramento` → invoca a skill do ritual de encerramento antes de fechar a sessão.
- **Escopo:** `/` só age dentro da sessão atual. Não cria sessão nova. Não roteia entre squads.
- **Skills globais** (em `C:\Kolden\.claude\skills\`): visíveis em qualquer sessão iniciada em `C:\Kolden\` ou subpasta.
- **Skills locais** (em `C:\Kolden\<Squad>\.claude\skills\`): visíveis só em sessões iniciadas dentro do squad.

### Fronteira dura

- **Nunca** use `@` para invocar skill (`@metodo` é erro semântico).
- **Nunca** use `/` para dispatch cross-squad (`/Caos` é erro semântico — o correto é `@Caos`).
- **Comando raiz do Claude Code** (`/help`, `/clear`) é convenção do próprio CLI e fica no espaço `/`; não colide com skills.

---

## §7 — Os 5 buckets de capacidade Kolden

Padrão validado em produção via `sobre-a-empresa/operacao/tarefas/radar.yaml` (118 tarefas ativas em 2026-07). Todo item de trabalho Kolden é classificado num destes 5 buckets:

| # | Bucket | Descrição | Exemplo |
|---|---|---|---|
| 1 | **`agente-faz-sozinho`** | Agent conclui sem input humano | `@Caliope:eugene-schwartz reescreva a manchete` |
| 2 | **`agente-faz-com-input`** | Agent conclui com 1-3 inputs humanos discretos | `@Aletheia diagnostique produto X` (com respostas de discovery do Ronan) |
| 3 | **`agente-instrumenta-humano-decide`** | Agent produz opções + trade-offs; humano escolhe | `@Zeus propõe 3 rotas para lançar Y` |
| 4 | **`humano-puro`** | Trabalho que humano faz (agent pode registrar/lembrar mas não executar) | Reunião presencial · Assinatura em cartório |
| 5 | **`bloqueado-por-capacidade-faltante`** | Ideia sem agent capaz — vira input do Caos para criar/absorver | "Preciso de um agent que audite código Rust" (sem squad Rust) |

**Regra operacional:** o 5º bucket é **input do Caos** — toda tarefa lá aciona a decisão de REUSE > ADAPT > CREATE (Art. VI da Constituição). Se REUSE resolve, tarefa migra para bucket 1-3; se CREATE, vira Contrato de Missão de criação de squad/agent.

**Escrita centralizada:** o único writer autorizado do `radar.yaml` é a skill `/tarefa` (a criar via Caos — dívida pendente conforme `sobre-a-empresa/operacao/tarefas/README.md`).

---

## §8 — O rito de padronização por squad (Ondas 2-26)

Playbook canônico de 9 passos por Onda. **Uma Onda = um squad-alvo**. Herdado do Contrato-mãe (§handoff_operacional do executivo Hefesto) e validado 5x nas sub-ondas 1.1-1.5.

```
Passo 1 — Ler METODO-KOLDEN.md v1.0 como norma
Passo 2 — Diagnóstico READ-ONLY (fan-out ≤3 Explores)
Passo 3 — Escrever 5 artefatos padronizados (matriz + achados + diff + comparação + sumário)
Passo 4 — PARAR: Ronan aprova diff via AskUserQuestion + ExitPlanMode
Passo 5 — Aplicar diff (reescrita cirúrgica com procedência linha-a-linha)
Passo 6 — Dike verifica INDEPENDENTE contra CAOS-CL-002
Passo 7 — Ritual de encerramento em <Squad>/MEMORY.md + <Squad>/agent-memory/<chief>.md
Passo 8 — Atualizar AGENTS.md (índice)
Passo 9 — Atualizar METODO-KOLDEN.md se aprendizado for canônico (versão minor bump)
```

### Anatomia canônica dos 5 artefatos por Onda

**Confirmado 5x** nas sub-ondas 1.1-1.5. Norma canônica das Ondas 2-26:

1. **`matriz-de-conformidade.md`** OU **`relatorio-de-costura.md`** — auditoria por artefato do squad-alvo contra o Método (com evidência textual).
2. **`achados.jsonl`** OU **`diff-cirurgico.md`** — mapa achados → mudanças com severidade (P0/P1/P2/P3) + rastro para 8 gates.
3. **`agent-gerado-smoke.md`** OU **arquivo do Ritual** — smoke test canônico + procedência linha-a-linha.
4. **`verificacao-dike.md`** — 8/8 checkboxes CAOS-CL-002 seções A-G com citação textual verbatim por checkbox + bloco YAML canônico do veredito.
5. **`sumario-executivo.md`** — sumário ≤10 min de leitura + gate humano + bloco YAML pronto para appendar no Contrato-mãe.

### Regras invioláveis (aplicáveis a TODAS as Ondas)

- **G1 — Escopo cirúrgico** — nenhum arquivo tocado fora do squad-alvo (exceto AGENTS.md + METODO em Sub-onda 1.6 e Onda 26 final).
- **G2 — Sem commit sem ordem** — working tree preservado até o Ronan pedir com todas as letras.
- **G3 — Sem push sem ordem** — mesma regra.
- **G4 — Ritual de encerramento por onda** — obrigatório antes de fechar sessão.
- **G5 — Fan-out ≤3 subagentes internos por onda** (regra rate-limit validada 2026-06-27).
- **G6 — Artefato-em-disco entre ondas** — nenhuma decisão perdida em memória de sessão.
- **G7 — Nunca duas ondas na mesma sub-sessão** — cada onda é sessão dedicada em `C:\Kolden\<Squad>\`.
- **G8 — Procedência rastreável** — nenhuma mudança sem linhagem/mente/obra/ano batendo com `procedencia.md` do Liceu (divergências declaradas honestamente).

### Regra do fan-out — CONFIRMADA 5x (padrão canônico)

`fan-out ≤N é TETO, não obrigação`. Escolha por INTERDEPENDÊNCIA do alvo, não por quantidade:

- **Alvos interdependentes** (bloco canônico único, mesmos campos, coerência estilística cross-arquivo) → **execução direta (0/3 subagentes)**. Casos: 1.1 (2 arquivos), 1.2 (13 arquivos), 1.4 (safety schema + templates), 1.5 (costura + smoke + Dike + baseline), 1.6 (Método + skills + propostas).
- **Alvos independentes** (varredura cross-26-squads por padrão bem-definido, classificação binária) → **fan-out até o teto (3/3)**. Caso: 1.3 (inventário MCP em 26 squads).

Confirmação em 5 sub-ondas consecutivas promove esta regra a padrão global do Método. Sub-ondas 2-26 aplicam a mesma heurística.

### Divisão em grupos das Ondas 2-26

Sugerida pelo Contrato-mãe (§handoff do Hefesto):

- **Grupo A (Ondas 2-3):** Meta-squads — Hermes, Prometeu
- **Grupo B (Ondas 4-6):** Governance — Olimpo, Dike, Themis
- **Grupo C (Ondas 7-9):** Estratégia + Discovery — Aletheia, Argos, Liceu
- **Grupo D (Ondas 10-13):** Ops + Finance — Ananke, Cairos, Hestia, Pactolo
- **Grupo E (Ondas 14-18):** Criativos — Aglaia, Caliope, Harmonia, Orfeu, Pheme
- **Grupo F (Ondas 19-24):** Execução — Ariadne, Dionisio, Emporos, Peitho, Pluto, Metis
- **Grupo G (Ondas 25-26):** Cyber + auxiliares — Egide, Dedalo, Nomos

Ordem revisitável em qualquer momento. Recomendação técnica para Onda 2 em §12.

---

## §9 — O papel do Dike (verificação independente)

**Dike** (Δίκη) — deusa da Justiça na mitologia grega, filha de Thémis e Zeus. Na Kolden, é o **verificador independente** que reconcilia entrega contra intenção original antes do Hermes devolver ao Ronan.

### Função canônica (validada 5x nas sub-ondas 1.1-1.5)

- **Executa CAOS-CL-002** — checklist canônico Dike em `Caos/checklists/CAOS-CL-002.md`, promovido de draft na Sub-onda 1.6 (era `Caos/registros/redesenho-fase2/onda-1-diagnostico/CAOS-CL-002-draft.md` na Onda 1 do Contrato `m-20260705`).
- **Verifica 8 gates canônicos por agent** — seções A-G do checklist com evidência textual verbatim por checkbox.
- **Verifica TPND=0 na subida** — reconcilia entrega contra lacre sha256 da intenção original.
- **Localiza o degrau da quebra** — quando falha, aponta camada + agent responsável.
- **NÃO executa; NÃO produz** — só verifica. Independência absoluta do produtor.

### Estado atual (2026-07-13) — INSTANCIADO na Onda 5

- **Dike é agent-funcional** desde a **Onda 5 do METODO (2026-07-13)**: agent-def `Dike/.claude/agents/dike-chief.md` + persona `Dike/agents/dike.md` + `Dike/constitution.md` (12 artigos veto) + `Dike/squad.yaml` (SOLO nativo) + README + `_origem.md` + `agent-memory/dike-chief.md`, sobre o esqueleto pré-existente (CLAUDE + PRD v2.0 + MEMORY + 8 reflexos + settings) e o checklist `Caos/checklists/CAOS-CL-002.md`. Veredito da Onda: `sobe-com-ressalvas` (6/8 VERDE; C4/C6 amarelo — testes nomeados OS-1/AB-3 pendentes no roteiro). Fecha o "padrão Dike temporário confirmado 10x".
- **Nas sub-ondas 1.1-1.5**, o papel de Dike foi **executado temporariamente pelo caos-chief** (declarado explicitamente em `verificacao-dike.md` de cada sub-onda) com 3 salvaguardas:
  - (a) ordem serial smoke ANTES da verificação;
  - (b) evidência textual verbatim por checkbox;
  - (c) declaração explícita de divergência conhecida.
- **Sub-onda 1.6 propõe Dike nascer como agent funcional** — 3 opções em `Caos/registros/metodo-onda-1/1.6-metodo-kolden/proposta-dike-instanciacao.md`. Decisão via gate humano em `AskUserQuestion` (§14 do sumário executivo desta sub-onda).

### Invocação canônica (após instanciação aprovada)

- **`@dike`** — dispara verificação independente de qualquer entrega em curso.
- **`/padronizar <Squad>`** — invoca a skill de padronização, que chama `@dike` no Passo 6 do rito §8.

### Divergência declarada

O papel Dike temporário pelo caos-chief é aceitável como transição — não é padrão sustentável. Nas Ondas 2-26, Dike **deve** ser agent funcional independente.

---

## §10 — Predições Kolden 2026-2027

Aplicação do princípio P9 (Race-to-the-Top em Safety) — Kolden publica previsões datáveis sobre a própria evolução, no espírito Brooks 2018-2026. Primeira safra emitida na Sub-onda 1.4 (`Caos/registros/predictions-scorecard-kolden-2026.md` + `Caos/registros/metodo-onda-1/1.4-safety/predicoes-2026-2027.yaml`).

### Safra 2026-2027 (5 predições — dificuldade média 3.0)

Ancoradas em fato datável (Sub-onda 1.3 + Constituição v2.5.0), com categorias de erro pré-declaradas (Brooks 2024 §meta-comentário):

- **KLD-PRED-2026-001** (dif. 2) — Substituições MCP Grupo A concluídas até 2026-10-01 (Apify, GHL×2, ElevenLabs). Verificação: `mcp list` mostra os 4 conectados.
- **KLD-PRED-2026-002** (dif. 3) — MCPs-próprios Grupo B (6 simples) em produção até 2026-12-31 (Speechmatics, Deepgram, SociaVault, Mistral, Groq, MiniMax).
- **KLD-PRED-2026-003** (dif. 4 — condicional) — Categoria constitucional "runtime bidirecional" ratificada até 2027-01 (via emenda Art. IV OU maturação MCP spec 2025-2026 `streamable-http-transport`).
- **KLD-PRED-2026-004** (dif. 3) — Ondas 2-26 do Método concluídas até 2027-04-30 com coef. variação estrutural <20% (baseline pré-Método: 120%).
- **KLD-PRED-2026-005** (dif. 3) — 5 dos 6 squads-semente (Nomos/Pactolo/Emporos/Hestia/Ananke/Cairos) passam pelo Ritual completo do Caos até 2027-06-30.

**Cadência:** revisão anual em 2027-01-01 (revisão substantiva) + revisão trimestral em predições 001 e 004 (janela crítica). Rubrica dificuldade 1-5 declarada em `Caos/modelos/revisao-anual.md`.

**Onde populam:** `Caos/registros/dashboard-safety.md` v0.1.0 (schema — 13+ colunas + 7 fontes) receberá as previsões quando o motor de coleta for construído (Fase 3 residual).

---

## §11 — Referências completas por seção

Grep em `Liceu/frameworks/arquitetura-de-agents-kolden/procedencia.md` confirma cada citação abaixo. Divergências declaradas honestamente.

### Seção §1 (Filosofia)
- Dogfooding — norma operacional Kolden (não literatura externa; procedência interna: Sub-onda 1.5 baseline `arquiteto.md` 0/8 vs Salgueiro 8/8 = +100 pts).
- Procedência linha-a-linha — herdada do Liceu Fase 1 (Vetos de Candura em `procedencia.md` §Vetos).
- Reversibilidade — norma operacional Kolden (Constituição Caos Art. III + política CLAUDE.md §6 "sem commit sem ordem").
- Incerteza declarada — **Russell (2019)** *Human Compatible* (Viking) — Onda 5 do dossiê Liceu.

### Seção §2 (12 Princípios)
Fontes primárias em `Liceu/frameworks/arquitetura-de-agents-kolden/procedencia.md` §"Procedência dos 12 Princípios Canônicos":
- P1: **Turing** (1936) "On Computable Numbers" + (1950) "Computing Machinery and Intelligence" — Onda 1.
- P2: **Minsky** (1986) *The Society of Mind* (Simon & Schuster) — Onda 2.
- P3: **Simon** (1955) "A Behavioral Model of Rational Choice" (QJE 69) + (1947) *Administrative Behavior* — Onda 1.
- P4: **Karpathy** (2017) "Software 2.0" (Medium) — Onda 3.
- P5: **Hadfield-Menell, Russell, Abbeel, Dragan** (2016) "Cooperative Inverse Reinforcement Learning" (NeurIPS) + **Russell** (2019) *Human Compatible* — Onda 5.
- P6: **Bostrom** (2012) "The Superintelligent Will" (Minds and Machines 22) + (2014) *Superintelligence* cap. 7 — Onda 5.
- P7: **Brooks** (1990) "Elephants Don't Play Chess" (Robotics and Autonomous Systems 6) + (1991) "Intelligence Without Representation" (Artificial Intelligence 47) — Onda 5.
- P8: **Bai, Kadavath, Kundu, Askell, Amodei et al.** (2022) "Constitutional AI: Harmlessness from AI Feedback" (arXiv 2212.08073) — Onda 4.
- P9: **Anthropic** (2021) "Introducing Anthropic" + **Amodei** entrevistas Ezra Klein (mai/2024), Time (abr/2024), (2023) Responsible Scaling Policy — Onda 4.
- P10: **Yao, Zhao, Yu, Du, Shafran, Narasimhan, Cao** (2022) "ReAct: Synergizing Reasoning and Acting in Language Models" (arXiv 2210.03629; ICLR 2023) — Onda 6.
- P11: **LangGraph docs** (jan/2024, langchain-ai.github.io/langgraph) + **Hadfield-Menell, Dragan, Abbeel, Russell** (2017) "The Off-Switch Game" (IJCAI 2017) — Ondas 5-6.
- P12: **Anthropic** (25/nov/2024) "Introducing the Model Context Protocol" (modelcontextprotocol.io) — Onda 6.

### Seção §3 (Hierarquia de 5 camadas)
- Camada 5 (Governance/Gate Humano): Russell (2019) *Human Compatible* cap. 7 "The Three Principles" + Bostrom (2014) *Superintelligence* cap. 10 "Oracles, Genies, Sovereigns, Tools" + Amodei (2023) RSP.
- Camada 4 (Orquestração): Minsky Society of Mind + Newell-Simon (1972) *Human Problem Solving*.
- Camada 3 (Squad): Bai et al. Constitutional AI + Minsky.
- Camada 2 (Agent Individual): Yao et al. ReAct + Yao et al. (2023) ToT (arXiv 2305.10601) + Anthropic MCP (25/nov/2024).
- Camada 1 (LLM + MCP): Anthropic MCP + Karpathy Software 2.0 + linhagem multi-cloud Gomez (Onda 4).

### Seção §4 (8 Critérios Canônicos)
Tabela em `procedencia.md` §"Procedência dos 8 Critérios de Safety+Quality":
- G1 (Constitutional): Bai et al. arXiv 2212.08073 (2022, Onda 4).
- G2 (ASL): Amodei/Anthropic 2023 RSP (Onda 4).
- G3 (Uncertainty): Hadfield-Menell-Russell-Abbeel-Dragan (2016) NeurIPS + Russell (2019).
- G4 (Off-switch): Hadfield-Menell-Russell (2017) IJCAI Off-Switch Game.
- G5 (Interpretabilidade — **DIVERGÊNCIA DECLARADA**): Amodei-Olah-Steinhardt-Christiano-Schulman-Mané (2016) "Concrete Problems in AI Safety" (arXiv 1606.06565) § Interpretability + linhagem **Anthropic Circuits (Olah 2020-)**. Framework Liceu não lista interpretabilidade como critério nomeado — emenda proposta (ver `emendas-liceu.md`).
- G6 (Orthogonality + Instrumental consolidados): Bostrom (2012) + (2014).
- G7 (Grounding): Brooks (1991) AI 47 — reafirmado por Yao et al. 2022 ReAct e Pearl (2000) *Causality*.
- G8 (Predictions Scorecard): Brooks (2018-2026) rodneybrooks.com Predictions Scorecard (8 edições anuais consecutivas).

### Seção §5 (14 Modelos do Caos)
- Origem interna: os 14 modelos foram consolidados na Sub-onda 1.2 (Contrato `m-20260705` Onda 3, herdada pelo `m-20260706` como Sub-onda 1.2).
- Norma da autoridade escalonada (`PRD-como-fonte`): Karpathy (2017) Software 2.0 + Constituição Caos Art. I (2026-06-11).

### Seção §6 (`@` vs `/`)
- Origem interna Kolden: 3 arquivos históricos (`Caos/CLAUDE.md`, `Hermes/squads-catalog.yaml`, `Caos/modelos/convencao-de-cli-e-tooling.md`) — este Método é a centralização canônica.

### Seção §7 (5 Buckets)
- Origem interna Kolden: `sobre-a-empresa/operacao/tarefas/radar.yaml` — 118 tarefas ativas validadas em produção.

### Seção §8 (Rito das Ondas 2-26)
- Origem interna: Contrato-mãe `m-20260706` §handoff Hefesto — validado 5x nas sub-ondas 1.1-1.5.
- Fan-out ≤N como teto: origem em `Caos/agent-memory/caos.md` — confirmação 5x.

### Seção §9 (Dike)
- Papel canônico interno Kolden + `Caos/checklists/CAOS-CL-002.md` (promovido de draft na Sub-onda 1.6; ex-`Caos/registros/redesenho-fase2/onda-1-diagnostico/CAOS-CL-002-draft.md`).
- Mitologia grega: Dike, filha de Thémis e Zeus, deusa da Justiça.

### Seção §10 (Predições Kolden)
- Metodologia: **Brooks (2018-2026)** rodneybrooks.com Predictions Scorecard (8 edições).
- Categorias de erro Brooks 2024 §meta-comentário: erro-por-hype, erro-por-conservadorismo, erro-de-execução-interna, erro-de-modelo-do-mundo.

### Fontes cruzadas (aparecem em múltiplas seções)
- **Amodei** (Dario) — RSP 2023 + CAI co-autor 2022 + Machines of Loving Grace 2024 + Anthropic 2021.
- **Russell** (Stuart) — Human Compatible 2019 + CIRL 2016 + Off-Switch Game 2017.
- **Simon** (Herbert) — Models of Man/QJE 1955 + Administrative Behavior 1947.
- **Brooks** (Rodney) — Intelligence Without Representation 1991 + Elephants 1990 + Predictions Scorecard 2018-2026.
- **Bostrom** (Nick) — Superintelligent Will 2012 + Superintelligence 2014.
- **Bai** (Yuntao) et al. — Constitutional AI 2022.
- **Yao** (Shunyu) et al. — ReAct 2022 + Tree-of-Thoughts 2023.
- **Olah** (Christopher) — Anthropic Circuits 2020- (interpretability, linhagem Anthropic).
- **Anthropic MCP** (25/nov/2024) — Model Context Protocol spec.
- **Framework do Liceu** — `Liceu/frameworks/arquitetura-de-agents-kolden/` (framework.md + procedencia.md), Fase 1 do Contrato `m-20260704`, produzido pelo próprio Liceu-chief da Kolden.

---

## §12 — Notas de versão + roadmap

### v1.2 — 2026-07-09 (esta versão)

**Emenda ratificada pela Onda 4 do Método (Grupo B Governance — Olimpo padronizado).** Duas canonizações:

- **E4 — distinção 3-way MEMORY canonizada em §5:** 2ª confirmação empírica satisfeita (Prometeu Sub-onda 3.2 + Olimpo Onda 4). Regra canônica: squad-level (`<Squad>/MEMORY.md`) × agent-chief-level (`<Squad>/agent-memory/<chief>.md`) × agent-especialista-level (`<Squad>/agent-memory/<especialista>.md`); memória vendor canônica é 4º artefato INTOCÁVEL (fronteira E1). Ver §5.
- **NOTA §3 — Camada 3-4 combinada como caso especial documentado:** Olimpo é o único squad Kolden que reúne Camada 3 (decompõe + roteia) e Camada 4 (traduz na disciplina) dentro do mesmo squad. Registrado em §3 como caso especial; promoção a categoria estrutural própria condicionada a 2ª ocorrência futura.

**Score Onda 4:** 8/8 VERDE, delta absoluto +7 pontos (1/8 baseline → 8/8), empatado com Hermes Onda 2 (2º maior delta após Salgueiro +8). Padrão E1 INVÓLUCRO sobre MUTAÇÃO na **5ª aplicação empírica** (Hermes + Prometeu 3× + Olimpo). Regra E6 co-existência de vetos na 2ª aplicação (Prometeu 3.1 + Olimpo). Grupo A meta-squads COMPLETO; Grupo B Governance INICIADO. Próxima Onda: Dike (nascimento como agent-funcional — fecha o padrão Dike temporário confirmado 10x). Sem commit até ordem explícita.

### Onda 5 — 2026-07-13 (Dike instanciado como agent-funcional)

**Grupo B Governance — Dike nasce como agente.** Lavrados 7 artefatos em `Dike/` (agent-def `dike-chief` + persona + `constitution.md` 12 artigos + `squad.yaml` SOLO nativo + README + `_origem` + `agent-memory/dike-chief`), todos derivados 1:1 do PRD v2.0. **Natureza: agente SOLO nativo** (1ª ocorrência de padronização de agente não-vendorizado por nascimento — distinto do envelopamento vendor de Hermes/Prometeu/Olimpo). **Score:** 6/8 VERDE + 2 AMARELO (C4/C6 — testes nomeados OS-1/AB-3 pendentes no `Dike/roteiro-de-teste.md`; comportamento coberto por reflexos + constituição + modos de falha). **Veredito: `sobe-com-ressalvas`.** Fecha o §9 (papel Dike não mais temporário). **Divergência declarada:** G7 dispensado por ordem explícita do Ronan (Onda rodou em sessão-raiz). Próxima Onda: **Themis (Onda 6, Grupo B)**. Detalhes em `Dike/registros/metodo-onda-5/`. Sem commit até ordem explícita.

### Onda 6 — 2026-07-13 (Themis padronizado — conselho consultivo)

**Grupo B Governance — Themis (vendorizado advisory-board) padronizado por envelopamento.** 9 artefatos Kolden CRIADOS + 1 APPEND no `squad.yaml`, sobre o vendor xquads-squads **preservado byte-idêntico** — padrão **INVÓLUCRO sobre MUTAÇÃO na 6ª aplicação** (Hermes + Prometeu 3× + Olimpo + Themis). **ASL 2** (aconselha, o fundador decide — 1ª ocorrência ASL-2 num squad de governança; distinto do Olimpo ASL-3). **Score: 8/8 VERDE, veredito `sobe`** — o roteiro nasceu com **OS-1 + AB-3 nomeados**, fechando a ressalva C4/C6 que ficou amarela no Dike (aprendizado da Onda 5 aplicado imediatamente; candidato a promoção: "roteiro-de-teste nasce com OS-1+AB-3"). **Grupo B Governance COMPLETO** (Olimpo + Dike + Themis). **Divergência declarada:** G7 dispensado 2ª vez por ordem do Ronan — Ondas 5 e 6 na mesma sessão. Próxima Onda: **Grupo C (Onda 7 = Aletheia)**. Detalhes em `Themis/registros/metodo-onda-6/`. Sem commit até ordem explícita.

<!-- ratificado pela Onda 4 do Método (m-20260706, 2026-07-09) -->

### v1.1 — 2026-07-09

**Emenda ratificada pela Onda 3 do Método** — 6 padrões canônicos promovidos das Sub-ondas 3.1+3.2+3.3 do Prometeu (Grupo A meta-squads completo: Hermes + Prometeu padronizados).

<!-- ratificado pela Onda 3 do Método (m-20260706, 2026-07-09) -->

**E1 — Squad vendorizado como cláusula canônica §5 (modelos) ou §8 (rito):**
Segunda ocorrência empírica confirmada (Hermes/Nous Onda 2 + Prometeu/SynkraAI Onda 3). Padrão canônico: **INVÓLUCRO sobre MUTAÇÃO DE CÓDIGO** — 4x confirmado. Vendor completo preservado intocado; camada Kolden PT-BR externa (CLAUDE.md + PRD + constitution + squad.yaml + MEMORY.md + ferramentas.md + roteiro-de-teste.md + `<squad>-chief.md`) declara fronteira em 5+ pontos. Procedência: Sub-ondas Hermes Onda 2 + Prometeu 3.1+3.2+3.3.

**E2 — Framework interno cross-squad como categoria constitucional própria:**
Um squad pode ser consumido por outros ≥5 squads Kolden via skills públicas (Prometeu com 5 públicas + 25 consumidores identificados). Categoria constitucional emergente identificada Sub-onda 3.1, confirmada 3.3. Procedência: Sub-ondas 3.1 + 3.3.

**E3 — Skills-como-tools cross-squad no §5 (modelos) ou §7 (5 buckets):**
Categoria constitucional emergente canonizada. Skills públicas viram tools cross-squad (READ-ONLY + nota BREAKING quando modificadas). Regra dura: mudança em skill pública impacta N squads consumidores → BLOCK sem confirmação por-squad. Procedência: Sub-ondas 3.1 + 3.3.

**E5 — Convenção `@` dupla como padrão canônico para squad vendorizado com framework interno:**
`@Squad` externo (dispatch cross-squad Camada 5) × `@aiox-agent`/`@nous-agent` interno (ativação especializada dentro da sessão do squad) como camadas semanticamente distintas — não conflitam. Declaradas em CLAUDE.md do squad. Procedência: Sub-ondas 3.1 + 3.2.

**E6 — Constituição dupla co-existente com regra de precedência "Kolden Art. X prevalece em conflito":**
AIOX Constitution (engenharia — 6 artigos) + Kolden Art. X (agent-safety — 15 VO) co-existentes. Em conflito, Kolden Art. X prevalece por ser norma canônica externa. Procedência: Sub-onda 3.1.

**E7 — Refactor por arquivamento como categoria canônica §9 rito:**
2ª ocorrência confirmada (Hermes/agent-memory/backups Onda 2 + Prometeu 3.2 `_archive-pre-kolden/`). Padrão para MEMORY espúrios / duplicados / snapshots: ARQUIVAR ≥ DELETE ≥ MERGE. Rastreabilidade + zero perda. Procedência: Sub-onda 3.2.

**Emenda promovida (2ª confirmação empírica satisfeita — CANONIZADA em v1.2):**
- **E4 distinção 3-way MEMORY** — canonizada em §5 pela Onda 4 do Método. 1ª ocorrência: Prometeu Sub-onda 3.2 (Prometeu/MEMORY.md squad-level × Prometeu/agent-memory/<chief>.md × `.aiox-core/development/agents/<id>/MEMORY.md` canônico AIOX INTOCADO). 2ª ocorrência: Olimpo Onda 4 (`Olimpo/MEMORY.md` squad-level × `Olimpo/agent-memory/olimpo.md` chief-level × `Olimpo/agent-memory/{afrodite,plutos,...}.md` especialista-level). Regra canônica em §5 "Regra E4 — distinção 3-way MEMORY". Registro: `Olimpo/registros/metodo-onda-4/`.

### v1.0 — 2026-07-06 (versão base)

- Publicação canônica do Método consolidando as sub-ondas 1.1-1.5 (Contrato-mãe `m-20260706`).
- 12 seções mapeadas + procedência 1:1 com framework do Liceu Fase 1.
- Constituição Caos v2.5.0 (Arts. I-X) alinhada.
- Skills `/metodo` e `/padronizar` publicadas em `C:\Kolden\.claude\skills\`.
- CAOS-CL-002 promovido de draft para checklist canônico.
- 5 predições Kolden 2026-2027 publicadas.

### Divergências ativas (a resolver via emendas ao framework do Liceu — Onda 6 do Método)

1. **G5 interpretabilidade como critério nomeado** — framework Liceu Fase 1 não lista interpretabilidade nos 8 critérios canônicos (tem #5 = Orthogonality e #6 = Instrumental separados). Emenda proposta: interpretabilidade como C5 nomeado + Orthogonality+Instrumental consolidados em C6. Procedência: Amodei-Olah 2016 arXiv 1606.06565 + linhagem Anthropic Circuits (Olah 2020-). Ver `Caos/registros/metodo-onda-1/1.6-metodo-kolden/emendas-liceu.md`.

2. **Categoria "adapter de runtime bidirecional em tempo real" no Art. IV** — MCP spec 2024 (JSON-RPC 2.0 request-response) não modela event streams bidirecionais em tempo real. Os 5 adapters do Hermes (Discord Gateway/Slack Socket Mode/Telegram polling/WhatsApp Meta webhooks/Google Chat Pub/Sub) formam categoria constitucional própria. Emenda proposta: reconhecer categoria + preservar dupla-vida até MCP spec 2025-2026 (`streamable-http-transport`) maturar. Ver `emendas-liceu.md`.

### Roadmap curto (após v1.0)

- **Onda 2** (recomendação técnica desta Sub-onda 1.6) — **Grupo A: Hermes** (runtime multi-plataforma; alvo natural do próximo dogfooding pois Hermes é a Camada 2 e todo Contrato de Missão passa por ele; 15/22 wrappers da Sub-onda 1.3 vivem em Hermes; padronização destrava as substituições MCP Grupo A da KLD-PRED-2026-001). Alternativa: **Prometeu** (mesma tier de meta-squad, framework AIOX, seria o 2º piloto se Hermes for adiado por complexidade de runtime).
- **Ondas 3-26** — sequência sugerida em §8 (Grupos A-G).
- **Fase 3 residual** (após 26 Ondas): implementação real de MCP + dashboard populado + integração Hermes runtime — Contrato próprio a lavrar (`m-2026MMDD-implementacao-mcp-e-dashboard`).

### Cadência de revisão

- **Anual** — revisão substantiva em 2027-01-01 (recalibração das 5 predições + emendas Liceu ratificadas).
- **Trimestral** — auditoria das predições KLD-PRED-2026-001 e KLD-PRED-2026-004 (janela crítica de migração MCP + Ondas 2-26).
- **Ad hoc** — versão minor bump a cada aprendizado canônico das Ondas 2-26 (Passo 9 do rito §8).

### Handoff para Onda 2

O `caos-chief` recomenda **Hermes como Onda 2** com 3 razões: (a) Hermes é a Camada 2 do sistema (§3) — padronizá-lo destrava toda subida via Contrato de Missão; (b) 15 dos 22 wrappers proprietários inventariados na Sub-onda 1.3 vivem em Hermes — a padronização é caminho crítico para as substituições MCP Grupo A da KLD-PRED-2026-001; (c) Hermes tem `AGENTS.md` próprio (é projeto vendorizado Nous Research) — a padronização inclui alinhar sua doc externa com a norma Kolden. Alternativa: Prometeu se o volume de refactor do Hermes exigir sessão dedicada mais longa.

---

*Método Kolden v1.0 — norma canônica de arquitetura de agents. Publicado em 2026-07-06 pela Sub-onda 1.6 do Contrato-mãe `m-20260706-metodo-kolden`. Dogfooding validado: Caos passa 8/8 gates (baseline pré-Fase 2: 0/8 — delta +100 pontos). Divergências declaradas: G5 interpretabilidade + categoria runtime bidirecional (emendas propostas ao framework do Liceu). Próxima onda: Hermes (Grupo A). Sem commit até ordem explícita.*

*Método Kolden v1.1 — norma canônica ampliada com 6 padrões da Onda 3 do Prometeu. Ratificado em 2026-07-09 pela Sub-onda 3.3. Emendas E1/E2/E3/E5/E6/E7 canonizadas (≥2x confirmação empírica). E4 diferida (aguarda 2ª ocorrência Onda 4 Olimpo). Grupo A meta-squads Hermes+Prometeu COMPLETO. Score Onda 3 total: 8/8 VERDE, delta absoluto +6 pontos (2/8 → 8/8). Padrão canônico "INVÓLUCRO sobre MUTAÇÃO DE CÓDIGO" 4x confirmado. Próxima Onda: Olimpo (Grupo B Governance). Sem commit até ordem explícita.*

*Método Kolden v1.2 — norma canônica ampliada pela Onda 4 do Olimpo (Grupo B Governance iniciado). Ratificado em 2026-07-09 pela Onda 4. E4 distinção 3-way MEMORY CANONIZADA em §5 (2ª confirmação: Prometeu 3.2 + Olimpo 4). NOTA §3 sobre Camada 3-4 combinada como caso especial (Olimpo único ocorrente). Score Onda 4: 8/8 VERDE, delta +7 pontos. Padrão "INVÓLUCRO sobre MUTAÇÃO" na 5ª aplicação; E6 co-existência de vetos na 2ª. Próxima Onda: Dike (nascimento como agent-funcional). Sem commit até ordem explícita.*
