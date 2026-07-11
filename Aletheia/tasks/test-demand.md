---
task: test-demand()
responsavel: "@alberto-savoia"
responsavel_type: Agent
atomic_layer: Task
elicit: false
tipo: nota
area: Aletheia
up: "[[Aletheia/_MOC-aletheia]]"
relacionado:
  - "[[Aletheia/tasks/_indice|_indice]]"
---

# Tarefa: Testar a Demanda (Pretotyping) — Aletheia

| Campo        | Valor                                   |
|--------------|-----------------------------------------|
| Task ID      | `aletheia:test-demand`                 |
| Primário     | `alberto-savoia` · Secundário: `david-bland` |
| Propósito    | Provar que existe demanda real (skin-in-the-game) e dimensionar o mercado antes de qualquer build |

## Fases

### Fase 1: Formular a XYZ Hypothesis
1. "Ao menos X% de Y vão Z." Depois reduza (shrink) para um teste local, barato e rápido.

### Fase 2: Escolher a Técnica de Pretotyping
1. Selecione: Mechanical Turk, Pinocchio, Fake Door / Façade, One-Night Stand, Infiltrator, YouTube.
2. O objetivo é coletar skin-in-the-game data — compromisso real (tempo, dinheiro, e-mail, fila), não opinião.

### Fase 3: YODA > OPO
1. Confronte os dados próprios (Your Own DATA) com as opiniões (Thoughtland).
2. Avalie contra a Law of Market Failure: a maioria dos produtos falha mesmo bem executada.

### Fase 4: Sizing Pragmático
1. Dimensione de baixo pra cima (beachhead → expansão), nunca um TAM "de cima pra baixo" sem base.

## Formato de Saída
```yaml
demand_test:
  xyz_hypothesis: "{ao menos X% de Y vão Z}"
  shrunk_test: "{versão local/rápida}"
  pretotype_technique: "{...}"
  skin_in_the_game_data: "{compromisso real coletado}"
  demand_signal: "{forte|fraco|inconclusivo}"
  market_sizing: "{bottom-up: beachhead + lógica}"
```

## Regras de Veto
- NUNCA aceite opinião/intenção declarada como prova de demanda — exija comportamento com compromisso.
- NUNCA aceite TAM de cima pra baixo como prova; sizing é bottom-up.

## Critérios de Conclusão
- [ ] XYZ hypothesis formulada e reduzida a um teste viável
- [ ] Técnica de pretotyping aplicada com skin-in-the-game data
- [ ] Sinal de demanda lido e sizing pragmático entregue
