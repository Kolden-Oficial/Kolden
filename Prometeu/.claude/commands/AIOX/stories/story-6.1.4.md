---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.claude/commands/AIOX/stories/story-7.1.1|story-7.1.1]]"
---

# Story 6.1.4: Integração do Sistema Unificado de Saudação (v4 - Expandida)

**Story ID:** 6.1.4  
**Epic:** Epic-6.1 - Sistema de Identidade de Agentes  
**Wave:** Wave 1 (Fundação)  
**Status:** 📋 Pronta para Iniciar  
**Prioridade:** 🔴 Crítica  
**Responsável:** Dev (Dex)  
**Criada:** 2025-01-14  
**Atualizada:** 2025-01-17 (v4 - Integração do Sistema Unificado)  
**Duração:** 2,5 dias (20 horas)  
**Investimento:** $250.00

---

## 📋 Objetivo

**ESCOPO EXPANDIDO:** Implementar um sistema unificado de saudação que integra todos os componentes de saudação (contexto da sessão, status do projeto, personalização do agente, preferências do usuário) em uma solução única, otimizada e de fácil manutenção. Esta story unifica as Stories 6.1.1 até 6.1.6 em um sistema coeso que efetivamente funciona.

**Escopo Original (Já Implementado):**
- ✅ Preferências de saudação configuráveis pelo usuário (auto/minimal/named/archetypal)
- ✅ Classe `GreetingPreferenceManager`
- ✅ Comandos de CLI para gerenciamento de preferências
- ✅ Integração com `GreetingBuilder`

**Novo Escopo (Esta Story):**
- 🔄 Expandir `agent-config-loader.js` para carregar definições completas de agentes
- 🔄 Criar wrapper unificado `generate-greeting.js`
- 🔄 Modificar `greeting-builder.js` para aceitar contexto pré-carregado
- 🔄 Atualizar todos os 11 agentes para usar o sistema unificado
- 🔄 Implementar atualizações do estado da sessão após comandos
- 🔄 Consolidar scripts duplicados
- 🔄 Corrigir problemas de integração identificados na revisão técnica

---

## 🎯 Story

**Como** usuário do framework AIOX,  
**Quero** que os agentes usem um sistema unificado de saudação que integre contexto da sessão, status do projeto, personalização do agente e preferências do usuário,  
**Para que** eu tenha uma experiência consistente, rápida e contextualmente relevante ao ativar qualquer agente.

**Valor de Negócio:** 
- Unifica todo o trabalho anterior relacionado a saudações (Stories 6.1.1-6.1.6)
- Corrige problemas de integração que impediam os componentes de funcionarem juntos
- Fornece desempenho ideal (<150ms com proteção por timeout)
- Mantém compatibilidade retroativa com fallbacks
- Simplifica a arquitetura consolidando scripts duplicados

---

## 🔗 Contexto: Integração das Stories Anteriores

### Stories Já Implementadas (Mas Não Integradas):

**Story 6.1.1:** Definições de Persona dos Agentes ✅
- Definições de agentes com `persona_profile.greeting_levels`
- **Status:** Implementada, mas os agentes não a utilizam

**Story 6.1.2.4:** Contexto de Status do Projeto ✅
- `project-status-loader.js` com cache de 60s
- **Status:** Implementada, mas os agentes não a utilizam

**Story 6.1.2.5:** Integração de Carregamento Contextual do Agente ✅
- `greeting-builder.js` com detecção de sessão
- `session-context-loader.js` para continuidade multi-agente
- `context-detector.js` para detecção do tipo de sessão
- `workflow-navigator.js` para sugestões de workflow
- **Status:** Implementada, mas os agentes não a utilizam

**Story 6.1.2.6:** Sistema de Configuração do Framework ✅
- `agent-config-loader.js` para lazy loading
- **Status:** Implementada, mas não carrega definições de agentes

**Story 6.1.4 (Original):** Preferências de Saudação ✅
- `greeting-preference-manager.js`
- `greeting-config-cli.js`
- **Status:** Implementada, mas os agentes não a utilizam

**Story 6.1.6:** Formatador de Saída ✅
- Utilitários de formatação de saída
- **Status:** Implementada

### Problema Atual:

**Os agentes usam lógica inline no STEP 3:**
```yaml
- STEP 3: |
    Generate contextual greeting using inline logic:
    1. Detect session type: If first message → "new"
    2. Build greeting manually...
    3. Get project status (use Bash tool)...
    4. Show commands...
```

**Problemas:**
- ❌ O Claude Code não tem acesso ao `conversationHistory`
- ❌ A detecção de sessão sempre retorna "new"
- ❌ Os comandos sempre exibem visibilidade "full"
- ❌ Não usa nenhum dos scripts desenvolvidos
- ❌ O estado da sessão nunca é atualizado após comandos

### Solução:

**Gerador unificado de saudação chamado via Node.js:**
```yaml
- STEP 3: |
    Generate greeting by executing unified greeting generator:
    1. Execute: node .aiox-core/scripts/generate-greeting.js {agent-id}
    2. Capture the complete output
    3. Display the greeting exactly as returned
    
    If execution fails:
    - Fallback to simple greeting: "{icon} {name} ready"
    - Show: "Type *help to see available commands"
```

---

## 📊 Resumo da Análise Técnica

### Documentos de Análise Integrados:

1. **Análise de QA** (`docs/qa/comprehensive-greeting-system-analysis.md`)
   - Identificou falha de integração entre os componentes
   - Propôs solução de wrapper unificado
   - Metas de desempenho: <50ms (cache), <150ms (sem cache)

2. **Análise de Consolidação do Arquiteto** (`docs/architecture/scripts-consolidation-analysis.md`)
   - Identificou scripts duplicados (`config-loader.js` vs `agent-config-loader.js`)
   - Recomendou expandir `agent-config-loader.js` em vez de criar um novo loader
   - Identificou 4 scripts temporários de migração a serem excluídos

3. **Revisão Técnica do Arquiteto** (`docs/architecture/technical-review-greeting-system-unification.md`)
   - Identificou 3 problemas críticos:
     1. `AgentConfigLoader` não retorna a definição completa do agente
     2. Inconsistência na estrutura do contexto (carregamento duplicado)
     3. Falta de validação da estrutura do agente
   - Aprovou a arquitetura com modificações obrigatórias

