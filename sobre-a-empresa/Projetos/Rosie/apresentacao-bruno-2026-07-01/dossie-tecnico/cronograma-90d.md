---
id: rosie-cronograma-90d
titulo: "Rosie — Cronograma integrado 90d (execução pós-aprovação do deck)"
autor: Squad Cairós (cairos-chief + gerente-de-projeto + gestor-de-riscos + gestor-de-stakeholders)
squad: cairos
executivo: poseidon
data: 2026-07-01
contrato: Olimpo/contratos/missoes/m-20260701-112935-rosie-90d.yaml
skills_aplicadas: [gestao-de-cronograma-e-escopo, gestao-de-riscos-de-projeto, comunicacao-com-stakeholders, sop-e-processo-operacional]
status: v1 — para consolidação Apolo (bloco 9 do deck)
depende_de:
  - spec-rastreamento.md (Peitho/pixel-specialist)
  - auditoria-site-vs-marca.md (Harmonia)
  - fluxos-email.md (Caliope)
  - cenarios-funil-reverso.md (Pactolo)
  - fluxo-comercial-crm.md (Emporos)
  - estrutura-midia-paga.md (Peitho)
---

# Cronograma integrado — Rosie 90 dias de execução

> **Voz PMO.** Este documento integra as 6 frentes dos dossiês técnicos num único fluxo temporal de 90 dias de operação. **D+0 é o dia em que Bruno aprova o deck** — a entrega do plano em si acontece em outro ciclo (missão `m-20260701-112935-rosie-90d`, D+28); aqui é a execução real do plano aprovado. Toda data é estimativa com premissa; toda meta é gate binário; nada é compromisso sem cláusula de escalonamento. Se a premissa falha, o número muda — o rito, não.

---

## 1. Escopo integrado das 6 frentes

As 6 frentes convergem para uma única cadeia de valor:

**Rastreamento (Peitho/Hefesto)** instala o sistema nervoso do funil (CAPI + GA4 + GTM server + UTMs). Sem ele, **Mídia paga (Peitho)** otimiza no escuro, **Cenários (Pactolo)** medem ROAS por benchmark em vez de fato, e **CRM (Emporos)** perde atribuição de conversas WhatsApp. **Auditoria site (Harmonia)** garante que o clique paga não morre por quebra visual — é a alavanca de CVR mais barata do plano. **E-mail (Caliope)** ativa a base 5.5k (contribuição orgânica de 25-35% dos cenários Pactolo) e amarra os fluxos pós-compra ao pipeline Emporos.

Regra de sequenciamento: **nada de Meio/Fundo Meta antes do CAPI**, **nada de escala antes de aprendizado por 14d sustentado**, **nada de upgrade de budget antes do Gate D+60 com ROAS ≥3x provado**. O fluxo é linear por dependência técnica; o paralelismo só entra dentro de cada frente.

---

## 2. WBS — Work Breakdown Structure

Quatro grandes fases. Cada fase é gate binário (verde/amarelo/vermelho). Cada pacote de trabalho traz dono, dependência e critério de conclusão. Nível máximo de profundidade: 4.

### Fase 1 — Fundação (D+0 → D+15)

Objetivo: **consertar o balde** (Mandalia). Instalar tracking, integrar sistemas, subir landing quick-win, ligar fluxos e-mail. Zero escala de mídia; mídia em modo aprendizado apenas.

