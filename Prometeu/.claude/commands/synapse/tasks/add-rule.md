# Adicionar Rule

Adiciona uma nova rule a um arquivo de domain SYNAPSE existente.

---

## Propósito

Anexar uma nova rule a um arquivo de domain em `.synapse/`, incrementando automaticamente o índice da rule para manter uma sequência KEY=VALUE válida.

---

## Pré-requisitos

- `.synapse/manifest` existe
- O domain alvo existe no manifest E como arquivo em `.synapse/`

---

## Parâmetros

| Parâmetro | Obrigatório | Descrição |
|-----------|----------|-------------|
| `domain-name` | Sim | Nome de domain existente (kebab-case) |
| `rule-text` | Sim | O texto da rule a adicionar |

---

## Passos

### Passo 1: Validar Que o Domain Existe

1. Derive a chave do domain: `my-domain` -> `MY_DOMAIN`
2. Leia `.synapse/manifest` e verifique que `{DOMAIN_KEY}_STATE` existe
3. Verifique que o arquivo `.synapse/{domain-name}` existe em disco

Se o domain não for encontrado no manifest: `Error: Domain "{domain-name}" not found in manifest. Use "create" to create it first.`

Se o arquivo do domain não for encontrado: `Error: Domain file ".synapse/{domain-name}" not found on disk. Manifest entry exists but file is missing.`

### Passo 2: Encontrar o Próximo Índice de Rule

Leia o arquivo de domain `.synapse/{domain-name}` e encontre todas as rules existentes que correspondem ao padrão `{DOMAIN_KEY}_RULE_{N}=`.

Conte o número de rules correspondentes. O índice da nova rule é `count(matching_rules)`.

Isso garante índices sequenciais sem lacunas (por exemplo, se as rules 0 e 2 existem mas a 1 foi excluída, há 2 rules, então o próximo índice é 2 — o que preenche novamente as lacunas).

Se ainda não existir nenhuma rule, comece em `0`.

### Passo 3: Anexar a Rule

Anexe a nova linha de rule ao arquivo de domain:

```
{DOMAIN_KEY}_RULE_{NEXT_INDEX}={rule-text}
```

Garanta que haja uma quebra de linha antes da nova rule caso o arquivo não termine com uma.

### Passo 4: Confirmar

Exiba a confirmação:
```
Added rule to {domain-name}:
  {DOMAIN_KEY}_RULE_{NEXT_INDEX}={rule-text}

Domain now has {TOTAL} rules.
```

---

## Validação

- [ ] O domain existe tanto no manifest quanto no sistema de arquivos antes de adicionar
- [ ] O índice da rule foi auto-incrementado corretamente (sem lacunas, sem duplicatas)
- [ ] A linha de rule segue o formato `{DOMAIN_KEY}_RULE_{N}=text`
- [ ] O arquivo de domain permanece parseável após a adição

---

## Tratamento de Erros

| Erro | Mensagem |
|-------|---------|
| Domain não está no manifest | `Error: Domain "{name}" not found in manifest. Use "create" to create it first.` |
| Arquivo de domain ausente | `Error: Domain file ".synapse/{name}" not found on disk.` |
| Texto de rule vazio | `Error: Rule text cannot be empty.` |
| Manifest não encontrado | `Error: .synapse/manifest not found. SYNAPSE must be initialized first.` |

---

*Adicionar Rule — SYNAPSE CRUD Command C3*
*Fonte: SYNAPSE-HOOK-SKILL-COMMAND-ANALYSIS.md seção 2.3*