### Problemas Críticos a Corrigir:

1. **🔴 CRÍTICO:** Expandir `agent-config-loader.js` para carregar definições completas de agentes
2. **🔴 CRÍTICO:** Modificar `greeting-builder.js` para aceitar contexto pré-carregado
3. **🔴 CRÍTICO:** Criar `generate-greeting.js` usando o loader expandido
4. **🟡 MÉDIO:** Adicionar validação e normalização das definições de agentes
5. **🟡 MÉDIO:** Melhorar o tratamento de erros e o logging

---

## 📋 Detalhamento de Tarefas

### Fase 1: Consolidação de Scripts (4,5 horas)

**Tarefa 1.1: Expandir `agent-config-loader.js` (2 horas)**

**Objetivo:** Adicionar a capacidade de carregar a definição completa do agente a partir do arquivo markdown

**Implementação:**

Adicionar a `.aiox-core/scripts/agent-config-loader.js`:

```javascript
/**
 * Agent definition cache (5 min TTL)
 */
const agentDefCache = new Map();

/**
 * Load complete agent definition from markdown file
 * 
 * @param {Object} options - Load options
 * @param {boolean} options.skipCache - Skip cache and force reload
 * @returns {Promise<Object>} Complete agent definition (agent, persona_profile, commands, etc.)
 */
async loadAgentDefinition(options = {}) {
  const skipCache = options.skipCache || false;
  const cacheKey = this.agentId;
  
  // Check cache
  if (!skipCache && agentDefCache.has(cacheKey)) {
    const cached = agentDefCache.get(cacheKey);
    if (Date.now() - cached.timestamp < 5 * 60 * 1000) {
      return cached.definition;
    }
  }
  
  // Load from file
  const agentPath = path.join(process.cwd(), '.aiox-core', 'agents', `${this.agentId}.md`);
  
  try {
    const content = await fs.readFile(agentPath, 'utf8');
    
    // Extract YAML block (handle both ```yaml and ```yml)
    const yamlMatch = content.match(/```ya?ml\n([\s\S]*?)\n```/);
    if (!yamlMatch) {
      throw new Error(`No YAML block found in ${this.agentId}.md`);
    }
    
    const agentDef = yaml.load(yamlMatch[1]);
    
    // Validate structure
    if (!agentDef.agent || !agentDef.agent.id) {
      throw new Error(`Invalid agent definition: missing agent.id`);
    }
    
    // Normalize and validate
    const normalized = this._normalizeAgentDefinition(agentDef);
    
    // Cache
    agentDefCache.set(cacheKey, {
      definition: normalized,
      timestamp: Date.now()
    });
    
    return normalized;
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(`Agent file not found: ${this.agentId}.md`);
    }
    throw new Error(`Failed to load agent definition for ${this.agentId}: ${error.message}`);
  }
}

/**
 * Normalize agent definition with defaults
 * @private
 * @param {Object} agentDef - Raw agent definition
 * @returns {Object} Normalized agent definition
 */
_normalizeAgentDefinition(agentDef) {
  // Ensure agent object exists
  if (!agentDef.agent) {
    throw new Error('Agent definition missing "agent" section');
  }
  
  const agent = agentDef.agent;
  
  // Normalize: ensure required fields have defaults
  agent.id = agent.id || 'unknown';
  agent.name = agent.name || agent.id;
  agent.icon = agent.icon || '🤖';
  
  // Ensure persona_profile exists with greeting_levels
  if (!agentDef.persona_profile) {
    agentDef.persona_profile = {
      greeting_levels: {
        minimal: `${agent.icon} ${agent.id} Agent ready`,
        named: `${agent.icon} ${agent.name} ready`,
        archetypal: `${agent.icon} ${agent.name} ready`
      }
    };
  } else if (!agentDef.persona_profile.greeting_levels) {
    agentDef.persona_profile.greeting_levels = {
      minimal: `${agent.icon} ${agent.id} Agent ready`,
      named: `${agent.icon} ${agent.name} ready`,
      archetypal: `${agent.icon} ${agent.name} ready`
    };
  }
  
  // Ensure commands array exists
  if (!agentDef.commands || !Array.isArray(agentDef.commands)) {
    agentDef.commands = [];
  }
  
  return agentDef;
}

/**
 * Load both config and definition (convenience method)
 * 
 * @param {Object} coreConfig - Core configuration
 * @param {Object} options - Load options
 * @returns {Promise<Object>} Combined config and definition
 */
async loadComplete(coreConfig, options = {}) {
  const [config, definition] = await Promise.all([
    this.load(coreConfig, options),
    this.loadAgentDefinition(options)
  ]);
  
  return {
    ...config,
    definition,
    agent: definition.agent,
    persona_profile: definition.persona_profile,
    commands: definition.commands || []
  };
}
```

**Validação:**
- ✅ Carrega a definição do agente a partir do arquivo markdown
- ✅ Extrai o bloco YAML corretamente
- ✅ Valida a estrutura (agent.id obrigatório)
- ✅ Normaliza campos ausentes com valores padrão
- ✅ Faz cache das definições (TTL de 5 min)
- ✅ Trata erros de arquivo não encontrado de forma elegante

---

**Tarefa 1.2: Depreciar `config-loader.js` (1 hora)**

**Objetivo:** Marcar como depreciado e verificar que não há uso ativo

**Ações:**

1. Adicionar aviso de depreciação a `.aiox-core/scripts/config-loader.js`:
```javascript
/**
 * @deprecated Use agent-config-loader.js instead
 * This file will be removed in a future version.
 * 
 * Migration guide:
 * - Old: const { loadAgentConfig } = require('./config-loader');
 * - New: const { AgentConfigLoader } = require('./agent-config-loader');
 *        const loader = new AgentConfigLoader(agentId);
 *        const config = await loader.load(coreConfig);
 */
```

2. Verificar usos:
```bash
grep -r "require.*config-loader" .aiox-core/
grep -r "from.*config-loader" .aiox-core/
```

