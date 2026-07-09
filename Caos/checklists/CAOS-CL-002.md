# CAOS-CL-002 v1.0 — Checklist de Verificação Dike (CANÔNICO)

> **Contrato-mãe:** `m-20260706-metodo-kolden` (absorveu `m-20260705-redesenho-arquitetural-fase2` como Onda 1)
> **Norma canônica:** `C:\Kolden\METODO-KOLDEN.md` v1.1 §4 (8 gates canônicos) + §9 (papel Dike)
> **Modelado por:** LICEU-CL-001 (padrão validado na Fase 1 do Contrato `m-20260704`)
> **Executor da verificação:** Dike (verificação independente do executor da onda; papel Dike temporário via subagente Explore isolado + 3 salvaguardas enquanto Dike agent-funcional não nasce — ver METODO §9)
> **Escopo:** aplicável a cada entregável das Ondas 2-26 do Método Kolden
> **Status:** **CANÔNICO** — promovido de DRAFT pela Sub-onda 1.6 do Contrato-mãe `m-20260706` (METODO §4/§9 referenciam este arquivo como fonte); ratificação empírica: aplicado 9x consecutivas com 8/8 VERDE (Sub-ondas 1.1/1.2/1.4/1.5/1.6 + Onda 2 Hermes + Sub-ondas 3.1/3.2/3.3 Prometeu)
> **Ratificação física do rename:** 2026-07-09 (Ronan, sessão raiz Kolden — fecha divergência declarada 3x em Hermes/Prometeu)
> **Versão:** v1.0 canônico (bump para v1.1 quando as emendas E1-E7 canonizadas no METODO v1.1 exigirem novos gates de verificação)

---

## Filosofia da CAOS-CL-002

Espelha LICEU-CL-001 mas adapta para redesenho arquitetural. O gate central é **procedência rastreável**: nenhuma mudança em arquivo do Caos entra sem citação linhagem/mente/obra/ano do framework do Liceu.

Deriva dos **12 princípios + 8 critérios canônicos** (framework `arquitetura-de-agents-kolden`). Cada item do checklist é binário (PASS/FAIL) ou nível (VERDE/AMARELO/VERMELHO).

## Nota de escopo (canonicalização 2026-07-09)

As seções **B, C, D, E, F** deste checklist foram escritas originalmente para as Ondas 2-6 do contrato absorvido `m-20260705-redesenho-arquitetural-fase2` (que virou Onda 1 do Contrato-mãe). Após a canonicalização de 2026-07-09, aplicam-se **por analogia** a qualquer Onda 2-26 do METODO Kolden que produza artefato equivalente:
- **Seção B (12 princípios)** — vale para toda onda de padronização de squad.
- **Seção C (8 critérios canônicos)** — vale para toda onda que crie ou modifique agent.
- **Seção D (MCP)** — vale para toda onda que toque ferramentas.
- **Seção E (Safety Dashboard + Predictions)** — vale para toda onda que gere predições datáveis (aplica-se agora ao motor de coleta da Fase 3 residual).
- **Seção F (Costura final + Smoke)** — vale para a onda de fechamento (Onda 26 do METODO ou sub-onda de costura de grupo).
- **Seção G (Restrições invioláveis)** — vale para **TODAS** as ondas.

Nomenclatura "G1-G6" desta seção G refere-se a restrições operacionais das ondas (herdadas do METODO §8 "Regras invioláveis"), distinta de "G1-G8" do METODO Art. X (que são os 8 critérios canônicos por agent — mapeados na Seção C acima como C1-C8).

---

## Seção A — Procedência (aplicável a TODA mudança em Caos/*)

| # | Item | Verificação | Veredito |
|---|---|---|---|
| A1 | Todo diff cita `procedencia: <linhagem>/<mente>/<obra>/<ano>` no changelog ou comentário |  Grep reverso: cada linha nova tem procedência batendo com `Liceu/frameworks/arquitetura-de-agents-kolden/procedencia.md` | PASS/FAIL |
| A2 | Nenhuma procedência inventada | Grep na procedencia.md do Liceu confirma existência da mente/obra/ano citada | PASS/FAIL |
| A3 | Se procedência não for óbvia, houve consulta ao Liceu (bibliotecario ou sintetizador) documentada no `achados.jsonl` da onda | Ler `achados.jsonl` da onda em curso | PASS/FAIL |

**Falha em qualquer A1-A3 = REJEITAR o diff. Reescrever com procedência.**

---

## Seção B — Princípios canônicos (aplicável a Ondas 2 e 3)

Verificação: para cada princípio, a mudança **implementa, refina ou mantém** conformidade (não introduz divergência nova).

