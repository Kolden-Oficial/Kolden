---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com logging
- Interação mínima do usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pre-Flight - Planejamento Abrangente Antecipado
- Fase de análise da tarefa (identificar todas as ambiguidades)
- Execução com zero ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Tarefa (AIOX Task Format V1.0)

```yaml
task: qaGenerateTests()
responsável: Quinn (Guardian)
responsavel_type: Agente
atomic_layer: Config

**Entrada:**
- campo: target
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Must exist

- campo: criteria
  tipo: array
  origem: config
  obrigatório: true
  validação: Non-empty validation criteria

- campo: strict
  tipo: boolean
  origem: User Input
  obrigatório: false
  validação: Default: true

**Saída:**
- campo: validation_result
  tipo: boolean
  destino: Return value
  persistido: false

- campo: errors
  tipo: array
  destino: Memory
  persistido: false

- campo: report
  tipo: object
  destino: File (.ai/*.json)
  persistido: true
```

---

## Pré-Condições

**Purpose:** Validar pré-requisitos ANTES da execução da tarefa (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Validation rules loaded; target available for validation
    tipo: pre-condition
    blocker: true
    validação: |
      Check validation rules loaded; target available for validation
    error_message: "Pré-condição falhou: Regras de validação carregadas; target disponível para validação"
```

---

## Pós-Condições

**Purpose:** Validar o sucesso da execução APÓS a conclusão da tarefa

**Checklist:**

```yaml
post-conditions:
  - [ ] Validation executed; results accurate; report generated
    tipo: post-condition
    blocker: true
    validação: |
      Verify validation executed; results accurate; report generated
    error_message: "Pós-condição falhou: Validação executada; resultados precisos; relatório gerado"
```

---

## Critérios de Aceite

**Purpose:** Critérios definitivos de aprovação/reprovação para a conclusão da tarefa

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Validation rules applied; pass/fail accurate; actionable feedback
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Assert validation rules applied; pass/fail accurate; actionable feedback
    error_message: "Critério de aceite não atendido: Regras de validação aplicadas; aprovação/reprovação precisa; feedback acionável"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta tarefa:**

- **Tool:** validation-engine
  - **Purpose:** Validação e geração de relatórios baseada em regras
  - **Source:** .aiox-core/utils/validation-engine.js

- **Tool:** schema-validator
  - **Purpose:** Validação de schema JSON/YAML
  - **Source:** ajv ou similar

---

## Scripts

**Código específico do agente para esta tarefa:**

- **Script:** run-validation.js
  - **Purpose:** Executar regras de validação e gerar relatório
  - **Language:** JavaScript
  - **Location:** .aiox-core/scripts/run-validation.js

---

## Tratamento de Erros

**Strategy:** retry

**Common Errors:**

1. **Error:** Critérios de Validação Ausentes
   - **Cause:** Regras de validação obrigatórias não definidas
   - **Resolution:** Garantir que os critérios de validação sejam carregados a partir do config
   - **Recovery:** Usar regras de validação padrão, registrar aviso

2. **Error:** Schema Inválido
   - **Cause:** O target não corresponde ao schema esperado
   - **Resolution:** Atualizar o schema ou corrigir a estrutura do target
   - **Recovery:** Relatório detalhado de erro de validação

3. **Error:** Dependência Ausente
   - **Cause:** Dependência obrigatória para validação não encontrada
   - **Resolution:** Instalar as dependências ausentes
   - **Recovery:** Abortar com lista clara de dependências

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 2-10 min (estimated)
cost_estimated: $0.001-0.008
token_usage: ~800-2,500 tokens
```

**Notas de Otimização:**
- Validar a configuração cedo; usar escritas atômicas; implementar checkpoints de rollback

---

## Metadados

```yaml
story: N/A
version: 1.0.0
dependencies:
  - N/A
tags:
  - quality-assurance
  - testing
updated_at: 2025-11-17
```

---

tools:
  - github-cli
# TODO: Create test-generation-checklist.md for validation (follow-up story needed)
# checklists:
#   - test-generation-checklist.md
---

# Generate Tests - AIOX Developer Task

## Propósito
Gerar automaticamente suítes de teste abrangentes para componentes do framework usando análise de IA e sistemas de template.

## Padrão de Comando
```
*generate-tests <component-type> <component-name> [options]
```

## Parâmetros
- `component-type`: Tipo de componente (agent, task, workflow, util)
- `component-name`: Nome/ID do componente para o qual gerar testes
- `options`: Configuração de geração de testes

### Opções
- `--test-type <type>`: Tipo de testes a gerar (unit, integration, e2e, all)
- `--coverage-target <percentage>`: Percentual alvo de cobertura de código (padrão: 80)
- `--framework <name>`: Framework de teste a usar (jest, mocha, vitest)
- `--mock-level <level>`: Nível de mocking (minimal, moderate, extensive)
- `--update-existing`: Atualizar arquivos de teste existentes em vez de criar novos
- `--quality-level <level>`: Nível de qualidade dos testes (basic, standard, comprehensive)
- `--output-dir <path>`: Diretório de saída customizado para os testes gerados

## Exemplos
```bash
# Generate unit tests for an agent
*generate-tests agent weather-fetcher --test-type unit --coverage-target 90

# Generate comprehensive test suite for a utility
*generate-tests util logger --test-type all --quality-level comprehensive

# Update existing tests for a task
*generate-tests task data-processor --update-existing --coverage-target 85

# Generate integration tests with extensive mocking
*generate-tests workflow user-onboarding --test-type integration --mock-level extensive

# Generate tests for all component types
*generate-tests all components --framework vitest --output-dir tests/auto-generated
```

## Implementação

```javascript
const fs = require('fs').promises;
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');

class GenerateTestsTask {
  constructor() {
    this.taskName = 'generate-tests';
    this.description = 'Generate comprehensive test suites for framework components';
    this.rootPath = process.cwd();
    this.testTemplateSystem = null;
    this.testGenerator = null;
    this.coverageAnalyzer = null;
    this.qualityAssessment = null;
  }

  async execute(params) {
    try {
      console.log(chalk.blue('🧪 AIOX Test Generation'));
      console.log(chalk.gray('Generating comprehensive test suites for components\n'));

      // Parse and validate parameters
      const config = await this.parseParameters(params);
      
      // Initialize dependencies
      await this.initializeDependencies();

      // Analyze target components
      const components = await this.identifyTargetComponents(config);
      if (components.length === 0) {
        throw new Error('No components found matching the criteria');
      }

      console.log(chalk.gray(`Found ${components.length} component(s) for test generation`));

      // Generate test plan
      const testPlan = await this.generateTestPlan(components, config);

      // Display test generation summary
      await this.displayTestGenerationSummary(testPlan);

      // Request confirmation
      const confirmed = await this.requestConfirmation(testPlan);
      if (!confirmed) {
        console.log(chalk.gray('Test generation cancelled'));
        return;
      }

      // Execute test generation
      const generationResults = await this.executeTestGeneration(testPlan);

      // Analyze generated tests
      const analysisResults = await this.analyzeGeneratedTests(generationResults);

      // Update existing test documentation
      await this.updateTestDocumentation(generationResults);

      // Display success summary
      console.log(chalk.green('\n✅ Test generation completed successfully'));
      console.log(chalk.gray(`   Components tested: ${components.length}`));
      console.log(chalk.gray(`   Test files generated: ${generationResults.testFilesGenerated}`));
      console.log(chalk.gray(`   Expected coverage: ${analysisResults.expectedCoverage}%`));
      console.log(chalk.gray(`   Quality score: ${analysisResults.qualityScore}/10`));

      return {
        success: true,
        components: components.length,
        testFilesGenerated: generationResults.testFilesGenerated,
        expectedCoverage: analysisResults.expectedCoverage,
        qualityScore: analysisResults.qualityScore
      };

    } catch (error) {
      console.error(chalk.red(`\n❌ Test generation failed: ${error.message}`));
      throw error;
    }
  }

  async parseParameters(params) {
    if (params.length < 2 && params[0] !== 'all') {
      throw new Error('Usage: *generate-tests <component-type> <component-name> [options]');
    }

    const config = {
      componentType: params[0],
      componentName: params[1] || null,
      testType: 'unit',
      coverageTarget: 80,
      framework: 'jest',
      mockLevel: 'moderate',
      updateExisting: false,
      qualityLevel: 'standard',
      outputDir: null,
      generateAll: params[0] === 'all'
    };

    // Parse options
    for (let i = 2; i < params.length; i++) {
      const param = params[i];
      
      if (param === '--update-existing') {
        config.updateExisting = true;
      } else if (param.startsWith('--test-type') && params[i + 1]) {
        config.testType = params[++i];
      } else if (param.startsWith('--coverage-target') && params[i + 1]) {
        config.coverageTarget = parseInt(params[++i]) || 80;
      } else if (param.startsWith('--framework') && params[i + 1]) {
        config.framework = params[++i];
      } else if (param.startsWith('--mock-level') && params[i + 1]) {
        config.mockLevel = params[++i];
      } else if (param.startsWith('--quality-level') && params[i + 1]) {
        config.qualityLevel = params[++i];
      } else if (param.startsWith('--output-dir') && params[i + 1]) {
        config.outputDir = params[++i];
      }
    }

    // Validation
    if (!config.generateAll) {
      const validTypes = ['agent', 'task', 'workflow', 'util'];
      if (!validTypes.includes(config.componentType)) {
        throw new Error(`Invalid component type: ${config.componentType}. Must be one of: ${validTypes.join(', ')}`);
      }
    }

    const validTestTypes = ['unit', 'integration', 'e2e', 'all'];
    if (!validTestTypes.includes(config.testType)) {
      throw new Error(`Invalid test type: ${config.testType}. Must be one of: ${validTestTypes.join(', ')}`);
    }

    const validFrameworks = ['jest', 'mocha', 'vitest'];
    if (!validFrameworks.includes(config.framework)) {
      throw new Error(`Invalid framework: ${config.framework}. Must be one of: ${validFrameworks.join(', ')}`);
    }

    const validMockLevels = ['minimal', 'moderate', 'extensive'];
    if (!validMockLevels.includes(config.mockLevel)) {
      throw new Error(`Invalid mock level: ${config.mockLevel}. Must be one of: ${validMockLevels.join(', ')}`);
    }

    const validQualityLevels = ['basic', 'standard', 'comprehensive'];
    if (!validQualityLevels.includes(config.qualityLevel)) {
      throw new Error(`Invalid quality level: ${config.qualityLevel}. Must be one of: ${validQualityLevels.join(', ')}`);
    }

    if (config.coverageTarget < 0 || config.coverageTarget > 100) {
      throw new Error('Coverage target must be between 0 and 100');
    }

    return config;
  }

  async initializeDependencies() {
    try {
      // Initialize test template system
      const TestTemplateSystem = require('../scripts/test-template-system');
      this.testTemplateSystem = new TestTemplateSystem({ rootPath: this.rootPath });
      await this.testTemplateSystem.initialize();

      // Initialize test generator
      const TestGenerator = require('../scripts/test-generator');
      this.testGenerator = new TestGenerator({ 
        rootPath: this.rootPath,
        templateSystem: this.testTemplateSystem
      });

      // Initialize coverage analyzer
      const CoverageAnalyzer = require('../scripts/coverage-analyzer');
      this.coverageAnalyzer = new CoverageAnalyzer({ rootPath: this.rootPath });

      // Initialize quality assessment
      const TestQualityAssessment = require('../scripts/test-quality-assessment');
      this.qualityAssessment = new TestQualityAssessment({ rootPath: this.rootPath });

    } catch (error) {
      throw new Error(`Failed to initialize dependencies: ${error.message}`);
    }
  }

  async identifyTargetComponents(config) {
    const components = [];

    if (config.generateAll) {
      // Find all components in the framework
      const allComponents = await this.discoverAllComponents();
      components.push(...allComponents);
    } else {
      // Find specific component
      const ComponentSearch = require('../scripts/component-search');
      const componentSearch = new ComponentSearch({ rootPath: this.rootPath });
      
      const component = await componentSearch.findComponent(config.componentType, config.componentName);
      if (!component) {
        // Suggest similar components
        const suggestions = await componentSearch.findSimilarComponents(config.componentType, config.componentName);
        if (suggestions.length > 0) {
          console.log(chalk.yellow('\nDid you mean one of these?'));
          suggestions.forEach(suggestion => {
            console.log(chalk.gray(`  - ${suggestion.type}/${suggestion.name}`));
          });
        }
        throw new Error(`Component not found: ${config.componentType}/${config.componentName}`);
      }
      
      components.push(component);
    }

    return components;
  }

  async discoverAllComponents() {
    const components = [];
    const componentTypes = ['agents', 'tasks', 'workflows', 'utils'];

    for (const type of componentTypes) {
      const typeDir = path.join(this.rootPath, 'aiox-core', type);
      
      try {
        const files = await fs.readdir(typeDir);
        
        for (const file of files) {
          const filePath = path.join(typeDir, file);
          const stats = await fs.stat(filePath);
          
          if (stats.isFile()) {
            const componentType = type.slice(0, -1); // Remove 's' from plural
            const componentName = path.basename(file, path.extname(file));
            
            components.push({
              id: `${componentType}/${componentName}`,
              type: componentType,
              name: componentName,
              filePath: filePath
            });
          }
        }
      } catch (error) {
        // Directory doesn't exist, skip
        continue;
      }
    }

    return components;
  }

  async generateTestPlan(components, config) {
    const testPlan = {
      generation_id: `test-gen-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      components: components,
      config: config,
      test_suites: [],
      estimated_duration: 0,
      expected_files: 0,
      quality_targets: {}
    };

    console.log(chalk.gray('Analyzing components and generating test plan...'));

    for (const component of components) {
      const componentAnalysis = await this.analyzeComponentForTesting(component, config);
      const testSuite = await this.planTestSuite(component, componentAnalysis, config);
      
      testPlan.test_suites.push(testSuite);
      testPlan.estimated_duration += testSuite.estimated_duration;
      testPlan.expected_files += testSuite.test_files.length;
    }

    // Set quality targets
    testPlan.quality_targets = {
      coverage_target: config.coverageTarget,
      quality_level: config.qualityLevel,
      mock_coverage: this.calculateMockCoverage(config.mockLevel),
      assertion_density: this.calculateAssertionDensity(config.qualityLevel)
    };

    return testPlan;
  }

  async analyzeComponentForTesting(component, config) {
    const analysis = {
      component_id: component.id,
      complexity: 'medium',
      dependencies: [],
      external_dependencies: [],
      testable_functions: [],
      edge_cases: [],
      mock_requirements: [],
      existing_tests: null
    };

    try {
      // Read component file
      const content = await fs.readFile(component.filePath, 'utf-8');
      
      // Analyze component complexity
      analysis.complexity = this.assessComplexity(content, component.type);
      
      // Identify dependencies
      analysis.dependencies = this.extractDependencies(content, component.type);
      analysis.external_dependencies = this.extractExternalDependencies(content);
      
      // Identify testable functions/methods
      analysis.testable_functions = this.extractTestableFunctions(content, component.type);
      
      // Identify edge cases
      analysis.edge_cases = this.identifyEdgeCases(content, component.type);
      
      // Determine mock requirements
      analysis.mock_requirements = this.determineMockRequirements(analysis, config.mockLevel);
      
      // Check for existing tests
      analysis.existing_tests = await this.findExistingTests(component);

    } catch (error) {
      console.warn(chalk.yellow(`Failed to analyze ${component.id}: ${error.message}`));
    }

    return analysis;
  }

  async planTestSuite(component, analysis, config) {
    const testSuite = {
      component_id: component.id,
      component_type: component.type,
      test_files: [],
      total_tests: 0,
      estimated_duration: 0,
      coverage_plan: {},
      quality_metrics: {}
    };

    // Plan different types of tests based on config
    if (config.testType === 'unit' || config.testType === 'all') {
      const unitTestFile = await this.planUnitTests(component, analysis, config);
      testSuite.test_files.push(unitTestFile);
    }

    if (config.testType === 'integration' || config.testType === 'all') {
      const integrationTestFile = await this.planIntegrationTests(component, analysis, config);
      if (integrationTestFile) {
        testSuite.test_files.push(integrationTestFile);
      }
    }

    if (config.testType === 'e2e' || config.testType === 'all') {
      const e2eTestFile = await this.planE2ETests(component, analysis, config);
      if (e2eTestFile) {
        testSuite.test_files.push(e2eTestFile);
      }
    }

    // Calculate totals
    testSuite.total_tests = testSuite.test_files.reduce((sum, file) => sum + file.test_count, 0);
    testSuite.estimated_duration = testSuite.test_files.reduce((sum, file) => sum + file.estimated_duration, 0);

    // Plan coverage
    testSuite.coverage_plan = {
      target_percentage: config.coverageTarget,
      lines_to_cover: analysis.testable_functions.length * 5, // Estimate
      assertions_planned: testSuite.total_tests * this.calculateAssertionDensity(config.qualityLevel)
    };

    return testSuite;
  }

  async planUnitTests(component, analysis, config) {
    const testFile = {
      file_path: this.generateTestFilePath(component, 'unit', config),
      test_type: 'unit',
      test_count: 0,
      estimated_duration: 0,
      test_cases: [],
      mocks_required: [],
      setup_requirements: []
    };

    // Generate test cases for each testable function
    for (const func of analysis.testable_functions) {
      const testCases = await this.generateFunctionTestCases(func, analysis, config);
      testFile.test_cases.push(...testCases);
      testFile.test_count += testCases.length;
    }

    // Add edge case tests
    for (const edgeCase of analysis.edge_cases) {
      const edgeCaseTest = await this.generateEdgeCaseTest(edgeCase, analysis, config);
      testFile.test_cases.push(edgeCaseTest);
      testFile.test_count++;
    }

    // Determine mocks required
    testFile.mocks_required = analysis.mock_requirements.filter(mock => mock.level !== 'none');

    // Calculate estimated duration
    testFile.estimated_duration = testFile.test_count * 2; // 2 minutes per test case

    return testFile;
  }

  async planIntegrationTests(component, analysis, config) {
    // Skip integration tests for simple components
    if (analysis.complexity === 'low' && analysis.dependencies.length === 0) {
      return null;
    }

    const testFile = {
      file_path: this.generateTestFilePath(component, 'integration', config),
      test_type: 'integration',
      test_count: 0,
      estimated_duration: 0,
      test_cases: [],
      integration_scenarios: [],
      setup_requirements: ['test database', 'mock services']
    };

    // Generate integration scenarios
    testFile.integration_scenarios = await this.generateIntegrationScenarios(component, analysis);
    testFile.test_count = testFile.integration_scenarios.length;
    testFile.estimated_duration = testFile.test_count * 5; // 5 minutes per integration test

    return testFile;
  }

  async planE2ETests(component, analysis, config) {
    // Only generate E2E tests for workflows and certain tasks
    if (component.type !== 'workflow' && component.type !== 'task') {
      return null;
    }

    const testFile = {
      file_path: this.generateTestFilePath(component, 'e2e', config),
      test_type: 'e2e',
      test_count: 0,
      estimated_duration: 0,
      test_scenarios: [],
      setup_requirements: ['full system', 'test data']
    };

    // Generate E2E scenarios
    testFile.test_scenarios = await this.generateE2EScenarios(component, analysis);
    testFile.test_count = testFile.test_scenarios.length;
    testFile.estimated_duration = testFile.test_count * 10; // 10 minutes per E2E test

    return testFile;
  }

  generateTestFilePath(component, testType, config) {
    const baseDir = config.outputDir || path.join(this.rootPath, 'tests');
    const typeDir = testType === 'unit' ? 'unit' : testType === 'integration' ? 'integration' : 'e2e';
    const componentDir = component.type === 'util' ? 'utils' : component.type;
    
    const fileName = `${component.name}.${testType}.test.js`;
    return path.join(baseDir, typeDir, componentDir, fileName);
  }

  async displayTestGenerationSummary(testPlan) {
    console.log(chalk.blue('\n📋 Test Generation Plan'));
    console.log(chalk.gray('━'.repeat(50)));
    
    console.log(`Components: ${chalk.white(testPlan.components.length)}`);
    console.log(`Test suites: ${chalk.white(testPlan.test_suites.length)}`);
    console.log(`Expected test files: ${chalk.white(testPlan.expected_files)}`);
    console.log(`Total tests planned: ${chalk.white(testPlan.test_suites.reduce((sum, suite) => sum + suite.total_tests, 0))}`);
    console.log(`Coverage target: ${chalk.white(testPlan.config.coverageTarget)}%`);
    console.log(`Quality level: ${chalk.white(testPlan.config.qualityLevel)}`);
    console.log(`Estimated duration: ${chalk.white(Math.round(testPlan.estimated_duration / 60))} hours`);

    console.log(chalk.blue('\nTest Suites:'));
    testPlan.test_suites.forEach((suite, index) => {
      console.log(`  ${index + 1}. ${suite.component_id} (${suite.total_tests} tests)`);
    });
  }

  async requestConfirmation(testPlan) {
    const { confirmed } = await inquirer.prompt([{
      type: 'confirm',
      name: 'confirmed',
      message: `Generate ${testPlan.expected_files} test files for ${testPlan.components.length} components?`,
      default: true
    }]);

    return confirmed;
  }

  async executeTestGeneration(testPlan) {
    const results = {
      testFilesGenerated: 0,
      testsGenerated: 0,
      errors: [],
      generated_files: []
    };

    console.log(chalk.gray('\nGenerating test files...'));

    for (const testSuite of testPlan.test_suites) {
      try {
        const component = testPlan.components.find(c => c.id === testSuite.component_id);
        
        for (const testFile of testSuite.test_files) {
          console.log(chalk.gray(`  Generating ${testFile.test_type} tests for ${component.name}...`));
          
          const generatedContent = await this.testGenerator.generateTestFile(
            component,
            testFile,
            testPlan.config
          );

          // Ensure directory exists
          await fs.mkdir(path.dirname(testFile.file_path), { recursive: true });

          // Write test file
          if (testPlan.config.updateExisting || !(await this.fileExists(testFile.file_path))) {
            await fs.writeFile(testFile.file_path, generatedContent);
            results.testFilesGenerated++;
            results.testsGenerated += testFile.test_count;
            results.generated_files.push(testFile.file_path);
            
            console.log(chalk.green(`    ✓ Generated ${testFile.file_path}`));
          } else {
            console.log(chalk.yellow(`    ⚠ Skipped ${testFile.file_path} (already exists)`));
          }
        }

      } catch (error) {
        results.errors.push({
          component_id: testSuite.component_id,
          error: error.message
        });
        console.error(chalk.red(`    ✗ Failed to generate tests for ${testSuite.component_id}: ${error.message}`));
      }
    }

    return results;
  }

  async analyzeGeneratedTests(generationResults) {
    const analysis = {
      expectedCoverage: 0,
      qualityScore: 0,
      testDistribution: {},
      recommendations: []
    };

    if (generationResults.testFilesGenerated > 0) {
      // Analyze each generated test file
      for (const filePath of generationResults.generated_files) {
        try {
          const testAnalysis = await this.qualityAssessment.analyzeSingleTestFile(filePath);
          analysis.expectedCoverage += testAnalysis.estimatedCoverage || 0;
          analysis.qualityScore += testAnalysis.qualityScore || 0;
        } catch (error) {
          console.warn(chalk.yellow(`Failed to analyze ${filePath}: ${error.message}`));
        }
      }

      // Calculate averages
      analysis.expectedCoverage = Math.round(analysis.expectedCoverage / generationResults.testFilesGenerated);
      analysis.qualityScore = Math.round((analysis.qualityScore / generationResults.testFilesGenerated) * 10) / 10;
    }

    return analysis;
  }

  async updateTestDocumentation(generationResults) {
    // Update test documentation with newly generated tests
    const testDocs = {
      generated_at: new Date().toISOString(),
      test_files: generationResults.generated_files,
      total_tests: generationResults.testsGenerated,
      generation_notes: 'Auto-generated by AIOX test generation system'
    };

    const docsPath = path.join(this.rootPath, 'docs', 'testing', 'auto-generated-tests.json');
    
    try {
      await fs.mkdir(path.dirname(docsPath), { recursive: true });
      await fs.writeFile(docsPath, JSON.stringify(testDocs, null, 2));
    } catch (error) {
      console.warn(chalk.yellow(`Failed to update test documentation: ${error.message}`));
    }
  }

  // Helper methods

  async fileExists(filePath) {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  assessComplexity(content, componentType) {
    // Simple heuristic for complexity assessment
    const lines = content.split('\n').length;
    const functions = (content.match(/function|=>/g) || []).length;
    const conditions = (content.match(/if|switch|for|while/g) || []).length;
    
    const complexityScore = (lines / 10) + (functions * 2) + (conditions * 3);
    
    if (complexityScore > 50) return 'high';
    if (complexityScore > 20) return 'medium';
    return 'low';
  }

  extractDependencies(content, componentType) {
    const dependencies = [];
    
    // Extract require/import statements
    const requireMatches = content.match(/require\(['"]([^'"]+)['"]\)/g) || [];
    const importMatches = content.match(/import .+ from ['"]([^'"]+)['"]/g) || [];
    
    requireMatches.forEach(match => {
      const dep = match.match(/require\(['"]([^'"]+)['"]\)/)[1];
      if (dep.startsWith('./') || dep.startsWith('../')) {
        dependencies.push(dep);
      }
    });

    importMatches.forEach(match => {
      const dep = match.match(/from ['"]([^'"]+)['"]/)[1];
      if (dep.startsWith('./') || dep.startsWith('../')) {
        dependencies.push(dep);
      }
    });

    return dependencies;
  }

  extractExternalDependencies(content) {
    const externalDeps = [];
    
    const requireMatches = content.match(/require\(['"]([^'"]+)['"]\)/g) || [];
    const importMatches = content.match(/import .+ from ['"]([^'"]+)['"]/g) || [];
    
    requireMatches.forEach(match => {
      const dep = match.match(/require\(['"]([^'"]+)['"]\)/)[1];
      if (!dep.startsWith('./') && !dep.startsWith('../') && !dep.startsWith('node:')) {
        externalDeps.push(dep);
      }
    });

    importMatches.forEach(match => {
      const dep = match.match(/from ['"]([^'"]+)['"]/)[1];
      if (!dep.startsWith('./') && !dep.startsWith('../') && !dep.startsWith('node:')) {
        externalDeps.push(dep);
      }
    });

    return [...new Set(externalDeps)]; // Remove duplicates
  }

  extractTestableFunctions(content, componentType) {
    const functions = [];
    
    // Extract function declarations and expressions
    const functionMatches = content.match(/(?:function\s+(\w+)|(\w+)\s*[:=]\s*(?:async\s+)?function|(\w+)\s*[:=]\s*(?:async\s+)?\([^)]*\)\s*=>)/g) || [];
    
    functionMatches.forEach(match => {
      let functionName = null;
      
      if (match.includes('function ')) {
        functionName = match.match(/function\s+(\w+)/)?.[1];
      } else {
        functionName = match.match(/(\w+)\s*[:=]/)?.[1];
      }
      
      if (functionName && !functionName.startsWith('_')) {
        functions.push({
          name: functionName,
          type: 'function',
          visibility: 'public'
        });
      }
    });

    return functions;
  }

  identifyEdgeCases(content, componentType) {
    const edgeCases = [];
    
    // Look for common edge case patterns
    if (content.includes('null') || content.includes('undefined')) {
      edgeCases.push({ type: 'null_undefined', description: 'Handle null/undefined values' });
    }
    
    if (content.includes('length') || content.includes('size')) {
      edgeCases.push({ type: 'empty_collections', description: 'Handle empty arrays/objects' });
    }
    
    if (content.includes('catch') || content.includes('throw')) {
      edgeCases.push({ type: 'error_handling', description: 'Test error conditions' });
    }
    
    if (content.includes('async') || content.includes('await')) {
      edgeCases.push({ type: 'async_operations', description: 'Test async operation failures' });
    }

    return edgeCases;
  }

  determineMockRequirements(analysis, mockLevel) {
    const mocks = [];
    
    if (mockLevel === 'minimal') {
      // Only mock external dependencies
      analysis.external_dependencies.forEach(dep => {
        mocks.push({ type: 'external', target: dep, level: 'full' });
      });
    } else if (mockLevel === 'moderate') {
      // Mock external dependencies and some internal ones
      analysis.external_dependencies.forEach(dep => {
        mocks.push({ type: 'external', target: dep, level: 'full' });
      });
      analysis.dependencies.slice(0, 3).forEach(dep => {
        mocks.push({ type: 'internal', target: dep, level: 'partial' });
      });
    } else if (mockLevel === 'extensive') {
      // Mock everything possible
      analysis.external_dependencies.forEach(dep => {
        mocks.push({ type: 'external', target: dep, level: 'full' });
      });
      analysis.dependencies.forEach(dep => {
        mocks.push({ type: 'internal', target: dep, level: 'full' });
      });
    }

    return mocks;
  }

  async findExistingTests(component) {
    const possibleTestPaths = [
      path.join(this.rootPath, 'tests', 'unit', component.type, `${component.name}.test.js`),
      path.join(this.rootPath, 'tests', 'unit', component.type, `${component.name}.spec.js`),
      path.join(this.rootPath, 'test', `${component.name}.test.js`),
      path.join(this.rootPath, '__tests__', `${component.name}.test.js`)
    ];

    for (const testPath of possibleTestPaths) {
      if (await this.fileExists(testPath)) {
        return {
          path: testPath,
          exists: true
        };
      }
    }

    return { exists: false };
  }

  calculateMockCoverage(mockLevel) {
    const coverage = {
      minimal: 30,
      moderate: 60,
      extensive: 90
    };
    return coverage[mockLevel] || 60;
  }

  calculateAssertionDensity(qualityLevel) {
    const density = {
      basic: 2,
      standard: 4,
      comprehensive: 6
    };
    return density[qualityLevel] || 4;
  }

  async generateFunctionTestCases(func, analysis, config) {
    // This would generate test cases based on function analysis
    // For now, return basic test case structure
    return [
      {
        name: `should ${func.name} successfully`,
        type: 'success_case',
        description: `Test successful execution of ${func.name}`,
        assertions: config.qualityLevel === 'comprehensive' ? 3 : 2
      },
      {
        name: `should handle ${func.name} errors`,
        type: 'error_case',
        description: `Test error handling in ${func.name}`,
        assertions: 2
      }
    ];
  }

  async generateEdgeCaseTest(edgeCase, analysis, config) {
    return {
      name: `should handle ${edgeCase.type}`,
      type: 'edge_case',
      description: edgeCase.description,
      assertions: 1
    };
  }

  async generateIntegrationScenarios(component, analysis) {
    // Generate integration test scenarios based on component dependencies
    const scenarios = [];
    
    if (analysis.dependencies.length > 0) {
      scenarios.push({
        name: 'should integrate with dependencies',
        description: 'Test integration with internal dependencies',
        dependencies: analysis.dependencies.slice(0, 3)
      });
    }

    if (analysis.external_dependencies.length > 0) {
      scenarios.push({
        name: 'should integrate with external services',
        description: 'Test integration with external dependencies',
        dependencies: analysis.external_dependencies.slice(0, 2)
      });
    }

    return scenarios;
  }

  async generateE2EScenarios(component, analysis) {
    const scenarios = [];
    
    if (component.type === 'workflow') {
      scenarios.push({
        name: 'should complete full workflow',
        description: 'Test complete workflow execution end-to-end',
        steps: ['initialize', 'execute', 'validate', 'cleanup']
      });
    }

    if (component.type === 'task') {
      scenarios.push({
        name: 'should execute task end-to-end',
        description: 'Test complete task execution with real dependencies',
        steps: ['setup', 'execute', 'verify_output']
      });
    }

    return scenarios;
  }
}

