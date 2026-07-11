---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com logging
- Interação mínima com o usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints explícitos de decisão
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pre-Flight - Planejamento Abrangente Antecipado
- Fase de análise da tarefa (identificar todas as ambiguidades)
- Execução com zero ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: devValidateNextStory()
responsável: Dex (Builder)
responsavel_type: Agente
atomic_layer: Organism

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

**Propósito:** Validar o sucesso da execução APÓS a conclusão da task

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

## Tools

**Recursos externos/compartilhados usados por esta task:**

- **Tool:** task-runner
  - **Propósito:** Execução e orquestração de tasks
  - **Origem:** .aiox-core/core/task-runner.js

- **Tool:** logger
  - **Propósito:** Logging de execução e rastreamento de erros
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

1. **Erro:** Task Not Found
   - **Causa:** Task especificada não registrada no sistema
   - **Resolução:** Verificar o nome e o registro da task
   - **Recuperação:** Listar as tasks disponíveis, sugerir similares

2. **Erro:** Invalid Parameters
   - **Causa:** Os parâmetros da task não correspondem ao schema esperado
   - **Resolução:** Validar os parâmetros contra a definição da task
   - **Recuperação:** Fornecer template de parâmetros, rejeitar a execução

3. **Erro:** Execution Timeout
   - **Causa:** A task excede o tempo máximo de execução
   - **Resolução:** Otimizar a task ou aumentar o timeout
   - **Recuperação:** Encerrar a task, limpar recursos, registrar o estado

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 5-15 min (estimated)
cost_estimated: $0.003-0.010
token_usage: ~3,000-10,000 tokens
```

**Notas de Otimização:**
- Dividir em workflows menores; implementar checkpointing; usar processamento assíncrono sempre que possível

---

## Metadata

```yaml
story: N/A
version: 1.0.0
dependencies:
  - N/A
tags:
  - development
  - code
