<!--
## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com registro de logs
- Interação mínima com o usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Balanceado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pré-Voo - Planejamento Abrangente Antecipado
- Fase de análise da tarefa (identificar todas as ambiguidades)
- Execução com zero ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: kbModeInteraction()
responsável: Orion (Commander)
responsavel_type: Agente
atomic_layer: Atom

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

## Pré-Condições

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

## Pós-Condições

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

**Propósito:** Critérios definitivos de aprovação/reprovação para a conclusão da task

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

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Error:** Task Not Found
   - **Cause:** A task especificada não está registrada no sistema
   - **Resolution:** Verificar o nome e o registro da task
   - **Recovery:** Listar tasks disponíveis, sugerir similares

2. **Error:** Invalid Parameters
   - **Cause:** Os parâmetros da task não correspondem ao schema esperado
   - **Resolution:** Validar parâmetros contra a definição da task
   - **Recovery:** Fornecer template de parâmetros, rejeitar execução

3. **Error:** Execution Timeout
   - **Cause:** A task excede o tempo máximo de execução
   - **Resolution:** Otimizar a task ou aumentar o timeout
   - **Recovery:** Encerrar a task, limpar recursos, registrar estado

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 0.5-2 min (estimated)
cost_estimated: $0.0001-0.0005
token_usage: ~500-1,000 tokens
```

**Notas de Otimização:**
- Minimizar dependências externas; fazer cache de resultados se reutilizáveis; validar entradas cedo

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

 Powered by AIOX™ Core -->

---
# Nenhum checklist necessário - task interativa de facilitação do modo KB, nenhum workflow de validação requerido
---

# Task de Interação em Modo KB

## Propósito

Fornecer uma interface amigável ao usuário para a base de conhecimento do AIOX sem sobrecarregar os usuários com informações de uma só vez.

## Instruções

Ao entrar no modo KB (*kb-mode), siga estes passos:

### 1. Dar Boas-Vindas e Orientar

Anuncie a entrada no modo KB com uma introdução breve e amigável.

### 2. Apresentar Áreas Temáticas

Ofereça uma lista concisa das principais áreas temáticas que o usuário pode querer explorar:

**Sobre o que você gostaria de saber mais?**

1. **Setup & Instalação** - Primeiros passos com o AIOX
2. **Workflows** - Escolhendo o workflow certo para o seu projeto
3. **Web vs IDE** - Quando usar cada ambiente
4. **Agentes** - Entendendo os agentes especializados e seus papéis
5. **Documentos** - PRDs, Arquitetura, Stories e mais
6. **Processo Ágil** - Como o AIOX implementa metodologias Ágeis
7. **Configuração** - Personalizando o AIOX para suas necessidades
8. **Boas Práticas** - Dicas para o uso eficaz do AIOX

Ou me pergunte sobre qualquer outra coisa relacionada ao aiox-core!

### 3. Responder Contextualmente

- Aguardar a pergunta específica ou a seleção de tópico do usuário
- Fornecer informações focadas e relevantes a partir da base de conhecimento
- Oferecer aprofundamento ou exploração de tópicos relacionados
- Manter as respostas concisas, a menos que o usuário peça explicações detalhadas

### 4. Exploração Interativa

- Após responder, sugerir tópicos relacionados que possam ser úteis
- Manter um fluxo conversacional em vez de despejar dados
- Usar exemplos quando apropriado
- Referenciar seções específicas da documentação quando relevante

### 5. Sair com Elegância

Quando o usuário terminar ou quiser sair do modo KB:

- Resumir os pontos-chave discutidos, se útil
- Lembrá-lo de que pode retornar ao modo KB a qualquer momento com *kb-mode
- Sugerir próximos passos com base no que foi discutido

## Exemplo de Interação

**Usuário**: *kb-mode

**Assistente**: Entrei no modo KB e tenho acesso à base de conhecimento completa do AIOX. Posso ajudá-lo com informações detalhadas sobre qualquer aspecto do aiox-core.

**Sobre o que você gostaria de saber mais?**

1. **Setup & Instalação** - Primeiros passos com o AIOX
2. **Workflows** - Escolhendo o workflow certo para o seu projeto
3. **Web vs IDE** - Quando usar cada ambiente
4. **Agentes** - Entendendo os agentes especializados e seus papéis
5. **Documentos** - PRDs, Arquitetura, Stories e mais
6. **Processo Ágil** - Como o AIOX implementa metodologias Ágeis
7. **Configuração** - Personalizando o AIOX para suas necessidades
8. **Boas Práticas** - Dicas para o uso eficaz do AIOX

Ou me pergunte sobre qualquer outra coisa relacionada ao aiox-core!

**Usuário**: Me fale sobre workflows

**Assistente**: [Fornece informações focadas sobre workflows a partir da KB, depois oferece explorar tipos específicos de workflow ou tópicos relacionados]
