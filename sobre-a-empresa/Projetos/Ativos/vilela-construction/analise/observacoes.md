> **Nota (2026-07-09):** Dossiê institucional + catálogo estão sendo unificados em `dossie.md`. Este arquivo continua sendo o registro dos achados analíticos do Argos sobre o Price Book — não foi absorvido pela fusão.

# Observações — Vilela Price Book 2026 (rodada 09/07)

> **Autoria:** Argos (Kolden), 2026-07-09.
> **Alcance:** análise interna do XLSX + diff com a baseline 03/07.
> **Fonte primária:** `dados/planilha-vilela.json` (parseado de `dados/_raw/planilha-vilela.xlsx`).
> **Baseline:** `_temp-catalog.json` (parseado em 2026-07-03).

Cada bloco abaixo tem: **sinal** (o que observamos), **fonte** (onde no arquivo está), **leitura** (o que significa para o negócio), e **[?ambiguo]** onde uma segunda validação com o cliente é necessária.

---

## 1. Poda deliberada: cliente saindo dos projetos estruturais e ficando com remodel + serviços unitários

- **Sinal:** dos 130 serviços da versão 03/07, 18 foram removidos (13,8%) e nenhum foi acrescentado. Sobrou 112.
- **Fonte:** `analise/diff-vs-03-07.md` §1.
- **Padrão dos 18 removidos:** todos pertencem a **3 grupos** — `Additions` (5), `Multifamily Conversion` (7), `New Construction` (5) + `Whole-Home Remodel - Blended` (1). Ou seja, categorias inteiras foram varridas.
- **Leitura de negócio:** o Vilela está **explicitando escopo**. Additions, Multifamily e New Construction são projetos que exigem permit específico, engenharia estrutural, tempo de obra 3-9 meses e capital de giro pesado. Removê-los do Price Book não significa que ele *não faz* — significa que ele **não quer que a venda parta desses serviços** (ex: não são material comercial padrão nem entram no orçamento automático via Estimate Builder).
- **Recomendação:** confirmar com o cliente antes de ajustar a mensagem no site/GBP: *"vocês pararam de fazer construção nova e conversão multifamiliar, ou vocês param de listar como serviço e passam a tratar sob demanda / cotação especial?"*
- **[?ambiguo]** Não temos ainda a data de "criação" original da baseline 03/07 no arquivo (Settings da nova versão diz `Created 2026-07-01`, mas isso pode ser a data da nova versão). Vale confirmar se a versão 03/07 foi de fato uma anterior ou um branch paralelo experimental.

---

## 2. Foco arrematou em Decks — 22 dos 112 serviços (20%)

- **Sinal:** a categoria Decks concentra 22 serviços — quase o dobro da segunda maior (Flooring com 9).
- **Fonte:** `DOSSIE-COMPLETO.md` §2.2; `dados/planilha-vilela.json` filtrando `category = "Decks"`.
- **Composição:** cobre 5 materiais de deck construction (Pressure-Treated $45/SF, Trex Composite $65, PVC $80, Cedar/Redwood, Composite Premium), demolição, sealing/staining/painting, railings, stairs, deck posts, footings, deck-to-house flashing, etc.
- **Leitura:** Vilela tem **profundidade real** em decks — não é linha superficial, é oferta granulada. Provavelmente é o produto de entrada mais forte deles em MA (temporada primavera-verão em suburbs de Boston).
- **Handoff Peitho/Caliope:** Decks merece landing page própria com calculadora tier + material. Não pode ficar diluído numa página "Services" genérica.

---

## 3. Kitchens & Bathrooms carregam o ticket alto (mas volume baixo)

