# Referência de Formato do Manifest e do Arquivo de Domain do SYNAPSE

Referência para o formato KEY=VALUE usado pelo parser domain-loader do SYN-1.

---

## Formato do Manifest (`.synapse/manifest`)

O manifest é o registro central de todos os domains do SYNAPSE. Cada domain tem entradas com sufixos específicos.

### Sufixos de Entrada de Domain

| Sufixo | Obrigatório | Valores | Descrição |
|--------|----------|--------|-------------|
| `_STATE` | Sim | `active`, `inactive` | Se as rules do domain são carregadas |
| `_RECALL` | Não | palavras-chave separadas por vírgula | Palavras-chave que disparam o carregamento do domain via L6 |
| `_EXCLUDE` | Não | palavras-chave separadas por vírgula | Palavras-chave que suprimem o carregamento do domain |
| `_ALWAYS_ON` | Não | `true`, `false` | O domain carrega em todo prompt (L0, L1) |
| `_NON_NEGOTIABLE` | Não | `true`, `false` | As rules não podem ser sobrepostas (apenas L0) |
| `_AGENT_TRIGGER` | Não | agent_id | O domain carrega quando o agente está ativo (L2) |
| `_WORKFLOW_TRIGGER` | Não | workflow_id | O domain carrega quando o workflow está ativo (L3) |

### Chaves Globais

| Chave | Valores | Descrição |
|-----|--------|-------------|
| `DEVMODE` | `true`, `false` | Habilita saída de debug/desenvolvimento |
| `GLOBAL_EXCLUDE` | separadas por vírgula | Palavras-chave de exclusão global |

### Exemplo de Manifest

```ini
# SYNAPSE Manifest — Central Domain Registry
# Format: KEY=VALUE (parsed by domain-loader.js)

# Layer 0: Constitution (NON-NEGOTIABLE)
CONSTITUTION_STATE=active
CONSTITUTION_ALWAYS_ON=true
CONSTITUTION_NON_NEGOTIABLE=true

# Layer 1: Global
GLOBAL_STATE=active
GLOBAL_ALWAYS_ON=true

# Layer 1: Context brackets
CONTEXT_STATE=active
CONTEXT_ALWAYS_ON=true

# Layer 2: Agent domains
AGENT_DEV_STATE=active
AGENT_DEV_AGENT_TRIGGER=dev

AGENT_QA_STATE=active
AGENT_QA_AGENT_TRIGGER=qa

# Layer 3: Workflow domains
WORKFLOW_STORY_DEV_STATE=active
WORKFLOW_STORY_DEV_WORKFLOW_TRIGGER=story_development

# Layer 7: Star-commands
COMMANDS_STATE=active

# Global settings
DEVMODE=false
GLOBAL_EXCLUDE=
```

---

## Formato do Arquivo de Domain (`.synapse/{domain-name}`)

Os arquivos de domain contêm as rules de fato. Dois formatos são suportados.

### Formato 1: KEY=VALUE (Recomendado)

```ini
# Domain: agent-dev
AGENT_DEV_RULE_0=Always use kebab-case for file names
AGENT_DEV_RULE_1=Follow conventional commits format
AGENT_DEV_RULE_2=Write tests for every feature
```

- Formato da chave: `{DOMAIN_KEY}_RULE_{N}=text`
- `N` começa em 0 e auto-incrementa
- A chave do domain é UPPERCASE_SNAKE_CASE (ex: `AGENT_DEV`)

### Formato 2: Texto Simples

```
# Domain: agent-dev
Always use kebab-case for file names
Follow conventional commits format
Write tests for every feature
```

- Cada linha não vazia e que não seja comentário é uma rule
- Detectado automaticamente pelo parser (nenhum padrão `_RULE_\d+` encontrado)

### Regras de Parsing

- Linhas começando com `#` são comentários (ignoradas)
- Linhas vazias são ignoradas
- Divide apenas no primeiro `=` (os valores podem conter `=`)
- Tanto CRLF do Windows quanto LF do Unix são suportados
- Linhas malformadas (sem `=` no modo KEY=VALUE) são puladas

---

## Convenções de Nomenclatura

| Contexto | Formato | Exemplo |
|---------|--------|---------|
| Chaves do manifest | UPPERCASE_SNAKE_CASE | `AGENT_DEV_STATE` |
| Nomes de arquivo de domain | lowercase-kebab-case | `agent-dev` |
| Derivação da chave do domain | Remove o sufixo, mantém o prefixo | `AGENT_DEV_STATE` -> chave do domain `AGENT_DEV` |
| Derivação do nome de arquivo | Chave para kebab-case | `AGENT_DEV` -> arquivo `agent-dev` |

---

## Formato do Bloco de Star-Command (`.synapse/commands`)

```ini
[*command-name] COMMAND:
COMMANDS_CMD_COMMAND_NAME_0=First instruction
COMMANDS_CMD_COMMAND_NAME_1=Second instruction
```

- Cabeçalho do bloco: `[*command-name] COMMAND:`
- As rules de comando usam o formato: `COMMANDS_{CMD_KEY}_{N}=text` (observação: sem o sufixo `_RULE_`, diferentemente das rules de domain)
- A chave do comando é derivada do nome: `*dev` -> `CMD_DEV`, `*quick-fix` -> `CMD_QUICK_FIX`

---

*Referência para os comandos CRUD do SYN-9. Fonte: parser domain-loader.js do SYN-1.*
