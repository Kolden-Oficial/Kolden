# 01 — Reconciliação de contagem da frota

> Passo 0 do protocolo. Bloqueante. Tudo abaixo verificado **arquivo-a-arquivo** via Glob, com paths absolutos.
> Convenção: o "declarado" é o `CLAUDE.md §10` + `AGENTS.md`; o "real" vem do filesystem.

## Resumo executivo da contagem

| Linha de base | Total |
|---|---|
| Protocolo do Ronan (v2 calibrado) afirma | **247** |
| CLAUDE.md §10 declara | **246** |
| Chão real **sem** sub-squad `Caliope/copy-master/` | **246** ✅ |
| Chão real **com** sub-squad `Caliope/copy-master/` (33 ag.) | **279** ⚠️ |

**Conclusão**: a fórmula `246 = 225 + 12 + 9` do CLAUDE.md fecha **apenas se ignorarmos** o sub-squad `copy-master` que vive dentro de Caliope. Esse sub-squad existe no filesystem com `squad.yaml`, `config.yaml`, `agents/` e 33 agentes próprios — é um **squad oculto**.

## Tabela arquivo-a-arquivo (29 squads + sub-squad)

| Bloco | Squad | CLAUDE.md | Real (chão) | Δ | Manifesto |
|---|---|---:|---:|---:|---|
| **Marketing & Criação** | Pheme | 9 | 9 | 0 | `Pheme/squad.yaml` |
| | Peitho | 16 | 16 | 0 | `Peitho/squad.yaml` |
| | Caliope | 23 | 23 | 0 | `Caliope/squad.yaml` |
| | ↳ `Caliope/copy-master/` | — | **33** | **+33** ⚠️ | `Caliope/copy-master/squad.yaml` (v2.0.0) |
| | Aglaia | 15 | 15 | 0 | `Aglaia/squad.yaml` |
| | Harmonia | 8 | 8 | 0 | `Harmonia/squad.yaml` |
| | Orfeu | 12 | 12 | 0 | `Orfeu/squad.yaml` |
| | Ariadne | 8 | 8 | 0 | `Ariadne/squad.yaml` |
| **Estratégia & Negócios** | Aletheia | 8 | 8 | 0 | `Aletheia/squad.yaml` |
| | Argos | 15 | 15 | 0 | `Argos/squad.yaml` |
| | Liceu | 9 | 9 | 0 | `Liceu/squad.yaml` |
| | Olimpo | 8 | 8 | 0 | `Olimpo/squad.yaml` |
| | Themis | 11 | 11 | 0 | `Themis/squad.yaml` |
| | Metis | 7 | 7 | 0 | `Metis/squad.yaml` |
| | Pluto | 16 | 16 | 0 | `Pluto/squad.yaml` |
| | Dionisio | 7 | 7 | 0 | `Dionisio/squad.yaml` |
| **Engenharia & Segurança** | Dedalo | 8 | 8 | 0 | `Dedalo/config.yaml` (exceção estrutural) |
| | Egide | 15 | 15 | 0 | `Egide/squad.yaml` |
| **Squads-semente (2026-06-28)** | Nomos | 5 | 5 | 0 | `Nomos/squad.yaml` |
| | Pactolo | 5 | 5 | 0 | `Pactolo/squad.yaml` |
| | Êmporos | 5 | 5 | 0 | `Emporos/squad.yaml` |
| | Héstia | 5 | 5 | 0 | `Hestia/squad.yaml` |
| | Ananke | 5 | 5 | 0 | `Ananke/squad.yaml` |
| | Cairós | 5 | 5 | 0 | `Cairos/squad.yaml` |
| **Framework** | Prometeu | 12 | 12 | 0 | `Prometeu/.aiox-core/development/agents/*.md` |
| **Fábrica** | Caos | 9 | 9 | 0 | `Caos/.claude/agents/*.md` |
| **Verificador** | Dike | 0 | 0 | 0 | sem `agents/` — papel, não squad |
| **Runtime** | Hermes | 0 | 0 | 0 | runtime Nous, sem agentes nativos |