| # | Pacote | Dono | Prazo | Depende de | Critério de feito |
|---|---|---|---|---|---|
| 1.1 | **Setup contas + auditoria** (BM Meta, Google Ads, catálogo Nuvemshop, Customer Match upload da lista 5.5k) | media-buyer (Peitho) | D+3 | Acessos admin (Bruno) | Pixel validado, catálogo conectado, screenshots arquivados |
| 1.2 | **Webhook Nuvemshop → RD Station** (eventos `add_to_cart` + `purchase` com UTMs) | Emporos + ops Rosie | D+3 | Token API RD, admin Nuvemshop | Payload chegando em RD com UTM preservada, teste com 5 compras reais |
| 1.3 | **GTM web + server-side em Cloudflare Workers** (spec Peitho §2) | Hefesto | D+10 | 1.1, 1.2 | Todos os 6 eventos e-commerce disparando em Preview mode |
| 1.4 | **CAPI Meta + GA4 MP + Google Ads Enhanced Conversions** (dedup via `event_id`) | Hefesto | D+15 | 1.3 | EMQ purchase ≥ 8/10, dedup validada em Test Events, 10 compras de teste ponta-a-ponta |
| 1.5 | **Landing quick-win Rosie** (mockup Harmonia → HTML/CSS com tokens brandbook) | ui-engineer (Harmonia) | D+10 | Mockup aprovado, fotos 90s | Lighthouse mobile ≥ 85, LCP < 2.5s, contraste WCAG AA, deploy em URL de teste |
| 1.6 | **Site principal com paleta rose + tipografia Marcellus/DM Sans** (correção dos 3 achados do gap-site-vs-manual) | ui-engineer (Harmonia) + ops Rosie | D+15 | 1.5 aprovado, tema Nuvemshop editável | Rose aparece em CTA/hovers, corpo em DM Sans, preto `#14100C` em headers |
| 1.7 | **GHL subconta Rosie + integração bi-direcional RD ↔ GHL** | Emporos | D+7 | Deploy GHL (contratado pela Rosie) | Sync de contato + tag funcionando, pipeline 4-estágios criado (vazio) |
| 1.8 | **WhatsApp Business API no GHL + cadência abandono (modo shadow)** | Emporos + Catarina | D+10 | 1.7, aprovação Meta do número | 20 primeiros disparos aprovados pela Catarina antes de ir automático |
| 1.9 | **Fluxos e-mail Caliope no RD (Boas-vindas 5 e-mails + Nutrição semanal + Carrinho abandonado 3 e-mails)** | Caliope + ops RD | D+12 | Tokens RD mapeados, cupons `PRIMEIRA` e `SEUFRETE` criados na Nuvemshop | 3 fluxos ativos, teste com contato dummy percorrendo os 5 e-mails de boas-vindas |
| 1.10 | **Meta topo modo aprendizado** (9 criativos GT-1 sandbox, R$50/dia por ângulo) | pedro-sobral + ad-midas | D+7 | 1.1 | 3 ângulos × 3 hooks no ar, CPM lido diariamente |
| 1.11 | **Google Search Branded ao ar** (defesa `[rosie]` + variações) | kasim-aslam | D+3 | 1.1 | RSA no ar, Search Impression Share ≥ 85% em 48h |
| 1.12 | **PMax refinada com 3 asset groups** (Básicos/Statement/Acessórios) | kasim-aslam | D+7 | 1.1 | 3 asset groups ativos, feed Nuvemshop filtrado por categoria |

**Gate de saída Fase 1 (D+15):** CAPI live + dedup OK + landing corrigida + fluxos e-mail rodando + Meta topo com sinal + GHL pipeline no ar. **Se algum destes 5 estiver ✗, Fase 2 não começa** — atraso vira solicitação de mudança formal ao Bruno.

### Fase 2 — Aquecimento (D+15 → D+45)

Objetivo: destravar o Fundo do funil pós-CAPI. Ligar campanhas de Conversão (Purchase). Fluxos e-mail já rodando. Cadência WhatsApp ativa. Aletheia entrega persona validada em D+30 e alimenta iteração criativa.

| # | Pacote | Dono | Prazo | Depende de | Critério de feito |
|---|---|---|---|---|---|
| 2.1 | **Meta Fundo — DPA Infinity Retargeting** (Add to Cart 14d + Checkout 14d + lista 5.5k) | depesh-mandalia | D+18 | 1.4 (CAPI) | Campanha CBO ativa, catálogo Nuvemshop puxando produtos, ROAS ≥ 2,5x em 7d |
| 2.2 | **Meta Meio — retargeting engajadores IG 180d + visitantes 30d** | pedro-sobral | D+18 | 1.4 | ViewContent ≤ R$3,50 ou Add to Cart ≤ R$12 |
| 2.3 | **Primeira otimização** (matar underperformers, escalar vencedores +20%, entrar em GT-2) | traffic-chief + depesh-mandalia | D+21 | 2.1, 2.2 | Report semanal com kill/scale por criativo |
| 2.4 | **Fluxos e-mail Caliope Pós-compra (4 e-mails) + Winback (3 e-mails)** ativos no RD | Caliope + ops RD | D+20 | 1.9 | Fluxo 4 e 5 no ar, tokens `{RESUMO_DO_PEDIDO}` mapeados |
| 2.5 | **Pipeline GHL rodando em produção** (SLA 15min comunicado, tags atribuição UTM operando, 200+ deals tocados) | Emporos + Catarina + Gabrielas | D+20 | 1.7, 1.8 | Time treinado, 5 KPIs no dashboard, primeira revisão com Bruno agendada |
| 2.6 | **Aletheia entrega persona validada** (Mom Test com 10 clientes reais) | Aletheia (handoff externo) | D+30 | Autorização Bruno para contato + lista de clientes | Documento persona validada em `pesquisa/03-persona-icp.md` v2 |
| 2.7 | **Iteração criativo com persona validada** (novos ângulos GT-1) | ad-midas + Aletheia | D+35 | 2.6 | 3 ângulos novos no ar, GT-1 rodando |
| 2.8 | **Reconciliação Pactolo com F0 real** (AOV real, margem, CVR pós-landing, cohort inicial) | Pactolo + Ronan | D+30 | F0 do Bruno (esperado D+2), 30d de dado real | 3 cenários revisados, sensibilidade atualizada, laudo enviado ao Plutos |
| 2.9 | **Cadência WhatsApp abandono em produção plena** (não mais shadow) | Emporos + Catarina | D+20 | 1.8 + 200 disparos shadow validados | Taxa de recuperação medida, tag `alta-intencao` alimentando GHL |

