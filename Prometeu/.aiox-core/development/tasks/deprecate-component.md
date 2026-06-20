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

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: deprecateComponent()
responsável: Dex (Builder)
responsavel_type: Agente
atomic_layer: Molecule

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
duration_expected: 2-5 min (estimado)
cost_estimated: $0.001-0.003
token_usage: ~1.000-3.000 tokens
```

**Notas de Otimização:**
- Paralelizar operações independentes; reutilizar resultados de atoms; implementar saídas antecipadas

---

## Metadados

```yaml
story: N/A
version: 1.0.0
dependencies:
  - N/A
tags:
  - automation
  - workflow
updated_at: 2025-11-17
```

---

tools:
  - github-cli
# TODO: Criar deprecation-checklist.md para validação (story de follow-up necessária)
# checklists:
#   - deprecation-checklist.md
---

# Depreciar Componente - AIOX Developer Task

## Propósito
Marcar componentes do framework como depreciados com gestão de cronograma e geração de caminho de migração.

## Padrão de Comando
```
*deprecate-component <component-type> <component-name> [options]
```

## Parâmetros
- `component-type`: Tipo de componente (agent, task, workflow, util)
- `component-name`: Nome/ID do componente a ser depreciado
- `options`: Configuração de depreciação e cronograma

### Opções
- `--removal-version <version>`: Versão alvo para remoção (padrão: próxima major)
- `--replacement <name>`: Nome do componente substituto
- `--reason <text>`: Razão da depreciação
- `--migration-guide <path>`: Caminho para o guia de migração
- `--immediate`: Marcar para avisos de depreciação imediatos
- `--timeline <months>`: Cronograma de depreciação em meses (padrão: 6)
- `--severity <level>`: Severidade da depreciação (low, medium, high, critical)

## Exemplos
```bash
# Depreciar um agente com substituto
*deprecate-component agent weather-fetcher --replacement weather-service --reason "Performance optimization" --timeline 3

# Depreciar um utilitário com guia de migração
*deprecate-component util old-logger --replacement @aiox/logger --migration-guide docs/migration/logger.md --severity high

# Depreciação imediata por problema de segurança
*deprecate-component task insecure-parser --immediate --reason "Security vulnerability" --severity critical

# Depreciar workflow com versão de remoção customizada
*deprecate-component workflow legacy-processor --removal-version 3.0.0 --timeline 12
```

## Implementação

```javascript
const fs = require('fs').promises;
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');

class DeprecateComponentTask {
  constructor() {
    this.taskName = 'deprecate-component';
    this.description = 'Mark framework components as deprecated with timeline management';
    this.rootPath = process.cwd();
    this.deprecationManager = null;
    this.usageTracker = null;
    this.componentSearch = null;
  }

