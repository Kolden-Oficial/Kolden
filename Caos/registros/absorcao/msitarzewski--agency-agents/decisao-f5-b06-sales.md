# F5 — Decisão de Absorção · B06 = Emporos + Pluto · divisão `sales/`

> Bucket: **B06 sales** · upstream `msitarzewski--agency-agents@a597cb6` · 33 IDs (G1–G33).
> Squads-alvo: **Emporos** (5 ag → 9 ag) · **Pluto** (16 ag → 17 ag).
> Output do F4 consolidado abaixo em decisão executiva, planos por especialista e gates do F6.
> **GATE BLOCK:** este plano **PARA para aprovação humana** antes de qualquer escrita no F6 (Constituição Art. III).

## 1. Veredito executivo

**ABSORVER 33/33 capacidades. PERDIDO = 0.** Distribuição:
- **4 REUSE** (G22, G23, G24, G25) — Pluto/Hormozi já carrega o DNA; registrar convergência, **não escrever nada**.
- **6 ADAPT** — estender 4 habilidades existentes do Emporos com blocos do upstream.
- **23 CREATE** — 4 especialistas + 13 habilidades novas no Emporos; 1 especialista + 3 habilidades novas no Pluto; estrutura `.claude/skills/` no Pluto (gap).

A regra do bucket foi confirmada **na prática**:
- G23 (value equation) e G25 (Core Four) → REUSE puro em Pluto, como esperado.
- G14–G17 (SPIN/Sandler/AECR) → CREATE em Emporos (frameworks clássicos B2B, não-Hormozi), como esperado.
- **Achado extra:** G9 (MEDDPICC) cabe melhor como ADAPT (estender BANT/MEDDIC) do que CREATE; G17 (AECR) também ADAPT (estender negociação) — refinamentos sobre habilidades já presentes evitam duplicação.

## 2. Decisão estratégica (síntese por subgrupo)

### 2.1 Account expansion / Customer Success enterprise (G1–G4) → Emporos
**Decisão:** novo especialista `emporos:gestor-de-contas-estrategicas` + 3 habilidades novas.

**Por quê não Pluto:** `hormozi-retention` opera retention/churn em cohort D2C (filosofia LTV). Account expansion B2B com QBR, stakeholder map vivo e NRR é **outra disciplina** — vocabulário, ferramentas e ritmo distintos. Misturar deturpa ambos.

**Por quê não criar squad CS separado agora:** prematuro. Emporos é o squad-semente comercial. Quando o volume de contas instaladas justificar, este especialista pode "se desligar" para um squad CS dedicado (sinalizado pelo Afrodite — ver Ponta Aberta 1 do mapa).

### 2.2 Sales coaching / enablement (G5–G8) → Pluto
**Decisão:** novo especialista `pluto:hormozi-sales-coach` + 3 habilidades novas.

**Por quê Pluto e não Emporos:** Hormozi tem filosofia explícita sobre time de vendas (delegação, ramp, OKRs operacionais — `hormozi-scale` e `hormozi-advisor` tocam isso). A camada **tática** (call coaching, OASP, ramp 30/60/90) está faltando no Pluto e completa o stack. O Emporos é tarefeiro de execução, não escola de rep.

**Cuidado:** o novo agente herda o tom Hormozi (direto, sistêmico, "vendedores são commodity, sistema é a alavanca") — não o tom enterprise B2B. Isso o diferencia de um eventual coach SPI/Richardson clássico que poderia nascer no Emporos no futuro.

### 2.3 Deal strategy / competitive (G9–G12) → Emporos sem novo agente
**Decisão:** **estender** `qualificacao-bant-meddic` com MEDDPICC; **criar** habilidade nova `estrategia-de-deal-complexo` sob `redator-de-propostas` (que já trata negociação).

**Por quê não criar `coach-de-deals`:** redundante com `redator-de-propostas` em squad-semente. Quando crescer, separa.

### 2.4 Discovery enterprise (G13–G17) → Emporos com 1 novo agente
**Decisão:** novo especialista `emporos:coach-de-discovery` (SPIN + Sandler + upfront contract) + 3 habilidades; AECR (G17) é ADAPT em `negociacao-e-fechamento`.

