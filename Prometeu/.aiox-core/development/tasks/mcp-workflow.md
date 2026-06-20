# Task de Criação de Workflow MCP

> Crie workflows em Code Mode que executam no sandbox Docker MCP para ~98,7% de economia de tokens.

---

## Definição da Task

```yaml
task: mcpWorkflow()
responsavel: Dev Agent
responsavel_type: Agente
atomic_layer: Development
elicit: true

**Entrada:**
- campo: workflow_name
  tipo: string
  origem: User Input
  obrigatorio: true
  validacao: Kebab-case name (e.g., scrape-process-store)

- campo: workflow_description
  tipo: string
  origem: User Input
  obrigatorio: true
  validacao: Brief description of workflow purpose

- campo: mcps_required
  tipo: array
  origem: User Selection
  obrigatorio: true
  validacao: List of MCPs the workflow will use

- campo: input_params
  tipo: object
  origem: User Input
  obrigatorio: false
  validacao: Input parameters specification

- campo: output_format
  tipo: string
  origem: User Selection
  obrigatorio: false
  validacao: json, text, or custom

**Saida:**
- campo: workflow_file
  tipo: file
  destino: scripts/mcp-workflows/{workflow_name}.js
  persistido: true

- campo: workflow_meta
  tipo: object
  destino: Console output
  persistido: false
```

---

## Pré-Condições

```yaml
pre-conditions:
  - [ ] Docker MCP Toolkit available
    tipo: pre-condition
    blocker: true
    validacao: docker mcp --version succeeds
    error_message: "Docker MCP Toolkit not installed"

  - [ ] Required MCPs enabled
    tipo: pre-condition
    blocker: true
    validacao: All specified MCPs available in docker mcp tools ls
    error_message: "Missing MCPs - add with *add-mcp"

  - [ ] Workflow directory exists
    tipo: pre-condition
    blocker: false
    validacao: scripts/mcp-workflows/ directory exists
    error_message: "Will create directory automatically"
```

---

## Elicitação Interativa

### Passo 1: Fundamentos do Workflow

```
ELICIT: Workflow Definition

Vamos criar um novo workflow MCP!

1. Nome do workflow (kebab-case):
   Exemplo: scrape-classify, batch-process, api-sync
   → _______________

2. Breve descrição:
   O que este workflow faz?
   → _______________

3. Categoria:
   [ ] Processamento de Dados (scraping, ETL, transformação)
   [ ] Automação (tarefas agendadas, operações em lote)
   [ ] Integração (sincronização de API, operações entre sistemas)
   [ ] Análise (métricas, relatórios, classificação)
   → Selecione: ___
```

### Passo 2: Seleção de MCP

```
ELICIT: MCP Selection

Quais MCPs seu workflow vai usar?

MCPs disponíveis:
  [x] fs        - Operações de sistema de arquivos
  [ ] fetch     - Requisições HTTP, web scraping
  [ ] github    - Operações da API do GitHub
  [ ] postgres  - Banco de dados PostgreSQL
  [ ] notion    - Workspace do Notion
  [ ] puppeteer - Automação de navegador

→ Selecione os MCPs (separados por vírgula): _______________

Nota: Garanta que os MCPs selecionados estejam habilitados.
Verifique com: docker mcp tools ls
```

### Passo 3: Especificação de Entrada/Saída

```
ELICIT: Input/Output

Defina os parâmetros do workflow:

PARÂMETROS DE ENTRADA:
1. Nome do parâmetro: _______________
   Tipo: [string/number/boolean/array/object]
   Obrigatório: [s/n]
   Padrão: _______________
   Descrição: _______________

→ Adicionar outro parâmetro? (s/n): ___

FORMATO DE SAÍDA:
1. [ ] Objeto JSON (dados estruturados)
2. [ ] Texto puro (logs, relatórios)
3. [ ] Caminho de arquivo (gravar em arquivo)
4. [ ] Formato customizado

→ Selecione o formato de saída: ___
```

### Passo 4: Lógica do Workflow

```
ELICIT: Workflow Steps

Descreva a lógica do workflow:

Quais são os passos principais?

Exemplo para "scrape-classify":
1. Buscar o conteúdo da URL (MCP fetch)
2. Extrair texto do HTML (processamento local)
3. Classificar o conteúdo (processamento local)
4. Salvar os resultados em arquivo (MCP fs)

Os passos do seu workflow:
1. _______________
2. _______________
3. _______________
4. _______________

→ Algum passo adicional? (s/n): ___
```

### Passo 5: Tratamento de Erros

```
ELICIT: Error Handling

Como os erros devem ser tratados?

1. [ ] Fail fast - Parar no primeiro erro
2. [ ] Continuar - Registrar erros, continuar o processamento
3. [ ] Retry - Repetir operações que falharam (especificar tentativas)

→ Selecione a estratégia: ___

Tentativas de retry (se selecionado): ___
```

---

## Passos de Implementação

### 1. Criar o Arquivo do Workflow

Use o template: `.aiox-core/product/templates/mcp-workflow.js`

