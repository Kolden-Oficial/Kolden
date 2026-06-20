# sync-documentation

**Task ID:** `sync-documentation`  
**Version:** 2.0.0  
**Status:** Active

---

## Propósito

Sincronizar automaticamente a documentação com as mudanças de código para garantir que a documentação permaneça atualizada com a implementação.

---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com logging
- Interação mínima com o usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[DEFAULT]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pre-Flight - Planejamento Antecipado Abrangente
- Fase de análise de task (identificar todas as ambiguidades)
- Execução sem ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

**Valores válidos:** `yolo`, `interactive`, `preflight`

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: syncDocumentation()
responsável: Morgan (Strategist)
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

## Pré-condições

**Purpose:** Validar pré-requisitos ANTES da execução da task (bloqueante)

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

## Execução Passo a Passo

### Passo 1: Parse de Parâmetros

**Purpose:** Fazer parse e validar parâmetros de linha de comando

**Actions:**
1. Fazer parse das opções de linha de comando (--component, --all, --check, etc.)
2. Validar estratégias de sincronização
3. Definir valores padrão
4. Validar caminhos de arquivo, se fornecidos

**Validation:**
- Os parâmetros são válidos
- As estratégias são suportadas
- Os caminhos de arquivo existem (se especificados)

---

### Passo 2: Inicializar Dependências

**Purpose:** Configurar o sincronizador de documentação e as ferramentas necessárias

**Actions:**
1. Carregar o módulo DocumentationSynchronizer
2. Inicializar o sincronizador com o caminho raiz
3. Configurar os event listeners
4. Verificar se todas as dependências estão disponíveis

**Validation:**
- Sincronizador inicializado com sucesso
- Event listeners registrados
- Dependências disponíveis

---

### Passo 3: Executar a Ação Solicitada

**Purpose:** Executar a ação de sincronização solicitada

**Actions:**
1. Determinar o tipo de ação (check, sync, auto-sync, report)
2. Executar o método correspondente
3. Tratar erros de forma graciosa
4. Retornar os resultados

**Validation:**
- Ação executada com sucesso
- Resultados retornados
- Erros tratados adequadamente

---

## Pós-condições

**Purpose:** Validar o sucesso da execução APÓS a conclusão da task

**Checklist:**

```yaml
post-conditions:
  - [ ] Task completed; exit code 0; expected outputs created
    tipo: post-condition
    blocker: true
    validação: |
      Verify task completed; exit code 0; expected outputs created
    rollback: false
    error_message: "Post-condition failed: Task completed; exit code 0; expected outputs created"
```

---

## Critérios de Aceite

**Purpose:** Validar os requisitos da story APÓS o workflow (não bloqueante, pode ser manual)

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Task completed as expected; side effects documented
    tipo: acceptance-criterion
    blocker: false
    story: N/A
    manual_check: false
    validação: |
      Assert task completed as expected; side effects documented
    error_message: "Acceptance criterion not met: Task completed as expected; side effects documented"
```

---

## Ferramentas (Externas/Compartilhadas)

**Purpose:** Catalogar ferramentas reutilizáveis usadas por múltiplos agentes

```yaml
**Tools:**
- task-runner:
    version: latest
    used_for: Task execution and orchestration
    shared_with: [dev, qa, po]
    cost: $0

- logger:
    version: latest
    used_for: Execution logging and error tracking
    shared_with: [dev, qa, po, sm]
    cost: $0
```

---

## Scripts (Específicos do Agente)

**Purpose:** Código específico do agente para esta task

```yaml
**Scripts:**
- execute-task.js:
    description: Generic task execution wrapper
    language: JavaScript
    location: .aiox-core/scripts/execute-task.js

- documentation-synchronizer.js:
    description: Core documentation synchronization engine
    language: JavaScript
    location: .aiox-core/scripts/documentation-synchronizer.js
```

---

## Tratamento de Erros

**Estratégia:** fallback

**Erros Comuns:**

1. **Erro:** Task Não Encontrada
   - **Causa:** A task especificada não está registrada no sistema
   - **Resolução:** Verificar o nome e o registro da task
   - **Recuperação:** Listar as tasks disponíveis, sugerir similares

2. **Erro:** Parâmetros Inválidos
   - **Causa:** Os parâmetros da task não correspondem ao schema esperado
   - **Resolução:** Validar os parâmetros em relação à definição da task
   - **Recuperação:** Fornecer um template de parâmetros, rejeitar a execução

3. **Erro:** Timeout de Execução
   - **Causa:** A task excede o tempo máximo de execução
   - **Resolução:** Otimizar a task ou aumentar o timeout
   - **Recuperação:** Encerrar a task, limpar recursos, registrar o estado

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 2-5 min (estimated)
cost_estimated: $0.001-0.003
token_usage: ~1,000-3,000 tokens
```

