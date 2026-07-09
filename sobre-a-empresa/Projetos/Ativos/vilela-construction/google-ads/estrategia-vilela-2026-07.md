---
cliente: "Vilela Construction Inc."
slug: "vilela-construction"
tipo: "estrategia"
frente: "google-ads-canal-de-aquisicao"
squad_emissor: "peitho"
agentes_encarnados: ["traffic-chief", "kasim-aslam"]
autor: "Claude Code (subagente encarnando Peitho)"
data: "2026-07-09"
contrato: "Olimpo/contratos/missoes/m-20260709-google-ads-vilela.yaml"
roadmap_pai: "sobre-a-empresa/Projetos/Ativos/vilela-construction/google-ads/ROADMAP.md"
phase: "Phase 0 do workflow *campaign-launch (Peitho)"
status: "para aprovacao Ronan em D+3 antes de lancar em D+10"
---

# Estratégia — Google Ads Vilela Construction (2026-07)

> **Escopo desta entrega.** Documento estratégico completo da **Phase 0 do workflow `*campaign-launch`** do squad Peitho, cobrindo objetivo, persona operável, arquitetura de conta, bidding fásico, audience signals, Conversion Action + valor, KPIs semanais, vetos/guardrails e plano de escala/corte. Complementa o `arquitetura-de-conta.yaml` (operável) e a `keywords/seed-list.csv` + `negativas-master.csv` (execução). Compatível com o §3 e §4 do `ROADMAP.md`.
>
> **Fase de aprovação.** Este documento é submetido ao Ronan em **D+3** para aprovação antes do lançamento em **D+10** (mostra-antes conforme matriz de risco do Contrato: reversível, médio impacto, faixa amarela).

---

## §1. Contexto

A **Vilela Construction Inc.** é uma construtora residencial fundada por Thiago Araujo, atendendo **Massachusetts + Southern New Hampshire** `[VALIDADO — dossie.md §A1 rodada 3 09/07]` com foco em remodel de alto ticket: cozinhas de USD 30k a USD 65k (Luxury Kitchen Remodel = USD 65k `[VALIDADO — dossie.md §B2.5]`), banheiros master de USD 12k a USD 40k, custom showers e basements finishing turnkey de USD 50k a USD 70k (ticket agregado — dossie.md §C2 hipótese (a)). A empresa opera 100% por indicação hoje `[VALIDADO — dossie.md §A1]` e contratou a Kolden para construir o primeiro canal digital de aquisição em janela sazonal apertada (maio-novembro, quando o público idoso migra para Flórida no inverno `[VALIDADO — dossie.md §A5]`).

**A dor operacional é dupla.** Primeiro, o Google Ads foi ativado em 12/06/2026 sem rastreamento de conversão instrumentado — violação do veto Peitho `sem_pixel_e_rastreio` — e Bernardo Kolden vem otimizando keywords em cegueira de atribuição há ~4 semanas, queimando ~USD 250/semana em otimização sem sinal `[VALIDADO — diagnostico-tracking-2026-07-01.md §1]`. Segundo, a landing page (`vilela-bright-space`) tem 9 gaps críticos — telefone placeholder `+1 770-555-1234`, 3 testimonials com texto "Enter a powerful testimonial here…" (risco FTC), og:image apontando para R2 do Lovable, geografia herdada de Georgia (erro do template, sendo corrigida pelo Ronan) `[VALIDADO — dossie-site-vilela-construction.md §7]`. Google Ads sem tag + landing sem provas = orçamento incendiado.

**A oportunidade é a janela.** Restam ~4 meses de sazonalidade quente até novembro. A instrumentação em D+7 + lançamento em D+10 recuperam ~15 semanas úteis. Budget é apertado (USD 300/mês só para Google, mais USD 700/mês em Meta em paralelo `[VALIDADO — Contrato D1]`), então a única aposta viável é **Search puro alto-intent + Remarketing mínimo** — nada de PMax, YouTube ou Display prospecting nesta onda. Kasim Aslam: "diminishing returns are still returns" — melhor USD 300/mês bem alocado em BOFU do que USD 300/mês diluído em learning phase de PMax.

---

## §2. Objetivo da campanha

**Objetivo primário.** Gerar **leads qualificados** (form submits) para o pipeline comercial da Vilela na janela sazonal 2026, com Conversion Action `Vilela_Lead_Form` como sinal único de bidding até D+30.

**KPI primário: CPA (Custo por Lead).**
- **Meta D+30:** CPA < USD 100 (aceitável); ideal < USD 75.
- **Break-even matemático:** LTV por lead = USD 4.800 `[BENCHMARK — 60k ticket × 40% margem × 20% fechamento; ROADMAP §3.9; recalibrar D+30 quando B1 responder]`. Break-even ocorre em ~16 meses de gasto por lead fechado; qualquer CPA < USD 200 já é economicamente positivo.

