---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com logging
- Interação mínima com o usuário
- **Melhor para:** Tasks simples e determinísticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Pre-Flight Planning - Planejamento Abrangente Antecipado
- Fase de análise da task (identificar todas as ambiguidades)
- Execução sem ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: smCreateNextStory()
responsável: River (Facilitator)
responsavel_type: Agente
atomic_layer: Organism

**Entrada:**
- campo: task
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Deve ser uma task registrada

- campo: parameters
  tipo: object
  origem: User Input
  obrigatório: false
  validação: Parâmetros de task válidos

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
      Verificar se a task está registrada; parâmetros obrigatórios fornecidos; dependências atendidas
    error_message: "Pré-condição falhou: task registrada; parâmetros obrigatórios fornecidos; dependências atendidas"
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
      Verificar se a task foi concluída; código de saída 0; saídas esperadas criadas
    error_message: "Pós-condição falhou: task concluída; código de saída 0; saídas esperadas criadas"
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
      Assegurar que a task foi concluída conforme esperado; efeitos colaterais documentados
    error_message: "Critério de aceite não atendido: task concluída conforme esperado; efeitos colaterais documentados"
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
  - **Localização:** .aiox-core/scripts/execute-task.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Task Não Encontrada
   - **Causa:** A task especificada não está registrada no sistema
   - **Resolução:** Verificar o nome e o registro da task
   - **Recuperação:** Listar tasks disponíveis, sugerir similares

2. **Erro:** Parâmetros Inválidos
   - **Causa:** Os parâmetros da task não correspondem ao schema esperado
   - **Resolução:** Validar os parâmetros contra a definição da task
   - **Recuperação:** Fornecer template de parâmetros, rejeitar execução

3. **Erro:** Timeout de Execução
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
- Quebrar em workflows menores; implementar checkpointing; usar processamento assíncrono quando possível

---

## Metadados

```yaml
story: N/A
version: 1.0.0
dependencies:
  - N/A
tags:
  - creation
  - setup
updated_at: 2025-11-17
```

---

tools:
  - github-cli        # Acessar a estrutura do repositório e stories anteriores
  - context7          # Consultar documentação para requisitos técnicos
  - clickup           # Gerenciar metadados e rastreamento de story
checklists:
  - po-master-checklist.md
---

# Task Create Next Story

## Propósito

Identificar a próxima story lógica com base no progresso do projeto e nas definições de epic, e então preparar um arquivo de story abrangente, autocontido e acionável usando o `Story Template`. Esta task garante que a story seja enriquecida com todo o contexto técnico, requisitos e critérios de aceite necessários, deixando-a pronta para implementação eficiente por um Developer Agent com mínima necessidade de pesquisa adicional ou de encontrar seu próprio contexto.

## Execução SEQUENCIAL da Task (Não prossiga até que a Task atual esteja completa)

### 0. Carregar a Configuração Core e Verificar o Workflow

- Carregar `aiox-core/core-config.yaml` a partir da raiz do projeto
- Se o arquivo não existir, PARE e informe ao usuário: "core-config.yaml not found. This file is required for story creation. You can either: 1) Copy it from GITHUB aiox-core/core-config.yaml and configure it for your project OR 2) Run the AIOX installer against your project to upgrade and add the file automatically. Please add and configure core-config.yaml before proceeding."
- Extrair as configurações-chave: `devStoryLocation`, `prd.*`, `architecture.*`, `workflow.*`

### 1. Identificar a Próxima Story para Preparação

#### 1.1 Localizar os Arquivos de Epic e Revisar as Stories Existentes

- **Consulte tools/cli/github-cli.yaml** para comandos de navegação no repositório e operações de listagem de arquivos
- Consulte a seção de exemplos para padrões de inspeção de branch e estrutura de arquivos
- Com base em `prdSharded` da config, localize os arquivos de epic (localização/padrão shardeado ou seções monolíticas do PRD)
- Se `devStoryLocation` tiver arquivos de story, carregue o arquivo `{epicNum}.{storyNum}.story.md` de maior número
- **Se a story de maior número existir:**
  - Verifique se o status é 'Done'. Se não, alerte o usuário: "ALERT: Found incomplete story! File: {lastEpicNum}.{lastStoryNum}.story.md Status: [current status] You should fix this story first, but would you like to accept risk & override to create the next story in draft?"
  - Se prosseguir, selecione a próxima story sequencial no epic atual
  - Se o epic estiver completo, pergunte ao usuário: "Epic {epicNum} Complete: All stories in Epic {epicNum} have been completed. Would you like to: 1) Begin Epic {epicNum + 1} with story 1 2) Select a specific story to work on 3) Cancel story creation"
  - **CRÍTICO**: NUNCA pule automaticamente para outro epic. O usuário DEVE instruir explicitamente qual story criar.
