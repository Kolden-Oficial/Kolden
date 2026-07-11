---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Task: Sync Registry Intel

## Metadados
- **Task ID:** sync-registry-intel
- **Agente:** @aiox-master
- **Story:** NOG-2
- **Tipo:** Command Task
- **Elicit:** false

---

## Descrição

Enriquece o registro de entidades com dados de inteligência de código (usedBy, dependencies, codeIntelMetadata) usando o provedor de inteligência de código configurado.

---

## Pré-requisitos

- Provedor de inteligência de código disponível (NOG-1 concluído)
- Registro de entidades existe em `.aiox-core/data/entity-registry.yaml`

---

## Passos de Execução

### Passo 1: Analisar os Argumentos

```text
Arguments:
  --full    Force full resync (reprocess all entities regardless of lastSynced)

Default: Incremental sync (only entities whose source file mtime > lastSynced)
```

### Passo 2: Executar a Sincronização

```javascript
const { RegistrySyncer } = require('.aiox-core/core/code-intel/registry-syncer');

const syncer = new RegistrySyncer();
const stats = await syncer.sync({ full: hasFullFlag });
```

### Passo 3: Reportar os Resultados

Exiba as estatísticas de sincronização:
- Total de entidades no registro
- Entidades processadas (enriquecidas)
- Entidades ignoradas (inalteradas)
- Erros encontrados

### Passo 4: Tratar o Fallback

Se nenhum provedor de inteligência de código estiver disponível:
- Exiba: "No code intelligence provider available, skipping enrichment"
- Saia graciosamente com zero modificações

---

## Saída

```yaml
success: true
stats:
  total: 506
  processed: 42
  skipped: 464
  errors: 0
```

---

## Tratamento de Erros

- **Sem provedor:** Saída graciosa, zero modificações
- **Registro não encontrado:** Mensagem de erro, sair
- **Falha parcial:** Continuar o lote, registrar os erros, reportar a contagem
- **Falha de escrita:** A escrita atômica previne corrupção (temp + rename)
