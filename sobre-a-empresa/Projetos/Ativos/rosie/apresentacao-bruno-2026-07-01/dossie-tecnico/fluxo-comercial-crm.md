# Fluxo Comercial + CRM — Rosie

> **v2 — 2026-07-01 — reescrito para Kommo (não GHL). Kommo já está no ar sem credencial Kolden.**
>
> Entrega do squad **Emporos** (Kolden) — Contrato `m-20260701-112935-rosie-90d`, frente
> Comercial/CRM. Voz: RevOps sênior BR. Toda decisão que depende da Catarina/Rosie está marcada
> `[PENDENTE — validar com Catarina]`; toda faixa numérica de mercado leva `[BENCHMARK]`; nada
> aqui é execução — é o plano que destrava a execução.

---

## 1. Diagnóstico do modelo atual

O modelo comercial da Rosie hoje é **founder-led sales + creator influence**: Catarina Tourinho
atende WhatsApp pessoalmente, veste a peça, responde dúvida de caimento e fecha a compra na
conversa. Isso é um ativo emocional forte — a cliente compra da fundadora, não de uma marca
anônima — e explica boa parte dos R$21k em 5 dias após a reabertura. É também o gargalo estrutural:
Catarina não escala em 24 horas por dia, e o time (Catarina + Gabriela Martins + Gabriela Fortes +
Catarina Leite) opera reativo, sem SLA, sem fila priorizada e sem visibilidade do que já foi
dito para cada cliente. Cada conversa recomeça do zero.

**Stack atual da Rosie**: **Nuvemshop** (loja / SoR do pedido), **Kommo** (CRM já implantado
e no ar, operado pelo time interno da Rosie), **RD Station** (SoR do contato + segmentação por
e-mail, ~5.5k contatos limpos), **WhatsApp Business** (canal dominante de atendimento
pós-compra e recuperação). O que **falta**: (a) integração comportamental
Nuvemshop → RD Station (eventos de e-commerce não viram tags de segmentação automáticas);
(b) higiene do pipeline Kommo (estágios claros, critério de avanço, cards perdidos com motivo);
(c) SLA formal de resposta; (d) cadência de abandono estruturada em playbook (hoje é ad-hoc);
(e) marcação de origem (UTM/tag) que permita atribuir venda a canal pago.

**Importante — escopo desta rodada**: a Kolden **não recebe credencial do Kommo nesta rodada**.
Rosie e time interno seguem operando o Kommo diretamente. O papel do Emporos é **estratégico e
de playbook** — desenhar o pipeline, o SLA, a cadência e as regras de higiene, e treinar o time
para aplicar. Integração automática Nuvemshop→Kommo fica em roadmap futuro (§10), condicionada
a autorização da Rosie para contrato adicional.

Sem UTM chegando à conversa comercial, Peitho e Pactolo medem ROAS de anúncio no cego —
enxergam o clique e a compra, mas não enxergam a jornada que passa por WhatsApp e demora 3 a
21 dias para fechar. Este dossiê aponta o mínimo viável para fechar esse loop **manualmente**,
sem depender de integração automática ao Kommo.

---

## 2. Arquitetura de dados (fluxo de integração)

