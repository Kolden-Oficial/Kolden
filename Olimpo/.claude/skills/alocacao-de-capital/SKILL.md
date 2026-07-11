---
name: alocacao-de-capital
description: Use quando o Plutos precisar decidir COMO distribuir o capital da Kolden entre buckets estratégicos — reinvestir no core, expandir (M&A, geo, produto), devolver ao dono, sanear dívida, construir reserva. Cobre a lógica CFO estratégico: hurdle rate por bucket, hierarquia de retorno esperado, gestão de tesouraria, disciplina de recompra/dividendo (quando aplicável), e comunicação da política ao board. NÃO use para orçamento operacional de mídia (isso é `alocacao_de_budget` já no Plutos) nem para análise de investimento pontual (isso é ROADMAP `npv-irr-e-analise-de-investimento`). Aqui é a política mestre do capital da empresa.
invocavel_por: plutos
tags: [alocacao-de-capital, cfo-estrategico, tesouraria, hurdle-rate, olimpo]
tipo: skill
area: Olimpo
up: "[[Olimpo/_MOC-olimpo]]"
---

# Alocação de Capital

Plutos como CFO estratégico decide a política de alocação de capital da Kolden — o filtro superior de todo cheque relevante, independente de bucket. Existe porque cheque grande sem política mestre vira decisão emocional; e cheque pequeno recorrente sem hurdle acumula em capital destruído.

## Herança histórica

- **Warren Buffett** (cartas Berkshire Hathaway, 1965+) — codificou capital allocation como o trabalho mais importante do CEO/CFO. As cinco alocações canônicas: (1) reinvestir no core, (2) adquirir outras empresas, (3) recomprar ações, (4) pagar dividendos, (5) reduzir dívida. Insight: o retorno de longo prazo do acionista é function direta de quão bem essas 5 alocações são feitas ao longo do tempo, não do lucro operacional.
- **William Thorndike** ("The Outsiders", 2012) — analisou 8 CEOs que superaram Jack Welch em retorno ao acionista; padrão comum era disciplina brutal de alocação de capital (não obsessão por operação). Insight: CEO/CFO passam tempo demais em operação e de menos em alocação.
- **Michael Mauboussin** (Credit Suisse/Morgan Stanley research, "Capital Allocation", 2016) — introduziu hurdle rate DIFERENCIADO por bucket como boa prática. Insight: usar mesmo cost of capital para reinvestir no core e para adquirir empresa não relacionada é preguiça analítica.
- **Aswath Damodaran** (NYU Stern, "Corporate Finance: Theory and Practice", 2001+) — codificou o cálculo do custo de capital (WACC), taxa hurdle e valor terminal em base didática global. Insight: hurdle rate não é palpite; deriva de risco quantificável.

## Os 5 buckets de alocação (adaptados à Kolden)

Para cada real que entra no caixa acima do necessário para operar, Plutos avalia 5 destinos alternativos:

| Bucket | Uso | Quando priorizar | Hurdle mínimo esperado |
|---|---|---|---|
| **1. Reinvestir no core** | Ampliar capacidade dos squads existentes; contratação; ferramenta interna | Retorno marginal > hurdle E core ainda escala | ROI > WACC + 5pp |
| **2. Expandir adjacente** | Novo squad; nova vertical/geo; produto conexo | Core saturado OU janela de mercado ao vivo | ROI > WACC + 8pp (risco maior) |
| **3. M&A / aquisição** | Comprar capacidade que não conseguimos construir rápido | Talento crítico ou dado inacessível pelo build | ROI > WACC + 10pp + tese PMI clara |
| **4. Fortalecer balanço** | Reduzir dívida cara; construir reserva | Runway curto OU juros altos OU macro instável | Custo evitado > custo de oportunidade |
| **5. Devolver ao dono** | Distribuição de lucro; recompra (quando houver acionistas externos) | Nenhum bucket acima bate hurdle E reserva já OK | Sinaliza disciplina; evita "empire building" |

