---
task: review()
responsavel: "@vision-chief"
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
  - "[ ] Veredito emitido (APROVAR/REVISAR/REJEITAR)"
  - "[ ] Alinhamento estratégico e rigor financeiro avaliados"
---

# Tarefa: Revisar Saída de Estratégia Executiva

**ID da Tarefa:** CLEVEL-CHIEF-002
**Versão:** 1.0.0
**Comando:** `*review`
**Orquestrador:** Vision Chief (vision-chief)
**Propósito:** Revisar a saída do especialista em relação ao checklist de qualidade, pontuar e aprovar ou solicitar revisão.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|-------------|-----------|
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

1. Releia a solicitação original do usuário
2. Identifique o que foi pedido vs o que foi entregue
3. Anote o especialista que produziu a saída
4. Identifique a função executiva: visão do CEO, finanças do CFO, operações do COO, mercado do CMO, tecnologia do CTO
5. Determine o horizonte estratégico: tático (0-6 meses), operacional (6-18 meses), estratégico (18 meses+)

### Fase 2: Aplicar o Checklist de Qualidade

1. Carregue checklists/output-quality.md
2. Avalie cada item em relação à saída do especialista
3. Marque cada item: [x] Aprovado, [ ] Reprovado, [N/A] Não Aplicável
4. Conte as reprovações CRÍTICAS e as reprovações totais
5. Preste atenção especial a: alinhamento estratégico, implicações financeiras, avaliação de risco e realismo do cronograma

### Fase 3: Pontuar e Decidir

| Pontuação | Veredito | Ação |
|-----------|----------|------|
| Todos os CRÍTICOS aprovados, < 2 não críticos reprovados | APROVAR | Entregar ao usuário |
| Todos os CRÍTICOS aprovados, 2+ não críticos reprovados | REVISAR | Retornar ao especialista com feedback específico |
| Qualquer CRÍTICO reprovado | REJEITAR | Retornar ao especialista, bloquear entrega |

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
- [{CRÍTICO|ATENÇÃO}] {descrição} — {recomendação}

### Notas Específicas do Executivo
- Alinhamento estratégico: {avaliação}
- Rigor financeiro: {avaliação}
- Viabilidade de execução: {avaliação}

### Recomendação
{Próximo passo: entregar / revisar itens específicos / refazer}
```

---

## Condições de Veto

- NUNCA aprove uma saída com reprovações CRÍTICAS
- NUNCA rejeite sem fornecer feedback específico e acionável
- NUNCA modifique a saída do especialista — apenas revise e forneça feedback
- NUNCA aprove uma estratégia sem implicações financeiras ou requisitos de recursos
- NUNCA aprove cronogramas sem marcos e estrutura de responsabilização

---

## Critérios de Conclusão

- [ ] Solicitação original relida e compreendida
- [ ] Função executiva e horizonte estratégico identificados
- [ ] Todos os itens do checklist avaliados
- [ ] Pontuação calculada
- [ ] Veredito emitido (APROVAR/REVISAR/REJEITAR)
- [ ] Feedback específico fornecido para quaisquer reprovações
- [ ] Alinhamento estratégico, rigor financeiro e viabilidade avaliados individualmente
