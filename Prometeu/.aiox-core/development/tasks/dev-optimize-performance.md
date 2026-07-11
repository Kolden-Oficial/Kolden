---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com logging
- Interação mínima com o usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints explícitos de decisão
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pre-Flight - Planejamento Abrangente Antecipado
- Fase de análise da tarefa (identificar todas as ambiguidades)
- Execução com zero ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: devOptimizePerformance()
responsável: Dex (Builder)
responsavel_type: Agente
atomic_layer: Strategy

**Entrada:**
- campo: task
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Must be registered task

- campo: parameters
  tipo: object
  origem: User Input
  obrigatório: false
  validação: Valid task parameters

- campo: mode
  tipo: string
  origem: User Input
  obrigatório: false
  validação: yolo|interactive|pre-flight

**Saída:**
- campo: execution_result
  tipo: object
  destino: Memory
  persistido: false

- campo: logs
  tipo: array
  destino: File (.ai/logs/*)
  persistido: true

- campo: state
  tipo: object
  destino: State management
  persistido: true
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Task is registered; required parameters provided; dependencies met
    tipo: pre-condition
    blocker: true
    validação: |
      Check task is registered; required parameters provided; dependencies met
    error_message: "Pre-condition failed: Task is registered; required parameters provided; dependencies met"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a conclusão da task

**Checklist:**

```yaml
post-conditions:
  - [ ] Task completed; exit code 0; expected outputs created
    tipo: post-condition
    blocker: true
    validação: |
      Verify task completed; exit code 0; expected outputs created
    error_message: "Post-condition failed: Task completed; exit code 0; expected outputs created"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de aprovação/reprovação para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Task completed as expected; side effects documented
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Assert task completed as expected; side effects documented
    error_message: "Acceptance criterion not met: Task completed as expected; side effects documented"
```

---

## Tools

**Recursos externos/compartilhados usados por esta task:**

- **Tool:** task-runner
  - **Propósito:** Execução e orquestração de tasks
  - **Origem:** .aiox-core/core/task-runner.js

- **Tool:** logger
  - **Propósito:** Logging de execução e rastreamento de erros
  - **Origem:** .aiox-core/utils/logger.js

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** execute-task.js
  - **Propósito:** Wrapper genérico de execução de task
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/scripts/execute-task.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Task Not Found
   - **Causa:** Task especificada não registrada no sistema
   - **Resolução:** Verificar o nome e o registro da task
   - **Recuperação:** Listar as tasks disponíveis, sugerir similares

2. **Erro:** Invalid Parameters
   - **Causa:** Os parâmetros da task não correspondem ao schema esperado
   - **Resolução:** Validar os parâmetros contra a definição da task
   - **Recuperação:** Fornecer template de parâmetros, rejeitar a execução

3. **Erro:** Execution Timeout
   - **Causa:** A task excede o tempo máximo de execução
   - **Resolução:** Otimizar a task ou aumentar o timeout
   - **Recuperação:** Encerrar a task, limpar recursos, registrar o estado

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 5-20 min (estimated)
cost_estimated: $0.003-0.015
token_usage: ~2,000-8,000 tokens
```

**Notas de Otimização:**
- Análise iterativa com limites de profundidade; cachear resultados intermediários; agrupar operações similares em lote

---

## Metadata

```yaml
story: N/A
version: 1.0.0
dependencies:
  - N/A
tags:
  - development
  - code
updated_at: 2025-11-17
```

---

checklists:
  - dev-master-checklist.md
---

# Otimizar Performance - AIOX Developer Task

## Propósito
Analisar código em busca de gargalos de performance e sugerir otimizações para melhorar o desempenho em runtime, o uso de memória e a escalabilidade.

## Padrão de Comando
```
*optimize-performance <path> [options]
```

## Parâmetros
- `path`: Caminho de arquivo ou diretório a analisar
- `options`: Configuração da análise de performance

### Opções
- `--patterns <types>`: Padrões de otimização a verificar, separados por vírgula
- `--profile`: Habilitar profiling em runtime (se aplicável)
- `--threshold <level>`: Limiar mínimo de impacto para sugestões (low/medium/high)
- `--report <file>`: Gerar relatório de performance
- `--apply <optimization-id>`: Aplicar uma otimização específica
- `--recursive`: Analisar diretórios recursivamente
- `--exclude <patterns>`: Excluir padrões de arquivo
- `--focus <category>`: Focar em uma categoria específica (algorithm/memory/async/database/bundle/react)

## Padrões de Otimização
- `algorithm_complexity`: Algoritmos com alta complexidade temporal
- `loop_optimization`: Loops e iterações aninhados
- `memory_usage`: Consumo de memória e vazamentos
- `async_operations`: Padrões de async/await
- `caching`: Oportunidades de memoização
- `database_queries`: Otimização de N+1 e de queries
- `bundle_size`: Otimização de bundle JavaScript
- `react_performance`: Otimizações específicas do React
- `string_operations`: Manipulação de strings
- `object_operations`: Criação e acesso de objetos

## Exemplos
```bash
# Analisar um único arquivo
*optimize-performance aiox-core/scripts/data-processor.js

# Analisar diretório com padrões específicos
*optimize-performance aiox-core/agents --patterns algorithm_complexity,async_operations --recursive

# Gerar relatório de performance
*optimize-performance . --recursive --report performance-report.json

# Focar em otimizações de banco de dados
*optimize-performance aiox-core/services --focus database --recursive

# Aplicar uma otimização específica
*optimize-performance aiox-core/scripts/calculator.js --apply opt-001
```

## Implementação

```javascript
const fs = require('fs').promises;
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');
const glob = require('glob').promises;

class OptimizePerformanceTask {
  constructor() {
    this.taskName = 'optimize-performance';
    this.description = 'Analyze and optimize code performance';
    this.rootPath = process.cwd();
    this.performanceOptimizer = null;
    this.analysisResults = [];
    this.appliedOptimizations = [];
  }

  async execute(params) {
    try {
      console.log(chalk.blue('⚡ AIOX Performance Optimization'));
      console.log(chalk.gray('Analyzing code for performance improvements\n'));

      // Interpretar parâmetros
      const config = await this.parseParameters(params);
      
      // Inicializar dependências
      await this.initializeDependencies();

      // Obter arquivos a analisar
      const files = await this.getFilesToAnalyze(config);
      
      if (files.length === 0) {
        console.log(chalk.yellow('No files found to analyze'));
        return { success: true, results: [] };
      }

      console.log(chalk.gray(`Found ${files.length} files to analyze\n`));

      // Executar de acordo com o modo
      if (config.apply) {
        // Aplicar uma otimização específica
        await this.applyOptimization(config.apply, config);
      } else {
        // Analisar arquivos
        await this.analyzeFiles(files, config);
        
        // Exibir resultados
        await this.displayResults(config);
        
        // Gerar relatório se solicitado
        if (config.report) {
          await this.generateReport(config.report);
        }
      }

      return {
        success: true,
        filesAnalyzed: files.length,
        totalIssues: this.getTotalIssues(),
        criticalIssues: this.getCriticalIssues()
      };

    } catch (error) {
      console.error(chalk.red(`\n❌ Performance optimization failed: ${error.message}`));
      throw error;
    }
  }

  async parseParameters(params) {
    if (params.length < 1) {
      throw new Error('Usage: *optimize-performance <path> [options]');
    }

    const config = {
      targetPath: params[0],
      patterns: null,
      profile: false,
      threshold: 'low',
      report: null,
      apply: null,
      recursive: false,
      exclude: [],
      focus: null
    };

    // Interpretar opções
    for (let i = 1; i < params.length; i++) {
      const param = params[i];
      
      if (param === '--profile') {
        config.profile = true;
      } else if (param === '--recursive') {
        config.recursive = true;
      } else if (param.startsWith('--patterns') && params[i + 1]) {
        config.patterns = params[++i].split(',').map(p => p.trim());
      } else if (param.startsWith('--threshold') && params[i + 1]) {
        config.threshold = params[++i];
      } else if (param.startsWith('--report') && params[i + 1]) {
        config.report = params[++i];
      } else if (param.startsWith('--apply') && params[i + 1]) {
        config.apply = params[++i];
      } else if (param.startsWith('--exclude') && params[i + 1]) {
        config.exclude = params[++i].split(',').map(e => e.trim());
      } else if (param.startsWith('--focus') && params[i + 1]) {
        config.focus = params[++i];
      }
    }

    // Validar threshold
    if (!['low', 'medium', 'high'].includes(config.threshold)) {
      throw new Error('Threshold must be: low, medium, or high');
    }

    return config;
  }

  async initializeDependencies() {
    try {
      const PerformanceOptimizer = require('../scripts/performance-optimizer');
      this.performanceOptimizer = new PerformanceOptimizer({ 
        rootPath: this.rootPath,
        enableProfiling: true
      });

      // Escutar eventos
      this.performanceOptimizer.on('analyzed', (analysis) => {
        this.analysisResults.push(analysis);
      });

    } catch (error) {
      throw new Error(`Failed to initialize dependencies: ${error.message}`);
    }
  }

  async getFilesToAnalyze(config) {
    const targetPath = path.resolve(this.rootPath, config.targetPath);
    const files = [];

    try {
      const stats = await fs.stat(targetPath);
      
      if (stats.isFile()) {
        // Arquivo único
        if (this.shouldAnalyzeFile(targetPath, config)) {
          files.push(targetPath);
        }
      } else if (stats.isDirectory()) {
        // Diretório
        const pattern = config.recursive ? '**/*.{js,jsx,ts,tsx}' : '*.{js,jsx,ts,tsx}';
        const globPattern = path.join(targetPath, pattern);
        
        const matches = await glob(globPattern, {
          ignore: config.exclude.map(e => path.join(targetPath, '**', e)),
          nodir: true
        });
        
        for (const match of matches) {
          if (this.shouldAnalyzeFile(match, config)) {
            files.push(match);
          }
        }
      }
    } catch (error) {
      console.warn(chalk.yellow(`Cannot access ${targetPath}: ${error.message}`));
    }

    return files;
  }

  shouldAnalyzeFile(filePath, config) {
    // Pular arquivos de teste, a menos que se esteja analisando testes
    if (filePath.includes('.test.') || filePath.includes('.spec.')) {
      return false;
    }
    
    // Pular arquivos minificados
    if (filePath.includes('.min.')) {
      return false;
    }
    
    // Pular artefatos de build
    if (filePath.includes('/dist/') || filePath.includes('/build/')) {
      return false;
    }
    
    // Pular node_modules
    if (filePath.includes('node_modules')) {
      return false;
    }
    
    return true;
  }

  async analyzeFiles(files, config) {
    console.log(chalk.blue('🔍 Analyzing performance...'));
    
    const progressInterval = Math.max(1, Math.floor(files.length / 20));
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      try {
        const analysis = await this.performanceOptimizer.analyzePerformance(file, {
          patterns: config.patterns,
          enableProfiling: config.profile
        });
        
        // Filtrar por threshold
        if (analysis.issues && analysis.issues.length > 0) {
          analysis.issues = this.filterByThreshold(analysis.issues, config.threshold);
        }
        
        // Filtrar por categoria de foco
        if (config.focus && analysis.issues) {
          analysis.issues = analysis.issues.filter(issue => 
            issue.category === config.focus
          );
        }
        
        // Mostrar progresso
        if (i % progressInterval === 0) {
          const progress = Math.floor((i / files.length) * 100);
          process.stdout.write(`\rProgress: ${progress}%`);
        }
        
      } catch (error) {
        console.warn(chalk.yellow(`\nFailed to analyze ${file}: ${error.message}`));
      }
    }
    
    console.log('\rProgress: 100%\n');
  }

  filterByThreshold(issues, threshold) {
    const thresholdMap = {
      low: ['low', 'medium', 'high', 'critical'],
      medium: ['medium', 'high', 'critical'],
      high: ['high', 'critical']
    };
    
    const allowedImpacts = thresholdMap[threshold];
    
    return issues.filter(issue => 
      allowedImpacts.includes(issue.impact) || 
      allowedImpacts.includes(issue.severity)
    );
  }

  async displayResults(config) {
    const totalIssues = this.getTotalIssues();
    
    if (totalIssues === 0) {
      console.log(chalk.green('✅ No performance issues found!'));
      console.log(chalk.gray('Your code is already well optimized.'));
      return;
    }

    console.log(chalk.blue(`\n📊 Performance Analysis Results\n`));
    console.log(chalk.gray('Found ') + chalk.yellow(totalIssues) + chalk.gray(' optimization opportunities\n'));

    // Agrupar por categoria
    const byCategory = this.groupByCategory();
    
    // Exibir por categoria
    for (const [category, results] of Object.entries(byCategory)) {
      console.log(chalk.blue(`\n${this.getCategoryIcon(category)} ${this.getCategoryName(category)}`));
      console.log(chalk.gray('─'.repeat(50)));
      
      for (const result of results) {
        this.displayFileResults(result);
      }
    }

    // Mostrar pontuações de performance
    this.displayPerformanceScores();

    // Mostrar principais recomendações
    this.displayTopRecommendations();

    // Mostrar próximos passos
    console.log(chalk.blue('\n📌 Next Steps:'));
    console.log('1. Review critical issues first');
    console.log('2. Apply optimizations incrementally');
    console.log('3. Test after each optimization');
    console.log('4. Monitor performance improvements');
    if (config.report) {
      console.log(`5. View detailed report: ${config.report}`);
    }
  }

  displayFileResults(result) {
    const relativePath = path.relative(this.rootPath, result.filePath);
    
    console.log(`\n📄 ${chalk.blue(relativePath)}`);
    
    if (result.metrics?.performanceScore !== undefined) {
      const score = result.metrics.performanceScore;
      const scoreColor = score >= 80 ? chalk.green : score >= 60 ? chalk.yellow : chalk.red;
      console.log(`   Performance Score: ${scoreColor(score + '/100')}`);
    }
    
    // Exibir issues
    for (const issue of result.issues) {
      this.displayIssue(issue);
      
      // Exibir sugestões para esta issue
      const suggestion = result.suggestions?.find(s => 
        s.issueId === issue.id || s.pattern === issue.pattern
      );
      
      if (suggestion) {
        this.displaySuggestion(suggestion);
      }
    }
  }

  displayIssue(issue) {
    const impactColors = {
      critical: chalk.red,
      high: chalk.red,
      medium: chalk.yellow,
      low: chalk.gray
    };
    
    const impactColor = impactColors[issue.impact || issue.severity] || chalk.gray;
    
    console.log(`\n   ${impactColor(`[${(issue.impact || issue.severity || 'info').toUpperCase()}]`)} ${issue.description}`);
    
    if (issue.location) {
      console.log(chalk.gray(`   Location: Line ${issue.location.start?.line || '?'}`));
    }
    
    if (issue.type) {
      console.log(chalk.gray(`   Type: ${issue.type}`));
    }
  }

  displaySuggestion(suggestion) {
    console.log(chalk.green('   💡 Suggestion:'));
    
    if (suggestion.optimizations) {
      for (const opt of suggestion.optimizations) {
        console.log(`      - ${opt.description}`);
        
        if (opt.code) {
          console.log(chalk.gray('        Example:'));
          const codeLines = opt.code.split('\n');
          for (const line of codeLines) {
            console.log(chalk.gray(`          ${line}`));
          }
        }
        
        if (opt.improvement) {
          console.log(chalk.green(`        → ${opt.improvement}`));
        }
      }
    }
    
    if (suggestion.estimatedImprovement) {
      console.log(chalk.green(`      Estimated improvement: ${suggestion.estimatedImprovement}`));
    }
  }

  groupByCategory() {
    const grouped = {};
    
    for (const result of this.analysisResults) {
      if (!result.issues || result.issues.length === 0) continue;
      
      for (const issue of result.issues) {
        const category = issue.category || 'other';
        
        if (!grouped[category]) {
          grouped[category] = [];
        }
        
        // Encontrar ou criar a entrada do arquivo
        let fileEntry = grouped[category].find(r => r.filePath === result.filePath);
        if (!fileEntry) {
          fileEntry = {
            filePath: result.filePath,
            issues: [],
            suggestions: result.suggestions || [],
            metrics: result.metrics
          };
          grouped[category].push(fileEntry);
        }
        
        fileEntry.issues.push(issue);
      }
    }
    
    return grouped;
  }

  getCategoryIcon(category) {
    const icons = {
      algorithm: '🔄',
      memory: '💾',
      async: '⚡',
      database: '🗄️',
      bundle: '📦',
      react: '⚛️',
      caching: '💰',
      framework: '🏗️',
      other: '🔧'
    };
    
    return icons[category] || icons.other;
  }

  getCategoryName(category) {
    const names = {
      algorithm: 'Algorithm Optimization',
      memory: 'Memory Usage',
      async: 'Async Operations',
      database: 'Database Queries',
      bundle: 'Bundle Size',
      react: 'React Performance',
      caching: 'Caching Opportunities',
      framework: 'Framework-Specific',
      other: 'Other Optimizations'
    };
    
    return names[category] || category;
  }

  displayPerformanceScores() {
    console.log(chalk.blue('\n📈 Performance Summary'));
    console.log(chalk.gray('─'.repeat(50)));
    
    let totalScore = 0;
    let fileCount = 0;
    
    for (const result of this.analysisResults) {
      if (result.metrics?.performanceScore !== undefined) {
        totalScore += result.metrics.performanceScore;
        fileCount++;
      }
    }
    
    if (fileCount > 0) {
      const avgScore = Math.round(totalScore / fileCount);
      const scoreColor = avgScore >= 80 ? chalk.green : avgScore >= 60 ? chalk.yellow : chalk.red;
      
      console.log(`Average Performance Score: ${scoreColor(avgScore + '/100')}`);
      console.log(`Files Analyzed: ${fileCount}`);
    }
    
    // Detalhamento das issues
    const criticalCount = this.getCriticalIssues();
    const highCount = this.getIssuesByImpact('high');
    const mediumCount = this.getIssuesByImpact('medium');
    const lowCount = this.getIssuesByImpact('low');
    
    console.log('\nIssue Breakdown:');
    if (criticalCount > 0) console.log(chalk.red(`  Critical: ${criticalCount}`));
    if (highCount > 0) console.log(chalk.red(`  High: ${highCount}`));
    if (mediumCount > 0) console.log(chalk.yellow(`  Medium: ${mediumCount}`));
    if (lowCount > 0) console.log(chalk.gray(`  Low: ${lowCount}`));
  }

  displayTopRecommendations() {
    console.log(chalk.blue('\n🎯 Top Recommendations'));
    console.log(chalk.gray('─'.repeat(50)));
    
    const recommendations = this.getTopRecommendations();
    
    if (recommendations.length === 0) {
      console.log(chalk.gray('No specific recommendations'));
      return;
    }
    
    for (let i = 0; i < Math.min(5, recommendations.length); i++) {
      const rec = recommendations[i];
      console.log(`\n${i + 1}. ${rec.title}`);
      console.log(chalk.gray(`   ${rec.description}`));
      if (rec.files) {
        console.log(chalk.gray(`   Files affected: ${rec.files.length}`));
      }
    }
  }

  getTopRecommendations() {
    const recommendations = [];
    const byCategory = this.groupByCategory();
    
    // Issues de complexidade de algoritmo
    if (byCategory.algorithm?.length > 0) {
      const highComplexity = byCategory.algorithm.filter(r => 
        r.issues.some(i => i.type === 'high_complexity' && i.severity === 'critical')
      );
      
      if (highComplexity.length > 0) {
        recommendations.push({
          title: 'Optimize High-Complexity Algorithms',
          description: 'Several functions have O(n²) or worse complexity. Consider using more efficient algorithms.',
          priority: 'critical',
          files: highComplexity
        });
      }
    }
    
    // Issues de async
    if (byCategory.async?.length > 0) {
      const sequentialAwaits = byCategory.async.filter(r => 
        r.issues.some(i => i.type === 'sequential_awaits')
      );
      
      if (sequentialAwaits.length > 0) {
        recommendations.push({
          title: 'Parallelize Async Operations',
          description: 'Use Promise.all to run independent async operations in parallel.',
          priority: 'high',
          files: sequentialAwaits
        });
      }
    }
    
    // Issues de banco de dados
    if (byCategory.database?.length > 0) {
      const nPlusOne = byCategory.database.filter(r => 
        r.issues.some(i => i.type === 'n_plus_one')
      );
      
      if (nPlusOne.length > 0) {
        recommendations.push({
          title: 'Fix N+1 Query Problems',
          description: 'Database queries in loops cause performance degradation. Use JOINs or batch loading.',
          priority: 'critical',
          files: nPlusOne
        });
      }
    }
    
    // Issues de memória
    if (byCategory.memory?.length > 0) {
      recommendations.push({
        title: 'Optimize Memory Usage',
        description: 'Review memory allocations and potential leaks. Consider using more efficient data structures.',
        priority: 'medium',
        files: byCategory.memory
      });
    }
    
    // Oportunidades de caching
    if (byCategory.caching?.length > 0) {
      recommendations.push({
        title: 'Implement Caching',
        description: 'Add memoization or caching for expensive repeated operations.',
        priority: 'medium',
        files: byCategory.caching
      });
    }
    
    // Ordenar por prioridade
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    recommendations.sort((a, b) => 
      priorityOrder[a.priority] - priorityOrder[b.priority]
    );
    
    return recommendations;
  }

  async applyOptimization(optimizationId, config) {
    console.log(chalk.blue(`\n🔧 Applying optimization: ${optimizationId}`));
    
    // Encontrar a otimização nos resultados
    let targetOptimization = null;
    let targetFile = null;
    
    for (const result of this.analysisResults) {
      const suggestion = result.suggestions?.find(s => 
        s.issueId === optimizationId || s.id === optimizationId
      );
      
      if (suggestion) {
        targetOptimization = suggestion;
        targetFile = result.filePath;
        break;
      }
    }
    
    if (!targetOptimization) {
      throw new Error(`Optimization not found: ${optimizationId}`);
    }
    
    console.log(chalk.gray(`File: ${path.relative(this.rootPath, targetFile)}`));
    console.log(chalk.gray(`Type: ${targetOptimization.type || 'General optimization'}`));
    
    // Mostrar detalhes da otimização
    if (targetOptimization.optimizations) {
      console.log(chalk.blue('\nOptimizations to apply:'));
      for (const opt of targetOptimization.optimizations) {
        console.log(`  - ${opt.description}`);
      }
    }
    
    // Confirmar aplicação
    const { confirm } = await inquirer.prompt([{
      type: 'confirm',
      name: 'confirm',
      message: 'Apply this optimization?',
      default: true
    }]);
    
    if (!confirm) {
      console.log(chalk.gray('Optimization cancelled'));
      return;
    }
    
    // Aplicar a otimização
    try {
      const result = await this.performanceOptimizer.applyOptimization(
        targetFile,
        targetOptimization
      );
      
      if (result.success) {
        console.log(chalk.green('✅ Optimization applied successfully'));
        
        // Mostrar mudanças
        for (const change of result.changes) {
          console.log(chalk.gray(`  - ${change.description}`));
        }
        
        this.appliedOptimizations.push({
          file: targetFile,
          optimization: targetOptimization,
          result,
          timestamp: new Date().toISOString()
        });
      } else {
        console.error(chalk.red(`Failed to apply optimization: ${result.error}`));
      }
    } catch (error) {
      console.error(chalk.red(`Error applying optimization: ${error.message}`));
    }
  }

  async generateReport(reportPath) {
    console.log(chalk.blue('\n📤 Generating performance report...'));
    
    const report = await this.performanceOptimizer.generateOptimizationReport();
    
    // Adicionar resultados da análise
    report.analysisResults = this.analysisResults.map(r => ({
      file: path.relative(this.rootPath, r.filePath),
      performanceScore: r.metrics?.performanceScore,
      issues: r.issues.length,
      criticalIssues: r.issues.filter(i => 
        i.impact === 'critical' || i.severity === 'critical'
      ).length,
      suggestions: r.suggestions?.length || 0
    }));
    
    // Adicionar otimizações aplicadas
    report.appliedOptimizations = this.appliedOptimizations;
    
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
    console.log(chalk.green(`✅ Report generated: ${reportPath}`));
    
    // Mostrar resumo do relatório
    console.log(chalk.blue('\n📊 Report Summary:'));
    console.log(`  Files analyzed: ${report.summary.filesAnalyzed}`);
    console.log(`  Total issues: ${report.summary.totalIssues}`);
    console.log(`  Critical issues: ${report.summary.criticalIssues}`);
    console.log(`  Optimizations applied: ${report.summary.optimizationsApplied}`);
  }

  getTotalIssues() {
    return this.analysisResults.reduce((total, result) => 
      total + (result.issues?.length || 0), 0
    );
  }

  getCriticalIssues() {
    return this.analysisResults.reduce((total, result) => 
      total + (result.issues?.filter(i => 
        i.impact === 'critical' || i.severity === 'critical'
      ).length || 0), 0
    );
  }

  getIssuesByImpact(impact) {
    return this.analysisResults.reduce((total, result) => 
      total + (result.issues?.filter(i => 
        i.impact === impact || i.severity === impact
      ).length || 0), 0
    );
  }
}

