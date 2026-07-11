---
name: gestao-de-fluxo-de-caixa
description: >
  Use para PROJETAR e MONITORAR o caixa: projeção de fluxo de caixa (direto e indireto, 13 semanas e
  12 meses), posição de liquidez, runway (quanto o caixa dura), burn rate (gross e net), capital de giro
  e ciclo de conversão de caixa (DSO/DPO/DIO/CCC), calendário de recebimentos/pagamentos e gatilhos de
  alerta de liquidez. Regra dura: caixa é fato, não confundir com lucro; separar realizado de projetado.
  Gatilhos: "fluxo de caixa", "cash flow", "runway", "burn", "quando acaba o dinheiro", "capital de giro",
  "DSO/DPO", "liquidez", "ciclo de caixa". Dono: analista-de-fluxo-de-caixa.
tipo: skill
area: Pactolo
up: "[[Pactolo/_MOC-pactolo]]"
---

# Gestão de Fluxo de Caixa

Camada executável da liquidez. Regra-mãe: **lucro não é caixa** — uma empresa lucrativa quebra por
descasamento de caixa. Separe sempre o **realizado conciliado** do **projetado** (com premissas).

## 0. Insumos (porta de entrada)
- Saldos de caixa conciliados e subledgers de AR/AP (do `controller`).
- Calendário de recebimentos e pagamentos; premissas de prazo (DSO/DPO).

## 1. Projeção de caixa
- **Direto:** recebimentos − pagamentos, datados, por semana (horizonte 13 semanas) e por mês (12 meses).
- **Indireto:** do lucro ao caixa (ajusta não-caixa e variação de capital de giro).
- Saída: período | saldo inicial | entradas | saídas | saldo final | runway acumulado.

## 2. Liquidez e runway
- Posição de caixa atual; **runway** = caixa ÷ net burn (meses); data implícita de exaustão.
- Cenário de estresse: atraso de recebimento, queda de receita, antecipação de pagamento.

## 3. Burn rate
- **Gross burn** (saídas operacionais totais) e **net burn** (saídas − entradas).
- Tendência mês a mês; sensibilidade a corte de custo ou atraso de funding.

## 4. Capital de giro
- **DSO** (dias de recebimento), **DPO** (dias de pagamento), **DIO** (dias de estoque).
- **CCC** = DSO + DIO − DPO. Quanto menor, menos caixa preso. Aponte a alavanca de melhora.

## 5. Calendário e alertas
- Entradas/saídas datadas; concentração de pagamentos; descasamentos que exigem funding de curto prazo.
- Gatilhos de **liquidez mínima** e covenants (se houver) — sinalizados para subir ao Plutos.

## 6. Saída e handoff
Projeção + runway + capital de giro + alertas. O caixa do modelo de longo prazo (do
`modelador-financeiro`) deve **bater** esta projeção — alinhe. Decisão de captação/corte/alocação é do
**Plutos (Olimpo/CFO)**: esta skill entrega o cenário e o gatilho, não a decisão.

## Capital de giro desagregado (DSO/DPO/DIO/CCC)

> _Seção absorvida de github.com/msitarzewski/agency-agents@a597cb6 (G9, MIT)._

Capital de giro não é uma linha — são **quatro métricas conversando**. Sem desagregar em DSO/DPO/DIO/CCC,
a conversa de liquidez vira "está apertado" sem saber qual alavanca puxar.

### DSO — Days Sales Outstanding (dias de recebimento)

- **Fórmula:** AR médio × 365 ÷ Receita anual (ou × 90 ÷ Receita do trimestre para janela mais reativa).
- **O que mede:** quantos dias a empresa leva, em média, para converter venda em caixa recebido.
- **Contexto Kolden:** prazo de recebimento das plataformas afeta DSO direto. **Shopee** opera tipicamente
  em **D+15 a D+30** conforme regra do programa de afiliado/vendedor. Outros marketplaces variam.
- **Meta operacional:** DSO ≤ prazo contratual + **5 dias** de tolerância para atraso operacional
  (processamento da plataforma, conciliação interna). Acima disso, há sinal de problema (recebimento atrasado,
  dispute, conciliação falhando).

### DPO — Days Payable Outstanding (dias de pagamento)

- **Fórmula:** AP médio × 365 ÷ Compras anuais.
- **O que mede:** quantos dias a empresa segura caixa antes de pagar fornecedores.
- **Meta operacional:** maximizar DPO **dentro do prazo contratado** — pagar no último dia útil do prazo,
  nunca antes (perde valor do dinheiro no tempo), nunca depois (vira juros e relacionamento ruim com
  fornecedor). DPO empurrado por atraso é dívida disfarçada, não estratégia.

