---
id: rosie-deck-conteudo-bruno-2026-07-01
titulo: "Rosie — Plano estratégico 90 dias · conteúdo do deck (fonte para HTML e PPTX)"
autor: "Orfeu (nancy-duarte + oren-klaff + dan-harmon + park-howell) + Harmonia (design-chief + ui-engineer)"
skill_aplicada: [julgamento-estetico-anti-slop, sistema-de-design, tokens-de-design, implementacao-ui]
data: 2026-07-01
contrato: "Olimpo/contratos/missoes/m-20260701-112935-rosie-90d.yaml"
status: v3.1 — deck.html é a fonte autoritativa; este markdown mantém DELTAs por slide desde v1
versao_deck: 14 slides (v2 subiu de 11→12; v2.1 aditiva; v3 = pós-Solomon; v3.1 = +slide 11 "Como bater a meta" · IDs s11-s14 renumerados)
fontes:
  - dossie-tecnico/spec-rastreamento.md (v4 · Solomon primary)
  - dossie-tecnico/auditoria-site-vs-marca.md
  - dossie-tecnico/fluxos-email.md
  - dossie-tecnico/cenarios-funil-reverso.md (Pactolo · pendente v3 com AOV real)
  - dossie-tecnico/fluxo-comercial-crm.md (v2 · Kommo)
  - dossie-tecnico/estrutura-midia-paga.md
  - dossie-tecnico/cronograma-90d.md
  - "~/.claude/plans/retomar-an-lise-da-nifty-ritchie.md (análise Solomon 30d · F0.1 resolvido)"
tipo: projeto
projeto: rosie
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/rosie/apresentacao-bruno-2026-07-01/README|README]]"
---

> **Nota v3 (2026-07-01):** este markdown está em versionamento pendente v1→v3. A **fonte autoritativa** do que o Bruno vê é o `deck.html`. Cada slide abaixo mantém a redação v1 (histórica) + um bloco `### DELTA v3 · pós-Solomon` no fim, listando o que mudou no HTML após a análise Solomon 30d. Slides 4, 9, 10 e 11 foram tocados; 5-8, 12-13 seguem estáveis do v2.1. Não usar este markdown para gerar PPTX sem revisar os DELTAs.

# Rosie · Plano Estratégico 90 dias · conteúdo do deck

> Este arquivo é a **fonte textual única** do deck. O `deck.html` renderiza esses 11 slides com identidade Rosie; qualquer conversão para PPTX (Marp, Reveal, PowerPoint import) deve puxar daqui. Cada afirmação tem lastro nos 7 dossiês técnicos listados no frontmatter. Números sem lastro carregam tag `[BENCHMARK]` ou `[PENDENTE]` visível.

**Big Idea (Duarte).** *A Rosie tem tração real — R$21k em 5 dias. Antes de escalar mídia, é preciso consertar o balde. E R$5k/mês não fecha R$70/100/150k em nenhum cenário — precisamos decidir juntos qual caminho seguir.*

**Arco (Harmon Story Circle).** Onde a Rosie está (diagnóstico) → o que ela quer (metas) → o que precisa mudar (estratégia macro) → como (frentes 4-9) → o que decidir agora (10-11).

**Voz (Klaff).** Kolden é a autoridade estratégica que diz a verdade financeira. Frame prize — não persuadir, mostrar rigor. Não usamos "esperamos que", "achamos que", "vamos juntos". Falamos em absolutos apoiados em dados.

**Tom Rosie.** Descomplicado, sensorial, PT+EN em mistura fluida. "Effortless chic, todos os dias." "Just for fun!" — quando a linguagem do deck tocar a marca-Rosie, adota a voz Rosie; quando falar de plano Kolden, adota voz Kolden (técnica, direta).

---

## Slide 1 — Capa

> **Layout.** Fundo off-white `#FAF9F7` (não branco puro, para não bater com off-white de tela). Rose `#E6D2DC` como faixa vertical à esquerda ocupando 1/4 da tela. Centralizado à direita: nome do plano em Marcellus grande + subtítulo em DM Sans + selo Kolden discreto no rodapé. Foto 90s (retrato meio-corpo, se disponível) opcional em máscara vertical dentro da faixa rose. Sem CTA — é capa.
>
> **Elemento-assinatura.** Fio-loop rose 1px sublinhando a palavra *estratégico* no título.

**Conteúdo:**

Rosie
Plano Estratégico 90 dias

*Effortless chic — do funil ao caixa.*

Por Kolden · Julho 2026

**Notas PPTX.** Sem animação de entrada. Transição para o slide 2: fade sem parallax.

---

## Slide 2 — Diagnóstico

> **Layout.** Split assimétrico 40/60. Esquerda: número gigante R$21k em Marcellus display (tamanho 7rem+), sublinhado com fio-loop rose. Abaixo, "em 5 dias." em DM Sans regular. Direita: 3 blocos empilhados de gap crítico, cada um com título Marcellus 1.5rem e uma linha DM Sans small. Rodapé com micro-caption cinza escuro: "fonte: reabertura da loja, jun/2026 · dossiê Peitho §1.2".
>
> **Big Idea do slide (Duarte).** Você já validou o produto. O que trava é o funil, não a demanda.
>
> **Elemento-assinatura.** Fio-loop rose sublinhando "5 dias".

**Conteúdo:**

**R$ 21.000 em 5 dias.**
Isso é tração real. `[VALIDADO — briefing 2026-07-01]`

**Mas 3 gaps travam o funil hoje:**

1. **Sem Conversions API (CAPI) no Meta.**
   30-60% do sinal de conversão é perdido em iOS 14+ e ad-blockers. `[BENCHMARK — Meta Business Help 2024]` O algoritmo otimiza cego.