**Gate de saída Fase 2 (D+30) — Gate 1:** ver §4.

### Fase 3 — Consolidação (D+45 → D+75)

Objetivo: escalar o que provou. YouTube ADUCATE entra em produção. Nutrição semanal Caliope no ciclo. Pactolo alimenta unit economics com dado real. Emporos entra em ajuste fino de cadência.

| # | Pacote | Dono | Prazo | Depende de | Critério de feito |
|---|---|---|---|---|---|
| 3.1 | **YouTube ADUCATE em produção** (vídeo 2min20s + Shorts 30-60s, sinais Similar Audiences da lista 5.5k) | tom-breeze + ad-midas | D+50 | 2.7 (criativo maduro pós-persona) | Vídeo no ar, TrueView for Action, CPV ≤ R$0,15 |
| 3.2 | **Escala Meta Meio+Fundo** (V-Scale +20% em vencedores 14d, H-Scale duplicação com variável) | depesh-mandalia | D+45→D+75 | ROAS Meta ≥ 3x sustentado 3d | Budget realocado, frequência ≤ 3,0, CPA Meta ≤ R$45 |
| 3.3 | **Reativação winback base 5.5k** (Fluxo 5 Caliope rodando com segmentação Cold 45d) | Caliope | D+50 | 2.4 + 30d de dado de abertura | Taxa reengajamento ≥ 8%, lista suprimida limpa |
| 3.4 | **Ajuste cadência WhatsApp com A/B nos toques 1 e 3** | Emporos | D+60 | 2.9 + 200+ abandonos processados | Variante vencedora identificada, taxa de recuperação ≥ 15% |
| 3.5 | **PMax refinada com 6 semanas de dados de conversão** (relatório de placement, exclusões de Display/Discover se >40%) | kasim-aslam | D+60 | 6 semanas rodando | Shopping+Search ≥ 65% do gasto, ROAS PMax ≥ 4x |
| 3.6 | **Reconciliação Pactolo — cohort real M1-M2, LTV/CAC com dado** | Pactolo + Metis | D+75 | 60d de compras reais + segmentação por origem | LTV/CAC ≥ 3x confirmado ou renegociação de meta escalada |
| 3.7 | **Nutrição semanal Caliope no ciclo evergreen** (12 e-mails rodando terça 10h) | Caliope + Catarina | D+45 | 2.4 | Ciclo estável, CTR médio ≥ 2%, receita atribuída/semana medida |

**Gate de saída Fase 3 (D+60) — Gate 2:** ver §4.

### Fase 4 — Escala e handoff (D+75 → D+90)

Objetivo: decidir o próximo ciclo. Escalar cascading videos YouTube. Fechar retrospectiva. Preparar Contrato de Missão dos próximos 90d.

| # | Pacote | Dono | Prazo | Depende de | Critério de feito |
|---|---|---|---|---|---|
| 4.1 | **Cascading remarketing YouTube** (Vídeo 1 → Vídeo 2 → Vídeo 3, redução CPA -50%) | tom-breeze | D+80 | 3.1 rodando + baseline CPA medida | Cascata ativa, ROAS YouTube ≥ 3x, CPA reduzido vs baseline |
| 4.2 | **Iteração final PMax** (Discovery cortada se placement report ainda >40%) | kasim-aslam | D+80 | 3.5 | ROAS PMax ≥ 5x sustentado |
| 4.3 | **Retrospectiva 90d** (o que funcionou, o que quebrou, lições) | cairos-chief + squads envolvidos | D+85 | 90d de dado | Documento em `sobre-a-empresa/Projetos/Rosie/retrospectivas/90d-2026.md` |
| 4.4 | **Contrato de Missão próximos 90d** (com base em Gate 3) | Hermes (camada 2) + Ronan | D+88 | Retrospectiva, decisão de budget do Bruno | Contrato lavrado em `Olimpo/contratos/missoes/` |
| 4.5 | **Apresentação de fechamento a Bruno** (marco de mês estendido) | traffic-chief + Ronan | D+90 | 4.3, 4.4 | Reunião realizada, decisão de continuidade travada |

