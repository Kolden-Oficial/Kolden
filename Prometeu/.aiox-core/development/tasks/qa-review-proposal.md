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

## Definição da Tarefa (AIOX Task Format V1.0)

```yaml
task: qaReviewProposal()
responsável: Quinn (Guardian)
responsavel_type: Agente
atomic_layer: Strategy

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

**Propósito:** Validar pré-requisitos ANTES da execução da tarefa (bloqueante)

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

**Propósito:** Validar o sucesso da execução APÓS a conclusão da tarefa

**Checklist:**

```yaml
post-conditions:
  - [ ] Validation executed; results accurate; report generated
    tipo: post-condition
    blocker: true
    validação: |
      Verify validation executed; results accurate; report generated
    error_message: "Pós-condição falhou: Validação executada; resultados precisos; report gerado"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de aprovação/reprovação para a conclusão da tarefa

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
  - **Propósito:** Validação baseada em regras e relatórios
  - **Source:** .aiox-core/utils/validation-engine.js

- **Tool:** schema-validator
  - **Propósito:** Validação de schema JSON/YAML
  - **Source:** ajv ou similar

---

## Scripts

**Código específico do agente para esta tarefa:**

- **Script:** run-validation.js
  - **Propósito:** Executar regras de validação e gerar report
  - **Language:** JavaScript
  - **Location:** .aiox-core/scripts/run-validation.js

---

## Tratamento de Erros

**Strategy:** retry

**Erros Comuns:**

1. **Error:** Critérios de Validação Ausentes
   - **Cause:** Regras de validação obrigatórias não definidas
   - **Resolution:** Garantir que os critérios de validação sejam carregados a partir da config
   - **Recovery:** Usar regras de validação padrão, registrar aviso

2. **Error:** Schema Inválido
   - **Cause:** O target não corresponde ao schema esperado
   - **Resolution:** Atualizar o schema ou corrigir a estrutura do target
   - **Recovery:** Report detalhado de erro de validação

3. **Error:** Dependência Ausente
   - **Cause:** Dependência obrigatória para a validação não encontrada
   - **Resolution:** Instalar as dependências ausentes
   - **Recovery:** Abortar com uma lista clara de dependências

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 5-20 min (estimated)
cost_estimated: $0.003-0.015
token_usage: ~2,000-8,000 tokens
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
  - quality-assurance
  - testing
updated_at: 2025-11-17
```

---

checklists:
  - change-checklist.md
---

# Review Proposal - AIOX Developer Task

## Propósito
Revisar e fornecer feedback sobre propostas de modificação submetidas através do sistema colaborativo de modificações.

## Padrão de Comando
```
*review-proposal <proposal-id> [options]
```

## Parâmetros
- `proposal-id`: ID da proposal a ser revisada
- `options`: Configuração da revisão

### Opções
- `--action <action>`: Ação de revisão (approve, reject, request-changes, comment)
- `--comment <text>`: Comentário ou feedback da revisão
- `--conditions <text>`: Condições para aprovação
- `--suggestions <file>`: Arquivo contendo as mudanças sugeridas
- `--priority <level>`: Atualizar a prioridade da proposal
- `--assignees <users>`: Adicionar/alterar responsáveis
- `--fast-review`: Pular a análise detalhada

## Exemplos
```bash
# Approve proposal with conditions
*review-proposal proposal-1234567-abc123 --action approve --comment "Looks good with minor changes" --conditions "Add comprehensive tests before merging"

# Request changes with suggestions
*review-proposal proposal-1234567-def456 --action request-changes --comment "Need security improvements" --suggestions security-review.md

# Add comment without decision
*review-proposal proposal-1234567-ghi789 --action comment --comment "Please clarify the impact on API consumers"
```

## Implementação

```javascript
const fs = require('fs').promises;
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');

class ReviewProposalTask {
  constructor() {
    this.taskName = 'review-proposal';
    this.description = 'Review modification proposals';
    this.rootPath = process.cwd();
    this.proposalSystem = null;
    this.impactAnalyzer = null;
    this.notificationService = null;
    this.diffGenerator = null;
  }

