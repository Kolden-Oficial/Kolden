# Sumário Executivo — Onda 1 do Contrato m-20260705

**Para:** Ronan
**De:** Hermes (executou a Onda 1 no lugar do caos-chief que falhou em gravar; ver `log_de_decisao` do Contrato)
**Data:** 2026-07-05
**Tempo de leitura:** ≤10 minutos
**Referência:** `matriz-de-conformidade.md` (matriz completa) + `achados.jsonl` (12 achados priorizados)

---

## Veredito em uma frase

O Caos é **aluno adiantado do framework, não estudante em risco**: implementa bem os fundamentos arquiteturais (5/5 nos Princípios 2, 4, 6, 11 — Sociedade de Mentes, Software 2.0, Orthogonality via gates, State Machine + HITL), mas **8 gaps críticos** nos critérios de safety+quality bloqueiam produção sob o novo framework. Fase 2 pode ser executada em **escopo cirúrgico** (remendo por remendo com procedência) — não precisa overhaul.

---

## Números

| Dimensão | Score | Leitura |
|---|---|---|
| Core Caos × 12 Princípios (60 células) | **60%** (36/60) | 4 princípios 100%; 4 parciais; 4 gaps |
| Modelos Caos × 8 Critérios (96 células) | **11%** (11/96) | Gap sistêmico — nenhum modelo tem safety fields |
| Ritual × 8 Gates | **62%** (5/8) | Silenciosos: ASL, Predictions, Off-switch explícito |
| 5 Camadas Caos × Framework | **70%** | Camadas 3, 4, 5 alinhadas; 1 e 2 parciais |

