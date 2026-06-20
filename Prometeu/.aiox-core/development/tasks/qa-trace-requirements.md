<!--
## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com registro em log
- Interação mínima com o usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints explícitos de decisão
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pre-Flight - Planejamento Antecipado Abrangente
- Fase de análise da tarefa (identificar todas as ambiguidades)
- Execução sem ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Task Definition (AIOX Task Format V1.0)

```yaml
task: qaTraceRequirements()
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

**Propósito:** Validar os pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Validation rules loaded; target available for validation
    tipo: pre-condition
    blocker: true
    validação: |
      Check validation rules loaded; target available for validation
    error_message: "Pré-condição falhou: regras de validação carregadas; alvo disponível para validação"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a conclusão da task

**Checklist:**

```yaml
post-conditions:
  - [ ] Validation executed; results accurate; report generated
    tipo: post-condition
    blocker: true
    validação: |
      Verify validation executed; results accurate; report generated
    error_message: "Pós-condição falhou: validação executada; resultados precisos; relatório gerado"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de aprovação/reprovação para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Validation rules applied; pass/fail accurate; actionable feedback
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Assert validation rules applied; pass/fail accurate; actionable feedback
    error_message: "Critério de aceite não atendido: regras de validação aplicadas; aprovação/reprovação precisa; feedback acionável"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Tool:** validation-engine
  - **Propósito:** Validação baseada em regras e geração de relatórios
  - **Source:** .aiox-core/utils/validation-engine.js

- **Tool:** schema-validator
  - **Propósito:** Validação de schema JSON/YAML
  - **Source:** ajv ou similar

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** run-validation.js
  - **Propósito:** Executar regras de validação e gerar relatório
  - **Language:** JavaScript
  - **Location:** .aiox-core/scripts/run-validation.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Critérios de Validação Ausentes
   - **Causa:** Regras de validação obrigatórias não definidas
   - **Resolução:** Garantir que os critérios de validação sejam carregados da config
   - **Recuperação:** Usar regras de validação padrão, registrar aviso

2. **Erro:** Schema Inválido
   - **Causa:** O alvo não corresponde ao schema esperado
   - **Resolução:** Atualizar o schema ou corrigir a estrutura do alvo
   - **Recuperação:** Relatório detalhado de erro de validação

3. **Erro:** Dependência Ausente
   - **Causa:** Dependência obrigatória para a validação não encontrada
   - **Resolução:** Instalar as dependências ausentes
   - **Recuperação:** Abortar com lista clara de dependências

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 5-20 min (estimated)
cost_estimated: $0.003-0.015
token_usage: ~2,000-8,000 tokens
```

**Notas de Otimização:**
- Análise iterativa com limites de profundidade; cachear resultados intermediários; agrupar operações similares em lote

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

 Powered by AIOX™ Core -->

---
tools:
  - github-cli        # Requirements tracking and test coverage analysis
  - context7          # Research testing patterns and traceability best practices
checklists:
  - po-master-checklist.md
---

# trace-requirements

Mapeia os requisitos da story para casos de teste usando padrões Given-When-Then para rastreabilidade abrangente.

## Propósito

Criar uma matriz de rastreabilidade de requisitos que garanta que cada critério de aceite tenha cobertura de teste correspondente. Esta task ajuda a identificar lacunas nos testes e garante que todos os requisitos sejam validados.

**IMPORTANTE**: Given-When-Then é usado aqui para documentar o mapeamento entre requisitos e testes, NÃO para escrever o código de teste real. Os testes devem seguir os padrões de teste do seu projeto (sem sintaxe BDD no código de teste).

## Prerequisites

- Arquivo da story com critérios de aceite claros
- Acesso aos arquivos de teste ou especificações de teste
- Entendimento da implementação

## Processo de Rastreabilidade

### 1. Extrair Requisitos

Identifique todos os requisitos testáveis a partir de:

- Critérios de Aceite (fonte primária)
- Declaração da user story
- Tasks/subtasks com comportamentos específicos
- Requisitos não funcionais mencionados
- Casos extremos documentados

### 2. Mapear para Casos de Teste

Para cada requisito, documente quais testes o validam. Use Given-When-Then para descrever o que o teste valida (não como ele é escrito):

```yaml
requirement: 'AC1: User can login with valid credentials'
test_mappings:
  - test_file: 'auth/login.test.ts'
    test_case: 'should successfully login with valid email and password'
    # Given-When-Then describes WHAT the test validates, not HOW it's coded
    given: 'A registered user with valid credentials'
    when: 'They submit the login form'
    then: 'They are redirected to dashboard and session is created'
    coverage: full

  - test_file: 'e2e/auth-flow.test.ts'
    test_case: 'complete login flow'
    given: 'User on login page'
    when: 'Entering valid credentials and submitting'
    then: 'Dashboard loads with user data'
    coverage: integration
