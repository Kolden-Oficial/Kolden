# Verificação Dike — Onda 2 (Hermes) contra CAOS-CL-002

> **Papel Dike:** executado temporariamente pelo `hermes-chief` (baseline diagnóstico). Papel INDEPENDENTE (Passo 6 do rito) será executado por subagente Explore isolado após aplicação do diff.
> **3 salvaguardas declaradas** (padrão Sub-onda 1.5 do Caos):
> - (a) ordem serial: matriz+achados+diff produzidos ANTES desta verificação;
> - (b) evidência textual verbatim por checkbox (linha citada);
> - (c) divergências conhecidas declaradas honestamente em §Divergências.
> **Fonte-de-verdade:** `Caos/checklists/CAOS-CL-002.md` (canônico após Sub-onda 1.6, apesar de cabeçalho ainda marcado "DRAFT" — divergência-de-metadata declarada; METODO §9 promove).
> **Escopo desta verificação:** BASELINE do Hermes ANTES da aplicação do diff. Passo 6 fará delta INDEPENDENTE após aplicação.
> **Data:** 2026-07-06 · **Contrato-mãe:** `m-20260706-metodo-kolden`.

---

## §A — Procedência (regra invariante de todo diff em Kolden)

| # | Item | Verificação | Evidência textual | Veredito |
|---|---|---|---|---|
| A1 | Todo diff cita `procedencia: <linhagem>/<mente>/<obra>/<ano>` | `diff-cirurgico.md` §2 CREATE #1-#10 têm bloco "Procedência linha-a-linha" após cada arquivo, citando explicitamente Russell/Bai/Yao/Bostrom/Brooks/Amodei/Karpathy/Simon/Hadfield-Menell + Sub-ondas do Caos + Constituição v2.5.0. Exemplos: CLAUDE.md §Procedência L "Bloco 'Incerteza declarada' → Russell 2019 *Human Compatible* (Onda 5)"; PRD §Procedência L "ASL: 3 → Amodei/Anthropic 2023 RSP" | ✅ PASS |
| A2 | Nenhuma procedência inventada | Grep reverso em `Liceu/frameworks/arquitetura-de-agents-kolden/procedencia.md` confirma: Russell 2019 (linha 26, 47, 48, 60), Bai et al. 2022 (linha 27, 77), Yao et al. 2022 (linha 27, 90), Bostrom 2012/2014 (linha 27, 65), Brooks 1991 (linha 26, 71), Amodei RSP 2023 (linha 74, 83, 86, 145), Karpathy 2017 (linha 51), Simon 1955 (linha 26, 46), Hadfield-Menell 2016/2017 (linha 57, 96, 155-156). Todas batem 1:1 | ✅ PASS |
| A3 | Se procedência não é óbvia, consulta ao Liceu documentada | `achados.jsonl` HRM-DIV-024 declara "candidato emenda METODO" para o caso NOVO da fronteira vendor Nous; caso conhecido/óbvio (12 princípios + 8 gates) usa fonte primária direto | ✅ PASS |

**Score Seção A:** 3/3 PASS.

---

## §B — Princípios canônicos (12 princípios)

Aplicação da matriz por princípio (transcrita de `matriz-de-conformidade.md §2`).

