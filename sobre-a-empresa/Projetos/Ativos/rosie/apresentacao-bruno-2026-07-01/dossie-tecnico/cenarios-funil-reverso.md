# Cenários e Funil Reverso — Rosie 90 dias — **v2**

> **v2 — recalculado com M1=R$80k em 2026-07-01 (sobrescreve v1).**
> Único vetor de mudança oficial vs. v1: a meta M1 subiu de R$70k para **R$80k**. M2 e M3 permanecem em R$100k e R$150k. Toda a arquitetura do modelo, os drivers, os 3 cenários e a sensibilidade permanecem — só as comparações contra meta, o gatilho de flag e as recomendações foram reaplicadas com o novo M1. O placeholder de AOV real (F0.1) foi mantido; será substituído em ~15min quando o Ronan puxar o dado do Nuvemshop.
>
> **Autor:** squad Pactolo (pactolo-chief + modelador-financeiro + analista-fpa)
> **Data:** 2026-07-01
> **Missão:** `m-20260701-112935-rosie-90d`
> **Cliente:** Rosie — e-commerce moda feminina premium
> **Meta oficial travada (Ronan, 2026-07-01):** M1=R$80k / M2=R$100k / M3=R$150k
> **Budget mídia travado:** R$5k/mês fixo (Bruno paga)
> **Contrato Kolden:** R$4k fixo + 3% do faturamento de tráfego pago
>
> **Regra de rastreabilidade:** cada número carrega tag `[VALIDADO — fonte]`, `[BENCHMARK — fonte]`, `[INFERIDO — base]`, `[HIPÓTESE — testar em D+N]` ou `[PENDENTE — F0.N]`. Dado sem tag = defeito.
>
> **Aviso F0 aberto:** dossiê lavrado com F0 (dados-fonte) parcialmente pendente. Drivers marcados `[PENDENTE — F0.1/F0.2/F0.3]` serão reconciliados assim que Bruno entregar (esperado D+2). Ao reconciliar, revisar os 3 cenários e a sensibilidade — estrutura do modelo permanece; números finais dependem do F0.

---

## 1. Arquitetura do modelo

Funil reverso orientado a driver: o faturamento mensal não é meta, é **produto de decisões observáveis** sobre budget, custo de mídia, conversão do site e ticket. A mesma máquina responde "quanto conseguimos com R$5k?" e "quanto precisaríamos para bater R$150k?".

### 1.1 Equação-mestre (por canal, por mês)

```
Faturamento_pago(canal) = Budget(canal) × ROAS(canal)
Faturamento_pago(total) = Σ Faturamento_pago(canal)
Faturamento_total       = Faturamento_pago(total) / (1 − share_organico)
Sessões_pagas(canal)    = Budget(canal) / CPC(canal) × click_to_session
Pedidos_pagos(canal)    = Sessões_pagas(canal) × CVR_site
Ticket_médio            = Faturamento_pago(canal) / Pedidos_pagos(canal)   ← check
CAC_pago                = Budget(total) / Pedidos_pagos(total)
Break-even_fixo         = R$4.000 / 3% = R$133.333 de faturamento pago
```

### 1.2 Drivers do modelo