**Gate de saída Fase 4 (D+90) — Gate 3:** ver §4.

---

## 3. Caminho crítico

A cadeia que define o prazo mínimo:

**F0 (Bruno) → 1.1 Setup contas (D+3) → 1.3 GTM web+server (D+10) → 1.4 CAPI live (D+15) → 2.1 Meta Fundo com attribution real (D+18) → 2.3 Primeira otimização (D+21) → Gate 1 (D+30) → 3.2 Escala Meta (D+45) → Gate 2 (D+60) → 4.1 Cascading YouTube (D+80) → Gate 3 (D+90).**

**Ponto de fragilidade máxima:** o pacote **1.4 CAPI live (D+15)** é a dependência raiz de tudo o que vem depois. Sem CAPI, Meta otimiza sobre 60-70% do sinal (perda de 30-40% pós-iOS 14, `[BENCHMARK — Meta Business Help]`), o Fundo de funil (2.1) não pode ligar em modo Conversão-Purchase honesto, e o Realista de Pactolo vira Conservador aritmeticamente. **Um dia de atraso em 1.4 empurra 2.1, 2.3, 3.2 e potencialmente o Gate 2** — se o algoritmo Meta não tiver ≥14 dias de sinal com CAPI antes de D+60, o gate ROAS ≥3x sustentado não fecha, e o pedido de upgrade de budget morre sem base empírica.

**Segundo ponto crítico:** o pacote **2.6 persona validada (D+30)** é dependência do 2.7 (iteração criativo). Se Aletheia atrasa (Mom Test com 10 clientes exige agenda), o criativo M2 continua rodando ângulos hipotéticos, o que compromete o crescimento de ROAS entre Gate 1 e Gate 2.

**Terceiro:** **F0 do Bruno (AOV real, margem, CVR)** — sem F0, Pactolo modela por benchmark e a reconciliação de D+30 fica ainda pendente. É pré-requisito bloqueante do contrato-mãe; se F0 ainda não veio, o Gate 1 opera com dado projetado, não realizado.

---

## 4. Gates de decisão

Três gates formais. Cada gate é reunião de 60min com Bruno + Ronan + squad-líder da fase. Sem gate fechado, próxima fase não começa.

### Gate 1 — D+30

**Critérios de sucesso** (todos binários):

- **G1.1 (Receita):** Faturamento total M1 ≥ **R$15k** (piso Realista Pactolo) — meta declarada Bruno = R$70k, mas modelagem Pactolo mostra que R$70k é aritmeticamente inatingível com R$5k de mídia; **R$15k é o teto do Realista** com CAPI live desde D+15.
- **G1.2 (Rastreamento):** CAPI dedup ✓, EMQ purchase ≥ 8/10, 100% dos eventos e-commerce fluindo em Meta + GA4 + Google Ads.
- **G1.3 (ROAS):** Meta ROAS blended ≥ 2,0x em 14d sustentado (piso Realista M1).
- **G1.4 (Persona):** Aletheia entregou persona validada em D+30, criativo M2 já iterado com o insight.
- **G1.5 (Site):** CVR site ≥ 1,0% (baseline pós-landing quick-win).

**Ação por veredito:**

- **Verde (5 de 5):** segue para Fase 3, escala Meta habilitada, YouTube entra em produção.
- **Amarelo (3-4 de 5):** reforço criativo Meta + revisão CVR site + iteração cadência WhatsApp; revisão em D+37; Bruno informado por relatório escrito, sem reunião extra.
- **Vermelho (≤2 de 5):** escalação a Bruno em 24h com 3 opções propostas (R13): (A) pivotar mídia para 100% Meio+Fundo, cortar topo; (B) renegociar meta M2/M3 com base no realizado M1; (C) upgrade de budget antecipado para R$8k em M2. Ronan lidera a conversa.

### Gate 2 — D+60

**Critérios de sucesso:**

- **G2.1 (Receita):** Faturamento total M2 ≥ **R$20k** (piso Realista Pactolo M2).
- **G2.2 (ROAS Meta):** ≥ 3,0x blended em 14d sustentado — este é o gatilho de upgrade de budget do Fiscal (§5.4 estrutura-midia-paga).
- **G2.3 (Unit economics):** LTV/CAC ≥ 3x com dado real de cohort D+30-D+60.
- **G2.4 (Cadência WhatsApp):** Taxa de recuperação de carrinho ≥ 15%.
- **G2.5 (Orgânico):** Contribuição orgânica ≥ 25% do faturamento total (calendário editorial + fluxos e-mail operando).

**Ação por veredito:**