  async execute(params) {
    try {
      console.log(chalk.blue('🚫 AIOX Component Deprecation'));
      console.log(chalk.gray('Marking component as deprecated with timeline management\n'));

      // Analisar e validar parâmetros
      const config = await this.parseParameters(params);
      
      // Inicializar dependências
      await this.initializeDependencies();

      // Encontrar componente alvo
      const component = await this.findComponent(config.componentType, config.componentName);
      if (!component) {
        throw new Error(`Component not found: ${config.componentType}/${config.componentName}`);
      }

      // Verificar status atual de depreciação
      const currentStatus = await this.checkDeprecationStatus(component);
      if (currentStatus.deprecated && !config.force) {
        console.log(chalk.yellow(`⚠️  Component ${component.name} is already deprecated`));
        
        const { action } = await inquirer.prompt([{
          type: 'list',
          name: 'action',
          message: 'Component is already deprecated. What would you like to do?',
          choices: [
            { name: 'Update deprecation details', value: 'update' },
            { name: 'View current deprecation info', value: 'view' },
            { name: 'Cancel operation', value: 'cancel' }
          ]
        }]);

        if (action === 'cancel') {
          console.log(chalk.gray('Operation cancelled'));
          return;
        } else if (action === 'view') {
          await this.displayDeprecationInfo(component, currentStatus);
          return;
        }
      }

      // Analisar uso do componente
      console.log(chalk.gray('Analyzing component usage...'));
      const usageAnalysis = await this.analyzeComponentUsage(component);
      
      // Gerar plano de depreciação
      const deprecationPlan = await this.generateDeprecationPlan(component, config, usageAnalysis);

      // Exibir resumo da depreciação
      await this.displayDeprecationSummary(component, deprecationPlan);

      // Solicitar confirmação
      const confirmed = await this.requestConfirmation(deprecationPlan);
      if (!confirmed) {
        console.log(chalk.gray('Deprecation cancelled'));
        return;
      }

      // Executar depreciação
      const deprecationResult = await this.executeDeprecation(component, deprecationPlan);

      // Atualizar documentação
      await this.updateDocumentation(component, deprecationPlan);

      // Gerar artefatos de migração
      if (deprecationPlan.migrationRequired) {
        await this.generateMigrationArtifacts(component, deprecationPlan);
      }

      // Agendar tasks de depreciação
      await this.scheduleDeprecationTasks(component, deprecationPlan);

      // Exibir resumo de sucesso
      console.log(chalk.green('\n✅ Component deprecation completed successfully'));
      console.log(chalk.gray(`   Component: ${component.type}/${component.name}`));
      console.log(chalk.gray(`   Deprecation ID: ${deprecationResult.deprecationId}`));
      console.log(chalk.gray(`   Timeline: ${deprecationPlan.timeline} months`));
      console.log(chalk.gray(`   Removal planned: ${deprecationPlan.removalVersion}`));
      
      if (deprecationPlan.usageCount > 0) {
        console.log(chalk.yellow(`   ⚠️  Found ${deprecationPlan.usageCount} usage(s) that need migration`));
      }

      return {
        success: true,
        deprecationId: deprecationResult.deprecationId,
        component: component,
        timeline: deprecationPlan.timeline,
        usageCount: deprecationPlan.usageCount,
        migrationRequired: deprecationPlan.migrationRequired
      };

    } catch (error) {
      console.error(chalk.red(`\n❌ Component deprecation failed: ${error.message}`));
      throw error;
    }
  }

  async parseParameters(params) {
    if (params.length < 2) {
      throw new Error('Usage: *deprecate-component <component-type> <component-name> [options]');
    }

    const config = {
      componentType: params[0],
      componentName: params[1],
      removalVersion: null,
      replacement: null,
      reason: null,
      migrationGuide: null,
      immediate: false,
      timeline: 6,
      severity: 'medium',
      force: false
    };

    // Analisar opções
    for (let i = 2; i < params.length; i++) {
      const param = params[i];
      
      if (param === '--immediate') {
        config.immediate = true;
      } else if (param === '--force') {
        config.force = true;
      } else if (param.startsWith('--removal-version') && params[i + 1]) {
        config.removalVersion = params[++i];
      } else if (param.startsWith('--replacement') && params[i + 1]) {
        config.replacement = params[++i];
      } else if (param.startsWith('--reason') && params[i + 1]) {
        config.reason = params[++i];
      } else if (param.startsWith('--migration-guide') && params[i + 1]) {
        config.migrationGuide = params[++i];
      } else if (param.startsWith('--timeline') && params[i + 1]) {
        config.timeline = parseInt(params[++i]) || 6;
      } else if (param.startsWith('--severity') && params[i + 1]) {
        config.severity = params[++i];
      }
    }

    // Validar tipo de componente
    const validTypes = ['agent', 'task', 'workflow', 'util'];
    if (!validTypes.includes(config.componentType)) {
      throw new Error(`Invalid component type: ${config.componentType}. Must be one of: ${validTypes.join(', ')}`);
    }

    // Validar severidade
    const validSeverities = ['low', 'medium', 'high', 'critical'];
    if (!validSeverities.includes(config.severity)) {
      throw new Error(`Invalid severity: ${config.severity}. Must be one of: ${validSeverities.join(', ')}`);
    }

    return config;
  }