**Por quê o split G13–G16 no coach e G17 no redator:** discovery = início; objeção = fim. Frameworks distintos, fases distintas. Não há duplicação.

### 2.5 Pre-sales / Sales Engineering (G18–G21) → Emporos
**Decisão:** novo especialista `emporos:engenheiro-de-pre-vendas` + 3 habilidades novas.

**Por quê:** pre-sales B2B/SaaS é frente reconhecidamente separada do AE. Ferramentas (POC, battlecard, demo) são artefatos próprios. Não cabe no Pluto (que é D2C/coaching/oferta).

### 2.6 Offer + lead gen (G22–G25) → Pluto (REUSE puro)
**Decisão:** **nada a escrever.** Registrar procedência no MEMORY do Pluto e no `dados/repositorios-absorvidos.yaml` como convergência independente.

**Auditoria de DNA confirmada:**
- `hormozi-offers.md` linhas 26–60 → value equation literal (G23 ✅).
- `hormozi-leads.md` linhas 26–80 → Core 4 literal (G25 ✅).
- `hormozi-offers.md` + `hormozi-launch.md` → Grand Slam Offer (G22 ✅).
- `hormozi-leads.md` → iscas / lead magnets (G24 ✅).

### 2.7 Outbound signal-based / ABM (G26–G29) → Emporos
**Decisão:** **estender** `cadencia-de-outbound` com 3 blocos novos (signal-based + anatomia cold email + sequência 8-12); **criar** habilidade nova `abm-account-tiering`.

**Por quê não Pluto:** Hormozi Core 4 é canal-cego (warm/cold/content/paid em massa). Signal-based selling é precisão B2B 1-a-1, vocabulário distinto. **Não conflita** com Core 4 — opera em camada diferente (canal vs. seleção de alvo).

### 2.8 Pipeline analytics / RevOps tático (G30–G32) → Emporos
**Decisão:** novo especialista `emporos:analista-de-pipeline` + 2 habilidades novas (velocity, forecast 3-faixas).

**Por quê não Afrodite:** Afrodite é RevOps macro (modelo, política, metas globais). Análise de pipeline 1-a-1 e forecast operacional é execução — fica no Emporos. Handoff explícito ao Afrodite quando a análise virar mudança de política (cf. veto `fora_da_politica`).

### 2.9 Proposal strategy (G33) → Emporos (ADAPT)
**Decisão:** **estender** `redacao-de-proposta-comercial` com win themes + 3 atos + exec summary.

**Por quê não novo agente:** `redator-de-propostas` já existe e é o dono natural. Refinamento estratégico não justifica novo agente em squad-semente.

## 3. Plano de execução do F6 (ordem topológica)

> Respeitando a cascata da Fase 5 do Ritual (Constituição v2.2.0, gates 5.0→5.6):
> 5.0 plano → 5.1 orquestrador → 5.2 especialistas → 5.3 habilidades → 5.4 MCPs → 5.5 reflexos/memória → 5.6 referências.

### 3.1 Pluto (16 → 17 agentes)

**Pré-requisito estrutural:** criar `Pluto/.claude/skills/` + `catalogo.md` (não existe hoje — gap que precisa ser corrigido para receber as 3 habilidades novas). **Confirmar com o Caos** que essa mudança estrutural está dentro do escopo do F6 (Art. III).

| Ordem | Tarefa | Cascata | Habilidade Caos |
|---|---|---|---|
| 1 | Atualizar `hormozi-chief.md` para roteamento `coach` + atualizar `Pluto/README.md` (16→17 ag) | 5.1 | edição manual + `verificacao-de-alinhamento` |
| 2 | Criar `pluto:hormozi-sales-coach` (tier 1) em `Pluto/agents/hormozi-sales-coach.md` | 5.2 | `criacao-de-subagent` |
| 3 | Criar pasta `Pluto/.claude/skills/` + `catalogo.md` (vazio com cabeçalho) | 5.3 (estrutural) | edição manual |
| 4 | Criar 3 habilidades: `coaching-oasp`, `call-coaching-temporal`, `ramp-30-60-90` | 5.3 | `criacao-de-skill` (×3) |
| 5 | Atualizar `Pluto/README.md` workflows (opcional: `wf-sales-team-buildout`) | 5.3 | edição manual |
| 6 | Registrar 4 REUSE (G22/G23/G24/G25) no `Pluto/MEMORY.md` (procedência) | 5.5 | edição manual |
| 7 | Registrar novas entidades no `dados/registro-de-entidades.yaml` | 5.6 / Fase 8 | `registro-de-entidade` |

