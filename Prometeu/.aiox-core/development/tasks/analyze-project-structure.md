# Analisar Estrutura do Projeto

**Propósito:** Analisar um projeto AIOX existente para entender sua estrutura, serviços, padrões e fornecer recomendações para implementar novas features. Esta é a Fase 1 do Incremental Feature Workflow.

---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Varredura rápida com recomendações padrão
- Interação mínima com o usuário
- **Melhor para:** Avaliações rápidas, projetos familiares

### 2. Modo Interativo - Equilibrado, Educativo (3-5 prompts) **[PADRÃO]**
- Análise detalhada com explicação
- Entrada do usuário sobre os requisitos da feature
- **Melhor para:** Primeira análise, novas features

### 3. Modo Abrangente - Análise Completa
- Varredura completa do projeto
- Todos os padrões documentados
- **Melhor para:** Projetos grandes, features importantes

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: analyzeProjectStructure()
responsible: architect (Aria)
responsible_type: Agent
atomic_layer: Analysis
elicit: true

inputs:
- field: feature_description
  type: string
  source: User Input
  required: true
  validation: String não vazia descrevendo a feature a adicionar

- field: project_path
  type: string
  source: User Input or cwd
  required: false
  validation: Caminho de diretório válido com .aiox-core/

- field: executionMode
  type: string
  source: User Input
  required: false
  validation: yolo|interactive|comprehensive

outputs:
- field: project_analysis
  type: markdown
  destination: docs/architecture/project-analysis.md
  persisted: true

- field: recommended_approach
  type: markdown
  destination: docs/architecture/recommended-approach.md
  persisted: true

- field: service_inventory
  type: array
  destination: Memory
  persisted: false
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] O projeto tem o diretório .aiox-core/
    type: pre-condition
    blocker: true
    validation: |
      Verificar se o diretório .aiox-core/ existe na raiz do projeto
    error_message: "Pré-condição falhou: Não é um projeto AIOX (.aiox-core/ não encontrado)"

  - [ ] O caminho do projeto está acessível
    type: pre-condition
    blocker: true
    validation: |
      Verificar se o diretório do projeto existe e é legível
    error_message: "Pré-condição falhou: Caminho do projeto não acessível"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a conclusão da task

**Checklist:**

```yaml
post-conditions:
  - [ ] Documento de análise do projeto gerado
    type: post-condition
    blocker: true
    validation: |
      Verificar se docs/architecture/project-analysis.md existe e está populado
    error_message: "Pós-condição falhou: Análise do projeto não gerada"

  - [ ] Documento de abordagem recomendada gerado
    type: post-condition
    blocker: true
    validation: |
      Verificar se docs/architecture/recommended-approach.md existe e está populado
    error_message: "Pós-condição falhou: Abordagem recomendada não gerada"

  - [ ] Inventário de serviços capturado
    type: post-condition
    blocker: false
    validation: |
      Verificar se ao menos a estrutura básica do projeto foi analisada
    error_message: "Aviso: O inventário de serviços pode estar incompleto"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de aprovação/reprovação para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Estrutura do projeto varrida
    type: acceptance-criterion
    blocker: true
    validation: |
      Afirmar que a configuração .aiox-core/ foi analisada
    error_message: "Critério de aceite não atendido: Estrutura do projeto não varrida"

  - [ ] Inventário de serviços completo
    type: acceptance-criterion
    blocker: true
    validation: |
      Afirmar que os serviços em infrastructure/services/ foram listados
    error_message: "Critério de aceite não atendido: Inventário de serviços incompleto"

  - [ ] Análise de padrões realizada
    type: acceptance-criterion
    blocker: true
    validation: |
      Afirmar que os padrões de linguagem, testes e configuração foram identificados
    error_message: "Critério de aceite não atendido: Análise de padrões não realizada"

  - [ ] Recomendações geradas
    type: acceptance-criterion
    blocker: true
    validation: |
      Afirmar que o documento recommended_approach tem o tipo de serviço e os passos de implementação
    error_message: "Critério de aceite não atendido: Recomendações não geradas"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** filesystem
  - **Propósito:** Ler arquivos do projeto e a estrutura de diretórios

- **Ferramenta:** glob
  - **Propósito:** Encontrar arquivos que correspondem a padrões

- **Ferramenta:** grep
  - **Propósito:** Buscar padrões no conteúdo dos arquivos

---

## Tratamento de Erros

**Estratégia:** graceful-degradation

**Erros Comuns:**

1. **Erro:** Nenhum Diretório .aiox-core/
   - **Causa:** Não é um projeto AIOX
   - **Resolução:** Inicializar o AIOX primeiro ou verificar o diretório
   - **Recuperação:** Sair com uma mensagem clara

2. **Erro:** Nenhum Serviço Encontrado
   - **Causa:** Projeto novo ou serviços em local diferente
   - **Resolução:** Prosseguir com análise mínima
   - **Recuperação:** Gerar análise anotando "Nenhum serviço existente"

3. **Erro:** Permissão Negada
   - **Causa:** Não foi possível ler certos diretórios
   - **Resolução:** Pular áreas inacessíveis
   - **Recuperação:** Anotar na análise, continuar com os arquivos acessíveis

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 30s-2min
cost_estimated: $0.001-0.003
token_usage: ~500-1.500 tokens
```

