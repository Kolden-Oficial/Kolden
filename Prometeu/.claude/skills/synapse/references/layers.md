---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.claude/skills/synapse/references/brackets|brackets]]"
  - "[[Prometeu/.claude/skills/synapse/references/commands|commands]]"
  - "[[Prometeu/.claude/skills/synapse/references/domains|domains]]"
  - "[[Prometeu/.claude/skills/synapse/references/manifest|manifest]]"
---

# Referência da Arquitetura de 8 Layers do SYNAPSE

## Visão Geral

O SYNAPSE processa regras por meio de um pipeline de 8 layers executado sequencialmente em cada prompt. Cada layer tem uma finalidade, uma condição de disparo e um nível de prioridade específicos. O orquestrador do motor (`.aiox-core/core/synapse/engine.js`) encadeia todos os layers e o formatter de saída produz o bloco XML `<synapse-rules>` final.

## Pipeline de Layers

```
L0 Constitution → L1 Global → L2 Agent → L3 Workflow → L4 Task → L5 Squad → L6 Keyword → L7 Star-Command
```

Os layers executam em ordem. A saída de cada layer é coletada e passada ao formatter.

## Detalhes dos Layers

### L0: Constitution (NON-NEGOTIABLE)

| Propriedade | Valor |
|----------|-------|
| **Finalidade** | Impor princípios invioláveis do framework (6 artigos) |
| **Disparo** | Sempre ativo (`ALWAYS_ON=true`, `NON_NEGOTIABLE=true`) |
| **Prioridade** | Máxima — não pode ser sobreposto por nenhum outro layer |
| **Arquivo de domain** | `.synapse/constitution` |
| **Fonte** | Gerado automaticamente a partir de `.aiox-core/constitution.md` via `generate-constitution.js` |
| **Implementação** | `.aiox-core/core/synapse/layers/l0-constitution.js` |

**Artigos:** CLI First, Agent Authority, Story-Driven Development, No Invention, Quality First, Absolute Imports.

### L1: Global + Context

| Propriedade | Valor |
|----------|-------|
| **Finalidade** | Regras universais aplicadas a todos os prompts + comportamento específico por bracket |
| **Disparo** | Sempre ativo (`ALWAYS_ON=true`) |
| **Prioridade** | Alta — aplica-se a todo prompt independentemente do contexto |
| **Arquivos de domain** | `.synapse/global`, `.synapse/context` |
| **Implementação** | `.aiox-core/core/synapse/layers/l1-global.js` |

**Conteúdo:** Padrões de codificação, regras de import, regras de TypeScript, padrões de tratamento de erro, regras de contexto específicas por bracket.

### L2: Com Escopo de Agente

| Propriedade | Valor |
|----------|-------|
| **Finalidade** | Injetar regras específicas do agente quando um agente está ativo |
| **Disparo** | `AGENT_TRIGGER` corresponde ao ID do agente ativo na sessão |
| **Prioridade** | Média-alta — ativo apenas quando o agente está ativado |
| **Arquivos de domain** | `.synapse/agent-dev`, `.synapse/agent-qa`, `.synapse/agent-architect`, etc. (12 no total) |
| **Implementação** | `.aiox-core/core/synapse/layers/l2-agent.js` |

**Agentes cobertos:** dev, qa, architect, pm, po, sm, devops, analyst, data-engineer, ux (ux-design-expert), aiox-master, squad-creator.

### L3: Com Escopo de Workflow

| Propriedade | Valor |
|----------|-------|
| **Finalidade** | Injetar regras específicas do workflow quando um workflow está ativo |
| **Disparo** | `WORKFLOW_TRIGGER` corresponde ao workflow ativo na sessão |
| **Prioridade** | Média — ativo durante workflows de desenvolvimento específicos |
| **Arquivos de domain** | `.synapse/workflow-story-dev`, `.synapse/workflow-epic-create`, `.synapse/workflow-arch-review` |
| **Implementação** | `.aiox-core/core/synapse/layers/l3-workflow.js` |

### L4: Contexto de Task

| Propriedade | Valor |
|----------|-------|
| **Finalidade** | Injetar contexto sobre a task atualmente ativa |
| **Disparo** | Task ativa detectada no estado da sessão |
| **Prioridade** | Média — ativo durante a execução da task |
| **Arquivos de domain** | Dinâmico (injetado a partir do contexto da sessão) |
| **Implementação** | `.aiox-core/core/synapse/layers/l4-task.js` |

### L5: Descoberta de Squad

| Propriedade | Valor |
|----------|-------|
| **Finalidade** | Descobrir e injetar regras de domains de squad ativos |
| **Disparo** | O squad está ativo na sessão |
| **Prioridade** | Média-baixa — apenas ao trabalhar com squads |
| **Arquivos de domain** | Domains específicos de squad (descobertos em runtime) |
| **Implementação** | `.aiox-core/core/synapse/layers/l5-squad.js` |

### L6: Keyword (RECALL)