**KPIs secundários (leading indicators):**
- **CTR agregado** ≥ 3% em D+14 (indica alinhamento keyword-copy-LP).
- **Quality Score médio** ≥ 6 por keyword em D+14 (indica saúde estrutural).
- **CVR (form submit / click)** ≥ 3% em D+14 (indica LP funcional após fixes da Onda 2).
- **Enhanced Conversions match rate** ≥ 40% em D+14 (aceito); ≥ 70% em D+30 (ideal).
- **Volume mínimo:** ≥ 10 leads em D+30 (permite iniciar tCPA com dados reais).

**Não é objetivo:**
- ROAS direto (ciclo de decisão é 30-60 dias — venda não fecha dentro da janela do relatório).
- Impressions/impression share (métricas de vaidade em search).
- Cost-per-click baixo isoladamente (CPC baixo com CVR zero = desperdício otimizado).

---

## §3. Buyer persona operável

Duas personas cabíveis dentro da geografia MA + Southern NH `[VALIDADO — dossie.md §A1]`. Ambas com poder de decisão sobre reforma de USD 12k+, ambas homeowners de single-family homes (não condos, não renters).

### Persona A — Homeowner sênior 55-70 anos (core Vilela)

**Perfil demográfico:** casais aposentados ou pré-aposentadoria, renda familiar USD 90k-180k, imóvel de USD 500k-900k comprado nos anos 90-2000, filhos já saíram de casa, plano de continuar na casa por 10+ anos (não vender). Concentração em Newton, Wellesley, Lexington, Framingham, Cambridge, Brookline. Migração sazonal para Flórida no inverno `[VALIDADO — dossie.md §A5]`.

**Pain (dor operacional):**
- Cozinha ou banheiro tem 25-40 anos, layout ultrapassado, mobilidade reduzida começando a exigir walk-in shower.
- Já teve **experiência ruim com contractor anterior** que sumiu, atrasou, deixou canteiro sujo por semanas — nunca mais quer isso.
- Filhos moram longe, quer que a casa fique confortável para receber netos nas férias.

**Gain (o que ele quer sentir):**
- **Confiança de que o contractor não vai sumir**. Prova: licenca, insurance, referências reais de vizinhança, endereço físico.
- **Cronograma respeitado.** Aposentado tem agenda, não pode ficar com casa em caos por 3 meses.
- **Canteiro limpo ao final de cada dia** — o diferencial nº 1 declarado pela Vilela `[VALIDADO — voz do cliente]`.

**Gatilho de busca:**
- Vizinho reformou e ficou bom → busca "kitchen remodel {cidade}" ou "master bathroom remodel near me".
- Neta cai no chuveiro do avô → busca "walk in shower installation".
- Recebeu inbox promocional de home equity loan → busca "kitchen remodel cost massachusetts".

**Canal de descoberta:** Google mobile durante o dia (aposentado com iPad/celular) + desktop à noite após conversa com cônjuge. Facebook secundário (vê ads Meta rodando em paralelo — sinergia cross-channel).

**Objeções pré-form:**
1. "Quanto custa? Não vou preencher form sem ideia de preço." → CTA "Free Estimate" + FAQ com faixas de preço na LP (Caliope entrega na Onda 2 item 2.5).
2. "Você é licensed no meu estado?" → "Licensed & Insured — Serving MA & Southern NH" em callout.
3. "Já fui enganado antes." → 3 testimonials reais + endereço físico + telefone real (Bloqueio B2/B3 do ROADMAP).

### Persona B — Homeowner ativo 35-55 anos (secundário)

**Perfil demográfico:** casais dual-income com filhos em casa, renda familiar USD 120k-250k, imóvel comprado nos últimos 5-15 anos, planejando ficar ou fazer upgrade antes de vender. Concentração em Newton, Wellesley, Cambridge, Somerville, Waltham, sul de NH (Nashua, Salem) onde o commuting para MA compensa.

**Pain:**
- Cozinha "de anúncio da revista dos anos 2010" — funcional mas datada, quer open-concept.
- Rotina de trabalho remoto elevou uso da casa; espaços precisam funcionar melhor.
- Ansiedade com contractor que não comunica (silêncio de dias durante execução).

**Gain:**
- **Comunicação transparente** — updates via WhatsApp/text, sem "custos ocultos" surgindo depois `[VALIDADO — diferencial nº 2 Vilela]`.
- **Craftsmanship que aparece na foto** — vai postar Instagram/Zillow quando terminar.
- **Prazo garantido** para não desmontar rotina de trabalho remoto por 6 meses.

