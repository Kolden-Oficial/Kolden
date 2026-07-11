---
task: reviewSecurityOutput()
responsavel: "@cyber-chief"
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
  - "[ ] Autorização, escopo e vazamento de dados sensíveis verificados"
tipo: nota
area: Egide
up: "[[Egide/_MOC-egide]]"
relacionado:
  - "[[Egide/tasks/_indice|_indice]]"
---

# Tarefa: Revisar Saída de Segurança

**ID da Tarefa:** CYBER-CHIEF-002
**Versão:** 1.0.0
**Comando:** `*review`
**Orquestrador:** Cyber Chief (cyber-chief)
**Propósito:** Revisar a saída do especialista contra o checklist de qualidade, pontuar e aprovar ou solicitar revisão.

---

## Entradas

| Campo | Tipo | Origem | Obrigatória | Validação |
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

1. Releia a solicitação original do usuário
2. Identifique o que foi pedido vs o que foi entregue
3. Anote o especialista que produziu a saída
4. Identifique o domínio de segurança: aplicação, rede, nuvem, conformidade, resposta a incidentes
5. Determine o tipo de engajamento: avaliação, auditoria, fortalecimento, incidente, política

### Fase 2: Aplicar o Checklist de Qualidade

1. Carregue checklists/output-quality.md
2. Avalie cada item contra a saída do especialista
3. Marque cada item: [x] Passou, [ ] Falhou, [N/A] Não Aplicável
4. Conte as falhas CRÍTICAS e o total de falhas
5. Dê atenção especial a: verificação de autorização, limites de escopo, classificação de severidade e acionabilidade da remediação

### Fase 3: Pontuar e Decidir

| Pontuação | Veredito | Ação |
|-------|---------|--------|
| Todas as CRÍTICAS passam, < 2 não críticas falham | APROVAR | Entregar ao usuário |
| Todas as CRÍTICAS passam, 2+ não críticas falham | REVISAR | Retornar ao especialista com feedback específico |
| Qualquer CRÍTICA falha | REJEITAR | Retornar ao especialista, bloquear a entrega |

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
- [{CRÍTICA|AVISO}] {descrição} — {recomendação}

### Notas Específicas de Segurança
- Conformidade de escopo: {avaliação}
- Acurácia da severidade: {avaliação}
- Qualidade da remediação: {avaliação}

### Recomendação
{Próximo passo: entregar / revisar itens específicos / refazer}
```

---

## Condições de Veto

- NUNCA aprove saída com falhas CRÍTICAS
- NUNCA rejeite sem fornecer feedback específico e acionável
- NUNCA modifique a saída do especialista — apenas revise e forneça feedback
- NUNCA aprove avaliações que excedam o escopo autorizado
- NUNCA aprove achados sem classificação de severidade e passos de remediação
- NUNCA aprove saída que exponha dados sensíveis (credenciais, PII, IPs internos)

---

## Critérios de Conclusão

- [ ] Solicitação original relida e compreendida
- [ ] Domínio de segurança e tipo de engajamento identificados
- [ ] Autorização e escopo verificados
- [ ] Todos os itens do checklist avaliados
- [ ] Pontuação calculada
- [ ] Veredito proferido (APROVAR/REVISAR/REJEITAR)
- [ ] Feedback específico fornecido para quaisquer falhas
- [ ] Sem vazamento de dados sensíveis no entregável