3. Se nenhum uso for encontrado: Documentar a depreciação, manter o arquivo por enquanto
4. Se usos forem encontrados: Migrar para `agent-config-loader.js` primeiro

**Nota:** Com base nos resultados do grep, `config-loader.js` parece não estar em uso. Seguro para depreciar.

---

**Tarefa 1.3: Excluir Scripts Temporários de Migração (30 minutos)**

**Objetivo:** Remover scripts de migração concluídos (verificar a existência primeiro)

**Scripts a Excluir (verificar a existência antes da exclusão):**
1. `.aiox-core/scripts/batch-integrate-greeting-builder.js` ✅ (existe - verificado)
2. `.aiox-core/scripts/apply-inline-greeting-all-agents.js` ❌ (não encontrado - pode já ter sido excluído)
3. `.aiox-core/scripts/update-activation-instructions.js` ✅ (existe - verificado)
4. `.aiox-core/scripts/batch-update-agents-session-context.js` ❌ (não encontrado - pode já ter sido excluído)

**Passos de Implementação:**

1. **Verificar a existência dos scripts:**
   ```bash
   # Check each script
   test -f .aiox-core/scripts/batch-integrate-greeting-builder.js && echo "EXISTS" || echo "NOT FOUND"
   test -f .aiox-core/scripts/apply-inline-greeting-all-agents.js && echo "EXISTS" || echo "NOT FOUND"
   test -f .aiox-core/scripts/update-activation-instructions.js && echo "EXISTS" || echo "NOT FOUND"
   test -f .aiox-core/scripts/batch-update-agents-session-context.js && echo "EXISTS" || echo "NOT FOUND"
   ```

2. **Excluir apenas os scripts existentes:**
   ```bash
   # Delete only if file exists (graceful handling)
   [ -f .aiox-core/scripts/batch-integrate-greeting-builder.js ] && rm .aiox-core/scripts/batch-integrate-greeting-builder.js
   [ -f .aiox-core/scripts/update-activation-instructions.js ] && rm .aiox-core/scripts/update-activation-instructions.js
   ```

3. **Documentar o status da exclusão:**
   - Registrar quais scripts foram excluídos
   - Anotar quais scripts já estavam ausentes (podem ter sido excluídos em migração anterior)
   - Atualizar esta tarefa com os resultados reais da exclusão

**Justificativa:**
- Migrações concluídas
- Registro histórico preservado no Git
- Reduz confusão
- Tratamento elegante de scripts já excluídos

**Validação:**
- ✅ Scripts verificados antes da exclusão
- ✅ Apenas scripts existentes excluídos
- ✅ Status da exclusão documentado

---

### Fase 2: Modificar o GreetingBuilder (2 horas)

**Tarefa 2.1: Modificar `greeting-builder.js` para Aceitar Contexto Pré-carregado (2 horas)**

**Objetivo:** Evitar o carregamento duplicado do contexto da sessão e do status do projeto

**Implementação:**

Modificar `.aiox-core/scripts/greeting-builder.js`:

```javascript
/**
 * Build contextual greeting (internal implementation)
 * @private
 * @param {Object} agent - Agent definition
 * @param {Object} context - Session context (may contain pre-loaded values)
 * @returns {Promise<string>} Contextual greeting
 */
async _buildContextualGreeting(agent, context) {
  // Use pre-loaded values if available, otherwise load
  const sessionType = context.sessionType || 
    await this._safeDetectSessionType(context);
  
  const projectStatus = context.projectStatus || 
    await this._safeLoadProjectStatus();
  
  // gitConfig always loads (fast, cached)
  const gitConfig = await this._safeCheckGitConfig();
  
  // Build greeting sections based on session type
  const sections = [];
  
  // 1. Presentation (always)
  sections.push(this.buildPresentation(agent, sessionType));
  
  // 2. Role description (new session only)
  if (sessionType === 'new') {
    sections.push(this.buildRoleDescription(agent));
  }
  
  // 3. Project status (if git configured)
  if (gitConfig.configured && projectStatus) {
    sections.push(this.buildProjectStatus(projectStatus, sessionType));
  }
  
  // 4. Session context message (if existing session)
  if (sessionType !== 'new' && context.sessionMessage) {
    sections.push(context.sessionMessage);
  }
  
  // 5. Workflow suggestions (if workflow session)
  if (sessionType === 'workflow' && context.lastCommands) {
    const suggestions = this.workflowNavigator.getNextSteps(
      context.lastCommands,
      { agentId: agent.id }
    );
    if (suggestions && suggestions.length > 0) {
      sections.push(this.buildWorkflowSuggestions(suggestions));
    }
  }
  
  // 6. Commands (filtered by visibility)
  const commands = this.filterCommandsByVisibility(agent, sessionType);
  sections.push(this.buildCommands(commands, sessionType));
  
  // 7. Footer
  sections.push(this.buildFooter());
  
  return sections.filter(Boolean).join('\n\n');
}
```

**Mudanças Principais:**
- ✅ Usa `context.sessionType` se fornecido (evita detecção duplicada)
- ✅ Usa `context.projectStatus` se fornecido (evita carregamento duplicado)
- ✅ Usa `context.sessionMessage` se fornecido (do session-context-loader)
- ✅ Usa `context.lastCommands` se fornecido (para detecção de workflow)
- ✅ Faz fallback para carregamento se não fornecido (compatível com versões anteriores)

**Validação:**
- ✅ Compatível com versões anteriores (funciona com o formato de contexto antigo)
- ✅ Usa valores pré-carregados quando disponíveis
- ✅ Desempenho melhorado (sem carregamento duplicado)

---

### Fase 3: Criar o Gerador Unificado de Saudação (2 horas)

**Tarefa 3.1: Criar `generate-greeting.js` (2 horas)**

**Objetivo:** Criar um wrapper unificado que orquestra todos os componentes de saudação

**Implementação:**

Criar `.aiox-core/scripts/generate-greeting.js`:

