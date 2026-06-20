# Task: Analisar Framework

## Descrição
Realiza análise abrangente do framework Synkra AIOX para identificar oportunidades de melhoria, gargalos de performance, redundâncias de componentes e padrões de uso.

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

### 3. Planejamento Pré-Voo - Planejamento Abrangente Antecipado
- Fase de análise de tarefa (identificar todas as ambiguidades)
- Execução com zero ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: analyzeFramework()
responsável: Aria (Visionary)
responsavel_type: Agente
atomic_layer: Strategy

**Entrada:**
- campo: target
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Caminho ou identificador válido

- campo: options
  tipo: object
  origem: config
  obrigatório: false
  validação: Configuração de análise

- campo: depth
  tipo: number
  origem: User Input
  obrigatório: false
  validação: Padrão: 1 (0-3)

**Saída:**
- campo: analysis_report
  tipo: object
  destino: File (.ai/*.json)
  persistido: true

- campo: findings
  tipo: array
  destino: Memory
  persistido: false

- campo: metrics
  tipo: object
  destino: Memory
  persistido: false
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Target existe e está acessível; ferramentas de análise disponíveis
    tipo: pre-condition
    blocker: true
    validação: |
      Verificar se o target existe e está acessível; ferramentas de análise disponíveis
    error_message: "Pré-condição falhou: Target existe e está acessível; ferramentas de análise disponíveis"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a conclusão da task

**Checklist:**

```yaml
post-conditions:
  - [ ] Análise concluída; relatório gerado; sem problemas críticos
    tipo: post-condition
    blocker: true
    validação: |
      Verificar se a análise foi concluída; relatório gerado; sem problemas críticos
    error_message: "Pós-condição falhou: Análise concluída; relatório gerado; sem problemas críticos"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de aprovação/reprovação para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Análise precisa; todos os targets cobertos; relatório completo
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Afirmar que a análise é precisa; todos os targets cobertos; relatório completo
    error_message: "Critério de aceite não atendido: Análise precisa; todos os targets cobertos; relatório completo"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** code-analyzer
  - **Propósito:** Análise estática de código e métricas
  - **Origem:** .aiox-core/utils/code-analyzer.js

- **Ferramenta:** file-system
  - **Propósito:** Travessia recursiva de diretórios
  - **Origem:** Módulo fs do Node.js

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** analyze-codebase.js
  - **Propósito:** Análise de codebase e geração de relatórios
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/scripts/analyze-codebase.js

---

## Tratamento de Erros

**Estratégia:** fallback

**Erros Comuns:**

1. **Erro:** Target Não Acessível
   - **Causa:** Caminho não existe ou permissões negadas
   - **Resolução:** Verificar o caminho e checar as permissões
   - **Recuperação:** Pular caminhos inacessíveis, continuar com os acessíveis

2. **Erro:** Timeout de Análise
   - **Causa:** A análise excede o limite de tempo para codebases grandes
   - **Resolução:** Reduzir a profundidade ou o escopo da análise
   - **Recuperação:** Retornar resultados parciais com aviso de timeout

3. **Erro:** Limite de Memória Excedido
   - **Causa:** Codebase grande excede a alocação de memória
   - **Resolução:** Processar em lotes ou aumentar o limite de memória
   - **Recuperação:** Degradação graciosa para análise resumida

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
  - analysis
  - metrics
updated_at: 2025-11-17
```

---


## Tipo
Task de Análise

## Complexidade
Alta

## Categorias
- framework-analysis
- performance-optimization
- code-quality

## Dependências
- component-search.js (para descoberta de componentes)
- usage-analytics.js (para análise de padrões de uso)
- performance-analyzer.js (para detecção de gargalos)
- redundancy-analyzer.js (para detecção de sobreposições)
- improvement-engine.js (para geração de sugestões)

## Parâmetros
- `scope` (string, opcional): Escopo da análise - 'full', 'agents', 'tasks', 'workflows', 'utils' (padrão: 'full')
- `output_format` (string, opcional): Formato de saída - 'detailed', 'summary', 'json' (padrão: 'detailed')
- `include_metrics` (boolean, opcional): Incluir métricas de performance (padrão: true)
- `include_suggestions` (boolean, opcional): Incluir sugestões de melhoria (padrão: true)
- `save_report` (boolean, opcional): Salvar relatório em arquivo (padrão: true)

## Implementação

```javascript
const FrameworkAnalyzer = require('../scripts/framework-analyzer');
const UsageAnalytics = require('../scripts/usage-analytics');
const PerformanceAnalyzer = require('../scripts/performance-analyzer');
// const RedundancyAnalyzer = require('../scripts/redundancy-analyzer'); // Arquivado - Story 3.1.4
const ImprovementEngine = require('../scripts/improvement-engine');
const fs = require('fs').promises;
const path = require('path');
const chalk = require('chalk');

module.exports = {
  name: 'analyze-framework',
  description: 'Performs comprehensive framework analysis with improvement recommendations',
  
  async execute(params) {
    const {
      scope = 'full',
      output_format = 'detailed',
      include_metrics = true,
      include_suggestions = true,
      save_report = true
    } = params;

    console.log(chalk.blue('🔍 Starting framework analysis...'));
    console.log(chalk.gray(`   Scope: ${scope}`));
    console.log(chalk.gray(`   Format: ${output_format}`));

    const analysis = {
      timestamp: new Date().toISOString(),
      scope,
      framework_info: {},
      component_analysis: {},
      usage_analytics: {},
      performance_analysis: {},
      redundancy_analysis: {},
      improvement_suggestions: [],
      summary: {}
    };

    try {
      // Inicializa os analisadores
      const frameworkAnalyzer = new FrameworkAnalyzer({ rootPath: process.cwd() });
      const usageAnalytics = new UsageAnalytics({ rootPath: process.cwd() });
      const performanceAnalyzer = new PerformanceAnalyzer({ rootPath: process.cwd() });
      // const redundancyAnalyzer = new RedundancyAnalyzer({ rootPath: process.cwd() }); // Arquivado - Story 3.1.4
      const improvementEngine = new ImprovementEngine({ rootPath: process.cwd() });

      // Passo 1: Descobrir e catalogar os componentes do framework
      console.log(chalk.blue('📊 Discovering framework components...'));
      analysis.framework_info = await frameworkAnalyzer.analyzeFrameworkStructure(scope);
      
      console.log(chalk.gray(`   Found: ${analysis.framework_info.total_components} components`));
      console.log(chalk.gray(`   Agents: ${analysis.framework_info.agents?.length || 0}`));
      console.log(chalk.gray(`   Tasks: ${analysis.framework_info.tasks?.length || 0}`));
      console.log(chalk.gray(`   Workflows: ${analysis.framework_info.workflows?.length || 0}`));
      console.log(chalk.gray(`   Utils: ${analysis.framework_info.utils?.length || 0}`));

      // Passo 2: Analisar os padrões de uso dos componentes
      console.log(chalk.blue('📈 Analyzing usage patterns...'));
      analysis.usage_analytics = await usageAnalytics.analyzeUsagePatterns(
        analysis.framework_info.components
      );

      // Passo 3: Detecção de gargalos de performance
      if (include_metrics) {
        console.log(chalk.blue('⚡ Detecting performance bottlenecks...'));
        analysis.performance_analysis = await performanceAnalyzer.analyzePerformance(
          analysis.framework_info.components
        );
      }

      // Passo 4: Análise de redundância e sobreposição
      // console.log(chalk.blue('🔄 Analyzing redundancies and overlaps...'));
      // analysis.redundancy_analysis = await redundancyAnalyzer.analyzeRedundancy(
      //   analysis.framework_info.components
      // ); // Arquivado - Story 3.1.4

      // Passo 5: Gerar sugestões de melhoria
      if (include_suggestions) {
        console.log(chalk.blue('💡 Generating improvement suggestions...'));
        analysis.improvement_suggestions = await improvementEngine.generateSuggestions({
          components: analysis.framework_info.components,
          usage: analysis.usage_analytics,
          performance: analysis.performance_analysis
          // redundancy: analysis.redundancy_analysis // Arquivado - Story 3.1.4
        });
      }

      // Passo 6: Gerar resumo
      analysis.summary = this.generateSummary(analysis);

      // Passo 7: Formatar e exibir os resultados
      await this.displayResults(analysis, output_format);

      // Passo 8: Salvar relatório
      if (save_report) {
        const reportPath = await this.saveReport(analysis);
        console.log(chalk.green(`📋 Report saved: ${reportPath}`));
      }

      console.log(chalk.green('✅ Framework analysis completed'));
      
      return {
        success: true,
        analysis,
        suggestions_count: analysis.improvement_suggestions.length,
        critical_issues: analysis.summary.critical_issues || 0,
        performance_score: analysis.summary.performance_score || 'N/A'
      };

    } catch (error) {
      console.error(chalk.red(`Framework analysis failed: ${error.message}`));
      
      return {
        success: false,
        error: error.message,
        partial_analysis: analysis
      };
    }
  },

  /**
   * Gera o resumo da análise
   */
  generateSummary(analysis) {
    const summary = {
      total_components: analysis.framework_info.total_components || 0,
      health_score: 0,
      critical_issues: 0,
      warnings: 0,
      recommendations: 0,
      performance_score: 'N/A',
      redundancy_level: 'low',
      usage_efficiency: 0,
      top_concerns: [],
      strengths: []
    };

    // Calcula o health score
    let healthPoints = 100;
    
    if (analysis.redundancy_analysis.redundant_components) {
      const redundancyPenalty = analysis.redundancy_analysis.redundant_components.length * 5;
      healthPoints -= redundancyPenalty;
      summary.critical_issues += analysis.redundancy_analysis.redundant_components.length;
    }

    if (analysis.performance_analysis.bottlenecks) {
      const performancePenalty = analysis.performance_analysis.bottlenecks.length * 10;
      healthPoints -= performancePenalty;
      summary.critical_issues += analysis.performance_analysis.bottlenecks.length;
    }

    if (analysis.usage_analytics.unused_components) {
      const unusedPenalty = analysis.usage_analytics.unused_components.length * 3;
      healthPoints -= unusedPenalty;
      summary.warnings += analysis.usage_analytics.unused_components.length;
    }

    summary.health_score = Math.max(0, Math.min(100, healthPoints));
    summary.recommendations = analysis.improvement_suggestions.length;

    // Performance score
    if (analysis.performance_analysis.overall_score) {
      summary.performance_score = analysis.performance_analysis.overall_score;
    }

    // Eficiência de uso
    if (analysis.usage_analytics.efficiency_score) {
      summary.usage_efficiency = analysis.usage_analytics.efficiency_score;
    }

    // Nível de redundância
    if (analysis.redundancy_analysis.redundancy_level) {
      summary.redundancy_level = analysis.redundancy_analysis.redundancy_level;
    }

    // Principais preocupações
    if (analysis.performance_analysis.bottlenecks?.length > 0) {
      summary.top_concerns.push('Performance bottlenecks detected');
    }
    
    if (analysis.redundancy_analysis.redundant_components?.length > 0) {
      summary.top_concerns.push('Code redundancy found');
    }
    
    if (analysis.usage_analytics.unused_components?.length > 0) {
      summary.top_concerns.push('Unused components detected');
    }

    // Pontos fortes
    if (summary.health_score >= 90) {
      summary.strengths.push('Overall framework health excellent');
    }
    
    if (summary.performance_score >= 8) {
      summary.strengths.push('Good performance characteristics');
    }
    
    if (summary.usage_efficiency >= 85) {
      summary.strengths.push('High component utilization');
    }

    return summary;
  },

  /**
   * Exibe os resultados da análise
   */
  async displayResults(analysis, format) {
    switch (format) {
      case 'summary':
        this.displaySummary(analysis);
        break;
      case 'json':
        console.log(JSON.stringify(analysis, null, 2));
        break;
      case 'detailed':
      default:
        this.displayDetailed(analysis);
        break;
    }
  },

  /**
   * Exibe o formato de resumo
   */
  displaySummary(analysis) {
    const { summary } = analysis;
    
    console.log(chalk.bold('\n📊 Framework Analysis Summary'));
    console.log(chalk.gray('─'.repeat(50)));
    
    // Health score com codificação por cores
    const healthColor = summary.health_score >= 80 ? 'green' : 
                       summary.health_score >= 60 ? 'yellow' : 'red';
    console.log(`Health Score: ${chalk[healthColor](summary.health_score + '/100')}`);
    
    console.log(`Components: ${summary.total_components}`);
    console.log(`Critical Issues: ${chalk.red(summary.critical_issues)}`);
    console.log(`Warnings: ${chalk.yellow(summary.warnings)}`);
    console.log(`Recommendations: ${chalk.blue(summary.recommendations)}`);
    
    if (summary.performance_score !== 'N/A') {
      console.log(`Performance: ${chalk.cyan(summary.performance_score + '/10')}`);
    }
    
    console.log(`Usage Efficiency: ${chalk.cyan(summary.usage_efficiency + '%')}`);
    console.log(`Redundancy Level: ${chalk.magenta(summary.redundancy_level)}`);

    // Principais preocupações
    if (summary.top_concerns.length > 0) {
      console.log('\n🚨 Top Concerns:');
      summary.top_concerns.forEach(concern => {
        console.log(`  • ${chalk.red(concern)}`);
      });
    }

    // Pontos fortes
    if (summary.strengths.length > 0) {
      console.log('\n✅ Strengths:');
      summary.strengths.forEach(strength => {
        console.log(`  • ${chalk.green(strength)}`);
      });
    }
  },

  /**
   * Exibe o formato detalhado
   */
  displayDetailed(analysis) {
    this.displaySummary(analysis);
    
    // Detalhamento de componentes
    console.log(chalk.bold('\n📋 Component Analysis'));
    console.log(chalk.gray('─'.repeat(50)));
    
    if (analysis.framework_info.agents) {
      console.log(`Agents (${analysis.framework_info.agents.length}):`);
      analysis.framework_info.agents.slice(0, 5).forEach(agent => {
        console.log(`  • ${chalk.cyan(agent.name)} - ${agent.description || 'No description'}`);
      });
      if (analysis.framework_info.agents.length > 5) {
        console.log(`  ... and ${analysis.framework_info.agents.length - 5} more`);
      }
    }

    // Problemas de performance
    if (analysis.performance_analysis.bottlenecks?.length > 0) {
      console.log(chalk.bold('\n⚡ Performance Bottlenecks'));
      console.log(chalk.gray('─'.repeat(50)));
      
      analysis.performance_analysis.bottlenecks.slice(0, 3).forEach(bottleneck => {
        console.log(`  • ${chalk.red(bottleneck.component)}: ${bottleneck.issue}`);
        console.log(`    Impact: ${chalk.yellow(bottleneck.impact)} | Effort: ${bottleneck.effort}`);
      });
    }

    // Problemas de redundância
    if (analysis.redundancy_analysis.redundant_components?.length > 0) {
      console.log(chalk.bold('\n🔄 Redundant Components'));
      console.log(chalk.gray('─'.repeat(50)));
      
      analysis.redundancy_analysis.redundant_components.slice(0, 3).forEach(redundancy => {
        console.log(`  • ${chalk.red(redundancy.component1)} ↔️ ${redundancy.component2}`);
        console.log(`    Similarity: ${chalk.yellow(redundancy.similarity + '%')} | Type: ${redundancy.type}`);
      });
    }

    // Principais sugestões
    if (analysis.improvement_suggestions.length > 0) {
      console.log(chalk.bold('\n💡 Top Improvement Suggestions'));
      console.log(chalk.gray('─'.repeat(50)));
      
      analysis.improvement_suggestions
        .sort((a, b) => (b.priority_score || 0) - (a.priority_score || 0))
        .slice(0, 5)
        .forEach((suggestion, index) => {
          const priorityColor = suggestion.priority === 'high' ? 'red' : 
                               suggestion.priority === 'medium' ? 'yellow' : 'gray';
          console.log(`  ${index + 1}. ${chalk[priorityColor](suggestion.title)}`);
          console.log(`     ${suggestion.description}`);
          console.log(`     Impact: ${chalk.cyan(suggestion.impact)} | Effort: ${suggestion.effort}`);
        });
    }
  },

  /**
   * Salva o relatório da análise
   */
  async saveReport(analysis) {
    const reportsDir = path.join(process.cwd(), '.aiox', 'reports');
    await fs.mkdir(reportsDir, { recursive: true });
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const reportPath = path.join(reportsDir, `framework-analysis-${timestamp}.json`);
    
    await fs.writeFile(reportPath, JSON.stringify(analysis, null, 2));
    
    // Também salva um resumo legível por humanos
    const summaryPath = path.join(reportsDir, `framework-analysis-summary-${timestamp}.md`);
    const summaryContent = this.generateMarkdownSummary(analysis);
    await fs.writeFile(summaryPath, summaryContent);
    
    return reportPath;
  },

  /**
   * Gera o resumo em markdown
   */
  generateMarkdownSummary(analysis) {
    const { summary } = analysis;
    
    return `# Framework Analysis Report

**Generated:** ${new Date(analysis.timestamp).toLocaleString()}
**Scope:** ${analysis.scope}

## Summary

- **Health Score:** ${summary.health_score}/100
- **Components:** ${summary.total_components}
- **Critical Issues:** ${summary.critical_issues}
- **Warnings:** ${summary.warnings}
- **Recommendations:** ${summary.recommendations}
- **Performance Score:** ${summary.performance_score}
- **Usage Efficiency:** ${summary.usage_efficiency}%
- **Redundancy Level:** ${summary.redundancy_level}

## Top Concerns

${summary.top_concerns.map(concern => `- ${concern}`).join('\n') || 'None identified'}

## Strengths

${summary.strengths.map(strength => `- ${strength}`).join('\n') || 'None identified'}

## Key Metrics

### Component Distribution
- Agents: ${analysis.framework_info.agents?.length || 0}
- Tasks: ${analysis.framework_info.tasks?.length || 0}
- Workflows: ${analysis.framework_info.workflows?.length || 0}
- Utils: ${analysis.framework_info.utils?.length || 0}

### Performance Analysis
${analysis.performance_analysis.bottlenecks?.length > 0 ? 
  `**Bottlenecks Found:** ${analysis.performance_analysis.bottlenecks.length}\n\n` +
  analysis.performance_analysis.bottlenecks.slice(0, 3).map(b => 
    `- **${b.component}:** ${b.issue} (Impact: ${b.impact})`
  ).join('\n') : 'No significant bottlenecks detected'}

### Redundancy Analysis
${analysis.redundancy_analysis.redundant_components?.length > 0 ?
  `**Redundant Components:** ${analysis.redundancy_analysis.redundant_components.length}\n\n` +
  analysis.redundancy_analysis.redundant_components.slice(0, 3).map(r =>
    `- **${r.component1}** ↔️ **${r.component2}** (${r.similarity}% similar)`
  ).join('\n') : 'No significant redundancy detected'}

## Top Improvement Suggestions

${analysis.improvement_suggestions.slice(0, 5).map((suggestion, index) => 
  `${index + 1}. **${suggestion.title}** (${suggestion.priority})
   - ${suggestion.description}
   - Impact: ${suggestion.impact} | Effort: ${suggestion.effort}`
).join('\n\n') || 'No suggestions generated'}

---
*Report generated by AIOX Framework Analyzer*
`;
  }
};
```

## Exemplos de Uso

### Análise Básica
```bash
*analyze-framework
```

### Análise por Escopo Específico
```bash
*analyze-framework scope=agents
*analyze-framework scope=utils include_suggestions=false
```

### Saída Resumida
```bash
*analyze-framework output_format=summary
```

### Análise com Foco em Performance
```bash
*analyze-framework include_metrics=true output_format=detailed
```

## Saída Esperada

A análise fornece:

1. **Visão Geral da Estrutura do Framework**: Inventário completo de componentes
2. **Analytics de Uso**: Análise de padrões e métricas de utilização
3. **Análise de Performance**: Identificação de gargalos e recomendações
4. **Detecção de Redundância**: Identificação de funcionalidades sobrepostas
5. **Sugestões de Melhoria**: Recomendações priorizadas para aprimoramento
6. **Health Score**: Avaliação geral da qualidade do framework
7. **Relatórios Detalhados**: Formatos JSON e Markdown para referência futura

## Considerações de Segurança

- Análise somente-leitura - nenhuma modificação feita no framework
- Varredura segura do sistema de arquivos com verificações de permissão
- Monitoramento de uso de memória para codebases grandes
- Profundidade de análise configurável para prevenir problemas de performance

## Integração

Funciona perfeitamente com:
- Comando `*improve-self` para implementar sugestões
- Camada de memória para armazenar o histórico de análises
- Controle de versão para rastrear melhorias
- Ferramentas de modificação de componentes para aplicar mudanças
