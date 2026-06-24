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
task: qaRiskProfile()
responsÃ¡vel: Quinn (Guardian)
responsavel_type: Agente
atomic_layer: Strategy

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
duration_expected: 5-20 min (estimated)
cost_estimated: $0.003-0.015
token_usage: ~2,000-8,000 tokens
```

**Notas de OtimizaÃ§Ã£o:**
- AnÃ¡lise iterativa com limites de profundidade; cachear resultados intermediÃ¡rios; agrupar operaÃ§Ãµes similares em lote

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
  - github-cli        # Code analysis and historical risk patterns
  - context7          # Research security vulnerabilities and patterns
  - exa               # Research similar implementation risks
checklists:
  - architect-master-checklist.md
---

# risk-profile

Gera uma matriz abrangente de avaliaÃ§Ã£o de risco para a implementaÃ§Ã£o de uma story usando anÃ¡lise de probabilidade Ã— impacto.

## Entradas

```yaml
required:
  - story_id: '{epic}.{story}' # e.g., "1.3"
  - story_path: 'docs/stories/{epic}.{story}.*.md'
  - story_title: '{title}' # If missing, derive from story file H1
  - story_slug: '{slug}' # If missing, derive from title (lowercase, hyphenated)
```

## PropÃ³sito

Identificar, avaliar e priorizar riscos na implementaÃ§Ã£o da story. Fornecer estratÃ©gias de mitigaÃ§Ã£o de risco e Ã¡reas de foco de teste com base nos nÃ­veis de risco.

## Framework de AvaliaÃ§Ã£o de Risco

### Categorias de Risco

**Prefixos de Categoria:**

- `TECH`: Riscos TÃ©cnicos
- `SEC`: Riscos de SeguranÃ§a
- `PERF`: Riscos de Performance
- `DATA`: Riscos de Dados
- `BUS`: Riscos de NegÃ³cio
- `OPS`: Riscos Operacionais

1. **Riscos TÃ©cnicos (TECH)**
   - Complexidade de arquitetura
   - Desafios de integraÃ§Ã£o
   - DÃ­vida tÃ©cnica
   - PreocupaÃ§Ãµes de escalabilidade
   - DependÃªncias de sistema

2. **Riscos de SeguranÃ§a (SEC)**
   - Falhas de autenticaÃ§Ã£o/autorizaÃ§Ã£o
   - Vulnerabilidades de exposiÃ§Ã£o de dados
   - Ataques de injeÃ§Ã£o
   - Problemas de gerenciamento de sessÃ£o
   - Fraquezas criptogrÃ¡ficas

3. **Riscos de Performance (PERF)**
   - DegradaÃ§Ã£o do tempo de resposta
   - Gargalos de throughput
   - ExaustÃ£o de recursos
   - OtimizaÃ§Ã£o de queries de banco de dados
   - Falhas de cache

4. **Riscos de Dados (DATA)**
   - Potencial de perda de dados
   - CorrupÃ§Ã£o de dados
   - ViolaÃ§Ãµes de privacidade
   - Problemas de conformidade
   - Lacunas de backup/recuperaÃ§Ã£o

5. **Riscos de NegÃ³cio (BUS)**
   - Funcionalidade nÃ£o atende Ã s necessidades do usuÃ¡rio
   - Impacto na receita
   - Dano Ã  reputaÃ§Ã£o
   - NÃ£o conformidade regulatÃ³ria
   - Timing de mercado

6. **Riscos Operacionais (OPS)**
   - Falhas de deploy
   - Lacunas de monitoramento
   - ProntidÃ£o de resposta a incidentes
   - InadequaÃ§Ã£o da documentaÃ§Ã£o
   - Problemas de transferÃªncia de conhecimento

## Processo de AnÃ¡lise de Risco

### 1. IdentificaÃ§Ã£o de Risco

Para cada categoria, identifique riscos especÃ­ficos:

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

### 2. AvaliaÃ§Ã£o de Risco

Avalie cada risco usando probabilidade Ã— impacto:

**NÃ­veis de Probabilidade:**

- `High (3)`: ProvÃ¡vel de ocorrer (>70% de chance)
- `Medium (2)`: OcorrÃªncia possÃ­vel (30-70% de chance)
- `Low (1)`: ImprovÃ¡vel de ocorrer (<30% de chance)

**NÃ­veis de Impacto:**

- `High (3)`: ConsequÃªncias severas (vazamento de dados, sistema fora do ar, grande perda financeira)
- `Medium (2)`: ConsequÃªncias moderadas (performance degradada, problemas menores de dados)
- `Low (1)`: ConsequÃªncias menores (problemas cosmÃ©ticos, leve inconveniÃªncia)

### PontuaÃ§Ã£o de Risco = Probabilidade Ã— Impacto

- 9: Risco CrÃ­tico (Vermelho)
- 6: Risco Alto (Laranja)
- 4: Risco MÃ©dio (Amarelo)
- 2-3: Risco Baixo (Verde)
- 1: Risco MÃ­nimo (Azul)

### 3. PriorizaÃ§Ã£o de Risco

Crie a matriz de risco:

```markdown
## Risk Matrix

