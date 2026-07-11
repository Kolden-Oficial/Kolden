---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Tarefa Documentar Gotchas

## Propósito

Extrair e consolidar gotchas a partir dos insights de sessão em uma base de conhecimento pesquisável. Acionado automaticamente após a captura de session-insights ou manualmente via `*list-gotchas`.

---

## Definição da Tarefa (AIOX Task Format V1.0)

```yaml
task: documentGotchas()
responsável: Dex (Builder)
responsavel_type: Agente
atomic_layer: Service

**Entrada:**
- campo: command
  tipo: string
  origem: User Input
  obrigatório: false
  validação: update|list|search|category
  default: update

- campo: query
  tipo: string
  origem: User Input
  obrigatório: false
  validação: Texto livre para busca/categoria

- campo: severity
  tipo: string
  origem: User Input
  obrigatório: false
  validação: high|medium|low

- campo: format
  tipo: string
  origem: User Input
  obrigatório: false
  validação: md|json
  default: md

**Saída:**
- campo: gotchas_file
  tipo: string
  destino: .aiox/gotchas.md
  persistido: true

- campo: gotchas_json
  tipo: string
  destino: .aiox/gotchas.json
  persistido: true

- campo: statistics
  tipo: object
  destino: Console
  persistido: false
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da tarefa (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Projeto tem o diretório .aiox inicializado
    tipo: pre-condition
    blocker: false
    validação: |
      Verificar se o diretório .aiox/ existe, criar caso não exista
    error_message: "Criando o diretório .aiox/"

  - [ ] Node.js disponível para execução de script
    tipo: pre-condition
    blocker: true
    validação: |
      Verificar se node --version retorna uma versão válida
    error_message: "Node.js necessário para gotchas-documenter.js"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a conclusão da tarefa

**Checklist:**

```yaml
post-conditions:
  - [ ] Arquivo gotchas.md gerado/atualizado
    tipo: post-condition
    blocker: true
    validação: |
      Verificar se .aiox/gotchas.md existe e tem conteúdo
    error_message: "Falha ao gerar gotchas.md"

  - [ ] Schema do gotchas.json válido
    tipo: post-condition
    blocker: false
    validação: |
      Validar .aiox/gotchas.json contra o schema
    error_message: "Falha na validação do schema de gotchas.json"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de aprovação/reprovação para a conclusão da tarefa

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Gotchas extraídos dos insights de sessão (AC1)
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Pelo menos um arquivo de insights escaneado

  - [ ] gotchas.md gerado com o formato apropriado (AC2, AC3)
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Arquivo contém o formato Wrong/Right/Reason

  - [ ] Gotchas categorizados por área (AC4)
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Categorias presentes na saída
```

---

## Workflow

### Comando: `*list-gotchas` (AC7)

**Alias para**: `*document-gotchas list`

**Referência rápida para todos os gotchas com filtragem opcional.**

### Comando: `*document-gotchas [command] [options]`

**Comandos Disponíveis:**

1. **update** (padrão)
   - Escaneia todos os arquivos de insights de sessão
   - Extrai gotchas de `gotchasFound`, `discoveries`, `patternsLearned`
   - Deduplica com base na similaridade de conteúdo
   - Categoriza por área
   - Mescla com gotchas existentes
   - Gera `.aiox/gotchas.md` e `.aiox/gotchas.json`

2. **list**
   - Lista todos os gotchas
   - Opções: `--severity high|medium|low`, `--format md|json`

3. **search \<query\>**
   - Busca gotchas por palavra-chave
   - Busca nos campos title, wrong, right, reason

4. **category \<name\>**
   - Lista gotchas por categoria
   - Categorias: State Management, API, Database, Frontend/React, Testing, Build/Deploy, TypeScript, Authentication, Performance, Security, Other

---

## Passos de Execução

### 1. Inicializar

```javascript
const { GotchasDocumenter } = require('.aiox-core/infrastructure/scripts/gotchas-documenter');

const documenter = new GotchasDocumenter(rootPath, {
  outputPath: '.aiox/gotchas.md',
  quiet: false
});
```

### 2. Carregar Existentes (se update)

```javascript
// Mescla com gotchas existentes para preservar os adicionados manualmente
documenter.mergeWithExisting('.aiox/gotchas.json');
```

### 3. Escanear Arquivos de Insights

```javascript
// Escaneia:
// - docs/stories/**/insights/*.json
// - docs/stories/**/session-*.json
// - .aiox/insights/*.json
await documenter.scanInsightsFiles();
```

### 4. Processar e Deduplicar

```javascript
// Remove duplicatas com base na similaridade de conteúdo
documenter.deduplicateGotchas();

// Categoriza por área
documenter.categorizeGotchas();
```

### 5. Gerar Saída

```javascript
// Salva markdown e JSON
const outputPath = documenter.saveGotchas();

// Exibe estatísticas
const stats = documenter.stats;
console.log(`Total: ${documenter.gotchas.size} gotchas`);
console.log(`Categories: ${stats.categoriesFound}`);
console.log(`Duplicates merged: ${stats.gotchasDeduplicated}`);
```

---

## Pontos de Integração

### 1. Captura de Insights de Sessão (Story 7.1)

**Gatilho:** Após a conclusão de `*capture-insights`

```javascript
// No workflow capture-session-insights
afterCapture: async (insightsPath) => {
  const { updateGotchas } = require('.aiox-core/infrastructure/scripts/gotchas-documenter');
  await updateGotchas(rootPath);
}
```

### 2. Integração com Autocrítica (Epic 4 - AC5)

**Uso:** O checklist de Autocrítica referencia os gotchas

```javascript
// Na execução de self-critique-checklist.md
const { getGotchasForSelfCritique } = require('.aiox-core/infrastructure/scripts/gotchas-documenter');

