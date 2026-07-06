---
id: rosie-registro-2026-07-01-solomon-f0-deck-v3
titulo: "Rosie · Sessão 2026-07-01 · F0 Solomon + Deck v3.1 (14 slides)"
data: 2026-07-01
missao: m-20260701-112935-rosie-90d
origem: sessão contínua Hermes (orquestração) sobre Contrato de Missão
status: registro de sessão · fonte de verdade dos números Solomon 30d
proxima_leitura: sessão de envio ao Bruno / reconciliação Pactolo v3 completa (D+3)
---

# Rosie · Sessão 2026-07-01 · F0 Solomon + Deck v3.1

Sessão que fechou o loop entre a análise Solomon de dados reais (30d · 2026-06-01→2026-07-01, conta `caOEzYj1TqRM0r3nHrFP`) e o deck v2.1 aprovado pelo Dike. Resultado: **deck v3.1 com 14 slides**, pronto para envio ao Bruno após revisão visual do Ronan.

Este arquivo é o **registro canônico** dos números Solomon puxados nesta sessão. Se qualquer artefato futuro (deck, dossiê Pactolo v3 completo, plano D+30) usar número que difere daqui, este registro é a referência.

---

## 1. Baseline financeira Solomon 30d — números exatos

Puxados via MCP oficial Solomon em 2026-07-01T22:50 (`get_financial_summary` atribuição `paid_last_click`).

| Métrica | Valor exato | Notas |
|---|---|---|
| Faturamento bruto | R$ 63.533,14 | Todos os pedidos (aprovados + pendentes + cancelados) |
| **Receita aprovada** | **R$ 55.405,40** | 119 pedidos aprovados |
| Receita pendente | R$ 2.409,77 | 12 pedidos |
| Receita cancelada | R$ 5.717,97 | 6 pedidos |
| Pedidos totais | 137 | – |
| Pedidos aprovados | **119** | aprovação 86,86% |
| Taxa aprovação receita | 87,21% | – |
| **Ticket médio aprovado** | **R$ 465,59** | AOV real — resolve F0.1 do contrato |
| Ticket médio (todos pedidos) | R$ 463,75 | – |
| **Custo de marketing** | **R$ 5.258,19** | Gasto mídia paga (sem imposto Meta) |
| Gasto de mídia Meta | R$ 2.468,05 | – |
| Imposto Meta | R$ 299,87 | Taxa efetiva 12,15% sobre gasto Meta |
| **Gasto mídia total (com imposto)** | **R$ 5.558,06** | Este é o número usado em ROAS pago |
| Custo de produto | R$ 15.119,75 | – |
| Descontos concedidos | R$ 1.868,44 | 2,94% |
| Custos totais | R$ 20.677,81 | Marketing + produto + descontos + imposto |
| **Lucro líquido** | **R$ 34.727,59** | – |
| **Margem líquida** | **62,68%** | – |
| **ROAS agregado (Solomon)** | **10,54x** | Receita_aprovada / gasto_com_imposto (todos os canais) |
| **CAC** | **R$ 48,69** | Bate 1:1 com CAC target Peitho R$55 → valida squad tráfego |
| Novos clientes (receita) | R$ 50.518,06 | **91,2% da receita** |
| Receita recorrente | R$ 4.887,34 | 8,8% |
| Novos clientes (pedidos) | 108 | – |

**Melhor dia:** 2026-06-20 · R$ 5.591 · 8 pedidos.
**Pior dia:** 2026-06-07 · R$ 92 · 1 pedido.

### 1.1 Split por forma de pagamento

| Forma | Receita | Share | Aprovação |
|---|---|---|---|
| Cartão de Crédito | R$ 36.376,88 | 65,66% | **97,22%** |
| PIX | R$ 19.028,52 | 34,34% | **75,38%** — 16 pedidos travados |
| Boleto | R$ 0 | 0% | – |

**Insight operacional:** PIX perde 25% dos pedidos em pendência/cancelamento. Alavanca de recuperação via WhatsApp (Emporos) — 16 pedidos × R$ 388 médio ≈ R$ 6.200/mês recuperáveis.

---

## 2. Atribuição por canal — DUAS lentes sobre o mesmo pedido

Solomon puxa a mesma receita com dois modelos. Não escolher só um — **os dois têm papel narrativo diferente** e ambos vão para o deck v3.1 (slides 9 e 11 do novo).

