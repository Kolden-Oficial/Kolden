---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.claude/commands/synapse/tasks/_indice|_indice]]"
---

# Alternar Domain

Alterna um domain SYNAPSE entre ativo e inativo no manifest.

---

## Propósito

Habilitar ou desabilitar um domain alterando seu valor `_STATE` em `.synapse/manifest`. Isso controla se as rules do domain são carregadas pela engine do SYNAPSE. O arquivo de domain em si NÃO é modificado.

---

## Pré-requisitos

- `.synapse/manifest` existe
- O domain alvo existe no manifest

---

## Parâmetros

| Parâmetro | Obrigatório | Descrição |
|-----------|----------|-------------|
| `domain-name` | Sim | Nome do domain a alternar (kebab-case) |

---

## Passos

### Passo 1: Validar Que o Domain Existe no Manifest

1. Derive a chave do domain: `my-domain` -> `MY_DOMAIN`
2. Leia `.synapse/manifest`
3. Encontre a linha `{DOMAIN_KEY}_STATE=active` ou `{DOMAIN_KEY}_STATE=inactive`

Se não encontrada: `Error: Domain "{domain-name}" not found in manifest.`

### Passo 2: Alternar o Estado

- Se o estado atual for `active`, mude para `inactive`
- Se o estado atual for `inactive`, mude para `active`

**Modifique APENAS o arquivo manifest.** NÃO modifique o arquivo de domain em `.synapse/{domain-name}`.

Substitua a linha `{DOMAIN_KEY}_STATE={old-state}` por `{DOMAIN_KEY}_STATE={new-state}` em `.synapse/manifest`.

### Passo 3: Exibir o Resultado

```
Toggled domain "{domain-name}":
  {DOMAIN_KEY}_STATE: {old-state} -> {new-state}
```

### Passo 4: Validar

- Releia `.synapse/manifest`
- Verifique que `{DOMAIN_KEY}_STATE={new-state}` está presente
- Verifique que o arquivo de domain NÃO foi modificado (compare timestamp ou conteúdo)

---

## Validação

- [ ] O domain existe no manifest antes da alternância
- [ ] Apenas o valor `_STATE` foi alterado no manifest
- [ ] O arquivo de domain (`.synapse/{domain-name}`) NÃO foi modificado
- [ ] O estado anterior e o novo estado exibidos ao usuário
- [ ] O manifest permanece parseável após a modificação

---

## Tratamento de Erros

| Erro | Mensagem |
|-------|---------|
| Domain não está no manifest | `Error: Domain "{name}" not found in manifest.` |
| Manifest não encontrado | `Error: .synapse/manifest not found. SYNAPSE must be initialized first.` |
| Valor de estado inválido | `Error: Unexpected state value "{value}" for domain "{name}". Expected "active" or "inactive".` |

---

*Alternar Domain — SYNAPSE CRUD Command C5*
*Fonte: SYNAPSE-HOOK-SKILL-COMMAND-ANALYSIS.md seção 2.3*