```
┌────────────────────────────────────────────────────────────────────┐
│  NUVEMSHOP  (loja / SoR do pedido)                                 │
│  Eventos: view_item · add_to_cart · begin_checkout · purchase      │
│  Enriquecimento: UTM da sessão · valor do carrinho · SKU/categoria │
└──────────────────────────────┬─────────────────────────────────────┘
                               │  Webhook (Nuvemshop → RD Station)
                               │  Dado: e-mail + telefone + evento + UTMs + valor
                               ▼
┌────────────────────────────────────────────────────────────────────┐
│  RD STATION  (SoR do contato + segmentação por comportamento)      │
│  Tags automáticas: viu-produto-X · abandonou-carrinho · comprou-Y  │
│  Tag de origem: origem-paga:{utm_source} · campanha:{utm_campaign} │
│  Score de engajamento: aberturas + cliques + visitas               │
└──────────────────────────────┬─────────────────────────────────────┘
                               │  ⚠ SEM integração automática nesta rodada
                               │  Handoff manual pelo time Rosie:
                               │  quem entrou em cadência WhatsApp → nota no card Kommo
                               ▼
┌────────────────────────────────────────────────────────────────────┐
│  KOMMO  (CRM operado pelo time Rosie — funil visual)               │
│  Estágios: Descoberta · Consideração · Cliente ativo · Reativação  │
│  Cada card: contato + tags de origem + próximo passo + dono + SLA  │
│  Conversa WhatsApp registrada como nota (ou anexo) no card         │
└────────────────────────────────────────────────────────────────────┘

WHATSAPP  ── operado pela Catarina + time; playbook Emporos guia
             as mensagens de abandono, qualificação, SLA.
```

**Pontes ativas nesta rodada**:

- **Nuvemshop → RD Station**: webhook nativo (Nuvemshop tem app de integração com RD) ou
  Make/Zapier como fallback. Gatilho por evento; payload leva `email`, `phone`, `utm_*`,
  `cart_value`, `sku`. Sem `email` e `phone`, o evento cai em RD como visitante anônimo (só
  entra no funil após primeiro form/checkout).
- **RD Station → Kommo**: **manual nesta rodada**. Quando um lead pago entra na base RD com
  tag de origem (`origem-paga:{canal}`), o time Rosie cria o card no Kommo com essa nota. Não
  é elegante, mas é honesto: quem tem acesso ao Kommo é o time interno, e a integração
  automática exigiria credencial Kolden + MCP Kommo (roadmap futuro §10).
- **Kommo → RD (retorno)**: quando um card muda de estágio no Kommo, o operador aplica a tag
  correspondente no contato RD (`estagio-cliente-ativo`, `estagio-reativacao`), para que o RD
  segmente e-mails corretos. Também manual — ver §7 e roadmap.

**Regra de fonte de verdade**:
- **RD Station**: SoR do contato + score de engajamento por e-mail + tag de origem.
- **Kommo**: SoR da conversa comercial + estágio do funil + próximo passo por card.
- **Nuvemshop**: SoR do pedido + eventos comportamentais.

Se conflitar, RD ganha em atributo de contato, Kommo ganha em estado do funil, Nuvemshop ganha
em dado transacional.

`[PENDENTE — validar com Catarina]` Confirmação de que o time da Rosie autoriza a instalação
do webhook Nuvemshop → RD Station e o token de admin API do RD (isso não depende de
credencial Kommo).

---

## 3. Pipeline no Kommo (4 estágios propostos)

Modelado como funil visual do Kommo — cada estágio vira uma coluna, cada oportunidade vira um
card. O time Rosie move o card conforme o critério de avanço.

| Estágio | Definição | Gatilho de entrada | Próxima ação | Dono | SLA |
|---|---|---|---|---|---|
| **1. Descoberta** | Contato entrou no site (via ads, orgânico, indicação), não comprou, sem sinal forte de intenção. | `view_item` em 2+ sessões OU 1 preenchimento de form (pop-up de desconto, newsletter). | Sequência RD de nutrição (e-mail 1 = boas-vindas + estilo Rosie). Card no Kommo só se responder e-mail ou entrar em WhatsApp. | Automação RD (nutrição) + Gabriela (abertura de card no Kommo se houver resposta) | 24h (e-mail) |
| **2. Consideração** | Sinal forte de intenção: adicionou ao carrinho, abandonou checkout, ou abriu 3+ e-mails da série de nutrição. | `add_to_cart` sem `purchase` em 2h **OU** `begin_checkout` sem conclusão **OU** score RD ≥ 40. | Cadência WhatsApp de abandono (3 toques — §4) + tag `alta-intencao` no Kommo. Card obrigatório. | Playbook manual (Catarina/Gabriela) — cada toque = nota no card | 15min (§6) |
| **3. Cliente ativo** | Compra concluída nos últimos 90 dias. | `purchase` na Nuvemshop. | Fluxo pós-compra Caliope (5 e-mails via RD) + tag `cliente-ativo` no Kommo + cross-sell D+21 (§8). | Automação Caliope (e-mail) + Catarina no WhatsApp para dúvida de peça | 24h (SAC) |
| **4. Inativo / Reativação** | Cliente que comprou 1+ vez, sem nova compra há 90+ dias. | `purchase.data + 90d` sem novo `purchase`. | Cadência de winback via RD (E5 Todd Brown adaptado) + oferta segmentada por categoria de última compra. | Automação Caliope; card no Kommo se responder | 30d de campanha |

