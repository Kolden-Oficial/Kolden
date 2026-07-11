---
name: investor-relations
description: Use quando o Plutos precisar estruturar ou executar a comunicação financeira com o board, investidores atuais ou potenciais — atualização mensal, deck de rodada, resposta a due-diligence, guidance trimestral, gestão de expectativa em mês fraco, ou apresentação em reunião de conselho. Define ritmo, formato, métricas obrigatórias e o tom "sem surpresa" que sustenta credibilidade financeira. NÃO use para pitch de vendas a cliente (isso é Afrodite/Emporos) nem para comunicação executiva geral (isso é Zeus `comunicacao-executiva`). Aqui é a interface Plutos ↔ capital externo/board.
invocavel_por: plutos
tags: [ir, investor-relations, board, captacao, guidance, olimpo]
tipo: skill
area: Olimpo
up: "[[Olimpo/_MOC-olimpo]]"
---

# Investor Relations (IR)

Plutos exerce IR como CFO — mantendo a confiança de quem colocou (ou pode colocar) dinheiro na Kolden. Existe porque **credibilidade financeira é ativo composto**: perde-se rápido, reconstrói-se devagar. Uma surpresa negativa mal comunicada custa mais que 3 trimestres de bons números.

## Herança histórica

- **Andy Grove** ("High Output Management", 1983) — cunhou "no surprises" como princípio de gestão de board. Insight: board odeia ser pego de surpresa mais do que odeia más notícias.
- **Bill Campbell** (Trillion Dollar Coach, coach do Vale) — codificou o padrão de update mensal por escrito ao investidor: wins / desafios / pedidos. Insight: escrever força clareza; o exercício mensal é para o CEO/CFO, não para o investidor.
- **Warren Buffett** (cartas anuais Berkshire, 1965+) — padrão-ouro de comunicação com acionista: candor, admissão pública de erros, linguagem simples, foco em intrinsic value acima de earnings do trimestre. Insight: honestidade é vantagem competitiva de longo prazo em IR.
- **Investor Relations Society (IR Society UK)** e **NIRI (National Investor Relations Institute EUA)** — codificaram a disciplina moderna de IR (cadência, guidance, fair disclosure). Guidance = dar ao mercado uma expectativa razoável do futuro sem violar assimetria de informação.

## Público-alvo por estágio da Kolden

| Estágio | Público principal | Cadência | Formato |
|---|---|---|---|
| **Pré-captação** | Fundador (Ronan) + advisors | Mensal informal | Escrito curto + reunião trimestral |
| **Seed** | Anjos + Ronan | Mensal escrita + trimestral reunião | Update de 1-2 páginas + deck trimestral |
| **Série A+** | Board formal + investidores | Mensal escrita + board trimestral | Update + board pack + guidance |
| **Board formal** | Membros do conselho | Reunião trimestral com pré-leitura | Deck + pack de 20-40 páginas + KPIs |

## Update mensal ao investidor — padrão

Estrutura fixa (força disciplina):

1. **Wins** (3-5 bullets) — o que aconteceu de material. Cliente fechado, produto lançado, contratação sênior, milestone técnico.
2. **Desafios** (3-5 bullets) — o que está travando ou preocupando. Nomear sem esconder. Se não tem desafio, o update é ruim.
3. **KPIs do mês** — MRR/ARR, taxa de crescimento, burn, runway em meses, headcount, top-3 métricas específicas do modelo (ex: unit economics).
4. **Pedidos** (1-3 bullets) — o que o investidor pode ajudar: intro para X, feedback em decisão Y, contratação sênior. Sem pedido, o investidor esquece que existe até a rodada.
5. **Próximos 30 dias** — 3-5 marcos que a empresa se compromete a entregar.

Volume: 1-2 páginas. Sem foto, sem enfeite. Buffett-simple.

## Board pack — padrão trimestral

Enviado 3-5 dias antes da reunião (regra: **pré-leitura obrigatória — reunião não é para ler slides**):