- **Se não existirem arquivos de story:** A próxima story é SEMPRE 1.1 (primeira story do primeiro epic)
- Anuncie a story identificada ao usuário: "Identified next story for preparation: {epicNum}.{storyNum} - {Story Title}"

### 2. Reunir os Requisitos da Story e o Contexto da Story Anterior

- Extrair os requisitos da story do arquivo de epic identificado
- Se a story anterior existir, revisar as seções do Dev Agent Record em busca de:
  - Completion Notes e Debug Log References
  - Desvios de implementação e decisões técnicas
  - Desafios encontrados e lições aprendidas
- Extrair insights relevantes que informem a preparação da story atual

### 3. Reunir o Contexto de Arquitetura

#### 3.1 Determinar a Estratégia de Leitura da Arquitetura

- **Consulte tools/mcp/context7.yaml** para consulta de documentação de bibliotecas e pesquisa de contexto técnico
- Consulte a seção de exemplos para padrões de consulta de documentação específica de bibliotecas
- **Se `architectureVersion: >= v4` e `architectureSharded: true`**: Leia `{architectureShardedLocation}/index.md` e então siga a ordem de leitura estruturada abaixo
- **Caso contrário**: Use o `architectureFile` monolítico para seções similares

#### 3.2 Ler os Documentos de Arquitetura Com Base no Tipo de Story

**CRÍTICO: Estratégia de Fallback de Arquivo**

Ao tentar ler os arquivos de arquitetura, use esta ordem de fallback:
1. Tente o nome de arquivo primário (ex.: `tech-stack.md`)
2. Se não encontrado, tente as alternativas de fallback de `devLoadAlwaysFilesFallback` em core-config.yaml
3. Se ainda não encontrado, verifique os equivalentes em português
4. Se nenhum existir, anote o arquivo ausente nas Dev Notes

**Common Fallback Mappings:**
```yaml
tech-stack.md → [technology-stack.md, pilha-tecnologica.md, stack.md]
coding-standards.md → [code-standards.md, padroes-de-codigo.md, standards.md]
source-tree.md → [project-structure.md, unified-project-structure.md, arvore-de-origem.md, directory-structure.md]
testing-strategy.md → [test-strategy.md, estrategia-de-testes.md]
database-schema.md → [db-schema.md, esquema.md, schema.md]
```

**Para TODAS as Stories (tente na ordem de fallback):**
- tech-stack.md
- unified-project-structure.md (ou project-structure.md, source-tree.md)
- coding-standards.md
- testing-strategy.md

**Para Stories de Backend/API, adicionalmente:**
- data-models.md
- database-schema.md
- backend-architecture.md
- rest-api-spec.md (ou api-spec.md, api-design.md)
- external-apis.md

**Para Stories de Frontend/UI, adicionalmente:**
- frontend-architecture.md
- components.md
- core-workflows.md (ou workflows.md, user-flows.md)
- data-models.md

**Para Stories Full-Stack:** Leia as seções de Backend e Frontend acima

**Importante:** Quando um arquivo de fallback for usado, anote-o nas Dev Notes:
```
[Note: Using fallback file 'pilha-tecnologica.md' instead of 'tech-stack.md']
```

#### 3.3 Extrair Detalhes Técnicos Específicos da Story

Extraia SOMENTE informações diretamente relevantes à implementação da story atual. NÃO invente novas bibliotecas, padrões ou standards que não estejam nos documentos de origem.

Extraia:

- Modelos de dados, schemas ou estruturas específicos que a story usará
- Endpoints de API que a story deve implementar ou consumir
- Especificações de componentes para elementos de UI na story
- Caminhos de arquivo e convenções de nomenclatura para código novo
- Requisitos de teste específicos das funcionalidades da story
- Considerações de segurança ou performance que afetam a story

SEMPRE cite os documentos de origem: `[Source: architecture/{filename}.md#{section}]`

### 4. Verificar o Alinhamento com a Estrutura do Projeto

- Cruzar os requisitos da story com o Project Structure Guide de `docs/architecture/unified-project-structure.md`
- Garantir que os caminhos de arquivo, localizações de componentes ou nomes de módulos se alinhem às estruturas definidas
- Documentar quaisquer conflitos estruturais na seção "Project Structure Notes" dentro do draft da story

