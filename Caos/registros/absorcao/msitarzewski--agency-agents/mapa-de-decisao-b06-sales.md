---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/msitarzewski--agency-agents/_indice|_indice]]"
---

# F4 — Mapa de Decisão · B06 = Emporos + Pluto · divisão `sales/`

> Bucket: **B06 sales** · upstream `msitarzewski--agency-agents@a597cb6` · 33 IDs (G1–G33).
> Squads-alvo: **Emporos** (execução comercial, 5 ag) · **Pluto** (Hormozi, 16 ag).
> Princípio: REUSE > ADAPT > CREATE (Constituição Art. VI).
> Critério de roteamento Emporos × Pluto:
> - **Emporos** = execução de pipeline, qualificação 1-a-1, cadência outbound, proposta/RFP, CRM (GHL), pre-sales, account expansion, coaching de rep, forecast/RevOps operacional. Vocabulário B2B/enterprise.
> - **Pluto** = filosofia Hormozi (oferta como produto, value equation, leads em escala, CLOSER, retention/LTV). Vocabulário direct-response/coaching/D2C. **G23 e G25 já são DNA** (esperado REUSE puro).

## Tabela de decisão (33/33)

| ID upstream | capacidade | squad_alvo | decisao | match_kolden | justificativa | acao_f6 |
|---|---|---|---|---|---|---|
| G1 | account-strategist: land-and-expand + stakeholder map + QBR + NRR | Emporos | CREATE | nenhum | Nenhum agente do Emporos cobre account expansion / NRR / QBR; Pluto (Hormozi) opera leads novos, não conta instalada B2B. É gap claro e estratégico (post-venda enterprise). | Criar especialista **`emporos:gestor-de-contas-estrategicas`** (tier 1) — land-and-expand, stakeholder map vivo, QBR, NRR, account health, intervenção por banda. Atualiza `squad.yaml` (Emporos passa de 5 → 6 ag, fase 5.2). |
| G2 | QBR forward-looking estruturado (ROI 15min / roadmap deles 20min / alinhamento 15min / MAP 10min) | Emporos | CREATE | nenhum | Técnica densa específica de QBR — não existe no Emporos nem no Pluto. Liga em G1. | Habilidade **`emporos:qbr-forward-looking`** (4 blocos cronometrados + mutual action plan) — dono: `gestor-de-contas-estrategicas`. |
| G3 | Stakeholder map vivo (5 papéis: decisor/budget/influenciador/end user/detrator/champion) + regra 3 threads independentes | Emporos | CREATE | nenhum | Multi-threading enterprise não existe em nenhum dos dois squads. | Habilidade **`emporos:mapa-de-stakeholders`** — dono: `gestor-de-contas-estrategicas`. |
| G4 | Account health score por banda (verde/amarelo/vermelho) + leading indicators de churn | Emporos | CREATE | parcial | Pluto/`hormozi-retention` cobre churn em massa D2C; Emporos não tem health score 1-a-1. Mantém no Emporos (account-level, não cohort-level). | Habilidade **`emporos:saude-de-conta`** — dono: `gestor-de-contas-estrategicas`. Cross-link com `hormozi-retention` no MEMORY. |
| G5 | sales-coach: SPI/Richardson, skill-gap vs will-gap, cadência 1:1 semanal / pipeline review quinzenal / forecast mensal | Pluto | CREATE | parcial | `hormozi-advisor` é mentor estratégico de dono de negócio, não coach de rep individual; `hormozi-scale` cobre delegação macro, não call coaching. Pluto é o lugar certo (filosofia Hormozi sobre time de vendas — "vendedores são commodity, sistema é a alavanca"). | Criar especialista **`pluto:hormozi-sales-coach`** (tier 1) — coaching de rep, OASP loop, call coaching, ramp 30/60/90. Pluto passa de 16 → 17 ag (fase 5.2). |
| G6 | Loop "observe, ask, suggest, practice" (OASP) — coaching socrático + one-thing-at-a-time + follow-up obrigatório | Pluto | CREATE | nenhum | Técnica de coaching socrático ausente no Pluto. | Habilidade **`pluto:coaching-oasp`** — dono: `hormozi-sales-coach`. |
| G7 | Call coaching com feedback temporal-específico (timestamp + comportamento + alternativa + porquê) + talk-listen ratio | Pluto | CREATE | nenhum | Hormozi tem o framework CLOSER (G_a vender), mas não cobre coaching pós-call do rep. | Habilidade **`pluto:call-coaching-temporal`** — dono: `hormozi-sales-coach`. |
| G8 | Ramp plan 30/60/90 com gates de competência por marco (não por tempo decorrido) | Pluto | CREATE | nenhum | Ramp de SDR/AE não existe no Pluto; Hormozi escreve sobre contratar, não rampar com gate de competência. | Habilidade **`pluto:ramp-30-60-90`** — dono: `hormozi-sales-coach`. |
| G9 | deal-strategist: MEDDPICC + scoring de oportunidade + win/battle/lose zones + Challenger commercial teaching 6 passos | Emporos | ADAPT | parcial | `qualificador-de-leads` cobre BANT/MEDDIC; MEDDPICC é evolução enterprise (adiciona Paper Process + Identify Pain + Competition). Não duplica, **estende**. | Estender habilidade **`emporos:qualificacao-bant-meddic`** para incluir o **degrau MEDDPICC** (com nota de quando subir de MEDDIC→MEDDPICC). Criar habilidade nova **`emporos:estrategia-de-deal-complexo`** (Challenger 6 passos + win/battle/lose zones) — dono: `redator-de-propostas` (que já trata negociação). |
| G10 | Challenger Sale: sequência de 6 passos (Warmer / Reframe / Rational Drowning / Emotional Impact / New Way / Your Solution) | Emporos | CREATE | nenhum | Challenger ausente; complemento de G9. | Sub-bloco da habilidade **`emporos:estrategia-de-deal-complexo`**. |
| G11 | Win/Battle/Lose zones — critérios por competidor + táticas por zona (amplificar / shift / encolher) | Emporos | CREATE | nenhum | Análise competitiva 1-a-1 ausente; Pluto trata categoria, não competidor enterprise nomeado. | Sub-bloco da habilidade **`emporos:estrategia-de-deal-complexo`**. |
| G12 | Landmine questions — perguntas de discovery que expõem força sua / fraqueza do concorrente sem soarem plantadas | Emporos | CREATE | nenhum | Técnica competitiva fina ausente em ambos. | Sub-bloco da habilidade **`emporos:estrategia-de-deal-complexo`**. |
| G13 | discovery-coach: SPIN + Gap Selling + Sandler Pain Funnel | Emporos | CREATE | nenhum | Discovery enterprise (SPIN/Sandler) **não é** Hormozi (que faz CLOSER em call de matrícula direct-response). Frameworks clássicos B2B → Emporos. | Criar especialista **`emporos:coach-de-discovery`** (tier 1) — SPIN + Gap Selling + Sandler. Emporos passa de 6 → 7 ag (cumulativo com G1). |
| G14 | SPIN — ênfase em Implication questions (loss aversion) e Need-Payoff (auto-venda) | Emporos | CREATE | nenhum | Framework clássico não-Hormozi (regra do bucket). | Habilidade **`emporos:spin-selling`** — dono: `coach-de-discovery`. |
| G15 | Sandler Pain Funnel — 3 níveis (surface / business impact / personal-emotional stakes) | Emporos | CREATE | nenhum | Framework clássico não-Hormozi (regra do bucket). | Habilidade **`emporos:sandler-pain-funnel`** — dono: `coach-de-discovery`. |
| G16 | Upfront contract Sandler (agenda + permissão de perguntar duro + normalização do "não" + concordância de tempo) | Emporos | CREATE | nenhum | Técnica de abertura Sandler ausente. | Habilidade **`emporos:upfront-contract`** — dono: `coach-de-discovery`. |
| G17 | AECR (Acknowledge / Empathize / Clarify / Reframe) + distribuição típica (48% budget / 32% timing / 20% competition) | Emporos | ADAPT | parcial | Habilidade `negociacao-e-fechamento` já existe no Emporos (objeção genérica). AECR é técnica nomeada com distribuição empírica — vale estender, não criar. | Estender habilidade **`emporos:negociacao-e-fechamento`** com o **bloco AECR + tabela de distribuição típica**. Dono mantido: `redator-de-propostas` + `emporos-chief`. |
| G18 | sales-engineer: discovery técnico, demo orientada por impacto, POC com gate binário, battlecards FIA | Emporos | CREATE | nenhum | Pre-sales / sales engineer ausente em ambos. Cabe no Emporos (B2B/SaaS). | Criar especialista **`emporos:engenheiro-de-pre-vendas`** (tier 1). Emporos passa de 7 → 8 ag (cumulativo). |
| G19 | Demo invertida (quantifica problema → outcome final → reverte para o "como" → fecha em prova comparável) | Emporos | CREATE | nenhum | Técnica densa específica de demo. | Habilidade **`emporos:demo-invertida-por-impacto`** — dono: `engenheiro-de-pre-vendas`. |
| G20 | POC com sentence-statement, success criteria binários acordados antes, timeline 2-3 semanas, checkpoint no meio | Emporos | CREATE | nenhum | Gestão de POC ausente. | Habilidade **`emporos:poc-com-gate-binario`** — dono: `engenheiro-de-pre-vendas`. |
| G21 | Battlecard FIA (Fact / Impact / Act) — fato verificável + por que importa ao buyer + talk track | Emporos | CREATE | nenhum | Battlecard estruturado ausente; complementa G11 (zonas) com o artefato. | Habilidade **`emporos:battlecard-fia`** — dono: `engenheiro-de-pre-vendas` (com input de `coach-de-discovery`). |
| G22 | offer-lead-gen: Grand Slam Offer + lead magnets (3 arquétipos) + Core Four + lead getters | Pluto | REUSE | total | DNA puro de Pluto — `hormozi-offers` (Grand Slam) + `hormozi-leads` (Core 4) + `hormozi-launch` cobrem 100%. **Não criar nada.** | **Nada.** Registrar no MEMORY do Pluto como REUSE confirmado (procedência G22). |
| G23 | Value Equation Hormozi: (Dream Outcome × Likelihood) / (Time × Effort) — 4 alavancas operáveis | Pluto | REUSE | total | DNA absoluto. `hormozi-offers.md` codifica isto literalmente (lido: linhas 26–60 do arquivo). | **Nada.** Procedência G23 confirmada no Pluto/MEMORY. |
| G24 | Lead magnet tipologia (Solve / Educate / Sample) — "magnet picks the buyer" | Pluto | REUSE | total | `hormozi-leads` cobre iscas/lead magnets como parte do Core 4. | **Nada.** Procedência G24 confirmada no Pluto/MEMORY. |
| G25 | Core Four de canais (Warm / Posted Content / Cold / Paid) + Rule of 100 | Pluto | REUSE | total | DNA absoluto. `hormozi-leads.md` codifica os 4 canais literalmente (lido: linhas 26–80). | **Nada.** Procedência G25 confirmada no Pluto/MEMORY. |
| G26 | outbound-strategist: signal-based selling (tier 1 active / 2 organizational / 3 technographic), speed-to-signal < 30min | Emporos | ADAPT | parcial | `executivo-de-cadencia` cobre cadência multi-toque, **mas não signal-based** (apenas list-based). Signal-based é evolução enterprise. | Estender habilidade **`emporos:cadencia-de-outbound`** com o **bloco signal-based** (tiers + speed-to-signal). Dono: `executivo-de-cadencia`. |
| G27 | Tiered Account Engagement Model (Tier 1 50-100 multi-thread / Tier 2 200-500 semi / Tier 3 signal-triggered) | Emporos | CREATE | nenhum | ABM tiering ausente; complemento de G26. | Habilidade **`emporos:abm-account-tiering`** — dono: `executivo-de-cadencia` (com input do `gestor-de-contas-estrategicas`). |
| G28 | Anatomia de cold email (subject 3-5 palavras lowercase + opening por sinal + CTA único de baixa fricção) | Emporos | ADAPT | parcial | `cadencia-de-outbound` cobre cold email genérico; falta a **anatomia detalhada** + benchmarks de reply rate. | Estender habilidade **`emporos:cadencia-de-outbound`** com a **anatomia + benchmarks**. Dono: `executivo-de-cadencia`. |
| G29 | Sequência multi-canal de 8-12 toques em 3-4 semanas + "cada toque novo ângulo de valor" + breakup email | Emporos | ADAPT | parcial | Cadência já existe; a estrutura específica (8-12 toques, breakup) é refinamento. | Estender habilidade **`emporos:cadencia-de-outbound`** com a **estrutura de sequência detalhada**. Dono: `executivo-de-cadencia`. |
| G30 | pipeline-analyst: pipeline health, forecast multi-variável, deal scoring, revops analytics | Emporos | CREATE | parcial | `gestor-de-crm` mantém pipeline limpo; falta análise diagnóstica (velocity, forecast multi-faixa, deal scoring). Pluto/`hormozi-scale` é macro (escala $1M→$100M), não pipeline analytics 1-a-1. | Criar especialista **`emporos:analista-de-pipeline`** (tier 1) — diagnóstico, velocity, forecast probabilístico, deal scoring. Emporos passa de 8 → 9 ag (cumulativo). |
| G31 | Pipeline Velocity = (Qualified Opps × Avg Deal Size × Win Rate) / Sales Cycle Length — cada variável como alavanca | Emporos | CREATE | nenhum | Fórmula RevOps ausente em ambos. | Habilidade **`emporos:pipeline-velocity`** — dono: `analista-de-pipeline`. |
| G32 | Forecast probabilístico em 3 faixas (Commit >90% / Best Case >60% / Upside <60%) + confidence intervals | Emporos | CREATE | nenhum | Forecast probabilístico ausente; `gestor-de-crm` só faz forecast operacional simples. | Habilidade **`emporos:forecast-probabilistico-3-faixas`** — dono: `analista-de-pipeline`. |
| G33 | proposal-strategist: 3-5 win themes + estrutura em 3 atos + executive summary como closing argument | Emporos | ADAPT | parcial | `redator-de-propostas` + habilidade `redacao-de-proposta-comercial` já existem; arquitetura de win themes + 3 atos + exec-summary-as-close é refinamento estratégico. | Estender habilidade **`emporos:redacao-de-proposta-comercial`** com o **bloco win-themes + 3 atos + exec-summary**. Dono mantido: `redator-de-propostas`. |

