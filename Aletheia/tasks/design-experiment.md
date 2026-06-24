---
task: design-experiment()
responsavel: "@eric-ries"
responsavel_type: Agent
atomic_layer: Task
elicit: false
---

# Tarefa: Desenhar o Experimento / MVP — Aletheia

| Campo        | Valor                                   |
|--------------|-----------------------------------------|
| Task ID      | `aletheia:design-experiment`           |
| Primário     | `eric-ries` · Secundário: `david-bland` |
| Propósito    | Escolher o menor MVP que testa a assunção mais arriscada e escrever o test card |

## Fases

### Fase 1: Escolher o Tipo de MVP (eric-ries)
1. Pense ao contrário (Build-Measure-Learn): o que aprender → o que medir → o que construir.
2. Selecione o MENOR MVP que testa a riskiest assumption: concierge, Wizard of Oz, landing/smoke test, single-feature, vídeo.
3. MVP é experimento, não produto pequeno.

### Fase 2: Escrever o Test Card (david-bland)
1. We believe that… (hipótese)
2. To verify that, we will… (teste)
3. And measure… (métrica)
4. We are right if… (critério de sucesso)
5. We stop/pivot if… (critério de kill)

### Fase 3: Avaliar a Evidência
1. O experimento gera evidência do que as pessoas FAZEM (forte) ou só DIZEM (fraca)?
2. Sequencie: do mais barato/rápido para o mais caro/forte.

## Formato de Saída
```yaml
experiment:
  mvp_type: "{concierge|wizard-of-oz|landing|single-feature|video}"
  rationale: "{por que este é o mínimo viável}"
  test_card:
    hypothesis: "{We believe...}"
    test: "{To verify, we will...}"
    metric: "{And measure...}"
    success_criteria: "{We are right if...}"
    kill_criteria: "{We stop/pivot if...}"
  evidence_strength: "{forte (do)|fraca (say)}"
```

## Regras de Veto
- HALT se faltar métrica de validação OU critério de kill.
- O MVP precisa testar a assunção MAIS ARRISCADA, não a mais fácil.

## Critérios de Conclusão
- [ ] Tipo de MVP escolhido e justificado como mínimo viável
- [ ] Test card completo (com sucesso E kill)
- [ ] Força da evidência avaliada