**Interpretação combinada:** o *layer arquitetural* do Caos (Ritual + Constituição + gates) é forte; o *layer de campos por agente* (modelos/*.md) é onde estão os gaps — porque foi projetado antes do framework existir.

---

## Os 5 gaps que travam produção sob o novo framework (P0)

Estes 5 são não-negociáveis. Onda 2 tem que atacar todos:

1. **Aspiration criteria por agent** (Simon 1955 — Princípio 3)
   Nenhum agent Kolden declara "eu paro quando: métrica X ≤ Y, latência ≤ Z, custo ≤ W". Isso é *definição operacional de sucesso*. Sem isso, agent é otimizador de reward fixo — o modelo padrão errado que Russell 2019 rebate.
   **Onde:** `Caos/modelos/prd-de-ia.md`
   **Custo:** nova seção obrigatória no PRD (~30 min).

2. **Uncertainty statement no template CLAUDE.md** (Russell 2019 — Princípio 5)
   Nenhum agent gerado hoje afirma "não sei com certeza o que Ronan quer — quando em dúvida, pergunto". Agent opera como oráculo confiante = risco arquitetural direto.
   **Onde:** `Caos/CLAUDE.md` (template) + habilidade `geracao-de-prd`
   **Custo:** bloco de 3-4 linhas padrão (~15 min).

3. **ASL (AI Safety Level) declarado por agent** (Amodei RSP set/2023 — Critério 2)
   Nenhum modelo tem campo "ASL: 1|2|3|4+". Sem classificação de risco, deploy não pode gate proporcionalmente. Agent com side-effects trata do mesmo jeito que agent read-only.
   **Onde:** `Caos/modelos/cartao-de-identidade.md` + `prd-de-ia.md`
   **Custo:** definição das 4 categorias + campo obrigatório (~1h).

4. **Off-switch / interrupt_before explícito** (Russell 2017 — Critério 4)
   Reflexos bloqueiam ações destrutivas (bom), mas **não interrompem agent mid-task** quando Ronan quer intervir. LangGraph `interrupt_before` é o padrão canônico.
   **Onde:** Fase 5.5 (reflexos) + `roteiro-de-teste.md`
   **Custo:** teste novo + hook PreToolUse ampliado (~2h).

5. **Predictions Scorecard para agents que fazem forecast** (Brooks 2018-2026 — Critério 8)
   Ritual não pergunta "este agent faz previsões?". Se sim, precisa cadência de falsificação (datas + critério + revisão anual). Método científico legítimo.
   **Onde:** Fase 1 (Diagnóstico) + PRD condicional
   **Custo:** template `predicoes.yaml` + `revisao-anual.md` + question no diagnóstico (~1h).

---

## Os 3 gaps P1 (importantes, não bloqueadores)

6. **Orthogonality check** (Bostrom 2012 — Critério 5) — nenhum modelo audita "aumento capabilities → aumento risco". Tabela em PRD resolve.
7. **Instrumental convergence red-team** (Bostrom 2012 — Critério 6) — nenhum teste verifica "agent tenta acumular recursos além do necessário". Teste adversarial novo no roteiro.
8. **MCP mandatório** (Anthropic 2024 — Princípio 12) — Artigo IV permite qualquer ferramenta em `ferramentas.md`; framework exige "MCP-nativo ou adapter". ZERO wrappers proprietários instanciados hoje (bom!), só falta política declarada.

---

## Os 4 gaps P2/P3 (menores, polimento)

9. ReAct nomeado nos modelos (implementado no núcleo Python, mas templates não nomeiam)
10. Grounding compulsório (implementado no layer de ferramentas; falta Artigo IX na constituição)
11. Constitutional AI por agent (constituicao.md global existe; falta constituição própria por agent gerado)
12. Dashboard de safety metrics (roadmap v3.4 promete; falta arquivo real)

---

## O que já é padrão-ouro (não mexer)

- **Governança** (Fase 4 + Fase 7 gates hard + maturity ≥7.0) = melhor que muito lab industrial faz
- **Constituição global** (7 artigos NÃO-NEGOCIÁVEIS) = base sólida, só falta escalar por agent
- **Zero wrappers proprietários** no núcleo = MCP-compatible por default
- **Model-agnostic** declarado (Art. V + roadmap v4.0 OpenRouter)
- **Software 2.0** (Art. I "PRD é fonte da verdade") = 100% aderente a Karpathy 2017
- **Sociedade de Mentes** (tier 0 + tier 1 + squad.yaml) = 100% aderente a Minsky 1986

---

## Recomendação de escopo para Fase 2

**Cenário A — Cirúrgico (recomendado):**
- Onda 2 combinada com Onda 3 (identidade + ritual + modelos, foco nos 5 P0)
- Onda 4 leve (política MCP mandatório; não migração de wrappers, porque não há)
- Onda 5 é schema (dashboard + predictions template; população fica para Fase 3)
- Onda 6 fecha + smoke test
- **Total estimado:** 4-5 sub-sessões do Caos

**Cenário B — Overhaul (não recomendado):**
- Reescrita completa de todos os modelos + constituição + ritual
- Alto risco de introduzir divergências novas + tempo enorme
- Não justificado pelo diagnóstico (60% Core já ok; gaps são pontuais)

**Diagnóstico sugere Cenário A** — o que o próprio Contrato antecipa (linha 368-378 do risks/propostas).

---

## Escopo residual identificado (não Fase 2, mas Fase 3 real)

- **Runtime Python portável do Caos** (v4.0 roadmap; hoje é Claude Code nativo)
- **MCP servers ligados** com config.yaml populado
- **Dashboard interativo populado** com dados reais de agents em produção
- **Integração Hermes runtime** para safety metrics em tempo real

Estes 4 pontos justificam **Contrato Fase 3** próprio (`m-2026MMDD-implementacao-mcp-e-dashboard`) — não cabe em Fase 2 que é *desenho*.

---

## Autorização pedida ao Ronan

Antes de disparar Ondas 2-6, o Contrato exige aprovação humana explícita (Contrato linha 152: "PARAR. Aguardar aprovação humana"). **3 perguntas pra você resolver:**

1. **Aprovar Cenário A (cirúrgico)** ou preferir outro escopo?
2. **Rota executora Ondas 2-6:** manter caos-chief operacional (dogfooding declarado no Contrato) ou continuar com hermes reparando por default (mais confiável mas quebra o dogfooding)?
3. **Onda 2 combinada com Onda 3** (identidade+ritual+núcleo+modelos em uma sub-sessão) ou separadas (uma por sub-sessão, mais lentas mas mais defensáveis)?

Recomendo: **Cenário A + caos-chief (com prompt reforçado sobre gravação em disco) + Ondas 2-3 combinadas por escopo cirúrgico**.

---

## Anexos

- `matriz-de-conformidade.md` — matriz completa 12+8 × arquivos
- `achados.jsonl` — 12 achados priorizados append-only (formato validado 2026-06-28)
- `CAOS-CL-002-draft.md` — checklist Dike derivado para validar Ondas 2-6

*Sumário produzido por hermes na Onda 1 do Contrato `m-20260705`. Working tree preservado exceto os 4 artefatos + MEMORY.md do Caos.*
