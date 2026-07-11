---
task: review()
responsavel: "@aletheia-chief"
responsavel_type: Agent
atomic_layer: Task
elicit: false

Entrada:
  - campo: deliverable
    tipo: object
    origem: Sessão / Especialista
    obrigatorio: true

Saida:
  - campo: review_result
    tipo: object
    destino: Console
    persistido: false
tipo: nota
area: Aletheia
up: "[[Aletheia/_MOC-aletheia]]"
relacionado:
  - "[[Aletheia/tasks/_indice|_indice]]"
---

# Tarefa: Revisar Qualidade da Saída — Aletheia

## Metadados

| Campo        | Valor                                            |
|--------------|--------------------------------------------------|
| Task ID      | `aletheia:review`                               |
| Comando      | `@aletheia review`                              |
| Orquestrador | `aletheia-chief`                                |
| Propósito    | Validar um entregável de descoberta/validação contra o checklist antes da entrega ao usuário |

## Pré-condições

- Checklist `checklists/output-quality.md` (ALETHEIA-CL-001) disponível
- Entregável a revisar fornecido

## Fases

### Fase 1: Carregar o Checklist

Carregue `checklists/output-quality.md` e percorra as 6 categorias + o GATE INVIOLÁVEL.

### Fase 2: Verificar Item a Item

Para cada item: marque `[x]` Aprovado, `[ ]` Reprovado ou `[N/A]`. Itens com sufixo
**(CRITICAL)** bloqueiam a entrega.

### Fase 3: Aplicar o Gate Inviolável

Se o entregável recomenda construir/escalar/lançar, confirme a presença de: dor validada,
hipótese falsificável, métrica de validação com critério de sucesso, critério de kill.
Se faltar qualquer um → **REPROVADO (HALT)**.

### Fase 4: Emitir o Veredito

- **APROVADO:** todos os CRÍTICOS [x] e < 3 reprovações não-críticas.
- **REVISAR:** todos os CRÍTICOS [x] mas ≥ 3 reprovações não-críticas.
- **REPROVADO:** qualquer CRÍTICO desmarcado ou o gate inviolável acionado.

## Formato de Saída

```yaml
review_result:
  verdict: "{APROVADO|REVISAR|REPROVADO}"
  critical_failures: ["{itens críticos reprovados}"]
  non_critical_failures: ["{itens não-críticos reprovados}"]
  gate_triggered: {true|false}
  required_fixes: ["{o que corrigir antes de entregar}"]
```

## Critérios de Conclusão

- [ ] Todas as 6 categorias do checklist verificadas
- [ ] Gate inviolável aplicado
- [ ] Veredito emitido com correções necessárias listadas