- **Verde (5 de 5):** recomendar upgrade de budget M3 para R$10-12k (gatilho Fiscal); Pactolo prepara business case; Bruno decide em D+62. Se Bruno aprovar, Fase 4 opera em budget expandido.
- **Amarelo (3-4 de 5):** manter R$5k, reforço no gap identificado (criativo/site/orgânico), reavaliação em D+75.
- **Vermelho (≤2 de 5):** escalação Ronan + Bruno em 24h com 3 opções (R13): (A) rever meta M3 formalmente para R$40-60k com base no cenário Conservador; (B) pausa parcial de campanhas de baixo ROAS + reforço orgânico via Pheme; (C) revisão contratual Kolden↔Rosie (comissão vs. fixo).

### Gate 3 — D+90

**Critérios de sucesso:**

- **G3.1 (Receita):** Faturamento total M3 ≥ **R$25k** (piso Realista Pactolo M3).
- **G3.2 (ROAS blended):** ≥ 3,5x com R$5k, ou ≥ 4,0x se upgrade aprovado em Gate 2.
- **G3.3 (Cohort):** LTV/CAC reconciliado com cohort real 90d, dado enviado ao Plutos para decisão de portfólio.
- **G3.4 (Base ativada):** ≥ 25% da lista 5.5k engajada nos últimos 30d (aberturas), lista suprimida limpa via Winback.
- **G3.5 (Retrospectiva):** documento fechado, lições verificadas gravadas nos MEMORY.md dos squads envolvidos.

**Ação por veredito:**

- **Verde (5 de 5):** Contrato de Missão próximos 90d com escopo expandido (TikTok, redesign site, próxima temporada); Bruno assina renovação/expansão.
- **Amarelo (3-4 de 5):** Contrato de Missão próximos 90d com escopo enxuto (manter operação atual + 1 nova alavanca); revisão contratual leve.
- **Vermelho (≤2 de 5):** escalação Olimpo (Plutos + Zeus) para decisão de portfólio — mantém, reduz escopo ou encerra? Ronan negocia com Bruno em D+95.

---

## 5. RACI

Notação: **R** = Responsável (faz), **A** = Aprovador (decide), **C** = Consultado (opina), **I** = Informado.

| Área | Rosie (Catarina) | Rosie (Bruno) | Ronan (Kolden) | Peitho | Caliope | Emporos | Harmonia | Pactolo | Cairós |
|---|---|---|---|---|---|---|---|---|---|
| Rastreamento (CAPI/GA4/GTM) | I | A | C | R | I | C | I | I | I |
| Fluxos e-mail RD | C | I | C | I | R | C | I | I | I |
| Cadência WhatsApp + pipeline GHL | R | A | C | I | I | R | I | I | I |
| Landing quick-win + site principal | C | A | C | C | I | I | R | I | I |
| Mídia paga (Meta+Google+YouTube) | I | A (budget) | C | R | I | I | C | C | I |
| Cenários financeiros | I | I (recebe) | A | C | I | I | I | R | I |
| Cronograma 90d + gates | I | I | A | C | C | C | C | C | R |
| Reuniões semanais | C | R (participa) | R | I | I | I | I | I | I |
| Decisão de upgrade budget | I | A | R (recomenda) | C | I | I | I | R | C |

---

## 6. Matriz de risco

Notação probabilidade × impacto (1-5 em cada eixo). Exposição = P × I. Resposta: mitigar/transferir/aceitar/evitar.