  async execute(params) {
    try {
      console.log(chalk.blue('📋 AIOX Proposal Review'));
      console.log(chalk.gray('Reviewing modification proposal\n'));

      // Parse and validate parameters
      const config = await this.parseParameters(params);
      
      // Initialize dependencies
      await this.initializeDependencies();

      // Load proposal
      console.log(chalk.gray('Loading proposal...'));
      const proposal = await this.loadProposal(config.proposalId);

      // Display proposal summary
      await this.displayProposalSummary(proposal);

      // Perform review analysis if not fast review
      let reviewAnalysis = null;
      if (!config.fastReview) {
        console.log(chalk.gray('Analyzing proposal impact...'));
        reviewAnalysis = await this.analyzeProposal(proposal);
        await this.displayReviewAnalysis(reviewAnalysis);
      }

      // Get review details
      const reviewDetails = await this.getReviewDetails(proposal, reviewAnalysis, config);

      // Process review
      console.log(chalk.gray('Processing review...'));
      const result = await this.processReview(proposal, reviewDetails, config);

      // Update proposal status
      await this.updateProposalStatus(proposal, result);

      // Notify relevant parties
      await this.notifyReviewComplete(proposal, result);

      // Display success
      console.log(chalk.green('\n✅ Review submitted successfully'));
      console.log(chalk.gray(`   Proposal: ${proposal.proposalId}`));
      console.log(chalk.gray(`   Action: ${result.action}`));
      console.log(chalk.gray(`   Reviewer: ${result.reviewer}`));
      
      if (result.nextSteps) {
        console.log(chalk.blue('\n📌 Next Steps:'));
        result.nextSteps.forEach((step, index) => {
          console.log(chalk.gray(`   ${index + 1}. ${step}`));
        });
      }

      return {
        success: true,
        proposalId: proposal.proposalId,
        reviewAction: result.action,
        reviewStatus: result.status,
        reviewer: result.reviewer,
        timestamp: result.timestamp
      };

    } catch (error) {
      console.error(chalk.red(`\n❌ Review failed: ${error.message}`));
      throw error;
    }
  }

  async parseParameters(params) {
    if (params.length < 1) {
      throw new Error('Usage: *review-proposal <proposal-id> [options]');
    }

    const config = {
      proposalId: params[0],
      action: null,
      comment: '',
      conditions: '',
      suggestions: null,
      priority: null,
      assignees: [],
      fastReview: false
    };

    // Parse options
    for (let i = 1; i < params.length; i++) {
      const param = params[i];
      
      if (param === '--fast-review') {
        config.fastReview = true;
      } else if (param.startsWith('--action') && params[i + 1]) {
        config.action = params[++i];
      } else if (param.startsWith('--comment') && params[i + 1]) {
        config.comment = params[++i];
      } else if (param.startsWith('--conditions') && params[i + 1]) {
        config.conditions = params[++i];
      } else if (param.startsWith('--suggestions') && params[i + 1]) {
        config.suggestions = params[++i];
      } else if (param.startsWith('--priority') && params[i + 1]) {
        config.priority = params[++i];
      } else if (param.startsWith('--assignees') && params[i + 1]) {
        config.assignees = params[++i].split(',').map(a => a.trim());
      }
    }

    // Validate action if provided
    if (config.action) {
      const validActions = ['approve', 'reject', 'request-changes', 'comment'];
      if (!validActions.includes(config.action)) {
        throw new Error(`Invalid action: ${config.action}. Must be one of: ${validActions.join(', ')}`);
      }
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

      // const DiffGenerator = require('../scripts/diff-generator'); // Archived in archived-utilities/ (Story 3.1.2)
      // this.diffGenerator = new DiffGenerator({ rootPath: this.rootPath });

    } catch (error) {
      throw new Error(`Failed to initialize dependencies: ${error.message}`);
    }
  }

