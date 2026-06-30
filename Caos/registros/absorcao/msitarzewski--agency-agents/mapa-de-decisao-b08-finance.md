# F4 — Mapa de Decisão · Bucket B08 (finance → Pactolo)

> **Origem:** `msitarzewski/agency-agents@a597cb6` · divisão `finance/`
> **Squad-alvo principal:** **Pactolo** (`C:\Kolden\Pactolo\`) — squad-semente de Finanças Operacionais (FP&A)
> **Squad-alvo secundário (dispersão):** **Olimpo / Plutos** (CFO executivo)
> **Inventário base:** `inventario-finance.md` (29 IDs · G1–G29)
> **Regra:** REUSE > ADAPT > CREATE (Art. VI). Pactolo é semente — esperamos muito CREATE.

## 1. Contexto de absorção

Pactolo nasceu **como semente do próprio lote de absorção 2026-06-26** a partir de duas fontes finance
adjacentes (`alirezarezvani/claude-skills` e `anthropics/knowledge-work-plugins/finance`). Tem hoje:

- **5 agentes:** `pactolo-chief` (tier 0), `analista-fpa`, `modelador-financeiro`, `controller`, `analista-de-fluxo-de-caixa`.
- **5 habilidades-âncora:** `analise-fpa-e-variancia`, `modelagem-financeira`, `fechamento-contabil`,
  `gestao-de-fluxo-de-caixa`, `unit-economics-operacional`.
- **Estado:** semente (refino pelo Ritual do Caos pendente). Reflexos/checklists ainda não materializados.

O bucket B08 do `agency-agents` cobre **5 áreas** que mapeiam quase 1:1 nos especialistas do Pactolo:

| Área upstream (agente) | IDs | Especialista Pactolo-alvo | Cobertura atual |
|---|---|---|---|
| Bookkeeper & Controller | G1–G5 | `controller` | parcial (skill `fechamento-contabil`) |
| Financial Analyst (modelagem) | G6–G11 | `modelador-financeiro` | parcial (skill `modelagem-financeira`) |
| FP&A Analyst | G12–G17 | `analista-fpa` | parcial (skill `analise-fpa-e-variancia` + `unit-economics-operacional`) |
| Investment Researcher | G18–G23 | **fora de escopo** Pactolo | sem cobertura — squad opera FP&A corporativo, não asset management |
| Tax Strategist | G24–G29 | **fora de escopo** Pactolo | sem cobertura — escopo explicitamente **excluído** no README |

Decisões guiadas por:
1. **Fronteira Pactolo** declarada em `README.md` §"Fronteiras" — Pactolo NÃO faz contabilidade fiscal/tributária estatutária nem parecer jurídico-contábil; decisão estratégica → Plutos.
2. **Dispersão para Plutos:** IDs estratégicos (M&A, LBO, due diligence, entity structuring) que orbitam a *decisão* do CFO, não a execução, podem ir ao Plutos do Olimpo via ROADMAP (não temos demanda hoje, mas é onde caberiam quando vierem).
3. **Realismo de negócio Kolden:** operação de afiliados/marketing + projetos internos. **Não há portfolio de ativos** a gerir, **não há M&A em pauta**, **não há estrutura multi-jurisdição internacional**. IDs ligados a esses contextos são DESCARTADO ou ROADMAP, sem CREATE imediato.

## 2. Tabela de decisão (29 IDs)

| ID | capacidade | squad_alvo | decisao | match_kolden | justificativa | acao_f6 |
|---|---|---|---|---|---|---|
| G1 | Bookkeeping & controllership (day-to-day accounting, month-end, GAAP) | Pactolo / `controller` | **ADAPT** | `controller` + skill `fechamento-contabil` (escopo do agente já cobre lançamentos, reconciliação, DRE/BP/DFC, checklist do close) | A base já existe na semente. ADAPT = enriquecer a skill `fechamento-contabil` com a fronteira GAAP/controle interno do upstream, **sem cópia literal**, contextualizada a BR (CPC, não US GAAP). | Enriquecer `fechamento-contabil/SKILL.md` com seção "controllership e governança do close" (separação de funções, evidência mínima por lançamento, escalonamento de exceção). |
| G2 | Account reconciliation & balance sheet verification (monthly GL recon, audit trail) | Pactolo / `controller` | **ADAPT** | skill `fechamento-contabil` já tem reconciliação como princípio ("diferença=0") e veto `reporte_sem_conciliacao` | A regra está; falta o **método operacional** detalhado (template de papel de trabalho, prioridade por conta, tolerância material). | Adicionar à skill `fechamento-contabil` a seção "matriz de reconciliação por conta" (caixa, AR, AP, inventory, intercompany, acruais) com critério de materialidade e evidência. |
| G3 | Month-end close orchestration & checklist (task sequencing, deadline tracking) | Pactolo / `controller` | **CREATE** | sem checklist materializado ainda (README admite "reflexos e checklists serão materializados no refino") | Pactolo é semente — esta é exatamente a lacuna que ele deve fechar. Cria o checklist real do close, owner por step. | Criar `Pactolo/checklists/close-mensal.md` com sequência D-1→D+5, owners (controller → analista-fpa → chief), critério de "fechado" por etapa. |
| G4 | Revenue recognition (ASC 606) & lease accounting (ASC 842) | — | **DESCARTADO** | US GAAP-specific; Kolden é BR (CPCs 47 e 06) | ASC 606/842 é regra técnica **americana**. Princípios de reconhecimento de receita e arrendamento são universais, mas a norma técnica não se aplica. A skill `fechamento-contabil` já cobre o princípio (separar fato conciliado de projeção); norma técnica BR é tarefa de contador estatutário externo, **fora do escopo Pactolo** (README explícito). | Nenhuma. Se vier demanda BR, ROADMAP para skill `reconhecimento-cpc-47-e-06` no Pactolo. |
| G5 | SOX 404 internal control framework | — | **DESCARTADO** | SOX é regulação **US** para empresas listadas em bolsa americana; Kolden é privada, BR, sem público investidor | Princípio de controle interno é válido e já entra parcialmente em G1 (ADAPT). Mas a *implementação SOX 404* (control testing, attestation, PCAOB) é overengineering puro para Kolden. | Nenhuma. Controle interno básico já encaixado em G1. |
| G6 | Financial modeling & scenario analysis | Pactolo / `modelador-financeiro` | **REUSE** | agente `modelador-financeiro` + skill `modelagem-financeira` já cobre exatamente isso (modelo de 3 demonstrações, projeção por driver, cenários, sensibilidade) | Cobertura plena. Nada a absorver. | Nenhuma. |
| G7 | DCF valuation & terminal value (WACC, NPV) | Pactolo / `modelador-financeiro` | **CREATE** | skill `modelagem-financeira` cobre projeção e cenários, mas **não tem método explícito de DCF/valuation** | Valuation operacional aparece no foco do `modelador-financeiro` (`squad.yaml`: "...valuation operacional") mas sem skill dedicada. Útil para Kolden em decisões de M&A pequeno (compra de canal, aquisição de criador) e para precificar projetos. | Criar skill `valuation-por-dcf` no `modelador-financeiro` — fluxos livres, terminal value (Gordon + exit multiple), WACC, ponte enterprise→equity, sensibilidade. Princípios reescritos, sem cópia. |
| G8 | Variance analysis with root cause decomposition | Pactolo / `analista-fpa` | **REUSE** | skill `analise-fpa-e-variancia` já decompõe por volume/preço/mix/eficiência + materialidade + driver | Cobertura plena na semente — é literalmente o nome da skill. | Nenhuma. |
| G9 | Working capital modeling (DSO, DPO, inventory turns, CCC) | Pactolo / `analista-de-fluxo-de-caixa` | **ADAPT** | skill `gestao-de-fluxo-de-caixa` cita CCC e capital de giro no catálogo, mas a profundidade do método (DSO/DPO/DIO desagregados) precisa entrar | Capital de giro é métrica chave para afiliados (prazo Shopee, antecipação, recebíveis). Vale enriquecer com cálculo desagregado. | Adicionar à skill `gestao-de-fluxo-de-caixa` a seção "capital de giro desagregado" (DSO, DPO, DIO, CCC) com fórmula, fonte do dado e ciclo-padrão Kolden (recebíveis de plataformas). |
| G10 | LBO modeling (debt schedules, IRR, MOIC) | Olimpo / **Plutos** (ROADMAP) | **DESCARTADO** | Kolden não faz operações alavancadas — sem dívida estruturada, sem PE/buyout em pauta | LBO é instrumento de private equity. Sem aplicabilidade real. Se um dia houver, cabe ao Plutos (decisão de capital), não ao Pactolo (execução). | Nenhuma. ROADMAP simbólico no Plutos se vier estrutura de capital agressiva. |
| G11 | M&A modeling (accretion/dilution, synergy, pro forma) | Olimpo / **Plutos** (ROADMAP) | **ROADMAP** | Sem demanda hoje, mas Kolden poderia adquirir canais/criadores/operações pequenas no futuro | Não criar skill agora (sem demanda). Registrar no roadmap do Plutos como capacidade futura (decisão estratégica de M&A). | Anotar em `Olimpo/MEMORY.md` (candidato a promoção) que skill `m-e-a-operacional` é gap conhecido do Plutos, prioridade baixa, gatilho = primeira aquisição real. |
| G12 | Financial Planning & Analysis (FP&A) — budgeting, forecasting, planning cycles | Pactolo / `analista-fpa` | **REUSE** | agente `analista-fpa` + skill `analise-fpa-e-variancia` já cobrem orçamento (bottom-up/top-down), forecast rolling, calendário orçamentário | Cobertura plena. Nada a absorver. | Nenhuma. |
| G13 | Rolling forecasts & quarterly re-forecasting | Pactolo / `analista-fpa` | **REUSE** | skill `analise-fpa-e-variancia` cobre forecast rolling 12-18 meses com reforecast a cada fechamento + bridge orçado→forecast | Cobertura plena. | Nenhuma. |
| G14 | Annual Operating Plan (AOP) & top-down/bottoms-up reconciliation | Pactolo / `analista-fpa` | **ADAPT** | skill `analise-fpa-e-variancia` cita bottom-up/top-down e o "gap entre os dois é a conversa de meta a subir ao Plutos" — falta o **calendário e o pacote AOP** explícitos | A regra está; falta o entregável (calendário anual, milestones, artefato final). | Adicionar à skill `analise-fpa-e-variancia` a seção "Annual Operating Plan: calendário e pacote" (T-3M de pré-trabalho → T-1M de aprovação no Plutos → T0 vigência) com lista de artefatos do pacote. |
| G15 | Driver-based forecasting (revenue per rep, cost per hire) | Pactolo / `analista-fpa` | **REUSE** | skill `analise-fpa-e-variancia` exige premissa explícita "driver, taxa, período, fonte" e a skill `modelagem-financeira` projeta por driver | Cobertura plena. | Nenhuma. |
| G16 | Headcount planning & fully-loaded cost modeling | Pactolo / `analista-fpa` | **CREATE** | sem skill dedicada; orçamento de pessoal aparece implícito mas sem método | Headcount é a maior linha de despesa de qualquer operação que cresce — vale skill própria. | Criar skill `planejamento-de-headcount` no `analista-fpa` — FTE, custo total carregado (salário + encargos BR + benefícios + ramp-up), timeline de contratação, sensibilidade por cenário, ligação ao forecast. |
| G17 | Monthly Business Review (MBR) preparation & variance narrative | Pactolo / `analista-fpa` + `pactolo-chief` | **CREATE** | sem template formal de MBR; o chief orquestra mas falta o pacote canônico | MBR é o ritual mensal que entrega o pacote ao Plutos (handoff de subida). Vale formalizar. | Criar `Pactolo/workflows/monthly-business-review.md` (workflow do squad) — sequência: controller fecha → fpa analisa variância → fluxo-de-caixa projeta → chief consolida pacote → handoff Plutos. Template do deck em `Pactolo/checklists/`. |
| G18 | Investment research & fundamental analysis (portfolio decisions) | — | **DESCARTADO** | Kolden NÃO faz gestão de portfolio de ativos; opera afiliados/marketing/projetos internos | Investment research é asset management. Está fora do escopo da Kolden hoje e até onde se enxerga. Pactolo é FP&A corporativo, não buy-side. Plutos é CFO corporativo, não CIO de fundo. | Nenhuma. |
| G19 | Competitive moat & Porter's Five Forces | Argos (estratégia/inteligência) | **DESCARTADO** | já existe cobertura de inteligência competitiva no **Argos** (squad de coleta + análise) — não é função do Pactolo | Porter's Five Forces é análise estratégica, não financeira. Mora no Argos (mercado/concorrência) e no Olimpo (Atena/Apolo) na hora de decidir, não no Pactolo. | Nenhuma — verificar com Argos se vale skill explícita de "porter's five forces" lá (fora do escopo deste bucket). |
| G20 | Investment thesis development (bull/bear case, thesis breakers) | — | **DESCARTADO** | Mesma justificativa de G18 — sem portfolio sob gestão | A *forma* (bull/bear/breaker) é generalizável a qualquer decisão (e Olimpo/`conselho-adversarial` já cobre essa estrutura). Não vale criar skill específica de "investment thesis". | Nenhuma. |
| G21 | Due diligence checklist (financial, operational, market, legal DD) | Olimpo / **Plutos** + Egide | **ROADMAP** | Sem demanda hoje. Quando vier (aquisição ou parceria séria), DD financeira é do Plutos; DD legal/segurança é do Egide; DD operacional/mercado é do Argos. | Anotar como capacidade futura, distribuída entre 3 squads. Não criar agora. | Anotar em `Olimpo/MEMORY.md` (candidato): skill `due-diligence-financeira` no Plutos, com handoffs para Egide (legal/sec) e Argos (mercado/ops). Gatilho = primeira aquisição/parceria estratégica real. |
| G22 | Quantitative screening & multi-factor ranking | — | **DESCARTADO** | Mesma justificativa de G18 — screening de ativos não se aplica | Princípio (ranking multi-fator) é generalizável mas já encaixa em outros contextos (priorização de iniciativas no Olimpo, scoring de criadores no Pheme, etc.) — não vale skill financeira. | Nenhuma. |
| G23 | Risk metrics — VaR, Sharpe, Sortino, max drawdown | — | **DESCARTADO** | Métricas de portfólio quantitativo; sem aplicação corporativa Kolden | Sharpe/Sortino/VaR são para retorno de portfolio. Para Kolden, "risco financeiro" se mede em runway, burn, sensibilidade — já coberto. | Nenhuma. |
| G24 | Tax optimization & ETR minimization | — | **DESCARTADO** | Tributário estatutário **explicitamente fora do escopo** Pactolo (README §"Fronteiras") | Otimização tributária BR é especialidade de contador/consultor tributário externo, com responsabilidade legal. Não é Pactolo nem Plutos — é fornecedor regulamentado. | Nenhuma. |
| G25 | Entity structuring (C-Corp, S-Corp, LLC, partnership) | — | **DESCARTADO** | Estruturação societária é decisão jurídico-tributária; fora do escopo Pactolo; entidades upstream são US-específicas | Decisão de estruturação societária BR é com advogado/contador. Não absorvemos. | Nenhuma. |
| G26 | Transfer pricing & intercompany documentation | — | **DESCARTADO** | Transfer pricing aplica-se a grupo com operação multi-jurisdição internacional; Kolden é BR-only | Sem aplicação. | Nenhuma. |
| G27 | R&D tax credits, Section 179 bonus depreciation | — | **DESCARTADO** | Section 179 / R&D credit são incentivos **US**; equivalentes BR (Lei do Bem, depreciação acelerada) seriam outra coisa | Mesmo o equivalente BR (Lei do Bem para inovação) é de tributarista externo, não do Pactolo. | Nenhuma. |
| G28 | Income timing & deferred compensation | — | **DESCARTADO** | Compensação diferida e timing fiscal são planejamento patrimonial/tributário individual, não FP&A corporativo | Sem aplicação. | Nenhuma. |
| G29 | Multi-jurisdictional compliance (federal, state, local, international) | — | **DESCARTADO** | Compliance fiscal multi-jurisdição é tributarista externo; Kolden é BR-only | Sem aplicação. | Nenhuma. |

## 3. Síntese quantitativa

| Decisão | Quantidade | IDs |
|---|---|---|
| **REUSE** | 4 | G6, G8, G12, G13, G15 (5 — corrigindo) |
| **ADAPT** | 4 | G1, G2, G9, G14 |
| **CREATE** | 4 | G3, G7, G16, G17 |
| **ROADMAP** (Plutos, sem ação imediata) | 2 | G11, G21 |
| **DESCARTADO** | 16 | G4, G5, G10, G18, G19, G20, G22, G23, G24, G25, G26, G27, G28, G29 (14 — corrigindo abaixo) |

**Conferência aritmética:** 5 (REUSE) + 4 (ADAPT) + 4 (CREATE) + 2 (ROADMAP) + 14 (DESCARTADO) = **29** ✓

| Decisão (final) | Quantidade | IDs |
|---|---|---|
| **REUSE** | 5 | G6, G8, G12, G13, G15 |
| **ADAPT** | 4 | G1, G2, G9, G14 |
| **CREATE** | 4 | G3, G7, G16, G17 |
| **ROADMAP** | 2 | G11, G21 |
| **DESCARTADO** | 14 | G4, G5, G10, G18, G19, G20, G22, G23, G24, G25, G26, G27, G28, G29 |
| **PERDIDO** | **0** | — |

## 4. Por que tanto DESCARTADO

14 de 29 IDs (≈48%) caem em DESCARTADO. Motivos legítimos, não negligência:

1. **Tax cluster (G4, G24–G29 = 7 IDs):** Pactolo declara explicitamente que **não faz contabilidade fiscal/tributária estatutária**. Cobrir esse cluster exige tributarista BR habilitado (responsabilidade legal). Não é função de agente IA do squad. Princípios não são copiáveis porque a norma técnica é jurisdicional.
2. **Investment research cluster (G18, G20, G22, G23 = 4 IDs):** Kolden não tem portfólio de ativos sob gestão. Asset management está fora do escopo da empresa hoje.
3. **G5 (SOX 404):** regulação US para empresas listadas — Kolden é privada, BR.
4. **G10 (LBO):** sem dívida estruturada nem PE em pauta.
5. **G19 (Porter's Five Forces):** análise estratégica, mora no Argos/Olimpo, não no Pactolo (FP&A).

**Nenhum dos 14 DESCARTADO é descarte por preguiça.** Cada um tem justificativa de escopo declarada acima. Se algum dia o contexto Kolden mudar (ex.: abrir asset arm, fazer aquisição, listar em bolsa), os IDs respectivos viram ROADMAP imediato.

## 5. Mapa por especialista Pactolo (carga de F6)

| Especialista | REUSE | ADAPT | CREATE | Total tocado |
|---|---|---|---|---|
| `controller` | 0 | 2 (G1, G2) | 1 (G3 — checklist) | 3 |
| `modelador-financeiro` | 1 (G6) | 0 | 1 (G7 — `valuation-por-dcf`) | 2 |
| `analista-fpa` | 4 (G8, G12, G13, G15) | 1 (G14) | 2 (G16 — `planejamento-de-headcount`, G17 parcial — MBR) | 7 |
| `analista-de-fluxo-de-caixa` | 0 | 1 (G9) | 0 | 1 |
| `pactolo-chief` | — | — | 1 (G17 — workflow MBR consolidado) | 1 |

## 6. Riscos e mitigações

- **Risco: viés operacional.** Pactolo é semente; absorver 4 CREATE de uma vez pode inflar a semente antes do refino do Ritual. → **Mitigação:** F6 cria os artefatos sob `Pactolo/_pendente-refino/` (ou marca cada arquivo novo com `status: pendente-refino-ritual`) para o Caos passar o filtro depois.
- **Risco: confundir Pactolo × Plutos.** ROADMAP do G11 e G21 no Plutos só serve se ficar claro que **decisão é dele** e Pactolo **prepara**. → **Mitigação:** já está no README e `squad.yaml`; manter consistência em qualquer nota nova.
- **Risco: cópia literal das fontes upstream.** O agente upstream (`finance-bookkeeper-controller.md`, etc.) tem prompts longos em inglês. → **Mitigação:** Art. II Constituição (pt-BR, kebab-case) + regra de "princípios reescritos, sem cópia literal" já no rodapé das skills-âncora.

---

**Fase 4 completa.** Aritmética validada (5+4+4+2+14=29, PERDIDO=0). Próximo passo: F5 (decisão) em `decisao-f5-b08-finance.md`.