**Regras de higiene** (Emporos treina o time Rosie a aplicar no Kommo):

- Todo card em **Consideração** parado 7 dias sem resposta humana entra na tag `revisar`
  (Catarina/Gabriela varrem 1x por semana).
- Todo card em **Consideração** parado 14 dias vira `perdido` **com motivo** — usar campo
  customizado do Kommo: `nao-respondeu` / `preco` / `tamanho-indisponivel` / `desistiu` /
  `outro`. Sem motivo, não fecha (regra dura).
- Cliente ativo que responde negativamente a 2 fluxos seguidos entra em `pausar-comunicacao`
  (respeita opt-out — regra inegociável).
- Todo card carrega **próximo passo + dono + data prevista**. Card sem próximo passo é card
  esquecido — vira alarme na revisão semanal.

`[PENDENTE — validar com Catarina]` Estrutura atual do funil no Kommo: quantos estágios já
existem, se a nomenclatura bate, se há campos customizados. Ajustar o mapeamento acima ao que
já está no ar (não recriar por vaidade).

---

## 4. Cadência WhatsApp de abandono (3 toques)

**Como é executada**: playbook manual pelo time Rosie. Catarina/Gabriela veem o alerta de
carrinho abandonado (via Nuvemshop ou RD), disparam a mensagem pelo WhatsApp Business, e
registram como **nota no card do Kommo**. Não é automação nesta rodada — é rotina disciplinada.

Tom: Catarina, primeira pessoa, íntimo mas não invasivo. Sem "prezada cliente", sem "aproveite
essa oportunidade única". Assume que a pessoa conhece a marca (viu no Instagram ou clicou em
anúncio).

**Toque 1 — D+0, 2h após `add_to_cart` sem `purchase`**
- Gatilho: alerta de carrinho abandonado (evento Nuvemshop, entra na fila da Gabriela).
- Canal: WhatsApp.
- Texto (172 chars): *"Oi {primeiro_nome}, é a Catarina da Rosie 🌹 Vi que você deu uma olhada em {peca} — separei antes de sumir do estoque. Quer que eu te mande foto do caimento?"*
- CTA: resposta natural (foto/áudio).
- Registro: nota no card Kommo — "toque 1 enviado {timestamp}".

**Toque 2 — D+1, 24h após o Toque 1 sem resposta**
- Gatilho: sem `purchase` e sem resposta no WhatsApp em 22h — varredura manual pela manhã.
- Canal: WhatsApp.
- Texto (168 chars): *"{primeiro_nome}, dei mais uma olhada no seu carrinho. Se for tamanho, a gente tem uma tabela que evita a troca. Manda a sua altura + medida da cintura que te oriento."*
- CTA: dúvida de tamanho (fricção real do e-commerce de moda).
- Registro: nota no card Kommo.

