---
task: reviewBrandingOutput()
responsavel: "@brand-chief"
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
  - campo: Relatório de Revisão
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Checklist de qualidade aplicado à saída do especialista"
  - "[ ] Veredito emitido (APROVAR/REVISAR/REJEITAR)"
  - "[ ] Feedback específico fornecido para quaisquer falhas"
---

# Tarefa: Revisar Saída de Branding

**Task ID:** BRAND-CHIEF-002
**Version:** 1.0.0
**Comando:** `*review`
**Orquestrador:** Brand Chief (brand-chief)
**Propósito:** Revisar a saída do especialista contra o checklist de qualidade, pontuar e aprovar ou solicitar revisão.

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

1. Reler a requisição original do usuário
2. Identificar o que foi pedido vs o que foi entregue
3. Anotar o especialista que produziu a saída
4. Identificar o estágio de maturidade da marca: nascente, emergente, estabelecida, reposicionamento
5. Determinar o tipo de entregável: posicionamento, identidade, diretrizes de voz, naming, etc.

### Fase 2: Aplicar o Checklist de Qualidade

1. Carregar checklists/output-quality.md
2. Avaliar cada item contra a saída do especialista
3. Marcar cada item: [x] Passou, [ ] Falhou, [N/A] Não Aplicável
4. Contar as falhas CRÍTICAS e o total de falhas
5. Prestar atenção especial a: diferenciação de posicionamento, consistência de voz e alinhamento de arquétipo

### Fase 3: Pontuar e Decidir

| Pontuação | Veredito | Ação |
|-------|---------|--------|
| Todas as CRÍTICAS passam, < 2 não-críticas falham | APROVAR | Entregar ao usuário |
| Todas as CRÍTICAS passam, 2+ não-críticas falham | REVISAR | Devolver ao especialista com feedback específico |
| Qualquer CRÍTICA falha | REJEITAR | Devolver ao especialista, bloquear a entrega |

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
- [{CRÍTICA|ALERTA}] {descrição} — {recomendação}

### Notas Específicas de Marca
- Força do posicionamento: {avaliação}
- Consistência de voz: {avaliação}
- Diferenciação competitiva: {avaliação}

### Recomendação
{Próximo passo: entregar / revisar itens específicos / refazer}
```

---

## Condições de Veto

- NUNCA aprovar saída com falhas CRÍTICAS
- NUNCA rejeitar sem fornecer feedback específico e acionável
- NUNCA modificar a saída do especialista — apenas revisar e fornecer feedback
- NUNCA aprovar posicionamento que seja indistinguível dos concorrentes
- NUNCA aprovar elementos de marca com contradições internas (descompasso entre voz e valores)

---

## Critérios de Conclusão

- [ ] Requisição original relida e compreendida
- [ ] Estágio de maturidade da marca e tipo de entregável identificados
- [ ] Todos os itens do checklist avaliados
- [ ] Pontuação calculada
- [ ] Veredito emitido (APROVAR/REVISAR/REJEITAR)
- [ ] Feedback específico fornecido para quaisquer falhas
- [ ] Posicionamento, voz e arquétipo avaliados individualmente
