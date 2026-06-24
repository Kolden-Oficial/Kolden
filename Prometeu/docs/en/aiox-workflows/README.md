# AIOX Workflows - Documentação Detalhada de Workflows

> **EN** | [PT](../../aiox-workflows/README.md) | [ES](../../es/aiox-workflows/README.md) | [ZH](../../zh/aiox-workflows/README.md)

---

**Versão:** 1.0.0
**Última Atualização:** 2026-02-05
**Status:** Documentação Oficial

---

## Visão Geral

Esta pasta contém a documentação detalhada de todos os workflows AIOX, incluindo:

- **Diagramas Mermaid completos** (flowchart, sequence, state)
- **Passos detalhados** com inputs/outputs
- **Agentes participantes** e seus papéis
- **Pontos de decisão** e condições
- **Pré-requisitos** e configurações
- **Troubleshooting** e modos de execução

---

## Workflows Documentados

### Por Tipo de Projeto

| Tipo | Workflow | Descrição | Documento |
|------|----------|-----------|-----------|
| **Greenfield** | Fullstack | Aplicações full-stack do zero | [greenfield-fullstack-workflow.md](./greenfield-fullstack-workflow.md) |
| **Greenfield** | Service | Backend/API do zero | [greenfield-service-workflow.md](./greenfield-service-workflow.md) |
| **Greenfield** | UI | Frontend do zero | [greenfield-ui-workflow.md](./greenfield-ui-workflow.md) |
| **Brownfield** | Discovery | Análise de projeto existente | [brownfield-discovery-workflow.md](./brownfield-discovery-workflow.md) |
| **Brownfield** | Fullstack | Evolução de full-stack existente | [brownfield-fullstack-workflow.md](./brownfield-fullstack-workflow.md) |
| **Brownfield** | Service | Evolução de backend existente | [brownfield-service-workflow.md](./brownfield-service-workflow.md) |
| **Brownfield** | UI | Evolução de frontend existente | [brownfield-ui-workflow.md](./brownfield-ui-workflow.md) |

### Por Processo

| Processo | Workflow | Descrição | Documento |
|----------|----------|-----------|-----------|
| **Development** | Story Cycle | Ciclo completo de story | [story-development-cycle-workflow.md](./story-development-cycle-workflow.md) |
| **Quality** | QA Loop | Ciclo de qualidade | [qa-loop-workflow.md](./qa-loop-workflow.md) |
| **Spec** | Spec Pipeline | Pipeline de especificação | [spec-pipeline-workflow.md](./spec-pipeline-workflow.md) |
| **Design** | Design System | Construção de design system | [design-system-build-quality-workflow.md](./design-system-build-quality-workflow.md) |
| **Git** | Auto Worktree | Gestão automática de worktree | [auto-worktree-workflow.md](./auto-worktree-workflow.md) |

---

## Estrutura do Documento

Cada documento de workflow segue esta estrutura padrão:

```
1. Visão Geral
   - Objetivo do workflow
   - Tipos de projeto suportados
   - Quando usar / não usar

2. Diagrama Mermaid
   - Flowchart principal
   - Diagrama de estado
   - Diagrama de sequência

3. Passos Detalhados
   - ID, agente, ação
   - Inputs e outputs
   - Critérios de sucesso
   - Transições de status

4. Agentes Participantes
   - Papel de cada agente
   - Comandos relevantes

5. Tasks Executadas
   - Mapa de tasks por fase
   - Arquivos de task

6. Pré-requisitos
   - Configuração necessária
   - Documentação pré-requisito
   - Ferramentas integradas

7. Inputs e Outputs
   - Inputs do workflow
   - Outputs produzidos

8. Pontos de Decisão
   - Condições de ramificação
   - Critérios de bloqueio

9. Modos de Execução
   - YOLO (autônomo)
   - Interactive (balanceado)
   - Pre-Flight (planejamento)

10. Troubleshooting
    - Problemas comuns
    - Logs e diagnósticos

11. Changelog
    - Histórico de versões
```

