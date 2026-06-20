---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com logging
- Interação mínima com o usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pre-Flight - Planejamento Antecipado Abrangente
- Fase de análise da task (identificar todas as ambiguidades)
- Execução com zero ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: proposeModification()
responsável: Atlas (Decoder)
responsavel_type: Agente
atomic_layer: Molecule

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
    error_message: "Pré-condição falhou: a task está registrada; os parâmetros obrigatórios foram fornecidos; as dependências foram atendidas"
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
    error_message: "Pós-condição falhou: a task foi concluída; código de saída 0; as saídas esperadas foram criadas"
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
    error_message: "Critério de aceite não atendido: a task foi concluída conforme esperado; os efeitos colaterais foram documentados"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Tool:** task-runner
  - **Propósito:** Execução e orquestração de tasks
  - **Source:** .aiox-core/core/task-runner.js

- **Tool:** logger
  - **Propósito:** Logging de execução e rastreamento de erros
  - **Source:** .aiox-core/utils/logger.js

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** execute-task.js
  - **Propósito:** Wrapper genérico de execução de task
  - **Language:** JavaScript
  - **Location:** .aiox-core/scripts/execute-task.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Task Não Encontrada
   - **Causa:** A task especificada não está registrada no sistema
   - **Resolução:** Verificar o nome e o registro da task
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
duration_expected: 2-5 min (estimated)
cost_estimated: $0.001-0.003
token_usage: ~1,000-3,000 tokens
```

**Notas de Otimização:**
- Paralelize operações independentes; reutilize resultados de átomos; implemente saídas antecipadas

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

checklists:
  - change-checklist.md
---

# Propose Modification - AIOX Developer Task

## Propósito
Criar e enviar propostas de modificação para revisão e aprovação colaborativa dentro do framework Synkra AIOX.

## Padrão de Comando
```
*propose-modification <component-path> <modification-type> [options]
```

## Parâmetros
- `component-path`: Caminho para o componente a ser modificado
- `modification-type`: Tipo de modificação (modify, refactor, deprecate, enhance)
- `options`: Configuração adicional da proposta

### Opções
- `--title <title>`: Título da proposta
- `--description <desc>`: Descrição detalhada das mudanças
- `--priority <level>`: Nível de prioridade (low, medium, high, critical)
- `--tags <tags>`: Tags separadas por vírgula para categorização
- `--assignees <users>`: Lista separada por vírgula de revisores
- `--draft`: Criar como proposta de rascunho
- `--link-issues <ids>`: Vincular issues ou tasks relacionadas
- `--impact-analysis`: Incluir relatório de análise de impacto
- `--test-results`: Anexar resultados de testes

## Exemplos
```bash
# Propose agent enhancement
*propose-modification aiox-core/agents/weather-agent.md enhance --title "Add caching support" --description "Implement response caching to reduce API calls" --priority medium

# Propose critical refactoring with impact analysis
*propose-modification aiox-core/scripts/core-utility.js refactor --title "Optimize performance" --priority critical --impact-analysis --assignees "alice,bob"

# Create draft proposal for workflow deprecation
*propose-modification aiox-core/workflows/legacy-workflow.yaml deprecate --draft --title "Deprecate legacy workflow" --link-issues "123,456"
```

## Implementação

```javascript
const fs = require('fs').promises;
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');

class ProposeModificationTask {
  constructor() {
    this.taskName = 'propose-modification';
    this.description = 'Create modification proposals for collaborative review';
    this.rootPath = process.cwd();
    this.proposalSystem = null;
    this.impactAnalyzer = null;
    this.notificationService = null;
  }