| Driver | Símbolo | Fonte esperada (F0) | Fallback (este documento) |
|---|---|---|---|
| Ticket médio (AOV) | `AOV` | Nuvemshop, últimos 30d | `R$180–R$280 [BENCHMARK — moda feminina premium BR]` + `R$250 [INFERIDO — mediana da faixa]` <!-- AOV_REAL_AQUI --> `[F0.1 — atualizar em D+0.5, Ronan puxando do Nuvemshop agora]` |
| Margem líquida do produto | `m_bruta` | DRE Rosie | `40% [BENCHMARK — apparel premium BR]` + `[PENDENTE — F0.2]` |
| CVR site (visitante → pedido) | `CVR` | GA4 + Nuvemshop | `1,5% [BENCHMARK — e-commerce fashion BR]` + `[PENDENTE — F0.3]` |
| CPC blended (Meta+Google) | `CPC` | Ads Manager 30d | `R$1,20–R$1,80 [BENCHMARK — apparel BR 2025]` |
| ROAS Meta | `ROAS_M` | Ads Manager | 3 estágios: `1,8x [sem CAPI]` → `2,5x [CAPI D+15]` → `3,5x [CAPI+criativo D+45]` `[BENCHMARK — apparel BR + delta CAPI oficial Meta]` |
| ROAS Google | `ROAS_G` | Ads Manager | PMax ramp: `1,5x M1 → 2,5x M2 → 3,5x M3` `[BENCHMARK — PMax apparel + curva de aprendizado]` |
| Contribuição orgânica | `share_org` | GA4 (organic+direct+referral+e-mail) | `15% / 25% / 35% [HIPÓTESE — validar em D+30]` |
| Click-to-session | `c2s` | GA4 vs Ads | `0,85 [BENCHMARK — apparel]` |
| Custos fixos Kolden | `fixo` | Contrato | `R$4.000/mês [VALIDADO — contrato]` |
| Comissão variável Kolden | `com_var` | Contrato | `3% do faturamento pago [VALIDADO — contrato]` |

### 1.3 Higiene do modelo

- Inputs separados de cálculos e de outputs (nenhum número hardcoded em fórmula).
- Fato conciliado vs. projeção marcados em coluna própria.
- Reconciliação com F0 obrigatória antes de qualquer subida ao Plutos para decisão.
- Cenários mudam **premissas**, não fórmulas.

---

## 2. Três cenários

Split de budget mensal (R$5k) segue lógica de aquecimento da base + ramp de PMax + teste-canário no YouTube a partir de M2.

| Split | M1 | M2 | M3 |
|---|---|---|---|
| Meta Ads | 70% (R$3.500) | 65% (R$3.250) | 60% (R$3.000) |
| Google Ads (Search+PMax) | 25% (R$1.250) | 25% (R$1.250) | 30% (R$1.500) |
| YouTube (teste) | 5% (R$250) | 10% (R$500) | 10% (R$500) |

`[ASSUMIDO — peso M1 na Meta para gerar sinal do CAPI e ramp de PMax nos meses seguintes; reconciliar com plano de mídia da Peitho]`

### 2.1 Cenário Conservador

**Leitura:** CAPI atrasado, criativo ainda em teste, PMax fora do platô, orgânico frio.

| Driver | Valor | Tag |
|---|---|---|
| Ticket médio | R$220 | `[INFERIDO — piso faixa BR premium]` <!-- AOV_REAL_AQUI --> |
| CPC blended | R$1,80 | `[BENCHMARK — apparel BR competitivo]` |
| CVR site | 0,7% | `[INFERIDO — gap identidade + landing atual]` |
| ROAS Meta M1/M2/M3 | 1,5x / 1,8x / 2,0x | `[BENCHMARK — sem CAPI + atraso criativo]` |
| ROAS Google M1/M2/M3 | 1,0x / 1,5x / 2,0x | `[BENCHMARK — PMax em ramp lento]` |
| ROAS YouTube | 0x (branding) | `[ASSUMIDO]` |
| Contribuição orgânica | 15% | `[HIPÓTESE — IG frio, sem calendário editorial]` |

| Métrica | M1 | M2 | M3 |
|---|---|---|---|
| Fat. pago Meta | R$5.250 | R$5.850 | R$6.000 |
| Fat. pago Google | R$1.250 | R$1.875 | R$3.000 |
| Fat. pago YouTube | R$0 | R$0 | R$0 |
| **Fat. pago total** | **R$6.500** | **R$7.725** | **R$9.000** |
| Fat. orgânico (15%) | R$1.147 | R$1.363 | R$1.588 |
| **Faturamento total** | **R$7.647** | **R$9.088** | **R$10.588** |
| CAC pago | R$153 | R$130 | R$110 |
| Break-even (fixo cobrir) | não bate | não bate | não bate |