- **Sinal:** Kitchens (6 serviços) e Bathrooms (7) têm preço médio Standard de **$23.529** e **$12.307** respectivamente — muito acima da média geral de $2.347.
- **Fonte:** `DOSSIE-COMPLETO.md` §2.2 e §2.5.
- **Composição:** Luxury Kitchen Remodel ($65k), Medium Kitchen ($45k), Master Bath ($40k), Small Kitchen ($30k), Full Bath ($22k) — os **top-5 preços absolutos** da planilha inteira.
- **Leitura:** essas duas categorias são o motor de faturamento. Aprovadas em ticket, definem o volume anual. O funil de venda **precisa ser desenhado com anzol de ticket alto** — nutrição longa, prova social por caso, financiamento (se aplicável em MA).
- **[?ambiguo]** Não temos ainda o funil de conversão histórico — o `diagnostico-tracking-2026-07-01.md` cobre a parte técnica; falta o número de leads/mês por categoria e o CVR de kitchen/bath para calibrar.

---

## 4. Spread Premium/Economy revela onde há capacidade de upsell forte

- **Sinal:** o multiplicador Premium ÷ Economy varia de **1,44x** (Pressure-Treated Deck: $45→$65) a **4,38x** (Masonry Repair: $800→$3.500).
- **Fonte:** `DOSSIE-COMPLETO.md` §2.7.
- **Serviços com maior potencial de upsell (spread >3x):**
  - Masonry Repair (4,38x)
  - Roof Repair (4,00x)
  - Final Cleaning (4,00x)
  - Structural Header Installation (3,40x)
  - Permit Coordination (3,33x)
- **Leitura:** categorias onde a diferença Premium/Economy é grande sinalizam **serviços onde o preço depende de circunstância** (extensão do dano, urgência, complexidade estrutural, acesso). Isso é bom para o vendedor (margem de negociação), mas ruim para o site (não dá para publicar "starting at $X" sem gerar frustração).
- **Serviços com spread pequeno (<1,5x):** decks unitários e drywall — aqui o preço é **quase commodity**, faz sentido publicar preço público / calculadora.

---

## 5. Estimate Builder é um formulário Excel de 50 linhas, não é interface de venda

- **Sinal:** a sheet "Estimate Builder" tem 50 linhas pré-formatadas (Line 1 a Line 50), coluna Tier default = "Standard", Line Total calculado por fórmula.
- **Fonte:** `dados/planilha-vilela.json` § `estimateItems` (50 slots vazios) + `estimateSummary` (Subtotal, Small Job Minimum, Recommended Total, Tier Guidance).
- **Leitura:** o cliente usa Excel como CRM/PoS. Isso é sinal de **maturidade operacional real** (tem processo, tem preço, tem tier) — mas de **imaturidade digital** (a experiência do prospect não conversa com esse Excel).
- **Oportunidade de produto Kolden:** transformar este Estimate Builder numa **quote-builder web** (o formato bright-space já existente pode ser o vetor). O JSON de 112 serviços já está pronto para virar seed.

---

## 6. `Small Job Minimum = $350` cria piso de faturamento por chamada

- **Sinal:** Settings, Dashboard e Estimate Builder afirmam simultaneamente que pedidos abaixo de $350 são elevados a $350 (Recommended Total = MAX(Subtotal, $350)).
- **Fonte:** `dados/planilha-vilela.json` § `settings` (linha `Small Job Minimum: 350`).
- **Leitura:** é uma **regra de proteção operacional** clássica de contratante — cobrir deslocamento, montagem, minimum crew time. Serviços que caem abaixo desse patamar (Motion Sensor Install $175, Smart Switch $185, alguns SF de painting) são financeiramente **inviáveis sem serem combinados**.
- **Implicação para copy/UX:** se o Vilela publicar catálogo com preço unitário, precisa deixar **muito visível** que serviços pequenos são cotados a partir de $350 — evita a expectativa de "pintar 10 SF de teto por $30".

---

## 7. Cobertura fina em Decks e Bathrooms; rasa em HVAC, Plumbing, Electrical

- **Sinal:** HVAC = 1 serviço (Heat Pump Split System, $950). Plumbing = 3, Electrical = 3.
- **Fonte:** `DOSSIE-COMPLETO.md` §2.2.
- **Leitura:** em MA (clima frio, casas antigas), HVAC/Plumbing/Electrical são **serviços frequentes e recorrentes**. Cobertura rasa aqui indica um de dois cenários:
  1. Vilela **subcontrata** essas trades e só cobra fee de gerenciamento (compatível com o item "Project Management" com unit=Percent).
  2. Vilela **não vende** essas trades ativamente — leva o cliente para quem tem licença específica.