**Totais:**
- Soma declarada (CLAUDE.md): 195 (clássicos) + 30 (semente) + 12 (Prometeu) + 9 (Caos) = **246**
- Soma real **sem** copy-master: **246** ✅
- Soma real **com** copy-master: 246 + 33 = **279**

## Detalhe do roster de Prometeu (12 arquivos)
`aiox-master.md`, `analyst.md`, `architect.md`, `data-engineer.md`, `dev.md`, `devops.md`, `pm.md`, `po.md`, `qa.md`, `sm.md`, `squad-creator.md`, `ux-design-expert.md` — confere com declaração. As subpastas com `MEMORY.md` não foram contadas (não são agentes; são memória).

## Detalhe do roster de Caos (9 arquivos)
`arquiteto.md`, `auditor-de-seguranca.md`, `curador.md`, `diagnosticador.md`, `pesquisador.md`, `redator-de-prompts.md`, `revisor.md`, `testador.md`, `vigia.md` — confere.

## Detalhe de `Caliope/copy-master/` (33 arquivos)
Lista declarada em `Caliope/copy-master/squad.yaml` linhas 33-72:
- **Tier 0** (1): `copy-master-chief.md`
- **Tier 1A — Direct Response Legends** (9): gary-halbert, eugene-schwartz, claude-hopkins, gary-bencivenga, robert-collier, john-carlton, jim-rutz, john-caples, rosser-reeves
- **Tier 1B — Modern Copy & Funnels** (9): dan-kennedy, frank-kern, russell-brunson, todd-brown, stefan-georgi, jon-benson, ry-schwartz, sabri-suby, evaldo-albuquerque
- **Tier 1C — Email & Relationship Copy** (3): ben-settle, andre-chaperon, dan-koe
- **Tier 1D — Offers & Sales Pages** (7): joe-sugarman, david-ogilvy, clayton-makepeace, parris-lampropoulos, david-deutsch, alex-hormozi, joanna-wiebe
- **Tier 1E — Persuasion & Psychology** (4): robert-cialdini, blair-warren, chris-voss, oren-klaff

Verificado: 33 arquivos `.md` em `Caliope/copy-master/agents/` via Glob — manifesto bate com filesystem.

## Achados de contagem (entram no `achados.jsonl`)

- **K-001 (MÉDIO, dados)** — Divergência declarativa: protocolo do Ronan diz 247; CLAUDE.md §10 diz 246. Origem provável: Dike (sem agentes próprios) contada em uma fonte e não na outra. Evidência: `C:\Kolden\CLAUDE.md:185` ("246 agentes... A Dike (verificador) é um papel sem arquivo de agente próprio... fora da contagem").
- **K-002 (MÉDIO, dados)** — Sub-squad **`Caliope/copy-master/`** com 33 agentes, `squad.yaml v2.0.0` próprio, `entry_agent: copy-master-chief`, **não declarado** no CLAUDE.md §10 nem no AGENTS.md. Squad oculto. Evidência: `C:\Kolden\Caliope\copy-master\squad.yaml:1-101`. Origem provável: importação do `xquads-squads\copy-master` (citado em MEMORY do Ronan) absorvido na Caliope sem atualizar o índice.
- **K-003 (BAIXO, dados)** — `AGENTS.md` resumo geral declara `Ariadne +18 skills` mas a seção detalhada lista `Ariadne (+7)` — Δ = 11 skills. (Conferência adiada para o Passo 6, padrões sistêmicos.)

## Veredito do passo

- Fórmula `246 = 195 + 30 + 12 + 9` **fecha matematicamente** sem o copy-master.
- A frota real, incluindo o sub-squad oculto, soma **279**.
- Para o resto da auditoria, adotamos **279 como linha de base de cobertura** (todo agente real precisa ser auditado), mas mantemos **246 como linha de base declarada** para reconciliação com o índice.
- O lote 6 (Pheme+Peitho+Caliope) absorve **Caliope/copy-master** como sub-lote dedicado: +33 agentes a auditar.