`[Break-even do fixo Kolden R$4k = R$133k de faturamento pago/mês. Nenhum mês do Conservador chega perto. Neste cenário, contrato R$4k+3% é subsidiado por Kolden.]`

### 2.2 Cenário Realista

**Leitura:** CAPI live em D+15, criativo iterando, PMax entra em platô no M2, orgânico responde a calendário editorial + fluxos RD.

| Driver | Valor | Tag |
|---|---|---|
| Ticket médio | R$250 | `[INFERIDO — mediana faixa BR premium]` <!-- AOV_REAL_AQUI --> |
| CPC blended | R$1,50 | `[BENCHMARK — apparel BR média]` |
| CVR site | 1,2% | `[BENCHMARK — landing corrigida + identidade]` |
| ROAS Meta M1/M2/M3 | 1,8x / 2,5x / 3,5x | `[BENCHMARK — sem→com CAPI→CAPI+criativo]` |
| ROAS Google M1/M2/M3 | 1,5x / 2,5x / 3,0x | `[BENCHMARK — PMax ramp saudável]` |
| ROAS YouTube | 0,5x M2 / 1,0x M3 | `[HIPÓTESE — teste-canário]` |
| Contribuição orgânica | 25% | `[HIPÓTESE — IG ativo + fluxos e-mail rodando]` |

| Métrica | M1 | M2 | M3 |
|---|---|---|---|
| Fat. pago Meta | R$6.300 | R$8.125 | R$10.500 |
| Fat. pago Google | R$1.875 | R$3.125 | R$4.500 |
| Fat. pago YouTube | R$0 | R$250 | R$500 |
| **Fat. pago total** | **R$8.175** | **R$11.500** | **R$15.500** |
| Fat. orgânico (25%) | R$2.725 | R$3.833 | R$5.167 |
| **Faturamento total** | **R$10.900** | **R$15.333** | **R$20.667** |
| CAC pago (AOV R$250) | R$153 | R$109 | R$81 |
| Break-even (fixo cobrir) | não bate | não bate | não bate |

`[Mesmo no Realista, R$5k de mídia + orgânico projetado não paga o fixo R$4k+3% no horizonte de 90d. Materialidade: R$4k fixo > 3% × R$15,5k = R$465. Kolden subsidia R$3,5k/mês na entrega. Handoff para Plutos.]`

### 2.3 Cenário Agressivo

**Leitura:** CAPI+criativo desde M1 (spec pronto em D+15 acelerada), PMax entra maduro por sinal de conversão sadio, orgânico responde forte (IG 59k + lista 5,5k ativados).

| Driver | Valor | Tag |
|---|---|---|
| Ticket médio | R$290 | `[HIPÓTESE — teto BR premium + cross-sell]` <!-- AOV_REAL_AQUI --> |
| CPC blended | R$1,20 | `[HIPÓTESE — CAPI reduz CPC via qualidade de sinal]` |
| CVR site | 1,8% | `[HIPÓTESE — landing quick-win + identidade + prova social]` |
| ROAS Meta M1/M2/M3 | 2,5x / 3,5x / 4,5x | `[HIPÓTESE — CAPI+criativo desde M1]` |
| ROAS Google M1/M2/M3 | 2,0x / 3,0x / 4,0x | `[HIPÓTESE — PMax alimentado por CAPI]` |
| ROAS YouTube | 1,0x M2 / 1,5x M3 | `[HIPÓTESE]` |
| Contribuição orgânica | 35% | `[HIPÓTESE — IG virou funil + fluxos e-mail cadenciados]` |