**Toque 3 — D+3, 72h após o Toque 1 sem resposta**
- Gatilho: sem `purchase`, sem resposta.
- Canal: WhatsApp.
- Texto (178 chars): *"Última mensagem prometido 🙈 Se ainda pensa na {peca}, tenho 1 cortesia: frete grátis até {data+2}. É só me dizer 'quero' que finalizo por aqui. Se não for a hora, tudo bem também."*
- CTA: opt-out honesto embutido. Se não responder, card fecha como `perdido: nao-respondeu` e sai da cadência de abandono — volta para nutrição RD.

**Regra de saída**: qualquer resposta humana da cliente pausa a cadência e transfere para o
atendente (que atualiza o card no Kommo — muda estágio ou marca próximo passo). Compra
concluída fecha o card como `ganho` em qualquer toque.

`[PENDENTE — validar com Catarina]` Aprovação da voz e do uso do primeiro nome + emoji (alguns
clientes pedem tom mais formal); confirmação de quem no time é responsável por rodar a fila
diária de abandonos.

---

## 5. Script de qualificação WhatsApp (2-3 perguntas)

Quando o atendente pega o WhatsApp de um contato desconhecido, precisa identificar em 30
segundos se é **frio** (viu anúncio), **morno** (já engajou por e-mail) ou **quente** (cliente
reincidente). Não é formulário — são perguntas naturais dentro da conversa.

**Pergunta 1 — origem (frio vs. resto)**
> *"Oi! Que bom te ver aqui 🌹 Você chegou até a Rosie por onde — indicação, Instagram ou um anúncio?"*

Isso dá origem sem soar como pesquisa. Se responder "anúncio", já sabemos que o RD tem UTM
gravado — o atendente cruza pelo telefone/e-mail e vê a jornada.

**Pergunta 2 — momento (morno vs. quente)**
> *"É a primeira vez que fala com a gente ou você já é da casa?"*

"Já é da casa" → checa histórico no Kommo (cards anteriores) e Nuvemshop (pedidos passados) e
adapta a conversa (não repete tabela de tamanho para quem já comprou 3 vezes). "Primeira vez"
→ segue script de descoberta.

**Pergunta 3 — intenção (opcional, só se ainda estiver ambíguo)**
> *"Está procurando algo pra uma ocasião específica ou é aquele passeio pelas novidades?"*

Ocasião específica = alta intenção → priorizar. Passeio = nutrir e não pressionar.

**Uso do resultado no Kommo**: atendente marca 3 tags manualmente no card após a conversa —
`origem:{anuncio|indicacao|instagram|indefinido}`, `momento:{primeira|reincidente}`,
`intencao:{alta|media|baixa}`. Isso alimenta segmentação e permite Pactolo/Peitho medirem
canal pago no fim do trimestre (via export do Kommo cruzado com RD).

---

## 6. SLA de atendimento

| Canal / evento | Tempo máximo | Horário | Responsável |
|---|---|---|---|
| Primeira resposta WhatsApp (comercial) | **15 minutos** | Comercial (9h–20h) | Atendente do turno |
| Primeira resposta WhatsApp (fora do comercial) | **12 horas** | Fora do comercial | Atendente do turno seguinte |
| Resposta subsequente na mesma conversa | **30 minutos** | Enquanto conversa está aberta | Atendente que iniciou |
| E-mail transacional (confirmação, envio) | **5 minutos** | 24/7 | Automação RD / Nuvemshop |
| E-mail de nutrição / campanha | Conforme calendário Caliope | Agendado | Automação Caliope (via RD) |
| Cadência de reativação (winback) | **7 dias** entre toques | Automatizado | Automação Caliope (via RD, E5 Todd Brown) |
| SAC pós-compra (troca, dúvida de entrega) | **2 horas** em comercial / **24h** fora | Comercial | Gabriela / Catarina Leite |

Fora do comercial, mensagem automática do WhatsApp Business informa horário e dá opção de
e-mail para casos urgentes. Respeitar opt-out é regra dura — cliente que pediu para não
receber sai imediatamente da cadência, mesmo transacional (menos confirmação de compra).

