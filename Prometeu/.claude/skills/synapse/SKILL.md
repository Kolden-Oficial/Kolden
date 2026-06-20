---
name: synapse
description: "Esta skill deve ser usada quando os usuários quiserem entender o motor de contexto SYNAPSE, gerenciar domains, configurar regras de contexto ou solucionar problemas de injeção de regras. Use quando perguntarem sobre a arquitetura do SYNAPSE, gerenciamento de domains, star-commands, brackets de contexto ou o pipeline de processamento de 8 layers."
---

# Motor de Contexto SYNAPSE

## Visão Geral

O SYNAPSE (Synkra Adaptive Processing & State Engine) é o motor de contexto unificado do AIOX. Ele injeta regras contextuais em cada prompt por meio de um pipeline de processamento de 8 layers, adaptando-se ao uso da janela de contexto através de filtragem ciente de brackets.

**O que ele faz:**
- Injeta regras por prompt via o hook `UserPromptSubmit` do Claude Code
- Processa 8 layers (L0 Constitution até L7 Star-Commands) sequencialmente
- Adapta o volume de injeção com base nos brackets de contexto (FRESH/MODERATE/DEPLETED/CRITICAL)
- Integra-se ao estado do agente (agente ativo, workflow, task, squad)
- Produz o bloco XML `<synapse-rules>` anexado a cada prompt

**O que ele substitui:** O SYNAPSE substitui o sistema legado CARL com paridade total de recursos, além de 8 novas capacidades, incluindo domains com escopo de agente, ativação de workflow e comandos de gerenciamento CRUD.

**Modelo de arquitetura:** Open Core — o motor de 8 layers vive em `aiox-core` (open source), e a integração de memória é feature-gated em `aiox-pro`.

## Início Rápido

### Verifique se o SYNAPSE Está Ativo

O SYNAPSE roda automaticamente via o hook do Claude Code. Para verificar o status:

```
*synapse status
```

Isso mostra: domains ativos, bracket atual, informações da sessão e layers carregados.

### Comandos Básicos

| Comando | O que ele faz |
|---------|-------------|
| `*synapse status` | Mostra o estado atual do motor |
| `*synapse domains` | Lista todos os domains registrados |
| `*synapse debug` | Mostra informações detalhadas de debug (parse do manifest, tempos de carregamento, contagem de regras) |
| `*synapse help` | Mostra todos os comandos synapse disponíveis |
| `*brief` | Alterna para o modo de resposta breve |
| `*dev` | Alterna para o modo de desenvolvedor (focado em código) |
| `*review` | Alterna para o modo de revisão de código |

### Crie um Domain Personalizado

```
*synapse create
```

Isso guia você na criação de um novo arquivo de domain + entrada no manifest. Veja [references/domains.md](references/domains.md) para o guia completo de domains.

## Arquitetura

O SYNAPSE opera como uma arquitetura de 4 layers:

```
.claude/hooks/synapse-engine.js          # Layer 1: Entrada do Hook (~50 linhas)
        |
        v importa
.aiox-core/core/synapse/                 # Layer 2: Módulos do Motor
|-- engine.js                            #   Classe SynapseEngine
|-- layers/                              #   8 processadores de layer (L0-L7)
|-- session/session-manager.js           #   Estado da sessão (JSON v2.0)
|-- domain/domain-loader.js              #   Parser de manifest + domain
|-- context/context-tracker.js           #   Cálculo de bracket
|-- memory/memory-bridge.js              #   Consumidor MIS feature-gated no Pro
|-- output/formatter.js                  #   XML <synapse-rules>
        |
        v lê/escreve
.synapse/                                # Layer 3: Dados de Runtime
|-- manifest                             #   Registro central de domains (KEY=VALUE)
|-- constitution, global, context        #   Domains centrais (L0, L1)
|-- agent-*, workflow-*                  #   Domains com escopo (L2, L3)
|-- commands                             #   Definições de star-command (L7)
|-- sessions/, cache/                    #   Estado da sessão (gitignored)
        |
        v invocado pelo usuário
.claude/commands/synapse/                # Layer 4: Comandos CRUD + Docs da Skill
|-- manager.md                           #   Roteador/dispatcher
|-- tasks/ (6 tasks)                     #   create, add, edit, toggle, command, suggest
```

**Princípio-chave:** O SYNAPSE é um **consumidor** de sistemas existentes (UAP para estado de sessão, MIS para memórias). Ele nunca reescreve código de outros epics.

## Referências

### Guias de Referência

| Guia | Descrição |
|-------|-------------|
| [domains.md](references/domains.md) | Tipos de domain (L0-L7), formato KEY=VALUE, guia de criação |
| [commands.md](references/commands.md) | Star-commands, sub-comandos *synapse, operações CRUD |
| [manifest.md](references/manifest.md) | Especificação do formato do manifest, todas as chaves válidas |
| [brackets.md](references/brackets.md) | Sistema de brackets de contexto, orçamentos de tokens, ativação de layers |
| [layers.md](references/layers.md) | Arquitetura do processador de 8 layers, prioridade, resolução de conflitos |

### Assets (Templates)

Templates para criar domains personalizados e entradas no manifest são mantidos em:

- **Template de domain:** `.claude/commands/synapse/templates/domain-template`
- **Template de entrada no manifest:** `.claude/commands/synapse/templates/manifest-entry-template`

Veja [assets/README.md](assets/README.md) para detalhes.

### Comandos CRUD

Para operações de gerenciamento de domain, use o manager do SYNAPSE:

| Comando | Finalidade |
|---------|---------|
| `*synapse create` | Criar novo domain + entrada no manifest |
| `*synapse add` | Adicionar regra a um domain existente |
| `*synapse edit` | Editar ou remover regra por índice |
| `*synapse toggle` | Alternar domain entre ativo/inativo |
| `*synapse command` | Criar novo star-command |
| `*synapse suggest` | Sugerir o melhor domain para uma regra |

Detalhes completos: [references/commands.md](references/commands.md)

## Arquivos-Chave

| Arquivo | Finalidade |
|------|---------|
| `.claude/hooks/synapse-engine.js` | Ponto de entrada do hook (UserPromptSubmit) |
| `.aiox-core/core/synapse/engine.js` | Orquestrador SynapseEngine |
| `.synapse/manifest` | Registro de domains (KEY=VALUE) |
| `.synapse/commands` | Definições de star-command |
| `.claude/commands/synapse/manager.md` | Roteador de comandos CRUD |
