---
name: operacoes-lean-six-sigma
description: Use quando o Poseidon precisar diagnosticar ou resolver um problema operacional pela lente Lean (eliminar desperdício) + Six Sigma (reduzir variação) — gargalos crônicos, retrabalho repetido, defeito recorrente em entrega, tempo de ciclo inflado, ou pedido de padronização de processo que ninguém sabe descrever. Cobre process-mapping (VSM), 5 whys, diagrama de Ishikawa, ciclo DMAIC e o vocabulário de sete desperdícios (TIMWOOD/muda). NÃO use para redesenho de organização (isso é `organizational_design` já no Poseidon) nem para automação de tarefa individual (isso é Dedalo). Aqui é o método sistemático de melhoria contínua do processo de negócio.
invocavel_por: poseidon
tags: [lean, six-sigma, dmaic, vsm, process-mapping, olimpo]
---

# Operações Lean + Six Sigma

Poseidon aplica quando o problema é operacional-crônico: processo que "sempre deu problema", entrega que varia de qualidade sem causa evidente, ou padronização que precisa nascer com base em dado. Existe porque Lean e Six Sigma são complementares — Lean remove desperdício (velocidade), Six Sigma remove variação (qualidade); juntos formam o padrão global de excelência operacional.

## Herança histórica

- **Taiichi Ohno** (Toyota, "Toyota Production System", 1978) — arquitetou o Sistema Toyota de Produção; codificou os **sete desperdícios (muda)** e o conceito de **jidoka** (autonomação — parar a linha ao primeiro defeito). Insight: velocidade sem qualidade é retrabalho disfarçado.
- **W. Edwards Deming** ("Out of the Crisis", 1986) — trouxe controle estatístico de processo (SPC) e o **ciclo PDCA** (Plan-Do-Check-Act) para o Japão pós-guerra; codificou os 14 pontos. Insight: 94% dos problemas de qualidade são do sistema, não do operador.
- **Bill Smith** (Motorola, 1986) — cunhou Six Sigma como meta de qualidade (3,4 defeitos por milhão de oportunidades) e o ciclo **DMAIC** (Define-Measure-Analyze-Improve-Control) como método operacional.
- **Jack Welch** (GE, 1995+) — escalou Six Sigma para toda a organização com estrutura de belts (Green/Black/Master Black). Insight: melhoria contínua exige carreira e ritual, não boa vontade.
- **James Womack & Daniel Jones** ("Lean Thinking", 1996) — codificaram os 5 princípios Lean e o **Value Stream Mapping (VSM)** como ferramenta primária de diagnóstico.
- **Kaoru Ishikawa** ("Guide to Quality Control", 1968) — introduziu o **diagrama de causa-e-efeito** (espinha de peixe / 6M) e o **5 whys** como métodos de análise de causa-raiz.

## Os sete desperdícios (TIMWOOD)

Vocabulário obrigatório para o diagnóstico:

| Desperdício | Sinal na Kolden (tech-services) |
|---|---|
| **T**ransporte | Handoff excessivo entre squads; briefing viaja por 4 mãos antes de virar entrega |
| **I**nventário | Fila de tickets/tarefas parada esperando revisão |
| **M**ovimento | Executor troca de contexto/ferramenta demais |
| **W**ait (espera) | Entrega parada esperando aprovação humana; SLA quebrado por espera |
| **O**verproduction | Entregar mais do que o cliente pediu (esperando "surpreender") |
| **O**verprocessing | Refinar entrega além do necessário; polir sem gatilho |
| **D**efects | Retrabalho por erro em entrega anterior |

Regra: nomear qual dos 7 desperdícios está em jogo é obrigatório antes de propor solução. "Está lento" não é diagnóstico — é sintoma.

## Value Stream Mapping (VSM)

Antes de "otimizar", desenhe o fluxo REAL (não o SOP idealizado):

1. Escolha um processo end-to-end (ex: "briefing de cliente → entrega aprovada").
2. Vá ao **gemba** (local real onde o trabalho acontece — chat, ticket, doc): observe uma execução ao vivo, não a documentação.
3. Desenhe cada etapa com 4 métricas:
   - **Tempo de ciclo** (quanto leva quando executa)
   - **Tempo de espera** (fila antes da etapa começar)
   - **Taxa de erro** (retrabalho gerado)
   - **% do valor agregado** (etapa contribui ao que o cliente paga?)
4. Calcule **lead time total** (soma tempo de ciclo + tempo de espera) e **% de valor agregado** (tempo agregando valor / lead time total).

Regra empírica: em processo não otimizado, %VA fica entre 5-15%. O restante é muda. Alvo saudável: > 30%.

## Ciclo DMAIC (Six Sigma)

Método padrão para problema com dado disponível:

**D — Define**
- Problema em 1 frase: "Em X% dos casos, [saída] fica fora de [especificação]".
- Escopo, cliente do processo, KPI de sucesso, dono nomeado.
- Sem definição escrita, não avança.