**Gatilho de busca:**
- Pinterest board de kitchen inspiration → busca "custom kitchen design near me".
- Nova rotina de trabalho remoto → busca "home office renovation" ou "basement finishing".
- Vai receber sogros por 3 meses → "guest bathroom remodel".

**Canal de descoberta:** Google desktop no trabalho (planejando durante horário comercial) + Instagram Reels de reforma (sinergia Meta). Alto uso mobile durante o fim de semana.

**Objeções pré-form:**
1. "Vale a pena investir X em uma casa que talvez venda em 5 anos?" → CTA + FAQ com ROI de kitchen remodel.
2. "Prazo real ou marketing?" → Copy transparente "3-6 semanas típico" + testemunho com prazo real.
3. "Vocês fazem X específico?" → Structured snippets "Full Remodel · Custom Shower · Cabinet Refacing · Backsplash".

---

## §4. Estrutura de conta — 4 campanhas

Segue §3.2 do ROADMAP e o schema de naming `{Mercado}_{Tier}_{Linha}_{Publico}_{Versao}` da skill `arquitetura-enterprise-ppc` (adaptado para escala USD 300/mês: sem MCC dedicado, sem shared budgets, sem Competitor tier — 3 tiers subset). **Fonte-de-verdade operável: `arquitetura-de-conta.yaml`** (este §4 é a leitura em prosa).

### 4.1. `US_Brand_All_v1` — Search Brand

- **Objetivo.** Proteger CTR e CPC do nome próprio "Vilela Construction" contra concorrentes que possam fazer competitor conquest (nenhum identificado hoje, mas Brand é seguro cheap CPC).
- **Budget.** USD 1/dia = USD 30/mês (10% do total) `[VALIDADO — ROADMAP §3.2]`.
- **Bidding.** Manual CPC com max CPC USD 2,5. Brand tem QS naturalmente alto — não precisa Smart Bidding.
- **Targeting.** Geo primário (MA core + Southern NH); mobile +15%.
- **Ad group único:** `AG_Brand_Vilela` com 12 keywords cobrindo marca + variantes + nome do decisor + "reviews"/"near me"/"quote".
- **Racional Kasim Aslam:** "Brand campaign is not optional. If you don't own your name in paid search, someone else will — even in a market with no explicit competitor conquest, organic listings compete for the same real estate."

### 4.2. `US_Nonbrand_Kitchen_TOFU_v1` — Search Non-brand Kitchen

- **Objetivo.** Capturar demanda transacional de reforma de cozinha em MA + Southern NH. Maior campanha por budget porque é o **maior ticket** ($30k-$65k, dossie §B2.5) e a fonte primária de leads high-LTV.
- **Budget.** USD 5/dia = USD 150/mês (50% do total).
- **Bidding fásico.**
  - **Semanas 1-2 (learning):** Maximize Clicks com cap CPC USD 8. Objetivo é acumular ≥15 conversões nas próximas 30d.
  - **Semanas 3-4 (transição):** Manual CPC (max USD 7) — controle enquanto dados amadurecem.
  - **Mês 2+ (steady state):** tCPA com target USD 75. Requer ≥15 conversões nos últimos 30d.
- **Targeting.** Geo primário + secundário. Mobile +15%, sáb/dom +10-15% (planejamento no fim de semana), madrugada -50%.
- **3 ad groups (SKAG moderno):**
  1. `AG_Kitchen_Remodel` — 13 keywords cabeça-de-lista + geo variants + [exact] + luxury tier.
  2. `AG_Kitchen_Contractor` — 12 keywords com viés BOFU ("near me", "licensed").
  3. `AG_Kitchen_Cost` — 10 keywords TOFU-MOFU (pesquisa de preço → CTA "Free Estimate").
- **Total 35 keywords iniciais.** Mix phrase + exact conforme `seed-list.csv`.
- **Racional Kasim Aslam:** ad groups temáticos permitem RSA pinado por intent — "Kitchen Remodel Cost" pinada com "Free Detailed Estimate" enquanto "Kitchen Contractor Near Me" é pinada com "Licensed & Insured — MA & NH". Um ad group generalista diluiria a mensagem.

### 4.3. `US_Nonbrand_Bathroom_TOFU_v1` — Search Non-brand Bathroom

