---
task: reviewDesignOutput()
responsavel: "@design-chief"
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
  - "[ ] Veredito proferido (APROVAR/REVISAR/REJEITAR)"
  - "[ ] Acessibilidade, consistência e responsividade avaliadas individualmente"
---

# Tarefa: Revisar Saída de Design Systems/UX

**Task ID:** DESIGN-CHIEF-002
**Versão:** 1.0.0
**Comando:** `*review`
**Orquestrador:** Chefe de Design (design-chief)
**Propósito:** Revisar a saída do especialista contra o checklist de qualidade, pontuar e aprovar ou solicitar revisão.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|-------------|-----------|
| specialist_output | string | Agente especialista | Sim | Entrega não vazia |
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
4. Identificar o tipo de entrega: componente, layout, design system, fluxo de UX, wireframe, spec de protótipo
5. Determinar a plataforma: web, mobile, responsivo, multiplataforma

### Fase 2: Aplicar o Checklist de Qualidade

1. Carregar checklists/output-quality.md
2. Avaliar cada item em relação à saída do especialista
3. Marcar cada item: [x] Aprovado, [ ] Reprovado, [N/A] Não Aplicável
4. Contar as falhas CRÍTICAS e o total de falhas
5. Dar atenção especial a: conformidade de acessibilidade, consistência do design system, responsividade e uso de tokens

### Fase 3: Pontuar e Decidir

| Pontuação | Veredito | Ação |
|-----------|----------|------|
| Todos os CRÍTICOS aprovados, < 2 falhas não críticas | APROVAR | Entregar ao usuário |
| Todos os CRÍTICOS aprovados, 2+ falhas não críticas | REVISAR | Devolver ao especialista com feedback específico |
| Qualquer CRÍTICO reprovado | REJEITAR | Devolver ao especialista, bloquear a entrega |

### Fase 4: Saída

Produzir o relatório de revisão com veredito, pontuação e feedback.

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
- [{CRÍTICO|ALERTA}] {descrição} — {recomendação}

### Notas Específicas de Design
- Conformidade de acessibilidade: {avaliação}
- Consistência do sistema: {avaliação}
- Comportamento responsivo: {avaliação}

### Recomendação
{Próximo passo: entregar / revisar itens específicos / refazer}
```

---

## Condições de Veto

- NUNCA aprovar saída com falhas CRÍTICAS
- NUNCA rejeitar sem fornecer feedback específico e acionável
- NUNCA modificar a saída do especialista — apenas revisar e fornecer feedback
- NUNCA aprovar designs que falhem nos requisitos de contraste ou interação do WCAG 2.1 AA
- NUNCA aprovar componentes que quebram as convenções do design system sem justificativa documentada

---

## Critérios de Conclusão

- [ ] Solicitação original relida e compreendida
- [ ] Tipo de entrega e plataforma identificados
- [ ] Todos os itens do checklist avaliados
- [ ] Pontuação calculada
- [ ] Veredito proferido (APROVAR/REVISAR/REJEITAR)
- [ ] Feedback específico fornecido para quaisquer falhas
- [ ] Acessibilidade, consistência e responsividade avaliadas individualmente