```javascript
#!/usr/bin/env node
/**
 * Unified Greeting Generator
 * 
 * Orchestrates all greeting components for optimal performance:
 * - Agent definition (via expanded agent-config-loader.js)
 * - Session context (session-context-loader.js)
 * - Project status (project-status-loader.js)
 * - User preferences (greeting-preference-manager.js)
 * - Contextual adaptation (greeting-builder.js)
 * 
 * Performance Targets:
 * - With cache: <50ms
 * - Without cache: <150ms (timeout protection)
 * - Fallback: <10ms
 * 
 * Usage: node generate-greeting.js <agent-id>
 * 
 * Part of Story 6.1.4: Unified Greeting System Integration
 */

const GreetingBuilder = require('./greeting-builder');
const SessionContextLoader = require('./session-context-loader');
const ProjectStatusLoader = require('./project-status-loader');
const { AgentConfigLoader } = require('./agent-config-loader');
const fs = require('fs').promises;
const path = require('path');
const yaml = require('js-yaml');

/**
 * Generate unified greeting for agent activation
 * 
 * @param {string} agentId - Agent identifier (e.g., 'qa', 'dev')
 * @returns {Promise<string>} Formatted greeting string
 * @throws {Error} If agent file not found or invalid
 * 
 * @example
 * const greeting = await generateGreeting('qa');
 * console.log(greeting);
 */
async function generateGreeting(agentId) {
  const startTime = Date.now();
  
  try {
    // Load core config
    const coreConfigPath = path.join(process.cwd(), '.aiox-core', 'core-config.yaml');
    const coreConfigContent = await fs.readFile(coreConfigPath, 'utf8');
    const coreConfig = yaml.load(coreConfigContent);
    
    // Load everything in parallel using expanded AgentConfigLoader
    const loader = new AgentConfigLoader(agentId);
    const projectStatusLoader = new ProjectStatusLoader();
    
    const [complete, sessionContext, projectStatus] = await Promise.all([
      loader.loadComplete(coreConfig), // Loads config + definition
      loadSessionContext(agentId),
      projectStatusLoader.loadProjectStatus()
    ]);
    
    // Build unified context
    const context = {
      conversationHistory: [], // Not available in Claude Code
      sessionType: sessionContext.sessionType, // Pre-detected
      projectStatus: projectStatus, // Pre-loaded
      lastCommands: sessionContext.lastCommands || [],
      previousAgent: sessionContext.previousAgent,
      sessionMessage: sessionContext.message,
      workflowActive: sessionContext.workflowActive
    };
    
    // Generate greeting using GreetingBuilder
    const builder = new GreetingBuilder();
    const greeting = await builder.buildGreeting(complete.agent, context);
    
    const duration = Date.now() - startTime;
    if (duration > 100) {
      console.warn(`[generate-greeting] Slow generation: ${duration}ms`);
    }
    
    return greeting;
    
  } catch (error) {
    console.error('[generate-greeting] Error:', {
      agentId,
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
    
    // Fallback: Simple greeting
    return generateFallbackGreeting(agentId);
  }
}

/**
 * Load session context for agent
 * @private
 * @param {string} agentId - Agent ID
 * @returns {Promise<Object>} Session context
 */
async function loadSessionContext(agentId) {
  try {
    const loader = new SessionContextLoader();
    return loader.loadContext(agentId);
  } catch (error) {
    console.warn('[generate-greeting] Session context failed:', error.message);
    return {
      sessionType: 'new',
      message: null,
      previousAgent: null,
      lastCommands: [],
      workflowActive: null
    };
  }
}

/**
 * Generate fallback greeting if everything fails
 * @private
 * @param {string} agentId - Agent ID
 * @returns {string} Simple fallback greeting
 */
function generateFallbackGreeting(agentId) {
  return `✅ ${agentId} Agent ready\n\nType \`*help\` to see available commands.`;
}

// CLI interface
if (require.main === module) {
  const agentId = process.argv[2];
  
  if (!agentId) {
    console.error('Usage: node generate-greeting.js <agent-id>');
    console.error('\nExamples:');
    console.error('  node generate-greeting.js qa');
    console.error('  node generate-greeting.js dev');
    process.exit(1);
  }
  
  generateGreeting(agentId)
    .then(greeting => {
      console.log(greeting);
      process.exit(0);
    })
    .catch(error => {
      console.error('Fatal error:', error.message);
      console.log(generateFallbackGreeting(agentId));
      process.exit(1);
    });
}

module.exports = { generateGreeting };
```

**Validação:**
- ✅ Carrega a definição do agente via `agent-config-loader.js` expandido
- ✅ Carrega o contexto da sessão em paralelo
- ✅ Carrega o status do projeto em paralelo
- ✅ Constrói o objeto de contexto unificado
- ✅ Passa o contexto pré-carregado para o `GreetingBuilder`
- ✅ Trata erros de forma elegante com fallback
- ✅ Logging de desempenho para operações lentas
- ✅ Interface de CLI para testes

---

### Fase 4: Atualizar Agentes (Abordagem Incremental) (3,5 horas)

**Estratégia:** Usar o agente QA como piloto, testar minuciosamente e, então, aplicar aos demais

**Tarefa 4.1: Atualizar o Agente QA Primeiro (Piloto) (1 hora)**

**Objetivo:** Atualizar apenas o agente QA como prova de conceito

**Agente Piloto:**
- `qa.md` (Quinn - Test Architect & Quality Advisor)

**Novo Formato do STEP 3:**

```yaml
- STEP 3: |
    Generate greeting by executing unified greeting generator:
    
    1. Execute: node .aiox-core/scripts/generate-greeting.js qa
    2. Capture the complete output
    3. Display the greeting exactly as returned
    
    If execution fails or times out:
    - Fallback to simple greeting: "✅ qa Agent ready"
    - Show: "Type *help to see available commands"
    
    Do NOT modify or interpret the greeting output.
    Display it exactly as received.
