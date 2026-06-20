# Tarefa Criar Pedido de Correção

Gera um documento estruturado de pedido de correção (`QA_FIX_REQUEST.md`) para o @dev com base nos achados da revisão de QA.

---

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
task: qaCreateFixRequest()
responsavel: Quinn (Guardian)
responsavel_type: Agente
atomic_layer: Molecule

**Entrada:**
- campo: story_id
  tipo: string
  origem: User Input
  obrigatorio: true
  validacao: Must be valid story ID format (e.g., "6.3")

- campo: severity_filter
  tipo: array
  origem: config
  obrigatorio: false
  validacao: Default ["CRITICAL", "MAJOR"]

- campo: include_minor
  tipo: boolean
  origem: User Input
  obrigatorio: false
  validacao: Default false

**Saida:**
- campo: fix_request_path
  tipo: string
  destino: Return value
  persistido: false

- campo: issues_count
  tipo: number
  destino: Memory
  persistido: false

- campo: fix_request_file
  tipo: file
  destino: docs/stories/{story-id}/qa/QA_FIX_REQUEST.md
  persistido: true
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da tarefa (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] QA report exists for the story
    tipo: pre-condition
    blocker: true
    validacao: |
      Check docs/stories/{story-id}/qa/qa_report.md exists
    error_message: "Pré-condição falhou: relatório de QA não encontrado. Execute *review {story-id} primeiro."

  - [ ] Story is in Review or Rejected status
    tipo: pre-condition
    blocker: false
    validacao: |
      Story should be in Review status for fix request
    error_message: "Aviso: a story pode não precisar de pedido de correção se não estiver em status Review."
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a tarefa concluir

**Checklist:**

```yaml
post-conditions:
  - [ ] QA_FIX_REQUEST.md created with all issues
    tipo: post-condition
    blocker: true
    validacao: |
      Verify file created at docs/stories/{story-id}/qa/QA_FIX_REQUEST.md
    error_message: "Pós-condição falhou: QA_FIX_REQUEST.md não foi criado."

  - [ ] All CRITICAL and MAJOR issues included
    tipo: post-condition
    blocker: true
    validacao: |
      Verify issue count matches source report
    error_message: "Pós-condição falhou: nem todos os problemas foram incluídos no pedido de correção."
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de aprovação/reprovação para a conclusão da tarefa

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Fix request generated with proper structure
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert fix request follows template structure
    error_message: "Critério de aceite não atendido: estrutura do pedido de correção inválida."

  - [ ] Each issue has location, problem, expected, verification
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert all required fields present for each issue
    error_message: "Critério de aceite não atendido: campos obrigatórios do problema ausentes."

  - [ ] Constraints section included
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assert constraints checklist present
    error_message: "Critério de aceite não atendido: seção de restrições ausente."
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta tarefa:**

- **Ferramenta:** file-reader
  - **Propósito:** Ler o arquivo de origem qa_report.md
  - **Origem:** Sistema de arquivos nativo

- **Ferramenta:** markdown-parser
  - **Propósito:** Analisar a estrutura do relatório de QA
  - **Origem:** Processamento de markdown nativo

---

## Scripts

**Código específico do agente para esta tarefa:**

- **Script:** parse-qa-report.js
  - **Propósito:** Extrair problemas do relatório de QA
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/development/scripts/parse-qa-report.js (opcional)

---

## Tratamento de Erros

**Estratégia:** fail-fast

**Erros Comuns:**

1. **Erro:** Relatório de QA Não Encontrado
   - **Causa:** A story ainda não foi revisada
   - **Resolução:** Execute \*review {story-id} primeiro
   - **Recuperação:** Forneça instrução clara ao usuário

2. **Erro:** Nenhum Problema a Reportar
   - **Causa:** O relatório de QA mostra tudo como PASS
   - **Resolução:** Nenhum pedido de correção necessário
   - **Recuperação:** Informe ao usuário que a story está pronta para merge

3. **Erro:** Formato de Relatório de QA Inválido
   - **Causa:** O relatório de QA não segue a estrutura esperada
   - **Resolução:** Re-execute a revisão de QA
   - **Recuperação:** Liste as seções esperadas

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 1-3 min (estimated)
cost_estimated: $0.001-0.003
token_usage: ~500-1,500 tokens
```

**Notas de Otimização:**

- Parsing direto de arquivo; uso mínimo de LLM; saída determinística

---

## Metadados

```yaml
story: 6.3
version: 1.0.0
dependencies:
  - qa-review-story.md
tags:
  - quality-assurance
  - fix-request
  - qa-loop
updated_at: 2026-01-29
```

---

## Dependências de Configuração