### 5. Preencher o Story Template com o Contexto Completo

#### 5.1 Obter a Estrutura do Workspace e Verificar o Epic

- **Consulte tools/mcp/clickup.yaml** - Revise o exemplo 'story_creation_workflow' para orientação completa passo a passo
- **Passo 1: Obter a Hierarquia do Workspace**
  - Chame `get_workspace_hierarchy` (nenhum parâmetro necessário)
  - Extraia o ID da lista Backlog da resposta:
    ```javascript
    // Response structure:
    {
      "spaces": [{
        "lists": [{
          "name": "Backlog",
          "id": "901317181013"  // ← Extract this numeric list_id
        }]
      }]
    }
    ```
  - **CRÍTICO:** Armazene este list_id numérico para uso no Passo 5.3
  - Log: "✅ Found Backlog list (list_id: {backlog_list_id})"

- **Passo 2: Buscar o Epic no Backlog**
  - Use `get_workspace_tasks` com os parâmetros:
    - list_ids: [{backlog_list_id}]  # Do Passo 1
    - tags: ["epic-{epicNum}"]
    - status: ["Planning", "In Progress"]

- **Se o Epic NÃO for encontrado:**
  - PARE a execução
  - Exiba o erro: "❌ Epic {epicNum} not found in ClickUp Backlog list.
    Please create Epic task with:
    - Name: 'Epic {epicNum}: {Epic Title}'
    - List: Backlog (list_id: {backlog_list_id})
    - Tags: ['epic', 'epic-{epicNum}']
    - Status: Planning or In Progress
    Then retry story creation."

- **Se o Epic for encontrado:**
  - Capture epic_task_id para o relacionamento pai
  - Log: "✅ Found Epic {epicNum} (task_id: {epic_task_id})"

#### 5.2 Preparar o Arquivo de Story e os Metadados

- **Consulte tools/mcp/clickup.yaml** para os parâmetros do create_task e os requisitos de validação ao criar tasks de rastreamento de story
- Use o validador 'validate-create-task' para verificar o formato do assignee (deve ser um array)
- Consulte a seção de exemplos para padrões de formato de custom_field
- Observe a seção de complexidade da API sobre a incompatibilidade de formato de assignee entre operações de create e update
- Crie o novo arquivo de story: `{devStoryLocation}/{epicNum}.{storyNum}.story.md` usando o Story Template
- Preencha as informações básicas da story: Title, Status (Draft), Story statement, Acceptance Criteria do Epic

##### 5.2.1 Preparar os Metadados do ClickUp para o Frontmatter

- Prepare a estrutura da seção ClickUp (será preenchida após a criação da task no ClickUp):
  ```yaml
  clickup:
    task_id: ""  # To be filled
    epic_task_id: "{epic_task_id from 5.1}"
    list: "Backlog"
    url: ""  # To be filled
    last_sync: ""  # To be filled
  ```

#### 5.3 Criar a Task de Story no ClickUp

- **Consulte tools/mcp/clickup.yaml** - Revise o exemplo 'story_creation_workflow' para a referência completa de parâmetros
- **CRÍTICO:** Use o validador 'validate-create-task' para evitar erros de formato
- **CRÍTICO:** Use o list_id numérico do Passo 5.1, NÃO uma string com o nome da lista

**Parâmetros de Criação da Task:**
```yaml
list_id: "{backlog_list_id}"  # MUST be numeric string from 5.1 (e.g., "901317181013")
name: "Story {epicNum}.{storyNum}: {Story Title}"
parent: "{epic_task_id}"  # Creates as subtask of Epic (from 5.1)
markdown_description: "{entire story .md file content}"
tags:
  - "story"
  - "epic-{epicNum}"
  - "story-{epicNum}.{storyNum}"
custom_fields:
  - id: "epic_number"
    value: {epicNum}
  - id: "story_number"
    value: "{epicNum}.{storyNum}"
  - id: "story_file_path"
    value: "{devStoryLocation}/{epicNum}.{storyNum}.story.md"
  - id: "story-status"
    value: "Draft"
```

**Notas de Validação:**
- list_id DEVE ser uma string numérica (validada por /^\d+$/)
- Usar "Backlog" ou outros valores não numéricos falhará na validação
- assignees (se fornecido) deve ser um array, não um objeto

**Tratamento da Resposta:**
- **Capture:** story_task_id da resposta
- **Log:** "✅ Story task created in ClickUp: {story_task_id}"