**Notas de Otimização:**
- Paralelizar operações independentes; reutilizar resultados de átomos; implementar saídas antecipadas

---

## Metadata

```yaml
story: STORY-6.1.7.2
version: 2.0.0
dependencies:
  - N/A
tags:
  - automation
  - workflow
updated_at: 2025-01-17
```

## Padrão de Comando
```
*sync-documentation [options]
```

## Parâmetros
- `options`: Configuração de sincronização de documentação

### Opções
- `--component <path>`: Sincronizar a documentação de um componente específico
- `--all`: Sincronizar todos os componentes registrados
- `--check`: Verificar documentação fora de sincronia sem atualizar
- `--strategies <types>`: Estratégias de sincronização separadas por vírgula (jsdoc,markdown,schema,api,examples)
- `--auto-sync`: Habilitar o monitoramento de sincronização automática
- `--report <file>`: Gerar relatório de sincronização
- `--force`: Forçar a sincronização mesmo se estiver atualizada
- `--interactive`: Modo interativo para revisar as mudanças

## Exemplos
```bash
# Verificar o status da documentação
*sync-documentation --check

# Sincronizar um componente específico
*sync-documentation --component aiox-core/scripts/pattern-learner.js

# Sincronizar todos os componentes com estratégias específicas
*sync-documentation --all --strategies jsdoc,examples

# Habilitar o monitoramento de auto-sync
*sync-documentation --auto-sync

# Gerar relatório de sincronização
*sync-documentation --report sync-report.json

# Revisão de sincronização interativa
*sync-documentation --all --interactive
```

## Implementação

