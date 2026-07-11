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
task: devSuggestRefactoring()
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

# Sugerir Refatoração - AIOX Developer Task

## Propósito
Analisar código e sugerir oportunidades de refatoração automatizada para melhorar a qualidade, a manutenibilidade e a performance do código.

## Padrão de Comando
```
*suggest-refactoring <path> [options]
```

## Parâmetros
- `path`: Caminho de arquivo ou diretório a analisar
- `options`: Configuração da análise de refatoração

### Opções
- `--patterns <types>`: Padrões de refatoração a verificar, separados por vírgula
- `--threshold <level>`: Limiar mínimo de impacto (1-10, padrão: 3)
- `--limit <count>`: Máximo de sugestões por arquivo (padrão: 10)
- `--apply <id>`: Aplicar uma sugestão específica por ID
- `--apply-all`: Aplicar todas as sugestões com confirmação
- `--export <file>`: Exportar sugestões para um arquivo
- `--recursive`: Analisar diretórios recursivamente
- `--exclude <patterns>`: Excluir padrões de arquivo (ex.: "*.test.js")
- `--dry-run`: Mostrar o que seria alterado sem aplicar

## Padrões de Refatoração
- `extract_method`: Extrair métodos longos em outros menores
- `extract_variable`: Extrair expressões complexas
- `introduce_parameter_object`: Agrupar parâmetros relacionados
- `replace_conditional`: Substituir condicionais por polimorfismo
- `inline_temp`: Inserir inline variáveis de uso único
- `remove_dead_code`: Remover código inalcançável
- `consolidate_duplicates`: Extrair código duplicado
- `simplify_conditionals`: Achatar condicionais aninhados
- `replace_magic_numbers`: Extrair constantes
- `decompose_class`: Dividir classes grandes

## Exemplos
```bash
# Analisar um único arquivo
*suggest-refactoring aiox-core/scripts/complex-utility.js

# Analisar diretório com padrões específicos
*suggest-refactoring aiox-core/agents --patterns extract_method,decompose_class --recursive

# Aplicar sugestões de alto impacto
*suggest-refactoring aiox-core/utils --threshold 7 --apply-all

# Exportar sugestões para revisão
*suggest-refactoring . --recursive --export refactoring-report.json

# Dry run para ver as mudanças
*suggest-refactoring aiox-core/agents/developer.md --apply ref-001 --dry-run
```

## Implementação

