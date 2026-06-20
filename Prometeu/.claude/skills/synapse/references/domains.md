# Referência de Domains do SYNAPSE

## O que é um Domain?

Um domain é um arquivo de texto que contém regras KEY=VALUE que o SYNAPSE injeta nos prompts. Cada domain é mapeado para um layer específico (L0-L7) e é registrado no arquivo manifest (`.synapse/manifest`).

Os domains vivem em `.synapse/` e usam um formato simples KEY=VALUE com comentários.

## Tipos de Domain por Layer

| Layer | Tipo | Disparo | Arquivos de Exemplo |
|-------|------|---------|---------------|
| L0 | Constitution | Sempre ativo (`ALWAYS_ON=true`, `NON_NEGOTIABLE=true`) | `constitution` |
| L1 | Global | Sempre ativo (`ALWAYS_ON=true`) | `global`, `context` |
| L2 | Com escopo de agente | O agente ativo corresponde a `AGENT_TRIGGER` | `agent-dev`, `agent-qa`, `agent-architect` |
| L3 | Com escopo de workflow | O workflow ativo corresponde a `WORKFLOW_TRIGGER` | `workflow-story-dev`, `workflow-epic-create` |
| L4 | Contexto de task | Task ativa detectada na sessão | (injetado dinamicamente) |
| L5 | Descoberta de squad | O squad está ativo na sessão | (domains de squad) |
| L6 | Keyword (RECALL) | O prompt do usuário contém uma keyword do campo `RECALL` | (domains disparados por keyword) |
| L7 | Star-commands | O usuário digita `*command` no prompt | `commands` |

## Formato KEY=VALUE

### Regras de Sintaxe

```
# Comentários começam com #
# Linhas vazias são ignoradas

# Chaves usam SCREAMING_SNAKE_CASE com prefixo de domain
DOMAINPREFIX_RULE_0=First rule text
DOMAINPREFIX_RULE_1=Second rule text

# Comentários agrupados descrevem seções de regras
# [section-name] COMMAND:
#   0. First behavior
#   1. Second behavior
```

### Convenção de Nomenclatura de Chaves

```
{DOMAIN_KEY}_RULE_{INDEX}={RULE_TEXT}
```

- `DOMAIN_KEY`: Prefixo único que corresponde ao registro no manifest (ex.: `CONSTITUTION`, `GLOBAL`, `AGENT_DEV`)
- `RULE`: A palavra literal `RULE` (ou `STATE`, `ALWAYS_ON`, etc. para chaves do manifest)
- `INDEX`: Inteiro de base zero ou sufixo descritivo
- `RULE_TEXT`: Conteúdo da regra em texto puro

### Exemplo: Domain de Agente

```
# SYNAPSE Agent Domain: @dev (L2)
# Agent-scoped rules for developer agent
# Source: .aiox-core/development/agents/dev.md

AGENT_DEV_RULE_0=Follow story tasks sequentially — read task, implement, test, mark [x]
AGENT_DEV_RULE_1=ONLY update Dev Agent Record sections in story files
AGENT_DEV_RULE_2=Run CodeRabbit pre-commit review before marking story complete
```

### Exemplo: Domain de Workflow

```
# SYNAPSE Workflow Domain: Story Development (L3)

WORKFLOW_STORY_DEV_RULE_0=Follow SDC phases: Create → Validate → Implement → QA Gate
WORKFLOW_STORY_DEV_RULE_1=Update story checkboxes as tasks complete
```

## Registro no Manifest

Todo domain deve ser registrado em `.synapse/manifest`. O manifest usa o mesmo formato KEY=VALUE:

### Chaves Obrigatórias do Manifest

| Chave | Finalidade | Exemplo |
|-----|---------|---------|
| `{PREFIX}_STATE` | Estado ativo do domain (`active` ou `inactive`) | `AGENT_DEV_STATE=active` |

### Chaves Opcionais do Manifest

| Chave | Finalidade | Exemplo |
|-----|---------|---------|
| `{PREFIX}_ALWAYS_ON` | Domain sempre carregado (L0, L1) | `CONSTITUTION_ALWAYS_ON=true` |
| `{PREFIX}_NON_NEGOTIABLE` | Não pode ser sobreposto (apenas L0) | `CONSTITUTION_NON_NEGOTIABLE=true` |
| `{PREFIX}_AGENT_TRIGGER` | Ativar quando o agente corresponder (L2) | `AGENT_DEV_AGENT_TRIGGER=dev` |
| `{PREFIX}_WORKFLOW_TRIGGER` | Ativar quando o workflow corresponder (L3) | `WORKFLOW_STORY_DEV_WORKFLOW_TRIGGER=story_development` |
| `{PREFIX}_RECALL` | Keywords que disparam o domain (L6) | `MYLIB_RECALL=react,hooks` |
| `{PREFIX}_EXCLUDE` | Agentes/contextos dos quais excluir | `MYLIB_EXCLUDE=qa` |

### Domains Atuais do Manifest

O manifest em `.synapse/manifest` registra:
- 1 domain Constitution (L0, NON_NEGOTIABLE, ALWAYS_ON)
- 2 domains Global (L1, ALWAYS_ON): `global`, `context`
- 1 domain Commands (L7): `commands`
- 12 domains de Agente (L2): um por agente central (`agent-dev`, `agent-qa`, etc.)
- 3 domains de Workflow (L3): `workflow-story-dev`, `workflow-epic-create`, `workflow-arch-review`

## Criando Domains Personalizados

Use o comando CRUD para criar um novo domain:

```
*synapse create
```

Isso irá:
1. Perguntar o nome do domain, o layer e a descrição
2. Criar o arquivo de domain em `.synapse/`
3. Adicionar a entrada no manifest em `.synapse/manifest`
4. Validar se o formato é parseável pelo domain-loader

Para o template do arquivo de domain, veja: `.claude/commands/synapse/templates/domain-template`

Para o template de entrada no manifest, veja: `.claude/commands/synapse/templates/manifest-entry-template`

## Arquivos-Fonte

| Arquivo | Finalidade |
|------|---------|
| `.synapse/manifest` | Registro central de domains |
| `.synapse/*` | Arquivos de conteúdo de domain |
| `.aiox-core/core/synapse/domain/domain-loader.js` | Parser de domain (SYN-1) |