**Como o SLA vive no Kommo**: cada card tem campo "próximo passo + data". Card vencido (data
passou sem ação) fica em destaque na coluna. Revisão diária de 5 minutos pela responsável do
turno vira ritual — é isso que transforma SLA em fato, não em decoração.

`[PENDENTE — validar com Catarina]` Confirmação da janela comercial (assumido 9h–20h com base
em prática do setor moda; validar com o time) e quem faz a revisão diária de fila do Kommo.

---

## 7. Handoff marketing → comercial (atribuição de canal pago)

**Problema**: quando um lead que clicou em anúncio Meta/Google entra no WhatsApp em vez de
checkout direto, a atribuição no Ads Manager fica cega — o pixel só vê `add_to_cart`, não vê
`purchase` que aconteceu por conversa. Peitho perde ROAS e Pactolo perde LTV por canal.

**Regra desta rodada — handoff manual**:

1. **UTM na primeira sessão**: capturada pela Nuvemshop e enviada para o RD Station via
   webhook. Contato no RD ganha tag automática `origem-paga:{utm_source}` +
   `campanha:{utm_campaign}` + `conteudo:{utm_content}`.
2. **Nota no card do Kommo**: quando esse contato entra em WhatsApp e o atendente cria/abre o
   card, ele consulta o RD pelo telefone/e-mail, vê as tags de origem, e registra no card:
   > "Veio de mídia paga — {utm_source} / {utm_campaign}"
   
   Usar campo customizado `origem_paga` no Kommo (dropdown: meta / google / tiktok /
   indefinido) para permitir filtro depois.
3. **Fechamento do card em `ganho`**: atendente marca também `valor_venda` (do pedido
   Nuvemshop) e mantém a tag de origem. No fim do mês, Pactolo puxa relatório do Kommo
   filtrando por `origem_paga` + `estagio=ganho` e cruza com investimento de mídia — isso dá
   ROAS honesto por canal, mesmo com atribuição off-pixel.
4. **Conversão offline para as plataformas** (fase 2, quando roadmap permitir): upload de
   conversão offline via GCLID no Google Ads e via Conversions API no Meta, alimentado por
   export semanal do Kommo. Peitho recebe a spec. Isso fecha o loop para o algoritmo aprender
   qual criativo gerou venda R$X 7 dias depois do clique.

**Sem essa disciplina, atribuição fica cega e Pactolo modela ROAS no chute.** É requisito
bloqueante para os cenários financeiros do slide 10 fazerem sentido em M2/M3. A parte manual é
custosa mas viável enquanto Kommo não estiver integrado — o custo é ~2min por card, aceitável
no volume atual.

---

## 8. Cross-sell e upsell

Amarrados ao **Fluxo 4 pós-compra** do plano de e-mail do Caliope (ver `fluxos-email.md`).

### Mecânica 1 — Recomendação D+21 por categoria
Cliente que comprou vestido de festa recebe D+21 e-mail com 3 peças complementares (bolsa,
sapato, brinco) da mesma categoria estilística. Cliente que comprou básico recebe D+21
recomendação de peça-conceito para "elevar o look". Regra: recomendação só de categoria
adjacente, nunca da mesma categoria comprada (respeita a compra, não parece que a marca
ignorou o que ela levou).

Gatilho: `purchase.data + 21 dias` sem novo `purchase` no meio. E-mail sai da automação
Caliope no RD Station, copy assinada pela Catarina, uma peça por bloco visual, link direto para
o produto. Se cliente responder no e-mail ou no WhatsApp, abre card no Kommo em `Consideração`.

### Mecânica 2 — "Kit look" (upsell no checkout Nuvemshop)
Nuvemshop tem **frete grátis a partir de R$400** (alavanca natural do e-commerce de moda).
Quando o carrinho está entre R$280 e R$399, o pop-up de checkout sugere: *"Faltam R$X pra
ganhar frete grátis — que tal completar o look?"* + 3 peças complementares selecionadas por
categoria do carrinho atual.