  async initializeDependencies() {
    try {
      // Inicializar o gerenciador de depreciação
      // const DeprecationManager = require('../scripts/deprecation-manager'); // Arquivado na Story 3.18
      // this.deprecationManager = new DeprecationManager({ rootPath: this.rootPath });
      // await this.deprecationManager.initialize();

      // Inicializar o rastreador de uso
      // const UsageTracker = require('../scripts/usage-tracker'); // Arquivado na Story 3.18
      // this.usageTracker = new UsageTracker({ rootPath: this.rootPath });

      // Inicializar a busca de componentes
      const ComponentSearch = require('../scripts/component-search');
      this.componentSearch = new ComponentSearch({ rootPath: this.rootPath });

    } catch (error) {
      throw new Error(`Failed to initialize dependencies: ${error.message}`);
    }
  }

  async findComponent(componentType, componentName) {
    const component = await this.componentSearch.findComponent(componentType, componentName);
    
    if (!component) {
      // Sugerir componentes similares
      const suggestions = await this.componentSearch.findSimilarComponents(componentType, componentName);
      if (suggestions.length > 0) {
        console.log(chalk.yellow('\nDid you mean one of these?'));
        suggestions.forEach(suggestion => {
          console.log(chalk.gray(`  - ${suggestion.type}/${suggestion.name}`));
        });
      }
      return null;
    }

    return component;
  }

  async checkDeprecationStatus(component) {
    return await this.deprecationManager.getDeprecationStatus(component.id);
  }

  async analyzeComponentUsage(component) {
    const usageAnalysis = await this.usageTracker.analyzeComponentUsage(component.id, {
      includeTests: false,
      includeDocs: false,
      scanDepth: 'full'
    });

    return {
      usageCount: usageAnalysis.total_references,
      usageLocations: usageAnalysis.usage_locations,
      dependentComponents: usageAnalysis.dependent_components,
      externalReferences: usageAnalysis.external_references
    };
  }

  async generateDeprecationPlan(component, config, usageAnalysis) {
    const plan = {
      componentId: component.id,
      componentType: component.type,
      componentName: component.name,
      deprecationTimestamp: new Date().toISOString(),
      removalVersion: config.removalVersion || await this.calculateRemovalVersion(config.timeline),
      replacement: config.replacement,
      reason: config.reason || 'Component deprecated',
      migrationGuide: config.migrationGuide,
      immediate: config.immediate,
      timeline: config.timeline,
      severity: config.severity,
      usageCount: usageAnalysis.usageCount,
      migrationRequired: usageAnalysis.usageCount > 0,
      affectedComponents: usageAnalysis.dependentComponents,
      deprecationActions: [],
      notifications: []
    };

    // Gerar ações de depreciação
    plan.deprecationActions = await this.generateDeprecationActions(component, plan, usageAnalysis);

    // Gerar plano de notificações
    plan.notifications = this.generateNotificationPlan(plan);

    return plan;
  }

  async calculateRemovalVersion(timelineMonths) {
    // Obter versão atual do package.json ou do rastreador de versões
    try {
      const packagePath = path.join(this.rootPath, 'package.json');
      const packageContent = await fs.readFile(packagePath, 'utf-8');
      const packageInfo = JSON.parse(packageContent);
      const currentVersion = packageInfo.version || '1.0.0';
      
      // Calcular versão de remoção com base no cronograma
      const [major, minor, patch] = currentVersion.split('.').map(Number);
      
      if (timelineMonths >= 12) {
        return `${major + 1}.0.0`;
      } else if (timelineMonths >= 6) {
        return `${major}.${minor + 1}.0`;
      } else {
        return `${major}.${minor}.${patch + 10}`;
      }
    } catch (error) {
      return '2.0.0'; // Versão de fallback
    }
  }

  async generateDeprecationActions(component, plan, usageAnalysis) {
    const actions = [];

    // Adicionar metadados de depreciação
    actions.push({
      type: 'add_deprecation_metadata',
      description: 'Add deprecation metadata to component',
      target: component.filePath,
      metadata: {
        deprecated: true,
        deprecatedSince: plan.deprecationTimestamp,
        removalPlanned: plan.removalVersion,
        replacement: plan.replacement,
        reason: plan.reason
      }
    });

    // Adicionar comentários/avisos de depreciação
    actions.push({
      type: 'add_deprecation_warnings',
      description: 'Add deprecation warnings to component code',
      target: component.filePath,
      warningType: component.type === 'agent' ? 'yaml_comment' : 'code_comment'
    });

    // Atualizar registro do componente
    if (component.registrationFile) {
      actions.push({
        type: 'update_component_registry',
        description: 'Mark component as deprecated in registry',
        target: component.registrationFile,
        deprecationStatus: true
      });
    }

    // Gerar avisos de uso
    if (usageAnalysis.usageCount > 0) {
      for (const usage of usageAnalysis.usageLocations) {
        actions.push({
          type: 'add_usage_warning',
          description: `Add deprecation warning at usage site: ${usage.file}`,
          target: usage.file,
          line: usage.line,
          warningMessage: this.generateUsageWarning(component, plan)
        });
      }
    }

    return actions;
  }

