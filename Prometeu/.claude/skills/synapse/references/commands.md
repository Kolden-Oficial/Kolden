# Referência de Comandos do SYNAPSE

## Visão Geral

O SYNAPSE oferece três categorias de comandos:
1. **Star-commands de modo** — Alternam o comportamento de resposta (`*brief`, `*dev`, etc.)
2. **Sub-comandos `*synapse`** — Consultam e gerenciam o estado do motor
3. **Operações CRUD** — Criam, modificam e gerenciam domains e regras

## Star-Commands de Modo (L7)

Esses comandos alternam o modo de resposta para a sessão atual. Eles são detectados pelo L7 (processador de Star-Command) e injetam regras específicas do modo.

| Comando | Comportamento |
|---------|----------|
| `*brief` | Apenas bullet points, máximo de 5 itens, sem blocos de código a menos que solicitado, pula o preâmbulo |
| `*dev` | Código em vez de explicação, mudanças mínimas, segue os padrões existentes, pula docs a menos que necessário |
| `*review` | Verifica a qualidade e os padrões do código, identifica bugs/problemas de segurança, sugere melhorias com justificativa |
| `*plan` | Esboça a abordagem antes da implementação, lista os arquivos a modificar, identifica riscos, estima a complexidade |
| `*discuss` | Explora trade-offs e alternativas, faz perguntas esclarecedoras, apresenta prós/contras, recomenda com raciocínio |
| `*debug` | Analisa mensagens de erro e stack traces, verifica padrões comuns de falha, sugere correções direcionadas |
| `*explain` | Explica em detalhe didático, usa analogias, mostra exemplos com código, constrói do básico ao avançado |

**Uso:** Digite o comando em qualquer lugar do seu prompt. O modo persiste para aquela resposta.

**Fonte:** `.synapse/commands` (formato KEY=VALUE, `COMMANDS_RULE_{MODE}_{INDEX}`)

## Sub-Comandos `*synapse`

Esses comandos consultam ou controlam o estado do motor SYNAPSE.

| Comando | O que ele faz |
|---------|-------------|
| `*synapse help` | Mostra os comandos synapse disponíveis e suas descrições |
| `*synapse status` | Exibe o estado atual: domains ativos, layers, informações da sessão |
| `*synapse debug` | Mostra informações detalhadas de debug: resultados do parse do manifest, tempos de carregamento de domain, contagem de regras |
| `*synapse domains` | Lista todos os domains registrados com seu estado e condições de disparo |
| `*synapse session` | Mostra o contexto da sessão atual: agente ativo, workflow, nível de bracket |
| `*synapse reload` | Força o recarregamento do manifest e de todos os arquivos de domain a partir do disco |

**Observação:** Essas são operações somente leitura tratadas pelo processador de star-command L7 no hook. Elas não modificam nenhum arquivo.

## Operações CRUD

Esses comandos modificam os arquivos de domain e o manifest. Eles são implementados como comandos slash do Claude Code em `.claude/commands/synapse/`.

### Roteador

Todas as operações CRUD passam pelo manager: `.claude/commands/synapse/manager.md`

O manager faz o parse do sub-comando e o despacha para o arquivo de task apropriado.

### Operações Disponíveis

| Comando | Arquivo de Task | Finalidade |
|---------|-----------|---------|
| `*synapse create` | `tasks/create-domain.md` | Criar novo arquivo de domain + entrada no manifest |
| `*synapse add` | `tasks/add-rule.md` | Adicionar uma nova regra a um domain existente |
| `*synapse edit` | `tasks/edit-rule.md` | Editar ou remover uma regra por índice |
| `*synapse toggle` | `tasks/toggle-domain.md` | Alternar o STATE do domain entre ativo/inativo |
| `*synapse command` | `tasks/create-command.md` | Criar uma nova definição de star-command |
| `*synapse suggest` | `tasks/suggest-domain.md` | Sugerir o melhor domain para uma regra fornecida |

### Exemplos de Uso

**Criar um novo domain:**
```
*synapse create
```
Solicita: nome do domain, layer, descrição, regras iniciais.

**Adicionar uma regra a um domain existente:**
```
*synapse add global "Always prefer functional patterns over imperative"
```

**Desligar um domain:**
```
*synapse toggle agent-dev
```

**Editar uma regra específica:**
```
*synapse edit global 3
```
Abre a regra no índice 3 do domain `global` para edição.

**Criar um novo star-command:**
```
*synapse command
```
Solicita: nome do comando, regras de comportamento.

**Obter sugestão de domain para uma regra:**
```
*synapse suggest "Use TypeScript strict mode"
```
Analisa o conteúdo da regra e sugere o domain mais adequado.

## Resumo das Categorias de Comando

```
Automático por evento    -> HOOK   (synapse-engine.js, UserPromptSubmit)
Orientação/aprendizado   -> SKILL  (synapse/SKILL.md + references)
CRUD invocado pelo user  -> COMMAND (synapse/manager.md + 6 tasks)
Star-cmds de leitura     -> HOOK L7 (*synapse status, *synapse debug, *brief, *dev)
Star-cmds de escrita     -> COMMAND (*synapse create, *synapse add, *synapse toggle)
```

## Arquivos-Fonte

| Arquivo | Finalidade |
|------|---------|
| `.synapse/commands` | Definições de regras de star-command (L7) |
| `.claude/commands/synapse/manager.md` | Roteador de comandos CRUD |
| `.claude/commands/synapse/tasks/*.md` | Workflows individuais de task CRUD |
| `.claude/commands/synapse/templates/` | Templates de domain e manifest |
| `.claude/commands/synapse/utils/manifest-parser-reference.md` | Referência do formato do parser |
