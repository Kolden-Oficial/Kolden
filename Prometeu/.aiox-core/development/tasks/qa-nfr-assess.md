<!-- Powered by AIOX™ Core -->

---
tools:
  - browser           # Teste de performance e validação de UI
  - supabase          # Confiabilidade de banco de dados e validação de dados
  - github-cli        # Revisão de segurança e análise de código
  - context7          # Pesquisar boas práticas de NFR
checklists:
  - architect-master-checklist.md
---

# nfr-assess

Validação rápida de NFR focada nos quatro principais: segurança, performance, confiabilidade, manutenibilidade.

## Entradas

```yaml
required:
  - story_id: '{epic}.{story}' # e.g., "1.3"
  - story_path: `aiox-core/core-config.yaml` for the `devStoryLocation`

optional:
  - architecture_refs: `aiox-core/core-config.yaml` for the `architecture.architectureFile`
  - technical_preferences: `aiox-core/core-config.yaml` for the `technicalPreferences`
  - acceptance_criteria: From story file
```

## Propósito

Avaliar os requisitos não-funcionais de uma story e gerar:

1. Bloco YAML para a seção `nfr_validation` do arquivo de gate
2. Avaliação breve em markdown salva em `qa.qaLocation/assessments/{epic}.{story}-nfr-{YYYYMMDD}.md`

## Processo

### 0. Fail-safe para Entradas Ausentes

Se story_path ou o arquivo da story não puderem ser encontrados:

- Ainda assim crie o arquivo de avaliação com a nota: "Source story not found"
- Defina todos os NFRs selecionados como CONCERNS com a nota: "Target unknown / evidence missing"
- Continue com a avaliação para agregar valor

### 1. Levantar o Escopo

**Modo interativo:** Pergunte quais NFRs avaliar
**Modo não-interativo:** Use por padrão os quatro principais (segurança, performance, confiabilidade, manutenibilidade)

```text
Which NFRs should I assess? (Enter numbers or press Enter for default)
[1] Security (default)
[2] Performance (default)
[3] Reliability (default)
[4] Maintainability (default)
[5] Usability
[6] Compatibility
[7] Portability
[8] Functional Suitability

> [Enter for 1-4]
```

### 2. Verificar Limiares (Thresholds)

Procure por requisitos de NFR em:

- Critérios de aceite da story
- Arquivos `docs/architecture/*.md`
- `docs/technical-preferences.md`

**Modo interativo:** Pergunte pelos limiares ausentes
**Modo não-interativo:** Marque como CONCERNS com "Target unknown"

```text
No performance requirements found. What's your target response time?
> 200ms for API calls

No security requirements found. Required auth method?
> JWT with refresh tokens
```

**Política de targets desconhecidos:** Se um target estiver ausente e não for fornecido, marque o status como CONCERNS com a nota: "Target unknown"

### 3. Avaliação Rápida

Para cada NFR selecionado, verifique:

- Há evidência de que está implementado?
- Conseguimos validá-lo?
- Há lacunas óbvias?

### 4. Gerar Saídas

## Saída 1: Bloco YAML do Gate

Gere SOMENTE para os NFRs efetivamente avaliados (sem placeholders):

```yaml
# Gate YAML (copy/paste):
nfr_validation:
  _assessed: [security, performance, reliability, maintainability]
  security:
    status: CONCERNS
    notes: 'No rate limiting on auth endpoints'
  performance:
    status: PASS
    notes: 'Response times < 200ms verified'
  reliability:
    status: PASS
    notes: 'Error handling and retries implemented'
  maintainability:
    status: CONCERNS
    notes: 'Test coverage at 65%, target is 80%'
```

## Regras de Status Determinísticas

- **FAIL**: Qualquer NFR selecionado tem lacuna crítica ou target claramente não atendido
- **CONCERNS**: Nenhum FAIL, mas algum NFR está desconhecido/parcial/com evidência ausente
- **PASS**: Todos os NFRs selecionados atendem aos targets com evidência

## Cálculo da Pontuação de Qualidade

```
quality_score = 100
- 20 for each FAIL attribute
- 10 for each CONCERNS attribute
Floor at 0, ceiling at 100
```

Se `technical-preferences.md` definir pesos customizados, use-os em vez disso.

## Saída 2: Relatório Breve de Avaliação

**SEMPRE salve em:** `qa.qaLocation/assessments/{epic}.{story}-nfr-{YYYYMMDD}.md`

```markdown
# NFR Assessment: {epic}.{story}

Date: {date}
Reviewer: Quinn

<!-- Note: Source story not found (if applicable) -->

## Summary

- Security: CONCERNS - Missing rate limiting
- Performance: PASS - Meets <200ms requirement
- Reliability: PASS - Proper error handling
- Maintainability: CONCERNS - Test coverage below target

## Critical Issues

1. **No rate limiting** (Security)
   - Risk: Brute force attacks possible
   - Fix: Add rate limiting middleware to auth endpoints

2. **Test coverage 65%** (Maintainability)
   - Risk: Untested code paths
   - Fix: Add tests for uncovered branches

## Quick Wins

- Add rate limiting: ~2 hours
- Increase test coverage: ~4 hours
- Add performance monitoring: ~1 hour
```