2. **Persona não validada por Mom Test.**
   Criativo hoje é hipótese. Score AC-4 de Depesh Mandalia: **11/20** — abaixo do piso de escala (17). Não escalamos; consertamos primeiro.

3. **Site sem identidade Rosie.**
   Anúncio segue o brandbook (rose, Marcellus, 90s). Site atual é preto & branco com Zen Kaku. Quebra de continuidade custa **10-50% do CVR** `[BENCHMARK — Nielsen Norman: message-match]`.

**And-But-Therefore (Howell):**
Você tem sinal validado E marca com identidade forte, MAS o funil vaza em três pontos críticos, PORTANTO os primeiros 30 dias são para consertar o balde antes de escalar.

**Notas PPTX.** Animação: números aparecem em ordem (1 → 2 → 3) com fade curto (150ms cada). Sem parallax.

---

## Slide 3 — Estratégia macro 90d

> **Layout.** Timeline horizontal com 3 fases empilhadas verticalmente (mobile-first). Cada fase tem: badge (M1/M2/M3), título Marcellus, uma frase DM Sans, e 2-3 marcos-âncora em bullets curtos. Fio rose 1px separa as fases. Rodapé com "Gates D+30 · D+60 · D+90" em Lato uppercase letterspacing.
>
> **Big Idea do slide.** Três fases, três verbos: aquecer, consolidar, escalar. Cada fase tem um gate binário — não avança sem prova.

**Conteúdo:**

**A jornada dos 90 dias.**

**M1 · Aquecer** *(D+0 → D+30)*
Consertar o balde. Rodar mídia em modo aprendizado.
- CAPI Meta live em D+15
- Landing quick-win no ar em D+10
- 5 fluxos de e-mail rodando no RD Station em D+12
- Pipeline GHL + cadência WhatsApp em produção em D+15
- **Gate 1 D+30**: ROAS Meta ≥ 2,0x sustentado, CVR site ≥ 1,0%, persona validada.

**M2 · Consolidar** *(D+30 → D+60)*
Destravar o Fundo do funil. Iterar criativo com persona validada.
- Meta Fundo (Conversão Purchase) ativo
- DPA Infinity Retargeting rodando
- YouTube ADUCATE em produção
- **Gate 2 D+60**: ROAS blended ≥ 3,0x — é o gatilho de upgrade de budget.

**M3 · Escalar** *(D+60 → D+90)*
Escalar o que provou. Cascading videos, PMax madura.
- Cascading remarketing YouTube (-50% CPA vs baseline)
- PMax refinada com 6 semanas de dados
- LTV/CAC reconciliado com cohort real
- **Gate 3 D+90**: decisão de continuidade + próximo Contrato de Missão.

*Fonte: dossiê Cairos — cronograma-90d.md §2-3.*

**Notas PPTX.** Fase M1/M2/M3 aparecem em cascata (200ms cada).

---

## Slide 4 — E-mail marketing (Caliope)

> **Layout.** À esquerda, coluna vertical listando os 5 fluxos com número, nome, cadência (D+0/D+1/D+3) em micro Lato. À direita, um dos e-mails renderizado como mockup dentro de um "envelope" light-pink `#F8E3E8` — preferir o E-mail 1.1 "Oi, sou a Catarina" para mostrar a voz. Rodapé: métrica-âncora ("~5.500 contatos engajados no RD Station · lista já limpa").
>
> **Big Idea do slide.** A voz da Catarina é o ativo. O e-mail escala essa voz sem escalar as horas dela.

**Conteúdo:**

**5 fluxos, uma voz.**

| # | Fluxo | Cadência | Especialista líder |
|---|---|---|---|
| 1 | **Boas-vindas** | 5 e-mails · D+0 → D+5 | Andre Chaperon (Soap Opera Sequence) |
| 2 | **Nutrição semanal** | 1 e-mail/semana · terça 10h · ciclo de 12 | Ben Settle (infotainment adaptado) |
| 3 | **Carrinho abandonado** | 3 e-mails · D+0 / D+1 / D+3 | Ry Schwartz (coaching the conversion) |
| 4 | **Pós-compra** | 4 e-mails · D+0 / D+3 / D+7 / D+21 | Russell Brunson (value ladder) |
| 5 | **Reativação (winback)** | 3 e-mails · D+45 / D+52 / D+59 | Todd Brown (E5) + Ben Settle |

**Voz Catarina, exemplo (E-mail 1.1 · Boas-vindas):**

> *"Oi, prazer. Sou a Catarina, a cat que assina os e-mails da Rosie. A Rosie nasceu de uma incomodada minha. Eu tinha um armário cheio e nada para vestir. Peça bonita que amassava no primeiro uso, básico que desbotava na terceira lavagem, jeans que servia só na loja. Cansei."*

**Base ativa**: ~5.500 contatos engajados no RD Station (após limpeza). `[VALIDADO — briefing]`
**Contribuição esperada ao faturamento**: 15% (Conservador) · 25% (Realista) · 35% (Agressivo). `[HIPÓTESE — dossiê Pactolo §2]`

**Cupons a criar**: `PRIMEIRA` (frete grátis boas-vindas, 7d) · `SEUFRETE` (frete grátis carrinho E3, 48h).

*Fonte: dossiê Caliope — fluxos-email.md.*

**Notas PPTX.** Mockup do e-mail é imagem estática no PPTX.

### DELTA v3 · pós-Solomon (2026-07-01)

