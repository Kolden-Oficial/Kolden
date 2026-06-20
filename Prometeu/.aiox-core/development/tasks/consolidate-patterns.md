# Consolidate Patterns Using Intelligent Clustering

> Task ID: brad-consolidate-patterns
> Agent: Brad (Design System Architect)
> Version: 1.0.0

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com registro de logs
- Interação mínima com o usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pré-Voo - Planejamento Abrangente Antecipado
- Fase de análise da task (identificar todas as ambiguidades)
- Execução com zero ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: consolidatePatterns()
responsável: Aria (Visionary)
responsavel_type: Agente
atomic_layer: Strategy

**Entrada:**
- campo: task
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Deve ser uma task registrada

- campo: parameters
  tipo: object
  origem: User Input
  obrigatório: false
  validação: Parâmetros de task válidos

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
  - [ ] Task está registrada; parâmetros obrigatórios fornecidos; dependências atendidas
    tipo: pre-condition
    blocker: true
    validação: |
      Verificar se a task está registrada; parâmetros obrigatórios fornecidos; dependências atendidas
    error_message: "Pré-condição falhou: Task está registrada; parâmetros obrigatórios fornecidos; dependências atendidas"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a conclusão da task

**Checklist:**

```yaml
post-conditions:
  - [ ] Task concluída; exit code 0; saídas esperadas criadas
    tipo: post-condition
    blocker: true
    validação: |
      Verificar se a task foi concluída; exit code 0; saídas esperadas criadas
    error_message: "Pós-condição falhou: Task concluída; exit code 0; saídas esperadas criadas"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de pass/fail para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Task concluída conforme esperado; efeitos colaterais documentados
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Garantir que a task foi concluída conforme esperado; efeitos colaterais documentados
    error_message: "Critério de aceite não atendido: Task concluída conforme esperado; efeitos colaterais documentados"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Tool:** task-runner
  - **Purpose:** Execução e orquestração de tasks
  - **Source:** .aiox-core/core/task-runner.js

- **Tool:** logger
  - **Purpose:** Registro de logs de execução e rastreamento de erros
  - **Source:** .aiox-core/utils/logger.js

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** execute-task.js
  - **Purpose:** Wrapper genérico de execução de tasks
  - **Language:** JavaScript
  - **Location:** .aiox-core/scripts/execute-task.js

---

## Error Handling

**Strategy:** retry

**Common Errors:**

1. **Error:** Task Not Found
   - **Cause:** Specified task not registered in system
   - **Resolution:** Verify task name and registration
   - **Recovery:** List available tasks, suggest similar

2. **Error:** Invalid Parameters
   - **Cause:** Task parameters do not match expected schema
   - **Resolution:** Validate parameters against task definition
   - **Recovery:** Provide parameter template, reject execution

3. **Error:** Execution Timeout
   - **Cause:** Task exceeds maximum execution time
   - **Resolution:** Optimize task or increase timeout
   - **Recovery:** Kill task, cleanup resources, log state

---

## Performance

**Expected Metrics:**

```yaml
duration_expected: 5-20 min (estimated)
cost_estimated: $0.003-0.015
token_usage: ~2,000-8,000 tokens
```

**Optimization Notes:**
- Iterative analysis with depth limits; cache intermediate results; batch similar operations

---

## Metadata

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


## Description

Reduce UI pattern redundancy by clustering similar patterns using intelligent algorithms (HSL color clustering at 5% threshold, semantic button grouping). Target: >80% reduction.

## Prerequisites

- Audit completed (*audit command run successfully)
- .state.yaml exists with inventory results
- pattern-inventory.json available

## Workflow

### Interactive Elicitation

This task uses interactive elicitation to review consolidation decisions.

1. **Load Audit Results**
   - Read .state.yaml to get inventory data
   - Display current redundancy metrics
   - Confirm user wants to proceed with consolidation

2. **Review Clustering Parameters**
   - HSL threshold for colors (default: 5%)
   - Ask if user has manual overrides (patterns that shouldn't merge)
   - Confirm output directory

3. **Present Consolidation Recommendations**
   - Show before/after for each pattern type
   - Ask for approval or adjustments
   - Allow manual overrides before finalizing

### Steps

1. **Load Audit Data**
   - Read .state.yaml for inventory results
   - Validate audit phase completed
   - Extract pattern counts and scan path
   - Validation: State file exists and contains inventory data

2. **Cluster Colors by HSL Similarity**
   - Extract all unique colors from codebase
   - Convert hex to HSL color space
   - Group colors within 5% HSL threshold
   - Select most-used color in each cluster as primary
   - Identify semantic relationships (primary-dark as hover state)
   - Validation: Color clusters created with usage counts

3. **Cluster Button Patterns by Semantic Purpose**
   - Extract button class names and patterns
   - Analyze naming for semantic meaning (primary, secondary, danger, etc)
   - Group functionally equivalent buttons
   - Recommend minimal variant set (primary, secondary, destructive)
   - Validation: Button consolidation map created

4. **Consolidate Spacing Values**
   - Extract all padding and margin values
   - Identify base unit (4px or 8px)
   - Propose spacing scale (xs, sm, md, lg, xl, 2xl, 3xl)
   - Map existing values to scale
   - Validation: Spacing scale generated

5. **Consolidate Typography**
   - Extract font sizes, weights, families
   - Propose type scale (modular scale or fixed intervals)
   - Consolidate similar weights (merge 500 and 600 if both exist)
   - Recommend minimal font family set
   - Validation: Typography scale created

6. **Generate Consolidation Report**
   - Create consolidation-report.md with before/after metrics
   - Include reduction percentages for each pattern type
   - Generate detailed cluster files (color-clusters.txt, button-consolidation.txt)
   - Calculate overall reduction percentage
   - Validation: Report shows >80% reduction or explain why not

7. **Create Pattern Mapping**
   - Generate old-to-new mapping for each pattern type
   - Document which old patterns map to which new tokens
   - Create migration guide snippets
   - Validation: Complete mapping for all patterns

8. **Update State File**
   - Add consolidation section to .state.yaml
   - Record before/after counts for all pattern types
   - Update phase to "consolidation_complete"
   - Log Brad's consolidation decisions
   - Validation: State updated with consolidation data

## Output

- **consolidation-report.md**: Executive summary with reduction metrics
- **color-clusters.txt**: Detailed color groupings with usage counts
- **button-consolidation.txt**: Button semantic analysis and recommendations
- **spacing-consolidation.txt**: Spacing scale proposal
- **typography-consolidation.txt**: Typography scale proposal
- **pattern-mapping.json**: Old pattern → new token mappings
- **.state.yaml**: Updated with consolidation decisions

### Output Format

```yaml
# .state.yaml consolidation section
consolidation:
  completed_at: "2025-10-27T12:30:00Z"
  patterns_consolidated:
    colors:
      before: 89
      after: 12
      reduction: "86.5%"
      clusters: 8
    buttons:
      before: 47
      after: 3
      reduction: "93.6%"
      variants: ["primary", "secondary", "destructive"]
    spacing:
      before: 19
      after: 7
      reduction: "63.2%"
      scale: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"]
    typography:
      before: 21
      after: 10
      reduction: "52.4%"
  overall_reduction: "81.8%"
  target_met: true