  async loadProposal(proposalId) {
    try {
      const proposalFile = path.join(this.rootPath, '.aiox', 'proposals', `${proposalId}.json`);
      const content = await fs.readFile(proposalFile, 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new Error(`Proposal not found: ${proposalId}`);
      }
      throw error;
    }
  }

  async displayProposalSummary(proposal) {
    console.log(chalk.blue('\n📄 Proposal Summary'));
    console.log(chalk.gray('━'.repeat(50)));
    
    console.log(`ID: ${chalk.white(proposal.proposalId)}`);
    console.log(`Title: ${chalk.white(proposal.title)}`);
    console.log(`Component: ${chalk.white(proposal.componentPath)}`);
    console.log(`Type: ${chalk.white(proposal.modificationType)}`);
    console.log(`Priority: ${this.formatPriority(proposal.priority)}`);
    console.log(`Status: ${this.formatStatus(proposal.status)}`);
    console.log(`Created by: ${chalk.white(proposal.metadata.createdBy)}`);
    console.log(`Created at: ${chalk.white(new Date(proposal.metadata.createdAt).toLocaleString())}`);
    
    if (proposal.assignees && proposal.assignees.length > 0) {
      console.log(`Assignees: ${chalk.white(proposal.assignees.join(', '))}`);
    }
    
    if (proposal.tags && proposal.tags.length > 0) {
      console.log(`Tags: ${chalk.gray(proposal.tags.join(', '))}`);
    }

    console.log(chalk.blue('\n📝 Description:'));
    console.log(chalk.gray(proposal.description || 'No description provided'));

    // Show modification-specific info
    if (proposal.modificationType === 'deprecate' && proposal.deprecationInfo) {
      console.log(chalk.yellow('\n⚠️ Deprecation Info:'));
      console.log(`Target removal: ${proposal.deprecationInfo.targetRemovalDate || 'Not specified'}`);
    }

    if (proposal.modificationType === 'enhance' && proposal.enhancementInfo) {
      console.log(chalk.green('\n✨ Enhancement Info:'));
      console.log(`New capabilities: ${proposal.enhancementInfo.newCapabilities.join(', ')}`);
    }

    if (proposal.modificationType === 'refactor' && proposal.refactorInfo) {
      console.log(chalk.blue('\n🔧 Refactor Info:'));
      console.log(`Breaking changes: ${proposal.refactorInfo.breakingChanges ? 'Yes' : 'No'}`);
    }
  }

  async analyzeProposal(proposal) {
    const analysis = {
      codeQuality: await this.analyzeCodeQuality(proposal),
      impact: proposal.impactAnalysis || null,
      conflicts: await this.checkForConflicts(proposal),
      testCoverage: await this.analyzeTestCoverage(proposal),
      securityIssues: await this.checkSecurityIssues(proposal),
      recommendations: []
    };

    // Generate recommendations based on analysis
    analysis.recommendations = this.generateRecommendations(analysis);

    return analysis;
  }

  async analyzeCodeQuality(proposal) {
    try {
      const component = await fs.readFile(
        path.resolve(this.rootPath, proposal.componentPath), 
        'utf-8'
      );

      const quality = {
        complexity: this.calculateComplexity(component),
        maintainability: this.assessMaintainability(component),
        documentation: this.checkDocumentation(component),
        codeStyle: this.checkCodeStyle(component)
      };

      return quality;
    } catch (error) {
      return {
        error: `Could not analyze code quality: ${error.message}`
      };
    }
  }

  async checkForConflicts(proposal) {
    // Check for other pending proposals on the same component
    const indexFile = path.join(this.rootPath, '.aiox', 'proposals', 'index.json');
    
    try {
      const content = await fs.readFile(indexFile, 'utf-8');
      const index = JSON.parse(content);
      
      const conflicts = index.proposals.filter(p => 
        p.proposalId !== proposal.proposalId &&
        p.componentPath === proposal.componentPath &&
        (p.status === 'pending_review' || p.status === 'approved')
      );

      return {
        hasConflicts: conflicts.length > 0,
        conflictingProposals: conflicts
      };
    } catch (error) {
      return {
        hasConflicts: false,
        conflictingProposals: []
      };
    }
  }