```javascript
/**
 * {WORKFLOW_NAME}
 * {WORKFLOW_DESCRIPTION}
 *
 * MCPs: {MCP_LIST}
 * Token Savings: ~98.7%
 */

'use strict';

const WORKFLOW_META = {
  name: '{workflow_name}',
  version: '1.0.0',
  description: '{workflow_description}',
  mcps_required: [{mcp_list}],
};

async function runWorkflow(params) {
  const startTime = Date.now();

  try {
    // Step 1: {step1_description}
    console.log('[1/{total}] {step1_action}...');
    // Implementation

    // Step 2: {step2_description}
    console.log('[2/{total}] {step2_action}...');
    // Implementation

    // Return minimal result to LLM
    return {
      success: true,
      // Minimal output fields
      processingTime: `${Date.now() - startTime}ms`,
    };

  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

module.exports = { runWorkflow, WORKFLOW_META };
```

### 2. Salvar no Diretório de Workflows

```bash
# File location
scripts/mcp-workflows/{workflow_name}.js

# Make executable (Linux/macOS)
chmod +x scripts/mcp-workflows/{workflow_name}.js
```

### 3. Testar o Workflow

```bash
# Run in Docker MCP
docker mcp exec ./scripts/mcp-workflows/{workflow_name}.js

# With parameters
docker mcp exec ./scripts/mcp-workflows/{workflow_name}.js --param value
```

### 4. Documentar o Workflow

Adicione uma entrada em scripts/mcp-workflows/README.md:

```markdown
### {workflow_name}

**Purpose:** {workflow_description}

**MCPs:** {mcp_list}

**Usage:**
\`\`\`bash
docker mcp exec ./scripts/mcp-workflows/{workflow_name}.js --param value
\`\`\`

**Parameters:**
- `param1` - Description (required/optional)
- `param2` - Description (required/optional)
```

---

## Pós-Condições

```yaml
post-conditions:
  - [ ] Workflow file created
    tipo: post-condition
    blocker: true
    validacao: File exists at scripts/mcp-workflows/{workflow_name}.js
    error_message: "Workflow file not created"

  - [ ] Workflow executes
    tipo: post-condition
    blocker: true
    validacao: docker mcp exec completes without error
    error_message: "Workflow execution failed"

  - [ ] README updated
    tipo: post-condition
    blocker: false
    validacao: Workflow documented in README.md
    error_message: "Remember to document workflow"
```

---

## Saída de Sucesso

```
✅ MCP Workflow Created Successfully!

📄 File: scripts/mcp-workflows/{workflow_name}.js
📝 Description: {workflow_description}

🔧 MCPs Used:
   • fs - File system operations
   • fetch - HTTP requests

📋 Parameters:
   • url (required) - URL to process
   • output (optional) - Output file path

🚀 Run with:
   docker mcp exec ./scripts/mcp-workflows/{workflow_name}.js --url https://example.com

💾 Token Savings: ~98.7% vs direct LLM processing

Next steps:
1. Test: docker mcp exec ./scripts/mcp-workflows/{workflow_name}.js --help
2. Customize: Edit the workflow logic
3. Document: Update scripts/mcp-workflows/README.md
```

---

## Templates de Workflow

### Processamento de Dados

```javascript
async function processData(params) {
  const { inputPath, outputPath } = params;

  // Read input (fs MCP)
  const data = await mcp.fs.readFile(inputPath);

  // Process locally (no tokens)
  const processed = transform(JSON.parse(data));

  // Write output (fs MCP)
  await mcp.fs.writeFile(outputPath, JSON.stringify(processed));

  return { success: true, recordsProcessed: processed.length };
}
```

### Web Scraping

```javascript
async function scrapeWeb(params) {
  const { url, selector } = params;

  // Fetch page (fetch MCP)
  const html = await mcp.fetch.get(url);

  // Extract data locally (no tokens)
  const extracted = extractData(html, selector);

  return { success: true, itemsFound: extracted.length };
}
```

### Integração de API

```javascript
async function syncData(params) {
  const { sourceApi, targetPath } = params;

  // Fetch from API (fetch MCP)
  const response = await mcp.fetch.get(sourceApi);

  // Transform locally (no tokens)
  const transformed = mapToLocalFormat(response);

  // Save locally (fs MCP)
  await mcp.fs.writeFile(targetPath, JSON.stringify(transformed));

  return { success: true, recordsSynced: transformed.length };
}
```

---

## Comparação de Economia de Tokens

| Abordagem | Tokens | Processamento |
|----------|--------|------------|
| LLM Direto | ~10,000 | Contexto do LLM |
| Chamadas de Ferramenta MCP | ~5,000 | Overhead de ferramentas |
| **Code Mode** | ~130 | **Sandbox** |

**Economia: ~98,7%**

---

## Metadados

```yaml
task: mcp-workflow
version: 1.0.0
story: Story 5.11 - Docker MCP Migration
dependencies:
  - Docker MCP Toolkit
  - Template: .aiox-core/product/templates/mcp-workflow.js
tags:
  - development
  - mcp
  - code-mode
  - workflow
updated_at: 2025-12-08
agents:
  - dev
```