**Notas de Otimização:**
- As varreduras de diretório são O(n) para diretórios de serviço
- As leituras de arquivo são cacheadas durante a análise
- A detecção de padrões usa regex eficiente

---

## Metadados

```yaml
story: WIS-15
version: 1.0.0
dependencies:
  - filesystem access
  - glob tool
tags:
  - analysis
  - architecture
  - incremental-feature
  - wis
created_at: 2025-12-23
updated_at: 2025-12-23
```

---

## Instruções da Task

### Passo 1: Elicitação - Coletar Requisitos

**Informações Necessárias:**

Apresente estes prompts ao usuário:

```
1. "Qual feature/serviço precisa ser adicionado?"
   [ENTRADA DE TEXTO - Obrigatório]
   Exemplo: "Integração com a API do TikTok para gestão de criadores"

2. "Esta feature requer integração com API externa?"
   [ESCOLHA: Sim / Não / Incerto]

3. "Esta feature precisará de mudanças no banco de dados?"
   [ESCOLHA: Sim / Não / Incerto]
```

**Armazene as respostas para a geração de recomendações.**

---

### Passo 2: Varredura da Estrutura do Projeto

**Varra os seguintes locais:**

```javascript
// Estrutura central do AIOX
const scanLocations = {
  aioxCore: '.aiox-core/',
  services: '.aiox-core/infrastructure/services/',
  squads: '.aiox-core/squads/',
  agents: '.aiox-core/development/agents/',
  tasks: '.aiox-core/development/tasks/',
  data: '.aiox-core/data/'
};
```

**Para cada local, identifique:**
- O diretório existe (boolean)
- Arquivos/subdiretórios presentes
- Arquivos de configuração chave

**Inventário de Serviços:**

Para cada serviço em `infrastructure/services/`:
1. Nome do serviço (nome do diretório)
2. Linguagem (JS vs TS - verificar arquivos .ts)
3. Tem testes (verificar __tests__/ ou arquivos *.test.*)
4. Tem README (verificar README.md)
5. Ponto de entrada (index.ts ou index.js)

---

### Passo 3: Análise de Padrões

**Analise os seguintes padrões:**

#### 3.1 Uso de Linguagem
```javascript
// Conta as extensões de arquivo
const languagePatterns = {
  typescript: glob('**/*.ts').length,
  javascript: glob('**/*.js').length,
  ratio: typescript / (typescript + javascript)
};

// Determina a linguagem primária
const primaryLanguage = ratio > 0.5 ? 'TypeScript' : 'JavaScript';
```

#### 3.2 Abordagem de Testes
```javascript
// Verifica frameworks de teste
const testingPatterns = {
  jest: exists('jest.config.js') || exists('jest.config.ts'),
  vitest: exists('vitest.config.ts'),
  mocha: exists('.mocharc.js'),
  hasTests: glob('**/*.test.{ts,js}').length > 0 ||
            glob('**/*.spec.{ts,js}').length > 0
};

// Determina o framework de teste
const testFramework = jest ? 'Jest' : vitest ? 'Vitest' : 'None detected';
```

#### 3.3 Estilo de Documentação
```javascript
// Verifica os padrões de documentação
const docPatterns = {
  hasReadmes: glob('**/README.md').length,
  hasJSDoc: grep('@param|@returns|@example', '**/*.{ts,js}').length > 0,
  hasTypedoc: exists('typedoc.json')
};
```