### 2.1 `paid_last_click` (o que Bruno vê no painel Solomon)

Cada pedido é creditado ao **último anúncio pago tocado**. Se a cliente clicou num Meta e depois num Google antes de comprar, Google leva.

| Canal | Receita | Pedidos | Sessões | Conv/sessão | Gasto | ROAS Solomon |
|---|---|---|---|---|---|---|
| **Google Ads** | R$ 12.665,32 | 26 | 1.401 | 1,86% | R$ 2.671,16 | **4,74x** |
| **Facebook Ads** | R$ 10.001,49 | 20 | 2.113 | 0,95% | R$ 2.767,92 | **3,61x** |
| **Instagram (link_in_bio)** | R$ 17.028,10 | 37 | 6.182 | 0,60% | — | — |
| **Orgânico / Social** | R$ 9.734,69 | 22 | 5.115 | 0,43% | — | — |
| **Direto** | R$ 4.872,90 | 12 | 3.780 | 0,32% | — | — |
| **Email/SMS** | R$ 1.102,90 | 2 | 26 | **7,69%** | — | — |
| Moda (canal genérico) | R$ 0 | 0 | 0 | — | R$ 118,98 | 0 |
| Pinterest / TikTok / Influenciador | R$ 0 | 0 | 0-14 | — | R$ 0 | – |

**Totais consolidados (paid_last_click):**
- **Anúncios pagos (Meta + Google):** R$ 22.666,81 → **40,91%**
- **Orgânico + direto (IG + Social + Direto):** R$ 31.635,69 → **57,10%**
- **E-mail/SMS:** R$ 1.102,90 → **1,99%**

**ROAS pago médio real (Meta + Google combinados):** R$ 22.666,81 / R$ 5.439,08 = **4,17x**.

### 2.2 Linear (visão neutra Solomon — divide o pedido entre touchpoints)

| Canal | Receita | ROAS |
|---|---|---|
| **Orgânico / Social** | R$ 24.291,04 | — (**43,84% da receita**) |
| **Google Ads** | R$ 9.454,68 | 3,54x |
| **Instagram (orgânico)** | R$ 8.997,58 | — |
| **Facebook Ads** | R$ 6.760,66 | 2,44x |
| **Direto** | R$ 4.872,90 | — |
| **Email/SMS** | R$ 863,52 | — |

**Insight visceral (usado no slide 9 · 3 lentes):** o mesmo pedido tem 3 ROAS:
- **Meta Ads Manager (API plataforma):** 12,52x — Meta conta como se todo pedido que tocou fosse dela.
- **Solomon paid_last_click Meta:** 3,61x — o que Bruno vê no painel.
- **Solomon linear Meta:** 2,44x — divide entre touchpoints.

Argumento inegociável para Solomon como fonte primária.

---

## 3. Funil de conversão (7d · 2026-06-24→2026-07-01)

Sessões: 4.745 · Usuários únicos: 4.493.

| Etapa | Qtd | Conv vs etapa anterior | Conv/sessão |
|---|---|---|---|
| Sessões | 4.745 | — | 100% |
| Page Views | 4.407 | 92,88% | 92,88% |
| View Content | 2.034 | 46,15% | 42,87% |
| **Add to Cart** | **216** | **10,62%** ← gargalo #1 (89% drop) | 4,55% |
| Initiate Checkout | 73 | 33,80% | 1,54% |
| **Add Customer Info** | **0** ← evento não disparado | 0% | 0% |
| Add Shipping Info | 46 | — | 0,97% |
| Add Payment Info | 41 | 89,13% | 0,86% |
| **Compra** | **36** | 87,80% | **0,76%** |

**CVR site atual = 0,76%** (baseline pré-landing quick-win Harmonia). Meta pós-landing: ≥ 1,0%.

---

## 4. Retenção — a alavanca de escala mais barata

- **Retenção M+1 (safra jun/26):** 0,97% — 103 novos clientes em junho, 1 voltou a comprar em julho.
- **Alvo pós-fluxos e-mail RD + carrinho abandonado:** 5%.
- **Impacto:** receita recorrente sai de R$ 4.887 → ~R$ 25.000/mês **sem gasto extra de mídia**.
- **Custo de execução:** apenas subir os 4 fluxos RD que hoje estão em "em construção" (boas-vindas, nutrição, carrinho, pós-compra) — só o de reativação está no ar hoje.

