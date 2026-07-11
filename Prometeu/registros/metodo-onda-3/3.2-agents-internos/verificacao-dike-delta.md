---
tipo: registro
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/registros/metodo-onda-3/3.2-agents-internos/diff-cirurgico|diff-cirurgico]]"
  - "[[Prometeu/registros/metodo-onda-3/3.2-agents-internos/matriz-de-conformidade|matriz-de-conformidade]]"
  - "[[Prometeu/registros/metodo-onda-3/3.2-agents-internos/sumario-executivo|sumario-executivo]]"
  - "[[Prometeu/registros/metodo-onda-3/3.2-agents-internos/verificacao-dike|verificacao-dike]]"
---

# Verificação Dike Delta INDEPENDENTE — Sub-onda 3.2

> **Status:** **DEFERIDO para Sub-onda 3.3** conforme Q4 do gate humano (recomendação técnica).
> **Padrão herdado:** Sub-onda 3.1 fez a mesma coisa (delta INDEPENDENTE deferido para Sub-onda 3.2 na Q4; agora Sub-onda 3.2 defere para Sub-onda 3.3).
> **Contrato-mãe:** `m-20260706-metodo-kolden` (Onda 3 · Sub-onda 3.2).
> **Data da decisão:** 2026-07-07.

---

## §1 — Motivo do deferimento

**Justificativa técnica:**

1. **Coerência com padrão Sub-onda 3.1** — a Sub-onda 3.1 deferiu o delta INDEPENDENTE do prometeu-chief para uma sessão subsequente com subagente Explore isolado. Sub-onda 3.2 replica o padrão para manter consistência canônica.

2. **Sub-onda 3.3 fará costura final da Onda 3** — o delta INDEPENDENTE por-subagente Explore cobrindo **as 3 sub-ondas juntas (3.1 + 3.2 + 3.3)** é mais eficiente que fazer delta por-sub-onda:
   - Custo: 1 sessão de subagente Explore (vs 3 se fizesse por-sub-onda).
   - Escopo: cobre identidade + fronteira (3.1) + 12 aiox-agents (3.2) + 57 skills + costura (3.3) num único veredito.
   - Veredito final da Onda 3 (8/8 hard PASS ou <8/8 com pendências claras) num único artefato.

3. **Delta agora seria parcial** — se Sub-onda 3.2 rodasse delta INDEPENDENTE agora, cobriria apenas a camada aiox-agents (12) sem incluir a camada skills (57). Sub-onda 3.3 completa a matriz de forma canônica.

4. **Dike squad-solo ainda sem agente funcional** — enquanto Dike não nascer via Ritual do Caos (nascimento pendente Contrato próprio), o padrão é executar delta INDEPENDENTE via subagente Explore isolado, o que exige criação de briefing específico. Fazer 1 briefing cobrindo 3.1+3.2+3.3 é mais eficiente.

---

## §2 — Escopo do delta INDEPENDENTE Sub-onda 3.3 (planejado)

**A ser executado por subagente Explore isolado na Sub-onda 3.3:**

- **Cobertura:** 3.1 (identidade + fronteira vendor SynkraAI) + 3.2 (12 aiox-agents internos + refactor MEMORY + mapeamento cross-camada) + 3.3 (57 skills + skills públicas + costura + smoke).
- **Checklist canônico:** `Caos/checklists/CAOS-CL-002.md` (metadata DRAFT herdada — usada como canônico conforme METODO §9).
- **Salvaguardas:** (a) subagente Explore isolado sem contexto sessão prometeu-chief (independência real); (b) evidência textual verbatim por checkbox; (c) briefing declarativo cobrindo apenas o que verificar (não como verificar).
- **Escopo declarado:** Seções A + B (12 princípios) + C (8 gates canônicos Art. X) + F (costura final) + G (restrições invioláveis). Seções D+E permanecem N/A.
- **Veredito esperado:** SOBE / SOBE-com-RESSALVAS / REJEITA.
- **Se veredito = REJEITA:** Sub-onda 3.3 gera `diff-cirurgico-V2.md` com correções cirúrgicas e volta ao gate humano.
- **Se veredito = SOBE-com-RESSALVAS:** as ressalvas viram `log_de_decisao` no Contrato-mãe m-20260706 (padrão herdado Sub-onda 3.1).

---

## §3 — Sinalizações a preservar até Sub-onda 3.3

Nomes/objetos que o subagente Explore Sub-onda 3.3 deve procurar para validar as 3 sub-ondas:

**Sub-onda 3.1 (herdado do baseline):**
- `Prometeu/CLAUDE.md` — identidade canônica Kolden externa
- `Prometeu/prd-de-ia.md` — frontmatter 5 campos Art. X
- `Prometeu/squad.yaml` — manifesto canônico + fronteira SynkraAI (pós-3.2: + `mapeamento_cross_camada:`)
- `Prometeu/constitution.md` — 15 veto-operacionais + §Regra de precedência (Kolden Art. X > AIOX em conflito)
- `Prometeu/MEMORY.md` — memória do SQUAD
- `Prometeu/ferramentas.md` — catálogo tools + 6 skills públicas
- `Prometeu/roteiro-de-teste.md` — 5 testes canônicos (OS-1/AB-3/UN-2/GR-1/PR-1)
- `Prometeu/.claude/agents/prometeu-chief.md` — orquestrador tier-0 externo (pós-3.2: personas corrigidas Bob/Atlas)
- `Prometeu/.claude/reflexos/interrupt-before-mutation.sh` — reflexo G4 ASL-3
- `Prometeu/agent-memory/prometeu.md` — padrões técnicos Camada 5 Kolden (pós-3.2: + seção por-agente)
- `Prometeu/.claude/settings.json` — deny cirúrgico L1+L2 vendor AIOX
- `Prometeu/.claude/CLAUDE.md` — APPEND convenção @ vs / METODO §6
- `Prometeu/AGENTS.md` — APPEND fronteira Kolden × AIOX interno

