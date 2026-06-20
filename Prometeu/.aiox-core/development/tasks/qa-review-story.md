---
tools:
  - github-cli        # Revisão de código e gerenciamento de PR
  - browser           # Testes end-to-end e validação de UI
  - context7          # Pesquisa de frameworks de teste e melhores práticas
  - supabase          # Testes de banco de dados e validação de dados
checklists:
  - qa-master-checklist.md
---

# review-story

Realize uma revisão abrangente de arquitetura de testes com decisão de quality gate. Esta revisão adaptativa e consciente de riscos cria tanto uma atualização da story quanto um arquivo de gate detalhado.

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

### 3. Planejamento Pre-Flight - Planejamento Abrangente Antecipado
- Fase de análise da task (identificar todas as ambiguidades)
- Execução sem ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: qaReviewStory()
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

## Pré-condições

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Validation rules loaded; target available for validation
    tipo: pre-condition
    blocker: true
    validação: |
      Check validation rules loaded; target available for validation
    error_message: "Pre-condition failed: Validation rules loaded; target available for validation"
```

---

## Pós-condições

**Propósito:** Validar o sucesso da execução APÓS a conclusão da task

**Checklist:**

```yaml
post-conditions:
  - [ ] Validation executed; results accurate; report generated
    tipo: post-condition
    blocker: true
    validação: |
      Verify validation executed; results accurate; report generated
    error_message: "Post-condition failed: Validation executed; results accurate; report generated"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de pass/fail para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Validation rules applied; pass/fail accurate; actionable feedback
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Assert validation rules applied; pass/fail accurate; actionable feedback
    error_message: "Acceptance criterion not met: Validation rules applied; pass/fail accurate; actionable feedback"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** validation-engine
  - **Propósito:** Validação e relatório baseados em regras
  - **Origem:** .aiox-core/utils/validation-engine.js

- **Ferramenta:** schema-validator
  - **Propósito:** Validação de schema JSON/YAML
  - **Origem:** ajv ou similar

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** run-validation.js
  - **Propósito:** Executar regras de validação e gerar relatório
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/scripts/run-validation.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Critérios de Validação Ausentes
   - **Causa:** Regras de validação obrigatórias não definidas
   - **Resolução:** Garantir que os critérios de validação sejam carregados da config
   - **Recuperação:** Usar regras de validação padrão, registrar aviso

2. **Erro:** Schema Inválido
   - **Causa:** O target não corresponde ao schema esperado
   - **Resolução:** Atualizar o schema ou corrigir a estrutura do target
   - **Recuperação:** Relatório detalhado de erro de validação

3. **Erro:** Dependência Ausente
   - **Causa:** Dependência obrigatória para validação não encontrada
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
- Análise iterativa com limites de profundidade; cache de resultados intermediários; agrupamento de operações similares em lote

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


## Entradas

```yaml
required:
  - story_id: '{epic}.{story}' # e.g., "1.3"
  - story_path: '{devStoryLocation}/{epic}.{story}.*.md' # Path from core-config.yaml
  - story_title: '{title}' # If missing, derive from story file H1
  - story_slug: '{slug}' # If missing, derive from title (lowercase, hyphenated)
```

## Pré-requisitos

- O status da story deve ser "Review"
- O desenvolvedor concluiu todas as tasks e atualizou a File List
- Todos os testes automatizados estão passando

## Processo de Revisão - Arquitetura de Testes Adaptativa

### 0. Loop Completo de Auto-Cura do CodeRabbit (Story 6.3.3)

**Propósito**: Varredura automatizada de qualidade de código com auto-cura antes da revisão humana

**Configuração**: Auto-cura completa (máx. 3 iterações, problemas CRITICAL + HIGH)

Execute a auto-cura do CodeRabbit **PRIMEIRO**, antes da revisão manual:

```
┌───────────────────────────────────────────────────────────────────┐
│                   CODERABBIT SELF-HEALING                         │
│                    (Full Mode - @qa)                              │
├───────────────────────────────────────────────────────────────────┤
│                                                                   │
│  iteration = 0                                                    │
│  max_iterations = 3                                               │
│                                                                   │
│  WHILE iteration < max_iterations:                                │
│    ┌─────────────────────────────────────────────────────────┐   │
│    │ 1. Run CodeRabbit CLI (runtime picks the shape for      │   │
│    │    process.platform — see Issue #731):                  │   │
│    │    macOS/Linux: ~/.local/bin/coderabbit --prompt-only   │   │
│    │                 -t committed --base main                │   │
│    │    Windows:     wsl bash -c 'cd /mnt/<drive>/<path> &&  │   │
│    │                 ~/.local/bin/coderabbit --prompt-only   │   │
│    │                 -t committed --base main'               │   │
│    │                                                          │   │
│    │ 2. Parse output for all severity levels                 │   │
│    └─────────────────────────────────────────────────────────┘   │
│                          │                                        │
│                          ▼                                        │
│    ┌─────────────────────────────────────────────────────────┐   │
│    │ critical = filter(severity == "CRITICAL")               │   │
│    │ high = filter(severity == "HIGH")                       │   │
│    │ medium = filter(severity == "MEDIUM")                   │   │
│    └─────────────────────────────────────────────────────────┘   │
│                          │                                        │
│                          ▼                                        │
│    ┌─────────────────────────────────────────────────────────┐   │
│    │ IF critical.length == 0 AND high.length == 0:           │   │
│    │   - IF medium.length > 0:                               │   │
│    │       - Create tech debt issues for each MEDIUM         │   │
│    │   - Log: "✅ CodeRabbit passed"                         │   │
│    │   - BREAK → Proceed to manual review                    │   │
│    └─────────────────────────────────────────────────────────┘   │
│                          │                                        │
│                          ▼                                        │
│    ┌─────────────────────────────────────────────────────────┐   │
│    │ IF CRITICAL or HIGH issues found:                       │   │
│    │   - Attempt auto-fix for each CRITICAL issue            │   │
│    │   - Attempt auto-fix for each HIGH issue                │   │
│    │   - iteration++                                         │   │
│    │   - CONTINUE loop                                       │   │
│    └─────────────────────────────────────────────────────────┘   │
│                          │                                        │
│                          ▼                                        │
│  IF iteration == 3 AND (CRITICAL or HIGH issues remain):         │
│    - Log: "❌ Issues remain after 3 iterations"                  │
│    - Generate detailed QA gate report                            │
│    - Set gate: FAIL                                              │
│    - HALT and require human intervention                         │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
```

#### Tratamento por Severidade

| Severidade | Comportamento | Notas |
|----------|----------|-------|
| **CRITICAL** | Auto-correção (máx. 3 tentativas) | Vulnerabilidades de segurança, bugs que quebram |
| **HIGH** | Auto-correção (máx. 3 tentativas) | Problemas significativos de qualidade |
| **MEDIUM** | Criar issue de dívida técnica | Documentar para sprint futuro |
| **LOW** | Anotar na revisão | Detalhes menores, nenhuma ação necessária |

#### Código de Implementação

```javascript
async function runQACodeRabbitSelfHealing(storyPath) {
  const maxIterations = 3;
  let iteration = 0;

  console.log('🐰 Starting CodeRabbit Full Self-Healing Loop...');
  console.log(`   Mode: Full (CRITICAL + HIGH)`);
  console.log(`   Max Iterations: ${maxIterations}\n`);

  while (iteration < maxIterations) {
    console.log(`📋 Iteration ${iteration + 1}/${maxIterations}`);

    // Run CodeRabbit CLI against main branch
    const output = await runCodeRabbitCLI('committed --base main');
    const issues = parseCodeRabbitOutput(output);

    const criticalIssues = issues.filter(i => i.severity === 'CRITICAL');
    const highIssues = issues.filter(i => i.severity === 'HIGH');
    const mediumIssues = issues.filter(i => i.severity === 'MEDIUM');

    console.log(`   Found: ${criticalIssues.length} CRITICAL, ${highIssues.length} HIGH, ${mediumIssues.length} MEDIUM`);

    // No CRITICAL or HIGH issues = success
    if (criticalIssues.length === 0 && highIssues.length === 0) {
      if (mediumIssues.length > 0) {
        console.log(`\n📝 Creating tech debt issues for ${mediumIssues.length} MEDIUM issues...`);
        await createTechDebtIssues(storyPath, mediumIssues);
      }
      console.log('\n✅ CodeRabbit Self-Healing: PASSED');
      return { success: true, iterations: iteration + 1, proceedToManual: true };
    }

    // Attempt auto-fix for CRITICAL and HIGH issues
    const allIssues = [...criticalIssues, ...highIssues];
    console.log(`\n🔧 Attempting auto-fix for ${allIssues.length} issues...`);
    for (const issue of allIssues) {
      await attemptAutoFix(issue);
    }

    iteration++;
  }

  // Max iterations reached with issues
  console.log('\n❌ CodeRabbit Self-Healing: FAILED');
  console.log(`   CRITICAL/HIGH issues remain after ${maxIterations} iterations.`);
  console.log('   Setting gate: FAIL - Manual intervention required.');

  return { success: false, iterations: maxIterations, gateStatus: 'FAIL' };
}
```