```

**Passos de Atualização Manual:**

1. Abrir `.aiox-core/agents/qa.md`
2. Localizar a seção STEP 3 (começa com `- STEP 3: |`)
3. Substituir todo o bloco STEP 3 pelo novo formato acima
4. Salvar o arquivo
5. Testar a ativação: `/AIOX/agents/qa`

**Checklist de Validação para o Piloto QA:**
- [ ] Arquivo do agente QA atualizado corretamente
- [ ] STEP 3 substituído pelo novo formato
- [ ] ID do agente "qa" corretamente inserido
- [ ] Instruções de fallback incluídas
- [ ] Sintaxe do arquivo válida (YAML)

---

**Tarefa 4.2: Testar Minuciosamente o Agente QA (1 hora)**

**Objetivo:** Validar que o sistema unificado de saudação funciona corretamente com o agente QA

**Cenários de Teste:**

1. **Teste de Nova Sessão:**
   ```bash
   # Clear session state
   rm .aiox/session-state.json
   
   # Activate QA agent
   /AIOX/agents/qa
   
   # Expected: "new" session type detected
   # Expected: Full greeting with role description
   # Expected: All commands shown (visibility: full, quick, key)
   ```

2. **Teste de Sessão Existente:**
   ```bash
   # Create session state
   node -e "const fs = require('fs'); const path = require('path'); const sessionPath = path.join(process.cwd(), '.aiox', 'session-state.json'); fs.mkdirSync(path.dirname(sessionPath), { recursive: true }); fs.writeFileSync(sessionPath, JSON.stringify({ sessionId: 'test-123', startTime: new Date().toISOString(), lastActivity: new Date().toISOString(), agentSequence: [{ id: 'po', name: 'Pax' }], lastCommands: ['create-story'], workflowActive: null }), 'utf8');"
   
   # Activate QA agent
   /AIOX/agents/qa
   
   # Expected: "existing" session type detected
   # Expected: Quick greeting (no role description)
   # Expected: Reduced commands (visibility: quick, key)
   ```

3. **Teste Direto do Script:**
   ```bash
   # Test script directly
   node .aiox-core/scripts/generate-greeting.js qa
   
   # Expected: Greeting output without errors
   # Expected: Contains agent name "Quinn"
   # Expected: Contains project status (if git configured)
   # Expected: Contains commands list
   ```

4. **Teste de Tratamento de Erros:**
   ```bash
   # Test with invalid agent
   node .aiox-core/scripts/generate-greeting.js invalid-agent
   
   # Expected: Fallback greeting shown
   # Expected: No errors thrown
   ```

5. **Teste de Desempenho:**
   ```bash
   # Measure execution time
   time node .aiox-core/scripts/generate-greeting.js qa
   
   # Expected: <150ms (with timeout protection)
   # Expected: <50ms if cache hit
   ```

**Critérios de Sucesso:**
- ✅ Agente QA ativa com sucesso
- ✅ Saudação gerada corretamente
- ✅ Tipo de sessão detectado corretamente
- ✅ Comandos filtrados por visibilidade
- ✅ Status do projeto exibido (se git configurado)
- ✅ Fallback funciona em caso de erros
- ✅ Desempenho dentro das metas

**Se o Piloto QA Falhar:**
- Parar e corrigir os problemas antes de prosseguir
- Não atualizar os demais agentes até que o QA funcione perfeitamente
- Documentar os problemas e as soluções

---

**Tarefa 4.3: Aplicar aos 10 Agentes Restantes (1,5 hora)**

**Objetivo:** Atualizar os agentes restantes somente após a validação do piloto QA

**Pré-requisitos:**
- ✅ Agente QA testado e funcionando perfeitamente
- ✅ Todos os cenários de teste aprovados
- ✅ Nenhum erro ou problema identificado

**Agentes a Atualizar (Após a Validação do QA):**
1. `dev.md`
2. `po.md`
3. `sm.md`
4. `pm.md`
5. `architect.md`
6. `analyst.md`
7. `data-engineer.md`
8. `devops.md`
9. `aiox-master.md`
10. `ux-design-expert.md`

**Script de Implementação:**

Criar o script `.aiox/temp-update-remaining-agents.js`:

```javascript
const fs = require('fs');
const path = require('path');

const AGENTS_DIR = path.join(process.cwd(), '.aiox-core', 'agents');
const REMAINING_AGENTS = [
  'dev', 'po', 'sm', 'pm', 'architect', 'analyst',
  'data-engineer', 'devops', 'aiox-master', 'ux-design-expert'
];

const NEW_STEP_3_TEMPLATE = `  - STEP 3: |
      Generate greeting by executing unified greeting generator:
      
      1. Execute: node .aiox-core/scripts/generate-greeting.js {agent-id}
      2. Capture the complete output
      3. Display the greeting exactly as returned
      
      If execution fails or times out:
      - Fallback to simple greeting: "{icon} {name} ready"
      - Show: "Type *help to see available commands"
      
      Do NOT modify or interpret the greeting output.
      Display it exactly as received.`;

function updateAgent(agentId) {
  const filePath = path.join(AGENTS_DIR, `${agentId}.md`);
  
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Agent file not found: ${filePath}`);
    return false;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find and replace STEP 3
  const step3Pattern = /  - STEP 3: \|[\s\S]*?(?=  - STEP 4:|$)/;
  
  // Get agent icon and name from file for fallback
  const iconMatch = content.match(/icon:\s*(.+)/);
  const nameMatch = content.match(/name:\s*(.+)/);
  const icon = iconMatch ? iconMatch[1].trim() : '🤖';
  const name = nameMatch ? nameMatch[1].trim() : agentId;
  
  const newStep3 = NEW_STEP_3_TEMPLATE
    .replace(/{agent-id}/g, agentId)
    .replace('{icon}', icon)
    .replace('{name}', name);
  
  if (step3Pattern.test(content)) {
    content = content.replace(step3Pattern, newStep3);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated ${agentId}.md`);
    return true;
  } else {
    console.warn(`⚠️  STEP 3 pattern not found in ${agentId}.md`);
    return false;
  }
}

// Update remaining agents
console.log('🔄 Updating remaining agents (QA already done)...\n');
let updated = 0;
for (const agentId of REMAINING_AGENTS) {
  if (updateAgent(agentId)) {
    updated++;
  }
}

console.log(`\n✅ Updated ${updated} of ${REMAINING_AGENTS.length} agents`);
console.log(`📊 Total: ${updated + 1} agents (including QA pilot)`);
```

**Validação:**
- ✅ Todos os 10 agentes restantes atualizados
- ✅ STEP 3 substituído corretamente
- ✅ IDs dos agentes corretamente inseridos
- ✅ Ícones e nomes extraídos para o fallback
- ✅ Instruções de fallback incluídas

**Teste de Validação Rápida:**
```bash
# Test each agent activation
for agent in dev po sm pm architect analyst data-engineer devops aiox-master ux-design-expert; do
  echo "Testing $agent..."
  node .aiox-core/scripts/generate-greeting.js $agent
  echo "---"