Isso aumenta AOV sem cupom, sem margem cortada. O upsell é honesto: a cliente já queria a
primeira peça, o frete grátis é a moeda de troca. Meta esperada `[BENCHMARK]`: +15 a +25% de
AOV nas transações que entraram na faixa de gatilho (típico do setor moda quando o frete
grátis está entre 5-15% acima do AOV médio).

`[PENDENTE — validar com Catarina]` Confirmação do AOV atual da Rosie (F0.1 do contrato) — só
com AOV real dá para calibrar a faixa de gatilho.

---

## 9. Métricas de sucesso (5 KPIs no Kommo)

Trackados no funil visual do Kommo + dashboard nativo, revisados semanalmente com Bruno. Todas
mensuráveis com o que o Kommo já entrega hoje (contagem por estágio, tempo em estágio, tags,
filtros por origem).

| KPI | Fórmula (fonte) | Meta 90d | Benchmark setor |
|---|---|---|---|
| **Taxa de recuperação de carrinho** | `cards_ganhos_com_tag_abandono / total_cards_abandono` (Kommo) | ≥ 15% | 10-20% `[BENCHMARK]` moda BR |
| **LTV médio (R$/cliente 12m)** | `receita_12m / clientes_unicos_12m` (Nuvemshop + Kommo) | Baseline em D+30, +20% em D+90 | R$450-900 `[BENCHMARK]` moda premium BR |
| **Tempo médio de resposta WhatsApp** | Média do 1º toque em horário comercial (nota no card + timestamp) | ≤ 15min | 30-60min `[BENCHMARK]` e-commerce médio |
| **Taxa de reativação (winback)** | `clientes_inativos_que_recompraram / clientes_inativos_alvo` (RD → Nuvemshop) | ≥ 8% | 5-12% `[BENCHMARK]` winback e-mail moda |
| **% clientes recorrentes 90d** | `clientes_com_2+_compras_em_90d / clientes_totais_90d` (Nuvemshop) | ≥ 25% | 20-35% `[BENCHMARK]` moda com marca forte |

Todos os benchmarks são **de mercado** — a linha da Rosie será estabelecida em D+30 e virará
meta progressiva em D+60 e D+90. Como Kolden não opera Kommo diretamente, a coleta destes
números depende do time Rosie exportar/compartilhar os relatórios (ou o Kommo integrar com
Google Sheets / dashboard nativo — combinar no D+30).

---

## 10. Roadmap de implementação

| Marco | Entregável | Dependência |
|---|---|---|
| **D+3** | Mapeamento do processo atual da Rosie no Kommo: quais estágios existem, quantos cards vivos, quem opera cada coluna. Sessão de 60min com Catarina + time. | Acesso à visão do funil (screenshare da Rosie, sem credencial Kolden) |
| **D+7** | **Higiene de pipeline**: revisar estágios do Kommo contra os 4 propostos (§3), limpar cards parados, aplicar campo `motivo_perda` obrigatório, ativar campo `origem_paga`. Time Rosie executa as mudanças (Kolden guia por chamada). | Sessão do D+3 concluída |
| **D+10** | **Setup de cadência WhatsApp** — playbook impresso + treinamento do time (não automação). Templates de mensagem aprovados pela Catarina, rotina de fila diária definida, regra de nota no card estabelecida. | Voz aprovada (`[PENDENTE — validar com Catarina]`) |
| **D+15** | Pipeline de 4 estágios ativo no Kommo (versão adaptada ao que já existia); SLA formal comunicado ao time; tags de origem UTM operando via RD → nota manual no Kommo | Time (Catarina + 3) treinado na nova rotina |
| **D+30** | Dashboard de métricas: 5 KPIs do §9 mensurados com dado real; baseline estabelecida; primeira revisão de pipeline com Bruno. Dashboard pode ser export Kommo + planilha Google, se dashboard nativo não bater. | 30 dias de dado real acumulado |
| **D+60** | Ajuste de cadência com base em taxa de resposta observada; A/B nos toques 1 e 3 (variar copy, medir resposta) | Volume mínimo de 200 abandonos processados |
| **D+90** | Revisão completa do fluxo; decisão sobre expansão da cadência para pós-compra (NPS) e para reativação segmentada; **decisão sobre roadmap futuro de integração automática** | Metas M1-M2-M3 avaliadas |

