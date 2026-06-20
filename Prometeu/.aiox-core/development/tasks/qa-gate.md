<!--
## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com registro em log
- Interação mínima com o usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Balanceado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pre-Flight - Planejamento Abrangente Antecipado
- Fase de análise de tarefa (identificar todas as ambiguidades)
- Execução com ambiguidade zero
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Tarefa (AIOX Task Format V1.0)

```yaml
task: qaGate()
responsável: Quinn (Guardian)
responsavel_type: Agente
atomic_layer: Organism

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
    error_message: "Pré-condição falhou: Regras de validação carregadas; alvo disponível para validação"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a tarefa concluir

**Checklist:**

```yaml
post-conditions:
  - [ ] Validation executed; results accurate; report generated
    tipo: post-condition
    blocker: true
    validação: |
      Verify validation executed; results accurate; report generated
    error_message: "Pós-condição falhou: Validação executada; resultados precisos; relatório gerado"
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

- **Ferramenta:** validation-engine
  - **Propósito:** Validação baseada em regras e geração de relatórios
  - **Origem:** .aiox-core/utils/validation-engine.js

- **Ferramenta:** schema-validator
  - **Propósito:** Validação de schema JSON/YAML
  - **Origem:** ajv ou similar

---

## Scripts

**Código específico do agente para esta tarefa:**

- **Script:** run-validation.js
  - **Propósito:** Executar regras de validação e gerar relatório
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/scripts/run-validation.js

---

## Tratamento de Erros

**Estratégia:** abort

**Erros Comuns:**

1. **Erro:** Critérios de Validação Ausentes
   - **Causa:** Regras de validação obrigatórias não definidas
   - **Resolução:** Garanta que os critérios de validação sejam carregados da config
   - **Recuperação:** Usar regras de validação padrão, registrar aviso

2. **Erro:** Schema Inválido
   - **Causa:** O alvo não corresponde ao schema esperado
   - **Resolução:** Atualizar o schema ou corrigir a estrutura do alvo
   - **Recuperação:** Relatório detalhado de erro de validação

3. **Erro:** Dependência Ausente
   - **Causa:** Dependência obrigatória para validação não encontrada
   - **Resolução:** Instalar as dependências ausentes
   - **Recuperação:** Abortar com lista clara de dependências

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
  - github-cli        # PR review and quality gate management
  - context7          # Research testing best practices and standards
checklists:
  - qa-master-checklist.md
execution_mode: programmatic  # TOK-3: PTC-eligible — batch lint+typecheck+test in single Bash block
---

# qa-gate

Cria ou atualiza um arquivo de decisão de quality gate para uma story com base nos achados da revisão.

## Propósito

Gerar um arquivo de quality gate independente que forneça uma decisão clara de aprovação/reprovação com feedback acionável. Este gate serve como um checkpoint consultivo para as equipes entenderem o status de qualidade.

## Pré-requisitos

- A story foi revisada (manualmente ou via task review-story)
- Os achados da revisão estão disponíveis
- Entendimento dos requisitos e da implementação da story

## Localização do Arquivo de Gate

**SEMPRE** verifique o `aiox-core/core-config.yaml` para o `qa.qaLocation/gates`

Regras de slug:

- Converter para minúsculas
- Substituir espaços por hífens
- Remover pontuação
- Exemplo: "User Auth - Login!" torna-se "user-auth-login"

## Schema Mínimo Obrigatório

```yaml
schema: 1
story: '{epic}.{story}'
gate: PASS|CONCERNS|FAIL|WAIVED
status_reason: '1-2 sentence explanation of gate decision'
reviewer: 'Quinn'
updated: '{ISO-8601 timestamp}'
top_issues: [] # Empty array if no issues
waiver: { active: false } # Only set active: true if WAIVED
```

## Schema com Problemas

```yaml
schema: 1
story: '1.3'
gate: CONCERNS
status_reason: 'Missing rate limiting on auth endpoints poses security risk.'
reviewer: 'Quinn'
updated: '2025-01-12T10:15:00Z'
top_issues:
  - id: 'SEC-001'
    severity: high # ONLY: low|medium|high
    finding: 'No rate limiting on login endpoint'
    suggested_action: 'Add rate limiting middleware before production'
  - id: 'TEST-001'
    severity: medium
    finding: 'No integration tests for auth flow'
    suggested_action: 'Add integration test coverage'
waiver: { active: false }
```

## Schema quando Dispensado (Waived)