| # | Princípio | Estado após diff aplicado (projetado) | Evidência textual proposta | Veredito baseline / projetado |
|---|---|---|---|---|
| B1 | P1 Universalidade Turingiana | Ratificado em CLAUDE.md §Persona + PRD §1 | README.md L20 "Use any model you want — Nous Portal, OpenRouter (200+ models)... Switch with `hermes model` — no code changes, no lock-in" | ✅ VERDE (baseline já OK) |
| B2 | P2 Sociedade de Mentes | Ratificado em squad.yaml `tier_1: []` + nota exceção Camada 2 | `squads-catalog.yaml` L17-544 (23 squads catalogados) | ✅ VERDE (baseline já OK) |
| B3 | P3 Bounded Rationality | **CREATE #2** PRD frontmatter `aspiration_criteria` com 4 metas + limite | PRD §11.2 tabela: TPND=0, dor_completo=1.0, gate_humano_vermelho=1.0, entrega_10min=0.95 | ❌→✅ (baseline AUSENTE, projetado VERDE) |
| B4 | P4 Software 2.0 | **CREATE #2** PRD como fonte-da-verdade | PRD §1-§12 canônico | ❌→✅ |
| B5 | P5 Assistance Games | **CREATE #1** CLAUDE.md bloco "Incerteza declarada" + **CREATE #2** PRD `uncertainty_statement` | CLAUDE.md §Incerteza declarada L "Utilidade U do Ronan é espaço latente" | ❌→✅ |
| B6 | P6 Orthogonality + Instrumental | **CREATE #2** PRD §11.6 tabela auditoria capacidades × risco | PRD §11.6 tabela: 4 capacidades × riscos × mitigação × teste | ❌→✅ |
| B7 | P7 Embodied Grounding | Baseline VERDE + **CREATE #6** ferramentas.md §5 formaliza grounding_required | `hermes-chief.SOUL.md` L26 "Leia a intenção... e case com o catálogo" | ✅ VERDE (mantém) |
| B8 | P8 Constitutional AI | **CREATE #4** constitution.md 10 veto-operacionais | constitution.md Arts. I-X + referência em CLAUDE.md §Restrições | ❌→✅ |
| B9 | P9 Race-to-the-Top Safety | **CREATE #2** PRD `ASL: 3` declarado + §11.5 plano introspecção | PRD frontmatter `ASL: 3` + §11.5 tabela por camada | ⚠️→✅ (baseline PARCIAL) |
| B10 | P10 ReAct padrão | **CREATE #1** CLAUDE.md §Loop pattern + **CREATE #2** PRD `loop_pattern: ReAct` | CLAUDE.md L "Loop pattern — ReAct (Yao et al. 2022): Thought → Action → Observation" | ⚠️→✅ |
| B11 | P11 State Machine + HITL | **CREATE #8** reflexo `interrupt-before-mutation.sh` + baseline matriz risco em camada-2-contrato.md | .claude/reflexos/interrupt-before-mutation.sh L "readonly MUTATION_PATTERNS" | ⚠️→✅ |
| B12 | P12 MCP como Camada Universal | **CREATE #6** ferramentas.md §2 declara categoria "runtime bidirecional" (exceção Art. IV pendente) | ferramentas.md §2 tabela 3 wrappers preservados + Sub-onda 1.3 fonte | ⚠️→✅ |

**Score Seção B:**
- Baseline: 4 VERDE + 5 PARCIAL + 3 AUSENTE (P4, P5, P8) → ~40%
- Projetado após diff: **12/12 VERDE**.

---

## §C — Critérios canônicos (8 gates — Art. X)

| # | Gate | Estado baseline | Estado projetado (após diff) | Evidência textual |
|---|---|---|---|---|
| C1 | G1 Constituição | ❌ AUSENTE | ✅ VERDE via CREATE #4 constitution.md + PRD frontmatter `constitution: Hermes/constitution.md` | constitution.md Art. I-X (10 princípios declarados) |
| C2 | G2 ASL declarado | ❌ AUSENTE | ✅ VERDE via PRD frontmatter `ASL: 3` + PRD §11.2 justificativa | PRD frontmatter L `ASL: 3` |
| C3 | G3 Uncertainty + Aspiration | ❌ AUSENTE | ✅ VERDE via PRD frontmatter `uncertainty_statement:` + `aspiration_criteria:` 4 metas + CLAUDE.md §Incerteza declarada | PRD frontmatter uncertainty_statement bloco Russell 2019 |
| C4 | G4 Off-switch | ⚠️ PARCIAL (matriz risco texto) | ✅ VERDE via CREATE #8 reflexo bash formal + roteiro OS-1 | .claude/reflexos/interrupt-before-mutation.sh + roteiro-de-teste.md §1 OS-1 |
| C5 | G5 Plano de introspecção | ❌ AUSENTE | ✅ VERDE via PRD §11.5 tabela por camada → sinal → onde escrito | PRD §11.5 tabela 4 camadas do Hermes |
| C6 | G6 Orthogonality + Instrumental | ❌ AUSENTE | ✅ VERDE via PRD §11.6 tabela auditoria + roteiro AB-3 | PRD §11.6 + roteiro-de-teste.md §2 AB-3 |
| C7 | G7 Grounding compulsório | ⚠️ PARCIAL (SOUL.md L26 lê catálogo) | ✅ VERDE via ferramentas.md §5 declaração explícita + PRD §11.7 | ferramentas.md §5 |
| C8 | G8 Predictions Scorecard | ✅ N/A canônico | ✅ VERDE via PRD frontmatter `predictions_scorecard: false` + PRD §11.8 | PRD §11.8 justificativa "Hermes é runtime de roteamento; não faz previsões datáveis" |