- **Objetivo.** Capturar demanda de reforma de banheiro. Segundo maior ticket ($12k-$40k, dossie §B2.5), particularmente Master Bathroom Remodel ($40k) e custom showers (linha de segurança para público sênior).
- **Budget.** USD 3/dia = USD 90/mês (30% do total).
- **Bidding fásico.** Idem Kitchen: Maximize Clicks → Manual CPC → tCPA USD 65. Target mais baixo que Kitchen porque ticket médio menor.
- **3 ad groups:**
  1. `AG_Bathroom_Remodel` — 13 keywords cabeça-de-lista + geo + [exact] + full/small variants.
  2. `AG_Bathroom_Master` — 11 keywords premium ticket $40k+.
  3. `AG_Bathroom_Custom_Shower` — 11 keywords com foco walk-in shower (público sênior + acessibilidade).
- **Total 35 keywords iniciais.**
- **Racional.** Master Bathroom é o segundo item mais caro do Price Book (Standard $40k, dossie §B2.5) — CPC premium é justificado. Custom Shower ataca acessibilidade (Persona A: neta cai no chuveiro do avô) que é gatilho de urgência maior que "quero atualizar".

### 4.4. `US_Remkt_All_LP-view_v1` — Display Remarketing

- **Objetivo.** Recuperar visitantes qualificados da LP que não converteram no primeiro contato (ciclo de decisão 30-60 dias).
- **Budget.** USD 1/dia = USD 30/mês (10% do total).
- **Bidding fásico.** Manual CPM (max USD 5) → Maximize Conversions → tCPA USD 40 (remkt tem CPA naturalmente muito mais baixo).
- **Audiences.**
  - **Include:** `LP_Visitors_30d` (visitou LP não submeteu form) + `LP_Visitors_7d_engaged` (scroll >50% ou tempo >60s, +25% bid).
  - **Exclude:** `Convertidos_90d` (não bombardear quem já virou lead).
- **Frequency cap:** 5 impressions/dia, 15/semana. Home services em Display cansa rápido.
- **5 banners planejados (Aglaia entrega na Onda 3 Phase 1):** 300×250 kitchen before/after, 300×250 bathroom hero, 728×90 brand promise, 160×600 process transparency, 320×50 mobile CTA.
- **Gate de pausa.** Se audience `LP_Visitors_30d` < 100 pessoas em D+7 → pausar e realocar 100% para Kitchen `[VALIDADO — ROADMAP §3.2 nota]`.
- **Racional.** Remarketing a USD 30/mês é o mínimo viável para Display. Vale a pena porque ciclo de decisão longo (Persona A: consulta cônjuge, pesquisa reviews, agenda visita) — recuperar 1-2 leads de retorno já paga a campanha inteira.

### 4.5. Fora da primeira onda (documentado)

- **Performance Max:** fora — USD 300/mês insuficiente para learning, sem creative library de vídeo, risco de canibalizar Brand. Reavaliar D+60 se ≥15 conv/mês + creative library pronta.
- **Competitor Campaign:** fora — drena rápido em B2C high-ticket sem retorno. Reavaliar D+90.
- **YouTube Ads:** fora — sem assets de vídeo, ticket alto exige produção de qualidade > 1 mês de budget.
- **Display prospecting:** fora — historicamente vira desperdício em conta pequena.
- **Shopping:** fora — Vilela vende serviço, não produto.
- **Lead Form Extension:** fora na Onda 1 — só ativar D+14 após Conversion Action estabilizar (evita contaminar dados de bidding com leads mal qualificados).

---

## §5. Estratégia de bidding fásica

Bidding em 3 fases para respeitar o ciclo de aprendizado do algoritmo do Google sem entregar controle prematuramente. Kasim Aslam: "the Google is basically guessing until you feed it enough conversion data — pretending it isn't gets you charged for the education."

### Fase 1 — Learning (Semanas 1-2)

| Campanha | Estratégia | Cap | Racional |
|---|---|---|---|
| Brand | Manual CPC | max $2.5 | Brand tem QS alto, CPC natural baixo |
| Kitchen | Maximize Clicks | cap $8 | Precisa acumular cliques rápido para ter SQR utilizável |
| Bathroom | Maximize Clicks | cap $7 | Idem Kitchen (ticket menor, cap menor) |
| Remkt | Manual CPM | max $5 | Audience pequena, controle manual |

**Objetivo da Fase 1:** acumular ≥40 clicks/campanha + ≥15 conversões agregadas (Kitchen+Bathroom) nos primeiros 14 dias.

### Fase 2 — Transição (Semanas 3-4)

| Campanha | Estratégia | Target/Cap | Gatilho |
|---|---|---|---|
| Brand | Maximize Conversions | — | Se ≥3 conv em 14d |
| Kitchen | Manual CPC | max $7 | Controle enquanto CVR estabiliza |
| Bathroom | Manual CPC | max $6 | Idem |
| Remkt | Maximize Conversions | — | Se audience ≥200 |

