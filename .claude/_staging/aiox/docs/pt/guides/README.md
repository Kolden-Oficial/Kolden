---
tipo: doc
area: staging-aiox
up: "[[.claude/_staging/aiox/_MOC-staging-aiox]]"
relacionado:
  - "[[.claude/_staging/aiox/docs/pt/guides/ade-guide|ade-guide]]"
  - "[[.claude/_staging/aiox/docs/pt/guides/agent-selection-guide|agent-selection-guide]]"
  - "[[.claude/_staging/aiox/docs/pt/guides/api-reference|api-reference]]"
  - "[[.claude/_staging/aiox/docs/pt/guides/build-recovery-guide|build-recovery-guide]]"
  - "[[.claude/_staging/aiox/docs/pt/guides/contextual-greeting-system-guide|contextual-greeting-system-guide]]"
  - "[[.claude/_staging/aiox/docs/pt/guides/contributing-squads|contributing-squads]]"
  - "[[.claude/_staging/aiox/docs/pt/guides/development-setup|development-setup]]"
  - "[[.claude/_staging/aiox/docs/pt/guides/ide-sync-guide|ide-sync-guide]]"
  - "[[.claude/_staging/aiox/docs/pt/guides/installation-troubleshooting|installation-troubleshooting]]"
  - "[[.claude/_staging/aiox/docs/pt/guides/llm-routing|llm-routing]]"
  - "[[.claude/_staging/aiox/docs/pt/guides/mcp-global-setup|mcp-global-setup]]"
  - "[[.claude/_staging/aiox/docs/pt/guides/permission-modes|permission-modes]]"
  - "[[.claude/_staging/aiox/docs/pt/guides/project-status-feature|project-status-feature]]"
  - "[[.claude/_staging/aiox/docs/pt/guides/quality-dashboard|quality-dashboard]]"
  - "[[.claude/_staging/aiox/docs/pt/guides/quality-gates|quality-gates]]"
  - "[[.claude/_staging/aiox/docs/pt/guides/security-hardening|security-hardening]]"
  - "[[.claude/_staging/aiox/docs/pt/guides/service-discovery|service-discovery]]"
  - "[[.claude/_staging/aiox/docs/pt/guides/squad-migration|squad-migration]]"
  - "[[.claude/_staging/aiox/docs/pt/guides/squads-guide|squads-guide]]"
  - "[[.claude/_staging/aiox/docs/pt/guides/squads-overview|squads-overview]]"
  - "[[.claude/_staging/aiox/docs/pt/guides/template-engine-v2|template-engine-v2]]"
  - "[[.claude/_staging/aiox/docs/pt/guides/testing-guide|testing-guide]]"
  - "[[.claude/_staging/aiox/docs/pt/guides/user-guide|user-guide]]"
  - "[[.claude/_staging/aiox/docs/pt/guides/workflows-guide|workflows-guide]]"
---

<!--
  Tradução: PT-BR
  Original: /docs/en/guides/README.md
  Última sincronização: 2026-01-26
-->

# Guias AIOX

> 🌐 [EN](../../guides/README.md) | **PT** | [ES](../../es/guides/README.md)

---

Índice completo de documentação para os guias do sistema AIOX.

---

## Configuração MCP (Docker MCP Toolkit)

**Status:** Pronto para Produção
**Redução de Tokens:** 85%+ (vs MCPs diretos)
**Tempo de Setup:** 10-20 minutos

### Início Rápido

**Quer configuração MCP otimizada?**
Use o agente DevOps: `@devops` e então `*setup-mcp-docker`

### Comandos de Gerenciamento MCP

| Comando             | Descrição                                | Agente  |
| ------------------- | ---------------------------------------- | ------- |
| `*setup-mcp-docker` | Setup inicial do Docker MCP Toolkit      | @devops |
| `*search-mcp`       | Pesquisar MCPs disponíveis no catálogo   | @devops |
| `*add-mcp`          | Adicionar servidor MCP ao gateway Docker | @devops |
| `*list-mcps`        | Listar MCPs habilitados atualmente       | @devops |
| `*remove-mcp`       | Remover MCP do gateway Docker            | @devops |

### Referência de Arquitetura

