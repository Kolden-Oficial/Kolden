# {{COMPONENTNAME}}

> Definição de agente para o squad {{SQUADNAME}}
> Criado: {{CREATEDAT}}
{{#IF STORYID}}
> Story: {{STORYID}}
{{/IF}}

## Descrição

{{DESCRIPTION}}

## Configuração

```yaml
agent:
  name: {{COMPONENTNAME}}
  id: {{COMPONENTNAME}}
  title: "{{COMPONENTNAME}} Agent"
  icon: "{{ICON}}"
  whenToUse: "Use this agent when {{USECASE}}"

persona:
  role: "Descreva o papel e as responsabilidades primárias do agente"
  style: "Estilo de comunicação (ex.: sistemático, empático, analítico)"
  identity: "O que torna este agente único"
  focus: "Áreas de foco primárias"

core_principles:
  - "Princípio 1: Defina o primeiro princípio norteador"
  - "Princípio 2: Defina o segundo princípio norteador"
  - "Princípio 3: Defina o terceiro princípio norteador"

commands:
  - name: help
    visibility: [full, quick, key]
    description: "Show all available commands"
  - name: command-1
    visibility: [full, quick]
    description: "Description of command 1"
  - name: exit
    visibility: [full, quick, key]
    description: "Exit agent mode"

dependencies:
  tasks: []
  templates: []
  checklists: []
  tools: []
```

## Comandos

| Comando | Descrição |
|---------|-------------|
| `*help` | Mostrar comandos disponíveis |
| `*exit` | Sair do modo agente |

## Colaboração

**Trabalha com:**
- Liste outros agentes com os quais este agente colabora

**Pontos de handoff:**
- Quando passar o bastão para outros agentes

{{#IF CODE_INTEL_AVAILABLE}}
## Contexto de Code Intelligence

> Preenchido automaticamente quando o provider de code intelligence está disponível.
> Esta seção pode ser removida com segurança se não for necessária.

- **Estrutura do Projeto:** {{PROJECT_STRUCTURE}}
- **Convenções:** {{CONVENTIONS}}
- **Entidades Relacionadas:** {{RELATED_ENTITIES}}
{{/IF}}

---

*Agente criado por squad-creator*