done
```

---

### Fase 5: Atualizações do Estado da Sessão (2 horas)

**Tarefa 5.1: Criar Hook de Execução de Comandos (1 hora)**

**Objetivo:** Atualizar o estado da sessão após a execução de comandos

**Implementação:**

Criar `.aiox-core/scripts/command-execution-hook.js`:

```javascript
/**
 * Command Execution Hook
 * 
 * Updates session state after command execution to maintain
 * accurate session context for future agent activations.
 * 
 * Part of Story 6.1.4: Unified Greeting System Integration
 */

const SessionContextLoader = require('./session-context-loader');

/**
 * Update session state after command execution
 * 
 * Should be called after each command execution to maintain
 * accurate session context for future agent activations.
 * 
 * @param {string} agentId - Agent ID executing the command
 * @param {string} agentName - Agent name (for display)
 * @param {string} command - Command name executed
 * @returns {void}
 * 
 * @example
 * updateSessionAfterCommand('qa', 'Quinn', 'analyze-framework');
 */
function updateSessionAfterCommand(agentId, agentName, command) {
  try {
    const loader = new SessionContextLoader();
    loader.updateSession(agentId, agentName, command);
  } catch (error) {
    // Non-blocking: Session update failure shouldn't break command execution
    console.warn('[command-hook] Failed to update session:', error.message);
  }
}

module.exports = { updateSessionAfterCommand };
```

**Nota:** Este hook é criado, mas não integrado automaticamente. A integração requer:
- Modificar o sistema de execução de tarefas (story futura)
- Ou chamadas manuais em comandos críticos (documentação)

**Por enquanto:** Documentar o padrão de uso para integração futura.

---

**Tarefa 5.2: Documentar o Padrão de Atualização de Sessão (1 hora)**

**Objetivo:** Documentar como integrar as atualizações de sessão

**Documentação:**

Criar `.aiox-core/docs/session-update-pattern.md`:

```markdown
# Session Update Pattern

## Overview

To maintain accurate session context, update session state after command execution.

## Usage

```javascript
const { updateSessionAfterCommand } = require('./command-execution-hook');

// After command execution
updateSessionAfterCommand('qa', 'Quinn', 'analyze-framework');
```

## Integration Points

1. **Task Execution:** Add hook call after task completion
2. **Command Execution:** Add hook call after command completion
3. **Manual Updates:** Call directly when needed

## Future Integration

Automatic integration will be added in future story:
- Task execution system will call hook automatically
- Command execution system will call hook automatically
```

---

### Fase 6: Testes e Validação (4 horas)

**Tarefa 6.1: Testes Unitários (2 horas)**

**Nota:** Estrutura do diretório de testes verificada - `tests/unit/` e `tests/integration/` já existem ✅

Criar `tests/unit/generate-greeting.test.js`:

```javascript
/**
 * Unit Tests for Unified Greeting Generator
 */

const { generateGreeting } = require('../../.aiox-core/scripts/generate-greeting');

describe('generateGreeting', () => {
  it('should generate greeting for valid agent', async () => {
    const greeting = await generateGreeting('qa');
    expect(greeting).toContain('Quinn');
    expect(greeting).toContain('ready');
  });
  
  it('should fallback for invalid agent', async () => {
    const greeting = await generateGreeting('invalid-agent');
    expect(greeting).toContain('Agent ready');
    expect(greeting).toContain('*help');
  });
  
  it('should include project status when git configured', async () => {
    const greeting = await generateGreeting('dev');
    // May or may not include project status depending on git config
    expect(greeting).toBeTruthy();
  });
  
  it('should respect user preferences', async () => {
    // Test with different preferences
    // Requires mocking GreetingPreferenceManager
  });
});
```

**Tarefa 6.2: Testes de Integração (2 horas)**

Criar `tests/integration/greeting-system-integration.test.js`:

```javascript
/**
 * Integration Tests for Unified Greeting System
 */