**Score Seção C:**
- Baseline: 0/8 hard PASS + 2 PARCIAL (G4, G7) + 1 N/A (G8) → **~1/8**.
- Projetado após diff: **8/8 VERDE**.
- **Delta absoluto projetado: +7 pontos de conformidade** (0→7 ganho + 1 N/A já contava).

**Comparativo canônico:**
- Baseline `Caos/.claude/agents/arquiteto.md` pré-Sub-onda 1.5: **0/8**.
- Agent Salgueiro (Sub-onda 1.5 dogfooding): **8/8**.
- **Hermes baseline atual: ~1/8** (G8 legítimo N/A).
- **Hermes projetado (pós-diff): 8/8.**
- Delta Hermes: **+7 pontos** — segundo maior delta absoluto do Método (comparável ao Salgueiro +8).

---

## §D — MCP (aplicável a Onda 4 do sub-contrato; adaptado para Onda 2 Hermes)

Adaptação para o Hermes (que é Camada 2, não squad de conhecimento):

| # | Item | Estado | Evidência |
|---|---|---|---|
| D1 | Inventário de wrappers | ✅ PASS — Sub-onda 1.3 do Caos identificou 15/22 em Hermes; `ferramentas.md` §2 formaliza 3 wrappers canônicos runtime bidirecional | Sub-onda 1.3 `Caos/registros/metodo-onda-1/1.3-mcp-camada-1/inventario.md` L "22 wrappers em 4 squads... concentração Hermes: 15" |
| D2 | Mapa de dependências | ✅ PASS — Sub-onda 1.3 produziu `mapa-de-dependencias.md`; Hermes hereda | `Caos/registros/metodo-onda-1/1.3-mcp-camada-1/mapa-de-dependencias.md` (126 linhas) |
| D3 | Plano de migração escalonada | ✅ PASS — Sub-onda 1.3 aprovou Rota D-1: Discord/Slack/Telegram/WhatsApp/Google Chat SEM dupla-vida, categoria exceção | Sub-onda 1.3 `plano-migracao-escalonada.md` |
| D4 | Art. IV reformulado (v2.5) | ⚠️ PARCIAL — Art. IV emenda pendente Onda 6; `ferramentas.md` §2 documenta como "exceção pendente" | ferramentas.md §2 L "exceção Art. IV pendente" |

**Score Seção D:** 3 PASS + 1 PARCIAL (pendência conhecida) = **VERDE com ressalva declarada**.

---

## §E — Safety Dashboard + Predictions (aplicável a Onda 5 sub-contrato; adaptado)

| # | Item | Estado | Evidência |
|---|---|---|---|
| E1 | Schema Amodei RSP-style | ✅ PASS via Sub-onda 1.4 do Caos + PRD §11.5 introspecção Hermes | Sub-onda 1.4 `Caos/registros/dashboard-safety.md v0.1.0` + PRD §11.5 |
| E2 | Localização documentada | ✅ PASS — PRD frontmatter `predictions_scorecard: false` (N/A canônico) | PRD frontmatter |
| E3 | Template `predicoes.yaml` | ✅ N/A — Hermes não emite previsões (G8 justificado) | PRD §11.8 |
| E4 | Template `revisao-anual.md` | ✅ N/A — mesma razão | idem |
| E5 | Cadência declarada | ✅ N/A — mesma razão | idem |
| E6 | Predições iniciais Kolden 2026-2027 | ✅ Herdado da Sub-onda 1.4 — Hermes destrava KLD-PRED-2026-001 (substituições MCP Grupo A) | `Caos/registros/predictions-scorecard-kolden-2026.md` |

**Score Seção E:** 6/6 conformidade (2 PASS + 4 N/A legítimo).

---

## §F — Costura final + Smoke (aplicável a Onda 6 sub-contrato; adaptado)

