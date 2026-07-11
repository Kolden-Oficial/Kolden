---
task: review()
responsavel: "@data-chief"
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
  - "[ ] Veredito emitido (APPROVE/REVISE/REJECT)"
  - "[ ] Integridade dos dados e rigor estatístico avaliados"
tipo: nota
area: Metis
up: "[[Metis/_MOC-metis]]"
relacionado:
  - "[[Metis/tasks/_indice|_indice]]"
---

# Tarefa: Revisar Saída de Crescimento Orientado por Dados

**Task ID:** DATA-CHIEF-002
**Versão:** 1.0.0
**Comando:** `*review`
**Orquestrador:** Data Chief (data-chief)
**Propósito:** Revisar a saída do especialista em relação ao checklist de qualidade, pontuar e aprovar ou solicitar revisão.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| specialist_output | string | Agente especialista | Sim | Entregável não vazio |
| original_request | string | Prompt do usuário | Sim | A solicitação original que desencadeou o trabalho |
| specialist_id | string | Roteamento | Sim | ID do agente que produziu a saída |

---

## Pré-condições

- O especialista concluiu sua tarefa e produziu uma saída
- O checklist de qualidade da saída está disponível em checklists/output-quality.md

---

## Fases de Execução

### Fase 1: Entender o Contexto

1. Releia a solicitação original do usuário
2. Identifique o que foi pedido versus o que foi entregue
3. Anote o especialista que produziu a saída
4. Identifique o tipo de análise: descritiva, diagnóstica, preditiva, prescritiva
5. Determine o contexto de negócio e a decisão que está sendo apoiada

### Fase 2: Aplicar o Checklist de Qualidade

1. Carregue checklists/output-quality.md
2. Avalie cada item em relação à saída do especialista
3. Marque cada item: [x] Aprovado, [ ] Reprovado, [N/A] Não Aplicável
4. Conte as falhas CRÍTICAS e o total de falhas
5. Preste atenção especial a: citação da fonte de dados, validade estatística, acionabilidade do insight e clareza da visualização

### Fase 3: Pontuar e Decidir

| Pontuação | Veredito | Ação |
|-------|---------|--------|
| Todos os CRÍTICOS aprovados, < 2 não críticos reprovados | APPROVE | Entregar ao usuário |
| Todos os CRÍTICOS aprovados, 2+ não críticos reprovados | REVISE | Retornar ao especialista com feedback específico |
| Qualquer CRÍTICO reprovado | REJECT | Retornar ao especialista, bloquear a entrega |

### Fase 4: Saída

Produza o relatório de revisão com veredito, pontuação e feedback.

---

## Formato de Saída

```markdown
## Relatório de Revisão

**Especialista:** {name} ({id})
**Veredito:** {APPROVE | REVISE | REJECT}
**Pontuação:** {X}/{total} itens aprovados

### Aprovados
- {itens que passaram}

### Problemas Encontrados
- [{CRITICAL|WARN}] {descrição} — {recomendação}

### Notas Específicas de Dados
- Integridade dos dados: {avaliação}
- Rigor estatístico: {avaliação}
- Acionabilidade do insight: {avaliação}

### Recomendação
{Próximo passo: entregar / revisar itens específicos / refazer}
```

---

## Condições de Veto

- NUNCA aprove uma saída com falhas CRÍTICAS
- NUNCA rejeite sem fornecer feedback específico e acionável
- NUNCA modifique a saída do especialista — apenas revise e forneça feedback
- NUNCA aprove uma análise sem fontes de dados citadas
- NUNCA aprove conclusões que confundam correlação com causalidade sem divulgação

---

## Critérios de Conclusão

- [ ] Solicitação original relida e compreendida
- [ ] Tipo de análise e contexto de negócio identificados
- [ ] Todos os itens do checklist avaliados
- [ ] Pontuação calculada
- [ ] Veredito emitido (APPROVE/REVISE/REJECT)
- [ ] Feedback específico fornecido para quaisquer falhas
- [ ] Integridade dos dados, rigor estatístico e acionabilidade avaliados individualmente
