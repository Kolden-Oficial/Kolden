---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Task Validate Agents

---
execution_mode: programmatic  # TOK-3: elegível a PTC — batch-scan de todos os arquivos de agente em um único bloco Bash
---

## Propósito

Validar todos os arquivos de definição de agente quanto à integridade estrutural, campos obrigatórios,
existência de dependências e referência ao pipeline de ativação unificado.

Story ACT-6: Verificação de integridade do framework via comando `*validate-agents`.

---

## Parâmetros

- **scope**: `all` (padrão) | `{agent-id}` - Validar todos os agentes ou um específico
- **strict**: `false` (padrão) | `true` - Falhar em avisos além de erros
- **output**: `summary` (padrão) | `detailed` - Verbosidade da saída

---

## Passos de Execução

### Passo 1: Descobrir os Arquivos de Agente

Varrer `.aiox-core/development/agents/` em busca de todos os arquivos `.md`.
Agentes esperados: dev, qa, architect, pm, po, sm, analyst, data-engineer, ux-design-expert, devops, aiox-master, squad-creator

### Passo 2: Parsear o Bloco YAML

Para cada arquivo de agente:
1. Extrair o bloco YAML entre as cercas ` ```yaml ` e ` ``` `
2. Parsear usando `js-yaml.load()` (loader seguro)
3. Se o parse falhar, tentar normalizar primeiro o formato de comando compacto
4. Reportar erros de parse com números de linha

### Passo 3: Validar os Campos Obrigatórios

| Campo | Obrigatório | Padrão | Notas |
|-------|----------|---------|-------|
| `agent.id` | Sim | - | Deve corresponder ao nome do arquivo |
| `agent.name` | Sim | - | Nome legível por humanos |
| `agent.icon` | Não | - | Ícone emoji |
| `persona_profile` | Sim | - | Deve ter greeting_levels |
| `persona_profile.greeting_levels` | Sim | - | minimal, named, archetypal |
| `persona.role` | Sim | - | Descrição do papel |
| `commands` | Sim | [] | Array de objetos de comando |
| `activation-instructions` | Sim | - | Deve incluir STEP 1-5 |

### Passo 4: Validar a Referência ao Pipeline de Ativação

Verificar se o STEP 3 em `activation-instructions` referencia:
- `unified-activation-pipeline.js` (Story ACT-6)
- E NÃO a antiga referência direta a `greeting-builder.js`

Reportar como WARNING se ainda referenciar o caminho antigo.

### Passo 5: Validar Dependências

Para a lista `dependencies.tasks` de cada agente:
1. Verificar se cada arquivo de task referenciado existe em `.aiox-core/development/tasks/`
2. Reportar dependências ausentes como ERRORS

Para a lista `dependencies.checklists` de cada agente:
1. Verificar em `.aiox-core/development/checklists/`
2. Reportar ausências como WARNINGS

### Passo 6: Validar a Estrutura de Comandos

Para cada comando no array `commands`:
1. Deve ter o campo `name` (string)
2. `description` é recomendado (WARNING se ausente)
3. O array `visibility` é recomendado para filtragem ciente da sessão

### Passo 7: Validação Cross-Agent

1. Verificar que não há IDs de agente duplicados entre os arquivos
2. Verificar que todos os 12 agentes esperados estão presentes
3. Verificar que o comando `*yolo` existe (comando universal)

### Passo 8: Gerar Relatório

Formato de saída:

```
=== Relatório de Validação de Agentes ===

[PASS] dev.md - 15 comandos, 8 tasks, pipeline: unified
[PASS] qa.md - 12 comandos, 6 tasks, pipeline: unified
[WARN] devops.md - Metadados de visibility ausentes em 5 comandos
[FAIL] broken-agent.md - Erro de parse de YAML na linha 42

Resumo: 11 aprovados, 1 aviso, 0 falhos
```

---

## Tratamento de Erros

- Erros de parse de YAML: Reportar arquivo, número da linha, mensagem de erro
- Arquivos ausentes: Reportar o caminho esperado
- Campos inválidos: Reportar o nome do campo e o formato esperado
- Continuar a validação em caso de erros (não parar na primeira falha)

---

## Dependências

- `js-yaml` - Parsing de YAML
- `fs` - Acesso ao sistema de arquivos
- Arquivos de agente em `.aiox-core/development/agents/`
- Arquivos de task em `.aiox-core/development/tasks/`
- `unified-activation-pipeline.js` - Verificação de referência ao pipeline

---

*Story ACT-6 | Task: validate-agents | Criado 2026-02-06*
