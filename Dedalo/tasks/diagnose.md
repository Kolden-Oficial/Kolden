---
tipo: nota
area: Dedalo
up: "[[Dedalo/_MOC-dedalo]]"
relacionado:
  - "[[Dedalo/tasks/_indice|_indice]]"
---

# Tarefa: Diagnosticar Pergunta sobre Claude Code

**Task ID:** CCM-CHIEF-001
**Version:** 1.0.0
**Command:** `*diagnose`
**Orchestrator:** Orion (claude-mastery-chief)
**Purpose:** Triar perguntas e problemas sobre Claude Code, fornecer uma resposta rápida e rotear para o agente especialista apropriado quando houver necessidade de expertise específica de domínio.

---

## Visão Geral

```
  Pergunta do Usuário
       |
       v
  +------------------+
  | 1. Analisar Pedido|
  |    Extrair palavras|
  |    -chave          |
  +------------------+
       |
       v
  +------------------+
  | 2. Casar com a    |
  |    Matriz de       |
  |    Roteamento      |
  +------------------+
       |
       +-------+-------+
       |               |
       v               v
  Transversal      Específico de domínio
       |               |
       v               v
  +----------+    +------------------+
  | 3a.       |   | 3b. Resposta     |
  | Responder |   |  Rápida          |
  | Direto    |   |  + Rotear ao     |
  +----------+    |  Especialista     |
       |          +------------------+
       v               |
  +------------------+ |
  | 4. Emitir        | <+
  |    Relatório     |
  +------------------+
```

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| question | string | Prompt do usuário | Sim | Pergunta ou descrição de problema em linguagem natural não vazia |
| context | object | Estado da sessão | Não | História ativa, branch, erros recentes se disponíveis |

---

## Pré-condições

- O squad Claude Code Mastery está ativo com Orion como agente de entrada
- A matriz de roteamento está carregada a partir da definição do agente (triage.routing_matrix)
- Todos os 7 agentes especialistas estão registrados em config.yaml

---

## Fases de Execução

### Fase 1: Analisar o Pedido (Extração de Palavras-chave)

1. Analise a pergunta ou a descrição do problema do usuário
2. Extraia as palavras-chave primárias e os sinais de intenção
3. Identifique a categoria do pedido:
   - É uma pergunta de "como fazer"?
   - É um problema de depuração/resolução de problemas?
   - É um pedido de instalação/configuração?
   - É uma pergunta conceitual/de comparação?
4. Anote quaisquer domínios secundários que possam ser relevantes

### Fase 2: Casar com a Matriz de Roteamento

Aplique a correspondência de palavras-chave contra os 7 domínios especialistas:

| Domínio | Palavras-chave | Rotear Para | Persona |
|--------|----------|----------|---------|
| hooks | hook, pre_tool_use, post_tool_use, lifecycle, intercept, block, exit code, automation pipeline, pre_compact, notification, damage control | hooks-architect | Latch |
| mcp | mcp, server, tool search, stdio, sse, http streamable, mcp__, context7, exa, docker gateway, add server | mcp-integrator | Piper |
| subagents | subagent, agent team, swarm, teammate, worktree, parallel, background agent, spawn, multi-agent, TeammateTool | swarm-orchestrator | Nexus |
| config | settings, permission, CLAUDE.md, rules, sandbox, managed, enterprise, allow, deny, keybinding, context window, compaction | config-engineer | Sigil |
| skills | skill, command, plugin, SKILL.md, slash command, context engineering, spec-driven, .claude/commands, .claude/skills, marketplace | skill-craftsman | Anvil |
| integration | integrate, repository, project setup, CI/CD, headless, brownfield, monorepo, AIOS, git workflow | project-integrator | Conduit |
| roadmap | update, changelog, version, roadmap, new feature, what changed, migration, upgrade, adoption | roadmap-sentinel | Vigil |

**Regras de pontuação:**
- Conte as correspondências de palavras-chave por domínio
- Se um domínio pontuar significativamente mais alto (2+ correspondências acima dos demais), roteie para lá
- Se vários domínios empatarem ou a pergunta abranger vários domínios, trate como transversal
- Se nenhum domínio corresponder fortemente, trate como transversal (Orion responde diretamente)

### Fase 3a: Resposta Transversal (Direta)

Se a pergunta for transversal ou geral:

1. Sintetize o conhecimento da seção quick_reference e da consciência sobre AIOS
2. Forneça uma resposta completa e acionável
3. Referencie os agentes especialistas relevantes que o usuário pode consultar para uma exploração mais profunda
4. Inclua trechos de código, exemplos de configuração ou tabelas de referência conforme apropriado

### Fase 3b: Resposta Específica de Domínio (Rápida + Roteamento)

Se a pergunta mapear para um domínio específico:

1. **Forneça primeiro uma resposta rápida** -- Nunca roteie sem entregar valor imediato
   - Responda à pergunta em um nível superficial (mínimo de 3-5 linhas)
   - Inclua um exemplo concreto (trecho de código, bloco de configuração ou comando)
2. **Roteie para o especialista** para uma expertise mais profunda:
   - Nomeie o agente especialista e a persona
   - Explique qual profundidade adicional o especialista pode oferecer
   - Forneça o comando de ativação: `@claude-code-mastery:{agent-id}`
   - Sugira um comando específico do especialista, se aplicável (ex.: `*create-hook`, `*audit-settings`)

### Fase 4: Avaliação de Confiança

Classifique a confiança do diagnóstico:

| Confiança | Critérios | Ação |
|------------|----------|--------|
| ALTA | 3+ correspondências de palavras-chave em um domínio, intenção clara | Rotear com confiança |
| MÉDIA | 1-2 correspondências, intenção ambígua | Fornecer resposta + sugerir 2 especialistas possíveis |
| BAIXA | Nenhuma correspondência clara de domínio | Responder diretamente, fazer pergunta de esclarecimento |

---

## Formato de Saída

```markdown
## Diagnóstico

**Categoria:** {nome-do-domínio | transversal}
**Confiança:** {ALTA | MÉDIA | BAIXA}
**Especialista:** {nome-da-persona} ({agent-id}) | Resposta Direta

### Resposta Rápida

{resposta de 3-10 linhas com exemplo concreto}

### Próximo Passo Recomendado

{instrução de roteamento OU pergunta de acompanhamento para esclarecimento}
```

---

## Condições de Veto

- **NUNCA** roteie para um especialista sem fornecer ao menos uma resposta rápida primeiro. O usuário deve receber valor imediato em toda interação com Orion.
- **NUNCA** roteie quando a confiança for BAIXA -- faça uma pergunta de esclarecimento em vez disso.
- **NUNCA** carregue o arquivo de um agente especialista durante o diagnóstico. Forneça apenas instruções de roteamento para que o usuário ative o especialista.
- **NUNCA** adivinhe o domínio quando as palavras-chave forem ambíguas -- sintetize uma resposta transversal e deixe o usuário refinar.

---

## Critérios de Conclusão

- [ ] Pergunta do usuário analisada e palavras-chave extraídas
- [ ] Matriz de roteamento consultada com resultados pontuados
- [ ] Resposta rápida fornecida com exemplo concreto
- [ ] Roteamento ao especialista fornecido (se específico de domínio)
- [ ] Nível de confiança declarado na saída