- **Título mudou** (v2): "Cinco fluxos, uma voz." (`h2.title` no HTML).
- **Adicionado callout de retenção logo abaixo do lead:** "Hoje só **0,97%** das clientes de junho voltaram a comprar (safra jun/2026 · Solomon). Alvo depois dos 5 fluxos rodando: **5%**. Só isso tira a receita recorrente de R$ 4,9 mil pra ~R$ 25 mil por mês, sem gastar R$ 1 a mais em mídia."
- **Chip** `validado · Solomon 30d`.
- Contribuição orgânica esperada por Pactolo mantida (15/25/35%) até reconciliação v3 do Pactolo.

---

## Slide 5 — Meta Ads (Peitho + Sobral + Mandalia)

> **Layout.** Topo: título Marcellus + subtítulo. Meio: estrutura CBO 3-camadas (Topo/Meio/Fundo) como diagrama vertical fino, com % budget por fase em cada camada. Direita: 3 ângulos criativos como cards compactos (nome + hook curto). Rodapé: score AC-4 Mandalia como micro-caption.
>
> **Big Idea do slide.** Não é público, é criativo — "criativo é a segmentação" (Sobral). 3 ângulos, GT-1 sandbox, iteração via Aletheia D+30.

**Conteúdo:**

**Meta Ads · CBO Full Funnel.**

**Estrutura de budget por fase:**

| Camada | M1 | M2 | M3 |
|---|---|---|---|
| **Topo** (Reconhecimento) | 30% (R$900) | 25% (R$688) | 20% (R$500) |
| **Meio** (Consideração) | 35% (R$1.050) | 40% (R$1.100) | 40% (R$1.000) |
| **Fundo** (Conversão) | 35% (R$1.050) | 35% (R$963) | 40% (R$1.000) |

Regra dura Mandalia: **Fundo só liga em D+15 (pós-CAPI)**.

**3 ângulos criativos (hipóteses — validar em GT-1):**

1. **Rosie Girl real** — UGC + Catarina.
   *Hook: "Descobri uma marca brasileira que me fez parar de comprar em fast fashion."*
2. **Guarda-roupa cápsula** — Reels transição, versatilidade.
   *Hook: "5 peças da Rosie que combinam entre si. Um guarda-roupa inteiro."*
3. **Statement moment** — cinemático, ocasião.
   *Hook: "O momento em que você entra na sala e o assunto muda."*

**ROAS-alvo por fase:**
M1 = 2,5x (aprendizado) · M2 = 3,5x (pós-CAPI) · M3 = 5,0x (criativo maduro).

**Score AC-4 hoje**: **11/20** — Produto 4 · Público 2 · Oferta 3 · Funil 2. *Abaixo de 17 não escalamos — consertamos.* — **Depesh Mandalia**

*Fonte: dossiê Peitho — estrutura-midia-paga.md §2-3.*

**Notas PPTX.** Diagrama CBO 3-camadas como SVG estático.

---

## Slide 6 — Google Ads (Peitho + Kasim + Breeze)

> **Layout.** 3 blocos horizontais (Search Branded · PMax refinada · YouTube ADUCATE), cada um com micro-headline + parâmetro-chave + KPI-alvo. Faixa rose fina separa os blocos. Rodapé: sinal atual da PMax ("R$96 gastos, 64 cliques, CPC R$1,51 — sinal frio, não confie em face value" — Kasim).
>
> **Big Idea do slide.** "O Google não está do lado da Rosie" (Kasim). Jogamos por regras nossas: separar asset groups por sinal, defender marca, YouTube só em M2.

**Conteúdo:**

**Google Ads · três alavancas.**

**1. Search Branded — defesa da marca "Rosie"**
- Budget: R$300-500/mês
- KPI: Search Impression Share ≥ 90%, ROAS ≥ 8x
- Palavras: `[rosie]`, `[rosie moda]`, `[rosie loja]`, variações

> *"A hora em que um concorrente compra 'Rosie' no Google Ads, ele está literalmente pagando para roubar a demanda que vocês criaram. Deixar essa gaveta aberta é caridade para a concorrência."* — Kasim Aslam

**2. PMax refinada — 3 asset groups por sinal**
- Budget: R$1.500-2.000/mês
- Asset groups: Básicos · Statement · Acessórios (feed Nuvemshop filtrado por categoria)
- Sinais: visitantes 30d + lista 5.5k (Customer Match) + LAL 1%
- **Guardrail Kasim**: ler placement report semanal; se >40% do gasto for Display/Discover, forçar exclusões.
- KPI: ROAS ≥ 3x (M1) → 4x (M2) → 5x (M3)

**3. YouTube ADUCATE (ativa M2)**
- Budget: R$500 (M2) → R$750 (M3)
- Formatos: In-stream skippable 2min20s (framework ADUCATE completo) + Shorts 30-60s
- Placements: canais de moda BR (pequenas influencers, mais atenção)
- KPI: CPV ≤ R$0,15, View Rate ≥ 30%, ROAS ≥ 2x (M2) / 3x (M3)

**Sinal atual da PMax**: R$96 gastos · 64 cliques · CPC R$1,51 `[VALIDADO — Google Ads console]`. Sinal frio.

*Fonte: dossiê Peitho — estrutura-midia-paga.md §4.*

**Notas PPTX.** Sem animação.

---

## Slide 7 — Plano de mídia R$5k (Peitho + Pactolo)

> **Layout.** Título + subtítulo. Abaixo, tabela horizontal grande com alocação por canal × mês. Barra empilhada em SVG ao lado (Meta / Google PMax / Search Branded / YouTube). Rodapé com regra de escala: "só escala com ROAS ≥ target + 3 dias sustentados + volume mínimo".
>
> **Big Idea do slide.** R$5k é o teto travado. Meta baixa de 60% → 50% conforme YouTube prova. Search Branded fixo (defesa). Regra de ferro: só escala com prova.