```javascript
const fs = require('fs').promises;
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');

class SyncDocumentationTask {
  constructor() {
    this.taskName = 'sync-documentation';
    this.description = 'Synchronize documentation with code changes';
    this.rootPath = process.cwd();
    this.documentationSynchronizer = null;
    this.syncResults = [];
  }

  async execute(params) {
    try {
      console.log(chalk.blue('📚 AIOX Documentation Synchronization'));
      console.log(chalk.gray('Keeping documentation in sync with code\n'));

      // Parse parameters
      const config = await this.parseParameters(params);
      
      // Initialize dependencies
      await this.initializeDependencies();

      // Execute requested action
      let result;
      
      if (config.check) {
        result = await this.checkSyncStatus(config);
      } else if (config.autoSync) {
        result = await this.enableAutoSync(config);
      } else if (config.report) {
        result = await this.generateReport(config.report);
      } else if (config.component) {
        result = await this.syncComponent(config.component, config);
      } else if (config.all) {
        result = await this.syncAllComponents(config);
      } else {
        // Default: show sync status
        result = await this.showSyncStatus();
      }

      return {
        success: true,
        ...result
      };

    } catch (error) {
      console.error(chalk.red(`\n❌ Documentation sync failed: ${error.message}`));
      throw error;
    }
  }

  async parseParameters(params) {
    const config = {
      component: null,
      all: false,
      check: false,
      strategies: ['jsdoc', 'markdown', 'schema', 'api', 'examples'],
      autoSync: false,
      report: null,
      force: false,
      interactive: false
    };

    for (let i = 0; i < params.length; i++) {
      const param = params[i];

      if (param === '--all') {
        config.all = true;
      } else if (param === '--check') {
        config.check = true;
      } else if (param === '--auto-sync') {
        config.autoSync = true;
      } else if (param === '--force') {
        config.force = true;
      } else if (param === '--interactive') {
        config.interactive = true;
      } else if (param.startsWith('--component') && params[i + 1]) {
        config.component = params[++i];
      } else if (param.startsWith('--strategies') && params[i + 1]) {
        config.strategies = params[++i].split(',').map(s => s.trim());
      } else if (param.startsWith('--report') && params[i + 1]) {
        config.report = params[++i];
      }
    }

    // Validate strategies
    const validStrategies = ['jsdoc', 'markdown', 'schema', 'api', 'examples'];
    for (const strategy of config.strategies) {
      if (!validStrategies.includes(strategy)) {
        throw new Error(`Invalid sync strategy: ${strategy}`);
      }
    }

    return config;
  }

  async initializeDependencies() {
    try {
      const DocumentationSynchronizer = require('../scripts/documentation-synchronizer');
      this.documentationSynchronizer = new DocumentationSynchronizer({ 
        rootPath: this.rootPath,
        autoSync: false // We'll manage auto-sync manually
      });

      // Initialize synchronizer
      await this.documentationSynchronizer.initialize();

      // Listen to events
      this.documentationSynchronizer.on('synchronized', (data) => {
        this.syncResults.push(data);
      });

      this.documentationSynchronizer.on('error', (data) => {
        console.error(chalk.red(`Sync error: ${data.error.message}`));
      });

    } catch (error) {
      throw new Error(`Failed to initialize dependencies: ${error.message}`);
    }
  }

  async checkSyncStatus(config) {
    console.log(chalk.blue('🔍 Checking documentation sync status...\n'));

    const components = this.documentationSynchronizer.syncedComponents;
    const outOfSync = [];
    const upToDate = [];

    for (const [componentPath, component] of components) {
      try {
        const stats = await fs.stat(componentPath);
        const lastModified = stats.mtime.toISOString();
        
        if (!component.lastSync || lastModified > component.lastSync) {
          outOfSync.push({
            component: componentPath,
            doc: component.docPath,
            lastModified,
            lastSync: component.lastSync
          });
        } else {
          upToDate.push({
            component: componentPath,
            doc: component.docPath
          });
        }
      } catch (error) {
        console.warn(chalk.yellow(`Cannot check: ${componentPath}`));
      }
    }

    // Display results
    if (outOfSync.length > 0) {
      console.log(chalk.yellow(`📋 Out of sync (${outOfSync.length}):\n`));
      
      for (const item of outOfSync) {
        console.log(chalk.red('  ⚠️ ') + path.relative(this.rootPath, item.component));
        console.log(chalk.gray(`     Doc: ${path.relative(this.rootPath, item.doc)}`));
        console.log(chalk.gray(`     Last modified: ${this.formatDate(item.lastModified)}`));
        if (item.lastSync) {
          console.log(chalk.gray(`     Last sync: ${this.formatDate(item.lastSync)}`));
        } else {
          console.log(chalk.gray(`     Last sync: Never`));
        }
        console.log('');
      }
    }

    if (upToDate.length > 0) {
      console.log(chalk.green(`✅ Up to date (${upToDate.length}):\n`));
      
      const shown = Math.min(5, upToDate.length);
      for (let i = 0; i < shown; i++) {
        const item = upToDate[i];
        console.log(chalk.green('  ✓ ') + path.relative(this.rootPath, item.component));
      }
      
      if (upToDate.length > shown) {
        console.log(chalk.gray(`  ... and ${upToDate.length - shown} more`));
      }
    }

    console.log(chalk.blue('\n📊 Summary:'));
    console.log(`  Total components: ${components.size}`);
    console.log(`  Out of sync: ${chalk.yellow(outOfSync.length)}`);
    console.log(`  Up to date: ${chalk.green(upToDate.length)}`);

    if (outOfSync.length > 0) {
      console.log(chalk.yellow('\n💡 Run with --all to sync all out-of-date documentation'));
    }

    return {
      totalComponents: components.size,
      outOfSync: outOfSync.length,
      upToDate: upToDate.length
    };
  }

  async syncComponent(componentPath, config) {
    const fullPath = path.resolve(this.rootPath, componentPath);
    
    console.log(chalk.blue(`🔄 Syncing documentation for: ${componentPath}\n`));

    try {
      const changes = await this.documentationSynchronizer.synchronizeComponent(fullPath, {
        strategies: config.strategies,
        force: config.force
      });

      if (changes.length === 0) {
        console.log(chalk.green('✅ Documentation is already up to date'));
        return { synced: 0 };
      }

      // Display changes
      await this.displaySyncChanges(changes, config);

      return {
        synced: 1,
        changes: changes.length
      };

    } catch (error) {
      console.error(chalk.red(`Failed to sync: ${error.message}`));
      return { synced: 0, error: error.message };
    }
  }

  async syncAllComponents(config) {
    const components = Array.from(this.documentationSynchronizer.syncedComponents.entries());
    
    console.log(chalk.blue(`🔄 Syncing ${components.length} components...\n`));

    const results = {
      synced: 0,
      skipped: 0,
      failed: 0,
      totalChanges: 0
    };

    for (const [componentPath, component] of components) {
      try {
        // Check if needs sync
        if (!config.force) {
          const stats = await fs.stat(componentPath);
          const lastModified = stats.mtime.toISOString();
          
          if (component.lastSync && lastModified <= component.lastSync) {
            results.skipped++;
            continue;
          }
        }

        console.log(chalk.gray(`\nSyncing: ${path.relative(this.rootPath, componentPath)}`));
        
        const changes = await this.documentationSynchronizer.synchronizeComponent(componentPath, {
          strategies: config.strategies
        });

        if (changes.length > 0) {
          results.synced++;
          results.totalChanges += changes.length;
          
          if (config.interactive) {
            await this.displaySyncChanges(changes, config);
          } else {
            console.log(chalk.green(`  ✅ Applied ${changes.length} changes`));
          }
        } else {
          results.skipped++;
        }

      } catch (error) {
        results.failed++;
        console.error(chalk.red(`  ❌ Failed: ${error.message}`));
      }
    }

    // Display summary
    console.log(chalk.blue('\n📊 Synchronization Summary:'));
    console.log(chalk.green(`  ✅ Synced: ${results.synced}`));
    console.log(chalk.gray(`  ⏭️  Skipped: ${results.skipped}`));
    if (results.failed > 0) {
      console.log(chalk.red(`  ❌ Failed: ${results.failed}`));
    }
    console.log(`  Total changes: ${results.totalChanges}`);

    return results;
  }

  async displaySyncChanges(changes, config) {
    console.log(chalk.blue('📝 Changes applied:\n'));

    for (const strategyChanges of changes) {
      if (!strategyChanges.success) {
        console.log(chalk.red(`❌ ${strategyChanges.strategy}: ${strategyChanges.error}`));
        continue;
      }

      console.log(chalk.yellow(`${strategyChanges.strategy}:`));
      
      for (const change of strategyChanges.changes) {
        console.log(`  - ${change.description}`);
        
        if (config.interactive && change.type === 'updated') {
          // Show diff preview
          console.log(chalk.gray('    Preview of changes...'));
        }
      }
    }
  }

  async enableAutoSync(config) {
    console.log(chalk.blue('🔄 Enabling automatic documentation sync...\n'));

    // Configure auto-sync
    this.documentationSynchronizer.options.autoSync = true;
    this.documentationSynchronizer.options.syncInterval = 60000; // 1 minute
    
    // Start auto-sync
    await this.documentationSynchronizer.startAutoSync();

    console.log(chalk.green('✅ Auto-sync enabled'));
    console.log(chalk.gray('Documentation will be checked every minute for changes'));
    console.log(chalk.gray('Press Ctrl+C to stop auto-sync'));

    // Set up monitoring
    this.documentationSynchronizer.on('auto-sync', (data) => {
      if (data.changes.length > 0) {
        console.log(chalk.blue(`\n[${this.formatTime(new Date())}] Auto-sync detected changes:`));
        
        for (const change of data.changes) {
          console.log(`  - ${path.relative(this.rootPath, change.componentPath)}`);
        }
      }
    });

    // Keep process running
    await new Promise((resolve) => {
      process.on('SIGINT', () => {
        console.log(chalk.yellow('\n\nStopping auto-sync...'));
        this.documentationSynchronizer.stopAutoSync();
        resolve();
      });
    });

    return {
      autoSyncEnabled: true
    };
  }

  async generateReport(reportPath) {
    console.log(chalk.blue('📊 Generating synchronization report...\n'));

    const report = await this.documentationSynchronizer.generateSyncReport();
    
    // Add sync results
    report.syncResults = this.syncResults;
    
    // Save report
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
    
    console.log(chalk.green(`✅ Report generated: ${reportPath}`));
    
    // Display summary
    console.log(chalk.blue('\n📋 Report Summary:'));
    console.log(`  Total components: ${report.summary.totalComponents}`);
    console.log(`  Total documentation: ${report.summary.totalDocumentation}`);
    console.log(`  Sync history entries: ${report.summary.syncHistory}`);
    
    if (report.summary.lastSync) {
      console.log(`  Last sync: ${this.formatDate(report.summary.lastSync)}`);
    }

    return {
      reportGenerated: true,
      reportPath
    };
  }

  async showSyncStatus() {
    const components = this.documentationSynchronizer.syncedComponents;
    const docs = this.documentationSynchronizer.documentationIndex;

    console.log(chalk.blue('📚 Documentation Sync Status\n'));

    console.log(chalk.gray('Registered components:'));
    console.log(`  Components with docs: ${components.size}`);
    console.log(`  Documentation files: ${docs.size}`);
    
    // Show sync strategies
    console.log(chalk.gray('\nActive sync strategies:'));
    for (const [name, strategy] of this.documentationSynchronizer.syncStrategies) {
      console.log(`  - ${name}: ${strategy.description}`);
    }

    // Recent sync history
    const history = this.documentationSynchronizer.syncHistory.slice(-5);
    if (history.length > 0) {
      console.log(chalk.gray('\nRecent synchronizations:'));
      for (const entry of history) {
        console.log(`  ${this.formatDate(entry.timestamp)} - ${path.basename(entry.componentPath)}`);
      }
    }

    console.log(chalk.blue('\n📌 Commands:'));
    console.log('  Check status: *sync-documentation --check');
    console.log('  Sync all: *sync-documentation --all');
    console.log('  Enable auto-sync: *sync-documentation --auto-sync');
    console.log('  Generate report: *sync-documentation --report <file>');

    return {
      status: 'ready',
      components: components.size,
      documentation: docs.size
    };
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    
    // Less than 1 hour
    if (diff < 3600000) {
      const minutes = Math.floor(diff / 60000);
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    }
    
    // Less than 24 hours
    if (diff < 86400000) {
      const hours = Math.floor(diff / 3600000);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    }
    
    // Less than 7 days
    if (diff < 604800000) {
      const days = Math.floor(diff / 86400000);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
    
    // Otherwise show date
    return date.toLocaleDateString();
  }

  formatTime(date) {
    return date.toLocaleTimeString();
  }
}

module.exports = SyncDocumentationTask;
```

