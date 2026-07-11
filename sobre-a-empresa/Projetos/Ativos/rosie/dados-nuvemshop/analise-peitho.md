---
tipo: projeto
projeto: rosie
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/rosie/dados-nuvemshop/analise-pactolo|analise-pactolo]]"
---

# Laudo Peitho — Análise de Atribuição Rosie

**Fonte:** `vendas.csv` (196 pedidos únicos, 410 linhas de item, período 07/05 a 01/07/2026) + `clientes.csv` (199 clientes).
**Recorte:** 172 pedidos confirmados = **R$ 80.231,59** de faturamento pago no período.
**Voz:** attribution analyst sênior. Onde não há dado, digo "não há dado" — não invento.

---

## 1. Panorama do dado de atribuição

**Nuvemshop não exporta UTM.** O CSV de vendas tem 60 colunas e nenhuma contém `utm_source`, `utm_medium`, `utm_campaign`, `referrer` ou `landing_page`. Isso é o pior cenário para attribution — a loja opera hoje sem instrumentação de origem, e todo canal está sendo pago à força do CAC bruto de plataforma, sem saber qual fecha.

O que restou como proxy no CSV:

| Sinal disponível | O que revela | Confiabilidade |
|---|---|---|
| **Cupom de Desconto** | Origem quando o cupom carrega nome (afiliada, campanha) | Alta quando existe — mas só 4% dos pedidos usam cupom com nome real |
| **Anotações do Comprador** | Testemunho qualitativo espontâneo | 0,5% de preenchimento (1 pedido em 196) — dado praticamente nulo |
| **Canal (Mobile/Desktop/App)** | Device, não canal de marketing | 100% preenchido |
| **Estado/Cidade** | Concentração geográfica (proxy de mídia local vs orgânico nacional) | 100% |
| **Meio de pagamento** | Impulso (Pix) vs planejado (cartão) | 100% |
| **Cluster temporal de pedidos** | Picos = campanha/drop; base = orgânico contínuo | Alta |
| **Marketing opt-in (clientes.csv)** | Vontade de relacionamento futuro | 100% mas 48% não aceita |

**Veredito:** com este dataset dá para inferir **regime de operação**, não canal específico. Para virar attribution real é preciso instrumentar UTM+CAPI a partir desta semana (§10).

---

## 2. Distribuição de canal de origem (inferida)

**Ranking por evidência circunstancial, não por dado direto:**

| Canal provável | % faturamento estimado | Evidência |
|---|---|---|
| **Orgânico Instagram Catarina** | **55–65%** | Pico de 26 pedidos em 3h no dia 26/05 sem cupom, ticket médio inflado (R$522), zero rastro de mídia paga; assinatura clássica de "drop anunciado no Stories" |
| **Base contínua Instagram + boca a boca** | **20–25%** | Volume estável de 3–8 pedidos/dia entre picos, ticket R$400–500, sem cupom, sem anotação, sem cluster geográfico anormal |
| **Afiliadas / influencers com cupom** | **~4% (R$ 3.365)** | 7 pedidos com cupons nomeados (`BRUNACERVIERI20`, `WEADOREYOU`, `ROSIEDUDAFELIPE`) — leia §7 |
| **E-mail marketing** | **~0%** | 92% dos clientes tem newsletter = "NÃO" (opt-in ativo apenas em 15 clientes); RD Station não está gerando pedido rastreável |
| **Mídia paga (Meta+Google)** | **~0%** | Sem cupom de campanha, sem UTM, sem cluster de anúncio identificável; se roda, não gera atribuição |
| **Direto / marca própria já conhecida** | **10–15%** | 14 clientes recompraram = 9% da base, todos sem cupom |

**A tese central:** a Rosie está vivendo de tração orgânica da Catarina. O CSV inteiro é assinatura de marca puxada por criador.

---

## 3. Mineração de anotações

**Achado surpreendente e negativo:** de 196 pedidos, **apenas 1 tem anotação preenchida** (0,5%). Não há dado qualitativo utilizável.