  async analyzeTestCoverage(proposal) {
    // Check if component has tests
    const testPaths = [
      path.join(this.rootPath, 'tests', 'unit', proposal.componentType, `${path.basename(proposal.componentPath, path.extname(proposal.componentPath))}.test.js`),
      path.join(this.rootPath, 'tests', 'integration', proposal.componentType, `${path.basename(proposal.componentPath, path.extname(proposal.componentPath))}.test.js`)
    ];

    let hasTests = false;
    for (const testPath of testPaths) {
      try {
        await fs.access(testPath);
        hasTests = true;
        break;
      } catch (error) {
        // Test file doesn't exist
      }
    }

    return {
      hasTests: hasTests,
      recommendation: hasTests ? 
        'Component has test coverage' : 
        'Component lacks test coverage - tests should be added'
    };
  }

  async checkSecurityIssues(proposal) {
    try {
      const component = await fs.readFile(
        path.resolve(this.rootPath, proposal.componentPath), 
        'utf-8'
      );

      const issues = [];

      // Check for common security patterns
      if (component.includes('eval(') || component.includes('Function(')) {
        issues.push('Uses dynamic code execution (eval/Function)');
      }

      if (component.includes('innerHTML') || component.includes('dangerouslySetInnerHTML')) {
        issues.push('Potential XSS vulnerability with innerHTML usage');
      }

      if (component.includes('exec(') || component.includes('spawn(')) {
        issues.push('Executes external processes - needs security review');
      }

      if (component.includes('fs.') && proposal.modificationType === 'enhance') {
        issues.push('File system operations in enhancement - verify path validation');
      }

      return {
        hasIssues: issues.length > 0,
        issues: issues
      };
    } catch (error) {
      return {
        hasIssues: false,
        issues: []
      };
    }
  }

  async displayReviewAnalysis(analysis) {
    console.log(chalk.blue('\n🔍 Review Analysis'));
    console.log(chalk.gray('━'.repeat(50)));

    // Code Quality
    if (analysis.codeQuality && !analysis.codeQuality.error) {
      console.log(chalk.blue('\n📊 Code Quality:'));
      console.log(`  Complexity: ${this.formatScore(analysis.codeQuality.complexity)}`);
      console.log(`  Maintainability: ${this.formatScore(analysis.codeQuality.maintainability)}`);
      console.log(`  Documentation: ${this.formatScore(analysis.codeQuality.documentation)}`);
      console.log(`  Code Style: ${this.formatScore(analysis.codeQuality.codeStyle)}`);
    }

    // Impact Analysis
    if (analysis.impact) {
      console.log(chalk.blue('\n💥 Impact Summary:'));
      console.log(`  Affected components: ${analysis.impact.affectedComponents || 'Unknown'}`);
      console.log(`  Risk level: ${this.formatRiskLevel(analysis.impact.riskLevel || 'Unknown')}`);
    }

    // Conflicts
    if (analysis.conflicts.hasConflicts) {
      console.log(chalk.yellow('\n⚠️ Conflicts Detected:'));
      analysis.conflicts.conflictingProposals.forEach(conflict => {
        console.log(`  - ${conflict.proposalId}: ${conflict.title} (${conflict.status})`);
      });
    } else {
      console.log(chalk.green('\n✅ No conflicts detected'));
    }

    // Test Coverage
    console.log(chalk.blue('\n🧪 Test Coverage:'));
    console.log(`  ${analysis.testCoverage.recommendation}`);

    // Security Issues
    if (analysis.securityIssues.hasIssues) {
      console.log(chalk.red('\n🔒 Security Concerns:'));
      analysis.securityIssues.issues.forEach(issue => {
        console.log(`  - ${issue}`);
      });
    } else {
      console.log(chalk.green('\n🔒 No security issues detected'));
    }

    // Recommendations
    if (analysis.recommendations.length > 0) {
      console.log(chalk.blue('\n💡 Recommendations:'));
      analysis.recommendations.forEach((rec, index) => {
        console.log(`  ${index + 1}. ${rec}`);
      });
    }
  }