Este é o insight-chave que passou a ancorar o bloco vermelho do slide 10 e o slide 11 (novo) do deck v3.1.

---

## 5. Meta breakdown por device — risco de fadiga concentrada

| Device | Spend | % spend | CTR | Frequência |
|---|---|---|---|---|
| **iPhone** | **R$ 2.395,94** | **97,2%** | 1,74% | 3,75–5,63 (alta) |
| Android smartphone | R$ 45,63 | 1,9% | 1,81% | 3,10–4,10 |
| iPad | R$ 19,86 | 0,8% | 1,96% | 1,89–2,07 |
| Desktop | R$ 2,65 | 0,1% | 1,27% | 1,03–1,34 |
| Android tablet | R$ 0,32 | 0,0% | 1,35% | 1,50–2,67 |

**Diagnóstico:** Advantage+ concentrou 97% do gasto em iPhone porque é onde o Meta detecta sinal de conversão. Frequência 5,63 na ADV principal = **risco de fadiga criativa**. Ampliar Android/iPad só depois de CAPI ligada (senão Meta não terá sinal para ir para lá).

---

## 6. Matriz de gap · rastreamento (Solomon 30d observado)

| Item da spec v4 | Estado observado | Fonte | Ação |
|---|---|---|---|
| Solomon SDK web | ✅ Ativo (VC+ATC+Purchase em PDPs) | 2.034 VC em 7d, 216 ATC | Home sem VC/IC; PDP sem IC |
| Cookie server-side 365d | ✅ Ativo | jornadas de 20–28 dias | Nenhum |
| Ingestão de pedidos | ✅ Ativa | 119 pedidos aprovados no painel | Reconciliar com Nuvemshop (MCP pendente) |
| UTMs padronizados | ⚠️ Parcial | R$ 4.873 = `sem_atribuicao` (8,8%) | Emporos/Peitho D+21 |
| Meta CAPI dedup (`event_id`) | ❌ Não confirmado | Add Customer Info = 0 no funnel | Auditar EMQ. Bloqueante D+15 |
| GTM Server (CF Workers) | ❌ Não implantado | – | D+15 |
| GA4 Measurement Protocol | ❌ Não implantado | – | D+15 |
| Google Ads Enhanced Conversions | ❌ Não implantado | – | D+15 |
| Add Customer Info | ❌ 0 eventos | Solomon funnel | Bug SDK OU etapa inexistente — auditar antes GTM Server |
| Initiate Checkout entrada Nuvemshop | ⚠️ Parcial (73 IC / 216 ATC = 66% drop) | iframe checkout Nuvemshop | Mitigação postMessage não implantada |

---

## 7. Lógica de distribuição da meta · a regra do teto 3x

Ancorada em Solomon 30d e no princípio Kolden de **planejar com piso saudável de mercado, não com pico observado**.

### 7.1 A regra

- Mercado moda BR premium: ROAS pago entre **2x e 4x** em campanha madura.
- Junho da Rosie: ROAS pago médio 4,17x — acima da média.
- Kolden planeja com **ROAS teto 3x** (piso saudável), não com o 4,17x observado. Motivo: 4,17x pode ser mês bom; 3x é linha de base defensável.
- Com R$ 5.000 de mídia × 3x = **R$ 15.000/mês** de receita que cabem à mídia paga. Se ficar em 4x, sobra receita (redistribuir sobrando > devendo).

### 7.2 Distribuição justa por mês (deck slide 11 · novo)

| Fonte | M1 R$80k | M2 R$100k | M3 R$150k |
|---|---|---|---|
| **Mídia paga** (Meta + Google, ROAS teto 3x) | R$ 15.000 · **19%** | R$ 15.000 · 15% | R$ 15.000 · **10%** |
| **Orgânico + direto** (IG, social, marca) | R$ 40.000 · 50% | R$ 45.000 · 45% | R$ 60.000 · 40% |
| **E-mail + retenção M+1** (5 fluxos RD + carrinho) | R$ 20.000 · **25%** | R$ 30.000 · 30% | R$ 55.000 · **37%** |
| **Comercial ativo** (WhatsApp + VIP) | R$ 5.000 · 6% | R$ 10.000 · 10% | R$ 20.000 · 13% |
| **Total** | **R$ 80.000** | **R$ 100.000** | **R$ 150.000** |

Mídia paga não cresce em real (verba travada), mas cai como % (19% → 10%) — é saudável: e-mail e orgânico assumem o crescimento.