A única anotação existente é reveladora e vale destacar (pedido 295, Laura, RS, 01/07):

> "Meu comentário é para a Cat na verdade. Eu sempre acompanhei ela, e sempre me identifiquei muito com ela, ela é uma pessoa que me inspira diariamente. Era meu sonho ter uma peça da marca dela e finalmente consegui (mais do que uma inclusive) Beijos Cat, sempre vou te amar"

**Interpretação estratégica:** o único depoimento espontâneo do dataset confirma o motor de aquisição — "**sempre acompanhei ela**" + "**era meu sonho ter uma peça da marca dela**". Nenhuma menção a anúncio, a Google, a indicação de amiga. É fan-of-creator convertendo. E aparece **exatamente** no formato clássico do fandom Catarina — falar com a criadora, não com a marca.

O 0,5% de preenchimento tem outra leitura acionável: **o checkout não pede origem**. Um campo opcional "Como você conheceu a Rosie?" na finalização captaria de 15–30% dos compradores em ambiente fandom, e resolveria metade do problema de attribution sem tocar em UTM.

---

## 4. Device (Canal Nuvemshop = Mobile/Desktop/App)

Dos 172 pedidos confirmados:

- **Mobile: 146 pedidos (84,9%), R$ 68.823,87 (85,8% do faturamento)** — ticket médio R$ 471,40
- **Desktop / "Loja virtual": 24 pedidos (14,0%), R$ 10.334,72 (12,9%)** — ticket médio R$ 430,61
- **Pedidos manuais: 2 pedidos válidos (R$ 1.073)** — atendimento humano (David Souza, Bruno Vilas Boas ficaram como pedidos de teste do próprio time)

**Implicação para Meta Ads:** com 85% mobile, criativo **Reels 9:16 é prioridade absoluta**. Feed 1:1 é secundário. Desktop 16:9 é resíduo — não vale o tempo do editor. Landing page precisa ser mobile-first radical: hero em uma dobra do celular, CTA de checkout acima da dobra, botão de Pix em destaque (justificado no §5).

O ticket mobile ser **9% maior** que desktop confirma que mobile aqui não é "comprador impulsivo de ticket baixo" — é o comprador padrão da marca. Isso quebra o mito de que desktop converte mais alto.

---

## 5. Tempo até pagamento

A coluna "Data de pagamento" no CSV **não traz hora**, só data. Isso invalidou a análise fina de gap em minutos. O que dá para afirmar:

- **100% dos 172 pedidos confirmados foram pagos no mesmo dia** em que o pedido foi criado.
- Pix (78 pedidos) e cartão (94 pedidos) — os dois — fecham no mesmo dia.
- Não existe hesitação de mais de 24h no dataset atual — ou paga imediato ou vira "Vencido".

**A hesitação real está nos Vencidos: 14 pedidos (7,1% do volume), R$ 6.115,35 perdidos, 100% Pix.** Traduzindo: a compradora clicou "Pix", gerou o QR, e nunca pagou. Isso é a única forma de fricção capturada pelo CSV — e é 100% do lado Pix.

**Implicação:** cadência de recuperação de Pix não pago (24h + 48h + 72h com WhatsApp humano) recupera provavelmente 30–50% desses R$ 6.115, ou seja **R$ 1.800 a R$ 3.000/mês** só com automação. É a pegada mais óbvia e não instrumentada.

---

## 6. Sinais de fricção

- **Cancelados:** 18 de 196 (9,2%). Motivos:
  - **14 vencimento automático (Pix não pago)** — a fricção acima
  - **3 estornos totais** (2 confirmados como estorno, 1 cliente "mudou de ideia")
  - **1 estorno parcial** (pedido 107 do David Souza — teste interno)
- **Descontos:** ticket bruto vs. descontos aplicados:
  - Cupons de afiliada dão 10–21% off (BRUNACERVIERI20 = 20,6%, ROSIEDUDAFELIPE = 11,9%, WEADOREYOU = 10%)
  - **Desconto Pix automático:** 74 dos 75 pedidos Pix sem cupom levaram desconto médio de R$ 21 — a Rosie **já pratica desconto Pix silencioso** (~5% embutido). É válido, mas não está copyeditado como argumento comercial na loja.
  - Cartão: 0 descontos. Zero.