Regra mestre (Buffett/Mauboussin): **o dinheiro vai para o bucket com maior retorno ajustado ao risco acima do hurdle**. Se nenhum bucket bate, devolve ou reserva. Segurar caixa esperando ideia é ok; segurar caixa por inércia é destruir valor via inflação e custo de oportunidade.

## Cálculo do hurdle rate (WACC simplificado)

Para Kolden pré-captação externa (só equity fundador + operacional):
- Hurdle base = custo de oportunidade de capital do fundador (taxa que o Ronan conseguiria em investimento comparável de risco).
- Ajuste + prêmio de risco por bucket (tabela acima).
- Piso absoluto = Selic + 6pp (Brasil 2026) — abaixo disso, dinheiro em CDB rende mais sem trabalho.

Para Kolden pós-captação (equity externo):
- WACC = We × Ke + Wd × Kd × (1−T), com Ke via CAPM (Rf + β × prêmio de mercado).
- Damodaran publica anualmente betas de setor tech/services — reusar (não inventar).

## Política de tesouraria

Reserva-alvo em caixa disponível: **6-12 meses de operação** (regra saudável para PME serviços de escala). Abaixo disso, prioridade absoluta é reconstruir reserva antes de qualquer expansão.

Reserva excedente vai para instrumentos de baixo risco e alta liquidez (CDB liq. diária, Tesouro Selic). NUNCA equity de terceiros com caixa operacional.

Se reserva > 18 meses e sem plano de investimento com hurdle-batido, é sinal de má alocação — subir ao Zeus e à mesa de decisão de capital.

## Anti-padrões (bandeira vermelha)

- **Empire-building** — aquisição feita para crescer topline sem sinergia real; destrói valor.
- **Diworsification** (Peter Lynch, 1989) — expansão adjacente perdendo foco do core lucrativo.
- **Reinvestir no core saturado** — colocar dinheiro num squad já com ROI marginal decrescente.
- **Nunca devolver** — segurar caixa por vaidade "empresa de bilhão" em vez de disciplina.
- **Hurdle único** — usar mesma taxa para core seguro e para vertical nova arriscada.
- **Alocação por vibe** — decisão de cheque grande sem passar pelo filtro dos 5 buckets.

## Cadência de decisão

- **Trimestral** — revisão da política com Zeus. Reserva-alvo bate? Bucket vencedor mudou?
- **Anual** — atualização do hurdle rate (macro muda, WACC muda).
- **Ad-hoc** — qualquer cheque > 5% do caixa disponível dispara análise nos 5 buckets antes da decisão.

## Cross-squads

- **Zeus** — política de alocação alinha com visão e horizontes 1/2/3.
- **Investor Relations** (skill nova irmã) — política publicada ao board em linguagem de retorno.
- **Poseidon** — reinvestimento no core operacional passa pelo COO para custo real vs ganho marginal.
- **Pactolo** — modelagem de retorno projetado por bucket, cenários e sensibilidade.

## Entregável

```yaml
plutos_alocacao_capital:
  periodo: "<T>"
  caixa_disponivel: <valor>
  reserva_alvo_meses: <6-12>
  reserva_atual_meses: <N>
  wacc_estimado: <%>
  buckets_avaliados:
    - {nome: reinvestir_core, retorno_esperado, hurdle, veredito}
    - {nome: expandir_adjacente, ...}
    - {nome: ma, ...}
    - {nome: fortalecer_balanco, ...}
    - {nome: devolver, ...}
  decisao: "<bucket vencedor + valor alocado>"
  justificativa: "<1 parágrafo>"
  proxima_revisao: "<data trimestral>"
```

## Guardrails

- Nenhum cheque > 5% do caixa sem passar pelos 5 buckets.
- Reserva < 6 meses trava toda expansão até reconstruir.
- Hurdle diferenciado por bucket é obrigatório.
- Se nenhum bucket bate hurdle, resposta padrão é reserva ou distribuição — não invente projeto.
- Toda decisão de alocação registrada no `MEMORY.md` do Plutos com retorno esperado; auditada em 12 meses (aprendemos com o que erramos).

---

*Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT) — ID G14 (parte) do bucket B15.*