  async execute(params) {
    try {
      console.log(chalk.blue('📝 AIOX Modification Proposal'));
      console.log(chalk.gray('Creating collaborative modification proposal\n'));

      // Parse and validate parameters
      const config = await this.parseParameters(params);
      
      // Initialize dependencies
      await this.initializeDependencies();

      // Validate target component
      const component = await this.validateComponent(config.componentPath);

      // Create proposal
      console.log(chalk.gray('Creating modification proposal...'));
      const proposal = await this.createProposal(component, config);

      // Run impact analysis if requested
      if (config.includeImpactAnalysis) {
        console.log(chalk.gray('Running impact analysis...'));
        proposal.impactAnalysis = await this.runImpactAnalysis(component, config);
      }

      // Attach test results if provided
      if (config.testResults) {
        console.log(chalk.gray('Attaching test results...'));
        proposal.testResults = await this.attachTestResults(config.testResults);
      }

      // Get proposal details from user
      const details = await this.getProposalDetails(proposal, config);
      Object.assign(proposal, details);

      // Submit proposal
      console.log(chalk.gray('Submitting proposal...'));
      const result = await this.submitProposal(proposal, config);

      // Notify assignees
      if (config.assignees.length > 0) {
        await this.notifyAssignees(result, config.assignees);
      }

      // Display success
      console.log(chalk.green('\n✅ Modification proposal created successfully'));
      console.log(chalk.gray(`   Proposal ID: ${result.proposalId}`));
      console.log(chalk.gray(`   Status: ${result.status}`));
      console.log(chalk.gray(`   Reviewers: ${config.assignees.join(', ') || 'None assigned'}`));
      
      if (result.webUrl) {
        console.log(chalk.blue(`   View proposal: ${result.webUrl}`));
      }

      return {
        success: true,
        proposalId: result.proposalId,
        status: result.status,
        component: component.path,
        modificationType: config.modificationType,
        priority: config.priority,
        assignees: config.assignees
      };

    } catch (error) {
      console.error(chalk.red(`\n❌ Proposal creation failed: ${error.message}`));
      throw error;
    }
  }

  async parseParameters(params) {
    if (params.length < 2) {
      throw new Error('Usage: *propose-modification <component-path> <modification-type> [options]');
    }

    const config = {
      componentPath: params[0],
      modificationType: params[1],
      title: '',
      description: '',
      priority: 'medium',
      tags: [],
      assignees: [],
      isDraft: false,
      linkedIssues: [],
      includeImpactAnalysis: false,
      testResults: null
    };

    // Validate modification type
    const validTypes = ['modify', 'refactor', 'deprecate', 'enhance'];
    if (!validTypes.includes(config.modificationType)) {
      throw new Error(`Invalid modification type: ${config.modificationType}. Must be one of: ${validTypes.join(', ')}`);
    }

    // Parse options
    for (let i = 2; i < params.length; i++) {
      const param = params[i];
      
      if (param === '--draft') {
        config.isDraft = true;
      } else if (param === '--impact-analysis') {
        config.includeImpactAnalysis = true;
      } else if (param.startsWith('--title') && params[i + 1]) {
        config.title = params[++i];
      } else if (param.startsWith('--description') && params[i + 1]) {
        config.description = params[++i];
      } else if (param.startsWith('--priority') && params[i + 1]) {
        config.priority = params[++i];
      } else if (param.startsWith('--tags') && params[i + 1]) {
        config.tags = params[++i].split(',').map(t => t.trim());
      } else if (param.startsWith('--assignees') && params[i + 1]) {
        config.assignees = params[++i].split(',').map(a => a.trim());
      } else if (param.startsWith('--link-issues') && params[i + 1]) {
        config.linkedIssues = params[++i].split(',').map(id => id.trim());
      } else if (param.startsWith('--test-results') && params[i + 1]) {
        config.testResults = params[++i];
      }
    }

    // Validate priority
    const validPriorities = ['low', 'medium', 'high', 'critical'];
    if (!validPriorities.includes(config.priority)) {
      throw new Error(`Invalid priority: ${config.priority}. Must be one of: ${validPriorities.join(', ')}`);
    }

    return config;
  }