---

## Mapa de Workflows

```mermaid
flowchart TB
    subgraph GREENFIELD["Greenfield (New Projects)"]
        GF["greenfield-fullstack"]
        GS["greenfield-service"]
        GU["greenfield-ui"]
    end

    subgraph BROWNFIELD["Brownfield (Existing Projects)"]
        BD["brownfield-discovery"]
        BF["brownfield-fullstack"]
        BS["brownfield-service"]
        BU["brownfield-ui"]
    end

    subgraph PROCESS["Processes"]
        SDC["story-development-cycle"]
        QAL["qa-loop"]
        SP["spec-pipeline"]
        DSB["design-system-build"]
        AW["auto-worktree"]
    end

    BD --> BF
    BD --> BS
    BD --> BU

    GF --> SDC
    GS --> SDC
    GU --> SDC
    BF --> SDC
    BS --> SDC
    BU --> SDC

    SDC --> QAL
    SP --> SDC

    style GREENFIELD fill:#c8e6c9
    style BROWNFIELD fill:#fff9c4
    style PROCESS fill:#e3f2fd
```

---

## Guia de Seleção de Workflow

### Projeto Novo?

```mermaid
flowchart TD
    A{Project Type?} --> B[Full-Stack]
    A --> C[Backend/API Only]
    A --> D[Frontend Only]

    B --> E[greenfield-fullstack]
    C --> F[greenfield-service]
    D --> G[greenfield-ui]
```

### Projeto Existente?

```mermaid
flowchart TD
    A{Know the Project?} --> |No| B[brownfield-discovery]
    A --> |Yes| C{Type of Change?}

    B --> C

    C --> D[Full-Stack]
    C --> E[Backend Only]
    C --> F[Frontend Only]

    D --> G[brownfield-fullstack]
    E --> H[brownfield-service]
    F --> I[brownfield-ui]
```

---

## Fluxo entre Workflows

| De | Para | Condição |
|----|------|----------|
| `brownfield-discovery` | `brownfield-*` | Após análise completa |
| `greenfield-*` | `story-development-cycle` | Para cada story |
| `brownfield-*` | `story-development-cycle` | Para cada story |
| `spec-pipeline` | `story-development-cycle` | Após spec aprovada |
| `story-development-cycle` | `qa-loop` | Na fase de QA |

---

## Como Usar Esta Documentação

### Para Iniciar um Projeto

1. Use o **Guia de Seleção** acima para escolher o workflow
2. Leia a **Visão Geral** do workflow escolhido
3. Verifique os **Pré-requisitos**
4. Siga os **Passos** em ordem

### Para Entender um Processo

1. Analise os **Diagramas Mermaid**
2. Veja os **Agentes Participantes** e seus papéis
3. Consulte os **Pontos de Decisão**

### Para Depurar Problemas

1. Vá para a seção **Troubleshooting**
2. Verifique **Logs e Diagnósticos**
3. Consulte os **Critérios de Sucesso** de cada passo

---

## Relação com Outras Documentações

| Documentação | Localização | Propósito |
|--------------|-------------|-----------|
| Guia de Workflows | [docs/guides/workflows-guide.md](../../guides/workflows-guide.md) | Guia geral |
| Fluxos de Agentes | [docs/aiox-agent-flows/](../../aiox-agent-flows/) | Detalhes dos agentes |
| Comandos do Meta-Agente | [docs/meta-agent-commands.md](../../meta-agent-commands.md) | Referência rápida |

---

## Contribuindo

Para adicionar ou atualizar a documentação de workflows:

1. Siga a estrutura padrão descrita acima
2. Inclua diagramas Mermaid completos
3. Documente todos os inputs/outputs
4. Mantenha o changelog atualizado
5. Crie traduções em EN e ES

---

*AIOX Workflows Documentation v1.0 - Documentação detalhada dos workflows de desenvolvimento*