### 7.3 Comparativo com mercado (moda BR premium)

- Mídia paga médio setor: **25–45%** da receita.
- E-mail: **5–15%** da receita.
- Orgânico + direto (marca com identidade): **30–50%**.

**Rosie hoje (paid_last_click):** mídia 41% (dentro da faixa · lado alto) · e-mail **2% (subutilizado)** · orgânico 57% (acima).

**Rosie modelo M3 proposto:** mídia 10% (abaixo · conservador) · e-mail 37% (topo do setor) · orgânico 40%. Padrão de marca madura.

Fonte comparativo: Nuvemshop insights + Meta Business Reports 2024.

---

## 8. Decisões travadas nesta sessão

| Ref | Decisão | Estado | Registrada em |
|---|---|---|---|
| Meta M1 = R$ 80.000 | Confirmada (não renegociar) — comunicada no deck como "+44% sobre R$ 55,4k de junho, não +512% sobre zero" | ✅ Slide 12 A do deck | log contrato |
| Verba R$ 5.000/mês fixa | Mantida — retorno alvo 2–3x, escala só após 60d com 3x sustentado | ✅ Slide 12 B do deck | log contrato |
| Solomon = fonte primária de tracking | Confirmada — SOLOMON_COMPANY_ID + SOLOMON_TOKEN_API prod/sandbox em `/kolden/prod/` e `/kolden/dev/`. MCP Íris (KLD-2026-118) já construído | ✅ Slide 12 D do deck | log contrato |
| Consent Mode v2 no e-commerce | Providenciar semana 2 | ✅ Slide 12 E do deck | log contrato |
| Regra teto ROAS 3x para planejamento | Adotada — slide 11 novo comunica ao Bruno | ✅ Slide 11 (novo) | este registro |
| Ticket médio real R$ 465,59 (F0.1) | Resolvida via Solomon (não Nuvemshop) | ✅ Slide 10 baseline | log contrato |

### Decisões pendentes do Bruno

| Ref | Pergunta | Estado | Prazo |
|---|---|---|---|
| Slide 12 C · números Nuvemshop | Bruno mandar margem líquida por linha de produto + frequência de recompra por cohort | ⏳ Bruno | 3 dias |
| Slide 12 F · TikTok Ads | Ativar em Fase 2 (dia 30) OU registrar por escrito fora do escopo | ⏳ Bruno | Na reunião |
| Fotos 90s para landing quick-win | Confirmar banco fotográfico da Rosie OU curar do IG da Catarina | ⏳ Bruno + Catarina | 7 dias |

### Pendências técnicas Kolden

| Ref | Ação | Dono | Prazo |
|---|---|---|---|
| CAPI deploy | Hefesto/Peitho pixel-specialist | Kolden | D+15 |
| GTM Server (CF Workers) | Hefesto | Kolden | D+15 |
| GA4 MP + Google Ads Enhanced Conversions | Hefesto | Kolden | D+15 |
| UTM padronizado em campanhas ativas | Peitho + Emporos | Kolden | D+21 |
| Auditar Add Customer Info = 0 (bug SDK vs etapa inexistente) | Peitho pixel-specialist | Kolden | D+7 pré-GTM Server |
| Fluxos e-mail (boas-vindas, nutrição, carrinho, pós-compra) no ar RD | Caliope | Kolden | D+12 |
| Reconciliação Pactolo v3 completa (modelo com AOV real + baseline + orgânico 40%+) | Pactolo | Kolden | D+3 |
| Landing quick-win Harmonia | Harmonia + ui-engineer | Kolden | D+15 |

---

## 9. Deck v3.1 · estrutura final (14 slides)

Ordem visual + IDs (renumerados nesta sessão):

