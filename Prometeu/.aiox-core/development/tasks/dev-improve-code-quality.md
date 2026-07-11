---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com registro em log
- Interação mínima com o usuário
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

tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: devImproveCodeQuality()
responsável: Dex (Builder)
responsavel_type: Agente
atomic_layer: Strategy

**Entrada:**
- campo: task
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Deve ser uma task registrada

- campo: parameters
  tipo: object
  origem: User Input
  obrigatório: false
  validação: Parâmetros de task válidos

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
  - [ ] Task está registrada; parâmetros obrigatórios fornecidos; dependências atendidas
    tipo: pre-condition
    blocker: true
    validação: |
      Verificar se a task está registrada; parâmetros obrigatórios fornecidos; dependências atendidas
    error_message: "Pré-condição falhou: Task está registrada; parâmetros obrigatórios fornecidos; dependências atendidas"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução DEPOIS que a task é concluída

**Checklist:**

```yaml
post-conditions:
  - [ ] Task concluída; código de saída 0; saídas esperadas criadas
    tipo: post-condition
    blocker: true
    validação: |
      Verificar se a task foi concluída; código de saída 0; saídas esperadas criadas
    error_message: "Pós-condição falhou: Task concluída; código de saída 0; saídas esperadas criadas"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de aprovação/reprovação para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Task concluída conforme esperado; efeitos colaterais documentados
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Garantir que a task foi concluída conforme esperado; efeitos colaterais documentados
    error_message: "Critério de aceite não atendido: Task concluída conforme esperado; efeitos colaterais documentados"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** task-runner
  - **Propósito:** Execução e orquestração de tasks
  - **Origem:** .aiox-core/core/task-runner.js

- **Ferramenta:** logger
  - **Propósito:** Registro de execução e rastreamento de erros
  - **Origem:** .aiox-core/utils/logger.js

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** execute-task.js
  - **Propósito:** Wrapper genérico de execução de tasks
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/scripts/execute-task.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Task Não Encontrada
   - **Causa:** Task especificada não está registrada no sistema
   - **Resolução:** Verificar o nome da task e o registro
   - **Recuperação:** Listar tasks disponíveis, sugerir similares

2. **Erro:** Parâmetros Inválidos
   - **Causa:** Os parâmetros da task não correspondem ao schema esperado
   - **Resolução:** Validar os parâmetros contra a definição da task
   - **Recuperação:** Fornecer template de parâmetros, rejeitar a execução

3. **Erro:** Timeout de Execução
   - **Causa:** A task excede o tempo máximo de execução
   - **Resolução:** Otimizar a task ou aumentar o timeout
   - **Recuperação:** Encerrar a task, limpar recursos, registrar o estado

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 5-20 min (estimado)
cost_estimated: $0.003-0.015
token_usage: ~2.000-8.000 tokens
```

**Notas de Otimização:**
- Análise iterativa com limites de profundidade; cache de resultados intermediários; agrupar operações similares em lote

---

## Metadados

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

# Nenhum checklist necessário - esta task realiza refatoração automatizada de código, a validação é feita por linting e testes
tools:
  - github-cli
---

# Melhorar a Qualidade do Código - AIOX Developer Task

## Propósito
Melhorar automaticamente a qualidade do código em múltiplas dimensões, incluindo formatação, linting, sintaxe moderna e melhores práticas.

## Padrão de Comando
```
*improve-code-quality <path> [options]
```

## Parâmetros
- `path`: Caminho de arquivo ou diretório a ser melhorado
- `options`: Configuração de melhoria de código

### Opções
- `--patterns <types>`: Padrões de melhoria a aplicar, separados por vírgula
- `--auto-fix`: Aplicar automaticamente todas as melhorias seguras
- `--preview`: Mostrar as mudanças antes de aplicar
- `--exclude <patterns>`: Excluir padrões de arquivo (ex.: "*.test.js")
- `--recursive`: Processar diretórios recursivamente
- `--config <file>`: Usar arquivo de configuração customizado
- `--report <file>`: Gerar relatório de melhorias
- `--threshold <level>`: Confiança mínima para auto-correção (0-1, padrão: 0.8)
- `--backup`: Criar backups antes de aplicar as mudanças

