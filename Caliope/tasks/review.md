---
task: review()
responsavel: "@copy-chief"
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
  - "[ ] Feedback específico fornecido para quaisquer falhas"
---

# Tarefa: Revisar Entrega de Copywriting

**ID da Tarefa:** COPY-CHIEF-002
**Versão:** 1.0.0
**Comando:** `*review`
**Orquestrador:** Copy Chief (copy-chief)
**Objetivo:** Revisar a entrega do especialista contra o checklist de qualidade, pontuar e aprovar ou solicitar revisão.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| specialist_output | string | Agente especialista | Sim | Entregável não vazio |
| original_request | string | Prompt do usuário | Sim | A solicitação original que disparou o trabalho |
| specialist_id | string | Roteamento | Sim | ID do agente que produziu a entrega |

---

## Pré-condições

- O especialista concluiu sua tarefa e produziu a entrega
- O checklist de qualidade de saída está disponível em checklists/output-quality.md

---

## Fases de Execução

### Fase 1: Entender o Contexto

1. Releia a solicitação original do usuário
2. Identifique o que foi pedido versus o que foi entregue
3. Anote o especialista que produziu a entrega
4. Identifique o público-alvo e o objetivo de conversão
5. Determine o meio (e-mail, landing page, anúncio, carta de vendas, etc.)

### Fase 2: Aplicar o Checklist de Qualidade

1. Carregue checklists/output-quality.md
2. Avalie cada item contra a entrega do especialista
3. Marque cada item: [x] Passou, [ ] Falhou, [N/A] Não Aplicável
4. Conte as falhas CRÍTICAS e o total de falhas
5. Preste atenção especial a: força do título, gancho da abertura, clareza da oferta e poder do CTA

### Fase 3: Pontuar e Decidir

| Pontuação | Veredito | Ação |
|-------|---------|--------|
| Todas as CRÍTICAS passam, < 2 não críticas falham | APROVAR | Entregar ao usuário |
| Todas as CRÍTICAS passam, 2+ não críticas falham | REVISAR | Devolver ao especialista com feedback específico |
| Qualquer CRÍTICA falha | REJEITAR | Devolver ao especialista, bloquear a entrega |

### Fase 4: Saída

Produza o relatório de revisão com veredito, pontuação e feedback.

---

## Formato de Saída

```markdown
## Relatório de Revisão

**Especialista:** {name} ({id})
**Veredito:** {APROVAR | REVISAR | REJEITAR}
**Pontuação:** {X}/{total} itens aprovados

### Aprovados
- {itens que passaram}

### Problemas Encontrados
- [{CRÍTICO|ATENÇÃO}] {descrição} — {recomendação}

### Notas Específicas de Copy
- Eficácia do título: {avaliação}
- Ressonância emocional: {avaliação}
- Probabilidade de conversão: {avaliação}

### Recomendação
{Próximo passo: entregar / revisar itens específicos / refazer}
```

---

## Condições de Veto

- NUNCA aprove uma entrega com falhas CRÍTICAS
- NUNCA rejeite sem fornecer feedback específico e acionável
- NUNCA modifique a entrega do especialista — apenas revise e forneça feedback
- NUNCA aprove uma copy que faça alegações não comprovadas
- NUNCA aprove uma copy que careça de uma chamada à ação clara

---

## Critérios de Conclusão

- [ ] Solicitação original relida e compreendida
- [ ] Público-alvo e meio identificados
- [ ] Todos os itens do checklist avaliados
- [ ] Pontuação calculada
- [ ] Veredito proferido (APROVAR/REVISAR/REJEITAR)
- [ ] Feedback específico fornecido para quaisquer falhas
- [ ] Título, abertura e CTA avaliados individualmente