**Conteúdo:**

**Plano de mídia · R$5.000/mês.**

| Canal | M1 | M2 | M3 |
|---|---|---|---|
| **Meta Ads** (Topo+Meio+Fundo) | **R$3.000** (60%) | **R$2.750** (55%) | **R$2.500** (50%) |
| **Google PMax** | **R$1.250** (25%) | **R$1.250** (25%) | **R$1.250** (25%) |
| **Google Search Branded** | **R$500** (10%) | **R$500** (10%) | **R$500** (10%) |
| **YouTube ADUCATE** | **R$250** (5%) | **R$500** (10%) | **R$750** (15%) |
| **Total** | **R$5.000** | **R$5.000** | **R$5.000** |

**Justificativa (Fiscal Peitho):**
Meta 60% em M1 é motor de aprendizado. Cede espaço em M2/M3 conforme YouTube prova ROAS. PMax estável (não escala com budget travado). Search Branded fixo — é defesa, não crescimento.

**Regra de ferro (Mandalia + Sobral + Kasim):**
> Só escala uma campanha se **(1) ROAS ≥ target de fase por 3 dias consecutivos + (2) volume mínimo ≥ 10 purchases (Meta) ou 15 (Google PMax)** no período.
> **Kill switch**: se ROAS < break-even (≈ 1,4x com margem 70%) por 5 dias seguidos → pausa, revisa criativo e público antes de reativar.

**Gatilho de upgrade condicionado (D+60):**
Se em Gate 2 o ROAS blended atingir ≥ 3x sustentado por 14 dias + orgânico não desacelerar → **Kolden recomenda escalar M3 para R$10-12k/mês**. Decisão sua, sobre dados reais — nunca antes.

*Fonte: dossiê Peitho — estrutura-midia-paga.md §5.*

**Notas PPTX.** Barra empilhada como imagem estática.

---

## Slide 8 — Comercial · CRM (Emporos)

> **Layout.** Diagrama de fluxo horizontal fino: Nuvemshop → RD Station → GHL, com 3 caixinhas ligadas por seta rose. Abaixo: 4 estágios do pipeline como cards em linha (Descoberta / Consideração / Ativo / Reativação). À direita, box compacto com SLA 15min destacado em Marcellus grande. Rodapé: 3 KPIs-alvo compactos.
>
> **Big Idea do slide.** Catarina não escala em 24 horas por dia — mas a voz dela sim. GHL + RD Station + WhatsApp automatizam o que hoje é reativo.

**Conteúdo:**

**Comercial · CRM · Nuvemshop → RD → GHL.**

**Arquitetura de dados:**
```
Nuvemshop (loja / SoR do pedido)
  ↓ webhook (email + telefone + evento + UTMs + valor)
RD Station (SoR do contato + segmentação por comportamento)
  ↓ sync bidirecional
GHL (SoR da conversa + estágio do deal + WhatsApp + pipeline)
```

**Pipeline · 4 estágios:**

1. **Descoberta** · view_item 2+ sessões OU form preenchido · sequência RD nutrição · SLA 24h (auto)
2. **Consideração** · add_to_cart sem purchase OU score RD ≥ 40 · cadência WhatsApp abandono (3 toques D+0/D+1/D+3) + tag `alta-intencao` · **SLA 15 min** (humano)
3. **Cliente ativo** · purchase concluída últimos 90d · fluxo pós-compra Caliope + cross-sell D+21
4. **Reativação** · sem nova compra há 90d · winback Todd Brown adaptado

**SLA de resposta WhatsApp: 15 minutos** *(comercial · 9h-20h)*
Benchmark setor médio: 30-60 min.

**Atribuição offline** — quando WhatsApp fechar venda, GHL grava `venda-atribuida:{canal_utm}` no RD **e** dispara Conversions API do Meta + upload de conversão offline Google Ads. **Sem isso, atribuição fica cega e Pactolo modela ROAS no chute.**

**KPIs 90d:**
- Taxa de recuperação de carrinho ≥ 15% *(benchmark BR: 10-20%)*
- LTV médio: baseline em D+30, +20% em D+90
- Tempo médio de resposta WhatsApp ≤ 15 min

*Fonte: dossiê Emporos — fluxo-comercial-crm.md §2-9.*

**Notas PPTX.** Diagrama de fluxo como SVG.

---

## Slide 9 — Rastreamento (Peitho + Hefesto)

> **Layout.** Diagrama técnico horizontal em 2 linhas: linha superior = client-side (Nuvemshop → GTM Web → Meta Pixel + GA4 + Google Ads tag). Linha inferior = server-side (Nuvemshop Webhooks → GTM Server-side em Cloudflare Workers → Meta CAPI + GA4 MP + Enhanced Conversions). Setas rose ligam as camadas. Rodapé: EMQ alvo + custo estimado.
>
> **Big Idea do slide.** Sem CAPI, 30-60% do sinal Meta vira invisível — e o algoritmo otimiza cego. Com CAPI, ROAS Meta sobe de 1,8x para 2,5x (+39%). É a alavanca de maior salto unitário do plano.

**Conteúdo:**

**Rastreamento · CAPI + GA4 + GTM server-side.**

**O problema hoje:**
- Meta Pixel roda **só browser-side**. Em iOS 14+ com ATT recusado e em ad-blockers, o Pixel perde **30-60% dos eventos** `[BENCHMARK — Meta Business Help 2024]`.
- Sem CAPI, o algoritmo Meta otimiza sobre dados incompletos: pior EMQ, CAC inflado, aprendizado que nunca fecha.
- GA4 e-commerce provavelmente sem `purchase` com `transaction_id` + `items[]` — sem isso, não há relatório de produto, cohort ou funil confiável.