#### Timeout

- **Padrão**: 30 minutos por execução do CodeRabbit
- **Máximo total**: ~90 minutos (3 iterações)

#### Integração com a Decisão de Gate

Se a auto-cura falhar:
- Gate automaticamente definido como FAIL
- `top_issues` preenchido a partir dos problemas restantes do CodeRabbit
- `status_reason` inclui "CodeRabbit self-healing exhausted"

---

### 0b. Code Intelligence: Impacto de Referências (Opcional)

> Este passo é **condicional** — só executa quando um provedor de code intelligence está disponível.
> Se `isCodeIntelAvailable()` retornar false, pule silenciosamente e prossiga para a Avaliação de Risco.

Após a auto-cura do CodeRabbit (Passo 0), se code intelligence estiver disponível:

1. Colete os arquivos modificados a partir da File List da story
2. Chame `getReferenceImpact(files)` de `.aiox-core/core/code-intel/helpers/qa-helper.js`
3. Se o resultado não for nulo, inclua o impacto de referências na revisão:
   ```
   ### Reference Impact (Code Intelligence)
   | Modified File | Consumers Affected |
   |--------------|-------------------|
   | {file} | {consumers.length} consumers ({list of consumer files}) |
   ```
4. Arquivos com muitos consumidores (>10) devem disparar uma revisão mais profunda dessas mudanças
5. Esses dados complementam a Avaliação de Risco (Passo 1) — uma alta contagem de consumidores pode auto-escalar para revisão profunda

> **Garantia de fallback:** Se code intelligence estiver indisponível ou `getReferenceImpact` retornar null, a revisão continua exatamente como antes — nenhuma seção de impacto de referências é adicionada.

---

### 1. Avaliação de Risco (Determina a Profundidade da Revisão)

**Auto-escalar para revisão profunda quando:**

- Arquivos de autenticação/pagamento/segurança tocados
- Nenhum teste adicionado à story
- Diff > 500 linhas
- O gate anterior foi FAIL/CONCERNS
- A story tem > 5 critérios de aceite

### 2. Análise Abrangente

**A. Rastreabilidade de Requisitos**

- Mapeie cada critério de aceite para os testes que o validam (documente o mapeamento com Given-When-Then, não com código de teste)
- Identifique lacunas de cobertura
- Verifique se todos os requisitos têm casos de teste correspondentes

**B. Revisão de Qualidade de Código**

- Arquitetura e padrões de design
- Oportunidades de refatoração (e realize-as)
- Duplicação de código ou ineficiências
- Otimizações de performance
- Vulnerabilidades de segurança
- Aderência às melhores práticas

**C. Avaliação da Arquitetura de Testes**

- Adequação da cobertura de testes nos níveis apropriados
- Adequação do nível de teste (o que deve ser unit vs integration vs e2e)
- Qualidade do design de testes e manutenibilidade
- Estratégia de gestão de dados de teste
- Adequação do uso de mock/stub
- Cobertura de casos de borda e cenários de erro
- Tempo de execução e confiabilidade dos testes

**D. Requisitos Não-Funcionais (NFRs)**

- Segurança: Autenticação, autorização, proteção de dados
- Performance: Tempos de resposta, uso de recursos
- Confiabilidade: Tratamento de erros, mecanismos de recuperação
- Manutenibilidade: Clareza do código, documentação

**E. Avaliação de Testabilidade**

- Controlabilidade: Conseguimos controlar as entradas?
- Observabilidade: Conseguimos observar as saídas?
- Depurabilidade: Conseguimos depurar falhas facilmente?

**F. Identificação de Dívida Técnica**

- Atalhos acumulados
- Testes ausentes
- Dependências desatualizadas
- Violações de arquitetura

### 3. Refatoração Ativa

- Refatore o código onde for seguro e apropriado
- Rode os testes para garantir que as mudanças não quebrem a funcionalidade
- Documente todas as mudanças na seção QA Results com WHY e HOW claros
- NÃO altere o conteúdo da story além da seção QA Results
- NÃO altere o Status da story ou a File List; apenas recomende o próximo status