describe('Greeting System Integration', () => {
  it('should generate greeting with all components integrated', async () => {
    // Test full flow:
    // 1. Load agent definition
    // 2. Load session context
    // 3. Load project status
    // 4. Generate greeting
    // 5. Verify output
  });
  
  it('should handle new session correctly', async () => {
    // Clear session state
    // Generate greeting
    // Verify "new" session type detected
  });
  
  it('should handle existing session correctly', async () => {
    // Create session state
    // Generate greeting
    // Verify "existing" session type detected
  });
  
  it('should update session state after command', async () => {
    // Execute command
    // Update session
    // Verify session state updated
  });
});
```

---

## ✅ Critérios de Aceitação

### Obrigatório (Must Have)

- [ ] `agent-config-loader.js` expandido com `loadAgentDefinition()` e `loadComplete()`
- [ ] `greeting-builder.js` modificado para aceitar contexto pré-carregado
- [ ] `generate-greeting.js` criado e funcional
- [ ] Agente QA atualizado e testado como piloto
- [ ] Agente QA validado com todos os cenários de teste
- [ ] 10 agentes restantes atualizados após a validação do QA
- [ ] Estado da sessão atualizado após comandos (hook criado)
- [ ] Metas de desempenho atingidas: <50ms (cache), <150ms (sem cache)
- [ ] Fallback funciona se o Node.js estiver indisponível
- [ ] Compatível com o código existente
- [ ] Testes unitários passando (10+ casos de teste)
- [ ] Testes de integração passando (5+ casos de teste)

### Desejável (Should Have)

- [ ] `config-loader.js` depreciado (marcado, uso verificado)
- [ ] Scripts temporários de migração excluídos (verificados e removidos)
- [ ] Validação e normalização da definição do agente
- [ ] Logging de erros melhorado
- [ ] Documentação atualizada

### Bom de Ter (Nice to Have)

- [ ] Dashboard de métricas de desempenho
- [ ] Comando de pré-visualização de saudação
- [ ] Visualização do estado da sessão

---

## 🤖 Integração com o CodeRabbit

### Análise do Tipo de Story

**Tipo Primário:** Infraestrutura/Integração  
**Tipo(s) Secundário(s):** Arquitetura, Otimização de Desempenho  
**Complexidade:** Média

### Atribuição de Agentes Especializados

**Agentes Primários:**
- @dev: Implementação central, qualidade de código, segurança da integração
- @architect: Validação de arquitetura, conformidade de padrões

**Agentes de Apoio:**
- @qa: Validação da story, verificação de cobertura de testes

### Tarefas dos Quality Gates

- [ ] **Pré-Commit (@dev):** Executar antes de marcar a story como concluída
  - Foco: Qualidade de código, tratamento de erros, mecanismos de fallback
  - Validar: Todos os caminhos de erro têm fallbacks
  - Verificar: Metas de desempenho atingidas (<50ms cache, <150ms sem cache)
  
- [ ] **Pré-PR (@dev):** Executar antes de criar o pull request
  - Foco: Segurança da integração, compatibilidade retroativa
  - Validar: Nenhuma mudança que quebre a ativação de agentes existente
  - Verificar: Todos os 11 agentes ainda ativam corretamente
  
- [ ] **Pré-Deployment:** N/A (Story de infraestrutura, sem deployment em produção)

### Áreas de Foco do CodeRabbit

**Foco Primário:**
- **Tratamento de Erros:** Blocos try-catch, mecanismos de fallback, degradação elegante
- **Desempenho:** Estratégias de cache, proteção por timeout, carregamento paralelo
- **Integração:** Padrões de interação entre componentes, passagem de contexto, gerenciamento do estado da sessão

**Foco Secundário:**
- **Qualidade de Código:** Nomenclatura de métodos, documentação, lógica de validação
- **Compatibilidade Retroativa:** A ativação de agentes existente ainda funciona, sem mudanças que quebrem
- **Testes:** Cobertura de testes unitários, cenários de testes de integração, benchmarks de desempenho

**Padrões Específicos a Validar:**

1. **Padrão de Tratamento de Erros:**
   ```javascript
   // All async operations must have try-catch
   try {
     const result = await operation();
     return result;
   } catch (error) {
     console.error('[component] Error:', error.message);
     return fallbackValue;
   }
   ```

2. **Padrão de Desempenho:**
   ```javascript
   // Cache checks before expensive operations
   if (cache.has(key) && !isExpired(cache.get(key))) {
     return cache.get(key).value;
   }
   ```

3. **Padrão de Integração:**
   ```javascript
   // Pre-loaded context prevents duplicate loading
   const context = {
     sessionType: preLoadedSessionType || await detectSessionType(),
     projectStatus: preLoadedProjectStatus || await loadProjectStatus()
   };
   ```

---

## 📁 Arquivos Modificados

### Novos Arquivos Criados

- `.aiox-core/scripts/generate-greeting.js` (Gerador unificado de saudação)
- `.aiox-core/scripts/command-execution-hook.js` (Hook de atualização de sessão)
- `.aiox-core/docs/session-update-pattern.md` (Documentação)
- `tests/unit/generate-greeting.test.js` (Testes unitários)
- `tests/integration/greeting-system-integration.test.js` (Testes de integração)

### Arquivos Modificados

- `.aiox-core/scripts/agent-config-loader.js` (Expandido com `loadAgentDefinition()` e `loadComplete()`)
- `.aiox-core/scripts/greeting-builder.js` (Modificado para aceitar contexto pré-carregado)
- `.aiox-core/scripts/config-loader.js` (Aviso de depreciação adicionado)
- `.aiox-core/agents/qa.md` (Piloto - STEP 3 atualizado primeiro)
- `.aiox-core/agents/*.md` (10 agentes restantes - STEP 3 atualizado após a validação do QA)

### Arquivos Excluídos

- `.aiox-core/scripts/batch-integrate-greeting-builder.js` (Script temporário de migração)
- `.aiox-core/scripts/apply-inline-greeting-all-agents.js` (Script temporário de migração)
- `.aiox-core/scripts/update-activation-instructions.js` (Script temporário de migração)
- `.aiox-core/scripts/batch-update-agents-session-context.js` (Script temporário de migração)

### Arquivos Referenciados (Sem Alterações)

- `.aiox-core/scripts/session-context-loader.js` (Usado por generate-greeting.js)
- `.aiox-core/scripts/project-status-loader.js` (Usado por generate-greeting.js)
- `.aiox-core/scripts/greeting-preference-manager.js` (Usado por greeting-builder.js)
- `.aiox-core/scripts/context-detector.js` (Usado por greeting-builder.js)
- `.aiox-core/scripts/workflow-navigator.js` (Usado por greeting-builder.js)

---

## 💰 Detalhamento do Investimento

- **Fase 1: Consolidação de Scripts:** 4,5 horas @ $12.50/h = $56.25
- **Fase 2: Modificar o GreetingBuilder:** 2 horas @ $12.50/h = $25.00
- **Fase 3: Criar o Gerador Unificado:** 2 horas @ $12.50/h = $25.00
- **Fase 4: Atualizar Agentes (Incremental):** 3,5 horas @ $12.50/h = $43.75
  - Tarefa 4.1: Atualizar o piloto QA (1h)
  - Tarefa 4.2: Testar o QA minuciosamente (1h)
  - Tarefa 4.3: Aplicar aos 10 agentes restantes (1,5h)
- **Fase 5: Atualizações do Estado da Sessão:** 2 horas @ $12.50/h = $25.00
- **Fase 6: Testes e Validação:** 4 horas @ $12.50/h = $50.00
- **Buffer (10%):** 2,05 horas @ $12.50/h = $25.63

**Total:** 20,5 horas = $256.25

---

## 🎯 Métricas de Sucesso

- **Integração:** Todos os componentes funcionam juntos de forma fluida
- **Desempenho:** <50ms (cache), <150ms (sem cache), <10ms (fallback)
- **Compatibilidade:** 100% compatível com versões anteriores
- **Cobertura de Testes:** ≥80% para o novo código
- **Qualidade de Código:** Sem scripts duplicados, arquitetura limpa
- **Experiência do Usuário:** Saudações consistentes, rápidas e contextualmente relevantes

---

## ⚠️ Riscos e Mitigação

### Risco 1: Falha no carregamento da definição do agente
- **Probabilidade:** Baixa
- **Impacto:** Alto
- **Mitigação:** 
  - Validação e normalização
  - Fallback para saudação simples
  - Logging de erros

### Risco 2: Degradação de desempenho
- **Probabilidade:** Baixa
- **Impacto:** Médio
- **Mitigação:**
  - Cache das definições de agentes (5 min)
  - Carregamento paralelo
  - Proteção por timeout (150ms)
  - Logging de desempenho

### Risco 3: Quebra de funcionalidade existente
- **Probabilidade:** Baixa
- **Impacto:** Alto
- **Mitigação:**
  - Mudanças compatíveis com versões anteriores
  - Mecanismos de fallback
  - Testes abrangentes
  - Rollout gradual

---

## 📝 Notas de Implementação

### Detalhes Críticos de Implementação

1. **Carregamento da Definição do Agente:**
   - Usar `agent-config-loader.js` expandido (não criar novo loader)
   - Fazer cache das definições por 5 minutos
   - Validar e normalizar a estrutura

2. **Pré-carregamento de Contexto:**
   - Carregar o contexto da sessão e o status do projeto em paralelo
   - Passar valores pré-carregados para o `GreetingBuilder`
   - Evitar carregamento duplicado

3. **Tratamento de Erros:**
   - Fallback para saudação simples em qualquer erro
   - Registrar erros com contexto
   - Não quebrar a ativação do agente

4. **Desempenho:**
   - Carregamento paralelo onde for possível
   - Fazer cache de tudo o que puder ser cacheado
   - Proteção por timeout (150ms)

### Estratégia de Testes

1. **Testes Unitários:**
   - Testar o método `loadAgentDefinition()`
   - Testar o método `loadComplete()`
   - Testar a função `generateGreeting()`
   - Testar o tratamento de erros

2. **Testes de Integração:**
   - Testar o fluxo completo de geração de saudação
   - Testar com diferentes tipos de sessão
   - Testar com diferentes preferências
   - Testar cenários de erro

3. **Testes Manuais:**
   - Ativar cada agente
   - Verificar a saída da saudação
   - Testar cenários de fallback
   - Verificar o desempenho

---

## 🔗 Documentos Relacionados

- **Epic:** [Epic-6.1](../epics/epic-6.1.md)
- **Pré-requisitos:** 
  - Story 6.1.1 - Definições de Persona dos Agentes ✅
  - Story 6.1.2.4 - Contexto de Status do Projeto ✅
  - Story 6.1.2.5 - Integração de Carregamento Contextual do Agente ✅
  - Story 6.1.2.6 - Sistema de Configuração do Framework ✅
  - Story 6.1.4 (Original) - Preferências de Saudação ✅
- **Documentos de Análise:**
  - `docs/qa/comprehensive-greeting-system-analysis.md`
  - `docs/architecture/scripts-consolidation-analysis.md`
  - `docs/architecture/technical-review-greeting-system-unification.md`

---

## 📋 Exemplo de Uso

### Após a Implementação

**Usuário ativa o agente:**
```bash
/AIOX/agents/qa
```

**O STEP 3 do agente executa:**
```bash
node .aiox-core/scripts/generate-greeting.js qa
```

**Saída:**
```
✅ Quinn (Guardian) ready. Let's ensure quality!

**Role:** Test Architect & Quality Advisor

📊 **Project Status:**
  - 🌿 **Branch:** main
  - 📝 **Modified:** 135 files
  - 📖 **Recent:** feat(story-6.1.6): complete QA review

**Available Commands:**
   - `*analyze-framework`: Comprehensive framework analysis
   - `*validate-story`: Validate story quality
   ...
```

**Se a execução falhar:**
```
✅ qa Agent ready

Type *help to see available commands.
```

---

## 📝 Change Log

| Data | Versão | Mudanças | Autor |
|------|---------|---------|--------|
| 2025-01-17 | 4.1 | Adicionada seção de Integração com o CodeRabbit, esclarecido o processo de exclusão dos scripts de migração, verificada a estrutura do diretório de testes | Pax (po) |
| 2025-01-17 | 4.0 | Expandida para a integração do sistema unificado, integradas todas as análises, adicionada a consolidação de scripts, adicionadas as atualizações de sessão | Pax (po) + Aria (architect) |
| 2025-01-16 | 3.0 | Melhorias de validação, testes de integração adicionados | Pax (po) |
| 2025-01-15 | 2.0 | Reescrita significativa para integração com a Story 6.1.2.5 | Quinn (qa) |
| 2025-01-14 | 1.0 | Criação inicial da story | Desconhecido |

---

**Status:** 📋 Pronta para Iniciar  
**Próximos Passos:** Iniciar a Fase 1 - Consolidação de Scripts  
**Conclusão Estimada:** 2,5 dias

---

## 🎯 Estratégia de Implementação: Piloto QA Primeiro

**Justificativa:** Usar o agente QA como piloto para validar o sistema antes de aplicá-lo a todos os agentes. Isso evita o desperdício de tempo e tokens com agentes que podem apresentar problemas.

**Abordagem:**
1. ✅ Implementar toda a infraestrutura (Fases 1-3)
2. ✅ Atualizar apenas o agente QA primeiro (Fase 4.1)
3. ✅ Testar o agente QA minuciosamente (Fase 4.2)
4. ✅ Corrigir quaisquer problemas encontrados
5. ✅ Aplicar aos 10 agentes restantes somente após a validação do QA (Fase 4.3)

**Benefícios:**
- 🎯 Detectar problemas cedo com um único agente
- 🎯 Validar a abordagem antes de escalar
- 🎯 Economizar tempo e tokens
- 🎯 Construir confiança antes do rollout completo

**Seleção do Agente QA:**
- ✅ Persona e comandos bem definidos
- ✅ Usado com frequência (bom para testes)
- ✅ Representativo dos demais agentes
- ✅ Fácil de validar a qualidade da saída