## Saída 3: Linha de Atualização da Story

**Termine com esta linha para a task de revisão citar:**

```
NFR assessment: qa.qaLocation/assessments/{epic}.{story}-nfr-{YYYYMMDD}.md
```

## Saída 4: Linha de Integração do Gate

**Sempre imprima ao final:**

```
Gate NFR block ready → paste into qa.qaLocation/gates/{epic}.{story}-{slug}.yml under nfr_validation
```

## Critérios de Avaliação

### Segurança

**PASS se:**

- Autenticação implementada
- Autorização imposta
- Validação de entrada presente
- Nenhum segredo hardcoded

**CONCERNS se:**

- Sem rate limiting
- Criptografia fraca
- Autorização incompleta

**FAIL se:**

- Sem autenticação
- Credenciais hardcoded
- Vulnerabilidades de SQL injection

### Performance

**PASS se:**

- Atende aos targets de tempo de resposta
- Sem gargalos óbvios
- Uso razoável de recursos

**CONCERNS se:**

- Próximo dos limites
- Índices ausentes
- Sem estratégia de cache

**FAIL se:**

- Excede os limites de tempo de resposta
- Vazamentos de memória
- Queries não otimizadas

### Confiabilidade

**PASS se:**

- Tratamento de erros presente
- Degradação graciosa
- Lógica de retry onde necessário

**CONCERNS se:**

- Alguns casos de erro não tratados
- Sem circuit breakers
- Health checks ausentes

**FAIL se:**

- Sem tratamento de erros
- Quebra em erros
- Sem mecanismos de recuperação

### Manutenibilidade

**PASS se:**

- Cobertura de testes atende ao target
- Código bem estruturado
- Documentação presente

**CONCERNS se:**

- Cobertura de testes abaixo do target
- Alguma duplicação de código
- Documentação ausente

**FAIL se:**

- Sem testes
- Código altamente acoplado
- Sem documentação

## Referência Rápida

### O Que Verificar

```yaml
security:
  - Authentication mechanism
  - Authorization checks
  - Input validation
  - Secret management
  - Rate limiting

performance:
  - Response times
  - Database queries
  - Caching usage
  - Resource consumption

reliability:
  - Error handling
  - Retry logic
  - Circuit breakers
  - Health checks
  - Logging

maintainability:
  - Test coverage
  - Code structure
  - Documentation
  - Dependencies
```

## Princípios-Chave

- Foque nos quatro NFRs principais por padrão
- Avaliação rápida, não análise profunda
- Formato de saída pronto para o gate
- Achados breves e acionáveis
- Pule o que não se aplica
- Regras de status determinísticas para consistência
- Targets desconhecidos → CONCERNS, não suposições

---

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
task: qaNfrAssess()
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

**Propósito:** Validar o sucesso da execução APÓS a task ser concluída

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
  - **Propósito:** Validação e geração de relatórios baseada em regras
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
  - **Local:** .aiox-core/scripts/run-validation.js

---

## Tratamento de Erros

**Estratégia:** fallback

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
- Análise iterativa com limites de profundidade; cachear resultados intermediários; agrupar operações similares

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


## Apêndice: Referência ISO 25010

<details>
<summary>Modelo de Qualidade ISO 25010 Completo (clique para expandir)</summary>

### Todas as 8 Características de Qualidade

1. **Adequação Funcional (Functional Suitability)**: Completude, correção, adequação
2. **Eficiência de Performance (Performance Efficiency)**: Comportamento temporal, uso de recursos, capacidade
3. **Compatibilidade (Compatibility)**: Coexistência, interoperabilidade
4. **Usabilidade (Usability)**: Aprendizibilidade, operabilidade, acessibilidade
5. **Confiabilidade (Reliability)**: Maturidade, disponibilidade, tolerância a falhas
6. **Segurança (Security)**: Confidencialidade, integridade, autenticidade
7. **Manutenibilidade (Maintainability)**: Modularidade, reusabilidade, testabilidade
8. **Portabilidade (Portability)**: Adaptabilidade, instalabilidade

Use estas ao avaliar além dos quatro principais.

</details>

<details>
<summary>Exemplo: Análise Profunda de Performance (clique para expandir)</summary>

```yaml
performance_deep_dive:
  response_times:
    p50: 45ms
    p95: 180ms
    p99: 350ms
  database:
    slow_queries: 2
    missing_indexes: ['users.email', 'orders.user_id']
  caching:
    hit_rate: 0%
    recommendation: 'Add Redis for session data'
  load_test:
    max_rps: 150
    breaking_point: 200 rps
```

</details>
 