## Resumo agregado

| Decisão | Quantidade | IDs |
|---|---:|---|
| **REUSE** (DNA já presente) | 3 | G22, G23, G24, G25 → na verdade **4** (corrigido abaixo) |

### Contagem corrigida

| Decisão | Quantidade | IDs |
|---|---:|---|
| **REUSE** (DNA Hormozi puro no Pluto) | **4** | G22, G23, G24, G25 |
| **ADAPT** (estender habilidade existente) | **6** | G9 (BANT/MEDDIC → +MEDDPICC), G17 (negociação → +AECR), G26 (cadência → +signal-based), G28 (cadência → +anatomia), G29 (cadência → +sequência detalhada), G33 (proposta → +win themes/3 atos) |
| **CREATE** (novo) | **23** | G1, G2, G3, G4, G5, G6, G7, G8, G10, G11, G12, G13, G14, G15, G16, G18, G19, G20, G21, G27, G30, G31, G32 |
| **TOTAL** | **33** | invariante respeitado (4 + 6 + 23 = 33) |

## Distribuição por squad-alvo

| Squad | REUSE | ADAPT | CREATE | Total IDs |
|---|---:|---:|---:|---:|
| **Pluto** | 4 (G22/G23/G24/G25) | 0 | 4 (G5/G6/G7/G8 — sales-coach) | **8** |
| **Emporos** | 0 | 6 | 19 | **25** |
| **Total** | 4 | 6 | 23 | **33** |

