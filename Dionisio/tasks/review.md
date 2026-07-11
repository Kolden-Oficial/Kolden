---
task: review()
responsavel: "@movement-chief"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: specialist_output
    tipo: string
    origem: Specialist Agent
    obrigatorio: true
  - campo: original_request
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: review_report
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Todos os itens do checklist avaliados e pontuados"
  - "[ ] Veredito proferido (APROVAR/REVISAR/REJEITAR)"
  - "[ ] Feedback específico fornecido para quaisquer reprovações"
tipo: nota
area: Dionisio
up: "[[Dionisio/_MOC-dionisio]]"
relacionado:
  - "[[Dionisio/tasks/_indice|_indice]]"
---

# Tarefa: Revisar a Saída da Construção de Movimentos

**ID da Tarefa:** MOVEMENT-CHIEF-002
**Versão:** 1.0.0
**Comando:** `*review`
**Orquestrador:** Movement Chief (movement-chief)
**Propósito:** Revisar a saída do especialista em relação ao checklist de qualidade, pontuar e aprovar ou solicitar revisão.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|-------------|-----------|
| specialist_output | string | Agente especialista | Sim | Entregável não vazio |
| original_request | string | Prompt do usuário | Sim | O pedido original que disparou o trabalho |
| specialist_id | string | Roteamento | Sim | ID do agente que produziu a saída |

---

## Pré-condições

- O especialista concluiu sua tarefa e produziu a saída
- O checklist de qualidade de saída está disponível em checklists/output-quality.md

---

## Fases de Execução

### Fase 1: Compreender o Contexto

1. Releia o pedido original do usuário
2. Identifique o que foi pedido vs o que foi entregue
3. Anote o especialista que produziu a saída
4. Identifique o estágio do movimento: ignição, crescimento, institucionalização
5. Determine o tipo de entregável: manifesto, estratégia de comunidade, plano de mobilização, framework de identidade

### Fase 2: Aplicar o Checklist de Qualidade

1. Carregue checklists/output-quality.md
2. Avalie cada item em relação à saída do especialista
3. Marque cada item: [x] Aprovado, [ ] Reprovado, [N/A] Não Aplicável
4. Conte as reprovações CRÍTICAS e o total de reprovações
5. Preste atenção especial a: clareza da tensão, ressonância da identidade, especificidade do chamado à ação e mensurabilidade do impacto

### Fase 3: Pontuar e Decidir

| Pontuação | Veredito | Ação |
|-----------|----------|------|
| Todos os CRÍTICOS aprovados, < 2 reprovações não críticas | APROVAR | Entregar ao usuário |
| Todos os CRÍTICOS aprovados, 2+ reprovações não críticas | REVISAR | Devolver ao especialista com feedback específico |
| Qualquer CRÍTICO reprovado | REJEITAR | Devolver ao especialista, bloquear a entrega |

### Fase 4: Saída

Produza o relatório de revisão com veredito, pontuação e feedback.

---

## Formato de Saída

```markdown
## Relatório de Revisão

**Especialista:** {nome} ({id})
**Veredito:** {APROVAR | REVISAR | REJEITAR}
**Pontuação:** {X}/{total} itens aprovados

### Aprovados
- {itens que passaram}

### Problemas Encontrados
- [{CRÍTICO|AVISO}] {descrição} — {recomendação}

### Notas Específicas do Movimento
- Clareza da tensão: {avaliação}
- Ressonância da identidade: {avaliação}
- Potencial de mobilização: {avaliação}

### Recomendação
{Próximo passo: entregar / revisar itens específicos / refazer}
```

---

## Condições de Veto

- NUNCA aprove uma saída com reprovações CRÍTICAS
- NUNCA rejeite sem fornecer feedback específico e acionável
- NUNCA modifique a saída do especialista — apenas revise e forneça feedback
- NUNCA aprove uma estratégia de movimento sem uma tensão ou inimigo claramente definidos
- NUNCA aprove planos de mobilização sem critérios de impacto mensuráveis

---

## Critérios de Conclusão

- [ ] Pedido original relido e compreendido
- [ ] Estágio do movimento e tipo de entregável identificados
- [ ] Todos os itens do checklist avaliados
- [ ] Pontuação calculada
- [ ] Veredito proferido (APROVAR/REVISAR/REJEITAR)
- [ ] Feedback específico fornecido para quaisquer reprovações
- [ ] Tensão, identidade e mobilização avaliadas individualmente