- **[?ambiguo]** confirmar com o cliente qual dos dois cenários. Se for (1), talvez faça sentido criar um serviço "General Trades Coordination" no catálogo público. Se for (2), reforçar no material que HVAC/Plumbing/Electrical **não** é escopo Vilela.

---

## 8. Windows & Doors: agrupamento heterogêneo pede granulação

- **Sinal:** 7 serviços em Windows & Doors, com preços por Each variando de $400 (Storm Door) a $1.500 (High-End Window).
- **Fonte:** `dados/planilha-vilela.json` filtrando `category = "Windows & Doors"`.
- **Leitura:** a variação 3,75x dentro da mesma categoria sugere que o cliente pode estar **unindo casos diferentes numa linha só** (ex: "Standard Window Install" a $650 cobre desde replacement por replacement até new-opening cut-in). Sub-granular pode melhorar a precisão do orçamento e reduzir a variância em obra.
- **Recomendação:** propor ao cliente subdividir por tipo (single-hung, double-hung, casement, bay/bow) e por condição (replacement in-kind vs new opening cut-in vs egress compliant).

---

## 9. Coluna "Material Included?" tem 3 valores mal-nomeados

- **Sinal:** os valores são `No` (58%), `Partial` (31%), `Yes` (11%). Semanticamente correto, mas ambíguo para o prospect que vê a planilha.
- **Fonte:** `DOSSIE-COMPLETO.md` §2.4.
- **Leitura:** para uso interno, funciona. Para uso externo (se o Vilela algum dia expor preços publicamente ou em proposta ao cliente), "Partial" é vago — o prospect precisa saber **qual parte** é incluída (todos os pregos e parafusos? só demo?).
- **Recomendação:** se transformar em copy voltada ao prospect, expandir `Partial` em subcategorias (`Só demolição`, `Só ferragens`, `Só acabamento`, `Só material bruto`).

---

## 10. Consistência forte: 0 gaps de preenchimento, média conferida

- **Sinal:** todos os 112 serviços têm Economy, Standard, Premium e Unit preenchidos. Zero registros com campos nulos. A média Standard calculada bate exato com a informada no Dashboard ($2.347,14).
- **Fonte:** `_tools/parse.js` (script) + validação em `DOSSIE-COMPLETO.md` §2.8.
- **Leitura:** o cliente **teve cuidado editorial** — não é uma planilha bagunçada, é um documento comercial. Isso muda o tom do handoff: o time interno do Vilela já sabe precificar; o gap dele com a Kolden é de **distribuição** (fazer o mercado chegar até este catálogo), não de **produtificação** (o catálogo já está pronto).

---

## Gate de confiabilidade (Argos-CL-001)

| Critério                                        | Status                                                   |
|-------------------------------------------------|----------------------------------------------------------|
| Fonte explícita em cada dado-fato               | ✅ (JSON + XLSX baixado + baseline 03/07)                |
| Timestamp de coleta                             | ✅ (2026-07-09T12:05Z no meta.downloadedAt)              |
| Cross-check em ≥2 fontes independentes          | ⚠️ **Fonte única** — apenas a planilha do cliente. Cross-check com o site (`dossie-site-vilela-construction.md`) fica como próximo passo. |
| Orgânico vs Pago separado                       | N/A (dado interno, não é métrica de mercado)             |
| Idade do dado sinalizada                        | ✅ (data `Created 2026-07-01` do arquivo, coleta 09/07)  |
| Operações em zona ToS-cinza                     | ✅ zero — Google Drive próprio do cliente, autorizado    |
| Método declarado quando há sizing               | N/A (não é sizing de mercado)                            |
| Caminho macro→micro legível                     | ✅ (README → DOSSIE → DIFF → observacoes → recortes)     |

**Rótulo global:** dados verificados, mas **fonte única** — todas as afirmações numéricas dependem exclusivamente da planilha do cliente. Sinalizado onde aplicável.

---

_Argos, 2026-07-09._
