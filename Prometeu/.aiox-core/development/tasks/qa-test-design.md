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
task: qaTestDesign()
responsável: Quinn (Guardian)
responsavel_type: Agente
atomic_layer: Config

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
duration_expected: 2-10 min (estimated)
cost_estimated: $0.001-0.008
token_usage: ~800-2,500 tokens
```

**Notas de Otimização:**
- Validar a configuração cedo; usar escritas atômicas; implementar checkpoints de rollback

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
  - browser           # E2E testing and UI scenario validation
  - context7          # Research testing frameworks and patterns
  - github-cli        # Test report generation and tracking
checklists:
  - qa-master-checklist.md
---

# test-design

Cria cenários de teste abrangentes com recomendações apropriadas de nível de teste para a implementação da story.

## Entradas

```yaml
required:
  - story_id: '{epic}.{story}' # e.g., "1.3"
  - story_path: '{devStoryLocation}/{epic}.{story}.*.md' # Path from core-config.yaml
  - story_title: '{title}' # If missing, derive from story file H1
  - story_slug: '{slug}' # If missing, derive from title (lowercase, hyphenated)
```

## Propósito

Projetar uma estratégia de teste completa que identifique o que testar, em qual nível (unit/integration/e2e) e por quê. Isso garante uma cobertura de teste eficiente sem redundância, mantendo limites de teste apropriados.

## Dependências

```yaml
data:
  - test-levels-framework.md # Unit/Integration/E2E decision criteria
  - test-priorities-matrix.md # P0/P1/P2/P3 classification system
```

## Processo

### 1. Analisar os Requisitos da Story

Decomponha cada critério de aceite em cenários testáveis. Para cada AC:

- Identifique a funcionalidade central a testar
- Determine as variações de dados necessárias
- Considere as condições de erro
- Anote os casos extremos (edge cases)

### 2. Aplicar o Framework de Nível de Teste

**Referência:** Carregue `test-levels-framework.md` para critérios detalhados

Regras rápidas:

- **Unit**: Lógica pura, algoritmos, cálculos
- **Integration**: Interações entre componentes, operações de DB
- **E2E**: Jornadas críticas do usuário, conformidade

### 3. Atribuir Prioridades

**Referência:** Carregue `test-priorities-matrix.md` para classificação

Atribuição rápida de prioridade:

- **P0**: Crítico para receita, segurança, conformidade
- **P1**: Jornadas centrais do usuário, frequentemente usadas
- **P2**: Funcionalidades secundárias, funções de admin
- **P3**: Bom ter, raramente usado

### 4. Projetar Cenários de Teste

Para cada necessidade de teste identificada, crie:

```yaml
test_scenario:
  id: '{epic}.{story}-{LEVEL}-{SEQ}'
  requirement: 'AC reference'
  priority: P0|P1|P2|P3
  level: unit|integration|e2e
  description: 'What is being tested'
  justification: 'Why this level was chosen'
  mitigates_risks: ['RISK-001'] # If risk profile exists
```

### 5. Validar Cobertura

Garanta:

- Cada AC tem ao menos um teste
- Sem cobertura duplicada entre níveis
- Caminhos críticos têm múltiplos níveis
- Mitigações de risco são tratadas

## Saídas

### Saída 1: Documento de Design de Teste

**Salvar em:** `qa.qaLocation/assessments/{epic}.{story}-test-design-{YYYYMMDD}.md`

```markdown
# Test Design: Story {epic}.{story}

Date: {date}
Designer: Quinn (Test Architect)

## Test Strategy Overview

- Total test scenarios: X
- Unit tests: Y (A%)
- Integration tests: Z (B%)
- E2E tests: W (C%)
- Priority distribution: P0: X, P1: Y, P2: Z

## Test Scenarios by Acceptance Criteria

### AC1: {description}

#### Scenarios

| ID           | Level       | Priority | Test                      | Justification            |
| ------------ | ----------- | -------- | ------------------------- | ------------------------ |
| 1.3-UNIT-001 | Unit        | P0       | Validate input format     | Pure validation logic    |
| 1.3-INT-001  | Integration | P0       | Service processes request | Multi-component flow     |
| 1.3-E2E-001  | E2E         | P1       | User completes journey    | Critical path validation |

[Continue for all ACs...]

## Risk Coverage

[Map test scenarios to identified risks if risk profile exists]

## Recommended Execution Order

1. P0 Unit tests (fail fast)
2. P0 Integration tests
3. P0 E2E tests
4. P1 tests in order
5. P2+ as time permits
```

### Saída 2: Bloco YAML do Gate

Gere para inclusão no quality gate:

```yaml
test_design:
  scenarios_total: X
  by_level:
    unit: Y
    integration: Z
    e2e: W
  by_priority:
    p0: A
    p1: B
    p2: C
  coverage_gaps: [] # List any ACs without tests
```

### Saída 3: Referências de Trace

Imprima para uso pela task trace-requirements:

```text
Test design matrix: qa.qaLocation/assessments/{epic}.{story}-test-design-{YYYYMMDD}.md
P0 tests identified: {count}
```

## Checklist de Qualidade

Antes de finalizar, verifique:

- [ ] Cada AC tem cobertura de teste
- [ ] Os níveis de teste são apropriados (sem testar em excesso)
- [ ] Sem cobertura duplicada entre níveis
- [ ] Prioridades alinhadas com o risco de negócio
- [ ] Os IDs de teste seguem a convenção de nomenclatura
- [ ] Os cenários são atômicos e independentes

## Princípios Chave

- **Shift left**: Prefira unit sobre integration, integration sobre E2E
- **Baseado em risco**: Foque no que pode dar errado
- **Cobertura eficiente**: Teste uma vez no nível certo
- **Manutenibilidade**: Considere a manutenção de teste a longo prazo
- **Feedback rápido**: Testes rápidos rodam primeiro