  generateUsageWarning(component, plan) {
    let warning = `DEPRECATED: ${component.type}/${component.name} is deprecated`;
    
    if (plan.replacement) {
      warning += ` - use ${plan.replacement} instead`;
    }
    
    if (plan.removalVersion) {
      warning += ` (removal planned in ${plan.removalVersion})`;
    }
    
    return warning;
  }

  generateNotificationPlan(plan) {
    const notifications = [];

    // Notificação imediata para severidade high/critical
    if (plan.severity === 'high' || plan.severity === 'critical') {
      notifications.push({
        type: 'immediate_alert',
        message: `High priority deprecation: ${plan.componentType}/${plan.componentName}`,
        channels: ['console', 'log']
      });
    }

    // Notificações baseadas no cronograma
    if (plan.timeline >= 6) {
      notifications.push({
        type: 'scheduled_reminder',
        schedule: 'monthly',
        message: `Reminder: ${plan.componentName} deprecation (${plan.timeline} months remaining)`
      });
    }

    // Aviso pré-remoção
    notifications.push({
      type: 'pre_removal_warning',
      schedule: '1_month_before_removal',
      message: `Final warning: ${plan.componentName} will be removed in ${plan.removalVersion}`
    });

    return notifications;
  }

  async displayDeprecationSummary(component, plan) {
    console.log(chalk.blue('\n📋 Deprecation Summary'));
    console.log(chalk.gray('━'.repeat(50)));
    
    console.log(`Component: ${chalk.white(component.type)}/${chalk.white(component.name)}`);
    console.log(`Location: ${chalk.gray(component.filePath)}`);
    console.log(`Reason: ${chalk.yellow(plan.reason)}`);
    console.log(`Severity: ${this.getSeverityColor(plan.severity)(plan.severity)}`);
    console.log(`Timeline: ${chalk.white(plan.timeline)} months`);
    console.log(`Removal Version: ${chalk.white(plan.removalVersion)}`);
    
    if (plan.replacement) {
      console.log(`Replacement: ${chalk.green(plan.replacement)}`);
    }
    
    if (plan.usageCount > 0) {
      console.log(`\n${chalk.yellow('⚠️  Usage Analysis:')}`);
      console.log(`  Found ${chalk.white(plan.usageCount)} usage(s) across ${plan.affectedComponents.length} component(s)`);
    }
    
    console.log(`\n${chalk.blue('Planned Actions:')}`);
    plan.deprecationActions.forEach((action, index) => {
      console.log(`  ${index + 1}. ${action.description}`);
    });
  }

  getSeverityColor(severity) {
    const colors = {
      low: chalk.green,
      medium: chalk.yellow,
      high: chalk.orange || chalk.yellow,
      critical: chalk.red
    };
    return colors[severity] || chalk.white;
  }

  async requestConfirmation(plan) {
    const { confirmed } = await inquirer.prompt([{
      type: 'confirm',
      name: 'confirmed',
      message: `Proceed with deprecating ${plan.componentType}/${plan.componentName}?`,
      default: false
    }]);

    return confirmed;
  }