- **Slide de abertura**: 1 gráfico dominante + 3 headlines do trimestre + 1 pedido de decisão.
- **Executive summary (1 pág)**: SCQA (usar skill compartilhada `sumario-executivo-scqa`) contando o trimestre.
- **KPIs vs plano**: real vs orçado vs guidance passado. Variância explicada.
- **Financeiro**: DRE trimestral, DFC, evolução de caixa e runway. Cross com Pactolo para reconciliação.
- **Deep-dives** (2-3): o que o board precisa mesmo discutir. Cada um com decisão pedida.
- **Riscos** (top 5): risco, probabilidade, impacto, mitigação em curso.
- **Anexos**: cohort, retenção, pipeline, benchmarks setor.

Regra de ouro do board pack (Andy Grove): **venha com decisões e justificativas, não com perguntas em aberto**. Pergunta em aberto ao board = CFO delegou ao board o próprio trabalho.

## Guidance — regras

- **Seed/Série A**: guidance TRIMESTRAL de 3-5 KPIs. Nunca guidance anual (chuta demais).
- **Faixa, não ponto**: dizer "MRR entre R$X e R$Y" comunica incerteza honesta.
- **Explicar toda mudança**: se guidance cai, dizer por quê ANTES do fato. Se cai sem aviso, credibilidade quebra.
- **Nunca prometer o que não controla**: fechamento de deal grande depende do cliente; guidance de receita conservador desconta o não-controlado.

## Gestão de expectativa em mês fraco

Se o mês virou fraco (ex: churn acima do esperado, deal grande caiu):

1. **Comunicar em D+3 do fato**, não em D+30 no update mensal.
2. **Nomear a causa sem terceirizar** — "cliente X saiu porque nossa entrega Y ficou aquém" bate "cliente X saiu por motivos deles".
3. **Trazer plano de resposta já esboçado** — sem plano, é choro.
4. **Recalibrar guidance**, se material.
5. **Pedir o que se precisa** — silêncio depois de má notícia é o pior sinal.

## Anti-padrões

- **Update apenas de vitórias** — board perde confiança; sabe que empresa é caos.
- **Guidance chutado para agradar** — a próxima quebra vale por três meses de dor.
- **Reunião de board para ler slide** — desperdício do bem mais escasso (tempo do board).
- **Silêncio em mês ruim** — pior do que a má notícia.
- **Comunicar só via reunião** — quem não escreve não pensa; quem só reunia não deixa rastro.
- **Ir de spray-and-pray** — mandar mesmo update a investidor grande e a pequeno; segmentar quando faz diferença.

## Cross-squads

- **Zeus** — visão + narrative de longo prazo; Plutos aterra em número.
- **Pactolo** — reconciliação de todo número que sai; nenhum KPI sem rastreabilidade.
- **Peitho** (marketing) — se guidance externa vazar, alinhar posicionamento público.
- **Themis** (LGPD/compliance) — dado sensível de cliente NUNCA em update sem anonimização.

## Entregável

```yaml
plutos_ir:
  publico:
    tipo: "<board | anjos | investidor_serie_a | founder_advisor>"
    membros: [...]
  cadencia:
    escrita_mensal: <sim | não>
    reuniao_periodica: "<mensal | trimestral | semestral>"
  update_mensal:
    wins: [...]
    desafios: [...]
    kpis: {...}
    pedidos: [...]
    proximos_30_dias: [...]
  board_pack:
    caminho: "<link>"
    decisoes_pedidas: [...]
    riscos_top5: [...]
  guidance_ativo:
    kpi: [...]
    faixa: [...]
    horizonte: "<T+1 trimestre>"
    ultima_calibragem: "<data>"
```

## Guardrails

- Update mensal escrito é obrigatório a partir da 1ª rodada com anjo.
- Nunca soltar guidance sem faixa e sem prazo.
- Nunca comunicar mês ruim tarde — princípio "no surprises" de Grove.
- Cross com Pactolo em todo número financeiro; sem reconciliação, não sai.
- Todo pedido no update tem próximo passo claro para o investidor.
- Dado sensível de cliente sempre anonimizado (LGPD/Themis).

---

*Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT) — ID G14 (parte) do bucket B15.*