| Métrica | M1 | M2 | M3 |
|---|---|---|---|
| Fat. pago Meta | R$8.750 | R$11.375 | R$13.500 |
| Fat. pago Google | R$2.500 | R$3.750 | R$6.000 |
| Fat. pago YouTube | R$0 | R$500 | R$750 |
| **Fat. pago total** | **R$11.250** | **R$15.625** | **R$20.250** |
| Fat. orgânico (35%) | R$6.058 | R$8.413 | R$10.904 |
| **Faturamento total** | **R$17.308** | **R$24.038** | **R$31.154** |
| CAC pago (AOV R$290) | R$129 | R$93 | R$72 |
| Break-even (fixo cobrir) | não bate | não bate | não bate |

`[Mesmo o Agressivo — que empilha 6 premissas otimistas simultâneas — não atinge R$80k/mês em M1. O limite não é execução; é aritmético: R$5k de mídia com ROAS blended saudável (~3-4x) topa em ~R$20-31k pago/mês.]`

---

## 3. Comparação com metas travadas (v2 — M1=R$80k)

| Mês | Meta declarada | Conservador | Realista | Agressivo | Diagnóstico |
|---|---|---|---|---|---|
| **M1 (30d)** | **R$80.000** | R$7.647 (9,6% da meta) | R$10.900 (13,6%) | R$17.308 (21,6%) | **Não bate em nenhum cenário.** Gap Realista = **−R$69.100**. Piorou vs v1: com M1=R$70k o gap Realista era −R$59.100; com M1=R$80k, cresce +R$10k. |
| M2 (60d) | R$100.000 | R$9.088 (9,1%) | R$15.333 (15,3%) | R$24.038 (24,0%) | **Não bate em nenhum cenário.** Gap Realista = −R$84.667 (idêntico à v1). |
| M3 (90d) | R$150.000 | R$10.588 (7,1%) | R$20.667 (13,8%) | R$31.154 (20,8%) | **Não bate em nenhum cenário.** Gap Realista = −R$129.333 (idêntico à v1). |

**Diagnóstico consolidado (para o slide 10 do deck):** as metas M1/M2/M3 travadas com o Bruno (R$80k/100k/150k) são **estruturalmente incompatíveis** com o budget de R$5k/mês nos três cenários modelados. Não é execução ruim; é aritmética de funil.

**Nota sobre a mudança de M1 na v2:** subir M1 de R$70k → R$80k **não altera** o diagnóstico qualitativo — o M1 já disparava flag vermelha na v1 e continua disparando. O que muda é a **severidade**: o Realista M1 agora entrega 13,6% da meta (vs 15,6% na v1) e o Agressivo entrega 21,6% (vs 24,7% na v1). O gap absoluto no Realista cresce em R$10k (de −R$59,1k para −R$69,1k). M2/M3 estão inalterados.

---

## 4. Gatilho "meta agressiva demais para budget" (v2)

### 4.1 Fórmula

```
SE Meta_mês > (Budget_mídia × ROAS_blended_realista + Orgânico_estimado) × 1,2
ENTÃO flag_vermelha = TRUE
```

Onde `1,2` é buffer de tolerância operacional (margem para variância favorável de 20%).

### 4.2 Aplicação nos 3 meses (Realista)

| Mês | Meta | Realista projetado | × 1,2 (teto tolerado) | Flag | Δ meta vs. teto |
|---|---|---|---|---|---|
| **M1** | **R$80.000** | R$10.900 | **R$13.080** | **VERMELHA** | **+R$66.920 (+512%)** |
| M2 | R$100.000 | R$15.333 | R$18.400 | **VERMELHA** | +R$81.600 (+443%) |
| M3 | R$150.000 | R$20.667 | R$24.800 | **VERMELHA** | +R$125.200 (+505%) |

**Resposta direta ao pedido do plano v2:** sim, os três meses disparam flag vermelha. Com M1=R$80k, **o M1 passa a ser o mês mais severo em termos relativos (+512% sobre o teto tolerado)**, ultrapassando o M3 (+505%). Antes (v1 com M1=R$70k), o M3 era o mais severo. A mudança de M1 não muda o veredito binário (era vermelha, continua vermelha), mas empurra o mês inaugural para o topo da lista de gap crítico.