**A stack proposta:**

```
[Nuvemshop] ─→ [GTM Web] ─→ [Meta Pixel + GA4 + Google Ads tag]
       │
       ├─ dataLayer ────────────────────────────────────────────┐
       ↓                                                        ↓
[Nuvemshop Webhook: order/paid] ─→ [GTM Server-side (CF Workers)] ─→ [Meta CAPI + GA4 MP + Enhanced Conversions]
                                                        │
                                                        └─→ [RD Station API]
```

**6 eventos e-commerce mínimos:**
`page_view · view_item · add_to_cart · begin_checkout · add_payment_info · purchase`

Todos com `event_id` (UUID) compartilhado browser↔server para dedup. `purchase` server-side é fonte de verdade (webhook Nuvemshop); browser é backup.

**EMQ alvo:** `purchase` ≥ 8/10 · `view_item` ≥ 6/10.

**Custo mensal estimado:** GTM Server em Cloudflare Workers **gratuito até 100k req/dia** `[BENCHMARK]`. Sem custo relevante.

**Delta esperado de ROAS Meta:** 1,8x (sem CAPI) → **2,5x (com CAPI, D+15)** → **3,5x (+ criativo maduro, D+45)**. `[BENCHMARK — Meta oficial + delta pós-CAPI]`

**Marco bloqueante:** **D+15**. Sem CAPI live, o Fundo do funil não pode ligar em modo Conversão-Purchase honesto.

*Fonte: dossiê Peitho/pixel-specialist — spec-rastreamento.md.*

**Notas PPTX.** Diagrama como SVG.

### DELTA v3 · pós-Solomon (2026-07-01)

- **Título mudou (v2):** "Uma fonte só pra saber de onde vem cada venda." Solomon posicionada como fonte primária (v2 → v3 sem mudança de papel).
- **Adicionado bloco "O mesmo pedido · 3 realidades" entre o `.solomon-block__why` e a `.track-list`.** Compara:
  - Meta Ads Manager: **retorno 12,54x** (Meta conta como se todo pedido que ela tocou fosse dela).
  - Painel Solomon · último clique pago: **retorno 3,62x** (o que Bruno vê ao abrir o painel).
  - Solomon · crédito distribuído (linear): **retorno 2,45x** (visão neutra, divide o pedido entre canais).
- **Fecho:** "É pra isso que a Solomon existe: você para de discutir com a Meta e passa a decidir onde investir olhando um só número, do mesmo lado da mesa."
- **Chip** `validado · Solomon 30d`.
- Linguagem PT-BR simples: nunca CAPI/S2S/EMQ; "conversão via API" mantido nas cartas de v2.

---

## Slide 10 — Metas & Cronograma 90d **(SLIDE-CHAVE — cenários interativos)**

> **Layout.** Toggle no topo com 3 botões (Conservador / Realista / Agressivo). Abaixo, 3 barras SVG grandes (M1 / M2 / M3) mostrando faturamento projetado vs meta declarada — a barra da meta declarada em rose claro atrás, a barra do cenário selecionado em rose escuro à frente. Ao lado, tabela compacta com premissas do cenário selecionado. Abaixo de tudo, banner amarelo destacado com a **flag vermelha**: "meta R$70/100/150k não fecha em nenhum dos 3 cenários com R$5k de mídia". 3 cenários e as premissas mudam ao clicar no toggle (JS puro, sem lib).
>
> **Big Idea do slide.** Este é o insight-âncora do deck: **matematicamente**, R$5k de mídia não fecha R$70/100/150k em nenhum cenário — nem no Agressivo. Isso não é execução ruim; é aritmética de funil. E você precisa decidir agora: renegociar meta, renegociar budget, ou aceitar patamar realista + roadmap para escalar.
>
> **Frame Klaff.** Aqui é onde o pitch pega frame prize. Kolden não pede desculpa nem sugere hedging — mostra o número, diz o que ele significa, oferece 3 caminhos. Bruno decide.

**Conteúdo:**

**Metas · 3 cenários · a verdade do funil.**

**Meta declarada:** M1 = R$70k · M2 = R$100k · M3 = R$150k
**Budget mídia:** R$5.000/mês fixo

**Aritmética do funil (funil reverso Pactolo):**

Faturamento pago = Budget × ROAS blended. Com R$5k e ROAS blended saudável (3-4x em moda BR), o teto de faturamento pago é **~R$15-20k/mês**. Orgânico contribui 15-35% dependendo do cenário.

**3 cenários lado a lado (Faturamento total M1/M2/M3):**

| Cenário | M1 | M2 | M3 |
|---|---|---|---|
| **Conservador** *(sem CAPI maduro, criativo em teste, orgânico frio)* | R$7.647 | R$9.088 | R$10.588 |
| **Realista** *(CAPI live D+15, criativo iterando, orgânico ativo)* | R$10.900 | R$15.333 | R$20.667 |
| **Agressivo** *(6 premissas otimistas simultâneas)* | R$17.308 | R$24.038 | R$31.154 |
| **Meta declarada** | R$70.000 | R$100.000 | R$150.000 |
| **Gap Realista vs Meta** | −R$59.100 | −R$84.667 | −R$129.333 |

**Flag vermelha (a mensagem inegociável para o Bruno):**

> **Nenhum dos 3 cenários bate M1, M2 ou M3.**
> Mesmo o Agressivo — que empilha 6 premissas otimistas simultâneas — chega a **R$31k/mês** no M3. Gap vs meta: **−R$119k**.
>
> **Isso não é execução ruim. É aritmética.**
>
> Para bater R$150k com R$5k de mídia, seria necessário:
> - (a) elevar budget para **R$30-40k/mês** *(mais viável)*, **OU**
> - (b) elevar CVR do site para **>4%** *(ordem de grandeza acima do benchmark BR de 1,5%)*, **OU**
> - (c) elevar ticket médio para **>R$450** *(60% acima do benchmark premium)*.