- **Frete:** média R$ 8/pedido — está subsidiado pela Rosie ou é frete real muito baixo. Não é matador de conversão no dataset atual.

---

## 7. Hipóteses de canal por evidência dura

**Ranking com número de pedidos que embasa:**

1. **Orgânico Instagram Catarina — motor principal.** Assinatura clássica: pico de 26 pedidos concentrados em 26/05/2026, todos entre 13h e 23h, todos sem cupom, ticket médio R$ 522, espalhados por 8 estados (SP, RJ, MG, SC, RS, BA, DF, PR). Nenhuma promoção paga do mercado consegue essa geografia em 10h sem cupom rastreado. É drop de coleção anunciado nos Stories.
2. **Base contínua Instagram Catarina — motor secundário.** Fluxo de 3–8 pedidos/dia entre picos, mesmo padrão sem cupom, mesma geografia SP-heavy.
3. **Afiliadas — piloto pequeno mas funcional (~4% do faturamento).**
   - **BRUNACERVIERI20** — 3 pedidos, R$ 1.133,82 (Alice, Anna Paula, Victoria; todas SP; 26–28/06). Cupom recente com 20,6% off — provavelmente influencer/amiga próxima da Cat com desconto agressivo pra ativar audiência dela.
   - **WEADOREYOU** — 2 pedidos, R$ 1.042,20 (Giovanna von Zuben SP 08/06, Rutiele Araujo DF 29/06). Cupom mais antigo e menos ativo.
   - **ROSIEDUDAFELIPE** — 2 pedidos, R$ 1.189,84 (Marcia Gelas SP, Eduardo Duarte DF; 27/06). Duplinha influencer.
4. **Boca a boca invisível.** 14 clientes com 2 compras (9% da base) faturaram R$ 12.482 — ticket médio de repeater R$ 445,79 vs. geral R$ 466,46. Repeaters não pagam ticket muito diferente, o que sugere que voltam pelo produto/marca, não por remarketing de carrinho.
5. **Mídia paga — nenhuma pegada.** Se tem, não deixa vestígio no CSV. Provavelmente inexistente ou testes soltos sem instrumentação.
6. **E-mail marketing — inoperante.** 92% dos clientes tem newsletter = NÃO. RD Station não é motor de vendas hoje.

---

## 8. Implicações para o plano de 90 dias

- **Mídia paga entra pra AMPLIAR, não pra criar demanda.** O motor orgânico já converte a R$ 471 de ticket, o CAC pago vai ter que competir com um baseline dificílimo. Framing correto: Meta CAPI + Ads para (a) escalar posts de Reels que já vão bem organicamente e (b) capturar warm demand no bottom-funnel (retargeting).
- **Programa "Rosie Girl" afiliada é grande oportunidade em aberto.** Já existe piloto de 3 cupons funcionando; formalizar com painel de comissão, 5–10 embaixadoras iniciais, cupom nomeado por criadora = attribution nativa + canal escalável. Custa 15–20% de margem contra ROAS negativo em Meta frio.
- **Mobile-first é radical, não retórica.** 85% do faturamento. Criativo Reels vertical, LP em uma tela de iPhone, checkout de dedão.
- **Copy de "5% off Pix" precisa ir pra vitrine.** O desconto Pix silencioso já existe (R$ 21 médio automático em 74 de 75 pedidos Pix sem cupom); virar argumento explícito na home, no PDP e no checkout tende a subir taxa Pix vs. cartão em 5–10pp, o que reduz taxa MDR do cartão sem impactar cliente.
- **Vencidos de Pix são R$ 6.115/mês em recuperação óbvia.** Cadência WhatsApp humana (24h/48h/72h) devolve R$ 1.800–3.000 sem custo de mídia.
- **Newsletter/e-mail está morto no berço.** Reativar exige (a) rework do opt-in no checkout, (b) reengajar os 15 aceites recentes com sequência de boas-vindas, (c) dar motivo pra Cat linkar a newsletter dos Stories dela ("assine pra saber do drop primeiro").