  async executeDeprecation(component, plan) {
    const deprecationId = `dep-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
    
    console.log(chalk.gray('\nExecuting deprecation actions...'));

    const results = {
      deprecationId,
      actionsExecuted: 0,
      actionsFailed: 0,
      errors: []
    };

    for (const action of plan.deprecationActions) {
      try {
        await this.executeDeprecationAction(action);
        results.actionsExecuted++;
        console.log(chalk.gray(`  ✓ ${action.description}`));
      } catch (error) {
        results.actionsFailed++;
        results.errors.push({
          action: action.type,
          error: error.message
        });
        console.log(chalk.red(`  ✗ ${action.description}: ${error.message}`));
      }
    }

    // Registrar depreciação no sistema
    await this.deprecationManager.recordDeprecation(component.id, {
      deprecationId,
      timestamp: plan.deprecationTimestamp,
      plan: plan,
      results: results
    });

    return results;
  }

  async executeDeprecationAction(action) {
    switch (action.type) {
      case 'add_deprecation_metadata':
        return await this.addDeprecationMetadata(action.target, action.metadata);
      
      case 'add_deprecation_warnings':
        return await this.addDeprecationWarnings(action.target, action.warningType);
      
      case 'update_component_registry':
        return await this.updateComponentRegistry(action.target, action.deprecationStatus);
      
      case 'add_usage_warning':
        return await this.addUsageWarning(action.target, action.line, action.warningMessage);
      
      default:
        throw new Error(`Unknown deprecation action type: ${action.type}`);
    }
  }

  async addDeprecationMetadata(filePath, metadata) {
    // A implementação depende do tipo de arquivo
    // Por enquanto, adicionar a um arquivo de metadados separado
    const metadataPath = path.join(path.dirname(filePath), '.deprecation-metadata.json');
    
    let existingMetadata = {};
    try {
      const content = await fs.readFile(metadataPath, 'utf-8');
      existingMetadata = JSON.parse(content);
    } catch (error) {
      // Arquivo não existe, começar do zero
    }

    existingMetadata[path.basename(filePath)] = metadata;
    
    await fs.writeFile(metadataPath, JSON.stringify(existingMetadata, null, 2));
  }

  async addDeprecationWarnings(filePath, warningType) {
    const content = await fs.readFile(filePath, 'utf-8');
    
    if (warningType === 'yaml_comment') {
      // Adicionar comentário YAML para arquivos de agente
      const warningComment = '# DEPRECATED: This agent is deprecated and will be removed in a future version\n';
      const updatedContent = warningComment + content;
      await fs.writeFile(filePath, updatedContent);
    } else {
      // Adicionar comentário de código para outros arquivos
      const warningComment = '// DEPRECATED: This component is deprecated and will be removed in a future version\n';
      const updatedContent = warningComment + content;
      await fs.writeFile(filePath, updatedContent);
    }
  }

  async updateComponentRegistry(registryPath, deprecationStatus) {
    // Atualizar o registro de componentes para marcar como depreciado
    // A implementação dependeria do formato do registro
    console.log(chalk.gray(`Would update registry at ${registryPath}`));
  }

  async addUsageWarning(filePath, lineNumber, warningMessage) {
    // Adicionar comentário de aviso de depreciação próximo ao uso
    console.log(chalk.gray(`Would add warning to ${filePath}:${lineNumber}: ${warningMessage}`));
  }

  async updateDocumentation(component, plan) {
    // Atualizar a documentação do componente com aviso de depreciação
    const docsPath = this.findComponentDocumentation(component);
    if (docsPath) {
      // Adicionar aviso de depreciação à documentação
      console.log(chalk.gray(`Updating documentation at ${docsPath}`));
    }
  }

  async generateMigrationArtifacts(component, plan) {
    if (!plan.replacement) return;

    // Gerar guia de migração
    const migrationGuidePath = path.join(
      this.rootPath, 
      'docs', 
      'migrations', 
      `${component.name}-to-${plan.replacement}.md`
    );

    const migrationGuideContent = this.generateMigrationGuideContent(component, plan);
    
    await fs.mkdir(path.dirname(migrationGuidePath), { recursive: true });
    await fs.writeFile(migrationGuidePath, migrationGuideContent);

    console.log(chalk.gray(`Generated migration guide: ${migrationGuidePath}`));
  }

  generateMigrationGuideContent(component, plan) {
    return `# Migration Guide: ${component.name} → ${plan.replacement}

## Overview
The ${component.type} \`${component.name}\` has been deprecated and will be removed in version ${plan.removalVersion}.

## Reason for Deprecation
${plan.reason}

## Migration Steps
1. Replace usage of \`${component.name}\` with \`${plan.replacement}\`
2. Update any configuration references
3. Test the replacement functionality
4. Remove any deprecated imports/references

## Timeline
- Deprecated: ${new Date(plan.deprecationTimestamp).toLocaleDateString()}
- Removal planned: Version ${plan.removalVersion}
- Timeline: ${plan.timeline} months

## Need Help?
If you encounter issues during migration, please refer to the documentation or contact support.
`;
  }