**Tratamento de Erros:**
- Se o create_task falhar com erro de validação, exiba o erro exato e os parâmetros usados
- Se ocorrer um erro de API, registre o erro mas continue (a story local ainda é válida)
- Avise o usuário: "⚠️ Story created locally but ClickUp sync failed: {error_message}"

#### 5.4 Atualizar o Frontmatter da Story com os Dados do ClickUp

- Atualize a seção clickup do YAML do frontmatter com os valores capturados:
  ```yaml
  clickup:
    task_id: "{story_task_id from 5.3}"
    epic_task_id: "{epic_task_id from 5.1}"
    list: "Backlog"
    url: "https://app.clickup.com/t/{story_task_id}"
    last_sync: "{current ISO 8601 timestamp}"
  ```
- Salve o arquivo de story com o frontmatter atualizado
- Log: "✅ Story task created in ClickUp: {story_task_id}"

- **Seção `Dev Notes` (CRÍTICO):**
  - CRÍTICO: Esta seção DEVE conter SOMENTE informações extraídas dos documentos de arquitetura. NUNCA invente ou assuma detalhes técnicos.
  - Inclua TODOS os detalhes técnicos relevantes dos Passos 2-3, organizados por categoria:
    - **Previous Story Insights**: Principais aprendizados da story anterior
    - **Data Models**: Schemas específicos, regras de validação, relacionamentos [com referências de origem]
    - **API Specifications**: Detalhes de endpoints, formatos de request/response, requisitos de auth [com referências de origem]
    - **Component Specifications**: Detalhes de componentes de UI, props, gerenciamento de estado [com referências de origem]
    - **File Locations**: Caminhos exatos onde o código novo deve ser criado com base na estrutura do projeto
    - **Testing Requirements**: Casos de teste ou estratégias específicas de testing-strategy.md
    - **Technical Constraints**: Requisitos de versão, considerações de performance, regras de segurança
  - Todo detalhe técnico DEVE incluir sua referência de origem: `[Source: architecture/{filename}.md#{section}]`
  - Se a informação de uma categoria não for encontrada nos docs de arquitetura, declare explicitamente: "No specific guidance found in architecture docs"
- **Seção `Tasks / Subtasks`:**
  - Gere uma lista detalhada e sequencial de tasks técnicas baseada SOMENTE em: Epic Requirements, Story AC, Reviewed Architecture Information
  - Cada task deve referenciar a documentação de arquitetura relevante
  - Inclua testes unitários como subtasks explícitas com base na Testing Strategy
  - Vincule as tasks aos ACs quando aplicável (ex.: `Task 1 (AC: 1, 3)`)
- Adicione notas sobre o alinhamento com a estrutura do projeto ou discrepâncias encontradas no Passo 4

### 6. Conclusão e Revisão do Draft da Story

- **Consulte tools/mcp/clickup.yaml** para as operações update_task e get_task ao gerenciar o status e os metadados da story
- Consulte a seção de requisitos de validação antes de atualizar o status da task
- Revise todas as seções quanto à completude e precisão
- Verifique se todas as referências de origem estão incluídas para os detalhes técnicos
- Garanta que as tasks se alinhem tanto aos requisitos do epic quanto às restrições de arquitetura
- Atualize o status para "Draft" e salve o arquivo de story
- Execute `.aiox-core/development/tasks/execute-checklist` `.aiox-core/product/checklists/story-draft-checklist`
- Forneça um resumo ao usuário incluindo:
  - Story criada: `{devStoryLocation}/{epicNum}.{storyNum}.story.md`
  - Status: Draft
  - Componentes técnicos-chave incluídos dos docs de arquitetura
  - Quaisquer desvios ou conflitos observados entre o epic e a arquitetura
  - Resultados do Checklist
  - Próximos passos: Para stories Complexas, sugira que o usuário revise cuidadosamente o draft da story e, opcionalmente, peça ao PO para rodar a task `.aiox-core/development/tasks/validate-next-story`

**Nota de Integração com ClickUp:** Esta task agora inclui a verificação do Epic (Seção 5.1), a criação da task de story no ClickUp (Seção 5.3) e atualizações automáticas do frontmatter (Seção 5.4). As stories são criadas como subtasks de seu Epic pai na lista Backlog do ClickUp. Se a verificação do Epic ou a sincronização com o ClickUp falhar, o arquivo de story ainda será criado localmente com uma mensagem de aviso.