## Novos especialistas a criar (cumulativo)

### Emporos: 5 → 10 agentes (+5 especialistas tier 1)
1. `emporos:gestor-de-contas-estrategicas` (G1–G4) — account expansion / QBR / stakeholder map / health
2. `emporos:coach-de-discovery` (G13–G16) — SPIN + Sandler + upfront contract
3. `emporos:engenheiro-de-pre-vendas` (G18–G21) — discovery técnico / demo / POC / battlecard
4. `emporos:analista-de-pipeline` (G30–G32) — velocity / forecast / deal scoring

E o tratamento de G9–G12 (deal-strategist) **não cria especialista novo** — vira a habilidade `estrategia-de-deal-complexo` sob `redator-de-propostas` (que já trata negociação). Justificativa: deal strategy é o trabalho **do AE que está fechando** (redator-de-propostas no Emporos), não um papel separado em squad-semente.

Reconciliação: **4 novos especialistas** no Emporos (5 → 9 agentes). *Correção: o resumo "5 → 10" acima estava errado por contar o deal-strategist como agente separado; o correto é* **5 → 9** *(1 chief + 4 originais + 4 novos)*.

### Pluto: 16 → 17 agentes (+1 especialista tier 1)
1. `pluto:hormozi-sales-coach` (G5–G8) — coaching de rep no estilo Hormozi