**Ordem de bloqueio**: D+3 (mapeamento) → D+7 (higiene) → D+10 (playbook) → D+15 (rotina).
Pular etapa compromete o resto — sem higiene do funil no D+7, o dashboard do D+30 é lixo.

### Nota sobre integração automática (roadmap futuro, fora desta rodada)

Integração automática **Nuvemshop → Kommo** (webhook direto abrindo/movendo cards) e
**Kommo ↔ RD Station** (sync bidirecional de tags e estágios) **não entram nesta rodada**.
Entram em roadmap futuro **se e somente se**:

1. Rosie autorizar contrato adicional (não coberto pelo escopo atual do contrato de
   assessoria).
2. Kolden receber credencial de admin do Kommo com autorização escrita.
3. Passar pelo Caos para construção do **MCP Kommo** (o MCP não existe hoje no ecossistema
   Kolden) — estimativa preliminar `[BENCHMARK]` de 2-3 semanas de construção + validação.

Enquanto isso, o modelo desta rodada é **playbook + rotina manual disciplinada**. Funciona no
volume atual da Rosie e é o pré-requisito para justificar a integração depois — só faz sentido
automatizar processo que já está rodando bem manualmente.

---

## Handoffs deste artefato

- → **Peitho** (`spec-rastreamento.md`): confirmar que UTMs viajam no payload do webhook
  Nuvemshop → RD Station e que Conversions API está preparada para receber conversão offline
  (fase 2 do §7). Peitho não recebe dado direto do Kommo nesta rodada — recebe do RD via tag.
- → **Caliope** (`fluxos-email.md`): amarração dos fluxos 4 (pós-compra) e 5 (reativação) com
  os estágios 3 e 4 do funil Kommo (§3) e com o cross-sell D+21 (§8). Fluxos rodam no RD
  Station.
- → **Pactolo** (`cenarios-funil-reverso.md`): KPIs do §9 (LTV, recorrência) alimentam o
  modelo de cenários; AOV do §8 é F0.1 bloqueante. Fonte dos números: Nuvemshop + export
  Kommo (semanal), não integração direta.
- → **Cairos** (`cronograma-90d.md`): marcos D+3, D+7, D+10, D+15, D+30 do §10 entram no WBS
  do cronograma integrado.
- → **Afrodite (Olimpo)**: qualquer promessa de SLA ou faixa de recuperação vira compromisso
  comercial — precisa estar dentro da política antes do deck ir ao Bruno.
- → **Orfeu (deck v2)**: bloco 6 (Comercial/CRM) precisa traduzir esta lógica para linguagem
  simples de negócio no slide 8 do deck — sem prometer integração Kolden ao Kommo nesta
  rodada. Kommo aparece como stack ATUAL da Rosie.
- → **Caos** (futuro, condicionado): se Rosie autorizar integração automática, briefing para
  construção do MCP Kommo entra pelo Caos com Contrato de Missão dedicado.

---

**PRÓXIMO PASSO**: Apolo consolida com os outros 4 artefatos do dossiê técnico e Orfeu narra
no deck (blocos 6 — Comercial/CRM — e 9 — Cronograma), respeitando a fronteira: Kommo é da
Rosie, Kolden entra com playbook e estratégia nesta rodada.
**DONO**: apolo (consolidação) + cairos (D+16).
**DATA**: D+16 (Onda 3 do contrato).