### 3.2 Emporos (5 → 9 agentes)

| Ordem | Tarefa | Cascata | Habilidade Caos |
|---|---|---|---|
| 1 | Atualizar `emporos-chief.md` (roteamento para 4 novos especialistas) + `squad.yaml` (tiers, agents, handoffs) + `README.md` (5→9 ag, matriz de roteamento expandida) | 5.1 | edição manual + `verificacao-de-alinhamento` |
| 2 | Criar 4 especialistas tier 1: `gestor-de-contas-estrategicas`, `coach-de-discovery`, `engenheiro-de-pre-vendas`, `analista-de-pipeline` | 5.2 | `criacao-de-subagent` (×4) |
| 3 | **Estender** 4 habilidades existentes (ADAPT — edição cirúrgica em SKILL.md): `qualificacao-bant-meddic` (+MEDDPICC), `negociacao-e-fechamento` (+AECR), `cadencia-de-outbound` (+signal-based +anatomia +sequência 8-12), `redacao-de-proposta-comercial` (+win themes/3 atos) | 5.3 | edição manual; **sem cópia literal** |
| 4 | **Criar** 13 habilidades novas (lista no §3.3 do mapa F4) | 5.3 | `criacao-de-skill` (×13) |
| 5 | Atualizar `Emporos/.claude/skills/catalogo.md` (5 → 18 habilidades-âncora) | 5.3 | edição manual |
| 6 | Sem MCPs novos a construir (signal-based e Apollo já cobertos por integrações genéricas no `executivo-de-cadencia`) | 5.4 | — |
| 7 | Reflexos: confirmar que os 5 vetos do `squad.yaml` (`fora_da_politica`, `sem_qualificacao`, `crm_inventado`, `outbound_spam`, `credencial_texto_puro`) cobrem os novos agentes; se POC (G20) introduzir risco novo (e.g., escopo creep), adicionar veto `poc_sem_gate_binario` | 5.5 | `criacao-de-hooks` (condicional) |
| 8 | Atualizar `Emporos/MEMORY.md` com Padrões Ativos extraídos do bucket | 5.5 | edição manual |
| 9 | `heranca-de-especialista` para cada novo agente (SPIN → Neil Rackham; Sandler → David Sandler; Challenger → Dixon/Adamson; MEDDPICC → Dick Dunkel/PTC; Pipeline Velocity → David Skok/SaaStr; QBR → Gainsight/SuccessHACKER) | 5.6 | `heranca-de-especialista` (×4 agentes) |
| 10 | Registrar todas as entidades novas + procedência G1–G21, G26–G33 no `dados/registro-de-entidades.yaml` | Fase 8 | `registro-de-entidade` |

### 3.3 Validação cruzada pós-F6

| Verificação | Onde | Quem |
|---|---|---|
| Maturity score do Emporos pós-F6 ≥ 7.0 | `roteiro-de-teste.md` do Emporos | `avaliacao-de-agente` (especialista `testador`) |
| Maturity score do Pluto pós-F6 ≥ 7.0 | `roteiro-de-teste.md` do Pluto | idem |
| Catálogo de habilidades fiel (sem órfãs, sem links quebrados) | `Emporos/.claude/skills/catalogo.md` + `Pluto/.claude/skills/catalogo.md` | `governanca-de-habilidades` + `verificacao-de-alinhamento` |
| Fronteira Emporos × Afrodite preservada (veto `fora_da_politica`) | `squad.yaml` + 5 vetos | reflexo PreToolUse + revisor |
| Fronteira Emporos × Pluto preservada (não há canal duplicado: Core 4 fica em Pluto, signal-based fica em Emporos) | matriz de roteamento + MEMORY de ambos | `qa-de-integracao-de-time` |
| Procedência G1–G33 rastreável | `dados/registro-de-entidades.yaml` + `dados/repositorios-absorvidos.yaml` | curador |
| **Invariante de absorção sem perda** (ABSORVIDO 33 + DESCARTADO 0 + PERDIDO 0 == 33) | `protocolo-de-absorcao-sem-perda` | curador |

