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

# Task: Criar Story Brownfield

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

### 2. Criação da Story

Crie uma única story focada seguindo esta estrutura:

#### Título da Story

{{Specific Enhancement}} - Brownfield Addition

#### História de Usuário (User Story)

Como {{user type}},
Eu quero {{specific action/capability}},
Para que {{clear benefit/value}}.

#### Contexto da Story

**Integração com Sistema Existente:**

- Integra com: {{existing component/system}}
- Tecnologia: {{relevant tech stack}}
- Segue o padrão: {{existing pattern to follow}}
- Pontos de contato: {{specific integration points}}

#### Critérios de Aceite

**Requisitos Funcionais:**

1. {{Primary functional requirement}}
2. {{Secondary functional requirement (if any)}}
3. {{Integration requirement}}

**Requisitos de Integração:** 4. O(A) {{relevant functionality}} existente continua funcionando sem alterações 5. A nova funcionalidade segue o padrão {{pattern}} existente 6. A integração com {{system/component}} mantém o comportamento atual

**Requisitos de Qualidade:** 7. A mudança é coberta por testes apropriados 8. A documentação é atualizada se necessário 9. Nenhuma regressão na funcionalidade existente verificada

#### Notas Técnicas

- **Abordagem de Integração:** {{how it connects to existing system}}
- **Referência de Padrão Existente:** {{link or description of pattern to follow}}
- **Restrições Principais:** {{any important limitations or requirements}}

#### Definição de Pronto (Definition of Done)

- [ ] Requisitos funcionais atendidos
- [ ] Requisitos de integração verificados
- [ ] Funcionalidade existente testada quanto a regressão
- [ ] Código segue os padrões e standards existentes
- [ ] Testes passam (existentes e novos)
- [ ] Documentação atualizada se aplicável

### 3. Verificação de Risco e Compatibilidade

**Avaliação de Risco Mínima:**

- **Risco Primário:** {{main risk to existing system}}
- **Mitigação:** {{simple mitigation approach}}
- **Rollback:** {{how to undo if needed}}

**Verificação de Compatibilidade:**

- [ ] Nenhuma breaking change nas APIs existentes
- [ ] Mudanças no banco de dados (se houver) são apenas aditivas
- [ ] Mudanças de UI seguem os padrões de design existentes
- [ ] Impacto de performance é negligenciável

### 4. Checklist de Validação

Antes de finalizar a story, confirme:

**Validação de Escopo:**

- [ ] A story pode ser concluída em uma sessão de desenvolvimento
- [ ] A abordagem de integração é direta
- [ ] Segue exatamente os padrões existentes
- [ ] Nenhum trabalho de design ou arquitetura é necessário

**Verificação de Clareza:**

- [ ] Os requisitos da story são inequívocos
- [ ] Os pontos de integração estão claramente especificados
- [ ] Os critérios de sucesso são testáveis
- [ ] A abordagem de rollback é simples

## Critérios de Sucesso

A criação da story é bem-sucedida quando:

1. A melhoria está claramente definida e apropriadamente dimensionada para uma única sessão
2. A abordagem de integração é direta e de baixo risco
3. Os padrões do sistema existente estão identificados e serão seguidos
4. O plano de rollback é simples e viável
5. Os critérios de aceite incluem a verificação da funcionalidade existente

## Notas Importantes

- Esta task é apenas para mudanças brownfield MUITO PEQUENAS
- Se a complexidade crescer durante a análise, escale para brownfield-create-epic
- Sempre priorize a integridade do sistema existente
- Em caso de dúvida sobre a complexidade da integração, use brownfield-create-epic
- Stories não devem levar mais do que 4 horas de trabalho de desenvolvimento focado

## Handoff
next_agent: @po
next_command: *validate-story-draft {story-id}
condition: Story brownfield criada a partir da avaliação
alternatives:
  - agent: @sm, command: *draft, condition: Necessário criar stories adicionais da mesma avaliação
 