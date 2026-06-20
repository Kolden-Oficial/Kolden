---
task: reviewBusinessScalingOutput()
responsavel: "@hormozi-chief"
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
  - "[ ] Veredito emitido (APROVAR/REVISAR/REJEITAR)"
  - "[ ] Value equation e matemática de receita avaliadas individualmente"
---

# Tarefa: Revisar Saída de Escala de Negócio

**ID da Tarefa:** HORMOZI-CHIEF-002
**Versão:** 1.0.0
**Comando:** `*review`
**Orquestrador:** Hormozi Chief (hormozi-chief)
**Propósito:** Revisar a saída do especialista contra um checklist de qualidade, pontuar e aprovar ou solicitar revisão.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| specialist_output | string | Agente especialista | Sim | Entregável não vazio |
| original_request | string | Prompt do usuário | Sim | A requisição original que disparou o trabalho |
| specialist_id | string | Roteamento | Sim | ID do agente que produziu a saída |

---

## Pré-condições

- O especialista concluiu sua tarefa e produziu a saída
- O checklist de qualidade da saída está disponível em checklists/output-quality.md

---

## Fases de Execução

### Fase 1: Entender o Contexto

1. Releia a requisição original do usuário
2. Identifique o que foi pedido versus o que foi entregue
3. Anote o especialista que produziu a saída
4. Identifique o modelo de negócio, o estágio de faturamento e a restrição de escala
5. Determine o framework do Hormozi que está sendo aplicado (value equation, criação de oferta, geração de leads, etc.)

### Fase 2: Aplicar o Checklist de Qualidade

1. Carregue checklists/output-quality.md
2. Avalie cada item contra a saída do especialista
3. Marque cada item: [x] Passou, [ ] Falhou, [N/A] Não Aplicável
4. Conte as falhas CRÍTICAS e o total de falhas
5. Preste atenção especial a: clareza da value equation, irresistibilidade da oferta e matemática de receita

### Fase 3: Pontuar e Decidir

| Pontuação | Veredito | Ação |
|-------|---------|--------|
| Todas as CRÍTICAS passaram, < 2 não críticas falharam | APROVAR | Entregar ao usuário |
| Todas as CRÍTICAS passaram, 2+ não críticas falharam | REVISAR | Retornar ao especialista com feedback específico |
| Qualquer CRÍTICA falhou | REJEITAR | Retornar ao especialista, bloquear entrega |

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

### Notas Específicas de Escala
- Força da value equation: {avaliação}
- Estimativa de impacto na receita: {avaliação}
- Viabilidade de implementação: {avaliação}

### Recomendação
{Próximo passo: entregar / revisar itens específicos / refazer}
```

---

## Condições de Veto

- NUNCA aprove saída com falhas CRÍTICAS
- NUNCA rejeite sem fornecer feedback específico e acionável
- NUNCA modifique a saída do especialista — apenas revise e forneça feedback
- NUNCA aprove estratégias sem matemática de receita clara ou unit economics
- NUNCA aprove conselhos vagos de "faça seu negócio crescer" sem alavancas concretas

---

## Critérios de Conclusão

- [ ] Requisição original relida e compreendida
- [ ] Modelo de negócio e estágio de faturamento identificados
- [ ] Todos os itens do checklist avaliados
- [ ] Pontuação calculada
- [ ] Veredito emitido (APROVAR/REVISAR/REJEITAR)
- [ ] Feedback específico fornecido para quaisquer falhas
- [ ] Value equation e matemática de receita avaliadas individualmente