#### 3.4 Padrões de Configuração
```javascript
// Verifica as abordagens de configuração
const configPatterns = {
  envVars: exists('.env.example') || exists('.env.local'),
  configFile: exists('aiox.config.js') || exists('.aiox-core/core-config.yaml'),
  envPrefix: grep('process.env', '**/*.{ts,js}').length > 0
};
```

---

### Passo 4: Gerar Recomendações

Com base nas respostas da elicitação e na análise de padrões:

#### 4.1 Recomendação de Tipo de Serviço

| Resposta do Usuário | Padrão Detectado | Recomendação |
|---------------|------------------|----------------|
| API Externa = Sim | Serviços de API existentes | **API Integration** |
| API Externa = Não, DB = Sim | Serviços de dados existem | **Utility Service** |
| Incerto | Nenhum padrão claro | **Utility Service** (padrão) |
| Tooling de agente mencionado | Squads configurados | **Agent Tool (MCP)** |

#### 4.2 Sugestão de Estrutura de Arquivos

Com base nos padrões de serviço existentes, sugira a estrutura:

```
.aiox-core/infrastructure/services/{service-name}/
├── README.md           # Documentação
├── index.ts            # Ponto de entrada (factory + exports)
├── client.ts           # Cliente HTTP (se integração de API)
├── types.ts            # Interfaces TypeScript
├── errors.ts           # Classes de erro
├── __tests__/          # Diretório de testes
│   └── index.test.ts
├── package.json        # Dependências
└── tsconfig.json       # Config do TypeScript
```

#### 4.3 Atribuição de Agente

| Tipo de Serviço | Agente Primário | Agente de Apoio |
|--------------|---------------|---------------|
| API Integration | @dev | @qa |
| Utility Service | @dev | @architect |
| Agent Tool | @dev | @devops |
| Database-heavy | @data-engineer | @dev |

---

### Passo 5: Gerar Documentos de Saída

#### 5.1 Documento de Análise do Projeto

Gere `docs/architecture/project-analysis.md`:

```markdown
# Project Analysis: {feature_name}

**Generated:** {date}
**Generated By:** @architect (Aria)
**Story:** WIS-15

---

## Project Structure

| Aspect | Value |
|--------|-------|
| Framework | AIOX-FullStack |
| Primary Language | {primaryLanguage} |
| Existing Services | {serviceCount} |
| Testing Framework | {testFramework} |
| Configuration | {configApproach} |

---

## Existing Services

| Service | Type | Language | Tests | README |
|---------|------|----------|-------|--------|
{for each service}
| {name} | {type} | {language} | {hasTests} | {hasReadme} |
{end for}

---

## Pattern Summary

### Language Distribution
- **TypeScript:** {tsCount} files ({tsPercent}%)
- **JavaScript:** {jsCount} files ({jsPercent}%)

### Testing
- **Framework:** {testFramework}
- **Test Files:** {testFileCount}
- **Coverage:** {coverageNote}

### Configuration
- **Environment Variables:** {envVarsUsed}
- **Config Files:** {configFilesUsed}

---

## Squad Configuration

{if squads exist}
| Squad | Agents | Services |
|-------|--------|----------|
{for each squad}
| {squadName} | {agentCount} | {serviceCount} |
{end for}
{else}
No squads configured.
{end if}
```

#### 5.2 Documento de Abordagem Recomendada

Gere `docs/architecture/recommended-approach.md`:

```markdown
# Recommended Approach: {feature_name}

**Generated:** {date}
**Generated By:** @architect (Aria)
**Story:** WIS-15

---

## Feature Requirements

**Description:** {feature_description}
**API Integration Required:** {apiRequired}
**Database Changes Required:** {dbRequired}

---

## Service Type

**Recommendation:** {serviceType}

**Rationale:** {rationale based on analysis}

---

## Suggested Structure

```
.aiox-core/infrastructure/services/{service_name}/
├── README.md
├── index.ts
├── client.ts          {if apiIntegration}
├── types.ts
├── errors.ts
├── __tests__/
│   └── index.test.ts
├── package.json
└── tsconfig.json
```

---

## Implementation Steps

1. **Scaffold Service**
   - Use `*create-service` task to generate structure
   - Select type: {serviceType}

2. **Implement Core Logic**
   - Create {mainModules}
   - Follow existing patterns from {referenceService}

3. **Add Tests**
   - Use {testFramework}
   - Target >70% coverage

4. **Documentation**
   - Update README.md
   - Add JSDoc comments

5. **Integration**
   - {integrationSteps based on type}

---

## Agent Assignment

| Role | Agent | Responsibilities |
|------|-------|------------------|
| Primary | @{primaryAgent} | {primaryResponsibilities} |
| Support | @{supportAgent} | {supportResponsibilities} |

---

## Dependencies

{list of dependencies based on service type}

---

## Next Steps

After this analysis:
1. Review and approve this approach
2. Run `*create-service {service_name}` to scaffold
3. Implement following the steps above
```