module.exports = GenerateTestsTask;
```

## Regras de Validação

### Validação de Entrada
- O tipo de componente deve ser válido ou 'all' para geração em massa
- O alvo de cobertura deve estar entre 0-100%
- O framework de teste deve ser suportado
- O nível de qualidade deve ser reconhecido

### Verificações de Segurança
- Não sobrescrever testes existentes sem confirmação
- Validar que o componente existe antes da geração de testes
- Garantir que o diretório de saída seja gravável
- Verificar conflitos entre frameworks de teste

### Requisitos de Geração
- Deve gerar código de teste sintaticamente válido
- Deve incluir setup/teardown apropriados
- Deve incluir descrições de teste significativas
- Deve seguir as melhores práticas de testes

## Pontos de Integração

### Test Template System
- Fornece templates de teste reutilizáveis
- Gerencia padrões de geração de código de teste
- Trata sintaxe específica de cada framework
- Suporta estruturas de teste customizadas

### Test Generator
- Orquestra a criação de arquivos de teste
- Analisa componentes em busca de elementos testáveis
- Gera suítes de teste abrangentes
- Trata diferentes tipos de teste (unit, integration, e2e)

### Coverage Analyzer
- Analisa a cobertura de testes existente
- Identifica lacunas de cobertura
- Fornece métricas de cobertura
- Sugere melhorias de cobertura

### Quality Assessment
- Avalia a qualidade dos testes gerados
- Fornece métricas e pontuações de qualidade
- Identifica oportunidades de melhoria de testes
- Valida a efetividade dos testes

## Estrutura de Saída

### Resposta de Sucesso
```json
{
  "success": true,
  "components": 5,
  "testFilesGenerated": 12,
  "expectedCoverage": 85,
  "qualityScore": 8.5
}
```

### Resposta de Erro
```json
{
  "success": false,
  "error": "Component not found: agent/invalid-name",
  "suggestions": ["weather-agent", "data-agent"]
}
```

## Considerações de Segurança
- Validar todos os caminhos de arquivo para prevenir directory traversal
- Sanitizar nomes de componentes e descrições de teste
- Garantir que o código gerado não inclua informações sensíveis
- Validar dependências do framework de teste em busca de vulnerabilidades de segurança
