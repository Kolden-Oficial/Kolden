# Workflow de QA Loop

> **EN** | [PT](../../aiox-workflows/qa-loop-workflow.md) | [ES](../../es/aiox-workflows/qa-loop-workflow.md)

---

**Documentação completa disponível em:** [Versão em Português](../../aiox-workflows/qa-loop-workflow.md)

---

## Resumo

O **Workflow de QA Loop** define o ciclo de garantia de qualidade dentro do desenvolvimento AIOX. Ele assegura:

- Cobertura de testes abrangente
- Padrões de qualidade de código
- Validação de performance
- Verificações de segurança
- Conformidade de acessibilidade

### Quando Usar

- Durante a fase de QA do story-development-cycle
- Para sessões dedicadas de revisão de qualidade
- Antes da preparação de release

### Agentes Principais

- `@qa` - Garantia de qualidade primária
- `@dev` - Correções de bugs e melhorias
- `@architect` - Revisão de arquitetura

### Fases Principais

1. **Planejamento de Testes** - Estratégia de testes e metas de cobertura
2. **Testes Automatizados** - Testes unitários, de integração e E2E
3. **Revisão Manual** - Revisão de código e testes exploratórios
4. **Rastreamento de Problemas** - Identificação e priorização de bugs
5. **Resolução** - Implementação de correções e verificação

### Quality Gates

- Todos os testes passando
- Linting e checagem de tipos sem erros
- Limiares de cobertura de código atingidos
- Nenhum problema crítico de segurança

---

*Para detalhes completos, diagramas e instruções passo a passo, consulte a [documentação em Português](../../aiox-workflows/qa-loop-workflow.md).*