### DIO — Days Inventory Outstanding (dias de estoque)

- **Fórmula:** Inventory médio × 365 ÷ COGS.
- **O que mede:** quantos dias o estoque fica parado antes de virar venda.
- **Contexto Kolden:**
  - **Modelo afiliado de plataforma (Shopee atual):** sem estoque próprio → **DIO ≈ 0**.
  - **Modelo dropshipping com pré-compra ou modelo de produto próprio:** DIO conforme política de buffer
    (segurança de SKU A-curve, sazonalidade, lead time do fornecedor).
- **Sinal de alerta:** DIO crescente sem expansão de catálogo indica estoque parado / mix ruim, não
  crescimento.

### CCC — Cash Conversion Cycle (ciclo de conversão de caixa)

- **Fórmula:** **CCC = DSO + DIO − DPO**.
- **O que mede:** quantos dias o caixa fica "preso" no operacional entre comprar/produzir e receber do
  cliente.
- **Leitura:**
  - **CCC > 0:** empresa financia o próprio capital de giro (precisa ter caixa parado para girar).
  - **CCC ≈ 0:** o ciclo se paga sozinho.
  - **CCC < 0:** o **fornecedor financia o operacional** (cliente paga antes da empresa pagar o
    fornecedor). É a posição de Amazon, Mercado Livre maduro, supermercado clássico — recebem do cliente
    em D+0 e pagam o fornecedor em D+30/60/90.

### Ciclo-padrão Kolden (modelo afiliado de plataforma)

- DSO: **15 a 30 dias** (prazo Shopee).
- DPO: aplicável apenas a **gastos de mídia paga** (Meta Ads, Google Ads) e **ferramentas/SaaS** — quase
  tudo é débito direto ou cartão, então DPO efetivo é baixo.
- DIO: **0** (sem estoque próprio).
- **CCC ≈ DSO** (15 a 30 dias). Implicação: o **capital de giro Kolden é essencialmente AR** — o que está
  na conta da Shopee a receber. Otimização de liquidez no modelo atual é antecipação de recebíveis,
  redução de prazo contratual ou diversificação de plataformas, **não** alongamento de DPO (não há base de
  AP grande o suficiente).

### Visualização recomendada

Histórico mensal de cada métrica + meta + banda de alerta quando o valor sair de **±1 desvio-padrão** do
histórico de 12 meses. Mudança brusca em qualquer das 4 dispara investigação.

### Anti-padrões

- **Maximizar DPO atrasando pagamento:** vira juros, multa, queima de relacionamento e, no limite, corte de
  fornecedor estratégico. DPO se otimiza no prazo contratado, não no atraso.
- **Ignorar DSO** porque "está vendendo bem": vendas crescentes com DSO crescente = caixa preso crescente
  = runway encolhendo no meio do crescimento. Falência de empresa lucrativa começa aqui.
- **DIO sem contexto de modelo:** comparar DIO de operação afiliado com DIO de e-commerce com estoque é
  comparar peixes diferentes. Sempre nomear o modelo antes da meta.
- **Otimizar CCC ignorando a relação comercial:** prazo de fornecedor estratégico não é variável de
  modelo financeiro — é variável comercial. Renegociar precisa passar pelo dono da relação, não pelo
  controller sozinho.

## Ajuste sazonal, detecção de anomalia e alertas de liquidez

> _Seção absorvida de github.com/msitarzewski/agency-agents@a597cb6 (G10, MIT)._

Projeção de caixa "achatada" (média histórica esticada para frente) esconde o problema real:
**o mês em que o caixa quebra não é o mês médio — é o mês fraco de baixa temporada**. Três
camadas endurecem a projeção.

### Ajuste sazonal (STL — Seasonal-Trend decomposition using Loess)

Toda série temporal de caixa se decompõe em três componentes:

```
Fluxo_observado_t = Tendência_t + Sazonalidade_t + Resíduo_t
```

- **Tendência (T):** direção de longo prazo (crescimento, retração). Alisada por LOESS.
- **Sazonalidade (S):** padrão repetido por período do calendário (mês, semana). Ex.: **Black
  Friday puxa receita de novembro** no varejo digital; **13º salário estoura despesa em
  dezembro**; **férias comprimem caixa em janeiro**.
- **Resíduo (R):** o que sobra — ruído + evento não-recorrente.

**Como aplicar operacionalmente:**

