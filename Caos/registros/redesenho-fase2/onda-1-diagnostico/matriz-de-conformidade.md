---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/redesenho-fase2/onda-1-diagnostico/sumario-executivo|sumario-executivo]]"
---

# Matriz de Conformidade — Caos × Framework arquitetura-de-agents-kolden

> **Missão:** m-20260705-redesenho-arquitetural-fase2
> **Onda:** 1 — Diagnóstico READ-ONLY
> **Executor:** hermes (reparou execução após caos-chief falhar em gravar artefatos; ver `log_de_decisao` do Contrato)
> **Data:** 2026-07-05
> **Norma:** `Liceu/frameworks/arquitetura-de-agents-kolden/framework.md` (Partes I, II, III) + `procedencia.md`
> **Método:** fan-out de 3 subagentes Explore (A=core×princípios, B=modelos×critérios, C=ritual+camadas+MCP), consolidação em matriz + achados.
> **Regra:** SILENCIOSO quando não há trecho-âncora factual; DIVERGE quando há campo relacionado mas divergente; IMPLEMENTA quando já cobre com precisão.

---

## Parte I — 12 Princípios Canônicos × Core Caos (5 arquivos)

Arquivos: `CLAUDE.md` (CC), `constituicao.md` (CT), `glossario.md` (GL), `leia-me.md` (LM), `nucleo/ARQUITETURA.md` (AR).

| # | Princípio (fonte) | CC | CT | GL | LM | AR | Score |
|---|---|---|---|---|---|---|---|
| 1 | Universalidade Turingiana (Turing 1936, 1950) | I | I | S | S | I | 3/5 |
| 2 | Sociedade de Mentes (Minsky 1986) | I | I | I | I | I | 5/5 |
| 3 | Bounded Rationality (Simon 1955) | D | S | S | S | S | 0/5 |
| 4 | Software 2.0 (Karpathy 2017) | I | I | I | I | I | 5/5 |
| 5 | Assistance Games — incerteza (Russell 2016, 2019) | D | S | S | S | S | 0/5 |
| 6 | Orthogonality + Instrumental Convergence (Bostrom 2012) | I | I | I | I | I | 5/5 |
| 7 | Embodied Grounding (Brooks 1991) | S | I | S | S | I | 2/5 |
| 8 | Constitutional AI (Amodei 2022) | I | I | I | S | D | 3/5 |
| 9 | Race-to-the-Top em Safety (Amodei 2021) | I | I | S | I | I | 4/5 |
| 10 | ReAct como Agent-Loop Padrão (Yao et al. 2022) | I | S | S | S | I | 2/5 |
| 11 | State Machine + HITL (LangGraph + Russell) | I | I | I | I | I | 5/5 |
| 12 | MCP como Camada Universal (Anthropic 2024) | I | D | S | S | I | 2/5 |

**Legenda:** I = IMPLEMENTA, D = DIVERGE, S = SILENCIOSO.
**Score Core:** 36/60 = **60%** de conformidade nominal (contando I=1, D=0.5, S=0).

### Trechos-âncora dos IMPLEMENTA por princípio (Core)

- **P1 IMPLEMENTA CC:** "modelo-agnostico" §Stack de referência; **CT:** Artigo V "funciona em Claude, GPT, Gemini, DeepSeek..."; **AR:** "model-agnostic (via OpenRouter)" + `roteamento_modelos.yaml` com alternativas.
- **P2 IMPLEMENTA (todos):** CC §Ritual de Criação (8+ especialistas), CT §Fase 5.1-5.2 (tier 0 + tier 1), GL "Especialistas — agentes com contexto isolado em `.claude/agents/`", LM "cada agente nasce como pasta irmã do Caos", AR "Roster (4 grupos)".
- **P4 IMPLEMENTA (todos):** CC §PRD como fonte da verdade, CT Artigo I "PRD é fonte da verdade", GL "PRD de IA — documento de requisitos formal", LM "Mude o PRD primeiro", AR "modelos/prd-de-ia.md" + skill `geracao-de-prd`.
- **P6 IMPLEMENTA (todos):** CC gates 4/7/BLOCK + Egide; CT gates Fase 6 BLOCK + Artigo VIII SAFE/QUARENTENA/REJEITAR; GL "Gate — verificação obrigatória"; LM "Reflexos são lei"; AR `middleware.py` bloqueia `rm -rf`, `git push --force`, leitura de `.env`.
- **P8 IMPLEMENTA CC/CT/GL:** 7 Artigos "NÃO-NEGOCIÁVEIS" + "constituicao.md camada acima de CLAUDE.md"; **AR DIVERGE:** design model-agnostic não menciona RLAIF/self-critique como camada de safety pré-output.
- **P11 IMPLEMENTA (todos):** Art. III "Aprovação antes da construção", gates Fase 4 e 7 hard, maturity ≥7.0, `ritual.py` gates 4 e 7 como paradas obrigatórias.