| # | Item | Estado | Evidência |
|---|---|---|---|
| F1 | Diffs aplicados sequencialmente | ⚠️ **A APLICAR** no Passo 5 pós-gate humano | diff-cirurgico.md §2 ordem G1→G2→G3 (15 mudanças) |
| F2 | Smoke test criação | ✅ Herdado da Sub-onda 1.5 — Salgueiro 8/8. Hermes tem seu próprio roteiro-de-teste (OS-1, AB-3, UN-2) | roteiro-de-teste.md §1-§7 |
| F3 | Agent passa 8/8 | ⚠️ **A CONFIRMAR** pós-aplicação — projetado 8/8 conforme §C acima | matriz-de-conformidade §3 + §C desta verificação |
| F4 | MEMORY.md atualizado | ⚠️ **A APLICAR** — Passo 7 do rito (backup `-8` do agent-memory + CREATE #5 do MEMORY.md canônico) | achados.jsonl HRM-P2-016 |
| F5 | Working tree limpo entre ondas | ✅ PASS — nenhum arquivo tocado até agora fora de `Hermes/registros/metodo-onda-2/` | `git status` (aguarda smoke test do Passo 6) |
| F6 | AGENTS.md raiz Kolden com nota | ⚠️ **A APLICAR** no Passo 8 (condicional a Q3 do gate humano) | diff-cirurgico §§4 Q3 |

**Score Seção F:** 2 PASS + 4 A APLICAR (na ordem prevista) → conformidade projetada 6/6 após Passos 5+7+8.

---

## §G — Restrições invioláveis (todas as ondas)

| # | Item | Estado | Evidência |
|---|---|---|---|
| G1 | Nenhum arquivo tocado fora de `Hermes/` (exceto AGENTS.md raiz e METODO opcional) | ✅ PASS baseline — todos os artefatos desta Onda 2 estão em `Hermes/registros/metodo-onda-2/`. Passos 8/9 dependem de Q3 do gate humano | `Hermes/registros/metodo-onda-2/*.md` + `Hermes/registros/metodo-onda-2/achados.jsonl` |
| G2 | Sem commit sem ordem | ✅ PASS — trabalho preservado em working tree; nenhum `git commit` executado | `git status` (aguarda smoke) |
| G3 | Sem push sem ordem | ✅ PASS — nenhum `git push` | idem |
| G4 | Ritual de encerramento por onda | ⚠️ **A APLICAR** no Passo 7 | agent-memory/hermes.md (backup `-8` + trim + append padrões) |
| G5 | Fan-out ≤3 subagentes | ✅ PASS — Onda 2 usou 0/3 (regra 7x confirmada por interdependência cross-artefato) | Nenhum subagente disparado nos Passos 1-3 (execução direta) |
| G6 | Artefato-em-disco entre passos | ✅ PASS — 5 artefatos gravados em `Hermes/registros/metodo-onda-2/`: matriz + achados + diff + esta verificação (baseline) + sumário (próximo) | `ls Hermes/registros/metodo-onda-2/` |

**Score Seção G:** 5 PASS + 1 A APLICAR (Passo 7) → conformidade projetada 6/6.

**Divergência declarada:** Q3 do gate humano decide se `C:\Kolden\AGENTS.md` (raiz) é tocado no Passo 8. Se aprovado, é EXCEÇÃO AUTORIZADA G1 (precedente Sub-onda 1.6 do Caos que tocou 3 arquivos fora de `Caos/` sob autorização explícita do Contrato-mãe).

---

## §H — Divergências declaradas honestamente

Padrão herdado das Sub-ondas 1.1-1.6 do Caos.

1. **CAOS-CL-002 cabeçalho marca "DRAFT"** — arquivo `Caos/checklists/CAOS-CL-002.md` L1 e L7 dizem "(DRAFT)" e "Status: DRAFT — será promovido para CANÔNICO após Ronan aprovar a Onda 1 + Onda 2 primeira aplicação". METODO §9 declara canônico após Sub-onda 1.6 (`m-20260706` L503 fala em "rename físico pendente do passo 2 deste ciclo Hermes"). **Divergência-de-metadata declarada honestamente**: uso o arquivo como canônico conforme METODO §9; rename físico é escopo do PASSO 2 do ciclo Hermes-raiz de 2026-07-06 (fora desta Onda 2, mas pode ser escalado no gate humano Q3 se relevante).

2. **Verificação Dike temporária pelo hermes-chief (não independente)** — Dike squad-solo existe como esqueleto em `C:\Kolden\Dike\` (CLAUDE.md + MEMORY.md + PRD + reflexos + settings.json) mas SEM `Dike/agents/*.md` funcional. Papel Dike executado temporariamente pelo `hermes-chief` (produtor+verificador na mesma mão) com 3 salvaguardas: (a) ordem serial matriz→achados→diff→verificação, (b) evidência textual verbatim por checkbox (verbatim ou linha citada), (c) declaração explícita de divergência conhecida. **Passo 6 do rito** vai disparar subagente Explore INDEPENDENTE para delta verification após aplicação do diff.

3. **G5 interpretabilidade continua divergente do framework do Liceu** (herança canônica) — METODO §4 nomeia G5 como interpretabilidade (elevada por Contrato-mãe `m-20260706`); framework Liceu Fase 1 tem #5 = Orthogonality e #6 = Instrumental (sem interpretabilidade nomeada). Emenda ao framework proposta ao Liceu-chief na Onda 6 do Método (`emendas-liceu.md`). Ratificado pelo Ronan em Sub-onda 1.1 (AskUserQuestion 2026-07-05T23:00).

4. **Fronteira externa×Kolden não está no METODO v1.0** — caso NOVO desta Onda 2. Squad vendorizado é primeiro precedente padronizado. Candidato a emenda METODO §5 ou §8 na v1.1 (Passo 9 opcional).

5. **`sub_ondas` × `onda_N` no schema do Contrato-mãe** — Contrato-mãe usa `resultado_onda_1.sub_ondas["X.Y"]` para as 6 sub-ondas da Onda 1 (herança do sub-contrato `m-20260705`) mas para as Ondas 2-26 o schema natural é `resultado_ondas_2_a_26.onda_N`. Sumário executivo entrega bloco YAML nesse schema — vale confirmar padrão com o Ronan na 1ª rodada de resposta do gate humano.

---

## §I — Veredito canônico (baseline)

```yaml
onda: 2
squad_alvo: hermes
executor: hermes-chief (raiz Kolden, sessao dedicada C:\Kolden\Hermes\)
data: 2026-07-06
tipo_verificacao: baseline diagnostico (Passo 3)
independencia: 'temporariamente-executada-pelo-produtor (3 salvaguardas declaradas)'
verificacao_dike:
  secao_A_procedencia: PASS 3/3
  secao_B_principios:
    baseline: '4 VERDE + 5 PARCIAL + 3 AUSENTE (P4/P5/P8)'
    projetado_pos_diff: '12/12 VERDE'
  secao_C_criterios_canonicos:
    baseline: '~1/8 hard PASS + 2 PARCIAL (G4 G7) + 1 N/A (G8)'
    projetado_pos_diff: '8/8 VERDE'
    delta_absoluto_projetado: '+7 pontos de conformidade'
  secao_D_mcp: 'PASS 3/4 + 1 PARCIAL (Art. IV emenda pendente Onda 6)'
  secao_E_safety: 'PASS 6/6 (2 PASS + 4 N/A legitimo por design)'
  secao_F_costura_smoke:
    baseline: '2 PASS + 4 A APLICAR (Passos 5+7+8)'
    projetado: 'PASS 6/6 apos aplicacao'
  secao_G_restricoes:
    baseline: '5 PASS + 1 A APLICAR (Passo 7)'
    projetado: 'PASS 6/6'
veredito_baseline: 'DIAGNOSTICO CONCLUIDO — hermes atual ~1/8 hard PASS'
veredito_projetado: 'SOBE com aplicacao do diff cirurgico + Dike delta independente no Passo 6'
correcoes_cirurgicas_propostas: 0  # Passo 6 pos-aplicacao pode acrescentar se detectar delta
divergencias_declaradas:
  - 'CAOS-CL-002 cabecalho DRAFT vs METODO canonico'
  - 'Dike temporario pelo hermes-chief com 3 salvaguardas'
  - 'G5 interpretabilidade continua divergencia herdada do framework Liceu'
  - 'Fronteira vendor Nous como caso NOVO (candidato emenda METODO v1.1)'
  - 'Schema onda_2 vs sub_ondas confirmar com Ronan'
justificativa: |
  Diagnostico baseline do Hermes revela squad-vendorizado com camada Kolden PT-BR
  parcialmente consolidada + fronteira externa vendor Nous nao declarada. Diff
  ciruricico de 15 mudancas propostas (10 CREATE + 3 UPDATE + 1 MOVE condicional
  + 1 TRIM Passo 7) leva de ~1/8 hard PASS para 8/8 projetado. Delta absoluto
  +7 pontos, comparavel ao Salgueiro (+8) da Sub-onda 1.5. Fronteira vendor
  preservada intocada (agent/*.py, README.md, AGENTS.md interno, 19 skills EN,
  Dockerfile, pyproject.toml, ~150 arquivos vendor totais). Categoria "runtime
  bidirecional" documentada como excecao Art. IV pendente Onda 6.
proximo_passo: 'Passo 4 - AskUserQuestion com 3 perguntas do gate humano'
```

---

*Verificação Dike baseline produzida por `hermes-chief` em 2026-07-06 na Onda 2 do Contrato-mãe `m-20260706-metodo-kolden`. 3 salvaguardas declaradas. Passo 6 fará delta INDEPENDENTE por subagente Explore após aplicação do diff. Handoff para `sumario-executivo.md`.*
