---
task: map-job()
responsavel: "@tony-ulwick"
responsavel_type: Agent
atomic_layer: Task
elicit: false
tipo: nota
area: Aletheia
up: "[[Aletheia/_MOC-aletheia]]"
relacionado:
  - "[[Aletheia/tasks/_indice|_indice]]"
---

# Tarefa: Estruturar a Necessidade (Job & Outcomes) — Aletheia

| Campo        | Valor                                   |
|--------------|-----------------------------------------|
| Task ID      | `aletheia:map-job`                     |
| Primário     | `tony-ulwick` · Secundário: `rob-fitzpatrick` |
| Propósito    | Traduzir a dor descoberta em um job-to-be-done estruturado e identificar os outcomes subatendidos |

## Fases

### Fase 1: Definir o Job
1. Articule o job funcional central ("o cliente contrata X para...") + jobs emocionais/sociais.
2. O job é estável; as soluções mudam — foque no progresso que o cliente busca.

### Fase 2: Job Map
1. Desconstrua o job nos passos universais: define, locate, prepare, confirm, execute, monitor, modify, conclude.
2. Marque onde o cliente sofre mais.

### Fase 3: Desired Outcomes + Opportunity Score
1. Escreva os outcomes com a sintaxe rígida: direção (minimizar/aumentar) + métrica + objeto + clarificador contextual.
2. Pontue cada outcome: Opportunity = Importância + max(Importância − Satisfação, 0).
3. Identifique underserved (oportunidade), overserved (custo/disrupção) e appropriately served.

## Formato de Saída
```yaml
job_to_be_done:
  core_job: "{o job funcional}"
  emotional_social: ["{...}"]
  job_map: ["define", "locate", "..."]
  outcomes:
    - statement: "{minimizar o tempo que leva para...}"
      importance: 0-10
      satisfaction: 0-10
      opportunity_score: 0-20
  underserved_outcomes: ["{os de maior opportunity score}"]
```

## Regras de Veto
- NUNCA registre features pedidas como outcomes — outcome é a MÉTRICA do job, não a solução.
- Outcomes sem a sintaxe completa (direção + métrica) são rejeitados.

## Critérios de Conclusão
- [ ] Job central articulado (não uma solução)
- [ ] Job map em passos
- [ ] Outcomes com opportunity score; subatendidos identificados
