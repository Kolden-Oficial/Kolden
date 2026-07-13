---
tipo: nota
area: operacao
up: "[[sobre-a-empresa/Kolden/operacao/_MOC-operacao]]"
---

# 🧭 Roadmap de padronização dos squads — Ondas 5-26

> Painel de controle da padronização da frota pelo Método. Auditoria de **2026-07-13**.
> Fonte do rito: [[METODO-KOLDEN]] §8/§12 · skill `/padronizar` · checklist Dike `CAOS-CL-002`.
> Este documento é um **painel** (não toca squads nem o Método — respeita G1). Atualizar a cada Onda concluída.

## Estado da frota (24 squads operacionais)

Medido contra o molde canônico **Olimpo** (13 artefatos). Caos/Hermes/Prometeu não entram (meta/vendorizados, já padronizados nas Ondas 1-3).

| Nível | Quantos | Squads |
|---|---|---|
| **Canônico puro (13/13)** | 1 | Olimpo |
| **Quase-lá (10-11/13)** | 4 | Liceu, Aletheia, Argos, Ariadne |
| **Meia-padronização (8)** | 1 | Peitho |
| **Importado-cru (5-7)** | 17 | Aglaia, Ananke, Cairos, Caliope, Dedalo, Dionisio, Egide, Emporos, Harmonia, Hestia, Metis, Nomos, Orfeu, Pactolo, Pheme, Pluto, Themis |
| **Meta-auditor especial** | (Dike) | conta à parte — nasce como agent na Onda 5 |

## Matriz de conformidade

✓ presente · ✗ ausente. Colunas = artefatos do molde Olimpo.

| Squad | README | _MOC | CLAUDE | constit | PRD | squad.yaml | MEMORY | agent-mem | agents | .claude | ferram | roteiro | onda | **/13** |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| Olimpo | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **13** |
| Liceu | ✓ | ✓ | ✓ | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | **11** |
| Aletheia | ✓ | ✓ | ✓ | ✗ | ✓ | ✓ | ✓ | ✗ | ✓ | ✓ | ✓ | ✓ | ✗ | **10** |
| Argos | ✓ | ✓ | ✓ | ✗ | ✓ | ✓ | ✓ | ✗ | ✓ | ✓ | ✓ | ✓ | ✗ | **10** |
| Ariadne | ✓ | ✓ | ✓ | ✗ | ✓ | ✓ | ✓ | ✗ | ✓ | ✓ | ✓ | ✓ | ✗ | **10** |
| Peitho | ✓ | ✓ | ✗ | ✗ | ✓ | ✓ | ✗ | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ | **8** |
| Aglaia | ✓ | ✓ | ✗ | ✗ | ✗ | ✓ | ✗ | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ | **7** |
| Caliope | ✓ | ✓ | ✗ | ✗ | ✗ | ✓ | ✗ | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ | **7** |
| Harmonia | ✓ | ✓ | ✗ | ✗ | ✗ | ✓ | ✗ | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ | **7** |
| Pheme | ✓ | ✓ | ✗ | ✗ | ✗ | ✓ | ✗ | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ | **7** |
| Pluto | ✓ | ✓ | ✗ | ✗ | ✗ | ✓ | ✗ | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ | **7** |
| Ananke | ✓ | ✓ | ✗ | ✗ | ✗ | ✓ | ✓ | ✗ | ✓ | ✓ | ✗ | ✗ | ✗ | **7** |
| Cairos | ✓ | ✓ | ✗ | ✗ | ✗ | ✓ | ✓ | ✗ | ✓ | ✓ | ✗ | ✗ | ✗ | **7** |
| Emporos | ✓ | ✓ | ✗ | ✗ | ✗ | ✓ | ✓ | ✗ | ✓ | ✓ | ✗ | ✗ | ✗ | **7** |
| Hestia | ✓ | ✓ | ✗ | ✗ | ✗ | ✓ | ✓ | ✗ | ✓ | ✓ | ✗ | ✗ | ✗ | **7** |
| Metis | ✓ | ✓ | ✗ | ✗ | ✗ | ✓ | ✓ | ✗ | ✓ | ✓ | ✗ | ✗ | ✗ | **7** |
| Nomos | ✓ | ✓ | ✗ | ✗ | ✗ | ✓ | ✓ | ✗ | ✓ | ✓ | ✗ | ✗ | ✗ | **7** |
| Pactolo | ✓ | ✓ | ✗ | ✗ | ✗ | ✓ | ✓ | ✗ | ✓ | ✓ | ✗ | ✗ | ✗ | **7** |
| Themis | ✓ | ✓ | ✗ | ✗ | ✗ | ✓ | ✓ | ✗ | ✓ | ✓ | ✗ | ✗ | ✗ | **7** |
| Dike | ✗ | ✓ | ✓ | ✗ | ✓ | ✗ | ✓ | ✗ | ✗ | ✓ | ✓ | ✓ | ✗ | **7** |
| Egide | ✓ | ✓ | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ | ✓ | ✓ | ✗ | ✗ | ✗ | **6** |
| Dedalo | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ | ✗ | ✗ | ✗ | **5** |
| Dionisio | ✓ | ✓ | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ | **5** |
| Orfeu | ✓ | ✓ | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ | **5** |