| Risk ID  | Description             | Probability | Impact     | Score | Priority |
| -------- | ----------------------- | ----------- | ---------- | ----- | -------- |
| SEC-001  | XSS vulnerability       | High (3)    | High (3)   | 9     | Critical |
| PERF-001 | Slow query on dashboard | Medium (2)  | Medium (2) | 4     | Medium   |
| DATA-001 | Backup failure          | Low (1)     | High (3)   | 3     | Low      |
```

### 4. EstratÃ©gias de MitigaÃ§Ã£o de Risco

Para cada risco identificado, forneÃ§a a mitigaÃ§Ã£o:

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

## SaÃ­das

### SaÃ­da 1: Bloco YAML do Gate

Gere para colar no arquivo de gate sob `risk_summary`:

**Regras de saÃ­da:**

- Inclua apenas os riscos avaliados; nÃ£o emita placeholders
- Ordene os riscos por pontuaÃ§Ã£o (desc) ao emitir o mais alto e quaisquer listas tabulares
- Se nÃ£o houver riscos: totais todos zerados, omita o mais alto, mantenha os arrays de recommendations vazios

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

### SaÃ­da 2: RelatÃ³rio em Markdown

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

## Algoritmo de PontuaÃ§Ã£o de Risco

Calcule a pontuaÃ§Ã£o geral de risco da story:

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

## RecomendaÃ§Ãµes Baseadas em Risco

Com base no perfil de risco, recomende:

1. **Prioridade de Teste**
   - Quais testes rodar primeiro
   - Tipos adicionais de teste necessÃ¡rios
   - Requisitos de ambiente de teste

2. **Foco de Desenvolvimento**
   - Ãreas de Ãªnfase da revisÃ£o de cÃ³digo
   - ValidaÃ§Ã£o adicional necessÃ¡ria
   - Controles de seguranÃ§a a implementar

3. **EstratÃ©gia de Deploy**
   - Rollout faseado para mudanÃ§as de alto risco
   - Feature flags para funcionalidades arriscadas
   - Procedimentos de rollback

4. **ConfiguraÃ§Ã£o de Monitoramento**
   - MÃ©tricas a rastrear
   - Alertas a configurar
   - Requisitos de dashboard

## IntegraÃ§Ã£o com Quality Gates

**Mapeamento determinÃ­stico de gate:**

- Qualquer risco com pontuaÃ§Ã£o â‰¥ 9 â†’ Gate = FAIL (a menos que dispensado/waived)
- SenÃ£o se qualquer pontuaÃ§Ã£o â‰¥ 6 â†’ Gate = CONCERNS
- SenÃ£o â†’ Gate = PASS
- Riscos nÃ£o mitigados â†’ Documentar no gate

### SaÃ­da 3: Linha de Hook da Story

**Imprima esta linha para a task de revisÃ£o citar:**

```text
Risk profile: qa.qaLocation/assessments/{epic}.{story}-risk-{YYYYMMDD}.md
```

## PrincÃ­pios Chave

- Identifique riscos cedo e sistematicamente
- Use pontuaÃ§Ã£o consistente de probabilidade Ã— impacto
- ForneÃ§a estratÃ©gias de mitigaÃ§Ã£o acionÃ¡veis
- Vincule os riscos a requisitos especÃ­ficos de teste
- Rastreie o risco residual apÃ³s a mitigaÃ§Ã£o
- Atualize o perfil de risco conforme a story evolui