### Trechos-âncora dos DIVERGE/SILENCIOSO críticos

- **P3 CC DIVERGE:** KPIs do Caos medem sucesso de criação (maturity, ritual, reuso) mas **nenhum agent criado declara `aspiration_criteria`**. Simon 1955 é ignorado no template.
- **P5 CC DIVERGE:** nenhum CLAUDE.md padrão inclui "uncertainty statement" sobre objetivos; template do agente não tem incerteza declarada.
- **P7 CC SILENCIOSO:** stack de referência lista tools, mas Caos não exige `grounding_required: true` por fato datável.
- **P12 CT DIVERGE:** Artigo IV cita "toda ferramenta em `ferramentas.md`" mas **não obriga MCP como padrão universal**; permite wrappers proprietários.

---

## Parte II — 8 Critérios Canônicos × 12 Modelos Caos

Modelos: `cartao-de-identidade` (CI), `perfil` (PE), `prd-de-ia` (PRD), `system-prompt-base` (SPB), `orquestrador-base` (OB), `especialista-historico` (EH), `checklist-de-qualidade` (CQ), `roteiro-de-teste` (RT), `ferramentas` (FE), `convencao-de-cli-e-tooling` (CLI), `guia-infisical` (GI), `instalacao` (IN).

| # | Critério (fonte) | CI | PE | PRD | SPB | OB | EH | CQ | RT | FE | CLI | GI | IN | Score |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Constitutional principles declarados (Amodei 2022) | S | S | D | D | S | S | I | S | S | S | S | S | 1/12 |
| 2 | ASL declarado (Amodei RSP 2023) | S | S | S | D | S | S | D | S | S | I | S | S | 1/12 |
| 3 | Assistance game — incerteza (Russell 2016, 2019) | S | S | D | I | I | S | S | D | S | S | S | S | 2/12 |
| 4 | Off-switch — corrigibility (Russell 2017) | S | S | S | D | S | S | I | D | S | I | S | S | 2/12 |
| 5 | Orthogonality check (Bostrom 2012) | S | S | D | S | S | S | S | S | S | S | S | S | 0/12 |
| 6 | Instrumental convergence check (Bostrom 2012) | S | S | S | S | S | S | S | S | D | S | S | S | 0/12 |
| 7 | Embodied grounding para fatos (Brooks 1991) | S | S | S | S | S | S | I | I | I | I | I | D | 5/12 |
| 8 | Predictions Scorecard (Brooks 2018-2026) | S | S | D | S | S | S | S | S | S | S | S | S | 0/12 |

**Score Modelos:** 11/96 = **11%** de conformidade nominal. **Gap sistêmico grave.**

### Trechos-âncora dos IMPLEMENTA por critério (Modelos)

- **C1 IMPLEMENTA CQ:** linha 35 "Constituição e governança — compliance com os 7 artigos da Constituição".
- **C2 IMPLEMENTA CLI:** linha 2 "--dry-run obrigatório" + linha 14 "equivalente de tooling ao gate de aprovação humana" = ASL-like control (leitura-preview antes de execute).
- **C3 IMPLEMENTA SPB:** linha 19-22 padrão para pedidos ambíguos ("Quando <situação>, você <comportamento>"); **OB:** linha 17-18 "diagnostica a intenção quando ambíguo".
- **C4 IMPLEMENTA CQ:** linha 50 "checkpoint `veto` que interrompe (HALT) em falha de gate"; **CLI:** dry-run como user-abort-before-execute.
- **C7 IMPLEMENTA CQ:** linha 125-127 verificação de que tools existem e são alcançáveis; **RT:** linha 76-80 "FR-1 testa se ferramenta é alcançável"; **FE:** linha 100-106 "toda ferramenta citada no prompt existe aqui" (enforcement); **CLI:** JSON + dry-run; **GI:** gates para credenciais.