### 4.3 Mensagem explícita para o slide 10 do deck

> **Para atingir R$80k já no M1 mantendo R$5k de budget de mídia, seriam necessárias três alavancas simultâneas, nenhuma delas trivial:**
>
> **(a)** Elevar o budget de mídia para **R$25–35k/mês desde o M1** (Meta+Google), mantendo ROAS blended ≥3,5x — a hipótese mais aritmeticamente sólida, mas exige aporte extra do Bruno.
>
> **(b)** Elevar a CVR do site para **>3,5%** (mais que o dobro do benchmark BR de 1,5%) já no M1, o que exigiria redesign completo do site + prova social empilhada + CRO iterativo — fora do escopo desta entrega, prazo mínimo 60d.
>
> **(c)** Elevar o ticket médio para **>R$450** (60% acima do benchmark premium) via cross-sell agressivo e bundles desde a primeira semana — exige reposicionamento de sortimento, o que Bruno não pediu.
>
> **Sem essas alavancas, a projeção realista para M1 fica em R$10-17k/mês (mídia R$5k + orgânico atual). Para M3, o teto Realista é R$20-25k/mês.**
>
> **A recomendação Pactolo → Bruno é: (1) travar meta M1 realista em R$15-25k/mês; (2) usar M1/M2 para instalar CAPI e destravar ROAS Meta 2,5x→3,5x; (3) só reavaliar meta agressiva no M3 com base em ROAS realizado + decisão de ampliar budget.**

---

## 5. Análise de sensibilidade — cenário Realista, M3

Impacto de ±20% em três drivers-chave sobre o faturamento M3 do Realista (base = R$20.667/mês). Sensibilidade inalterada entre v1 e v2 (o M3=R$150k não mudou).

| Driver | −20% | Base | +20% | Δ base (−20%) | Δ base (+20%) |
|---|---|---|---|---|---|
| Ticket médio (R$250 base) | R$16.533 | R$20.667 | R$24.800 | −R$4.134 | +R$4.133 |
| CVR site (1,2% base) | R$16.533 | R$20.667 | R$24.800 | −R$4.134 | +R$4.133 |
| ROAS blended (2,85x eff. base) | R$16.533 | R$20.667 | R$24.800 | −R$4.134 | +R$4.133 |
| **Combinado (3 drivers +20%)** | — | R$20.667 | **R$35.712** | — | **+R$15.045 (+73%)** |
| **Combinado (3 drivers −20%)** | **R$10.581** | R$20.667 | — | **−R$10.086 (−49%)** | — |

`[NOTA — sensibilidade unitária dos três drivers é idêntica porque no funil reverso Faturamento = f(Budget, CPC, CVR, AOV, ROAS) e três desses fatores entram linearmente. O que importa é o efeito composto: cenário sombrio (−20% em tudo) devolve R$10,6k/mês; cenário luminoso (+20% em tudo) devolve R$35,7k/mês — ainda 24% da meta M3 de R$150k.]`

**Análise de sensibilidade aplicada ao M1=R$80k (adicional v2):** com base Realista R$10.900, o +20% combinado leva a **R$18.815** (23,5% da meta M1) e o −20% combinado leva a **R$5.579** (7,0% da meta). Mesmo o cenário luminoso não chega a 25% de R$80k. Confirma o veredito: gap M1 é estrutural, não afinável por drivers marginais.

**Leitura Pactolo:** conclusão de §4.3 se mantém — mesmo o Realista +20% em todos os drivers não aproxima nenhuma das metas declaradas. O gap é estrutural.

---

## 6. Unit economics — cenário Realista, M3