## 4. Riscos e mitigação

| Risco | Impacto | Mitigação |
|---|---|---|
| Inchaço do Emporos (5 → 9 ag em uma rodada) — squad-semente vira squad maduro de uma vez | Médio. Curva de aprendizado para o orquestrador rotear 9 vs 5. | Atualização rigorosa da matriz de roteamento no `emporos-chief.md` com keywords disjuntas por especialista; teste de comportamento focado em handoffs (Fase 7). |
| Sobreposição percebida entre `coach-de-discovery` (SPIN) e `executivo-de-cadencia` (cold call discovery) | Baixo. Funções distintas (1-a-1 sentado × outbound em escala). | Definição explícita no `squad.yaml`: discovery em call qualificada = coach; abertura por outbound = executivo. |
| Pluto recebe estrutura `.claude/skills/` que não tinha — risco de "rachadura" se algum agente do Pluto referenciar habilidade pelo path antigo (não há, mas confirmar) | Baixo. | `verificacao-de-alinhamento` antes do commit; `qa-de-integracao-de-time` no fim. |
| Confusão filosófica: alguém ativar `pluto:hormozi-sales-coach` para coachar AE B2B SPIN-style | Médio. | Frontmatter do agente deixa claro: "**coaching no tom Hormozi** (D2C/coaching/sistema-como-alavanca), não SPIN/Richardson clássico — para isso, vá ao Emporos quando tiver coach-de-rep B2B". |
| Cópia literal acidental do upstream nos blocos ADAPT | Alto (Art. VI). | Reescrita semântica obrigatória; revisor (Fase 6) verifica diff vs upstream com olho de auditor; sem trechos textuais idênticos. |
| Habilidades dependentes de credenciais (Apollo, Common Room, GHL, ferramentas de signal como Bombora/G2) não documentadas | Médio. | Para cada habilidade nova com integração, atualizar `ferramentas.md` (Art. IV) + Infisical (Art. VII). |

## 5. Pontas abertas que disparam decisão humana

1. **Criar squad CS dedicado agora ou em rodada futura?** Pré-veredito: **futura.** Mantém o `gestor-de-contas-estrategicas` no Emporos como ponta de CS até volume justificar separação.
2. **Pluto sem `.claude/skills/` — corrigir nesta absorção?** Pré-veredito: **sim, mas confirmar com o Caos.** Gap estrutural pequeno e bem delimitado; resolver junto evita carregar débito.
3. **Adicionar veto `poc_sem_gate_binario` no Emporos** (decorrente do G20)? Pré-veredito: **sim, leve.** Custo: 1 linha em `squad.yaml` + 1 reflexo PreToolUse opcional. Benefício: protege contra scope creep de POC.
4. **Workflows de pre-venda no Emporos** (e.g., `wf-deal-tecnico-enterprise`: discovery → POC → battlecard → proposta)? Pré-veredito: **fora deste F6.** Adicionar após o squad estabilizar; workflows são otimização, não pré-requisito.
5. **Workflow `wf-sales-team-buildout` no Pluto** (hiring → ramp → onboarding → primeira venda)? Pré-veredito: **fora deste F6.** Mesma justificativa.

## 6. Aprovação requerida

**O Ronan precisa aprovar:**

- [ ] O **diagrama de absorção** (33 IDs distribuídos como acima).
- [ ] A criação de **5 especialistas novos** (4 no Emporos, 1 no Pluto).
- [ ] A criação de **16 habilidades novas** (13 no Emporos, 3 no Pluto).
- [ ] A **extensão de 4 habilidades existentes** no Emporos (sem renomear nem mover dono).
- [ ] A criação da **estrutura `.claude/skills/`** no Pluto (pré-requisito estrutural).
- [ ] As **pontas abertas §5.1–§5.5** (especialmente §5.2 e §5.3).

Sem aprovação explícita, o F6 não inicia (Constituição Art. III).

