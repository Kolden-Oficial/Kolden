---
name: valuation-por-dcf
description: |
  Use quando precisar avaliar valor presente de uma operação/projeto/aquisição via Discounted Cash Flow.
  Cobre projeção de fluxos livres (FCFF), terminal value (Gordon + exit multiple), WACC,
  ponte enterprise→equity, análise de sensibilidade. NÃO substitui análise de M&A completa
  (que envolve due diligence — ROADMAP no Plutos). Para decisão de financiamento ou parceria,
  o DCF é insumo, não veredito.
domain: finance
subdomain: valuation
agente_dono: [modelador-financeiro]
heranca_historica: [aswath-damodaran-nyu, michael-mauboussin]
tags: [dcf, valuation, fcff, wacc, terminal-value, npv, sensibilidade]
fonte_upstream: msitarzewski--agency-agents@a597cb6 (G7)
status: semente-do-lote-2026-06-26 (refino pelo Ritual do Caos pendente)
---

> _Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (G7, MIT)._

## O que é DCF

Discounted Cash Flow é o método de valuation que estima o valor presente de uma operação trazendo seus fluxos de caixa futuros a uma taxa de desconto que reflete o risco. É a base teórica de qualquer avaliação intrínseca: o ativo vale a soma dos caixas que ele vai gerar, descontados.

## Estrutura

Duas variantes principais:

- **FCFF (Free Cash Flow to Firm)** — fluxo livre disponível a credores + acionistas; desconta pelo WACC; resulta em Enterprise Value (EV). Padrão para avaliação de empresa inteira.
- **FCFE (Free Cash Flow to Equity)** — fluxo livre disponível ao acionista (já líquido de juros e principal); desconta pelo custo de capital próprio (Re); resulta em Equity Value direto. Útil para bancos e empresas com estrutura de capital muito específica.

Padrão Pactolo: **FCFF** salvo quando houver razão explícita para FCFE.

## Componentes

### 1. Projeção de fluxos (5-10 anos explícitos)

Fórmula:

```
FCFF = EBIT × (1 − t) + D&A − CAPEX − ΔWC
```

Onde:
- **EBIT** — lucro operacional (antes de juros e IR)
- **t** — alíquota efetiva de IR
- **D&A** — depreciação + amortização (não-caixa, soma de volta)
- **CAPEX** — investimento em ativos fixos
- **ΔWC** — variação de capital de giro (aumento de WC consome caixa)

Construção **driver-based**:
- Receita = volume × preço (cada um com seu driver: market share, ticket médio, etc.)
- Margem operacional = trajetória explícita (não copiar último ano)
- t = efetivo histórico ajustado
- CAPEX/D&A/WC = ratios sobre receita, com convergência para steady-state no fim do horizonte

Horizonte: 5 anos para negócios maduros, 10 anos para early-stage/alto crescimento.

### 2. Terminal Value — usar 2 métodos

**Gordon Growth Model (crescimento perpétuo):**

```
TV = FCF(n+1) / (WACC − g)
```

Restrição: `g` ≤ taxa de crescimento de PIB nominal de longo prazo do país (Brasil ~5-6%). Acima disso a empresa cresce mais que o mundo perpetuamente, o que é impossível.

**Exit Multiple:**

```
TV = EBITDA(n) × Múltiplo
```

Múltiplo de referência: setor + comparáveis públicos + transações M&A recentes (3-5 anos).

**Regra:** calcular pelos dois métodos e comparar. Diferença > 30% acende flag — investigar premissas.

### 3. WACC — taxa de desconto

```
WACC = E/(D+E) × Re + D/(D+E) × Rd × (1−t)
```

- **E/(D+E), D/(D+E)** — pesos a valor de mercado (não contábil)
- **Re** — custo de capital próprio via CAPM: `Re = Rf + β × ERP`
- **Rd** — custo da dívida (yield-to-maturity, não taxa contratual antiga)

Para Brasil:
- **Rf** — NTN-B 2035+ (real) ou Treasury 10y + Brasil CDS (nominal USD)
- **β** — setorial reavaliado (Damodaran publica betas por setor); ajustar por alavancagem
- **ERP** — Equity Risk Premium local: ERP US (~5-6%) + Country Risk Premium (Brasil ~2.5-3.5%)

## Ponte Enterprise → Equity

```
Enterprise Value (EV) = Σ PV(FCFF anos explícitos) + PV(TV)

Equity Value = EV
             − Dívida líquida
             + Caixa não-operacional
             − Minoritários (participação a valor justo)
             − Pension underfunded (déficit atuarial)
             − Outros passivos quase-dívida (off-balance)
```

Valor por ação = Equity Value / Ações diluídas.

## Análise de sensibilidade (obrigatória)

DCF é teatro de precisão sobre premissas incertas. Sem sensibilidade, o número final é falso.

**Tornado com 5 variáveis** (ranqueadas por impacto):

1. Taxa de crescimento de receita
2. Margem operacional steady-state
3. CAPEX como % da receita
4. WACC
5. `g` terminal (Gordon) ou múltiplo (Exit)

**3 cenários:**

- Base — premissas centrais
- Otimista — premissas no P75
- Conservador — premissas no P25

Range razoável: ±20% no equity value entre base e extremos. Range maior = premissas frágeis demais para sustentar decisão.

## Anti-padrões

- **`g` terminal > PIB de longo prazo** — cresce mais que o mundo, matematicamente impossível
- **WACC com β=1 sem justificativa** — preguiça analítica; β setorial está disponível
- **Sem sensibilidade** — DCF vira teatro de precisão sobre incerteza
- **Calibração externa ausente** — comparar com múltiplos de mercado (EV/EBITDA, EV/Sales) é sanity check obrigatório. Se DCF dá 5× o múltiplo, errou alguma premissa
- **Horizonte explícito muito curto** — empresas em crescimento alto colocadas em TV cedo demais subestimam valor
- **WC ignorado** — ΔWC negativa em crescimento alto destrói caixa; pular essa linha é erro frequente

## Saída

- Deck com 1 página por componente (projeção, TV, WACC, ponte, sensibilidade)
- Planilha versionada (modelo + premissas separados em abas)
- Memo de 1 página: valor central, faixa, principais drivers, principais riscos

## Cross-links

- **Handoff para Plutos** — decisão executiva (aprovar/rejeitar/renegociar)
- **Handoff para Olimpo** — alinhamento estratégico (fit com tese, sinergias)
- **Cross-skill** — `Pactolo/.claude/skills/planejamento-de-headcount` quando valuation depende de ramp-up de equipe
- **Cross-skill** — `Prometeu/.claude/skills/matriz-de-risco-e-contingencia` para mapear riscos do plano