  async getReviewDetails(proposal, analysis, config) {
    const details = {
      action: config.action,
      comment: config.comment,
      conditions: config.conditions,
      suggestions: null,
      priority: config.priority,
      assignees: config.assignees
    };

    // Load suggestions if provided
    if (config.suggestions) {
      try {
        details.suggestions = await fs.readFile(config.suggestions, 'utf-8');
      } catch (error) {
        console.warn(chalk.yellow(`Could not load suggestions file: ${error.message}`));
      }
    }

    // Interactive review if action not provided
    if (!details.action) {
      const questions = await this.buildReviewQuestions(proposal, analysis);
      const answers = await inquirer.prompt(questions);
      Object.assign(details, answers);
    }

    // Set reviewer info
    details.reviewer = process.env.USER || 'aiox-reviewer';
    details.reviewTimestamp = new Date().toISOString();

    return details;
  }

  async buildReviewQuestions(proposal, analysis) {
    const questions = [];

    // Main action
    questions.push({
      type: 'list',
      name: 'action',
      message: 'Review action:',
      choices: [
        { name: '✅ Approve', value: 'approve' },
        { name: '❌ Reject', value: 'reject' },
        { name: '🔄 Request Changes', value: 'request-changes' },
        { name: '💬 Add Comment Only', value: 'comment' }
      ]
    });

    // Comment
    questions.push({
      type: 'editor',
      name: 'comment',
      message: 'Review comment:',
      default: this.getCommentTemplate(proposal, analysis)
    });

    // Approval conditions
    questions.push({
      type: 'input',
      name: 'conditions',
      message: 'Conditions for approval (if any):',
      when: (answers) => answers.action === 'approve'
    });

    // Priority update
    questions.push({
      type: 'list',
      name: 'priority',
      message: 'Update priority?',
      choices: [
        { name: 'Keep current', value: null },
        { name: 'Low', value: 'low' },
        { name: 'Medium', value: 'medium' },
        { name: 'High', value: 'high' },
        { name: 'Critical', value: 'critical' }
      ],
      default: 0
    });

    // Additional assignees
    questions.push({
      type: 'input',
      name: 'additionalAssignees',
      message: 'Add additional reviewers (comma-separated):',
      when: (answers) => answers.action === 'request-changes',
      filter: (input) => input ? input.split(',').map(a => a.trim()) : []
    });

    return questions;
  }