**Sub-onda 3.2 (esta):**
- `Prometeu/.claude/agents/aiox-*.md` (10 arquivos) — APPEND bloco Kolden Art. X entre persona AIOX e `<!-- ritual-de-encerramento -->`
- `Prometeu/.claude/agents/aiox-master.md` — CREATE nova variante Claude Code Kolden do Orion (ASL-3)
- `Prometeu/.claude/agent-memory/_archive-pre-kolden/` — 4 MEMORY espúrios arquivados + README (se Q2.B)
- `Prometeu/agent-memory/prometeu.md` — APPEND seção por-agente
- `Prometeu/squad.yaml` — APPEND `mapeamento_cross_camada:` (se Q3.A)
- `C:\Kolden\AGENTS.md` — APPEND nota canônica Sub-onda 3.2 (se Passo 8 Q3.A)

**Sub-onda 3.3 (planejada):**
- `Prometeu/.claude/skills/*/SKILL.md` (57 arquivos) — padronização (a definir na Sub-onda 3.3)
- 6 skills públicas — nota cross-squad declarativa
- Costura final da Onda 3
- Smoke test canônico

**Vendor SynkraAI preservado (INVARIANTE):**
- `.aiox-core/**` intocado (~450 arquivos)
- `.aiox-core/constitution.md` v1.0.0 intocada
- 12 canônicos AIOX em `.aiox-core/development/agents/*.md` intocados
- 10 MEMORY canônicos AIOX em `.aiox-core/development/agents/<id>/MEMORY.md` intocados
- 12 personas AIOX em `.claude/commands/AIOX/agents/*.md` intocadas
- `bin/aiox.js`, `bin/aiox-init.js`, `packages/`, `pro/`, `docs/`, `README*.md` intocados

---

## §4 — Alternativa (Q4.B se aprovada em vez de recomendada Q4.A)

**Se Ronan aprovar Q4.B:** Dike delta INDEPENDENTE nesta Sub-onda 3.2 via subagente Explore agora.

Nesta hipótese:
1. prometeu-chief spawn de 1 subagente Explore com briefing específico cobrindo 3.1+3.2 (não 3.3 — que ainda não existe).
2. Subagente Explore verifica CAOS-CL-002 seções A-G contra os artefatos das Sub-ondas 3.1+3.2.
3. Se veredito = SOBE ou SOBE-com-RESSALVAS: Sub-onda 3.2 completa Passo 6 canônico Dike.
4. Se veredito = REJEITA: gerar `diff-cirurgico-V2.md` e voltar ao gate humano.
5. Sub-onda 3.3 faria delta INDEPENDENTE PRÓPRIO cobrindo 3.3 apenas + veredito canônico Onda 3 combinando 3.1+3.2 (esta sub-onda) + 3.3.

Custo Q4.B vs Q4.A: 2 sessões subagente Explore (Q4.B agora + Q4.A na Sub-onda 3.3) versus 1 sessão (Q4.A cobrindo tudo em 3.3). Ronan decide baseado em preferência de granularidade.

---

## §5 — Estado desta Sub-onda 3.2 (delta INDEPENDENTE)

```yaml
sub_onda: 3.2
delta_independente_status: "DEFERIDO para Sub-onda 3.3 (Q4.A recomendada)"
delta_independente_briefing_futuro: |
  Sub-onda 3.3 sessao dedicada em C:\Kolden\Prometeu\.
  Subagente Explore com briefing cobrindo 3.1 (identidade+fronteira) +
  3.2 (12 aiox-agents+MEMORY refactor+mapeamento cross-camada) + 3.3
  (57 skills+skills publicas+costura+smoke).
  Salvaguardas: (a) contexto isolado sem sessao prometeu-chief;
  (b) evidencia textual verbatim por checkbox; (c) briefing declarativo.
  Escopo: CAOS-CL-002 secoes A+B+C+F+G. Secoes D+E permanecem N/A.
  Veredito: SOBE / SOBE-com-RESSALVAS / REJEITA.

alternativa_se_Q4B: |
  Delta INDEPENDENTE nesta Sub-onda 3.2 via subagente Explore.
  Cobertura: 3.1+3.2 apenas. Sub-onda 3.3 fara delta proprio para 3.3.
  Custo: 2 sessoes subagente Explore vs 1 sessao (Q4.A).

decisao: pendente_gate_humano_Q4
```

---

*Nota de deferimento produzida por `prometeu-chief` (raiz Kolden) em 2026-07-07 na Sub-onda 3.2 da Onda 3 do Contrato-mãe `m-20260706-metodo-kolden`. Delta INDEPENDENTE por-subagente Explore isolado deferido para Sub-onda 3.3 (Q4.A recomendada — padrão herdado Sub-onda 3.1). Alternativa Q4.B declarada explicitamente. Decisão pendente gate humano Passo 4.*