## Pontos de Integração

### Sincronizador de Documentação
- Motor de sincronização central
- Suporte a sincronização multi-estratégia
- Detecção automática de mudanças
- Monitoramento em tempo real

### Estratégias de Sincronização
- **JSDoc**: Sincronizar comentários de código com markdown
- **Markdown**: Atualizar seções de documentação
- **Schema**: Sincronizar schemas YAML/JSON
- **API**: Atualizar documentação de API
- **Examples**: Validar e atualizar exemplos de código

### Fontes de Documentação
- Arquivos Markdown (.md)
- Manifestos YAML (.yaml, .yml)
- Schemas JSON (.json)
- Arquivos README
- Documentação inline

### Fontes de Código
- Arquivos JavaScript (.js, .jsx)
- Arquivos TypeScript (.ts, .tsx)
- Definições de task
- Manifestos de agente
- Configurações de workflow

## Workflow de Sincronização

### Fase de Detecção
1. Monitorar mudanças de arquivo
2. Identificar a documentação vinculada
3. Detectar diferenças de conteúdo
4. Calcular os requisitos de sincronização
5. Priorizar as atualizações

### Fase de Análise
1. Fazer parse das mudanças de código
2. Extrair os elementos de documentação
3. Comparar com a documentação existente
4. Identificar lacunas e conflitos
5. Gerar o plano de sincronização

### Fase de Atualização
1. Aplicar as estratégias de sincronização
2. Atualizar os arquivos de documentação
3. Preservar a formatação
4. Validar as mudanças
5. Registrar o histórico de sincronização

## Boas Práticas

### Estrutura da Documentação
- Manter a documentação próxima ao código
- Usar nomenclatura consistente
- Vincular explicitamente na documentação
- Manter seções claras
- Atualizar os exemplos regularmente

### Configuração de Sincronização
- Escolher estratégias apropriadas
- Definir intervalos razoáveis
- Revisar as mudanças regularmente
- Monitorar o histórico de sincronização
- Tratar conflitos de forma graciosa

### Garantia de Qualidade
- Validar após a sincronização
- Testar os exemplos de código
- Verificar a precisão da API
- Verificar o alinhamento do schema
- Manter o histórico de versões

## Considerações de Segurança
- Validar os caminhos de arquivo
- Prevenir injeção na documentação
- Proteger informações sensíveis
- Auditar as operações de sincronização
- Controlar as permissões de escrita 