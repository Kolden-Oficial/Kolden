---
tipo: registro
area: Dike
up: "[[Dike/_MOC-dike]]"
---

# Sumário executivo — Onda 5 (Dike)

## O que é
Onda 5 do METODO = **nascimento do Dike como agente funcional**. Hoje o Dike existe como conceito + checklist (CAOS-CL-002) + esqueleto (CLAUDE.md, PRD v2.0, MEMORY, 8 reflexos), mas **sem agent-def executável** — o papel de verificador vem sendo feito temporariamente pelo caos-chief. Esta Onda fecha essa dívida (METODO §9 declara: "nas Ondas 2-26, Dike deve ser agent funcional independente").

## Diagnóstico (Passo 2)
- Dike está a **8/13** artefatos do molde; a camada `.claude/` (settings + 8 reflexos determinísticos) **já está completa** — mais do que 16 squads têm.
- Falta a **camada de agente**: agent-def, persona, constituição, manifesto, README, origem, memória-chief (7 arquivos).
- **Natureza confirmada: SOLO nativo** — não é squad-persona; o nascimento é lavrar o `dike-chief`, não povoar `agents/`.

## O que será criado (Passo 5, após seu OK)
7 arquivos em `Dike/`, todos derivados do **PRD v2.0 já aprovado** (nada inventado):
`.claude/agents/dike-chief.md` (agent-def) · `agents/dike.md` (persona) · `constitution.md` (12 artigos veto) · `squad.yaml` (manifesto SOLO) · `README.md` · `_origem.md` · `agent-memory/dike-chief.md`.
Mais 2 edições fora de `Dike/` (exceções G1): `AGENTS.md` (Passo 8) e `METODO §12/§9` (Passo 9).

## Decisões que pedem seu aval
1. **ASL 2** (não 3): Dike é interno e fail-closed — barra a subida (reversível), sem canal externo irreversível.
2. **SOLO**: 1 persona (`dike.md`), sem tier_1. O agent-def é o Dike.
3. **12 artigos** de constituição, derivados 1:1 dos guardrails do PRD §8 + modos de falha §10.

## ⚠️ Divergência declarada (honestidade — Salvaguarda 3)
- **G7 dispensado por ordem explícita do Ronan.** Esta Onda roda em **sessão-raiz** (não em `C:\Kolden\Dike\`), contra o pré-requisito da skill `/padronizar`. Registrado aqui e a levar à verificação Dike (Passo 6) como divergência conhecida.
- **Verificador do Passo 6:** como o Dike ainda não está vivo no momento da própria verificação, o papel Dike será feito por **caos-chief / verificação independente** (não o produtor), com as 3 salvaguardas (ordem serial, evidência verbatim, divergência declarada) — METODO §9.

## Gate humano
Ponto de parada do rito (Passo 4). Nada foi escrito no squad ainda — só os 3 artefatos de registro desta pasta. Ao aprovar, aplico o diff (Passo 5), rodo a verificação (Passo 6), o ritual de encerramento (Passo 7) e atualizo AGENTS/METODO (Passos 8-9).

```yaml
onda: 5
squad: Dike
executor: claude-code (sessão raiz)
data: 2026-07-13
natureza: agente-solo-nativo
g7: dispensado-por-ordem-explicita-do-ronan
arquivos_a_criar: 7
arquivos_a_editar: [AGENTS.md, METODO-KOLDEN.md]
decisoes_pendentes_de_aval: [ASL-2, solo-1-persona, constituicao-12-artigos]
estado: aguardando-gate-humano-passo-4
```