**3 caminhos que precisam ser decididos:**

1. **Renegociar meta.** Travar M1 realista em R$15-25k/mês. Usar M1/M2 para instalar CAPI, destravar ROAS Meta 2,5x → 3,5x. Reavaliar M3 sobre dados reais.
2. **Renegociar budget.** Manter meta agressiva → **elevar mídia para R$10-15k/mês em M2**, gatilhado por ROAS Gate 2 ≥ 3x. Business case Pactolo entrega em D+60.
3. **Aceitar patamar realista + roadmap.** Aceita M1 = R$20k, M2 = R$40k, M3 = R$80k (com upgrade condicionado no Gate 2). Renova contrato em D+90 com meta calibrada por realizado.

**Recomendação Pactolo → Bruno:**
> Travar meta M1 realista em R$15-25k/mês. Usar M1/M2 para instalar CAPI (delta ROAS +39%) e provar sinal. Só reavaliar meta agressiva no Gate 2 (D+60) sobre ROAS ≥ 3x sustentado.

**Sensibilidade (Realista M3):** mesmo cenário Realista +20% em todos os drivers devolve R$35,7k/mês — ainda 24% da meta.

*Fonte: dossiê Pactolo — cenarios-funil-reverso.md §2-4.*

**Notas PPTX.** No PPTX o toggle vira 3 slides seguidos (Conservador / Realista / Agressivo). O gráfico de barras é imagem estática por cenário.

### DELTA v3.1 · reconciliação Solomon fresco (2026-07-01T23:30)

- Baseline block atualizado: **CAC R$ 48,69** (era R$ 48,59) e **retorno agregado 10,54x** (era 10,56x). Diferença puxada da leitura Solomon fresca. Adicionada nota entre parênteses: "R$ 5 mil de mídia (R$ 5.258 com imposto Meta)" — Bruno vê o que paga e a linha real do painel.
- Slide 9 · 3 lentes de atribuição atualizadas: **Meta 12,52x** (era 12,54), **Solomon paid_last_click 3,61x** (era 3,62), **linear 2,44x** (era 2,45). Arredondamento de leitura fresca.

### DELTA v3 · pós-Solomon (2026-07-01) — SLIDE MAIS REESCRITO

**AOV real substituiu placeholder R$250** (chip agora `validado · Solomon 30d`):
- M1: R$ 465,59 · **172 vendas** para bater R$ 80k
- M2: R$ 465,59 · **215 vendas** para bater R$ 100k
- M3: R$ 465,59 · **322 vendas** para bater R$ 150k

**Baseline junho/2026 adicionado antes dos cenários (bloco novo):**
> R$ 55.405 de receita aprovada · 119 pedidos · CAC R$ 48,59 · retorno agregado 10,56x. **A Rosie já roda este número com R$ 5 mil de mídia.** Os três cenários abaixo comparam com esta linha de partida — não com zero.

**Toggle de cenários recalculado** (mantém eficiência Pactolo aplicando AOV real):
| Cenário | M1 | M2 | M3 |
|---|---|---|---|
| Conservador | R$ 16.181 | R$ 19.233 | R$ 22.407 |
| Realista | R$ 20.300 | R$ 28.555 | R$ 38.490 |
| Agressivo | R$ 27.784 | R$ 38.594 | R$ 50.019 |

Cada cenário reconhece no `reading` que o modelo Pactolo original era pessimista — a realidade de junho (R$ 55,4k) ficou acima até do Agressivo M3 (R$ 50,0k), o que indica que orgânico + baseline estavam sub-dimensionados no modelo v2. Reconciliação Pactolo v3 pendente.

**Bloco vermelho de honestidade completamente reescrito** (era "R$80k é possível se 4 canais rodarem juntos"):
> **Junho fechou R$ 55.405 com R$ 5 mil de mídia. Meta M1 = R$ 80 mil pede +44% sobre isso — não +512% sobre zero.** Não é dobrar do dia pra noite. É somar cerca de R$ 25 mil por mês em cima do que já rodou. Três alavancas fecham esse delta:
> 1. **Retenção do primeiro mês** — hoje só 0,97% das clientes de junho voltaram a comprar. Com os fluxos de e-mail e carrinho abandonado do RD Station rodando (slide 4), essa taxa pode subir pra 5%. Só isso tira a receita recorrente de R$ 4,9 mil pra ~R$ 25 mil por mês, sem gastar R$ 1 a mais em mídia.
> 2. **Conexão da Meta com a venda real** — o evento "dados da cliente" está em zero no painel Solomon, indicando conexão quebrada. Quando a Solomon começar a mandar esses dados por trás (slide 9, dia 15), a Meta sai de "97% do dinheiro no iPhone" e passa a encontrar cliente também no Android — e o retorno da mídia sobe.
> 3. **Origem certa em cada venda** — R$ 4,9 mil de junho chegaram como "sem origem" (link in bio, e-mail, influencer sem tag). Padronizando os links (slide 9, dia 21), a gente para de gastar às cegas e escala o que já vende.
>
> Se as três destravarem em 30 dias, R$ 80 mil no Mês 1 é factível. Se uma travar, a faixa realista é R$ 65–75 mil. **Não é meta impossível — é meta condicionada.**

**Caption do gap M1** (SVG): `gap M1 vs meta: −R$63.819 · modelo Pactolo · comparar com baseline real R$55,4k abaixo`.

---