**M — Measure**
- Baseline mensurada. Sem baseline, "melhoria" é anedota.
- Sistema de medição validado (a régua está calibrada?).
- Capacidade atual do processo (Cp/Cpk se aplicável).

**A — Analyze**
- **5 Whys** para causa-raiz. Cada "por quê" deve ser respondido com dado, não opinião. Regra: parar quando chega em causa acionável, não em "porque as pessoas erram".
- **Ishikawa (6M)**: Mão-de-obra, Máquina, Método, Material, Medição, Meio-ambiente. Preenchido em grupo, não solo — captura viés cruzado.
- **Análise de Pareto** dos defeitos: 80% dos problemas vêm de 20% das causas. Foque nas vitais poucas.

**I — Improve**
- Hipótese de intervenção com efeito esperado numerado.
- Piloto controlado antes de rollout (mudança grande sem piloto é aposta).
- Reduzir variação primeiro; depois otimizar média (Deming).

**C — Control**
- SOP atualizado, treinamento, mudança de default.
- Dashboard operacional com limites de controle superior/inferior (SPC).
- Alerta automático se KPI sair da faixa. Sem controle, o processo volta ao estado anterior em 90 dias.

## 5 Whys — regras

- Cada "por quê" pede dado ou observação, não palpite.
- Máximo 5 níveis; se não chega em causa acionável até o quinto, o escopo do problema está grande demais — subdivida.
- Nunca terminar em "as pessoas erraram" — isso é Deming 14 (94% dos problemas são do sistema). Volte um nível.

## Escolha do método por tipo de problema

| Sintoma | Método principal |
|---|---|
| "Está lento, não sei por quê" | VSM |
| "Erra às vezes, causa desconhecida" | Ishikawa + 5 Whys |
| "Retrabalho recorrente com dado disponível" | DMAIC completo |
| "Cliente reclamou uma vez" | 5 Whys curto (não vira projeto Six Sigma) |
| "Padrão de qualidade desigual entre entregas" | SPC + controle de variação |

## Aplicação Kolden (tech-services)

- **Squad como fábrica**: cada squad tem processo-chave que roda repetidamente (briefing → entrega). Ideal para VSM anual.
- **Gargalo típico Kolden**: espera humana por aprovação (Ronan, cliente). VSM revela; solução é reduzir número de aprovações, não acelerar cada uma.
- **Variação típica Kolden**: entrega de squad depende de qualidade do briefing. Padronizar briefing (SOP) reduz variação a jusante — Deming aplicado.
- **Cross com Hestia**: se 5 whys chega em "pessoa não treinada", é handoff RH.
- **Cross com Dedalo**: se 5 whys chega em "ferramenta não existe", é MCP a construir.
- **Cross com Prometeu**: se problema é em produto vs processo, subir ao produto.

## Anti-padrões

- **Automatizar processo ruim** — dá defeito mais rápido. Poseidon core-principle: "simplifique antes de automatizar".
- **DMAIC para tudo** — problema simples não precisa de projeto Six Sigma. Ferramenta grande para problema pequeno é overprocessing (muda).
- **Otimizar sem VSM** — otimizar etapa não-gargalo é desperdício de esforço (Teoria das Restrições — Goldratt).
- **Piloto sem baseline** — não sabe se melhorou porque não sabia o que era antes.
- **Sem fase Control** — o processo volta ao estado anterior; a melhoria é temporária.

## Entregável

```yaml
poseidon_lean_six_sigma:
  problema: "<1 frase>"
  metodo_escolhido: "<VSM | DMAIC | 5-whys | Ishikawa | SPC>"
  vsm:
    processo: "<end-to-end>"
    lead_time_atual: <>
    percent_valor_agregado: <%>
    muda_dominante: "<TIMWOOD identificado>"
  dmaic:
    define: "<problema + KPI + dono>"
    measure: "<baseline + capacidade>"
    analyze: "<causa-raiz via 5 whys/Ishikawa/Pareto>"
    improve: "<intervenção + efeito esperado>"
    control: "<SOP + dashboard + alerta>"
  metrica_alvo:
    baseline: <>
    meta: <>
    prazo: <>
  handoffs:
    hestia: "<se causa é treinamento>"
    dedalo: "<se causa é ferramenta>"
    prometeu: "<se causa é produto>"
```

## Guardrails

- Nomear qual dos 7 desperdícios/qual fator Ishikawa antes de propor solução.
- Baseline medida ANTES de qualquer melhoria (Measure obrigatório).
- 5 whys não pode terminar em "erro humano" — volta um nível.
- Sem fase Control, projeto Six Sigma não fecha.
- Simplificar antes de automatizar — regra Poseidon.
- Piloto controlado antes de rollout amplo.
- Cross com squads adjacentes quando causa-raiz sai do escopo Poseidon.

---

*Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT) — IDs G45+G46 do bucket B15.*