## Habilidades novas a criar (cumulativo)

### Emporos (existentes: 5)
1. `qbr-forward-looking` (G2)
2. `mapa-de-stakeholders` (G3)
3. `saude-de-conta` (G4)
4. `estrategia-de-deal-complexo` (G9 estende + G10/G11/G12 novos como sub-blocos)
5. `spin-selling` (G14)
6. `sandler-pain-funnel` (G15)
7. `upfront-contract` (G16)
8. `demo-invertida-por-impacto` (G19)
9. `poc-com-gate-binario` (G20)
10. `battlecard-fia` (G21)
11. `abm-account-tiering` (G27)
12. `pipeline-velocity` (G31)
13. `forecast-probabilistico-3-faixas` (G32)

**Total novas no Emporos: 13.** Pós-F6 o catálogo passa de 5 → 18 habilidades-âncora.

### Habilidades existentes do Emporos a estender (ADAPT)
- `qualificacao-bant-meddic` ← G9 (adiciona MEDDPICC e regra de escalonamento MEDDIC→MEDDPICC)
- `negociacao-e-fechamento` ← G17 (AECR + distribuição típica)
- `cadencia-de-outbound` ← G26 + G28 + G29 (signal-based + anatomia cold email + sequência 8-12)
- `redacao-de-proposta-comercial` ← G33 (win themes + 3 atos + exec summary)