```javascript
const fs = require('fs').promises;
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');
const glob = require('glob').promises;

class SuggestRefactoringTask {
  constructor() {
    this.taskName = 'suggest-refactoring';
    this.description = 'Suggest automated refactoring opportunities';
    this.rootPath = process.cwd();
    this.refactoringSuggester = null;
    this.suggestions = [];
    this.appliedRefactorings = [];
  }

  async execute(params) {
    try {
      console.log(chalk.blue('🔧 AIOX Refactoring Analysis'));
      console.log(chalk.gray('Analyzing code for refactoring opportunities\n'));

      // Interpretar parâmetros
      const config = await this.parseParameters(params);
      
      // Inicializar dependências
      await this.initializeDependencies();

      // Obter arquivos a analisar
      const files = await this.getFilesToAnalyze(config);
      
      if (files.length === 0) {
        console.log(chalk.yellow('No files found to analyze'));
        return { success: true, suggestions: [] };
      }

      console.log(chalk.gray(`Found ${files.length} files to analyze\n`));

      // Executar de acordo com o modo
      if (config.apply) {
        // Aplicar uma sugestão específica
        await this.applySuggestion(config.apply, config);
      } else if (config.applyAll) {
        // Analisar e aplicar todas as sugestões
        await this.analyzeFiles(files, config);
        await this.applyAllSuggestions(config);
      } else {
        // Apenas analisar e mostrar sugestões
        await this.analyzeFiles(files, config);
        await this.displaySuggestions(config);
      }

      // Exportar se solicitado
      if (config.export) {
        await this.exportSuggestions(config.export);
      }

      return {
        success: true,
        filesAnalyzed: files.length,
        totalSuggestions: this.suggestions.length,
        appliedRefactorings: this.appliedRefactorings.length
      };

    } catch (error) {
      console.error(chalk.red(`\n❌ Refactoring analysis failed: ${error.message}`));
      throw error;
    }
  }

  async parseParameters(params) {
    if (params.length < 1) {
      throw new Error('Usage: *suggest-refactoring <path> [options]');
    }

    const config = {
      targetPath: params[0],
      patterns: null,
      threshold: 3,
      limit: 10,
      apply: null,
      applyAll: false,
      export: null,
      recursive: false,
      exclude: [],
      dryRun: false
    };

    // Interpretar opções
    for (let i = 1; i < params.length; i++) {
      const param = params[i];
      
      if (param === '--recursive') {
        config.recursive = true;
      } else if (param === '--apply-all') {
        config.applyAll = true;
      } else if (param === '--dry-run') {
        config.dryRun = true;
      } else if (param.startsWith('--patterns') && params[i + 1]) {
        config.patterns = params[++i].split(',').map(p => p.trim());
      } else if (param.startsWith('--threshold') && params[i + 1]) {
        config.threshold = parseInt(params[++i]);
      } else if (param.startsWith('--limit') && params[i + 1]) {
        config.limit = parseInt(params[++i]);
      } else if (param.startsWith('--apply') && params[i + 1]) {
        config.apply = params[++i];
      } else if (param.startsWith('--export') && params[i + 1]) {
        config.export = params[++i];
      } else if (param.startsWith('--exclude') && params[i + 1]) {
        config.exclude = params[++i].split(',').map(e => e.trim());
      }
    }

    // Validar threshold
    if (config.threshold < 1 || config.threshold > 10) {
      throw new Error('Threshold must be between 1 and 10');
    }

    return config;
  }

  async initializeDependencies() {
    try {
      const RefactoringSuggester = require('../scripts/refactoring-suggester');
      this.refactoringSuggester = new RefactoringSuggester({ rootPath: this.rootPath });

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
    // Pular arquivos de teste, a menos que explicitamente incluídos
    if (filePath.includes('.test.') || filePath.includes('.spec.')) {
      return false;
    }
    
    // Pular arquivos minificados
    if (filePath.includes('.min.')) {
      return false;
    }
    
    // Pular node_modules
    if (filePath.includes('node_modules')) {
      return false;
    }
    
    // Verificar a extensão do arquivo
    const ext = path.extname(filePath);
    return ['.js', '.jsx', '.ts', '.tsx'].includes(ext);
  }

  async analyzeFiles(files, config) {
    console.log(chalk.blue('🔍 Analyzing files...'));
    
    const progressInterval = Math.max(1, Math.floor(files.length / 20));
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      try {
        const result = await this.refactoringSuggester.analyzeCode(file, {
          patterns: config.patterns
        });
        
        if (result.suggestions && result.suggestions.length > 0) {
          // Filtrar por threshold e limite
          const filteredSuggestions = result.suggestions
            .filter(s => s.impact >= config.threshold)
            .slice(0, config.limit);
          
          // Adicionar às sugestões globais com IDs únicos
          for (const suggestion of filteredSuggestions) {
            suggestion.id = `ref-${this.suggestions.length + 1}`;
            suggestion.file = path.relative(this.rootPath, file);
            this.suggestions.push(suggestion);
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

  async displaySuggestions(config) {
    if (this.suggestions.length === 0) {
      console.log(chalk.yellow('No refactoring suggestions found above threshold'));
      return;
    }

    console.log(chalk.blue(`\n📋 Found ${this.suggestions.length} refactoring suggestions:\n`));

    // Agrupar por arquivo
    const byFile = {};
    for (const suggestion of this.suggestions) {
      if (!byFile[suggestion.file]) {
        byFile[suggestion.file] = [];
      }
      byFile[suggestion.file].push(suggestion);
    }

    // Exibir sugestões
    for (const [file, suggestions] of Object.entries(byFile)) {
      console.log(chalk.blue(`\n📄 ${file}`));
      console.log(chalk.gray('─'.repeat(50)));
      
      for (const suggestion of suggestions) {
        this.displaySuggestion(suggestion);
      }
    }

    // Mostrar estatísticas
    this.displayStatistics();

    // Mostrar próximos passos
    console.log(chalk.blue('\n📌 Next Steps:'));
    console.log('1. Review suggestions carefully');
    console.log(`2. Apply specific suggestion: *suggest-refactoring ${config.targetPath} --apply <id>`);
    console.log(`3. Apply all suggestions: *suggest-refactoring ${config.targetPath} --apply-all`);
    console.log(`4. Export for team review: *suggest-refactoring ${config.targetPath} --export report.json`);
  }

  displaySuggestion(suggestion) {
    const priorityColors = {
      high: chalk.red,
      medium: chalk.yellow,
      low: chalk.gray
    };
    
    const priorityColor = priorityColors[suggestion.priority] || chalk.gray;
    
    console.log(`\n${chalk.gray(suggestion.id)} ${priorityColor(`[${suggestion.priority.toUpperCase()}]`)} ${suggestion.description}`);
    console.log(`   ${chalk.gray('Location:')} Lines ${suggestion.location.start}-${suggestion.location.end}`);
    console.log(`   ${chalk.gray('Impact:')} ${this.formatImpact(suggestion.impact)}`);
    console.log(`   ${chalk.gray('Type:')} ${suggestion.pattern}`);
    console.log(`   ${chalk.gray('Details:')} ${suggestion.details}`);
    
    if (suggestion.suggestedRefactoring && suggestion.suggestedRefactoring.action) {
      console.log(`   ${chalk.gray('Action:')} ${suggestion.suggestedRefactoring.action}`);
    }
  }

  formatImpact(impact) {
    const bar = '█'.repeat(impact) + '░'.repeat(10 - impact);
    
    if (impact >= 8) {
      return chalk.red(bar) + ` (${impact}/10)`;
    } else if (impact >= 5) {
      return chalk.yellow(bar) + ` (${impact}/10)`;
    } else {
      return chalk.gray(bar) + ` (${impact}/10)`;
    }
  }

  async applySuggestion(suggestionId, config) {
    const suggestion = this.suggestions.find(s => s.id === suggestionId);
    
    if (!suggestion) {
      // Tentar carregar de uma análise anterior
      const loaded = await this.loadSuggestion(suggestionId);
      if (!loaded) {
        throw new Error(`Suggestion not found: ${suggestionId}`);
      }
      suggestion = loaded;
    }

    console.log(chalk.blue('\n🔧 Applying Refactoring'));
    console.log(chalk.gray('─'.repeat(50)));
    this.displaySuggestion(suggestion);

    if (config.dryRun) {
      console.log(chalk.yellow('\n⚠️ DRY RUN - No changes will be made'));
      await this.showRefactoringPreview(suggestion);
      return;
    }

    // Confirmar aplicação
    const { confirm } = await inquirer.prompt([{
      type: 'confirm',
      name: 'confirm',
      message: 'Apply this refactoring?',
      default: true
    }]);

    if (!confirm) {
      console.log(chalk.gray('Refactoring cancelled'));
      return;
    }

    // Aplicar a refatoração
    try {
      const result = await this.refactoringSuggester.applySuggestion(suggestion);
      
      if (result.success) {
        console.log(chalk.green('✅ Refactoring applied successfully'));
        this.appliedRefactorings.push({
          suggestion,
          result,
          timestamp: new Date().toISOString()
        });
        
        // Mostrar mudanças
        for (const change of result.changes) {
          console.log(chalk.gray(`   - ${change.description}`));
        }
      } else {
        console.error(chalk.red(`Failed to apply refactoring: ${result.error}`));
      }
    } catch (error) {
      console.error(chalk.red(`Error applying refactoring: ${error.message}`));
    }
  }

  async applyAllSuggestions(config) {
    if (this.suggestions.length === 0) {
      console.log(chalk.yellow('No suggestions to apply'));
      return;
    }

    console.log(chalk.blue(`\n🔧 Applying ${this.suggestions.length} refactorings`));
    
    // Agrupar por tipo para uma melhor experiência do usuário
    const byType = {};
    for (const suggestion of this.suggestions) {
      if (!byType[suggestion.type]) {
        byType[suggestion.type] = [];
      }
      byType[suggestion.type].push(suggestion);
    }

    // Mostrar resumo
    console.log(chalk.gray('\nRefactorings by type:'));
    for (const [type, suggestions] of Object.entries(byType)) {
      console.log(`  ${type}: ${suggestions.length}`);
    }

    if (config.dryRun) {
      console.log(chalk.yellow('\n⚠️ DRY RUN - No changes will be made'));
      return;
    }

    // Confirmar aplicação em lote
    const { confirmAll } = await inquirer.prompt([{
      type: 'confirm',
      name: 'confirmAll',
      message: `Apply all ${this.suggestions.length} refactorings?`,
      default: false
    }]);

    if (!confirmAll) {
      // Solicitar confirmação individual
      await this.applySelectiveSuggestions(config);
      return;
    }

    // Aplicar todas as sugestões
    let applied = 0;
    let failed = 0;

    for (const suggestion of this.suggestions) {
      try {
        console.log(chalk.gray(`\nApplying ${suggestion.id}: ${suggestion.description}`));
        
        const result = await this.refactoringSuggester.applySuggestion(suggestion);
        
        if (result.success) {
          applied++;
          this.appliedRefactorings.push({
            suggestion,
            result,
            timestamp: new Date().toISOString()
          });
        } else {
          failed++;
          console.error(chalk.red(`  Failed: ${result.error}`));
        }
      } catch (error) {
        failed++;
        console.error(chalk.red(`  Error: ${error.message}`));
      }
    }

    console.log(chalk.blue('\n📊 Application Summary:'));
    console.log(chalk.green(`  ✅ Applied: ${applied}`));
    if (failed > 0) {
      console.log(chalk.red(`  ❌ Failed: ${failed}`));
    }
  }

  async applySelectiveSuggestions(config) {
    const choices = this.suggestions.map(s => ({
      name: `${s.id} - ${s.description} (${s.file})`,
      value: s.id,
      checked: s.impact >= 7 // Pré-marcar alto impacto
    }));

    const { selected } = await inquirer.prompt([{
      type: 'checkbox',
      name: 'selected',
      message: 'Select refactorings to apply:',
      choices,
      pageSize: 15
    }]);

    if (selected.length === 0) {
      console.log(chalk.gray('No refactorings selected'));
      return;
    }

    // Aplicar as sugestões selecionadas
    for (const id of selected) {
      const suggestion = this.suggestions.find(s => s.id === id);
      await this.applySuggestion(id, config);
    }
  }

  async showRefactoringPreview(suggestion) {
    console.log(chalk.blue('\n📝 Refactoring Preview:'));
    
    // Isto mostraria as mudanças reais de código
    // Por enquanto, mostra o plano de refatoração
    if (suggestion.suggestedRefactoring) {
      console.log(chalk.gray(JSON.stringify(suggestion.suggestedRefactoring, null, 2)));
    }
  }

  async loadSuggestion(suggestionId) {
    // Tentar carregar do cache ou de uma exportação anterior
    const cacheFile = path.join(this.rootPath, '.aiox', 'refactoring', `${suggestionId}.json`);
    
    try {
      const content = await fs.readFile(cacheFile, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      return null;
    }
  }

  async exportSuggestions(exportPath) {
    console.log(chalk.blue('\n📤 Exporting suggestions...'));
    
    const exportData = {
      version: 1,
      exportDate: new Date().toISOString(),
      analysisPath: this.rootPath,
      totalSuggestions: this.suggestions.length,
      statistics: this.refactoringSuggester.getStatistics(),
      suggestions: this.suggestions.map(s => ({
        ...s,
        file: s.file || s.filePath
      }))
    };

    await fs.writeFile(exportPath, JSON.stringify(exportData, null, 2));
    console.log(chalk.green(`✅ Exported ${this.suggestions.length} suggestions to: ${exportPath}`));
  }

  displayStatistics() {
    const stats = this.refactoringSuggester.getStatistics();
    
    console.log(chalk.blue('\n📊 Refactoring Statistics:'));
    console.log(chalk.gray('─'.repeat(50)));
    
    console.log(`Total suggestions: ${stats.totalSuggestions}`);
    console.log(`Average impact: ${stats.averageImpact}/10`);
    
    console.log('\nBy priority:');
    for (const [priority, count] of Object.entries(stats.byPriority)) {
      console.log(`  ${priority}: ${count}`);
    }
    
    console.log('\nBy type:');
    const sortedTypes = Object.entries(stats.byType)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
    
    for (const [type, count] of sortedTypes) {
      console.log(`  ${type}: ${count}`);
    }
  }
}

module.exports = SuggestRefactoringTask;
```