## Padrões de Melhoria
- `formatting`: Formatação de código com Prettier
- `linting`: Correções do ESLint e conformidade com regras
- `modern-syntax`: Atualizações de sintaxe ES6+
- `imports`: Organização e otimização de imports
- `dead-code`: Eliminação de código morto
- `naming`: Melhorias de convenção de nomenclatura
- `error-handling`: Padrões de tratamento de erros
- `async-await`: Conversão de Promise para async/await
- `type-safety`: Anotações de tipo e segurança
- `documentation`: Geração e atualização de JSDoc

## Exemplos
```bash
# Melhorar um único arquivo com preview
*improve-code-quality aiox-core/scripts/legacy-utility.js --preview

# Auto-corrigir todas as melhorias seguras em um diretório
*improve-code-quality aiox-core/agents --auto-fix --recursive

# Aplicar padrões específicos
*improve-code-quality aiox-core/utils --patterns formatting,modern-syntax,async-await

# Gerar relatório de melhorias
*improve-code-quality . --recursive --report quality-report.json

# Usar configuração customizada
*improve-code-quality aiox-core --config .aiox/quality-config.json
```

## Implementação

```javascript
const fs = require('fs').promises;
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');
const glob = require('glob').promises;

class ImproveCodeQualityTask {
  constructor() {
    this.taskName = 'improve-code-quality';
    this.description = 'Automatically improve code quality';
    this.rootPath = process.cwd();
    this.codeQualityImprover = null;
    this.improvements = [];
    this.appliedImprovements = [];
  }

  async execute(params) {
    try {
      console.log(chalk.blue('🎨 AIOX Code Quality Improvement'));
      console.log(chalk.gray('Analyzing and improving code quality\n'));

      // Analisar parâmetros
      const config = await this.parseParameters(params);
      
      // Inicializar dependências
      await this.initializeDependencies();

      // Obter arquivos a melhorar
      const files = await this.getFilesToImprove(config);
      
      if (files.length === 0) {
        console.log(chalk.yellow('No files found to improve'));
        return { success: true, improvements: [] };
      }

      console.log(chalk.gray(`Found ${files.length} files to analyze\n`));

      // Analisar arquivos em busca de melhorias
      await this.analyzeFiles(files, config);

      // Executar com base no modo
      if (config.autoFix) {
        await this.applyImprovements(config);
      } else if (config.preview) {
        await this.previewImprovements(config);
      } else {
        await this.interactiveImprovement(config);
      }

      // Gerar relatório se solicitado
      if (config.report) {
        await this.generateReport(config.report);
      }

      return {
        success: true,
        filesAnalyzed: files.length,
        totalImprovements: this.improvements.length,
        appliedImprovements: this.appliedImprovements.length
      };

    } catch (error) {
      console.error(chalk.red(`\n❌ Code quality improvement failed: ${error.message}`));
      throw error;
    }
  }

  async parseParameters(params) {
    if (params.length < 1) {
      throw new Error('Usage: *improve-code-quality <path> [options]');
    }

    const config = {
      targetPath: params[0],
      patterns: ['formatting', 'linting', 'modern-syntax', 'imports', 'naming'],
      autoFix: false,
      preview: false,
      exclude: [],
      recursive: false,
      configFile: null,
      report: null,
      threshold: 0.8,
      backup: true
    };

    // Analisar opções
    for (let i = 1; i < params.length; i++) {
      const param = params[i];
      
      if (param === '--auto-fix') {
        config.autoFix = true;
      } else if (param === '--preview') {
        config.preview = true;
      } else if (param === '--recursive') {
        config.recursive = true;
      } else if (param === '--backup') {
        config.backup = true;
      } else if (param.startsWith('--patterns') && params[i + 1]) {
        config.patterns = params[++i].split(',').map(p => p.trim());
      } else if (param.startsWith('--exclude') && params[i + 1]) {
        config.exclude = params[++i].split(',').map(e => e.trim());
      } else if (param.startsWith('--config') && params[i + 1]) {
        config.configFile = params[++i];
      } else if (param.startsWith('--report') && params[i + 1]) {
        config.report = params[++i];
      } else if (param.startsWith('--threshold') && params[i + 1]) {
        config.threshold = parseFloat(params[++i]);
      }
    }

    // Carregar configuração customizada se fornecida
    if (config.configFile) {
      await this.loadCustomConfig(config);
    }

    // Validar threshold
    if (config.threshold < 0 || config.threshold > 1) {
      throw new Error('Threshold must be between 0 and 1');
    }

    return config;
  }

  async loadCustomConfig(config) {
    try {
      const content = await fs.readFile(config.configFile, 'utf-8');
      const customConfig = JSON.parse(content);
      
      // Mesclar configuração customizada
      Object.assign(config, {
        patterns: customConfig.patterns || config.patterns,
        threshold: customConfig.threshold || config.threshold,
        exclude: customConfig.exclude || config.exclude,
        // Adicionar configurações específicas de padrão
        patternConfig: customConfig.patternConfig || {}
      });
    } catch (error) {
      console.warn(chalk.yellow(`Failed to load custom config: ${error.message}`));
    }
  }

  async initializeDependencies() {
    try {
      const CodeQualityImprover = require('../scripts/code-quality-improver');
      this.codeQualityImprover = new CodeQualityImprover({ rootPath: this.rootPath });

    } catch (error) {
      throw new Error(`Failed to initialize dependencies: ${error.message}`);
    }
  }

  async getFilesToImprove(config) {
    const targetPath = path.resolve(this.rootPath, config.targetPath);
    const files = [];

    try {
      const stats = await fs.stat(targetPath);
      
      if (stats.isFile()) {
        // Arquivo único
        if (this.shouldProcessFile(targetPath, config)) {
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
          if (this.shouldProcessFile(match, config)) {
            files.push(match);
          }
        }
      }
    } catch (error) {
      console.warn(chalk.yellow(`Cannot access ${targetPath}: ${error.message}`));
    }

    return files;
  }

  shouldProcessFile(filePath, config) {
    // Pular arquivos de teste a menos que explicitamente incluídos
    if (!config.includeTests && (filePath.includes('.test.') || filePath.includes('.spec.'))) {
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
    
    // Verificar extensão do arquivo
    const ext = path.extname(filePath);
    return ['.js', '.jsx', '.ts', '.tsx'].includes(ext);
  }

  async analyzeFiles(files, config) {
    console.log(chalk.blue('🔍 Analyzing code quality...'));
    
    const progressInterval = Math.max(1, Math.floor(files.length / 20));
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      try {
        // Criar backup se solicitado
        if (config.backup) {
          await this.createBackup(file);
        }

        // Analisar arquivo em busca de melhorias
        const analysis = await this.codeQualityImprover.analyzeFile(file, {
          patterns: config.patterns,
          patternConfig: config.patternConfig
        });
        
        if (analysis.improvements && analysis.improvements.length > 0) {
          // Filtrar pelo threshold de confiança
          const filteredImprovements = analysis.improvements.filter(
            imp => imp.confidence >= config.threshold
          );
          
          // Adicionar à lista de melhorias
          for (const improvement of filteredImprovements) {
            improvement.file = path.relative(this.rootPath, file);
            improvement.id = `imp-${this.improvements.length + 1}`;
            this.improvements.push(improvement);
          }
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

  async createBackup(filePath) {
    const backupDir = path.join(this.rootPath, '.aiox', 'backups', 'code-quality');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const relativePath = path.relative(this.rootPath, filePath);
    const backupPath = path.join(backupDir, timestamp, relativePath);
    
    await fs.mkdir(path.dirname(backupPath), { recursive: true });
    await fs.copyFile(filePath, backupPath);
  }

  async applyImprovements(config) {
    console.log(chalk.blue('\n🔧 Applying improvements...'));
    
    if (this.improvements.length === 0) {
      console.log(chalk.yellow('No improvements to apply'));
      return;
    }

    // Agrupar melhorias por arquivo
    const byFile = this.groupImprovementsByFile();
    
    let applied = 0;
    let failed = 0;
    
    for (const [file, improvements] of Object.entries(byFile)) {
      try {
        console.log(chalk.gray(`\nImproving ${file}...`));
        
        const result = await this.codeQualityImprover.applyImprovements(
          path.join(this.rootPath, file),
          improvements
        );
        
        if (result.success) {
          applied += result.appliedCount;
          this.appliedImprovements.push(...improvements.filter(
            imp => result.applied.includes(imp.id)
          ));
          
          // Mostrar melhorias aplicadas
          for (const improvement of improvements) {
            if (result.applied.includes(improvement.id)) {
              console.log(chalk.green(`  ✅ ${improvement.description}`));
            }
          }
        } else {
          failed++;
          console.error(chalk.red(`  Failed: ${result.error}`));
        }
      } catch (error) {
        failed++;
        console.error(chalk.red(`  Error: ${error.message}`));
      }
    }
    
    // Mostrar resumo
    console.log(chalk.blue('\n📊 Improvement Summary:'));
    console.log(chalk.green(`  ✅ Applied: ${applied}`));
    if (failed > 0) {
      console.log(chalk.red(`  ❌ Failed: ${failed}`));
    }
  }

  async previewImprovements(config) {
    if (this.improvements.length === 0) {
      console.log(chalk.yellow('No improvements found'));
      return;
    }

    console.log(chalk.blue(`\n📋 Found ${this.improvements.length} improvements:\n`));

    // Agrupar por arquivo
    const byFile = this.groupImprovementsByFile();

    for (const [file, improvements] of Object.entries(byFile)) {
      console.log(chalk.blue(`\n📄 ${file}`));
      console.log(chalk.gray('─'.repeat(50)));
      
      for (const improvement of improvements) {
        this.displayImprovement(improvement);
      }
    }

    // Mostrar estatísticas de padrões
    this.displayStatistics();

    // Mostrar próximos passos
    console.log(chalk.blue('\n📌 Next Steps:'));
    console.log(`1. Apply all improvements: *improve-code-quality ${config.targetPath} --auto-fix`);
    console.log(`2. Interactive selection: *improve-code-quality ${config.targetPath}`);
    console.log(`3. Generate report: *improve-code-quality ${config.targetPath} --report quality-report.json`);
  }

  async interactiveImprovement(config) {
    if (this.improvements.length === 0) {
      console.log(chalk.yellow('No improvements found'));
      return;
    }

    console.log(chalk.blue(`\n📋 Found ${this.improvements.length} improvements`));

    // Agrupar por arquivo para melhor UX
    const byFile = this.groupImprovementsByFile();

    for (const [file, improvements] of Object.entries(byFile)) {
      console.log(chalk.blue(`\n📄 ${file}`));
      
      const choices = improvements.map(imp => ({
        name: `${imp.pattern}: ${imp.description}`,
        value: imp.id,
        checked: imp.confidence >= 0.9 // Pre-check high confidence
      }));

      const { selected } = await inquirer.prompt([{
        type: 'checkbox',
        name: 'selected',
        message: 'Select improvements to apply:',
        choices,
        pageSize: 10
      }]);

      if (selected.length > 0) {
        const selectedImprovements = improvements.filter(
          imp => selected.includes(imp.id)
        );
        
        try {
          const result = await this.codeQualityImprover.applyImprovements(
            path.join(this.rootPath, file),
            selectedImprovements
          );
          
          if (result.success) {
            console.log(chalk.green(`✅ Applied ${result.appliedCount} improvements`));
            this.appliedImprovements.push(...selectedImprovements);
          } else {
            console.error(chalk.red(`Failed: ${result.error}`));
          }
        } catch (error) {
          console.error(chalk.red(`Error: ${error.message}`));
        }
      }
    }
  }

  groupImprovementsByFile() {
    const byFile = {};
    
    for (const improvement of this.improvements) {
      if (!byFile[improvement.file]) {
        byFile[improvement.file] = [];
      }
      byFile[improvement.file].push(improvement);
    }
    
    return byFile;
  }

  displayImprovement(improvement) {
    const confidenceColor = improvement.confidence >= 0.9 ? chalk.green :
                          improvement.confidence >= 0.7 ? chalk.yellow :
                          chalk.gray;
    
    console.log(`\n${chalk.gray(improvement.id)} ${chalk.blue(`[${improvement.pattern}]`)} ${improvement.description}`);
    console.log(`   ${chalk.gray('Confidence:')} ${confidenceColor((improvement.confidence * 100).toFixed(0) + '%')}`);
    console.log(`   ${chalk.gray('Location:')} Line ${improvement.location.start}${improvement.location.end !== improvement.location.start ? `-${improvement.location.end}` : ''}`);
    
    if (improvement.details) {
      console.log(`   ${chalk.gray('Details:')} ${improvement.details}`);
    }
    
    if (improvement.preview) {
      console.log(chalk.gray('   Preview:'));
      console.log(chalk.red(`     - ${improvement.preview.before}`));
      console.log(chalk.green(`     + ${improvement.preview.after}`));
    }
  }

  async generateReport(reportPath) {
    console.log(chalk.blue('\n📤 Generating quality report...'));
    
    const report = {
      version: 1,
      timestamp: new Date().toISOString(),
      summary: {
        filesAnalyzed: new Set(this.improvements.map(i => i.file)).size,
        totalImprovements: this.improvements.length,
        appliedImprovements: this.appliedImprovements.length,
        patterns: this.getPatternStatistics()
      },
      improvements: this.improvements.map(imp => ({
        ...imp,
        applied: this.appliedImprovements.some(a => a.id === imp.id)
      })),
      files: this.getFileStatistics()
    };

    await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
    console.log(chalk.green(`✅ Report generated: ${reportPath}`));
  }

  getPatternStatistics() {
    const stats = {};
    
    for (const improvement of this.improvements) {
      if (!stats[improvement.pattern]) {
        stats[improvement.pattern] = {
          total: 0,
          applied: 0,
          averageConfidence: 0
        };
      }
      
      stats[improvement.pattern].total++;
      stats[improvement.pattern].averageConfidence += improvement.confidence;
      
      if (this.appliedImprovements.some(a => a.id === improvement.id)) {
        stats[improvement.pattern].applied++;
      }
    }
    
    // Calcular médias
    for (const pattern of Object.keys(stats)) {
      stats[pattern].averageConfidence /= stats[pattern].total;
    }
    
    return stats;
  }

  getFileStatistics() {
    const fileStats = {};
    
    for (const improvement of this.improvements) {
      if (!fileStats[improvement.file]) {
        fileStats[improvement.file] = {
          improvements: 0,
          applied: 0,
          patterns: new Set()
        };
      }
      
      fileStats[improvement.file].improvements++;
      fileStats[improvement.file].patterns.add(improvement.pattern);
      
      if (this.appliedImprovements.some(a => a.id === improvement.id)) {
        fileStats[improvement.file].applied++;
      }
    }
    
    // Converter sets em arrays
    for (const file of Object.keys(fileStats)) {
      fileStats[file].patterns = Array.from(fileStats[file].patterns);
    }
    
    return fileStats;
  }

  displayStatistics() {
    const patternStats = this.getPatternStatistics();
    
    console.log(chalk.blue('\n📊 Pattern Statistics:'));
    
    const sortedPatterns = Object.entries(patternStats)
      .sort(([,a], [,b]) => b.total - a.total);
    
    for (const [pattern, stats] of sortedPatterns) {
      console.log(`  ${pattern}: ${stats.total} improvements (${(stats.averageConfidence * 100).toFixed(0)}% avg confidence)`);
    }
  }
}

module.exports = ImproveCodeQualityTask;
```