| Métrica | Valor | Fórmula | Fonte / Tag |
|---|---|---|---|
| Budget mensal | R$5.000 | contrato | `[VALIDADO]` |
| Pedidos pagos/mês M3 | 62 | R$15.500 / R$250 | `[calculado do §2.2]` |
| **CAC pago** | **R$81** | R$5.000 / 62 | `[projetado — Realista M3]` |
| AOV | R$250 | benchmark | `[BENCHMARK — moda premium BR]` <!-- AOV_REAL_AQUI --> |
| Margem líquida | 40% | assumido | `[BENCHMARK — apparel BR]` `[PENDENTE — F0.2]` |
| Margem de contribuição/pedido | R$100 | R$250 × 40% | `[calculado]` |
| Frequência de compra/ano | 2x | `[PENDENTE — F0.4 (histórico Nuvemshop)]` | `[HIPÓTESE — moda feminina premium, faixa média BR 1,5-2,5x]` |
| Vida útil (anos) | 2 | `[HIPÓTESE — testar em D+90]` | |
| **LTV** | **R$400** | R$100 × 2 × 2 | `[HIPÓTESE — reconciliar com cohort real em D+90]` |
| **LTV/CAC** | **4,9x** | R$400 / R$81 | `[HIPÓTESE — saudável se confirmado (>3x é bom, >5x é ótimo)]` |
| **Payback CAC** | **~9 meses** | R$81 / (R$100/2/12) | `[HIPÓTESE — margem contribuição mensal de R$8,3/cliente]` |

**Leitura Pactolo:** unit economics **do Realista M3** é aceitável (LTV/CAC 4,9x supera piso de 3x), mas depende de **três hipóteses ainda não validadas**: margem líquida 40%, frequência 2x/ano, vida útil 2 anos. A ausência de F0.2 e F0.4 impede afirmar que o negócio é rentável no unit — só que **projeta rentabilidade** sob premissas defensáveis. Reconciliar em D+90 é obrigatório antes de subir ao Plutos para decisão de ampliação de budget.

---

## 7. Recomendações Pactolo → Ronan → Plutos (v2 — priorizadas)

Cinco recomendações, priorizadas por materialidade × prazo. Nenhuma decide — todas sobem ao Plutos com pacote de dados. **A ordem das recomendações mudou vs v1: a renegociação de meta subiu de urgência com M1=R$80k, porque o mês inaugural virou o mais severo.**

**R1. Renegociar meta M1 com o Bruno ANTES da apresentação — bloqueante v2.**
Materialidade: crítica (elevada vs v1). Com M1=R$80k, o gap Realista salta para +512% sobre o teto tolerado — pior mês da série. Isso não é gap de execução; é gap de aritmética que compromete a assinatura Kolden nos primeiros 30 dias do contrato. Duas saídas na apresentação: (i) renegociar M1 para R$15–25k/mês (faixa aritmeticamente defensável com R$5k de mídia); (ii) blindar o slide 10 com a mensagem de §4.3 mostrando as três alavancas necessárias e deixando o Bruno decidir se sobe o budget ou se rebaixa a meta. Prazo: bloqueante para a entrega D+28. Handoff: **Plutos decide a conversa com Bruno; Zeus + Apolo consolidam slide 10 na linguagem simples do plano v2.**

**R2. Priorizar instalação de CAPI (Meta) para D+15.**
Materialidade: alta. Delta de ROAS Meta 1,8x→2,5x com CAPI é o maior salto unitário do funil (+39%), com custo de implementação baixo (spec já é escopo do Hefesto na Onda 1). Sem CAPI, o Realista vira Conservador. Prazo: D+15 (janela de aprendizado antes da campanha real). Handoff: **Apolo (via Peitho/pixel-specialist) executa.**

**R3. Iniciar coleta de F0 (AOV real, margem líquida, CVR site, frequência de compra) imediatamente — bloqueante para reconciliação.**
Materialidade: alta. Os 3 cenários vivem de benchmarks e hipóteses até F0 fechar. **AOV real está sendo puxado agora (~15 min); Ronan substitui os `<!-- AOV_REAL_AQUI -->` deste dossiê em D+0,5.** Margem, CVR e frequência ficam com Bruno em D+2. Sem F0 completo, cada revisão do modelo em D+30/60/90 bate na mesma incerteza. Handoff: **Ronan cobra Bruno; Pactolo reconcilia modelo em D+3.**