## 7. Próximos passos imediatos (se aprovado)

1. Marcar TaskList item **#12 (B06)** como **completed** (após aprovação do F5).
2. Abrir F6 do B06 em sessão dedicada — execução em cascata (5.1 → 5.6) na ordem topológica do §3.
3. Reportar ao final do F6: ABSORVIDO/DESCARTADO/PERDIDO + maturity score + procedência atualizada.

---

## Anexo A — Resumo de uma frase por ID (referência rápida)

| ID | decisão | onde | uma frase |
|---|---|---|---|
| G1 | CREATE | Emporos | Account expansion enterprise — novo agente `gestor-de-contas-estrategicas`. |
| G2 | CREATE | Emporos | QBR forward-looking — habilidade `qbr-forward-looking`. |
| G3 | CREATE | Emporos | Stakeholder map vivo — habilidade `mapa-de-stakeholders`. |
| G4 | CREATE | Emporos | Account health por banda — habilidade `saude-de-conta`. |
| G5 | CREATE | Pluto | Sales coach Hormozi — novo agente `hormozi-sales-coach`. |
| G6 | CREATE | Pluto | OASP loop — habilidade `coaching-oasp`. |
| G7 | CREATE | Pluto | Call coaching temporal — habilidade `call-coaching-temporal`. |
| G8 | CREATE | Pluto | Ramp 30/60/90 — habilidade `ramp-30-60-90`. |
| G9 | ADAPT | Emporos | MEDDPICC estende `qualificacao-bant-meddic`. |
| G10 | CREATE | Emporos | Challenger 6 passos — sub-bloco em `estrategia-de-deal-complexo`. |
| G11 | CREATE | Emporos | Win/Battle/Lose zones — sub-bloco em `estrategia-de-deal-complexo`. |
| G12 | CREATE | Emporos | Landmine questions — sub-bloco em `estrategia-de-deal-complexo`. |
| G13 | CREATE | Emporos | Coach de discovery — novo agente `coach-de-discovery`. |
| G14 | CREATE | Emporos | SPIN — habilidade `spin-selling`. |
| G15 | CREATE | Emporos | Sandler Pain Funnel — habilidade `sandler-pain-funnel`. |
| G16 | CREATE | Emporos | Upfront contract — habilidade `upfront-contract`. |
| G17 | ADAPT | Emporos | AECR estende `negociacao-e-fechamento`. |
| G18 | CREATE | Emporos | Engenheiro de pre-vendas — novo agente. |
| G19 | CREATE | Emporos | Demo invertida — habilidade `demo-invertida-por-impacto`. |
| G20 | CREATE | Emporos | POC com gate binário — habilidade `poc-com-gate-binario`. |
| G21 | CREATE | Emporos | Battlecard FIA — habilidade `battlecard-fia`. |
| G22 | REUSE | Pluto | Grand Slam Offer já é DNA — registrar procedência. |
| G23 | REUSE | Pluto | Value Equation já é DNA literal — registrar procedência. |
| G24 | REUSE | Pluto | Lead magnet typology já é DNA — registrar procedência. |
| G25 | REUSE | Pluto | Core Four já é DNA literal — registrar procedência. |
| G26 | ADAPT | Emporos | Signal-based estende `cadencia-de-outbound`. |
| G27 | CREATE | Emporos | ABM tiering — habilidade `abm-account-tiering`. |
| G28 | ADAPT | Emporos | Anatomia cold email estende `cadencia-de-outbound`. |
| G29 | ADAPT | Emporos | Sequência 8-12 estende `cadencia-de-outbound`. |
| G30 | CREATE | Emporos | Analista de pipeline — novo agente. |
| G31 | CREATE | Emporos | Pipeline velocity — habilidade `pipeline-velocity`. |
| G32 | CREATE | Emporos | Forecast 3-faixas — habilidade `forecast-probabilistico-3-faixas`. |
| G33 | ADAPT | Emporos | Win themes / 3 atos / exec summary estendem `redacao-de-proposta-comercial`. |

**Invariante:** 4 REUSE + 6 ADAPT + 23 CREATE = **33 ABSORVIDO**. DESCARTADO = 0. PERDIDO = 0. ✅
