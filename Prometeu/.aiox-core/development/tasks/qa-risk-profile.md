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
task: qaRiskProfile()
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
  - github-cli        # Code analysis and historical risk patterns
  - context7          # Research security vulnerabilities and patterns
  - exa               # Research similar implementation risks
checklists:
  - architect-master-checklist.md
---

# risk-profile

Gera uma matriz abrangente de avaliação de risco para a implementação de uma story usando análise de probabilidade × impacto.

## Inputs

```yaml
required:
  - story_id: '{epic}.{story}' # e.g., "1.3"
  - story_path: 'docs/stories/{epic}.{story}.*.md'
  - story_title: '{title}' # If missing, derive from story file H1
  - story_slug: '{slug}' # If missing, derive from title (lowercase, hyphenated)
```

## Propósito

Identificar, avaliar e priorizar riscos na implementação da story. Fornecer estratégias de mitigação de risco e áreas de foco de teste com base nos níveis de risco.

## Framework de Avaliação de Risco

### Categorias de Risco

**Prefixos de Categoria:**

- `TECH`: Riscos Técnicos
- `SEC`: Riscos de Segurança
- `PERF`: Riscos de Performance
- `DATA`: Riscos de Dados
- `BUS`: Riscos de Negócio
- `OPS`: Riscos Operacionais

1. **Riscos Técnicos (TECH)**
   - Complexidade de arquitetura
   - Desafios de integração
   - Dívida técnica
   - Preocupações de escalabilidade
   - Dependências de sistema

2. **Riscos de Segurança (SEC)**
   - Falhas de autenticação/autorização
   - Vulnerabilidades de exposição de dados
   - Ataques de injeção
   - Problemas de gerenciamento de sessão
   - Fraquezas criptográficas

3. **Riscos de Performance (PERF)**
   - Degradação do tempo de resposta
   - Gargalos de throughput
   - Exaustão de recursos
   - Otimização de queries de banco de dados
   - Falhas de cache

4. **Riscos de Dados (DATA)**
   - Potencial de perda de dados
   - Corrupção de dados
   - Violações de privacidade
   - Problemas de conformidade
   - Lacunas de backup/recuperação

5. **Riscos de Negócio (BUS)**
   - Funcionalidade não atende às necessidades do usuário
   - Impacto na receita
   - Dano à reputação
   - Não conformidade regulatória
   - Timing de mercado

6. **Riscos Operacionais (OPS)**
   - Falhas de deploy
   - Lacunas de monitoramento
   - Prontidão de resposta a incidentes
   - Inadequação da documentação
   - Problemas de transferência de conhecimento

## Processo de Análise de Risco

### 1. Identificação de Risco

Para cada categoria, identifique riscos específicos:

```yaml
risk:
  id: 'SEC-001' # Use prefixes: SEC, PERF, DATA, BUS, OPS, TECH
  category: security
  title: 'Insufficient input validation on user forms'
  description: 'Form inputs not properly sanitized could lead to XSS attacks'
  affected_components:
    - 'UserRegistrationForm'
    - 'ProfileUpdateForm'
  detection_method: 'Code review revealed missing validation'
```

### 2. Avaliação de Risco

Avalie cada risco usando probabilidade × impacto:

**Níveis de Probabilidade:**

- `High (3)`: Provável de ocorrer (>70% de chance)
- `Medium (2)`: Ocorrência possível (30-70% de chance)
- `Low (1)`: Improvável de ocorrer (<30% de chance)

**Níveis de Impacto:**

- `High (3)`: Consequências severas (vazamento de dados, sistema fora do ar, grande perda financeira)
- `Medium (2)`: Consequências moderadas (performance degradada, problemas menores de dados)
- `Low (1)`: Consequências menores (problemas cosméticos, leve inconveniência)

### Pontuação de Risco = Probabilidade × Impacto

- 9: Risco Crítico (Vermelho)
- 6: Risco Alto (Laranja)
- 4: Risco Médio (Amarelo)
- 2-3: Risco Baixo (Verde)
- 1: Risco Mínimo (Azul)

### 3. Priorização de Risco

Crie a matriz de risco:

```markdown
## Risk Matrix

| Risk ID  | Description             | Probability | Impact     | Score | Priority |
| -------- | ----------------------- | ----------- | ---------- | ----- | -------- |
| SEC-001  | XSS vulnerability       | High (3)    | High (3)   | 9     | Critical |
| PERF-001 | Slow query on dashboard | Medium (2)  | Medium (2) | 4     | Medium   |
| DATA-001 | Backup failure          | Low (1)     | High (3)   | 3     | Low      |
```

### 4. Estratégias de Mitigação de Risco

Para cada risco identificado, forneça a mitigação:

```yaml
mitigation:
  risk_id: 'SEC-001'
  strategy: 'preventive' # preventive|detective|corrective
  actions:
    - 'Implement input validation library (e.g., validator.js)'
    - 'Add CSP headers to prevent XSS execution'
    - 'Sanitize all user inputs before storage'
    - 'Escape all outputs in templates'
  testing_requirements:
    - 'Security testing with OWASP ZAP'
    - 'Manual penetration testing of forms'
    - 'Unit tests for validation functions'
  residual_risk: 'Low - Some zero-day vulnerabilities may remain'
  owner: 'dev'
  timeline: 'Before deployment'
```

