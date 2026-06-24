---
task: map-assumptions()
responsavel: "@david-bland"
responsavel_type: Agent
atomic_layer: Task
elicit: false
---

# Tarefa: Mapear Assunções + Lean Canvas — Aletheia

| Campo        | Valor                                   |
|--------------|-----------------------------------------|
| Task ID      | `aletheia:map-assumptions`             |
| Primário     | `david-bland` · Secundário: `ash-maurya` |
| Propósito    | Modelar o negócio e priorizar a assunção mais arriscada a testar primeiro |

## Fases

### Fase 1: Modelar (ash-maurya)
1. Preencha o Lean Canvas (Problem, Customer Segments, UVP, Solution, Channels, Revenue, Cost, Key Metrics, Unfair Advantage).
2. "Love the problem, not your solution" — não se apegue à solução.

### Fase 2: Listar Assunções (david-bland)
1. Extraia as assunções de desejabilidade (desirability), viabilidade (viability) e exequibilidade (feasibility) embutidas no canvas.
2. Cada caixa do canvas esconde uma ou mais assunções.

### Fase 3: Priorizar (Assumptions Map)
1. Plote num 2x2: importância (alta/baixa) × evidência (muita/pouca).
2. O quadrante "importante + sem evidência" = leap of faith = testar PRIMEIRO.

## Formato de Saída
```yaml
assumptions:
  lean_canvas: { problem: "...", customer_segments: "...", uvp: "...", solution: "...", channels: "...", revenue: "...", cost: "...", key_metrics: "...", unfair_advantage: "..." }
  mapped:
    - assumption: "{...}"
      category: "{desirability|viability|feasibility}"
      importance: "{alta|baixa}"
      evidence: "{muita|pouca}"
  riskiest_assumption: "{a do quadrante importante + sem evidência}"
```

## Regras de Veto
- A assunção mais arriscada DEVE ser a escolhida para testar primeiro (não a mais confortável).
- Canvas sem a caixa Problem e Customer Segments preenchidas é incompleto.

## Critérios de Conclusão
- [ ] Lean Canvas preenchido
- [ ] Assunções categorizadas e plotadas no 2x2
- [ ] Riskiest assumption (leap of faith) identificada