updated_at: 2025-11-17
```

---

tools:
  - github-cli        # Validate repository structure and file paths
  - context7          # Verify technical specifications and patterns
checklists:
  - po-master-checklist.md
---

# Task de Validação da Próxima Story

## Propósito

Validar de forma abrangente um rascunho de story antes que a implementação comece, garantindo que ele esteja completo, preciso e forneça contexto suficiente para um desenvolvimento bem-sucedido. Esta task identifica problemas e lacunas que precisam ser tratados, prevenindo alucinações e assegurando a prontidão para implementação.

## Execução SEQUENCIAL da Task (Não prossiga até que a Task atual esteja concluída)

### 0. Carregar Configuração Central e Entradas

- Carregue `.aiox-core/core-config.yaml`
- Se o arquivo não existir, PARE e informe ao usuário: "core-config.yaml não encontrado. Este arquivo é obrigatório para a validação de story."
- Extraia as configurações principais: `devStoryLocation`, `prd.*`, `architecture.*`
- Identifique e carregue as seguintes entradas:
  - **Arquivo da story**: O rascunho de story a validar (fornecido pelo usuário ou descoberto em `devStoryLocation`)
  - **Epic pai**: O epic que contém os requisitos desta story
  - **Documentos de arquitetura**: Com base na configuração (sharded ou monolítico)
  - **Template da story**: `.aiox-core/product/templates/story-tmpl.yaml` para validação de completude

### 1. Validação de Completude do Template

- Carregue `.aiox-core/product/templates/story-tmpl.yaml` e extraia todos os títulos de seção do template
- **Verificação de seções ausentes**: Compare as seções da story com as seções do template para verificar se todas as seções obrigatórias estão presentes
- **Validação de placeholders**: Garanta que nenhum placeholder do template permaneça não preenchido (ex.: `{{EpicNum}}`, `{{role}}`, `_TBD_`)
- **Verificação das seções de agente**: Confirme que todas as seções do template existem para uso futuro dos agentes
- **Conformidade estrutural**: Verifique se a story segue a estrutura e a formatação do template

### 2. Validação de Estrutura de Arquivos e Source Tree

- **Consulte tools/cli/github-cli.yaml** para comandos de validação de estrutura de repositório e operações de verificação de caminhos de arquivo
- Consulte a seção de exemplos para padrões de listagem de arquivos e inspeção de estrutura de diretórios
- **Clareza dos caminhos de arquivo**: Os arquivos novos/existentes a serem criados/modificados estão claramente especificados?
- **Relevância do source tree**: A estrutura relevante do projeto está incluída nas Dev Notes?
- **Estrutura de diretórios**: Os novos diretórios/componentes estão devidamente localizados de acordo com a estrutura do projeto?
- **Sequência de criação de arquivos**: As tasks especificam onde os arquivos devem ser criados, em ordem lógica?
- **Precisão dos caminhos**: Os caminhos de arquivo são consistentes com a estrutura do projeto dos documentos de arquitetura?

### 3. Validação de Completude de UI/Frontend (se aplicável)

- **Especificações de componentes**: Os componentes de UI estão suficientemente detalhados para a implementação?
- **Orientação de estilo/design**: A orientação para a implementação visual está clara?
- **Fluxos de interação do usuário**: Os padrões e comportamentos de UX estão especificados?
- **Responsividade/acessibilidade**: Essas considerações estão tratadas, caso necessárias?
- **Pontos de integração**: Os pontos de integração frontend-backend estão claros?

### 4. Avaliação de Satisfação dos Critérios de Aceite

- **Cobertura dos AC**: Todos os critérios de aceite serão satisfeitos pelas tasks listadas?
- **Testabilidade dos AC**: Os critérios de aceite são mensuráveis e verificáveis?
- **Cenários ausentes**: Casos extremos ou condições de erro estão cobertos?
- **Definição de sucesso**: O "done" está claramente definido para cada AC?
- **Mapeamento Task-AC**: As tasks estão devidamente vinculadas a critérios de aceite específicos?

### 5. Revisão das Instruções de Validação e Teste

- **Clareza da abordagem de teste**: Os métodos de teste estão claramente especificados?
- **Cenários de teste**: Os casos de teste principais estão identificados?
- **Passos de validação**: Os passos de validação dos critérios de aceite estão claros?
- **Ferramentas/frameworks de teste**: As ferramentas de teste necessárias estão especificadas?
- **Requisitos de dados de teste**: As necessidades de dados de teste estão identificadas?

### 6. Avaliação de Considerações de Segurança (se aplicável)

- **Requisitos de segurança**: As necessidades de segurança estão identificadas e tratadas?
- **Autenticação/autorização**: Os controles de acesso estão especificados?
- **Proteção de dados**: Os requisitos de tratamento de dados sensíveis estão claros?
- **Prevenção de vulnerabilidades**: Os problemas comuns de segurança estão tratados?
- **Requisitos de conformidade**: As necessidades regulatórias/de conformidade estão tratadas?

### 7. Validação da Sequência de Tasks/Subtasks

- **Ordem lógica**: As tasks seguem uma sequência de implementação adequada?
- **Dependências**: As dependências entre tasks estão claras e corretas?
- **Granularidade**: As tasks estão dimensionadas de forma apropriada e são acionáveis?
- **Completude**: As tasks cobrem todos os requisitos e critérios de aceite?
- **Issues bloqueantes**: Há alguma task que bloquearia outras?

### 8. Verificação Anti-Alucinação

- **Consulte tools/mcp/context7.yaml** para a consulta de documentação de bibliotecas, a fim de verificar afirmações técnicas contra as fontes oficiais
- Consulte a seção de exemplos para padrões de verificação de documentação e consultas específicas de bibliotecas
- **Verificação de fonte**: Toda afirmação técnica deve ser rastreável a documentos de origem
- **Alinhamento com a arquitetura**: O conteúdo das Dev Notes corresponde às especificações da arquitetura
- **Sem detalhes inventados**: Sinalize qualquer decisão técnica não amparada pelos documentos de origem
- **Precisão das referências**: Verifique se todas as referências de origem estão corretas e acessíveis
- **Checagem de fatos**: Faça referência cruzada das afirmações contra os documentos de epic e de arquitetura

### 9. Prontidão de Implementação para o Dev Agent

- **Contexto autocontido**: A story pode ser implementada sem a leitura de documentos externos?
- **Instruções claras**: Os passos de implementação são inequívocos?
- **Contexto técnico completo**: Todos os detalhes técnicos necessários estão presentes nas Dev Notes?
- **Informações ausentes**: Identifique quaisquer lacunas críticas de informação
- **Acionabilidade**: Todas as tasks são acionáveis por um agente de desenvolvimento?

### 10. Gerar Relatório de Validação

Forneça um relatório de validação estruturado incluindo:

#### Problemas de Conformidade com o Template

- Seções ausentes do template da story
- Placeholders ou variáveis de template não preenchidos
- Problemas de formatação estrutural

#### Issues Críticas (Devem Ser Corrigidas - Story Bloqueada)

- Informações essenciais ausentes para a implementação
- Afirmações técnicas imprecisas ou não verificáveis
- Cobertura incompleta dos critérios de aceite
- Seções obrigatórias ausentes

#### Issues a Corrigir (Melhorias Importantes de Qualidade)

- Orientação de implementação pouco clara
- Considerações de segurança ausentes
- Problemas de sequenciamento de tasks
- Instruções de teste incompletas

#### Melhorias Desejáveis (Aprimoramentos Opcionais)

- Contexto adicional que ajudaria a implementação
- Esclarecimentos que melhorariam a eficiência
- Melhorias de documentação

#### Achados Anti-Alucinação

- Afirmações técnicas não verificáveis
- Referências de origem ausentes
- Inconsistências com os documentos de arquitetura
- Bibliotecas, padrões ou normas inventados

#### Avaliação Final

- **GO**: A story está pronta para implementação
- **NO-GO**: A story requer correções antes da implementação
- **Pontuação de Prontidão para Implementação**: escala de 1 a 10
- **Nível de Confiança**: Alto/Médio/Baixo para uma implementação bem-sucedida