**Gate para avançar:** ≥15 conversões nos últimos 30d combinando Kitchen + Bathroom.

### Fase 3 — Steady state (Mês 2+)

| Campanha | Estratégia | Target | Racional |
|---|---|---|---|
| Brand | tCPA | $35 | Brand converte 3-5x melhor que non-brand |
| Kitchen | tCPA | $75 | ROADMAP §3.8 calibrado para MA+ticket alto |
| Bathroom | tCPA | $65 | Ticket menor, CPA-alvo menor |
| Remkt | tCPA | $40 | Remkt sempre tem CPA baixo |

**Recalibração D+30 (`kasim-aslam` executa).** Valor de conversão real substitui `[BENCHMARK]` de USD 4.800 quando B1 (taxa de fechamento + margem) for respondida. Se valor real subir para USD 6-8k, targets tCPA sobem proporcionalmente (bidding no valor, não no volume).

---

## §6. Estratégia de audience signals

Google Ads em Search não permite targeting rígido por perfil (isso é PMax/Display). Audience signals aqui operam como **modificadores de bid** e **exclusões** — não filtros duros.

### Include (por bid adjustment)

| Sinal | Ajuste | Onde |
|---|---|---|
| **In-market: Home Renovation / Home Improvement** | +15% | Kitchen + Bathroom |
| **In-market: Home Financing / Home Equity** | +10% | Kitchen + Bathroom (indica capital para reforma) |
| **Detailed demographics: Homeowners** | +10% | Todas as non-brand |
| **Detailed demographics: Household income top 30%** | +15% | Kitchen (ticket $30-65k) |
| **Detailed demographics: Age 55-64** | +10% | Bathroom Master + Custom Shower |
| **Detailed demographics: Age 65+** | +10% | Custom Shower (acessibilidade) |
| **Custom Segment: pessoas que buscaram "kitchen remodel", "bathroom remodel" ultimos 30d** | +15% | Todas as non-brand |

### Exclude (não licitar)

| Sinal | Onde | Razão |
|---|---|---|
| **In-market: Real Estate for Rent** | Todas | Renters não reformam |
| **In-market: Home Rental** | Todas | Idem |
| **Detailed demographics: Renters** | Todas | Fora do ICP (dossie §A4: homeowners) |
| **Detailed demographics: Age 18-24** | Todas | Poder de decisão baixo em reforma high-ticket |
| **Detailed demographics: Household income bottom 30%** | Todas | Fora do ticket $12k+ |

### Ajustes por dispositivo / hora / dia (repetido do YAML para leitura)

- **Mobile:** +15% (público sênior + planejamento fim de semana usa celular).
- **Desktop:** 0 (baseline — pesquisa noturna com cônjuge).
- **Tablet:** 0 (baseline).
- **Seg-Sex 08-18h:** +10% (aposentados navegam durante o dia).
- **Seg-Sex 18-22h:** +5% (decisor pós-jantar com cônjuge).
- **Sáb 09-16h:** +15% (planejamento de reforma no fim de semana).
- **Dom 09-16h:** +10%.
- **Madrugada 00-06h:** -50% (exclui cliques cegos, bots, sleep-Google).

---

## §7. Conversion Action + valor por lead

### Spec técnica

```
Nome:                 Vilela_Lead_Form
Categoria:            Submit lead form
Contagem:             One (evita inflar leads duplicados)
Janela post-click:    90 dias (high-consideration; ciclo de decisão longo)
Janela post-view:     1 dia
Valor default:        USD 4.800 [BENCHMARK]
Valor dinâmico via:   hidden field service_selected
Enhanced Conv:        SIM (email + phone via GTM-NG8LP66S)
Incluir no bidding:   SIM (primária até D+30; secondary conversions Meta em observação)
```

### Valor por serviço (via `hidden field service_selected`)

| service_selected | Valor USD | Cálculo |
|---|---|---|
| `kitchen_premium` | 5.200 | $45k Medium Kitchen × 40% × 20% + prêmio Luxury |
| `kitchen_standard` | 4.800 | $60k benchmark × 40% × 20% |
| `bathroom_master` | 3.200 | $40k Master Bath × 40% × 20% |
| `bathroom_full` | 2.400 | $22k Full Bath × 40% × 20% + margem |
| `basement_full` | 4.800 | Basement finishing turnkey (dossie §C2 hipótese a) |
| `flooring` | 960 | $12k × 40% × 20% |
| `painting` | 400 | Ticket baixo (Interior Painting $3.50/SF) |
| `unknown` | 4.800 | Default se hidden field vazio |

### Racional do valor `[BENCHMARK]`

Fórmula: `valor = ticket_medio × margem_bruta × taxa_fechamento`.

