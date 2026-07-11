---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.claude/commands/synapse/tasks/_indice|_indice]]"
---

# Editar Rule

Edita ou remove uma rule pelo índice em um arquivo de domain SYNAPSE existente.

---

## Propósito

Modificar o texto de uma rule existente ou excluí-la inteiramente, renumerando as rules restantes para manter um índice sequencial.

---

## Pré-requisitos

- `.synapse/manifest` existe
- O domain alvo existe no manifest E como arquivo em `.synapse/`
- O índice da rule alvo existe no arquivo de domain

---

## Parâmetros

| Parâmetro | Obrigatório | Descrição |
|-----------|----------|-------------|
| `domain-name` | Sim | Nome de domain existente (kebab-case) |
| `index` | Sim | Número do índice da rule a editar ou remover |
| `new-text` | Não | Novo texto da rule (omita para excluir a rule) |

---

## Passos

### Passo 1: Validar Que o Domain Existe

1. Derive a chave do domain: `my-domain` -> `MY_DOMAIN`
2. Verifique que `{DOMAIN_KEY}_STATE` existe em `.synapse/manifest`
3. Verifique que o arquivo `.synapse/{domain-name}` existe em disco

### Passo 2: Encontrar a Rule Alvo

Leia o arquivo de domain e encontre a linha que corresponde a `{DOMAIN_KEY}_RULE_{index}=`.

Se não encontrada: `Error: Rule index {index} not found in domain "{domain-name}". Domain has rules 0-{max}.`

### Passo 3: Editar ou Excluir

**Se new-text for fornecido (EDIT):**
- Substitua a linha da rule por `{DOMAIN_KEY}_RULE_{index}={new-text}`
- Exiba: `Updated rule {index} in {domain-name}: {new-text}`

**Se new-text NÃO for fornecido (DELETE):**
- Remova a linha da rule do arquivo
- Renumere todas as rules restantes sequencialmente começando do 0
- Exiba: `Deleted rule {index} from {domain-name}. Re-numbered {count} remaining rules.`

### Passo 4: Renumerar Após a Exclusão

Quando uma rule é excluída, renumere todas as rules restantes para manter um índice sequencial:

**Antes:**
```
MY_DOMAIN_RULE_0=First rule
MY_DOMAIN_RULE_1=Second rule  <-- DELETED
MY_DOMAIN_RULE_2=Third rule
```

**Depois:**
```
MY_DOMAIN_RULE_0=First rule
MY_DOMAIN_RULE_1=Third rule
```

Algoritmo:
1. Colete todos os valores de rule (preservando a ordem, excluindo a rule deletada)
2. Reescreva todas as rules com índices sequenciais começando do 0
3. Preserve todas as linhas que não são rules (comentários, linhas em branco) em suas posições originais

### Passo 5: Validar

- Releia o arquivo de domain
- Verifique que as rules estão numeradas sequencialmente (0, 1, 2, ... N) sem lacunas
- Verifique que a contagem total de rules corresponde ao esperado (contagem original menos 1 na exclusão)

---

## Validação

- [ ] A rule alvo existe antes da edição/exclusão
- [ ] Após a edição: o texto da rule foi atualizado corretamente
- [ ] Após a exclusão: as rules restantes foram renumeradas sequencialmente (sem lacunas)
- [ ] Linhas que não são rules (comentários, linhas em branco) preservadas
- [ ] O arquivo de domain permanece parseável após a modificação

---

## Tratamento de Erros

| Erro | Mensagem |
|-------|---------|
| Domain não encontrado | `Error: Domain "{name}" not found in manifest.` |
| Arquivo de domain ausente | `Error: Domain file ".synapse/{name}" not found on disk.` |
| Índice não encontrado | `Error: Rule index {index} not found in domain "{name}". Domain has rules 0-{max}.` |
| Índice negativo | `Error: Rule index must be a non-negative integer.` |
| Edição com texto vazio | `Error: New rule text cannot be empty. To delete, omit the new text.` |

---

*Editar Rule — SYNAPSE CRUD Command C4*
*Fonte: SYNAPSE-HOOK-SKILL-COMMAND-ANALYSIS.md seção 2.3*
