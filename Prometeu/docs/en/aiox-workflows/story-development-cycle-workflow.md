---
tipo: doc
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/docs/en/aiox-workflows/README|README]]"
---

# Workflow do Story Development Cycle

> **EN** | [PT](../../aiox-workflows/story-development-cycle-workflow.md) | [ES](../../es/aiox-workflows/story-development-cycle-workflow.md)

---

**Documentação completa disponível em:** [Versão em Português](../../aiox-workflows/story-development-cycle-workflow.md)

---

## Resumo

O **Workflow do Story Development Cycle** é o processo central de desenvolvimento no AIOX. Ele orquestra o ciclo de vida completo da implementação de uma user story:

- Decomposição da story e criação de tasks
- Abordagem de desenvolvimento test-first
- Implementação iterativa
- Revisão de código e quality gates
- Atualizações de documentação

### Quando Usar

- Para toda implementação de story no AIOX
- Chamado pelos workflows greenfield e brownfield
- Após a aprovação do spec-pipeline

### Agentes Principais

- `@po` - Gestão de stories
- `@dev` - Implementação
- `@qa` - Garantia de qualidade
- `@devops` - Deployment

### Fases Principais

1. **Preparação** - Revisão da story e decomposição em tasks
2. **Desenvolvimento** - Ciclo de implementação test-first
3. **Qualidade** - Revisão de código e testes
4. **Integração** - Preparação de merge e deployment
5. **Encerramento** - Conclusão da story e documentação

### Modos de Execução

- **YOLO** - Execução totalmente autônoma
- **Interactive** - Checkpoints humanos em decisões-chave
- **Pre-Flight** - Apenas planejamento, sem execução

---

*Para detalhes completos, diagramas e instruções passo a passo, consulte a [documentação em Português](../../aiox-workflows/story-development-cycle-workflow.md).*
