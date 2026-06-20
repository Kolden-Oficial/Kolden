---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com logging
- Interação mínima com o usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Balanceado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pre-Flight - Planejamento Abrangente Antecipado
- Fase de análise da task (identificar todas as ambiguidades)
- Execução sem ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Task Definition (AIOX Task Format V1.0)

```yaml
task: brownfieldCreateStory()
responsável: Pax (Balancer)
responsavel_type: Agente
atomic_layer: Organism

**Entrada:**
- campo: task
  tipo: string
  origem: Entrada do Usuário
  obrigatório: true
  validação: Deve ser uma task registrada

- campo: parameters
  tipo: object
  origem: Entrada do Usuário
  obrigatório: false
  validação: Parâmetros de task válidos

- campo: mode
  tipo: string
  origem: Entrada do Usuário
  obrigatório: false
  validação: yolo|interactive|pre-flight

**Saída:**
- campo: execution_result
  tipo: object
  destino: Memória
  persistido: false

- campo: logs
  tipo: array
  destino: File (.ai/logs/*)
  persistido: true

- campo: state
  tipo: object
  destino: Gerenciamento de estado
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
      Verificar que task está registrada; parâmetros obrigatórios fornecidos; dependências atendidas
    error_message: "Pré-condição falhou: Task está registrada; parâmetros obrigatórios fornecidos; dependências atendidas"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a task ser concluída

**Checklist:**

```yaml
post-conditions:
  - [ ] Task concluída; código de saída 0; saídas esperadas criadas
    tipo: post-condition
    blocker: true
    validação: |
      Verificar que task concluída; código de saída 0; saídas esperadas criadas
    error_message: "Pós-condição falhou: Task concluída; código de saída 0; saídas esperadas criadas"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de aprovação/reprovação para conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Task concluída conforme esperado; efeitos colaterais documentados
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Afirmar que task concluída conforme esperado; efeitos colaterais documentados
    error_message: "Critério de aceite não atendido: Task concluída conforme esperado; efeitos colaterais documentados"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** task-runner
  - **Propósito:** Execução e orquestração de tasks
  - **Fonte:** .aiox-core/core/task-runner.js

- **Ferramenta:** logger
  - **Propósito:** Logging de execução e rastreamento de erros
  - **Fonte:** .aiox-core/utils/logger.js

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

1. **Erro:** Task Não Encontrada
   - **Causa:** Task especificada não registrada no sistema
   - **Resolução:** Verificar o nome e o registro da task
   - **Recuperação:** Listar tasks disponíveis, sugerir similares

2. **Erro:** Parâmetros Inválidos
   - **Causa:** Parâmetros da task não correspondem ao schema esperado
   - **Resolução:** Validar parâmetros contra a definição da task
   - **Recuperação:** Fornecer template de parâmetros, rejeitar a execução

3. **Erro:** Timeout de Execução
   - **Causa:** Task excede o tempo máximo de execução
   - **Resolução:** Otimizar a task ou aumentar o timeout
   - **Recuperação:** Encerrar a task, limpar recursos, registrar o estado

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 5-15 min (estimated)
cost_estimated: $0.003-0.010
token_usage: ~3,000-10,000 tokens
```

**Notas de Otimização:**
- Quebrar em workflows menores; implementar checkpointing; usar processamento assíncrono onde possível

---

## Metadata

```yaml
story: N/A
version: 1.0.0
dependencies:
  - N/A
tags:
  - creation
  - setup