### 4. Verificação de Conformidade com Padrões

- Verifique a aderência a `docs/coding-standards.md`
- Cheque a conformidade com `docs/unified-project-structure.md`
- Valide a abordagem de testes em relação a `docs/testing-strategy.md`
- Garanta que todas as diretrizes mencionadas na story sejam seguidas

### 5. Validação dos Critérios de Aceite

- Verifique se cada AC está totalmente implementado
- Cheque qualquer funcionalidade ausente
- Valide se os casos de borda são tratados

### 6. Documentação e Comentários

- Verifique se o código é autodocumentado onde possível
- Adicione comentários para lógica complexa, se ausentes
- Garanta que quaisquer mudanças de API estejam documentadas

## Saída 1: Atualizar o Arquivo da Story - SOMENTE a Seção QA Results

**CRITICAL**: Você está autorizado APENAS a atualizar a seção "QA Results" do arquivo da story. NÃO modifique nenhuma outra seção.

**Regra de Âncora do QA Results:**

- Se `## QA Results` não existir, anexe-o ao final do arquivo
- Se existir, anexe uma nova entrada datada abaixo das entradas existentes
- Nunca edite outras seções

Após a revisão e qualquer refatoração, anexe seus resultados ao arquivo da story na seção QA Results:

```markdown
## QA Results

### Review Date: [Date]

### Reviewed By: Quinn (Test Architect)

### Code Quality Assessment

[Overall assessment of implementation quality]

### Refactoring Performed

[List any refactoring you performed with explanations]

- **File**: [filename]
  - **Change**: [what was changed]
  - **Why**: [reason for change]
  - **How**: [how it improves the code]

### Compliance Check

- Coding Standards: [✓/✗] [notes if any]
- Project Structure: [✓/✗] [notes if any]
- Testing Strategy: [✓/✗] [notes if any]
- All ACs Met: [✓/✗] [notes if any]

### Improvements Checklist

[Check off items you handled yourself, leave unchecked for dev to address]

- [x] Refactored user service for better error handling (services/user.service.ts)
- [x] Added missing edge case tests (services/user.service.test.ts)
- [ ] Consider extracting validation logic to separate validator class
- [ ] Add integration test for error scenarios
- [ ] Update API documentation for new error codes

### Security Review

[Any security concerns found and whether addressed]

### Performance Considerations

[Any performance issues found and whether addressed]

### Files Modified During Review

[If you modified files, list them here - ask Dev to update File List]

### Gate Status

Gate: {STATUS} → qa.qaLocation/gates/{epic}.{story}-{slug}.yml
Risk profile: qa.qaLocation/assessments/{epic}.{story}-risk-{YYYYMMDD}.md
NFR assessment: qa.qaLocation/assessments/{epic}.{story}-nfr-{YYYYMMDD}.md

# Note: Paths should reference core-config.yaml for custom configurations

### Recommended Status

[✓ Ready for Done] / [✗ Changes Required - See unchecked items above]
(Story owner decides final status)
```

## Saída 2: Criar o Arquivo de Quality Gate

**Template e Diretório:**

- Renderize a partir de `../templates/qa-gate-tmpl.yaml`
- Crie o diretório definido em `qa.qaLocation/gates` (veja `.aiox-core/core-config.yaml`) se ausente
- Salve em: `qa.qaLocation/gates/{epic}.{story}-{slug}.yml`

Estrutura do arquivo de gate:

```yaml
schema: 1
story: '{epic}.{story}'
story_title: '{story title}'
gate: PASS|CONCERNS|FAIL|WAIVED
status_reason: '1-2 sentence explanation of gate decision'
reviewer: 'Quinn (Test Architect)'
updated: '{ISO-8601 timestamp}'

top_issues: [] # Empty if no issues
waiver: { active: false } # Set active: true only if WAIVED

# Extended fields (optional but recommended):
quality_score: 0-100 # 100 - (20*FAILs) - (10*CONCERNS) or use technical-preferences.md weights
expires: '{ISO-8601 timestamp}' # Typically 2 weeks from review

evidence:
  tests_reviewed: { count }
  risks_identified: { count }
  trace:
    ac_covered: [1, 2, 3] # AC numbers with test coverage
    ac_gaps: [4] # AC numbers lacking coverage

nfr_validation:
  security:
    status: PASS|CONCERNS|FAIL
    notes: 'Specific findings'
  performance:
    status: PASS|CONCERNS|FAIL
    notes: 'Specific findings'
  reliability:
    status: PASS|CONCERNS|FAIL
    notes: 'Specific findings'
  maintainability:
    status: PASS|CONCERNS|FAIL
    notes: 'Specific findings'

recommendations:
  immediate: # Must fix before production
    - action: 'Add rate limiting'
      refs: ['api/auth/login.ts']
  future: # Can be addressed later
    - action: 'Consider caching'
      refs: ['services/data.ts']
```