```

## Success Criteria

- [ ] >80% overall pattern reduction achieved
- [ ] Color clustering uses HSL similarity (not just hex distance)
- [ ] Button variants identified by semantic purpose
- [ ] Spacing scale based on consistent base unit
- [ ] Most-used patterns preserved as primary tokens
- [ ] All consolidation decisions documented with rationale
- [ ] User can review and override before finalizing

## Error Handling

- **No audit data found**: Exit with message to run *audit first
- **Insufficient patterns to consolidate**: Report that codebase is already clean
- **Cannot achieve 80% reduction**: Explain why and show actual reduction achieved
- **Invalid state file**: Attempt to recover from backup or prompt re-audit

## Security Considerations

- Read-only analysis of patterns (no code modification)
- Validate user overrides to prevent injection
- Handle malformed color values safely
- Backup state file before overwriting

## Examples

### Example 1: Successful Consolidation

```bash
*consolidate
```

Output:
```
🎨 CONSOLIDATING COLORS...
Found 89 unique colors
Clustering with 5% HSL threshold...

CLUSTER 1 - Primary Blues (4 → 1):
  #0066CC (234 uses) <- KEEP
  #0065CB, #0067CD, #0064CA (merge)

CLUSTER 2 - Error Reds (3 → 1):
  #DC2626 (89 uses) <- KEEP
  #DB2525, #DD2727 (merge)

📊 CONSOLIDATION SUMMARY:
| Pattern    | Before | After | Reduction |
|------------|--------|-------|-----------|
| Colors     | 89     | 12    | 86.5%     |
| Buttons    | 47     | 3     | 93.6%     |
| Spacing    | 19     | 7     | 63.2%     |
| Typography | 21     | 10    | 52.4%     |
| TOTAL      | 176    | 32    | 81.8%     |

✅ TARGET MET: >80% reduction achieved
✅ Report saved: outputs/design-system/my-app/consolidation/consolidation-report.md
```

### Example 2: User Override

```bash
*consolidate

Brad: "Merge #0066CC and #0052A3?"
User: "No, #0052A3 is intentional hover state"
Brad: "Override recorded. Keeping both."
```

## Notes

- HSL color space provides perceptual similarity (better than RGB/hex distance)
- Most-used pattern in each cluster becomes the canonical token
- Semantic button analysis looks for keywords: primary, main, secondary, default, danger, delete, destructive
- Spacing scale should use consistent base unit (4px or 8px)
