---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
---

# Workflows do AIOX

Este diretório contém as definições de workflow do framework Synkra AIOX. Workflows definem processos de múltiplos passos que podem ser executados pelos agentes do AIOX.

## Workflows Disponíveis

### Workflows de Desenvolvimento
- **brownfield-discovery.yaml** - Avaliação abrangente de dívida técnica para projetos existentes
- **brownfield-fullstack.yaml** - Workflow para projetos full-stack existentes
- **brownfield-service.yaml** - Workflow para projetos de serviço/backend existentes
- **brownfield-ui.yaml** - Workflow para projetos de UI/frontend existentes
- **greenfield-fullstack.yaml** - Workflow para novos projetos full-stack
- **greenfield-service.yaml** - Workflow para novos projetos de serviço/backend
- **greenfield-ui.yaml** - Workflow para novos projetos de UI/frontend

### Workflows de Configuração

## Workflow de Setup de Ambiente

O workflow `setup-environment` ajuda os desenvolvedores a configurar sua IDE para uma experiência ideal de desenvolvimento com o AIOX.

### Funcionalidades
- Faz backup das configurações de IDE existentes
- Aplica regras de desenvolvimento específicas do AIOX
- Verifica a instalação e autenticação do GitHub CLI
- Fornece feedback claro ao longo de todo o processo

### Uso

A partir do agente aiox-master:
```
@aiox-master
*setup-environment
```

Ou diretamente via npm:
```bash
npm run setup:environment
```

### O Que Ele Faz
2. **Verificação do GitHub CLI** - Garante que o GitHub CLI esteja instalado e autenticado
3. **Criação de Backup** - Salva as regras existentes antes de fazer mudanças
4. **Aplicação de Regras** - Copia as regras específicas do AIOX para os locais apropriados
5. **Verificação** - Confirma o sucesso do setup

### Locais das Regras de IDE
- **Cursor**: `.cursorules`
- **Claude Code**: `.claude/CLAUDE.md`

### Requisitos
- Node.js 18+
- Uma ou mais IDEs suportadas instaladas
- GitHub CLI (recomendado)

## Criando Novos Workflows

Workflows são definidos em formato YAML. Veja os workflows existentes para exemplos.

### Estrutura do Workflow
```yaml
workflow:
  id: unique-workflow-id
  name: Human-readable name
  description: What this workflow does
  type: configuration|development|deployment
  metadata:
    elicit: true  # If user interaction required
    confirmation_required: true
  sequence:
    - step: step_slug
      id: step-1
      agent: responsible-agent
      action: What this step does
      next: next-step-id

  # Optional compatibility metadata (non-executable)
  phases:
    - phase_1: Discovery
    - phase_2: Execution
```

## Boas Práticas
1. Mantenha os workflows focados em um único objetivo
2. Inclua tratamento de erros para cada passo
3. Forneça feedback claro ao usuário
4. Torne os workflows idempotentes quando possível
5. Documente os pré-requisitos e resultados
