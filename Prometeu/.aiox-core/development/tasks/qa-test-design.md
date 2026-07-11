---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

<!--
## Modos de ExecuÃ§Ã£o

**Escolha seu modo de execuÃ§Ã£o:**

### 1. Modo YOLO - RÃ¡pido, AutÃ´nomo (0-1 prompts)
- Tomada de decisÃ£o autÃ´noma com registro em log
- InteraÃ§Ã£o mÃ­nima com o usuÃ¡rio
- **Melhor para:** Tarefas simples e determinÃ­sticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃƒO]**
- Checkpoints explÃ­citos de decisÃ£o
- ExplicaÃ§Ãµes educativas
- **Melhor para:** Aprendizado, decisÃµes complexas

### 3. Planejamento Pre-Flight - Planejamento Antecipado Abrangente
- Fase de anÃ¡lise da tarefa (identificar todas as ambiguidades)
- ExecuÃ§Ã£o sem ambiguidade
- **Melhor para:** Requisitos ambÃ­guos, trabalho crÃ­tico

**ParÃ¢metro:** `mode` (opcional, padrÃ£o: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: qaTestDesign()
responsÃ¡vel: Quinn (Guardian)
responsavel_type: Agente
atomic_layer: Config

**Entrada:**
- campo: target
  tipo: string
  origem: User Input
  obrigatÃ³rio: true
  validaÃ§Ã£o: Must exist

- campo: criteria
  tipo: array
  origem: config
  obrigatÃ³rio: true
  validaÃ§Ã£o: Non-empty validation criteria

- campo: strict
  tipo: boolean
  origem: User Input
  obrigatÃ³rio: false
  validaÃ§Ã£o: Default: true

**SaÃ­da:**
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

## PrÃ©-CondiÃ§Ãµes

**PropÃ³sito:** Validar os prÃ©-requisitos ANTES da execuÃ§Ã£o da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Validation rules loaded; target available for validation
    tipo: pre-condition
    blocker: true
    validaÃ§Ã£o: |
      Check validation rules loaded; target available for validation
    error_message: "PrÃ©-condiÃ§Ã£o falhou: regras de validaÃ§Ã£o carregadas; alvo disponÃ­vel para validaÃ§Ã£o"
```

---

## PÃ³s-CondiÃ§Ãµes

**PropÃ³sito:** Validar o sucesso da execuÃ§Ã£o APÃ“S a conclusÃ£o da task

**Checklist:**

```yaml
post-conditions:
  - [ ] Validation executed; results accurate; report generated
    tipo: post-condition
    blocker: true
    validaÃ§Ã£o: |
      Verify validation executed; results accurate; report generated
    error_message: "PÃ³s-condiÃ§Ã£o falhou: validaÃ§Ã£o executada; resultados precisos; relatÃ³rio gerado"
```

---

## CritÃ©rios de Aceite

**PropÃ³sito:** CritÃ©rios definitivos de aprovaÃ§Ã£o/reprovaÃ§Ã£o para a conclusÃ£o da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Validation rules applied; pass/fail accurate; actionable feedback
    tipo: acceptance-criterion
    blocker: true
    validaÃ§Ã£o: |
      Assert validation rules applied; pass/fail accurate; actionable feedback
    error_message: "CritÃ©rio de aceite nÃ£o atendido: regras de validaÃ§Ã£o aplicadas; aprovaÃ§Ã£o/reprovaÃ§Ã£o precisa; feedback acionÃ¡vel"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Tool:** validation-engine
  - **PropÃ³sito:** ValidaÃ§Ã£o baseada em regras e geraÃ§Ã£o de relatÃ³rios
  - **Source:** .aiox-core/utils/validation-engine.js

- **Tool:** schema-validator
  - **PropÃ³sito:** ValidaÃ§Ã£o de schema JSON/YAML
  - **Source:** ajv ou similar

---

## Scripts

**CÃ³digo especÃ­fico do agente para esta task:**

- **Script:** run-validation.js
  - **PropÃ³sito:** Executar regras de validaÃ§Ã£o e gerar relatÃ³rio
  - **Language:** JavaScript
  - **Location:** .aiox-core/scripts/run-validation.js

---

## Tratamento de Erros

**EstratÃ©gia:** retry

**Erros Comuns:**

1. **Erro:** CritÃ©rios de ValidaÃ§Ã£o Ausentes
   - **Causa:** Regras de validaÃ§Ã£o obrigatÃ³rias nÃ£o definidas
   - **ResoluÃ§Ã£o:** Garantir que os critÃ©rios de validaÃ§Ã£o sejam carregados da config
   - **RecuperaÃ§Ã£o:** Usar regras de validaÃ§Ã£o padrÃ£o, registrar aviso

2. **Erro:** Schema InvÃ¡lido
   - **Causa:** O alvo nÃ£o corresponde ao schema esperado
   - **ResoluÃ§Ã£o:** Atualizar o schema ou corrigir a estrutura do alvo
   - **RecuperaÃ§Ã£o:** RelatÃ³rio detalhado de erro de validaÃ§Ã£o

3. **Erro:** DependÃªncia Ausente
   - **Causa:** DependÃªncia obrigatÃ³ria para a validaÃ§Ã£o nÃ£o encontrada
   - **ResoluÃ§Ã£o:** Instalar as dependÃªncias ausentes
   - **RecuperaÃ§Ã£o:** Abortar com lista clara de dependÃªncias

---

## Performance

**MÃ©tricas Esperadas:**

```yaml
duration_expected: 2-10 min (estimated)
cost_estimated: $0.001-0.008
token_usage: ~800-2,500 tokens
```

**Notas de OtimizaÃ§Ã£o:**
- Validar a configuraÃ§Ã£o cedo; usar escritas atÃ´micas; implementar checkpoints de rollback

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

 Powered by AIOXâ„¢ Core -->

---
tools:
  - browser           # E2E testing and UI scenario validation
  - context7          # Research testing frameworks and patterns
  - github-cli        # Test report generation and tracking
checklists:
  - qa-master-checklist.md
---

# test-design

Cria cenÃ¡rios de teste abrangentes com recomendaÃ§Ãµes apropriadas de nÃ­vel de teste para a implementaÃ§Ã£o da story.

## Entradas

```yaml
required:
  - story_id: '{epic}.{story}' # e.g., "1.3"
  - story_path: '{devStoryLocation}/{epic}.{story}.*.md' # Path from core-config.yaml
  - story_title: '{title}' # If missing, derive from story file H1
  - story_slug: '{slug}' # If missing, derive from title (lowercase, hyphenated)
```

## PropÃ³sito

Projetar uma estratÃ©gia de teste completa que identifique o que testar, em qual nÃ­vel (unit/integration/e2e) e por quÃª. Isso garante uma cobertura de teste eficiente sem redundÃ¢ncia, mantendo limites de teste apropriados.

## DependÃªncias

```yaml
data:
  - test-levels-framework.md # Unit/Integration/E2E decision criteria
  - test-priorities-matrix.md # P0/P1/P2/P3 classification system
```

## Processo

### 1. Analisar os Requisitos da Story

Decomponha cada critÃ©rio de aceite em cenÃ¡rios testÃ¡veis. Para cada AC:

- Identifique a funcionalidade central a testar
- Determine as variaÃ§Ãµes de dados necessÃ¡rias
- Considere as condiÃ§Ãµes de erro
- Anote os casos extremos (edge cases)

### 2. Aplicar o Framework de NÃ­vel de Teste

**ReferÃªncia:** Carregue `test-levels-framework.md` para critÃ©rios detalhados

Regras rÃ¡pidas:

- **Unit**: LÃ³gica pura, algoritmos, cÃ¡lculos
- **Integration**: InteraÃ§Ãµes entre componentes, operaÃ§Ãµes de DB
- **E2E**: Jornadas crÃ­ticas do usuÃ¡rio, conformidade

### 3. Atribuir Prioridades

**ReferÃªncia:** Carregue `test-priorities-matrix.md` para classificaÃ§Ã£o

AtribuiÃ§Ã£o rÃ¡pida de prioridade:

- **P0**: CrÃ­tico para receita, seguranÃ§a, conformidade
- **P1**: Jornadas centrais do usuÃ¡rio, frequentemente usadas
- **P2**: Funcionalidades secundÃ¡rias, funÃ§Ãµes de admin
- **P3**: Bom ter, raramente usado

### 4. Projetar CenÃ¡rios de Teste

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
- Sem cobertura duplicada entre nÃ­veis
- Caminhos crÃ­ticos tÃªm mÃºltiplos nÃ­veis
- MitigaÃ§Ãµes de risco sÃ£o tratadas

## SaÃ­das

### SaÃ­da 1: Documento de Design de Teste

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

### SaÃ­da 2: Bloco YAML do Gate

Gere para inclusÃ£o no quality gate:

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

### SaÃ­da 3: ReferÃªncias de Trace

Imprima para uso pela task trace-requirements:

```text
Test design matrix: qa.qaLocation/assessments/{epic}.{story}-test-design-{YYYYMMDD}.md
P0 tests identified: {count}
```

## Checklist de Qualidade

Antes de finalizar, verifique:

- [ ] Cada AC tem cobertura de teste
- [ ] Os nÃ­veis de teste sÃ£o apropriados (sem testar em excesso)
- [ ] Sem cobertura duplicada entre nÃ­veis
- [ ] Prioridades alinhadas com o risco de negÃ³cio
- [ ] Os IDs de teste seguem a convenÃ§Ã£o de nomenclatura
- [ ] Os cenÃ¡rios sÃ£o atÃ´micos e independentes

## PrincÃ­pios Chave

- **Shift left**: Prefira unit sobre integration, integration sobre E2E
- **Baseado em risco**: Foque no que pode dar errado
- **Cobertura eficiente**: Teste uma vez no nÃ­vel certo
- **Manutenibilidade**: Considere a manutenÃ§Ã£o de teste a longo prazo
- **Feedback rÃ¡pido**: Testes rÃ¡pidos rodam primeiro