**R4. Estruturar contribuição orgânica como driver formal, não "sorte de calendário editorial".**
Materialidade: média-alta. Nos 3 cenários, orgânico responde por 15-35% do total. Se IG 59k + lista RD 5,5k forem operados com cadência (Pheme + Caliope), o cenário Realista 25% pode virar Realista 35-40%, adicionando R$3-5k/mês sem gasto adicional. Prazo: M1-M2. Handoff: **Apolo aciona Pheme (social) + Caliope (e-mail).**

**R5. Instalar tracking de LTV real (cohort mensal) a partir de M1, com meta de reconciliar LTV/CAC em D+90.**
Materialidade: média. Sem cohort real, LTV/CAC 4,9x é projeção de brochura, não decisão. Prazo: instalar em M1 (aproveitar spec CAPI/GA4), primeiro laudo em D+90. Handoff: **Metis (analytics de produto), Pactolo reconcilia unit economics.**

---

## 8. Fronteira Pactolo

- **Este dossiê ENTREGA:** modelo de funil reverso com 3 cenários, comparação com metas travadas (M1=R$80k v2), gatilho de meta agressiva, sensibilidade e unit economics — todos com premissas explícitas e rastreabilidade por tag.
- **Este dossiê NÃO DECIDE:**
  - Se Kolden negocia a meta com Bruno (decisão comercial — **Plutos + Zeus**).
  - Se o budget de mídia deve subir de R$5k para R$25–35k (decisão do Bruno; Pactolo prepara business case).
  - Se o contrato R$4k+3% precisa ser renegociado à luz do fixo não bater no horizonte de 90d (decisão comercial Kolden — **Plutos**).
- **Handoffs abertos:**
  - `[PENDENTE — F0.1 (AOV)]` — Ronan puxa do Nuvemshop nos próximos 15 min; substituir os `<!-- AOV_REAL_AQUI -->` neste dossiê.
  - `[PENDENTE — F0.2/F0.3/F0.4]` para Bruno via Ronan (bloqueante para reconciliação D+3).
  - Handoff de subida ao Plutos com este dossiê + mensagem do §4.3 empacotada, agora com **R1 como bloqueante** (não mais R1 de v1).
  - Handoff lateral: coerência CAC Pactolo (R$81 Realista M3) ↔ CAC Peitho (a reconciliar em D+8, tolerância ±5% conforme critério de sucesso do contrato).

---

**Assinatura Pactolo v2:** modelo lavrado sob os 8 princípios do gate de qualidade. Todo número tem fonte ou premissa declarada; toda projeção tem driver + taxa + período; fato e projeção separados; nada foi decidido — foi entregue para decisão. F0 parcialmente pendente marcado. Reconciliação obrigatória em D+3. Delta v1→v2 documentado: **M1 subiu de R$70k para R$80k; o M1 passa a ser o mês de maior severidade relativa (+512%), e a renegociação de meta virou R1 crítica.**

---

## DELTA v3 · Solomon 30d — F0.1 resolvido + baseline observado (2026-07-01T22:00)

**Trigger:** análise Solomon 30d rodada em `~/.claude/plans/retomar-an-lise-da-nifty-ritchie.md` (2026-07-01 19:01) devolveu **dados reais** da conta Rosie via MCP oficial (`caOEzYj1TqRM0r3nHrFP`). F0.1 (AOV) e um baseline observável agora são fatos, não projeção.

### DELTA-1 · F0.1 resolvido

| Driver | Fallback v2 | Solomon 30d | Delta | Nova tag |
|---|---|---|---|---|
| **AOV Conservador** | R$ 220 [INFERIDO] | R$ 465,59 [VALIDADO] | +112% | `[VALIDADO — Solomon 30d 2026-06-01→2026-07-01]` |
| **AOV Realista** | R$ 250 [INFERIDO] | R$ 465,59 | +86% | idem |
| **AOV Agressivo** | R$ 290 [HIPÓTESE] | R$ 465,59 | +61% | idem |