Esta tarefa requer as seguintes chaves de configuração de `core-config.yaml`:

- **`qa.qaLocation`**: Localização dos arquivos de QA (tipicamente docs/qa)
- **`devStoryLocation`**: Localização dos arquivos de story (tipicamente docs/stories)

**Carregando a Config:**

```javascript
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '../../.aiox-core/core-config.yaml');
const config = yaml.load(fs.readFileSync(configPath, 'utf8'));

const qa_location = config.qa.qaLocation;
const dev_story_location = config.devStoryLocation;
```

---

## Comando

```
*create-fix-request {story-id} [--include-minor]
```

**Parâmetros:**

- `story-id` (obrigatório): Identificador da story (ex.: "6.3")
- `--include-minor` (opcional): Incluir problemas de severidade Minor

**Exemplos:**

```bash
*create-fix-request 6.3
*create-fix-request 6.3 --include-minor
```

---

## Workflow

### Fase 1: Carregar o Relatório de QA

1. Localize o arquivo do relatório de QA:

   ```
   docs/stories/{story-id}/qa/qa_report.md
   ```

2. Se não for encontrado, verifique localizações alternativas:

   ```
   docs/qa/reports/{story-id}-report.md
   {qaLocation}/reports/{epic}.{story}-report.md
   ```

3. Analise o relatório de QA para extrair:
   - Metadados da story (ID, título, data da revisão)
   - Lista de problemas com níveis de severidade
   - Critérios de aceite reprovados
   - Falhas de testes

### Fase 2: Extrair Problemas

1. Filtre os problemas por severidade:
   - **CRITICAL**: Sempre incluir (bloqueante)
   - **MAJOR**: Sempre incluir (alta prioridade)
   - **MINOR**: Apenas se a flag `--include-minor` estiver definida

2. Para cada problema, extraia:
   - ID do problema (auto-gerar se ausente)
   - Título/descrição
   - Localização (caminho do arquivo, número da linha se disponível)
   - Descrição do problema com trecho de código
   - Comportamento esperado com trecho de código
   - Passos de verificação

3. Agrupe os problemas por categoria:
   - Qualidade de Código
   - Cobertura de Testes
   - Segurança
   - Performance
   - Documentação

### Fase 3: Gerar o Pedido de Correção

1. Crie o diretório de saída se necessário:

   ```
   docs/stories/{story-id}/qa/
   ```

2. Gere o `QA_FIX_REQUEST.md` usando o template abaixo

3. Registre o resumo da geração

### Fase 4: Notificar

1. Emita a mensagem de sucesso com:
   - Caminho do arquivo criado
   - Contagem de problemas por severidade
   - Próximos passos para o @dev

---

## Template do Pedido de Correção

````markdown
# QA Fix Request: {{storyId}}

**Generated:** {{timestamp}}
**QA Report Source:** {{qaReportPath}}
**Reviewer:** Quinn (Test Architect)

---

## Instructions for @dev

Fix ONLY the issues listed below. Do not add features or refactor unrelated code.

**Process:**

1. Read each issue carefully
2. Fix the specific problem described
3. Verify using the verification steps provided
4. Mark the issue as fixed in this document
5. Run all tests before marking complete

---

## Summary

| Severity | Count             | Status                  |
| -------- | ----------------- | ----------------------- |
| CRITICAL | {{criticalCount}} | Must fix before merge   |
| MAJOR    | {{majorCount}}    | Should fix before merge |
| MINOR    | {{minorCount}}    | Optional improvements   |

---

## Issues to Fix

