---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/templates/_indice|_indice]]"
---

# Padrão de Integração de Code Intelligence

> Padrão padrão para integrar code intelligence em novas tasks e helpers.
> Siga este template para garantir uma integração consistente, agnóstica de provider e com fallback gracioso.

## Visão Geral do Padrão

```
import → guarda isCodeIntelAvailable → enrich → fallback (retorna null)
```

Todas as integrações de code intelligence DEVEM seguir este padrão de 4 passos:

1. **Import** a partir da API pública de code-intel (`../index` ou caminho relativo)
2. **Guard** com `isCodeIntelAvailable()` — retorne null se não houver provider
3. **Enrich** chamando as capacidades do enricher/client dentro de try/catch
4. **Fallback** — sempre retorne null em qualquer erro, nunca lance exceção (throw)

## Exemplo Completo

```javascript
'use strict';

const { getEnricher, getClient, isCodeIntelAvailable } = require('../index');

/**
 * ModuleDoc — descreva o propósito do helper e o agent/task alvo.
 *
 * Todas as funções retornam null graciosamente quando nenhum provider está disponível.
 * Nunca lança exceção — seguro para chamar incondicionalmente em workflows de task.
 */

async function myFunction(param) {
  // Passo 1: Validação de entrada
  if (!param) return null;

  // Passo 2: Guarda de provider
  if (!isCodeIntelAvailable()) return null;

  try {
    // Passo 3: Chame o enricher (composto) ou o client (primitivo)
    const enricher = getEnricher();
    const result = await enricher.someCapability(param);

    // Valide o resultado
    if (!result) return null;

    // Passo 4: Formate e retorne
    return {
      // ... resultado formatado
    };
  } catch {
    // Nunca lance exceção — retorne null em qualquer erro
    return null;
  }
}

module.exports = { myFunction };
```

## Padrão de Resultados Parciais

Ao chamar múltiplas capacidades, use try/catch por capacidade para aceitar resultados parciais:

```javascript
async function multiCapabilityFunction(param) {
  if (!param) return null;
  if (!isCodeIntelAvailable()) return null;

  try {
    const enricher = getEnricher();
    const client = getClient();

    let dataA = null;
    let dataB = null;

    try {
      dataA = await enricher.describeProject(param);
    } catch { /* pular — resultado parcial ok */ }

    try {
      dataB = await client.findReferences(param);
    } catch { /* pular — resultado parcial ok */ }

    // Retorne null apenas se não obtivemos nada
    if (!dataA && !dataB) return null;

    return { dataA, dataB };
  } catch {
    return null;
  }
}
```

## Capacidades Disponíveis

### Enricher (composto — via `getEnricher()`)

| Capacidade | Entrada | Saída | Caso de Uso |
|-----------|-------|--------|----------|
| `describeProject(path)` | String de caminho | `{ codebase, stats }` | Visão geral do projeto |
| `getConventions(path)` | String de caminho | `{ patterns, stats }` | Padrões de nomenclatura/código |
| `detectDuplicates(desc, opts)` | Descrição + opções | `{ matches, codebaseOverview }` | Detecção de duplicatas |
| `assessImpact(files)` | Array de arquivos | `{ blastRadius, references, complexity }` | Impacto de mudança |
| `findTests(symbol)` | Nome do símbolo | Referências de arquivos de teste | Descoberta de testes |

### Client (primitivo — via `getClient()`)

| Capacidade | Entrada | Saída | Caso de Uso |
|-----------|-------|--------|----------|
| `findReferences(symbol)` | Nome do símbolo | `[{ file, line, context }]` | Uso do símbolo |
| `findDefinition(symbol)` | Nome do símbolo | `{ file, line, column }` | Definição do símbolo |
| `analyzeDependencies(path)` | String de caminho | `{ nodes, edges }` | Grafo de dependências |
| `findCallers(symbol)` | Nome do símbolo | Referências de quem chama | Grafo de chamadas (entrada) |
| `findCallees(symbol)` | Nome do símbolo | Referências de quem é chamado | Grafo de chamadas (saída) |
| `analyzeComplexity(path)` | String de caminho | Métricas de complexidade | Complexidade de código |
| `analyzeCodebase(path)` | String de caminho | Visão geral do codebase | Análise completa |
| `getProjectStats(path)` | String de caminho | Estatísticas do projeto | Apenas estatísticas |

## Padrão de Testes

### Estratégia de Mock

```javascript
// Faça mock do módulo code-intel no topo do seu arquivo de teste
jest.mock('../../.aiox-core/core/code-intel/index', () => ({
  isCodeIntelAvailable: jest.fn(),
  getEnricher: jest.fn(),
  getClient: jest.fn(),
}));

const {
  isCodeIntelAvailable,
  getEnricher,
  getClient,
} = require('../../.aiox-core/core/code-intel/index');
```

### Cenários de Teste Obrigatórios

Toda integração de code intelligence DEVE testar:

1. **Happy path** — provider disponível, dados retornados
2. **Fallback** — provider indisponível (`isCodeIntelAvailable` retorna false)
3. **Tratamento de erro** — provider lança exceção (enricher/client rejeita)
4. **Entrada vazia** — parâmetros null/vazios
5. **Resultados parciais** — uma capacidade falha, outra tem sucesso (se multi-capacidade)

### Configuração de Helper de Teste

```javascript
function setupProviderAvailable() {
  isCodeIntelAvailable.mockReturnValue(true);
}

function setupProviderUnavailable() {
  isCodeIntelAvailable.mockReturnValue(false);
}

function createMockEnricher(overrides = {}) {
  const enricher = {
    detectDuplicates: jest.fn().mockResolvedValue(null),
    getConventions: jest.fn().mockResolvedValue(null),
    describeProject: jest.fn().mockResolvedValue(null),
    assessImpact: jest.fn().mockResolvedValue(null),
    findTests: jest.fn().mockResolvedValue(null),
    ...overrides,
  };
  getEnricher.mockReturnValue(enricher);
  return enricher;
}

function createMockClient(overrides = {}) {
  const client = {
    findReferences: jest.fn().mockResolvedValue(null),
    findDefinition: jest.fn().mockResolvedValue(null),
    analyzeDependencies: jest.fn().mockResolvedValue(null),
    // ... adicione outras capacidades conforme necessário
    ...overrides,
  };
  getClient.mockReturnValue(client);
  return client;
}
```

## Helpers Existentes (Referência)

| Helper | Agente | Funções | Story |
|--------|-------|-----------|-------|
| `dev-helper.js` | @dev | checkBeforeWriting, suggestReuse, getConventionsForPath, assessRefactoringImpact | NOG-3 |
| `qa-helper.js` | @qa | validateTestCoverage, detectRegressionRisk | NOG-4 |
| `planning-helper.js` | @architect | analyzeComplexity, suggestArchitecture | NOG-5 |
| `story-helper.js` | @sm/@po | detectDuplicateStory, suggestRelevantFiles, validateNoDuplicates | NOG-6 |
| `devops-helper.js` | @devops | assessDeploymentRisk, validatePipelineImpact | NOG-7 |
| `creation-helper.js` | squad-creator | getCodebaseContext, checkDuplicateArtefact, enrichRegistryEntry | NOG-8 |

---

*Template criado para a Story NOG-8 — Code Intelligence Integration Pattern*
