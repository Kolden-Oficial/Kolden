---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com logging
- Interação mínima com o usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pre-Flight - Planejamento Antecipado Abrangente
- Fase de análise da task (identificar todas as ambiguidades)
- Execução com zero ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V2.0)

```yaml
task: testValidationTask()
responsável: Dex (Dev Agent)
responsavel_type: Agente
atomic_layer: Test

**Entrada:**
- campo: test_input
  tipo: string
  origem: User Input
  obrigatório: false
  validação: Parâmetro de entrada de teste opcional

**Saída:**
- campo: validation_result
  tipo: object
  destino: Memory
  persistido: false

- campo: success
  tipo: boolean
  destino: Return value
  persistido: false
```

---

## Pré-condições

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Ambiente de teste disponível
    tipo: pre-condition
    blocker: true
    validação: |
      Verificar se o ambiente de teste está disponível
    error_message: "Pré-condição falhou: Ambiente de teste não disponível"
```

---

## Pós-condições

**Propósito:** Validar o sucesso da execução APÓS a conclusão da task

**Checklist:**

```yaml
post-conditions:
  - [ ] Validação concluída com sucesso
    tipo: post-condition
    blocker: true
    validação: |
      Verificar se a validação foi concluída com sucesso
    error_message: "Pós-condição falhou: A validação não foi concluída com sucesso"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de pass/fail para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Task executada com sucesso
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Assertar que a task foi executada com sucesso
    error_message: "Critério de aceite não atendido: A task não foi executada com sucesso"
```

---

## Propósito

Esta é uma task de teste criada para validar a execução da task `create-task`. Ela fornece funcionalidade mínima para testar o workflow de criação de tasks.

## Implementação

1. **Validar Entradas**
   - Verificar a entrada de teste, se fornecida
   - Validar o ambiente

2. **Executar Validação**
   - Realizar um teste de validação simples
   - Retornar o status de sucesso

3. **Emitir Resultado**
   - Retornar o resultado da validação
   - Registrar a execução

## Tratamento de Erros

**Estratégia:** abort

**Erros Comuns:**

1. **Erro:** Ambiente de Teste Não Disponível
   - **Causa:** Ambiente de teste não configurado
   - **Resolução:** Garantir que o ambiente de teste esteja disponível
   - **Recuperação:** Registrar o erro e abortar

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: < 1 min
cost_estimated: $0.0001
token_usage: ~100-200 tokens
```

---

## Metadata

```yaml
story: STORY-6.1.7.2
version: 1.0.0
dependencies:
  - N/A
tags:
  - test
  - validation
updated_at: 2025-01-17
```

---

**Criado Por:** Dex (Dev Agent)  
**Data de Criação:** 2025-01-17  
**Propósito:** Task de teste para validar a execução da task create-task  
**Status:** Apenas Teste/Validação