## Pontos de Integração

### Refactoring Suggester
- Motor central de análise
- Detecção de padrões
- Geração de sugestões
- Aplicação de refatorações

### Processamento de AST
- Parsing de código
- Correspondência de padrões
- Transformação de código
- Geração

### Biblioteca de Padrões
- Padrões de refatoração
- Algoritmos de detecção
- Estratégias de aplicação
- Métricas de sucesso

### Métricas de Código
- Análise de complexidade
- Métricas de qualidade de código
- Cálculo de impacto
- Atribuição de prioridade

## Workflow de Refatoração

### Fase de Análise
1. Fazer o parse do código em AST
2. Calcular métricas de código
3. Rodar os detectores de padrões
4. Gerar sugestões
5. Priorizar por impacto
6. **Code Intelligence Blast Radius** (se disponível):
   - Chamar `assessRefactoringImpact(candidateFiles)` de `.aiox-core/core/code-intel/helpers/dev-helper`
   - Se o resultado não for nulo, enriquecer cada sugestão com:
     - `blastRadius`: número de referências afetadas
     - `riskLevel`: LOW (<5 refs) | MEDIUM (5-15) | HIGH (>15)
   - Se a code intelligence não estiver disponível: as sugestões funcionam como antes (sem mostrar o blast radius)

### Fase de Revisão
1. Exibir sugestões
2. Agrupar por arquivo/tipo
3. Mostrar análise de impacto (incluindo o blast radius e o nível de risco quando disponíveis)
4. Fornecer um preview
5. Exportar para revisão

### Fase de Aplicação
1. Confirmar as mudanças
2. Criar backup
3. Aplicar a transformação
4. Validar o resultado
5. Atualizar as métricas

## Boas Práticas

### Refatoração Segura
- Sempre faça backup antes das mudanças
- Valide a sintaxe após a refatoração
- Rode os testes após as mudanças
- Use dry-run para preview
- Aplique incrementalmente

### Seleção de Padrões
- Comece com padrões de alto impacto
- Foque nos hotspots de código
- Considere as preferências da equipe
- Respeite os padrões de codificação
- Monitore a eficácia

### Melhoria Contínua
- Acompanhe o sucesso das refatorações
- Aprenda com os padrões aplicados
- Atualize a biblioteca de padrões
- Compartilhe refatorações bem-sucedidas
- Meça as tendências de qualidade de código

## Considerações de Segurança
- Validar a segurança da refatoração
- Preservar a funcionalidade
- Manter os padrões de segurança
- Auditar as mudanças
- Testar exaustivamente