Dois fatos isolam o molde: **só Olimpo tem `constitution.md`** e **só Olimpo tem `registros/metodo-onda-N/`**.

## Ordem canônica das Ondas

Fonte: METODO §8 (Grupos A-G). Ordem revisável pelo Ronan a qualquer momento.

| Onda | Squad | Grupo | Situação |
|---|---|---|---|
| 1-4 | Caos, Hermes, Prometeu, Olimpo | A-B | ✅ concluídas |
| **5** | **Dike** | B | **próxima** — nasce como agent-funcional (hoje sem `agents/`, `squad.yaml`, README) |
| 6 | Themis | B | |
| 7-9 | Aletheia, Argos, Liceu | C | quick wins (ver abaixo) |
| 10-13 | Ananke, Cairos, Hestia, Pactolo | D | |
| 14-18 | Aglaia, Caliope, Harmonia, Orfeu, Pheme | E | |
| 19-24 | Ariadne, Dionisio, Emporos, Peitho, Pluto, Metis | F | |
| 25-26 | Egide, Dedalo, Nomos | G | |

## Quick wins — as Ondas mais baratas

**Liceu, Aletheia, Argos, Ariadne** já têm CLAUDE.md + PRD + squad.yaml + MEMORY. Para fechar o molde falta essencialmente:
- `constitution.md` (5-15 princípios com veto)
- registrar a Onda em `registros/metodo-onda-N/` (os 5 artefatos)
- `agent-memory/` em Aletheia, Argos, Ariadne (Liceu já tem)

São candidatos a rodar cedo mesmo estando no Grupo C — alto retorno, baixo esforço.

## Como rodar cada Onda

1. Abrir **sessão dedicada em `C:\Kolden\<Squad>\`** (regra G7 — nunca duas Ondas na mesma sub-sessão).
2. Invocar **`/padronizar <Squad>`**. O rito roda os 9 passos: lê o Método → diagnóstico read-only → escreve os 5 artefatos em `registros/metodo-onda-N/` → **PARA no Passo 4 para o Ronan aprovar** → aplica o diff cirúrgico → verificação Dike (CAOS-CL-002, 8 gates) → ritual de encerramento → atualiza AGENTS.md.
3. Alvo: **8/8 VERDE** na verificação Dike. Commit só sob ordem explícita.

## Dívida transversal (não é por-squad)

- **Chief canônico em `.claude/agents/<squad>-chief.md`:** só existe no Olimpo. Nos outros 23 o chief vive em `agents/`. Padronizar a camada executável do chief é um item global, a decidir depois das Ondas.
- **`_origem.md` ausente** em 9 squads (Ananke, Cairos, Dike, Emporos, Hestia, Liceu, Nomos, Pactolo, Pheme).

## Anomalias estruturais a resolver na Onda de cada squad

- **Dedalo** — usa `config.yaml` (não `squad.yaml`) + `CHANGELOG.md`, `mcp/`, `scripts/`, `templates/`. É tooling; decidir se entra no molde de squad-persona.
- **Dionisio, Orfeu** — **sem `.claude/`** (camada Claude inteira ausente). Precisam criá-la do zero.
- **Dike** — meta-auditor: sem README, sem `squad.yaml`, `agents/` vazio. Não segue o molde de squad operacional; a Onda 5 é seu nascimento como agent.
- **16 squads com `.claude/` só de `skills/`** (sem `settings.json` nem `reflexos/`) — só Olimpo, Aletheia, Argos, Ariadne, Liceu, Dike têm a camada `.claude/` completa.