| Guia                                                                              | Propósito                           | Tempo  | Público           |
| --------------------------------------------------------------------------------- | ----------------------------------- | ------ | ----------------- |
| **[Guia de Setup Global MCP](./mcp-global-setup.md)**                             | Configuração global de servidor MCP | 10 min | Todos os usuários |
| **[Gerenciamento de Chaves API MCP](../architecture/mcp-api-keys-management.md)** | Manuseio seguro de credenciais      | 10 min | DevOps            |

> **Nota:** A documentação do 1MCP foi descontinuada. O AIOX agora usa exclusivamente o Docker MCP Toolkit (Story 5.11). Documentos arquivados disponíveis em `.github/deprecated-docs/guides/`.

---

## Documentação do Framework v4.2

**Status:** Completo (Story 2.16)
**Versão:** 2.1.0
**Última Atualização:** 2025-12-17

### Arquitetura Principal

| Guia                                                                      | Propósito                               | Tempo  | Público                       |
| ------------------------------------------------------------------------- | --------------------------------------- | ------ | ----------------------------- |
| **[Arquitetura do Sistema de Módulos](../architecture/module-system.md)** | Arquitetura modular v4.2 (4 módulos)    | 15 min | Arquitetos, Desenvolvedores   |
| **[Guia de Service Discovery](./service-discovery.md)**                   | Descoberta de workers e API do registro | 10 min | Desenvolvedores               |
| **[Guia de Migração v2.0→v4.0.4](../../migration/migration-guide.md)**         | Instruções passo a passo de migração    | 20 min | Todos os usuários atualizando |

### Configuração do Sistema

| Guia                                                    | Propósito                             | Tempo  | Público           |
| ------------------------------------------------------- | ------------------------------------- | ------ | ----------------- |
| **[Guia de Quality Gates](./quality-gates.md)**         | Sistema de quality gates de 3 camadas | 15 min | QA, DevOps        |
| **[Guia do Quality Dashboard](./quality-dashboard.md)** | Visualização de métricas no dashboard | 10 min | Tech Leads, QA    |
| **[Guia de Setup Global MCP](./mcp-global-setup.md)**   | Configuração global de servidor MCP   | 10 min | Todos os usuários |

### Ferramentas de Desenvolvimento (Sprint 3)

| Guia                                              | Propósito                      | Tempo  | Público         |
| ------------------------------------------------- | ------------------------------ | ------ | --------------- |
| **[Template Engine v2](./template-engine-v2.md)** | Motor de geração de documentos | 10 min | Desenvolvedores |

### Navegação Rápida (v4)

**...entender a arquitetura de 4 módulos**
→ [`module-system.md`](../architecture/module-system.md) (15 min)

**...descobrir workers e tasks disponíveis**
→ [`service-discovery.md`](./service-discovery.md) (10 min)

**...migrar de v2.0 para v4.0.4**
→ [`migration-guide.md`](../../migration/migration-guide.md) (20 min)

**...configurar quality gates**
→ [`quality-gates.md`](./quality-gates.md) (15 min)

**...monitorar dashboard de métricas de qualidade**
→ [`quality-dashboard.md`](./quality-dashboard.md) (10 min)

**...usar o template engine**
→ [`template-engine-v2.md`](./template-engine-v2.md) (10 min)

**...configurar integração CodeRabbit**

**...configurar servidores MCP globais**
→ [`mcp-global-setup.md`](./mcp-global-setup.md) (10 min)

---

## Outros Guias

- [Guia de Referência de Agentes](../agent-reference-guide.md)
- [Guia de Workflow Git](../git-workflow-guide.md)
- [Primeiros Passos](../getting-started.md)
- [Solução de Problemas de Instalação](./installation-troubleshooting.md)
- [Solução de Problemas](../troubleshooting.md)

---

## Documentação do Sprint 3

| Documento                                           | Linhas | Status   |
| --------------------------------------------------- | ------ | -------- |
| [Guia de Quality Gates](./quality-gates.md)         | ~600   | Completo |
| [Guia do Quality Dashboard](./quality-dashboard.md) | ~350   | Completo |
| [Template Engine v2](./template-engine-v2.md)       | ~400   | Completo |
| [Integração CodeRabbit](../../guides/coderabbit/)   | ~1000  | Completo |

---

## Suporte

- **GitHub Issues:** Marque `documentation`, `guides`, `mcp`
- **Especialistas:** Veja arquivo CODEOWNERS

---

**Última Atualização:** 2025-12-17
**Versão:** 2.1 (Story 6.14)