  async initializeDependencies() {
    try {
      const ProposalSystem = require('../scripts/proposal-system');
      this.proposalSystem = new ProposalSystem({ rootPath: this.rootPath });

      const ImpactAnalyzer = require('../scripts/dependency-impact-analyzer');
      this.impactAnalyzer = new ImpactAnalyzer({ rootPath: this.rootPath });

      const NotificationService = require('../scripts/notification-service');
      this.notificationService = new NotificationService({ rootPath: this.rootPath });

    } catch (error) {
      throw new Error(`Failed to initialize dependencies: ${error.message}`);
    }
  }

  async validateComponent(componentPath) {
    const fullPath = path.resolve(this.rootPath, componentPath);
    
    try {
      const stats = await fs.stat(fullPath);
      if (!stats.isFile()) {
        throw new Error(`Not a file: ${componentPath}`);
      }

      const content = await fs.readFile(fullPath, 'utf-8');
      const componentType = this.determineComponentType(fullPath, content);

      return {
        path: componentPath,
        fullPath: fullPath,
        type: componentType,
        content: content,
        lastModified: stats.mtime
      };

    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new Error(`Component not found: ${componentPath}`);
      }
      throw error;
    }
  }

  async createProposal(component, config) {
    const proposal = {
      proposalId: `proposal-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      componentPath: component.path,
      componentType: component.type,
      modificationType: config.modificationType,
      title: config.title || `${config.modificationType} ${component.path}`,
      description: config.description,
      priority: config.priority,
      status: config.isDraft ? 'draft' : 'pending_review',
      tags: config.tags,
      assignees: config.assignees,
      linkedIssues: config.linkedIssues,
      metadata: {
        createdBy: process.env.USER || 'aiox-developer',
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString(),
        version: 1
      }
    };

    // Add modification type specific fields
    switch (config.modificationType) {
      case 'deprecate':
        proposal.deprecationInfo = {
          targetRemovalDate: null,
          migrationPath: null,
          affectedComponents: []
        };
        break;
      case 'enhance':
        proposal.enhancementInfo = {
          newCapabilities: [],
          performanceImpact: null,
          backwardCompatible: true
        };
        break;
      case 'refactor':
        proposal.refactorInfo = {
          scope: 'component', // component, module, system
          breakingChanges: false,
          codeQualityMetrics: {}
        };
        break;
    }

    return proposal;
  }

  async runImpactAnalysis(component, config) {
    try {
      const impact = await this.impactAnalyzer.analyzeDependencyImpact(component, {
        modificationType: config.modificationType,
        depth: 'deep'
      });

      return {
        affectedComponents: impact.affectedComponents.length,
        criticalDependencies: impact.impactCategories?.critical || [],
        riskLevel: this.calculateRiskLevel(impact),
        summary: this.generateImpactSummary(impact)
      };

    } catch (error) {
      console.warn(chalk.yellow(`Impact analysis failed: ${error.message}`));
      return null;
    }
  }

  async attachTestResults(testResultsPath) {
    try {
      const content = await fs.readFile(testResultsPath, 'utf-8');
      return {
        source: testResultsPath,
        content: content,
        attachedAt: new Date().toISOString()
      };
    } catch (error) {
      console.warn(chalk.yellow(`Failed to attach test results: ${error.message}`));
      return null;
    }
  }

  async getProposalDetails(proposal, config) {
    const questions = [];

    // Title if not provided
    if (!config.title) {
      questions.push({
        type: 'input',
        name: 'title',
        message: 'Proposal title:',
        default: proposal.title,
        validate: input => input.length > 0 || 'Title is required'
      });
    }

    // Description if not provided
    if (!config.description) {
      questions.push({
        type: 'editor',
        name: 'description',
        message: 'Detailed description (opens editor):',
        default: this.getDescriptionTemplate(config.modificationType)
      });
    }

    // Modification-specific questions
    if (config.modificationType === 'deprecate') {
      questions.push({
        type: 'input',
        name: 'targetRemovalDate',
        message: 'Target removal date (YYYY-MM-DD):',
        validate: input => {
          if (!input) return true;
          return /^\d{4}-\d{2}-\d{2}$/.test(input) || 'Invalid date format';
        }
      });
    }

    if (config.modificationType === 'enhance') {
      questions.push({
        type: 'checkbox',
        name: 'newCapabilities',
        message: 'Select new capabilities:',
        choices: [
          'Performance optimization',
          'New API endpoints',
          'Additional configuration options',
          'Extended error handling',
          'Improved logging',
          'New integrations',
          'Other'
        ]
      });
    }

    if (config.modificationType === 'refactor') {
      questions.push({
        type: 'confirm',
        name: 'breakingChanges',
        message: 'Will this refactoring introduce breaking changes?',
        default: false
      });
    }

    // Review timeline
    questions.push({
      type: 'list',
      name: 'reviewTimeline',
      message: 'Expected review timeline:',
      choices: [
        { name: 'Urgent (1-2 days)', value: 'urgent' },
        { name: 'Normal (3-5 days)', value: 'normal' },
        { name: 'Low priority (1 week+)', value: 'low' }
      ],
      default: 'normal'
    });

    const answers = await inquirer.prompt(questions);

    // Process answers
    const details = {
      title: answers.title || config.title,
      description: answers.description || config.description,
      reviewTimeline: answers.reviewTimeline
    };

    // Add modification-specific details
    if (config.modificationType === 'deprecate' && answers.targetRemovalDate) {
      details.deprecationInfo = {
        targetRemovalDate: answers.targetRemovalDate
      };
    }

    if (config.modificationType === 'enhance' && answers.newCapabilities) {
      details.enhancementInfo = {
        newCapabilities: answers.newCapabilities
      };
    }

    if (config.modificationType === 'refactor') {
      details.refactorInfo = {
        breakingChanges: answers.breakingChanges
      };
    }

    return details;
  }

  async submitProposal(proposal, config) {
    try {
      // Submit through proposal system
      const result = await this.proposalSystem.submitProposal(proposal);

      // Store in memory/database
      await this.storeProposal(proposal, result);

      return {
        proposalId: proposal.proposalId,
        status: proposal.status,
        webUrl: this.generateProposalUrl(proposal.proposalId),
        createdAt: proposal.metadata.createdAt
      };

    } catch (error) {
      throw new Error(`Failed to submit proposal: ${error.message}`);
    }
  }

  async storeProposal(proposal, result) {
    const proposalsDir = path.join(this.rootPath, '.aiox', 'proposals');
    await fs.mkdir(proposalsDir, { recursive: true });

    const proposalFile = path.join(proposalsDir, `${proposal.proposalId}.json`);
    await fs.writeFile(proposalFile, JSON.stringify(proposal, null, 2));

    // Update proposals index
    const indexFile = path.join(proposalsDir, 'index.json');
    let index = { proposals: [] };
    
    try {
      const existing = await fs.readFile(indexFile, 'utf-8');
      index = JSON.parse(existing);
    } catch (error) {
      // Index doesn't exist yet
    }

    index.proposals.push({
      proposalId: proposal.proposalId,
      title: proposal.title,
      componentPath: proposal.componentPath,
      modificationType: proposal.modificationType,
      status: proposal.status,
      priority: proposal.priority,
      createdAt: proposal.metadata.createdAt,
      createdBy: proposal.metadata.createdBy
    });

    await fs.writeFile(indexFile, JSON.stringify(index, null, 2));
  }

  async notifyAssignees(result, assignees) {
    try {
      await this.notificationService.notifyUsers(assignees, {
        type: 'proposal_assigned',
        proposalId: result.proposalId,
        title: result.title,
        priority: result.priority,
        url: result.webUrl
      });

      console.log(chalk.gray(`   Notifications sent to: ${assignees.join(', ')}`));

    } catch (error) {
      console.warn(chalk.yellow(`Failed to send notifications: ${error.message}`));
    }
  }

  // Helper methods

  determineComponentType(filePath, content) {
    if (filePath.includes('/agents/')) return 'agent';
    if (filePath.includes('/tasks/')) return 'task';
    if (filePath.includes('/workflows/')) return 'workflow';
    if (filePath.includes('/utils/')) return 'util';
    return 'unknown';
  }

  calculateRiskLevel(impact) {
    const affectedCount = impact.affectedComponents.length;
    const criticalCount = impact.impactCategories?.critical?.length || 0;

    if (criticalCount > 0 || affectedCount > 20) return 'high';
    if (affectedCount > 10) return 'medium';
    return 'low';
  }

  generateImpactSummary(impact) {
    return {
      totalAffected: impact.affectedComponents.length,
      byCategory: {
        critical: impact.impactCategories?.critical?.length || 0,
        high: impact.impactCategories?.high?.length || 0,
        medium: impact.impactCategories?.medium?.length || 0,
        low: impact.impactCategories?.low?.length || 0
      }
    };
  }

  getDescriptionTemplate(modificationType) {
    const templates = {
      enhance: `## Enhancement Description

### Objective
[Describe what this enhancement aims to achieve]

### Implementation Details
[Explain how the enhancement will be implemented]

### Benefits
- [List expected benefits]

### Testing Plan
[Describe how the enhancement will be tested]`,

      refactor: `## Refactoring Description

### Current Issues
[Describe problems with current implementation]

### Proposed Changes
[Detail the refactoring approach]

### Expected Improvements
- [List expected improvements]

### Risk Assessment
[Identify potential risks]`,

      deprecate: `## Deprecation Description

### Reason for Deprecation
[Explain why this component should be deprecated]

### Migration Path
[Describe how users should migrate]

### Timeline
[Specify deprecation timeline]

### Affected Users
[Identify who will be affected]`,

      modify: `## Modification Description

### Changes Overview
[Summarize the modifications]

### Rationale
[Explain why these changes are needed]

### Implementation
[Detail how changes will be implemented]

### Validation
[Describe validation approach]`
    };

    return templates[modificationType] || templates.modify;
  }

  generateProposalUrl(proposalId) {
    // In a real implementation, this would generate actual web URLs
    return `http://aiox-framework.local/proposals/${proposalId}`;
  }
}