### Pluto (existentes: nenhuma SKILL.md formal — squad opera por agentes/tasks; lacuna estrutural)
1. `coaching-oasp` (G6)
2. `call-coaching-temporal` (G7)
3. `ramp-30-60-90` (G8)

**Total novas no Pluto: 3** (criar `Pluto/.claude/skills/` e o `catalogo.md` no caminho — gap estrutural que o F6 corrige).

## Invariante de absorção sem perda

`count(ABSORVIDO) + count(DESCARTADO) + count(PERDIDO) == count(F3)`
= (4 REUSE + 6 ADAPT + 23 CREATE) + 0 + 0 = **33 == 33**. **PERDIDO = 0.** ✅

## Notas de procedência (a registrar no F7)

- **Procedência única upstream:** `msitarzewski/agency-agents@a597cb6` · divisão `sales/` (9 arquivos).
- **Licença:** confirmar no F7 (não inspecionada aqui — F2 já deu SAFE).
- **REUSE puro (G22/G23/G24/G25):** Pluto já contém os frameworks; o upstream **confirma** o DNA, não adiciona. Registrar como "convergência independente" no `dados/repositorios-absorvidos.yaml`.
- **CREATE de especialista (G1, G5, G13, G18, G30):** acionar `criacao-de-subagent` (Fase 5.2 de cada squad) na execução do F6.
- **ADAPT (6 habilidades):** acionar edição cirúrgica nos SKILL.md correspondentes — **sem cópia literal** do upstream.

## Pontas abertas para o F5/F6

1. **Fronteira Emporos × Afrodite (Olimpo/CRO):** os novos agentes (`gestor-de-contas-estrategicas`, `analista-de-pipeline`) operam métricas (NRR, velocity, forecast) que tocam o Afrodite (RevOps macro). Confirmar no F6 que o **veto `fora_da_politica`** continua sendo respeitado — Emporos é execução, Afrodite estratégia. Anotar handoff explícito no `squad.yaml`.
2. **Pluto sem `.claude/skills/`:** o squad opera só por agentes hoje (gap estrutural). Criar a pasta + `catalogo.md` no F6 é uma mudança estrutural, não cosmética. Validar com o Caos antes (Art. III — escopo do PRD).
3. **`coach-de-discovery` × `redator-de-propostas`:** discovery (G13–G16) acontece no início do funil; negociação (G17) no fim. Confirmar fronteira (quem aciona AECR — coach na descoberta ou redator no fechamento?). Decisão: AECR fica no redator (é objeção tardia); upfront contract e Sandler ficam no coach (é abertura).
4. **G7 (talk-listen ratio):** Hormozi tem opinião sobre isso (CLOSER), mas é menos clínico que o framework de coaching. Sub-bloco no `pluto:call-coaching-temporal` deve **citar** o CLOSER (cross-reference), não duplicá-lo.