- **Ticket médio:** USD 60k (média ponderada Kitchen + Bathroom + Basement do Price Book 2026).
- **Margem bruta:** 40% `[BENCHMARK — construção residencial premium 30-45%; recalibrar B1]`.
- **Taxa fechamento:** 20% `[BENCHMARK — reformas high-ticket 15-25%; recalibrar B1]`.
- **Resultado:** USD 4.800 por lead.

**Kasim Aslam adverte:** "the conversion value you feed to Smart Bidding IS the strategy. Overfeed it and you'll pay $80 CPC for tire-kickers; underfeed it and you'll never scale. Better to enter conservative at $4.8k and recalibrate up at D+30 than start at $12k and burn 3 weeks of budget on inflated clicks."

### Recalibração D+30

Quando Thiago responder **B1** (taxa histórica de fechamento + margem bruta reais) e Vilela tiver ≥10 leads no funil, `kasim-aslam` executa `*review` sobre a Conversion Action:
- Recalcula valor por serviço com dados reais.
- Atualiza no painel Ads.
- Ajusta targets tCPA proporcionalmente.

### Camadas de rastreio (referência)

Conversion Action Camada 1 (client-side via GTM). Camadas 2 (OCI via gclid → GHL sombra) e 3 (Enhanced Conversions for Leads) implementadas pelo `pixel-specialist` na Onda 1 conforme `diagnostico-tracking-2026-07-01.md` §4. Este documento assume Camada 1 rodando + Camada 3 ativa em D+7 — se atrasar, ativação das campanhas desliza junto (veto `sem_pixel_e_rastreio` bloqueia lançamento).

---

## §8. KPIs por semana

Trilha de leading indicators para pegar problema cedo. Ronan lê o relatório semanal do `performance-analyst` (sexta 15h Boston, ROADMAP §4 Onda 4).

### D+7 — Fim da Onda 1 (instrumentação) + Onda 2 (LP fixes)

| KPI | Meta | Ação se abaixo |
|---|---|---|
| Test-lead → conversão em Ads | < 3h | Auditoria tag GTM + trigger form |
| Enhanced Conversions match rate | ≥ 40% | Revisão seletores de email/phone |
| gclid persistindo (cookie + hidden) | 100% dos testes | Auditoria snippet JS + custom field GHL |
| LP telefone real presente | 100% | Escalar B2 (Thiago) — pausa call extension |
| LP testimonials reais | 3 de 3 | Remover seção (risco FTC) |
| LP og:image branded | Sim | Escalar Aglaia (Onda 2 item 2.3) |

**Se qualquer bloqueia:** campanhas ficam `paused` até resolver. Veto `sem_pixel_e_rastreio` é hard gate.

### D+14 — Duas semanas rodando

| KPI | Meta aceitável | Meta ideal | Ação se abaixo |
|---|---|---|---|
| CTR agregado non-brand | ≥ 2% | ≥ 3% | Revisar RSAs (pin strategy + relevância) |
| CTR agregado Brand | ≥ 15% | ≥ 25% | Auditar keywords Brand (variantes cobertas?) |
| CPC médio Kitchen | ≤ $8 | ≤ $6 | Aumentar Quality Score via LP alinhamento |
| CVR (form/click) | ≥ 2% | ≥ 3% | Ariadne entra (gatilho ROADMAP §6 dependência) |
| Quality Score médio | ≥ 5 | ≥ 6 | Alinhamento keyword ↔ ad ↔ LP |
| Leads acumulados | ≥ 4 | ≥ 6 | Se ≥ 8, gate para Fase 2 bidding acelerado |
| Search Partners CPC/CVR | N/A | N/A | Verificado desligado (config yaml) |

### D+30 — Fim da primeira iteração da Onda 4

| KPI | Meta aceitável | Meta ideal | Ação |
|---|---|---|---|
| **CPA (Custo por Lead)** | < $100 | < $75 | Se < $75, gate para escala +50% |
| **Leads acumulados** | ≥ 10 | ≥ 15 | Se ≥ 15, gate para tCPA + PMax pipeline em D+60 |
| **Enhanced Conv match rate** | ≥ 60% | ≥ 70% | Se < 60%, refazer mapping seletores |
| **Quality Score médio** | ≥ 6 | ≥ 7 | Se abaixo, refactor keyword-ad-LP alignment |
| **Conversion Value / Cost** (ROAS proxy) | ≥ 12 | ≥ 20 | Se < 8, recalibrar valor de conversão urgente |
| **Auditoria 200-checkpoints score** | ≥ 70 | ≥ 85 | `ads-analyst` roda `auditoria-forense-200-checkpoints` |

---

## §9. Vetos + guardrails