## Pontos de Integração

### Code Quality Improver
- Engine central de melhoria
- Análise baseada em padrões
- Aplicação segura de transformações
- Integração com múltiplas ferramentas

### Integração de Ferramentas
- ESLint para correções de linting
- Prettier para formatação
- jscodeshift para transformações de AST
- Padrões customizados para melhorias específicas

### Sistema de Configuração
- Configurações específicas de padrão
- Definições de regras customizadas
- Gestão de threshold
- Preferências de ferramentas

### Sistema de Backup
- Criação automática de backups
- Armazenamento com timestamp
- Capacidade fácil de rollback
- Gestão de limpeza

## Workflow de Melhoria

### Fase de Análise
1. Analisar o código-fonte (parse)
2. Rodar os analisadores de padrões
3. Calcular as pontuações de confiança
4. Gerar sugestões de melhoria
5. Filtrar pelo threshold

### Fase de Revisão
1. Exibir melhorias
2. Agrupar por arquivo/padrão
3. Mostrar os níveis de confiança
4. Fornecer previews
5. Permitir seleção

### Fase de Aplicação
1. Criar backups
2. Aplicar transformações
3. Validar os resultados
4. Atualizar arquivos
5. Rastrear mudanças

## Melhores Práticas

### Melhorias Seguras
- Sempre fazer backup antes das mudanças
- Validar a sintaxe após a transformação
- Testar o código após as melhorias
- Usar thresholds conservadores
- Aplicar incrementalmente

### Seleção de Padrões
- Começar com padrões seguros (formatação)
- Progredir para transformações mais complexas
- Respeitar as convenções do projeto
- Considerar as preferências da equipe
- Monitorar os resultados

### Rastreamento de Qualidade
- Gerar relatórios regulares
- Rastrear tendências de melhoria
- Medir métricas de qualidade de código
- Identificar áreas problemáticas
- Celebrar o progresso

## Considerações de Segurança
- Validar a segurança da transformação
- Prevenir injeção de código
- Manter a funcionalidade
- Preservar padrões sensíveis
- Auditar todas as mudanças