module.exports = ProposeModificationTask;
```

## Regras de Validação

### Validação de Entrada
- O caminho do componente deve existir e ser acessível
- O tipo de modificação deve ser válido
- A prioridade deve ser um nível reconhecido
- Os assignees devem ser identificadores de usuário válidos
- As issues vinculadas devem ser IDs de issue válidos

### Requisitos da Proposta
- Título e descrição são obrigatórios (solicitados se não fornecidos)
- Propostas de rascunho podem estar incompletas
- Propostas que não são de rascunho devem ter informações completas
- A análise de impacto é recomendada para mudanças de alta prioridade

### Processo de Revisão
- As propostas começam no status 'draft' ou 'pending_review'
- Os assignees são notificados no envio
- As expectativas de prazo de revisão são definidas
- O tipo de modificação determina os campos obrigatórios

## Pontos de Integração

### Proposal System
- Gerencia o ciclo de vida e o armazenamento da proposta
- Trata o versionamento e o rastreamento de histórico
- Coordena os workflows de revisão
- Integra-se com o sistema de notificação

### Análise de Impacto
- Opcional, mas recomendada para mudanças significativas
- Fornece avaliação de risco para os revisores
- Identifica os componentes afetados
- Ajuda a priorizar os esforços de revisão

### Notification Service
- Notifica os revisores atribuídos
- Envia atualizações sobre mudanças de status da proposta
- Suporta múltiplos canais de notificação
- Rastreia a entrega das notificações

## Considerações de Segurança
- Validar todas as entradas do usuário para prevenir injeção
- Garantir o controle de acesso adequado para as propostas
- Sanitizar caminhos de arquivo e conteúdo
- Registrar todas as atividades de proposta para auditoria
- Proteger informações sensíveis de componentes