module.exports = OptimizePerformanceTask;
```

## Pontos de Integração

### Performance Optimizer
- Motor central de análise
- Sistema de detecção de padrões
- Gerador de sugestões de otimização
- Capacidade de profiling em runtime

### Categorias de Análise
- **Algorithm**: Complexidade temporal, loops aninhados
- **Memory**: Alocações, vazamentos, estruturas de dados
- **Async**: Padrões de promises, paralelização
- **Database**: Otimização de queries, problemas de N+1
- **Bundle**: Otimização de imports, tree-shaking
- **React**: Renderização de componentes, memoização
- **Caching**: Oportunidades de memoização

### Coleta de Métricas
- Análise estática de código
- Cálculos de complexidade
- Pontuação de performance
- Avaliação de impacto

## Workflow de Análise de Performance

### Fase de Detecção
1. Fazer o parse do código-fonte em AST
2. Rodar os detectores de padrões
3. Calcular métricas de complexidade
4. Identificar gargalos
5. Pontuar o impacto na performance

### Fase de Análise
1. Avaliar a severidade das issues
2. Agrupar issues relacionadas
3. Gerar sugestões de otimização
4. Estimar melhorias
5. Priorizar recomendações

### Fase de Otimização
1. Revisar sugestões
2. Validar a segurança
3. Aplicar transformações
4. Testar resultados
5. Medir melhorias

## Boas Práticas

### Análise de Performance
- Comece pelas issues críticas
- Foque nos caminhos quentes (hot paths)
- Meça antes e depois
- Teste as otimizações exaustivamente
- Considere os trade-offs

### Estratégia de Otimização
- Faça profiling primeiro, otimize depois
- Mire nos maiores gargalos
- Preserve a legibilidade do código
- Documente as otimizações
- Monitore regressões

### Melhoria Contínua
- Auditorias regulares de performance
- Testes automatizados de performance
- Acompanhe métricas ao longo do tempo
- Compartilhe padrões de otimização
- Construa uma cultura de performance

## Considerações de Segurança
- Validar a segurança da otimização
- Preservar a funcionalidade
- Evitar otimização prematura
- Testar casos extremos
- Monitorar efeitos colaterais
