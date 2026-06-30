# F5 — Decisão de Absorção · Bucket B08 (finance → Pactolo + Plutos)

> **Origem:** `msitarzewski/agency-agents@a597cb6` · divisão `finance/`
> **Squad-alvo principal:** **Pactolo** (`C:\Kolden\Pactolo\`) — semente do lote 2026-06-26
> **Squad-alvo secundário (ROADMAP):** **Olimpo / Plutos** (CFO)
> **Mapa base:** `mapa-de-decisao-b08-finance.md` (F4)
> **Inventário base:** `inventario-finance.md` — 29 IDs (G1–G29)
> **Invariante:** ABSORVIDO + DESCARTADO + PERDIDO = 29; **PERDIDO = 0**

## 1. Sumário executivo

O bucket B08 trouxe **5 agentes upstream × 29 capacidades** do `agency-agents` (Bookkeeper-Controller, Financial Analyst, FP&A Analyst, Investment Researcher, Tax Strategist). Mapeamento ao Kolden, com Pactolo já existindo como **semente de FP&A operacional**, deixa um quadro claro:

- O upstream cobre **dois territórios fora do escopo Kolden**: tributário estatutário (tarefa de contador externo) e investment research / asset management (Kolden não opera fundo). Esses dois clusters somam **11 IDs DESCARTADO legítimos**.
- O **núcleo de FP&A** (bookkeeping/controllership, modelagem, planejamento, fluxo de caixa, unit economics) **encaixa quase 1:1 no Pactolo**, com `REUSE` onde a semente já cobre e `ADAPT/CREATE` onde a profundidade faltava (calendário do close, headcount planning, MBR, DCF/valuation, capital de giro desagregado).
- IDs estratégicos (M&A, due diligence) ficam em **ROADMAP** no Plutos, sem ação imediata — Kolden não tem demanda hoje.

**Resultado:** 5 REUSE + 4 ADAPT + 4 CREATE = **13 ABSORVIDOS** (no Pactolo). **2 ROADMAP** (no Plutos, sem absorção imediata). **14 DESCARTADO** (todos com justificativa de escopo). **PERDIDO = 0.**

## 2. Decisão final

### 2.1. ABSORVIDOS no Pactolo (13)

#### REUSE (5) — cobertura plena já existe na semente

| ID | Capacidade | Justificativa |
|---|---|---|
| **G6** | Financial modeling & scenario analysis | Agente `modelador-financeiro` + skill `modelagem-financeira` já cobrem modelo de 3 demonstrações, projeção por driver, cenários e sensibilidade. |
| **G8** | Variance analysis com decomposição por causa | Skill `analise-fpa-e-variancia` já decompõe por volume/preço/mix/eficiência + materialidade + driver obrigatório. |
| **G12** | FP&A — budgeting, forecasting, planning cycles | Agente `analista-fpa` é o cargo upstream traduzido; skill `analise-fpa-e-variancia` cobre bottom-up/top-down e calendário. |
| **G13** | Rolling forecasts & quarterly reforecast | Skill `analise-fpa-e-variancia` já prescreve "horizonte 12-18 meses, atualizado a cada fechamento (reforecast)" + bridge orçado→forecast. |
| **G15** | Driver-based forecasting | Tanto `analise-fpa-e-variancia` quanto `modelagem-financeira` exigem "premissa explícita por linha: driver, taxa, período, fonte". |

#### ADAPT (4) — base existe; enriquecer com método/template

| ID | Capacidade | O que adicionar | Onde |
|---|---|---|---|
| **G1** | Bookkeeping & controllership | Seção "controllership e governança do close" (separação de funções, evidência mínima por lançamento, escalonamento de exceção) | `Pactolo/.claude/skills/fechamento-contabil/SKILL.md` |
| **G2** | Reconciliation & balance sheet verification | Seção "matriz de reconciliação por conta" (caixa, AR, AP, inventory, intercompany, accruals) com critério de materialidade e evidência | `Pactolo/.claude/skills/fechamento-contabil/SKILL.md` |
| **G9** | Working capital (DSO, DPO, inventory turns, CCC) | Seção "capital de giro desagregado" (DSO, DPO, DIO, CCC) com fórmula, fonte e ciclo-padrão Kolden (recebíveis de plataformas como Shopee) | `Pactolo/.claude/skills/gestao-de-fluxo-de-caixa/SKILL.md` |
| **G14** | Annual Operating Plan + reconciliação top-down/bottom-up | Seção "Annual Operating Plan: calendário e pacote" (T-3M pré-trabalho → T-1M aprovação Plutos → T0 vigência) com lista de artefatos | `Pactolo/.claude/skills/analise-fpa-e-variancia/SKILL.md` |

#### CREATE (4) — gap real na semente

| ID | Capacidade | Artefato a criar | Onde |
|---|---|---|---|
| **G3** | Month-end close orchestration & checklist | `checklists/close-mensal.md` — sequência D-1→D+5, owners por step (controller → analista-fpa → chief), critério de "fechado" por etapa | `Pactolo/checklists/close-mensal.md` |
| **G7** | DCF valuation & terminal value | Nova skill `valuation-por-dcf` — fluxos livres, terminal value (Gordon + exit multiple), WACC, ponte enterprise→equity, sensibilidade | `Pactolo/.claude/skills/valuation-por-dcf/SKILL.md` (dono: `modelador-financeiro`) |
| **G16** | Headcount planning & fully-loaded cost | Nova skill `planejamento-de-headcount` — FTE, custo total carregado (salário + encargos BR + benefícios + ramp-up), timeline de contratação, sensibilidade por cenário, ligação ao forecast | `Pactolo/.claude/skills/planejamento-de-headcount/SKILL.md` (dono: `analista-fpa`) |
| **G17** | Monthly Business Review prep & variance narrative | (a) Workflow `workflows/monthly-business-review.md` — sequência controller→fpa→caixa→chief→handoff Plutos. (b) Template do deck em `checklists/template-mbr.md`. | `Pactolo/workflows/monthly-business-review.md` + `Pactolo/checklists/template-mbr.md` |

### 2.2. ROADMAP no Plutos (2) — sem absorção imediata, registrar candidato

| ID | Capacidade | Squad | Gatilho de promoção |
|---|---|---|---|
| **G11** | M&A modeling (accretion/dilution, synergy, pro forma) | Olimpo / Plutos | Primeira aquisição/parceria real (canal, criador, operação). Anotar em `Olimpo/MEMORY.md` na seção "Candidatos a Promoção". |
| **G21** | Due diligence checklist (financial, operational, market, legal) | Olimpo / Plutos (+ handoffs Egide e Argos) | Mesmo gatilho de G11. DD distribuída: financeira = Plutos; legal/sec = Egide; mercado/ops = Argos. Anotar em `Olimpo/MEMORY.md`. |

**Por que ROADMAP e não DESCARTADO:** M&A e DD são capacidades **plausíveis para Kolden em horizonte 12-24M**. Marcá-las como esquecidas é arriscado; marcá-las como candidatas com gatilho explícito preserva o aprendizado sem inflar o squad agora.

### 2.3. DESCARTADO (14) — fora do escopo Kolden

| ID | Capacidade | Por que descartar |
|---|---|---|
| **G4** | Revenue recognition ASC 606 & lease accounting ASC 842 | US GAAP-specific. Kolden é BR (CPC 47 e CPC 06). Norma técnica jurisdicional. |
| **G5** | SOX 404 internal control framework | Regulação US para empresas listadas na NYSE/Nasdaq. Kolden é privada, BR, sem público investidor. |
| **G10** | LBO modeling (debt schedules, IRR, MOIC) | Sem dívida estruturada, sem PE/buyout em pauta. |
| **G18** | Investment research & fundamental analysis (portfolio) | Kolden não opera asset management. |
| **G19** | Competitive moat & Porter's Five Forces | Análise estratégica, mora no Argos/Olimpo (Atena/Apolo), não em squad financeiro. |
| **G20** | Investment thesis (bull/bear/breaker) | Mesma razão de G18; estrutura genérica já coberta pelo `conselho-adversarial` do Olimpo. |
| **G22** | Quantitative screening multi-fator | Mesma razão de G18; padrão multi-fator de ranking já generalizado em outros contextos. |
| **G23** | Risk metrics (VaR, Sharpe, Sortino, max drawdown) | Métricas de portfólio quantitativo. Risco corporativo Kolden se mede em runway, burn, sensibilidade (coberto). |
| **G24** | Tax optimization & ETR | Tributário estatutário **explicitamente fora do escopo Pactolo** (README §"Fronteiras"). Tarefa de tributarista externo habilitado, com responsabilidade legal. |
| **G25** | Entity structuring (C-Corp, S-Corp, LLC, partnership) | Estruturação societária BR é de advogado/contador, e as entidades upstream são US-específicas. |
| **G26** | Transfer pricing & intercompany docs | Aplica-se a grupos multi-jurisdição internacional; Kolden é BR-only. |
| **G27** | R&D tax credits, Section 179 bonus depreciation | Incentivos US. Equivalente BR (Lei do Bem, depreciação acelerada) é de tributarista externo. |
| **G28** | Income timing & deferred compensation | Planejamento patrimonial/tributário individual, não FP&A corporativo. |
| **G29** | Multi-jurisdictional compliance (fed/state/local/intl) | Tributarista externo; Kolden é BR-only. |

**Princípio:** todo DESCARTADO acima é por **incompatibilidade real de escopo Kolden ou de jurisdição**, não por preguiça ou desconhecimento. Se o contexto da empresa mudar (asset arm, listagem em bolsa, internacionalização, M&A), o ID respectivo se torna ROADMAP imediato.

## 3. Carga de F6 por especialista (consolidado)

| Alvo | Artefatos a tocar em F6 | Tipo |
|---|---|---|
| `controller` | ADAPT em `fechamento-contabil/SKILL.md` (2 seções: G1 + G2) + CREATE de `checklists/close-mensal.md` (G3) | 1 skill enriquecida + 1 checklist novo |
| `modelador-financeiro` | CREATE de `valuation-por-dcf/SKILL.md` (G7) | 1 skill nova |
| `analista-fpa` | ADAPT em `analise-fpa-e-variancia/SKILL.md` (1 seção AOP — G14) + CREATE de `planejamento-de-headcount/SKILL.md` (G16) + CREATE parcial de `template-mbr.md` (G17) | 1 skill enriquecida + 1 skill nova + 1 template |
| `analista-de-fluxo-de-caixa` | ADAPT em `gestao-de-fluxo-de-caixa/SKILL.md` (1 seção capital de giro — G9) | 1 skill enriquecida |
| `pactolo-chief` (squad-level) | CREATE de `workflows/monthly-business-review.md` (G17) | 1 workflow novo |
| `Olimpo/Plutos` (ROADMAP) | Anotar 2 candidatos em `Olimpo/MEMORY.md` — `m-e-a-operacional` (G11) e `due-diligence-financeira` (G21) | 2 entradas de candidato (sem skill ainda) |

**Estimativa de F6:** ~7 escritas no Pactolo + 1 entrada no MEMORY do Olimpo. Todos os artefatos novos do Pactolo nascem com rodapé `status: semente-do-lote-2026-06-26 (refino pelo Ritual do Caos pendente)` para consistência com o resto da semente.

## 4. Conformidade com a Constituição

- **Art. II (pt-BR, kebab-case):** todas as skills/agentes/arquivos novos seguem o padrão. Termos US-specific (GAAP, SOX, ASC 606) ficam DESCARTADOS, não traduzidos forçadamente.
- **Art. III (PRD aprovado antes de escrever):** F4+F5 são apenas decisões; F6 (aplicação) virá em sessão separada e respeita o gate de aprovação humana do Ritual.
- **Art. IV (sem invenção de capacidade):** todo CREATE deriva de capacidade observada no upstream (`agency-agents`), com justificativa explícita.
- **Art. VI (REUSE > ADAPT > CREATE):** ordem respeitada. 5 REUSE + 4 ADAPT antes dos 4 CREATE. Taxa de reuso ≥ 1 por criação atingida com folga.
- **Art. VII (Infisical):** nenhuma das skills criadas exige credencial — são metodologias. Caso uma delas venha a precisar de API externa (ex.: cotação de WACC), credencial via Infisical.
- **Art. VIII (Absorção sem perda):** invariante respeitado abaixo.

## 5. Invariante de absorção

```
ABSORVIDO (13) + ROADMAP (2) + DESCARTADO (14) = 29 ✓
PERDIDO = 0 ✓
```

**Conferência por ID (29 contagens):**

- REUSE: G6, G8, G12, G13, G15 → **5**
- ADAPT: G1, G2, G9, G14 → **4**
- CREATE: G3, G7, G16, G17 → **4**
- ROADMAP: G11, G21 → **2**
- DESCARTADO: G4, G5, G10, G18, G19, G20, G22, G23, G24, G25, G26, G27, G28, G29 → **14**
- **Soma:** 5 + 4 + 4 + 2 + 14 = **29 ✓**

Cada um dos 29 IDs do inventário tem decisão registrada acima. PERDIDO = 0.

## 6. Notas finais

1. **Pactolo continua semente.** Esta absorção não promove o squad — apenas preenche lacunas operacionais identificadas. O **refino completo pelo Ritual do Caos (9 fases)** segue pendente. Os artefatos novos herdam o `status: semente-do-lote-2026-06-26 (refino pelo Ritual do Caos pendente)`.
2. **Não há demanda imediata de M&A nem DD.** ROADMAP é registro de capacidade ausente, não plano de execução. Não criar skill agora.
3. **Tributário e investment research são fronteiras reais.** Não cruzar — Pactolo declarou no README. Se Ronan quiser, abre-se *outro* squad (ex.: "Hermes-Tributário" como camada de orquestração para contador externo) — mas isso é decisão separada, não absorção B08.
4. **Sub-divisão Pactolo × Plutos preservada.** Pactolo prepara; Plutos decide. Toda nova skill do Pactolo respeita esse princípio (ex.: `valuation-por-dcf` entrega cenário, não "vai/não vai" da aquisição).

---

**Fase 5 completa.** Decisão consolidada. Próximo: F6 (aplicação) — fora do escopo desta sessão de mapeamento.