// Obtém gotchas relevantes para o contexto atual
const relevantGotchas = getGotchasForSelfCritique(rootPath, 'TypeScript');

// Inclui no prompt de autocrítica
const prompt = `
Before completing, verify against known gotchas:
${relevantGotchas.map(g => `- ${g.title}: ${g.reason}`).join('\n')}
`;
```

### 3. Integração com o Spec Writer (Epic 3)

**Uso:** Incluir gotchas relevantes nas specs de implementação

```javascript
// Ao escrever a spec de implementação
const gotchas = getGotchasForSelfCritique(rootPath, 'API');
// Adiciona a seção "Known Gotchas" à spec
```

---

## Schema dos Insights de Sessão

**Formato esperado para extração:**

```json
{
  "storyId": "STORY-42",
  "capturedAt": "2026-01-28T14:00:00Z",

  "gotchasFound": [
    {
      "wrong": "Using persist() directly in create()",
      "right": "Wrap entire store in persist()",
      "reason": "TypeScript inference breaks otherwise",
      "severity": "medium",
      "relatedFiles": ["src/stores/authStore.ts"]
    }
  ],

  "discoveries": [
    {
      "category": "api",
      "description": "fetch() doesn't throw on HTTP errors",
      "relevance": "high"
    }
  ],

  "patternsLearned": [
    {
      "name": "Error Boundary Pattern",
      "antiPattern": "No error boundary in React tree",
      "pattern": "Wrap components in ErrorBoundary",
      "description": "Prevents white screen of death"
    }
  ]
}
```

---

## Formato de Saída

### Estrutura de gotchas.md (AC2, AC3)

```markdown
# Known Gotchas

> Auto-generated from session insights
> Last updated: 2026-01-28T14:00:00Z
> Total gotchas: 15

## Table of Contents
- [State Management](#state-management) (3)
- [API](#api) (2)
...

---

## State Management

### Zustand Persist Type Inference

**[HIGH]**

**Wrong:**
```typescript
const useStore = create(
  persist((set) => ({ ... }), { name: 'store' })
);
```

**Right:**
```typescript
const useStore = create<StoreType>()(
  persist((set) => ({ ... }), { name: 'store' })
);
```

**Reason:** Without explicit type parameter and extra parentheses, TypeScript cannot infer the store type correctly.

**Severity:** High

**Discovered:** STORY-42 (2026-01-28)

---
```

### Schema de gotchas.json (AC6)

```json
{
  "schema": "aiox-gotchas-v1",
  "version": "1.0.0",
  "generatedAt": "2026-01-28T14:00:00Z",
  "statistics": {
    "total": 15,
    "bySeverity": { "high": 5, "medium": 8, "low": 2 },
    "byCategory": { "State Management": 3, "API": 2 },
    "insightsScanned": 10
  },
  "gotchas": [...],
  "categories": {...}
}
```

---

## Exemplos de CLI

```bash
# Atualizar gotchas a partir de todos os insights
node .aiox-core/infrastructure/scripts/gotchas-documenter.js update

# Listar todos os gotchas
node .aiox-core/infrastructure/scripts/gotchas-documenter.js list

# Listar apenas severidade alta
node .aiox-core/infrastructure/scripts/gotchas-documenter.js list --severity high

# Buscar gotchas específicos
node .aiox-core/infrastructure/scripts/gotchas-documenter.js search "zustand"

# Listar por categoria
node .aiox-core/infrastructure/scripts/gotchas-documenter.js category TypeScript

# Saída como JSON
node .aiox-core/infrastructure/scripts/gotchas-documenter.js list --format json
```

---

## Tratamento de Erros

**Estratégia:** graceful-degradation

**Erros Comuns:**

1. **Erro:** Nenhum arquivo de insights encontrado
   - **Causa:** Nenhum insight de sessão capturado ainda
   - **Resolução:** Execute `*capture-insights` primeiro
   - **Recuperação:** Criar um gotchas.md vazio com instruções

2. **Erro:** JSON de insights inválido
   - **Causa:** JSON malformado no arquivo de insights
   - **Resolução:** Pular o arquivo, registrar aviso
   - **Recuperação:** Continuar processando os outros arquivos

3. **Erro:** Permissão de escrita negada
   - **Causa:** Não é possível escrever no diretório .aiox
   - **Resolução:** Verificar permissões de arquivo
   - **Recuperação:** Enviar saída para stdout em vez disso

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 1-5 segundos
cost_estimated: N/A (processamento local)
token_usage: ~500 tokens (apenas para o texto de ajuda)
```

**Notas de Otimização:**
- Usa deduplicação em memória para ganho de velocidade
- Atualizações incrementais (mescla com os existentes)
- Escaneamento leve de arquivos

---

## Scripts

**Script:** gotchas-documenter.js
  - **Propósito:** Extrair e consolidar gotchas a partir dos insights de sessão
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/infrastructure/scripts/gotchas-documenter.js

---

## Dependências

- `.aiox-core/development/tasks/capture-session-insights.md` - Fornece os insights de entrada
- `.aiox-core/product/checklists/self-critique-checklist.md` - Consome os gotchas (AC5)
- `.aiox-core/development/tasks/spec-write-spec.md` - Pode referenciar os gotchas

---

## Metadata

```yaml
story: 7.4
epic: Epic 7 - Memory Layer
version: 1.0.0
dependencies:
  - capture-session-insights
tags:
  - memory
  - learning
  - gotchas
  - documentation
updated_at: 2026-01-29
```
