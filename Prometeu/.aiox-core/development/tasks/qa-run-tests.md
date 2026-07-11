---
name: run-tests
agent: qa
requires:
  - jest
  - coderabbit
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Run Tests (com Gate de Qualidade de Código)

Executa a suíte de testes e valida a qualidade do código antes de marcar os testes como concluídos.

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

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: qaRunTests()
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


## Passos

### 1. Rodar Testes Unitários
```bash
cd api
npm run test
```

**Esperado**: Todos os testes passam, cobertura >= 80%

### 2. Rodar Testes de Integração
```bash
npm run test:integration
```

### 3. Revisão de Qualidade de Código
```bash
# Revisar o código que foi testado
coderabbit --prompt-only -t uncommitted
```

**Parsear a saída**:
- Se forem encontrados problemas CRITICAL ou HIGH → FAIL
- Se apenas MEDIUM/LOW → WARN mas PASS

### 4. Gerar Relatório de QA

Use o template: `qa-gate-tmpl.yaml`

Inclua:
- Resultados dos testes (aprovação/reprovação, % de cobertura)
- Resumo do CodeRabbit (problemas por severidade)
- Recomendação (aprovar/rejeitar a story)

### 5. Atualizar Status da Story

Se tudo passar:
- [ ] Marcar os testes da story como concluídos
- [ ] Adicionar comentário de aprovação do QA
- [ ] Mover para "Ready for Deploy"

Se houver falhas:
- [ ] Documentar as falhas na story
- [ ] Criar issues de dívida técnica para os MEDIUM
- [ ] Solicitar correções ao @dev

## Integração com o CodeRabbit

**O CodeRabbit ajuda o agente @qa**:
- A capturar problemas que os testes podem perder (erros de lógica, condições de corrida)
- A validar padrões de segurança (SQL injection, segredos hardcoded)
- A aplicar padrões de codificação automaticamente
- A gerar métricas de qualidade

## Config

```yaml
codeRabbit:
  enabled: true
  severity_threshold: high
  auto_fix: false  # QA reviews but doesn't auto-fix
  report_location: docs/qa/coderabbit-reports/
```