**Decisão:** os 3 cenários **usam o mesmo AOV real R$ 465,59** — a variação entre cenários fica apenas em CVR, ROAS e contribuição orgânica (que continuam pendentes de F0.3 e F0.5). Deck v3 espelha essa escolha.

### DELTA-2 · Baseline observável desmonta a projeção

**Junho/2026 fechou R$ 55.405,40 aprovado em 119 pedidos com R$ 5.248 de mídia — retorno agregado 10,56x. Isso já contém a mídia paga rodando (3 campanhas: 2 Meta ADV + 1 Google PMax).**

Aplicando somente o fator ticket (novo/antigo) aos m1/m2/m3 do modelo Pactolo:

| Cenário | M1 | M2 | M3 |
|---|---|---|---|
| Conservador | R$ 16.181 | R$ 19.233 | R$ 22.407 |
| Realista | R$ 20.300 | R$ 28.555 | R$ 38.490 |
| Agressivo | R$ 27.784 | R$ 38.594 | R$ 50.019 |

**Observação crítica:** o baseline REAL de junho (R$ 55,4k) **está acima do Agressivo M3 (R$ 50,0k)**. Isso significa que o modelo Pactolo v2 subestimou pelo menos um driver — provavelmente a contribuição orgânica (Solomon linear mostra 44% da receita vindo de orgânico, contra 35% do Agressivo).

**Consequência:** os 9 valores acima são **teto máximo do que Pactolo projeta**, não faturamento total esperado. O deck v3 apresenta os cenários como **modelo pessimista** e ancora a conversa com Bruno em **baseline junho** (R$ 55,4k) + **gap para meta** (+44% M1 = R$ 25k incrementais).

### DELTA-3 · CAC target Peitho vs CAC Pactolo projetado — ressalva v1/v2 resolvida

Solomon devolveu **CAC real R$ 48,59** — bate 1:1 com o **CAC target Peitho R$ 55 M1**, invalidando a projeção Pactolo (R$ 153 Realista M1). Peitho estava certo; Pactolo projetou com CVR/AOV placeholder.

### DELTA-4 · R1 crítica renegociação de meta — reenquadrada

R1 crítica v2 dizia: "renegociar M1 com Bruno pré-apresentação — meta operacional Kolden = piso Realista R$15-25k/mês". Com baseline real R$55,4k rodando, essa recomendação **cai**:

- Meta M1=R$80k pede **+44% sobre baseline** (não +512% sobre zero).
- É meta ambiciosa mas defensável IF (a) retenção M+1 subir de 0,97% → 5% (fluxo e-mail), (b) conexão Meta ligar (CAPI D+15), (c) UTM padronizar (D+21).
- Deck v3 slide 10 e slide 11 A comunicam isso.

**Nova recomendação Pactolo v3 → Ronan:** manter M1=R$80k na conversa com Bruno. Preparar contra-proposta suave "se uma alavanca travar, revisamos para R$ 65-75k".

### DELTA-5 · Pendências que persistem

- `[PENDENTE — F0.2]` margem líquida por linha de produto → Bruno via planilha Nuvemshop
- `[PENDENTE — F0.3]` CVR pós-landing quick-win → Harmonia D+15
- `[PENDENTE — F0.4]` frequência de recompra por cohort → Bruno via planilha Nuvemshop
- `[PENDENTE — F0.5]` contribuição orgânica ajustada para 40-45% (Solomon linear) → reconciliar em v3 completo
- **Reconciliação Pactolo v3 completa (refazer §2-4 com AOV real + baseline + orgânico 40%+):** pendente. Este DELTA cobre o essencial para o deck; a modelagem completa entra em D+3.

**Assinatura DELTA v3:** Pactolo @ 2026-07-01T22:00 · trigger: análise Solomon MCP · reconciliação bloqueante marcada para D+3.
