# Criar Domain

Cria um novo arquivo de domain SYNAPSE e o registra no manifest.

---

## Propósito

Criar um novo domain personalizado em `.synapse/` com uma entrada correspondente em `.synapse/manifest`, permitindo que usuários adicionem seus próprios conjuntos de rules à engine de contexto do SYNAPSE.

---

## Pré-requisitos

- `.synapse/manifest` existe
- O diretório `.synapse/` existe
- O usuário fornece um nome de domain

---

## Parâmetros

| Parâmetro | Obrigatório | Descrição |
|-----------|----------|-------------|
| `domain-name` | Sim | Nome para o novo domain (kebab-case, minúsculo) |
| `description` | Não | Descrição curta do propósito do domain |
| `recall-keywords` | Não | Palavras-chave RECALL separadas por vírgula para correspondência L6 |
| `exclude-keywords` | Não | Palavras-chave EXCLUDE separadas por vírgula |
| `initial-rules` | Não | Uma ou mais rules iniciais a incluir |

---

## Passos

### Passo 1: Validar o Nome do Domain

- O nome do domain DEVE ser kebab-case minúsculo (ex: `my-custom-rules`)
- Caracteres permitidos: `a-z`, `0-9`, `-`
- NÃO pode começar nem terminar com `-`
- NÃO pode estar vazio

Se inválido, reporte: `Error: Domain name must be lowercase kebab-case (e.g., "my-custom-rules"). Got: "{name}"`

### Passo 2: Derivar a Chave do Domain

Converta o nome kebab-case para UPPERCASE_SNAKE_CASE para uso no manifest e no arquivo de domain:
- `my-custom-rules` -> `MY_CUSTOM_RULES`

### Passo 3: Verificar Unicidade

Leia `.synapse/manifest` e verifique se `{DOMAIN_KEY}_STATE` já existe.

Se existir, reporte: `Error: Domain "{domain-name}" already exists in the manifest. Use "add" to add rules to it instead.`

Verifique se o arquivo `.synapse/{domain-name}` já existe no sistema de arquivos.

Se existir, reporte: `Error: Domain file ".synapse/{domain-name}" already exists on disk.`

### Passo 4: Criar o Arquivo de Domain

Crie `.synapse/{domain-name}` usando o template de `.claude/commands/synapse/templates/domain-template`:

```ini
# ==========================================
# SYNAPSE Domain: {DOMAIN_NAME}
# Created: {CURRENT_DATE}
# Description: {DESCRIPTION}
# ==========================================

# Rules
{DOMAIN_KEY}_RULE_0={FIRST_RULE_OR_PLACEHOLDER}
```

- Substitua `{DOMAIN_NAME}` pelo nome de exibição do domain (ex: `My Custom Rules`)
- Substitua `{DOMAIN_KEY}` pela chave UPPERCASE_SNAKE_CASE
- Substitua `{DATE}` pela data atual (YYYY-MM-DD)
- Substitua `{DESCRIPTION}` pela descrição fornecida pelo usuário ou por `Custom domain`
- Se o usuário forneceu rules iniciais, adicione-as como `{DOMAIN_KEY}_RULE_0`, `_RULE_1`, etc.
- Se não houver rules iniciais, use um placeholder: `{DOMAIN_KEY}_RULE_0=Add your first rule here`

### Passo 5: Adicionar a Entrada no Manifest

Anexe a `.synapse/manifest` usando o template de `.claude/commands/synapse/templates/manifest-entry-template`:

```ini

# Layer 6: {domain-name}
{DOMAIN_KEY}_STATE=active
{DOMAIN_KEY}_RECALL={recall-keywords-or-empty}
{DOMAIN_KEY}_EXCLUDE={exclude-keywords-or-empty}
```

- Adicione uma linha em branco antes da nova entrada para melhor legibilidade
- Se nenhuma palavra-chave RECALL for fornecida, use as palavras do nome do domain como padrão
- EXCLUDE fica vazio por padrão

### Passo 6: Validar

- Releia o manifest e verifique que `{DOMAIN_KEY}_STATE=active` está presente
- Releia o arquivo de domain e verifique que ele parseia corretamente (tem ao menos uma linha de rule)

---

## Validação

- [ ] Arquivo de domain criado em `.synapse/{domain-name}`
- [ ] Entrada no manifest adicionada com `_STATE=active`
- [ ] O nome do domain é kebab-case válido
- [ ] Nenhum domain duplicado no manifest ou no sistema de arquivos
- [ ] O arquivo de domain segue o formato KEY=VALUE parseável pelo SYN-1

---

## Tratamento de Erros

| Erro | Mensagem |
|-------|---------|
| Nome inválido | `Error: Domain name must be lowercase kebab-case (e.g., "my-custom-rules"). Got: "{name}"` |
| Domain já existe (manifest) | `Error: Domain "{name}" already exists in the manifest. Use "add" to add rules to it instead.` |
| Domain já existe (arquivo) | `Error: Domain file ".synapse/{name}" already exists on disk.` |
| Manifest não encontrado | `Error: .synapse/manifest not found. SYNAPSE must be initialized first (SYN-8).` |
| Falha na escrita | `Error: Failed to write domain file. Check filesystem permissions.` |

---

*Criar Domain — SYNAPSE CRUD Command C2*
*Fonte: SYNAPSE-HOOK-SKILL-COMMAND-ANALYSIS.md seção 2.3*