---

### Passo 5.5: Inteligência de Código: Dependência & Complexidade (Opcional — Pular automaticamente se indisponível)

> **Condição:** Executar apenas se `isCodeIntelAvailable()` retornar true.
> Se nenhum provedor de inteligência de código estiver disponível, pule este passo silenciosamente e prossiga para o Passo 6.

Quando a inteligência de código está disponível, enriqueça a análise com dados reais de dependência e complexidade:

```javascript
const { isCodeIntelAvailable } = require('.aiox-core/core/code-intel');
const { getDependencyGraph, getComplexityAnalysis } = require('.aiox-core/core/code-intel/helpers/planning-helper');

if (isCodeIntelAvailable()) {
  const depGraph = await getDependencyGraph(projectPath);
  const complexity = await getComplexityAnalysis(serviceEntryPoints);

  // Adicionar ao project-analysis.md:
  // - depGraph.dependencies: grafo real de dependências de módulos
  // - depGraph.summary: { totalDeps, depth }
  // - complexity.perFile: pontuação de complexidade por arquivo
  // - complexity.average: complexidade média entre os arquivos analisados
}
```

**Se os dados estiverem disponíveis, adicione estas seções aos documentos de análise:**

**Grafo de Dependências (Inteligência de Código):**

| Métrica | Valor |
|--------|-------|
| Total de Dependências | {{depGraph.summary.totalDeps}} |
| Profundidade de Dependências | {{depGraph.summary.depth}} |

{{depGraph.dependencies key relationships}}

**Métricas de Complexidade (Inteligência de Código):**

| Arquivo | Pontuação de Complexidade |
|------|-----------------|
{{for each complexity.perFile}}
| {{file}} | {{complexity.score}} |
{{end for}}

**Complexidade Média:** {{complexity.average}}

> **Nota:** Estas métricas são de análise real de código, não estimativas.

---

### Passo 6: Apresentar Resultados

Exiba o resumo ao usuário:

```
=== Project Analysis Complete ===

Project: {projectName}
Services Found: {serviceCount}
Primary Language: {primaryLanguage}
Testing: {testFramework}

=== Recommendation ===

Feature: {feature_name}
Service Type: {serviceType}
Primary Agent: @{primaryAgent}

Documents Generated:
  1. docs/architecture/project-analysis.md
  2. docs/architecture/recommended-approach.md

Next Steps:
  1. Review the recommended approach
  2. Run `*create-service {service_name}` to scaffold
  3. Begin implementation with @{primaryAgent}

Would you like me to proceed with `*create-service`?
```

---

## Critérios de Sucesso

- [ ] Requisitos da feature capturados do usuário
- [ ] Estrutura do projeto varrida por completo
- [ ] Todos os serviços existentes inventariados
- [ ] Padrões de linguagem e testes identificados
- [ ] Recomendação de tipo de serviço fornecida
- [ ] Sugestão de estrutura de arquivos baseada nos padrões
- [ ] Atribuição de agente recomendada
- [ ] project-analysis.md gerado
- [ ] recommended-approach.md gerado

---

## Integração com Outras Tasks

Esta task é tipicamente seguida por:

1. **`*create-service`** - Fazer scaffold do novo serviço (WIS-11)
2. **`*create-integration`** - Para integrações de API (WIS-12)
3. **`*extend-squad-tools`** - Adicionar ao squad se necessário (WIS-13)

---

## Notas

- Esta task é somente-leitura; nenhum arquivo do projeto é modificado
- Execute isto ANTES de criar novos serviços
- As recomendações são sugestões, não requisitos
- Para projetos grandes, a análise pode levar de 1 a 2 minutos
- Sempre revise os documentos gerados antes de prosseguir