| Propriedade | Valor |
|----------|-------|
| **Finalidade** | Ativar domains quando o prompt do usuário contém keywords correspondentes |
| **Disparo** | O prompt do usuário contém uma keyword listada no campo `RECALL` do domain |
| **Prioridade** | Baixa — opcional, pulado no bracket DEPLETED para conservar tokens |
| **Arquivos de domain** | Qualquer domain com a chave `RECALL` no manifest |
| **Implementação** | `.aiox-core/core/synapse/layers/l6-keyword.js` |

### L7: Star-Command

| Propriedade | Valor |
|----------|-------|
| **Finalidade** | Detectar e injetar comandos de troca de modo (`*brief`, `*dev`, `*synapse status`, etc.) |
| **Disparo** | O usuário digita `*command` no prompt |
| **Prioridade** | Máxima para comandos explícitos — a intenção do usuário é soberana |
| **Arquivo de domain** | `.synapse/commands` |
| **Implementação** | `.aiox-core/core/synapse/layers/l7-star-command.js` |

## Fluxo de Execução do Pipeline

```
1. O hook recebe o evento UserPromptSubmit (JSON via stdin)
2. O motor calcula o bracket de contexto (contagem de prompts → percentual → bracket)
3. O motor determina os layers ativos para o bracket atual
4. Para cada layer ativo (L0 → L7):
   a. O processador do layer carrega o(s) domain(s) relevante(s)
   b. As regras são filtradas/resolvidas
   c. A saída do layer é coletada
5. O memory bridge é consultado (se o pro estiver disponível, brackets DEPLETED/CRITICAL)
6. O formatter monta o XML <synapse-rules> dentro do orçamento de tokens
7. A saída é escrita no stdout (anexada ao prompt do usuário)
```

## Resolução de Conflitos

Quando regras de diferentes layers entram em conflito:

1. **NON_NEGOTIABLE vence** — as regras L0 Constitution não podem ser sobrepostas
2. **Número de layer maior = mais específico** — L7 Star-Command sobrepõe L1 Global para o prompt atual
3. **Agent > Global** — as regras com escopo de agente L2 têm precedência sobre as regras globais L1
4. **Workflow > Agent** — as regras de workflow L3 podem complementar as regras de agente L2
5. **Explícito > Implícito** — star-commands (intenção explícita do usuário) sobrepõem regras automáticas

## Formato de Saída

O formatter produz uma saída XML:

```xml
<synapse-rules>
[CONTEXT BRACKET: MODERATE] 40-60% context remaining — all layers active
[CONSTITUTION] (NON-NEGOTIABLE) CLI First | Agent Authority | Story-Driven | No Invention | Quality First | Absolute Imports
[ACTIVE AGENT: @dev] Follow story tasks, update Dev Agent Record only, CodeRabbit pre-commit
[ACTIVE WORKFLOW: story_development] Follow SDC phases, update checkboxes
[TASK CONTEXT] Current task details
[SQUAD: mmos] Squad-specific rules
[STAR-COMMANDS] *dev: Code over explanation, minimal changes
[DEVMODE STATUS] Pipeline metrics (if DEVMODE=true)
[LOADED DOMAINS SUMMARY] constitution, global, context, agent-dev, workflow-story-dev, commands
</synapse-rules>
```

**Ordenação de seções** (a de maior prioridade primeiro):
1. CONTEXT_BRACKET
2. CONSTITUTION
3. AGENT
4. WORKFLOW
5. TASK
6. SQUAD
7. KEYWORD
8. MEMORY_HINTS
9. STAR_COMMANDS
10. DEVMODE
11. SUMMARY

## Metas de Desempenho

| Métrica | Meta | Limite Rígido |
|--------|--------|------------|
| Pipeline total | <70ms | <100ms |
| Layer individual | <15ms | <20ms (L0/L7: <5ms) |
| Inicialização (descoberta de .synapse/) | <5ms | <10ms |
| I/O de sessão | <10ms | <15ms |

**Comportamento de timeout:** Se algum layer exceder seu limite de tempo, ele é pulado com um aviso. O pipeline nunca bloqueia o prompt.

## Arquivos-Fonte

| Arquivo | Finalidade |
|------|---------|
| `.aiox-core/core/synapse/engine.js` | Orquestrador SynapseEngine |
| `.aiox-core/core/synapse/layers/l0-constitution.js` | Processador L0 |
| `.aiox-core/core/synapse/layers/l1-global.js` | Processador L1 |
| `.aiox-core/core/synapse/layers/l2-agent.js` | Processador L2 |
| `.aiox-core/core/synapse/layers/l3-workflow.js` | Processador L3 |
| `.aiox-core/core/synapse/layers/l4-task.js` | Processador L4 |
| `.aiox-core/core/synapse/layers/l5-squad.js` | Processador L5 |
| `.aiox-core/core/synapse/layers/l6-keyword.js` | Processador L6 |
| `.aiox-core/core/synapse/layers/l7-star-command.js` | Processador L7 |
| `.aiox-core/core/synapse/layers/layer-processor.js` | Classe base abstrata |
| `.aiox-core/core/synapse/output/formatter.js` | Formatter XML + orçamento de tokens |
| `.claude/hooks/synapse-engine.js` | Ponto de entrada do hook |