  async processReview(proposal, reviewDetails, config) {
    const review = {
      reviewId: `review-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      proposalId: proposal.proposalId,
      action: reviewDetails.action,
      status: this.getReviewStatus(reviewDetails.action),
      reviewer: reviewDetails.reviewer,
      timestamp: reviewDetails.reviewTimestamp,
      comment: reviewDetails.comment,
      conditions: reviewDetails.conditions,
      suggestions: reviewDetails.suggestions,
      metadata: {
        reviewDuration: this.calculateReviewDuration(proposal),
        analysisPerformed: !config.fastReview
      }
    };

    // Store review
    await this.storeReview(proposal, review);

    // Determine next steps
    review.nextSteps = this.determineNextSteps(proposal, review);

    return review;
  }

  async storeReview(proposal, review) {
    const reviewsDir = path.join(this.rootPath, '.aiox', 'proposals', 'reviews');
    await fs.mkdir(reviewsDir, { recursive: true });

    const reviewFile = path.join(reviewsDir, `${review.reviewId}.json`);
    await fs.writeFile(reviewFile, JSON.stringify(review, null, 2));

    // Update proposal with review reference
    if (!proposal.reviews) {
      proposal.reviews = [];
    }
    proposal.reviews.push({
      reviewId: review.reviewId,
      reviewer: review.reviewer,
      action: review.action,
      timestamp: review.timestamp
    });
  }

  async updateProposalStatus(proposal, review) {
    // Update status based on review action
    switch (review.action) {
      case 'approve':
        proposal.status = 'approved';
        proposal.approvedBy = review.reviewer;
        proposal.approvalTimestamp = review.timestamp;
        break;
      case 'reject':
        proposal.status = 'rejected';
        proposal.rejectedBy = review.reviewer;
        proposal.rejectionTimestamp = review.timestamp;
        break;
      case 'request-changes':
        proposal.status = 'changes_requested';
        proposal.lastReviewTimestamp = review.timestamp;
        break;
      case 'comment':
        // Status remains unchanged for comments
        proposal.lastCommentTimestamp = review.timestamp;
        break;
    }

    // Update priority if changed
    if (review.priority) {
      proposal.priority = review.priority;
    }

    // Update assignees if changed
    if (review.assignees && review.assignees.length > 0) {
      proposal.assignees = [...new Set([...proposal.assignees, ...review.assignees])];
    }

    // Update metadata
    proposal.metadata.lastModified = new Date().toISOString();
    proposal.metadata.version++;

    // Save updated proposal
    const proposalFile = path.join(this.rootPath, '.aiox', 'proposals', `${proposal.proposalId}.json`);
    await fs.writeFile(proposalFile, JSON.stringify(proposal, null, 2));

    // Update index
    await this.updateProposalIndex(proposal);
  }

  async updateProposalIndex(proposal) {
    const indexFile = path.join(this.rootPath, '.aiox', 'proposals', 'index.json');
    
    try {
      const content = await fs.readFile(indexFile, 'utf-8');
      const index = JSON.parse(content);
      
      const proposalIndex = index.proposals.findIndex(p => p.proposalId === proposal.proposalId);
      if (proposalIndex !== -1) {
        index.proposals[proposalIndex].status = proposal.status;
        index.proposals[proposalIndex].priority = proposal.priority;
        index.proposals[proposalIndex].lastModified = proposal.metadata.lastModified;
      }
      
      await fs.writeFile(indexFile, JSON.stringify(index, null, 2));
    } catch (error) {
      console.warn(chalk.yellow(`Failed to update proposal index: ${error.message}`));
    }
  }

  async notifyReviewComplete(proposal, review) {
    try {
      const notifications = [];

      // Notify proposal creator
      notifications.push({
        recipient: proposal.metadata.createdBy,
        type: 'review_complete',
        proposalId: proposal.proposalId,
        reviewAction: review.action,
        reviewer: review.reviewer
      });

      // Notify assignees if action requires it
      if (review.action === 'request-changes' && proposal.assignees) {
        proposal.assignees.forEach(assignee => {
          notifications.push({
            recipient: assignee,
            type: 'changes_requested',
            proposalId: proposal.proposalId,
            reviewer: review.reviewer,
            comment: review.comment
          });
        });
      }

      // Send notifications
      for (const notification of notifications) {
        await this.notificationService.sendNotification(notification);
      }

      console.log(chalk.gray(`   Notifications sent: ${notifications.length}`));

    } catch (error) {
      console.warn(chalk.yellow(`Failed to send notifications: ${error.message}`));
    }
  }

  // Helper methods

  calculateComplexity(component) {
    // Simple complexity calculation based on code patterns
    const functionCount = (component.match(/function\s+\w+/g) || []).length;
    const methodCount = (component.match(/\w+\s*\([^)]*\)\s*{/g) || []).length;
    const conditionalCount = (component.match(/if\s*\(|switch\s*\(/g) || []).length;
    const loopCount = (component.match(/for\s*\(|while\s*\(|\.forEach|\.map/g) || []).length;
    
    const complexity = functionCount + methodCount + conditionalCount + loopCount;
    
    if (complexity > 50) return { score: 'high', value: complexity };
    if (complexity > 20) return { score: 'medium', value: complexity };
    return { score: 'low', value: complexity };
  }

  assessMaintainability(component) {
    // Check for maintainability indicators
    const hasComments = component.includes('//') || component.includes('/*');
    const hasJSDoc = component.includes('/**');
    const hasErrorHandling = component.includes('try') || component.includes('catch');
    const hasModularStructure = component.includes('module.exports') || component.includes('export');
    
    let score = 0;
    if (hasComments) score += 25;
    if (hasJSDoc) score += 25;
    if (hasErrorHandling) score += 25;
    if (hasModularStructure) score += 25;
    
    return { score: score >= 75 ? 'good' : score >= 50 ? 'fair' : 'poor', value: score };
  }

  checkDocumentation(component) {
    const docPatterns = [
      /\/\*\*[\s\S]*?\*\//g, // JSDoc
      /#+\s+\w+/g, // Markdown headers
      /@param/g, // Parameter documentation
      /@returns/g, // Return documentation
      /@example/g // Example documentation
    ];
    
    let docScore = 0;
    docPatterns.forEach(pattern => {
      const matches = component.match(pattern);
      if (matches) docScore += matches.length;
    });
    
    return { score: docScore > 10 ? 'good' : docScore > 5 ? 'fair' : 'poor', value: docScore };
  }

  checkCodeStyle(component) {
    // Basic code style checks
    const issues = [];
    
    if (component.includes('\t')) {
      issues.push('Uses tabs instead of spaces');
    }
    
    const lines = component.split('\n');
    const longLines = lines.filter(line => line.length > 120).length;
    if (longLines > 0) {
      issues.push(`${longLines} lines exceed 120 characters`);
    }
    
    if (!component.includes('use strict') && !component.includes('"use strict"')) {
      issues.push('Missing strict mode declaration');
    }
    
    return { 
      score: issues.length === 0 ? 'good' : issues.length <= 2 ? 'fair' : 'poor',
      issues: issues 
    };
  }

  generateRecommendations(analysis) {
    const recommendations = [];

    // Code quality recommendations
    if (analysis.codeQuality && !analysis.codeQuality.error) {
      if (analysis.codeQuality.complexity.score === 'high') {
        recommendations.push('Consider refactoring to reduce code complexity');
      }
      if (analysis.codeQuality.documentation.score === 'poor') {
        recommendations.push('Add comprehensive documentation and JSDoc comments');
      }
      if (analysis.codeQuality.maintainability.score === 'poor') {
        recommendations.push('Improve code maintainability with better structure and error handling');
      }
    }

    // Test coverage recommendations
    if (!analysis.testCoverage.hasTests) {
      recommendations.push('Add unit tests before approving this modification');
    }

    // Security recommendations
    if (analysis.securityIssues.hasIssues) {
      recommendations.push('Address security concerns before approval');
    }

    // Conflict recommendations
    if (analysis.conflicts.hasConflicts) {
      recommendations.push('Resolve conflicts with other pending proposals');
    }

    return recommendations;
  }

  getCommentTemplate(proposal, analysis) {
    let template = `## Review for: ${proposal.title}\n\n`;
    template += `### Summary\n[Provide your overall assessment]\n\n`;
    
    if (analysis && analysis.recommendations.length > 0) {
      template += `### Recommendations\n`;
      analysis.recommendations.forEach((rec, index) => {
        template += `${index + 1}. ${rec}\n`;
      });
      template += '\n';
    }
    
    template += `### Details\n[Add specific feedback and suggestions]\n`;
    
    return template;
  }

  formatPriority(priority) {
    const colors = {
      low: chalk.gray,
      medium: chalk.yellow,
      high: chalk.red,
      critical: chalk.red.bold
    };
    return colors[priority] ? colors[priority](priority.toUpperCase()) : priority;
  }

  formatStatus(status) {
    const statusMap = {
      draft: chalk.gray('DRAFT'),
      pending_review: chalk.yellow('PENDING REVIEW'),
      approved: chalk.green('APPROVED'),
      rejected: chalk.red('REJECTED'),
      changes_requested: chalk.yellow('CHANGES REQUESTED'),
      in_progress: chalk.blue('IN PROGRESS'),
      completed: chalk.green('COMPLETED')
    };
    return statusMap[status] || status;
  }

  formatScore(score) {
    if (typeof score === 'object') {
      const colors = {
        good: chalk.green,
        fair: chalk.yellow,
        poor: chalk.red,
        low: chalk.green,
        medium: chalk.yellow,
        high: chalk.red
      };
      const color = colors[score.score] || chalk.gray;
      return color(`${score.score.toUpperCase()} (${score.value})`);
    }
    return score;
  }

  formatRiskLevel(level) {
    const colors = {
      low: chalk.green,
      medium: chalk.yellow,
      high: chalk.red,
      critical: chalk.red.bold
    };
    return colors[level] ? colors[level](level.toUpperCase()) : level;
  }

  getReviewStatus(action) {
    const statusMap = {
      'approve': 'approved',
      'reject': 'rejected',
      'request-changes': 'changes_requested',
      'comment': 'commented'
    };
    return statusMap[action] || action;
  }

  calculateReviewDuration(proposal) {
    const created = new Date(proposal.metadata.createdAt);
    const now = new Date();
    const duration = now - created;
    
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''}`;
    }
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  }

  determineNextSteps(proposal, review) {
    const steps = [];

    switch (review.action) {
      case 'approve':
        steps.push('Proposal approved and ready for implementation');
        steps.push('Assignees will be notified to begin work');
        if (review.conditions) {
          steps.push(`Ensure conditions are met: ${review.conditions}`);
        }
        break;
      
      case 'reject':
        steps.push('Proposal has been rejected');
        steps.push('Creator should address feedback before resubmission');
        break;
      
      case 'request-changes':
        steps.push('Changes have been requested');
        steps.push('Proposal creator should address feedback');
        steps.push('Resubmit for review after making changes');
        break;
      
      case 'comment':
        steps.push('Comment added to proposal');
        steps.push('No status change - review still pending');
        break;
    }

    return steps;
  }
}

module.exports = ReviewProposalTask;
```

## Regras de Validação

### Validação de Revisão
- A proposal deve existir e estar acessível
- A ação de revisão deve ser válida
- O revisor deve ter permissões apropriadas
- Não é possível revisar as próprias proposals (em produção)
- Não é possível aprovar mudanças de alto risco sem condições

### Transições de Status
- Draft → Pending Review (na submissão)
- Pending Review → Approved/Rejected/Changes Requested
- Changes Requested → Pending Review (na atualização)
- Approved → In Progress (no início da implementação)
- In Progress → Completed (no fim da implementação)

### Requisitos de Revisão
- Todas as revisões devem incluir comentários
- Aprovações podem incluir condições
- Rejeições devem incluir motivos
- Solicitações de mudança devem incluir feedback específico

## Pontos de Integração

### Proposal System
- Carrega e atualiza os dados da proposal
- Gerencia o ciclo de vida da proposal
- Rastreia o histórico de revisões
- Trata as transições de status

### Análise de Impacto
- Fornece avaliação de risco para a revisão
- Identifica os componentes afetados
- Ajuda a embasar as decisões de revisão
- Destaca problemas críticos

### Notification Service
- Notifica o criador da proposal sobre a revisão
- Alerta os responsáveis sobre mudanças solicitadas
- Envia confirmações de aprovação
- Rastreia a entrega de notificações

### Diff Generator
- Mostra as mudanças propostas com clareza
- Destaca as modificações
- Auxilia na revisão de código
- Suporta múltiplos formatos de diff

## Considerações de Segurança
- Validar as permissões do revisor
- Auditar todas as ações de revisão
- Prevenir mudanças de status não autorizadas
- Proteger informações sensíveis da proposal
- Registrar todas as atividades de revisão para conformidade
