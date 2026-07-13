---
tipo: nota
area: Dike
up: "[[Dike/_MOC-dike]]"
relacionado:
  - "[[Dike/CLAUDE|CLAUDE]]"
  - "[[Dike/squad|squad]]"
---

# Dike — Verificador da Subida

**Δίκη** — deusa do veredito justo aplicado ao caso concreto, filha de Têmis. Agente **SOLO nativo** da Kolden: o verificador independente que reconcilia a entrega contra o **lacre da intenção original** antes do Hermes devolver ao humano. Materializa o **TPND=0** (Total Perda Não Detectada = Zero).

## O que faz
Depois que o Zeus assina `consolidacao` na subida e antes do Hermes entregar ao Ronan, o Dike:
1. **Confere o hash** (`sha256(input_cru)` × lacre) via reflexo determinístico — integridade.
2. **Reconcilia** a cadeia top-down (Hermes → Zeus → Executivos → Operacional) — fidelidade.
3. Emite veredito **binário**: `sobe` ou `volta-para-correcao`, localizando o **degrau da quebra** (o elo mais alto onde a fidelidade rompeu).

Não corrige, não culpa, não arbitra. **Fail-closed**: se não consegue verificar, trava a subida e escala.

## Posição na hierarquia (METODO §3)

| | |
|---|---|
| **Camada** | verificador da subida (entre Zeus/Camada 3 e Hermes/Camada 2) |
| **Natureza** | agente SOLO nativo — tier_0 `dike-chief`, sem tier_1 |
| **ASL** | 2 (gate interno fail-closed; ação reversível) |
| **Invocação** | pelo pipeline do Contrato (gate mandatório); via skill, `@dike` ou Passo 6 do `/padronizar` |
| **Destinatário** | Hermes (recebe o veredito; não é o invocador — anti-circularidade) |
| **Escala** | teto 2 rodadas → humano via Hermes; anomalia de segurança → Egide |

## Arquivos canônicos
- `prd-de-ia.md` (v2.0 — fonte-da-verdade) · `constitution.md` (12 artigos veto) · `CLAUDE.md` (identidade) · `agents/dike.md` (persona) · `.claude/agents/dike-chief.md` (agent-def) · `squad.yaml` (manifesto) · `MEMORY.md` + `agent-memory/dike-chief.md` (Regra E4) · `.claude/reflexos/` (8 reflexos determinísticos) · `ferramentas.md` · `roteiro-de-teste.md`.

*Instanciado como agent-funcional na Onda 5 do METODO Kolden, 2026-07-13.*