### Trechos-âncora dos DIVERGE críticos

- **C1 PRD DIVERGE §8:** "Proibições absolutas" é lista de restrições, **não constituição Amodei** (5-15 princípios veto-operacionais).
- **C1 SPB DIVERGE:** §"Restrições" é imperativo, não constitucional.
- **C2 SPB DIVERGE:** linha 42 "Escale para um humano quando <critério>" = escalação genérica, sem níveis ASL-1/2/3/4+.
- **C4 SPB DIVERGE:** escalação genérica sem `interrupt_before` pattern.
- **C5 PRD DIVERGE §10:** "Modos de falha" é anti-falha, sem separação explícita "aumento capabilities → aumento risco".
- **C8 PRD DIVERGE:** KPIs genéricos, sem predictions falsificáveis nem revisão anual.

---

## Parte III — Ritual de 9 Fases × 8 Gates Canônicos

Ritual atual (Caos v3.3.0): Fase 0 (Consulta ao Registro) → 1 (Diagnóstico) → 2 (Pesquisa) → 3 (Arquitetura) → 4 (PRD) → 5 (Construção cascata 5.0-5.6) → 6 (Revisão) → 7 (Teste) → 8 (Entrega + Registro).

| Fase | Gates canônicos existentes (implícitos) | Gates canônicos ausentes |
|---|---|---|
| 0 | REUSE > ADAPT > CREATE (não é gate canônico, mas afim ao Princípio 1) | ASL mínimo pré-fase |
| 1 | Incerteza (7 rodadas por faculdade), Corrigibility (exploração de falhas) | **Constituição declarada**, Interpretabilidade, **Predictions Scorecard** |
| 2 | Embodied grounding (busca ao vivo) | ASL em contexto de pesquisa |
| 3 | Orthogonality (5 camadas separam capacidade de valor) | Instrumental convergence check |
| 4 | **Constituição** (Art. III gate hard) | Predictions Scorecard (se agente prediz) |
| 5 | Segurança multi-camada (5.0→5.6 com gates N0→N6), HITL | **Off-switch / Corrigibility explícito** (interrupt_before) em 5.5 |
| 6 | Constitutional audit + Segurança estática | Predictions audit |
| 7 | Predictions test parcial, Maturity ≥7.0 | Orthogonality red-team explícito |
| 8 | Rastreabilidade + Padrões aprendidos | **Safety scorecard público** (Amodei RSP-style) |

**Score Ritual:** 5 gates cobertos implicitamente / 8 canônicos = **62%**. 3 gates críticos silenciosos: **ASL, Predictions Scorecard, Off-switch/interrupt_before**.

---

## Parte IV — 5 Camadas: Caos × Framework Canônico

| # | Camada canônica (framework Parte II) | Camada Caos atual (nucleo/ARQUITETURA.md) | Alinhamento | Nota |
|---|---|---|---|---|
| 1 | LLM Provider (Claude/GPT/Gemini/DeepSeek/open-weights + MCP servers) | Claude Code (hoje); OpenRouter (roadmap v4.0); "sem código ainda" | **Parcial/Roadmap** | Intencionalidade clara; instanciação incompleta. MCP consumo não documentado. |
| 2 | Agent Individual (ReAct loop + KoldenAgent base class + Thought→Action→Observation + ASL) | Ritual Fase 5 especialista + Fase 1 diagnóstico; `orquestrador.py` (esboço) implementa loop ReAct em pseudocódigo | **Parcial/Implícito** | ReAct implementado em `orquestrador.py`, mas **não nomeado nos modelos**; ASL não declarado por agente. |
| 3 | Squad Especializado (crew + role/goal/backstory + constitution + State + checkpoints + HITL) | Ritual Fase 5 (tiers 0+1), `squad.yaml`, `MEMORY.md` | **Correspondência direta** | `squad.yaml` ≈ manifesto; `MEMORY.md` ≈ state+checkpoints; constitution via `constituicao.md` global. ✓ |
| 4 | Orquestração Squads (Hermes roteamento + Zeus/Atena/Apolo + Sequential/Hierarchical/Supervisor) | Ritual Fase 5.1 orquestrador + Fase 3 arquitetura (solo vs squad) | **Parcial** | Roteamento via diagnóstico + arquitetura; Hermes/Olimpo não nomeados no Ritual; padrão de orquestração é implícito (PRD §11 topologia). |
| 5 | Governance / Gate Humano (Olimpo + Dike + Ronan HITL + RSP safety levels) | Fase 4 PRD aprovação (Art. III), Fase 5.5 reflexos, Fase 7 maturity ≥7.0 | **Correspondência direta** | Ronan approval + HITL gate ≥7.0 hard. Dike não nomeado (mas função existe via checklist-de-qualidade). ✓ |