  async scheduleDeprecationTasks(component, plan) {
    // Agendar tasks futuras para o cronograma de depreciação
    const tasks = [
      {
        type: 'deprecation_reminder',
        scheduledFor: this.calculateReminderDate(plan.timeline),
        component: component.id,
        message: `Deprecation reminder for ${component.name}`
      },
      {
        type: 'removal_preparation',
        scheduledFor: this.calculateRemovalDate(plan.timeline),
        component: component.id,
        message: `Prepare for removal of ${component.name}`
      }
    ];

    for (const task of tasks) {
      await this.deprecationManager.scheduleTask(task);
    }
  }

  calculateReminderDate(timelineMonths) {
    const reminderDate = new Date();
    reminderDate.setMonth(reminderDate.getMonth() + Math.floor(timelineMonths / 2));
    return reminderDate.toISOString();
  }

  calculateRemovalDate(timelineMonths) {
    const removalDate = new Date();
    removalDate.setMonth(removalDate.getMonth() + timelineMonths);
    return removalDate.toISOString();
  }

  findComponentDocumentation(component) {
    // Encontrar arquivo de documentação para o componente
    return null; // Placeholder
  }

  async displayDeprecationInfo(component, deprecationStatus) {
    console.log(chalk.blue('\n📋 Current Deprecation Status'));
    console.log(chalk.gray('━'.repeat(50)));
    
    console.log(`Component: ${component.type}/${component.name}`);
    console.log(`Deprecated Since: ${new Date(deprecationStatus.deprecatedSince).toLocaleDateString()}`);
    console.log(`Removal Planned: ${deprecationStatus.removalVersion}`);
    console.log(`Reason: ${deprecationStatus.reason}`);
    
    if (deprecationStatus.replacement) {
      console.log(`Replacement: ${deprecationStatus.replacement}`);
    }
  }
}

module.exports = DeprecateComponentTask;
```

## Regras de Validação

### Validação de Entrada
- O tipo de componente deve ser válido (agent, task, workflow, util)
- O componente deve existir no framework
- A severidade deve ser um nível válido
- O cronograma deve ser um número positivo

### Verificações de Segurança
- Avisar se o componente tem alto uso
- Exigir confirmação para componentes críticos
- Prevenir depreciação acidental de componentes core

### Requisitos de Depreciação
- Deve especificar o cronograma de remoção
- Deve fornecer um substituto quando disponível
- Deve incluir a razão da depreciação
- Deve gerar artefatos de migração

## Pontos de Integração

### Deprecation Manager
- Registra metadados de depreciação
- Rastreia o cronograma de depreciação
- Gerencia tasks agendadas
- Fornece o status de depreciação

### Usage Tracker
- Analisa o uso do componente ao longo do codebase
- Identifica componentes dependentes
- Rastreia padrões de uso ao longo do tempo
- Fornece análise de impacto

### Migration Generator
- Cria guias de migração
- Gera sugestões de substituição
- Fornece scripts de migração automatizados
- Rastreia o progresso da migração

## Estrutura de Saída

### Resposta de Sucesso
```json
{
  "success": true,
  "deprecationId": "dep-1234567890-abc123",
  "component": {
    "type": "agent",
    "name": "weather-fetcher",
    "filePath": "/path/to/component"
  },
  "timeline": 6,
  "usageCount": 3,
  "migrationRequired": true
}
```

### Resposta de Erro
```json
{
  "success": false,
  "error": "Component not found: agent/invalid-name",
  "suggestions": ["weather-service", "weather-api"]
}
```

## Considerações de Segurança
- Validar todos os caminhos de arquivo para prevenir directory traversal
- Sanitizar a entrada do usuário para as razões de depreciação
- Exigir permissões apropriadas para modificação de componentes
- Registrar todas as ações de depreciação para trilha de auditoria