Vetos do `Peitho/squad.yaml` respeitados nos 5 pilares.

### 9.1. `sem_teto_de_gasto` (aplicado)

- Cada campanha tem `budget_daily_usd` fixo (arquitetura-de-conta.yaml).
- **Escala > USD 30/dia por campanha (100% do budget total) requer aprovação Ronan por escrito antes de aplicar.**
- Google Ads pode overspend em até 200% do budget diário — hard gate: se gasto real do dia 1 > 2x budget_daily → pausar TUDO + alerta Ronan.

### 9.2. `sem_pixel_e_rastreio` (aplicado)

- Todas as 4 campanhas iniciam `status_inicial: paused`.
- Ativação SOMENTE após **Gate D+7** cumprido:
  - Tag AW- disparando em test-lead (< 3h).
  - Enhanced Conversions match rate ≥ 40%.
  - gclid persistindo em cookie + hidden field.
- Se D+7 escorregar, D+10 escorrega junto. Sem exceção.

### 9.3. `claim_que_viola_politica` (aplicado — spec da copy)

Copy dos RSAs (Caliope na Onda 3 Phase 1) **NÃO pode conter**:
- "guaranteed lowest price" (Google Home Services proíbe promessas de menor preço).
- "we beat any quote" (idem).
- Antes/depois com claim de milagre ("transform your home in 3 days").
- "Financing 0%" sem disclaimer (Google exige disclosure).
- "Get rich", "no work required", "no money down" (categoria proibida em Home Services).
- Alegação médica (walk-in shower não pode ser "prevents falls" — pode ser "designed for accessibility").

### 9.4. `sem_aprovacao_de_budget` (aplicado)

- Mudança de budget acima de USD 30/dia por campanha requer aprovação Ronan por escrito.
- Escalonamento previsto (D+30 +50%, D+45 +100%) segue regras em `arquitetura-de-conta.yaml` §regras_de_otimizacao, mas cada gatilho dispara **notificação Ronan** — não é aplicação automática.

### 9.5. `credencial_texto_puro` (aplicado)

- Nenhum ID de conta, chave API ou credencial no repositório.
- Placeholders `TBD_[B4]`, `TBD_[B2]` etc. serão substituídos apenas no painel Ads/GTM (Bernardo Kolden com acesso).
- Enhanced Conversions API key, se necessária: via Infisical (não texto puro).

---

## §10. Plano de escala / corte

Regras determinísticas para o `performance-analyst` (semanal) e `ads-analyst` (D+30) sem depender de julgamento novo.

### 10.1. Corte semanal (automatico após revisão sexta 15h Boston)

| Condição | Ação | Requer aprovação? |
|---|---|---|
| Keyword com ≥20 clicks e 0 conversões em 14d | Pausar keyword | Não |
| Ad group com CPA > 2× target_cpa em 14d | Reduzir budget 50% + revisar copy + keywords | Não |
| SQR: query com CTR < 0.5% ou CVR < 1% | Adicionar como negativa (skill `search-query-analise`) | Não |
| Campanha com CPA > USD 150 em 14d | Cortar budget 30% + refazer keyword research + auditar RSA | Não |
| Search Partners aparece ligado | Desligar imediatamente | Não |

### 10.2. Escala D+30

| Condição | Ação | Requer aprovação? |
|---|---|---|
| CPA < USD 75 E leads ≥ 10/mês | Escalar Kitchen +50% (150→225) | **Sim, Ronan** |
| CPA < USD 50 E leads ≥ 15/mês | Escalar Kitchen +100% (150→300) | **Sim, Ronan** |
| Bathroom CPA < USD 60 E leads ≥ 5/mês | Escalar Bathroom +30% (90→120) | **Sim, Ronan** |

Escala **sempre** dispara notificação Ronan — nunca aplicação automática. Nota Kolden: contrato USD 1.000/mês de mídia está split em USD 300 Google + USD 700 Meta. Escalar Google além de USD 300/mês requer conversar com Ronan sobre re-split (potencialmente puxar de Meta).

### 10.3. Escala D+45

| Condição | Ação | Requer aprovação? |
|---|---|---|
| CPA < USD 75 sustentado 45d + audience Remkt ≥ 300 | Considerar PMax como campanha 5 | **Sim, Ronan** |
| Volume conversões ≥ 15/mês estável | Ativar Lead Form Extension | **Sim, Ronan** |

### 10.4. Pausa sazonal (dezembro-abril)

- Congelar Kitchen + Bathroom + Remkt (status `paused`).
- Manter só Brand com budget reduzido a USD 15/mês (proteção de nome).
- Retomada em maio 2027 com auditoria de conta + refresh de RSAs + SQR review.

