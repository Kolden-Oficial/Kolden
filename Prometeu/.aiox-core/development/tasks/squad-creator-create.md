---
task: Create Squad
responsavel: "@squad-creator"
responsavel_type: agent
atomic_layer: task
Entrada: |
  - name: Nome do squad (kebab-case, obrigatorio)
  - description: Descricao (opcional, elicitacao)
  - author: Autor (opcional, default: git config user.name)
  - license: Licenca (opcional, default: MIT)
  - template: Template base (basic | etl | agent-only)
  - config_mode: extend | override | none
Saida: |
  - squad_path: Caminho do squad criado
  - manifest: Conteudo do squad.yaml gerado
  - next_steps: Instrucoes para proximos passos
Checklist:
  - "[ ] Validar nome (kebab-case, nao existe)"
  - "[ ] Coletar informacoes via elicitacao"
  - "[ ] Gerar estrutura de diretorios"
  - "[ ] Gerar squad.yaml"
  - "[ ] Gerar arquivos de config (coding-standards, etc.)"
  - "[ ] Gerar exemplo de agent"
  - "[ ] Gerar exemplo de task"
  - "[ ] Executar validacao inicial"
  - "[ ] Exibir proximos passos"
---

# *create-squad

Cria um novo squad seguindo a arquitetura task-first do AIOX.

## Uso

```
@squad-creator

*create-squad
# → Modo interativo, elicita todas as informacoes

*create-squad meu-squad
# → Usa defaults para o resto

*create-squad meu-squad --template etl --author "Meu Nome"
# → Especifica opcoes diretamente
```

## Parametros

| Parâmetro | Tipo | Default | Descrição |
|-----------|------|---------|-------------|
| `name` | string | - | Nome do squad (kebab-case, obrigatório) |
| `--description` | string | "Custom squad" | Descrição do squad |
| `--author` | string | git user.name | Nome do autor |
| `--license` | string | MIT | Tipo de licença |
| `--template` | string | basic | Template: basic, etl, agent-only |
| `--config-mode` | string | extend | Herança de config: extend, override, none |
| `--skip-validation` | flag | false | Pular a validação inicial |
| `--yes` | flag | false | Pular prompts interativos, usar defaults |

## Elicitacao Interativa

```
? Squad name: meu-dominio-squad
? Description: Squad para automacao de processos X
? Author: [git config user.name]
? License: (MIT)
  > MIT
    Apache-2.0
    ISC
    UNLICENSED
? Template:
  > basic (estrutura minima)
    etl (processamento de dados)
    agent-only (apenas agentes)
? Include example agent? (Y/n)
? Include example task? (Y/n)
? Config inheritance:
  > extend (adiciona as regras do core)
    override (substitui regras do core)
    none (sem heranca)
? Minimum AIOX version: (2.1.0)
```

## Templates Disponiveis

| Template | Descrição | Componentes |
|----------|-------------|------------|
| `basic` | Estrutura minima | 1 agent, 1 task |
| `etl` | Processamento de dados | 2 agents, 3 tasks, scripts |
| `agent-only` | Apenas agentes | 2 agents, sem tasks |

## Estrutura Gerada

### Com Project Configs (SQS-10)

Quando o projeto tem `docs/framework/` com arquivos de config (CODING-STANDARDS.md, etc.),
o squad referencia esses arquivos ao invés de criar cópias locais:

```
./squads/meu-dominio-squad/
├── squad.yaml                    # Manifest (referencia docs/framework/)
├── README.md                     # Documentação
├── config/
│   └── .gitkeep                 # Configs em docs/framework/
├── agents/
│   └── example-agent.md         # Agente de exemplo
├── tasks/
│   └── example-agent-task.md    # Task de exemplo
...
```

### Sem Project Configs (Fallback)

Quando o projeto NÃO tem `docs/framework/`, cria arquivos locais:

```
./squads/meu-dominio-squad/
├── squad.yaml                    # Manifest
├── README.md                     # Documentacao
├── config/
│   ├── coding-standards.md      # Estende/sobrescreve o core
│   ├── tech-stack.md            # Tecnologias do squad
│   └── source-tree.md           # Estrutura documentada
├── agents/
│   └── example-agent.md         # Agente de exemplo
├── tasks/
│   └── example-agent-task.md    # Task de exemplo
├── checklists/
│   └── .gitkeep
├── workflows/
│   └── .gitkeep
├── templates/
│   └── .gitkeep
├── tools/
│   └── .gitkeep
├── scripts/
│   └── .gitkeep
└── data/
    └── .gitkeep
```

## squad.yaml Gerado

