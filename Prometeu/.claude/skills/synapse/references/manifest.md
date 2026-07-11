---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.claude/skills/synapse/references/brackets|brackets]]"
  - "[[Prometeu/.claude/skills/synapse/references/commands|commands]]"
  - "[[Prometeu/.claude/skills/synapse/references/domains|domains]]"
  - "[[Prometeu/.claude/skills/synapse/references/layers|layers]]"
---

# Referência do Manifest do SYNAPSE

## Visão Geral

O manifest (`.synapse/manifest`) é o registro central de todos os domains do SYNAPSE. Ele usa um formato KEY=VALUE e determina quais domains são carregados, quando eles ativam e como se comportam.

O manifest é parseado pelo `domain-loader.js` (`.aiox-core/core/synapse/domain/domain-loader.js`) em cada prompt.

## Formato do Arquivo

```
# Comentários começam com #
# Linhas vazias são ignoradas

# Toggle do modo debug
DEVMODE=false

# Registro de domain: {PREFIX}_{KEY}={VALUE}
CONSTITUTION_STATE=active
CONSTITUTION_ALWAYS_ON=true
CONSTITUTION_NON_NEGOTIABLE=true
```

## Chaves Válidas

Todo domain é identificado por um prefixo único (ex.: `CONSTITUTION`, `GLOBAL`, `AGENT_DEV`). As seguintes chaves são válidas para cada prefixo:

### Chaves Obrigatórias

| Chave | Tipo | Descrição |
|-----|------|-------------|
| `{PREFIX}_STATE` | `active` \| `inactive` | Se o domain está carregado. Obrigatória para todo domain. |

### Chaves Opcionais

| Chave | Tipo | Descrição | Usada Por |
|-----|------|-------------|---------|
| `{PREFIX}_ALWAYS_ON` | `true` \| `false` | Domain sempre carregado independentemente do contexto | L0, L1 |
| `{PREFIX}_NON_NEGOTIABLE` | `true` \| `false` | Regras não podem ser sobrepostas por outros layers | Apenas L0 |
| `{PREFIX}_AGENT_TRIGGER` | string de ID de agente | Ativar quando este agente está ativo | L2 |
| `{PREFIX}_WORKFLOW_TRIGGER` | string de ID de workflow | Ativar quando este workflow está ativo | L3 |
| `{PREFIX}_RECALL` | keywords separadas por vírgula | Ativar quando o prompt do usuário contém a keyword | L6 |
| `{PREFIX}_EXCLUDE` | valores separados por vírgula | Contextos/agentes dos quais excluir o domain | Qualquer |

### Chave Global

| Chave | Tipo | Descrição |
|-----|------|-------------|
| `DEVMODE` | `true` \| `false` | Habilita métricas de debug na saída |

## Exemplo Completo de Manifest

Abaixo está a estrutura atual do manifest (de `.synapse/manifest`):

```
# Debug mode
DEVMODE=false

# Layer 0: Constitution (NON-NEGOTIABLE)
CONSTITUTION_STATE=active
CONSTITUTION_ALWAYS_ON=true
CONSTITUTION_NON_NEGOTIABLE=true

# Layer 1: Global (ALWAYS_ON)
GLOBAL_STATE=active
GLOBAL_ALWAYS_ON=true

# Layer 1: Context brackets (ALWAYS_ON)
CONTEXT_STATE=active
CONTEXT_ALWAYS_ON=true

# Layer 7: Star-commands
COMMANDS_STATE=active

# Layer 2: Agent-scoped domains
AGENT_DEV_STATE=active
AGENT_DEV_AGENT_TRIGGER=dev
AGENT_QA_STATE=active
AGENT_QA_AGENT_TRIGGER=qa
AGENT_ARCHITECT_STATE=active
AGENT_ARCHITECT_AGENT_TRIGGER=architect
# ... (12 agent domains total)

# Layer 3: Workflow domains
WORKFLOW_STORY_DEV_STATE=active
WORKFLOW_STORY_DEV_WORKFLOW_TRIGGER=story_development
WORKFLOW_EPIC_CREATE_STATE=active
WORKFLOW_EPIC_CREATE_WORKFLOW_TRIGGER=epic_creation
WORKFLOW_ARCH_REVIEW_STATE=active
WORKFLOW_ARCH_REVIEW_WORKFLOW_TRIGGER=architecture_review
```

## Mapeamento de Domain para Arquivo

O domain-loader resolve os prefixos de domain para arquivos em `.synapse/`:

| Prefixo | Arquivo | Layer |
|--------|------|-------|
| `CONSTITUTION` | `.synapse/constitution` | L0 |
| `GLOBAL` | `.synapse/global` | L1 |
| `CONTEXT` | `.synapse/context` | L1 |
| `COMMANDS` | `.synapse/commands` | L7 |
| `AGENT_DEV` | `.synapse/agent-dev` | L2 |
| `AGENT_QA` | `.synapse/agent-qa` | L2 |
| `WORKFLOW_STORY_DEV` | `.synapse/workflow-story-dev` | L3 |

**Convenção de nomenclatura:** O prefixo é derivado do nome do arquivo por meio de:
1. Conversão para SCREAMING_SNAKE_CASE
2. Remoção dos hífens e substituição por underscores

## Solução de Problemas

### Domain Não Carrega

1. Verifique se `{PREFIX}_STATE=active` no manifest
2. Confirme que o arquivo de domain existe em `.synapse/`
3. Para domains L2: confirme que `AGENT_TRIGGER` corresponde ao ID do agente ativo
4. Para domains L3: confirme que `WORKFLOW_TRIGGER` corresponde ao workflow ativo
5. Execute `*synapse debug` para ver os resultados do parse do manifest

### Erros de Formato Inválido

- As chaves devem usar SCREAMING_SNAKE_CASE
- Os valores não podem conter quebras de linha
- Sem espaços ao redor do sinal `=`
- Os comentários devem começar com `#` no início da linha

### Adicionando um Novo Domain

Use `*synapse create` ou manualmente:
1. Crie o arquivo de domain em `.synapse/` com regras KEY=VALUE
2. Adicione as chaves de registro em `.synapse/manifest`
3. Execute `*synapse reload` para recarregar a partir do disco

## Arquivos-Fonte

| Arquivo | Finalidade |
|------|---------|
| `.synapse/manifest` | O próprio arquivo manifest |
| `.aiox-core/core/synapse/domain/domain-loader.js` | Parser do manifest + carregador de arquivos de domain |
| `.claude/commands/synapse/utils/manifest-parser-reference.md` | Especificação detalhada do formato do parser |
| `.claude/commands/synapse/templates/manifest-entry-template` | Template para novas entradas no manifest |