### 10.5. Kill switches (hard gates automáticos)

- **Gasto real dia 1 > 2× budget_daily** → pausar TUDO + alerta Ronan (Google Ads pode overspend em até 200% do budget diário).
- **CTR agregado < 1% em D+7** → revisão de RSA + pin strategy antes de continuar.
- **Quality Score agregado < 5 em D+14** → revisão de LP + keyword-copy alignment.
- **Conversion tag para de disparar por 24h** → pausar TUDO + escalar `pixel-specialist`.

---

## Anexos

### A. Referências

- **Contrato de Missão:** `Olimpo/contratos/missoes/m-20260709-google-ads-vilela.yaml`
- **Roadmap-pai:** `sobre-a-empresa/Projetos/Ativos/vilela-construction/google-ads/ROADMAP.md`
- **Arquitetura operável:** `arquitetura-de-conta.yaml` (mesma pasta)
- **Seed list:** `keywords/seed-list.csv` (mesma pasta)
- **Negativas master:** `keywords/negativas-master.csv` (mesma pasta)
- **Dossiê cliente:** `sobre-a-empresa/Projetos/Ativos/vilela-construction/dossie.md`
- **Dossiê site:** `sobre-a-empresa/Projetos/Ativos/vilela-construction/dossie-site-vilela-construction.md`
- **Diagnóstico tracking:** `sobre-a-empresa/Projetos/Ativos/vilela-construction/diagnostico-tracking-2026-07-01.md`

### B. Skills Peitho aplicadas

- `arquitetura-enterprise-ppc` (adaptada para $300/mês — 3 tiers vs 6, sem MCC dedicado)
- `search-query-analise` (aplicada na taxonomia de negativas do `negativas-master.csv`)
- `criativo-como-hipotese-rsa-pmax` (referenciada — Caliope executa copy na Onda 3 Phase 1)

### C. Handoffs para próximas rodadas

| Squad / Agente | O que faz | Quando |
|---|---|---|
| **Caliope** (`anuncio-por-estagio-de-consciencia` + `headline-e-hook-testaveis`) | Escreve os 8 RSAs (Brand + 3 Kitchen + 3 Bathroom + 1 Remkt) | Onda 3 Phase 1, D+7 |
| **Aglaia** (`Aglaia/skills`) | Produz 5 banners Remkt + og:image branded + 2 pares before/after Flooring/Painting | Onda 2 + Onda 3 Phase 1, D+3-D+10 |
| **Harmonia** (`estrutura-de-pagina-de-vendas`) | 9 fixes da LP + hidden field `service_selected` + gclid persistência | Onda 2, D+3-D+10 |
| **Aletheia** (`roteiro-de-entrevista`) | Roteiro para coletar 3 testimonials reais com Thiago | Onda 2 D+3 |
| **Peitho/pixel-specialist** | Camada 1 + 2 + 3 do tracking (ROADMAP §4 Onda 1) | Onda 1, D+3-D+7 |
| **Peitho/media-buyer** | Montagem física das 4 campanhas no painel Ads | Onda 3 Phase 3, D+7-D+10 |
| **Peitho/performance-analyst** | Relatório semanal sexta 15h Boston | Onda 4, D+10-novembro |
| **Peitho/ads-analyst** | Auditoria 200-checkpoints | D+30 |
| **Peitho/kasim-aslam** | Recalibração de valor de conversão | D+30 |
| **Dike** | Auditoria adversarial independente da entrega | D+30 |

### D. Gaps abertos (para outros subagentes preencherem)

1. **Copy dos 8 RSAs** — Caliope executa. Este documento entrega spec/pin strategy; escrita literal fica para o handoff.
2. **Banners Display Remkt (5 tamanhos)** — Aglaia executa.
3. **Confirmação B1** (taxa fechamento + margem) — Julio pede a Thiago; sem isso, valor de conversão fica `[BENCHMARK]` até D+30.
4. **Confirmação B2** (telefone real) — Julio pede a Thiago; sem isso, `call_extension: TBD` e Conversion Action secundária `Vilela_Phone_Call` fica pausada.
5. **Confirmação B4** (ID conta Google Ads) — Bernardo documenta em D+1.
6. **Recalibração de valores por serviço** com dados reais em D+30 — kasim-aslam executa.
7. **Se ROADMAP §3.3 for retificado** para MA+NH (não GA), toda a seção geo deste doc já está alinhada; documento sobrevive ao fix.

---

_Estratégia lavrada em 2026-07-09 pelo subagente Claude encarnando `traffic-chief` + `kasim-aslam` (Peitho). Aguarda revisão Ronan em D+3 antes do lançamento em D+10._