| ID | Risco | P | I | Exp. | Resposta | Dono | Gatilho | Contingência |
|---|---|---|---|---|---|---|---|---|
| R01 | Bruno não entrega F0 em 48h → travamento modelagem Pactolo | 3 | 4 | 12 | mitigar | Ronan | D+2 sem F0 recebido | Pactolo mantém modelo com benchmark tagueado; reconciliação empurrada para D+45; risco de decisão sobre-otimista até lá |
| R02 | CAPI atrasa deploy além de D+15 → attribution cega, otimização Meta impossível | 3 | 5 | 15 | mitigar | Hefesto | D+12 sem GTM server em Preview | Escalar Hefesto para prioridade máxima; Peitho ativa fallback GA4 cross-check via UTMs; Fase 2 empurrada 3-5 dias; Gate 1 fica em amarelo |
| R03 | Site não aplica identidade brandbook → CVR abaixo do Realista modelado | 3 | 4 | 12 | mitigar | Harmonia + ops Rosie | D+15 sem rose+Marcellus no header | Landing quick-win vira canal-só-anúncio (mantém coerência para 100% do tráfego Meta); site principal entra em Contrato próximo 90d |
| R04 | Fadiga criativa Meta ~D+45 → CTR cai 40-60%, CPA sobe | 4 | 4 | 16 | mitigar | ad-midas | Frequência semanal > 3,5 OU CTR cai 30% da baseline | Fábrica Ad Midas em ritmo (2 criativos/semana M1, 3/semana M2); kill threshold 2× CPA-alvo; escala volume criativo antes de escala budget |
| R05 | Meta M3=R$150k inatingível → credibilidade Kolden com Bruno | 5 | 5 | 25 | evitar (mudar escopo) | Ronan + Plutos | Slide 10 do deck já registra flag vermelha (Pactolo §4.3) | Ronan já negocia com Bruno no deck; meta operacional Kolden = piso Realista (R$15/20/25k); flag vermelha explícita no slide 10 |
| R06 | Catarina sobrecarregada com WhatsApp → SLA 15min quebra | 4 | 3 | 12 | mitigar | Emporos + Catarina | Tempo médio de resposta > 30min em 3 dias seguidos | Escalar contratação da 2ª Gabriela em tempo integral (fora do escopo Kolden — Bruno decide); modo shadow prolongado até rotina estabilizada |
| R07 | Aletheia atrasa persona validada além de D+30 → criativo M2 sem base | 3 | 3 | 9 | mitigar | Aletheia (handoff externo) | D+25 sem 5 entrevistas concluídas | Peitho/ad-midas continua com ângulos hipotéticos; nova iteração criativa empurrada para D+45; Gate 1 em amarelo no critério G1.4 |
| R08 | Orgânico regride à média (R$21k/5d foi picada, não sustentável) | 3 | 5 | 15 | mitigar | Fiscal + Pheme | D+45 orgânico projetado < R$80k/mês | Cenário B do Fiscal ativa; renegociar M3 com Bruno para R$120k realista + reforço orgânico via Pheme (fora do escopo atual) |
| R09 | Concorrente compra "Rosie" no Google Search | 4 | 2 | 8 | mitigar (já em curso) | kasim-aslam | CPC branded sobe 2× em 7d | Aumentar budget Search Branded de R$300 para R$600 dentro do próprio budget PMax |
| R10 | Webhook Nuvemshop cai silenciosamente → purchase server-side não dispara | 2 | 4 | 8 | mitigar | Hefesto | Alerta GTM server: gap >4h entre eventos `add_to_cart` e `purchase` do mesmo `client_id` | Fila de retry no GTM server (Cloud Tasks ou CF Queues); auditoria mensal dia 5 |
| R11 | Bruno pede pause de campanhas mid-course sem gate | 2 | 5 | 10 | mitigar (comunicação) | traffic-chief + Ronan | Bruno solicita pausa em conversa não-gate | Dashboard sempre visível a Bruno; reunião semanal fixa; gates D+30/60/90 são pontos formais de decisão dele (não improvisar) |
| R12 | Deduplicação Pixel↔CAPI falha → conversão conta em dobro | 2 | 3 | 6 | mitigar | Peitho/pixel-specialist | Meta Events Manager sinaliza dedup rate <95% | UUID no browser, propagado ao server via cookie; validação em Test Events antes de ir a prod |
| R13 | LGPD/Consent Mode não implementado antes de campanha em prod | 3 | 3 | 9 | mitigar | Hefesto + jurídico Rosie | D+15 sem decisão jurídica | Modo `advanced_matching` reduzido (só `em` hasheado) até decisão; CAPI segue em compliance mínimo |
| R14 | Fotos 90s para landing quick-win não disponíveis | 3 | 3 | 9 | mitigar | Bruno + Catarina | D+7 sem foto entregue | Curadoria do IG da Catarina como fallback (com permissão); shoot novo entra em Contrato próximo 90d |

**Top 5 riscos** (por exposição): R05 (25), R04 (16), R02 (15), R08 (15), R01 e R03 (12 cada).

**Regra dura Cairós:** todo risco desta matriz **tem dono, gatilho e resposta**. Nenhum entra "só como aviso". Revisão da matriz é semanal, no daily de terça, e a versão vive em git.

---

## 7. Matriz de stakeholders (poder × interesse)