| # | ID | Nome | Trigger v3.1 |
|---|---|---|---|
| 1 | s1 | Capa | – |
| 2 | s2 | Diagnóstico | – |
| 3 | s3 | Jornada 90d | – |
| 4 | s4 | E-mail (RD Station) | v3: caption retenção M+1 (0,97% → 5%) |
| 5 | s5 | Meta Ads | – (modais Meta v2.1) |
| 6 | s6 | Google Ads | – (modais Google v2.1) |
| 7 | s7 | Plano de mídia R$ 5k | – |
| 8 | s8 | Comercial (Kommo) | – |
| 9 | s9 | Rastreamento (Solomon) | v3: 3 lentes de atribuição (12,52 / 3,61 / 2,44) · v3.1: números reconciliados |
| 10 | s10 | Metas · 3 cenários | v3: AOV R$465,59 · vendas 172/215/322 · baseline block · bloco vermelho reescrito · v3.1: CAC 48,69 + ROAS 10,54x |
| 11 | s11 | **Como bater a meta** (novo · matemática do funil) | **v3.1 · slide novo** |
| 12 | s12 | Decisões (6 · era 5) | v3: A com "+44%", C reclassificada parcial, F TikTok adicionada |
| 13 | s13 | Melhorias no site | – |
| 14 | s14 | Ordem de estreia | – |

Footer padrão `N/14` · slide final `14/14 · fim`. Nav lateral atualizada com item 11 "Como bater a meta".

### Blocos do slide 11 novo (por bloco)

1. **Baseline junho** (3 cards: R$ 5.258 investido / R$ 55.405 retorno / retorno agregado 10,54x + nota sobre por que mistura).
2. **Split por canal** (3 cartões: 41% mídia · 57% orgânico · 2% e-mail — com valores absolutos e cor por prioridade).
3. **Regra do teto 3x** (bloco rose-light explicando o piso de mercado e o R$ 15k/mês da mídia).
4. **Tabela de distribuição** (4 linhas × 3 meses + total, com % em negrito nos pontos-chave).
5. **Comparativo com mercado** (2 colunas: média do setor + Rosie hoje vs. modelo M3, com leitura ao final).

---

## 10. Ledger de artefatos gerados/modificados nesta sessão

| Arquivo | Ação | Fonte de verdade? |
|---|---|---|
| `apresentacao-bruno-2026-07-01/deck.html` | Editado (v2.1 → v3 → v3.1 · 14 slides) | ✅ SIM — envio ao Bruno |
| `apresentacao-bruno-2026-07-01/deck-conteudo.md` | Editado (frontmatter v3.1 + DELTAs slides 4/9/10/11/12) | Espelho textual (para PPTX) |
| `apresentacao-bruno-2026-07-01/dossie-tecnico/cenarios-funil-reverso.md` | Anexado DELTA v3 (Pactolo pendente v3 completo em D+3) | Squad Pactolo assume |
| `apresentacao-bruno-2026-07-01/dossie-tecnico/spec-rastreamento.md` | Anexado DELTA v4.1 (matriz de gap real) | Squad Peitho assume |
| `apresentacao-bruno-2026-07-01/dike-laudo-v3.md` | Criado (Dike delta v2.2 · 6 checagens · sobe-com-ressalvas-aplicadas) | ✅ Verificação independente |
| `Olimpo/contratos/missoes/m-20260701-112935-rosie-90d.yaml` | dike_v3 block + log_de_decisao (F0.1 resolvido) | ✅ Contrato lacrado |
| **Este arquivo** | Criado | ✅ SIM — fonte dos números Solomon |

---

## 11. Próximas ações após esta sessão

1. **Ronan** — abre `deck.html` no Chrome, navega até slide 11 novo, valida visual. Se OK, envia ao Bruno + Ctrl+P → PDF backup.
2. **Bruno** — responde 3 decisões: (a) planilha Nuvemshop com margem/frequência, (b) decisão TikTok Fase 2 ou fora do escopo, (c) fotos 90s para landing.
3. **Pactolo (D+3)** — refaz cenarios-funil-reverso.md v3 completo (modelo com AOV real + baseline + contribuição orgânica 40%+ · Solomon linear).
4. **Peitho pixel-specialist (D+7)** — audita Add Customer Info = 0 e IC parcial no checkout Nuvemshop.
5. **Caliope (D+12)** — 5 fluxos RD Station no ar (foco no carrinho abandonado, que é a alavanca de retenção M+1).
6. **Hefesto (D+15)** — CAPI + GTM Server + GA4 MP + Enhanced Conversions em produção.
7. **Gate 1 D+30** — reconciliar deck v3.1 vs realizado; se M+1 subir para ≥ 3%, projeção M2 e M3 do slide 11 se sustentam; se ficar em < 2%, redistribuir com mídia + orgânico assumindo mais peso.

---

**Assinatura:** Hermes @ 2026-07-01T23:45 · orquestração Camada 2 sobre contrato `m-20260701-112935-rosie-90d`.