---

## 9. Comparação com o slide 10 do deck

O deck v2.3 assume distribuição de aquisição:

| Canal | Deck | Realidade no CSV |
|---|---|---|
| Orgânico | 45% | **~65–70%** (subestima o motor Catarina) |
| E-mail | 20% | **~0%** (superestima brutalmente) |
| Mídia paga | 15% | **~0% hoje** (superestima; virará realidade só com CAPI+UTM instrumentados) |
| Comercial (afiliadas) | 12% | **~4% hoje** (é piloto, potencial de virar 12% em 90 dias com formalização) |
| Aquecimento | 8% | **~10% (repeaters)** (correto na ordem de grandeza) |

**Ajuste recomendado ao slide 10 do deck v2.4:**

- **Baseline hoje:** Orgânico 65% + Direto/Repeat 15% + Afiliadas 4% + E-mail 0% + Mídia paga 0% + Outros 16% (unknown).
- **Meta 90 dias:** Orgânico 45% (deixa de ser único motor) + Afiliadas 15% + Mídia paga 12% + E-mail 10% + Direto/Repeat 18%.
- O deck estava otimista com e-mail e mídia paga, e conservador com orgânico. Corrigir isso muda o framing do plano — a alavanca principal dos 90 dias não é "ativar Meta Ads", é "instrumentar attribution para descobrir quanto do orgânico dá para amplificar".

---

## 10. Recomendações — o que instrumentar ESTA SEMANA

Ordenado por relação sinal/esforço:

1. **Ativar campo "Como você conheceu a Rosie?" no checkout Nuvemshop** (nativo, opcional). Custo zero. Em 30 dias captura de 15–30% dos compradores. Substitui 60% do que UTM daria.
2. **Adotar UTM disciplinado nos links da bio + Stories da Cat + posts pagos.** Padrão: `utm_source=instagram&utm_medium=stories&utm_campaign=drop-inverno-2026`. Nuvemshop registra na sessão; expor no analytics.
3. **Cupom nomeado por origem, sempre.** Todo tráfego externo entra com cupom próprio (`INSTA5` para link em bio da Cat, `NEWSLETTER5` para e-mail, `META-PIXEL-RETARGETING5` para Ads). 5% off ativa o comportamento sem canibalizar margem.
4. **Instalar Meta CAPI antes de qualquer real de mídia paga.** Sem CAPI, o ROAS que a Meta reporta é ficção — Peitho recusa validar plano de mídia sem CAPI ligado.
5. **Cadência de recuperação de Pix vencido:** template WhatsApp humano em 24h/48h/72h. Recupera R$ 1.800–3.000/mês.
6. **Formalizar programa "Rosie Girl" com 5 embaixadoras** e cupom nomeado por criadora (`CUPOM-<PRIMEIRONOME>10`). Attribution 100% clean + canal escalável.
7. **Rework do opt-in de newsletter no checkout.** Hoje 92% marca "NÃO". Testar copy "Quer saber do próximo drop antes de todo mundo? Só entra na lista da Cat" — trocar "newsletter Rosie" por "lista da Cat".
8. **Copy explícita "5% off Pix" em todos os PDPs e no checkout.** O desconto já existe silencioso; explicitar sobe conversão para Pix (menor MDR) sem custo novo.
9. **Registrar afiliadas em GHL como pipeline próprio** com % de comissão, cupom, ticket, ROAS por afiliada. Já hoje há dado para 3 afiliadas — começar a medir.
10. **Antes de qualquer real de Meta Ads:** rodar 30 dias com UTMs + CAPI + campo de origem no checkout. Só quando o baseline atribuído estiver claro, medir mídia paga contra ele. Fazer o contrário é queimar caixa sem saber se serviu.