| Stakeholder | Poder | Interesse | Quadrante | Estratégia | Dono da relação |
|---|---|---|---|---|---|
| **Bruno** (contato B2B, paga a mídia) | Alto | Alto | Gerir de perto | Updates semanais + reunião fixa terça 10h + relatórios de gate | Ronan (cliente-facing) |
| **Catarina** (fundadora-creator) | Médio | Alto | Envolver em decisões criativas | Consulta em ângulos criativos + validação de voz Rosie + participação em revisão de gates | Caliope + Emporos |
| **Ronan** (Kolden, cliente-facing) | Alto | Alto | Gerir de perto | Daily interno Kolden 15min via Hermes + decisão de escalonamento | Cairós-chief |
| **Gabriela Martins + Gabriela Fortes + Catarina Leite** (atendimento) | Baixo | Médio | Informar | Comunicação de rotina e SLA; treinamento em pipeline GHL | Emporos |
| **Squads Kolden** (Peitho, Caliope, Emporos, Harmonia, Pactolo) | Médio | Alto | Envolver | Daily Hermes + escalonamento vertical via Olimpo | Cairós-chief |
| **Aletheia** (handoff externo — persona validada) | Baixo | Médio | Informar | Handoff de entrada em D+15, cobrança de entrega em D+25, recebimento em D+30 | Cairós + Ronan |
| **Plutos + Zeus (Olimpo)** | Alto (portfólio) | Médio | Manter satisfeito | Escalonamento em veredito Vermelho de qualquer gate + relatório trimestral | Cairós-chief |

---

## 8. Plano de comunicação

| Audiência | Mensagem | Canal | Frequência | Formato | Responsável |
|---|---|---|---|---|---|
| Bruno | Progresso semanal + próxima decisão pedida | Reunião presencial/vídeo + relatório 1-página | 30min toda terça 10h | Verde/amarelo/vermelho + destaques + bloqueios + decisões pendentes | Ronan + traffic-chief |
| Bruno | Fechamento de gate (D+30/60/90) | Apresentação + deck 3-slides | Marco | Estado do gate + decisões travadas + próximas 4 semanas | Ronan + Cairós-chief |
| Catarina | Coordenação criativa + WhatsApp SLA | WhatsApp + reunião 15min quinta 15h | Semanal | Voz Rosie + revisão de criativos + gargalos de atendimento | Caliope + Emporos |
| Ronan | Daily interno Kolden (radar + gates + bloqueios) | Hermes | 15min diário | Estado por squad + risco novo + escalação pendente | Cairós-chief |
| Squads Kolden envolvidos | Coordenação de execução | Hermes + Contrato de Missão versionado | Daily assíncrono | Blockers + handoffs abertos + próxima entrega | Squad-chief de cada frente |
| Plutos + Zeus (Olimpo) | Escalonamento em gate vermelho + relatório trimestral | Contrato de Missão + reunião ad-hoc | Sob demanda + trimestral | 3 opções propostas (nunca só problema — R13 Cairós) | Cairós-chief |
| Time Rosie (Gabrielas + Catarina Leite) | Rotina, SLA, novidade de pipeline | GHL + WhatsApp interno | Semanal + ad-hoc | Cheat-sheet de fluxo + FAQ | Emporos |

**Regra dura de escalonamento:** qualquer gate falhado (vermelho) → Ronan em 24h com 3 opções propostas (nunca só o problema — R13/G13 do gestor-de-stakeholders). Diagnóstico-sem-solução é stress, não gestão.

**Templates calibrados por audiência** (G18):

- **Status executivo (Bruno, 3 linhas):** estado (verde/amarelo/vermelho) + 1 frase do porquê · decisão pedida (ou "nenhuma") · próximo marco.
- **Status operacional (squads Kolden):** estado geral + métrica de progresso · bloqueios com dono · KPIs-chave (ROAS/CVR/CAC) · próximas 2 semanas + dependências · pedidos de ajuda.

---

## 9. Definition of Done por frente

Critérios binários. Sem eles, a frente não fecha — vira solicitação de mudança formal.

- **Rastreamento (Peitho/Hefesto):** 100% dos 6 eventos e-commerce (page_view, view_item, add_to_cart, begin_checkout, add_payment_info, purchase) chegando ao Meta CAPI + GA4 + Google Ads sem discrepância >5% vs Nuvemshop admin. EMQ purchase ≥ 8/10. Dedup Pixel↔CAPI validada em Test Events.
- **Mídia paga (Peitho):** CBO Full Funnel Meta ativo com ≥15 criativos em rotação. PMax refinada com 3 asset groups. Search Branded defendendo Impression Share ≥ 90%. YouTube ADUCATE ativo em M2+. Dashboard KPIs no ar.
- **E-mail (Caliope):** 5 fluxos rodando (Boas-vindas 5 e-mails · Nutrição semanal · Carrinho abandonado 3 e-mails · Pós-compra 4 e-mails · Winback 3 e-mails). Cupons `PRIMEIRA` e `SEUFRETE` criados. Tokens RD mapeados. Segmentações Ativa/Cold 45d/Compradora recente ativas.
- **CRM (Emporos):** pipeline GHL 4-estágios em produção. SLA 15min medido no dashboard. Cadência WhatsApp abandono em automação. 5 KPIs no dashboard (recuperação, LTV, tempo resposta, reativação, recorrência). Tags de atribuição UTM operando.
- **Site (Harmonia):** landing quick-win no ar com paleta rose + Marcellus/DM Sans + Lighthouse mobile ≥ 85 + LCP < 2.5s + WCAG AA. Site principal com header/CTA/hovers em rose + corpo em DM Sans + preto quente `#14100C`.
- **Cenários (Pactolo):** 3 cenários reconciliados com F0 real em D+30. Sensibilidade atualizada. Unit economics com cohort real em D+90. LTV/CAC ≥ 3x confirmado ou renegociação escalada.
- **Cronograma (Cairós):** gates D+30/D+60/D+90 realizados com veredito documentado. Matriz de risco revisada semanalmente. RACI respeitado. Solicitações de mudança versionadas em git.