## Slide 11 — Como bater a meta · matemática do funil **(NOVO em v3.1 · 2026-07-01)**

> **Layout.** Bloco 1 (baseline junho: investimento R$5.258, retorno R$55.405, retorno agregado 10,54x) em 3 cards horizontais. Bloco 2 (split por canal em 3 cartões coloridos: 41% anúncios / 57% orgânico / 2% e-mail). Bloco 3 (regra da Kolden — retorno teto 3x). Bloco 4 (tabela grande de distribuição por mês). Bloco 5 (comparativo lado a lado: média do setor vs. Rosie hoje vs. modelo M3).
>
> **Big Idea.** A mídia paga tem teto. Quanto ela sustenta com honestidade — e o que precisa vir de cada outra fonte para bater R$ 80k → R$ 100k → R$ 150k. Sem cálculo mágico.

**Conteúdo:**

**A matemática do funil.**

### Junho de 2026 · o que a Solomon mediu

| Métrica | Valor | Nota |
|---|---|---|
| Investimento em mídia | R$ 5.258 | Meta + Google + imposto Meta |
| Retorno (receita aprovada) | R$ 55.405 | 119 pedidos aprovados |
| Retorno agregado | 10,54x | Todos os canais somados |

> Retorno agregado **10,54x** parece alto porque mistura mídia paga com orgânico e e-mail. Se olhar só o que a mídia realmente puxou, o retorno cai — e é esse número que a gente usa pra planejar.

### De onde veio cada real · junho 2026 (Solomon paid_last_click)

- **41% · Anúncios pagos** — R$ 22.667 (Meta R$ 10k + Google R$ 12,7k). Retorno médio 4,3x.
- **57% · Orgânico + direto** — R$ 31.636 (Instagram link R$ 17k + orgânico social R$ 9,7k + direto R$ 4,9k).
- **2% · E-mail (RD)** — R$ 1.103 (apenas 1 fluxo rodando, "reativação"). Conversão por sessão **7,69%** — 11x acima da média geral do site.

### A regra que a Kolden usa para planejar

Planejamos com **retorno teto de 3x** para a mídia paga — não com o 4,3x que aconteceu em junho. Motivo: 3x é o piso saudável do mercado (moda BR premium roda entre 2x e 4x); planejar com 4,3x é apostar que junho se repete todo mês, e isso trava a conversa quando um mês desliza. **Com R$ 5.000 de mídia × 3x = R$ 15.000/mês que cabem à mídia paga.** Se o retorno ficar em 4x, sobra receita — melhor termos que redistribuir sobrando do que devendo.

### Distribuição justa por canal · como bater cada meta

| Fonte | M1 · R$ 80.000 | M2 · R$ 100.000 | M3 · R$ 150.000 |
|---|---|---|---|
| **Mídia paga** (Meta + Google, retorno teto 3x) | R$ 15.000 · **19%** | R$ 15.000 · 15% | R$ 15.000 · **10%** |
| **Orgânico + direto** (Instagram, social, marca) | R$ 40.000 · 50% | R$ 45.000 · 45% | R$ 60.000 · 40% |
| **E-mail + retenção M+1** (5 fluxos RD + carrinho) | R$ 20.000 · **25%** | R$ 30.000 · 30% | R$ 55.000 · **37%** |
| **Comercial ativo** (WhatsApp abandono + VIP) | R$ 5.000 · 6% | R$ 10.000 · 10% | R$ 20.000 · 13% |
| **Total** | **R$ 80.000** | **R$ 100.000** | **R$ 150.000** |

A mídia paga não cresce em real, mas cai como % do total (19% → 10%). É saudável: a base orgânica e o e-mail estão fazendo o trabalho pesado. Mídia paga escala quando o e-mail escala.

### Comparativo com o mercado · moda BR premium

**Média do setor:**
- Mídia paga: **25 a 45%** da receita
- E-mail: **5 a 15%** da receita
- Orgânico + direto (marca com identidade): **30 a 50%**

*Fonte: Nuvemshop insights + Meta Business Reports 2024.*

**Rosie · junho vs. modelo M3:**
- Mídia: **41% hoje** → 10% em M3 (mais conservador que setor)
- E-mail: **2% hoje** → 37% em M3 (subutilizado hoje, virá alavanca)
- Orgânico: **57% hoje** → 40% em M3 (mantém volume em real, cede espaço em %)

**Leitura:** a Rosie hoje tem uma perna curta (e-mail) e outra sobrecarregada (mídia). O modelo M3 proposto reequilibra pra um padrão típico de marca de moda madura — mídia sustenta, e-mail multiplica, orgânico dá volume.

*Fonte: leitura Solomon 30d 2026-06-01→2026-07-01 · conta caOEzYj1TqRM0r3nHrFP · MCP oficial.*

**Notas PPTX.** Bloco 4 (tabela) precisa ser imagem estática. Os outros 4 blocos podem ser slides individuais no PPTX.

---

## Slide 12 — Próximos passos (era Slide 11 até v3 · renumerado em v3.1)

> **Layout.** 5 blocos horizontais com número + decisão + owner + prazo. Cada bloco compacto. Rodapé: nota Kolden — "estamos prontos para começar assim que 1-3 estiverem travados".
>
> **Big Idea do slide (Klaff — hookpoint + get deal).** Não pedimos aprovação genérica. Pedimos 5 decisões específicas com nome do dono e prazo. Bruno sai da apresentação com uma checklist, não com uma "reflexão".
>
> **Frame prize.** Removemos atrito ("é isso que acontece em seguida"). Não perseguimos, não hedgeamos.

**Conteúdo:**

**Semana 1 — 5 decisões suas.**

