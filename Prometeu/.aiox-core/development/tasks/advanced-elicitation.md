# advanced-elicitation

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com registro em log
- Interação mínima com o usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pré-Voo (Pre-Flight) - Planejamento Abrangente Antecipado
- Fase de análise da tarefa (identificar todas as ambiguidades)
- Execução sem ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (Formato de Task AIOX V1.0)

```yaml
task: advancedElicitation()
responsible: Atlas (Decoder)
responsible_type: Agent
atomic_layer: Strategy

inputs:
  - field: task
    type: string
    source: User Input
    required: true
    validation: Deve ser uma task registrada

  - field: parameters
    type: object
    source: User Input
    required: false
    validation: Parâmetros de task válidos

  - field: mode
    type: string
    source: User Input
    required: false
    validation: yolo|interactive|pre-flight

outputs:
  - field: execution_result
    type: object
    destination: Memory
    persisted: false

  - field: logs
    type: array
    destination: File (.ai/logs/*)
    persisted: true

  - field: state
    type: object
    destination: State management
    persisted: true
```

---

## Pré-Condições

**Propósito:** Validar os pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Task registrada; parâmetros obrigatórios fornecidos; dependências atendidas
    tipo: pre-condition
    blocker: true
    validação: |
      Verificar se a task está registrada; parâmetros obrigatórios fornecidos; dependências atendidas
    error_message: "Pré-condição falhou: Task registrada; parâmetros obrigatórios fornecidos; dependências atendidas"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a conclusão da task

**Checklist:**

```yaml
post-conditions:
  - [ ] Task concluída; exit code 0; saídas esperadas criadas
    tipo: post-condition
    blocker: true
    validação: |
      Verificar se a task foi concluída; exit code 0; saídas esperadas criadas
    error_message: "Pós-condição falhou: Task concluída; exit code 0; saídas esperadas criadas"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de aprovação/reprovação para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Task concluída conforme o esperado; efeitos colaterais documentados
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Garantir que a task foi concluída conforme o esperado; efeitos colaterais documentados
    error_message: "Critério de aceite não atendido: Task concluída conforme o esperado; efeitos colaterais documentados"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** task-runner
  - **Propósito:** Execução e orquestração de tasks
  - **Origem:** .aiox-core/core/task-runner.js

- **Ferramenta:** logger
  - **Propósito:** Registro de execução e rastreamento de erros
  - **Origem:** .aiox-core/utils/logger.js

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** execute-task.js
  - **Propósito:** Wrapper genérico de execução de task
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/scripts/execute-task.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Task Não Encontrada
   - **Causa:** A task especificada não está registrada no sistema
   - **Resolução:** Verifique o nome e o registro da task
   - **Recuperação:** Listar tasks disponíveis, sugerir similares

2. **Erro:** Parâmetros Inválidos
   - **Causa:** Os parâmetros da task não correspondem ao schema esperado
   - **Resolução:** Validar os parâmetros contra a definição da task
   - **Recuperação:** Fornecer template de parâmetros, rejeitar a execução

3. **Erro:** Timeout de Execução
   - **Causa:** A task excede o tempo máximo de execução
   - **Resolução:** Otimizar a task ou aumentar o timeout
   - **Recuperação:** Encerrar a task, limpar recursos, registrar o estado

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 5-20 min (estimado)
cost_estimated: $0.003-0.015
token_usage: ~2.000-8.000 tokens
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
  - automation
  - workflow
updated_at: 2025-11-17
```

---

## Propósito

- Fornecer ações reflexivas e de brainstorming opcionais para aprimorar a qualidade do conteúdo
- Permitir exploração mais profunda de ideias por meio de técnicas estruturadas de elicitação
- Apoiar o refinamento iterativo por meio de múltiplas perspectivas analíticas
- Utilizável durante a criação de documentos guiada por template ou em qualquer conversa de chat

## Cenários de Uso

### Cenário 1: Criação de Documento por Template

Após gerar uma seção durante a criação de um documento:

1. **Revisão da Seção**: Peça ao usuário para revisar a seção rascunhada
2. **Oferecer Elicitação**: Apresente 9 métodos de elicitação cuidadosamente selecionados
3. **Seleção Simples**: O usuário digita um número (0-8) para acionar um método, ou 9 para prosseguir
4. **Executar & Repetir**: Aplique o método selecionado, depois ofereça as escolhas novamente até o usuário prosseguir

### Cenário 2: Elicitação em Chat Geral

