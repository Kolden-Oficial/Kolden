---
task: reviewStrategicCounsel()
responsavel: "@board-chair"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: specialist_output
    tipo: string
    origem: Agente Especialista
    obrigatorio: true
  - campo: original_request
    tipo: string
    origem: Entrada do Usuário
    obrigatorio: true

Saida:
  - campo: review_report
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Todos os itens do checklist avaliados e pontuados"
  - "[ ] Veredito proferido (APPROVE/REVISE/REJECT)"
  - "[ ] Amplitude de perspectivas e cobertura de risco avaliadas"
tipo: nota
area: Themis
up: "[[Themis/_MOC-themis]]"
relacionado:
  - "[[Themis/tasks/_indice|_indice]]"
---

# Task: Revisar a Saída de Aconselhamento Estratégico

**Task ID:** ADVISORY-CHIEF-002
**Versão:** 1.0.0
**Comando:** `*review`
**Orquestrador:** Board Chair (board-chair)
**Propósito:** Revisar a saída do especialista frente ao checklist de qualidade, pontuar, e aprovar ou solicitar revisão.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| specialist_output | string | Agente especialista | Sim | Entregável não vazio |
| original_request | string | Prompt do usuário | Sim | A solicitação original que disparou o trabalho |
| specialist_id | string | Roteamento | Sim | ID do agente que produziu a saída |

---

## Pré-condições

- O especialista concluiu sua tarefa e produziu a saída
- O checklist de qualidade de saída está disponível em checklists/output-quality.md

---

## Fases de Execução

### Fase 1: Entender o Contexto

1. Reler a solicitação original do usuário
2. Identificar o que foi pedido versus o que foi entregue
3. Anotar o especialista que produziu a saída
4. Identificar o domínio consultivo: estratégia, finanças, operações, entrada de mercado, parcerias, governança
5. Determinar a gravidade da decisão: reversível/baixo risco versus irreversível/alto risco

### Fase 2: Aplicar o Checklist de Qualidade

1. Carregar checklists/output-quality.md
2. Avaliar cada item frente à saída do especialista
3. Marcar cada item: [x] Aprovado, [ ] Reprovado, [N/A] Não Aplicável
4. Contar as falhas CRITICAL e o total de falhas
5. Prestar atenção especial a: análise multiperspectiva, identificação de risco, transparência de pressupostos e acionabilidade

### Fase 3: Pontuar e Decidir

| Pontuação | Veredito | Ação |
|-------|---------|--------|
| Todos os CRITICAL aprovados, < 2 não críticos reprovados | APPROVE | Entregar ao usuário |
| Todos os CRITICAL aprovados, 2+ não críticos reprovados | REVISE | Devolver ao especialista com feedback específico |
| Qualquer CRITICAL reprovado | REJECT | Devolver ao especialista, bloquear a entrega |

### Fase 4: Saída

Produzir o relatório de revisão com veredito, pontuação e feedback.

---

## Formato de Saída

```markdown
## Relatório de Revisão

**Especialista:** {nome} ({id})
**Veredito:** {APPROVE | REVISE | REJECT}
**Pontuação:** {X}/{total} itens aprovados

### Aprovados
- {itens que foram aprovados}

### Problemas Encontrados
- [{CRITICAL|WARN}] {descrição} — {recomendação}

### Notas Específicas do Aconselhamento
- Amplitude de perspectivas: {avaliação}
- Cobertura de risco: {avaliação}
- Prontidão para decisão: {avaliação}

### Recomendação
{Próximo passo: entregar / revisar itens específicos / refazer}
```

---

## Condições de Veto

- NUNCA aprove uma saída com falhas CRITICAL
- NUNCA rejeite sem fornecer feedback específico e acionável
- NUNCA modifique a saída do especialista — apenas revise e forneça feedback
- NUNCA aprove um aconselhamento que considere apenas uma perspectiva ou cenário
- NUNCA aprove recomendações sem pressupostos e riscos declarados

---

## Critérios de Conclusão

- [ ] Solicitação original relida e compreendida
- [ ] Domínio consultivo e gravidade da decisão identificados
- [ ] Todos os itens do checklist avaliados
- [ ] Pontuação calculada
- [ ] Veredito proferido (APPROVE/REVISE/REJECT)
- [ ] Feedback específico fornecido para quaisquer falhas
- [ ] Amplitude de perspectivas e cobertura de risco avaliadas individualmente
