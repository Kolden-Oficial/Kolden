---
tipo: registro
area: kolden-os
up: "[[.claude/_MOC-kolden-os]]"
relacionado:
  - "[[.claude/registros/auditoria/2026-06-28-vistoria-v2/_indice|_indice]]"
---

# 03 — Lotes 3: Caos + Prometeu + Dedalo + Dike (papel)

> Fábrica + Framework + Engenharia + Verificador. **29 agentes** (9 + 12 + 8) + Dike sem agentes.

## Caos — Fábrica de Agentes (9 agentes)

### Estrutura
- **Raiz:** `C:\Kolden\Caos\` (projeto Claude Code independente).
- **Identidade:** `Caos/CLAUDE.md v3.3.0` (2026-06-22).
- **Constituição:** `Caos/constituicao.md` — 7 artigos invioláveis + Art. VIII (absorção).
- **Agentes:** `Caos/.claude/agents/{arquiteto, auditor-de-seguranca, curador, diagnosticador, pesquisador, redator-de-prompts, revisor, testador, vigia}.md` — **9 agentes confirmados**.
- **Skills:** `Caos/.claude/skills/` com 23+ habilidades (declarado em CLAUDE.md §10 Kolden).
- **Pipelines:**
  - **Ritual de Criação em 9 fases** (consulta-ao-registro → diagnóstico → pesquisa → arquitetura → PRD → construção cascata 5.0-5.6 → revisão → teste → entrega+registro).
  - **Pipeline de Absorção em 8 fases** (F0 histórico → F1 quarentena → F2 segurança BLOCK → F3 compreensão → F4 mapeamento → F5 plano BLOCK → F6 aplicação → F7 registro).

### Veredito por classe
| Classe | Status | Notas |
|---|---|---|
| A. Config | OK | 9 agentes confirmados; cada um tem definição YAML embutida (frontmatter `name`/`description`/`tools`) |
| B. Liveness | OK | Caos é fábrica — todo agente novo nasce alcançável; existência verificada do `revisor.md` (`Caos/.claude/agents/revisor.md:1-25`) |
| C. Hierarquia | OK | Tier 0 implícito (Caos como orquestrador) + tier 1 (9 especialistas). Sem ciclo. |
| D. Roteamento | OK | Roteamento é por **fase do Ritual** (Caos sabe qual especialista chamar em qual fase) |
| E. Contrato | OK | PRD aprovado é o contrato (Constituição Art. III); cada fase tem gate |
| F. Coerência | OK | Glossário centralizado (`glossario.md`); registro de entidades (`dados/registro-de-entidades.yaml`) é a fonte de verdade |
| G. Segurança | OK | Reflexo `bloqueio-de-quarentena.sh` impede execução em `_staging/quarentena/`; segredos via Infisical |

### Achado de Caos
- Caos é **bem documentado e robusto**. Único ponto de atenção: a Constituição do Caos vs a Constituição do AIOX (Prometeu) coexistem com escopos distintos — não há conflito, mas a fronteira precisa ser explícita (ver K-013).

---

## Prometeu — Framework AIOX Vendorizado (12 agentes)

### Estrutura
- **Raiz:** `C:\Kolden\Prometeu\` (framework AIOX `@aiox-squads/core`).
- **Identidade:** `Prometeu/.claude/CLAUDE.md` — distinta do Caos.
- **Constituição:** `Prometeu/.aiox-core/constitution.md` — independente da Constituição do Caos.
- **Agentes:** `Prometeu/.aiox-core/development/agents/*.md` — **12 confirmados**: aiox-master, analyst, architect, data-engineer, dev, devops, pm, po, qa, sm, squad-creator, ux-design-expert.
- **Camadas L1-L4:** L1 Framework Core (NEVER modify), L2 Templates (NEVER modify), L3 Project Config (Mutable), L4 Runtime (ALWAYS modify). Deny rules em `.claude/settings.json` (declarado, **não verificado existência neste passo**).
- **Workflows:** SDC, QA Loop, Spec Pipeline, Brownfield Discovery (descritos em `Prometeu/.claude/rules/workflow-execution.md`).
- **Regras detalhadas:** `Prometeu/.claude/rules/{agent-authority, agent-handoff, agent-memory-imports, coderabbit-integration, handoff-consolidation, ids-principles, mcp-usage, story-lifecycle, tool-examples, workflow-execution}.md` — 10 arquivos de regra.

### Veredito por classe
| Classe | Status | Notas |
|---|---|---|
| A. Config | OK | 12 agentes confirmados; `architect.md` exemplificado (`Prometeu/.aiox-core/development/agents/architect.md:1-30`) com bloco YAML completo |
| B. Liveness | OK | Cada agente tem `tools:` e dependências em `.aiox-core/development/{tasks,templates,checklists,data}` |
| C. Hierarquia | OK | Tier orquestrador implícito (`aiox-master`) + 11 especialistas funcionais |
| D. Roteamento | OK | `@devops` autoridade EXCLUSIVA para push/PR/MCP — registrado em `agent-authority.md` |
| E. Contrato | OK | Story-Driven Development com 4 workflows; handoffs estruturados (`agent-handoff.md`) |
| F. Coerência | OK | Tool registry centralizado (`.aiox-core/data/tool-registry.yaml`); MCP usage rules |
| G. Segurança | OK | Constituição Art. I-IV; deny rules para L1/L2 |

### Achados de Prometeu
- **K-013 (MÉDIO, contrato)**: 2 constituições coexistem na frota — Caos (criação de agente) + AIOX (desenvolvimento de software). Fronteira precisa ser declarada para evitar ambiguidade. Cada governa escopo diferente, mas o índice CLAUDE.md §10 ainda fala "constituição" sem qualificar.

---

## Dedalo — Engenharia Claude-Code (8 agentes, AIOX-legado)

### Estrutura
- **Raiz:** `C:\Kolden\Dedalo\` com **`config.yaml`** (não `squad.yaml`) — exceção EX-01 confirmada.
- **Manifesto:** `Dedalo/config.yaml` (`name: claude-code-mastery v1.0.0`).
- **Agentes** (`Dedalo/agents/*.md`, 8 confirmados):
  - **Tier 0:** claude-mastery-chief
  - **Tier 1 (Core Mastery):** hooks-architect, mcp-integrator, swarm-orchestrator, config-engineer
  - **Tier 2 (Strategic & Context):** skill-craftsman, project-integrator, roadmap-sentinel
- **Handoffs:** `Dedalo/config.yaml:135-165` declara `collaborates_with` e `escalates_to` entre os agentes (formato Kolden-native parcial!).

### Veredito por classe
| Classe | Status | Notas |
|---|---|---|
| A. Config | OK | `config.yaml:23-31` lista 8 agentes; bate com Glob |
| B. Liveness | OK | Grafo de handoffs interno conectado |
| C. Hierarquia | OK | Tier 0 + Tier 1 + Tier 2 explícitos |
| D. Roteamento | OK | `handoffs.claude-mastery-chief.routes_to` declara os 7 destinos |
| E. Contrato | **PARCIAL** | Sem `external_handoffs` para outros squads (K-009 aplicável); mas tem `quality_standards` em `cross_cutting` (`config.yaml:187-191`) — **único AIOX-legado que tem isso** |
| F. Coerência | OK | Cada agente tem `based_on: <persona>` declarada (ex.: hooks-architect baseado em disler) |
| G. Segurança | OK | Sem segredos |

### Anomalia interessante de Dedalo
Dedalo é o **ÚNICO squad AIOX-legado que tem `cross_cutting.aios_awareness` declarado** (`config.yaml:172-177`) e `cross_cutting.quality_standards.min_score: 7.0` — o que sugere uma **transição parcial entre AIOX-legado e Kolden-native** já em curso para esse squad. Padrão a propagar para os 10 outros AIOX-legado.

---

## Dike — Verificador da Subida (papel, 0 agentes)

### Estrutura
- **Raiz:** `C:\Kolden\Dike\` — papel, não squad.
- **Identidade:** `Dike/CLAUDE.md` (citado em `02-hipoteses.md`).
- **Reflexo determinístico:** `Dike/.claude/reflexos/gate-de-subida.sh` (referido em `Hermes/camada-2-contrato.md:74`).
- **Função:** reconciliação entrega × lacre; preenche seção `dike` do Contrato (`Olimpo/contratos/contrato-de-missao.schema.md:101-108`).
- **Sem `agents/`** — EX-06 confirmada.

### Veredito
- **Existe e funciona** (referenciado pelo Hermes; schema do Contrato tem seção `dike`).
- **Não conta na contagem** (0 agentes).
- **Achado**: nenhum específico de Dike — papel coerente com schema do Contrato.

---

## Achado novo

```json
{"id":"K-013","severidade":"MEDIO","classe":"contrato","titulo":"Duas constituições coexistem na frota — Caos/constituicao.md (criação de agente, 7 artigos) e Prometeu/.aiox-core/constitution.md (desenvolvimento de software, 6 artigos). Não há conflito de escopo mas a fronteira precisa ser declarada","evidencia":[{"arquivo":"Caos/CLAUDE.md","linha":1},{"arquivo":"Prometeu/.claude/CLAUDE.md","linha":11}],"hipotese_pai":null,"raio_de_explosao":"ambiguidade-de-jurisdicao","recomendacao_breve":"declarar em CLAUDE.md §10 a fronteira: Caos governa criação de agentes (incluindo absorção F2); Prometeu/AIOX governa ciclo de desenvolvimento de software de aplicação. Os dois NÃO se sobrepõem","status":"aberto"}
```
