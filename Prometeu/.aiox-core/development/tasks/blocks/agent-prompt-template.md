---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/blocks/README|README]]"
---

# Bloco: Template de Prompt de Agente

> **Block ID:** `agent-prompt-template`
> **Version:** 1.0.0
> **Type:** Reusable Include Block

## Propósito

Template padronizado para instanciar agentes AIOX com estrutura consistente. Garante que todas as invocações de agentes sigam o mesmo padrão de carregamento de persona, contexto, missão e saída.

## Entrada

| Parâmetro | Tipo | Obrigatório | Padrão | Descrição |
|-----------|------|----------|---------|-------------|
| `agent_name` | string | Sim | - | Nome de exibição do agente (ex.: "Aria", "Max") |
| `agent_role` | string | Sim | - | Título do papel do agente (ex.: "Architect", "Dev") |
| `agent_file_path` | string | Sim | - | Caminho do arquivo de definição do agente |
| `context_category` | string | Não | `null` | Categoria para o bloco context-loading (ex.: "Architecture,Security") |
| `mission_description` | string | Sim | - | O que o agente deve realizar |
| `output_path` | string | Sim | - | Onde salvar o resultado |
| `output_format` | string | Não | `markdown` | Formato esperado (markdown, yaml, json) |

## Saída

| Campo | Tipo | Descrição |
|-------|------|-------------|
| `prompt` | string | Prompt completo do agente pronto para a ferramenta Task |

## Template Central

```markdown
Você é {agent_name}, o {agent_role} do AIOX. Leia seu arquivo de agente completo em:
{agent_file_path}

Adote a persona, a voz e a expertise de {agent_name}.

<!-- Include: blocks/context-loading.md -->
<!-- Parameters: category={context_category} -->

## Contexto

{context_from_user}

## Missão

{mission_description}

## Saída

Salve o resultado completo em: {output_path}

Formato: {output_format}

Após salvar, envie uma mensagem ao líder da equipe com um resumo.
```

## Uso

### Incluir em Arquivo de Skill

```markdown
<!-- Include: blocks/agent-prompt-template.md -->
<!-- Parameters:
  agent_name=Aria,
  agent_role=Architect,
  agent_file_path=.claude/commands/AIOX/agents/architect.md,
  context_category=Architecture,
  mission_description=Design the authentication module,
  output_path=docs/architecture/auth-design.md,
  output_format=markdown
-->
```

### Uso Programático

```javascript
const { loadBlock, renderTemplate } = require('.aiox-core/utils/block-loader');

const template = await loadBlock('agent-prompt-template');
const prompt = await renderTemplate(template, {
  agent_name: 'Aria',
  agent_role: 'Architect',
  agent_file_path: '.claude/commands/AIOX/agents/architect.md',
  context_category: 'Architecture',
  context_from_user: 'We need to design auth for a multi-tenant SaaS.',
  mission_description: 'Create detailed authentication architecture document.',
  output_path: 'docs/architecture/auth-design.md',
  output_format: 'markdown'
});

// Use with Task tool
Task({ prompt, subagent_type: 'general-purpose' });
```

## Arquivos Acessados

| Arquivo | Propósito |
|------|---------|
| Arquivo de agente em `{agent_file_path}` | Persona e capacidades do agente |
| Via bloco `context-loading` | Estado do git, gotchas, preferências |

## Tratamento de Erros

| Erro | Comportamento |
|-------|----------|
| Parâmetro obrigatório ausente | O bloco falha com erro de validação |
| Arquivo de agente não encontrado | O agente lê vazio, continua com os padrões |
| `output_format` inválido | Usa `markdown` como padrão |

## Notas

- O template tem menos de 20 linhas de conteúdo central
- Compõe-se com o bloco `context-loading` para o contexto do projeto
- Encerramento consistente com "envie uma mensagem ao líder da equipe" para orquestração
- Funciona tanto com padrões de invocação de agentes sequenciais quanto paralelos
