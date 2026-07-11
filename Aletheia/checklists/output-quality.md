---
tipo: checklist
area: Aletheia
up: "[[Aletheia/_MOC-aletheia]]"
---

# Checklist de Qualidade de Saída — Aletheia (Discovery & Lean Validation)

**ID do Checklist:** ALETHEIA-CL-001
**Referenciado por:** tasks/review.md, agents/aletheia-chief.md (gate de evidência)
**Propósito:** Validar entregáveis de descoberta e validação enxuta antes da entrega ao usuário —
e, acima de tudo, impedir qualquer recomendação de "construir" sem evidência.

[[LLM: INSTRUÇÕES DE INICIALIZAÇÃO

Este checklist valida saídas de descoberta de cliente e validação enxuta de negócio.

ABORDAGEM DE EXECUÇÃO:
1. Para cada categoria, verifique cada item em relação ao entregável
2. Marque os itens como [x] Aprovado, [ ] Reprovado, [N/A] Não Aplicável
3. Itens CRÍTICOS bloqueiam a entrega; itens não-críticos são consultivos

Itens CRÍTICOS são marcados com o sufixo (CRITICAL). Qualquer CRITICAL desmarcado = REPROVADO.]]

---

## 1. Descoberta & Evidência (a dor é real?)

- [ ] A dor/problema é validada com clientes reais, não assumida pelo fundador (CRITICAL)
- [ ] As evidências vêm de FATOS do passado/comportamento, não de opiniões sobre o futuro (CRITICAL)
- [ ] O segmento de cliente é específico e encontrável (who-where), não genérico
- [ ] Os early adopters / earlyvangelists estão caracterizados
- [ ] O job/outcome do cliente está articulado (não apenas a feature pedida)

## 2. Qualidade da Entrevista (sem viés)

- [ ] O roteiro segue o Mom Test: fala da vida deles, não da ideia (CRITICAL)
- [ ] Nenhuma pergunta hipotética/sugestiva ("você compraria...?", "você usaria...?") (CRITICAL)
- [ ] As conversas buscam compromisso e avanço (tempo, reputação, dinheiro), não elogios
- [ ] Elogios, fluff e pedidos de feature foram filtrados, não tratados como dado
- [ ] O tamanho da amostra é declarado e adequado às conclusões (CRITICAL)

## 3. Hipóteses & Assunções

- [ ] A hipótese principal é explícita e FALSIFICÁVEL (CRITICAL)
- [ ] As assunções foram mapeadas por importância × evidência (assumptions map)
- [ ] A assunção mais arriscada (leap of faith) foi identificada e priorizada (CRITICAL)
- [ ] As categorias de risco (desejabilidade, viabilidade, exequibilidade) estão cobertas

## 4. Experimento & MVP

- [ ] O experimento tem test card: hipótese / teste / métrica / critério de sucesso (CRITICAL)
- [ ] O tipo de MVP escolhido é o MENOR que testa a assunção mais arriscada
- [ ] A força da evidência esperada é avaliada (o que dizem vs o que fazem)
- [ ] Os experimentos estão sequenciados do mais barato/rápido para o mais caro/forte
- [ ] Existe critério de KILL declarado — sob que evidência a gente para (CRITICAL)

## 5. Mercado & Demanda

- [ ] A demanda é testada com skin-in-the-game data (comportamento real), não opiniões (CRITICAL quando há recomendação de build)
- [ ] A XYZ hypothesis está formulada ("ao menos X% de Y vão Z") quando aplicável
- [ ] O sizing de mercado é bottom-up/pragmático, não um TAM "de cima pra baixo" sem base
- [ ] O risco de market failure foi considerado explicitamente

## 6. Decisão & Handoff

- [ ] A recomendação é uma decisão clara: perseverar / pivotar / parar (CRITICAL)
- [ ] A decisão é fundamentada na evidência coletada, não em entusiasmo (CRITICAL)
- [ ] O próximo passo concreto está definido (próximo experimento OU handoff)
- [ ] Se for handoff, o squad de destino e o artefato entregue estão nomeados (Aglaia/Pluto/Harmonia/Caliope/Prometeu/Metis)
- [ ] Nenhum segredo/credencial em texto puro — tudo via Infisical (CRITICAL)

---

## O GATE INVIOLÁVEL (veto)

> **REPROVADO automático — HALT** se a saída recomenda "construir/escalar/lançar" e QUALQUER
> um destes está ausente: **(a)** dor validada, **(b)** hipótese falsificável, **(c)** métrica
> de validação com critério de sucesso, **(d)** critério de kill.
> Neste caso, devolva ao usuário exatamente o que falta testar e o experimento para testá-lo.

---

## Critérios de APROVAÇÃO/REPROVAÇÃO

**APROVADO:** Todos os itens CRÍTICOS [x] e menos de 3 reprovações não-críticas.
**REVISAR:** Todos os itens CRÍTICOS [x] mas 3+ reprovações não-críticas.
**REPROVADO:** Qualquer item CRÍTICO desmarcado, ou o GATE INVIOLÁVEL acionado.