## Outputs

### Output 1: Bloco YAML do Gate

Gere para colar no arquivo de gate sob `risk_summary`:

**Regras de saída:**

- Inclua apenas os riscos avaliados; não emita placeholders
- Ordene os riscos por pontuação (desc) ao emitir o mais alto e quaisquer listas tabulares
- Se não houver riscos: totais todos zerados, omita o mais alto, mantenha os arrays de recommendations vazios

```yaml
# risk_summary (paste into gate file):
risk_summary:
  totals:
    critical: X # score 9
    high: Y # score 6
    medium: Z # score 4
    low: W # score 2-3
  highest:
    id: SEC-001
    score: 9
    title: 'XSS on profile form'
  recommendations:
    must_fix:
      - 'Add input sanitization & CSP'
    monitor:
      - 'Add security alerts for auth endpoints'
```

### Output 2: Relatório em Markdown

**Salvar em:** `qa.qaLocation/assessments/{epic}.{story}-risk-{YYYYMMDD}.md`

```markdown
# Risk Profile: Story {epic}.{story}

Date: {date}
Reviewer: Quinn (Test Architect)

## Executive Summary

- Total Risks Identified: X
- Critical Risks: Y
- High Risks: Z
- Risk Score: XX/100 (calculated)

## Critical Risks Requiring Immediate Attention

### 1. [ID]: Risk Title

**Score: 9 (Critical)**
**Probability**: High - Detailed reasoning
**Impact**: High - Potential consequences
**Mitigation**:

- Immediate action required
- Specific steps to take
  **Testing Focus**: Specific test scenarios needed

## Risk Distribution

### By Category

- Security: X risks (Y critical)
- Performance: X risks (Y critical)
- Data: X risks (Y critical)
- Business: X risks (Y critical)
- Operational: X risks (Y critical)

### By Component

- Frontend: X risks
- Backend: X risks
- Database: X risks
- Infrastructure: X risks

## Detailed Risk Register

[Full table of all risks with scores and mitigations]

## Risk-Based Testing Strategy

### Priority 1: Critical Risk Tests

- Test scenarios for critical risks
- Required test types (security, load, chaos)
- Test data requirements

### Priority 2: High Risk Tests

- Integration test scenarios
- Edge case coverage

### Priority 3: Medium/Low Risk Tests

- Standard functional tests
- Regression test suite

## Risk Acceptance Criteria

### Must Fix Before Production

- All critical risks (score 9)
- High risks affecting security/data

### Can Deploy with Mitigation

- Medium risks with compensating controls
- Low risks with monitoring in place

### Accepted Risks

- Document any risks team accepts
- Include sign-off from appropriate authority

## Monitoring Requirements

Post-deployment monitoring for:

- Performance metrics for PERF risks
- Security alerts for SEC risks
- Error rates for operational risks
- Business KPIs for business risks

## Risk Review Triggers

Review and update risk profile when:

- Architecture changes significantly
- New integrations added
- Security vulnerabilities discovered
- Performance issues reported
- Regulatory requirements change
```

## Algoritmo de Pontuação de Risco

Calcule a pontuação geral de risco da story:

```text
Base Score = 100
For each risk:
  - Critical (9): Deduct 20 points
  - High (6): Deduct 10 points
  - Medium (4): Deduct 5 points
  - Low (2-3): Deduct 2 points

Minimum score = 0 (extremely risky)
Maximum score = 100 (minimal risk)
```

## Recomendações Baseadas em Risco

Com base no perfil de risco, recomende:

1. **Prioridade de Teste**
   - Quais testes rodar primeiro
   - Tipos adicionais de teste necessários
   - Requisitos de ambiente de teste

2. **Foco de Desenvolvimento**
   - Áreas de ênfase da revisão de código
   - Validação adicional necessária
   - Controles de segurança a implementar

3. **Estratégia de Deploy**
   - Rollout faseado para mudanças de alto risco
   - Feature flags para funcionalidades arriscadas
   - Procedimentos de rollback

4. **Configuração de Monitoramento**
   - Métricas a rastrear
   - Alertas a configurar
   - Requisitos de dashboard

## Integração com Quality Gates

**Mapeamento determinístico de gate:**

- Qualquer risco com pontuação ≥ 9 → Gate = FAIL (a menos que dispensado/waived)
- Senão se qualquer pontuação ≥ 6 → Gate = CONCERNS
- Senão → Gate = PASS
- Riscos não mitigados → Documentar no gate

### Output 3: Linha de Hook da Story

**Imprima esta linha para a task de revisão citar:**

```text
Risk profile: qa.qaLocation/assessments/{epic}.{story}-risk-{YYYYMMDD}.md
```

## Princípios Chave

- Identifique riscos cedo e sistematicamente
- Use pontuação consistente de probabilidade × impacto
- Forneça estratégias de mitigação acionáveis
- Vincule os riscos a requisitos específicos de teste
- Rastreie o risco residual após a mitigação
- Atualize o perfil de risco conforme a story evolui
