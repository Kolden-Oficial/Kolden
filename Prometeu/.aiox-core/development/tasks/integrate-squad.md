---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Integrar com Squad

> Task ID: atlas-integrate-Squad
> Agente: Atlas (Design System Builder)
> Version: 1.0.0

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

### 3. Planejamento Pre-Flight - Planejamento Abrangente Antecipado
- Fase de análise da task (identificar todas as ambiguidades)
- Execução com zero ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: integrateExpansionPack()
responsável: Dex (Builder)
responsavel_type: Agente
atomic_layer: Molecule

**Entrada:**
- campo: task
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Must be registered task

- campo: parameters
  tipo: object
  origem: User Input
  obrigatório: false
  validação: Valid task parameters

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

## Pré-condições

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Task is registered; required parameters provided; dependencies met
    tipo: pre-condition
    blocker: true
    validação: |
      Check task is registered; required parameters provided; dependencies met
    error_message: "Pre-condition failed: Task is registered; required parameters provided; dependencies met"
```

---

## Pós-condições

**Propósito:** Validar o sucesso da execução APÓS a task ser concluída

**Checklist:**

```yaml
post-conditions:
  - [ ] Task completed; exit code 0; expected outputs created
    tipo: post-condition
    blocker: true
    validação: |
      Verify task completed; exit code 0; expected outputs created
    error_message: "Post-condition failed: Task completed; exit code 0; expected outputs created"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de pass/fail para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Task completed as expected; side effects documented
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Assert task completed as expected; side effects documented
    error_message: "Acceptance criterion not met: Task completed as expected; side effects documented"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** task-runner
  - **Propósito:** Execução e orquestração de tasks
  - **Origem:** .aiox-core/core/task-runner.js

- **Ferramenta:** logger
  - **Propósito:** Logging de execução e rastreamento de erros
  - **Origem:** .aiox-core/utils/logger.js

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** execute-task.js
  - **Propósito:** Wrapper genérico de execução de task
  - **Linguagem:** JavaScript
  - **Local:** .aiox-core/scripts/execute-task.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Task Não Encontrada
   - **Causa:** Task especificada não registrada no sistema
   - **Resolução:** Verificar o nome e o registro da task
   - **Recuperação:** Listar tasks disponíveis, sugerir similares

2. **Erro:** Parâmetros Inválidos
   - **Causa:** Parâmetros da task não correspondem ao schema esperado
   - **Resolução:** Validar parâmetros contra a definição da task
   - **Recuperação:** Fornecer template de parâmetros, rejeitar execução

3. **Erro:** Timeout de Execução
   - **Causa:** Task excede o tempo máximo de execução
   - **Resolução:** Otimizar a task ou aumentar o timeout
   - **Recuperação:** Encerrar a task, limpar recursos, registrar o estado

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 2-5 min (estimated)
cost_estimated: $0.001-0.003
token_usage: ~1,000-3,000 tokens
```

**Notas de Otimização:**
- Paralelizar operações independentes; reutilizar resultados de atoms; implementar saídas antecipadas

---

## Metadados

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


## Descrição

Conectar o design system com os squads MMOS, CreatorOS ou InnerLens. Gera padrões específicos do pack, variações de tokens e documentação de integração.

## Pré-requisitos

- Setup do design system concluído
- Componentes construídos
- Squad alvo instalado

## Workflow

### Passos

1. **Detectar Pack Alvo** - Identificar MMOS, CreatorOS ou InnerLens
2. **Carregar Requisitos do Pack** - Ler necessidades de padrões específicos do pack
3. **Gerar Variações de Tokens** - Tokens baseados em personalidade/tema
4. **Gerar Padrões Específicos do Pack** - Componentes customizados para o pack
5. **Criar Hooks de Integração** - Conectar os workflows do pack
6. **Gerar Docs de Integração** - Guia de uso para o pack
7. **Testar Integração** - Validar que o pack consegue usar os padrões
8. **Atualizar Estado** - Rastrear a conclusão da integração

## Saída

- Componentes específicos do pack
- Variações de tokens
- Documentação de integração
- Exemplo de uso

## Critérios de Sucesso

- [ ] O pack consegue importar e usar o design system
- [ ] As variações de tokens funcionam corretamente
- [ ] Os padrões específicos do pack estão funcionais
- [ ] A integração está documentada
- [ ] Sem regressões na funcionalidade do pack

## Exemplos

### Integração MMOS

```typescript
// Personality token variations
{
  formal: {
    fontFamily: 'var(--font-serif)',
    spacing: 'var(--space-formal)',
    colorPrimary: 'var(--color-corporate)'
  },
  casual: {
    fontFamily: 'var(--font-sans)',
    spacing: 'var(--space-relaxed)',
    colorPrimary: 'var(--color-friendly)'
  }
}

// CloneChatInterface component
<CloneChatInterface
  personality="formal"
  tokens={personalityTokens.formal}
/>
```

### Integração CreatorOS

```typescript
// Educational token variations
{
  fonts: 'readable (18px)',
  lineHeight: '1.6 (comprehension)',
  spacing: 'generous',
  colors: 'highlight focus'
}

// CourseVideoPlayer component
<CourseVideoPlayer
  tokens={educationalTokens}
  accessibility="WCAG AAA"
/>
```

### Integração InnerLens

```typescript
// Minimal distraction tokens
{
  colors: 'neutral, minimal',
  layout: 'clean, focused',
  spacing: 'balanced'
}

// AssessmentForm component
<AssessmentForm
  tokens={minimalTokens}
  validationUI={systemValidation}
/>
```

## Notas

- Cada pack tem requisitos únicos
- As variações de tokens mantêm a consistência
- Componentes específicos do pack estendem o sistema base
- A integração é bidirecional (pack ↔ design system)
- Documentar no README do pack