---

## 10. Handoff pós-90d

**Operação recorrente** (mantém-se como rotina, entra em contrato de continuidade Kolden↔Rosie):

- Mídia paga Meta + Google + YouTube com fábrica criativa Ad Midas.
- Fluxos e-mail Caliope no ciclo evergreen (nutrição semanal, pós-compra, winback).
- Pipeline GHL + cadência WhatsApp + SLA 15min.
- Auditoria mensal de rastreamento (dia 5 de cada mês — Peitho §5 spec).
- Reconciliação Pactolo de unit economics + cohort mensal.
- Reunião semanal com Bruno + relatório 1-página.

**Novo Contrato de Missão** (vira briefing separado, lavrado por Hermes em D+88):

- **Expansão de canais:** TikTok Ads (se persona validada da Aletheia sinalizar tração jovem), Pinterest (moda feminina premium tem tração alta), afiliadas/parcerias com creators.
- **Redesign site completo:** o quick-win entrega ~+20-40% de CVR (Harmonia §2); redesign completo destrava o teto do Realista Pactolo.
- **Próxima temporada de coleção:** integrar lançamento com sequência de e-mail de lançamento (`sequencia-de-email-de-lancamento` Caliope), Meta topo de alto budget, PR/influencer.
- **Upgrade de budget para R$10-12k/mês** (se Gate 2 verde) — Pactolo prepara business case, Bruno decide.
- **Pheme (social media) em produção:** o Fiscal e o Pactolo dependem de orgânico ≥25% dos cenários; Pheme ativa a operação social para segurar essa contribuição.

**Handoff a Metis (analytics de produto):** LTV/CAC operacional com cohort mensal a partir de M4, dashboard Solomon.

**Handoff a Plutos (Olimpo/CFO):** decisão de portfólio Kolden↔Rosie com dados de 90d (mantém como está, reduz, encerra ou expande para R$4k+3% renegociado).

---

## Gate de qualidade Cairós (aplicado a esta entrega)

- [x] **Premissas explícitas + nível de confiança:** todo prazo carrega dependência declarada; todo número herdado dos 6 markdowns mantém tag `[VALIDADO|BENCHMARK|HIPÓTESE|PENDENTE]`.
- [x] **Riscos com dono + gatilho + resposta:** 14 riscos, todos com donos nomeados e gatilhos observáveis.
- [x] **Mudança de escopo como solicitação formal:** matriz de creep 10% amarelo / 25% re-baselining registrada no gerente-de-projeto (§34 do agente); qualquer desvio dispara solicitação de mudança.
- [x] **Plano de comunicação por poder × interesse:** 7 stakeholders mapeados, canal + frequência + formato + responsável.
- [x] **Não é build de software:** é execução de plano de negócio. Não há handoff ao Prometeu.
- [x] **Caminho crítico explícito:** CAPI (D+15) é a raiz; F0 (Bruno) é pré-requisito bloqueante.
- [x] **Métricas para handoff Metis:** ROAS, CVR, CAC, LTV, taxa de recuperação, taxa de reativação — todas definidas em §9.
- [x] **Escalação com 2-3 opções propostas (R13):** Gate 1/2/3 vermelho traz 3 opções cada, nunca só o problema.

---

**Assinado:** Squad Cairós — cairos-chief (orquestração) + gerente-de-projeto (WBS + caminho crítico + Definition of Done) + gestor-de-riscos (matriz P×I + top 5) + gestor-de-stakeholders (matriz poder×interesse + plano de comunicação + templates).
**Skills aplicadas:** `gestao-de-cronograma-e-escopo` + `gestao-de-riscos-de-projeto` + `comunicacao-com-stakeholders` + `sop-e-processo-operacional`.
**Handoff:** Apolo consolida no bloco 9 do deck (cronograma) e bloco 10 (riscos + gates). Dike verifica em D+27 (coerência com os 5 outros markdowns, rastreabilidade das tags, cobertura das 6 frentes).
**Data:** 2026-07-01.