```

### 3. Análise de Cobertura

Avalie a cobertura de cada requisito:

**Níveis de Cobertura:**

- `full`: Requisito completamente testado
- `partial`: Alguns aspectos testados, há lacunas
- `none`: Nenhuma cobertura de teste encontrada
- `integration`: Coberto apenas em testes de integração/e2e
- `unit`: Coberto apenas em testes unitários

### 4. Identificação de Lacunas

Documente quaisquer lacunas encontradas:

```yaml
coverage_gaps:
  - requirement: 'AC3: Password reset email sent within 60 seconds'
    gap: 'No test for email delivery timing'
    severity: medium
    suggested_test:
      type: integration
      description: 'Test email service SLA compliance'

  - requirement: 'AC5: Support 1000 concurrent users'
    gap: 'No load testing implemented'
    severity: high
    suggested_test:
      type: performance
      description: 'Load test with 1000 concurrent connections'
```

## Outputs

### Output 1: Bloco YAML do Gate

**Gere para colar no arquivo de gate sob `trace`:**

```yaml
trace:
  totals:
    requirements: X
    full: Y
    partial: Z
    none: W
  planning_ref: 'qa.qaLocation/assessments/{epic}.{story}-test-design-{YYYYMMDD}.md'
  uncovered:
    - ac: 'AC3'
      reason: 'No test found for password reset timing'
  notes: 'See qa.qaLocation/assessments/{epic}.{story}-trace-{YYYYMMDD}.md'
```

### Output 2: Relatório de Rastreabilidade

**Salvar em:** `qa.qaLocation/assessments/{epic}.{story}-trace-{YYYYMMDD}.md`

Crie um relatório de rastreabilidade com:

```markdown
# Requirements Traceability Matrix

## Story: {epic}.{story} - {title}

### Coverage Summary

- Total Requirements: X
- Fully Covered: Y (Z%)
- Partially Covered: A (B%)
- Not Covered: C (D%)

### Requirement Mappings

#### AC1: {Acceptance Criterion 1}

**Coverage: FULL**

Given-When-Then Mappings:

- **Unit Test**: `auth.service.test.ts::validateCredentials`
  - Given: Valid user credentials
  - When: Validation method called
  - Then: Returns true with user object

- **Integration Test**: `auth.integration.test.ts::loginFlow`
  - Given: User with valid account
  - When: Login API called
  - Then: JWT token returned and session created

#### AC2: {Acceptance Criterion 2}

**Coverage: PARTIAL**

[Continue for all ACs...]

### Critical Gaps

1. **Performance Requirements**
   - Gap: No load testing for concurrent users
   - Risk: High - Could fail under production load
   - Action: Implement load tests using k6 or similar

2. **Security Requirements**
   - Gap: Rate limiting not tested
   - Risk: Medium - Potential DoS vulnerability
   - Action: Add rate limit tests to integration suite

### Test Design Recommendations

Based on gaps identified, recommend:

1. Additional test scenarios needed
2. Test types to implement (unit/integration/e2e/performance)
3. Test data requirements
4. Mock/stub strategies

### Risk Assessment

- **High Risk**: Requirements with no coverage
- **Medium Risk**: Requirements with only partial coverage
- **Low Risk**: Requirements with full unit + integration coverage
```

## Boas Práticas de Rastreabilidade

### Given-When-Then para Mapeamento (Não Código de Teste)

Use Given-When-Then para documentar o que cada teste valida:

**Given**: O contexto inicial que o teste configura

- Qual estado/dado o teste prepara
- Contexto de usuário sendo simulado
- Pré-condições do sistema

**When**: A ação que o teste executa

- O que o teste executa
- Chamadas de API ou ações de usuário testadas
- Eventos disparados

**Then**: O que o teste verifica (assert)

- Resultados esperados verificados
- Mudanças de estado checadas
- Valores validados

**Nota**: Isto é apenas para documentação. O código de teste real segue os padrões do seu projeto (ex.: blocos describe/it, sem sintaxe BDD).

### Prioridade de Cobertura

Priorize a cobertura com base em:

1. Fluxos de negócio críticos
2. Requisitos relacionados à segurança
3. Requisitos de integridade de dados
4. Funcionalidades voltadas ao usuário
5. SLAs de performance

### Granularidade de Teste

Mapeie nos níveis apropriados:

- Testes unitários para lógica de negócio
- Testes de integração para interação entre componentes
- Testes E2E para jornadas do usuário
- Testes de performance para NFRs

## Indicadores de Qualidade

Boa rastreabilidade mostra:

- Cada AC tem ao menos um teste
- Caminhos críticos têm múltiplos níveis de teste
- Casos extremos são explicitamente cobertos
- NFRs têm tipos de teste apropriados
- Given-When-Then claro para cada teste

## Sinais de Alerta (Red Flags)

Fique atento a:

- ACs sem cobertura de teste
- Testes que não mapeiam para requisitos
- Descrições de teste vagas
- Cobertura ausente de casos extremos
- NFRs sem testes específicos

## Integração com Gates

Esta rastreabilidade alimenta os quality gates:

- Lacunas críticas → FAIL
- Lacunas menores → CONCERNS
- Testes P0 ausentes do test-design → CONCERNS

### Output 3: Linha de Hook da Story

**Imprima esta linha para a task de revisão citar:**

```text
Trace matrix: qa.qaLocation/assessments/{epic}.{story}-trace-{YYYYMMDD}.md
```

- Cobertura completa → contribuição para PASS

## Princípios Chave

- Todo requisito deve ser testável
- Use Given-When-Then para clareza
- Identifique tanto a presença quanto a ausência
- Priorize com base no risco
- Torne as recomendações acionáveis