{{#each issues}}

### {{index}}. [{{severity}}] {{title}}

**Issue ID:** {{issueId}}

**Location:** `{{location}}`

**Problem:**
{{#if problemCode}}

```{{language}}
{{problemCode}}
```
````

{{else}}
{{problemDescription}}
{{/if}}

**Expected:**
{{#if expectedCode}}

```{{language}}
{{expectedCode}}
```

{{else}}
{{expectedDescription}}
{{/if}}

**Verification:**
{{#each verificationSteps}}

- [ ] {{this}}
      {{/each}}

**Status:** [ ] Fixed

---

{{/each}}

## Constraints

**CRITICAL: @dev must follow these constraints:**

- [ ] Fix ONLY the issues listed above
- [ ] Do NOT add new features
- [ ] Do NOT refactor unrelated code
- [ ] Run all tests before marking complete: `npm test`
- [ ] Run linting before marking complete: `npm run lint`
- [ ] Run type check before marking complete: `npm run typecheck`
- [ ] Update story file list if any new files created

---

## After Fixing

1. Mark each issue as fixed in this document
2. Update the story's Dev Agent Record with summary
3. Request QA re-review: `@qa *review {{storyId}}`

---

_Generated by Quinn (Test Architect) - AIOX QA System_

````

---

## Exemplo de Saída

Para a story 6.3 com 2 problemas:

```markdown
# QA Fix Request: 6.3

**Generated:** 2026-01-29T10:30:00Z
**QA Report Source:** docs/stories/6.3/qa/qa_report.md
**Reviewer:** Quinn (Test Architect)

---

## Instructions for @dev

Fix ONLY the issues listed below. Do not add features or refactor unrelated code.

**Process:**
1. Read each issue carefully
2. Fix the specific problem described
3. Verify using the verification steps provided
4. Mark the issue as fixed in this document
5. Run all tests before marking complete

---

## Summary

| Severity | Count | Status |
|----------|-------|--------|
| CRITICAL | 1 | Must fix before merge |
| MAJOR | 1 | Should fix before merge |
| MINOR | 0 | Optional improvements |

---

## Issues to Fix

### 1. [CRITICAL] Missing input validation in parseStoryId

**Issue ID:** FIX-6.3-001

**Location:** `src/utils/story-parser.js:45`

**Problem:**
```javascript
function parseStoryId(input) {
  const parts = input.split('.');
  return { epic: parts[0], story: parts[1] };
}
````

**Expected:**

```javascript
function parseStoryId(input) {
  if (!input || typeof input !== 'string') {
    throw new Error('Story ID is required and must be a string');
  }
  const match = input.match(/^(\d+)\.(\d+)$/);
  if (!match) {
    throw new Error(`Invalid story ID format: ${input}. Expected format: X.Y`);
  }
  return { epic: match[1], story: match[2] };
}
```

**Verification:**

- [ ] Unit test for null input throws error
- [ ] Unit test for invalid format throws error
- [ ] Unit test for valid format returns correct object

**Status:** [ ] Fixed

---

### 2. [MAJOR] Test coverage below threshold for QA module

**Issue ID:** FIX-6.3-002

**Location:** `.aiox-core/development/tasks/qa-review-story.md`

**Problem:**
QA review task has no associated unit tests. Coverage: 0%

**Expected:**
Test file should exist at `tests/tasks/qa-review-story.test.js` with:

- Test for pre-condition validation
- Test for report generation
- Test for gate decision logic

**Verification:**

- [ ] Test file created at expected location
- [ ] At least 3 test cases implemented
- [ ] Tests pass: `npm test -- --grep "qa-review-story"`

**Status:** [ ] Fixed

---

## Constraints

**CRITICAL: @dev must follow these constraints:**

- [ ] Fix ONLY the issues listed above
- [ ] Do NOT add new features
- [ ] Do NOT refactor unrelated code
- [ ] Run all tests before marking complete: `npm test`
- [ ] Run linting before marking complete: `npm run lint`
- [ ] Run type check before marking complete: `npm run typecheck`
- [ ] Update story file list if any new files created

---

## After Fixing

1. Mark each issue as fixed in this document
2. Update the story's Dev Agent Record with summary
3. Request QA re-review: `@qa *review 6.3`

---

_Generated by Quinn (Test Architect) - AIOX QA System_

```

---

## Integração com o QA Loop

Esta tarefa faz parte do loop de 10 fases do Epic 6 - QA Evolution:

```

Fase 1: Story Pronta para Revisão
Fase 2: Varredura do CodeRabbit (automatizada)
Fase 3: Revisão Manual de QA
Fase 4: Geração do Relatório de QA
Fase 5: Geração do Pedido de Correção ← ESTA TAREFA
Fase 6: @dev Aplica as Correções
Fase 7: Re-revisão
Fase 8: Decisão de Gate
Fase 9: Aprovação/Rejeição
Fase 10: Merge ou Iterar

```

**Passo Anterior:** Relatório de QA gerado via `*review {story-id}`
**Próximo Passo:** @dev executa `*apply-qa-fixes {story-id}` usando este pedido de correção

---

## Critérios de Saída

Esta tarefa está completa quando:
- QA_FIX_REQUEST.md criado no caminho correto
- Todos os problemas CRITICAL incluídos
- Todos os problemas MAJOR incluídos
- Problemas MINOR incluídos apenas se a flag estiver definida
- Cada problema tem todos os campos obrigatórios
- Seção de restrições presente
- Arquivo segue a estrutura do template
```

## Handoff
next_agent: @dev
next_command: *fix-qa-issues
condition: QA_FIX_REQUEST.md generated
alternatives:
  - agent: @dev, command: *apply-qa-fixes, condition: Simple fixes, no structured request needed