updated_at: 2025-11-17
```

---

tools:
  - github-cli
checklists:
  - po-master-checklist.md
---

# Create Brownfield Story Task

## Propósito

Criar uma única user story para melhorias brownfield muito pequenas que possam ser concluídas em uma única sessão de desenvolvimento focada. Esta task é para adições mínimas ou correções de bugs que exigem consciência da integração com o sistema existente.

## Quando Usar Esta Task

**Use esta task quando:**

- A melhoria pode ser concluída em uma única story
- Nenhuma nova arquitetura ou design significativo é necessário
- A mudança segue exatamente os padrões existentes
- A integração é direta e com risco mínimo
- A mudança é isolada com limites claros

**Use brownfield-create-epic quando:**

- A melhoria requer 2-3 stories coordenadas
- Algum trabalho de design é necessário
- Múltiplos pontos de integração estão envolvidos

**Use o processo completo de PRD/Arquitetura brownfield quando:**

- A melhoria requer múltiplas stories coordenadas
- Planejamento arquitetural é necessário
- Trabalho de integração significativo é requerido

## Instruções

### 1. Avaliação Rápida do Projeto

Reúna contexto mínimo mas essencial sobre o projeto existente:

**Contexto do Sistema Atual:**

- [ ] Funcionalidade existente relevante identificada
- [ ] Stack de tecnologia para esta área anotada
- [ ] Ponto(s) de integração claramente compreendido(s)
- [ ] Padrões existentes para trabalho similar identificados

**Escopo da Mudança:**

- [ ] Mudança específica claramente definida
- [ ] Limites de impacto identificados
- [ ] Critérios de sucesso estabelecidos

### 2. Story Creation

Create a single focused story following this structure:

#### Story Title

{{Specific Enhancement}} - Brownfield Addition

#### User Story

As a {{user type}},
I want {{specific action/capability}},
So that {{clear benefit/value}}.

#### Story Context

**Existing System Integration:**

- Integrates with: {{existing component/system}}
- Technology: {{relevant tech stack}}
- Follows pattern: {{existing pattern to follow}}
- Touch points: {{specific integration points}}

#### Acceptance Criteria

**Functional Requirements:**

1. {{Primary functional requirement}}
2. {{Secondary functional requirement (if any)}}
3. {{Integration requirement}}

**Integration Requirements:** 4. Existing {{relevant functionality}} continues to work unchanged 5. New functionality follows existing {{pattern}} pattern 6. Integration with {{system/component}} maintains current behavior

**Quality Requirements:** 7. Change is covered by appropriate tests 8. Documentation is updated if needed 9. No regression in existing functionality verified

#### Technical Notes

- **Integration Approach:** {{how it connects to existing system}}
- **Existing Pattern Reference:** {{link or description of pattern to follow}}
- **Key Constraints:** {{any important limitations or requirements}}

#### Definition of Done

- [ ] Functional requirements met
- [ ] Integration requirements verified
- [ ] Existing functionality regression tested
- [ ] Code follows existing patterns and standards
- [ ] Tests pass (existing and new)
- [ ] Documentation updated if applicable

### 3. Risk and Compatibility Check

**Minimal Risk Assessment:**

- **Primary Risk:** {{main risk to existing system}}
- **Mitigation:** {{simple mitigation approach}}
- **Rollback:** {{how to undo if needed}}

**Compatibility Verification:**

- [ ] No breaking changes to existing APIs
- [ ] Database changes (if any) are additive only
- [ ] UI changes follow existing design patterns
- [ ] Performance impact is negligible

### 4. Validation Checklist

Before finalizing the story, confirm:

**Scope Validation:**

- [ ] Story can be completed in one development session
- [ ] Integration approach is straightforward
- [ ] Follows existing patterns exactly
- [ ] No design or architecture work required

**Clarity Check:**

- [ ] Story requirements are unambiguous
- [ ] Integration points are clearly specified
- [ ] Success criteria are testable
- [ ] Rollback approach is simple

## Success Criteria

The story creation is successful when:

1. Enhancement is clearly defined and appropriately scoped for single session
2. Integration approach is straightforward and low-risk
3. Existing system patterns are identified and will be followed
4. Rollback plan is simple and feasible
5. Acceptance criteria include existing functionality verification

## Important Notes

- This task is for VERY SMALL brownfield changes only
- If complexity grows during analysis, escalate to brownfield-create-epic
- Always prioritize existing system integrity
- When in doubt about integration complexity, use brownfield-create-epic instead
- Stories should take no more than 4 hours of focused development work

## Handoff
next_agent: @po
next_command: *validate-story-draft {story-id}
condition: Brownfield story created from assessment
alternatives:
  - agent: @sm, command: *draft, condition: Need additional stories from same assessment
 