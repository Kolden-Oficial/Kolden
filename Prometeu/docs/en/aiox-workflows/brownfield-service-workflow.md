---
tipo: doc
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/docs/en/aiox-workflows/README|README]]"
---

# Workflow Brownfield de Serviço

> **EN** | [PT](../../aiox-workflows/brownfield-service-workflow.md) | [ES](../../es/aiox-workflows/brownfield-service-workflow.md)

---

**Documentação completa disponível em:** [Versão em Português](../../aiox-workflows/brownfield-service-workflow.md)

---

## Resumo

O **Workflow Brownfield de Serviço** foi projetado para evoluir serviços de backend e APIs existentes. Ele foca em:

- Versionamento de API e compatibilidade retroativa
- Estratégias de migração de banco de dados
- Padrões de refatoração de serviços
- Otimização de performance
- Melhorias de segurança

### Quando Usar

- Estender APIs existentes com novos endpoints
- Refatorar serviços de backend
- Evolução de schema de banco de dados
- Melhorias de performance em serviços
- Após concluir o brownfield-discovery

### Pré-requisitos

- Execute o `brownfield-discovery` primeiro caso não conheça o projeto
- Compreenda os contratos de API existentes

### Agentes Principais

- `@architect` - Estratégia de evolução do serviço
- `@dev` - Implementação de backend
- `@data-engineer` - Planejamento de migrations
- `@qa` - Testes de contrato de API

### Fases Principais

1. **Análise de Contrato** - Revisão da API existente
2. **Planejamento de Migração** - Estratégia de versionamento de dados e API
3. **Implementação** - Mudanças no serviço
4. **Migração de Dados** - Atualizações do banco de dados
5. **Validação** - Testes de contrato e de regressão

---

*Para detalhes completos, diagramas e instruções passo a passo, veja a [documentação em Português](../../aiox-workflows/brownfield-service-workflow.md).*