**Score Camadas:** 3 diretas + 2 parciais = **70%** de correspondência estrutural. **Gaps:** Camada 1 (instanciação MCP + runtime portável em roadmap) e Camada 2 (ReAct não nomeado nos modelos).

---

## Parte V — Camada 1 MCP em detalhe

**Wrappers proprietários encontrados no Caos núcleo:** ZERO ✓
- `Caos/.claude/skills/criacao-de-mcp/` é wrapper fino delegando ao `Prometeu/.claude/skills/mcp-builder` — **CLEAN**
- `Grep` mencionado como wrapper de ripgrep é invólucro CLI thin — **CLEAN**
- Referências em `registros/absorcao/*` documentam wrappers externos como alvo ADAPT, **não instanciados**

**MCP consumo:**
- Mencionado em Fase 5.4 como `criacao-de-mcp` (construção)
- **Consumo real:** `ferramentas.md` do Caos é template vazio; nenhum agente Caos lista MCP servers ligados
- **Achado:** MCP é intencionalidade (Princípio 12 reconhecido), não instanciação ainda

**Vendor-neutrality:** intencionalidade declarada (roadmap v4.0 = OpenRouter + Eden AI multi-LLM); implementação em progresso.

---

## Consolidação — Onde o Caos está + onde vai

**Pontos fortes (não mexer, celebrar):**
- Princípios 2, 4, 6, 11 = 100% implementados
- Governance (Fase 4 + 7 gates hard) = padrão-ouro
- Zero wrappers proprietários instanciados = MCP-compatible por default
- Framework de 5 camadas Caos ≈ 5 camadas canônicas em 3/5 diretas

**Gaps críticos (Ondas 2-5 vão preencher):**
1. **Aspiration criteria** (P3) — Simon 1955 ausente do PRD/modelos
2. **Uncertainty statement** (P5) — Russell 2019 ausente do template CLAUDE.md
3. **ASL declarado por agente** (C2) — Amodei 2023 RSP ausente do cartão-de-identidade/PRD
4. **Off-switch / interrupt_before explícito** (C4) — Russell 2017 apenas parcialmente via veto+dry-run
5. **Predictions Scorecard** (C8) — Brooks 2018-2026 totalmente silencioso
6. **Orthogonality + Instrumental red-team** (C5-6) — Bostrom 2012 totalmente silenciosos
7. **MCP mandatório** (P12) — Anthropic 2024 permitido mas não obrigatório em Art. IV
8. **ReAct nomeado nos modelos** (P10) — Yao et al. 2022 implementado no núcleo mas não documentado nos modelos

**Escopo residual sugerido para Fase 3** (implementação real, não desenho):
- Runtime Python portável do Caos (v4.0 roadmap)
- MCP servers ligados + dashboard interativo populado
- Integração com Hermes runtime para safety metrics em tempo real

---

## Diretriz para o Ronan (aprovação)

**Recomendação de escopo Fase 2** (baseado no diagnóstico):
- **Ondas 2-3 (identidade + ritual + núcleo + modelos)**: escopo cirúrgico focado nos 8 gaps críticos acima. NÃO reescrever tudo — remendo por remendo, com procedência.
- **Onda 4 (MCP)**: mapa de dependências é trivial (0 wrappers instanciados) — plano de MCP mandatório para agentes futuros; agentes existentes ficam como estão.
- **Onda 5 (dashboard + predictions)**: schema definido, população pendente para Fase 3.
- **Onda 6 (costura + smoke)**: fecha ciclo, smoke com criação de agente ASL-2.

**Estimativa:** Fase 2 pode ser executada em 4-5 sessões (Onda 2 e 3 combinadas se escopo cirúrgico; Onda 4 leve; Onda 5 é schema; Onda 6 fecha).

*Matriz produzida por hermes (subagentes Explore fan-out ≤3) na Onda 1 do Contrato `m-20260705`. Achados detalhados em `achados.jsonl`.*
