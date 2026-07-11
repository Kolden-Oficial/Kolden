---
task: reviewPaidTrafficOutput()
responsavel: "@traffic-chief"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: specialist_output
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: original_request
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: reviewReport
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Todos os itens do checklist avaliados"
  - "[ ] Veredito proferido (APPROVE/REVISE/REJECT)"
  - "[ ] Alocação de orçamento e segmentação avaliadas individualmente"
tipo: nota
area: Peitho
up: "[[Peitho/_MOC-peitho]]"
relacionado:
  - "[[Peitho/tasks/_indice|_indice]]"
---

# Tarefa: Revisar Saída de Tráfego Pago

**Task ID:** TRAFFIC-CHIEF-002
**Versão:** 1.0.0
**Comando:** `*review`
**Orquestrador:** Traffic Chief (traffic-chief)
**Propósito:** Revisar a saída do especialista em relação ao checklist de qualidade, pontuar e aprovar ou solicitar revisão.

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
2. Identificar o que foi pedido vs o que foi entregue
3. Anotar o especialista que produziu a saída
4. Identificar a(s) plataforma(s): Meta Ads, Google Ads, TikTok Ads, LinkedIn Ads, etc.
5. Determinar o objetivo da campanha: awareness, tráfego, leads, conversões, ROAS

### Fase 2: Aplicar o Checklist de Qualidade

1. Carregar checklists/output-quality.md
2. Avaliar cada item em relação à saída do especialista
3. Marcar cada item: [x] Aprovado, [ ] Reprovado, [N/A] Não Aplicável
4. Contar as falhas CRÍTICAS e o total de falhas
5. Prestar atenção especial a: precisão de segmentação, justificativa de orçamento, conformidade de criativo e definição de KPI

### Fase 3: Pontuar e Decidir

| Pontuação | Veredito | Ação |
|-------|---------|--------|
| Todos os CRÍTICOS aprovados, < 2 não críticos reprovados | APPROVE | Entregar ao usuário |
| Todos os CRÍTICOS aprovados, 2+ não críticos reprovados | REVISE | Devolver ao especialista com feedback específico |
| Qualquer CRÍTICO reprovado | REJECT | Devolver ao especialista, bloquear entrega |

### Fase 4: Saída

Produzir o relatório de revisão com veredito, pontuação e feedback.

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

### Notas Específicas de Tráfego
- Conformidade da plataforma: {avaliação}
- Qualidade da segmentação: {avaliação}
- ROAS/CPA esperado: {avaliação}

### Recomendação
{Próximo passo: entregar / revisar itens específicos / refazer}
```

---

## Condições de Veto

- NUNCA aprove saídas com falhas CRÍTICAS
- NUNCA rejeite sem fornecer feedback específico e acionável
- NUNCA modifique a saída do especialista — apenas revise e forneça feedback
- NUNCA aprove campanhas sem KPIs e métricas de sucesso definidos
- NUNCA aprove segmentação que viole as políticas de publicidade da plataforma

---

## Critérios de Conclusão

- [ ] Solicitação original relida e compreendida
- [ ] Plataforma e objetivo da campanha identificados
- [ ] Todos os itens do checklist avaliados
- [ ] Pontuação calculada
- [ ] Veredito proferido (APPROVE/REVISE/REJECT)
- [ ] Feedback específico fornecido para quaisquer falhas
- [ ] Alocação de orçamento e segmentação avaliadas individualmente