| # | Princípio | Mínimo esperado após Ondas 2-3 | Como verificar |
|---|---|---|---|
| B1 | P1 Universalidade Turingiana | Glossário tem verbete + Art. V constituição mantido | Grep "model-agnostic" + "OpenRouter" |
| B2 | P2 Sociedade de Mentes | Ritual mantém tier 0 + tier 1 + squad.yaml | Ler `Caos/modelos/squad-base.yaml` |
| B3 | P3 Bounded Rationality | **PRD tem seção `aspiration_criteria` obrigatória** (3-5 metas mensuráveis) | Grep "aspiration" em prd-de-ia.md |
| B4 | P4 Software 2.0 | Art. I "PRD é fonte da verdade" mantido | Ler constituicao.md |
| B5 | P5 Assistance Games | **Template CLAUDE.md tem bloco "Incerteza declarada"** | Grep "uncertainty" ou "incerteza sobre" no template |
| B6 | P6 Orthogonality | Gates Fase 6 BLOCK mantidos + PRD tem tabela "auditoria de risco Bostrom" | Grep "auditoria de risco" em prd-de-ia.md |
| B7 | P7 Embodied Grounding | **Artigo IX na constituição** ("grounding compulsório para fatos datáveis") | Grep "Artigo IX" em constituicao.md |
| B8 | P8 Constitutional AI | Cada agent tem `constitution.md` próprio (5-15 princípios) | Ls agents/*/constitution.md |
| B9 | P9 Race-to-the-Top | Dashboard schema em `Caos/registros/dashboard-safety.md` | Ls arquivo |
| B10 | P10 ReAct como padrão | Templates system-prompt-base + orquestrador-base referenciam ReAct | Grep "ReAct" nos modelos |
| B11 | P11 State Machine + HITL | Gates Fase 4 e 7 mantidos + interrupt_before para ASL-3+ | Grep "interrupt_before" |
| B12 | P12 MCP mandatório | **Art. IV reformulado**: proíbe wrappers proprietários | Grep "MCP-nativo" ou "wrapper proprietário" em constituicao.md |

**Score alvo pós-Onda 3:** 12/12 VERDE.

---

## Seção C — Critérios canônicos (aplicável a Ondas 3 e 5)

| # | Critério | Mínimo esperado | Como verificar |
|---|---|---|---|
| C1 | Constitutional principles | cartao-de-identidade.md + prd-de-ia.md têm campo `constitution: [5-15 princípios]` | Grep "constitution:" |
| C2 | ASL declarado | cartao-de-identidade.md + prd-de-ia.md têm campo `ASL: 1|2|3|4+` | Grep "ASL:" |
| C3 | Assistance game — incerteza | Template CLAUDE.md tem uncertainty statement (mesmo item B5) | Grep uncertainty |
| C4 | Off-switch — corrigibility | Reflexo PreToolUse invoca interrupt_before para ASL-3+ (item B11) + teste OS-1 no roteiro | Grep interrupt_before + OS-1 |
| C5 | Orthogonality check | PRD tem tabela auditoria (mesmo item B6) | Grep auditoria-de-risco |
| C6 | Instrumental convergence | Teste AB-3 no roteiro ("agent aceita mais recursos?") | Grep "AB-3" ou "instrumental convergence" |
| C7 | Embodied grounding | Artigo IX + tools MCP obrigatória para fatos datáveis (itens B7+B12) | — |
| C8 | Predictions Scorecard | Fase 1 tem questão "agent faz previsões?"; PRD tem seção condicional; template `predicoes.yaml` existe | Ls template + grep no CLAUDE.md do Caos |

**Score alvo pós-Onda 5:** 8/8 VERDE para agentes recém-criados; agentes existentes exigem migração em Fase 3 real.

---

## Seção D — MCP (aplicável à Onda 4)

| # | Item | Verificação | Veredito |
|---|---|---|---|
| D1 | Inventário completo de wrappers proprietários | Grep por skills-como-tools + wrappers em Caos/ + squads que consomem | 0 wrappers no núcleo Caos (confirmado na Onda 1); wrappers em outros squads? |
| D2 | Mapa de dependências | Arquivo `Caos/registros/redesenho-fase2/onda-4-mcp/mapa-de-dependencias.md` existe | Ls arquivo |
| D3 | Plano de migração escalonada | Se D1 identificou wrappers em outros squads, plano com dupla-vida se impacto alto | Ler mapa |
| D4 | Art. IV reformulado | Item B12 verificado | — |

---

## Seção E — Safety Dashboard + Predictions (aplicável à Onda 5)

| # | Item | Verificação | Veredito |
|---|---|---|---|
| E1 | Schema Amodei RSP-style | `dashboard-safety.md` tem: ASL por agent + interpretability score + red-team log + constitutional principles ativos | Ler arquivo |
| E2 | Localização documentada | Comentário no arquivo diz "v0 estático; população automática em Fase 3 via Hermes runtime" | Ler cabeçalho |
| E3 | Template `predicoes.yaml` | Existe em `Caos/modelos/predicoes.yaml` com schema (data + critério + revisor + status) | Ls arquivo |
| E4 | Template `revisao-anual.md` | Existe em `Caos/modelos/revisao-anual.md` com estrutura de scoring | Ls arquivo |
| E5 | Cadência declarada | Documento diz "próximo checkpoint: 2027-01-01" | Grep 2027 |
| E6 | Predições iniciais Kolden 2026-2027 | Arquivo `Caos/registros/predictions-scorecard-kolden-2026.md` com 3-5 predições sobre MCP/paradigmas/saturação/safety | Ls arquivo |

---

## Seção F — Costura final + Smoke (aplicável à Onda 6)

| # | Item | Verificação | Veredito |
|---|---|---|---|
| F1 | Diffs aplicados sequencialmente | Git log da Onda 6 mostra commits temáticos por seção | Git log |
| F2 | Smoke test 1: criação | `@caos crie agent especialista em vendas de SaaS enterprise` produz agent | Ls agents/ novo |
| F3 | Smoke test 2: agent passa 8/8 critérios | Agent gerado tem constitution + ASL + uncertainty + off-switch + orthogonality-check + grounding + scorecard-se-aplicavel | Inspeção manual do agent (Dike delta) |
| F4 | Caos/MEMORY.md atualizado | Ritual final tem padrões aprendidos ao longo das 6 ondas | Ler MEMORY.md tail |
| F5 | Working tree limpo entre ondas | Nenhuma pendência entre ondas 2 e 6 | Git status |
| F6 | AGENTS.md raiz Kolden com nota | Ao fim, aponta framework Liceu como norma canônica de arquitetura | Ler AGENTS.md |

---

## Seção G — Restrições invioláveis (aplicáveis a TODAS as ondas)

| # | Item | Veredito | Consequência |
|---|---|---|---|
| G1 | Nenhum arquivo tocado fora de `Caos/` (exceção: `AGENTS.md` na Onda 6) | Git diff --stat mostra 100% em Caos/ + AGENTS.md se onda 6 | PASS/FAIL |
| G2 | Nenhum commit sem ordem explícita do Ronan | Working tree preservado até ordem | PASS/FAIL |
| G3 | Nenhum push sem ordem explícita | — | PASS/FAIL |
| G4 | Ritual de encerramento em Caos/MEMORY.md por onda | Ls MEMORY.md + tail confirma padrões da onda em curso | PASS/FAIL |
| G5 | Fan-out ≤ 3 subagentes internos por onda | Executor documenta subagentes usados na entrega | PASS/FAIL |
| G6 | Artefato-em-disco entre ondas | Cada onda encerra com todos os arquivos previstos gravados | PASS/FAIL |

---

## Veredicto por onda

Cada onda termina com relatório Dike no formato:

```yaml
onda: <N>
executor: <caos-chief | hermes>
data: 2026-MM-DD
verificacao_dike:
  secao_A_procedencia: PASS | FAIL
  secao_B_principios: <score>/12
  secao_C_criterios: <score>/8
  secao_D_mcp: PASS | FAIL | N/A
  secao_E_safety: PASS | FAIL | N/A
  secao_F_costura: PASS | FAIL | N/A
  secao_G_restricoes: PASS | FAIL
veredito: sobe | ressalvas | rejeita
justificativa: <parágrafo curto>
```

---

## Histórico de promoção (DRAFT → CANÔNICO)

Este checklist foi produzido como **DRAFT** pelo Hermes na Onda 1 do Contrato `m-20260705-redesenho-arquitetural-fase2` (2026-07-05), modelado por LICEU-CL-001. Promovido a **CANÔNICO** pela Sub-onda 1.6 do Contrato-mãe `m-20260706-metodo-kolden` (2026-07-06), quando o METODO-KOLDEN.md v1.0 passou a referenciá-lo como norma em §4 (8 gates canônicos) e §9 (papel Dike). Rename físico do cabeçalho aplicado 2026-07-09 pelo Ronan após ratificação empírica em 9 aplicações consecutivas com 8/8 VERDE.

**Critérios de promoção cumpridos:**
1. ✅ Ronan aprovou a Onda 1 (Caos padronizado — 6 sub-ondas concluídas 2026-07-06)
2. ✅ Onda 2 (Hermes) aplicou o checklist e subiu com veredito 8/8 VERDE (2026-07-07)
3. ✅ Onda 3 (Prometeu) aplicou em 3 sub-ondas com 8/8 VERDE consolidado (2026-07-07 → 2026-07-09)

**Bumps futuros previstos:**
- **v1.1** — quando as emendas E1-E7 canonizadas no METODO v1.1 (Sub-onda 3.3 Prometeu, 2026-07-09) exigirem novos gates específicos para squad vendorizado, framework interno cross-squad, skills-como-tools cross-squad, convenção `@` dupla, constituição dupla co-existente e refactor por arquivamento. Diferido até 2ª ocorrência empírica de cada emenda (E4 já aguarda 2ª ocorrência na Onda 4 Olimpo).
- **v1.2** — quando as emendas ao framework do Liceu (G5 interpretabilidade + categoria runtime bidirecional Art. IV) forem ratificadas na Onda 6 do Método.

*Canônico ratificado por Ronan em 2026-07-09 na sessão raiz Kolden. Modelado por LICEU-CL-001 (Fase 1 do Contrato `m-20260704`). Fonte-de-verdade da norma: `C:\Kolden\METODO-KOLDEN.md` v1.1 §4 e §9.*
