# greet

Gera a saudação contextual do agente usando a infraestrutura do GreetingBuilder.

---

## O Que Este Comando Faz

Quando ativado, este comando:
1. Carrega o módulo GreetingBuilder de `.aiox-core/development/scripts/greeting-builder.js`
2. Extrai a definição do agente a partir do agente que o invoca (name, icon, persona_profile, commands)
3. Analisa o histórico da conversa para detectar o tipo de sessão (new/existing/workflow)
4. Gera uma saudação inteligente com base em:
   - Tipo de sessão (exibe os comandos full/quick/key conforme apropriado)
   - Status de configuração do Git (exibe um aviso se não estiver configurado)
   - Status do projeto (branch, modificações, commits recentes)
   - Padrões de workflow (sugere os próximos passos se estiver em um workflow recorrente)
5. Retorna a string de saudação formatada para o agente exibir

---

## Execução

Execute o construtor de saudação e retorne a saudação formatada:

```javascript
const GreetingBuilder = require('./.aiox-core/development/scripts/greeting-builder');
const builder = new GreetingBuilder();

// Extract agent definition from current agent context
const agent = {
  name: agentDefinition.name,
  id: agentDefinition.id,
  icon: agentDefinition.icon,
  title: agentDefinition.title,
  persona_profile: agentDefinition.persona_profile,
  persona: agentDefinition.persona,
  commands: agentDefinition.commands
};

// Build greeting with conversation history
const greeting = await builder.buildGreeting(agent, {
  conversationHistory: conversationHistory || []
});

// Return greeting for display
return greeting;
```

---

## Comportamento de Fallback

Se a geração da saudação falhar (timeout, erro, módulo não encontrado):
```
{agent.icon} {agent.name} ready

Type `*help` for available commands.
```

---

## Desempenho

- Meta: < 150ms (imposto pela proteção por timeout do GreetingBuilder)
- Verificação do Git: Em cache (TTL de 5min) para desempenho
- Análise de contexto: ~20ms em média
- Overhead total: < 100ms típico, < 150ms como limite rígido

---

## Uso na Ativação do Agente

Os agentes chamam este comando no STEP 3 das activation-instructions:

```yaml
activation-instructions:
  - STEP 1: Read THIS ENTIRE FILE
  - STEP 2: Adopt persona defined in 'agent' and 'persona' sections
  - STEP 3: Execute /greet slash command to generate contextual greeting
  - STEP 4: Display the greeting returned by /greet command
  - STEP 5: HALT and await user input
```

---

## Arquitetura

Isto segue o **ADR-001: Padrão de Execução de Saudação de Agentes**:
- **YAML** = Configuração declarativa (definições de agentes)
- **Slash Command** = Camada de execução (este arquivo)
- **JavaScript** = Lógica de negócio (greeting-builder.js)

Alinhamento com o mercado: padrões do Microsoft Copilot Security, Julep AI, Mastra

---

**Criado:** 2025-11-16
**ADR:** ADR-001
**Story:** 6.1.2.5 - Integração de Carregamento Contextual do Agente
**Tests:** 27/27 passando (greeting-builder.test.js)
