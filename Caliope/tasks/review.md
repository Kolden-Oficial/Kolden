---
task: review()
responsavel: "@copy-master-chief"
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
  - "[ ] Feedback específico fornecido para qualquer falha"
  - "[ ] Checkpoint de psicologia da persuasão aprovado"
tipo: nota
area: Caliope
up: "[[Caliope/_MOC-caliope]]"
relacionado:
  - "[[Caliope/tasks/_indice|_indice]]"
---

# Tarefa: Revisar Saída de Copywriting

**ID da Tarefa:** COPY-M-CHIEF-002
**Versão:** 2.0.0
**Comando:** `*review`
**Orquestrador:** Copy Master Chief (copy-master-chief)
**Propósito:** Revisar a saída do especialista contra um checklist de qualidade incluindo padrões de psicologia da persuasão, pontuar, e aprovar ou solicitar revisão.

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
- O checklist de qualidade de saída está disponível em checklists/output-quality.md

---

## Fases de Execução

### Fase 1: Entender o Contexto

1. Releia a requisição original do usuário
2. Identifique o que foi pedido vs o que foi entregue
3. Anote o especialista que produziu a saída
4. Identifique o público-alvo e o objetivo de conversão
5. Determine o meio (e-mail, landing page, anúncio, carta de vendas, etc.)

### Fase 2: Aplicar o Checklist de Qualidade

1. Carregue checklists/output-quality.md
2. Avalie cada item contra a saída do especialista
3. Marque cada item: [x] Passou, [ ] Falhou, [N/A] Não Aplicável
4. Conte as falhas CRÍTICAS e o total de falhas
5. Dê atenção especial a: força da headline, hook do lead, clareza da oferta e poder do CTA

### Fase 3: Checkpoint de Psicologia da Persuasão

1. Verifique se os princípios de Cialdini estão presentes e aplicados adequadamente:
   - No mínimo 3 dos 7 princípios devem estar ativos em qualquer entregável
   - Nenhum princípio deve ser aplicado de forma manipuladora ou enganosa
   - Os princípios devem estar entrelaçados naturalmente, não acoplados à força
2. Verifique se as alavancas de Blair Warren estão sendo utilizadas:
   - No mínimo 2 das 5 alavancas devem estar ativadas
   - As alavancas devem corresponder ao estado emocional do público
3. Verifique a Value Equation de Hormozi (apenas para ofertas):
   - Todas as 4 dimensões pontuadas
   - Bônus mapeados para as dimensões específicas que eles melhoram
4. Sinalize quaisquer lacunas de psicologia da persuasão como itens de ALERTA

### Fase 4: Pontuar e Decidir

| Pontuação | Veredito | Ação |
|-------|---------|--------|
| Todas as CRÍTICAS passam, < 2 não-críticas falham, checkpoint de psicologia passa | APROVAR | Entregar ao usuário |
| Todas as CRÍTICAS passam, 2+ não-críticas falham OU lacuna de psicologia | REVISAR | Devolver ao especialista com feedback específico |
| Qualquer CRÍTICA falha | REJEITAR | Devolver ao especialista, bloquear entrega |

### Fase 5: Saída

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
- [{CRÍTICA|ALERTA}] {descrição} — {recomendação}

### Checkpoint de Psicologia da Persuasão
- Princípios de Cialdini ativos: {contagem}/7 — {lista}
- Alavancas de Warren ativas: {contagem}/5 — {lista}
- Value Equation de Hormozi: {pontuada/não-aplicável}
- Veredito de psicologia: {PASSOU/LACUNA — descrição}

### Notas Específicas de Copy
- Eficácia da headline: {avaliação}
- Ressonância emocional: {avaliação}
- Probabilidade de conversão: {avaliação}

### Recomendação
{Próximo passo: entregar / revisar itens específicos / refazer}
```

---

## Condições de Veto

- NUNCA aprove uma saída com falhas CRÍTICAS
- NUNCA rejeite sem fornecer feedback específico e acionável
- NUNCA modifique a saída do especialista — apenas revise e forneça feedback
- NUNCA aprove um copy que faça afirmações não comprovadas
- NUNCA aprove um copy que careça de uma chamada para ação clara

---

## Critérios de Conclusão

- [ ] Requisição original relida e compreendida
- [ ] Público-alvo e meio identificados
- [ ] Todos os itens do checklist avaliados
- [ ] Checkpoint de psicologia da persuasão concluído
- [ ] Pontuação calculada
- [ ] Veredito emitido (APROVAR/REVISAR/REJEITAR)
- [ ] Feedback específico fornecido para qualquer falha
- [ ] Headline, lead e CTA avaliados individualmente