```yaml
schema: 1
story: '1.3'
gate: WAIVED
status_reason: 'Known issues accepted for MVP release.'
reviewer: 'Quinn'
updated: '2025-01-12T10:15:00Z'
top_issues:
  - id: 'PERF-001'
    severity: low
    finding: 'Dashboard loads slowly with 1000+ items'
    suggested_action: 'Implement pagination in next sprint'
waiver:
  active: true
  reason: 'MVP release - performance optimization deferred'
  approved_by: 'Product Owner'
```

## Aprimoramento de Inteligência de Código (Opcional)

> Estes passos são **condicionais** — só são executados quando um provedor de inteligência de código está disponível.
> Se `isCodeIntelAvailable()` retornar false, pule silenciosamente e prossiga com os critérios de gate padrão.

### Inteligência de Código: Blast Radius

Após concluir a revisão manual, se a inteligência de código estiver disponível:

1. Colete a lista de arquivos modificados da File List da story
2. Chame `getBlastRadius(files)` de `.aiox-core/core/code-intel/helpers/qa-helper.js`
3. Se o resultado não for nulo, adicione uma seção "Blast Radius" ao relatório do gate:
   ```
   ### Blast Radius
   - Files analyzed: {count}
   - Total references affected: {blastRadius}
   - Risk Level: {riskLevel} (LOW/MEDIUM/HIGH)
   ```
4. Se o nível de risco for HIGH, chame `suggestGateInfluence('HIGH')` e inclua o aviso nas notas de decisão do gate

### Inteligência de Código: Cobertura de Testes

Após a análise de blast radius, se a inteligência de código estiver disponível:

1. Extraia os nomes de símbolos (nomes de funções/classes) dos arquivos modificados
2. Chame `getTestCoverage(symbols)` de `qa-helper.js`
3. Se o resultado não for nulo, adicione uma seção "Test Coverage" ao relatório do gate:
   ```
   ### Test Coverage (Code Intelligence)
   | Symbol | Status | Test Count |
   |--------|--------|------------|
   | {symbol} | {NO_TESTS/INDIRECT/MINIMAL/GOOD} | {testCount} |
   ```
4. Símbolos com status NO_TESTS devem ser sinalizados como potenciais CONCERNS

### Inteligência de Código: Influência no Gate

Se o blast radius retornar risco HIGH:

1. O aviso `suggestGateInfluence('HIGH')` é **apenas informativo**
2. Ele sugere CONCERNS, mas NÃO altera automaticamente o veredito do gate
3. O @qa toma a decisão final — o aviso é registrado no arquivo de gate sob `code_intel_advisory`

> **Garantia de fallback:** Se a inteligência de código estiver indisponível ou qualquer chamada retornar nulo, o processo de gate continua exatamente como antes — nenhuma seção é adicionada, nenhum erro é levantado.

---

## Critérios de Decisão do Gate

### PASS

- Todos os critérios de aceite atendidos
- Nenhum problema de alta severidade
- A cobertura de testes atende aos padrões do projeto

### CONCERNS

- Problemas não bloqueantes presentes
- Devem ser rastreados e agendados
- Pode prosseguir com ciência

### FAIL

- Critérios de aceite não atendidos
- Problemas de alta severidade presentes
- Recomenda-se retornar para InProgress

### WAIVED

- Problemas explicitamente aceitos
- Requer aprovação e justificativa
- Prosseguir apesar dos problemas conhecidos

## Escala de Severidade

**VALORES FIXOS - SEM VARIAÇÕES:**

- `low`: Problemas menores, problemas cosméticos
- `medium`: Deve ser corrigido em breve, não bloqueante
- `high`: Problemas críticos, devem bloquear o release

## Prefixos de ID de Problema

- `SEC-`: Problemas de segurança
- `PERF-`: Problemas de performance
- `REL-`: Problemas de confiabilidade
- `TEST-`: Lacunas de testes
- `MNT-`: Preocupações de manutenibilidade
- `ARCH-`: Problemas de arquitetura
- `DOC-`: Lacunas de documentação
- `REQ-`: Problemas de requisitos

## Requisitos de Saída

1. **SEMPRE** crie o arquivo de gate em: `qa.qaLocation/gates` de `aiox-core/core-config.yaml`
2. **SEMPRE** anexe este formato exato à seção QA Results da story:

   ```text
   Gate: {STATUS} → qa.qaLocation/gates/{epic}.{story}-{slug}.yml
   ```

