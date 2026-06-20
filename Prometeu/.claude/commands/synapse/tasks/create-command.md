# Criar Comando

Cria um novo bloco de star-command no arquivo de domain de comandos do SYNAPSE.

---

## Propósito

Adicionar uma nova definição de star-command em `.synapse/commands`, permitindo que usuários definam comandos personalizados que a camada L7 da engine do SYNAPSE irá detectar e processar.

---

## Pré-requisitos

- O arquivo `.synapse/commands` existe
- O usuário fornece um nome de comando e ao menos uma rule

---

## Parâmetros

| Parâmetro | Obrigatório | Descrição |
|-----------|----------|-------------|
| `command-name` | Sim | Nome do star-command sem o prefixo `*` (ex: `review`) |
| `rules` | Sim | Uma ou mais rules de instrução para o comando (ao menos 1) |

---

## Passos

### Passo 1: Validar o Nome do Comando

- O nome do comando deve ser kebab-case minúsculo (ex: `review`, `quick-fix`)
- Caracteres permitidos: `a-z`, `0-9`, `-`
- NÃO pode começar nem terminar com `-`
- NÃO pode estar vazio

Se inválido: `Error: Command name must be lowercase kebab-case (e.g., "review"). Got: "{name}"`

### Passo 2: Verificar Duplicatas

Leia `.synapse/commands` e verifique se um cabeçalho de bloco `[*{command-name}]` já existe.

Se existir: `Error: Star-command "*{command-name}" already exists in .synapse/commands. Edit the file directly to modify it.`

### Passo 3: Derivar a Chave do Comando

Converta o nome do comando para maiúsculas para as chaves de rule:
- `review` -> `CMD_REVIEW`
- `quick-fix` -> `CMD_QUICK_FIX`

Prefixo completo da chave: `COMMANDS_{CMD_KEY}`

### Passo 4: Anexar o Bloco de Comando

Anexe o novo bloco de comando a `.synapse/commands`:

```ini

[*{command-name}] COMMAND:
COMMANDS_{CMD_KEY}_0={first-rule}
COMMANDS_{CMD_KEY}_1={second-rule}
```

- Adicione uma linha em branco antes do bloco para melhor legibilidade
- Cada rule é indexada começando em 0
- Ao menos 1 rule é obrigatória

### Passo 5: Validar

- Verifique que ao menos 1 rule foi fornecida
- Releia `.synapse/commands` e verifique que o cabeçalho do bloco existe
- Verifique que as linhas de rule seguem o formato `COMMANDS_{CMD_KEY}_{N}=text`

### Passo 6: Confirmar

```
Created star-command "*{command-name}" with {count} rules.

The SYNAPSE engine's L7 layer will detect "*{command-name}" in user prompts
and inject the associated rules into the context.
```

---

## Validação

- [ ] O nome do comando é kebab-case válido
- [ ] Nenhum comando duplicado em `.synapse/commands`
- [ ] Ao menos 1 rule fornecida
- [ ] O cabeçalho do bloco segue o formato `[*{name}] COMMAND:`
- [ ] As chaves de rule seguem o formato `COMMANDS_{CMD_KEY}_{N}=text`
- [ ] `.synapse/commands` permanece parseável após a adição

---

## Tratamento de Erros

| Erro | Mensagem |
|-------|---------|
| Nome inválido | `Error: Command name must be lowercase kebab-case (e.g., "review"). Got: "{name}"` |
| Comando duplicado | `Error: Star-command "*{name}" already exists in .synapse/commands.` |
| Nenhuma rule fornecida | `Error: At least one rule is required for a star-command.` |
| Arquivo de comandos ausente | `Error: .synapse/commands not found. SYNAPSE must be initialized first (SYN-8).` |

---

*Criar Comando — SYNAPSE CRUD Command C6*
*Fonte: SYNAPSE-HOOK-SKILL-COMMAND-ANALYSIS.md seção 2.3, DESIGN-SYNAPSE-ENGINE.md seção 15*