```yaml
name: meu-dominio-squad
version: 1.0.0
description: Squad para automacao de processos X
author: Meu Nome
license: MIT
slashPrefix: meu-dominio

aiox:
  minVersion: "2.1.0"
  type: squad

components:
  tasks:
    - example-agent-task.md
  agents:
    - example-agent.md
  workflows: []
  checklists: []
  templates: []
  tools: []
  scripts: []

config:
  extends: extend
  # SQS-10: Referencia arquivos de nível de projeto quando docs/framework/ existe
  coding-standards: ../../docs/framework/CODING-STANDARDS.md   # ou config/coding-standards.md
  tech-stack: ../../docs/framework/TECH-STACK.md               # ou config/tech-stack.md
  source-tree: ../../docs/framework/SOURCE-TREE.md             # ou config/source-tree.md

dependencies:
  node: []
  python: []
  squads: []

tags:
  - custom
  - automation
```

## Fluxo

```
1. Parsear argumentos
   ├── Se nome fornecido → validar kebab-case
   └── Se sem nome → solicitar o nome

2. Verificar se o squad já existe
   ├── Se existe → erro com sugestão
   └── Se não existe → continuar

3. Coletar a configuração
   ├── Se flag --yes → usar todos os defaults
   └── Se interativo → elicitar cada opção

4. Gerar a estrutura do squad
   ├── Criar diretórios
   ├── Gerar squad.yaml a partir do template
   ├── Gerar arquivos de config
   ├── Gerar agent de exemplo (se solicitado)
   ├── Gerar task de exemplo (se solicitada)
   └── Adicionar .gitkeep aos diretórios vazios

5. Rodar a validação inicial
   ├── Se --skip-validation → pular
   └── Se validação → rodar squad-validator

6. Exibir a mensagem de sucesso
   └── Mostrar os próximos passos
```

## Output de Sucesso

```
✅ Squad criado com sucesso!

📁 Local: ./squads/meu-dominio-squad/

📋 Próximos passos:
   1. cd squads/meu-dominio-squad
   2. Customize squad.yaml com seus detalhes
   3. Crie seus agents em agents/
   4. Crie tasks em tasks/ (task-first!)
   5. Valide: @squad-creator *validate-squad meu-dominio-squad

📚 Documentação:
   - Squad Guide: docs/guides/squads-guide.md
   - Task Format: .aiox-core/docs/standards/TASK-FORMAT-SPECIFICATION-V1.md

🚀 Quando estiver pronto para compartilhar:
   - Apenas local: Mantenha em ./squads/ (privado)
   - Público: @squad-creator *publish-squad meu-dominio-squad
   - API: @squad-creator *sync-squad-synkra meu-dominio-squad
```

## Tratamento de Erros

| Erro | Causa | Resolução |
|-------|-------|------------|
| `INVALID_NAME` | Nome não está em kebab-case | Use minúsculas com hífens |
| `SQUAD_EXISTS` | Squad já existe | Escolha outro nome ou exclua o existente |
| `PERMISSION_DENIED` | Não é possível escrever em squads/ | Verifique as permissões do diretório |
| `VALIDATION_FAILED` | Squad gerado inválido | Verifique os detalhes do erro, corrija manualmente |

## Implementação

```javascript
const { SquadGenerator } = require('./.aiox-core/development/scripts/squad');
const { SquadValidator } = require('./.aiox-core/development/scripts/squad');

async function createSquad(options) {
  const {
    name,
    description,
    author,
    license,
    template,
    configMode,
    skipValidation,
    includeAgent,
    includeTask,
    aioxMinVersion
  } = options;

  // Validate name
  if (!/^[a-z][a-z0-9-]*[a-z0-9]$/.test(name)) {
    throw new Error('INVALID_NAME: Squad name must be kebab-case');
  }

  // Generate squad
  const generator = new SquadGenerator();
  const result = await generator.generate({
    name,
    description,
    author,
    license,
    template,
    configMode,
    includeAgent,
    includeTask,
    aioxMinVersion
  });

  // Validate (unless skipped)
  if (!skipValidation) {
    const validator = new SquadValidator();
    const validation = await validator.validate(result.path);
    if (!validation.valid) {
      console.warn('Warning: Generated squad has validation issues');
      console.warn(validator.formatResult(validation, result.path));
    }
  }

  // Display success
  console.log(`\n✅ Squad created successfully!\n`);
  console.log(`📁 Location: ${result.path}/\n`);
  displayNextSteps(name);

  return result;
}
```

## Relacionado

- **Agente:** @squad-creator (Craft)
- **Script:** squad-generator.js
- **Validator:** squad-validator.js (SQS-3)
- **Loader:** squad-loader.js (SQS-2)