1. Mínimo **24 meses** de histórico conciliado por linha (receita, despesa, categoria).
2. Calcule índice sazonal por mês: **S_mês = média(fluxo_mês / tendência_mês)** ao longo dos anos.
3. Projeção do mês futuro = tendência_mês × S_mês. Nunca use média simples.

**Regra dura:** projeção sem ajuste sazonal em negócio com sazonalidade material (e-commerce,
turismo, agronegócio, educação) é **erro sistemático**, não descuido. Sinalize sempre a
sazonalidade dominante no comentário da projeção.

### Detecção de anomalia (z-score + isolation forest simplificado)

Uma **entrada ou saída anômala** no realizado pode ser: (a) fraude/erro de lançamento;
(b) evento não-recorrente legítimo (multa, ressarcimento, aporte). Nos dois casos, precisa
ser **detectada e rotulada** — jamais silenciosamente incorporada à tendência.

**Z-score (detecção univariada, primeira linha):**

```
z_t = (fluxo_t − média_janela) / desvio_padrão_janela
|z_t| > 3   → OUTLIER (evento raro, investigar)
|z_t| ∈ [2, 3] → SUSPEITA (revisar)
|z_t| < 2     → NORMAL
```

Janela recomendada: 12 meses móveis para série mensal; 13 semanas para série semanal.

**Isolation forest simplificado (detecção multivariada, quando há mais de um driver):**

Quando o outlier depende de **combinação** de variáveis (ex.: recebimento normal em valor **mas
antecipado em prazo**), z-score univariado não pega. Método simplificado (heurístico, não
implementação ML de produção):

1. Escolha 3-5 features do fluxo (valor, dia do mês, categoria, contraparte).
2. Para cada ponto, conte quantas **regras simples de partição binária aleatória** são
   necessárias para "isolá-lo" do resto.
3. Ponto isolado em poucas partições (< 8 níveis médios) → anomalia candidata.

Rótulo obrigatório: todo outlier detectado ganha **classificação** — `fraude/erro`,
`não-recorrente-legítimo`, `padrão-novo-a-monitorar`. Sem rótulo, a série contamina projeção.

### Alertas de liquidez (thresholds por conta)

Um único gatilho de "caixa mínimo agregado" é grosseiro. Trabalhe com **thresholds por conta**
(operacional, reserva estratégica, folha, impostos), porque cada uma tem um propósito e
misturar mascara o problema.

**Padrão de thresholds (ajuste ao contexto real):**

| Conta | Threshold VERMELHO | Threshold AMARELO | Ação |
|---|---|---|---|
| Caixa operacional | < 1× despesa mensal | < 2× despesa mensal | Escalar hoje ao Plutos |
| Reserva estratégica | < 3× despesa mensal | < 6× despesa mensal | Discutir captação/aportes |
| Conta de folha | < próxima folha + 20% | < próxima folha + 50% | Antecipar recebíveis |
| Conta de impostos | < próximo vencimento | < próximo vencimento + 1× | Rever calendário |
| Covenants (se houver) | dentro de 15% do gatilho | dentro de 30% do gatilho | Alertar credor + Plutos |

**Gatilhos derivados (não são só absolutos):**
- **Runway < 6 meses** → alerta VERMELHO (Plutos + Zeus).
- **Runway < 12 meses** → alerta AMARELO (planejar antes de precisar).
- **Net burn > 1.5× média 6M** → investigar mudança estrutural (não é ruído).
- **DSO > meta + 5 dias por 2 meses seguidos** → problema de cobrança, não flutuação.

Alerta sem **ação nomeada** e **dono nomeado** vira só relatório — regra do Pactolo: todo
alerta carrega o próximo passo e a pessoa/agente responsável.

### Anti-padrões

- **Projeção linear em negócio sazonal** ("cresceu X% ano passado, vai crescer X% de novo").
  Ignora o mês do estouro.
- **Alerta agregado sem thresholds por conta** — a média fica boa e a folha quebra.
- **Outlier tratado como tendência** — um recebimento grande de janeiro vira "novo patamar" na
  projeção; três meses depois, cai no chão.
- **Ajuste sazonal com < 24 meses de histórico** — o índice sazonal fica ruidoso demais.

---
*Semente-do-lote-2026-06-26 (refino pelo Ritual do Caos pendente). Princípios reescritos das fontes
`alirezarezvani/claude-skills@4a3c05b` (MIT) e `anthropics/knowledge-work-plugins@78d74d5` (Apache-2.0) —
sem cópia literal. Bloco de sazonalidade+anomalia+alertas adaptado de
github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B10/support — G10.*
