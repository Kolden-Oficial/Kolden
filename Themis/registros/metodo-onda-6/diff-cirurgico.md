---
tipo: registro
area: Themis
up: "[[Themis/_MOC-themis]]"
---

# Diff cirúrgico — Onda 6 (Themis)

> **Escopo (G1):** 100% em `C:\Kolden\Themis\` + AGENTS.md (Passo 8) + METODO §12 (Passo 9). Nada mais.
> **Padrão:** INVÓLUCRO sobre MUTAÇÃO (E1) — camada Kolden PT-BR envelopa o vendor xquads-squads **preservado intocado**. Moldes: `Olimpo/*` (gêmeo estrutural).
> **Fan-out:** 0/3 (interdependência cross-artefato — mesma heurística do Olimpo/Dike).

## Decisões de arquitetura (a validar no gate)

| Decisão | Proposta | Justificativa |
|---|---|---|
| **ASL** | **2** | Themis **aconselha, não decide** ("o fundador decide"). Sem canal externo irreversível (diferente do Olimpo ASL-3 que decide M&A/board). Aconselhamento é reversível. |
| **model** | sonnet | Síntese multi-perspectiva + gestão de tensão. |
| **camada** | 5 | Squad operacional consultivo; colabora com `@Olimpo` (Zeus consulta o board). |
| **loop_pattern** | ReAct especializado | Os "6 passos do Presidente" (diagnostica → roteia → facilita → sintetiza → conduz à ação → honra dissidência). |
| **predictions_scorecard** | false | Aconselha, não prevê. |

## Arquivos a CRIAR (9) + APPEND (1)

1. `.claude/agents/themis-chief.md` — **chief-def** (variante Kolden do `board-chair`). Frontmatter Art. X (name, model sonnet, tools Read/Write/Edit/Glob/Grep/Bash/Agent, constitution, prd, ASL 2, uncertainty_ref, predictions false, loop ReAct, procedência). Corpo: síntese (remete a `agents/board-chair.md`), roteamento diagnóstico, protocolos multi-conselheiro, gestão de tensão, síntese≠média, handoffs (@Olimpo colaboração; subida via Dike/Hermes), ritual.
2. `constitution.md` — ~13 artigos veto. Chave: **conselho aconselha, fundador decide** (não decide pelo humano); framework nunca é lei; sem promessa de resultado; honra a dissidência (sempre anota minoria); síntese≠média; sem bypass de Contrato; segredos via Infisical; sem commit sem ordem; Dike na subida; grounding; fronteira vendor (Art. E1); working tree sem meia-mudança. Molde `Olimpo/constitution.md`; procedência Bai et al. 2022 + Caos v2.5 + Liceu.
3. `prd-de-ia.md` — PRD Kolden (missão: aconselhamento estratégico multi-lente; KPIs; persona board-chair; §6 arquitetura tier_0 + 11 tier_1; auditoria de risco Bostrom §modos de falha).
4. `squad.yaml` — **APPEND** bloco "CAMADA KOLDEN" (não altera vendor): `camada: 5`, `tier_0: themis-chief`, `tier_1: [11 conselheiros]`, `fronteira_vendor_xquads` (origem/commit/intocáveis), `external_handoffs` (colaboração @Olimpo; subida Dike→Hermes), `mcp_categoria`, `procedencia_lavratura`.
5. `CLAUDE.md` — identidade/orientação Kolden (persona board-chair + fronteira vendor + incerteza declarada Russell + 6 passos).
6. `ferramentas.md` — catálogo (skills-como-tools do `.claude/skills/`: framework-gdpr-lgpd, gerador-politica-privacidade, revisao-contratos-risco).
7. `roteiro-de-teste.md` — smoke (convene-board) + **OS-1** (off-switch) + **AB-3** (convergência instrumental) + testes por conselheiro.
8. `.claude/reflexos/interrupt-before-mutation.sh` — off-switch ASL (molde Olimpo).
9. `.claude/settings.json` — reflexos + ritual Stop.
10. `agent-memory/themis-chief.md` — memória chief-level (E4 nível 2).

## Arquivos a EDITAR fora de Themis/ (exceções G1)
- `AGENTS.md` (Passo 8) — entrada Themis: "importado-cru" → "padronizado (Onda 6)".
- `METODO §12` (Passo 9) — registro da Onda 6; próxima = Grupo C (Aletheia).

## Aprendizado incorporado do Dike (Onda 5)
Diferente do Dike, **o roteiro do Themis já nasce com OS-1 + AB-3 nomeados** — fecha antecipadamente a ressalva C4/C6 que ficou amarela na Onda 5. Meta: **8/8 VERDE**.

## Mapa achados → gates (Seção C)
C1 constitution (13 art.) · C2 ASL 2 · C3 incerteza (CLAUDE.md Russell) · C4 off-switch (reflexo + OS-1) · C5 orthogonality (PRD §modos de falha) · C6 instrumental (AB-3) · C7 grounding (Art. grounding + skill LGPD) · C8 N/A (não prevê).