3. Mantenha o status_reason em no máximo 1-2 frases
4. Use os valores de severidade exatamente: `low`, `medium` ou `high`

## Exemplo de Atualização da Story

Após criar o arquivo de gate, anexe à seção QA Results da story:

```markdown
## QA Results

### Review Date: 2025-01-12

### Reviewed By: Quinn (Test Architect)

[... existing review content ...]

### Gate Status

Gate: CONCERNS → qa.qaLocation/gates/{epic}.{story}-{slug}.yml
```

## Princípios-Chave

- Mantenha-o mínimo e previsível
- Escala de severidade fixa (low/medium/high)
- Sempre escreva no caminho padrão
- Sempre atualize a story com a referência do gate
- Achados claros e acionáveis

## Atualização de Status Pós-Gate (OBRIGATÓRIA)

**Referência:** `.claude/rules/story-lifecycle.md` — As transições de status são responsabilidade do @qa durante o QA gate.

**Este passo DEVE ser executado antes de apresentar os resultados ao usuário.**

**Formato do Change Log:** Use `{date: YYYY-MM-DD}` e `{version: MAJOR.MINOR.PATCH}`. A versão DEVE seguir as regras de bump semântico: major para breaking changes, minor para features, patch para fixes/atualizações de processo. PARE (HALT) se qualquer um dos valores não puder ser resolvido deterministicamente.

### SE o veredito for PASS ou CONCERNS:

0. **Pré-verificação (bloqueante):**
   - Se o Status atual não for `**InReview**`, PARE (HALT) e registre: "Cannot apply PASS/CONCERNS transition: expected InReview, found {current status}."
   - Se a seção do Change Log estiver ausente, PARE (HALT) e solicite ao usuário que restaure a estrutura do template.
1. **Atualize o campo Status da story** no arquivo da story: mude `**InReview**` para `**Done**`
2. **Adicione uma entrada no Change Log:**
   ```text
   | {date: YYYY-MM-DD} | {version: MAJOR.MINOR.PATCH} | QA Gate {PASS|CONCERNS} — Status: InReview → Done | @qa |
   ```
3. **Registre:** "✅ Story status updated: InReview → Done"

### SE o veredito for FAIL:

0. **Pré-verificação (bloqueante):**
   - Se o Status atual não for `**InReview**`, PARE (HALT) e registre: "Cannot apply FAIL transition: expected InReview, found {current status}."
   - Se a seção do Change Log estiver ausente, PARE (HALT) e solicite ao usuário que restaure a estrutura do template.
1. **Atualize o campo Status da story** no arquivo da story: mude `**InReview**` para `**InProgress**`
2. **Adicione uma entrada no Change Log:**
   ```text
   | {date: YYYY-MM-DD} | {version: MAJOR.MINOR.PATCH} | QA Gate FAIL — Status: InReview → InProgress — {reason} | @qa |
   ```
3. **Registre:** "❌ Story returned to InProgress — fixes required"

### SE o veredito for WAIVED:

0. **Pré-verificação (bloqueante):**
   - Se o Status atual não for `**InReview**`, PARE (HALT) e registre: "Cannot apply WAIVED transition: expected InReview, found {current status}."
   - Se a seção do Change Log estiver ausente, PARE (HALT) e solicite ao usuário que restaure a estrutura do template.
1. **Atualize o campo Status da story** no arquivo da story: mude `**InReview**` para `**Done**`
2. **Adicione uma entrada no Change Log:**
   ```text
   | {date: YYYY-MM-DD} | {version: MAJOR.MINOR.PATCH} | QA Gate WAIVED — Status: InReview → Done — {waiver reason} | @qa |
   ```
3. **Registre:** "⚠️ Story status updated: InReview → Done (waived)"

### Justificativa

As transições de status definidas em `story-lifecycle.md` são consultivas (regras contextuais). Este passo as torna imperativas (procedurais), garantindo que os agentes sempre executem a transição como parte do workflow, em vez de depender da ciência das regras contextuais.

---

## Handoff
next_agent: @devops
next_command: *push
condition: QA gate verdict is PASS or CONCERNS (status updated to Done)
alternatives:
  - agent: @po, command: *review-concerns {story-id}, condition: QA gate verdict is CONCERNS (status updated to Done, has non-blocking issues)
  - agent: @dev, command: *apply-qa-fixes, condition: QA gate verdict is FAIL (status updated to InProgress)
  - agent: @po, command: *close-story {story-id}, condition: QA gate verdict is WAIVED (status updated to Done)