### Critérios de Decisão de Gate

**Regra determinística (aplicar em ordem):**

Se risk_summary existir, aplique primeiro seus limiares (≥9 → FAIL, ≥6 → CONCERNS), depois os status de NFR, depois a severidade de top_issues.

1. **Limiares de risco (se risk_summary presente):**
   - Se qualquer pontuação de risco ≥ 9 → Gate = FAIL (a menos que dispensado)
   - Senão, se qualquer pontuação ≥ 6 → Gate = CONCERNS

2. **Lacunas de cobertura de testes (se trace disponível):**
   - Se qualquer teste P0 do test-design estiver ausente → Gate = CONCERNS
   - Se um teste P0 de segurança/perda-de-dados estiver ausente → Gate = FAIL

3. **Severidade de problemas:**
   - Se qualquer `top_issues.severity == high` → Gate = FAIL (a menos que dispensado)
   - Senão, se qualquer `severity == medium` → Gate = CONCERNS

4. **Status de NFR:**
   - Se qualquer status de NFR for FAIL → Gate = FAIL
   - Senão, se qualquer status de NFR for CONCERNS → Gate = CONCERNS
   - Senão → Gate = PASS

- WAIVED somente quando waiver.active: true com reason/approver

Critérios detalhados:

- **PASS**: Todos os requisitos críticos atendidos, sem problemas bloqueantes
- **CONCERNS**: Problemas não-críticos encontrados, a equipe deve revisar
- **FAIL**: Problemas críticos que devem ser tratados
- **WAIVED**: Problemas reconhecidos mas explicitamente dispensados pela equipe

### Cálculo da Pontuação de Qualidade

```text
quality_score = 100 - (20 × number of FAILs) - (10 × number of CONCERNS)
Bounded between 0 and 100
```

Se `technical-preferences.md` definir pesos personalizados, use-os em vez disso.

### Convenção de Owner Sugerido

Para cada problema em `top_issues`, inclua um `suggested_owner`:

- `dev`: Mudanças de código necessárias
- `sm`: Esclarecimento de requisitos necessário
- `po`: Decisão de negócio necessária

## Princípios-Chave

- Você é um Test Architect fornecendo uma avaliação abrangente de qualidade
- Você tem autoridade para melhorar o código diretamente quando apropriado
- Sempre explique suas mudanças para fins de aprendizado
- Equilibre entre perfeição e pragmatismo
- Foque na priorização baseada em risco
- Forneça recomendações acionáveis com responsabilidade clara

## Condições de Bloqueio

Pare a revisão e solicite esclarecimento se:

- O arquivo da story estiver incompleto ou faltando seções críticas
- A File List estiver vazia ou claramente incompleta
- Não existirem testes quando eram necessários
- As mudanças de código não se alinharem aos requisitos da story
- Houver problemas arquiteturais críticos que exijam discussão

## Conclusão

Após a revisão:

1. Atualize a seção QA Results no arquivo da story
2. Crie o arquivo de gate no diretório de `qa.qaLocation/gates`
3. Recomende o status: "Ready for Done" ou "Changes Required" (o owner decide)
4. Se arquivos foram modificados, liste-os em QA Results e peça ao Dev para atualizar a File List
5. Sempre forneça feedback construtivo e recomendações acionáveis

## Sincronização com ClickUp

**Sincronização Automática**: Quando você salva o arquivo da story com atualizações de QA Results, o módulo story-manager.js sincroniza automaticamente as mudanças para o ClickUp:

- **O que é Sincronizado**:
  - Markdown completo da story atualizado na descrição da task do ClickUp
  - Mudanças de status da story refletidas em campo personalizado
  - Comentário de changelog postado com as mudanças detectadas

- **Detecção de Mudanças**:
  - Mudanças de status (ex.: Review → Done)
  - Conclusões de tasks (checkboxes marcados)
  - Modificações na file list
  - Atualizações de 