1. **Meta operacional.** Bruno decide: caminho 1, 2 ou 3 do slide anterior. *(Sem essa decisão, Pactolo não modela unit economics; Peitho não escala além do aprendizado; contrato R$4k+3% opera no escuro.)*
   *Owner: Bruno · Prazo: D+3*

2. **F0 técnico.** Entrega dos 5 dados-fonte: AOV real 30d, margem líquida agregada, CVR site 30d, lista dos 10 estados prioritários, sinal PMax pós-aprendizado.
   *Owner: Bruno · Prazo: D+2*

3. **Deploy do CAPI.** Aprovar quem executa: time técnico Rosie **ou** Hefesto (Kolden) sob escopo adicional. *(Spec já entregue por Peitho/pixel-specialist. Sem CAPI live em D+15, Meta Fundo não liga e Gate 1 fica em amarelo.)*
   *Owner: Bruno + Ronan · Prazo: D+5*

4. **Fotos 90s para landing quick-win.** Confirmar disponibilidade no banco fotográfico da Rosie ou autorizar curadoria do IG da Catarina. *(Se nenhum caminho fecha, shoot novo entra em Contrato próximo 90d.)*
   *Owner: Bruno + Catarina · Prazo: D+7*

5. **Cadência de comunicação.** Confirmar reunião semanal fixa terça 10h *(30 min · Ronan + traffic-chief)* + relatório 1-página. Alternativa: 45 min quinzenal.
   *Owner: Bruno · Prazo: D+3*

**Nota Kolden:**
> Estamos prontos para começar assim que 1-3 estiverem travados. As frentes 4-9 já rodam em paralelo desde D+1 (não dependem de F0). O único que trava tudo é o CAPI.

*Fonte: consolidação dos 7 dossiês técnicos.*

**Notas PPTX.** Sem animação. Este é o slide de fechamento — respiro máximo.

### DELTA v3 · pós-Solomon (2026-07-01)

**Título e lead atualizados:** "Seis decisões pra fechar." · "Seis pontos que dependem da Rosie/Bruno. Quatro já viraram decisão — faltam duas."

**6 decisões (mantendo continuidade v2/v2.1):**

- **A [confirmada]** Meta do Mês 1 = **R$ 80 mil mantido** — meta de **+44% sobre os R$ 55,4 mil de junho** (Solomon 30d), não +512% sobre zero. Kolden monta plano nos 4 canais + destrava as três alavancas do slide 10 (retenção M+1, conexão Meta, origem certa). Revisa em D+30 com painel Solomon vivo.
- **B [confirmada]** Verba de mídia = R$ 5 mil/mês mantido, retorno alvo 2-3x. Escala só depois de 60 dias com retorno estável em 3x.
- **C [parcial]** Números Nuvemshop: **ticket médio já resolvido via Solomon (R$ 465,59)**. Falta: margem líquida por linha de produto + frequência de recompra por cliente. Bruno mandar em 3 dias.
- **D [confirmada]** Solomon: SOLOMON_COMPANY_ID + SOLOMON_TOKEN_API prod/sandbox confirmados. MCP interno Íris já construído (KLD-2026-118). SDK deploy semana 1.
- **E [providenciar]** Aviso de cookies (Consent Mode v2) na Nuvemshop, semana 2.
- **F [decisão sua] · NOVA** TikTok Ads: contrato prevê, hoje = zero gasto/venda. Opção A: ativar em Fase 2 (dia 30) com reserva R$ 250-500 do R$ 5 mil sem tirar de Meta/Google. Opção B: registrar por escrito fora do escopo desta rodada, revisitar no Mês 3. Bruno responde na reunião.

---

## Rodapé de todos os slides

Formato micro (DM Sans 0.7rem, cinza claro): **Rosie · Kolden · 2026-07-01 · slide N/11**

Marca Rosie dominante à esquerda (só nome). Selo Kolden discreto à direita ("por Kolden").

---

## Notas de execução (para conversão PPTX)

**Fontes.** Marcellus (títulos) e DM Sans (corpo) via Google Fonts. Ao exportar PPTX, embutir as fontes ou usar fallback Georgia + Arial.

**Cores.**
- Rose primária: `#E6D2DC`
- Light pink pontual: `#F8E3E8`
- Preto quente: `#14100C` (NUNCA `#000000`)
- Off-white base: `#FAF9F7`
- Cinza claro: `#EBEBEB`
- Cinza escuro: `#BDBAB5`

**Elemento-assinatura (regra do "tire um acessório").**
Um fio-loop rose 1px sublinhando **uma palavra** por slide. Nunca dois. Nunca em todo texto.

**Densidade.**
Slide 10 é o mais denso (é o insight-âncora); os demais são editoriais com muito respiro. Slide 2 = 3 gaps + 1 número; slide 11 = 5 cards curtos.

**Anti-slop check final (Harmonia).**
- Sem gradiente rose-de-IA (rose chapado sob foto tratada, nunca gradiente).
- Sem 3 cards iguais (cada card diferencia por conteúdo ou crop).
- Sem ícones lucide/heroicons genéricos.
- Sem eyebrow numerada "01 —".
- Sem glassmorphism.
- Copy PT com toque EN pontual ("effortless chic", "just for fun"), nunca inglês corporativo tipo "Elevate your style".

---

**Assinado.** Orfeu (story-chief + nancy-duarte + oren-klaff + dan-harmon + park-howell) para narrativa; Harmonia (design-chief + ui-engineer + skill julgamento-estetico-anti-slop) para implementação visual.
**Skills aplicadas.** `julgamento-estetico-anti-slop`, `sistema-de-design`, `tokens-de-design`, `implementacao-ui`.
**Data.** 2026-07-01.