O usuário pode solicitar elicitação avançada sobre qualquer saída do agente:

- O usuário diz "faça elicitação avançada" ou algo similar
- O agente seleciona 9 métodos relevantes para o contexto
- Mesmo processo simples de seleção 0-9

## Instruções da Task

### 1. Seleção Inteligente de Métodos

**Análise de Contexto**: Antes de apresentar as opções, analise:

- **Tipo de Conteúdo**: Especificações técnicas, user stories, arquitetura, requisitos, etc.
- **Nível de Complexidade**: Conteúdo simples, moderado ou complexo
- **Necessidades dos Stakeholders**: Quem usará esta informação
- **Nível de Risco**: Decisões de alto impacto vs itens rotineiros
- **Potencial Criativo**: Oportunidades para inovação ou alternativas

**Estratégia de Seleção de Métodos**:

1. **Sempre Inclua Métodos Centrais** (escolha 3-4):
   - Expandir ou Contrair para o Público
   - Criticar e Refinar
   - Identificar Riscos Potenciais
   - Avaliar Alinhamento com os Objetivos

2. **Métodos Específicos do Contexto** (escolha 4-5):
   - **Conteúdo Técnico**: Tree of Thoughts, ReWOO, Meta-Prompting
   - **Conteúdo Voltado ao Usuário**: Perspectiva do Time Ágil, Mesa Redonda de Stakeholders
   - **Conteúdo Criativo**: Torneio de Inovação, Desafio Escape Room
   - **Conteúdo Estratégico**: Red Team vs Blue Team, Reflexão em Retrospectiva (Hindsight)

3. **Sempre Inclua**: "Prosseguir / Sem Ações Adicionais" como opção 9

### 2. Contexto e Revisão da Seção

Quando invocado após gerar uma seção:

1. **Fornecer Resumo de Contexto**: Dê um breve resumo de 1-2 frases sobre o que o usuário deve observar na seção recém-apresentada

2. **Explicar Elementos Visuais**: Se a seção contiver diagramas, explique-os brevemente antes de oferecer as opções de elicitação

3. **Esclarecer Opções de Escopo**: Se a seção contiver múltiplos itens distintos, informe ao usuário que ele pode aplicar ações de elicitação a:
   - A seção inteira como um todo
   - Itens individuais dentro da seção (especifique qual item ao selecionar uma ação)

### 3. Apresentar Opções de Elicitação

**Processo de Solicitação de Revisão:**

- Peça ao usuário para revisar a seção rascunhada
- Na MESMA mensagem, informe-o de que ele pode sugerir mudanças diretas OU selecionar um método de elicitação
- Apresente 9 métodos selecionados inteligentemente (0-8) mais "Prosseguir" (9)
- Mantenha as descrições curtas - apenas o nome do método
- Aguarde uma seleção numérica simples

**Formato de Apresentação da Lista de Ações:**

```text
**Opções de Elicitação Avançada**
Escolha um número (0-8) ou 9 para prosseguir:

0. [Nome do Método]
1. [Nome do Método]
2. [Nome do Método]
3. [Nome do Método]
4. [Nome do Método]
5. [Nome do Método]
6. [Nome do Método]
7. [Nome do Método]
8. [Nome do Método]
9. Prosseguir / Sem Ações Adicionais
```

**Tratamento de Resposta:**

- **Números 0-8**: Execute o método selecionado, depois ofereça a escolha novamente
- **Número 9**: Prosseguir para a próxima seção ou continuar a conversa
- **Feedback Direto**: Aplique as mudanças sugeridas pelo usuário e continue

### 4. Framework de Execução de Métodos

**Processo de Execução:**

1. **Recuperar o Método**: Acesse o método de elicitação específico no arquivo de dados elicitation-methods
2. **Aplicar Contexto**: Execute o método a partir da perspectiva do seu papel atual
3. **Fornecer Resultados**: Entregue insights, críticas ou alternativas relevantes ao conteúdo
4. **Oferecer a Escolha Novamente**: Apresente as mesmas 9 opções novamente até o usuário selecionar 9 ou dar feedback direto

**Diretrizes de Execução:**

- **Seja Conciso**: Foque em insights acionáveis, não em explicações longas
- **Mantenha a Relevância**: Vincule toda elicitação de volta ao conteúdo específico sendo analisado
- **Identifique Personas**: Para métodos multi-persona, identifique claramente qual ponto de vista está falando
- **Mantenha o Fluxo**: Mantenha o processo avançando de forma eficiente
