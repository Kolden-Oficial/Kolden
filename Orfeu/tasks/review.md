---
task: reviewNarrativeOutput()
responsavel: "@story-chief"
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
  - "[ ] Veredito emitido (APROVAR/REVISAR/REJEITAR)"
  - "[ ] Feedback específico fornecido para quaisquer falhas"
tipo: nota
area: Orfeu
up: "[[Orfeu/_MOC-orfeu]]"
relacionado:
  - "[[Orfeu/tasks/_indice|_indice]]"
---

# Tarefa: Revisar Saída Narrativa

**ID da Tarefa:** STORY-CHIEF-002
**Versão:** 1.0.0
**Comando:** `*review`
**Orquestrador:** Story Chief (story-chief)
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

- O especialista concluiu sua tarefa e produziu uma saída
- O checklist de qualidade da saída está disponível em checklists/output-quality.md

---

## Fases de Execução

### Fase 1: Compreender o Contexto

1. Reler a solicitação original do usuário
2. Identificar o que foi pedido versus o que foi entregue
3. Anotar o especialista que produziu a saída
4. Identificar o propósito narrativo: história de marca, pitch, marketing de conteúdo, história de origem, estudo de caso
5. Determinar o público-alvo e o destino emocional

### Fase 2: Aplicar o Checklist de Qualidade

1. Carregar checklists/output-quality.md
2. Avaliar cada item em relação à saída do especialista
3. Marcar cada item: [x] Passou, [ ] Falhou, [N/A] Não Aplicável
4. Contar as falhas CRÍTICAS e o total de falhas
5. Prestar atenção especial a: estrutura da história, arco emocional, gancho de abertura e ressonância com o público

### Fase 3: Pontuar e Decidir

| Pontuação | Veredito | Ação |
|-------|---------|--------|
| Todas as CRÍTICAS passam, < 2 não críticas falham | APROVAR | Entregar ao usuário |
| Todas as CRÍTICAS passam, 2+ não críticas falham | REVISAR | Devolver ao especialista com feedback específico |
| Qualquer CRÍTICA falha | REJEITAR | Devolver ao especialista, bloquear a entrega |

### Fase 4: Saída

Produzir um relatório de revisão com veredito, pontuação e feedback.

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

### Notas Específicas da Narrativa
- Força do arco emocional: {avaliação}
- Eficácia do gancho de abertura: {avaliação}
- Satisfação da resolução: {avaliação}

### Recomendação
{Próximo passo: entregar / revisar itens específicos / refazer}
```

---

## Condições de Veto

- NUNCA aprovar uma saída com falhas CRÍTICAS
- NUNCA rejeitar sem fornecer feedback específico e acionável
- NUNCA modificar a saída do especialista — apenas revisar e fornecer feedback
- NUNCA aprovar narrativas sem uma estrutura clara (começo, meio e fim)
- NUNCA aprovar histórias que careçam de engajamento emocional ou pareçam sem graça

---

## Critérios de Conclusão

- [ ] Solicitação original relida e compreendida
- [ ] Propósito narrativo e público identificados
- [ ] Todos os itens do checklist avaliados
- [ ] Pontuação calculada
- [ ] Veredito emitido (APROVAR/REVISAR/REJEITAR)
- [ ] Feedback específico fornecido para quaisquer falhas
- [ ] Arco emocional, estrutura e gancho avaliados individualmente
